# uglify / larger — Output longer than expected (possible missing optimization)

Fixtures: 1738

[← uglify](README.md) · [← all families](../README.md)

## `uglify/arguments/issue_3282_2`

- tags: `join vars`, `remove unused`
- size: oxc 145 vs reference 144 (no whitespaces: +1, formatted: -11)

```js
(function(f) {
	f();
})(function() {
	return (function(t) {
		return function() {
			t();
		};
	})(function() {
		'use strict';
		function e() {
			return arguments[0];
		}
		e();
		e();
	})();
});

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,16 @@
-(function() {
-	(function() {
-		return function(t) {
-			return function() {
-				t();
-			};
-		}(function() {
-			'use strict';
-			function e() {
-				return arguments[0];
-			}
-			e();
-			e();
-		})();
+(function(f) {
+	f();
+})(function() {
+	return (function(t) {
+		return function() {
+			t();
+		};
+	})(function() {
+		'use strict';
+		function e() {
+			return arguments[0];
+		}
+		e();
+		e();
 	})();
-})();
+});

```

## `uglify/arrows/issue_5356`

- tags: `join vars`, `remove unused`
- size: oxc 31 vs reference 30 (no whitespaces: +1, formatted: +1)

```js
console.log(((a) => a++)(console));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(((a) => +a)(console));
+console.log(((a) => a++)(console));

```

## `uglify/assignments/increment_decrement_1`

- tags: `join vars`
- size: oxc 48 vs reference 47 (no whitespaces: +1, formatted: +3)

```js
console.log(function(a) {
	a += 1;
	a -= 1;
	return a;
}(42));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(function(a) {
-	++a;
+	a += 1;
 	--a;
 	return a;
 }(42));

```

## `uglify/assignments/issue_3949_2`

- tags: `join vars`
- size: oxc 66 vs reference 65 (no whitespaces: +1, formatted: +3)

```js
var a = 42;
function f() {
	var b = a;
	b = 5 & b;
	return 100 + b;
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 42;
 function f() {
 	var b = a;
-	b &= 5;
+	b = 5 & b;
 	return 100 + b;
 }
 console.log(f());

```

## `uglify/assignments/issue_4521`

- size: oxc 32 vs reference 31 (no whitespaces: +1, formatted: +3)

```js
var a = (a = 42 | a) ? console.log(a) : 0;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var a = (a |= 42) ? console.log(a) : 0;
+var a = (a = 42 | a) ? console.log(a) : 0;

```

## `uglify/assignments/issue_5941`

- tags: `sequences`
- size: oxc 49 vs reference 48 (no whitespaces: +1, formatted: +1)

```js
var a = 1;
a = a &&= (a = console) && console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 1;
-a = (a = a && console) && console.log(typeof a);
+a = a &&= (a = console) && console.log(typeof a);

```

## `uglify/awaits/issue_4747`

- tags: `join vars`, `remove unused`
- size: oxc 90 vs reference 89 (no whitespaces: +1, formatted: +3)

```js
console.log(function(a) {
	async function f() {
		a = 'PASS';
		null.p += 'PASS';
	}
	f();
	return a;
}('FAIL'));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 console.log(function(a) {
-	(async function() {
+	async function f() {
 		a = 'PASS';
 		null.p += 'PASS';
-	})();
+	}
+	f();
 	return a;
 }('FAIL'));

```

## `uglify/awaits/issue_4987`

- size: oxc 82 vs reference 81 (no whitespaces: +1, formatted: +1)

```js
(async function() {
	try {
		await 42;
	} finally {
		console.log('foo');
	}
})();
console.log('bar');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 (async function() {
 	try {
-		await 0;
+		await 42;
 	} finally {
 		console.log('foo');
 	}

```

## `uglify/awaits/negate_iife`

- size: oxc 42 vs reference 41 (no whitespaces: +1, formatted: +1)

```js
(async function() {
	console.log('PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!async function() {
+(async function() {
 	console.log('PASS');
-}();
+})();

```

## `uglify/awaits/reduce_single_use_defun`

- tags: `join vars`, `remove unused`
- size: oxc 45 vs reference 44 (no whitespaces: +1, formatted: +2)

```js
async function f(a) {
	console.log(a);
}
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-(async function(a) {
+async function f(a) {
 	console.log(a);
-})('PASS');
+}
+f('PASS');

```

## `uglify/classes/single_use_3`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 66 (no whitespaces: +1, formatted: +2)

```js
'use strict';
class A {
	f() {
		return A;
	}
}
console.log(typeof new A().f());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 'use strict';
-console.log(typeof new class A {
+class A {
 	f() {
 		return A;
 	}
-}().f());
+}
+console.log(typeof new A().f());

```

## `uglify/classes/static_field_init`

- size: oxc 127 vs reference 126 (no whitespaces: +1, formatted: +4)

```js
(class {
	static [console.log('foo')] = console.log('bar');
	static {
		console.log('baz');
	}
	static [console.log('moo')] = console.log('moz');
});

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 (class {
-	static [(console.log('foo'), console.log('moo'))] = (console.log('bar'), (() => {
+	static [console.log('foo')] = console.log('bar');
+	static {
 		console.log('baz');
-	})(), console.log('moz'));
+	}
+	static [console.log('moo')] = console.log('moz');
 });

```

## `uglify/collapse_vars/issue_1858`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 59 vs reference 58 (no whitespaces: +1, formatted: +1)

```js
console.log(function(x) {
	var a = {}, b = a.b = x;
	return a.b + b;
}(1));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log(function(x) {
-	var a = {}, b = a.b = 1;
+	var a = {}, b = a.b = x;
 	return a.b + b;
-}());
+}(1));

```

## `uglify/collapse_vars/issue_2187_1`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 73 (no whitespaces: +1, formatted: +1)

```js
var a = 1;
!function(foo) {
	foo();
	var a = 2;
	console.log(a);
}(function() {
	console.log(a);
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 1;
-!function(foo) {
+(function(foo) {
 	foo();
 	console.log(2);
-}(function() {
+})(function() {
 	console.log(a);
 });

```

## `uglify/collapse_vars/issue_2187_2`

- tags: `join vars`, `remove unused`
- size: oxc 53 vs reference 52 (no whitespaces: +1, formatted: +1)

```js
var b = 1;
console.log(function(a) {
	return a && ++b;
}(b--));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var b = 1;
 console.log(function(a) {
-	return b-- && ++b;
-}());
+	return a && ++b;
+}(b--));

```

## `uglify/collapse_vars/issue_3698_3`

- tags: `join vars`
- size: oxc 81 vs reference 80 (no whitespaces: +1, formatted: +4)

```js
var a = 0, b = 0;
(function f(c) {
	{
		b++;
		var bar_1 = (b = 1 + b, c = 0);
		a-- && f();
	}
})();
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var a = 0, b = 0;
 (function f(c) {
-	var bar_1 = (b = 1 + ++b, c = 0);
+	b++;
+	var bar_1 = (b = 1 + b, c = 0);
 	a-- && f();
 })();
 console.log(b);

```

## `uglify/collapse_vars/issue_4047_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 76 vs reference 75 (no whitespaces: +1, formatted: +7)

```js
var b = 1;
console.log(+function(a) {
	b = a;
	(a >>= 0) && console.log('PASS');
}(--b + (0 !== typeof A)));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-var a;
-console.log((a = +(0 !== typeof A), +void ((a >>= 0) && console.log('PASS'))));
+var b = 1;
+console.log(+function(a) {
+	b = a, (a >>= 0) && console.log('PASS');
+}(--b + !0));

```

## `uglify/collapse_vars/issue_4806`

- tags: `join vars`
- size: oxc 75 vs reference 74 (no whitespaces: +1, formatted: +1)

```js
var a, o = { f: function() {
	console.log(this === o ? 'FAIL' : 'PASS');
} };
(a = 42, o.f)(42);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var a, o = { f: function() {
 	console.log(this === o ? 'FAIL' : 'PASS');
 } };
-(0, o.f)(a = 42);
+(a = 42, o.f)(42);

```

## `uglify/collapse_vars/issue_5394`

- tags: `join vars`
- size: oxc 73 vs reference 72 (no whitespaces: +1, formatted: +1)

```js
try {
	throw A.p = (console.log('FAIL'), []), !1;
} catch (e) {
	console.log(typeof e);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
-	throw !(A.p = (console.log('FAIL'), []));
+	throw A.p = (console.log('FAIL'), []), !1;
 } catch (e) {
 	console.log(typeof e);
 }

```

## `uglify/collapse_vars/issue_5915_3`

- tags: `join vars`
- size: oxc 45 vs reference 44 (no whitespaces: +1, formatted: +1)

```js
f = void 0;
function f() {}
{
	console.log(typeof f);
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
+f = void 0;
 function f() {}
-console.log(typeof (f = void 0));
+console.log(typeof f);

```

## `uglify/comparisons/is_boolean_unsafe`

- size: oxc 54 vs reference 53 (no whitespaces: +1, formatted: +1)

```js
console.log(/foo/.test('bar') === [].isPrototypeOf({}));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(/foo/.test('bar') == [].isPrototypeOf({}));
+console.log(/foo/.test('bar') === [].isPrototypeOf({}));

```

## `uglify/conditionals/iife_condition`

- tags: `sequences`
- size: oxc 52 vs reference 51 (no whitespaces: +1, formatted: +1)

```js
if (function() {
	return console;
}()) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
+(function() {
 	return console;
-}() || console.log('PASS');
+})() && console.log('PASS');

```

## `uglify/conditionals/issue_5232_1`

- tags: `sequences`
- size: oxc 104 vs reference 103 (no whitespaces: +1, formatted: +14)

```js
(function() {
	if (Math) {
		function f() {}
		for (var a in [42]) console.log(typeof f);
	} else {
		var b = null;
		return true;
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,9 @@
 (function() {
-	var b;
-	if (!Math) return b = null, true;
-	function f() {}
-	for (var a in [42]) console.log(typeof f);
+	if (Math) {
+		function f() {}
+		for (var a in [42]) console.log(typeof f);
+	} else {
+		var b = null;
+		return !0;
+	}
 })();

```

## `uglify/const/issue_4261_1`

- tags: `join vars`, `remove unused`
- size: oxc 98 vs reference 97 (no whitespaces: +1, formatted: -3)

```js
{
	const a = 42;
	(function() {
		function f() {
			console.log(a);
		}
		function g() {
			while (f());
		}
		(function() {
			while (g());
		})();
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
-{
-	const a = 42;
+(function() {
+	function f() {
+		console.log(42);
+	}
+	function g() {
+		for (; f(););
+	}
 	(function() {
-		function g() {
-			while (void console.log(a));
-		}
-		(function() {
-			while (g());
-		})();
+		for (; g(););
 	})();
-}
+})();

```

## `uglify/default-values/inline_loop_2`

- tags: `sequences`, `remove unused`
- size: oxc 71 vs reference 70 (no whitespaces: +1, formatted: +4)

```js
while (function(a = ['PASS']) {
	var a = function f(b) {
		console.log(a[b]);
	}(0);
}());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-while (a = ['PASS'], b = void 0, b = 0, void (a = void console.log(a[b])));
-var a, b;
+for (; function(a = ['PASS']) {
+	var a = function(b) {
+		console.log(a[b]);
+	}(0);
+}(););

```

## `uglify/default-values/issue_4458`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 58 (no whitespaces: +1, formatted: +2)

```js
var a = 'PASS';
function f(b = a = 'FAIL') {
	console.log(a, b);
}
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = 'PASS';
-(function(b = a = 'FAIL') {
+function f(b = a = 'FAIL') {
 	console.log(a, b);
-})(42);
+}
+f(42);

```

## `uglify/default-values/issue_4588_1_unused`

- tags: `remove unused`
- size: oxc 37 vs reference 36 (no whitespaces: +1, formatted: +1)

```js
console.log(function(a = 42) {}.length);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(function(a = 0) {}.length);
+console.log(function(a = 42) {}.length);

```

## `uglify/destructured/drop_catch_var`

- tags: `remove unused`
- size: oxc 67 vs reference 66 (no whitespaces: +1, formatted: +2)

```js
try {
	throw new Error('PASS');
} catch ({ name, message }) {
	console.log(message);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
-	throw new Error('PASS');
-} catch ({ message }) {
+	throw Error('PASS');
+} catch ({ name, message }) {
 	console.log(message);
 }

```

## `uglify/destructured/for_in_2`

- tags: `join vars`
- size: oxc 40 vs reference 39 (no whitespaces: +1, formatted: +3)

```js
var a;
for (var { b } in console.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a, b;
-for ({b} in console.log('PASS'));
+var a;
+for (var { b } in console.log('PASS'));

```

## `uglify/destructured/issue_5314_2`

- size: oxc 77 vs reference 76 (no whitespaces: +1, formatted: +3)

```js
A = this;
new function() {
	(({ [console.log(this === A ? 'FAIL' : 'PASS')]: a }) => {})(42);
}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 A = this;
 new function() {
-	[{[console.log(this === A ? 'FAIL' : 'PASS')]: [][0]}] = [42];
+	(({ [console.log(this === A ? 'FAIL' : 'PASS')]: a }) => {})(42);
 }();

```

## `uglify/destructured/issue_5405_1`

- tags: `join vars`
- size: oxc 45 vs reference 44 (no whitespaces: +1, formatted: +3)

```js
var [a] = [{}];
console.log(a === a ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var [a] = [{}];
-console.log(true ? 'PASS' : 'FAIL');
+console.log(a === a ? 'PASS' : 'FAIL');

```

## `uglify/destructured/issue_5405_2`

- tags: `join vars`
- size: oxc 49 vs reference 48 (no whitespaces: +1, formatted: +3)

```js
var { p: a } = { p: [] };
console.log(a === a ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var { p: a } = { p: [] };
-console.log(true ? 'PASS' : 'FAIL');
+console.log(a === a ? 'PASS' : 'FAIL');

```

## `uglify/destructured/issue_5843_1`

- tags: `remove unused`
- size: oxc 47 vs reference 46 (no whitespaces: +1, formatted: +5)

```js
var { p: a } = { __proto__: { p: 'PASS' } };
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = { __proto__: { p: 'PASS' } }.p;
+var { p: a } = { __proto__: { p: 'PASS' } };
 console.log(a);

```

## `uglify/destructured/issue_5866_11`

- tags: `remove unused`
- size: oxc 70 vs reference 69 (no whitespaces: +1, formatted: +8)

```js
var a = {};
var { p: { q: b } } = { p: a = { q: {} } };
console.log(a.q === b ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = {};
-var b = { p: (a = { q: {} }).q }.p;
+var { p: { q: b } } = { p: a = { q: {} } };
 console.log(a.q === b ? 'PASS' : 'FAIL');

```

## `uglify/drop-unused/drop_fargs`

- tags: `remove unused`
- size: oxc 29 vs reference 28 (no whitespaces: +1, formatted: +1)

```js
console.log(function f(a) {
	var b = a;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(function() {}());
+console.log(function(a) {}());

```

## `uglify/drop-unused/issue_1838`

- tags: `join vars`, `remove unused`
- size: oxc 25 vs reference 24 (no whitespaces: +1, formatted: +3)

```js
function f() {
	var b = a;
	while (c);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f() {
-	for (a; c;);
+	a;
+	for (; c;);
 }

```

## `uglify/drop-unused/issue_5271`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 58 (no whitespaces: +1, formatted: +4)

```js
function f() {
	do {
		var a = b = 0 ^ f, b = b;
	} while (console.log(42 - b));
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-(function f() {
+function f() {
 	do {
-		var b;
 		b = 0 ^ f;
+		var b = b;
 	} while (console.log(42 - b));
-})();
+}
+f();

```

## `uglify/evaluate/compound_assignment_to_property`

- size: oxc 34 vs reference 33 (no whitespaces: +1, formatted: +2)

```js
1 + (0 .p >>= 0) && console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-1 + (0 .p >>= 0), console.log('PASS');
+1 + (0 .p >>= 0) && console.log('PASS');

```

## `uglify/evaluate/issue_4119_4`

- tags: `join vars`, `sequences`
- size: oxc 57 vs reference 56 (no whitespaces: +1, formatted: +2)

```js
var a, b;
b = a = { p: 42 };
delete a.p;
console.log(!b ? 'FAIL' : 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-var a, b;
-b = a = { p: 42 };
-delete a.p;
-console.log((b, 0, 'PASS'));
+var a, b = a = { p: 42 };
+delete a.p, console.log(b ? 'PASS' : 'FAIL');

```

## `uglify/evaluate/issue_4271`

- size: oxc 97 vs reference 96 (no whitespaces: +1, formatted: +2)

```js
({
	p: null,
	q: (console.log('foo'), 42),
	p: function() {}
})[console.log('bar'), 'p'] && console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 	p: null,
 	q: (console.log('foo'), 42),
 	p: function() {}
-})[console.log('bar'), 'p'], console.log('PASS');
+})[console.log('bar'), 'p'] && console.log('PASS');

```

## `uglify/functions/inline_loop_5`

- size: oxc 80 vs reference 79 (no whitespaces: +1, formatted: +3)

```js
for (var a in 'foo') {
	(function() {
		function f() {}
		var f;
		console.log(typeof f, a - f);
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-for (var a in 'foo') f = void 0, f = function() {}, void console.log(typeof f, a - f);
-var f;
+for (var a in 'foo') (function() {
+	function f() {}
+	var f;
+	console.log(typeof f, a - f);
+})();

```

## `uglify/functions/inline_loop_6`

- size: oxc 80 vs reference 79 (no whitespaces: +1, formatted: +3)

```js
for (var a in 'foo') {
	(function() {
		var f;
		function f() {}
		console.log(typeof f, a - f);
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-for (var a in 'foo') f = void 0, f = function() {}, void console.log(typeof f, a - f);
-var f;
+for (var a in 'foo') (function() {
+	var f;
+	function f() {}
+	console.log(typeof f, a - f);
+})();

```

## `uglify/functions/inline_loop_7`

- size: oxc 88 vs reference 87 (no whitespaces: +1, formatted: -3)

```js
for (var a in 'foo') {
	(function() {
		function f() {}
		var f;
		while (console.log(typeof f, a - f));
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-for (var a in 'foo') {
-	f = void 0;
-	var f = function() {};
+for (var a in 'foo') (function() {
+	function f() {}
 	var f;
-	while (console.log(typeof f, a - f));
-}
+	for (; console.log(typeof f, a - f););
+})();

```

## `uglify/functions/inline_loop_8`

- size: oxc 88 vs reference 87 (no whitespaces: +1, formatted: -3)

```js
for (var a in 'foo') {
	(function() {
		var f;
		function f() {}
		while (console.log(typeof f, a - f));
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-for (var a in 'foo') {
-	f = void 0;
-	var f = function() {};
+for (var a in 'foo') (function() {
 	var f;
-	while (console.log(typeof f, a - f));
-}
+	function f() {}
+	for (; console.log(typeof f, a - f););
+})();

```

## `uglify/functions/recursive_inline_2`

- tags: `join vars`, `remove unused`
- size: oxc 52 vs reference 51 (no whitespaces: +1, formatted: +2)

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
-console.log(function f(n) {
+function f(n) {
 	return n ? n * f(n - 1) : 1;
-}(5));
+}
+console.log(f(5));

```

## `uglify/hoist_props/issue_2473_1`

- tags: `join vars`, `remove unused`
- size: oxc 19 vs reference 18 (no whitespaces: +1, formatted: +4)

```js
var x = {};
var y = [];
var z = {};

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var x = {};
-var y = [];
+var x = {}, y = [], z = {};

```

## `uglify/hoist_props/issue_2473_2`

- tags: `join vars`, `remove unused`
- size: oxc 19 vs reference 18 (no whitespaces: +1, formatted: +4)

```js
var x = {};
var y = [];
var z = {};

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var x = {};
-var y = [];
+var x = {}, y = [], z = {};

```

## `uglify/hoist_vars/issue_5187_1`

- tags: `join vars`, `remove unused`
- size: oxc 71 vs reference 70 (no whitespaces: +1, formatted: -5)

```js
function f() {
	var a = 42;
	do {
		var b = { 0: a++ };
	} while (console.log(b[b ^= 0]));
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-(function() {
-	var a, b;
-	a = 42;
-	do {
-		b = { 0: a++ };
-	} while (console.log(b[b ^= 0]));
-})();
+function f() {
+	var a = 42;
+	do
+		var b = { 0: a++ };
+	while (console.log(b[b ^= 0]));
+}
+f();

```

## `uglify/ie/issue_4019`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 79 (no whitespaces: +1, formatted: +2)

```js
var a = function() {
	try {
		console.log('FAIL');
	} catch (b) {}
}, a = (console.log(a.length), ++a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-var o = function() {
+var a = function() {
 	try {
 		console.log('FAIL');
-	} catch (o) {}
-};
-console.log(o.length), ++o;
+	} catch {}
+}, a = (console.log(a.length), ++a);

```

## `uglify/imports/mangle`

- size: oxc 67 vs reference 66 (no whitespaces: +1, formatted: +1)

```js
import foo, { bar } from 'baz';
console.log(moo);
import * as moo from 'moz';

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-import o, { bar as m } from 'baz';
-console.log(r);
-import * as r from 'moz';
+import foo, { bar } from 'baz';
+console.log(moo);
+import * as moo from 'moz';

```

## `uglify/imports/non_identifiers`

- size: oxc 57 vs reference 56 (no whitespaces: +1, formatted: +2)

```js
import { '42' as foo } from 'bar';
import { 'foo' as bar } from 'baz';

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 import { '42' as foo } from 'bar';
-import { foo as bar } from 'baz';
+import { 'foo' as bar } from 'baz';

```

## `uglify/imports/rename_mangle`

- size: oxc 67 vs reference 66 (no whitespaces: +1, formatted: +1)

```js
import foo, { bar } from 'baz';
console.log(moo);
import * as moo from 'moz';

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-import o, { bar as m } from 'baz';
-console.log(r);
-import * as r from 'moz';
+import foo, { bar } from 'baz';
+console.log(moo);
+import * as moo from 'moz';

```

## `uglify/issue-1052/not_hoisted_when_already_nested`

- size: oxc 56 vs reference 55 (no whitespaces: +1, formatted: +2)

```js
(function() {
	if (!window) return;
	if (foo) function f() {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function() {
-	if (!window);
-	else if (foo) function f() {}
+	if (!window) return;
+	if (foo) function f() {}
 })();

```

## `uglify/issue-1673/side_effects_label`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 67 (no whitespaces: +1, formatted: +3)

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

## `uglify/issue-1673/side_effects_switch`

- tags: `join vars`, `remove unused`
- size: oxc 79 vs reference 78 (no whitespaces: +1, formatted: +3)

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

## `uglify/join_vars/join_object_assignments_undefined_2`

- tags: `join vars`
- size: oxc 44 vs reference 43 (no whitespaces: +1, formatted: +1)

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

## `uglify/join_vars/join_object_assignments_void_0`

- tags: `join vars`
- size: oxc 44 vs reference 43 (no whitespaces: +1, formatted: +1)

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

## `uglify/keep_fargs/issue_4353_2`

- tags: `join vars`, `remove unused`
- size: oxc 45 vs reference 44 (no whitespaces: +1, formatted: +2)

```js
(function f(a) {
	while (console.log('PASS'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function() {
-	while (console.log('PASS'));
+(function(a) {
+	for (; console.log('PASS'););
 })();

```

## `uglify/let/issue_4212_1`

- tags: `join vars`
- size: oxc 59 vs reference 58 (no whitespaces: +1, formatted: +1)

```js
'use strict';
console.log({ get b() {
	let a = 0;
	return a /= 0;
} }.b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'use strict';
 console.log({ get b() {
 	let a = 0;
-	return a / 0;
+	return a /= 0;
 } }.b);

```

## `uglify/negate-iife/issue_1254_negate_iife_nested`

- size: oxc 63 vs reference 62 (no whitespaces: +1, formatted: +1)

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
@@ -1,5 +1,5 @@
-!function() {
+(function() {
 	return function() {
 		console.log('test');
 	};
-}()()()()();
+})()()()()();

```

## `uglify/negate-iife/issue_1254_negate_iife_true`

- size: oxc 57 vs reference 56 (no whitespaces: +1, formatted: +1)

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
@@ -1,5 +1,5 @@
-!function() {
+(function() {
 	return function() {
 		console.log('test');
 	};
-}()();
+})()();

```

## `uglify/negate-iife/negate_iife_1`

- size: oxc 24 vs reference 23 (no whitespaces: +1, formatted: +1)

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

## `uglify/numbers/evaluate_8_unsafe_math`

- size: oxc 32 vs reference 31 (no whitespaces: +1, formatted: +3)

```js
var a = ['42'];
console.log(a * (1 / 7));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = ['42'];
-console.log(+a / 7);
+console.log(1 / 7 * a);

```

## `uglify/numbers/issue_3531_2`

- size: oxc 22 vs reference 21 (no whitespaces: +1, formatted: +4)

```js
console.log(1 - (2 - {}));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(-1 + +{});
+console.log(1 - (2 - {}));

```

## `uglify/properties/issue_3389`

- tags: `join vars`
- size: oxc 69 vs reference 68 (no whitespaces: +1, formatted: +1)

```js
(function() {
	var a = 'PASS';
	if (delete b) b = a[null] = 42;
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function() {
 	var a = 'PASS';
-	if (delete b) b = a.null = 42;
+	delete b && (b = a[null] = 42);
 	console.log(a);
 })();

```

## `uglify/properties/issue_5682_sub_2`

- size: oxc 64 vs reference 63 (no whitespaces: +1, formatted: +1)

```js
function f(a) {
	return a['foo'];
}
var o = { foo: 'PASS' };
console.log(f(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f(o) {
-	return o['o'];
+function f(a) {
+	return a.foo;
 }
-var o = { o: 'PASS' };
+var o = { foo: 'PASS' };
 console.log(f(o));

```

## `uglify/properties/keep_substituted_property`

- tags: `join vars`
- size: oxc 112 vs reference 111 (no whitespaces: +1, formatted: +1)

```js
var o = { p: [] };
function f(b) {
	return o[b];
}
function g() {
	var a = 'p';
	return o[a] === f(a);
}
console.log(g() ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var o = { p: [] };
-function f(n) {
-	return o[n];
+function f(b) {
+	return o[b];
 }
 function g() {
-	var n = 'p';
-	return o.p === f(n);
+	var a = 'p';
+	return o[a] === f(a);
 }
 console.log(g() ? 'PASS' : 'FAIL');

```

## `uglify/reduce_vars/escape_local_sequence`

- tags: `join vars`, `remove unused`
- size: oxc 143 vs reference 142 (no whitespaces: +1, formatted: +4)

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
-	return function() {}, function() {};
+	function bar() {}
+	return bar;
 }
-(function() {
-	var thing = baz();
-	if (thing !== baz()) console.log('PASS');
-	else console.log('FAIL');
-})();
+main();

```

## `uglify/reduce_vars/issue_1850_2`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 43 (no whitespaces: +1, formatted: +2)

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

## `uglify/reduce_vars/issue_1850_4`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 43 (no whitespaces: +1, formatted: +2)

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

## `uglify/reduce_vars/issue_2450_4`

- tags: `join vars`, `remove unused`
- size: oxc 82 vs reference 81 (no whitespaces: +1, formatted: +2)

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

## `uglify/reduce_vars/issue_2450_5`

- tags: `join vars`, `remove unused`
- size: oxc 91 vs reference 90 (no whitespaces: +1, formatted: -1)

```js
var a;
function f(b) {
	console.log(a === b);
	a = b;
}
function g() {}
[
	1,
	2,
	3
].forEach(function() {
	f(g);
});

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,13 @@
 var a;
+function f(b) {
+	console.log(a === b);
+	a = b;
+}
 function g() {}
 [
 	1,
 	2,
 	3
 ].forEach(function() {
-	(function(b) {
-		console.log(a === b);
-		a = b;
-	})(g);
+	f(g);
 });

```

## `uglify/reduce_vars/issue_3958`

- tags: `join vars`, `remove unused`
- size: oxc 84 vs reference 83 (no whitespaces: +1, formatted: +1)

```js
var a;
(function(b) {
	(function(c) {
		console.log(c[0] = 1);
	})(a = b);
	--a;
})([]);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 (function(b) {
 	(function(c) {
 		console.log(c[0] = 1);
-	})(a = []);
+	})(a = b);
 	--a;
-})();
+})([]);
 console.log(a);

```

## `uglify/reduce_vars/issue_5777_1`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 104 (no whitespaces: +1, formatted: +4)

```js
function f() {
	(function(a) {
		function g() {
			h();
		}
		g();
		a = function() {};
		function h() {
			console.log(a);
		}
	})('PASS');
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f() {
 	(function(a) {
-		(function() {
+		function g() {
 			h();
-		})();
+		}
+		g();
 		a = function() {};
 		function h() {
 			console.log(a);

```

## `uglify/reduce_vars/recursive_inlining_1`

- tags: `join vars`, `remove unused`
- size: oxc 36 vs reference 35 (no whitespaces: +1, formatted: +1)

```js
!function() {
	function foo() {
		bar();
	}
	function bar() {
		foo();
	}
	console.log('PASS');
}();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
+(function() {
 	console.log('PASS');
-}();
+})();

```

## `uglify/reduce_vars/recursive_inlining_2`

- tags: `join vars`, `remove unused`
- size: oxc 36 vs reference 35 (no whitespaces: +1, formatted: +1)

```js
!function() {
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
}();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
+(function() {
 	console.log('PASS');
-}();
+})();

```

## `uglify/reduce_vars/regex_loop`

- tags: `join vars`, `remove unused`
- size: oxc 111 vs reference 110 (no whitespaces: +1, formatted: +2)

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
-var a = /ab*/g;
-(function(x) {
+function f(x) {
 	for (var r, s = 'acdabcdeabbb'; r = x().exec(s);) console.log(r[0]);
-})(function() {
+}
+var a = /ab*/g;
+f(function() {
 	return a;
 });

```

## `uglify/reduce_vars/unsafe_evaluate_modified`

- tags: `join vars`, `remove unused`
- size: oxc 614 vs reference 613 (no whitespaces: +1, formatted: +6)

```js
console.log(function() {
	var o = { p: 1 };
	o.p++;
	console.log(o.p);
	return o.p;
}());
console.log(function() {
	var o = { p: 2 };
	--o.p;
	console.log(o.p);
	return o.p;
}());
console.log(function() {
	var o = { p: 3 };
	o.p += '';
	console.log(o.p);
	return o.p;
}());
console.log(function() {
	var o = { p: 4 };
	o = {};
	console.log(o.p);
	return o.p;
}());
console.log(function() {
	var o = { p: 5 };
	o.p = -9;
	console.log(o.p);
	return o.p;
}());
function inc() {
	this.p++;
}
console.log(function() {
	var o = { p: 6 };
	inc.call(o);
	console.log(o.p);
	return o.p;
}());
console.log(function() {
	var o = { p: 7 };
	console.log([o][0].p++);
	return o.p;
}());
console.log(function() {
	var o = { p: 8 };
	console.log({ q: o }.q.p++);
	return o.p;
}());

```

```diff
--- reference
+++ oxc
@@ -17,7 +17,7 @@
 	return o.p;
 }());
 console.log(function() {
-	var o;
+	var o = { p: 4 };
 	o = {};
 	console.log(o.p);
 	return o.p;
@@ -39,7 +39,7 @@
 }());
 console.log(function() {
 	var o = { p: 7 };
-	console.log([o][0].p++);
+	console.log(o.p++);
 	return o.p;
 }());
 console.log(function() {

```

## `uglify/reduce_vars/var_assign_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 31 vs reference 30 (no whitespaces: +1, formatted: +1)

```js
!function() {
	var a;
	a = 2;
	console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
+(function() {
 	console.log(2);
-}();
+})();

```

## `uglify/reduce_vars/var_assign_4`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 37 vs reference 36 (no whitespaces: +1, formatted: +1)

```js
!function a() {
	a = 2;
	console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function a() {
+(function a() {
 	a = 2, console.log(a);
-}();
+})();

```

## `uglify/rests/drop_new_function`

- size: oxc 45 vs reference 44 (no whitespaces: +1, formatted: +3)

```js
new function(...{ [console.log('PASS')]: a }) {}();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-void ([...{[console.log('PASS')]: [][0]}] = []);
+new function(...{ [console.log('PASS')]: a }) {}();

```

## `uglify/rests/drop_unused_call_args_1`

- tags: `remove unused`
- size: oxc 60 vs reference 59 (no whitespaces: +1, formatted: +1)

```js
(function(...a) {
	console.log(a[0]);
})(42, console.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function(a) {
+(function(...a) {
 	console.log(a[0]);
-})([42, console.log('PASS')]);
+})(42, console.log('PASS'));

```

## `uglify/rests/retain_funarg_destructured_array_2`

- tags: `remove unused`
- size: oxc 52 vs reference 51 (no whitespaces: +1, formatted: +1)

```js
console.log(function([a, ...b]) {
	return b;
}('bar')[1]);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function([, ...b]) {
+console.log(function([a, ...b]) {
 	return b;
 }('bar')[1]);

```

## `uglify/sequences/func_def_1`

- tags: `join vars`
- size: oxc 45 vs reference 44 (no whitespaces: +1, formatted: +1)

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
-	return !!(f = 0);
+	return f = 0, !!f;
 }
 console.log(f());

```

## `uglify/sequences/func_def_3`

- tags: `join vars`
- size: oxc 59 vs reference 58 (no whitespaces: +1, formatted: +1)

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
-	return !!(g = 0);
+	return g = 0, !!g;
 }
 console.log(f());

```

## `uglify/sequences/func_def_4`

- tags: `join vars`
- size: oxc 69 vs reference 68 (no whitespaces: +1, formatted: +1)

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
-		return !!(g = 0);
+		return g = 0, !!g;
 	}
 	return g();
 }

```

## `uglify/side_effects/issue_4730_2`

- size: oxc 38 vs reference 37 (no whitespaces: +1, formatted: +1)

```js
var a;
!console.log('PASS') || a && a[a.p];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-console.log('PASS') && a && a[a.p];
+!console.log('PASS') || a && a[a.p];

```

## `uglify/side_effects/issue_5860_keep_1`

- tags: `join vars`
- size: oxc 82 vs reference 81 (no whitespaces: +1, formatted: +1)

```js
var a = {};
a.p;
a.q;
var a = null;
try {
	a.r;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 var a = {};
 a.p;
+a.q;
 var a = null;
 try {
 	a.r;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/side_effects/issue_5860_keep_2`

- tags: `join vars`
- size: oxc 78 vs reference 77 (no whitespaces: +1, formatted: +1)

```js
a = {};
a.p;
a.q;
var a = null;
try {
	a.r;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 a = {};
 a.p;
+a.q;
 var a = null;
 try {
 	a.r;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/side_effects/issue_5860_keep_3`

- tags: `join vars`
- size: oxc 78 vs reference 77 (no whitespaces: +1, formatted: +1)

```js
var a = {};
a.p;
a.q;
a = null;
try {
	a.r;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 var a = {};
 a.p;
+a.q;
 a = null;
 try {
 	a.r;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/side_effects/keep_access_after_call`

- tags: `join vars`
- size: oxc 95 vs reference 94 (no whitespaces: +1, formatted: +1)

```js
var o = {};
o.p;
o.q;
f();
try {
	o.r;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}
function f() {
	o = null;
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 var o = {};
 o.p;
+o.q;
 f();
 try {
 	o.r;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }
 function f() {

```

## `uglify/switches/issue_1663`

- tags: `sequences`
- size: oxc 72 vs reference 71 (no whitespaces: +1, formatted: -1)

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
@@ -1,8 +1,6 @@
 var a = 100, b = 10;
 function f() {
+	return b = a++, ++b;
 	var b;
-	b = a++;
-	return ++b;
 }
-f();
-console.log(a, b);
+f(), console.log(a, b);

```

## `uglify/templates/issue_5145_2`

- size: oxc 44 vs reference 43 (no whitespaces: +1, formatted: -7)

```js
var a = [];
console.log(`${a}${a}${a[0] = 42}
`);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = [];
-console.log('' + a + a + (a[0] = 42) + `
+console.log(`${a}${a}${a[0] = 42}
 `);

```

## `uglify/varify/forin_let_2`

- tags: `join vars`
- size: oxc 57 vs reference 56 (no whitespaces: +1, formatted: +1)

```js
let o = {
	p: 42,
	q: 'PASS'
};
for (let [k] in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var o = {
+let o = {
 	p: 42,
 	q: 'PASS'
-}, k;
-for ([k] in o) console.log(k, o[k]);
+};
+for (let [k] in o) console.log(k, o[k]);

```

## `uglify/varify/issue_4933_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 50 vs reference 49 (no whitespaces: +1, formatted: +2)

```js
console.log(f());
function f() {
	var a;
	for (console in a = [f]) {
		const b = a;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log(function f() {
+console.log(f());
+function f() {
 	for (console in [f]);
-}());
+}

```

## `uglify/yields/negate_iife`

- size: oxc 46 vs reference 45 (no whitespaces: +1, formatted: +1)

```js
(function* (a) {
	console.log(a);
})('PASS').next();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function* (a) {
+(function* (a) {
 	console.log(a);
-}('PASS').next();
+})('PASS').next();

```

## `uglify/yields/reduce_iife_1`

- tags: `join vars`, `remove unused`
- size: oxc 52 vs reference 51 (no whitespaces: +1, formatted: +1)

```js
console.log(function* (a) {
	yield a;
}(42).next().value);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function* (a) {
-	yield 42;
-}().next().value);
+	yield a;
+}(42).next().value);

```

## `uglify/yields/reduce_tagged`

- tags: `join vars`, `remove unused`
- size: oxc 91 vs reference 90 (no whitespaces: +1, formatted: +3)

```js
function* f() {
	function g() {
		h`foo`;
	}
	g();
	function h(s) {
		console.log(s[0]);
	}
	h(['bar']);
}
f().next();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 function* f() {
-	(function() {
+	function g() {
 		h`foo`;
-	})();
+	}
+	g();
 	function h(s) {
 		console.log(s[0]);
 	}

```

## `uglify/yields/reduce_tagged_async`

- tags: `join vars`, `remove unused`
- size: oxc 97 vs reference 96 (no whitespaces: +1, formatted: +3)

```js
async function* f() {
	function g() {
		h`foo`;
	}
	g();
	function h(s) {
		console.log(s[0]);
	}
	h(['bar']);
}
f().next();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 async function* f() {
-	(function() {
+	function g() {
 		h`foo`;
-	})();
+	}
+	g();
 	function h(s) {
 		console.log(s[0]);
 	}

```

## `uglify/annotations/issue_3858`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 65 (no whitespaces: +2, formatted: +2)

```js
var f = function(a) {
	return function(b) {
		console.log(b);
	}(a);
};
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var f = function(a) {
-	return function() {
-		console.log(a);
-	}();
+	return function(b) {
+		console.log(b);
+	}(a);
 };
 f('PASS');

```

## `uglify/arrows/inline_iife_within_arrow`

- size: oxc 75 vs reference 73 (no whitespaces: +2, formatted: -2)

```js
var f = () => console.log(function(a) {
	return Math.ceil(a);
}(Math.random()));
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var f = () => {
-	return console.log((a = Math.random(), Math.ceil(a)));
-	var a;
-};
+var f = () => console.log(function(a) {
+	return Math.ceil(a);
+}(Math.random()));
 f();

```

## `uglify/arrows/reduce_iife_1`

- tags: `join vars`, `remove unused`
- size: oxc 26 vs reference 24 (no whitespaces: +2, formatted: +6)

```js
((a) => console.log(a + a))(21);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(() => console.log(42))();
+((a) => console.log(a + a))(21);

```

## `uglify/arrows/reduce_iife_2`

- tags: `join vars`, `remove unused`
- size: oxc 26 vs reference 24 (no whitespaces: +2, formatted: +5)

```js
var a = 21;
(() => console.log(a + a))();

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-(() => console.log(42))();
+var a = 21;
+console.log(a + a);

```

## `uglify/assignments/increment_decrement_2`

- tags: `join vars`, `2 iterations`
- size: oxc 57 vs reference 55 (no whitespaces: +2, formatted: +6)

```js
console.log(function(a) {
	a = a + 1;
	a = a - 1;
	a += 1;
	a -= 1;
	return a;
}(42));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 console.log(function(a) {
-	++a;
+	a += 1;
 	--a;
-	++a;
+	a += 1;
 	--a;
 	return a;
 }(42));

```

## `uglify/assignments/issue_4827_1`

- tags: `join vars`
- size: oxc 51 vs reference 49 (no whitespaces: +2, formatted: +3)

```js
A = 'FAIL';
var a = A, b = 'PASS', c;
c &&= b = a, console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var a = A = 'FAIL', b = 'PASS', c;
+A = 'FAIL';
+var a = A, b = 'PASS', c;
 c &&= b = a, console.log(b);

```

## `uglify/assignments/logical_collapse_vars_2`

- tags: `join vars`
- size: oxc 71 vs reference 69 (no whitespaces: +2, formatted: +4)

```js
var a = 'PASS';
(function(b) {
	b ||= (a = 'FAIL', {});
	return b;
})(console).log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = 'PASS';
 (function(b) {
-	return b ||= (a = 'FAIL', {});
+	b ||= (a = 'FAIL', {});
+	return b;
 })(console).log(a);

```

## `uglify/assignments/logical_collapse_vars_3`

- tags: `join vars`
- size: oxc 39 vs reference 37 (no whitespaces: +2, formatted: +1)

```js
var a = 6;
a *= 7;
a ??= 'FAIL';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var a = 6;
-a = a * 7 ?? 'FAIL';
+a *= 7;
+a ??= 'FAIL';
 console.log(a);

```

## `uglify/assignments/op_equals_right_local_var`

- size: oxc 177 vs reference 175 (no whitespaces: +2, formatted: +9)

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

## `uglify/classes/collapse_rhs`

- tags: `join vars`
- size: oxc 67 vs reference 65 (no whitespaces: +2, formatted: +3)

```js
'use strict';
var a = 'FAIL';
a = 'PASS';
class A {
	p = 'PASS';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 'use strict';
 var a = 'FAIL';
+a = 'PASS';
 class A {
 	p = 'PASS';
 }
-console.log(a = 'PASS');
+console.log(a);

```

## `uglify/classes/collapse_rhs_static`

- tags: `join vars`
- size: oxc 74 vs reference 72 (no whitespaces: +2, formatted: +3)

```js
'use strict';
var a = 'FAIL';
a = 'PASS';
class A {
	static p = 'PASS';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 'use strict';
 var a = 'FAIL';
+a = 'PASS';
 class A {
 	static p = 'PASS';
 }
-console.log(a = 'PASS');
+console.log(a);

```

## `uglify/classes/issue_5531_3`

- size: oxc 99 vs reference 97 (no whitespaces: +2, formatted: +10)

```js
class A {
	static {
		(function() {
			var a = function f() {
				if (!a) console.log('foo');
				return 42;
			}(a++);
		})();
	}
}
new A();
new A();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 class A {
 	static {
-		a = function f() {
-			if (!a) console.log('foo');
-			return 42;
-		}(a++), void 0;
-		var a;
+		(function() {
+			var a = function() {
+				a || console.log('foo');
+				return 42;
+			}(a++);
+		})();
 	}
 }
 new A();

```

## `uglify/classes/property_side_effects`

- tags: `remove unused`
- size: oxc 61 vs reference 59 (no whitespaces: +2, formatted: +3)

```js
'use strict';
(function f(a, b) {
	class A {
		[a.log('PASS')]() {
			b.log('FAIL');
		}
	}
})(console, console);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use strict';
-(function(a) {
+(function(a, b) {
 	a.log('PASS');
 })(console, console);

```

## `uglify/classes/property_side_effects_static`

- tags: `remove unused`
- size: oxc 61 vs reference 59 (no whitespaces: +2, formatted: +3)

```js
'use strict';
(function f(a, b) {
	class A {
		static [a.log('PASS')]() {
			b.log('FAIL');
		}
	}
})(console, console);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use strict';
-(function(a) {
+(function(a, b) {
 	a.log('PASS');
 })(console, console);

```

## `uglify/collapse_vars/cascade_conditional`

- tags: `join vars`
- size: oxc 42 vs reference 40 (no whitespaces: +2, formatted: +4)

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

## `uglify/collapse_vars/cascade_forin`

- tags: `join vars`
- size: oxc 77 vs reference 75 (no whitespaces: +2, formatted: +3)

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

## `uglify/collapse_vars/collapse_rhs_lhs_2`

- tags: `join vars`
- size: oxc 56 vs reference 54 (no whitespaces: +2, formatted: +6)

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
-	b[b] = 0;
+(function(f) {
+	f = b;
+	f[b] = 0;
 })();
 console.log('PASS');

```

## `uglify/collapse_vars/collapse_vars_arguments_2`

- tags: `join vars`
- size: oxc 98 vs reference 96 (no whitespaces: +2, formatted: +4)

```js
function log(a, b) {
	console.log(b);
}
function f(c) {
	var d = arguments[0];
	c = 'FAIL';
	log(c, d);
}
f();
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,8 @@
 }
 function f(c) {
 	var d = arguments[0];
-	log(c = 'FAIL', d);
+	c = 'FAIL';
+	log(c, d);
 }
 f();
 f('PASS');

```

## `uglify/collapse_vars/collapse_vars_arguments_3`

- tags: `join vars`
- size: oxc 127 vs reference 125 (no whitespaces: +2, formatted: +4)

```js
function log(a, b) {
	console.log(b);
}
function f(c) {
	var args = arguments;
	console.log(c);
	var d = args[0];
	c = 'FAIL';
	log(c, d);
}
f();
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -5,7 +5,8 @@
 	var args = arguments;
 	console.log(c);
 	var d = args[0];
-	log(c = 'FAIL', d);
+	c = 'FAIL';
+	log(c, d);
 }
 f();
 f('PASS');

```

## `uglify/collapse_vars/collapse_vars_if`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 156 vs reference 154 (no whitespaces: +2, formatted: -2)

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
@@ -1,11 +1,9 @@
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
 	return x ? 1 : 2;

```

## `uglify/collapse_vars/compound_assignment_4`

- tags: `join vars`
- size: oxc 53 vs reference 51 (no whitespaces: +2, formatted: +4)

```js
A = 'PASS';
var a = '';
a += (a = 'FAIL', A);
a.p;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
+A = 'PASS';
 var a = '';
-(a += (a = 'FAIL', A = 'PASS')).p;
+a += (a = 'FAIL', A);
+a.p;
 console.log(a);

```

## `uglify/collapse_vars/compound_assignment_7`

- tags: `join vars`
- size: oxc 60 vs reference 58 (no whitespaces: +2, formatted: +1)

```js
var a = 'FA';
a = a + 'I';
a = a + 'L';
if (console) a = 'PASS';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = 'FA';
-a = a + 'I' + 'L';
-if (console) a = 'PASS';
+a += 'I';
+a += 'L';
+console && (a = 'PASS');
 console.log(a);

```

## `uglify/collapse_vars/issue_1631_2`

- tags: `join vars`, `sequences`
- size: oxc 93 vs reference 91 (no whitespaces: +2, formatted: +3)

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

## `uglify/collapse_vars/issue_2319_1`

- tags: `join vars`, `remove unused`
- size: oxc 63 vs reference 61 (no whitespaces: +2, formatted: -1)

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
 console.log(function(a) {
-	return !function() {
-		return this;
-	}();
-}());
+	return a;
+}(!function() {
+	return this;
+}()));

```

## `uglify/collapse_vars/issue_2319_3`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 74 (no whitespaces: +2, formatted: -1)

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
 console.log(function(a) {
-	return !function() {
-		return this;
-	}();
-}());
+	return a;
+}(!function() {
+	return this;
+}()));

```

## `uglify/collapse_vars/issue_3305`

- tags: `join vars`, `sequences`
- size: oxc 114 vs reference 112 (no whitespaces: +2, formatted: +4)

```js
function calc(a) {
	var x, w;
	if (a) {
		x = a;
		w = 1;
	} else {
		x = 1;
		w = 0;
	}
	return add(x, w);
}
function add(x, w) {
	return x + w;
}
console.log(calc(41));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function calc(a) {
 	var x, w;
-	return w = a ? (x = a, 1) : (x = 1, 0), add(x, w);
+	return a ? (x = a, w = 1) : (x = 1, w = 0), add(x, w);
 }
 function add(x, w) {
 	return x + w;

```

## `uglify/collapse_vars/issue_3327`

- tags: `join vars`, `sequences`
- size: oxc 117 vs reference 115 (no whitespaces: +2, formatted: +4)

```js
var a, b, l = ['PASS', 42];
if (l.length === 1) {
	a = l[0].a;
	b = l[0].b;
} else {
	a = l[0];
	b = l[1];
}
function echo(a, b) {
	console.log(a, b);
}
echo(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var a, b, l = ['PASS', 42];
+l.length === 1 ? (a = l[0].a, b = l[0].b) : (a = l[0], b = l[1]);
 function echo(a, b) {
 	console.log(a, b);
 }
-b = 1 === l.length ? (a = l[0].a, l[0].b) : (a = l[0], l[1]), echo(a, b);
+echo(a, b);

```

## `uglify/collapse_vars/issue_4430_2`

- tags: `join vars`
- size: oxc 98 vs reference 96 (no whitespaces: +2, formatted: +3)

```js
function f(a) {
	switch (a = 0, arguments[0]) {
		case 0: return 'PASS';
		case 1: return 'FAIL';
	}
}
console.log(f(1));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a) {
-	switch (arguments[a = 0]) {
+	switch (a = 0, arguments[0]) {
 		case 0: return 'PASS';
 		case 1: return 'FAIL';
 	}

```

## `uglify/collapse_vars/issue_5869`

- tags: `join vars`, `remove unused`
- size: oxc 47 vs reference 45 (no whitespaces: +2, formatted: +6)

```js
var a, b, log = console.log;
log();
a.p = 0;
b = a;
log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-var a, log = console.log;
+var a, b, log = console.log;
 log();
-log(void (a.p = 0));
+a.p = 0;
+b = a;
+log(b);

```

## `uglify/collapse_vars/issue_5915_4`

- tags: `join vars`
- size: oxc 46 vs reference 44 (no whitespaces: +2, formatted: +8)

```js
{
	f = void 0;
	function f() {}
	console.log(typeof f);
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-function f() {}
-console.log(typeof (f = void 0));
+{
+	f = void 0;
+	function f() {}
+	console.log(typeof f);
+}

```

## `uglify/collapse_vars/mangleable_assignment_1`

- tags: `join vars`, `remove unused`
- size: oxc 86 vs reference 84 (no whitespaces: +2, formatted: +3)

```js
var o = { p: function() {
	return 6;
} };
(function() {
	var a, b = a = o.p();
	console.log(a * (b / a + b));
})();

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,6 @@
 	return 6;
 } };
 (function() {
-	var a;
-	a = o.p();
-	console.log(a * (a / a + a));
+	var a, b = a = o.p();
+	console.log(a * (b / a + b));
 })();

```

## `uglify/collapse_vars/mangleable_assignment_2`

- tags: `join vars`, `remove unused`
- size: oxc 83 vs reference 81 (no whitespaces: +2, formatted: +4)

```js
var o = { p: function() {
	return 6;
} };
(function(a, b) {
	b = a = o.p();
	console.log(a * (b / a + b));
})();

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 	return 6;
 } };
 (function(a, b) {
-	a = o.p();
-	console.log(a * (a / a + a));
+	b = a = o.p();
+	console.log(a * (b / a + b));
 })();

```

## `uglify/collapse_vars/ref_scope`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 86 (no whitespaces: +2, formatted: +2)

```js
console.log(function() {
	var a = 1, b = 2, c = 3;
	var a = c++, b = b /= a;
	return function() {
		return a;
	}() + b;
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 console.log(function() {
-	var a = 1, b = 2, c = 3;
-	b = b /= a = c++;
+	var a = 1, b = 2, c = 3, a = c++, b = b /= a;
 	return function() {
 		return a;
 	}() + b;

```

## `uglify/comparisons/unsafe_comps`

- tags: `sequences`
- size: oxc 96 vs reference 94 (no whitespaces: +2, formatted: +2)

```js
var obj1, obj2;
obj1 <= obj2 ? f1() : g1();
obj1 < obj2 ? f2() : g2();
obj1 >= obj2 ? f3() : g3();
obj1 > obj2 ? f4() : g4();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
 var obj1, obj2;
-(obj2 < obj1 ? g1 : f1)();
-(obj1 < obj2 ? f2 : g2)();
-(obj1 < obj2 ? g3 : f3)();
-(obj2 < obj1 ? f4 : g4)();
+obj1 <= obj2 ? f1() : g1(), obj1 < obj2 ? f2() : g2(), obj1 >= obj2 ? f3() : g3(), obj1 > obj2 ? f4() : g4();

```

## `uglify/concat-strings/issue_5145`

- size: oxc 42 vs reference 40 (no whitespaces: +2, formatted: +2)

```js
var a = [];
console.log('' + a + ((a[0] = 4) + '2'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = [];
-console.log('' + a + (a[0] = 4) + '2');
+console.log('' + a + ((a[0] = 4) + '2'));

```

## `uglify/conditionals/cond_seq_assign_1`

- tags: `sequences`
- size: oxc 86 vs reference 84 (no whitespaces: +2, formatted: +4)

```js
function f(a) {
	var t;
	if (a) {
		t = 'foo';
		t = 'bar';
	} else {
		console.log(t);
		t = 42;
	}
	console.log(t);
}
f(f);
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a) {
 	var t;
-	t = a ? (t = 'foo', 'bar') : (console.log(t), 42), console.log(t);
+	a ? (t = 'foo', t = 'bar') : (console.log(t), t = 42), console.log(t);
 }
 f(f), f();

```

## `uglify/conditionals/issue_5232_3`

- tags: `sequences`
- size: oxc 109 vs reference 107 (no whitespaces: +2, formatted: +11)

```js
console.log(function() {
	return function() {
		if (console) console.log('PASS');
		else {
			var a = null;
			return 'FAIL';
		}
	};
}()());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 console.log(function() {
 	return function() {
-		var a;
-		if (!console) return a = null, 'FAIL';
-		console.log('PASS');
+		if (console) console.log('PASS');
+		else {
+			var a = null;
+			return 'FAIL';
+		}
 	};
 }()());

```

## `uglify/conditionals/ternary_boolean_alternative`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 224 vs reference 222 (no whitespaces: +2, formatted: +5)

```js
function f1() {
	return a == b ? x : true;
}
function f2() {
	return a == b ? x : false;
}
function f3() {
	return a < b ? x : !0;
}
function f4() {
	return a < b ? x : !1;
}
function f5() {
	return c ? x : true;
}
function f6() {
	return c ? x : !1;
}
function f7() {
	return !c ? x : !0;
}
function f8() {
	return !c ? x : false;
}

```

```diff
--- reference
+++ oxc
@@ -5,7 +5,7 @@
 	return a == b && x;
 }
 function f3() {
-	return !(a < b) || x;
+	return a < b ? x : !0;
 }
 function f4() {
 	return a < b && x;
@@ -14,10 +14,10 @@
 	return !c || x;
 }
 function f6() {
-	return !!c && x;
+	return c ? x : !1;
 }
 function f7() {
-	return !!c || x;
+	return c ? !0 : x;
 }
 function f8() {
 	return !c && x;

```

## `uglify/conditionals/ternary_boolean_consequent`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 224 vs reference 222 (no whitespaces: +2, formatted: +5)

```js
function f1() {
	return a == b ? true : x;
}
function f2() {
	return a == b ? false : x;
}
function f3() {
	return a < b ? !0 : x;
}
function f4() {
	return a < b ? !1 : x;
}
function f5() {
	return c ? !0 : x;
}
function f6() {
	return c ? false : x;
}
function f7() {
	return !c ? true : x;
}
function f8() {
	return !c ? !1 : x;
}

```

```diff
--- reference
+++ oxc
@@ -8,10 +8,10 @@
 	return a < b || x;
 }
 function f4() {
-	return !(a < b) && x;
+	return a < b ? !1 : x;
 }
 function f5() {
-	return !!c || x;
+	return c ? !0 : x;
 }
 function f6() {
 	return !c && x;
@@ -20,5 +20,5 @@
 	return !c || x;
 }
 function f8() {
-	return !!c && x;
+	return c ? x : !1;
 }

```

## `uglify/const/retain_tail_1`

- tags: `sequences`
- size: oxc 146 vs reference 144 (no whitespaces: +2, formatted: +4)

```js
function f(a) {
	var b = 'foo';
	if (a) {
		const b = 'bar';
		while (console.log('baz'));
		console.log(b);
	} else {
		while (console.log('moo'));
		console.log(b);
	}
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,12 @@
 function f(a) {
 	var b = 'foo';
 	if (a) {
-		const b = 'bar';
-		while (console.log('baz'));
-		console.log(b);
+		let b = 'bar';
+		for (; console.log('baz'););
+		console.log('bar');
 	} else {
-		while (console.log('moo'));
+		for (; console.log('moo'););
 		console.log(b);
 	}
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/const/retain_tail_2`

- tags: `sequences`
- size: oxc 146 vs reference 144 (no whitespaces: +2, formatted: +4)

```js
function f(a) {
	var b = 'foo';
	if (a) {
		while (console.log('bar'));
		console.log(b);
	} else {
		const b = 'baz';
		while (console.log('moo'));
		console.log(b);
	}
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,12 @@
 function f(a) {
 	var b = 'foo';
 	if (a) {
-		while (console.log('bar'));
+		for (; console.log('bar'););
 		console.log(b);
 	} else {
-		const b = 'baz';
-		while (console.log('moo'));
-		console.log(b);
+		let b = 'baz';
+		for (; console.log('moo'););
+		console.log('baz');
 	}
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/dead-code/catch_return_assign_may_throw`

- size: oxc 72 vs reference 70 (no whitespaces: +2, formatted: +4)

```js
function f() {
	try {
		throw 'FAIL';
	} catch (e) {
		return e = console.log('PASS');
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	try {
 		throw 'FAIL';
 	} catch (e) {
-		return console.log('PASS');
+		return e = console.log('PASS');
 	}
 }
 f();

```

## `uglify/dead-code/consecutive_assignments`

- size: oxc 46 vs reference 44 (no whitespaces: +2, formatted: +5)

```js
while (a = void 0, a = 'PASS', console.log(a));
var a;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-while (void 0, a = 'PASS', console.log(a));
+for (; a = void 0, a = 'PASS', console.log(a););
 var a;

```

## `uglify/dead-code/issue_5106_2`

- size: oxc 69 vs reference 67 (no whitespaces: +2, formatted: +4)

```js
'use strict';
console.log(function(a) {
	return a = arguments;
}('PASS')[0]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use strict';
 console.log(function(a) {
-	return arguments;
+	return a = arguments;
 }('PASS')[0]);

```

## `uglify/dead-code/last_assign_catch`

- size: oxc 65 vs reference 63 (no whitespaces: +2, formatted: +4)

```js
function f() {
	try {
		throw 'FAIL';
	} catch (e) {
		e = console.log('PASS');
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	try {
 		throw 'FAIL';
 	} catch (e) {
-		console.log('PASS');
+		e = console.log('PASS');
 	}
 }
 f();

```

## `uglify/dead-code/last_assign_finally`

- size: oxc 75 vs reference 73 (no whitespaces: +2, formatted: +4)

```js
function f(a) {
	try {
		throw a.log;
	} catch (e) {
		a = e;
	} finally {
		a = a('PASS');
	}
}
f(console);

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 	} catch (e) {
 		a = e;
 	} finally {
-		a('PASS');
+		a = a('PASS');
 	}
 }
 f(console);

```

## `uglify/dead-code/last_assign_statement`

- size: oxc 41 vs reference 39 (no whitespaces: +2, formatted: +4)

```js
function f(a) {
	a = a('PASS');
}
f(console.log);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	a('PASS');
+	a = a('PASS');
 }
 f(console.log);

```

## `uglify/dead-code/self_assignments_1`

- size: oxc 32 vs reference 30 (no whitespaces: +2, formatted: +4)

```js
var a = 'PASS';
a = a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 'PASS';
-a;
+a = a;
 console.log(a);

```

## `uglify/default-values/inline_loop_1`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 42 (no whitespaces: +2, formatted: +6)

```js
while (function f(a = 'PASS') {
	console.log(a);
}());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-while (a = 'PASS', void console.log(a));
-var a;
+for (; function(a = 'PASS') {
+	console.log(a);
+}(););

```

## `uglify/default-values/issue_5566_5`

- size: oxc 82 vs reference 80 (no whitespaces: +2, formatted: +1)

```js
(function(a, f = function() {
	return a;
}) {
	var a = 'foo';
	var b;
	console.log(a, f());
})('bar');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 (function(a, f = function() {
 	return a;
 }) {
-	var a, b;
-	a = 'foo';
+	var a = 'foo';
+	var b;
 	console.log(a, f());
 })('bar');

```

## `uglify/default-values/issue_5863`

- tags: `join vars`
- size: oxc 82 vs reference 80 (no whitespaces: +2, formatted: +3)

```js
console.log(typeof function f(a = function() {
	f = 42;
	return f;
}()) {
	var f;
	var f;
	return a;
}());

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 	f = 42;
 	return f;
 }()) {
-	var f;
+	var f, f;
 	return a;
 }());

```

## `uglify/default-values/process_boolean_returns`

- tags: `join vars`
- size: oxc 98 vs reference 96 (no whitespaces: +2, formatted: +2)

```js
console.log(function(a = console.log('FAIL 1')) {
	return a() ? 'PASS' : 'FAIL 2';
}(function() {
	return 42;
}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(function(a = console.log('FAIL 1')) {
-	return 42 ? 'PASS' : 'FAIL 2';
+	return a() ? 'PASS' : 'FAIL 2';
 }(function() {
-	return 1;
+	return 42;
 }));

```

## `uglify/destructured/computed_key_evaluate`

- tags: `join vars`
- size: oxc 62 vs reference 60 (no whitespaces: +2, formatted: +2)

```js
var a = 0, { [++a]: b } = ['FAIL 1', a ? 'FAIL 2' : 'PASS'];
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = 0, { [1]: b } = ['FAIL 1', 0 ? 'FAIL 2' : 'PASS'];
+var a = 0, { [++a]: b } = ['FAIL 1', a ? 'FAIL 2' : 'PASS'];
 console.log(b);

```

## `uglify/destructured/fn_name_evaluate`

- tags: `join vars`
- size: oxc 92 vs reference 90 (no whitespaces: +2, formatted: +2)

```js
console.log(function f({ [typeof f]: a }) {
	var f;
	return a;
}({
	function: 'PASS',
	undefined: 'FAIL'
}));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log(function f({ function: a }) {
+console.log(function f({ [typeof f]: a }) {
 	var f;
 	return a;
 }({

```

## `uglify/destructured/issue_4286_2`

- tags: `join vars`
- size: oxc 43 vs reference 41 (no whitespaces: +2, formatted: +3)

```js
a = ['PASS'];
var b, { a } = b = a;
console.log(b[0]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var b, { a } = b = a = ['PASS'];
+a = ['PASS'];
+var b, { a } = b = a;
 console.log(b[0]);

```

## `uglify/destructured/issue_5074_method`

- tags: `remove unused`
- size: oxc 38 vs reference 36 (no whitespaces: +2, formatted: +2)

```js
({} = { [(console.log('PASS'), 42)]() {} });

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-({} = { [(console.log('PASS'), 42)]: 0 });
+({} = { [(console.log('PASS'), 42)]() {} });

```

## `uglify/destructured/issue_5866_1`

- tags: `remove unused`
- size: oxc 56 vs reference 54 (no whitespaces: +2, formatted: +5)

```js
var a = {};
var { p: { q: b } } = {
	p: a,
	r: a.q = 'PASS'
};
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a = {};
-var { q: b } = {
+var { p: { q: b } } = {
 	p: a,
 	r: a.q = 'PASS'
-}.p;
+};
 console.log(b);

```

## `uglify/destructured/issue_5866_10`

- tags: `remove unused`
- size: oxc 67 vs reference 65 (no whitespaces: +2, formatted: +3)

```js
var a = {}, b, c;
[b, {p: c}] = [a.p = {}, a];
console.log(b === c ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var b, c, a = {};
-[b, c] = [a.p = {}, a.p];
+var a = {}, b, c;
+[b, {p: c}] = [a.p = {}, a];
 console.log(b === c ? 'PASS' : 'FAIL');

```

## `uglify/destructured/issue_5866_2`

- tags: `remove unused`
- size: oxc 57 vs reference 55 (no whitespaces: +2, formatted: +3)

```js
var a = {}, b;
({p: {q: b}} = {
	p: a,
	r: a.q = 'PASS'
});
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var b, a = {};
-({q: b} = {
+var a = {}, b;
+({p: {q: b}} = {
 	p: a,
 	r: a.q = 'PASS'
-}.p);
+});
 console.log(b);

```

## `uglify/destructured/issue_5866_9`

- tags: `remove unused`
- size: oxc 66 vs reference 64 (no whitespaces: +2, formatted: +5)

```js
var a = {};
var [b, { p: c }] = [a.p = {}, a];
console.log(b === c ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = {};
-var [b, c] = [a.p = {}, a.p];
+var [b, { p: c }] = [a.p = {}, a];
 console.log(b === c ? 'PASS' : 'FAIL');

```

## `uglify/destructured/mangle_properties`

- size: oxc 54 vs reference 52 (no whitespaces: +2, formatted: +3)

```js
function f({ p: a }) {
	return a;
}
console.log(f({ p: 'PASS' }));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function f({ n }) {
-	return n;
+function f({ p: a }) {
+	return a;
 }
-console.log(f({ n: 'PASS' }));
+console.log(f({ p: 'PASS' }));

```

## `uglify/drop-unused/assign_if_assign_read`

- tags: `join vars`, `remove unused`
- size: oxc 103 vs reference 101 (no whitespaces: +2, formatted: +4)

```js
(function(a) {
	var b;
	do {
		b = 'FAIL';
		if (Array.isArray(a)) {
			b = a[0];
			console.log(b);
		}
	} while (!console);
})(['PASS']);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 (function(a) {
 	var b;
 	do {
-		'FAIL';
+		b = 'FAIL';
 		if (Array.isArray(a)) {
 			b = a[0];
 			console.log(b);

```

## `uglify/drop-unused/forin_var_1`

- tags: `remove unused`
- size: oxc 82 vs reference 80 (no whitespaces: +2, formatted: +3)

```js
var k;
for (k in [1, 2]) console.log(k);
for (k in { PASS: 3 }) console.log(k);
console.log(k);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-for (var k in [1, 2]) console.log(k);
+var k;
+for (k in [1, 2]) console.log(k);
 for (k in { PASS: 3 }) console.log(k);
 console.log(k);

```

## `uglify/drop-unused/issue_1715_2`

- tags: `remove unused`
- size: oxc 70 vs reference 68 (no whitespaces: +2, formatted: +4)

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
@@ -4,7 +4,7 @@
 	try {
 		x();
 	} catch (a) {
-		var a;
+		var a = 2;
 	}
 }
 f();

```

## `uglify/drop-unused/issue_3192_1`

- tags: `remove unused`
- size: oxc 125 vs reference 123 (no whitespaces: +2, formatted: +4)

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

## `uglify/evaluate/if_increment`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 48 (no whitespaces: +2, formatted: +3)

```js
console.log(function(a) {
	if (console) return ++a;
}(0));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function(a) {
-	if (console) return 1;
-}());
+	if (console) return ++a;
+}(0));

```

## `uglify/evaluate/in_boolean_context`

- tags: `sequences`
- size: oxc 86 vs reference 84 (no whitespaces: +2, formatted: +8)

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

## `uglify/evaluate/issue_5354`

- size: oxc 168 vs reference 166 (no whitespaces: +2, formatted: +3)

```js
function f(a) {
	return +a.toExponential(1);
}
function g(b) {
	return 0 + b.toFixed(2);
}
function h(c) {
	return 1 * c.toPrecision(3);
}
console.log(typeof f(45), typeof g(67), typeof h(89));

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,6 @@
 	return 0 + b.toFixed(2);
 }
 function h(c) {
-	return +c.toPrecision(3);
+	return 1 * c.toPrecision(3);
 }
 console.log(typeof f(45), typeof g(67), typeof h(89));

```

## `uglify/evaluate/positive_zero`

- size: oxc 28 vs reference 26 (no whitespaces: +2, formatted: +2)

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

## `uglify/functions/block_scope_4`

- size: oxc 38 vs reference 36 (no whitespaces: +2, formatted: +6)

```js
{
	console.log(typeof f);
	function f() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-console.log(typeof f);
-function f() {}
+{
+	console.log(typeof f);
+	function f() {}
+}

```

## `uglify/functions/deduplicate_parentheses`

- size: oxc 62 vs reference 60 (no whitespaces: +2, formatted: +2)

```js
({}).a = b;
({}.a = b)();
(function() {}).a = b;
((function() {}).a = b)();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 ({}).a = b;
 ({}.a = b)();
 (function() {}).a = b;
-(function() {}.a = b)();
+((function() {}).a = b)();

```

## `uglify/functions/direct_inline_catch_redefined`

- tags: `join vars`
- size: oxc 119 vs reference 117 (no whitespaces: +2, formatted: +2)

```js
var a = 1;
function f() {
	return a;
}
try {
	throw 2;
} catch (a) {
	function g() {
		return a;
	}
	console.log(a, f(), g());
}
console.log(a, f(), g());

```

```diff
--- reference
+++ oxc
@@ -10,4 +10,4 @@
 	}
 	console.log(a, f(), g());
 }
-console.log(a, a, g());
+console.log(a, f(), g());

```

## `uglify/functions/issue_2630_3`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 103 (no whitespaces: +2, formatted: +4)

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
@@ -1,9 +1,10 @@
 var x = 2, a = 1;
 (function() {
-	(function f1(a) {
+	function f1(a) {
 		f2();
-		--x >= 0 && f1();
-	})(a++);
+		--x >= 0 && f1({});
+	}
+	f1(a++);
 	function f2() {
 		a++;
 	}

```

## `uglify/functions/issue_5046`

- tags: `join vars`, `sequences`, `keep function names`, `2 iterations`
- size: oxc 63 vs reference 61 (no whitespaces: +2, formatted: +2)

```js
var a = 0;
if (a) 0();
else (function f() {
	f;
	return a = 'PASS';
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 var a = 0;
-(a ? 0 : function f() {
+a ? 0() : (function f() {
 	return a = 'PASS';
-})();
-console.log(a);
+})(), console.log(a);

```

## `uglify/functions/issue_5290`

- tags: `join vars`, `remove unused`
- size: oxc 95 vs reference 93 (no whitespaces: +2, formatted: -4)

```js
var a = 1;
while (a--) new function(b) {
	switch (b) {
		case b.p:
		case console.log('PASS'):
	}
}(function() {});

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
 var a = 1;
-while (a--) {
-	b = void 0;
-	var b = function() {};
+for (; a--;) new function(b) {
 	switch (b) {
 		case b.p:
 		case console.log('PASS'):
 	}
-}
+}(function() {});

```

## `uglify/functions/issue_5409`

- tags: `join vars`, `remove unused`
- size: oxc 90 vs reference 88 (no whitespaces: +2, formatted: +4)

```js
(function(a) {
	(a = console) || FAIL(a);
	(function(b) {
		console.log(b && b);
		while (!console);
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 (function(a) {
 	(a = console) || FAIL(a);
-	a = void 0;
-	console.log(a && a);
-	while (!console);
-	return;
+	(function(b) {
+		console.log(b && b);
+		for (; !console;);
+	})();
 })();

```

## `uglify/functions/loop_init_arg`

- size: oxc 86 vs reference 84 (no whitespaces: +2, formatted: +3)

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
@@ -1,4 +1,5 @@
 var a = 'PASS';
-for (var k in '12') b = void 0, (b >>= 1) && (a = 'FAIL'), b = 2;
-var b;
+for (var k in '12') (function(b) {
+	(b >>= 1) && (a = 'FAIL'), b = 2;
+})();
 console.log(a);

```

## `uglify/functions/module_inline`

- tags: `type:module`, `join vars`
- size: oxc 51 vs reference 49 (no whitespaces: +2, formatted: +2)

```js
var a = f;
function f() {
	return a;
}
console.log(f() === a);

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 function f() {
 	return a;
 }
-console.log(a === a);
+console.log(f() === a);

```

## `uglify/hoist_props/issue_2508_5`

- tags: `join vars`, `remove unused`
- size: oxc 47 vs reference 45 (no whitespaces: +2, formatted: +5)

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

## `uglify/hoist_props/name_collision_2`

- tags: `join vars`
- size: oxc 137 vs reference 135 (no whitespaces: +2, formatted: +9)

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
-var o, o_p = 1, o__ = function(x) {
-	return x;
-}, o__$2 = function(x) {
-	return x + 1;
+var o = {
+	p: 1,
+	'+': function(x) {
+		return x;
+	},
+	'-': function(x) {
+		return x + 1;
+	}
 }, o__$0 = 2, o__$1 = 3;
-console.log(o_p === o_p, o__(4), o__$2(5), o__$0, o__$1);
+console.log(o.p === o.p, o['+'](4), o['-'](5), o__$0, o__$1);

```

## `uglify/hoist_props/name_collision_3`

- tags: `join vars`
- size: oxc 125 vs reference 123 (no whitespaces: +2, formatted: +9)

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
-var o, o_p = 1, o__ = function(x) {
-	return x;
-}, o__$2 = function(x) {
-	return x + 1;
+var o = {
+	p: 1,
+	'+': function(x) {
+		return x;
+	},
+	'-': function(x) {
+		return x + 1;
+	}
 }, o__$0 = 2, o__$1 = 3;
-console.log(o_p === o_p, o__(4), o__$2(5));
+console.log(o.p === o.p, o['+'](4), o['-'](5));

```

## `uglify/hoist_vars/issue_4487_1`

- tags: `join vars`, `remove unused`, `keep function names`
- size: oxc 54 vs reference 52 (no whitespaces: +2, formatted: +4)

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
 var a = function f() {
 	var f = console.log(typeof f);
-};
-a();
+}, b = a();

```

## `uglify/hoist_vars/issue_4517`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 48 (no whitespaces: +2, formatted: +2)

```js
console.log(function() {
	var a = 2;
	A = a;
	var b = typeof !1;
	return A + b;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 console.log(function() {
-	return (A = 2) + typeof !1;
+	A = 2;
+	return A + 'boolean';
 }());

```

## `uglify/if_return/if_return_cond_void_1`

- tags: `sequences`
- size: oxc 81 vs reference 79 (no whitespaces: +2, formatted: +2)

```js
function f(a) {
	if (a) return console.log('foo') ? console.log('bar') : void 0;
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a) {
-	return a && console.log('foo') ? console.log('bar') : void 0;
+	if (a) return console.log('foo') ? console.log('bar') : void 0;
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/if_return/if_return_cond_void_2`

- tags: `sequences`
- size: oxc 81 vs reference 79 (no whitespaces: +2, formatted: +1)

```js
function f(a) {
	if (a) return console.log('foo') ? void 0 : console.log('bar');
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a) {
-	return !a || console.log('foo') ? void 0 : console.log('bar');
+	if (a) return console.log('foo') ? void 0 : console.log('bar');
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/if_return/issue_5587_1`

- tags: `sequences`
- size: oxc 71 vs reference 69 (no whitespaces: +2, formatted: +1)

```js
function f(a) {
	if (console) return a ? void 0 : console.log('PASS');
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a) {
-	return !console || a ? void 0 : console.log('PASS');
+	if (console) return a ? void 0 : console.log('PASS');
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/if_return/issue_5587_2`

- tags: `sequences`
- size: oxc 71 vs reference 69 (no whitespaces: +2, formatted: +2)

```js
function f(a) {
	if (console) return a ? console.log('PASS') : void 0;
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a) {
-	return console && a ? console.log('PASS') : void 0;
+	if (console) return a ? console.log('PASS') : void 0;
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/if_return/issue_5589_1`

- size: oxc 94 vs reference 92 (no whitespaces: +2, formatted: +2)

```js
function f(a) {
	switch (a) {
		case 42:
			if (!console.log('PASS')) return;
			return 0;
			break;
		case null: FAIL;
	}
}
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f(a) {
 	switch (a) {
 		case 42:
-			if (console.log('PASS')) return 0;
-			break;
+			if (!console.log('PASS')) return;
+			return 0;
 		case null: FAIL;
 	}
 }

```

## `uglify/if_return/issue_5619_2`

- size: oxc 89 vs reference 87 (no whitespaces: +2, formatted: -3)

```js
console.log(function() {
	if (console) while (console) return 'PASS';
	var a = FAIL;
	return 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 console.log(function() {
-	if (console) {
-		if (console) return 'PASS';
-	}
+	if (console) for (; console;) return 'PASS';
 	var a = FAIL;
 	return 'PASS';
 }());

```

## `uglify/if_return/void_match`

- size: oxc 120 vs reference 118 (no whitespaces: +2, formatted: +5)

```js
function f(a) {
	if (a) {
		console.log('foo');
		return;
	}
	while (console.log('bar'));
	return console.log('baz'), void console.log('moo');
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 function f(a) {
-	if (a) console.log('foo');
-	else {
-		while (console.log('bar'));
-		console.log('baz'), console.log('moo');
+	if (a) {
+		console.log('foo');
+		return;
 	}
+	for (; console.log('bar'););
+	console.log('baz'), console.log('moo');
 }
 f();
 f(42);

```

## `uglify/issue-44/issue_44_valid_ast_1`

- tags: `remove unused`
- size: oxc 43 vs reference 41 (no whitespaces: +2, formatted: +3)

```js
function a(b) {
	for (var i = 0, e = b.qoo();; i++) {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function a(b) {
-	var i = 0;
-	for (b.qoo();; i++);
+	for (var i = 0, e = b.qoo();; i++);
 }

```

## `uglify/issue-747/dont_reuse_prop`

- size: oxc 70 vs reference 68 (no whitespaces: +2, formatted: +2)

```js
'aaaaaaaaaabbbbb';
var obj = {};
obj.a = 123;
obj.asd = 256;
console.log(obj.a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'aaaaaaaaaabbbbb';
 var obj = {};
 obj.a = 123;
-obj.b = 256;
+obj.asd = 256;
 console.log(obj.a);

```

## `uglify/issue-747/unmangleable_props_should_always_be_reserved`

- size: oxc 70 vs reference 68 (no whitespaces: +2, formatted: +2)

```js
'aaaaaaaaaabbbbb';
var obj = {};
obj.asd = 256;
obj.a = 123;
console.log(obj.a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'aaaaaaaaaabbbbb';
 var obj = {};
-obj.b = 256;
+obj.asd = 256;
 obj.a = 123;
 console.log(obj.a);

```

## `uglify/issue-913/keep_var_for_in`

- tags: `join vars`, `remove unused`
- size: oxc 57 vs reference 55 (no whitespaces: +2, formatted: +1)

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

## `uglify/issue-979/reported`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 66 vs reference 64 (no whitespaces: +2, formatted: +2)

```js
function f1() {
	if (a == 1 || b == 2) foo();
}
function f2() {
	if (!(a == 1 || b == 2));
	else foo();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f1() {
-	1 != a && 2 != b || foo();
+	(a == 1 || b == 2) && foo();
 }
 function f2() {
-	1 != a && 2 != b || foo();
+	a != 1 && b != 2 || foo();
 }

```

## `uglify/join_vars/assign_sequence_var`

- tags: `join vars`
- size: oxc 62 vs reference 60 (no whitespaces: +2, formatted: +2)

```js
var a = 0, b = 1;
console.log(a), a++, b = 2;
var c = 3;
console.log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-var a = 0, b = 1, c = (console.log(a), a++, b = 2, 3);
+var a = 0, b = 1;
+console.log(a), a++, b = 2;
+var c = 3;
 console.log(a, b, c);

```

## `uglify/join_vars/assign_var`

- tags: `join vars`
- size: oxc 73 vs reference 71 (no whitespaces: +2, formatted: +1)

```js
b = 'foo';
var a = [, 'bar'];
console.log(b);
for (var b in a) console.log(b, a[b]);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-var b = 'foo', a = [, 'bar'], b;
+b = 'foo';
+var a = [, 'bar'];
 console.log(b);
-for (b in a) console.log(b, a[b]);
+for (var b in a) console.log(b, a[b]);

```

## `uglify/join_vars/issue_2816`

- tags: `join vars`
- size: oxc 68 vs reference 66 (no whitespaces: +2, formatted: +1)

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

## `uglify/join_vars/join_object_assignments_for`

- tags: `join vars`
- size: oxc 83 vs reference 81 (no whitespaces: +2, formatted: -1)

```js
console.log(function() {
	var o = { p: 3 };
	for (o.q = 'foo'; console.log(o.q););
	return o.p;
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 console.log(function() {
-	for (var o = {
-		p: 3,
-		q: 'foo'
-	}; console.log(o.q););
+	var o = { p: 3 };
+	for (o.q = 'foo'; console.log(o.q););
 	return o.p;
 }());

```

## `uglify/join_vars/join_object_assignments_regex`

- tags: `join vars`
- size: oxc 40 vs reference 38 (no whitespaces: +2, formatted: +2)

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

## `uglify/join_vars/join_object_assignments_return_3`

- tags: `join vars`
- size: oxc 85 vs reference 83 (no whitespaces: +2, formatted: -2)

```js
console.log(function() {
	var o = { p: 3 };
	return o.q = 'foo', o.p += '', console.log(o.q), o.p;
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,4 @@
 console.log(function() {
-	var o = {
-		p: 3,
-		q: 'foo'
-	};
-	return o.p += '', console.log(o.q), o.p;
+	var o = { p: 3 };
+	return o.q = 'foo', o.p += '', console.log(o.q), o.p;
 }());

```

## `uglify/join_vars/join_vars_assign`

- tags: `join vars`, `remove unused`
- size: oxc 53 vs reference 51 (no whitespaces: +2, formatted: +3)

```js
var y, x;
x = Object('PAS');
y = Object('S');
console.log(x + y);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var x = Object('PAS'), y = Object('S');
+var y, x = Object('PAS');
+y = Object('S');
 console.log(x + y);

```

## `uglify/keep_fargs/issue_1858`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 59 vs reference 57 (no whitespaces: +2, formatted: +2)

```js
console.log(function(x) {
	var a = {}, b = a.b = x;
	return a.b + b;
}(1));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log(function() {
-	var a = {}, b = a.b = 1;
+console.log(function(x) {
+	var a = {}, b = a.b = x;
 	return a.b + b;
-}());
+}(1));

```

## `uglify/keep_fargs/issue_2187_2`

- tags: `join vars`, `remove unused`
- size: oxc 53 vs reference 51 (no whitespaces: +2, formatted: +2)

```js
var b = 1;
console.log(function(a) {
	return a && ++b;
}(b--));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var b = 1;
-console.log(function() {
-	return b-- && ++b;
-}());
+console.log(function(a) {
+	return a && ++b;
+}(b--));

```

## `uglify/keep_fargs/issue_2425_2`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 62 (no whitespaces: +2, formatted: +3)

```js
var a = 8;
(function(b, c) {
	b.toString();
})(--a, a |= 10);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 8;
-(function(b) {
+(function(b, c) {
 	b.toString();
 })(--a, a |= 10);
 console.log(a);

```

## `uglify/keep_fargs/recursive_iife_3`

- tags: `join vars`, `remove unused`
- size: oxc 109 vs reference 107 (no whitespaces: +2, formatted: +4)

```js
var a = 1, c = 'PASS';
(function() {
	function f(b, d, e) {
		a-- && f(null, 42, 0);
		e && (c = 'FAIL');
		d && d.p;
	}
	var a_1 = f();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 var a = 1, c = 'PASS';
 (function() {
-	(function f(b, d, e) {
-		a-- && f(0, 42, 0);
+	function f(b, d, e) {
+		a-- && f(null, 42, 0);
 		e && (c = 'FAIL');
 		d && d.p;
-	})();
+	}
+	f();
 })();
 console.log(c);

```

## `uglify/let/issue_5745_2`

- tags: `join vars`
- size: oxc 74 vs reference 72 (no whitespaces: +2, formatted: +1)

```js
'use strict';
{
	let f = function() {
		return f && 'PASS';
	};
	var a = f();
	a;
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 {
 	let f = function() {
 		return f && 'PASS';
-	}, a = f();
-	a;
+	};
+	var a = f();
 	console.log(a);
 }

```

## `uglify/let/issue_5759`

- tags: `join vars`, `remove unused`
- size: oxc 106 vs reference 104 (no whitespaces: +2, formatted: -4)

```js
'use strict';
function f() {
	for (var a in [true]) {
		let b;
		(function() {
			var c = void 0;
			b;
			console.log(c);
			var d = null;
			console.log(c);
		})();
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,9 @@
 'use strict';
 function f() {
-	for (var a in [true]) {
-		let b;
-		var c = c = void 0;
-		b;
+	for (var a in [!0]) (function() {
+		var c = void 0;
 		console.log(c);
 		console.log(c);
-	}
+	})();
 }
 f();

```

## `uglify/merge_vars/issue_4107_1`

- tags: `join vars`, `remove unused`
- size: oxc 92 vs reference 90 (no whitespaces: +2, formatted: +2)

```js
(function() {
	function f(b, b, c) {
		var d = 1 && a, a = console || c;
		console.log(typeof a);
	}
	f();
})();
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 (function() {
-	(function(c) {
-		c = console || c;
-		console.log(typeof c);
-	})();
+	function f(b, b, c) {
+		console.log(typeof (console || c));
+	}
+	f();
 })();
 console.log(typeof a);

```

## `uglify/merge_vars/issue_4107_2`

- tags: `join vars`, `remove unused`
- size: oxc 92 vs reference 90 (no whitespaces: +2, formatted: +2)

```js
(function() {
	function f(b, b, a) {
		var d = 1 && c, c = console || a;
		console.log(typeof c);
	}
	f();
})();
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 (function() {
-	(function(a) {
-		a = console || a;
-		console.log(typeof a);
-	})();
+	function f(b, b, a) {
+		console.log(typeof (console || a));
+	}
+	f();
 })();
 console.log(typeof a);

```

## `uglify/merge_vars/issue_4126_2`

- tags: `join vars`
- size: oxc 76 vs reference 74 (no whitespaces: +2, formatted: +11)

```js
try {
	var a = function() {
		var b = 0;
		function f() {
			b;
		}
		THROW(b);
	}();
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 try {
-	var a = (b = 0, void THROW(b));
-} catch (e) {
+	var a = function() {
+		var b = 0;
+		function f() {}
+		THROW(b);
+	}();
+} catch {
 	console.log(a);
 }
-function f() {}
-var b;

```

## `uglify/merge_vars/issue_4653`

- tags: `join vars`, `remove unused`
- size: oxc 75 vs reference 73 (no whitespaces: +2, formatted: +3)

```js
var a = 1, b;
function f(c, d) {
	c || console.log(d);
}
f(a++ + (b = b), b |= console.log(a));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-var b, a = 1;
-(function(c, d) {
+var a = 1, b;
+function f(c, d) {
 	c || console.log(d);
-})(+a + (b = b), b |= console.log(2));
+}
+f(a++ + (b = b), b |= console.log(a));

```

## `uglify/negate-iife/issue_1288_side_effects`

- tags: `sequences`
- size: oxc 28 vs reference 26 (no whitespaces: +2, formatted: +2)

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
@@ -1,3 +1,3 @@
-w, x || function() {
+w, x || (function() {
 	x = {};
-}(), y;
+})(), y;

```

## `uglify/negate-iife/negate_iife_nested`

- tags: `sequences`
- size: oxc 101 vs reference 99 (no whitespaces: +2, formatted: +2)

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
@@ -2,9 +2,9 @@
 	this.f = f;
 }
 new Foo(function() {
-	!function(x) {
-		!function(y) {
+	(function(x) {
+		(function(y) {
 			console.log(y);
-		}(x);
-	}(7);
+		})(x);
+	})(7);
 }).f();

```

## `uglify/numbers/comparisons`

- size: oxc 50 vs reference 48 (no whitespaces: +2, formatted: +2)

```js
var x = '42', y = '0x30';
console.log(~x === 42, x % y === 42);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var x = '42', y = '0x30';
-console.log(42 == ~x, x % y == 42);
+console.log(~x === 42, x % y === 42);

```

## `uglify/properties/ignore_global_property`

- size: oxc 46 vs reference 44 (no whitespaces: +2, formatted: +2)

```js
foo = 'PASS';
global.foo = 'FAIL';
console.log(foo);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 foo = 'PASS';
-global.o = 'FAIL';
+global.foo = 'FAIL';
 console.log(foo);

```

## `uglify/properties/keep_sandboxed_variable`

- size: oxc 50 vs reference 48 (no whitespaces: +2, formatted: +2)

```js
var foo = 'PASS';
global.foo = 'FAIL';
console.log(foo);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var foo = 'PASS';
-global.o = 'FAIL';
+global.foo = 'FAIL';
 console.log(foo);

```

## `uglify/pure_getters/issue_2313_3`

- tags: `join vars`, `sequences`
- size: oxc 117 vs reference 115 (no whitespaces: +2, formatted: -3)

```js
function x() {
	console.log(1);
	return { y: function() {
		console.log(2);
		return { z: 0 };
	} };
}
x().y().z++;
if (x().y().z) {
	console.log(3);
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,6 @@
 function x() {
-	console.log(1);
-	return { y: function() {
-		console.log(2);
-		return { z: 0 };
+	return console.log(1), { y: function() {
+		return console.log(2), { z: 0 };
 	} };
 }
-x().y().z++;
-x().y().z && console.log(3);
+x().y().z++, x().y().z && console.log(3);

```

## `uglify/pure_getters/issue_2313_4`

- tags: `join vars`, `sequences`, `pure getters`
- size: oxc 117 vs reference 115 (no whitespaces: +2, formatted: -3)

```js
function x() {
	console.log(1);
	return { y: function() {
		console.log(2);
		return { z: 0 };
	} };
}
x().y().z++;
if (x().y().z) {
	console.log(3);
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,6 @@
 function x() {
-	console.log(1);
-	return { y: function() {
-		console.log(2);
-		return { z: 0 };
+	return console.log(1), { y: function() {
+		return console.log(2), { z: 0 };
 	} };
 }
-x().y().z++;
-x().y().z && console.log(3);
+x().y().z++, x().y().z && console.log(3);

```

## `uglify/pure_getters/issue_2313_6`

- tags: `pure getters`
- size: oxc 14 vs reference 12 (no whitespaces: +2, formatted: +2)

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

## `uglify/reduce_vars/issue_5730_1`

- tags: `join vars`, `remove unused`
- size: oxc 56 vs reference 54 (no whitespaces: +2, formatted: +3)

```js
var a = 'PASS';
L: {
	var f = function() {
		console.log(a);
	};
}
f();
a++;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 'PASS';
-var f = function() {
+L: var f = function() {
 	console.log(a);
 };
 f();

```

## `uglify/reduce_vars/issue_5730_3`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 52 (no whitespaces: +2, formatted: +3)

```js
var f, a = 'PASS';
L: {
	f = function() {
		console.log(a);
	};
}
f();
a++;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var f, a = 'PASS';
-f = function() {
+L: f = function() {
 	console.log(a);
 };
 f();

```

## `uglify/reduce_vars/issue_5777_2`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 103 (no whitespaces: +2, formatted: +6)

```js
function f(a) {
	(function() {
		function g() {
			h();
		}
		g();
		a = function() {};
		function h() {
			console.log(a);
		}
	})();
}
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
-(function(a) {
+function f(a) {
 	(function() {
-		(function() {
+		function g() {
 			h();
-		})();
+		}
+		g();
 		a = function() {};
 		function h() {
 			console.log(a);
 		}
 	})();
-})('PASS');
+}
+f('PASS');

```

## `uglify/reduce_vars/local_assignment_modified`

- tags: `join vars`
- size: oxc 37 vs reference 35 (no whitespaces: +2, formatted: +2)

```js
var a;
(a = a || {}).p = 42;
console.log(a.p);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a;
-(a = {}).p = 42;
+(a ||= {}).p = 42;
 console.log(a.p);

```

## `uglify/reduce_vars/multi_def_3`

- tags: `join vars`
- size: oxc 61 vs reference 59 (no whitespaces: +2, formatted: +4)

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
@@ -2,5 +2,5 @@
 	var b = 2;
 	if (a) var b;
 	else var b;
-	console.log(3);
+	console.log(b + 1);
 }

```

## `uglify/reduce_vars/pure_getters_2`

- tags: `join vars`, `remove unused`
- size: oxc 15 vs reference 13 (no whitespaces: +2, formatted: +4)

```js
var a;
var a = a && a.b;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a;
-a && a.b;
+var a, a = a && a.b;

```

## `uglify/sequences/lift_sequences_2`

- tags: `sequences`
- size: oxc 69 vs reference 67 (no whitespaces: +2, formatted: +2)

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
-foo.x = (foo = {}, 10), bar = {}, bar = 10, console.log(foo, bar);
+foo.x = (foo = {}, 10), bar = (bar = {}, 10), console.log(foo, bar);

```

## `uglify/sequences/missing_link_drop_side_effect_free`

- tags: `sequences`
- size: oxc 31 vs reference 29 (no whitespaces: +2, formatted: +4)

```js
var a = 100;
a;
a++ + (0 ? 2 : 1);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 100;
-a++, console.log(a);
+a++ + 1, console.log(a);

```

## `uglify/side_effects/issue_4730_1`

- size: oxc 38 vs reference 36 (no whitespaces: +2, formatted: +3)

```js
var a;
console.log('PASS') + (a && a[a.p]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-console.log('PASS'), a && a[a.p];
+console.log('PASS') + (a && a[a.p]);

```

## `uglify/side_effects/trim_new`

- size: oxc 40 vs reference 38 (no whitespaces: +2, formatted: +2)

```js
new function(a) {
	console.log(a);
}('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function(a) {
+new function(a) {
 	console.log(a);
-})('PASS');
+}('PASS');

```

## `uglify/transform/booleans_global_defs`

- size: oxc 18 vs reference 16 (no whitespaces: +2, formatted: +4)

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

## `uglify/varify/default_init`

- tags: `join vars`, `remove unused`
- size: oxc 63 vs reference 61 (no whitespaces: +2, formatted: +4)

```js
A = 'PASS';
(function() {
	'use strict';
	let a;
	a = A;
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 A = 'PASS';
 (function() {
 	'use strict';
-	var a = A;
+	let a;
+	a = A;
 	console.log(a);
 })();

```

## `uglify/varify/escaped_const`

- tags: `join vars`
- size: oxc 34 vs reference 32 (no whitespaces: +2, formatted: +2)

```js
const log = console.log;
log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var log = console.log;
+const log = console.log;
 log('PASS');

```

## `uglify/varify/forin_let_1`

- tags: `join vars`
- size: oxc 74 vs reference 72 (no whitespaces: +2, formatted: +1)

```js
'use strict';
let o = {
	foo: 42,
	bar: 'PASS'
};
for (let k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
-var o = {
+let o = {
 	foo: 42,
 	bar: 'PASS'
-}, k;
-for (k in o) console.log(k, o[k]);
+};
+for (let k in o) console.log(k, o[k]);

```

## `uglify/yields/for_await_of`

- size: oxc 153 vs reference 151 (no whitespaces: +2, formatted: +2)

```js
async function* f() {
	if (yield 'PASS') yield 'FAIL 1';
	yield { then: function(r) {
		r(42);
	} };
	return 'FAIL 2';
}
(async function(a) {
	for await (a of f()) console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 async function* f() {
-	if (yield 'PASS') yield 'FAIL 1';
+	(yield 'PASS') && (yield 'FAIL 1');
 	yield { then: function(r) {
 		r(42);
 	} };

```

## `uglify/yields/for_of`

- size: oxc 100 vs reference 98 (no whitespaces: +2, formatted: +2)

```js
function* f() {
	if (yield 'PASS') yield 'FAIL 1';
	yield 42;
	return 'FAIL 2';
}
for (var a of f()) console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function* f() {
-	if (yield 'PASS') yield 'FAIL 1';
+	(yield 'PASS') && (yield 'FAIL 1');
 	yield 42;
 	return 'FAIL 2';
 }

```

## `uglify/arrows/collapse_property_lambda`

- tags: `join vars`
- size: oxc 53 vs reference 50 (no whitespaces: +3, formatted: +4)

```js
console.log(function f() {
	f.g = () => 42;
	return f.g();
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 console.log(function f() {
-	return (f.g = () => 42)();
+	f.g = () => 42;
+	return f.g();
 }());

```

## `uglify/arrows/issue_5416_2`

- tags: `remove unused`
- size: oxc 85 vs reference 82 (no whitespaces: +3, formatted: +3)

```js
var f = () => {
	while ((() => {
		console;
		var a = function g(arguments) {
			while (console.log(arguments));
		}();
	})());
};
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 var f = () => {
-	console;
-	var arguments = void 0;
-	for (; console.log(arguments););
-	return;
+	for (; function(arguments) {
+		for (; console.log(arguments););
+	}(), void 0;);
 };
 f();

```

## `uglify/awaits/await_then`

- size: oxc 123 vs reference 120 (no whitespaces: +3, formatted: +4)

```js
var a = 'PASS';
function f() {
	return { then: function(r) {
		a = 'FAIL';
		r();
	} };
}
(async function() {
	f(), await 42;
	while (console.log(a));
})();

```

```diff
--- reference
+++ oxc
@@ -6,6 +6,6 @@
 	} };
 }
 (async function() {
-	await !f();
-	while (console.log(a));
+	f(), await 42;
+	for (; console.log(a););
 })();

```

## `uglify/awaits/collapse_property_lambda`

- tags: `join vars`
- size: oxc 66 vs reference 63 (no whitespaces: +3, formatted: +4)

```js
(async function f() {
	f.g = () => 42;
	return f.g();
})().then(console.log);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 (async function f() {
-	return (f.g = () => 42)();
+	f.g = () => 42;
+	return f.g();
 })().then(console.log);

```

## `uglify/awaits/instanceof_lambda_2`

- size: oxc 48 vs reference 45 (no whitespaces: +3, formatted: +1)

```js
console.log(null instanceof async function() {});

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((null, async function() {}, false));
+console.log(null instanceof async function() {});

```

## `uglify/awaits/issue_5159_2`

- size: oxc 118 vs reference 115 (no whitespaces: +3, formatted: +2)

```js
(async function() {
	try {
		throw 'foo';
	} catch (e) {
		return await 'bar';
	}
})().catch(console.log).then(console.log);
console.log('baz');

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 (async function() {
 	try {
 		throw 'foo';
-	} catch (e) {
-		return 'bar';
+	} catch {
+		return await 'bar';
 	}
 })().catch(console.log).then(console.log);
 console.log('baz');

```

## `uglify/awaits/issue_5791`

- tags: `join vars`, `remove unused`
- size: oxc 218 vs reference 215 (no whitespaces: +3, formatted: -16)

```js
(async function() {
	async function f() {
		try {
			await { then(resolve) {
				setImmediate(() => {
					console.log('foo');
					resolve();
				});
			} };
		} catch (e) {
			console.log('FAIL', e);
		}
	}
	async function g() {
		try {
			await f();
		} catch (e) {}
	}
	await g();
	console.log('bar');
})();

```

```diff
--- reference
+++ oxc
@@ -1,19 +1,21 @@
 (async function() {
-	await async function() {
+	async function f() {
+		try {
+			await { then(resolve) {
+				setImmediate(() => {
+					console.log('foo');
+					resolve();
+				});
+			} };
+		} catch (e) {
+			console.log('FAIL', e);
+		}
+	}
+	async function g() {
 		try {
-			await async function() {
-				try {
-					await { then(resolve) {
-						setImmediate(() => {
-							console.log('foo');
-							resolve();
-						});
-					} };
-				} catch (e) {
-					console.log('FAIL', e);
-				}
-			}();
-		} catch (e) {}
-	}();
+			await f();
+		} catch {}
+	}
+	await g();
 	console.log('bar');
 })();

```

## `uglify/booleans/de_morgan_1a`

- size: oxc 53 vs reference 50 (no whitespaces: +3, formatted: +5)

```js
function f(a) {
	return a || a;
}
console.log(f(null), f(42));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	return a;
+	return a || a;
 }
 console.log(f(null), f(42));

```

## `uglify/booleans/de_morgan_1b`

- size: oxc 53 vs reference 50 (no whitespaces: +3, formatted: +5)

```js
function f(a) {
	return a && a;
}
console.log(f(null), f(42));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	return a;
+	return a && a;
 }
 console.log(f(null), f(42));

```

## `uglify/booleans/de_morgan_2a`

- tags: `sequences`
- size: oxc 91 vs reference 88 (no whitespaces: +3, formatted: +5)

```js
function f(a, b) {
	return a || a || b;
}
console.log(f(null), f(null, {}));
console.log(f(42), f(42, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a, b) {
-	return a || b;
+	return a || a || b;
 }
-console.log(f(null), f(null, {}));
-console.log(f(42), f(42, {}));
+console.log(f(null), f(null, {})), console.log(f(42), f(42, {}));

```

## `uglify/booleans/de_morgan_2d`

- size: oxc 91 vs reference 88 (no whitespaces: +3, formatted: +5)

```js
function f(a, b) {
	return a && a && b;
}
console.log(f(null), f(null, {}));
console.log(f(42), f(42, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b) {
-	return a && b;
+	return a && a && b;
 }
 console.log(f(null), f(null, {}));
 console.log(f(42), f(42, {}));

```

## `uglify/booleans/de_morgan_2e`

- tags: `sequences`
- size: oxc 91 vs reference 88 (no whitespaces: +3, formatted: +5)

```js
function f(a, b) {
	return a && b && b;
}
console.log(f(null), f(null, {}));
console.log(f(42), f(42, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a, b) {
-	return a && b;
+	return a && b && b;
 }
-console.log(f(null), f(null, {}));
-console.log(f(42), f(42, {}));
+console.log(f(null), f(null, {})), console.log(f(42), f(42, {}));

```

## `uglify/booleans/de_morgan_3a`

- tags: `sequences`
- size: oxc 154 vs reference 151 (no whitespaces: +3, formatted: +5)

```js
function f(a, b, c) {
	return a || a || b || c;
}
console.log(f(null, false), f(null, false, {}), f(null, true), f(null, true, {}));
console.log(f(42, false), f(42, false, {}), f(42, true), f(42, true, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a, b, c) {
-	return a || b || c;
+	return a || a || b || c;
 }
-console.log(f(null, !1), f(null, !1, {}), f(null, !0), f(null, !0, {}));
-console.log(f(42, !1), f(42, !1, {}), f(42, !0), f(42, !0, {}));
+console.log(f(null, !1), f(null, !1, {}), f(null, !0), f(null, !0, {})), console.log(f(42, !1), f(42, !1, {}), f(42, !0), f(42, !0, {}));

```

## `uglify/booleans/de_morgan_3g`

- size: oxc 156 vs reference 153 (no whitespaces: +3, formatted: +5)

```js
function f(a, b, c) {
	return a && (a && b || c);
}
console.log(f(null, false), f(null, false, {}), f(null, true), f(null, true, {}));
console.log(f(42, false), f(42, false, {}), f(42, true), f(42, true, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b, c) {
-	return a && (b || c);
+	return a && (a && b || c);
 }
 console.log(f(null, !1), f(null, !1, {}), f(null, !0), f(null, !0, {}));
 console.log(f(42, !1), f(42, !1, {}), f(42, !0), f(42, !0, {}));

```

## `uglify/booleans/de_morgan_3h`

- tags: `sequences`
- size: oxc 154 vs reference 151 (no whitespaces: +3, formatted: +5)

```js
function f(a, b, c) {
	return a && a && b && c;
}
console.log(f(null, false), f(null, false, {}), f(null, true), f(null, true, {}));
console.log(f(42, false), f(42, false, {}), f(42, true), f(42, true, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a, b, c) {
-	return a && b && c;
+	return a && a && b && c;
 }
-console.log(f(null, !1), f(null, !1, {}), f(null, !0), f(null, !0, {}));
-console.log(f(42, !1), f(42, !1, {}), f(42, !0), f(42, !0, {}));
+console.log(f(null, !1), f(null, !1, {}), f(null, !0), f(null, !0, {})), console.log(f(42, !1), f(42, !1, {}), f(42, !0), f(42, !0, {}));

```

## `uglify/classes/inline_non_strict`

- tags: `join vars`, `remove unused`
- size: oxc 83 vs reference 80 (no whitespaces: +3, formatted: +4)

```js
function f(a) {
	return a.p = 'PASS';
}
class A {
	g() {
		return f(42);
	}
}
console.log(new A().g());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f(a) {
 	return a.p = 'PASS';
 }
-console.log(new class {
+class A {
 	g() {
 		return f(42);
 	}
-}().g());
+}
+console.log(new A().g());

```

## `uglify/classes/issue_4992`

- tags: `join vars`, `remove unused`
- size: oxc 56 vs reference 53 (no whitespaces: +3, formatted: +4)

```js
class A {
	static P = this;
	get p() {}
}
console.log(typeof A.P);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-console.log(typeof class {
+class A {
 	static P = this;
 	get p() {}
-}.P);
+}
+console.log(typeof A.P);

```

## `uglify/classes/keep_static_field_reference_1`

- tags: `join vars`, `remove unused`
- size: oxc 83 vs reference 80 (no whitespaces: +3, formatted: +4)

```js
'use strict';
function f() {}
class A {
	static P = f;
}
console.log(A.P === A.P ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 'use strict';
+function f() {}
 class A {
-	static P = function() {};
+	static P = f;
 }
 console.log(A.P === A.P ? 'PASS' : 'FAIL');

```

## `uglify/classes/keep_static_field_reference_2`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 85 (no whitespaces: +3, formatted: +4)

```js
'use strict';
function f() {}
var A = class {
	static P = f;
};
console.log(A.P === A.P ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 'use strict';
+function f() {}
 var A = class {
-	static P = function() {};
+	static P = f;
 };
 console.log(A.P === A.P ? 'PASS' : 'FAIL');

```

## `uglify/classes/keep_static_field_reference_3`

- tags: `join vars`, `remove unused`
- size: oxc 78 vs reference 75 (no whitespaces: +3, formatted: +4)

```js
'use strict';
class A {}
class B {
	static P = A;
}
console.log(B.P === B.P ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 'use strict';
+class A {}
 class B {
-	static P = class {};
+	static P = A;
 }
 console.log(B.P === B.P ? 'PASS' : 'FAIL');

```

## `uglify/classes/single_use_1`

- tags: `join vars`, `remove unused`
- size: oxc 48 vs reference 45 (no whitespaces: +3, formatted: +4)

```js
'use strict';
class A {}
console.log(typeof new A());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 'use strict';
-console.log(typeof new class {}());
+class A {}
+console.log(typeof new A());

```

## `uglify/classes/single_use_2`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 57 (no whitespaces: +3, formatted: +4)

```js
'use strict';
class A {
	f(a) {
		console.log(a);
	}
}
new A().f('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 'use strict';
-new class {
+class A {
 	f(a) {
 		console.log(a);
 	}
-}().f('PASS');
+}
+new A().f('PASS');

```

## `uglify/classes/single_use_extends`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 77 (no whitespaces: +3, formatted: +4)

```js
'use strict';
class A extends class B {
	f() {
		return 'PASS';
	}
} {}
console.log(new A().f());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 'use strict';
-console.log(new class extends class {
+class A extends class {
 	f() {
 		return 'PASS';
 	}
-} {}().f());
+} {}
+console.log(new A().f());

```

## `uglify/classes/single_use_extends_non_strict`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 64 (no whitespaces: +3, formatted: +4)

```js
class A extends class B {
	f() {
		return 'PASS';
	}
} {}
console.log(new A().f());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-console.log(new class extends class {
+class A extends class {
 	f() {
 		return 'PASS';
 	}
-} {}().f());
+} {}
+console.log(new A().f());

```

## `uglify/collapse_vars/collapse_and_assign_property`

- tags: `join vars`, `remove unused`
- size: oxc 56 vs reference 53 (no whitespaces: +3, formatted: +3)

```js
console.log(function f() {
	f && (f.p = 'PASS');
	return f.p;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 console.log(function f() {
-	return f.p = f ? 'PASS' : f.p;
+	f && (f.p = 'PASS');
+	return f.p;
 }());

```

## `uglify/collapse_vars/issue_1631_1`

- tags: `join vars`, `sequences`
- size: oxc 97 vs reference 94 (no whitespaces: +3, formatted: +4)

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

## `uglify/collapse_vars/return_1`

- tags: `join vars`, `remove unused`
- size: oxc 81 vs reference 78 (no whitespaces: +3, formatted: +7)

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

## `uglify/comparisons/is_defined`

- size: oxc 47 vs reference 44 (no whitespaces: +3, formatted: +4)

```js
console.log(function a() {
	return void 0 === a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function a() {
-	return a, false;
+	return a === void 0;
 }());

```

## `uglify/const/merge_vars_2`

- tags: `join vars`
- size: oxc 84 vs reference 81 (no whitespaces: +3, formatted: +8)

```js
var a = 0;
(function() {
	var b = function f() {
		const c = a && f;
		c.var += 0;
	}();
	console.log(b);
})(1 && --a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var a = 0;
-1 && --a, b = function f() {
-	const c = a && f;
-	c.var += 0;
-}(), void console.log(b);
-var b;
+(function() {
+	var b = function f() {
+		let c = a && f;
+		c.var += 0;
+	}();
+	console.log(b);
+})(--a);

```

## `uglify/dead-code/catch_return_assign`

- size: oxc 69 vs reference 66 (no whitespaces: +3, formatted: +4)

```js
console.log(function() {
	try {
		throw 'FAIL';
	} catch (e) {
		return e = 'PASS';
	}
}());

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 	try {
 		throw 'FAIL';
 	} catch (e) {
-		return 'PASS';
+		return e = 'PASS';
 	}
 }());

```

## `uglify/dead-code/collapse_vars_lvalues_drop_assign`

- tags: `join vars`, `remove unused`
- size: oxc 116 vs reference 113 (no whitespaces: +3, formatted: +3)

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

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 function f0(x) {
 	var i = ++x;
-	return x + i;
+	return x += i;
 }
 function f1(x) {
 	var a = x -= 3;
-	return x + a;
+	return x += a;
 }
 function f2(x) {
 	var z = x, a = ++z;
-	return z + a;
+	return z += a;
 }

```

## `uglify/dead-code/finally_return_assign`

- size: oxc 69 vs reference 66 (no whitespaces: +3, formatted: +4)

```js
console.log(function(a) {
	try {
		throw 'FAIL';
	} finally {
		return a = 'PASS';
	}
}());

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 	try {
 		throw 'FAIL';
 	} finally {
-		return 'PASS';
+		return a = 'PASS';
 	}
 }());

```

## `uglify/default-values/collapse_value_2`

- tags: `join vars`, `remove unused`
- size: oxc 46 vs reference 43 (no whitespaces: +3, formatted: +5)

```js
(function(a = console) {
	return a;
})().log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function() {
-	return console;
+(function(a = console) {
+	return a;
 })().log('PASS');

```

## `uglify/default-values/issue_4446_1`

- tags: `join vars`
- size: oxc 43 vs reference 40 (no whitespaces: +3, formatted: +4)

```js
a = 42;
[b = 42] = ['PASS'];
c = 42;
console.log(b, a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
+a = 42;
 [b = 42] = ['PASS'];
-c = a = 42;
+c = 42;
 console.log(b, a);

```

## `uglify/default-values/issue_4446_2`

- tags: `join vars`
- size: oxc 46 vs reference 43 (no whitespaces: +3, formatted: +4)

```js
a = 42;
var [b = 42] = ['PASS'];
c = 42;
console.log(b, a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
+a = 42;
 var [b = 42] = ['PASS'];
-c = a = 42;
+c = 42;
 console.log(b, a);

```

## `uglify/default-values/unused_value_assign_1`

- tags: `remove unused`
- size: oxc 25 vs reference 22 (no whitespaces: +3, formatted: +5)

```js
[] = [console.log('PASS')];

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-[console.log('PASS')];
+[] = [console.log('PASS')];

```

## `uglify/destructured/conditionals`

- tags: `sequences`
- size: oxc 31 vs reference 28 (no whitespaces: +3, formatted: +4)

```js
if (console.log('PASS')) {
	var [] = 0;
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS') && ([] = 0);
+if (console.log('PASS')) var [] = 0;

```

## `uglify/destructured/dead_code`

- tags: `sequences`
- size: oxc 33 vs reference 30 (no whitespaces: +3, formatted: +4)

```js
if (0) {
	let [] = 42;
	var { a, b: [c] } = null;
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-0;
-var a, c;
+if (0) var a, c;
 console.log('PASS');

```

## `uglify/destructured/funarg_unused_2`

- tags: `remove unused`
- size: oxc 54 vs reference 51 (no whitespaces: +3, formatted: +4)

```js
function f([a, b, c]) {
	console.log(b);
}
f(['FAIL', 'PASS']);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function f([, b]) {
+function f([a, b, c]) {
 	console.log(b);
 }
 f(['FAIL', 'PASS']);

```

## `uglify/destructured/funarg_unused_3`

- tags: `remove unused`
- size: oxc 56 vs reference 53 (no whitespaces: +3, formatted: +6)

```js
function f({ [0]: a }) {
	return 'PASS';
}
console.log(f(['FAIL']));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function f({}) {
+function f({ 0: a }) {
 	return 'PASS';
 }
 console.log(f(['FAIL']));

```

## `uglify/destructured/issue_5189_1`

- tags: `join vars`, `remove unused`
- size: oxc 39 vs reference 36 (no whitespaces: +3, formatted: +5)

```js
var a = 42;
[a.p] = a = 'PASS';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a;
+var a = 42;
 [a.p] = a = 'PASS';
 console.log(a);

```

## `uglify/destructured/issue_5189_2`

- tags: `join vars`, `remove unused`
- size: oxc 43 vs reference 40 (no whitespaces: +3, formatted: +5)

```js
var a = 42;
({p: a.q} = a = 'PASS');
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a;
+var a = 42;
 ({p: a.q} = a = 'PASS');
 console.log(a);

```

## `uglify/destructured/keep_key_1`

- tags: `remove unused`
- size: oxc 39 vs reference 36 (no whitespaces: +3, formatted: +3)

```js
({} = { [(console.log('PASS'), 42)]: null });

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-({} = { [(console.log('PASS'), 42)]: 0 });
+({} = { [(console.log('PASS'), 42)]: null });

```

## `uglify/drop-unused/issue_1830_2`

- tags: `remove unused`
- size: oxc 63 vs reference 60 (no whitespaces: +3, formatted: +4)

```js
!function() {
	L: for (var a = 1, b = console.log(a); --a;) continue L;
}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-!function() {
-	var a = 1;
-	L: for (console.log(a); --a;) continue L;
-}();
+(function() {
+	L: for (var a = 1, b = console.log(a); --a;) continue L;
+})();

```

## `uglify/drop-unused/issue_3192_2`

- tags: `remove unused`
- size: oxc 69 vs reference 66 (no whitespaces: +3, formatted: +5)

```js
'use strict';
(function(a) {
	console.log(a = 'foo', arguments[0]);
})('bar');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use strict';
-(function() {
-	console.log('foo', arguments[0]);
+(function(a) {
+	console.log(a = 'foo', arguments[0]);
 })('bar');

```

## `uglify/drop-unused/issue_3598`

- tags: `join vars`, `remove unused`
- size: oxc 95 vs reference 92 (no whitespaces: +3, formatted: +11)

```js
var a = 'FAIL';
try {
	(function() {
		var b = void 0;
		a = 'PASS';
		c.p = 0;
		var c = b[!1];
	})();
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 var a = 'FAIL';
 try {
 	(function() {
+		var b = void 0;
 		a = 'PASS';
-		(void ((void 0).p = 0))[!1];
+		c.p = 0;
+		var c = b[!1];
 	})();
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `uglify/drop-unused/issue_4184`

- tags: `join vars`, `remove unused`
- size: oxc 86 vs reference 83 (no whitespaces: +3, formatted: +6)

```js
(function() {
	var a = function() {}, b = [
		a,
		1 && b,
		a = {}
	];
	try {
		throw 42;
	} catch (a) {
		{
			console.log(a);
		}
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 (function() {
-	var b = [
-		function() {},
-		1 && b,
-		{}
+	var a = function() {}, b = [
+		a,
+		b,
+		a = {}
 	];
 	try {
 		throw 42;

```

## `uglify/drop-unused/issue_4662`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 51 (no whitespaces: +3, formatted: +5)

```js
var a = 0;
function f(b, c) {
	console.log(b, c);
}
f(++a, a = a, a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = 0;
-(function(b, c) {
+function f(b, c) {
 	console.log(b, c);
-})(++a, a = 1);
+}
+f(++a, a = a, a);

```

## `uglify/evaluate/issue_3882`

- tags: `join vars`, `remove unused`
- size: oxc 71 vs reference 68 (no whitespaces: +3, formatted: +4)

```js
function f(a) {
	return console.log(a++), a && this;
}
var b = f();
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-var b = function(a) {
+function f(a) {
 	return console.log(a++), a && this;
-}();
+}
+var b = f();
 console.log(b);

```

## `uglify/evaluate/issue_3903`

- tags: `join vars`, `remove unused`
- size: oxc 70 vs reference 67 (no whitespaces: +3, formatted: +9)

```js
var a = 'PASS';
function f(b, c) {
	return console, c;
}
var d = f(f(), a = a);
console.log(d);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
+var a = 'PASS';
 function f(b, c) {
-	return console, c;
+	return c;
 }
-f(f(), 'PASS');
-console.log('PASS');
+var d = f(f(), a = a);
+console.log(d);

```

## `uglify/evaluate/issue_3988`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 63 (no whitespaces: +3, formatted: +4)

```js
function f(b) {
	return ('' + (b &= 0))[b && this];
}
var a = f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-var a = function(b) {
+function f(b) {
 	return ('' + (b &= 0))[b && this];
-}();
+}
+var a = f();
 console.log(a);

```

## `uglify/evaluate/issue_4214`

- tags: `join vars`, `remove unused`
- size: oxc 94 vs reference 91 (no whitespaces: +3, formatted: +4)

```js
function f(a) {
	return function() {
		try {
			return a;
		} finally {
			var b = 0;
		}
	}(a++ && this());
}
var c = f();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-var c = function(a) {
+function f(a) {
 	return function() {
 		try {
 			return a;
 		} finally {}
 	}(a++ && this());
-}();
+}
+var c = f();
 console.log(c);

```

## `uglify/functions/hoisted_single_use`

- tags: `join vars`, `remove unused`
- size: oxc 161 vs reference 158 (no whitespaces: +3, formatted: +2)

```js
function f(a) {
	for (var r in a) g(r);
}
function g(a) {
	console.log(a);
}
function h(a) {
	var g = a.bar;
	g();
	g();
	i(a);
}
function i(b) {
	f(b);
}
h({ bar: function() {
	console.log('foo');
} });

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,18 @@
 function f(a) {
-	for (var r in a) (function(a) {
-		console.log(a);
-	})(r);
+	for (var r in a) g(r);
+}
+function g(a) {
+	console.log(a);
 }
-(function(a) {
+function h(a) {
 	var g = a.bar;
 	g();
 	g();
-	(function(b) {
-		f(b);
-	})(a);
-})({ bar: function() {
+	i(a);
+}
+function i(b) {
+	f(b);
+}
+h({ bar: function() {
 	console.log('foo');
 } });

```

## `uglify/functions/issue_4753_1`

- size: oxc 72 vs reference 69 (no whitespaces: +3, formatted: +5)

```js
for (var i in [1, 2]) (function() {
	function f() {}
	f && console.log(f.p ^= 42);
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-for (var i in [1, 2]) f = function() {}, void (f && console.log(f.p ^= 42));
-var f;
+for (var i in [1, 2]) (function() {
+	function f() {}
+	f && console.log(f.p ^= 42);
+})();

```

## `uglify/functions/issue_5036`

- tags: `join vars`, `remove unused`
- size: oxc 104 vs reference 101 (no whitespaces: +3, formatted: +5)

```js
console.log(typeof function() {
	var await = function f() {
		return f;
	};
	return await() === await;
}() ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log(typeof function() {
-	function await() {
-		return await;
-	}
+	var await = function f() {
+		return f;
+	};
 	return await() === await;
 }() ? 'PASS' : 'FAIL');

```

## `uglify/functions/issue_5895_1`

- tags: `remove unused`
- size: oxc 116 vs reference 113 (no whitespaces: +3, formatted: +5)

```js
(function() {
	for (var a in [1, 2]) try {
		return function() {
			var b;
			b[b = 42];
			while (!console);
		}();
	} catch (e) {
		console.log('foo');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 (function() {
 	for (var a in [1, 2]) try {
-		b = void 0;
-		var b;
-		b[b = 42];
-		while (!console);
-		return;
-	} catch (e) {
+		return function() {
+			var b;
+			b[b = 42];
+			for (; !console;);
+		}();
+	} catch {
 		console.log('foo');
 	}
 })();

```

## `uglify/functions/mixed_mode_inline_4`

- tags: `join vars`, `remove unused`
- size: oxc 103 vs reference 100 (no whitespaces: +3, formatted: +1)

```js
function f() {
	'use strict';
	return this;
}
console.log(function() {
	'use strict';
	return f();
}() ? 'FAIL' : 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
+function f() {
+	'use strict';
+	return this;
+}
 console.log(function() {
 	'use strict';
-	return function() {
-		'use strict';
-		return this;
-	}();
+	return f();
 }() ? 'FAIL' : 'PASS');

```

## `uglify/hoist_vars/issue_5187_2`

- tags: `join vars`, `remove unused`
- size: oxc 71 vs reference 68 (no whitespaces: +3, formatted: -1)

```js
function f() {
	var a = 42;
	do {
		var b = { 0: a++ };
	} while (console.log(b[b ^= 0]));
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-(function() {
-	var b, a = 42;
-	do {
-		b = { 0: a++ };
-	} while (console.log(b[b ^= 0]));
-})();
+function f() {
+	var a = 42;
+	do
+		var b = { 0: a++ };
+	while (console.log(b[b ^= 0]));
+}
+f();

```

## `uglify/hoist_vars/issue_5195`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 61 (no whitespaces: +3, formatted: -1)

```js
function f() {
	var a;
	do {
		var b = { p: a };
	} while (console.log(b += ''));
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-(function() {
-	var a, b;
-	do {
-		b = { p: a };
-	} while (console.log(b += ''));
-})();
+function f() {
+	var a;
+	do
+		var b = { p: a };
+	while (console.log(b += ''));
+}
+f();

```

## `uglify/ie/issue_3215_3`

- size: oxc 124 vs reference 121 (no whitespaces: +3, formatted: +2)

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
-console.log(function n() {
-	var o = function n(o) {
+console.log(function() {
+	var bar = function(name) {
 		return 'FAIL';
 	};
 	try {
 		moo;
-	} catch (n) {
-		o = function n(o) {
+	} catch {
+		bar = function(name) {
 			return 'PASS';
 		};
 	}
-	return o;
+	return bar;
 }()());

```

## `uglify/if_return/if_defns_return_1`

- tags: `sequences`
- size: oxc 79 vs reference 76 (no whitespaces: +3, formatted: +3)

```js
function f() {
	if (u()) return v();
	function g() {}
	if (w()) return x(g);
	var a = y();
	z(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 function f() {
-	var a;
-	return u() ? v() : w() ? x(g) : (a = y(), void z(a));
+	if (u()) return v();
 	function g() {}
+	if (w()) return x(g);
+	var a = y();
+	z(a);
 }

```

## `uglify/issue-1833/iife_while`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 48 (no whitespaces: +3, formatted: +6)

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
-!function() {
-	!function() {
-		L: while (1) break L;
-	}();
-}();
+function f() {
+	function g() {
+		L: for (;;) break L;
+	}
+	g();
+}
+f();

```

## `uglify/issue-3768/call_arg_2`

- size: oxc 130 vs reference 127 (no whitespaces: +3, formatted: +3)

```js
function eval() {
	console.log('PASS');
}
var z = 'foo';
(function() {
	var z = false;
	(function(e) {
		var z = 42;
		e('console.log(typeof z)');
	})(eval);
})();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
-function n() {
+function eval() {
 	console.log('PASS');
 }
-var o = 'foo';
+var z = 'foo';
 (function() {
-	var o = false;
-	(function(o) {
-		var n = 42;
-		o('console.log(typeof z)');
-	})(n);
+	var z = !1;
+	(function(e) {
+		var z = 42;
+		e('console.log(typeof z)');
+	})(eval);
 })();

```

## `uglify/issue-751/negate_booleans_1`

- size: oxc 29 vs reference 26 (no whitespaces: +3, formatted: +3)

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

## `uglify/join_vars/chained_assignments`

- tags: `join vars`
- size: oxc 41 vs reference 38 (no whitespaces: +3, formatted: +3)

```js
var a, b = a = {};
b.p = 'PASS';
console.log(a.p);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var a, b = a = { p: 'PASS' };
+var a, b = a = {};
+b.p = 'PASS';
 console.log(a.p);

```

## `uglify/join_vars/folded_assignments_1`

- tags: `join vars`
- size: oxc 55 vs reference 52 (no whitespaces: +3, formatted: +1)

```js
var a = {};
a[a.PASS = 42] = 'PASS';
console.log(a[42], a.PASS);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-var a = {
-	PASS: 42,
-	42: 'PASS'
-};
+var a = {};
+a[a.PASS = 42] = 'PASS';
 console.log(a[42], a.PASS);

```

## `uglify/join_vars/folded_assignments_2`

- tags: `join vars`
- size: oxc 81 vs reference 78 (no whitespaces: +3, formatted: +1)

```js
'use strict';
var a = {};
a[42] = 'FAIL';
a[a.PASS = 42] = 'PASS';
console.log(a[42], a.PASS);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 'use strict';
-var a = {
-	42: 'FAIL',
-	PASS: 42
-};
-a[42] = 'PASS';
+var a = {};
+a[42] = 'FAIL';
+a[a.PASS = 42] = 'PASS';
 console.log(a[42], a.PASS);

```

## `uglify/join_vars/issue_5831`

- tags: `join vars`
- size: oxc 36 vs reference 33 (no whitespaces: +3, formatted: +5)

```js
var a = [console.log('PASS')];
a[0] = 42;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-var a = [(console.log('PASS'), 42)];
+var a = [console.log('PASS')];
+a[0] = 42;

```

## `uglify/join_vars/join_object_assignments_4`

- tags: `join vars`, `sequences`
- size: oxc 80 vs reference 77 (no whitespaces: +3, formatted: +3)

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
@@ -1,2 +1,2 @@
 var o;
-console.log(o), o = { a: 'foo' }, console.log(o.b), o.b = 'bar', console.log(o.a);
+console.log(o), o = {}, o.a = 'foo', console.log(o.b), o.b = 'bar', console.log(o.a);

```

## `uglify/join_vars/loop_body_2`

- tags: `join vars`
- size: oxc 19 vs reference 16 (no whitespaces: +3, formatted: +3)

```js
for (var a; x;) var b;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-for (var a, b; x;);
+for (var a; x;) var b;

```

## `uglify/keep_fargs/if_increment`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 47 (no whitespaces: +3, formatted: +4)

```js
console.log(function(a) {
	if (console) return ++a;
}(0));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function() {
-	if (console) return 1;
-}());
+console.log(function(a) {
+	if (console) return ++a;
+}(0));

```

## `uglify/keep_fargs/issue_2425_3`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 61 (no whitespaces: +3, formatted: +5)

```js
var a = 8;
(function(b, b) {
	b.toString();
})(--a, a |= 10);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 8;
-(function() {
-	(a |= 10).toString();
-})(--a);
+(function(b, b) {
+	b.toString();
+})(--a, a |= 10);
 console.log(a);

```

## `uglify/keep_fargs/issue_2630_3`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 102 (no whitespaces: +3, formatted: +5)

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
@@ -1,9 +1,10 @@
 var x = 2, a = 1;
 (function() {
-	(function f1() {
+	function f1(a) {
 		f2();
-		--x >= 0 && f1();
-	})(a++);
+		--x >= 0 && f1({});
+	}
+	f1(a++);
 	function f2() {
 		a++;
 	}

```

## `uglify/keep_fargs/issue_3192`

- tags: `remove unused`
- size: oxc 125 vs reference 122 (no whitespaces: +3, formatted: +5)

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
@@ -1,7 +1,7 @@
 (function(a) {
 	console.log(a = 'foo', arguments[0]);
 })('bar');
-(function() {
+(function(a) {
 	'use strict';
-	console.log('foo', arguments[0]);
+	console.log(a = 'foo', arguments[0]);
 })('bar');

```

## `uglify/loops/issue_1532_1`

- size: oxc 82 vs reference 79 (no whitespaces: +3, formatted: +13)

```js
function f(x, y) {
	do {
		if (x) break;
		console.log(y);
	} while (false);
}
f(null, 'PASS');
f(42, 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
 function f(x, y) {
-	for (; !x && (console.log(y), false););
+	do {
+		if (x) break;
+		console.log(y);
+	} while (0);
 }
 f(null, 'PASS');
 f(42, 'FAIL');

```

## `uglify/loops/loop_return`

- size: oxc 67 vs reference 64 (no whitespaces: +3, formatted: +4)

```js
function f(a) {
	while (a) return 42;
	return 'foo';
}
console.log(f(0), f(1));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a) {
-	if (a) return 42;
+	for (; a;) return 42;
 	return 'foo';
 }
 console.log(f(0), f(1));

```

## `uglify/merge_vars/read_before_assign_2`

- tags: `join vars`
- size: oxc 76 vs reference 73 (no whitespaces: +3, formatted: +4)

```js
console.log(function(a, a) {
	while (b) return 'FAIL';
	var b = 1;
	return 'PASS';
}(0, []));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(function(a, a) {
-	if (b) return 'FAIL';
+	for (; b;) return 'FAIL';
 	var b = 1;
 	return 'PASS';
 }(0, []));

```

## `uglify/nullish/de_morgan_1`

- size: oxc 53 vs reference 50 (no whitespaces: +3, formatted: +5)

```js
function f(a) {
	return a ?? a;
}
console.log(f(null), f(42));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	return a;
+	return a ?? a;
 }
 console.log(f(null), f(42));

```

## `uglify/nullish/de_morgan_2e`

- tags: `sequences`
- size: oxc 91 vs reference 88 (no whitespaces: +3, formatted: +5)

```js
function f(a, b) {
	return a ?? a ?? b;
}
console.log(f(null), f(null, {}));
console.log(f(42), f(42, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a, b) {
-	return a ?? b;
+	return a ?? a ?? b;
 }
-console.log(f(null), f(null, {}));
-console.log(f(42), f(42, {}));
+console.log(f(null), f(null, {})), console.log(f(42), f(42, {}));

```

## `uglify/pure_getters/issue_2110_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 95 vs reference 92 (no whitespaces: +3, formatted: +5)

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

## `uglify/pure_getters/issue_2110_2`

- tags: `join vars`, `remove unused`
- size: oxc 95 vs reference 92 (no whitespaces: +3, formatted: +5)

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

## `uglify/reduce_vars/duplicate_lambda_defun_name_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 58 vs reference 55 (no whitespaces: +3, formatted: +5)

```js
console.log(function f(a) {
	function f() {}
	return f.length;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 console.log(function(a) {
-	return function() {}.length;
+	function f() {}
+	return f.length;
 }());

```

## `uglify/reduce_vars/iife_func_side_effects`

- tags: `join vars`, `remove unused`
- size: oxc 187 vs reference 184 (no whitespaces: +3, formatted: +5)

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

## `uglify/reduce_vars/issue_1595_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 32 vs reference 29 (no whitespaces: +3, formatted: +5)

```js
(function f(a) {
	return g(a + 1);
})(2);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function(a) {
-	return g(3);
-})();
+	return g(a + 1);
+})(2);

```

## `uglify/reduce_vars/issue_2423_1`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 57 (no whitespaces: +3, formatted: +2)

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
-	console.log(function() {
-		return 1;
-	}());
+	console.log(c());
 }
 p();
 p();

```

## `uglify/reduce_vars/issue_2450_2`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 56 (no whitespaces: +3, formatted: +5)

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

## `uglify/reduce_vars/local_definition_modified`

- tags: `join vars`
- size: oxc 36 vs reference 33 (no whitespaces: +3, formatted: +5)

```js
var a = a || {};
a.p = 42;
console.log(a.p);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = {};
+var a = a || {};
 a.p = 42;
 console.log(a.p);

```

## `uglify/reduce_vars/toplevel_off_loops_1`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 62 (no whitespaces: +3, formatted: +3)

```js
function bar() {
	console.log('bar:', --x);
}
var x = 3;
do
	bar();
while (x);

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,6 @@
 	console.log('bar:', --x);
 }
 var x = 3;
-for (; bar(), x;);
+do
+	bar();
+while (x);

```

## `uglify/reduce_vars/toplevel_off_loops_2`

- tags: `join vars`, `remove unused`
- size: oxc 61 vs reference 58 (no whitespaces: +3, formatted: +3)

```js
function bar() {
	console.log('bar:');
}
var x = 3;
do
	bar();
while (x);

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,6 @@
 	console.log('bar:');
 }
 var x = 3;
-for (; bar(), x;);
+do
+	bar();
+while (x);

```

## `uglify/rests/inline`

- size: oxc 62 vs reference 59 (no whitespaces: +3, formatted: -3)

```js
console.log(function(a, ...[b, c]) {
	return c + b + a;
}('SS', 'A', 'P'));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
-console.log(([a, ...[b, c]] = [
-	'SS',
-	'A',
-	'P'
-], c + b + a));
-var a, b, c;
+console.log(function(a, ...[b, c]) {
+	return c + b + a;
+}('SS', 'A', 'P'));

```

## `uglify/sequences/side_effects_cascade_1`

- tags: `join vars`, `sequences`
- size: oxc 93 vs reference 90 (no whitespaces: +3, formatted: +3)

```js
function f(a, b) {
	a -= 42;
	if (a < 0) a = 0;
	b.a = a;
}
var m = {}, n = {};
f(13, m);
f('foo', n);
console.log(m.a, n.a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b) {
-	b.a = a = (a -= 42) < 0 ? 0 : a;
+	a -= 42, a < 0 && (a = 0), b.a = a;
 }
 var m = {}, n = {};
 f(13, m), f('foo', n), console.log(m.a, n.a);

```

## `uglify/spreads/issue_4882_3`

- size: oxc 132 vs reference 129 (no whitespaces: +3, formatted: +5)

```js
var o = {
	__proto__: { p: 42 },
	...{ set __proto__(v) {} }
};
console.log(o.__proto__ === Object.getPrototypeOf(o) ? 'FAIL' : 'PASS');
console.log(o.p);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var o = {
 	__proto__: { p: 42 },
-	['__proto__']: void 0
+	...{ set __proto__(v) {} }
 };
 console.log(o.__proto__ === Object.getPrototypeOf(o) ? 'FAIL' : 'PASS');
 console.log(o.p);

```

## `uglify/templates/issue_4606`

- size: oxc 36 vs reference 33 (no whitespaces: +3, formatted: +1)

```js
console.log(`${typeof A} ${'\r'} ${'\\'} ${'`'}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(typeof A + ' \r \\ `');
+console.log(`${typeof A} \r \\ \``);

```

## `uglify/templates/issue_5125_3`

- size: oxc 33 vs reference 30 (no whitespaces: +3, formatted: +1)

```js
console.log(`PASS\n${typeof A}`);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-console.log(`PASS
-` + typeof A);
+console.log(`PASS\n${typeof A}`);

```

## `uglify/varify/forin_const_2`

- tags: `join vars`
- size: oxc 59 vs reference 56 (no whitespaces: +3, formatted: +3)

```js
const o = {
	p: 42,
	q: 'PASS'
};
for (const [k] in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var o = {
+const o = {
 	p: 42,
 	q: 'PASS'
-}, k;
-for ([k] in o) console.log(k, o[k]);
+};
+for (let [k] in o) console.log(k, o[k]);

```

## `uglify/yields/collapse_property_lambda`

- tags: `join vars`
- size: oxc 66 vs reference 63 (no whitespaces: +3, formatted: +4)

```js
console.log(function* f() {
	f.g = () => 42;
	return f.g();
}().next().value);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 console.log(function* f() {
-	return (f.g = () => 42)();
+	f.g = () => 42;
+	return f.g();
 }().next().value);

```

## `uglify/arrays/constructor_good`

- size: oxc 364 vs reference 360 (no whitespaces: +4, formatted: +4)

```js
console.log(Array());
console.log(Array(0));
console.log(Array(1));
console.log(Array(6));
console.log(Array(7));
console.log(Array(1, 2));
console.log(Array(false));
console.log(Array('foo'));
console.log(Array(Array));
console.log(new Array());
console.log(new Array(0));
console.log(new Array(1));
console.log(new Array(6));
console.log(new Array(7));
console.log(new Array(1, 2));
console.log(new Array(false));
console.log(new Array('foo'));
console.log(new Array(Array));

```

```diff
--- reference
+++ oxc
@@ -11,7 +11,7 @@
 ]);
 console.log(Array(7));
 console.log([1, 2]);
-console.log([false]);
+console.log(Array(!1));
 console.log(['foo']);
 console.log(Array(Array));
 console.log([]);
@@ -27,6 +27,6 @@
 ]);
 console.log(Array(7));
 console.log([1, 2]);
-console.log([false]);
+console.log(Array(!1));
 console.log(['foo']);
 console.log(Array(Array));

```

## `uglify/arrows/instanceof_lambda_2`

- size: oxc 37 vs reference 33 (no whitespaces: +4, formatted: +3)

```js
console.log(null instanceof (() => {}));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((null, () => {}, false));
+console.log(null instanceof (() => {}));

```

## `uglify/arrows/reduce_lambda_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 75 vs reference 71 (no whitespaces: +4, formatted: +7)

```js
(function(f, a, b) {
	f = () => {
		console.log(a, b);
	};
	a = 'foo', b = 42;
	f();
	b = 'bar';
	f();
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 (function(f, a, b) {
 	f = () => {
-		console.log('foo', b);
+		console.log(a, b);
 	};
-	b = 42;
+	a = 'foo', b = 42;
 	f();
 	b = 'bar';
 	f();

```

## `uglify/arrows/trim_body`

- size: oxc 60 vs reference 56 (no whitespaces: +4, formatted: +4)

```js
var f = (a) => {
	return a;
};
var g = (b) => void b;
console.log(f('PASS'), g('FAIL'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var f = (a) => a;
-var g = (b) => {};
+var g = (b) => void 0;
 console.log(f('PASS'), g('FAIL'));

```

## `uglify/assignments/op_equals_right_global_var`

- size: oxc 173 vs reference 169 (no whitespaces: +4, formatted: +12)

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

## `uglify/awaits/functions`

- tags: `join vars`, `remove unused`
- size: oxc 350 vs reference 346 (no whitespaces: +4, formatted: +4)

```js
!async function() {
	var a = async function a() {
		return a && 'a';
	};
	var b = async function x() {
		return !!x;
	};
	var c = async function(c) {
		return c;
	};
	if (await c(await b(await a()))) {
		var d = async function() {};
		var e = async function y() {
			return typeof y;
		};
		var f = async function(f) {
			return f;
		};
		console.log(await a(await d()), await b(await e()), await c(await f(42)), typeof d, await e(), typeof f);
	}
}();

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,17 @@
-!async function() {
-	async function a() {
+(async function() {
+	var a = async function a() {
 		return a && 'a';
-	}
-	async function b() {
-		return !!b;
-	}
-	async function c(c) {
+	}, b = async function x() {
+		return !!x;
+	}, c = async function(c) {
 		return c;
-	}
+	};
 	if (await c(await b(await a()))) {
-		var d = async function() {};
-		var e = async function y() {
+		var d = async function() {}, e = async function y() {
 			return typeof y;
-		};
-		var f = async function(f) {
+		}, f = async function(f) {
 			return f;
 		};
 		console.log(await a(await d()), await b(await e()), await c(await f(42)), typeof d, await e(), typeof f);
 	}
-}();
+})();

```

## `uglify/awaits/functions_use_strict`

- tags: `join vars`, `remove unused`
- size: oxc 363 vs reference 359 (no whitespaces: +4, formatted: +4)

```js
'use strict';
!async function() {
	var a = async function a() {
		return a && 'a';
	};
	var b = async function x() {
		return !!x;
	};
	var c = async function(c) {
		return c;
	};
	if (await c(await b(await a()))) {
		var d = async function() {};
		var e = async function y() {
			return typeof y;
		};
		var f = async function(f) {
			return f;
		};
		console.log(await a(await d()), await b(await e()), await c(await f(42)), typeof d, await e(), typeof f);
	}
}();

```

```diff
--- reference
+++ oxc
@@ -1,22 +1,18 @@
 'use strict';
-!async function() {
-	async function a() {
+(async function() {
+	var a = async function a() {
 		return a && 'a';
-	}
-	async function b() {
-		return !!b;
-	}
-	async function c(c) {
+	}, b = async function x() {
+		return !!x;
+	}, c = async function(c) {
 		return c;
-	}
+	};
 	if (await c(await b(await a()))) {
-		var d = async function() {};
-		var e = async function y() {
+		var d = async function() {}, e = async function y() {
 			return typeof y;
-		};
-		var f = async function(f) {
+		}, f = async function(f) {
 			return f;
 		};
 		console.log(await a(await d()), await b(await e()), await c(await f(42)), typeof d, await e(), typeof f);
 	}
-}();
+})();

```

## `uglify/awaits/object_function`

- size: oxc 39 vs reference 35 (no whitespaces: +4, formatted: +4)

```js
({ async f() {
	console.log('PASS');
} }).f();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(async () => {
+({ async f() {
 	console.log('PASS');
-})();
+} }).f();

```

## `uglify/awaits/reduce_iife_1`

- tags: `join vars`, `remove unused`
- size: oxc 42 vs reference 38 (no whitespaces: +4, formatted: +6)

```js
(async function(a) {
	console.log(a + a);
})(21);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(async function() {
-	console.log(42);
-})();
+(async function(a) {
+	console.log(a + a);
+})(21);

```

## `uglify/booleans/de_morgan_1d`

- size: oxc 57 vs reference 53 (no whitespaces: +4, formatted: +7)

```js
function f(a) {
	return (a = false) || a;
}
console.log(f(null), f(42));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	return a = !1;
+	return (a = !1) || a;
 }
 console.log(f(null), f(42));

```

## `uglify/classes/issue_5682_class_key`

- size: oxc 95 vs reference 91 (no whitespaces: +4, formatted: +4)

```js
'use strict';
function f(a) {
	return 'foo' in a;
}
class A {
	foo() {}
}
console.log(f(new A()) ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 'use strict';
-function f(o) {
-	return 'o' in o;
+function f(a) {
+	return 'foo' in a;
 }
 class A {
-	o() {}
+	foo() {}
 }
 console.log(f(new A()) ? 'PASS' : 'FAIL');

```

## `uglify/classes/keep_static_field_reference_4`

- tags: `join vars`, `remove unused`
- size: oxc 84 vs reference 80 (no whitespaces: +4, formatted: +7)

```js
'use strict';
var A = class {};
var B = class {
	static P = A;
};
console.log(B.P === B.P ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'use strict';
-var B = class {
-	static P = class {};
+var A = class {}, B = class {
+	static P = A;
 };
 console.log(B.P === B.P ? 'PASS' : 'FAIL');

```

## `uglify/collapse_vars/array_in_object_2`

- tags: `join vars`
- size: oxc 46 vs reference 42 (no whitespaces: +4, formatted: +5)

```js
var a = 2;
console.log({
	p: [a, (a--, 42)],
	q: a
}.q, a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 2;
 console.log({
-	p: [a, 42],
-	q: --a
+	p: [a, (a--, 42)],
+	q: a
 }.q, a);

```

## `uglify/collapse_vars/collapse_rhs_var`

- tags: `join vars`
- size: oxc 79 vs reference 75 (no whitespaces: +4, formatted: +8)

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
@@ -1,6 +1,8 @@
 var a, b;
 function f() {
-	return b = a = f;
+	a = f;
+	b = f;
+	return f;
 }
 var c = f();
 console.log(a === b, b === c, c === a);

```

## `uglify/collapse_vars/compound_assignment_8`

- tags: `join vars`
- size: oxc 55 vs reference 51 (no whitespaces: +4, formatted: +7)

```js
var a = 2;
a = 3 * a;
a = 7 * a;
console || (a = 'FAIL');
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = 2;
-a = a * 3 * 7;
+a = 3 * a;
+a = 7 * a;
 console || (a = 'FAIL');
 console.log(a);

```

## `uglify/collapse_vars/conditional_1`

- tags: `join vars`, `remove unused`
- size: oxc 102 vs reference 98 (no whitespaces: +4, formatted: +7)

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

## `uglify/collapse_vars/issue_2436_14`

- tags: `join vars`, `remove unused`
- size: oxc 82 vs reference 78 (no whitespaces: +4, formatted: +8)

```js
var a = 'PASS';
var b = {};
(function() {
	var c = a;
	c && function(c, d) {
		console.log(c, d);
	}(b, c);
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a = 'PASS';
-var b = {};
+var a = 'PASS', b = {};
 (function() {
-	a && function(c, d) {
-		console.log(b, d);
-	}(0, a);
+	var c = a;
+	c && function(c, d) {
+		console.log(c, d);
+	}(b, c);
 })();

```

## `uglify/collapse_vars/issue_4070`

- tags: `join vars`
- size: oxc 64 vs reference 60 (no whitespaces: +4, formatted: +6)

```js
console.log(function f() {
	function g() {}
	g.p++;
	return f.p = g.p;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 console.log(function f() {
 	function g() {}
-	return f.p = ++g.p;
+	g.p++;
+	return f.p = g.p;
 }());

```

## `uglify/collapse_vars/issue_4732_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 64 vs reference 60 (no whitespaces: +4, formatted: +6)

```js
var a = 0;
(function(b) {
	var b = a++;
	var c = b ? b && console.log('PASS') : 0;
})(a++);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = 0;
 (function(b) {
-	(b = a++) && b && console.log('PASS');
+	var b = a++;
+	b && b && console.log('PASS');
 })(a++);

```

## `uglify/collapse_vars/issue_4874`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 70 (no whitespaces: +4, formatted: +7)

```js
var a;
a = null;
(function(b) {
	for (var c in b = b && b[console.log('PASS')]) console;
})(a = 42);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-null;
+var a = null;
 (function(b) {
-	for (var c in 42, 42[console.log('PASS')]) console;
-})();
+	for (var c in b &&= b[console.log('PASS')]);
+})(a = 42);

```

## `uglify/collapse_vars/local_value_replacement`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 70 (no whitespaces: +4, formatted: +6)

```js
function f(a, b) {
	(a = b) && g(a);
}
function g(c) {
	console.log(c);
}
f('FAIL', 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b) {
-	b && g(b);
+	(a = b) && g(a);
 }
 function g(c) {
 	console.log(c);

```

## `uglify/collapse_vars/mangleable_var`

- tags: `join vars`, `remove unused`
- size: oxc 113 vs reference 109 (no whitespaces: +4, formatted: +7)

```js
function f(a) {
	var b = a(), c = a(), d = b;
	return c.p(c, d);
}
console.log(f(function() {
	return { p: function() {
		return 'PASS';
	} };
}));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f(a) {
-	var b = a(), c = a();
-	return c.p(c, b);
+	var b = a(), c = a(), d = b;
+	return c.p(c, d);
 }
 console.log(f(function() {
 	return { p: function() {

```

## `uglify/collapse_vars/sequence_in_iife_1`

- tags: `join vars`
- size: oxc 64 vs reference 60 (no whitespaces: +4, formatted: +5)

```js
var a = 'foo', b = 42;
(function() {
	var c = (b = a, b);
})();
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 'foo', b = 42;
 (function() {
-	var c = b = a;
+	var c = (b = a, b);
 })();
 console.log(a, b);

```

## `uglify/collapse_vars/sub_property`

- tags: `join vars`
- size: oxc 70 vs reference 66 (no whitespaces: +4, formatted: +7)

```js
console.log(function(a, b) {
	return a[b = a, b.length - 1];
}(['FAIL', 'PASS']));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function(a, b) {
-	return a[a.length - 1];
+	return a[b = a, b.length - 1];
 }(['FAIL', 'PASS']));

```

## `uglify/collapse_vars/substitution_logical_3`

- tags: `join vars`
- size: oxc 268 vs reference 264 (no whitespaces: +4, formatted: +10)

```js
function f1(a, b) {
	console.log(a && (b = a) && b);
}
function f2(a, b) {
	console.log(a && (b = a) || b);
}
function f3(a, b) {
	console.log(a || (b = a) && b);
}
function f4(a, b) {
	console.log(a || (b = a) || b);
}
f1(42, 'foo');
f1(null, true);
f2(42, 'foo');
f2(null, true);
f3(42, 'foo');
f3(null, true);
f4(42, 'foo');
f4(null, true);

```

```diff
--- reference
+++ oxc
@@ -1,20 +1,20 @@
 function f1(a, b) {
-	console.log(a && a && a);
+	console.log(a && (b = a) && b);
 }
 function f2(a, b) {
 	console.log(a && (b = a) || b);
 }
 function f3(a, b) {
-	console.log(a || a && a);
+	console.log(a || (b = a) && b);
 }
 function f4(a, b) {
-	console.log(a || a || a);
+	console.log(a || (b = a) || b);
 }
 f1(42, 'foo');
-f1(null, true);
+f1(null, !0);
 f2(42, 'foo');
-f2(null, true);
+f2(null, !0);
 f3(42, 'foo');
-f3(null, true);
+f3(null, !0);
 f4(42, 'foo');
-f4(null, true);
+f4(null, !0);

```

## `uglify/collapse_vars/unused_orig`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 99 vs reference 95 (no whitespaces: +4, formatted: +7)

```js
var a = 1;
console.log(function(b) {
	var a;
	var c = b;
	for (var d in c) {
		var a = c[0];
		return --b + a;
	}
	try {} catch (e) {
		--b + a;
	}
	a && a.NaN;
}([2]), a);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var a = 1;
 console.log(function(b) {
-	var c = b;
+	var a, c = b;
 	for (var d in c) {
-		var a;
-		return --b + c[0];
+		var a = c[0];
+		return --b + a;
 	}
 	a && a.NaN;
 }([2]), a);

```

## `uglify/comparisons/unsafe_indexOf`

- size: oxc 612 vs reference 608 (no whitespaces: +4, formatted: +32)

```js
var a = Object.keys({ foo: 42 });
if (a.indexOf('bar') < 0) console.log('PASS');
if (0 > a.indexOf('bar')) console.log('PASS');
if (a.indexOf('foo') >= 0) console.log('PASS');
if (0 <= a.indexOf('foo')) console.log('PASS');
if (a.indexOf('foo') > -1) console.log('PASS');
if (-1 < a.indexOf('foo')) console.log('PASS');
if (a.indexOf('bar') == -1) console.log('PASS');
if (-1 == a.indexOf('bar')) console.log('PASS');
if (a.indexOf('bar') === -1) console.log('PASS');
if (-1 === a.indexOf('bar')) console.log('PASS');
if (a.indexOf('foo') != -1) console.log('PASS');
if (-1 != a.indexOf('foo')) console.log('PASS');
if (a.indexOf('foo') !== -1) console.log('PASS');
if (-1 !== a.indexOf('foo')) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,15 @@
 var a = Object.keys({ foo: 42 });
-if (!~a.indexOf('bar')) console.log('PASS');
-if (!~a.indexOf('bar')) console.log('PASS');
-if (~a.indexOf('foo')) console.log('PASS');
-if (~a.indexOf('foo')) console.log('PASS');
-if (~a.indexOf('foo')) console.log('PASS');
-if (~a.indexOf('foo')) console.log('PASS');
-if (!~a.indexOf('bar')) console.log('PASS');
-if (!~a.indexOf('bar')) console.log('PASS');
-if (!~a.indexOf('bar')) console.log('PASS');
-if (!~a.indexOf('bar')) console.log('PASS');
-if (~a.indexOf('foo')) console.log('PASS');
-if (~a.indexOf('foo')) console.log('PASS');
-if (~a.indexOf('foo')) console.log('PASS');
-if (~a.indexOf('foo')) console.log('PASS');
+a.indexOf('bar') < 0 && console.log('PASS');
+0 > a.indexOf('bar') && console.log('PASS');
+a.indexOf('foo') >= 0 && console.log('PASS');
+0 <= a.indexOf('foo') && console.log('PASS');
+a.indexOf('foo') > -1 && console.log('PASS');
+-1 < a.indexOf('foo') && console.log('PASS');
+a.indexOf('bar') == -1 && console.log('PASS');
+a.indexOf('bar') == -1 && console.log('PASS');
+a.indexOf('bar') === -1 && console.log('PASS');
+a.indexOf('bar') === -1 && console.log('PASS');
+a.indexOf('foo') != -1 && console.log('PASS');
+a.indexOf('foo') != -1 && console.log('PASS');
+a.indexOf('foo') !== -1 && console.log('PASS');
+a.indexOf('foo') !== -1 && console.log('PASS');

```

## `uglify/conditionals/ifs_2`

- tags: `sequences`
- size: oxc 53 vs reference 49 (no whitespaces: +4, formatted: +4)

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
-(foo ? x : bar ? y : baz ? z : t)();
+foo ? x() : bar ? y() : baz && z(), foo ? x() : bar ? y() : baz ? z() : t();

```

## `uglify/conditionals/issue_3576`

- tags: `join vars`, `sequences`
- size: oxc 78 vs reference 74 (no whitespaces: +4, formatted: +5)

```js
var c = 'FAIL';
(function(a) {
	(a = -1) ? a && (a.a = 0) : a && (a.a = 0);
	a && a[c = 'PASS']++;
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
 var c = 'FAIL';
 (function(a) {
-	a = -1, a, a.a = 0;
-	a, a[c = 'PASS']++;
-})();
-console.log(c);
+	a = -1, a && (a.a = 0), a && a[c = 'PASS']++;
+})(), console.log(c);

```

## `uglify/const/issue_4954_1`

- size: oxc 94 vs reference 90 (no whitespaces: +4, formatted: +4)

```js
'use strict';
(function() {
	{
		const a = 'foo';
		console.log(a);
	}
	{
		const a = 'bar';
		console.log(a);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 'use strict';
 (function() {
 	{
-		const a = 'foo';
-		console.log(a);
+		let a = 'foo';
+		console.log('foo');
 	}
 	{
-		const b = 'bar';
-		console.log(b);
+		let a = 'bar';
+		console.log('bar');
 	}
 })();

```

## `uglify/dead-code/issue_5882_1`

- size: oxc 31 vs reference 27 (no whitespaces: +4, formatted: +5)

```js
console.log(delete (42 .p = NaN));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(delete (0, NaN));
+console.log(delete (42 .p = NaN));

```

## `uglify/dead-code/issue_5882_2`

- tags: `sequences`
- size: oxc 31 vs reference 27 (no whitespaces: +4, formatted: +5)

```js
console.log(delete (42 .p = NaN));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(delete (0, NaN));
+console.log(delete (42 .p = NaN));

```

## `uglify/dead-code/last_assign_if_else`

- size: oxc 100 vs reference 96 (no whitespaces: +4, formatted: +8)

```js
function f(a) {
	if (a) a = console.log('foo');
	else {
		console.log('bar');
		a = console.log('baz');
	}
}
f(42);
f(null);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f(a) {
-	if (a) console.log('foo');
+	if (a) a = console.log('foo');
 	else {
 		console.log('bar');
-		console.log('baz');
+		a = console.log('baz');
 	}
 }
 f(42);

```

## `uglify/dead-code/redundant_assignments`

- size: oxc 52 vs reference 48 (no whitespaces: +4, formatted: +8)

```js
var a = a = 'PASS', b = 'FAIL';
b = b = 'PASS';
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = 'PASS', b = 'FAIL';
-b = 'PASS';
+var a = a = 'PASS', b = 'FAIL';
+b = b = 'PASS';
 console.log(a, b);

```

## `uglify/dead-code/self_assignments_6`

- tags: `join vars`
- size: oxc 38 vs reference 34 (no whitespaces: +4, formatted: +6)

```js
var o = { p: 'PASS' };
console.log(o.p = o.p);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var o = { p: 'PASS' };
-console.log(o.p);
+console.log(o.p = o.p);

```

## `uglify/default-values/collapse_in_arg`

- tags: `join vars`, `remove unused`
- size: oxc 42 vs reference 38 (no whitespaces: +4, formatted: +7)

```js
(function(a, b = a) {
	b('PASS');
})(console.log);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function(a) {
-	a('PASS');
+(function(a, b = a) {
+	b('PASS');
 })(console.log);

```

## `uglify/default-values/collapse_value_1`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 40 (no whitespaces: +4, formatted: +5)

```js
console.log(function(a = 'PASS') {
	return a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function() {
-	return 'PASS';
+console.log(function(a = 'PASS') {
+	return a;
 }());

```

## `uglify/default-values/drop_preceding_simple_arg`

- tags: `join vars`, `remove unused`
- size: oxc 62 vs reference 58 (no whitespaces: +4, formatted: +6)

```js
var a = 'foo';
console.log(function(b, c = 'bar') {
	return b + c;
}(a, a));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var a = 'foo';
-console.log(function(c = 'bar') {
-	return a + c;
-}(a));
+console.log(function(b, c = 'bar') {
+	return b + c;
+}(a, a));

```

## `uglify/default-values/issue_5463`

- tags: `join vars`, `sequences`
- size: oxc 61 vs reference 57 (no whitespaces: +4, formatted: +4)

```js
if (console.log('PASS')) var a = void 0, b = void 0, b = [a = FAIL] = b && b;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a, b, b;
-console.log('PASS') && (b = a = void 0, b = [a = FAIL] = a);
+if (console.log('PASS')) var a = void 0, b = void 0, b = [a = FAIL] = b && b;

```

## `uglify/destructured/computed_key_unused`

- tags: `remove unused`
- size: oxc 138 vs reference 134 (no whitespaces: +4, formatted: +7)

```js
var { [console.log('bar')]: a, [console.log('baz')]: { b }, [console.log('moo')]: [c, { [console.log('moz')]: d, e }] } = { [console.log('foo')]: [null, 42] };

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var { [console.log('bar')]: a, [console.log('baz')]: {}, [console.log('moo')]: [, { [console.log('moz')]: d }] } = { [console.log('foo')]: [null, 42] };
+var { [console.log('bar')]: a, [console.log('baz')]: { b }, [console.log('moo')]: [c, { [console.log('moz')]: d, e }] } = { [console.log('foo')]: [null, 42] };

```

## `uglify/destructured/funarg_collapse_vars_2`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 63 (no whitespaces: +4, formatted: +6)

```js
console.log(function([a], { b }, c) {
	return a + b + c;
}(['P'], { b: 'A' }, 'SS'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function([a], { b }) {
-	return a + b + 'SS';
-}(['P'], { b: 'A' }));
+console.log(function([a], { b }, c) {
+	return a + b + c;
+}(['P'], { b: 'A' }, 'SS'));

```

## `uglify/destructured/funarg_computed_key_scope_3`

- tags: `join vars`, `remove unused`
- size: oxc 129 vs reference 125 (no whitespaces: +4, formatted: +5)

```js
(function({ [function() {
	(function({ [function() {
		console.log(typeof f, typeof g, typeof h);
	}()]: a }) {
		function f() {}
	})(1);
	function g() {}
}()]: b }) {
	function h() {}
})(2);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 (function({ [function() {
 	(function({ [function() {
-		console.log(typeof f, typeof function() {}, typeof h);
+		console.log(typeof f, typeof g, typeof h);
 	}()]: a }) {})(1);
+	function g() {}
 }()]: b }) {})(2);

```

## `uglify/destructured/funarg_unused_1`

- tags: `remove unused`
- size: oxc 40 vs reference 36 (no whitespaces: +4, formatted: +4)

```js
(function([]) {})([console.log('PASS')]);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(function() {})(console.log('PASS'));
+(function([]) {})([console.log('PASS')]);

```

## `uglify/destructured/issue_5843_2`

- tags: `remove unused`
- size: oxc 52 vs reference 48 (no whitespaces: +4, formatted: +5)

```js
var a;
({p: a} = { __proto__: { p: 'PASS' } });
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a;
-a = { __proto__: { p: 'PASS' } }.p;
+({p: a} = { __proto__: { p: 'PASS' } });
 console.log(a);

```

## `uglify/destructured/issue_5866_12`

- tags: `remove unused`
- size: oxc 71 vs reference 67 (no whitespaces: +4, formatted: +6)

```js
var a = {}, b;
({p: {q: b}} = { p: a = { q: {} } });
console.log(a.q === b ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var b, a = {};
-b = { p: (a = { q: {} }).q }.p;
+var a = {}, b;
+({p: {q: b}} = { p: a = { q: {} } });
 console.log(a.q === b ? 'PASS' : 'FAIL');

```

## `uglify/drop-unused/assign_binding`

- tags: `join vars`, `remove unused`
- size: oxc 27 vs reference 23 (no whitespaces: +4, formatted: +7)

```js
function f() {
	var a;
	a = f.g, a();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f() {
-	(0, f.g)();
+	var a = f.g;
+	a();
 }

```

## `uglify/drop-unused/cascade_drop_assign`

- tags: `join vars`, `remove unused`
- size: oxc 32 vs reference 28 (no whitespaces: +4, formatted: +7)

```js
var a, b = a = 'PASS';
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var b = 'PASS';
+var a, b = a = 'PASS';
 console.log(b);

```

## `uglify/drop-unused/global_var`

- tags: `remove unused`
- size: oxc 49 vs reference 45 (no whitespaces: +4, formatted: +8)

```js
var a;
function foo(b) {
	a;
	b;
	c;
	typeof c === 'undefined';
	c + b + a;
	b && b.ar();
	return b;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a;
 function foo(b) {
 	c;
-	c;
+	c + b + a;
 	b && b.ar();
 	return b;
 }

```

## `uglify/drop-unused/issue_2226_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 47 vs reference 43 (no whitespaces: +4, formatted: +6)

```js
console.log(function(a, b) {
	a += b;
	return a;
}(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function(a, b) {
-	return a += 2;
-}(1));
+	return a += b, a;
+}(1, 2));

```

## `uglify/drop-unused/issue_2226_3`

- tags: `join vars`, `remove unused`
- size: oxc 47 vs reference 43 (no whitespaces: +4, formatted: +7)

```js
console.log(function(a, b) {
	a += b;
	return a;
}(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 console.log(function(a, b) {
-	return a += 2;
-}(1));
+	a += b;
+	return a;
+}(1, 2));

```

## `uglify/drop-unused/issue_3802_1`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 50 (no whitespaces: +4, formatted: +4)

```js
var a = 0;
a += 0;
var a = function() {};
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var a = 0;
 a += 0;
-a = function() {};
+var a = function() {};
 console.log(typeof a);

```

## `uglify/evaluate/issue_5558`

- tags: `join vars`, `sequences`
- size: oxc 51 vs reference 47 (no whitespaces: +4, formatted: +5)

```js
var a = 99, b = 0;
a++;
b++;
b += a;
b *= a;
b += a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 99, b = 0;
-b++, b = (b += ++a) * a + a, console.log(a);
+a++, b++, b += a, b *= a, b += a, console.log(a);

```

## `uglify/evaluate/threshold_evaluate_default`

- tags: `join vars`, `remove unused`
- size: oxc 75 vs reference 71 (no whitespaces: +4, formatted: +4)

```js
function b(x) {
	return x + x + x;
}
console.log(b('1'), b(2), b(b(b('ABCDEFGHIJK'))));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function b(x) {
 	return x + x + x;
 }
-console.log('111', 6, b(b(b('ABCDEFGHIJK'))));
+console.log(b('1'), b(2), b(b(b('ABCDEFGHIJK'))));

```

## `uglify/exports/issue_4742_unused_2`

- tags: `join vars`, `remove unused`
- size: oxc 31 vs reference 27 (no whitespaces: +4, formatted: +4)

```js
export var a = 'foo';
var a = 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 export var a = 'foo';
-a = 'bar';
+var a = 'bar';

```

## `uglify/hoist_props/direct_access_2`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 64 (no whitespaces: +4, formatted: +7)

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
@@ -1,4 +1,4 @@
-var o = { a: 1 };
-console.log(function(k) {
+var o = { a: 1 }, f = function(k) {
 	if (o[k]) return 'PASS';
-}('a'));
+};
+console.log(f('a'));

```

## `uglify/hoist_vars/issue_2295`

- tags: `join vars`, `remove unused`
- size: oxc 48 vs reference 44 (no whitespaces: +4, formatted: +4)

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

## `uglify/hoist_vars/issue_5411_1`

- tags: `join vars`
- size: oxc 54 vs reference 50 (no whitespaces: +4, formatted: +5)

```js
var a = 'PASS';
b++;
b = a;
var b = b, c = c && c[b];
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a, b, c;
+var a = 'PASS';
 b++;
-b = a = 'PASS';
-c = c && c[b];
+b = a;
+var b = b, c = c && c[b];
 console.log(b);

```

## `uglify/hoist_vars/issue_5411_3`

- tags: `join vars`
- size: oxc 43 vs reference 39 (no whitespaces: +4, formatted: +4)

```js
var a = console;
a++;
var a = A = a;
console.log(A);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a;
-a = console;
-a = A = ++a;
+var a = console;
+a++;
+var a = A = a;
 console.log(A);

```

## `uglify/if_return/if_return_4`

- tags: `sequences`, `remove unused`
- size: oxc 54 vs reference 50 (no whitespaces: +4, formatted: +2)

```js
function f(x, y) {
	a();
	if (x) return 3;
	b();
	if (y) return c();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f(x, y) {
-	return a(), x ? 3 : (b(), y ? c() : void 0);
+	if (a(), x) return 3;
+	if (b(), y) return c();
 }

```

## `uglify/if_return/issue_1437_conditionals`

- tags: `sequences`
- size: oxc 57 vs reference 53 (no whitespaces: +4, formatted: +3)

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
-	return a() ? b() : c() ? d() : (e(), f(), void 0);
+	if (a()) return b();
+	if (c()) return d();
+	e(), f();
 }

```

## `uglify/if_return/issue_4374`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 77 vs reference 73 (no whitespaces: +4, formatted: +2)

```js
(function() {
	console.log(f(console));
	function f(a) {
		if (console) return 0;
		if (a) return 1;
		return 0;
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 (function() {
-	console.log(function(a) {
-		return !console && a ? 1 : 0;
-	}(console));
+	console.log(f(console));
+	function f(a) {
+		return console ? 0 : +!!a;
+	}
 })();

```

## `uglify/if_return/issue_512`

- tags: `sequences`
- size: oxc 37 vs reference 33 (no whitespaces: +4, formatted: +4)

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
@@ -1,4 +1,4 @@
 function a() {
-	if (!b()) throw e;
-	c();
+	if (b()) c();
+	else throw e;
 }

```

## `uglify/if_return/issue_866_2`

- tags: `sequences`
- size: oxc 44 vs reference 40 (no whitespaces: +4, formatted: +4)

```js
(function() {
	if (a) if (b) c;
	else return d;
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 (function() {
 	if (a) {
-		if (!b) return d;
-		c;
+		if (b) c;
+		else return d;
 	}
 })();

```

## `uglify/issue-1105/assorted_Infinity_NaN_undefined_in_with_scope`

- tags: `join vars`, `remove unused`
- size: oxc 221 vs reference 217 (no whitespaces: +4, formatted: -10)

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
@@ -6,14 +6,14 @@
 if (o) {
 	f(void 0, void 0);
 	f(NaN, NaN);
-	f(1 / 0, 1 / 0);
-	f(-1 / 0, -1 / 0);
+	f(Infinity, 1 / 0);
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

## `uglify/issue-1447/conditional_false_stray_else_in_loop`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 50 (no whitespaces: +4, formatted: +10)

```js
for (var i = 1; i <= 4; ++i) {
	if (i <= 2) continue;
	console.log(i);
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-for (var i = 1; i <= 4; ++i) if (i <= 2);
-else console.log(i);
+for (var i = 1; i <= 4; ++i) {
+	if (i <= 2) continue;
+	console.log(i);
+}

```

## `uglify/issue-1609/chained_evaluation_2`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 72 (no whitespaces: +4, formatted: +7)

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
@@ -1,6 +1,6 @@
 (function() {
 	(function() {
-		var b = 'long piece of string';
-		f(b).bar = b;
+		var b = 'long piece of string', c = f(b);
+		c.bar = b;
 	})();
 })();

```

## `uglify/issue-1833/iife_for`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 47 (no whitespaces: +4, formatted: +7)

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
-!function() {
-	!function() {
+function f() {
+	function g() {
 		L: for (;;) break L;
-	}();
-}();
+	}
+	g();
+}
+f();

```

## `uglify/issue-1833/iife_for_in`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 55 (no whitespaces: +4, formatted: +7)

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
-!function() {
-	!function() {
+function f() {
+	function g() {
 		L: for (var a in x) break L;
-	}();
-}();
+	}
+	g();
+}
+f();

```

## `uglify/issue-5614/reassign_1`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 50 (no whitespaces: +4, formatted: +7)

```js
var a = 'PASS', b = 'FAIL';
(b = a).toString();
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var b = 'FAIL';
-(b = 'PASS').toString();
+var a = 'PASS', b = 'FAIL';
+(b = a).toString();
 console.log(b);

```

## `uglify/join_vars/loop_body_1`

- tags: `join vars`
- size: oxc 20 vs reference 16 (no whitespaces: +4, formatted: +5)

```js
var a;
for (; x;) var b;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-for (var a, b; x;);
+var a;
+for (; x;) var b;

```

## `uglify/keep_fargs/chained_3`

- tags: `join vars`, `remove unused`
- size: oxc 58 vs reference 54 (no whitespaces: +4, formatted: +6)

```js
console.log(function(a, b) {
	var c = a, c = b;
	b++;
	return c;
}(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-console.log(function(b) {
-	var c = 1, c = b;
+console.log(function(a, b) {
+	var c = a, c = b;
 	b++;
 	return c;
-}(2));
+}(1, 2));

```

## `uglify/keep_fargs/duplicate_lambda_defun_name_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 58 vs reference 54 (no whitespaces: +4, formatted: +6)

```js
console.log(function f(a) {
	function f() {}
	return f.length;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log(function() {
-	return function() {}.length;
+console.log(function(a) {
+	function f() {}
+	return f.length;
 }());

```

## `uglify/keep_fargs/issue_1583`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 93 vs reference 89 (no whitespaces: +4, formatted: +2)

```js
function m(t) {
	(function(e) {
		t = e();
	})(function() {
		return (function(a) {
			return a;
		})(function(a) {});
	});
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 function m(t) {
-	(function() {
-		(function() {
-			return (function() {
-				return function(a) {};
-			})();
-		})();
-	})();
+	(function(e) {
+		t = e();
+	})(function() {
+		return (function(a) {
+			return a;
+		})(function(a) {});
+	});
 }

```

## `uglify/keep_fargs/issue_1595_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 32 vs reference 28 (no whitespaces: +4, formatted: +6)

```js
(function f(a) {
	return g(a + 1);
})(2);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function() {
-	return g(3);
-})();
+(function(a) {
+	return g(a + 1);
+})(2);

```

## `uglify/let/issue_5950`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 59 vs reference 55 (no whitespaces: +4, formatted: -3)

```js
'use strict';
{
	let a;
	if (console.log('PASS')) {
		var b = function() {
			a;
		}, c = b;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,2 @@
 'use strict';
-{
-	let a;
-	console.log('PASS') && function() {
-		a;
-	};
-}
+if (console.log('PASS')) var b = function() {}, c = b;

```

## `uglify/let/keep_let_var_2`

- tags: `join vars`
- size: oxc 114 vs reference 110 (no whitespaces: +4, formatted: +4)

```js
'use strict';
let a = 'foo';
var b = 'bar';
for (let c of [a, b]) console.log(c);
function f() {
	return b;
}
console.log(f(f));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'use strict';
 let a = 'foo';
 var b = 'bar';
-for (let c of [a, b]) console.log(c);
+for (let c of ['foo', b]) console.log(c);
 function f() {
 	return b;
 }

```

## `uglify/let/retain_tail_1`

- tags: `sequences`
- size: oxc 159 vs reference 155 (no whitespaces: +4, formatted: +6)

```js
'use strict';
function f(a) {
	var b = 'foo';
	if (a) {
		let b = 'bar';
		while (console.log('baz'));
		console.log(b);
	} else {
		while (console.log('moo'));
		console.log(b);
	}
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -3,12 +3,11 @@
 	var b = 'foo';
 	if (a) {
 		let b = 'bar';
-		while (console.log('baz'));
-		console.log(b);
+		for (; console.log('baz'););
+		console.log('bar');
 	} else {
-		while (console.log('moo'));
+		for (; console.log('moo'););
 		console.log(b);
 	}
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/let/retain_tail_2`

- tags: `sequences`
- size: oxc 159 vs reference 155 (no whitespaces: +4, formatted: +6)

```js
'use strict';
function f(a) {
	var b = 'foo';
	if (a) {
		while (console.log('bar'));
		console.log(b);
	} else {
		let b = 'baz';
		while (console.log('moo'));
		console.log(b);
	}
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -2,13 +2,12 @@
 function f(a) {
 	var b = 'foo';
 	if (a) {
-		while (console.log('bar'));
+		for (; console.log('bar'););
 		console.log(b);
 	} else {
 		let b = 'baz';
-		while (console.log('moo'));
-		console.log(b);
+		for (; console.log('moo'););
+		console.log('baz');
 	}
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/loops/issue_2904`

- tags: `join vars`
- size: oxc 37 vs reference 33 (no whitespaces: +4, formatted: +5)

```js
var a = 1;
do {
	console.log(a);
} while (--a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (var a = 1; console.log(a), --a;);
+var a = 1;
+do
+	console.log(a);
+while (--a);

```

## `uglify/loops/issue_4082`

- tags: `remove unused`
- size: oxc 65 vs reference 61 (no whitespaces: +4, formatted: +6)

```js
var a = 'PASS';
(function(a) {
	for (a in 'foo') var b;
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 'PASS';
 (function(a) {
-	for (a in 'foo');
+	for (a in 'foo') var b;
 })();
 console.log(a);

```

## `uglify/merge_vars/init_scope_vars`

- tags: `join vars`
- size: oxc 26 vs reference 22 (no whitespaces: +4, formatted: +3)

```js
Function.prototype.call();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(function() {}).call();
+Function.prototype.call();

```

## `uglify/merge_vars/issue_5770_1`

- tags: `join vars`
- size: oxc 97 vs reference 93 (no whitespaces: +4, formatted: -3)

```js
L: do {
	if (console) for (var a = 'FAIL 1'; a; a--) continue L;
	var b = 'FAIL 2';
} while (console.log(b || 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,4 @@
 L: do {
-	if (console) {
-		var a = 'FAIL 1';
-		if (a) continue L;
-	}
+	if (console) for (var a = 'FAIL 1'; a; a--) continue L;
 	var b = 'FAIL 2';
 } while (console.log(b || 'PASS'));

```

## `uglify/numbers/NaN_redefined`

- size: oxc 29 vs reference 25 (no whitespaces: +4, formatted: +6)

```js
var NaN;
console.log(1 / (0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var NaN;
-console.log(0 / 0);
+console.log(1 / (0 / 0));

```

## `uglify/numbers/evaluate_3`

- size: oxc 27 vs reference 23 (no whitespaces: +4, formatted: +4)

```js
console.log(1 + Number(x) + 2);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(+('' + x) + 3);
+console.log(1 + Number(x) + 2);

```

## `uglify/numbers/identity_1`

- size: oxc 32 vs reference 28 (no whitespaces: +4, formatted: +12)

```js
0 + a;
a + 0;
0 - a;
a - 0;
1 * a;
a * 1;
1 / a;
a / 1;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 0 + a;
 a + 0;
 0 - a;
-+a;
-+a;
-+a;
+a - 0;
+1 * a;
+a * 1;
 1 / a;
-+a;
+a / 1;

```

## `uglify/numbers/issue_3539`

- size: oxc 39 vs reference 35 (no whitespaces: +4, formatted: +6)

```js
var a = -0 + -'';
console.log(0 / a, 1 / a, -1 / a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = -0;
+var a = -0 + -'';
 console.log(0 / a, 1 / a, -1 / a);

```

## `uglify/numbers/issue_3593`

- size: oxc 30 vs reference 26 (no whitespaces: +4, formatted: +6)

```js
console.log((0 === this) - 1 - '1');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((0 === this) - 2);
+console.log((this === 0) - 1 - '1');

```

## `uglify/objects/duplicate_key`

- size: oxc 55 vs reference 51 (no whitespaces: +4, formatted: +7)

```js
var o = {
	a: 1,
	b: 2,
	a: 3
};
for (var k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var o = {
-	a: 3,
-	b: 2
+	a: 1,
+	b: 2,
+	a: 3
 };
 for (var k in o) console.log(k, o[k]);

```

## `uglify/optional-chains/issue_5292_sub_pure_getters`

- tags: `pure getters`
- size: oxc 64 vs reference 60 (no whitespaces: +4, formatted: +5)

```js
var o = { get p() {
	console.log('foo');
} };
o?.[console.log('bar'), 'p'];

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var o = { get p() {
 	console.log('foo');
 } };
-o?.[console.log('bar')];
+o?.[console.log('bar'), 'p'];

```

## `uglify/properties/issue_5682_dot_2`

- size: oxc 64 vs reference 60 (no whitespaces: +4, formatted: +4)

```js
function f(a) {
	return a.foo;
}
var o = { foo: 'PASS' };
console.log(f(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f(o) {
-	return o.o;
+function f(a) {
+	return a.foo;
 }
-var o = { o: 'PASS' };
+var o = { foo: 'PASS' };
 console.log(f(o));

```

## `uglify/properties/issue_5682_in_2`

- size: oxc 77 vs reference 73 (no whitespaces: +4, formatted: +4)

```js
function f(a) {
	return 'foo' in a;
}
var o = { foo: 42 };
console.log(f(o) ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f(o) {
-	return 'o' in o;
+function f(a) {
+	return 'foo' in a;
 }
-var o = { o: 42 };
+var o = { foo: 42 };
 console.log(f(o) ? 'PASS' : 'FAIL');

```

## `uglify/properties/mangle_global_property_read`

- size: oxc 35 vs reference 31 (no whitespaces: +4, formatted: +4)

```js
foo = 'PASS';
console.log(global.foo);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-o = 'PASS';
-console.log(global.o);
+foo = 'PASS';
+console.log(global.foo);

```

## `uglify/properties/sub_properties`

- size: oxc 89 vs reference 85 (no whitespaces: +4, formatted: +4)

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

## `uglify/pure_getters/collapse_vars_2_strict`

- tags: `join vars`
- size: oxc 61 vs reference 57 (no whitespaces: +4, formatted: +6)

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

## `uglify/pure_getters/collapse_vars_2_true`

- tags: `join vars`, `pure getters`
- size: oxc 61 vs reference 57 (no whitespaces: +4, formatted: +6)

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

## `uglify/reduce_vars/defun_inline_2`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 72 (no whitespaces: +4, formatted: +8)

```js
function f() {
	function g(b) {
		return b;
	}
	function h() {
		return h();
	}
	return g(2) + h();
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 function f() {
-	return function(b) {
+	function g(b) {
 		return b;
-	}(2) + function h() {
+	}
+	function h() {
 		return h();
-	}();
+	}
+	return g(2) + h();
 }

```

## `uglify/reduce_vars/issue_2423_3`

- tags: `join vars`, `remove unused`
- size: oxc 56 vs reference 52 (no whitespaces: +4, formatted: +4)

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
-	console.log(function() {
-		return 1;
-	}());
-})();
+function c() {
+	return 1;
+}
+function p() {
+	console.log(c());
+}
+p();

```

## `uglify/reduce_vars/issue_3949_2`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 70 (no whitespaces: +4, formatted: +4)

```js
(function f(a) {
	var a = void (a = 0, g);
	function g() {
		console.log(typeof a);
	}
	g();
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function(a) {
-	a = void (a = 0, g);
+	var a = void (a = 0, g);
 	function g() {
 		console.log(typeof a);
 	}

```

## `uglify/reduce_vars/unsafe_evaluate_escaped`

- tags: `join vars`, `remove unused`
- size: oxc 216 vs reference 212 (no whitespaces: +4, formatted: +4)

```js
console.log(function() {
	var o = { p: 1 };
	console.log(o, o.p);
	return o.p;
}());
console.log(function() {
	var o = { p: 2 };
	console.log(o.p, o);
	return o.p;
}());
console.log(function() {
	var o = { p: 3 }, a = [o];
	console.log(a[0].p++);
	return o.p;
}());

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 console.log(function() {
 	var o = { p: 1 };
-	console.log(o, 1);
+	console.log(o, o.p);
 	return o.p;
 }());
 console.log(function() {
 	var o = { p: 2 };
-	console.log(2, o);
+	console.log(o.p, o);
 	return o.p;
 }());
 console.log(function() {

```

## `uglify/rests/issue_5089_1`

- tags: `remove unused`
- size: oxc 42 vs reference 38 (no whitespaces: +4, formatted: +6)

```js
var { p: [] = 42, ...o } = { p: [] };
console.log(o.p);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var { p: {}, ...o } = { p: 0 };
+var { p: [] = 42, ...o } = { p: [] };
 console.log(o.p);

```

## `uglify/sequences/cascade_assignment_in_return`

- tags: `join vars`, `remove unused`
- size: oxc 34 vs reference 30 (no whitespaces: +4, formatted: +7)

```js
function f(a, b) {
	return a = x(), b(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f(a, b) {
-	return b(x());
+	return a = x(), b(a);
 }

```

## `uglify/sequences/issue_3490_1`

- tags: `sequences`
- size: oxc 86 vs reference 82 (no whitespaces: +4, formatted: +7)

```js
var b = 42, c = 'FAIL';
if ({ 3: function() {
	var a;
	return (a && a.p) < this;
}() }) c = 'PASS';
if (b) while ('' == typeof d);
console.log(c, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var b = 42, c = 'FAIL';
-var a;
-if (a && a.p, c = 'PASS', b) while ('' == typeof d);
-console.log(c, b);
+(function() {
+	var a;
+	return (a && a.p) < this;
+})(), c = 'PASS', console.log(c, b);

```

## `uglify/side_effects/issue_5860_drop_1`

- tags: `join vars`
- size: oxc 43 vs reference 39 (no whitespaces: +4, formatted: +5)

```js
var a = {};
a.p;
var a;
a.q;
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = {};
 a.p;
 var a;
+a.q;
 console.log('PASS');

```

## `uglify/side_effects/issue_5860_drop_2`

- tags: `join vars`
- size: oxc 39 vs reference 35 (no whitespaces: +4, formatted: +5)

```js
a = {};
a.p;
var a;
a.q;
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 a = {};
 a.p;
 var a;
+a.q;
 console.log('PASS');

```

## `uglify/side_effects/unsafe_builtin_3`

- tags: `sequences`
- size: oxc 83 vs reference 79 (no whitespaces: +4, formatted: +6)

```js
var o = {};
if (42 < Math.random()) o.p = 'FAIL';
else o.p = 'PASS';
for (var k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 var o = {};
-o.p = 42 < Math.random() ? 'FAIL' : 'PASS';
-for (var k in o) console.log(k, o[k]);
+for (var k in 42 < Math.random() ? o.p = 'FAIL' : o.p = 'PASS', o) console.log(k, o[k]);

```

## `uglify/templates/issue_5125_5`

- size: oxc 35 vs reference 31 (no whitespaces: +4, formatted: +2)

```js
console.log(`PASS\n\n${typeof A}`);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-console.log(`PASS
-
-` + typeof A);
+console.log(`PASS\n\n${typeof A}`);

```

## `uglify/varify/issue_4191_let`

- tags: `join vars`, `remove unused`
- size: oxc 58 vs reference 54 (no whitespaces: +4, formatted: +5)

```js
'use strict';
let a = function() {};
console.log(typeof a, a());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 'use strict';
-function a() {}
-;
+let a = function() {};
 console.log(typeof a, a());

```

## `uglify/varify/reduce_merge_let`

- tags: `join vars`, `remove unused`
- size: oxc 79 vs reference 75 (no whitespaces: +4, formatted: +4)

```js
'use strict';
let a = console;
console.log(typeof a);
var b = typeof a;
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'use strict';
-var a = console;
+let a = console;
 console.log(typeof a);
-a = typeof a;
-console.log(a);
+var b = typeof a;
+console.log(b);

```

## `uglify/arguments/replace_index_drop_fargs_2`

- tags: `join vars`
- size: oxc 170 vs reference 165 (no whitespaces: +5, formatted: +4)

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

## `uglify/arrows/issue_4772`

- size: oxc 39 vs reference 34 (no whitespaces: +5, formatted: +5)

```js
var f = (a) => a;
/**/ console.log(f('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var f = (a) => a;
-console.log(f('PASS'));
+/**/ console.log(f('PASS'));

```

## `uglify/awaits/await_void_1`

- size: oxc 125 vs reference 120 (no whitespaces: +5, formatted: +5)

```js
var a = 'PASS';
function f() {
	return { then: function(r) {
		a = 'FAIL';
		r();
	} };
}
(async function() {
	await void f();
	while (console.log(a));
})();

```

```diff
--- reference
+++ oxc
@@ -6,6 +6,6 @@
 	} };
 }
 (async function() {
-	await !f();
-	while (console.log(a));
+	await void f();
+	for (; console.log(a););
 })();

```

## `uglify/awaits/issue_4598`

- tags: `sequences`
- size: oxc 45 vs reference 40 (no whitespaces: +5, formatted: +9)

```js
if (console.log('PASS')) {
	async function f() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-async function f() {}
-console.log('PASS');
+if (console.log('PASS')) {
+	async function f() {}
+}

```

## `uglify/awaits/issue_5305_2`

- size: oxc 133 vs reference 128 (no whitespaces: +5, formatted: +10)

```js
var a = 'PASS';
(async function() {
	try {
		throw null;
	} catch (e) {
		return await function() {
			while (!console);
		}();
	} finally {
		a = 'FAIL';
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,10 @@
 (async function() {
 	try {
 		throw null;
-	} catch (e) {
-		while (!console);
-		return await void 0;
+	} catch {
+		return await function() {
+			for (; !console;);
+		}();
 	} finally {
 		a = 'FAIL';
 	}

```

## `uglify/awaits/issue_5478`

- size: oxc 107 vs reference 102 (no whitespaces: +5, formatted: +4)

```js
A = { get then() {
	a = 'FAIL';
} };
var a = 'PASS';
(async function() {
	for (var b in 'foo') return void A;
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 } };
 var a = 'PASS';
 (async function() {
-	for (var b in 'foo') return !A;
+	for (var b in 'foo') return void A;
 })();
 console.log(a);

```

## `uglify/booleans/de_morgan_1e`

- size: oxc 65 vs reference 60 (no whitespaces: +5, formatted: +7)

```js
function f(a) {
	return a.p || a.p;
}
console.log(f({ p: null }), f({ p: 42 }));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	return a.p;
+	return a.p || a.p;
 }
 console.log(f({ p: null }), f({ p: 42 }));

```

## `uglify/booleans/de_morgan_3b`

- size: oxc 156 vs reference 151 (no whitespaces: +5, formatted: +7)

```js
function f(a, b, c) {
	return a || (a || b) && c;
}
console.log(f(null, false), f(null, false, {}), f(null, true), f(null, true, {}));
console.log(f(42, false), f(42, false, {}), f(42, true), f(42, true, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b, c) {
-	return a || b && c;
+	return a || (a || b) && c;
 }
 console.log(f(null, !1), f(null, !1, {}), f(null, !0), f(null, !0, {}));
 console.log(f(42, !1), f(42, !1, {}), f(42, !0), f(42, !0, {}));

```

## `uglify/collapse_vars/collapse_rhs_boolean_1`

- tags: `join vars`
- size: oxc 81 vs reference 76 (no whitespaces: +5, formatted: +10)

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
@@ -1,6 +1,8 @@
 var a, b;
 function f() {
-	return b = a = !0;
+	a = !0;
+	b = !0;
+	return !0;
 }
 var c = f();
 console.log(a === b, b === c, c === a);

```

## `uglify/collapse_vars/collapse_vars_while`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 158 vs reference 153 (no whitespaces: +5, formatted: +6)

```js
function f1(y) {
	// Neither the non-constant while condition `c` will be
	// replaced, nor the non-constant `x` in the body.
	var x = y, c = 3 - y;
	while (c) {
		return x;
	}
	var z = y * y;
	return z;
}
function f2(y) {
	// The constant `x` will be replaced in the while body.
	var x = 7;
	while (y) {
		return x;
	}
	var z = y * y;
	return z;
}
function f3(y) {
	// The non-constant `n` will not be replaced in the while body.
	var n = 5 - y;
	while (y) {
		return n;
	}
	var z = y * y;
	return z;
}

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,12 @@
 function f1(y) {
-	var x = y, c = 3 - y;
-	while (c) return x;
+	for (var x = y, c = 3 - y; c;) return x;
 	return y * y;
 }
 function f2(y) {
-	while (y) return 7;
+	for (var x = 7; y;) return x;
 	return y * y;
 }
 function f3(y) {
-	var n = 5 - y;
-	while (y) return n;
+	for (var n = 5 - y; y;) return n;
 	return y * y;
 }

```

## `uglify/collapse_vars/iife_2`

- tags: `join vars`
- size: oxc 49 vs reference 44 (no whitespaces: +5, formatted: +7)

```js
var foo = bar();
!function(x) {
	console.log(x);
}(foo);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var foo;
-!function(x) {
+var foo = bar();
+(function(x) {
 	console.log(x);
-}(bar());
+})(foo);

```

## `uglify/conditionals/conditional_assignments_2`

- tags: `sequences`
- size: oxc 164 vs reference 159 (no whitespaces: +5, formatted: +6)

```js
function f1(b, c, d) {
	a = b;
	if (c) a = d;
	return a;
}
function f2(a, c, d) {
	a = b;
	if (c) a = d;
	return a;
}
function f3(a, b, d) {
	a = b;
	if (c) a = d;
	return a;
}
function f4(a, b, c) {
	a = b;
	if (c) a = d;
	return a;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f1(b, c, d) {
-	return a = c ? d : b, a;
+	return a = b, c && (a = d), a;
 }
 function f2(a, c, d) {
 	return a = b, c && (a = d), a;

```

## `uglify/conditionals/issue_5673_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 65 vs reference 60 (no whitespaces: +5, formatted: +8)

```js
var a = 'PASS';
console.log(function(b) {
	return (b = a) ? b : (b = a) && b;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var a = 'PASS';
 console.log(function(b) {
-	return a || (b = a) && b;
+	return ((b = a) || (b = a)) && b;
 }());

```

## `uglify/dead-code/trim_finally_2`

- size: oxc 45 vs reference 40 (no whitespaces: +5, formatted: +8)

```js
try {
	console.log('PASS');
} catch (e) {} finally {
	var a;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 try {
 	console.log('PASS');
+} catch {} finally {
 	var a;
-} catch (e) {}
+}

```

## `uglify/destructured/issue_5074_getter`

- tags: `remove unused`
- size: oxc 41 vs reference 36 (no whitespaces: +5, formatted: +6)

```js
({} = { get [(console.log('PASS'), 42)]() {} });

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-({} = { [(console.log('PASS'), 42)]: 0 });
+({} = { get [(console.log('PASS'), 42)]() {} });

```

## `uglify/drop-unused/chained_3`

- tags: `join vars`, `remove unused`
- size: oxc 58 vs reference 53 (no whitespaces: +5, formatted: +8)

```js
console.log(function(a, b) {
	var c = a, c = b;
	b++;
	return c;
}(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(function(a, b) {
-	var c = b;
-	+b;
+	var c = a, c = b;
+	b++;
 	return c;
-}(0, 2));
+}(1, 2));

```

## `uglify/drop-unused/issue_4146`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 72 (no whitespaces: +5, formatted: +4)

```js
function f(a, b) {
	function g() {}
	var a = g;
	var c = b;
	c.p;
	console.log(typeof a);
}
f('FAIL', 42);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-(function(a, b) {
-	a = function() {};
-	var c = b;
-	c.p;
+function f(a, b) {
+	function g() {}
+	var a = g;
+	b.p;
 	console.log(typeof a);
-})(0, 42);
+}
+f('FAIL', 42);

```

## `uglify/evaluate/Infinity_NaN_undefined_LHS`

- size: oxc 116 vs reference 111 (no whitespaces: +5, formatted: +3)

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
@@ -1,5 +1,5 @@
 function f() {
-	Infinity = 1 / 0;
+	Infinity = Infinity;
 	++Infinity;
 	Infinity--;
 	NaN *= NaN;

```

## `uglify/evaluate/issue_4035`

- tags: `join vars`
- size: oxc 159 vs reference 154 (no whitespaces: +5, formatted: +5)

```js
var a = 0;
(function() {
	var b = --a;
	console.log(delete (0 + b));
	console.log(delete (1 * b));
	console.log(delete (b + 0));
	console.log(delete (b - 0));
	console.log(delete (b / 1));
})();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var a = 0;
 (function() {
 	var b = --a;
-	console.log((0 + b, true));
-	console.log((1 * b, true));
-	console.log((0 + b, true));
-	console.log((b - 0, true));
-	console.log((b / 1, true));
+	console.log(delete (0 + b));
+	console.log(delete (1 * b));
+	console.log(delete (b + 0));
+	console.log(delete (b - 0));
+	console.log(delete (b / 1));
 })();

```

## `uglify/functions/functions_cross_scope_reference`

- tags: `join vars`, `remove unused`
- size: oxc 98 vs reference 93 (no whitespaces: +5, formatted: +8)

```js
log = function(fn) {
	console.log(typeof fn());
};
var a = function() {};
function f() {
	return a;
}
while (log(f));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 log = function(fn) {
 	console.log(typeof fn());
 };
-function a() {}
+var a = function() {};
 function f() {
 	return a;
 }
-while (log(f));
+for (; log(f););

```

## `uglify/functions/issue_5254_2`

- tags: `remove unused`
- size: oxc 98 vs reference 93 (no whitespaces: +5, formatted: +4)

```js
(function(a) {
	while (a--) (function f() {
		var f = new function() {
			console.log(f);
		}();
		while (!console);
	})();
})(2);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 (function(a) {
-	while (a--) {
-		f = void 0;
+	for (; a--;) (function() {
 		var f = new function() {
 			console.log(f);
 		}();
-		while (!console);
-	}
+		for (; !console;);
+	})();
 })(2);

```

## `uglify/functions/issue_5296`

- size: oxc 146 vs reference 141 (no whitespaces: +5, formatted: +8)

```js
var a = 'PASS';
(function() {
	for (var i = 0; i < 2; i++) try {
		return function() {
			while (!console);
			var b = b && (a = b) || 'FAIL';
		}();
	} finally {
		continue;
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 var a = 'PASS';
 (function() {
 	for (var i = 0; i < 2; i++) try {
-		b = void 0;
-		while (!console);
-		var b = b && (a = b) || 'FAIL';
-		return;
+		return function() {
+			for (; !console;);
+			var b = b && (a = b) || 'FAIL';
+		}();
 	} finally {
 		continue;
 	}

```

## `uglify/hoist_props/issue_3440`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 69 (no whitespaces: +5, formatted: +10)

```js
(function() {
	function f() {
		console.log(o.p);
	}
	var o = { p: 'PASS' };
	return f;
})()();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 (function() {
-	var o_p = 'PASS';
-	return function() {
-		console.log(o_p);
-	};
+	function f() {
+		console.log(o.p);
+	}
+	var o = { p: 'PASS' };
+	return f;
 })()();

```

## `uglify/hoist_vars/issue_5884_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 84 vs reference 79 (no whitespaces: +5, formatted: +12)

```js
try {
	var f = function() {
		var a = ['PASS'];
		for (b in a) console.log(a[b]);
	};
	f();
} finally {
	var b;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
-var b;
 try {
-	(function() {
+	var f = function() {
 		var a = ['PASS'];
 		for (b in a) console.log(a[b]);
-	})();
-} finally {}
+	};
+	f();
+} finally {
+	var b;
+}

```

## `uglify/imports/mangle_export_import`

- size: oxc 39 vs reference 34 (no whitespaces: +5, formatted: +5)

```js
export let o = A;
import { p as A } from 'foo';

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export let o = p;
-import { p } from 'foo';
+export let o = A;
+import { p as A } from 'foo';

```

## `uglify/imports/mangle_import_export`

- size: oxc 39 vs reference 34 (no whitespaces: +5, formatted: +5)

```js
import { p as A } from 'foo';
export let o = A;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-import { p } from 'foo';
-export let o = p;
+import { p as A } from 'foo';
+export let o = A;

```

## `uglify/issue-1052/defun_if_return`

- size: oxc 78 vs reference 73 (no whitespaces: +5, formatted: +6)

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
@@ -1,6 +1,6 @@
 function e() {
 	function f() {}
-	if (!window);
-	else function g() {}
+	if (window) function g() {}
+	else return;
 	function h() {}
 }

```

## `uglify/issue-1105/Infinity_not_in_with_scope`

- tags: `remove unused`
- size: oxc 91 vs reference 86 (no whitespaces: +5, formatted: +3)

```js
var o = { Infinity: 'FAIL' };
var vInfinity = 'Infinity';
vInfinity = Infinity;
console.log(vInfinity);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var o = { Infinity: 'FAIL' };
 var vInfinity = 'Infinity';
-vInfinity = 1 / 0;
+vInfinity = Infinity;
 console.log(vInfinity);

```

## `uglify/issue-976/eval_unused`

- tags: `remove unused`
- size: oxc 229 vs reference 224 (no whitespaces: +5, formatted: +9)

```js
function o(k) {
	return { c: 14 }[k];
}
console.log(function f1(a, eval, c, d, e) {
	return a('c') + eval;
}(o, 28, true));
console.log(function f2(a, b, c, d, e) {
	return a + eval('c');
}(14, true, 28));
console.log(function f3(a, eval, c, d, e) {
	return a + eval('c');
}(28, o, true));

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 function o(k) {
 	return { c: 14 }[k];
 }
-console.log(function(a, eval) {
+console.log(function(a, eval, c, d, e) {
 	return a('c') + eval;
-}(o, 28));
+}(o, 28, !0));
 console.log(function f2(a, b, c, d, e) {
 	return a + eval('c');
-}(14, true, 28));
+}(14, !0, 28));
 console.log(function f3(a, eval, c, d, e) {
 	return a + eval('c');
-}(28, o, true));
+}(28, o, !0));

```

## `uglify/issue-979/test_negated_is_best`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 178 vs reference 173 (no whitespaces: +5, formatted: +5)

```js
function f3() {
	if (a == 1 | b == 2) foo();
}
function f4() {
	if (!(a == 1 | b == 2));
	else foo();
}
function f5() {
	if (a == 1 && b == 2) foo();
}
function f6() {
	if (!(a == 1 && b == 2));
	else foo();
}
function f7() {
	if (a == 1 || b == 2) foo();
	else return bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,16 @@
 function f3() {
-	1 == a | 2 == b && foo();
+	a == 1 | b == 2 && foo();
 }
 function f4() {
-	1 == a | 2 == b && foo();
+	a == 1 | b == 2 && foo();
 }
 function f5() {
-	1 == a && 2 == b && foo();
+	a == 1 && b == 2 && foo();
 }
 function f6() {
-	1 == a && 2 == b && foo();
+	a != 1 || b != 2 || foo();
 }
 function f7() {
-	if (1 != a && 2 != b) return bar();
-	foo();
+	if (a == 1 || b == 2) foo();
+	else return bar();
 }

```

## `uglify/join_vars/inlined_assignments`

- tags: `join vars`, `remove unused`
- size: oxc 39 vs reference 34 (no whitespaces: +5, formatted: +5)

```js
var a;
(a = {}).p = 'PASS';
console.log(a.p);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var a = { p: 'PASS' };
+var a;
+(a = {}).p = 'PASS';
 console.log(a.p);

```

## `uglify/join_vars/issue_3916_1`

- tags: `join vars`
- size: oxc 147 vs reference 142 (no whitespaces: +5, formatted: +4)

```js
var o = {};
o.p = 'PASS';
o.__proto__ = 42;
o.q = 'FAIL';
o.__proto__ = {
	p: 'FAIL',
	q: 'PASS'
};
o.__proto__ = 'foo';
console.log(typeof o.__proto__, o.p, delete o.q, o.q);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
-var o = {
-	p: 'PASS',
-	__proto__: 42
-};
+var o = {};
+o.p = 'PASS';
+o.__proto__ = 42;
 o.q = 'FAIL';
 o.__proto__ = {
 	p: 'FAIL',

```

## `uglify/join_vars/issue_3916_2`

- tags: `join vars`
- size: oxc 192 vs reference 187 (no whitespaces: +5, formatted: -9)

```js
var log = console.log, o = {};
o.p = 'FAIL 1';
o.__proto__ = {
	get p() {
		return 'FAIL 2';
	},
	set p(u) {
		log('FAIL 3');
	},
	set q(v) {
		log('PASS 1');
	},
	get q() {
		return 'PASS 3';
	}
};
o.p = 'PASS 2';
o.q = 'FAIL 4';
log(o.p);
log(o.q);

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,17 @@
-var log = console.log, o = {
-	p: 'FAIL 1',
-	__proto__: {
-		get p() {
-			return 'FAIL 2';
-		},
-		set p(u) {
-			log('FAIL 3');
-		},
-		set q(v) {
-			log('PASS 1');
-		},
-		get q() {
-			return 'PASS 3';
-		}
+var log = console.log, o = {};
+o.p = 'FAIL 1';
+o.__proto__ = {
+	get p() {
+		return 'FAIL 2';
+	},
+	set p(u) {
+		log('FAIL 3');
+	},
+	set q(v) {
+		log('PASS 1');
+	},
+	get q() {
+		return 'PASS 3';
 	}
 };
 o.p = 'PASS 2';

```

## `uglify/join_vars/join_array_assignments_2`

- tags: `join vars`
- size: oxc 90 vs reference 85 (no whitespaces: +5, formatted: +8)

```js
console.log(function() {
	var a = ['foo'];
	a[1] = 'bar';
	a[7] = 'baz';
	a[2] = 'moo';
	return a;
}().join());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 console.log(function() {
-	var a = ['foo', 'bar'];
+	var a = ['foo'];
+	a[1] = 'bar';
 	a[7] = 'baz';
 	a[2] = 'moo';
 	return a;

```

## `uglify/join_vars/join_array_assignments_3`

- tags: `join vars`
- size: oxc 89 vs reference 84 (no whitespaces: +5, formatted: +8)

```js
console.log(function() {
	var a = ['foo'];
	a[1] = 'bar';
	a.b = 'baz';
	a[2] = 'moo';
	return a;
}().join());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 console.log(function() {
-	var a = ['foo', 'bar'];
+	var a = ['foo'];
+	a[1] = 'bar';
 	a.b = 'baz';
 	a[2] = 'moo';
 	return a;

```

## `uglify/join_vars/join_object_assignments_forin`

- tags: `join vars`
- size: oxc 74 vs reference 69 (no whitespaces: +5, formatted: +4)

```js
console.log(function() {
	var o = {};
	for (var a in o.a = 'PASS', o) return o[a];
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log(function() {
-	var o = { a: 'PASS' }, a;
-	for (a in o) return o[a];
+	var o = {};
+	for (var a in o.a = 'PASS', o) return o[a];
 }());

```

## `uglify/join_vars/join_object_assignments_null_1`

- tags: `join vars`
- size: oxc 40 vs reference 35 (no whitespaces: +5, formatted: +5)

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

## `uglify/keep_fargs/iife_func_side_effects`

- tags: `join vars`, `remove unused`
- size: oxc 187 vs reference 182 (no whitespaces: +5, formatted: +9)

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
@@ -7,10 +7,11 @@
 function z() {
 	console.log('z');
 }
-(function(b) {
-	return function() {
+(function(a, b, c) {
+	function y() {
 		console.log('FAIL');
-	} + b();
-})((x(), function() {
+	}
+	return y + b();
+})(x(), function() {
 	return y();
-}), z());
+}, z());

```

## `uglify/keep_fargs/recursive_iife_1`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 54 (no whitespaces: +5, formatted: +5)

```js
console.log(function f(a, b) {
	return b || f('FAIL', 'PASS');
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function f(a, b) {
-	return b || f(0, 'PASS');
+	return b || f('FAIL', 'PASS');
 }());

```

## `uglify/keep_fargs/replace_index_strict`

- tags: `join vars`
- size: oxc 170 vs reference 165 (no whitespaces: +5, formatted: +4)

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

## `uglify/let/merge_vars_2`

- tags: `join vars`
- size: oxc 97 vs reference 92 (no whitespaces: +5, formatted: +10)

```js
'use strict';
var a = 0;
(function() {
	var b = function f() {
		let c = a && f;
		c.var += 0;
	}();
	console.log(b);
})(1 && --a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 'use strict';
 var a = 0;
-1 && --a, b = function f() {
-	let c = a && f;
-	c.var += 0;
-}(), void console.log(b);
-var b;
+(function() {
+	var b = function f() {
+		let c = a && f;
+		c.var += 0;
+	}();
+	console.log(b);
+})(--a);

```

## `uglify/let/reduce_lambda`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 72 (no whitespaces: +5, formatted: +10)

```js
'use strict';
let f = function() {
	console.log(a, b);
};
let a = 'foo', b = 42;
f();
b = 'bar';
f();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 'use strict';
-function f() {
-	console.log('foo', b);
-}
-let b = 42;
+let f = function() {
+	console.log(a, b);
+}, a = 'foo', b = 42;
 f();
 b = 'bar';
 f();

```

## `uglify/loops/issue_3371`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 61 (no whitespaces: +5, formatted: +7)

```js
(function() {
	var a = function() {
		console.log('PASS');
	};
	while (a());
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 (function() {
-	function a() {
+	var a = function() {
 		console.log('PASS');
-	}
+	};
 	for (; a(););
 })();

```

## `uglify/merge_vars/issue_4157_1`

- tags: `join vars`
- size: oxc 82 vs reference 77 (no whitespaces: +5, formatted: +4)

```js
(function() {
	try {
		for (var a = 'FAIL'; a; a++) return;
		var b = 0;
	} finally {
		console.log(b);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 (function() {
 	try {
-		var a = 'FAIL';
-		if (a) return;
+		for (var a = 'FAIL'; a; a++) return;
 		var b = 0;
 	} finally {
 		console.log(b);

```

## `uglify/merge_vars/issue_4157_2`

- tags: `join vars`
- size: oxc 98 vs reference 93 (no whitespaces: +5, formatted: +4)

```js
(function() {
	try {
		throw 'FAIL';
	} catch (e) {
		for (var a = e; a; a++) return;
		var b = 0;
	} finally {
		console.log(b);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,7 @@
 	try {
 		throw 'FAIL';
 	} catch (e) {
-		var a = e;
-		if (a) return;
+		for (var a = e; a; a++) return;
 		var b = 0;
 	} finally {
 		console.log(b);

```

## `uglify/nullish/de_morgan_2c`

- size: oxc 93 vs reference 88 (no whitespaces: +5, formatted: +7)

```js
function f(a, b) {
	return a ?? (a || b);
}
console.log(f(null), f(null, {}));
console.log(f(42), f(42, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b) {
-	return a ?? b;
+	return a ?? (a || b);
 }
 console.log(f(null), f(null, {}));
 console.log(f(42), f(42, {}));

```

## `uglify/numbers/evaluate_4`

- size: oxc 60 vs reference 55 (no whitespaces: +5, formatted: +4)

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

## `uglify/numbers/evaluate_5`

- tags: `join vars`
- size: oxc 158 vs reference 153 (no whitespaces: +5, formatted: +1)

```js
function f(num) {
	var a = '' + num;
	[
		+a + 2 + 3,
		+a + 2 - 3,
		+a - 2 + 3,
		+a - 2 - 3,
		2 + +a + 3,
		2 + +a - 3,
		2 - +a + 3,
		2 - +a - 3,
		2 + 3 + +a,
		2 + 3 - +a,
		2 - 3 + +a,
		2 - 3 - +a
	].forEach(function(n) {
		console.log(typeof n, n);
	});
}
f(1);

```

```diff
--- reference
+++ oxc
@@ -5,13 +5,13 @@
 		+a + 2 - 3,
 		a - 2 + 3,
 		a - 2 - 3,
-		+a + 2 + 3,
-		+a + 2 - 3,
+		2 + +a + 3,
+		2 + +a - 3,
 		2 - a + 3,
 		2 - a - 3,
-		+a + 5,
+		5 + +a,
 		5 - a,
-		+a - 1,
+		-1 + +a,
 		-1 - a
 	].forEach(function(n) {
 		console.log(typeof n, n);

```

## `uglify/optional-chains/trim_dot_call_3`

- size: oxc 45 vs reference 40 (no whitespaces: +5, formatted: +7)

```js
try {
	({ p: null })?.p();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
-	null();
-} catch (e) {
+	({ p: null }).p();
+} catch {
 	console.log('PASS');
 }

```

## `uglify/properties/issue_2256`

- size: oxc 51 vs reference 46 (no whitespaces: +5, formatted: +5)

```js
({ 'keep': 42 });
global.keep = global.change = 'PASS';
console.log(keep);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-global.keep = global.l = 'PASS';
+global.keep = global.change = 'PASS';
 console.log(keep);

```

## `uglify/pure_funcs/issue_3325_1`

- size: oxc 39 vs reference 34 (no whitespaces: +5, formatted: +6)

```js
function cb() {
	console.log('PASS');
}
cb();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function cb() {
 	console.log('PASS');
 }
+cb();

```

## `uglify/pure_getters/set_mutable_2`

- tags: `join vars`, `sequences`
- size: oxc 74 vs reference 69 (no whitespaces: +5, formatted: +6)

```js
!function a() {
	a.foo += '';
	if (a.foo) console.log('PASS');
	else console.log('FAIL');
}();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function a() {
-	(a.foo += '') ? console.log('PASS') : console.log('FAIL');
-}();
+(function a() {
+	a.foo += '', a.foo ? console.log('PASS') : console.log('FAIL');
+})();

```

## `uglify/reduce_vars/defun_inline_1`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 72 (no whitespaces: +5, formatted: +8)

```js
function f() {
	return g(2) + h();
	function g(b) {
		return b;
	}
	function h() {
		return h();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 function f() {
-	return function(b) {
+	return g(2) + h();
+	function g(b) {
 		return b;
-	}(2) + function h() {
+	}
+	function h() {
 		return h();
-	}();
+	}
 }

```

## `uglify/reduce_vars/defun_label`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 74 vs reference 69 (no whitespaces: +5, formatted: +7)

```js
!function() {
	function f(a) {
		L: {
			if (a) break L;
			return 1;
		}
	}
	console.log(f(2));
}();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-!function() {
-	console.log(function(a) {
+(function() {
+	function f(a) {
 		L: {
-			if (2) break L;
+			if (a) break L;
 			return 1;
 		}
-	}());
-}();
+	}
+	console.log(f(2));
+})();

```

## `uglify/reduce_vars/inner_var_for_2`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 59 (no whitespaces: +5, formatted: +5)

```js
!function() {
	var a = 1;
	for (var b = 1; --b;) var a = 2;
	console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!function() {
+(function() {
 	var a = 1;
-	for (var b = 1; --b;) a = 2;
+	for (var b = 1; --b;) var a = 2;
 	console.log(a);
-}();
+})();

```

## `uglify/reduce_vars/local_declaration`

- tags: `join vars`
- size: oxc 31 vs reference 26 (no whitespaces: +5, formatted: +9)

```js
var a;
a || console.log(a = 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-console.log('PASS');
+a || console.log(a = 'PASS');

```

## `uglify/reduce_vars/redefine_arguments_2`

- tags: `join vars`, `remove unused`
- size: oxc 134 vs reference 129 (no whitespaces: +5, formatted: +10)

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
@@ -1,7 +1,11 @@
-console.log(function() {
+function f() {
 	var arguments;
 	return typeof arguments;
-}(), 'number', function(x) {
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

## `uglify/reduce_vars/redefine_arguments_3`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 134 vs reference 129 (no whitespaces: +5, formatted: +10)

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
@@ -1,7 +1,11 @@
-console.log(function() {
+function f() {
 	var arguments;
 	return typeof arguments;
-}(), 'number', function(x) {
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

## `uglify/reduce_vars/reduce_vars`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 218 vs reference 213 (no whitespaces: +5, formatted: +6)

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
@@ -1,15 +1,10 @@
 var A = 1;
-console.log(-3);
-console.log(A - 5);
-(function f1() {
+(function() {
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
-true, 'yes';
-console.log(A + 1);
+	console.log(a - 5), eval('console.log(a);');
+})(eval), console.log(A + 1);

```

## `uglify/rests/drop_rest_array`

- size: oxc 36 vs reference 31 (no whitespaces: +5, formatted: +6)

```js
var [ ...[a]] = ['PASS'];
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var [a] = ['PASS'];
+var [ ...[a]] = ['PASS'];
 console.log(a);

```

## `uglify/rests/drop_rest_lambda`

- tags: `join vars`
- size: oxc 57 vs reference 52 (no whitespaces: +5, formatted: +5)

```js
function f(...[a]) {
	return a;
}
console.log(f('PASS'), f(42));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function f(a) {
+function f(...[a]) {
 	return a;
 }
 console.log(f('PASS'), f(42));

```

## `uglify/rests/issue_4562`

- tags: `join vars`
- size: oxc 36 vs reference 31 (no whitespaces: +5, formatted: +6)

```js
console.log((([ ...[a]]) => a)('foo'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((([a]) => a)('foo'));
+console.log((([ ...[a]]) => a)('foo'));

```

## `uglify/rests/keep_rest_array`

- size: oxc 46 vs reference 41 (no whitespaces: +5, formatted: +6)

```js
var [ ...[ ...a]] = 'PASS';
console.log(a.join(''));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var [ ...a] = 'PASS';
+var [ ...[ ...a]] = 'PASS';
 console.log(a.join(''));

```

## `uglify/rests/keep_rest_arrow`

- tags: `join vars`
- size: oxc 47 vs reference 42 (no whitespaces: +5, formatted: +6)

```js
console.log(((...[ ...a]) => a.join(''))('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(((...a) => a.join(''))('PASS'));
+console.log(((...[ ...a]) => a.join(''))('PASS'));

```

## `uglify/rests/keep_rest_lambda_1`

- tags: `join vars`
- size: oxc 71 vs reference 66 (no whitespaces: +5, formatted: +6)

```js
function f(...[ ...a]) {
	return a.join('');
}
console.log(f('PASS'), f([42]));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function f(...a) {
+function f(...[ ...a]) {
 	return a.join('');
 }
 console.log(f('PASS'), f([42]));

```

## `uglify/sequences/delete_seq_5`

- tags: `sequences`
- size: oxc 202 vs reference 197 (no whitespaces: +5, formatted: +7)

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
-console.log(delete void f()), console.log(delete void f()), console.log(delete (f(), Infinity)), console.log((f(), delete (1 / 0))), console.log(delete (f(), NaN)), console.log((f(), delete (0 / 0)));
+console.log(delete (f(), undefined)), console.log(delete (f(), void 0)), console.log(delete (f(), Infinity)), console.log(delete (f(), 1 / 0)), console.log(delete (f(), NaN)), console.log(delete (f(), NaN));

```

## `uglify/spreads/issue_4849`

- tags: `join vars`, `remove unused`
- size: oxc 94 vs reference 89 (no whitespaces: +5, formatted: +7)

```js
while (function() {
	while (!console);
}(new function(a) {
	console.log(typeof { ...a });
}(function() {})));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-while (function() {
-	while (!console);
-}(function(a) {
-	console.log(typeof { ...function() {} });
-}()));
+for (; function() {
+	for (; !console;);
+}(new function(a) {
+	console.log(typeof { ...a });
+}(function() {})););

```

## `uglify/switches/constant_switch_6`

- tags: `sequences`
- size: oxc 47 vs reference 42 (no whitespaces: +5, formatted: +4)

```js
OUT: {
	foo();
	switch (1) {
		case 1:
			x();
			if (foo) break OUT;
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
@@ -1,7 +1,4 @@
-OUT: {
-	foo();
-	x();
-	if (foo) break OUT;
-	y();
-	bar();
+OUT: if (foo(), 1) {
+	if (x(), foo) break OUT;
+	y(), bar();
 }

```

## `uglify/templates/side_effects_1`

- size: oxc 43 vs reference 38 (no whitespaces: +5, formatted: +5)

```js
`42`;
`${console.log('foo')}`;
console.log`\nbar`;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-console.log('foo');
+`${console.log('foo')}`;
 console.log`\nbar`;

```

## `uglify/yields/functions`

- tags: `join vars`, `remove unused`
- size: oxc 319 vs reference 314 (no whitespaces: +5, formatted: +5)

```js
!function* () {
	var a = function* a() {
		return a && 'a';
	};
	var b = function* x() {
		return !!x;
	};
	var c = function* (c) {
		return c;
	};
	if (yield* c(yield* b(yield* a()))) {
		var d = function* () {};
		var e = function* y() {
			return typeof y;
		};
		var f = function* (f) {
			return f;
		};
		console.log(yield* a(yield* d()), yield* b(yield* e()), yield* c(yield* f(42)), typeof d, yield* e(), typeof f);
	}
}().next();

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,17 @@
-!function* () {
-	function* a() {
+(function* () {
+	var a = function* a() {
 		return a && 'a';
-	}
-	function* b() {
-		return !!b;
-	}
-	function* c(c) {
+	}, b = function* x() {
+		return !!x;
+	}, c = function* (c) {
 		return c;
-	}
+	};
 	if (yield* c(yield* b(yield* a()))) {
-		var d = function* () {};
-		var e = function* y() {
+		var d = function* () {}, e = function* y() {
 			return typeof y;
-		};
-		var f = function* (f) {
+		}, f = function* (f) {
 			return f;
 		};
 		console.log(yield* a(yield* d()), yield* b(yield* e()), yield* c(yield* f(42)), typeof d, yield* e(), typeof f);
 	}
-}().next();
+})().next();

```

## `uglify/yields/functions_use_strict`

- tags: `join vars`, `remove unused`
- size: oxc 332 vs reference 327 (no whitespaces: +5, formatted: +5)

```js
'use strict';
!function* () {
	var a = function* a() {
		return a && 'a';
	};
	var b = function* x() {
		return !!x;
	};
	var c = function* (c) {
		return c;
	};
	if (yield* c(yield* b(yield* a()))) {
		var d = function* () {};
		var e = function* y() {
			return typeof y;
		};
		var f = function* (f) {
			return f;
		};
		console.log(yield* a(yield* d()), yield* b(yield* e()), yield* c(yield* f(42)), typeof d, yield* e(), typeof f);
	}
}().next();

```

```diff
--- reference
+++ oxc
@@ -1,22 +1,18 @@
 'use strict';
-!function* () {
-	function* a() {
+(function* () {
+	var a = function* a() {
 		return a && 'a';
-	}
-	function* b() {
-		return !!b;
-	}
-	function* c(c) {
+	}, b = function* x() {
+		return !!x;
+	}, c = function* (c) {
 		return c;
-	}
+	};
 	if (yield* c(yield* b(yield* a()))) {
-		var d = function* () {};
-		var e = function* y() {
+		var d = function* () {}, e = function* y() {
 			return typeof y;
-		};
-		var f = function* (f) {
+		}, f = function* (f) {
 			return f;
 		};
 		console.log(yield* a(yield* d()), yield* b(yield* e()), yield* c(yield* f(42)), typeof d, yield* e(), typeof f);
 	}
-}().next();
+})().next();

```

## `uglify/yields/issue_5385_3`

- size: oxc 132 vs reference 127 (no whitespaces: +5, formatted: +12)

```js
(async function* () {
	return function() {
		try {
			throw console.log('foo');
		} catch (e) {
			return console.log('bar');
		}
	}();
})().next();
console.log('moo');

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 (async function* () {
-	try {
-		throw console.log('foo');
-	} catch (e) {
-		return console.log('bar');
-	}
-	return void 0;
+	return function() {
+		try {
+			throw console.log('foo');
+		} catch {
+			return console.log('bar');
+		}
+	}();
 })().next();
 console.log('moo');

```

## `uglify/awaits/await_await`

- size: oxc 89 vs reference 83 (no whitespaces: +6, formatted: +6)

```js
(async function() {
	await await { then(resolve) {
		resolve({ then() {
			console.log('PASS');
		} });
	} };
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (async function() {
-	await { then(resolve) {
+	await await { then(resolve) {
 		resolve({ then() {
 			console.log('PASS');
 		} });

```

## `uglify/awaits/issue_4972_2`

- size: oxc 128 vs reference 122 (no whitespaces: +6, formatted: +6)

```js
console.log('foo');
(async function() {
	try {
		console.log('bar');
	} finally {
		return await 'baz';
	}
})().then(console.log);
console.log('moo');

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 	try {
 		console.log('bar');
 	} finally {
-		return 'baz';
+		return await 'baz';
 	}
 })().then(console.log);
 console.log('moo');

```

## `uglify/awaits/issue_4972_3`

- size: oxc 127 vs reference 121 (no whitespaces: +6, formatted: +6)

```js
console.log('foo');
try {
	(async function() {
		return await 'bar';
	})().then(console.log);
} finally {
	console.log('baz');
}
console.log('moo');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 console.log('foo');
 try {
 	(async function() {
-		return 'bar';
+		return await 'bar';
 	})().then(console.log);
 } finally {
 	console.log('baz');

```

## `uglify/awaits/issue_5023_2`

- tags: `join vars`
- size: oxc 52 vs reference 46 (no whitespaces: +6, formatted: +6)

```js
(async function() {
	let a;
	a = a;
})();
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-(function() {
+(async function() {
 	let a;
 	a = a;
 })();

```

## `uglify/booleans/de_morgan_2b`

- size: oxc 91 vs reference 85 (no whitespaces: +6, formatted: +10)

```js
function f(a, b) {
	return a || a && b;
}
console.log(f(null), f(null, {}));
console.log(f(42), f(42, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b) {
-	return a;
+	return a || a && b;
 }
 console.log(f(null), f(null, {}));
 console.log(f(42), f(42, {}));

```

## `uglify/booleans/de_morgan_3c`

- size: oxc 154 vs reference 148 (no whitespaces: +6, formatted: +10)

```js
function f(a, b, c) {
	return a || a && b || c;
}
console.log(f(null, false), f(null, false, {}), f(null, true), f(null, true, {}));
console.log(f(42, false), f(42, false, {}), f(42, true), f(42, true, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b, c) {
-	return a || c;
+	return a || a && b || c;
 }
 console.log(f(null, !1), f(null, !1, {}), f(null, !0), f(null, !0, {}));
 console.log(f(42, !1), f(42, !1, {}), f(42, !0), f(42, !0, {}));

```

## `uglify/booleans/issue_2737_2`

- tags: `join vars`, `remove unused`
- size: oxc 83 vs reference 77 (no whitespaces: +6, formatted: +6)

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
@@ -1,5 +1,5 @@
 (function(bar) {
 	for (; bar();) break;
-})(function() {
-	return console.log('PASS'), 1;
+})(function qux() {
+	return console.log('PASS'), qux;
 });

```

## `uglify/collapse_vars/assign_left`

- tags: `join vars`
- size: oxc 68 vs reference 62 (no whitespaces: +6, formatted: +9)

```js
console.log(function(a, b) {
	(b = a, b.p).q = 'PASS';
	return a.p.q;
}({ p: {} }));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log(function(a, b) {
-	a.p.q = 'PASS';
+	(b = a, b.p).q = 'PASS';
 	return a.p.q;
 }({ p: {} }));

```

## `uglify/collapse_vars/collapse_rhs_number`

- tags: `join vars`
- size: oxc 82 vs reference 76 (no whitespaces: +6, formatted: +10)

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
@@ -1,6 +1,8 @@
 var a, b;
 function f() {
-	return b = a = 42;
+	a = 42;
+	b = 42;
+	return 42;
 }
 var c = f();
 console.log(a === b, b === c, c === a);

```

## `uglify/collapse_vars/collapse_vars_arguments_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 64 vs reference 58 (no whitespaces: +6, formatted: +9)

```js
var outer = function() {
	// Do not replace `arguments` but do replace the constant `k` before it.
	var k = 7, arguments = 5, inner = function() {
		console.log(arguments);
	};
	inner(k, 1);
};
outer();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-(function() {
+var outer = function() {
 	(function() {
-		console.log(arguments);
+		console.log(5);
 	})(7, 1);
-})();
+};
+outer();

```

## `uglify/collapse_vars/issue_5309_2`

- tags: `join vars`
- size: oxc 68 vs reference 62 (no whitespaces: +6, formatted: +9)

```js
var a, b;
console ? (a = (console.log('PASS'), b), b = a) : console.log('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a, b;
-console ? (console.log('PASS'), b = b) : console.log('FAIL');
+console ? (a = (console.log('PASS'), b), b = a) : console.log('FAIL');

```

## `uglify/collapse_vars/substitution_unary`

- tags: `join vars`
- size: oxc 175 vs reference 169 (no whitespaces: +6, formatted: +12)

```js
function f1(a, b) {
	console.log(typeof (b = a), a, b);
}
function f2(a, b) {
	console.log(void (b = a), a, b);
}
function f3(a, b) {
	console.log(delete (b = a), a, b);
}
f1(42, 'foo');
f2(42, 'foo');
f3(42, 'foo');

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f1(a, b) {
-	console.log(typeof a, a, a);
+	console.log(typeof (b = a), a, b);
 }
 function f2(a, b) {
-	console.log(void a, a, a);
+	console.log(void (b = a), a, b);
 }
 function f3(a, b) {
 	console.log(delete (b = a), a, b);

```

## `uglify/collapse_vars/toplevel_single_reference`

- tags: `join vars`, `remove unused`
- size: oxc 35 vs reference 29 (no whitespaces: +6, formatted: +7)

```js
var a;
for (var b in x) {
	var a = b;
	b(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
+var a;
 for (var b in x) {
 	var a = b;
-	b(b);
+	b(a);
 }

```

## `uglify/collapse_vars/var_defs`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 69 vs reference 63 (no whitespaces: +6, formatted: +10)

```js
var f1 = function(x, y) {
	var a, b, r = x + y, q = r * r, z = q - r, a = z, b = 7;
	console.log(a + b);
};
f1('1', 0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var f1 = function(x, y) {
-	var r = x + y;
-	console.log(r * r - r + 7);
+	var a, r = x + y, a = r * r - r;
+	console.log(a + 7);
 };
 f1('1', 0);

```

## `uglify/const/do_if_continue_1`

- size: oxc 69 vs reference 63 (no whitespaces: +6, formatted: +7)

```js
do {
	if (console) {
		console.log('PASS');
		{
			const a = 0;
			var b;
			continue;
		}
	}
} while (b);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
-do {
+do
 	if (console) {
 		console.log('PASS');
 		{
-			const a = 0;
+			let a = 0;
 			var b;
+			continue;
 		}
 	}
-} while (b);
+while (b);

```

## `uglify/const/do_if_continue_2`

- size: oxc 67 vs reference 61 (no whitespaces: +6, formatted: +7)

```js
do {
	if (console) {
		console.log('PASS');
		{
			const a = 0;
			A = 0;
			continue;
		}
	}
} while (A);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
-do {
+do
 	if (console) {
 		console.log('PASS');
 		{
-			const a = 0;
+			let a = 0;
 			A = 0;
+			continue;
 		}
 	}
-} while (A);
+while (A);

```

## `uglify/const/issue_4225`

- size: oxc 49 vs reference 43 (no whitespaces: +6, formatted: +6)

```js
const a = void typeof b;
const b = 42;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-const a = void b;
+const a = void 0;
 const b = 42;
-console.log(a, b);
+console.log(void 0, 42);

```

## `uglify/const/issue_4691`

- tags: `sequences`
- size: oxc 166 vs reference 160 (no whitespaces: +6, formatted: -2)

```js
function A() {}
A.prototype.f = function() {
	if (!this) return;
	const a = 'PA';
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
@@ -1,14 +1,13 @@
 function A() {}
 A.prototype.f = function() {
-	if (this) {
-		const a = 'PA';
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

## `uglify/dead-code/return_assignment`

- tags: `remove unused`
- size: oxc 562 vs reference 556 (no whitespaces: +6, formatted: +13)

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

## `uglify/default-values/issue_5340_2`

- tags: `remove unused`
- size: oxc 54 vs reference 48 (no whitespaces: +6, formatted: +5)

```js
var a;
(function(b = 42) {})(({p: a} = true).q);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a;
-[[][0] = 0] = [({p: a} = true).q];
+(function(b = 42) {})(({p: a} = !0).q);
 console.log(a);

```

## `uglify/default-values/issue_5465`

- tags: `join vars`, `remove unused`
- size: oxc 92 vs reference 86 (no whitespaces: +6, formatted: +10)

```js
function f(a, b) {
	(function(c = b = 'FAIL 2') {
		this && console.log(b || 'PASS');
	})(42 - a && a);
}
f('FAIL 1');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-a = 'FAIL 1', void function(c = b = 'FAIL 2') {
-	this && console.log(b || 'PASS');
-}(42 - a && a);
-var a, b;
+function f(a, b) {
+	(function(c = b = 'FAIL 2') {
+		this && console.log(b || 'PASS');
+	})(42 - a && a);
+}
+f('FAIL 1');

```

## `uglify/destructured/issue_5074_setter`

- tags: `remove unused`
- size: oxc 42 vs reference 36 (no whitespaces: +6, formatted: +7)

```js
({} = { set [(console.log('PASS'), 42)](v) {} });

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-({} = { [(console.log('PASS'), 42)]: 0 });
+({} = { set [(console.log('PASS'), 42)](v) {} });

```

## `uglify/destructured/issue_5114_1`

- tags: `remove unused`
- size: oxc 51 vs reference 45 (no whitespaces: +6, formatted: +5)

```js
var a = 'PASS';
(function({}, a) {})(42);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 'PASS';
-[{}] = [42], void 0;
+(function({}, a) {})(42);
 console.log(a);

```

## `uglify/destructured/keep_key_2`

- tags: `remove unused`
- size: oxc 43 vs reference 37 (no whitespaces: +6, formatted: +9)

```js
var { 42: a } = { [(console.log('PASS'), 42)]() {} };

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var {} = { [(console.log('PASS'), 42)]: 0 };
+var { 42: a } = { [(console.log('PASS'), 42)]() {} };

```

## `uglify/destructured/maintain_position_assign`

- tags: `remove unused`
- size: oxc 32 vs reference 26 (no whitespaces: +6, formatted: +8)

```js
console.log(([,] = [, 'PASS'])[1]);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log([, 'PASS'][1]);
+console.log(([,] = [, 'PASS'])[1]);

```

## `uglify/drop-unused/drop_duplicated_side_effects`

- tags: `remove unused`
- size: oxc 54 vs reference 48 (no whitespaces: +6, formatted: +8)

```js
var a = 0;
for (var i = 1; i--;) var a = 0, b = ++a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 0;
-for (var i = 1; i--;) a = 0, ++a;
+for (var i = 1; i--;) var a = 0, b = ++a;
 console.log(a);

```

## `uglify/drop-unused/issue_2288`

- tags: `remove unused`
- size: oxc 65 vs reference 59 (no whitespaces: +6, formatted: +7)

```js
function foo(o) {
	for (var j = o.a, i = 0; i < 0; i++);
	for (var i = 0; i < 0; i++);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function foo(o) {
-	o.a;
+	for (var j = o.a, i = 0; i < 0; i++);
 	for (var i = 0; i < 0; i++);
-	for (i = 0; i < 0; i++);
 }

```

## `uglify/drop-unused/issue_3515_2`

- tags: `remove unused`
- size: oxc 68 vs reference 62 (no whitespaces: +6, formatted: +8)

```js
var a = 'FAIL';
function f() {
	typeof b === 'number';
	delete a;
}
var b = f(a = 'PASS');
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 function f() {
 	delete a;
 }
-f(a = 'PASS');
+var b = f(a = 'PASS');
 console.log(a);

```

## `uglify/drop-unused/issue_3962_1`

- tags: `join vars`, `remove unused`
- size: oxc 98 vs reference 92 (no whitespaces: +6, formatted: +16)

```js
var a = 0;
function f(b, c) {
	do {
		var d = console + e, e = 0 .toString() === b;
	} while (0);
	if (c) console.log('PASS');
}
var a = f(a--, 1);
a;

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var a = 0;
-(function(c) {
+function f(b, c) {
 	do {
-		console;
-		0 .toString();
+		console + e;
+		var e = b === '0';
 	} while (0);
-	if (c) console.log('PASS');
-})(1);
-void 0;
+	c && console.log('PASS');
+}
+var a = f(a--, 1);

```

## `uglify/drop-unused/issue_4806_1`

- tags: `join vars`, `remove unused`
- size: oxc 73 vs reference 67 (no whitespaces: +6, formatted: +8)

```js
O = { f: function() {
	console.log(this === O ? 'FAIL' : 'PASS');
} };
var a;
(a = 42, O.f)();
a;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 O = { f: function() {
 	console.log(this === O ? 'FAIL' : 'PASS');
 } };
-(0, O.f)();
-42;
+var a;
+(a = 42, O.f)();

```

## `uglify/drop-unused/unused_funarg_1`

- tags: `remove unused`
- size: oxc 52 vs reference 46 (no whitespaces: +6, formatted: +9)

```js
console.log(function f(a, b, c, d, e) {
	return a + b;
}(14, 28));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function(a, b) {
+console.log(function(a, b, c, d, e) {
 	return a + b;
 }(14, 28));

```

## `uglify/evaluate/unsafe_charAt_noop`

- size: oxc 77 vs reference 71 (no whitespaces: +6, formatted: -2)

```js
s = 'foo';
x = 42;
console.log(s.charAt(0), 'string'.charAt(x), (typeof x).charAt());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 s = 'foo';
 x = 42;
-console.log(s[0] || '', 'string'[0 | x] || '', (typeof x)[0] || '');
+console.log(s.charAt(0), 'string'.charAt(x), (typeof x).charAt());

```

## `uglify/evaluate/unsafe_object_nested`

- tags: `join vars`
- size: oxc 53 vs reference 47 (no whitespaces: +6, formatted: +8)

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

## `uglify/evaluate/void_side_effects`

- tags: `join vars`, `remove unused`
- size: oxc 46 vs reference 40 (no whitespaces: +6, formatted: +8)

```js
var a = void console.log('PASS');
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-console.log('PASS');
-console.log(void 0);
+var a = void console.log('PASS');
+console.log(a);

```

## `uglify/functions/duplicate_arg_var_3`

- size: oxc 57 vs reference 51 (no whitespaces: +6, formatted: +9)

```js
console.log(function(b) {
	return b + 'SS';
	var b;
}('PA', '42'.toString()));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-console.log((b = 'PA', '42'.toString(), b + 'SS'));
-var b;
+console.log(function(b) {
+	return b + 'SS';
+	var b;
+}('PA', '42'));

```

## `uglify/functions/functions_inner_var`

- tags: `join vars`, `remove unused`
- size: oxc 46 vs reference 40 (no whitespaces: +6, formatted: +8)

```js
var a = function() {
	var a;
	console.log(a, a);
};
a(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function a() {
+var a = function() {
 	var a;
 	console.log(a, a);
-}
-a();
+};
+a(a);

```

## `uglify/functions/inline_loop_9`

- size: oxc 99 vs reference 93 (no whitespaces: +6, formatted: +4)

```js
for (var a = 0; a < 2; a++) {
	(function() {
		var b = b && b[console.log('FAIL')] || 'PASS';
		while (console.log(b));
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-for (var a = 0; a < 2; a++) {
-	b = void 0;
+for (var a = 0; a < 2; a++) (function() {
 	var b = b && b[console.log('FAIL')] || 'PASS';
-	while (console.log(b));
-}
+	for (; console.log(b););
+})();

```

## `uglify/functions/issue_3679_3`

- tags: `join vars`, `remove unused`
- size: oxc 85 vs reference 79 (no whitespaces: +6, formatted: +8)

```js
(function() {
	var f = function() {};
	f.p = 'PASS';
	f.g = function() {
		console.log(f.p);
	};
	f.g();
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 (function() {
-	function f() {}
-	;
+	var f = function() {};
 	f.p = 'PASS';
-	(f.g = function() {
+	f.g = function() {
 		console.log(f.p);
-	})();
+	};
+	f.g();
 })();

```

## `uglify/functions/issue_5120`

- tags: `join vars`, `remove unused`
- size: oxc 98 vs reference 92 (no whitespaces: +6, formatted: +10)

```js
var a = function f() {
	function g() {
		f || g();
	}
	g();
	return f.valueOf();
};
console.log(a() === a ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
-function a() {
-	(function g() {
-		a || g();
-	})();
-	return a.valueOf();
-}
+var a = function f() {
+	function g() {
+		f || g();
+	}
+	g();
+	return f.valueOf();
+};
 console.log(a() === a ? 'PASS' : 'FAIL');

```

## `uglify/functions/issue_5851_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 60 vs reference 54 (no whitespaces: +6, formatted: +8)

```js
var a = f();
f();
function f() {
	if (console.log('foo')) console && f();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-f();
+var a = f();
 f();
 function f() {
 	console.log('foo') && console && f();

```

## `uglify/hoist_props/issue_5182`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 94 vs reference 88 (no whitespaces: +6, formatted: +9)

```js
var o = console;
log = o.log;
o = { p: function(a) {
	console.log(a ? 'PASS' : 'FAIL');
	return a;
} };
log(o.p(42));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var o = console;
 log = o.log;
-o = function(a) {
+o = { p: function(a) {
 	console.log(a ? 'PASS' : 'FAIL');
 	return a;
-};
-log(o(42));
+} };
+log(o.p(42));

```

## `uglify/hoist_vars/issue_4893_1`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 60 (no whitespaces: +6, formatted: +8)

```js
function f() {
	function g() {}
	var a = null;
	var b = null;
	var c = null;
	b.p += a = 42;
	f;
}
try {
	f();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
+function f() {
+	var b = null;
+	b.p += 42;
+}
 try {
-	(function() {
-		null.p += 42;
-	})();
-} catch (e) {
+	f();
+} catch {
 	console.log('PASS');
 }

```

## `uglify/hoist_vars/issue_4893_2`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 60 (no whitespaces: +6, formatted: +8)

```js
function f() {
	function g() {}
	var a = null;
	var b = null;
	var c = null;
	b.p += a = 42;
	f;
}
try {
	f();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
+function f() {
+	var b = null;
+	b.p += 42;
+}
 try {
-	(function() {
-		null.p += 42;
-	})();
-} catch (e) {
+	f();
+} catch {
 	console.log('PASS');
 }

```

## `uglify/hoist_vars/issue_5411_4`

- tags: `join vars`, `remove unused`
- size: oxc 43 vs reference 37 (no whitespaces: +6, formatted: +7)

```js
var a = console;
a++;
var a = A = a;
console.log(A);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var a = console;
-a = A = ++a;
+a++;
+var a = A = a;
 console.log(A);

```

## `uglify/if_return/if_return_2`

- tags: `sequences`, `remove unused`
- size: oxc 46 vs reference 40 (no whitespaces: +6, formatted: +4)

```js
function f(x, y) {
	if (x) return 3;
	if (y) return c();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f(x, y) {
-	return x ? 3 : y ? c() : void 0;
+	if (x) return 3;
+	if (y) return c();
 }

```

## `uglify/if_return/if_var_return_5`

- tags: `sequences`
- size: oxc 53 vs reference 47 (no whitespaces: +6, formatted: +5)

```js
function f() {
	if (w()) return x();
	var a = y();
	return z(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function f() {
-	var a;
-	return w() ? x() : (a = y(), z(a));
+	if (w()) return x();
+	var a = y();
+	return z(a);
 }

```

## `uglify/if_return/merged_references_1`

- tags: `join vars`, `remove unused`
- size: oxc 81 vs reference 75 (no whitespaces: +6, formatted: +9)

```js
var a, b = 'PASS';
console.log(function(c) {
	if (c = b) return a || c;
	c = FAIL;
	return a || c;
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a, b = 'PASS';
 console.log(function(c) {
-	if (c = b);
-	else c = FAIL;
+	if (c = b) return a || c;
+	c = FAIL;
 	return a || c;
 }());

```

## `uglify/if_return/switch_return_2`

- size: oxc 91 vs reference 85 (no whitespaces: +6, formatted: +7)

```js
function f(a) {
	switch (a) {
		case console.log('PASS'):
			if (console) return;
			break;
		case 42: FAIL;
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(a) {
 	switch (a) {
 		case console.log('PASS'):
-			if (console);
+			if (console) return;
 			break;
 		case 42: FAIL;
 	}

```

## `uglify/if_return/switch_return_5`

- size: oxc 110 vs reference 104 (no whitespaces: +6, formatted: +7)

```js
function f(a) {
	switch (console.log('foo')) {
		case console.log('bar'):
			if (a) return;
			return;
			break;
		case null: FAIL;
	}
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(a) {
 	switch (console.log('foo')) {
 		case console.log('bar'):
-			if (a);
+			if (a) return;
 			return;
 		case null: FAIL;
 	}

```

## `uglify/issue-892/dont_mangle_arguments`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 70 vs reference 64 (no whitespaces: +6, formatted: +5)

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
-	var arguments, o = 9;
-	console.log(o, arguments);
+	var arguments = arguments;
+	console.log(9, arguments);
 })(5, 6, 7);

```

## `uglify/join_vars/issue_5849`

- tags: `join vars`
- size: oxc 47 vs reference 41 (no whitespaces: +6, formatted: +8)

```js
var a;
a = [42];
a[0] = 'PASS';
console.log(a.join(''));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var a, a = ['PASS'];
+var a = [42];
+a[0] = 'PASS';
 console.log(a.join(''));

```

## `uglify/join_vars/single_use_for`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 44 (no whitespaces: +6, formatted: +9)

```js
var a = function() {
	for (; console.log('PASS'););
};
a();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-(function() {
+var a = function() {
 	for (; console.log('PASS'););
-})();
+};
+a();

```

## `uglify/join_vars/single_use_var`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 59 (no whitespaces: +6, formatted: +9)

```js
A = 'PASS';
var a = function() {
	var b = A;
	for (b in console.log(b));
};
a();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 A = 'PASS';
-(function() {
+var a = function() {
 	var b = A;
 	for (b in console.log(b));
-})();
+};
+a();

```

## `uglify/keep_fargs/defun_label`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 74 vs reference 68 (no whitespaces: +6, formatted: +8)

```js
!function() {
	function f(a) {
		L: {
			if (a) break L;
			return 1;
		}
	}
	console.log(f(2));
}();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-!function() {
-	console.log(function() {
+(function() {
+	function f(a) {
 		L: {
-			if (2) break L;
+			if (a) break L;
 			return 1;
 		}
-	}());
-}();
+	}
+	console.log(f(2));
+})();

```

## `uglify/keep_fargs/issue_2226_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 47 vs reference 41 (no whitespaces: +6, formatted: +9)

```js
console.log(function(a, b) {
	a += b;
	return a;
}(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function(a) {
-	return a += 2;
-}(1));
+console.log(function(a, b) {
+	return a += b, a;
+}(1, 2));

```

## `uglify/keep_fargs/issue_2226_3`

- tags: `join vars`, `remove unused`
- size: oxc 47 vs reference 41 (no whitespaces: +6, formatted: +10)

```js
console.log(function(a, b) {
	a += b;
	return a;
}(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log(function(a) {
-	return a += 2;
-}(1));
+console.log(function(a, b) {
+	a += b;
+	return a;
+}(1, 2));

```

## `uglify/labels/labels_10`

- tags: `sequences`, `remove unused`
- size: oxc 42 vs reference 36 (no whitespaces: +6, formatted: +7)

```js
out: while (42) {
	console.log('PASS');
	break out;
	console.log('FAIL');
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-while (42) {
+out: for (;;) {
 	console.log('PASS');
-	break;
+	break out;
 }

```

## `uglify/let/keep_let_var_1`

- tags: `join vars`
- size: oxc 114 vs reference 108 (no whitespaces: +6, formatted: +5)

```js
'use strict';
var a = 'foo';
let b = 'bar';
for (var c of [a, b]) console.log(c);
function f() {
	return a;
}
console.log(f(f));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'use strict';
-var a = 'foo', c;
+var a = 'foo';
 let b = 'bar';
-for (c of [a, b]) console.log(c);
+for (var c of [a, 'bar']) console.log(c);
 function f() {
 	return a;
 }

```

## `uglify/numbers/evaluate_6`

- size: oxc 140 vs reference 134 (no whitespaces: +6, formatted: +6)

```js
var a = '1';
[
	-a + 2 + 3,
	-a + 2 - 3,
	-a - 2 + 3,
	-a - 2 - 3,
	2 + -a + 3,
	2 + -a - 3,
	2 - -a + 3,
	2 - -a - 3,
	2 + 3 + -a,
	2 + 3 - -a,
	2 - 3 + -a,
	2 - 3 - -a
].forEach(function(n) {
	console.log(typeof n, n);
});

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,16 @@
 var a = '1';
 [
-	2 - a + 3,
-	2 - a - 3,
+	-a + 2 + 3,
+	-a + 2 - 3,
 	-a - 2 + 3,
 	-a - 2 - 3,
-	2 - a + 3,
-	2 - a - 3,
+	2 + -a + 3,
+	2 + -a - 3,
 	2 - -a + 3,
 	2 - -a - 3,
-	5 - a,
+	5 + -a,
 	5 - -a,
-	-1 - a,
+	-1 + -a,
 	-1 - -a
 ].forEach(function(n) {
 	console.log(typeof n, n);

```

## `uglify/numbers/identity_2`

- size: oxc 40 vs reference 34 (no whitespaces: +6, formatted: +18)

```js
0 + !a;
!a + 0;
0 - !a;
!a - 0;
1 * !a;
!a * 1;
1 / !a;
!a / 1;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-+!a;
-+!a;
+0 + !a;
+!a + 0;
 0 - !a;
-+!a;
-+!a;
-+!a;
+!a - 0;
+1 * !a;
+!a * 1;
 1 / !a;
-+!a;
+!a / 1;

```

## `uglify/numbers/issue_3531_1`

- size: oxc 44 vs reference 38 (no whitespaces: +6, formatted: +10)

```js
var a = '1';
console.log(typeof (a + 1 - .1 - .1 - .1));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = '1';
-console.log(typeof (a + 1 - .3));
+console.log(typeof (a + 1 - .1 - .1 - .1));

```

## `uglify/properties/issue_2208_4`

- size: oxc 67 vs reference 61 (no whitespaces: +6, formatted: +14)

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
+	a: foo(),
+	p: function() {
+		return 42;
+	}
+}.p());

```

## `uglify/properties/mangle_global_property_write`

- size: oxc 46 vs reference 40 (no whitespaces: +6, formatted: +6)

```js
foo = 'FAIL';
global.foo = 'PASS';
console.log(foo);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-o = 'FAIL';
-global.o = 'PASS';
-console.log(o);
+foo = 'FAIL';
+global.foo = 'PASS';
+console.log(foo);

```

## `uglify/pure_funcs/array`

- tags: `pure functions`
- size: oxc 28 vs reference 22 (no whitespaces: +6, formatted: +12)

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

## `uglify/pure_getters/set_immutable_5`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 77 vs reference 71 (no whitespaces: +6, formatted: +9)

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
@@ -1,3 +1,3 @@
 'use strict';
-1 .foo += '';
-1 .foo ? console.log('FAIL') : console.log('PASS');
+var a = 1;
+a.foo += '', a.foo ? console.log('FAIL') : console.log('PASS');

```

## `uglify/reduce_vars/delay_def_lhs`

- tags: `join vars`
- size: oxc 70 vs reference 64 (no whitespaces: +6, formatted: +6)

```js
console.log(function() {
	long_name++;
	return long_name;
	var long_name;
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(function() {
 	long_name++;
-	return NaN;
+	return long_name;
 	var long_name;
 }());

```

## `uglify/reduce_vars/iife_new`

- tags: `join vars`
- size: oxc 63 vs reference 57 (no whitespaces: +6, formatted: +12)

```js
var A = new function(a, b, c) {
	b++;
	console.log(a - 1, b * 1, c + 2);
}(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var A = new function(a, b, c) {
 	b++;
-	console.log(0, 3, 5);
+	console.log(a - 1, b * 1, c + 2);
 }(1, 2, 3);

```

## `uglify/reduce_vars/issue_2420_1`

- tags: `join vars`, `remove unused`
- size: oxc 174 vs reference 168 (no whitespaces: +6, formatted: +10)

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

## `uglify/reduce_vars/issue_2420_2`

- tags: `join vars`, `remove unused`
- size: oxc 199 vs reference 193 (no whitespaces: +6, formatted: +9)

```js
function f() {
	var that = this;
	if (that.bar) that.foo();
	else !function(that, self) {
		console.log(this === that, self === this, that === self);
	}(that, this);
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
-	else !function(that, self) {
+	var that = this;
+	that.bar ? that.foo() : function(that, self) {
 		console.log(this === that, self === this, that === self);
-	}(this, this);
+	}(that, this);
 }
 f.call({
 	bar: 1,

```

## `uglify/reduce_vars/issue_2485_1`

- tags: `join vars`, `remove unused`
- size: oxc 258 vs reference 252 (no whitespaces: +6, formatted: +6)

```js
var foo = function(bar) {
	var n = function(a, b) {
		return a + b;
	};
	var sumAll = function(arg) {
		return arg.reduce(n, 0);
	};
	var runSumAll = function(arg) {
		return sumAll(arg);
	};
	bar.baz = function(arg) {
		var n = runSumAll(arg);
		return n.get = 1, n;
	};
	return bar;
};
var bar = foo({});
console.log(bar.baz([
	1,
	2,
	3
]));

```

```diff
--- reference
+++ oxc
@@ -1,19 +1,17 @@
 var foo = function(bar) {
 	var n = function(a, b) {
 		return a + b;
+	}, sumAll = function(arg) {
+		return arg.reduce(n, 0);
+	}, runSumAll = function(arg) {
+		return sumAll(arg);
 	};
-	var runSumAll = function(arg) {
-		return function(arg) {
-			return arg.reduce(n, 0);
-		}(arg);
-	};
 	bar.baz = function(arg) {
 		var n = runSumAll(arg);
 		return n.get = 1, n;
 	};
 	return bar;
-};
-var bar = foo({});
+}, bar = foo({});
 console.log(bar.baz([
 	1,
 	2,

```

## `uglify/rests/issue_5089_2`

- tags: `remove unused`
- size: oxc 44 vs reference 38 (no whitespaces: +6, formatted: +8)

```js
var { p: {} = null, ...o } = { p: {} };
console.log(o.p);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var { p: {}, ...o } = { p: 0 };
+var { p: {} = null, ...o } = { p: {} };
 console.log(o.p);

```

## `uglify/side_effects/drop_side_effect_free_call`

- tags: `join vars`
- size: oxc 54 vs reference 48 (no whitespaces: +6, formatted: +7)

```js
function f(a) {
	return 'PA' + a;
}
f(42);
console.log(f('SS'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function f(a) {
 	return 'PA' + a;
 }
+f(42);
 console.log(f('SS'));

```

## `uglify/side_effects/issue_4008`

- tags: `join vars`
- size: oxc 73 vs reference 67 (no whitespaces: +6, formatted: +10)

```js
var a = 'PASS';
function f(b, b) {
	console.log(b);
}
f && f(a && a[a]);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 function f(b, b) {
 	console.log(b);
 }
-f(a[a]);
+f && f(a && a[a]);
 console.log(a);

```

## `uglify/spreads/issue_4363`

- size: oxc 39 vs reference 33 (no whitespaces: +6, formatted: +9)

```js
({ ...{ set [console.log('PASS')](v) {} } });

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-({ [console.log('PASS')]: void 0 });
+({ ...{ set [console.log('PASS')](v) {} } });

```

## `uglify/switches/drop_case_3`

- size: oxc 82 vs reference 76 (no whitespaces: +6, formatted: +7)

```js
var c = 'PASS';
switch ({}.p) {
	default:
	case void 0: break;
	case c = 'FAIL':
}
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var c = 'PASS';
 switch ({}.p) {
 	default:
-	case void 0:
+	case void 0: break;
 	case c = 'FAIL':
 }
 console.log(c);

```

## `uglify/switches/drop_default_3`

- size: oxc 100 vs reference 94 (no whitespaces: +6, formatted: +7)

```js
function f() {
	console.log('PASS');
	return 42;
}
switch (42) {
	case f(): break;
	case void console.log('FAIL'):
	default:
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 	return 42;
 }
 switch (42) {
-	case f():
+	case f(): break;
 	case void console.log('FAIL'):
 }

```

## `uglify/switches/issue_1680_2`

- size: oxc 99 vs reference 93 (no whitespaces: +6, formatted: +7)

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
@@ -4,7 +4,7 @@
 	case b:
 		var c;
 		break;
-	case a:
+	case a: break;
 	case a--:
 }
 console.log(a, b);

```

## `uglify/typeof/issue_2728_3`

- tags: `join vars`
- size: oxc 68 vs reference 62 (no whitespaces: +6, formatted: +6)

```js
(function() {
	function arguments() {}
	console.log(typeof arguments);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function() {
 	function arguments() {}
-	console.log('function');
+	console.log(typeof arguments);
 })();

```

## `uglify/typeof/issue_2728_4`

- tags: `join vars`
- size: oxc 52 vs reference 46 (no whitespaces: +6, formatted: +6)

```js
function arguments() {}
console.log(typeof arguments);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 function arguments() {}
-console.log('function');
+console.log(typeof arguments);

```

## `uglify/varify/issue_4191_const`

- tags: `join vars`, `remove unused`
- size: oxc 47 vs reference 41 (no whitespaces: +6, formatted: +7)

```js
const a = function() {};
console.log(typeof a, a());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-function a() {}
-;
+const a = function() {};
 console.log(typeof a, a());

```

## `uglify/varify/reduce_merge_const`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 62 (no whitespaces: +6, formatted: +6)

```js
const a = console;
console.log(typeof a);
var b = typeof a;
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = console;
+const a = console;
 console.log(typeof a);
-a = typeof a;
-console.log(a);
+var b = typeof a;
+console.log(b);

```

## `uglify/yields/functions_anonymous`

- tags: `join vars`, `remove unused`
- size: oxc 75 vs reference 69 (no whitespaces: +6, formatted: +8)

```js
var yield = function* () {
	return 'PASS';
};
console.log(yield().next(yield).value);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function* yield() {
+var yield = function* () {
 	return 'PASS';
-}
+};
 console.log(yield().next(yield).value);

```

## `uglify/yields/functions_inner_var`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 60 (no whitespaces: +6, formatted: +8)

```js
var yield = function* a() {
	var a;
	console.log(a, a);
};
yield().next(yield);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function* yield() {
+var yield = function* () {
 	var a;
 	console.log(a, a);
-}
+};
 yield().next(yield);

```

## `uglify/yields/issue_5679_6`

- tags: `sequences`
- size: oxc 108 vs reference 102 (no whitespaces: +6, formatted: +9)

```js
var a = 'PASS';
async function* f(b) {
	try {
		if (b) return;
		else return console;
	} finally {
		a = 'FAIL';
	}
}
f().next();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 var a = 'PASS';
 async function* f(b) {
 	try {
-		if (!b) return console;
+		if (b) return;
+		return console;
 	} finally {
 		a = 'FAIL';
 	}
 }
-f().next();
-console.log(a);
+f().next(), console.log(a);

```

## `uglify/arrows/drop_return`

- size: oxc 49 vs reference 42 (no whitespaces: +7, formatted: +8)

```js
((a) => {
	while (!console);
	return console.log(a);
})(42);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 ((a) => {
-	while (!console);
-	console.log(a);
+	for (; !console;);
+	return console.log(a);
 })(42);

```

## `uglify/awaits/drop_return`

- size: oxc 63 vs reference 56 (no whitespaces: +7, formatted: +9)

```js
(async function(a) {
	while (!console);
	return !console.log(a);
})(42);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (async function(a) {
-	while (!console);
-	console.log(a);
+	for (; !console;);
+	return !console.log(a);
 })(42);

```

## `uglify/booleans/issue_3465_1`

- size: oxc 58 vs reference 51 (no whitespaces: +7, formatted: +7)

```js
console.log(function(a) {
	return typeof a;
}() ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function(a) {
-	return 1;
+	return typeof a;
 }() ? 'PASS' : 'FAIL');

```

## `uglify/booleans/issue_3465_3`

- tags: `remove unused`, `2 iterations`
- size: oxc 58 vs reference 51 (no whitespaces: +7, formatted: +7)

```js
console.log(function f(a) {
	return typeof a;
}() ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function(a) {
-	return 1;
+	return typeof a;
 }() ? 'PASS' : 'FAIL');

```

## `uglify/booleans/issue_3690`

- tags: `remove unused`
- size: oxc 79 vs reference 72 (no whitespaces: +7, formatted: +9)

```js
console.log(function(a) {
	return function() {
		return a = [this];
	}() ? 'PASS' : 'FAIL';
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(function(a) {
 	return function() {
-		return 1;
+		return a = [this];
 	}() ? 'PASS' : 'FAIL';
 }());

```

## `uglify/collapse_vars/issue_2506`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 136 vs reference 129 (no whitespaces: +7, formatted: +11)

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

## `uglify/collapse_vars/issue_4732_1`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 57 (no whitespaces: +7, formatted: +11)

```js
var a = 0;
(function(b) {
	var b = a++;
	var c = b ? b && console.log('PASS') : 0;
})(a++);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = 0;
 (function(b) {
-	(b = a++) && console.log('PASS');
+	var b = a++;
+	b && b && console.log('PASS');
 })(a++);

```

## `uglify/conditionals/combine_tail_sequence`

- tags: `sequences`
- size: oxc 342 vs reference 335 (no whitespaces: +7, formatted: +1)

```js
var n = {
	f: function() {
		console.log('foo');
		return this.p;
	},
	p: 'FAIL 1'
};
var o = {
	f: function() {
		console.log('foz');
		return this.p;
	},
	p: 'FAIL 2'
};
var p = 'PASS';
function g(a) {
	return a ? (console.log('baa'), (console.log('bar'), (console.log('baz'), n).f)()) : (console.log('moo'), (console.log('mor'), (console.log('moz'), o).f)());
}
console.log(g());
console.log(g(42));

```

```diff
--- reference
+++ oxc
@@ -1,20 +1,17 @@
 var n = {
 	f: function() {
-		console.log('foo');
-		return this.p;
+		return console.log('foo'), this.p;
 	},
 	p: 'FAIL 1'
 };
 var o = {
 	f: function() {
-		console.log('foz');
-		return this.p;
+		return console.log('foz'), this.p;
 	},
 	p: 'FAIL 2'
 };
 var p = 'PASS';
 function g(a) {
-	return (0, (a ? (console.log('baa'), console.log('bar'), console.log('baz'), n) : (console.log('moo'), console.log('mor'), console.log('moz'), o)).f)();
+	return a ? (console.log('baa'), (console.log('bar'), (console.log('baz'), n).f)()) : (console.log('moo'), (console.log('mor'), (console.log('moz'), o).f)());
 }
-console.log(g());
-console.log(g(42));
+console.log(g()), console.log(g(42));

```

## `uglify/default-values/inline_side_effects_2`

- size: oxc 53 vs reference 46 (no whitespaces: +7, formatted: +6)

```js
var a = 42;
(function(b = --a) {})(console);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 42;
-[[][0] = --a] = [console];
+(function(b = --a) {})(console);
 console.log(a);

```

## `uglify/default-values/issue_5246_3`

- tags: `remove unused`
- size: oxc 43 vs reference 36 (no whitespaces: +7, formatted: +11)

```js
console.log(function f([, {}] = null) {}([, {}]));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(function([{}]) {}([{}]));
+console.log(function([, {}] = null) {}([, {}]));

```

## `uglify/default-values/issue_5963`

- tags: `join vars`
- size: oxc 78 vs reference 71 (no whitespaces: +7, formatted: +8)

```js
var a = Object.create(null);
[a.PASS = 42] = [];
a.FAIL;
for (var p in a) console.log(p);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var a = Object.create(null);
 [a.PASS = 42] = [];
+a.FAIL;
 for (var p in a) console.log(p);

```

## `uglify/destructured/issue_5454`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 59 (no whitespaces: +7, formatted: +8)

```js
function f(a) {
	var a = 42, a = { p: [a] = [] };
	return 'PASS';
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-console.log(function(a) {
-	a = 42, a = { p: [a] = [] };
+function f(a) {
+	var a = 42, a = { p: [a] = [] };
 	return 'PASS';
-}());
+}
+console.log(f());

```

## `uglify/destructured/issue_5963_array`

- tags: `join vars`
- size: oxc 77 vs reference 70 (no whitespaces: +7, formatted: +8)

```js
var a = Object.create(null);
[a.PASS] = [42];
a.FAIL;
for (var p in a) console.log(p);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var a = Object.create(null);
 [a.PASS] = [42];
+a.FAIL;
 for (var p in a) console.log(p);

```

## `uglify/destructured/issue_5963_object`

- tags: `join vars`
- size: oxc 83 vs reference 76 (no whitespaces: +7, formatted: +8)

```js
var a = Object.create(null);
({p: a.PASS} = { p: 42 });
a.FAIL;
for (var p in a) console.log(p);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var a = Object.create(null);
 ({p: a.PASS} = { p: 42 });
+a.FAIL;
 for (var p in a) console.log(p);

```

## `uglify/drop-unused/issue_1656`

- tags: `remove unused`
- size: oxc 15 vs reference 8 (no whitespaces: +7, formatted: +9)

```js
for (var a = 0;;);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-for (;;);
+for (var a = 0;;);

```

## `uglify/evaluate/delete_expr_1`

- size: oxc 159 vs reference 152 (no whitespaces: +7, formatted: +3)

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
 console.log(delete undefined);
-console.log((void 0, !0));
+console.log(delete void 0);
 console.log(delete Infinity);
-console.log((1 / 0, !0));
+console.log(delete (1 / 0));
+console.log(delete NaN);
 console.log(delete NaN);
-console.log((0 / 0, !0));

```

## `uglify/evaluate/delete_expr_2`

- size: oxc 159 vs reference 152 (no whitespaces: +7, formatted: +3)

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
 console.log(delete undefined);
-console.log((void 0, !0));
+console.log(delete void 0);
 console.log(delete Infinity);
-console.log((1 / 0, !0));
+console.log(delete (1 / 0));
+console.log(delete NaN);
 console.log(delete NaN);
-console.log((0 / 0, !0));

```

## `uglify/evaluate/issue_3568`

- tags: `join vars`
- size: oxc 60 vs reference 53 (no whitespaces: +7, formatted: +9)

```js
var a = 0;
function f(b) {
	return b && b.p;
}
console.log(f(++a + f()));

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 function f(b) {
 	return b && b.p;
 }
-console.log(NaN);
+console.log(f(++a + f()));

```

## `uglify/exponentiation/issue_4664`

- tags: `join vars`, `remove unused`
- size: oxc 87 vs reference 80 (no whitespaces: +7, formatted: +12)

```js
function f() {
	new function(a) {
		console.log(typeof f, a, typeof this);
	}((A = 0, (NaN ^ 1) * 2 ** 30), 0);
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-(function f() {
+function f() {
 	new function(a) {
-		console.log(typeof f, 2 ** 30, typeof this);
-	}(A = 0);
-})();
+		console.log(typeof f, a, typeof this);
+	}((A = 0, 1 * 2 ** 30), 0);
+}
+f();

```

## `uglify/functions/functions_use_strict`

- tags: `join vars`, `remove unused`
- size: oxc 264 vs reference 257 (no whitespaces: +7, formatted: +7)

```js
'use strict';
!function() {
	var a = function a() {
		return a && 'a';
	};
	var b = function x() {
		return !!x;
	};
	var c = function(c) {
		return c;
	};
	if (c(b(a()))) {
		var d = function() {};
		var e = function y() {
			return typeof y;
		};
		var f = function(f) {
			return f;
		};
		console.log(a(d()), b(e()), c(f(42)), typeof d, e(), typeof f);
	}
}();

```

```diff
--- reference
+++ oxc
@@ -1,22 +1,18 @@
 'use strict';
-!function() {
-	function a() {
+(function() {
+	var a = function a() {
 		return a && 'a';
-	}
-	function b() {
-		return !!b;
-	}
-	function c(c) {
+	}, b = function x() {
+		return !!x;
+	}, c = function(c) {
 		return c;
-	}
+	};
 	if (c(b(a()))) {
-		var d = function() {};
-		var e = function y() {
+		var d = function() {}, e = function y() {
 			return typeof y;
-		};
-		var f = function(f) {
+		}, f = function(f) {
 			return f;
 		};
-		console.log(a(d()), b(e()), c(f(42)), typeof d, e(), typeof f);
+		console.log(a(void 0), b(e()), c(f(42)), typeof d, e(), typeof f);
 	}
-}();
+})();

```

## `uglify/functions/issue_4612_4`

- tags: `join vars`
- size: oxc 100 vs reference 93 (no whitespaces: +7, formatted: +7)

```js
console.log(function() {
	function f() {
		return h();
	}
	function g() {
		{
			return h();
		}
	}
	function h() {
		{
			return g();
		}
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log(function() {
 	function f() {
-		h();
+		return h();
 	}
 	function g() {
 		return h();

```

## `uglify/functions/unsafe_call_3`

- size: oxc 78 vs reference 71 (no whitespaces: +7, formatted: +8)

```js
console.log(function() {
	return arguments[0] + eval('arguments')[1];
}.call(0, 1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function() {
 	return arguments[0] + eval('arguments')[1];
-}(1, 2));
+}.call(0, 1, 2));

```

## `uglify/if_return/issue_5589_2`

- size: oxc 119 vs reference 112 (no whitespaces: +7, formatted: +7)

```js
function f(a) {
	switch (console.log('foo')) {
		case console.log('bar'):
			if (a) return void console.log('baz');
			return;
	}
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(a) {
 	switch (console.log('foo')) {
 		case console.log('bar'):
-			if (a) void console.log('baz');
+			if (a) return void console.log('baz');
 			return;
 	}
 }

```

## `uglify/issue-597/issue_1724`

- size: oxc 50 vs reference 43 (no whitespaces: +7, formatted: +1)

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
-++a % (1 / 0) | 1 / 0 ? a++ : 0;
+++a % Infinity | Infinity && a++;
 console.log(a);

```

## `uglify/join_vars/if_body`

- tags: `join vars`
- size: oxc 28 vs reference 21 (no whitespaces: +7, formatted: +6)

```js
var a;
if (x) var b;
else var c;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a, b, c;
-if (x);
-else;
+var a;
+if (x) var b;
+else var c;

```

## `uglify/join_vars/if_switch`

- tags: `join vars`
- size: oxc 48 vs reference 41 (no whitespaces: +7, formatted: +8)

```js
var a;
if (x) switch (y) {
	case 1: var b;
	default: var c;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a, b, c;
+var a;
 if (x) switch (y) {
-	case 1:
-	default:
+	case 1: var b;
+	default: var c;
 }

```

## `uglify/join_vars/join_object_assignments_1`

- tags: `join vars`
- size: oxc 129 vs reference 122 (no whitespaces: +7, formatted: +3)

```js
console.log(function() {
	var x = {
		a: 1,
		c: (console.log('c'), 'C')
	};
	x.b = 2;
	x[3] = function() {
		console.log(x);
	}, x['a'] = /foo/, x.bar = x;
	return x;
}());

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,11 @@
 console.log(function() {
 	var x = {
 		a: 1,
-		c: (console.log('c'), 'C'),
-		b: 2,
-		3: function() {
-			console.log(x);
-		},
-		a: /foo/
+		c: (console.log('c'), 'C')
 	};
-	x.bar = x;
+	x.b = 2;
+	x[3] = function() {
+		console.log(x);
+	}, x.a = /foo/, x.bar = x;
 	return x;
 }());

```

## `uglify/join_vars/loop_body_3`

- tags: `join vars`
- size: oxc 25 vs reference 18 (no whitespaces: +7, formatted: +7)

```js
var a;
for (var b; x;) var c;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-for (var a, b, c; x;);
+var a;
+for (var b; x;) var c;

```

## `uglify/let/issue_4438`

- size: oxc 78 vs reference 71 (no whitespaces: +7, formatted: +10)

```js
'use strict';
function f() {
	if (console) {
		{
			let a = console.log;
			return void a('PASS');
		}
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,7 @@
 	if (console) {
 		let a = console.log;
 		a('PASS');
+		return;
 	}
 }
 f();

```

## `uglify/loops/issue_2740_3`

- tags: `remove unused`
- size: oxc 72 vs reference 65 (no whitespaces: +7, formatted: +4)

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
@@ -1,5 +1,2 @@
-L1: for (var x = 0; x < 3; x++) {
-	var y = 0;
-	if (y < 2) break L1;
-}
+L1: for (var x = 0; x < 3; x++) L2: for (var y = 0; y < 2; y++) break L1;
 console.log(x, y);

```

## `uglify/numbers/evaluate_1`

- size: oxc 118 vs reference 111 (no whitespaces: +7, formatted: +9)

```js
console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, 1 | x | 2 | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), 1 + (2 + ~x + 3), -y + (2 + ~x + 3), 1 & (2 & x & 3), 1 + (2 + (x |= 0) + 3));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(x + 1 + 2, 2 * +x, +x + 1 + 2, 1 + x + 2 + 3, 3 | x, 1 + x-- + 2 + 3, x * y + 2 + 1 + 3, 1 + (2 + x + 3), 2 + ~x + 3 + 1, -y + (2 + ~x + 3), 0 & x, 2 + (x |= 0) + 3 + 1);
+console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, x | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), 1 + (2 + ~x + 3), -y + (2 + ~x + 3), x & 0, 1 + (2 + (x |= 0) + 3));

```

## `uglify/properties/issue_5963_assign`

- tags: `join vars`
- size: oxc 73 vs reference 66 (no whitespaces: +7, formatted: +8)

```js
var a = Object.create(null);
a.PASS = 42;
a.FAIL;
for (var p in a) console.log(p);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var a = Object.create(null);
 a.PASS = 42;
+a.FAIL;
 for (var p in a) console.log(p);

```

## `uglify/properties/issue_5963_compound_assign`

- tags: `join vars`
- size: oxc 74 vs reference 67 (no whitespaces: +7, formatted: +8)

```js
var a = Object.create(null);
a.PASS ^= 42;
a.FAIL;
for (var p in a) console.log(p);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var a = Object.create(null);
 a.PASS ^= 42;
+a.FAIL;
 for (var p in a) console.log(p);

```

## `uglify/properties/issue_5963_unary`

- tags: `join vars`
- size: oxc 72 vs reference 65 (no whitespaces: +7, formatted: +8)

```js
var a = Object.create(null);
a.PASS++;
a.FAIL;
for (var p in a) console.log(p);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var a = Object.create(null);
 a.PASS++;
+a.FAIL;
 for (var p in a) console.log(p);

```

## `uglify/pure_getters/strict_reduce_vars`

- tags: `join vars`
- size: oxc 84 vs reference 77 (no whitespaces: +7, formatted: +8)

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

## `uglify/reduce_vars/escape_conditional`

- tags: `join vars`, `remove unused`
- size: oxc 166 vs reference 159 (no whitespaces: +7, formatted: +10)

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
-	if (thing !== baz()) console.log('FAIL');
-	else console.log('PASS');
-})();
+main();

```

## `uglify/reduce_vars/escape_throw`

- tags: `join vars`, `remove unused`
- size: oxc 169 vs reference 162 (no whitespaces: +7, formatted: +10)

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
-	if (thing !== baz()) console.log('FAIL');
-	else console.log('PASS');
-})();
+main();

```

## `uglify/reduce_vars/iife`

- tags: `join vars`
- size: oxc 55 vs reference 48 (no whitespaces: +7, formatted: +13)

```js
!function(a, b, c) {
	b++;
	console.log(a - 1, b * 1, c + 2);
}(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function(a, b, c) {
+(function(a, b, c) {
 	b++;
-	console.log(0, 3, 5);
-}(1, 2, 3);
+	console.log(a - 1, b * 1, c + 2);
+})(1, 2, 3);

```

## `uglify/reduce_vars/perf_6`

- tags: `join vars`, `remove unused`, `10 iterations`
- size: oxc 168 vs reference 161 (no whitespaces: +7, formatted: +9)

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
@@ -1,7 +1,8 @@
 function indirect_foo(x, y, z) {
-	return function(x, y, z) {
+	function foo(x, y, z) {
 		return x < y ? x * y + z : x * z - y;
-	}(x, y, z);
+	}
+	return foo(x, y, z);
 }
 var sum = 0;
 for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);

```

## `uglify/rests/drop_rest_arrow`

- tags: `join vars`
- size: oxc 35 vs reference 28 (no whitespaces: +7, formatted: +5)

```js
console.log(((...[a]) => a)('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(((a) => a)('PASS'));
+console.log(((...[a]) => a)('PASS'));

```

## `uglify/return_undefined/return_undefined`

- tags: `drop debugger`, `join vars`, `remove unused`
- size: oxc 391 vs reference 384 (no whitespaces: +7, formatted: +17)

```js
function f0() {}
function f1() {
	return undefined;
}
function f2() {
	return void 0;
}
function f3() {
	return void 123;
}
function f4() {
	return;
}
function f5(a, b) {
	console.log(a, b);
	baz(a);
	return;
}
function f6(a, b) {
	console.log(a, b);
	if (a) {
		foo(b);
		baz(a);
		return a + b;
	}
	return undefined;
}
function f7(a, b) {
	console.log(a, b);
	if (a) {
		foo(b);
		baz(a);
		return void 0;
	}
	return a + b;
}
function f8(a, b) {
	foo(a);
	bar(b);
	return void 0;
}
function f9(a, b) {
	foo(a);
	bar(b);
	return undefined;
}
function f10() {
	return false;
}
function f11() {
	return null;
}
function f12() {
	return 0;
}

```

```diff
--- reference
+++ oxc
@@ -17,9 +17,12 @@
 }
 function f7(a, b) {
 	console.log(a, b);
-	if (!a) return a + b;
-	foo(b);
-	baz(a);
+	if (a) {
+		foo(b);
+		baz(a);
+		return;
+	}
+	return a + b;
 }
 function f8(a, b) {
 	foo(a);

```

## `uglify/spreads/convert_setter`

- size: oxc 62 vs reference 55 (no whitespaces: +7, formatted: +9)

```js
var o = { ...{ set PASS(v) {} } };
for (var k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var o = { PASS: void 0 };
+var o = { ...{ set PASS(v) {} } };
 for (var k in o) console.log(k, o[k]);

```

## `uglify/switches/issue_4059`

- tags: `sequences`
- size: oxc 70 vs reference 63 (no whitespaces: +7, formatted: +9)

```js
switch (0) {
	default:
	case 1: break;
	case a:
		break;
		var a;
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 switch (0) {
-	default: break;
+	default:
+	case 1: break;
 	case a:
 		break;
 		var a;

```

## `uglify/webkit/function_name_mangle`

- tags: `join vars`, `remove unused`, `keep function names`
- size: oxc 59 vs reference 52 (no whitespaces: +7, formatted: +9)

```js
(function() {
	function foo(bar) {}
	console.log(typeof foo);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 (function() {
-	console.log(typeof function o(n) {});
+	function foo(bar) {}
+	console.log(typeof foo);
 })();

```

## `uglify/webkit/function_name_mangle_ie8`

- tags: `join vars`, `remove unused`, `keep function names`
- size: oxc 59 vs reference 52 (no whitespaces: +7, formatted: +9)

```js
(function() {
	function foo(bar) {}
	console.log(typeof foo);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 (function() {
-	console.log(typeof function n(o) {});
+	function foo(bar) {}
+	console.log(typeof foo);
 })();

```

## `uglify/awaits/issue_5305_1`

- size: oxc 116 vs reference 108 (no whitespaces: +8, formatted: +14)

```js
var a = 'PASS';
(async function() {
	try {
		return await function() {
			while (!console);
		}();
	} finally {
		a = 'FAIL';
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 var a = 'PASS';
 (async function() {
 	try {
-		while (!console);
-		return await void 0;
+		return await function() {
+			for (; !console;);
+		}();
 	} finally {
 		a = 'FAIL';
 	}

```

## `uglify/awaits/issue_5456`

- tags: `join vars`
- size: oxc 178 vs reference 170 (no whitespaces: +8, formatted: +15)

```js
var a = true;
(function() {
	(function(b, c) {
		var d = async function() {
			c = await null;
		}();
		var e = function() {
			if (c) console.log(typeof d);
			while (b);
		}();
	})(function(i) {
		return console.log('foo') && i;
	}(a));
})();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
-var a = true;
+var a = !0;
 (function() {
-	b = (i = a, console.log('foo') && i), d = async function() {
-		c = await null;
-	}(), e = function() {
-		if (c) console.log(typeof d);
-		while (b);
-	}(), void 0;
-	var b, c, d, e;
-	var i;
+	(function(b, c) {
+		var d = async function() {
+			c = await null;
+		}(), e = function() {
+			c && console.log(typeof d);
+			for (; b;);
+		}();
+	})(function(i) {
+		return console.log('foo') && i;
+	}(a));
 })();

```

## `uglify/booleans/de_morgan_2c`

- size: oxc 93 vs reference 85 (no whitespaces: +8, formatted: +12)

```js
function f(a, b) {
	return a && (a || b);
}
console.log(f(null), f(null, {}));
console.log(f(42), f(42, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b) {
-	return a;
+	return a && (a || b);
 }
 console.log(f(null), f(null, {}));
 console.log(f(42), f(42, {}));

```

## `uglify/booleans/de_morgan_3f`

- size: oxc 156 vs reference 148 (no whitespaces: +8, formatted: +12)

```js
function f(a, b, c) {
	return a && (a || b) && c;
}
console.log(f(null, false), f(null, false, {}), f(null, true), f(null, true, {}));
console.log(f(42, false), f(42, false, {}), f(42, true), f(42, true, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b, c) {
-	return a && c;
+	return a && (a || b) && c;
 }
 console.log(f(null, !1), f(null, !1, {}), f(null, !0), f(null, !0, {}));
 console.log(f(42, !1), f(42, !1, {}), f(42, !0), f(42, !0, {}));

```

## `uglify/booleans/issue_5469`

- tags: `sequences`
- size: oxc 45 vs reference 37 (no whitespaces: +8, formatted: +11)

```js
console.log(function f(a) {
	a && 42[a = A && null];
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function f(a) {
-	a && A, 0;
+console.log(function(a) {
+	a && 42[a = A && null];
 }());

```

## `uglify/classes/issue_5294_4`

- tags: `join vars`, `remove unused`
- size: oxc 78 vs reference 70 (no whitespaces: +8, formatted: +13)

```js
(class A {
	static p = function() {
		var a = this;
		console.log(a === A ? 'FAIL' : 'PASS');
	}();
});

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 (class A {
 	static p = function() {
-		console.log(this === A ? 'FAIL' : 'PASS');
+		var a = this;
+		console.log(a === A ? 'FAIL' : 'PASS');
 	}();
 });

```

## `uglify/collapse_vars/cascade_statement`

- tags: `join vars`
- size: oxc 184 vs reference 176 (no whitespaces: +8, formatted: +13)

```js
function f1(a, b) {
	var c;
	if (a) return c = b, c || a;
	else c = a, c(b);
}
function f2(a, b) {
	var c;
	while (a) c = b, a = c + b;
	do
		throw c = a + b, c;
	while (c);
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
+	for (; a;) c = b, a = c + b;
 	do
-		throw c = a + b;
+		throw c = a + b, c;
 	while (c);
 }
 function f3(a, b) {
-	for (; a < b; a++) if ((c = a) && b) var c = c = b(a);
+	for (; a < b; a++) if (c = a, c && b) var c = (c = b(a), c);
 }

```

## `uglify/collapse_vars/collapse_vars_array_3`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 52 (no whitespaces: +8, formatted: +12)

```js
function f(a) {
	var b;
	return [
		b = a,
		b,
		b
	];
}
console.log(f().length);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f(a) {
+	var b;
 	return [
-		a,
-		a,
-		a
+		b = a,
+		b,
+		b
 	];
 }
 console.log(f().length);

```

## `uglify/collapse_vars/collapse_vars_object_3`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 59 (no whitespaces: +8, formatted: +12)

```js
function f(a) {
	var b;
	return {
		p: b = a,
		q: b,
		r: b
	};
}
console.log(f('PASS').r);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f(a) {
+	var b;
 	return {
-		p: a,
-		q: a,
-		r: a
+		p: b = a,
+		q: b,
+		r: b
 	};
 }
 console.log(f('PASS').r);

```

## `uglify/collapse_vars/issue_2436_13`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 105 vs reference 97 (no whitespaces: +8, formatted: +12)

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

## `uglify/collapse_vars/issue_2436_3`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 69 (no whitespaces: +8, formatted: +13)

```js
var o = {
	a: 1,
	b: 2
};
console.log(function(c) {
	o = {
		a: 3,
		b: 4
	};
	return {
		x: c.a,
		y: c.b
	};
}(o));

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,14 @@
+var o = {
+	a: 1,
+	b: 2
+};
 console.log(function(c) {
-	({
+	o = {
 		a: 3,
 		b: 4
-	});
+	};
 	return {
 		x: c.a,
 		y: c.b
 	};
-}({
-	a: 1,
-	b: 2
-}));
+}(o));

```

## `uglify/collapse_vars/issue_2436_5`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 57 (no whitespaces: +8, formatted: +11)

```js
var o = {
	a: 1,
	b: 2
};
console.log(function(o) {
	return {
		x: o.a,
		y: o.b
	};
}(o));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
+var o = {
+	a: 1,
+	b: 2
+};
 console.log(function(o) {
 	return {
 		x: o.a,
 		y: o.b
 	};
-}({
-	a: 1,
-	b: 2
-}));
+}(o));

```

## `uglify/collapse_vars/issue_5273`

- tags: `join vars`, `sequences`
- size: oxc 72 vs reference 64 (no whitespaces: +8, formatted: +11)

```js
var a = '10', b = 1;
function f(c, d) {
	return d;
}
f((b += a, b *= a), f);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 function f(c, d) {
 	return d;
 }
-b = 1100, f, console.log(b);
+f((b += a, b *= a), f), console.log(b);

```

## `uglify/collapse_vars/issue_5309_1`

- tags: `join vars`, `sequences`
- size: oxc 70 vs reference 62 (no whitespaces: +8, formatted: +8)

```js
if (console) var a = (console.log('PASS'), b), b = a;
else console.log('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a, b;
-console ? (console.log('PASS'), b = b) : console.log('FAIL');
+if (console) var a = (console.log('PASS'), b), b = a;
+else console.log('FAIL');

```

## `uglify/collapse_vars/substitution_assign`

- tags: `join vars`
- size: oxc 225 vs reference 217 (no whitespaces: +8, formatted: +16)

```js
function f1(a, b) {
	f1 = b = a;
	console.log(a, b);
}
function f2(a, b) {
	a = 1 + (b = a);
	console.log(a, b);
}
function f3(a, b) {
	b = 1 + (b = a);
	console.log(a, b);
}
function f4(a, b) {
	b = 1 + (a = b);
	console.log(a, b);
}
f1(42, 'foo');
f2(42, 'foo');
f3(42, 'foo');
f4('bar', 41);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,14 @@
 function f1(a, b) {
-	console.log(f1 = a, a);
+	f1 = b = a;
+	console.log(a, b);
 }
 function f2(a, b) {
-	console.log(a = 1 + (b = a), b);
+	a = 1 + (b = a);
+	console.log(a, b);
 }
 function f3(a, b) {
-	console.log(a, b = 1 + (b = a));
+	b = 1 + (b = a);
+	console.log(a, b);
 }
 function f4(a, b) {
 	b = 1 + (a = b);

```

## `uglify/collapse_vars/substitution_logical_2`

- tags: `join vars`
- size: oxc 268 vs reference 260 (no whitespaces: +8, formatted: +16)

```js
function f1(a, b) {
	console.log((b = a) && a && b);
}
function f2(a, b) {
	console.log((b = a) && a || b);
}
function f3(a, b) {
	console.log((b = a) || a && b);
}
function f4(a, b) {
	console.log((b = a) || a || b);
}
f1(42, 'foo');
f1(null, true);
f2(42, 'foo');
f2(null, true);
f3(42, 'foo');
f3(null, true);
f4(42, 'foo');
f4(null, true);

```

```diff
--- reference
+++ oxc
@@ -1,20 +1,20 @@
 function f1(a, b) {
-	console.log(a && a && a);
+	console.log((b = a) && a && b);
 }
 function f2(a, b) {
-	console.log(a && a || a);
+	console.log((b = a) && a || b);
 }
 function f3(a, b) {
-	console.log(a || a && a);
+	console.log((b = a) || a && b);
 }
 function f4(a, b) {
-	console.log(a || a || a);
+	console.log((b = a) || a || b);
 }
 f1(42, 'foo');
-f1(null, true);
+f1(null, !0);
 f2(42, 'foo');
-f2(null, true);
+f2(null, !0);
 f3(42, 'foo');
-f3(null, true);
+f3(null, !0);
 f4(42, 'foo');
-f4(null, true);
+f4(null, !0);

```

## `uglify/collapse_vars/undeclared_2`

- tags: `join vars`, `remove unused`
- size: oxc 39 vs reference 31 (no whitespaces: +8, formatted: +14)

```js
function f(x, y) {
	var a;
	a = x;
	b = y;
	return a + b;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 function f(x, y) {
-	return x + (b = y);
+	var a = x;
+	b = y;
+	return a + b;
 }

```

## `uglify/collapse_vars/undeclared_4`

- tags: `join vars`, `remove unused`
- size: oxc 41 vs reference 33 (no whitespaces: +8, formatted: +12)

```js
function f(x, y) {
	var a;
	a = x;
	b = y;
	return a() + b;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function f(x, y) {
+	var a = x;
 	b = y;
-	return x() + b;
+	return a() + b;
 }

```

## `uglify/collapse_vars/unsafe_builtin_3`

- tags: `join vars`, `remove unused`
- size: oxc 48 vs reference 40 (no whitespaces: +8, formatted: +12)

```js
A = 'PASS';
(function() {
	var a = A;
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 A = 'PASS';
 (function() {
-	console.log(A);
+	var a = A;
+	console.log(a);
 })();

```

## `uglify/debugger/drop_debugger`

- tags: `drop debugger`
- size: oxc 16 vs reference 8 (no whitespaces: +8, formatted: +9)

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

## `uglify/default-values/issue_4502_4`

- size: oxc 61 vs reference 53 (no whitespaces: +8, formatted: +7)

```js
(function(a, b = console.log('FAIL')) {})(...'' + console.log(42));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-[, [][0] = console.log('FAIL')] = [...'' + console.log(42)];
+(function(a, b = console.log('FAIL')) {})(...'' + console.log(42));

```

## `uglify/default-values/issue_5340_3`

- tags: `remove unused`
- size: oxc 54 vs reference 46 (no whitespaces: +8, formatted: +11)

```js
var a;
(function(b = 42) {})(({p: a} = true).q);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a;
-(function() {})(a = true.p);
+(function(b = 42) {})(({p: a} = !0).q);
 console.log(a);

```

## `uglify/default-values/unused_value_var_1`

- tags: `remove unused`
- size: oxc 28 vs reference 20 (no whitespaces: +8, formatted: +11)

```js
var [] = [console.log('PASS')];

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+var [] = [console.log('PASS')];

```

## `uglify/destructured/funarg_side_effects_1`

- size: oxc 49 vs reference 41 (no whitespaces: +8, formatted: +6)

```js
try {
	(function({}) {})();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
-	[{}] = [];
-} catch (e) {
+	(function({}) {})();
+} catch {
 	console.log('PASS');
 }

```

## `uglify/drop-unused/issue_4144`

- tags: `join vars`, `remove unused`
- size: oxc 58 vs reference 50 (no whitespaces: +8, formatted: +11)

```js
(function(a, b) {
	var b = console, c = ++b;
})(console.log('PASS'), 0);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-(function(b) {
-	b = console, ++b;
-})(console.log('PASS'));
+(function(a, b) {
+	var b = console;
+	++b;
+})(console.log('PASS'), 0);

```

## `uglify/evaluate/issue_3558`

- tags: `join vars`
- size: oxc 52 vs reference 44 (no whitespaces: +8, formatted: +8)

```js
function f(a) {
	return 1 + --a;
}
console.log(f(true), f(false));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
 	return 1 + --a;
 }
-console.log(1, 0);
+console.log(f(!0), f(!1));

```

## `uglify/evaluate/issue_3755`

- size: oxc 49 vs reference 41 (no whitespaces: +8, formatted: +3)

```js
console.log((/4/.exec(1 + (!0 - 5 / '23')) || 0).p);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((/4/.exec(!0 - 5 / '23' + 1), 0).p);
+console.log((/4/.exec(1.7826086956521738) || 0).p);

```

## `uglify/evaluate/issue_3933`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 43 (no whitespaces: +8, formatted: +12)

```js
(function(a, b) {
	a && (b ^= 1) && console.log('PASS');
})(1);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function(a, b) {
-	1, 1, console.log('PASS');
-})();
+	a && (b ^= 1) && console.log('PASS');
+})(1);

```

## `uglify/evaluate/unsafe_object`

- tags: `join vars`
- size: oxc 49 vs reference 41 (no whitespaces: +8, formatted: +12)

```js
var o = { a: 1 };
console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var o = { a: 1 };
-console.log(o + 1, 2, o.b + 1, NaN);
+console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

## `uglify/evaluate/unsafe_object_repeated`

- tags: `join vars`
- size: oxc 57 vs reference 49 (no whitespaces: +8, formatted: +12)

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
-console.log(o + 1, 2, o.b + 1, NaN);
+console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

## `uglify/functions/inline_1`

- size: oxc 97 vs reference 89 (no whitespaces: +8, formatted: +9)

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
@@ -1,8 +1,9 @@
-console.log(1);
+(function() {
+	console.log(1);
+})();
 (function(a) {
 	console.log(a);
 })(2);
 (function(b) {
-	var c = b;
-	console.log(c);
+	console.log(b);
 })(3);

```

## `uglify/functions/inline_negate_iife`

- size: oxc 65 vs reference 57 (no whitespaces: +8, formatted: +13)

```js
console.log(function() {
	return !function() {
		while (!console);
	}();
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 console.log(function() {
-	while (!console);
-	return !void 0;
+	return !function() {
+		for (; !console;);
+	}();
 }());

```

## `uglify/functions/issue_5332_1`

- tags: `join vars`, `remove unused`
- size: oxc 69 vs reference 61 (no whitespaces: +8, formatted: +14)

```js
do {
	var a = {};
	for (A in a) a;
} while (function() {
	console.log(b);
	var b = b;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 do {
 	var a = {};
 	for (A in a);
-} while (a = void 0, void console.log(a));
+} while (function() {
+	console.log(b);
+	var b = b;
+}());

```

## `uglify/functions/issue_5332_2`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 68 (no whitespaces: +8, formatted: +14)

```js
do {
	var a = 42 in [];
	for (A in a) a;
} while (function() {
	console.log(++b);
	var b = b;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 do {
 	var a = 42 in [];
 	for (A in a);
-} while (a = void 0, void console.log(++a));
+} while (function() {
+	console.log(++b);
+	var b = b;
+}());

```

## `uglify/if_return/if_return_10`

- tags: `sequences`
- size: oxc 107 vs reference 99 (no whitespaces: +8, formatted: +9)

```js
!function() {
	if (console.log('foo')) return 42;
	if (console.log('bar')) return null;
	var a = console.log('baz');
}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-!function() {
-	var a;
-	return console.log('foo') || !console.log('bar') && (a = console.log('baz'), void 0);
-}();
+(function() {
+	if (console.log('foo')) return 42;
+	if (console.log('bar')) return null;
+	var a = console.log('baz');
+})();

```

## `uglify/issue-1639/issue_1639_1`

- tags: `join vars`, `sequences`
- size: oxc 69 vs reference 61 (no whitespaces: +8, formatted: +6)

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
@@ -1,4 +1,2 @@
-for (var a = 100, b = 10, L1 = 5, ignore; --L1 > 0;) {
-	--b;
-}
+for (var a = 100, b = 10, L1 = 5; --L1 > 0;) if (--b, 0) var ignore;
 console.log(a, b);

```

## `uglify/issue-208/do_update_rhs`

- size: oxc 31 vs reference 23 (no whitespaces: +8, formatted: +8)

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

## `uglify/issue-368/collapse`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 258 vs reference 250 (no whitespaces: +8, formatted: +14)

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
	return 'string' == typeof a && d();
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
@@ -1,14 +1,15 @@
 function f1() {
-	return void 0 !== ('function' === typeof b ? b() : b) && c();
+	return (typeof b == 'function' ? b() : b) !== void 0 && c();
 }
 function f2(b) {
-	return 'string' == typeof ('function' === typeof (b = c()) ? b() : b) && d();
+	var a;
+	return b = c(), a = typeof b == 'function' ? b() : b, typeof a == 'string' && d();
 }
 function f3(c) {
-	var a;
-	if ((a = b(a / 2)) < 0) return a++, ++c / 2;
+	var a = b(a / 2);
+	if (a < 0) return a++, ++c, c / 2;
 }
 function f4(c) {
-	var a;
-	if ((a = b(a / 2)) < 0) return a++, ++c / 2;
+	var a = b(a / 2);
+	if (a < 0) return a++, c++, c / 2;
 }

```

## `uglify/keep_fargs/function_name_mangle`

- tags: `join vars`, `remove unused`, `keep function names`
- size: oxc 59 vs reference 51 (no whitespaces: +8, formatted: +10)

```js
(function() {
	function foo(bar) {}
	console.log(typeof foo);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 (function() {
-	console.log(typeof function o() {});
+	function foo(bar) {}
+	console.log(typeof foo);
 })();

```

## `uglify/keep_fargs/function_name_mangle_ie8`

- tags: `join vars`, `remove unused`, `keep function names`
- size: oxc 59 vs reference 51 (no whitespaces: +8, formatted: +10)

```js
(function() {
	function foo(bar) {}
	console.log(typeof foo);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 (function() {
-	console.log(typeof function o() {});
+	function foo(bar) {}
+	console.log(typeof foo);
 })();

```

## `uglify/keep_fargs/recursive_iife_2`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 57 (no whitespaces: +8, formatted: +8)

```js
console.log(function f(a, b) {
	return b || f('FAIL', 'PASS');
}(null, 0));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function f(a, b) {
-	return b || f(0, 'PASS');
-}(0, 0));
+	return b || f('FAIL', 'PASS');
+}(null, 0));

```

## `uglify/let/do_if_continue_1`

- size: oxc 82 vs reference 74 (no whitespaces: +8, formatted: +9)

```js
'use strict';
do {
	if (console) {
		console.log('PASS');
		{
			let a = 0;
			var b;
			continue;
		}
	}
} while (b);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 'use strict';
-do {
+do
 	if (console) {
 		console.log('PASS');
 		{
 			let a = 0;
 			var b;
+			continue;
 		}
 	}
-} while (b);
+while (b);

```

## `uglify/let/do_if_continue_2`

- size: oxc 80 vs reference 72 (no whitespaces: +8, formatted: +9)

```js
'use strict';
do {
	if (console) {
		console.log('FAIL');
		{
			let a = 0;
			A = 0;
			continue;
		}
	}
} while (A);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 'use strict';
-do {
+do
 	if (console) {
 		console.log('FAIL');
 		{
 			let a = 0;
 			A = 0;
+			continue;
 		}
 	}
-} while (A);
+while (A);

```

## `uglify/let/join_let_var_1`

- tags: `join vars`
- size: oxc 74 vs reference 66 (no whitespaces: +8, formatted: +8)

```js
'use strict';
var a = 'foo';
let b = 'bar';
for (var c of [a, b]) console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 'use strict';
-let a = 'foo', b = 'bar';
-for (var c of [a, b]) console.log(c);
+var a = 'foo';
+let b = 'bar';
+for (var c of [a, 'bar']) console.log(c);

```

## `uglify/let/join_let_var_2`

- tags: `join vars`
- size: oxc 74 vs reference 66 (no whitespaces: +8, formatted: +8)

```js
'use strict';
let a = 'foo';
var b = 'bar';
for (let c of [a, b]) console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 'use strict';
-let a = 'foo', b = 'bar';
-for (let c of [a, b]) console.log(c);
+let a = 'foo';
+var b = 'bar';
+for (let c of ['foo', b]) console.log(c);

```

## `uglify/nullish/de_morgan_2b`

- size: oxc 93 vs reference 85 (no whitespaces: +8, formatted: +12)

```js
function f(a, b) {
	return a && (a ?? b);
}
console.log(f(null), f(null, {}));
console.log(f(42), f(42, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b) {
-	return a;
+	return a && (a ?? b);
 }
 console.log(f(null), f(null, {}));
 console.log(f(42), f(42, {}));

```

## `uglify/nullish/de_morgan_2d`

- size: oxc 93 vs reference 85 (no whitespaces: +8, formatted: +12)

```js
function f(a, b) {
	return a ?? (a && b);
}
console.log(f(null), f(null, {}));
console.log(f(42), f(42, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b) {
-	return a;
+	return a ?? (a && b);
 }
 console.log(f(null), f(null, {}));
 console.log(f(42), f(42, {}));

```

## `uglify/numbers/issue_3547_3`

- size: oxc 89 vs reference 81 (no whitespaces: +8, formatted: +12)

```js
var a = '3';
[
	a + '2' + 1,
	a + '2' - 1,
	a - '2' + 1,
	a - '2' - 1
].forEach(function(n) {
	console.log(typeof n, n);
});

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,8 @@
 [
 	a + '21',
 	a + '2' - 1,
-	a - 1,
-	a - 3
+	a - '2' + 1,
+	a - '2' - 1
 ].forEach(function(n) {
 	console.log(typeof n, n);
 });

```

## `uglify/numbers/issue_3547_4`

- size: oxc 90 vs reference 82 (no whitespaces: +8, formatted: +12)

```js
var a = '2';
[
	'3' + a + 1,
	'3' + a - 1,
	'3' - a + 1,
	'3' - a - 1
].forEach(function(n) {
	console.log(typeof n, n);
});

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,8 @@
 [
 	'3' + a + 1,
 	'3' + a - 1,
-	4 - a,
-	2 - a
+	'3' - a + 1,
+	'3' - a - 1
 ].forEach(function(n) {
 	console.log(typeof n, n);
 });

```

## `uglify/numbers/literal_infinity`

- size: oxc 32 vs reference 24 (no whitespaces: +8, formatted: +4)

```js
console.log(Infinity, -Infinity);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(1 / 0, -(1 / 0));
+console.log(Infinity, -Infinity);

```

## `uglify/properties/issue_2513`

- size: oxc 147 vs reference 139 (no whitespaces: +8, formatted: +8)

```js
!function(Infinity, NaN, undefined) {
	console.log('a'[1 / 0], 'b'['Infinity']);
	console.log('c'[0 / 0], 'd'['NaN']);
	console.log('e'[void 0], 'f'['undefined']);
}(0, 0, 0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!function(Infinity, NaN, undefined) {
-	console.log('a'[1 / 0], 'b'[1 / 0]);
-	console.log('c'.NaN, 'd'.NaN);
-	console.log('e'[void 0], 'f'[void 0]);
-}(0, 0, 0);
+(function(Infinity, NaN, undefined) {
+	console.log('a'[1 / 0], 'b'.Infinity);
+	console.log('c'[0 / 0], 'd'.NaN);
+	console.log('e'[void 0], 'f'.undefined);
+})(0, 0, 0);

```

## `uglify/reduce_vars/issue_2799_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 125 vs reference 117 (no whitespaces: +8, formatted: +13)

```js
console.log(function() {
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
}()(5));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,12 @@
 console.log(function() {
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
 }()(5));

```

## `uglify/reduce_vars/obj_for_1`

- tags: `join vars`, `remove unused`
- size: oxc 49 vs reference 41 (no whitespaces: +8, formatted: +11)

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

## `uglify/reduce_vars/toplevel_on`

- tags: `join vars`, `remove unused`
- size: oxc 23 vs reference 15 (no whitespaces: +8, formatted: +11)

```js
var x = 3;
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(3);
+var x = 3;
+console.log(x);

```

## `uglify/reduce_vars/var_assign_5`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 61 vs reference 53 (no whitespaces: +8, formatted: +13)

```js
!function() {
	var a;
	!function(b) {
		a = 2;
		console.log(a, b);
	}(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-!function() {
-	!function(b) {
-		console.log(2, void 0);
-	}();
-}();
+(function() {
+	var a;
+	(function(b) {
+		a = 2, console.log(a, b);
+	})(a);
+})();

```

## `uglify/regexp/var_test`

- tags: `join vars`
- size: oxc 70 vs reference 62 (no whitespaces: +8, formatted: +9)

```js
var r = /a/;
while (r.test('AAA')) console.log('FAIL');
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var r = /a/;
-while (false) console.log('FAIL');
+for (; r.test('AAA');) console.log('FAIL');
 console.log('PASS');

```

## `uglify/rests/retain_destructured_object_2`

- tags: `remove unused`
- size: oxc 86 vs reference 78 (no whitespaces: +8, formatted: +8)

```js
var { foo: [a], ...b } = {
	foo: ['FAIL'],
	bar: 'PASS',
	baz: 42
};
for (var k in b) console.log(k, b[k]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var { foo: {}, ...b } = {
-	foo: 0,
+var { foo: [a], ...b } = {
+	foo: ['FAIL'],
 	bar: 'PASS',
 	baz: 42
 };

```

## `uglify/rests/retain_funarg_destructured_object_2`

- tags: `remove unused`
- size: oxc 66 vs reference 58 (no whitespaces: +8, formatted: +11)

```js
console.log(function({ p: a, ...b }) {
	return b;
}({ p: 'FAIL' }).p || 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function({ p: a, ...b }) {
 	return b;
-}({}).p || 'PASS');
+}({ p: 'FAIL' }).p || 'PASS');

```

## `uglify/sandbox/issue_5197`

- size: oxc 64 vs reference 56 (no whitespaces: +8, formatted: +8)

```js
function f(async) {
	async(')=>{}');
}
console.log('' + this.__proto__);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function f(a) {
-	a(')=>{}');
+function f(async) {
+	async(')=>{}');
 }
 console.log('' + this.__proto__);

```

## `uglify/sequences/delete_seq_4`

- tags: `sequences`
- size: oxc 202 vs reference 194 (no whitespaces: +8, formatted: +8)

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
-console.log(delete void f()), console.log(delete void f()), console.log((f(), delete (1 / 0))), console.log((f(), delete (1 / 0))), console.log(delete (f(), NaN)), console.log((f(), delete (0 / 0)));
+console.log(delete (f(), undefined)), console.log(delete (f(), void 0)), console.log(delete (f(), Infinity)), console.log(delete (f(), 1 / 0)), console.log(delete (f(), NaN)), console.log(delete (f(), NaN));

```

## `uglify/sequences/for_init_var`

- tags: `join vars`
- size: oxc 89 vs reference 81 (no whitespaces: +8, formatted: +10)

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

## `uglify/switches/drop_case_4`

- size: oxc 61 vs reference 53 (no whitespaces: +8, formatted: +10)

```js
switch (0) {
	case [a, typeof b]:
	default: var a;
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 switch (0) {
-	case [a, typeof b]: var a;
+	case [a, typeof b]:
+	default: var a;
 }
 console.log('PASS');

```

## `uglify/varify/issue_5697_1`

- tags: `join vars`, `remove unused`
- size: oxc 113 vs reference 105 (no whitespaces: +8, formatted: +5)

```js
console.log(function() {
	f();
	return typeof a;
	function f() {
		(function() {
			for (var k in { foo: 42 }) {
				const a = k;
				console.log(a);
			}
		})();
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 console.log(function() {
-	(function() {
-		for (var k in { foo: 42 }) {
-			var a = k;
-			console.log(a);
-		}
-	})();
+	f();
 	return typeof a;
+	function f() {
+		(function() {
+			for (var k in { foo: 42 }) console.log(k);
+		})();
+	}
 }());

```

## `uglify/varify/issue_5697_2`

- tags: `join vars`, `remove unused`
- size: oxc 126 vs reference 118 (no whitespaces: +8, formatted: +5)

```js
'use strict';
console.log(function() {
	f();
	return typeof a;
	function f() {
		(function() {
			for (var k in { foo: 42 }) {
				let a = k;
				console.log(a);
			}
		})();
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 'use strict';
 console.log(function() {
-	(function() {
-		for (var k in { foo: 42 }) {
-			var a = k;
-			console.log(a);
-		}
-	})();
+	f();
 	return typeof a;
+	function f() {
+		(function() {
+			for (var k in { foo: 42 }) console.log(k);
+		})();
+	}
 }());

```

## `uglify/varify/issue_5697_3`

- tags: `join vars`, `remove unused`
- size: oxc 113 vs reference 105 (no whitespaces: +8, formatted: +5)

```js
console.log(function() {
	f();
	return typeof a;
	function f() {
		(function() {
			for (var k in { foo: 42 }) {
				const a = k;
				console.log(a);
			}
		})();
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 console.log(function() {
-	(function() {
-		for (var k in { foo: 42 }) {
-			var a = k;
-			console.log(a);
-		}
-	})();
+	f();
 	return typeof a;
+	function f() {
+		(function() {
+			for (var k in { foo: 42 }) console.log(k);
+		})();
+	}
 }());

```

## `uglify/varify/issue_5697_4`

- tags: `join vars`, `remove unused`
- size: oxc 126 vs reference 118 (no whitespaces: +8, formatted: +5)

```js
'use strict';
console.log(function() {
	f();
	return typeof a;
	function f() {
		(function() {
			for (var k in { foo: 42 }) {
				let a = k;
				console.log(a);
			}
		})();
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 'use strict';
 console.log(function() {
-	(function() {
-		for (var k in { foo: 42 }) {
-			var a = k;
-			console.log(a);
-		}
-	})();
+	f();
 	return typeof a;
+	function f() {
+		(function() {
+			for (var k in { foo: 42 }) console.log(k);
+		})();
+	}
 }());

```

## `uglify/yields/drop_fname`

- tags: `join vars`, `remove unused`
- size: oxc 52 vs reference 44 (no whitespaces: +8, formatted: +9)

```js
function* yield() {
	console.log('PASS');
}
yield().next();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-(function* () {
+function* yield() {
 	console.log('PASS');
-})().next();
+}
+yield().next();

```

## `uglify/yields/issue_5456`

- tags: `join vars`
- size: oxc 167 vs reference 159 (no whitespaces: +8, formatted: +15)

```js
var a = true;
(function() {
	(function(b, c) {
		var d = function* () {
			c = null;
		}();
		var e = function() {
			if (c) console.log(typeof d);
			while (b);
		}();
	})(function(i) {
		return console.log('foo') && i;
	}(a));
})();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
-var a = true;
+var a = !0;
 (function() {
-	b = (i = a, console.log('foo') && i), d = function* () {
-		c = null;
-	}(), e = function() {
-		if (c) console.log(typeof d);
-		while (b);
-	}(), void 0;
-	var b, c, d, e;
-	var i;
+	(function(b, c) {
+		var d = function* () {
+			c = null;
+		}(), e = function() {
+			c && console.log(typeof d);
+			for (; b;);
+		}();
+	})(function(i) {
+		return console.log('foo') && i;
+	}(a));
 })();

```

## `uglify/yields/issue_5526`

- size: oxc 129 vs reference 121 (no whitespaces: +8, formatted: +14)

```js
(async function* () {
	try {
		return function() {
			while (console.log('foo'));
		}();
	} finally {
		console.log('bar');
	}
})().next();
console.log('baz');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 (async function* () {
 	try {
-		while (console.log('foo'));
-		return void 0;
+		return function() {
+			for (; console.log('foo'););
+		}();
 	} finally {
 		console.log('bar');
 	}

```

## `uglify/arrows/drop_value`

- size: oxc 30 vs reference 21 (no whitespaces: +9, formatted: +14)

```js
((a, b) => a + b)(console.log(42));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-void console.log(42);
+((a, b) => a + b)(console.log(42));

```

## `uglify/arrows/instanceof_lambda_4`

- size: oxc 30 vs reference 21 (no whitespaces: +9, formatted: +12)

```js
({ p: 'foo' }) instanceof (() => {});

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-[] instanceof (() => {});
+({ p: 'foo' }) instanceof (() => {});

```

## `uglify/assignments/issue_4924_1`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 51 (no whitespaces: +9, formatted: +13)

```js
var a, b;
console.log('PASS');
a = function() {};
b = function() {}(b ||= a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-var b;
+var a, b;
 console.log('PASS');
-b = void (b ||= function() {});
+a = function() {};
+b = (b ||= a, void 0);

```

## `uglify/awaits/drop_fname`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 42 (no whitespaces: +9, formatted: +10)

```js
async function await() {
	console.log('PASS');
}
await();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-(async function() {
+async function await() {
 	console.log('PASS');
-})();
+}
+await();

```

## `uglify/awaits/instanceof_lambda_4`

- size: oxc 41 vs reference 32 (no whitespaces: +9, formatted: +12)

```js
({ p: 'foo' }) instanceof async function() {};

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-[] instanceof async function() {};
+({ p: 'foo' }) instanceof async function() {};

```

## `uglify/booleans/de_morgan_3d`

- size: oxc 154 vs reference 145 (no whitespaces: +9, formatted: +15)

```js
function f(a, b, c) {
	return a || a && b && c;
}
console.log(f(null, false), f(null, false, {}), f(null, true), f(null, true, {}));
console.log(f(42, false), f(42, false, {}), f(42, true), f(42, true, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b, c) {
-	return a;
+	return a || a && b && c;
 }
 console.log(f(null, !1), f(null, !1, {}), f(null, !0), f(null, !0, {}));
 console.log(f(42, !1), f(42, !1, {}), f(42, !0), f(42, !0, {}));

```

## `uglify/classes/issue_5489`

- size: oxc 87 vs reference 78 (no whitespaces: +9, formatted: +12)

```js
(class {
	[console.log('foo')];
	static {
		console.log('bar');
	}
	static [console.log('baz')]() {}
});

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 (class {
-	[(console.log('foo'), console.log('baz'))];
+	[console.log('foo')];
 	static {
 		console.log('bar');
 	}
+	static [console.log('baz')]() {}
 });

```

## `uglify/collapse_vars/collapse_vars_regexp`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 449 vs reference 440 (no whitespaces: +9, formatted: +15)

```js
function f1() {
	var k = 9;
	var rx = /[A-Z]+/;
	return [rx, k];
}
function f2() {
	var rx = /ab*/g;
	return function(s) {
		return rx.exec(s);
	};
}
function f3() {
	var rx = /ab*/g;
	return function() {
		return rx;
	};
}
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = /ab*/g;
	while (result = rx.exec(s)) console.log(result[0]);
})();
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = f2();
	while (result = rx(s)) console.log(result[0]);
})();
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = f3();
	while (result = rx().exec(s)) console.log(result[0]);
})();

```

```diff
--- reference
+++ oxc
@@ -14,14 +14,9 @@
 	};
 }
 (function() {
-	var result, rx = /ab*/g;
-	while (result = rx.exec('acdabcdeabbb')) console.log(result[0]);
-})();
-(function() {
-	var result, rx = f2();
-	while (result = rx('acdabcdeabbb')) console.log(result[0]);
-})();
-(function() {
-	var result, rx = f3();
-	while (result = rx().exec('acdabcdeabbb')) console.log(result[0]);
+	for (var result, s = 'acdabcdeabbb', rx = /ab*/g; result = rx.exec(s);) console.log(result[0]);
+})(), (function() {
+	for (var result, s = 'acdabcdeabbb', rx = f2(); result = rx(s);) console.log(result[0]);
+})(), (function() {
+	for (var result, s = 'acdabcdeabbb', rx = f3(); result = rx().exec(s);) console.log(result[0]);
 })();

```

## `uglify/collapse_vars/undeclared_1`

- tags: `join vars`, `remove unused`
- size: oxc 39 vs reference 30 (no whitespaces: +9, formatted: +14)

```js
function f(x, y) {
	var a;
	a = x;
	b = y;
	return b + a;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 function f(x, y) {
-	return (b = y) + x;
+	var a = x;
+	b = y;
+	return b + a;
 }

```

## `uglify/collapse_vars/undeclared_3`

- tags: `join vars`, `remove unused`
- size: oxc 41 vs reference 32 (no whitespaces: +9, formatted: +14)

```js
function f(x, y) {
	var a;
	a = x;
	b = y;
	return b + a();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 function f(x, y) {
-	return (b = y) + x();
+	var a = x;
+	b = y;
+	return b + a();
 }

```

## `uglify/concat-strings/concat_9`

- tags: `join vars`
- size: oxc 105 vs reference 96 (no whitespaces: +9, formatted: +19)

```js
var a = 'foo';
console.log(12 + (34 + a), null + (34 + a), 12 + (null + a), false + (34 + a), 12 + (false + a), 'bar' + (34 + a), 12 + ('bar' + a));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 'foo';
-console.log('1234' + a, 'null34' + a, '12null' + a, !1 + (34 + a), 12 + (!1 + a), 'bar34' + a, '12bar' + a);
+console.log(12 + (34 + a), null + (34 + a), 12 + (null + a), !1 + (34 + a), 12 + (!1 + a), 'bar' + (34 + a), 12 + ('bar' + a));

```

## `uglify/conditionals/cond_14`

- tags: `sequences`
- size: oxc 60 vs reference 51 (no whitespaces: +9, formatted: +13)

```js
function f(a) {
	if (a) if (a) console.log('PASS');
	else console.log('FAIL');
}
f(null);
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a) {
-	a && console.log('PASS');
+	a && console.log(a ? 'PASS' : 'FAIL');
 }
-f(null);
-f(42);
+f(null), f(42);

```

## `uglify/conditionals/ifs_6`

- tags: `sequences`
- size: oxc 83 vs reference 74 (no whitespaces: +9, formatted: +10)

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
@@ -1,4 +1,2 @@
-var x, y;
-x = foo || bar || baz || boo ? 20 : 10;
-x[foo] = y ? 10 : 20;
-foo ? x[bar] = 10 : x[bar] = 20;
+var x = !foo && !bar && !baz && !boo ? 10 : 20, y;
+y ? x[foo] = 10 : x[foo] = 20, foo ? x[bar] = 10 : x[bar] = 20;

```

## `uglify/default-values/issue_5246_2`

- tags: `remove unused`
- size: oxc 54 vs reference 45 (no whitespaces: +9, formatted: +13)

```js
(function f(a = 'FAIL', [] = 42) {
	console.log(a);
})('PASS', []);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function(a = 'FAIL') {
+(function(a = 'FAIL', [] = 42) {
 	console.log(a);
-})('PASS');
+})('PASS', []);

```

## `uglify/destructured/process_returns`

- size: oxc 84 vs reference 75 (no whitespaces: +9, formatted: +13)

```js
console.log(function({ length }) {
	return length ? 'FAIL' : 'PASS';
}(function() {
	return 42;
}));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 console.log(function({ length }) {
 	return length ? 'FAIL' : 'PASS';
-}(function() {}));
+}(function() {
+	return 42;
+}));

```

## `uglify/destructured/redefine_arguments_1`

- tags: `remove unused`
- size: oxc 25 vs reference 16 (no whitespaces: +9, formatted: +9)

```js
function f([arguments]) {}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-function f([]) {}
+function f([arguments]) {}

```

## `uglify/directives/drop_lone_use_strict`

- tags: `remove unused`
- size: oxc 56 vs reference 47 (no whitespaces: +9, formatted: +13)

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
@@ -1,3 +1,6 @@
-function f1() {}
-function f2() {}
-(function() {})();
+function f1() {
+	'use strict';
+}
+function f2() {
+	'use strict';
+}

```

## `uglify/drop-unused/double_assign_2`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 46 (no whitespaces: +9, formatted: +12)

```js
for (var i = 0; i < 2; i++) a = void 0, a = {}, console.log(a);
var a;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-for (var i = 0; i < 2; i++) a = {}, console.log(a);
+for (var i = 0; i < 2; i++) a = void 0, a = {}, console.log(a);
 var a;

```

## `uglify/drop-unused/issue_2846`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 59 (no whitespaces: +9, formatted: +9)

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
-var c = function(a, b) {
-	a = 0;
+function f(a, b) {
+	var a = 0;
 	b && b(a);
-	return +a;
-}();
+	return a++;
+}
+var c = f();
 console.log(c);

```

## `uglify/drop-unused/issue_4806_2`

- tags: `sequences`, `remove unused`
- size: oxc 73 vs reference 64 (no whitespaces: +9, formatted: +12)

```js
O = { f: function() {
	console.log(this === O ? 'FAIL' : 'PASS');
} };
var a;
(a = 42, O.f)();
a;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 O = { f: function() {
 	console.log(this === O ? 'FAIL' : 'PASS');
-} }, (0, O.f)();
+} };
+var a;
+(a = 42, O.f)();

```

## `uglify/drop-unused/issue_4806_3`

- tags: `remove unused`
- size: oxc 73 vs reference 64 (no whitespaces: +9, formatted: +12)

```js
O = { f: function() {
	console.log(this === O ? 'FAIL' : 'PASS');
} };
var a;
(a = 42, O.f)();
a;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 O = { f: function() {
 	console.log(this === O ? 'FAIL' : 'PASS');
 } };
-(0, O.f)();
+var a;
+(a = 42, O.f)();

```

## `uglify/drop-unused/unused_funarg_2`

- tags: `remove unused`
- size: oxc 55 vs reference 46 (no whitespaces: +9, formatted: +13)

```js
console.log(function f(a, b, c, d, e) {
	return a + c;
}(14, 21, 28));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function(a, c) {
+console.log(function(a, b, c, d, e) {
 	return a + c;
-}(14, 28));
+}(14, 21, 28));

```

## `uglify/evaluate/and`

- size: oxc 371 vs reference 362 (no whitespaces: +9, formatted: +7)

```js
var a;
// compress these
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
// don't compress these
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
@@ -7,20 +6,21 @@
 a = condition / 5;
 a = 6 << condition;
 a = 7;
-a = false;
+a = !1;
 a = NaN;
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
+// don't compress these
+a = condition && !0;
 a = console.log('a') && 2;
 a = 4 - condition && 'string';
 a = 6 << condition && -4.5;
-a = condition && false;
+a = condition && !1;
 a = console.log('b') && NaN;
 a = console.log('c') && 0;
 a = 2 * condition && void 0;

```

## `uglify/evaluate/collapse_vars_regexp`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 449 vs reference 440 (no whitespaces: +9, formatted: +15)

```js
function f1() {
	var k = 9;
	var rx = /[A-Z]+/;
	return [rx, k];
}
function f2() {
	var rx = /ab*/g;
	return function(s) {
		return rx.exec(s);
	};
}
function f3() {
	var rx = /ab*/g;
	return function() {
		return rx;
	};
}
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = /ab*/g;
	while (result = rx.exec(s)) console.log(result[0]);
})();
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = f2();
	while (result = rx(s)) console.log(result[0]);
})();
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = f3();
	while (result = rx().exec(s)) console.log(result[0]);
})();

```

```diff
--- reference
+++ oxc
@@ -14,14 +14,9 @@
 	};
 }
 (function() {
-	var result, rx = /ab*/g;
-	while (result = rx.exec('acdabcdeabbb')) console.log(result[0]);
-})();
-(function() {
-	var result, rx = f2();
-	while (result = rx('acdabcdeabbb')) console.log(result[0]);
-})();
-(function() {
-	var result, rx = f3();
-	while (result = rx().exec('acdabcdeabbb')) console.log(result[0]);
+	for (var result, s = 'acdabcdeabbb', rx = /ab*/g; result = rx.exec(s);) console.log(result[0]);
+})(), (function() {
+	for (var result, s = 'acdabcdeabbb', rx = f2(); result = rx(s);) console.log(result[0]);
+})(), (function() {
+	for (var result, s = 'acdabcdeabbb', rx = f3(); result = rx().exec(s);) console.log(result[0]);
 })();

```

## `uglify/evaluate/eager_evaluate`

- tags: `join vars`, `remove unused`
- size: oxc 95 vs reference 86 (no whitespaces: +9, formatted: +26)

```js
function d(x, y) {
	return x / y;
}
console.log(0 / 3, 1 / 64, 4 / 7, 7 / 7);
console.log(d(0, 3), d(1, 64), d(4, 7), d(7, 7));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-console.log(0, .015625, .5714285714285714, 1);
-console.log(0, .015625, .5714285714285714, 1);
+function d(x, y) {
+	return x / y;
+}
+console.log(0, 1 / 64, 4 / 7, 1);
+console.log(d(0, 3), d(1, 64), d(4, 7), d(7, 7));

```

## `uglify/evaluate/issue_3387_2`

- size: oxc 26 vs reference 17 (no whitespaces: +9, formatted: +13)

```js
console.log(1 + (2 + '3'[4]));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(NaN);
+console.log(1 + (2 + '3'[4]));

```

## `uglify/evaluate/recursive_function_1`

- tags: `join vars`, `remove unused`
- size: oxc 78 vs reference 69 (no whitespaces: +9, formatted: +10)

```js
function factorial(a) {
	return a > 0 ? a * factorial(a - 1) : 1;
}
console.log(factorial(5));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log(function factorial(a) {
+function factorial(a) {
 	return a > 0 ? a * factorial(a - 1) : 1;
-}(5));
+}
+console.log(factorial(5));

```

## `uglify/functions/duplicate_argnames_3`

- tags: `join vars`, `remove unused`
- size: oxc 83 vs reference 74 (no whitespaces: +9, formatted: +15)

```js
var a = 'FAIL';
function f(b, b, b) {
	b && (a = 'PASS');
}
f(null, 0, console, '42'.toString());
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 var a = 'FAIL';
-b = console, '42'.toString(), b && (a = 'PASS');
-var b;
+function f(b, b, b) {
+	b && (a = 'PASS');
+}
+f(null, 0, console, '42');
 console.log(a);

```

## `uglify/functions/issue_3076`

- tags: `sequences`, `remove unused`
- size: oxc 130 vs reference 121 (no whitespaces: +9, formatted: +12)

```js
var c = 'PASS';
(function(b) {
	var n = 2;
	while (--b + function() {
		e && (c = 'FAIL');
		e = 5;
		return 1;
		try {
			var a = 5;
		} catch (e) {
			var e;
		}
	}().toString() && --n > 0);
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
-	while (--b + (e = void 0, e && (c = 'FAIL'), e = 5, 1 .toString()) && --n > 0);
-	var e;
+	for (var n = 2; --b + function() {
+		return e && (c = 'FAIL'), e = 5, 1;
+		var e;
+	}().toString() && --n > 0;);
 })(2), console.log(c);

```

## `uglify/functions/issue_5895_2`

- tags: `remove unused`
- size: oxc 127 vs reference 118 (no whitespaces: +9, formatted: +18)

```js
(function() {
	for (var a in [1, 2]) try {
		return function() {
			(function f(b) {
				b[b = 42];
			})();
			while (!console);
		}();
	} catch (e) {
		console.log('foo');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,12 @@
 (function() {
 	for (var a in [1, 2]) try {
-		b = void 0;
-		void b[b = 42];
-		var b;
-		while (!console);
-		return;
-	} catch (e) {
+		return function() {
+			(function(b) {
+				b[b = 42];
+			})();
+			for (; !console;);
+		}();
+	} catch {
 		console.log('foo');
 	}
 })();

```

## `uglify/hoist_vars/issue_4487_2`

- tags: `join vars`, `remove unused`, `keep function names`, `2 iterations`
- size: oxc 54 vs reference 45 (no whitespaces: +9, formatted: +13)

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
+var a = function f() {
 	var f = console.log(typeof f);
-}
-a();
+}, b = a();

```

## `uglify/hoist_vars/issue_4487_3`

- tags: `join vars`, `remove unused`, `keep function names`, `3 iterations`
- size: oxc 54 vs reference 45 (no whitespaces: +9, formatted: +16)

```js
var a = function f() {
	var f = console.log(typeof f);
};
var b = a();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function a() {
-	console.log(typeof void 0);
-})();
+var a = function f() {
+	var f = console.log(typeof f);
+}, b = a();

```

## `uglify/hoist_vars/issue_4489`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 44 vs reference 35 (no whitespaces: +9, formatted: +12)

```js
A = 0;
var o = !0 || null;
for (var k in o);
console.log(k);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-for (var k in !(A = 0));
+A = 0;
+var o = !0;
+for (var k in o);
 console.log(k);

```

## `uglify/if_return/identical_returns_1`

- tags: `sequences`
- size: oxc 95 vs reference 86 (no whitespaces: +9, formatted: +12)

```js
console.log(function() {
	if (console.log('foo')) return 42;
	else while (console.log('bar'));
	return 42;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 console.log(function() {
-	if (!console.log('foo')) while (console.log('bar'));
+	if (console.log('foo')) return 42;
+	for (; console.log('bar'););
 	return 42;
 }());

```

## `uglify/issue-281/issue_1758`

- tags: `sequences`
- size: oxc 87 vs reference 78 (no whitespaces: +9, formatted: +16)

```js
console.log(function(c) {
	var undefined = 42;
	return function() {
		c--;
		c--, c.toString();
		return;
	}();
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 console.log(function(c) {
 	var undefined = 42;
-	return c--, c--, void c.toString();
+	return function() {
+		c--, c--, c.toString();
+	}();
 }());

```

## `uglify/join_vars/join_object_assignments_Infinity`

- tags: `join vars`
- size: oxc 110 vs reference 101 (no whitespaces: +9, formatted: +8)

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
@@ -1,7 +1,6 @@
-var o = {
-	Infinity: 1,
-	Infinity: 2,
-	'-Infinity': 3,
-	'-Infinity': 4
-};
-console.log(o[1 / 0], o[1 / 0], o[-1 / 0], o[-1 / 0]);
+var o = {};
+o[Infinity] = 1;
+o[1 / 0] = 2;
+o[-Infinity] = 3;
+o[-1 / 0] = 4;
+console.log(o[Infinity], o[1 / 0], o[-Infinity], o[-1 / 0]);

```

## `uglify/join_vars/join_object_assignments_NaN_2`

- tags: `join vars`
- size: oxc 54 vs reference 45 (no whitespaces: +9, formatted: +8)

```js
var o = {};
o[NaN] = 1;
o[0 / 0] = 2;
console.log(o[NaN], o[NaN]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var o = {
-	NaN: 1,
-	NaN: 2
-};
-console.log(o.NaN, o.NaN);
+var o = {};
+o[NaN] = 1;
+o[NaN] = 2;
+console.log(o[NaN], o[NaN]);

```

## `uglify/join_vars/join_object_assignments_negative`

- tags: `join vars`
- size: oxc 62 vs reference 53 (no whitespaces: +9, formatted: +8)

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
@@ -1,6 +1,5 @@
-var o = {
-	0: 0,
-	0: 1,
-	'-1': 2
-};
+var o = {};
+o[0] = 0;
+o[-0] = 1;
+o[-1] = 2;
 console.log(o[0], o[-0], o[-1]);

```

## `uglify/loops/empty_for_in_used`

- tags: `remove unused`
- size: oxc 45 vs reference 36 (no whitespaces: +9, formatted: +14)

```js
for (var a in [
	1,
	2,
	3
]) {
	var b = a + 1;
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 	1,
 	2,
 	3
-]);
+]) var b = a + 1;
 console.log(a);

```

## `uglify/loops/loop_if_break`

- size: oxc 147 vs reference 138 (no whitespaces: +9, formatted: +19)

```js
function f(a, b) {
	try {
		while (a) {
			if (b) {
				break;
				var c = 42;
				console.log(c);
			} else {
				var d = false;
				throw d;
			}
		}
	} catch (e) {
		console.log('E:', e);
	}
	console.log(a, b, c, d);
}
f(0, 0);
f(0, 1);
f(1, 0);
f(1, 1);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
 function f(a, b) {
 	try {
-		for (; a && !b;) {
-			var d = false;
+		for (; a;) if (b) {
+			break;
+			var c;
+		} else {
+			var d = !1;
 			throw d;
-			var c;
 		}
 	} catch (e) {
 		console.log('E:', e);

```

## `uglify/merge_vars/issue_4135`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 55 (no whitespaces: +9, formatted: +13)

```js
var a = 0, b = 0;
--b;
a++;
if (!a) var c = function() {
	var d = 0;
	function f() {
		d && d.p;
	}
	f();
	this;
}(a++);
console.log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a = 0;
-0;
+var a = 0, b = 0;
+--b;
 a++;
-if (!a) var c = void a++;
-console.log(a, -1, c);
+if (!a) var c = (a++, void 0);
+console.log(a, b, c);

```

## `uglify/pure_getters/collapse_rhs_setter`

- tags: `join vars`
- size: oxc 93 vs reference 84 (no whitespaces: +9, formatted: +10)

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
@@ -1,7 +1,7 @@
 try {
-	console.log({ set length(v) {
+	console.log(({ set length(v) {
 		throw 'PASS';
-	} }.length = 'FAIL');
+	} }.length = 'FAIL', 'FAIL'));
 } catch (e) {
 	console.log(e);
 }

```

## `uglify/pure_getters/issue_4135`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 64 vs reference 55 (no whitespaces: +9, formatted: +13)

```js
var a = 0, b = 0;
--b;
a++;
if (!a) var c = function() {
	var d = 0;
	function f() {
		d && d.p;
	}
	f();
	this;
}(a++);
console.log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a = 0;
-0;
+var a = 0, b = 0;
+--b;
 a++;
-if (!a) var c = void a++;
-console.log(a, -1, c);
+if (!a) var c = (a++, void 0);
+console.log(a, b, c);

```

## `uglify/pure_getters/this_toString`

- tags: `pure getters`
- size: oxc 47 vs reference 38 (no whitespaces: +9, formatted: +6)

```js
console.log({ f() {
	return this.toString();
} }.f());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log({ f() {
-	return '' + this;
+	return this.toString();
 } }.f());

```

## `uglify/reduce_vars/array_forin_1`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 35 (no whitespaces: +9, formatted: +11)

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
@@ -1,5 +1,6 @@
-for (var b in [
+var a = [
 	1,
 	2,
 	3
-]) console.log(b);
+];
+for (var b in a) console.log(b);

```

## `uglify/reduce_vars/flatten_iife`

- tags: `join vars`, `remove unused`
- size: oxc 89 vs reference 80 (no whitespaces: +9, formatted: +13)

```js
var a = 'FAIL';
while (!console);
a++;
(function() {
	while (!console);
	a = 'PASS';
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-var a;
-while (!console);
-0;
+var a = 'FAIL';
+for (; !console;);
+a++;
 (function() {
-	while (!console);
+	for (; !console;);
 	a = 'PASS';
 })();
 console.log(a);

```

## `uglify/reduce_vars/issue_2799_2`

- tags: `join vars`, `remove unused`
- size: oxc 94 vs reference 85 (no whitespaces: +9, formatted: +10)

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

## `uglify/reduce_vars/issue_3140_2`

- tags: `join vars`, `remove unused`
- size: oxc 159 vs reference 150 (no whitespaces: +9, formatted: +14)

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

## `uglify/reduce_vars/toplevel_on_loops_3`

- tags: `join vars`, `remove unused`
- size: oxc 22 vs reference 13 (no whitespaces: +9, formatted: +13)

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

## `uglify/reduce_vars/var_assign_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 44 vs reference 35 (no whitespaces: +9, formatted: +13)

```js
!function() {
	var a;
	if (a = 2) console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-!function() {
-	if (2) console.log(2);
-}();
+(function() {
+	var a;
+	(a = 2) && console.log(a);
+})();

```

## `uglify/regexp/var_exec`

- tags: `join vars`
- size: oxc 70 vs reference 61 (no whitespaces: +9, formatted: +9)

```js
var r = /a/;
while (r.exec('AAA')) console.log('FAIL');
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var r = /a/;
-for (; null;) console.log('FAIL');
+for (; r.exec('AAA');) console.log('FAIL');
 console.log('PASS');

```

## `uglify/rests/issue_5246_1`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 65 (no whitespaces: +9, formatted: +11)

```js
console.log(typeof function([, ...a]) {
	return this && a;
}([, function() {}])[0]);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(typeof function() {
-	return this && [function() {}];
-}()[0]);
+console.log(typeof function([, ...a]) {
+	return this && a;
+}([, function() {}])[0]);

```

## `uglify/rests/retain_destructured_array`

- tags: `remove unused`
- size: oxc 60 vs reference 51 (no whitespaces: +9, formatted: +15)

```js
var [a, ...b] = [
	'FAIL',
	'PASS',
	42
];
console.log.apply(console, b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
-var [ ...b] = ['PASS', 42];
+var [a, ...b] = [
+	'FAIL',
+	'PASS',
+	42
+];
 console.log.apply(console, b);

```

## `uglify/sequences/delete_seq_6`

- size: oxc 31 vs reference 22 (no whitespaces: +9, formatted: +11)

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

## `uglify/templates/unsafe_evaluate`

- size: oxc 30 vs reference 21 (no whitespaces: +9, formatted: +9)

```js
console.log(String.raw`\uFo`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('\\uFo');
+console.log(String.raw`\uFo`);

```

## `uglify/awaits/functions_anonymous`

- tags: `join vars`, `remove unused`
- size: oxc 61 vs reference 51 (no whitespaces: +10, formatted: +12)

```js
var await = async function() {
	console.log('PASS');
};
await(await);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-async function await() {
+var await = async function() {
 	console.log('PASS');
-}
-await();
+};
+await(await);

```

## `uglify/awaits/functions_inner_var`

- tags: `join vars`, `remove unused`
- size: oxc 58 vs reference 48 (no whitespaces: +10, formatted: +12)

```js
var await = function a() {
	var a;
	console.log(a, a);
};
await(await);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function await() {
+var await = function() {
 	var a;
 	console.log(a, a);
-}
-await();
+};
+await(await);

```

## `uglify/awaits/reduce_iife_2`

- tags: `join vars`, `remove unused`
- size: oxc 48 vs reference 38 (no whitespaces: +10, formatted: +15)

```js
var a = 21;
(async function() {
	console.log(a + a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
+var a = 21;
 (async function() {
-	console.log(42);
+	console.log(a + a);
 })();

```

## `uglify/booleans/negated_if`

- tags: `sequences`
- size: oxc 65 vs reference 55 (no whitespaces: +10, formatted: +13)

```js
console.log(function(a) {
	if (!a) return a ? 'FAIL' : 'PASS';
}(!console));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function(a) {
-	if (!a) return 'PASS';
+	if (!a) return a ? 'FAIL' : 'PASS';
 }(!console));

```

## `uglify/classes/unused_await_strict`

- tags: `remove unused`
- size: oxc 89 vs reference 79 (no whitespaces: +10, formatted: +16)

```js
'use strict';
var await = 'PASS';
(async function() {
	class A {
		static p = console.log(await);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 'use strict';
 var await = 'PASS';
 (async function() {
-	(() => console.log(await))();
+	class A {
+		static p = console.log(await);
+	}
 })();

```

## `uglify/collapse_vars/assign_undeclared`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 57 (no whitespaces: +10, formatted: +13)

```js
var A = (console.log(42), function() {});
B = new A();
console.log(typeof B);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(42);
-B = new function() {}();
+var A = (console.log(42), function() {});
+B = new A();
 console.log(typeof B);

```

## `uglify/collapse_vars/collapse_rhs_this`

- tags: `join vars`
- size: oxc 88 vs reference 78 (no whitespaces: +10, formatted: +14)

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
@@ -1,6 +1,8 @@
 var a, b;
 function f() {
-	return b = a = this;
+	a = this;
+	b = this;
+	return this;
 }
 var c = f();
 console.log(a === b, b === c, c === a);

```

## `uglify/collapse_vars/double_def_2`

- tags: `join vars`, `remove unused`
- size: oxc 19 vs reference 9 (no whitespaces: +10, formatted: +16)

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

## `uglify/collapse_vars/unsafe_builtin_2`

- tags: `join vars`, `remove unused`
- size: oxc 32 vs reference 22 (no whitespaces: +10, formatted: +14)

```js
A = 'PASS';
var a = A;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(A = 'PASS');
+A = 'PASS';
+var a = A;
+console.log(a);

```

## `uglify/conditionals/cond_9`

- tags: `sequences`
- size: oxc 199 vs reference 189 (no whitespaces: +10, formatted: +2)

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
@@ -1,13 +1,3 @@
 function f(x, y) {
-	g() ? x(1) : x(2);
-	x, (y || x)();
-	x ? y(a, b) : y(d, b, c);
-	x, y(a, b, c);
-	y(a, b, x ? c : f);
-	y(a, x ? b : e, c);
-	x ? y(a, b, c) : y(a, e, f);
-	y(x ? a : d, b, c);
-	x ? y(a, b, c) : y(d, b, f);
-	x ? y(a, b, c) : y(d, e, c);
-	x ? y(a, b, c) : y(d, e, f);
+	g() ? x(1) : x(2), (y || x)(), x ? y(a, b) : y(d, b, c), y(a, b, c), x ? y(a, b, c) : y(a, b, f), x ? y(a, b, c) : y(a, e, c), x ? y(a, b, c) : y(a, e, f), y(x ? a : d, b, c), x ? y(a, b, c) : y(d, b, f), x ? y(a, b, c) : y(d, e, c), x ? y(a, b, c) : y(d, e, f);
 }

```

## `uglify/conditionals/conditional_assignments_1`

- tags: `sequences`
- size: oxc 139 vs reference 129 (no whitespaces: +10, formatted: +12)

```js
function f(a, b, c, d) {
	a = b;
	if (c) a = d;
	return a;
}
function g(a, b, c, d) {
	a = b;
	if (c);
	else a = d;
	return a;
}
console.log(f(0, 'FAIL', 1, 'PASS'), g(0, 'PASS', 1, 'FAIL'));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(a, b, c, d) {
-	return a = c ? d : b, a;
+	return a = b, c && (a = d), a;
 }
 function g(a, b, c, d) {
-	return a = c ? b : d, a;
+	return a = b, c || (a = d), a;
 }
 console.log(f(0, 'FAIL', 1, 'PASS'), g(0, 'PASS', 1, 'FAIL'));

```

## `uglify/dead-code/collapse_vars_assignment`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 36 vs reference 26 (no whitespaces: +10, formatted: +16)

```js
function f0(c) {
	var a = 3 / c;
	return a = a;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f0(c) {
-	return 3 / c;
+	var a = 3 / c;
+	return a = a;
 }

```

## `uglify/dead-code/unreachable_assign`

- size: oxc 49 vs reference 39 (no whitespaces: +10, formatted: +16)

```js
console.log(A = 'P' + (A = 'A' + (B = 'S' + (A = B = 'S'))), A, B);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(A = 'P' + 'A' + (B = 'S' + 'S'), A, B);
+console.log(A = 'P' + (A = 'A' + (B = 'S' + (A = B = 'S'))), A, B);

```

## `uglify/default-values/issue_4502_1`

- tags: `remove unused`
- size: oxc 72 vs reference 62 (no whitespaces: +10, formatted: +11)

```js
(function() {
	var a = 'PASS';
	(function(b = a++) {
		var a;
	})(void 0, console.log(a));
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function() {
 	var a = 'PASS';
-	void 0, console.log(a), a++, void 0;
+	(function(b = a++) {})(void 0, console.log(a));
 })();

```

## `uglify/default-values/issue_4502_2`

- tags: `remove unused`
- size: oxc 72 vs reference 62 (no whitespaces: +10, formatted: +11)

```js
(function() {
	var a = 'PASS';
	(function(b = a++) {})(void 0, console.log(a));
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function() {
 	var a = 'PASS';
-	void 0, console.log(a), a++, void 0;
+	(function(b = a++) {})(void 0, console.log(a));
 })();

```

## `uglify/default-values/issue_5057_4`

- tags: `remove unused`
- size: oxc 104 vs reference 94 (no whitespaces: +10, formatted: +14)

```js
(function(a) {
	(function f(b) {
		(function(a = console.log('FAIL 1')) {})(b);
		console.log(a);
	})('FAIL 2');
})('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 (function(a) {
-	var b = 'FAIL 2';
-	(function(a = console.log('FAIL 1')) {})(b);
-	console.log(a);
+	(function(b) {
+		(function(a = console.log('FAIL 1')) {})(b);
+		console.log(a);
+	})('FAIL 2');
 })('PASS');

```

## `uglify/default-values/issue_5246_1`

- tags: `remove unused`, `pure getters`
- size: oxc 50 vs reference 40 (no whitespaces: +10, formatted: +12)

```js
console.log(function({} = 42) {
	return 'PASS';
}('foo'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function() {
+console.log(function({} = 42) {
 	return 'PASS';
-}());
+}('foo'));

```

## `uglify/destructured/issue_4321`

- size: oxc 97 vs reference 87 (no whitespaces: +10, formatted: +16)

```js
try {
	console.log(function({}) {
		return function() {
			while (!console);
		}();
	}());
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 try {
-	console.log(([{}] = [], function() {
-		while (!console);
-	}()));
-} catch (e) {
+	console.log(function({}) {
+		return function() {
+			for (; !console;);
+		}();
+	}());
+} catch {
 	console.log('PASS');
 }

```

## `uglify/drop-unused/drop_var`

- tags: `remove unused`
- size: oxc 77 vs reference 67 (no whitespaces: +10, formatted: +11)

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

## `uglify/drop-unused/issue_4017_1`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 56 (no whitespaces: +10, formatted: +14)

```js
var a = 0;
console.log(function f() {
	var b = c &= 0;
	var c = a++ + (A = a);
	var d = c && c[f];
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var a = 0;
-console.log(function() {
+console.log(function f() {
 	c &= 0;
 	var c = a++ + (A = a);
+	c && c[f];
 }());

```

## `uglify/evaluate/best_of_evaluate`

- tags: `join vars`, `remove unused`
- size: oxc 95 vs reference 85 (no whitespaces: +10, formatted: +13)

```js
function d(x, y) {
	return x / y;
}
console.log(0 / 3, 1 / 64, 4 / 7, 7 / 7);
console.log(d(0, 3), d(1, 64), d(4, 7), d(7, 7));

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 	return x / y;
 }
 console.log(0, 1 / 64, 4 / 7, 1);
-console.log(0, .015625, d(4, 7), 1);
+console.log(d(0, 3), d(1, 64), d(4, 7), d(7, 7));

```

## `uglify/evaluate/unsafe_object_complex`

- tags: `join vars`
- size: oxc 57 vs reference 47 (no whitespaces: +10, formatted: +14)

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

## `uglify/exports/hoist_exports_1`

- size: oxc 44 vs reference 34 (no whitespaces: +10, formatted: +8)

```js
export { a };
export var b;
export function f() {}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var b;
-function f() {}
-export { a, b, f };
+export { a };
+export var b;
+export function f() {}

```

## `uglify/functions/issue_4655`

- tags: `join vars`, `remove unused`
- size: oxc 70 vs reference 60 (no whitespaces: +10, formatted: +3)

```js
(function f() {
	while (console.log('PASS')) {
		var g = function() {};
		for (var a in g) g();
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
 (function() {
-	for (; console.log('PASS');) {
-		function g() {}
-		;
-	}
+	for (; console.log('PASS');) for (var a in function() {});
 })();

```

## `uglify/functions/issue_5025`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 66 (no whitespaces: +10, formatted: +17)

```js
function f(a) {
	function g() {
		b = 42;
	}
	g(b = a);
	var b = this;
	console.log(typeof b);
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
 function f(a) {
-	b = a, void (b = 42);
+	function g() {
+		b = 42;
+	}
+	g(b = a);
 	var b = this;
 	console.log(typeof b);
 }

```

## `uglify/hoist_vars/issue_5378`

- size: oxc 72 vs reference 62 (no whitespaces: +10, formatted: +10)

```js
var a = 2;
while (a--) (function() {
	var b;
	var c;
	while (console.log(b));
	--b;
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 2;
-while (a--) {
-	b = void 0;
-	var b, c;
-	while (console.log(b));
+for (; a--;) (function() {
+	var b;
+	var c;
+	for (; console.log(b););
 	--b;
-}
+})();

```

## `uglify/if_return/issue_5595`

- tags: `sequences`
- size: oxc 81 vs reference 71 (no whitespaces: +10, formatted: +16)

```js
function f(a) {
	if (a) {
		var b;
		if (b++) return 'FAIL';
	} else return 'PASS';
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 function f(a) {
-	var b;
-	return a ? b++ ? 'FAIL' : void 0 : 'PASS';
+	if (a) {
+		var b;
+		if (b++) return 'FAIL';
+	} else return 'PASS';
 }
 console.log(f());

```

## `uglify/if_return/switch_return_4`

- tags: `sequences`
- size: oxc 110 vs reference 100 (no whitespaces: +10, formatted: +25)

```js
function f(a) {
	switch (a) {
		case console.log('foo'):
			if (console) {
				console.log('bar');
				return;
			}
			break;
		case 42: FAIL;
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
 function f(a) {
 	switch (a) {
 		case console.log('foo'):
-			console && console.log('bar');
+			if (console) {
+				console.log('bar');
+				return;
+			}
 			break;
 		case 42: FAIL;
 	}

```

## `uglify/issue-1052/defun_hoist_funs`

- size: oxc 78 vs reference 68 (no whitespaces: +10, formatted: +11)

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
@@ -1,6 +1,6 @@
 function e() {
 	function f() {}
-	function g() {}
+	if (window) function g() {}
+	else return;
 	function h() {}
-	if (!window);
 }

```

## `uglify/issue-2652/insert_semicolon`

- size: oxc 22 vs reference 12 (no whitespaces: +10, formatted: +10)

```js
var a;
/* foo */ var b;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-var b;
+/* foo */ var b;

```

## `uglify/issue-2652/unary_postfix`

- size: oxc 16 vs reference 6 (no whitespaces: +10, formatted: +10)

```js
a;
/* foo */ ++b;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 a;
-++b;
+/* foo */ ++b;

```

## `uglify/join_vars/conditional_assignments_1`

- tags: `join vars`, `sequences`
- size: oxc 139 vs reference 129 (no whitespaces: +10, formatted: +12)

```js
function f(b, c, d) {
	var a = b;
	if (c) a = d;
	return a;
}
function g(b, c, d) {
	var a = b;
	if (c);
	else a = d;
	return a;
}
console.log(f('FAIL', 1, 'PASS'), g('PASS', 1, 'FAIL'));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 function f(b, c, d) {
-	var a = c ? d : b;
-	return a;
+	var a = b;
+	return c && (a = d), a;
 }
 function g(b, c, d) {
-	var a = c ? b : d;
-	return a;
+	var a = b;
+	return c || (a = d), a;
 }
 console.log(f('FAIL', 1, 'PASS'), g('PASS', 1, 'FAIL'));

```

## `uglify/keep_fargs/issue_2436_13`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 105 vs reference 95 (no whitespaces: +10, formatted: +14)

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
-	(function() {
-		(function() {
-			a && (a.null = 'FAIL');
-		})();
-	})();
+	function f(b) {
+		(function(b) {
+			var b = b && (b.null = 'FAIL');
+		})(a);
+	}
+	f();
 })();
 console.log(a);

```

## `uglify/let/reduce_vars_1`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 40 (no whitespaces: +10, formatted: +15)

```js
'use strict';
let a = 'PASS';
console.log(a);
a = 'FAIL';

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 'use strict';
-console.log('PASS');
-'FAIL';
+let a = 'PASS';
+console.log(a);
+a = 'FAIL';

```

## `uglify/merge_vars/issue_4155`

- tags: `join vars`
- size: oxc 129 vs reference 119 (no whitespaces: +10, formatted: +18)

```js
(function() {
	try {
		throw 'PASS';
	} catch (e) {
		var a;
		(function() {
			console.log(e, a);
		})(a = NaN);
	}
	var e = function() {};
	e && console.log(typeof e);
})();

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,9 @@
 		throw 'PASS';
 	} catch (e) {
 		var a;
-		a = NaN, void console.log(e, a);
+		(function() {
+			console.log(e, a);
+		})(a = NaN);
 	}
 	var e = function() {};
 	e && console.log(typeof e);

```

## `uglify/properties/issue_2208_6`

- size: oxc 56 vs reference 46 (no whitespaces: +10, formatted: +14)

```js
a = 42;
console.log(('FAIL', { p: function() {
	return this.a;
} }.p)());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 a = 42;
-console.log(function() {
+console.log((0, { p: function() {
 	return this.a;
-}());
+} }.p)());

```

## `uglify/properties/issue_3188_1`

- tags: `join vars`
- size: oxc 84 vs reference 74 (no whitespaces: +10, formatted: +18)

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

## `uglify/properties/issue_3188_3`

- tags: `join vars`
- size: oxc 82 vs reference 72 (no whitespaces: +10, formatted: +15)

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

## `uglify/properties/prop_side_effects_1`

- tags: `join vars`, `remove unused`
- size: oxc 83 vs reference 73 (no whitespaces: +10, formatted: +15)

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
@@ -1,5 +1,6 @@
-console.log(1);
+var C = 1;
+console.log(C);
 var obj = { bar: function() {
-	return 2;
+	return C + C;
 } };
 console.log(obj.bar());

```

## `uglify/reduce_vars/accessor_2`

- tags: `join vars`, `remove unused`
- size: oxc 40 vs reference 30 (no whitespaces: +10, formatted: +16)

```js
var A = 1;
var B = { get c() {
	console.log(A);
} };
B.c;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-({ get c() {
-	console.log(1);
-} }).c;
+var A = 1, B = { get c() {
+	console.log(A);
+} };
+B.c;

```

## `uglify/reduce_vars/escape_sequence`

- tags: `join vars`, `remove unused`
- size: oxc 159 vs reference 149 (no whitespaces: +10, formatted: +13)

```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('FAIL');
	else console.log('PASS');
}
function baz() {
	return foo, bar;
}
function foo() {}
function bar() {}
main();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('PASS') : console.log('FAIL');
+}
 function baz() {
-	return function() {}, bar;
+	return bar;
 }
+function foo() {}
 function bar() {}
-(function() {
-	var thing = baz();
-	if (thing !== baz()) console.log('FAIL');
-	else console.log('PASS');
-})();
+main();

```

## `uglify/reduce_vars/issue_4568`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 96 vs reference 86 (no whitespaces: +10, formatted: +15)

```js
(function(a) {
	a && console.log('FAIL');
	if (1) do {
		if (!console.log('PASS')) break;
	} while (1);
})(!(0 !== delete NaN));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
 (function(a) {
-	for (a && console.log('FAIL'), 1; console.log('PASS');) 1;
-})(!(0 !== delete NaN));
+	a && console.log('FAIL');
+	do
+		if (!console.log('PASS')) break;
+	while (1);
+})(delete NaN === 0);

```

## `uglify/reduce_vars/toplevel_on_loops_1`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 55 (no whitespaces: +10, formatted: +11)

```js
function bar() {
	console.log('bar:', --x);
}
var x = 3;
do
	bar();
while (x);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-var x = 3;
-for (; function() {
+function bar() {
 	console.log('bar:', --x);
-}(), x;);
+}
+var x = 3;
+do
+	bar();
+while (x);

```

## `uglify/reduce_vars/unsafe_evaluate_array_2`

- tags: `join vars`
- size: oxc 108 vs reference 98 (no whitespaces: +10, formatted: +10)

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

## `uglify/regexp/test`

- size: oxc 62 vs reference 52 (no whitespaces: +10, formatted: +11)

```js
while (/a/.test('AAA')) console.log('FAIL');
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-while (false) console.log('FAIL');
+for (; /a/.test('AAA');) console.log('FAIL');
 console.log('PASS');

```

## `uglify/rests/drop_fargs`

- tags: `remove unused`
- size: oxc 58 vs reference 48 (no whitespaces: +10, formatted: +12)

```js
console.log(function(a, ...b) {
	return b[0];
}('FAIL', 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function(b) {
+console.log(function(a, ...b) {
 	return b[0];
-}(['PASS']));
+}('FAIL', 'PASS'));

```

## `uglify/switches/drop_case_2`

- size: oxc 58 vs reference 48 (no whitespaces: +10, formatted: +13)

```js
switch (foo) {
	case 'bar':
		bar();
		break;
	default:
	case 'moo':
		moo();
		break;
}

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,6 @@
 	case 'bar':
 		bar();
 		break;
-	default: moo();
+	default:
+	case 'moo': moo();
 }

```

## `uglify/templates/unicode_templates`

- size: oxc 49 vs reference 39 (no whitespaces: +10, formatted: +10)

```js
console.log(`\ud801\udc37\ud801𐐷${42}\u{10437}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`𐐷\ud801𐐷${42}𐐷`);
+console.log(`\ud801\udc37\ud801𐐷42\u{10437}`);

```

## `uglify/templates/unicode_templates_ecma`

- size: oxc 49 vs reference 39 (no whitespaces: +10, formatted: +10)

```js
console.log(`\ud801\udc37\ud801𐐷${42}\u{10437}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`𐐷\ud801𐐷${42}𐐷`);
+console.log(`\ud801\udc37\ud801𐐷42\u{10437}`);

```

## `uglify/arguments/issue_4410_1`

- tags: `join vars`, `sequences`
- size: oxc 66 vs reference 55 (no whitespaces: +11, formatted: +11)

```js
(function(a) {
	console.log(arguments[0] === (a = 0) ? 'FAIL' : 'PASS');
})(1);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function(a) {
-	console.log(a === (a = 0) ? 'FAIL' : 'PASS');
+	console.log(arguments[0] === (a = 0) ? 'FAIL' : 'PASS');
 })(1);

```

## `uglify/awaits/inline_block`

- size: oxc 148 vs reference 137 (no whitespaces: +11, formatted: +18)

```js
console.log('foo');
(async function() {
	console.log('bar');
	(async function() {
		for (var a of ['baz']) return a;
	})();
})().then(console.log);
console.log('moo');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 console.log('foo');
 (async function() {
 	console.log('bar');
-	for (var a of ['baz']) return void await a;
+	(async function() {
+		for (var a of ['baz']) return a;
+	})();
 })().then(console.log);
 console.log('moo');

```

## `uglify/awaits/inline_block_async`

- size: oxc 180 vs reference 169 (no whitespaces: +11, formatted: +21)

```js
console.log('foo');
(async function() {
	console.log('bar');
	(async function() {
		for (var a of ['baz']) return { then(r) {
			console.log('moo');
			r(a);
		} };
	})();
})().then(console.log);
console.log('moz');

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
 console.log('foo');
 (async function() {
 	console.log('bar');
-	for (var a of ['baz']) return void await { then(r) {
-		console.log('moo');
-		r(a);
-	} };
+	(async function() {
+		for (var a of ['baz']) return { then(r) {
+			console.log('moo');
+			r(a);
+		} };
+	})();
 })().then(console.log);
 console.log('moz');

```

## `uglify/booleans/de_morgan_3e`

- size: oxc 156 vs reference 145 (no whitespaces: +11, formatted: +17)

```js
function f(a, b, c) {
	return a && (a || b || c);
}
console.log(f(null, false), f(null, false, {}), f(null, true), f(null, true, {}));
console.log(f(42, false), f(42, false, {}), f(42, true), f(42, true, {}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b, c) {
-	return a;
+	return a && (a || b || c);
 }
 console.log(f(null, !1), f(null, !1, {}), f(null, !0), f(null, !0, {}));
 console.log(f(42, !1), f(42, !1, {}), f(42, !0), f(42, !0, {}));

```

## `uglify/classes/single_use_7`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 67 vs reference 56 (no whitespaces: +11, formatted: +15)

```js
'use strict';
class A {
	static foo() {}
}
var a = 'foo' in A;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 'use strict';
-console.log('foo' in class {
+class A {
 	static foo() {}
-});
+}
+var a = 'foo' in A;
+console.log(a);

```

## `uglify/collapse_vars/collapse_rhs_string`

- tags: `join vars`
- size: oxc 90 vs reference 79 (no whitespaces: +11, formatted: +16)

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
@@ -1,6 +1,8 @@
 var a, b;
 function f() {
-	return b = a = 'foo';
+	a = 'foo';
+	b = 'foo';
+	return 'foo';
 }
 var c = f();
 console.log(a === b, b === c, c === a);

```

## `uglify/collapse_vars/issue_2436_11`

- tags: `join vars`, `remove unused`
- size: oxc 337 vs reference 326 (no whitespaces: +11, formatted: +21)

```js
function matrix() {}
function isCollection() {}
function _randomDataForMatrix() {}
function _randomInt() {}
function f(arg1, arg2) {
	if (isCollection(arg1)) {
		var size = arg1;
		var max = arg2;
		var min = 0;
		var res = _randomDataForMatrix(size.valueOf(), min, max, _randomInt);
		return size && true === size.isMatrix ? matrix(res) : res;
	} else {
		var min = arg1;
		var max = arg2;
		return _randomInt(min, max);
	}
}

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,9 @@
 function f(arg1, arg2) {
 	if (isCollection(arg1)) {
 		var size = arg1, max = arg2, min = 0, res = _randomDataForMatrix(size.valueOf(), min, max, _randomInt);
-		return size && true === size.isMatrix ? matrix(res) : res;
-	} else return _randomInt(min = arg1, max = arg2);
+		return size && !0 === size.isMatrix ? matrix(res) : res;
+	} else {
+		var min = arg1, max = arg2;
+		return _randomInt(min, max);
+	}
 }

```

## `uglify/collapse_vars/issue_3884_1`

- tags: `join vars`, `remove unused`
- size: oxc 43 vs reference 32 (no whitespaces: +11, formatted: +19)

```js
var a = 100, b = 1;
{
	a++ + a || a;
	b <<= a;
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-var a = 100;
-++a;
-console.log(a, 32);
+var a = 100, b = 1;
+a++ + a;
+b <<= a;
+console.log(a, b);

```

## `uglify/collapse_vars/issue_3891`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 103 vs reference 92 (no whitespaces: +11, formatted: +25)

```js
function log(a) {
	console.log(typeof a);
}
log(function f() {
	try {
		do {
			var b = function() {}();
		} while (f = 0, b.p);
	} catch (e) {
		var f;
		b;
	}
});

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,10 @@
 }
 log(function() {
 	try {
-		do {} while ((void 0).p);
-	} catch (e) {}
+		do
+			var b = void 0;
+		while (f = 0, b.p);
+	} catch {
+		var f;
+	}
 });

```

## `uglify/collapse_vars/issue_5568`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 49 (no whitespaces: +11, formatted: +14)

```js
A = 'FAIL';
var a = (A = 'PASS', !1);
for (var b in a);
console.log(A);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 A = 'FAIL';
-for (var b in !(A = 'PASS'));
+var a = (A = 'PASS', !1);
+for (var b in a);
 console.log(A);

```

## `uglify/conditionals/cond_13`

- tags: `sequences`
- size: oxc 108 vs reference 97 (no whitespaces: +11, formatted: +11)

```js
x ? y(a) : z(a);
x ? y.f(a) : z.f(a);
x ? y.f(a) : z.g(a);
x ? y.f()(a) : z.g()(a);
x ? y.f.u(a) : z.g.u(a);
x ? y.f().u(a) : z.g().u(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1 @@
-(x ? y : z)(a);
-(x ? y : z).f(a);
-x ? y.f(a) : z.g(a);
-(x ? y.f() : z.g())(a);
-(x ? y.f : z.g).u(a);
-(x ? y.f() : z.g()).u(a);
+x ? y(a) : z(a), x ? y.f(a) : z.f(a), x ? y.f(a) : z.g(a), x ? y.f()(a) : z.g()(a), x ? y.f.u(a) : z.g.u(a), x ? y.f().u(a) : z.g().u(a);

```

## `uglify/conditionals/issue_3271`

- tags: `sequences`
- size: oxc 122 vs reference 111 (no whitespaces: +11, formatted: +13)

```js
function f(a) {
	var i = 0, b = [];
	if (a) {
		b[i++] = 4, b[i++] = 1;
	} else {
		b[i++] = 3, b[i++] = 2, b[i++] = 1;
	}
	return b;
}
console.log(f(0).pop(), f(1).pop());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function f(a) {
 	var i = 0, b = [];
-	a ? b[i++] = 4 : (b[i++] = 3, b[i++] = 2), b[i++] = 1;
-	return b;
+	return a ? (b[i++] = 4, b[i++] = 1) : (b[i++] = 3, b[i++] = 2, b[i++] = 1), b;
 }
 console.log(f(0).pop(), f(1).pop());

```

## `uglify/dead-code/issue_5882_3`

- tags: `sequences`
- size: oxc 36 vs reference 25 (no whitespaces: +11, formatted: +11)

```js
console.log(delete (42 .p = Infinity));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(delete (1 / 0));
+console.log(delete (42 .p = Infinity));

```

## `uglify/default-values/drop_fargs`

- tags: `remove unused`
- size: oxc 96 vs reference 85 (no whitespaces: +11, formatted: +18)

```js
console.log(function(a = 42, b = console.log('foo'), c = true) {
	return 'bar';
}(console.log('baz'), 'moo', false));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function(b = console.log('foo')) {
+console.log(function(a = 42, b = console.log('foo'), c = !0) {
 	return 'bar';
-}((console.log('baz'), 'moo')));
+}(console.log('baz'), 'moo', !1));

```

## `uglify/default-values/issue_4588_2_unused`

- tags: `remove unused`
- size: oxc 53 vs reference 42 (no whitespaces: +11, formatted: +13)

```js
console.log(function(a, b = void 0, c, d = 'foo') {}.length);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(function(a, b = 0, c, d) {}.length);
+console.log(function(a, b = void 0, c, d = 'foo') {}.length);

```

## `uglify/destructured/simple_let`

- tags: `join vars`, `remove unused`
- size: oxc 31 vs reference 20 (no whitespaces: +11, formatted: +15)

```js
let [a] = ['PASS'];
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('PASS');
+let [a] = ['PASS'];
+console.log(a);

```

## `uglify/destructured/simple_var`

- tags: `join vars`, `remove unused`
- size: oxc 31 vs reference 20 (no whitespaces: +11, formatted: +15)

```js
var [a] = ['PASS'];
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('PASS');
+var [a] = ['PASS'];
+console.log(a);

```

## `uglify/drop-unused/issue_3802_2`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 43 (no whitespaces: +11, formatted: +16)

```js
var a = 0;
a += 0;
var a = function() {};
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-0;
+var a = 0;
+a += 0;
 var a = function() {};
 console.log(typeof a);

```

## `uglify/evaluate/issue_2919`

- size: oxc 39 vs reference 28 (no whitespaces: +11, formatted: +12)

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

## `uglify/evaluate/negative_zero`

- size: oxc 39 vs reference 28 (no whitespaces: +11, formatted: +9)

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

## `uglify/functions/issue_1841_2`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 77 (no whitespaces: +11, formatted: +15)

```js
var b = 10;
!function(arg) {
	for (var key in 'hi') var n = arg.baz, n = [b = 42];
}(--b);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var b = 10;
-!function(arg) {
-	for (var key in 'hi') arg.baz, b = 42;
-}(--b);
+(function(arg) {
+	for (var key in 'hi') var n = arg.baz, n = [b = 42];
+})(--b);
 console.log(b);

```

## `uglify/functions/issue_3506_3`

- tags: `join vars`, `remove unused`
- size: oxc 101 vs reference 90 (no whitespaces: +11, formatted: +15)

```js
var a = 'FAIL';
(function(b) {
	(function(c) {
		var d = 1;
		for (; c && (a = 'PASS') && 0 < --d;);
	})(b);
})(a);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 var a = 'FAIL';
 (function(b) {
-	var c = a;
-	var d = 1;
-	for (; c && (a = 'PASS') && 0 < --d;);
-})();
+	(function(c) {
+		var d = 1;
+		for (; c && (a = 'PASS') && 0 < --d;);
+	})(b);
+})(a);
 console.log(a);

```

## `uglify/functions/issue_3506_5`

- tags: `join vars`, `remove unused`
- size: oxc 101 vs reference 90 (no whitespaces: +11, formatted: +15)

```js
var a = 'FAIL';
(function(b) {
	(function(c) {
		var d = 1;
		for (; c && (a = 'PASS') && 0 < --d;);
	})(b);
})(a);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 var a = 'FAIL';
 (function(b) {
-	var c = a;
-	var d = 1;
-	for (; c && (a = 'PASS') && 0 < --d;);
-})();
+	(function(c) {
+		var d = 1;
+		for (; c && (a = 'PASS') && 0 < --d;);
+	})(b);
+})(a);
 console.log(a);

```

## `uglify/functions/issue_5366`

- size: oxc 86 vs reference 75 (no whitespaces: +11, formatted: +15)

```js
for (console.log('foo') || function() {
	while (console.log('bar'));
}(); console.log('baz'););

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-if (!console.log('foo')) while (console.log('bar'));
-for (; console.log('baz'););
+for (console.log('foo') || function() {
+	for (; console.log('bar'););
+}(); console.log('baz'););

```

## `uglify/functions/unsafe_call_2`

- tags: `join vars`
- size: oxc 136 vs reference 125 (no whitespaces: +11, formatted: +12)

```js
function foo() {
	console.log(a, b);
}
var bar = function(a, b) {
	console.log(this, a, b);
}(function() {
	foo.call('foo', 'bar');
	bar.call('foo', 'bar');
})();

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 var bar = function(a, b) {
 	console.log(this, a, b);
 }(function() {
-	foo('bar');
+	foo.call('foo', 'bar');
 	bar.call('foo', 'bar');
 })();

```

## `uglify/join_vars/join_array_assignments_4`

- tags: `join vars`
- size: oxc 86 vs reference 75 (no whitespaces: +11, formatted: +15)

```js
console.log(function() {
	var a = ['foo'];
	a[0] = 'bar';
	a[1] = a;
	a[2] = 'baz';
	return a;
}().join());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 console.log(function() {
-	var a = ['bar'];
+	var a = ['foo'];
+	a[0] = 'bar';
 	a[1] = a;
 	a[2] = 'baz';
 	return a;

```

## `uglify/merge_vars/issue_5471_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 143 vs reference 132 (no whitespaces: +11, formatted: +20)

```js
var a = 'FAIL 1';
function f(b, c) {
	function g() {
		if (console) return 42;
		else c = 'FAIL 2';
	}
	var d = g();
	console.log(c || 'PASS');
	var e = function h() {
		while (b && e);
	}();
}
f(a++) && a;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,12 @@
 var a = 'FAIL 1';
-var b, c, e;
-b = +a, function() {
-	if (console) return;
-	c = 'FAIL 2';
-}(), console.log(c || 'PASS'), e = function() {
-	while (b && e);
-}(), void 0;
+function f(b, c) {
+	function g() {
+		if (console) return 42;
+		c = 'FAIL 2';
+	}
+	g(), console.log(c || 'PASS');
+	var e = function() {
+		for (; b && e;);
+	}();
+}
+f(a++);

```

## `uglify/nullish/inline_binary_nullish`

- size: oxc 87 vs reference 76 (no whitespaces: +11, formatted: +15)

```js
(function() {
	while (console.log('foo'));
})() ?? (function() {
	while (console.log('bar'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-if (null == function() {
-	while (console.log('foo'));
-}()) while (console.log('bar'));
+(function() {
+	for (; console.log('foo'););
+})() ?? (function() {
+	for (; console.log('bar'););
+})();

```

## `uglify/pure_getters/collapse_rhs_call`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 52 vs reference 41 (no whitespaces: +11, formatted: +16)

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
@@ -1,3 +1,6 @@
-({}.f = function() {
+var o = {};
+function f() {
 	console.log('PASS');
-})();
+}
+o.f = f;
+f();

```

## `uglify/pure_getters/issue_3490_1`

- tags: `sequences`, `pure getters`
- size: oxc 86 vs reference 75 (no whitespaces: +11, formatted: +17)

```js
var b = 42, c = 'FAIL';
if ({ 3: function() {
	var a;
	return (a && a.p) < this;
}() }) c = 'PASS';
if (b) while ('' == typeof d);
console.log(c, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var b = 42, c = 'FAIL';
-var a;
-if (c = 'PASS', b) while ('' == typeof d);
-console.log(c, b);
+(function() {
+	var a;
+	return (a && a.p) < this;
+})(), c = 'PASS', console.log(c, b);

```

## `uglify/reduce_vars/issue_5915_3`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 43 (no whitespaces: +11, formatted: +15)

```js
f = void 0;
function f() {}
if (console) {
	console.log(typeof f);
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-void 0;
-if (console) console.log('undefined');
+f = void 0;
+function f() {}
+console && console.log(typeof f);

```

## `uglify/reduce_vars/side_effects_assign`

- tags: `join vars`, `sequences`
- size: oxc 44 vs reference 33 (no whitespaces: +11, formatted: +15)

```js
var a = typeof void (a && a.in == 1, 0);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = 'undefined';
+var a = typeof void (a && a.in, 0);
 console.log(a);

```

## `uglify/regexp/exec`

- size: oxc 62 vs reference 51 (no whitespaces: +11, formatted: +11)

```js
while (/a/.exec('AAA')) console.log('FAIL');
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-for (; null;) console.log('FAIL');
+for (; /a/.exec('AAA');) console.log('FAIL');
 console.log('PASS');

```

## `uglify/regexp/regexp_2`

- size: oxc 81 vs reference 70 (no whitespaces: +11, formatted: +12)

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

## `uglify/regexp/test_global`

- size: oxc 63 vs reference 52 (no whitespaces: +11, formatted: +12)

```js
while (/a/g.test('AAA')) console.log('FAIL');
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-while (false) console.log('FAIL');
+for (; /a/g.test('AAA');) console.log('FAIL');
 console.log('PASS');

```

## `uglify/rests/issue_4544_2`

- tags: `keep function names`
- size: oxc 60 vs reference 49 (no whitespaces: +11, formatted: +9)

```js
try {
	(function f(a, ...[{}]) {})([]);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
-	[, ...[{}]] = [[]];
-} catch (e) {
+	(function f(a, ...[{}]) {})([]);
+} catch {
 	console.log('PASS');
 }

```

## `uglify/sequences/side_effects_cascade_3`

- tags: `join vars`, `sequences`
- size: oxc 56 vs reference 45 (no whitespaces: +11, formatted: +12)

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
-	(b += a) || (b = a) || (b = b - a ^ a), a--;
+	'foo' ^ (b += a), (b ||= a) || (b -= a) - (b ^= a), a--;
 }

```

## `uglify/sequences/unsafe_undefined`

- tags: `sequences`
- size: oxc 104 vs reference 93 (no whitespaces: +11, formatted: +9)

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
-	return a ? b : c ? d : undefined;
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

## `uglify/templates/issue_4676`

- tags: `join vars`, `remove unused`
- size: oxc 91 vs reference 80 (no whitespaces: +11, formatted: +14)

```js
function f(a) {
	var b = `foo${a = 'PASS'}`;
	for (var c in f && b) b.p;
	return a;
}
console.log(f('FAIL'));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-console.log(function f(a) {
-	var b = 'fooPASS';
-	for (var c in f, b) b.p;
-	return 'PASS';
-}());
+function f(a) {
+	var b = `foo${a = 'PASS'}`;
+	for (var c in f && b) b.p;
+	return a;
+}
+console.log(f('FAIL'));

```

## `uglify/transform/label_if_break`

- tags: `sequences`, `remove unused`
- size: oxc 13 vs reference 2 (no whitespaces: +11, formatted: +18)

```js
L: if (true) {
	a;
	break L;
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-a;
+L: {
+	a;
+	break L;
+}

```

## `uglify/arrows/reduce_iife_3`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 48 (no whitespaces: +12, formatted: +18)

```js
var a = 'foo';
(() => {
	console.log(a);
	console.log(a);
})();
a = 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
+var a = 'foo';
 (() => {
-	console.log('foo');
-	console.log('foo');
+	console.log(a);
+	console.log(a);
 })();
+a = 'bar';

```

## `uglify/assignments/issue_4827_2`

- tags: `join vars`, `remove unused`
- size: oxc 62 vs reference 50 (no whitespaces: +12, formatted: +17)

```js
var a = 0, b = 'PASS';
function f(c) {
	a++, c &&= b = a;
}
f();
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 var a = 0, b = 'PASS';
-a++, c &&= b = a;
-var c;
+function f(c) {
+	a++, c &&= b = a;
+}
+f();
 console.log(b);

```

## `uglify/awaits/inline_await_this`

- size: oxc 91 vs reference 79 (no whitespaces: +12, formatted: +16)

```js
var p = 'FAIL';
({
	p: 'PASS',
	async f() {
		return await (async () => this.p)();
	}
}).f().then(console.log);

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 ({
 	p: 'PASS',
 	async f() {
-		return await this.p;
+		return await (async () => this.p)();
 	}
 }).f().then(console.log);

```

## `uglify/classes/issue_5489_strict`

- size: oxc 100 vs reference 88 (no whitespaces: +12, formatted: +19)

```js
'use strict';
(class {
	[console.log('foo')];
	static {
		console.log('bar');
	}
	static [console.log('baz')]() {}
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 'use strict';
-console.log('foo'), console.log('baz'), (() => (() => {
-	console.log('bar');
-})())();
+(class {
+	[console.log('foo')];
+	static {
+		console.log('bar');
+	}
+	static [console.log('baz')]() {}
+});

```

## `uglify/classes/static_field_init_strict`

- size: oxc 140 vs reference 128 (no whitespaces: +12, formatted: +22)

```js
'use strict';
(class {
	static [console.log('foo')] = console.log('bar');
	static {
		console.log('baz');
	}
	static [console.log('moo')] = console.log('moz');
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 'use strict';
-console.log('foo'), console.log('moo'), (() => (console.log('bar'), (() => {
-	console.log('baz');
-})(), console.log('moz')))();
+(class {
+	static [console.log('foo')] = console.log('bar');
+	static {
+		console.log('baz');
+	}
+	static [console.log('moo')] = console.log('moz');
+});

```

## `uglify/classes/static_side_effects`

- tags: `remove unused`
- size: oxc 69 vs reference 57 (no whitespaces: +12, formatted: +18)

```js
var a = 'FAIL 1';
class A {
	static p = a = 'PASS';
	q = a = 'FAIL 2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var a = 'FAIL 1';
-(class {
-	static c = a = 'PASS';
-});
+class A {
+	static p = a = 'PASS';
+	q = a = 'FAIL 2';
+}
 console.log(a);

```

## `uglify/collapse_vars/cascade_call`

- tags: `join vars`, `remove unused`
- size: oxc 41 vs reference 29 (no whitespaces: +12, formatted: +17)

```js
function f(a) {
	var b;
	return x((b = a, y(b)));
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f(a) {
-	return x(y(a));
+	var b;
+	return x((b = a, y(b)));
 }

```

## `uglify/collapse_vars/collapse_rhs_boolean_3`

- tags: `join vars`, `sequences`
- size: oxc 81 vs reference 69 (no whitespaces: +12, formatted: +22)

```js
var a, f, g, h, i, n, s, t, x, y;
if (x()) {
	n = a;
} else if (y()) {
	n = f();
} else if (s) {
	i = false;
	n = g(true);
} else if (t) {
	i = false;
	n = h(true);
} else {
	n = [];
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a, f, g, h, i, n, s, t, x, y;
-n = x() ? a : y() ? f() : s ? g(!(i = !1)) : t ? h(!(i = !1)) : [];
+x() ? n = a : y() ? n = f() : s ? (i = !1, n = g(!0)) : t ? (i = !1, n = h(!0)) : n = [];

```

## `uglify/collapse_vars/collapse_vars_array_2`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 76 (no whitespaces: +12, formatted: +17)

```js
function f(a) {
	var b;
	return [(b = a, b.g())];
}
console.log(f({ g: function() {
	return 'PASS';
} })[0]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f(a) {
-	return [a.g()];
+	var b;
+	return [(b = a, b.g())];
 }
 console.log(f({ g: function() {
 	return 'PASS';

```

## `uglify/collapse_vars/collapse_vars_lvalues_drop_assign`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 398 vs reference 386 (no whitespaces: +12, formatted: +20)

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
@@ -33,5 +33,7 @@
 	return e1(), x - (e2() - x);
 }
 function f9(x) {
-	return e1(), e2() - x - x;
+	e1();
+	var v = e2(), b = x;
+	return v - x - b;
 }

```

## `uglify/collapse_vars/collapse_vars_object_2`

- tags: `join vars`, `remove unused`
- size: oxc 89 vs reference 77 (no whitespaces: +12, formatted: +17)

```js
function f(a) {
	var b;
	return { p: (b = a, b.g()) };
}
console.log(f({ g: function() {
	return 'PASS';
} }).p);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f(a) {
-	return { p: a.g() };
+	var b;
+	return { p: (b = a, b.g()) };
 }
 console.log(f({ g: function() {
 	return 'PASS';

```

## `uglify/collapse_vars/collapse_vars_self_reference`

- tags: `join vars`, `sequences`
- size: oxc 137 vs reference 125 (no whitespaces: +12, formatted: +12)

```js
// avoid bug in self-referential declaration.
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
@@ -1,4 +1,4 @@
-// note: `unused` option is false
+// avoid bug in self-referential declaration.
 function f1() {
 	var self = { inner: function() {
 		return self;

```

## `uglify/collapse_vars/collapse_vars_seq`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 80 vs reference 68 (no whitespaces: +12, formatted: +20)

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
@@ -1,5 +1,5 @@
 var f1 = function(x, y) {
-	var r = x + y;
-	return r * r - r + 7;
+	var a, b, r = x + y;
+	return a = r * r - r, b = 7, a + b;
 };
 console.log(f1(1, 2));

```

## `uglify/collapse_vars/collapse_vars_throw`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 94 vs reference 82 (no whitespaces: +12, formatted: +20)

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

## `uglify/collapse_vars/cond_branch_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 211 vs reference 199 (no whitespaces: +12, formatted: +17)

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

## `uglify/collapse_vars/conditional_2`

- tags: `join vars`, `remove unused`
- size: oxc 72 vs reference 60 (no whitespaces: +12, formatted: +19)

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

## `uglify/collapse_vars/issue_1631_3`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 93 vs reference 81 (no whitespaces: +12, formatted: +19)

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
@@ -1,8 +1,9 @@
 function g() {
+	var a = 0, b = 1;
 	function f() {
 		return a = 2, 4;
 	}
-	var a = 0, t = f();
-	return a + t;
+	var t = f();
+	return b = a + t, b;
 }
 console.log(g());

```

## `uglify/collapse_vars/issue_2436_8`

- tags: `join vars`, `remove unused`
- size: oxc 49 vs reference 37 (no whitespaces: +12, formatted: +18)

```js
console.log(function(c) {
	return {
		x: c.a,
		y: c.b
	};
}(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-console.log({
-	x: (c = o).a,
-	y: c.b
-});
-var c;
+console.log(function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+}(o));

```

## `uglify/collapse_vars/issue_4242`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 79 vs reference 67 (no whitespaces: +12, formatted: +17)

```js
console.log(function() {
	if (console) var a = function() {}, b = (!1 === console || a)();
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function() {
-	console && (!1 === console || function() {})();
+	if (console) var a = function() {}, b = (!1 === console || a)();
 }());

```

## `uglify/collapse_vars/issue_805`

- tags: `join vars`
- size: oxc 78 vs reference 66 (no whitespaces: +12, formatted: +14)

```js
function f() {
	function Foo() {}
	Foo.prototype = {};
	Foo.prototype.bar = 42;
	return Foo;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f() {
 	function Foo() {}
-	(Foo.prototype = {}).bar = 42;
+	Foo.prototype = {};
+	Foo.prototype.bar = 42;
 	return Foo;
 }

```

## `uglify/collapse_vars/substitution_arithmetic`

- tags: `join vars`
- size: oxc 161 vs reference 149 (no whitespaces: +12, formatted: +18)

```js
function f1(a, b) {
	console.log((b = a) + a, b);
}
function f2(a, b) {
	console.log(a - (b = a), b);
}
function f3(a, b) {
	console.log(a / (b = a) + b, b);
}
f1(42, 'foo');
f2(42, 'foo');
f3(42, 'foo');

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 function f1(a, b) {
-	console.log(a + a, a);
+	console.log((b = a) + a, b);
 }
 function f2(a, b) {
-	console.log(a - a, a);
+	console.log(a - (b = a), b);
 }
 function f3(a, b) {
-	console.log(a / a + a, a);
+	console.log(a / (b = a) + b, b);
 }
 f1(42, 'foo');
 f2(42, 'foo');

```

## `uglify/concat-strings/concat_sequence`

- tags: `join vars`, `remove unused`
- size: oxc 38 vs reference 26 (no whitespaces: +12, formatted: +16)

```js
var a;
console.log(12 + (a = null, '34' + a));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(12 + '34' + null);
+var a;
+console.log(12 + (a = null, '34' + a));

```

## `uglify/conditionals/cond_2`

- tags: `sequences`
- size: oxc 83 vs reference 71 (no whitespaces: +12, formatted: +12)

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

## `uglify/conditionals/issue_2535_2`

- tags: `sequences`
- size: oxc 411 vs reference 399 (no whitespaces: +12, formatted: +20)

```js
function x() {}
function y() {
	return 'foo';
}
console.log(x() || true || y());
console.log(y() || true || x());
console.log((x() || true) && y());
console.log((y() || true) && x());
console.log(x() && true || y());
console.log(y() && true || x());
console.log(x() && true && y());
console.log(y() && true && x());
console.log(x() || false || y());
console.log(y() || false || x());
console.log((x() || false) && y());
console.log((y() || false) && x());
console.log(x() && false || y());
console.log(y() && false || x());
console.log(x() && false && y());
console.log(y() && false && x());

```

```diff
--- reference
+++ oxc
@@ -2,19 +2,4 @@
 function y() {
 	return 'foo';
 }
-console.log(x() || !0);
-console.log(y() || !0);
-console.log((x(), y()));
-console.log((y(), x()));
-console.log(!!x() || y());
-console.log(!!y() || x());
-console.log(x() && y());
-console.log(y() && x());
-console.log(x() || y());
-console.log(y() || x());
-console.log(!!x() && y());
-console.log(!!y() && x());
-console.log((x(), y()));
-console.log((y(), x()));
-console.log(x() && !1);
-console.log(y() && !1);
+console.log(x() || !0), console.log(y() || !0), console.log((x(), y())), console.log((y(), x())), console.log(x() && !0 || y()), console.log(y() && !0 || x()), console.log(x() && y()), console.log(y() && x()), console.log(x() || y()), console.log(y() || x()), console.log((x() || !1) && y()), console.log((y() || !1) && x()), console.log((x(), y())), console.log((y(), x())), console.log(x() && !1), console.log(y() && !1);

```

## `uglify/const/issue_4274_1`

- size: oxc 56 vs reference 44 (no whitespaces: +12, formatted: +13)

```js
for (;;) {
	if (console.log('PASS')) {
		const a = 0;
	} else {
		break;
		var a;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-for (; console.log('PASS');) {
-	{
-		const a = 0;
-	}
+for (;;) if (console.log('PASS')) {
+	let a = 0;
+} else {
+	break;
 	var a;
 }

```

## `uglify/const/issue_4274_2`

- size: oxc 56 vs reference 44 (no whitespaces: +12, formatted: +13)

```js
for (;;) {
	if (!console.log('PASS')) {
		break;
		var a;
	} else {
		const a = 0;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-for (; console.log('PASS');) {
-	{
-		const a = 0;
-	}
+for (;;) if (console.log('PASS')) {
+	let a = 0;
+} else {
+	break;
 	var a;
 }

```

## `uglify/dead-code/issue_5641`

- tags: `join vars`, `sequences`
- size: oxc 77 vs reference 65 (no whitespaces: +12, formatted: +17)

```js
function f(a) {
	if (a || b) {
		var b = 'PASS', c = b && console.log(b);
	} else var d = a || b;
}
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a) {
-	var b, c, d;
-	(a || b) && (b = 'PASS') && console.log(b);
+	if (a || b) var b = 'PASS', c = b && console.log(b);
+	else var d = a || b;
 }
 f(42);

```

## `uglify/dead-code/trim_finally_1`

- size: oxc 38 vs reference 26 (no whitespaces: +12, formatted: +22)

```js
try {
	console.log('PASS');
} finally {
	var a;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-console.log('PASS');
-var a;
+try {
+	console.log('PASS');
+} finally {
+	var a;
+}

```

## `uglify/default-values/issue_5314_2`

- size: oxc 71 vs reference 59 (no whitespaces: +12, formatted: +16)

```js
A = this;
new function() {
	((a = console.log(this === A ? 'FAIL' : 'PASS')) => {})();
}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 A = this;
 new function() {
-	console.log(this === A ? 'FAIL' : 'PASS');
+	((a = console.log(this === A ? 'FAIL' : 'PASS')) => {})();
 }();

```

## `uglify/default-values/issue_5448_1`

- tags: `join vars`, `remove unused`
- size: oxc 72 vs reference 60 (no whitespaces: +12, formatted: +15)

```js
(function(a = typeof console.log) {
	do {
		var b = [...a];
	} while (console.log('PASS'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-(function(a = console.log) {
-	do {} while (console.log('PASS'));
+(function(a = typeof console.log) {
+	do
+		[...a];
+	while (console.log('PASS'));
 })();

```

## `uglify/default-values/issue_5774`

- tags: `join vars`, `sequences`
- size: oxc 104 vs reference 92 (no whitespaces: +12, formatted: +16)

```js
(function() {
	while (console.log('PASS')) {
		if (console) {
			a = void 0;
			var b = void 0;
			var c = void 0;
			[a = 0] = [b, b];
			var a;
		}
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 (function() {
-	while (console.log('PASS')) {
-		var a, b, c, a;
-		console && (c = b = a = void 0, [a = 0] = [a, a]);
+	for (; console.log('PASS');) if (console) {
+		a = void 0;
+		var b = void 0, c = void 0;
+		[a = 0] = [b, b];
+		var a;
 	}
 })();

```

## `uglify/default-values/unused_var_1`

- tags: `remove unused`
- size: oxc 32 vs reference 20 (no whitespaces: +12, formatted: +17)

```js
var [a = 42] = [console.log('PASS')];

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+var [a = 42] = [console.log('PASS')];

```

## `uglify/destructured/drop_unused_2`

- tags: `join vars`, `remove unused`
- size: oxc 49 vs reference 37 (no whitespaces: +12, formatted: +21)

```js
function f(a) {
	var b = [console.log('PASS'), a], { p: a } = 0;
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-(function(a) {
+function f(a) {
 	console.log('PASS');
-})();
+	var { p: a } = 0;
+}
+f();

```

## `uglify/destructured/reduce_vars_2`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 42 (no whitespaces: +12, formatted: +20)

```js
var a = 'FAIL', b = 42;
({[console.log(a, b)]: b.p} = a = 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-({[console.log('PASS', 42)]: 42 .p} = 'PASS');
+var a = 'FAIL', b = 42;
+({[console.log(a, b)]: b.p} = a = 'PASS');

```

## `uglify/directives/issue_3166`

- size: oxc 49 vs reference 37 (no whitespaces: +12, formatted: +15)

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

## `uglify/drop-unused/drop_toplevel_vars_retain`

- tags: `remove unused`
- size: oxc 100 vs reference 88 (no whitespaces: +12, formatted: +22)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-var a;
+var a, b = 1, c = g;
 function f(d) {
 	return function() {
-		2;
+		c = 2;
 	};
 }
 a = 2;
 function g() {}
 function h() {}
-console.log(3);
+console.log(b = 3);

```

## `uglify/evaluate/operator_in`

- size: oxc 207 vs reference 195 (no whitespaces: +12, formatted: +17)

```js
Object.prototype.PASS = 0;
console.log(0 in [1]);
console.log(0 in [,]);
console.log(0 / 0 in { NaN: 2 });
console.log('PASS' in {});
console.log('FAIL' in {});
console.log('toString' in {});
console.log('toString' in { toString: 3 });

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 Object.prototype.PASS = 0;
-console.log(true);
+console.log(0 in [1]);
 console.log(0 in [,]);
-console.log(true);
+console.log(NaN in { NaN: 2 });
 console.log('PASS' in {});
 console.log('FAIL' in {});
 console.log('toString' in {});

```

## `uglify/functions/block_scope_1_compress`

- tags: `join vars`, `remove unused`
- size: oxc 36 vs reference 24 (no whitespaces: +12, formatted: +14)

```js
console.log(typeof f);
function f() {}

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('function');
+console.log(typeof f);
+function f() {}

```

## `uglify/functions/block_scope_2_compress`

- tags: `join vars`, `remove unused`
- size: oxc 36 vs reference 24 (no whitespaces: +12, formatted: +14)

```js
{
	console.log(typeof f);
}
function f() {}

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('function');
+console.log(typeof f);
+function f() {}

```

## `uglify/functions/issue_3016_3`

- size: oxc 80 vs reference 68 (no whitespaces: +12, formatted: +16)

```js
var b = 1;
do {
	console.log(function() {
		return a ? 'FAIL' : a = 'PASS';
		try {
			a = 2;
		} catch (a) {
			var a;
		}
	}());
} while (b--);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var b = 1;
-do {
-	console.log((a = void 0, a ? 'FAIL' : 'PASS'));
-} while (b--);
-var a;
+do
+	console.log(function() {
+		return a ? 'FAIL' : a = 'PASS';
+		var a;
+	}());
+while (b--);

```

## `uglify/functions/issue_3364`

- tags: `join vars`, `remove unused`
- size: oxc 271 vs reference 259 (no whitespaces: +12, formatted: +13)

```js
var s = 2, a = 100, b = 10, c = 0;
function f(p, e, r) {
	try {
		for (var i = 1; i-- > 0;) var a = function(x) {
			function g(y) {
				y && y[a++];
			}
			var x = g(--s >= 0 && f(c++));
			for (var j = 1; --j > 0;);
		}();
	} catch (e) {
		try {
			return;
		} catch (z) {
			for (var k = 1; --k > 0;) {
				for (var l = 1; l > 0; --l) {
					var n = function() {};
					for (var k in n) var o = (n, k);
				}
			}
		}
	}
}
var r = f();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,20 @@
-var s = 2, c = 0;
-(function n(r, o, a) {
+var s = 2, a = 100, b = 10, c = 0;
+function f(p, e, r) {
 	try {
-		for (var f = 1; f-- > 0;) var t = function(r) {
-			(function(r) {
-				r && r[t++];
-			})(--s >= 0 && n(c++));
-			for (var o = 1; --o > 0;);
+		for (var i = 1; i-- > 0;) var a = function(x) {
+			function g(y) {
+				y && y[a++];
+			}
+			g(--s >= 0 && f(c++));
+			for (var j = 1; --j > 0;);
 		}();
-	} catch (o) {
+	} catch {
 		try {
 			return;
-		} catch (r) {
-			for (var v = 1; --v > 0;) for (var i = 1; i > 0; --i) {
-				function u() {}
-				for (var v in u);
-			}
+		} catch {
+			for (var k = 1; --k > 0;) for (var l = 1; l > 0; --l) for (var k in function() {}) var o = k;
 		}
 	}
-})();
+}
+var r = f();
 console.log(c);

```

## `uglify/global_defs/issue_1801`

- size: oxc 28 vs reference 16 (no whitespaces: +12, formatted: +12)

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

## `uglify/global_defs/mixed`

- size: oxc 199 vs reference 187 (no whitespaces: +12, formatted: +12)

```js
var FOO = { BAR: 0 };
console.log(FOO.BAR);
console.log(++CONFIG.DEBUG);
console.log(++CONFIG.VALUE);
console.log(++CONFIG['VAL' + 'UE']);
console.log(++DEBUG[CONFIG.VALUE]);
CONFIG.VALUE.FOO = 'bar';
console.log(CONFIG);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 var FOO = { BAR: 0 };
-console.log('moo');
+console.log(FOO.BAR);
 console.log(++CONFIG.DEBUG);
 console.log(++CONFIG.VALUE);
 console.log(++CONFIG.VALUE);
-console.log(++DEBUG[42]);
+console.log(++DEBUG[CONFIG.VALUE]);
 CONFIG.VALUE.FOO = 'bar';
 console.log(CONFIG);

```

## `uglify/hoist_props/single_use`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 47 (no whitespaces: +12, formatted: +15)

```js
var obj = { bar: function() {
	return 42;
} };
console.log(obj.bar());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log({ bar: function() {
+var obj = { bar: function() {
 	return 42;
-} }.bar());
+} };
+console.log(obj.bar());

```

## `uglify/hoist_vars/issue_4898`

- tags: `join vars`, `remove unused`
- size: oxc 48 vs reference 36 (no whitespaces: +12, formatted: +16)

```js
do {
	var b = [console.log('PASS')];
	var c = b;
} while (c.p = 0);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var b;
-b = [console.log('PASS')];
-b.p = 0;
+do
+	var b = [console.log('PASS')], c = b;
+while (c.p = 0);

```

## `uglify/if_return/issue_5583`

- tags: `sequences`
- size: oxc 120 vs reference 108 (no whitespaces: +12, formatted: +11)

```js
do {
	switch (console) {
		default:
			if (!console.log('foo')) continue;
			break;
		case console.log('bar'): FAIL;
	}
} while (console.log('baz'));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-do {
+do
 	switch (console) {
 		default:
-			console.log('foo');
+			if (!console.log('foo')) continue;
 			break;
 		case console.log('bar'): FAIL;
 	}
-} while (console.log('baz'));
+while (console.log('baz'));

```

## `uglify/if_return/merged_references_2`

- tags: `join vars`, `remove unused`
- size: oxc 94 vs reference 82 (no whitespaces: +12, formatted: +15)

```js
A = 'PASS';
var a;
console.log(function(b) {
	if (a = b) return console && a;
	a = FAIL;
	return console && a;
}(A));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 A = 'PASS';
 var a;
 console.log(function(b) {
-	if (a = b);
-	else a = FAIL;
+	if (a = b) return console && a;
+	a = FAIL;
 	return console && a;
 }(A));

```

## `uglify/if_return/switch_return_3`

- size: oxc 114 vs reference 102 (no whitespaces: +12, formatted: +12)

```js
function f(a) {
	switch (a) {
		case console.log('foo'):
			if (console) return void console.log('bar');
			break;
		case 42: FAIL;
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(a) {
 	switch (a) {
 		case console.log('foo'):
-			if (console) console.log('bar');
+			if (console) return void console.log('bar');
 			break;
 		case 42: FAIL;
 	}

```

## `uglify/issue-1052/defun_else_if_return`

- size: oxc 78 vs reference 66 (no whitespaces: +12, formatted: +14)

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

## `uglify/issue-1609/chained_evaluation_1`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 43 (no whitespaces: +12, formatted: +20)

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
@@ -1,5 +1,6 @@
 (function() {
 	(function() {
-		f(1).bar = 1;
+		var b = 1, c = f(b);
+		c.bar = b;
 	})();
 })();

```

## `uglify/issue-1750/case_1`

- size: oxc 71 vs reference 59 (no whitespaces: +12, formatted: +16)

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
@@ -1,5 +1,7 @@
 var a = 0, b = 1;
-switch (true) {
-	case a || true: b = 2;
+switch (!0) {
+	case a || !0:
+	default: b = 2;
+	case !0:
 }
 console.log(a, b);

```

## `uglify/issue-208/mixed`

- size: oxc 78 vs reference 66 (no whitespaces: +12, formatted: +14)

```js
var ENV = 3;
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
 var ENV = 3;
 var FOO = 4;
-f(10);
+f(ENV * 10);
 --FOO;
 DEBUG = 1;
 DEBUG++;
 DEBUG += 1;
-f(0);
-x = 0;
+f(DEBUG);
+x = DEBUG;

```

## `uglify/loops/issue_4091_1`

- tags: `remove unused`
- size: oxc 61 vs reference 49 (no whitespaces: +12, formatted: +12)

```js
try {
	throw 'FAIL';
} catch (e) {
	for (var e in 42);
}
console.log(e && e);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	throw 'FAIL';
 } catch (e) {
-	var e;
+	for (var e in 42);
 }
 console.log(e && e);

```

## `uglify/numbers/identity_3`

- size: oxc 49 vs reference 37 (no whitespaces: +12, formatted: +24)

```js
0 + --a;
--a + 0;
0 - --a;
--a - 0;
1 * --a;
--a * 1;
1 / --a;
--a / 1;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
---a;
---a;
+0 + --a;
+--a + 0;
 0 - --a;
---a;
---a;
---a;
+--a - 0;
+1 * --a;
+--a * 1;
 1 / --a;
---a;
+--a / 1;

```

## `uglify/objects/duplicate_key_with_accessor`

- size: oxc 128 vs reference 116 (no whitespaces: +12, formatted: +21)

```js
[{
	a: 0,
	b: 1,
	a: 2,
	set b(v) {}
}, {
	a: 3,
	b: 4,
	get a() {
		return 5;
	},
	a: 6,
	b: 7,
	a: 8,
	b: 9
}].forEach(function(o) {
	for (var k in o) console.log(k, o[k]);
});

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 [{
-	a: 2,
+	a: 0,
 	b: 1,
+	a: 2,
 	set b(v) {}
 }, {
 	a: 3,
@@ -8,6 +9,8 @@
 	get a() {
 		return 5;
 	},
+	a: 6,
+	b: 7,
 	a: 8,
 	b: 9
 }].forEach(function(o) {

```

## `uglify/properties/mangle_properties_1`

- size: oxc 88 vs reference 76 (no whitespaces: +12, formatted: +12)

```js
a['foo'] = 'bar';
a.color = 'red';
x = { 'bar': 10 };
a.run(x.bar, a.foo);
a['run']({
	color: 'blue',
	foo: 'baz'
});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-a['a'] = 'bar';
-a.b = 'red';
-x = { o: 10 };
-a.run(x.o, a.a);
-a['run']({
-	b: 'blue',
-	a: 'baz'
+a.foo = 'bar';
+a.color = 'red';
+x = { bar: 10 };
+a.run(x.bar, a.foo);
+a.run({
+	color: 'blue',
+	foo: 'baz'
 });

```

## `uglify/pure_getters/issue_4730_1`

- tags: `pure getters`
- size: oxc 38 vs reference 26 (no whitespaces: +12, formatted: +16)

```js
var a;
console.log('PASS') + (a && a[a.p]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-console.log('PASS');
+console.log('PASS') + (a && a[a.p]);

```

## `uglify/reduce_vars/issue_5324`

- tags: `join vars`, `remove unused`
- size: oxc 81 vs reference 69 (no whitespaces: +12, formatted: +20)

```js
A = 0;
do {
	var a, b = A;
	for (a in b) var c = b;
} while (function() {
	var d;
	console.log(d *= A);
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
 A = 0;
 do {
 	var a, b = A;
-	for (a in b);
-} while (b = void 0, void console.log(b *= A));
+	for (a in b) var c = b;
+} while (function() {
+	var d;
+	console.log(d *= A);
+}());

```

## `uglify/reduce_vars/unsafe_evaluate_object_2`

- tags: `join vars`
- size: oxc 136 vs reference 124 (no whitespaces: +12, formatted: +12)

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

## `uglify/regexp/exec_global`

- size: oxc 63 vs reference 51 (no whitespaces: +12, formatted: +12)

```js
while (/a/g.exec('AAA')) console.log('FAIL');
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-for (; null;) console.log('FAIL');
+for (; /a/g.exec('AAA');) console.log('FAIL');
 console.log('PASS');

```

## `uglify/rests/issue_5705`

- tags: `join vars`, `remove unused`
- size: oxc 48 vs reference 36 (no whitespaces: +12, formatted: +18)

```js
(function(...a) {
	var b = { ...a };
})(console.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-(function() {})(console.log('PASS'));
+(function(...a) {
+	({ ...a });
+})(console.log('PASS'));

```

## `uglify/rests/reduce_destructured_array`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 25 (no whitespaces: +12, formatted: +17)

```js
var [ ...a] = ['PASS'];
console.log(a[0]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(['PASS'][0]);
+var [ ...a] = ['PASS'];
+console.log(a[0]);

```

## `uglify/switches/issue_5012`

- size: oxc 86 vs reference 74 (no whitespaces: +12, formatted: +14)

```js
switch (void 0) {
	case console.log('PASS'): break;
	case void 0:
	case 42: console.log('FAIL');
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 switch (void 0) {
 	case console.log('PASS'): break;
-	default: console.log('FAIL');
+	case void 0:
+	case 42: console.log('FAIL');
 }

```

## `uglify/arrows/func_to_arrow`

- tags: `type:module`
- size: oxc 58 vs reference 45 (no whitespaces: +13, formatted: +16)

```js
console.log(function(a, b, c) {
	return b + a + c + c;
}('A', 'P', 'S'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(((a, b, c) => b + a + c + c)('A', 'P', 'S'));
+console.log(function(a, b, c) {
+	return b + a + c + c;
+}('A', 'P', 'S'));

```

## `uglify/arrows/func_to_arrow_var`

- tags: `type:module`, `join vars`, `remove unused`
- size: oxc 58 vs reference 45 (no whitespaces: +13, formatted: +16)

```js
var f = function(a, b, c) {
	return b + a + c + c;
};
console.log(f('A', 'P', 'S'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(((a, b, c) => b + a + c + c)('A', 'P', 'S'));
+console.log(function(a, b, c) {
+	return b + a + c + c;
+}('A', 'P', 'S'));

```

## `uglify/assignments/evaluate_lazy_assignment`

- tags: `join vars`, `remove unused`
- size: oxc 33 vs reference 20 (no whitespaces: +13, formatted: +18)

```js
var a = 42;
console.log(a &&= 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('PASS');
+var a = 42;
+console.log(a &&= 'PASS');

```

## `uglify/assignments/issue_5670`

- tags: `join vars`
- size: oxc 56 vs reference 43 (no whitespaces: +13, formatted: +20)

```js
(function(a, b) {
	a && a && (a = b += '') || console.log('PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function(a, b) {
-	a = a, console.log('PASS');
+	a && a && (a = b += '') || console.log('PASS');
 })();

```

## `uglify/awaits/inline_block_await_async_return`

- size: oxc 184 vs reference 171 (no whitespaces: +13, formatted: +22)

```js
console.log('foo');
(async function() {
	console.log('bar');
	await async function() {
		for (var a of ['baz']) return { then(r) {
			console.log('moo');
			r(a);
		} };
	}();
})().then(console.log);
console.log('moz');

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 console.log('foo');
 (async function() {
 	console.log('bar');
-	for (var a of ['baz']) return void await { then(r) {
-		console.log('moo');
-		r(a);
-	} };
-	;
+	await async function() {
+		for (var a of ['baz']) return { then(r) {
+			console.log('moo');
+			r(a);
+		} };
+	}();
 })().then(console.log);
 console.log('moz');

```

## `uglify/awaits/issue_5250`

- size: oxc 107 vs reference 94 (no whitespaces: +13, formatted: +18)

```js
(async function() {
	await function() {
		while (console.log('foo'));
	}();
	console.log('bar');
})();
console.log('baz');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 (async function() {
-	while (console.log('foo'));
-	await 0;
+	await function() {
+		for (; console.log('foo'););
+	}();
 	console.log('bar');
 })();
 console.log('baz');

```

## `uglify/collapse_vars/issue_3894`

- tags: `join vars`, `remove unused`
- size: oxc 103 vs reference 90 (no whitespaces: +13, formatted: +19)

```js
function log(msg) {
	console.log(msg ? 'FAIL' : 'PASS');
}
var a, c;
(function(b) {
	a = c = 0, log(b);
})(-0);
log(a);
log(c);

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,8 @@
 	console.log(msg ? 'FAIL' : 'PASS');
 }
 var a, c;
-void log(-(a = c = 0));
+(function(b) {
+	a = c = 0, log(b);
+})(-0);
 log(a);
 log(c);

```

## `uglify/collapse_vars/issue_5396`

- tags: `join vars`, `remove unused`
- size: oxc 102 vs reference 89 (no whitespaces: +13, formatted: +20)

```js
var a, b;
function f() {}
b = 0;
new function g(c) {
	var d = a && g(e), e = ++d, i = [42];
	for (var j in i) console.log('PASS'), i;
}();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a, b;
 function f() {}
 b = 0;
-(function g(c) {
-	a && g();
+new function g(c) {
+	var d = a && g(e), e = ++d;
 	for (var j in [42]) console.log('PASS');
-})();
+}();

```

## `uglify/conditionals/hoist_decl`

- tags: `join vars`, `sequences`
- size: oxc 33 vs reference 20 (no whitespaces: +13, formatted: +23)

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
-(x() ? y : z)();
+if (x()) {
+	var a;
+	y();
+} else {
+	z();
+	var b;
+}

```

## `uglify/conditionals/merge_tail_sequence_3`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 140 vs reference 127 (no whitespaces: +13, formatted: +22)

```js
(function(a, b) {
	if (b = a.shift()) console.log('foo'), console.log(b);
	else {
		if (b = a.shift()) while (console.log('bar'));
		console.log(b);
	}
})([false, 'baz']);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 (function(a, b) {
-	if (b = a.shift()) console.log('foo');
-	else if (b = a.shift()) while (console.log('bar'));
-	console.log(b);
-})([false, 'baz']);
+	if (b = a.shift()) console.log('foo'), console.log(b);
+	else {
+		if (b = a.shift()) for (; console.log('bar'););
+		console.log(b);
+	}
+})([!1, 'baz']);

```

## `uglify/const/issue_5254`

- size: oxc 74 vs reference 61 (no whitespaces: +13, formatted: +18)

```js
do {
	(function() {
		const a = console.log;
		a && a('foo');
	})();
} while (console.log('bar'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-do {
-	const a = console.log;
-	a && a('foo');
-} while (console.log('bar'));
+do
+	(function() {
+		let a = console.log;
+		a && a('foo');
+	})();
+while (console.log('bar'));

```

## `uglify/const/issue_5580_2`

- tags: `join vars`
- size: oxc 131 vs reference 118 (no whitespaces: +13, formatted: +21)

```js
'use strict';
(function() {
	try {
		throw 'PASS';
	} catch (e) {
		return function() {
			console.log(e);
			{
				const e = 'FAIL 1';
			}
		}();
	} finally {
		const e = 'FAIL 2';
	}
})();

```

```diff
--- reference
+++ oxc
@@ -3,12 +3,13 @@
 	try {
 		throw 'PASS';
 	} catch (e) {
-		console.log(e);
-		{
-			const e = 'FAIL 1';
-		}
-		return;
+		return function() {
+			console.log(e);
+			{
+				let e = 'FAIL 1';
+			}
+		}();
 	} finally {
-		var e = 'FAIL 2';
+		let e = 'FAIL 2';
 	}
 })();

```

## `uglify/default-values/drop_empty_iife`

- size: oxc 71 vs reference 58 (no whitespaces: +13, formatted: +15)

```js
console.log(function(a = console.log('foo')) {}(void console.log('baz')));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((console.log('baz'), void console.log('foo')));
+console.log(function(a = console.log('foo')) {}(void console.log('baz')));

```

## `uglify/default-values/drop_new_function`

- size: oxc 38 vs reference 25 (no whitespaces: +13, formatted: +18)

```js
new function(a = console.log('PASS')) {}();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-void console.log('PASS');
+new function(a = console.log('PASS')) {}();

```

## `uglify/default-values/inline_destructured`

- size: oxc 46 vs reference 33 (no whitespaces: +13, formatted: +16)

```js
console.log(function([a] = []) {
	return 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(([[] = []] = [], 'PASS'));
+console.log(function([a] = []) {
+	return 'PASS';
+}());

```

## `uglify/destructured/issue_4319`

- tags: `join vars`
- size: oxc 73 vs reference 60 (no whitespaces: +13, formatted: +16)

```js
function f(a) {
	while (!a);
}
console.log(function({}) {
	return f(console);
}(0));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 function f(a) {
-	while (!a);
+	for (; !a;);
 }
-console.log(([{}] = [0], f(console)));
+console.log(function({}) {
+	return f(console);
+}(0));

```

## `uglify/destructured/simple_const`

- tags: `join vars`, `remove unused`
- size: oxc 33 vs reference 20 (no whitespaces: +13, formatted: +17)

```js
const [a] = ['PASS'];
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('PASS');
+const [a] = ['PASS'];
+console.log(a);

```

## `uglify/drop-unused/issue_3962_2`

- tags: `join vars`, `remove unused`
- size: oxc 98 vs reference 85 (no whitespaces: +13, formatted: +24)

```js
var a = 0;
function f(b, c) {
	do {
		var d = console + e, e = 0 .toString() === b;
	} while (0);
	if (c) console.log('PASS');
}
var a = f(a--, 1);
a;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 var a = 0;
-(function(c) {
+function f(b, c) {
 	do {
-		console;
-		0 .toString();
+		console + e;
+		var e = b === '0';
 	} while (0);
-	if (c) console.log('PASS');
-})(1);
+	c && console.log('PASS');
+}
+var a = f(a--, 1);

```

## `uglify/drop-unused/issue_4235_1`

- tags: `join vars`, `remove unused`
- size: oxc 53 vs reference 40 (no whitespaces: +13, formatted: +20)

```js
(function() {
	{
		const f = 0;
	}
	(function f() {
		var f = console.log(f);
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-void function() {
-	var f = console.log(f);
-}();
+(function() {
+	(function() {
+		var f = console.log(f);
+	})();
+})();

```

## `uglify/evaluate/truthy_conditionals`

- tags: `sequences`
- size: oxc 49 vs reference 36 (no whitespaces: +13, formatted: +17)

```js
if (a = {}) x();
(b = /foo/) && y();
(c = function() {}) || z();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-a = {}, x();
-b = /foo/, y();
-c = function() {};
+(a = {}) && x(), (b = /foo/) && y(), (c = function() {}) || z();

```

## `uglify/evaluate/unsafe_constant`

- size: oxc 174 vs reference 161 (no whitespaces: +13, formatted: +11)

```js
console.log(true.a, false.a);
console.log(true.valueOf(), false.valueOf());
try {
	console.log(null.a);
} catch (e) {
	console.log('PASS');
}
try {
	console.log(undefined.a);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-console.log(void 0, void 0);
-console.log(true, false);
+console.log((!0).a, (!1).a);
+console.log((!0).valueOf(), (!1).valueOf());
 try {
 	console.log(null.a);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }
 try {
 	console.log((void 0).a);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/functions/hoisted_inline`

- tags: `join vars`, `remove unused`
- size: oxc 93 vs reference 80 (no whitespaces: +13, formatted: +20)

```js
function f() {
	console.log('PASS');
}
function g() {
	for (var console in [0]) h();
}
function h() {
	f();
}
g();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,10 @@
 function f() {
 	console.log('PASS');
 }
-(function() {
-	for (var console in [0]) void f();
-})();
+function g() {
+	for (var console in [0]) h();
+}
+function h() {
+	f();
+}
+g();

```

## `uglify/functions/issue_2620_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 101 vs reference 88 (no whitespaces: +13, formatted: +20)

```js
var c = 'FAIL';
(function() {
	function f(a) {
		var b = function g(a) {
			a && a();
		}();
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
@@ -1,7 +1,9 @@
 var c = 'FAIL';
 (function() {
-	var a = 1;
-	if (function(a) {
-		a && a();
-	}(), a) c = 'PASS';
+	function f(a) {
+		(function(a) {
+			a && a();
+		})(), a && (c = 'PASS');
+	}
+	f(1);
 })(), console.log(c);

```

## `uglify/if_return/drop_try`

- size: oxc 105 vs reference 92 (no whitespaces: +13, formatted: +14)

```js
function f() {
	try {
		return console.log('foo'), 'bar';
	} finally {
		console.log('baz');
	}
	return 'bar';
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f() {
 	try {
-		console.log('foo');
+		return console.log('foo'), 'bar';
 	} finally {
 		console.log('baz');
 	}

```

## `uglify/if_return/issue_5597`

- tags: `sequences`, `remove unused`
- size: oxc 73 vs reference 60 (no whitespaces: +13, formatted: +16)

```js
function f(a) {
	if (a) L: {
		return;
		var b;
	}
	else return 'FAIL';
}
console.log(f(42) || 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function f(a) {
-	if (!a) return 'FAIL';
+	if (a) L: return;
+	else return 'FAIL';
 }
 console.log(f(42) || 'PASS');

```

## `uglify/issue-1041/const_pragma`

- tags: `join vars`
- size: oxc 31 vs reference 18 (no whitespaces: +13, formatted: +14)

```js
/** @const */ var goog = goog || {};

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var goog = goog || {};
+/** @const */ var goog = goog || {};

```

## `uglify/labels/labels_11`

- tags: `sequences`, `remove unused`
- size: oxc 33 vs reference 20 (no whitespaces: +13, formatted: +16)

```js
L: if (console.log('PASS')) break L;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+L: if (console.log('PASS')) break L;

```

## `uglify/let/default_init`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 46 vs reference 33 (no whitespaces: +13, formatted: +16)

```js
'use strict';
let a;
a = 'PASS';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 'use strict';
+let a = 'PASS';
 console.log('PASS');

```

## `uglify/loops/issue_4091_2`

- tags: `remove unused`
- size: oxc 62 vs reference 49 (no whitespaces: +13, formatted: +16)

```js
try {
	throw 'FAIL';
} catch (e) {
	for (e in 42);
	var e;
}
console.log(e && e);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 try {
 	throw 'FAIL';
 } catch (e) {
+	for (e in 42);
 	var e;
 }
 console.log(e && e);

```

## `uglify/numbers/evaluate_2`

- tags: `join vars`
- size: oxc 195 vs reference 182 (no whitespaces: +13, formatted: +21)

```js
function f(num) {
	var x = '' + num, y = null;
	[
		x + 1 + 2,
		x * 1 * 2,
		+x + 1 + 2,
		1 + x + 2 + 3,
		1 | x | 2 | 3,
		1 + x-- + 2 + 3,
		1 + (x * y + 2) + 3,
		1 + (2 + x + 3),
		1 + (2 + ~x + 3),
		-y + (2 + ~x + 3),
		1 & (2 & x & 3),
		1 + (2 + (x |= 0) + 3)
	].forEach(function(n) {
		console.log(typeof n, n);
	});
}
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,18 @@
 function f(num) {
 	var x = '' + num, y = null;
 	[
-		x + '12',
-		2 * x,
+		x + 1 + 2,
+		x * 1 * 2,
 		+x + 1 + 2,
-		1 + x + '23',
-		3 | x,
+		1 + x + 2 + 3,
+		x | 3,
 		1 + x-- + 2 + 3,
-		x * y + 2 + 1 + 3,
-		2 + x + 3 + 1,
-		2 + ~x + 3 + 1,
-		2 + ~x + 3,
-		0 & x,
-		2 + (x |= 0) + 3 + 1
+		1 + (x * y + 2) + 3,
+		1 + (2 + x + 3),
+		1 + (2 + ~x + 3),
+		-y + (2 + ~x + 3),
+		x & 0,
+		1 + (2 + (x |= 0) + 3)
 	].forEach(function(n) {
 		console.log(typeof n, n);
 	});

```

## `uglify/numbers/issue_3547_2`

- size: oxc 85 vs reference 72 (no whitespaces: +13, formatted: +9)

```js
[
	'1' + 1 / 0 + 0,
	'1' + 1 / 0 - 0,
	'1' - 1 / 0 + 0,
	'1' - 1 / 0 - 0
].forEach(function(n) {
	console.log(typeof n, n);
});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 [
-	'1' + 1 / 0 + 0,
+	'1Infinity0',
 	NaN,
-	-1 / 0,
-	-1 / 0
+	-Infinity,
+	'1' - 1 / 0 - 0
 ].forEach(function(n) {
 	console.log(typeof n, n);
 });

```

## `uglify/reduce_vars/drop_side_effect_free`

- tags: `join vars`
- size: oxc 44 vs reference 31 (no whitespaces: +13, formatted: +19)

```js
var a = 123;
'' + (a && (a.b = 0) || a);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 123;
-a.b = 0;
+'' + (a && (a.b = 0) || a);
 console.log(a);

```

## `uglify/reduce_vars/issue_3894`

- tags: `join vars`, `remove unused`
- size: oxc 85 vs reference 72 (no whitespaces: +13, formatted: +19)

```js
function log(msg) {
	console.log(msg ? 'FAIL' : 'PASS');
}
var a;
(function(b) {
	a = 0, log(b);
})(-0);

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,6 @@
 	console.log(msg ? 'FAIL' : 'PASS');
 }
 var a;
-void log(-(a = 0));
+(function(b) {
+	a = 0, log(b);
+})(-0);

```

## `uglify/reduce_vars/issue_5915_4`

- tags: `join vars`, `remove unused`
- size: oxc 57 vs reference 44 (no whitespaces: +13, formatted: +18)

```js
if (console) {
	f = void 0;
	function f() {}
	console.log(typeof f);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 if (console) {
-	void 0;
-	console.log('undefined');
+	f = void 0;
+	function f() {}
+	console.log(typeof f);
 }

```

## `uglify/spreads/issue_4342`

- size: oxc 54 vs reference 41 (no whitespaces: +13, formatted: +13)

```js
try {
	new function() {}(...42);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
-	[...42];
-} catch (e) {
+	new function() {}(...42);
+} catch {
 	console.log('PASS');
 }

```

## `uglify/switches/issue_1750`

- tags: `sequences`
- size: oxc 51 vs reference 38 (no whitespaces: +13, formatted: +20)

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
@@ -1,4 +1,5 @@
 var a = 0, b = 1;
-true;
-b = 2;
+switch (!0) {
+	case !0: b = 2;
+}
 console.log(a, b);

```

## `uglify/yields/func_to_arrow_var`

- tags: `type:module`
- size: oxc 57 vs reference 44 (no whitespaces: +13, formatted: +17)

```js
var yield = 'PASS';
console.log(function() {
	return yield;
}());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
 var yield = 'PASS';
-console.log((() => yield)());
+console.log(function() {
+	return 'PASS';
+}());

```

## `uglify/arrays/for_loop`

- tags: `join vars`, `remove unused`
- size: oxc 262 vs reference 248 (no whitespaces: +14, formatted: +15)

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

## `uglify/asm/issue_3636_1`

- size: oxc 132 vs reference 118 (no whitespaces: +14, formatted: +9)

```js
function n(stdlib, foreign, buffer) {
	'use asm';
	function add(x, y) {
		x = x | 0;
		y = y | 0;
		return x + y | 0;
	}
	return { add };
}
console.log(new n().add('foo', 42));

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-function n(o, e, u) {
+function n(stdlib, foreign, buffer) {
 	'use asm';
-	function d(n, o) {
-		n = n | 0;
-		o = o | 0;
-		return n + o | 0;
+	function add(x, y) {
+		x |= 0;
+		y |= 0;
+		return x + y | 0;
 	}
-	return { add: d };
+	return { add };
 }
 console.log(new n().add('foo', 42));

```

## `uglify/asm/issue_3636_2`

- size: oxc 137 vs reference 123 (no whitespaces: +14, formatted: +9)

```js
var n = function(stdlib, foreign, buffer) {
	'use asm';
	function add(x, y) {
		x = x | 0;
		y = y | 0;
		return x + y | 0;
	}
	return { add };
};
console.log(new n().add('foo', 42));

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-var n = function(n, o, e) {
+var n = function(stdlib, foreign, buffer) {
 	'use asm';
-	function r(n, o) {
-		n = n | 0;
-		o = o | 0;
-		return n + o | 0;
+	function add(x, y) {
+		x |= 0;
+		y |= 0;
+		return x + y | 0;
 	}
-	return { add: r };
+	return { add };
 };
 console.log(new n().add('foo', 42));

```

## `uglify/classes/issue_4705`

- tags: `join vars`, `remove unused`
- size: oxc 49 vs reference 35 (no whitespaces: +14, formatted: +23)

```js
var a = 'PASS';
class A {
	p = a = 'FAIL';
	[console.log(a)];
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-(class {
-	[console.log('PASS')]() {}
-});
+var a = 'PASS';
+class A {
+	p = a = 'FAIL';
+	[console.log(a)];
+}

```

## `uglify/const/issue_4202`

- size: oxc 70 vs reference 56 (no whitespaces: +14, formatted: +24)

```js
{
	const o = {};
	(function() {
		function f() {
			o.p = 42;
		}
		f(f);
	})();
	console.log(o.p++);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 {
-	const o = {};
-	function f() {
-		o.p = 42;
-	}
-	f(f);
+	let o = {};
+	(function() {
+		function f() {
+			o.p = 42;
+		}
+		f(f);
+	})();
 	console.log(o.p++);
 }

```

## `uglify/dead-code/collapse_vars_misc`

- tags: `join vars`, `remove unused`
- size: oxc 78 vs reference 64 (no whitespaces: +14, formatted: +21)

```js
function f10(x) {
	var a = 5, b = 3;
	return a += b;
}
function f11(x) {
	var a = 5, b = 3;
	return a += --b;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 function f10(x) {
-	return 5 + 3;
+	var a = 5;
+	return a += 3;
 }
 function f11(x) {
-	var b = 3;
-	return 5 + --b;
+	var a = 5, b = 3;
+	return a += --b;
 }

```

## `uglify/destructured/funarg_unused_6_inline`

- tags: `remove unused`
- size: oxc 49 vs reference 35 (no whitespaces: +14, formatted: +21)

```js
(function(a) {
	var {} = (a = console, 42);
})();
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-void console;
+(function(a) {
+	a = console;
+})();
 console.log(typeof a);

```

## `uglify/destructured/redefine_arguments_3`

- tags: `remove unused`
- size: oxc 31 vs reference 17 (no whitespaces: +14, formatted: +15)

```js
(function([], arguments) {})([]);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(function() {})();
+(function([], arguments) {})([]);

```

## `uglify/destructured/redefine_arguments_4`

- tags: `remove unused`
- size: oxc 14 vs reference 0 (no whitespaces: +14, formatted: +16)

```js
function f() {
	(function({}, arguments) {});
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+function f() {}

```

## `uglify/drop-unused/drop_toplevel_funcs_retain`

- tags: `remove unused`
- size: oxc 100 vs reference 86 (no whitespaces: +14, formatted: +16)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -6,4 +6,5 @@
 }
 a = 2;
 function g() {}
+function h() {}
 console.log(b = 3);

```

## `uglify/drop-unused/issue_4834`

- tags: `join vars`, `remove unused`
- size: oxc 57 vs reference 43 (no whitespaces: +14, formatted: +20)

```js
try {
	new function(a, b) {
		b;
		b.p;
	}(42);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 try {
-	b.p;
-} catch (e) {
+	new function(a, b) {
+		b.p;
+	}(42);
+} catch {
 	console.log('PASS');
 }
-var b;

```

## `uglify/drop-unused/unused_circular_references_2`

- tags: `remove unused`
- size: oxc 47 vs reference 33 (no whitespaces: +14, formatted: +20)

```js
function f(x, y) {
	var foo = 1, bar = baz, baz = foo + bar, qwe = moo();
	return x + y;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function f(x, y) {
+	var baz = 1 + baz;
 	moo();
 	return x + y;
 }

```

## `uglify/evaluate/inlined_increment_postfix`

- tags: `join vars`
- size: oxc 46 vs reference 32 (no whitespaces: +14, formatted: +21)

```js
var a = 0;
(function() {
	a++;
})();
console.log(a += 0);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var a = 0;
-void a++;
-console.log(1);
+(function() {
+	a++;
+})();
+console.log(a += 0);

```

## `uglify/evaluate/or`

- size: oxc 437 vs reference 423 (no whitespaces: +14, formatted: +12)

```js
var a;
// compress these
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
// don't compress these
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
@@ -18,11 +17,12 @@
 a = 7;
 a = console.log(null);
 a = console.log(condition && null);
-a = condition || true;
+// don't compress these
+a = condition || !0;
 a = console.log('a') || 2;
 a = 4 - condition || 'string';
 a = 6 << condition || -4.5;
-a = condition || false;
+a = condition || !1;
 a = console.log('b') || NaN;
 a = console.log('c') || 0;
 a = 2 * condition || void 0;

```

## `uglify/functions/block_scope_4_compress`

- tags: `join vars`, `remove unused`
- size: oxc 38 vs reference 24 (no whitespaces: +14, formatted: +20)

```js
{
	console.log(typeof f);
	function f() {}
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('function');
+{
+	console.log(typeof f);
+	function f() {}
+}

```

## `uglify/functions/issue_2476`

- tags: `join vars`, `remove unused`
- size: oxc 107 vs reference 93 (no whitespaces: +14, formatted: +12)

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
@@ -1,3 +1,5 @@
-for (var sum = 0, i = 0; i < 10; i++) sum += (x = i, y = i + 1, z = 3 * i, x < y ? x * y + z : x * z - y);
-var x, y, z;
+function foo(x, y, z) {
+	return x < y ? x * y + z : x * z - y;
+}
+for (var sum = 0, i = 0; i < 10; i++) sum += foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `uglify/functions/issue_2620_4`

- tags: `join vars`, `remove unused`
- size: oxc 129 vs reference 115 (no whitespaces: +14, formatted: +29)

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
-!function(a, NaN) {
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
-}(NaN);
+		g();
+	}
+	f(NaN);
+})();
 console.log(c);

```

## `uglify/functions/issue_4159`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 41 (no whitespaces: +14, formatted: +22)

```js
var a = 42, c = function(b) {
	(b = a) && console.log(a++, b);
}(c = a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = 42;
-(b = a) && console.log(a++, b);
-var b;
+var a = 42, c = function(b) {
+	(b = a) && console.log(a++, b);
+}(c = a);

```

## `uglify/global_defs/keyword`

- size: oxc 33 vs reference 19 (no whitespaces: +14, formatted: +14)

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

## `uglify/if_return/nested_if_break`

- tags: `sequences`
- size: oxc 79 vs reference 65 (no whitespaces: +14, formatted: +20)

```js
for (var i = 0; i < 3; i++) L1: if ('number' == typeof i) {
	if (0 === i) break L1;
	console.log(i);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (var i = 0; i < 3; i++) L1: 'number' == typeof i && 0 !== i && console.log(i);
+for (var i = 0; i < 3; i++) L1: if (typeof i == 'number') {
+	if (i === 0) break L1;
+	console.log(i);
+}

```

## `uglify/if_return/switch_break`

- tags: `sequences`
- size: oxc 211 vs reference 197 (no whitespaces: +14, formatted: +22)

```js
function f(a) {
	switch (a) {
		default:
			if (console.log('foo')) break;
			while (console.log('bar'));
		case 42:
			if (console.log('baz')) break;
			while (console.log('moo'));
			break;
		case null: if (console.log('moz')) break;
	}
}
f();
f(42);
f(null);

```

```diff
--- reference
+++ oxc
@@ -2,13 +2,12 @@
 	switch (a) {
 		default:
 			if (console.log('foo')) break;
-			while (console.log('bar'));
+			for (; console.log('bar'););
 		case 42:
-			if (!console.log('baz')) while (console.log('moo'));
+			if (console.log('baz')) break;
+			for (; console.log('moo'););
 			break;
-		case null: console.log('moz');
+		case null: if (console.log('moz')) break;
 	}
 }
-f();
-f(42);
-f(null);
+f(), f(42), f(null);

```

## `uglify/issue-1588/safe_undefined`

- tags: `sequences`
- size: oxc 94 vs reference 80 (no whitespaces: +14, formatted: +13)

```js
var a, c;
console.log(function(undefined) {
	return function() {
		if (a) return b;
		if (c) return d;
	};
}(1)());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var a, c;
-console.log(function(n) {
+console.log(function(undefined) {
 	return function() {
-		return a ? b : c ? d : void 0;
+		if (a) return b;
+		if (c) return d;
 	};
 }(1)());

```

## `uglify/issue-281/issue_1288_side_effects`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 28 vs reference 14 (no whitespaces: +14, formatted: +19)

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
@@ -1,3 +1,3 @@
-w;
-x || (x = {});
-y;
+w, x || (function() {
+	x = {};
+})(), y;

```

## `uglify/let/issue_4274_1`

- size: oxc 67 vs reference 53 (no whitespaces: +14, formatted: +15)

```js
'use strict';
for (;;) {
	if (console.log('PASS')) {
		let a;
	} else {
		break;
		var a;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'use strict';
-for (; console.log('PASS');) {
-	{
-		let a;
-	}
+for (;;) if (console.log('PASS')) {
+	let a;
+} else {
+	break;
 	var a;
 }

```

## `uglify/let/issue_4274_2`

- size: oxc 67 vs reference 53 (no whitespaces: +14, formatted: +15)

```js
'use strict';
for (;;) {
	if (!console.log('PASS')) {
		break;
		var a;
	} else {
		let a;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'use strict';
-for (; console.log('PASS');) {
-	{
-		let a;
-	}
+for (;;) if (console.log('PASS')) {
+	let a;
+} else {
+	break;
 	var a;
 }

```

## `uglify/loops/empty_for_in_prop_init`

- tags: `remove unused`
- size: oxc 81 vs reference 67 (no whitespaces: +14, formatted: +16)

```js
console.log(function f() {
	var a = 'bar';
	for ((a, f)[a] in console.log('foo'));
	return a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-console.log(function() {
+console.log(function f() {
 	var a = 'bar';
-	console.log('foo');
+	for (f[a] in console.log('foo'));
 	return a;
 }());

```

## `uglify/merge_vars/issue_5770_2`

- tags: `join vars`, `sequences`
- size: oxc 86 vs reference 72 (no whitespaces: +14, formatted: +15)

```js
L: do {
	for (var a = 'FAIL 1'; a; a--) continue L;
	var b = 'FAIL 2';
} while (console.log(b || 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 L: do {
-	var a = 'FAIL 1';
-	var b;
-} while (a || (b = 'FAIL 2'), console.log(b || 'PASS'));
+	for (var a = 'FAIL 1'; a; a--) continue L;
+	var b = 'FAIL 2';
+} while (console.log(b || 'PASS'));

```

## `uglify/merge_vars/read_before_assign_1`

- tags: `join vars`, `sequences`
- size: oxc 51 vs reference 37 (no whitespaces: +14, formatted: +18)

```js
var c = 0;
c = 0;
(function() {
	var a = console.log(++a);
	a;
})();
c;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var c = 0;
-var a;
-c = 0, a = console.log(++a);
+c = 0, (function() {
+	var a = console.log(++a);
+})();

```

## `uglify/properties/mangle_unquoted_properties`

- size: oxc 162 vs reference 148 (no whitespaces: +14, formatted: +14)

```js
a.top = 1;
function f1() {
	a['foo'] = 'bar';
	a.color = 'red';
	a.stuff = 2;
	x = {
		'bar': 10,
		size: 7
	};
	a.size = 9;
}
function f2() {
	a.foo = 'bar';
	a['color'] = 'red';
	x = {
		bar: 10,
		size: 7
	};
	a.size = 9;
	a.stuff = 3;
}

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,21 @@
-a.a = 1;
+a.top = 1;
 function f1() {
-	a['foo'] = 'bar';
+	a.foo = 'bar';
 	a.color = 'red';
-	a.r = 2;
+	a.stuff = 2;
 	x = {
-		'bar': 10,
-		b: 7
+		bar: 10,
+		size: 7
 	};
-	a.b = 9;
+	a.size = 9;
 }
 function f2() {
 	a.foo = 'bar';
-	a['color'] = 'red';
+	a.color = 'red';
 	x = {
 		bar: 10,
-		b: 7
+		size: 7
 	};
-	a.b = 9;
-	a.r = 3;
+	a.size = 9;
+	a.stuff = 3;
 }

```

## `uglify/reduce_vars/defun_catch_1`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 37 (no whitespaces: +14, formatted: +16)

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
@@ -1,3 +1,4 @@
+function a() {}
 try {
 	throw 42;
 } catch (a) {

```

## `uglify/reduce_vars/defun_catch_2`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 37 (no whitespaces: +14, formatted: +17)

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
@@ -1,4 +1,5 @@
 try {
+	function a() {}
 	throw 42;
 } catch (a) {
 	console.log(a);

```

## `uglify/reduce_vars/defun_catch_6`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 37 (no whitespaces: +14, formatted: +16)

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
@@ -3,3 +3,4 @@
 } catch (a) {
 	console.log(a);
 }
+function a() {}

```

## `uglify/reduce_vars/escape_local_throw`

- tags: `join vars`, `remove unused`
- size: oxc 169 vs reference 155 (no whitespaces: +14, formatted: +19)

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
-	if (thing !== baz()) console.log('PASS');
-	else console.log('FAIL');
-})();
+main();

```

## `uglify/reduce_vars/issue_2455`

- tags: `join vars`, `remove unused`
- size: oxc 47 vs reference 33 (no whitespaces: +14, formatted: +18)

```js
function foo() {
	var that = this;
	for (;;) that.bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function foo() {
-	for (;;) this.bar();
+	var that = this;
+	for (;;) that.bar();
 }

```

## `uglify/rests/issue_5391`

- tags: `join vars`, `remove unused`
- size: oxc 75 vs reference 61 (no whitespaces: +14, formatted: +25)

```js
var a, b = function f({ p: {}, ...c }) {
	while (c.q);
}({ p: {
	r: a++,
	r: 0
} });
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-(function({ p: {}, ...c }) {
-	while (c.q);
-})({ p: 0 });
-console.log(NaN);
+var a, b = function({ p: {}, ...c }) {
+	for (; c.q;);
+}({ p: {
+	r: a++,
+	r: 0
+} });
+console.log(a);

```

## `uglify/side_effects/global_fns`

- size: oxc 150 vs reference 136 (no whitespaces: +14, formatted: +16)

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

## `uglify/varify/drop_forin_let`

- tags: `remove unused`
- size: oxc 47 vs reference 33 (no whitespaces: +14, formatted: +15)

```js
'use strict';
for (let a in console.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 'use strict';
-console.log('PASS');
+for (let a in console.log('PASS'));

```

## `uglify/awaits/inline_block_await`

- size: oxc 152 vs reference 137 (no whitespaces: +15, formatted: +22)

```js
console.log('foo');
(async function() {
	console.log('bar');
	await async function() {
		for (var a of ['baz']) return a;
	}();
})().then(console.log);
console.log('moo');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 console.log('foo');
 (async function() {
 	console.log('bar');
-	for (var a of ['baz']) return void await a;
+	await async function() {
+		for (var a of ['baz']) return a;
+	}();
 })().then(console.log);
 console.log('moo');

```

## `uglify/booleans/issue_5228`

- tags: `2 iterations`
- size: oxc 78 vs reference 63 (no whitespaces: +15, formatted: +17)

```js
console.log(function() {
	return !function() {
		do {
			return null;
		} while (console);
	}();
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 console.log(function() {
-	do {
-		return !0;
-	} while (console);
-	return !0;
+	return !function() {
+		do
+			return null;
+		while (console);
+	}();
 }());

```

## `uglify/classes/issue_5724`

- tags: `remove unused`
- size: oxc 63 vs reference 48 (no whitespaces: +15, formatted: +24)

```js
'use strict';
class A {
	static P = function(a) {
		console.log(a, a);
	}(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 'use strict';
-(function(a) {
-	console.log(a, a);
-})(a);
+class A {
+	static P = function(a) {
+		console.log(a, a);
+	}(a);
+}

```

## `uglify/collapse_vars/assign_value_def`

- tags: `join vars`, `remove unused`
- size: oxc 141 vs reference 126 (no whitespaces: +15, formatted: +28)

```js
function f(a) {
	while (1) {
		var b = a[0], c = a[1];
		d = b;
		e = c;
		if (c[0] - e[0] > c[1] - d[1]) break;
		return 'PASS';
	}
	var d, e;
	return 'FAIL';
}
console.log(f([[1, 2], [3, 4]]));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,12 @@
 function f(a) {
-	while (1) {
+	for (;;) {
 		var b = a[0], c = a[1];
-		if (c[0] - c[0] > c[1] - b[1]) break;
+		d = b;
+		e = c;
+		if (c[0] - e[0] > c[1] - d[1]) break;
 		return 'PASS';
 	}
+	var d, e;
 	return 'FAIL';
 }
 console.log(f([[1, 2], [3, 4]]));

```

## `uglify/collapse_vars/join_vars_value_def`

- tags: `join vars`, `remove unused`
- size: oxc 141 vs reference 126 (no whitespaces: +15, formatted: +28)

```js
function f(a) {
	while (1) {
		var b = a[0], c = a[1];
		d = b;
		e = c;
		if (c[0] - e[0] > c[1] - d[1]) break;
		return 'PASS';
	}
	var d, e;
	return 'FAIL';
}
console.log(f([[1, 2], [3, 4]]));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,12 @@
 function f(a) {
-	while (1) {
+	for (;;) {
 		var b = a[0], c = a[1];
-		if (c[0] - c[0] > c[1] - b[1]) break;
+		d = b;
+		e = c;
+		if (c[0] - e[0] > c[1] - d[1]) break;
 		return 'PASS';
 	}
+	var d, e;
 	return 'FAIL';
 }
 console.log(f([[1, 2], [3, 4]]));

```

## `uglify/collapse_vars/var_value_def`

- tags: `join vars`, `remove unused`
- size: oxc 141 vs reference 126 (no whitespaces: +15, formatted: +24)

```js
function f(a) {
	while (1) {
		var b = a[0], c = a[1], d = b, e = c;
		if (c[0] - e[0] > c[1] - d[1]) break;
		return 'PASS';
	}
	var d, e;
	return 'FAIL';
}
console.log(f([[1, 2], [3, 4]]));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 function f(a) {
-	while (1) {
-		var b = a[0], c = a[1];
-		if (c[0] - c[0] > c[1] - b[1]) break;
+	for (;;) {
+		var b = a[0], c = a[1], d = b, e = c;
+		if (c[0] - e[0] > c[1] - d[1]) break;
 		return 'PASS';
 	}
+	var d, e;
 	return 'FAIL';
 }
 console.log(f([[1, 2], [3, 4]]));

```

## `uglify/conditionals/merge_tail_3`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 121 vs reference 106 (no whitespaces: +15, formatted: +25)

```js
(function(a, b) {
	if (b = a.shift()) console.log(b);
	else {
		if (b = a.shift()) while (console.log('foo'));
		console.log(b);
	}
})([false, 'bar']);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 (function(a, b) {
-	if (!(b = a.shift()) && (b = a.shift())) while (console.log('foo'));
-	console.log(b);
-})([false, 'bar']);
+	if (b = a.shift()) console.log(b);
+	else {
+		if (b = a.shift()) for (; console.log('foo'););
+		console.log(b);
+	}
+})([!1, 'bar']);

```

## `uglify/dead-code/issue_4570`

- size: oxc 52 vs reference 37 (no whitespaces: +15, formatted: +20)

```js
var a = function(b) {
	return a += b;
}() ? 0 : a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-var a = (a += void 0) ? 0 : a;
+var a = function(b) {
+	return a += b;
+}() ? 0 : a;
 console.log(a);

```

## `uglify/drop-unused/issue_2226_1`

- tags: `remove unused`
- size: oxc 124 vs reference 109 (no whitespaces: +15, formatted: +21)

```js
function f1() {
	var a = b;
	a += c;
}
function f2(a) {
	a <<= b;
}
function f3(a) {
	--a;
}
function f4() {
	var a = b;
	return a *= c;
}
function f5(a) {
	x(a /= b);
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 function f1() {
-	b;
-	c;
+	var a = b;
+	a += c;
 }
 function f2(a) {
-	b;
+	a <<= b;
 }
 function f3(a) {
-	0;
+	--a;
 }
 function f4() {
 	var a = b;

```

## `uglify/drop-unused/issue_2768`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 88 vs reference 73 (no whitespaces: +15, formatted: +26)

```js
var a = 'FAIL', c = 1;
var c = function(b) {
	var d = b = a;
	var e = --b + (d && (a = 'PASS'));
}();
console.log(a, typeof c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a = 'FAIL';
-d = a;
-var c = void (d && (a = 'PASS'));
-var d;
+var a = 'FAIL', c = 1, c = function(b) {
+	var d = b = a;
+	--b + (d && (a = 'PASS'));
+}();
 console.log(a, typeof c);

```

## `uglify/evaluate/inlined_increment_prefix`

- tags: `join vars`
- size: oxc 46 vs reference 31 (no whitespaces: +15, formatted: +21)

```js
var a = 0;
(function() {
	++a;
})();
console.log(a += 0);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var a = 0;
-void ++a;
-console.log(1);
+(function() {
+	++a;
+})();
+console.log(a += 0);

```

## `uglify/functions/inline_do`

- size: oxc 93 vs reference 78 (no whitespaces: +15, formatted: +21)

```js
do
	(function() {
		while (console.log('foo'));
	})();
while (function() {
	while (console.log('bar'));
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-do {
-	while (console.log('foo'));
-} while (function() {
-	while (console.log('bar'));
+do
+	(function() {
+		for (; console.log('foo'););
+	})();
+while (function() {
+	for (; console.log('bar'););
 }());

```

## `uglify/functions/inline_finally_return`

- size: oxc 104 vs reference 89 (no whitespaces: +15, formatted: +22)

```js
console.log(function() {
	try {
		throw 'FAIL';
	} finally {
		return function() {
			while (console.log('PASS'));
		}(), 42;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,8 @@
 	try {
 		throw 'FAIL';
 	} finally {
-		while (console.log('PASS'));
-		return 42;
+		return function() {
+			for (; console.log('PASS'););
+		}(), 42;
 	}
 }());

```

## `uglify/functions/inline_label`

- size: oxc 46 vs reference 31 (no whitespaces: +15, formatted: +17)

```js
L: (function() {
	while (console.log('PASS'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-L: {
-	while (console.log('PASS'));
-}
+L: (function() {
+	for (; console.log('PASS'););
+})();

```

## `uglify/functions/inline_while`

- size: oxc 90 vs reference 75 (no whitespaces: +15, formatted: +19)

```js
while (function() {
	while (console.log('foo'));
}()) (function() {
	while (console.log('bar'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-while (function() {
-	while (console.log('foo'));
-}()) {
-	while (console.log('bar'));
-}
+for (; function() {
+	for (; console.log('foo'););
+}();) (function() {
+	for (; console.log('bar'););
+})();

```

## `uglify/functions/issue_5401`

- size: oxc 100 vs reference 85 (no whitespaces: +15, formatted: +16)

```js
L: for (var a in function() {
	while (console.log('PASS'));
}(), a) do {
	continue L;
} while (console.log('FAIL'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-while (console.log('PASS'));
-L: for (var a in a) do {
+L: for (var a in function() {
+	for (; console.log('PASS'););
+}(), a) do
 	continue L;
-} while (console.log('FAIL'));
+while (console.log('FAIL'));

```

## `uglify/issue-1770/numeric_literal`

- size: oxc 237 vs reference 222 (no whitespaces: +15, formatted: +15)

```js
var obj = {
	0: 0,
	'-0': 1,
	42: 2,
	'42': 3,
	37: 4,
	'0x25': 5,
	1e42: 6,
	'1E42': 7,
	'1e+42': 8
};
console.log(obj[-0], obj[-''], obj['-0']);
console.log(obj[42], obj['42']);
console.log(obj[37], obj['0x25'], obj[37], obj['37']);
console.log(obj[1e42], obj['1E42'], obj['1e+42']);

```

```diff
--- reference
+++ oxc
@@ -4,12 +4,12 @@
 	42: 2,
 	42: 3,
 	37: 4,
-	o: 5,
+	'0x25': 5,
 	1e42: 6,
-	b: 7,
-	1e42: 8
+	'1E42': 7,
+	'1e+42': 8
 };
 console.log(obj[-0], obj[-''], obj['-0']);
-console.log(obj[42], obj['42']);
-console.log(obj[37], obj['o'], obj[37], obj['37']);
-console.log(obj[1e42], obj['b'], obj['1e+42']);
+console.log(obj[42], obj[42]);
+console.log(obj[37], obj['0x25'], obj[37], obj[37]);
+console.log(obj[1e42], obj['1E42'], obj['1e+42']);

```

## `uglify/keep_fargs/issue_2226_1`

- tags: `remove unused`
- size: oxc 124 vs reference 109 (no whitespaces: +15, formatted: +21)

```js
function f1() {
	var a = b;
	a += c;
}
function f2(a) {
	a <<= b;
}
function f3(a) {
	--a;
}
function f4() {
	var a = b;
	return a *= c;
}
function f5(a) {
	x(a /= b);
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 function f1() {
-	b;
-	c;
+	var a = b;
+	a += c;
 }
 function f2(a) {
-	b;
+	a <<= b;
 }
 function f3(a) {
-	0;
+	--a;
 }
 function f4() {
 	var a = b;

```

## `uglify/labels/labels_12`

- tags: `sequences`
- size: oxc 117 vs reference 102 (no whitespaces: +15, formatted: +19)

```js
L: try {
	if (console.log('foo')) break L;
	throw 'bar';
} catch (e) {
	console.log(e);
	break L;
} finally {
	if (console.log('baz')) break L;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 L: try {
-	if (!console.log('foo')) throw 'bar';
+	if (console.log('foo')) break L;
+	throw 'bar';
 } catch (e) {
 	console.log(e);
+	break L;
 } finally {
 	if (console.log('baz')) break L;
 }

```

## `uglify/let/issue_5254`

- size: oxc 87 vs reference 72 (no whitespaces: +15, formatted: +20)

```js
'use strict';
do {
	(function() {
		let a = console.log;
		a && a('foo');
	})();
} while (console.log('bar'));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 'use strict';
-do {
-	let a = console.log;
-	a && a('foo');
-} while (console.log('bar'));
+do
+	(function() {
+		let a = console.log;
+		a && a('foo');
+	})();
+while (console.log('bar'));

```

## `uglify/numbers/issue_3547_1`

- size: oxc 84 vs reference 69 (no whitespaces: +15, formatted: +13)

```js
[
	1 / 0 + '1' + 0,
	1 / 0 + '1' - 0,
	1 / 0 - '1' + 0,
	1 / 0 - '1' - 0
].forEach(function(n) {
	console.log(typeof n, n);
});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 [
-	1 / 0 + '10',
+	'Infinity10',
 	NaN,
-	1 / 0,
-	1 / 0
+	Infinity,
+	1 / 0 - '1' - 0
 ].forEach(function(n) {
 	console.log(typeof n, n);
 });

```

## `uglify/numbers/unary_binary_parentheses`

- size: oxc 161 vs reference 146 (no whitespaces: +15, formatted: +13)

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
@@ -2,17 +2,17 @@
 	0,
 	1,
 	NaN,
-	1 / 0,
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
 ];
 v.forEach(function(x) {
 	v.forEach(function(y) {
-		console.log(x * y, x / y, x % y, -x * y, -x / y, -x % y);
+		console.log(+(x * y), +(x / y), +(x % y), -(x * y), -(x / y), -(x % y));
 	});
 });

```

## `uglify/properties/literal_duplicate_key_side_effects`

- size: oxc 54 vs reference 39 (no whitespaces: +15, formatted: +22)

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

## `uglify/pure_getters/issue_2938_4`

- tags: `remove unused`, `pure getters`
- size: oxc 169 vs reference 154 (no whitespaces: +15, formatted: +18)

```js
var Parser = function Parser() {};
var p = Parser.prototype;
var unused = p.x;
p.initialContext = function initialContext() {
	p.y;
	console.log('PASS');
};
p.braceIsBlock = function() {};
new Parser().initialContext();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var Parser = function() {};
 var p = Parser.prototype;
+var unused = p.x;
 p.initialContext = function() {
 	console.log('PASS');
 };

```

## `uglify/reduce_vars/defun_catch_3`

- tags: `join vars`, `remove unused`
- size: oxc 52 vs reference 37 (no whitespaces: +15, formatted: +17)

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
@@ -1,5 +1,6 @@
 try {
 	throw 42;
+	function a() {}
 } catch (a) {
 	console.log(a);
 }

```

## `uglify/reduce_vars/pure_getters_3`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 15 vs reference 0 (no whitespaces: +15, formatted: +21)

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

## `uglify/reduce_vars/unsafe_evaluate_array_4`

- tags: `join vars`
- size: oxc 83 vs reference 68 (no whitespaces: +15, formatted: +15)

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

## `uglify/switches/constant_switch_8`

- tags: `sequences`
- size: oxc 45 vs reference 30 (no whitespaces: +15, formatted: +19)

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
@@ -1,5 +1,5 @@
-OUT: {
-	x();
-	for (;;) break OUT;
-	y();
+OUT: switch (1) {
+	case 1:
+		for (x();;) break OUT;
+		y();
 }

```

## `uglify/switches/constant_switch_9`

- tags: `sequences`
- size: oxc 64 vs reference 49 (no whitespaces: +15, formatted: +17)

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
@@ -1,7 +1,5 @@
-OUT: {
-	x();
-	for (;;) if (foo) break OUT;
-	y();
-	bar();
-	def();
+OUT: switch (1) {
+	case 1:
+		for (x();;) if (foo) break OUT;
+		y(), bar(), def();
 }

```

## `uglify/templates/malformed_evaluate_4`

- size: oxc 38 vs reference 23 (no whitespaces: +15, formatted: +15)

```js
console.log(String.raw`\u0${0}b${5}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('\\u00b5');
+console.log(String.raw`\u0${0}b${5}`);

```

## `uglify/yields/func_to_arrow_arg`

- tags: `type:module`
- size: oxc 51 vs reference 36 (no whitespaces: +15, formatted: +16)

```js
console.log(function(yield) {
	return yield;
}('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(((yield) => yield)('PASS'));
+console.log(function(yield) {
+	return yield;
+}('PASS'));

```

## `uglify/arrows/instanceof_lambda_1`

- size: oxc 35 vs reference 19 (no whitespaces: +16, formatted: +19)

```js
console.log(42 instanceof (() => {}));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(false);
+console.log(42 instanceof (() => {}));

```

## `uglify/arrows/issue_5653`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 40 vs reference 24 (no whitespaces: +16, formatted: +22)

```js
console.log(((a) => {
	a = { p: console };
	return a++;
})());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(((a) => +{})());
+console.log(((a) => (a = { p: console }, a++))());

```

## `uglify/booleans/issue_5028_2`

- tags: `sequences`
- size: oxc 76 vs reference 60 (no whitespaces: +16, formatted: +24)

```js
var a = 1;
(function() {
	if (a--) if (a--) a = 'FAIL';
	else return;
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var a = 1;
 (function() {
-	a-- && a-- && (a = 'FAIL');
-})();
-console.log(a);
+	if (a--) {
+		if (a--) a = 'FAIL';
+		else return;
+	}
+})(), console.log(a);

```

## `uglify/booleans/issue_5028_3`

- tags: `sequences`
- size: oxc 76 vs reference 60 (no whitespaces: +16, formatted: +24)

```js
var a = 1;
(function() {
	if (a--) if (a--) a = 'FAIL';
	else return;
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var a = 1;
 (function() {
-	a-- && a-- && (a = 'FAIL');
-})();
-console.log(a);
+	if (a--) {
+		if (a--) a = 'FAIL';
+		else return;
+	}
+})(), console.log(a);

```

## `uglify/classes/instanceof_lambda`

- size: oxc 48 vs reference 32 (no whitespaces: +16, formatted: +17)

```js
'use strict';
console.log(42 instanceof class {});

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 'use strict';
-console.log(false);
+console.log(42 instanceof class {});

```

## `uglify/collapse_vars/switch_case_1`

- tags: `join vars`, `remove unused`
- size: oxc 83 vs reference 67 (no whitespaces: +16, formatted: +26)

```js
function f(x, y, z) {
	var a = x();
	var b = y();
	var c = z;
	switch (a) {
		default: d();
		case b: e();
		case c: f();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 function f(x, y, z) {
-	switch (x()) {
+	var a = x(), b = y(), c = z;
+	switch (a) {
 		default: d();
-		case y(): e();
-		case z: f();
+		case b: e();
+		case c: f();
 	}
 }

```

## `uglify/collapse_vars/var_side_effects_1`

- tags: `join vars`, `remove unused`
- size: oxc 94 vs reference 78 (no whitespaces: +16, formatted: +20)

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
@@ -1,5 +1,6 @@
 var print = console.log.bind(console);
 function foo(x) {
-	print('Foo:', 2 * x);
+	var twice = x * 2;
+	print('Foo:', twice);
 }
 foo(10);

```

## `uglify/collapse_vars/var_side_effects_3`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 100 vs reference 84 (no whitespaces: +16, formatted: +20)

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
@@ -1,5 +1,6 @@
 var print = console.log.bind(console);
 function foo(x) {
-	print('Foo:', 2 * x.y);
+	var twice = x.y * 2;
+	print('Foo:', twice);
 }
 foo({ y: 10 });

```

## `uglify/conditionals/merge_tail_sequence_1`

- tags: `sequences`
- size: oxc 158 vs reference 142 (no whitespaces: +16, formatted: +21)

```js
function f(a) {
	var b = 'foo';
	if (a) {
		while (console.log('bar'));
		console.log(b);
	} else {
		c = 'baz';
		while (console.log(c));
		console.log('bar'), console.log(b);
		var c;
	}
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,12 @@
 function f(a) {
 	var b = 'foo';
-	if (a) while (console.log('bar'));
-	else {
-		c = 'baz';
-		while (console.log(c));
-		console.log('bar');
+	if (a) {
+		for (; console.log('bar'););
+		console.log(b);
+	} else {
+		for (c = 'baz'; console.log(c););
+		console.log('bar'), console.log(b);
 		var c;
 	}
-	console.log(b);
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/const/issue_4193`

- size: oxc 48 vs reference 32 (no whitespaces: +16, formatted: +24)

```js
try {} catch (e) {
	var a;
} finally {
	const a = 0;
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-var a;
-{
-	const a = 0;
+try {} catch {
+	var a;
+} finally {
+	let a = 0;
 }
 console.log(a);

```

## `uglify/dead-code/issue_2749`

- tags: `remove unused`
- size: oxc 86 vs reference 70 (no whitespaces: +16, formatted: +22)

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
-while (a--) b = void 0, b ? c = 'FAIL' : 1;
-var b;
+for (; a--;) (function() {
+	return b ? c = 'FAIL' : b = 1;
+	var b;
+})();
 console.log(c);

```

## `uglify/default-values/issue_4468`

- tags: `join vars`, `remove unused`
- size: oxc 63 vs reference 47 (no whitespaces: +16, formatted: +22)

```js
(function(a) {
	var { [console.log('PASS')]: b = a && (a.p = 0) } = 0;
	a;
})(1234);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function() {
-	var { [console.log('PASS')]: b } = 0;
-})();
+(function(a) {
+	var { [console.log('PASS')]: b = a && (a.p = 0) } = 0;
+})(1234);

```

## `uglify/directives/valid_after_invalid_2`

- size: oxc 75 vs reference 59 (no whitespaces: +16, formatted: +18)

```js
console.log(typeof function() {
	'use\x20strict';
	'use strict';
	return this;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 console.log(typeof function() {
+	'use\x20strict';
 	'use strict';
 	return this;
 }());

```

## `uglify/evaluate/issue_3920`

- tags: `join vars`, `remove unused`
- size: oxc 63 vs reference 47 (no whitespaces: +16, formatted: +23)

```js
var a = function(b) {
	return (b[b = 0] = 0) >= (b ? 0 : 1);
}('foo');
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-(function(b) {
-	'foo'[0] = 0;
-})();
-console.log(false);
+var a = function(b) {
+	return (b[b = 0] = 0) >= +!b;
+}('foo');
+console.log(a);

```

## `uglify/functions/inline_binary_or`

- size: oxc 87 vs reference 71 (no whitespaces: +16, formatted: +22)

```js
(function() {
	while (console.log('foo'));
})() || (function() {
	while (console.log('bar'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-if (!function() {
-	while (console.log('foo'));
-}()) while (console.log('bar'));
+(function() {
+	for (; console.log('foo'););
+})() || (function() {
+	for (; console.log('bar'););
+})();

```

## `uglify/functions/issue_2485_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 258 vs reference 242 (no whitespaces: +16, formatted: +20)

```js
var foo = function(bar) {
	var n = function(a, b) {
		return a + b;
	};
	var sumAll = function(arg) {
		return arg.reduce(n, 0);
	};
	var runSumAll = function(arg) {
		return sumAll(arg);
	};
	bar.baz = function(arg) {
		var n = runSumAll(arg);
		return n.get = 1, n;
	};
	return bar;
};
var bar = foo({});
console.log(bar.baz([
	1,
	2,
	3
]));

```

```diff
--- reference
+++ oxc
@@ -1,19 +1,17 @@
 var foo = function(bar) {
-	function n(a, b) {
+	var n = function(a, b) {
 		return a + b;
-	}
-	function runSumAll(arg) {
-		return function(arg) {
-			return arg.reduce(n, 0);
-		}(arg);
-	}
+	}, sumAll = function(arg) {
+		return arg.reduce(n, 0);
+	}, runSumAll = function(arg) {
+		return sumAll(arg);
+	};
 	bar.baz = function(arg) {
 		var n = runSumAll(arg);
 		return n.get = 1, n;
 	};
 	return bar;
-};
-var bar = foo({});
+}, bar = foo({});
 console.log(bar.baz([
 	1,
 	2,

```

## `uglify/functions/issue_3444`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 64 (no whitespaces: +16, formatted: +26)

```js
(function(h) {
	return f;
	function f() {
		g();
	}
	function g() {
		h('PASS');
	}
})(console.log)();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,9 @@
 (function(h) {
-	return function() {
-		void h('PASS');
-	};
+	return f;
+	function f() {
+		g();
+	}
+	function g() {
+		h('PASS');
+	}
 })(console.log)();

```

## `uglify/functions/issue_5140`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 49 (no whitespaces: +16, formatted: +18)

```js
A = 42;
function f(b) {
	return b >> 0;
}
var a = f(42 in []);
console.log(f(A));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
+A = 42;
 function f(b) {
-	return b >> 0;
+	return b | 0;
 }
-A = 42;
-console.log(A >> 0);
+var a = f(42 in []);
+console.log(f(A));

```

## `uglify/hoist_vars/issue_5411_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 54 vs reference 38 (no whitespaces: +16, formatted: +24)

```js
var a = 'PASS';
b++;
b = a;
var b = b, c = c && c[b];
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-var b, c;
-b++, b = 'PASS', c, console.log(b);
+var a = 'PASS';
+b++, b = a;
+var b = b, c = c && c[b];
+console.log(b);

```

## `uglify/issue-269/strings_concat`

- size: oxc 54 vs reference 38 (no whitespaces: +16, formatted: +16)

```js
var x = {};
console.log(String(x + 'str'), String('str' + x));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var x = {};
-console.log(x + 'str', 'str' + x);
+console.log(String(x + 'str'), String('str' + x));

```

## `uglify/let/issue_4202`

- size: oxc 83 vs reference 67 (no whitespaces: +16, formatted: +26)

```js
'use strict';
{
	let o = {};
	(function() {
		function f() {
			o.p = 42;
		}
		f(f);
	})();
	console.log(o.p++);
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
 'use strict';
 {
 	let o = {};
-	function f() {
-		o.p = 42;
-	}
-	f(f);
+	(function() {
+		function f() {
+			o.p = 42;
+		}
+		f(f);
+	})();
 	console.log(o.p++);
 }

```

## `uglify/numbers/evaluate_5_unsafe_math`

- tags: `join vars`
- size: oxc 158 vs reference 142 (no whitespaces: +16, formatted: +29)

```js
function f(num) {
	var a = '' + num;
	[
		+a + 2 + 3,
		+a + 2 - 3,
		+a - 2 + 3,
		+a - 2 - 3,
		2 + +a + 3,
		2 + +a - 3,
		2 - +a + 3,
		2 - +a - 3,
		2 + 3 + +a,
		2 + 3 - +a,
		2 - 3 + +a,
		2 - 3 - +a
	].forEach(function(n) {
		console.log(typeof n, n);
	});
}
f(1);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,17 @@
 function f(num) {
 	var a = '' + num;
 	[
-		+a + 5,
-		+a + -1,
-		a - -1,
-		a - 5,
-		+a + 5,
-		+a + -1,
-		5 - a,
-		-1 - a,
-		+a + 5,
+		+a + 2 + 3,
+		+a + 2 - 3,
+		a - 2 + 3,
+		a - 2 - 3,
+		2 + +a + 3,
+		2 + +a - 3,
+		2 - a + 3,
+		2 - a - 3,
+		5 + +a,
 		5 - a,
-		+a - 1,
+		-1 + +a,
 		-1 - a
 	].forEach(function(n) {
 		console.log(typeof n, n);

```

## `uglify/objects/unsafe_object_repeated`

- tags: `join vars`
- size: oxc 57 vs reference 41 (no whitespaces: +16, formatted: +27)

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
@@ -1,2 +1,5 @@
-var o = { a: 1 };
-console.log(o + 1, 2, o.b + 1, NaN);
+var o = {
+	a: { b: 1 },
+	a: 1
+};
+console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

## `uglify/pure_funcs/func`

- size: oxc 48 vs reference 32 (no whitespaces: +16, formatted: +20)

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

## `uglify/reduce_vars/delay_def`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 61 (no whitespaces: +16, formatted: +20)

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
@@ -1,7 +1,9 @@
 function f() {
-	return;
+	return a;
+	var a;
 }
 function g() {
-	return;
+	return a;
+	var a;
 }
 console.log(f(), g());

```

## `uglify/reduce_vars/issue_3622`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 68 vs reference 52 (no whitespaces: +16, formatted: +22)

```js
var c = 'FAIL';
!function(b, a) {
	a && (c = 'PASS');
}(42, this);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
 var c = 'FAIL';
-!void (this && (c = 'PASS')), console.log(c);
+(function(b, a) {
+	a && (c = 'PASS');
+})(42, this), console.log(c);

```

## `uglify/reduce_vars/issue_3666`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 85 vs reference 69 (no whitespaces: +16, formatted: +23)

```js
try {
	var a = 'FAIL';
} finally {
	for (; !a;) var c = a++;
	var a = 'PASS', b = c = 'PASS';
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 try {
 	var a = 'FAIL';
 } finally {
-	for (; !a;) a++;
-	a = 'PASS';
+	for (; !a;) var c = a++;
+	var a = 'PASS', b = c = 'PASS';
 }
-console.log(a, 'PASS');
+console.log(a, b);

```

## `uglify/reduce_vars/unsafe_evaluate_side_effect_free_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 67 vs reference 51 (no whitespaces: +16, formatted: +23)

```js
console.log(function() {
	var o = { p: 1 }, a = [o];
	console.log(a[0].p);
	return o.p;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 console.log(function() {
-	console.log(1);
-	return 1;
+	var o = { p: 1 };
+	console.log(o.p);
+	return o.p;
 }());

```

## `uglify/side_effects/drop_instanceof_reference`

- tags: `join vars`
- size: oxc 50 vs reference 34 (no whitespaces: +16, formatted: +17)

```js
function f() {}
42 instanceof f;
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 function f() {}
+42 instanceof f;
 console.log('PASS');

```

## `uglify/spreads/issue_4556`

- tags: `join vars`, `remove unused`
- size: oxc 49 vs reference 33 (no whitespaces: +16, formatted: +22)

```js
console.log(function() {
	var a = '' + [a++];
	var b = [...a];
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 console.log(function() {
-	var a;
+	var a = '' + [a++];
+	[...a];
 }());

```

## `uglify/templates/pure_funcs`

- size: oxc 36 vs reference 20 (no whitespaces: +16, formatted: +16)

```js
Math.random`${console.log('PASS')}`;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+Math.random`${console.log('PASS')}`;

```

## `uglify/yields/issue_5576`

- size: oxc 124 vs reference 108 (no whitespaces: +16, formatted: +26)

```js
(async function* () {
	try {
		(function() {
			while (console.log('foo'));
		})();
	} finally {
		console.log('bar');
	}
})().next();
console.log('baz');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 (async function* () {
 	try {
-		while (console.log('foo'));
+		(function() {
+			for (; console.log('foo'););
+		})();
 	} finally {
 		console.log('bar');
 	}

```

## `uglify/collapse_vars/issue_3908`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 48 vs reference 31 (no whitespaces: +17, formatted: +25)

```js
if (console) {
	var o = { p: !1 }, a = o;
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-console && 0;
+if (console) var o = { p: !1 }, a = o;
 console.log('PASS');

```

## `uglify/conditionals/merge_tail_1`

- tags: `sequences`
- size: oxc 130 vs reference 113 (no whitespaces: +17, formatted: +34)

```js
function f(a) {
	var b = 'foo';
	if (a) {
		while (console.log('bar'));
		console.log(b);
	} else {
		while (console.log('baz'));
		console.log(b);
	}
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,11 @@
 function f(a) {
 	var b = 'foo';
-	if (a) while (console.log('bar'));
-	else while (console.log('baz'));
-	console.log(b);
+	if (a) {
+		for (; console.log('bar'););
+		console.log(b);
+	} else {
+		for (; console.log('baz'););
+		console.log(b);
+	}
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/drop-unused/issue_3495`

- tags: `remove unused`
- size: oxc 37 vs reference 20 (no whitespaces: +17, formatted: +26)

```js
console.log(function f() {
	f = 0;
	var a = f.p;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(void 0);
+console.log(function f() {
+	f = 0;
+	f.p;
+}());

```

## `uglify/evaluate/issue_2968_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 105 vs reference 88 (no whitespaces: +17, formatted: +27)

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
@@ -1,6 +1,8 @@
 var c = 'FAIL';
 (function() {
-	a = 42, void ((a <<= 0) && (a[c = 'PASS', 0] = 0));
-	var a;
+	(function(a, b) {
+		a <<= 0;
+		a && (a[c = 'PASS', 0 >>> (b += 1)] = 0);
+	})(42, -42);
 })();
 console.log(c);

```

## `uglify/functions/issue_2604_1`

- tags: `remove unused`
- size: oxc 104 vs reference 87 (no whitespaces: +17, formatted: +28)

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
@@ -1,10 +1,12 @@
 var a = 'FAIL';
-try {
-	throw 1;
-} catch (b) {
-	(function(b) {
-		b && b();
-	})();
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

## `uglify/functions/issue_3018`

- size: oxc 99 vs reference 82 (no whitespaces: +17, formatted: +26)

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

## `uglify/functions/issue_3833_1`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 51 (no whitespaces: +17, formatted: +26)

```js
function f(a) {
	return function() {
		while (a);
		console.log('PASS');
	}();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-(function() {
-	while (a);
-	console.log('PASS');
-})();
-var a;
+function f(a) {
+	return function() {
+		for (; a;);
+		console.log('PASS');
+	}();
+}
+f();

```

## `uglify/functions/issue_4155`

- tags: `join vars`, `remove unused`
- size: oxc 98 vs reference 81 (no whitespaces: +17, formatted: +26)

```js
(function() {
	var a;
	(function() {
		console.log(a);
	})(a);
	var b = function() {};
	b && console.log(typeof b);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 (function() {
 	var a;
-	void console.log(a);
-	function b() {}
+	(function() {
+		console.log(a);
+	})(a);
+	var b = function() {};
 	b && console.log(typeof b);
 })();

```

## `uglify/functions/issue_5237`

- size: oxc 108 vs reference 91 (no whitespaces: +17, formatted: +24)

```js
function f() {
	(function() {
		while (console.log(0 / 0));
	})();
	(function() {
		var NaN = console && console.log(NaN);
	})();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 function f() {
-	while (console.log(NaN));
 	(function() {
+		for (; console.log(NaN););
+	})();
+	(function() {
 		var NaN = console && console.log(NaN);
 	})();
 }

```

## `uglify/functions/issue_5263`

- size: oxc 94 vs reference 77 (no whitespaces: +17, formatted: +20)

```js
for (var i = 0; i < 2; i++) (function() {
	while (console.log(i));
	(function(a) {
		console.log(a) && a, a++;
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-for (var i = 0; i < 2; i++) {
-	a = void 0;
-	while (console.log(i));
-	console.log(a), a++;
-	var a;
-}
+for (var i = 0; i < 2; i++) (function() {
+	for (; console.log(i););
+	(function(a) {
+		console.log(a), a++;
+	})();
+})();

```

## `uglify/functions/issue_5264_1`

- tags: `join vars`, `remove unused`
- size: oxc 149 vs reference 132 (no whitespaces: +17, formatted: +29)

```js
console.log(function() {
	function f(arguments) {
		console.log(arguments);
		(function() {
			while (console.log('foo'));
		})();
	}
	f('bar');
	return arguments;
}('baz')[0]);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
 console.log(function() {
-	(function(arguments) {
+	function f(arguments) {
 		console.log(arguments);
-		while (console.log('foo'));
-	})('bar');
+		(function() {
+			for (; console.log('foo'););
+		})();
+	}
+	f('bar');
 	return arguments;
 }('baz')[0]);

```

## `uglify/functions/issue_5264_2`

- tags: `join vars`, `remove unused`
- size: oxc 149 vs reference 132 (no whitespaces: +17, formatted: +29)

```js
console.log(function() {
	function f(arguments) {
		console.log(arguments);
		(function() {
			while (console.log('foo'));
		})();
	}
	f('bar');
	return arguments;
}('baz')[0]);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
 console.log(function() {
-	(function(arguments) {
+	function f(arguments) {
 		console.log(arguments);
-		while (console.log('foo'));
-	})('bar');
+		(function() {
+			for (; console.log('foo'););
+		})();
+	}
+	f('bar');
 	return arguments;
 }('baz')[0]);

```

## `uglify/functions/unsafe_apply_2`

- tags: `join vars`
- size: oxc 142 vs reference 125 (no whitespaces: +17, formatted: +18)

```js
function foo() {
	console.log(a, b);
}
var bar = function(a, b) {
	console.log(this, a, b);
}(function() {
	foo.apply('foo', ['bar']);
	bar.apply('foo', ['bar']);
})();

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 var bar = function(a, b) {
 	console.log(this, a, b);
 }(function() {
-	foo('bar');
-	bar.call('foo', 'bar');
+	foo.apply('foo', ['bar']);
+	bar.apply('foo', ['bar']);
 })();

```

## `uglify/hoist_vars/issue_4859`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 47 (no whitespaces: +17, formatted: +28)

```js
function f(a) {
	var b = (a = 2, 1 / 0), c = 3;
	var d = a + b;
	console.log(d);
	return f;
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-(function f(a) {
-	console.log(2 + 1 / 0);
+function f(a) {
+	var b = (a = 2, 1 / 0), d = a + b;
+	console.log(d);
 	return f;
-})();
+}
+f();

```

## `uglify/if_return/identical_returns_2`

- tags: `sequences`
- size: oxc 105 vs reference 88 (no whitespaces: +17, formatted: +21)

```js
console.log(function() {
	if (console.log('foo')) while (console.log('FAIL'));
	else return 'bar';
	return 'bar';
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 console.log(function() {
-	if (console.log('foo')) while (console.log('FAIL'));
+	if (console.log('foo')) for (; console.log('FAIL'););
+	else return 'bar';
 	return 'bar';
 }());

```

## `uglify/labels/labels_1`

- tags: `sequences`, `remove unused`
- size: oxc 41 vs reference 24 (no whitespaces: +17, formatted: +24)

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

## `uglify/labels/labels_9`

- tags: `sequences`, `remove unused`
- size: oxc 36 vs reference 19 (no whitespaces: +17, formatted: +20)

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
@@ -1,4 +1,4 @@
-while (foo) {
-	x();
-	y();
+out: for (; foo;) {
+	x(), y();
+	continue out;
 }

```

## `uglify/loops/evaluate`

- tags: `2 iterations`
- size: oxc 43 vs reference 26 (no whitespaces: +17, formatted: +21)

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

## `uglify/negate-iife/negate_iife_3_evaluate`

- tags: `sequences`
- size: oxc 40 vs reference 23 (no whitespaces: +17, formatted: +22)

```js
(function() {
	return true;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-true, console.log(true);
+console.log(!!(function() {
+	return !0;
+})());

```

## `uglify/negate-iife/negate_iife_3_off_evaluate`

- tags: `sequences`
- size: oxc 40 vs reference 23 (no whitespaces: +17, formatted: +22)

```js
(function() {
	return true;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-true, console.log(true);
+console.log(!!(function() {
+	return !0;
+})());

```

## `uglify/numbers/evaluate_6_unsafe_math`

- size: oxc 140 vs reference 123 (no whitespaces: +17, formatted: +34)

```js
var a = '1';
[
	-a + 2 + 3,
	-a + 2 - 3,
	-a - 2 + 3,
	-a - 2 - 3,
	2 + -a + 3,
	2 + -a - 3,
	2 - -a + 3,
	2 - -a - 3,
	2 + 3 + -a,
	2 + 3 - -a,
	2 - 3 + -a,
	2 - 3 - -a
].forEach(function(n) {
	console.log(typeof n, n);
});

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,16 @@
 var a = '1';
 [
-	5 - a,
-	-1 - a,
-	-a - -1,
-	-a - 5,
-	5 - a,
-	-1 - a,
-	5 - -a,
-	-1 - -a,
-	5 - a,
+	-a + 2 + 3,
+	-a + 2 - 3,
+	-a - 2 + 3,
+	-a - 2 - 3,
+	2 + -a + 3,
+	2 + -a - 3,
+	2 - -a + 3,
+	2 - -a - 3,
+	5 + -a,
 	5 - -a,
-	-1 - a,
+	-1 + -a,
 	-1 - -a
 ].forEach(function(n) {
 	console.log(typeof n, n);

```

## `uglify/pure_getters/set_immutable_6`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 64 vs reference 47 (no whitespaces: +17, formatted: +23)

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
-1 .foo ? console.log('FAIL') : console.log('PASS');
+var a = 1;
+a.foo += '', a.foo ? console.log('FAIL') : console.log('PASS');

```

## `uglify/reduce_vars/local_assignment_lambda`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 58 vs reference 41 (no whitespaces: +17, formatted: +23)

```js
var a = 'FAIL';
function f() {
	a = 'PASS';
	console.log(a);
}
f();
f();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
+var a = 'FAIL';
 function f() {
-	console.log('PASS');
+	a = 'PASS', console.log(a);
 }
 f(), f();

```

## `uglify/reduce_vars/local_assignment_loop`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 56 vs reference 39 (no whitespaces: +17, formatted: +19)

```js
var a = 'FAIL';
do {
	a = 'PASS';
	console.log(a);
} while (!console);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-do {
-	console.log('PASS');
-} while (!console);
+var a = 'FAIL';
+do
+	a = 'PASS', console.log(a);
+while (!console);

```

## `uglify/sequences/issue_3490_2`

- tags: `join vars`, `sequences`
- size: oxc 86 vs reference 69 (no whitespaces: +17, formatted: +25)

```js
var b = 42, c = 'FAIL';
if ({ 3: function() {
	var a;
	return (a && a.p) < this;
}() }) c = 'PASS';
if (b) for (; '' == typeof d;);
console.log(c, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var b = 42, c = 'FAIL';
-var a;
-for (c = 'PASS'; '' == typeof d;);
-console.log(c, b);
+(function() {
+	var a;
+	return (a && a.p) < this;
+})(), c = 'PASS', console.log(c, b);

```

## `uglify/side_effects/drop_access`

- tags: `join vars`
- size: oxc 83 vs reference 66 (no whitespaces: +17, formatted: +25)

```js
var o = {};
o.p;
try {
	(function() {
		o.q;
	})();
	console.log('PASS');
} catch (e) {
	console.log('FAIL');
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
 var o = {};
 o.p;
 try {
+	(function() {
+		o.q;
+	})();
 	console.log('PASS');
-} catch (e) {
+} catch {
 	console.log('FAIL');
 }

```

## `uglify/unicode/issue_2242_4`

- size: oxc 53 vs reference 36 (no whitespaces: +17, formatted: +23)

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

## `uglify/arrays/index`

- tags: `join vars`, `remove unused`
- size: oxc 35 vs reference 17 (no whitespaces: +18, formatted: +22)

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

## `uglify/assignments/lazily_chained_assignments`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 159 vs reference 141 (no whitespaces: +18, formatted: +30)

```js
function f(a) {
	if (a = console.log('foo')) a = console.log('bar');
	return a;
}
function g(b) {
	if (b = console.log('baz'));
	else b = console.log('moo');
	return b;
}
console.log(f(), g());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(a) {
-	return console.log('foo') && console.log('bar');
+	return (a = console.log('foo')) && (a = console.log('bar')), a;
 }
 function g(b) {
-	return console.log('baz') || console.log('moo');
+	return (b = console.log('baz')) || (b = console.log('moo')), b;
 }
 console.log(f(), g());

```

## `uglify/awaits/inline_await_1`

- tags: `join vars`, `remove unused`
- size: oxc 87 vs reference 69 (no whitespaces: +18, formatted: +27)

```js
(async function() {
	async function f() {
		await 42;
	}
	return await f();
})();
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 (async function() {
-	return await void await 42;
+	async function f() {
+		await 42;
+	}
+	return await f();
 })();
 console.log('PASS');

```

## `uglify/classes/issue_5082_1_strict`

- tags: `join vars`, `remove unused`
- size: oxc 89 vs reference 71 (no whitespaces: +18, formatted: +26)

```js
'use strict';
(function() {
	class A {
		p = console.log('PASS');
		q() {}
	}
	class B {
		static P = new A();
	}
})();

```

```diff
--- reference
+++ oxc
@@ -4,5 +4,7 @@
 		p = console.log('PASS');
 		q() {}
 	}
-	new A();
+	class B {
+		static P = new A();
+	}
 })();

```

## `uglify/collapse_vars/iife_1`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 37 (no whitespaces: +18, formatted: +24)

```js
var log = function(x) {
	console.log(x);
}, foo = bar();
log(foo);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-(function(x) {
+var log = function(x) {
 	console.log(x);
-})(bar());
+}, foo = bar();
+log(foo);

```

## `uglify/collapse_vars/sequence_in_iife_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 54 vs reference 36 (no whitespaces: +18, formatted: +24)

```js
var a = 'foo', b = 42;
(function() {
	var c = (b = a, b);
})();
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
 var a = 'foo', b = 42;
-console.log(b = a, b);
+(function() {
+	b = a;
+})();
+console.log(a, b);

```

## `uglify/collapse_vars/side_effect_free_replacement`

- tags: `join vars`, `remove unused`
- size: oxc 29 vs reference 11 (no whitespaces: +18, formatted: +23)

```js
var b;
(function(a) {
	x(a);
})(b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
 var b;
-x(b);
+(function(a) {
+	x(a);
+})(b);

```

## `uglify/dead-code/self_assignments_2`

- tags: `join vars`
- size: oxc 63 vs reference 45 (no whitespaces: +18, formatted: +24)

```js
var a = 'q', o = { p: 'PASS' };
o.p = o.p;
o[a] = o[a];
console.log(o.p, o[a]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
 var a = 'q', o = { p: 'PASS' };
+o.p = o.p;
+o[a] = o[a];
 console.log(o.p, o[a]);

```

## `uglify/default-values/inline_constant`

- size: oxc 82 vs reference 64 (no whitespaces: +18, formatted: +24)

```js
console.log(function(a = console.log('foo')) {
	return 'bar';
}(void console.log('baz')));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log((void console.log('baz'), console.log('foo'), 'bar'));
+console.log(function(a = console.log('foo')) {
+	return 'bar';
+}(void console.log('baz')));

```

## `uglify/default-values/issue_5448_2`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 50 (no whitespaces: +18, formatted: +21)

```js
(function(a = typeof console) {
	do {
		var b = [...a];
	} while (console.log('PASS'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-(function(a = 0) {
-	do {} while (console.log('PASS'));
+(function(a = typeof console) {
+	do
+		[...a];
+	while (console.log('PASS'));
 })();

```

## `uglify/default-values/unused_value_var_2`

- tags: `remove unused`
- size: oxc 51 vs reference 33 (no whitespaces: +18, formatted: +21)

```js
var [a = console.log('FAIL')] = ['PASS'];
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = ['PASS'][0];
+var [a = console.log('FAIL')] = ['PASS'];
 console.log(a);

```

## `uglify/destructured/issue_5074_method_pure_getters`

- tags: `remove unused`
- size: oxc 38 vs reference 20 (no whitespaces: +18, formatted: +24)

```js
({} = { [(console.log('PASS'), 42)]() {} });

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+({} = { [(console.log('PASS'), 42)]() {} });

```

## `uglify/destructured/issue_5288_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 77 vs reference 59 (no whitespaces: +18, formatted: +19)

```js
while (function([]) {}([function f() {
	if (console) return console.log('PASS');
	else {
		let a = 0;
	}
}()]));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-while (function() {
-	if (console) console.log('PASS');
-}(), void 0);
+for (; function([]) {}([function() {
+	if (console) return console.log('PASS');
+}()]););

```

## `uglify/drop-unused/issue_2516_1`

- tags: `join vars`, `remove unused`
- size: oxc 188 vs reference 170 (no whitespaces: +18, formatted: +19)

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
-	Baz = function(x) {
-		(function(x) {
-			var trouble = x || never_called();
-			var value = (4 - 1) * trouble;
-			console.log(6 == value ? 'PASS' : value);
-		}).call(null, x);
-	};
+	function qux(x) {
+		bar.call(null, x);
+	}
+	function bar(x) {
+		var FOUR = 4, trouble = x || never_called(), value = (FOUR - 1) * trouble;
+		console.log(value == 6 ? 'PASS' : value);
+	}
+	Baz = qux;
 }
 var Baz;
 foo();

```

## `uglify/drop-unused/issue_4133`

- tags: `join vars`, `remove unused`
- size: oxc 41 vs reference 23 (no whitespaces: +18, formatted: +26)

```js
var a = 1;
var b = [a--], c = b && b[c];
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = 1;
-console.log(0);
+var a = 1, b = [a--], c = b && b[c];
+console.log(a);

```

## `uglify/drop-unused/issue_5224`

- tags: `join vars`, `remove unused`
- size: oxc 141 vs reference 123 (no whitespaces: +18, formatted: +17)

```js
function f() {
	try {
		var b = function() {
			var a = 'FAIL 1';
			null && a;
			a = console.log(a);
		}(new function(c, d) {
			console.log(d);
			a;
		}('FAIL 2', Infinity));
	} finally {
		return f;
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
-(function f() {
+function f() {
 	try {
 		(function() {
 			var a = 'FAIL 1';
-			null;
-			console.log(a);
-		})(function() {
-			console.log(1 / 0);
+			a = console.log(a);
+		})(new function(c, d) {
+			console.log(d);
 			a;
-		}());
+		}('FAIL 2', Infinity));
 	} finally {
 		return f;
 	}
-})();
+}
+f();

```

## `uglify/evaluate/array_slice_index`

- size: oxc 33 vs reference 15 (no whitespaces: +18, formatted: +25)

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

## `uglify/evaluate/issue_2916_2`

- tags: `join vars`, `remove unused`
- size: oxc 87 vs reference 69 (no whitespaces: +18, formatted: +25)

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

## `uglify/functions/duplicate_argnames_2`

- tags: `join vars`, `remove unused`
- size: oxc 73 vs reference 55 (no whitespaces: +18, formatted: +26)

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
@@ -1,3 +1,6 @@
 var a = 'PASS';
-console, void 0 && (a = 'FAIL');
+function f(b, b, b) {
+	b && (a = 'FAIL');
+}
+f(0, console);
 console.log(a);

```

## `uglify/functions/issue_4265`

- tags: `sequences`
- size: oxc 87 vs reference 69 (no whitespaces: +18, formatted: +27)

```js
function f() {
	console;
	if ([function() {
		return this + console.log(a);
		a;
		var a;
	}()]);
	return 42;
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 function f() {
-	var a;
-	return console, console.log(a), 42;
+	return function() {
+		return this + console.log(a);
+		var a;
+	}(), 42;
 }
 console.log(f());

```

## `uglify/functions/issue_4753_2`

- tags: `join vars`, `remove unused`
- size: oxc 95 vs reference 77 (no whitespaces: +18, formatted: +33)

```js
do {
	(function() {
		var a = f();
		function f() {
			return 'PASS';
		}
		f;
		function g() {
			console.log(a);
		}
		g();
	})();
} while (0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,12 @@
-do {
-	a = void 0, f = function() {
-		return 'PASS';
-	}, a = f(), console.log(a);
-} while (0);
-var f, a;
+do
+	(function() {
+		var a = f();
+		function f() {
+			return 'PASS';
+		}
+		function g() {
+			console.log(a);
+		}
+		g();
+	})();
+while (0);

```

## `uglify/hoist_props/issue_2508_1`

- tags: `join vars`, `remove unused`
- size: oxc 53 vs reference 35 (no whitespaces: +18, formatted: +30)

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

## `uglify/hoist_props/issue_2508_2`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 37 (no whitespaces: +18, formatted: +30)

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

## `uglify/issue-281/negate_iife_3`

- tags: `sequences`
- size: oxc 57 vs reference 39 (no whitespaces: +18, formatted: +23)

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

## `uglify/issue-281/negate_iife_3_off`

- tags: `sequences`
- size: oxc 57 vs reference 39 (no whitespaces: +18, formatted: +23)

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

## `uglify/join_vars/join_array_assignments_1`

- tags: `join vars`
- size: oxc 97 vs reference 79 (no whitespaces: +18, formatted: +15)

```js
console.log(function() {
	var a = [
		'foo',
		,
		'bar'
	];
	a[1] = 'baz';
	a[7] = 'moo';
	a[0] = 'moz';
	return a;
}().join());

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,11 @@
 console.log(function() {
 	var a = [
-		'moz',
-		'baz',
-		'bar',
-		,
+		'foo',
 		,
-		,
-		,
-		'moo'
+		'bar'
 	];
+	a[1] = 'baz';
+	a[7] = 'moo';
+	a[0] = 'moz';
 	return a;
 }().join());

```

## `uglify/keep_fargs/issue_3364`

- tags: `join vars`, `remove unused`
- size: oxc 271 vs reference 253 (no whitespaces: +18, formatted: +21)

```js
var s = 2, a = 100, b = 10, c = 0;
function f(p, e, r) {
	try {
		for (var i = 1; i-- > 0;) var a = function(x) {
			function g(y) {
				y && y[a++];
			}
			var x = g(--s >= 0 && f(c++));
			for (var j = 1; --j > 0;);
		}();
	} catch (e) {
		try {
			return;
		} catch (z) {
			for (var k = 1; --k > 0;) {
				for (var l = 1; l > 0; --l) {
					var n = function() {};
					for (var k in n) var o = (n, k);
				}
			}
		}
	}
}
var r = f();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,20 @@
-var s = 2, c = 0;
-(function o() {
+var s = 2, a = 100, b = 10, c = 0;
+function f(p, e, r) {
 	try {
-		for (var r = 1; r-- > 0;) var n = function() {
-			(function(r) {
-				r && r[n++];
-			})(--s >= 0 && o(c++));
-			for (var r = 1; --r > 0;);
+		for (var i = 1; i-- > 0;) var a = function(x) {
+			function g(y) {
+				y && y[a++];
+			}
+			g(--s >= 0 && f(c++));
+			for (var j = 1; --j > 0;);
 		}();
-	} catch (r) {
+	} catch {
 		try {
 			return;
-		} catch (r) {
-			for (var a = 1; --a > 0;) for (var f = 1; f > 0; --f) {
-				function t() {}
-				for (var a in t);
-			}
+		} catch {
+			for (var k = 1; --k > 0;) for (var l = 1; l > 0; --l) for (var k in function() {}) var o = k;
 		}
 	}
-})();
+}
+var r = f();
 console.log(c);

```

## `uglify/loops/issue_2740_2`

- tags: `remove unused`, `2 iterations`
- size: oxc 22 vs reference 4 (no whitespaces: +18, formatted: +22)

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

## `uglify/merge_vars/issue_5471_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 143 vs reference 125 (no whitespaces: +18, formatted: +28)

```js
var a = 'FAIL 1';
function f(b, c) {
	function g() {
		if (console) return 42;
		else c = 'FAIL 2';
	}
	var d = g();
	console.log(c || 'PASS');
	var e = function h() {
		while (b && e);
	}();
}
f(a++) && a;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,12 @@
 var a = 'FAIL 1';
-var b, c, e;
-b = +a, function() {
-	if (console) return;
-	c = 'FAIL 2';
-}(), console.log(c || 'PASS'), e = function() {
-	while (b && e);
-}();
+function f(b, c) {
+	function g() {
+		if (console) return 42;
+		c = 'FAIL 2';
+	}
+	g(), console.log(c || 'PASS');
+	var e = function() {
+		for (; b && e;);
+	}();
+}
+f(a++);

```

## `uglify/reduce_vars/issue_2916`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 87 vs reference 69 (no whitespaces: +18, formatted: +25)

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

## `uglify/reduce_vars/obj_var_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 64 vs reference 46 (no whitespaces: +18, formatted: +26)

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
@@ -1,3 +1,4 @@
-console.log({ bar: function() {
-	return 2;
-} }.bar());
+var C = 1, obj = { bar: function() {
+	return C + C;
+} };
+console.log(obj.bar());

```

## `uglify/reduce_vars/toplevel_on_loops_2`

- tags: `join vars`, `remove unused`
- size: oxc 61 vs reference 43 (no whitespaces: +18, formatted: +23)

```js
function bar() {
	console.log('bar:');
}
var x = 3;
do
	bar();
while (x);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-for (;;) (function() {
+function bar() {
 	console.log('bar:');
-})();
+}
+var x = 3;
+do
+	bar();
+while (x);

```

## `uglify/rests/issue_5165_1`

- tags: `join vars`, `sequences`
- size: oxc 66 vs reference 48 (no whitespaces: +18, formatted: +26)

```js
console.log(function([ ...a]) {
	switch (a) {
		case a: return 'PASS';
	}
}([]));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 console.log(function([ ...a]) {
-	return 'PASS';
+	switch (a) {
+		case a: return 'PASS';
+	}
 }([]));

```

## `uglify/yields/issue_5707_1`

- tags: `join vars`, `remove unused`
- size: oxc 56 vs reference 38 (no whitespaces: +18, formatted: +27)

```js
var a, b;
function* f(c = (b = 42, console.log('PASS'))) {}
b = f();

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-(function(c = console.log('PASS')) {})();
+var a, b;
+function* f(c = (b = 42, console.log('PASS'))) {}
+b = f();

```

## `uglify/arrays/length`

- tags: `join vars`, `remove unused`
- size: oxc 34 vs reference 15 (no whitespaces: +19, formatted: +23)

```js
var a = [1, 2];
console.log(a.length);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(2);
+var a = [1, 2];
+console.log(a.length);

```

## `uglify/awaits/inline_await_3`

- tags: `join vars`, `remove unused`
- size: oxc 97 vs reference 78 (no whitespaces: +19, formatted: +20)

```js
(async function() {
	async function f(a, b) {
		return await b(a);
	}
	return await f('PASS', console.log);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 (async function() {
-	return await (a = 'PASS', b = console.log, await b(a));
-	var a, b;
+	async function f(a, b) {
+		return await b(a);
+	}
+	return await f('PASS', console.log);
 })();

```

## `uglify/awaits/inline_block_await_async`

- size: oxc 175 vs reference 156 (no whitespaces: +19, formatted: +27)

```js
(async function() {
	console.log('foo');
	await (async function() {
		while (await console.log('bar'));
		console.log('baz');
	})();
	console.log('moo');
})().then(console.log);
console.log('moz');

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 (async function() {
 	console.log('foo');
-	while (await console.log('bar'));
-	console.log('baz');
-	await 0;
+	await (async function() {
+		for (; await console.log('bar'););
+		console.log('baz');
+	})();
 	console.log('moo');
 })().then(console.log);
 console.log('moz');

```

## `uglify/classes/drop_unused_self_reference`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 52 vs reference 33 (no whitespaces: +19, formatted: +25)

```js
'use strict';
class A {}
(A.p = A).q = console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 'use strict';
-console.log('PASS');
+class A {}
+(A.p = A).q = console.log('PASS');

```

## `uglify/classes/self_comparison`

- tags: `join vars`, `remove unused`
- size: oxc 70 vs reference 51 (no whitespaces: +19, formatted: +29)

```js
'use strict';
class A {}
console.log(A == A, A != A);
console.log(A === A, A !== A);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 'use strict';
-console.log(!0, !1);
-console.log(!0, !1);
+class A {}
+console.log(A == A, A != A);
+console.log(A === A, A !== A);

```

## `uglify/comparisons/self_comparison_4`

- tags: `join vars`, `remove unused`
- size: oxc 57 vs reference 38 (no whitespaces: +19, formatted: +30)

```js
var o = {};
console.log(o == o, o != o);
console.log(o === o, o !== o);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-console.log(!0, !1);
-console.log(!0, !1);
+var o = {};
+console.log(o == o, o != o);
+console.log(o === o, o !== o);

```

## `uglify/destructured/issue_4312`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 69 (no whitespaces: +19, formatted: +18)

```js
var a;
(function f(b, c) {
	return function({ [a = b]: d }) {}(c && c);
})('PASS', 'FAIL');
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-b = 'PASS', c = 'FAIL', [{[c = b]: d}] = [c && c], void 0;
-var b, c, d;
-console.log(c);
+var a;
+(function(b, c) {
+	return function({ [a = b]: d }) {}(c && c);
+})('PASS', 'FAIL');
+console.log(a);

```

## `uglify/drop-unused/issue_3673`

- tags: `sequences`, `remove unused`
- size: oxc 39 vs reference 20 (no whitespaces: +19, formatted: +25)

```js
var a;
(a = [a]).p = 42;
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('PASS');
+var a;
+(a = [a]).p = 42, console.log('PASS');

```

## `uglify/evaluate/issue_2926_1`

- tags: `join vars`
- size: oxc 55 vs reference 36 (no whitespaces: +19, formatted: +19)

```js
(function f(a) {
	console.log(f.name.length, f.length);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function f(a) {
-	console.log(1, 1);
+	console.log(f.name.length, f.length);
 })();

```

## `uglify/evaluate/issue_2926_2`

- size: oxc 43 vs reference 24 (no whitespaces: +19, formatted: +20)

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

## `uglify/evaluate/issue_5362_2`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 18 (no whitespaces: +19, formatted: +23)

```js
var a = -console;
console.log(delete +a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(true);
+var a = -console;
+console.log(delete +a);

```

## `uglify/evaluate/unsafe_string`

- size: oxc 65 vs reference 46 (no whitespaces: +19, formatted: +30)

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

## `uglify/functions/class_iife`

- tags: `sequences`
- size: oxc 101 vs reference 82 (no whitespaces: +19, formatted: +27)

```js
var A = function() {
	function B() {}
	B.prototype.m = function() {
		console.log('PASS');
	};
	return B;
}();
new A().m();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-var A = (B.prototype.m = function() {
-	console.log('PASS');
-}, B);
-function B() {}
+var A = function() {
+	function B() {}
+	return B.prototype.m = function() {
+		console.log('PASS');
+	}, B;
+}();
 new A().m();

```

## `uglify/functions/issue_3506_1`

- tags: `join vars`, `remove unused`
- size: oxc 78 vs reference 59 (no whitespaces: +19, formatted: +26)

```js
var a = 'FAIL';
(function(b) {
	(function(b) {
		b && (a = 'PASS');
	})(b);
})(a);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var a = 'FAIL';
-!function(b) {
-	b && (a = 'PASS');
-}(a);
+(function(b) {
+	(function(b) {
+		b && (a = 'PASS');
+	})(b);
+})(a);
 console.log(a);

```

## `uglify/functions/issue_3506_2`

- tags: `join vars`, `remove unused`
- size: oxc 101 vs reference 82 (no whitespaces: +19, formatted: +27)

```js
var a = 'FAIL';
(function(b) {
	(function(c) {
		var d = 1;
		for (; c && (a = 'PASS') && 0 < --d;);
	})(b);
})(a);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var a = 'FAIL';
-!function(c) {
-	var d = 1;
-	for (; c && (a = 'PASS') && 0 < --d;);
-}(a);
+(function(b) {
+	(function(c) {
+		var d = 1;
+		for (; c && (a = 'PASS') && 0 < --d;);
+	})(b);
+})(a);
 console.log(a);

```

## `uglify/functions/issue_3506_4`

- tags: `join vars`, `remove unused`
- size: oxc 101 vs reference 82 (no whitespaces: +19, formatted: +27)

```js
var a = 'FAIL';
(function(b) {
	(function(c) {
		var d = 1;
		for (; c && (a = 'PASS') && 0 < --d;);
	})(b);
})(a);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var a = 'FAIL';
-!function(c) {
-	var d = 1;
-	for (; c && (a = 'PASS') && 0 < --d;);
-}(a);
+(function(b) {
+	(function(c) {
+		var d = 1;
+		for (; c && (a = 'PASS') && 0 < --d;);
+	})(b);
+})(a);
 console.log(a);

```

## `uglify/functions/preserve_binding_1`

- size: oxc 94 vs reference 75 (no whitespaces: +19, formatted: +23)

```js
var o = { f: function() {
	return this === o ? 'FAIL' : 'PASS';
} };
console.log(function(a) {
	return a;
}(o.f)());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 var o = { f: function() {
 	return this === o ? 'FAIL' : 'PASS';
 } };
-console.log((0, o.f)());
+console.log(function(a) {
+	return a;
+}(o.f)());

```

## `uglify/functions/preserve_binding_2`

- tags: `join vars`, `remove unused`
- size: oxc 94 vs reference 75 (no whitespaces: +19, formatted: +23)

```js
var o = { f: function() {
	return this === o ? 'FAIL' : 'PASS';
} };
console.log(function(a) {
	return a;
}(o.f)());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 var o = { f: function() {
 	return this === o ? 'FAIL' : 'PASS';
 } };
-console.log((0, o.f)());
+console.log(function(a) {
+	return a;
+}(o.f)());

```

## `uglify/issue-1443/keep_fnames`

- tags: `sequences`
- size: oxc 94 vs reference 75 (no whitespaces: +19, formatted: +18)

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
+function f(undefined) {
 	return function() {
-		function n(n) {
-			return n * n;
+		function n(a) {
+			return a * a;
 		}
-		return a ? b : c ? d : r;
+		if (a) return b;
+		if (c) return d;
 	};
 }

```

## `uglify/issue-1443/unsafe_undefined`

- tags: `sequences`
- size: oxc 69 vs reference 50 (no whitespaces: +19, formatted: +18)

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

## `uglify/issue-1588/unsafe_undefined`

- tags: `sequences`
- size: oxc 93 vs reference 74 (no whitespaces: +19, formatted: +18)

```js
var a, c;
console.log(function(undefined) {
	return function() {
		if (a) return b;
		if (c) return d;
	};
}()());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var a, c;
-console.log(function(n) {
+console.log(function(undefined) {
 	return function() {
-		return a ? b : c ? d : n;
+		if (a) return b;
+		if (c) return d;
 	};
 }()());

```

## `uglify/join_vars/issue_3856_1`

- tags: `join vars`, `sequences`
- size: oxc 104 vs reference 85 (no whitespaces: +19, formatted: +25)

```js
console.log(function() {
	(function() {
		var a;
		if (!a) {
			a = 0;
			for (var b; !console;);
			return 0;
		}
		if (a) return 1;
	})();
}());

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 console.log(function() {
 	(function() {
-		var a, b;
-		if (a) a;
-		else {
+		var a;
+		if (!a) {
 			a = 0;
-			for (; !console;);
+			for (var b; !console;);
+			return 0;
 		}
+		if (a) return 1;
 	})();
 }());

```

## `uglify/labels/labels_2`

- tags: `sequences`, `remove unused`
- size: oxc 62 vs reference 43 (no whitespaces: +19, formatted: +22)

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

## `uglify/merge_vars/issue_5714`

- tags: `join vars`, `remove unused`
- size: oxc 155 vs reference 136 (no whitespaces: +19, formatted: +34)

```js
'use strict';
console.log(function() {
	var i = 1;
	while (i--) {
		var a = function f(b) {
			console.log(b);
			var c = function(d) {
				console.log(typeof d);
			}(console);
		}();
		var e = 42;
	}
	return e;
}());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,13 @@
 'use strict';
 console.log(function() {
-	for (var i = 1; i--;) {
-		var b = void 0;
-		console.log(b);
-		b = console, console.log(typeof b);
+	var i = 1;
+	for (; i--;) {
+		(function(b) {
+			console.log(b);
+			(function(d) {
+				console.log(typeof d);
+			})(console);
+		})();
 		var e = 42;
 	}
 	return e;

```

## `uglify/optional-chains/issue_5905`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 40 (no whitespaces: +19, formatted: +22)

```js
var a;
do {
	var b = a++;
	var c = c ?? b?.[42];
} while (console.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var a;
-do {
-	a++;
-} while (console.log('PASS'));
+do
+	var b = a++, c = c ?? b?.[42];
+while (console.log('PASS'));

```

## `uglify/optional-chains/trim_1`

- tags: `join vars`
- size: oxc 75 vs reference 56 (no whitespaces: +19, formatted: +19)

```js
(function(a, b) {
	console?.log?.(a?.p, b?.[console.log('FAIL')]);
})?.({ p: 'PASS' });

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function(a, b) {
-	console?.log?.(a.p, void 0);
+	console?.log?.(a?.p, b?.[console.log('FAIL')]);
 })({ p: 'PASS' });

```

## `uglify/pure_funcs/relational`

- tags: `pure functions`
- size: oxc 68 vs reference 49 (no whitespaces: +19, formatted: +23)

```js
foo() in new foo();
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
-[] instanceof bar();
+foo() in new foo();
+foo() instanceof bar();
 bar();
 bar(), bar();
 bar();

```

## `uglify/rests/issue_5128_1`

- size: oxc 69 vs reference 50 (no whitespaces: +19, formatted: +26)

```js
console.log(function() {
	return function f(...[a]) {
		return a;
	}('PASS');
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-console.log(function f(...[a]) {
-	return a;
-}('PASS'));
+console.log(function() {
+	return function(...[a]) {
+		return a;
+	}('PASS');
+}());

```

## `uglify/switches/issue_1680_1`

- size: oxc 107 vs reference 88 (no whitespaces: +19, formatted: +23)

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
-	default: f(5);
+	case 2:
+	case f(3):
+	case f(4): f(5);
 }

```

## `uglify/yields/issue_5749_1`

- tags: `join vars`, `remove unused`
- size: oxc 69 vs reference 50 (no whitespaces: +19, formatted: +32)

```js
var a;
function* f() {}
a = f(new function() {
	var b = a |= 0, c = a += console.log('PASS');
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
-(function() {})(function() {
-	console.log('PASS');
+var a;
+function* f() {}
+a = f(new function() {
+	a |= 0;
+	a += console.log('PASS');
 }());

```

## `uglify/awaits/await_void_2`

- tags: `sequences`
- size: oxc 62 vs reference 42 (no whitespaces: +20, formatted: +21)

```js
(async function() {
	console.log('PASS');
	return await void 42;
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (async function() {
-	console.log('PASS');
+	return console.log('PASS'), await void 0;
 })();

```

## `uglify/awaits/inline_await_2`

- tags: `join vars`, `remove unused`
- size: oxc 94 vs reference 74 (no whitespaces: +20, formatted: +29)

```js
(async function() {
	async function f(a) {
		await a;
	}
	return await f(console);
})();
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 (async function() {
-	return await void await console;
+	async function f(a) {
+		await a;
+	}
+	return await f(console);
 })();
 console.log('PASS');

```

## `uglify/awaits/issue_4377`

- size: oxc 91 vs reference 71 (no whitespaces: +20, formatted: +29)

```js
console.log(typeof function() {
	return function() {
		f;
		async function f() {}
		return f();
	}();
}().then);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 console.log(typeof function() {
-	return f();
-	async function f() {}
+	return function() {
+		async function f() {}
+		return f();
+	}();
 }().then);

```

## `uglify/booleans/concat_truthy`

- size: oxc 66 vs reference 46 (no whitespaces: +20, formatted: +22)

```js
console.log('foo') + (console.log('bar'), 'baz') || console.log('moo');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('foo') + (console.log('bar'), 'baz');
+console.log('foo') + (console.log('bar'), 'baz') || console.log('moo');

```

## `uglify/collapse_vars/issue_2436_10`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 109 vs reference 89 (no whitespaces: +20, formatted: +29)

```js
var o = {
	a: 1,
	b: 2
};
function f(n) {
	o = { b: 3 };
	return n;
}
console.log(function(c) {
	return [
		c.a,
		f(c.b),
		c.b
	];
}(o).join(' '));

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,15 @@
+var o = {
+	a: 1,
+	b: 2
+};
 function f(n) {
-	({ b: 3 });
+	o = { b: 3 };
 	return n;
 }
-console.log([
-	(c = {
-		a: 1,
-		b: 2
-	}).a,
-	f(c.b),
-	c.b
-].join(' '));
-var c;
+console.log(function(c) {
+	return [
+		c.a,
+		f(c.b),
+		c.b
+	];
+}(o).join(' '));

```

## `uglify/collapse_vars/issue_2436_4`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 45 (no whitespaces: +20, formatted: +26)

```js
var o = {
	a: 1,
	b: 2
};
console.log(function(c) {
	return {
		x: c.a,
		y: c.b
	};
	var o;
}(o));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
-console.log({
-	x: (c = {
-		a: 1,
-		b: 2
-	}).a,
-	y: c.b
-});
-var c;
+var o = {
+	a: 1,
+	b: 2
+};
+console.log(function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+}(o));

```

## `uglify/dead-code/self_assignments_4`

- tags: `join vars`
- size: oxc 59 vs reference 39 (no whitespaces: +20, formatted: +26)

```js
var i = 0, l = ['PASS'];
l[0] = l[0];
l[i] = l[i];
console.log(l[0], i);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
 var i = 0, l = ['PASS'];
+l[0] = l[0];
+l[i] = l[i];
 console.log(l[0], i);

```

## `uglify/default-values/reduce_array`

- tags: `join vars`, `remove unused`
- size: oxc 62 vs reference 42 (no whitespaces: +20, formatted: +27)

```js
var [a = 'foo', b = 'bar', c = 'baz'] = [void 0, null];
console.log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var [c = 'baz'] = [];
-console.log('foo', null, c);
+var [a = 'foo', b = 'bar', c = 'baz'] = [void 0, null];
+console.log(a, b, c);

```

## `uglify/default-values/unused_value_assign_2`

- tags: `remove unused`
- size: oxc 48 vs reference 28 (no whitespaces: +20, formatted: +22)

```js
[a = console.log('FAIL')] = ['PASS'];
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-[a] = ['PASS'];
+[a = console.log('FAIL')] = ['PASS'];
 console.log(a);

```

## `uglify/destructured/funarg_unused_4`

- tags: `remove unused`
- size: oxc 60 vs reference 40 (no whitespaces: +20, formatted: +29)

```js
console.log(function([a], { b }, c) {
	return 'PASS';
}([1], { b: 2 }, 3));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function() {
+console.log(function([a], { b }, c) {
 	return 'PASS';
-}());
+}([1], { b: 2 }, 3));

```

## `uglify/drop-unused/drop_toplevel_vars`

- tags: `remove unused`
- size: oxc 100 vs reference 80 (no whitespaces: +20, formatted: +33)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
+var a, b = 1, c = g;
 function f(d) {
 	return function() {
-		2;
+		c = 2;
 	};
 }
-2;
+a = 2;
 function g() {}
 function h() {}
-console.log(3);
+console.log(b = 3);

```

## `uglify/evaluate/issue_2207_3`

- size: oxc 122 vs reference 102 (no whitespaces: +20, formatted: +16)

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
+console.log(Number.MIN_VALUE);
 console.log(NaN);
-console.log(-1 / 0);
-console.log(1 / 0);
+console.log(-Infinity);
+console.log(Infinity);

```

## `uglify/functions/issue_2620_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 101 vs reference 81 (no whitespaces: +20, formatted: +31)

```js
var c = 'FAIL';
(function() {
	function f(a) {
		var b = function g(a) {
			a && a();
		}();
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
@@ -1,6 +1,9 @@
 var c = 'FAIL';
-!function(a) {
-	if (function(a) {
-		a && a();
-	}(), a) c = 'PASS';
-}(1), console.log(c);
+(function() {
+	function f(a) {
+		(function(a) {
+			a && a();
+		})(), a && (c = 'PASS');
+	}
+	f(1);
+})(), console.log(c);

```

## `uglify/functions/issue_3016_2`

- size: oxc 70 vs reference 50 (no whitespaces: +20, formatted: +23)

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

## `uglify/functions/issue_3836_2`

- size: oxc 86 vs reference 66 (no whitespaces: +20, formatted: +25)

```js
(function() {
	return function() {
		for (var a in 0) console.log(k);
	}(console.log('PASS'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 (function() {
-	console.log('PASS');
-	for (var a in 0) console.log(k);
+	return function() {
+		for (var a in 0) console.log(k);
+	}(console.log('PASS'));
 })();

```

## `uglify/functions/issue_4823`

- tags: `join vars`, `remove unused`
- size: oxc 120 vs reference 100 (no whitespaces: +20, formatted: +25)

```js
console.log(typeof function() {
	{
		function f() {}
		var arguments = f();
		function g() {}
		var arguments = g;
	}
	return f && arguments;
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 console.log(typeof function() {
 	{
 		function f() {}
-		f();
-		var arguments = function() {};
+		var arguments = void 0;
+		function g() {}
+		var arguments = g;
 	}
 	return f && arguments;
 }());

```

## `uglify/functions/issue_5766_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 107 vs reference 87 (no whitespaces: +20, formatted: +30)

```js
log = function(a) {
	console.log(typeof a);
};
do {
	(function() {
		try {
			var f = function() {};
			log(f && f);
		} catch (e) {}
	})();
} while (0);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
 log = function(a) {
 	console.log(typeof a);
 };
-do {
-	try {
-		function f() {}
-		log(f);
-	} catch (e) {}
-} while (0);
+do
+	(function() {
+		try {
+			var f = function() {};
+			log(f && f);
+		} catch {}
+	})();
+while (0);

```

## `uglify/functions/issue_5766_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 107 vs reference 87 (no whitespaces: +20, formatted: +30)

```js
log = function(a) {
	console.log(typeof a);
};
do {
	(function() {
		try {
			var f = function() {};
			log(f && f);
		} catch (e) {}
	})();
} while (0);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
 log = function(a) {
 	console.log(typeof a);
 };
-do {
-	try {
-		function f() {}
-		log(f);
-	} catch (e) {}
-} while (0);
+do
+	(function() {
+		try {
+			var f = function() {};
+			log(f && f);
+		} catch {}
+	})();
+while (0);

```

## `uglify/functions/loop_inline`

- tags: `join vars`, `remove unused`
- size: oxc 104 vs reference 84 (no whitespaces: +20, formatted: +25)

```js
console.log(function(o) {
	function g(p) {
		return o[p];
	}
	function h(q) {
		while (g(q));
	}
	return h;
}([
	1,
	'foo',
	0
])(2));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,11 @@
 console.log(function(o) {
-	return function(q) {
-		while (p = q, o[p]);
-		var p;
-	};
+	function g(p) {
+		return o[p];
+	}
+	function h(q) {
+		for (; g(q););
+	}
+	return h;
 }([
 	1,
 	'foo',

```

## `uglify/issue-1750/case_2`

- size: oxc 70 vs reference 50 (no whitespaces: +20, formatted: +26)

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
@@ -1,5 +1,7 @@
 var a = 0, b = 1;
 switch (0) {
+	default: b = 2;
 	case a: a = 3;
+	case 0:
 }
 console.log(a, b);

```

## `uglify/labels/labels_4`

- tags: `sequences`, `remove unused`
- size: oxc 60 vs reference 40 (no whitespaces: +20, formatted: +27)

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

## `uglify/loops/issue_4084`

- tags: `join vars`, `remove unused`
- size: oxc 81 vs reference 61 (no whitespaces: +20, formatted: +26)

```js
console.log(function() {
	function f(a) {
		var b = a++;
		for (a in 'foo');
	}
	f();
	return typeof a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 console.log(function() {
-	(function() {
-		0;
-	})();
+	function f(a) {
+		a++;
+		for (a in 'foo');
+	}
+	f();
 	return typeof a;
 }());

```

## `uglify/negate-iife/negate_iife_2`

- size: oxc 30 vs reference 10 (no whitespaces: +20, formatted: +26)

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

## `uglify/negate-iife/negate_iife_2_side_effects`

- size: oxc 30 vs reference 10 (no whitespaces: +20, formatted: +26)

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

## `uglify/numbers/issue_3653`

- size: oxc 280 vs reference 260 (no whitespaces: +20, formatted: +32)

```js
console.log(0 - (console && 0));
console.log(0 + (0 - (console && 0)));
console.log(0 - (0 - (console && 0)));
console.log(1 * (0 - (console && 0)));
console.log(1 / (0 - (console && 0)));
console.log(0 - (console && 0) + 0);
console.log(0 - (console && 0) - 0);
console.log((0 - (console && 0)) * 1);
console.log((0 - (console && 0)) / 1);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 console.log(0 - (console && 0));
-console.log(0 - (console && 0));
+console.log(0 + (0 - (console && 0)));
 console.log(0 - (0 - (console && 0)));
-console.log(0 - (console && 0));
+console.log(1 * (0 - (console && 0)));
 console.log(1 / (0 - (console && 0)));
-console.log(0 - (console && 0));
-console.log(0 - (console && 0));
-console.log(0 - (console && 0));
-console.log(0 - (console && 0));
+console.log(0 - (console && 0) + 0);
+console.log(0 - (console && 0) - 0);
+console.log((0 - (console && 0)) * 1);
+console.log((0 - (console && 0)) / 1);

```

## `uglify/properties/evaluate_array_length`

- size: oxc 70 vs reference 50 (no whitespaces: +20, formatted: +27)

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

## `uglify/reduce_vars/unsafe_evaluate_equality_1`

- tags: `join vars`, `remove unused`
- size: oxc 95 vs reference 75 (no whitespaces: +20, formatted: +32)

```js
function f0() {
	var a = {};
	return a === a;
}
function f1() {
	var a = [];
	return a === a;
}
console.log(f0(), f1());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 function f0() {
-	return true;
+	var a = {};
+	return a === a;
 }
 function f1() {
-	return true;
+	var a = [];
+	return a === a;
 }
 console.log(f0(), f1());

```

## `uglify/switches/issue_5008_1`

- tags: `join vars`
- size: oxc 81 vs reference 61 (no whitespaces: +20, formatted: +25)

```js
console.log(function f() {
	switch (f) {
		case f: return 'PASS';
		default: return 'FAIL';
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 console.log(function f() {
 	switch (f) {
-		default: return 'PASS';
+		case f: return 'PASS';
+		default: return 'FAIL';
 	}
 }());

```

## `uglify/switches/issue_5008_2`

- tags: `join vars`
- size: oxc 82 vs reference 62 (no whitespaces: +20, formatted: +25)

```js
console.log(function(a) {
	switch (a) {
		case a: return 'PASS';
		default: return 'FAIL';
	}
}([]));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 console.log(function(a) {
 	switch (a) {
-		default: return 'PASS';
+		case a: return 'PASS';
+		default: return 'FAIL';
 	}
 }([]));

```

## `uglify/switches/issue_5008_3`

- tags: `join vars`
- size: oxc 82 vs reference 62 (no whitespaces: +20, formatted: +25)

```js
console.log(function(a) {
	switch (a) {
		case a: return 'PASS';
		default: return 'FAIL';
	}
}({}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 console.log(function(a) {
 	switch (a) {
-		default: return 'PASS';
+		case a: return 'PASS';
+		default: return 'FAIL';
 	}
 }({}));

```

## `uglify/switches/issue_5008_4`

- tags: `join vars`
- size: oxc 85 vs reference 65 (no whitespaces: +20, formatted: +25)

```js
console.log(function(a) {
	switch (a) {
		case a: return 'PASS';
		default: return 'FAIL';
	}
}(/foo/));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 console.log(function(a) {
 	switch (a) {
-		default: return 'PASS';
+		case a: return 'PASS';
+		default: return 'FAIL';
 	}
 }(/foo/));

```

## `uglify/templates/issue_4931`

- size: oxc 85 vs reference 65 (no whitespaces: +20, formatted: +20)

```js
console.log(String.raw`${typeof A} ${'\r'}`);
console.log(String.raw`${'\\'} ${'`'}`);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 console.log(String.raw`${typeof A} ${'\r'}`);
-console.log('\\ `');
+console.log(String.raw`${'\\'} ${'`'}`);

```

## `uglify/yields/drop_body_1`

- size: oxc 79 vs reference 59 (no whitespaces: +20, formatted: +23)

```js
(function* ([, a = console.log('foo')]) {
	console.log('bar');
})([console.log('baz')]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-void ([[, [][0] = console.log('foo')]] = [[console.log('baz')]]);
+(function* ([, a = console.log('foo')]) {
+	console.log('bar');
+})([console.log('baz')]);

```

## `uglify/classes/issue_4725_2`

- size: oxc 84 vs reference 63 (no whitespaces: +21, formatted: +31)

```js
'use strict';
new class {
	f() {
		return function() {
			while (console.log('PASS'));
		}();
	}
}().f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 'use strict';
 new class {
 	f() {
-		while (console.log('PASS'));
+		return function() {
+			for (; console.log('PASS'););
+		}();
 	}
 }().f();

```

## `uglify/default-values/issue_5533_2_drop_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 114 vs reference 93 (no whitespaces: +21, formatted: +27)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f([b] = []) {
				b;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) {
-			var [[,] = []] = [];
-			throw 'PASS';
-		}
+		for (;;) (function() {
+			(function([b] = []) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/destructured/issue_5074_getter_pure_getters`

- tags: `remove unused`
- size: oxc 41 vs reference 20 (no whitespaces: +21, formatted: +28)

```js
({} = { get [(console.log('PASS'), 42)]() {} });

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+({} = { get [(console.log('PASS'), 42)]() {} });

```

## `uglify/destructured/issue_5222`

- tags: `join vars`, `remove unused`
- size: oxc 79 vs reference 58 (no whitespaces: +21, formatted: +31)

```js
function f() {
	do {
		(function() {
			var a = { p: [a] = [] };
		})();
	} while (console.log('PASS'));
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-do {
-	a = void 0, a = { p: [a] = [] };
-} while (console.log('PASS'));
-var a;
+function f() {
+	do
+		(function() {
+			var a = { p: [a] = [] };
+		})();
+	while (console.log('PASS'));
+}
+f();

```

## `uglify/drop-unused/issue_4017_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 66 vs reference 45 (no whitespaces: +21, formatted: +30)

```js
var a = 0;
console.log(function f() {
	var b = c &= 0;
	var c = a++ + (A = a);
	var d = c && c[f];
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var a = 0;
-console.log(function() {
-	0;
-	a++, A = a;
+console.log(function f() {
+	c &= 0;
+	var c = a++ + (A = a);
+	c && c[f];
 }());

```

## `uglify/drop-unused/issue_5079`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 39 (no whitespaces: +21, formatted: +28)

```js
var a;
do {
	(a = 123456).p = a;
	a.q = null;
} while (console.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
+var a;
 do {
-	0, 0, null;
+	(a = 123456).p = a;
+	a.q = null;
 } while (console.log('PASS'));

```

## `uglify/evaluate/instanceof_lambda`

- size: oxc 40 vs reference 19 (no whitespaces: +21, formatted: +22)

```js
console.log(42 instanceof function() {});

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(false);
+console.log(42 instanceof function() {});

```

## `uglify/functions/inline_return_binary`

- size: oxc 139 vs reference 118 (no whitespaces: +21, formatted: +34)

```js
console.log(function() {
	return function() {
		while (console.log('foo'));
		return 'bar';
	}() || function() {
		while (console.log('baz'));
		return 'moo';
	}();
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 console.log(function() {
-	while (console.log('foo'));
-	return 'bar';
-}() || function() {
-	while (console.log('baz'));
-	return 'moo';
+	return function() {
+		for (; console.log('foo'););
+		return 'bar';
+	}() || function() {
+		for (; console.log('baz'););
+		return 'moo';
+	}();
 }());

```

## `uglify/functions/issue_3439_1`

- size: oxc 81 vs reference 60 (no whitespaces: +21, formatted: +29)

```js
console.log(typeof function() {
	return function(a) {
		function a() {}
		return a;
	}(42);
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-console.log(typeof function(a) {
-	function a() {}
-	return a;
-}(42));
+console.log(typeof function() {
+	return function(a) {
+		function a() {}
+		return a;
+	}(42);
+}());

```

## `uglify/functions/issue_3439_2`

- size: oxc 81 vs reference 60 (no whitespaces: +21, formatted: +29)

```js
console.log(typeof function() {
	return function(a) {
		function a() {}
		return a;
	}(42);
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-console.log(typeof function(a) {
-	function a() {}
-	return a;
-}(42));
+console.log(typeof function() {
+	return function(a) {
+		function a() {}
+		return a;
+	}(42);
+}());

```

## `uglify/functions/issue_3835`

- tags: `join vars`
- size: oxc 50 vs reference 29 (no whitespaces: +21, formatted: +28)

```js
(function f() {
	return function() {
		return f();
	}();
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 (function f() {
-	return f();
+	return function() {
+		return f();
+	}();
 })();

```

## `uglify/functions/issue_3836_1`

- size: oxc 86 vs reference 65 (no whitespaces: +21, formatted: +28)

```js
(function() {
	return function() {
		for (var a in 0) console.log(k);
	}(console.log('PASS'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 (function() {
-	for (var a in 0) console.log(k);
-})(console.log('PASS'));
+	return function() {
+		for (var a in 0) console.log(k);
+	}(console.log('PASS'));
+})();

```

## `uglify/functions/issue_4725_2`

- size: oxc 68 vs reference 47 (no whitespaces: +21, formatted: +29)

```js
var o = { f() {
	return function() {
		while (console.log('PASS'));
	}();
} };
o.f();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 var o = { f() {
-	while (console.log('PASS'));
+	return function() {
+		for (; console.log('PASS'););
+	}();
 } };
 o.f();

```

## `uglify/issue-281/modified`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 55 (no whitespaces: +21, formatted: +28)

```js
function f5(b) {
	var a = function() {
		return b;
	}();
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
+	var a = function() {
+		return b;
+	}();
 	return b++ + a;
 }
 console.log(f5(1));

```

## `uglify/keep_fargs/issue_3420_2`

- tags: `remove unused`
- size: oxc 71 vs reference 50 (no whitespaces: +21, formatted: +28)

```js
console.log(function() {
	return function(a, b, c, d) {
		return a + b;
	};
}().length);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-console.log(function(a, b, c, d) {
-	return a + b;
-}.length);
+console.log(function() {
+	return function(a, b, c, d) {
+		return a + b;
+	};
+}().length);

```

## `uglify/loops/issue_2740_5`

- tags: `remove unused`, `2 iterations`
- size: oxc 56 vs reference 35 (no whitespaces: +21, formatted: +30)

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

## `uglify/reduce_vars/escape_local_conditional`

- tags: `join vars`, `remove unused`
- size: oxc 166 vs reference 145 (no whitespaces: +21, formatted: +28)

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
-	if (thing !== baz()) console.log('PASS');
-	else console.log('FAIL');
-})();
+main();

```

## `uglify/reduce_vars/issue_1814_1`

- tags: `join vars`, `remove unused`
- size: oxc 70 vs reference 49 (no whitespaces: +21, formatted: +28)

```js
var a = 42;
!function() {
	var b = a;
	!function(a) {
		console.log(a++, b);
	}(0);
}();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-!function() {
-	!function(a) {
-		console.log(0, 42);
-	}();
-}();
+var a = 42;
+(function() {
+	var b = a;
+	(function(a) {
+		console.log(a++, b);
+	})(0);
+})();

```

## `uglify/reduce_vars/issue_2442`

- tags: `join vars`, `remove unused`
- size: oxc 21 vs reference 0 (no whitespaces: +21, formatted: +27)

```js
function foo() {
	foo();
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+function foo() {
+	foo();
+}

```

## `uglify/rests/issue_5128_2`

- tags: `remove unused`, `keep function names`
- size: oxc 71 vs reference 50 (no whitespaces: +21, formatted: +28)

```js
console.log(function() {
	return function f(...[a]) {
		return a;
	}('PASS');
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-console.log(function f(...[a]) {
-	return a;
-}('PASS'));
+console.log(function() {
+	return function f(...[a]) {
+		return a;
+	}('PASS');
+}());

```

## `uglify/spreads/do_inline_1`

- size: oxc 50 vs reference 29 (no whitespaces: +21, formatted: +26)

```js
console.log(function(a) {
	return a;
}(...['PASS', 'FAIL']));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(('FAIL', 'PASS'));
+console.log(function(a) {
+	return a;
+}('PASS', 'FAIL'));

```

## `uglify/yields/drop_unused_call`

- tags: `remove unused`
- size: oxc 41 vs reference 20 (no whitespaces: +21, formatted: +25)

```js
var a = function* () {}(console.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+var a = function* () {}(console.log('PASS'));

```

## `uglify/arguments/duplicate_argname`

- size: oxc 91 vs reference 69 (no whitespaces: +22, formatted: +22)

```js
(function(a, b, a) {
	console.log(a, b, arguments[0], arguments[1], arguments[2]);
})('foo', 42, 'bar');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function(a, b, a) {
-	console.log(a, b, arguments[0], b, a);
+	console.log(a, b, arguments[0], arguments[1], arguments[2]);
 })('foo', 42, 'bar');

```

## `uglify/arguments/replace_index`

- size: oxc 377 vs reference 355 (no whitespaces: +22, formatted: +22)

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

## `uglify/arguments/replace_index_strict`

- tags: `join vars`
- size: oxc 170 vs reference 148 (no whitespaces: +22, formatted: +22)

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

## `uglify/arrays/index_length`

- tags: `join vars`, `remove unused`
- size: oxc 39 vs reference 17 (no whitespaces: +22, formatted: +26)

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

## `uglify/awaits/async_to_arrow`

- tags: `type:module`, `join vars`, `remove unused`
- size: oxc 92 vs reference 70 (no whitespaces: +22, formatted: +23)

```js
(async function() {
	var f = async function(a, b, c) {
		return b + a + c + c;
	};
	console.log(await f('A', 'P', 'S'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-(async () => {
-	console.log(await (async (a, b, c) => b + a + c + c)('A', 'P', 'S'));
+(async function() {
+	console.log(await async function(a, b, c) {
+		return b + a + c + c;
+	}('A', 'P', 'S'));
 })();

```

## `uglify/awaits/drop_async_1`

- size: oxc 65 vs reference 43 (no whitespaces: +22, formatted: +29)

```js
console.log(function(a) {
	(async function() {
		a *= 7;
	})();
	return a;
}(6));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 console.log(function(a) {
-	a *= 7;
+	(async function() {
+		a *= 7;
+	})();
 	return a;
 }(6));

```

## `uglify/awaits/issue_5634_1_side_effects`

- size: oxc 163 vs reference 141 (no whitespaces: +22, formatted: +37)

```js
var a = 'foo';
(async function() {
	(async function() {
		try {
			return { then(resolve) {
				console.log('bar');
				resolve();
				console.log('baz');
			} };
		} finally {
			a = 'moo';
		}
	})();
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,15 @@
 var a = 'foo';
 (async function() {
-	try {
-		return { then(resolve) {
-			console.log('bar');
-			resolve();
-			console.log('baz');
-		} };
-	} finally {
-		a = 'moo';
-	}
+	(async function() {
+		try {
+			return { then(resolve) {
+				console.log('bar');
+				resolve();
+				console.log('baz');
+			} };
+		} finally {
+			a = 'moo';
+		}
+	})();
 })();
 console.log(a);

```

## `uglify/booleans/issue_5694_2`

- tags: `sequences`
- size: oxc 80 vs reference 58 (no whitespaces: +22, formatted: +20)

```js
var undefined;
// Node.js v0.12~6 (vm): NaN
console.log(('foo', ++undefined) || undefined);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 var undefined;
-console.log(('foo', ++undefined) || undefined);
+// Node.js v0.12~6 (vm): NaN
+console.log(++undefined || undefined);

```

## `uglify/collapse_vars/issue_2436_1`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 43 (no whitespaces: +22, formatted: +31)

```js
var o = {
	a: 1,
	b: 2
};
console.log(function(c) {
	return {
		x: c.a,
		y: c.b
	};
}(o));

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,9 @@
 	a: 1,
 	b: 2
 };
-console.log({
-	x: o.a,
-	y: o.b
-});
+console.log(function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+}(o));

```

## `uglify/collapse_vars/issue_2436_9`

- tags: `join vars`, `remove unused`
- size: oxc 63 vs reference 41 (no whitespaces: +22, formatted: +31)

```js
var o = console;
console.log(function(c) {
	return {
		x: c.a,
		y: c.b
	};
}(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var o = console;
-console.log({
-	x: o.a,
-	y: o.b
-});
+console.log(function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+}(o));

```

## `uglify/collapse_vars/issue_3439_2`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 44 (no whitespaces: +22, formatted: +29)

```js
console.log(typeof function() {
	var a = 42;
	function a() {}
	return a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 console.log(typeof function() {
-	return 42;
+	var a = 42;
+	function a() {}
+	return a;
 }());

```

## `uglify/default-values/issue_4588_1_evaluate`

- size: oxc 37 vs reference 15 (no whitespaces: +22, formatted: +25)

```js
console.log(function(a = 42) {}.length);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(0);
+console.log(function(a = 42) {}.length);

```

## `uglify/default-values/issue_5533_2_keep_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 114 vs reference 92 (no whitespaces: +22, formatted: +28)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f([b] = []) {
				b;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) {
-			var [[] = []] = [];
-			throw 'PASS';
-		}
+		for (;;) (function() {
+			(function([b] = []) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/destructured/issue_5074_setter_pure_getters`

- tags: `remove unused`
- size: oxc 42 vs reference 20 (no whitespaces: +22, formatted: +29)

```js
({} = { set [(console.log('PASS'), 42)](v) {} });

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+({} = { set [(console.log('PASS'), 42)](v) {} });

```

## `uglify/evaluate/call_args`

- tags: `join vars`
- size: oxc 49 vs reference 27 (no whitespaces: +22, formatted: +26)

```js
var a = 1;
console.log(a);
+function(a) {
	return a;
}(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var a = 1;
-console.log(1);
-1, 1;
+console.log(a);
++function(a) {
+	return a;
+}(a);

```

## `uglify/evaluate/issue_2231_3`

- size: oxc 41 vs reference 19 (no whitespaces: +22, formatted: +25)

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

## `uglify/evaluate/issue_3935`

- size: oxc 39 vs reference 17 (no whitespaces: +22, formatted: +27)

```js
console.log(function f(a) {
	return a++;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(NaN);
+console.log(function(a) {
+	return a++;
+}());

```

## `uglify/evaluate/issue_5356`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 22 (no whitespaces: +22, formatted: +28)

```js
console.log(function() {
	return a++;
	var a = a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-console.log(+a);
-var a;
+console.log(function() {
+	return a++;
+	var a;
+}());

```

## `uglify/functions/issue_1841_1`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 66 (no whitespaces: +22, formatted: +27)

```js
var b = 10;
!function(arg) {
	for (var key in 'hi') var n = arg.baz, n = [b = 42];
}(--b);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var b = 10;
-!function() {
-	for (var key in 'hi') b = 42;
-}(--b);
+(function(arg) {
+	for (var key in 'hi') var n = arg.baz, n = [b = 42];
+})(--b);
 console.log(b);

```

## `uglify/functions/issue_5067`

- tags: `join vars`, `remove unused`
- size: oxc 22 vs reference 0 (no whitespaces: +22, formatted: +30)

```js
var f = function() {
	f();
};

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+var f = function() {
+	f();
+};

```

## `uglify/hoist_props/contains_this_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 70 vs reference 48 (no whitespaces: +22, formatted: +34)

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
@@ -1,3 +1,7 @@
-console.log(1, 1, function() {
-	return this === this;
-});
+var o = {
+	u: function() {
+		return this === this;
+	},
+	p: 1
+};
+console.log(o.p, o.p, o.u);

```

## `uglify/hoist_vars/issue_5626`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 93 vs reference 71 (no whitespaces: +22, formatted: +29)

```js
var a = function() {
	return console.log(arguments[0]), 42;
}('PASS') ? null : 'foo';
for (var b in a) FAIL;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-(function() {
-	console.log(arguments[0]);
-})('PASS');
-for (var b in null) FAIL;
+var a = function() {
+	return console.log(arguments[0]), 42;
+}('PASS') ? null : 'foo';
+for (var b in a) FAIL;

```

## `uglify/if_return/tail_match`

- size: oxc 146 vs reference 124 (no whitespaces: +22, formatted: +23)

```js
function f(a) {
	if (a) {
		console.log('foo');
		return console.log('bar');
	}
	while (console.log('baz'));
	return console.log('moo'), console.log('bar');
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 function f(a) {
-	if (a) console.log('foo');
-	else {
-		while (console.log('baz'));
-		console.log('moo');
+	if (a) {
+		console.log('foo');
+		return console.log('bar');
 	}
-	return console.log('bar');
+	for (; console.log('baz'););
+	return console.log('moo'), console.log('bar');
 }
 f();
 f(42);

```

## `uglify/issue-281/drop_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 69 vs reference 47 (no whitespaces: +22, formatted: +28)

```js
var a = 1;
!function(a_1) {
	a++;
}(a++ + (a && console.log(a)));
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var a = 1;
-++a && console.log(a), a++;
+(function(a_1) {
+	a++;
+})(a++ + (a && console.log(a)));
 console.log(a);

```

## `uglify/issue-281/inner_var_for_in_1`

- tags: `join vars`
- size: oxc 100 vs reference 78 (no whitespaces: +22, formatted: +30)

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

## `uglify/issue-281/keep_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 69 vs reference 47 (no whitespaces: +22, formatted: +28)

```js
var a = 1;
!function(a_1) {
	a++;
}(a++ + (a && console.log(a)));
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var a = 1;
-++a && console.log(a), a++;
+(function(a_1) {
+	a++;
+})(a++ + (a && console.log(a)));
 console.log(a);

```

## `uglify/issue-976/eval_collapse_vars`

- tags: `join vars`, `remove unused`
- size: oxc 328 vs reference 306 (no whitespaces: +22, formatted: +32)

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

## `uglify/keep_fargs/issue_2506`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 136 vs reference 114 (no whitespaces: +22, formatted: +27)

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
-	(function() {
-		(function() {
-			if (false <= 0 / 0 & this >> 1 >= 0) c++;
-		})(c++);
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

## `uglify/loops/issue_2740_4`

- tags: `remove unused`, `2 iterations`
- size: oxc 72 vs reference 50 (no whitespaces: +22, formatted: +22)

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
@@ -1,5 +1,2 @@
-for (var x = 0; x < 3; x++) {
-	var y = 0;
-	y < 2;
-}
+L1: for (var x = 0; x < 3; x++) L2: for (var y = 0; y < 2; y++) break L2;
 console.log(x, y);

```

## `uglify/loops/issue_3631_1`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 46 (no whitespaces: +22, formatted: +29)

```js
var c = 0;
L: do {
	for (;;) continue L;
	var b = 1;
} while (b && c++);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var c = 0;
-do {
-	var b;
+L: do {
+	for (;;) continue L;
+	var b = 1;
 } while (b && c++);
 console.log(c);

```

## `uglify/reduce_vars/issue_1814_2`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 52 (no whitespaces: +22, formatted: +31)

```js
var a = '32';
!function() {
	var b = a + 1;
	!function(a) {
		console.log(b, a++);
	}(0);
}();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-!function() {
-	!function(a) {
-		console.log('321', 0);
-	}();
-}();
+var a = '32';
+(function() {
+	var b = a + 1;
+	(function(a) {
+		console.log(b, a++);
+	})(0);
+})();

```

## `uglify/reduce_vars/unsafe_evaluate`

- tags: `join vars`, `remove unused`
- size: oxc 122 vs reference 100 (no whitespaces: +22, formatted: +33)

```js
function f0() {
	var a = { b: 1 };
	console.log(a.b + 3);
}
function f1() {
	var a = {
		b: { c: 1 },
		d: 2
	};
	console.log(a.b + 3, a.d + 4, a.b.c + 5, a.d.c + 6);
}
f0();
f1();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 function f0() {
-	console.log(4);
+	console.log({ b: 1 }.b + 3);
 }
 function f1() {
 	var a = {
 		b: { c: 1 },
 		d: 2
 	};
-	console.log(a.b + 3, 6, 6, NaN);
+	console.log(a.b + 3, a.d + 4, a.b.c + 5, a.d.c + 6);
 }
 f0();
 f1();

```

## `uglify/typeof/emberjs_global`

- tags: `sequences`, `remove unused`, `2 iterations`
- size: oxc 88 vs reference 66 (no whitespaces: +22, formatted: +29)

```js
var a;
if (typeof A === 'object') {
	a = A;
} else if (typeof B === 'object') {
	a = B;
} else {
	throw new Error('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-if ('object' != typeof A && 'object' != typeof B) throw new Error('PASS');
+var a;
+if (typeof A == 'object') a = A;
+else if (typeof B == 'object') a = B;
+else throw Error('PASS');

```

## `uglify/yields/instanceof_lambda`

- size: oxc 41 vs reference 19 (no whitespaces: +22, formatted: +24)

```js
console.log(42 instanceof function* () {});

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(false);
+console.log(42 instanceof function* () {});

```

## `uglify/awaits/issue_5692_2`

- size: oxc 99 vs reference 76 (no whitespaces: +23, formatted: +29)

```js
(async function() {
	(async function() {
		for (var k of []);
	})();
	console.log('foo');
})();
console.log('bar');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 (async function() {
-	for (var k of []);
+	(async function() {
+		for (var k of []);
+	})();
 	console.log('foo');
 })();
 console.log('bar');

```

## `uglify/collapse_vars/issue_2187_3`

- tags: `join vars`, `remove unused`
- size: oxc 53 vs reference 30 (no whitespaces: +23, formatted: +28)

```js
var b = 1;
console.log(function(a) {
	return a && ++b;
}(b--));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
 var b = 1;
-console.log(b-- && ++b);
+console.log(function(a) {
+	return a && ++b;
+}(b--));

```

## `uglify/collapse_vars/issue_2298`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 142 vs reference 119 (no whitespaces: +23, formatted: +32)

```js
!function() {
	function f() {
		var a = undefined;
		var undefined = a++;
		try {
			!function g(b) {
				b[1] = 'foo';
			}();
			console.log('FAIL');
		} catch (e) {
			console.log('PASS');
		}
	}
	f();
}();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,14 @@
-!function() {
-	(function() {
+(function() {
+	function f() {
+		var a = undefined, undefined = a++;
 		try {
-			!function(b) {
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

## `uglify/collapse_vars/issue_3884_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 43 vs reference 20 (no whitespaces: +23, formatted: +35)

```js
var a = 100, b = 1;
{
	a++ + a || a;
	b <<= a;
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(101, 32);
+var a = 100, b = 1;
+a++ + a;
+b <<= a;
+console.log(a, b);

```

## `uglify/comparisons/unsafe_in_instanceof`

- size: oxc 33 vs reference 10 (no whitespaces: +23, formatted: +26)

```js
var a;
42 in a;
f() instanceof 'foo';

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 var a;
-f();
+42 in a;
+f() instanceof 'foo';

```

## `uglify/default-values/reduce_funarg`

- tags: `join vars`, `remove unused`
- size: oxc 78 vs reference 55 (no whitespaces: +23, formatted: +32)

```js
console.log(...function(a = 'foo', b = 'bar', c = 'baz') {
	return [
		a,
		b,
		c
	];
}(void 0, null));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-console.log(...function() {
+console.log(...function(a = 'foo', b = 'bar', c = 'baz') {
 	return [
-		'foo',
-		null,
-		'baz'
+		a,
+		b,
+		c
 	];
-}());
+}(void 0, null));

```

## `uglify/destructured/issue_5085_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 54 vs reference 31 (no whitespaces: +23, formatted: +35)

```js
var a = 'PASS';
var [b] = [42, a], c = b ? 0 : a = 'FAIL';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var a = 'PASS';
-42;
+var a = 'PASS', [b] = [42, a], c = b ? 0 : a = 'FAIL';
 console.log(a);

```

## `uglify/destructured/issue_5085_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 70 vs reference 47 (no whitespaces: +23, formatted: +32)

```js
var a = 'PASS';
(function(b) {
	[b] = [42, a];
	var c = b ? 0 : a = 'FAIL';
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var a = 'PASS';
 (function(b) {
-	0;
+	[b] = [42, a];
+	b || (a = 'FAIL');
 })();
 console.log(a);

```

## `uglify/destructured/keep_key_2_pure_getters`

- tags: `remove unused`
- size: oxc 43 vs reference 20 (no whitespaces: +23, formatted: +33)

```js
var { 42: a } = { [(console.log('PASS'), 42)]() {} };

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+var { 42: a } = { [(console.log('PASS'), 42)]() {} };

```

## `uglify/evaluate/issue_2968_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 105 vs reference 82 (no whitespaces: +23, formatted: +34)

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
@@ -1,6 +1,8 @@
 var c = 'FAIL';
 (function() {
-	a = 42, (a <<= 0) && (a[c = 'PASS', 0] = 0);
-	var a;
+	(function(a, b) {
+		a <<= 0;
+		a && (a[c = 'PASS', 0 >>> (b += 1)] = 0);
+	})(42, -42);
 })();
 console.log(c);

```

## `uglify/functions/direct_inline`

- tags: `join vars`, `remove unused`
- size: oxc 81 vs reference 58 (no whitespaces: +23, formatted: +29)

```js
function f(a, b) {
	function g(c) {
		return c >> 1;
	}
	return g(a) + g(b);
}
console.log(f(13, 31));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 function f(a, b) {
-	return (a >> 1) + (b >> 1);
+	function g(c) {
+		return c >> 1;
+	}
+	return g(a) + g(b);
 }
 console.log(f(13, 31));

```

## `uglify/functions/issue_3371`

- tags: `join vars`, `remove unused`
- size: oxc 86 vs reference 63 (no whitespaces: +23, formatted: +35)

```js
(function() {
	var a = function f() {
		(function() {
			console.log(typeof f);
		})();
	};
	while (a());
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 (function() {
-	function a() {
-		console.log(typeof a);
-	}
-	while (a());
+	var a = function f() {
+		(function() {
+			console.log(typeof f);
+		})();
+	};
+	for (; a(););
 })();

```

## `uglify/functions/issue_3852`

- tags: `join vars`, `remove unused`
- size: oxc 79 vs reference 56 (no whitespaces: +23, formatted: +30)

```js
console.log(function(a) {
	return function(b) {
		return b && (b[0] = 0), 'PASS';
	}(a);
}(42));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 console.log(function(a) {
-	return a && (a[0] = 0), 'PASS';
+	return function(b) {
+		return b && (b[0] = 0), 'PASS';
+	}(a);
 }(42));

```

## `uglify/functions/use_before_init_in_loop`

- size: oxc 106 vs reference 83 (no whitespaces: +23, formatted: +30)

```js
var a = 'PASS';
for (var b = 2; --b >= 0;) (function() {
	var c = function() {
		return 1;
	}(c && (a = 'FAIL'));
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 var a = 'PASS';
-for (var b = 2; --b >= 0;) c = void 0, c = (c && (a = 'FAIL'), 1);
-var c;
+for (var b = 2; --b >= 0;) (function() {
+	var c = function() {
+		return 1;
+	}(c && (a = 'FAIL'));
+})();
 console.log(a);

```

## `uglify/hoist_vars/issue_5884_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 84 vs reference 61 (no whitespaces: +23, formatted: +39)

```js
try {
	var f = function() {
		var a = ['PASS'];
		for (b in a) console.log(a[b]);
	};
	f();
} finally {
	var b;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,9 @@
 try {
-	var a = ['PASS'];
-	for (var b in a) console.log(a[b]);
-} finally {}
+	var f = function() {
+		var a = ['PASS'];
+		for (b in a) console.log(a[b]);
+	};
+	f();
+} finally {
+	var b;
+}

```

## `uglify/issue-281/ref_scope`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 65 (no whitespaces: +23, formatted: +30)

```js
console.log(function() {
	var a = 1, b = 2, c = 3;
	var a = c++, b = b /= a;
	return function() {
		return a;
	}() + b;
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 console.log(function() {
-	var a = 1, b = 2, c = 3;
-	b = b /= a = c++;
-	return a + b;
+	var a = 1, b = 2, c = 3, a = c++, b = b /= a;
+	return function() {
+		return a;
+	}() + b;
 }());

```

## `uglify/issue-281/wrap_iife_in_expression`

- size: oxc 33 vs reference 10 (no whitespaces: +23, formatted: +28)

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

## `uglify/issue-3768/compress`

- tags: `join vars`, `remove unused`
- size: oxc 312 vs reference 289 (no whitespaces: +23, formatted: +30)

```js
console.log(function() {
	var a = 42;
	return eval('typeof a');
}(), function(e) {
	var a = null;
	return e('typeof a');
}(eval), function(eval) {
	var a = false;
	return eval('typeof a');
}(eval), function(f) {
	var a = 'STRING';
	var eval = f;
	return eval('typeof a');
}(eval), function(g) {
	var a = eval;
	function eval() {
		return g;
	}
	return eval()('typeof a');
}(eval));

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,14 @@
 console.log(function() {
 	var a = 42;
 	return eval('typeof a');
-}(), (0, eval)('typeof a'), function(eval) {
-	var a = false;
+}(), function(e) {
+	var a = null;
+	return e('typeof a');
+}(eval), function(eval) {
+	var a = !1;
 	return eval('typeof a');
 }(eval), function(f) {
-	var a = 'STRING';
-	var eval = f;
+	var a = 'STRING', eval = f;
 	return eval('typeof a');
 }(eval), function(g) {
 	var a = eval;

```

## `uglify/join_vars/issue_3795`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 101 vs reference 78 (no whitespaces: +23, formatted: +32)

```js
var a = 'FAIL';
function f(b, c) {
	for (var i = 5; c && i; --i) return -1;
	a = 'PASS';
}
var d = f(a = 42, d);
console.log(a, d);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-var a = 'FAIL', d = function() {
-	if (void 0) return -1;
+var a = 'FAIL';
+function f(b, c) {
+	for (var i = 5; c && i; --i) return -1;
 	a = 'PASS';
-}(a = 42);
+}
+var d = f(a = 42, d);
 console.log(a, d);

```

## `uglify/join_vars/single_use_for_inline`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 50 vs reference 27 (no whitespaces: +23, formatted: +30)

```js
var a = function() {
	for (; console.log('PASS'););
};
a();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (; console.log('PASS'););
+var a = function() {
+	for (; console.log('PASS'););
+};
+a();

```

## `uglify/join_vars/single_use_var_inline`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 65 vs reference 42 (no whitespaces: +23, formatted: +31)

```js
A = 'PASS';
var a = function() {
	var b = A;
	for (b in console.log(b));
};
a();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
 A = 'PASS';
-var b = A;
-for (b in console.log(b));
+var a = function() {
+	var b = A;
+	for (b in console.log(b));
+};
+a();

```

## `uglify/reduce_vars/issue_4030`

- tags: `join vars`, `remove unused`
- size: oxc 47 vs reference 24 (no whitespaces: +23, formatted: +28)

```js
var a;
{
	delete (a = 'PASS');
	A = 'PASS';
}
console.log(A);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
+var a;
+delete (a = 'PASS');
 A = 'PASS';
 console.log(A);

```

## `uglify/side_effects/issue_2233_2`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 82 (no whitespaces: +23, formatted: +26)

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
@@ -1,6 +1,8 @@
 var RegExp;
+Array.isArray;
 UndeclaredGlobal;
 function foo() {
+	var Number;
 	AnotherUndeclaredGlobal;
-	(void 0).isNaN;
+	Number.isNaN;
 }

```

## `uglify/switches/drop_switch_4`

- tags: `sequences`
- size: oxc 68 vs reference 45 (no whitespaces: +23, formatted: +31)

```js
var a = 'FAIL';
switch (0) {
	default:
	case a:
		var b = a = 'PASS';
		break;
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 var a = 'FAIL';
-0;
-var b = a = 'PASS';
+switch (0) {
+	default:
+	case a: var b = a = 'PASS';
+}
 console.log(a);

```

## `uglify/templates/unsafe_side_effects`

- size: oxc 42 vs reference 19 (no whitespaces: +23, formatted: +24)

```js
`42`;
`${console.log('foo')}`;
String.raw`\nbar`;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('foo');
+`${console.log('foo')}`;
+String.raw`\nbar`;

```

## `uglify/arrows/funarg_arguments`

- size: oxc 40 vs reference 16 (no whitespaces: +24, formatted: +28)

```js
console.log(((arguments) => arguments)(42));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(42);
+console.log(((arguments) => arguments)(42));

```

## `uglify/awaits/issue_4717`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 137 vs reference 113 (no whitespaces: +24, formatted: +35)

```js
(function() {
	async function f() {
		var a = function() {
			await;
		}();
		return 'FAIL';
	}
	return f();
})().then(console.log).catch(function() {
	console.log('PASS');
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
-(async function() {
-	return function() {
-		await;
-	}(), 'FAIL';
+(function() {
+	async function f() {
+		return function() {
+			await;
+		}(), 'FAIL';
+	}
+	return f();
 })().then(console.log).catch(function() {
 	console.log('PASS');
 });

```

## `uglify/collapse_vars/issue_2974`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 101 vs reference 77 (no whitespaces: +24, formatted: +35)

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
@@ -1,5 +1,7 @@
 var c = 0;
 (function(b) {
 	var a = 2;
-	for (; c++, (!0).null && --a > 0;);
-})(), console.log(c);
+	do
+		b && b[b], b && (b.null = -4), c++;
+	while (b.null && --a > 0);
+})(!0), console.log(c);

```

## `uglify/conditionals/issue_5722`

- tags: `sequences`, `keep function names`
- size: oxc 74 vs reference 50 (no whitespaces: +24, formatted: +32)

```js
var a = true;
a && function f() {
	return 42;
}(a++) ? null + (console.log('PASS') && a++) : '';

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-var a = true;
-a && (void a++, console.log('PASS')) && a++;
+var a = !0;
+a && function f() {
+	return 42;
+}(a++) && null + (console.log('PASS') && a++);

```

## `uglify/dead-code/function_assign`

- size: oxc 104 vs reference 80 (no whitespaces: +24, formatted: +33)

```js
console.log(function() {
	var a = 'PASS';
	function h(c) {
		return c;
	}
	h.p = function(b) {
		return b;
	}.p = a;
	return h;
}().p);

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,8 @@
 	function h(c) {
 		return c;
 	}
-	h.p = a;
+	h.p = function(b) {
+		return b;
+	}.p = a;
 	return h;
 }().p);

```

## `uglify/dead-code/self_assignments_5`

- tags: `join vars`, `3 iterations`
- size: oxc 80 vs reference 56 (no whitespaces: +24, formatted: +30)

```js
var i = 0, l = ['FAIL', 'PASS'];
l[0] = l[0];
l[i] = l[i];
l[i++] = l[i++];
console.log(l[0], i);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var i = 0, l = ['FAIL', 'PASS'];
-l[0] = l[1];
-console.log(l[0], 2);
+l[0] = l[0];
+l[i] = l[i];
+l[i++] = l[i++];
+console.log(l[0], i);

```

## `uglify/default-values/evaluate_iife`

- size: oxc 44 vs reference 20 (no whitespaces: +24, formatted: +31)

```js
console.log(function(a = 'PASS') {
	return a;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('PASS');
+console.log(function(a = 'PASS') {
+	return a;
+}());

```

## `uglify/default-values/issue_4502_3`

- size: oxc 72 vs reference 48 (no whitespaces: +24, formatted: +27)

```js
(function() {
	var a = 'PASS';
	(function(b = a++) {})(void 0, console.log(a));
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function() {
 	var a = 'PASS';
-	console.log(a), a++;
+	(function(b = a++) {})(void 0, console.log(a));
 })();

```

## `uglify/default-values/reduce_object`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 42 (no whitespaces: +24, formatted: +37)

```js
var { a = 'foo', b = 'bar', c = 'baz' } = {
	a: void 0,
	b: null
};
console.log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-var { c = 'baz' } = {};
-console.log('foo', null, c);
+var { a = 'foo', b = 'bar', c = 'baz' } = {
+	a: void 0,
+	b: null
+};
+console.log(a, b, c);

```

## `uglify/destructured/funarg_inline`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 41 (no whitespaces: +24, formatted: +32)

```js
try {
	function f({}) {
		return 42;
	}
	var a = f();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
 try {
-	[{}] = [];
-} catch (e) {
+	function f({}) {
+		return 42;
+	}
+	var a = f();
+} catch {
 	console.log('PASS');
 }

```

## `uglify/drop-unused/var_catch_toplevel`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 63 vs reference 39 (no whitespaces: +24, formatted: +35)

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
@@ -1,7 +1,10 @@
-!function() {
+function f() {
+	a--;
 	try {
-		x();
+		a++, x();
 	} catch (a) {
-		var a;
+		if (a) var a;
+		var a = 10;
 	}
-}();
+}
+f();

```

## `uglify/evaluate/issue_3944`

- tags: `join vars`, `remove unused`
- size: oxc 90 vs reference 66 (no whitespaces: +24, formatted: +45)

```js
(function() {
	function f() {
		while (function() {
			var a = 0 == (b && b.p), b = console.log(a);
		}());
		f;
	}
	f();
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-void function f() {
-	while (0 == void 0, console.log(false), void 0);
-	f;
-}();
+(function() {
+	function f() {
+		for (; function() {
+			var a = (b && b.p) == 0, b = console.log(a);
+		}(););
+	}
+	f();
+})();

```

## `uglify/functions/drop_unused_self_reference`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 44 vs reference 20 (no whitespaces: +24, formatted: +30)

```js
function f() {}
(f.p = f).q = console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('PASS');
+function f() {}
+(f.p = f).q = console.log('PASS');

```

## `uglify/functions/functions`

- tags: `join vars`, `remove unused`
- size: oxc 251 vs reference 227 (no whitespaces: +24, formatted: +30)

```js
!function() {
	var a = function a() {
		return a && 'a';
	};
	var b = function x() {
		return !!x;
	};
	var c = function(c) {
		return c;
	};
	if (c(b(a()))) {
		var d = function() {};
		var e = function y() {
			return typeof y;
		};
		var f = function(f) {
			return f;
		};
		console.log(a(d()), b(e()), c(f(42)), typeof d, e(), typeof f);
	}
}();

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,17 @@
-!function() {
-	function a() {
+(function() {
+	var a = function a() {
 		return a && 'a';
-	}
-	function b() {
-		return !!b;
-	}
-	function c(c) {
+	}, b = function x() {
+		return !!x;
+	}, c = function(c) {
 		return c;
-	}
+	};
 	if (c(b(a()))) {
-		function d() {}
-		function e() {
-			return typeof e;
-		}
-		function f(f) {
+		var d = function() {}, e = function y() {
+			return typeof y;
+		}, f = function(f) {
 			return f;
-		}
-		console.log(a(d()), b(e()), c(f(42)), typeof d, e(), typeof f);
+		};
+		console.log(a(void 0), b(e()), c(f(42)), typeof d, e(), typeof f);
 	}
-}();
+})();

```

## `uglify/functions/inline_loop_1`

- tags: `join vars`, `remove unused`
- size: oxc 35 vs reference 11 (no whitespaces: +24, formatted: +30)

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

## `uglify/functions/inline_loop_2`

- tags: `join vars`, `remove unused`
- size: oxc 35 vs reference 11 (no whitespaces: +24, formatted: +30)

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

## `uglify/functions/issue_5376_1`

- tags: `join vars`, `remove unused`
- size: oxc 69 vs reference 45 (no whitespaces: +24, formatted: +28)

```js
'use strict';
var a;
for (; 42;) var b = function() {
	var c;
	throw new Error(c++);
}();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 'use strict';
-for (;;) {
-	42;
-	throw new Error(NaN);
-}
+var a;
+for (;;) var b = function() {
+	var c;
+	throw Error(c++);
+}();

```

## `uglify/functions/mixed_mode_inline_1`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 53 (no whitespaces: +24, formatted: +30)

```js
function f() {
	return this;
}
console.log(function() {
	return f();
}() ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
-console.log(function() {
+function f() {
 	return this;
+}
+console.log(function() {
+	return f();
 }() ? 'PASS' : 'FAIL');

```

## `uglify/functions/mixed_mode_inline_1_strict`

- tags: `join vars`, `remove unused`
- size: oxc 90 vs reference 66 (no whitespaces: +24, formatted: +30)

```js
'use strict';
function f() {
	return this;
}
console.log(function() {
	return f();
}() ? 'FAIL' : 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 'use strict';
-console.log(function() {
+function f() {
 	return this;
+}
+console.log(function() {
+	return f();
 }() ? 'FAIL' : 'PASS');

```

## `uglify/functions/mixed_mode_inline_2`

- tags: `join vars`, `remove unused`
- size: oxc 90 vs reference 66 (no whitespaces: +24, formatted: +30)

```js
function f() {
	'use strict';
	return this;
}
console.log(function() {
	return f();
}() ? 'FAIL' : 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-console.log(function() {
+function f() {
 	'use strict';
 	return this;
+}
+console.log(function() {
+	return f();
 }() ? 'FAIL' : 'PASS');

```

## `uglify/functions/mixed_mode_inline_2_strict`

- tags: `join vars`, `remove unused`
- size: oxc 90 vs reference 66 (no whitespaces: +24, formatted: +30)

```js
'use strict';
function f() {
	'use strict';
	return this;
}
console.log(function() {
	return f();
}() ? 'FAIL' : 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 'use strict';
-console.log(function() {
+function f() {
 	return this;
+}
+console.log(function() {
+	return f();
 }() ? 'FAIL' : 'PASS');

```

## `uglify/functions/mixed_mode_inline_3_strict`

- tags: `join vars`, `remove unused`
- size: oxc 90 vs reference 66 (no whitespaces: +24, formatted: +30)

```js
'use strict';
function f() {
	return this;
}
console.log(function() {
	'use strict';
	return f();
}() ? 'FAIL' : 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 'use strict';
-console.log(function() {
+function f() {
 	return this;
+}
+console.log(function() {
+	return f();
 }() ? 'FAIL' : 'PASS');

```

## `uglify/functions/mixed_mode_inline_4_strict`

- tags: `join vars`, `remove unused`
- size: oxc 90 vs reference 66 (no whitespaces: +24, formatted: +30)

```js
'use strict';
function f() {
	'use strict';
	return this;
}
console.log(function() {
	'use strict';
	return f();
}() ? 'FAIL' : 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 'use strict';
-console.log(function() {
+function f() {
 	return this;
+}
+console.log(function() {
+	return f();
 }() ? 'FAIL' : 'PASS');

```

## `uglify/functions/statement_var_inline`

- tags: `join vars`, `remove unused`
- size: oxc 106 vs reference 82 (no whitespaces: +24, formatted: +42)

```js
function f() {
	(function() {
		var a = {};
		function g() {
			a.p;
		}
		g(console.log('PASS'));
		var b = function h(c) {
			c && c.q;
		}();
	})();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,13 @@
 function f() {
-	var c, a = {};
-	function g() {
-		a.p;
-	}
-	g(console.log('PASS'));
-	c && c.q;
-	return;
+	(function() {
+		var a = {};
+		function g() {
+			a.p;
+		}
+		g(console.log('PASS'));
+		(function(c) {
+			c && c.q;
+		})();
+	})();
 }
 f();

```

## `uglify/hoist_vars/issue_4736`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 53 (no whitespaces: +24, formatted: +34)

```js
var a;
function f() {
	(function g() {
		var b = (a = 0, 1 << 30);
		var c = (a = 0, console.log(b));
		var d = c;
	})(f);
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
-(function() {
+var a;
+function f() {
 	(function() {
-		0;
-		console.log(1 << 30);
-	})();
-})();
+		var b = (a = 0, 1 << 30);
+		a = 0, console.log(b);
+	})(f);
+}
+f();

```

## `uglify/issue-281/negate_iife_issue_1073`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 67 vs reference 43 (no whitespaces: +24, formatted: +32)

```js
new (function(a) {
	return function Foo() {
		this.x = a;
		console.log(this);
	};
}(7))();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-new function() {
-	this.x = 7, console.log(this);
-}();
+new (function(a) {
+	return function() {
+		this.x = a, console.log(this);
+	};
+}(7))();

```

## `uglify/keep_fargs/issue_2298`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 142 vs reference 118 (no whitespaces: +24, formatted: +33)

```js
!function() {
	function f() {
		var a = undefined;
		var undefined = a++;
		try {
			!function g(b) {
				b[1] = 'foo';
			}();
			console.log('FAIL');
		} catch (e) {
			console.log('PASS');
		}
	}
	f();
}();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,14 @@
-!function() {
-	(function() {
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

## `uglify/keep_fargs/issue_3420_3`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 50 (no whitespaces: +24, formatted: +33)

```js
console.log(function() {
	function f(a, b, c, d) {
		return a + b;
	}
	return f;
}().length);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
-console.log(function(a, b, c, d) {
-	return a + b;
-}.length);
+console.log(function() {
+	function f(a, b, c, d) {
+		return a + b;
+	}
+	return f;
+}().length);

```

## `uglify/reduce_vars/issue_1670_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 60 vs reference 36 (no whitespaces: +24, formatted: +32)

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
@@ -1,3 +1,4 @@
 (function() {
-	console.log('PASS');
+	console.log(a === void 0 ? 'PASS' : 'FAIL');
+	var a;
 })();

```

## `uglify/reduce_vars/issue_2423_2`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 36 (no whitespaces: +24, formatted: +30)

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

## `uglify/return_undefined/return_void`

- tags: `join vars`, `remove unused`
- size: oxc 41 vs reference 17 (no whitespaces: +24, formatted: +33)

```js
function f() {
	function g() {
		h();
	}
	return g();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
 function f() {
-	h();
+	function g() {
+		h();
+	}
+	return g();
 }

```

## `uglify/spreads/do_inline_3`

- size: oxc 65 vs reference 41 (no whitespaces: +24, formatted: +32)

```js
(function() {
	(function() {
		while (console.log('PASS'));
	})(...'');
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-var [] = [...''];
-while (console.log('PASS'));
+(function() {
+	(function() {
+		for (; console.log('PASS'););
+	})(...'');
+})();

```

## `uglify/switches/issue_441_1`

- size: oxc 68 vs reference 44 (no whitespaces: +24, formatted: +36)

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
@@ -1,5 +1,9 @@
 switch (foo) {
 	case bar:
+		qux();
+		break;
 	case baz:
+		qux();
+		break;
 	default: qux();
 }

```

## `uglify/collapse_vars/sequence_in_iife_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 54 vs reference 29 (no whitespaces: +25, formatted: +36)

```js
var a = 'foo', b = 42;
(function() {
	var c = (b = a, b);
})();
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-var a = 'foo';
-console.log(a, a);
+var a = 'foo', b = 42;
+(function() {
+	b = a;
+})();
+console.log(a, b);

```

## `uglify/dead-code/issue_2860_1`

- tags: `join vars`
- size: oxc 40 vs reference 15 (no whitespaces: +25, formatted: +32)

```js
console.log(function(a) {
	return a ^= 1;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(1);
+console.log(function(a) {
+	return a ^= 1;
+}());

```

## `uglify/dead-code/issue_2860_2`

- tags: `join vars`, `2 iterations`
- size: oxc 40 vs reference 15 (no whitespaces: +25, formatted: +32)

```js
console.log(function(a) {
	return a ^= 1;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(1);
+console.log(function(a) {
+	return a ^= 1;
+}());

```

## `uglify/destructured/redefine_arguments_1_toplevel`

- tags: `remove unused`
- size: oxc 25 vs reference 0 (no whitespaces: +25, formatted: +27)

```js
function f([arguments]) {}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+function f([arguments]) {}

```

## `uglify/evaluate/unsafe_string_bad_index`

- size: oxc 50 vs reference 25 (no whitespaces: +25, formatted: +31)

```js
console.log('1234'.a + 1, '1234'['a'] + 1, '1234'[3.14] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(NaN, NaN, NaN);
+console.log('1234'.a + 1, '1234'.a + 1, '1234'[3.14] + 1);

```

## `uglify/functions/issue_3125`

- size: oxc 45 vs reference 20 (no whitespaces: +25, formatted: +31)

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

## `uglify/functions/issue_5841_1`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 129 vs reference 104 (no whitespaces: +25, formatted: +23)

```js
var a = 42;
(function() {
	f();
	var b = f();
	function f() {
		if (console && a) g && g();
	}
	function g() {
		var c;
		for (; console.log('foo'););
		(function h(d) {
			d && d.p;
		})();
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,13 @@
 var a = 42;
 (function() {
-	f();
-	f();
+	f(), f();
 	function f() {
-		{
-			if (console && a) {
-				for (; console.log('foo'););
-				return;
-			}
-			return;
-		}
+		console && a && g && g();
+	}
+	function g() {
+		for (; console.log('foo'););
+		(function(d) {
+			d && d.p;
+		})();
 	}
 })();

```

## `uglify/functions/preceding_side_effects`

- size: oxc 58 vs reference 33 (no whitespaces: +25, formatted: +32)

```js
console.log(function(a, b, c) {
	return b;
}(console, 'PASS', 42));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log((console, 42, 'PASS'));
+console.log(function(a, b, c) {
+	return b;
+}(console, 'PASS', 42));

```

## `uglify/reduce_vars/issue_2860_1`

- tags: `join vars`
- size: oxc 40 vs reference 15 (no whitespaces: +25, formatted: +32)

```js
console.log(function(a) {
	return a ^= 1;
	a ^= 2;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(1);
+console.log(function(a) {
+	return a ^= 1;
+}());

```

## `uglify/reduce_vars/issue_2860_2`

- tags: `join vars`, `2 iterations`
- size: oxc 40 vs reference 15 (no whitespaces: +25, formatted: +32)

```js
console.log(function(a) {
	return a ^= 1;
	a ^= 2;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(1);
+console.log(function(a) {
+	return a ^= 1;
+}());

```

## `uglify/awaits/issue_5634_2_side_effects`

- size: oxc 167 vs reference 141 (no whitespaces: +26, formatted: +41)

```js
var a = 'foo';
(async function() {
	await async function() {
		try {
			return { then(resolve) {
				console.log('bar');
				resolve();
				console.log('baz');
			} };
		} finally {
			a = 'moo';
		}
	}();
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,15 @@
 var a = 'foo';
 (async function() {
-	try {
-		return { then(resolve) {
-			console.log('bar');
-			resolve();
-			console.log('baz');
-		} };
-	} finally {
-		a = 'moo';
-	}
+	await async function() {
+		try {
+			return { then(resolve) {
+				console.log('bar');
+				resolve();
+				console.log('baz');
+			} };
+		} finally {
+			a = 'moo';
+		}
+	}();
 })();
 console.log(a);

```

## `uglify/evaluate/unsafe_charAt`

- size: oxc 72 vs reference 46 (no whitespaces: +26, formatted: +37)

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

## `uglify/functions/catch_no_argname`

- tags: `join vars`, `remove unused`
- size: oxc 121 vs reference 95 (no whitespaces: +26, formatted: +32)

```js
var a = 'PASS';
function f() {
	return a;
}
try {
	throw a;
} catch {
	function g() {
		return a;
	}
	console.log(a, f(), g());
}
console.log(a, f(), g());

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,13 @@
 var a = 'PASS';
+function f() {
+	return a;
+}
 try {
 	throw a;
 } catch {
 	function g() {
 		return a;
 	}
-	console.log(a, a, g());
+	console.log(a, f(), g());
 }
-console.log(a, a, g());
+console.log(a, f(), g());

```

## `uglify/functions/inline_2`

- size: oxc 97 vs reference 71 (no whitespaces: +26, formatted: +32)

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
@@ -1,6 +1,9 @@
-console.log(1);
-console.log(2);
+(function() {
+	console.log(1);
+})();
+(function(a) {
+	console.log(a);
+})(2);
 (function(b) {
-	var c = b;
-	console.log(c);
+	console.log(b);
 })(3);

```

## `uglify/functions/issue_3833_2`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 42 (no whitespaces: +26, formatted: +39)

```js
function f(a) {
	return function() {
		while (a);
		console.log('PASS');
	}();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-var a = void 0;
-while (a);
-console.log('PASS');
+function f(a) {
+	return function() {
+		for (; a;);
+		console.log('PASS');
+	}();
+}
+f();

```

## `uglify/functions/unsafe_call_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 109 vs reference 83 (no whitespaces: +26, formatted: +33)

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

## `uglify/hoist_props/new_this`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 72 vs reference 46 (no whitespaces: +26, formatted: +41)

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
@@ -1,3 +1,8 @@
-console.log(new function(a) {
-	this.b = a;
-}(1).b, 2);
+var o = {
+	a: 1,
+	b: 2,
+	f: function(a) {
+		this.b = a;
+	}
+};
+console.log(new o.f(o.a).b, o.b);

```

## `uglify/if_return/iife_if_return_simple`

- tags: `sequences`
- size: oxc 74 vs reference 48 (no whitespaces: +26, formatted: +31)

```js
(function() {
	if (console) return console.log('PASS');
	console.log('FAIL');
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console ? console.log('PASS') : console.log('FAIL');
+(function() {
+	if (console) return console.log('PASS');
+	console.log('FAIL');
+})();

```

## `uglify/numbers/evaluate_7_unsafe_math`

- tags: `join vars`
- size: oxc 177 vs reference 151 (no whitespaces: +26, formatted: +44)

```js
function f(num, y) {
	var x = '' + num;
	[
		+x + 2 + (3 + !y),
		+x + 2 + (3 - !y),
		+x + 2 - (3 + !y),
		+x + 2 - (3 - !y),
		+x - 2 + (3 + !y),
		+x - 2 + (3 - !y),
		+x - 2 - (3 + !y),
		+x - 2 - (3 - !y)
	].forEach(function(n) {
		console.log(typeof n, n);
	});
}
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
 function f(num, y) {
 	var x = '' + num;
 	[
-		+x + 5 + !y,
-		+x + 5 - !y,
-		+x + -1 - !y,
-		+x + -1 + !y,
-		x - -1 + !y,
-		x - -1 - !y,
-		x - 5 - !y,
-		x - 5 + !y
+		+x + 2 + (3 + !y),
+		+x + 2 + (3 - !y),
+		+x + 2 - (3 + !y),
+		+x + 2 - (3 - !y),
+		x - 2 + (3 + !y),
+		x - 2 + (3 - !y),
+		x - 2 - (3 + !y),
+		x - 2 - (3 - !y)
 	].forEach(function(n) {
 		console.log(typeof n, n);
 	});

```

## `uglify/reduce_vars/issue_2919`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 24 (no whitespaces: +26, formatted: +30)

```js
var arr = [function() {}];
console.log(typeof arr[0]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('function');
+var arr = [function() {}];
+console.log(typeof arr[0]);

```

## `uglify/reduce_vars/issue_3866`

- tags: `join vars`
- size: oxc 46 vs reference 20 (no whitespaces: +26, formatted: +34)

```js
console.log(function() {
	{
		return 'PASS';
		var a = 0;
	}
	return --a;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS');
+console.log(function() {
+	return 'PASS';
+	var a;
+}());

```

## `uglify/reduce_vars/perf_7`

- tags: `join vars`, `remove unused`
- size: oxc 162 vs reference 136 (no whitespaces: +26, formatted: +29)

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
@@ -1,7 +1,7 @@
-var sum = 0;
-for (var i = 0; i < 100; ++i) sum += function(x, y, z) {
+var indirect_foo = function(x, y, z) {
 	return function(x, y, z) {
 		return x < y ? x * y + z : x * z - y;
 	}(x, y, z);
-}(i, i + 1, 3 * i);
+}, sum = 0;
+for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `uglify/spreads/do_inline_2`

- size: oxc 57 vs reference 31 (no whitespaces: +26, formatted: +35)

```js
(function() {
	(function() {
		console.log('PASS');
	})(...'');
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-[] = [...''], console.log('PASS');
+(function() {
+	(function() {
+		console.log('PASS');
+	})(...'');
+})();

```

## `uglify/switches/drop_switch_2`

- tags: `sequences`
- size: oxc 36 vs reference 10 (no whitespaces: +26, formatted: +35)

```js
switch (foo) {
	default:
	case 'bar': baz();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-foo;
-baz();
+switch (foo) {
+	default:
+	case 'bar': baz();
+}

```

## `uglify/switches/issue_376`

- size: oxc 73 vs reference 47 (no whitespaces: +26, formatted: +35)

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
@@ -1,3 +1,6 @@
-switch (true) {
-	case boolCondition: console.log(1);
+switch (!0) {
+	case boolCondition:
+		console.log(1);
+		break;
+	case !1: console.log(2);
 }

```

## `uglify/yields/drop_body_2`

- tags: `2 iterations`
- size: oxc 79 vs reference 53 (no whitespaces: +26, formatted: +30)

```js
(function* ([, a = console.log('foo')]) {
	console.log('bar');
})([console.log('baz')]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-[[, [][0] = console.log('foo')]] = [[console.log('baz')]];
+(function* ([, a = console.log('foo')]) {
+	console.log('bar');
+})([console.log('baz')]);

```

## `uglify/awaits/inline_block_return`

- tags: `2 iterations`
- size: oxc 153 vs reference 126 (no whitespaces: +27, formatted: +34)

```js
console.log('foo');
(async function() {
	console.log('bar');
	return async function() {
		for (var a of ['baz']) return a;
	}();
})().then(console.log);
console.log('moo');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 console.log('foo');
 (async function() {
 	console.log('bar');
-	for (var a of ['baz']) return a;
+	return async function() {
+		for (var a of ['baz']) return a;
+	}();
 })().then(console.log);
 console.log('moo');

```

## `uglify/awaits/inline_block_return_async`

- tags: `2 iterations`
- size: oxc 185 vs reference 158 (no whitespaces: +27, formatted: +37)

```js
console.log('foo');
(async function() {
	console.log('bar');
	return async function() {
		for (var a of ['baz']) return { then(r) {
			console.log('moo');
			r(a);
		} };
	}();
})().then(console.log);
console.log('moz');

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
 console.log('foo');
 (async function() {
 	console.log('bar');
-	for (var a of ['baz']) return { then(r) {
-		console.log('moo');
-		r(a);
-	} };
+	return async function() {
+		for (var a of ['baz']) return { then(r) {
+			console.log('moo');
+			r(a);
+		} };
+	}();
 })().then(console.log);
 console.log('moz');

```

## `uglify/awaits/instanceof_lambda_1`

- size: oxc 46 vs reference 19 (no whitespaces: +27, formatted: +28)

```js
console.log(42 instanceof async function() {});

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(false);
+console.log(42 instanceof async function() {});

```

## `uglify/awaits/issue_5634_3_side_effects`

- size: oxc 168 vs reference 141 (no whitespaces: +27, formatted: +42)

```js
var a = 'foo';
(async function() {
	return async function() {
		try {
			return { then(resolve) {
				console.log('bar');
				resolve();
				console.log('baz');
			} };
		} finally {
			a = 'moo';
		}
	}();
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,15 @@
 var a = 'foo';
 (async function() {
-	try {
-		return { then(resolve) {
-			console.log('bar');
-			resolve();
-			console.log('baz');
-		} };
-	} finally {
-		a = 'moo';
-	}
+	return async function() {
+		try {
+			return { then(resolve) {
+				console.log('bar');
+				resolve();
+				console.log('baz');
+			} };
+		} finally {
+			a = 'moo';
+		}
+	}();
 })();
 console.log(a);

```

## `uglify/collapse_vars/recursive_function_replacement`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 76 vs reference 49 (no whitespaces: +27, formatted: +34)

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
@@ -1,3 +1,7 @@
-console.log(function n(o) {
-	return x(y(n(o)));
-}(c));
+function f(a) {
+	return x(g(a));
+}
+function g(a) {
+	return y(f(a));
+}
+console.log(f(c));

```

## `uglify/default-values/issue_5533_4_drop_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 119 vs reference 92 (no whitespaces: +27, formatted: +36)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(b = 42, [c] = []) {
				c;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) {
-			var [[] = []] = [];
-			throw 'PASS';
-		}
+		for (;;) (function() {
+			(function(b = 42, [c] = []) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/default-values/issue_5533_4_keep_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 119 vs reference 92 (no whitespaces: +27, formatted: +36)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(b = 42, [c] = []) {
				c;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) {
-			var [[] = []] = [];
-			throw 'PASS';
-		}
+		for (;;) (function() {
+			(function(b = 42, [c] = []) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/if_return/if_defns_return_2`

- tags: `sequences`
- size: oxc 95 vs reference 68 (no whitespaces: +27, formatted: +33)

```js
function f(a, b, c) {
	if (v()) return a();
	if (w()) return b();
	if (x()) {
		var d = c();
		return y(d);
	}
	return z();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,9 @@
 function f(a, b, c) {
-	var d;
-	return v() ? a() : w() ? b() : x() ? (d = c(), y(d)) : z();
+	if (v()) return a();
+	if (w()) return b();
+	if (x()) {
+		var d = c();
+		return y(d);
+	}
+	return z();
 }

```

## `uglify/issue-281/issue_1595_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 32 vs reference 5 (no whitespaces: +27, formatted: +34)

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

## `uglify/join_vars/issue_3856_2`

- tags: `join vars`, `sequences`, `2 iterations`
- size: oxc 104 vs reference 77 (no whitespaces: +27, formatted: +48)

```js
console.log(function() {
	(function() {
		var a;
		if (!a) {
			a = 0;
			for (var b; !console;);
			return 0;
		}
		if (a) return 1;
	})();
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,11 @@
 console.log(function() {
 	(function() {
-		var a, b;
-		if (!a) for (a = 0; !console;);
+		var a;
+		if (!a) {
+			a = 0;
+			for (var b; !console;);
+			return 0;
+		}
+		if (a) return 1;
 	})();
 }());

```

## `uglify/loops/issue_4355`

- tags: `remove unused`, `2 iterations`
- size: oxc 69 vs reference 42 (no whitespaces: +27, formatted: +35)

```js
while (function() {
	var a;
	for (a in console.log('PASS')) var b = 0;
}()) var c;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-(function() {
-	console.log('PASS');
-})();
-var c;
+for (; function() {
+	var a;
+	for (a in console.log('PASS')) var b = 0;
+}();) var c;

```

## `uglify/objects/numeric_literal`

- size: oxc 237 vs reference 210 (no whitespaces: +27, formatted: +33)

```js
var obj = {
	0: 0,
	'-0': 1,
	42: 2,
	'42': 3,
	37: 4,
	'0x25': 5,
	1e42: 6,
	'1E42': 7,
	'1e+42': 8
};
console.log(obj[-0], obj[-''], obj['-0']);
console.log(obj[42], obj['42']);
console.log(obj[37], obj['0x25'], obj[37], obj['37']);
console.log(obj[1e42], obj['1E42'], obj['1e+42']);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,15 @@
 var obj = {
 	0: 0,
 	'-0': 1,
+	42: 2,
 	42: 3,
 	37: 4,
-	o: 5,
-	1e42: 8,
-	b: 7
+	'0x25': 5,
+	1e42: 6,
+	'1E42': 7,
+	'1e+42': 8
 };
 console.log(obj[-0], obj[-''], obj['-0']);
-console.log(obj[42], obj['42']);
-console.log(obj[37], obj['o'], obj[37], obj['37']);
-console.log(obj[1e42], obj['b'], obj['1e+42']);
+console.log(obj[42], obj[42]);
+console.log(obj[37], obj['0x25'], obj[37], obj[37]);
+console.log(obj[1e42], obj['1E42'], obj['1e+42']);

```

## `uglify/properties/issue_2208_1`

- size: oxc 43 vs reference 16 (no whitespaces: +27, formatted: +35)

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

## `uglify/properties/issue_2208_3`

- size: oxc 73 vs reference 46 (no whitespaces: +27, formatted: +37)

```js
a = 42;
console.log({ p: function() {
	return function() {
		return this.a;
	}();
} }.p());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 a = 42;
-console.log(function() {
-	return this.a;
-}());
+console.log({ p: function() {
+	return function() {
+		return this.a;
+	}();
+} }.p());

```

## `uglify/reduce_vars/defun_inline_3`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 49 vs reference 22 (no whitespaces: +27, formatted: +35)

```js
function f() {
	return g(2);
	function g(b) {
		return b;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
 function f() {
-	return 2;
+	return g(2);
+	function g(b) {
+		return b;
+	}
 }

```

## `uglify/reduce_vars/issue_3042_2`

- tags: `join vars`, `remove unused`
- size: oxc 428 vs reference 401 (no whitespaces: +27, formatted: +28)

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

## `uglify/side_effects/drop_instanceof`

- size: oxc 47 vs reference 20 (no whitespaces: +27, formatted: +29)

```js
42 instanceof function() {};
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
+42 instanceof function() {};
 console.log('PASS');

```

## `uglify/spreads/issue_5602`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 92 vs reference 65 (no whitespaces: +27, formatted: +37)

```js
(function() {
	try {
		var b = function(c) {
			if (c) return FAIL;
			var d = 42;
		}(...[null, A = 0]);
	} catch (e) {
		b();
	}
})();
console.log(A);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 (function() {
 	try {
-		var b = void (A = 0);
-	} catch (e) {
+		var b = function(c) {
+			if (c) return FAIL;
+		}(null, A = 0);
+	} catch {
 		b();
 	}
 })(), console.log(A);

```

## `uglify/yields/inline_nested_block`

- size: oxc 141 vs reference 114 (no whitespaces: +27, formatted: +38)

```js
var a = function* () {
	yield* function* () {
		for (var a of ['foo', 'bar']) yield a;
		return 'FAIL';
	}();
}(), b;
do {
	b = a.next();
	console.log(b.value);
} while (!b.done);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var a = function* () {
-	for (var a of ['foo', 'bar']) yield a;
-	'FAIL';
+	yield* function* () {
+		for (var a of ['foo', 'bar']) yield a;
+		return 'FAIL';
+	}();
 }(), b;
 do {
 	b = a.next();

```

## `uglify/arrows/issue_5342_1`

- tags: `remove unused`
- size: oxc 98 vs reference 70 (no whitespaces: +28, formatted: +34)

```js
for (var a in 0) {
	(() => {
		while (1);
	})(new function(NaN) {
		a.p;
	}());
}
console.log(function() {
	return b;
	try {
		b;
	} catch (e) {
		var b;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-for (var a in 0) {
-	(function(NaN) {
-		a.p;
-	})();
-	while (1);
-}
-console.log(b);
-var b;
+for (var a in 0) (() => {
+	for (;;);
+})(new function(NaN) {
+	a.p;
+}());
+console.log(function() {
+	return b;
+	var b;
+}());

```

## `uglify/conditionals/issue_2560`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 146 vs reference 118 (no whitespaces: +28, formatted: +34)

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
@@ -1,11 +1,13 @@
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
 };
-bar();
-bar();
+bar(), bar();

```

## `uglify/destructured/issue_5087_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 85 vs reference 57 (no whitespaces: +28, formatted: +40)

```js
var a = 'PASS';
(function() {
	(function() {
		(function([b]) {
			b && console.log(b);
		})([a]);
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
 var a = 'PASS';
 (function() {
-	var b;
-	(b = a) && console.log(b);
+	(function() {
+		(function([b]) {
+			b && console.log(b);
+		})([a]);
+	})();
 })();

```

## `uglify/destructured/singleton_2`

- tags: `remove unused`, `pure getters`, `2 iterations`
- size: oxc 97 vs reference 69 (no whitespaces: +28, formatted: +34)

```js
var [a] = 'P', b, o = {};
[{1: o.p}] = ['FAIL'];
({foo: [o.q]} = { foo: 'S' });
[b = 'S'] = [];
console.log(a + o.p + o.q + b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var b, a = 'P', o = {};
-o.p = 'A';
-o.q = 'S';
+var [a] = 'P', b, o = {};
+[{1: o.p}] = ['FAIL'];
+({foo: [o.q]} = { foo: 'S' });
 [b = 'S'] = [];
 console.log(a + o.p + o.q + b);

```

## `uglify/drop-unused/self_assign`

- tags: `remove unused`, `2 iterations`
- size: oxc 98 vs reference 70 (no whitespaces: +28, formatted: +68)

```js
function d(a) {
	a = a;
}
function e(a, b) {
	a = b;
	b = a;
}
function f(a, b, c) {
	a = b;
	b = c;
	c = a;
}
function g(a, b, c) {
	a = a * b + c;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,15 @@
-function d(a) {}
-function e(a, b) {}
-function f(a, b, c) {}
-function g(a, b, c) {}
+function d(a) {
+	a = a;
+}
+function e(a, b) {
+	a = b;
+	b = a;
+}
+function f(a, b, c) {
+	a = b;
+	b = c;
+	c = a;
+}
+function g(a, b, c) {
+	a = a * b + c;
+}

```

## `uglify/functions/inline_conditional`

- size: oxc 129 vs reference 101 (no whitespaces: +28, formatted: +40)

```js
(function() {
	while (console.log('foo'));
})() ? (function() {
	while (console.log('bar'));
})() : (function() {
	while (console.log('baz'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-if (function() {
-	while (console.log('foo'));
-}()) while (console.log('bar'));
-else while (console.log('baz'));
+(function() {
+	for (; console.log('foo'););
+})() ? (function() {
+	for (; console.log('bar'););
+})() : (function() {
+	for (; console.log('baz'););
+})();

```

## `uglify/functions/issue_2601_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 122 vs reference 94 (no whitespaces: +28, formatted: +46)

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
@@ -1,7 +1,12 @@
 var a = 'FAIL';
 (function() {
-	var b;
-	b = 'foo', function(b) {
-		b && b();
-	}(), b && (a = 'PASS');
+	function f(b) {
+		function g(b) {
+			b && b();
+		}
+		g(), (function() {
+			b && (a = 'PASS');
+		})();
+	}
+	f('foo');
 })(), console.log(a);

```

## `uglify/functions/single_use_inline_collision`

- tags: `join vars`, `remove unused`
- size: oxc 147 vs reference 119 (no whitespaces: +28, formatted: +50)

```js
var a = 'PASS';
(function() {
	var f = function() {
		while (console.log(a));
	};
	(function() {
		(function() {
			f();
		})();
		(function(a) {
			a || a('FAIL');
		})(console.log);
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,14 @@
 var a = 'PASS';
 (function() {
-	void function() {
-		while (console.log(a));
-	}();
-	(function(a) {
-		a || a('FAIL');
-	})(console.log);
-	return;
+	var f = function() {
+		for (; console.log(a););
+	};
+	(function() {
+		(function() {
+			f();
+		})();
+		(function(a) {
+			a || a('FAIL');
+		})(console.log);
+	})();
 })();

```

## `uglify/loops/issue_3631_2`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 37 (no whitespaces: +28, formatted: +39)

```js
L: for (var a = 1; a--; console.log(b)) {
	for (;;) continue L;
	var b = 'FAIL';
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (var a = 1; a--; console.log(b)) var b;
+L: for (var a = 1; a--; console.log(b)) {
+	for (;;) continue L;
+	var b = 'FAIL';
+}

```

## `uglify/reduce_vars/issues_3267_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 95 vs reference 67 (no whitespaces: +28, formatted: +41)

```js
(function(x) {
	x();
})(function() {
	(function(i) {
		if (i) return console.log('PASS');
		throw 'FAIL';
	})(Object());
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-!function(x) {
-	if (Object()) return console.log('PASS');
-	throw 'FAIL';
-}();
+(function(x) {
+	x();
+})(function() {
+	(function(i) {
+		if (i) return console.log('PASS');
+		throw 'FAIL';
+	})({});
+});

```

## `uglify/sandbox/typeof_arguments_assigned`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 32 (no whitespaces: +28, formatted: +31)

```js
var arguments = void 0;
console.log((typeof arguments).length);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('undefined'.length);
+var arguments = void 0;
+console.log((typeof arguments).length);

```

## `uglify/templates/evaluate`

- size: oxc 53 vs reference 25 (no whitespaces: +28, formatted: +37)

```js
console.log(`foo ${function(a, b) {
	return a * b;
}(6, 7)}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(`foo ${42}`);
+console.log(`foo ${function(a, b) {
+	return a * b;
+}(6, 7)}`);

```

## `uglify/yields/inline_nested`

- tags: `sequences`
- size: oxc 119 vs reference 91 (no whitespaces: +28, formatted: +33)

```js
var a = function* () {
	yield* function* () {
		yield 'foo';
		return 'FAIL';
	}();
}(), b;
do {
	b = a.next();
	console.log(b.value);
} while (!b.done);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var a = function* () {
-	yield 'foo', 'FAIL';
+	yield* function* () {
+		return yield 'foo', 'FAIL';
+	}();
 }(), b;
-do {
+do
 	b = a.next(), console.log(b.value);
-} while (!b.done);
+while (!b.done);

```

## `uglify/annotations/inline_pure_call_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 84 vs reference 55 (no whitespaces: +29, formatted: +39)

```js
var f = function(a) {
	return function(b) {
		console.log(b);
	}(a);
};
var a = f('PASS');
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-var a = function() {
-	console.log('PASS');
-}();
+var f = function(a) {
+	return function(b) {
+		console.log(b);
+	}(a);
+}, a = f('PASS');
 console.log(a);

```

## `uglify/assignments/issue_3427`

- tags: `sequences`, `remove unused`
- size: oxc 29 vs reference 0 (no whitespaces: +29, formatted: +39)

```js
(function() {
	var a;
	a || (a = {});
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function() {
+	var a;
+	a ||= {};
+})();

```

## `uglify/booleans/issue_5694_1`

- tags: `sequences`
- size: oxc 79 vs reference 50 (no whitespaces: +29, formatted: +28)

```js
var Infinity;
// Node.js v0.12~6 (vm): 42
console.log((Infinity = 42) && Infinity);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 var Infinity;
+// Node.js v0.12~6 (vm): 42
 console.log((Infinity = 42) && Infinity);

```

## `uglify/classes/drop_instanceof`

- tags: `remove unused`
- size: oxc 68 vs reference 39 (no whitespaces: +29, formatted: +31)

```js
'use strict';
class A {}
console.log({} instanceof A, Math instanceof A);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 'use strict';
-console.log(!1, (Math, !1));
+class A {}
+console.log({} instanceof A, Math instanceof A);

```

## `uglify/classes/issue_4705_strict`

- tags: `join vars`, `remove unused`
- size: oxc 62 vs reference 33 (no whitespaces: +29, formatted: +43)

```js
'use strict';
var a = 'PASS';
class A {
	p = a = 'FAIL';
	[console.log(a)];
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
 'use strict';
-console.log('PASS');
+var a = 'PASS';
+class A {
+	p = a = 'FAIL';
+	[console.log(a)];
+}

```

## `uglify/drop-unused/issue_3427_1`

- tags: `sequences`, `remove unused`
- size: oxc 29 vs reference 0 (no whitespaces: +29, formatted: +39)

```js
(function() {
	var a;
	a = a || {};
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function() {
+	var a;
+	a ||= {};
+})();

```

## `uglify/functions/duplicate_arg_var_1`

- size: oxc 49 vs reference 20 (no whitespaces: +29, formatted: +36)

```js
console.log(function(b) {
	return b;
	var b;
}('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS');
+console.log(function(b) {
+	return b;
+	var b;
+}('PASS'));

```

## `uglify/functions/duplicate_arg_var_2`

- size: oxc 52 vs reference 23 (no whitespaces: +29, formatted: +36)

```js
console.log(function(b) {
	return b + 'SS';
	var b;
}('PA'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PA' + 'SS');
+console.log(function(b) {
+	return b + 'SS';
+	var b;
+}('PA'));

```

## `uglify/functions/inline_for_init`

- size: oxc 170 vs reference 141 (no whitespaces: +29, formatted: +37)

```js
for (function() {
	while (console.log('foo'));
}(); function() {
	while (console.log('bar'));
}(); function() {
	while (console.log('baz'));
}()) (function() {
	while (console.log('moo'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-while (console.log('foo'));
-for (; function() {
-	while (console.log('bar'));
+for (function() {
+	for (; console.log('foo'););
+}(); function() {
+	for (; console.log('bar'););
 }(); function() {
-	while (console.log('baz'));
-}()) {
-	while (console.log('moo'));
-}
+	for (; console.log('baz'););
+}()) (function() {
+	for (; console.log('moo'););
+})();

```

## `uglify/functions/inline_loop_3`

- tags: `join vars`, `remove unused`
- size: oxc 40 vs reference 11 (no whitespaces: +29, formatted: +37)

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

## `uglify/functions/issue_203`

- tags: `remove unused`
- size: oxc 122 vs reference 93 (no whitespaces: +29, formatted: +31)

```js
var m = {};
var fn = Function('require', 'module', 'exports', 'module.exports = 42;');
fn(null, m, m.exports);
console.log(m.exports);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var m = {};
-var fn = Function('n,o,t', 'o.exports=42');
+var fn = Function('require', 'module', 'exports', 'module.exports = 42;');
 fn(null, m, m.exports);
 console.log(m.exports);

```

## `uglify/functions/issue_3274`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 108 vs reference 79 (no whitespaces: +29, formatted: +43)

```js
(function() {
	var g = function(a) {
		var c = a.p, b = c;
		return b != c;
	};
	while (g(1)) console.log('FAIL');
	console.log('PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 (function() {
-	for (var c; (c = 1 .p) != c;) console.log('FAIL');
+	var g = function(a) {
+		var c = a.p;
+		return c != c;
+	};
+	for (; g(1);) console.log('FAIL');
 	console.log('PASS');
 })();

```

## `uglify/functions/issue_5328`

- size: oxc 72 vs reference 43 (no whitespaces: +29, formatted: +34)

```js
(function(arguments) {
	console.log(Object.keys(arguments).join());
})(this);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-void console.log(Object.keys(this).join());
+(function(arguments) {
+	console.log(Object.keys(arguments).join());
+})(this);

```

## `uglify/functions/issue_5376_2`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 47 (no whitespaces: +29, formatted: +35)

```js
'use strict';
var a;
for (; 42;) var b = function() {
	var c;
	c++;
	throw new Error('PASS');
}();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 'use strict';
-for (;;) {
-	0;
-	throw new Error('PASS');
-}
+var a;
+for (;;) var b = function() {
+	var c;
+	c++;
+	throw Error('PASS');
+}();

```

## `uglify/global_defs/issue_2167`

- tags: `sequences`, `2 iterations`
- size: oxc 38 vs reference 9 (no whitespaces: +29, formatted: +32)

```js
if (isDevMode()) {
	greetOverlord();
}
doWork();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-doWork();
+isDevMode() && greetOverlord(), doWork();

```

## `uglify/issue-281/negate_iife_4`

- tags: `sequences`
- size: oxc 98 vs reference 69 (no whitespaces: +29, formatted: +39)

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
-t ? console.log(true) : console.log(false), void console.log('something');
+(function() {
+	return t;
+})() ? console.log(!0) : console.log(!1), (function() {
+	console.log('something');
+})();

```

## `uglify/issue-281/negate_iife_5`

- tags: `sequences`
- size: oxc 82 vs reference 53 (no whitespaces: +29, formatted: +39)

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
-t ? foo(true) : bar(false), void console.log('something');
+(function() {
+	return t;
+})() ? foo(!0) : bar(!1), (function() {
+	console.log('something');
+})();

```

## `uglify/issue-281/negate_iife_5_off`

- tags: `sequences`
- size: oxc 82 vs reference 53 (no whitespaces: +29, formatted: +39)

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
-t ? foo(true) : bar(false), void console.log('something');
+(function() {
+	return t;
+})() ? foo(!0) : bar(!1), (function() {
+	console.log('something');
+})();

```

## `uglify/keep_fargs/issues_3267_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 95 vs reference 66 (no whitespaces: +29, formatted: +42)

```js
(function(x) {
	x();
})(function() {
	(function(i) {
		if (i) return console.log('PASS');
		throw 'FAIL';
	})(Object());
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-!function() {
-	if (Object()) return console.log('PASS');
-	throw 'FAIL';
-}();
+(function(x) {
+	x();
+})(function() {
+	(function(i) {
+		if (i) return console.log('PASS');
+		throw 'FAIL';
+	})({});
+});

```

## `uglify/loops/dead_code_condition`

- tags: `sequences`
- size: oxc 69 vs reference 40 (no whitespaces: +29, formatted: +38)

```js
for (var a = 0, b = 5; (a += 1, 3) - 3 && b > 0; b--) {
	var c = function() {
		b--;
	}(a++);
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-var a = 0, b = 5;
-var c;
-a += 1, 0, console.log(a);
+for (var a = 0, b = 5; a += 1, 0; b--) var c = function() {
+	b--;
+}(a++);
+console.log(a);

```

## `uglify/reduce_vars/issue_2836`

- tags: `join vars`, `remove unused`
- size: oxc 69 vs reference 40 (no whitespaces: +29, formatted: +37)

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
-console.log(function() {
+function f() {
+	return 'FAIL';
+}
+console.log(f());
+function f() {
 	return 'PASS';
-}());
+}

```

## `uglify/reduce_vars/issues_3267_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 95 vs reference 66 (no whitespaces: +29, formatted: +42)

```js
(function(x) {
	x();
})(function() {
	(function(i) {
		if (i) return console.log('PASS');
		throw 'FAIL';
	})(Object());
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-!function() {
-	if (Object()) return console.log('PASS');
-	throw 'FAIL';
-}();
+(function(x) {
+	x();
+})(function() {
+	(function(i) {
+		if (i) return console.log('PASS');
+		throw 'FAIL';
+	})({});
+});

```

## `uglify/sandbox/timers`

- tags: `join vars`, `remove unused`
- size: oxc 178 vs reference 149 (no whitespaces: +29, formatted: +35)

```js
var count = 0, interval = 1e3, duration = 3210;
var timer = setInterval(function() {
	if (!count++) setTimeout(function() {
		clearInterval(timer);
		console.log(count <= 4 ? 'PASS' : 'FAIL');
	}, duration);
}, interval);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
-var count = 0;
-var timer = setInterval(function() {
-	if (!count++) setTimeout(function() {
+var count = 0, interval = 1e3, duration = 3210, timer = setInterval(function() {
+	count++ || setTimeout(function() {
 		clearInterval(timer);
 		console.log(count <= 4 ? 'PASS' : 'FAIL');
-	}, 3210);
-}, 1e3);
+	}, duration);
+}, interval);

```

## `uglify/switches/drop_switch_5`

- tags: `sequences`
- size: oxc 51 vs reference 22 (no whitespaces: +29, formatted: +36)

```js
switch (A) {
	case B: x();
	default:
}
switch (C) {
	default: y();
	case D:
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,7 @@
-A === B && x();
-C !== D && y();
+switch (A) {
+	case B: x();
+}
+switch (C) {
+	default: y();
+	case D:
+}

```

## `uglify/classes/computed_key_side_effects`

- tags: `join vars`, `remove unused`
- size: oxc 58 vs reference 28 (no whitespaces: +30, formatted: +40)

```js
'use strict';
var a = 0;
class A {
	[(a++, 0)]() {}
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
 'use strict';
-console.log(1);
+var a = 0;
+class A {
+	[(a++, 0)]() {}
+}
+console.log(a);

```

## `uglify/classes/static_side_effects_strict`

- tags: `remove unused`
- size: oxc 82 vs reference 52 (no whitespaces: +30, formatted: +43)

```js
'use strict';
var a = 'FAIL 1';
class A {
	static p = a = 'PASS';
	q = a = 'FAIL 2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 'use strict';
 var a = 'FAIL 1';
-a = 'PASS';
+class A {
+	static p = a = 'PASS';
+	q = a = 'FAIL 2';
+}
 console.log(a);

```

## `uglify/conditionals/issue_5694`

- tags: `sequences`
- size: oxc 95 vs reference 65 (no whitespaces: +30, formatted: +29)

```js
FORCE_EXEC = 'async()=>{}';
var a = 'foo';
// Node.js v0.12~6 (vm): foo
console.log((NaN = a) ? NaN : 42);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 FORCE_EXEC = 'async()=>{}';
 var a = 'foo';
+// Node.js v0.12~6 (vm): foo
 console.log((NaN = a) ? NaN : 42);

```

## `uglify/default-values/inline_direct`

- tags: `remove unused`
- size: oxc 50 vs reference 20 (no whitespaces: +30, formatted: +37)

```js
console.log(function(a = 'FAIL') {
	return a;
}('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('PASS');
+console.log(function(a = 'FAIL') {
+	return a;
+}('PASS'));

```

## `uglify/functions/inline_for_object`

- size: oxc 138 vs reference 108 (no whitespaces: +30, formatted: +38)

```js
for (var a in function() {
	while (console.log('foo'));
}(), function() {
	while (console.log('bar'));
}()) (function() {
	while (console.log('baz'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-while (console.log('foo'));
 for (var a in function() {
-	while (console.log('bar'));
-}()) {
-	while (console.log('baz'));
-}
+	for (; console.log('foo'););
+}(), function() {
+	for (; console.log('bar'););
+}()) (function() {
+	for (; console.log('baz'););
+})();

```

## `uglify/functions/inline_with`

- size: oxc 131 vs reference 101 (no whitespaces: +30, formatted: +38)

```js
with(+function() {
	while (console.log('foo'));
}(), -function() {
	while (console.log('bar'));
}()) ~function() {
	while (console.log('baz'));
}();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-while (console.log('foo'));
-with(-function() {
-	while (console.log('bar'));
-}()) {
-	while (console.log('baz'));
-}
+with(+function() {
+	for (; console.log('foo'););
+}(), -function() {
+	for (; console.log('bar'););
+}()) ~function() {
+	for (; console.log('baz'););
+}();

```

## `uglify/functions/issue_2620_5`

- tags: `join vars`, `remove unused`
- size: oxc 129 vs reference 99 (no whitespaces: +30, formatted: +55)

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
@@ -1,8 +1,14 @@
 var c = 'FAIL';
-!function(a, NaN) {
-	switch (a) {
-		case a: break;
-		case c = 'PASS', NaN: break;
+(function() {
+	function f(a, NaN) {
+		function g() {
+			switch (a) {
+				case a: break;
+				case c = 'PASS', NaN:
+			}
+		}
+		g();
 	}
-}(NaN);
+	f(NaN);
+})();
 console.log(c);

```

## `uglify/functions/issue_3016_1`

- size: oxc 70 vs reference 40 (no whitespaces: +30, formatted: +37)

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
@@ -1,5 +1,8 @@
 var b = 1;
-do {
-	3[b];
-} while (0);
+do
+	(function(a) {
+		return a[b];
+		var a;
+	})(3);
+while (0);
 console.log(b);

```

## `uglify/if_return/nested_if_continue`

- tags: `join vars`, `sequences`
- size: oxc 162 vs reference 132 (no whitespaces: +30, formatted: +77)

```js
function f(n) {
	var i = 0;
	do {
		if ('number' == typeof n) {
			if (0 === n) {
				console.log('even', i);
				continue;
			}
			if (1 === n) {
				console.log('odd', i);
				continue;
			}
			i++;
		}
	} while (0 <= (n -= 2));
}
f(37);
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,17 @@
 function f(n) {
-	for (var i = 0; 'number' == typeof n && (0 === n ? console.log('even', i) : 1 === n ? console.log('odd', i) : i++), 0 <= (n -= 2););
+	var i = 0;
+	do
+		if (typeof n == 'number') {
+			if (n === 0) {
+				console.log('even', i);
+				continue;
+			}
+			if (n === 1) {
+				console.log('odd', i);
+				continue;
+			}
+			i++;
+		}
+	while (0 <= (n -= 2));
 }
-f(37);
-f(42);
+f(37), f(42);

```

## `uglify/issue-281/issue_1254_negate_iife_nested`

- size: oxc 63 vs reference 33 (no whitespaces: +30, formatted: +42)

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

## `uglify/loops/empty_for_in`

- tags: `remove unused`
- size: oxc 30 vs reference 0 (no whitespaces: +30, formatted: +45)

```js
for (var a in [
	1,
	2,
	3
]) {
	var b = a + 1;
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+for (var a in [
+	1,
+	2,
+	3
+]) var b = a + 1;

```

## `uglify/numbers/evaluate_1_unsafe_math`

- size: oxc 118 vs reference 88 (no whitespaces: +30, formatted: +52)

```js
console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, 1 | x | 2 | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), 1 + (2 + ~x + 3), -y + (2 + ~x + 3), 1 & (2 & x & 3), 1 + (2 + (x |= 0) + 3));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(x + 1 + 2, 2 * +x, +x + 3, 1 + x + 2 + 3, 3 | x, 6 + x--, x * y + 6, 1 + (2 + x + 3), 6 + ~x, 5 - y + ~x, 0 & x, 6 + (x |= 0));
+console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, x | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), 1 + (2 + ~x + 3), -y + (2 + ~x + 3), x & 0, 1 + (2 + (x |= 0) + 3));

```

## `uglify/side_effects/issue_4668`

- tags: `join vars`, `sequences`, `remove unused`, `keep function names`
- size: oxc 79 vs reference 49 (no whitespaces: +30, formatted: +45)

```js
function f(a) {
	var b, c;
	function g() {
		return a = 0 + a, !d || (a = 0);
	}
	c = g();
}
console.log(f());
var d = 0;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
-console.log(function f() {
-	(function g() {
-		0;
-	})();
-}());
+function f(a) {
+	function g() {
+		return a = 0 + a, !d || (a = 0);
+	}
+	g();
+}
+console.log(f());
+var d = 0;

```

## `uglify/yields/issue_5076_1`

- tags: `sequences`, `remove unused`
- size: oxc 64 vs reference 34 (no whitespaces: +30, formatted: +40)

```js
var a;
console.log('PASS');
var b = function* ({ p: {} }) {}({ p: {a} = 42 });

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 var a;
-console.log('PASS'), a = 42 .a;
+console.log('PASS');
+var b = function* ({ p: {} }) {}({ p: {a} = 42 });

```

## `uglify/awaits/issue_5001`

- size: oxc 72 vs reference 41 (no whitespaces: +31, formatted: +38)

```js
var a = 0;
(async function() {
	a++ | await 42;
})();
console.log(a ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var a = 0;
-a++;
+(async function() {
+	a++ | await 42;
+})();
 console.log(a ? 'PASS' : 'FAIL');

```

## `uglify/comparisons/issue_2857_7`

- tags: `join vars`
- size: oxc 99 vs reference 68 (no whitespaces: +31, formatted: +39)

```js
function f(a) {
	if ({}.b === undefined || {}.b === null) return a.b !== undefined && a.b !== null;
}
console.log(f({ b: [] }));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	if (null == {}.b) return null != a.b;
+	if ({}.b === void 0 || {}.b === null) return a.b !== void 0 && a.b !== null;
 }
 console.log(f({ b: [] }));

```

## `uglify/destructured/issue_5114_2`

- tags: `join vars`, `remove unused`
- size: oxc 61 vs reference 30 (no whitespaces: +31, formatted: +37)

```js
var a = 'PASS';
(function f([], a) {
	f.length;
})([]);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var a = 'PASS';
-0;
+(function f([], a) {
+	f.length;
+})([]);
 console.log(a);

```

## `uglify/hoist_props/undefined_key`

- tags: `join vars`, `remove unused`, `4 iterations`
- size: oxc 46 vs reference 15 (no whitespaces: +31, formatted: +43)

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

## `uglify/if_return/issue_3600_1`

- tags: `remove unused`
- size: oxc 98 vs reference 67 (no whitespaces: +31, formatted: +43)

```js
var c = 0;
(function() {
	if ([][c++]);
	else return;
	return void function() {
		var b = --b, a = c = 42;
		return c;
	}();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,10 @@
 var c = 0;
 (function() {
-	if ([][c++]) b = --b, c = 42;
-	var b;
+	if (![][c++]) return;
+	(function() {
+		var b = --b;
+		c = 42;
+		return c;
+	})();
 })();
 console.log(c);

```

## `uglify/if_return/issue_3600_2`

- tags: `remove unused`
- size: oxc 98 vs reference 67 (no whitespaces: +31, formatted: +43)

```js
var c = 0;
(function() {
	if ([][c++]);
	else return;
	return void function() {
		var b = --b, a = c = 42;
		return c;
	}();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,10 @@
 var c = 0;
 (function() {
-	if ([][c++]) b = --b, c = 42;
-	var b;
+	if (![][c++]) return;
+	(function() {
+		var b = --b;
+		c = 42;
+		return c;
+	})();
 })();
 console.log(c);

```

## `uglify/issue-281/wrap_iife_in_return_call`

- size: oxc 60 vs reference 29 (no whitespaces: +31, formatted: +44)

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

## `uglify/pure_getters/drop_arguments`

- size: oxc 113 vs reference 82 (no whitespaces: +31, formatted: +35)

```js
(function() {
	arguments.slice = function() {
		console.log('PASS');
	};
	arguments[42];
	arguments.length;
	arguments.slice();
})();

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,7 @@
 	arguments.slice = function() {
 		console.log('PASS');
 	};
+	arguments[42];
+	arguments.length;
 	arguments.slice();
 })();

```

## `uglify/templates/evaluate_templates`

- size: oxc 53 vs reference 22 (no whitespaces: +31, formatted: +40)

```js
console.log(`foo ${function(a, b) {
	return a * b;
}(6, 7)}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('foo 42');
+console.log(`foo ${function(a, b) {
+	return a * b;
+}(6, 7)}`);

```

## `uglify/awaits/inline_await_3_trim`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 97 vs reference 65 (no whitespaces: +32, formatted: +34)

```js
(async function() {
	async function f(a, b) {
		return await b(a);
	}
	return await f('PASS', console.log);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 (async function() {
-	return a = 'PASS', b = console.log, b(a);
-	var a, b;
+	async function f(a, b) {
+		return await b(a);
+	}
+	return await f('PASS', console.log);
 })();

```

## `uglify/classes/issue_5082_2_strict`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 89 vs reference 57 (no whitespaces: +32, formatted: +50)

```js
'use strict';
(function() {
	class A {
		p = console.log('PASS');
		q() {}
	}
	class B {
		static P = new A();
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
 'use strict';
-void new class {
-	p = console.log('PASS');
-	q() {}
-}();
+(function() {
+	class A {
+		p = console.log('PASS');
+		q() {}
+	}
+	class B {
+		static P = new A();
+	}
+})();

```

## `uglify/evaluate/call_args_drop_param`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 19 (no whitespaces: +32, formatted: +40)

```js
var a = 1;
console.log(a);
+function(a) {
	return a;
}(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-console.log(1);
-b, 1;
+var a = 1;
+console.log(a);
++function(a) {
+	return a;
+}(a, b);

```

## `uglify/evaluate/self_comparison_1`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 44 (no whitespaces: +32, formatted: +46)

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

## `uglify/evaluate/self_comparison_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 76 vs reference 44 (no whitespaces: +32, formatted: +46)

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

## `uglify/functions/issue_4006`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 104 vs reference 72 (no whitespaces: +32, formatted: +46)

```js
var a = 0;
(function() {
	(function(b, c) {
		for (var k in console.log(c), 0) return b += 0;
	})(0, --a);
	return a ? 0 : --a;
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 var a = 0;
-(function(c) {
-	for (var k in console.log(c), 0) return;
-})(--a), a || --a;
+(function() {
+	return (function(b, c) {
+		for (var k in console.log(c), 0) return b += 0;
+	})(0, --a), a ? 0 : --a;
+})();

```

## `uglify/functions/substitute_assignment`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 99 vs reference 67 (no whitespaces: +32, formatted: +42)

```js
function f(a, b, c) {
	a[b] = c;
}
var o = {};
f(o, 42, null);
f(o, 'foo', 'bar');
for (var k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
+function f(a, b, c) {
+	a[b] = c;
+}
 var o = {};
-o[42] = null;
-o.foo = 'bar';
+f(o, 42, null);
+f(o, 'foo', 'bar');
 for (var k in o) console.log(k, o[k]);

```

## `uglify/functions/unsafe_apply_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 176 vs reference 144 (no whitespaces: +32, formatted: +39)

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

## `uglify/issue-281/issue_1254_negate_iife_true`

- size: oxc 57 vs reference 25 (no whitespaces: +32, formatted: +44)

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

## `uglify/issue-281/wrap_iife`

- size: oxc 57 vs reference 25 (no whitespaces: +32, formatted: +44)

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

## `uglify/loops/empty_for_in_side_effects`

- tags: `remove unused`
- size: oxc 52 vs reference 20 (no whitespaces: +32, formatted: +42)

```js
for (var a in { foo: console.log('PASS') }) {
	var b = a + 'bar';
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+for (var a in { foo: console.log('PASS') }) var b = a + 'bar';

```

## `uglify/reduce_vars/perf_1`

- tags: `join vars`, `remove unused`
- size: oxc 168 vs reference 136 (no whitespaces: +32, formatted: +32)

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

## `uglify/reduce_vars/perf_5`

- tags: `join vars`, `remove unused`, `10 iterations`
- size: oxc 168 vs reference 136 (no whitespaces: +32, formatted: +35)

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

## `uglify/reduce_vars/unsafe_evaluate_equality_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 107 vs reference 75 (no whitespaces: +32, formatted: +65)

```js
function f2() {
	var a = {
		a: 1,
		b: 2
	};
	var b = a;
	var c = a;
	return b === c;
}
function f3() {
	var a = [
		1,
		2,
		3
	];
	var b = a;
	var c = a;
	return b === c;
}
console.log(f2(), f3());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,16 @@
 function f2() {
-	return true;
+	var a = {
+		a: 1,
+		b: 2
+	};
+	return a === a;
 }
 function f3() {
-	return true;
+	var a = [
+		1,
+		2,
+		3
+	];
+	return a === a;
 }
 console.log(f2(), f3());

```

## `uglify/regexp/regexp_properties`

- size: oxc 85 vs reference 53 (no whitespaces: +32, formatted: +32)

```js
console.log(/abc/g.source, /abc/g.global, /abc/g.ignoreCase, /abc/g.lastIndex, /abc/g.multiline);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('abc', true, false, /abc/g.lastIndex, false);
+console.log('abc', /abc/g.global, /abc/g.ignoreCase, /abc/g.lastIndex, /abc/g.multiline);

```

## `uglify/typeof/typeof_in_boolean_context`

- tags: `sequences`
- size: oxc 143 vs reference 111 (no whitespaces: +32, formatted: +39)

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
@@ -1,10 +1,9 @@
 function f1(x) {
-	return 'yes';
+	return typeof x ? 'yes' : 'no';
 }
 function f2() {
-	return g(), 'Yes';
+	return typeof g() ? 'Yes' : 'No';
 }
-foo();
-console.log(1);
-var a = !(console.log(2), 1);
-foo();
+foo(), console.log(1);
+var a = !typeof console.log(2);
+1 + foo();

```

## `uglify/arguments/issue_3273`

- size: oxc 89 vs reference 56 (no whitespaces: +33, formatted: +33)

```js
(function(a) {
	console.log(arguments[0], a);
	arguments[0]++;
	console.log(arguments[0], a);
})(0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function(a) {
-	console.log(a, a);
-	a++;
-	console.log(a, a);
+	console.log(arguments[0], a);
+	arguments[0]++;
+	console.log(arguments[0], a);
 })(0);

```

## `uglify/arguments/issue_3273_reduce_vars`

- tags: `join vars`
- size: oxc 89 vs reference 56 (no whitespaces: +33, formatted: +33)

```js
(function(a) {
	console.log(arguments[0], a);
	arguments[0]++;
	console.log(arguments[0], a);
})(0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function(a) {
-	console.log(a, a);
-	a++;
-	console.log(a, a);
+	console.log(arguments[0], a);
+	arguments[0]++;
+	console.log(arguments[0], a);
 })(0);

```

## `uglify/const/issue_4261_2`

- tags: `join vars`, `remove unused`
- size: oxc 98 vs reference 65 (no whitespaces: +33, formatted: +48)

```js
{
	const a = 42;
	(function() {
		function f() {
			console.log(a);
		}
		function g() {
			while (f());
		}
		(function() {
			while (g());
		})();
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
-{
-	const a = 42;
+(function() {
+	function f() {
+		console.log(42);
+	}
 	function g() {
-		while (void console.log(a));
+		for (; f(););
 	}
-	while (g());
-}
+	(function() {
+		for (; g(););
+	})();
+})();

```

## `uglify/drop-unused/issue_4235_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 53 vs reference 20 (no whitespaces: +33, formatted: +47)

```js
(function() {
	{
		const f = 0;
	}
	(function f() {
		var f = console.log(f);
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(void 0);
+(function() {
+	(function() {
+		var f = console.log(f);
+	})();
+})();

```

## `uglify/drop-unused/issue_5533_drop_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 109 vs reference 76 (no whitespaces: +33, formatted: +53)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(b) {
				b;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function(b) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/drop-unused/issue_5533_keep_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 109 vs reference 76 (no whitespaces: +33, formatted: +53)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(b) {
				b;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function(b) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/functions/issue_5283`

- tags: `sequences`, `remove unused`
- size: oxc 138 vs reference 105 (no whitespaces: +33, formatted: +41)

```js
var a = 'FAIL 1';
(function() {
	(a = 'PASS')[function() {
		if (console) return null;
		var b = function f(a) {
			console.log('FAIL 2');
			var c = a.p;
		}();
	}()];
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var a = 'FAIL 1';
 (function() {
-	a = 'PASS';
-	console || function(a) {
-		console.log('FAIL 2');
-		a.p;
-	}();
-})();
-console.log(a);
+	(a = 'PASS')[function() {
+		if (console) return null;
+		(function(a) {
+			console.log('FAIL 2'), a.p;
+		})();
+	}()];
+})(), console.log(a);

```

## `uglify/hoist_vars/issue_4839`

- tags: `join vars`, `remove unused`
- size: oxc 95 vs reference 62 (no whitespaces: +33, formatted: +43)

```js
var log = console.log, o = function(a, b) {
	return b && b;
}('foo');
for (var k in o) throw 'FAIL';
log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-var k, log = console.log;
-for (k in void 0) throw 'FAIL';
+var log = console.log, o = function(a, b) {
+	return b && b;
+}('foo');
+for (var k in o) throw 'FAIL';
 log('PASS');

```

## `uglify/reduce_vars/issue_2485_2`

- tags: `join vars`, `remove unused`
- size: oxc 258 vs reference 225 (no whitespaces: +33, formatted: +42)

```js
var foo = function(bar) {
	var n = function(a, b) {
		return a + b;
	};
	var sumAll = function(arg) {
		return arg.reduce(n, 0);
	};
	var runSumAll = function(arg) {
		return sumAll(arg);
	};
	bar.baz = function(arg) {
		var n = runSumAll(arg);
		return n.get = 1, n;
	};
	return bar;
};
var bar = foo({});
console.log(bar.baz([
	1,
	2,
	3
]));

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,17 @@
 var foo = function(bar) {
 	var n = function(a, b) {
 		return a + b;
-	};
-	var runSumAll = function(arg) {
+	}, sumAll = function(arg) {
 		return arg.reduce(n, 0);
+	}, runSumAll = function(arg) {
+		return sumAll(arg);
 	};
 	bar.baz = function(arg) {
 		var n = runSumAll(arg);
 		return n.get = 1, n;
 	};
 	return bar;
-};
-var bar = foo({});
+}, bar = foo({});
 console.log(bar.baz([
 	1,
 	2,

```

## `uglify/collapse_vars/cond_branch_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 204 vs reference 170 (no whitespaces: +34, formatted: +51)

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

## `uglify/dead-code/dead_code_constant_boolean_should_warn_more`

- tags: `sequences`
- size: oxc 146 vs reference 112 (no whitespaces: +34, formatted: +62)

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
@@ -1,9 +1,10 @@
-{
+for (; !(foo && bar || x + '0');) {
+	console.log('unreachable');
 	var foo;
 	function bar() {}
 }
-// nothing for the while
-// as for the for, it should keep:
-var x = 10, y;
-var moo;
+for (var x = 10, y; x && (y || x) && !typeof x; ++x) {
+	asdf(), foo();
+	var moo;
+}
 bar();

```

## `uglify/destructured/issue_4315`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 99 vs reference 65 (no whitespaces: +34, formatted: +41)

```js
function f() {
	console;
}
var a = function() {
	if ([0[f && f]] = []) return this;
}(), b;
do {
	console.log('PASS');
} while (0 && (b = 0), b && a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-[0[function() {
-	console;
-}]] = [];
-do {
+function f() {}
+var a = function() {
+	if ([0[f && f]] = []) return this;
+}(), b;
+do
 	console.log('PASS');
-} while (void 0);
+while (b && a);

```

## `uglify/destructured/issue_5288_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 77 vs reference 43 (no whitespaces: +34, formatted: +40)

```js
while (function([]) {}([function f() {
	if (console) return console.log('PASS');
	else {
		let a = 0;
	}
}()]));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-while (console && console.log('PASS'), void 0);
+for (; function([]) {}([function() {
+	if (console) return console.log('PASS');
+}()]););

```

## `uglify/drop-unused/defun_lambda_same_name`

- tags: `remove unused`
- size: oxc 85 vs reference 51 (no whitespaces: +34, formatted: +48)

```js
function f(n) {
	return n ? n * f(n - 1) : 1;
}
console.log(function f(n) {
	return n ? n * f(n - 1) : 1;
}(5));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
+function f(n) {
+	return n ? n * f(n - 1) : 1;
+}
 console.log(function f(n) {
 	return n ? n * f(n - 1) : 1;
 }(5));

```

## `uglify/drop-unused/drop_instanceof`

- tags: `remove unused`
- size: oxc 60 vs reference 26 (no whitespaces: +34, formatted: +36)

```js
function f() {}
console.log({} instanceof f, Math instanceof f);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(!1, (Math, !1));
+function f() {}
+console.log({} instanceof f, Math instanceof f);

```

## `uglify/functions/issue_2107`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 105 vs reference 71 (no whitespaces: +34, formatted: +47)

```js
var c = 0;
!function() {
	c++;
}(c++ + new function() {
	this.a = 0;
	var a = (c = c + 1) + (c = 1 + c);
	return c++ + a;
}());
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 var c = 0;
-c++, new function() {
-	this.a = 0, c = 1 + (c += 1), c++;
-}(), c++, console.log(c);
+(function() {
+	c++;
+})(c++ + new function() {
+	this.a = 0;
+	var a = (c += 1) + (c = 1 + c);
+	return c++ + a;
+}()), console.log(c);

```

## `uglify/functions/issue_2663_2`

- tags: `join vars`, `remove unused`
- size: oxc 101 vs reference 67 (no whitespaces: +34, formatted: +49)

```js
(function() {
	var i;
	function fn(j) {
		return function() {
			console.log(j);
		}();
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
-	for (var i in {
+	var i;
+	function fn(j) {
+		return function() {
+			console.log(j);
+		}();
+	}
+	for (i in {
 		a: 1,
 		b: 2,
 		c: 3
-	}) j = i, console.log(j);
-	var j;
+	}) fn(i);
 })();

```

## `uglify/functions/issue_485_crashing_1530`

- tags: `sequences`
- size: oxc 34 vs reference 0 (no whitespaces: +34, formatted: +42)

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

## `uglify/issue-1787/unary_prefix`

- tags: `join vars`, `remove unused`
- size: oxc 52 vs reference 18 (no whitespaces: +34, formatted: +38)

```js
console.log(function() {
	var x = -(2 / 3);
	return x;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(-2 / 3);
+console.log(function() {
+	return -.6666666666666666;
+}());

```

## `uglify/reduce_vars/issue_2423_5`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 70 vs reference 36 (no whitespaces: +34, formatted: +46)

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

## `uglify/reduce_vars/perf_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 170 vs reference 136 (no whitespaces: +34, formatted: +38)

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
@@ -1,7 +1,7 @@
-var sum = 0;
-for (var i = 0; i < 100; ++i) sum += function(x, y, z) {
-	return function(x, y, z) {
-		return x < y ? x * y + z : x * z - y;
-	}(x, y, z);
-}(i, i + 1, 3 * i);
+var foo = function(x, y, z) {
+	return x < y ? x * y + z : x * z - y;
+}, indirect_foo = function(x, y, z) {
+	return foo(x, y, z);
+}, sum = 0;
+for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `uglify/reduce_vars/unsafe_evaluate_defun`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 17 (no whitespaces: +34, formatted: +43)

```js
console.log(function() {
	function f() {}
	return ++f;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(NaN);
+console.log(function() {
+	function f() {}
+	return ++f;
+}());

```

## `uglify/reduce_vars/unsafe_evaluate_side_effect_free_1`

- tags: `join vars`, `remove unused`
- size: oxc 199 vs reference 165 (no whitespaces: +34, formatted: +48)

```js
console.log(function() {
	var o = { p: 1 };
	console.log(o.p);
	return o.p;
}());
console.log(function() {
	var o = { p: 2 };
	console.log(o.p);
	return o;
}());
console.log(function() {
	var o = { p: 3 };
	console.log([o][0].p);
	return o.p;
}());

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,15 @@
 console.log(function() {
-	console.log(1);
-	return 1;
+	var o = { p: 1 };
+	console.log(o.p);
+	return o.p;
 }());
 console.log(function() {
 	var o = { p: 2 };
-	console.log(2);
+	console.log(o.p);
 	return o;
 }());
 console.log(function() {
-	console.log(3);
-	return 3;
+	var o = { p: 3 };
+	console.log(o.p);
+	return o.p;
 }());

```

## `uglify/switches/drop_case_8`

- size: oxc 144 vs reference 110 (no whitespaces: +34, formatted: +46)

```js
function log(msg) {
	console.log(msg);
	return msg;
}
switch (log('foo')) {
	case 'bar':
		log('moo');
		break;
	case log('baz'):
		log('moo');
		break;
	default: log('moo');
}

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,10 @@
 }
 switch (log('foo')) {
 	case 'bar':
+		log('moo');
+		break;
 	case log('baz'):
+		log('moo');
+		break;
 	default: log('moo');
 }

```

## `uglify/yields/inline_nested_async`

- tags: `sequences`
- size: oxc 244 vs reference 210 (no whitespaces: +34, formatted: +43)

```js
console.log('foo');
var a = async function* () {
	console.log(await (yield* async function* () {
		yield { then: (r) => r('bar') };
		return 'baz';
	}()));
}();
console.log('moo');
a.next().then(function f(b) {
	console.log(b.value);
	b.done || a.next().then(f);
});
console.log('moz');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 console.log('foo');
 var a = async function* () {
-	console.log((yield { then: (r) => r('bar') }, await 'baz'));
+	console.log(await (yield* async function* () {
+		return yield { then: (r) => r('bar') }, 'baz';
+	}()));
 }();
 console.log('moo'), a.next().then(function f(b) {
 	console.log(b.value), b.done || a.next().then(f);

```

## `uglify/collapse_vars/collapse_vars_repeated`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 160 vs reference 125 (no whitespaces: +35, formatted: +54)

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
@@ -5,7 +5,9 @@
 	return x;
 }
 (function(x) {
-	console.log('GOOD!!');
-})(), (function(x) {
-	console.log('GOOD!!');
-})();
+	var a = 'GOOD' + x;
+	console.log(a + '!');
+})('!'), (function(x) {
+	var a = 'GOOD' + x;
+	'' + x, console.log(a + '!');
+})('!');

```

## `uglify/functions/issue_2630_4`

- tags: `join vars`, `remove unused`
- size: oxc 110 vs reference 75 (no whitespaces: +35, formatted: +52)

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
@@ -1,5 +1,10 @@
 var x = 3, a = 1, b = 2;
-!function() {
-	while (--x >= 0 && void (b += ++a));
-}();
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

## `uglify/functions/issue_3770`

- tags: `join vars`, `remove unused`
- size: oxc 86 vs reference 51 (no whitespaces: +35, formatted: +48)

```js
(function() {
	function f(a, a) {
		var b = function() {
			return a || 'PASS';
		}();
		console.log(b);
	}
	f('FAIL');
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 (function() {
-	b = a || 'PASS', console.log(b);
-	var a, b;
+	function f(a, a) {
+		console.log(function() {
+			return a || 'PASS';
+		}());
+	}
+	f('FAIL');
 })();

```

## `uglify/hoist_props/issue_2377_1`

- tags: `join vars`, `remove unused`
- size: oxc 117 vs reference 82 (no whitespaces: +35, formatted: +56)

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
@@ -1,4 +1,11 @@
-var obj_foo = 1, obj_cube = function(x) {
-	return x * x * x;
+var obj = {
+	foo: 1,
+	bar: 2,
+	square: function(x) {
+		return x * x;
+	},
+	cube: function(x) {
+		return x * x * x;
+	}
 };
-console.log(obj_foo, obj_cube(3));
+console.log(obj.foo, obj.cube(3));

```

## `uglify/properties/new_this`

- size: oxc 35 vs reference 0 (no whitespaces: +35, formatted: +47)

```js
new { f: function(a) {
	this.a = a;
} }.f(42);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+new { f: function(a) {
+	this.a = a;
+} }.f(42);

```

## `uglify/reduce_vars/defun_var_3`

- tags: `join vars`, `remove unused`
- size: oxc 70 vs reference 35 (no whitespaces: +35, formatted: +43)

```js
function a() {}
function b() {}
console.log(typeof a, typeof b);
var a = 42, b;

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('function', 'function');
+function a() {}
+function b() {}
+console.log(typeof a, typeof b);
+var a = 42, b;

```

## `uglify/switches/constant_switch_7`

- tags: `sequences`
- size: oxc 127 vs reference 92 (no whitespaces: +35, formatted: +26)

```js
OUT: {
	foo();
	switch (1) {
		case 1:
			x();
			if (foo) break OUT;
			for (var x = 0; x < 10; x++) {
				if (x > 5) break;
				// shouldn't ruin our optimization
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
@@ -1,11 +1,7 @@
-OUT: {
-	foo();
-	x();
-	if (foo) break OUT;
-	for (var x = 0; x < 10; x++) {
-		if (x > 5) break;
-		console.log(x);
-	}
-	y();
-	bar();
+OUT: if (foo(), 1) {
+	if (x(), foo) break OUT;
+	for (var x = 0; x < 10 && !(x > 5); x++)
+ // shouldn't ruin our optimization
+	console.log(x);
+	y(), bar();
 }

```

## `uglify/typeof/duplicate_lambda_arg_name`

- tags: `join vars`
- size: oxc 60 vs reference 25 (no whitespaces: +35, formatted: +40)

```js
console.log(function long_name(long_name) {
	return typeof long_name;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('undefined');
+console.log(function(long_name) {
+	return typeof long_name;
+}());

```

## `uglify/default-values/issue_5533_1_drop_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 112 vs reference 76 (no whitespaces: +36, formatted: +58)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(b = 42) {
				b;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function(b = 42) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/default-values/issue_5533_1_keep_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 112 vs reference 76 (no whitespaces: +36, formatted: +58)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(b = 42) {
				b;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function(b = 42) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/destructured/issue_5114_3`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 30 (no whitespaces: +36, formatted: +43)

```js
var a = 'PASS';
(function f(a, {}) {
	f.length;
})(null, 42);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var a = 'PASS';
-0;
+(function f(a, {}) {
+	f.length;
+})(null, 42);
 console.log(a);

```

## `uglify/drop-unused/issue_2516_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 188 vs reference 152 (no whitespaces: +36, formatted: +43)

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
@@ -1,10 +1,12 @@
 function foo() {
-	Baz = function(x) {
-		(function(x) {
-			var value = (4 - 1) * (x || never_called());
-			console.log(6 == value ? 'PASS' : value);
-		}).call(null, x);
-	};
+	function qux(x) {
+		bar.call(null, x);
+	}
+	function bar(x) {
+		var FOUR = 4, trouble = x || never_called(), value = (FOUR - 1) * trouble;
+		console.log(value == 6 ? 'PASS' : value);
+	}
+	Baz = qux;
 }
 var Baz;
 foo();

```

## `uglify/evaluate/issue_2207_1`

- size: oxc 163 vs reference 127 (no whitespaces: +36, formatted: +42)

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
 console.log(Math.cos(1.2345));
-console.log(1.2543732512566947);
-console.log('1.609398451447204');
+console.log(Math.cos(1.2345) - Math.sin(4.321));
+console.log((Math.PI ** (Math.E - Math.LN10)).toFixed(15));

```

## `uglify/functions/inline_3`

- size: oxc 97 vs reference 61 (no whitespaces: +36, formatted: +43)

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
@@ -1,4 +1,9 @@
-console.log(1);
-console.log(2);
-b = 3, c = b, console.log(c);
-var b, c;
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

## `uglify/functions/inline_true`

- size: oxc 97 vs reference 61 (no whitespaces: +36, formatted: +43)

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
@@ -1,4 +1,9 @@
-console.log(1);
-console.log(2);
-b = 3, c = b, console.log(c);
-var b, c;
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

## `uglify/properties/issue_2208_5`

- size: oxc 52 vs reference 16 (no whitespaces: +36, formatted: +50)

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

## `uglify/properties/mangle_properties_2`

- size: oxc 278 vs reference 242 (no whitespaces: +36, formatted: +36)

```js
var o = { prop1: 1 };
Object.defineProperty(o, 'prop2', { value: 2 });
Object.defineProperties(o, { prop3: { value: 3 } });
console.log('prop1', o.prop1, 'prop1' in o);
console.log('prop2', o.prop2, o.hasOwnProperty('prop2'));
console.log('prop3', o.prop3, Object.getOwnPropertyDescriptor(o, 'prop3').value);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var o = { o: 1 };
-Object.defineProperty(o, 'p', { value: 2 });
-Object.defineProperties(o, { r: { value: 3 } });
-console.log('prop1', o.o, 'o' in o);
-console.log('prop2', o.p, o.hasOwnProperty('p'));
-console.log('prop3', o.r, Object.getOwnPropertyDescriptor(o, 'r').value);
+var o = { prop1: 1 };
+Object.defineProperty(o, 'prop2', { value: 2 });
+Object.defineProperties(o, { prop3: { value: 3 } });
+console.log('prop1', o.prop1, 'prop1' in o);
+console.log('prop2', o.prop2, o.hasOwnProperty('prop2'));
+console.log('prop3', o.prop3, Object.getOwnPropertyDescriptor(o, 'prop3').value);

```

## `uglify/pure_getters/issue_3427`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 36 vs reference 0 (no whitespaces: +36, formatted: +47)

```js
var a;
(function(b) {
	b.p = 42;
})(a || (a = {}));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+var a;
+(function(b) {
+	b.p = 42;
+})(a ||= {});

```

## `uglify/reduce_vars/escaped_prop_1`

- tags: `join vars`, `remove unused`
- size: oxc 85 vs reference 49 (no whitespaces: +36, formatted: +46)

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

## `uglify/reduce_vars/escaped_prop_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 85 vs reference 49 (no whitespaces: +36, formatted: +46)

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

## `uglify/reduce_vars/passes`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 112 vs reference 76 (no whitespaces: +36, formatted: +65)

```js
(function() {
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
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 (function() {
-	console.log(4), console.log(6), console.log(4), console.log(7);
+	var a = 1, b = 2, c = 3;
+	a ? b = c : c = b, console.log(a + b), console.log(b + c), console.log(a + c), console.log(a + b + c);
 })();

```

## `uglify/rests/issue_5533_1_drop_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 112 vs reference 76 (no whitespaces: +36, formatted: +56)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(...b) {
				b;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function(...b) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/rests/issue_5533_1_keep_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 112 vs reference 76 (no whitespaces: +36, formatted: +56)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(...b) {
				b;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function(...b) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/switches/drop_switch_7`

- tags: `sequences`
- size: oxc 66 vs reference 30 (no whitespaces: +36, formatted: +46)

```js
switch (A) {
	case B: w();
	default: x();
}
switch (C) {
	default: y();
	case D: z();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-A === B && w();
-x();
-C !== D && y();
-z();
+switch (A) {
+	case B: w();
+	default: x();
+}
+switch (C) {
+	default: y();
+	case D: z();
+}

```

## `uglify/yields/issue_5707_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 56 vs reference 20 (no whitespaces: +36, formatted: +48)

```js
var a, b;
function* f(c = (b = 42, console.log('PASS'))) {}
b = f();

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('PASS');
+var a, b;
+function* f(c = (b = 42, console.log('PASS'))) {}
+b = f();

```

## `uglify/collapse_vars/inline_throw`

- tags: `join vars`, `remove unused`
- size: oxc 103 vs reference 66 (no whitespaces: +37, formatted: +54)

```js
try {
	(function() {
		return function(a) {
			return function(b) {
				throw b;
			}(a);
		};
	})()('PASS');
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,11 @@
 try {
-	(function(a) {
-		throw a;
-		return;
-	})('PASS');
+	(function() {
+		return function(a) {
+			return function(b) {
+				throw b;
+			}(a);
+		};
+	})()('PASS');
 } catch (e) {
 	console.log(e);
 }

```

## `uglify/conditionals/issue_5334_2`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 78 vs reference 41 (no whitespaces: +37, formatted: +53)

```js
function f() {
	if (console.log('PASS')) var o = true, o = { p: o += console.log('FAIL') };
}
f();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS') && console.log('FAIL');
+function f() {
+	if (console.log('PASS')) var o = !0, o = { p: o += console.log('FAIL') };
+}
+f();

```

## `uglify/conditionals/merge_tail_sequence_2`

- tags: `sequences`
- size: oxc 150 vs reference 113 (no whitespaces: +37, formatted: +38)

```js
function f(a) {
	var b = 'foo';
	if (a) {
		console.log('bar');
		console.log(b);
	} else {
		c = 'baz';
		while (console.log(c));
		console.log('bar'), console.log(b);
		var c;
	}
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,10 @@
 function f(a) {
 	var b = 'foo';
-	if (!a) {
-		c = 'baz';
-		while (console.log(c));
+	if (a) console.log('bar'), console.log(b);
+	else {
+		for (c = 'baz'; console.log(c););
+		console.log('bar'), console.log(b);
 		var c;
 	}
-	console.log('bar');
-	console.log(b);
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/dead-code/try_catch_finally`

- tags: `sequences`, `2 iterations`
- size: oxc 105 vs reference 68 (no whitespaces: +37, formatted: +58)

```js
var a = 1;
!function() {
	try {
		if (false) throw x;
	} catch (a) {
		var a = 2;
		console.log('FAIL');
	} finally {
		a = 3;
		console.log('PASS');
	}
}();
try {
	console.log(a);
} finally {}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
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
+		a = 3, console.log('PASS');
+	}
+})();
+try {
+	console.log(a);
+} finally {}

```

## `uglify/default-values/issue_5057_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 93 vs reference 56 (no whitespaces: +37, formatted: +54)

```js
var a = 42;
(function() {
	var b = function(c = (console.log('foo'), b = a)) {
		a && console.log('bar');
	}();
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
 var a = 42;
-console.log('foo'), void (a && console.log('bar'));
+(function() {
+	var b = function(c = (console.log('foo'), b = a)) {
+		a && console.log('bar');
+	}();
+})();

```

## `uglify/destructured/issue_5533_drop_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 113 vs reference 76 (no whitespaces: +37, formatted: +57)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f([b]) {
				b;
				throw 'PASS';
			})([]);
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function([b]) {
+				throw 'PASS';
+			})([]);
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/destructured/issue_5533_keep_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 113 vs reference 76 (no whitespaces: +37, formatted: +57)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f([b]) {
				b;
				throw 'PASS';
			})([]);
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function([b]) {
+				throw 'PASS';
+			})([]);
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/functions/duplicate_argnames_1`

- size: oxc 57 vs reference 20 (no whitespaces: +37, formatted: +46)

```js
console.log(function(a, a, a) {
	return a;
}('FAIL', 42, 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('PASS');
+console.log(function(a, a, a) {
+	return a;
+}('FAIL', 42, 'PASS'));

```

## `uglify/functions/substitute_add_farg_1`

- size: oxc 147 vs reference 110 (no whitespaces: +37, formatted: +54)

```js
function f(g) {
	console.log(g.length);
	g(null, 'FAIL');
}
f(function() {
	return function(a, b) {
		return function(c) {
			do {
				console.log('PASS');
			} while (c);
		}(a, b);
	};
}());

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,12 @@
 	console.log(g.length);
 	g(null, 'FAIL');
 }
-f(function(c, argument_1) {
-	do {
-		console.log('PASS');
-	} while (c);
-});
+f(function() {
+	return function(a, b) {
+		return function(c) {
+			do
+				console.log('PASS');
+			while (c);
+		}(a, b);
+	};
+}());

```

## `uglify/keep_fargs/collapse_vars_repeated`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 160 vs reference 123 (no whitespaces: +37, formatted: +56)

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
@@ -4,8 +4,10 @@
 function f2(x) {
 	return x;
 }
-(function() {
-	console.log('GOOD!!');
-})(), (function() {
-	console.log('GOOD!!');
-})();
+(function(x) {
+	var a = 'GOOD' + x;
+	console.log(a + '!');
+})('!'), (function(x) {
+	var a = 'GOOD' + x;
+	'' + x, console.log(a + '!');
+})('!');

```

## `uglify/numbers/evaluate_2_unsafe_math`

- tags: `join vars`
- size: oxc 195 vs reference 158 (no whitespaces: +37, formatted: +69)

```js
function f(num) {
	var x = '' + num, y = null;
	[
		x + 1 + 2,
		x * 1 * 2,
		+x + 1 + 2,
		1 + x + 2 + 3,
		1 | x | 2 | 3,
		1 + x-- + 2 + 3,
		1 + (x * y + 2) + 3,
		1 + (2 + x + 3),
		1 + (2 + ~x + 3),
		-y + (2 + ~x + 3),
		1 & (2 & x & 3),
		1 + (2 + (x |= 0) + 3)
	].forEach(function(n) {
		console.log(typeof n, n);
	});
}
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,18 @@
 function f(num) {
 	var x = '' + num, y = null;
 	[
-		x + '12',
-		2 * x,
-		+x + 3,
-		1 + x + '23',
-		3 | x,
-		6 + x--,
-		x * y + 6,
-		6 + x,
-		6 + ~x,
-		5 + ~x,
-		0 & x,
-		6 + (x |= 0)
+		x + 1 + 2,
+		x * 1 * 2,
+		+x + 1 + 2,
+		1 + x + 2 + 3,
+		x | 3,
+		1 + x-- + 2 + 3,
+		1 + (x * y + 2) + 3,
+		1 + (2 + x + 3),
+		1 + (2 + ~x + 3),
+		-y + (2 + ~x + 3),
+		x & 0,
+		1 + (2 + (x |= 0) + 3)
 	].forEach(function(n) {
 		console.log(typeof n, n);
 	});

```

## `uglify/reduce_vars/defun_var_1`

- tags: `join vars`, `remove unused`
- size: oxc 70 vs reference 33 (no whitespaces: +37, formatted: +45)

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

## `uglify/reduce_vars/defun_var_2`

- tags: `join vars`, `remove unused`
- size: oxc 70 vs reference 33 (no whitespaces: +37, formatted: +45)

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

## `uglify/awaits/inline_await_2_trim`

- tags: `join vars`, `remove unused`
- size: oxc 98 vs reference 60 (no whitespaces: +38, formatted: +47)

```js
(async function() {
	async function f(a) {
		await a.log;
	}
	return await f(console);
})();
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 (async function() {
-	await console.log;
+	async function f(a) {
+		await a.log;
+	}
+	return await f(console);
 })();
 console.log('PASS');

```

## `uglify/collapse_vars/collapse_vars_assignment`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 331 vs reference 293 (no whitespaces: +38, formatted: +61)

```js
function log(x) {
	return console.log(x), x;
}
function f0(c) {
	var a = 3 / c;
	return a = a;
}
function f1(c) {
	var a = 3 / c;
	var b = 1 - a;
	return b;
}
function f2(c) {
	var a = 3 / c;
	var b = a - 7;
	return log(c = b);
}
function f3(c) {
	var a = 3 / c;
	var b = a - 7;
	return log(c |= b);
}
function f4(c) {
	var a = 3 / c;
	var b = 2;
	return log(b += a);
}
function f5(c) {
	var b = 2;
	var a = 3 / c;
	return log(b += a);
}
function f6(c) {
	var b = g();
	var a = 3 / c;
	return log(b += a);
}

```

```diff
--- reference
+++ oxc
@@ -2,26 +2,29 @@
 	return console.log(x), x;
 }
 function f0(c) {
-	return 3 / c;
+	var a = 3 / c;
+	return a = a;
 }
 function f1(c) {
 	return 1 - 3 / c;
 }
 function f2(c) {
-	return log(c = 3 / c - 7);
+	var b = 3 / c - 7;
+	return log(c = b);
 }
 function f3(c) {
-	return log(c |= 3 / c - 7);
+	var b = 3 / c - 7;
+	return log(c |= b);
 }
 function f4(c) {
-	var b = 2;
-	return log(b += 3 / c);
+	var a = 3 / c, b = 2;
+	return log(b += a);
 }
 function f5(c) {
-	var b = 2;
-	return log(b += 3 / c);
+	var b = 2, a = 3 / c;
+	return log(b += a);
 }
 function f6(c) {
-	var b = g();
-	return log(b += 3 / c);
+	var b = g(), a = 3 / c;
+	return log(b += a);
 }

```

## `uglify/collapse_vars/collapse_vars_constants`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 290 vs reference 252 (no whitespaces: +38, formatted: +58)

```js
function f1(x) {
	var a = 4, b = x.prop, c = 5, d = sideeffect1(), e = sideeffect2();
	return b + (function() {
		return d - a * e - c;
	})();
}
function f2(x) {
	var a = 4, b = x.prop, c = 5, not_used = sideeffect1(), e = sideeffect2();
	return b + (function() {
		return -a * e - c;
	})();
}
function f3(x) {
	var a = 4, b = x.prop, c = 5, not_used = sideeffect1();
	return b + (function() {
		return -a - c;
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,20 @@
 function f1(x) {
-	var b = x.prop, d = sideeffect1(), e = sideeffect2();
+	var b = x.prop, c = 5, d = sideeffect1(), e = sideeffect2();
 	return b + (function() {
-		return d - 4 * e - 5;
+		return d - 4 * e - c;
 	})();
 }
 function f2(x) {
-	var b = x.prop, e = (sideeffect1(), sideeffect2());
+	var b = x.prop, c = 5;
+	sideeffect1();
+	var e = sideeffect2();
 	return b + (function() {
-		return -4 * e - 5;
+		return -4 * e - c;
 	})();
 }
 function f3(x) {
-	var b = x.prop;
-	sideeffect1();
-	return b + -9;
+	var b = x.prop, c = 5;
+	return sideeffect1(), b + (function() {
+		return -4 - c;
+	})();
 }

```

## `uglify/dead-code/trim_try`

- size: oxc 59 vs reference 21 (no whitespaces: +38, formatted: +54)

```js
try {
	var a;
} catch (e) {
	console.log('FAIL');
} finally {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,7 @@
-var a;
-console.log(a);
+try {
+	var a;
+} catch {
+	console.log('FAIL');
+} finally {
+	console.log(a);
+}

```

## `uglify/default-values/issue_4588_2_evaluate`

- size: oxc 53 vs reference 15 (no whitespaces: +38, formatted: +46)

```js
console.log(function(a, b = void 0, c, d = 'foo') {}.length);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(1);
+console.log(function(a, b = void 0, c, d = 'foo') {}.length);

```

## `uglify/default-values/issue_5448_3`

- tags: `join vars`, `remove unused`
- size: oxc 58 vs reference 20 (no whitespaces: +38, formatted: +46)

```js
var [a = typeof console] = [void console.log('PASS')];
var b = [...a];

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+var [a = typeof console] = [void console.log('PASS')], b = [...a];

```

## `uglify/evaluate/unsafe_integer_key`

- size: oxc 82 vs reference 44 (no whitespaces: +38, formatted: +58)

```js
console.log({ 0: 1 } + 1, { 0: 1 }[0] + 1, { 0: 1 }['0'] + 1, { 0: 1 }[1] + 1, { 0: 1 }[0][1] + 1, { 0: 1 }[0]['1'] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log({ 0: 1 } + 1, 2, 2, { 0: 1 }[1] + 1, NaN, NaN);
+console.log({ 0: 1 } + 1, { 0: 1 }[0] + 1, { 0: 1 }[0] + 1, { 0: 1 }[1] + 1, { 0: 1 }[0][1] + 1, { 0: 1 }[0][1] + 1);

```

## `uglify/functions/substitute_add_farg_2`

- size: oxc 147 vs reference 109 (no whitespaces: +38, formatted: +51)

```js
function f(g) {
	console.log(g.length);
	g(null, 'FAIL');
}
f(function() {
	return function(a, b) {
		return function(c) {
			do {
				console.log('PASS');
			} while (c);
		}(a, b);
	};
}());

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,12 @@
 	console.log(g.length);
 	g(null, 'FAIL');
 }
-f(function(a, b) {
-	var c = a;
-	do {
-		console.log('PASS');
-	} while (c);
-});
+f(function() {
+	return function(a, b) {
+		return function(c) {
+			do
+				console.log('PASS');
+			while (c);
+		}(a, b);
+	};
+}());

```

## `uglify/rests/issue_5533_2_drop_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 114 vs reference 76 (no whitespaces: +38, formatted: +58)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(...[b]) {
				b;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function(...[b]) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/rests/issue_5533_2_keep_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 114 vs reference 76 (no whitespaces: +38, formatted: +58)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(...[b]) {
				b;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function(...[b]) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/properties/issue_3188_2`

- tags: `join vars`, `remove unused`
- size: oxc 90 vs reference 51 (no whitespaces: +39, formatted: +62)

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
@@ -1,6 +1,12 @@
-({
-	p: 'PASS',
-	f: function() {
+(function() {
+	var f = function() {
 		console.log(this.p);
+	};
+	function g() {
+		({
+			p: 'PASS',
+			f
+		}).f();
 	}
-}).f();
+	g();
+})();

```

## `uglify/reduce_vars/issue_3922`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 38 (no whitespaces: +39, formatted: +51)

```js
(function(a) {
	var b;
	b && b[c];
	a |= this;
	console.log('PASS');
	var c = a.undefined;
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-(function() {
-	0;
+(function(a) {
+	var b;
+	b && b[c];
+	a |= this;
 	console.log('PASS');
+	var c = a.undefined;
 })();

```

## `uglify/rests/issue_5108`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 20 (no whitespaces: +39, formatted: +46)

```js
console.log(function([ ...[a]]) {
	return a;
}(['PASS', 'FAIL']));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('PASS');
+console.log(function([ ...[a]]) {
+	return a;
+}(['PASS', 'FAIL']));

```

## `uglify/assignments/issue_4924_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 60 vs reference 20 (no whitespaces: +40, formatted: +52)

```js
var a, b;
console.log('PASS');
a = function() {};
b = function() {}(b ||= a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('PASS');
+var a, b;
+console.log('PASS'), a = function() {}, b = (b ||= a, void 0);

```

## `uglify/awaits/issue_5305_3`

- size: oxc 107 vs reference 67 (no whitespaces: +40, formatted: +57)

```js
var a = 'PASS';
(async function() {
	try {
		await function() {
			while (!console);
		}();
	} catch (e) {
		a = 'FAIL';
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 var a = 'PASS';
-try {
-	while (!console);
-} catch (e) {
-	a = 'FAIL';
-}
+(async function() {
+	try {
+		await function() {
+			for (; !console;);
+		}();
+	} catch {
+		a = 'FAIL';
+	}
+})();
 console.log(a);

```

## `uglify/default-values/unused_var_2`

- tags: `remove unused`
- size: oxc 60 vs reference 20 (no whitespaces: +40, formatted: +53)

```js
var { p: [a] = '' + console.log('FAIL') } = { p: [console.log('PASS')] };

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+var { p: [a] = '' + console.log('FAIL') } = { p: [console.log('PASS')] };

```

## `uglify/drop-unused/double_assign_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 250 vs reference 210 (no whitespaces: +40, formatted: +61)

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

## `uglify/drop-unused/drop_toplevel_all_retain`

- tags: `remove unused`
- size: oxc 100 vs reference 60 (no whitespaces: +40, formatted: +54)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
-var a;
+var a, b = 1, c = g;
 function f(d) {
 	return function() {
-		2;
+		c = 2;
 	};
 }
 a = 2;
-console.log(3);
+function g() {}
+function h() {}
+console.log(b = 3);

```

## `uglify/drop-unused/drop_toplevel_retain`

- tags: `remove unused`
- size: oxc 100 vs reference 60 (no whitespaces: +40, formatted: +54)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
-var a;
+var a, b = 1, c = g;
 function f(d) {
 	return function() {
-		2;
+		c = 2;
 	};
 }
 a = 2;
-console.log(3);
+function g() {}
+function h() {}
+console.log(b = 3);

```

## `uglify/drop-unused/drop_toplevel_retain_array`

- tags: `remove unused`
- size: oxc 100 vs reference 60 (no whitespaces: +40, formatted: +54)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
-var a;
+var a, b = 1, c = g;
 function f(d) {
 	return function() {
-		2;
+		c = 2;
 	};
 }
 a = 2;
-console.log(3);
+function g() {}
+function h() {}
+console.log(b = 3);

```

## `uglify/drop-unused/drop_toplevel_retain_regex`

- tags: `remove unused`
- size: oxc 100 vs reference 60 (no whitespaces: +40, formatted: +54)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
-var a;
+var a, b = 1, c = g;
 function f(d) {
 	return function() {
-		2;
+		c = 2;
 	};
 }
 a = 2;
-console.log(3);
+function g() {}
+function h() {}
+console.log(b = 3);

```

## `uglify/functions/inline_if_else`

- size: oxc 170 vs reference 130 (no whitespaces: +40, formatted: +50)

```js
if (function() {
	while (console.log('foo'));
}(), function() {
	while (console.log('bar'));
}()) (function() {
	while (console.log('baz'));
})();
else (function() {
	while (console.log('moo'));
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-while (console.log('foo'));
-if (function() {
-	while (console.log('bar'));
-}()) {
-	while (console.log('baz'));
-} else {
-	while (console.log('moo'));
-}
+(function() {
+	for (; console.log('foo'););
+})(), function() {
+	for (; console.log('bar'););
+}() ? (function() {
+	for (; console.log('baz'););
+})() : (function() {
+	for (; console.log('moo'););
+})();

```

## `uglify/functions/issue_3297_1`

- tags: `join vars`, `remove unused`
- size: oxc 126 vs reference 86 (no whitespaces: +40, formatted: +44)

```js
function function1() {
	var r = { function2 };
	function function2() {
		alert(1234);
		function function3() {
			function2();
		}
		;
		function3();
	}
	return r;
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
 function function1() {
-	return { function2: function n() {
+	var r = { function2 };
+	function function2() {
 		alert(1234);
-		function t() {
-			n();
+		function function3() {
+			function2();
 		}
-		t();
-	} };
+		function3();
+	}
+	return r;
 }

```

## `uglify/reduce_vars/issue_5716_4`

- tags: `join vars`, `remove unused`
- size: oxc 91 vs reference 51 (no whitespaces: +40, formatted: +58)

```js
var a;
function f() {
	var b = [c, c], c = function() {
		return (b = true | b) + (a = b *= 42);
	}();
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,8 @@
-void (c = c = ((c = [c, c]) | true) * 42);
-var c;
-console.log(c);
+var a;
+function f() {
+	var b = [c, c], c = function() {
+		return (b = !0 | b) + (a = b *= 42);
+	}();
+}
+f();
+console.log(a);

```

## `uglify/reduce_vars/obj_arg_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 86 vs reference 46 (no whitespaces: +40, formatted: +51)

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
@@ -1,3 +1,7 @@
-console.log({ bar: function() {
-	return 2;
-} }.bar());
+var C = 1;
+function f(obj) {
+	return obj.bar();
+}
+console.log(f({ bar: function() {
+	return C + C;
+} }));

```

## `uglify/switches/drop_switch_6`

- tags: `sequences`
- size: oxc 58 vs reference 18 (no whitespaces: +40, formatted: +53)

```js
switch (A) {
	case B:
	default: x();
}
switch (C) {
	default:
	case D: y();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
-A;
-B;
-x();
-C !== D;
-y();
+switch (A) {
+	case B:
+	default: x();
+}
+switch (C) {
+	default:
+	case D: y();
+}

```

## `uglify/booleans/de_morgan_1f`

- tags: `join vars`
- size: oxc 137 vs reference 96 (no whitespaces: +41, formatted: +59)

```js
function f(a, b) {
	return a.p + b.q;
}
console.log(f({ p: null }, { q: false }) || f({ p: null }, { q: false }));
console.log(f({ p: 'foo' }, { q: 42 }) && f({ p: 'foo' }, { q: 42 }));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b) {
 	return a.p + b.q;
 }
-console.log(f({ p: null }, { q: !1 }));
-console.log(f({ p: 'foo' }, { q: 42 }));
+console.log(f({ p: null }, { q: !1 }) || f({ p: null }, { q: !1 }));
+console.log(f({ p: 'foo' }, { q: 42 }) && f({ p: 'foo' }, { q: 42 }));

```

## `uglify/collapse_vars/issue_2364_5`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 83 vs reference 42 (no whitespaces: +41, formatted: +54)

```js
function f0(o, a, h) {
	var b = 3 - a;
	var obj = o;
	var seven = 7;
	var prop = 'run';
	var t = obj[prop](b)[seven] = h;
	return t;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f0(o, a, h) {
-	return o.run(3 - a)[7] = h;
+	var b = 3 - a, obj = o, seven = 7, prop = 'run';
+	return obj[prop](b)[seven] = h;
 }

```

## `uglify/functions/issue_2604_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 104 vs reference 63 (no whitespaces: +41, formatted: +63)

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

## `uglify/functions/issue_2657`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 110 vs reference 69 (no whitespaces: +41, formatted: +53)

```js
'use strict';
console.log(function f() {
	return h;
	function g(b) {
		return b || b();
	}
	function h(a) {
		g(a);
		return a;
	}
}()(42));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
 'use strict';
-console.log(function(a) {
-	return b = a, b || b(), a;
-	var b;
-}(42));
+console.log(function() {
+	return h;
+	function g(b) {
+		return b || b();
+	}
+	function h(a) {
+		return g(a), a;
+	}
+}()(42));

```

## `uglify/functions/issue_3679_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 90 vs reference 49 (no whitespaces: +41, formatted: +57)

```js
(function() {
	'use strict';
	var f = function() {};
	f.g = function() {
		console.log('PASS');
	};
	f.g();
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 (function() {
 	'use strict';
-	console.log('PASS');
+	var f = function() {};
+	f.g = function() {
+		console.log('PASS');
+	};
+	f.g();
 })();

```

## `uglify/functions/issue_5841_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 129 vs reference 88 (no whitespaces: +41, formatted: +66)

```js
var a = 42;
(function() {
	f();
	var b = f();
	function f() {
		if (console && a) g && g();
	}
	function g() {
		var c;
		for (; console.log('foo'););
		(function h(d) {
			d && d.p;
		})();
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,13 @@
 var a = 42;
 (function() {
-	f();
-	f();
+	f(), f();
 	function f() {
-		if (console && a) for (; console.log('foo'););
+		console && a && g && g();
+	}
+	function g() {
+		for (; console.log('foo'););
+		(function(d) {
+			d && d.p;
+		})();
 	}
 })();

```

## `uglify/reduce_vars/func_inline`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 39 (no whitespaces: +41, formatted: +59)

```js
function f() {
	var g = function() {
		return 1;
	};
	console.log(g() + h());
	var h = function() {
		return 2;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,8 @@
 function f() {
-	console.log(1 + (void 0)());
+	console.log(function() {
+		return 1;
+	}() + h());
+	var h = function() {
+		return 2;
+	};
 }

```

## `uglify/reduce_vars/issue_2423_4`

- tags: `join vars`, `remove unused`
- size: oxc 56 vs reference 15 (no whitespaces: +41, formatted: +53)

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

## `uglify/collapse_vars/issue_2436_6`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 65 vs reference 23 (no whitespaces: +42, formatted: +61)

```js
var o = {
	a: 1,
	b: 2
};
console.log(function(c) {
	return {
		x: c.a,
		y: c.b
	};
}(o));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-console.log({
-	x: 1,
-	y: 2
-});
+var o = {
+	a: 1,
+	b: 2
+};
+console.log(function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+}(o));

```

## `uglify/collapse_vars/issue_2436_7`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 65 vs reference 23 (no whitespaces: +42, formatted: +61)

```js
var o = {
	a: 1,
	b: 2
};
console.log(function(c) {
	return {
		x: c.a,
		y: c.b
	};
}(o));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-console.log({
-	x: 1,
-	y: 2
-});
+var o = {
+	a: 1,
+	b: 2
+};
+console.log(function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+}(o));

```

## `uglify/default-values/issue_4854`

- tags: `join vars`, `remove unused`
- size: oxc 62 vs reference 20 (no whitespaces: +42, formatted: +60)

```js
console.log(function(a) {
	(function(b = a = 'foo') {
		[] = 'foo';
	})();
	a;
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(void 0);
+console.log(function(a) {
+	(function(b = a = 'foo') {
+		[] = 'foo';
+	})();
+}());

```

## `uglify/default-values/issue_5448_4`

- tags: `join vars`, `remove unused`
- size: oxc 62 vs reference 20 (no whitespaces: +42, formatted: +56)

```js
var { p: a = typeof console } = { p: void console.log('PASS') };
var b = [...a];

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+var { p: a = typeof console } = { p: void console.log('PASS') }, b = [...a];

```

## `uglify/functions/issue_2101`

- size: oxc 92 vs reference 50 (no whitespaces: +42, formatted: +54)

```js
a = {};
console.log(function() {
	return function() {
		return this.a;
	}();
}() === function() {
	return a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 a = {};
 console.log(function() {
-	return this.a;
-}() === a);
+	return function() {
+		return this.a;
+	}();
+}() === function() {
+	return a;
+}());

```

## `uglify/reduce_vars/issue_5716_1`

- tags: `join vars`, `remove unused`
- size: oxc 83 vs reference 41 (no whitespaces: +42, formatted: +58)

```js
var a;
function f() {
	var b = [c, c], c = function() {
		return b++ + (a = b);
	}();
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,8 @@
-c = [c, c], void (c = ++c);
-var c;
-console.log(c);
+var a;
+function f() {
+	var b = [c, c], c = function() {
+		return b++ + (a = b);
+	}();
+}
+f();
+console.log(a);

```

## `uglify/rests/issue_5165_2`

- tags: `join vars`, `sequences`
- size: oxc 62 vs reference 20 (no whitespaces: +42, formatted: +56)

```js
console.log(function(...a) {
	switch (a) {
		case a: return 'PASS';
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log('PASS');
+console.log(function(...a) {
+	switch (a) {
+		case a: return 'PASS';
+	}
+}());

```

## `uglify/side_effects/unsafe_builtin_1`

- size: oxc 50 vs reference 8 (no whitespaces: +42, formatted: +48)

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

## `uglify/default-values/issue_5533_3_drop_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 119 vs reference 76 (no whitespaces: +43, formatted: +68)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(b = 42, c = null) {
				c;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function(b = 42, c = null) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/default-values/issue_5533_3_keep_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 119 vs reference 76 (no whitespaces: +43, formatted: +68)

```js
'use strict';
try {
	(function() {
		var a;
		for (; 1;) a = function() {
			(function f(b = 42, c = null) {
				c;
				throw 'PASS';
			})();
		}();
	})();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 'use strict';
 try {
 	(function() {
-		for (;;) throw 'PASS';
+		for (;;) (function() {
+			(function(b = 42, c = null) {
+				throw 'PASS';
+			})();
+		})();
 	})();
 } catch (e) {
 	console.log(e);

```

## `uglify/functions/issue_2485_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 258 vs reference 215 (no whitespaces: +43, formatted: +56)

```js
var foo = function(bar) {
	var n = function(a, b) {
		return a + b;
	};
	var sumAll = function(arg) {
		return arg.reduce(n, 0);
	};
	var runSumAll = function(arg) {
		return sumAll(arg);
	};
	bar.baz = function(arg) {
		var n = runSumAll(arg);
		return n.get = 1, n;
	};
	return bar;
};
var bar = foo({});
console.log(bar.baz([
	1,
	2,
	3
]));

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,17 @@
 var foo = function(bar) {
-	function n(a, b) {
+	var n = function(a, b) {
 		return a + b;
-	}
-	function runSumAll(arg) {
+	}, sumAll = function(arg) {
 		return arg.reduce(n, 0);
-	}
+	}, runSumAll = function(arg) {
+		return sumAll(arg);
+	};
 	bar.baz = function(arg) {
 		var n = runSumAll(arg);
 		return n.get = 1, n;
 	};
 	return bar;
-};
-var bar = foo({});
+}, bar = foo({});
 console.log(bar.baz([
 	1,
 	2,

```

## `uglify/functions/issue_2630_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 90 vs reference 47 (no whitespaces: +43, formatted: +65)

```js
var c = 0;
!function() {
	while (f()) {}
	function f() {
		var not_used = function() {
			c = 1 + c;
		}(c = c + 1);
	}
}();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
 var c = 0;
-while (void (c = 1 + (c += 1)));
-console.log(c);
+(function() {
+	for (; f(););
+	function f() {
+		(function() {
+			c = 1 + c;
+		})(c += 1);
+	}
+})(), console.log(c);

```

## `uglify/functions/issue_3366`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 62 (no whitespaces: +43, formatted: +63)

```js
function f() {
	function g() {
		return function() {};
	}
	var a = g();
	(function() {
		this && a && console.log('PASS');
	})();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-void function() {
-	this && a && console.log('PASS');
-}();
-function a() {}
+function f() {
+	function g() {
+		return function() {};
+	}
+	var a = g();
+	(function() {
+		this && a && console.log('PASS');
+	})();
+}
+f();

```

## `uglify/issue-1275/string_plus_optimization`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 272 vs reference 229 (no whitespaces: +43, formatted: +57)

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
@@ -3,13 +3,10 @@
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
-	console.log('' + anything);
-	console.log(anything + '');
+	console.log('0' + anything ? 'yes' : 'no'), console.log(anything + '0' ? 'Yes' : 'No'), console.log('' + anything), console.log(anything + '');
 }
 foo();

```

## `uglify/issue-640/dead_code_const_annotation_regex`

- tags: `sequences`
- size: oxc 117 vs reference 74 (no whitespaces: +43, formatted: +42)

```js
var unused;
// @constraint this shouldn't be a constant
var CONST_FOO_ANN = false;
if (CONST_FOO_ANN) {
	console.log('reachable');
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var unused;
+// @constraint this shouldn't be a constant
 var CONST_FOO_ANN = !1;
-if (CONST_FOO_ANN) console.log('reachable');
+CONST_FOO_ANN && console.log('reachable');

```

## `uglify/reduce_vars/issue_5716_2`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 45 (no whitespaces: +43, formatted: +59)

```js
var a;
function f() {
	var b = [c, c], c = function() {
		return (b += 4) + (a = b += 2);
	}();
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,8 @@
-void (c = c = (c = [c, c]) + 4 + 2);
-var c;
-console.log(c);
+var a;
+function f() {
+	var b = [c, c], c = function() {
+		return (b += 4) + (a = b += 2);
+	}();
+}
+f();
+console.log(a);

```

## `uglify/reduce_vars/issue_5716_3`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 45 (no whitespaces: +43, formatted: +59)

```js
var a;
function f() {
	var b = [c, c], c = function() {
		return (b = b + 4) + (a = b += 2);
	}();
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,8 @@
-void (c = c = (c = [c, c]) + 4 + 2);
-var c;
-console.log(c);
+var a;
+function f() {
+	var b = [c, c], c = function() {
+		return (b += 4) + (a = b += 2);
+	}();
+}
+f();
+console.log(a);

```

## `uglify/default-values/issue_5138_2`

- size: oxc 71 vs reference 27 (no whitespaces: +44, formatted: +56)

```js
console.log(function(a, b = a = 'FAIL 1') {
	return a;
}(null, 'FAIL 2') || 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log((null, 'PASS'));
+console.log(function(a, b = a = 'FAIL 1') {
+	return a;
+}(null, 'FAIL 2') || 'PASS');

```

## `uglify/drop-unused/issue_3899`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 85 vs reference 41 (no whitespaces: +44, formatted: +60)

```js
var a = 0;
a = a + 1;
var a = function f(b) {
	return function() {
		return b;
	};
}(2);
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,8 @@
-console.log(typeof function() {
-	return 2;
-});
+var a = 0;
+a += 1;
+var a = function(b) {
+	return function() {
+		return b;
+	};
+}(2);
+console.log(typeof a);

```

## `uglify/evaluate/simple_function_1`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 16 (no whitespaces: +44, formatted: +57)

```js
function sum(a, b) {
	return a + b;
}
console.log(sum(1, 2) * sum(3, 4));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(21);
+function sum(a, b) {
+	return a + b;
+}
+console.log(sum(1, 2) * sum(3, 4));

```

## `uglify/functions/issue_3402`

- tags: `join vars`, `remove unused`
- size: oxc 121 vs reference 77 (no whitespaces: +44, formatted: +52)

```js
var f = function f() {
	f = 42;
	console.log(typeof f);
};
'function' == typeof f && f();
'function' == typeof f && f();
console.log(typeof f);

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 	f = 42;
 	console.log(typeof f);
 };
-f();
-f();
+typeof f == 'function' && f();
+typeof f == 'function' && f();
 console.log(typeof f);

```

## `uglify/issue-1704/mangle_catch_redef_3`

- size: oxc 139 vs reference 95 (no whitespaces: +44, formatted: +44)

```js
var o = 'PASS';
try {
	throw 0;
} catch (o) {
	// prints "FAIL" if inlined on Node.js v4-
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
@@ -2,11 +2,12 @@
 try {
 	throw 0;
 } catch (o) {
+	// prints "FAIL" if inlined on Node.js v4-
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

## `uglify/issue-1704/mangle_catch_redef_3_ie8`

- size: oxc 139 vs reference 95 (no whitespaces: +44, formatted: +44)

```js
var o = 'PASS';
try {
	throw 0;
} catch (o) {
	// prints "FAIL" if inlined on Node.js v4-
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
@@ -2,11 +2,12 @@
 try {
 	throw 0;
 } catch (o) {
+	// prints "FAIL" if inlined on Node.js v4-
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

## `uglify/issue-1704/mangle_catch_redef_3_ie8_toplevel`

- size: oxc 139 vs reference 95 (no whitespaces: +44, formatted: +44)

```js
var o = 'PASS';
try {
	throw 0;
} catch (o) {
	// prints "FAIL" if inlined on Node.js v4-
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
@@ -1,12 +1,13 @@
-var c = 'PASS';
+var o = 'PASS';
 try {
 	throw 0;
-} catch (c) {
+} catch (o) {
+	// prints "FAIL" if inlined on Node.js v4-
 	(function() {
-		function o() {
-			c = 'FAIL';
+		function f() {
+			o = 'FAIL';
 		}
-		o(), o();
+		f(), f();
 	})();
 }
-console.log(c);
+console.log(o);

```

## `uglify/issue-1704/mangle_catch_redef_3_toplevel`

- size: oxc 139 vs reference 95 (no whitespaces: +44, formatted: +44)

```js
var o = 'PASS';
try {
	throw 0;
} catch (o) {
	// prints "FAIL" if inlined on Node.js v4-
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
@@ -1,12 +1,13 @@
-var c = 'PASS';
+var o = 'PASS';
 try {
 	throw 0;
-} catch (c) {
+} catch (o) {
+	// prints "FAIL" if inlined on Node.js v4-
 	(function() {
-		function o() {
-			c = 'FAIL';
+		function f() {
+			o = 'FAIL';
 		}
-		o(), o();
+		f(), f();
 	})();
 }
-console.log(c);
+console.log(o);

```

## `uglify/pure_getters/collapse_rhs_false`

- tags: `join vars`
- size: oxc 237 vs reference 193 (no whitespaces: +44, formatted: +49)

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
@@ -1,7 +1,7 @@
-console.log(42 .length = 'PASS');
-console.log('foo'.length = 'PASS');
-console.log(false.length = 'PASS');
-console.log(function() {}.length = 'PASS');
-console.log({ get length() {
+console.log((42 .length = 'PASS', 'PASS'));
+console.log(('foo'.length = 'PASS', 'PASS'));
+console.log(((!1).length = 'PASS', 'PASS'));
+console.log((function() {}.length = 'PASS', 'PASS'));
+console.log(({ get length() {
 	return 'FAIL';
-} }.length = 'PASS');
+} }.length = 'PASS', 'PASS'));

```

## `uglify/pure_getters/collapse_rhs_strict`

- tags: `join vars`
- size: oxc 237 vs reference 193 (no whitespaces: +44, formatted: +49)

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
@@ -1,7 +1,7 @@
-console.log(42 .length = 'PASS');
-console.log('foo'.length = 'PASS');
-console.log(false.length = 'PASS');
-console.log(function() {}.length = 'PASS');
-console.log({ get length() {
+console.log((42 .length = 'PASS', 'PASS'));
+console.log(('foo'.length = 'PASS', 'PASS'));
+console.log(((!1).length = 'PASS', 'PASS'));
+console.log((function() {}.length = 'PASS', 'PASS'));
+console.log(({ get length() {
 	return 'FAIL';
-} }.length = 'PASS');
+} }.length = 'PASS', 'PASS'));

```

## `uglify/pure_getters/collapse_rhs_true`

- tags: `join vars`, `pure getters`
- size: oxc 237 vs reference 193 (no whitespaces: +44, formatted: +49)

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
@@ -1,7 +1,7 @@
-console.log(42 .length = 'PASS');
-console.log('foo'.length = 'PASS');
-console.log(false.length = 'PASS');
-console.log(function() {}.length = 'PASS');
-console.log({ get length() {
+console.log((42 .length = 'PASS', 'PASS'));
+console.log(('foo'.length = 'PASS', 'PASS'));
+console.log(((!1).length = 'PASS', 'PASS'));
+console.log((function() {}.length = 'PASS', 'PASS'));
+console.log(({ get length() {
 	return 'FAIL';
-} }.length = 'PASS');
+} }.length = 'PASS', 'PASS'));

```

## `uglify/reduce_vars/func_arg_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 64 vs reference 20 (no whitespaces: +44, formatted: +57)

```js
var a = 42;
!function(a) {
	console.log(a());
}(function(a) {
	return a;
});

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(void 0);
+var a = 42;
+(function(a) {
+	console.log(a());
+})(function(a) {
+	return a;
+});

```

## `uglify/side_effects/global_constructors`

- size: oxc 120 vs reference 76 (no whitespaces: +44, formatted: +44)

```js
Map;
new Map(console.log('foo'));
Set;
new Set(console.log('bar'));
WeakMap;
new WeakMap(console.log('baz'));
WeakSet;
new WeakSet(console.log('moo'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log('foo');
-console.log('bar');
-console.log('baz');
-console.log('moo');
+new Map(console.log('foo'));
+new Set(console.log('bar'));
+new WeakMap(console.log('baz'));
+new WeakSet(console.log('moo'));

```

## `uglify/yields/issue_5076_2`

- tags: `sequences`, `remove unused`, `2 iterations`
- size: oxc 64 vs reference 20 (no whitespaces: +44, formatted: +58)

```js
var a;
console.log('PASS');
var b = function* ({ p: {} }) {}({ p: {a} = 42 });

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
+var a;
 console.log('PASS');
+var b = function* ({ p: {} }) {}({ p: {a} = 42 });

```

## `uglify/collapse_vars/collapse_vars_side_effects_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 465 vs reference 420 (no whitespaces: +45, formatted: +71)

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
@@ -1,18 +1,17 @@
 function f1() {
-	var s = 'abcdef', i = 2;
-	console.log.bind(console)(s.charAt(i++), s.charAt(+i), s.charAt(4), 7);
+	var e = 7, s = 'abcdef', i = 2;
+	console.log.bind(console)(s.charAt(i++), s.charAt(i++), s.charAt(i++), e);
 }
 function f2() {
-	var s = 'abcdef', i = 2;
-	console.log.bind(console)(s.charAt(i++), 5, s.charAt(i++), s.charAt(+i), 7);
+	var e = 7, log = console.log.bind(console), s = 'abcdef', i = 2, x = s.charAt(i++), y = s.charAt(i++), z = s.charAt(i++);
+	log(x, i, y, z, e);
 }
 function f3() {
-	var s = 'abcdef', i = 2, log = console.log.bind(console), x = s.charAt(i++), y = s.charAt(+i);
-	log(x, s.charAt(4), y, 7);
+	var e = 7, s = 'abcdef', i = 2, log = console.log.bind(console), x = s.charAt(i++), y = s.charAt(i++);
+	log(x, s.charAt(i++), y, e);
 }
 function f4() {
-	var i = 10;
-	i += 2, i += 3, i += 4;
-	console.log.bind(console)(12, 19, 15, 19);
+	var log = console.log.bind(console), i = 10, x = i += 2, y = i += 3;
+	log(x, i += 4, y, i);
 }
 f1(), f2(), f3(), f4();

```

## `uglify/conditionals/merge_tail_2`

- tags: `sequences`
- size: oxc 165 vs reference 120 (no whitespaces: +45, formatted: +58)

```js
function f(a) {
	var b = 'foo';
	if (a) {
		while (console.log('bar'));
		console.log(b);
	} else {
		c = 'baz';
		while (console.log(c));
		while (console.log('bar'));
		console.log(b);
		var c;
	}
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,13 @@
 function f(a) {
 	var b = 'foo';
-	if (!a) {
-		c = 'baz';
-		while (console.log(c));
+	if (a) {
+		for (; console.log('bar'););
+		console.log(b);
+	} else {
+		for (c = 'baz'; console.log(c););
+		for (; console.log('bar'););
+		console.log(b);
 		var c;
 	}
-	while (console.log('bar'));
-	console.log(b);
 }
-f();
-f(42);
+f(), f(42);

```

## `uglify/default-values/inline_function`

- tags: `sequences`, `remove unused`
- size: oxc 102 vs reference 57 (no whitespaces: +45, formatted: +54)

```js
(function(a = console.log('foo'), b = console.log('bar')) {
	console.log('baz');
})(void console.log('moo'), 42);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('moo'), console.log('foo'), console.log('baz');
+(function(a = console.log('foo'), b = console.log('bar')) {
+	console.log('baz');
+})(void console.log('moo'), 42);

```

## `uglify/functions/issue_2630_1`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 90 vs reference 45 (no whitespaces: +45, formatted: +69)

```js
var c = 0;
(function() {
	while (f());
	function f() {
		var a = function() {
			var b = c++, d = c = 1 + c;
		}();
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

## `uglify/functions/issue_2630_6`

- tags: `join vars`, `remove unused`
- size: oxc 116 vs reference 71 (no whitespaces: +45, formatted: +59)

```js
var c = 1;
!function() {
	do {
		c *= 10;
	} while (f());
	function f() {
		return function() {
			return (c = 2 + c) < 100;
		}(c = c + 3);
	}
}();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,12 @@
 var c = 1;
-!function() {
-	do {
+(function() {
+	do
 		c *= 10;
-	} while ((c = 2 + (c += 3)) < 100);
-}();
+	while (f());
+	function f() {
+		return function() {
+			return (c = 2 + c) < 100;
+		}(c += 3);
+	}
+})();
 console.log(c);

```

## `uglify/collapse_vars/issue_1562`

- tags: `join vars`, `remove unused`
- size: oxc 128 vs reference 82 (no whitespaces: +46, formatted: +74)

```js
var v = 1, B = 2;
for (v in objs) f(B);
var x = 3, C = 10;
while (x + 2) bar(C);
var y = 4, D = 20;
do
	bar(D);
while (y + 2);
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

## `uglify/sequences/forin_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 161 vs reference 115 (no whitespaces: +46, formatted: +59)

```js
var o = {
	p: 1,
	q: 2
};
var k = 'k';
for ((console.log('exp'), o)[function() {
	console.log('prop');
	return k;
}()] in function() {
	console.log('obj');
	return o;
}()) console.log(o.k, o[o.k]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,9 @@
 var o = {
 	p: 1,
 	q: 2
-};
-for ((console.log('exp'), o)[console.log('prop'), 'k'] in console.log('obj'), o) console.log(o.k, o[o.k]);
+}, k = 'k';
+for ((console.log('exp'), o)[function() {
+	return console.log('prop'), k;
+}()] in function() {
+	return console.log('obj'), o;
+}()) console.log(o.k, o[o.k]);

```

## `uglify/side_effects/issue_3983_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 74 vs reference 28 (no whitespaces: +46, formatted: +60)

```js
var a = 'PASS';
function f() {
	g && g();
}
f();
function g() {
	0 ? a : 0;
}
var b = a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,8 @@
 var a = 'PASS';
+function f() {
+	g && g();
+}
+f();
+function g() {}
+var b = a;
 console.log(a);

```

## `uglify/arrows/issue_5342_2`

- tags: `remove unused`
- size: oxc 98 vs reference 51 (no whitespaces: +47, formatted: +60)

```js
for (var a in 0) {
	(() => {
		while (1);
	})(new function(NaN) {
		a.p;
	}());
}
console.log(function() {
	return b;
	try {
		b;
	} catch (e) {
		var b;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,9 @@
-for (var a in 0) {
+for (var a in 0) (() => {
+	for (;;);
+})(new function(NaN) {
 	a.p;
-	while (1);
-}
-console.log(c);
-var c;
+}());
+console.log(function() {
+	return b;
+	var b;
+}());

```

## `uglify/arrows/var_arguments`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 20 (no whitespaces: +47, formatted: +55)

```js
console.log(function() {
	return () => {
		var arguments = ['PASS'];
		return arguments;
	};
}('FAIL 1')('FAIL 2')[0]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('PASS');
+console.log(function() {
+	return () => ['PASS'];
+}('FAIL 1')('FAIL 2')[0]);

```

## `uglify/destructured/funarg_reduce_vars_2`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 20 (no whitespaces: +47, formatted: +65)

```js
console.log(function([a], { b }, c) {
	return a + b + c;
}(['P'], { b: 'A' }, 'SS'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('PASS');
+console.log(function([a], { b }, c) {
+	return a + b + c;
+}(['P'], { b: 'A' }, 'SS'));

```

## `uglify/hoist_props/issue_4023`

- tags: `join vars`, `remove unused`
- size: oxc 72 vs reference 25 (no whitespaces: +47, formatted: +64)

```js
function f() {
	var a = function() {
		return { p: 0 };
	}();
	return console.log('undefined' != typeof a);
}
f();

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(void 0 !== {});
+function f() {
+	return console.log(function() {
+		return { p: 0 };
+	}() !== void 0);
+}
+f();

```

## `uglify/properties/const_prop_assign_pure`

- tags: `pure getters`
- size: oxc 90 vs reference 43 (no whitespaces: +47, formatted: +54)

```js
function Simulator() {
	/abc/.index = 1;
	this._aircraft = [];
}
(function() {}).prototype.destroy = x();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function Simulator() {
+	/abc/.index = 1;
 	this._aircraft = [];
 }
-x();
+(function() {}).prototype.destroy = x();

```

## `uglify/properties/const_prop_assign_strict`

- size: oxc 90 vs reference 43 (no whitespaces: +47, formatted: +54)

```js
function Simulator() {
	/abc/.index = 1;
	this._aircraft = [];
}
(function() {}).prototype.destroy = x();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function Simulator() {
+	/abc/.index = 1;
 	this._aircraft = [];
 }
-x();
+(function() {}).prototype.destroy = x();

```

## `uglify/reduce_vars/func_arg_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 63 vs reference 16 (no whitespaces: +47, formatted: +60)

```js
var a = 42;
!function(a) {
	console.log(a());
}(function() {
	return a;
});

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(42);
+var a = 42;
+(function(a) {
+	console.log(a());
+})(function() {
+	return a;
+});

```

## `uglify/switches/issue_441_2`

- size: oxc 113 vs reference 66 (no whitespaces: +47, formatted: +54)

```js
switch (foo) {
	case bar:
		// TODO: Fold into the case below
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
@@ -1,8 +1,11 @@
 switch (foo) {
 	case bar:
+		// TODO: Fold into the case below
 		qux();
 		break;
 	case fall:
 	case baz:
+		qux();
+		break;
 	default: qux();
 }

```

## `uglify/awaits/drop_async_2`

- tags: `join vars`
- size: oxc 64 vs reference 16 (no whitespaces: +48, formatted: +62)

```js
console.log(function(a) {
	(async (b) => await (a *= b))(7);
	return a;
}(6));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(42);
+console.log(function(a) {
+	(async (b) => await (a *= b))(7);
+	return a;
+}(6));

```

## `uglify/evaluate/issue_3878_1`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 32 (no whitespaces: +48, formatted: +67)

```js
var b = function(a) {
	return (a = 0) == (a && this > (a += 0));
}();
console.log(b ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(true ? 'PASS' : 'FAIL');
+var b = function(a) {
+	return (a = 0) == (a && this > (a += 0));
+}();
+console.log(b ? 'PASS' : 'FAIL');

```

## `uglify/functions/issue_2114_1`

- tags: `join vars`, `remove unused`
- size: oxc 127 vs reference 79 (no whitespaces: +48, formatted: +62)

```js
var c = 0;
!function(a) {
	a = 0;
}([{
	0: c = c + 1,
	length: c = 1 + c
}, typeof void function a() {
	var b = function f1(a) {}(b && (b.b += (c = c + 1, 0)));
}()]);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
 var c = 0;
-c = 1 + (c += 1), function() {
-	var b = void (b && (b.b += (c += 1, 0)));
-}();
+(function(a) {
+	a = 0;
+})([{
+	0: c += 1,
+	length: c = 1 + c
+}, typeof void function() {
+	var b = (b && (b.b += (c += 1, 0)), void 0);
+}()]);
 console.log(c);

```

## `uglify/functions/issue_2114_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 127 vs reference 79 (no whitespaces: +48, formatted: +62)

```js
var c = 0;
!function(a) {
	a = 0;
}([{
	0: c = c + 1,
	length: c = 1 + c
}, typeof void function a() {
	var b = function f1(a) {}(b && (b.b += (c = c + 1, 0)));
}()]);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
 var c = 0;
-c = 1 + (c += 1), function() {
-	var b = void (b && (b.b += (c += 1, 0)));
-}();
+(function(a) {
+	a = 0;
+})([{
+	0: c += 1,
+	length: c = 1 + c
+}, typeof void function() {
+	var b = (b && (b.b += (c += 1, 0)), void 0);
+}()]);
 console.log(c);

```

## `uglify/pure_getters/issue_2838`

- tags: `pure getters`
- size: oxc 116 vs reference 68 (no whitespaces: +48, formatted: +60)

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

## `uglify/reduce_vars/issue_3113_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 75 vs reference 27 (no whitespaces: +48, formatted: +68)

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
@@ -1,3 +1,9 @@
 var c = 0;
-c++;
+(function() {
+	var a;
+	function g() {
+		a && a[c++];
+	}
+	g(a = 1);
+})();
 console.log(c);

```

## `uglify/evaluate/simple_function_2`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 16 (no whitespaces: +49, formatted: +64)

```js
var sum = function(a, b) {
	return a + b;
};
console.log(sum(1, 2) * sum(3, 4));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(21);
+var sum = function(a, b) {
+	return a + b;
+};
+console.log(sum(1, 2) * sum(3, 4));

```

## `uglify/hoist_props/contains_this_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 66 vs reference 17 (no whitespaces: +49, formatted: +68)

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
@@ -1 +1,7 @@
-console.log(1, 1);
+var o = {
+	u: function() {
+		return this === this;
+	},
+	p: 1
+};
+console.log(o.p, o.p);

```

## `uglify/if_return/drop_try_catch`

- size: oxc 192 vs reference 143 (no whitespaces: +49, formatted: +50)

```js
function f(a) {
	try {
		if (a()) return console.log('foo'), console.log('baz');
	} catch (e) {
		return console.log('bar'), console.log('baz');
	}
	return console.log('baz');
}
f(function() {
	return 42;
});
f(function() {});
f();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f(a) {
 	try {
-		if (a()) console.log('foo');
-	} catch (e) {
-		console.log('bar');
+		if (a()) return console.log('foo'), console.log('baz');
+	} catch {
+		return console.log('bar'), console.log('baz');
 	}
 	return console.log('baz');
 }

```

## `uglify/if_return/if_var_return_1`

- tags: `join vars`, `sequences`
- size: oxc 147 vs reference 98 (no whitespaces: +49, formatted: +76)

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

## `uglify/reduce_vars/issue_1670_3`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 80 vs reference 31 (no whitespaces: +49, formatted: +68)

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
@@ -1,3 +1,8 @@
-(function() {
-	console.log(1);
-})();
+(function(a) {
+	switch (1) {
+		case a:
+			console.log(a);
+			break;
+		default: console.log(2);
+	}
+})(1);

```

## `uglify/reduce_vars/obj_var_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 64 vs reference 15 (no whitespaces: +49, formatted: +65)

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
@@ -1 +1,4 @@
-console.log(2);
+var C = 1, obj = { bar: function() {
+	return C + C;
+} };
+console.log(obj.bar());

```

## `uglify/switches/drop_case_9`

- size: oxc 144 vs reference 95 (no whitespaces: +49, formatted: +61)

```js
function log(msg) {
	console.log(msg);
	return msg;
}
switch (log('foo')) {
	case log('bar'):
		log('moo');
		break;
	case 'baz':
		log('moo');
		break;
	default: log('moo');
}

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,11 @@
 	return msg;
 }
 switch (log('foo')) {
-	default:
-		log('bar');
+	case log('bar'):
+		log('moo');
+		break;
+	case 'baz':
 		log('moo');
+		break;
+	default: log('moo');
 }

```

## `uglify/yields/issue_5749_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 69 vs reference 20 (no whitespaces: +49, formatted: +67)

```js
var a;
function* f() {}
a = f(new function() {
	var b = a |= 0, c = a += console.log('PASS');
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log('PASS');
+var a;
+function* f() {}
+a = f(new function() {
+	a |= 0, a += console.log('PASS');
+}());

```

## `uglify/drop-unused/issue_4025`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 98 vs reference 48 (no whitespaces: +50, formatted: +80)

```js
var a = 0, b = 0, c = 0, d = a++;
try {
	var e = console.log(c), f = b;
} finally {
	var d = b = 1, d = c + 1;
	c = 0;
}
console.log(a, b, d);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
+var a = 0, b = 0, c = 0, d = a++;
 try {
-	console.log(0);
+	var e = console.log(c), f = b;
 } finally {
-	0;
+	var d = b = 1, d = c + 1;
+	c = 0;
 }
-console.log(1, 1, 1);
+console.log(a, b, d);

```

## `uglify/pure_funcs/issue_3065_3`

- tags: `join vars`, `remove unused`, `pure functions`
- size: oxc 86 vs reference 36 (no whitespaces: +50, formatted: +59)

```js
function debug(msg) {
	console.log(msg);
}
debug(function() {
	console.log('PASS');
	return 'FAIL';
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
+function debug(msg) {
+	console.log(msg);
+}
 (function() {
 	console.log('PASS');
+	return 'FAIL';
 })();

```

## `uglify/pure_getters/nested_property_assignments_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 70 vs reference 20 (no whitespaces: +50, formatted: +62)

```js
var f;
((f = function() {
	console.log('FAIL');
}).p = f).q = console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS');
+var f;
+((f = function() {
+	console.log('FAIL');
+}).p = f).q = console.log('PASS');

```

## `uglify/reduce_vars/defun_redefine`

- tags: `join vars`, `remove unused`
- size: oxc 112 vs reference 62 (no whitespaces: +50, formatted: +72)

```js
function f() {
	function g() {
		return 1;
	}
	function h() {
		return 2;
	}
	g = function() {
		return 3;
	};
	return g() + h();
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,13 @@
 function f() {
-	(function() {
+	function g() {
+		return 1;
+	}
+	function h() {
+		return 2;
+	}
+	g = function() {
 		return 3;
-	});
-	return 5;
+	};
+	return g() + h();
 }
 console.log(f());

```

## `uglify/sandbox/toplevel_Infinity_NaN_undefined`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 27 (no whitespaces: +50, formatted: +59)

```js
var Infinity = 'foo';
var NaN = 42;
var undefined = null;
console.log(Infinity, NaN, undefined);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('foo', 42, null);
+var Infinity = 'foo', NaN = 42, undefined = null;
+console.log(Infinity, NaN, undefined);

```

## `uglify/switches/drop_switch_8`

- tags: `sequences`
- size: oxc 78 vs reference 28 (no whitespaces: +50, formatted: +68)

```js
switch (A) {
	case B:
		w();
		break;
	default: x();
}
switch (C) {
	default:
		y();
		break;
	case D: z();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,12 @@
-(A === B ? w : x)();
-(C !== D ? y : z)();
+switch (A) {
+	case B:
+		w();
+		break;
+	default: x();
+}
+switch (C) {
+	default:
+		y();
+		break;
+	case D: z();
+}

```

## `uglify/drop-unused/drop_toplevel_funcs`

- tags: `remove unused`
- size: oxc 100 vs reference 49 (no whitespaces: +51, formatted: +68)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
 var a, b = 1, c = g;
+function f(d) {
+	return function() {
+		c = 2;
+	};
+}
 a = 2;
 function g() {}
+function h() {}
 console.log(b = 3);

```

## `uglify/functions/issue_2620_6`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 129 vs reference 78 (no whitespaces: +51, formatted: +83)

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
@@ -1,7 +1,14 @@
 var c = 'FAIL';
 (function() {
-	switch (NaN) {
-		case void (c = 'PASS'):
+	function f(a, NaN) {
+		function g() {
+			switch (a) {
+				case a: break;
+				case c = 'PASS', NaN:
+			}
+		}
+		g();
 	}
+	f(NaN);
 })();
 console.log(c);

```

## `uglify/functions/issue_2630_5`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 110 vs reference 59 (no whitespaces: +51, formatted: +72)

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
-while (--x >= 0 && void (b += ++a));
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

## `uglify/functions/issue_3772`

- tags: `join vars`, `remove unused`
- size: oxc 79 vs reference 28 (no whitespaces: +51, formatted: +66)

```js
var a = 'PASS';
function f() {
	return a;
}
var b = f();
function g() {
	console.log(f());
}
g();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,9 @@
 var a = 'PASS';
-console.log(a);
+function f() {
+	return a;
+}
+var b = f();
+function g() {
+	console.log(f());
+}
+g();

```

## `uglify/reduce_vars/issue_1670_4`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 82 vs reference 31 (no whitespaces: +51, formatted: +72)

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
@@ -1,3 +1,8 @@
-(function() {
-	console.log(1);
-})();
+(function(a) {
+	switch (1) {
+		case a = 1:
+			console.log(a);
+			break;
+		default: console.log(2);
+	}
+})(1);

```

## `uglify/reduce_vars/issue_2423_6`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 102 vs reference 51 (no whitespaces: +51, formatted: +72)

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

## `uglify/if_return/nested_if_return`

- tags: `sequences`
- size: oxc 122 vs reference 70 (no whitespaces: +52, formatted: +64)

```js
function f() {
	if (A) {
		if (B) return B;
		if (C) return D;
		if (E) return F;
		if (G) return H;
		if (I) {
			if (J) return K;
			return;
		}
		if (L) {
			if (M) return;
			return N;
		}
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,10 @@
 function f() {
-	if (A) return B || (C ? D : E ? F : G ? H : I ? J ? K : void 0 : L && !M ? N : void 0);
+	if (A) {
+		if (B) return B;
+		if (C) return D;
+		if (E) return F;
+		if (G) return H;
+		if (I) return J ? K : void 0;
+		if (L) return M ? void 0 : N;
+	}
 }

```

## `uglify/properties/prop_side_effects_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 82 vs reference 30 (no whitespaces: +52, formatted: +68)

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
@@ -1,2 +1,6 @@
-console.log(1);
-console.log(2);
+var C = 1;
+console.log(C);
+var obj = { '': function() {
+	return C + C;
+} };
+console.log(obj['']());

```

## `uglify/functions/issue_2428`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 104 vs reference 51 (no whitespaces: +53, formatted: +65)

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

## `uglify/destructured/issue_5087_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 85 vs reference 31 (no whitespaces: +54, formatted: +75)

```js
var a = 'PASS';
(function() {
	(function() {
		(function([b]) {
			b && console.log(b);
		})([a]);
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,8 @@
 var a = 'PASS';
-a && console.log(a);
+(function() {
+	(function() {
+		(function([b]) {
+			b && console.log(b);
+		})([a]);
+	})();
+})();

```

## `uglify/functions/issue_2616`

- tags: `join vars`, `remove unused`
- size: oxc 109 vs reference 55 (no whitespaces: +54, formatted: +82)

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
-(true << []) - NaN || (c = 'PASS');
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

## `uglify/functions/reduce_cross_reference_1_toplevel`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 54 vs reference 0 (no whitespaces: +54, formatted: +72)

```js
var a = b = function() {};
a.p = a;
var b = a = function() {};
b.q = b;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+var a = b = function() {};
+a.p = a;
+var b = a = function() {};
+b.q = b;

```

## `uglify/functions/reduce_cross_reference_2_toplevel`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 54 vs reference 0 (no whitespaces: +54, formatted: +72)

```js
var a = b = function() {};
b.p = a;
var b = a = function() {};
a.q = b;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+var a = b = function() {};
+b.p = a;
+var b = a = function() {};
+a.q = b;

```

## `uglify/functions/reduce_cross_reference_3_toplevel`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 54 vs reference 0 (no whitespaces: +54, formatted: +72)

```js
var a = b = function() {};
a.p = b;
var b = a = function() {};
b.q = a;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+var a = b = function() {};
+a.p = b;
+var b = a = function() {};
+b.q = a;

```

## `uglify/functions/reduce_cross_reference_4_toplevel`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 54 vs reference 0 (no whitespaces: +54, formatted: +72)

```js
var a = b = function() {};
b.p = b;
var b = a = function() {};
a.q = a;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+var a = b = function() {};
+b.p = b;
+var b = a = function() {};
+a.q = a;

```

## `uglify/properties/lhs_prop_2`

- tags: `join vars`, `remove unused`
- size: oxc 103 vs reference 49 (no whitespaces: +54, formatted: +69)

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

## `uglify/reduce_vars/func_modified`

- tags: `join vars`, `remove unused`
- size: oxc 151 vs reference 97 (no whitespaces: +54, formatted: +78)

```js
function f(a) {
	function a() {
		return 1;
	}
	function b() {
		return 2;
	}
	function c() {
		return 3;
	}
	b.inject = [];
	c = function() {
		return 4;
	};
	return a() + b() + c();
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,17 @@
 function f(a) {
+	function a() {
+		return 1;
+	}
 	function b() {
 		return 2;
 	}
+	function c() {
+		return 3;
+	}
 	b.inject = [];
-	(function() {
+	c = function() {
 		return 4;
-	});
-	return 7;
+	};
+	return a() + b() + c();
 }
 console.log(f());

```

## `uglify/side_effects/issue_3983_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 74 vs reference 20 (no whitespaces: +54, formatted: +71)

```js
var a = 'PASS';
function f() {
	g && g();
}
f();
function g() {
	0 ? a : 0;
}
var b = a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,8 @@
-console.log('PASS');
+var a = 'PASS';
+function f() {
+	g && g();
+}
+f();
+function g() {}
+var b = a;
+console.log(a);

```

## `uglify/switches/issue_1705_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 54 vs reference 0 (no whitespaces: +54, formatted: +66)

```js
var a = 0;
switch (a) {
	default: console.log('FAIL');
	case 0: break;
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+var a = 0;
+switch (a) {
+	default: console.log('FAIL');
+	case 0:
+}

```

## `uglify/pure_funcs/issue_3065_4`

- tags: `join vars`, `remove unused`, `pure functions`
- size: oxc 91 vs reference 36 (no whitespaces: +55, formatted: +66)

```js
var debug = function(msg) {
	console.log(msg);
};
debug(function() {
	console.log('PASS');
	return 'FAIL';
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
+var debug = function(msg) {
+	console.log(msg);
+};
 (function() {
 	console.log('PASS');
+	return 'FAIL';
 })();

```

## `uglify/conditionals/ifs_3_should_warn`

- tags: `sequences`
- size: oxc 102 vs reference 46 (no whitespaces: +56, formatted: +85)

```js
var x, y;
// 1
if (x && !(x + '1') && y) {
	var qq;
	foo();
} else {
	bar();
}
// 2
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
@@ -1,7 +1,12 @@
 var x, y;
 // 1
-var qq;
-bar();
+if (x && !(x + '1') && y) {
+	var qq;
+	foo();
+} else bar();
 // 2
-foo();
-var jj;
+if (x || x + '1' || y) foo();
+else {
+	var jj;
+	bar();
+}

```

## `uglify/dead-code/issue_3402`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 121 vs reference 65 (no whitespaces: +56, formatted: +70)

```js
var f = function f() {
	f = 42;
	console.log(typeof f);
};
'function' == typeof f && f();
'function' == typeof f && f();
console.log(typeof f);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-function f() {
+var f = function f() {
+	f = 42;
 	console.log(typeof f);
-}
-f();
-f();
+};
+typeof f == 'function' && f();
+typeof f == 'function' && f();
 console.log(typeof f);

```

## `uglify/evaluate/issue_1964_2`

- tags: `join vars`, `remove unused`
- size: oxc 140 vs reference 84 (no whitespaces: +56, formatted: +60)

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

## `uglify/evaluate/prop_function`

- size: oxc 121 vs reference 65 (no whitespaces: +56, formatted: +74)

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

## `uglify/functions/issue_2531_1`

- tags: `join vars`, `remove unused`
- size: oxc 164 vs reference 108 (no whitespaces: +56, formatted: +74)

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
@@ -1,7 +1,12 @@
 function outer() {
-	return value = 'Hello', function() {
-		return value;
-	};
-	var value;
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

## `uglify/objects/shorthand_keywords`

- tags: `join vars`, `remove unused`
- size: oxc 75 vs reference 19 (no whitespaces: +56, formatted: +75)

```js
var async = 1, get = 2, set = 3, o = {
	async,
	get,
	set
};
console.log(o.async, o.get, o.set);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(1, 2, 3);
+var async = 1, get = 2, set = 3, o = {
+	async,
+	get,
+	set
+};
+console.log(o.async, o.get, o.set);

```

## `uglify/sequences/delete_seq_4_evaluate`

- tags: `sequences`
- size: oxc 202 vs reference 146 (no whitespaces: +56, formatted: +64)

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
-console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !0));
+console.log(delete (f(), undefined)), console.log(delete (f(), void 0)), console.log(delete (f(), Infinity)), console.log(delete (f(), 1 / 0)), console.log(delete (f(), NaN)), console.log(delete (f(), NaN));

```

## `uglify/sequences/delete_seq_5_evaluate`

- tags: `sequences`
- size: oxc 202 vs reference 146 (no whitespaces: +56, formatted: +64)

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
-console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !0));
+console.log(delete (f(), undefined)), console.log(delete (f(), void 0)), console.log(delete (f(), Infinity)), console.log(delete (f(), 1 / 0)), console.log(delete (f(), NaN)), console.log(delete (f(), NaN));

```

## `uglify/drop-unused/issue_3956`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 114 vs reference 57 (no whitespaces: +57, formatted: +83)

```js
(function(a) {
	function f(b) {
		console.log(b);
		a = 1;
	}
	var c = f(c += 0);
	(function(d) {
		console.log(d);
	})(console.log(a) ^ 1, c);
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,9 @@
-var d;
-console.log(NaN), d = 1 ^ console.log(1), console.log(d);
+(function(a) {
+	function f(b) {
+		console.log(b), a = 1;
+	}
+	var c = f(c += 0);
+	(function(d) {
+		console.log(d);
+	})(console.log(a) ^ 1, c);
+})();

```

## `uglify/evaluate/unsafe_integer_key_complex`

- size: oxc 130 vs reference 73 (no whitespaces: +57, formatted: +117)

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

## `uglify/functions/issue_3679_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 77 vs reference 20 (no whitespaces: +57, formatted: +78)

```js
(function() {
	var f = function() {};
	f.g = function() {
		console.log('PASS');
	};
	f.g();
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-console.log('PASS');
+(function() {
+	var f = function() {};
+	f.g = function() {
+		console.log('PASS');
+	};
+	f.g();
+})();

```

## `uglify/issue-281/collapse_vars_constants`

- tags: `join vars`, `remove unused`
- size: oxc 208 vs reference 151 (no whitespaces: +57, formatted: +82)

```js
function f1(x) {
	var a = 4, b = x.prop, c = 5, d = sideeffect1(), e = sideeffect2();
	return b + (function() {
		return d - a * e - c;
	})();
}
function f2(x) {
	var a = 4, b = x.prop, c = 5, not_used = sideeffect1(), e = sideeffect2();
	return b + (function() {
		return -a * e - c;
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,14 @@
 function f1(x) {
-	var b = x.prop, d = sideeffect1(), e = sideeffect2();
-	return b + (d - 4 * e - 5);
+	var b = x.prop, c = 5, d = sideeffect1(), e = sideeffect2();
+	return b + (function() {
+		return d - 4 * e - c;
+	})();
 }
 function f2(x) {
-	var b = x.prop;
+	var b = x.prop, c = 5;
 	sideeffect1();
-	return b + (-4 * sideeffect2() - 5);
+	var e = sideeffect2();
+	return b + (function() {
+		return -4 * e - c;
+	})();
 }

```

## `uglify/drop-unused/unused_circular_references_3`

- tags: `remove unused`
- size: oxc 85 vs reference 27 (no whitespaces: +58, formatted: +80)

```js
function f(x, y) {
	var g = function() {
		return h();
	};
	var h = function() {
		return g();
	};
	return x + y;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
 function f(x, y) {
+	var g = function() {
+		return h();
+	};
+	var h = function() {
+		return g();
+	};
 	return x + y;
 }

```

## `uglify/functions/cross_references_1`

- tags: `join vars`, `remove unused`
- size: oxc 180 vs reference 122 (no whitespaces: +58, formatted: +72)

```js
var Math = { square: function(n) {
	return n * n;
} };
console.log((function(factory) {
	return factory();
})(function() {
	return function(Math) {
		return function(n) {
			return Math.square(n);
		};
	}(Math);
})(3));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,12 @@
 var Math = { square: function(n) {
 	return n * n;
 } };
-console.log(function(Math) {
-	return function(n) {
-		return Math.square(n);
-	};
-}(Math)(3));
+console.log((function(factory) {
+	return factory();
+})(function() {
+	return function(Math) {
+		return function(n) {
+			return Math.square(n);
+		};
+	}(Math);
+})(3));

```

## `uglify/functions/issue_3400_1`

- tags: `join vars`, `remove unused`
- size: oxc 192 vs reference 134 (no whitespaces: +58, formatted: +90)

```js
(function(f) {
	console.log(f()()[0].p);
})(function() {
	function g() {
		function h(u) {
			var o = { p: u };
			return console.log(o[g]), o;
		}
		function e() {
			return [42].map(function(v) {
				return h(v);
			});
		}
		return e();
	}
	return g;
});

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,17 @@
-void console.log(function g() {
-	function h(u) {
-		var o = { p: u };
-		return console.log(o[g]), o;
-	}
-	function e() {
-		return [42].map(h);
+(function(f) {
+	console.log(f()()[0].p);
+})(function() {
+	function g() {
+		function h(u) {
+			var o = { p: u };
+			return console.log(o[g]), o;
+		}
+		function e() {
+			return [42].map(function(v) {
+				return h(v);
+			});
+		}
+		return e();
 	}
-	return e();
-}()[0].p);
+	return g;
+});

```

## `uglify/issue-281/safe_undefined`

- tags: `sequences`, `remove unused`
- size: oxc 94 vs reference 36 (no whitespaces: +58, formatted: +69)

```js
var a, c;
console.log(function(undefined) {
	return function() {
		if (a) return b;
		if (c) return d;
	};
}(1)());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,7 @@
 var a, c;
-console.log(a ? b : c ? d : void 0);
+console.log(function(undefined) {
+	return function() {
+		if (a) return b;
+		if (c) return d;
+	};
+}(1)());

```

## `uglify/reduce_vars/double_reference_4`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 76 vs reference 18 (no whitespaces: +58, formatted: +74)

```js
var x = function f() {
	return f;
};
function g() {
	return x();
}
console.log(g() === g());

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-console.log(true);
+var x = function f() {
+	return f;
+};
+function g() {
+	return x();
+}
+console.log(g() === g());

```

## `uglify/regexp/lazy_boolean`

- tags: `2 iterations`
- size: oxc 138 vs reference 80 (no whitespaces: +58, formatted: +66)

```js
/b/.exec({}) && console.log('PASS');
/b/.test({}) && console.log('PASS');
/b/g.exec({}) && console.log('PASS');
/b/g.test({}) && console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log('PASS');
-console.log('PASS');
-console.log('PASS');
-console.log('PASS');
+/b/.exec({}) && console.log('PASS');
+/b/.test({}) && console.log('PASS');
+/b/g.exec({}) && console.log('PASS');
+/b/g.test({}) && console.log('PASS');

```

## `uglify/classes/drop_extends`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 132 vs reference 73 (no whitespaces: +59, formatted: +85)

```js
'use strict';
try {
	(function() {
		var f = () => {};
		class A extends f {
			get p() {}
		}
		A.q = 42;
		return class B extends A {};
	})();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,12 @@
 'use strict';
 try {
-	(class extends (() => {}) {});
-} catch (e) {
+	(function() {
+		var f = () => {};
+		class A extends f {
+			get p() {}
+		}
+		return A.q = 42, class extends A {};
+	})();
+} catch {
 	console.log('PASS');
 }

```

## `uglify/functions/issue_2663_3`

- tags: `join vars`, `remove unused`
- size: oxc 591 vs reference 532 (no whitespaces: +59, formatted: +62)

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
@@ -1,18 +1,5 @@
 (function() {
-	function renderEventHandlerClosure(eventName) {
-		return function() {
-			return console.log(eventName);
-		};
-	}
-	(function(outputs) {
-		var handlers = [];
-		for (var i = 0; i < outputs.length; i++) {
-			var output = outputs[i];
-			var handleEventClosure = renderEventHandlerClosure(output.eventName);
-			handlers.push(handleEventClosure);
-		}
-		return handlers;
-	})([
+	var outputs = [
 		{
 			type: 0,
 			target: null,
@@ -31,7 +18,21 @@
 			eventName: 'reset',
 			propName: null
 		}
-	]).forEach(function(handler) {
+	];
+	function listenToElementOutputs(outputs) {
+		var handlers = [];
+		for (var i = 0; i < outputs.length; i++) {
+			var output = outputs[i], handleEventClosure = renderEventHandlerClosure(output.eventName);
+			handlers.push(handleEventClosure);
+		}
+		return handlers;
+	}
+	function renderEventHandlerClosure(eventName) {
+		return function() {
+			return console.log(eventName);
+		};
+	}
+	listenToElementOutputs(outputs).forEach(function(handler) {
 		return handler();
 	});
 })();

```

## `uglify/hoist_props/issue_3071_1`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 76 vs reference 17 (no whitespaces: +59, formatted: +74)

```js
(function() {
	var obj = {};
	obj.one = 1;
	obj.two = 2;
	console.log(obj.one, obj.two);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(1, 2);
+(function() {
+	var obj = {};
+	obj.one = 1, obj.two = 2, console.log(obj.one, obj.two);
+})();

```

## `uglify/hoist_props/issue_3071_1_toplevel`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 76 vs reference 17 (no whitespaces: +59, formatted: +74)

```js
(function() {
	var obj = {};
	obj.one = 1;
	obj.two = 2;
	console.log(obj.one, obj.two);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(1, 2);
+(function() {
+	var obj = {};
+	obj.one = 1, obj.two = 2, console.log(obj.one, obj.two);
+})();

```

## `uglify/drop-unused/issue_2665`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 110 vs reference 50 (no whitespaces: +60, formatted: +75)

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
@@ -1,5 +1,9 @@
 var a = 1;
-(function g() {
+function g() {
 	a-- && g();
-})();
+}
+typeof h == 'function' && h();
+function h() {
+	typeof g == 'function' && g();
+}
 console.log(a);

```

## `uglify/functions/cross_references_3`

- tags: `join vars`, `remove unused`
- size: oxc 350 vs reference 290 (no whitespaces: +60, formatted: +82)

```js
var Math = {
	square: function(n) {
		return n * n;
	},
	cube: function(n) {
		return n * n * n;
	}
};
console.log(function(factory) {
	return factory();
}(function() {
	return function(Math) {
		return function(n) {
			Math = {
				square: function(x) {
					return '(SQUARE' + x + ')';
				},
				cube: function(x) {
					return '(CUBE' + x + ')';
				}
			};
			return Math.square(n) + Math.cube(n);
		};
	}(Math);
})(2));
console.log(Math.square(3), Math.cube(3));

```

```diff
--- reference
+++ oxc
@@ -6,17 +6,21 @@
 		return n * n * n;
 	}
 };
-console.log(function(Math) {
-	return function(n) {
-		Math = {
-			square: function(x) {
-				return '(SQUARE' + x + ')';
-			},
-			cube: function(x) {
-				return '(CUBE' + x + ')';
-			}
+console.log(function(factory) {
+	return factory();
+}(function() {
+	return function(Math) {
+		return function(n) {
+			Math = {
+				square: function(x) {
+					return '(SQUARE' + x + ')';
+				},
+				cube: function(x) {
+					return '(CUBE' + x + ')';
+				}
+			};
+			return Math.square(n) + Math.cube(n);
 		};
-		return Math.square(n) + Math.cube(n);
-	};
-}()(2));
+	}(Math);
+})(2));
 console.log(Math.square(3), Math.cube(3));

```

## `uglify/functions/issue_3911`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 80 vs reference 20 (no whitespaces: +60, formatted: +83)

```js
function f() {
	return function() {
		if (a) a++, b += a;
		f();
	};
}
var a = f, b;
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
+function f() {
+	return function() {
+		a && (a++, b += a), f();
+	};
+}
+var a = f, b;
 console.log('PASS');

```

## `uglify/functions/recursive_inline_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 60 vs reference 0 (no whitespaces: +60, formatted: +81)

```js
function f() {
	h();
}
function g(a) {
	a();
}
function h(b) {
	g();
	if (b) x();
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+function f() {
+	h();
+}
+function g(a) {
+	a();
+}
+function h(b) {
+	g(), b && x();
+}

```

## `uglify/issue-1261/should_warn`

- tags: `sequences`
- size: oxc 114 vs reference 54 (no whitespaces: +60, formatted: +82)

```js
(function() {
	x;
})(), void (function() {
	y;
})();
(function() {
	x;
})() || true ? foo() : bar();
true || (function() {
	y;
})() ? foo() : bar();
(function() {
	x;
})() && false ? foo() : bar();
false && (function() {
	y;
})() ? foo() : bar();
(function() {
	x;
})() + 'foo' ? bar() : baz();
'foo' + (function() {
	y;
})() ? bar() : baz();
(function() {
	x;
})() ? foo() : foo();
[(function() {
	x;
})()] ? foo() : bar();
!{ foo: (function() {
	x;
})() } ? bar() : baz();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,5 @@
-foo();
-foo();
-bar();
-bar();
-bar();
-bar();
-foo();
-foo();
-baz();
+foo(), foo(), bar(), bar(), (function() {
+	x;
+})() + 'foo' ? bar() : baz(), 'foo' + (function() {
+	y;
+})() ? bar() : baz(), foo(), foo(), baz();

```

## `uglify/join_vars/issue_3788`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 128 vs reference 68 (no whitespaces: +60, formatted: +88)

```js
var a = 'FAIL';
function f() {
	function g() {
		function h() {
			a = 42;
			a = 'PASS';
			return 'PASS';
		}
		var b = h();
		console.log(b);
	}
	g();
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,12 @@
-var b, a = 'FAIL';
-a = 42, a = 'PASS', b = 'PASS', console.log(b), console.log(a);
+var a = 'FAIL';
+function f() {
+	function g() {
+		function h() {
+			return a = 42, a = 'PASS', 'PASS';
+		}
+		var b = h();
+		console.log(b);
+	}
+	g();
+}
+f(), console.log(a);

```

## `uglify/join_vars/join_object_assignments_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 79 vs reference 19 (no whitespaces: +60, formatted: +78)

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

## `uglify/reduce_vars/redefine_farg_2`

- tags: `join vars`, `remove unused`
- size: oxc 128 vs reference 68 (no whitespaces: +60, formatted: +71)

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
@@ -1,4 +1,11 @@
-console.log(typeof [], 'number', function(a, b) {
-	a = b;
+function f(a) {
+	var a;
 	return typeof a;
-}());
+}
+function g(a) {
+	return 'number';
+}
+function h(a, b) {
+	return typeof b;
+}
+console.log(f([]), g([]), h([]));

```

## `uglify/pure_funcs/arithmetic`

- tags: `pure functions`
- size: oxc 98 vs reference 36 (no whitespaces: +62, formatted: +80)

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

## `uglify/rename/issue_5787_2`

- size: oxc 139 vs reference 77 (no whitespaces: +62, formatted: +57)

```js
console.log(function() {
	let a = 42;
	switch (a) {
		case 42:
			// Node.js v4 (vm): SyntaxError: Identifier 'a' has already been declared
			let a = 'PASS';
			return a;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 console.log(function() {
 	let a = 42;
-	switch (a) {
-		case 42:
-			let b = 'PASS';
-			return b;
+	{
+		// Node.js v4 (vm): SyntaxError: Identifier 'a' has already been declared
+		let a = 'PASS';
+		return 'PASS';
 	}
 }());

```

## `uglify/typeof/typeof_defun_2`

- tags: `join vars`
- size: oxc 136 vs reference 74 (no whitespaces: +62, formatted: +74)

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

## `uglify/conditionals/delete_conditional_1`

- tags: `sequences`
- size: oxc 159 vs reference 96 (no whitespaces: +63, formatted: +68)

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
@@ -1,6 +1 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete void 0), console.log(delete void 0), console.log(delete (0, Infinity)), console.log(delete (1 / 0)), console.log(delete NaN), console.log(delete NaN);

```

## `uglify/conditionals/delete_conditional_2`

- tags: `sequences`
- size: oxc 159 vs reference 96 (no whitespaces: +63, formatted: +68)

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
@@ -1,6 +1 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete void 0), console.log(delete void 0), console.log(delete (0, Infinity)), console.log(delete (1 / 0)), console.log(delete NaN), console.log(delete NaN);

```

## `uglify/evaluate/delete_binary_1`

- size: oxc 159 vs reference 96 (no whitespaces: +63, formatted: +68)

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

## `uglify/evaluate/delete_binary_2`

- size: oxc 159 vs reference 96 (no whitespaces: +63, formatted: +68)

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

## `uglify/hoist_props/issue_3071_2`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 80 vs reference 17 (no whitespaces: +63, formatted: +79)

```js
(function() {
	obj = {};
	obj.one = 1;
	obj.two = 2;
	console.log(obj.one, obj.two);
	var obj;
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(1, 2);
+(function() {
+	obj = {}, obj.one = 1, obj.two = 2, console.log(obj.one, obj.two);
+	var obj;
+})();

```

## `uglify/hoist_props/issue_3071_2_toplevel`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 80 vs reference 17 (no whitespaces: +63, formatted: +79)

```js
(function() {
	obj = {};
	obj.one = 1;
	obj.two = 2;
	console.log(obj.one, obj.two);
	var obj;
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(1, 2);
+(function() {
+	obj = {}, obj.one = 1, obj.two = 2, console.log(obj.one, obj.two);
+	var obj;
+})();

```

## `uglify/functions/issue_2620_3`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 101 vs reference 37 (no whitespaces: +64, formatted: +92)

```js
var c = 'FAIL';
(function() {
	function f(a) {
		var b = function g(a) {
			a && a();
		}();
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
-c = 'PASS', console.log(c);
+(function() {
+	function f(a) {
+		(function(a) {
+			a && a();
+		})(), a && (c = 'PASS');
+	}
+	f(1);
+})(), console.log(c);

```

## `uglify/hoist_props/issue_2519`

- tags: `join vars`, `remove unused`
- size: oxc 125 vs reference 61 (no whitespaces: +64, formatted: +83)

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
-	return +((6 + 5) / 2);
+	var dimensions = {
+		minX: 5,
+		maxX: 6
+	};
+	return { x: (dimensions.maxX + dimensions.minX) / 2 }.x * 1;
 }
 console.log(testFunc());

```

## `uglify/awaits/inline_await_1_trim`

- tags: `join vars`, `remove unused`
- size: oxc 87 vs reference 22 (no whitespaces: +65, formatted: +79)

```js
(async function() {
	async function f() {
		await 42;
	}
	return await f();
})();
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,7 @@
-0;
+(async function() {
+	async function f() {
+		await 42;
+	}
+	return await f();
+})();
 console.log('PASS');

```

## `uglify/functions/reduce_cross_reference_1`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 65 vs reference 0 (no whitespaces: +65, formatted: +89)

```js
(function(a, b) {
	a = b = function() {};
	a.p = a;
	b = a = function() {};
	b.q = b;
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+(function(a, b) {
+	a = b = function() {}, a.p = a, b = a = function() {}, b.q = b;
+})();

```

## `uglify/functions/reduce_cross_reference_2`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 65 vs reference 0 (no whitespaces: +65, formatted: +89)

```js
(function(a, b) {
	a = b = function() {};
	b.p = a;
	b = a = function() {};
	a.q = b;
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+(function(a, b) {
+	a = b = function() {}, b.p = a, b = a = function() {}, a.q = b;
+})();

```

## `uglify/functions/reduce_cross_reference_3`

- tags: `join vars`, `sequences`, `remove unused`, `4 iterations`
- size: oxc 65 vs reference 0 (no whitespaces: +65, formatted: +89)

```js
(function(a, b) {
	a = b = function() {};
	a.p = b;
	b = a = function() {};
	b.q = a;
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+(function(a, b) {
+	a = b = function() {}, a.p = b, b = a = function() {}, b.q = a;
+})();

```

## `uglify/functions/reduce_cross_reference_4`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 65 vs reference 0 (no whitespaces: +65, formatted: +89)

```js
(function(a, b) {
	a = b = function() {};
	b.p = b;
	b = a = function() {};
	a.q = a;
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+(function(a, b) {
+	a = b = function() {}, b.p = b, b = a = function() {}, a.q = a;
+})();

```

## `uglify/arguments/modified`

- size: oxc 163 vs reference 97 (no whitespaces: +66, formatted: +66)

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

## `uglify/annotations/inline_pure_call_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 67 vs reference 0 (no whitespaces: +67, formatted: +83)

```js
var f = function(a) {
	return function(b) {
		console.log(b);
	}(a);
};
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+var f = function(a) {
+	return function(b) {
+		console.log(b);
+	}(a);
+};
+f('PASS');

```

## `uglify/rests/issue_4644_2`

- size: oxc 128 vs reference 60 (no whitespaces: +68, formatted: +79)

```js
console.log(function(...a) {
	return a[1];
}('FAIL', 'PASS'), function(...b) {
	return b.length;
}(), function(c, ...d) {
	return d[0];
}('FAIL'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-console.log('PASS', 0, function(c, ...d) {
+console.log(function(...a) {
+	return a[1];
+}('FAIL', 'PASS'), function(...b) {
+	return b.length;
+}(), function(c, ...d) {
 	return d[0];
 }('FAIL'));

```

## `uglify/annotations/inline_pure_call_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 69 vs reference 0 (no whitespaces: +69, formatted: +87)

```js
var f = function(a) {
	return function(b) {
		console.log(b);
	}(a);
};
var a = f('PASS');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+var f = function(a) {
+	return function(b) {
+		console.log(b);
+	}(a);
+}, a = f('PASS');

```

## `uglify/collapse_vars/collapse_vars_eval_and_with`

- tags: `join vars`, `remove unused`
- size: oxc 272 vs reference 203 (no whitespaces: +69, formatted: +69)

```js
// Don't attempt to collapse vars in presence of eval() or with statement.
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
@@ -1,13 +1,14 @@
+// Don't attempt to collapse vars in presence of eval() or with statement.
 (function f0() {
 	var a = 2;
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

## `uglify/collapse_vars/issue_2437_1`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 417 vs reference 348 (no whitespaces: +69, formatted: +93)

```js
function foo() {
	return bar();
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
console.log(foo());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,14 @@
-var req, detectFunc, result;
-console.log((xhrDesc ? (result = !!(req = new XMLHttpRequest()).onreadystatechange, Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {})) : ((req = new XMLHttpRequest()).onreadystatechange = detectFunc = function() {}, result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc, req.onreadystatechange = null), result));
+function foo() {
+	return bar();
+}
+function bar() {
+	if (xhrDesc) {
+		var req = new XMLHttpRequest(), result = !!req.onreadystatechange;
+		return Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {}), result;
+	}
+	var req = new XMLHttpRequest(), detectFunc = function() {};
+	req.onreadystatechange = detectFunc;
+	var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
+	return req.onreadystatechange = null, result;
+}
+console.log(foo());

```

## `uglify/drop-unused/drop_toplevel_keep_assign`

- tags: `remove unused`
- size: oxc 100 vs reference 31 (no whitespaces: +69, formatted: +91)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,10 @@
-var a, b = 1;
+var a, b = 1, c = g;
+function f(d) {
+	return function() {
+		c = 2;
+	};
+}
 a = 2;
+function g() {}
+function h() {}
 console.log(b = 3);

```

## `uglify/functions/inline_use_strict`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 91 vs reference 22 (no whitespaces: +69, formatted: +91)

```js
console.log(function() {
	'use strict';
	return function() {
		'use strict';
		var a = 'foo';
		a += 'bar';
		return a;
	};
}()());

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-console.log('foobar');
+console.log(function() {
+	'use strict';
+	return function() {
+		var a = 'foo';
+		return a += 'bar', a;
+	};
+}()());

```

## `uglify/functions/issue_2437`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 417 vs reference 348 (no whitespaces: +69, formatted: +93)

```js
function foo() {
	return bar();
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
console.log(foo());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,14 @@
-var req, detectFunc, result;
-console.log((xhrDesc ? (result = !!(req = new XMLHttpRequest()).onreadystatechange, Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {})) : ((req = new XMLHttpRequest()).onreadystatechange = detectFunc = function() {}, result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc, req.onreadystatechange = null), result));
+function foo() {
+	return bar();
+}
+function bar() {
+	if (xhrDesc) {
+		var req = new XMLHttpRequest(), result = !!req.onreadystatechange;
+		return Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {}), result;
+	}
+	var req = new XMLHttpRequest(), detectFunc = function() {};
+	req.onreadystatechange = detectFunc;
+	var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
+	return req.onreadystatechange = null, result;
+}
+console.log(foo());

```

## `uglify/properties/native_prototype`

- size: oxc 267 vs reference 197 (no whitespaces: +70, formatted: +69)

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

## `uglify/reduce_vars/modified`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 562 vs reference 492 (no whitespaces: +70, formatted: +112)

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
@@ -1,41 +1,24 @@
 function f0() {
-	var b = 2;
-	+b;
-	console.log(2);
-	console.log(4);
+	var a = 1, b = 2;
+	b++, console.log(a + 1), console.log(b + 1);
 }
 function f1() {
-	var b = 2;
-	--b;
-	console.log(2);
-	console.log(2);
+	var a = 1, b = 2;
+	--b, console.log(a + 1), console.log(b + 1);
 }
 function f2() {
-	3;
-	console.log(4);
-	console.log(6);
-	console.log(4);
-	console.log(7);
+	var a = 1, b = 2, c = 3;
+	b = c, console.log(a + b), console.log(b + c), console.log(a + c), console.log(a + b + c);
 }
 function f3() {
-	var b = 2;
-	b *= 3;
-	console.log(7);
-	console.log(9);
-	console.log(4);
-	console.log(10);
+	var a = 1, b = 2, c = 3;
+	b *= c, console.log(a + b), console.log(b + c), console.log(a + c), console.log(a + b + c);
 }
 function f4() {
-	var b = 2, c = 3;
-	1, b = c;
-	console.log(1 + b);
-	console.log(b + c);
-	console.log(1 + c);
-	console.log(1 + b + c);
+	var a = 1, b = 2, c = 3;
+	a ? b = c : c = b, console.log(a + b), console.log(b + c), console.log(a + c), console.log(a + b + c);
 }
 function f5(a) {
-	B = a;
-	console.log(typeof A ? 'yes' : 'no');
-	console.log(typeof B ? 'yes' : 'no');
+	B = a, console.log(typeof A ? 'yes' : 'no'), console.log(typeof B ? 'yes' : 'no');
 }
 f0(), f1(), f2(), f3(), f4(), f5();

```

## `uglify/reduce_vars/obj_arg_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 86 vs reference 15 (no whitespaces: +71, formatted: +90)

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
@@ -1 +1,7 @@
-console.log(2);
+var C = 1;
+function f(obj) {
+	return obj.bar();
+}
+console.log(f({ bar: function() {
+	return C + C;
+} }));

```

## `uglify/evaluate/unsafe_float_key`

- size: oxc 125 vs reference 53 (no whitespaces: +72, formatted: +92)

```js
console.log({ 2.72: 1 } + 1, { 2.72: 1 }[2.72] + 1, { 2.72: 1 }['2.72'] + 1, { 2.72: 1 }[3.14] + 1, { 2.72: 1 }[2.72][3.14] + 1, { 2.72: 1 }[2.72]['3.14'] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log({ 2.72: 1 } + 1, 2, 2, { 2.72: 1 }[3.14] + 1, NaN, NaN);
+console.log({ 2.72: 1 } + 1, { 2.72: 1 }[2.72] + 1, { 2.72: 1 }['2.72'] + 1, { 2.72: 1 }[3.14] + 1, { 2.72: 1 }[2.72][3.14] + 1, { 2.72: 1 }[2.72]['3.14'] + 1);

```

## `uglify/if_return/if_return_8`

- tags: `sequences`
- size: oxc 340 vs reference 268 (no whitespaces: +72, formatted: +72)

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

## `uglify/sequences/delete_seq_1`

- size: oxc 168 vs reference 96 (no whitespaces: +72, formatted: +81)

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

## `uglify/sequences/delete_seq_2`

- size: oxc 168 vs reference 96 (no whitespaces: +72, formatted: +81)

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

## `uglify/sequences/delete_seq_3`

- size: oxc 168 vs reference 96 (no whitespaces: +72, formatted: +81)

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

## `uglify/join_vars/typescript_enum`

- tags: `join vars`, `sequences`, `remove unused`, `4 iterations`
- size: oxc 96 vs reference 23 (no whitespaces: +73, formatted: +86)

```js
var Enum;
(function(Enum) {
	Enum[Enum.PASS = 42] = 'PASS';
})(Enum || (Enum = {}));
console.log(Enum[42], Enum.PASS);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS', 42);
+var Enum;
+(function(Enum) {
+	Enum[Enum.PASS = 42] = 'PASS';
+})(Enum ||= {}), console.log(Enum[42], Enum.PASS);

```

## `uglify/functions/issue_5249_2`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 127 vs reference 53 (no whitespaces: +74, formatted: +91)

```js
console.log(function() {
	if (!console) var a = 'FAIL 1';
	else return void (a && function() {
		while (console.log('FAIL 2'));
	}());
	throw 'FAIL 3';
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 console.log(function() {
-	if (!console) throw 'FAIL 3';
+	if (console) return void (a && function() {
+		for (; console.log('FAIL 2'););
+	}());
+	var a = 'FAIL 1';
+	throw 'FAIL 3';
 }());

```

## `uglify/functions/function_returning_constant_literal`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 102 vs reference 27 (no whitespaces: +75, formatted: +88)

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

## `uglify/functions/pr_3592_1`

- tags: `join vars`, `remove unused`
- size: oxc 220 vs reference 145 (no whitespaces: +75, formatted: +85)

```js
function problem(w) {
	return g.indexOf(w);
}
function unused(x) {
	return problem(x);
}
function B(problem) {
	return g[problem];
}
function A(y) {
	return problem(y);
}
function main(z) {
	return B(A(z));
}
var g = ['PASS'];
console.log(main('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,17 @@
 function problem(w) {
 	return g.indexOf(w);
 }
+function unused(x) {
+	return problem(x);
+}
 function B(problem) {
 	return g[problem];
 }
+function A(y) {
+	return problem(y);
+}
+function main(z) {
+	return B(A(z));
+}
 var g = ['PASS'];
-console.log((z = 'PASS', B((y = z, problem(y)))));
-var z, y;
+console.log(main('PASS'));

```

## `uglify/reduce_vars/issue_3110_2`

- tags: `join vars`, `sequences`, `remove unused`, `4 iterations`
- size: oxc 113 vs reference 38 (no whitespaces: +75, formatted: +99)

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
@@ -1 +1,7 @@
-console.log('foo'), console.log('foo');
+(function() {
+	function foo() {
+		return isDev ? 'foo' : 'bar';
+	}
+	var isDev = !0;
+	console.log(foo()), console.log({ foo }.foo());
+})();

```

## `uglify/reduce_vars/issues_3267_3`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 95 vs reference 20 (no whitespaces: +75, formatted: +98)

```js
(function(x) {
	x();
})(function() {
	(function(i) {
		if (i) return console.log('PASS');
		throw 'FAIL';
	})(Object());
});

```

```diff
--- reference
+++ oxc
@@ -1 +1,8 @@
-console.log('PASS');
+(function(x) {
+	x();
+})(function() {
+	(function(i) {
+		if (i) return console.log('PASS');
+		throw 'FAIL';
+	})({});
+});

```

## `uglify/regexp/issue_3434_1`

- size: oxc 240 vs reference 165 (no whitespaces: +75, formatted: +76)

```js
var o = {
	'\n': RegExp('\n'),
	'\r': RegExp('\r'),
	'	': RegExp('	'),
	'\b': RegExp('\b'),
	'\f': RegExp('\f'),
	'\0': RegExp('\0'),
	'\v': RegExp('\v'),
	'\u2028': RegExp('\u2028'),
	'\u2029': RegExp('\u2029')
};
for (var c in o) console.log(o[c].test('\\'), o[c].test(c));

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var o = {
-	'\n': /\n/,
-	'\r': /\r/,
-	'	': /	/,
-	'\b': //,
-	'\f': //,
-	'\0': / /,
-	'\v': //,
-	'\u2028': /\u2028/,
-	'\u2029': /\u2029/
+	'\n': RegExp('\n'),
+	'\r': RegExp('\r'),
+	'	': RegExp('	'),
+	'\b': RegExp('\b'),
+	'\f': RegExp('\f'),
+	'\0': RegExp('\0'),
+	'\v': RegExp('\v'),
+	'\u2028': RegExp('\u2028'),
+	'\u2029': RegExp('\u2029')
 };
 for (var c in o) console.log(o[c].test('\\'), o[c].test(c));

```

## `uglify/functions/issue_4612_1`

- tags: `join vars`, `remove unused`
- size: oxc 96 vs reference 20 (no whitespaces: +76, formatted: +101)

```js
console.log(function() {
	function f() {
		return g();
	}
	function g(a) {
		return a || f();
	}
	return g('PASS');
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log('PASS');
+console.log(function() {
+	function f() {
+		return g();
+	}
+	function g(a) {
+		return a || f();
+	}
+	return g('PASS');
+}());

```

## `uglify/global_defs/expanded`

- size: oxc 223 vs reference 147 (no whitespaces: +76, formatted: +73)

```js
function f(CONFIG) {
	// CONFIG not global - do not replace
	return CONFIG.VALUE;
}
function g() {
	var CONFIG = { VALUE: 1 };
	// CONFIG not global - do not replace
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
@@ -1,11 +1,12 @@
 function f(CONFIG) {
+	// CONFIG not global - do not replace
 	return CONFIG.VALUE;
 }
 function g() {
-	var CONFIG = { VALUE: 1 };
-	return CONFIG.VALUE;
+	// CONFIG not global - do not replace
+	return { VALUE: 1 }.VALUE;
 }
 function h() {
-	return 42;
+	return CONFIG.VALUE;
 }
-if ([0][0]) console.debug('foo');
+CONFIG.DEBUG[0] && console.debug('foo');

```

## `uglify/collapse_vars/collapse_vars_misc`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 553 vs reference 476 (no whitespaces: +77, formatted: +109)

```js
function f0(o, a, h) {
	var b = 3 - a;
	var obj = o;
	var seven = 7;
	var prop = 'run';
	var t = obj[prop](b)[seven] = h;
	return t;
}
function f1(x) {
	var y = 5 - x;
	return y;
}
function f2(x) {
	var z = foo(), y = z / (5 - x);
	return y;
}
function f3(x) {
	var z = foo(), y = (5 - x) / z;
	return y;
}
function f4(x) {
	var z = foo(), y = (5 - u) / z;
	return y;
}
function f5(x) {
	var z = foo(), y = (5 - window.x) / z;
	return y;
}
function f6() {
	var b = window.a * window.z;
	return b && zap();
}
function f7() {
	var b = window.a * window.z;
	return b + b;
}
function f8() {
	var b = window.a * window.z;
	var c = b + 5;
	return b + c;
}
function f9() {
	var b = window.a * window.z;
	return bar() || b;
}
function f10(x) {
	var a = 5, b = 3;
	return a += b;
}
function f11(x) {
	var a = 5, b = 3;
	return a += --b;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f0(o, a, h) {
-	return o.run(3 - a)[7] = h;
+	var b = 3 - a, obj = o, seven = 7, prop = 'run';
+	return obj[prop](b)[seven] = h;
 }
 function f1(x) {
 	return 5 - x;
@@ -8,7 +9,8 @@
 	return foo() / (5 - x);
 }
 function f3(x) {
-	return (5 - x) / foo();
+	var z = foo();
+	return (5 - x) / z;
 }
 function f4(x) {
 	var z = foo();
@@ -27,15 +29,17 @@
 }
 function f8() {
 	var b = window.a * window.z;
-	return b + (5 + b);
+	return b + (b + 5);
 }
 function f9() {
 	var b = window.a * window.z;
 	return bar() || b;
 }
 function f10(x) {
-	return 8;
+	var a = 5;
+	return a += 3;
 }
 function f11(x) {
-	return 7;
+	var a = 5, b = 3;
+	return a += --b;
 }

```

## `uglify/functions/issue_4612_2`

- tags: `join vars`, `remove unused`
- size: oxc 98 vs reference 20 (no whitespaces: +78, formatted: +103)

```js
console.log(function() {
	function fn() {
		return h();
	}
	function g() {
		return fn();
	}
	function h(a) {
		return a || fn();
	}
	return h('PASS');
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log('PASS');
+console.log(function() {
+	function fn() {
+		return h();
+	}
+	function h(a) {
+		return a || fn();
+	}
+	return h('PASS');
+}());

```

## `uglify/functions/issue_2531_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 164 vs reference 85 (no whitespaces: +79, formatted: +101)

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

## `uglify/side_effects/issue_2233_1`

- size: oxc 79 vs reference 0 (no whitespaces: +79, formatted: +85)

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

## `uglify/issue-1261/pure_function_calls`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 181 vs reference 101 (no whitespaces: +80, formatted: +81)

```js
// pure top-level IIFE will be dropped
(function() {
	console.log('iife0');
})();
// pure top-level IIFE assigned to unreferenced var will not be dropped
var iife1 = (function() {
	console.log('iife1');
	function iife1() {}
	return iife1;
})();
(function() {
	// pure IIFE in function scope assigned to unreferenced var will be dropped
	var iife2 = (function() {
		console.log('iife2');
		function iife2() {}
		return iife2;
	})();
})();
// comment #__PURE__ comment
bar(), baz(), quux();
a.b(), c.d.e(), f.g();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var iife1 = function() {
+// pure top-level IIFE assigned to unreferenced var will not be dropped
+var iife1 = (function() {
 	console.log('iife1');
 	function iife1() {}
 	return iife1;
-}();
-baz(), quux();
-a.b(), f.g();
+})();
+bar(), baz(), quux(), a.b(), f.g();

```

## `uglify/global_defs/object`

- size: oxc 223 vs reference 142 (no whitespaces: +81, formatted: +78)

```js
function f(CONFIG) {
	// CONFIG not global - do not replace
	return CONFIG.VALUE;
}
function g() {
	var CONFIG = { VALUE: 1 };
	// CONFIG not global - do not replace
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
@@ -1,11 +1,12 @@
 function f(CONFIG) {
+	// CONFIG not global - do not replace
 	return CONFIG.VALUE;
 }
 function g() {
-	var CONFIG = { VALUE: 1 };
-	return CONFIG.VALUE;
+	// CONFIG not global - do not replace
+	return { VALUE: 1 }.VALUE;
 }
 function h() {
-	return 42;
+	return CONFIG.VALUE;
 }
-if (0) console.debug('foo');
+CONFIG.DEBUG[0] && console.debug('foo');

```

## `uglify/arrays/constant_join_2`

- size: oxc 409 vs reference 327 (no whitespaces: +82, formatted: +148)

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

## `uglify/functions/substitute`

- tags: `join vars`
- size: oxc 346 vs reference 264 (no whitespaces: +82, formatted: +113)

```js
var o = {};
function f(a) {
	return a === o ? 'PASS' : 'FAIL';
}
[
	function() {
		return f;
	},
	function() {
		return function(b) {
			return f(b);
		};
	},
	function() {
		'use strict';
		return function(c) {
			return f(c);
		};
	},
	function() {
		return function(c) {
			'use strict';
			return f(c);
		};
	},
	function() {
		return function(d, e) {
			return f(d, e);
		};
	}
].forEach(function(g) {
	console.log(g()(o), g().call(o, o), g().length);
});

```

```diff
--- reference
+++ oxc
@@ -7,14 +7,21 @@
 		return f;
 	},
 	function() {
-		return f;
+		return function(b) {
+			return f(b);
+		};
 	},
 	function() {
 		'use strict';
-		return f;
+		return function(c) {
+			return f(c);
+		};
 	},
 	function() {
-		return f;
+		return function(c) {
+			'use strict';
+			return f(c);
+		};
 	},
 	function() {
 		return function(d, e) {

```

## `uglify/functions/substitute_drop_farg`

- tags: `join vars`
- size: oxc 335 vs reference 253 (no whitespaces: +82, formatted: +113)

```js
var o = {};
function f(a) {
	return a === o ? 'PASS' : 'FAIL';
}
[
	function() {
		return f;
	},
	function() {
		return function(b) {
			return f(b);
		};
	},
	function() {
		'use strict';
		return function(c) {
			return f(c);
		};
	},
	function() {
		return function(c) {
			'use strict';
			return f(c);
		};
	},
	function() {
		return function(d, e) {
			return f(d, e);
		};
	}
].forEach(function(g) {
	console.log(g()(o), g().call(o, o));
});

```

```diff
--- reference
+++ oxc
@@ -7,14 +7,21 @@
 		return f;
 	},
 	function() {
-		return f;
+		return function(b) {
+			return f(b);
+		};
 	},
 	function() {
 		'use strict';
-		return f;
+		return function(c) {
+			return f(c);
+		};
 	},
 	function() {
-		return f;
+		return function(c) {
+			'use strict';
+			return f(c);
+		};
 	},
 	function() {
 		return function(d, e) {

```

## `uglify/functions/substitute_use_strict`

- tags: `join vars`
- size: oxc 359 vs reference 277 (no whitespaces: +82, formatted: +113)

```js
var o = {};
function f(a) {
	'use strict';
	return a === o ? 'PASS' : 'FAIL';
}
[
	function() {
		return f;
	},
	function() {
		return function(b) {
			return f(b);
		};
	},
	function() {
		'use strict';
		return function(c) {
			return f(c);
		};
	},
	function() {
		return function(c) {
			'use strict';
			return f(c);
		};
	},
	function() {
		return function(d, e) {
			return f(d, e);
		};
	}
].forEach(function(g) {
	console.log(g()(o), g().call(o, o), g().length);
});

```

```diff
--- reference
+++ oxc
@@ -8,14 +8,21 @@
 		return f;
 	},
 	function() {
-		return f;
+		return function(b) {
+			return f(b);
+		};
 	},
 	function() {
 		'use strict';
-		return f;
+		return function(c) {
+			return f(c);
+		};
 	},
 	function() {
-		return f;
+		return function(c) {
+			'use strict';
+			return f(c);
+		};
 	},
 	function() {
 		return function(d, e) {

```

## `uglify/drop-unused/delete_assign_1`

- tags: `remove unused`
- size: oxc 179 vs reference 96 (no whitespaces: +83, formatted: +104)

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
@@ -1,6 +1,7 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+var a;
+console.log(delete (a = void 0));
+console.log(delete (a = void 0));
+console.log(delete (a = Infinity));
+console.log(delete (a = 1 / 0));
+console.log(delete (a = NaN));
+console.log(delete (a = NaN));

```

## `uglify/drop-unused/delete_assign_2`

- tags: `remove unused`
- size: oxc 179 vs reference 96 (no whitespaces: +83, formatted: +104)

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
@@ -1,6 +1,7 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+var a;
+console.log(delete (a = void 0));
+console.log(delete (a = void 0));
+console.log(delete (a = Infinity));
+console.log(delete (a = 1 / 0));
+console.log(delete (a = NaN));
+console.log(delete (a = NaN));

```

## `uglify/drop-unused/drop_toplevel_all`

- tags: `remove unused`
- size: oxc 100 vs reference 17 (no whitespaces: +83, formatted: +113)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,10 @@
-2;
-console.log(3);
+var a, b = 1, c = g;
+function f(d) {
+	return function() {
+		c = 2;
+	};
+}
+a = 2;
+function g() {}
+function h() {}
+console.log(b = 3);

```

## `uglify/reduce_vars/issue_3110_1`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 121 vs reference 38 (no whitespaces: +83, formatted: +110)

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
@@ -1 +1,7 @@
-console.log('foo'), console.log('foo');
+(function() {
+	function foo() {
+		return isDev ? 'foo' : 'bar';
+	}
+	var isDev = !0, obj = { foo };
+	console.log(foo()), console.log(obj.foo());
+})();

```

## `uglify/functions/inner_ref`

- tags: `remove unused`
- size: oxc 106 vs reference 22 (no whitespaces: +84, formatted: +108)

```js
console.log(function(a) {
	return function() {
		return a;
	}();
}(1), function(a) {
	return function(a) {
		return a;
	}();
}(2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(1, void 0);
+console.log(function(a) {
+	return function() {
+		return a;
+	}();
+}(1), function(a) {
+	return function(a) {
+		return a;
+	}();
+}(2));

```

## `uglify/hoist_props/issue_2377_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 117 vs reference 33 (no whitespaces: +84, formatted: +112)

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
@@ -1,2 +1,11 @@
-console.log(1, (x = 3, x * x * x));
-var x;
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

## `uglify/functions/issue_2601_2`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 122 vs reference 37 (no whitespaces: +85, formatted: +125)

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

## `uglify/functions/issue_3400_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 192 vs reference 107 (no whitespaces: +85, formatted: +128)

```js
(function(f) {
	console.log(f()()[0].p);
})(function() {
	function g() {
		function h(u) {
			var o = { p: u };
			return console.log(o[g]), o;
		}
		function e() {
			return [42].map(function(v) {
				return h(v);
			});
		}
		return e();
	}
	return g;
});

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,17 @@
-void console.log(function g() {
-	return [42].map(function(u) {
-		var o = { p: u };
-		return console.log(o[g]), o;
-	});
-}()[0].p);
+(function(f) {
+	console.log(f()()[0].p);
+})(function() {
+	function g() {
+		function h(u) {
+			var o = { p: u };
+			return console.log(o[g]), o;
+		}
+		function e() {
+			return [42].map(function(v) {
+				return h(v);
+			});
+		}
+		return e();
+	}
+	return g;
+});

```

## `uglify/reduce_vars/defun_call`

- tags: `join vars`, `remove unused`
- size: oxc 100 vs reference 15 (no whitespaces: +85, formatted: +113)

```js
console.log(function f() {
	return g() + h(1) - h(g(), 2, 3);
	function g() {
		return 4;
	}
	function h(a) {
		return a;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(1);
+console.log(function() {
+	return g() + h(1) - h(g(), 2, 3);
+	function g() {
+		return 4;
+	}
+	function h(a) {
+		return a;
+	}
+}());

```

## `uglify/reduce_vars/redefine_farg_3`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 128 vs reference 43 (no whitespaces: +85, formatted: +106)

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
-console.log(typeof [], 'number', 'undefined');
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

## `uglify/functions/issue_2084`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 124 vs reference 38 (no whitespaces: +86, formatted: +136)

```js
var c = 0;
!function() {
	!function(c) {
		c = 1 + c;
		var c = 0;
		function f14(a_1) {
			if (c = 1 + c, 0 !== 23 .toString()) c = 1 + c, a_1 && (a_1[0] = 0);
		}
		f14();
	}(-1);
}();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,11 @@
 var c = 0;
-23 .toString(), console.log(c);
+(function() {
+	(function(c) {
+		c = 1 + c;
+		var c = 0;
+		function f14(a_1) {
+			c = 1 + c, c = 1 + c, a_1 && (a_1[0] = 0);
+		}
+		f14();
+	})(-1);
+})(), console.log(c);

```

## `uglify/functions/pr_3592_2`

- tags: `join vars`, `remove unused`
- size: oxc 220 vs reference 134 (no whitespaces: +86, formatted: +101)

```js
function problem(w) {
	return g.indexOf(w);
}
function unused(x) {
	return problem(x);
}
function B(problem) {
	return g[problem];
}
function A(y) {
	return problem(y);
}
function main(z) {
	return B(A(z));
}
var g = ['PASS'];
console.log(main('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,17 @@
 function problem(w) {
 	return g.indexOf(w);
 }
-var g = ['PASS'];
-console.log((z = 'PASS', function(problem) {
+function unused(x) {
+	return problem(x);
+}
+function B(problem) {
 	return g[problem];
-}(problem(z))));
-var z;
+}
+function A(y) {
+	return problem(y);
+}
+function main(z) {
+	return B(A(z));
+}
+var g = ['PASS'];
+console.log(main('PASS'));

```

## `uglify/functions/pr_3595_1`

- tags: `join vars`, `remove unused`
- size: oxc 230 vs reference 144 (no whitespaces: +86, formatted: +101)

```js
var g = ['PASS'];
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
console.log(c('PASS'));

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,16 @@
 function problem(arg) {
 	return g.indexOf(arg);
 }
-console.log((arg = 'PASS', function(problem) {
+function unused(arg) {
+	return problem(arg);
+}
+function a(arg) {
+	return problem(arg);
+}
+function b(problem) {
 	return g[problem];
-}(problem(arg))));
-var arg;
+}
+function c(arg) {
+	return b(a(arg));
+}
+console.log(c('PASS'));

```

## `uglify/side_effects/issue_2233_3`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 17 (no whitespaces: +88, formatted: +100)

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
@@ -1 +1,8 @@
+var RegExp;
+Array.isArray;
 UndeclaredGlobal;
+function foo() {
+	var Number;
+	AnotherUndeclaredGlobal;
+	Number.isNaN;
+}

```

## `uglify/regexp/issue_3434_2`

- size: oxc 258 vs reference 165 (no whitespaces: +93, formatted: +94)

```js
var o = {
	'\n': RegExp('\\\n'),
	'\r': RegExp('\\\r'),
	'	': RegExp('\\	'),
	'\b': RegExp('\\\b'),
	'\f': RegExp('\\\f'),
	'\0': RegExp('\\\0'),
	'\v': RegExp('\\\v'),
	'\u2028': RegExp('\\\u2028'),
	'\u2029': RegExp('\\\u2029')
};
for (var c in o) console.log(o[c].test('\\'), o[c].test(c));

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var o = {
-	'\n': /\n/,
-	'\r': /\r/,
-	'	': /	/,
-	'\b': //,
-	'\f': //,
-	'\0': / /,
-	'\v': //,
-	'\u2028': /\u2028/,
-	'\u2029': /\u2029/
+	'\n': RegExp('\\\n'),
+	'\r': RegExp('\\\r'),
+	'	': RegExp('\\	'),
+	'\b': RegExp('\\\b'),
+	'\f': RegExp('\\\f'),
+	'\0': RegExp('\\\0'),
+	'\v': RegExp('\\\v'),
+	'\u2028': RegExp('\\\u2028'),
+	'\u2029': RegExp('\\\u2029')
 };
 for (var c in o) console.log(o[c].test('\\'), o[c].test(c));

```

## `uglify/evaluate/unsafe_escaped`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 119 vs reference 20 (no whitespaces: +99, formatted: +118)

```js
(function(a) {
	console.log(function(index) {
		return a[index];
	}(function(term) {
		return a.indexOf(term);
	}('PASS')));
})(['PASS']);

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-console.log('PASS');
+(function(a) {
+	console.log(function(index) {
+		return a[index];
+	}(function(term) {
+		return a.indexOf(term);
+	}('PASS')));
+})(['PASS']);

```

## `uglify/hoist_props/issue_2377_3`

- tags: `join vars`, `remove unused`, `4 iterations`
- size: oxc 117 vs reference 18 (no whitespaces: +99, formatted: +135)

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

## `uglify/issue-1656/f7`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 124 vs reference 21 (no whitespaces: +103, formatted: +133)

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

## `uglify/functions/pr_3595_2`

- tags: `join vars`, `remove unused`
- size: oxc 230 vs reference 126 (no whitespaces: +104, formatted: +123)

```js
var g = ['PASS'];
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
console.log(c('PASS'));

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,16 @@
 function problem(arg) {
 	return g.indexOf(arg);
 }
-console.log(function(problem) {
+function unused(arg) {
+	return problem(arg);
+}
+function a(arg) {
+	return problem(arg);
+}
+function b(problem) {
 	return g[problem];
-}(problem('PASS')));
+}
+function c(arg) {
+	return b(a(arg));
+}
+console.log(c('PASS'));

```

## `uglify/reduce_vars/chained_assignments`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 129 vs reference 24 (no whitespaces: +105, formatted: +153)

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

## `uglify/loops/issue_2740_1`

- size: oxc 140 vs reference 32 (no whitespaces: +108, formatted: +132)

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

## `uglify/comparisons/nullish_inline`

- tags: `join vars`, `remove unused`
- size: oxc 143 vs reference 32 (no whitespaces: +111, formatted: +127)

```js
function isNull(a) {
	return null === a;
}
function isUndefined(b) {
	return void 0 === b;
}
null === c || void 0 === c;
isNull(c) || void 0 === c;
null === c || isUndefined(c);
isNull(c) || isUndefined(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-null == c;
-null == c;
-null == c;
-null == c;
+function isNull(a) {
+	return a === null;
+}
+function isUndefined(b) {
+	return b === void 0;
+}
+c;
+isNull(c) || c;
+c === null || isUndefined(c);
+isNull(c) || isUndefined(c);

```

## `uglify/comparisons/nullish_inline_renamed`

- tags: `join vars`, `remove unused`
- size: oxc 143 vs reference 32 (no whitespaces: +111, formatted: +127)

```js
function isNull(a) {
	return null === a;
}
function isUndefined(b) {
	return void 0 === b;
}
null === c || void 0 === c;
isNull(c) || void 0 === c;
null === c || isUndefined(c);
isNull(c) || isUndefined(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-null == c;
-null == c;
-null == c;
-null == c;
+function isNull(a) {
+	return a === null;
+}
+function isUndefined(b) {
+	return b === void 0;
+}
+c;
+isNull(c) || c;
+c === null || isUndefined(c);
+isNull(c) || isUndefined(c);

```

## `uglify/functions/issue_3297_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 386 vs reference 275 (no whitespaces: +111, formatted: +102)

```js
function function1(session) {
	var public = { processBulk };
	return public;
	function processBulk(bulk) {
		var subparam1 = session();
		function processOne(param1) {
			var param2 = { subparam1 };
			doProcessOne({
				param1,
				param2
			}, function() {
				processBulk(bulk);
			});
		}
		;
		if (bulk && bulk.length > 0) processOne(bulk.shift());
	}
	function doProcessOne(config, callback) {
		console.log(JSON.stringify(config));
		callback();
	}
}
function1(function session() {
	return 42;
}).processBulk([
	1,
	2,
	3
]);

```

```diff
--- reference
+++ oxc
@@ -1,20 +1,19 @@
-function function1(o) {
-	return { processBulk: function t(u) {
-		var r = o();
-		function n(n) {
-			var o = { subparam1: r };
-			c({
-				param1: n,
-				param2: o
+function function1(session) {
+	return { processBulk };
+	function processBulk(bulk) {
+		var subparam1 = session();
+		function processOne(param1) {
+			doProcessOne({
+				param1,
+				param2: { subparam1 }
 			}, function() {
-				t(u);
+				processBulk(bulk);
 			});
 		}
-		u && u.length > 0 && n(u.shift());
-	} };
-	function c(n, o) {
-		console.log(JSON.stringify(n));
-		o();
+		bulk && bulk.length > 0 && processOne(bulk.shift());
+	}
+	function doProcessOne(config, callback) {
+		console.log(JSON.stringify(config)), callback();
 	}
 }
 function1(function() {

```

## `uglify/collapse_vars/collapse_vars_issue_721`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 450 vs reference 333 (no whitespaces: +117, formatted: +152)

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

## `uglify/regexp/issue_3434_4`

- size: oxc 443 vs reference 325 (no whitespaces: +118, formatted: +118)

```js
[
	['', RegExp('')],
	['/', RegExp('/')],
	['//', RegExp('//')],
	['/', RegExp('\\/')],
	['///', RegExp('///')],
	['//', RegExp('/\\/')],
	['//', RegExp('\\//')],
	['\\/', RegExp('\\\\/')],
	['////', RegExp('////')],
	['///', RegExp('//\\/')],
	['///', RegExp('/\\//')],
	['/\\/', RegExp('/\\\\/')],
	['///', RegExp('\\///')],
	['//', RegExp('\\/\\/')],
	['\\//', RegExp('\\\\//')],
	['\\/', RegExp('\\\\\\/')]
].forEach(function(test) {
	console.log(test[1].test('\\'), test[1].test(test[0]));
});

```

```diff
--- reference
+++ oxc
@@ -1,20 +1,20 @@
 [
-	['', /(?:)/],
-	['/', /\//],
-	['//', /\/\//],
-	['/', /\//],
-	['///', /\/\/\//],
-	['//', /\/\//],
-	['//', /\/\//],
-	['\\/', /\\\//],
-	['////', /\/\/\/\//],
-	['///', /\/\/\//],
-	['///', /\/\/\//],
-	['/\\/', /\/\\\//],
-	['///', /\/\/\//],
-	['//', /\/\//],
-	['\\//', /\\\/\//],
-	['\\/', /\\\//]
+	['', RegExp('')],
+	['/', RegExp('/')],
+	['//', RegExp('//')],
+	['/', RegExp('\\/')],
+	['///', RegExp('///')],
+	['//', RegExp('/\\/')],
+	['//', RegExp('\\//')],
+	['\\/', RegExp('\\\\/')],
+	['////', RegExp('////')],
+	['///', RegExp('//\\/')],
+	['///', RegExp('/\\//')],
+	['/\\/', RegExp('/\\\\/')],
+	['///', RegExp('\\///')],
+	['//', RegExp('\\/\\/')],
+	['\\//', RegExp('\\\\//')],
+	['\\/', RegExp('\\\\\\/')]
 ].forEach(function(test) {
 	console.log(test[1].test('\\'), test[1].test(test[0]));
 });

```

## `uglify/arrays/constant_join_3`

- size: oxc 378 vs reference 254 (no whitespaces: +124, formatted: +147)

```js
var foo, bar, baz;
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
@@ -1,17 +1,37 @@
 var foo, bar, baz;
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

## `uglify/collapse_vars/collapse_vars_unary`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 335 vs reference 210 (no whitespaces: +125, formatted: +124)

```js
function f0(o, p) {
	var x = o[p];
	return delete x;
}
function f1(n) {
	var k = !!n;
	return n > +k;
}
function f2(n) {
	// test unary with constant
	var k = 7;
	return k--;
}
function f3(n) {
	// test unary with constant
	var k = 7;
	return ++k;
}
function f4(n) {
	// test unary with non-constant
	var k = 8 - n;
	return k--;
}
function f5(n) {
	// test unary with non-constant
	var k = 9 - n;
	return ++k;
}

```

```diff
--- reference
+++ oxc
@@ -3,21 +3,25 @@
 	return delete x;
 }
 function f1(n) {
-	return +!!n < n;
+	return n > +!!n;
 }
 function f2(n) {
+	// test unary with constant
 	var k = 7;
 	return k--;
 }
 function f3(n) {
+	// test unary with constant
 	var k = 7;
 	return ++k;
 }
 function f4(n) {
+	// test unary with non-constant
 	var k = 8 - n;
 	return k--;
 }
 function f5(n) {
+	// test unary with non-constant
 	var k = 9 - n;
 	return ++k;
 }

```

## `uglify/typeof/typeof_defined_4`

- size: oxc 736 vs reference 609 (no whitespaces: +127, formatted: +165)

```js
'object' == typeof A && 'object' == typeof B && (A, B);
'object' == typeof A && 'object' != typeof B && (A, B);
'object' != typeof A && 'object' == typeof B && (A, B);
'object' != typeof A && 'object' != typeof B && (A, B);
'object' == typeof A && 'object' == typeof B || (A, B);
'object' == typeof A && 'object' != typeof B || (A, B);
'object' != typeof A && 'object' == typeof B || (A, B);
'object' != typeof A && 'object' != typeof B || (A, B);
'object' == typeof A || 'object' == typeof B && (A, B);
'object' == typeof A || 'object' != typeof B && (A, B);
'object' != typeof A || 'object' == typeof B && (A, B);
'object' != typeof A || 'object' != typeof B && (A, B);
'object' == typeof A || 'object' == typeof B || (A, B);
'object' == typeof A || 'object' != typeof B || (A, B);
'object' != typeof A || 'object' == typeof B || (A, B);
'object' != typeof A || 'object' != typeof B || (A, B);

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,16 @@
-// dropped
-'object' == typeof A && 'object' != typeof B && B;
-'object' != typeof A && 'object' == typeof B && A;
-'object' != typeof A && 'object' != typeof B && (A, B);
-'object' == typeof A && 'object' == typeof B || (A, B);
-'object' == typeof A && 'object' != typeof B || (A, B);
-'object' != typeof A && 'object' == typeof B || (A, B);
-'object' != typeof A && 'object' != typeof B || (A, B);
-'object' != typeof A && 'object' == typeof B && A;
-'object' != typeof A && 'object' != typeof B && (A, B);
-// dropped
-'object' == typeof A && 'object' != typeof B && B;
-'object' != typeof A && 'object' != typeof B && (A, B);
-'object' != typeof A && 'object' == typeof B && A;
-'object' == typeof A && 'object' != typeof B && B;
-// dropped
+typeof A == 'object' && typeof B == 'object' && (A, B);
+typeof A == 'object' && typeof B != 'object' && (A, B);
+typeof A != 'object' && typeof B == 'object' && (A, B);
+typeof A != 'object' && typeof B != 'object' && (A, B);
+typeof A == 'object' && typeof B == 'object' || (A, B);
+typeof A == 'object' && typeof B != 'object' || (A, B);
+typeof A != 'object' && typeof B == 'object' || (A, B);
+typeof A != 'object' && typeof B != 'object' || (A, B);
+typeof A == 'object' || typeof B == 'object' && (A, B);
+typeof A == 'object' || typeof B != 'object' && (A, B);
+typeof A != 'object' || typeof B == 'object' && (A, B);
+typeof A != 'object' || typeof B != 'object' && (A, B);
+typeof A == 'object' || typeof B == 'object' || (A, B);
+typeof A == 'object' || typeof B != 'object' || (A, B);
+typeof A != 'o
... [truncated]
```

## `uglify/concat-strings/concat_1`

- size: oxc 281 vs reference 153 (no whitespaces: +128, formatted: +128)

```js
var a = 'foo' + 'bar' + x() + 'moo' + 'foo' + y() + 'x' + 'y' + 'z' + q();
var b = 'foo' + 1 + x() + 2 + 'boo';
var c = 1 + x() + 2 + 'boo';
// this CAN'T safely be shortened to 1 + x() + "5boo"
var d = 1 + x() + 2 + 3 + 'boo';
var e = 1 + x() + 2 + 'X' + 3 + 'boo';
// be careful with concatenation with "\0" with octal-looking strings.
var f = '\0' + 360 + '\0' + 8 + '\0';

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var a = 'foobar' + x() + 'moofoo' + y() + 'xyz' + q();
-var b = 'foo1' + x() + '2boo';
+var b = 'foo1' + x() + 2 + 'boo';
 var c = 1 + x() + 2 + 'boo';
+// this CAN'T safely be shortened to 1 + x() + "5boo"
 var d = 1 + x() + 2 + 3 + 'boo';
 var e = 1 + x() + 2 + 'X3boo';
+// be careful with concatenation with "\0" with octal-looking strings.
 var f = '\x00360\x008\0';

```

## `uglify/collapse_vars/issue_2437_2`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 397 vs reference 268 (no whitespaces: +129, formatted: +164)

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
@@ -1,2 +1,14 @@
-var req;
-xhrDesc ? ((req = new XMLHttpRequest()).onreadystatechange, Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {})) : ((req = new XMLHttpRequest()).onreadystatechange = function() {}, req[SYMBOL_FAKE_ONREADYSTATECHANGE_1], req.onreadystatechange = null);
+function foo() {
+	bar();
+}
+function bar() {
+	if (xhrDesc) {
+		var req = new XMLHttpRequest(), result = !!req.onreadystatechange;
+		return Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {}), result;
+	}
+	var req = new XMLHttpRequest(), detectFunc = function() {};
+	req.onreadystatechange = detectFunc;
+	var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
+	return req.onreadystatechange = null, result;
+}
+foo();

```

## `uglify/typeof/typeof_defun_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 185 vs reference 55 (no whitespaces: +130, formatted: +162)

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

## `uglify/classes/issue_805_2`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 182 vs reference 51 (no whitespaces: +131, formatted: +157)

```js
'use strict';
(function(a) {
	class unused {}
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
@@ -1,2 +1,9 @@
 'use strict';
-console.log('foo'), console.log('bar');
+(function(a) {
+	class unused {}
+	return unused.prototype[a()] = 42, (unused.prototype.bar = function() {
+		console.log('bar');
+	})(), unused;
+})(function() {
+	return console.log('foo'), 'foo';
+});

```

## `uglify/drop-unused/issue_2105_1`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 191 vs reference 60 (no whitespaces: +131, formatted: +189)

```js
!function(factory) {
	factory();
}(function() {
	return function(fn) {
		fn()().prop();
	}(function() {
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
+	return function(fn) {
+		fn()().prop();
+	}(function() {
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

## `uglify/drop-unused/issue_2105_3`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 191 vs reference 60 (no whitespaces: +131, formatted: +190)

```js
!function(factory) {
	factory();
}(function() {
	return function(fn) {
		fn()().prop();
	}(function() {
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
@@ -1,3 +1,17 @@
-({ prop: function() {
-	console.log, console.log('PASS');
-} }).prop();
+(function(factory) {
+	factory();
+})(function() {
+	return function(fn) {
+		fn()().prop();
+	}(function() {
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

## `uglify/functions/issue_2531_3`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 164 vs reference 33 (no whitespaces: +131, formatted: +167)

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

## `uglify/evaluate/unsafe_float_key_complex`

- size: oxc 209 vs reference 76 (no whitespaces: +133, formatted: +205)

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

## `uglify/classes/issue_805_1`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 187 vs reference 51 (no whitespaces: +136, formatted: +164)

```js
'use strict';
(function(a) {
	var unused = class {};
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
@@ -1,2 +1,9 @@
 'use strict';
-console.log('foo'), console.log('bar');
+(function(a) {
+	var unused = class {};
+	return unused.prototype[a()] = 42, (unused.prototype.bar = function() {
+		console.log('bar');
+	})(), unused;
+})(function() {
+	return console.log('foo'), 'foo';
+});

```

## `uglify/drop-unused/issue_805_2`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 174 vs reference 38 (no whitespaces: +136, formatted: +162)

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
@@ -1 +1,8 @@
-console.log('foo'), console.log('bar');
+(function(a) {
+	function unused() {}
+	return unused.prototype[a()] = 42, (unused.prototype.bar = function() {
+		console.log('bar');
+	})(), unused;
+})(function() {
+	return console.log('foo'), 'foo';
+});

```

## `uglify/drop-unused/issue_805_1`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 179 vs reference 38 (no whitespaces: +141, formatted: +169)

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
@@ -1 +1,8 @@
-console.log('foo'), console.log('bar');
+(function(a) {
+	var unused = function() {};
+	return unused.prototype[a()] = 42, (unused.prototype.bar = function() {
+		console.log('bar');
+	})(), unused;
+})(function() {
+	return console.log('foo'), 'foo';
+});

```

## `uglify/functions/pr_3595_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 230 vs reference 84 (no whitespaces: +146, formatted: +171)

```js
var g = ['PASS'];
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
console.log(c('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,17 @@
 var g = ['PASS'];
-console.log(function(problem) {
+function problem(arg) {
+	return g.indexOf(arg);
+}
+function unused(arg) {
+	return problem(arg);
+}
+function a(arg) {
+	return problem(arg);
+}
+function b(problem) {
 	return g[problem];
-}(g.indexOf('PASS')));
+}
+function c(arg) {
+	return b(a(arg));
+}
+console.log(c('PASS'));

```

## `uglify/functions/issue_3297_3`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 386 vs reference 238 (no whitespaces: +148, formatted: +166)

```js
function function1(session) {
	var public = { processBulk };
	return public;
	function processBulk(bulk) {
		var subparam1 = session();
		function processOne(param1) {
			var param2 = { subparam1 };
			doProcessOne({
				param1,
				param2
			}, function() {
				processBulk(bulk);
			});
		}
		;
		if (bulk && bulk.length > 0) processOne(bulk.shift());
	}
	function doProcessOne(config, callback) {
		console.log(JSON.stringify(config));
		callback();
	}
}
function1(function session() {
	return 42;
}).processBulk([
	1,
	2,
	3
]);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,20 @@
-function function1(c) {
-	return { processBulk: function n(o) {
-		var r, t, u = c();
-		o && 0 < o.length && (r = o.shift(), t = function() {
-			n(o);
-		}, console.log(JSON.stringify({
-			param1: r,
-			param2: { subparam1: u }
-		})), t());
-	} };
+function function1(session) {
+	return { processBulk };
+	function processBulk(bulk) {
+		var subparam1 = session();
+		function processOne(param1) {
+			doProcessOne({
+				param1,
+				param2: { subparam1 }
+			}, function() {
+				processBulk(bulk);
+			});
+		}
+		bulk && bulk.length > 0 && processOne(bulk.shift());
+	}
+	function doProcessOne(config, callback) {
+		console.log(JSON.stringify(config)), callback();
+	}
 }
 function1(function() {
 	return 42;

```

## `uglify/functions/pr_3595_4`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 230 vs reference 79 (no whitespaces: +151, formatted: +177)

```js
var g = ['PASS'];
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
console.log(c('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,17 @@
 var g = ['PASS'];
-console.log((problem = g.indexOf('PASS'), g[problem]));
-var problem;
+function problem(arg) {
+	return g.indexOf(arg);
+}
+function unused(arg) {
+	return problem(arg);
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
+console.log(c('PASS'));

```

## `uglify/functions/iifes_returning_constants_keep_fargs_false`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 270 vs reference 112 (no whitespaces: +158, formatted: +209)

```js
(function() {
	return -1.23;
})();
console.log(function foo() {
	return 'okay';
}());
console.log(function foo(x, y, z) {
	return 123;
}());
console.log(function(x, y, z) {
	return z;
}());
console.log(function(x, y, z) {
	if (x) return y;
	return z;
}(1, 2, 3));
console.log(function(x, y) {
	return x * y;
}(2, 3));
console.log(function(x, y) {
	return x * y;
}(2, 3, a(), b()));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,13 @@
-console.log('okay');
-console.log(123);
-console.log(void 0);
-console.log(2);
-console.log(6);
-console.log((a(), b(), 6));
+console.log(function() {
+	return 'okay';
+}()), console.log(function(x, y, z) {
+	return 123;
+}()), console.log(function(x, y, z) {
+	return z;
+}()), console.log(function(x, y, z) {
+	return x ? y : z;
+}(1, 2, 3)), console.log(function(x, y) {
+	return x * y;
+}(2, 3)), console.log(function(x, y) {
+	return x * y;
+}(2, 3, a(), b()));

```

## `uglify/functions/iifes_returning_constants_keep_fargs_true`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 270 vs reference 112 (no whitespaces: +158, formatted: +209)

```js
(function() {
	return -1.23;
})();
console.log(function foo() {
	return 'okay';
}());
console.log(function foo(x, y, z) {
	return 123;
}());
console.log(function(x, y, z) {
	return z;
}());
console.log(function(x, y, z) {
	if (x) return y;
	return z;
}(1, 2, 3));
console.log(function(x, y) {
	return x * y;
}(2, 3));
console.log(function(x, y) {
	return x * y;
}(2, 3, a(), b()));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,13 @@
-console.log('okay');
-console.log(123);
-console.log(void 0);
-console.log(2);
-console.log(6);
-console.log((a(), b(), 6));
+console.log(function() {
+	return 'okay';
+}()), console.log(function(x, y, z) {
+	return 123;
+}()), console.log(function(x, y, z) {
+	return z;
+}()), console.log(function(x, y, z) {
+	return x ? y : z;
+}(1, 2, 3)), console.log(function(x, y) {
+	return x * y;
+}(2, 3)), console.log(function(x, y) {
+	return x * y;
+}(2, 3, a(), b()));

```

## `uglify/asm/asm_mixed`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 987 vs reference 823 (no whitespaces: +164, formatted: +150)

```js
// adapted from http://asmjs.org/spec/latest/
function asm_GeometricMean(stdlib, foreign, buffer) {
	'use asm';
	var exp = stdlib.Math.exp;
	var log = stdlib.Math.log;
	var values = new stdlib.Float64Array(buffer);
	function logSum(start, end) {
		start = start | 0;
		end = end | 0;
		var sum = 0, p = 0, q = 0;
		// asm.js forces byte addressing of the heap by requiring shifting by 3
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
		// asm.js forces byte addressing of the heap by requiring shifting by 3
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
@@ -1,31 +1,30 @@
+// adapted from http://asmjs.org/spec/latest/
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
-		for (p = start << 3, q = end << 3; (p | 0) < (q | 0); p = p + 8 | 0) sum = sum + +log(values[p >> 3]);
+		// asm.js forces byte addressing of the heap by requiring shifting by 3
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
-		for (var sum = 0, p = 0, q = 0, p = start << 3, q = end << 3; (0 | p) < (0 | q); p = p + 8 | 0) sum += +log(values[p >> 3]);
+		var sum = 0, p = 0, q = 0;
+		// asm.js forces byte addressing of the heap by requiring shifting by 3
+		for (p = start << 3, q = end << 3; (p | 0) < (q | 0); p = p + 8 | 0) sum += +log(values[p >> 3]);
 		return +sum;
 	}
 	
... [truncated]
```

## `uglify/functions/cross_references_2`

- tags: `join vars`, `sequences`, `remove unused`, `6 iterations`
- size: oxc 180 vs reference 15 (no whitespaces: +165, formatted: +204)

```js
var Math = { square: function(n) {
	return n * n;
} };
console.log((function(factory) {
	return factory();
})(function() {
	return function(Math) {
		return function(n) {
			return Math.square(n);
		};
	}(Math);
})(3));

```

```diff
--- reference
+++ oxc
@@ -1 +1,12 @@
-console.log(9);
+var Math = { square: function(n) {
+	return n * n;
+} };
+console.log((function(factory) {
+	return factory();
+})(function() {
+	return function(Math) {
+		return function(n) {
+			return Math.square(n);
+		};
+	}(Math);
+})(3));

```

## `uglify/drop-unused/issue_2105_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 191 vs reference 20 (no whitespaces: +171, formatted: +239)

```js
!function(factory) {
	factory();
}(function() {
	return function(fn) {
		fn()().prop();
	}(function() {
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
+	return function(fn) {
+		fn()().prop();
+	}(function() {
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

## `uglify/reduce_vars/inverted_var`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 249 vs reference 56 (no whitespaces: +193, formatted: +256)

```js
console.log(function() {
	var a = 1;
	return a;
}(), function() {
	var b;
	b = 2;
	return b;
}(), function() {
	c = 3;
	return c;
	var c;
}(), function(c) {
	c = 4;
	return c;
}(), function(c) {
	c = 5;
	return c;
	var c;
}(), function c() {
	c = 6;
	return c;
}(), function c() {
	c = 7;
	return c;
	var c;
}(), function() {
	c = 8;
	return c;
	var c = 'foo';
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,27 @@
-console.log(1, 2, 3, 4, 5, function c() {
+console.log(function() {
+	return 1;
+}(), function() {
+	return 2;
+}(), function() {
+	c = 3;
+	return c;
+	var c;
+}(), function(c) {
+	c = 4;
+	return c;
+}(), function(c) {
+	c = 5;
+	return c;
+	var c;
+}(), function c() {
 	c = 6;
 	return c;
-}(), 7, 8);
+}(), function() {
+	c = 7;
+	return c;
+	var c;
+}(), function() {
+	c = 8;
+	return c;
+	var c;
+}());

```

## `uglify/pure_funcs/issue_3065_1`

- tags: `join vars`, `remove unused`, `pure functions`
- size: oxc 196 vs reference 0 (no whitespaces: +196, formatted: +235)

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

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+function modifyWrapper(a, f, wrapper) {
+	wrapper.a = a;
+	wrapper.f = f;
+	return wrapper;
+}
+function pureFunc(fun) {
+	return modifyWrapper(1, fun, function(a) {
+		return fun(a);
+	});
+}
+var unused = pureFunc(function(x) {
+	return x;
+});

```

## `uglify/pure_funcs/issue_3065_2`

- tags: `join vars`, `remove unused`, `pure functions`
- size: oxc 196 vs reference 0 (no whitespaces: +196, formatted: +235)

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

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+function modifyWrapper(a, f, wrapper) {
+	wrapper.a = a;
+	wrapper.f = f;
+	return wrapper;
+}
+function pureFunc(fun) {
+	return modifyWrapper(1, fun, function(a) {
+		return fun(a);
+	});
+}
+var unused = pureFunc(function(x) {
+	return x;
+});

```

## `uglify/merge_vars/issue_5182`

- tags: `join vars`, `sequences`, `remove unused`, `4 iterations`
- size: oxc 312 vs reference 108 (no whitespaces: +204, formatted: +264)

```js
try {
	var con = console;
} catch (x) {}
global.log = con.log;
var jump = function(x) {
	console.log('JUMP:', x * 10);
	return x + x;
};
var jump2 = jump;
var run = function(x) {
	console.log('RUN:', x * -10);
	return x * x;
};
var run2 = run;
var bar = (x, y) => {
	console.log('BAR:', x + y);
	return x - y;
};
var bar2 = bar;
var obj = {
	foo: bar2,
	go: run2,
	not_used: jump2
};
console.log(obj.foo(1, 2), global.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,14 @@
 try {
 	var con = console;
-} catch (x) {}
-global.log = con.log, console.log((console.log('BAR:', 3), -1), global.log('PASS'));
+} catch {}
+global.log = con.log;
+var jump = function(x) {
+	return console.log('JUMP:', x * 10), x + x;
+}, jump2 = jump, run = function(x) {
+	return console.log('RUN:', x * -10), x * x;
+}, run2 = run, bar = (x, y) => (console.log('BAR:', x + y), x - y), bar2 = bar, obj = {
+	foo: bar2,
+	go: run2,
+	not_used: jump2
+};
+console.log(obj.foo(1, 2), global.log('PASS'));

```

## `uglify/collapse_vars/issue_5182`

- tags: `join vars`, `sequences`, `remove unused`, `4 iterations`
- size: oxc 301 vs reference 94 (no whitespaces: +207, formatted: +268)

```js
var con = console;
global.log = con.log;
var jump = function(x) {
	console.log('JUMP:', x * 10);
	return x + x;
};
var jump2 = jump;
var run = function(x) {
	console.log('RUN:', x * -10);
	return x * x;
};
var run2 = run;
var bar = (x, y) => {
	console.log('BAR:', x + y);
	return x - y;
};
var bar2 = bar;
var obj = {
	foo: bar2,
	go: run2,
	not_used: jump2
};
console.log(obj.foo(1, 2), global.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,12 @@
 var con = console;
-global.log = con.log, console.log((console.log('BAR:', 3), -1), global.log('PASS'));
+global.log = con.log;
+var jump = function(x) {
+	return console.log('JUMP:', x * 10), x + x;
+}, jump2 = jump, run = function(x) {
+	return console.log('RUN:', x * -10), x * x;
+}, run2 = run, bar = (x, y) => (console.log('BAR:', x + y), x - y), bar2 = bar, obj = {
+	foo: bar2,
+	go: run2,
+	not_used: jump2
+};
+console.log(obj.foo(1, 2), global.log('PASS'));

```

## `uglify/collapse_vars/collapse_vars_do_while`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 519 vs reference 271 (no whitespaces: +248, formatted: +239)

```js
function f1(y) {
	// The constant do-while condition `c` will not be replaced.
	var c = 9;
	do {} while (c === 77);
}
function f2(y) {
	// The non-constant do-while condition `c` will not be replaced.
	var c = 5 - y;
	do {} while (c);
}
function f3(y) {
	// The constant `x` will be replaced in the do loop body.
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
	// The non-constant `a` will not be replaced in the do loop body.
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
		// The non-constant `a` will be replaced in p(a)
		// because it is declared in same block.
		var a = y - 3;
		p(a);
	} while (--y);
}

```

```diff
--- reference
+++ oxc
@@ -1,24 +1,28 @@
 function f1(y) {
+	// The constant do-while condition `c` will not be replaced.
 	var c = 9;
 	do;
-	while (77 === c);
+	while (c === 77);
 }
 function f2(y) {
+	// The non-constant do-while condition `c` will not be replaced.
 	var c = 5 - y;
 	do;
 	while (c);
 }
 function f3(y) {
+	// The constant `x` will be replaced in the do loop body.
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
+	// The non-constant `a` will not be replaced in the do loop body.
 	var a = y / 4;
 	do
 		return a;
@@ -28,7 +32,7 @@
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

## `uglify/issue-1261/pure_function_calls_toplevel`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 274 vs reference 25 (no whitespaces: +249, formatted: +278)

```js
// pure top-level IIFE will be dropped
(function() {
	console.log('iife0');
})();
// pure top-level IIFE assigned to unreferenced var will be dropped
var iife1 = (function() {
	console.log('iife1');
	function iife1() {}
	return iife1;
})();
(function() {
	// pure IIFE in function scope assigned to unreferenced var will be dropped
	var iife2 = (function() {
		console.log('iife2');
		function iife2() {}
		return iife2;
	})();
})();
// pure top-level calls will be dropped regardless of the leading comments position
var MyClass = (function() {
	function MyClass() {}
	MyClass.prototype.method = function() {};
	return MyClass;
})();
// comment #__PURE__ comment
bar(), baz(), quux();
a.b(), c.d.e(), f.g();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,10 @@
-baz(), quux();
-a.b(), f.g();
+// pure top-level IIFE assigned to unreferenced var will be dropped
+var iife1 = (function() {
+	console.log('iife1');
+	function iife1() {}
+	return iife1;
+})(), MyClass = (function() {
+	function MyClass() {}
+	return MyClass.prototype.method = function() {}, MyClass;
+})();
+bar(), baz(), quux(), a.b(), f.g();

```

## `uglify/collapse_vars/collapse_vars_do_while_drop_assign`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 519 vs reference 265 (no whitespaces: +254, formatted: +250)

```js
function f1(y) {
	// The constant do-while condition `c` will be not replaced.
	var c = 9;
	do {} while (c === 77);
}
function f2(y) {
	// The non-constant do-while condition `c` will not be replaced.
	var c = 5 - y;
	do {} while (c);
}
function f3(y) {
	// The constant `x` will be replaced in the do loop body.
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
	// The non-constant `a` will not be replaced in the do loop body.
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
		// The non-constant `a` will be replaced in p(a)
		// because it is declared in same block.
		var a = y - 3;
		p(a);
	} while (--y);
}

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,17 @@
 function f1(y) {
+	// The constant do-while condition `c` will be not replaced.
 	var c = 9;
 	do;
-	while (77 === c);
+	while (c === 77);
 }
 function f2(y) {
+	// The non-constant do-while condition `c` will not be replaced.
 	var c = 5 - y;
 	do;
 	while (c);
 }
 function f3(y) {
+	// The constant `x` will be replaced in the do loop body.
 	function fn(n) {
 		console.log(n);
 	}
@@ -19,6 +22,7 @@
 	} while (y);
 }
 function f4(y) {
+	// The non-constant `a` will not be replaced in the do loop body.
 	var a = y / 4;
 	do
 		return a;
@@ -28,7 +32,7 @@
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

## `uglify/arrays/constant_join_1`

- size: oxc 739 vs reference 474 (no whitespaces: +265, formatted: +399)

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
-var e = (foo, bar, '');
-var f = '';
-var g = '';
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
+var e = [].join(foo + bar
... [truncated]
```

## `uglify/issue-5614/record_update`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 265 vs reference 0 (no whitespaces: +265, formatted: +305)

```js
var value = {
	a: 42,
	b: 'PASS'
};
var unused = _Utils_update(value, { b: 'FAIL' });
function _Utils_update(oldRecord, updatedFields) {
	var newRecord = {};
	for (var key in oldRecord) newRecord[key] = oldRecord[key];
	for (var key in updatedFields) newRecord[key] = updatedFields[key];
	return newRecord;
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+var value = {
+	a: 42,
+	b: 'PASS'
+}, unused = _Utils_update(value, { b: 'FAIL' });
+function _Utils_update(oldRecord, updatedFields) {
+	var newRecord = {};
+	for (var key in oldRecord) newRecord[key] = oldRecord[key];
+	for (var key in updatedFields) newRecord[key] = updatedFields[key];
+	return newRecord;
+}

```

## `uglify/issue-1770/identifier`

- size: oxc 584 vs reference 313 (no whitespaces: +271, formatted: +271)

```js
var obj = {
	abstract: 1,
	boolean: 2,
	byte: 3,
	char: 4,
	class: 5,
	double: 6,
	enum: 7,
	export: 8,
	extends: 9,
	final: 10,
	float: 11,
	goto: 12,
	implements: 13,
	import: 14,
	int: 15,
	interface: 16,
	let: 17,
	long: 18,
	native: 19,
	package: 20,
	private: 21,
	protected: 22,
	public: 23,
	short: 24,
	static: 25,
	super: 26,
	synchronized: 27,
	this: 28,
	throws: 29,
	transient: 30,
	volatile: 31,
	yield: 32,
	false: 33,
	null: 34,
	true: 35,
	break: 36,
	case: 37,
	catch: 38,
	const: 39,
	continue: 40,
	debugger: 41,
	default: 42,
	delete: 43,
	do: 44,
	else: 45,
	finally: 46,
	for: 47,
	function: 48,
	if: 49,
	in: 50,
	instanceof: 51,
	new: 52,
	return: 53,
	switch: 54,
	throw: 55,
	try: 56,
	typeof: 57,
	var: 58,
	void: 59,
	while: 60,
	with: 61
};

```

```diff
--- reference
+++ oxc
@@ -1,63 +1,63 @@
 var obj = {
-	e: 1,
-	t: 2,
-	n: 3,
-	a: 4,
-	i: 5,
-	o: 6,
-	r: 7,
-	l: 8,
-	s: 9,
-	c: 10,
-	f: 11,
-	u: 12,
-	d: 13,
-	h: 14,
-	p: 15,
-	b: 16,
-	v: 17,
-	w: 18,
-	y: 19,
-	g: 20,
-	m: 21,
-	k: 22,
-	x: 23,
-	j: 24,
-	z: 25,
-	q: 26,
-	A: 27,
-	B: 28,
-	C: 29,
-	D: 30,
-	E: 31,
-	F: 32,
-	G: 33,
-	H: 34,
-	I: 35,
-	J: 36,
-	K: 37,
-	L: 38,
-	M: 39,
-	N: 40,
-	O: 41,
-	P: 42,
-	Q: 43,
-	R: 44,
-	S: 45,
-	T: 46,
-	U: 47,
-	V: 48,
-	W: 49,
-	X: 50,
-	Y: 51,
-	Z: 52,
-	$: 53,
-	_: 54,
-	ee: 55,
-	te: 56,
-	ne: 57,
-	ae: 58,
-	ie: 59,
-	oe: 60,
-	re: 61
+	abstract: 1,
+	boolean: 2,
+	byte: 3,
+	char: 4,
+	class: 5,
+	double: 6,
+	enum: 7,
+	export: 8,
+	extends: 9,
+	final: 10,
+	float: 11,
+	goto: 12,
+	implements: 13,
+	import: 14,
+	int: 15,
+	interface: 16,
+	let: 17,
+	long: 18,
+	native: 19,
+	package: 20,
+	private: 21,
+	protected: 22,
+	public: 23,
+	short: 24,
+	static: 25,
+	super: 26,
+	synchronized: 27,
+	this: 28,
+	throws: 29,
+	transient: 30,
+	volatile: 31,
+	yield: 32,
+	false: 33,
+	null: 34,
+	true: 35,
+	break: 36,
+	case: 37,
+	catch: 38,
+	const: 39,
+	continue: 40,
+	debugger: 41,
+	default: 42,
+	delete: 43,
+	do: 44,
+	else: 45,
+	finally: 46,
+	for: 47,
+	function: 48,
+	if: 49,
+	in: 50,
+	instanceof: 51,
+	new: 52,
+	return: 53,
+	switch: 54,
+	throw: 55,
+	try: 56,
+	typeof: 57,
+	var: 58,
+	void: 59,
+	while: 60,
+	with: 61
 };

```

## `uglify/issue-5614/currying`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 358 vs reference 0 (no whitespaces: +358, formatted: +430)

```js
function F(arity, fun, wrapper) {
	wrapper.a = arity;
	wrapper.f = fun;
	return wrapper;
}
function F2(fun) {
	return F(2, fun, function(a) {
		return function(b) {
			return fun(a, b);
		};
	});
}
function _Utils_eq(x, y) {
	var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
	while (isEqual && (pair = stack.pop())) isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack);
	return isEqual;
}
var _Utils_equal = F2(_Utils_eq);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,15 @@
+function F(arity, fun, wrapper) {
+	return wrapper.a = arity, wrapper.f = fun, wrapper;
+}
+function F2(fun) {
+	return F(2, fun, function(a) {
+		return function(b) {
+			return fun(a, b);
+		};
+	});
+}
+function _Utils_eq(x, y) {
+	for (var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack); isEqual && (pair = stack.pop());) isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack);
+	return isEqual;
+}
+var _Utils_equal = F2(_Utils_eq);

```

