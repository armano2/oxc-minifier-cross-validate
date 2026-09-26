# uglify — oxc_minifier cross validation

Fixtures run: 4259

[← all families](../README.md)

## Summary

| config | smaller | not-idempotent | panic | larger | differs | input-parse-error | expected-parse-error | config-error | no-expected | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| clean | 363 | 2 | 0 | 147 | 82 | 15 | 0 | 0 | 0 | 262 | 871 |
| unsupported keys | 1023 | 9 | 0 | 1533 | 225 | 5 | 3 | 0 | 0 | 590 | 3388 |
| **all** | 1386 | 11 | 0 | 1680 | 307 | 20 | 3 | 0 | 0 | 852 | 4259 |

## Reports

| kind | fixtures | file |
|---|---:|---|
| smaller | 1386 | [smaller.md](smaller.md) |
| not-idempotent | 11 | [not-idempotent.md](not-idempotent.md) |
| larger | 1680 | [larger.md](larger.md) |
| differs | 307 | [differs.md](differs.md) |
| input-parse-error | 20 | [input-parse-error.md](input-parse-error.md) |
| expected-parse-error | 3 | [expected-parse-error.md](expected-parse-error.md) |
