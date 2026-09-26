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
| **all** | | 2269 | 16 | 2 | 2738 | 461 | 29 | 4 | 0 | 1 | 1416 | 6936 |

## Reports

| kind | fixtures | file |
|---|---:|---|
| smaller | 2269 | [./smaller.md](./smaller.md) |
| not-idempotent | 16 | [./not-idempotent.md](./not-idempotent.md) |
| panic | 2 | [./panic.md](./panic.md) |
| larger | 2738 | [./larger.md](./larger.md) |
| differs | 461 | [./differs.md](./differs.md) |
| input-parse-error | 29 | [./input-parse-error.md](./input-parse-error.md) |
| expected-parse-error | 4 | [./expected-parse-error.md](./expected-parse-error.md) |
| no-expected | 1 | [./no-expected.md](./no-expected.md) |
