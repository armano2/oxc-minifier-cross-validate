# oxc_minifier cross validation

Fixtures run: 6949

## Summary

| family | smaller | not-idempotent | panic | larger | whitespace | differs | parse-error | config-error | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|
| pass-1 | 2 | 0 | 0 | 10 | 1 | 2 | 0 | 0 | 4 | 19 |
| swc | 123 | 3 | 1 | 364 | 4 | 52 | 2 | 0 | 139 | 688 |
| terser | 426 | 28 | 0 | 979 | 9 | 97 | 9 | 0 | 585 | 2133 |
| uglify | 1099 | 4 | 1 | 1738 | 20 | 232 | 24 | 0 | 991 | 4109 |
| **all** | 1650 | 35 | 2 | 3091 | 34 | 383 | 35 | 0 | 1719 | 6949 |

## Families

| family | fixtures | reports | details |
|---|---:|---:|---|
| pass-1 | 19 | 4 | [pass-1/](pass-1/README.md) |
| swc | 688 | 7 | [swc/](swc/README.md) |
| terser | 2133 | 6 | [terser/](terser/README.md) |
| uglify | 4109 | 7 | [uglify/](uglify/README.md) |

## Reports

| family | kind | fixtures | file |
|---|---|---:|---|
| pass-1 | smaller | 2 | [pass-1/smaller.md](pass-1/smaller.md) |
| pass-1 | larger | 10 | [pass-1/larger.md](pass-1/larger.md) |
| pass-1 | whitespace | 1 | [pass-1/whitespace.md](pass-1/whitespace.md) |
| pass-1 | differs | 2 | [pass-1/differs.md](pass-1/differs.md) |
| swc | smaller | 123 | [swc/smaller.md](swc/smaller.md) |
| swc | not-idempotent | 3 | [swc/not-idempotent.md](swc/not-idempotent.md) |
| swc | panic | 1 | [swc/panic.md](swc/panic.md) |
| swc | larger | 364 | [swc/larger.md](swc/larger.md) |
| swc | whitespace | 4 | [swc/whitespace.md](swc/whitespace.md) |
| swc | differs | 52 | [swc/differs.md](swc/differs.md) |
| swc | parse-error | 2 | [swc/parse-error.md](swc/parse-error.md) |
| terser | smaller | 426 | [terser/smaller.md](terser/smaller.md) |
| terser | not-idempotent | 27 | [terser/not-idempotent.md](terser/not-idempotent.md) |
| terser | larger | 979 | [terser/larger.md](terser/larger.md) |
| terser | whitespace | 9 | [terser/whitespace.md](terser/whitespace.md) |
| terser | differs | 97 | [terser/differs.md](terser/differs.md) |
| terser | parse-error | 9 | [terser/parse-error.md](terser/parse-error.md) |
| uglify | smaller | 1099 | [uglify/smaller.md](uglify/smaller.md) |
| uglify | not-idempotent | 4 | [uglify/not-idempotent.md](uglify/not-idempotent.md) |
| uglify | panic | 1 | [uglify/panic.md](uglify/panic.md) |
| uglify | larger | 1738 | [uglify/larger.md](uglify/larger.md) |
| uglify | whitespace | 20 | [uglify/whitespace.md](uglify/whitespace.md) |
| uglify | differs | 232 | [uglify/differs.md](uglify/differs.md) |
| uglify | parse-error | 24 | [uglify/parse-error.md](uglify/parse-error.md) |
