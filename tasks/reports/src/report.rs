use std::{fmt::Write as _, fs, path::Path};

use similar::TextDiff;

use crate::{Kind, Outcome};

pub(crate) const MAX_SNIPPET_BYTES: usize = 1600;

fn snippet(text: &str) -> String {
    if text.len() <= MAX_SNIPPET_BYTES {
        return text.to_string();
    }
    let mut end = MAX_SNIPPET_BYTES;
    while !text.is_char_boundary(end) {
        end -= 1;
    }
    format!("{}\n... [truncated]", &text[..end])
}

fn diff_snippet(expected: &str, actual: &str) -> String {
    let diff = TextDiff::from_lines(expected, actual);
    snippet(&diff.unified_diff().header("reference", "oxc").to_string())
}

#[derive(Debug)]
struct KindReport {
    kind: Kind,
    rows: usize,
    file_name: String,
}

#[derive(Debug)]
pub(crate) struct FamilyReport {
    pub(crate) family: String,
    pub(crate) dir_name: String,
    pub(crate) total: usize,
    kind_reports: Vec<KindReport>,
}

fn should_write_kind(kind: Kind, only: Option<&str>) -> bool {
    if kind == Kind::Pass {
        return false;
    }
    !only.is_some_and(|only| only != kind.id())
}

fn rows_for_kind<'a>(outcomes: &[&'a Outcome], kind: Kind) -> Vec<&'a Outcome> {
    let mut rows: Vec<&Outcome> = outcomes
        .iter()
        .copied()
        .filter(|outcome| {
            outcome.kind == kind
                && (outcome.actual.is_empty() || outcome.actual != outcome.expected)
        })
        .collect();
    if matches!(kind, Kind::Larger | Kind::Smaller) {
        rows.sort_by(|left, right| {
            left.actual
                .len()
                .abs_diff(left.expected.len())
                .cmp(&right.actual.len().abs_diff(right.expected.len()))
                .then_with(|| left.relative.cmp(&right.relative))
        });
    }
    rows
}

fn family_dir_name(family: &str) -> String {
    let sanitized: String = family
        .chars()
        .map(|char| {
            if char.is_ascii_alphanumeric() || matches!(char, '-' | '_' | '.') { char } else { '-' }
        })
        .collect();
    if sanitized.is_empty() { "unnamed".to_string() } else { sanitized }
}

fn write_kind_table_header(out: &mut String, leading: &[&str]) {
    out.push('|');
    for label in leading {
        let _ = write!(out, " {label} |");
    }
    for kind in Kind::all() {
        let _ = write!(out, " {} |", kind.id());
    }
    out.push_str(" total |\n|");
    for _ in 0..=(leading.len() + Kind::all().len()) {
        out.push_str("---|");
    }
    out.push('\n');
}

fn write_kind_table_row(out: &mut String, leading: &[&str], rows: &[&Outcome]) {
    out.push('|');
    for label in leading {
        let _ = write!(out, " {label} |");
    }
    for kind in Kind::all() {
        let _ = write!(out, " {} |", rows.iter().filter(|outcome| outcome.kind == kind).count());
    }
    let _ = writeln!(out, " {} |", rows.len());
}

fn write_config_breakdown_rows(out: &mut String, rows: &[&Outcome], prefix: Option<&str>) {
    for (label, clean) in [("clean", true), ("unsupported keys", false)] {
        let subset: Vec<&Outcome> = rows
            .iter()
            .copied()
            .filter(|outcome| outcome.unsupported_keys.is_empty() == clean)
            .collect();
        if subset.is_empty() {
            continue;
        }
        let leading = match prefix {
            Some(prefix) => vec![prefix, label],
            None => vec![label],
        };
        write_kind_table_row(out, &leading, &subset);
    }
}

fn write_summary_markdown(outcomes: &[Outcome], family_reports: &[FamilyReport]) -> String {
    let mut out = String::new();
    out.push_str("# oxc_minifier cross validation\n\n");
    let _ = writeln!(out, "Fixtures run: {}\n", outcomes.len());
    let all: Vec<&Outcome> = outcomes.iter().collect();

    out.push_str("## Summary\n\n");
    write_kind_table_header(&mut out, &["family", "config"]);
    for report in family_reports {
        let rows: Vec<&Outcome> =
            outcomes.iter().filter(|outcome| outcome.family == report.family).collect();
        write_config_breakdown_rows(&mut out, &rows, Some(&report.family));
    }
    write_kind_table_row(&mut out, &["**all**", ""], &all);
    out.push('\n');

    if !family_reports.is_empty() {
        out.push_str("## Families\n\n");
        out.push_str("| family | fixtures | reports | details |\n|---|---:|---:|---|\n");
        for report in family_reports {
            let _ = writeln!(
                out,
                "| {} | {} | {} | [{}/]({}/README.md) |",
                report.family,
                report.total,
                report.kind_reports.len(),
                report.dir_name,
                report.dir_name
            );
        }
        out.push('\n');

        out.push_str("## Reports\n\n");
        out.push_str("| family | kind | fixtures | file |\n|---|---|---:|---|\n");
        for report in family_reports {
            for kind_report in &report.kind_reports {
                let link = format!("{}/{}", report.dir_name, kind_report.file_name);
                let _ = writeln!(
                    out,
                    "| {} | {} | {} | [{link}]({link}) |",
                    report.family,
                    kind_report.kind.id(),
                    kind_report.rows
                );
            }
        }
    }
    out
}

