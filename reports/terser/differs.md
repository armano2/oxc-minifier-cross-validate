# terser / differs — Output differs at equal length

Fixtures: 78

[← terser](README.md) · [← all families](../README.md)

## `terser/async/await_precedence`


```js
async function f1() {
	await x + y;
}
async function f2() {
	await (x + y);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 async function f1() {
-	await x, y;
+	await x + y;
 }
 async function f2() {
 	await (x + y);

```

## `terser/collapse_vars/chained_1`

- tags: `join vars`, `remove unused`

```js
var a = 2;
var a = 3 / a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = 3 / (a = 2);
+var a = 2, a = 3 / a;
 console.log(a);

```

## `terser/collapse_vars/chained_2`

- tags: `join vars`, `remove unused`

```js
var a;
var a = 2;
a = 3 / a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a;
-a = 3 / (a = 2);
+var a, a = 2;
+a = 3 / a;
 console.log(a);

```

## `terser/collapse_vars/chained_3`

- tags: `join vars`, `remove unused`

```js
console.log((function(a, b) {
	var c = a, c = b;
	b++;
	return c;
})(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 console.log((function(a, b) {
-	var c = 1;
-	c = b;
+	var c = a, c = b;
 	b++;
 	return c;
-})(0, 2));
+})(1, 2));

```

## `terser/collapse_vars/collapse_rhs_conditional_1`

- tags: `join vars`

```js
var a = 'PASS', b = 'FAIL';
b = a;
'function' == typeof f && f(a);
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var a = 'PASS', b = 'FAIL';
 b = a;
-'function' == typeof f && f(a);
+typeof f == 'function' && f(a);
 console.log(a, b);

```

## `terser/collapse_vars/collapse_rhs_conditional_2`

- tags: `join vars`

```js
var a = 'FAIL', b;
while ((a = 'PASS', --b) && 'PASS' == b);
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var b, a = 'FAIL';
-while (a = 'PASS', --b && 'PASS' == b);
+var a = 'FAIL', b;
+for (; a = 'PASS', --b && b == 'PASS';);
 console.log(a, b);

```

## `terser/collapse_vars/issue_2436_14`

- tags: `join vars`, `remove unused`

```js
var a = 'PASS';
var b = {};
(function() {
	var c = a;
	c && (function(c, d) {
		console.log(c, d);
	})(b, c);
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a = 'PASS';
 var b = {};
 (function() {
-	a && (function(c, d) {
+	var c = 'PASS';
+	c && (function(c, d) {
 		console.log(c, d);
-	})(b, a);
+	})(b, c);
 })();

```

## `terser/collapse_vars/issue_2908`

- tags: `join vars`

```js
var a = 0, b = 0;
function f(c) {
	if (1 == c) return;
	a++;
	if (2 == c) b = a;
}
f(0);
f(2);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 var a = 0, b = 0;
 function f(c) {
-	if (1 == c) return;
+	if (c == 1) return;
 	a++;
-	if (2 == c) b = a;
+	c == 2 && (b = a);
 }
 f(0);
 f(2);

```

## `terser/collapse_vars/replace_all_var_scope`

- tags: `join vars`, `remove unused`

```js
var a = 100, b = 10;
(function(r, a) {
	switch (~a) {
		case b += a:
		case a++:
	}
})(--b, a);
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 var a = 100, b = 10;
-(function(c, o) {
+(function(r, a) {
 	switch (~a) {
 		case b += a:
-		case o++:
+		case a++:
 	}
 })(--b, a);
 console.log(a, b);

```

## `terser/collapse_vars/var_side_effects_1`

- tags: `join vars`, `remove unused`

```js
var print = console.log.bind(console);
function foo(x) {
	var twice = x * 2;
	print('Foo:', twice);
}
foo(10);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var print = console.log.bind(console);
 function foo(x) {
-	print('Foo:', 2 * x);
+	print('Foo:', x * 2);
 }
 foo(10);

```

## `terser/collapse_vars/var_side_effects_2`

- tags: `join vars`, `remove unused`

```js
var print = console.log.bind(console);
function foo(x) {
	var twice = x.y * 2;
	print('Foo:', twice);
}
foo({ y: 10 });

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var print = console.log.bind(console);
 function foo(x) {
-	print('Foo:', 2 * x.y);
+	print('Foo:', x.y * 2);
 }
 foo({ y: 10 });

```

## `terser/collapse_vars/var_side_effects_3`

- tags: `join vars`, `remove unused`, `pure getters`

```js
var print = console.log.bind(console);
function foo(x) {
	var twice = x.y * 2;
	print('Foo:', twice);
}
foo({ y: 10 });

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var print = console.log.bind(console);
 function foo(x) {
-	print('Foo:', 2 * x.y);
+	print('Foo:', x.y * 2);
 }
 foo({ y: 10 });

```

