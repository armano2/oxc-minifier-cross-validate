# terser / parse-error — failed to parse

Fixtures: 8

[← terser](README.md) · [← all families](../README.md)

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

