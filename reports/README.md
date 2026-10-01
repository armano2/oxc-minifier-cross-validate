# oxc_minifier cross validation

Fixtures run: 6786

## Summary

| family | smaller | not-idempotent | panic | larger | differs | parse-error | config-error | pass | total |
|---|---|---|---|---|---|---|---|---|---|
| pass-1 | 2 | 0 | 0 | 9 | 2 | 0 | 0 | 5 | 18 |
| swc | 109 | 2 | 1 | 267 | 33 | 2 | 0 | 112 | 526 |
| terser | 593 | 28 | 1 | 852 | 78 | 8 | 0 | 573 | 2133 |
| uglify | 1291 | 6 | 0 | 1611 | 211 | 23 | 0 | 967 | 4109 |
| **all** | 1995 | 36 | 2 | 2739 | 324 | 33 | 0 | 1657 | 6786 |

## Families

| family | fixtures | reports | details |
|---|---:|---:|---|
| pass-1 | 18 | 3 | [pass-1/](pass-1/README.md) |
| swc | 526 | 6 | [swc/](swc/README.md) |
| terser | 2133 | 6 | [terser/](terser/README.md) |
| uglify | 4109 | 5 | [uglify/](uglify/README.md) |

## Reports

| family | kind | fixtures | file |
|---|---|---:|---|
| pass-1 | smaller | 2 | [pass-1/smaller.md](pass-1/smaller.md) |
| pass-1 | larger | 9 | [pass-1/larger.md](pass-1/larger.md) |
| pass-1 | differs | 2 | [pass-1/differs.md](pass-1/differs.md) |
| swc | smaller | 109 | [swc/smaller.md](swc/smaller.md) |
| swc | not-idempotent | 2 | [swc/not-idempotent.md](swc/not-idempotent.md) |
| swc | panic | 1 | [swc/panic.md](swc/panic.md) |
| swc | larger | 267 | [swc/larger.md](swc/larger.md) |
| swc | differs | 33 | [swc/differs.md](swc/differs.md) |
| swc | parse-error | 2 | [swc/parse-error.md](swc/parse-error.md) |
| terser | smaller | 593 | [terser/smaller.md](terser/smaller.md) |
| terser | not-idempotent | 28 | [terser/not-idempotent.md](terser/not-idempotent.md) |
| terser | panic | 1 | [terser/panic.md](terser/panic.md) |
| terser | larger | 852 | [terser/larger.md](terser/larger.md) |
| terser | differs | 78 | [terser/differs.md](terser/differs.md) |
| terser | parse-error | 8 | [terser/parse-error.md](terser/parse-error.md) |
| uglify | smaller | 1291 | [uglify/smaller.md](uglify/smaller.md) |
| uglify | not-idempotent | 6 | [uglify/not-idempotent.md](uglify/not-idempotent.md) |
| uglify | larger | 1611 | [uglify/larger.md](uglify/larger.md) |
| uglify | differs | 211 | [uglify/differs.md](uglify/differs.md) |
| uglify | parse-error | 23 | [uglify/parse-error.md](uglify/parse-error.md) |
