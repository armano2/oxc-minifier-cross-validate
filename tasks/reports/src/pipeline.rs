use oxc::{
    ast::ast::Program,
    codegen::{Codegen, CodegenOptions, CommentOptions},
    mangler::MangleOptionsKeepNames,
    minifier::{CompressOptions, MangleOptions, Minifier, MinifierOptions, MinifierReturn},
    parser::{ParseOptions, Parser, ParserReturn},
    span::SourceType,
};
use oxc_allocator::Allocator;

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
    Ok(codegen(&ret.program, None))
}

/// Run the full public `Minifier` pipeline, not just `Compressor`, so the
/// results reflect what consumers actually get.
pub(crate) fn compress(
    source_text: &str,
    source_type: SourceType,
    options: &CompressOptions,
    top_level: Option<bool>,
) -> Result<String, String> {
    let allocator = Allocator::default();
    let mut program = parse(&allocator, source_text, source_type)?.program;
    let minified = Minifier::new(MinifierOptions {
        mangle: top_level.map(|top_level| MangleOptions {
            top_level: Some(top_level),
            keep_names: MangleOptionsKeepNames::all_false(),
            ..MangleOptions::default()
        }),
        mangle_properties: None,
        compress: Some(options.clone()),
    })
    .minify(&allocator, &mut program);
    Ok(codegen(&program, Some(minified)))
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

fn codegen(program: &Program<'_>, minified: Option<MinifierReturn>) -> String {
    let mut codegen = Codegen::new().with_options(CodegenOptions {
        comments: CommentOptions { annotation: false, ..CommentOptions::default() },
        single_quote: true,
        ..CodegenOptions::default()
    });
    if let Some(minified) = minified {
        codegen = codegen
            .with_scoping(minified.scoping)
            .with_private_member_mappings(minified.class_private_mappings);
    }
    codegen.build(program).code
}
