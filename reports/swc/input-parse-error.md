# swc / input-parse-error — `input.js` failed to parse

Fixtures: 1

[← swc](README.md) · [← all families](../README.md)

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