fn write_family_markdown(family: &str, rows: &[&Outcome], kind_reports: &[KindReport]) -> String {
    let mut out = String::new();
    let _ = writeln!(out, "# {family} — oxc_minifier cross validation\n");
    let _ = writeln!(out, "Fixtures run: {}\n", rows.len());
    let _ = writeln!(out, "[← all families](../README.md)\n");

    out.push_str("## Summary\n\n");
    write_kind_table_header(&mut out, &["config"]);
    write_config_breakdown_rows(&mut out, rows, None);
    write_kind_table_row(&mut out, &["**all**"], rows);
    out.push('\n');

    if kind_reports.is_empty() {
        out.push_str("No reportable differences.\n");
        return out;
    }

    out.push_str("## Reports\n\n");
    out.push_str("| kind | fixtures | file |\n|---|---:|---|\n");
    for report in kind_reports {
        let _ = writeln!(
            out,
            "| {} | {} | [{}]({}) |",
            report.kind.id(),
            report.rows,
            report.file_name,
            report.file_name
        );
    }
    out
}

fn write_kind_markdown(family: &str, kind: Kind, rows: &[&Outcome]) -> String {
    let mut out = String::new();
    let _ = writeln!(out, "# {family} / {} — {}\n", kind.id(), kind.headline());
    let _ = writeln!(out, "Fixtures: {}\n", rows.len());
    let _ = writeln!(out, "[← {family}](README.md) · [← all families](../README.md)\n");

    for outcome in rows {
        write_outcome_markdown(&mut out, outcome, kind);
    }
    out
}

fn write_outcome_markdown(out: &mut String, outcome: &Outcome, kind: Kind) {
    let _ = writeln!(out, "## `{}`\n", outcome.relative);
    if !outcome.note.is_empty() {
        let _ = writeln!(out, "- note: {}", outcome.note);
    }
    if matches!(kind, Kind::Larger | Kind::Smaller) {
        let delta = outcome.actual.len().cast_signed() - outcome.expected.len().cast_signed();
        let _ = writeln!(
            out,
            "- size: oxc {} vs reference {} ({delta:+} bytes)",
            outcome.actual.len(),
            outcome.expected.len()
        );
    }
    out.push('\n');
    let _ = writeln!(out, "```js\n{}\n```\n", snippet(&outcome.input));
    if !outcome.expected.is_empty() || !outcome.actual.is_empty() {
        let _ =
            writeln!(out, "```diff\n{}\n```\n", diff_snippet(&outcome.expected, &outcome.actual));
    }
    if let Some(second) = &outcome.idempotency {
        let _ = writeln!(out, "```js\n// oxc, second pass\n{}\n```\n", snippet(second));
    }
}

pub(crate) fn write_reports(
    outcomes: &[Outcome],
    only: Option<&str>,
    report_dir: &Path,
) -> std::io::Result<Vec<FamilyReport>> {
    if report_dir.exists() {
        fs::remove_dir_all(report_dir)?;
    }
    fs::create_dir_all(report_dir)?;

    let mut families: Vec<&str> = outcomes.iter().map(|outcome| outcome.family.as_str()).collect();
    families.sort_unstable();
    families.dedup();

    let mut reports = Vec::new();
    for family in families {
        let rows: Vec<&Outcome> =
            outcomes.iter().filter(|outcome| outcome.family == family).collect();
        let dir_name = family_dir_name(family);
        let family_dir = report_dir.join(&dir_name);
        fs::create_dir_all(&family_dir)?;

        let mut kind_reports = Vec::new();
        for kind in Kind::all() {
            if !should_write_kind(kind, only) {
                continue;
            }
            let kind_rows = rows_for_kind(&rows, kind);
            if kind_rows.is_empty() {
                continue;
            }
            let file_name = format!("{}.md", kind.id());
            fs::write(family_dir.join(&file_name), write_kind_markdown(family, kind, &kind_rows))?;
            kind_reports.push(KindReport { kind, rows: kind_rows.len(), file_name });
        }

        fs::write(
            family_dir.join("README.md"),
            write_family_markdown(family, &rows, &kind_reports),
        )?;
        reports.push(FamilyReport {
            family: family.to_string(),
            dir_name,
            total: rows.len(),
            kind_reports,
        });
    }

    let markdown = write_summary_markdown(outcomes, &reports);
    fs::write(report_dir.join("README.md"), markdown)?;
    Ok(reports)
}
