use serde_json::{Value as Json, Value};
use std::{collections::BTreeMap, fs, path::Path};

use oxc::{
    mangler::MangleOptionsKeepNames,
    minifier::{
        CompressOptions, CompressOptionsKeepNames, CompressOptionsUnused, MangleOptions,
        ManglePropertiesOptions, MinifierOptions, PropertyReadSideEffects,
    },
};

pub(crate) struct MappedOptions {
    pub(crate) options: MinifierOptions,
    pub(crate) is_module: bool,
    pub(crate) is_ie8: bool,
    pub(crate) unsupported_keys: Vec<String>,
    pub(crate) errors: Vec<String>,
}

fn json_truthy(value: &Json) -> Option<bool> {
    value.as_bool().or_else(|| value.as_f64().map(|number| number != 0.0))
}

fn json_string_array(value: &Json) -> Option<Vec<String>> {
    value.as_array()?.iter().map(|item| item.as_str().map(ToString::to_string)).collect()
}

/// Merge every `config.json` from the fixture root down to `dir`, nearest wins.
fn resolve(
    root: &Path,
    dir: &Path,
    file_name: &str,
    errors: &mut Vec<String>,
) -> BTreeMap<String, Json> {
    let mut chain = Vec::new();
    let mut current = Some(dir);
    while let Some(path) = current {
        chain.push(path.to_path_buf());
        if path == root {
            break;
        }
        current = path.parent();
    }
    chain.reverse();

    let mut merged: BTreeMap<String, Json> = BTreeMap::new();
    for path in chain {
        let config_path = path.join(file_name);
        let Ok(mut source) = fs::read_to_string(&config_path) else {
            continue;
        };
        if let Err(err) = json_strip_comments::strip(&mut source) {
            errors.push(format!("{}: {err}", config_path.display()));
            continue;
        }
        match serde_json::from_str::<Json>(&source) {
            Ok(Json::Object(map)) => merged.extend(map),
            Ok(Json::Bool(_)) => {}
            Ok(_) => errors.push(format!("{} is not a JSON object", config_path.display())),
            Err(err) => errors.push(format!("{}: {err}", config_path.display())),
        }
    }
    merged
}

/// Read, merge, and map the configuration for a fixture.
pub(crate) fn load(root: &Path, dir: &Path) -> MappedOptions {
    let mut unsupported_keys = Vec::new();
    let mut errors = Vec::new();

    let config = resolve(root, dir, "config.json", &mut errors);

    let mangle_config = resolve(root, dir, "mangle.json", &mut errors);

    let is_module = config.get("is_module").and_then(Value::as_bool).is_some_and(|e| e == true);
    let is_ie8 =
        config.contains_key("ie8") | config.contains_key("ie") | config.contains_key("webkit");

    let options = MinifierOptions {
        mangle: map_mangle(&mangle_config, &mut unsupported_keys),
        mangle_properties: map_mangle_properties(&mangle_config, &mut unsupported_keys),
        compress: Some(map_compress(&config, &mut unsupported_keys)),
    };

    MappedOptions { options, unsupported_keys, errors, is_module, is_ie8 }
}

fn map_mangle(
    config: &BTreeMap<String, Json>,
    unsupported_keys: &mut Vec<String>,
) -> Option<MangleOptions> {
    if config.is_empty() {
        return None;
    }

    let mut options = MangleOptions {
        keep_names: MangleOptionsKeepNames::all_true(),
        ..MangleOptions::default()
    };

    for (key, value) in config {
        match key.as_str() {
            "keep_classnames" => options.keep_names.class = json_truthy(value).unwrap_or(true),
            "keep_fnames" => options.keep_names.function = json_truthy(value).unwrap_or(true),
            "toplevel" => options.top_level = json_truthy(value),
            "module" => options.top_level = json_truthy(value),
            "reserved" => match json_string_array(value) {
                Some(reserved) => options.reserved.extend(reserved.into_iter().map(Into::into)),
                None => unsupported_keys.push(key.clone()),
            },
            "ie8" | "safari10" | "properties" | "cache" => {}
            _ => unsupported_keys.push(key.clone()),
        }
    }

    Some(options)
}

