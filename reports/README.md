# oxc_minifier cross validation

Fixtures run: 6949

## Summary

| family | smaller | not-idempotent | panic | larger | whitespace | differs | parse-error | config-error | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|
| pass-1 | 2 | 0 | 0 | 10 | 1 | 2 | 0 | 0 | 4 | 19 |
| swc | 123 | 3 | 1 | 367 | 4 | 42 | 2 | 0 | 146 | 688 |
| terser | 421 | 28 | 0 | 989 | 9 | 83 | 9 | 0 | 594 | 2133 |
| uglify | 1087 | 4 | 1 | 1757 | 18 | 216 | 24 | 0 | 1002 | 4109 |
| **all** | 1633 | 35 | 2 | 3123 | 32 | 343 | 35 | 0 | 1746 | 6949 |

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
| swc | larger | 367 | [swc/larger.md](swc/larger.md) |
| swc | whitespace | 4 | [swc/whitespace.md](swc/whitespace.md) |
| swc | differs | 42 | [swc/differs.md](swc/differs.md) |
| swc | parse-error | 2 | [swc/parse-error.md](swc/parse-error.md) |
| terser | smaller | 421 | [terser/smaller.md](terser/smaller.md) |
| terser | not-idempotent | 27 | [terser/not-idempotent.md](terser/not-idempotent.md) |
| terser | larger | 989 | [terser/larger.md](terser/larger.md) |
| terser | whitespace | 9 | [terser/whitespace.md](terser/whitespace.md) |
| terser | differs | 83 | [terser/differs.md](terser/differs.md) |
| terser | parse-error | 9 | [terser/parse-error.md](terser/parse-error.md) |
| uglify | smaller | 1087 | [uglify/smaller.md](uglify/smaller.md) |
| uglify | not-idempotent | 4 | [uglify/not-idempotent.md](uglify/not-idempotent.md) |
| uglify | panic | 1 | [uglify/panic.md](uglify/panic.md) |
| uglify | larger | 1757 | [uglify/larger.md](uglify/larger.md) |
| uglify | whitespace | 18 | [uglify/whitespace.md](uglify/whitespace.md) |
| uglify | differs | 216 | [uglify/differs.md](uglify/differs.md) |
| uglify | parse-error | 24 | [uglify/parse-error.md](uglify/parse-error.md) |
