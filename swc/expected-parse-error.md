# swc / expected-parse-error — `output.js` failed to parse

Fixtures: 1

[← swc](README.md) · [← all families](../README.md)

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
+		case e: async function e() {}
+	}
+	return 1;
+})());

```

