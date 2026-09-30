use oxc::{
    allocator::Allocator,
    ast::ast::Program,
    codegen::{Codegen, CodegenOptions, CommentOptions},
    minifier::{Minifier, MinifierOptions, MinifierReturn},
    parser::{ParseOptions, Parser, ParserReturn},
    span::SourceType,
};

pub(crate) fn source_type_for(is_module: bool) -> SourceType {
    if is_module { SourceType::mjs() } else { SourceType::cjs() }
}

/// Parse + codegen without compression, so both sides are compared in the same
/// normalized form.
pub(crate) fn print_normalized(
    source_text: &str,
    source_type: SourceType,
) -> Result<String, String> {
    let allocator = Allocator::default();
    let ret = parse(&allocator, source_text, source_type)?;
    Ok(codegen(&ret.program, None, false))
}

/// Re-print already generated code without whitespace.
///
/// Sizes must not be measured on the readable form: `while (b++);` and
/// `for (; b++;);` are equivalent, but formatting alone makes the first look
/// shorter. Whitespace is stripped for measurement only, so reports can keep
/// the readable text for diffs.
pub(crate) fn print_minified(source_text: &str, source_type: SourceType) -> Result<String, String> {
    let allocator = Allocator::default();
    let ret = parse(&allocator, source_text, source_type)?;
    Ok(codegen(&ret.program, None, true))
}

/// Run the full public `Minifier` pipeline, not just `Compressor`, so the
/// results reflect what consumers actually get.
pub(crate) fn compress(
    source_text: &str,
    source_type: SourceType,
    options: MinifierOptions,
) -> Result<String, String> {
    let allocator = Allocator::default();
    let mut program = parse(&allocator, source_text, source_type)?.program;
    let minified = Minifier::new(options).minify(&allocator, &mut program);
    Ok(codegen(&program, Some(minified), false))
}

fn parse<'a>(
    allocator: &'a Allocator,
    source_text: &'a str,
    source_type: SourceType,
) -> Result<ParserReturn<'a>, String> {
    let ret = Parser::new(allocator, source_text, source_type)
        .with_options(ParseOptions {
            allow_return_outside_function: true,
            ..ParseOptions::default()
        })
        .parse();
    if ret.fatal_error || !ret.diagnostics.is_empty() {
        let message = ret
            .diagnostics
            .iter()
            .next()
            .map_or_else(|| "fatal parser error".to_string(), ToString::to_string);
        return Err(message);
    }
    Ok(ret)
}

fn codegen(program: &Program<'_>, minified: Option<MinifierReturn>, minify: bool) -> String {
    let mut codegen = Codegen::new().with_options(CodegenOptions {
        comments: CommentOptions { annotation: false, ..CommentOptions::default() },
        single_quote: true,
        minify,
        ..CodegenOptions::default()
    });
    if let Some(minified) = minified {
        codegen = codegen
            .with_scoping(minified.scoping)
            .with_private_member_mappings(minified.class_private_mappings);
    }
    codegen.build(program).code
}
