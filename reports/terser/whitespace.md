# terser / whitespace — Output longer after whitespace removal

Fixtures: 9

[← terser](README.md) · [← all families](../README.md)

## `terser/functions/loop_init_arg`


```js
var a = 'PASS';
for (var k in '12') (function(b) {
	(b >>= 1) && (a = 'FAIL'), b = 2;
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 var a = 'PASS';
-for (var k in '12') {
-	var b = void 0;
+for (var k in '12') (function(b) {
 	(b >>= 1) && (a = 'FAIL'), b = 2;
-}
+})();
 console.log(a);

```

## `terser/global_defs/expanded`


```js
function f(CONFIG) {
	return CONFIG.VALUE;
}
function g() {
	var CONFIG = { VALUE: 1 };
	return CONFIG.VALUE;
}
function h() {
	return CONFIG.VALUE;
}
if (CONFIG.DEBUG[0]) console.debug('foo');

```

```diff
--- reference
+++ oxc
@@ -2,10 +2,9 @@
 	return CONFIG.VALUE;
 }
 function g() {
-	var CONFIG = { VALUE: 1 };
-	return CONFIG.VALUE;
+	return { VALUE: 1 }.VALUE;
 }
 function h() {
-	return 42;
+	return CONFIG.VALUE;
 }
-if (0) console.debug('foo');
+CONFIG.DEBUG[0] && console.debug('foo');

```

## `terser/global_defs/object`


```js
function f(CONFIG) {
	return CONFIG.VALUE;
}
function g() {
	var CONFIG = { VALUE: 1 };
	return CONFIG.VALUE;
}
function h() {
	return CONFIG.VALUE;
}
if (CONFIG.DEBUG[0]) console.debug('foo');

```

```diff
--- reference
+++ oxc
@@ -2,10 +2,9 @@
 	return CONFIG.VALUE;
 }
 function g() {
-	var CONFIG = { VALUE: 1 };
-	return CONFIG.VALUE;
+	return { VALUE: 1 }.VALUE;
 }
 function h() {
-	return 42;
+	return CONFIG.VALUE;
 }
-if (0) console.debug('foo');
+CONFIG.DEBUG[0] && console.debug('foo');

```

## `terser/hoist/hoist_funs`


```js
function a() {
	bar();
	function foo() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function a() {
+	bar();
 	function foo() {}
-	bar();
 }

```

## `terser/issue_2001/export_mangle_2`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`

```js
export default function foo(one, two) {
	return one - two;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-export default function t(t, e) {
-	return t - e;
+export default function foo(e, t) {
+	return e - t;
 }
-;

```

## `terser/issue_597/issue_1724`


```js
var a = 0;
++a % Infinity | Infinity ? a++ : 0;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 0;
-++a % Infinity | 1 / 0 ? a++ : 0;
+++a % Infinity | Infinity && a++;
 console.log(a);

```

## `terser/reduce_vars/issue_2423_1`

- tags: `join vars`, `remove unused`

```js
function c() {
	return 1;
}
function p() {
	console.log(c());
}
p();
p();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
+function c() {
+	return 1;
+}
 function p() {
-	console.log((function() {
-		return 1;
-	})());
+	console.log(c());
 }
 p();
 p();

```

## `terser/template_string/coerce_to_string`


```js
var str = `${any}`;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var str = '' + any;
+var str = `${any}`;

```

## `terser/template_string/template_concattenating_string`


```js
var foo = 'Have a nice ' + `day. ${`day. ` + `day.`}`;
var bar = 'Have a nice ' + `${day()}`;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var foo = 'Have a nice day. day. day.';
-var bar = 'Have a nice ' + day();
+var bar = `Have a nice ${day()}`;

```