## `terser/comparing/keep_comparisons_with_unsafe_comps`


```js
var obj1 = { valueOf: function() {
	triggeredFirst();
} };
var obj2 = { valueOf: function() {
	triggeredSecond();
} };
var result1 = obj1 <= obj2;
var result2 = obj1 < obj2;
var result3 = obj1 >= obj2;
var result4 = obj1 > obj2;

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 var obj2 = { valueOf: function() {
 	triggeredSecond();
 } };
-var result1 = obj2 >= obj1;
-var result2 = obj2 > obj1;
+var result1 = obj1 <= obj2;
+var result2 = obj1 < obj2;
 var result3 = obj1 >= obj2;
 var result4 = obj1 > obj2;

```

## `terser/conditionals/cond_7_1`


```js
var x;
if (y) {
	x = 1 + 1;
} else {
	x = 2;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var x;
-y, x = 2;
+var x = (y, 2);

```

## `terser/dead_code/issue_718`


```js
throw 'error';
import 'x';
export { y };

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
+throw 'error';
 import 'x';
-throw 'error';
 export { y };

```

## `terser/destructuring/anon_func_with_destructuring_args`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `remove unused`

```js
(function({ foo = 1 + 0, bar = 2 }, [car = 3, far = 4]) {
	console.log(foo, bar, car, far);
})({ bar: 5 - 0 }, [, 6]);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function({ foo: o = 1, bar: n = 2 }, [a = 3, b = 4]) {
-	console.log(o, n, a, b);
+(function({ foo: e = 1, bar: t = 2 }, [n = 3, r = 4]) {
+	console.log(e, t, n, r);
 })({ bar: 5 }, [, 6]);

```

## `terser/destructuring/arrow_func_with_destructuring_args`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `remove unused`

```js
(({ foo = 1 + 0, bar = 2 }, [car = 3, far = 4]) => {
	console.log(foo, bar, car, far);
})({ bar: 5 - 0 }, [, 6]);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(({ foo: o = 1, bar: a = 2 }, [b = 3, l = 4]) => {
-	console.log(o, a, b, l);
+(({ foo: e = 1, bar: t = 2 }, [n = 3, r = 4]) => {
+	console.log(e, t, n, r);
 })({ bar: 5 }, [, 6]);

```

## `terser/destructuring/mangle_destructuring_decl_array`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `remove unused`

```js
var [, t, e, n, s, o = 2, r = [1 + 2]] = [
	9,
	8,
	7,
	6
];
console.log(t, e, n, s, o, r);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var [, o, l, a, c, e = 2, g = [3]] = [
+var [, e, t, n, r, i = 2, a = [3]] = [
 	9,
 	8,
 	7,
 	6
 ];
-console.log(o, l, a, c, e, g);
+console.log(e, t, n, r, i, a);

```

## `terser/destructuring/unused_destructuring_assign_1`

- tags: `remove unused`, `pure getters`

```js
function extract(obj) {
	var a;
	let b;
	({a: a, b: b} = obj);
	console.log(b);
}
extract({
	a: 1,
	b: 2
});
extract({ b: 4 });

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function extract(obj) {
 	var a;
 	let b;
-	({a: a, b: b} = obj);
+	({a, b} = obj);
 	console.log(b);
 }
 extract({

```

## `terser/destructuring/unused_destructuring_assign_2`

- tags: `remove unused`

```js
function extract(obj) {
	var a;
	let b;
	({a: a, b: b} = obj);
	console.log(b);
}
extract({
	a: 1,
	b: 2
});
extract({
	get a() {
		var s = 'side effect';
		console.log(s);
		return s;
	},
	b: 4
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function extract(obj) {
 	var a;
 	let b;
-	({a: a, b: b} = obj);
+	({a, b} = obj);
 	console.log(b);
 }
 extract({

```

## `terser/destructuring/unused_destructuring_getter_side_effect_2`

- tags: `remove unused`, `pure getters`

```js
function extract(obj) {
	const { a, b } = obj;
	console.log(b);
}
extract({
	a: 1,
	b: 2
});
extract({
	get a() {
		var s = 'side effect';
		console.log(s);
		return s;
	},
	b: 4
});

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function extract(obj) {
-	const { b } = obj;
+	let { a, b } = obj;
 	console.log(b);
 }
 extract({

```

## `terser/evaluate/issue_2535_3`