fn map_mangle_properties(
    config: &BTreeMap<String, Json>,
    unsupported_keys: &mut Vec<String>,
) -> Option<ManglePropertiesOptions> {
    if config.is_empty() {
        return None;
    }

    let value = config.get("properties")?;
    let properties = match value {
        Json::Bool(false) => return None,
        Json::Bool(true) => None,
        Json::Object(map) => Some(map),
        _ => {
            unsupported_keys.push("properties".to_string());
            return None;
        }
    };
    let regex = match properties.and_then(|map| map.get("regex")) {
        Some(Json::String(regex)) => regex.as_str(),
        Some(_) => {
            unsupported_keys.push("regex".to_string());
            return None;
        }
        None => ".*",
    };
    let mut options = match ManglePropertiesOptions::from_pattern(regex) {
        Ok(options) => options,
        Err(_) => {
            unsupported_keys.push("regex".to_string());
            return None;
        }
    };
    if let Some(properties) = properties {
        for (key, value) in properties {
            match key.as_str() {
                "regex" => {}
                "keep_quoted" => match value.as_bool() {
                    Some(keep_quoted) => options.mangle_quoted = !keep_quoted,
                    None => unsupported_keys.push(key.clone()),
                },
                "debug" => match value {
                    Json::Bool(debug) => options.debug = *debug,
                    Json::String(_) => unsupported_keys.push(key.clone()),
                    _ => unsupported_keys.push(key.clone()),
                },
                "reserved" => match json_string_array(value) {
                    Some(reserved) => options.reserved.extend(reserved.into_iter().map(Into::into)),
                    None => unsupported_keys.push(key.clone()),
                },
                _ => unsupported_keys.push(key.clone()),
            }
        }
    }
    Some(options)
}

fn map_compress(
    config: &BTreeMap<String, Json>,
    unsupported_keys: &mut Vec<String>,
) -> CompressOptions {
    // The fixtures are driven by a harness that deserializes `config.json` into
    // its compress options, so every flag the config does not mention is OFF —
    // not terser's nor oxc's default. Verified against
    // `terser/issue_973/this_binding_side_effects`, whose `{"side_effects": true}`
    // config leaves statements unjoined because `sequences` is never enabled.
    //
    // Passes that oxc always runs (such as `a["b"]` -> `a.b`) have no toggle, so
    // the corresponding key is reported as unsupported rather than synthesized.
    let mut options = CompressOptions {
        drop_debugger: false,
        drop_console: false,
        join_vars: false,
        sequences: false,
        unused: CompressOptionsUnused::Keep,
        keep_names: CompressOptionsKeepNames::all_false(),
        ..CompressOptions::default()
    };

    // `"defaults": true` opts into the default pass set on top of that baseline.
    let defaults = config.get("defaults").and_then(json_truthy).unwrap_or(false);
    if defaults {
        options.drop_debugger = true;
        options.join_vars = true;
        options.sequences = true;
        options.unused = CompressOptionsUnused::Remove;
    }

    for (key, value) in config {
        // A key that is present but not boolean-ish still expresses intent to
        // enable the pass, e.g. `"sequences": 100`.
        let enabled = json_truthy(value).unwrap_or(true);
        match key.as_str() {
            "defaults" => {}
            "drop_console" => options.drop_console = enabled,
            "drop_debugger" => options.drop_debugger = enabled,
            "join_vars" | "merge_vars" | "reduce_vars" | "collapse_vars" => {
                options.join_vars = options.join_vars || enabled
            }
            "sequences" => options.sequences = enabled,
            "keep_fnames" => options.keep_names.function = enabled,
            "keep_classnames" => options.keep_names.class = enabled,
            "module" => {}   // handled in different place
            "toplevel" => {} // unsupported
            "unused" => {
                options.unused = if enabled {
                    CompressOptionsUnused::Remove
                } else {
                    CompressOptionsUnused::Keep
                };
            }
            "passes" => {
                #[expect(clippy::cast_possible_truncation, clippy::cast_sign_loss)]
                let passes = value.as_f64().map(|passes| passes.trunc().clamp(0.0, 255.0) as u8);
                if let Some(passes) = passes
                    && passes >= 1
                {
                    options.max_iterations = Some(passes);
                }
            }
            "pure_funcs" => {
                if let Some(funcs) = json_string_array(value) {
                    options.treeshake.manual_pure_functions = funcs;
                } else {
                    unsupported_keys.push(key.clone());
                }
            }
            "pure_getters" => {
                if json_truthy(value).unwrap_or(false) {
                    options.treeshake.property_read_side_effects = PropertyReadSideEffects::None;
                } else if json_truthy(value).is_none() {
                    unsupported_keys.push(key.clone());
                }
            }
            "global_defs" => {
                // TODO:
            }
            "evaluate" => {
                // TODO:
            }
            "dead_code" | "switches" | "typeofs" | "if_return" | "booleans" | "side_effects"
            | "comparisons" | "loops" | "templates" | "arrows" | "varify" | "yields"
            | "conditionals" | "spreads" | "objects" => {
                // enabled by default
            }
            "webkit" | "ie" | "ie8" => {}
            _ => unsupported_keys.push(key.clone()),
        }
    }

    options
}
