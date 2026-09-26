use std::{collections::BTreeMap, fs, path::Path};

use serde_json::Value as Json;

use oxc::minifier::{
    CompressOptions, CompressOptionsKeepNames, CompressOptionsUnused, PropertyReadSideEffects,
};

pub(crate) struct MappedOptions {
    pub(crate) options: CompressOptions,
    pub(crate) is_module: bool,
    pub(crate) is_ie8: bool,
    /// Terser's `toplevel`, forwarded to [`MangleOptions::top_level`].
    pub(crate) top_level: Option<bool>,
    pub(crate) unsupported_keys: Vec<String>,
}

fn json_truthy(value: &Json) -> Option<bool> {
    value.as_bool().or_else(|| value.as_f64().map(|number| number != 0.0))
}

fn json_string_array(value: &Json) -> Option<Vec<String>> {
    value.as_array()?.iter().map(|item| item.as_str().map(ToString::to_string)).collect()
}

/// Merge every `config.json` from the fixture root down to `dir`, nearest wins.
fn resolve(root: &Path, dir: &Path) -> (BTreeMap<String, Json>, Vec<String>) {
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
    let mut errors = Vec::new();
    for path in chain {
        let config_path = path.join("config.json");
        let Ok(mut source) = fs::read_to_string(&config_path) else { continue };
        if let Err(err) = json_strip_comments::strip(&mut source) {
            errors.push(format!("{}: {err}", config_path.display()));
            continue;
        }
        match serde_json::from_str::<Json>(&source) {
            Ok(Json::Object(map)) => merged.extend(map),
            Ok(_) => errors.push(format!("{} is not a JSON object", config_path.display())),
            Err(err) => errors.push(format!("{}: {err}", config_path.display())),
        }
    }
    (merged, errors)
}

/// Read, merge, and map the configuration for a fixture.
pub(crate) fn load(root: &Path, dir: &Path) -> (MappedOptions, Vec<String>) {
    let (config, errors) = resolve(root, dir);
    (map(&config), errors)
}

fn map(config: &BTreeMap<String, Json>) -> MappedOptions {
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

    let mut unsupported_keys = Vec::new();
    let mut is_module = false;
    let is_ie8 = config.contains_key("ie8");
    let mut top_level = None;

    for (key, value) in config {
        // A key that is present but not boolean-ish still expresses intent to
        // enable the pass, e.g. `"sequences": 100`.
        let enabled = json_truthy(value).unwrap_or(true);
        match key.as_str() {
            "defaults" => {}
            "drop_console" => options.drop_console = enabled,
            "drop_debugger" => options.drop_debugger = enabled,
            "join_vars" | "reduce_vars" => options.join_vars = options.join_vars || enabled,
            "sequences" => options.sequences = enabled,
            "keep_fnames" => options.keep_names.function = enabled,
            "keep_classnames" => options.keep_names.class = enabled,
            "module" => is_module = enabled,
            "toplevel" => top_level = Some(enabled),
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
            "dead_code" | "switches" => {}
            _ => unsupported_keys.push(key.clone()),
        }
    }

    MappedOptions { options, is_module, is_ie8, top_level, unsupported_keys }
}
