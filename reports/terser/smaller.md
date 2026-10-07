# terser / smaller — Output shorter than expected (possible over-optimization / bug)

Fixtures: 426

[← terser](README.md) · [← all families](../README.md)

## `terser/arguments/arguments_and_destructuring_1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 64 vs reference 65 (no whitespaces: -1, formatted: -1)

```js
(function({ d }) {
	console.log(a = 'foo', arguments[0].d);
})({ d: 'Bar' });

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function({ d }) {
+(function({ d }) {
 	console.log(a = 'foo', arguments[0].d);
 })({ d: 'Bar' });

```

## `terser/arguments/duplicate_parameter_with_arguments`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 64 vs reference 65 (no whitespaces: -1, formatted: -1)

```js
(function(a, a) {
	console.log(a = 'foo', arguments[0]);
})('baz', 'Bar');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function(a, a) {
+(function(a, a) {
 	console.log(a = 'foo', arguments[0]);
 })('baz', 'Bar');

```

## `terser/collapse_vars/cascade_switch`

- tags: `join vars`
- size: oxc 50 vs reference 51 (no whitespaces: -1, formatted: -1)

```js
function f(a, b) {
	switch (a = x(), a) {
		case a = x(), b(a): break;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b) {
-	switch (a = x()) {
-		case b(a = x()): break;
+	switch (a = x(), a) {
+		case a = x(), b(a):
 	}
 }

```

## `terser/collapse_vars/for_init`

- tags: `join vars`, `remove unused`
- size: oxc 34 vs reference 35 (no whitespaces: -1, formatted: -1)

```js
function f(x, y) {
	var a = x;
	var b = y;
	for (a; b;);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(x, y) {
 	var b = y;
-	for (x; b;);
+	for (; b;);
 }

```

## `terser/collapse_vars/issue_2313_2`

- tags: `join vars`
- size: oxc 54 vs reference 55 (no whitespaces: -1, formatted: -1)

```js
var c = 0;
!(function a() {
	a && c++;
	var a = 0;
	a && c++;
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var c = 0;
-!function a() {
+(function() {
 	a && c++;
 	var a = 0;
-}();
+})();
 console.log(c);

```

## `terser/collapse_vars/issue_2954_2`

- tags: `join vars`
- size: oxc 118 vs reference 119 (no whitespaces: -1, formatted: +1)

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

- tags: `join vars`
- size: oxc 64 vs reference 65 (no whitespaces: -1, formatted: +1)

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

## `terser/destructuring/issue_2140`

- tags: `remove unused`
- size: oxc 54 vs reference 55 (no whitespaces: -1, formatted: -1)

```js
!(function() {
	var t = {};
	console.log(([t.a] = [42])[0]);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!(function() {
+(function() {
 	var t = {};
 	console.log(([t.a] = [42])[0]);
 })();

```

## `terser/drop_unused/issue_2660_1`

- tags: `join vars`, `remove unused`
- size: oxc 61 vs reference 62 (no whitespaces: -1, formatted: +0)

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

## `terser/drop_unused/issue_2660_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 65 vs reference 66 (no whitespaces: -1, formatted: +1)

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

## `terser/evaluate/unsafe_constant`

- size: oxc 45 vs reference 46 (no whitespaces: -1, formatted: -1)

```js
console.log(true.a, false.a, null.a, undefined.a);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(true.a, false.a, null.a, (void 0).a);
+console.log((!0).a, (!1).a, null.a, (void 0).a);

```

## `terser/functions/recursive_inline_2`

- tags: `join vars`, `remove unused`
- size: oxc 52 vs reference 53 (no whitespaces: -1, formatted: +0)

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

## `terser/if_return/issue_1317`

- size: oxc 76 vs reference 77 (no whitespaces: -1, formatted: -1)

```js
!(function(a) {
	if (a) return;
	let b = 1;
	function g() {
		return b;
	}
	console.log(g());
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-!(function(a) {
+(function(a) {
 	if (a) return;
 	let b = 1;
 	function g() {
-		return b;
+		return 1;
 	}
 	console.log(g());
 })();

```

## `terser/if_return/issue_1317_strict`

- size: oxc 89 vs reference 90 (no whitespaces: -1, formatted: -1)

```js
'use strict';
!(function(a) {
	if (a) return;
	let b = 1;
	function g() {
		return b;
	}
	console.log(g());
})();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 'use strict';
-!(function(a) {
+(function(a) {
 	if (a) return;
 	let b = 1;
 	function g() {
-		return b;
+		return 1;
 	}
 	console.log(g());
 })();

```

## `terser/issue_1833/iife_while`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 52 (no whitespaces: -1, formatted: +2)

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

## `terser/labels/labels_7`

- tags: `sequences`
- size: oxc 18 vs reference 19 (no whitespaces: -1, formatted: -5)

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
@@ -1,4 +1 @@
-while (foo) {
-	x();
-	y();
-}
+for (; foo;) x(), y();

```

## `terser/loops/issue_186_beautify_braces`

- size: oxc 63 vs reference 64 (no whitespaces: -1, formatted: -13)

```js
var x = 3;
if (foo()) {
	do {
		do {
			alert(x);
		} while (--x);
	} while (x);
} else {
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do
-			alert(x);
-		while (--x);
-	} while (x);
-} else bar();
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `terser/loops/issue_186_beautify_braces_ie8`

- size: oxc 63 vs reference 64 (no whitespaces: -1, formatted: -13)

```js
var x = 3;
if (foo()) {
	do {
		do {
			alert(x);
		} while (--x);
	} while (x);
} else {
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do
-			alert(x);
-		while (--x);
-	} while (x);
-} else bar();
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `terser/loops/issue_186_beautify_ie8`

- size: oxc 63 vs reference 64 (no whitespaces: -1, formatted: -13)

```js
var x = 3;
if (foo()) {
	do {
		do {
			alert(x);
		} while (--x);
	} while (x);
} else bar();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do
-			alert(x);
-		while (--x);
-	} while (x);
-} else bar();
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `terser/loops/issue_186_braces`

- size: oxc 63 vs reference 64 (no whitespaces: -1, formatted: -13)

```js
var x = 3;
if (foo()) {
	do {
		do {
			alert(x);
		} while (--x);
	} while (x);
} else {
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do
-			alert(x);
-		while (--x);
-	} while (x);
-} else bar();
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `terser/loops/issue_186_braces_ie8`

- size: oxc 63 vs reference 64 (no whitespaces: -1, formatted: -13)

```js
var x = 3;
if (foo()) {
	do {
		do {
			alert(x);
		} while (--x);
	} while (x);
} else {
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do
-			alert(x);
-		while (--x);
-	} while (x);
-} else bar();
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `terser/loops/issue_186_ie8`

- size: oxc 63 vs reference 64 (no whitespaces: -1, formatted: -13)

```js
var x = 3;
if (foo()) {
	do {
		do {
			alert(x);
		} while (--x);
	} while (x);
} else bar();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do
-			alert(x);
-		while (--x);
-	} while (x);
-} else bar();
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `terser/negate_iife/issue_1254_negate_iife_nested`

- size: oxc 63 vs reference 64 (no whitespaces: -1, formatted: -1)

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
@@ -1,4 +1,4 @@
-!(function() {
+(function() {
 	return function() {
 		console.log('test');
 	};

```

## `terser/negate_iife/issue_1254_negate_iife_true`

