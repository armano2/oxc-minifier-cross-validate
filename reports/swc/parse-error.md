# swc / parse-error — failed to parse

Fixtures: 2

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

## `swc/issues/8953`

- note: Async functions can only be declared at the top level or inside a block

```js
'use strict';
const k = (() => {
	let x = 1;
	switch (x) {
		case x: async function x() {}
	}
	return x;
})();
console.log(k);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+'use strict';
+console.log((() => {
+	switch (1) {
+		case x: async function x() {}
+	}
+	return 1;
+})());

```

