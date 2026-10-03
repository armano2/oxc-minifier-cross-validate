use std::path::PathBuf;

use pico_args::Arguments;

pub struct Options {
    pub fixtures: PathBuf,
    pub family: Option<String>,
    pub only: Option<String>,
    pub limit: Option<usize>,
    pub clean_only: bool,
    pub verbose: bool,
    pub filter: Option<String>,
}

impl Options {
    pub fn from_env() -> Self {
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
