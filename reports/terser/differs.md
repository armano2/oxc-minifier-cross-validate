# terser / differs — Output differs at equal length

Fixtures: 128

[← terser](README.md) · [← all families](../README.md)

## `terser/collapse_vars/collapse_rhs_conditional_1`


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

## `terser/collapse_vars/collapse_rhs_lhs_2`


```js
var b = 1;
(function f(f) {
	f = b;
	f[b] = 0;
})();
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var b = 1;
-(function f(f) {
-	(f = b)[b] = 0;
+(function(f) {
+	f = 1;
+	f[1] = 0;
 })();
 console.log('PASS');

```

## `terser/collapse_vars/iife_1`


```js
var log = function(x) {
	console.log(x);
}, foo = bar();
log(foo);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function(x) {
-	console.log(x);
+(function(e) {
+	console.log(e);
 })(bar());

```

## `terser/collapse_vars/issue_1537`


```js
var k = '';
for (k in { prop: 'val' }) {}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var k = '';
-for (k in { prop: 'val' });
+var e = '';
+for (e in { prop: 'val' });

```

## `terser/collapse_vars/issue_1537_destructuring_2`


```js
var x = foo();
[x] = [1];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var x = foo();
-[x] = [1];
+var e = foo();
+[e] = [1];

```

## `terser/collapse_vars/issue_1537_destructuring_3`


```js
var x = Math.random();
({p: x = 9} = { v: 1 });

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var x = Math.random();
-({p: x = 9} = { v: 1 });
+var e = Math.random();
+({p: e = 9} = { v: 1 });

```

## `terser/collapse_vars/issue_1537_destructuring_for_in`


```js
var x = 1, y = 2;
(function() {
	for ([[x], y] in a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var x = 1, y = 2;
+var e = 1, t = 2;
 (function() {
-	for ([[x], y] in a);
+	for ([[e], t] in a);
 })();

```

## `terser/collapse_vars/issue_1537_destructuring_for_of`


```js
var x = 1, y = 2;
(function() {
	for ([[x], y] of a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var x = 1, y = 2;
+var e = 1, t = 2;
 (function() {
-	for ([[x], y] of a);
+	for ([[e], t] of a);
 })();

```

## `terser/collapse_vars/issue_1537_for_of`


```js
var k = '';
for (k of { prop: 'val' }) {}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var k = '';
-for (k of { prop: 'val' });
+var e = '';
+for (e of { prop: 'val' });

```

## `terser/collapse_vars/issue_2908`


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

## `terser/collapse_vars/lvalues_def`


```js
var a = 0, b = 1;
var a = b++, b = +(function() {})();
a && a[a++];
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var a = 0, b = 1;
-a = b++, b = +void 0;
+var a = b++, b = NaN;
 a && a[a++];
 console.log(a, b);

```

## `terser/collapse_vars/replace_all_var_scope`


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

## `terser/drop_unused/defun_lambda_same_name`


```js
function f(n) {
	return n ? n * f(n - 1) : 1;
}
console.log((function f(n) {
	return n ? n * f(n - 1) : 1;
})(5));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log((function f(n) {
-	return n ? n * f(n - 1) : 1;
+console.log((function e(t) {
+	return t ? t * e(t - 1) : 1;
 })(5));

```

## `terser/drop_unused/issue_2660_1`


```js
var a = 2;
function f(b) {
	return b && f() || a--;
}
f(1);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-var a = 2;
-(function f(b) {
-	return b && f() || a--;
-})(1);
-console.log(a);
+var e = 2;
+function t(n) {
+	return n && t() || e--;
+}
+t(1);
+console.log(e);

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

## `terser/export/issue_2038_1`


```js
export var V = 1;
export let L = 2;
export const C = 3;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-export var V = 1;
-export let L = 2;
-export const C = 3;
+export var e = 1;
+export let t = 2;
+export const n = 3;

