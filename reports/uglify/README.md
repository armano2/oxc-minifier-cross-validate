# uglify — oxc_minifier cross validation

Fixtures run: 4109

[← all families](../README.md)

## Summary

| config | smaller | not-idempotent | panic | larger | differs | parse-error | config-error | no-expected | pass | total |
|---|---|---|---|---|---|---|---|---|---|---|
| clean | 902 | 3 | 0 | 654 | 116 | 19 | 0 | 0 | 644 | 2338 |
| unsupported keys | 406 | 3 | 0 | 1002 | 33 | 4 | 0 | 0 | 323 | 1771 |
| **all** | 1308 | 6 | 0 | 1656 | 149 | 23 | 0 | 0 | 967 | 4109 |

## Reports

| kind | fixtures | file |
|---|---:|---|
| smaller | 1308 | [smaller.md](smaller.md) |
| not-idempotent | 6 | [not-idempotent.md](not-idempotent.md) |
| larger | 1656 | [larger.md](larger.md) |
| differs | 149 | [differs.md](differs.md) |
| parse-error | 23 | [parse-error.md](parse-error.md) |
