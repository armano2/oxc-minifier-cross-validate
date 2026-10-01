use std::cmp::Ordering;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum Kind {
    Smaller,
    NotIdempotent,
    Panic,
    Larger,
    LargerWhitespace,
    Differs,
    ParseError,
    ConfigError,
    Pass,
}

impl Kind {
    pub const fn id(self) -> &'static str {
        match self {
            Self::Smaller => "smaller",
            Self::NotIdempotent => "not-idempotent",
            Self::Panic => "panic",
            Self::Larger => "larger",
            Self::LargerWhitespace => "whitespace",
            Self::Differs => "differs",
            Self::ParseError => "parse-error",
            Self::ConfigError => "config-error",
            Self::Pass => "pass",
        }
    }

    pub const fn headline(self) -> &'static str {
        match self {
            Self::Smaller => "Output shorter than expected (possible over-optimization / bug)",
            Self::NotIdempotent => "Not idempotent (re-compressing changes the output)",
            Self::Panic => "Panicked",
            Self::Larger => "Output longer than expected (possible missing optimization)",
            Self::LargerWhitespace => "Output longer after whitespace removal",
            Self::Differs => "Output differs at equal length",
            Self::ParseError => "failed to parse",
            Self::ConfigError => "`config.json` failed to parse",
            Self::Pass => "Matches the reference output",
        }
    }

    pub const fn all() -> [Self; 9] {
        [
            Self::Smaller,
            Self::NotIdempotent,
            Self::Panic,
            Self::Larger,
            Self::LargerWhitespace,
            Self::Differs,
            Self::ParseError,
            Self::ConfigError,
            Self::Pass,
        ]
    }

    /// Classify a fixture that produced output on both sides. Non-idempotency
    /// takes precedence over any comparison result.
    ///
    /// Sizes are measured on whitespace-free output so formatting differences
    /// alone never decide between [`Self::Smaller`] and [`Self::Larger`].
    pub fn classify(
        actual: &str,
        expected: &str,
        actual_size: usize,
        expected_size: usize,
        idempotent: bool,
    ) -> Self {
        if !idempotent {
            return Self::NotIdempotent;
        }
        if actual == expected {
            return Self::Pass;
        }
        let no_whitespace = actual_size.cmp(&expected_size);
        if actual.len() == expected.len() && no_whitespace == Ordering::Greater {
            return Self::LargerWhitespace;
        }
        match no_whitespace {
            Ordering::Less => Self::Smaller,
            Ordering::Greater => Self::Larger,
            Ordering::Equal => Self::Differs,
        }
    }
}

pub struct Outcome {
    pub relative: String,
    pub family: String,
    pub kind: Kind,
    pub tags: Vec<String>,
    pub unsupported_keys: Vec<String>,
    pub input: String,
    pub expected: String,
    pub actual: String,
    /// Byte length of [`Outcome::expected`] without whitespace.
    pub expected_size: usize,
    /// Byte length of [`Outcome::actual`] without whitespace.
    pub actual_size: usize,
    /// Output of a second compression pass, set only when it differs from `actual`.
    pub idempotency: Option<String>,
    pub note: String,
}
