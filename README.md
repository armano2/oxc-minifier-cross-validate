# oxc_minifier cross validation

Fixtures run: 6936

## Summary

| family | config | smaller | not-idempotent | panic | larger | differs | input-parse-error | expected-parse-error | config-error | no-expected | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| pass-1 | clean | 9 | 0 | 0 | 5 | 0 | 0 | 0 | 0 | 0 | 2 | 16 |
| pass-1 | unsupported keys | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 |
| swc | clean | 163 | 2 | 1 | 160 | 19 | 1 | 1 | 0 | 1 | 45 | 393 |
| swc | unsupported keys | 82 | 0 | 0 | 25 | 7 | 0 | 0 | 0 | 0 | 19 | 133 |
| terser | clean | 228 | 1 | 0 | 177 | 42 | 6 | 0 | 0 | 0 | 217 | 671 |
| terser | unsupported keys | 399 | 2 | 1 | 691 | 86 | 2 | 0 | 0 | 0 | 281 | 1462 |
| uglify | clean | 363 | 2 | 0 | 147 | 82 | 15 | 0 | 0 | 0 | 262 | 871 |
| uglify | unsupported keys | 1023 | 9 | 0 | 1533 | 225 | 5 | 3 | 0 | 0 | 590 | 3388 |
| **all** |  | 2269 | 16 | 2 | 2738 | 461 | 29 | 4 | 0 | 1 | 1416 | 6936 |

## Families

| family | fixtures | reports | details |
|---|---:|---:|---|
| pass-1 | 18 | 2 | [pass-1/](pass-1/README.md) |
| swc | 526 | 8 | [swc/](swc/README.md) |
| terser | 2133 | 6 | [terser/](terser/README.md) |
| uglify | 4259 | 6 | [uglify/](uglify/README.md) |

## Reports

| family | kind | fixtures | file |
|---|---|---:|---|
| pass-1 | smaller | 11 | [pass-1/smaller.md](pass-1/smaller.md) |
| pass-1 | larger | 5 | [pass-1/larger.md](pass-1/larger.md) |
| swc | smaller | 245 | [swc/smaller.md](swc/smaller.md) |
| swc | not-idempotent | 2 | [swc/not-idempotent.md](swc/not-idempotent.md) |
| swc | panic | 1 | [swc/panic.md](swc/panic.md) |
| swc | larger | 185 | [swc/larger.md](swc/larger.md) |
| swc | differs | 26 | [swc/differs.md](swc/differs.md) |
| swc | input-parse-error | 1 | [swc/input-parse-error.md](swc/input-parse-error.md) |
| swc | expected-parse-error | 1 | [swc/expected-parse-error.md](swc/expected-parse-error.md) |
| swc | no-expected | 1 | [swc/no-expected.md](swc/no-expected.md) |
| terser | smaller | 627 | [terser/smaller.md](terser/smaller.md) |
| terser | not-idempotent | 3 | [terser/not-idempotent.md](terser/not-idempotent.md) |
| terser | panic | 1 | [terser/panic.md](terser/panic.md) |
| terser | larger | 868 | [terser/larger.md](terser/larger.md) |
| terser | differs | 128 | [terser/differs.md](terser/differs.md) |
| terser | input-parse-error | 8 | [terser/input-parse-error.md](terser/input-parse-error.md) |
| uglify | smaller | 1386 | [uglify/smaller.md](uglify/smaller.md) |
| uglify | not-idempotent | 11 | [uglify/not-idempotent.md](uglify/not-idempotent.md) |
| uglify | larger | 1680 | [uglify/larger.md](uglify/larger.md) |
| uglify | differs | 307 | [uglify/differs.md](uglify/differs.md) |
| uglify | input-parse-error | 20 | [uglify/input-parse-error.md](uglify/input-parse-error.md) |
| uglify | expected-parse-error | 3 | [uglify/expected-parse-error.md](uglify/expected-parse-error.md) |
