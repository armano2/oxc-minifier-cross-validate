# swc / whitespace — Output longer after whitespace removal

Fixtures: 4

[← swc](README.md) · [← all families](../README.md)

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

## `swc/projects/mootools/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`

```js
var Hash = this.Hash = new Type('Hash', function(object) {
	if (typeOf(object) == 'hash') object = Object.clone(object.getClean());
	for (var key in object) this[key] = object[key];
	return this;
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var Hash = this.Hash = new Type('Hash', function(object) {
-	for (var key in 'hash' == typeOf(object) && (object = Object.clone(object.getClean())), object) this[key] = object[key];
+	for (var key in typeOf(object) == 'hash' && (object = Object.clone(object.getClean())), object) this[key] = object[key];
 	return this;
 });

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

