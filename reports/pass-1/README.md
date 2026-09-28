# pass-1 — oxc_minifier cross validation

Fixtures run: 18

[← all families](../README.md)

## Summary

| config | smaller | not-idempotent | panic | larger | differs | input-parse-error | expected-parse-error | config-error | no-expected | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| clean | 2 | 0 | 0 | 8 | 2 | 0 | 0 | 0 | 0 | 5 | 17 |
| unsupported keys | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| **all** | 2 | 0 | 0 | 9 | 2 | 0 | 0 | 0 | 0 | 5 | 18 |

## Reports

| kind | fixtures | file |
|---|---:|---|
| smaller | 2 | [smaller.md](smaller.md) |
| larger | 9 | [larger.md](larger.md) |
| differs | 2 | [differs.md](differs.md) |
