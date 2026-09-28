# terser / larger — Output longer than expected (possible missing optimization)

Fixtures: 859

[← terser](README.md) · [← all families](../README.md)

## `terser/arguments/arguments_and_destructuring_2`

- size: oxc 86 vs reference 85 (+1 bytes)

```js
(function(a, { d }) {
	console.log(a = 'foo', arguments[0]);
})('baz', { d: 'Bar' });

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function(a, { d }) {
+(function(a, { d }) {
 	console.log(a = 'foo', arguments[0]);
-}('baz', { d: 'Bar' });
+})('baz', { d: 'Bar' });

```

## `terser/arguments/arguments_and_destructuring_3`

- size: oxc 88 vs reference 87 (+1 bytes)

```js
(function({ d }, a) {
	console.log(a = 'foo', arguments[0].d);
})({ d: 'Bar' }, 'baz');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function({ d }, a) {
+(function({ d }, a) {
 	console.log(a = 'foo', arguments[0].d);
-}({ d: 'Bar' }, 'baz');
+})({ d: 'Bar' }, 'baz');

```

## `terser/async/await_precedence`

- size: oxc 78 vs reference 77 (+1 bytes)

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

- size: oxc 38 vs reference 37 (+1 bytes)

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

- size: oxc 41 vs reference 40 (+1 bytes)

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

## `terser/collapse_vars/collapse_rhs_conditional_2`

- size: oxc 79 vs reference 78 (+1 bytes)

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

## `terser/collapse_vars/issue_1858`

- size: oxc 78 vs reference 77 (+1 bytes)

```js
console.log((function(x) {
	var a = {}, b = a.b = x;
	return a.b + b;
})(1));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log((function(x) {
-	var a = {}, b = a.b = 1;
+	var a = {}, b = a.b = x;
 	return a.b + b;
-})());
+})(1));

```

## `terser/collapse_vars/issue_2187_2`

- size: oxc 66 vs reference 65 (+1 bytes)

```js
var b = 1;
console.log((function(a) {
	return a && ++b;
})(b--));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var b = 1;
 console.log((function(a) {
-	return b-- && ++b;
-})());
+	return a && ++b;
+})(b--));

```

## `terser/collapse_vars/issue_2436_14`

- size: oxc 105 vs reference 104 (+1 bytes)

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

## `terser/collapse_vars/issue_2954_2`

- size: oxc 165 vs reference 164 (+1 bytes)

```js
var a = 'FAIL_1', b;
try {
	throw 0;
} catch (e) {
	do {
		b = (function() {
			throw new Error('PASS');
		})();
		a = 'FAIL_2';
		b && b.c;
	} while (0);
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,13 @@
-var b, a = 'FAIL_1';
+var a = 'FAIL_1', b;
 try {
 	throw 0;
-} catch (e) {
+} catch {
 	do {
-		a = 'FAIL_2';
-		(b = function() {
+		b = (function() {
 			throw Error('PASS');
-		}()) && b.c;
+		})();
+		a = 'FAIL_2';
+		b && b.c;
 	} while (0);
 }
 console.log(a);

```

## `terser/collapse_vars/switch_case_3`

- size: oxc 85 vs reference 84 (+1 bytes)

```js
var a = 1, b = 2;
switch (a) {
	case a:
		var b;
		break;
	case b: break;
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
-var b, a = 1, b = 2;
+var a = 1, b = 2;
 switch (a) {
-	case a: break;
-	case b: break;
+	case a:
+		var b;
+		break;
+	case b:
 }
 console.log(b);

```

## `terser/conditionals/cond_7`

- size: oxc 173 vs reference 172 (+1 bytes)

```js
var x, y, z, a, b;
if (y) {
	x = 1 + 1;
} else {
	x = 2;
}
if (y) {
	x = 1 + 1;
} else if (z) {
	x = 2;
} else {
	x = 3 - 1;
}
x = y ? 'foo' : 'fo' + 'o';
x = y ? 'foo' : y ? 'foo' : 'fo' + 'o';
if (condition()) {
	x = 10 + 10;
} else {
	x = 20;
}
if (z) {
	x = 'fuji';
} else if (condition()) {
	x = 'fu' + 'ji';
} else {
	x = 'fuji';
}
x = condition() ? 'foobar' : 'foo' + 'bar';
x = y ? a : b;
x = y ? 'foo' : 'fo';

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
-var x, y, z, a, b;
-x = 2;
+var x = 2, y, z, a, b;
 x = 2;
 x = 'foo';
 x = 'foo';
-condition(), x = 20;
-z || condition(), x = 'fuji';
+x = (condition(), 20);
+x = (z || condition(), 'fuji');
 x = (condition(), 'foobar');
 x = y ? a : b;
 x = y ? 'foo' : 'fo';

```

## `terser/destructuring/unused_destructuring_getter_side_effect_2`

- size: oxc 181 vs reference 180 (+1 bytes)

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

## `terser/drop_unused/issue_2660_2`

- size: oxc 80 vs reference 79 (+1 bytes)

```js
var a = 1;
function f(b) {
	b && f();
	--a, a.toString();
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = 1;
-(function f(b) {
-	b && f(), (--a).toString();
-})(), console.log(a);
+function f(b) {
+	b && f(), --a, a.toString();
+}
+f(), console.log(a);

```

## `terser/export/async_func`

- size: oxc 32 vs reference 31 (+1 bytes)

```js
export async function Foo(x) {}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export async function Foo() {}
+export async function Foo(x) {}

```

## `terser/export/issue_2131`

- size: oxc 71 vs reference 70 (+1 bytes)

```js
function no() {
	console.log(42);
}
function go() {
	console.log(42);
}
var X = 1, Y = 2;
export function main() {
	go(X);
}

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 	console.log(42);
 }
 export function main() {
-	go();
+	go(1);
 }

```

## `terser/export/issue_2134_1`

- size: oxc 46 vs reference 45 (+1 bytes)

```js
export function Foo(x) {}
Foo.prototype = {};

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export function Foo() {}
+export function Foo(x) {}
 Foo.prototype = {};

```

## `terser/export/issue_2134_2`

- size: oxc 52 vs reference 51 (+1 bytes)

```js
export async function Foo(x) {}
Foo.prototype = {};

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export async function Foo() {}
+export async function Foo(x) {}
 Foo.prototype = {};

```

## `terser/harmony/issue_2345`

- size: oxc 78 vs reference 77 (+1 bytes)

```js
console.log([...[
	3,
	2,
	1
]].join('-'));
var a = [
	3,
	2,
	1
];
console.log([...a].join('-'));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
-console.log('3-2-1');
-var a = [
+console.log([
 	3,
 	2,
 	1
-];
-console.log([...a].join('-'));
+].join('-'));
+console.log([
+	3,
+	2,
+	1
+].join('-'));

```

## `terser/hoist_props/hoist_function_with_call`

- size: oxc 133 vs reference 132 (+1 bytes)

```js
var o = {
	p: function Foo(value) {
		return 10 * value;
	},
	x: 1,
	y: 2
};
console.log(o.p.name, o.p === o.p, o.p(o.x), o.p(o.y));

```

```diff
--- reference
+++ oxc
@@ -5,4 +5,4 @@
 	x: 1,
 	y: 2
 };
-console.log(o.p.name, o.p == o.p, o.p(o.x), o.p(o.y));
+console.log(o.p.name, o.p === o.p, o.p(o.x), o.p(o.y));

```

## `terser/if_return/issue_1437`

- size: oxc 72 vs reference 71 (+1 bytes)

```js
function x() {
	if (a()) return b();
	if (c()) return d();
	else e();
	f();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 function x() {
-	return a() ? b() : (0, c()) ? d() : (e(), void f());
+	if (a()) return b();
+	if (c()) return d();
+	e(), f();
 }

```

## `terser/if_return/issue_1437_conditionals`

- size: oxc 72 vs reference 71 (+1 bytes)

```js
function x() {
	if (a()) return b();
	if (c()) return d();
	else e();
	f();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 function x() {
-	return a() ? b() : (0, c()) ? d() : (e(), void f());
+	if (a()) return b();
+	if (c()) return d();
+	e(), f();
 }

```

## `terser/issue_1466/different_variable_in_multiple_forIn`

- size: oxc 151 vs reference 150 (+1 bytes)

```js
var test = [
	'a',
	'b',
	'c'
];
for (let tmp in test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (let t in test) {
		console.log(t);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,13 +3,12 @@
 	'b',
 	'c'
 ];
-for (let e in test) {
-	console.log(e);
-	let t;
-	t = [
+for (let tmp in test) {
+	console.log(tmp);
+	let dd = [
 		'e',
 		'f',
 		'g'
 	];
-	for (let e in test) console.log(e);
+	for (let t in test) console.log(t);
 }

```

## `terser/issue_640/negate_iife_1`

- size: oxc 30 vs reference 29 (+1 bytes)

```js
(function() {
	stuff();
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
+(function() {
 	stuff();
-}();
+})();

```

## `terser/issue_913/keep_var_for_in`

- size: oxc 69 vs reference 68 (+1 bytes)

```js
(function(obj) {
	var foo = 5;
	for (var i in obj) return foo;
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function(obj) {
-	var i, foo = 5;
-	for (i in obj) return foo;
+	var foo = 5;
+	for (var i in obj) return foo;
 })();

```

## `terser/labels/labels_7`

- size: oxc 29 vs reference 28 (+1 bytes)

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

- size: oxc 37 vs reference 36 (+1 bytes)

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

## `terser/properties/issue_2816`

- size: oxc 87 vs reference 86 (+1 bytes)

```js
'use strict';
var o = { a: 1 };
o.b = 2;
o.a = 3;
o.c = 4;
console.log(o.a, o.b, o.c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,6 @@
 'use strict';
-var o = {
-	a: 1,
-	b: 2
-};
+var o = { a: 1 };
+o.b = 2;
 o.a = 3;
 o.c = 4;
 console.log(o.a, o.b, o.c);

```

## `terser/properties/join_object_assignments_undefined_2`

- size: oxc 51 vs reference 50 (+1 bytes)

```js
var o = {};
o[undefined] = 1;
console.log(o[undefined]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var o = { undefined: 1 };
+var o = {};
+o[void 0] = 1;
 console.log(o[void 0]);

```

## `terser/properties/join_object_assignments_void_0`

- size: oxc 51 vs reference 50 (+1 bytes)

```js
var o = {};
o[void 0] = 1;
console.log(o[void 0]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var o = { undefined: 1 };
+var o = {};
+o[void 0] = 1;
 console.log(o[void 0]);

```

## `terser/reduce_vars/boolean_binary_assign`

- size: oxc 45 vs reference 44 (+1 bytes)

```js
!(function() {
	var a;
	void 0 && (a = 1);
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function() {
+(function() {
 	var a;
 	console.log(a);
-}();
+})();

```

## `terser/reduce_vars/cond_assign`

- size: oxc 45 vs reference 44 (+1 bytes)

```js
!(function() {
	var a;
	void 0 ? a = 1 : 0;
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function() {
+(function() {
 	var a;
 	console.log(a);
-}();
+})();

```

## `terser/reduce_vars/redefine_farg_1`

- size: oxc 153 vs reference 152 (+1 bytes)

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
-function g() {
+function g(a) {
 	return 'number';
 }
 function h(a, b) {
-	a = b;
-	return typeof a;
+	return typeof b;
 }
 console.log(f([]), g([]), h([]));

```

## `terser/sequences/side_effects_cascade_1`

- size: oxc 58 vs reference 57 (+1 bytes)

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

## `terser/switch/issue_1698`

- size: oxc 53 vs reference 52 (+1 bytes)

```js
var a = 1;
!(function() {
	switch (a++) {}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 1;
-!function() {
+(function() {
 	a++;
-}();
+})();
 console.log(a);

```

## `terser/classes/class_duplication`

- size: oxc 65 vs reference 63 (+2 bytes)

```js
class Foo {
	foo() {
		leak(new Foo());
	}
}
export default Foo;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-export default (class Foo {
+class Foo {
 	foo() {
 		leak(new Foo());
 	}
-});
+}
+export default Foo;

```

## `terser/collapse_vars/issue_2187_3`

- size: oxc 66 vs reference 64 (+2 bytes)

```js
var b = 1;
console.log((function(a) {
	return a && ++b;
})(b--));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var b = 1;
-console.log(function(a) {
+console.log((function(a) {
 	return a && ++b;
-}(b--));
+})(b--));

```

## `terser/collapse_vars/may_throw_1`

- size: oxc 58 vs reference 56 (+2 bytes)

```js
function f() {
	var a_2 = (function() {
		var a;
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f() {
-	var a_2 = function() {
+	var a_2 = (function() {
 		var a;
-	}();
+	})();
 }

```

## `terser/collapse_vars/ref_scope`

- size: oxc 125 vs reference 123 (+2 bytes)

```js
console.log((function() {
	var a = 1, b = 2, c = 3;
	var a = c++, b = b /= a;
	return (function() {
		return a;
	})() + b;
})());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 console.log((function() {
-	var a = 1, b = 2, c = 3;
-	b = b /= a = c++;
+	var a = 1, b = 2, c = 3, a = c++, b = b /= a;
 	return (function() {
 		return a;
 	})() + b;

```

## `terser/dead_code/dead_code_const_declaration`

- size: oxc 50 vs reference 48 (+2 bytes)

```js
var unused;
const CONST_FOO = false;
if (CONST_FOO) {
	console.log('unreachable');
	var moo;
	function bar() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var unused;
 const CONST_FOO = !1;
-var moo, bar;
+if (0) var moo;

```

## `terser/destructuring/issue_t111_1`

- size: oxc 57 vs reference 55 (+2 bytes)

```js
var p = (x) => (console.log(x), x), unused = p(1), {} = p(2);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-var p = (x) => (console.log(x), x), {} = (p(1), p(2));
+var p = (x) => (console.log(x), x);
+p(1);
+var {} = p(2);

```

## `terser/destructuring/issue_t111_2a`

- size: oxc 69 vs reference 67 (+2 bytes)

```js
var p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), d = p(4);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-var p = (x) => (console.log(x), x), {} = (p(1), p(2));
-p(3), p(4);
+var p = (x) => (console.log(x), x);
+p(1);
+var {} = p(2);
+p(3);
+p(4);

```

## `terser/destructuring/issue_t111_2b`

- size: oxc 69 vs reference 67 (+2 bytes)

```js
let p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), d = p(4);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-let p = (x) => (console.log(x), x), {} = (p(1), p(2));
-p(3), p(4);
+let p = (x) => (console.log(x), x);
+p(1);
+let {} = p(2);
+p(3);
+p(4);

```

## `terser/drop_unused/issue_1830_2`

- size: oxc 78 vs reference 76 (+2 bytes)

```js
!(function() {
	L: for (var a = 1, b = console.log(a); --a;) continue L;
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-!(function() {
-	var a = 1;
-	L: for (console.log(a); --a;) continue L;
+(function() {
+	L: for (var a = 1, b = console.log(a); --a;) continue L;
 })();

```

## `terser/evaluate/positive_zero`

- size: oxc 36 vs reference 34 (+2 bytes)

```js
console.log(+'', +-'', 1 / +0, 1 / +'');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(0, -0, 1 / 0, 1 / 0);
+console.log(0, +-'', 1 / 0, 1 / 0);

```

## `terser/hoist_props/issue_3071_3`

- size: oxc 133 vs reference 131 (+2 bytes)

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

## `terser/inline/noinline_annotation_2`

- size: oxc 30 vs reference 28 (+2 bytes)

```js
/*#__NOINLINE__*/
(() => {
	external();
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-(() => {
-	external();
-})();
+/*#__NOINLINE__*/
+external();

```

## `terser/issue_1466/same_variable_in_multiple_forIn_sequences_const`

- size: oxc 155 vs reference 153 (+2 bytes)

```js
var test = [
	'a',
	'b',
	'c'
];
for (const tmp in test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (const tmp in test) {
		console.log(tmp);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,12 +3,12 @@
 	'b',
 	'c'
 ];
-for (const o in test) {
-	let t;
-	console.log(o), t = [
+for (let tmp in test) {
+	console.log(tmp);
+	let dd = [
 		'e',
 		'f',
 		'g'
 	];
-	for (const o in test) console.log(o);
+	for (let tmp in test) console.log(tmp);
 }

```

## `terser/issue_1833/iife_while`

- size: oxc 70 vs reference 68 (+2 bytes)

```js
function f() {
	function g() {
		L: while (1) break L;
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
-		L: while (1) break L;
-	})();
-})();
+function f() {
+	function g() {
+		L: for (;;) break L;
+	}
+	g();
+}
+f();

```

## `terser/issue_281/drop_fargs`

- size: oxc 74 vs reference 72 (+2 bytes)

```js
var a = 1;
!(function(a_1) {
	a++;
})(a++ + (a && a.var));
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 1;
-!function(a_1) {
+(function(a_1) {
 	a++;
-}((a++, a && a.var));
+})(a++ + (a && a.var));
 console.log(a);

```

## `terser/issue_281/keep_fargs`

- size: oxc 74 vs reference 72 (+2 bytes)

```js
var a = 1;
!(function(a_1) {
	a++;
})(a++ + (a && a.var));
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 1;
-!function(a_1) {
+(function(a_1) {
 	a++;
-}((a++, a && a.var));
+})(a++ + (a && a.var));
 console.log(a);

```

## `terser/keep_names/keep_some_classnames`

- size: oxc 54 vs reference 52 (+2 bytes)

```js
function foo() {
	class Bar {}
	class BarElement {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function foo() {
-	class s {}
+	class Bar {}
 	class BarElement {}
 }

```

## `terser/keep_names/keep_some_fnames`

- size: oxc 64 vs reference 62 (+2 bytes)

```js
function foo() {
	function bar() {}
	function barElement() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function foo() {
-	function n() {}
+	function bar() {}
 	function barElement() {}
 }

```

## `terser/logical_assignment/assignment_in_left_part_2`

- size: oxc 103 vs reference 101 (+2 bytes)

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

## `terser/loops/keep_collapse_const_in_own_block_scope_2`

- size: oxc 69 vs reference 67 (+2 bytes)

```js
const c = 5;
var i = 2;
while (i--) console.log(i);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 const c = 5;
-for (var i = 2; i--;) console.log(i);
-console.log(c);
+var i = 2;
+for (; i--;) console.log(i);
+console.log(5);

```

## `terser/numbers/comparisons`

- size: oxc 38 vs reference 36 (+2 bytes)

```js
console.log(~x === 42, x % n === 42);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(42 == ~x, x % n == 42);
+console.log(~x === 42, x % n === 42);

```

## `terser/object/convert_computed_props_to_regular_ones`

- size: oxc 184 vs reference 182 (+2 bytes)

```js
var o = {
	['hi']: 0,
	['A' + 1]: 1,
	[/B/]: 2,
	[100 + 23]: 3,
	[1 + .5]: 4,
	[Math.PI]: 5,
	[undefined]: 6,
	[true]: 7,
	[false]: 8,
	[null]: 9,
	[Infinity]: 10,
	[NaN]: 11
};
for (var k in o) {
	console.log(k, o[k]);
}

```

```diff
--- reference
+++ oxc
@@ -9,7 +9,7 @@
 	[!0]: 7,
 	[!1]: 8,
 	[null]: 9,
-	Infinity: 10,
+	[Infinity]: 10,
 	NaN: 11
 };
 for (var k in o) console.log(k, o[k]);

```

## `terser/properties/join_object_assignments_regex`

- size: oxc 47 vs reference 45 (+2 bytes)

```js
var o = {};
o[/rx/] = 1;
console.log(o[/rx/]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var o = { '/rx/': 1 };
+var o = {};
+o[/rx/] = 1;
 console.log(o[/rx/]);

```

## `terser/pure_getters/issue_2313_6`

- size: oxc 16 vs reference 14 (+2 bytes)

```js
x().y++;
x().y;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 x().y++;
-x();
+x().y;

```

## `terser/pure_getters/set_immutable_1`

- size: oxc 75 vs reference 73 (+2 bytes)

```js
var a = 1;
a.foo += '';
if (a.foo) console.log('FAIL');
else console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-1 .foo += '';
-if (1 .foo) console.log('FAIL');
-else console.log('PASS');
+var a = 1;
+a.foo += '';
+a.foo ? console.log('FAIL') : console.log('PASS');

```

## `terser/pure_getters/set_immutable_3`

- size: oxc 89 vs reference 87 (+2 bytes)

```js
'use strict';
var a = 1;
a.foo += '';
if (a.foo) console.log('FAIL');
else console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use strict';
-1 .foo += '';
-if (1 .foo) console.log('FAIL');
-else console.log('PASS');
+var a = 1;
+a.foo += '';
+a.foo ? console.log('FAIL') : console.log('PASS');

```

## `terser/reduce_vars/issue_1850_2`

- size: oxc 56 vs reference 54 (+2 bytes)

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
@@ -1,4 +1,5 @@
-var a = 1;
-(function() {
+function f() {
 	console.log(a, a, a);
-})();
+}
+var a = 1;
+f();

```

## `terser/reduce_vars/issue_2423_3`

- size: oxc 69 vs reference 67 (+2 bytes)

```js
function c() {
	return 1;
}
function p() {
	console.log(c());
}
p();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-(function() {
-	console.log((function() {
-		return 1;
-	})());
-})();
+function c() {
+	return 1;
+}
+function p() {
+	console.log(c());
+}
+p();

```

## `terser/reduce_vars/issue_2450_4`

- size: oxc 105 vs reference 103 (+2 bytes)

```js
var a;
function f(b) {
	console.log(a === b);
	a = b;
}
function g() {}
for (var i = 3; --i >= 0;) f(g);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var a;
-function g() {}
-for (var i = 3; --i >= 0;) (function(b) {
+function f(b) {
 	console.log(a === b);
 	a = b;
-})(g);
+}
+function g() {}
+for (var i = 3; --i >= 0;) f(g);

```

## `terser/reduce_vars/issue_2669`

- size: oxc 49 vs reference 47 (+2 bytes)

```js
let foo;
console.log(([foo] = ['PASS']) && foo);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 let foo;
-console.log(([foo] = ['PASS'], foo));
+console.log(([foo] = ['PASS']) && foo);

```

## `terser/reduce_vars/issue_2774`

- size: oxc 71 vs reference 69 (+2 bytes)

```js
console.log({ get a() {
	var b;
	(b = true) && b.c;
	b = void 0;
} }.a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log({ get a() {
 	var b;
-	b = true, b.c;
+	(b = !0) && b.c;
 	b = void 0;
 } }.a);

```

## `terser/reduce_vars/unused_modified`

- size: oxc 98 vs reference 96 (+2 bytes)

```js
console.log((function() {
	var b = 1, c = 'FAIL';
	if (0 || b--) c = 'PASS';
	b = 1;
	return c;
})());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(function() {
+console.log((function() {
 	var b = 1, c = 'FAIL';
-	if (b--) c = 'PASS';
+	b-- && (c = 'PASS');
 	b = 1;
 	return c;
-}());
+})());

```

## `terser/arrow/issue_27`

- size: oxc 65 vs reference 62 (+3 bytes)

```js
(function(jQuery) {
	var $;
	$ = jQuery;
	$('body').addClass('foo');
})(jQuery);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-((jQuery1) => {
-	jQuery1('body').addClass('foo');
+(function(jQuery) {
+	jQuery('body').addClass('foo');
 })(jQuery);

```

## `terser/collapse_vars/cascade_forin`

- size: oxc 102 vs reference 99 (+3 bytes)

```js
var a;
function f(b) {
	return [
		b,
		b,
		b
	];
}
for (var c in a = console, f(a)) console.log(c);

```

```diff
--- reference
+++ oxc
@@ -6,4 +6,4 @@
 		b
 	];
 }
-for (var c in f(a = console)) console.log(c);
+for (var c in a = console, f(a)) console.log(c);

```

## `terser/collapse_vars/issue_1631_2`

- size: oxc 124 vs reference 121 (+3 bytes)

```js
var a = 0, b = 1;
function f() {
	a = 2;
	return 4;
}
function g() {
	var t = f();
	b = a + t;
	return b;
}
console.log(g());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
+var a = 0, b = 1;
 function f() {
 	return a = 2, 4;
 }
 function g() {
 	var t = f();
-	return b = a + t;
+	return b = a + t, b;
 }
-var a = 0, b = 1;
 console.log(g());

```

## `terser/concat_strings/concat_1`

- size: oxc 208 vs reference 205 (+3 bytes)

```js
var a = 'foo' + 'bar' + x() + 'moo' + 'foo' + y() + 'x' + 'y' + 'z' + q();
var b = 'foo' + 1 + x() + 2 + 'boo';
var c = 1 + x() + 2 + 'boo';
var d = 1 + x() + 2 + 3 + 'boo';
var e = 1 + x() + 2 + 'X' + 3 + 'boo';
var f = '\0' + 360 + '\0' + 8 + '\0';

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 'foobar' + x() + 'moofoo' + y() + 'xyz' + q();
-var b = 'foo1' + x() + '2boo';
+var b = 'foo1' + x() + 2 + 'boo';
 var c = 1 + x() + 2 + 'boo';
 var d = 1 + x() + 2 + 3 + 'boo';
 var e = 1 + x() + 2 + 'X3boo';

```

## `terser/conditionals/issue_1645_1`

- size: oxc 85 vs reference 82 (+3 bytes)

```js
var a = 100, b = 10;
(b = a) ? a++ + (b += a) ? b += a : b += a : b ^= a;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 100, b = 10;
-(b = a) ? (a++, b += a, b += a) : b ^= a;
+(b = a) ? (a++ + (b += a), b += a) : b ^= a;
 console.log(a, b);

```

## `terser/dead_code/dead_code_2_should_warn`

- size: oxc 60 vs reference 57 (+3 bytes)

```js
function f() {
	g();
	x = 10;
	throw new Error('foo');
	if (x) {
		y();
		var x;
		function g() {}
		(function() {
			var q;
			function y() {}
		})();
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f() {
-	var g;
-	g();
+	x = 10;
 	throw Error('foo');
+	var x;
 }
 f();

```

## `terser/destructuring/issue_3205_1`

- size: oxc 105 vs reference 102 (+3 bytes)

```js
function f(a) {
	function g() {
		var { b, c } = a;
		console.log(b, c);
	}
	g();
}
f({
	b: 2,
	c: 3
});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f(a) {
-	(function() {
+	function g() {
 		var { b, c } = a;
 		console.log(b, c);
-	})();
+	}
+	g();
 }
 f({
 	b: 2,

```

## `terser/destructuring/mangle_destructuring_assign_toplevel_false`

- size: oxc 226 vs reference 223 (+3 bytes)

```js
function test(opts) {
	let s, o, r;
	let a = opts.a || {
		e: 7,
		n: 8
	};
	({t, e, n, s = 9, o, r} = a);
	console.log(t, e, n, s, o, r);
}
let t, e, n;
test({ a: {
	t: 1,
	e: 2,
	n: 3,
	s: 4,
	o: 5,
	r: 6
} });
test({});

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
-function test(o) {
-	let s, l, a;
-	let c = o.a || {
+function test(r) {
+	let i, a, o;
+	let s = r.a || {
 		e: 7,
 		n: 8
 	};
-	({t, e, n, s = 9, o: l, r: a} = c);
-	console.log(t, e, n, s, l, a);
+	({t, e, n, s: i = 9, o: a, r: o} = s);
+	console.log(t, e, n, i, a, o);
 }
 let t, e, n;
 test({ a: {

```

## `terser/export/issue_2129`

- size: oxc 35 vs reference 32 (+3 bytes)

```js
export const { keys } = Object;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export const { keys } = Object;
+export const { keys: e } = Object;

```

## `terser/global_defs/conditional_chains`

- size: oxc 21 vs reference 18 (+3 bytes)

```js
console.log(a?.b.c);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('d');
+console.log(a?.b.c);

```

## `terser/issue_1052/not_hoisted_when_already_nested`

- size: oxc 68 vs reference 65 (+3 bytes)

```js
(function() {
	if (!window) {
		return;
	}
	if (foo) function f() {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 (function() {
-	if (window) {
-		if (foo) function f() {}
-	}
+	if (!window) return;
+	if (foo) function f() {}
 })();

```

## `terser/issue_1673/side_effects_else`

- size: oxc 77 vs reference 74 (+3 bytes)

```js
function f(x) {
	function g() {
		if (x);
		else console.log('PASS');
	}
	g();
}
f(0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 function f(x) {
-	(function() {
+	function g() {
 		x || console.log('PASS');
-	})();
+	}
+	g();
 }
 f(0);

```

## `terser/issue_1673/side_effects_label`

- size: oxc 96 vs reference 93 (+3 bytes)

```js
function f(x) {
	function g() {
		L: {
			console.log('PASS');
			break L;
		}
	}
	g();
}
f(0);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 function f(x) {
-	(function() {
+	function g() {
 		L: {
 			console.log('PASS');
 			break L;
 		}
-	})();
+	}
+	g();
 }
 f(0);

```

## `terser/issue_1673/side_effects_switch`

- size: oxc 107 vs reference 104 (+3 bytes)

```js
function f() {
	function g() {
		switch (0) {
			default:
			case console.log('PASS'):
		}
	}
	g();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 function f() {
-	(function() {
+	function g() {
 		switch (0) {
 			default:
 			case console.log('PASS'):
 		}
-	})();
+	}
+	g();
 }
 f();

```

## `terser/issue_1833/iife_for`

- size: oxc 70 vs reference 67 (+3 bytes)

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

- size: oxc 78 vs reference 75 (+3 bytes)

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

## `terser/issue_751/negate_booleans_1`

- size: oxc 42 vs reference 39 (+3 bytes)

```js
var a = !a || !b || !c || !d || !e || !f;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var a = !(a && b && c && d && e && f);
+var a = !a || !b || !c || !d || !e || !f;

```

## `terser/object/concise_methods_and_mangle_props`

- size: oxc 53 vs reference 50 (+3 bytes)

```js
function x() {
	obj = { _foo() {
		return 1;
	} };
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function x() {
-	obj = { o() {
+	obj = { _foo() {
 		return 1;
 	} };
 }

```

## `terser/properties/join_object_assignments_forin`

- size: oxc 91 vs reference 88 (+3 bytes)

```js
console.log((function() {
	var o = {};
	for (var a in o.a = 'PASS', o) return o[a];
})());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log((function() {
-	var o = { a: 'PASS' };
-	for (var a in o) return o[a];
+	var o = {};
+	for (var a in o.a = 'PASS', o) return o[a];
 })());

```

## `terser/pure_funcs/conditional`

- size: oxc 96 vs reference 93 (+3 bytes)

```js
pure(1 | a() ? 2 & b() : 7 ^ c());
pure(1 | a() ? 2 & b() : 5);
pure(1 | a() ? 4 : 7 ^ c());
pure(1 | a() ? 4 : 5);
pure(3 ? 2 & b() : 7 ^ c());
pure(3 ? 2 & b() : 5);
pure(3 ? 4 : 7 ^ c());
pure(3 ? 4 : 5);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
-1 | a() ? b() : c();
-1 | a() && b();
-1 | a() || c();
-a();
-3 ? b() : c();
-3 && b();
-3 || c();
+1 | a() ? 2 & b() : 7 ^ c();
+1 | a() && 2 & b();
+1 | a() || 7 ^ c();
+1 | a();
+2 & b();
+2 & b();

```

## `terser/pure_getters/destructuring`

- size: oxc 285 vs reference 282 (+3 bytes)

```js
import declare from 'phantom';
const declared = declare();
const { a1, b1, c1 = 'c' } = declared;
const { a2, b2, c2 = 'c' } = undeclared;
const { a3, b3, c3 = 'c' } = window;
function fn({ a, b, c = 'c', d }) {
	console.log(d);
}
fn({
	a: 'a',
	get b() {
		console.log('side effect of b');
		return 'b';
	}
});

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 import declare from 'phantom';
-const declared = declare();
-const { c1 = 'c' } = declared;
-const { c2 = 'c' } = undeclared;
-const { c3 = 'c' } = window;
-function fn({ c = 'c', d }) {
+const { a1, b1, c1 = 'c' } = declare();
+const { a2, b2, c2 = 'c' } = undeclared;
+const { a3, b3, c3 = 'c' } = window;
+function fn({ a, b, c = 'c', d }) {
 	console.log(d);
 }
 fn({

```

## `terser/reduce_vars/defun_label`

- size: oxc 103 vs reference 100 (+3 bytes)

```js
!(function() {
	function f(a) {
		L: {
			if (a) break L;
			return 1;
		}
	}
	console.log(f(2));
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-!(function() {
-	console.log((function(a) {
+(function() {
+	function f(a) {
 		L: {
-			if (2) break L;
+			if (a) break L;
 			return 1;
 		}
-	})());
+	}
+	console.log(f(2));
 })();

```

## `terser/reduce_vars/immutable`

- size: oxc 37 vs reference 34 (+3 bytes)

```js
!(function() {
	var a = 'test';
	console.log(a.indexOf('e'));
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('test'.indexOf('e'));
+(function() {
+	console.log(1);
+})();

```

## `terser/reduce_vars/inner_var_for_2`

- size: oxc 83 vs reference 80 (+3 bytes)

```js
!(function() {
	var a = 1;
	for (var b = 1; --b;) var a = 2;
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!(function() {
+(function() {
 	var a = 1;
-	for (var b = 1; --b;) a = 2;
+	for (var b = 1; --b;) var a = 2;
 	console.log(a);
 })();

```

## `terser/reduce_vars/issue_3140_5`

- size: oxc 141 vs reference 138 (+3 bytes)

```js
var n = 1, c = 0;
(function(a) {
	var b = (function() {
		this;
		n-- && h();
	})();
	function h() {
		b && c++;
	}
	h(b = 1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 var n = 1, c = 0;
-(function() {
-	var b = function() {
+(function(a) {
+	var b = (function() {
 		n-- && h();
-	}();
+	})();
 	function h() {
 		b && c++;
 	}

```

## `terser/reduce_vars/perf_3`

- size: oxc 227 vs reference 224 (+3 bytes)

```js
var foo = function(x, y, z) {
	return x < y ? x * y + z : x * z - y;
};
var indirect_foo = function(x, y, z) {
	return foo(x, y, z);
};
var sum = 0;
for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
console.log(sum);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
-var indirect_foo = function(x, y, z) {
-	return (function(x, y, z) {
-		return x < y ? x * y + z : x * z - y;
-	})(x, y, z);
-};
-var sum = 0;
+var foo = function(x, y, z) {
+	return x < y ? x * y + z : x * z - y;
+}, indirect_foo = function(x, y, z) {
+	return foo(x, y, z);
+}, sum = 0;
 for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `terser/reduce_vars/pure_getters_2`

- size: oxc 21 vs reference 18 (+3 bytes)

```js
var a;
var a = a && a.b;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var a = a && a.b;
+var a, a = a && a.b;

```

## `terser/reduce_vars/recursive_inlining_3`

- size: oxc 227 vs reference 224 (+3 bytes)

```js
!(function() {
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
})();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,15 @@
-!function() {
-	(function qux(x) {
+(function() {
+	function foo(x) {
+		console.log('foo', x);
+		x && bar(x - 1);
+	}
+	function bar(x) {
+		console.log('bar', x);
+		x && qux(x - 1);
+	}
+	function qux(x) {
 		console.log('qux', x);
-		if (x) (function(x) {
-			console.log('foo', x);
-			if (x) (function(x) {
-				console.log('bar', x);
-				if (x) qux(x - 1);
-			})(x - 1);
-		})(x - 1);
-	})(4);
-}();
+		x && foo(x - 1);
+	}
+	qux(4);
+})();

```

## `terser/reduce_vars/side_effects_assign`

- size: oxc 52 vs reference 49 (+3 bytes)

```js
var a = typeof void (a && a.in == 1, 0);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = typeof void (a && a.in);
+var a = typeof void (a && a.in, 0);
 console.log(a);

```

## `terser/sequences/lift_sequences_5`

- size: oxc 47 vs reference 44 (+3 bytes)

```js
var a = 2, b;
a *= (b, a = 4, 3);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 2, b;
-console.log(a *= (a = 4, 3));
+a *= (a = 4, 3), console.log(a);

```

## `terser/sequences/lift_sequences_6`

- size: oxc 53 vs reference 50 (+3 bytes)

```js
var a = 2;
a &&= (leak(), a = 4, 3);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 2;
-console.log(a &&= (leak(), a = 4, 3));
+a &&= (leak(), a = 4, 3), console.log(a);

```

## `terser/arguments/replace_index_keep_fargs`

- size: oxc 420 vs reference 416 (+4 bytes)

```js
var arguments = [];
console.log(arguments[0]);
(function() {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(a, b) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(arguments) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function() {
	var arguments;
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 var arguments = [];
 console.log(arguments[0]);
-(function(argument_0, argument_1) {
-	console.log(argument_1, argument_1, arguments.foo);
+(function() {
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(a, b) {
-	console.log(b, b, arguments.foo);
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(arguments) {
 	console.log(arguments[1], arguments[1], arguments.foo);

```

## `terser/arguments/replace_index_keep_fargs_strict`

- size: oxc 190 vs reference 186 (+4 bytes)

```js
'use strict';
(function() {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(a, b) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'use strict';
-(function(argument_0, argument_1) {
-	console.log(argument_1, argument_1, arguments.foo);
+(function() {
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(a, b) {
-	console.log(b, b, arguments.foo);
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);

```

## `terser/classes/class_duplication_2`

- size: oxc 56 vs reference 52 (+4 bytes)

```js
class Foo {
	foo() {
		leak(new Foo());
	}
}
leak(Foo);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-leak(class Foo {
+class Foo {
 	foo() {
 		leak(new Foo());
 	}
-});
+}
+leak(Foo);

```

## `terser/collapse_vars/cascade_conditional`

- size: oxc 59 vs reference 55 (+4 bytes)

```js
function f(a, b) {
	(a = x(), a) ? a++ : (b = y(a), b(a));
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f(a, b) {
-	(a = x()) ? a++ : (b = y(a))(a);
+	a = x(), a ? a++ : (b = y(a), b(a));
 }

```

## `terser/collapse_vars/issue_1631_1`

- size: oxc 123 vs reference 119 (+4 bytes)

```js
var pc = 0;
function f(x) {
	pc = 200;
	return 100;
}
function x() {
	var t = f();
	pc += t;
	return pc;
}
console.log(x());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
+var pc = 0;
 function f(x) {
 	return pc = 200, 100;
 }
 function x() {
 	var t = f();
-	return pc += t;
+	return pc += t, pc;
 }
-var pc = 0;
 console.log(x());

```

## `terser/collapse_vars/reduce_vars_assign`

- size: oxc 56 vs reference 52 (+4 bytes)

```js
!(function() {
	var a = 1;
	a = [].length, console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function() {
+(function() {
 	var a = 1;
-	console.log(a = 0);
-}();
+	a = 0, console.log(a);
+})();

```

## `terser/destructuring/issue_t111_2c`

- size: oxc 73 vs reference 69 (+4 bytes)

```js
const p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), d = p(4);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-const p = (x) => (console.log(x), x), {} = (p(1), p(2));
-p(3), p(4);
+const p = (x) => (console.log(x), x);
+p(1);
+const {} = p(2);
+p(3);
+p(4);

```

## `terser/destructuring/issue_t111_3`

- size: oxc 78 vs reference 74 (+4 bytes)

```js
let p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), {} = p(4);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-let p = (x) => (console.log(x), x), {} = (p(1), p(2)), {} = (p(3), p(4));
+let p = (x) => (console.log(x), x);
+p(1);
+let {} = p(2);
+p(3);
+let {} = p(4);

```

## `terser/destructuring/unused_destructuring_declaration_complex_1`

- size: oxc 79 vs reference 75 (+4 bytes)

```js
const [, w, , x, { y, z }] = [
	1,
	2,
	3,
	4,
	{ z: 5 }
];
console.log(x, z);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-const [, , , x, { z }] = [
+const [, w, , x, { y, z }] = [
 	1,
 	2,
 	3,

```

## `terser/drop_unused/double_assign_2`

- size: oxc 71 vs reference 67 (+4 bytes)

```js
for (var i = 0; i < 2; i++) a = void 0, a = {}, console.log(a);
var a;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-for (var i = 0; i < 2; i++) void 0, a = {}, console.log(a);
+for (var i = 0; i < 2; i++) a = void 0, a = {}, console.log(a);
 var a;

```

## `terser/drop_unused/issue_2136_1`

- size: oxc 44 vs reference 40 (+4 bytes)

```js
!(function(a, ...b) {
	console.log(b);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function(...b) {
+(function(a, ...b) {
 	console.log(b);
-}();
+})();

```

## `terser/drop_unused/issue_3192`

- size: oxc 145 vs reference 141 (+4 bytes)

```js
(function(a) {
	console.log(a = 'foo', arguments[0]);
})('bar');
(function(a) {
	'use strict';
	console.log(a = 'foo', arguments[0]);
})('bar');

```

```diff
--- reference
+++ oxc
@@ -3,5 +3,5 @@
 })('bar');
 (function(a) {
 	'use strict';
-	console.log('foo', arguments[0]);
+	console.log(a = 'foo', arguments[0]);
 })('bar');

```

## `terser/drop_unused/issue_t161_top_retain_1`

- size: oxc 79 vs reference 75 (+4 bytes)

```js
function f() {
	return 2;
}
function g() {
	return 3;
}
console.log(f(), g());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 function f() {
 	return 2;
 }
-console.log(f(), function() {
+function g() {
 	return 3;
-}());
+}
+console.log(f(), g());

```

## `terser/harmony/array_literal_with_spread_4a`

- size: oxc 423 vs reference 419 (+4 bytes)

```js
function t(x) {
	console.log('(' + x + ')');
	return 10 * x;
}
console.log([t(1), t(2)][0]);
console.log([t(1), t(2)][1]);
console.log([t(1), t(2)][2]);
console.log([
	...[],
	t(1),
	t(2)
][0]);
console.log([
	...[],
	t(1),
	t(2)
][1]);
console.log([
	...[],
	t(1),
	t(2)
][2]);
console.log([
	t(1),
	...[],
	t(2)
][0]);
console.log([
	t(1),
	...[],
	t(2)
][1]);
console.log([
	t(1),
	...[],
	t(2)
][2]);
console.log([
	t(1),
	t(2),
	...[]
][0]);
console.log([
	t(1),
	t(2),
	...[]
][1]);
console.log([
	t(1),
	t(2),
	...[]
][2]);

```

```diff
--- reference
+++ oxc
@@ -3,14 +3,14 @@
 	return 10 * x;
 }
 console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
-console.log((t(1), void t(2)));
+console.log([t(1), t(2)][1]);
+console.log([t(1), t(2)][2]);
 console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
-console.log((t(1), void t(2)));
+console.log([t(1), t(2)][1]);
+console.log([t(1), t(2)][2]);
 console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
-console.log((t(1), void t(2)));
+console.log([t(1), t(2)][1]);
+console.log([t(1), t(2)][2]);
 console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
-console.log((t(1), void t(2)));
+console.log([t(1), t(2)][1]);
+console.log([t(1), t(2)][2]);

```

## `terser/harmony/regression_cannot_use_of`

- size: oxc 93 vs reference 89 (+4 bytes)

```js
function of() {}
var of = 'is a valid variable name';
of = { of: 'is ok' };
x.of;
of: foo();

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 var of = 'is a valid variable name';
 of = { of: 'is ok' };
 x.of;
-foo();
+of: foo();

```

## `terser/hoist_vars/issue_2295`

- size: oxc 64 vs reference 60 (+4 bytes)

```js
function foo(o) {
	var a = o.a;
	if (a) return a;
	var a = 1;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function foo(o) {
 	var a = o.a;
 	if (a) return a;
-	a = 1;
+	var a = 1;
 }

```

## `terser/hoist_vars/regression_toplevel_args`

- size: oxc 18 vs reference 14 (+4 bytes)

```js
var Foo;
var Bar;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-var Foo, Bar;
+var Foo;
+var Bar;

```

## `terser/join_vars/issue_1079_with_vars`

- size: oxc 84 vs reference 80 (+4 bytes)

```js
var netmaskBinary = '';
for (var i = 0; i < netmaskBits; ++i) {
	netmaskBinary += '1';
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-for (var netmaskBinary = '', i = 0; i < netmaskBits; ++i) netmaskBinary += '1';
+var netmaskBinary = '';
+for (var i = 0; i < netmaskBits; ++i) netmaskBinary += '1';

```

## `terser/loops/issue_2740_3`

- size: oxc 93 vs reference 89 (+4 bytes)

```js
L1: for (var x = 0; x < 3; x++) {
	L2: for (var y = 0; y < 2; y++) {
		break L1;
	}
}
console.log(x, y);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-L1: for (var x = 0; x < 3; x++) for (var y = 0; y < 2; y++) break L1;
+L1: for (var x = 0; x < 3; x++) L2: for (var y = 0; y < 2; y++) break L1;
 console.log(x, y);

```

## `terser/numbers/evaluate_4`

- size: oxc 81 vs reference 77 (+4 bytes)

```js
console.log(1 + +a, +a + 1, 1 + -a, -a + 1, +a + +b, +a + -b, -a + +b, -a + -b);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(+a + 1, +a + 1, 1 - a, 1 - a, +a + +b, +a - b, -a + +b, -a - b);
+console.log(1 + +a, +a + 1, 1 + -a, -a + 1, +a + +b, +a + -b, -a + +b, -a + -b);

```

## `terser/properties/sub_properties`

- size: oxc 116 vs reference 112 (+4 bytes)

```js
a[0] = 0;
a['0'] = 1;
a[3.14] = 2;
a['3' + '.14'] = 3;
a['i' + 'f'] = 4;
a['foo' + ' bar'] = 5;
a[0 / 0] = 6;
a[null] = 7;
a[undefined] = 8;

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 a[0] = 0;
 a[0] = 1;
 a[3.14] = 2;
-a[3.14] = 3;
+a['3.14'] = 3;
 a.if = 4;
 a['foo bar'] = 5;
-a.NaN = 6;
-a.null = 7;
+a[NaN] = 6;
+a[null] = 7;
 a[void 0] = 8;

```

## `terser/pure_funcs/assign`

- size: oxc 72 vs reference 68 (+4 bytes)

```js
var a;
function f(b) {
	a = foo();
	b *= 4 + foo();
	c >>= 0 | foo();
}

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 function f(b) {
 	a = foo();
 	b *= 4 + foo();
-	c >>= foo();
+	c >>= 0 | foo();
 }

```

## `terser/pure_getters/set_mutable_2`

- size: oxc 87 vs reference 83 (+4 bytes)

```js
!(function a() {
	a.foo += '';
	if (a.foo) console.log('PASS');
	else console.log('FAIL');
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function a() {
-	(a.foo += '') ? console.log('PASS') : console.log('FAIL');
+(function a() {
+	a.foo += '', a.foo ? console.log('PASS') : console.log('FAIL');
 })();

```

## `terser/reduce_vars/duplicate_lambda_defun_name_1`

- size: oxc 69 vs reference 65 (+4 bytes)

```js
console.log((function f(a) {
	function f() {}
	return f.length;
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log(function f() {
-	return (function() {}).length;
-}());
+console.log((function(a) {
+	function f() {}
+	return f.length;
+})());

```

## `terser/reduce_vars/escape_expansion`

- size: oxc 212 vs reference 208 (+4 bytes)

```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('FAIL');
	else console.log('PASS');
}
function foo() {}
function bar(...x) {
	return x[0];
}
function baz() {
	return bar(...[foo]);
}
main();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,12 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('PASS') : console.log('FAIL');
+}
 function foo() {}
+function bar(...x) {
+	return x[0];
+}
 function baz() {
-	return (function(...x) {
-		return x[0];
-	})(foo);
+	return bar(foo);
 }
-(function() {
-	var thing = baz();
-	if (thing !== (thing = baz())) console.log('FAIL');
-	else console.log('PASS');
-})();
+main();

```

## `terser/reduce_vars/var_assign_6`

- size: oxc 63 vs reference 59 (+4 bytes)

```js
!(function() {
	var a = (function() {})(a = 1);
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function() {
-	var a = void (a = 1);
+(function() {
+	var a = (a = 1, void 0);
 	console.log(a);
-}();
+})();

```

## `terser/transform/booleans_global_defs`

- size: oxc 21 vs reference 17 (+4 bytes)

```js
console.log(A == 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(!0);
+console.log(A == 1);

```

## `terser/class_properties/class_expression_constant`

- size: oxc 126 vs reference 121 (+5 bytes)

```js
const obj = {};
obj.Class1 = class {
	static foo = 'constant';
};
obj.Class2 = class extends Obj.Class1 {};
new obj.Class2();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-const obj = { Class1: class {
+const obj = {};
+obj.Class1 = class {
 	static foo = 'constant';
-} };
+};
 obj.Class2 = class extends Obj.Class1 {};
 new obj.Class2();

```

## `terser/functions/unsafe_call_expansion_1`

- size: oxc 68 vs reference 63 (+5 bytes)

```js
(function(...a) {
	console.log(...a);
}).call(console, 1, ...[2, 3], 4);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console, (function(...a) {
+(function(...a) {
 	console.log(...a);
-})(1, 2, 3, 4);
+}).call(console, 1, 2, 3, 4);

```

## `terser/harmony/array_literal_with_spread_3b`

- size: oxc 465 vs reference 460 (+5 bytes)

```js
var nothing = [];
console.log([10, 20][0]);
console.log([10, 20][1]);
console.log([10, 20][2]);
console.log([
	...nothing,
	10,
	20
][0]);
console.log([
	...nothing,
	10,
	20
][1]);
console.log([
	...nothing,
	10,
	20
][2]);
console.log([
	10,
	...nothing,
	20
][0]);
console.log([
	10,
	...nothing,
	20
][1]);
console.log([
	10,
	...nothing,
	20
][2]);
console.log([
	10,
	20,
	...nothing
][0]);
console.log([
	10,
	20,
	...nothing
][1]);
console.log([
	10,
	20,
	...nothing
][2]);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var nothing = [];
 console.log(10);
 console.log(20);
-console.log(void 0);
+console.log([10, 20][2]);
 console.log([
 	...nothing,
 	10,

```

## `terser/harmony/classes`

- size: oxc 192 vs reference 187 (+5 bytes)

```js
class SomeClass {
	constructor() {}
	foo() {}
}
class NoSemi {
	constructor(...args) {}
	foo() {}
}
class ChildClass extends SomeClass {}
var asExpression = class AsExpression {};
var nameless = class {};

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 class SomeClass {
+	constructor() {}
 	foo() {}
 }
 class NoSemi {
@@ -6,5 +7,5 @@
 	foo() {}
 }
 class ChildClass extends SomeClass {}
-var asExpression = class AsExpression {};
+var asExpression = class {};
 var nameless = class {};

```

## `terser/hoist_props/issue_2508_5`

- size: oxc 59 vs reference 54 (+5 bytes)

```js
var o = { f: function(x) {
	console.log(x);
} };
o.f(o.f);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var o_f = function(x) {
+var o = { f: function(x) {
 	console.log(x);
-};
-o_f(o_f);
+} };
+o.f(o.f);

```

## `terser/hoist_props/issue_2508_6`

- size: oxc 54 vs reference 49 (+5 bytes)

```js
var o = { f: (x) => {
	console.log(x);
} };
o.f(o.f);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var o_f = (x) => {
+var o = { f: (x) => {
 	console.log(x);
-};
-o_f(o_f);
+} };
+o.f(o.f);

```

## `terser/issue_1466/same_variable_in_multiple_forIn`

- size: oxc 155 vs reference 150 (+5 bytes)

```js
var test = [
	'a',
	'b',
	'c'
];
for (let tmp in test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (let tmp in test) {
		console.log(tmp);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,13 +3,12 @@
 	'b',
 	'c'
 ];
-for (let e in test) {
-	console.log(e);
-	let t;
-	t = [
+for (let tmp in test) {
+	console.log(tmp);
+	let dd = [
 		'e',
 		'f',
 		'g'
 	];
-	for (let e in test) console.log(e);
+	for (let tmp in test) console.log(tmp);
 }

```

## `terser/issue_203/compress_new_function`

- size: oxc 34 vs reference 29 (+5 bytes)

```js
new Function('aa, bb', 'return aa;');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-Function('n,r', 'return n');
+Function('aa, bb', 'return aa;');

```

## `terser/object/prop_arrow_to_concise_method`

- size: oxc 50 vs reference 45 (+5 bytes)

```js
({ run: () => {
	console.log('PASS');
} }).run();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-({ run() {
+({ run: () => {
 	console.log('PASS');
 } }).run();

```

## `terser/properties/issue_t64`

- size: oxc 192 vs reference 187 (+5 bytes)

```js
var obj = {};
obj.Base = class {
	constructor() {
		this.id = 'PASS';
	}
};
obj.Derived = class extends obj.Base {
	constructor() {
		super();
		console.log(this.id);
	}
};
new obj.Derived();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-var obj = { Base: class {
+var obj = {};
+obj.Base = class {
 	constructor() {
 		this.id = 'PASS';
 	}
-} };
+};
 obj.Derived = class extends obj.Base {
 	constructor() {
 		super();

```

## `terser/properties/join_object_assignments_null_1`

- size: oxc 47 vs reference 42 (+5 bytes)

```js
var o = {};
o[null] = 1;
console.log(o[null]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var o = { null: 1 };
-console.log(o.null);
+var o = {};
+o[null] = 1;
+console.log(o[null]);

```

## `terser/pure_getters/issue_2110_1`

- size: oxc 117 vs reference 112 (+5 bytes)

```js
function f() {
	function f() {}
	function g() {
		return this;
	}
	f.g = g;
	return f.g();
}
console.log(typeof f());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 function f() {
 	function f() {}
-	return f.g = function() {
+	function g() {
 		return this;
-	}, f.g();
+	}
+	return f.g = g, f.g();
 }
 console.log(typeof f());

```

## `terser/pure_getters/issue_2110_2`

- size: oxc 118 vs reference 113 (+5 bytes)

```js
function f() {
	function f() {}
	function g() {
		return this;
	}
	f.g = g;
	return f.g();
}
console.log(typeof f());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f() {
 	function f() {}
-	f.g = function() {
+	function g() {
 		return this;
-	};
+	}
+	f.g = g;
 	return f.g();
 }
 console.log(typeof f());

```

## `terser/reduce_vars/iife_func_side_effects`

- size: oxc 231 vs reference 226 (+5 bytes)

```js
function x() {
	console.log('x');
}
function y() {
	console.log('y');
}
function z() {
	console.log('z');
}
(function(a, b, c) {
	function y() {
		console.log('FAIL');
	}
	return y + b();
})(x(), function() {
	return y();
}, z());

```

```diff
--- reference
+++ oxc
@@ -8,9 +8,10 @@
 	console.log('z');
 }
 (function(a, b, c) {
-	return function() {
+	function y() {
 		console.log('FAIL');
-	} + b();
+	}
+	return y + b();
 })(x(), function() {
 	return y();
 }, z());

```

## `terser/reduce_vars/issue_2450_2`

- size: oxc 71 vs reference 66 (+5 bytes)

```js
function g() {
	function f() {}
	return f;
}
console.log(g() === g());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function g() {
-	return function() {};
+	function f() {}
+	return f;
 }
 console.log(g() === g());

```

## `terser/reduce_vars/issue_3113_5`

- size: oxc 87 vs reference 82 (+5 bytes)

```js
function f() {
	console.log(a);
}
function g() {
	f();
}
while (g());
var a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f() {
 	console.log(a);
 }
-while (function() {
+function g() {
 	f();
-}());
+}
+for (; g(););
 var a = 1;
 f();

```

## `terser/arrow/async_function_expression`

- size: oxc 105 vs reference 99 (+6 bytes)

```js
var named = async function foo() {
	await bar(1 + 0) + (2 + 0);
};
var anon = async function() {
	await (1 + 0) + bar(2 + 0);
};

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var named = async function foo() {
-	await bar(1);
+var named = async function() {
+	await bar(1) + 2;
 };
-var anon = async () => {
-	await 1, bar(2);
+var anon = async function() {
+	await 1 + bar(2);
 };

```

## `terser/block_scope/do_not_hoist_let`

- size: oxc 80 vs reference 74 (+6 bytes)

```js
function x() {
	if (FOO) {
		let let1;
		let let2;
		var var1;
		var var2;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 function x() {
 	if (FOO) {
-		var var1, var2;
 		let let1;
 		let let2;
+		var var1;
+		var var2;
 	}
 }

```

## `terser/destructuring/export_function_containing_destructuring_decl`

- size: oxc 79 vs reference 73 (+6 bytes)

```js
export function f() {
	let [{ x, y, z }] = [{
		x: 1,
		y: 2
	}];
	return x;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 export function f() {
-	let [{ x }] = [{
+	let [{ x, y, z }] = [{
 		x: 1,
 		y: 2
 	}];

```

## `terser/destructuring/mangle_destructuring_assign_toplevel_true`

- size: oxc 232 vs reference 226 (+6 bytes)

```js
function test(opts) {
	let s, o, r;
	let a = opts.a || {
		e: 7,
		n: 8
	};
	({t, e, n, s = 5 + 4, o, r} = a);
	console.log(t, e, n, s, o, r);
}
let t, e, n;
test({ a: {
	t: 1,
	e: 2,
	n: 3,
	s: 4,
	o: 5,
	r: 6
} });
test({});

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
-function e(e) {
-	let l, s, a;
-	let c = e.a || {
+function test(r) {
+	let i, a, o;
+	let s = r.a || {
 		e: 7,
 		n: 8
 	};
-	({t: n, e: o, n: t, s: l = 9, o: s, r: a} = c);
-	console.log(n, o, t, l, s, a);
+	({t: e, e: t, n, s: i = 9, o: a, r: o} = s);
+	console.log(e, t, n, i, a, o);
 }
-let n, o, t;
-e({ a: {
+let e, t, n;
+test({ a: {
 	t: 1,
 	e: 2,
 	n: 3,
@@ -16,4 +16,4 @@
 	o: 5,
 	r: 6
 } });
-e({});
+test({});

```

## `terser/destructuring/unused_destructuring_class_method_param`

- size: oxc 119 vs reference 113 (+6 bytes)

```js
new class {
	baz({ w = console.log('side effect'), x, y: z }) {
		console.log(x);
	}
}().baz({
	x: 7,
	y: 8,
	z: 9
});

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 new class {
-	baz({ w = console.log('side effect'), x }) {
+	baz({ w = console.log('side effect'), x, y: z }) {
 		console.log(x);
 	}
 }().baz({

```

## `terser/destructuring/unused_destructuring_function_param`

- size: oxc 109 vs reference 103 (+6 bytes)

```js
function foo({ w = console.log('side effect'), x, y: z }) {
	console.log(x);
}
foo({
	x: 1,
	y: 2,
	z: 3
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function foo({ w = console.log('side effect'), x }) {
+function foo({ w = console.log('side effect'), x, y: z }) {
 	console.log(x);
 }
 foo({

```

## `terser/destructuring/unused_destructuring_multipass`

- size: oxc 62 vs reference 56 (+6 bytes)

```js
let { w, x: y, z } = {
	x: 1,
	y: 2,
	z: 3
};
console.log(y);
if (0) {
	console.log(z);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-let { x: y } = {
+let { w, x: y, z } = {
 	x: 1,
 	y: 2,
 	z: 3

```

## `terser/destructuring/unused_destructuring_object_method_param`

- size: oxc 106 vs reference 100 (+6 bytes)

```js
({ baz({ w = console.log('side effect'), x, y: z }) {
	console.log(x);
} }).baz({
	x: 7,
	y: 8,
	z: 9
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-({ baz({ w = console.log('side effect'), x }) {
+({ baz({ w = console.log('side effect'), x, y: z }) {
 	console.log(x);
 } }).baz({
 	x: 7,

```

## `terser/drop_unused/issue_2226_2`

- size: oxc 60 vs reference 54 (+6 bytes)

```js
console.log((function(a, b) {
	a += b;
	return a;
})(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log((function(a, b) {
-	return a += 2;
-})(1));
+	return a += b, a;
+})(1, 2));

```

## `terser/drop_unused/issue_2846`

- size: oxc 87 vs reference 81 (+6 bytes)

```js
function f(a, b) {
	var a = 0;
	b && b(a);
	return a++;
}
var c = f();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-var c = (function(a, b) {
-	a = 0;
+function f(a, b) {
+	var a = 0;
 	b && b(a);
 	return a++;
-})();
+}
+var c = f();
 console.log(c);

```

## `terser/evaluate/issue_2916_1`

- size: oxc 123 vs reference 117 (+6 bytes)

```js
var c = 'PASS';
(function(a, b) {
	(function(d) {
		d[0] = 1;
	})(b);
	a == b && (c = 'FAIL');
})('', []);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 var c = 'PASS';
-(function(b) {
+(function(a, b) {
 	(function(d) {
 		d[0] = 1;
 	})(b);
-	'' == b && (c = 'FAIL');
-})([]);
+	a == b && (c = 'FAIL');
+})('', []);
 console.log(c);

```

## `terser/evaluate/unsafe_charAt_noop`

- size: oxc 67 vs reference 61 (+6 bytes)

```js
console.log(s.charAt(0), 'string'.charAt(x), (typeof x).charAt());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(s.charAt(0), 'string'.charAt(x), (typeof x)[0]);
+console.log(s.charAt(0), 'string'.charAt(x), (typeof x).charAt());

```

## `terser/functions/issue_2476`

- size: oxc 150 vs reference 144 (+6 bytes)

```js
function foo(x, y, z) {
	return x < y ? x * y + z : x * z - y;
}
for (var sum = 0, i = 0; i < 10; i++) sum += foo(i, i + 1, 3 * i);
console.log(sum);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-for (var sum = 0, i = 0; i < 10; i++) {
-	var x, y, z;
-	sum += (x = i, y = i + 1, z = 3 * i, x < y ? x * y + z : x * z - y);
+function foo(x, y, z) {
+	return x < y ? x * y + z : x * z - y;
 }
+for (var sum = 0, i = 0; i < 10; i++) sum += foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `terser/functions/unsafe_call_3`

- size: oxc 88 vs reference 82 (+6 bytes)

```js
console.log(function() {
	return arguments[0] + eval('arguments')[1];
}.call(0, 1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log((function() {
+console.log(function() {
 	return arguments[0] + eval('arguments')[1];
-})(1, 2));
+}.call(0, 1, 2));

```

## `terser/issue_1466/same_variable_in_multiple_forIn_sequences_let`

- size: oxc 155 vs reference 149 (+6 bytes)

```js
var test = [
	'a',
	'b',
	'c'
];
for (let tmp in test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (let tmp in test) {
		console.log(tmp);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,12 +3,12 @@
 	'b',
 	'c'
 ];
-for (let e in test) {
-	let t;
-	console.log(e), t = [
+for (let tmp in test) {
+	console.log(tmp);
+	let dd = [
 		'e',
 		'f',
 		'g'
 	];
-	for (let e in test) console.log(e);
+	for (let tmp in test) console.log(tmp);
 }

```

## `terser/issue_976/eval_mangle`

- size: oxc 168 vs reference 162 (+6 bytes)

```js
function f1(a, eval, c, d, e) {
	return a('c') + eval;
}
function f2(a, b, c, d, e) {
	return a + eval('c');
}
function f3(a, eval, c, d, e) {
	return a + eval('c');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f1(n, c, e, a, f) {
-	return n('c') + c;
+function f1(a, eval, c, d, e) {
+	return a('c') + eval;
 }
 function f2(a, b, c, d, e) {
 	return a + eval('c');

```

## `terser/numbers/evaluate_1`

- size: oxc 192 vs reference 186 (+6 bytes)

```js
console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, 1 | x | 2 | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), 1 + (2 + ~x + 3), -y + (2 + ~x + 3), 1 & (2 & x & 3), 1 + (2 + (x |= 0) + 3));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(x + 1 + 2, 1 * x * 2, +x + 1 + 2, 1 + x + 2 + 3, 3 | x, 1 + x-- + 2 + 3, x * y + 2 + 1 + 3, 1 + (2 + x + 3), 2 + ~x + 3 + 1, -y + (2 + ~x + 3), 0 & x, 2 + (x |= 0) + 3 + 1);
+console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, x | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), 1 + (2 + ~x + 3), -y + (2 + ~x + 3), x & 0, 1 + (2 + (x |= 0) + 3));

```

## `terser/properties/issue_2513`

- size: oxc 168 vs reference 162 (+6 bytes)

```js
!(function(Infinity, NaN, undefined) {
	console.log('a'[1 / 0], 'b'['Infinity']);
	console.log('c'[0 / 0], 'd'['NaN']);
	console.log('e'[void 0], 'f'['undefined']);
})(0, 0, 0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!(function(Infinity, NaN, undefined) {
-	console.log('a'[1 / 0], 'b'[1 / 0]);
-	console.log('c'.NaN, 'd'.NaN);
-	console.log('e'[void 0], 'f'[void 0]);
+(function(Infinity, NaN, undefined) {
+	console.log('a'[1 / 0], 'b'.Infinity);
+	console.log('c'[0 / 0], 'd'.NaN);
+	console.log('e'[void 0], 'f'.undefined);
 })(0, 0, 0);

```

## `terser/properties/join_object_assignments_1`

- size: oxc 173 vs reference 167 (+6 bytes)

```js
console.log((function() {
	var x = {
		a: 1,
		c: (console.log('c'), 'C')
	};
	x.b = 2;
	x[3] = function() {
		console.log(x);
	}, x['a'] = /foo/, x.bar = x;
	return x;
})());

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,11 @@
 console.log((function() {
 	var x = {
-		a: (1, /foo/),
-		c: (console.log('c'), 'C'),
-		b: 2,
-		3: function() {
-			console.log(x);
-		}
+		a: 1,
+		c: (console.log('c'), 'C')
 	};
-	x.bar = x;
+	x.b = 2;
+	x[3] = function() {
+		console.log(x);
+	}, x.a = /foo/, x.bar = x;
 	return x;
 })());

```

## `terser/pure_getters/collapse_vars_2_true`

- size: oxc 79 vs reference 73 (+6 bytes)

```js
function f() {
	function g() {}
	g.a = function() {};
	g.b = g.a;
	return g;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f() {
 	function g() {}
-	g.b = g.a = function() {};
+	g.a = function() {};
+	g.b = g.a;
 	return g;
 }

```

## `terser/reduce_vars/delay_def`

- size: oxc 95 vs reference 89 (+6 bytes)

```js
function f() {
	return a;
	var a;
}
function g() {
	return a;
	var a = 1;
}
console.log(f(), g());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f() {
-	return;
+	return a;
+	var a;
 }
 function g() {
 	return a;
-	var a = 1;
+	var a;
 }
 console.log(f(), g());

```

## `terser/reduce_vars/duplicate_lambda_defun_name_2`

- size: oxc 69 vs reference 63 (+6 bytes)

```js
console.log((function f(a) {
	function f() {}
	return f.length;
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log(function() {
-	return (function() {}).length;
-}());
+console.log((function(a) {
+	function f() {}
+	return f.length;
+})());

```

## `terser/reduce_vars/issue_3113_1`

- size: oxc 141 vs reference 135 (+6 bytes)

```js
var c = 0;
(function() {
	function f() {
		while (g());
	}
	var a = f();
	function g() {
		a && a[c++];
	}
	g(a = 1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 var c = 0;
 (function() {
-	var a = function() {
-		while (g());
-	}();
+	function f() {
+		for (; g(););
+	}
+	var a = f();
 	function g() {
 		a && a[c++];
 	}

```

## `terser/reduce_vars/issue_3113_2`

- size: oxc 144 vs reference 138 (+6 bytes)

```js
var c = 0;
(function() {
	function f() {
		while (g());
	}
	var a = f();
	function g() {
		a && a[c++];
	}
	a = 1;
	g();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 var c = 0;
 (function() {
-	var a = function() {
-		while (g());
-	}();
+	function f() {
+		for (; g(););
+	}
+	var a = f();
 	function g() {
 		a && a[c++];
 	}

```

## `terser/reduce_vars/unsafe_evaluate_escaped`

- size: oxc 272 vs reference 266 (+6 bytes)

```js
console.log((function() {
	var o = { p: 1 };
	console.log(o, o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 2 };
	console.log(o.p, o);
	return o.p;
})());
console.log((function() {
	var o = { p: 3 }, a = [o];
	console.log(a[0].p++);
	return o.p;
})());

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,15 @@
-console.log(function() {
+console.log((function() {
 	var o = { p: 1 };
 	console.log(o, o.p);
 	return o.p;
-}());
-console.log(function() {
+})());
+console.log((function() {
 	var o = { p: 2 };
 	console.log(o.p, o);
 	return o.p;
-}());
-console.log(function() {
+})());
+console.log((function() {
 	var o = { p: 3 }, a = [o];
 	console.log(a[0].p++);
 	return o.p;
-}());
+})());

```

## `terser/reduce_vars/unsafe_evaluate_modified`

- size: oxc 777 vs reference 771 (+6 bytes)

```js
console.log((function() {
	var o = { p: 1 };
	o.p++;
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 2 };
	--o.p;
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 3 };
	o.p += '';
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 4 };
	o = {};
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 5 };
	o.p = -9;
	console.log(o.p);
	return o.p;
})());
function inc() {
	this.p++;
}
console.log((function() {
	var o = { p: 6 };
	inc.call(o);
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 7 };
	console.log([o][0].p++);
	return o.p;
})());
console.log((function() {
	var o = { p: 8 };
	console.log({ q: o }.q.p++);
	return o.p;
})());

```

```diff
--- reference
+++ oxc
@@ -17,7 +17,7 @@
 	return o.p;
 })());
 console.log((function() {
-	var o;
+	var o = { p: 4 };
 	o = {};
 	console.log(o.p);
 	return o.p;
@@ -39,7 +39,7 @@
 })());
 console.log((function() {
 	var o = { p: 7 };
-	console.log([o][0].p++);
+	console.log(o.p++);
 	return o.p;
 })());
 console.log((function() {

```

## `terser/regexp/unsafe_slashes`

- size: oxc 34 vs reference 28 (+6 bytes)

```js
console.log(new RegExp('^https://'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(/^https:\/\//);
+console.log(RegExp('^https://'));

```

## `terser/template_string/template_string_with_predefined_constants`

- size: oxc 429 vs reference 423 (+6 bytes)

```js
var foo = `This is ${undefined}`;
var bar = `This is ${NaN}`;
var baz = `This is ${null}`;
var foofoo = `This is ${Infinity}`;
var foobar = 'This is ${1/0}';
var foobaz = 'This is ${1/0}';
var barfoo = 'This is ${NaN}';
var bazfoo = 'This is ${null}';
var bazbaz = `This is ${1 / 0}`;
var barbar = `This is ${0 / 0}`;
var barbar = 'This is ${0/0}';
var barber = 'This is ${0/0}';
var a = `${4 ** 11}`;
var b = `${4 ** 12}`;
var c = `${4 ** 14}`;

```

```diff
--- reference
+++ oxc
@@ -6,10 +6,10 @@
 var foobaz = 'This is ${1/0}';
 var barfoo = 'This is ${NaN}';
 var bazfoo = 'This is ${null}';
-var bazbaz = 'This is Infinity';
+var bazbaz = `This is ${1 / 0}`;
 var barbar = 'This is NaN';
 var barbar = 'This is ${0/0}';
 var barber = 'This is ${0/0}';
-var a = '4194304';
-var b = '16777216';
-var c = '268435456';
+var a = `${4 ** 11}`;
+var b = `${4 ** 12}`;
+var c = `${4 ** 14}`;

```

## `terser/typeof/duplicate_defun_arg_name`

- size: oxc 104 vs reference 98 (+6 bytes)

```js
function long_name(long_name) {
	return typeof long_name;
}
console.log(typeof long_name, long_name());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function long_name(long_name) {
 	return typeof long_name;
 }
-console.log('function', long_name());
+console.log(typeof long_name, long_name());

```

## `terser/typeof/duplicate_lambda_arg_name`

- size: oxc 68 vs reference 62 (+6 bytes)

```js
console.log((function long_name(long_name) {
	return typeof long_name;
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function long_name() {
-	return 'undefined';
-}());
+console.log((function(long_name) {
+	return typeof long_name;
+})());

```

## `terser/collapse_vars/collapse_vars_seq`

- size: oxc 98 vs reference 91 (+7 bytes)

```js
var f1 = function(x, y) {
	var a, b, r = x + y, q = r * r, z = q - r;
	a = z, b = 7;
	return a + b;
};
console.log(f1(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var f1 = function(x, y) {
-	var r = x + y;
-	return r * r - r + 7;
-};
-console.log(f1(1, 2));
+console.log(function(x, y) {
+	var a, b, r = x + y;
+	return a = r * r - r, b = 7, a + b;
+}(1, 2));

```

## `terser/collapse_vars/conditional_1`

- size: oxc 136 vs reference 129 (+7 bytes)

```js
function f(a, b) {
	var c = '';
	var d = b ? '>' : '<';
	if (a) c += '=';
	return c += d;
}
console.log(f(0, 0), f(0, 1), f(1, 0), f(1, 1));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f(a, b) {
-	var c = '';
-	if (a) c += '=';
-	return c += b ? '>' : '<';
+	var c = '', d = b ? '>' : '<';
+	a && (c += '=');
+	return c += d;
 }
 console.log(f(0, 0), f(0, 1), f(1, 0), f(1, 1));

```

## `terser/collapse_vars/issue_1537_destructuring_1`

- size: oxc 29 vs reference 22 (+7 bytes)

```js
var x = 1, y = 2;
[x] = [y];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var x = 1;
-[x] = [2];
+var x = 1, y = 2;
+[x] = [y];

```

## `terser/collapse_vars/return_1`

- size: oxc 103 vs reference 96 (+7 bytes)

```js
var log = console.log;
function f(b, c) {
	var a = c;
	if (b) return b;
	log(a);
}
f(false, 1);
f(true, 2);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 var log = console.log;
 function f(b, c) {
+	var a = c;
 	if (b) return b;
-	log(c);
+	log(a);
 }
-f(false, 1);
-f(true, 2);
+f(!1, 1);
+f(!0, 2);

```

## `terser/dead_code/dead_code_block_decls_die`

- size: oxc 44 vs reference 37 (+7 bytes)

```js
if (0) {
	let foo = 6;
	const bar = 12;
	class Baz {}
	var qux;
}
console.log(foo, bar, Baz);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var qux;
+if (0) var qux;
 console.log(foo, bar, Baz);

```

## `terser/dead_code/issue_2383_1`

- size: oxc 17 vs reference 10 (+7 bytes)

```js
if (0) {
	var { x, y } = foo();
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var x, y;
+if (0) var x, y;

```

## `terser/dead_code/issue_2383_2`

- size: oxc 48 vs reference 41 (+7 bytes)

```js
if (0) {
	var { x = 0, y: [w, , { z, p: q = 7 }] = [
		1,
		2,
		{ z: 3 }
	] } = {};
}
console.log(x, q, w, z);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var x, w, z, q;
+if (0) var x, w, z, q;
 console.log(x, q, w, z);

```

## `terser/dead_code/issue_2383_3`

- size: oxc 72 vs reference 65 (+7 bytes)

```js
var b = 7, y = 8;
if (0) {
	var a = 1, [x, y, z] = [
		2,
		3,
		4
	], b = 5;
}
console.log(a, x, y, z, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var b = 7, y = 8;
-var a, x, y, z, b;
+if (0) var a, x, y, z, b;
 console.log(a, x, y, z, b);

```

## `terser/drop_unused/chained_3`

- size: oxc 77 vs reference 70 (+7 bytes)

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
@@ -1,5 +1,5 @@
 console.log((function(a, b) {
-	var c = b;
+	var c = a, c = b;
 	b++;
 	return c;
-})(0, 2));
+})(1, 2));

```

## `terser/drop_unused/issue_2226_3`

- size: oxc 61 vs reference 54 (+7 bytes)

```js
console.log((function(a, b) {
	a += b;
	return a;
})(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 console.log((function(a, b) {
-	return a += 2;
-})(1));
+	a += b;
+	return a;
+})(1, 2));

```

## `terser/evaluate/unsafe_object`

- size: oxc 67 vs reference 60 (+7 bytes)

```js
var o = { a: 1 };
console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var o = { a: 1 };
-console.log(o + 1, 2, o.b + 1, 1 .b + 1);
+console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

## `terser/evaluate/unsafe_object_repeated`

- size: oxc 82 vs reference 75 (+7 bytes)

```js
var o = {
	a: { b: 1 },
	a: 1
};
console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 	a: { b: 1 },
 	a: 1
 };
-console.log(o + 1, 2, o.b + 1, 1 .b + 1);
+console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

## `terser/issue_269/issue_269_1`

- size: oxc 41 vs reference 34 (+7 bytes)

```js
f(String(x), Number(x), Boolean(x), String(), Number(), Boolean());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-f(x + '', +x, !!x, '', 0, false);
+f(String(x), Number(x), !!x, '', 0, !1);

```

## `terser/properties/issue_2816_ecma6`

- size: oxc 87 vs reference 80 (+7 bytes)

```js
'use strict';
var o = { a: 1 };
o.b = 2;
o.a = 3;
o.c = 4;
console.log(o.a, o.b, o.c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 'use strict';
-var o = {
-	a: (1, 3),
-	b: 2,
-	c: 4
-};
+var o = { a: 1 };
+o.b = 2;
+o.a = 3;
+o.c = 4;
 console.log(o.a, o.b, o.c);

```

## `terser/properties/new_this`

- size: oxc 47 vs reference 40 (+7 bytes)

```js
new { f: function(a) {
	this.a = a;
} }.f(42);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-new (function(a) {
+new { f: function(a) {
 	this.a = a;
-})(42);
+} }.f(42);

```

## `terser/sequences/lift_sequences_2`

- size: oxc 87 vs reference 80 (+7 bytes)

```js
var foo = 1, bar;
foo.x = (foo = {}, 10);
bar = (bar = {}, 10);
console.log(foo, bar);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var foo = 1, bar;
-foo.x = (foo = {}, 10), bar = {}, console.log(foo, bar = 10);
+foo.x = (foo = {}, 10), bar = (bar = {}, 10), console.log(foo, bar);

```

## `terser/yield/yield_optimize_expression`

- size: oxc 128 vs reference 121 (+7 bytes)

```js
function* f1() {
	yield;
}
function* f2() {
	yield undefined;
}
function* f3() {
	yield null;
}
function* f4() {
	yield* undefined;
}

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	yield;
 }
 function* f2() {
-	yield;
+	yield void 0;
 }
 function* f3() {
 	yield null;

```

## `terser/ascii/ascii_only_false`

- size: oxc 126 vs reference 118 (+8 bytes)

```js
function f() {
	return '\x000\x001\x007\x008\0' + '\0\x07\b	\n\v\f\r' + '\x1B' + ' !"# ... }~ ... þÿ࿿￿';
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f() {
-	return '\0\x07\x008\0\0\x07\b	\n\v\f\r\x1B !"# ... }~ ... þÿ࿿￿';
+	return '\x000\x001\x007\x008\0\0\x07\b	\n\v\f\r\x1B !"# ... }~ ... þÿ࿿￿';
 }

```

## `terser/ascii/ascii_only_true`

- size: oxc 126 vs reference 118 (+8 bytes)

```js
function f() {
	return '\x000\x001\x007\x008\0' + '\0\x07\b	\n\v\f\r' + '\x1B' + ' !"# ... }~ ... þÿ࿿￿';
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f() {
-	return '\0\x07\x008\0\0\x07\b	\n\v\f\r\x1B !"# ... }~ ... þÿ࿿￿';
+	return '\x000\x001\x007\x008\0\0\x07\b	\n\v\f\r\x1B !"# ... }~ ... þÿ࿿￿';
 }

```

## `terser/dead_code/issue_2860_1`

- size: oxc 50 vs reference 42 (+8 bytes)

```js
console.log((function(a) {
	return a ^= 1;
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function() {
-	return 1;
-}());
+console.log((function(a) {
+	return a ^= 1;
+})());

```

## `terser/evaluate/in_boolean_context`

- size: oxc 105 vs reference 97 (+8 bytes)

```js
console.log(!42, !'foo', ![1, 2], !/foo/, !b(42), !b('foo'), !b([1, 2]), !b(/foo/), ![1, foo()], ![
	1,
	foo(),
	2
]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(!1, !1, !1, !1, !b(42), !b('foo'), !b([1, 2]), !b(/foo/), (foo(), !1), (foo(), !1));
+console.log(!1, !1, !1, !1, !b(42), !b('foo'), !b([1, 2]), !b(/foo/), ![1, foo()], ![
+	1,
+	foo(),
+	2
+]);

```

## `terser/evaluate/unsafe_object_nested`

- size: oxc 74 vs reference 66 (+8 bytes)

```js
var o = { a: { b: 1 } };
console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var o = { a: { b: 1 } };
-console.log(o + 1, o.a + 1, o.b + 1, 2);
+console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

## `terser/issue_1588/safe_undefined`

- size: oxc 118 vs reference 110 (+8 bytes)

```js
var a, c;
console.log((function(undefined) {
	return function() {
		if (a) return b;
		if (c) return d;
	};
})(1)());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var a, c;
-console.log((function(n) {
+console.log((function(undefined) {
 	return function() {
-		return a ? b : (0, c) ? d : void 0;
+		if (a) return b;
+		if (c) return d;
 	};
 })(1)());

```

## `terser/issue_208/do_update_rhs`

- size: oxc 37 vs reference 29 (+8 bytes)

```js
MY_DEBUG = DEBUG;
MY_DEBUG += DEBUG;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-MY_DEBUG = 0;
-MY_DEBUG += 0;
+MY_DEBUG = DEBUG;
+MY_DEBUG += DEBUG;

```

## `terser/issue_208/mixed`

- size: oxc 95 vs reference 87 (+8 bytes)

```js
const ENV = 3;
var FOO = 4;
f(ENV * 10);
--FOO;
DEBUG = 1;
DEBUG++;
DEBUG += 1;
f(DEBUG);
x = DEBUG;

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 const ENV = 3;
 var FOO = 4;
-f(10);
+f(30);
 --FOO;
 DEBUG = 1;
 DEBUG++;
 DEBUG += 1;
-f(0);
-x = 0;
+f(DEBUG);
+x = DEBUG;

```

## `terser/issue_22/return_with_no_value_in_if_body`

- size: oxc 56 vs reference 48 (+8 bytes)

```js
function foo(bar) {
	if (bar) {
		return;
	} else {
		return 1;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function foo(bar) {
-	return bar ? void 0 : 1;
+	if (bar) return;
+	else return 1;
 }

```

## `terser/nullish/nullish_coalescing_boolean_context`

- size: oxc 54 vs reference 46 (+8 bytes)

```js
if (null ?? unknown) {
	pass();
}
if (unknown ?? false) {
	pass();
}
if (4 + 4 ?? unknown) {
	pass();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 unknown && pass();
-unknown && pass();
+(unknown ?? !1) && pass();
 pass();

```

## `terser/object/concise_method_to_prop_arrow`

- size: oxc 163 vs reference 155 (+8 bytes)

```js
console.log({ a: () => 1 }.a());
console.log({ a: () => 2 }.a());
console.log({ a() {
	return 3;
} }.a());
console.log({
	a() {
		return this.b;
	},
	b: 4
}.a());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 console.log({ a: () => 1 }.a());
 console.log({ a: () => 2 }.a());
-console.log({ a: () => 3 }.a());
+console.log({ a() {
+	return 3;
+} }.a());
 console.log({
 	a() {
 		return this.b;

```

## `terser/object/dont_join_repeat_object_keys`

- size: oxc 37 vs reference 29 (+8 bytes)

```js
const obj = { foo: 1 };
obj.foo = 2;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-const obj = { foo: (1, 2) };
+const obj = { foo: 1 };
+obj.foo = 2;

```

## `terser/pure_getters/issue_2265_1`

- size: oxc 22 vs reference 14 (+8 bytes)

```js
({ ...{} }).p;
({ ...g }).p;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
+({}).p;
 ({ ...g }).p;

```

## `terser/pure_getters/strict_reduce_vars`

- size: oxc 98 vs reference 90 (+8 bytes)

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
@@ -1,6 +1,7 @@
 var a, b = null, c = {};
 a.prop;
 b.prop;
+c.prop;
 d.prop;
 null.prop;
 (void 0).prop;

```

## `terser/reduce_vars/escape_yield`

- size: oxc 219 vs reference 211 (+8 bytes)

```js
function main() {
	var thing = gen.next().value;
	if (thing !== (thing = gen.next().value)) console.log('FAIL');
	else console.log('PASS');
}
function foo() {}
function* baz(s) {
	for (;;) yield foo;
}
var gen = baz();
main();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
+function main() {
+	var thing = gen.next().value;
+	thing === (thing = gen.next().value) ? console.log('PASS') : console.log('FAIL');
+}
 function foo() {}
-var gen = function* () {
+function* baz(s) {
 	for (;;) yield foo;
-}();
-(function() {
-	var thing = gen.next().value;
-	if (thing !== (thing = gen.next().value)) console.log('FAIL');
-	else console.log('PASS');
-})();
+}
+var gen = baz();
+main();

```

## `terser/reduce_vars/issue_2860_1`

- size: oxc 50 vs reference 42 (+8 bytes)

```js
console.log((function(a) {
	return a ^= 1;
	a ^= 2;
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function() {
-	return 1;
-}());
+console.log((function(a) {
+	return a ^= 1;
+})());

```

## `terser/sequences/side_effects_cascade_3`

- size: oxc 79 vs reference 71 (+8 bytes)

```js
function f(a, b) {
	'foo' ^ (b += a), b ? false : (b = a) ? -1 : (b -= a) - (b ^= a), a-- || !a, a;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f(a, b) {
-	!(b += a) && ((b = a) || (b -= a, b ^= a)), a--;
+	'foo' ^ (b += a), (b ||= a) || (b -= a) - (b ^= a), a--;
 }

```

## `terser/string_literal/reduce_escaped_newline/es2015`

- size: oxc 383 vs reference 375 (+8 bytes)

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

## `terser/assignment/op_equals_right_local_var`

- size: oxc 294 vs reference 285 (+9 bytes)

```js
var x;
x = (x -= 2) ^ x;
x = 3 + x;
x = 3 - x;
x = 3 / x;
x = 3 * x;
x = 3 >> x;
x = 3 << x;
x = 3 >>> x;
x = 3 | x;
x = 3 ^ x;
x = 3 % x;
x = 3 & x;
x = g() + x;
x = g() - x;
x = g() / x;
x = g() * x;
x = g() >> x;
x = g() << x;
x = g() >>> x;
x = g() | x;
x = g() ^ x;
x = g() % x;
x = g() & x;

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,15 @@
-var x;
-x = (x -= 2) ^ x;
+var x = (x -= 2) ^ x;
 x = 3 + x;
 x = 3 - x;
 x = 3 / x;
-x *= 3;
+x = 3 * x;
 x = 3 >> x;
 x = 3 << x;
 x = 3 >>> x;
-x |= 3;
-x ^= 3;
+x = 3 | x;
+x = 3 ^ x;
 x = 3 % x;
-x &= 3;
+x = 3 & x;
 x = g() + x;
 x = g() - x;
 x = g() / x;

```

## `terser/collapse_vars/cascade_statement`

- size: oxc 261 vs reference 252 (+9 bytes)

```js
function f1(a, b) {
	var c;
	if (a) return c = b, c || a;
	else c = a, c(b);
}
function f2(a, b) {
	var c;
	while (a) c = b, a = c + b;
	do {
		throw c = a + b, c;
	} while (c);
}
function f3(a, b) {
	for (; a < b; a++) if (c = a, c && b) var c = (c = b(a), c);
}

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,15 @@
 function f1(a, b) {
 	var c;
-	if (a) return (c = b) || a;
-	else (c = a)(b);
+	if (a) return c = b, c || a;
+	else c = a, c(b);
 }
 function f2(a, b) {
 	var c;
-	while (a) a = (c = b) + b;
-	do {
-		throw c = a + b;
-	} while (c);
+	for (; a;) c = b, a = c + b;
+	do
+		throw c = a + b, c;
+	while (c);
 }
 function f3(a, b) {
-	for (; a < b; a++) if ((c = a) && b) var c = c = b(a);
+	for (; a < b; a++) if (c = a, c && b) var c = (c = b(a), c);
 }

```

## `terser/comparing/self_comparison_2`

- size: oxc 58 vs reference 49 (+9 bytes)

```js
function f() {}
var o = {};
console.log(f != f, o === o);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f() {}
 var o = {};
-console.log(!1, !0);
+console.log(f != f, o === o);

```

## `terser/debugger/drop_debugger`

- size: oxc 19 vs reference 10 (+9 bytes)

```js
debugger;
if (foo) debugger;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if (foo);
+if (foo) debugger;

```

## `terser/evaluate/negative_zero`

- size: oxc 45 vs reference 36 (+9 bytes)

```js
console.log(-'', - -'', 1 / -0, 1 / -'');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(-0, 0, -1 / 0, -1 / 0);
+console.log(-'', - -'', -Infinity, 1 / -'');

```

## `terser/functions/unsafe_apply_expansion_1`

- size: oxc 48 vs reference 39 (+9 bytes)

```js
console.log.apply(console, [
	1,
	...[2, 3],
	4
]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log.call(console, 1, 2, 3, 4);
+console.log.apply(console, [
+	1,
+	2,
+	3,
+	4
+]);

```

## `terser/if_return/if_if_return_return`

- size: oxc 69 vs reference 60 (+9 bytes)

```js
function f(a, b) {
	if (a) {
		if (b) return b;
		return;
	}
	g();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 function f(a, b) {
-	if (a) return b || (0, void 0);
+	if (a) {
+		if (b) return b;
+		return;
+	}
 	g();
 }

```

## `terser/issue_203/compress_new_function_with_destruct`

- size: oxc 114 vs reference 105 (+9 bytes)

```js
new Function('aa, [bb]', 'return aa;');
new Function('aa, {bb}', 'return aa;');
new Function('[[aa]], [{bb}]', 'return aa;');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-Function('n,[r]', 'return n');
-Function('n,{bb:b}', 'return n');
-Function('[[n]],[{bb:b}]', 'return n');
+Function('aa, [bb]', 'return aa;');
+Function('aa, {bb}', 'return aa;');
+Function('[[aa]], [{bb}]', 'return aa;');

```

## `terser/issue_203/compress_new_function_with_destruct_arrows`

- size: oxc 114 vs reference 105 (+9 bytes)

```js
new Function('aa, [bb]', 'return aa;');
new Function('aa, {bb}', 'return aa;');
new Function('[[aa]], [{bb}]', 'return aa;');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-Function('n,[a]', 'return n');
-Function('b,{bb:n}', 'return b');
-Function('[[b]],[{bb:n}]', 'return b');
+Function('aa, [bb]', 'return aa;');
+Function('aa, {bb}', 'return aa;');
+Function('[[aa]], [{bb}]', 'return aa;');

```

## `terser/issue_976/eval_unused`

- size: oxc 168 vs reference 159 (+9 bytes)

```js
function f1(a, eval, c, d, e) {
	return a('c') + eval;
}
function f2(a, b, c, d, e) {
	return a + eval('c');
}
function f3(a, eval, c, d, e) {
	return a + eval('c');
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function f1(a, eval) {
+function f1(a, eval, c, d, e) {
 	return a('c') + eval;
 }
 function f2(a, b, c, d, e) {

```

## `terser/pure_getters/set_immutable_2`

- size: oxc 75 vs reference 66 (+9 bytes)

```js
var a = 1;
a.foo += '';
if (a.foo) console.log('FAIL');
else console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-1 .foo += '', 1 .foo ? console.log('FAIL') : console.log('PASS');
+var a = 1;
+a.foo += '', a.foo ? console.log('FAIL') : console.log('PASS');

```

## `terser/pure_getters/set_immutable_4`

- size: oxc 89 vs reference 80 (+9 bytes)

```js
'use strict';
var a = 1;
a.foo += '';
if (a.foo) console.log('FAIL');
else console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 'use strict';
-1 .foo += '', 1 .foo ? console.log('FAIL') : console.log('PASS');
+var a = 1;
+a.foo += '', a.foo ? console.log('FAIL') : console.log('PASS');

```

## `terser/pure_getters/set_immutable_5`

- size: oxc 89 vs reference 80 (+9 bytes)

```js
'use strict';
var a = 1;
a.foo += '';
if (a.foo) console.log('FAIL');
else console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 'use strict';
-1 .foo += '';
-1 .foo ? console.log('FAIL') : console.log('PASS');
+var a = 1;
+a.foo += '';
+a.foo ? console.log('FAIL') : console.log('PASS');

```

## `terser/reduce_vars/escape_local_sequence`

- size: oxc 171 vs reference 162 (+9 bytes)

```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('PASS');
	else console.log('FAIL');
}
function baz() {
	function foo() {}
	function bar() {}
	return foo, bar;
}
main();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('FAIL') : console.log('PASS');
+}
 function baz() {
-	return function() {};
+	function bar() {}
+	return bar;
 }
-(function() {
-	var thing = baz();
-	if (thing !== (thing = baz())) console.log('PASS');
-	else console.log('FAIL');
-})();
+main();

```

## `terser/reduce_vars/escape_local_throw`

- size: oxc 212 vs reference 203 (+9 bytes)

```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('PASS');
	else console.log('FAIL');
}
function baz() {
	function foo() {}
	try {
		throw foo;
	} catch (bar) {
		return bar;
	}
}
main();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,13 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('FAIL') : console.log('PASS');
+}
 function baz() {
+	function foo() {}
 	try {
-		throw function() {};
+		throw foo;
 	} catch (bar) {
 		return bar;
 	}
 }
-(function() {
-	var thing = baz();
-	if (thing !== (thing = baz())) console.log('PASS');
-	else console.log('FAIL');
-})();
+main();

```

## `terser/reduce_vars/issue_2420_2`

- size: oxc 249 vs reference 240 (+9 bytes)

```js
function f() {
	var that = this;
	if (that.bar) that.foo();
	else !(function(that, self) {
		console.log(this === that, self === this, that === self);
	})(that, this);
}
f.call({
	bar: 1,
	foo: function() {
		console.log('foo', this.bar);
	}
});
f.call({});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f() {
-	if (this.bar) this.foo();
-	else !(function(that, self) {
+	var that = this;
+	that.bar ? that.foo() : (function(that, self) {
 		console.log(this === that, self === this, that === self);
-	})(this, this);
+	})(that, this);
 }
 f.call({
 	bar: 1,

```

## `terser/reduce_vars/regex_loop`

- size: oxc 134 vs reference 125 (+9 bytes)

```js
function f(x) {
	for (var r, s = 'acdabcdeabbb'; r = x().exec(s);) console.log(r[0]);
}
var a = /ab*/g;
f(function() {
	return a;
});

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
+function f(x) {
+	for (var r, s = 'acdabcdeabbb'; r = x().exec(s);) console.log(r[0]);
+}
 var a = /ab*/g;
-(function(x) {
-	for (var r; r = x().exec('acdabcdeabbb');) console.log(r[0]);
-})(function() {
+f(function() {
 	return a;
 });

```

## `terser/arrow/export_default_object_expression`

- size: oxc 89 vs reference 79 (+10 bytes)

```js
export default {
	foo: 1 + 2,
	bar() {
		return 4;
	},
	get baz() {
		return this.foo;
	}
};

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 export default {
 	foo: 3,
-	bar: () => 4,
+	bar() {
+		return 4;
+	},
 	get baz() {
 		return this.foo;
 	}

```

## `terser/conditionals/ifs_6`

- size: oxc 115 vs reference 105 (+10 bytes)

```js
var x, y;
if (!foo && !bar && !baz && !boo) {
	x = 10;
} else {
	x = 20;
}
if (y) {
	x[foo] = 10;
} else {
	x[foo] = 20;
}
if (foo) {
	x[bar] = 10;
} else {
	x[bar] = 20;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var x, y;
-x = foo || bar || baz || boo ? 20 : 10;
-x[foo] = y ? 10 : 20;
+var x = !foo && !bar && !baz && !boo ? 10 : 20, y;
+y ? x[foo] = 10 : x[foo] = 20;
 foo ? x[bar] = 10 : x[bar] = 20;

```

## `terser/drop_unused/issue_1715_2`

- size: oxc 100 vs reference 90 (+10 bytes)

```js
var a = 1;
function f() {
	a++;
	try {
		x();
	} catch (a) {
		var a = 2;
	}
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 var a = 1;
 function f() {
+	a++;
 	try {
 		x();
 	} catch (a) {
-		var a;
+		var a = 2;
 	}
 }
 f();

```

## `terser/issue_1443/keep_fnames`

- size: oxc 120 vs reference 110 (+10 bytes)

```js
function f(undefined) {
	return function() {
		function n(a) {
			return a * a;
		}
		if (a) return b;
		if (c) return d;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-function f(r) {
+function f(e) {
 	return function() {
-		function n(r) {
-			return r * r;
+		function n(e) {
+			return e * e;
 		}
-		return a ? b : c ? d : r;
+		if (a) return b;
+		if (c) return d;
 	};
 }

```

## `terser/labels/labels_10`

- size: oxc 46 vs reference 36 (+10 bytes)

```js
out: while (foo) {
	x();
	y();
	break out;
	z();
	k();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-while (foo) {
+out: for (; foo;) {
 	x();
 	y();
-	break;
+	break out;
 }

```

## `terser/object/prop_func_to_async_concise_method`

- size: oxc 61 vs reference 51 (+10 bytes)

```js
({ run: async function() {
	console.log('PASS');
} }).run();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-({ async run() {
+({ run: async function() {
 	console.log('PASS');
 } }).run();

```

## `terser/properties/join_object_assignments_negative`

- size: oxc 77 vs reference 67 (+10 bytes)

```js
var o = {};
o[0] = 0;
o[-0] = 1;
o[-1] = 2;
console.log(o[0], o[-0], o[-1]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var o = {
-	0: (0, 1),
-	'-1': 2
-};
+var o = {};
+o[0] = 0;
+o[-0] = 1;
+o[-1] = 2;
 console.log(o[0], o[-0], o[-1]);

```

## `terser/pure_funcs/issue_2629_4`

- size: oxc 25 vs reference 15 (+10 bytes)

```js
x(), y();
w(), x(), y();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-y();
-w(), y();
+x(), y();
+w(), x(), y();

```

## `terser/reduce_vars/issue_2420_1`

- size: oxc 217 vs reference 207 (+10 bytes)

```js
function run() {
	var self = this;
	if (self.count++) self.foo();
	else self.bar();
}
var o = {
	count: 0,
	foo: function() {
		console.log('foo');
	},
	bar: function() {
		console.log('bar');
	}
};
run.call(o);
run.call(o);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function run() {
-	if (this.count++) this.foo();
-	else this.bar();
+	var self = this;
+	self.count++ ? self.foo() : self.bar();
 }
 var o = {
 	count: 0,

```

## `terser/reduce_vars/issue_2420_3`

- size: oxc 244 vs reference 234 (+10 bytes)

```js
function f() {
	var that = this;
	if (that.bar) that.foo();
	else ((that, self) => {
		console.log(this === that, self === this, that === self);
	})(that, this);
}
f.call({
	bar: 1,
	foo: function() {
		console.log('foo', this.bar);
	}
});
f.call({});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f() {
-	if (this.bar) this.foo();
-	else ((that, self) => {
+	var that = this;
+	that.bar ? that.foo() : ((that, self) => {
 		console.log(this === that, self === this, that === self);
-	})(this, this);
+	})(that, this);
 }
 f.call({
 	bar: 1,

```

## `terser/reduce_vars/issue_2496`

- size: oxc 249 vs reference 239 (+10 bytes)

```js
function execute(callback) {
	callback();
}
class Foo {
	constructor(message) {
		this.message = message;
	}
	go() {
		this.message = 'PASS';
		console.log(this.message);
	}
	run() {
		execute(() => {
			this.go();
		});
	}
}
new Foo('FAIL').run();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
+function execute(callback) {
+	callback();
+}
 class Foo {
 	constructor(message) {
 		this.message = message;
@@ -7,9 +10,7 @@
 		console.log(this.message);
 	}
 	run() {
-		(function(callback) {
-			callback();
-		})(() => {
+		execute(() => {
 			this.go();
 		});
 	}

```

## `terser/reduce_vars/issue_2799_2`

- size: oxc 111 vs reference 101 (+10 bytes)

```js
(function() {
	function foo() {
		Function.prototype.call.apply(console.log, [null, 'PASS']);
	}
	foo();
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 (function() {
-	(function() {
-		(function() {}).call.apply(console.log, [null, 'PASS']);
-	})();
+	function foo() {
+		Function.prototype.call.apply(console.log, [null, 'PASS']);
+	}
+	foo();
 })();

```

## `terser/reduce_vars/unsafe_evaluate_array_2`

- size: oxc 144 vs reference 134 (+10 bytes)

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
@@ -8,4 +8,4 @@
 		return x * x * x;
 	}
 ];
-console.log(1, 2, arr[2](2), arr[3]);
+console.log(arr[0], arr[1], arr[2](2), arr[3]);

```

## `terser/sequences/for_init_var`

- size: oxc 116 vs reference 106 (+10 bytes)

```js
var a = 'PASS';
(function() {
	var b = 42;
	for (var c = 5; c > 0;) c--;
	a = 'FAIL';
	var a;
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var a = 'PASS';
 (function() {
-	for (var b = 42, c = 5, a; c > 0;) c--;
+	var b = 42;
+	for (var c = 5; c > 0;) c--;
 	a = 'FAIL';
+	var a;
 })();
 console.log(a);

```

## `terser/template_string/evaluate_nested_templates`

- size: oxc 113 vs reference 103 (+10 bytes)

```js
var foo = `${`${`${`foo`}`}`}`;
var bar = `before ${`innerBefore ${any} innerAfter`} after`;
var baz = `1 ${2 + `3 ${any} 4` + 5} 6`;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var foo = 'foo';
-var bar = `before innerBefore ${any} innerAfter after`;
-var baz = `1 23 ${any} 45 6`;
+var bar = `before ${`innerBefore ${any} innerAfter`} after`;
+var baz = `1 ${`23 ${any} 45`} 6`;

```

## `terser/collapse_vars/issue_1631_3`

- size: oxc 128 vs reference 117 (+11 bytes)

```js
function g() {
	var a = 0, b = 1;
	function f() {
		a = 2;
		return 4;
	}
	var t = f();
	b = a + t;
	return b;
}
console.log(g());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 function g() {
-	var a = 0, b = 1, t = function f() {
+	var a = 0, b = 1;
+	function f() {
 		return a = 2, 4;
-	}();
-	return b = a + t;
+	}
+	var t = f();
+	return b = a + t, b;
 }
 console.log(g());

```

## `terser/collapse_vars/issue_2506`

- size: oxc 180 vs reference 169 (+11 bytes)

```js
var c = 0;
function f0(bar) {
	function f1(Infinity_2) {
		function f13(NaN) {
			if (false <= NaN & this >> 1 >= 0) {
				c++;
			}
		}
		var b_2 = f13(NaN, c++);
	}
	var bar = f1(-3, -1);
}
f0(false);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,12 @@
 var c = 0;
 function f0(bar) {
-	(function(Infinity_2) {
-		(function(NaN) {
-			if (false <= 0 / 0 & this >> 1 >= 0) c++;
-		})(0, c++);
-	})();
+	function f1(Infinity_2) {
+		function f13(NaN) {
+			!1 <= NaN & this >> 1 >= 0 && c++;
+		}
+		f13(NaN, c++);
+	}
+	f1(-3, -1);
 }
-f0(false);
+f0(!1);
 console.log(c);

```

## `terser/drop_unused/delete_assign_2`

- size: oxc 170 vs reference 159 (+11 bytes)

```js
var a;
console.log(delete (a = undefined));
console.log(delete (a = void 0));
console.log(delete (a = Infinity));
console.log(delete (a = 1 / 0));
console.log(delete (a = NaN));
console.log(delete (a = 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log((void 0, !0));
-console.log((void 0, !0));
-console.log((Infinity, !0));
-console.log((1 / 0, !0));
-console.log((NaN, !0));
-console.log((0 / 0, !0));
+console.log(delete void 0);
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/drop_unused/drop_var`

- size: oxc 93 vs reference 82 (+11 bytes)

```js
var a;
console.log(a, b);
var a = 1, b = 2;
console.log(a, b);
var a = 3;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
+var a;
 console.log(a, b);
 var a = 1, b = 2;
 console.log(a, b);
-a = 3;
+var a = 3;
 console.log(a, b);

```

## `terser/evaluate/pow_sequence_with_constants_and_parens`

- size: oxc 31 vs reference 20 (+11 bytes)

```js
console.log((4 ** 1) ** 2, (4 ** 1) ** (1 / 2));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(16, 2);
+console.log(16, 4 ** (1 / 2));

```

## `terser/evaluate/pow_sequence_with_parens_exact`

- size: oxc 136 vs reference 125 (+11 bytes)

```js
console.log((4 ** 1) ** 2, (4 ** 1) ** (1 / 2));
var one = 1;
var two = 2;
var four = 4;
console.log((four ** one) ** two, (four ** one) ** (one / two));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log(16, 2);
+console.log(16, 4 ** (1 / 2));
 var one = 1;
 var two = 2;
 var four = 4;

```

## `terser/export/issue_2126`

- size: oxc 105 vs reference 94 (+11 bytes)

```js
import { foo as bar, cat as dog } from 'stuff';
console.log(bar, dog);
export { bar as qux };
export { dog };

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-import { foo as o, cat as a } from 'stuff';
-console.log(o, a);
-export { o as qux, a as dog };
+import { foo as e, cat as t } from 'stuff';
+console.log(e, t);
+export { e as qux };
+export { t as dog };

```

## `terser/export/redirection`

- size: oxc 107 vs reference 96 (+11 bytes)

```js
let foo = 1, bar = 2;
export { foo as delete };
export { bar as default };
export { foo as var } from 'module.js';

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-let e = 1, o = 2;
+let e = 1, t = 2;
+export { e as delete };
+export { t as default };
 export { foo as var } from 'module.js';
-export { e as delete, o as default };

```

## `terser/functions/empty_body`

- size: oxc 51 vs reference 40 (+11 bytes)

```js
function f() {
	function noop() {}
	noop();
	return noop;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f() {
-	return function() {};
+	function noop() {}
+	return noop;
 }

```

## `terser/issue_2001/export_mangle_4`

- size: oxc 75 vs reference 64 (+11 bytes)

```js
export default class C {
	go(one, two) {
		var z = one;
		return one - two + z;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-export default class e {
-	go(e, r) {
-		return e - r + e;
+export default class C {
+	go(e, t) {
+		var n = e;
+		return e - t + n;
 	}
 }
-;

```

## `terser/numbers/evaluate_3`

- size: oxc 32 vs reference 21 (+11 bytes)

```js
console.log(1 + Number(x) + 2);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(3 + +x);
+console.log(1 + Number(x) + 2);

```

## `terser/reduce_vars/iife`

- size: oxc 75 vs reference 64 (+11 bytes)

```js
!(function(a, b, c) {
	b++;
	console.log(a - 1, b * 1, c + 2);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!(function(a, b, c) {
+(function(a, b, c) {
 	b++;
-	console.log(0, 3, 5);
+	console.log(a - 1, b * 1, c + 2);
 })(1, 2, 3);

```

## `terser/reduce_vars/obj_for_1`

- size: oxc 62 vs reference 51 (+11 bytes)

```js
var o = { a: 1 };
for (var i = o.a--; i; i--) console.log(i);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-for (var i = { a: 1 }.a--; i; i--) console.log(i);
+var o = { a: 1 };
+for (var i = o.a--; i; i--) console.log(i);

```

## `terser/reduce_vars/unsafe_evaluate_array_1`

- size: oxc 205 vs reference 194 (+11 bytes)

```js
function f0() {
	var a = 1;
	var b = [];
	b[a] = 2;
	console.log(a + 3);
}
function f1() {
	var a = [1];
	a[2] = 3;
	console.log(a.length);
}
function f2() {
	var a = [1];
	a.push(2);
	console.log(a.length);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f0() {
-	var a = 1;
-	[][1] = 2;
-	console.log(4);
+	var a = 1, b = [];
+	b[a] = 2;
+	console.log(a + 3);
 }
 function f1() {
 	var a = [1];

```

## `terser/sequences/delete_seq_6`

- size: oxc 35 vs reference 24 (+11 bytes)

```js
var a;
console.log(delete (1, a));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-console.log(!0);
+console.log(delete (0, a));

```

## `terser/switch/drop_case_2`

- size: oxc 72 vs reference 61 (+11 bytes)

```js
switch (foo) {
	case 'bar':
		bar();
		break;
	case 'moo':
	case moo:
	case 'baz': break;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 switch (foo) {
-	case 'bar': bar();
+	case 'bar':
+		bar();
+		break;
 	case 'moo':
 	case moo:
 }

```

## `terser/switch/keep_case`

- size: oxc 59 vs reference 48 (+11 bytes)

```js
switch (foo) {
	case 'bar':
		baz();
		break;
	case moo: break;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 switch (foo) {
-	case 'bar': baz();
+	case 'bar':
+		baz();
+		break;
 	case moo:
 }

```

## `terser/switch/turn_into_if`

- size: oxc 74 vs reference 63 (+11 bytes)

```js
switch (id(1)) {
	case id(2): console.log('FAIL');
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if (id(1) === id(2)) console.log('FAIL');
+switch (id(1)) {
+	case id(2): console.log('FAIL');
+}
 console.log('PASS');

```

## `terser/template_string/simple_string`

- size: oxc 42 vs reference 31 (+11 bytes)

```js
console.log(`world`, { [`foo`]: 1 }[`foo`], `hi` == 'hi');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('world', 1, true);
+console.log('world', { foo: 1 }.foo, !0);

```

## `terser/assignment/op_equals_right_global_var`

- size: oxc 290 vs reference 278 (+12 bytes)

```js
x = (x -= 2) ^ x;
x = 3 + x;
x = 3 - x;
x = 3 / x;
x = 3 * x;
x = 3 >> x;
x = 3 << x;
x = 3 >>> x;
x = 3 | x;
x = 3 ^ x;
x = 3 % x;
x = 3 & x;
x = g() + x;
x = g() - x;
x = g() / x;
x = g() * x;
x = g() >> x;
x = g() << x;
x = g() >>> x;
x = g() | x;
x = g() ^ x;
x = g() % x;
x = g() & x;

```

```diff
--- reference
+++ oxc
@@ -2,14 +2,14 @@
 x = 3 + x;
 x = 3 - x;
 x = 3 / x;
-x *= 3;
+x = 3 * x;
 x = 3 >> x;
 x = 3 << x;
 x = 3 >>> x;
-x |= 3;
-x ^= 3;
+x = 3 | x;
+x = 3 ^ x;
 x = 3 % x;
-x &= 3;
+x = 3 & x;
 x = g() + x;
 x = g() - x;
 x = g() / x;

```

## `terser/collapse_vars/issue_2436_13`

- size: oxc 139 vs reference 127 (+12 bytes)

```js
var a = 'PASS';
(function() {
	function f(b) {
		(function g(b) {
			var b = b && (b.null = 'FAIL');
		})(a);
	}
	f();
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 var a = 'PASS';
 (function() {
-	(function(b) {
+	function f(b) {
 		(function(b) {
-			a && (a.null = 'FAIL');
-		})();
-	})();
+			var b = b && (b.null = 'FAIL');
+		})(a);
+	}
+	f();
 })();
 console.log(a);

```

## `terser/conditionals/cond_2`

- size: oxc 97 vs reference 85 (+12 bytes)

```js
function foo(x, FooBar, some_condition) {
	if (some_condition) {
		x = new FooBar(1);
	} else {
		x = new FooBar(2);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function foo(x, FooBar, some_condition) {
-	x = new FooBar(some_condition ? 1 : 2);
+	x = some_condition ? new FooBar(1) : new FooBar(2);
 }

```

## `terser/conditionals/issue_2994`

- size: oxc 342 vs reference 330 (+12 bytes)

```js
function f(condition1, condition2, condition3) {
	if (condition1) {
		if (condition2) {
			return aValue;
		} else {
			const variable1 = 'something';
			if (condition3) {
				const variable2 = 'else';
				return anotherValue;
			} else {
				return undefined;
			}
		}
	}
}
let aValue = 2, anotherValue = 3;
for (let i = 0; i < 8; ++i) {
	console.log(f(i & 4, i & 2, i & 1));
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,14 @@
 function f(condition1, condition2, condition3) {
-	if (condition1) if (condition2) return aValue;
-	else {
-		const variable1 = 'something';
-		if (!condition3) return;
-		{
-			const variable2 = 'else';
-			return anotherValue;
+	if (condition1) {
+		if (condition2) return aValue;
+		else {
+			let variable1 = 'something';
+			if (condition3) {
+				let variable2 = 'else';
+				return anotherValue;
+			} else return;
 		}
 	}
 }
 let aValue = 2, anotherValue = 3;
-for (let i = 0; i < 8; ++i) console.log(f(4 & i, 2 & i, 1 & i));
+for (let i = 0; i < 8; ++i) console.log(f(i & 4, i & 2, i & 1));

```

## `terser/destructuring/unused_destructuring_decl_2`

- size: oxc 184 vs reference 172 (+12 bytes)

```js
const { a, b: c, d = new Object(1) } = { b: 7 };
let { e, f: g, h = new Object(2) } = { e: 8 };
var { w, x: y, z = new Object(3) } = {
	w: 4,
	x: 5,
	y: 6
};
console.log(c, e, z + 0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-const { a, b: c, d = Object(1) } = { b: 7 };
-let { e, f: g, h = Object(2) } = { e: 8 };
-var { w, x: y, z = Object(3) } = {
+const { a, b: c, d = new Object(1) } = { b: 7 };
+let { e, f: g, h = new Object(2) } = { e: 8 };
+var { w, x: y, z = new Object(3) } = {
 	w: 4,
 	x: 5,
 	y: 6

```

## `terser/destructuring/unused_destructuring_decl_3`

- size: oxc 184 vs reference 172 (+12 bytes)

```js
const { a, b: c, d = new Object(1) } = { b: 7 };
let { e, f: g, h = new Object(2) } = { e: 8 };
var { w, x: y, z = new Object(3) } = {
	w: 4,
	x: 5,
	y: 6
};
console.log(c, e, z + 0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-const { a, b: c, d = Object(1) } = { b: 7 };
-let { e, f: g, h = Object(2) } = { e: 8 };
-var { w, x: y, z = Object(3) } = {
+const { a, b: c, d = new Object(1) } = { b: 7 };
+let { e, f: g, h = new Object(2) } = { e: 8 };
+var { w, x: y, z = new Object(3) } = {
 	w: 4,
 	x: 5,
 	y: 6

```

## `terser/destructuring/unused_destructuring_decl_4`

- size: oxc 184 vs reference 172 (+12 bytes)

```js
const { a, b: c, d = new Object(1) } = { b: 7 };
let { e, f: g, h = new Object(2) } = { e: 8 };
var { w, x: y, z = new Object(3) } = {
	w: 4,
	x: 5,
	y: 6
};
console.log(c, e, z + 0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-const { a, b: c, d = Object(1) } = { b: 7 };
-let { e, f: g, h = Object(2) } = { e: 8 };
-var { w, x: y, z = Object(3) } = {
+const { a, b: c, d = new Object(1) } = { b: 7 };
+let { e, f: g, h = new Object(2) } = { e: 8 };
+var { w, x: y, z = new Object(3) } = {
 	w: 4,
 	x: 5,
 	y: 6

```

## `terser/evaluate/Infinity_NaN_undefined_LHS`

- size: oxc 144 vs reference 132 (+12 bytes)

```js
function f() {
	Infinity = Infinity;
	++Infinity;
	Infinity--;
	NaN *= NaN;
	++NaN;
	NaN--;
	undefined |= undefined;
	++undefined;
	undefined--;
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f() {
-	1 / 0;
+	Infinity = Infinity;
 	++Infinity;
 	Infinity--;
-	NaN *= 0 / 0;
+	NaN *= NaN;
 	++NaN;
 	NaN--;
 	undefined |= void 0;

```

## `terser/evaluate/issue_2919`

- size: oxc 41 vs reference 29 (+12 bytes)

```js
console.log([function() {}].toString());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('function(){}');
+console.log([function() {}].toString());

```

## `terser/functions/unsafe_call_2`

- size: oxc 165 vs reference 153 (+12 bytes)

```js
function foo() {
	console.log(a, b);
}
var bar = (function(a, b) {
	console.log(this, a, b);
})(function() {
	foo.call('foo', 'bar');
	bar.call('foo', 'bar');
})();

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 var bar = (function(a, b) {
 	console.log(this, a, b);
 })(function() {
-	foo('bar');
+	foo.call('foo', 'bar');
 	bar.call('foo', 'bar');
 })();

```

## `terser/global_defs/issue_1801`

- size: oxc 29 vs reference 17 (+12 bytes)

```js
console.log(CONFIG.FOO.BAR);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(!0);
+console.log(CONFIG.FOO.BAR);

```

## `terser/harmony/class_name_can_be_mangled`

- size: oxc 74 vs reference 62 (+12 bytes)

```js
function x() {
	class Foo {}
	var class1 = Foo;
	var class2 = class Bar {};
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function x() {
-	class a {}
-	var s = a;
-	var c = class a {};
+	class Foo {}
+	var class1 = Foo;
+	var class2 = class {};
 }

```

## `terser/hoist/hoist_no_destructurings`

- size: oxc 55 vs reference 43 (+12 bytes)

```js
function a([anArg]) {
	bar();
	var var1;
	var anArg;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function a([anArg]) {
+	bar();
 	var var1;
-	bar();
+	var anArg;
 }

```

## `terser/inline/inline_within_extends_2`

- size: oxc 384 vs reference 372 (+12 bytes)

```js
class Baz extends foo(bar(Array)) {
	constructor() {
		super(...arguments);
	}
}
function foo(foo_base) {
	return class extends foo_base {
		constructor() {
			super(...arguments);
		}
		second() {
			return this[1];
		}
	};
}
function bar(bar_base) {
	return class extends bar_base {
		constructor(...args) {
			super(...args);
		}
	};
}
console.log(new Baz(1, 'PASS', 3).second());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,9 @@
-class Baz extends (function(foo_base) {
+class Baz extends foo(bar(Array)) {
+	constructor() {
+		super(...arguments);
+	}
+}
+function foo(foo_base) {
 	return class extends foo_base {
 		constructor() {
 			super(...arguments);
@@ -7,15 +12,12 @@
 			return this[1];
 		}
 	};
-})((function(bar_base) {
+}
+function bar(bar_base) {
 	return class extends bar_base {
 		constructor(...args) {
 			super(...args);
 		}
 	};
-})(Array)) {
-	constructor() {
-		super(...arguments);
-	}
 }
 console.log(new Baz(1, 'PASS', 3).second());

```

## `terser/issue_t120/issue_t120_1`

- size: oxc 243 vs reference 231 (+12 bytes)

```js
function foo(node) {
	var traverse = function(obj) {
		var i = obj.data;
		return i && i.a != i.b;
	};
	while (traverse(node)) {
		node = node.data;
	}
	return node;
}
var x = {
	a: 1,
	b: 2,
	data: { a: 'hello' }
};
console.log(foo(x).a, foo({ a: 'world' }).a);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,12 @@
 function foo(node) {
-	for (; function(obj) {
+	for (var traverse = function(obj) {
 		var i = obj.data;
 		return i && i.a != i.b;
-	}(node);) node = node.data;
+	}; traverse(node);) node = node.data;
 	return node;
 }
-var x = {
+console.log(foo({
 	a: 1,
 	b: 2,
 	data: { a: 'hello' }
-};
-console.log(foo(x).a, foo({ a: 'world' }).a);
+}).a, foo({ a: 'world' }).a);

```

## `terser/issue_t120/issue_t120_2`

- size: oxc 243 vs reference 231 (+12 bytes)

```js
function foo(node) {
	var traverse = function(obj) {
		var i = obj.data;
		return i && i.a != i.b;
	};
	while (traverse(node)) {
		node = node.data;
	}
	return node;
}
var x = {
	a: 1,
	b: 2,
	data: { a: 'hello' }
};
console.log(foo(x).a, foo({ a: 'world' }).a);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,12 @@
 function foo(node) {
-	for (; function(obj) {
+	for (var traverse = function(obj) {
 		var i = obj.data;
 		return i && i.a != i.b;
-	}(node);) node = node.data;
+	}; traverse(node);) node = node.data;
 	return node;
 }
-var x = {
+console.log(foo({
 	a: 1,
 	b: 2,
 	data: { a: 'hello' }
-};
-console.log(foo(x).a, foo({ a: 'world' }).a);
+}).a, foo({ a: 'world' }).a);

```

## `terser/pure_funcs/array`

- size: oxc 41 vs reference 29 (+12 bytes)

```js
var a;
function f(b) {
	Math.floor(a / b);
	Math.floor(c / b);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a;
 function f(b) {
-	c;
+	a / b;
+	c / b;
 }

```

## `terser/pure_funcs/issue_3065_2b`

- size: oxc 59 vs reference 47 (+12 bytes)

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
+function print(e) {
+	console.log(e);
 }
-o(2);
-o(3);
+print(2);
+print(3);

```

## `terser/reduce_vars/iife_new`

- size: oxc 87 vs reference 75 (+12 bytes)

```js
var A = new (function(a, b, c) {
	b++;
	console.log(a - 1, b * 1, c + 2);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var A = new (function(a, b, c) {
 	b++;
-	console.log(0, 3, 5);
+	console.log(a - 1, b * 1, c + 2);
 })(1, 2, 3);

```

## `terser/reduce_vars/unsafe_evaluate_object_2`

- size: oxc 176 vs reference 164 (+12 bytes)

```js
var obj = {
	foo: 1,
	bar: 2,
	square: function(x) {
		return x * x;
	},
	cube: function(x) {
		return x * x * x;
	}
};
console.log(obj.foo, obj.bar, obj.square(2), obj.cube);

```

```diff
--- reference
+++ oxc
@@ -8,4 +8,4 @@
 		return x * x * x;
 	}
 };
-console.log(1, 2, obj.square(2), obj.cube);
+console.log(obj.foo, obj.bar, obj.square(2), obj.cube);

```

## `terser/regexp/regexp_2`

- size: oxc 83 vs reference 71 (+12 bytes)

```js
console.log(JSON.stringify('COMPASS? Overpass.'.match(new RegExp('([Sap]+)', 'ig'))));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(JSON.stringify('COMPASS? Overpass.'.match(/([Sap]+)/gi)));
+console.log(JSON.stringify('COMPASS? Overpass.'.match(RegExp('([Sap]+)', 'ig'))));

```

## `terser/sequences/issue_2062`

- size: oxc 66 vs reference 54 (+12 bytes)

```js
var a = 1;
if ([
	a || a++ + a--,
	a++ + a--,
	a && a.var
]);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 1;
-a++, a--, a++, a--, a.var;
+a || a++ + a--, a++ + a--, a && a.var;
 console.log(a);

```

## `terser/sequences/unsafe_undefined`

- size: oxc 130 vs reference 118 (+12 bytes)

```js
function f(undefined) {
	if (a) return b;
	if (c) return d;
}
function g(undefined) {
	if (a) return b;
	if (c) return d;
	e();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,9 @@
 function f(undefined) {
-	return a ? b : c ? d : void 0;
+	if (a) return b;
+	if (c) return d;
 }
 function g(undefined) {
-	return a ? b : c ? d : void e();
+	if (a) return b;
+	if (c) return d;
+	e();
 }

```

## `terser/template_string/regex_2`

- size: oxc 43 vs reference 31 (+12 bytes)

```js
console.log(`${/a/} ${6 / 2} ${/b/.test('b')} ${1 ? /c/ : /d/}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('/a/ 3 true /c/');
+console.log(`/a/ 3 ${/b/.test('b')} /c/`);

```

## `terser/template_string/side_effects`

- size: oxc 127 vs reference 115 (+12 bytes)

```js
`t1`;
tag`t2`;
`t${3}`;
tag`t${4}`;
console.log(`\nt${5}`);
function f(a) {
	`t6${a}`;
	a = `t7${a}` & a;
	a = `t8${b}` | a;
	a = f`t9${a}` ^ a;
}

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,8 @@
 tag`t${4}`;
 console.log('\nt5');
 function f(a) {
-	a &= `t7${a}`;
+	`${a}`;
+	a = `t7${a}` & a;
 	a = `t8${b}` | a;
 	a = f`t9${a}` ^ a;
 }

```

## `terser/dead_code/return_assignment`

- size: oxc 771 vs reference 758 (+13 bytes)

```js
function f1(a, b, c) {
	return a = x(), b = y(), b = a && (c >>= 5);
}
function f2() {
	return e = x();
}
function f3(e) {
	return e = x();
}
function f4() {
	var e;
	return e = x();
}
function f5(a) {
	try {
		return a = x();
	} catch (b) {
		console.log(a);
	}
}
function f6(a) {
	try {
		return a = x();
	} finally {
		console.log(a);
	}
}
function y() {
	console.log('y');
}
function test(inc) {
	var counter = 0;
	x = function() {
		counter += inc;
		if (inc < 0) throw counter;
		return counter;
	};
	[
		f1,
		f2,
		f3,
		f4,
		f5,
		f6
	].forEach(function(f, i) {
		e = null;
		try {
			i += 1;
			console.log('result ' + f(10 * i, 100 * i, 1e3 * i));
		} catch (x) {
			console.log('caught ' + x);
		}
		if (null !== e) console.log('e: ' + e);
	});
}
var x, e;
test(1);
test(-1);

```

```diff
--- reference
+++ oxc
@@ -1,19 +1,19 @@
 function f1(a, b, c) {
-	return a = x(), y(), a && c >> 5;
+	return a = x(), b = y(), b = a && (c >>= 5);
 }
 function f2() {
 	return e = x();
 }
 function f3(e) {
-	return x();
+	return e = x();
 }
 function f4() {
 	return x();
 }
 function f5(a) {
 	try {
-		return x();
-	} catch (b) {
+		return a = x();
+	} catch {
 		console.log(a);
 	}
 }
@@ -49,7 +49,7 @@
 		} catch (x) {
 			console.log('caught ' + x);
 		}
-		if (null !== e) console.log('e: ' + e);
+		e !== null && console.log('e: ' + e);
 	});
 }
 var x, e;

```

## `terser/destructuring/destructure_empty_array_3`

- size: oxc 54 vs reference 41 (+13 bytes)

```js
let {} = Object, [] = {}, unused = console.log('not reached');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-let [] = {};
+let {} = Object, [] = {};
 console.log('not reached');

```

## `terser/issue_1447/conditional_false_stray_else_in_loop`

- size: oxc 73 vs reference 60 (+13 bytes)

```js
for (var i = 1; i <= 4; ++i) {
	if (i <= 2) continue;
	console.log(i);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (var i = 1; i <= 4; ++i) if (!(i <= 2)) console.log(i);
+for (var i = 1; i <= 4; ++i) {
+	if (i <= 2) continue;
+	console.log(i);
+}

```

## `terser/issue_2001/export_mangle_3`

- size: oxc 67 vs reference 54 (+13 bytes)

```js
export class C {
	go(one, two) {
		var z = one;
		return one - two + z;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 export class C {
-	go(r, e) {
-		return r - e + r;
+	go(e, t) {
+		var n = e;
+		return e - t + n;
 	}
 }

```

## `terser/nullish/simplify_nullish_coalescing`

- size: oxc 91 vs reference 78 (+13 bytes)

```js
const y = id('one');
const is_null = null;
const not_null = 'two';
const folded_true = false ? 0 : true;
const folded_false = false ? 1 : false;
console.log(is_null ?? y);
console.log(not_null ?? y);
console.log(folded_true ?? y);
console.log(folded_false ?? y);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-console.log(id('one'));
+const y = id('one');
+console.log(y);
 console.log('two');
 console.log(!0);
 console.log(!1);

```

## `terser/properties/join_object_assignments_NaN_2`

- size: oxc 65 vs reference 52 (+13 bytes)

```js
var o = {};
o[NaN] = 1;
o[0 / 0] = 2;
console.log(o[NaN], o[NaN]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-var o = { NaN: (1, 2) };
-console.log(o.NaN, o.NaN);
+var o = {};
+o[NaN] = 1;
+o[NaN] = 2;
+console.log(o[NaN], o[NaN]);

```

## `terser/reduce_vars/issue_1850_4`

- size: oxc 56 vs reference 43 (+13 bytes)

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
@@ -1,3 +1,5 @@
-(function() {
-	console.log(1, 1, 1);
-})();
+function f() {
+	console.log(a, a, a);
+}
+var a = 1;
+f();

```

## `terser/reduce_vars/issue_2799_1`

- size: oxc 171 vs reference 158 (+13 bytes)

```js
console.log((function() {
	return f;
	function f(n) {
		function g(i) {
			return i && i + g(i - 1);
		}
		function h(j) {
			return g(j);
		}
		return h(n);
	}
})()(5));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,12 @@
 console.log((function() {
-	return function(n) {
-		return function(j) {
-			return function g(i) {
-				return i && i + g(i - 1);
-			}(j);
-		}(n);
-	};
+	return f;
+	function f(n) {
+		function g(i) {
+			return i && i + g(i - 1);
+		}
+		function h(j) {
+			return g(j);
+		}
+		return h(n);
+	}
 })()(5));

```

## `terser/reduce_vars/toplevel_on_loops_3`

- size: oxc 29 vs reference 16 (+13 bytes)

```js
var x = 3;
while (x) bar();

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-for (;;) bar();
+var x = 3;
+for (; x;) bar();

```

## `terser/switch/issue_2535`

- size: oxc 28 vs reference 15 (+13 bytes)

```js
switch (w(), 42) {
	case 13: x();
	case 42: y();
	default: z();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-w();
-y();
-z();
+if (w(), 1) {
+	y();
+	z();
+}

```

## `terser/drop_unused/issue_2163`

- size: oxc 27 vs reference 13 (+14 bytes)

```js
var c;
f(...a);
pure(b, ...c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var c;
-a;
-b;
+f(...a);
+b, [...c];

```

## `terser/evaluate/issue_2207_3`

- size: oxc 127 vs reference 113 (+14 bytes)

```js
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);
console.log(Number.NaN);
console.log(Number.NEGATIVE_INFINITY);
console.log(Number.POSITIVE_INFINITY);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(Number.MAX_VALUE);
-console.log(5e-324);
-console.log(0 / 0);
-console.log(-1 / 0);
-console.log(1 / 0);
+console.log(Number.MIN_VALUE);
+console.log(NaN);
+console.log(-Infinity);
+console.log(Infinity);

```

## `terser/evaluate/unsafe_object_complex`

- size: oxc 82 vs reference 68 (+14 bytes)

```js
var o = {
	a: { b: 1 },
	b: 1
};
console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 	a: { b: 1 },
 	b: 1
 };
-console.log(o + 1, o.a + 1, 2, 2);
+console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

## `terser/functions/issue_3016_3`

- size: oxc 105 vs reference 91 (+14 bytes)

```js
var b = 1;
do {
	console.log((function() {
		return a ? 'FAIL' : a = 'PASS';
		try {
			a = 2;
		} catch (a) {
			var a;
		}
	})());
} while (b--);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var b = 1;
-do {
-	console.log((a = void 0, a ? 'FAIL' : a = 'PASS'));
-} while (b--);
-var a;
+do
+	console.log((function() {
+		return a ? 'FAIL' : a = 'PASS';
+		var a;
+	})());
+while (b--);

```

## `terser/global_defs/keyword`

- size: oxc 36 vs reference 22 (+14 bytes)

```js
console.log(undefined, NaN, Infinity);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(0, 1, 2);
+console.log(void 0, NaN, Infinity);

```

## `terser/issue_1052/defun_else_if_return`

- size: oxc 94 vs reference 80 (+14 bytes)

```js
function e() {
	function f() {}
	if (window) function g() {}
	else return;
	function h() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function e() {
 	function f() {}
 	if (window) function g() {}
+	else return;
 	function h() {}
 }

```

## `terser/issue_1052/defun_hoist_funs`

- size: oxc 94 vs reference 80 (+14 bytes)

```js
function e() {
	function f() {}
	if (!window) return;
	else function g() {}
	function h() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function e() {
 	function f() {}
-	function h() {}
 	if (window) function g() {}
+	else return;
+	function h() {}
 }

```

## `terser/issue_1052/defun_if_return`

- size: oxc 94 vs reference 80 (+14 bytes)

```js
function e() {
	function f() {}
	if (!window) return;
	else function g() {}
	function h() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function e() {
 	function f() {}
 	if (window) function g() {}
+	else return;
 	function h() {}
 }

```

## `terser/pure_getters/issue_2265_4`

- size: oxc 14 vs reference 0 (+14 bytes)

```js
var a = { b: 1 };
({ ...a }).b;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+({ b: 1 }).b;

```

## `terser/reduce_vars/issue_3140_2`

- size: oxc 220 vs reference 206 (+14 bytes)

```js
(function() {
	var a;
	function f() {}
	f.g = function g() {
		var self = this;
		function h() {
			console.log(a ? 'PASS' : 'FAIL');
		}
		a = true;
		self();
		a = false;
		h.g = g;
		return h;
	};
	return f;
})().g().g();

```

```diff
--- reference
+++ oxc
@@ -2,12 +2,13 @@
 	var a;
 	function f() {}
 	f.g = function g() {
+		var self = this;
 		function h() {
 			console.log(a ? 'PASS' : 'FAIL');
 		}
-		a = true;
-		this();
-		a = false;
+		a = !0;
+		self();
+		a = !1;
 		h.g = g;
 		return h;
 	};

```

## `terser/reduce_vars/var_assign_5`

- size: oxc 80 vs reference 66 (+14 bytes)

```js
!(function() {
	var a;
	!(function(b) {
		a = 2;
		console.log(a, b);
	})(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-!function() {
+(function() {
 	var a;
-	var b;
-	b = a, console.log(a = 2, b);
-}();
+	(function(b) {
+		a = 2, console.log(a, b);
+	})(a);
+})();

```

## `terser/arrays/for_loop`

- size: oxc 371 vs reference 356 (+15 bytes)

```js
function f0() {
	var a = [
		1,
		2,
		3
	];
	var b = 0;
	for (var i = 0; i < a.length; i++) b += a[i];
	return b;
}
function f1() {
	var a = [
		1,
		2,
		3
	];
	var b = 0;
	for (var i = 0, len = a.length; i < len; i++) b += a[i];
	return b;
}
function f2() {
	var a = [
		1,
		2,
		3
	];
	for (var i = 0; i < a.length; i++) a[i]++;
	return a[2];
}
console.log(f0(), f1(), f2());

```

```diff
--- reference
+++ oxc
@@ -3,9 +3,8 @@
 		1,
 		2,
 		3
-	];
-	var b = 0;
-	for (var i = 0; i < 3; i++) b += a[i];
+	], b = 0;
+	for (var i = 0; i < a.length; i++) b += a[i];
 	return b;
 }
 function f1() {
@@ -13,9 +12,8 @@
 		1,
 		2,
 		3
-	];
-	var b = 0;
-	for (var i = 0; i < 3; i++) b += a[i];
+	], b = 0;
+	for (var i = 0, len = a.length; i < len; i++) b += a[i];
 	return b;
 }
 function f2() {

```

## `terser/dead_code/issue_2233_3`

- size: oxc 33 vs reference 18 (+15 bytes)

```js
var RegExp;
Array.isArray;
RegExp;
UndeclaredGlobal;
function foo() {
	var Number;
	AnotherUndeclaredGlobal;
	Math.sin;
	Number.isNaN;
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
+Array.isArray;
 UndeclaredGlobal;

```

## `terser/functions/issue_3076`

- size: oxc 169 vs reference 154 (+15 bytes)

```js
var c = 'PASS';
(function(b) {
	var n = 2;
	while (--b + (function() {
		e && (c = 'FAIL');
		e = 5;
		return 1;
		try {
			var a = 5;
		} catch (e) {
			var e;
		}
	})().toString() && --n > 0);
})(2);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var c = 'PASS';
 (function(b) {
-	var n = 2;
-	while (--b + (e = void 0, e && (c = 'FAIL'), e = 5, 1).toString() && --n > 0);
-	var e;
+	for (var n = 2; --b + (function() {
+		return e && (c = 'FAIL'), e = 5, 1;
+		var e;
+	})().toString() && --n > 0;);
 })(2), console.log(c);

```

## `terser/functions/issue_3166`

- size: oxc 58 vs reference 43 (+15 bytes)

```js
'foo';
'use strict';
function f() {
	'use strict';
	'bar';
	'use asm';
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
+'foo';
 'use strict';
 function f() {
+	'bar';
 	'use asm';
 }

```

## `terser/issue_1034/non_hoisted_function_after_return_strict`

- size: oxc 171 vs reference 156 (+15 bytes)

```js
'use strict';
function foo(x) {
	if (x) {
		return bar();
		not_called1();
	} else {
		return baz();
		not_called2();
	}
	function bar() {
		return 7;
	}
	return not_reached;
	function UnusedFunction() {}
	function baz() {
		return 8;
	}
}
console.log(foo(0), foo(1));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 'use strict';
 function foo(x) {
-	return x ? bar() : baz();
+	if (x) return bar();
+	else return baz();
 	function bar() {
 		return 7;
 	}

```

## `terser/logical_assignment/assign_in_conditional_part`

- size: oxc 167 vs reference 152 (+15 bytes)

```js
var status = 'PASS';
var nil = null;
var nil_prop = { prop: null };
nil &&= console.log(status = 'FAIL');
nil_prop.prop &&= console.log(status = 'FAIL');
console.log(status);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var status = 'PASS';
-var nil = null;
+var status = 'PASS', nil = null, nil_prop = { prop: null };
 nil &&= console.log(status = 'FAIL');
-({ prop: null }).prop &&= console.log(status = 'FAIL');
+nil_prop.prop &&= console.log(status = 'FAIL');
 console.log(status);

```

## `terser/loops/issue_2740_6`

- size: oxc 68 vs reference 53 (+15 bytes)

```js
const a = 9, b = 0;
for (const a = 1; a < 3; ++b) break;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 const a = 9, b = 0;
-const a1 = 1;
-console.log(a, b);
+for (let a = 1;; ++b) break;
+console.log(9, b);

```

## `terser/loops/issue_2740_7`

- size: oxc 66 vs reference 51 (+15 bytes)

```js
let a = 9, b = 0;
for (const a = 1; a < 3; ++b) break;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 let a = 9, b = 0;
-const a1 = 1;
-console.log(a, b);
+for (let a = 1;; ++b) break;
+console.log(9, b);

```

## `terser/loops/issue_2740_8`

- size: oxc 66 vs reference 51 (+15 bytes)

```js
var a = 9, b = 0;
for (const a = 1; a < 3; ++b) break;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 9, b = 0;
-const a1 = 1;
+for (let a = 1;; ++b) break;
 console.log(a, b);

```

## `terser/properties/issue_2208_4`

- size: oxc 85 vs reference 70 (+15 bytes)

```js
function foo() {}
console.log({
	a: foo(),
	p: function() {
		return 42;
	}
}.p());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 function foo() {}
-console.log((foo(), function() {
-	return 42;
-})());
+console.log({
+	a: void 0,
+	p: function() {
+		return 42;
+	}
+}.p());

```

## `terser/properties/issue_2208_8`

- size: oxc 99 vs reference 84 (+15 bytes)

```js
console.log({ *p() {
	return x();
} }.p());
console.log({ async p() {
	return await x();
} }.p());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 console.log({ *p() {
 	return x();
 } }.p());
-console.log((async () => await x())());
+console.log({ async p() {
+	return await x();
+} }.p());

```

## `terser/properties/issue_3188_3`

- size: oxc 105 vs reference 90 (+15 bytes)

```js
(function() {
	function f() {
		console.log(this[0]);
	}
	(function() {
		var o = ['PASS', f];
		o[1]();
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,7 @@
 	function f() {
 		console.log(this[0]);
 	}
-	['PASS', f][1]();
-	var o;
+	(function() {
+		['PASS', f][1]();
+	})();
 })();

```

## `terser/pure_funcs/issue_2629_5`

- size: oxc 30 vs reference 15 (+15 bytes)

```js
[x()];
[x(), y()];
[
	w(),
	x(),
	y()
];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-y();
-w(), y();
+x();
+x(), y();
+w(), x(), y();

```

## `terser/reduce_vars/unsafe_evaluate_array_4`

- size: oxc 105 vs reference 90 (+15 bytes)

```js
var arr = [
	1,
	2,
	function() {
		return ++this[0];
	}
];
console.log(arr[0], arr[1], arr[2], arr[0]);

```

```diff
--- reference
+++ oxc
@@ -5,4 +5,4 @@
 		return ++this[0];
 	}
 ];
-console.log(1, 2, arr[2], 1);
+console.log(arr[0], arr[1], arr[2], arr[0]);

```

## `terser/sequences/issue_1758`

- size: oxc 110 vs reference 95 (+15 bytes)

```js
console.log((function(c) {
	var undefined = 42;
	return (function() {
		c--;
		c--, c.toString();
		return;
	})();
})());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(function(c) {
-	return function() {
+console.log((function(c) {
+	var undefined = 42;
+	return (function() {
 		c--, c--, c.toString();
-		return;
-	}();
-}());
+	})();
+})());

```

## `terser/arguments/arguments_in_arrow_func_2`

- size: oxc 258 vs reference 242 (+16 bytes)

```js
(function(a, b) {
	console.log(arguments[0], a, arguments[1], arguments[3], b, arguments[2]);
})('bar', 42, false);
(function(a, b) {
	(() => {
		console.log(arguments[0], a, arguments[1], arguments[3], b, arguments[2]);
	})(10, 20, 30, 40);
})('bar', 42, false);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 (function(a, b) {
-	console.log(a, a, b, arguments[3], b, arguments[2]);
-})('bar', 42, false);
+	console.log(arguments[0], a, arguments[1], arguments[3], b, arguments[2]);
+})('bar', 42, !1);
 (function(a, b) {
 	(() => {
 		console.log(arguments[0], a, arguments[1], arguments[3], b, arguments[2]);
 	})(10, 20, 30, 40);
-})('bar', 42, false);
+})('bar', 42, !1);

```

## `terser/collapse_vars/double_def_2`

- size: oxc 28 vs reference 12 (+16 bytes)

```js
var a = x, a = a && y;
a();

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-(x && y)();
+var a = x, a = a && y;
+a();

```

## `terser/dead_code/global_fns`

- size: oxc 193 vs reference 177 (+16 bytes)

```js
Boolean(1, 2);
decodeURI(1, 2);
decodeURIComponent(1, 2);
Date(1, 2);
encodeURI(1, 2);
encodeURIComponent(1, 2);
Error(1, 2);
escape(1, 2);
EvalError(1, 2);
isFinite(1, 2);
isNaN(1, 2);
Number(1, 2);
Object(1, 2);
parseFloat(1, 2);
parseInt(1, 2);
RangeError(1, 2);
ReferenceError(1, 2);
String(1, 2);
SyntaxError(1, 2);
TypeError(1, 2);
unescape(1, 2);
URIError(1, 2);
try {
	Function(1, 2);
} catch (e) {
	console.log(e.name);
}
try {
	RegExp(1, 2);
} catch (e) {
	console.log(e.name);
}
try {
	Array(NaN);
} catch (e) {
	console.log(e.name);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
+unescape(1, 2);
 try {
 	Function(1, 2);
 } catch (e) {

```

## `terser/evaluate/optional_expect_when_expect_stdout_present`

- size: oxc 16 vs reference 0 (+16 bytes)

```js
console.log(5 % 3);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+console.log(2);

```

## `terser/functions/drop_lone_use_strict`

- size: oxc 84 vs reference 68 (+16 bytes)

```js
function f1() {
	'use strict';
}
function f2() {
	'use strict';
	function f3() {
		'use strict';
	}
}
(function f4() {
	'use strict';
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-function f1() {}
+function f1() {
+	'use strict';
+}
 function f2() {
 	'use strict';
 	function f3() {}

```

## `terser/if_return/issue_512`

- size: oxc 59 vs reference 43 (+16 bytes)

```js
function a() {
	if (b()) {
		c();
		return;
	}
	throw e;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 function a() {
-	if (!b()) throw e;
-	c();
+	if (b()) {
+		c();
+		return;
+	}
+	throw e;
 }

```

## `terser/issue_269/strings_concat`

- size: oxc 41 vs reference 25 (+16 bytes)

```js
f(String(x + 'str'), String('str' + x));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-f(x + 'str', 'str' + x);
+f(String(x + 'str'), String('str' + x));

```

## `terser/issue_t120/issue_t120_4`

- size: oxc 90 vs reference 74 (+16 bytes)

```js
for (var x = 1, t = (o) => {
	var i = +o;
	return console.log(i + i) && 0;
}; x--; t(2));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-for (var x = 1; x--; i = void 0, i = +2, console.log(i + i) && 0);
-var i;
+for (var x = 1, t = (o) => {
+	var i = +o;
+	return console.log(i + i) && 0;
+}; x--; t(2));

```

## `terser/pure_funcs/issue_3065_3`

- size: oxc 58 vs reference 42 (+16 bytes)

```js
function debug(msg) {
	console.log(msg);
}
debug((function() {
	console.log('PASS');
	return 'FAIL';
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 (function() {
 	console.log('PASS');
+	return 'FAIL';
 })();

```

## `terser/pure_funcs/issue_3065_4`

- size: oxc 58 vs reference 42 (+16 bytes)

```js
var debug = function(msg) {
	console.log(msg);
};
debug((function() {
	console.log('PASS');
	return 'FAIL';
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 (function() {
 	console.log('PASS');
+	return 'FAIL';
 })();

```

## `terser/reduce_vars/multi_def_3`

- size: oxc 79 vs reference 63 (+16 bytes)

```js
function f(a) {
	var b = 2;
	if (a) var b;
	else var b;
	console.log(b + 1);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f(a) {
+	var b = 2;
 	if (a) var b;
 	else var b;
-	console.log(3);
+	console.log(b + 1);
 }

```

## `terser/collapse_vars/cond_branch_2`

- size: oxc 279 vs reference 262 (+17 bytes)

```js
function f1(b, c) {
	var log = console.log;
	var a = ++c;
	if (b) b += a;
	log(a, b);
}
function f2(b, c) {
	var log = console.log;
	var a = ++c;
	b && (b += a);
	log(a, b);
}
function f3(b, c) {
	var log = console.log;
	var a = ++c;
	b ? b += a : b--;
	log(a, b);
}
f1(1, 2);
f2(3, 4);
f3(5, 6);

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,13 @@
 function f1(b, c) {
-	var a = ++c;
-	if (b) b += a;
-	(0, console.log)(a, b);
+	var log = console.log, a = ++c;
+	b && (b += a), log(a, b);
 }
 function f2(b, c) {
-	var a = ++c;
-	b && (b += a), (0, console.log)(a, b);
+	var log = console.log, a = ++c;
+	b && (b += a), log(a, b);
 }
 function f3(b, c) {
-	var a = ++c;
-	b ? b += a : b--, (0, console.log)(a, b);
+	var log = console.log, a = ++c;
+	b ? b += a : b--, log(a, b);
 }
 f1(1, 2), f2(3, 4), f3(5, 6);

```

## `terser/collapse_vars/issue_2436_4`

- size: oxc 83 vs reference 66 (+17 bytes)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
	var o;
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-var c;
-console.log({
-	x: (c = {
-		a: 1,
-		b: 2
-	}).a,
-	y: c.b
-});
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})({
+	a: 1,
+	b: 2
+}));

```

## `terser/collapse_vars/issue_2436_5`

- size: oxc 83 vs reference 66 (+17 bytes)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(o) {
	return {
		x: o.a,
		y: o.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-var o;
-console.log({
-	x: (o = {
-		a: 1,
-		b: 2
-	}).a,
-	y: o.b
-});
+console.log((function(o) {
+	return {
+		x: o.a,
+		y: o.b
+	};
+})({
+	a: 1,
+	b: 2
+}));

```

## `terser/dead_code/dead_code_2_should_warn_strict`

- size: oxc 80 vs reference 63 (+17 bytes)

```js
'use strict';
function f() {
	g();
	x = 10;
	throw new Error('foo');
	if (x) {
		y();
		var x;
		function g() {}
		(function() {
			var q;
			function y() {}
		})();
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 'use strict';
 function f() {
 	g();
+	x = 10;
 	throw Error('foo');
+	var x;
 }
 f();

```

## `terser/destructuring/export_unreferenced_declarations_2`

- size: oxc 129 vs reference 112 (+17 bytes)

```js
var { unused } = obj;
export const [{ a, b = 1 }] = obj;
export let [[{ c, d = 2 }]] = obj;
export var [, [{ e, f = 3 }]] = obj;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-obj;
+var { unused } = obj;
 export const [{ a, b = 1 }] = obj;
 export let [[{ c, d = 2 }]] = obj;
 export var [, [{ e, f = 3 }]] = obj;

```

## `terser/drop_unused/issue_1715_1`

- size: oxc 96 vs reference 79 (+17 bytes)

```js
var a = 1;
function f() {
	a++;
	try {
		x();
	} catch (a) {
		var a;
	}
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,11 @@
 var a = 1;
 function f() {
+	a++;
 	try {
 		x();
-	} catch (a) {}
+	} catch (a) {
+		var a;
+	}
 }
 f();
 console.log(a);

```

## `terser/hoist/hoist_vars`

- size: oxc 100 vs reference 83 (+17 bytes)

```js
function a() {
	bar();
	var var1;
	var var2;
}
function b(anArg) {
	bar();
	var var1;
	var anArg;
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 function a() {
-	var var1, var2;
 	bar();
+	var var1;
+	var var2;
 }
 function b(anArg) {
+	bar();
 	var var1;
-	bar();
+	var anArg;
 }

```

## `terser/properties/issue_2208_6`

- size: oxc 34 vs reference 17 (+17 bytes)

```js
console.log({ p: () => 42 }.p());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(42);
+console.log({ p: () => 42 }.p());

```

## `terser/properties/issue_2208_9`

- size: oxc 74 vs reference 57 (+17 bytes)

```js
a = 42;
console.log({ p: () => (function() {
	return this.a;
})() }.p());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 a = 42;
-console.log((function() {
+console.log({ p: () => (function() {
 	return this.a;
-})());
+})() }.p());

```

## `terser/reduce_vars/defun_var_3`

- size: oxc 80 vs reference 63 (+17 bytes)

```js
function a() {}
function b() {}
console.log(typeof a, typeof b);
var a = 42, b;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function a() {}
-console.log(typeof a, 'function');
-var a = 42;
+function b() {}
+console.log(typeof a, typeof b);
+var a = 42, b;

```

## `terser/collapse_vars/issue_2436_10`

- size: oxc 152 vs reference 134 (+18 bytes)

```js
var o = {
	a: 1,
	b: 2
};
function f(n) {
	o = { b: 3 };
	return n;
}
console.log((function(c) {
	return [
		c.a,
		f(c.b),
		c.b
	];
})(o).join(' '));

```

```diff
--- reference
+++ oxc
@@ -6,9 +6,10 @@
 	o = { b: 3 };
 	return n;
 }
-console.log((c = o, [
-	c.a,
-	f(c.b),
-	c.b
-]).join(' '));
-var c;
+console.log((function(c) {
+	return [
+		c.a,
+		f(c.b),
+		c.b
+	];
+})(o).join(' '));

```

## `terser/conditionals/cond_9`

- size: oxc 295 vs reference 277 (+18 bytes)

```js
function f(x, y) {
	g() ? x(1) : x(2);
	x ? (y || x)() : (y || x)();
	x ? y(a, b) : y(d, b, c);
	x ? y(a, b, c) : y(a, b, c);
	x ? y(a, b, c) : y(a, b, f);
	x ? y(a, b, c) : y(a, e, c);
	x ? y(a, b, c) : y(a, e, f);
	x ? y(a, b, c) : y(d, b, c);
	x ? y(a, b, c) : y(d, b, f);
	x ? y(a, b, c) : y(d, e, c);
	x ? y(a, b, c) : y(d, e, f);
}

```

```diff
--- reference
+++ oxc
@@ -3,8 +3,8 @@
 	(y || x)();
 	x ? y(a, b) : y(d, b, c);
 	y(a, b, c);
-	y(a, b, x ? c : f);
-	y(a, x ? b : e, c);
+	x ? y(a, b, c) : y(a, b, f);
+	x ? y(a, b, c) : y(a, e, c);
 	x ? y(a, b, c) : y(a, e, f);
 	y(x ? a : d, b, c);
 	x ? y(a, b, c) : y(d, b, f);

```

## `terser/dead_code/issue_2749`

- size: oxc 112 vs reference 94 (+18 bytes)

```js
var a = 2, c = 'PASS';
while (a--) (function() {
	return b ? c = 'FAIL' : b = 1;
	try {} catch (b) {
		var b;
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 var a = 2, c = 'PASS';
-while (a--) b = void 0, b ? c = 'FAIL' : b = 1;
-var b;
+for (; a--;) (function() {
+	return b ? c = 'FAIL' : b = 1;
+	var b;
+})();
 console.log(c);

```

## `terser/destructuring/destructuring_with_undefined_as_default_assignment`

- size: oxc 44 vs reference 26 (+18 bytes)

```js
[foo = undefined] = bar;
[foo = void 0] = bar;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-[foo] = bar;
-[foo] = bar;
+[foo = void 0] = bar;
+[foo = void 0] = bar;

```

## `terser/destructuring/empty_object_destructuring_misc`

- size: oxc 193 vs reference 175 (+18 bytes)

```js
let out = [], foo = (out.push(0), 1), {} = { k: 9 }, bar = out.push(2), { unused } = (out.push(3), { unused: 7 }), { a: b, prop, w, x: y, z } = { prop: 8 }, baz = (out.push(4), 5);
console.log(`${foo} ${prop} ${baz} ${JSON.stringify(out)}`);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
-let out = [], foo = (out.push(0), 1), { prop } = (out.push(2), out.push(3), { prop: 8 }), baz = (out.push(4), 5);
-console.log(`${foo} ${prop} ${baz} ${JSON.stringify(out)}`);
+let out = [];
+out.push(0);
+out.push(2);
+let { unused } = (out.push(3), { unused: 7 }), { a: b, prop, w, x: y, z } = { prop: 8 };
+out.push(4);
+console.log(`1 ${prop} 5 ${JSON.stringify(out)}`);

```

## `terser/drop_unused/issue_t161_top_retain_7`

- size: oxc 68 vs reference 50 (+18 bytes)

```js
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var y = 3;
-console.log(2, y, 4, 2 * y, 8, 4 * y);
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z);

```

## `terser/functions/unsafe_apply_2`

- size: oxc 171 vs reference 153 (+18 bytes)

```js
function foo() {
	console.log(a, b);
}
var bar = (function(a, b) {
	console.log(this, a, b);
})(function() {
	foo.apply('foo', ['bar']);
	bar.apply('foo', ['bar']);
})();

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 var bar = (function(a, b) {
 	console.log(this, a, b);
 })(function() {
-	foo('bar');
-	bar.call('foo', 'bar');
+	foo.apply('foo', ['bar']);
+	bar.apply('foo', ['bar']);
 })();

```

## `terser/issue_1443/unsafe_undefined`

- size: oxc 89 vs reference 71 (+18 bytes)

```js
function f(undefined) {
	return function() {
		if (a) return b;
		if (c) return d;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-function f(n) {
+function f(undefined) {
 	return function() {
-		return a ? b : c ? d : n;
+		if (a) return b;
+		if (c) return d;
 	};
 }

```

## `terser/issue_1588/unsafe_undefined`

- size: oxc 117 vs reference 99 (+18 bytes)

```js
var a, c;
console.log((function(undefined) {
	return function() {
		if (a) return b;
		if (c) return d;
	};
})()());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var a, c;
-console.log((function(n) {
+console.log((function(undefined) {
 	return function() {
-		return a ? b : c ? d : n;
+		if (a) return b;
+		if (c) return d;
 	};
 })()());

```

## `terser/labels/labels_3`

- size: oxc 71 vs reference 53 (+18 bytes)

```js
for (var i = 0; i < 5; ++i) {
	if (i < 3) continue;
	console.log(i);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (var i = 0; i < 5; ++i) i < 3 || console.log(i);
+for (var i = 0; i < 5; ++i) {
+	if (i < 3) continue;
+	console.log(i);
+}

```

## `terser/properties/issue_3188_1`

- size: oxc 118 vs reference 100 (+18 bytes)

```js
(function() {
	function f() {
		console.log(this.p);
	}
	(function() {
		var o = {
			p: 'PASS',
			f
		};
		o.f();
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,10 @@
 	function f() {
 		console.log(this.p);
 	}
-	({
-		p: 'PASS',
-		f
-	}).f();
-	var o;
+	(function() {
+		({
+			p: 'PASS',
+			f
+		}).f();
+	})();
 })();

```

## `terser/pure_funcs/issue_2705_4`

- size: oxc 33 vs reference 15 (+18 bytes)

```js
new x(), y();
w(), new x(), y();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-y();
-w(), y();
+new x(), y();
+w(), new x(), y();

```

## `terser/reduce_vars/escape_local_conditional`

- size: oxc 201 vs reference 183 (+18 bytes)

```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('PASS');
	else console.log('FAIL');
}
function baz(s) {
	function foo() {}
	function bar() {}
	return s ? foo : bar;
}
main();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('FAIL') : console.log('PASS');
+}
 function baz(s) {
-	return s ? function() {} : function() {};
+	function foo() {}
+	function bar() {}
+	return s ? foo : bar;
 }
-(function() {
-	var thing = baz();
-	if (thing !== (thing = baz())) console.log('PASS');
-	else console.log('FAIL');
-})();
+main();

```

## `terser/switch/issue_1680_2`

- size: oxc 127 vs reference 109 (+18 bytes)

```js
var a = 100, b = 10;
switch (b) {
	case a--: break;
	case b:
		var c;
		break;
	case a: break;
	case a--: break;
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 var a = 100, b = 10;
 switch (b) {
 	case a--: break;
-	case b: var c;
-	case a:
+	case b:
+		var c;
+		break;
+	case a: break;
 	case a--:
 }
 console.log(a, b);

```

## `terser/collapse_vars/conditional_2`

- size: oxc 98 vs reference 79 (+19 bytes)

```js
function f(a, b) {
	var c = a + 1, d = a + 2;
	return b ? c : d;
}
console.log(f(3, 0), f(4, 1));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function f(a, b) {
-	return b ? a + 1 : a + 2;
+	var c = a + 1, d = a + 2;
+	return b ? c : d;
 }
 console.log(f(3, 0), f(4, 1));

```

## `terser/functions/issue_2663_1`

- size: oxc 191 vs reference 172 (+19 bytes)

```js
(function() {
	var i, o = {};
	function createFn(j) {
		return function() {
			console.log(j);
		};
	}
	for (i in {
		a: 1,
		b: 2,
		c: 3
	}) o[i] = createFn(i);
	for (i in o) o[i]();
})();

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,14 @@
 (function() {
 	var i, o = {};
+	function createFn(j) {
+		return function() {
+			console.log(j);
+		};
+	}
 	for (i in {
 		a: 1,
 		b: 2,
 		c: 3
-	}) o[i] = function(j) {
-		return function() {
-			console.log(j);
-		};
-	}(i);
+	}) o[i] = createFn(i);
 	for (i in o) o[i]();
 })();

```

## `terser/identity/inline_identity_dont_lose_this_when_arg`

- size: oxc 81 vs reference 62 (+19 bytes)

```js
'use strict';
const id = (x) => x;
const func_bag = { leak };
leak(id(func_bag.leak));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 'use strict';
-const func_bag = { leak };
-leak(func_bag.leak);
+const id = (x) => x, func_bag = { leak };
+leak(id(func_bag.leak));

```

## `terser/issue_281/issue_1288_side_effects`

- size: oxc 40 vs reference 21 (+19 bytes)

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
@@ -1,3 +1,5 @@
 w;
-x || (x = {});
+x || (function() {
+	x = {};
+})();
 y;

```

## `terser/collapse_vars/collapse_vars_throw`

- size: oxc 137 vs reference 117 (+20 bytes)

```js
var f1 = function(x, y) {
	var a, b, r = x + y, q = r * r, z = q - r;
	a = z, b = 7;
	throw a + b;
};
try {
	f1(1, 2);
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var f1 = function(x, y) {
-	var r = x + y;
-	throw r * r - r + 7;
+	var a, b, r = x + y;
+	throw a = r * r - r, b = 7, a + b;
 };
 try {
 	f1(1, 2);

```

## `terser/collapse_vars/issue_2436_8`

- size: oxc 68 vs reference 48 (+20 bytes)

```js
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-var c;
-console.log({
-	x: (c = o).a,
-	y: c.b
-});
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(o));

```

## `terser/collapse_vars/issue_2436_9`

- size: oxc 74 vs reference 54 (+20 bytes)

```js
var o = console;
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-var c;
-console.log({
-	x: (c = console).a,
-	y: c.b
-});
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(console));

```

## `terser/evaluate/issue_2926_1`

- size: oxc 101 vs reference 81 (+20 bytes)

```js
(function f(a, not_counted = true, ...also_not_counted) {
	console.log(f.name.length, f.length);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function f(not_counted = true, ...also_not_counted) {
-	console.log(1, 1);
+(function f(a, not_counted = !0, ...also_not_counted) {
+	console.log(f.name.length, f.length);
 })();

```

## `terser/evaluate/issue_2926_2`

- size: oxc 45 vs reference 25 (+20 bytes)

```js
console.log(typeof function() {}.valueOf());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('function');
+console.log(typeof function() {}.valueOf());

```

## `terser/export/module_mangle_export_default_class`

- size: oxc 119 vs reference 99 (+20 bytes)

```js
export default class foo {}
export class bar {}
class baz {
	meth() {}
}
class qux {}
console.log(foo, bar, baz, qux);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-export default class s {}
+export default class foo {}
 export class bar {}
-console.log(s, bar, class {
+class baz {
 	meth() {}
-}, class {});
+}
+class qux {}
+console.log(foo, bar, baz, qux);

```

## `terser/functions/issue_203`

- size: oxc 122 vs reference 102 (+20 bytes)

```js
var m = {};
var fn = Function('require', 'module', 'exports', 'module.exports = 42;');
fn(null, m, m.exports);
console.log(m.exports);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 var m = {};
-var fn = Function('n,o', 'o.exports=42');
-fn(null, m, m.exports);
+Function('require', 'module', 'exports', 'module.exports = 42;')(null, m, m.exports);
 console.log(m.exports);

```

## `terser/harmony/array_literal_with_spread_3a`

- size: oxc 240 vs reference 220 (+20 bytes)

```js
console.log([10, 20][0]);
console.log([10, 20][1]);
console.log([10, 20][2]);
console.log([
	...[],
	10,
	20
][0]);
console.log([
	...[],
	10,
	20
][1]);
console.log([
	...[],
	10,
	20
][2]);
console.log([
	10,
	...[],
	20
][0]);
console.log([
	10,
	...[],
	20
][1]);
console.log([
	10,
	...[],
	20
][2]);
console.log([
	10,
	20,
	...[]
][0]);
console.log([
	10,
	20,
	...[]
][1]);
console.log([
	10,
	20,
	...[]
][2]);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 console.log(10);
 console.log(20);
-console.log(void 0);
+console.log([10, 20][2]);
 console.log(10);
 console.log(20);
-console.log(void 0);
+console.log([10, 20][2]);
 console.log(10);
 console.log(20);
-console.log(void 0);
+console.log([10, 20][2]);
 console.log(10);
 console.log(20);
-console.log(void 0);
+console.log([10, 20][2]);

```

## `terser/harmony/inline_arrow_using_arguments`

- size: oxc 103 vs reference 83 (+20 bytes)

```js
(function() {
	((x) => {
		console.log.apply(console, arguments), console.log(x);
	})(4);
})(3, 2, 1);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 (function() {
-	console.log.apply(console, arguments), console.log(4);
+	((x) => {
+		console.log.apply(console, arguments), console.log(x);
+	})(4);
 })(3, 2, 1);

```

## `terser/issue_1034/non_hoisted_function_after_return_2a_strict`

- size: oxc 145 vs reference 125 (+20 bytes)

```js
'use strict';
function foo(x) {
	if (x) {
		return bar(1);
		var a = not_called(1);
	} else {
		return bar(2);
		var b = not_called(2);
	}
	var c = bar(3);
	function bar(x) {
		return 7 - x;
	}
	function nope() {}
	return b || c;
}
console.log(foo(0), foo(1));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 'use strict';
 function foo(x) {
-	return bar(x ? 1 : 2);
+	if (x) return bar(1);
+	else return bar(2);
 	function bar(x) {
 		return 7 - x;
 	}

```

## `terser/issue_1034/non_hoisted_function_after_return_2b_strict`

- size: oxc 145 vs reference 125 (+20 bytes)

```js
'use strict';
function foo(x) {
	if (x) {
		return bar(1);
	} else {
		return bar(2);
		var b;
	}
	var c = bar(3);
	function bar(x) {
		return 7 - x;
	}
	return b || c;
}
console.log(foo(0), foo(1));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 'use strict';
 function foo(x) {
-	return bar(x ? 1 : 2);
+	if (x) return bar(1);
+	else return bar(2);
 	function bar(x) {
 		return 7 - x;
 	}

```

## `terser/issue_t120/issue_t120_3`

- size: oxc 79 vs reference 59 (+20 bytes)

```js
for (var t = (o) => {
	var i = +o;
	return console.log(i + i) && 0;
}; t(1););

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-for (; i = void 0, i = +1, console.log(i + i), 0;);
-var i;
+for (var t = (o) => {
+	var i = +o;
+	return console.log(i + i) && 0;
+}; t(1););

```

## `terser/pure_funcs/func`

- size: oxc 61 vs reference 41 (+20 bytes)

```js
function f(a, b) {
	Math.floor(a / b);
	Math.floor(c / b);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f(a, b) {
+	Math.floor(a / b);
 	Math.floor(c / b);
 }

```

## `terser/switch/if_else6`

- size: oxc 51 vs reference 31 (+20 bytes)

```js
switch (1) {
	case bar: bar();
	case 1: other();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if (1 === bar) bar();
-other();
+switch (1) {
+	case bar: bar();
+	case 1: other();
+}

```

## `terser/arrow/call_args_drop_param`

- size: oxc 53 vs reference 32 (+21 bytes)

```js
const a = 1;
console.log(a);
+(function(a) {
	return a;
})(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-const a = 1;
 console.log(1);
-b;
++(function(a) {
+	return a;
+})(1, b);

```

## `terser/evaluate/call_args_drop_param`

- size: oxc 53 vs reference 32 (+21 bytes)

```js
const a = 1;
console.log(a);
+(function(a) {
	return a;
})(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-const a = 1;
 console.log(1);
-b;
++(function(a) {
+	return a;
+})(1, b);

```

## `terser/issue_t120/issue_t120_5`

- size: oxc 90 vs reference 69 (+21 bytes)

```js
for (var x = 1, t = (o) => {
	var i = +o;
	return console.log(i + i) && 0;
}; x--;) t(3);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-for (var x = 1; x--;) i = void 0, i = +3, console.log(i + i);
-var i;
+for (var x = 1, t = (o) => {
+	var i = +o;
+	return console.log(i + i) && 0;
+}; x--;) t(3);

```

## `terser/labels/labels_9`

- size: oxc 49 vs reference 28 (+21 bytes)

```js
out: while (foo) {
	x();
	y();
	continue out;
	z();
	k();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-while (foo) {
+out: for (; foo;) {
 	x();
 	y();
+	continue out;
 }

```

## `terser/loops/evaluate`

- size: oxc 54 vs reference 33 (+21 bytes)

```js
while (true) {
	a();
}
while (false) {
	b();
}
do {
	c();
} while (true);
do {
	d();
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 for (;;) a();
-for (;;) c();
-d();
+do
+	c();
+while (1);
+do
+	d();
+while (0);

```

## `terser/reduce_vars/issue_2757_2`

- size: oxc 53 vs reference 32 (+21 bytes)

```js
(function() {
	let bar;
	const unused = function() {
		bar = true;
	};
	if (!bar) {
		console.log(1);
	}
	console.log(2);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(1), console.log(2);
+(function() {
+	console.log(1), console.log(2);
+})();

```

## `terser/reduce_vars/pure_getters_3`

- size: oxc 21 vs reference 0 (+21 bytes)

```js
var a;
var a = a && a.b;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+var a, a = a && a.b;

```

## `terser/reduce_vars/var_assign_1`

- size: oxc 37 vs reference 16 (+21 bytes)

```js
!(function() {
	var a;
	a = 2;
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(2);
+(function() {
+	console.log(2);
+})();

```

## `terser/switch/if_else2`

- size: oxc 56 vs reference 35 (+21 bytes)

```js
switch (foo) {
	case 'bar': bar();
	default: other();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if ('bar' === foo) bar();
-other();
+switch (foo) {
+	case 'bar': bar();
+	default: other();
+}

```

## `terser/switch/if_else4`

- size: oxc 56 vs reference 35 (+21 bytes)

```js
switch (foo) {
	default: other();
	case 'bar': bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if ('bar' !== foo) other();
-bar();
+switch (foo) {
+	default: other();
+	case 'bar': bar();
+}

```

## `terser/switch/keep_default`

- size: oxc 60 vs reference 39 (+21 bytes)

```js
switch (foo) {
	case 'bar': baz();
	default:
		something();
		break;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if ('bar' === foo) baz();
-something();
+switch (foo) {
+	case 'bar': baz();
+	default: something();
+}

```

## `terser/switch/turn_into_if_2`

- size: oxc 84 vs reference 63 (+21 bytes)

```js
switch (id(1)) {
	case id(2): console.log('FAIL');
	default: console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if (id(1) === id(2)) console.log('FAIL');
-console.log('PASS');
+switch (id(1)) {
+	case id(2): console.log('FAIL');
+	default: console.log('PASS');
+}

```

## `terser/transform/label_if_break`

- size: oxc 21 vs reference 0 (+21 bytes)

```js
L: if (true) {
	a;
	break L;
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+L: {
+	a;
+	break L;
+}

```

## `terser/arguments/replace_index`

- size: oxc 420 vs reference 398 (+22 bytes)

```js
var arguments = [];
console.log(arguments[0]);
(function() {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(a, b) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(arguments) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function() {
	var arguments;
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(a, b) {
-	console.log(b, b, arguments.foo);
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(arguments) {
 	console.log(arguments[1], arguments[1], arguments.foo);

```

## `terser/arguments/replace_index_strict`

- size: oxc 190 vs reference 168 (+22 bytes)

```js
'use strict';
(function() {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(a, b) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);

```

```diff
--- reference
+++ oxc
@@ -3,5 +3,5 @@
 	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(a, b) {
-	console.log(b, b, arguments.foo);
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);

```

## `terser/arrays/index`

- size: oxc 41 vs reference 19 (+22 bytes)

```js
var a = [1, 2];
console.log(a[0], a[1]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(1, 2);
+var a = [1, 2];
+console.log(a[0], a[1]);

```

## `terser/collapse_vars/issue_2436_1`

- size: oxc 83 vs reference 61 (+22 bytes)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-var o = {
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})({
 	a: 1,
 	b: 2
-};
-console.log({
-	x: o.a,
-	y: o.b
-});
+}));

```

## `terser/issue_597/beautify_off_1`

- size: oxc 105 vs reference 83 (+22 bytes)

```js
var NaN;
console.log(null, undefined, Infinity, NaN, Infinity * undefined, Infinity.toString(), NaN.toString(), (Infinity * undefined).toString());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var NaN;
-console.log(null, void 0, 1 / 0, 0 / 0, 0 / 0, 'Infinity', 'NaN', 'NaN');
+console.log(null, void 0, Infinity, NaN, Infinity * void 0, 'Infinity', NaN.toString(), 'NaN');

```

## `terser/issue_597/beautify_on_1`

- size: oxc 105 vs reference 83 (+22 bytes)

```js
var NaN;
console.log(null, undefined, Infinity, NaN, Infinity * undefined, Infinity.toString(), NaN.toString(), (Infinity * undefined).toString());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var NaN;
-console.log(null, void 0, 1 / 0, 0 / 0, 0 / 0, 'Infinity', 'NaN', 'NaN');
+console.log(null, void 0, Infinity, NaN, Infinity * void 0, 'Infinity', NaN.toString(), 'NaN');

```

## `terser/labels/labels_2`

- size: oxc 74 vs reference 52 (+22 bytes)

```js
out: {
	if (foo) print('stuff');
	else break out;
	console.log('here');
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-if (foo) {
-	print('stuff');
+out: {
+	if (foo) print('stuff');
+	else break out;
 	console.log('here');
 }

```

## `terser/loops/issue_2740_2`

- size: oxc 27 vs reference 5 (+22 bytes)

```js
L1: while (x()) {
	break L1;
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-x();
+L1: for (; x();) break L1;

```

## `terser/properties/literal_duplicate_key_side_effects`

- size: oxc 66 vs reference 44 (+22 bytes)

```js
console.log({
	a: 'FAIL',
	a: console.log ? 'PASS' : 'FAIL'
}.a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(console.log ? 'PASS' : 'FAIL');
+console.log({
+	a: 'FAIL',
+	a: console.log ? 'PASS' : 'FAIL'
+}.a);

```

## `terser/pure_funcs/issue_526_1`

- size: oxc 64 vs reference 42 (+22 bytes)

```js
new ((g()) || (h()))(x(), y());
new ((a()) || (b()))(c(), d());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-x(), y();
+new ((g()) || (h()))(x(), y());
 new ((a()) || (b()))(c(), d());

```

## `terser/conditionals/hoist_decl`

- size: oxc 50 vs reference 27 (+23 bytes)

```js
if (x()) {
	var a;
	y();
} else {
	z();
	var b;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,7 @@
-var a, b;
-x() ? y() : z();
+if (x()) {
+	var a;
+	y();
+} else {
+	z();
+	var b;
+}

```

## `terser/functions/issue_3016_1`

- size: oxc 89 vs reference 66 (+23 bytes)

```js
var b = 1;
do {
	(function(a) {
		return a[b];
		var a;
	})(3);
} while (0);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var b = 1;
-do {
-	a = 3, a[b];
-} while (0);
-var a;
+do
+	(function(a) {
+		return a[b];
+		var a;
+	})(3);
+while (0);
 console.log(b);

```

## `terser/functions/issue_3016_2`

- size: oxc 89 vs reference 66 (+23 bytes)

```js
var b = 1;
do {
	(function(a) {
		return a[b];
		try {
			a = 2;
		} catch (a) {
			var a;
		}
	})(3);
} while (0);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var b = 1;
-do {
-	a = 3, a[b];
-} while (0);
-var a;
+do
+	(function(a) {
+		return a[b];
+		var a;
+	})(3);
+while (0);
 console.log(b);

```

## `terser/identity/inline_identity_undefined`

- size: oxc 52 vs reference 29 (+23 bytes)

```js
const id = (x) => x;
console.log(id(), id(undefined));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(void 0, void 0);
+const id = (x) => x;
+console.log(id(), id(void 0));

```

## `terser/issue_281/negate_iife_3`

- size: oxc 67 vs reference 44 (+23 bytes)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-t ? console.log(true) : console.log(false);
+(function() {
+	return t;
+})() ? console.log(!0) : console.log(!1);

```

## `terser/issue_281/negate_iife_3_off`

- size: oxc 67 vs reference 44 (+23 bytes)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-t ? console.log(true) : console.log(false);
+(function() {
+	return t;
+})() ? console.log(!0) : console.log(!1);

```

## `terser/pure_getters/set_immutable_6`

- size: oxc 75 vs reference 52 (+23 bytes)

```js
var a = 1;
a.foo += '';
if (a.foo) console.log('FAIL');
else console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-1 .foo ? console.log('FAIL') : console.log('PASS');
+var a = 1;
+a.foo += '';
+a.foo ? console.log('FAIL') : console.log('PASS');

```

## `terser/reduce_vars/unsafe_evaluate_object_1`

- size: oxc 140 vs reference 117 (+23 bytes)

```js
function f0() {
	var a = 1;
	var b = {};
	b[a] = 2;
	console.log(a + 3);
}
function f1() {
	var a = { b: 1 };
	a.b = 2;
	console.log(a.b + 3);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 function f0() {
-	var a = 1;
-	console.log(4);
+	var a = 1, b = {};
+	b[a] = 2;
+	console.log(a + 3);
 }
 function f1() {
 	var a = { b: 1 };

```

## `terser/reduce_vars/unsafe_evaluate_side_effect_free_2`

- size: oxc 84 vs reference 61 (+23 bytes)

```js
console.log((function() {
	var o = { p: 1 }, a = [o];
	console.log(a[0].p);
	return o.p;
})());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 console.log((function() {
-	console.log(1);
-	return 1;
+	var o = { p: 1 };
+	console.log(o.p);
+	return o.p;
 })());

```

## `terser/switch/constant_switch_8`

- size: oxc 65 vs reference 42 (+23 bytes)

```js
OUT: switch (1) {
	case 1:
		x();
		for (;;) break OUT;
		y();
		break;
	case 1 + 1: bar();
	default: def();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-OUT: {
-	x();
-	for (;;) break OUT;
-	y();
+OUT: switch (1) {
+	case 1:
+		x();
+		for (;;) break OUT;
+		y();
 }

```

## `terser/template_string/tagged_template_function_inline_2`

- size: oxc 23 vs reference 0 (+23 bytes)

```js
var tpl = function() {};
tpl`test`;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+(function() {})`test`;

```

## `terser/unicode/issue_2242_3`

- size: oxc 61 vs reference 38 (+23 bytes)

```js
console.log('\ud83d' + '\ude00', '\ud83d' + '@' + '\ude00');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('😀', '\ud83d@\ude00');
+console.log('\ud83d' + '\ude00', '\ud83d' + '@' + '\ude00');

```

## `terser/unicode/issue_2242_4`

- size: oxc 61 vs reference 38 (+23 bytes)

```js
console.log('\ud83d' + '\ude00', '\ud83d' + '@' + '\ude00');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('😀', '\ud83d@\ude00');
+console.log('\ud83d' + '\ude00', '\ud83d' + '@' + '\ude00');

```

## `terser/destructuring/unused_destructuring_decl_5`

- size: oxc 184 vs reference 160 (+24 bytes)

```js
const { a, b: c, d = new Object(1) } = { b: 7 };
let { e, f: g, h = new Object(2) } = { e: 8 };
var { w, x: y, z = new Object(3) } = {
	w: 4,
	x: 5,
	y: 6
};
console.log(c, e, z + 0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-const { a, b: c, d = Object(1) } = { b: 7 };
-let { e, h = Object(2) } = { e: 8 };
-var { w, z = Object(3) } = {
+const { a, b: c, d = new Object(1) } = { b: 7 };
+let { e, f: g, h = new Object(2) } = { e: 8 };
+var { w, x: y, z = new Object(3) } = {
 	w: 4,
 	x: 5,
 	y: 6

```

## `terser/functions/issue_1841_1`

- size: oxc 108 vs reference 84 (+24 bytes)

```js
var b = 10;
!(function(arg) {
	for (var key in 'hi') var n = arg.baz, n = [b = 42];
})(--b);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var b = 10;
-!function(arg) {
-	for (var key in 'hi') b = 42;
-}(--b);
+(function(arg) {
+	for (var key in 'hi') var n = arg.baz, n = [b = 42];
+})(--b);
 console.log(b);

```

## `terser/functions/issue_1841_2`

- size: oxc 108 vs reference 84 (+24 bytes)

```js
var b = 10;
!(function(arg) {
	for (var key in 'hi') var n = arg.baz, n = [b = 42];
})(--b);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var b = 10;
-!function(arg) {
-	for (var key in 'hi') b = 42;
-}(--b);
+(function(arg) {
+	for (var key in 'hi') var n = arg.baz, n = [b = 42];
+})(--b);
 console.log(b);

```

## `terser/functions/issue_2737_1`

- size: oxc 76 vs reference 52 (+24 bytes)

```js
(function(a) {
	while (a());
})(function f() {
	console.log(typeof f);
});

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-while (function f() {
+(function(a) {
+	for (; a(););
+})(function f() {
 	console.log(typeof f);
-}());
+});

```

## `terser/harmony/array_literal_with_spread_2a`

- size: oxc 146 vs reference 122 (+24 bytes)

```js
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
]['length']);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][0]);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][1]);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][2]);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][3]);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][4]);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][5]);

```

```diff
--- reference
+++ oxc
@@ -4,4 +4,10 @@
 console.log(30);
 console.log(40);
 console.log(50);
-console.log(void 0);
+console.log([
+	10,
+	20,
+	30,
+	40,
+	50
+][5]);

```

## `terser/labels/labels_1`

- size: oxc 51 vs reference 27 (+24 bytes)

```js
out: {
	if (foo) break out;
	console.log('bar');
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-foo || console.log('bar');
+out: {
+	if (foo) break out;
+	console.log('bar');
+}

```

## `terser/reduce_vars/issue_2757_1`

- size: oxc 55 vs reference 31 (+24 bytes)

```js
let u;
(function() {
	let v;
	console.log(u, v);
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
 let u;
-console.log(u, void 0);
+(function() {
+	let v;
+	console.log(u, v);
+})();

```

## `terser/switch/issue_1680_1`

- size: oxc 134 vs reference 110 (+24 bytes)

```js
function f(x) {
	console.log(x);
	return x + 1;
}
switch (2) {
	case f(0):
	case f(1): f(2);
	case 2:
	case f(3):
	case f(4): f(5);
}

```

```diff
--- reference
+++ oxc
@@ -5,5 +5,7 @@
 switch (2) {
 	case f(0):
 	case f(1): f(2);
-	case 2: f(5);
+	case 2:
+	case f(3):
+	case f(4): f(5);
 }

```

## `terser/collapse_vars/issue_2436_3`

- size: oxc 120 vs reference 95 (+25 bytes)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	o = {
		a: 3,
		b: 4
	};
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,14 @@
-var c, o = {
+var o = {
 	a: 1,
 	b: 2
 };
-console.log((c = o, o = {
-	a: 3,
-	b: 4
-}, {
-	x: c.a,
-	y: c.b
-}));
+console.log((function(c) {
+	o = {
+		a: 3,
+		b: 4
+	};
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(o));

```

## `terser/evaluate/array_slice_index`

- size: oxc 41 vs reference 16 (+25 bytes)

```js
console.log([
	1,
	2,
	3
].slice(1)[1]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(3);
+console.log([
+	1,
+	2,
+	3
+].slice(1)[1]);

```

## `terser/evaluate/issue_2231_3`

- size: oxc 45 vs reference 20 (+25 bytes)

```js
console.log(Object.keys({ foo: 'bar' })[0]);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('foo');
+console.log(Object.keys({ foo: 'bar' })[0]);

```

## `terser/evaluate/issue_2916_2`

- size: oxc 112 vs reference 87 (+25 bytes)

```js
var c = 'FAIL';
(function(b) {
	(function(d) {
		d[0] = 1;
	})(b);
	+b && (c = 'PASS');
})([]);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var c = 'FAIL';
 (function(b) {
-	b[0] = 1;
+	(function(d) {
+		d[0] = 1;
+	})(b);
 	+b && (c = 'PASS');
 })([]);
 console.log(c);

```

## `terser/evaluate/unsafe_string_bad_index`

- size: oxc 59 vs reference 34 (+25 bytes)

```js
console.log('1234'.a + 1, '1234'['a'] + 1, '1234'[3.14] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(0 / 0, 0 / 0, 0 / 0);
+console.log('1234'.a + 1, '1234'.a + 1, '1234'[3.14] + 1);

```

## `terser/issue_1750/case_1`

- size: oxc 95 vs reference 70 (+25 bytes)

```js
var a = 0, b = 1;
switch (true) {
	case a || true:
	default: b = 2;
	case true:
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 var a = 0, b = 1;
-if (true === (a || true)) b = 2;
+switch (!0) {
+	case a || !0:
+	default: b = 2;
+	case !0:
+}
 console.log(a, b);

```

## `terser/object/prop_arrow_with_this`

- size: oxc 304 vs reference 279 (+25 bytes)

```js
function run(arg) {
	console.log(arg === this ? 'global' : arg === foo ? 'foo' : arg);
}
var foo = {
	func_no_this: function() {
		run();
	},
	func_with_this: function() {
		run(this);
	},
	arrow_no_this: () => {
		run();
	},
	arrow_with_this: () => {
		run(this);
	}
};
for (var key in foo) foo[key]();

```

```diff
--- reference
+++ oxc
@@ -2,13 +2,13 @@
 	console.log(arg === this ? 'global' : arg === foo ? 'foo' : arg);
 }
 var foo = {
-	func_no_this() {
+	func_no_this: function() {
 		run();
 	},
-	func_with_this() {
+	func_with_this: function() {
 		run(this);
 	},
-	arrow_no_this() {
+	arrow_no_this: () => {
 		run();
 	},
 	arrow_with_this: () => {

```

## `terser/properties/issue_2208_7`

- size: oxc 42 vs reference 17 (+25 bytes)

```js
console.log({ p() {
	return 42;
} }.p());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(42);
+console.log({ p() {
+	return 42;
+} }.p());

```

## `terser/reduce_vars/issue_2916`

- size: oxc 112 vs reference 87 (+25 bytes)

```js
var c = 'FAIL';
(function(b) {
	(function(d) {
		d[0] = 1;
	})(b);
	+b && (c = 'PASS');
})([]);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var c = 'FAIL';
 (function(b) {
-	b[0] = 1;
+	(function(d) {
+		d[0] = 1;
+	})(b);
 	+b && (c = 'PASS');
 })([]);
 console.log(c);

```

## `terser/switch/constant_switch_9`

- size: oxc 92 vs reference 67 (+25 bytes)

```js
OUT: switch (1) {
	case 1:
		x();
		for (;;) if (foo) break OUT;
		y();
	case 1 + 1: bar();
	default: def();
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
-OUT: {
-	x();
-	for (;;) if (foo) break OUT;
-	y();
-	bar();
-	def();
+OUT: switch (1) {
+	case 1:
+		x();
+		for (;;) if (foo) break OUT;
+		y();
+		bar();
+		def();
 }

```

## `terser/arrays/index_length`

- size: oxc 45 vs reference 19 (+26 bytes)

```js
var a = [1, 2];
console.log(a[0], a.length);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(1, 2);
+var a = [1, 2];
+console.log(a[0], a.length);

```

## `terser/destructuring/issue_3205_3`

- size: oxc 91 vs reference 65 (+26 bytes)

```js
(function() {
	function f(o, { a: x } = o) {
		console.log(x);
	}
	f({ a: 'PASS' });
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
-(function(o, { a: x } = o) {
-	console.log(x);
-})({ a: 'PASS' });
+(function() {
+	function f(o, { a: x } = o) {
+		console.log(x);
+	}
+	f({ a: 'PASS' });
+})();

```

## `terser/drop_unused/var_catch_toplevel`

- size: oxc 97 vs reference 71 (+26 bytes)

```js
function f() {
	a--;
	try {
		a++;
		x();
	} catch (a) {
		if (a) var a;
		var a = 10;
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
-!(function() {
-	0;
+function f() {
+	a--;
 	try {
-		0;
+		a++;
 		x();
 	} catch (a) {
-		var a;
+		if (a) var a;
+		var a = 10;
 	}
-})();
+}
+f();

```

## `terser/export/name_cache_mangle_export_default_function`

- size: oxc 146 vs reference 120 (+26 bytes)

```js
export default function foo() {
	return 1;
}
export function bar() {
	return 2;
}
function qux() {
	return 3;
}
console.log(foo(), bar(), qux());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
-export default function _$FOO$_() {
+export default function foo() {
 	return 1;
 }
 export function bar() {
 	return 2;
 }
-console.log(_$FOO$_(), bar(), 3);
+function qux() {
+	return 3;
+}
+console.log(foo(), bar(), qux());

```

## `terser/functions/issue_3018`

- size: oxc 135 vs reference 109 (+26 bytes)

```js
var b = 1, c = 'PASS';
do {
	(function() {
		(function(a) {
			a = 0 != (a && (c = 'FAIL'));
		})();
	})();
} while (b--);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,9 @@
 var b = 1, c = 'PASS';
-do {
-	a = void 0, a = 0 != (a && (c = 'FAIL'));
-} while (b--);
-var a;
+do
+	(function() {
+		(function(a) {
+			a = (a && (c = 'FAIL')) != 0;
+		})();
+	})();
+while (b--);
 console.log(c);

```

## `terser/functions/use_before_init_in_loop`

- size: oxc 138 vs reference 112 (+26 bytes)

```js
var a = 'PASS';
for (var b = 2; --b >= 0;) (function() {
	var c = (function() {
		return 1;
	})(c && (a = 'FAIL'));
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var a = 'PASS';
 for (var b = 2; --b >= 0;) (function() {
-	var c = (c && (a = 'FAIL'), 1);
+	var c = (function() {
+		return 1;
+	})(c && (a = 'FAIL'));
 })();
 console.log(a);

```

## `terser/identity/inline_identity_async`

- size: oxc 89 vs reference 63 (+26 bytes)

```js
const id = (x) => x;
id(async () => await 1)();
id(async (x) => await console.log(2))();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-(async () => await 1)();
-(async () => await console.log(2))();
+const id = (x) => x;
+id(async () => await 1)();
+id(async (x) => await console.log(2))();

```

## `terser/negate_iife/negate_iife_2`

- size: oxc 39 vs reference 13 (+26 bytes)

```js
(function() {
	return {};
})().x = 10;

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-({}).x = 10;
+(function() {
+	return {};
+})().x = 10;

```

## `terser/switch/if_else5`

- size: oxc 62 vs reference 36 (+26 bytes)

```js
switch (1) {
	case bar:
		bar();
		break;
	case 1: other();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
-if (1 === bar) bar();
-else other();
+switch (1) {
+	case bar:
+		bar();
+		break;
+	case 1: other();
+}

```

## `terser/switch/issue_1750`

- size: oxc 70 vs reference 44 (+26 bytes)

```js
var a = 0, b = 1;
switch (true) {
	case a, true:
	default: b = 2;
	case true:
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var a = 0, b = 1;
-b = 2;
+switch (!0) {
+	case !0: b = 2;
+}
 console.log(a, b);

```

## `terser/destructuring/issue_3205_2`

- size: oxc 95 vs reference 68 (+27 bytes)

```js
(function() {
	function f() {
		var o = { a: 'PASS' }, { a: x } = o;
		console.log(x);
	}
	f();
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 (function() {
-	var { a: x } = { a: 'PASS' };
-	console.log(x);
+	function f() {
+		var { a: x } = { a: 'PASS' };
+		console.log(x);
+	}
+	f();
 })();

```

## `terser/destructuring/issue_3205_4`

- size: oxc 97 vs reference 70 (+27 bytes)

```js
(function() {
	function f(o) {
		var { a: x } = o;
		console.log(x);
	}
	f({ a: 'PASS' });
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-(function(o) {
-	var { a: x } = o;
-	console.log(x);
-})({ a: 'PASS' });
+(function() {
+	function f(o) {
+		var { a: x } = o;
+		console.log(x);
+	}
+	f({ a: 'PASS' });
+})();

```

## `terser/destructuring/issue_3205_5`

- size: oxc 97 vs reference 70 (+27 bytes)

```js
(function() {
	function f(g) {
		var o = g, { a: x } = o;
		console.log(x);
	}
	f({ a: 'PASS' });
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-!(function(g) {
-	var { a: x } = { a: 'PASS' };
-	console.log(x);
+(function() {
+	function f(g) {
+		var { a: x } = g;
+		console.log(x);
+	}
+	f({ a: 'PASS' });
 })();

```

## `terser/functions/issue_2620_3`

- size: oxc 180 vs reference 153 (+27 bytes)

```js
var c = 'FAIL';
(function() {
	function f(a, NaN) {
		function g() {
			switch (a) {
				case a: break;
				case c = 'PASS', NaN: break;
			}
		}
		g();
	}
	f(0 / 0);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,14 @@
 var c = 'FAIL';
-!(function(a, NaN) {
-	(function() {
-		switch (a) {
-			case a: break;
-			case c = 'PASS', NaN: break;
+(function() {
+	function f(a, NaN) {
+		function g() {
+			switch (a) {
+				case a: break;
+				case c = 'PASS', NaN:
+			}
 		}
-	})();
-})(NaN);
+		g();
+	}
+	f(NaN);
+})();
 console.log(c);

```

## `terser/functions/issue_2737_2`

- size: oxc 98 vs reference 71 (+27 bytes)

```js
(function(bar) {
	for (; bar();) break;
})(function qux() {
	return console.log('PASS'), qux;
});

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-for (; function qux() {
+(function(bar) {
+	for (; bar();) break;
+})(function qux() {
 	return console.log('PASS'), qux;
-}();) break;
+});

```

## `terser/issue_281/ref_scope`

- size: oxc 125 vs reference 98 (+27 bytes)

```js
console.log((function() {
	var a = 1, b = 2, c = 3;
	var a = c++, b = b /= a;
	return (function() {
		return a;
	})() + b;
})());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-console.log(function() {
-	var a = 1, b = 2, c = 3;
-	var a = c++, b = b /= a;
-	return a + b;
-}());
+console.log((function() {
+	var a = 1, b = 2, c = 3, a = c++, b = b /= a;
+	return (function() {
+		return a;
+	})() + b;
+})());

```

## `terser/labels/labels_4`

- size: oxc 80 vs reference 53 (+27 bytes)

```js
out: for (var i = 0; i < 5; ++i) {
	if (i < 3) continue out;
	console.log(i);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (var i = 0; i < 5; ++i) i < 3 || console.log(i);
+out: for (var i = 0; i < 5; ++i) {
+	if (i < 3) continue out;
+	console.log(i);
+}

```

## `terser/properties/evaluate_array_length`

- size: oxc 103 vs reference 76 (+27 bytes)

```js
a = [
	1,
	2,
	3
].length;
a = [
	1,
	2,
	3
].join()['len' + 'gth'];
a = [
	1,
	2,
	b
].length;
a = [
	1,
	2,
	3
].join(b).length;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,12 @@
 a = 3;
-a = 5;
 a = [
 	1,
 	2,
+	3
+].join().length;
+a = [
+	1,
+	2,
 	b
 ].length;
 a = [

```

## `terser/pure_funcs/issue_2705_5`

- size: oxc 42 vs reference 15 (+27 bytes)

```js
[new x()];
[new x(), y()];
[
	w(),
	new x(),
	y()
];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-y();
-w(), y();
+new x();
+new x(), y();
+w(), new x(), y();

```

## `terser/reduce_vars/toplevel_on_loops_1`

- size: oxc 79 vs reference 52 (+27 bytes)

```js
function bar() {
	console.log('bar:', --x);
}
var x = 3;
do {
	bar();
} while (x);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
+function bar() {
+	console.log('bar:', --x);
+}
 var x = 3;
 do
-	console.log('bar:', --x);
+	bar();
 while (x);

```

## `terser/switch/if_else`

- size: oxc 67 vs reference 40 (+27 bytes)

```js
switch (foo) {
	case 'bar':
		bar();
		break;
	default: other();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
-if ('bar' === foo) bar();
-else other();
+switch (foo) {
+	case 'bar':
+		bar();
+		break;
+	default: other();
+}

```

## `terser/switch/if_else3`

- size: oxc 67 vs reference 40 (+27 bytes)

```js
switch (foo) {
	default:
		other();
		break;
	case 'bar': bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
-if ('bar' === foo) bar();
-else other();
+switch (foo) {
+	default:
+		other();
+		break;
+	case 'bar': bar();
+}

```

## `terser/comments/preserve_comments_by_default`

- size: oxc 88 vs reference 60 (+28 bytes)

```js
var foo = {};
/* @license */
// @lic
/**! foo */
/*! foo */
/* @copyright …info… */

```

```diff
--- reference
+++ oxc
@@ -3,3 +3,4 @@
 // @lic
 /**! foo */
 /*! foo */
+/* @copyright …info… */

```

## `terser/comparing/issue_2857_6`

- size: oxc 168 vs reference 140 (+28 bytes)

```js
function f(a) {
	if ({}.b === undefined || {}.b === null) return a.b !== undefined && a.b !== null;
}
console.log(f({
	a: [null],
	get b() {
		return this.a.shift();
	}
}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a) {
-	if (true) return void 0 !== a.b && null !== a.b;
+	if ({}.b === void 0 || {}.b === null) return a.b !== void 0 && a.b !== null;
 }
 console.log(f({
 	a: [null],

```

## `terser/issue_281/wrap_iife_in_expression`

- size: oxc 41 vs reference 13 (+28 bytes)

```js
foo = (function() {
	return bar();
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-foo = bar();
+foo = (function() {
+	return bar();
+})();

```

## `terser/issue_640/conditional`

- size: oxc 96 vs reference 68 (+28 bytes)

```js
pure(1 | a() ? 2 & b() : 7 ^ c());
pure(1 | a() ? 2 & b() : 5);
pure(1 | a() ? 4 : 7 ^ c());
pure(1 | a() ? 4 : 5);
pure(3 ? 2 & b() : 7 ^ c());
pure(3 ? 2 & b() : 5);
pure(3 ? 4 : 7 ^ c());
pure(3 ? 4 : 5);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-1 | a() ? b() : c();
-1 | a() && b();
-1 | a() || c();
-a();
-b();
-b();
+1 | a() ? 2 & b() : 7 ^ c();
+1 | a() && 2 & b();
+1 | a() || 7 ^ c();
+1 | a();
+2 & b();
+2 & b();

```

## `terser/negate_iife/negate_iife_3_evaluate`

- size: oxc 47 vs reference 19 (+28 bytes)

```js
(function() {
	return true;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(true);
+console.log(!!(function() {
+	return !0;
+})());

```

## `terser/negate_iife/negate_iife_3_off_evaluate`

- size: oxc 47 vs reference 19 (+28 bytes)

```js
(function() {
	return true;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(true);
+console.log(!!(function() {
+	return !0;
+})());

```

## `terser/reduce_vars/defun_reference`

- size: oxc 129 vs reference 101 (+28 bytes)

```js
function f() {
	function g() {
		x();
		return a;
	}
	var a = h();
	var b = 2;
	return a + b;
	function h() {
		y();
		return b;
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,10 @@
 		x();
 		return a;
 	}
-	var a = (y(), 2);
-	var b = 2;
-	return a + 2;
+	var a = h(), b = 2;
+	return a + b;
+	function h() {
+		y();
+		return b;
+	}
 }

```

## `terser/reduce_vars/issue_3042_2`

- size: oxc 470 vs reference 442 (+28 bytes)

```js
function Foo() {
	this.isFoo = function(o) {
		return o instanceof Foo;
	};
}
function FooCollection() {
	this.foos = [1, 1].map(function() {
		return new Foo();
	});
}
var fooCollection = new FooCollection();
console.log(fooCollection.foos[0].isFoo(fooCollection.foos[0]));
console.log(fooCollection.foos[0].isFoo(fooCollection.foos[1]));
console.log(fooCollection.foos[1].isFoo(fooCollection.foos[0]));
console.log(fooCollection.foos[1].isFoo(fooCollection.foos[1]));

```

```diff
--- reference
+++ oxc
@@ -3,11 +3,12 @@
 		return o instanceof Foo;
 	};
 }
-var fooCollection = new function() {
+function FooCollection() {
 	this.foos = [1, 1].map(function() {
 		return new Foo();
 	});
-}();
+}
+var fooCollection = new FooCollection();
 console.log(fooCollection.foos[0].isFoo(fooCollection.foos[0]));
 console.log(fooCollection.foos[0].isFoo(fooCollection.foos[1]));
 console.log(fooCollection.foos[1].isFoo(fooCollection.foos[0]));

```

## `terser/arrow/async_identifiers`

- size: oxc 149 vs reference 120 (+29 bytes)

```js
var async = function(x) {
	console.log('async', x);
};
var await = function(x) {
	console.log('await', x);
};
async(1);
// prettier-ignore
await(2);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-var async = (x) => {
+var async = function(x) {
 	console.log('async', x);
 };
-var await = (x) => {
+var await = function(x) {
 	console.log('await', x);
 };
 async(1);
+// prettier-ignore
 await(2);

```

## `terser/collapse_vars/recursive_function_replacement`

- size: oxc 89 vs reference 60 (+29 bytes)

```js
function f(a) {
	return x(g(a));
}
function g(a) {
	return y(f(a));
}
console.log(f(c));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-function g(n) {
-	return y(x(g(n)));
+function f(a) {
+	return x(g(a));
 }
-console.log(x(g(c)));
+function g(a) {
+	return y(f(a));
+}
+console.log(f(c));

```

## `terser/harmony/object_spread_unsafe`

- size: oxc 103 vs reference 74 (+29 bytes)

```js
var o1 = {
	x: 1,
	y: 2
};
var o2 = {
	x: 3,
	z: 4
};
var cloned = { ...o1 };
var merged = {
	...o1,
	...o2
};
console.log(cloned, merged);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
-var o = {
+var e = {
 	x: 1,
 	y: 2
-};
-console.log({ ...o }, {
-	...o,
+}, t = {
 	x: 3,
 	z: 4
-});
+}, n = { ...e }, r = {
+	...e,
+	...t
+};
+console.log(n, r);

```

## `terser/identity/inline_identity`

- size: oxc 48 vs reference 19 (+29 bytes)

```js
const id = (x) => x;
console.log(id(1), id(2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(1, 2);
+const id = (x) => x;
+console.log(id(1), id(2));

```

## `terser/issue_1212/issue_1212_debug_false`

- size: oxc 95 vs reference 66 (+29 bytes)

```js
class foo {
	bar() {
		if (DEBUG) console.log('DEV');
		else console.log('PROD');
	}
}
new foo().bar();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 class foo {
 	bar() {
-		console.log('PROD');
+		DEBUG ? console.log('DEV') : console.log('PROD');
 	}
 }
 new foo().bar();

```

## `terser/properties/join_object_assignments_Infinity`

- size: oxc 137 vs reference 108 (+29 bytes)

```js
var o = {};
o[Infinity] = 1;
o[1 / 0] = 2;
o[-Infinity] = 3;
o[-1 / 0] = 4;
console.log(o[Infinity], o[1 / 0], o[-Infinity], o[-1 / 0]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-var o = {
-	Infinity: (1, 2),
-	'-Infinity': (3, 4)
-};
-console.log(o[1 / 0], o[1 / 0], o[-1 / 0], o[-1 / 0]);
+var o = {};
+o[Infinity] = 1;
+o[1 / 0] = 2;
+o[-Infinity] = 3;
+o[-1 / 0] = 4;
+console.log(o[Infinity], o[1 / 0], o[-Infinity], o[-1 / 0]);

```

## `terser/reduce_vars/issue_1670_6`

- size: oxc 109 vs reference 80 (+29 bytes)

```js
(function(a) {
	switch (1) {
		case a = 1:
			console.log(a);
			break;
		default:
			console.log(2);
			break;
	}
})(1);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 (function(a) {
-	if (1 === (a = 1)) console.log(a);
-	else console.log(2);
+	switch (1) {
+		case a = 1:
+			console.log(a);
+			break;
+		default: console.log(2);
+	}
 })(1);

```

## `terser/template_string/tagged_template_function_inline_3`

- size: oxc 29 vs reference 0 (+29 bytes)

```js
function tpl() {}
tpl`test`;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+function tpl() {}
+tpl`test`;

```

## `terser/arrow/async_object_literal`

- size: oxc 107 vs reference 77 (+30 bytes)

```js
var obj = {
	async a() {
		return await foo(1 + 0);
	},
	anon: async function() {
		return await foo(2 + 0);
	}
};

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 var obj = {
-	a: async () => await foo(1),
-	anon: async () => await foo(2)
+	async a() {
+		return await foo(1);
+	},
+	anon: async function() {
+		return await foo(2);
+	}
 };

```

## `terser/drop_unused/issue_t161_top_retain_3`

- size: oxc 79 vs reference 49 (+30 bytes)

```js
function f() {
	return 2;
}
function g() {
	return 3;
}
console.log(f(), g());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 function f() {
 	return 2;
 }
-console.log(f(), 3);
+function g() {
+	return 3;
+}
+console.log(f(), g());

```

## `terser/evaluate/unsafe_string`

- size: oxc 82 vs reference 52 (+30 bytes)

```js
console.log('1234' + 1, '1234'[0] + 1, '1234'[6 - 5] + 1, ('12' + '34')[0] + 1, ('12' + '34')[6 - 5] + 1, [
	1,
	2,
	3,
	4
].join('')[0] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log('12341', '11', '21', '11', '21', '11');
+console.log('12341', '11', '21', '11', '21', [
+	1,
+	2,
+	3,
+	4
+].join('')[0] + 1);

```

## `terser/functions/inline_loop_1`

- size: oxc 44 vs reference 14 (+30 bytes)

```js
function f() {
	return x();
}
for (;;) f();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (;;) x();
+function f() {
+	return x();
+}
+for (;;) f();

```

## `terser/functions/inline_loop_2`

- size: oxc 44 vs reference 14 (+30 bytes)

```js
for (;;) f();
function f() {
	return x();
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (;;) x();
+for (;;) f();
+function f() {
+	return x();
+}

```

## `terser/hoist_props/issue_2508_1`

- size: oxc 71 vs reference 41 (+30 bytes)

```js
var o = {
	a: [1],
	f: function(x) {
		console.log(x);
	}
};
o.f(o.a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-(function(x) {
-	console.log(x);
-})([1]);
+var o = {
+	a: [1],
+	f: function(x) {
+		console.log(x);
+	}
+};
+o.f(o.a);

```

## `terser/hoist_props/issue_2508_2`

- size: oxc 76 vs reference 46 (+30 bytes)

```js
var o = {
	a: { b: 2 },
	f: function(x) {
		console.log(x);
	}
};
o.f(o.a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-(function(x) {
-	console.log(x);
-})({ b: 2 });
+var o = {
+	a: { b: 2 },
+	f: function(x) {
+		console.log(x);
+	}
+};
+o.f(o.a);

```

## `terser/identity/inline_identity_extra_params`

- size: oxc 67 vs reference 37 (+30 bytes)

```js
const id = (x) => x;
console.log(id(1, console.log(2)), id(3, 4));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log((console.log(2), 1), 3);
+const id = (x) => x;
+console.log(id(1, console.log(2)), id(3, 4));

```

## `terser/issue_1212/issue_1212_debug_true`

- size: oxc 95 vs reference 65 (+30 bytes)

```js
class foo {
	bar() {
		if (DEBUG) console.log('DEV');
		else console.log('PROD');
	}
}
new foo().bar();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 class foo {
 	bar() {
-		console.log('DEV');
+		DEBUG ? console.log('DEV') : console.log('PROD');
 	}
 }
 new foo().bar();

```

## `terser/issue_281/modified`

- size: oxc 98 vs reference 68 (+30 bytes)

```js
function f5(b) {
	var a = (function() {
		return b;
	})();
	return b++ + a;
}
console.log(f5(1));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 function f5(b) {
-	var a = b;
+	var a = (function() {
+		return b;
+	})();
 	return b++ + a;
 }
 console.log(f5(1));

```

## `terser/loops/issue_2740_5`

- size: oxc 74 vs reference 44 (+30 bytes)

```js
L1: for (var x = 0; x < 3; x++) {
	break L1;
	L2: for (var y = 0; y < 2; y++) {
		break L2;
	}
}
console.log(x, y);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-var x = 0;
-x < 3;
-var y;
+L1: for (var x = 0; x < 3; x++) {
+	break L1;
+	var y;
+}
 console.log(x, y);

```

## `terser/properties/unsafe_methods_regex`

- size: oxc 414 vs reference 384 (+30 bytes)

```js
var f = {
	123: function() {
		console.log('123');
	},
	foo: function() {
		console.log('foo');
	},
	bar() {
		console.log('bar');
	},
	Baz: function() {
		console.log('baz');
	},
	BOO: function() {
		console.log('boo');
	},
	null: function() {
		console.log('null');
	},
	undefined: function() {
		console.log('undefined');
	}
};
f[123]();
new f.foo();
f.bar();
f.Baz();
f.BOO();
new f.null();
new f.undefined();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var f = {
-	123() {
+	123: function() {
 		console.log('123');
 	},
 	foo: function() {
@@ -8,10 +8,10 @@
 	bar() {
 		console.log('bar');
 	},
-	Baz() {
+	Baz: function() {
 		console.log('baz');
 	},
-	BOO() {
+	BOO: function() {
 		console.log('boo');
 	},
 	null: function() {

```

## `terser/reduce_vars/inner_var_for_in_1`

- size: oxc 147 vs reference 117 (+30 bytes)

```js
function f() {
	var a = 1, b = 2;
	for (b in (function() {
		return x(a, b, c);
	})()) {
		var c = 3, d = 4;
		x(a, b, c, d);
	}
	x(a, b, c, d);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 function f() {
 	var a = 1, b = 2;
-	for (b in x(1, b, c)) {
+	for (b in (function() {
+		return x(a, b, c);
+	})()) {
 		var c = 3, d = 4;
-		x(1, b, c, d);
+		x(a, b, c, d);
 	}
-	x(1, b, c, d);
+	x(a, b, c, d);
 }

```

## `terser/reduce_vars/issue_2423_2`

- size: oxc 74 vs reference 44 (+30 bytes)

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
@@ -1,5 +1,8 @@
+function c() {
+	return 1;
+}
 function p() {
-	console.log(1);
+	console.log(c());
 }
 p();
 p();

```

## `terser/switch/if_else7`

- size: oxc 56 vs reference 26 (+30 bytes)

```js
switch (foo) {
	case 'bar':
		break;
		bar();
	default: other();
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-'bar' === foo || other();
+switch (foo) {
+	case 'bar': break;
+	default: other();
+}

```

## `terser/typeof/issue_2728_4`

- size: oxc 55 vs reference 25 (+30 bytes)

```js
function arguments() {}
console.log(typeof arguments);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('function');
+function arguments() {}
+console.log(typeof arguments);

```

## `terser/conditionals/ifs_5`

- size: oxc 152 vs reference 121 (+31 bytes)

```js
function f() {
	if (foo) return;
	bar();
	baz();
}
function g() {
	if (foo) return;
	if (bar) return;
	if (baz) return;
	if (baa) return;
	a();
	b();
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,13 @@
 function f() {
-	if (!foo) {
-		bar();
-		baz();
-	}
+	if (foo) return;
+	bar();
+	baz();
 }
 function g() {
-	if (!(foo || bar || baz || baa)) {
-		a();
-		b();
-	}
+	if (foo) return;
+	if (bar) return;
+	if (baz) return;
+	if (baa) return;
+	a();
+	b();
 }

```

## `terser/evaluate/pow_with_number_constants`

- size: oxc 227 vs reference 196 (+31 bytes)

```js
var a = 5 ** NaN;
var b = 42 ** +0;
var c = 42 ** -0;
var d = NaN ** 1;
var e = 2 ** Infinity;
var f = 2 ** -Infinity;
var g = (-7) ** .5;
var h = 2324334 ** 34343443;
var i = (-2324334) ** 34343443;
var j = 2 ** -3;
var k = 2 ** -3;
var l = 2 ** (5 - 7);
var m = 3 ** -10;

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
-var a = 0 / 0;
+var a = NaN;
 var b = 1;
 var c = 1;
-var d = 0 / 0;
-var e = 1 / 0;
+var d = NaN;
+var e = Infinity;
 var f = 0;
-var g = 0 / 0;
-var h = 1 / 0;
-var i = -1 / 0;
-var j = .125;
-var k = .125;
-var l = .25;
-var m = 16935087808430286e-21;
+var g = (-7) ** .5;
+var h = 2324334 ** 34343443;
+var i = (-2324334) ** 34343443;
+var j = 2 ** -3;
+var k = 2 ** -3;
+var l = 2 ** -2;
+var m = 3 ** -10;

```

## `terser/functions/issue_3125`

- size: oxc 52 vs reference 21 (+31 bytes)

```js
console.log(function() {
	return 'PASS';
}.call());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('PASS');
+console.log(function() {
+	return 'PASS';
+}.call());

```

## `terser/typeof/issue_2728_3`

- size: oxc 77 vs reference 46 (+31 bytes)

```js
(function() {
	function arguments() {}
	console.log(typeof arguments);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 (function() {
-	console.log('function');
+	function arguments() {}
+	console.log(typeof arguments);
 })();

```

## `terser/collapse_vars/issue_2436_2`

- size: oxc 104 vs reference 72 (+32 bytes)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	o.a = 3;
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,10 @@
 	a: 1,
 	b: 2
 };
-console.log((o.a = 3, {
-	x: o.a,
-	y: o.b
-}));
+console.log((function(c) {
+	o.a = 3;
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(o));

```

## `terser/drop_unused/issue_t161_top_retain_4`

- size: oxc 89 vs reference 57 (+32 bytes)

```js
function f() {
	return 2;
}
function g() {
	return 3;
}
console.log(f(), f(), g(), g());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 function f() {
 	return 2;
 }
-console.log(f(), f(), 3, 3);
+function g() {
+	return 3;
+}
+console.log(f(), f(), g(), g());

```

## `terser/global_defs/issue_2167`

- size: oxc 42 vs reference 10 (+32 bytes)

```js
if (isDevMode()) {
	greetOverlord();
}
doWork();

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
+isDevMode() && greetOverlord();
 doWork();

```

## `terser/hoist_props/direct_access_2`

- size: oxc 79 vs reference 47 (+32 bytes)

```js
var o = { a: 1 };
var f = function(k) {
	if (o[k]) return 'PASS';
};
console.log(f('a'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log(function() {
-	return 'PASS';
-}());
+var o = { a: 1 };
+console.log(function(k) {
+	if (o[k]) return 'PASS';
+}('a'));

```

## `terser/issue_976/eval_collapse_vars`

- size: oxc 413 vs reference 381 (+32 bytes)

```js
function f1() {
	var e = 7;
	var s = 'abcdef';
	var i = 2;
	var eval = console.log.bind(console);
	var x = s.charAt(i++);
	var y = s.charAt(i++);
	var z = s.charAt(i++);
	eval(x, y, z, e);
}
function p1() {
	var a = foo(), b = bar(), eval = baz();
	return a + b + eval;
}
function p2() {
	var a = foo(), b = bar(), eval = baz;
	return a + b + eval();
}
(function f2(eval) {
	var a = 2;
	console.log(a - 5);
	eval('console.log(a);');
})(eval);

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,8 @@
 	eval(x, y, z, e);
 }
 function p1() {
-	return foo() + bar() + baz();
+	var a = foo(), b = bar(), eval = baz();
+	return a + b + eval;
 }
 function p2() {
 	var a = foo(), b = bar(), eval = baz;

```

## `terser/reduce_vars/perf_1`

- size: oxc 221 vs reference 189 (+32 bytes)

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
+function foo(x, y, z) {
+	return x < y ? x * y + z : x * z - y;
+}
+function indirect_foo(x, y, z) {
+	return foo(x, y, z);
+}
 var sum = 0;
-for (var i = 0; i < 100; ++i) sum += function(x, y, z) {
-	return function(x, y, z) {
-		return x < y ? x * y + z : x * z - y;
-	}(x, y, z);
-}(i, i + 1, 3 * i);
+for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `terser/reduce_vars/var_assign_3`

- size: oxc 59 vs reference 27 (+32 bytes)

```js
!(function() {
	var a;
	while (a = 2);
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-while (2);
-console.log(2);
+(function() {
+	for (var a; a = 2;);
+	console.log(a);
+})();

```

## `terser/functions/unsafe_call_1`

- size: oxc 128 vs reference 95 (+33 bytes)

```js
(function(a, b) {
	console.log(a, b);
}).call('foo', 'bar');
(function(a, b) {
	console.log(this, a, b);
}).call('foo', 'bar');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-console.log('bar', void 0);
 (function(a, b) {
+	console.log(a, b);
+}).call('foo', 'bar');
+(function(a, b) {
 	console.log(this, a, b);
 }).call('foo', 'bar');

```

## `terser/pure_funcs/relational`

- size: oxc 75 vs reference 42 (+33 bytes)

```js
foo() in foo();
foo() instanceof bar();
foo() < 'bar';
bar() > foo();
bar() != bar();
bar() !== 'bar';
'bar' == foo();
'bar' === bar();
'bar' >= 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-bar();
+foo() in foo();
+foo() instanceof bar();
 bar();
 bar(), bar();
 bar();

```

## `terser/switch/if_else8`

- size: oxc 123 vs reference 90 (+33 bytes)

```js
function test(foo) {
	switch (foo) {
		case 'bar': return 'PASS';
		default: return 'FAIL';
	}
}
console.log(test('bar'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 function test(foo) {
-	return 'bar' === foo ? 'PASS' : 'FAIL';
+	switch (foo) {
+		case 'bar': return 'PASS';
+		default: return 'FAIL';
+	}
 }
 console.log(test('bar'));

```

## `terser/arrow/call_args`

- size: oxc 63 vs reference 29 (+34 bytes)

```js
const a = 1;
console.log(a);
+(function(a) {
	return a;
})(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
 const a = 1;
 console.log(1);
++(function(a) {
+	return a;
+})(1);

```

## `terser/conditionals/issue_2560`

- size: oxc 182 vs reference 148 (+34 bytes)

```js
function log(x) {
	console.log(x);
}
function foo() {
	return log;
}
function bar() {
	if (x !== (x = foo())) {
		x(1);
	} else {
		x(2);
	}
}
var x = function() {
	console.log('init');
};
bar();
bar();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,11 @@
 function log(x) {
 	console.log(x);
 }
+function foo() {
+	return log;
+}
 function bar() {
-	x !== (x = log) ? x(1) : x(2);
+	x === (x = foo()) ? x(2) : x(1);
 }
 var x = function() {
 	console.log('init');

```

## `terser/dead_code/issue_2860_2`

- size: oxc 50 vs reference 16 (+34 bytes)

```js
console.log((function(a) {
	return a ^= 1;
})());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(1);
+console.log((function(a) {
+	return a ^= 1;
+})());

```

## `terser/evaluate/call_args`

- size: oxc 63 vs reference 29 (+34 bytes)

```js
const a = 1;
console.log(a);
+(function(a) {
	return a;
})(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
 const a = 1;
 console.log(1);
++(function(a) {
+	return a;
+})(1);

```

## `terser/hoist_props/issue_2473_4`

- size: oxc 74 vs reference 40 (+34 bytes)

```js
(function() {
	var o = {
		a: 1,
		b: 2
	};
	console.log(o.a, o.b);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 (function() {
-	console.log(1, 2);
+	var o = {
+		a: 1,
+		b: 2
+	};
+	console.log(o.a, o.b);
 })();

```

## `terser/issue_281/issue_1595_3`

- size: oxc 40 vs reference 6 (+34 bytes)

```js
(function f(a) {
	return g(a + 1);
})(2);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-g(3);
+(function(a) {
+	return g(a + 1);
+})(2);

```

## `terser/issue_281/negate_iife_issue_1073`

- size: oxc 88 vs reference 54 (+34 bytes)

```js
new ((function(a) {
	return function Foo() {
		this.x = a;
		console.log(this);
	};
})(7))();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-new function() {
-	this.x = 7, console.log(this);
-}();
+new ((function(a) {
+	return function() {
+		this.x = a, console.log(this);
+	};
+})(7))();

```

## `terser/reduce_vars/issue_1595_2`

- size: oxc 40 vs reference 6 (+34 bytes)

```js
(function f(a) {
	return g(a + 1);
})(2);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-g(3);
+(function(a) {
+	return g(a + 1);
+})(2);

```

## `terser/reduce_vars/issue_1595_3`

- size: oxc 40 vs reference 6 (+34 bytes)

```js
(function f(a) {
	return g(a + 1);
})(2);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-g(3);
+(function(a) {
+	return g(a + 1);
+})(2);

```

## `terser/reduce_vars/issue_2860_2`

- size: oxc 50 vs reference 16 (+34 bytes)

```js
console.log((function(a) {
	return a ^= 1;
	a ^= 2;
})());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(1);
+console.log((function(a) {
+	return a ^= 1;
+})());

```

## `terser/reduce_vars/issue_308`

- size: oxc 237 vs reference 203 (+34 bytes)

```js
exports.withStyles = withStyles;
function _inherits(superClass) {
	if (typeof superClass !== 'function') {
		throw new TypeError();
	}
	Object.create(superClass);
}
function withStyles() {
	var a = EXTERNAL();
	return (function(_a) {
		_inherits(_a);
		function d() {}
	})(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
+exports.withStyles = withStyles;
 function _inherits(superClass) {
-	if ('function' != typeof superClass) throw TypeError();
+	if (typeof superClass != 'function') throw TypeError();
 	Object.create(superClass);
 }
 function withStyles() {
-	_inherits(EXTERNAL());
+	return (function(_a) {
+		_inherits(_a);
+	})(EXTERNAL());
 }
-exports.withStyles = withStyles;

```

## `terser/template_string/tagged_template_function_inline_4`

- size: oxc 34 vs reference 0 (+34 bytes)

```js
const t = { pl: function() {} };
t.pl`test`;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+({ pl: function() {} }).pl`test`;

```

## `terser/hoist_props/hoist_class`

- size: oxc 214 vs reference 179 (+35 bytes)

```js
function run(c, v) {
	return new c(v).value;
}
var o = {
	p: class Foo {
		constructor(value) {
			this.value = value * 10;
		}
	},
	x: 1,
	y: 2
};
console.log(o.p.name, o.p === o.p, run(o.p, o.x), run(o.p, o.y));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,13 @@
 function run(c, v) {
 	return new c(v).value;
 }
-var o_p = class Foo {
-	constructor(value) {
-		this.value = 10 * value;
-	}
+var o = {
+	p: class Foo {
+		constructor(value) {
+			this.value = value * 10;
+		}
+	},
+	x: 1,
+	y: 2
 };
-console.log(o_p.name, true, run(o_p, 1), run(o_p, 2));
+console.log(o.p.name, o.p === o.p, run(o.p, o.x), run(o.p, o.y));

```

## `terser/hoist_props/hoist_class_with_new`

- size: oxc 177 vs reference 142 (+35 bytes)

```js
var o = {
	p: class Foo {
		constructor(value) {
			this.value = value * 10;
		}
	},
	x: 1,
	y: 2
};
console.log(o.p.name, o.p === o.p, new o.p(o.x).value, new o.p(o.y).value);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,10 @@
-var o_p = class Foo {
-	constructor(value) {
-		this.value = 10 * value;
-	}
+var o = {
+	p: class Foo {
+		constructor(value) {
+			this.value = value * 10;
+		}
+	},
+	x: 1,
+	y: 2
 };
-console.log(o_p.name, true, new o_p(1).value, new o_p(2).value);
+console.log(o.p.name, o.p === o.p, new o.p(o.x).value, new o.p(o.y).value);

```

## `terser/loops/issue_2740_4`

- size: oxc 93 vs reference 58 (+35 bytes)

```js
L1: for (var x = 0; x < 3; x++) {
	L2: for (var y = 0; y < 2; y++) {
		break L2;
	}
}
console.log(x, y);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-for (var x = 0; x < 3; x++) var y = 0;
+L1: for (var x = 0; x < 3; x++) L2: for (var y = 0; y < 2; y++) break L2;
 console.log(x, y);

```

## `terser/properties/issue_2208_1`

- size: oxc 52 vs reference 17 (+35 bytes)

```js
console.log({ p: function() {
	return 42;
} }.p());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(42);
+console.log({ p: function() {
+	return 42;
+} }.p());

```

## `terser/reduce_vars/issue_2836`

- size: oxc 84 vs reference 49 (+35 bytes)

```js
function f() {
	return 'FAIL';
}
console.log(f());
function f() {
	return 'PASS';
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-console.log((function() {
+function f() {
+	return 'FAIL';
+}
+console.log(f());
+function f() {
 	return 'PASS';
-})());
+}

```

## `terser/reduce_vars/perf_5`

- size: oxc 224 vs reference 189 (+35 bytes)

```js
function indirect_foo(x, y, z) {
	function foo(x, y, z) {
		return x < y ? x * y + z : x * z - y;
	}
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
+function indirect_foo(x, y, z) {
+	function foo(x, y, z) {
+		return x < y ? x * y + z : x * z - y;
+	}
+	return foo(x, y, z);
+}
 var sum = 0;
-for (var i = 0; i < 100; ++i) sum += function(x, y, z) {
-	return function(x, y, z) {
-		return x < y ? x * y + z : x * z - y;
-	}(x, y, z);
-}(i, i + 1, 3 * i);
+for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `terser/async/async_shorthand_property`

- size: oxc 307 vs reference 271 (+36 bytes)

```js
function print(o) {
	console.log(o.async + ' ' + o.await);
}
var async = 'Async', await = 'Await';
print({ async });
print({ await });
print({
	async,
	await
});
print({
	await,
	async
});
print({ async });
print({ await });
print({
	async,
	await
});
print({
	await,
	async
});

```

```diff
--- reference
+++ oxc
@@ -1,24 +1,24 @@
-function a(a) {
-	console.log(a.async + ' ' + a.await);
+function print(e) {
+	console.log(e.async + ' ' + e.await);
 }
-var n = 'Async', c = 'Await';
-a({ async: n });
-a({ await: c });
-a({
-	async: n,
-	await: c
+var e = 'Async', t = 'Await';
+print({ async: e });
+print({ await: t });
+print({
+	async: e,
+	await: t
 });
-a({
-	await: c,
-	async: n
+print({
+	await: t,
+	async: e
 });
-a({ async: n });
-a({ await: c });
-a({
-	async: n,
-	await: c
+print({ async: e });
+print({ await: t });
+print({
+	async: e,
+	await: t
 });
-a({
-	await: c,
-	async: n
+print({
+	await: t,
+	async: e
 });

```

## `terser/class_properties/static_means_execution`

- size: oxc 225 vs reference 189 (+36 bytes)

```js
let x = 0;
class NoProps {}
class WithProps {
	prop = x = x === 1 ? 'PASS' : 'FAIL';
}
class WithStaticProps {
	static prop = x = x === 0 ? 1 : 'FAIL';
}
new NoProps();
new WithProps();
new WithStaticProps();
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,12 @@
 let x = 0;
+class NoProps {}
+class WithProps {
+	prop = x = x === 1 ? 'PASS' : 'FAIL';
+}
 class WithStaticProps {
-	static prop = x = 0 === x ? 1 : 'FAIL';
+	static prop = x = x === 0 ? 1 : 'FAIL';
 }
-new class {}();
-new class {
-	prop = x = 1 === x ? 'PASS' : 'FAIL';
-}();
+new NoProps();
+new WithProps();
 new WithStaticProps();
 console.log(x);

```

## `terser/numbers/evaluate_2`

- size: oxc 155 vs reference 119 (+36 bytes)

```js
console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, 1 | x | 2 | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), 1 & (2 & x & 3), 1 + (2 + (x |= 0) + 3));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(x + 1 + 2, 2 * x, 3 + +x, 1 + x + 2 + 3, 3 | x, 6 + x--, 6 + x * y, 1 + (2 + x + 3), 0 & x, 6 + (x |= 0));
+console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, x | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), x & 0, 1 + (2 + (x |= 0) + 3));

```

## `terser/reduce_vars/obj_arg_1`

- size: oxc 91 vs reference 55 (+36 bytes)

```js
var C = 1;
function f(obj) {
	return obj.bar();
}
console.log(f({ bar: function() {
	return C + C;
} }));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
-console.log({ bar: function() {
+function f(obj) {
+	return obj.bar();
+}
+console.log(f({ bar: function() {
 	return 2;
-} }.bar());
+} }));

```

## `terser/evaluate/unsafe_charAt`

- size: oxc 89 vs reference 52 (+37 bytes)

```js
console.log('1234' + 1, '1234'.charAt(0) + 1, '1234'.charAt(6 - 5) + 1, ('12' + '34').charAt(0) + 1, ('12' + '34').charAt(6 - 5) + 1, [
	1,
	2,
	3,
	4
].join('').charAt(0) + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log('12341', '11', '21', '11', '21', '11');
+console.log('12341', '11', '21', '11', '21', [
+	1,
+	2,
+	3,
+	4
+].join('').charAt(0) + 1);

```

## `terser/functions/inline_loop_3`

- size: oxc 51 vs reference 14 (+37 bytes)

```js
var f = function() {
	return x();
};
for (;;) f();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (;;) x();
+var f = function() {
+	return x();
+};
+for (;;) f();

```

## `terser/issue_281/inner_var_for_in_1`

- size: oxc 147 vs reference 110 (+37 bytes)

```js
function f() {
	var a = 1, b = 2;
	for (b in (function() {
		return x(a, b, c);
	})()) {
		var c = 3, d = 4;
		x(a, b, c, d);
	}
	x(a, b, c, d);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 function f() {
-	var b = 2;
-	for (b in x(1, b, c)) {
+	var a = 1, b = 2;
+	for (b in (function() {
+		return x(a, b, c);
+	})()) {
 		var c = 3, d = 4;
-		x(1, b, c, d);
+		x(a, b, c, d);
 	}
-	x(1, b, c, d);
+	x(a, b, c, d);
 }

```

## `terser/properties/issue_2208_3`

- size: oxc 94 vs reference 57 (+37 bytes)

```js
a = 42;
console.log({ p: function() {
	return (function() {
		return this.a;
	})();
} }.p());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 a = 42;
-console.log((function() {
-	return this.a;
-})());
+console.log({ p: function() {
+	return (function() {
+		return this.a;
+	})();
+} }.p());

```

## `terser/arrow/issue_2136_2`

- size: oxc 79 vs reference 41 (+38 bytes)

```js
function f(x) {
	console.log(x);
}
!(function(a, ...b) {
	f(b[0]);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 function f(x) {
 	console.log(x);
 }
-f(2);
+(function(a, ...b) {
+	f(b[0]);
+})(1, 2, 3);

```

## `terser/collapse_vars/collapse_vars_repeated`

- size: oxc 144 vs reference 106 (+38 bytes)

```js
function f1() {
	var dummy = 3, a = 5, unused = 2, a = 1, a = 3;
	return -a;
}
function f2(x) {
	var a = 3, a = x;
	return a;
}
(function(x) {
	var a = 'GOOD' + x, e = 'BAD', k = '!', e = a;
	console.log(e + k);
})('!'), (function(x) {
	var a = 'GOOD' + x, e = 'BAD' + x, k = '!', e = a;
	console.log(e + k);
})('!');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-function f1() {
-	return -3;
-}
-function f2(x) {
-	return x;
-}
-console.log('GOOD!!'), console.log('GOOD!!');
+(function(x) {
+	var a = 'GOOD' + x;
+	console.log(a + '!');
+})('!'), (function(x) {
+	var a = 'GOOD' + x;
+	'' + x, console.log(a + '!');
+})('!');

```

## `terser/comparing/dont_change_in_or_instanceof_expressions`

- size: oxc 60 vs reference 22 (+38 bytes)

```js
1 in 1;
null in null;
1 instanceof 1;
null instanceof null;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
 1 in 1;
 null in null;
+1 instanceof 1;
+null instanceof null;

```

## `terser/drop_unused/issue_2136_2`

- size: oxc 79 vs reference 41 (+38 bytes)

```js
function f(x) {
	console.log(x);
}
!(function(a, ...b) {
	f(b[0]);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 function f(x) {
 	console.log(x);
 }
-f(2);
+(function(a, ...b) {
+	f(b[0]);
+})(1, 2, 3);

```

## `terser/expansions/avoid_spread_hole`

- size: oxc 38 vs reference 0 (+38 bytes)

```js
let x = [...[,]];
let y = [,];
console.log(0 in x, 0 in y);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+console.log(0 in [void 0], 0 in [,]);

```

## `terser/export/module_mangle_export_default_function`

- size: oxc 146 vs reference 108 (+38 bytes)

```js
export default function foo() {
	return 1;
}
export function bar() {
	return 2;
}
function qux() {
	return 3;
}
console.log(foo(), bar(), qux());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
-export default function r() {
+export default function foo() {
 	return 1;
 }
 export function bar() {
 	return 2;
 }
-console.log(r(), bar(), 3);
+function qux() {
+	return 3;
+}
+console.log(foo(), bar(), qux());

```

## `terser/identity/inline_identity_function`

- size: oxc 57 vs reference 19 (+38 bytes)

```js
function id(x) {
	return x;
}
console.log(id(1), id(2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(1, 2);
+function id(x) {
+	return x;
+}
+console.log(id(1), id(2));

```

## `terser/inline/inline_annotation`

- size: oxc 62 vs reference 24 (+38 bytes)

```js
function inline() {
	return external();
}
inline();
inline();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-external();
-external();
+function inline() {
+	return external();
+}
+inline();
+inline();

```

## `terser/issue_1787/unary_prefix`

- size: oxc 61 vs reference 23 (+38 bytes)

```js
console.log((function() {
	var x = -(2 / 3);
	return x;
})());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(-(2 / 3));
+console.log((function() {
+	return -.6666666666666666;
+})());

```

## `terser/issue_t120/pr_152_regression`

- size: oxc 293 vs reference 255 (+38 bytes)

```js
(function(root, factory) {
	root.CryptoJS = factory();
})(this, function() {
	var CryptoJS = CryptoJS || (function(Math) {
		var C = {};
		C.demo = function(n) {
			return Math.ceil(n);
		};
		return C;
	})(Math);
	return CryptoJS;
});
var result = this.CryptoJS.demo(1.3);
console.log(result);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
 (function(root, factory) {
-	var CryptoJS;
-	root.CryptoJS = CryptoJS = CryptoJS || (function(Math) {
-		var C = { demo: function(n) {
+	root.CryptoJS = factory();
+})(this, function() {
+	var CryptoJS = CryptoJS || (function(Math) {
+		var C = {};
+		return C.demo = function(n) {
 			return Math.ceil(n);
-		} };
-		return C;
+		}, C;
 	})(Math);
-})(this);
+	return CryptoJS;
+});
 var result = this.CryptoJS.demo(1.3);
 console.log(result);

```

## `terser/drop_console/drop_console_2`

- size: oxc 39 vs reference 0 (+39 bytes)

```js
console.log('foo');
console.log.apply(console, arguments);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+console.log.apply(console, arguments);

```

## `terser/drop_unused/issue_2516_1`

- size: oxc 241 vs reference 202 (+39 bytes)

```js
function foo() {
	function qux(x) {
		bar.call(null, x);
	}
	function bar(x) {
		var FOUR = 4;
		var trouble = x || never_called();
		var value = (FOUR - 1) * trouble;
		console.log(value == 6 ? 'PASS' : value);
	}
	Baz = qux;
}
var Baz;
foo();
Baz(2);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,12 @@
 function foo() {
+	function qux(x) {
+		bar.call(null, x);
+	}
 	function bar(x) {
-		var value = (4 - 1) * (x || never_called());
-		console.log(6 == value ? 'PASS' : value);
+		var FOUR = 4, trouble = x || never_called(), value = (FOUR - 1) * trouble;
+		console.log(value == 6 ? 'PASS' : value);
 	}
-	Baz = function(x) {
-		bar.call(null, x);
-	};
+	Baz = qux;
 }
 var Baz;
 foo();

```

## `terser/drop_unused/issue_2516_2`

- size: oxc 241 vs reference 202 (+39 bytes)

```js
function foo() {
	function qux(x) {
		bar.call(null, x);
	}
	function bar(x) {
		var FOUR = 4;
		var trouble = x || never_called();
		var value = (FOUR - 1) * trouble;
		console.log(value == 6 ? 'PASS' : value);
	}
	Baz = qux;
}
var Baz;
foo();
Baz(2);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,12 @@
 function foo() {
+	function qux(x) {
+		bar.call(null, x);
+	}
 	function bar(x) {
-		var value = (4 - 1) * (x || never_called());
-		console.log(6 == value ? 'PASS' : value);
+		var FOUR = 4, trouble = x || never_called(), value = (FOUR - 1) * trouble;
+		console.log(value == 6 ? 'PASS' : value);
 	}
-	Baz = function(x) {
-		bar.call(null, x);
-	};
+	Baz = qux;
 }
 var Baz;
 foo();

```

## `terser/functions/unsafe_apply_1`

- size: oxc 205 vs reference 166 (+39 bytes)

```js
(function(a, b) {
	console.log(a, b);
}).apply('foo', ['bar']);
(function(a, b) {
	console.log(this, a, b);
}).apply('foo', ['bar']);
(function(a, b) {
	console.log(a, b);
}).apply('foo', ['bar'], 'baz');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
-console.log('bar', void 0);
 (function(a, b) {
+	console.log(a, b);
+}).apply('foo', ['bar']);
+(function(a, b) {
 	console.log(this, a, b);
-}).call('foo', 'bar');
+}).apply('foo', ['bar']);
 (function(a, b) {
 	console.log(a, b);
 }).apply('foo', ['bar'], 'baz');

```

## `terser/harmony/issue_2794_2`

- size: oxc 200 vs reference 161 (+39 bytes)

```js
function foo() {
	for (const a of func(value)) {
		console.log(a);
	}
	function func(va) {
		return doSomething(va);
	}
}
function doSomething(x) {
	return [
		x,
		2 * x,
		3 * x
	];
}
const value = 10;
foo();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,14 @@
 function foo() {
-	for (const o of doSomething(value)) console.log(o);
+	for (let e of func(value)) console.log(e);
+	function func(e) {
+		return doSomething(e);
+	}
 }
-function doSomething(o) {
+function doSomething(e) {
 	return [
-		o,
-		2 * o,
-		3 * o
+		e,
+		2 * e,
+		3 * e
 	];
 }
 const value = 10;

```

## `terser/inline/inline_within_extends_1`

- size: oxc 224 vs reference 185 (+39 bytes)

```js
(function() {
	function foo(foo_base) {
		return class extends foo_base {};
	}
	function bar(bar_base) {
		return class extends bar_base {};
	}
	console.log(new class extends foo(bar(Array)) {}().concat(['PASS'])[0]);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,9 @@
-console.log(new class extends (function(foo_base) {
-	return class extends foo_base {};
-})((function(bar_base) {
-	return class extends bar_base {};
-})(Array)) {}().concat(['PASS'])[0]);
+(function() {
+	function foo(foo_base) {
+		return class extends foo_base {};
+	}
+	function bar(bar_base) {
+		return class extends bar_base {};
+	}
+	console.log(new class extends foo(bar(Array)) {}().concat(['PASS'])[0]);
+})();

```

## `terser/issue_2719/warn`

- size: oxc 107 vs reference 68 (+39 bytes)

```js
function f() {
	return g();
}
function g() {
	return g['call' + 'er'].arguments;
}
console.log(f(1, 2, 3).length);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-console.log(function g() {
+function f() {
+	return g();
+}
+function g() {
 	return g.caller.arguments;
-}().length);
+}
+console.log(f(1, 2, 3).length);

```

## `terser/issue_640/drop_console_2`

- size: oxc 39 vs reference 0 (+39 bytes)

```js
console.log('foo');
console.log.apply(console, arguments);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+console.log.apply(console, arguments);

```

## `terser/negate_iife/negate_iife_2_side_effects`

- size: oxc 39 vs reference 0 (+39 bytes)

```js
(function() {
	return {};
})().x = 10;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+(function() {
+	return {};
+})().x = 10;

```

## `terser/reduce_vars/obj_var_2`

- size: oxc 55 vs reference 16 (+39 bytes)

```js
var C = 1;
var obj = { bar: function() {
	return C + C;
} };
console.log(obj.bar());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(2);
+console.log({ bar: function() {
+	return 2;
+} }.bar());

```

## `terser/sequences/delete_seq_4`

- size: oxc 199 vs reference 160 (+39 bytes)

```js
function f() {}
console.log(delete (f(), undefined));
console.log(delete (f(), void 0));
console.log(delete (f(), Infinity));
console.log(delete (f(), 1 / 0));
console.log(delete (f(), NaN));
console.log(delete (f(), 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 function f() {}
-console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !1)), console.log((f(), !1)), console.log((f(), !0)), console.log((f(), !0));
+console.log(delete (0, undefined)), console.log(delete void 0), console.log(delete (0, Infinity)), console.log(delete (1 / 0)), console.log(delete (0, NaN)), console.log(delete NaN);

```

## `terser/sequences/delete_seq_5`

- size: oxc 199 vs reference 160 (+39 bytes)

```js
function f() {}
console.log(delete (f(), undefined));
console.log(delete (f(), void 0));
console.log(delete (f(), Infinity));
console.log(delete (f(), 1 / 0));
console.log(delete (f(), NaN));
console.log(delete (f(), 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 function f() {}
-console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !1)), console.log((f(), !1)), console.log((f(), !0)), console.log((f(), !0));
+console.log(delete (0, undefined)), console.log(delete void 0), console.log(delete (0, Infinity)), console.log(delete (1 / 0)), console.log(delete (0, NaN)), console.log(delete NaN);

```

## `terser/typeof/typeof_in_boolean_context`

- size: oxc 171 vs reference 132 (+39 bytes)

```js
function f1(x) {
	return typeof x ? 'yes' : 'no';
}
function f2() {
	return typeof g() ? 'Yes' : 'No';
}
typeof 0 ? foo() : bar();
!typeof console.log(1);
var a = !typeof console.log(2);
if (typeof (1 + foo()));

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 function f1(x) {
-	return 'yes';
+	return typeof x ? 'yes' : 'no';
 }
 function f2() {
-	return g(), 'Yes';
+	return typeof g() ? 'Yes' : 'No';
 }
 foo();
 console.log(1);
-var a = (console.log(2), !1);
-foo();
+var a = !typeof console.log(2);
+1 + foo();

```

## `terser/evaluate/issue_2207_1`

- size: oxc 174 vs reference 134 (+40 bytes)

```js
console.log(String.fromCharCode(65));
console.log(Math.max(3, 6, 2, 7, 3, 4));
console.log(Math.cos(1.2345));
console.log(Math.cos(1.2345) - Math.sin(4.321));
console.log(Math.pow(Math.PI, Math.E - Math.LN10).toFixed(15));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log('A');
 console.log(7);
-console.log(.32999315767856785);
-console.log(1.2543732512566947);
-console.log('1.609398451447204');
+console.log(Math.cos(1.2345));
+console.log(Math.cos(1.2345) - Math.sin(4.321));
+console.log((Math.PI ** (Math.E - Math.LN10)).toFixed(15));

```

## `terser/reduce_vars/var_assign_2`

- size: oxc 56 vs reference 16 (+40 bytes)

```js
!(function() {
	var a;
	if (a = 2) console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(2);
+(function() {
+	var a;
+	(a = 2) && console.log(a);
+})();

```

## `terser/class_properties/class_expression_properties_side_effects`

- size: oxc 112 vs reference 71 (+41 bytes)

```js
global.side = () => {
	console.log('PASS');
};
(class {
	static foo = side();
	[side()]() {}
	[side()] = 4;
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 global.side = () => {
 	console.log('PASS');
 };
-side(), side(), side();
+(class {
+	static foo = side();
+	[side()]() {}
+	[side()] = 4;
+});

```

## `terser/harmony/issue_2794_1`

- size: oxc 202 vs reference 161 (+41 bytes)

```js
function foo() {
	for (const a of func(value)) {
		console.log(a);
	}
	function func(va) {
		return doSomething(va);
	}
}
function doSomething(x) {
	return [
		x,
		2 * x,
		3 * x
	];
}
const value = 10;
foo();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
 function foo() {
-	for (const a of doSomething(value)) console.log(a);
+	for (let a of func(value)) console.log(a);
+	function func(va) {
+		return doSomething(va);
+	}
 }
 function doSomething(x) {
 	return [

```

## `terser/issue_281/issue_1758`

- size: oxc 110 vs reference 69 (+41 bytes)

```js
console.log((function(c) {
	var undefined = 42;
	return (function() {
		c--;
		c--, c.toString();
		return;
	})();
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
-console.log(function(c) {
-	return c--, c--, void c.toString();
-}());
+console.log((function(c) {
+	var undefined = 42;
+	return (function() {
+		c--, c--, c.toString();
+	})();
+})());

```

## `terser/arrow/issue_485_crashing_1530`

- size: oxc 42 vs reference 0 (+42 bytes)

```js
(function(a) {
	if (true) return;
	var b = 42;
})(this);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function(a) {
+	return;
+	var b;
+})(this);

```

## `terser/drop_unused/issue_2768`

- size: oxc 118 vs reference 76 (+42 bytes)

```js
var a = 'FAIL', c = 1;
var c = (function(b) {
	var d = b = a;
	var e = --b + (d && (a = 'PASS'));
})();
console.log(a, typeof c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-var a = 'FAIL';
-var c = void (a && (a = 'PASS'));
+var a = 'FAIL', c = 1, c = (function(b) {
+	var d = b = a;
+	--b + (d && (a = 'PASS'));
+})();
 console.log(a, typeof c);

```

## `terser/functions/issue_485_crashing_1530`

- size: oxc 42 vs reference 0 (+42 bytes)

```js
(function(a) {
	if (true) return;
	var b = 42;
})(this);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function(a) {
+	return;
+	var b;
+})(this);

```

## `terser/hoist_props/does_not_hoist_objects_with_computed_props`

- size: oxc 42 vs reference 0 (+42 bytes)

```js
const x = { [console.log('PASS')]: 123 };

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+const x = { [console.log('PASS')]: 123 };

```

## `terser/issue_281/issue_1254_negate_iife_nested`

- size: oxc 76 vs reference 34 (+42 bytes)

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
@@ -1 +1,5 @@
-(void console.log('test'))()()();
+(function() {
+	return function() {
+		console.log('test');
+	};
+})()()()()();

```

## `terser/collapse_vars/issue_2453`

- size: oxc 60 vs reference 17 (+43 bytes)

```js
function log(n) {
	console.log(n);
}
const a = 42;
log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(42);
+function log(n) {
+	console.log(n);
+}
+const a = 42;
+log(42);

```

## `terser/functions/duplicate_arg_var`

- size: oxc 67 vs reference 24 (+43 bytes)

```js
console.log((function(b) {
	return b + 'ING';
	var b;
})('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASSING');
+console.log((function(b) {
+	return b + 'ING';
+	var b;
+})('PASS'));

```

## `terser/functions/issue_2630_2`

- size: oxc 125 vs reference 82 (+43 bytes)

```js
var c = 0;
!(function() {
	while (f()) {}
	function f() {
		var not_used = (function() {
			c = 1 + c;
		})(c = c + 1);
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,9 @@
 var c = 0;
-!(function() {
-	while (void (c = 1 + (c += 1)));
+(function() {
+	for (; f(););
+	function f() {
+		(function() {
+			c = 1 + c;
+		})(c += 1);
+	}
 })(), console.log(c);

```

## `terser/harmony/issue_2874_1`

- size: oxc 245 vs reference 202 (+43 bytes)

```js
(function() {
	function foo() {
		let letters = [
			'A',
			'B',
			'C'
		];
		let result = [
			2,
			1,
			0
		].map((key) => bar(letters[key] + key));
		return result;
	}
	function bar(value) {
		return () => console.log(value);
	}
	foo().map((fn) => fn());
})();

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,18 @@
 (function() {
-	let letters = [
-		'A',
-		'B',
-		'C'
-	];
-	return [
-		2,
-		1,
-		0
-	].map((key) => {
-		return value = letters[key] + key, () => console.log(value);
-		var value;
-	});
-})().map((fn) => fn());
+	function foo() {
+		let letters = [
+			'A',
+			'B',
+			'C'
+		];
+		return [
+			2,
+			1,
+			0
+		].map((key) => bar(letters[key] + key));
+	}
+	function bar(value) {
+		return () => console.log(value);
+	}
+	foo().map((fn) => fn());
+})();

```

## `terser/hoist_props/undefined_key`

- size: oxc 59 vs reference 16 (+43 bytes)

```js
var a, o = {};
o[a] = 1;
o.b = 2;
console.log(o[a] + o.b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(3);
+var a, o = {};
+o[a] = 1;
+o.b = 2;
+console.log(o[a] + o.b);

```

## `terser/issue_1609/chained_evaluation_2`

- size: oxc 99 vs reference 56 (+43 bytes)

```js
(function() {
	var a = 'long piece of string';
	(function() {
		var b = a, c;
		c = f(b);
		c.bar = b;
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-f('long piece of string').bar = 'long piece of string';
+(function() {
+	(function() {
+		var b = 'long piece of string', c = f(b);
+		c.bar = b;
+	})();
+})();

```

## `terser/reduce_vars/issue_432_1`

- size: oxc 43 vs reference 0 (+43 bytes)

```js
const selectServer = () => {
	selectServers();
};
function selectServers() {
	const retrySelection = () => {
		var descriptionChangedHandler = () => {
			selectServers();
		};
	};
	retrySelection();
}
leak(() => Topology);
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+leak(() => Topology), console.log('PASS');

```

## `terser/reduce_vars/issue_432_2`

- size: oxc 43 vs reference 0 (+43 bytes)

```js
const selectServer = () => {
	selectServers();
};
function selectServers() {
	function retrySelection() {
		var descriptionChangedHandler = () => {
			selectServers();
		};
		leak(descriptionChangedHandler);
	}
	retrySelection();
}
leak(() => Topology);
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+leak(() => Topology), console.log('PASS');

```

## `terser/block_scope/switch_block_scope_mangler`

- size: oxc 291 vs reference 247 (+44 bytes)

```js
var fn = function(code) {
	switch (code) {
		case 1:
			let apple = code + 1;
			let dog = code + 4;
			console.log(apple, dog);
			break;
		case 2:
			let banana = code + 2;
			console.log(banana);
			break;
		default:
			let cat = code + 3;
			console.log(cat);
	}
};
fn(1);
fn(2);
fn(3);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,17 @@
-var fn = function(e) {
-	switch (e) {
+var fn = function(code) {
+	switch (code) {
 		case 1:
-			let l = e + 1;
-			let o = e + 4;
-			console.log(l, o);
+			let apple = code + 1;
+			let dog = code + 4;
+			console.log(apple, dog);
 			break;
 		case 2:
-			let n = e + 2;
-			console.log(n);
+			let banana = code + 2;
+			console.log(banana);
 			break;
 		default:
-			let c = e + 3;
-			console.log(c);
+			let cat = code + 3;
+			console.log(cat);
 	}
 };
 fn(1);

```

## `terser/destructuring/unused_destructuring_decl_1`

- size: oxc 110 vs reference 66 (+44 bytes)

```js
let { x: L, y } = { x: 2 };
var { U: u, V } = { V: 3 };
const { C, D } = {
	C: 1,
	D: 4
};
console.log(L, V);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-let { x: L } = { x: 2 };
-var { V } = { V: 3 };
+let { x: L, y } = { x: 2 };
+var { U: u, V } = { V: 3 };
+const { C, D } = {
+	C: 1,
+	D: 4
+};
 console.log(L, V);

```

## `terser/evaluate/prototype_function`

- size: oxc 255 vs reference 211 (+44 bytes)

```js
var a = { valueOf: 0 } < 1;
var b = { toString: 0 } < 1;
var c = { valueOf: 0 } + '';
var d = { toString: 0 } + '';
var e = ({ valueOf: 0 } + '')[2];
var f = ({ toString: 0 } + '')[2];
var g = { valueOf: 0 }.valueOf();
var h = { toString: 0 }.toString();

```

```diff
--- reference
+++ oxc
@@ -4,5 +4,5 @@
 var d = { toString: 0 } + '';
 var e = ({ valueOf: 0 } + '')[2];
 var f = ({ toString: 0 } + '')[2];
-var g = 0();
-var h = 0();
+var g = { valueOf: 0 }.valueOf();
+var h = { toString: 0 }.toString();

```

## `terser/export/issue_333_toplevel`

- size: oxc 158 vs reference 114 (+44 bytes)

```js
function shortOut() {
	return function() {};
}
var setToString = shortOut();
var _setToString = setToString;
export function baseRest() {
	return _setToString();
}
export { _setToString };

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-var _setToString = function() {};
+function shortOut() {
+	return function() {};
+}
+var _setToString = shortOut();
 export function baseRest() {
 	return _setToString();
 }

```

## `terser/issue_281/negate_iife_4`

- size: oxc 114 vs reference 70 (+44 bytes)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);
(function() {
	console.log('something');
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-t ? console.log(true) : console.log(false), console.log('something');
+(function() {
+	return t;
+})() ? console.log(!0) : console.log(!1), (function() {
+	console.log('something');
+})();

```

## `terser/issue_281/negate_iife_5`

- size: oxc 98 vs reference 54 (+44 bytes)

```js
if ((function() {
	return t;
})()) {
	foo(true);
} else {
	bar(false);
}
(function() {
	console.log('something');
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-t ? foo(true) : bar(false), console.log('something');
+(function() {
+	return t;
+})() ? foo(!0) : bar(!1), (function() {
+	console.log('something');
+})();

```

## `terser/issue_281/negate_iife_5_off`

- size: oxc 98 vs reference 54 (+44 bytes)

```js
if ((function() {
	return t;
})()) {
	foo(true);
} else {
	bar(false);
}
(function() {
	console.log('something');
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-t ? foo(true) : bar(false), console.log('something');
+(function() {
+	return t;
+})() ? foo(!0) : bar(!1), (function() {
+	console.log('something');
+})();

```

## `terser/issue_281/wrap_iife`

- size: oxc 70 vs reference 26 (+44 bytes)

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
@@ -1 +1,5 @@
-void console.log('test');
+(function() {
+	return function() {
+		console.log('test');
+	};
+})()();

```

## `terser/issue_281/wrap_iife_in_return_call`

- size: oxc 74 vs reference 30 (+44 bytes)

```js
(function() {
	return (function() {
		console.log('test');
	})();
})()();

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-(void console.log('test'))();
+(function() {
+	return (function() {
+		console.log('test');
+	})();
+})()();

```

## `terser/loops/issue_2904`

- size: oxc 44 vs reference 0 (+44 bytes)

```js
var a = 1;
do {
	console.log(a);
} while (--a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+var a = 1;
+do
+	console.log(a);
+while (--a);

```

## `terser/pure_getters/collapse_rhs_call`

- size: oxc 44 vs reference 0 (+44 bytes)

```js
var o = {};
function f() {
	console.log('PASS');
}
o.f = f;
f();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+function f() {
+	console.log('PASS');
+}
+f();

```

## `terser/reduce_vars/toplevel_on_loops_2`

- size: oxc 74 vs reference 30 (+44 bytes)

```js
function bar() {
	console.log('bar:');
}
var x = 3;
do {
	bar();
} while (x);

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-for (;;) console.log('bar:');
+function bar() {
+	console.log('bar:');
+}
+var x = 3;
+do
+	bar();
+while (x);

```

## `terser/switch/issue_1083_3`

- size: oxc 209 vs reference 165 (+44 bytes)

```js
function test(definitely_true, maybe_true) {
	switch (true) {
		case maybe_true:
			console.log('maybe');
			break;
		default:
		case definitely_true:
			console.log('definitely');
			break;
	}
}
test(true, false);
test(true, true);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,11 @@
 function test(definitely_true, maybe_true) {
-	if (true === maybe_true) console.log('maybe');
-	else console.log('definitely');
+	switch (!0) {
+		case maybe_true:
+			console.log('maybe');
+			break;
+		default:
+		case definitely_true: console.log('definitely');
+	}
 }
-test(true, false);
-test(true, true);
+test(!0, !1);
+test(!0, !0);

```

## `terser/switch/issue_1083_4`

- size: oxc 209 vs reference 165 (+44 bytes)

```js
function test(definitely_true, maybe_true) {
	switch (true) {
		case maybe_true:
			console.log('maybe');
			break;
		case definitely_true:
		default:
			console.log('definitely');
			break;
	}
}
test(true, false);
test(true, true);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,11 @@
 function test(definitely_true, maybe_true) {
-	if (true === maybe_true) console.log('maybe');
-	else console.log('definitely');
+	switch (!0) {
+		case maybe_true:
+			console.log('maybe');
+			break;
+		case definitely_true:
+		default: console.log('definitely');
+	}
 }
-test(true, false);
-test(true, true);
+test(!0, !1);
+test(!0, !0);

```

## `terser/expression/pow_with_parentheses`

- size: oxc 132 vs reference 87 (+45 bytes)

```js
var g = (-7) ** .5;
var h = 2324334 ** 34343443;
var i = (-2324334) ** 34343443;
var j = 2 ** -3;
var k = 2 ** -3;
var l = 2 ** (5 - 7);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var g = 0 / 0;
-var h = 1 / 0;
-var i = -1 / 0;
-var j = .125;
-var k = .125;
-var l = .25;
+var g = (-7) ** .5;
+var h = 2324334 ** 34343443;
+var i = (-2324334) ** 34343443;
+var j = 2 ** -3;
+var k = 2 ** -3;
+var l = 2 ** -2;

```

## `terser/reduce_vars/defun_var_1`

- size: oxc 80 vs reference 35 (+45 bytes)

```js
var a = 42, b;
function a() {}
function b() {}
console.log(typeof a, typeof b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('number', 'function');
+var a = 42, b;
+function a() {}
+function b() {}
+console.log(typeof a, typeof b);

```

## `terser/reduce_vars/defun_var_2`

- size: oxc 80 vs reference 35 (+45 bytes)

```js
function a() {}
function b() {}
var a = 42, b;
console.log(typeof a, typeof b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('number', 'function');
+function a() {}
+function b() {}
+var a = 42, b;
+console.log(typeof a, typeof b);

```

## `terser/reduce_vars/func_arg_2`

- size: oxc 66 vs reference 21 (+45 bytes)

```js
var a = 42;
!(function(a) {
	console.log(a());
})(function(a) {
	return a;
});

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(void 0);
+(function(a) {
+	console.log(a());
+})(function(a) {
+	return a;
+});

```

## `terser/drop_unused/issue_t161_top_retain_13`

- size: oxc 113 vs reference 67 (+46 bytes)

```js
const f = () => x;
const g = () => y;
const h = () => z;
const x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-const g = () => y, y = 3;
-console.log(2, 3, 4, 6, 8, 12, 2, 3, 4);
+const f = () => x, g = () => y, h = () => z, x = 2, y = 3, z = 4;
+console.log(2, 3, 4, 6, 8, 12, f(), g(), h());

```

## `terser/drop_unused/issue_t183`

- size: oxc 121 vs reference 75 (+46 bytes)

```js
function foo(val) {
	function bar(x) {
		if (x) return x;
		bar(x - 1);
	}
	return bar(val);
}
console.log(foo('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-console.log((function bar(x) {
-	if (x) return x;
-	bar(x - 1);
-})('PASS'));
+function foo(val) {
+	function bar(x) {
+		if (x) return x;
+		bar(x - 1);
+	}
+	return bar(val);
+}
+console.log(foo('PASS'));

```

## `terser/evaluate/self_comparison_1`

- size: oxc 95 vs reference 49 (+46 bytes)

```js
var o = { n: NaN };
console.log(typeof o.n, o.n == o.n, o.n === o.n, o.n != o.n, o.n !== o.n);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('number', false, false, true, true);
+var o = { n: NaN };
+console.log(typeof o.n, o.n == o.n, o.n === o.n, o.n != o.n, o.n !== o.n);

```

## `terser/evaluate/self_comparison_2`

- size: oxc 95 vs reference 49 (+46 bytes)

```js
var o = { n: NaN };
console.log(typeof o.n, o.n == o.n, o.n === o.n, o.n != o.n, o.n !== o.n);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('number', false, false, true, true);
+var o = { n: NaN };
+console.log(typeof o.n, o.n == o.n, o.n === o.n, o.n != o.n, o.n !== o.n);

```

## `terser/evaluate/unsafe_integer_key`

- size: oxc 118 vs reference 72 (+46 bytes)

```js
console.log({ 0: 1 } + 1, { 0: 1 }[0] + 1, { 0: 1 }['0'] + 1, { 0: 1 }[1] + 1, { 0: 1 }[0][1] + 1, { 0: 1 }[0]['1'] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log({ 0: 1 } + 1, 2, 2, { 0: 1 }[1] + 1, 1[1] + 1, 1['1'] + 1);
+console.log({ 0: 1 } + 1, { 0: 1 }[0] + 1, { 0: 1 }[0] + 1, { 0: 1 }[1] + 1, { 0: 1 }[0][1] + 1, { 0: 1 }[0][1] + 1);

```

## `terser/loops/dead_code_condition`

- size: oxc 92 vs reference 46 (+46 bytes)

```js
for (var a = 0, b = 5; (a += 1, 3) - 3 && b > 0; b--) {
	var c = (function() {
		b--;
	})(a++);
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-var a = 0, b = 5;
-var c;
-console.log(a += 1);
+for (var a = 0, b = 5; a += 1, 0; b--) var c = (function() {
+	b--;
+})(a++);
+console.log(a);

```

## `terser/reduce_vars/escaped_prop_1`

- size: oxc 106 vs reference 60 (+46 bytes)

```js
var obj = { o: { a: 1 } };
(function(o) {
	o.a++;
})(obj.o);
(function(o) {
	console.log(o.a);
})(obj.o);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 var obj = { o: { a: 1 } };
-obj.o.a++;
-console.log(obj.o.a);
+(function(o) {
+	o.a++;
+})(obj.o);
+(function(o) {
+	console.log(o.a);
+})(obj.o);

```

## `terser/reduce_vars/escaped_prop_2`

- size: oxc 106 vs reference 60 (+46 bytes)

```js
var obj = { o: { a: 1 } };
(function(o) {
	o.a++;
})(obj.o);
(function(o) {
	console.log(o.a);
})(obj.o);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 var obj = { o: { a: 1 } };
-obj.o.a++;
-console.log(obj.o.a);
+(function(o) {
+	o.a++;
+})(obj.o);
+(function(o) {
+	console.log(o.a);
+})(obj.o);

```

## `terser/reduce_vars/issue_2423_5`

- size: oxc 90 vs reference 44 (+46 bytes)

```js
function x() {
	y();
}
function y() {
	console.log(1);
}
function z() {
	function y() {
		console.log(2);
	}
	x();
}
z();
z();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,11 @@
+function x() {
+	y();
+}
+function y() {
+	console.log(1);
+}
 function z() {
-	console.log(1);
+	x();
 }
 z();
 z();

```

## `terser/reduce_vars/shorthand_obj_arg_1`

- size: oxc 101 vs reference 55 (+46 bytes)

```js
var C = 1;
var bar = function() {
	return C + C;
};
function f(obj) {
	return obj.bar();
}
console.log(f({ bar }));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-console.log({ bar: function() {
+var bar = function() {
 	return 2;
-} }.bar());
+};
+function f(obj) {
+	return obj.bar();
+}
+console.log(f({ bar }));

```

## `terser/reduce_vars/shorthand_obj_arg_2`

- size: oxc 101 vs reference 55 (+46 bytes)

```js
var C = 1;
var bar = function() {
	return C + C;
};
function f(obj) {
	return obj.bar();
}
console.log(f({ bar }));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-console.log({ bar: function() {
+var bar = function() {
 	return 2;
-} }.bar());
+};
+function f(obj) {
+	return obj.bar();
+}
+console.log(f({ bar }));

```

## `terser/switch/issue_376`

- size: oxc 90 vs reference 44 (+46 bytes)

```js
switch (true) {
	case boolCondition:
		console.log(1);
		break;
	case false:
		console.log(2);
		break;
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-if (true === boolCondition) console.log(1);
+switch (!0) {
+	case boolCondition:
+		console.log(1);
+		break;
+	case !1: console.log(2);
+}

```

## `terser/expansions/avoid_spread_holes_call`

- size: oxc 47 vs reference 0 (+47 bytes)

```js
let x = (a, b) => [a, b];
let y = x(...[,], 1);
console.log(...y);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+console.log(...((a, b) => [a, b])(void 0, 1));

```

## `terser/functions/issue_2107`

- size: oxc 144 vs reference 97 (+47 bytes)

```js
var c = 0;
!(function() {
	c++;
})(c++ + new (function() {
	this.a = 0;
	var a = (c = c + 1) + (c = 1 + c);
	return c++ + a;
})());
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 var c = 0;
-c++, new (function() {
-	this.a = 0, c = 1 + (c += 1), c++;
-})(), c++, console.log(c);
+(function() {
+	c++;
+})(c++ + new (function() {
+	this.a = 0;
+	var a = (c += 1) + (c = 1 + c);
+	return c++ + a;
+})()), console.log(c);

```

## `terser/harmony/array_literal_with_spread_2b`

- size: oxc 316 vs reference 269 (+47 bytes)

```js
var x = [30, 40];
console.log([
	10,
	...[],
	20,
	...x,
	50
]['length']);
console.log([
	10,
	...[],
	20,
	...x,
	50
][0]);
console.log([
	10,
	...[],
	20,
	...x,
	50
][1]);
console.log([
	10,
	...[],
	20,
	...x,
	50
][2]);
console.log([
	10,
	...[],
	20,
	...x,
	50
][3]);
console.log([
	10,
	...[],
	20,
	...x,
	50
][4]);
console.log([
	10,
	...[],
	20,
	...x,
	50
][5]);

```

```diff
--- reference
+++ oxc
@@ -4,9 +4,19 @@
 	20,
 	...x,
 	50
-]['length']);
-console.log(10);
-console.log(20);
+].length);
+console.log([
+	10,
+	20,
+	...x,
+	50
+][0]);
+console.log([
+	10,
+	20,
+	...x,
+	50
+][1]);
 console.log([
 	10,
 	20,

```

## `terser/dead_code/unsafe_builtin`

- size: oxc 60 vs reference 12 (+48 bytes)

```js
(!w).constructor(x);
Math.abs(y);
[
	1,
	2,
	z
].valueOf();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-w, x;
-y;
-z;
+(!w).constructor(x);
+Math.abs(y);
+[
+	1,
+	2,
+	z
+].valueOf();

```

## `terser/drop_unused/issue_t161_top_retain_12`

- size: oxc 167 vs reference 119 (+48 bytes)

```js
function f() {
	return x;
}
function g() {
	return y;
}
function h() {
	return z;
}
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,11 @@
+function f() {
+	return x;
+}
 function g() {
 	return y;
 }
 function h() {
 	return z;
 }
-var y = 3, z = 4;
-console.log(2, 3, 4, 6, 8, 12, 2, g(), h());
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

## `terser/reduce_vars/unsafe_evaluate_side_effect_free_1`

- size: oxc 250 vs reference 202 (+48 bytes)

```js
console.log((function() {
	var o = { p: 1 };
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 2 };
	console.log(o.p);
	return o;
})());
console.log((function() {
	var o = { p: 3 };
	console.log([o][0].p);
	return o.p;
})());

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,15 @@
 console.log((function() {
-	console.log(1);
-	return 1;
+	var o = { p: 1 };
+	console.log(o.p);
+	return o.p;
 })());
 console.log((function() {
 	var o = { p: 2 };
-	console.log(2);
+	console.log(o.p);
 	return o;
 })());
 console.log((function() {
-	console.log(3);
-	return 3;
+	var o = { p: 3 };
+	console.log(o.p);
+	return o.p;
 })());

```

## `terser/issue_281/issue_1254_negate_iife_true`

- size: oxc 70 vs reference 21 (+49 bytes)

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
@@ -1 +1,5 @@
-console.log('test');
+(function() {
+	return function() {
+		console.log('test');
+	};
+})()();

```

## `terser/reduce_vars/func_arg_1`

- size: oxc 66 vs reference 17 (+49 bytes)

```js
var a = 42;
!(function(a) {
	console.log(a());
})(function() {
	return a;
});

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(42);
+(function(a) {
+	console.log(a());
+})(function() {
+	return 42;
+});

```

## `terser/async/async_inline`

- size: oxc 356 vs reference 306 (+50 bytes)

```js
(async function() {
	return await 3;
})();
(async function(x) {
	await console.log(x);
})(4);
function invoke(x, y) {
	return x(y);
}
invoke(async function() {
	return await 1;
});
invoke(async function(x) {
	await console.log(x);
}, 2);
function top() {
	console.log('top');
}
top();
async function async_top() {
	console.log('async_top');
}
async_top();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
-!(async function() {
-	await 3;
-})();
-!(async function(x) {
-	await console.log(4);
+(async function() {
+	return await 3;
 })();
+(async function(x) {
+	await console.log(x);
+})(4);
 function invoke(x, y) {
 	return x(y);
 }
@@ -13,7 +13,11 @@
 invoke(async function(x) {
 	await console.log(x);
 }, 2);
-console.log('top');
-!(async function() {
+function top() {
+	console.log('top');
+}
+top();
+async function async_top() {
 	console.log('async_top');
-})();
+}
+async_top();

```

## `terser/harmony/issue_2874_3`

- size: oxc 105 vs reference 55 (+50 bytes)

```js
function f() {
	return x + y;
}
let x, y;
let a = (z) => {
	x = 'A';
	y = z;
	console.log(f());
};
a(1);
a(2);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-let a = (z) => {
-	console.log('A' + z);
+function f() {
+	return x + y;
+}
+let x, y, a = (z) => {
+	x = 'A', y = z, console.log(f());
 };
 a(1), a(2);

```

## `terser/identity/inline_identity_duplicate_arg_var`

- size: oxc 69 vs reference 19 (+50 bytes)

```js
const id = (x) => {
	return x;
	var x;
};
console.log(id(1), id(2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(1, 2);
+const id = (x) => {
+	return x;
+	var x;
+};
+console.log(id(1), id(2));

```

## `terser/issue_1750/case_2`

- size: oxc 94 vs reference 44 (+50 bytes)

```js
var a = 0, b = 1;
switch (0) {
	default: b = 2;
	case a: a = 3;
	case 0:
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 var a = 0, b = 1;
-a = 3;
+switch (0) {
+	default: b = 2;
+	case a: a = 3;
+	case 0:
+}
 console.log(a, b);

```

## `terser/parameters/accept_destructuring_async_word_with_default`

- size: oxc 50 vs reference 0 (+50 bytes)

```js
console.log((({ async = 'PASS' }) => async)({}));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+console.log((({ async = 'PASS' }) => async)({}));

```

## `terser/properties/issue_2208_5`

- size: oxc 67 vs reference 17 (+50 bytes)

```js
console.log({
	p: 'FAIL',
	p: function() {
		return 42;
	}
}.p());

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(42);
+console.log({
+	p: 'FAIL',
+	p: function() {
+		return 42;
+	}
+}.p());

```

## `terser/switch/issue_1679`

- size: oxc 192 vs reference 142 (+50 bytes)

```js
var a = 100, b = 10;
function f() {
	switch (--b) {
		default:
		case !function x() {}: break;
		case b--:
			switch (0) {
				default:
				case a--:
			}
			break;
		case a++: break;
	}
}
f();
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,13 @@
 function f() {
 	switch (--b) {
 		default:
-		case false: break;
-		case b--: a--;
+		case !1: break;
+		case b--:
+			switch (0) {
+				default:
+				case a--:
+			}
+			break;
 		case a++:
 	}
 }

```

## `terser/collapse_vars/cond_branch_1`

- size: oxc 266 vs reference 215 (+51 bytes)

```js
function f1(b, c) {
	var log = console.log;
	var a = ++c;
	if (b) b++;
	log(a, b);
}
function f2(b, c) {
	var log = console.log;
	var a = ++c;
	b && b++;
	log(a, b);
}
function f3(b, c) {
	var log = console.log;
	var a = ++c;
	b ? b++ : b--;
	log(a, b);
}
f1(1, 2);
f2(3, 4);
f3(5, 6);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
 function f1(b, c) {
-	if (b) b++;
-	(0, console.log)(++c, b);
+	var log = console.log, a = ++c;
+	b && b++, log(a, b);
 }
 function f2(b, c) {
-	b && b++, (0, console.log)(++c, b);
+	var log = console.log, a = ++c;
+	b && b++, log(a, b);
 }
 function f3(b, c) {
-	b ? b++ : b--, (0, console.log)(++c, b);
+	var log = console.log, a = ++c;
+	b ? b++ : b--, log(a, b);
 }
 f1(1, 2), f2(3, 4), f3(5, 6);

```

## `terser/destructuring/empty_object_destructuring_3`

- size: oxc 103 vs reference 52 (+51 bytes)

```js
var {} = Object;
let { L } = Object, L2 = 'foo';
const bar = 'bar', { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-const { C2 = console.log('side effect') } = Object;
+var {} = Object;
+let { L } = Object;
+const { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

## `terser/destructuring/empty_object_destructuring_4`

- size: oxc 103 vs reference 52 (+51 bytes)

```js
var {} = Object;
let { L } = Object, L2 = 'foo';
const bar = 'bar', { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-const { C2 = console.log('side effect') } = Object;
+var {} = Object;
+let { L } = Object;
+const { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

## `terser/functions/issue_2084`

- size: oxc 168 vs reference 117 (+51 bytes)

```js
var c = 0;
!(function() {
	!(function(c) {
		c = 1 + c;
		var c = 0;
		function f14(a_1) {
			if (c = 1 + c, 0 !== 23 .toString()) c = 1 + c, a_1 && (a_1[0] = 0);
		}
		f14();
	})(-1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-var c = 0;
-!(function(c) {
-	c = 1 + c, c = 1 + (c = 0), 0 !== 23 .toString() && (c = 1 + c);
-})(-1), console.log(c);
+(function() {
+	(function(c) {
+		c = 1 + c;
+		var c = 0;
+		function f14(a_1) {
+			c = 1 + c, c = 1 + c, a_1 && (a_1[0] = 0);
+		}
+		f14();
+	})(-1);
+})(), console.log(0);

```

## `terser/harmony/issue_2874_2`

- size: oxc 293 vs reference 242 (+51 bytes)

```js
(function() {
	let keys = [];
	function foo() {
		var result = [
			2,
			1,
			0
		].map((value) => {
			keys.push(value);
			return bar();
		});
		return result;
	}
	function bar() {
		var letters = [
			'A',
			'B',
			'C'
		], key = keys.shift();
		return () => console.log(letters[key] + key);
	}
	foo().map((fn) => fn());
})();

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,19 @@
 (function() {
 	let keys = [];
-	[
-		2,
-		1,
-		0
-	].map((value) => {
-		return keys.push(value), letters = [
+	function foo() {
+		return [
+			2,
+			1,
+			0
+		].map((value) => (keys.push(value), bar()));
+	}
+	function bar() {
+		var letters = [
 			'A',
 			'B',
 			'C'
-		], key = keys.shift(), () => console.log(letters[key] + key);
-		var letters, key;
-	}).map((fn) => fn());
+		], key = keys.shift();
+		return () => console.log(letters[key] + key);
+	}
+	foo().map((fn) => fn());
 })();

```

## `terser/collapse_vars/issue_2436_6`

- size: oxc 83 vs reference 31 (+52 bytes)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,9 @@
-console.log({
-	x: 1,
-	y: 2
-});
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})({
+	a: 1,
+	b: 2
+}));

```

## `terser/collapse_vars/issue_2436_7`

- size: oxc 83 vs reference 31 (+52 bytes)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,9 @@
-console.log({
-	x: 1,
-	y: 2
-});
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})({
+	a: 1,
+	b: 2
+}));

```

## `terser/functions/avoid_generating_duplicate_functions_compared_together_3`

- size: oxc 52 vs reference 0 (+52 bytes)

```js
const x = () => null;
console.log(id(x) === id(x));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+const x = () => null;
+console.log(id(x) === id(x));

```

## `terser/functions/drop_lone_use_strict_arrows_1`

- size: oxc 108 vs reference 56 (+52 bytes)

```js
var f0 = () => 0;
var f1 = () => {
	'use strict';
};
var f2 = () => {
	'use strict';
	var f3 = () => {
		'use strict';
	};
};
(() => {
	'use strict';
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,8 @@
 var f0 = () => 0;
-var f1 = () => {};
-var f2 = () => {};
+var f1 = () => {
+	'use strict';
+};
+var f2 = () => {
+	'use strict';
+	var f3 = () => {};
+};

```

## `terser/reduce_vars/variables_collision_in_immediately_invoked_func`

- size: oxc 204 vs reference 152 (+52 bytes)

```js
(function(callback) {
	callback();
})(function() {
	window.used = function() {
		var A = window.foo, B = window.bar, C = window.foobar;
		return (function(A, c) {
			if (-1 === c) return A;
			return $(A, c);
		})(B, C);
	}.call(this);
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
-!function() {
-	window.used = (function() {
-		window.foo;
-		var B = window.bar, C = window.foobar;
-		return -1 === C ? B : $(B, C);
-	}).call(this);
-}();
+(function(callback) {
+	callback();
+})(function() {
+	window.used = function() {
+		return window.foo, (function(A, c) {
+			return c === -1 ? A : $(A, c);
+		})(window.bar, window.foobar);
+	}.call(this);
+});

```

## `terser/functions/issue_2630_3`

- size: oxc 142 vs reference 89 (+53 bytes)

```js
var x = 2, a = 1;
(function() {
	function f1(a) {
		f2();
		--x >= 0 && f1({});
	}
	f1(a++);
	function f2() {
		a++;
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,12 @@
 var x = 2, a = 1;
-(function f1(a1) {
-	a++;
-	--x >= 0 && f1({});
-})(a++);
+(function() {
+	function f1(a) {
+		f2();
+		--x >= 0 && f1({});
+	}
+	f1(a++);
+	function f2() {
+		a++;
+	}
+})();
 console.log(a);

```

## `terser/hoist_props/name_collision_2`

- size: oxc 149 vs reference 96 (+53 bytes)

```js
var o = {
	p: 1,
	'+': function(x) {
		return x;
	},
	'-': function(x) {
		return x + 1;
	}
}, o__$0 = 2, o__$1 = 3;
console.log(o.p === o.p, o['+'](4), o['-'](5), o__$0, o__$1);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,10 @@
-var o_p = 1;
-console.log(true, function() {
-	return 4;
-}(), function() {
-	return 6;
-}(), 2, 3);
+var o = {
+	p: 1,
+	'+': function(x) {
+		return x;
+	},
+	'-': function(x) {
+		return x + 1;
+	}
+};
+console.log(o.p === o.p, o['+'](4), o['-'](5), 2, 3);

```

## `terser/hoist_props/name_collision_3`

- size: oxc 165 vs reference 112 (+53 bytes)

```js
var o = {
	p: 1,
	'+': function(x) {
		return x;
	},
	'-': function(x) {
		return x + 1;
	}
}, o__$0 = 2, o__$1 = 3;
console.log(o.p === o.p, o['+'](4), o['-'](5));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,10 @@
-var o_p = 1, o__$0 = 2, o__$1 = 3;
-console.log(true, function() {
-	return 4;
-}(), function() {
-	return 6;
-}());
+var o = {
+	p: 1,
+	'+': function(x) {
+		return x;
+	},
+	'-': function(x) {
+		return x + 1;
+	}
+}, o__$0 = 2, o__$1 = 3;
+console.log(o.p === o.p, o['+'](4), o['-'](5));

```

## `terser/properties/prop_side_effects_2`

- size: oxc 85 vs reference 32 (+53 bytes)

```js
var C = 1;
console.log(C);
var obj = { '': function() {
	return C + C;
} };
console.log(obj['']());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-console.log(1);
-console.log(2);
+var C = 1;
+console.log(C);
+console.log({ '': function() {
+	return C + C;
+} }['']());

```

## `terser/reduce_vars/issue_1670_1`

- size: oxc 74 vs reference 21 (+53 bytes)

```js
(function f() {
	switch (1) {
		case 0:
			var a = true;
			break;
		default: if (typeof a === 'undefined') console.log('PASS');
		else console.log('FAIL');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS');
+(function() {
+	console.log(a === void 0 ? 'PASS' : 'FAIL');
+	var a;
+})();

```

## `terser/reduce_vars/issue_1670_2`

- size: oxc 74 vs reference 21 (+53 bytes)

```js
(function f() {
	switch (1) {
		case 0:
			var a = true;
			break;
		default: if (typeof a === 'undefined') console.log('PASS');
		else console.log('FAIL');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS');
+(function() {
+	console.log(a === void 0 ? 'PASS' : 'FAIL');
+	var a;
+})();

```

## `terser/reduce_vars/issue_1670_3`

- size: oxc 74 vs reference 21 (+53 bytes)

```js
(function f() {
	switch (1) {
		case 0:
			var a = true;
			break;
		case 1: if (typeof a === 'undefined') console.log('PASS');
		else console.log('FAIL');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS');
+(function() {
+	console.log(a === void 0 ? 'PASS' : 'FAIL');
+	var a;
+})();

```

## `terser/reduce_vars/issue_1670_4`

- size: oxc 74 vs reference 21 (+53 bytes)

```js
(function f() {
	switch (1) {
		case 0:
			var a = true;
			break;
		case 1: if (typeof a === 'undefined') console.log('PASS');
		else console.log('FAIL');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS');
+(function() {
+	console.log(a === void 0 ? 'PASS' : 'FAIL');
+	var a;
+})();

```

## `terser/reduce_vars/issue_2423_4`

- size: oxc 69 vs reference 16 (+53 bytes)

```js
function c() {
	return 1;
}
function p() {
	console.log(c());
}
p();

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-console.log(1);
+function c() {
+	return 1;
+}
+function p() {
+	console.log(c());
+}
+p();

```

## `terser/collapse_vars/issue_2437`

- size: oxc 458 vs reference 404 (+54 bytes)

```js
function foo() {
	bar();
}
function bar() {
	if (xhrDesc) {
		var req = new XMLHttpRequest();
		var result = !!req.onreadystatechange;
		Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {});
		return result;
	} else {
		var req = new XMLHttpRequest();
		var detectFunc = function() {};
		req.onreadystatechange = detectFunc;
		var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
		req.onreadystatechange = null;
		return result;
	}
}
foo();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,14 @@
-!(function() {
+function foo() {
+	bar();
+}
+function bar() {
 	if (xhrDesc) {
-		var result = !!(req = new XMLHttpRequest()).onreadystatechange;
+		var req = new XMLHttpRequest(), result = !!req.onreadystatechange;
 		return Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {}), result;
 	}
-	var req, detectFunc = function() {};
-	(req = new XMLHttpRequest()).onreadystatechange = detectFunc, result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc, req.onreadystatechange = null;
-})();
+	var req = new XMLHttpRequest(), detectFunc = function() {};
+	req.onreadystatechange = detectFunc;
+	var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
+	return req.onreadystatechange = null, result;
+}
+foo();

```

## `terser/classes/pure_prop_assignment_for_classes`

- size: oxc 55 vs reference 0 (+55 bytes)

```js
class A {}
A.staticProp = 'A';
class B {
	static get danger() {}
}
B.staticProp = '';

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+class B {
+	static get danger() {}
+}
+B.staticProp = '';

```

## `terser/drop_unused/delete_assign_1`

- size: oxc 170 vs reference 115 (+55 bytes)

```js
var a;
console.log(delete (a = undefined));
console.log(delete (a = void 0));
console.log(delete (a = Infinity));
console.log(delete (a = 1 / 0));
console.log(delete (a = NaN));
console.log(delete (a = 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(delete Infinity);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete void 0);
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/arrow/issue_2084`

- size: oxc 168 vs reference 111 (+57 bytes)

```js
var c = 0;
!(function() {
	!(function(c) {
		c = 1 + c;
		var c = 0;
		function f14(a_1) {
			if (c = 1 + c, 0 !== 23 .toString()) c = 1 + c, a_1 && (a_1[0] = 0);
		}
		f14();
	})(-1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-var c = 0;
-((c) => {
-	c = 1 + c, c = 1 + (c = 0), 0 !== 23 .toString() && (c = 1 + c);
-})(-1), console.log(c);
+(function() {
+	(function(c) {
+		c = 1 + c;
+		var c = 0;
+		function f14(a_1) {
+			c = 1 + c, c = 1 + c, a_1 && (a_1[0] = 0);
+		}
+		f14();
+	})(-1);
+})(), console.log(0);

```

## `terser/harmony/array_literal_with_spread_4b`

- size: oxc 594 vs reference 537 (+57 bytes)

```js
var nothing = [];
function t(x) {
	console.log('(' + x + ')');
	return 10 * x;
}
console.log([t(1), t(2)][0]);
console.log([t(1), t(2)][1]);
console.log([t(1), t(2)][2]);
console.log([
	...nothing,
	t(1),
	t(2)
][0]);
console.log([
	...nothing,
	t(1),
	t(2)
][1]);
console.log([
	...nothing,
	t(1),
	t(2)
][2]);
console.log([
	t(1),
	...nothing,
	t(2)
][0]);
console.log([
	t(1),
	...nothing,
	t(2)
][1]);
console.log([
	t(1),
	...nothing,
	t(2)
][2]);
console.log([
	t(1),
	t(2),
	...nothing
][0]);
console.log([
	t(1),
	t(2),
	...nothing
][1]);
console.log([
	t(1),
	t(2),
	...nothing
][2]);

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 	return 10 * x;
 }
 console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
+console.log([t(1), t(2)][1]);
 console.log([t(1), t(2)][2]);
 console.log([
 	...nothing,
@@ -21,21 +21,33 @@
 	t(1),
 	t(2)
 ][2]);
-console.log([t(1), t(2)][0]);
 console.log([
 	t(1),
 	...nothing,
 	t(2)
+][0]);
+console.log([
+	t(1),
+	...nothing,
+	t(2)
 ][1]);
 console.log([
 	t(1),
 	...nothing,
 	t(2)
 ][2]);
-console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
 console.log([
 	t(1),
 	t(2),
 	...nothing
+][0]);
+console.log([
+	t(1),
+	t(2),
+	...nothing
+][1]);
+console.log([
+	t(1),
+	t(2),
+	...nothing
 ][2]);

```

## `terser/hoist_props/issue_851_hoist_to_conflicting_name`

- size: oxc 92 vs reference 35 (+57 bytes)

```js
const BBB = { CCC: 'PASS' };
if (id(true)) {
	const BBB_CCC = BBB.CCC;
	console.log(BBB_CCC);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-if (id(true)) console.log('PASS');
+const BBB = { CCC: 'PASS' };
+if (id(!0)) {
+	let BBB_CCC = BBB.CCC;
+	console.log(BBB_CCC);
+}

```

## `terser/functions/issue_2101`

- size: oxc 121 vs reference 63 (+58 bytes)

```js
a = {};
console.log((function() {
	return (function() {
		return this.a;
	})();
})() === (function() {
	return a;
})());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 a = {};
 console.log((function() {
-	return this.a;
-})() === a);
+	return (function() {
+		return this.a;
+	})();
+})() === (function() {
+	return a;
+})());

```

## `terser/try_catch/issue_452`

- size: oxc 58 vs reference 0 (+58 bytes)

```js
try {
	const arr = ['PASS'];
	for (const x of arr) {
		console.log(x);
	}
} catch (e) {}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+try {
+	for (let x of ['PASS']) console.log(x);
+} catch {}

```

## `terser/functions/issue_2630_5`

- size: oxc 161 vs reference 102 (+59 bytes)

```js
var c = 1;
!(function() {
	do {
		c *= 10;
	} while (f());
	function f() {
		return (function() {
			return (c = 2 + c) < 100;
		})(c = c + 3);
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,12 @@
 var c = 1;
-!(function() {
-	do {
+(function() {
+	do
 		c *= 10;
-	} while ((c = 2 + (c += 3)) < 100);
+	while (f());
+	function f() {
+		return (function() {
+			return (c = 2 + c) < 100;
+		})(c += 3);
+	}
 })();
 console.log(c);

```

## `terser/identity/inline_identity_higher_order`

- size: oxc 78 vs reference 19 (+59 bytes)

```js
const id = (x) => x;
const inc = (x) => x + 1;
console.log(id(inc(1)), id(inc)(2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(2, 3);
+const id = (x) => x, inc = (x) => x + 1;
+console.log(id(inc(1)), id(inc)(2));

```

## `terser/identity/inline_identity_inline_function`

- size: oxc 78 vs reference 19 (+59 bytes)

```js
const id = (x) => x;
console.log(id((x) => x + 1)(1), id(((x) => x + 1)(2)));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(2, 3);
+const id = (x) => x;
+console.log(id((x) => x + 1)(1), id(((x) => x + 1)(2)));

```

## `terser/reduce_vars/issue_741_reference_cycle`

- size: oxc 59 vs reference 0 (+59 bytes)

```js
for (var a = console.log, s = 1; s <= 3;) {
	var c = s;
	a(c);
	s++;
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+for (var a = console.log, s = 1; s <= 3;) {
+	a(s);
+	s++;
+}

```

## `terser/dead_code/try_catch_finally`

- size: oxc 144 vs reference 84 (+60 bytes)

```js
var a = 1;
!(function() {
	try {
		if (false) throw x;
	} catch (a) {
		var a = 2;
		console.log('FAIL');
	} finally {
		a = 3;
		console.log('PASS');
	}
})();
try {
	console.log(a);
} finally {}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,12 @@
 var a = 1;
-!function() {
-	var a;
-	a = 3;
-	console.log('PASS');
-}();
-console.log(a);
+(function() {
+	try {} catch (a) {
+		var a;
+	} finally {
+		a = 3;
+		console.log('PASS');
+	}
+})();
+try {
+	console.log(a);
+} finally {}

```

## `terser/evaluate/issue_1964_2`

- size: oxc 154 vs reference 94 (+60 bytes)

```js
function f() {
	var long_variable_name = /\s/;
	console.log(long_variable_name.source);
	return 'a b c'.split(long_variable_name)[1];
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f() {
-	console.log(/\s/.source);
-	return 'a b c'.split(/\s/)[1];
+	var long_variable_name = /\s/;
+	console.log(long_variable_name.source);
+	return 'a b c'.split(long_variable_name)[1];
 }
 console.log(f());

```

## `terser/functions/issue_2647_2`

- size: oxc 95 vs reference 35 (+60 bytes)

```js
(function() {
	function foo(x) {
		return x.toUpperCase();
	}
	console.log((() => foo('pass'))());
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log('pass'.toUpperCase());
+(function() {
+	function foo(x) {
+		return x.toUpperCase();
+	}
+	console.log(foo('pass'));
+})();

```

## `terser/functions/issue_2647_3`

- size: oxc 95 vs reference 35 (+60 bytes)

```js
(function() {
	function foo(x) {
		return x.toUpperCase();
	}
	console.log((() => foo('pass'))());
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log('pass'.toUpperCase());
+(function() {
+	function foo(x) {
+		return x.toUpperCase();
+	}
+	console.log(foo('pass'));
+})();

```

## `terser/issue_1275/string_plus_optimization`

- size: oxc 335 vs reference 275 (+60 bytes)

```js
function foo(anything) {
	function throwing_function() {
		throw 'nope';
	}
	try {
		console.log('0' + throwing_function() ? 'yes' : 'no');
	} catch (ex) {
		console.log(ex);
	}
	console.log('0' + anything ? 'yes' : 'no');
	console.log(anything + '0' ? 'Yes' : 'No');
	console.log('' + anything);
	console.log(anything + '');
}
foo();

```

```diff
--- reference
+++ oxc
@@ -3,12 +3,12 @@
 		throw 'nope';
 	}
 	try {
-		console.log((throwing_function(), 'yes'));
+		console.log('0' + throwing_function() ? 'yes' : 'no');
 	} catch (ex) {
 		console.log(ex);
 	}
-	console.log('yes');
-	console.log('Yes');
+	console.log('0' + anything ? 'yes' : 'no');
+	console.log(anything + '0' ? 'Yes' : 'No');
 	console.log('' + anything);
 	console.log(anything + '');
 }

```

## `terser/pure_getters/issue_2838`

- size: oxc 145 vs reference 85 (+60 bytes)

```js
function f(a, b) {
	(a || b).c = 'PASS';
	(function() {
		return f(a, b);
	}).prototype.foo = 'bar';
}
var o = {};
f(null, o);
console.log(o.c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
 function f(a, b) {
 	(a || b).c = 'PASS';
+	(function() {
+		return f(a, b);
+	}).prototype.foo = 'bar';
 }
 var o = {};
 f(null, o);

```

## `terser/drop_unused/double_assign_1`

- size: oxc 333 vs reference 272 (+61 bytes)

```js
function f1() {
	var a = {};
	var a = [];
	return a;
}
function f2() {
	var a = {};
	a = [];
	return a;
}
function f3() {
	a = {};
	var a = [];
	return a;
}
function f4(a) {
	a = {};
	a = [];
	return a;
}
function f5(a) {
	var a = {};
	a = [];
	return a;
}
function f6(a) {
	a = {};
	var a = [];
	return a;
}
console.log(f1(), f2(), f3(), f4(), f5(), f6());

```

```diff
--- reference
+++ oxc
@@ -2,23 +2,28 @@
 	return [];
 }
 function f2() {
-	var a;
+	var a = {};
 	a = [];
 	return a;
 }
 function f3() {
-	return [];
+	a = {};
+	var a = [];
+	return a;
 }
 function f4(a) {
+	a = {};
 	a = [];
 	return a;
 }
 function f5(a) {
+	var a = {};
 	a = [];
 	return a;
 }
 function f6(a) {
-	a = [];
+	a = {};
+	var a = [];
 	return a;
 }
 console.log(f1(), f2(), f3(), f4(), f5(), f6());

```

## `terser/evaluate/unsafe_array_bad_index`

- size: oxc 95 vs reference 34 (+61 bytes)

```js
console.log([
	1,
	2,
	3,
	4
].a + 1, [
	1,
	2,
	3,
	4
]['a'] + 1, [
	1,
	2,
	3,
	4
][3.14] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1,16 @@
-console.log(0 / 0, 0 / 0, 0 / 0);
+console.log([
+	1,
+	2,
+	3,
+	4
+].a + 1, [
+	1,
+	2,
+	3,
+	4
+].a + 1, [
+	1,
+	2,
+	3,
+	4
+][3.14] + 1);

```

## `terser/functions/avoid_generating_duplicate_functions_compared_together`

- size: oxc 61 vs reference 0 (+61 bytes)

```js
const x = () => null;
const y = () => x;
console.log(y() === y());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+const x = () => null, y = () => x;
+console.log(y() === y());

```

## `terser/issue_t50/issue_t50_const`

- size: oxc 83 vs reference 22 (+61 bytes)

```js
(function() {
	const v1 = [4, [{
		a: -1,
		b: 5
	}]];
	const v2 = [4, [{
		a: -2,
		b: 5
	}]];
	const v3 = [4, [{
		a: -3,
		b: 5
	}]];
	const v4 = [4, [{
		a: -4,
		b: 5
	}]];
	const v5 = [4, [{
		a: -5,
		b: 5
	}]];
	const v6 = [4, [{
		a: -6,
		b: 5
	}]];
	const v7 = [4, [{
		a: -7,
		b: 5
	}]];
	const v8 = [4, [{
		a: -8,
		b: 5
	}]];
	const v9 = [4, [{
		a: -9,
		b: 5
	}]];
	const v10 = [4, [{
		a: -10,
		b: 5
	}]];
	const v11 = [4, [{
		a: -11,
		b: 5
	}]];
	const v12 = [4, [{
		a: -12,
		b: 5
	}]];
	const v13 = [4, [{
		a: -13,
		b: 5
	}]];
	const v14 = [4, [{
		a: -14,
		b: 5
	}]];
	const v15 = [4, [{
		a: -15,
		b: 5
	}]];
	const v16 = [4, [{
		a: -16,
		b: 5
	}]];
	const v17 = [4, [{
		a: -17,
		b: 5
	}]];
	const v18 = [4, [{
		a: -18,
		b: 5
	}]];
	const v19 = [4, [{
		a: -19,
		b: 5
	}]];
	const v20 = [4, [{
		a: -20,
		b: 5
	}]];
	const unused = {
		p1: v1,
		p2: v2,
		p3: v3,
		p4: v4,
		p5: v5,
		p6: v6,
		p7: v7,
		p8: v8,
		p9: v9,
		p10: v10,
		p11: v11,
		p12: v12,
		p13: v13,
		p14: v14,
		p15: v15,
		p16: v16,
		p17: v17,
		p18: v18,
		p19: v19,
		p20: v20
	};
	console.log(v1[1][0].a, v10[1][0].a);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(-1, -10);
+(function() {
+	console.log({
+		a: -1,
+		b: 5
+	}.a, {
+		a: -10,
+		b: 5
+	}.a);
+})();

```

## `terser/issue_t50/issue_t50_let`

- size: oxc 83 vs reference 22 (+61 bytes)

```js
(function() {
	let v1 = [4, [{
		a: -1,
		b: 5
	}]];
	let v2 = [4, [{
		a: -2,
		b: 5
	}]];
	let v3 = [4, [{
		a: -3,
		b: 5
	}]];
	let v4 = [4, [{
		a: -4,
		b: 5
	}]];
	let v5 = [4, [{
		a: -5,
		b: 5
	}]];
	let v6 = [4, [{
		a: -6,
		b: 5
	}]];
	let v7 = [4, [{
		a: -7,
		b: 5
	}]];
	let v8 = [4, [{
		a: -8,
		b: 5
	}]];
	let v9 = [4, [{
		a: -9,
		b: 5
	}]];
	let v10 = [4, [{
		a: -10,
		b: 5
	}]];
	let v11 = [4, [{
		a: -11,
		b: 5
	}]];
	let v12 = [4, [{
		a: -12,
		b: 5
	}]];
	let v13 = [4, [{
		a: -13,
		b: 5
	}]];
	let v14 = [4, [{
		a: -14,
		b: 5
	}]];
	let v15 = [4, [{
		a: -15,
		b: 5
	}]];
	let v16 = [4, [{
		a: -16,
		b: 5
	}]];
	let v17 = [4, [{
		a: -17,
		b: 5
	}]];
	let v18 = [4, [{
		a: -18,
		b: 5
	}]];
	let v19 = [4, [{
		a: -19,
		b: 5
	}]];
	let v20 = [4, [{
		a: -20,
		b: 5
	}]];
	let unused = {
		p1: v1,
		p2: v2,
		p3: v3,
		p4: v4,
		p5: v5,
		p6: v6,
		p7: v7,
		p8: v8,
		p9: v9,
		p10: v10,
		p11: v11,
		p12: v12,
		p13: v13,
		p14: v14,
		p15: v15,
		p16: v16,
		p17: v17,
		p18: v18,
		p19: v19,
		p20: v20
	};
	console.log(v1[1][0].a, v10[1][0].a);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(-1, -10);
+(function() {
+	console.log({
+		a: -1,
+		b: 5
+	}.a, {
+		a: -10,
+		b: 5
+	}.a);
+})();

```

## `terser/classes/class_recursive_refs`

- size: oxc 62 vs reference 0 (+62 bytes)

```js
class a {
	set() {
		class b {
			set [b](c) {}
		}
	}
}
class b {
	constructor() {
		b();
	}
}
class c {
	[c] = 42;
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+class b {
+	constructor() {
+		b();
+	}
+}
+class c {
+	[c] = 42;
+}

```

## `terser/functions/issue_2114_1`

- size: oxc 170 vs reference 108 (+62 bytes)

```js
var c = 0;
!(function(a) {
	a = 0;
})([{
	0: c = c + 1,
	length: c = 1 + c
}, typeof void (function a() {
	var b = (function f1(a) {})(b && (b.b += (c = c + 1, 0)));
})()]);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
 var c = 0;
-c = 1 + (c += 1), (function() {
-	var b = void (b && (b.b += (c += 1, 0)));
-})();
+(function(a) {
+	a = 0;
+})([{
+	0: c += 1,
+	length: c = 1 + c
+}, typeof void (function() {
+	var b = (b && (b.b += (c += 1, 0)), void 0);
+})()]);
 console.log(c);

```

## `terser/functions/issue_2114_2`

- size: oxc 170 vs reference 108 (+62 bytes)

```js
var c = 0;
!(function(a) {
	a = 0;
})([{
	0: c = c + 1,
	length: c = 1 + c
}, typeof void (function a() {
	var b = (function f1(a) {})(b && (b.b += (c = c + 1, 0)));
})()]);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
 var c = 0;
-c = 1 + (c += 1), (function() {
-	var b = void (b && (b.b += (c += 1, 0)));
-})();
+(function(a) {
+	a = 0;
+})([{
+	0: c += 1,
+	length: c = 1 + c
+}, typeof void (function() {
+	var b = (b && (b.b += (c += 1, 0)), void 0);
+})()]);
 console.log(c);

```

## `terser/functions/issue_2663_2`

- size: oxc 146 vs reference 84 (+62 bytes)

```js
(function() {
	var i;
	function fn(j) {
		return (function() {
			console.log(j);
		})();
	}
	for (i in {
		a: 1,
		b: 2,
		c: 3
	}) fn(i);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,13 @@
 (function() {
 	var i;
+	function fn(j) {
+		return (function() {
+			console.log(j);
+		})();
+	}
 	for (i in {
 		a: 1,
 		b: 2,
 		c: 3
-	}) console.log(i);
+	}) fn(i);
 })();

```

## `terser/arrow/issue_2136_3`

- size: oxc 79 vs reference 16 (+63 bytes)

```js
function f(x) {
	console.log(x);
}
!(function(a, ...b) {
	f(b[0]);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(2);
+function f(x) {
+	console.log(x);
+}
+(function(a, ...b) {
+	f(b[0]);
+})(1, 2, 3);

```

## `terser/collapse_vars/collapse_vars_side_effects_1`

- size: oxc 576 vs reference 513 (+63 bytes)

```js
function f1() {
	var e = 7;
	var s = 'abcdef';
	var i = 2;
	var log = console.log.bind(console);
	var x = s.charAt(i++);
	var y = s.charAt(i++);
	var z = s.charAt(i++);
	log(x, y, z, e);
}
function f2() {
	var e = 7;
	var log = console.log.bind(console);
	var s = 'abcdef';
	var i = 2;
	var x = s.charAt(i++);
	var y = s.charAt(i++);
	var z = s.charAt(i++);
	log(x, i, y, z, e);
}
function f3() {
	var e = 7;
	var s = 'abcdef';
	var i = 2;
	var log = console.log.bind(console);
	var x = s.charAt(i++);
	var y = s.charAt(i++);
	var z = s.charAt(i++);
	log(x, z, y, e);
}
function f4() {
	var log = console.log.bind(console), i = 10, x = i += 2, y = i += 3, z = i += 4;
	log(x, z, y, i);
}
f1(), f2(), f3(), f4();

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,17 @@
 function f1() {
-	var s = 'abcdef', i = 2;
-	console.log.bind(console)(s.charAt(i++), s.charAt(i++), s.charAt(i++), 7);
+	var e = 7, s = 'abcdef', i = 2;
+	console.log.bind(console)(s.charAt(i++), s.charAt(i++), s.charAt(i++), e);
 }
 function f2() {
-	var s = 'abcdef', i = 2;
-	console.log.bind(console)(s.charAt(i++), 5, s.charAt(i++), s.charAt(i++), 7);
+	var e = 7, log = console.log.bind(console), s = 'abcdef', i = 2, x = s.charAt(i++), y = s.charAt(i++), z = s.charAt(i++);
+	log(x, i, y, z, e);
 }
 function f3() {
-	var s = 'abcdef', i = 2, log = console.log.bind(console), x = s.charAt(i++), y = s.charAt(i++);
-	log(x, s.charAt(i++), y, 7);
+	var e = 7, s = 'abcdef', i = 2, log = console.log.bind(console), x = s.charAt(i++), y = s.charAt(i++);
+	log(x, s.charAt(i++), y, e);
 }
 function f4() {
-	var i = 10, x = i += 2, y = i += 3;
-	console.log.bind(console)(x, i += 4, y, 19);
+	var log = console.log.bind(console), i = 10, x = i += 2, y = i += 3;
+	log(x, i += 4, y, i);
 }
 f1(), f2(), f3(), f4();

```

## `terser/drop_unused/issue_2136_3`

- size: oxc 79 vs reference 16 (+63 bytes)

```js
function f(x) {
	console.log(x);
}
!(function(a, ...b) {
	f(b[0]);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(2);
+function f(x) {
+	console.log(x);
+}
+(function(a, ...b) {
+	f(b[0]);
+})(1, 2, 3);

```

## `terser/functions/issue_2604_1`

- size: oxc 147 vs reference 84 (+63 bytes)

```js
var a = 'FAIL';
(function() {
	try {
		throw 1;
	} catch (b) {
		(function f(b) {
			b && b();
		})();
		b && (a = 'PASS');
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,12 @@
 var a = 'FAIL';
-try {
-	throw 1;
-} catch (b) {
-	b && (a = 'PASS');
-}
+(function() {
+	try {
+		throw 1;
+	} catch (b) {
+		(function(b) {
+			b && b();
+		})();
+		b && (a = 'PASS');
+	}
+})();
 console.log(a);

```

## `terser/functions/issue_2604_2`

- size: oxc 147 vs reference 84 (+63 bytes)

```js
var a = 'FAIL';
(function() {
	try {
		throw 1;
	} catch (b) {
		(function f(b) {
			b && b();
		})();
		b && (a = 'PASS');
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,12 @@
 var a = 'FAIL';
-try {
-	throw 1;
-} catch (o) {
-	o && (a = 'PASS');
-}
+(function() {
+	try {
+		throw 1;
+	} catch (b) {
+		(function(b) {
+			b && b();
+		})();
+		b && (a = 'PASS');
+	}
+})();
 console.log(a);

```

## `terser/issue_1609/chained_evaluation_1`

- size: oxc 78 vs reference 14 (+64 bytes)

```js
(function() {
	var a = 1;
	(function() {
		var b = a, c;
		c = f(b);
		c.bar = b;
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-f(1).bar = 1;
+(function() {
+	(function() {
+		var b = 1, c = f(b);
+		c.bar = b;
+	})();
+})();

```

## `terser/class_properties/static_property_side_effects`

- size: oxc 65 vs reference 0 (+65 bytes)

```js
let x = 'FAIL';
class cls {
	static [x = 'PASS'];
}
console.log(x);
class cls2 {
	static [console.log('PASS')];
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+let x = 'FAIL';
+x = 'PASS';
+console.log(x);
+console.log('PASS');

```

## `terser/functions/issue_2428`

- size: oxc 124 vs reference 59 (+65 bytes)

```js
function bar(k) {
	console.log(k);
}
function foo(x) {
	return bar(x);
}
function baz(a) {
	foo(a);
}
baz(42);
baz('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,11 @@
+function bar(k) {
+	console.log(k);
+}
+function foo(x) {
+	return bar(x);
+}
 function baz(a) {
-	console.log(a);
+	foo(a);
 }
 baz(42);
 baz('PASS');

```

## `terser/template_string/array_join`

- size: oxc 183 vs reference 118 (+65 bytes)

```js
var foo = [`1 ${any} 2`].join('');
var bar = ['before', `1 ${any} 2`].join('');
var baz = [`1 ${any} 2`, 'after'].join('');
var qux = [
	'before',
	`1 ${any} 2`,
	'after'
].join('');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-var foo = `1 ${any} 2`;
-var bar = `before1 ${any} 2`;
-var baz = `1 ${any} 2after`;
-var qux = `before1 ${any} 2after`;
+var foo = [`1 ${any} 2`].join('');
+var bar = ['before', `1 ${any} 2`].join('');
+var baz = [`1 ${any} 2`, 'after'].join('');
+var qux = [
+	'before',
+	`1 ${any} 2`,
+	'after'
+].join('');

```

## `terser/arguments/modified`

- size: oxc 198 vs reference 132 (+66 bytes)

```js
(function(a, b) {
	var c = arguments[0];
	var d = arguments[1];
	var a = 'foo';
	b++;
	arguments[0] = 'moo';
	arguments[1] *= 2;
	console.log(a, b, c, d, arguments[0], arguments[1]);
})('bar', 42);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 (function(a, b) {
-	var c = a;
-	var d = b;
+	var c = arguments[0];
+	var d = arguments[1];
 	var a = 'foo';
 	b++;
-	a = 'moo';
-	b *= 2;
-	console.log(a, b, c, d, a, b);
+	arguments[0] = 'moo';
+	arguments[1] *= 2;
+	console.log(a, b, c, d, arguments[0], arguments[1]);
 })('bar', 42);

```

## `terser/evaluate/delete_expr_1`

- size: oxc 168 vs reference 102 (+66 bytes)

```js
console.log(delete undefined);
console.log(delete void 0);
console.log(delete Infinity);
console.log(delete (1 / 0));
console.log(delete NaN);
console.log(delete (0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!1);
-console.log(!0);
-console.log(!1);
-console.log(!0);
-console.log(!1);
-console.log(!0);
+console.log(delete undefined);
+console.log(delete void 0);
+console.log(delete Infinity);
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/evaluate/delete_expr_2`

- size: oxc 168 vs reference 102 (+66 bytes)

```js
console.log(delete undefined);
console.log(delete void 0);
console.log(delete Infinity);
console.log(delete (1 / 0));
console.log(delete NaN);
console.log(delete (0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!1);
-console.log(!0);
-console.log(!1);
-console.log(!0);
-console.log(!1);
-console.log(!0);
+console.log(delete undefined);
+console.log(delete void 0);
+console.log(delete Infinity);
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/issue_281/safe_undefined`

- size: oxc 118 vs reference 52 (+66 bytes)

```js
var a, c;
console.log((function(undefined) {
	return function() {
		if (a) return b;
		if (c) return d;
	};
})(1)());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,7 @@
 var a, c;
-console.log(a ? b : (0, c) ? d : void 0);
+console.log((function(undefined) {
+	return function() {
+		if (a) return b;
+		if (c) return d;
+	};
+})(1)());

```

## `terser/drop_unused/issue_t161_top_retain_11`

- size: oxc 167 vs reference 100 (+67 bytes)

```js
function f() {
	return x;
}
function g() {
	return y;
}
function h() {
	return z;
}
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,11 @@
+function f() {
+	return x;
+}
 function g() {
 	return y;
 }
-var x = 2, y = 3;
-console.log(x, y, 4, x * y, 4 * x, 4 * y, x, g(), 4);
+function h() {
+	return z;
+}
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

## `terser/functions/inline_1`

- size: oxc 115 vs reference 48 (+67 bytes)

```js
(function() {
	console.log(1);
})();
(function(a) {
	console.log(a);
})(2);
(function(b) {
	var c = b;
	console.log(c);
})(3);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
-console.log(1);
-console.log(2);
-console.log(3);
+(function() {
+	console.log(1);
+})();
+(function(a) {
+	console.log(a);
+})(2);
+(function(b) {
+	console.log(b);
+})(3);

```

## `terser/functions/inline_2`

- size: oxc 115 vs reference 48 (+67 bytes)

```js
(function() {
	console.log(1);
})();
(function(a) {
	console.log(a);
})(2);
(function(b) {
	var c = b;
	console.log(c);
})(3);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
-console.log(1);
-console.log(2);
-console.log(3);
+(function() {
+	console.log(1);
+})();
+(function(a) {
+	console.log(a);
+})(2);
+(function(b) {
+	console.log(b);
+})(3);

```

## `terser/functions/inline_3`

- size: oxc 115 vs reference 48 (+67 bytes)

```js
(function() {
	console.log(1);
})();
(function(a) {
	console.log(a);
})(2);
(function(b) {
	var c = b;
	console.log(c);
})(3);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
-console.log(1);
-console.log(2);
-console.log(3);
+(function() {
+	console.log(1);
+})();
+(function(a) {
+	console.log(a);
+})(2);
+(function(b) {
+	console.log(b);
+})(3);

```

## `terser/functions/inline_true`

- size: oxc 115 vs reference 48 (+67 bytes)

```js
(function() {
	console.log(1);
})();
(function(a) {
	console.log(a);
})(2);
(function(b) {
	var c = b;
	console.log(c);
})(3);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
-console.log(1);
-console.log(2);
-console.log(3);
+(function() {
+	console.log(1);
+})();
+(function(a) {
+	console.log(a);
+})(2);
+(function(b) {
+	console.log(b);
+})(3);

```

## `terser/conditionals/delete_conditional_1`

- size: oxc 170 vs reference 102 (+68 bytes)

```js
console.log(delete (1 ? undefined : x));
console.log(delete (1 ? void 0 : x));
console.log(delete (1 ? Infinity : x));
console.log(delete (1 ? 1 / 0 : x));
console.log(delete (1 ? NaN : x));
console.log(delete (1 ? 0 / 0 : x));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete void 0);
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/conditionals/delete_conditional_2`

- size: oxc 170 vs reference 102 (+68 bytes)

```js
console.log(delete (0 ? x : undefined));
console.log(delete (0 ? x : void 0));
console.log(delete (0 ? x : Infinity));
console.log(delete (0 ? x : 1 / 0));
console.log(delete (0 ? x : NaN));
console.log(delete (0 ? x : 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete void 0);
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/drop_unused/unused_class_with_static_props_side_effects`

- size: oxc 68 vs reference 0 (+68 bytes)

```js
let x = 'FAIL';
class X {
	static _ = x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+let x = 'FAIL';
+class X {
+	static _ = x = 'PASS';
+}
+console.log(x);

```

## `terser/evaluate/delete_binary_1`

- size: oxc 170 vs reference 102 (+68 bytes)

```js
console.log(delete (true && undefined));
console.log(delete (true && void 0));
console.log(delete (true && Infinity));
console.log(delete (true && 1 / 0));
console.log(delete (true && NaN));
console.log(delete (true && 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete void 0);
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/evaluate/delete_binary_2`

- size: oxc 170 vs reference 102 (+68 bytes)

```js
console.log(delete (false || undefined));
console.log(delete (false || void 0));
console.log(delete (false || Infinity));
console.log(delete (false || 1 / 0));
console.log(delete (false || NaN));
console.log(delete (false || 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete void 0);
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/logical_assignment/logical_assignment_not_always_happens`

- size: oxc 68 vs reference 0 (+68 bytes)

```js
let result = 'PASS';
let x;
x &&= result = 'FAIL';
console.log(result);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+let result = 'PASS', x;
+x &&= result = 'FAIL', console.log(result);

```

## `terser/functions/issue_2630_1`

- size: oxc 124 vs reference 55 (+69 bytes)

```js
var c = 0;
(function() {
	while (f());
	function f() {
		var a = (function() {
			var b = c++, d = c = 1 + c;
		})();
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
 var c = 0;
-while (void (c = 1 + ++c));
-console.log(c);
+(function() {
+	for (; f(););
+	function f() {
+		(function() {
+			c++, c = 1 + c;
+		})();
+	}
+})(), console.log(c);

```

## `terser/properties/lhs_prop_2`

- size: oxc 130 vs reference 61 (+69 bytes)

```js
[1][0] = 42;
(function(a) {
	a.b = 'g';
})('abc');
(function(a) {
	a[2] = 'g';
})('def');
(function(a) {
	a[''] = 'g';
})('ghi');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
 [1][0] = 42;
-'abc'.b = 'g';
-'def'[2] = 'g';
-'ghi'[''] = 'g';
+(function(a) {
+	a.b = 'g';
+})('abc');
+(function(a) {
+	a[2] = 'g';
+})('def');
+(function(a) {
+	a[''] = 'g';
+})('ghi');

```

## `terser/properties/native_prototype`

- size: oxc 289 vs reference 220 (+69 bytes)

```js
Array.prototype.splice.apply(a, [
	1,
	2,
	b,
	c
]);
Function.prototype.call.apply(console.log, console, ['foo']);
Number.prototype.toFixed.call(Math.PI, 2);
Object.prototype.hasOwnProperty.call(d, 'foo');
RegExp.prototype.test.call(/foo/, 'bar');
String.prototype.indexOf.call(e, 'bar');

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
-[].splice.apply(a, [
+Array.prototype.splice.apply(a, [
 	1,
 	2,
 	b,
 	c
 ]);
-(function() {}).call.apply(console.log, console, ['foo']);
-0 .toFixed.call(Math.PI, 2);
-({}).hasOwnProperty.call(d, 'foo');
-/t/.test.call(/foo/, 'bar');
-''.indexOf.call(e, 'bar');
+Function.prototype.call.apply(console.log, console, ['foo']);
+Number.prototype.toFixed.call(Math.PI, 2);
+Object.prototype.hasOwnProperty.call(d, 'foo');
+RegExp.prototype.test.call(/foo/, 'bar');
+String.prototype.indexOf.call(e, 'bar');

```

## `terser/reduce_vars/iife_assign`

- size: oxc 85 vs reference 16 (+69 bytes)

```js
!(function() {
	var a = 1, b = 0;
	!(function() {
		b++;
		return;
		a = 2;
	})();
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-console.log(1);
+(function() {
+	var a = 1, b = 0;
+	(function() {
+		b++;
+	})();
+	console.log(a);
+})();

```

## `terser/arguments/issue_687`

- size: oxc 70 vs reference 0 (+70 bytes)

```js
function shouldBePure() {
	return arguments.length;
}
shouldBePure();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+function shouldBePure() {
+	return arguments.length;
+}
+shouldBePure();

```

## `terser/functions/duplicate_argnames`

- size: oxc 91 vs reference 21 (+70 bytes)

```js
var a = 'PASS';
function f(b, b, b) {
	b && (a = 'FAIL');
}
f(0, console);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log('PASS');
+var a = 'PASS';
+function f(b, b, b) {
+	b && (a = 'FAIL');
+}
+f(0, console);
+console.log(a);

```

## `terser/switch/issue_441_1`

- size: oxc 92 vs reference 22 (+70 bytes)

```js
switch (foo) {
	case bar:
		qux();
		break;
	case baz:
		qux();
		break;
	default:
		qux();
		break;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,9 @@
-foo, bar, baz;
-qux();
+switch (foo) {
+	case bar:
+		qux();
+		break;
+	case baz:
+		qux();
+		break;
+	default: qux();
+}

```

## `terser/drop_unused/issue_t161_top_retain_10`

- size: oxc 167 vs reference 96 (+71 bytes)

```js
function f() {
	return x;
}
function g() {
	return y;
}
function h() {
	return z;
}
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,11 @@
 function f() {
 	return x;
 }
-var x = 2, y = 3;
-console.log(2, y, 4, 2 * y, 8, 4 * y, f(), y, 4);
+function g() {
+	return y;
+}
+function h() {
+	return z;
+}
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

## `terser/if_return/if_return_8`

- size: oxc 418 vs reference 346 (+72 bytes)

```js
function f(e) {
	if (2 == e) return foo();
	if (3 == e) return bar();
	if (4 == e) return baz();
	fail(e);
}
function g(e) {
	if (a(e)) return foo();
	if (b(e)) return bar();
	if (c(e)) return baz();
	fail(e);
}
function h(e) {
	if (a(e)) return foo();
	else if (b(e)) return bar();
	else if (c(e)) return baz();
	else fail(e);
}
function i(e) {
	if (a(e)) return foo();
	else if (b(e)) return bar();
	else if (c(e)) return baz();
	fail(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,24 @@
 function f(e) {
-	return 2 == e ? foo() : 3 == e ? bar() : 4 == e ? baz() : void fail(e);
+	if (e == 2) return foo();
+	if (e == 3) return bar();
+	if (e == 4) return baz();
+	fail(e);
 }
 function g(e) {
-	return a(e) ? foo() : b(e) ? bar() : c(e) ? baz() : void fail(e);
+	if (a(e)) return foo();
+	if (b(e)) return bar();
+	if (c(e)) return baz();
+	fail(e);
 }
 function h(e) {
-	return a(e) ? foo() : b(e) ? bar() : c(e) ? baz() : void fail(e);
+	if (a(e)) return foo();
+	if (b(e)) return bar();
+	if (c(e)) return baz();
+	fail(e);
 }
 function i(e) {
-	return a(e) ? foo() : b(e) ? bar() : c(e) ? baz() : void fail(e);
+	if (a(e)) return foo();
+	if (b(e)) return bar();
+	if (c(e)) return baz();
+	fail(e);
 }

```

## `terser/reduce_vars/issue_2423_6`

- size: oxc 133 vs reference 61 (+72 bytes)

```js
function x() {
	y();
}
function y() {
	console.log(1);
}
function z() {
	function y() {
		console.log(2);
	}
	x();
	y();
}
z();
z();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,15 @@
-function z() {
+function x() {
+	y();
+}
+function y() {
 	console.log(1);
-	console.log(2);
 }
+function z() {
+	function y() {
+		console.log(2);
+	}
+	x();
+	y();
+}
 z();
 z();

```

## `terser/collapse_vars/issue_1562`

- size: oxc 173 vs reference 99 (+74 bytes)

```js
var v = 1, B = 2;
for (v in objs) f(B);
var x = 3, C = 10;
while (x + 2) bar(C);
var y = 4, D = 20;
do {
	bar(D);
} while (y + 2);
var z = 5, E = 30;
for (; f(z + 2);) bar(E);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
-var v = 1;
-for (v in objs) f(2);
-while (5) bar(10);
+var v = 1, B = 2;
+for (v in objs) f(B);
+var x = 3, C = 10;
+for (; x + 2;) bar(C);
+var y = 4, D = 20;
 do
-	bar(20);
-while (6);
-for (; f(7);) bar(30);
+	bar(D);
+while (y + 2);
+var z = 5, E = 30;
+for (; f(z + 2);) bar(E);

```

## `terser/evaluate/prop_function`

- size: oxc 164 vs reference 90 (+74 bytes)

```js
console.log({
	a: { b: 1 },
	b: function() {}
} + 1, {
	a: { b: 1 },
	b: function() {}
}.a + 1, {
	a: { b: 1 },
	b: function() {}
}.b + 1, {
	a: { b: 1 },
	b: function() {}
}.a.b + 1);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-console.log({
+console.log('[object Object]1', {
+	a: { b: 1 },
+	b: function() {}
+}.a + 1, {
+	a: { b: 1 },
+	b: function() {}
+}.b + 1, {
 	a: { b: 1 },
 	b: function() {}
-} + 1, { b: 1 } + 1, function() {} + 1, 2);
+}.a.b + 1);

```

## `terser/evaluate/unsafe_float_key`

- size: oxc 161 vs reference 87 (+74 bytes)

```js
console.log({ 2.72: 1 } + 1, { 2.72: 1 }[2.72] + 1, { 2.72: 1 }['2.72'] + 1, { 2.72: 1 }[3.14] + 1, { 2.72: 1 }[2.72][3.14] + 1, { 2.72: 1 }[2.72]['3.14'] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log({ 2.72: 1 } + 1, 2, 2, { 2.72: 1 }[3.14] + 1, 1[3.14] + 1, 1['3.14'] + 1);
+console.log({ 2.72: 1 } + 1, { 2.72: 1 }[2.72] + 1, { 2.72: 1 }['2.72'] + 1, { 2.72: 1 }[3.14] + 1, { 2.72: 1 }[2.72][3.14] + 1, { 2.72: 1 }[2.72]['3.14'] + 1);

```

## `terser/typeof/typeof_defun_2`

- size: oxc 174 vs reference 100 (+74 bytes)

```js
var f = function() {
	console.log(x);
};
var x = 0;
x++ < 2 && typeof f == 'function' && f();
x++ < 2 && typeof f == 'function' && f();
x++ < 2 && typeof f == 'function' && f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 var f = function() {
 	console.log(x);
-};
-var x = 0;
-x++ < 2 && f();
-x++ < 2 && f();
-x++ < 2 && f();
+}, x = 0;
+x++ < 2 && typeof f == 'function' && f();
+x++ < 2 && typeof f == 'function' && f();
+x++ < 2 && typeof f == 'function' && f();

```

## `terser/drop_unused/issue_2665`

- size: oxc 137 vs reference 62 (+75 bytes)

```js
var a = 1;
function g() {
	a-- && g();
}
typeof h == 'function' && h();
function h() {
	typeof g == 'function' && g();
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,8 @@
 function g() {
 	a-- && g();
 }
-g();
+typeof h == 'function' && h();
+function h() {
+	typeof g == 'function' && g();
+}
 console.log(a);

```

## `terser/reduce_vars/obj_arg_2`

- size: oxc 91 vs reference 16 (+75 bytes)

```js
var C = 1;
function f(obj) {
	return obj.bar();
}
console.log(f({ bar: function() {
	return C + C;
} }));

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(2);
+function f(obj) {
+	return obj.bar();
+}
+console.log(f({ bar: function() {
+	return 2;
+} }));

```

## `terser/identity/inline_identity_regression`

- size: oxc 76 vs reference 0 (+76 bytes)

```js
global.id = (x) => x;
const foo = ({ bar }) => id(bar);
console.log(foo({ bar: 'PASS' }));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+global.id = (x) => x, console.log((({ bar }) => id(bar))({ bar: 'PASS' }));

```

## `terser/if_return/if_var_return`

- size: oxc 208 vs reference 132 (+76 bytes)

```js
function f() {
	var a;
	return;
	var b;
}
function g() {
	var a;
	if (u()) {
		var b;
		return v();
		var c;
	}
	var d;
	if (w()) {
		var e;
		return x();
		var f;
	} else {
		var g;
		y();
		var h;
	}
	var i;
	z();
	var j;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,24 @@
 function f() {
-	var a, b;
+	var a;
+	return;
+	var b;
 }
 function g() {
-	var a, b, c, d, e, f, g, h, i, j;
-	return u() ? v() : w() ? x() : (y(), z(), void 0);
+	var a;
+	if (u()) {
+		var b;
+		return v();
+		var c;
+	}
+	var d;
+	if (w()) {
+		var e;
+		return x();
+		var f;
+	}
+	var g;
+	y();
+	var h, i;
+	z();
+	var j;
 }

```

## `terser/logical_assignment/.assignment_in_left_part`

- size: oxc 76 vs reference 0 (+76 bytes)

```js
var status = 'FAIL';
var x = {};
x[status = 'PASS'] ||= 1;
console.log(status);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+var status = 'FAIL', x = {};
+x[status = 'PASS'] ||= 1;
+console.log(status);

```

## `terser/switch/issue_441_2`

- size: oxc 104 vs reference 28 (+76 bytes)

```js
switch (foo) {
	case bar:
		qux();
		break;
	case fall:
	case baz:
		qux();
		break;
	default:
		qux();
		break;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,10 @@
-foo, bar, fall, baz;
-qux();
+switch (foo) {
+	case bar:
+		qux();
+		break;
+	case fall:
+	case baz:
+		qux();
+		break;
+	default: qux();
+}

```

## `terser/evaluate/pow_sequence_with_parens_evaluated`

- size: oxc 97 vs reference 20 (+77 bytes)

```js
var one = 1;
var two = 2;
var four = 4;
console.log((four ** one) ** two, (four ** one) ** (one / two));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(16, 2);
+var one = 1, two = 2, four = 4;
+console.log((four ** one) ** two, (four ** one) ** (one / two));

```

## `terser/inline/inline_annotation_2`

- size: oxc 102 vs reference 24 (+78 bytes)

```js
const shouldInline = (n) => +n;
const a = shouldInline('42.0');
const b = shouldInline('abc');
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(42, 0 / 0);
+const shouldInline = (n) => +n, a = shouldInline('42.0'), b = shouldInline('abc');
+console.log(a, b);

```

## `terser/properties/join_object_assignments_2`

- size: oxc 100 vs reference 22 (+78 bytes)

```js
var o = { foo: 1 };
o.bar = 2;
o.baz = 3;
console.log(o.foo, o.bar + o.bar, o.foo * o.bar * o.baz);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(1, 4, 6);
+var o = { foo: 1 };
+o.bar = 2;
+o.baz = 3;
+console.log(o.foo, o.bar + o.bar, o.foo * o.bar * o.baz);

```

## `terser/functions/issue_2630_4`

- size: oxc 150 vs reference 71 (+79 bytes)

```js
var x = 3, a = 1, b = 2;
(function() {
	(function f1() {
		while (--x >= 0 && f2());
	})();
	function f2() {
		a++ + (b += a);
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,10 @@
 var x = 3, a = 1, b = 2;
-while (--x >= 0 && void a++);
+(function() {
+	(function() {
+		for (; --x >= 0 && f2(););
+	})();
+	function f2() {
+		a++ + (b += a);
+	}
+})();
 console.log(a);

```

## `terser/drop_unused/unused_seq_elements`

- size: oxc 80 vs reference 0 (+80 bytes)

```js
var a = 0, b = 0;
console.log('just-make-sure-it-is-compilable') && (a++, b++);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+var a = 0, b = 0;
+console.log('just-make-sure-it-is-compilable') && (a++, b++);

```

## `terser/functions/issue_2616`

- size: oxc 150 vs reference 70 (+80 bytes)

```js
var c = 'FAIL';
(function() {
	function f() {
		function g(NaN) {
			(true << NaN) - 0 / 0 || (c = 'PASS');
		}
		g([]);
	}
	f();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,11 @@
 var c = 'FAIL';
-(true << []) - 0 / 0 || (c = 'PASS');
+(function() {
+	function f() {
+		function g(NaN) {
+			(!0 << NaN) - 0 / 0 || (c = 'PASS');
+		}
+		g([]);
+	}
+	f();
+})();
 console.log(c);

```

## `terser/pure_funcs/arithmetic`

- size: oxc 122 vs reference 42 (+80 bytes)

```js
foo() + foo();
foo() - bar();
foo() * 'bar';
bar() / foo();
bar() & bar();
bar() | 'bar';
'bar' >> foo();
'bar' << bar();
'bar' >>> 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
-bar();
-bar();
-bar(), bar();
-bar();
-bar();
+foo() + foo();
+foo() - bar();
+foo() * 'bar';
+bar() / foo();
+bar() & bar();
+bar() | 'bar';
+'bar' >> foo();
+'bar' << bar();

```

## `terser/sequences/delete_seq_1`

- size: oxc 183 vs reference 102 (+81 bytes)

```js
console.log(delete (1, undefined));
console.log(delete (1, void 0));
console.log(delete (1, Infinity));
console.log(delete (1, 1 / 0));
console.log(delete (1, NaN));
console.log(delete (1, 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete (0, undefined));
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete (0, NaN));
+console.log(delete NaN);

```

## `terser/sequences/delete_seq_2`

- size: oxc 183 vs reference 102 (+81 bytes)

```js
console.log(delete (1, 2, undefined));
console.log(delete (1, 2, void 0));
console.log(delete (1, 2, Infinity));
console.log(delete (1, 2, 1 / 0));
console.log(delete (1, 2, NaN));
console.log(delete (1, 2, 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete (0, undefined));
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete (0, NaN));
+console.log(delete NaN);

```

## `terser/sequences/delete_seq_3`

- size: oxc 183 vs reference 102 (+81 bytes)

```js
console.log(delete (1, 2, undefined));
console.log(delete (1, 2, void 0));
console.log(delete (1, 2, Infinity));
console.log(delete (1, 2, 1 / 0));
console.log(delete (1, 2, NaN));
console.log(delete (1, 2, 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete (0, undefined));
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete (0, NaN));
+console.log(delete NaN);

```

## `terser/functions/issue_2657`

- size: oxc 139 vs reference 57 (+82 bytes)

```js
'use strict';
console.log((function f() {
	return h;
	function g(b) {
		return b || b();
	}
	function h(a) {
		g(a);
		return a;
	}
})()(42));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
 'use strict';
-console.log(function() {
-	return 42;
-}());
+console.log((function() {
+	return h;
+	function g(b) {
+		return b || b();
+	}
+	function h(a) {
+		return g(a), a;
+	}
+})()(42));

```

## `terser/reduce_vars/issue_443`

- size: oxc 83 vs reference 0 (+83 bytes)

```js
const one_name = 'PASS';
var get_one = () => {
	if (one_name) return one_name;
};
{
	let one_name = get_one();
	console.log(one_name);
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+var get_one = () => 'PASS';
+{
+	let one_name = get_one();
+	console.log(one_name);
+}

```

## `terser/expansions/object_spread`

- size: oxc 84 vs reference 0 (+84 bytes)

```js
let obj = { ...{} };
console.log(Object.keys(obj));
let objWithKeys = {
	a: 1,
	...{ b: 2 }
};
console.log(Object.keys(objWithKeys).join(','));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+console.log(Object.keys({})), console.log(Object.keys({
+	a: 1,
+	b: 2
+}).join(','));

```

## `terser/hoist_props/issue_3071_1`

- size: oxc 84 vs reference 0 (+84 bytes)

```js
(function() {
	var obj = {};
	obj.one = 1;
	obj.two = 2;
	console.log(obj.one);
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function() {
+	var obj = {};
+	obj.one = 1, obj.two = 2, console.log(obj.one);
+})();

```

## `terser/nullish/nullish_coalescing_parens`

- size: oxc 84 vs reference 0 (+84 bytes)

```js
console.log((false || null) ?? 'PASS');
console.log(null ?? (true && 'PASS'));
console.log((null ?? 0) || 'PASS');
console.log(null || (null ?? 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+console.log('PASS');
+console.log('PASS');
+console.log('PASS');
+console.log('PASS');

```

## `terser/conditionals/ifs_3_should_warn`

- size: oxc 125 vs reference 40 (+85 bytes)

```js
var x, y;
if (x && !(x + '1') && y) {
	var qq;
	foo();
} else {
	bar();
}
if (x || !!(x + '1') || y) {
	foo();
} else {
	var jj;
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
 var x, y;
-var qq;
-bar();
-var jj;
-foo();
+if (x && !(x + '1') && y) {
+	var qq;
+	foo();
+} else bar();
+if (x || x + '1' || y) foo();
+else {
+	var jj;
+	bar();
+}

```

## `terser/dead_code/issue_2233_1`

- size: oxc 85 vs reference 0 (+85 bytes)

```js
Array.isArray;
Boolean;
console.log;
Date;
decodeURI;
decodeURIComponent;
encodeURI;
encodeURIComponent;
Error.name;
escape;
eval;
EvalError;
Function.length;
isFinite;
isNaN;
JSON;
Math.random;
Number.isNaN;
parseFloat;
parseInt;
RegExp;
Object.defineProperty;
String.fromCharCode;
RangeError;
ReferenceError;
SyntaxError;
TypeError;
unescape;
URIError;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+Array.isArray;
+Error.name;
+eval;
+Function.length;
+Number.isNaN;
+String.fromCharCode;

```

## `terser/class_properties/static_class_properties_side_effects`

- size: oxc 86 vs reference 0 (+86 bytes)

```js
class A {
	foo = console.log('PASS2');
	static bar = console.log('PASS1');
}
new A();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+class A {
+	foo = console.log('PASS2');
+	static bar = console.log('PASS1');
+}
+new A();

```

## `terser/collapse_vars/collapse_vars_self_reference`

- size: oxc 120 vs reference 34 (+86 bytes)

```js
function f1() {
	var self = { inner: function() {
		return self;
	} };
}
function f2() {
	var self = { inner: self };
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,8 @@
-function f1() {}
-function f2() {}
+function f1() {
+	var self = { inner: function() {
+		return self;
+	} };
+}
+function f2() {
+	var self = { inner: self };
+}

```

## `terser/drop_unused/issue_t161_top_retain_15`

- size: oxc 309 vs reference 223 (+86 bytes)

```js
class Alpha {
	num() {
		return x;
	}
}
class Beta {
	num() {
		return y;
	}
}
class Carrot {
	num() {
		return z;
	}
}
function f() {
	return x;
}
const g = () => y;
const h = () => z;
let x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h(), new Alpha().num(), new Beta().num(), new Carrot().num());

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,21 @@
 class Alpha {
 	num() {
-		return n;
+		return e;
 	}
 }
-let n = 2, u = 4;
-console.log(n, 3, u, 3 * n, n * u, 3 * u, n, 3, u, new Alpha().num(), new class {
+class Beta {
 	num() {
-		return 3;
+		return t;
 	}
-}().num(), new class {
+}
+class Carrot {
 	num() {
-		return u;
+		return n;
 	}
-}().num());
+}
+function f() {
+	return e;
+}
+const g = () => t, h = () => n;
+let e = 2, t = 3, n = 4;
+console.log(2, 3, 4, 6, 8, 12, f(), g(), h(), new Alpha().num(), new Beta().num(), new Carrot().num());

```

## `terser/drop_unused/issue_t161_top_retain_5`

- size: oxc 106 vs reference 19 (+87 bytes)

```js
(function() {
	function f() {
		return 2;
	}
	function g() {
		return 3;
	}
	console.log(f(), g());
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(2, 3);
+(function() {
+	function f() {
+		return 2;
+	}
+	function g() {
+		return 3;
+	}
+	console.log(f(), g());
+})();

```

## `terser/drop_unused/function_argument_modified_by_function_statement`

- size: oxc 88 vs reference 0 (+88 bytes)

```js
var printTest = (function(ret) {
	function ret() {
		console.log('PASS');
	}
	return ret;
})('FAIL');
printTest();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+(function(ret) {
+	function ret() {
+		console.log('PASS');
+	}
+	return ret;
+})('FAIL')();

```

## `terser/functions/function_returning_constant_literal`

- size: oxc 116 vs reference 28 (+88 bytes)

```js
function greeter() {
	return { message: 'Hello there' };
}
var greeting = greeter();
console.log(greeting.message);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log('Hello there');
+function greeter() {
+	return { message: 'Hello there' };
+}
+var greeting = greeter();
+console.log(greeting.message);

```

## `terser/harmony/classes_extending_classes_out_of_pure_iifes`

- size: oxc 89 vs reference 0 (+89 bytes)

```js
let Base = (() => {
	class A {}
	A.sub = Sub;
	return A;
})();
class Sub extends Base {}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+let Base = (() => {
+	class A {}
+	A.sub = Sub;
+	return A;
+})();
+class Sub extends Base {}

```

## `terser/hoist_props/issue_3071_2`

- size: oxc 89 vs reference 0 (+89 bytes)

```js
(function() {
	obj = {};
	obj.one = 1;
	obj.two = 2;
	console.log(obj.one);
	var obj;
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function() {
+	obj = {}, obj.one = 1, obj.two = 2, console.log(obj.one);
+	var obj;
+})();

```

## `terser/hoist_props/issue_3071_2_toplevel`

- size: oxc 89 vs reference 0 (+89 bytes)

```js
(function() {
	obj = {};
	obj.one = 1;
	obj.two = 2;
	console.log(obj.one);
	var obj;
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function() {
+	obj = {}, obj.one = 1, obj.two = 2, console.log(obj.one);
+	var obj;
+})();

```

## `terser/reduce_vars/issue_1670_5`

- size: oxc 105 vs reference 16 (+89 bytes)

```js
(function(a) {
	switch (1) {
		case a:
			console.log(a);
			break;
		default:
			console.log(2);
			break;
	}
})(1);

```

```diff
--- reference
+++ oxc
@@ -1 +1,8 @@
-console.log(1);
+(function(a) {
+	switch (1) {
+		case a:
+			console.log(a);
+			break;
+		default: console.log(2);
+	}
+})(1);

```

## `terser/async/issue_87`

- size: oxc 90 vs reference 0 (+90 bytes)

```js
function async(async) {
	console.log(async[0], async.prop);
}
async({
	0: 1,
	prop: 2
});

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+function async(async) {
+	console.log(async[0], async.prop);
+}
+async({
+	0: 1,
+	prop: 2
+});

```

## `terser/drop_unused/issue_t161_top_retain_14`

- size: oxc 309 vs reference 219 (+90 bytes)

```js
class Alpha {
	num() {
		return x;
	}
}
class Beta {
	num() {
		return y;
	}
}
class Carrot {
	num() {
		return z;
	}
}
function f() {
	return x;
}
const g = () => y;
const h = () => z;
let x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h(), new Alpha().num(), new Beta().num(), new Carrot().num());

```

```diff
--- reference
+++ oxc
@@ -3,13 +3,19 @@
 		return x;
 	}
 }
-let x = 2, z = 4;
-console.log(2, 3, z, 6, 2 * z, 3 * z, 2, 3, z, new Alpha().num(), new class {
+class Beta {
 	num() {
-		return 3;
+		return y;
 	}
-}().num(), new class {
+}
+class Carrot {
 	num() {
 		return z;
 	}
-}().num());
+}
+function f() {
+	return x;
+}
+const g = () => y, h = () => z;
+let x = 2, y = 3, z = 4;
+console.log(2, 3, 4, 6, 8, 12, f(), g(), h(), new Alpha().num(), new Beta().num(), new Carrot().num());

```

## `terser/identity/inline_identity_inner_ref`

- size: oxc 125 vs reference 35 (+90 bytes)

```js
const id = (a) => (function() {
	return a;
})();
const undef = (a) => ((a) => a)();
console.log(id(1), id(2), undef(3), undef(4));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(1, 2, void 0, void 0);
+const id = (a) => (function() {
+	return a;
+})(), undef = (a) => ((a) => a)();
+console.log(id(1), id(2), undef(3), undef(4));

```

## `terser/properties/const_prop_assign_pure`

- size: oxc 142 vs reference 52 (+90 bytes)

```js
function Simulator() {
	/abc/.index = 1;
	this._aircraft = [];
}
(function() {}).prototype.destroy = x();
(class {}).prototype.destroy = y();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 function Simulator() {
+	/abc/.index = 1;
 	this._aircraft = [];
 }
-x();
+(function() {}).prototype.destroy = x();
+(class {}).prototype.destroy = y();

```

## `terser/properties/const_prop_assign_strict`

- size: oxc 142 vs reference 52 (+90 bytes)

```js
function Simulator() {
	/abc/.index = 1;
	this._aircraft = [];
}
(function() {}).prototype.destroy = x();
(class {}).prototype.destroy = y();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 function Simulator() {
+	/abc/.index = 1;
 	this._aircraft = [];
 }
-x();
+(function() {}).prototype.destroy = x();
+(class {}).prototype.destroy = y();

```

## `terser/drop_unused/issue_t161_top_retain_6`

- size: oxc 116 vs reference 25 (+91 bytes)

```js
(function() {
	function f() {
		return 2;
	}
	function g() {
		return 3;
	}
	console.log(f(), f(), g(), g());
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(2, 2, 3, 3);
+(function() {
+	function f() {
+		return 2;
+	}
+	function g() {
+		return 3;
+	}
+	console.log(f(), f(), g(), g());
+})();

```

## `terser/functions/issue_2842`

- size: oxc 220 vs reference 128 (+92 bytes)

```js
(function() {
	function inlinedFunction(data) {
		return data[data[0]];
	}
	function testMinify() {
		if (true) {
			const data = inlinedFunction([
				1,
				2,
				3
			]);
			console.log(data);
		}
	}
	return testMinify();
})();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,16 @@
 (function() {
-	(function() {
-		console.log(function(data) {
-			return data[data[0]];
-		}([
-			1,
-			2,
-			3
-		]));
-	})();
+	function inlinedFunction(data) {
+		return data[data[0]];
+	}
+	function testMinify() {
+		{
+			let data = inlinedFunction([
+				1,
+				2,
+				3
+			]);
+			console.log(data);
+		}
+	}
+	return testMinify();
 })();

```

## `terser/properties/join_object_assignments_4`

- size: oxc 93 vs reference 0 (+93 bytes)

```js
var o;
console.log(o);
o = {};
o.a = 'foo';
console.log(o.b);
o.b = 'bar';
console.log(o.a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+var o;
+console.log(o), o = {}, o.a = 'foo', console.log(o.b), o.b = 'bar', console.log(o.a);

```

## `terser/collapse_vars/collapse_rhs_vardef`

- size: oxc 94 vs reference 0 (+94 bytes)

```js
var a, b = 1;
a = --b + (function c() {
	var b;
	c[--b] = 1;
})();
b |= a;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+var a, b = 1;
+a = --b + (function c() {
+	var b;
+	c[--b] = 1;
+})();
+b |= a;
+console.log(a, b);

```

## `terser/hoist_props/issue_2519`

- size: oxc 156 vs reference 62 (+94 bytes)

```js
function testFunc() {
	var dimensions = {
		minX: 5,
		maxX: 6
	};
	var scale = 1;
	var d = { x: (dimensions.maxX + dimensions.minX) / 2 };
	return d.x * scale;
}
console.log(testFunc());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 function testFunc() {
-	return 5.5;
+	var dimensions = {
+		minX: 5,
+		maxX: 6
+	};
+	return { x: (dimensions.maxX + dimensions.minX) / 2 }.x * 1;
 }
 console.log(testFunc());

```

## `terser/functions/issue_2620_1`

- size: oxc 136 vs reference 41 (+95 bytes)

```js
var c = 'FAIL';
(function() {
	function f(a) {
		var b = (function g(a) {
			a && a();
		})();
		if (a) {
			var d = c = 'PASS';
		}
	}
	f(1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,9 @@
 var c = 'FAIL';
-console.log(c = 'PASS');
+(function() {
+	function f(a) {
+		(function(a) {
+			a && a();
+		})(), a && (c = 'PASS');
+	}
+	f(1);
+})(), console.log(c);

```

## `terser/functions/issue_2620_2`

- size: oxc 136 vs reference 41 (+95 bytes)

```js
var c = 'FAIL';
(function() {
	function f(a) {
		var b = (function g(a) {
			a && a();
		})();
		if (a) {
			var d = c = 'PASS';
		}
	}
	f(1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,9 @@
 var c = 'FAIL';
-console.log(c = 'PASS');
+(function() {
+	function f(a) {
+		(function(a) {
+			a && a();
+		})(), a && (c = 'PASS');
+	}
+	f(1);
+})(), console.log(c);

```

## `terser/functions/issue_2783`

- size: oxc 172 vs reference 76 (+96 bytes)

```js
(function() {
	return g;
	function f(a) {
		var b = a.b;
		if (b) return b;
		return a;
	}
	function g(o, i) {
		while (i--) {
			console.log(f(o));
		}
	}
})()({ b: 'PASS' }, 1);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,11 @@
-(function(o, i) {
-	while (i--) console.log(o.b || o);
-})({ b: 'PASS' }, 1);
+(function() {
+	return g;
+	function f(a) {
+		var b = a.b;
+		if (b) return b;
+		return a;
+	}
+	function g(o, i) {
+		for (; i--;) console.log(f(o));
+	}
+})()({ b: 'PASS' }, 1);

```

## `terser/functions/avoid_generating_duplicate_functions_compared_together_2`

- size: oxc 97 vs reference 0 (+97 bytes)

```js
const defaultArg = (input) => input;
const fn = (arg = defaultArg) => arg;
console.log(fn() === fn());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+const defaultArg = (input) => input, fn = (arg = defaultArg) => arg;
+console.log(fn() === fn());

```

## `terser/reduce_vars/issue_3113_3`

- size: oxc 100 vs reference 0 (+100 bytes)

```js
var c = 0;
(function() {
	function f() {
		while (g());
	}
	var a;
	function g() {
		a && a[c++];
	}
	g(a = 1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+var c = 0;
+(function() {
+	var a;
+	function g() {
+		a && a[c++];
+	}
+	g(a = 1);
+})();
+console.log(c);

```

## `terser/functions/issue_2531_1`

- size: oxc 202 vs reference 101 (+101 bytes)

```js
function outer() {
	function inner(value) {
		function closure() {
			return value;
		}
		return function() {
			return closure();
		};
	}
	return inner('Hello');
}
console.log('Greeting:', outer()());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,12 @@
 function outer() {
-	return function() {
-		return 'Hello';
-	};
+	function inner(value) {
+		function closure() {
+			return value;
+		}
+		return function() {
+			return closure();
+		};
+	}
+	return inner('Hello');
 }
 console.log('Greeting:', outer()());

```

## `terser/functions/issue_2531_2`

- size: oxc 202 vs reference 101 (+101 bytes)

```js
function outer() {
	function inner(value) {
		function closure() {
			return value;
		}
		return function() {
			return closure();
		};
	}
	return inner('Hello');
}
console.log('Greeting:', outer()());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,12 @@
 function outer() {
-	return function() {
-		return 'Hello';
-	};
+	function inner(value) {
+		function closure() {
+			return value;
+		}
+		return function() {
+			return closure();
+		};
+	}
+	return inner('Hello');
 }
 console.log('Greeting:', outer()());

```

## `terser/harmony/issue_2349b`

- size: oxc 158 vs reference 57 (+101 bytes)

```js
function foo(boo, key) {
	const value = boo.get();
	return value.map(function({ [key]: bar }) {
		return bar;
	});
}
console.log(foo({ get: function() {
	return [{ blah: 42 }];
} }, 'blah'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,8 @@
-console.log([{ blah: 42 }].map(({ ['blah']: l }) => l));
+function foo(e, t) {
+	return e.get().map(function({ [t]: e }) {
+		return e;
+	});
+}
+console.log(foo({ get: function() {
+	return [{ blah: 42 }];
+} }, 'blah'));

```

## `terser/drop_unused/unused_class_which_might_throw_2`

- size: oxc 105 vs reference 0 (+105 bytes)

```js
let x = 'FAIL';
try {
	class X {
		[ima_throw_lol()] = null;
	}
} catch (e) {
	x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+let x = 'FAIL';
+try {
+	class X {
+		[ima_throw_lol()] = null;
+	}
+} catch {
+	x = 'PASS';
+}
+console.log(x);

```

## `terser/collapse_vars/collapse_rhs_undefined`

- size: oxc 106 vs reference 0 (+106 bytes)

```js
var a, b;
function f() {
	a = void 0;
	b = void 0;
	return void 0;
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+var a, b;
+function f() {
+	a = void 0;
+	b = void 0;
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/drop_unused/unused_class_with_static_props_side_effects_2`

- size: oxc 106 vs reference 0 (+106 bytes)

```js
let x = 'FAIL';
function impure() {
	x = 'PASS';
}
class Unused {
	static _ = impure();
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+let x = 'FAIL';
+function impure() {
+	x = 'PASS';
+}
+class Unused {
+	static _ = impure();
+}
+console.log(x);

```

## `terser/arrow/issue_2105_2`

- size: oxc 173 vs reference 66 (+107 bytes)

```js
((factory) => {
	factory();
})(() => ((fn) => {
	fn()().prop();
})(() => {
	let bar = () => {
		var quux = () => {
			console.log('PASS');
		}, foo = () => {
			console.log;
			quux();
		};
		return { prop: foo };
	};
	return bar;
}));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,12 @@
-({ prop: () => {
-	console.log;
-	console.log('PASS');
-} }).prop();
+((factory) => {
+	factory();
+})(() => ((fn) => {
+	fn()().prop();
+})(() => () => {
+	var quux = () => {
+		console.log('PASS');
+	};
+	return { prop: () => {
+		quux();
+	} };
+}));

```

## `terser/block_scope/issue_508`

- size: oxc 107 vs reference 0 (+107 bytes)

```js
const foo = () => {
	let a;
	{
		let b = [];
		{
			console.log();
		}
		a = b;
		{
			let c = a;
			let b = 123456;
			console.log(b);
			c.push(b);
		}
	}
};
foo();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+(() => {
+	let a;
+	console.log(), a = [];
+	{
+		let c = a, b = 123456;
+		console.log(b), c.push(b);
+	}
+})();

```

## `terser/collapse_vars/collapse_rhs_var`

- size: oxc 107 vs reference 0 (+107 bytes)

```js
var a, b;
function f() {
	a = f;
	b = f;
	return f;
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var a, b;
+function f() {
+	a = f;
+	b = f;
+	return f;
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/drop_unused/unused_class_which_might_throw`

- size: oxc 107 vs reference 0 (+107 bytes)

```js
let x = 'FAIL';
try {
	class X {
		static _ = ima_throw_lol();
	}
} catch (e) {
	x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+let x = 'FAIL';
+try {
+	class X {
+		static _ = ima_throw_lol();
+	}
+} catch {
+	x = 'PASS';
+}
+console.log(x);

```

## `terser/reduce_vars/redefine_farg_2`

- size: oxc 153 vs reference 46 (+107 bytes)

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
@@ -1 +1,11 @@
-console.log('object', 'number', 'undefined');
+function f(a) {
+	var a;
+	return typeof a;
+}
+function g(a) {
+	return 'number';
+}
+function h(a, b) {
+	return typeof b;
+}
+console.log(f([]), g([]), h([]));

```

## `terser/reduce_vars/redefine_farg_3`

- size: oxc 153 vs reference 46 (+107 bytes)

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
@@ -1 +1,11 @@
-console.log('object', 'number', 'undefined');
+function f(a) {
+	var a;
+	return typeof a;
+}
+function g(a) {
+	return 'number';
+}
+function h(a, b) {
+	return typeof b;
+}
+console.log(f([]), g([]), h([]));

```

## `terser/drop_unused/issue_t161_top_retain_8`

- size: oxc 167 vs reference 59 (+108 bytes)

```js
function f() {
	return x;
}
function g() {
	return y;
}
function h() {
	return z;
}
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,11 @@
-var y = 3;
-console.log(2, y, 4, 2 * y, 8, 4 * y, 2, y, 4);
+function f() {
+	return x;
+}
+function g() {
+	return y;
+}
+function h() {
+	return z;
+}
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

## `terser/drop_unused/issue_t161_top_retain_9`

- size: oxc 167 vs reference 59 (+108 bytes)

```js
function f() {
	return x;
}
function g() {
	return y;
}
function h() {
	return z;
}
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,11 @@
-var y = 3;
-console.log(2, y, 4, 2 * y, 8, 4 * y, 2, y, 4);
+function f() {
+	return x;
+}
+function g() {
+	return y;
+}
+function h() {
+	return z;
+}
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

## `terser/collapse_vars/collapse_rhs_boolean_1`

- size: oxc 110 vs reference 0 (+110 bytes)

```js
var a, b;
function f() {
	a = !0;
	b = !0;
	return !0;
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var a, b;
+function f() {
+	a = !0;
+	b = !0;
+	return !0;
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/collapse_vars/collapse_rhs_number`

- size: oxc 110 vs reference 0 (+110 bytes)

```js
var a, b;
function f() {
	a = 42;
	b = 42;
	return 42;
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var a, b;
+function f() {
+	a = 42;
+	b = 42;
+	return 42;
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/functions/issue_2620_4`

- size: oxc 180 vs reference 68 (+112 bytes)

```js
var c = 'FAIL';
(function() {
	function f(a, NaN) {
		function g() {
			switch (a) {
				case a: break;
				case c = 'PASS', NaN: break;
			}
		}
		g();
	}
	f(0 / 0);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,14 @@
 var c = 'FAIL';
-if (0 / 0 === void (c = 'PASS')) {}
+(function() {
+	function f(a, NaN) {
+		function g() {
+			switch (a) {
+				case a: break;
+				case c = 'PASS', NaN:
+			}
+		}
+		g();
+	}
+	f(NaN);
+})();
 console.log(c);

```

## `terser/evaluate/issue_399`

- size: oxc 383 vs reference 270 (+113 bytes)

```js
console.log(RegExp('\\\nfo\n[\n]o\\bbb'));
console.log(RegExp('\n'));
console.log(RegExp('\\n'));
console.log(RegExp('\\\n'));
console.log(RegExp('\\\\n'));
console.log(RegExp('\\\\\n'));
console.log(RegExp('\\\\\\n'));
console.log(RegExp('\\\\\\\n'));
console.log(RegExp('\r'));
console.log(RegExp('\u2028'));
console.log(RegExp('\u2029'));
console.log(RegExp('\n\r\u2028\u2029'));

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-console.log(/\nfo\n[\n]o\bbb/);
-console.log(/\n/);
-console.log(/\n/);
-console.log(/\n/);
-console.log(/\\n/);
-console.log(/\\\n/);
-console.log(/\\\n/);
-console.log(/\\\n/);
-console.log(/\r/);
-console.log(/\u2028/);
-console.log(/\u2029/);
-console.log(/\n\r\u2028\u2029/);
+console.log(RegExp('\\\nfo\n[\n]o\\bbb'));
+console.log(RegExp('\n'));
+console.log(RegExp('\\n'));
+console.log(RegExp('\\\n'));
+console.log(RegExp('\\\\n'));
+console.log(RegExp('\\\\\n'));
+console.log(RegExp('\\\\\\n'));
+console.log(RegExp('\\\\\\\n'));
+console.log(RegExp('\r'));
+console.log(RegExp('\u2028'));
+console.log(RegExp('\u2029'));
+console.log(RegExp('\n\r\u2028\u2029'));

```

## `terser/class_properties/computed_class_properties`

- size: oxc 114 vs reference 0 (+114 bytes)

```js
const x = 'FOO';
const y = 'BAR';
class X {
	[x] = 'PASS';
	static [y];
}
if ('BAR' in X) {
	console.log(new X()[x]);
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+const x = 'FOO';
+const y = 'BAR';
+class X {
+	FOO = 'PASS';
+	static BAR;
+}
+'BAR' in X && console.log(new X().FOO);

```

## `terser/collapse_vars/collapse_rhs_this`

- size: oxc 116 vs reference 0 (+116 bytes)

```js
var a, b;
function f() {
	a = this;
	b = this;
	return this;
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var a, b;
+function f() {
+	a = this;
+	b = this;
+	return this;
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/evaluate/unsafe_integer_key_complex`

- size: oxc 208 vs reference 91 (+117 bytes)

```js
console.log({
	0: { 1: 1 },
	1: 1
} + 1, {
	0: { 1: 1 },
	1: 1
}[0] + 1, {
	0: { 1: 1 },
	1: 1
}['0'] + 1, {
	0: { 1: 1 },
	1: 1
}[1] + 1, {
	0: { 1: 1 },
	1: 1
}[0][1] + 1, {
	0: { 1: 1 },
	1: 1
}[0]['1'] + 1);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,19 @@
 console.log({
 	0: { 1: 1 },
 	1: 1
-} + 1, '[object Object]1', '[object Object]1', 2, 2, 2);
+} + 1, {
+	0: { 1: 1 },
+	1: 1
+}[0] + 1, {
+	0: { 1: 1 },
+	1: 1
+}[0] + 1, {
+	0: { 1: 1 },
+	1: 1
+}[1] + 1, {
+	0: { 1: 1 },
+	1: 1
+}[0][1] + 1, {
+	0: { 1: 1 },
+	1: 1
+}[0][1] + 1);

```

## `terser/inline/issue_308`

- size: oxc 300 vs reference 183 (+117 bytes)

```js
exports.withStyles = withStyles;
function _inherits(superClass) {
	if (typeof superClass !== 'function') {
		throw new TypeError('Super expression must be a function, not ' + typeof superClass);
	}
	Object.create(superClass);
}
function withStyles() {
	var a = EXTERNAL();
	return (function(_a) {
		_inherits(_a);
		function d() {}
	})(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
-exports.withStyles = function() {
-	var _a = EXTERNAL();
-	if ('function' != typeof _a) throw TypeError('Super expression must be a function, not ' + typeof _a);
-	Object.create(_a);
-};
+exports.withStyles = withStyles;
+function _inherits(superClass) {
+	if (typeof superClass != 'function') throw TypeError('Super expression must be a function, not ' + typeof superClass);
+	Object.create(superClass);
+}
+function withStyles() {
+	return (function(_a) {
+		_inherits(_a);
+	})(EXTERNAL());
+}

```

## `terser/collapse_vars/collapse_rhs_string`

- size: oxc 119 vs reference 0 (+119 bytes)

```js
var a, b;
function f() {
	a = 'foo';
	b = 'foo';
	return 'foo';
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var a, b;
+function f() {
+	a = 'foo';
+	b = 'foo';
+	return 'foo';
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/pure_getters/collapse_rhs_setter`

- size: oxc 119 vs reference 0 (+119 bytes)

```js
try {
	console.log(({ set length(v) {
		throw 'PASS';
	} }.length = 'FAIL', 'FAIL'));
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+try {
+	console.log(({ set length(v) {
+		throw 'PASS';
+	} }.length = 'FAIL', 'FAIL'));
+} catch (e) {
+	console.log(e);
+}

```

## `terser/functions/issue_3054`

- size: oxc 120 vs reference 0 (+120 bytes)

```js
'use strict';
function f() {
	return { a: true };
}
console.log((function(b) {
	b = false;
	return f();
})().a, f.call().a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+'use strict';
+function f() {
+	return { a: !0 };
+}
+console.log((function(b) {
+	b = !1;
+	return f();
+})().a, f.call().a);

```

## `terser/inline/dont_inline_funcs_into_default_param`

- size: oxc 120 vs reference 0 (+120 bytes)

```js
'use strict';
const getData = (val) => ({ val });
const print = function(data = getData(id('PASS'))) {
	console.log(data.val);
};
print();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+'use strict';
+const getData = (val) => ({ val });
+(function(data = getData(id('PASS'))) {
+	console.log(data.val);
+})();

```

## `terser/reduce_vars/issue_294`

- size: oxc 223 vs reference 103 (+120 bytes)

```js
module.exports = (function(constructor) {
	return constructor();
})(function() {
	return function(input) {
		var keyToMap = input.key;
		return { mappedKey: (function(value) {
			return value || 'CONDITIONAL_DEFAULT_VALUE';
		})(keyToMap) };
	};
});

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
-module.exports = function(input) {
-	return { mappedKey: input.key || 'CONDITIONAL_DEFAULT_VALUE' };
-};
+module.exports = (function(constructor) {
+	return constructor();
+})(function() {
+	return function(input) {
+		return { mappedKey: (function(value) {
+			return value || 'CONDITIONAL_DEFAULT_VALUE';
+		})(input.key) };
+	};
+});

```

## `terser/dead_code/dead_code_constant_boolean_should_warn_more_strict`

- size: oxc 175 vs reference 54 (+121 bytes)

```js
'use strict';
while (!(foo || x + '0')) {
	console.log('unreachable');
	var foo;
}
for (var x = 10, y; x && (y || x) && !typeof x; ++x) {
	asdf();
	foo();
	var moo;
}
bar();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,11 @@
 'use strict';
-var foo;
-var x = 10, y;
-var moo;
+for (; !(foo || x + '0');) {
+	console.log('unreachable');
+	var foo;
+}
+for (var x = 10, y; x && (y || x) && !typeof x; ++x) {
+	asdf();
+	foo();
+	var moo;
+}
 bar();

```

## `terser/drop_unused/unused_class_which_might_throw_3`

- size: oxc 121 vs reference 0 (+121 bytes)

```js
let x = 'FAIL';
try {
	class X {
		[ima_throw_lol()]() {
			return null;
		}
	}
} catch (e) {
	x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,11 @@
+let x = 'FAIL';
+try {
+	class X {
+		[ima_throw_lol()]() {
+			return null;
+		}
+	}
+} catch {
+	x = 'PASS';
+}
+console.log(x);

```

## `terser/reduce_vars/issue_369`

- size: oxc 121 vs reference 0 (+121 bytes)

```js
var printTest = (function(ret) {
	function ret() {
		console.log('Value after override');
	}
	return ret;
})('Value before override');
printTest();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+(function(ret) {
+	function ret() {
+		console.log('Value after override');
+	}
+	return ret;
+})('Value before override')();

```

## `terser/drop_unused/unused_class_which_extends_might_throw`

- size: oxc 122 vs reference 0 (+122 bytes)

```js
let x = 'FAIL';
try {
	class X extends might_throw_lol() {
		constructor() {}
	}
} catch (e) {
	x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+let x = 'FAIL';
+try {
+	class X extends might_throw_lol() {
+		constructor() {}
+	}
+} catch {
+	x = 'PASS';
+}
+console.log(x);

```

## `terser/block_scope/issue_334`

- size: oxc 153 vs reference 29 (+124 bytes)

```js
(function(A) {
	(function() {
		doPrint();
	})();
	function doPrint() {
		print(A);
	}
})('Hello World!');
function print(A) {
	if (!A.x) {
		console.log(A);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,11 @@
-console.log('Hello World!');
+(function(A) {
+	(function() {
+		doPrint();
+	})();
+	function doPrint() {
+		print(A);
+	}
+})('Hello World!');
+function print(A) {
+	A.x || console.log(A);
+}

```

## `terser/collapse_vars/collapse_rhs_boolean_2`

- size: oxc 125 vs reference 0 (+125 bytes)

```js
var a;
(function f1() {
	a = function() {};
	if (/foo/) console.log(typeof a);
})();
console.log((function f2() {
	a = [];
	return !1;
})());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+var a;
+(function() {
+	a = function() {};
+	console.log(typeof a);
+})();
+console.log((function() {
+	a = [];
+	return !1;
+})());

```

## `terser/collapse_vars/issue_805`

- size: oxc 125 vs reference 0 (+125 bytes)

```js
function f() {
	function Foo() {}
	Foo.prototype = {};
	Foo.prototype.bar = 42;
	return Foo;
}
console.log(new (f())().bar);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+function f() {
+	function Foo() {}
+	Foo.prototype = {};
+	Foo.prototype.bar = 42;
+	return Foo;
+}
+console.log(new (f())().bar);

```

## `terser/drop_unused/unused_class_which_might_throw_4`

- size: oxc 125 vs reference 0 (+125 bytes)

```js
let x = 'FAIL';
try {
	class X {
		get [ima_throw_lol()]() {
			return null;
		}
	}
} catch (e) {
	x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,11 @@
+let x = 'FAIL';
+try {
+	class X {
+		get [ima_throw_lol()]() {
+			return null;
+		}
+	}
+} catch {
+	x = 'PASS';
+}
+console.log(x);

```

## `terser/functions/issue_2601_2`

- size: oxc 169 vs reference 44 (+125 bytes)

```js
var a = 'FAIL';
(function() {
	function f(b) {
		function g(b) {
			b && b();
		}
		g();
		(function() {
			b && (a = 'PASS');
		})();
	}
	f('foo');
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,12 @@
 var a = 'FAIL';
-a = 'PASS', console.log(a);
+(function() {
+	function f(b) {
+		function g(b) {
+			b && b();
+		}
+		g(), (function() {
+			b && (a = 'PASS');
+		})();
+	}
+	f('foo');
+})(), console.log(a);

```

## `terser/hoist_props/name_collision_1`

- size: oxc 195 vs reference 69 (+126 bytes)

```js
var obj_foo = 1;
var obj_bar = 2;
function f() {
	var obj = {
		foo: 3,
		bar: 4,
		'b-r': 5,
		'b+r': 6,
		'b!r': 7
	};
	console.log(obj_foo, obj.foo, obj.bar, obj['b-r'], obj['b+r'], obj['b!r']);
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,12 @@
-var obj_bar = 2;
-(function() {
-	console.log(1, 3, 4, 5, 6, 7);
-})();
+var obj_foo = 1, obj_bar = 2;
+function f() {
+	var obj = {
+		foo: 3,
+		bar: 4,
+		'b-r': 5,
+		'b+r': 6,
+		'b!r': 7
+	};
+	console.log(1, obj.foo, obj.bar, obj['b-r'], obj['b+r'], obj['b!r']);
+}
+f();

```

## `terser/functions/issue_2601_1`

- size: oxc 169 vs reference 41 (+128 bytes)

```js
var a = 'FAIL';
(function() {
	function f(b) {
		function g(b) {
			b && b();
		}
		g();
		(function() {
			b && (a = 'PASS');
		})();
	}
	f('foo');
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,12 @@
 var a = 'FAIL';
-console.log(a = 'PASS');
+(function() {
+	function f(b) {
+		function g(b) {
+			b && b();
+		}
+		g(), (function() {
+			b && (a = 'PASS');
+		})();
+	}
+	f('foo');
+})(), console.log(a);

```

## `terser/properties/issue_3188_2`

- size: oxc 128 vs reference 0 (+128 bytes)

```js
(function() {
	var f = function() {
		console.log(this.p);
	};
	function g() {
		var o = {
			p: 'PASS',
			f
		};
		o.f();
	}
	g();
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+(function() {
+	var f = function() {
+		console.log(this.p);
+	};
+	function g() {
+		({
+			p: 'PASS',
+			f
+		}).f();
+	}
+	g();
+})();

```

## `terser/collapse_vars/issue_2974`

- size: oxc 132 vs reference 0 (+132 bytes)

```js
var c = 0;
(function f(b) {
	var a = 2;
	do {
		b && b[b];
		b && (b.null = -4);
		c++;
	} while (b.null && --a > 0);
})(true);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+var c = 0;
+(function(b) {
+	var a = 2;
+	do
+		b && b[b], b && (b.null = -4), c++;
+	while (b.null && --a > 0);
+})(!0), console.log(c);

```

## `terser/loops/issue_2740_1`

- size: oxc 172 vs reference 40 (+132 bytes)

```js
for (;;) break;
for (a();;) break;
for (; b();) break;
for (c(); d();) break;
for (;; e()) break;
for (f();; g()) break;
for (; h(); i()) break;
for (j(); k(); l()) break;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-a();
-b();
-c();
-d();
-f();
-h();
-j();
-k();
+for (;;) break;
+for (a();;) break;
+for (; b();) break;
+for (c(); d();) break;
+for (;; e()) break;
+for (f();; g()) break;
+for (; h(); i()) break;
+for (j(); k(); l()) break;

```

## `terser/reduce_vars/modified`

- size: oxc 744 vs reference 612 (+132 bytes)

```js
function f0() {
	var a = 1, b = 2;
	b++;
	console.log(a + 1);
	console.log(b + 1);
}
function f1() {
	var a = 1, b = 2;
	--b;
	console.log(a + 1);
	console.log(b + 1);
}
function f2() {
	var a = 1, b = 2, c = 3;
	b = c;
	console.log(a + b);
	console.log(b + c);
	console.log(a + c);
	console.log(a + b + c);
}
function f3() {
	var a = 1, b = 2, c = 3;
	b *= c;
	console.log(a + b);
	console.log(b + c);
	console.log(a + c);
	console.log(a + b + c);
}
function f4() {
	var a = 1, b = 2, c = 3;
	if (a) {
		b = c;
	} else {
		c = b;
	}
	console.log(a + b);
	console.log(b + c);
	console.log(a + c);
	console.log(a + b + c);
}
function f5(a) {
	B = a;
	console.log(typeof A ? 'yes' : 'no');
	console.log(typeof B ? 'yes' : 'no');
}
f0(), f1(), f2(), f3(), f4(), f5();

```

```diff
--- reference
+++ oxc
@@ -1,37 +1,38 @@
 function f0() {
-	var b = 2;
+	var a = 1, b = 2;
 	b++;
-	console.log(2);
-	console.log(4);
+	console.log(a + 1);
+	console.log(b + 1);
 }
 function f1() {
-	var b = 2;
+	var a = 1, b = 2;
 	--b;
-	console.log(2);
-	console.log(2);
+	console.log(a + 1);
+	console.log(b + 1);
 }
 function f2() {
-	3;
-	console.log(4);
-	console.log(6);
-	console.log(4);
-	console.log(7);
+	var a = 1, b = 2, c = 3;
+	b = c;
+	console.log(a + b);
+	console.log(b + c);
+	console.log(a + c);
+	console.log(a + b + c);
 }
 function f3() {
-	var b = 2;
-	b *= 3;
-	console.log(7);
-	console.log(9);
-	console.log(4);
-	console.log(10);
+	var a = 1, b = 2, c = 3;
+	b *= c;
+	console.log(a + b);
+	console.log(b + c);
+	console.log(a + c);
+	console.log(a + b + c);
 }
 function f4() {
-	var b = 2, c = 3;
-	b = c;
-	console.log(1 + b);
+	var a = 1, b = 2, c = 3;
+	a ? b = c : c = b;
+	console.log(a + b);
 	console.log(b + c);
-	console.log(1 + c);
-	console.log(1 + b + c);
+	console.log(a + c);
+	console.log(a + b + c);
 }
 function f5(a) {
 	B = a;

```

## `terser/functions/inner_ref`

- size: oxc 155 vs reference 22 (+133 bytes)

```js
console.log((function(a) {
	return (function() {
		return a + 1;
	})();
})(1), (function(a) {
	return (function(a) {
		return a === undefined;
	})();
})(2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(2, true);
+console.log((function(a) {
+	return (function() {
+		return a + 1;
+	})();
+})(1), (function(a) {
+	return (function(a) {
+		return a === void 0;
+	})();
+})(2));

```

## `terser/issue_1656/f7`

- size: oxc 156 vs reference 23 (+133 bytes)

```js
var a = 100, b = 10;
function f22464() {
	var brake146670 = 5;
	while (((b = a) ? !a : ~a ? null : b += a) && --brake146670 > 0) {}
}
f22464();
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(100, 100);
+var a = 100, b = 10;
+function f22464() {
+	for (var brake146670 = 5; ((b = a) ? !a : !~a && (b += a)) && --brake146670 > 0;);
+}
+f22464(), console.log(a, b);

```

## `terser/issue_1704/mangle_catch_redef_3_ie8_toplevel`

- size: oxc 134 vs reference 0 (+134 bytes)

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
@@ -0,0 +1,12 @@
+var e = 'PASS';
+try {
+	throw 0;
+} catch (e) {
+	(function() {
+		function f() {
+			e = 'FAIL';
+		}
+		f(), f();
+	})();
+}
+console.log(e);

```

## `terser/issue_1704/mangle_catch_redef_3_toplevel`

- size: oxc 134 vs reference 0 (+134 bytes)

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
@@ -0,0 +1,12 @@
+var e = 'PASS';
+try {
+	throw 0;
+} catch (e) {
+	(function() {
+		function f() {
+			e = 'FAIL';
+		}
+		f(), f();
+	})();
+}
+console.log(e);

```

## `terser/issue_t292/no_flatten_with_arg_colliding_with_arg_value_inner_scope`

- size: oxc 211 vs reference 77 (+134 bytes)

```js
var g = ['a'];
function problem(arg) {
	return g.indexOf(arg);
}
function unused(arg) {
	return problem(arg);
}
function a(arg) {
	return problem(arg);
}
function b(problem) {
	return g[problem];
}
function c(arg) {
	return b(a(arg));
}
console.log(c('a'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,14 @@
-var problem, g = ['a'];
-console.log((problem = g.indexOf('a'), g[problem]));
+var g = ['a'];
+function problem(arg) {
+	return g.indexOf(arg);
+}
+function a(arg) {
+	return problem(arg);
+}
+function b(problem) {
+	return g[problem];
+}
+function c(arg) {
+	return b(a(arg));
+}
+console.log(c('a'));

```

## `terser/dead_code/dead_code_constant_boolean_should_warn_more`

- size: oxc 180 vs reference 45 (+135 bytes)

```js
while (!(foo && bar || x + '0')) {
	console.log('unreachable');
	var foo;
	function bar() {}
}
for (var x = 10, y; x && (y || x) && !typeof x; ++x) {
	asdf();
	foo();
	var moo;
}
bar();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-var foo, bar;
-var x = 10, y;
-var moo;
-bar();
+for (; !(foo && bar || x + '0');) {
+	console.log('unreachable');
+	var foo;
+	function bar() {}
+}
+for (var x = 10, y; x && (y || x) && !typeof x; ++x) {
+	asdf();
+	foo();
+	var moo;
+}

```

## `terser/hoist_props/issue_2377_1`

- size: oxc 155 vs reference 20 (+135 bytes)

```js
var obj = {
	foo: 1,
	bar: 2,
	square: function(x) {
		return x * x;
	},
	cube: function(x) {
		return x * x * x;
	}
};
console.log(obj.foo, obj.cube(3));

```

```diff
--- reference
+++ oxc
@@ -1 +1,11 @@
-console.log(1, 27);
+var obj = {
+	foo: 1,
+	bar: 2,
+	square: function(x) {
+		return x * x;
+	},
+	cube: function(x) {
+		return x * x * x;
+	}
+};
+console.log(obj.foo, obj.cube(3));

```

## `terser/hoist_props/issue_2377_2`

- size: oxc 155 vs reference 20 (+135 bytes)

```js
var obj = {
	foo: 1,
	bar: 2,
	square: function(x) {
		return x * x;
	},
	cube: function(x) {
		return x * x * x;
	}
};
console.log(obj.foo, obj.cube(3));

```

```diff
--- reference
+++ oxc
@@ -1 +1,11 @@
-console.log(1, 27);
+var obj = {
+	foo: 1,
+	bar: 2,
+	square: function(x) {
+		return x * x;
+	},
+	cube: function(x) {
+		return x * x * x;
+	}
+};
+console.log(obj.foo, obj.cube(3));

```

## `terser/hoist_props/issue_2377_3`

- size: oxc 155 vs reference 20 (+135 bytes)

```js
var obj = {
	foo: 1,
	bar: 2,
	square: function(x) {
		return x * x;
	},
	cube: function(x) {
		return x * x * x;
	}
};
console.log(obj.foo, obj.cube(3));

```

```diff
--- reference
+++ oxc
@@ -1 +1,11 @@
-console.log(1, 27);
+var obj = {
+	foo: 1,
+	bar: 2,
+	square: function(x) {
+		return x * x;
+	},
+	cube: function(x) {
+		return x * x * x;
+	}
+};
+console.log(obj.foo, obj.cube(3));

```

## `terser/collapse_vars/issue_348`

- size: oxc 136 vs reference 0 (+136 bytes)

```js
console.log((function x(EEE) {
	return (function(tee) {
		if (tee) {
			const EEE = tee;
			if (EEE) return EEE;
		}
	})(EEE);
})('PASS'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+console.log((function(EEE) {
+	return (function(tee) {
+		if (tee) {
+			let EEE = tee;
+			if (EEE) return EEE;
+		}
+	})(EEE);
+})('PASS'));

```

## `terser/inline/dont_inline_funcs_into_default_param_2`

- size: oxc 136 vs reference 0 (+136 bytes)

```js
'use strict';
const foo = () => 42;
const getData = (val) => ({ val });
const print = (data = getData(foo())) => {
	data.val === 42 && pass();
};
print();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+'use strict';
+const foo = () => 42;
+const getData = (val) => ({ val });
+((data = getData(foo())) => {
+	data.val === 42 && pass();
+})();

```

## `terser/reduce_vars/reduce_class_with_side_effects_in_properties`

- size: oxc 137 vs reference 0 (+137 bytes)

```js
let x = '';
class Y {
	static _ = x += 'PA';
}
class X {
	static _ = x += 'SS';
}
global.something = [new X(), new Y()];
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+let x = '';
+class Y {
+	static _ = x += 'PA';
+}
+class X {
+	static _ = x += 'SS';
+}
+global.something = [new X(), new Y()];
+console.log(x);

```

## `terser/reduce_vars/issue_3110_2`

- size: oxc 139 vs reference 0 (+139 bytes)

```js
(function() {
	function foo() {
		return isDev ? 'foo' : 'bar';
	}
	var isDev = true;
	console.log(foo());
	var obj = { foo };
	console.log(obj.foo());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+(function() {
+	function foo() {
+		return isDev ? 'foo' : 'bar';
+	}
+	var isDev = !0;
+	console.log(foo()), console.log({ foo }.foo());
+})();

```

## `terser/reduce_vars/issue_3110_shorthand_2`

- size: oxc 139 vs reference 0 (+139 bytes)

```js
(function() {
	function foo() {
		return isDev ? 'foo' : 'bar';
	}
	var isDev = true;
	console.log(foo());
	var obj = { foo };
	console.log(obj.foo());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+(function() {
+	function foo() {
+		return isDev ? 'foo' : 'bar';
+	}
+	var isDev = !0;
+	console.log(foo()), console.log({ foo }.foo());
+})();

```

## `terser/evaluate/issue_2968`

- size: oxc 140 vs reference 0 (+140 bytes)

```js
var c = 'FAIL';
(function() {
	(function(a, b) {
		a <<= 0;
		a && (a[c = 'PASS', 0 >>> (b += 1)] = 0);
	})(42, -42);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var c = 'FAIL';
+(function() {
+	(function(a, b) {
+		a <<= 0;
+		a && (a[c = 'PASS', 0 >>> (b += 1)] = 0);
+	})(42, -42);
+})();
+console.log(c);

```

## `terser/harmony/issue_2794_3`

- size: oxc 192 vs reference 51 (+141 bytes)

```js
function foo() {
	for (const a of func(value)) {
		console.log(a);
	}
	function func(va) {
		return doSomething(va);
	}
}
function doSomething(x) {
	return [
		x,
		2 * x,
		3 * x
	];
}
const value = 10;
foo();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,15 @@
-for (const o of [
-	10,
-	20,
-	30
-]) console.log(o);
+function foo() {
+	for (let t of func(e)) console.log(t);
+	function func(e) {
+		return doSomething(e);
+	}
+}
+function doSomething(e) {
+	return [
+		e,
+		2 * e,
+		3 * e
+	];
+}
+const e = 10;
+foo();

```

## `terser/keep_names/keep_fnames_and_avoid_collisions`

- size: oxc 142 vs reference 0 (+142 bytes)

```js
global.t = 'ttttttttttttttttttttt';
(function testBug() {
	var param1 = 'PASS';
	return () => {
		console.log(param1);
		var t = function() {};
		return t;
	};
})()();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+global.t = 'ttttttttttttttttttttt';
+(function() {
+	var e = 'PASS';
+	return () => {
+		console.log('PASS');
+		return function() {};
+	};
+})()();

```

## `terser/reduce_vars/reduce_class_with_side_effects_in_extends`

- size: oxc 143 vs reference 0 (+143 bytes)

```js
let x = '';
class Y extends (x += 'PA', Array) {}
class X extends (x += 'SS', Array) {}
global.something = [new X(), new Y()];
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+let x = '';
+class Y extends (x += 'PA', Array) {}
+class X extends (x += 'SS', Array) {}
+global.something = [new X(), new Y()];
+console.log(x);

```

## `terser/expansions/avoid_spread_getset_object`

- size: oxc 144 vs reference 0 (+144 bytes)

```js
let x = { ...{ get x() {
	return 1;
} } };
let y = { ...{ set y(_) {
	console.log(_);
} } };
console.log(x.x, y.y, x.x = 2, y.y = 3, x.x, y.y);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+let x = { ...{ get x() {
+	return 1;
+} } };
+let y = { ...{ set y(_) {
+	console.log(_);
+} } };
+console.log(x.x, y.y, x.x = 2, y.y = 3, x.x, y.y);

```

## `terser/try_catch/parent_scope_of_catch_block_is_not_the_try_block`

- size: oxc 145 vs reference 0 (+145 bytes)

```js
function test(foo, bar) {
	try {
		const bar = {};
		throw 'PASS';
	} catch (error) {
		return bar(error);
	}
}
console.log(test(null, (x) => x));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+function test(foo, bar) {
+	try {
+		let bar = {};
+		throw 'PASS';
+	} catch (error) {
+		return bar(error);
+	}
+}
+console.log(test(null, (x) => x));

```

## `terser/arrays/constant_join_3`

- size: oxc 459 vs reference 312 (+147 bytes)

```js
var a = [null].join();
var b = [,].join();
var c = [
	,
	1,
	,
	3
].join();
var d = [foo].join();
var e = [
	foo,
	null,
	undefined,
	bar
].join('-');
var f = [foo, bar].join('');
var g = [
	null,
	'foo',
	null,
	bar + 'baz'
].join('');
var h = [
	null,
	'foo',
	null,
	bar + 'baz'
].join('-');
var i = [
	'foo' + bar,
	null,
	baz + 'moo'
].join('');
var j = [foo + 'bar', baz].join('');
var k = [foo, 'bar' + baz].join('');
var l = [foo, bar + 'baz'].join('');

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,36 @@
-var a = '';
-var b = '';
-var c = ',1,,3';
-var d = '' + foo;
+var a = [null].join();
+var b = [,].join();
+var c = [
+	,
+	1,
+	,
+	3
+].join();
+var d = [foo].join();
 var e = [
 	foo,
-	'-',
+	null,
+	void 0,
 	bar
 ].join('-');
-var f = '' + foo + bar;
-var g = 'foo' + bar + 'baz';
-var h = ['-foo-', bar + 'baz'].join('-');
-var i = 'foo' + bar + baz + 'moo';
-var j = foo + 'bar' + baz;
-var k = foo + 'bar' + baz;
-var l = foo + (bar + 'baz');
+var f = [foo, bar].join('');
+var g = [
+	null,
+	'foo',
+	null,
+	bar + 'baz'
+].join('');
+var h = [
+	null,
+	'foo',
+	null,
+	bar + 'baz'
+].join('-');
+var i = [
+	'foo' + bar,
+	null,
+	baz + 'moo'
+].join('');
+var j = [foo + 'bar', baz].join('');
+var k = [foo, 'bar' + baz].join('');
+var l = [foo, bar + 'baz'].join('');

```

## `terser/inline/inline_into_scope_conflict`

- size: oxc 147 vs reference 0 (+147 bytes)

```js
var mod = pass;
const c = function c() {
	mod();
};
const b = function b() {
	for (;;) {
		c();
		break;
	}
};
(function() {
	var mod = id(mod);
	b();
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+var mod = pass;
+const c = function() {
+	mod();
+}, b = function() {
+	for (;;) {
+		c();
+		break;
+	}
+};
+(function() {
+	var mod = id(mod);
+	b();
+})();

```

## `terser/arrays/constant_join_2`

- size: oxc 545 vs reference 397 (+148 bytes)

```js
var a = [
	'foo',
	'bar',
	boo(),
	'baz',
	'x',
	'y'
].join('');
var b = [
	'foo',
	'bar',
	boo(),
	'baz',
	'x',
	'y'
].join('-');
var c = [
	'foo',
	'bar',
	boo(),
	'baz',
	'x',
	'y'
].join('really-long-separator');
var d = [
	'foo',
	'bar',
	boo(),
	[
		'foo',
		1,
		2,
		3,
		'bar'
	].join('+'),
	'baz',
	'x',
	'y'
].join('-');
var e = [
	'foo',
	'bar',
	boo(),
	[
		'foo',
		1,
		2,
		3,
		'bar'
	].join('+'),
	'baz',
	'x',
	'y'
].join('really-long-separator');
var f = [
	'str',
	'str' + variable,
	'foo',
	'bar',
	'moo' + foo
].join('');

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,18 @@
-var a = 'foobar' + boo() + 'bazxy';
+var a = [
+	'foo',
+	'bar',
+	boo(),
+	'baz',
+	'x',
+	'y'
+].join('');
 var b = [
-	'foo-bar',
+	'foo',
+	'bar',
 	boo(),
-	'baz-x-y'
+	'baz',
+	'x',
+	'y'
 ].join('-');
 var c = [
 	'foo',
@@ -13,17 +23,39 @@
 	'y'
 ].join('really-long-separator');
 var d = [
-	'foo-bar',
+	'foo',
+	'bar',
 	boo(),
-	'foo+1+2+3+bar-baz-x-y'
+	[
+		'foo',
+		1,
+		2,
+		3,
+		'bar'
+	].join('+'),
+	'baz',
+	'x',
+	'y'
 ].join('-');
 var e = [
 	'foo',
 	'bar',
 	boo(),
-	'foo+1+2+3+bar',
+	[
+		'foo',
+		1,
+		2,
+		3,
+		'bar'
+	].join('+'),
 	'baz',
 	'x',
 	'y'
 ].join('really-long-separator');
-var f = 'strstr' + variable + 'foobarmoo' + foo;
+var f = [
+	'str',
+	'str' + variable,
+	'foo',
+	'bar',
+	'moo' + foo
+].join('');

```

## `terser/reduce_vars/issue_3110_1`

- size: oxc 150 vs reference 0 (+150 bytes)

```js
(function() {
	function foo() {
		return isDev ? 'foo' : 'bar';
	}
	var isDev = true;
	var obj = { foo };
	console.log(foo());
	console.log(obj.foo());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+(function() {
+	function foo() {
+		return isDev ? 'foo' : 'bar';
+	}
+	var isDev = !0, obj = { foo };
+	console.log(foo()), console.log(obj.foo());
+})();

```

## `terser/reduce_vars/issue_3110_shorthand_1`

- size: oxc 150 vs reference 0 (+150 bytes)

```js
(function() {
	function foo() {
		return isDev ? 'foo' : 'bar';
	}
	var isDev = true;
	var obj = { foo };
	console.log(foo());
	console.log(obj.foo());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+(function() {
+	function foo() {
+		return isDev ? 'foo' : 'bar';
+	}
+	var isDev = !0, obj = { foo };
+	console.log(foo()), console.log(obj.foo());
+})();

```

## `terser/collapse_vars/collapse_vars_unary_2`

- size: oxc 151 vs reference 0 (+151 bytes)

```js
global.leak = (n) => console.log(n);
global.num = 4;
let counter = -1;
for (const i in [
	0,
	1,
	2,
	3,
	4,
	5
]) {
	counter++, i == num && leak(counter);
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,11 @@
+global.leak = (n) => console.log(n);
+global.num = 4;
+let counter = -1;
+for (let i in [
+	0,
+	1,
+	2,
+	3,
+	4,
+	5
+]) counter++, i == num && leak(counter);

```

## `terser/issue_1261/pure_function_calls`

- size: oxc 271 vs reference 120 (+151 bytes)

```js
(function() {
	console.log('iife0');
})();
var iife1 = (function() {
	console.log('iife1');
	function iife1() {}
	return iife1;
})();
(function() {
	var iife2 = (function() {
		console.log('iife2');
		function iife2() {}
		return iife2;
	})();
})();
bar(), baz(), quux();
a.b(), c.d.e(), f.g();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,17 @@
-var iife1 = (function() {
+(function() {
+	console.log('iife0');
+})();
+(function() {
 	console.log('iife1');
 	function iife1() {}
 	return iife1;
 })();
-baz(), quux();
-a.b(), f.g();
+(function() {
+	(function() {
+		console.log('iife2');
+		function iife2() {}
+		return iife2;
+	})();
+})();
+bar(), baz(), quux();
+a.b(), c.d.e(), f.g();

```

## `terser/collapse_vars/collapse_vars_issue_721`

- size: oxc 547 vs reference 395 (+152 bytes)

```js
define([
	'require',
	'exports',
	'handlebars'
], function(require, exports, hb) {
	var win = window;
	var _hb = win.Handlebars = hb;
	return _hb;
});
def(function(hb) {
	var win = window;
	var prop = 'Handlebars';
	var _hb = win[prop] = hb;
	return _hb;
});
def(function(hb) {
	var prop = 'Handlebars';
	var win = window;
	var _hb = win[prop] = hb;
	return _hb;
});
def(function(hb) {
	var prop = 'Handlebars';
	var win = g();
	var _hb = win[prop] = hb;
	return _hb;
});
def(function(hb) {
	var prop = g1();
	var win = g2();
	var _hb = win[prop] = hb;
	return _hb;
});
def(function(hb) {
	var win = g2();
	var prop = g1();
	var _hb = win[prop] = hb;
	return _hb;
});

```

```diff
--- reference
+++ oxc
@@ -3,16 +3,21 @@
 	'exports',
 	'handlebars'
 ], function(require, exports, hb) {
-	return window.Handlebars = hb;
+	var win = window;
+	return win.Handlebars = hb;
 }), def(function(hb) {
-	return window.Handlebars = hb;
+	var win = window, prop = 'Handlebars';
+	return win[prop] = hb;
 }), def(function(hb) {
-	return window.Handlebars = hb;
+	var prop = 'Handlebars', win = window;
+	return win[prop] = hb;
 }), def(function(hb) {
-	return g().Handlebars = hb;
+	var prop = 'Handlebars', win = g();
+	return win[prop] = hb;
 }), def(function(hb) {
-	var prop = g1();
-	return g2()[prop] = hb;
+	var prop = g1(), win = g2();
+	return win[prop] = hb;
 }), def(function(hb) {
-	return g2()[g1()] = hb;
+	var win = g2(), prop = g1();
+	return win[prop] = hb;
 });

```

## `terser/reduce_vars/chained_assignments`

- size: oxc 178 vs reference 25 (+153 bytes)

```js
function f() {
	var a = [
		94,
		173,
		190,
		239
	];
	var b = 0;
	b |= a[0];
	b <<= 8;
	b |= a[1];
	b <<= 8;
	b |= a[2];
	b <<= 8;
	b |= a[3];
	return b;
}
console.log(f().toString(16));

```

```diff
--- reference
+++ oxc
@@ -1 +1,10 @@
-console.log('5eadbeef');
+function f() {
+	var a = [
+		94,
+		173,
+		190,
+		239
+	], b = 0;
+	return b |= a[0], b <<= 8, b |= a[1], b <<= 8, b |= a[2], b <<= 8, b |= a[3], b;
+}
+console.log(f().toString(16));

```

## `terser/switch/issue_445`

- size: oxc 155 vs reference 0 (+155 bytes)

```js
const leak = () => {};
function scan() {
	let len = leak();
	let ch = 0;
	switch (ch = 123) {
		case 'never-reached':
			const ch = leak();
			leak(ch);
	}
	return len === 123 ? 'FAIL' : 'PASS';
}
console.log(scan());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+const leak = () => {};
+function scan() {
+	let len;
+	let ch = 0;
+	if ((ch = 123) === 'never-reached') {
+		let ch;
+	}
+	return 'PASS';
+}
+console.log(scan());

```

## `terser/functions/issue_t131b`

- size: oxc 231 vs reference 73 (+158 bytes)

```js
(function() {
	function thing() {
		return { a: 1 };
	}
	function one() {
		return thing();
	}
	function two() {
		var x = thing();
		x.a = 2;
		x.b = 3;
		return x;
	}
	console.log(JSON.stringify(one()), JSON.stringify(two()));
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,13 @@
-console.log(JSON.stringify({ a: 1 }), JSON.stringify({
-	a: 2,
-	b: 3
-}));
+(function() {
+	function thing() {
+		return { a: 1 };
+	}
+	function one() {
+		return thing();
+	}
+	function two() {
+		var x = thing();
+		return x.a = 2, x.b = 3, x;
+	}
+	console.log(JSON.stringify(one()), JSON.stringify(two()));
+})();

```

## `terser/functions/avoid_generating_duplicate_functions_compared_together_4`

- size: oxc 161 vs reference 0 (+161 bytes)

```js
const x = () => null;
const y = () => x;
const fns = [y(), y()];
console.log(fns[0] === fns[1]);
const fns_obj = {
	a: y(),
	b: y()
};
console.log(fns_obj.a === fns_obj.b);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+const x = () => null, y = () => x, fns = [y(), y()];
+console.log(fns[0] === fns[1]);
+const fns_obj = {
+	a: y(),
+	b: y()
+};
+console.log(fns_obj.a === fns_obj.b);

```

## `terser/issue_t292/no_flatten_with_var_colliding_with_arg_value_inner_scope`

- size: oxc 255 vs reference 94 (+161 bytes)

```js
var g = ['a'];
function problem(arg) {
	return g.indexOf(arg);
}
function unused(arg) {
	return problem(arg);
}
function a(arg) {
	return problem(arg);
}
function b(test) {
	var problem = test * 2;
	console.log(problem);
	return g[problem];
}
function c(arg) {
	return b(a(arg));
}
console.log(c('a'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,15 @@
-var problem, g = ['a'];
-console.log((console.log(problem = 2 * g.indexOf('a')), g[problem]));
+var g = ['a'];
+function problem(arg) {
+	return g.indexOf(arg);
+}
+function a(arg) {
+	return problem(arg);
+}
+function b(test) {
+	var problem = test * 2;
+	return console.log(problem), g[problem];
+}
+function c(arg) {
+	return b(a(arg));
+}
+console.log(c('a'));

```

## `terser/functions/issue_t131a`

- size: oxc 235 vs reference 73 (+162 bytes)

```js
(function() {
	function thing() {
		return { a: 1 };
	}
	function one() {
		return thing();
	}
	function two() {
		var x = thing();
		x.a = 2;
		x.b = 3;
		return x;
	}
	console.log(JSON.stringify(one()), JSON.stringify(two()));
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,15 @@
-console.log(JSON.stringify({ a: 1 }), JSON.stringify({
-	a: 2,
-	b: 3
-}));
+(function() {
+	function thing() {
+		return { a: 1 };
+	}
+	function one() {
+		return thing();
+	}
+	function two() {
+		var x = thing();
+		x.a = 2;
+		x.b = 3;
+		return x;
+	}
+	console.log(JSON.stringify(one()), JSON.stringify(two()));
+})();

```

## `terser/typeof/typeof_defun_1`

- size: oxc 225 vs reference 63 (+162 bytes)

```js
function f() {
	console.log('YES');
}
function g() {
	h = 42;
	console.log('NOPE');
}
function h() {
	console.log('YUP');
}
g = 42;
'function' == typeof f && f();
'function' == typeof g && g();
'function' == typeof h && h();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,14 @@
+function f() {
+	console.log('YES');
+}
+function g() {
+	h = 42;
+	console.log('NOPE');
+}
 function h() {
 	console.log('YUP');
 }
-console.log('YES');
-h();
+g = 42;
+typeof f == 'function' && f();
+typeof g == 'function' && g();
+typeof h == 'function' && h();

```

## `terser/reduce_vars/reduce_funcs_in_array_1`

- size: oxc 166 vs reference 0 (+166 bytes)

```js
(function() {
	function Foo() {
		return 123;
	}
	function bar() {
		return [Foo].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], a[0][0]());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+(function() {
+	function Foo() {
+		return 123;
+	}
+	function bar() {
+		return [Foo, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], a[0][0]());
+})();

```

## `terser/functions/issue_2531_3`

- size: oxc 202 vs reference 35 (+167 bytes)

```js
function outer() {
	function inner(value) {
		function closure() {
			return value;
		}
		return function() {
			return closure();
		};
	}
	return inner('Hello');
}
console.log('Greeting:', outer()());

```

```diff
--- reference
+++ oxc
@@ -1 +1,12 @@
-console.log('Greeting:', 'Hello');
+function outer() {
+	function inner(value) {
+		function closure() {
+			return value;
+		}
+		return function() {
+			return closure();
+		};
+	}
+	return inner('Hello');
+}
+console.log('Greeting:', outer()());

```

## `terser/inline/inline_func_with_name_existing_in_block_scope`

- size: oxc 170 vs reference 0 (+170 bytes)

```js
let something = 'PASS';
function getSomething() {
	return something;
}
function setSomething() {
	something = { value: 42 };
}
function main() {
	if (typeof somethingElse == 'undefined') {
		const something = getSomething();
		console.log(something);
	}
}
main();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+function getSomething() {
+	return 'PASS';
+}
+function main() {
+	if (typeof somethingElse > 'u') {
+		let something = getSomething();
+		console.log(something);
+	}
+}
+main();

```

## `terser/reduce_vars/reduce_funcs_in_array_2`

- size: oxc 176 vs reference 0 (+176 bytes)

```js
(function() {
	function Foo() {
		return 123;
	}
	function bar(val) {
		return [val || Foo].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], a[0][0]());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+(function() {
+	function Foo() {
+		return 123;
+	}
+	function bar(val) {
+		return [val || Foo, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], a[0][0]());
+})();

```

## `terser/reduce_vars/reduce_funcs_in_object_literal_2`

- size: oxc 176 vs reference 0 (+176 bytes)

```js
(function() {
	function Foo() {
		return 123;
	}
	function bar(val) {
		return [val || Foo].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], a[0][0]());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+(function() {
+	function Foo() {
+		return 123;
+	}
+	function bar(val) {
+		return [val || Foo, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], a[0][0]());
+})();

```

## `terser/reduce_vars/reduce_funcs_in_object_literal_1`

- size: oxc 181 vs reference 0 (+181 bytes)

```js
(function() {
	function Foo() {
		return 123;
	}
	function bar() {
		return [{ prop: Foo }.prop].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], a[0][0]());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+(function() {
+	function Foo() {
+		return 123;
+	}
+	function bar() {
+		return [{ prop: Foo }.prop, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], a[0][0]());
+})();

```

## `terser/reduce_vars/reduce_funcs_in_shorthand_object_literal_1`

- size: oxc 181 vs reference 0 (+181 bytes)

```js
(function() {
	function Foo() {
		return 123;
	}
	function bar() {
		var prop = Foo;
		return [{ prop }.prop].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], a[0][0]());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+(function() {
+	function Foo() {
+		return 123;
+	}
+	function bar() {
+		return [{ prop: Foo }.prop, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], a[0][0]());
+})();

```

## `terser/functions/issue_2663_3`

- size: oxc 748 vs reference 564 (+184 bytes)

```js
(function() {
	var outputs = [
		{
			type: 0,
			target: null,
			eventName: 'ngSubmit',
			propName: null
		},
		{
			type: 0,
			target: null,
			eventName: 'submit',
			propName: null
		},
		{
			type: 0,
			target: null,
			eventName: 'reset',
			propName: null
		}
	];
	function listenToElementOutputs(outputs) {
		var handlers = [];
		for (var i = 0; i < outputs.length; i++) {
			var output = outputs[i];
			var handleEventClosure = renderEventHandlerClosure(output.eventName);
			handlers.push(handleEventClosure);
		}
		var target, name;
		return handlers;
	}
	function renderEventHandlerClosure(eventName) {
		return function() {
			return console.log(eventName);
		};
	}
	listenToElementOutputs(outputs).forEach(function(handler) {
		return handler();
	});
})();

```

```diff
--- reference
+++ oxc
@@ -1,33 +1,38 @@
-(function(outputs) {
-	var handlers = [];
-	for (var i = 0; i < outputs.length; i++) {
-		var handleEventClosure = function(eventName) {
-			return function() {
-				return console.log(eventName);
-			};
-		}(outputs[i].eventName);
-		handlers.push(handleEventClosure);
+(function() {
+	var outputs = [
+		{
+			type: 0,
+			target: null,
+			eventName: 'ngSubmit',
+			propName: null
+		},
+		{
+			type: 0,
+			target: null,
+			eventName: 'submit',
+			propName: null
+		},
+		{
+			type: 0,
+			target: null,
+			eventName: 'reset',
+			propName: null
+		}
+	];
+	function listenToElementOutputs(outputs) {
+		var handlers = [];
+		for (var i = 0; i < outputs.length; i++) {
+			var output = outputs[i], handleEventClosure = renderEventHandlerClosure(output.eventName);
+			handlers.push(handleEventClosure);
+		}
+		return handlers;
 	}
-	return handlers;
-})([
-	{
-		type: 0,
-		target: null,
-		eventName: 'ngSubmit',
-		propName: null
-	},
-	{
-		type: 0,
-		target: null,
-		eventName: 'submit',
-		propName: null
-	},
-	{
-		type: 0,
-		target: null,
-		eventName: 'reset',
-		propName: null
+	function renderEventHandlerClosure(eventName) {
+		return function() {
+			return console.log(eventName);
+		};
 	}
-]).forEach(function(handler) {
-	return handler();
-});
+	listenToElementOutputs(outputs).forEach(function(handler) {
+		return handler();
+	});
+})();

```

## `terser/reduce_vars/issue_741_2`

- size: oxc 184 vs reference 0 (+184 bytes)

```js
var a = console.log;
var might_change = 0;
global.problem = () => {
	var c = might_change;
	a(c);
};
global.increment = () => {
	might_change++;
};
increment();
problem();
increment();
problem();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+var a = console.log;
+var might_change = 0;
+global.problem = () => {
+	a(might_change);
+};
+global.increment = () => {
+	might_change++;
+};
+increment();
+problem();
+increment();
+problem();

```

## `terser/comments/comment_moved_between_return_and_value`

- size: oxc 188 vs reference 0 (+188 bytes)

```js
console.log((function(same_name) {
	/* @license Foo bar */
	function licensed(same_name) {
		return same_name.toUpperCase();
	}
	console.log('PASS');
	return licensed('PA') + 'SS';
})());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+console.log((function(same_name) {
+	/* @license Foo bar */
+	function licensed(same_name) {
+		return same_name.toUpperCase();
+	}
+	console.log('PASS');
+	return licensed('PA') + 'SS';
+})());

```

## `terser/drop_unused/issue_2105_1`

- size: oxc 262 vs reference 71 (+191 bytes)

```js
!(function(factory) {
	factory();
})(function() {
	return (function(fn) {
		fn()().prop();
	})(function() {
		function bar() {
			var quux = function() {
				console.log('PASS');
			}, foo = function() {
				console.log;
				quux();
			};
			return { prop: foo };
		}
		return bar;
	});
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,17 @@
-({ prop: function() {
-	console.log;
-	console.log('PASS');
-} }).prop();
+(function(factory) {
+	factory();
+})(function() {
+	return (function(fn) {
+		fn()().prop();
+	})(function() {
+		function bar() {
+			var quux = function() {
+				console.log('PASS');
+			};
+			return { prop: function() {
+				quux();
+			} };
+		}
+		return bar;
+	});
+});

```

## `terser/issue_417/test_unexpected_crash_2`

- size: oxc 194 vs reference 0 (+194 bytes)

```js
function x() {
	var getsInlined = function() {
		var leakedVariable1 = 3;
		var leakedVariable2 = 1 + leakedVariable1[0];
		console.log(leakedVariable1);
		console.log(leakedVariable2);
	};
	var getsDropped = getsInlined();
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+function x() {
+	var getsDropped = function() {
+		var leakedVariable1 = 3;
+		var leakedVariable2 = 1 + leakedVariable1[0];
+		console.log(leakedVariable1);
+		console.log(leakedVariable2);
+	}();
+}

```

## `terser/issue_417/test_unexpected_crash`

- size: oxc 195 vs reference 0 (+195 bytes)

```js
function x() {
	var getsInlined = function() {
		var leakedVariable1 = 3;
		var leakedVariable2 = 1 + 2 * leakedVariable1;
		console.log(leakedVariable1);
		console.log(leakedVariable2);
	};
	var getsDropped = getsInlined();
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+function x() {
+	var getsDropped = function() {
+		var leakedVariable1 = 3;
+		var leakedVariable2 = 1 + 2 * leakedVariable1;
+		console.log(leakedVariable1);
+		console.log(leakedVariable2);
+	}();
+}

```

## `terser/string_literal/issue_10595`

- size: oxc 277 vs reference 82 (+195 bytes)

```js
// Issue #10595: hex escape followed by digit in string with newline
var a = '\x000\n';
// Other control characters with newline
var b = '\n';
var c = '\n';
// Null followed by non-digit should use \0
var d = '\0a\n';
// Tab and newline can be safely included
var e = '	\n';

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
-var a = `\x000
-`;
-var b = `\x01
-`;
-var c = `\x1f
-`;
-var d = `\0a
-`;
-var e = `	
-`;
+// Issue #10595: hex escape followed by digit in string with newline
+var a = '\x000\n';
+// Other control characters with newline
+var b = '\n';
+var c = '\n';
+// Null followed by non-digit should use \0
+var d = '\0a\n';
+// Tab and newline can be safely included
+var e = '	\n';

```

## `terser/reduce_vars/single_use_class_referenced_in_array`

- size: oxc 198 vs reference 0 (+198 bytes)

```js
(function() {
	class Foo {
		data() {
			return 123;
		}
	}
	function bar(val) {
		return [val || Foo].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], new a[0][0]().data());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+(function() {
+	class Foo {
+		data() {
+			return 123;
+		}
+	}
+	function bar(val) {
+		return [val || Foo, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], new a[0][0]().data());
+})();

```

## `terser/arrow/issue_2105_1`

- size: oxc 262 vs reference 61 (+201 bytes)

```js
!(function(factory) {
	factory();
})(function() {
	return (function(fn) {
		fn()().prop();
	})(function() {
		function bar() {
			var quux = function() {
				console.log('PASS');
			}, foo = function() {
				console.log;
				quux();
			};
			return { prop: foo };
		}
		return bar;
	});
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,17 @@
-({ prop() {
-	console.log;
-	console.log('PASS');
-} }).prop();
+(function(factory) {
+	factory();
+})(function() {
+	return (function(fn) {
+		fn()().prop();
+	})(function() {
+		function bar() {
+			var quux = function() {
+				console.log('PASS');
+			};
+			return { prop: function() {
+				quux();
+			} };
+		}
+		return bar;
+	});
+});

```

## `terser/drop_unused/issue_805_2`

- size: oxc 202 vs reference 0 (+202 bytes)

```js
(function(a) {
	function unused() {}
	unused.prototype[a()] = 42;
	(unused.prototype.bar = function() {
		console.log('bar');
	})();
	return unused;
})(function() {
	console.log('foo');
	return 'foo';
});

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+(function(a) {
+	function unused() {}
+	return unused.prototype[a()] = 42, (unused.prototype.bar = function() {
+		console.log('bar');
+	})(), unused;
+})(function() {
+	return console.log('foo'), 'foo';
+});

```

## `terser/evaluate/unsafe_float_key_complex`

- size: oxc 287 vs reference 82 (+205 bytes)

```js
console.log({
	2.72: { 3.14: 1 },
	3.14: 1
} + 1, {
	2.72: { 3.14: 1 },
	3.14: 1
}[2.72] + 1, {
	2.72: { 3.14: 1 },
	3.14: 1
}['2.72'] + 1, {
	2.72: { 3.14: 1 },
	3.14: 1
}[3.14] + 1, {
	2.72: { 3.14: 1 },
	3.14: 1
}[2.72][3.14] + 1, {
	2.72: { 3.14: 1 },
	3.14: 1
}[2.72]['3.14'] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1,19 @@
-console.log('[object Object]1', '[object Object]1', '[object Object]1', 2, 2, 2);
+console.log({
+	2.72: { 3.14: 1 },
+	3.14: 1
+} + 1, {
+	2.72: { 3.14: 1 },
+	3.14: 1
+}[2.72] + 1, {
+	2.72: { 3.14: 1 },
+	3.14: 1
+}['2.72'] + 1, {
+	2.72: { 3.14: 1 },
+	3.14: 1
+}[3.14] + 1, {
+	2.72: { 3.14: 1 },
+	3.14: 1
+}[2.72][3.14] + 1, {
+	2.72: { 3.14: 1 },
+	3.14: 1
+}[2.72]['3.14'] + 1);

```

## `terser/inline/inline_into_scope_conflict_enclosed`

- size: oxc 205 vs reference 0 (+205 bytes)

```js
global.same_name = 'PASS';
function $(same_name) {
	if (same_name) indirection_1(same_name);
}
function indirection_2() {
	console.log(same_name);
}
function indirection_1() {
	indirection_2();
}
$('FAIL');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,11 @@
+global.same_name = 'PASS';
+function $(same_name) {
+	same_name && indirection_1(same_name);
+}
+function indirection_2() {
+	console.log(same_name);
+}
+function indirection_1() {
+	indirection_2();
+}
+$('FAIL');

```

## `terser/drop_unused/issue_805_1`

- size: oxc 209 vs reference 0 (+209 bytes)

```js
(function(a) {
	var unused = function() {};
	unused.prototype[a()] = 42;
	(unused.prototype.bar = function() {
		console.log('bar');
	})();
	return unused;
})(function() {
	console.log('foo');
	return 'foo';
});

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+(function(a) {
+	var unused = function() {};
+	return unused.prototype[a()] = 42, (unused.prototype.bar = function() {
+		console.log('bar');
+	})(), unused;
+})(function() {
+	return console.log('foo'), 'foo';
+});

```

## `terser/reduce_vars/single_use_class_referenced_in_object_literal`

- size: oxc 213 vs reference 0 (+213 bytes)

```js
(function() {
	class Foo {
		data() {
			return 123;
		}
	}
	function bar(val) {
		return [{ prop: val || Foo }.prop].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], new a[0][0]().data());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+(function() {
+	class Foo {
+		data() {
+			return 123;
+		}
+	}
+	function bar(val) {
+		return [{ prop: val || Foo }.prop, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], new a[0][0]().data());
+})();

```

## `terser/reduce_vars/single_use_class_referenced_in_shorthand_object_literal`

- size: oxc 213 vs reference 0 (+213 bytes)

```js
(function() {
	class Foo {
		data() {
			return 123;
		}
	}
	function bar(val) {
		var prop = val || Foo;
		return [{ prop }.prop].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], new a[0][0]().data());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+(function() {
+	class Foo {
+		data() {
+			return 123;
+		}
+	}
+	function bar(val) {
+		return [{ prop: val || Foo }.prop, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], new a[0][0]().data());
+})();

```

## `terser/reduce_vars/inverted_var`

- size: oxc 345 vs reference 127 (+218 bytes)

```js
console.log((function() {
	var a = 1;
	return a;
})(), (function() {
	var b;
	b = 2;
	return b;
})(), (function() {
	c = 3;
	return c;
	var c;
})(), (function(c) {
	c = 4;
	return c;
})(), (function(c) {
	c = 5;
	return c;
	var c;
})(), (function c() {
	c = 6;
	return c;
})(), (function c() {
	c = 7;
	return c;
	var c;
})(), (function() {
	c = 8;
	return c;
	var c = 'foo';
})());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,27 @@
-console.log(1, 2, 3, 4, 5, (function c() {
+console.log((function() {
+	return 1;
+})(), (function() {
+	return 2;
+})(), (function() {
+	c = 3;
+	return c;
+	var c;
+})(), (function(c) {
+	c = 4;
+	return c;
+})(), (function(c) {
+	c = 5;
+	return c;
+	var c;
+})(), (function c() {
 	c = 6;
 	return c;
-})(), 7, (function() {
+})(), (function() {
+	c = 7;
+	return c;
+	var c;
+})(), (function() {
 	c = 8;
 	return c;
-	var c = 'foo';
+	var c;
 })());

```

## `terser/functions/issue_2647_1`

- size: oxc 223 vs reference 0 (+223 bytes)

```js
(function(n, o = 'FAIL') {
	console.log(n);
})('PASS');
(function(n, o = 'PASS') {
	console.log(o);
})('FAIL');
(function(o = 'PASS') {
	console.log(o);
})();
(function(n, { o = 'FAIL' }) {
	console.log(n);
})('PASS', {});

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+(function(n, o = 'FAIL') {
+	console.log(n);
+})('PASS');
+(function(n, o = 'PASS') {
+	console.log(o);
+})('FAIL');
+(function(o = 'PASS') {
+	console.log(o);
+})();
+(function(n, { o = 'FAIL' }) {
+	console.log(n);
+})('PASS', {});

```

## `terser/reduce_vars/issue_581`

- size: oxc 226 vs reference 0 (+226 bytes)

```js
class Yellow {
	method() {
		const errorMessage = 'FAIL';
		return applyCb(errorMessage, () => console.log(this.message()));
	}
	message() {
		return 'PASS';
	}
}
function applyCb(errorMessage, callback) {
	return callback(errorMessage);
}
new Yellow().method();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+class Yellow {
+	method() {
+		return applyCb('FAIL', () => console.log(this.message()));
+	}
+	message() {
+		return 'PASS';
+	}
+}
+function applyCb(errorMessage, callback) {
+	return callback(errorMessage);
+}
+new Yellow().method();

```

## `terser/functions/iifes_returning_constants_keep_fargs_false`

- size: oxc 351 vs reference 120 (+231 bytes)

```js
(function() {
	return -1.23;
})();
console.log((function foo() {
	return 'okay';
})());
console.log((function foo(x, y, z) {
	return 123;
})());
console.log((function(x, y, z) {
	return z;
})());
console.log((function(x, y, z) {
	if (x) return y;
	return z;
})(1, 2, 3));
console.log((function(x, y) {
	return x * y;
})(2, 3));
console.log((function(x, y) {
	return x * y;
})(2, 3, a(), b()));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,19 @@
-console.log('okay');
-console.log(123);
-console.log(void 0);
-console.log(2);
-console.log(6);
-console.log((a(), b(), 6));
+console.log((function() {
+	return 'okay';
+})());
+console.log((function(x, y, z) {
+	return 123;
+})());
+console.log((function(x, y, z) {
+	return z;
+})());
+console.log((function(x, y, z) {
+	if (x) return y;
+	return z;
+})(1, 2, 3));
+console.log((function(x, y) {
+	return x * y;
+})(2, 3));
+console.log((function(x, y) {
+	return x * y;
+})(2, 3, a(), b()));

```

## `terser/functions/iifes_returning_constants_keep_fargs_true`

- size: oxc 351 vs reference 120 (+231 bytes)

```js
(function() {
	return -1.23;
})();
console.log((function foo() {
	return 'okay';
})());
console.log((function foo(x, y, z) {
	return 123;
})());
console.log((function(x, y, z) {
	return z;
})());
console.log((function(x, y, z) {
	if (x) return y;
	return z;
})(1, 2, 3));
console.log((function(x, y) {
	return x * y;
})(2, 3));
console.log((function(x, y) {
	return x * y;
})(2, 3, a(), b()));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,19 @@
-console.log('okay');
-console.log(123);
-console.log(void 0);
-console.log(2);
-console.log(6);
-console.log((a(), b(), 6));
+console.log((function() {
+	return 'okay';
+})());
+console.log((function(x, y, z) {
+	return 123;
+})());
+console.log((function(x, y, z) {
+	return z;
+})());
+console.log((function(x, y, z) {
+	if (x) return y;
+	return z;
+})(1, 2, 3));
+console.log((function(x, y) {
+	return x * y;
+})(2, 3));
+console.log((function(x, y) {
+	return x * y;
+})(2, 3, a(), b()));

```

## `terser/collapse_vars/ignore_class`

- size: oxc 239 vs reference 0 (+239 bytes)

```js
global.leak = (x) => class dummy {
	get pass() {
		return x;
	}
};
global.module = {};
(function() {
	const SuperClass = leak('PASS');
	class TheClass extends SuperClass {}
	module.exports = TheClass;
})();
console.log(new module.exports().pass);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+global.leak = (x) => class {
+	get pass() {
+		return x;
+	}
+}, global.module = {}, (function() {
+	let SuperClass = leak('PASS');
+	class TheClass extends SuperClass {}
+	module.exports = TheClass;
+})(), console.log(new module.exports().pass);

```

## `terser/drop_unused/issue_2105_2`

- size: oxc 262 vs reference 21 (+241 bytes)

```js
!(function(factory) {
	factory();
})(function() {
	return (function(fn) {
		fn()().prop();
	})(function() {
		function bar() {
			var quux = function() {
				console.log('PASS');
			}, foo = function() {
				console.log;
				quux();
			};
			return { prop: foo };
		}
		return bar;
	});
});

```

```diff
--- reference
+++ oxc
@@ -1 +1,17 @@
-console.log('PASS');
+(function(factory) {
+	factory();
+})(function() {
+	return (function(fn) {
+		fn()().prop();
+	})(function() {
+		function bar() {
+			var quux = function() {
+				console.log('PASS');
+			};
+			return { prop: function() {
+				quux();
+			} };
+		}
+		return bar;
+	});
+});

```

## `terser/class_properties/basic_class_properties`

- size: oxc 244 vs reference 0 (+244 bytes)

```js
class A {
	static foo;
	bar;
	static fil = 'P';
	another = 'A';
	get;
	set = 'S';
	#private;
	#private2 = 'S';
	toString() {
		if ('bar' in this && 'foo' in A) {
			return A.fil + this.another + this.set + this.#private2;
		}
	}
}
console.log(new A().toString());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+class A {
+	static foo;
+	bar;
+	static fil = 'P';
+	another = 'A';
+	get;
+	set = 'S';
+	#private2 = 'S';
+	toString() {
+		if ('bar' in this && 'foo' in A) return A.fil + this.another + this.set + this.#private2;
+	}
+}
+console.log(new A().toString());

```

## `terser/drop_unused/variable_refs_outside_unused_class`

- size: oxc 247 vs reference 0 (+247 bytes)

```js
var symbols = id({ prop: 'method' });
var input = id({ prop: class {} });
var staticProp = id({ prop: 'foo' });
class unused extends input.prop {
	static prop = staticProp.prop;
	[symbols.prop]() {
		console.log('PASS');
	}
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+var symbols = id({ prop: 'method' });
+var input = id({ prop: class {} });
+var staticProp = id({ prop: 'foo' });
+class unused extends input.prop {
+	static prop = staticProp.prop;
+	[symbols.prop]() {
+		console.log('PASS');
+	}
+}
+console.log('PASS');

```

## `terser/evaluate/number_method_call`

- size: oxc 648 vs reference 387 (+261 bytes)

```js
console.log(1.23.toExponential());
console.log(1.23.toExponential(undefined));
console.log(1.23.toExponential(void 0));
console.log(1.23.toExponential(...[]));
console.log(1.23.toExponential(...[undefined]));
console.log(1.23.toExponential(...[...[undefined]]));
console.log(1.23.toPrecision());
console.log(1.23.toPrecision(undefined));
console.log(1.23.toPrecision(void 0));
console.log(1.23.toPrecision(...[]));
console.log(1.23.toPrecision(...[undefined]));
console.log(1.23.toPrecision(...[...[undefined]]));
console.log(1.23.toFixed());
console.log(1.23.toFixed(undefined));
console.log(1.23.toFixed(void 0));
console.log(1.23.toString());
console.log(1.23.toString(undefined));
console.log(1.23.toString(void 0));

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,18 @@
-console.log('1.23e+0');
-console.log('1.23e+0');
-console.log('1.23e+0');
-console.log('1.23e+0');
-console.log('1.23e+0');
-console.log('1.23e+0');
-console.log('1.23');
-console.log('1.23');
-console.log('1.23');
-console.log('1.23');
-console.log('1.23');
+console.log(1.23.toExponential());
+console.log(1.23.toExponential(void 0));
+console.log(1.23.toExponential(void 0));
+console.log(1.23.toExponential());
+console.log(1.23.toExponential(void 0));
+console.log(1.23.toExponential(void 0));
+console.log(1.23.toPrecision());
+console.log(1.23.toPrecision(void 0));
+console.log(1.23.toPrecision(void 0));
+console.log(1.23.toPrecision());
+console.log(1.23.toPrecision(void 0));
+console.log(1.23.toPrecision(void 0));
+console.log(1.23.toFixed());
+console.log(1.23.toFixed(void 0));
+console.log(1.23.toFixed(void 0));
 console.log('1.23');
-console.log('1');
-console.log('1');
-console.log('1');
-console.log('1.23');
-console.log('1.23');
-console.log('1.23');
+console.log(1.23.toString(void 0));
+console.log(1.23.toString(void 0));

```

## `terser/pure_getters/collapse_rhs_false`

- size: oxc 266 vs reference 0 (+266 bytes)

```js
console.log((42 .length = 'PASS', 'PASS'));
console.log(('foo'.length = 'PASS', 'PASS'));
console.log((false.length = 'PASS', 'PASS'));
console.log((function() {}.length = 'PASS', 'PASS'));
console.log(({ get length() {
	return 'FAIL';
} }.length = 'PASS', 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+console.log((42 .length = 'PASS', 'PASS'));
+console.log(('foo'.length = 'PASS', 'PASS'));
+console.log(((!1).length = 'PASS', 'PASS'));
+console.log((function() {}.length = 'PASS', 'PASS'));
+console.log(({ get length() {
+	return 'FAIL';
+} }.length = 'PASS', 'PASS'));

```

## `terser/pure_getters/collapse_rhs_strict`

- size: oxc 266 vs reference 0 (+266 bytes)

```js
console.log((42 .length = 'PASS', 'PASS'));
console.log(('foo'.length = 'PASS', 'PASS'));
console.log((false.length = 'PASS', 'PASS'));
console.log((function() {}.length = 'PASS', 'PASS'));
console.log(({ get length() {
	return 'FAIL';
} }.length = 'PASS', 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+console.log((42 .length = 'PASS', 'PASS'));
+console.log(('foo'.length = 'PASS', 'PASS'));
+console.log(((!1).length = 'PASS', 'PASS'));
+console.log((function() {}.length = 'PASS', 'PASS'));
+console.log(({ get length() {
+	return 'FAIL';
+} }.length = 'PASS', 'PASS'));

```

## `terser/pure_getters/collapse_rhs_true`

- size: oxc 266 vs reference 0 (+266 bytes)

```js
console.log((42 .length = 'PASS', 'PASS'));
console.log(('foo'.length = 'PASS', 'PASS'));
console.log((false.length = 'PASS', 'PASS'));
console.log((function() {}.length = 'PASS', 'PASS'));
console.log(({ get length() {
	return 'FAIL';
} }.length = 'PASS', 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+console.log((42 .length = 'PASS', 'PASS'));
+console.log(('foo'.length = 'PASS', 'PASS'));
+console.log(((!1).length = 'PASS', 'PASS'));
+console.log((function() {}.length = 'PASS', 'PASS'));
+console.log(({ get length() {
+	return 'FAIL';
+} }.length = 'PASS', 'PASS'));

```

## `terser/sequences/call`

- size: oxc 273 vs reference 0 (+273 bytes)

```js
var a = (function() {
	return this;
})();
function b() {
	console.log('foo');
}
b.c = function() {
	console.log(this === b ? 'bar' : 'baz');
};
(a, b)();
(a, b.c)();
(a, function() {
	console.log(this === a);
})();
new (a, b)();
new (a, b.c)();
new (a, function() {
	console.log(this === a);
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+var a = (function() {
+	return this;
+})();
+function b() {
+	console.log('foo');
+}
+b.c = function() {
+	console.log(this === b ? 'bar' : 'baz');
+}, b(), (0, b.c)(), function() {
+	console.log(this === a);
+}(), new b(), new b.c(), new function() {
+	console.log(this === a);
+}();

```

## `terser/inline/inline_into_scope_conflict_enclosed_2`

- size: oxc 282 vs reference 0 (+282 bytes)

```js
global.same_name = () => console.log('PASS');
function $(same_name) {
	console.log(same_name === undefined ? 'PASS' : 'FAIL');
	indirection_1();
}
function indirection_1() {
	return indirection_2();
}
function indirection_2() {
	for (const x of [1]) {
		same_name();
		return;
	}
}
$();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,15 @@
+global.same_name = () => console.log('PASS');
+function $(same_name) {
+	console.log(same_name === void 0 ? 'PASS' : 'FAIL');
+	indirection_1();
+}
+function indirection_1() {
+	return indirection_2();
+}
+function indirection_2() {
+	for (let x of [1]) {
+		same_name();
+		return;
+	}
+}
+$();

```

## `terser/issue_973/this_binding_sequences`

- size: oxc 288 vs reference 0 (+288 bytes)

```js
console.log(typeof (function() {
	return eval('this');
})());
console.log(typeof (function() {
	'use strict';
	return eval('this');
})());
console.log(typeof (function() {
	return (0, eval)('this');
})());
console.log(typeof (function() {
	'use strict';
	return (0, eval)('this');
})());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,11 @@
+console.log(typeof (function() {
+	return eval('this');
+})()), console.log(typeof (function() {
+	'use strict';
+	return eval('this');
+})()), console.log(typeof (function() {
+	return (0, eval)('this');
+})()), console.log(typeof (function() {
+	'use strict';
+	return (0, eval)('this');
+})());

```

## `terser/unicode/issue_3271`

- size: oxc 295 vs reference 0 (+295 bytes)

```js
function string2buf(str) {
	var i = 0, buf = new Array(2), c = str.charCodeAt(0);
	if (c < 2048) {
		buf[i++] = 192 | c >>> 6;
		buf[i++] = 128 | c & 63;
	} else {
		buf[i++] = 224 | c >>> 12;
		buf[i++] = 128 | c >>> 6 & 63;
		buf[i++] = 128 | c & 63;
	}
	return buf;
}
console.log(string2buf('é'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+function string2buf(str) {
+	var i = 0, buf = [, ,], c = str.charCodeAt(0);
+	if (c < 2048) {
+		buf[i++] = 192 | c >>> 6;
+		buf[i++] = 128 | c & 63;
+	} else {
+		buf[i++] = 224 | c >>> 12;
+		buf[i++] = 128 | c >>> 6 & 63;
+		buf[i++] = 128 | c & 63;
+	}
+	return buf;
+}
+console.log(string2buf('é'));

```

## `terser/reduce_vars/issue_639`

- size: oxc 317 vs reference 0 (+317 bytes)

```js
const path = id({ extname: (name) => {
	console.log('PASS:' + name);
} });
global.getExtFn = function getExtFn() {
	return function(path) {
		return getExt(path);
	};
};
function getExt(name) {
	let ext;
	if (!ext) {
		ext = getExtInner(name);
	}
	return ext;
}
function getExtInner(name) {
	return path.extname(name);
}
getExtFn()('name');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,17 @@
+const path = id({ extname: (name) => {
+	console.log('PASS:' + name);
+} });
+global.getExtFn = function() {
+	return function(path) {
+		return getExt(path);
+	};
+};
+function getExt(name) {
+	let ext;
+	ext ||= getExtInner(name);
+	return ext;
+}
+function getExtInner(name) {
+	return path.extname(name);
+}
+getExtFn()('name');

```

## `terser/collapse_vars/issue_2437_1`

- size: oxc 337 vs reference 0 (+337 bytes)

```js
function XMLHttpRequest() {
	this.onreadystatechange = 'PASS';
}
global.xhrDesc = {};
function foo() {
	return bar();
}
function bar() {
	if (xhrDesc) {
		var req = new XMLHttpRequest();
		var result = req.onreadystatechange;
		Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {});
		return result;
	}
}
console.log(foo());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,14 @@
+function XMLHttpRequest() {
+	this.onreadystatechange = 'PASS';
+}
+global.xhrDesc = {};
+function foo() {
+	return bar();
+}
+function bar() {
+	if (xhrDesc) {
+		var result = new XMLHttpRequest().onreadystatechange;
+		return Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {}), result;
+	}
+}
+console.log(foo());

```

## `terser/issue_1261/pure_function_calls_toplevel`

- size: oxc 374 vs reference 29 (+345 bytes)

```js
(function() {
	console.log('iife0');
})();
var iife1 = (function() {
	console.log('iife1');
	function iife1() {}
	return iife1;
})();
(function() {
	var iife2 = (function() {
		console.log('iife2');
		function iife2() {}
		return iife2;
	})();
})();
var MyClass = (function() {
	function MyClass() {}
	MyClass.prototype.method = function() {};
	return MyClass;
})();
bar(), baz(), quux();
a.b(), c.d.e(), f.g();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,22 @@
-baz(), quux();
-a.b(), f.g();
+(function() {
+	console.log('iife0');
+})();
+(function() {
+	console.log('iife1');
+	function iife1() {}
+	return iife1;
+})();
+(function() {
+	(function() {
+		console.log('iife2');
+		function iife2() {}
+		return iife2;
+	})();
+})();
+(function() {
+	function MyClass() {}
+	MyClass.prototype.method = function() {};
+	return MyClass;
+})();
+bar(), baz(), quux();
+a.b(), c.d.e(), f.g();

```

## `terser/block_scope/issue_241`

- size: oxc 361 vs reference 0 (+361 bytes)

```js
var a = {};
(function(global) {
	function fail(o) {
		var result = {};
		function inner() {
			return outer({
				one: o.one,
				two: o.two
			});
		}
		result.inner = function() {
			return inner();
		};
		return result;
	}
	function outer(o) {
		var ret;
		if (o) {
			ret = o.one;
		} else {
			ret = o.two;
		}
		return ret;
	}
	global.fail = fail;
})(a);
var b = a.fail({ one: 'PASS' });
console.log(b.inner());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,21 @@
+var a = {};
+(function(global) {
+	function fail(o) {
+		var result = {};
+		function inner() {
+			return outer({
+				one: o.one,
+				two: o.two
+			});
+		}
+		return result.inner = function() {
+			return inner();
+		}, result;
+	}
+	function outer(o) {
+		return o ? o.one : o.two;
+	}
+	global.fail = fail;
+})(a);
+var b = a.fail({ one: 'PASS' });
+console.log(b.inner());

```

## `terser/arrays/constant_join`

- size: oxc 976 vs reference 581 (+395 bytes)

```js
var a = [
	'foo',
	'bar',
	'baz'
].join('');
var a1 = [
	'foo',
	'bar',
	'baz'
].join();
var a2 = [
	'foo',
	'bar',
	'baz'
].join(null);
var a3 = [
	'foo',
	'bar',
	'baz'
].join(void 0);
var a4 = [
	'foo',
	,
	'baz'
].join();
var a5 = [
	'foo',
	null,
	'baz'
].join();
var a6 = [
	'foo',
	void 0,
	'baz'
].join();
var b = [
	'foo',
	1,
	2,
	3,
	'bar'
].join('');
var c = [
	boo(),
	'foo',
	1,
	2,
	3,
	'bar',
	bar()
].join('');
var c1 = [
	boo(),
	bar(),
	'foo',
	1,
	2,
	3,
	'bar',
	bar()
].join('');
var c2 = [
	1,
	2,
	'foo',
	'bar',
	baz()
].join('');
var c3 = [
	boo() + bar() + 'foo',
	1,
	2,
	3,
	'bar',
	bar() + 'foo'
].join('');
var c4 = [
	1,
	2,
	null,
	undefined,
	'foo',
	'bar',
	baz()
].join('');
var c5 = [
	boo() + bar() + 'foo',
	1,
	2,
	3,
	'bar',
	bar() + 'foo'
].join();
var c6 = [
	1,
	2,
	null,
	undefined,
	'foo',
	'bar',
	baz()
].join();
var d = [
	'foo',
	1 + 2 + 'bar',
	'baz'
].join('-');
var e = [].join(foo + bar);
var f = [].join('');
var g = [].join('foo');

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,88 @@
-var a = 'foobarbaz';
-var a1 = 'foo,bar,baz';
-var a2 = 'foonullbarnullbaz';
-var a3 = 'foo,bar,baz';
-var a4 = 'foo,,baz';
-var a5 = 'foo,,baz';
-var a6 = 'foo,,baz';
-var b = 'foo123bar';
-var c = boo() + 'foo123bar' + bar();
-var c1 = '' + boo() + bar() + 'foo123bar' + bar();
-var c2 = '12foobar' + baz();
-var c3 = boo() + bar() + 'foo123bar' + bar() + 'foo';
-var c4 = '12foobar' + baz();
+var a = [
+	'foo',
+	'bar',
+	'baz'
+].join('');
+var a1 = [
+	'foo',
+	'bar',
+	'baz'
+].join();
+var a2 = [
+	'foo',
+	'bar',
+	'baz'
+].join(null);
+var a3 = [
+	'foo',
+	'bar',
+	'baz'
+].join(void 0);
+var a4 = [
+	'foo',
+	,
+	'baz'
+].join();
+var a5 = [
+	'foo',
+	null,
+	'baz'
+].join();
+var a6 = [
+	'foo',
+	void 0,
+	'baz'
+].join();
+var b = [
+	'foo',
+	1,
+	2,
+	3,
+	'bar'
+].join('');
+var c = [
+	boo(),
+	'foo',
+	1,
+	2,
+	3,
+	'bar',
+	bar()
+].join('');
+var c1 = [
+	boo(),
+	bar(),
+	'foo',
+	1,
+	2,
+	3,
+	'bar',
+	bar()
+].join('');
+var c2 = [
+	1,
+	2,
+	'foo',
+	'bar',
+	baz()
+].join('');
+var c3 = [
+	boo() + bar() + 'foo',
+	1,
+	2,
+	3,
+	'bar',
+	bar() + 'foo'
+].join('');
+var c4 = [
+	1,
+	2,
+	null,
+	void 0,
+	'foo',
+	'bar',
+	baz()
+].join('');
 var c5 = [
 	boo() + bar() + 'foo',
 	1,
@@ -19,8 +91,20 @@
 	'bar',
 	bar() + 'foo'
 ].join();
-var c6 = ['1,2,,,foo,bar', baz()].join();
-var d = 'foo-3bar-baz';
+var c6 = [
+	1,
+	2,
+	null,
+	void 0,
+	'foo',
+	'bar',
+	baz()
+].join();
+var d = [
+	'foo',
+	'3bar',
+	'baz'
+].join('-');
 var e = [].join(foo + bar);
-var f = '';
-var g = '';
+var f = [].join('');

... [truncated]
```

## `terser/collapse_vars/issue_2437_2`

- size: oxc 451 vs reference 0 (+451 bytes)

```js
function XMLHttpRequest() {
	this.onreadystatechange = 'PASS';
}
global.SYMBOL_FAKE_ONREADYSTATECHANGE_1 = Symbol();
global.xhrDesc = null;
function foo() {
	return bar();
}
function bar() {
	if (!xhrDesc) {
		var req = new XMLHttpRequest();
		var detectFunc = function() {};
		req.onreadystatechange = detectFunc;
		var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
		req.onreadystatechange = null;
		return result;
	}
}
console.log(foo());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,16 @@
+function XMLHttpRequest() {
+	this.onreadystatechange = 'PASS';
+}
+global.SYMBOL_FAKE_ONREADYSTATECHANGE_1 = Symbol(), global.xhrDesc = null;
+function foo() {
+	return bar();
+}
+function bar() {
+	if (!xhrDesc) {
+		var req = new XMLHttpRequest(), detectFunc = function() {};
+		req.onreadystatechange = detectFunc;
+		var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
+		return req.onreadystatechange = null, result;
+	}
+}
+console.log(foo());

```

