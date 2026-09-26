# uglify / expected-parse-error — `output.js` failed to parse

Fixtures: 3

[← uglify](README.md) · [← all families](../README.md)

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

