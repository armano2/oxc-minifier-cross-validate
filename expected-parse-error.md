# expected-parse-error — `output.js` failed to parse

Fixtures: 4

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

## `uglify/directives/issue_5368_2`

- note: Expected function name

```js
(function() {
	'foo';
})();

```

## `uglify/issue-640/issue_1254_negate_iife_nested`

- note: Expected function name

```js
(function() {
	return function() {
		console.log('test');
	};
})()()()()();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+(function() {
+	return function() {
+		console.log('test');
+	};
+})()()()()();

```

## `uglify/issue-640/issue_1254_negate_iife_true`

- note: Expected function name

```js
(function() {
	return function() {
		console.log('test');
	};
})()();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+(function() {
+	return function() {
+		console.log('test');
+	};
+})()();

```