```

## `terser/export/issue_2038_2`


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

## `terser/functions/inline_loop_4`


```js
for (;;) f();
var f = function() {
	return x();
};

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-for (;;) f();
-var f = function() {
+for (;;) e();
+var e = function() {
 	return x();
 };

```

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
-var a = 'PASS';
-for (var k in '12') {
-	var b = void 0;
-	(b >>= 1) && (a = 'FAIL'), b = 2;
-}
-console.log(a);
+var e = 'PASS';
+for (var t in '12') (function(t) {
+	(t >>= 1) && (e = 'FAIL'), t = 2;
+})();
+console.log(e);

```

## `terser/functions/recursive_inline_2`


```js
function f(n) {
	return n ? n * f(n - 1) : 1;
}
console.log(f(5));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log((function f(n) {
-	return n ? n * f(n - 1) : 1;
-})(5));
+function e(t) {
+	return t ? t * e(t - 1) : 1;
+}
+console.log(e(5));

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

## `terser/harmony/array_spread_of_sequence`


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
+var a = [1];
+console.log([...a]);
+console.log([...a, a]);
+console.log([...a || a]);
+console.log([...a || a]);

```

## `terser/harmony/issue_t80`


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

## `terser/harmony/module_mangle_scope`


```js
let a = 10;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-let e = 10;
+let a = 10;

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

## `terser/hoist_props/contains_this_1`


```js
var o = {
	u: function() {
		return this === this;
	},
	p: 1
};
console.log(o.p, o.p);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var o = {
+var e = {
 	u: function() {
 		return this === this;
 	},
 	p: 1
 };
-console.log(o.p, o.p);
+console.log(e.p, e.p);

```

## `terser/hoist_props/contains_this_2`


```js
var o = {
	u: function() {
		return this === this;
	},
	p: 1
};
console.log(o.p, o.p, o.u);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var o = {
+var e = {
 	u: function() {
 		return this === this;
 	},
 	p: 1
 };
-console.log(o.p, o.p, o.u);
+console.log(e.p, e.p, e.u);

```

## `terser/hoist_props/contains_this_3`


```js
var o = {
	u: function() {
		return this === this;
	},
	p: 1
};
console.log(o.p, o.p, o.u());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var o = {
+var e = {
 	u: function() {
 		return this === this;
 	},
 	p: 1
 };
-console.log(o.p, o.p, o.u());
+console.log(e.p, e.p, e.u());

```

## `terser/hoist_props/direct_access_3`


```js
var o = { a: 1 };
o.b;
console.log(o.a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var o = { a: 1 };
-o.b;
-console.log(o.a);
+var e = { a: 1 };
+e.b;
+console.log(e.a);

```

## `terser/hoist_props/issue_2473_3`


```js
var o = {
	a: 1,
	b: 2
};
console.log(o.a, o.b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var o = {
+var e = {
 	a: 1,
 	b: 2
 };
-console.log(o.a, o.b);
+console.log(e.a, e.b);

```

## `terser/hoist_props/issue_2508_3`


```js
var o = {
	a: [o],
	f: function(x) {
		console.log(x);
	}
};
o.f(o.a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var o = {
-	a: [o],
-	f: function(x) {
-		console.log(x);
+var e = {
+	a: [e],
+	f: function(e) {
+		console.log(e);
 	}
 };
-o.f(o.a);
+e.f(e.a);

```

## `terser/hoist_props/issue_2508_4`


```js
var o = {
	a: { b: o },
	f: function(x) {
		console.log(x);
	}
};
o.f(o.a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var o = {
-	a: { b: o },
-	f: function(x) {
-		console.log(x);
+var e = {
+	a: { b: e },
+	f: function(e) {
+		console.log(e);
 	}
 };
-o.f(o.a);
+e.f(e.a);

```

## `terser/hoist_props/new_this`


```js
var o = {
	a: 1,
	b: 2,
	f: function(a) {
		this.b = a;
	}
};
console.log(new o.f(o.a).b, o.b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-var o = {
+var e = {
 	a: 1,
 	b: 2,
-	f: function(a) {
-		this.b = a;
+	f: function(e) {
+		this.b = e;
 	}
 };
-console.log(new o.f(o.a).b, o.b);
+console.log(new e.f(e.a).b, e.b);

```

## `terser/if_return/issue_2747`


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
-		return t + n + r;
+	return function n(a, b, c) {
+		return a + b + c;
 	};
 }

```

## `terser/issue_1202/mangle_keep_fnames_true`


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
+	return function n(a, b, c) {
+		return a + b + c;
 	};
 }

```

## `terser/issue_1321/issue_1321_debug`


```js
var x = {};
x.foo = 1;
x['_$foo$_'] = 2 * x.foo;
console.log(x.foo, x['_$foo$_']);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var x = {};
-x.o = 1;
-x['_$foo$_'] = 2 * x.o;
-console.log(x.o, x['_$foo$_']);
+x.foo = 1;
+x._$foo$_ = 2 * x.foo;
+console.log(x.foo, x._$foo$_);

```

## `terser/issue_1321/issue_1321_no_debug`


```js
var x = {};
x.foo = 1;
x['a'] = 2 * x.foo;
console.log(x.foo, x['a']);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var x = {};
-x.o = 1;
-x['a'] = 2 * x.o;
-console.log(x.o, x['a']);
+x.foo = 1;
+x.a = 2 * x.foo;
+console.log(x.foo, x.a);

```

## `terser/issue_1321/issue_1321_with_quoted`


```js
var x = {};
x.foo = 1;
x['a'] = 2 * x.foo;
console.log(x.foo, x['a']);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var x = {};
-x.o = 1;
-x['a'] = 2 * x.o;
-console.log(x.o, x['a']);
+x.foo = 1;
+x.a = 2 * x.foo;
+console.log(x.foo, x.a);

```

## `terser/issue_1431/level_one`


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
+function f(x) {
 	return function() {
-		function n(r) {
-			return r * r;
+		function n(a) {
+			return a * a;
 		}
-		return r(n);
+		return x(n);
 	};
 }

```

## `terser/issue_1431/level_three`


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
+function f(x) {
 	return function() {
-		function r(u) {
-			return u * u;
+		function r(a) {
+			return a * a;
 		}
 		return [function() {
-			function t(u) {
-				return u * u;
+			function t(a) {
+				return a * a;
 			}
 			return t;
 		}, function() {
-			function n(u) {
-				return u * u;
+			function n(a) {
+				return a * a;
 			}
-			return u(n);
+			return x(n);
 		}];
 	};
 }

```

## `terser/issue_1431/level_two`


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
+function f(x) {
 	return function() {
-		function r(t) {
-			return t * t;
+		function r(a) {
+			return a * a;
 		}
 		return function() {
-			function n(t) {
-				return t * t;
+			function n(a) {
+				return a * a;
 			}
-			return t(n);
+			return x(n);
 		};
 	};
 }

```

## `terser/issue_1431/level_zero`


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
+function f(x) {
+	function n(a) {
+		return a * a;
 	}
 	return function() {
-		return r;
+		return x;
 	};
 }

```

## `terser/issue_1466/more_variable_in_multiple_for`


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
+} catch (o) {
 	(function() {
-		function n() {
-			c = 'FAIL';
+		function f() {
+			o = 'FAIL';
 		}
-		n(), n();
+		f(), f();
 	})();
 }
 console.log(o);

```

## `terser/issue_1704/mangle_catch_redef_ie8_3`


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
@@ -3,10 +3,10 @@
 	throw 0;
 } catch (o) {
 	(function() {
-		function c() {
+		function f() {
 			o = 'FAIL';
 		}
-		c(), c();
+		f(), f();
 	})();
 }
 console.log(o);

```

## `terser/issue_2001/export_class_1`


```js
export class C {}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export class C {}
+export class e {}

```

## `terser/issue_2001/export_class_2`


```js
export class C {}
1;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export class C {}
+export class e {}

```

## `terser/issue_2001/export_class_3`


```js
export class C {}
1;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export class C {}
+export class e {}

```

## `terser/issue_2001/export_default_class_1`


```js
export default class C {}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export default class C {}
+export default class e {}

```

## `terser/issue_2001/export_default_class_2`


```js
export default class C {}
1;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export default class C {}
+export default class e {}

```

## `terser/issue_2001/export_default_class_3`


```js
export default class C {}
1;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export default class C {}
+export default class e {}

```

## `terser/issue_2001/export_default_func_1`


```js
export default function f() {}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export default function f() {}
+export default function e() {}

```

## `terser/issue_2001/export_default_func_2`


```js
export default function f() {}
1;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export default function f() {}
+export default function e() {}

```

## `terser/issue_2001/export_default_func_3`


```js
export default function f() {}
1;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export default function f() {}
+export default function e() {}

```

## `terser/issue_2001/export_default_func_ref`


```js
export default function f() {}
f();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export default function f() {}
-f();
+export default function e() {}
+e();

```

## `terser/issue_2001/export_func_1`


```js
export function f() {}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export function f() {}
+export function e() {}

```

## `terser/issue_2001/export_func_2`


```js
export function f() {}
1;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export function f() {}
+export function e() {}

```

## `terser/issue_2001/export_func_3`


```js
export function f() {}
1;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export function f() {}
+export function e() {}

```

## `terser/issue_2001/export_toplevel_1`


```js
function f() {}
export function g() {}
export default function h() {}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export function g() {}
-export default function h() {}
+export function e() {}
+export default function t() {}

```

## `terser/issue_2001/export_toplevel_2`


```js
class A {}
export class B {}
export default class C {}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export class B {}
-export default class C {}
+export class e {}
+export default class t {}

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

## `terser/loops/keep_collapse_const_in_own_block_scope`


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

## `terser/new/new_statements_2`


```js
new x();
new new x()();
new new new x()()();
new true();
new 0();
new (!0)();
new (bar = function(foo) {
	this.foo = foo;
})(123);
new (bar = function(foo) {
	this.foo = foo;
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 new x();
 new new x()();
 new new new x()()();
-new true();
+new (!0)();
 new 0();
 new (!0)();
 new (bar = function(foo) {

```

## `terser/properties/issue_869_1`


```js
var o = { p: 'FAIL' };
Object.defineProperty(o, 'p', { get: function() {
	return 'PASS';
} });
console.log(o.p);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var o = { o: 'FAIL' };
-Object.defineProperty(o, 'o', { get: function() {
+var o = { p: 'FAIL' };
+Object.defineProperty(o, 'p', { get: function() {
 	return 'PASS';
 } });
-console.log(o.o);
+console.log(o.p);

```

## `terser/properties/issue_869_2`


```js
var o = { p: 'FAIL' };
Object.defineProperties(o, { p: { get: function() {
	return 'PASS';
} } });
console.log(o.p);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var o = { o: 'FAIL' };
-Object.defineProperties(o, { o: { get: function() {
+var o = { p: 'FAIL' };
+Object.defineProperties(o, { p: { get: function() {
 	return 'PASS';
 } } });
-console.log(o.o);
+console.log(o.p);

```

## `terser/properties/prop_side_effects_1`


```js
var C = 1;
console.log(C);
var obj = { bar: function() {
	return C + C;
} };
console.log(obj.bar());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-console.log(1);
-var obj = { bar: function() {
-	return 2;
-} };
-console.log(obj.bar());
+var e = 1;
+console.log(e);
+console.log({ bar: function() {
+	return e + e;
+} }.bar());

```

## `terser/pure_funcs/issue_3065_2b`


```js
function modifyWrapper(a, f, wrapper) {
	wrapper.a = a;
	wrapper.f = f;
	return wrapper;
}
function pureFunc(fun) {
	return modifyWrapper(1, fun, function(a) {
		return fun(a);
	});
}
var unused = pureFunc(function(x) {
	return x;
});
function print(message) {
	console.log(message);
}
print(2);
print(3);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function o(o) {
-	console.log(o);
+function e(e) {
+	console.log(e);
 }
-o(2);
-o(3);
+e(2);
+e(3);

```

## `terser/pure_funcs/unary`


```js
typeof foo();
typeof bar();
typeof 'bar';
void foo();
void bar();
void 'bar';
delete a[foo()];
delete a[bar()];
delete a['bar'];
a[foo()]++;
a[bar()]++;
a['bar']++;
--a[foo()];
--a[bar()];
--a['bar'];
~foo();
~bar();
~'bar';

```

```diff
--- reference
+++ oxc
@@ -2,11 +2,12 @@
 bar();
 delete a[foo()];
 delete a[bar()];
-delete a['bar'];
+delete a.bar;
 a[foo()]++;
 a[bar()]++;
-a['bar']++;
+a.bar++;
 --a[foo()];
 --a[bar()];
---a['bar'];
-bar();
+--a.bar;
+~foo();
+~bar();

```

## `terser/pure_getters/strict`


```js
var a, b = null, c = {};
a.prop;
b.prop;
c.prop;
d.prop;
null.prop;
(void 0).prop;
undefined.prop;

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a, b = null, c = {};
-a.prop;
-b.prop;
-c.prop;
+var e, t = null, n = {};
+e.prop;
+t.prop;
+n.prop;
 d.prop;
 null.prop;
 (void 0).prop;

```

## `terser/reduce_vars/accessor_1`


```js
var a = 1;
console.log({
	get a() {
		a = 2;
		return a;
	},
	b: 1
}.b, a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-var a = 1;
+var e = 1;
 console.log({
 	get a() {
-		a = 2;
-		return a;
+		e = 2;
+		return e;
 	},
 	b: 1
-}.b, a);
+}.b, e);

```

## `terser/reduce_vars/array_forin_1`


```js
var a = [
	1,
	2,
	3
];
for (var b in a) console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-for (var b in [
+for (var e in [
 	1,
 	2,
 	3
-]) console.log(b);
+]) console.log(e);

```

## `terser/reduce_vars/array_forin_2`


```js
var a = [];
for (var b in [
	1,
	2,
	3
]) a.push(b);
console.log(a.length);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a = [];
-for (var b in [
+var e = [];
+for (var t in [
 	1,
 	2,
 	3
-]) a.push(b);
-console.log(a.length);
+]) e.push(t);
+console.log(e.length);

```

## `terser/reduce_vars/array_forof_1`


```js
var a = [
	1,
	2,
	3
];
for (var b of a) console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-for (var b of [
+for (var e of [
 	1,
 	2,
 	3
-]) console.log(b);
+]) console.log(e);

```

## `terser/reduce_vars/array_forof_2`


```js
var a = [];
for (var b of [
	1,
	2,
	3
]) a.push(b);
console.log(a.length);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a = [];
-for (var b of [
+var e = [];
+for (var t of [
 	1,
 	2,
 	3
-]) a.push(b);
-console.log(a.length);
+]) e.push(t);
+console.log(e.length);

```

## `terser/reduce_vars/const_expr_1`


```js
var o = {
	a: 1,
	b: 2
};
o.a++;
console.log(o.a, o.b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var o = {
+var e = {
 	a: 1,
 	b: 2
 };
-o.a++;
-console.log(o.a, o.b);
+e.a++;
+console.log(e.a, e.b);

```

## `terser/reduce_vars/const_expr_2`


```js
Object.prototype.c = function() {
	this.a++;
};
var o = {
	a: 1,
	b: 2
};
o.c();
console.log(o.a, o.b);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 Object.prototype.c = function() {
 	this.a++;
 };
-var o = {
+var e = {
 	a: 1,
 	b: 2
 };
-o.c();
-console.log(o.a, o.b);
+e.c();
+console.log(e.a, e.b);

```

## `terser/reduce_vars/defun_assign`


```js
console.log(typeof a);
a = 42;
console.log(typeof a);
function a() {}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-console.log(typeof a);
-a = 42;
-console.log(typeof a);
-function a() {}
-console.log(typeof a);
+console.log(typeof e);
+e = 42;
+console.log(typeof e);
+function e() {}
+console.log(typeof e);

```

## `terser/reduce_vars/defun_catch_1`


```js
function a() {}
try {
	throw 42;
} catch (a) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	throw 42;
-} catch (a) {
-	console.log(a);
+} catch (e) {
+	console.log(e);
 }

```

## `terser/reduce_vars/defun_catch_2`


```js
try {
	function a() {}
	throw 42;
} catch (a) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	throw 42;
-} catch (a) {
-	console.log(a);
+} catch (e) {
+	console.log(e);
 }

```

## `terser/reduce_vars/defun_catch_3`


```js
try {
	throw 42;
	function a() {}
} catch (a) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	throw 42;
-} catch (a) {
-	console.log(a);
+} catch (e) {
+	console.log(e);
 }

```

## `terser/reduce_vars/defun_catch_4`


```js
try {
	throw 42;
} catch (a) {
	function a() {}
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	throw 42;
-} catch (a) {
-	function a() {}
-	console.log(a);
+} catch (e) {
+	function e() {}
+	console.log(e);
 }

```

## `terser/reduce_vars/defun_catch_5`


```js
try {
	throw 42;
} catch (a) {
	console.log(a);
	function a() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	throw 42;
-} catch (a) {
-	console.log(a);
-	function a() {}
+} catch (e) {
+	console.log(e);
+	function e() {}
 }

```

## `terser/reduce_vars/defun_catch_6`


```js
try {
	throw 42;
} catch (a) {
	console.log(a);
}
function a() {}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	throw 42;
-} catch (a) {
-	console.log(a);
+} catch (e) {
+	console.log(e);
 }

```

## `terser/reduce_vars/defun_single_use_loop`


```js
for (var x, i = 2; --i >= 0;) {
	var y = x;
	x = f;
	console.log(x === y);
}
function f() {}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-for (var x, i = 2; --i >= 0;) {
-	var y = x;
-	x = f;
-	console.log(x === y);
+for (var e, t = 2; --t >= 0;) {
+	var n = e;
+	e = r;
+	console.log(e === n);
 }
-function f() {}
+function r() {}

```

## `terser/reduce_vars/inner_var_for_1`


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

## `terser/reduce_vars/issue_1850_3`


```js
function f() {
	console.log(a, a, a);
}
var a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f() {
-	console.log(a, a, a);
+function e() {
+	console.log(t, t, t);
 }
-var a = 1;
-f();
+var t = 1;
+e();

```

## `terser/reduce_vars/issue_2423_1`


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
-function p() {
-	console.log((function() {
-		return 1;
-	})());
+function e() {
+	return 1;
+}
+function t() {
+	console.log(e());
 }
-p();
-p();
+t();
+t();

```

## `terser/reduce_vars/issue_2436`


```js
var c;
console.log(((c = {
	a: 1,
	b: 2
}).a = 3, {
	x: c.a,
	y: c.b
}));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-var c;
-console.log(((c = {
+var e;
+console.log(((e = {
 	a: 1,
 	b: 2
 }).a = 3, {
-	x: c.a,
-	y: c.b
+	x: e.a,
+	y: e.b
 }));

```

## `terser/reduce_vars/issue_2449`


```js
var a = 'PASS';
function f() {
	return a;
}
function g() {
	return f();
}
(function() {
	var a = 'FAIL';
	if (a == a) console.log(g());
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
+function e() {
+	return 'PASS';
+}
+function t() {
+	return e();
+}
 (function() {
-	var a = 'FAIL';
-	if (a == a) console.log(function() {
-		return function() {
-			return 'PASS';
-		}();
-	}());
+	var e = 'FAIL';
+	e == e && console.log(t());
 })();

```

## `terser/reduce_vars/issue_2450_1`


```js
function f() {}
function g() {
	return f;
}
console.log(g() === g());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f() {}
-function g() {
-	return f;
+function e() {}
+function t() {
+	return e;
 }
-console.log(g() === g());
+console.log(t() === t());

```

## `terser/reduce_vars/issue_3042_1`


```js
function f() {}
var a = [1, 2].map(function() {
	return new f();
});
console.log(a[0].constructor === a[1].constructor);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f() {}
-var a = [1, 2].map(function() {
-	return new f();
+function e() {}
+var t = [1, 2].map(function() {
+	return new e();
 });
-console.log(a[0].constructor === a[1].constructor);
+console.log(t[0].constructor === t[1].constructor);

```

## `terser/reduce_vars/issue_3113_4`


```js
var a = 0, b = 0;
function f() {
	b += a;
}
f(f(), ++a);
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var a = 0, b = 0;
-function f() {
-	b += a;
+var e = 0, t = 0;
+function n() {
+	t += e;
 }
-f(f(), ++a);
-console.log(a, b);
+n(n(), ++e);
+console.log(e, t);

```

## `terser/reduce_vars/issue_3125`


```js
var o;
console.log((function() {
	this.p++;
}.call(o = { p: 6 }), o.p));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var o;
+var e;
 console.log((function() {
 	this.p++;
-}.call(o = { p: 6 }), o.p));
+}.call(e = { p: 6 }), e.p));

```

## `terser/reduce_vars/method_1`


```js
var a = 1;
console.log(new class {
	a() {
		a = 2;
		return a;
	}
}().a(), a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a = 1;
+var e = 1;
 console.log(new class {
 	a() {
-		a = 2;
-		return a;
+		e = 2;
+		return e;
 	}
-}().a(), a);
+}().a(), e);

```

## `terser/reduce_vars/multi_def_2`


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

## `terser/reduce_vars/obj_for_2`


```js
var o = { a: 1 };
for (var i; i = o.a--;) console.log(i);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var o = { a: 1 };
-for (var i; i = o.a--;) console.log(i);
+var e = { a: 1 };
+for (var t; t = e.a--;) console.log(t);

```

## `terser/reduce_vars/perf_1`


```js
function foo(x, y, z) {
	return x < y ? x * y + z : x * z - y;
}
function indirect_foo(x, y, z) {
	return foo(x, y, z);
}
var sum = 0;
for (var i = 0; i < 100; ++i) {
	sum += indirect_foo(i, i + 1, 3 * i);
}
console.log(sum);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
-var sum = 0;
-for (var i = 0; i < 100; ++i) sum += function(x, y, z) {
-	return function(x, y, z) {
-		return x < y ? x * y + z : x * z - y;
-	}(x, y, z);
-}(i, i + 1, 3 * i);
-console.log(sum);
+function e(e, t, n) {
+	return e < t ? e * t + n : e * n - t;
+}
+function t(t, n, r) {
+	return e(t, n, r);
+}
+var n = 0;
+for (var r = 0; r < 100; ++r) n += t(r, r + 1, 3 * r);
+console.log(n);

```

## `terser/reduce_vars/unsafe_evaluate_array_2`


```js
var arr = [
	1,
	2,
	function(x) {
		return x * x;
	},
	function(x) {
		return x * x * x;
	}
];
console.log(arr[0], arr[1], arr[2](2), arr[3]);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
-var arr = [
+var e = [
 	1,
 	2,
-	function(x) {
-		return x * x;
+	function(e) {
+		return e * e;
 	},
-	function(x) {
-		return x * x * x;
+	function(e) {
+		return e * e * e;
 	}
 ];
-console.log(1, 2, arr[2](2), arr[3]);
+console.log(e[0], e[1], e[2](2), e[3]);

```

## `terser/sequences/hoist_defun`


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

## `terser/template_string/issue_1856`


```js
console.log(`\\n\\r\\u2028\\u2029\n\r\u2028\u2029`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`\\n\\r\\u2028\\u2029\n\r\u2028\u2029`);
+console.log('\\n\\r\\u2028\\u2029\n\r\u2028\u2029');

```

## `terser/template_string/issue_1856_ascii_only`


```js
console.log(`\\n\\r\\u2028\\u2029\n\r\u2028\u2029`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`\\n\\r\\u2028\\u2029\n\r\u2028\u2029`);
+console.log('\\n\\r\\u2028\\u2029\n\r\u2028\u2029');

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

## `terser/template_string/template_ending_with_newline`


```js
function foo(e) {
	return `this is a template string!\n`;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function foo(e) {
-	return `this is a template string!\n`;
+	return 'this is a template string!\n';
 }

```

## `terser/template_string/template_starting_with_newline`


```js
function foo(e) {
	return `\nthis is a template string!`;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function foo(e) {
-	return `\nthis is a template string!`;
+	return '\nthis is a template string!';
 }

```

## `terser/template_string/template_strings_without_ascii_only`


```js
var foo = `foo\n        bar\n        ↂωↂ`;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var foo = `foo\n        bar\n        ↂωↂ`;
+var foo = 'foo\n        bar\n        ↂωↂ';

```

## `terser/template_string/template_with_newline`


```js
function foo(e) {
	return `yep,\nthis is a template string!`;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function foo(e) {
-	return `yep,\nthis is a template string!`;
+	return 'yep,\nthis is a template string!';
 }

```

## `terser/transform/if_return`


```js
function f(w, x, y, z) {
	if (x) return;
	if (w) {
		if (y) return;
	} else if (z) return;
	if (x == y) return true;
	if (x) w();
	if (y) z();
	return true;
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 		if (w) {
 			if (y) return;
 		} else if (z) return;
-		return x == y || (x && w(), y && z()), !0;
+		return x == y || (x && w(), y && z(), !0);
 	}
 }

```

## `terser/try_catch/broken_safari_catch_scope`


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
+	f(x) {
 		try {
 			throw { m: 'PASS' };
-		} catch ({ m: A }) {
-			console.log(A);
+		} catch ({ m: s }) {
+			console.log(s);
 		}
 	}
 }().f();

```

## `terser/try_catch/broken_safari_catch_scope_caveat`


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
+	f(x) {
 		try {
 			throw { m: 'PASS' };
-		} catch ({ m: A }) {
-			console.log(A);
+		} catch ({ m: x }) {
+			console.log(x);
 		}
 	}
 }().f();

```

