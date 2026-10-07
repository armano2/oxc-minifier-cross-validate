# terser / differs — Output differs at equal length

Fixtures: 97

[← terser](README.md) · [← all families](../README.md)

## `terser/async/async_function_declaration`

- tags: `remove unused`

```js
async function f0() {}
async function f1() {
	await x + y;
}
async function f2() {
	await (x + y);
}
async function f3() {
	await x + await y;
}
async function f4() {
	await (x + await y);
}
async function f5() {
	await x;
	await y;
}
async function f6() {
	await x, await y;
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 async function f0() {}
 async function f1() {
-	await x, y;
+	await x + y;
 }
 async function f2() {
 	await (x + y);
 }
 async function f3() {
-	await x, await y;
+	await x + await y;
 }
 async function f4() {
 	await (x + await y);

```

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

## `terser/collapse_vars/collapse_vars_short_circuit`

- tags: `join vars`, `sequences`, `remove unused`

```js
function f0(x) {
	var a = foo(), b = bar();
	return b || x;
}
function f1(x) {
	var a = foo(), b = bar();
	return b && x;
}
function f2(x) {
	var a = foo(), b = bar();
	return x && a && b;
}
function f3(x) {
	var a = foo(), b = bar();
	return a && x;
}
function f4(x) {
	var a = foo(), b = bar();
	return a && x && b;
}
function f5(x) {
	var a = foo(), b = bar();
	return x || a || b;
}
function f6(x) {
	var a = foo(), b = bar();
	return a || x || b;
}
function f7(x) {
	var a = foo(), b = bar();
	return a && b && x;
}
function f8(x, y) {
	var a = foo(), b = bar();
	return (x || a) && (y || b);
}
function f9(x, y) {
	var a = foo(), b = bar();
	return x && a || y && b;
}
function f10(x, y) {
	var a = foo(), b = bar();
	return x - a || y - b;
}
function f11(x, y) {
	var a = foo(), b = bar();
	return x - b || y - a;
}
function f12(x, y) {
	var a = foo(), b = bar();
	return x - y || b - a;
}
function f13(x, y) {
	var a = foo(), b = bar();
	return a - b || x - y;
}
function f14(x, y) {
	var a = foo(), b = bar();
	return b - a || x - y;
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,8 @@
 function f0(x) {
-	foo();
-	return bar() || x;
+	return foo(), bar() || x;
 }
 function f1(x) {
-	foo();
-	return bar() && x;
+	return foo(), bar() && x;
 }
 function f2(x) {
 	var a = foo(), b = bar();
@@ -12,8 +10,7 @@
 }
 function f3(x) {
 	var a = foo();
-	bar();
-	return a && x;
+	return bar(), a && x;
 }
 function f4(x) {
 	var a = foo(), b = bar();

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

## `terser/conditionals/cond_1`

- tags: `sequences`

```js
function foo(do_something, some_condition) {
	if (some_condition) {
		do_something(x);
	} else {
		do_something(y);
	}
	if (some_condition) {
		side_effects(x);
	} else {
		side_effects(y);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function foo(do_something, some_condition) {
-	do_something(some_condition ? x : y);
-	some_condition ? side_effects(x) : side_effects(y);
+	do_something(some_condition ? x : y), some_condition ? side_effects(x) : side_effects(y);
 }

```

## `terser/conditionals/cond_4`

- tags: `sequences`

```js
var do_something;
if (some_condition()) {
	do_something();
} else {
	do_something();
}
if (some_condition()) {
	side_effects();
} else {
	side_effects();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 var do_something;
-some_condition(), do_something();
-some_condition(), side_effects();
+some_condition(), do_something(), some_condition(), side_effects();

```

## `terser/conditionals/cond_5`

- tags: `sequences`

```js
if (some_condition()) {
	if (some_other_condition()) {
		do_something();
	} else {
		alternate();
	}
} else {
	alternate();
}
if (some_condition()) {
	if (some_other_condition()) {
		do_something();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-some_condition() && some_other_condition() ? do_something() : alternate();
-some_condition() && some_other_condition() && do_something();
+some_condition() && some_other_condition() ? do_something() : alternate(), some_condition() && some_other_condition() && do_something();

```

## `terser/conditionals/cond_7_1`

- tags: `sequences`

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

## `terser/conditionals/ifs_1`

- tags: `sequences`

```js
if (foo) bar();
if (!foo);
else bar();
if (foo);
else bar();
if (foo);
else;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-foo && bar();
-foo && bar();
-foo || bar();
-foo;
+foo && bar(), foo && bar(), foo || bar(), foo;

```

## `terser/conditionals/ifs_2`

- tags: `sequences`

```js
if (foo) {
	x();
} else if (bar) {
	y();
} else if (baz) {
	z();
}
if (foo) {
	x();
} else if (bar) {
	y();
} else if (baz) {
	z();
} else {
	t();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-foo ? x() : bar ? y() : baz && z();
-foo ? x() : bar ? y() : baz ? z() : t();
+foo ? x() : bar ? y() : baz && z(), foo ? x() : bar ? y() : baz ? z() : t();

```

## `terser/conditionals/ifs_same_consequent`

- tags: `sequences`

```js
if (foo) {
	x();
} else if (bar) {
	x();
} else if (baz) {
	x();
}
if (foo) {
	x();
} else if (bar) {
	x();
} else if (baz) {
	x();
} else {
	x();
}
if (foo) {
	x();
} else if (bar) {
	x();
} else if (baz) {
	x();
} else {
	y();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-(foo || bar || baz) && x();
-foo || bar || baz, x();
-foo || bar || baz ? x() : y();
+(foo || bar || baz) && x(), foo || bar || baz, x(), foo || bar || baz ? x() : y();

```

## `terser/conditionals/issue_1645_2`

- tags: `sequences`

```js
var a = 0;
function f() {
	return a++;
}
f() ? a += 2 : a += 4;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,4 @@
 function f() {
 	return a++;
 }
-f() ? a += 2 : a += 4;
-console.log(a);
+f() ? a += 2 : a += 4, console.log(a);

```

## `terser/conditionals/issue_2535_1`

- tags: `sequences`, `2 iterations`

```js
if (true || x()) y();
if (true && x()) y();
if (x() || true) y();
if (x() && true) y();
if (false || x()) y();
if (false && x()) y();
if (x() || false) y();
if (x() && false) y();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1 @@
-y();
-x() && y();
-x(), y();
-x() && y();
-x() && y();
-x() && y();
-x();
+y(), x() && y(), x(), y(), x() && y(), x() && y(), x() && y(), x();

```

## `terser/conditionals/no_evaluate`

- tags: `sequences`

```js
function f(b) {
	a = b ? !0 : !0;
	a = b ? ~1 : ~1;
	a = b ? -2 : -2;
	a = b ? +3 : +3;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
 function f(b) {
-	a = !0;
-	a = -2;
-	a = -2;
-	a = 3;
+	a = !0, a = -2, a = -2, a = 3;
 }

```

## `terser/conditionals/trivial_boolean_ternary_expressions`

- tags: `sequences`

```js
f('foo' in m ? true : false);
f('foo' in m ? false : true);
f(g ? true : false);
f(foo() ? true : false);
f('bar' ? true : false);
f(5 ? true : false);
f(5.7 ? true : false);
f(x - y ? true : false);
f(x == y ? true : false);
f(x === y ? !0 : !1);
f(x < y ? !0 : false);
f(x <= y ? true : false);
f(x > y ? true : !1);
f(x >= y ? !0 : !1);
f(g ? false : true);
f(foo() ? false : true);
f('bar' ? false : true);
f(5 ? false : true);
f(5.7 ? false : true);
f(x - y ? false : true);
f(x == y ? !1 : !0);
f(x === y ? false : true);
f(x < y ? false : true);
f(x <= y ? false : !0);
f(x > y ? !1 : true);
f(x >= y ? !1 : !0);

```

```diff
--- reference
+++ oxc
@@ -1,26 +1 @@
-f('foo' in m);
-f(!('foo' in m));
-f(!!g);
-f(!!foo());
-f(!0);
-f(!0);
-f(!0);
-f(!!(x - y));
-f(x == y);
-f(x === y);
-f(x < y);
-f(x <= y);
-f(x > y);
-f(x >= y);
-f(!g);
-f(!foo());
-f(!1);
-f(!1);
-f(!1);
-f(!(x - y));
-f(x != y);
-f(x !== y);
-f(!(x < y));
-f(!(x <= y));
-f(!(x > y));
-f(!(x >= y));
+f('foo' in m), f(!('foo' in m)), f(!!g), f(!!foo()), f(!0), f(!0), f(!0), f(!!(x - y)), f(x == y), f(x === y), f(x < y), f(x <= y), f(x > y), f(x >= y), f(!g), f(!foo()), f(!1), f(!1), f(!1), f(!(x - y)), f(x != y), f(x !== y), f(!(x < y)), f(!(x <= y)), f(!(x > y)), f(!(x >= y));

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

## `terser/destructuring/issue_t111_3`

- tags: `remove unused`

```js
let p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), {} = p(4);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-let p = (x) => (console.log(x), x), {} = (p(1), p(2)), {} = (p(3), p(4));
+let p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), {} = p(4);

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

## `terser/expansions/avoid_spread_in_ternary`

- tags: `sequences`

```js
function print(...x) {
	console.log(...x);
}
var a = [1, 2], b = [3, 4], m = Math;
if (m) print(a);
else print(b);
if (m) print(...a);
else print(b);
if (m.no_such_property) print(a);
else print(...b);

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,4 @@
 	console.log(...x);
 }
 var a = [1, 2], b = [3, 4], m = Math;
-print(m ? a : b);
-m ? print(...a) : print(b);
-m.no_such_property ? print(a) : print(...b);
+print(m ? a : b), m ? print(...a) : print(b), m.no_such_property ? print(a) : print(...b);

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

- tags: `type:module`, `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`

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

## `terser/harmony/object_rest_spread`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`

```js
var { w: w1, ...V } = {
	w: 7,
	x: 1,
	y: 2
};
console.log(w1, V);
let { w: w2, ...L } = {
	w: 8,
	x: 3,
	y: 4
};
console.log(w2, L);
const { w: w3, ...C } = {
	w: 9,
	x: 5,
	y: 6
};
console.log(w3, C);
let b;
({b: b, ...V} = {
	a: 1,
	b: 2,
	c: 3
});
console.log(V);
({b: b, ...L} = {
	a: 4,
	b: 5,
	c: 6
});
console.log(L);
(function({ y, ...p }) {
	console.log(p);
})({
	x: 1,
	y: 2,
	z: 3
});
(({ y, ...p }) => {
	console.log(p);
})({
	x: 4,
	y: 5,
	z: 6
});
const T = {
	a: 1,
	b: 2
};
console.log({
	...T,
	w: 0,
	...{},
	...L,
	...{ K: 9 }
});

```

```diff
--- reference
+++ oxc
@@ -1,55 +1,55 @@
-var { w: o, ...l } = {
+var { w: e, ...t } = {
 	w: 7,
 	x: 1,
 	y: 2
 };
-console.log(o, l);
-let { w: c, ...n } = {
+console.log(e, t);
+let { w: n, ...r } = {
 	w: 8,
 	x: 3,
 	y: 4
 };
-console.log(c, n);
-const { w: e, ...s } = {
+console.log(n, r);
+const { w: i, ...a } = {
 	w: 9,
 	x: 5,
 	y: 6
 };
-console.log(e, s);
-let g;
-({b: g, ...l} = {
+console.log(i, a);
+let o;
+({b: o, ...t} = {
 	a: 1,
 	b: 2,
 	c: 3
 });
-console.log(l);
-({b: g, ...n} = {
+console.log(t);
+({b: o, ...r} = {
 	a: 4,
 	b: 5,
 	c: 6
 });
-console.log(n);
-(function({ y: o, ...l }) {
-	console.log(l);
+console.log(r);
+(function({ y: e, ...t }) {
+	console.log(t);
 })({
 	x: 1,
 	y: 2,
 	z: 3
 });
-(({ y: o, ...l }) => {
-	console.log(l);
+(({ y: e, ...t }) => {
+	console.log(t);
 })({
 	x: 4,
 	y: 5,
 	z: 6
 });
-const w = {
+const s = {
 	a: 1,
 	b: 2
 };
 console.log({
-	...w,
+	...s,
 	w: 0,
-	...n,
+	...r,
 	K: 9
 });

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

## `terser/issue_1202/mangle_keep_fnames_false`

- tags: `mangle`, `keep class names`, `keep function names`

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
-	return function t(t, n, r) {
+	return function e(t, n, r) {
 		return t + n + r;
 	};
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

## `terser/issue_1446/typeof_eq_undefined`


```js
var a = typeof b != 'undefined';
b = typeof a != 'undefined';
var c = typeof d.e !== 'undefined';
var f = 'undefined' === typeof g;
g = 'undefined' === typeof f;
var h = 'undefined' == typeof i.j;

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var a = 'u' > typeof b;
-b = void 0 !== a;
-var c = void 0 !== d.e;
-var f = 'u' < typeof g;
-g = void 0 === f;
-var h = void 0 === i.j;
+var a = typeof b < 'u';
+b = a !== void 0;
+var c = d.e !== void 0;
+var f = typeof g > 'u';
+g = f === void 0;
+var h = i.j === void 0;

```

## `terser/issue_1466/more_variable_in_multiple_for`

- tags: `join vars`, `sequences`

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

## `terser/issue_44/issue_44_valid_ast_2`

- tags: `remove unused`

```js
function a(b) {
	if (foo) for (var i = 0, e = b.qoo();; i++) {}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
 function a(b) {
-	if (foo) {
-		var i = 0;
-		for (b.qoo();; i++);
-	}
+	if (foo) for (var i = 0, e = b.qoo();; i++);
 }

```

## `terser/issue_640/cond_5`

- tags: `sequences`

```js
if (some_condition()) {
	if (some_other_condition()) {
		do_something();
	} else {
		alternate();
	}
} else {
	alternate();
}
if (some_condition()) {
	if (some_other_condition()) {
		do_something();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-some_condition() && some_other_condition() ? do_something() : alternate();
-some_condition() && some_other_condition() && do_something();
+some_condition() && some_other_condition() ? do_something() : alternate(), some_condition() && some_other_condition() && do_something();

```

## `terser/issue_973/this_binding_conditionals`

- tags: `sequences`

```js
(1 && a)();
(0 || a)();
(0 || 1 && a)();
(1 ? a : 0)();
(1 && a.b)();
(0 || a.b)();
(0 || 1 && a.b)();
(1 ? a.b : 0)();
(1 && a[b])();
(0 || a[b])();
(0 || 1 && a[b])();
(1 ? a[b] : 0)();
(1 && eval)();
(0 || eval)();
(0 || 1 && eval)();
(1 ? eval : 0)();

```

```diff
--- reference
+++ oxc
@@ -1,16 +1 @@
-a();
-a();
-a();
-a();
-(0, a.b)();
-(0, a.b)();
-(0, a.b)();
-(0, a.b)();
-(0, a[b])();
-(0, a[b])();
-(0, a[b])();
-(0, a[b])();
-(0, eval)();
-(0, eval)();
-(0, eval)();
-(0, eval)();
+a(), a(), a(), a(), (0, a.b)(), (0, a.b)(), (0, a.b)(), (0, a.b)(), (0, a[b])(), (0, a[b])(), (0, a[b])(), (0, a[b])(), (0, eval)(), (0, eval)(), (0, eval)(), (0, eval)();

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

## `terser/keep_names/drop_fnames`

- tags: `mangle`, `keep class names`

```js
function foo() {
	function bar() {
		return 'foobar';
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function foo() {
-	function o() {
+	function e() {
 		return 'foobar';
 	}
 }

```

## `terser/labels/labels_5`

- tags: `sequences`

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

## `terser/labels/labels_8`

- tags: `sequences`

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
@@ -1,5 +1,4 @@
-while (foo) {
-	x();
-	y();
+for (; foo;) {
+	x(), y();
 	break;
 }

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

## `terser/negate_iife/issue_1288_side_effects`

- tags: `sequences`

```js
if (w);
else {
	(function f() {})();
}
if (!x) {
	(function() {
		x = {};
	})();
}
if (y) (function() {})();
else (function(z) {
	return z;
})(0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-w;
-x || (function() {
+w, x || (function() {
 	x = {};
-})();
-y;
+})(), y;

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

## `terser/properties/mangle_properties_which_matches_pattern`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`, `drop debugger`, `join vars`, `sequences`, `remove unused`

```js
var acd = {
	get asd() {
		return this._asd;
	},
	_asd: true
};
console.log(acd);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var acd = {
 	get asd() {
-		return this.a;
+		return this.e;
 	},
-	a: !0
+	e: !0
 };
 console.log(acd);

```

## `terser/pure_getters/issue_2313_7`

- tags: `join vars`, `sequences`, `pure getters`

```js
var a = 0, b = 0;
class foo {
	get c() {
		a++;
		return 42;
	}
	set c(c) {
		b++;
	}
}
class bar extends foo {
	d() {
		super.c++;
		if (super.c) console.log(a, b);
	}
}
new bar().d();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 var a = 0, b = 0;
 class foo {
 	get c() {
-		a++;
-		return 42;
+		return a++, 42;
 	}
 	set c(c) {
 		b++;
@@ -10,8 +9,7 @@
 }
 class bar extends foo {
 	d() {
-		super.c++;
-		super.c && console.log(a, b);
+		super.c++, super.c && console.log(a, b);
 	}
 }
 new bar().d();

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

