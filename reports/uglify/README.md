# uglify — oxc_minifier cross validation

Fixtures run: 4109

[← all families](../README.md)

## Summary

| config | smaller | not-idempotent | panic | larger | differs | input-parse-error | expected-parse-error | config-error | no-expected | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| clean | 903 | 3 | 0 | 654 | 116 | 19 | 0 | 0 | 0 | 643 | 2338 |
| unsupported keys | 406 | 3 | 0 | 1002 | 33 | 1 | 3 | 0 | 0 | 323 | 1771 |
| **all** | 1309 | 6 | 0 | 1656 | 149 | 20 | 3 | 0 | 0 | 966 | 4109 |

## Reports

| kind | fixtures | file |
|---|---:|---|
| smaller | 1309 | [smaller.md](smaller.md) |
| not-idempotent | 6 | [not-idempotent.md](not-idempotent.md) |
| larger | 1656 | [larger.md](larger.md) |
| differs | 149 | [differs.md](differs.md) |
| input-parse-error | 20 | [input-parse-error.md](input-parse-error.md) |
| expected-parse-error | 3 | [expected-parse-error.md](expected-parse-error.md) |
