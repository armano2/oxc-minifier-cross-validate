# oxc_minifier cross validation

Fixtures run: 6949

## Summary

| family | smaller | not-idempotent | panic | larger | whitespace | differs | parse-error | config-error | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|
| pass-1 | 2 | 0 | 0 | 10 | 1 | 2 | 0 | 0 | 4 | 19 |
| swc | 126 | 2 | 0 | 361 | 4 | 53 | 2 | 0 | 140 | 688 |
| terser | 428 | 28 | 0 | 959 | 9 | 101 | 9 | 0 | 599 | 2133 |
| uglify | 1107 | 4 | 1 | 1720 | 19 | 235 | 24 | 0 | 999 | 4109 |
| **all** | 1663 | 34 | 1 | 3050 | 33 | 391 | 35 | 0 | 1742 | 6949 |

## Families

| family | fixtures | reports | details |
|---|---:|---:|---|
| pass-1 | 19 | 4 | [pass-1/](pass-1/README.md) |
| swc | 688 | 6 | [swc/](swc/README.md) |
| terser | 2133 | 6 | [terser/](terser/README.md) |
| uglify | 4109 | 7 | [uglify/](uglify/README.md) |

## Reports

| family | kind | fixtures | file |
|---|---|---:|---|
| pass-1 | smaller | 2 | [pass-1/smaller.md](pass-1/smaller.md) |
| pass-1 | larger | 10 | [pass-1/larger.md](pass-1/larger.md) |
| pass-1 | whitespace | 1 | [pass-1/whitespace.md](pass-1/whitespace.md) |
| pass-1 | differs | 2 | [pass-1/differs.md](pass-1/differs.md) |
| swc | smaller | 126 | [swc/smaller.md](swc/smaller.md) |
| swc | not-idempotent | 2 | [swc/not-idempotent.md](swc/not-idempotent.md) |
| swc | larger | 361 | [swc/larger.md](swc/larger.md) |
| swc | whitespace | 4 | [swc/whitespace.md](swc/whitespace.md) |
| swc | differs | 53 | [swc/differs.md](swc/differs.md) |
| swc | parse-error | 2 | [swc/parse-error.md](swc/parse-error.md) |
| terser | smaller | 428 | [terser/smaller.md](terser/smaller.md) |
| terser | not-idempotent | 27 | [terser/not-idempotent.md](terser/not-idempotent.md) |
| terser | larger | 959 | [terser/larger.md](terser/larger.md) |
| terser | whitespace | 9 | [terser/whitespace.md](terser/whitespace.md) |
| terser | differs | 101 | [terser/differs.md](terser/differs.md) |
| terser | parse-error | 9 | [terser/parse-error.md](terser/parse-error.md) |
| uglify | smaller | 1107 | [uglify/smaller.md](uglify/smaller.md) |
| uglify | not-idempotent | 4 | [uglify/not-idempotent.md](uglify/not-idempotent.md) |
| uglify | panic | 1 | [uglify/panic.md](uglify/panic.md) |
| uglify | larger | 1720 | [uglify/larger.md](uglify/larger.md) |
| uglify | whitespace | 19 | [uglify/whitespace.md](uglify/whitespace.md) |
| uglify | differs | 235 | [uglify/differs.md](uglify/differs.md) |
| uglify | parse-error | 24 | [uglify/parse-error.md](uglify/parse-error.md) |
