use std::cmp::Ordering;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub(crate) enum Kind {
    Smaller,
    NotIdempotent,
    Panic,
    Larger,
    Differs,
    ParseError,
    ConfigError,
    NoExpected,
    Pass,
}

impl Kind {
    pub(crate) fn id(self) -> &'static str {
        match self {
            Self::Smaller => "smaller",
            Self::NotIdempotent => "not-idempotent",
            Self::Panic => "panic",
            Self::Larger => "larger",
            Self::Differs => "differs",
            Self::ParseError => "parse-error",
            Self::ConfigError => "config-error",
            Self::NoExpected => "no-expected",
            Self::Pass => "pass",
        }
    }

    pub(crate) fn headline(self) -> &'static str {
        match self {
            Self::Smaller => "Output shorter than expected (possible over-optimization / bug)",
            Self::NotIdempotent => "Not idempotent (re-compressing changes the output)",
            Self::Panic => "Panicked",
            Self::Larger => "Output longer than expected (possible missing optimization)",
            Self::Differs => "Output differs at equal length",
            Self::ParseError => "failed to parse",
            Self::ConfigError => "`config.json` failed to parse",
            Self::NoExpected => "No `output.js` to compare against",
            Self::Pass => "Matches the reference output",
        }
    }

    pub(crate) fn all() -> [Self; 9] {
        [
            Self::Smaller,
            Self::NotIdempotent,
            Self::Panic,
            Self::Larger,
            Self::Differs,
            Self::ParseError,
            Self::ConfigError,
            Self::NoExpected,
            Self::Pass,
        ]
    }

    /// Classify a fixture that produced output on both sides. Non-idempotency
    /// takes precedence over any comparison result.
    pub(crate) fn classify(actual: &str, expected: &str, idempotent: bool) -> Self {
        if !idempotent {
            return Self::NotIdempotent;
        }
        if actual == expected {
            return Self::Pass;
        }
        match actual.len().cmp(&expected.len()) {
            Ordering::Less => Self::Smaller,
            Ordering::Greater => Self::Larger,
            Ordering::Equal => Self::Differs,
        }
    }
}

pub(crate) struct Outcome {
    pub(crate) relative: String,
    pub(crate) family: String,
    pub(crate) kind: Kind,
    pub(crate) unsupported_keys: Vec<String>,
    pub(crate) input: String,
    pub(crate) expected: String,
    pub(crate) actual: String,
    /// Output of a second compression pass, set only when it differs from `actual`.
    pub(crate) idempotency: Option<String>,
    pub(crate) note: String,
}
