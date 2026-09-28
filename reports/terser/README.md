# terser — oxc_minifier cross validation

Fixtures run: 2133

[← all families](../README.md)

## Summary

| config | smaller | not-idempotent | panic | larger | differs | input-parse-error | expected-parse-error | config-error | no-expected | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| clean | 402 | 16 | 1 | 343 | 54 | 6 | 0 | 0 | 0 | 397 | 1219 |
| unsupported keys | 191 | 12 | 0 | 516 | 19 | 2 | 0 | 0 | 0 | 174 | 914 |
| **all** | 593 | 28 | 1 | 859 | 73 | 8 | 0 | 0 | 0 | 571 | 2133 |

## Reports

| kind | fixtures | file |
|---|---:|---|
| smaller | 593 | [smaller.md](smaller.md) |
| not-idempotent | 28 | [not-idempotent.md](not-idempotent.md) |
| panic | 1 | [panic.md](panic.md) |
| larger | 859 | [larger.md](larger.md) |
| differs | 73 | [differs.md](differs.md) |
| input-parse-error | 8 | [input-parse-error.md](input-parse-error.md) |
