# terser — oxc_minifier cross validation

Fixtures run: 2133

[← all families](../README.md)

## Summary

| config | smaller | not-idempotent | panic | larger | differs | parse-error | config-error | no-expected | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|
| clean | 402 | 16 | 1 | 343 | 53 | 6 | 0 | 0 | 398 | 1219 |
| unsupported keys | 191 | 12 | 0 | 516 | 19 | 2 | 0 | 0 | 174 | 914 |
| **all** | 593 | 28 | 1 | 859 | 72 | 8 | 0 | 0 | 572 | 2133 |

## Reports

| kind | fixtures | file |
|---|---:|---|
| smaller | 593 | [smaller.md](smaller.md) |
| not-idempotent | 28 | [not-idempotent.md](not-idempotent.md) |
| panic | 1 | [panic.md](panic.md) |
| larger | 859 | [larger.md](larger.md) |
| differs | 72 | [differs.md](differs.md) |
| parse-error | 8 | [parse-error.md](parse-error.md) |
