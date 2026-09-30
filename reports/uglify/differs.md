# uglify / differs — Output differs at equal length

Fixtures: 149

[← uglify](README.md) · [← all families](../README.md)

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

## `uglify/collapse_vars/issue_3562`

- tags: `join vars`, `sequences`

```js
function f(a) {
	console.log('PASS', a);
}
function g(b) {
	console.log('FAIL', b);
}
var h;
var c;
if (console) {
	h = f;
	c = 'PASS';
} else {
	h = g;
	c = 'FAIL';
}
h(c);

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,5 @@
 function g(b) {
 	console.log('FAIL', b);
 }
-var h;
-var c;
-c = console ? (h = f, 'PASS') : (h = g, 'FAIL'), h(c);
+var h, c;
+console ? (h = f, c = 'PASS') : (h = g, c = 'FAIL'), h(c);

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

## `uglify/collapse_vars/issue_5779`

- tags: `join vars`

```js
var a = A = 'foo';
a.p = 42;
if (a && !a.p) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = A = 'foo';
 a.p = 42;
-if (a, !a.p) console.log('PASS');
+a && !a.p && console.log('PASS');

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

## `uglify/comparisons/unsafe_indexOf_assignment`


```js
var a;
if ((a = Object.keys({ foo: 42 }).indexOf('bar')) < 0) console.log('PASS');
if (0 > (a = Object.keys({ foo: 42 }).indexOf('bar'))) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a;
-if (!~(a = Object.keys({ foo: 42 }).indexOf('bar'))) console.log('PASS');
-if (!~(a = Object.keys({ foo: 42 }).indexOf('bar'))) console.log('PASS');
+(a = Object.keys({ foo: 42 }).indexOf('bar')) < 0 && console.log('PASS');
+0 > (a = Object.keys({ foo: 42 }).indexOf('bar')) && console.log('PASS');

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

## `uglify/conditionals/condition_matches_alternative`


```js
function foo(x, y) {
	return x.p ? y[0] : x.p;
}
function bar() {
	return g ? h : g;
}
var g = 4;
var h = 5;
console.log(foo({ p: 3 }, [null]), foo({ p: 0 }, [7]), foo({ p: true }, [false]), bar());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 function foo(x, y) {
-	return x.p && y[0];
+	return x.p ? y[0] : x.p;
 }
 function bar() {
 	return g && h;
 }
 var g = 4;
 var h = 5;
-console.log(foo({ p: 3 }, [null]), foo({ p: 0 }, [7]), foo({ p: true }, [false]), bar());
+console.log(foo({ p: 3 }, [null]), foo({ p: 0 }, [7]), foo({ p: !0 }, [!1]), bar());

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

## `uglify/destructured/drop_hole`

- tags: `remove unused`

```js
var [a] = [,];
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = [][0];
+var [a] = [,];
 console.log(a);

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

## `uglify/drop-unused/issue_2660_1`

- tags: `join vars`, `remove unused`

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

## `uglify/drop-unused/issue_3375`

- tags: `join vars`, `remove unused`

```js
var b = 1;
var a = c = [], c = --b + ('function' == typeof f && f());
var a = c && c[a];
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-var b = 1;
-var a = [], c = --b + ('function' == typeof f && f());
-a = c && c[a];
+var b = 1, a = c = [], c = --b + (typeof f == 'function' && f()), a = c && c[a];
 console.log(a, b);

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

## `uglify/functions/duplicate_argnames_4`


```js
(function() {
	(function(a, a) {
		while (console.log(a || 'PASS'));
	})('FAIL');
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function() {
-	var a = 'FAIL';
-	var a = void 0;
-	while (console.log(a || 'PASS'));
+	(function(a, a) {
+		for (; console.log(a || 'PASS'););
+	})('FAIL');
 })();

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

## `uglify/functions/issue_5239`

- tags: `join vars`, `remove unused`

```js
(function() {
	(function(f) {
		var a = 42, f = function() {};
		while (console.log(f.p || a++));
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 (function() {
-	var f = void 0;
-	var a = 42, f = function() {};
-	while (console.log(f.p || a++));
-	return;
+	(function(f) {
+		var a = 42, f = function() {};
+		for (; console.log(f.p || a++););
+	})();
 })();

```

## `uglify/hoist_props/name_collision_4`

- tags: `join vars`

```js
console.log(function() {
	var o = {
		p: 0,
		q: 'PASS'
	};
	return function(o_p) {
		if (!o.p) return o_p;
	}(o.q);
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,9 @@
 console.log(function() {
-	var o, o_p$0 = 0, o_q = 'PASS';
+	var o = {
+		p: 0,
+		q: 'PASS'
+	};
 	return function(o_p) {
-		if (!o_p$0) return o_p;
-	}(o_q);
+		if (!o.p) return o_p;
+	}(o.q);
 }());

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

## `uglify/if_return/identical_returns_3`


```js
function f(a) {
	if (a) return 42;
	if (a) return;
	return 42;
}
if (f(console)) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f(a) {
 	if (a) return 42;
-	if (a);
-	else return 42;
+	if (a) return;
+	return 42;
 }
-if (f(console)) console.log('PASS');
+f(console) && console.log('PASS');

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

## `uglify/new/new_statements_2`


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

## `uglify/objects/issue_4380`


```js
console.log({
	get 0() {
		return 'FAIL 1';
	},
	0: 'FAIL 2',
	[0]: 'PASS'
}[0]);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,6 @@
 	get 0() {
 		return 'FAIL 1';
 	},
-	[0]: ('FAIL 2', 'PASS')
+	0: 'FAIL 2',
+	0: 'PASS'
 }[0]);

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

## `uglify/properties/prop_side_effects_1`

- tags: `join vars`, `remove unused`

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

## `uglify/pure_funcs/unary`

- tags: `pure functions`

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

## `uglify/pure_getters/issue_2062`

- tags: `join vars`, `pure getters`

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
-a || (a++, a--), a++, a--;
+a || a++ + a--, a++ + a--;
 console.log(a);

```

## `uglify/pure_getters/nested_property_assignments_3`

- tags: `join vars`, `remove unused`, `pure getters`

```js
var o = { p: {} };
(function(a) {
	console && a;
	if (console) {
		a = a.p;
		a.q = a;
	}
})(o);
console.log(o.p.q === o.p ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var o = { p: {} };
 (function(a) {
-	console;
-	if (console) (a = a.p).q = a;
+	if (console) {
+		a = a.p;
+		a.q = a;
+	}
 })(o);
 console.log(o.p.q === o.p ? 'PASS' : 'FAIL');

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

