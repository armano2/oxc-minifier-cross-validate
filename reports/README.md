# oxc_minifier cross validation

Fixtures run: 6786

## Summary

| family | config | smaller | not-idempotent | panic | larger | differs | input-parse-error | expected-parse-error | config-error | no-expected | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| pass-1 | clean | 2 | 0 | 0 | 8 | 2 | 0 | 0 | 0 | 0 | 5 | 17 |
| pass-1 | unsupported keys | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| swc | clean | 81 | 2 | 1 | 220 | 23 | 1 | 1 | 0 | 1 | 82 | 412 |
| swc | unsupported keys | 31 | 0 | 0 | 53 | 7 | 0 | 0 | 0 | 0 | 23 | 114 |
| terser | clean | 402 | 16 | 1 | 343 | 54 | 6 | 0 | 0 | 0 | 397 | 1219 |
| terser | unsupported keys | 191 | 12 | 0 | 516 | 19 | 2 | 0 | 0 | 0 | 174 | 914 |
| uglify | clean | 903 | 3 | 0 | 654 | 116 | 19 | 0 | 0 | 0 | 643 | 2338 |
| uglify | unsupported keys | 406 | 3 | 0 | 1002 | 33 | 1 | 3 | 0 | 0 | 323 | 1771 |
| **all** |  | 2016 | 36 | 2 | 2797 | 254 | 29 | 4 | 0 | 1 | 1647 | 6786 |

## Families

| family | fixtures | reports | details |
|---|---:|---:|---|
| pass-1 | 18 | 3 | [pass-1/](pass-1/README.md) |
| swc | 526 | 8 | [swc/](swc/README.md) |
| terser | 2133 | 6 | [terser/](terser/README.md) |
| uglify | 4109 | 6 | [uglify/](uglify/README.md) |

## Reports

| family | kind | fixtures | file |
|---|---|---:|---|
| pass-1 | smaller | 2 | [pass-1/smaller.md](pass-1/smaller.md) |
| pass-1 | larger | 9 | [pass-1/larger.md](pass-1/larger.md) |
| pass-1 | differs | 2 | [pass-1/differs.md](pass-1/differs.md) |
| swc | smaller | 112 | [swc/smaller.md](swc/smaller.md) |
| swc | not-idempotent | 2 | [swc/not-idempotent.md](swc/not-idempotent.md) |
| swc | panic | 1 | [swc/panic.md](swc/panic.md) |
| swc | larger | 273 | [swc/larger.md](swc/larger.md) |
| swc | differs | 30 | [swc/differs.md](swc/differs.md) |
| swc | input-parse-error | 1 | [swc/input-parse-error.md](swc/input-parse-error.md) |
| swc | expected-parse-error | 1 | [swc/expected-parse-error.md](swc/expected-parse-error.md) |
| swc | no-expected | 1 | [swc/no-expected.md](swc/no-expected.md) |
| terser | smaller | 593 | [terser/smaller.md](terser/smaller.md) |
| terser | not-idempotent | 28 | [terser/not-idempotent.md](terser/not-idempotent.md) |
| terser | panic | 1 | [terser/panic.md](terser/panic.md) |
| terser | larger | 859 | [terser/larger.md](terser/larger.md) |
| terser | differs | 73 | [terser/differs.md](terser/differs.md) |
| terser | input-parse-error | 8 | [terser/input-parse-error.md](terser/input-parse-error.md) |
| uglify | smaller | 1309 | [uglify/smaller.md](uglify/smaller.md) |
| uglify | not-idempotent | 6 | [uglify/not-idempotent.md](uglify/not-idempotent.md) |
| uglify | larger | 1656 | [uglify/larger.md](uglify/larger.md) |
| uglify | differs | 149 | [uglify/differs.md](uglify/differs.md) |
| uglify | input-parse-error | 20 | [uglify/input-parse-error.md](uglify/input-parse-error.md) |
| uglify | expected-parse-error | 3 | [uglify/expected-parse-error.md](uglify/expected-parse-error.md) |