```js
console.log(Object(1) && 1 && 2);
console.log(Object(1) && true && 1 && 2 && Object(2));
console.log(Object(1) && true && 1 && null && 2 && Object(2));
console.log(2 == Object(1) || 0 || void 0 || null);
console.log(2 == Object(1) || 0 || void 0 || null || Object(2));
console.log(2 == Object(1) || 0 || void 0 || 'ok' || null || Object(2));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log(Object(1) && 2);
 console.log(Object(1) && Object(2));
 console.log(Object(1) && null);
-console.log(2 == Object(1) || null);
-console.log(2 == Object(1) || Object(2));
-console.log(2 == Object(1) || 'ok');
+console.log(Object(1) == 2 || null);
+console.log(Object(1) == 2 || Object(2));
+console.log(Object(1) == 2 || 'ok');

```

## `terser/evaluate/pow_nan`


```js
console.log(Math.pow(1, NaN));
console.log(1 ** NaN);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-console.log(0 / 0);
-console.log(0 / 0);
+console.log(NaN);
+console.log(NaN);

```

## `terser/evaluate/string_charCodeAt`


```js
console.log('foo'.charCodeAt('bar'.length));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(0 / 0);
+console.log(NaN);

```

## `terser/evaluate/unsafe_array`


```js
console.log([
	1,
	,
	3
][1], [
	1,
	2,
	3,
	a
] + 1, [
	1,
	2,
	3,
	4
] + 1, [
	1,
	2,
	3,
	a
][0] + 1, [
	1,
	2,
	3,
	4
][0] + 1, [
	1,
	2,
	3,
	4
][6 - 5] + 1, [
	1,
	,
	3,
	4
][6 - 5] + 1, [[1, 2], [3, 4]][0] + 1, [[1, 2], [3, 4]][6 - 5][1] + 1, [
	[1, 2],
	,
	[3, 4]
][6 - 5][1] + 1);

```

```diff
--- reference
+++ oxc
@@ -8,4 +8,4 @@
 	2,
 	3,
 	a
-][0] + 1, 2, 3, 0 / 0, '1,21', 5, (void 0)[1] + 1);
+][0] + 1, 2, 3, NaN, '1,21', 5, (void 0)[1] + 1);

```

## `terser/export/issue_2038_2`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `remove unused`

```js
let LET = 1;
const CONST = 2;
var VAR = 3;
export { LET, CONST, VAR };

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-let t = 1;
-const e = 2;
-var o = 3;
-export { t as LET, e as CONST, o as VAR };
+let e = 1;
+const t = 2;
+var n = 3;
+export { e as LET, t as CONST, n as VAR };

```

## `terser/functions/hoist_funs`


```js
console.log(typeof f, typeof g, 1);
if (console.log(typeof f, typeof g, 2)) console.log(typeof f, typeof g, 3);
else {
	console.log(typeof f, typeof g, 4);
	function f() {}
	console.log(typeof f, typeof g, 5);
}
function g() {}
console.log(typeof f, typeof g, 6);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-function g() {}
 console.log(typeof f, typeof g, 1);
 if (console.log(typeof f, typeof g, 2)) console.log(typeof f, typeof g, 3);
 else {
@@ -6,4 +5,5 @@
 	function f() {}
 	console.log(typeof f, typeof g, 5);
 }
+function g() {}
 console.log(typeof f, typeof g, 6);

```

## `terser/functions/hoist_funs_strict`


```js
'use strict';
console.log(typeof f, typeof g, 1);
if (console.log(typeof f, typeof g, 2)) console.log(typeof f, typeof g, 3);
else {
	console.log(typeof f, typeof g, 4);
	function f() {}
	console.log(typeof f, typeof g, 5);
}
function g() {}
console.log(typeof f, typeof g, 6);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 'use strict';
-function g() {}
 console.log(typeof f, typeof g, 1);
 if (console.log(typeof f, typeof g, 2)) console.log(typeof f, typeof g, 3);
 else {
@@ -7,4 +6,5 @@
 	function f() {}
 	console.log(typeof f, typeof g, 5);
 }
+function g() {}
 console.log(typeof f, typeof g, 6);

```

## `terser/harmony/array_spread_of_sequence`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`

```js
var a = [1];
console.log([...(a, a)]);
console.log([...a, a]);
console.log([...a || a]);
console.log([...a || a]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var o = [1];
-console.log([...o]);
-console.log([...o, o]);
-console.log([...o || o]);
-console.log([...o || o]);
+var e = [1];
+console.log([...e]);
+console.log([...e, e]);
+console.log([...e || e]);
+console.log([...e || e]);

```

## `terser/harmony/issue_1613`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`

```js
const name = 1;
const foo = { name };

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-const n = 1;
-const c = { name: n };
+const e = 1;
+const t = { name: 1 };

```

## `terser/harmony/issue_1753`

