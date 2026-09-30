# uglify / differs — Output differs at equal length

Fixtures: 211

[← uglify](README.md) · [← all families](../README.md)

## `uglify/arguments/issue_3282_1`

- tags: `join vars`, `remove unused`

```js
(function(t) {
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

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-(function() {
+(function(t) {
 	return function() {
-		(function() {
-			'use strict';
-			function e() {
-				return arguments[0];
-			}
-			e();
-			e();
-		})();
+		t();
 	};
-})()();
+})(function() {
+	'use strict';
+	function e() {
+		return arguments[0];
+	}
+	e();
+	e();
+})();

```

## `uglify/arguments/issue_4291_2`

- tags: `join vars`

```js
var a = function() {
	if (arguments[0]) arguments[1] = 'PASS';
	return arguments;
}(42);
console.log(a[1], a[0], a.length);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = function() {
-	if (arguments[0]) arguments[1] = 'PASS';
+	arguments[0] && (arguments[1] = 'PASS');
 	return arguments;
 }(42);
 console.log(a[1], a[0], a.length);

```

## `uglify/arguments/replace_index_drop_fargs_1`

- tags: `join vars`

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
(function() {
	var arguments = {
		1: 'foo',
		foo: 'bar'
	};
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,17 @@
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
-	console.log('bar'[1], 'bar'[1], 'bar'.foo);
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
-(function(argument_0, argument_1) {
+(function() {
 	var arguments;
-	console.log(argument_1, argument_1, arguments.foo);
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function() {
 	var arguments = {

```

## `uglify/arrows/for_declaration_parentheses_init`


```js
for (var f = (a) => (a in a); console.log(42););

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-for (var f = ((a) => a in a); console.log(42););
+for (var f = (a) => (a in a); console.log(42););

```

## `uglify/arrows/issue_5251`


```js
(() => {
	while (console.log(arguments)) var arguments = 'FAIL';
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (() => {
-	while (console.log(arguments)) var arguments = 'FAIL';
+	for (; console.log(arguments);) var arguments = 'FAIL';
 })();

```

## `uglify/arrows/issue_5414_1`


```js
(() => {
	(() => {
		if (!console) var arguments = 42;
		while (console.log(arguments));
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (() => {
 	if (!console) var arguments = 42;
-	while (console.log(arguments));
+	for (; console.log(arguments););
 })();

```

## `uglify/arrows/issue_5414_2`


```js
(() => {
	(() => {
		if (!console) var arguments = 42;
		while (console.log(arguments));
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (() => {
 	if (!console) var arguments = 42;
-	while (console.log(arguments));
+	for (; console.log(arguments););
 })();

```

## `uglify/arrows/reduce_lambda_1`

- tags: `join vars`, `remove unused`

```js
var f = () => {
	console.log(a, b);
};
var a = 'foo', b = 42;
f();
b = 'bar';
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 var f = () => {
-	console.log('foo', b);
-};
-var b = 42;
+	console.log(a, b);
+}, a = 'foo', b = 42;
 f();
 b = 'bar';
 f();

```

## `uglify/assignments/issue_4819`


```js
console.log(void 0 === ([].p &&= 42));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(void 0 === ([].p &&= 42));
+console.log(([].p &&= 42) === void 0);

```

## `uglify/awaits/await_unary_1`


```js
var a = 'PASS';
function f() {
	return { then: function(r) {
		a = 'FAIL';
		r();
	} };
}
(async function() {
	await !f();
	while (console.log(a));
})();

```

```diff
--- reference
+++ oxc
@@ -7,5 +7,5 @@
 }
 (async function() {
 	await !f();
-	while (console.log(a));
+	for (; console.log(a););
 })();

```

## `uglify/awaits/await_unary_2`


```js
var a = 'PASS';
function f() {
	return { then: function(r) {
		a = 'FAIL';
		r();
	} };
}
(async function() {
	await ~f();
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
+	await ~f();
+	for (; console.log(a););
 })();

```

## `uglify/awaits/issue_4335_1`


```js
var await = 'PASS';
(async function() {
	console.log(function() {
		return await;
	}());
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var await = 'PASS';
 (async function() {
 	console.log(function() {
-		return await;
+		return 'PASS';
 	}());
 })();

```

## `uglify/bigint/issue_4801`

- tags: `join vars`, `remove unused`

```js
try {
	(function(a) {
		A = 42;
		a || A;
	})(!(0 == 42 >> 420n));
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 try {
 	(function(a) {
-		0 != (A = 42) >> 420n || A;
-	})();
-} catch (e) {
+		A = 42;
+		a || A;
+	})(!!(42 >> 420n));
+} catch {
 	console.log('PASS');
 }

```

## `uglify/classes/issue_5082_1`

- tags: `join vars`, `remove unused`

```js
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
@@ -3,7 +3,7 @@
 		p = console.log('PASS');
 		q() {}
 	}
-	(class {
-		static c = new A();
-	});
+	class B {
+		static P = new A();
+	}
 })();

```

## `uglify/classes/issue_5082_2`

- tags: `join vars`, `remove unused`, `2 iterations`

```js
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
@@ -3,7 +3,7 @@
 		p = console.log('PASS');
 		q() {}
 	}
-	(class {
-		static c = new A();
-	});
+	class B {
+		static P = new A();
+	}
 })();

```

## `uglify/classes/issue_5294_1`

- tags: `join vars`

```js
(class A {
	static p = console.log(typeof A);
});

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (class A {
-	static c = console.log(typeof A);
+	static p = console.log(typeof A);
 });

```

## `uglify/classes/issue_5682_class_key_computed`


```js
'use strict';
function f(a) {
	return 'foo' in a;
}
class A {
	['foo']() {}
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
-	['o']() {}
+	foo() {}
 }
 console.log(f(new A()) ? 'PASS' : 'FAIL');

```

## `uglify/classes/mangle_private_local`


```js
class A {
	p = 'foo';
	#q = 'bar';
	f() {
		console.log(this.p, this.#q);
	}
}
class B {
	#r = 'moo';
	#g() {
		return 'baz';
	}
	h() {
		console.log(this.#r, this.#g());
	}
}
new A().f();
new B().h();

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,18 @@
 class A {
-	s = 'foo';
-	#s = 'bar';
-	o() {
-		console.log(this.s, this.#s);
+	p = 'foo';
+	#q = 'bar';
+	f() {
+		console.log(this.p, this.#q);
 	}
 }
 class B {
-	#s = 'moo';
-	#o() {
+	#r = 'moo';
+	#g() {
 		return 'baz';
 	}
-	e() {
-		console.log(this.#s, this.#o());
+	h() {
+		console.log(this.#r, this.#g());
 	}
 }
-new A().o();
-new B().e();
+new A().f();
+new B().h();

```

## `uglify/classes/private_methods`


```js
new class A {
	static *#f() {
		yield A.#p * 3;
	}
	async #g() {
		for (var a of A.#f()) return a * await 2;
	}
	static get #p() {
		return 7;
	}
	get q() {
		return this.#g();
	}
}().q.then(console.log);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 new class A {
 	static *#f() {
-		yield 3 * A.#p;
+		yield A.#p * 3;
 	}
 	async #g() {
 		for (var a of A.#f()) return a * await 2;

```

## `uglify/collapse_vars/chained_1`

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

## `uglify/collapse_vars/chained_2`

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

## `uglify/collapse_vars/chained_3`

- tags: `join vars`, `remove unused`

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
-	var c = 1, c = b;
+	var c = a, c = b;
 	b++;
 	return c;
-}(0, 2));
+}(1, 2));

```

## `uglify/collapse_vars/collapse_arg_sequence`

- tags: `join vars`, `remove unused`

```js
(function(a) {
	a('foo');
})((console.log('bar'), console.log));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function(a) {
-	(0, console.log)('foo');
-})(console.log('bar'));
+	a('foo');
+})((console.log('bar'), console.log));

```

## `uglify/collapse_vars/collapse_rhs_conditional_1`

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

## `uglify/collapse_vars/collapse_rhs_undefined`

- tags: `join vars`

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
@@ -1,7 +1,7 @@
 var a, b;
 function f() {
-	b = a = void 0;
-	return;
+	a = void 0;
+	b = void 0;
 }
 var c = f();
 console.log(a === b, b === c, c === a);

```

## `uglify/collapse_vars/compound_assignment_3`

- tags: `join vars`

```js
var a = 1;
a += (console.log('PASS'), 2);
a.p;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 var a = 1;
-(a += (console.log('PASS'), 2)).p;
+a += (console.log('PASS'), 2);
+a.p;

```

## `uglify/collapse_vars/double_def_1`

- tags: `join vars`, `remove unused`

```js
var a = x, a = a && y;
a();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = x;
-(a = a && y)();
+var a = x, a = a && y;
+a();

```

## `uglify/collapse_vars/issue_2425_3`

- tags: `join vars`, `remove unused`

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
 (function(b, b) {
-	(a |= 10).toString();
-})(--a);
+	b.toString();
+})(--a, a |= 10);
 console.log(a);

```

## `uglify/collapse_vars/issue_2436_14`

- tags: `join vars`, `remove unused`

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
 var b = {};
 (function() {
-	a && function(c, d) {
-		console.log(b, d);
-	}(0, a);
+	var c = 'PASS';
+	c && function(c, d) {
+		console.log(c, d);
+	}(b, c);
 })();

```

## `uglify/collapse_vars/issue_2908`

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

## `uglify/collapse_vars/issue_4891`

- tags: `join vars`

```js
var a = 0, b;
a++;
console.log(b = a, b);
b--;
a.a += 0;
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a = 0, b;
 a++;
-console.log(a, b = a);
+console.log(b = a, b);
 b--;
 a.a += 0;
 console.log(b);

```

## `uglify/collapse_vars/issue_4908`

- tags: `join vars`

```js
var a = 0;
var b;
console || a++;
var c = d = a, d = [c && c, d += 42];
console.log(d[1]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-var a = 0, b, c = (console || a++, a), d = [(d = a) && d, d += 42];
+var a = 0, b;
+console || a++;
+var c = d = a, d = [c && c, d += 42];
 console.log(d[1]);

```

## `uglify/collapse_vars/replace_all_var_scope`

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

## `uglify/collapse_vars/substitution_logical_1`

- tags: `join vars`

```js
function f1(a, b) {
	console.log((b = a) && a, b);
}
function f2(a, b) {
	console.log(a && (b = a), b);
}
f1(42, 'foo');
f1(null, true);
f2(42, 'foo');
f2(null, true);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 function f1(a, b) {
-	console.log(a && a, a);
+	console.log((b = a) && a, b);
 }
 function f2(a, b) {
 	console.log(a && (b = a), b);
 }
 f1(42, 'foo');
-f1(null, true);
+f1(null, !0);
 f2(42, 'foo');
-f2(null, true);
+f2(null, !0);

```

## `uglify/collapse_vars/var_side_effects_1`

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

## `uglify/collapse_vars/var_side_effects_3`

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

## `uglify/comparisons/comparisons`


```js
var obj1, obj2;
var result1 = obj1 <= obj2;
var result2 = obj1 < obj2;
var result3 = obj1 >= obj2;
var result4 = obj1 > obj2;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var obj1, obj2;
 var result1 = obj1 <= obj2;
 var result2 = obj1 < obj2;
-var result3 = obj2 <= obj1;
-var result4 = obj2 < obj1;
+var result3 = obj1 >= obj2;
+var result4 = obj1 > obj2;

```

## `uglify/comparisons/issue_2857_4`


```js
a === undefined || a === null && p;
a === undefined || a !== null && p;
a !== undefined || a === null && p;
a !== undefined || a !== null && p;
a === undefined && a === null && p;
a === undefined && a !== null && p;
a !== undefined && a === null && p;
a !== undefined && a !== null && p;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-void 0 === a || null === a && p;
-void 0 === a || null !== a && p;
-void 0 !== a || null === a && p;
-void 0 !== a || null !== a && p;
-void 0 === a && null === a && p;
-void 0 === a && null !== a && p;
-void 0 !== a && null === a && p;
-null != a && p;
+a === void 0 || a === null && p;
+a === void 0 || a !== null && p;
+a !== void 0 || a === null && p;
+a !== void 0 || a !== null && p;
+a === void 0 && a === null && p;
+a === void 0 && a !== null && p;
+a !== void 0 && a === null && p;
+a != null && p;

```

## `uglify/comparisons/issue_3413`


```js
var b;
void 0 !== ('' < b || void 0) || console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var b;
-void 0 === ('' < b || void 0) && console.log('PASS');
+('' < b || void 0) !== void 0 || console.log('PASS');

```

## `uglify/comparisons/nullish_assign`


```js
var a;
void 0 !== (a = 'PASS'.split('')) && null !== a && console.log(a.join('-'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-null != (a = 'PASS'.split('')) && console.log(a.join('-'));
+(a = 'PASS'.split('')) != null && console.log(a.join('-'));

```

## `uglify/comparisons/nullish_chain`


```js
var a;
A || B || void 0 === a || null === a || C;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-A || B || null == a || C;
+A || B || a == null || C;

```

## `uglify/comparisons/self_comparison_2`

- tags: `join vars`

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
-console.log(false, true);
+console.log(f != f, o === o);

```

## `uglify/conditionals/cond_5`


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
@@ -1,2 +1,2 @@
-(some_condition() && some_other_condition() ? do_something : alternate)();
+some_condition() && some_other_condition() ? do_something() : alternate();
 some_condition() && some_other_condition() && do_something();

```

## `uglify/conditionals/ifs_7`


```js
if (A);
else;
if (A) while (B);
else;
if (A);
else while (C);
if (A) while (B);
else while (C);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 A;
-if (A) while (B);
-if (!A) while (C);
-if (A) while (B);
-else while (C);
+if (A) for (; B;);
+if (!A) for (; C;);
+if (A) for (; B;);
+else for (; C;);

```

## `uglify/const/issue_5656`

- tags: `join vars`

```js
console.log(function(a) {
	var b = a;
	b++;
	{
		const a = b;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 console.log(function(a) {
 	var b = a;
+	b++;
 	{
-		const a = ++b;
+		let a = b;
 	}
 }());

```

## `uglify/dead-code/issue_3406`


```js
console.log(function f(a) {
	return delete (f = a);
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function f(a) {
-	return delete (0, a);
+	return delete (f = a);
 }());

```

## `uglify/default-values/collapse_arg_sequence`

- tags: `join vars`, `remove unused`

```js
(function(a = (console.log('bar'), console.log)) {
	a('foo');
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function(a = console.log('bar')) {
-	(0, console.log)('foo');
+(function(a = (console.log('bar'), console.log)) {
+	a('foo');
 })();

```

## `uglify/default-values/collapse_preceding_simple_arg`

- tags: `join vars`, `remove unused`

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
 console.log(function(b, c = 'bar') {
-	return a + c;
-}(0, a));
+	return b + c;
+}(a, a));

```

## `uglify/default-values/issue_5314_1`


```js
A = this;
new function() {
	(function(a = console.log(this === A ? 'PASS' : 'FAIL')) {})();
}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 A = this;
-(function() {
+new function() {
 	(function(a = console.log(this === A ? 'PASS' : 'FAIL')) {})();
-})();
+}();

```

## `uglify/default-values/mangle_arrow_1`


```js
var N = 1;
((o, { pname: p } = o, { [p + N]: v } = o) => {
	let N;
	console.log(v);
})({
	pname: 'x',
	x1: 'PASS'
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var N = 1;
-((e, { pname: a } = e, { [a + N]: l } = e) => {
-	let n;
-	console.log(l);
+((o, { pname: p } = o, { [p + 1]: v } = o) => {
+	let N;
+	console.log(v);
 })({
 	pname: 'x',
 	x1: 'PASS'

```

## `uglify/default-values/mangle_arrow_1_toplevel`


```js
var N = 1;
((o, { pname: p } = o, { [p + N]: v } = o) => {
	let N;
	console.log(v);
})({
	pname: 'x',
	x1: 'PASS'
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var o = 1;
-((e, { pname: a } = e, { [a + o]: l } = e) => {
-	let n;
-	console.log(l);
+var N = 1;
+((o, { pname: p } = o, { [p + 1]: v } = o) => {
+	let N;
+	console.log(v);
 })({
 	pname: 'x',
 	x1: 'PASS'

```

## `uglify/default-values/mangle_arrow_2`


```js
var N = 1;
(({ pname: p = 'x', i: n = N }, { [p + n]: v }) => {
	let N;
	console.log(v);
})({}, { x1: 'PASS' });

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var N = 1;
-(({ pname: e = 'x', i: l = N }, { [e + l]: o }) => {
-	let a;
-	console.log(o);
+(({ pname: p = 'x', i: n = 1 }, { [p + n]: v }) => {
+	let N;
+	console.log(v);
 })({}, { x1: 'PASS' });

```

## `uglify/default-values/mangle_arrow_2_toplevel`


```js
var N = 1;
(({ pname: p = 'x', i: n = N }, { [p + n]: v }) => {
	let N;
	console.log(v);
})({}, { x1: 'PASS' });

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var n = 1;
-(({ pname: e = 'x', i: l = n }, { [e + l]: o }) => {
-	let a;
-	console.log(o);
+var N = 1;
+(({ pname: p = 'x', i: n = 1 }, { [p + n]: v }) => {
+	let N;
+	console.log(v);
 })({}, { x1: 'PASS' });

```

## `uglify/default-values/mangle_function_1`


```js
var N = 1;
(function(o, { pname: p } = o, { [p + N]: v } = o) {
	let N;
	console.log(v);
})({
	pname: 'x',
	x1: 'PASS'
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var N = 1;
-(function(n, { pname: e } = n, { [e + N]: o } = n) {
-	let a;
-	console.log(o);
+(function(o, { pname: p } = o, { [p + 1]: v } = o) {
+	let N;
+	console.log(v);
 })({
 	pname: 'x',
 	x1: 'PASS'

```

## `uglify/default-values/mangle_function_1_toplevel`


```js
var N = 1;
(function(o, { pname: p } = o, { [p + N]: v } = o) {
	let N;
	console.log(v);
})({
	pname: 'x',
	x1: 'PASS'
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var l = 1;
-(function(n, { pname: e } = n, { [e + l]: o } = n) {
-	let a;
-	console.log(o);
+var N = 1;
+(function(o, { pname: p } = o, { [p + 1]: v } = o) {
+	let N;
+	console.log(v);
 })({
 	pname: 'x',
 	x1: 'PASS'

```

## `uglify/default-values/mangle_function_2`


```js
var N = 1;
(function({ pname: p = 'x', i: n = N }, { [p + n]: v }) {
	let N;
	console.log(v);
})({}, { x1: 'PASS' });

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var N = 1;
-(function({ pname: n = 'x', i: o = N }, { [n + o]: e }) {
-	let l;
-	console.log(e);
+(function({ pname: p = 'x', i: n = 1 }, { [p + n]: v }) {
+	let N;
+	console.log(v);
 })({}, { x1: 'PASS' });

```

## `uglify/default-values/mangle_function_2_toplevel`


```js
var N = 1;
(function({ pname: p = 'x', i: n = N }, { [p + n]: v }) {
	let N;
	console.log(v);
})({}, { x1: 'PASS' });

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a = 1;
-(function({ pname: n = 'x', i: o = a }, { [n + o]: e }) {
-	let l;
-	console.log(e);
+var N = 1;
+(function({ pname: p = 'x', i: n = 1 }, { [p + n]: v }) {
+	let N;
+	console.log(v);
 })({}, { x1: 'PASS' });

```

## `uglify/default-values/mangle_var_1_toplevel`


```js
var N = 1, [{ pname: p = 'x', i: n = N }, { [p + n]: v }] = [{}, { x1: 'PASS' }];
console.log(v);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var o = 1, [{ pname: a = 'x', i: e = o }, { [a + e]: l }] = [{}, { x1: 'PASS' }];
-console.log(l);
+var N = 1, [{ pname: p = 'x', i: n = N }, { [p + n]: v }] = [{}, { x1: 'PASS' }];
+console.log(v);

```

## `uglify/default-values/mangle_var_2_toplevel`


```js
var N = 1, [{ pname: p = 'x', i: n = N } = {}, { [p + n]: v }] = [, { x1: 'PASS' }];
console.log(v);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var o = 1, [{ pname: a = 'x', i: e = o } = {}, { [a + e]: l }] = [, { x1: 'PASS' }];
-console.log(l);
+var N = 1, [{ pname: p = 'x', i: n = N } = {}, { [p + n]: v }] = [, { x1: 'PASS' }];
+console.log(v);

```

## `uglify/destructured/issue_4288`

- tags: `join vars`

```js
function f({ [new function() {
	console.log(typeof b);
}()]: a }) {
	var b = a;
	b++;
}
f(0);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f({ [new function() {
 	console.log(typeof b);
 }()]: a }) {
-	var a = a;
-	a++;
+	var b = a;
+	b++;
 }
 f(0);

```

## `uglify/destructured/issue_5314_1`


```js
A = this;
new function() {
	(function({ [console.log(this === A ? 'PASS' : 'FAIL')]: a }) {})(42);
}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 A = this;
-(function() {
+new function() {
 	(function({ [console.log(this === A ? 'PASS' : 'FAIL')]: a }) {})(42);
-})();
+}();

```

## `uglify/destructured/issue_5866_8`

- tags: `remove unused`

```js
var a = {}, b, c;
[{p: b}, c] = [a, a.p = {}];
console.log(b === c ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var b, c, a = {};
+var a = {}, b, c;
 [{p: b}, c] = [a, a.p = {}];
 console.log(b === c ? 'PASS' : 'FAIL');

```

## `uglify/destructured/maintain_position_var`

- tags: `remove unused`

```js
A = 'FAIL';
var [a, b] = [A];
console.log(b || 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 A = 'FAIL';
-var b = [A][1];
+var [a, b] = [A];
 console.log(b || 'PASS');

```

## `uglify/drop-unused/cross_scope_assign_chain`

- tags: `join vars`, `remove unused`

```js
var a, b = 0;
(function() {
	a = b;
	a++;
	while (b++);
})();
console.log(a ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 (function() {
 	a = b;
 	a++;
-	while (b++);
+	for (; b++;);
 })();
 console.log(a ? 'PASS' : 'FAIL');

```

## `uglify/drop-unused/issue_3515_1`

- tags: `join vars`, `remove unused`

```js
var c = 0;
(function() {
	this[c++] = 0;
	var expr20 = !0;
	for (var key20 in expr20);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var c = 0;
 (function() {
-	for (var key20 in !(this[c++] = 0));
+	this[c++] = 0;
+	for (var key20 in !0);
 })();
 console.log(c);

```

## `uglify/drop-unused/issue_5908_1`

- tags: `join vars`, `remove unused`

```js
var a = function(b) {
	function f() {}
	b = f.prototype;
	b.p = 42;
	b.q = 'PASS';
	return f;
}();
console.log(a.prototype.q);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var a = function(b) {
 	function f() {}
-	(b = f.prototype).p = 42;
+	b = f.prototype;
+	b.p = 42;
 	b.q = 'PASS';
 	return f;
 }();

```

## `uglify/evaluate/issue_2535_3`


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

## `uglify/evaluate/void_returns_recursive`

- tags: `join vars`, `remove unused`

```js
var a = function f() {
	function g(b) {
		return f();
	}
	while (1) {
		console.log('PASS');
		try {
			if (console) return;
		} catch (e) {
			return g(e);
		}
	}
}();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,12 +2,12 @@
 	function g(b) {
 		return f();
 	}
-	while (1) {
+	for (;;) {
 		console.log('PASS');
 		try {
 			if (console) return;
 		} catch (e) {
-			return g();
+			return g(e);
 		}
 	}
 }();

```

## `uglify/exports/defaults_parentheses_6`


```js
export default !function() {
	while (!console);
}() ? 'PASS' : 'FAIL';

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 export default (function() {
-	while (!console);
+	for (; !console;);
 })() ? 'FAIL' : 'PASS';

```

## `uglify/functions/catch_defun`


```js
try {
	throw 42;
} catch (a) {
	function f() {
		return typeof a;
	}
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 try {
 	throw 42;
-} catch (o) {
-	function t() {
-		return typeof o;
+} catch (a) {
+	function f() {
+		return typeof a;
 	}
 }
-console.log(t());
+console.log(f());

```

## `uglify/functions/hoist_funs`


```js
console.log(1, typeof f, typeof g);
if (console.log(2, typeof f, typeof g)) console.log(3, typeof f, typeof g);
else {
	console.log(4, typeof f, typeof g);
	function f() {}
	console.log(5, typeof f, typeof g);
}
function g() {}
console.log(6, typeof f, typeof g);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
-function f() {}
-function g() {}
 console.log(1, typeof f, typeof g);
 if (console.log(2, typeof f, typeof g)) console.log(3, typeof f, typeof g);
 else {
 	console.log(4, typeof f, typeof g);
+	function f() {}
 	console.log(5, typeof f, typeof g);
 }
+function g() {}
 console.log(6, typeof f, typeof g);

```

## `uglify/functions/issue_2737_1`

- tags: `join vars`, `remove unused`

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
@@ -1,5 +1,5 @@
 (function(a) {
-	while (a());
+	for (; a(););
 })(function f() {
 	console.log(typeof f);
 });

```

## `uglify/functions/issue_3771`

- tags: `join vars`, `remove unused`

```js
try {
	function f(a) {
		var a = f(1234);
	}
	f();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 try {
-	(function f(a) {
-		f();
-	})();
-} catch (e) {
+	function f(a) {
+		f(1234);
+	}
+	f();
+} catch {
 	console.log('PASS');
 }

```

## `uglify/functions/issue_4171_1`

- tags: `join vars`, `remove unused`

```js
console.log(function(a) {
	try {
		while (a) var e = function() {};
	} catch (e) {
		return function() {
			return e;
		};
	}
}(!console));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log(function(a) {
 	try {
-		while (a) var e = function() {};
+		for (; a;) var e = function() {};
 	} catch (e) {
 		return function() {
 			return e;

```

## `uglify/functions/issue_4451`

- tags: `join vars`, `remove unused`

```js
var a = function f() {
	for (f in 'foo') return f;
};
while (console.log(typeof a()));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var a = function f() {
 	for (f in 'foo') return f;
 };
-while (console.log(typeof a()));
+for (; console.log(typeof a()););

```

## `uglify/functions/issue_4471`

- tags: `join vars`, `remove unused`

```js
f(f());
function f() {
	return g();
}
function g() {
	{
		console.log('PASS');
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-f(g());
+f(f());
 function f() {
 	return g();
 }

```

## `uglify/functions/issue_4659_3`

- tags: `join vars`, `remove unused`

```js
var a = 0;
(function() {
	function f() {
		return a++;
	}
	(function() {
		function g() {
			while (!console);
		}
		g(f && f());
		(function() {
			var a = console && a;
		})();
	})();
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -3,10 +3,11 @@
 	function f() {
 		return a++;
 	}
-	f && a++;
-	while (!console);
 	(function() {
-		var a = console && a;
+		function g() {
+			for (; !console;);
+		}
+		g(f && f());
 	})();
 })();
 console.log(a);

```

## `uglify/functions/issue_5692`


```js
(function() {
	while (console.log('PASS')) if (console) return;
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function() {
-	while (console.log('PASS')) if (console) return;
+	for (; console.log('PASS');) if (console) return;
 })();

```

## `uglify/functions/issue_5925`

- tags: `join vars`

```js
var a = 42;
console.log(function() {
	function f() {
		return +a - 41;
	}
	var b = f(f);
	a--;
	return b;
}() ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 42;
 console.log(function() {
 	function f() {
-		return +a - 41;
+		return a - 41;
 	}
 	var b = f(f);
 	a--;

```

## `uglify/functions/shorter_without_void`

- tags: `join vars`, `2 iterations`

```js
var a;
function f(b) {
	a = b;
}
f('foo');
console.log(a) || f('bar');
console.log(a, f('baz'));
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 function f(b) {
 	a = b;
 }
-a = 'foo';
-console.log(a) || (a = 'bar');
+f('foo');
+console.log(a) || f('bar');
 console.log(a, f('baz'));
 console.log(a);

```

## `uglify/global_defs/mixed`


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
@@ -1,8 +1,7 @@
-var FOO = { BAR: 0 };
-console.log('moo');
+console.log({ BAR: 0 }.BAR);
 console.log(++CONFIG.DEBUG);
 console.log(++CONFIG.VALUE);
 console.log(++CONFIG.VALUE);
-console.log(++DEBUG[42]);
+console.log(++DEBUG[CONFIG.VALUE]);
 CONFIG.VALUE.FOO = 'bar';
 console.log(CONFIG);

```

## `uglify/hoist_props/issue_2473_4`

- tags: `join vars`, `remove unused`

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
@@ -1,4 +1,7 @@
 (function() {
-	var o_a = 1, o_b = 2;
-	console.log(o_a, o_b);
+	var o = {
+		a: 1,
+		b: 2
+	};
+	console.log(o.a, o.b);
 })();

```

## `uglify/hoist_props/issue_3046`

- tags: `join vars`

```js
console.log(function(a) {
	do {
		var b = { c: a++ };
	} while (b.c && a);
	return a;
}(0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log(function(a) {
-	do {
-		var b, b_c = a++;
-	} while (b_c && a);
+	do
+		var b = { c: a++ };
+	while (b.c && a);
 	return a;
 }(0));

```

## `uglify/hoist_props/issue_3871`

- tags: `join vars`

```js
console.log(function() {
	do {
		var b = { get null() {
			c;
		} };
	} while (!b);
	return 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 console.log(function() {
-	do {
+	do
 		var b = { get null() {
 			c;
 		} };
-	} while (!b);
+	while (!b);
 	return 'PASS';
 }());

```

## `uglify/hoist_props/issue_3945_1`

- tags: `join vars`

```js
function f() {
	o.p;
	var o = { q: 0 };
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f() {
 	o.p;
-	var o, o_q = 0;
+	var o = { q: 0 };
 }

```

## `uglify/hoist_props/issue_3945_2`

- tags: `join vars`

```js
console.log(typeof o);
var o = { p: 0 };

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 console.log(typeof o);
-var o, o_p = 0;
+var o = { p: 0 };

```

## `uglify/hoist_props/issue_5498`

- tags: `join vars`

```js
var o = { __proto__: 42 };
while (console.log(typeof o.__proto__));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var o = { __proto__: 42 };
-while (console.log(typeof o.__proto__));
+for (; console.log(typeof o.__proto__););

```

## `uglify/hoist_vars/issue_4736`

- tags: `join vars`, `remove unused`

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
@@ -1,6 +1,6 @@
-(function() {
+function f() {
 	(function() {
-		0;
 		console.log(1 << 30);
-	})();
-})();
+	})(f);
+}
+f();

```

## `uglify/hoist_vars/issue_5638_3`

- tags: `join vars`

```js
var log = console.log;
var o = { foo: 42 };
for (var k in o) {
	var v = o[k];
	log(k || v, v++);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-var log, o, k, v;
-log = console.log;
-for (k in o = { foo: 42 }) {
-	v = o[k];
+var log = console.log, o = { foo: 42 };
+for (var k in o) {
+	var v = o[k];
 	log(k || v, v++);
 }

```

## `uglify/hoist_vars/issue_5638_4`

- tags: `join vars`

```js
var log = console.log;
var o = { foo: 6 };
for (var k in o) {
	var v = o[k];
	log(k || v, v *= 7);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-var log, o, k, v;
-log = console.log;
-for (k in o = { foo: 6 }) {
-	v = o[k];
+var log = console.log, o = { foo: 6 };
+for (var k in o) {
+	var v = o[k];
 	log(k || v, v *= 7);
 }

```

## `uglify/ie/issue_2976_1`


```js
console.log(function f() {
	var a;
	return a === f ? 'FAIL' : 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log(function n() {
-	var o;
-	return o === n ? 'FAIL' : 'PASS';
+console.log(function f() {
+	var a;
+	return a === f ? 'FAIL' : 'PASS';
 }());

```

## `uglify/ie/issue_2976_2`


```js
console.log(function f() {
	var a;
	return a === f ? 'FAIL' : 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log(function f() {
-	var n;
-	return n === f ? 'FAIL' : 'PASS';
+	var a;
+	return a === f ? 'FAIL' : 'PASS';
 }());

```

## `uglify/ie/issue_2976_3`


```js
console.log(function f() {
	var a;
	return a === f ? 'FAIL' : 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log(function o() {
-	var n;
-	return n === o ? 'FAIL' : 'PASS';
+console.log(function f() {
+	var a;
+	return a === f ? 'FAIL' : 'PASS';
 }());

```

## `uglify/ie/issue_3999`


```js
(function() {
	(function f() {
		for (var i = 0; i < 2; i++) try {
			f[0];
		} catch (f) {
			var f = 0;
			console.log(i);
		}
	})();
})(typeof f);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 (function() {
 	(function f() {
-		for (var o = 0; o < 2; o++) try {
+		for (var i = 0; i < 2; i++) try {
 			f[0];
 		} catch (f) {
 			var f = 0;
-			console.log(o);
+			console.log(i);
 		}
 	})();
 })(typeof f);

```

## `uglify/if_return/if_var_return_4`

- tags: `sequences`

```js
function f() {
	if (u()) return v();
	var a = w();
	if (x()) return y(a);
	z();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 function f() {
-	var a;
-	return u() ? v() : (a = w(), x() ? y(a) : (z(), void 0));
+	if (u()) return v();
+	var a = w();
+	if (x()) return y(a);
+	z();
 }

```

## `uglify/if_return/issue_5592_1`


```js
L: {
	do {
		switch (console.log('foo')) {
			case console.log('bar'):
				if (console) break;
				break L;
		}
	} while (console.log('baz'));
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
-L: do {
-	switch (console.log('foo')) {
-		case console.log('bar'):
-			if (console) break;
-			break L;
-	}
-} while (console.log('baz'));
+L: {
+	do
+		switch (console.log('foo')) {
+			case console.log('bar'):
+				if (console) break;
+				break L;
+		}
+	while (console.log('baz'));
+}

```

## `uglify/if_return/issue_5688`


```js
L: do {
	switch (console) {
		default:
			if (console) break;
			if (FAIL_1);
			else break L;
			break;
		case 42: FAIL_2;
	}
} while (console.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
-L: do {
+L: do
 	switch (console) {
 		default:
 			if (console) break;
-			if (FAIL_1) break;
-			break L;
+			if (!FAIL_1) break L;
+			break;
 		case 42: FAIL_2;
 	}
-} while (console.log('PASS'));
+while (console.log('PASS'));

```

## `uglify/issue-1202/mangle_keep_fnames_false`

- tags: `keep function names`

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
-	return function t(n, r, u) {
-		return n + r + u;
+	return function n(a, b, c) {
+		return a + b + c;
 	};
 }

```

## `uglify/issue-1202/mangle_keep_fnames_true`

- tags: `keep function names`

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

## `uglify/issue-1321/issue_1321_debug`


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
-x.x = 1;
-x['_$foo$_'] = 2 * x.x;
-console.log(x.x, x['_$foo$_']);
+x.foo = 1;
+x._$foo$_ = 2 * x.foo;
+console.log(x.foo, x._$foo$_);

```

## `uglify/issue-1321/issue_1321_no_debug`


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
-x.x = 1;
-x['a'] = 2 * x.x;
-console.log(x.x, x['a']);
+x.foo = 1;
+x.a = 2 * x.foo;
+console.log(x.foo, x.a);

```

## `uglify/issue-1321/issue_1321_with_quoted`


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
-x.x = 1;
-x['o'] = 2 * x.x;
-console.log(x.x, x['o']);
+x.foo = 1;
+x.a = 2 * x.foo;
+console.log(x.foo, x.a);

```

## `uglify/issue-1431/level_one`

- tags: `keep function names`

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
-		function n(n) {
-			return n * n;
+		function n(a) {
+			return a * a;
 		}
-		return r(n);
+		return x(n);
 	};
 }

```

## `uglify/issue-1431/level_three`

- tags: `keep function names`

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
-function f(t) {
+function f(x) {
 	return function() {
-		function r(n) {
-			return n * n;
+		function r(a) {
+			return a * a;
 		}
 		return [function() {
-			function t(n) {
-				return n * n;
+			function t(a) {
+				return a * a;
 			}
 			return t;
 		}, function() {
-			function n(n) {
-				return n * n;
+			function n(a) {
+				return a * a;
 			}
-			return t(n);
+			return x(n);
 		}];
 	};
 }

```

## `uglify/issue-1431/level_two`

- tags: `keep function names`

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
-		function r(n) {
-			return n * n;
+		function r(a) {
+			return a * a;
 		}
 		return function() {
-			function n(n) {
-				return n * n;
+			function n(a) {
+				return a * a;
 			}
-			return t(n);
+			return x(n);
 		};
 	};
 }

```

## `uglify/issue-1431/level_zero`

- tags: `keep function names`

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
-	function n(n) {
-		return n * n;
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

## `uglify/issue-1833/label_do`


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

## `uglify/issue-597/beautify_off_1`


```js
var NaN;
console.log(null, undefined, Infinity, NaN, Infinity * undefined, Infinity.toString(), NaN.toString(), (Infinity * undefined).toString());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var NaN;
-console.log(null, void 0, 1 / 0, NaN, 0 / 0, (1 / 0).toString(), NaN.toString(), (0 / 0).toString());
+console.log(null, void 0, Infinity, NaN, Infinity * void 0, 'Infinity', NaN.toString(), 'NaN');

```

## `uglify/issue-597/beautify_on_1`


```js
var NaN;
console.log(null, undefined, Infinity, NaN, Infinity * undefined, Infinity.toString(), NaN.toString(), (Infinity * undefined).toString());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var NaN;
-console.log(null, void 0, 1 / 0, NaN, 0 / 0, (1 / 0).toString(), NaN.toString(), (0 / 0).toString());
+console.log(null, void 0, Infinity, NaN, Infinity * void 0, 'Infinity', NaN.toString(), 'NaN');

```

## `uglify/join_vars/issue_3791_1`

- tags: `join vars`

```js
var a = 'PASS';
switch (a) {
	case console:
}
var a = a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a;
-switch (a = 'PASS') {
+var a = 'PASS';
+switch (a) {
 	case console:
 }
 var a = a;

```

## `uglify/join_vars/join_object_assignments_NaN_1`

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
 o[NaN] = 1;
-o[0 / 0] = 2;
+o[NaN] = 2;
 console.log(o[NaN], o[NaN]);

```

## `uglify/join_vars/join_object_assignments_return_2`

- tags: `join vars`

```js
console.log(function() {
	var o = { p: 3 };
	return o.q = /foo/, o.r = 'bar';
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,4 @@
 console.log(function() {
-	var o = {
-		p: 3,
-		q: /foo/,
-		r: 'bar'
-	};
-	return o.r;
+	var o = { p: 3 };
+	return o.q = /foo/, o.r = 'bar';
 }());

```

## `uglify/keep_fargs/function_argument_mangle`


```js
A = 'PASS';
var a = A;
(function(o) {
	console.log(a);
})('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 A = 'PASS';
-var n = A;
+var a = A;
 (function(o) {
-	console.log(n);
+	console.log(a);
 })('FAIL');

```

## `uglify/keep_fargs/replace_all_var_scope`

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
-(function(c) {
+(function(r, a) {
 	switch (~a) {
 		case b += a:
-		case c++:
+		case a++:
 	}
-})((--b, a));
+})(--b, a);
 console.log(a, b);

```

## `uglify/keep_fargs/try_increment`

- tags: `join vars`, `remove unused`

```js
console.log(function(a) {
	try {
		return ++a;
	} catch (e) {}
}(0));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-console.log(function() {
+console.log(function(a) {
 	try {
-		return 1;
-	} catch (e) {}
-}());
+		return ++a;
+	} catch {}
+}(0));

```

## `uglify/labels/labels_5`

- tags: `remove unused`

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

## `uglify/labels/labels_7`


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

## `uglify/labels/labels_8`


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

## `uglify/let/issue_5338`

- tags: `remove unused`

```js
'use strict';
let a = a;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 'use strict';
-a;
-let a;
+let a = a;

```

## `uglify/let/issue_5476`


```js
'use strict';
console.log(function(n) {
	let a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use strict';
 console.log(function(n) {
-	let o;
+	let a;
 }());

```

## `uglify/let/join_let_var_2`

- tags: `join vars`

```js
'use strict';
let a = 'foo';
var b = 'bar';
for (let c of [a, b]) console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 'use strict';
-let a = 'foo', b = 'bar';
-for (let c of [a, b]) console.log(c);
+let a = 'foo';
+for (let c of ['foo', 'bar']) console.log(c);

```

## `uglify/let/retain_block_2_mangle`


```js
'use strict';
{
	var a;
	let a;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'use strict';
 {
-	var t;
-	let t;
+	var a;
+	let a;
 }

```

## `uglify/let/retain_block_3_mangle`


```js
'use strict';
{
	let a;
	var a;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'use strict';
 {
-	let t;
-	var t;
+	let a;
+	var a;
 }

```

## `uglify/loops/issue_186`


```js
var x = 3;
if (foo()) do
	do
		alert(x);
	while (--x);
while (x);
else bar();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var x = 3;
-if (foo()) do {
-	do {
+if (foo()) do
+	do
 		alert(x);
-	} while (--x);
-} while (x);
+	while (--x);
+while (x);
 else bar();

```

## `uglify/loops/issue_186_beautify`


```js
var x = 3;
if (foo()) do
	do
		alert(x);
	while (--x);
while (x);
else bar();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var x = 3;
-if (foo()) do {
-	do {
+if (foo()) do
+	do
 		alert(x);
-	} while (--x);
-} while (x);
+	while (--x);
+while (x);
 else bar();

```

## `uglify/max_line_len/template_newline`


```js
console.log(`foo
bar`);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-console.log(`foo
-bar`);
+console.log('foo\nbar');

```

## `uglify/merge_vars/conditional_write`

- tags: `join vars`

```js
var a = 'FAIL', b;
if (console) a = 'PASS';
b = [a, 42].join();
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = 'FAIL', a;
-if (console) a = 'PASS';
-a = [a, 42].join();
-console.log(a);
+var a = 'FAIL', b;
+console && (a = 'PASS');
+b = [a, 42].join();
+console.log(b);

```

## `uglify/merge_vars/cross_branch_1_1`

- tags: `join vars`

```js
var a;
function f() {
	var x, y;
	if (a) x = 'foo';
	console.log(x);
	y = 'bar';
	console.log(y);
}
a = 0;
f();
a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 var a;
 function f() {
-	var x, x;
-	if (a) x = 'foo';
-	console.log(x);
-	x = 'bar';
+	var x, y;
+	a && (x = 'foo');
 	console.log(x);
+	y = 'bar';
+	console.log(y);
 }
 a = 0;
 f();

```

## `uglify/merge_vars/cross_branch_1_2`

- tags: `join vars`

```js
var a;
function f() {
	var x, y;
	if (a) {
		x = 'foo';
		console.log(x);
	}
	y = 'bar';
	console.log(y);
}
a = 0;
f();
a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var a;
 function f() {
-	var x, x;
+	var x, y;
 	if (a) {
 		x = 'foo';
 		console.log(x);
 	}
-	x = 'bar';
-	console.log(x);
+	y = 'bar';
+	console.log(y);
 }
 a = 0;
 f();

```

## `uglify/merge_vars/cross_branch_1_3`

- tags: `join vars`

```js
var a;
function f() {
	var x, y;
	if (a) {
		x = 'foo';
		console.log(x);
		y = 'bar';
	}
	console.log(y);
}
a = 0;
f();
a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var a;
 function f() {
-	var x, x;
+	var x, y;
 	if (a) {
 		x = 'foo';
 		console.log(x);
-		x = 'bar';
+		y = 'bar';
 	}
-	console.log(x);
+	console.log(y);
 }
 a = 0;
 f();

```

## `uglify/merge_vars/cross_branch_2a_1`

- tags: `join vars`

```js
var a, b;
function f() {
	var x, y;
	if (a) {
		if (b) x = 'foo';
		console.log(x);
	}
	y = 'bar';
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var a, b;
 function f() {
-	var x, x;
+	var x, y;
 	if (a) {
-		if (b) x = 'foo';
+		b && (x = 'foo');
 		console.log(x);
 	}
-	x = 'bar';
-	console.log(x);
+	y = 'bar';
+	console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/cross_branch_2a_3`

- tags: `join vars`

```js
var a, b;
function f() {
	var x, y;
	if (a) {
		if (b) x = 'foo';
		console.log(x);
		y = 'bar';
	}
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var a, b;
 function f() {
-	var x, x;
+	var x, y;
 	if (a) {
-		if (b) x = 'foo';
+		b && (x = 'foo');
 		console.log(x);
-		x = 'bar';
+		y = 'bar';
 	}
-	console.log(x);
+	console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/cross_branch_2a_4`

- tags: `join vars`

```js
var a, b;
function f() {
	var x, y;
	if (a) {
		if (b) {
			x = 'foo';
			console.log(x);
		}
		y = 'bar';
	}
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
 var a, b;
 function f() {
-	var x, x;
+	var x, y;
 	if (a) {
 		if (b) {
 			x = 'foo';
 			console.log(x);
 		}
-		x = 'bar';
+		y = 'bar';
 	}
-	console.log(x);
+	console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/cross_branch_2a_7`

- tags: `join vars`

```js
var a, b;
function f() {
	var x, y;
	if (a) {
		x = 'foo';
		console.log(x);
		if (b) y = 'bar';
	}
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 	if (a) {
 		x = 'foo';
 		console.log(x);
-		if (b) y = 'bar';
+		b && (y = 'bar');
 	}
 	console.log(y);
 }

```

## `uglify/merge_vars/cross_branch_2b_2`

- tags: `join vars`

```js
var a, b;
function f() {
	var x, y;
	if (a) x = 'foo';
	if (b) {
		console.log(x);
		y = 'bar';
	}
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a, b;
 function f() {
 	var x, y;
-	if (a) x = 'foo';
+	a && (x = 'foo');
 	if (b) {
 		console.log(x);
 		y = 'bar';

```

## `uglify/merge_vars/cross_branch_2b_3`

- tags: `join vars`

```js
var a, b;
function f() {
	var x, y;
	if (a) x = 'foo';
	if (b) {
		console.log(x);
		y = 'bar';
		console.log(y);
	}
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 var a, b;
 function f() {
-	var x, x;
-	if (a) x = 'foo';
+	var x, y;
+	a && (x = 'foo');
 	if (b) {
-		console.log(x);
-		x = 'bar';
 		console.log(x);
+		y = 'bar';
+		console.log(y);
 	}
 }
 a = 0, b = 0;

```

## `uglify/merge_vars/cross_branch_2b_4`

- tags: `join vars`

```js
var a, b;
function f() {
	var x, y;
	if (a) x = 'foo';
	console.log(x);
	if (b) y = 'bar';
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var a, b;
 function f() {
 	var x, y;
-	if (a) x = 'foo';
+	a && (x = 'foo');
 	console.log(x);
-	if (b) y = 'bar';
+	b && (y = 'bar');
 	console.log(y);
 }
 a = 0, b = 0;

```

## `uglify/merge_vars/cross_branch_2b_5`

- tags: `join vars`

```js
var a, b;
function f() {
	var x, y;
	if (a) x = 'foo';
	console.log(x);
	if (b) {
		y = 'bar';
		console.log(y);
	}
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 var a, b;
 function f() {
-	var x, x;
-	if (a) x = 'foo';
+	var x, y;
+	a && (x = 'foo');
 	console.log(x);
 	if (b) {
-		x = 'bar';
-		console.log(x);
+		y = 'bar';
+		console.log(y);
 	}
 }
 a = 0, b = 0;

```

## `uglify/merge_vars/cross_branch_2b_6`

- tags: `join vars`

```js
var a, b;
function f() {
	var x, y;
	if (a) {
		x = 'foo';
		console.log(x);
	}
	if (b) y = 'bar';
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -5,7 +5,7 @@
 		x = 'foo';
 		console.log(x);
 	}
-	if (b) y = 'bar';
+	b && (y = 'bar');
 	console.log(y);
 }
 a = 0, b = 0;

```

## `uglify/merge_vars/cross_branch_2b_7`

- tags: `join vars`

```js
var a, b;
function f() {
	var x, y;
	if (a) {
		x = 'foo';
		console.log(x);
	}
	if (b) {
		y = 'bar';
		console.log(y);
	}
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
 var a, b;
 function f() {
-	var x, x;
+	var x, y;
 	if (a) {
 		x = 'foo';
 		console.log(x);
 	}
 	if (b) {
-		x = 'bar';
-		console.log(x);
+		y = 'bar';
+		console.log(y);
 	}
 }
 a = 0, b = 0;

```

## `uglify/merge_vars/if_branch`

- tags: `join vars`

```js
console.log(function(a) {
	var b = 'FAIL', c;
	if (a) c = b;
	return c || 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(function(a) {
 	var b = 'FAIL', c;
-	if (a) c = b;
+	a && (c = b);
 	return c || 'PASS';
 }());

```

## `uglify/merge_vars/issue_4110`

- tags: `join vars`

```js
while (a) var c;
var b, a = c += b = a;
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-while (a) var c;
+for (; a;) var c;
 var b, a = c += b = a;
 console.log(b);

```

## `uglify/numbers/issue_3695`


```js
var a = [];
console.log(+(a * (a[0] = false)));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = [];
-console.log(a * (a[0] = false));
+console.log(+(a * (a[0] = !1)));

```

## `uglify/numbers/issue_4142`


```js
console.log('' + +(0 === console));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('' + +(0 === console));
+console.log('' + +(console === 0));

```

## `uglify/numbers/unsafe_math_swap_constant`


```js
var a = 1, b = 2;
console.log(a++ + b-- + 3, a++ + b + 3, a + b-- + 3, a + b + 3, a++ - b-- + 3, a++ - b + 3, a - b-- + 3, a - b + 3);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 1, b = 2;
-console.log(3 + a++ + b--, a++ + b + 3, a + b-- + 3, a + b + 3, 3 + a++ - b--, 3 + a++ - b, a - b-- + 3, a - b + 3);
+console.log(a++ + b-- + 3, a++ + b + 3, a + b-- + 3, a + b + 3, a++ - b-- + 3, a++ - b + 3, a - b-- + 3, a - b + 3);

```

## `uglify/objects/duplicate_key_strict`


```js
'use strict';
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
@@ -1,7 +1,7 @@
 'use strict';
 var o = {
 	a: 1,
-	a: 3,
-	b: 2
+	b: 2,
+	a: 3
 };
 for (var k in o) console.log(k, o[k]);

```

## `uglify/objects/issue_5213`


```js
var a = 'FAIL';
console.log({
	p: a = 'PASS',
	0: a,
	p: null
}[0]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var a = 'FAIL';
 console.log({
-	p: (a = 'PASS', null),
-	0: a
+	p: a = 'PASS',
+	0: a,
+	p: null
 }[0]);

```

## `uglify/optional-chains/issue_4906`

- tags: `remove unused`

```js
do {
	var a = a?.[42];
} while (console.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-do {
+do
 	var a = a?.[42];
-} while (console.log('PASS'));
+while (console.log('PASS'));

```

## `uglify/preserve_line/return_1`


```js
console.log(function f() {
	return f.toString() != 42;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function f() {
-	return 42 != f.toString();
+	return f.toString() != 42;
 }());

```

## `uglify/preserve_line/return_2`


```js
console.log(function f() {
	return f.toString() != 42;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function f() {
-	return 42 != f.toString();
+	return f.toString() != 42;
 }());

```

## `uglify/preserve_line/return_3`


```js
console.log(function f() {
	return f.toString() != 42;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function f() {
-	return 42 != f.toString();
+	return f.toString() != 42;
 }());

```

## `uglify/preserve_line/return_4`


```js
console.log(function f() {
	return f.toString() != 42;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function f() {
-	return 42 != f.toString();
+	return f.toString() != 42;
 }());

```

## `uglify/properties/issue_5682_dot_1`


```js
function f(a) {
	return a.foo;
}
var o = {};
var p = 'foo';
o[p] = 'PASS';
console.log(f(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f(o) {
-	return o.foo;
+function f(a) {
+	return a.foo;
 }
 var o = {};
 var p = 'foo';

```

## `uglify/properties/issue_5682_in_1`


```js
function f(a) {
	return 'foo' in a;
}
var o = {};
var p = 'foo';
o[p] = 42;
console.log(f(o) ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f(o) {
-	return 'foo' in o;
+function f(a) {
+	return 'foo' in a;
 }
 var o = {};
 var p = 'foo';

```

## `uglify/properties/issue_5927`

- tags: `join vars`

```js
A = {};
while (console.log('PASS'));
A.p;
A.q = 42;
A.q.r = 42;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 A = {};
-while (console.log('PASS'));
+for (; console.log('PASS'););
 A.p;
 A.q = 42;
 A.q.r = 42;

```

## `uglify/properties/issue_869_1`


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

## `uglify/properties/issue_869_2`


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

## `uglify/properties/mangle_global_property_collision_global`


```js
o = 'foo';
A = 'bar';
global.A = 'baz';
console.log(o, A);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 o = 'foo';
-l = 'bar';
-global.l = 'baz';
-console.log(o, l);
+A = 'bar';
+global.A = 'baz';
+console.log(o, A);

```

## `uglify/properties/mangle_global_property_collision_local`


```js
var o = 'foo';
A = 'bar';
global.A = 'baz';
console.log(o, A);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var o = 'foo';
-l = 'bar';
-global.l = 'baz';
-console.log(o, l);
+A = 'bar';
+global.A = 'baz';
+console.log(o, A);

```

## `uglify/properties/mangle_global_property_collision_property`


```js
var a = global;
a.p = 'foo';
A = 'bar';
global.A = 'baz';
console.log(a.p, A);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = global;
-a.l = 'foo';
-o = 'bar';
-global.o = 'baz';
-console.log(a.l, o);
+a.p = 'foo';
+A = 'bar';
+global.A = 'baz';
+console.log(a.p, A);

```

## `uglify/reduce_vars/iife_arguments_3`

- tags: `join vars`, `remove unused`, `2 iterations`

```js
(function() {
	var x = function f() {
		return f;
	};
	console.log(x() === arguments[0]);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function() {
-	console.log(function x() {
-		return x;
+	console.log(function f() {
+		return f;
 	}() === arguments[0]);
 })();

```

## `uglify/reduce_vars/inner_var_for_1`

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
-	for (var b = 2, c = 3; x(1, 2, 3, d); x(1, 2, 3, d)) {
+	x(a, b, d);
+	for (var b = 2, c = 3; x(a, b, c, d); x(a, b, c, d)) {
 		var d = 4, e = 5;
-		x(1, 2, 3, d, e);
+		x(a, b, c, d, e);
 	}
-	x(1, 2, 3, d, e);
+	x(a, b, c, d, e);
 }

```

## `uglify/reduce_vars/inner_var_for_in_1`

- tags: `join vars`

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
@@ -1,10 +1,10 @@
 function f() {
 	var a = 1, b = 2;
 	for (b in (function() {
-		return x(1, b, c);
+		return x(a, b, c);
 	})()) {
 		var c = 3, d = 4;
-		x(1, b, c, d);
+		x(a, b, c, d);
 	}
-	x(1, b, c, d);
+	x(a, b, c, d);
 }

```

## `uglify/reduce_vars/issue_2774`

- tags: `join vars`, `remove unused`

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
-	(b = true) && b.c;
-	void 0;
+	(b = !0) && b.c;
+	b = void 0;
 } }.a);

```

## `uglify/reduce_vars/issue_3113_1`

- tags: `join vars`

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
@@ -1,7 +1,7 @@
 var c = 0;
 (function() {
 	function f() {
-		while (g());
+		for (; g(););
 	}
 	var a = f();
 	function g() {

```

## `uglify/reduce_vars/issue_3113_2`

- tags: `join vars`

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
@@ -1,7 +1,7 @@
 var c = 0;
 (function() {
 	function f() {
-		while (g());
+		for (; g(););
 	}
 	var a = f();
 	function g() {

```

## `uglify/reduce_vars/issue_3113_5`

- tags: `join vars`

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
@@ -4,6 +4,6 @@
 function g() {
 	f();
 }
-while (g());
+for (; g(););
 var a = 1;
 f();

```

## `uglify/reduce_vars/issue_3880`

- tags: `join vars`, `remove unused`

```js
(function(a) {
	while (a.var ^= 1);
	console.log('PASS');
})(function() {});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function(a) {
-	while (a.var ^= 1);
+	for (; a.var ^= 1;);
 	console.log('PASS');
 })(function() {});

```

## `uglify/reduce_vars/issue_3957_1`

- tags: `join vars`

```js
function f(a) {
	while (a += console.log(a = 0)) a = 0;
}
f('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	while (a += console.log(a = 0)) a = 0;
+	for (; a += console.log(a = 0);) a = 0;
 }
 f('FAIL');

```

## `uglify/reduce_vars/issue_3957_2`

- tags: `join vars`, `remove unused`

```js
function f(a) {
	while (a += console.log(a = 0)) a = 0;
}
f('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	while (a += console.log(a = 0)) a = 0;
+	for (; a += console.log(a = 0);) a = 0;
 }
 f('FAIL');

```

## `uglify/reduce_vars/issue_4188_1`

- tags: `join vars`, `remove unused`

```js
(function() {
	try {
		while (A) var a = function() {}, b = a;
	} catch (a) {
		console.log(function() {
			return typeof a;
		}(), typeof b);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 (function() {
 	try {
-		while (A) var a = function() {}, b = a;
+		for (; A;) var a = function() {}, b = a;
 	} catch (a) {
 		console.log(function() {
 			return typeof a;

```

## `uglify/reduce_vars/issue_4188_2`

- tags: `join vars`, `remove unused`

```js
(function() {
	try {
		throw 42;
	} catch (a) {
		console.log(function() {
			return typeof a;
		}(), typeof b);
	}
	while (!console) var a = function() {}, b = a;
})();

```

```diff
--- reference
+++ oxc
@@ -6,5 +6,5 @@
 			return typeof a;
 		}(), typeof b);
 	}
-	while (!console) var a = function() {}, b = a;
+	for (; !console;) var a = function() {}, b = a;
 })();

```

## `uglify/reduce_vars/issue_4937`

- tags: `join vars`, `remove unused`

```js
function f() {
	while (console.log('PASS'));
}
do {
	function g() {
		f();
	}
} while (!g);
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f() {
-	while (console.log('PASS'));
+	for (; console.log('PASS'););
 }
 do {
 	function g() {

```

## `uglify/reduce_vars/multi_def_2`

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

## `uglify/reduce_vars/recursive_inlining_4`

- tags: `join vars`, `remove unused`

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
	bar(5);
}();

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,16 @@
-!function() {
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
-}();
+})();

```

## `uglify/reduce_vars/var_assign_3`

- tags: `join vars`, `sequences`, `remove unused`

```js
!function() {
	var a;
	while (a = 2);
	console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-!function() {
-	var a;
-	while (a = 2);
+(function() {
+	for (var a; a = 2;);
 	console.log(a);
-}();
+})();

```

## `uglify/regexp/var_test_global`

- tags: `join vars`

```js
var r = /a/g;
while (r.test('aaa')) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var r = /a/g;
-while (r.test('aaa')) console.log('PASS');
+for (; r.test('aaa');) console.log('PASS');

```

## `uglify/rests/drop_unused_call_args_2`

- tags: `remove unused`

```js
console.log(function(a, ...b) {
	return b;
}(console).length);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function(b) {
+console.log(function(a, ...b) {
 	return b;
-}((console, [])).length);
+}(console).length);

```

## `uglify/rests/merge_funarg`

- tags: `join vars`

```js
(function(...a) {
	var b = a.length;
	console.log(b);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function(...a) {
-	var a = a.length;
-	console.log(a);
+	var b = a.length;
+	console.log(b);
 })();

```

## `uglify/rests/merge_funarg_destructured_array`

- tags: `join vars`

```js
(function([ ...a]) {
	var b = a.length;
	console.log(b);
})([]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function([ ...a]) {
-	var a = a.length;
-	console.log(a);
+	var b = a.length;
+	console.log(b);
 })([]);

```

## `uglify/rests/merge_funarg_destructured_object`

- tags: `join vars`

```js
(function({ ...a }) {
	var b = a[0];
	console.log(b);
})(['PASS']);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function({ ...a }) {
-	var a = a[0];
-	console.log(a);
+	var b = a[0];
+	console.log(b);
 })(['PASS']);

```

## `uglify/sequences/hoist_defun`

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

## `uglify/sequences/issue_2062`

- tags: `join vars`

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
-a || (a++, a--), a++, --a && a.var;
+a || a++ + a--, a++ + a--, a && a.var;
 console.log(a);

```

## `uglify/sequences/issue_3703`

- tags: `sequences`

```js
var a = 'FAIL';
while ((a = 'PASS', 0).foo = 0);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var a = 'FAIL';
-while (a = 'PASS', 0 .foo = 0);
+for (var a = 'FAIL'; (a = 'PASS', 0).foo = 0;);
 console.log(a);

```

## `uglify/sequences/lift_sequences_3`

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

## `uglify/sequences/limit_1`

- tags: `sequences`

```js
a;
b;
c;
d;
e;
f;
g;
h;
i;
j;
k;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-a, b, c;
-d, e, f;
-g, h, i;
-j, k;
+a, b, c, d, e, f, g, h, i, j, k;

```

## `uglify/sequences/limit_2`

- tags: `sequences`

```js
a, b;
c, d;
e, f;
g, h;
i, j;
k;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-a, b, c, d;
-e, f, g, h;
-i, j, k;
+a, b, c, d, e, f, g, h, i, j, k;

```

## `uglify/sequences/side_effects_cascade_2`

- tags: `join vars`

```js
function f(a, b) {
	b = a, !a + (b += a) || (b += a), b = a, b;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f(a, b) {
-	!(b = a) + (b += a) || (b += a), b = a;
+	b = a, !a + (b += a) || (b += a), b = a;
 }

```

## `uglify/side_effects/issue_4325`

- tags: `join vars`, `remove unused`, `2 iterations`

```js
(function f() {
	(function(b, c) {
		try {
			c.p = 0;
		} catch (e) {
			console.log('PASS');
			return b;
		}
		c;
	})(f++);
})();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-(function() {
-	(function(c) {
+(function f() {
+	(function(b, c) {
 		try {
 			c.p = 0;
-		} catch (e) {
+		} catch {
 			console.log('PASS');
-			return;
+			return b;
 		}
-	})(void 0);
+	})(f++);
 })();

```

## `uglify/spreads/issue_4882_2`


```js
console.log(null == Object.getPrototypeOf({ ...{ __proto__: (console.log(42), null) } }) ? 'FAIL' : 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(null == Object.getPrototypeOf({ ...{ __proto__: (console.log(42), null) } }) ? 'FAIL' : 'PASS');
+console.log(Object.getPrototypeOf({ ...{ __proto__: (console.log(42), null) } }) == null ? 'FAIL' : 'PASS');

```

## `uglify/spreads/object_key_order_1`


```js
var o = {
	...{},
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
-	a: (1, 3),
-	b: 2
+	a: 1,
+	b: 2,
+	a: 3
 };
 for (var k in o) console.log(k, o[k]);

```

## `uglify/spreads/object_key_order_2`


```js
var o = {
	a: 1,
	...{},
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
-	a: (1, 3),
-	b: 2
+	a: 1,
+	b: 2,
+	a: 3
 };
 for (var k in o) console.log(k, o[k]);

```

## `uglify/spreads/object_key_order_3`


```js
var o = {
	a: 1,
	b: 2,
	...{},
	a: 3
};
for (var k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var o = {
-	a: (1, 3),
-	b: 2
+	a: 1,
+	b: 2,
+	a: 3
 };
 for (var k in o) console.log(k, o[k]);

```

## `uglify/spreads/object_key_order_4`


```js
var o = {
	a: 1,
	b: 2,
	a: 3,
	...{}
};
for (var k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var o = {
-	a: (1, 3),
-	b: 2
+	a: 1,
+	b: 2,
+	a: 3
 };
 for (var k in o) console.log(k, o[k]);

```

## `uglify/switches/issue_1663`


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

## `uglify/templates/escape_placeholder_1`


```js
console.log(`\${\n`);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-console.log(`\${
-`);
+console.log('${\n');

```

## `uglify/templates/escape_placeholder_2`


```js
console.log(`\n${'${'}\n`);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-console.log(`
-\${
-`);
+console.log('\n${\n');

```

## `uglify/templates/escape_placeholder_3`


```js
console.log(`\n$${'{'}\n`);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-console.log(`
-\${
-`);
+console.log('\n${\n');

```

## `uglify/templates/escape_placeholder_4`


```js
console.log(`\n${'$'}${'{'}\n`);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-console.log(`
-\${
-`);
+console.log('\n${\n');

```

## `uglify/templates/issue_5136`


```js
console.log(`${A = []}${A[0] = 42}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`` + (A = []) + (A[0] = 42));
+console.log(`${A = []}${A[0] = 42}`);

```

## `uglify/templates/partial_evaluate`


```js
console.log(`${6 * 7} foo ${console ? `PA` + 'SS' : `FA` + `IL`}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('42 foo ' + (console ? 'PASS' : 'FAIL'));
+console.log(`42 foo ${console ? 'PASS' : 'FAIL'}`);

```

## `uglify/transform/if_return`

- tags: `sequences`, `2 iterations`

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
-		return x != y && (x && w(), y) && z(), !0;
+		return x == y || (x && w(), y && z()), !0;
 	}
 }

```

## `uglify/typeof/typeof_defined_2`


```js
'function' == typeof A && A;
'function' != typeof A && A;
'function' == typeof A || A;
'function' != typeof A || A;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-'function' != typeof A && A;
-'function' != typeof A && A;
+typeof A != 'function' && A;
+typeof A == 'function' || A;

```

## `uglify/typeof/typeof_evaluation`


```js
a = typeof 1;
b = typeof 'test';
c = typeof [];
d = typeof {};
e = typeof /./;
f = typeof false;
g = typeof function() {};
h = typeof undefined;

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 a = 'number';
 b = 'string';
-c = typeof [];
-d = typeof {};
+c = 'object';
+d = 'object';
 e = typeof /./;
 f = 'boolean';
 g = 'function';

```

## `uglify/varify/escaped_let`

- tags: `join vars`

```js
'use strict';
let log = console.log;
log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 'use strict';
-var log = console.log;
+let log = console.log;
 log('PASS');

```

## `uglify/varify/forin_const_1`

- tags: `join vars`

```js
const o = {
	foo: 42,
	bar: 'PASS'
};
for (const k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var o = {
+const o = {
 	foo: 42,
 	bar: 'PASS'
 };
-for (const k in o) console.log(k, o[k]);
+for (let k in o) console.log(k, o[k]);

```

## `uglify/varify/forin_const_3`

- tags: `join vars`

```js
'use strict';
const o = {
	p: 42,
	q: 'PASS'
};
for (const k in o) (function f() {
	console.log(k, o[k]);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 'use strict';
-let o = {
+const o = {
 	p: 42,
 	q: 'PASS'
 };
-for (let k in o) (function f() {
+for (let k in o) (function() {
 	console.log(k, o[k]);
 })();

```

## `uglify/webkit/issue_1753_toplevel`


```js
'use strict';
let l = null;
for (let i = 0; i < 1; i++) console.log(i);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 'use strict';
 let l = null;
-for (let e = 0; e < 1; e++) console.log(e);
+for (let i = 0; i < 1; i++) console.log(i);

```

## `uglify/webkit/issue_5480`


```js
'use strict';
L: for (let a in console.log('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 'use strict';
-o: for (let o in console.log('PASS'));
+L: for (let a in console.log('PASS'));

```

## `uglify/yields/issue_5663`

- tags: `remove unused`

```js
var [, a] = function* () {
	console.log('foo');
	yield console.log('bar');
	console.log('baz');
	yield console.log('moo');
	console.log('moz');
	yield FAIL;
}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var [, ,] = function* () {
+var [, a] = function* () {
 	console.log('foo');
 	yield console.log('bar');
 	console.log('baz');

```

## `uglify/yields/reduce_single_use_defun`

- tags: `join vars`, `remove unused`

```js
function* f(a) {
	console.log(a);
}
f('PASS').next();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-(function* (a) {
+function* f(a) {
 	console.log(a);
-})('PASS').next();
+}
+f('PASS').next();

```

