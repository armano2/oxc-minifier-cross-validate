use std::{
    any::Any,
    fs,
    io::Write as _,
    panic::{self, AssertUnwindSafe},
    path::Path,
};

use oxc::span::SourceType;

use crate::{
    cli::Options,
    config,
    fixture::Fixture,
    outcome::{Kind, Outcome},
    pipeline::{compress, print_minified, print_normalized, source_type_for},
    tags,
};

/// Why a fixture was excluded from the results instead of producing an outcome.
pub enum Skip {
    /// `ie8` changes semantics globally (named function expressions, `catch`
    /// scoping, `undefined` handling) and oxc has no equivalent.
    Ie8,
}

pub struct Run {
    pub outcomes: Vec<Outcome>,
    pub skipped_ie8: usize,
}

/// Run every fixture that passes the CLI filters, stopping at `--limit`.
pub fn run_all(root: &Path, fixtures: &[Fixture], options: &Options) -> Run {
    // Panics are expected; keep the console readable unless asked otherwise.
    let hook = panic::take_hook();
    if !options.verbose {
        panic::set_hook(Box::new(|_| {}));
    }

    let mut run = Run { outcomes: Vec::new(), skipped_ie8: 0 };
    for fixture in fixtures {
        if options.family.as_ref().is_some_and(|family| &fixture.family != family) {
            continue;
        }
        if options.filter.as_ref().is_some_and(|filter| !fixture.relative.contains(filter)) {
            continue;
        }
        if options.verbose {
            // Flushed per fixture so a hard crash (e.g. stack overflow, which
            // `catch_unwind` cannot trap) points at the offending fixture.
            eprintln!("running {}", fixture.relative);
            let _ = std::io::stderr().flush();
        }
        let outcome = match run_fixture(root, fixture) {
            Ok(outcome) => outcome,
            Err(Skip::Ie8) => {
                run.skipped_ie8 += 1;
                continue;
            }
        };
        if options.verbose && !outcome.unsupported_keys.is_empty() {
            eprintln!(
                "unsupported config keys for {}: {}",
                outcome.relative,
                outcome.unsupported_keys.join(", ")
            );
        }
        if options.clean_only && !outcome.unsupported_keys.is_empty() {
            continue;
        }
        run.outcomes.push(outcome);
        if options.limit.is_some_and(|limit| run.outcomes.len() >= limit) {
            break;
        }
    }

    panic::set_hook(hook);
    run
}

pub fn run_fixture(root: &Path, fixture: &Fixture) -> Result<Outcome, Skip> {
    let config = config::load(root, &fixture.dir);
    if config.is_ie8 {
        return Err(Skip::Ie8);
    }
    let tags = tags::from_options(&config.options);

    let mut outcome = Outcome {
        relative: fixture.relative.clone(),
        family: fixture.family.clone(),
        kind: Kind::Pass,
        tags,
        unsupported_keys: config.unsupported_keys,
        input: String::new(),
        expected: String::new(),
        actual: String::new(),
        expected_size: 0,
        actual_size: 0,
        idempotency: None,
        note: String::new(),
    };

    if !config.errors.is_empty() {
        outcome.kind = Kind::ConfigError;
        outcome.note = config.errors.join("; ");
        return Ok(outcome);
    }

    let Ok(input) = fs::read_to_string(fixture.dir.join("input.js")) else {
        outcome.kind = Kind::ParseError;
        outcome.note = "could not read input.js".to_string();
        return Ok(outcome);
    };

    let Ok(expected_source) = fs::read_to_string(fixture.dir.join("output.js")) else {
        outcome.input = input;
        outcome.kind = Kind::NoExpected;
        return Ok(outcome);
    };

    let run_compress = |source: &str, source_type: SourceType| {
        panic::catch_unwind(AssertUnwindSafe(|| {
            compress(source, source_type, config.options.clone())
        }))
    };

    // Prefer script, fall back to module: terser fixtures are mostly scripts but
    // some use import/export.
    let mut source_type = source_type_for(config.is_module);
    let mut compressed = run_compress(&input, source_type);
    if !config.is_module && !matches!(compressed, Ok(Ok(_))) {
        let module = SourceType::mjs();
        let retry = run_compress(&input, module);
        if matches!(retry, Ok(Ok(_))) {
            source_type = module;
            compressed = retry;
        }
    }

    // Print the input through the same parse + codegen pipeline so that input,
    // expected and actual differ only in content, never in formatting.
    outcome.input = panic::catch_unwind(AssertUnwindSafe(|| print_normalized(&input, source_type)))
        .unwrap_or_else(|_| Ok(input.clone()))
        .unwrap_or(input);

    outcome.actual = match compressed {
        Ok(Ok(actual)) => actual,
        Ok(Err(err)) => {
            outcome.kind = Kind::ParseError;
            outcome.note = err;
            return Ok(outcome);
        }
        Err(payload) => {
            outcome.kind = Kind::Panic;
            outcome.note = panic_message(&payload);
            return Ok(outcome);
        }
    };

    outcome.expected = match panic::catch_unwind(AssertUnwindSafe(|| {
        print_normalized(&expected_source, source_type)
    })) {
        Ok(Ok(expected)) => expected,
        Ok(Err(err)) => {
            outcome.kind = Kind::ParseError;
            outcome.note = err;
            return Ok(outcome);
        }
        Err(payload) => {
            outcome.kind = Kind::Panic;
            outcome.note = format!("printing output.js: {}", panic_message(&payload));
            return Ok(outcome);
        }
    };

    // Idempotency is reported independently of the comparison result.
    outcome.idempotency = match run_compress(&outcome.actual, source_type) {
        Ok(Ok(second)) if second != outcome.actual => Some(second),
        Ok(Ok(_)) => None,
        Ok(Err(err)) => Some(format!("<reparse failed: {err}>")),
        Err(payload) => Some(format!("<panicked: {}>", panic_message(&payload))),
    };

    outcome.actual_size = minified_size(&outcome.actual, source_type);
    outcome.expected_size = minified_size(&outcome.expected, source_type);

    outcome.kind = Kind::classify(
        &outcome.actual,
        &outcome.expected,
        outcome.actual_size,
        outcome.expected_size,
        outcome.idempotency.is_none(),
    );
    Ok(outcome)
}

/// Byte length of `source` once whitespace is removed, so size comparisons do
/// not depend on formatting. Falls back to the printed length if the code
/// cannot be re-printed.
fn minified_size(source: &str, source_type: SourceType) -> usize {
    panic::catch_unwind(AssertUnwindSafe(|| print_minified(source, source_type)))
        .ok()
        .and_then(Result::ok)
        .map_or_else(|| source.len(), |minified| minified.len())
}

fn panic_message(payload: &Box<dyn Any + Send>) -> String {
    payload.downcast_ref::<&str>().map_or_else(
        || {
            payload
                .downcast_ref::<String>()
                .map_or_else(|| "unknown panic".to_string(), std::clone::Clone::clone)
        },
        |message| (*message).to_string(),
    )
}