- tags: `mangle`, `keep function names`, `keep class names`

```js
class SomeClass {
	constructor(props) {
		let pickedSets = [];
		for (let i = 0; i < 6; i++) {
			pickedSets.push({
				mainDrawNumbers: [],
				extraDrawNumbers: []
			});
		}
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 class SomeClass {
-	constructor(r) {
-		let s = [];
-		for (let r = 0; r < 6; r++) s.push({
+	constructor(e) {
+		let t = [];
+		for (let e = 0; e < 6; e++) t.push({
 			mainDrawNumbers: [],
 			extraDrawNumbers: []
 		});

```

## `terser/harmony/issue_1753_disable`

- tags: `mangle`, `keep function names`, `keep class names`

```js
class SomeClass {
	constructor(props) {
		let pickedSets = [];
		for (let i = 0; i < 6; i++) {
			pickedSets.push({
				mainDrawNumbers: [],
				extraDrawNumbers: []
			});
		}
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 class SomeClass {
-	constructor(r) {
-		let s = [];
-		for (let r = 0; r < 6; r++) s.push({
+	constructor(e) {
+		let t = [];
+		for (let e = 0; e < 6; e++) t.push({
 			mainDrawNumbers: [],
 			extraDrawNumbers: []
 		});

```

## `terser/harmony/issue_t80`

- tags: `remove unused`

```js
function foo(data = []) {
	var u, v = 'unused';
	if (arguments.length == 1) {
		data = [data];
	}
	return data;
}
console.log(JSON.stringify([
	foo(),
	foo(null),
	foo(5, 6)
]));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function foo(data = []) {
-	if (1 == arguments.length) data = [data];
+	arguments.length == 1 && (data = [data]);
 	return data;
 }
 console.log(JSON.stringify([

```

## `terser/harmony/module_enabled`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`

```js
let apple = 10, b = 20;
console.log(apple++, b, apple++);
export { apple };

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-let o = 10;
-console.log(o++, 20, o++);
-export { o as apple };
+let e = 10;
+console.log(e++, 20, e++);
+export { e as apple };

```

## `terser/harmony/object_spread_of_sequence`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`

```js
var a = { x: 1 };
console.log({ ...(a, a) });
console.log({
	...a,
	a
});
console.log({ ...a || a });
console.log({ ...a || a });

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-var o = { x: 1 };
-console.log({ ...o });
+var e = { x: 1 };
+console.log({ ...e });
 console.log({
-	...o,
-	a: o
+	...e,
+	a: e
 });
-console.log({ ...o || o });
-console.log({ ...o || o });
+console.log({ ...e || e });
+console.log({ ...e || e });

```

## `terser/hoist_props/issue_3046`

- tags: `join vars`

```js
console.log((function(a) {
	do {
		var b = { c: a++ };
	} while (b.c && a);
	return a;
})(0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log((function(a) {
-	do {
+	do
 		var b = { c: a++ };
-	} while (b.c && a);
+	while (b.c && a);
 	return a;
 })(0));

```

## `terser/hoist_props/issue_3071_3`

- tags: `join vars`

```js
var c = 0;
(function(a, b) {
	(function f(o) {
		var n = 2;
		while (--b + (o = { p: c++ }) && --n > 0);
	})();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 var c = 0;
-(function(b) {
-	(function f(o) {
+(function(a, b) {
+	(function(o) {
 		var n = 2;
-		while (--b + (o = { p: c++ }) && --n > 0);
+		for (; --b + (o = { p: c++ }) && --n > 0;);
 	})();
 })();
 console.log(c);

```

## `terser/if_return/issue_2747`

- tags: `sequences`, `remove unused`

```js
'use strict';
function f(baz) {
	if (baz === 0) {
		return null;
	}
	let r;
	if (baz > 2) {
		r = 4;
	} else {
		r = 5;
	}
	return r;
}
console.log(f(0), f(1), f(3));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
 function f(baz) {
-	if (0 === baz) return null;
+	if (baz === 0) return null;
 	let r;
 	return r = baz > 2 ? 4 : 5, r;
 }

```

## `terser/inline/do_not_repeat_when_variable_larger_than_inlined_node`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`

```js
const _string_ = 'string';
pass(_string_);
pass(_string_);
pass(_string_);
pass(_string_);
pass(_string_);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-const s = 'string';
-pass(s);
-pass(s);
-pass(s);
-pass(s);
-pass(s);
+const e = 'string';
+pass(e);
+pass(e);
+pass(e);
+pass(e);
+pass(e);

```

## `terser/issue_1043/issue_1043`


