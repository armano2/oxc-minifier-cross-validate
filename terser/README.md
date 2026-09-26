# terser — oxc_minifier cross validation

Fixtures run: 2133

[← all families](../README.md)

## Summary

| config | smaller | not-idempotent | panic | larger | differs | input-parse-error | expected-parse-error | config-error | no-expected | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| clean | 228 | 1 | 0 | 177 | 42 | 6 | 0 | 0 | 0 | 217 | 671 |
| unsupported keys | 399 | 2 | 1 | 691 | 86 | 2 | 0 | 0 | 0 | 281 | 1462 |
| **all** | 627 | 3 | 1 | 868 | 128 | 8 | 0 | 0 | 0 | 498 | 2133 |

## Reports

| kind | fixtures | file |
|---|---:|---|
| smaller | 627 | [smaller.md](smaller.md) |
| not-idempotent | 3 | [not-idempotent.md](not-idempotent.md) |
| panic | 1 | [panic.md](panic.md) |
| larger | 868 | [larger.md](larger.md) |
| differs | 128 | [differs.md](differs.md) |
| input-parse-error | 8 | [input-parse-error.md](input-parse-error.md) |
