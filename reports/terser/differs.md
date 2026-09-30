# terser / differs — Output differs at equal length

Fixtures: 72

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
 var a = 2;
-(function f(b) {
+function f(b) {
 	return b && f() || a--;
-})(1);
+}
+f(1);
 console.log(a);

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
+function f(n) {
 	return n ? n * f(n - 1) : 1;
-})(5));
+}
+console.log(f(5));

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
+var e = [1];
+console.log([...e]);
+console.log([...e, e]);
+console.log([...e || e]);
+console.log([...e || e]);

```

## `terser/harmony/import_statement_mangling`


```js
import Foo from 'foo';
import Bar, { Food } from 'lel';
import { What as Whatever } from 'lel';
Foo();
Bar();
Food();
Whatever();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-import o from 'foo';
-import m, { Food as r } from 'lel';
-import { What as f } from 'lel';
-o();
-m();
+import e from 'foo';
+import t, { Food as n } from 'lel';
+import { What as r } from 'lel';
+e();
+t();
+n();
 r();
-f();

```

## `terser/harmony/issue_1613`


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
+	return function n(e, t, r) {
+		return e + t + r;
 	};
 }

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

## `terser/issue_2001/export_mangle_1`


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

## `terser/issue_2001/export_mangle_2`


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

## `terser/issue_2001/export_mangle_5`


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

## `terser/keep_names/drop_classnames`


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
+var C = 1;
+console.log(C);
+console.log({ bar: function() {
+	return C + C;
+} }.bar());

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

## `terser/reduce_vars/escape_conditional`


```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('FAIL');
	else console.log('PASS');
}
function baz(s) {
	return s ? foo : bar;
}
function foo() {}
function bar() {}
main();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('PASS') : console.log('FAIL');
+}
 function baz(s) {
 	return s ? foo : bar;
 }
 function foo() {}
 function bar() {}
-(function() {
-	var thing = baz();
-	if (thing !== (thing = baz())) console.log('FAIL');
-	else console.log('PASS');
-})();
+main();

```

## `terser/reduce_vars/escape_throw`


```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('FAIL');
	else console.log('PASS');
}
function baz() {
	try {
		throw foo;
	} catch (bar) {
		return bar;
	}
}
function foo() {}
main();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('PASS') : console.log('FAIL');
+}
 function baz() {
 	try {
 		throw foo;
@@ -6,8 +10,4 @@
 	}
 }
 function foo() {}
-(function() {
-	var thing = baz();
-	if (thing !== (thing = baz())) console.log('FAIL');
-	else console.log('PASS');
-})();
+main();

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
+function f() {
+	return 'PASS';
+}
+function g() {
+	return f();
+}
 (function() {
 	var a = 'FAIL';
-	if (a == a) console.log(function() {
-		return function() {
-			return 'PASS';
-		}();
-	}());
+	a == a && console.log(g());
 })();

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