```js
function* range(start = 0, end = null, step = 1) {
	if (end == null) {
		end = start;
		start = 0;
	}
	for (let i = start; i < end; i += step) {
		yield i;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function* range(start = 0, end = null, step = 1) {
-	if (null == end) {
+	if (end == null) {
 		end = start;
 		start = 0;
 	}

```

## `terser/issue_1202/mangle_keep_fnames_true`

- tags: `mangle`, `keep function names`, `keep class names`

```js
'use strict';
function total() {
	return function n(a, b, c) {
		return a + b + c;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
 function total() {
-	return function n(t, r, u) {
-		return t + r + u;
+	return function n(e, t, r) {
+		return e + t + r;
 	};
 }

```

## `terser/issue_1431/level_one`

- tags: `mangle`, `keep function names`, `keep class names`

```js
function f(x) {
	return function() {
		function n(a) {
			return a * a;
		}
		return x(n);
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-function f(r) {
+function f(e) {
 	return function() {
-		function n(r) {
-			return r * r;
+		function n(e) {
+			return e * e;
 		}
-		return r(n);
+		return e(n);
 	};
 }

```

## `terser/issue_1431/level_three`

- tags: `mangle`, `keep function names`, `keep class names`

```js
function f(x) {
	return function() {
		function r(a) {
			return a * a;
		}
		return [function() {
			function t(a) {
				return a * a;
			}
			return t;
		}, function() {
			function n(a) {
				return a * a;
			}
			return x(n);
		}];
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,18 @@
-function f(u) {
+function f(e) {
 	return function() {
-		function r(u) {
-			return u * u;
+		function r(e) {
+			return e * e;
 		}
 		return [function() {
-			function t(u) {
-				return u * u;
+			function t(e) {
+				return e * e;
 			}
 			return t;
 		}, function() {
-			function n(u) {
-				return u * u;
+			function n(e) {
+				return e * e;
 			}
-			return u(n);
+			return e(n);
 		}];
 	};
 }

```

## `terser/issue_1431/level_two`

- tags: `mangle`, `keep function names`, `keep class names`

```js
function f(x) {
	return function() {
		function r(a) {
			return a * a;
		}
		return function() {
			function n(a) {
				return a * a;
			}
			return x(n);
		};
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
-function f(t) {
+function f(e) {
 	return function() {
-		function r(t) {
-			return t * t;
+		function r(e) {
+			return e * e;
 		}
 		return function() {
-			function n(t) {
-				return t * t;
+			function n(e) {
+				return e * e;
 			}
-			return t(n);
+			return e(n);
 		};
 	};
 }

```

## `terser/issue_1431/level_zero`

- tags: `mangle`, `keep function names`, `keep class names`

```js
function f(x) {
	function n(a) {
		return a * a;
	}
	return function() {
		return x;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-function f(r) {
-	function n(r) {
-		return r * r;
+function f(e) {
+	function n(e) {
+		return e * e;
 	}
 	return function() {
-		return r;
+		return e;
 	};
 }

```

## `terser/issue_1466/more_variable_in_multiple_for`

- tags: `join vars`

```js
for (let a = 9, i = 0; i < 20; i += a) {
	let b = a++ + i;
	console.log(a, b, i);
	for (let k = b, m = b * b, i = 0; i < 10; i++) {
		console.log(a, b, m, k, i);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-for (let o = 9, l = 0; l < 20; l += o) {
-	let e = o++ + l;
-	console.log(o, e, l);
-	for (let l = e, t = e * e, c = 0; c < 10; c++) console.log(o, e, t, l, c);
+for (let a = 9, i = 0; i < 20; i += a) {
+	let b = a++ + i;
+	console.log(a, b, i);
+	for (let k = b, m = b * b, i = 0; i < 10; i++) console.log(a, b, m, k, i);
 }

```

## `terser/issue_1704/mangle_catch_redef_3`

- tags: `mangle`, `keep function names`, `keep class names`

```js
var o = 'PASS';
try {
	throw 0;
} catch (o) {
	(function() {
		function f() {
			o = 'FAIL';
		}
		f(), f();
	})();
}
console.log(o);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var o = 'PASS';
 try {
 	throw 0;
-} catch (c) {
+} catch (e) {
 	(function() {
-		function n() {
-			c = 'FAIL';
+		function f() {
+			e = 'FAIL';
 		}
-		n(), n();
+		f(), f();
 	})();
 }
 console.log(o);

```

## `terser/issue_1704/mangle_catch_redef_ie8_3`

- tags: `mangle`, `keep function names`, `keep class names`

```js
var o = 'PASS';
try {
	throw 0;
} catch (o) {
	(function() {
		function f() {
			o = 'FAIL';
		}
		f(), f();
	})();
}
console.log(o);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var o = 'PASS';
 try {
 	throw 0;
-} catch (o) {
+} catch (e) {
 	(function() {
-		function c() {
-			o = 'FAIL';
+		function f() {
+			e = 'FAIL';
 		}
-		c(), c();
+		f(), f();
 	})();
 }
 console.log(o);

```

