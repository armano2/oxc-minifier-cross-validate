use std::path::PathBuf;

use pico_args::Arguments;

pub(crate) struct Options {
    pub(crate) fixtures: PathBuf,
    pub(crate) family: Option<String>,
    pub(crate) only: Option<String>,
    pub(crate) limit: Option<usize>,
    pub(crate) clean_only: bool,
    pub(crate) verbose: bool,
    pub(crate) filter: Option<String>,
}

impl Options {
    pub(crate) fn from_env() -> Self {
        let mut args = Arguments::from_env();
        let fixtures: Option<String> = args.opt_value_from_str("--fixtures").unwrap_or(None);
        let family = args.opt_value_from_str("--family").unwrap_or(None);
        let only = args.opt_value_from_str("--only").unwrap_or(None);
        let limit = args.opt_value_from_str("--limit").unwrap_or(None);
        let clean_only = args.contains("--clean");
        let verbose = args.contains("--verbose");
        let filter = args.free_from_str().ok();

        Self {
            fixtures: fixtures.map_or_else(|| PathBuf::from("fixtures"), PathBuf::from),
            family,
            only,
            limit,
            clean_only,
            verbose,
            filter,
        }
    }
}
