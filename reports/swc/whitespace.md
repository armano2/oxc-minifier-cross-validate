# swc / whitespace — Output longer after whitespace removal

Fixtures: 4

[← swc](README.md) · [← all families](../README.md)

## `swc/issues/10466`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`

```js
const G = { setPackageName({ packageName }) {
	if ('string' == typeof packageName) this.packageName = packageName;
	return this;
} };
var packageName;
packageName = '@clerk/clerk-react', G.setPackageName({ packageName }), console.log(G.packageName);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 const G = { setPackageName({ packageName }) {
-	return 'string' == typeof packageName && (this.packageName = packageName), this;
+	return typeof packageName == 'string' && (this.packageName = packageName), this;
 } };
 G.setPackageName({ packageName: '@clerk/clerk-react' }), console.log(G.packageName);

```

## `swc/issues/11512-exhaustive/iife-default-reassigned`

- tags: `drop debugger`, `join vars`, `sequences`, `1 iteration`

```js
export function iifeDefaultReassigned(value) {
	return (function(a, b = 1) {
		b = 2;
		return a;
	})(value);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 export function iifeDefaultReassigned(value) {
-	return function(a, b = 1) {
-		b = 2;
-		return a;
-	}(value);
+	return (function(a, b = 1) {
+		return b = 2, a;
+	})(value);
 }

```

## `swc/issues/2679`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`

```js
(function() {
	var a = {};
	a.b = 1;
	a = null;
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-!function() {
+(function() {
 	var a = {};
-	a.b = 1;
-	a = null;
-}();
+	a.b = 1, a = null;
+})();

```

## `swc/projects/underscore/11`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`

```js
if (typeof /./ !== 'function') {
	_.isFunction = function(obj) {
		return typeof obj === 'function';
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-'function' != typeof /./ && (_.isFunction = function(obj) {
-	return 'function' == typeof obj;
+typeof /./ != 'function' && (_.isFunction = function(obj) {
+	return typeof obj == 'function';
 });

```