## `terser/issue_1833/iife_for`

- tags: `join vars`, `remove unused`

```js
function f() {
	function g() {
		L: for (;;) break L;
	}
	g();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-!(function() {
-	!(function() {
+function f() {
+	function g() {
 		L: for (;;) break L;
-	})();
-})();
+	}
+	g();
+}
+f();

```

## `terser/issue_1833/iife_for_in`

- tags: `join vars`, `remove unused`

```js
function f() {
	function g() {
		L: for (var a in x) break L;
	}
	g();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-!(function() {
-	!(function() {
+function f() {
+	function g() {
 		L: for (var a in x) break L;
-	})();
-})();
+	}
+	g();
+}
+f();

```

## `terser/issue_1833/label_do`


```js
L: do {
	continue L;
} while (0);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-L: do {
+L: do
 	continue L;
-} while (0);
+while (0);

```

## `terser/issue_2001/export_mangle_1`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`

```js
export function foo(one, two) {
	return one - two;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-export function foo(o, n) {
-	return o - n;
+export function foo(e, t) {
+	return e - t;
 }

```

## `terser/issue_2001/export_mangle_5`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`

```js
export default { prop: function(one, two) {
	return one - two;
} };

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-export default { prop: function(r, t) {
-	return r - t;
+export default { prop: function(e, t) {
+	return e - t;
 } };

```

## `terser/issue_2001/export_mangle_6`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`

```js
var baz = 2;
export let foo = 1, bar = baz;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var o = 2;
-export let foo = 1, bar = o;
+var e = 2;
+export let foo = 1, bar = e;

```

## `terser/keep_names/drop_classnames`

- tags: `mangle`, `keep function names`

```js
function foo() {
	class Bar {}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function foo() {
-	class o {}
+	class e {}
 }

```

## `terser/labels/labels_5`


```js
while (foo) {
	if (bar) break;
	console.log('foo');
}
out: while (foo) {
	if (bar) break out;
	console.log('foo');
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,5 @@
-while (foo) {
-	if (bar) break;
-	console.log('foo');
-}
-while (foo) {
-	if (bar) break;
+for (; foo && !bar;) console.log('foo');
+out: for (; foo;) {
+	if (bar) break out;
 	console.log('foo');
 }

```

## `terser/labels/labels_7`


```js
while (foo) {
	x();
	y();
	continue;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-while (foo) {
+for (; foo;) {
 	x();
 	y();
 }

```

## `terser/labels/labels_8`


```js
while (foo) {
	x();
	y();
	break;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-while (foo) {
+for (; foo;) {
 	x();
 	y();
 	break;

```

## `terser/logical_assignment/assignment_in_left_part_2`

- tags: `join vars`, `remove unused`

```js
var status = 'FAIL';
var x = { PASS: false };
x[status = id('PASS')] ||= 'PASS';
console.log(status, x.PASS);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var status;
-var x = { PASS: false };
+var status = 'FAIL', x = { PASS: !1 };
 x[status = id('PASS')] ||= 'PASS';
 console.log(status, x.PASS);

```

## `terser/loops/issue_186`


```js
var x = 3;
if (foo()) do {
	do {
		alert(x);
	} while (--x);
} while (x);
else bar();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var x = 3;
-if (foo()) do {
+if (foo()) do
 	do
 		alert(x);
 	while (--x);
-} while (x);
+while (x);
 else bar();

```

## `terser/loops/issue_186_beautify`


```js
var x = 3;
if (foo()) do {
	do {
		alert(x);
	} while (--x);
} while (x);
else bar();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var x = 3;
-if (foo()) do {
+if (foo()) do
 	do
 		alert(x);
 	while (--x);
-} while (x);
+while (x);
 else bar();

```

## `terser/loops/keep_collapse_const_in_own_block_scope`

- tags: `join vars`

```js
var i = 2;
const c = 5;
while (i--) console.log(i);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var i = 2;
 const c = 5;
 for (; i--;) console.log(i);
-console.log(c);
+console.log(5);

```

## `terser/new/call_with_unary_arguments`


```js
x();
x(-1);
x(-1, -2);
x(void 1, +2, -3, ~4, !5, --a, ++b, c--, d++, typeof e, delete f);
(-1)();
(-1)(-2);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 x();
 x(-1);
 x(-1, -2);
-x(void 0, 2, -3, -5, !5, --a, ++b, c--, d++, typeof e, delete f);
+x(void 0, 2, -3, -5, !1, --a, ++b, c--, d++, typeof e, delete f);
 (-1)();
 (-1)(-2);

```

