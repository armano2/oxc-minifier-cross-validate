# swc — oxc_minifier cross validation

Fixtures run: 526

[← all families](../README.md)

## Summary

| config | smaller | not-idempotent | panic | larger | differs | input-parse-error | expected-parse-error | config-error | no-expected | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| clean | 163 | 2 | 1 | 160 | 19 | 1 | 1 | 0 | 1 | 45 | 393 |
| unsupported keys | 82 | 0 | 0 | 25 | 7 | 0 | 0 | 0 | 0 | 19 | 133 |
| **all** | 245 | 2 | 1 | 185 | 26 | 1 | 1 | 0 | 1 | 64 | 526 |

## Reports

| kind | fixtures | file |
|---|---:|---|
| smaller | 245 | [smaller.md](smaller.md) |
| not-idempotent | 2 | [not-idempotent.md](not-idempotent.md) |
| panic | 1 | [panic.md](panic.md) |
| larger | 185 | [larger.md](larger.md) |
| differs | 26 | [differs.md](differs.md) |
| input-parse-error | 1 | [input-parse-error.md](input-parse-error.md) |
| expected-parse-error | 1 | [expected-parse-error.md](expected-parse-error.md) |
| no-expected | 1 | [no-expected.md](no-expected.md) |
