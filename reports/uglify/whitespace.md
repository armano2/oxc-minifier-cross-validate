# uglify / whitespace — Output longer after whitespace removal

Fixtures: 17

[← uglify](README.md) · [← all families](../README.md)

## `uglify/bigint/Number`


```js
console.log(Number(-1148098955808013229n));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(+('' + -1148098955808013229n));
+console.log(Number(-1148098955808013229n));

```

## `uglify/hoist_vars/issue_4487_2`

- tags: `join vars`, `remove unused`, `keep function names`, `2 iterations`

```js
var a = function f() {
	var f = console.log(typeof f);
};
var b = a();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-function a() {
+(function f() {
 	var f = console.log(typeof f);
-}
-a();
+})();

```

## `uglify/ie/issue_3215_4`


```js
console.log(function foo() {
	var bar = function bar(name) {
		return 'FAIL';
	};
	try {
		moo;
	} catch (e) {
		bar = function bar(name) {
			return 'PASS';
		};
	}
	return bar;
}()());

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
-console.log(function foo() {
-	var o = function o(n) {
+console.log(function() {
+	var bar = function(name) {
 		return 'FAIL';
 	};
 	try {
 		moo;
-	} catch (n) {
-		o = function o(n) {
+	} catch {
+		bar = function(name) {
 			return 'PASS';
 		};
 	}
-	return o;
+	return bar;
 }()());

```

## `uglify/issue-269/issue_269_1`


```js
var x = {};
console.log(String(x), Number(x), Boolean(x), String(), Number(), Boolean());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var x = {};
-console.log('' + x, +('' + x), !!x, '', 0, false);
+console.log(String(x), Number(x), !!x, '', 0, !1);

```

## `uglify/keep_fargs/issue_2319_1`

- tags: `join vars`, `remove unused`

```js
console.log(function(a) {
	return a;
}(!function() {
	return this;
}()));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-console.log(function() {
-	return !function() {
-		return this;
-	}();
-}());
+console.log(function(a) {
+	return a;
+}(!function() {
+	return this;
+}()));

```

## `uglify/keep_fargs/issue_2319_3`

- tags: `join vars`, `remove unused`

```js
'use strict';
console.log(function(a) {
	return a;
}(!function() {
	return this;
}()));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
-console.log(function() {
-	return !function() {
-		return this;
-	}();
-}());
+console.log(function(a) {
+	return a;
+}(!function() {
+	return this;
+}()));

```

## `uglify/let/issue_4691`


```js
'use strict';
function A() {}
A.prototype.f = function() {
	if (!this) return;
	let a = 'PA';
	function g(b) {
		h(a + b);
	}
	['SS'].forEach(function(c) {
		g(c);
	});
};
function h(d) {
	console.log(d);
}
new A().f();

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,14 @@
 'use strict';
 function A() {}
 A.prototype.f = function() {
-	if (this) {
-		let a = 'PA';
-		['SS'].forEach(function(c) {
-			g(c);
-		});
-		function g(b) {
-			h(a + b);
-		}
+	if (!this) return;
+	let a = 'PA';
+	function g(b) {
+		h('PA' + b);
 	}
+	['SS'].forEach(function(c) {
+		g(c);
+	});
 };
 function h(d) {
 	console.log(d);

```

## `uglify/merge_vars/issue_4255`

- tags: `join vars`

```js
L: for (var a = 2; --a;) for (var b = 0; console.log(b); --b) break L;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-L: for (var a = 2; --a;) {
-	var b = 0;
-	if (console.log(b)) break L;
-}
+L: for (var a = 2; --a;) for (var b = 0; console.log(b); --b) break L;

```

## `uglify/reduce_vars/recursive_inlining_3`

- tags: `join vars`, `remove unused`, `2 iterations`

```js
!function() {
	function foo(x) {
		console.log('foo', x);
		if (x) bar(x - 1);
	}
	function bar(x) {
		console.log('bar', x);
		if (x) qux(x - 1);
	}
	function qux(x) {
		console.log('qux', x);
		if (x) foo(x - 1);
	}
	qux(4);
}();

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,15 @@
-!function() {
+(function() {
+	function foo(x) {
+		console.log('foo', x);
+		x && bar(x - 1);
+	}
+	function bar(x) {
+		console.log('bar', x);
+		x && qux(x - 1);
+	}
 	function qux(x) {
 		console.log('qux', x);
-		if (x) (function(x) {
-			console.log('foo', x);
-			if (x) (function(x) {
-				console.log('bar', x);
-				if (x) qux(x - 1);
-			})(x - 1);
-		})(x - 1);
+		x && foo(x - 1);
 	}
 	qux(4);
-}();
+})();

```

## `uglify/reduce_vars/redefine_farg_1`

- tags: `join vars`, `remove unused`

```js
function f(a) {
	var a;
	return typeof a;
}
function g(a) {
	var a = 42;
	return typeof a;
}
function h(a, b) {
	var a = b;
	return typeof a;
}
console.log(f([]), g([]), h([]));

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 function f(a) {
+	var a;
 	return typeof a;
 }
 function g(a) {
 	return 'number';
 }
 function h(a, b) {
-	a = b;
-	return typeof a;
+	return typeof b;
 }
 console.log(f([]), g([]), h([]));

```

## `uglify/templates/booleans`


```js
var a;
console.log(`$${a}${a}` ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-console.log('$' + a + a ? 'PASS' : 'FAIL');
+console.log(`$${a}${a}` ? 'PASS' : 'FAIL');

```

## `uglify/templates/issue_5125_1`


```js
console.log(`PASS ${typeof A}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS ' + typeof A);
+console.log(`PASS ${typeof A}`);

```

## `uglify/templates/issue_5125_2`


```js
console.log(`PASS
${typeof A}`);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 console.log(`PASS
-` + typeof A);
+${typeof A}`);

```

## `uglify/templates/issue_5125_4`


```js
console.log(`PASS

${typeof A}`);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(`PASS
 
-` + typeof A);
+${typeof A}`);

```

## `uglify/templates/issue_5125_6`


```js
console.log(`${typeof A} ${typeof B} PASS`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(typeof A + ` ${typeof B} PASS`);
+console.log(`${typeof A} ${typeof B} PASS`);

```

## `uglify/templates/issue_5125_7`


```js
console.log(`${typeof A} ${typeof B} ${typeof C} PASS`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(typeof A + ` ${typeof B} ${typeof C} PASS`);
+console.log(`${typeof A} ${typeof B} ${typeof C} PASS`);

```

## `uglify/templates/issue_5125_8`


```js
console.log(`${typeof A}${typeof B}${typeof C} PASS`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(typeof A + typeof B + typeof C + ' PASS');
+console.log(`${typeof A}${typeof B}${typeof C} PASS`);

```

