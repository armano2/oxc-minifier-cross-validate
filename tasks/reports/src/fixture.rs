use std::{
    fs,
    path::{Path, PathBuf},
};

use crate::report::MAX_SNIPPET_BYTES;

pub(crate) struct Fixture {
    pub(crate) dir: PathBuf,
    /// Path relative to the fixture root, always `/`-separated.
    pub(crate) relative: String,
    /// First component of [`Fixture::relative`], e.g. `terser` or `swc`.
    pub(crate) family: String,
}

pub(crate) struct Discovery {
    pub(crate) fixtures: Vec<Fixture>,
    pub(crate) skipped_oversized: usize,
}

/// Recursively collect every directory under `root` that contains `input.js`.
pub(crate) fn discover(root: &Path) -> Discovery {
    let mut discovery = Discovery { fixtures: Vec::new(), skipped_oversized: 0 };
    walk(root, root, &mut discovery);
    discovery
}

fn walk(root: &Path, dir: &Path, discovery: &mut Discovery) {
    let Ok(entries) = fs::read_dir(dir) else { return };
    let mut dirs: Vec<PathBuf> =
        entries.flatten().map(|entry| entry.path()).filter(|path| path.is_dir()).collect();
    dirs.sort();
    for dir in dirs {
        if dir.join("input.js").is_file() {
            if is_oversized(&dir) {
                discovery.skipped_oversized += 1;
            } else {
                discovery.fixtures.push(fixture(root, dir.clone()));
            }
        }
        walk(root, &dir, discovery);
    }
}

fn fixture(root: &Path, dir: PathBuf) -> Fixture {
    let relative = dir
        .strip_prefix(root)
        .unwrap_or(&dir)
        .components()
        .map(|component| component.as_os_str().to_string_lossy())
        .collect::<Vec<_>>()
        .join("/");
    let family = relative.split('/').next().unwrap_or("<root>").to_string();
    Fixture { dir, relative, family }
}

/// Fixtures whose sources exceed the snippet budget are not reviewable in the
/// report, so they are skipped outright.
fn is_oversized(dir: &Path) -> bool {
    ["input.js", "output.js"].iter().any(|name| {
        fs::metadata(dir.join(name)).is_ok_and(|metadata| metadata.len() > MAX_SNIPPET_BYTES as u64)
    })
}
