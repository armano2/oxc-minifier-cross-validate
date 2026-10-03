# Cross-validation reports

This task runs Oxc's compressor against third-party minifier fixtures and
reports where the output disagrees with the reference `output.js`.

The fixture corpus is read from the repository's `fixtures` directory. The
fixtures are organized into Terser, SWC, and pass-1 style test directories.

## Usage

The workspace `dev` profile is configured for this testing harness with
`panic = "unwind"`, so panics from individual fixtures can be caught and
reported without terminating the entire run.

Run the task from the workspace root:

```bash
cargo run -- [filter] [options]
```

Options:

- `--fixtures <dir>`: fixture root, defaults to `fixtures`
- `--family <name>`: only run a top-level family (`terser`, `swc`, `pass-1`, `uglify`)
- `--only <kind>`: only report a classification (`smaller`, `larger`,
  `differs`, `not-idempotent`, `panic`, ...)
- `--limit <n>`: stop after `n` fixtures
- `--clean`: only run fixtures whose config has no unsupported keys
- `--verbose`: log each fixture path before running it

## Report layout

Reports are written to the repository's `reports` directory, one directory
per family, with a global overview linking all of them:

```text
reports/
  README.md          <- global overview across every family
  terser/
    README.md        <- per-family summary
    smaller.md       <- one file per classification
    larger.md
  swc/
    ...
```
