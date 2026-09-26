# input-parse-error — `input.js` failed to parse

Fixtures: 29

## `swc/issues/10448`

- note: Unexpected JSX expression

```js
const isDev = () => false;

function Foo() {
    let value = 'default';

    // This conditional check will NOT be removed by SWC, even when isDev is set to false.
    if (isDev()) value = "dev value"

    return value;
}

let x = <Foo />

console.log(x)
```

## `terser/evaluate/unsafe_object_accessor`

- note: A 'set' accessor must have exactly one parameter.

```js
function f() {
    var a = { get b() {}, set b() {} };
    return { a: a };
}

```

## `terser/export/keyword_invalid_1`

- note: A reserved word cannot be used as an exported binding without `from`

```js
export { default };

```

## `terser/export/keyword_invalid_2`

- note: A reserved word cannot be used as an exported binding without `from`

```js
export { default as Alias };

```

## `terser/export/keyword_invalid_3`

- note: A reserved word cannot be used as an exported binding without `from`

```js
export { default };

```

## `terser/harmony/class_statics`

- note: A 'set' accessor must have exactly one parameter.

```js
x = class {
    static staticMethod() {}
    static get foo() {}
    static set bar() {}
    static() {}
    get() {}
    set() {}
};

```

## `terser/harmony/export_module_statement`

- note: Duplicated export 'A'

```js
export * from "a.js";
export { A } from "a.js";
export { A, B } from "a.js";
export { C };

```

## `terser/issue_12/keep_name_of_setter`

- note: A 'set' accessor must have exactly one parameter.

```js
a = { set foo() {} };

```

## `terser/pure_getters/issue_2265_3`

- note: A 'set' accessor must have exactly one parameter.

```js
var a = {
    set b() {
        throw 0;
    },
};
({ ...a }.b);

```

## `uglify/const/skip_braces`

- note: Lexical declaration cannot appear in a single-statement context

```js
if (console)
    const a = 42;
else
    const b = null;
console.log(typeof a, typeof b);

```

## `uglify/exponentiation/await`

- note: A unary expression with the 'await' operator cannot be used as the left operand of an exponentiation expression

```js
(async a => a * await a ** ++a % a)(2).then(console.log);

```

## `uglify/exponentiation/precedence_1`

- note: A unary expression with the '-' operator cannot be used as the left operand of an exponentiation expression

```js
console.log(-4 ** 3 ** 2);

```

## `uglify/exponentiation/precedence_2`

- note: A unary expression with the '-' operator cannot be used as the left operand of an exponentiation expression

```js
console.log(-4 ** (3 ** 2));

```

## `uglify/exponentiation/precedence_3`

- note: A unary expression with the '-' operator cannot be used as the left operand of an exponentiation expression

```js
console.log(-(4 ** 3) ** 2);

```

## `uglify/exponentiation/precedence_4`

- note: A unary expression with the '-' operator cannot be used as the left operand of an exponentiation expression

```js
console.log((-4 ** 3) ** 2);

```

## `uglify/exports/defaults`

- note: A module cannot have multiple default exports.

```js
export default 42;
export default async;
export default (x, y) => x * x;
export default class {};
export default function*(a, b) {};
export default async function f({ c }, ...[ d ]) {};

```

## `uglify/exports/drop_unused`

- note: A module cannot have multiple default exports.

```js
export default 42;
export default (x, y) => x * x;
export default class A extends B { get p() { h() } }
export default function*(a, b) {}
export default async function f({ c }, ...[ d ]) {}
export var e;
export function g(x, [ y ], ...z) {}
function h() {}

```

## `uglify/exports/hoist_exports_2`

- note: A module cannot have multiple default exports.

```js
const a = 42;
export let bbb, { foo: ccc } = a;
export function fff(d, { [bbb]: e }) {
    d(e, fff);
}
export default a;
export default async function g(x, ...{ [ccc]: y }) {
    (await x)(g, y);
}

```

## `uglify/exports/keep_return_values`

- note: A module cannot have multiple default exports.

```js
export default function() {
    return [];
}
export default function f() {
    return null;
}

```

## `uglify/exports/mangle`

- note: A module cannot have multiple default exports.

```js
const a = 42;
export let b, { foo: c } = a;
export function f(d, { [b]: e }) {
    d(e, f);
}
export default a;
export default async function g(x, ...{ [c]: y }) {
    (await x)(g, y);
}

```

## `uglify/exports/mangle_rename`

- note: A module cannot have multiple default exports.

```js
const a = 42;
export let b, { foo: c } = a;
export function f(d, { [b]: e }) {
    d(e, f);
}
export default a;
export default async function g(x, ...{ [c]: y }) {
    (await x)(g, y);
}

```

## `uglify/exports/non_identifiers`

- note: Duplicated export '42'

```js
export * as "42" from 'foo';
export { '42', "delete" as 'foo' } from "bar";

```

## `uglify/let/skip_braces`

- note: Expected a semicolon or an implicit semicolon after a statement, but found none

```js
"use strict";
if (console)
    let a = console.log(typeof a);

```

## `uglify/loops/for_async_of`

- note: The left-hand side of a `for...of` statement may not be `async`

```js
var async = [ "PASS", 42 ];
async.p = "FAIL";
for (async of (null, async))
    console.log(async);

```

## `uglify/nullish/parentheses`

- note: Logical expressions and coalesce expressions cannot be mixed

```js
(console.log("foo") || console.log("bar") ?? console.log("baz")) && console.log("moo");

```

## `uglify/templates/malformed_evaluate_1`

- note: Bad escape sequence in untagged template literal

```js
console.log(`\67 ${6 * 7}`);

```

## `uglify/templates/malformed_evaluate_2`

- note: Bad escape sequence in untagged template literal

```js
console.log(`\u0${0}b${5}`);

```

## `uglify/templates/malformed_evaluate_3`

- note: Bad escape sequence in untagged template literal

```js
console.log(`\u${0}b${5}`);

```

## `uglify/yields/arrow_yield_2`

- note: Cannot use `yield` as an identifier in a generator context

```js
console.log(typeof function *() {
    // Syntax error on Node.js v6+
    return (yield) => {};
}().next().value);

```

