#![expect(clippy::print_stdout, clippy::print_stderr)]

mod cli;
mod config;
mod fixture;
mod outcome;
mod pipeline;
mod report;
mod runner;
mod tags;

use std::path::Path;

use outcome::{Kind, Outcome};

fn main() -> std::io::Result<()> {
    let options = cli::Options::from_env();
    let root = options.fixtures.as_path();
    if !root.is_dir() {
        eprintln!("fixture root `{}` does not exist", root.display());
        std::process::exit(1);
    }

    let discovery = fixture::discover(root);
    println!("discovered {} fixtures under {}", discovery.fixtures.len(), root.display());
    if discovery.skipped_oversized > 0 {
        println!(
            "skipped {} fixtures larger than {} bytes",
            discovery.skipped_oversized,
            report::MAX_SNIPPET_BYTES
        );
    }

    let run = runner::run_all(root, &discovery.fixtures, &options);

    let report_dir = Path::new("reports");
    let family_reports = report::write_reports(&run.outcomes, options.only.as_deref(), report_dir)?;

    println!("\nran {} fixtures", run.outcomes.len());
    if run.skipped_ie8 > 0 {
        println!("skipped {} fixtures configured with `ie8`", run.skipped_ie8);
    }
    for kind in Kind::all() {
        let count = run.outcomes.iter().filter(|outcome| outcome.kind == kind).count();
        if count > 0 {
            println!("  {:<20} {count}", kind.id());
        }
    }
    println!("\nreport: {}", report_dir.join("README.md").display());
    for report in &family_reports {
        println!(
            "  {:<12} {:>5} fixtures  {}/README.md",
            report.family, report.total, report.dir_name
        );
    }

    Ok(())
}