- size: oxc 57 vs reference 58 (no whitespaces: -1, formatted: -1)

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
@@ -1,4 +1,4 @@
-!(function() {
+(function() {
 	return function() {
 		console.log('test');
 	};

```

## `terser/negate_iife/negate_iife_1`

- size: oxc 24 vs reference 25 (no whitespaces: -1, formatted: -1)

```js
(function() {
	stuff();
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function() {
+(function() {
 	stuff();
 })();

```

## `terser/new/dot_parenthesis_2`

- size: oxc 49 vs reference 50 (no whitespaces: -1, formatted: -2)

```js
console.log(typeof new function() {
	Math.random();
}.constructor());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(typeof new (function() {}).constructor());
+console.log(typeof new function() {}.constructor());

```

## `terser/new/new_statements_2`

- size: oxc 137 vs reference 138 (no whitespaces: -1, formatted: +0)

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

## `terser/properties/join_object_assignments_if`

- tags: `join vars`
- size: oxc 63 vs reference 64 (no whitespaces: -1, formatted: -2)

```js
console.log((function() {
	var o = {};
	if (o.a = 'PASS') return o.a;
})());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log((function() {
-	var o = { a: 'PASS' };
-	if (o.a) return o.a;
+	var o = {};
+	if (o.a = 'PASS') return o.a;
 })());

```

## `terser/pure_funcs/unary`

- tags: `pure functions`
- size: oxc 131 vs reference 132 (no whitespaces: -1, formatted: +0)

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

## `terser/reduce_vars/escape_await`

- tags: `join vars`, `remove unused`
- size: oxc 187 vs reference 188 (no whitespaces: -1, formatted: -1)

```js
function main() {
	var thing;
	baz().then((x) => {
		thing = x;
	});
	baz().then((x) => {
		if (thing !== (thing = x)) console.log('FAIL');
		else console.log('PASS');
	});
}
function foo() {}
async function baz() {
	return await foo;
}
main();

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
-function foo() {}
-async function baz() {
-	return await foo;
-}
-(function() {
+function main() {
 	var thing;
 	baz().then((x) => {
 		thing = x;
 	});
 	baz().then((x) => {
-		if (thing !== (thing = x)) console.log('FAIL');
-		else console.log('PASS');
+		thing === (thing = x) ? console.log('PASS') : console.log('FAIL');
 	});
-})();
+}
+function foo() {}
+async function baz() {
+	return await foo;
+}
+main();

```

## `terser/reduce_vars/escape_conditional`

- tags: `join vars`, `remove unused`
- size: oxc 166 vs reference 167 (no whitespaces: -1, formatted: +0)

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

- tags: `join vars`, `remove unused`
- size: oxc 169 vs reference 170 (no whitespaces: -1, formatted: +0)

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

## `terser/reduce_vars/escaped_prop_3`

- tags: `join vars`, `remove unused`
- size: oxc 94 vs reference 95 (no whitespaces: -1, formatted: -3)

```js
var a;
function f(b) {
	if (a) console.log(a === b.c);
	a = b.c;
}
function g() {}
function h() {
	f({ c: g });
}
h();
h();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 var a;
+function f(b) {
+	a && console.log(a === b.c);
+	a = b.c;
+}
 function g() {}
 function h() {
-	(function(b) {
-		if (a) console.log(a === b.c);
-		a = b.c;
-	})({ c: g });
+	f({ c: g });
 }
 h();
 h();

```

## `terser/reduce_vars/issue_2869`

- tags: `join vars`
- size: oxc 77 vs reference 78 (no whitespaces: -1, formatted: -1)

```js
var c = 'FAIL';
(function f(a) {
	var a;
	if (!f) a = 0;
	if (a) c = 'PASS';
})(1);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var c = 'FAIL';
 (function f(a) {
 	var a;
-	if (!f) a = 0;
-	if (a) c = 'PASS';
+	f || (a = 0);
+	a && (c = 'PASS');
 })(1);
 console.log(c);

```

## `terser/reduce_vars/issue_379`

- size: oxc 56 vs reference 57 (no whitespaces: -1, formatted: -1)

```js
global.a = ((...args) => (a1, a2) => a1.foo === a2.foo)(...args);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-global.a = ((...args1) => (a1, a2) => a1.foo === a2.foo)(...args);
+global.a = ((...args) => (a1, a2) => a1.foo === a2.foo)(...args);

```

## `terser/reduce_vars/lvalues_def_2`

- tags: `join vars`, `remove unused`
- size: oxc 38 vs reference 39 (no whitespaces: -1, formatted: -1)

```js
var b = 1;
var a = b += 1, b = NaN;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var b;
-var a = b = 2, b = 0 / 0;
+var b = 1, a = b += 1, b = NaN;
 console.log(a, b);

```

## `terser/reduce_vars/recursive_inlining_1`

- tags: `join vars`, `remove unused`
- size: oxc 36 vs reference 37 (no whitespaces: -1, formatted: -1)

```js
!(function() {
	function foo() {
		bar();
	}
	function bar() {
		foo();
	}
	console.log('PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function() {
+(function() {
 	console.log('PASS');
 })();

```

## `terser/reduce_vars/recursive_inlining_2`

- tags: `join vars`, `remove unused`
- size: oxc 36 vs reference 37 (no whitespaces: -1, formatted: -1)

```js
!(function() {
	function foo() {
		qux();
	}
	function bar() {
		foo();
	}
	function qux() {
		bar();
	}
	console.log('PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function() {
+(function() {
 	console.log('PASS');
 })();

```

## `terser/reduce_vars/var_assign_4`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 37 vs reference 38 (no whitespaces: -1, formatted: -1)

```js
!(function a() {
	a = 2;
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function a() {
+(function a() {
 	a = 2, console.log(a);
 })();

```

## `terser/template_string/issue_1856`

- size: oxc 51 vs reference 52 (no whitespaces: -1, formatted: +0)

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

- size: oxc 51 vs reference 52 (no whitespaces: -1, formatted: +0)

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

## `terser/template_string/template_ending_with_newline`

- size: oxc 52 vs reference 53 (no whitespaces: -1, formatted: +0)

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

- size: oxc 52 vs reference 53 (no whitespaces: -1, formatted: +0)

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

## `terser/template_string/template_with_newline`

- size: oxc 56 vs reference 57 (no whitespaces: -1, formatted: +0)

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

## `terser/arguments/arguments_in_arrow_func_1`

- size: oxc 219 vs reference 221 (no whitespaces: -2, formatted: -4)

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
-(function(a, b, argument_2, argument_3) {
-	console.log(a, a, b, argument_3, b, argument_2);
-})('bar', 42, false);
 (function(a, b) {
+	console.log(arguments[0], a, arguments[1], arguments[3], b, arguments[2]);
+})('bar', 42, !1);
+(function(a, b) {
 	(() => {
 		console.log(arguments[0], a, arguments[1], arguments[3], b, arguments[2]);
 	})(10, 20, 30, 40);
-})('bar', 42, false);
+})('bar', 42, !1);

```

## `terser/asm/asm_function_expression`

- size: oxc 72 vs reference 74 (no whitespaces: -2, formatted: -9)

```js
0;
var a = function() {
	'use asm';
	0;
};
function f() {
	0;
	return function() {
		'use asm';
		0;
	};
	0;
}
0;

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,8 @@
 var a = function() {
 	'use asm';
-	0;
 };
 function f() {
 	return function() {
 		'use asm';
-		0;
 	};
 }

```

## `terser/asm/asm_nested_functions`

- size: oxc 76 vs reference 78 (no whitespaces: -2, formatted: -9)

```js
0;
function a() {
	'use asm';
	0;
}
0;
function b() {
	0;
	function c() {
		'use asm';
		0;
	}
	0;
	function d() {
		0;
	}
	0;
}
0;

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,9 @@
 function a() {
 	'use asm';
-	0;
 }
 function b() {
 	function c() {
 		'use asm';
-		0;
 	}
 	function d() {}
 }

```

## `terser/async/for_await_of`

- size: oxc 105 vs reference 107 (no whitespaces: -2, formatted: -2)

```js
async function f(x) {
	for await (a of x) {}
	for await (var b of x) {}
	for await (let c of x) {}
	for await (const d of x) {}
}

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 	for await (a of x);
 	for await (var b of x);
 	for await (let c of x);
-	for await (const d of x);
+	for await (let d of x);
 }

```

## `terser/block_scope/do_not_remove_anon_blocks_if_they_have_decls`

- size: oxc 61 vs reference 63 (no whitespaces: -2, formatted: -2)

```js
function x() {
	{
		let x;
	}
	{
		var x;
	}
	{
		const y = 1;
		class Zee {}
	}
}
{
	let y;
}
{
	var y;
}

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 	}
 	var x;
 	{
-		const y = 1;
+		let y = 1;
 		class Zee {}
 	}
 }

```

## `terser/collapse_vars/collapse_rhs_lhs_2`

- tags: `join vars`
- size: oxc 56 vs reference 58 (no whitespaces: -2, formatted: +0)

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
+	f = b;
+	f[b] = 0;
 })();
 console.log('PASS');

```

## `terser/collapse_vars/collapse_rhs_loop`

- tags: `join vars`
- size: oxc 107 vs reference 109 (no whitespaces: -2, formatted: -3)

```js
var s;
s = '<tpl>PASS</tpl>';
for (var m, r = /<tpl>(.*)<\/tpl>/; m = s.match(r);) s = s.replace(m[0], m[1]);
console.log(s);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var s;
-s = '<tpl>PASS</tpl>';
+var s = '<tpl>PASS</tpl>';
 for (var m, r = /<tpl>(.*)<\/tpl>/; m = s.match(r);) s = s.replace(m[0], m[1]);
 console.log(s);

```

## `terser/collapse_vars/collapse_vars_do_while_drop_assign`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 265 vs reference 267 (no whitespaces: -2, formatted: -10)

```js
function f1(y) {
	var c = 9;
	do {} while (c === 77);
}
function f2(y) {
	var c = 5 - y;
	do {} while (c);
}
function f3(y) {
	function fn(n) {
		console.log(n);
	}
	var a = 2, x = 7;
	do {
		fn(a = x);
		break;
	} while (y);
}
function f4(y) {
	var a = y / 4;
	do {
		return a;
	} while (y);
}
function f5(y) {
	function p(x) {
		console.log(x);
	}
	do {
		var a = y - 3;
		p(a);
	} while (--y);
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,12 @@
 function f1(y) {
 	var c = 9;
-	do {} while (77 === c);
+	do;
+	while (c === 77);
 }
 function f2(y) {
 	var c = 5 - y;
-	do {} while (c);
+	do;
+	while (c);
 }
 function f3(y) {
 	function fn(n) {
@@ -18,15 +20,15 @@
 }
 function f4(y) {
 	var a = y / 4;
-	do {
+	do
 		return a;
-	} while (y);
+	while (y);
 }
 function f5(y) {
 	function p(x) {
 		console.log(x);
 	}
-	do {
+	do
 		p(y - 3);
-	} while (--y);
+	while (--y);
 }

```

## `terser/collapse_vars/compound_assignment`

- tags: `join vars`
- size: oxc 30 vs reference 32 (no whitespaces: -2, formatted: -3)

```js
var a;
a = 1;
a += a + 2;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a;
-a = 1;
+var a = 1;
 a += a + 2;
 console.log(a);

```

## `terser/collapse_vars/double_def_1`

- tags: `join vars`, `remove unused`
- size: oxc 19 vs reference 21 (no whitespaces: -2, formatted: -1)

```js
var a = x, a = a && y;
a();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a;
-(a = (a = x) && y)();
+var a = x, a = a && y;
+a();

```

## `terser/collapse_vars/inner_lvalues`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 69 (no whitespaces: -2, formatted: -1)

```js
var a, b = 10;
var a = (--b || a || 3).toString(), c = --b + -a;
console.log(null, a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var b = 10;
-var a = (--b || a || 3).toString(), c = --b + -a;
+var a, b = 10, a = (--b || a || 3).toString(), c = --b + -a;
 console.log(null, a, b);

```

## `terser/collapse_vars/issue_1605_2`

- tags: `join vars`, `remove unused`
- size: oxc 40 vs reference 42 (no whitespaces: -2, formatted: +1)

```js
function foo(x) {
	var y = x;
	return y;
}
var o = new Object();
o.p = 1;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function foo(x) {
 	return x;
 }
-new Object().p = 1;
+var o = {};
+o.p = 1;

```

## `terser/collapse_vars/issue_27`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 61 (no whitespaces: -2, formatted: -2)

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
-(function(jQuery1) {
-	jQuery1('body').addClass('foo');
+(function(jQuery) {
+	jQuery('body').addClass('foo');
 })(jQuery);

```

## `terser/collapse_vars/issue_2878`

- tags: `join vars`, `sequences`
- size: oxc 86 vs reference 88 (no whitespaces: -2, formatted: -2)

```js
var c = 0;
(function(a, b) {
	function f2() {
		if (a) c++;
	}
	b = f2();
	a = 1;
	b && b.b;
	f2();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var c = 0;
 (function(a, b) {
 	function f2() {
-		if (a) c++;
+		a && c++;
 	}
 	b = f2(), a = 1, b && b.b, f2();
 })(), console.log(c);

```

## `terser/conditionals/cond_8`

- tags: `sequences`
- size: oxc 276 vs reference 278 (no whitespaces: -2, formatted: -1)

```js
var a;
a = condition ? true : false;
a = !condition ? true : false;
a = condition() ? true : false;
a = condition ? !0 : !1;
a = !condition ? !null : !2;
a = condition() ? !0 : !-3.5;
if (condition) {
	a = true;
} else {
	a = false;
}
if (condition) {
	a = !0;
} else {
	a = !1;
}
a = condition ? false : true;
a = !condition ? false : true;
a = condition() ? false : true;
a = condition ? !3 : !0;
a = !condition ? !2 : !0;
a = condition() ? !1 : !0;
if (condition) {
	a = false;
} else {
	a = true;
}
if (condition) {
	a = !1;
} else {
	a = !0;
}
a = condition ? 1 : false;
a = !condition ? true : 0;
a = condition ? 1 : 0;

```

```diff
--- reference
+++ oxc
@@ -1,20 +1,2 @@
-var a;
-a = !!condition;
-a = !condition;
-a = !!condition();
-a = !!condition;
-a = !condition;
-a = !!condition();
-a = !!condition;
-a = !!condition;
-a = !condition;
-a = !!condition;
-a = !condition();
-a = !condition;
-a = !!condition;
-a = !condition();
-a = !condition;
-a = !condition;
-a = !!condition && 1;
-a = !condition || 0;
-a = +!!condition;
+var a = !!condition;
+a = !condition, a = !!condition(), a = !!condition, a = !condition, a = !!condition(), a = !!condition, a = !!condition, a = !condition, a = !!condition, a = !condition(), a = !condition, a = !!condition, a = !condition(), a = !condition, a = !condition, a = condition ? 1 : !1, a = !condition || 0, a = +!!condition;

```

## `terser/conditionals/cond_8b`

- tags: `sequences`
- size: oxc 276 vs reference 278 (no whitespaces: -2, formatted: -1)

```js
var a;
a = condition ? true : false;
a = !condition ? true : false;
a = condition() ? true : false;
a = condition ? !0 : !1;
a = !condition ? !null : !2;
a = condition() ? !0 : !-3.5;
if (condition) {
	a = true;
} else {
	a = false;
}
if (condition) {
	a = !0;
} else {
	a = !1;
}
a = condition ? false : true;
a = !condition ? false : true;
a = condition() ? false : true;
a = condition ? !3 : !0;
a = !condition ? !2 : !0;
a = condition() ? !1 : !0;
if (condition) {
	a = false;
} else {
	a = true;
}
if (condition) {
	a = !1;
} else {
	a = !0;
}
a = condition ? 1 : false;
a = !condition ? true : 0;
a = condition ? 1 : 0;

```

```diff
--- reference
+++ oxc
@@ -1,20 +1,2 @@
-var a;
-a = !!condition;
-a = !condition;
-a = !!condition();
-a = !!condition;
-a = !condition;
-a = !!condition();
-a = !!condition;
-a = !!condition;
-a = !condition;
-a = !!condition;
-a = !condition();
-a = !condition;
-a = !!condition;
-a = !condition();
-a = !condition;
-a = !condition;
-a = !!condition && 1;
-a = !condition || 0;
-a = +!!condition;
+var a = !!condition;
+a = !condition, a = !!condition(), a = !!condition, a = !condition, a = !!condition(), a = !!condition, a = !!condition, a = !condition, a = !!condition, a = !condition(), a = !condition, a = !!condition, a = !condition(), a = !condition, a = !condition, a = condition ? 1 : !1, a = !condition || 0, a = +!!condition;

```

## `terser/conditionals/cond_8c`

- tags: `sequences`
- size: oxc 276 vs reference 278 (no whitespaces: -2, formatted: -1)

```js
var a;
a = condition ? true : false;
a = !condition ? true : false;
a = condition() ? true : false;
a = condition ? !0 : !1;
a = !condition ? !null : !2;
a = condition() ? !0 : !-3.5;
if (condition) {
	a = true;
} else {
	a = false;
}
if (condition) {
	a = !0;
} else {
	a = !1;
}
a = condition ? false : true;
a = !condition ? false : true;
a = condition() ? false : true;
a = condition ? !3 : !0;
a = !condition ? !2 : !0;
a = condition() ? !1 : !0;
if (condition) {
	a = false;
} else {
	a = true;
}
if (condition) {
	a = !1;
} else {
	a = !0;
}
a = condition ? 1 : false;
a = !condition ? true : 0;
a = condition ? 1 : 0;

```

```diff
--- reference
+++ oxc
@@ -1,20 +1,2 @@
-var a;
-a = !!condition;
-a = !condition;
-a = !!condition();
-a = !!condition;
-a = !condition;
-a = !!condition();
-a = !!condition;
-a = !!condition;
-a = !condition;
-a = !!condition;
-a = !condition();
-a = !condition;
-a = !!condition;
-a = !condition();
-a = !condition;
-a = !condition;
-a = !!condition && 1;
-a = !condition || 0;
-a = +!!condition;
+var a = !!condition;
+a = !condition, a = !!condition(), a = !!condition, a = !condition, a = !!condition(), a = !!condition, a = !!condition, a = !condition, a = !!condition, a = !condition(), a = !condition, a = !!condition, a = !condition(), a = !condition, a = !condition, a = condition ? 1 : !1, a = !condition || 0, a = +!!condition;

```

## `terser/conditionals/equality_conditionals_true`

- tags: `sequences`
- size: oxc 159 vs reference 161 (no whitespaces: -2, formatted: -6)

```js
function f(a, b, c) {
	console.log(a == (b ? a : a), a == (b ? a : c), a != (b ? a : a), a != (b ? a : c), a === (b ? a : a), a === (b ? a : c), a !== (b ? a : a), a !== (b ? a : c));
}
f(0, 0, 0);
f(0, true, 0);
f(1, 2, 3);
f(1, null, 3);
f(NaN);
f(NaN, 'foo');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a, b, c) {
 	console.log(a == a, a == (b ? a : c), a != a, a != (b ? a : c), a === a, a === (b ? a : c), a !== a, a !== (b ? a : c));
 }
-f(0, 0, 0), f(0, true, 0), f(1, 2, 3), f(1, null, 3), f(0 / 0), f(0 / 0, 'foo');
+f(0, 0, 0), f(0, !0, 0), f(1, 2, 3), f(1, null, 3), f(NaN), f(NaN, 'foo');

```

## `terser/const/issue_1396`

- tags: `join vars`, `remove unused`
- size: oxc 176 vs reference 178 (no whitespaces: -2, formatted: -2)

```js
function foo(a) {
	const VALUE = 1;
	console.log(2 | VALUE);
	console.log(VALUE + 1);
	console.log(VALUE);
	console.log(a & VALUE);
}
function bar() {
	const s = '01234567890123456789';
	console.log(s + s + s + s + s);
	const CONSTANT = 'abc';
	console.log(CONSTANT + CONSTANT + CONSTANT + CONSTANT + CONSTANT);
}

```

```diff
--- reference
+++ oxc
@@ -2,10 +2,10 @@
 	console.log(3);
 	console.log(2);
 	console.log(1);
-	console.log(1 & a);
+	console.log(a & 1);
 }
 function bar() {
-	const s = '01234567890123456789';
+	let s = '01234567890123456789';
 	console.log(s + s + s + s + s);
 	console.log('abcabcabcabcabc');
 }

```

## `terser/const/regexp_literal_not_const`

- tags: `join vars`, `remove unused`
- size: oxc 125 vs reference 127 (no whitespaces: -2, formatted: -1)

```js
(function() {
	var result;
	const s = 'acdabcdeabbb';
	const REGEXP_LITERAL = /ab*/g;
	while (result = REGEXP_LITERAL.exec(s)) {
		console.log(result[0]);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function() {
 	var result;
-	const REGEXP_LITERAL = /ab*/g;
-	while (result = REGEXP_LITERAL.exec('acdabcdeabbb')) console.log(result[0]);
+	let REGEXP_LITERAL = /ab*/g;
+	for (; result = REGEXP_LITERAL.exec('acdabcdeabbb');) console.log(result[0]);
 })();

```

## `terser/destructuring/destructuring_assign_of_numeric_key`

- tags: `remove unused`
- size: oxc 36 vs reference 38 (no whitespaces: -2, formatted: -2)

```js
let x;
({3: x} = { [1 + 2]: 42 });
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 let x;
-({3: x} = { [3]: 42 });
+({3: x} = { 3: 42 });
 console.log(x);

```

## `terser/destructuring/destructuring_decl_of_numeric_key`

- tags: `remove unused`
- size: oxc 31 vs reference 33 (no whitespaces: -2, formatted: -2)

```js
let { 3: x } = { [1 + 2]: 42 };
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-let { 3: x } = { [3]: 42 };
+let { 3: x } = { 3: 42 };
 console.log(x);

```

## `terser/destructuring/unused_destructuring_getter_side_effect_1`

- tags: `remove unused`
- size: oxc 137 vs reference 139 (no whitespaces: -2, formatted: -2)

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
-	const { a, b } = obj;
+	let { a, b } = obj;
 	console.log(b);
 }
 extract({

```

## `terser/functions/no_webkit`

- size: oxc 30 vs reference 32 (no whitespaces: -2, formatted: -2)

```js
console.log(function() {
	1 + 1;
}.a = 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((function() {}).a = 1);
+console.log(function() {}.a = 1);

```

## `terser/functions/webkit`

- size: oxc 30 vs reference 32 (no whitespaces: -2, formatted: -2)

```js
console.log(function() {
	1 + 1;
}.a = 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((function() {}).a = 1);
+console.log(function() {}.a = 1);

```

## `terser/issue_1447/else_with_empty_block`

- size: oxc 9 vs reference 11 (no whitespaces: -2, formatted: -2)

```js
if (x) yes();
else {}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if (x) yes();
+x && yes();

```

## `terser/issue_1447/else_with_empty_statement`

- size: oxc 9 vs reference 11 (no whitespaces: -2, formatted: -2)

```js
if (x) yes();
else;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if (x) yes();
+x && yes();

```

## `terser/issue_1639/issue_1639_1`

- tags: `join vars`, `sequences`
- size: oxc 69 vs reference 71 (no whitespaces: -2, formatted: -4)

```js
var a = 100, b = 10;
var L1 = 5;
while (--L1 > 0) {
	if (--b, false) {
		if (b) {
			var ignore = 0;
		}
	}
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-for (var a = 100, b = 10, L1 = 5; --L1 > 0;) if (--b, 0) var ignore = 0;
+for (var a = 100, b = 10, L1 = 5; --L1 > 0;) if (--b, 0) var ignore;
 console.log(a, b);

```

## `terser/issue_1673/side_effects_catch`

- tags: `join vars`, `remove unused`
- size: oxc 73 vs reference 75 (no whitespaces: -2, formatted: -1)

```js
function f() {
	function g() {
		try {
			throw 0;
		} catch (e) {
			console.log('PASS');
		}
	}
	g();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 function f() {
-	(function() {
+	function g() {
 		try {
 			throw 0;
-		} catch (e) {
+		} catch {
 			console.log('PASS');
 		}
-	})();
+	}
+	g();
 }
 f();

```

## `terser/issue_1673/side_effects_finally`

- tags: `join vars`, `remove unused`
- size: oxc 78 vs reference 80 (no whitespaces: -2, formatted: -1)

```js
function f() {
	function g() {
		try {
			x();
		} catch (e) {} finally {
			console.log('PASS');
		}
	}
	g();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 function f() {
-	(function() {
+	function g() {
 		try {
 			x();
-		} catch (e) {} finally {
+		} catch {} finally {
 			console.log('PASS');
 		}
-	})();
+	}
+	g();
 }
 f();

```

## `terser/issue_59/keep_continue`

- size: oxc 52 vs reference 54 (no whitespaces: -2, formatted: -1)

```js
while (a) {
	if (b) {
		switch (true) {
			case c(): d();
		}
		continue;
	}
	f();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-while (a) {
+for (; a;) {
 	if (b) {
-		switch (true) {
+		switch (!0) {
 			case c(): d();
 		}
 		continue;

```

## `terser/issue_597/NaN_and_Infinity_should_not_be_replaced_when_they_are_redefined`

- size: oxc 52 vs reference 54 (no whitespaces: -2, formatted: -4)

```js
var Infinity, NaN;
Infinity.toString();
NaN.toString();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var Infinity, NaN;
 Infinity.toString();
-(0 / 0).toString();
+NaN.toString();

```

## `terser/negate_iife/negate_iife_nested`

- tags: `sequences`
- size: oxc 101 vs reference 103 (no whitespaces: -2, formatted: -2)

```js
function Foo(f) {
	this.f = f;
}
new Foo(function() {
	(function(x) {
		(function(y) {
			console.log(y);
		})(x);
	})(7);
}).f();

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,8 @@
 	this.f = f;
 }
 new Foo(function() {
-	!(function(x) {
-		!(function(y) {
+	(function(x) {
+		(function(y) {
 			console.log(y);
 		})(x);
 	})(7);

```

## `terser/properties/join_object_assignments_return_1`

- tags: `join vars`
- size: oxc 58 vs reference 60 (no whitespaces: -2, formatted: -7)

```js
console.log((function() {
	var o = { p: 3 };
	return o.q = 'foo';
})());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,4 @@
 console.log((function() {
-	var o = {
-		p: 3,
-		q: 'foo'
-	};
-	return o.q;
+	var o = { p: 3 };
+	return o.q = 'foo';
 })());

```

## `terser/pure_funcs/conditional`

- tags: `pure functions`
- size: oxc 62 vs reference 64 (no whitespaces: -2, formatted: +3)

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

- tags: `remove unused`, `pure getters`, `1 iteration`
- size: oxc 222 vs reference 224 (no whitespaces: -2, formatted: +3)

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

## `terser/pure_getters/set_immutable_1`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 66 (no whitespaces: -2, formatted: +2)

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

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 79 (no whitespaces: -2, formatted: +2)

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

## `terser/reduce_vars/immutable`

- tags: `join vars`, `remove unused`
- size: oxc 31 vs reference 33 (no whitespaces: -2, formatted: +3)

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

## `terser/reduce_vars/issue_1595_4`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 69 (no whitespaces: -2, formatted: -2)

```js
(function iife(a, b, c) {
	console.log(a, b, c);
	if (a) iife(a - 1, b, c);
})(3, 4, 5);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function iife(a, b, c) {
 	console.log(a, b, c);
-	if (a) iife(a - 1, b, c);
+	a && iife(a - 1, b, c);
 })(3, 4, 5);

```

## `terser/reduce_vars/issue_1606`

- tags: `join vars`
- size: oxc 38 vs reference 40 (no whitespaces: -2, formatted: -3)

```js
function f() {
	var a;
	function g() {}
	var b = 2;
	x(b);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f() {
-	var a, b;
+	var a;
 	function g() {}
 	x(2);
 }

```

## `terser/reduce_vars/issue_3110_3`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 113 vs reference 115 (no whitespaces: -2, formatted: -2)

```js
(function() {
	function foo() {
		return isDev ? 'foo' : 'bar';
	}
	console.log(foo());
	var isDev = true;
	var obj = { foo };
	console.log(obj.foo());
})();

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 		return isDev ? 'foo' : 'bar';
 	}
 	console.log(foo());
-	var isDev = true;
+	var isDev = !0;
 	console.log({ foo }.foo());
 })();

```

## `terser/reduce_vars/issue_3110_shorthand_3`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 113 vs reference 115 (no whitespaces: -2, formatted: -2)

```js
(function() {
	function foo() {
		return isDev ? 'foo' : 'bar';
	}
	console.log(foo());
	var isDev = true;
	var obj = { foo };
	console.log(obj.foo());
})();

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 		return isDev ? 'foo' : 'bar';
 	}
 	console.log(foo());
-	var isDev = true;
+	var isDev = !0;
 	console.log({ foo }.foo());
 })();

```

## `terser/reduce_vars/recursive_inlining_4`

- tags: `join vars`, `remove unused`
- size: oxc 177 vs reference 179 (no whitespaces: -2, formatted: -3)

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
	bar(5);
})();

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,15 @@
-!(function() {
+(function() {
+	function foo(x) {
+		console.log('foo', x);
+		x && bar(x - 1);
+	}
 	function bar(x) {
 		console.log('bar', x);
-		if (x) qux(x - 1);
+		x && qux(x - 1);
 	}
 	function qux(x) {
 		console.log('qux', x);
-		if (x) (function(x) {
-			console.log('foo', x);
-			if (x) bar(x - 1);
-		})(x - 1);
+		x && foo(x - 1);
 	}
 	qux(4);
 	bar(5);

```

## `terser/reduce_vars/unary_delete`

- tags: `join vars`, `remove unused`
- size: oxc 61 vs reference 63 (no whitespaces: -2, formatted: -2)

```js
var b = 10;
function f() {
	var a;
	if (delete a) b--;
}
f();
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var b = 10;
 function f() {
 	var a;
-	if (delete a) b--;
+	delete a && b--;
 }
 f();
 console.log(b);

```

## `terser/sequences/func_def_1`

- tags: `join vars`
- size: oxc 45 vs reference 47 (no whitespaces: -2, formatted: -2)

```js
function f() {
	return f = 0, !!f;
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f() {
-	return f = 0, false;
+	return f = 0, !!f;
 }
 console.log(f());

```

## `terser/sequences/func_def_3`

- tags: `join vars`
- size: oxc 59 vs reference 61 (no whitespaces: -2, formatted: -2)

```js
function f() {
	function g() {}
	return g = 0, !!g;
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f() {
 	function g() {}
-	return g = 0, false;
+	return g = 0, !!g;
 }
 console.log(f());

```

## `terser/sequences/func_def_4`

- tags: `join vars`
- size: oxc 69 vs reference 71 (no whitespaces: -2, formatted: -2)

```js
function f() {
	function g() {
		return g = 0, !!g;
	}
	return g();
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f() {
 	function g() {
-		return g = 0, false;
+		return g = 0, !!g;
 	}
 	return g();
 }

```

## `terser/sequences/issue_27`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 59 vs reference 61 (no whitespaces: -2, formatted: -2)

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
-(function(jQuery1) {
-	jQuery1('body').addClass('foo');
+(function(jQuery) {
+	jQuery('body').addClass('foo');
 })(jQuery);

```

## `terser/sequences/lift_sequences_1`

- tags: `sequences`
- size: oxc 33 vs reference 35 (no whitespaces: -2, formatted: -3)

```js
var foo, x, y, bar;
foo = !(x(), y(), bar());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var foo, x, y, bar;
-x(), y(), foo = !bar();
+var foo = (x(), y(), !bar()), x, y, bar;

```

## `terser/sequences/lift_sequences_4`

- size: oxc 22 vs reference 24 (no whitespaces: -2, formatted: -3)

```js
var x, foo, bar, baz;
x = (foo, bar, baz);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var x, foo, bar, baz;
-x = baz;
+var x = baz, foo, bar, baz;

```

## `terser/switch/drop_case`

- size: oxc 19 vs reference 21 (no whitespaces: -2, formatted: -2)

```js
switch (foo) {
	case 'bar':
		baz();
		break;
	case 'moo': break;
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if ('bar' === foo) baz();
+foo === 'bar' && baz();

```

## `terser/switch/drop_default_1`

- size: oxc 19 vs reference 21 (no whitespaces: -2, formatted: -2)

```js
switch (foo) {
	case 'bar': baz();
	default:
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if ('bar' === foo) baz();
+foo === 'bar' && baz();

```

## `terser/switch/drop_default_2`

- size: oxc 19 vs reference 21 (no whitespaces: -2, formatted: -2)

```js
switch (foo) {
	case 'bar':
		baz();
		break;
	default: break;
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if ('bar' === foo) baz();
+foo === 'bar' && baz();

```

## `terser/template_string/special_chars_in_string`

- size: oxc 115 vs reference 117 (no whitespaces: -2, formatted: -2)

```js
var str = `foo ${'`;\n`${any}'} bar`;
var concat = `foo ${any} bar` + '`;\n`${any}';
var template = `foo ${'`;\n`${any}'} ${any} bar`;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var str = 'foo `;\n`${any} bar';
-var concat = `foo ${any} bar\`;\n\`\${any}`;
-var template = `foo \`;\n\`\${any} ${any} bar`;
+var concat = `foo ${any} bar\`;
+\`\${any}`;
+var template = `foo \`;
+\`\${any} ${any} bar`;

```

## `terser/template_string/template_string_with_predefined_constants`

- size: oxc 376 vs reference 378 (no whitespaces: -2, formatted: +6)

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

## `terser/template_string/template_strings_without_ascii_only`

- size: oxc 43 vs reference 45 (no whitespaces: -2, formatted: +0)

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

## `terser/yield/issue_2832`

- size: oxc 174 vs reference 176 (no whitespaces: -2, formatted: -2)

```js
function* gen(i) {
	const result = yield (x = i, -x);
	var x;
	console.log(x);
	console.log(result);
	yield 2;
}
var x = gen(1);
console.log(x.next('first').value);
console.log(x.next('second').value);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function* gen(i) {
-	const result = yield (x = i, -x);
+	let result = (x = i, yield -x);
 	var x;
 	console.log(x);
 	console.log(result);

```

## `terser/yield/issue_t60`

- tags: `join vars`, `remove unused`
- size: oxc 97 vs reference 99 (no whitespaces: -2, formatted: -2)

```js
function* t() {
	const v = yield 1;
	yield 2;
	return v;
}
var g = t();
console.log(g.next().value, g.next().value);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function* t() {
-	const v = yield 1;
+	let v = yield 1;
 	yield 2;
 	return v;
 }

```

## `terser/blocks/issue_1672_if`

- size: oxc 82 vs reference 85 (no whitespaces: -3, formatted: -4)

```js
switch (function() {
	return xxx;
}) {
	case xxx:
		if (console.log('FAIL')) {
			function xxx() {}
		}
		break;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 switch (function() {
 	return xxx;
 }) {
-	case xxx:
-		if (console.log('FAIL')) function xxx() {}
-		break;
+	case xxx: if (console.log('FAIL')) {
+		function xxx() {}
+	}
 }

```

## `terser/collapse_vars/issue_2571_2`

- tags: `join vars`
- size: oxc 45 vs reference 48 (no whitespaces: -3, formatted: -4)

```js
try {
	var a = A, b = 1;
	throw a;
} catch (e) {
	console.log(b);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	var a = A, b = 1;
 	throw a;
-} catch (e) {
+} catch {
 	console.log(b);
 }

```

## `terser/collapse_vars/issue_2891_1`

- tags: `join vars`
- size: oxc 62 vs reference 65 (no whitespaces: -3, formatted: -4)

```js
var a = 'PASS', b;
try {
	b = c.p = 0;
	a = 'FAIL';
	b();
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var b, a = 'PASS';
+var a = 'PASS', b;
 try {
 	b = c.p = 0;
 	a = 'FAIL';
 	b();
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `terser/collapse_vars/issue_2891_2`

- tags: `join vars`
- size: oxc 73 vs reference 76 (no whitespaces: -3, formatted: -4)

```js
'use strict';
var a = 'PASS', b;
try {
	b = c = 0;
	a = 'FAIL';
	b();
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 'use strict';
-var b, a = 'PASS';
+var a = 'PASS', b;
 try {
 	b = c = 0;
 	a = 'FAIL';
 	b();
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `terser/collapse_vars/issue_2954_1`

- tags: `join vars`
- size: oxc 95 vs reference 98 (no whitespaces: -3, formatted: -4)

```js
var a = 'PASS', b;
try {
	do {
		b = (function() {
			throw 0;
		})();
		a = 'FAIL';
		b && b.c;
	} while (0);
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var b, a = 'PASS';
+var a = 'PASS', b;
 try {
 	do {
 		b = (function() {
@@ -7,5 +7,5 @@
 		a = 'FAIL';
 		b && b.c;
 	} while (0);
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `terser/collapse_vars/may_throw_2`

- tags: `join vars`, `remove unused`
- size: oxc 71 vs reference 74 (no whitespaces: -3, formatted: -4)

```js
function f(b) {
	try {
		var a = x();
		++b;
		return b(a);
	} catch (e) {}
	console.log(b);
}
f(0);

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 		var a = x();
 		++b;
 		return b(a);
-	} catch (e) {}
+	} catch {}
 	console.log(b);
 }
 f(0);

```

## `terser/dead_code/issue_2929`

- size: oxc 82 vs reference 85 (no whitespaces: -3, formatted: -4)

```js
console.log((function(a) {
	try {
		return null.p = a = 1;
	} catch (e) {
		return a ? 'PASS' : 'FAIL';
	}
})());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 console.log((function(a) {
 	try {
 		return null.p = a = 1;
-	} catch (e) {
+	} catch {
 		return a ? 'PASS' : 'FAIL';
 	}
 })());

```

## `terser/evaluate/global_hasOwnProperty`

- size: oxc 79 vs reference 82 (no whitespaces: -3, formatted: -3)

```js
hasOwnProperty.call(a, b);
hasOwnProperty.call(a.b, b);
hasOwnProperty.call(a['b'], b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 hasOwnProperty.call(a, b);
 hasOwnProperty.call(a.b, b);
-hasOwnProperty.call(a['b'], b);
+hasOwnProperty.call(a.b, b);

```

## `terser/functions/issue_2097`

- tags: `join vars`, `remove unused`
- size: oxc 63 vs reference 66 (no whitespaces: -3, formatted: -3)

```js
function f() {
	try {
		throw 0;
	} catch (e) {
		console.log(arguments[0]);
	}
}
f(1);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
-!(function() {
+function f() {
 	try {
 		throw 0;
-	} catch (e) {
+	} catch {
 		console.log(arguments[0]);
 	}
-})(1);
+}
+f(1);

```

## `terser/harmony/classes_can_have_computed_static`

- size: oxc 32 vs reference 35 (no whitespaces: -3, formatted: -4)

```js
class C4 {
	static ['constructor']() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 class C4 {
-	static ['constructor']() {}
+	static constructor() {}
 }

```

## `terser/hoist_props/issue_3021`

- tags: `join vars`
- size: oxc 82 vs reference 85 (no whitespaces: -3, formatted: -5)

```js
var a = 1, b = 2;
(function() {
	b = a;
	if (a++ + b--) return 1;
	return;
	var b = {};
})();
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 	b = a;
 	if (a++ + b--) return 1;
 	return;
-	var b = {};
+	var b;
 })();
 console.log(a, b);

```

## `terser/ie8/issue_2120_1`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 97 vs reference 100 (no whitespaces: -3, formatted: -4)

```js
'aaaaaaaa';
var a = 1, b = 'FAIL';
try {
	throw 1;
} catch (c) {
	try {
		throw 0;
	} catch (a) {
		if (c) b = 'PASS';
	}
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -2,11 +2,11 @@
 var a = 1, b = 'FAIL';
 try {
 	throw 1;
-} catch (t) {
+} catch (e) {
 	try {
 		throw 0;
-	} catch (a) {
-		if (t) b = 'PASS';
+	} catch {
+		e && (b = 'PASS');
 	}
 }
 console.log(b);

```

## `terser/ie8/issue_2120_2`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 97 vs reference 100 (no whitespaces: -3, formatted: -4)

```js
'aaaaaaaa';
var a = 1, b = 'FAIL';
try {
	throw 1;
} catch (c) {
	try {
		throw 0;
	} catch (a) {
		if (c) b = 'PASS';
	}
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -2,11 +2,11 @@
 var a = 1, b = 'FAIL';
 try {
 	throw 1;
-} catch (c) {
+} catch (e) {
 	try {
 		throw 0;
-	} catch (a) {
-		if (c) b = 'PASS';
+	} catch {
+		e && (b = 'PASS');
 	}
 }
 console.log(b);

```

## `terser/issue_1466/same_variable_in_multiple_forOf`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 106 vs reference 109 (no whitespaces: -3, formatted: -8)

```js
var test = [
	'a',
	'b',
	'c'
];
for (let tmp of test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (let tmp of dd) {
		console.log(tmp);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,13 +3,11 @@
 	'b',
 	'c'
 ];
-for (let o of test) {
-	console.log(o);
-	let e;
-	e = [
+for (let tmp of test) {
+	console.log(tmp);
+	for (let tmp of [
 		'e',
 		'f',
 		'g'
-	];
-	for (let o of e) console.log(o);
+	]) console.log(tmp);
 }

```

## `terser/issue_1466/same_variable_in_multiple_forOf_sequences_let`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 106 vs reference 109 (no whitespaces: -3, formatted: -7)

```js
var test = [
	'a',
	'b',
	'c'
];
for (let tmp of test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (let tmp of dd) {
		console.log(tmp);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,12 +3,11 @@
 	'b',
 	'c'
 ];
-for (let o of test) {
-	let e;
-	console.log(o), e = [
+for (let tmp of test) {
+	console.log(tmp);
+	for (let tmp of [
 		'e',
 		'f',
 		'g'
-	];
-	for (let o of e) console.log(o);
+	]) console.log(tmp);
 }

```

## `terser/issue_1733/function_catch_catch`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 103 vs reference 106 (no whitespaces: -3, formatted: -4)

```js
var o = 0;
function f() {
	try {
		throw 1;
	} catch (c) {
		try {
			throw 2;
		} catch (o) {
			var o = 3;
			console.log(o);
		}
	}
	console.log(o);
}
f();

```

```diff
--- reference
+++ oxc
@@ -2,14 +2,14 @@
 function f() {
 	try {
 		throw 1;
-	} catch (t) {
+	} catch {
 		try {
 			throw 2;
-		} catch (c) {
-			var c = 3;
-			console.log(c);
+		} catch (e) {
+			var e = 3;
+			console.log(e);
 		}
 	}
-	console.log(c);
+	console.log(e);
 }
 f();

```

## `terser/issue_1733/function_catch_catch_ie8`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 103 vs reference 106 (no whitespaces: -3, formatted: -4)

```js
var o = 0;
function f() {
	try {
		throw 1;
	} catch (c) {
		try {
			throw 2;
		} catch (o) {
			var o = 3;
			console.log(o);
		}
	}
	console.log(o);
}
f();

```

```diff
--- reference
+++ oxc
@@ -2,14 +2,14 @@
 function f() {
 	try {
 		throw 1;
-	} catch (c) {
+	} catch {
 		try {
 			throw 2;
-		} catch (o) {
-			var o = 3;
-			console.log(o);
+		} catch (e) {
+			var e = 3;
+			console.log(e);
 		}
 	}
-	console.log(o);
+	console.log(e);
 }
 f();

```

## `terser/issue_1833/label_while`

- size: oxc 14 vs reference 17 (no whitespaces: -3, formatted: -8)

```js
function f() {
	L: while (0) continue L;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-function f() {
-	L: 0;
-}
+function f() {}

```

## `terser/issue_22/return_with_no_value_in_if_body`

- tags: `sequences`
- size: oxc 35 vs reference 38 (no whitespaces: -3, formatted: -5)

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
@@ -1,3 +1,3 @@
 function foo(bar) {
-	return bar ? void 0 : 1;
+	if (!bar) return 1;
 }

```

## `terser/issue_637/wrongly_optimized`

- tags: `sequences`
- size: oxc 35 vs reference 38 (no whitespaces: -3, formatted: -5)

```js
function func() {
	foo();
}
if (func() || true) {
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function func() {
 	foo();
 }
-func() || 1, bar();
+func(), bar();

```

## `terser/issue_640/negate_iife_5_off`

- tags: `sequences`
- size: oxc 82 vs reference 85 (no whitespaces: -3, formatted: -3)

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
@@ -1,5 +1,5 @@
 (function() {
 	return t;
-})() ? foo(true) : bar(false), function() {
+})() ? foo(!0) : bar(!1), (function() {
 	console.log('something');
-}();
+})();

```

## `terser/negate_iife/negate_iife_5_off`

- tags: `sequences`
- size: oxc 82 vs reference 85 (no whitespaces: -3, formatted: -3)

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
@@ -1,5 +1,5 @@
 (function() {
 	return t;
-})() ? foo(true) : bar(false), function() {
+})() ? foo(!0) : bar(!1), (function() {
 	console.log('something');
-}();
+})();

```

## `terser/properties/dot_properties_es5`

- size: oxc 75 vs reference 78 (no whitespaces: -3, formatted: -3)

```js
a['foo'] = 'bar';
a['if'] = 'if';
a['*'] = 'asterisk';
a['ຳ'] = 'unicode';
a[''] = 'whitespace';

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 a.foo = 'bar';
 a.if = 'if';
 a['*'] = 'asterisk';
-a['ຳ'] = 'unicode';
+a.ຳ = 'unicode';
 a[''] = 'whitespace';

```

## `terser/properties/keep_properties`

- size: oxc 12 vs reference 15 (no whitespaces: -3, formatted: -3)

```js
a['foo'] = 'bar';

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-a['foo'] = 'bar';
+a.foo = 'bar';

```

## `terser/pure_getters/set_mutable_1`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 77 (no whitespaces: -3, formatted: -1)

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
@@ -1,4 +1,4 @@
-!(function a() {
-	if (a.foo += '') console.log('PASS');
-	else console.log('FAIL');
+(function a() {
+	a.foo += '';
+	a.foo ? console.log('PASS') : console.log('FAIL');
 })();

```

## `terser/reduce_vars/conditional_chain_certain_part`

- tags: `join vars`, `remove unused`
- size: oxc 71 vs reference 74 (no whitespaces: -3, formatted: -3)

```js
global.a = { b: null };
let foo = 'FAIL';
a.b.c(foo = 'PASS')?.x;
console.log(foo);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 global.a = { b: null };
 let foo = 'FAIL';
 a.b.c(foo = 'PASS')?.x;
-console.log('PASS');
+console.log(foo);

```

## `terser/reduce_vars/inner_var_catch`

- tags: `join vars`
- size: oxc 50 vs reference 53 (no whitespaces: -3, formatted: -4)

```js
function f() {
	try {
		a();
	} catch (e) {
		var b = 1;
	}
	console.log(b);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f() {
 	try {
 		a();
-	} catch (e) {
+	} catch {
 		var b = 1;
 	}
 	console.log(b);

```

## `terser/reduce_vars/inner_var_if`

- tags: `join vars`
- size: oxc 45 vs reference 48 (no whitespaces: -3, formatted: -3)

```js
function f(a) {
	if (a) var t = 1;
	if (!t) console.log(t);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
 	if (a) var t = 1;
-	if (!t) console.log(t);
+	t || console.log(t);
 }

```

## `terser/reduce_vars/issue_2598`

- tags: `join vars`, `remove unused`
- size: oxc 69 vs reference 72 (no whitespaces: -3, formatted: -3)

```js
function f() {}
function g(a) {
	return a || f;
}
console.log(g(false) === g(null));

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 function g(a) {
 	return a || f;
 }
-console.log(g(false) === g(null));
+console.log(g(!1) === g(null));

```

## `terser/reduce_vars/pure_getters_1`

- tags: `join vars`
- size: oxc 40 vs reference 43 (no whitespaces: -3, formatted: -4)

```js
try {
	var a = (a.b, 2);
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 try {
 	var a = (a.b, 2);
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `terser/rename/function_catch_catch`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 103 vs reference 106 (no whitespaces: -3, formatted: -4)

```js
var o = 0;
function f() {
	try {
		throw 1;
	} catch (c) {
		try {
			throw 2;
		} catch (o) {
			var o = 3;
			console.log(o);
		}
	}
	console.log(o);
}
f();

```

```diff
--- reference
+++ oxc
@@ -2,14 +2,14 @@
 function f() {
 	try {
 		throw 1;
-	} catch (t) {
+	} catch {
 		try {
 			throw 2;
-		} catch (c) {
-			var c = 3;
-			console.log(c);
+		} catch (e) {
+			var e = 3;
+			console.log(e);
 		}
 	}
-	console.log(c);
+	console.log(e);
 }
 f();

```

## `terser/rename/function_catch_catch_ie8`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 103 vs reference 106 (no whitespaces: -3, formatted: -4)

```js
var o = 0;
function f() {
	try {
		throw 1;
	} catch (c) {
		try {
			throw 2;
		} catch (o) {
			var o = 3;
			console.log(o);
		}
	}
	console.log(o);
}
f();

```

```diff
--- reference
+++ oxc
@@ -2,14 +2,14 @@
 function f() {
 	try {
 		throw 1;
-	} catch (c) {
+	} catch {
 		try {
 			throw 2;
-		} catch (o) {
-			var o = 3;
-			console.log(o);
+		} catch (e) {
+			var e = 3;
+			console.log(e);
 		}
 	}
-	console.log(o);
+	console.log(e);
 }
 f();

```

## `terser/rename/issue_2120_1`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 97 vs reference 100 (no whitespaces: -3, formatted: -4)

```js
'aaaaaaaa';
var a = 1, b = 'FAIL';
try {
	throw 1;
} catch (c) {
	try {
		throw 0;
	} catch (a) {
		if (c) b = 'PASS';
	}
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -2,11 +2,11 @@
 var a = 1, b = 'FAIL';
 try {
 	throw 1;
-} catch (c) {
+} catch (e) {
 	try {
 		throw 0;
-	} catch (t) {
-		if (c) b = 'PASS';
+	} catch {
+		e && (b = 'PASS');
 	}
 }
 console.log(b);

```

## `terser/rename/issue_2120_2`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 97 vs reference 100 (no whitespaces: -3, formatted: -4)

```js
'aaaaaaaa';
var a = 1, b = 'FAIL';
try {
	throw 1;
} catch (c) {
	try {
		throw 0;
	} catch (a) {
		if (c) b = 'PASS';
	}
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -2,11 +2,11 @@
 var a = 1, b = 'FAIL';
 try {
 	throw 1;
-} catch (c) {
+} catch (e) {
 	try {
 		throw 0;
-	} catch (a) {
-		if (c) b = 'PASS';
+	} catch {
+		e && (b = 'PASS');
 	}
 }
 console.log(b);

```

## `terser/template_string/sequence_1`

- size: oxc 21 vs reference 24 (no whitespaces: -3, formatted: -3)

```js
console.log(`${1, 2} ${/a/, /b/}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`2 ${/b/}`);
+console.log('2 /b/');

```

## `terser/async/for_await_of_2`

- size: oxc 213 vs reference 217 (no whitespaces: -4, formatted: -4)

```js
async function foo(x) {
	for await (a of x) {}
	for await (var b of x) {}
	for await (let c of x) {}
	for await (const d of x) {}
}
const bar = async (x) => {
	for await (a of x) {}
	for await (var b of x) {}
	for await (let c of x) {}
	for await (const d of x) {}
};

```

```diff
--- reference
+++ oxc
@@ -2,11 +2,11 @@
 	for await (a of x);
 	for await (var b of x);
 	for await (let c of x);
-	for await (const d of x);
+	for await (let d of x);
 }
 const bar = async (x) => {
 	for await (a of x);
 	for await (var b of x);
 	for await (let c of x);
-	for await (const d of x);
+	for await (let d of x);
 };

```

## `terser/big_int/big_int_math`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 75 vs reference 79 (no whitespaces: -4, formatted: -6)

```js
const sum = 10n + 15n;
const exp = 5n ** 10n;
const sub = 1n - 3n;
const mul = 5n * 5n;
const div = 15n / 5n;
const regular_number = 1 * 10;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-const sum = 10n + 15n, exp = 5n ** 10n, sub = 1n - 3n, mul = 5n * 5n, div = 15n / 5n, regular_number = 10;
+const sum = 25n, exp = 5n ** 10n, sub = 1n - 3n, mul = 5n * 5n, div = 15n / 5n, regular_number = 10;

```

## `terser/collapse_vars/issue_2313_1`

- tags: `join vars`, `sequences`
- size: oxc 111 vs reference 115 (no whitespaces: -4, formatted: -8)

```js
var a = 0, b = 0;
var foo = {
	get c() {
		a++;
		return 42;
	},
	set c(c) {
		b++;
	},
	d: function() {
		this.c++;
		if (this.c) console.log(a, b);
	}
};
foo.d();

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,12 @@
-var a = 0, b = 0;
-var foo = {
+var a = 0, b = 0, foo = {
 	get c() {
-		a++;
-		return 42;
+		return a++, 42;
 	},
 	set c(c) {
 		b++;
 	},
 	d: function() {
-		this.c++;
-		this.c && console.log(a, b);
+		this.c++, this.c && console.log(a, b);
 	}
 };
 foo.d();

```

## `terser/collapse_vars/issue_2364_2`

- tags: `join vars`, `pure getters`
- size: oxc 146 vs reference 150 (no whitespaces: -4, formatted: -5)

```js
function callValidate() {
	var validate = compilation.validate;
	var result = validate.apply(null, arguments);
	return callValidate.errors = validate.errors, result;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function callValidate() {
-	var validate = compilation.validate;
-	var result = validate.apply(null, arguments);
+	var validate = compilation.validate, result = validate.apply(null, arguments);
 	return callValidate.errors = validate.errors, result;
 }

```

## `terser/collapse_vars/issue_2364_3`

- tags: `join vars`, `pure getters`
- size: oxc 177 vs reference 181 (no whitespaces: -4, formatted: -4)

```js
function inc(obj) {
	return obj.count++;
}
function foo(bar) {
	var result = inc(bar);
	return foo.amount = bar.count, result;
}
var data = { count: 0 };
var answer = foo(data);
console.log(foo.amount, answer);

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,5 @@
 	var result = inc(bar);
 	return foo.amount = bar.count, result;
 }
-var data = { count: 0 };
-var answer = foo(data);
+var data = { count: 0 }, answer = foo(data);
 console.log(foo.amount, answer);

```

## `terser/collapse_vars/issue_2364_4`

- tags: `join vars`, `pure getters`
- size: oxc 186 vs reference 190 (no whitespaces: -4, formatted: -4)

```js
function inc(obj) {
	return obj.count++;
}
function foo(bar, baz) {
	var result = inc(bar);
	return foo.amount = baz.count, result;
}
var data = { count: 0 };
var answer = foo(data, data);
console.log(foo.amount, answer);

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,5 @@
 	var result = inc(bar);
 	return foo.amount = baz.count, result;
 }
-var data = { count: 0 };
-var answer = foo(data, data);
+var data = { count: 0 }, answer = foo(data, data);
 console.log(foo.amount, answer);

```

## `terser/collapse_vars/issue_2858`

- tags: `join vars`, `remove unused`
- size: oxc 86 vs reference 90 (no whitespaces: -4, formatted: -5)

```js
var b;
(function() {
	function f() {
		a++;
	}
	f();
	var c = f();
	var a = void 0;
	c || (b = a);
})();
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -4,8 +4,7 @@
 		a++;
 	}
 	f();
-	var c = f();
-	var a = void 0;
+	var c = f(), a = void 0;
 	c || (b = a);
 })();
 console.log(b);

```

## `terser/collapse_vars/issue_3096`

- tags: `join vars`
- size: oxc 80 vs reference 84 (no whitespaces: -4, formatted: -5)

```js
console.log((function() {
	var ar = ['a', 'b'];
	var first = ar.pop();
	return ar + '' + first;
})());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 console.log((function() {
-	var ar = ['a', 'b'];
-	var first = ar.pop();
+	var ar = ['a', 'b'], first = ar.pop();
 	return ar + '' + first;
 })());

```

## `terser/collapse_vars/lvalues_def`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 55 (no whitespaces: -4, formatted: -4)

```js
var a = 0, b = 1;
var a = b++, b = +(function() {})();
a && a[a++];
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a = 0, b = 1;
-a = b++, b = +void 0;
+var a = 0, b = 1, a = b++, b = NaN;
 a && a[a++];
 console.log(a, b);

```

## `terser/collapse_vars/side_effects_property`

- tags: `join vars`
- size: oxc 72 vs reference 76 (no whitespaces: -4, formatted: -4)

```js
var a = [];
var b = 0;
a[b++] = function() {
	return 42;
};
var c = a[b++]();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a = [];
-var b = 0;
+var a = [], b = 0;
 a[b++] = function() {
 	return 42;
 };

```

## `terser/destructuring/destructuring_arrays`

- size: oxc 142 vs reference 146 (no whitespaces: -4, formatted: -4)

```js
{
	const [aa, bb] = cc;
}
{
	const [aa, [bb, cc]] = dd;
}
{
	let [aa, bb] = cc;
}
{
	let [aa, [bb, cc]] = dd;
}
var [aa, bb] = cc;
var [aa, [bb, cc]] = dd;
var [, [, , , , ,], , , zz] = xx;
var [, , zzz, ,] = xxx;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 {
-	const [aa, bb] = cc;
+	let [aa, bb] = cc;
 }
 {
-	const [aa, [bb, cc]] = dd;
+	let [aa, [bb, cc]] = dd;
 }
 {
 	let [aa, bb] = cc;

```

## `terser/destructuring/destructuring_objects`

- size: oxc 196 vs reference 200 (no whitespaces: -4, formatted: -4)

```js
{
	const { aa, bb } = {
		aa: 1,
		bb: 2
	};
}
{
	const { aa, bb: { cc, dd } } = {
		aa: 1,
		bb: {
			cc: 2,
			dd: 3
		}
	};
}
{
	let { aa, bb } = {
		aa: 1,
		bb: 2
	};
}
{
	let { aa, bb: { cc, dd } } = {
		aa: 1,
		bb: {
			cc: 2,
			dd: 3
		}
	};
}
var { aa, bb } = {
	aa: 1,
	bb: 2
};
var { aa, bb: { cc, dd } } = {
	aa: 1,
	bb: {
		cc: 2,
		dd: 3
	}
};

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 {
-	const { aa, bb } = {
+	let { aa, bb } = {
 		aa: 1,
 		bb: 2
 	};
 }
 {
-	const { aa, bb: { cc, dd } } = {
+	let { aa, bb: { cc, dd } } = {
 		aa: 1,
 		bb: {
 			cc: 2,

```

## `terser/drop_unused/issue_3146_1`

- tags: `join vars`, `remove unused`
- size: oxc 87 vs reference 91 (no whitespaces: -4, formatted: -6)

```js
(function(f) {
	f('g()');
})(function(a) {
	eval(a);
	function g(b) {
		if (!b) b = 'PASS';
		console.log(b);
	}
});

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 })(function(a) {
 	eval(a);
 	function g(b) {
-		if (!b) b = 'PASS';
+		b ||= 'PASS';
 		console.log(b);
 	}
 });

```

## `terser/drop_unused/issue_3146_2`

- tags: `join vars`, `remove unused`
- size: oxc 87 vs reference 91 (no whitespaces: -4, formatted: -6)

```js
(function(f) {
	f('g()');
})(function(a) {
	eval(a);
	function g(b) {
		if (!b) b = 'PASS';
		console.log(b);
	}
});

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 })(function(a) {
 	eval(a);
 	function g(b) {
-		if (!b) b = 'PASS';
+		b ||= 'PASS';
 		console.log(b);
 	}
 });

```

## `terser/drop_unused/unused_block_decls_in_catch`

- tags: `remove unused`
- size: oxc 33 vs reference 37 (no whitespaces: -4, formatted: -5)

```js
function foo() {
	try {
		foo();
	} catch (ex) {
		let x = 10;
		const y = 10;
		class Zee {}
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function foo() {
 	try {
 		foo();
-	} catch (ex) {}
+	} catch {}
 }

```

## `terser/drop_unused/unused_var_in_catch`

- tags: `remove unused`
- size: oxc 33 vs reference 37 (no whitespaces: -4, formatted: -5)

```js
function foo() {
	try {
		foo();
	} catch (ex) {
		var x = 10;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function foo() {
 	try {
 		foo();
-	} catch (ex) {}
+	} catch {}
 }

```

## `terser/drop_unused/used_block_decls_in_catch`

- tags: `remove unused`
- size: oxc 53 vs reference 57 (no whitespaces: -4, formatted: -5)

```js
function foo() {
	try {
		foo();
	} catch (ex) {
		let x = 10;
		const y = 10;
		class Zee {}
	}
	console.log(x, y, Zee);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function foo() {
 	try {
 		foo();
-	} catch (ex) {}
+	} catch {}
 	console.log(x, y, Zee);
 }

```

## `terser/drop_unused/used_var_in_catch`

- tags: `remove unused`
- size: oxc 49 vs reference 53 (no whitespaces: -4, formatted: -5)

```js
function foo() {
	try {
		foo();
	} catch (ex) {
		var x = 10;
	}
	return x;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function foo() {
 	try {
 		foo();
-	} catch (ex) {
+	} catch {
 		var x = 10;
 	}
 	return x;

```

## `terser/export/export_default_named_async_function`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`
- size: oxc 55 vs reference 59 (no whitespaces: -4, formatted: -4)

```js
export default async function bar() {
	return await foo();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-export default async function _$BAR$_() {
+export default async function bar() {
 	return await foo();
 }

```

## `terser/export/export_default_named_generator`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`
- size: oxc 42 vs reference 46 (no whitespaces: -4, formatted: -4)

```js
export default function* gen() {
	yield foo();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-export default function* _$GEN$_() {
+export default function* gen() {
 	yield foo();
 }

```

## `terser/harmony/regression_for_of_const`

- size: oxc 32 vs reference 36 (no whitespaces: -4, formatted: -4)

```js
for (const x of y) {}
for (const x in y) {}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-for (const x of y);
-for (const x in y);
+for (let x of y);
+for (let x in y);

```

## `terser/hoist_props/direct_access_1`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 68 (no whitespaces: -4, formatted: -4)

```js
var a = 0;
var obj = {
	a: 1,
	b: 2
};
for (var k in obj) a++;
console.log(a, obj.a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a = 0;
-var obj = {
+var a = 0, obj = {
 	a: 1,
 	b: 2
 };

```

## `terser/if_return/if_if_return_return`

- tags: `sequences`
- size: oxc 42 vs reference 46 (no whitespaces: -4, formatted: -5)

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
@@ -1,4 +1,4 @@
 function f(a, b) {
-	if (a) return b || (0, void 0);
+	if (a) return b || void 0;
 	g();
 }

```

## `terser/if_return/if_return_same_value`

- tags: `sequences`
- size: oxc 106 vs reference 110 (no whitespaces: -4, formatted: -6)

```js
function f() {
	if (foo) {
		return x();
	}
	if (bar) {
		return x();
	}
}
function g() {
	if (foo) {
		return x();
	}
	if (bar) {
		return x();
	}
	return x();
}
function h() {
	if (foo) {
		return x();
	}
	if (bar) {
		return x();
	}
	return y();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f() {
-	return foo || bar ? x() : void 0;
+	if (foo || bar) return x();
 }
 function g() {
 	return foo || bar, x();

```

## `terser/issue_640/negate_iife_3`

- tags: `sequences`
- size: oxc 57 vs reference 61 (no whitespaces: -4, formatted: -4)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
+(function() {
 	return t;
-}() ? console.log(false) : console.log(true);
+})() ? console.log(!0) : console.log(!1);

```

## `terser/issue_892/dont_mangle_arguments`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 70 vs reference 74 (no whitespaces: -4, formatted: -7)

```js
(function() {
	var arguments = arguments, not_arguments = 9;
	console.log(not_arguments, arguments);
})(5, 6, 7);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function() {
-	var arguments = arguments, o = 9;
-	console.log(o, arguments);
+	var arguments = arguments;
+	console.log(9, arguments);
 })(5, 6, 7);

```

## `terser/issue_973/this_binding_side_effects`

- size: oxc 151 vs reference 155 (no whitespaces: -4, formatted: -5)

```js
(function(foo) {
	(0, foo)();
	(0, foo.bar)();
	(0, eval)('console.log(foo);');
})();
(function(foo) {
	var eval = console;
	(0, foo)();
	(0, foo.bar)();
	(0, eval)('console.log(foo);');
})();

```

```diff
--- reference
+++ oxc
@@ -7,5 +7,5 @@
 	var eval = console;
 	foo();
 	(0, foo.bar)();
-	(0, eval)('console.log(foo);');
+	eval('console.log(foo);');
 })();

```

## `terser/loops/issue_1532`

- size: oxc 45 vs reference 49 (no whitespaces: -4, formatted: -4)

```js
function f(x, y) {
	do {
		if (x) break;
		foo();
	} while (false);
}

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 	do {
 		if (x) break;
 		foo();
-	} while (false);
+	} while (0);
 }

```

## `terser/loops/parse_do_while_with_semicolon`

- size: oxc 20 vs reference 24 (no whitespaces: -4, formatted: -4)

```js
do {
	x();
} while (false);
y();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 do
 	x();
-while (false);
+while (0);
 y();

```

## `terser/loops/parse_do_while_without_semicolon`

- size: oxc 20 vs reference 24 (no whitespaces: -4, formatted: -4)

```js
do {
	x();
} while (false);
y();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 do
 	x();
-while (false);
+while (0);
 y();

```

## `terser/negate_iife/negate_iife_issue_1073`

- tags: `sequences`
- size: oxc 69 vs reference 73 (no whitespaces: -4, formatted: -4)

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
@@ -1,5 +1,5 @@
 new ((function(a) {
-	return function Foo() {
+	return function() {
 		this.x = a, console.log(this);
 	};
 })(7))();

```

## `terser/object/computed_property_names`

- size: oxc 12 vs reference 16 (no whitespaces: -4, formatted: -4)

```js
obj({ ['x' + 'x']: 6 });

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-obj({ ['xx']: 6 });
+obj({ xx: 6 });

```

## `terser/pure_funcs/issue_2629_1`

- size: oxc 0 vs reference 4 (no whitespaces: -4, formatted: -5)

```js
a();
b();
c();
d();

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-c();

```

## `terser/pure_getters/collapse_vars_1_false`

- tags: `join vars`, `remove unused`
- size: oxc 57 vs reference 61 (no whitespaces: -4, formatted: -6)

```js
function f(a, b) {
	for (;;) {
		var c = a.g();
		var d = b.p;
		if (c || d) break;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 function f(a, b) {
 	for (;;) {
-		var c = a.g();
-		var d = b.p;
+		var c = a.g(), d = b.p;
 		if (c || d) break;
 	}
 }

```

## `terser/pure_getters/collapse_vars_1_strict`

- tags: `join vars`, `remove unused`
- size: oxc 57 vs reference 61 (no whitespaces: -4, formatted: -6)

```js
function f(a, b) {
	for (;;) {
		var c = a.g();
		var d = b.p;
		if (c || d) break;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 function f(a, b) {
 	for (;;) {
-		var c = a.g();
-		var d = b.p;
+		var c = a.g(), d = b.p;
 		if (c || d) break;
 	}
 }

```

## `terser/reduce_vars/lvalues_def_1`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 41 (no whitespaces: -4, formatted: -6)

```js
var b = 1;
var a = b++, b = NaN;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var b = 1;
-var a = b++, b = 0 / 0;
+var b = 1, a = b++, b = NaN;
 console.log(a, b);

```

## `terser/reduce_vars/named_function_with_recursive_ref_reuse`

- tags: `join vars`, `remove unused`
- size: oxc 127 vs reference 131 (no whitespaces: -4, formatted: -4)

```js
var result = [];
var do_not_inline = function foo() {
	result.push(foo);
};
[0, 1].map(() => do_not_inline());
console.log(result[0] === result[1]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var result = [];
-var do_not_inline = function foo() {
+var result = [], do_not_inline = function foo() {
 	result.push(foo);
 };
 [0, 1].map(() => do_not_inline());

```

## `terser/reduce_vars/shorthand_inline_proto`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 40 vs reference 44 (no whitespaces: -4, formatted: -4)

```js
var __proto__ = null;
var o = { __proto__ };
foo(o);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var __proto__ = null;
-var o = { __proto__ };
+var __proto__ = null, o = { __proto__ };
 foo(o);

```

## `terser/sequences/make_sequences_2`

- tags: `sequences`
- size: oxc 38 vs reference 42 (no whitespaces: -4, formatted: -3)

```js
if (boo) {
	foo();
	bar();
	baz();
} else {
	x();
	y();
	z();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-if (boo) foo(), bar(), baz();
-else x(), y(), z();
+boo ? (foo(), bar(), baz()) : (x(), y(), z());

```

## `terser/template_string/tagged_template_parens`

- size: oxc 84 vs reference 88 (no whitespaces: -4, formatted: -4)

```js
a`0`;
((a) => b)`1`;
(a = b)`2`;
(a + b)`3`;
(a ? b : c)`4`;
(a, b, c)`5`;
(~a)`6`;
a.b`7`;
a['b']`8`;
a()`9`;

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 a`0`;
-((a1) => b)`1`;
+((a) => b)`1`;
 (a = b)`2`;
 (a + b)`3`;
 (a ? b : c)`4`;
 (a, b, c)`5`;
 (~a)`6`;
 a.b`7`;
-a['b']`8`;
+a.b`8`;
 a()`9`;

```

## `terser/big_int/big_int_negative`

- size: oxc 0 vs reference 5 (no whitespaces: -5, formatted: -6)

```js
-15n;

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
--15n;

```

## `terser/blocks/issue_1672_for`

- size: oxc 85 vs reference 90 (no whitespaces: -5, formatted: -13)

```js
switch (function() {
	return xxx;
}) {
	case xxx:
		for (; console.log('FAIL');) {
			function xxx() {}
		}
		break;
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
 switch (function() {
 	return xxx;
 }) {
-	case xxx:
-		for (; console.log('FAIL');) {
-			function xxx() {}
-		}
-		break;
+	case xxx: for (; console.log('FAIL');) {
+		function xxx() {}
+	}
 }

```

## `terser/collapse_vars/cascade_if_1`

- tags: `join vars`
- size: oxc 25 vs reference 30 (no whitespaces: -5, formatted: -9)

```js
var a;
if (a = x(), a) {
	if (a == y()) z();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-var a;
-if (a = x()) {
-	if (a == y()) z();
-}
+var a = x();
+a && a == y() && z();

```

## `terser/collapse_vars/return_2`

- tags: `join vars`, `remove unused`
- size: oxc 121 vs reference 126 (no whitespaces: -5, formatted: -5)

```js
var log = console.log;
function f(b, c) {
	var a = c();
	if (b) return b;
	log(a);
}
f(false, function() {
	return 1;
});
f(true, function() {
	return 2;
});

```

```diff
--- reference
+++ oxc
@@ -4,9 +4,9 @@
 	if (b) return b;
 	log(a);
 }
-f(false, function() {
+f(!1, function() {
 	return 1;
 });
-f(true, function() {
+f(!0, function() {
 	return 2;
 });

```

## `terser/collapse_vars/return_3`

- tags: `join vars`, `remove unused`
- size: oxc 85 vs reference 90 (no whitespaces: -5, formatted: -5)

```js
var log = console.log;
function f(b, c) {
	var a = b <<= c;
	if (b) return b;
	log(a);
}
f(false, 1);
f(true, 2);

```

```diff
--- reference
+++ oxc
@@ -4,5 +4,5 @@
 	if (b) return b;
 	log(a);
 }
-f(false, 1);
-f(true, 2);
+f(!1, 1);
+f(!0, 2);

```

## `terser/conditionals/condition_symbol_matches_consequent`

- tags: `sequences`
- size: oxc 124 vs reference 129 (no whitespaces: -5, formatted: -5)

```js
function foo(x, y) {
	return x ? x : y;
}
function bar() {
	return g ? g : h;
}
var g = 4;
var h = 5;
console.log(foo(3, null), foo(0, 7), foo(true, false), bar());

```

```diff
--- reference
+++ oxc
@@ -6,4 +6,4 @@
 }
 var g = 4;
 var h = 5;
-console.log(foo(3, null), foo(0, 7), foo(true, false), bar());
+console.log(foo(3, null), foo(0, 7), foo(!0, !1), bar());

```

## `terser/conditionals/to_and_or`

- tags: `sequences`
- size: oxc 152 vs reference 157 (no whitespaces: -5, formatted: -5)

```js
var values = [
	0,
	null,
	true,
	'foo',
	false,
	-1 / 0,
	void 0
];
values.forEach(function(x) {
	values.forEach(function(y) {
		values.forEach(function(z) {
			console.log(x ? y || z : z);
		});
	});
});

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var values = [
 	0,
 	null,
-	true,
+	!0,
 	'foo',
-	false,
+	!1,
 	-1 / 0,
 	void 0
 ];

```

## `terser/dead_code/issue_2597`

- size: oxc 107 vs reference 112 (no whitespaces: -5, formatted: -6)

```js
function f(b) {
	try {
		try {
			throw 'foo';
		} catch (e) {
			return b = true;
		}
	} finally {
		b && (a = 'PASS');
	}
}
var a = 'FAIL';
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,8 @@
 	try {
 		try {
 			throw 'foo';
-		} catch (e) {
-			return b = true;
+		} catch {
+			return b = !0;
 		}
 	} finally {
 		b && (a = 'PASS');

```

## `terser/harmony/class_extends_class`

- size: oxc 57 vs reference 62 (no whitespaces: -5, formatted: -5)

```js
class anon extends class {} {}
class named extends class base {} {}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 class anon extends class {} {}
-class named extends class base {} {}
+class named extends class {} {}

```

## `terser/harmony/class_extends_function`

- size: oxc 67 vs reference 72 (no whitespaces: -5, formatted: -5)

```js
class anon extends function() {} {}
class named extends function base() {} {}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 class anon extends function() {} {}
-class named extends function base() {} {}
+class named extends function() {} {}

```

## `terser/harmony/module_enables_strict_mode`

- tags: `type:module`
- size: oxc 18 vs reference 23 (no whitespaces: -5, formatted: -7)

```js
if (1) {
	function xyz() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-if (1) {
+{
 	function xyz() {}
 }

```

## `terser/issue_640/negate_iife_3_off`

- tags: `sequences`
- size: oxc 57 vs reference 62 (no whitespaces: -5, formatted: -5)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function() {
 	return t;
-})() ? console.log(true) : console.log(false);
+})() ? console.log(!0) : console.log(!1);

```

## `terser/loops/do_switch`

- size: oxc 38 vs reference 43 (no whitespaces: -5, formatted: -8)

```js
do {
	switch (a) {
		case b: continue;
	}
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-do {
+do
 	switch (a) {
 		case b: continue;
 	}
-} while (false);
+while (0);

```

## `terser/parameters/regression_arrow_functions_and_hoist`

- size: oxc 0 vs reference 5 (no whitespaces: -5, formatted: -10)

```js
(a) => b;

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-(a) => b;

```

## `terser/reduce_vars/issue_1865`

- tags: `join vars`
- size: oxc 106 vs reference 111 (no whitespaces: -5, formatted: -5)

```js
function f(some) {
	some.thing = false;
}
console.log((function() {
	var some = { thing: true };
	f(some);
	return some.thing;
})());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f(some) {
-	some.thing = false;
+	some.thing = !1;
 }
 console.log((function() {
-	var some = { thing: true };
+	var some = { thing: !0 };
 	f(some);
 	return some.thing;
 })());

```

## `terser/reduce_vars/issue_3140_1`

- tags: `join vars`, `remove unused`
- size: oxc 145 vs reference 150 (no whitespaces: -5, formatted: -5)

```js
(function() {
	var a;
	function f() {}
	f.g = function g() {
		function h() {
			console.log(a ? 'PASS' : 'FAIL');
		}
		a = true;
		this();
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
@@ -5,9 +5,9 @@
 		function h() {
 			console.log(a ? 'PASS' : 'FAIL');
 		}
-		a = true;
+		a = !0;
 		this();
-		a = false;
+		a = !1;
 		h.g = g;
 		return h;
 	};

```

## `terser/reduce_vars/issue_3140_3`

- tags: `join vars`, `remove unused`
- size: oxc 182 vs reference 187 (no whitespaces: -5, formatted: -5)

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
		(function() {
			return self;
		})()();
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
@@ -6,11 +6,11 @@
 		function h() {
 			console.log(a ? 'PASS' : 'FAIL');
 		}
-		a = true;
+		a = !0;
 		(function() {
 			return self;
 		})()();
-		a = false;
+		a = !1;
 		h.g = g;
 		return h;
 	};

```

## `terser/reduce_vars/issue_3140_4`

- tags: `join vars`, `remove unused`
- size: oxc 159 vs reference 164 (no whitespaces: -5, formatted: -5)

```js
(function() {
	var a;
	function f() {}
	f.g = function g() {
		var o = { p: this };
		function h() {
			console.log(a ? 'PASS' : 'FAIL');
		}
		a = true;
		o.p();
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
@@ -6,9 +6,9 @@
 		function h() {
 			console.log(a ? 'PASS' : 'FAIL');
 		}
-		a = true;
+		a = !0;
 		o.p();
-		a = false;
+		a = !1;
 		h.g = g;
 		return h;
 	};

```

## `terser/reduce_vars/perf_7`

- tags: `join vars`, `remove unused`
- size: oxc 162 vs reference 167 (no whitespaces: -5, formatted: -6)

```js
var indirect_foo = function(x, y, z) {
	var foo = function(x, y, z) {
		return x < y ? x * y + z : x * z - y;
	};
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
 var indirect_foo = function(x, y, z) {
-	return (function(x, y, z) {
+	return function(x, y, z) {
 		return x < y ? x * y + z : x * z - y;
-	})(x, y, z);
-};
-var sum = 0;
+	}(x, y, z);
+}, sum = 0;
 for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `terser/reduce_vars/var_if`

- tags: `join vars`, `remove unused`
- size: oxc 45 vs reference 50 (no whitespaces: -5, formatted: -5)

```js
function f() {
	if (x()) {
		var a;
		if (!g) a = true;
		if (a) g();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f() {
 	if (x()) {
 		var a;
-		if (!g) a = true;
-		if (a) g();
+		g || (a = !0);
+		a && g();
 	}
 }

```

## `terser/blocks/issue_1672_for_strict`

- size: oxc 98 vs reference 104 (no whitespaces: -6, formatted: -14)

```js
'use strict';
switch (function() {
	return xxx;
}) {
	case xxx:
		for (; console.log('FAIL');) {
			function xxx() {}
		}
		break;
}

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,7 @@
 switch (function() {
 	return xxx;
 }) {
-	case xxx:
-		for (; console.log('FAIL');) {
-			function xxx1() {}
-		}
-		break;
+	case xxx: for (; console.log('FAIL');) {
+		function xxx() {}
+	}
 }

```

## `terser/blocks/issue_1672_if_strict`

- size: oxc 95 vs reference 101 (no whitespaces: -6, formatted: -14)

```js
'use strict';
switch (function() {
	return xxx;
}) {
	case xxx:
		if (console.log('FAIL')) {
			function xxx() {}
		}
		break;
}

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,7 @@
 switch (function() {
 	return xxx;
 }) {
-	case xxx:
-		if (console.log('FAIL')) {
-			function xxx1() {}
-		}
-		break;
+	case xxx: if (console.log('FAIL')) {
+		function xxx() {}
+	}
 }

```

## `terser/collapse_vars/collapse_vars_eval_and_with`

- tags: `join vars`, `remove unused`
- size: oxc 197 vs reference 203 (no whitespaces: -6, formatted: -6)

```js
(function f0() {
	var a = 2;
	console.log(a - 5);
	eval('console.log(a);');
})();
(function f1() {
	var o = { a: 1 }, a = 2;
	with(o) console.log(a);
})();
(function f2() {
	var o = { a: 1 }, a = 2;
	return function() {
		with(o) console.log(a);
	};
})()();

```

```diff
--- reference
+++ oxc
@@ -3,11 +3,11 @@
 	console.log(a - 5);
 	eval('console.log(a);');
 })();
-(function f1() {
+(function() {
 	var o = { a: 1 }, a = 2;
 	with(o) console.log(a);
 })();
-(function f2() {
+(function() {
 	var o = { a: 1 }, a = 2;
 	return function() {
 		with(o) console.log(a);

```

## `terser/collapse_vars/switch_case_2`

- tags: `join vars`
- size: oxc 56 vs reference 62 (no whitespaces: -6, formatted: -11)

```js
var a = 1, b = 2;
switch (b++) {
	case b:
		var c = a;
		var a;
		break;
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 var a = 1, b = 2;
 switch (b++) {
-	case b:
-		var a, c = a;
-		break;
+	case b: var c = a, a;
 }
 console.log(a);

```

## `terser/comparing/self_comparison_1`

- size: oxc 24 vs reference 30 (no whitespaces: -6, formatted: -10)

```js
a === a;
a !== b;
b.c === a.c;
b.c !== b.c;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-a == a;
-a !== b;
-b.c === a.c;
-b.c != b.c;
+a, a;
+a, b;
+b.c, a.c;
+b.c, b.c;

```

## `terser/destructuring/destructuring_constdef_in_loops`

- size: oxc 57 vs reference 63 (no whitespaces: -6, formatted: -6)

```js
for (const [x, y] in pairs);
for (const [a] = 0;;);
for (const { c } of cees);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-for (const [x, y] in pairs);
-for (const [a] = 0;;);
-for (const { c } of cees);
+for (let [x, y] in pairs);
+for (let [a] = 0;;);
+for (let { c } of cees);

```

## `terser/destructuring/reduce_vars`

- tags: `join vars`
- size: oxc 376 vs reference 382 (no whitespaces: -6, formatted: -21)

```js
{
	const [aa, [bb, cc]] = dd;
}
{
	let [aa, [bb, cc]] = dd;
}
var [aa, [bb, cc]] = dd;
[aa, [bb, cc]] = dd;
{
	const { aa, bb: { cc, dd } } = {
		aa: 1,
		bb: {
			cc: 2,
			dd: 3
		}
	};
}
{
	let { aa, bb: { cc, dd } } = {
		aa: 1,
		bb: {
			cc: 2,
			dd: 3
		}
	};
}
var { aa, bb: { cc, dd } } = {
	aa: 1,
	bb: {
		cc: 2,
		dd: 3
	}
};
({aa: aa, bb: {cc: cc, dd: dd}} = {
	aa: 1,
	bb: {
		cc: 2,
		dd: 3
	}
});
const [{ a }, b] = c;
let [{ d }, e] = f;
var [{ g }, h] = i;
[{a: a}, b] = c;
for (const [x, y] in pairs);
for (let [x, y] in pairs);
for (var [x, y] in pairs);
for ([x, y] in pairs);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 {
-	const [aa, [bb, cc]] = dd;
+	let [aa, [bb, cc]] = dd;
 }
 {
 	let [aa, [bb, cc]] = dd;
@@ -7,7 +7,7 @@
 var [aa, [bb, cc]] = dd;
 [aa, [bb, cc]] = dd;
 {
-	const { aa, bb: { cc, dd } } = {
+	let { aa, bb: { cc, dd } } = {
 		aa: 1,
 		bb: {
 			cc: 2,
@@ -31,7 +31,7 @@
 		dd: 3
 	}
 };
-({aa: aa, bb: {cc: cc, dd: dd}} = {
+({aa, bb: {cc, dd}} = {
 	aa: 1,
 	bb: {
 		cc: 2,
@@ -41,8 +41,8 @@
 const [{ a }, b] = c;
 let [{ d }, e] = f;
 var [{ g }, h] = i;
-[{a: a}, b] = c;
-for (const [x, y] in pairs);
+[{a}, b] = c;
+for (let [x, y] in pairs);
 for (let [x, y] in pairs);
 for (var [x, y] in pairs);
 for ([x, y] in pairs);

```

## `terser/export/dynamic_import`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`
- size: oxc 133 vs reference 139 (no whitespaces: -6, formatted: -9)

```js
import traditional from './traditional.js';
function imp(x) {
	return import(x);
}
import('module_for_side_effects.js');
let dynamic = import('some/module.js');
dynamic.foo();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
-import o from './traditional.js';
-function t(o) {
-	return import(o);
+import e from './traditional.js';
+function imp(e) {
+	return import(e);
 }
 import('module_for_side_effects.js');
-let r = import('some/module.js');
-r.foo();
+import('some/module.js').foo();

```

## `terser/global_defs/issue_1986`

- size: oxc 10 vs reference 16 (no whitespaces: -6, formatted: -6)

```js
alert(42);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(42);
+alert(42);

```

## `terser/harmony/issue_1898`

- size: oxc 106 vs reference 112 (no whitespaces: -6, formatted: -22)

```js
class Foo {
	bar() {
		for (const x of [6, 5]) {
			for (let y of [4, 3]) {
				for (var z of [2, 1]) {
					console.log(x, y, z);
				}
			}
		}
	}
}
new Foo().bar();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,6 @@
 class Foo {
 	bar() {
-		for (const f of [6, 5]) {
-			for (let r of [4, 3]) {
-				for (var o of [2, 1]) console.log(f, r, o);
-			}
-		}
+		for (let x of [6, 5]) for (let y of [4, 3]) for (var z of [2, 1]) console.log(x, y, z);
 	}
 }
 new Foo().bar();

```

## `terser/identity/inline_identity_lose_this`

- tags: `join vars`
- size: oxc 219 vs reference 225 (no whitespaces: -6, formatted: -8)

```js
'use strict';
const id = (x) => x;
const func_bag = { func: function() {
	return this === undefined ? 'PASS' : 'FAIL';
} };
func_bag.func2 = function() {
	return this === undefined ? 'PASS' : 'FAIL';
};
console.log(id(func_bag.func)());
console.log(id(func_bag.func2)());

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 'use strict';
-const id = (x) => x;
-const func_bag = { func: function() {
-	return void 0 === this ? 'PASS' : 'FAIL';
+const id = (x) => x, func_bag = { func: function() {
+	return this === void 0 ? 'PASS' : 'FAIL';
 } };
 func_bag.func2 = function() {
-	return void 0 === this ? 'PASS' : 'FAIL';
+	return this === void 0 ? 'PASS' : 'FAIL';
 };
-console.log((0, func_bag.func)());
-console.log((0, func_bag.func2)());
+console.log(id(func_bag.func)());
+console.log(id(func_bag.func2)());

```

## `terser/ie8/issue_2254_1`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 89 vs reference 95 (no whitespaces: -6, formatted: -8)

```js
'eeeeee';
try {
	console.log(f('PASS'));
} catch (e) {}
function f(s) {
	try {
		throw 'FAIL';
	} catch (e) {
		return s;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 'eeeeee';
 try {
 	console.log(f('PASS'));
-} catch (e) {}
+} catch {}
 function f(e) {
 	try {
 		throw 'FAIL';
-	} catch (t) {
+	} catch {
 		return e;
 	}
 }

```

## `terser/ie8/issue_2254_2`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 89 vs reference 95 (no whitespaces: -6, formatted: -8)

```js
'eeeeee';
try {
	console.log(f('PASS'));
} catch (e) {}
function f(s) {
	try {
		throw 'FAIL';
	} catch (e) {
		return s;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 'eeeeee';
 try {
 	console.log(f('PASS'));
-} catch (e) {}
-function f(t) {
+} catch {}
+function f(e) {
 	try {
 		throw 'FAIL';
-	} catch (e) {
-		return t;
+	} catch {
+		return e;
 	}
 }

```

## `terser/issue_1105/assorted_Infinity_NaN_undefined_in_with_scope_keep_infinity`

- tags: `join vars`, `remove unused`
- size: oxc 221 vs reference 227 (no whitespaces: -6, formatted: -16)

```js
var f = console.log;
var o = {
	undefined: 3,
	NaN: 4,
	Infinity: 5
};
if (o) {
	f(undefined, void 0);
	f(NaN, 0 / 0);
	f(Infinity, 1 / 0);
	f(-Infinity, -(1 / 0));
	f(2 + 7 + undefined, 2 + 7 + void 0);
}
with(o) {
	f(undefined, void 0);
	f(NaN, 0 / 0);
	f(Infinity, 1 / 0);
	f(-Infinity, -(1 / 0));
	f(2 + 7 + undefined, 2 + 7 + void 0);
}

```

```diff
--- reference
+++ oxc
@@ -7,13 +7,13 @@
 	f(void 0, void 0);
 	f(NaN, NaN);
 	f(Infinity, 1 / 0);
-	f(-Infinity, -1 / 0);
+	f(-Infinity, -Infinity);
 	f(NaN, NaN);
 }
 with(o) {
-	f(undefined, void 0);
-	f(NaN, 0 / 0);
+	f(void 0, void 0);
+	f(NaN, NaN);
 	f(Infinity, 1 / 0);
-	f(-Infinity, -1 / 0);
-	f(9 + undefined, 9 + void 0);
+	f(-Infinity, -Infinity);
+	f(NaN, NaN);
 }

```

## `terser/issue_640/negate_iife_4`

- tags: `sequences`
- size: oxc 98 vs reference 104 (no whitespaces: -6, formatted: -6)

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
@@ -1,5 +1,5 @@
-!(function() {
+(function() {
 	return t;
-})() ? console.log(false) : console.log(true), (function() {
+})() ? console.log(!0) : console.log(!1), (function() {
 	console.log('something');
 })();

```

## `terser/issue_640/negate_iife_5`

- tags: `sequences`
- size: oxc 82 vs reference 88 (no whitespaces: -6, formatted: -6)

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
@@ -1,5 +1,5 @@
-!(function() {
+(function() {
 	return t;
-})() ? bar(false) : foo(true), (function() {
+})() ? foo(!0) : bar(!1), (function() {
 	console.log('something');
 })();

```

## `terser/negate_iife/negate_iife_3`

- tags: `sequences`
- size: oxc 57 vs reference 63 (no whitespaces: -6, formatted: -6)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function() {
+(function() {
 	return t;
-})() ? console.log(false) : console.log(true);
+})() ? console.log(!0) : console.log(!1);

```

## `terser/negate_iife/negate_iife_3_off`

- tags: `sequences`
- size: oxc 57 vs reference 63 (no whitespaces: -6, formatted: -6)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function() {
+(function() {
 	return t;
-})() ? console.log(false) : console.log(true);
+})() ? console.log(!0) : console.log(!1);

```

## `terser/negate_iife/negate_iife_3_side_effects`

- tags: `sequences`
- size: oxc 57 vs reference 63 (no whitespaces: -6, formatted: -6)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function() {
+(function() {
 	return t;
-})() ? console.log(false) : console.log(true);
+})() ? console.log(!0) : console.log(!1);

```

## `terser/negate_iife/negate_iife_4`

- tags: `sequences`
- size: oxc 98 vs reference 104 (no whitespaces: -6, formatted: -6)

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
@@ -1,5 +1,5 @@
-!(function() {
+(function() {
 	return t;
-})() ? console.log(false) : console.log(true), (function() {
+})() ? console.log(!0) : console.log(!1), (function() {
 	console.log('something');
 })();

```

## `terser/negate_iife/negate_iife_5`

- tags: `sequences`
- size: oxc 82 vs reference 88 (no whitespaces: -6, formatted: -6)

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
@@ -1,5 +1,5 @@
-!(function() {
+(function() {
 	return t;
-})() ? bar(false) : foo(true), (function() {
+})() ? foo(!0) : bar(!1), (function() {
 	console.log('something');
 })();

```

## `terser/object/computed_property_names_evaluated_1`

- size: oxc 16 vs reference 22 (no whitespaces: -6, formatted: -6)

```js
obj({
	[1 + 1]: 2,
	['x' + 'x']: 6
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 obj({
-	[2]: 2,
-	['xx']: 6
+	2: 2,
+	xx: 6
 });

```

## `terser/object/concise_methods_with_computed_property`

- size: oxc 70 vs reference 76 (no whitespaces: -6, formatted: -6)

```js
var foo = {
	[Symbol.iterator]() {
		return {};
	},
	[1 + 2]() {
		return 3;
	},
	['1' + '4']() {
		return 14;
	}
};

```

```diff
--- reference
+++ oxc
@@ -2,10 +2,10 @@
 	[Symbol.iterator]() {
 		return {};
 	},
-	[3]() {
+	3() {
 		return 3;
 	},
-	['14']() {
+	14() {
 		return 14;
 	}
 };

```

## `terser/object/getter_setter_with_computed_value`

- size: oxc 150 vs reference 156 (no whitespaces: -6, formatted: -8)

```js
class C {
	get ['a']() {
		return 'A';
	}
	set ['a'](value) {
		do_something(a);
	}
}
var x = { get [a.b]() {
	return 42;
} };
class MyArray extends Array {
	get [Symbol.species]() {
		return Array;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 class C {
-	get ['a']() {
+	get a() {
 		return 'A';
 	}
-	set ['a'](value) {
+	set a(value) {
 		do_something(a);
 	}
 }

```

## `terser/parameters/regression_assign_arrow_functions`

- size: oxc 33 vs reference 39 (no whitespaces: -6, formatted: -6)

```js
oninstall = (e) => false;
oninstall = () => false;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-oninstall = (e) => false;
-oninstall = () => false;
+oninstall = (e) => !1;
+oninstall = () => !1;

```

## `terser/properties/dot_properties`

- size: oxc 90 vs reference 96 (no whitespaces: -6, formatted: -6)

```js
a['foo'] = 'bar';
a['if'] = 'if';
a['*'] = 'asterisk';
a['ຳ'] = 'unicode';
a[''] = 'whitespace';
a['1_1'] = 'foo';

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 a.foo = 'bar';
-a['if'] = 'if';
+a.if = 'if';
 a['*'] = 'asterisk';
-a['ຳ'] = 'unicode';
+a.ຳ = 'unicode';
 a[''] = 'whitespace';
 a['1_1'] = 'foo';

```

## `terser/reduce_vars/reduce_vars`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 218 vs reference 224 (no whitespaces: -6, formatted: -10)

```js
var A = 1;
(function f0() {
	var a = 2;
	console.log(a - 5);
	console.log(A - 5);
})();
(function f1() {
	var a = 2;
	console.log(a - 5);
	eval('console.log(a);');
})();
(function f2(eval) {
	var a = 2;
	console.log(a - 5);
	eval('console.log(a);');
})(eval);
(function f3() {
	var b = typeof C !== 'undefined';
	var c = 4;
	if (b) {
		return 'yes';
	} else {
		return 'no';
	}
})();
console.log(A + 1);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,10 @@
 var A = 1;
 (function() {
-	console.log(-3);
-	console.log(A - 5);
-})();
-(function f1() {
+	console.log(-3), console.log(A - 5);
+})(), (function f1() {
 	var a = 2;
-	console.log(a - 5);
-	eval('console.log(a);');
-})();
-(function f2(eval) {
+	console.log(a - 5), eval('console.log(a);');
+})(), (function f2(eval) {
 	var a = 2;
-	console.log(a - 5);
-	eval('console.log(a);');
-})(eval);
-'yes';
-console.log(A + 1);
+	console.log(a - 5), eval('console.log(a);');
+})(eval), console.log(A + 1);

```

## `terser/reduce_vars/try_abort`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 72 (no whitespaces: -6, formatted: -9)

```js
!(function() {
	try {
		var a = 1;
		throw '';
		var b = 2;
	} catch (e) {}
	console.log(a, b);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-!(function() {
+(function() {
 	try {
 		var a = 1;
 		throw '';
-		var b = 2;
-	} catch (e) {}
+		var b;
+	} catch {}
 	console.log(a, b);
 })();

```

## `terser/sequences/issue_2313`

- tags: `join vars`, `sequences`
- size: oxc 111 vs reference 117 (no whitespaces: -6, formatted: -6)

```js
var a = 0, b = 0;
var foo = {
	get c() {
		a++;
		return 42;
	},
	set c(c) {
		b++;
	},
	d: function() {
		this.c++;
		if (this.c) console.log(a, b);
	}
};
foo.d();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a = 0, b = 0;
-var foo = {
+var a = 0, b = 0, foo = {
 	get c() {
 		return a++, 42;
 	},
@@ -7,7 +6,7 @@
 		b++;
 	},
 	d: function() {
-		if (this.c++, this.c) console.log(a, b);
+		this.c++, this.c && console.log(a, b);
 	}
 };
 foo.d();

```

## `terser/switch/constant_switch_7`

- size: oxc 86 vs reference 92 (no whitespaces: -6, formatted: -15)

```js
OUT: {
	foo();
	switch (1) {
		case 1:
			x();
			if (foo) break OUT;
			for (var x = 0; x < 10; x++) {
				if (x > 5) break;
				console.log(x);
			}
			y();
		case 1 + 1:
			bar();
			break;
		default: def();
	}
}

```

```diff
--- reference
+++ oxc
@@ -2,10 +2,7 @@
 	foo();
 	x();
 	if (foo) break OUT;
-	for (var x = 0; x < 10; x++) {
-		if (x > 5) break;
-		console.log(x);
-	}
+	for (var x = 0; x < 10 && !(x > 5); x++) console.log(x);
 	y();
 	bar();
 }

```

## `terser/template_string/regex_1`

- size: oxc 42 vs reference 48 (no whitespaces: -6, formatted: -6)

```js
console.log(`${/a/} ${6 / 2} ${/b/.test('b')} ${1 ? /c/ : /d/}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`${/a/} 3 ${/b/.test('b')} ${/c/}`);
+console.log(`/a/ 3 ${/b/.test('b')} /c/`);

```

## `terser/template_string/semicolons`

- size: oxc 4 vs reference 10 (no whitespaces: -6, formatted: -7)

```js
foo;
`bar`;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
 foo;
-'bar';

```

## `terser/typeof/issue_1668`

- size: oxc 0 vs reference 6 (no whitespaces: -6, formatted: -8)

```js
if (typeof bar);

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-if (1);

```

## `terser/export/export_default_anonymous_function_not_call`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`
- size: oxc 27 vs reference 34 (no whitespaces: -7, formatted: -7)

```js
export default (function() {})(foo);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export default (function() {})(foo);
+export default (foo, void 0);

```

## `terser/hoist_vars/statements_funs`

- size: oxc 52 vs reference 59 (no whitespaces: -7, formatted: -10)

```js
function f() {
	var a = 1;
	var b = 2;
	var c = 3;
	function g() {}
	return g(a, b, c);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f() {
+	var a = 1;
+	var b = 2;
+	var c = 3;
 	function g() {}
-	var a = 1, b = 2, c = 3;
-	return g(a, b, c);
 }

```

## `terser/issue_1466/different_variable_in_multiple_forOf`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 102 vs reference 109 (no whitespaces: -7, formatted: -12)

```js
var test = [
	'a',
	'b',
	'c'
];
for (let tmp of test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (let t of dd) {
		console.log(t);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,13 +3,11 @@
 	'b',
 	'c'
 ];
-for (let o of test) {
-	console.log(o);
-	let e;
-	e = [
+for (let tmp of test) {
+	console.log(tmp);
+	for (let t of [
 		'e',
 		'f',
 		'g'
-	];
-	for (let o of e) console.log(o);
+	]) console.log(t);
 }

```

## `terser/issue_1466/same_variable_in_multiple_forOf_sequences_const`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 106 vs reference 113 (no whitespaces: -7, formatted: -11)

```js
var test = [
	'a',
	'b',
	'c'
];
for (const tmp of test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (const tmp of dd) {
		console.log(tmp);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,12 +3,11 @@
 	'b',
 	'c'
 ];
-for (const o of test) {
-	let t;
-	console.log(o), t = [
+for (let tmp of test) {
+	console.log(tmp);
+	for (let tmp of [
 		'e',
 		'f',
 		'g'
-	];
-	for (const o of t) console.log(o);
+	]) console.log(tmp);
 }

```

## `terser/issue_1733/function_iife_catch`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 73 vs reference 80 (no whitespaces: -7, formatted: -13)

```js
function f(n) {
	!(function() {
		try {
			throw 0;
		} catch (n) {
			var a = 1;
			console.log(n, a);
		}
	})();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
-function f(n) {
-	!function() {
+function f(e) {
+	(function() {
 		try {
 			throw 0;
-		} catch (o) {
-			var n = 1;
-			console.log(o, n);
+		} catch (e) {
+			console.log(e, 1);
 		}
-	}();
+	})();
 }
 f();

```

## `terser/pure_funcs/boolean_and`

- tags: `pure functions`
- size: oxc 44 vs reference 51 (no whitespaces: -7, formatted: -9)

```js
foo() && foo();
foo() && bar();
foo() && 'bar';
bar() && foo();
bar() && bar();
bar() && 'bar';
'bar' && foo();
'bar' && bar();
'bar' && 'bar';

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 bar();
 bar() && bar();
 bar();
-'bar' && bar();
+bar();

```

## `terser/pure_getters/collapse_vars_1_true`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 38 vs reference 45 (no whitespaces: -7, formatted: -15)

```js
function f(a, b) {
	for (;;) {
		var c = a.g();
		var d = b.p;
		if (c || d) break;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
 function f(a, b) {
-	for (;;) {
-		if (a.g() || b.p) break;
-	}
+	for (; !(a.g() || b.p););
 }

```

## `terser/reduce_vars/recursive_inlining_5`

- tags: `join vars`, `remove unused`
- size: oxc 184 vs reference 191 (no whitespaces: -7, formatted: -7)

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
	bar(5);
	foo(3);
})();

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,15 @@
-!(function() {
+(function() {
 	function foo(x) {
 		console.log('foo', x);
-		if (x) bar(x - 1);
+		x && bar(x - 1);
 	}
 	function bar(x) {
 		console.log('bar', x);
-		if (x) qux(x - 1);
+		x && qux(x - 1);
 	}
 	function qux(x) {
 		console.log('qux', x);
-		if (x) foo(x - 1);
+		x && foo(x - 1);
 	}
 	qux(4);
 	bar(5);

```

## `terser/rename/function_iife_catch`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 73 vs reference 80 (no whitespaces: -7, formatted: -13)

```js
function f(n) {
	!(function() {
		try {
			throw 0;
		} catch (n) {
			var a = 1;
			console.log(n, a);
		}
	})();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
-function f(n) {
-	!function() {
+function f(e) {
+	(function() {
 		try {
 			throw 0;
-		} catch (o) {
-			var n = 1;
-			console.log(o, n);
+		} catch (e) {
+			console.log(e, 1);
 		}
-	}();
+	})();
 }
 f();

```

## `terser/sequences/hoist_decl`

- tags: `join vars`, `sequences`
- size: oxc 32 vs reference 39 (no whitespaces: -7, formatted: -10)

```js
var a;
w();
var b = x();
y();
for (var c; 0;) z();
var d;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a;
 w();
-var b = x(), c, d;
-for (y(); 0;) z();
+var b = x();
+y();
+var c, d;

```

## `terser/template_string/allow_null_character`

- size: oxc 7 vs reference 14 (no whitespaces: -7, formatted: -8)

```js
`\0`;
`\0${x}`;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-'\0';
-`\0${x}`;
+`${x}`;

```

## `terser/arguments/modified_strict`

- tags: `join vars`
- size: oxc 168 vs reference 176 (no whitespaces: -8, formatted: -10)

```js
'use strict';
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
@@ -1,8 +1,6 @@
 'use strict';
 (function(a, b) {
-	var c = arguments[0];
-	var d = arguments[1];
-	var a = 'foo';
+	var c = arguments[0], d = arguments[1], a = 'foo';
 	b++;
 	arguments[0] = 'moo';
 	arguments[1] *= 2;

```

## `terser/block_scope/regression_block_scope_resolves`

- size: oxc 145 vs reference 153 (no whitespaces: -8, formatted: -12)

```js
(function() {
	if (1) {
		let x;
		const y = 1;
		class Zee {}
	}
	if (1) {
		let ex;
		const why = 2;
		class Zi {}
	}
	console.log(typeof x, typeof y, typeof Zee, typeof ex, typeof why, typeof Zi);
})();

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
 (function() {
-	if (1) {
-		let e;
-		const o = 1;
-		class t {}
+	{
+		let x;
+		let y = 1;
+		class Zee {}
 	}
-	if (1) {
-		let e;
-		const o = 2;
-		class t {}
+	{
+		let ex;
+		let why = 2;
+		class Zi {}
 	}
 	console.log(typeof x, typeof y, typeof Zee, typeof ex, typeof why, typeof Zi);
 })();

```

## `terser/collapse_vars/collapse_vars_do_while`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 265 vs reference 273 (no whitespaces: -8, formatted: -21)

```js
function f1(y) {
	var c = 9;
	do {} while (c === 77);
}
function f2(y) {
	var c = 5 - y;
	do {} while (c);
}
function f3(y) {
	function fn(n) {
		console.log(n);
	}
	var a = 2, x = 7;
	do {
		fn(a = x);
		break;
	} while (y);
}
function f4(y) {
	var a = y / 4;
	do {
		return a;
	} while (y);
}
function f5(y) {
	function p(x) {
		console.log(x);
	}
	do {
		var a = y - 3;
		p(a);
	} while (--y);
}

```

```diff
--- reference
+++ oxc
@@ -1,32 +1,34 @@
 function f1(y) {
 	var c = 9;
-	do {} while (77 === c);
+	do;
+	while (c === 77);
 }
 function f2(y) {
 	var c = 5 - y;
-	do {} while (c);
+	do;
+	while (c);
 }
 function f3(y) {
 	function fn(n) {
 		console.log(n);
 	}
-	var a = 2, x = 7;
+	var x = 7;
 	do {
-		fn(a = x);
+		fn(x);
 		break;
 	} while (y);
 }
 function f4(y) {
 	var a = y / 4;
-	do {
+	do
 		return a;
-	} while (y);
+	while (y);
 }
 function f5(y) {
 	function p(x) {
 		console.log(x);
 	}
-	do {
+	do
 		p(y - 3);
-	} while (--y);
+	while (--y);
 }

```

## `terser/collapse_vars/collapse_vars_try`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 137 vs reference 145 (no whitespaces: -8, formatted: -10)

```js
function f1() {
	try {
		var a = 1;
		return a;
	} catch (ex) {
		var b = 2;
		return b;
	} finally {
		var c = 3;
		return c;
	}
}
function f2() {
	var t = could_throw();
	try {
		return t + might_throw();
	} catch (ex) {
		return 3;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f1() {
 	try {
 		return 1;
-	} catch (ex) {
+	} catch {
 		return 2;
 	} finally {
 		return 3;
@@ -11,7 +11,7 @@
 	var t = could_throw();
 	try {
 		return t + might_throw();
-	} catch (ex) {
+	} catch {
 		return 3;
 	}
 }

```

## `terser/collapse_vars/issue_2364_1`

- tags: `join vars`, `pure getters`
- size: oxc 197 vs reference 205 (no whitespaces: -8, formatted: -9)

```js
function inc(obj) {
	return obj.count++;
}
function foo() {
	var first = arguments[0];
	var result = inc(first);
	return foo.amount = first.count, result;
}
var data = { count: 0 };
var answer = foo(data);
console.log(foo.amount, answer);

```

```diff
--- reference
+++ oxc
@@ -2,10 +2,8 @@
 	return obj.count++;
 }
 function foo() {
-	var first = arguments[0];
-	var result = inc(first);
+	var first = arguments[0], result = inc(first);
 	return foo.amount = first.count, result;
 }
-var data = { count: 0 };
-var answer = foo(data);
+var data = { count: 0 }, answer = foo(data);
 console.log(foo.amount, answer);

```

## `terser/collapse_vars/issue_2571_1`

- tags: `join vars`
- size: oxc 74 vs reference 82 (no whitespaces: -8, formatted: -10)

```js
var b = 1;
try {
	var a = (function f0(c) {
		throw c;
	})(2);
	var d = --b + a;
} catch (e) {}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 var b = 1;
 try {
-	var a = function f0(c) {
+	var a = (function(c) {
 		throw c;
-	}(2);
-	var d = --b + a;
-} catch (e) {}
+	})(2), d = --b + a;
+} catch {}
 console.log(b);

```

## `terser/conditionals/ifs_5`

- tags: `sequences`
- size: oxc 75 vs reference 83 (no whitespaces: -8, formatted: -22)

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
@@ -1,12 +1,6 @@
 function f() {
-	if (!foo) {
-		bar();
-		baz();
-	}
+	foo || (bar(), baz());
 }
 function g() {
-	if (!(foo || bar || baz || baa)) {
-		a();
-		b();
-	}
+	foo || bar || baz || baa || (a(), b());
 }

```

## `terser/conditionals/issue_2994`

- tags: `sequences`
- size: oxc 256 vs reference 264 (no whitespaces: -8, formatted: +5)

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
@@ -1,13 +1,15 @@
 function f(condition1, condition2, condition3) {
-	if (condition1) if (condition2) return aValue;
-	else {
-		const variable1 = 'something';
-		if (!condition3) return;
+	if (condition1) {
+		if (condition2) return aValue;
 		{
-			const variable2 = 'else';
-			return anotherValue;
+			let variable1 = 'something';
+			if (condition3) {
+				let variable2 = 'else';
+				return anotherValue;
+			}
+			return;
 		}
 	}
 }
 let aValue = 2, anotherValue = 3;
-for (let i = 0; i < 8; ++i) console.log(f(4 & i, 2 & i, 1 & i));
+for (let i = 0; i < 8; ++i) console.log(f(i & 4, i & 2, i & 1));

```

## `terser/defaults/defaults_false`

- size: oxc 15 vs reference 23 (no whitespaces: -8, formatted: -10)

```js
if (true) {
	console.log(1 + 2);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if (true) console.log(3);
+console.log(3);

```

## `terser/defaults/defaults_false_evaluate_true`

- size: oxc 15 vs reference 23 (no whitespaces: -8, formatted: -10)

```js
if (true) {
	console.log(1 + 2);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if (true) console.log(3);
+console.log(3);

```

## `terser/defaults/defaults_undefined`

- size: oxc 15 vs reference 23 (no whitespaces: -8, formatted: -10)

```js
if (true) {
	console.log(1 + 2);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if (true) console.log(3);
+console.log(3);

```

## `terser/destructuring/destructuring_expressions`

- size: oxc 13 vs reference 21 (no whitespaces: -8, formatted: -14)

```js
({
	a,
	b
});
[{ a }];
f({ x });

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
-({
-	a,
-	b
-});
-[{ a }];
+a, b;
+a;
 f({ x });

```

## `terser/destructuring/issue_2044_ecma_5`

- size: oxc 18 vs reference 26 (no whitespaces: -8, formatted: -22)

```js
({x: a = 1, y: y = 2 + b, z: z = 3 - c} = obj);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-({x: a = 1, y: y = 2 + b, z: z = 3 - c} = obj);
+({x: a = 1, y, z} = obj);

```

## `terser/destructuring/issue_2044_ecma_5_beautify`

- size: oxc 18 vs reference 26 (no whitespaces: -8, formatted: -22)

```js
({x: a = 1, y: y = 2 + b, z: z = 3 - c} = obj);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-({x: a = 1, y: y = 2 + b, z: z = 3 - c} = obj);
+({x: a = 1, y, z} = obj);

```

## `terser/evaluate/issue_2535_2`

- tags: `sequences`
- size: oxc 60 vs reference 68 (no whitespaces: -8, formatted: -12)

```js
x() || true || y();
(x() || true) && y();
x() && true || y();
x() && true && y();
x() || false || y();
(x() || false) && y();
x() && false || y();
x() && false && y();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-x(), x(), y(), x() && 1 || y(), x() && y(), x() || y(), (x() || 0) && y(), x(), y(), x();
+x(), x(), y(), x() || y(), x() && y(), x() || y(), x() && y(), x(), y(), x();

```

## `terser/export/issue_333`

- tags: `join vars`
- size: oxc 138 vs reference 146 (no whitespaces: -8, formatted: -8)

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
@@ -1,7 +1,7 @@
-var setToString;
-var _setToString = function shortOut() {
+function shortOut() {
 	return function() {};
-}();
+}
+var _setToString = shortOut();
 export function baseRest() {
 	return _setToString();
 }

```

## `terser/functions/inline_0`

- size: oxc 97 vs reference 105 (no whitespaces: -8, formatted: -12)

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
@@ -5,6 +5,5 @@
 	console.log(a);
 })(2);
 (function(b) {
-	var c = b;
-	console.log(c);
+	console.log(b);
 })(3);

```

## `terser/functions/inline_false`

- size: oxc 97 vs reference 105 (no whitespaces: -8, formatted: -12)

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
@@ -5,6 +5,5 @@
 	console.log(a);
 })(2);
 (function(b) {
-	var c = b;
-	console.log(c);
+	console.log(b);
 })(3);

```

## `terser/global_defs/must_replace`

- size: oxc 15 vs reference 23 (no whitespaces: -8, formatted: -8)

```js
console.log(D);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('foo bar');
+console.log(D);

```

## `terser/logical_assignment/assign_in_conditional_part_reused`

- tags: `join vars`, `remove unused`
- size: oxc 162 vs reference 170 (no whitespaces: -8, formatted: -8)

```js
var status = 'PASS';
var nil = null;
var nil_prop = { prop: null };
nil &&= console.log(status = 'FAIL');
nil_prop.prop &&= console.log(status = 'FAIL');
console.log(status, nil, nil_prop.prop);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
-var status = 'PASS';
-var nil = null;
-var nil_prop = { prop: null };
+var status = 'PASS', nil = null, nil_prop = { prop: null };
 nil &&= console.log(status = 'FAIL');
 nil_prop.prop &&= console.log(status = 'FAIL');
 console.log(status, nil, nil_prop.prop);

```

## `terser/logical_assignment/prematurely_evaluate_assignment`

- tags: `join vars`, `remove unused`
- size: oxc 124 vs reference 132 (no whitespaces: -8, formatted: -8)

```js
var or = null;
var null_coalesce = null;
var and = 'FAIL';
or ||= 'PASS';
null_coalesce ??= 'PASS';
and &&= 'PASS';
console.log(or, null_coalesce, and);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
-var or = null;
-var null_coalesce = null;
-var and = 'FAIL';
+var or = null, null_coalesce = null, and = 'FAIL';
 or ||= 'PASS';
 null_coalesce ??= 'PASS';
 and &&= 'PASS';

```

## `terser/logical_assignment/prematurely_evaluate_assignment_inv`

- tags: `join vars`, `remove unused`
- size: oxc 128 vs reference 136 (no whitespaces: -8, formatted: -8)

```js
var or = 'PASS';
var null_coalesce = 'PASS';
var and = 'FAIL';
or ||= 'FAIL';
null_coalesce ??= 'FAIL';
and &&= 'PASS';
console.log(or, null_coalesce, and);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
-var or = 'PASS';
-var null_coalesce = 'PASS';
-var and = 'FAIL';
+var or = 'PASS', null_coalesce = 'PASS', and = 'FAIL';
 or ||= 'FAIL';
 null_coalesce ??= 'FAIL';
 and &&= 'PASS';

```

## `terser/object/getter_setter`

- size: oxc 401 vs reference 409 (no whitespaces: -8, formatted: -8)

```js
var get = 'bar';
var a = {
	get,
	set: 'foo',
	get bar() {
		return this.get;
	},
	get 5() {
		return 'five';
	},
	get 3925() {
		return 'f five five';
	},
	get five() {
		return 5;
	},
	set one(value) {
		this._one = value;
	},
	set 9(value) {
		this._nine = value;
	},
	set 10(value) {
		this._ten = value;
	},
	set eleven(value) {
		this._eleven = value;
	}
};
var b = {
	get() {
		return 'gift';
	},
	set: function(code) {
		return 'Storing code ' + code;
	}
};
var c = {
	['get']: 'foo',
	['set']: 'bar'
};
var d = {
	get: 'foo',
	set: 'bar'
};

```

```diff
--- reference
+++ oxc
@@ -36,8 +36,8 @@
 	}
 };
 var c = {
-	['get']: 'foo',
-	['set']: 'bar'
+	get: 'foo',
+	set: 'bar'
 };
 var d = {
 	get: 'foo',

```

## `terser/template_string/tagged_template_with_comment`

- size: oxc 56 vs reference 64 (no whitespaces: -8, formatted: -10)

```js
console.log(String.raw`\u`);
console.log((() => String.raw)()`\x`);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 console.log(String.raw`\u`);
-console.log((() => String.raw)()`\x`);
+console.log(String.raw`\x`);

```

## `terser/collapse_vars/cascade_return`

- tags: `join vars`
- size: oxc 27 vs reference 36 (no whitespaces: -9, formatted: -11)

```js
function f(a) {
	return a = x();
	return a;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function f(a) {
 	return a = x();
-	return a;
 }

```

## `terser/collapse_vars/collapse_vars_if`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 156 vs reference 165 (no whitespaces: -9, formatted: -19)

```js
function f1() {
	var not_used = sideeffect(), x = g1 + g2;
	var y = x / 4, z = 'Bar' + y;
	if ('x' != z) {
		return g9;
	} else return g5;
}
function f2() {
	var x = g1 + g2, not_used = sideeffect();
	var y = x / 4;
	var z = 'Bar' + y;
	if ('x' != z) {
		return g9;
	} else return g5;
}
function f3(x) {
	if (x) {
		var a = 1;
		return a;
	} else {
		var b = 2;
		return b;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,10 @@
 function f1() {
-	sideeffect();
-	return 'x' != 'Bar' + (g1 + g2) / 4 ? g9 : g5;
+	return sideeffect(), 'Bar' + (g1 + g2) / 4 == 'x' ? g5 : g9;
 }
 function f2() {
 	var x = g1 + g2;
-	sideeffect();
-	return 'x' != 'Bar' + x / 4 ? g9 : g5;
+	return sideeffect(), 'Bar' + x / 4 == 'x' ? g5 : g9;
 }
 function f3(x) {
-	if (x) {
-		return 1;
-	}
-	return 2;
+	return x ? 1 : 2;
 }

```

## `terser/collapse_vars/issue_2914_2`

- tags: `join vars`
- size: oxc 131 vs reference 140 (no whitespaces: -9, formatted: -9)

```js
function read(input) {
	var i = 0;
	var e = 0;
	var t = 0;
	while (e < 32) {
		var n = input[i++];
		t = (127 & n) << e;
		if (0 === (128 & n)) return t;
		e += 7;
	}
}
console.log(read([129]));

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 function read(input) {
-	var i = 0;
-	var e = 0;
-	var t = 0;
-	while (e < 32) {
+	var i = 0, e = 0, t = 0;
+	for (; e < 32;) {
 		var n = input[i++];
-		if (0 === (128 & n)) return t = (127 & n) << e;
+		t = (127 & n) << e;
+		if (!(128 & n)) return t;
 		e += 7;
 	}
 }

```

## `terser/collapse_vars/issue_315`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 184 vs reference 193 (no whitespaces: -9, formatted: -10)

```js
console.log((function(s) {
	var w, _i, _len, _ref, _results;
	_ref = s.trim().split(' ');
	_results = [];
	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		w = _ref[_i];
		_results.push(w.toLowerCase());
	}
	return _results;
})('test'));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-console.log((function() {
-	var w, _i, _len, _ref, _results;
-	for (_results = [], _i = 0, _len = (_ref = 'test'.trim().split(' ')).length; _i < _len; _i++) w = _ref[_i], _results.push(w.toLowerCase());
+console.log((function(s) {
+	var w, _i, _len, _ref = s.trim().split(' '), _results = [];
+	for (_i = 0, _len = _ref.length; _i < _len; _i++) w = _ref[_i], _results.push(w.toLowerCase());
 	return _results;
-})());
+})('test'));

```

## `terser/collapse_vars/unsafe_builtin`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 69 (no whitespaces: -9, formatted: -8)

```js
function f(a) {
	var b = Math.abs(a);
	return Math.pow(b, 2);
}
console.log(f(-1), f(2));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	return Math.pow(Math.abs(a), 2);
+	return Math.abs(a) ** 2;
 }
 console.log(f(-1), f(2));

```

## `terser/dead_code/throw_assignment`

- tags: `remove unused`
- size: oxc 673 vs reference 682 (no whitespaces: -9, formatted: -10)

```js
function f1() {
	throw a = x();
}
function f2(a) {
	throw a = x();
}
function f3() {
	var a;
	throw a = x();
}
function f4() {
	try {
		throw a = x();
	} catch (b) {
		console.log(a);
	}
}
function f5(a) {
	try {
		throw a = x();
	} catch (b) {
		console.log(a);
	}
}
function f6() {
	var a;
	try {
		throw a = x();
	} catch (b) {
		console.log(a);
	}
}
function f7() {
	try {
		throw a = x();
	} finally {
		console.log(a);
	}
}
function f8(a) {
	try {
		throw a = x();
	} finally {
		console.log(a);
	}
}
function f9() {
	var a;
	try {
		throw a = x();
	} finally {
		console.log(a);
	}
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
		f6,
		f7,
		f8,
		f9
	].forEach(function(f, i) {
		a = null;
		try {
			f(10 * (1 + i));
		} catch (x) {
			console.log('caught ' + x);
		}
		if (null !== a) console.log('a: ' + a);
	});
}
var x, a;
test(1);
test(-1);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	throw a = x();
 }
 function f2(a) {
-	throw x();
+	throw a = x();
 }
 function f3() {
 	throw x();
@@ -10,14 +10,14 @@
 function f4() {
 	try {
 		throw a = x();
-	} catch (b) {
+	} catch {
 		console.log(a);
 	}
 }
 function f5(a) {
 	try {
 		throw a = x();
-	} catch (b) {
+	} catch {
 		console.log(a);
 	}
 }
@@ -25,7 +25,7 @@
 	var a;
 	try {
 		throw a = x();
-	} catch (b) {
+	} catch {
 		console.log(a);
 	}
 }
@@ -75,7 +75,7 @@
 		} catch (x) {
 			console.log('caught ' + x);
 		}
-		if (null !== a) console.log('a: ' + a);
+		a !== null && console.log('a: ' + a);
 	});
 }
 var x, a;

```

## `terser/destructuring/destructuring_assign_of_computed_key`

- tags: `remove unused`
- size: oxc 47 vs reference 56 (no whitespaces: -9, formatted: -11)

```js
let x;
let four = 4;
({[5 + 2 - four]: x} = { [1 + 2]: 42 });
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 let x;
 let four = 4;
-({[7 - four]: x} = { [3]: 42 });
+({3: x} = { 3: 42 });
 console.log(x);

```

## `terser/destructuring/destructuring_decl_of_computed_key`

- tags: `remove unused`
- size: oxc 42 vs reference 51 (no whitespaces: -9, formatted: -11)

```js
let four = 4;
let { [7 - four]: x } = { [1 + 2]: 42 };
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 let four = 4;
-let { [7 - four]: x } = { [3]: 42 };
+let { 3: x } = { 3: 42 };
 console.log(x);

```

## `terser/export/issue_2977`

- size: oxc 22 vs reference 31 (no whitespaces: -9, formatted: -11)

```js
export default (function() {})();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export default (function() {})();
+export default void 0;

```

## `terser/global_defs/issue_3217`

- tags: `join vars`, `remove unused`
- size: oxc 7 vs reference 16 (no whitespaces: -9, formatted: -9)

```js
o.fn();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(42);
+o.fn();

```

## `terser/issue_1446/undefined_redefined_mangle`

- size: oxc 31 vs reference 40 (no whitespaces: -9, formatted: -14)

```js
function f(undefined) {
	var n = 1;
	return typeof n == 'undefined';
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-function f(n) {
-	var r = 1;
-	return void 0 === r;
+function f(undefined) {
+	return !1;
 }

```

## `terser/issue_1569/inner_reference`

- size: oxc 40 vs reference 49 (no whitespaces: -9, formatted: -10)

```js
!(function f(a) {
	return a && f(a - 1) + a;
})(42);
!(function g(a) {
	return a;
})(42);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-!(function f(a) {
+(function f(a) {
 	return a && f(a - 1) + a;
 })(42);
-!void 0;

```

## `terser/issue_1733/function_iife_catch_ie8`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 73 vs reference 82 (no whitespaces: -9, formatted: -15)

```js
function f(n) {
	!(function() {
		try {
			throw 0;
		} catch (n) {
			var a = 1;
			console.log(n, a);
		}
	})();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
-function f(o) {
-	!(function() {
+function f(e) {
+	(function() {
 		try {
 			throw 0;
-		} catch (o) {
-			var c = 1;
-			console.log(o, c);
+		} catch (e) {
+			console.log(e, 1);
 		}
 	})();
 }

```

## `terser/reduce_vars/booleans`

- tags: `join vars`
- size: oxc 83 vs reference 92 (no whitespaces: -9, formatted: -14)

```js
console.log((function(a) {
	if (a != 0);
	switch (a) {
		case 0: return 'FAIL';
		case false: return 'PASS';
	}
})(false));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 console.log((function(a) {
-	if (0 != a);
 	switch (a) {
 		case 0: return 'FAIL';
 		case !1: return 'PASS';

```

## `terser/rename/function_iife_catch_ie8`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 73 vs reference 82 (no whitespaces: -9, formatted: -15)

```js
function f(n) {
	!(function() {
		try {
			throw 0;
		} catch (n) {
			var a = 1;
			console.log(n, a);
		}
	})();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
-function f(o) {
-	!(function() {
+function f(e) {
+	(function() {
 		try {
 			throw 0;
-		} catch (o) {
-			var c = 1;
-			console.log(o, c);
+		} catch (e) {
+			console.log(e, 1);
 		}
 	})();
 }

```

## `terser/unsafe_symbols/unsafe_symbols_2`

- size: oxc 0 vs reference 9 (no whitespaces: -9, formatted: -10)

```js
Symbol('kDog');

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-Symbol();

```

## `terser/yield/yield_sub`

- size: oxc 70 vs reference 79 (no whitespaces: -9, formatted: -9)

```js
function* foo() {
	yield x['foo'];
	(yield x)['foo'];
	yield (yield obj.foo())['bar']();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function* foo() {
-	yield x['foo'];
-	(yield x)['foo'];
-	yield (yield obj.foo())['bar']();
+	yield x.foo;
+	(yield x).foo;
+	yield (yield obj.foo()).bar();
 }

```

## `terser/async/async_arrow_iife_negate_iife`

- size: oxc 37 vs reference 47 (no whitespaces: -10, formatted: -16)

```js
(async () => {
	await fetch();
})();
(() => {
	plain();
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
 (async () => {
 	await fetch();
 })();
-(() => {
-	plain();
-})();
+plain();

```

## `terser/collapse_vars/issue_2298`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 142 vs reference 152 (no whitespaces: -10, formatted: -11)

```js
!(function() {
	function f() {
		var a = undefined;
		var undefined = a++;
		try {
			!(function g(b) {
				b[1] = 'foo';
			})();
			console.log('FAIL');
		} catch (e) {
			console.log('PASS');
		}
	}
	f();
})();

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
-!function() {
-	(function() {
-		var a = undefined;
-		var undefined = a++;
+(function() {
+	function f() {
+		var a = undefined, undefined = a++;
 		try {
-			!function() {
-				(void 0)[1] = 'foo';
-			}();
+			(function(b) {
+				b[1] = 'foo';
+			})();
 			console.log('FAIL');
-		} catch (e) {
+		} catch {
 			console.log('PASS');
 		}
-	})();
-}();
+	}
+	f();
+})();

```

## `terser/harmony/arrow_function_parens`

- size: oxc 10 vs reference 20 (no whitespaces: -10, formatted: -14)

```js
something && (() => {});

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-something && (() => {});
+something;

```

## `terser/new/new_statements_3`

- size: oxc 138 vs reference 148 (no whitespaces: -10, formatted: -10)

```js
new (function(foo) {
	this.foo = foo;
})(1);
new (function(foo) {
	this.foo = foo;
})();
new (function test(foo) {
	this.foo = foo;
})(1);
new (function test(foo) {
	this.foo = foo;
})();

```

```diff
--- reference
+++ oxc
@@ -4,9 +4,9 @@
 new (function(foo) {
 	this.foo = foo;
 })();
-new (function test(foo) {
+new (function(foo) {
 	this.foo = foo;
 })(1);
-new (function test(foo) {
+new (function(foo) {
 	this.foo = foo;
 })();

```

## `terser/reduce_vars/issue_3068_1`

- tags: `join vars`
- size: oxc 48 vs reference 58 (no whitespaces: -10, formatted: -12)

```js
(function() {
	do {
		continue;
		var b = 'defined';
	} while (b && b.c);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 (function() {
 	do {
 		continue;
-		var b = 'defined';
+		var b;
 	} while (b && b.c);
 })();

```

## `terser/sequences/make_sequences_4`

- tags: `sequences`
- size: oxc 98 vs reference 108 (no whitespaces: -10, formatted: -11)

```js
x = 5;
if (y) z();
x = 5;
for (i = 0; i < 5; i++) console.log(i);
x = 5;
for (; i < 5; i++) console.log(i);
x = 5;
switch (y) {}
x = 5;
with(obj) {}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-if (x = 5, y) z();
-for (i = 0, x = 5; i < 5; i++) console.log(i);
+for (x = 5, y && z(), x = 5, i = 0; i < 5; i++) console.log(i);
 for (x = 5; i < 5; i++) console.log(i);
-switch (x = 5, y) {}
-with(x = 5, obj);
+x = 5, y, x = 5;
+with(obj) {}

```

## `terser/typeof/issue_2728_5`

- tags: `join vars`
- size: oxc 55 vs reference 65 (no whitespaces: -10, formatted: -10)

```js
(function arguments(arguments) {
	console.log(typeof arguments);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function arguments(arguments) {
+(function(arguments) {
 	console.log(typeof arguments);
 })();

```

## `terser/yield/yield_before_punctuators`

- size: oxc 147 vs reference 157 (no whitespaces: -10, formatted: -13)

```js
iter = (function* () {
	assignmentResult = [x = yield] = value;
})();
function* g1() {
	yield;
}
function* g2() {
	[yield];
}
function* g3() {
	yield, yield;
}
function* g4() {
	(yield) ? yield : yield;
}

```

```diff
--- reference
+++ oxc
@@ -5,11 +5,11 @@
 	yield;
 }
 function* g2() {
-	[yield];
+	yield;
 }
 function* g3() {
 	yield, yield;
 }
 function* g4() {
-	(yield) ? yield : yield;
+	yield, yield;
 }

```

## `terser/ascii/ascii_only_false_identifier_es2015`

- size: oxc 34 vs reference 45 (no whitespaces: -11, formatted: -14)

```js
function f() {
	var o = { 𝒜: true };
	return o.𝒜;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function f() {
-	var o = { 𝒜: true };
-	return o.𝒜;
+	return { 𝒜: !0 }.𝒜;
 }

```

## `terser/ascii/ascii_only_true_identifier_es2015`

- size: oxc 34 vs reference 45 (no whitespaces: -11, formatted: -14)

```js
function f() {
	var o = { 𝒜: true };
	return o.𝒜;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function f() {
-	var o = { 𝒜: true };
-	return o.𝒜;
+	return { 𝒜: !0 }.𝒜;
 }

```

## `terser/async/issue_3079`

- size: oxc 130 vs reference 141 (no whitespaces: -11, formatted: -16)

```js
(async) => 1;
var async = (async) => async;
console.log(async(1));
async = (async) => async;
console.log(async(2));
console.log({ m: (async) => async ? '3' : '4' }.m(true));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-(async) => 1;
 var async = (async) => async;
 console.log(async(1));
 async = (async) => async;
 console.log(async(2));
-console.log({ m: (async) => async ? '3' : '4' }.m(true));
+console.log({ m: (async) => async ? '3' : '4' }.m(!0));

```

## `terser/blocks/issue_1664`

- size: oxc 82 vs reference 93 (no whitespaces: -11, formatted: -15)

```js
var a = 1;
function f() {
	if (undefined) a = 2;
	{
		function undefined() {}
		undefined();
	}
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 var a = 1;
 function f() {
-	if (undefined) a = 2;
+	undefined && (a = 2);
 	{
 		function undefined() {}
-		undefined();
 	}
 }
 f();

```

## `terser/collapse_vars/issue_2914_1`

- tags: `join vars`
- size: oxc 132 vs reference 143 (no whitespaces: -11, formatted: -14)

```js
function read(input) {
	var i = 0;
	var e = 0;
	var t = 0;
	while (e < 32) {
		var n = input[i++];
		t |= (127 & n) << e;
		if (0 === (128 & n)) return t;
		e += 7;
	}
}
console.log(read([129]));

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,9 @@
 function read(input) {
-	var i = 0;
-	var e = 0;
-	var t = 0;
-	while (e < 32) {
+	var i = 0, e = 0, t = 0;
+	for (; e < 32;) {
 		var n = input[i++];
 		t |= (127 & n) << e;
-		if (0 === (128 & n)) return t;
+		if (!(128 & n)) return t;
 		e += 7;
 	}
 }

```

## `terser/collapse_vars/issue_2954_3`

- tags: `join vars`
- size: oxc 100 vs reference 111 (no whitespaces: -11, formatted: -21)

```js
var a = 'FAIL_1', b;
try {} finally {
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
@@ -1,10 +1,9 @@
-var b, a = 'FAIL_1';
-try {} finally {
-	do {
-		a = 'FAIL_2';
-		(b = function() {
-			throw Error('PASS');
-		}()) && b.c;
-	} while (0);
-}
+var a = 'FAIL_1', b;
+do {
+	b = (function() {
+		throw Error('PASS');
+	})();
+	a = 'FAIL_2';
+	b && b.c;
+} while (0);
 console.log(a);

```

## `terser/drop_unused/issue_1715_3`

- tags: `remove unused`
- size: oxc 65 vs reference 76 (no whitespaces: -11, formatted: -20)

```js
var a = 1;
function f() {
	a++;
	try {
		console;
	} catch (a) {
		var a = 2 + x();
	}
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,8 @@
 var a = 1;
 function f() {
 	a++;
-	try {
-		console;
-	} catch (a) {
+	try {} catch (a) {
 		var a;
-		x();
 	}
 }
 f();

```

## `terser/evaluate/or`

- size: oxc 412 vs reference 423 (no whitespaces: -11, formatted: -14)

```js
var a;
a = true || condition;
a = 1 || console.log('a');
a = 2 * 3 || 2 * condition;
a = 5 == 5 || condition + 3;
a = 'string' || 4 - condition;
a = 5 + '' || condition / 5;
a = -4.5 || 6 << condition;
a = 6 || 7;
a = false || condition;
a = 0 || console.log('b');
a = NaN || console.log('c');
a = undefined || 2 * condition;
a = null || condition + 3;
a = 2 * 3 - 6 || 4 - condition;
a = 10 == 7 || condition / 5;
a = !'string' || 6 % condition;
a = null || 7;
a = console.log(undefined && condition || null);
a = console.log(undefined || condition && null);
a = condition || true;
a = console.log('a') || 2;
a = 4 - condition || 'string';
a = 6 << condition || -4.5;
a = condition || false;
a = console.log('b') || NaN;
a = console.log('c') || 0;
a = 2 * condition || undefined;
a = condition + 3 || null;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
-var a;
-a = true;
+var a = !0;
 a = 1;
 a = 6;
-a = true;
+a = !0;
 a = 'string';
 a = '5';
 a = -4.5;
@@ -18,12 +17,12 @@
 a = 7;
 a = console.log(null);
 a = console.log(condition && null);
-a = condition || true;
+a = condition || !0;
 a = console.log('a') || 2;
 a = 4 - condition || 'string';
 a = 6 << condition || -4.5;
-a = condition || false;
-a = console.log('b') || 0 / 0;
+a = condition || !1;
+a = console.log('b') || NaN;
 a = console.log('c') || 0;
 a = 2 * condition || void 0;
 a = condition + 3 || null;

```

## `terser/negate_iife/sequence_off`

- tags: `sequences`, `2 iterations`
- size: oxc 222 vs reference 233 (no whitespaces: -11, formatted: -11)

```js
function f() {
	(function() {
		return t;
	})() ? console.log(true) : console.log(false);
	(function() {
		console.log('something');
	})();
}
function g() {
	(function() {
		console.log('something');
	})();
	(function() {
		return t;
	})() ? console.log(true) : console.log(false);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f() {
-	!(function() {
+	(function() {
 		return t;
-	})() ? console.log(false) : console.log(true), (function() {
+	})() ? console.log(!0) : console.log(!1), (function() {
 		console.log('something');
 	})();
 }
@@ -10,5 +10,5 @@
 		console.log('something');
 	})(), (function() {
 		return t;
-	})() ? console.log(true) : console.log(false);
+	})() ? console.log(!0) : console.log(!1);
 }

```

## `terser/switch/issue_1083_1`

- size: oxc 169 vs reference 180 (no whitespaces: -11, formatted: -11)

```js
function test(definitely_true, maybe_true) {
	switch (true) {
		case definitely_true:
		default:
			console.log('PASS');
			break;
		case maybe_true:
			console.log('FAIL');
			break;
	}
}
test(true, false);
test(true, true);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function test(definitely_true, maybe_true) {
-	switch (true) {
+	switch (!0) {
 		case definitely_true:
 		default:
 			console.log('PASS');
@@ -7,5 +7,5 @@
 		case maybe_true: console.log('FAIL');
 	}
 }
-test(true, false);
-test(true, true);
+test(!0, !1);
+test(!0, !0);

```

## `terser/switch/issue_1083_2`

- size: oxc 169 vs reference 180 (no whitespaces: -11, formatted: -11)

```js
function test(definitely_true, maybe_true) {
	switch (true) {
		case definitely_true:
		default:
			console.log('PASS');
			break;
		case maybe_true:
			console.log('FAIL');
			break;
	}
}
test(true, false);
test(true, true);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function test(definitely_true, maybe_true) {
-	switch (true) {
+	switch (!0) {
 		case definitely_true:
 		default:
 			console.log('PASS');
@@ -7,5 +7,5 @@
 		case maybe_true: console.log('FAIL');
 	}
 }
-test(true, false);
-test(true, true);
+test(!0, !1);
+test(!0, !0);

```

## `terser/switch/issue_1083_5`

- size: oxc 208 vs reference 219 (no whitespaces: -11, formatted: -11)

```js
function test(definitely_true, maybe_true) {
	switch (true) {
		default:
			console.log('definitely');
			break;
		case maybe_true:
			console.log('maybe');
			break;
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
@@ -1,5 +1,5 @@
 function test(definitely_true, maybe_true) {
-	switch (true) {
+	switch (!0) {
 		default:
 			console.log('definitely');
 			break;
@@ -9,5 +9,5 @@
 		case definitely_true: console.log('definitely');
 	}
 }
-test(true, false);
-test(true, true);
+test(!0, !1);
+test(!0, !0);

```

## `terser/switch/issue_1083_6`

- size: oxc 208 vs reference 219 (no whitespaces: -11, formatted: -11)

```js
function test(definitely_true, maybe_true) {
	switch (true) {
		case definitely_true:
			console.log('definitely');
			break;
		case maybe_true:
			console.log('maybe');
			break;
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
@@ -1,5 +1,5 @@
 function test(definitely_true, maybe_true) {
-	switch (true) {
+	switch (!0) {
 		case definitely_true:
 			console.log('definitely');
 			break;
@@ -9,5 +9,5 @@
 		default: console.log('definitely');
 	}
 }
-test(true, false);
-test(true, true);
+test(!0, !1);
+test(!0, !0);

```

## `terser/arrow/arrow_unused_toplevel`

- tags: `remove unused`
- size: oxc 131 vs reference 143 (no whitespaces: -12, formatted: -20)

```js
(top) => dog;
let fn = (a) => {
	console.log(a * a);
};
let u = (x, y) => x - y + g;
(() => {
	console.log('0');
})();
!(function(x) {
	(() => {
		console.log('1');
	})();
	let unused = (x) => {
		console.log(x);
	};
	let baz = (e) => e + e;
	console.log(baz(x));
})(1);
fn(3);

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,10 @@
 let fn = (a) => {
 	console.log(a * a);
 };
-(() => {
-	console.log('0');
-})();
-!(function(x) {
-	(() => {
-		console.log('1');
-	})();
-	let baz = (e) => e + e;
-	console.log(baz(x));
+let u = (x, y) => x - y + g;
+console.log('0');
+(function(x) {
+	console.log('1');
+	console.log(((e) => e + e)(x));
 })(1);
 fn(3);

```

## `terser/collapse_vars/return_4`

- tags: `join vars`
- size: oxc 54 vs reference 66 (no whitespaces: -12, formatted: -16)

```js
var a = 'FAIL';
(function(b) {
	a = 'PASS';
	return;
	b(a);
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 var a = 'FAIL';
 (function(b) {
 	a = 'PASS';
-	return;
-	b(a);
 })();
 console.log(a);

```

## `terser/export/name_cache_do_not_mangle_export_class_name`

- tags: `type:module`, `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 58 vs reference 70 (no whitespaces: -12, formatted: -12)

```js
export class add {}
class sub {}
console.log(add, add, sub, sub);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 export class add {}
-class _$SUB$_ {}
-console.log(add, add, _$SUB$_, _$SUB$_);
+class sub {}
+console.log(add, add, sub, sub);

```

## `terser/export/name_cache_do_not_mangle_export_function_name`

- tags: `type:module`, `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 114 vs reference 126 (no whitespaces: -12, formatted: -12)

```js
export function add(x, y) {
	return x + y;
}
function sub(x, y) {
	return x - y;
}
console.log(add(1, 2), add(3, 4), sub(5, 6), sub(7, 8));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-export function add(n, d) {
-	return n + d;
+export function add(e, t) {
+	return e + t;
 }
-function _$SUB$_(n, d) {
-	return n - d;
+function sub(e, t) {
+	return e - t;
 }
-console.log(add(1, 2), add(3, 4), _$SUB$_(5, 6), _$SUB$_(7, 8));
+console.log(add(1, 2), add(3, 4), sub(5, 6), sub(7, 8));

```

## `terser/harmony/import_meta`

- size: oxc 16 vs reference 28 (no whitespaces: -12, formatted: -13)

```js
import.meta;
import.meta.url;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-import.meta;
 import.meta.url;

```

## `terser/hoist_vars/sequences_funs`

- size: oxc 47 vs reference 59 (no whitespaces: -12, formatted: -15)

```js
function f() {
	var a = 1, b = 2;
	function g() {}
	var c = 3;
	return g(a, b, c);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f() {
+	var a = 1, b = 2;
 	function g() {}
-	var a = 1, b = 2, c = 3;
-	return g(a, b, c);
+	var c = 3;
 }

```

## `terser/pure_funcs/issue_2638`

- size: oxc 16 vs reference 28 (no whitespaces: -12, formatted: -14)

```js
(g() || h())(x(), y());
(a() || b())(c(), d());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 x(), y();
-(a() || b())(c(), d());
+c(), d();

```

## `terser/template_string/template_strings_ascii_only`

- size: oxc 55 vs reference 67 (no whitespaces: -12, formatted: -10)

```js
var foo = `foo\n        bar\n        \u2182\u03c9\u2182`;
var bar = `\``;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var foo = `foo\n        bar\n        \u2182\u03c9\u2182`;
+var foo = 'foo\n        bar\n        ↂωↂ';
 var bar = '`';

```

## `terser/export/name_cache_mangle_export_default_class`

- tags: `type:module`, `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 107 vs reference 120 (no whitespaces: -13, formatted: -12)

```js
export default class foo {}
export class bar {}
class baz {
	meth() {}
}
class qux {}
console.log(foo, bar, baz, qux, qux);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-export default class _$FOO$_ {}
+export default class foo {}
 export class bar {}
-class _$QUX$_ {}
-console.log(_$FOO$_, bar, class {
+class baz {
 	meth() {}
-}, _$QUX$_, _$QUX$_);
+}
+class qux {}
+console.log(foo, bar, baz, qux, qux);

```

## `terser/harmony/arrow_function_parens_2`

- size: oxc 0 vs reference 13 (no whitespaces: -13, formatted: -16)

```js
(() => null)();

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-(() => null)();

```

## `terser/numbers/no_number_function_transform_without_unsafe_math`

- size: oxc 0 vs reference 13 (no whitespaces: -13, formatted: -14)

```js
Number(1234);

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-Number(1234);

```

## `terser/pure_funcs/boolean_or`

- tags: `pure functions`
- size: oxc 38 vs reference 51 (no whitespaces: -13, formatted: -16)

```js
foo() || foo();
foo() || bar();
foo() || 'bar';
bar() || foo();
bar() || bar();
bar() || 'bar';
'bar' || foo();
'bar' || bar();
'bar' || 'bar';

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,3 @@
 bar();
 bar() || bar();
 bar();
-'bar' || bar();

```

## `terser/ascii/ascii_only_false_identifier_es5`

- size: oxc 34 vs reference 48 (no whitespaces: -14, formatted: -17)

```js
function f() {
	var o = { '𝒜': true };
	return o['𝒜'];
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function f() {
-	var o = { 𝒜: true };
-	return o['𝒜'];
+	return { 𝒜: !0 }.𝒜;
 }

```

## `terser/ascii/ascii_only_true_identifier_es5`

- size: oxc 34 vs reference 48 (no whitespaces: -14, formatted: -17)

```js
function f() {
	var o = { '𝒜': true };
	return o['𝒜'];
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function f() {
-	var o = { 𝒜: true };
-	return o['𝒜'];
+	return { 𝒜: !0 }.𝒜;
 }

```

## `terser/blocks/keep_some_blocks`

- size: oxc 74 vs reference 88 (no whitespaces: -14, formatted: -21)

```js
if (foo) {
	{
		{
			{}
		}
	}
	if (bar) {
		baz();
	}
	{
		{}
	}
} else {
	stuff();
}
if (foo) {
	for (var i = 0; i < 5; ++i) if (bar) baz();
} else {
	stuff();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
-if (foo) {
-	if (bar) baz();
-} else stuff();
-if (foo) {
-	for (var i = 0; i < 5; ++i) if (bar) baz();
-} else stuff();
+foo ? bar && baz() : stuff();
+if (foo) for (var i = 0; i < 5; ++i) bar && baz();
+else stuff();

```

## `terser/collapse_vars/issue_2203_2`

- tags: `join vars`, `remove unused`
- size: oxc 112 vs reference 126 (no whitespaces: -14, formatted: -19)

```js
a = 'PASS';
console.log({
	a: 'FAIL',
	b: function() {
		return (function(c) {
			return c.a;
		})((String, Object, (function() {
			return this;
		})()));
	}
}.b());

```

```diff
--- reference
+++ oxc
@@ -3,9 +3,9 @@
 	a: 'FAIL',
 	b: function() {
 		return (function(c) {
-			return (String, Object, (function() {
-				return this;
-			})()).a;
-		})();
+			return c.a;
+		})((function() {
+			return this;
+		})());
 	}
 }.b());

```

## `terser/destructuring/mangle_destructuring_decl`

- tags: `remove unused`
- size: oxc 127 vs reference 141 (no whitespaces: -14, formatted: -24)

```js
function test(opts) {
	let a = opts.a || {
		e: 7,
		n: 8
	};
	let { t, e, n, s = 5 + 4, o, r } = a;
	console.log(t, e, n, s, o, r);
}
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
@@ -1,10 +1,9 @@
-function test(t) {
-	let e = t.a || {
+function test(opts) {
+	let { t, e, n, s = 9, o, r } = opts.a || {
 		e: 7,
 		n: 8
 	};
-	let { t: n, e: o, n: s, s: l = 9, o: a, r: c } = e;
-	console.log(n, o, s, l, a, c);
+	console.log(t, e, n, s, o, r);
 }
 test({ a: {
 	t: 1,

```

## `terser/destructuring/mangle_destructuring_decl_collapse_vars`

- tags: `join vars`, `remove unused`
- size: oxc 127 vs reference 141 (no whitespaces: -14, formatted: -24)

```js
function test(opts) {
	let a = opts.a || {
		e: 7,
		n: 8
	};
	let { t, e, n, s = 5 + 4, o, r } = a;
	console.log(t, e, n, s, o, r);
}
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
@@ -1,10 +1,9 @@
-function test(t) {
-	let e = t.a || {
+function test(opts) {
+	let { t, e, n, s = 9, o, r } = opts.a || {
 		e: 7,
 		n: 8
 	};
-	let { t: n, e: o, n: s, s: l = 9, o: a, r: c } = e;
-	console.log(n, o, s, l, a, c);
+	console.log(t, e, n, s, o, r);
 }
 test({ a: {
 	t: 1,

```

## `terser/drop_unused/issue_1830_1`

- tags: `remove unused`
- size: oxc 39 vs reference 53 (no whitespaces: -14, formatted: -15)

```js
!(function() {
	L: for (var b = console.log(1); !1;) continue L;
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function() {
-	L: for (console.log(1); !1;) continue L;
+(function() {
+	L: var b = console.log(1);
 })();

```

## `terser/harmony/class_name_can_be_preserved`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 25 vs reference 39 (no whitespaces: -14, formatted: -17)

```js
function x() {
	(class Baz {});
	class Foo {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function x() {
-	(class Baz {});
 	class Foo {}
 }

```

## `terser/harmony/issue_2762`

- size: oxc 115 vs reference 129 (no whitespaces: -14, formatted: -20)

```js
var bar = 1, T = true;
(function() {
	if (T) {
		const a = function() {
			var foo = bar;
			console.log(foo, a.prop, b.prop);
		};
		a.prop = 2;
		const b = { prop: 3 };
		a();
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,11 @@
-var bar = 1, T = true;
+var bar = 1, T = !0;
 (function() {
 	if (T) {
-		const o = function() {
-			var p = bar;
-			console.log(p, o.prop, r.prop);
+		let a = function() {
+			console.log(bar, a.prop, b.prop);
 		};
-		o.prop = 2;
-		const r = { prop: 3 };
-		o();
+		a.prop = 2;
+		let b = { prop: 3 };
+		a();
 	}
 })();

```

## `terser/hoist_vars/sequences`

- size: oxc 47 vs reference 61 (no whitespaces: -14, formatted: -19)

```js
function f() {
	var a = 1, b = 2;
	function g() {}
	var c = 3;
	return g(a, b, c);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function f() {
-	var a = 1, b = 2, c;
+	var a = 1, b = 2;
 	function g() {}
-	c = 3;
-	return g(a, b, c);
+	var c = 3;
 }

```

## `terser/export/name_cache_import_star_as_name_from_module`

- tags: `type:module`, `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 106 vs reference 121 (no whitespaces: -15, formatted: -15)

```js
import * as fs from 'filesystem';
import * as stuff from 'whatever';
fs.resolve();
stuff.search();
export { fs, stuff };

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-import * as _$FS$_ from 'filesystem';
-import * as e from 'whatever';
-_$FS$_.resolve(), e.search();
-export { _$FS$_ as fs, e as stuff };
+import * as e from 'filesystem';
+import * as t from 'whatever';
+e.resolve(), t.search();
+export { e as fs, t as stuff };

```

## `terser/hoist_vars/statements`

- size: oxc 52 vs reference 67 (no whitespaces: -15, formatted: -20)

```js
function f() {
	var a = 1;
	var b = 2;
	var c = 3;
	function g() {}
	return g(a, b, c);
}

```

```diff
--- reference
+++ oxc
@@ -3,5 +3,4 @@
 	var b = 2;
 	var c = 3;
 	function g() {}
-	return g(a, b, c);
 }

```

## `terser/issue_143/tranformation_sort_order_equal`

- size: oxc 8 vs reference 23 (no whitespaces: -15, formatted: -16)

```js
(a = parseInt('100')) == a;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(a = parseInt('100')) == a;
+a = 100, a;

```

## `terser/issue_143/tranformation_sort_order_greater_or_equal`

- size: oxc 8 vs reference 23 (no whitespaces: -15, formatted: -16)

```js
(a = parseInt('100')) >= a;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(a = parseInt('100')) >= a;
+a = 100, a;

```

## `terser/issue_143/tranformation_sort_order_lesser_or_equal`

- size: oxc 8 vs reference 23 (no whitespaces: -15, formatted: -16)

```js
(a = parseInt('100')) <= a;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(a = parseInt('100')) <= a;
+a = 100, a;

```

## `terser/issue_143/tranformation_sort_order_unequal`

- size: oxc 8 vs reference 23 (no whitespaces: -15, formatted: -16)

```js
(a = parseInt('100')) != a;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(a = parseInt('100')) != a;
+a = 100, a;

```

## `terser/object/prop_func_to_concise_method`

- size: oxc 75 vs reference 90 (no whitespaces: -15, formatted: -14)

```js
({
	emit: function NamedFunctionExpression() {
		console.log('PASS');
	},
	run: function() {
		this.emit();
	}
}).run();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 ({
-	emit: function NamedFunctionExpression() {
+	emit: function() {
 		console.log('PASS');
 	},
-	run() {
+	run: function() {
 		this.emit();
 	}
 }).run();

```

## `terser/unsafe_symbols/unsafe_symbols_1`

- size: oxc 0 vs reference 15 (no whitespaces: -15, formatted: -16)

```js
Symbol('kDog');

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-Symbol('kDog');

```

## `terser/collapse_vars/issue_2203_1`

- tags: `join vars`, `remove unused`
- size: oxc 89 vs reference 105 (no whitespaces: -16, formatted: -18)

```js
a = 'FAIL';
console.log({
	a: 'PASS',
	b: function() {
		return (function(c) {
			return c.a;
		})((String, Object, this));
	}
}.b());

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 	b: function() {
 		return (function(c) {
 			return c.a;
-		})((String, Object, this));
+		})(this);
 	}
 }.b());

```

## `terser/destructuring/destructuring_remove_unused_2`

- tags: `remove unused`
- size: oxc 70 vs reference 86 (no whitespaces: -16, formatted: -24)

```js
function a() {
	var unused = 'foo';
	var a = [
		,
		,
		1
	];
	var [b] = a;
	f(b);
}
function b() {
	var unused = 'foo';
	var a = [{ a: [1] }];
	var [{ b: a }] = a;
	f(b);
}

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,12 @@
 function a() {
-	var a = [
+	var [b] = [
 		,
 		,
 		1
 	];
-	var [b] = a;
 	f(b);
 }
 function b() {
-	var a = [{ a: [1] }];
-	var [{ b: a }] = a;
+	var [{ b: a }] = [{ a: [1] }];
 	f(b);
 }

```

## `terser/evaluate/and`

- size: oxc 346 vs reference 362 (no whitespaces: -16, formatted: -21)

```js
var a;
a = true && condition;
a = 1 && console.log('a');
a = 2 * 3 && 2 * condition;
a = 5 == 5 && condition + 3;
a = 'string' && 4 - condition;
a = 5 + '' && condition / 5;
a = -4.5 && 6 << condition;
a = 6 && 7;
a = false && condition;
a = NaN && console.log('b');
a = 0 && console.log('c');
a = undefined && 2 * condition;
a = null && condition + 3;
a = 2 * 3 - 6 && 4 - condition;
a = 10 == 7 && condition / 5;
a = !'string' && 6 % condition;
a = 0 && 7;
a = condition && true;
a = console.log('a') && 2;
a = 4 - condition && 'string';
a = 6 << condition && -4.5;
a = condition && false;
a = console.log('b') && NaN;
a = console.log('c') && 0;
a = 2 * condition && undefined;
a = condition + 3 && null;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a;
-a = condition;
+var a = condition;
 a = console.log('a');
 a = 2 * condition;
 a = condition + 3;
@@ -7,21 +6,21 @@
 a = condition / 5;
 a = 6 << condition;
 a = 7;
-a = false;
-a = 0 / 0;
+a = !1;
+a = NaN;
 a = 0;
 a = void 0;
 a = null;
 a = 0;
-a = false;
-a = false;
+a = !1;
+a = !1;
 a = 0;
-a = condition && true;
+a = condition && !0;
 a = console.log('a') && 2;
 a = 4 - condition && 'string';
 a = 6 << condition && -4.5;
-a = condition && false;
-a = console.log('b') && 0 / 0;
+a = condition && !1;
+a = console.log('b') && NaN;
 a = console.log('c') && 0;
 a = 2 * condition && void 0;
 a = condition + 3 && null;

```

## `terser/export/name_cache_do_not_mangle_export_from_names`

- tags: `type:module`, `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 112 vs reference 128 (no whitespaces: -16, formatted: -16)

```js
function add() {
	console.log('should be dropped');
}
function div() {
	console.log('should be dropped');
}
function mul() {
	console.log('should be dropped');
}
function divide() {
	console.log('should be dropped');
}
function minus() {
	console.log('should be dropped');
}
function keep() {
	console.log('should be kept');
}
export { add, div as divide, sub as minus, mul } from 'path';
export { keep };

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function _$KEEP$_() {
+function keep() {
 	console.log('should be kept');
 }
 export { add, div as divide, sub as minus, mul } from 'path';
-export { _$KEEP$_ as keep };
+export { keep };

```

## `terser/issue_126/concatenate_rhs_strings`

- size: oxc 210 vs reference 226 (no whitespaces: -16, formatted: -16)

```js
foo(bar() + 123 + 'Hello' + 'World');
foo(bar() + (123 + 'Hello') + 'World');
foo(bar() + 123 + 'Hello' + 'World');
foo(bar() + 123 + 'Hello' + 'World' + ('Foo' + 'Bar'));
foo('Foo' + 'Bar' + bar() + 123 + 'Hello' + 'World' + ('Foo' + 'Bar'));
foo('Hello' + bar() + 123 + 'World');
foo(bar() + 'Foo' + (10 + parseInt('10')));

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 foo(bar() + '123HelloWorld');
 foo(bar() + 123 + 'HelloWorld');
 foo(bar() + 123 + 'HelloWorldFooBar');
-foo('FooBar' + bar() + '123HelloWorldFooBar');
-foo('Hello' + bar() + '123World');
-foo(bar() + 'Foo' + (10 + parseInt('10')));
+foo('FooBar' + bar() + 123 + 'HelloWorldFooBar');
+foo('Hello' + bar() + 123 + 'World');
+foo(bar() + 'Foo20');

```

## `terser/issue_1466/different_variable_in_multiple_for_loop`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 94 vs reference 110 (no whitespaces: -16, formatted: -32)

```js
for (let i = 0; i < 3; i++) {
	let a = 100;
	console.log(i, a);
	for (let j = 0; j < 2; j++) {
		console.log(j, a);
		let c = 2;
		console.log(c);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,4 @@
-for (let o = 0; o < 3; o++) {
-	let l = 100;
-	console.log(o, l);
-	for (let o = 0; o < 2; o++) {
-		console.log(o, l);
-		let e = 2;
-		console.log(e);
-	}
+for (let i = 0; i < 3; i++) {
+	console.log(i, 100);
+	for (let j = 0; j < 2; j++) console.log(j, 100), console.log(2);
 }

```

## `terser/issue_1466/same_variable_in_multiple_for_loop`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 94 vs reference 110 (no whitespaces: -16, formatted: -32)

```js
for (let i = 0; i < 3; i++) {
	let a = 100;
	console.log(i, a);
	for (let i = 0; i < 2; i++) {
		console.log(i, a);
		let c = 2;
		console.log(c);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,4 @@
-for (let o = 0; o < 3; o++) {
-	let l = 100;
-	console.log(o, l);
-	for (let o = 0; o < 2; o++) {
-		console.log(o, l);
-		let e = 2;
-		console.log(e);
-	}
+for (let i = 0; i < 3; i++) {
+	console.log(i, 100);
+	for (let i = 0; i < 2; i++) console.log(i, 100), console.log(2);
 }

```

## `terser/transform/condition_evaluate`

- size: oxc 8 vs reference 24 (no whitespaces: -16, formatted: -21)

```js
while (1 === 2);
for (; 1 == true;);
if (void 0 == null);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-while (0);
-for (; 1;);
-if (1);
+for (;;);

```

## `terser/harmony/import_statement_mangling`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`
- size: oxc 75 vs reference 92 (no whitespaces: -17, formatted: -22)

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
@@ -1,7 +1,6 @@
-import o from 'foo';
-import m, { Food as r } from 'lel';
-import { What as f } from 'lel';
-o();
-m();
+import e from 'foo';
+import t, { Food as n, What as r } from 'lel';
+e();
+t();
+n();
 r();
-f();

```

## `terser/issue_1446/undefined_redefined`

- size: oxc 31 vs reference 48 (no whitespaces: -17, formatted: -22)

```js
function f(undefined) {
	var n = 1;
	return typeof n == 'undefined';
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function f(undefined) {
-	var n = 1;
-	return void 0 === n;
+	return !1;
 }

```

## `terser/issue_597/NaN_and_Infinity_must_have_parens_evaluate`

- size: oxc 0 vs reference 17 (no whitespaces: -17, formatted: -19)

```js
(123456789 / 0).toString();
(+'foo').toString();

```

```diff
--- reference
+++ oxc
@@ -1,2 +0,0 @@
-'Infinity';
-'NaN';

```

## `terser/issue_597/NaN_and_Infinity_should_not_be_replaced_when_they_are_redefined_evaluate`

- size: oxc 17 vs reference 34 (no whitespaces: -17, formatted: -19)

```js
var Infinity, NaN;
(123456789 / 0).toString();
(+'foo').toString();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
 var Infinity, NaN;
-'Infinity';
-'NaN';

```

## `terser/array_constructor/array_constructor_unsafe`

- size: oxc 231 vs reference 249 (no whitespaces: -18, formatted: -64)

```js
console.log(new Array());
console.log(new Array(0));
console.log(new Array(1));
console.log(new Array(11));
console.log(Array(11));
console.log(new Array(12));
console.log(Array(12));
console.log(new Array(foo));
console.log(Array(foo));
console.log(new Array('foo'));
console.log(Array('foo'));

```

```diff
--- reference
+++ oxc
@@ -1,35 +1,11 @@
 console.log([]);
 console.log([]);
 console.log([,]);
-console.log([
-	,
-	,
-	,
-	,
-	,
-	,
-	,
-	,
-	,
-	,
-	,
-]);
-console.log([
-	,
-	,
-	,
-	,
-	,
-	,
-	,
-	,
-	,
-	,
-	,
-]);
+console.log(Array(11));
+console.log(Array(11));
 console.log(Array(12));
 console.log(Array(12));
 console.log(Array(foo));
 console.log(Array(foo));
-console.log(Array('foo'));
-console.log(Array('foo'));
+console.log(['foo']);
+console.log(['foo']);

```

## `terser/conditionals/issue_1154`

- tags: `sequences`
- size: oxc 305 vs reference 323 (no whitespaces: -18, formatted: -22)

```js
function f1(x) {
	return x ? -1 : -1;
}
function f2(x) {
	return x ? +2 : +2;
}
function f3(x) {
	return x ? ~3 : ~3;
}
function f4(x) {
	return x ? !4 : !4;
}
function f5(x) {
	return x ? void 5 : void 5;
}
function f6(x) {
	return x ? typeof 6 : typeof 6;
}
function g1() {
	return g() ? -1 : -1;
}
function g2() {
	return g() ? +2 : +2;
}
function g3() {
	return g() ? ~3 : ~3;
}
function g4() {
	return g() ? !4 : !4;
}
function g5() {
	return g() ? void 5 : void 5;
}
function g6() {
	return g() ? typeof 6 : typeof 6;
}

```

```diff
--- reference
+++ oxc
@@ -10,9 +10,7 @@
 function f4(x) {
 	return !1;
 }
-function f5(x) {
-	return;
-}
+function f5(x) {}
 function f6(x) {
 	return 'number';
 }
@@ -29,7 +27,7 @@
 	return g(), !1;
 }
 function g5() {
-	return void g();
+	g();
 }
 function g6() {
 	return g(), 'number';

```

## `terser/drop_unused/issue_1709`

- tags: `remove unused`
- size: oxc 102 vs reference 120 (no whitespaces: -18, formatted: -26)

```js
console.log((function x() {
	var x = 1;
	return x;
})(), (function y() {
	const y = 2;
	return y;
})(), (function z() {
	function z() {}
	return z;
})());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
 console.log((function() {
-	var x = 1;
-	return x;
+	return 1;
 })(), (function() {
-	const y = 2;
-	return y;
+	return 2;
 })(), (function() {
 	function z() {}
 	return z;

```

## `terser/export/name_cache_do_not_mangle_export_destructuring_name`

- tags: `type:module`, `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 74 vs reference 92 (no whitespaces: -18, formatted: -18)

```js
export const [add] = [
	1,
	2,
	3
];
const [mul, sub] = [
	1,
	2,
	3
];
console.log(add, add, sub, sub, mul, mul);

```

```diff
--- reference
+++ oxc
@@ -3,9 +3,9 @@
 	2,
 	3
 ];
-const [d, _$SUB$_] = [
+const [e, t] = [
 	1,
 	2,
 	3
 ];
-console.log(add, add, _$SUB$_, _$SUB$_, d, d);
+console.log(add, add, t, t, e, e);

```

## `terser/export/name_cache_do_not_mangle_export_var_name`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 58 vs reference 76 (no whitespaces: -18, formatted: -18)

```js
export var add = 1;
var sub = 2, mul = 3;
console.log(add, add, sub, sub, mul, mul);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 export var add = 1;
-var _$SUB$_ = 2, d = 3;
-console.log(add, add, _$SUB$_, _$SUB$_, d, d);
+var e = 2, t = 3;
+console.log(add, add, e, e, t, t);

```

## `terser/harmony/class_name_can_be_preserved_with_reserved`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 92 vs reference 110 (no whitespaces: -18, formatted: -26)

```js
function x() {
	class Foo {}
	Foo.bar;
	class Bar {}
	Bar.foo;
}
function y() {
	var Foo = class Foo {};
	Foo.bar;
	var Bar = class Bar {};
	Bar.bar;
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,10 @@
 function x() {
 	class Foo {}
 	Foo.bar;
-	class a {}
-	a.foo;
+	class Bar {}
+	Bar.foo;
 }
 function y() {
-	var Foo = class Foo {};
-	Foo.bar;
-	var a = class a {};
-	a.bar;
+	(class {}).bar;
+	(class {}).bar;
 }

```

## `terser/issue_1105/compress_with_with_in_other_scope`

- tags: `remove unused`
- size: oxc 82 vs reference 100 (no whitespaces: -18, formatted: -20)

```js
function foo() {
	var o = 42;
	with(o) {
		var foo = 'something';
	}
	doSomething(o);
}
function bar() {
	var unused = 42;
	return something();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function foo() {
 	var o = 42;
-	with(o) var foo = 'something';
+	with(o) {}
 	doSomething(o);
 }
 function bar() {

```

## `terser/issue_1105/with_in_function_scope`

- tags: `remove unused`
- size: oxc 48 vs reference 66 (no whitespaces: -18, formatted: -20)

```js
function foo() {
	var o = 42;
	with(o) {
		var foo = 'something';
	}
	doSomething(o);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function foo() {
 	var o = 42;
-	with(o) var foo = 'something';
+	with(o) {}
 	doSomething(o);
 }

```

## `terser/functions/issue_2898`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 76 vs reference 95 (no whitespaces: -19, formatted: -20)

```js
var c = 0;
(function() {
	while (f());
	function f() {
		var b = (c = 1 + c, void (c = 1 + c));
		b && b[0];
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var c = 0;
 (function() {
-	while (b = void 0, void ((b = void (c = 1 + (c = 1 + c))) && b[0]));
-	var b;
+	for (; f(););
+	function f() {
+		c = 1 + c, c = 1 + c;
+	}
 })(), console.log(c);

```

## `terser/collapse_vars/cond_branch_switch`

- tags: `join vars`
- size: oxc 29 vs reference 49 (no whitespaces: -20, formatted: -29)

```js
var c = 0;
if (c = 1 + c, 0) switch (c = 1 + c) {}
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var c = 0;
-if (c = 1 + c, 0) switch (c = 1 + c) {}
+c = 1 + c;
 console.log(c);

```

## `terser/template_string/template_strings`

- size: oxc 28 vs reference 48 (no whitespaces: -20, formatted: -22)

```js
``;
`xx\`x`;
`${foo + 2}`;
` foo ${bar + `baz ${qux}`}`;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-'';
-'xx`x';
 `${foo + 2}`;
-` foo ${bar + `baz ${qux}`}`;
+bar + `baz ${qux}`;

```

## `terser/asm/asm_toplevel`

- size: oxc 24 vs reference 45 (no whitespaces: -21, formatted: -36)

```js
'use asm';
0;
function f() {
	0;
	(function() {
		0;
	});
}
0;

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,2 @@
 'use asm';
-0;
-function f() {
-	0;
-	(function() {
-		0;
-	});
-}
-0;
+function f() {}

```

## `terser/evaluate/issue_2535_1`

- tags: `sequences`
- size: oxc 98 vs reference 120 (no whitespaces: -22, formatted: -27)

```js
if (x() || true || y()) z();
if ((x() || true) && y()) z();
if (x() && true || y()) z();
if (x() && true && y()) z();
if (x() || false || y()) z();
if ((x() || false) && y()) z();
if (x() && false || y()) z();
if (x() && false && y()) z();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1 @@
-if (x(), 1) z();
-if (x(), y()) z();
-if (x() || y()) z();
-if (x() && y()) z();
-if (x() || y()) z();
-if (x() && y()) z();
-if (x(), y()) z();
-if (x(), 0) z();
+x(), z(), x(), y() && z(), (x() || y()) && z(), x() && y() && z(), (x() || y()) && z(), x() && y() && z(), x(), y() && z(), x();

```

## `terser/collapse_vars/issue_2203_4`

- tags: `join vars`, `remove unused`
- size: oxc 72 vs reference 95 (no whitespaces: -23, formatted: -27)

```js
a = 'FAIL';
console.log({
	a: 'PASS',
	b: function() {
		return ((c) => c.a)((String, Object, (() => this)()));
	}
}.b());

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 console.log({
 	a: 'PASS',
 	b: function() {
-		return ((c) => (String, Object, (() => this)()).a)();
+		return ((c) => c.a)(this);
 	}
 }.b());

```

## `terser/collapse_vars/issue_2203_3`

- tags: `join vars`, `remove unused`
- size: oxc 89 vs reference 113 (no whitespaces: -24, formatted: -28)

```js
a = 'FAIL';
console.log({
	a: 'PASS',
	b: function() {
		return (function(c) {
			return c.a;
		})((String, Object, (() => this)()));
	}
}.b());

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 	b: function() {
 		return (function(c) {
 			return c.a;
-		})((String, Object, (() => this)()));
+		})(this);
 	}
 }.b());

```

## `terser/issue_611/issue_611`

- tags: `sequences`
- size: oxc 36 vs reference 60 (no whitespaces: -24, formatted: -29)

```js
define(function() {
	function fn() {}
	if (fn()) {
		fn();
		return void 0;
	}
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 define(function() {
 	function fn() {}
-	if (fn()) return void fn();
 });

```

## `terser/conditionals/equality_conditionals_false`

- tags: `sequences`
- size: oxc 159 vs reference 185 (no whitespaces: -26, formatted: -46)

```js
function f(a, b, c) {
	console.log(a == (b ? a : a), a == (b ? a : c), a != (b ? a : a), a != (b ? a : c), a === (b ? a : a), a === (b ? a : c), a !== (b ? a : a), a !== (b ? a : c));
}
f(0, 0, 0);
f(0, true, 0);
f(1, 2, 3);
f(1, null, 3);
f(NaN);
f(NaN, 'foo');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a, b, c) {
-	console.log(a == (b ? a : a), a == (b ? a : c), a != (b ? a : a), a != (b ? a : c), a === (b ? a : a), a === (b ? a : c), a !== (b ? a : a), a !== (b ? a : c));
+	console.log(a == a, a == (b ? a : c), a != a, a != (b ? a : c), a === a, a === (b ? a : c), a !== a, a !== (b ? a : c));
 }
-f(0, 0, 0), f(0, true, 0), f(1, 2, 3), f(1, null, 3), f(0 / 0), f(0 / 0, 'foo');
+f(0, 0, 0), f(0, !0, 0), f(1, 2, 3), f(1, null, 3), f(NaN), f(NaN, 'foo');

```

## `terser/template_string/return_template_string_with_trailing_backslash`

- size: oxc 138 vs reference 164 (no whitespaces: -26, formatted: -36)

```js
function a() {
	return `foo`;
}
function b() {
	return `\nbar`;
}
function c() {
	return;
	`baz`;
}
function d() {
	return;
	`qux`;
}
function e() {
	return `\nfin`;
}
console.log(a(), b(), c(), d(), e());

```

```diff
--- reference
+++ oxc
@@ -2,17 +2,11 @@
 	return 'foo';
 }
 function b() {
-	return `\nbar`;
+	return '\nbar';
 }
-function c() {
-	return;
-	'baz';
-}
-function d() {
-	return;
-	'qux';
-}
+function c() {}
+function d() {}
 function e() {
-	return `\nfin`;
+	return '\nfin';
 }
 console.log(a(), b(), c(), d(), e());

```

## `terser/arrow/arrow_with_regexp`

- size: oxc 0 vs reference 27 (no whitespaces: -27, formatted: -32)

```js
(num) => /\d{11,14}/.test(num);

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-(num) => /\d{11,14}/.test(num);

```

## `terser/collapse_vars/collapse_vars_switch`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 161 vs reference 188 (no whitespaces: -27, formatted: -41)

```js
function f1() {
	var not_used = sideeffect(), x = g1 + g2;
	var y = x / 4, z = 'Bar' + y;
	switch (z) {
		case 0: return g9;
	}
}
function f2() {
	var x = g1 + g2, not_used = sideeffect();
	var y = x / 4;
	var z = 'Bar' + y;
	switch (z) {
		case 0: return g9;
	}
}
function f3(x) {
	switch (x) {
		case 1:
			var a = 3 - x;
			return a;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,10 @@
 function f1() {
-	sideeffect();
-	switch ('Bar' + (g1 + g2) / 4) {
-		case 0: return g9;
-	}
+	if (sideeffect(), 'Bar' + (g1 + g2) / 4 === 0) return g9;
 }
 function f2() {
 	var x = g1 + g2;
-	sideeffect();
-	switch ('Bar' + x / 4) {
-		case 0: return g9;
-	}
+	if (sideeffect(), 'Bar' + x / 4 === 0) return g9;
 }
 function f3(x) {
-	switch (x) {
-		case 1: return 3 - x;
-	}
+	if (x === 1) return 3 - x;
 }

```

## `terser/issue_368/collapse`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 228 vs reference 256 (no whitespaces: -28, formatted: -32)

```js
function f1() {
	var a;
	a = typeof b === 'function' ? b() : b;
	return a !== undefined && c();
}
function f2(b) {
	var a;
	b = c();
	a = typeof b === 'function' ? b() : b;
	return 'stirng' == typeof a && d();
}
function f3(c) {
	var a;
	a = b(a / 2);
	if (a < 0) {
		a++;
		++c;
		return c / 2;
	}
}
function f4(c) {
	var a;
	a = b(a / 2);
	if (a < 0) {
		a++;
		c++;
		return c / 2;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
 function f1() {
-	return void 0 !== ('function' == typeof b ? b() : b) && c();
+	return (typeof b == 'function' ? b() : b) !== void 0 && c();
 }
-function f2(b1) {
-	return 'stirng' == typeof ('function' == typeof (b1 = c()) ? b1() : b1) && d();
+function f2(b) {
+	return b = c(), typeof b == 'function' && b(), !1;
 }
-function f3(c1) {
-	var a;
-	if ((a = b(a / 2)) < 0) return a++, ++c1 / 2;
+function f3(c) {
+	var a = b(a / 2);
+	if (a < 0) return a++, ++c, c / 2;
 }
-function f4(c1) {
-	var a;
-	if ((a = b(a / 2)) < 0) return a++, ++c1 / 2;
+function f4(c) {
+	var a = b(a / 2);
+	if (a < 0) return a++, c++, c / 2;
 }

```

## `terser/collapse_vars/issue_2497`

- tags: `join vars`, `remove unused`
- size: oxc 117 vs reference 146 (no whitespaces: -29, formatted: -42)

```js
function sample() {
	if (true) {
		for (var i = 0; i < 1; ++i) {
			for (var k = 0; k < 1; ++k) {
				var value = 1;
				var x = value;
				value = x ? x + 1 : 0;
			}
		}
	} else {
		for (var i = 0; i < 1; ++i) {
			for (var k = 0; k < 1; ++k) {
				var value = 1;
			}
		}
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function sample() {
-	if (true) for (var i = 0; i < 1; ++i) for (var k = 0; k < 1; ++k) {
-		value = 1;
-		value = value ? value + 1 : 0;
+	if (1) for (var i = 0; i < 1; ++i) for (var k = 0; k < 1; ++k) {
+		var value = 1, x = value;
+		value = x ? x + 1 : 0;
 	}
-	else for (i = 0; i < 1; ++i) for (k = 0; k < 1; ++k) var value = 1;
+	else var i, k, value;
 }

```

## `terser/reduce_vars/issue_2992`

- tags: `join vars`
- size: oxc 59 vs reference 88 (no whitespaces: -29, formatted: -42)

```js
var c = 'PASS';
(function f(b) {
	switch (0) {
		case 0:
		case b = 1: b && (c = 'FAIL');
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,5 @@
 var c = 'PASS';
-(function f(b) {
-	switch (0) {
-		case 0:
-		case b = 1: b && (c = 'FAIL');
-	}
+(function(b) {
+	b && (c = 'FAIL');
 })();
 console.log(c);

```

## `terser/asm/asm_mixed`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 795 vs reference 825 (no whitespaces: -30, formatted: -56)

```js
function asm_GeometricMean(stdlib, foreign, buffer) {
	'use asm';
	var exp = stdlib.Math.exp;
	var log = stdlib.Math.log;
	var values = new stdlib.Float64Array(buffer);
	function logSum(start, end) {
		start = start | 0;
		end = end | 0;
		var sum = 0, p = 0, q = 0;
		for (p = start << 3, q = end << 3; (p | 0) < (q | 0); p = p + 8 | 0) {
			sum = sum + +log(values[p >> 3]);
		}
		return +sum;
	}
	function geometricMean(start, end) {
		start = start | 0;
		end = end | 0;
		return +exp(+logSum(start, end) / +(end - start | 0));
	}
	return { geometricMean };
}
function no_asm_GeometricMean(stdlib, foreign, buffer) {
	var exp = stdlib.Math.exp;
	var log = stdlib.Math.log;
	var values = new stdlib.Float64Array(buffer);
	function logSum(start, end) {
		start = start | 0;
		end = end | 0;
		var sum = 0, p = 0, q = 0;
		for (p = start << 3, q = end << 3; (p | 0) < (q | 0); p = p + 8 | 0) {
			sum = sum + +log(values[p >> 3]);
		}
		return +sum;
	}
	function geometricMean(start, end) {
		start = start | 0;
		end = end | 0;
		return +exp(+logSum(start, end) / +(end - start | 0));
	}
	return { geometricMean };
}

```

```diff
--- reference
+++ oxc
@@ -1,34 +1,27 @@
 function asm_GeometricMean(stdlib, foreign, buffer) {
 	'use asm';
-	var exp = stdlib.Math.exp;
-	var log = stdlib.Math.log;
-	var values = new stdlib.Float64Array(buffer);
+	var exp = stdlib.Math.exp, log = stdlib.Math.log, values = new stdlib.Float64Array(buffer);
 	function logSum(start, end) {
-		start = start | 0;
-		end = end | 0;
+		start |= 0, end |= 0;
 		var sum = 0, p = 0, q = 0;
-		for (p = start << 3, q = end << 3; (p | 0) < (q | 0); p = p + 8 | 0) {
-			sum = sum + +log(values[p >> 3]);
-		}
+		for (p = start << 3, q = end << 3; (p | 0) < (q | 0); p = p + 8 | 0) sum += +log(values[p >> 3]);
 		return +sum;
 	}
 	function geometricMean(start, end) {
-		start = start | 0;
-		end = end | 0;
-		return +exp(+logSum(start, end) / +(end - start | 0));
+		return start |= 0, end |= 0, +exp(+logSum(start, end) / (end - start | 0));
 	}
 	return { geometricMean };
 }
 function no_asm_GeometricMean(stdlib, foreign, buffer) {
+	var exp = stdlib.Math.exp, log = stdlib.Math.log, values = new stdlib.Float64Array(buffer);
 	function logSum(start, end) {
 		start |= 0, end |= 0;
 		var sum = 0, p = 0, q = 0;
-		for (p = start << 3, q = end << 3; (0 | p) < (0 | q); p = p + 8 | 0) sum += +log(values[p >> 3]);
+		for (p = start << 3, q = end << 3; (p | 0) < (q | 0); p = p + 8 | 0) sum += +log(values[p >> 3]);
 		return +sum;
 	}
 	function geometricMean(start, end) {
-		return start |= 0, end |= 0, +exp(+logSum(start, end) / +(end - start | 0));
+		return start |= 0, end |= 0, +exp(+logSum(start, end) / (end - start | 0));
 	}
-	var exp = s
... [truncated]
```

## `terser/loops/in_parenthesis_2`

- size: oxc 0 vs reference 30 (no whitespaces: -30, formatted: -40)

```js
for (function() {
	'foo' in {};
}; 0;);

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-for (function() {
-	'foo' in {};
-}; 0;);

```

## `terser/properties/mangle_private_properties`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`
- size: oxc 11 vs reference 41 (no whitespaces: -30, formatted: -46)

```js
class Foo {
	#foo = 123;
	#privMethod() {}
	get #privProp() {}
	set #privProp(a) {}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1 @@
-class o {
-	#o = 123;
-	#p() {}
-	get #r() {}
-	set #r(o) {}
-}
+class Foo {}

```

## `terser/pure_funcs/issue_2705_2`

- size: oxc 15 vs reference 45 (no whitespaces: -30, formatted: -32)

```js
new a(1)(2)(3);
new (b(1))(2)(3);
new (c(1)(2))(3);
new (d(1)(2)(3))();
new e(1)(2)(3);
new f(1)(2)(3);
new g(1)(2)(3);
new h(1)(2)(3);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
 new e(1)(2)(3);
-new f(1)(2)(3);
-new g(1)(2)(3);

```

## `terser/arrow/arrow_unused`

- tags: `remove unused`
- size: oxc 131 vs reference 162 (no whitespaces: -31, formatted: -49)

```js
(top) => dog;
let fn = (a) => {
	console.log(a * a);
};
let u = (x, y) => x - y + g;
(() => {
	console.log('0');
})();
!(function(x) {
	(() => {
		console.log('1');
	})();
	let unused = (x) => {
		console.log(x);
	};
	let baz = (e) => e + e;
	console.log(baz(x));
})(1);
fn(3);

```

```diff
--- reference
+++ oxc
@@ -2,14 +2,9 @@
 	console.log(a * a);
 };
 let u = (x, y) => x - y + g;
-(() => {
-	console.log('0');
-})();
-!(function(x) {
-	(() => {
-		console.log('1');
-	})();
-	let baz = (e) => e + e;
-	console.log(baz(x));
+console.log('0');
+(function(x) {
+	console.log('1');
+	console.log(((e) => e + e)(x));
 })(1);
 fn(3);

```

## `terser/issue_1105/with_using_existing_variable_outside_scope`

- tags: `remove unused`
- size: oxc 67 vs reference 99 (no whitespaces: -32, formatted: -38)

```js
function f() {
	var o = {};
	var unused = {};
	function foo() {
		with(o) {
			var foo = 'something';
		}
		doSomething(o);
	}
	foo();
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 function f() {
 	var o = {};
-	var unused = {};
 	function foo() {
-		with(o) var foo = 'something';
+		with(o) {}
 		doSomething(o);
 	}
 	foo();

```

## `terser/pure_funcs/issue_2629_2`

- size: oxc 0 vs reference 33 (no whitespaces: -33, formatted: -36)

```js
a(1)(2)(3);
b(1)(2)(3);
c(1)(2)(3);
d(1)(2)(3);
e(1)(2)(3);
f(1)(2)(3);
g(1)(2)(3);
h(1)(2)(3);

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-e(1)(2)(3);
-f(1)(2)(3);
-g(1)(2)(3);

```

## `terser/pure_getters/unsafe`

- tags: `pure getters`
- size: oxc 25 vs reference 58 (no whitespaces: -33, formatted: -36)

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
@@ -1,5 +1,2 @@
 var a, b = null, c = {};
-d;
-null.prop;
-(void 0).prop;
-(void 0).prop;
+d.prop;

```

## `terser/pure_getters/unsafe_reduce_vars`

- tags: `join vars`, `pure getters`
- size: oxc 25 vs reference 58 (no whitespaces: -33, formatted: -36)

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
@@ -1,5 +1,2 @@
 var a, b = null, c = {};
-d;
-null.prop;
-(void 0).prop;
-(void 0).prop;
+d.prop;

```

## `terser/sequences/for_sequences`

- tags: `sequences`
- size: oxc 115 vs reference 148 (no whitespaces: -33, formatted: -38)

```js
foo();
bar();
for (; false;);
foo();
bar();
for (x = 5; false;);
x = foo in bar;
for (; false;);
x = foo in bar;
for (y = 5; false;);
x = function() {
	foo in bar;
};
for (y = 5; false;);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,5 @@
-for (foo(), bar(); false;);
-for (foo(), bar(), x = 5; false;);
-x = foo in bar;
-for (; false;);
-x = foo in bar;
-for (y = 5; false;);
+for (foo(), bar(), foo(), bar(), x = 5; 0;);
+for (x = (foo in bar), x = (foo in bar), y = 5; 0;);
 for (x = function() {
 	foo in bar;
-}, y = 5; false;);
+}, y = 5; 0;);

```

## `terser/export/name_cache_do_not_mangle_export_let_name`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 42 vs reference 76 (no whitespaces: -34, formatted: -40)

```js
export let add = 1;
let sub = 2, mul = 3;
console.log(add, add, sub, sub, mul, mul);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 export let add = 1;
-let _$SUB$_ = 2, d = 3;
-console.log(add, add, _$SUB$_, _$SUB$_, d, d);
+console.log(1, 1, 2, 2, 3, 3);

```

## `terser/harmony/import_statement`

- size: oxc 95 vs reference 129 (no whitespaces: -34, formatted: -44)

```js
import 'mod-name';
import Foo from 'bar';
import { Bar, Baz } from 'lel';
import Bar, { Foo } from 'lel';
import { Bar as kex, Baz as food } from 'lel';

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
 import 'mod-name';
 import Foo from 'bar';
-import { Bar, Baz } from 'lel';
-import Bar, { Foo } from 'lel';
-import { Bar as kex, Baz as food } from 'lel';
+import Bar, { Bar, Baz, Foo, Bar as kex, Baz as food } from 'lel';

```

## `terser/issue_1833/iife_do`

- tags: `join vars`, `remove unused`
- size: oxc 18 vs reference 52 (no whitespaces: -34, formatted: -52)

```js
function f() {
	function g() {
		L: do {
			break L;
		} while (1);
	}
	g();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,2 @@
-!function() {
-	!function() {
-		L: do
-			break L;
-		while (1);
-	}();
-}();
+function f() {}
+f();

```

## `terser/arrow/no_leading_parentheses`

- size: oxc 0 vs reference 35 (no whitespaces: -35, formatted: -44)

```js
(x, y) => x(y);
async (x, y) => await x(y);

```

```diff
--- reference
+++ oxc
@@ -1,2 +0,0 @@
-(x, y) => x(y);
-async (x, y) => await x(y);

```

## `terser/destructuring/destructuring_remove_unused_1`

- tags: `remove unused`
- size: oxc 250 vs reference 285 (no whitespaces: -35, formatted: -51)

```js
function a() {
	var unused = 'foo';
	var a = [1];
	var [b] = a;
	f(b);
}
function b() {
	var unused = 'foo';
	var a = { b: 1 };
	var { b } = a;
	f(b);
}
function c() {
	var unused = 'foo';
	var a = [[1]];
	var [[b]] = a;
	f(b);
}
function d() {
	var unused = 'foo';
	var a = { b: { b: 1 } };
	var { b: { b } } = a;
	f(b);
}
function e() {
	var unused = 'foo';
	var a = [
		1,
		2,
		3,
		4,
		5
	];
	var x = [[
		1,
		2,
		3
	]];
	var y = { h: 1 };
	var [b, ...c] = a;
	var [ ...[e, f]] = x;
	var [ ...{ g: h }] = y;
	f(b, c, e, f, g);
}

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,17 @@
 function a() {
-	var a = [1];
-	var [b] = a;
+	var [b] = [1];
 	f(b);
 }
 function b() {
-	var a = { b: 1 };
-	var { b } = a;
+	var { b } = { b: 1 };
 	f(b);
 }
 function c() {
-	var a = [[1]];
-	var [[b]] = a;
+	var [[b]] = [[1]];
 	f(b);
 }
 function d() {
-	var a = { b: { b: 1 } };
-	var { b: { b } } = a;
+	var { b: { b } } = { b: { b: 1 } };
 	f(b);
 }
 function e() {
@@ -33,7 +29,7 @@
 	]];
 	var y = { h: 1 };
 	var [b, ...c] = a;
-	var [ ...[e, f1]] = x;
+	var [ ...[e, f]] = x;
 	var [ ...{ g: h }] = y;
-	f1(b, c, e, f1, g);
+	f(b, c, e, f, g);
 }

```

## `terser/export/name_cache_do_not_mangle_export_const_name`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 44 vs reference 80 (no whitespaces: -36, formatted: -42)

```js
export const add = 1;
const sub = 2, mul = 3;
console.log(add, add, sub, sub, mul, mul);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 export const add = 1;
-const _$SUB$_ = 2, d = 3;
-console.log(add, add, _$SUB$_, _$SUB$_, d, d);
+console.log(1, 1, 2, 2, 3, 3);

```

## `terser/drop_unused/keep_assign`

- tags: `remove unused`
- size: oxc 106 vs reference 143 (no whitespaces: -37, formatted: -69)

```js
function f1() {
	var a;
	a = 1;
}
function f2() {
	var a = 1;
	a = 2;
}
function f3(a) {
	a = 1;
}
function f4() {
	var a;
	return a = 1;
}
function f5() {
	var a;
	return function() {
		a = 1;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,11 @@
-function f1() {
-	var a;
-	a = 1;
-}
-function f2() {
-	var a = 1;
-	a = 2;
-}
+function f1() {}
+function f2() {}
 function f3(a) {
 	a = 1;
 }
 function f4() {
-	var a;
-	return a = 1;
+	return 1;
 }
 function f5() {
-	var a;
-	return function() {
-		a = 1;
-	};
+	return function() {};
 }

```

## `terser/issue_597/NaN_and_Infinity_must_have_parens`

- size: oxc 0 vs reference 37 (no whitespaces: -37, formatted: -41)

```js
Infinity.toString();
NaN.toString();

```

```diff
--- reference
+++ oxc
@@ -1,2 +0,0 @@
-Infinity.toString();
-(0 / 0).toString();

```

## `terser/async/issue_3079_2`

- size: oxc 0 vs reference 38 (no whitespaces: -38, formatted: -48)

```js
async (async) => async;
async (async) => async;

```

```diff
--- reference
+++ oxc
@@ -1,2 +0,0 @@
-async (async) => async;
-async (async) => async;

```

## `terser/collapse_vars/issue_2931`

- tags: `join vars`, `remove unused`
- size: oxc 20 vs reference 58 (no whitespaces: -38, formatted: -51)

```js
console.log((function() {
	var a = (function() {
		return;
	})();
	return a;
})());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
-console.log((function() {
-	return (function() {
-		return;
-	})();
-})());
+console.log(void 0);

```

## `terser/collapse_vars/collapse_vars_lvalues`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 398 vs reference 438 (no whitespaces: -40, formatted: -67)

```js
function f0(x) {
	var i = ++x;
	return x += i;
}
function f1(x) {
	var a = x -= 3;
	return x += a;
}
function f2(x) {
	var z = x, a = ++z;
	return z += a;
}
function f3(x) {
	var a = x -= 3, b = x + a;
	return b;
}
function f4(x) {
	var a = x -= 3;
	return x + a;
}
function f5(x) {
	var w = e1(), v = e2(), c = v = --x, b = w = x;
	return b - c;
}
function f6(x) {
	var w = e1(), v = e2(), c = v = --x, b = w = x;
	return c - b;
}
function f7(x) {
	var w = e1(), v = e2(), c = v - x, b = w = x;
	return b - c;
}
function f8(x) {
	var w = e1(), v = e2(), b = w = x, c = v - x;
	return b - c;
}
function f9(x) {
	var w = e1(), v = e2(), b = w = x, c = v - x;
	return c - b;
}

```

```diff
--- reference
+++ oxc
@@ -19,22 +19,21 @@
 	return x + a;
 }
 function f5(x) {
-	var w = e1(), v = e2(), c = v = --x;
-	return (w = x) - c;
+	e1(), e2();
+	var c = --x;
+	return x - c;
 }
 function f6(x) {
-	var w = e1(), v = e2();
-	return (v = --x) - (w = x);
+	return e1(), e2(), --x - x;
 }
 function f7(x) {
-	var w = e1();
-	return (w = x) - (e2() - x);
+	return e1(), x - (e2() - x);
 }
 function f8(x) {
-	var w = e1();
-	return (w = x) - (e2() - x);
+	return e1(), x - (e2() - x);
 }
 function f9(x) {
-	var w = e1();
-	return e2() - x - (w = x);
+	e1();
+	var v = e2(), b = x;
+	return v - x - b;
 }

```

## `terser/reduce_vars/redefine_arguments_2`

- tags: `join vars`, `remove unused`
- size: oxc 134 vs reference 175 (no whitespaces: -41, formatted: -45)

```js
function f() {
	var arguments;
	return typeof arguments;
}
function g() {
	var arguments = 42;
	return typeof arguments;
}
function h(x) {
	var arguments = x;
	return typeof arguments;
}
console.log(f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
-console.log(function() {
+function f() {
 	var arguments;
 	return typeof arguments;
-}(), function() {
-	var arguments = 42;
-	return typeof arguments;
-}(), function(x) {
-	var arguments = x;
-	return typeof arguments;
-}());
+}
+function g() {
+	return 'number';
+}
+function h(x) {
+	return typeof x;
+}
+console.log(f(), g(), h());

```

## `terser/reduce_vars/redefine_arguments_3`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 134 vs reference 175 (no whitespaces: -41, formatted: -45)

```js
function f() {
	var arguments;
	return typeof arguments;
}
function g() {
	var arguments = 42;
	return typeof arguments;
}
function h(x) {
	var arguments = x;
	return typeof arguments;
}
console.log(f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
-console.log(function() {
+function f() {
 	var arguments;
 	return typeof arguments;
-}(), function() {
-	var arguments = 42;
-	return typeof arguments;
-}(), function(x) {
-	var arguments = x;
-	return typeof arguments;
-}());
+}
+function g() {
+	return 'number';
+}
+function h(x) {
+	return typeof x;
+}
+console.log(f(), g(), h());

```

## `terser/issue_1052/single_function`

- size: oxc 0 vs reference 42 (no whitespaces: -42, formatted: -51)

```js
(function() {
	if (!window) {
		return;
	}
	function f() {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-(function() {
-	if (window);
-	function f() {}
-})();

```

## `terser/async/issue_2344_1`

- size: oxc 0 vs reference 43 (no whitespaces: -43, formatted: -55)

```js
async () => {
	+await x;
	await y;
	return await z;
};

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-async () => {
-	+await x;
-	await y;
-	return await z;
-};

```

## `terser/async/issue_2344_2`

- size: oxc 0 vs reference 43 (no whitespaces: -43, formatted: -55)

```js
async () => {
	+await x;
	await y;
	return await z;
};

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-async () => {
-	+await x;
-	await y;
-	return await z;
-};

```

## `terser/expansions/expand_parameters`

- size: oxc 0 vs reference 43 (no whitespaces: -43, formatted: -48)

```js
(function(a, ...b) {});
(function(...args) {});

```

```diff
--- reference
+++ oxc
@@ -1,2 +0,0 @@
-(function(a, ...b) {});
-(function(...args) {});

```

## `terser/nullish/conditional_to_nullish_coalescing_2`

- tags: `sequences`
- size: oxc 226 vs reference 269 (no whitespaces: -43, formatted: -57)

```js
const foo = id('something');
console.log('negative cases');
foo === null || foo === null ? bar : foo;
foo === undefined || foo === undefined ? bar : foo;
foo === null || foo === undefined ? foo : bar;
some_global === null || some_global === undefined ? bar : some_global;
console.log('positive cases');
foo === null || foo === void 0 ? bar : foo;
foo === null || foo === undefined ? bar : foo;
foo === undefined || foo === null ? bar : foo;

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,2 @@
 const foo = id('something');
-console.log('negative cases');
-null === foo || null === foo ? bar : foo;
-void 0 === foo || void 0 === foo ? bar : foo;
-null === foo || void 0 === foo ? foo : bar;
-null === some_global || void 0 === some_global ? bar : some_global;
-console.log('positive cases');
-foo ?? bar;
-foo ?? bar;
-foo ?? bar;
+console.log('negative cases'), (foo === null || foo === null) && bar, (foo === void 0 || foo === void 0) && bar, foo == null || bar, some_global == null ? bar : some_global, console.log('positive cases'), foo ?? bar, foo ?? bar, foo ?? bar;

```

## `terser/reduce_vars/issue_3068_2`

- tags: `join vars`
- size: oxc 48 vs reference 91 (no whitespaces: -43, formatted: -66)

```js
(function() {
	do {
		try {
			while ('' == typeof a);
		} finally {
			continue;
		}
		var b = 'defined';
	} while (b && b.c);
})();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,6 @@
 (function() {
 	do {
-		try {
-			while ('' == typeof a);
-		} finally {
-			continue;
-		}
-		var b = 'defined';
+		continue;
+		var b;
 	} while (b && b.c);
 })();

```

## `terser/yield/yield_as_identifier_outside_strict_mode`

- size: oxc 158 vs reference 205 (no whitespaces: -47, formatted: -62)

```js
import yield from 'bar';
yield = 123;
while (true) {
	yield: for (;;) break yield;
	foo();
}
while (true) yield: for (;;) continue yield;
function yield() {}
function foo(...yield) {}
try {
	new Error('');
} catch (yield) {}
var yield = 'foo';

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,7 @@
 import yield from 'bar';
 yield = 123;
-while (true) {
-	yield: for (;;) break yield;
-	foo();
-}
-while (true) yield: for (;;) continue yield;
+for (;;) yield: for (;;) break yield;
+for (;;) yield: for (;;) continue yield;
 function yield() {}
 function foo(...yield) {}
-try {
-	new Error('');
-} catch (yield) {}
 var yield = 'foo';

```

## `terser/object/shorthand_properties`

- size: oxc 0 vs reference 50 (no whitespaces: -50, formatted: -67)

```js
(function() {
	var prop = 1;
	const value = { prop };
	return value;
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-(function() {
-	var n = 1;
-	const r = { prop: n };
-	return r;
-})();

```

## `terser/reduce_vars/redefine_arguments_1`

- tags: `join vars`, `remove unused`
- size: oxc 134 vs reference 184 (no whitespaces: -50, formatted: -57)

```js
function f() {
	var arguments;
	return typeof arguments;
}
function g() {
	var arguments = 42;
	return typeof arguments;
}
function h(x) {
	var arguments = x;
	return typeof arguments;
}
console.log(f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -3,11 +3,9 @@
 	return typeof arguments;
 }
 function g() {
-	var arguments = 42;
-	return typeof arguments;
+	return 'number';
 }
 function h(x) {
-	var arguments = x;
-	return typeof arguments;
+	return typeof x;
 }
 console.log(f(), g(), h());

```

## `terser/harmony/class_expression_statement`

- size: oxc 26 vs reference 78 (no whitespaces: -52, formatted: -56)

```js
(class {});
(class NamedClassExpr {});
let expr = class AnotherClassExpr {};
class C {}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-(class {});
-(class NamedClassExpr {});
-let expr = class AnotherClassExpr {};
+let expr = class {};
 class C {}

```

## `terser/template_string/template_evaluate_undefined`

- tags: `join vars`
- size: oxc 0 vs reference 54 (no whitespaces: -54, formatted: -63)

```js
() => {
	let x;
	console.log(x + `?ts=${Date.now()}`);
};

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-() => {
-	let x;
-	console.log(`undefined?ts=${Date.now()}`);
-};

```

## `terser/issue_1052/multiple_functions`

- size: oxc 0 vs reference 56 (no whitespaces: -56, formatted: -68)

```js
(function() {
	if (!window) {
		return;
	}
	function f() {}
	function g() {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-(function() {
-	if (window);
-	function f() {}
-	function g() {}
-})();

```

## `terser/export/name_cache_mangle_local_import_and_export_aliases`

- tags: `type:module`, `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 102 vs reference 159 (no whitespaces: -57, formatted: -57)

```js
import { foo as bar, cat as dog, bird } from 'stuff';
console.log(bar, dog, bird);
export { bar as qux, dog, bird };

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-import { foo as _$BAR$_, cat as _$DOG$_, bird as _$BIRD$_ } from 'stuff';
-console.log(_$BAR$_, _$DOG$_, _$BIRD$_);
-export { _$BAR$_ as qux, _$DOG$_ as dog, _$BIRD$_ as bird };
+import { foo as e, cat as t, bird as n } from 'stuff';
+console.log(e, t, n);
+export { e as qux, t as dog, n as bird };

```

## `terser/parameters/arrow_return`

- size: oxc 0 vs reference 58 (no whitespaces: -58, formatted: -91)

```js
() => {};
() => {};
(a) => 1;
(a) => -b;
(a) => {
	return b;
	var b;
};
(x, y) => x - y;

```

```diff
--- reference
+++ oxc
@@ -1,9 +0,0 @@
-() => {};
-() => {};
-(a) => 1;
-(a) => -b;
-(a) => {
-	return b1;
-	var b1;
-};
-(x, y) => x - y;

```

## `terser/arrow/object_parens`

- size: oxc 0 vs reference 59 (no whitespaces: -59, formatted: -84)

```js
() => ({});
() => ({});
() => ({})[0];
() => ({}) ? 1 : 0;
() => ({}, 1);
() => (1, 2);
() => {
	foo();
};

```

```diff
--- reference
+++ oxc
@@ -1,9 +0,0 @@
-() => ({});
-() => ({});
-() => void 0;
-() => 1;
-() => 1;
-() => 2;
-() => {
-	foo();
-};

```

## `terser/blocks/issue_2946_else_const`

- size: oxc 30 vs reference 92 (no whitespaces: -62, formatted: -90)

```js
if (1) {
	const x = 6;
} else {
	const y = 12;
}
if (2) {
	let z = 24;
} else {
	let w = 48;
}
if (3) {
	class X {}
} else {
	class Y {}
}

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,9 @@
-if (1) {
-	const x = 6;
-} else {
-	const y = 12;
+{
+	let x = 6;
 }
-if (2) {
+{
 	let z = 24;
-} else {
-	let w = 48;
 }
-if (3) {
+{
 	class X {}
-} else {
-	class Y {}
 }

```

## `terser/issue_1105/check_drop_unused_in_peer_function`

- tags: `remove unused`
- size: oxc 110 vs reference 174 (no whitespaces: -64, formatted: -83)

```js
function outer() {
	var o = {};
	var unused = {};
	function foo() {
		function not_in_use() {
			var nested_unused = 'foo';
			return 24;
		}
		var unused = {};
		with(o) {
			var foo = 'something';
		}
		doSomething(o);
	}
	function bar() {
		var unused = {};
		doSomethingElse();
	}
	foo();
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,7 @@
 function outer() {
 	var o = {};
 	function foo() {
-		function not_in_use() {
-			return 24;
-		}
-		var unused = {};
-		with(o) var foo = 'something';
+		with(o) {}
 		doSomething(o);
 	}
 	function bar() {

```

## `terser/switch/beautify`

- size: oxc 24 vs reference 89 (no whitespaces: -65, formatted: -82)

```js
switch (a) {
	case 0:
	case 1: break;
	case 2:
	default:
}
switch (b) {
	case 3:
		foo();
		bar();
	default: break;
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,5 @@
-switch (a) {
-	case 0:
-	case 1: break;
-	case 2:
-	default:
-}
-switch (b) {
-	case 3:
-		foo();
-		bar();
-	default: break;
+a;
+if (b === 3) {
+	foo();
+	bar();
 }

```

## `terser/negate_iife/issue_1288`

- tags: `sequences`
- size: oxc 28 vs reference 96 (no whitespaces: -68, formatted: -81)

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
@@ -1,7 +1,3 @@
-w || !(function f() {})();
-x || !(function() {
+w, x || (function() {
 	x = {};
-})();
-y ? !(function() {})() : !(function(z) {
-	return z;
-})(0);
+})(), y;

```

## `terser/parameters/arrow_functions`

- size: oxc 0 vs reference 68 (no whitespaces: -68, formatted: -114)

```js
(a) => b;
(a, b) => c;
() => b;
(a) => (b) => c;
(a) => (b) => c;
() => (b, c) => d;
(a) => b;
(a) => 'lel';

```

```diff
--- reference
+++ oxc
@@ -1,8 +0,0 @@
-(a) => b;
-(a, b1) => c;
-() => b;
-(a) => (b1) => c;
-(a) => (b1) => c;
-() => (b1, c1) => d;
-(a) => b;
-(a) => 'lel';

```

## `terser/issue_1052/deeply_nested`

- size: oxc 0 vs reference 84 (no whitespaces: -84, formatted: -106)

```js
(function() {
	if (!window) {
		return;
	}
	function f() {}
	function g() {}
	if (!document) {
		return;
	}
	function h() {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +0,0 @@
-(function() {
-	if (window) {
-		if (document);
-	}
-	function f() {}
-	function g() {}
-	function h() {}
-})();

```

## `terser/pure_funcs/issue_2705_3`

- size: oxc 42 vs reference 126 (no whitespaces: -84, formatted: -88)

```js
new a.x(1).y(2).z(3);
new b.x(1).y(2).z(3);
new (c.x(1)).y(2).z(3);
new (d.x(1)).y(2).z(3);
new (e.x(1).y(2)).z(3);
new (f.x(1).y(2)).z(3);
new (g.x(1).y(2).z(3))();
new h.x(1).y(2).z(3);
new i.x(1).y(2).z(3);
new j.x(1).y(2).z(3);
new k.x(1).y(2).z(3);
new l.x(1).y(2).z(3);
new m.x(1).y(2).z(3);
new n.x(1).y(2).z(3);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,2 @@
 new h.x(1).y(2).z(3);
 new i.x(1).y(2).z(3);
-new j.x(1).y(2).z(3);
-new k.x(1).y(2).z(3);
-new l.x(1).y(2).z(3);
-new m.x(1).y(2).z(3);

```

## `terser/issue_2871/comparison_with_undefined`

- size: oxc 24 vs reference 114 (no whitespaces: -90, formatted: -114)

```js
a == undefined;
a != undefined;
a === undefined;
a !== undefined;
undefined == a;
undefined != a;
undefined === a;
undefined !== a;
void 0 == a;
void 0 != a;
void 0 === a;
void 0 !== a;

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-null == a;
-null != a;
-void 0 === a;
-void 0 !== a;
-null == a;
-null != a;
-void 0 === a;
-void 0 !== a;
-null == a;
-null != a;
-void 0 === a;
-void 0 !== a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;

```

## `terser/arrow/arrow_functions_with_body`

- size: oxc 245 vs reference 340 (no whitespaces: -95, formatted: -135)

```js
var a1 = () => {
	var a = 42 * Math.random();
	return a;
};
var a2 = (p) => {
	var a = Math.random() * p;
	return a;
};
var a3 = (p) => {
	var a = Math.random() * p;
	return a;
};
var a4 = (...p) => {
	var a = Math.random() * p;
	return a;
};
var a5 = (b, c) => {
	var result = b * c + b / c;
	return result;
};
var a6 = (b, ...c) => {
	var result = b;
	for (var i = 0; i < c.length; i++) result += c[i];
	return result;
};
var a7 = (...b) => {
	b.join();
};

```

```diff
--- reference
+++ oxc
@@ -1,23 +1,8 @@
-var a1 = () => {
-	var a = 42 * Math.random();
-	return a;
-};
-var a2 = (p) => {
-	var a = Math.random() * p;
-	return a;
-};
-var a3 = (p) => {
-	var a = Math.random() * p;
-	return a;
-};
-var a4 = (...p) => {
-	var a = Math.random() * p;
-	return a;
-};
-var a5 = (b, c) => {
-	var result = b * c + b / c;
-	return result;
-};
+var a1 = () => 42 * Math.random();
+var a2 = (p) => Math.random() * p;
+var a3 = (p) => Math.random() * p;
+var a4 = (...p) => Math.random() * p;
+var a5 = (b, c) => b * c + b / c;
 var a6 = (b, ...c) => {
 	var result = b;
 	for (var i = 0; i < c.length; i++) result += c[i];

```

## `terser/pure_funcs/issue_2629_3`

- size: oxc 0 vs reference 102 (no whitespaces: -102, formatted: -108)

```js
a.x(1).y(2).z(3);
b.x(1).y(2).z(3);
c.x(1).y(2).z(3);
d.x(1).y(2).z(3);
e.x(1).y(2).z(3);
f.x(1).y(2).z(3);
g.x(1).y(2).z(3);
h.x(1).y(2).z(3);
i.x(1).y(2).z(3);
j.x(1).y(2).z(3);
k.x(1).y(2).z(3);
l.x(1).y(2).z(3);
m.x(1).y(2).z(3);
n.x(1).y(2).z(3);

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-h.x(1).y(2).z(3);
-i.x(1).y(2).z(3);
-j.x(1).y(2).z(3);
-k.x(1).y(2).z(3);
-l.x(1).y(2).z(3);
-m.x(1).y(2).z(3);

```

## `terser/parameters/destructuring_arguments_2`

- size: oxc 96 vs reference 218 (no whitespaces: -122, formatted: -145)

```js
(function([]) {});
(function({}) {});
(function([, , , , ,]) {});
(function([a, { b: c }]) {});
(function([ ...args]) {});
(function({ x }) {});
class a {
	*method({ [thrower()]: x } = {}) {}
}
(function(a, b, c, d, [{ e: [ ...f] }]) {})(1, 2, 3, 4, [{ e: [
	1,
	2,
	3
] }]);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,3 @@
-(function([]) {});
-(function({}) {});
-(function([, , , , ,]) {});
-(function([a, { b: c }]) {});
-(function([ ...args]) {});
-(function({ x }) {});
 class a {
 	*method({ [thrower()]: x } = {}) {}
 }

```

## `terser/object/prop_arrows_to_concise_method_various`

- size: oxc 6 vs reference 135 (no whitespaces: -129, formatted: -200)

```js
({
	null: (x, y) => {
		x(y);
	},
	123: (x, y) => {
		x(y);
	},
	'A B': (x, y) => {
		x(y);
	},
	p1: (x, y) => {
		x(y);
	},
	p3: async (x, y) => {
		await x(y);
	},
	[c1]: (x, y) => {
		x(y);
	},
	[c3]: async (x, y) => {
		await x(y);
	}
});

```

```diff
--- reference
+++ oxc
@@ -1,23 +1 @@
-({
-	null(x, y) {
-		x(y);
-	},
-	123(x, y) {
-		x(y);
-	},
-	'A B'(x, y) {
-		x(y);
-	},
-	p1(x, y) {
-		x(y);
-	},
-	async p3(x, y) {
-		await x(y);
-	},
-	[c1](x, y) {
-		x(y);
-	},
-	async [c3](x, y) {
-		await x(y);
-	}
-});
+c1, c3;

```

## `terser/comparing/issue_2857_2`

- size: oxc 17 vs reference 182 (no whitespaces: -165, formatted: -239)

```js
function f(a, p) {
	a === undefined || a === null || p;
	a === undefined || a !== null || p;
	a !== undefined || a === null || p;
	a !== undefined || a !== null || p;
	a === undefined && a === null || p;
	a === undefined && a !== null || p;
	a !== undefined && a === null || p;
	a !== undefined && a !== null || p;
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1 @@
-function f(a, p) {
-	null == a || p;
-	void 0 === a || null !== a || p;
-	void 0 !== a || null === a || p;
-	void 0 !== a || null !== a || p;
-	void 0 === a && null === a || p;
-	void 0 === a && null !== a || p;
-	void 0 !== a && null === a || p;
-	null != a || p;
-}
+function f(a, p) {}

```

## `terser/comparing/issue_2857_4`

- size: oxc 17 vs reference 182 (no whitespaces: -165, formatted: -239)

```js
function f(a, p) {
	p || a === undefined || a === null;
	p || a === undefined || a !== null;
	p || a !== undefined || a === null;
	p || a !== undefined || a !== null;
	p || a === undefined && a === null;
	p || a === undefined && a !== null;
	p || a !== undefined && a === null;
	p || a !== undefined && a !== null;
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1 @@
-function f(a, p) {
-	p || null == a;
-	p || void 0 === a || null !== a;
-	p || void 0 !== a || null === a;
-	p || void 0 !== a || null !== a;
-	p || void 0 === a && null === a;
-	p || void 0 === a && null !== a;
-	p || void 0 !== a && null === a;
-	p || null != a;
-}
+function f(a, p) {}

```

## `terser/object/prop_func_to_concise_method_various`

- size: oxc 9 vs reference 179 (no whitespaces: -170, formatted: -260)

```js
({
	null: function(x, y) {
		x(y);
	},
	123: function(x, y) {
		x(y);
	},
	'A B': function(x, y) {
		x(y);
	},
	p1: function(x, y) {
		x(y);
	},
	p2: function* (x, y) {
		yield x(y);
	},
	p3: async function(x, y) {
		await x(y);
	},
	[c1]: function(x, y) {
		x(y);
	},
	[c2]: function* (x, y) {
		yield x(y);
	},
	[c3]: async function(x, y) {
		await x(y);
	}
});

```

```diff
--- reference
+++ oxc
@@ -1,29 +1 @@
-({
-	null(x, y) {
-		x(y);
-	},
-	123(x, y) {
-		x(y);
-	},
-	'A B'(x, y) {
-		x(y);
-	},
-	p1(x, y) {
-		x(y);
-	},
-	*p2(x, y) {
-		yield x(y);
-	},
-	async p3(x, y) {
-		await x(y);
-	},
-	[c1](x, y) {
-		x(y);
-	},
-	*[c2](x, y) {
-		yield x(y);
-	},
-	async [c3](x, y) {
-		await x(y);
-	}
-});
+c1, c2, c3;

```

## `terser/comparing/issue_2857_3`

- size: oxc 17 vs reference 195 (no whitespaces: -178, formatted: -256)

```js
function f(a, p) {
	a === undefined || a === null && p;
	a === undefined || a !== null && p;
	a !== undefined || a === null && p;
	a !== undefined || a !== null && p;
	a === undefined && a === null && p;
	a === undefined && a !== null && p;
	a !== undefined && a === null && p;
	a !== undefined && a !== null && p;
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1 @@
-function f(a, p) {
-	void 0 === a || null === a && p;
-	void 0 === a || null !== a && p;
-	void 0 !== a || null === a && p;
-	void 0 !== a || null !== a && p;
-	void 0 === a && null === a && p;
-	void 0 === a && null !== a && p;
-	void 0 !== a && null === a && p;
-	null != a && p;
-}
+function f(a, p) {}

```

## `terser/comparing/issue_2857_5`

- size: oxc 17 vs reference 195 (no whitespaces: -178, formatted: -256)

```js
function f(a, p) {
	p && a === undefined || a === null;
	p && a === undefined || a !== null;
	p && a !== undefined || a === null;
	p && a !== undefined || a !== null;
	p && a === undefined && a === null;
	p && a === undefined && a !== null;
	p && a !== undefined && a === null;
	p && a !== undefined && a !== null;
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1 @@
-function f(a, p) {
-	p && void 0 === a || null === a;
-	p && void 0 === a || null !== a;
-	p && void 0 !== a || null === a;
-	p && void 0 !== a || null !== a;
-	p && void 0 === a && null === a;
-	p && void 0 === a && null !== a;
-	p && void 0 !== a && null === a;
-	p && null != a;
-}
+function f(a, p) {}

```

## `terser/comparing/issue_2857_1`

- size: oxc 32 vs reference 282 (no whitespaces: -250, formatted: -350)

```js
function f1(a) {
	a === undefined || a === null;
	a === undefined || a !== null;
	a !== undefined || a === null;
	a !== undefined || a !== null;
	a === undefined && a === null;
	a === undefined && a !== null;
	a !== undefined && a === null;
	a !== undefined && a !== null;
}
function f2(a) {
	a === null || a === undefined;
	a === null || a !== undefined;
	a !== null || a === undefined;
	a !== null || a !== undefined;
	a === null && a === undefined;
	a === null && a !== undefined;
	a !== null && a === undefined;
	a !== null && a !== undefined;
}

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,2 @@
-function f1(a) {
-	void 0 === a || null !== a;
-	void 0 !== a || null === a;
-	void 0 !== a || null !== a;
-	void 0 === a && null === a;
-	void 0 === a && null !== a;
-	void 0 !== a && null === a;
-}
-function f2(a) {
-	null === a || void 0 !== a;
-	null !== a || void 0 === a;
-	null !== a || void 0 !== a;
-	null === a && void 0 === a;
-	null === a && void 0 !== a;
-	null !== a && void 0 === a;
-}
+function f1(a) {}
+function f2(a) {}

```

## `terser/parameters/destructuring_arguments_1`

- size: oxc 0 vs reference 381 (no whitespaces: -381, formatted: -473)

```js
(function(a) {});
(function([a]) {});
(function([a, b]) {});
(function([[a]]) {});
(function([[a, b]]) {});
(function([a, [b]]) {});
(function([[b], a]) {});
(function({ a }) {});
(function({ a, b }) {});
(function([{ a }]) {});
(function([{ a, b }]) {});
(function([a, { b }]) {});
(function([{ b }, a]) {});
([a]) => {};
([a, b]) => {};
({ a }) => {};
({ a, b, c, d, e }) => {};
([a]) => b;
([a, b]) => c;
({ a }) => b;
({ a, b }) => c;

```

```diff
--- reference
+++ oxc
@@ -1,21 +0,0 @@
-(function(a) {});
-(function([a]) {});
-(function([a, b1]) {});
-(function([[a]]) {});
-(function([[a, b1]]) {});
-(function([a, [b1]]) {});
-(function([[b1], a]) {});
-(function({ a }) {});
-(function({ a, b: b1 }) {});
-(function([{ a }]) {});
-(function([{ a, b: b1 }]) {});
-(function([a, { b: b1 }]) {});
-(function([{ b: b1 }, a]) {});
-([a]) => {};
-([a, b1]) => {};
-({ a }) => {};
-({ a, b: b1, c: c1, d, e }) => {};
-([a]) => b;
-([a, b1]) => c;
-({ a }) => b;
-({ a, b: b1 }) => c;

```

