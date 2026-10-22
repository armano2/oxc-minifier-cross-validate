# oxc_minifier cross validation

Fixtures run: 6996

## Summary

| family | smaller | not-idempotent | panic | larger | whitespace | differs | parse-error | config-error | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|
| pass-1 | 2 | 0 | 0 | 11 | 1 | 2 | 0 | 0 | 4 | 20 |
| swc | 138 | 4 | 0 | 387 | 4 | 54 | 2 | 0 | 142 | 731 |
| terser | 428 | 28 | 0 | 960 | 9 | 101 | 9 | 0 | 599 | 2134 |
| uglify | 1107 | 4 | 1 | 1721 | 19 | 235 | 25 | 0 | 999 | 4111 |
| **all** | 1675 | 36 | 1 | 3079 | 33 | 392 | 36 | 0 | 1744 | 6996 |

## Families

| family | fixtures | reports | details |
|---|---:|---:|---|
| pass-1 | 20 | 4 | [pass-1/](pass-1/README.md) |
| swc | 731 | 6 | [swc/](swc/README.md) |
| terser | 2134 | 6 | [terser/](terser/README.md) |
| uglify | 4111 | 7 | [uglify/](uglify/README.md) |

## Reports

| family | kind | fixtures | file |
|---|---|---:|---|
| pass-1 | smaller | 2 | [pass-1/smaller.md](pass-1/smaller.md) |
| pass-1 | larger | 11 | [pass-1/larger.md](pass-1/larger.md) |
| pass-1 | whitespace | 1 | [pass-1/whitespace.md](pass-1/whitespace.md) |
| pass-1 | differs | 2 | [pass-1/differs.md](pass-1/differs.md) |
| swc | smaller | 138 | [swc/smaller.md](swc/smaller.md) |
| swc | not-idempotent | 4 | [swc/not-idempotent.md](swc/not-idempotent.md) |
| swc | larger | 387 | [swc/larger.md](swc/larger.md) |
| swc | whitespace | 4 | [swc/whitespace.md](swc/whitespace.md) |
| swc | differs | 54 | [swc/differs.md](swc/differs.md) |
| swc | parse-error | 2 | [swc/parse-error.md](swc/parse-error.md) |
| terser | smaller | 428 | [terser/smaller.md](terser/smaller.md) |
| terser | not-idempotent | 27 | [terser/not-idempotent.md](terser/not-idempotent.md) |
| terser | larger | 960 | [terser/larger.md](terser/larger.md) |
| terser | whitespace | 9 | [terser/whitespace.md](terser/whitespace.md) |
| terser | differs | 101 | [terser/differs.md](terser/differs.md) |
| terser | parse-error | 9 | [terser/parse-error.md](terser/parse-error.md) |
| uglify | smaller | 1107 | [uglify/smaller.md](uglify/smaller.md) |
| uglify | not-idempotent | 4 | [uglify/not-idempotent.md](uglify/not-idempotent.md) |
| uglify | panic | 1 | [uglify/panic.md](uglify/panic.md) |
| uglify | larger | 1721 | [uglify/larger.md](uglify/larger.md) |
| uglify | whitespace | 19 | [uglify/whitespace.md](uglify/whitespace.md) |
| uglify | differs | 235 | [uglify/differs.md](uglify/differs.md) |
| uglify | parse-error | 25 | [uglify/parse-error.md](uglify/parse-error.md) |