## `terser/new/new_constructor_with_unary_arguments`


```js
new x();
new x(-1);
new x(-1, -2);
new x(void 1, +2, -3, ~4, !5, --a, ++b, c--, d++, typeof e, delete f);
new (-1)();
new (-1)();
new (-1)(-2);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 new x();
 new x(-1);
 new x(-1, -2);
-new x(void 0, 2, -3, -5, !5, --a, ++b, c--, d++, typeof e, delete f);
+new x(void 0, 2, -3, -5, !1, --a, ++b, c--, d++, typeof e, delete f);
 new (-1)();
 new (-1)();
 new (-1)(-2);

```

## `terser/numbers/unary_binary_parenthesis`


```js
var v = [
	0,
	1,
	NaN,
	Infinity,
	null,
	undefined,
	true,
	false,
	'',
	'foo',
	/foo/
];
v.forEach(function(x) {
	v.forEach(function(y) {
		console.log(+(x * y), +(x / y), +(x % y), -(x * y), -(x / y), -(x % y));
	});
});

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var v = [
 	0,
 	1,
-	0 / 0,
-	1 / 0,
+	NaN,
+	Infinity,
 	null,
 	void 0,
-	true,
-	false,
+	!0,
+	!1,
 	'',
 	'foo',
 	/foo/

```

## `terser/object/getter_setter_mangler`


```js
function f(get, set) {
	return {
		get,
		set,
		get g() {},
		set s(n) {},
		c,
		a: 1,
		m() {}
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
-function f(t, e) {
+function f(get, set) {
 	return {
-		get: t,
-		set: e,
+		get,
+		set,
 		get g() {},
-		set s(t) {},
+		set s(n) {},
 		c,
 		a: 1,
 		m() {}

```

## `terser/properties/join_object_assignments_NaN_1`

- tags: `join vars`

```js
var o = {};
o[NaN] = 1;
o[0 / 0] = 2;
console.log(o[NaN], o[NaN]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var o = {};
-o[0 / 0] = 1;
-o[0 / 0] = 2;
-console.log(o[0 / 0], o[0 / 0]);
+o[NaN] = 1;
+o[NaN] = 2;
+console.log(o[NaN], o[NaN]);

```

## `terser/properties/join_object_assignments_return_2`

- tags: `join vars`

```js
console.log((function() {
	var o = { p: 3 };
	return o.q = /foo/, o.r = 'bar';
})());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,4 @@
 console.log((function() {
-	var o = {
-		p: 3,
-		q: /foo/,
-		r: 'bar'
-	};
-	return o.r;
+	var o = { p: 3 };
+	return o.q = /foo/, o.r = 'bar';
 })());

```

## `terser/reduce_vars/inner_var_for_1`

- tags: `join vars`

```js
function f() {
	var a = 1;
	x(a, b, d);
	for (var b = 2, c = 3; x(a, b, c, d); x(a, b, c, d)) {
		var d = 4, e = 5;
		x(a, b, c, d, e);
	}
	x(a, b, c, d, e);
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 function f() {
 	var a = 1;
-	x(1, b, d);
-	for (var b = 2, c = 3; x(1, b, 3, d); x(1, b, 3, d)) {
+	x(a, b, d);
+	for (var b = 2, c = 3; x(a, b, c, d); x(a, b, c, d)) {
 		var d = 4, e = 5;
-		x(1, b, 3, d, e);
+		x(a, b, c, d, e);
 	}
-	x(1, b, 3, d, e);
+	x(a, b, c, d, e);
 }

```

## `terser/reduce_vars/multi_def_2`

- tags: `join vars`

```js
function f() {
	if (code == 16) var bitsLength = 2, bitsOffset = 3, what = len;
	else if (code == 17) var bitsLength = 3, bitsOffset = 3, what = len = 0;
	else if (code == 18) var bitsLength = 7, bitsOffset = 11, what = len = 0;
	var repeatLength = this.getBits(bitsLength) + bitsOffset;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f() {
-	if (16 == code) var bitsLength = 2, bitsOffset = 3, what = len;
-	else if (17 == code) var bitsLength = 3, bitsOffset = 3, what = len = 0;
-	else if (18 == code) var bitsLength = 7, bitsOffset = 11, what = len = 0;
+	if (code == 16) var bitsLength = 2, bitsOffset = 3, what = len;
+	else if (code == 17) var bitsLength = 3, bitsOffset = 3, what = len = 0;
+	else if (code == 18) var bitsLength = 7, bitsOffset = 11, what = len = 0;
 	var repeatLength = this.getBits(bitsLength) + bitsOffset;
 }

```

