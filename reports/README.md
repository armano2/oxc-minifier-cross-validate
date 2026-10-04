# oxc_minifier cross validation

Fixtures run: 6949

## Summary

| family | smaller | not-idempotent | panic | larger | whitespace | differs | parse-error | config-error | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|
| pass-1 | 2 | 0 | 0 | 9 | 1 | 2 | 0 | 0 | 5 | 19 |
| swc | 167 | 3 | 1 | 330 | 4 | 39 | 2 | 0 | 142 | 688 |
| terser | 593 | 28 | 1 | 842 | 10 | 78 | 8 | 0 | 573 | 2133 |
| uglify | 1291 | 6 | 0 | 1594 | 17 | 211 | 23 | 0 | 967 | 4109 |
| **all** | 2053 | 37 | 2 | 2775 | 32 | 330 | 33 | 0 | 1687 | 6949 |

## Families

| family | fixtures | reports | details |
|---|---:|---:|---|
| pass-1 | 19 | 4 | [pass-1/](pass-1/README.md) |
| swc | 688 | 7 | [swc/](swc/README.md) |
| terser | 2133 | 7 | [terser/](terser/README.md) |
| uglify | 4109 | 6 | [uglify/](uglify/README.md) |

## Reports

| family | kind | fixtures | file |
|---|---|---:|---|
| pass-1 | smaller | 2 | [pass-1/smaller.md](pass-1/smaller.md) |
| pass-1 | larger | 9 | [pass-1/larger.md](pass-1/larger.md) |
| pass-1 | whitespace | 1 | [pass-1/whitespace.md](pass-1/whitespace.md) |
| pass-1 | differs | 2 | [pass-1/differs.md](pass-1/differs.md) |
| swc | smaller | 167 | [swc/smaller.md](swc/smaller.md) |
| swc | not-idempotent | 3 | [swc/not-idempotent.md](swc/not-idempotent.md) |
| swc | panic | 1 | [swc/panic.md](swc/panic.md) |
| swc | larger | 330 | [swc/larger.md](swc/larger.md) |
| swc | whitespace | 4 | [swc/whitespace.md](swc/whitespace.md) |
| swc | differs | 39 | [swc/differs.md](swc/differs.md) |
| swc | parse-error | 2 | [swc/parse-error.md](swc/parse-error.md) |
| terser | smaller | 593 | [terser/smaller.md](terser/smaller.md) |
| terser | not-idempotent | 28 | [terser/not-idempotent.md](terser/not-idempotent.md) |
| terser | panic | 1 | [terser/panic.md](terser/panic.md) |
| terser | larger | 842 | [terser/larger.md](terser/larger.md) |
| terser | whitespace | 10 | [terser/whitespace.md](terser/whitespace.md) |
| terser | differs | 78 | [terser/differs.md](terser/differs.md) |
| terser | parse-error | 8 | [terser/parse-error.md](terser/parse-error.md) |
| uglify | smaller | 1291 | [uglify/smaller.md](uglify/smaller.md) |
| uglify | not-idempotent | 6 | [uglify/not-idempotent.md](uglify/not-idempotent.md) |
| uglify | larger | 1594 | [uglify/larger.md](uglify/larger.md) |
| uglify | whitespace | 17 | [uglify/whitespace.md](uglify/whitespace.md) |
| uglify | differs | 211 | [uglify/differs.md](uglify/differs.md) |
| uglify | parse-error | 23 | [uglify/parse-error.md](uglify/parse-error.md) |
