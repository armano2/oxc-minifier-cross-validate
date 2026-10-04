use oxc::minifier::{CompressOptionsUnused, MinifierOptions, PropertyReadSideEffects};
use oxc::span::{ModuleKind, SourceType};

pub fn from_options(options: &MinifierOptions, source_type: SourceType) -> Vec<String> {
    let mut tags = Vec::new();
    match source_type.module_kind() {
        ModuleKind::Script => {
            tags.push("type:script".to_string());
        }
        ModuleKind::Module => {
            tags.push("type:module".to_string());
        }
        ModuleKind::CommonJS => {
            tags.push("type:cjs".to_string());
        }
        ModuleKind::Unambiguous => {}
    }

    if let Some(mangle) = &options.mangle {
        tags.push("mangle".to_string());
        if mangle.top_level == Some(true) {
            tags.push("mangle top level".to_string());
        }
        if mangle.keep_names.function {
            tags.push("keep function names".to_string());
        }
        if mangle.keep_names.class {
            tags.push("keep class names".to_string());
        }
    }
    if options.mangle_properties.is_some() {
        tags.push("mangle properties".to_string());
    }
    if let Some(compress) = &options.compress {
        if compress.drop_console {
            tags.push("drop console".to_string());
        }
        if compress.drop_debugger {
            tags.push("drop debugger".to_string());
        }
        if compress.join_vars {
            tags.push("join vars".to_string());
        }
        if compress.sequences {
            tags.push("sequences".to_string());
        }
        if compress.unused == CompressOptionsUnused::Remove {
            tags.push("remove unused".to_string());
        }
        if compress.keep_names.function && !tags.iter().any(|tag| tag == "keep function names") {
            tags.push("keep function names".to_string());
        }
        if compress.keep_names.class && !tags.iter().any(|tag| tag == "keep class names") {
            tags.push("keep class names".to_string());
        }
        if !compress.treeshake.manual_pure_functions.is_empty() {
            tags.push("pure functions".to_string());
        }
        if compress.treeshake.property_read_side_effects == PropertyReadSideEffects::None {
            tags.push("pure getters".to_string());
        }
        if let Some(iterations) = compress.max_iterations {
            tags.push(format!(
                "{iterations} {}",
                if iterations == 1 { "iteration" } else { "iterations" }
            ));
        }
    }
    tags
}