## `terser/sequences/hoist_defun`

- tags: `join vars`, `sequences`

```js
x();
function f() {}
y();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
+x();
 function f() {}
-x(), y();
+y();

```

## `terser/sequences/lift_sequences_3`

- tags: `sequences`

```js
var x, foo, bar, baz;
x = (foo(), bar(), baz()) ? 10 : 20;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var x, foo, bar, baz;
-foo(), bar(), x = baz() ? 10 : 20;
+var x = (foo(), bar(), baz() ? 10 : 20), foo, bar, baz;

```

## `terser/sequences/side_effects_cascade_1`

- tags: `join vars`, `sequences`

```js
function f(a, b) {
	a -= 42;
	if (a < 0) a = 0;
	b.a = a;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f(a, b) {
-	(a -= 42) < 0 && (a = 0), b.a = a;
+	a -= 42, a < 0 && (a = 0), b.a = a;
 }

```

## `terser/string_literal/reduce_escaped_newline/es2015`


```js
var backslashBackslash = 'a\n\\\\b';
var backslashBacktick = 'a\n\\`b';
var backslashDollar = 'a\n\\$b';
var backslashInterpolation = 'a\n\\${b';
var escapedBacktick = 'a\n`b';
var escapedDollar = 'a\n$b';
var escapedInterpolation = 'a\n${b';
var backslash = 'a\n\\b';
var backtick = 'a\n`b';
var dollar = 'a\n$b';
var interpolation = 'a\n${b';
var lf = 'a\n\nb';
var cr = 'a\n\rb';

```

```diff
--- reference
+++ oxc
@@ -1,24 +1,13 @@
-var backslashBackslash = `a
-\\\\b`;
+var backslashBackslash = 'a\n\\\\b';
 var backslashBacktick = 'a\n\\`b';
-var backslashDollar = `a
-\\$b`;
-var backslashInterpolation = `a
-\\\${b`;
+var backslashDollar = 'a\n\\$b';
+var backslashInterpolation = 'a\n\\${b';
 var escapedBacktick = 'a\n`b';
-var escapedDollar = `a
-$b`;
-var escapedInterpolation = `a
-\${b`;
-var backslash = `a
-\\b`;
+var escapedDollar = 'a\n$b';
+var escapedInterpolation = 'a\n${b';
+var backslash = 'a\n\\b';
 var backtick = 'a\n`b';
-var dollar = `a
-$b`;
-var interpolation = `a
-\${b`;
-var lf = `a
-
-b`;
-var cr = `a
-\rb`;
+var dollar = 'a\n$b';
+var interpolation = 'a\n${b';
+var lf = 'a\n\nb';
+var cr = 'a\n\rb';

```

## `terser/switch/issue_1663`


```js
var a = 100, b = 10;
function f() {
	switch (1) {
		case 1:
			b = a++;
			return ++b;
		default: var b;
	}
}
f();
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 var a = 100, b = 10;
 function f() {
-	var b;
 	b = a++;
 	return ++b;
+	var b;
 }
 f();
 console.log(a, b);

```

## `terser/template_string/equality`


```js
var a = `1${any}2` === '12';
var b = `1${any}2` === `12`;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = '12' == `1${any}2`;
-var b = '12' == `1${any}2`;
+var a = `1${any}2` == '12';
+var b = `1${any}2` == '12';

```

## `terser/try_catch/broken_safari_catch_scope`

- tags: `mangle`, `keep function names`, `keep class names`

```js
'AAAAAAAA';
'BBBBBBB';
new class {
	f(x) {
		try {
			throw { m: 'PASS' };
		} catch ({ m: s }) {
			console.log(s);
		}
	}
}().f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 'AAAAAAAA';
 'BBBBBBB';
 new class {
-	f(A) {
+	f(e) {
 		try {
 			throw { m: 'PASS' };
-		} catch ({ m: A }) {
-			console.log(A);
+		} catch ({ m: e }) {
+			console.log(e);
 		}
 	}
 }().f();

```

## `terser/try_catch/broken_safari_catch_scope_caveat`

- tags: `mangle`, `keep function names`, `keep class names`

```js
'AAAAAAAA';
'BBBBBBB';
new class {
	f(x) {
		try {
			throw { m: 'PASS' };
		} catch ({ m: x }) {
			console.log(x);
		}
	}
}().f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 'AAAAAAAA';
 'BBBBBBB';
 new class {
-	f(A) {
+	f(e) {
 		try {
 			throw { m: 'PASS' };
-		} catch ({ m: A }) {
-			console.log(A);
+		} catch ({ m: e }) {
+			console.log(e);
 		}
 	}
 }().f();

```

