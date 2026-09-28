# swc — oxc_minifier cross validation

Fixtures run: 526

[← all families](../README.md)

## Summary

| config | smaller | not-idempotent | panic | larger | differs | input-parse-error | expected-parse-error | config-error | no-expected | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| clean | 81 | 2 | 1 | 220 | 23 | 1 | 1 | 0 | 1 | 82 | 412 |
| unsupported keys | 31 | 0 | 0 | 53 | 7 | 0 | 0 | 0 | 0 | 23 | 114 |
| **all** | 112 | 2 | 1 | 273 | 30 | 1 | 1 | 0 | 1 | 105 | 526 |

## Reports

| kind | fixtures | file |
|---|---:|---|
| smaller | 112 | [smaller.md](smaller.md) |
| not-idempotent | 2 | [not-idempotent.md](not-idempotent.md) |
| panic | 1 | [panic.md](panic.md) |
| larger | 273 | [larger.md](larger.md) |
| differs | 30 | [differs.md](differs.md) |
| input-parse-error | 1 | [input-parse-error.md](input-parse-error.md) |
| expected-parse-error | 1 | [expected-parse-error.md](expected-parse-error.md) |
| no-expected | 1 | [no-expected.md](no-expected.md) |
