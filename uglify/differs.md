# uglify / differs — Output differs at equal length

Fixtures: 307

[← uglify](README.md) · [← all families](../README.md)

## `uglify/arguments/issue_4291_2`


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

## `uglify/arrows/keep_new_var`


```js
var f = function(a, b, c) {
	console.log(b + a + c + c);
};
new f('A', 'P', 'S');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-new function(a, b, c) {
-	console.log(b + a + c + c);
+new function(e, t, n) {
+	console.log(t + e + n + n);
 }('A', 'P', 'S');

```

## `uglify/assignments/issue_4815_1`


```js
var a = 'PASS';
42 .p &&= a = 'FAIL';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = 'PASS';
-42 .p &&= a = 'FAIL';
-console.log(a);
+var e = 'PASS';
+42 .p &&= e = 'FAIL';
+console.log(e);

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

## `uglify/assignments/issue_4827_3`


```js
var a = 0, b, c;
a++;
c &&= b = a;
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = 0, b, c;
-a++;
-c &&= b = a;
-console.log(b);
+var e = 0, t, n;
+e++;
+n &&= t = e;
+console.log(t);

```

## `uglify/assignments/logical_reduce_vars`


```js
var a = 'PASS', b = 42;
b ??= a = 'FAIL';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = 'PASS', b = 42;
-b ??= a = 'FAIL';
-console.log(a);
+var e = 'PASS', t = 42;
+t ??= e = 'FAIL';
+console.log(e);

```

## `uglify/assignments/logical_side_effects`


```js
var a = 'PASS', b = 42;
b ??= a = 'FAIL';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = 'PASS', b = 42;
-b ??= a = 'FAIL';
-console.log(a);
+var e = 'PASS', t = 42;
+t ??= e = 'FAIL';
+console.log(e);

```

## `uglify/awaits/evaluate`


```js
var a = async function() {}();
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = async function() {}();
-console.log(typeof a);
+var e = async function() {}();
+console.log(typeof e);

```

## `uglify/awaits/functions_anonymous`


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
+var e = async function() {
 	console.log('PASS');
-}
-await();
+};
+e(e);

```

## `uglify/awaits/functions_inner_var`


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
-	var a;
-	console.log(a, a);
-}
-await();
+var e = function() {
+	var e;
+	console.log(e, e);
+};
+e(e);

```

## `uglify/awaits/issue_4347_1`


```js
var a = 'foo';
f();
a = 'bar';
f();
async function f() {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a = 'foo';
-f();
-a = 'bar';
-f();
-async function f() {
-	console.log(a);
+var e = 'foo';
+t();
+e = 'bar';
+t();
+async function t() {
+	console.log(e);
 }

```

## `uglify/awaits/issue_4581`


```js
var a = 'PASS';
(async () => (A, a = 'FAIL'))();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = 'PASS';
-(async () => (A, a = 'FAIL'))();
-console.log(a);
+var e = 'PASS';
+(async () => (A, e = 'FAIL'))();
+console.log(e);

```

## `uglify/awaits/issue_5019_3`


```js
for (var i in 'foo') {
	(function(a) {
		(async function() {
			console.log(await 'async', a);
		})();
	})(i);
	console.log('sync', i);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-for (var i in 'foo') {
-	(function(a) {
+for (var e in 'foo') {
+	(function(e) {
 		(async function() {
-			console.log(await 'async', a);
+			console.log(await 'async', e);
 		})();
-	})(i);
-	console.log('sync', i);
+	})(e);
+	console.log('sync', e);
 }

```

## `uglify/awaits/reduce_iife_3`


```js
var a = 'foo';
(async function() {
	console.log(a, await a, a, await a);
})();
a = 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a = 'foo';
+var e = 'foo';
 (async function() {
-	console.log(a, await a, a, await a);
+	console.log(e, await e, e, await e);
 })();
-a = 'bar';
+e = 'bar';

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

## `uglify/classes/collapse_non_strict`


```js
var a = 42 .p++;
new class extends (a || function() {
	console.log('PASS');
}) {}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = 42 .p++;
-new class extends (a || function() {
+var e = 42 .p++;
+new class extends (e || function() {
 	console.log('PASS');
 }) {}();

```

## `uglify/classes/issue_4996_1`


```js
var a = 1;
console.log(new class A {
	p = a-- && new A();
}().p.p);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = 1;
-console.log(new class A {
-	p = a-- && new A();
+var e = 1;
+console.log(new class t {
+	p = e-- && new t();
 }().p.p);

```

## `uglify/classes/issue_4996_2`


```js
var a = 1;
console.log(new class A {
	p = a-- && new A();
}().p.p);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = 1;
-console.log(new class A {
-	p = a-- && new A();
+var e = 1;
+console.log(new class t {
+	p = e-- && new t();
 }().p.p);

```

## `uglify/classes/issue_5294_1`


```js
(class A {
	static p = console.log(typeof A);
});

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(class A {
-	static c = console.log(typeof A);
+(class e {
+	static p = console.log(typeof e);
 });

```

## `uglify/classes/issue_5294_2`


```js
class A {
	static p = console.log(typeof A);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-class A {
-	static p = console.log(typeof A);
+class e {
+	static p = console.log(typeof e);
 }

```

## `uglify/classes/issue_5294_3`


```js
var a = this;
(class A {
	static p = console.log(a === A ? 'FAIL' : 'PASS');
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = this;
-(class A {
-	static p = console.log(a === A ? 'FAIL' : 'PASS');
+var e = this;
+(class t {
+	static p = console.log(e === t ? 'FAIL' : 'PASS');
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

## `uglify/classes/keep_field_reference_1`


```js
'use strict';
function f() {}
class A {
	p = f;
}
console.log(new A().p === new A().p ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
-function f() {}
-class A {
-	p = f;
+function e() {}
+class t {
+	p = e;
 }
-console.log(new A().p === new A().p ? 'PASS' : 'FAIL');
+console.log(new t().p === new t().p ? 'PASS' : 'FAIL');

```

## `uglify/classes/keep_field_reference_2`


```js
'use strict';
function f() {}
var A = class {
	p = f;
};
console.log(new A().p === new A().p ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
-function f() {}
-var A = class {
-	p = f;
+function e() {}
+var t = class {
+	p = e;
 };
-console.log(new A().p === new A().p ? 'PASS' : 'FAIL');
+console.log(new t().p === new t().p ? 'PASS' : 'FAIL');

```

## `uglify/classes/keep_field_reference_3`


```js
'use strict';
class A {}
class B {
	p = A;
}
console.log(new B().p === new B().p ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
-class A {}
-class B {
-	p = A;
+class e {}
+class t {
+	p = e;
 }
-console.log(new B().p === new B().p ? 'PASS' : 'FAIL');
+console.log(new t().p === new t().p ? 'PASS' : 'FAIL');

```

## `uglify/classes/keep_instanceof_1`


```js
'use strict';
class A {}
var A;
console.log({} instanceof A, Math instanceof A);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use strict';
-class A {}
-var A;
-console.log({} instanceof A, Math instanceof A);
+class e {}
+var e;
+console.log({} instanceof e, Math instanceof e);

```

## `uglify/classes/keep_instanceof_2`


```js
'use strict';
var A = Object;
class A {}
console.log({} instanceof A, Math instanceof A);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use strict';
-var A = Object;
-class A {}
-console.log({} instanceof A, Math instanceof A);
+var e = Object;
+class e {}
+console.log({} instanceof e, Math instanceof e);

```

## `uglify/classes/keep_instanceof_3`


```js
'use strict';
class A {}
A = Object;
console.log({} instanceof A, Math instanceof A);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use strict';
-class A {}
-A = Object;
-console.log({} instanceof A, Math instanceof A);
+class e {}
+e = Object;
+console.log({} instanceof e, Math instanceof e);

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

## `uglify/classes/separate_name`


```js
'use strict';
class A {
	constructor(v) {
		this.p = v;
	}
}
var a = new A('PASS');
console.log(a.p);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 'use strict';
-class A {
-	constructor(v) {
-		this.p = v;
+class e {
+	constructor(e) {
+		this.p = e;
 	}
 }
-var a = new A('PASS');
-console.log(a.p);
+var t = new e('PASS');
+console.log(t.p);

```

## `uglify/classes/single_use_4`


```js
'use strict';
console.log(new class A {
	f() {
		return typeof A;
	}
}().f());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
-console.log(new class A {
+console.log(new class e {
 	f() {
-		return typeof A;
+		return typeof e;
 	}
 }().f());

```

## `uglify/classes/single_use_6`


```js
'use strict';
class A {
	[(console.log('foo'), 'f')]() {
		console.log('bar');
	}
}
console.log('baz');
new A().f();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 'use strict';
-class A {
+class e {
 	[(console.log('foo'), 'f')]() {
 		console.log('bar');
 	}
 }
 console.log('baz');
-new A().f();
+new e().f();

```

## `uglify/collapse_vars/chained_3`


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

## `uglify/collapse_vars/iife_1`


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

## `uglify/collapse_vars/issue_2436_2`


```js
var o = {
	a: 1,
	b: 2
};
console.log(function(c) {
	o.a = 3;
	return {
		x: c.a,
		y: c.b
	};
}(o));

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
-var o = {
+var e = {
 	a: 1,
 	b: 2
 };
-console.log(function(c) {
-	o.a = 3;
+console.log(function(t) {
+	e.a = 3;
 	return {
-		x: c.a,
-		y: c.b
+		x: t.a,
+		y: t.b
 	};
-}(o));
+}(e));

```

## `uglify/collapse_vars/issue_2436_5`


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
@@ -1,7 +1,7 @@
-console.log(function(o) {
+console.log(function(e) {
 	return {
-		x: o.a,
-		y: o.b
+		x: e.a,
+		y: e.b
 	};
 }({
 	a: 1,

```

## `uglify/collapse_vars/issue_2908`


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

## `uglify/collapse_vars/issue_4040`


```js
var a = console.log('PASS') && a.p;
delete NaN;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = console.log('PASS') && a.p;
+var e = console.log('PASS') && e.p;
 delete NaN;

```

## `uglify/collapse_vars/issue_4891`


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
-var a = 0, b;
-a++;
-console.log(a, b = a);
-b--;
-a.a += 0;
-console.log(b);
+var e = 0, t;
+e++;
+console.log(t = e, t);
+t--;
+e.a += 0;
+console.log(t);

```

## `uglify/collapse_vars/issue_4908`


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
-console.log(d[1]);
+var e = 0, t;
+console || e++;
+var n = r = e, r = [n && n, r += 42];
+console.log(r[1]);

```

## `uglify/collapse_vars/issue_4920_1`


```js
var a = 'PASS', b;
({ get PASS() {
	a = 'FAIL';
} })[b = a];
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a = 'PASS', b;
+var e = 'PASS', t;
 ({ get PASS() {
-	a = 'FAIL';
-} })[b = a];
-console.log(b);
+	e = 'FAIL';
+} })[t = e];
+console.log(t);

```

## `uglify/collapse_vars/issue_5276`


```js
var a = A = 'PASS';
a.p += null;
a.p -= 42;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = A = 'PASS';
-a.p += null;
-a.p -= 42;
-console.log(a);
+var e = A = 'PASS';
+e.p += null;
+e.p -= 42;
+console.log(e);

```

## `uglify/collapse_vars/issue_5643`


```js
var a = 3, b;
a *= 7;
b = !!this;
console || console.log(b);
console.log(a * ++b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a = 3, b;
-a *= 7;
-b = !!this;
-console || console.log(b);
-console.log(a * ++b);
+var e = 3, t;
+e *= 7;
+t = !!this;
+console || console.log(t);
+console.log(e * ++t);

```

## `uglify/collapse_vars/issue_5719`


```js
var a = 42, b;
switch (b = a) {
	case a:
	case b:
	case a++:
}
console.log(a === b++ ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a = 42, b;
-switch (b = a) {
-	case a:
-	case b:
-	case a++:
+var e = 42, t;
+switch (t = e) {
+	case e:
+	case t:
+	case e++:
 }
-console.log(a === b++ ? 'PASS' : 'FAIL');
+console.log(e === t++ ? 'PASS' : 'FAIL');

```

## `uglify/collapse_vars/issue_5779`


```js
var a = A = 'foo';
a.p = 42;
if (a && !a.p) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = A = 'foo';
-a.p = 42;
-if (a, !a.p) console.log('PASS');
+var e = A = 'foo';
+e.p = 42;
+e && !e.p && console.log('PASS');

```

## `uglify/collapse_vars/issue_5869`


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
-log();
-log(void (a.p = 0));
+var e, t, n = console.log;
+n();
+e.p = 0;
+t = e;
+n(t);

```

## `uglify/collapse_vars/lvalues_def`


```js
var a = 0, b = 1;
var a = b++, b = +function() {}();
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

## `uglify/collapse_vars/replace_all_var_scope`


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

## `uglify/const/use_before_init_1`


```js
a = 'foo';
const a = 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-a = 'foo';
-const a = 'bar';
+e = 'foo';
+const e = 'bar';

```

## `uglify/dead-code/self_assignments_3`


```js
var a = 'q', o = {
	p: 'FAIL',
	get q() {
		return 'PASS';
	},
	set q(v) {
		this.p = v;
	}
};
o.p = o.p;
o[a] = o[a];
console.log(o.p, o[a]);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-var a = 'q', o = {
+var e = 'q', t = {
 	p: 'FAIL',
 	get q() {
 		return 'PASS';
 	},
-	set q(v) {
-		this.p = v;
+	set q(e) {
+		this.p = e;
 	}
 };
-o.p = o.p;
-o[a] = o[a];
-console.log(o.p, o[a]);
+t.p = t.p;
+t[e] = t[e];
+console.log(t.p, t[e]);

```

## `uglify/default-values/collapse_arg_sequence`


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

## `uglify/default-values/issue_4548_1`


```js
A = 'foo';
var a = A;
[b = c = 'bar'] = [console, console.log(a)];
console.log(c);
var c;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 A = 'foo';
-var a = A;
-[b = c = 'bar'] = [console, console.log(a)];
-console.log(c);
-var c;
+var e = A;
+[b = t = 'bar'] = [console, console.log(e)];
+console.log(t);
+var t;

```

## `uglify/default-values/issue_4548_2`


```js
A = 'foo';
var a = A;
var [b = c = 'bar'] = [console, console.log(a)];
console.log(c);
var c;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 A = 'foo';
-var a = A;
-var [b = c = 'bar'] = [console, console.log(a)];
-console.log(c);
-var c;
+var e = A;
+var [t = n = 'bar'] = [console, console.log(e)];
+console.log(n);
+var n;

```

## `uglify/default-values/issue_5065`


```js
var [a = console.log('PASS')] = [(A = 42).p];

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var [a = console.log('PASS')] = [(A = 42).p];
+var [e = console.log('PASS')] = [(A = 42).p];

```

## `uglify/default-values/issue_5444_1`


```js
var a = 42;
var b = function({} = setImmediate(function() {
	console.log(a++);
})) {
	return this;
}();
console.log(typeof b);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a = 42;
-var b = function({} = setImmediate(function() {
-	console.log(a++);
+var e = 42;
+var t = function({} = setImmediate(function() {
+	console.log(e++);
 })) {
 	return this;
 }();
-console.log(typeof b);
+console.log(typeof t);

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

## `uglify/destructured/funarg_reduce_vars_3`


```js
var a = 0;
(function({ [a++]: b }) {})(0);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = 0;
-(function({ [a++]: b }) {})(0);
-console.log(a);
+var e = 0;
+(function({ [e++]: t }) {})(0);
+console.log(e);

```

## `uglify/destructured/issue_4288`


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

## `uglify/destructured/issue_4500`


```js
var a = function f(b) {
	return [b] = [], b;
}('FAIL');
console.log(a || 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = function f(b) {
-	return [b] = [], b;
+var e = function e(t) {
+	return [t] = [], t;
 }('FAIL');
-console.log(a || 'PASS');
+console.log(e || 'PASS');

```

## `uglify/destructured/issue_5423`


```js
var a, b;
function f({ [function() {
	if (++a) return 42;
}()]: c }) {}
f(b = f);
console.log(typeof b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var a, b;
-function f({ [function() {
-	if (++a) return 42;
-}()]: c }) {}
-f(b = f);
-console.log(typeof b);
+var e, t;
+function n({ [function() {
+	if (++e) return 42;
+}()]: t }) {}
+n(t = n);
+console.log(typeof t);

```

## `uglify/destructured/issue_5866_8`


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

## `uglify/destructured/reduce_vars_1`


```js
var a;
console.log('PASS') && ([a] = 0);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a;
-console.log('PASS') && ([a] = 0);
+var e;
+console.log('PASS') && ([e] = 0);

```

## `uglify/drop-unused/defun_lambda_same_name`


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
@@ -1,3 +1,3 @@
-console.log(function f(n) {
-	return n ? n * f(n - 1) : 1;
+console.log(function e(t) {
+	return t ? t * e(t - 1) : 1;
 }(5));

```

## `uglify/drop-unused/issue_2660_1`


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

## `uglify/drop-unused/issue_3375`


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
-console.log(a, b);
+var e = 1, t = n = [], n = --e + (typeof f == 'function' && f()), t = n && n[t];
+console.log(t, e);

```

## `uglify/drop-unused/issue_3515_2`


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
@@ -1,6 +1,6 @@
-var a = 'FAIL';
-function f() {
-	delete a;
+var e = 'FAIL';
+function t() {
+	delete e;
 }
-f(a = 'PASS');
-console.log(a);
+t(e = 'PASS');
+console.log(e);

```

## `uglify/drop-unused/issue_3951`


```js
var a = console.log('PASS');
console.log(a);
a = '0';
console.log(a.p = 0);
a && a;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = console.log('PASS');
-console.log(a);
-a = '0';
-console.log(a.p = 0);
+var e = console.log('PASS');
+console.log(e);
+e = '0';
+console.log(e.p = 0);

```

## `uglify/drop-unused/issue_4912_1`


```js
var a = A = function() {};
A;
a.prototype = { f: function() {
	console.log('PASS');
} };
new A().f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var a = A = function() {};
+var e = A = function() {};
 A;
-a.prototype = { f: function() {
+e.prototype = { f: function() {
 	console.log('PASS');
 } };
 new A().f();

```

## `uglify/drop-unused/keep_instanceof_1`


```js
function f() {}
var f;
console.log({} instanceof f, Math instanceof f);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-function f() {}
-var f;
-console.log({} instanceof f, Math instanceof f);
+function e() {}
+var e;
+console.log({} instanceof e, Math instanceof e);

```

## `uglify/drop-unused/keep_instanceof_2`


```js
function f() {}
var f = Object;
console.log({} instanceof f, Math instanceof f);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-function f() {}
-var f = Object;
-console.log({} instanceof f, Math instanceof f);
+function e() {}
+var e = Object;
+console.log({} instanceof e, Math instanceof e);

```

## `uglify/drop-unused/keep_instanceof_3`


```js
f = Object;
function f() {}
console.log({} instanceof f, Math instanceof f);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-f = Object;
-function f() {}
-console.log({} instanceof f, Math instanceof f);
+e = Object;
+function e() {}
+console.log({} instanceof e, Math instanceof e);

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

## `uglify/evaluate/issue_5380`


```js
var a = function f(b) {
	return function g() {
		for (b in { PASS: 42 });
	}(), b;
}('FAIL');
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var a = function f(b) {
-	return function g() {
-		for (b in { PASS: 42 });
-	}(), b;
+var e = function e(t) {
+	return function e() {
+		for (t in { PASS: 42 });
+	}(), t;
 }('FAIL');
-console.log(a);
+console.log(e);

```

## `uglify/evaluate/void_returns_recursive`


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
@@ -1,14 +1,14 @@
-var a = function f() {
-	function g(b) {
-		return f();
+var e = function e() {
+	function t(t) {
+		return e();
 	}
-	while (1) {
+	for (;;) {
 		console.log('PASS');
 		try {
 			if (console) return;
 		} catch (e) {
-			return g();
+			return t(e);
 		}
 	}
 }();
-console.log(a);
+console.log(e);

```

## `uglify/exports/in_use`


```js
export function f() {}
f.prototype.p = 42;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export function f() {}
-f.prototype.p = 42;
+export function e() {}
+e.prototype.p = 42;

```

## `uglify/exports/in_use_default`


```js
export default function f() {}
f.prototype.p = 42;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export default function f() {}
-f.prototype.p = 42;
+export default function e() {}
+e.prototype.p = 42;

```

## `uglify/exports/instanceof_default_class`


```js
export default class A {
	f(a) {
		return a instanceof A;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-export default class A {
-	f(a) {
-		return a instanceof A;
+export default class e {
+	f(t) {
+		return t instanceof e;
 	}
 }

```

## `uglify/exports/single_use`


```js
export function f() {
	console.log('PASS');
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-export function f() {
+export function e() {
 	console.log('PASS');
 }
-f();
+e();

```

## `uglify/exports/single_use_class`


```js
export class A {}
A.prototype.p = 'PASS';

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export class A {}
-A.prototype.p = 'PASS';
+export class e {}
+e.prototype.p = 'PASS';

```

## `uglify/exports/single_use_class_default`


```js
export default class A {}
A.prototype.p = 'PASS';

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export default class A {}
-A.prototype.p = 'PASS';
+export default class e {}
+e.prototype.p = 'PASS';

```

## `uglify/exports/single_use_default`


```js
export default function f() {
	console.log('PASS');
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-export default function f() {
+export default function e() {
 	console.log('PASS');
 }
-f();
+e();

```

## `uglify/functions/block_scope_3_compress`


```js
console.log(typeof f);
{
	function f() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log(typeof f);
+console.log(typeof e);
 {
-	function f() {}
+	function e() {}
 }

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

## `uglify/functions/inline_eval_outer`


```js
A = 42;
(function(a) {
	console.log(a);
})(A);
console.log(eval('typeof a'));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 A = 42;
-(function(a) {
-	console.log(a);
+(function(e) {
+	console.log(e);
 })(A);
 console.log(eval('typeof a'));

```

## `uglify/functions/inline_loop_4`


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

## `uglify/functions/issue_3054`


```js
'use strict';
function f() {
	return { a: true };
}
console.log(function(b) {
	b = false;
	return f();
}().a, f.call().a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 'use strict';
-function f() {
+function e() {
 	return { a: !0 };
 }
-console.log(function(b) {
-	b = !1;
-	return f();
-}().a, f.call().a);
+console.log(function(t) {
+	t = !1;
+	return e();
+}().a, e.call().a);

```

## `uglify/functions/issue_3821_2`


```js
var a = 'PASS';
function f(g, b) {
	return g(), b;
}
console.log(f(function() {
	a = 'FAIL';
}, a));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a = 'PASS';
-function f(g, b) {
-	return g(), b;
+var e = 'PASS';
+function t(e, t) {
+	return e(), t;
 }
-console.log(f(function() {
-	a = 'FAIL';
-}, a));
+console.log(t(function() {
+	e = 'FAIL';
+}, e));

```

## `uglify/functions/issue_4259`


```js
var a = function b() {
	var c = b;
	for (b in c);
};
a();
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a = function b() {
-	for (b in b);
+var e = function e() {
+	for (e in e);
 };
-a();
-console.log(typeof a);
+e();
+console.log(typeof e);

```

## `uglify/functions/issue_4471`


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
@@ -1,7 +1,7 @@
-f(g());
-function f() {
-	return g();
+e(e());
+function e() {
+	return t();
 }
-function g() {
+function t() {
 	console.log('PASS');
 }

```

## `uglify/functions/issue_5061_1`


```js
var f, a = 1;
(f = function() {
	console.log(a ? 'foo' : 'bar');
})();
f(a = 0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var f, a = 1;
-(f = function() {
-	console.log(a ? 'foo' : 'bar');
+var e, t = 1;
+(e = function() {
+	console.log(t ? 'foo' : 'bar');
 })();
-f(a = 0);
+e(t = 0);

```

## `uglify/functions/issue_5061_2`


```js
var f, a = 1;
(f = function() {
	console.log(a ? 'foo' : 'bar');
})();
f(a = 0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var f, a = 1;
-(f = function() {
-	console.log(a ? 'foo' : 'bar');
+var e, t = 1;
+(e = function() {
+	console.log(t ? 'foo' : 'bar');
 })();
-f(a = 0);
+e(t = 0);

```

## `uglify/functions/issue_5096_1`


```js
var a, b = 'FAIL', c = 1;
do {
	a && a();
	a = function() {
		b = 'PASS';
	};
} while (c--);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-var a, b = 'FAIL', c = 1;
+var e, t = 'FAIL', n = 1;
 do {
-	a && a();
-	a = function() {
-		b = 'PASS';
+	e && e();
+	e = function() {
+		t = 'PASS';
 	};
-} while (c--);
-console.log(b);
+} while (n--);
+console.log(t);

```

## `uglify/functions/issue_5096_2`


```js
var a, b = 'FAIL', c = 1;
do {
	a && a();
	a = function() {
		b = 'PASS';
	};
} while (c--);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-var a, b = 'FAIL', c = 1;
+var e, t = 'FAIL', n = 1;
 do {
-	a && a();
-	a = function() {
-		b = 'PASS';
+	e && e();
+	e = function() {
+		t = 'PASS';
 	};
-} while (c--);
-console.log(b);
+} while (n--);
+console.log(t);

```

## `uglify/functions/issue_5096_3`


```js
var b = 'FAIL', c = 1;
do {
	a && a();
	var a = function() {
		b = 'PASS';
	};
} while (c--);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-var b = 'FAIL', c = 1;
+var e = 'FAIL', t = 1;
 do {
-	a && a();
-	var a = function() {
-		b = 'PASS';
+	n && n();
+	var n = function() {
+		e = 'PASS';
 	};
-} while (c--);
-console.log(b);
+} while (t--);
+console.log(e);

```

## `uglify/functions/issue_5096_4`


```js
var b = 'FAIL', c = 1;
do {
	a && a();
	var a = function() {
		b = 'PASS';
	};
} while (c--);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-var b = 'FAIL', c = 1;
+var e = 'FAIL', t = 1;
 do {
-	a && a();
-	var a = function() {
-		b = 'PASS';
+	n && n();
+	var n = function() {
+		e = 'PASS';
 	};
-} while (c--);
-console.log(b);
+} while (t--);
+console.log(e);

```

## `uglify/functions/issue_5239`


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

## `uglify/functions/issue_5851_2`


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
@@ -1,5 +1,5 @@
-f();
-f();
-function f() {
-	console.log('foo') && console && f();
+e();
+e();
+function e() {
+	console.log('foo') && console && e();
 }

```

## `uglify/functions/issue_5885`


```js
var a;
f();
function f() {
	return ++a + 'foo';
}
console.log(a = f());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var a;
-f();
-function f() {
-	return ++a + 'foo';
+var e;
+t();
+function t() {
+	return ++e + 'foo';
 }
-console.log(a = f());
+console.log(e = t());

```

## `uglify/functions/issue_5924`


```js
var a = 42;
function f() {
	return a - 41;
}
function g() {
	return f;
}
var b = f();
a--;
console.log(b ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-var a = 42;
-function f() {
-	return a - 41;
+var e = 42;
+function t() {
+	return e - 41;
 }
-function g() {
-	return f;
+function n() {
+	return t;
 }
-var b = f();
-a--;
-console.log(b ? 'PASS' : 'FAIL');
+var r = t();
+e--;
+console.log(r ? 'PASS' : 'FAIL');

```

## `uglify/functions/mixed_mode_inline_3`


```js
function f() {
	return this;
}
console.log(function() {
	'use strict';
	return f();
}() ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-function f() {
+function e() {
 	return this;
 }
 console.log(function() {
 	'use strict';
-	return f();
+	return e();
 }() ? 'PASS' : 'FAIL');

```

## `uglify/functions/substitute_arguments`


```js
var o = {};
function f(a) {
	return arguments[0] === o ? 'PASS' : 'FAIL';
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
@@ -1,33 +1,33 @@
-var o = {};
-function f(a) {
-	return arguments[0] === o ? 'PASS' : 'FAIL';
+var e = {};
+function t(t) {
+	return arguments[0] === e ? 'PASS' : 'FAIL';
 }
 [
 	function() {
-		return f;
+		return t;
 	},
 	function() {
-		return function(b) {
-			return f(b);
+		return function(e) {
+			return t(e);
 		};
 	},
 	function() {
 		'use strict';
-		return function(c) {
-			return f(c);
+		return function(e) {
+			return t(e);
 		};
 	},
 	function() {
-		return function(c) {
+		return function(e) {
 			'use strict';
-			return f(c);
+			return t(e);
 		};
 	},
 	function() {
-		return function(d, e) {
-			return f(d, e);
+		return function(e, n) {
+			return t(e, n);
 		};
 	}
-].forEach(function(g) {
-	console.log(g()(o), g().call(o, o), g().length);
+].forEach(function(t) {
+	console.log(t()(e), t().call(e, e), t().length);
 });

```

## `uglify/functions/substitute_this`


```js
var o = {};
function f(a) {
	return a === o ? this === o : 'FAIL';
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
@@ -1,33 +1,33 @@
-var o = {};
-function f(a) {
-	return a === o ? this === o : 'FAIL';
+var e = {};
+function t(t) {
+	return t === e ? this === e : 'FAIL';
 }
 [
 	function() {
-		return f;
+		return t;
 	},
 	function() {
-		return function(b) {
-			return f(b);
+		return function(e) {
+			return t(e);
 		};
 	},
 	function() {
 		'use strict';
-		return function(c) {
-			return f(c);
+		return function(e) {
+			return t(e);
 		};
 	},
 	function() {
-		return function(c) {
+		return function(e) {
 			'use strict';
-			return f(c);
+			return t(e);
 		};
 	},
 	function() {
-		return function(d, e) {
-			return f(d, e);
+		return function(e, n) {
+			return t(e, n);
 		};
 	}
-].forEach(function(g) {
-	console.log(g()(o), g().call(o, o), g().length);
+].forEach(function(t) {
+	console.log(t()(e), t().call(e, e), t().length);
 });

```

## `uglify/hoist_props/contains_this_3`


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

## `uglify/hoist_props/direct_access_2`


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
-	if (o[k]) return 'PASS';
+var e = { a: 1 };
+console.log(function(t) {
+	if (e[t]) return 'PASS';
 }('a'));

```

## `uglify/hoist_props/direct_access_3`


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

## `uglify/hoist_props/issue_2473_3`


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

## `uglify/hoist_props/issue_2508_3`


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

## `uglify/hoist_props/issue_2508_4`


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

## `uglify/hoist_props/name_collision_4`


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
-	var f = console.log(typeof f);
-}
-a();
+(function e() {
+	var e = console.log(typeof e);
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

## `uglify/ie/issue_3206_1`


```js
console.log(function() {
	var foo = function bar() {};
	var baz = function moo() {};
	return 'function' == typeof bar;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function() {
-	return 'function' == typeof bar;
+	return typeof bar == 'function';
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

## `uglify/ie/issue_3471_ie8`


```js
var c = 1;
function f() {
	var a = function g() {
		--c && f();
		g.p = 0;
	};
	for (var p in a) a[p];
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-var c = 1;
-(function f() {
-	var a = function g() {
-		--c && f();
-		g.p = 0;
+var e = 1;
+function t() {
+	var n = function n() {
+		--e && t();
+		n.p = 0;
 	};
-	for (var p in a) a[p];
-})();
+	for (var r in n) n[r];
+}
+t();

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

## `uglify/imports/issue_4708_2`


```js
var a;
console.log(a);
import a from 'foo';

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a;
-console.log(a);
-import a from 'foo';
+var e;
+console.log(e);
+import e from 'foo';

```

## `uglify/issue-1202/mangle_keep_fnames_false`


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

## `uglify/issue-1588/screw_ie8`


```js
try {
	throw 'foo';
} catch (x) {
	console.log(x);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	throw 'foo';
-} catch (o) {
-	console.log(o);
+} catch (x) {
+	console.log(x);
 }

```

## `uglify/issue-1704/mangle_catch_redef_1`


```js
var a = 'PASS';
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 'PASS';
 try {
 	throw 'FAIL1';
-} catch (a) {
-	var a = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
 console.log(a);

```

## `uglify/issue-1704/mangle_catch_redef_1_ie8`


```js
var a = 'PASS';
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 'PASS';
 try {
 	throw 'FAIL1';
-} catch (a) {
-	var a = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
 console.log(a);

```

## `uglify/issue-1704/mangle_catch_redef_1_ie8_toplevel`


```js
var a = 'PASS';
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var o = 'PASS';
+var e = 'PASS';
 try {
 	throw 'FAIL1';
-} catch (o) {
-	var o = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
-console.log(o);
+console.log(e);

```

## `uglify/issue-1704/mangle_catch_redef_1_toplevel`


```js
var a = 'PASS';
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var o = 'PASS';
+var e = 'PASS';
 try {
 	throw 'FAIL1';
-} catch (o) {
-	var o = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
-console.log(o);
+console.log(e);

```

## `uglify/issue-1704/mangle_catch_redef_2_ie8_toplevel`


```js
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	throw 'FAIL1';
-} catch (o) {
-	var o = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
-console.log(o);
+console.log(e);

```

## `uglify/issue-1704/mangle_catch_redef_2_toplevel`


```js
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	throw 'FAIL1';
-} catch (o) {
-	var o = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
-console.log(o);
+console.log(e);

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
@@ -1,6 +1,6 @@
-var a;
-switch (a = 'PASS') {
+var e = 'PASS';
+switch (e) {
 	case console:
 }
-var a = a;
-console.log(a);
+var e = e;
+console.log(e);

```

## `uglify/join_vars/single_use_var`


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
@@ -1,5 +1,5 @@
 A = 'PASS';
 (function() {
-	var b = A;
-	for (b in console.log(b));
+	var e = A;
+	for (e in console.log(e));
 })();

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
@@ -1,17 +1,16 @@
 'use strict';
-function A() {}
-A.prototype.f = function() {
-	if (this) {
-		let a = 'PA';
-		['SS'].forEach(function(c) {
-			g(c);
-		});
-		function g(b) {
-			h(a + b);
-		}
+function e() {}
+e.prototype.f = function() {
+	if (!this) return;
+	let e = 'PA';
+	function n(e) {
+		t('PA' + e);
 	}
+	['SS'].forEach(function(e) {
+		n(e);
+	});
 };
-function h(d) {
-	console.log(d);
+function t(e) {
+	console.log(e);
 }
-new A().f();
+new e().f();

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

## `uglify/let/use_before_init_1`


```js
'use strict';
a = 'foo';
let a = 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 'use strict';
-a = 'foo';
-let a = 'bar';
+e = 'foo';
+let e = 'bar';

```

## `uglify/merge_vars/conditional_write`


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
+var e = 'FAIL', t;
+console && (e = 'PASS');
+t = [e, 42].join();
+console.log(t);

```

## `uglify/merge_vars/cross_branch_1_1`


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

## `uglify/merge_vars/issue_4103`


```js
function f(a) {
	console.log(a);
}
var b = 0;
var c = f(b++ + (c %= 1 >> console.log(c = 0)));
b;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f(a) {
-	console.log(a);
+function e(e) {
+	console.log(e);
 }
-var b = 0;
-var c = f(b++ + (c %= 1 >> console.log(c = 0)));
+var t = 0;
+var n = e(t++ + (n %= 1 >> console.log(n = 0)));

```

## `uglify/merge_vars/issue_4111`


```js
var a = 0;
if (a) a = 0;
else for (var b = 0; --b && ++a < 2;) {
	var o = console, k;
	for (k in o);
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a = 0;
-if (a) a = 0;
-else for (var b = 0; --b && ++a < 2;) {
-	var o = console, k;
-	for (k in o);
+var e = 0;
+if (e) e = 0;
+else for (var t = 0; --t && ++e < 2;) {
+	var n = console, r;
+	for (r in n);
 }
-console.log(a);
+console.log(e);

```

## `uglify/merge_vars/issue_4255`


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
+L: for (var e = 2; --e;) for (var t = 0; console.log(t); --t) break L;

```

## `uglify/merge_vars/issue_4956_1`


```js
var a, b;
function f(c) {
	switch (c) {
		case 0: a = { p: 42 };
		case 1:
			b = a.p;
			console.log(b);
	}
}
f(0);
f(1);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
-var a, b;
-function f(c) {
-	switch (c) {
-		case 0: a = { p: 42 };
+var e, t;
+function n(n) {
+	switch (n) {
+		case 0: e = { p: 42 };
 		case 1:
-			b = a.p;
-			console.log(b);
+			t = e.p;
+			console.log(t);
 	}
 }
-f(0);
-f(1);
+n(0);
+n(1);

```

## `uglify/merge_vars/issue_5451`


```js
A = 1;
var a = 1, b;
console.log(function f() {
	return a-- && f(b = A, b);
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 A = 1;
-var a = 1, b;
-console.log(function f() {
-	return a-- && f(b = A, b);
+var e = 1, t;
+console.log(function n() {
+	return e-- && n(t = A, t);
 }());

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

## `uglify/optional-chains/issue_4928`


```js
var a = a?.[function f() {
	f(a);
}];
console.log(typeof f);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = a?.[function f() {
-	f(a);
+var e = e?.[function t() {
+	t(e);
 }];
 console.log(typeof f);

```

## `uglify/optional-chains/issue_5091`


```js
function f(a) {
	var b = a.p;
	var c;
	b?.[c = 'FAIL 2'];
	return b || c;
}
console.log(f('FAIL 1') || 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(a) {
-	var a = a.p;
+	var b = a.p;
 	var c;
-	a?.[c = 'FAIL 2'];
-	return a || c;
+	b?.[c = 'FAIL 2'];
+	return b || c;
 }
 console.log(f('FAIL 1') || 'PASS');

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

## `uglify/pure_funcs/unary`


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

## `uglify/pure_getters/nested_property_assignments_4`


```js
var n, o = { p: { q: { r: 'PASS' } } };
(n = o.p).r = n.q.r;
console.log(o.p.r);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var n, o = { p: { q: { r: 'PASS' } } };
-(n = o.p).r = n.q.r;
-console.log(o.p.r);
+var e, t = { p: { q: { r: 'PASS' } } };
+(e = t.p).r = e.q.r;
+console.log(t.p.r);

```

## `uglify/pure_getters/set_immutable_2`


```js
var a = 1;
a.foo += '';
if (a.foo) console.log('FAIL');
else console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = 1;
-a.foo += '', a.foo ? console.log('FAIL') : console.log('PASS');
+var e = 1;
+e.foo += '', e.foo ? console.log('FAIL') : console.log('PASS');

```

## `uglify/pure_getters/set_immutable_4`


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
-var a = 1;
-a.foo += '', a.foo ? console.log('FAIL') : console.log('PASS');
+var e = 1;
+e.foo += '', e.foo ? console.log('FAIL') : console.log('PASS');

```

## `uglify/pure_getters/strict`


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

## `uglify/reduce_vars/accessor_1`


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

## `uglify/reduce_vars/array_forin_1`


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

## `uglify/reduce_vars/array_forin_2`


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

## `uglify/reduce_vars/const_expr_1`


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

## `uglify/reduce_vars/const_expr_2`


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

## `uglify/reduce_vars/defun_assign`


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

## `uglify/reduce_vars/defun_catch_1`


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

## `uglify/reduce_vars/defun_catch_2`


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

## `uglify/reduce_vars/defun_catch_3`


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

## `uglify/reduce_vars/defun_catch_4`


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

## `uglify/reduce_vars/defun_catch_5`


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

## `uglify/reduce_vars/defun_catch_6`


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

## `uglify/reduce_vars/double_reference_3`


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
@@ -1,7 +1,7 @@
-var x = function f() {
-	return f;
+var e = function e() {
+	return e;
 };
-function g() {
-	return x();
+function t() {
+	return e();
 }
-console.log(g() === g());
+console.log(t() === t());

```

## `uglify/reduce_vars/iife_arguments_3`


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

## `uglify/reduce_vars/issue_1666`


```js
var x = 42;
{
	x();
	function x() {
		console.log('foo');
	}
}
console.log(typeof x);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-var x = 42;
+var e = 42;
 {
-	x();
-	function x() {
+	e();
+	function e() {
 		console.log('foo');
 	}
 }
-console.log(typeof x);
+console.log(typeof e);

```

## `uglify/reduce_vars/issue_1666_strict`


```js
'use strict';
var x = 42;
{
	x();
	function x() {
		console.log('foo');
	}
}
console.log(typeof x);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 'use strict';
-var x = 42;
+var e = 42;
 {
-	x();
-	function x() {
+	e();
+	function e() {
 		console.log('foo');
 	}
 }
-console.log(typeof x);
+console.log(typeof e);

```

## `uglify/reduce_vars/issue_1850_3`


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

## `uglify/reduce_vars/issue_2436`


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

## `uglify/reduce_vars/issue_2450_1`


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

## `uglify/reduce_vars/issue_3042_1`


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

## `uglify/reduce_vars/issue_3113_4`


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

## `uglify/reduce_vars/issue_3125`


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

## `uglify/reduce_vars/issue_3631_1`


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
@@ -1,6 +1,6 @@
-var c = 0;
+var e = 0;
 L: do {
 	for (;;) continue L;
-	var b = 1;
-} while (b && c++);
-console.log(c);
+	var t = 1;
+} while (t && e++);
+console.log(e);

```

## `uglify/reduce_vars/issue_3631_2`


```js
L: for (var a = 1; a--; console.log(b)) {
	for (;;) continue L;
	var b = 'FAIL';
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-L: for (var a = 1; a--; console.log(b)) {
+L: for (var e = 1; e--; console.log(t)) {
 	for (;;) continue L;
-	var b = 'FAIL';
+	var t = 'FAIL';
 }

```

## `uglify/reduce_vars/issue_3949_3`


```js
function f() {}
for (var a, i = 3; 0 <= --i;) {
	a = f;
	console.log(a === b);
	var b = a;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-function f() {}
-for (var a, i = 3; 0 <= --i;) {
-	a = f;
-	console.log(a === b);
-	var b = a;
+function e() {}
+for (var t, n = 3; 0 <= --n;) {
+	t = e;
+	console.log(t === r);
+	var r = t;
 }

```

## `uglify/reduce_vars/issue_3949_4`


```js
function f() {}
for (var a, i = 3; 0 <= --i;) {
	a = f;
	console.log(a === b);
	var b = a;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-function f() {}
-for (var a, i = 3; 0 <= --i;) {
-	a = f;
-	console.log(a === b);
-	var b = a;
+function e() {}
+for (var t, n = 3; 0 <= --n;) {
+	t = e;
+	console.log(t === r);
+	var r = t;
 }

```

## `uglify/reduce_vars/issue_4943_1`


```js
var a, b = 1;
(function f() {
	a = 'foo';
	b-- && f();
	console.log(a);
	a = 'bar';
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a, b = 1;
-(function f() {
-	a = 'foo';
-	b-- && f();
-	console.log(a);
-	a = 'bar';
+var e, t = 1;
+(function n() {
+	e = 'foo';
+	t-- && n();
+	console.log(e);
+	e = 'bar';
 })();

```

## `uglify/reduce_vars/issue_4943_2`


```js
var a, b = 1;
(function f() {
	a = 'foo';
	b-- && f();
	console.log(a);
	a = 'bar';
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a, b = 1;
-(function f() {
-	a = 'foo';
-	b-- && f();
-	console.log(a);
-	a = 'bar';
+var e, t = 1;
+(function n() {
+	e = 'foo';
+	t-- && n();
+	console.log(e);
+	e = 'bar';
 })();

```

## `uglify/reduce_vars/issue_5730_2`


```js
var a = 'PASS';
try {
	var f = function() {
		console.log(a);
	};
} finally {}
f();
a++;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-var a = 'PASS';
+var e = 'PASS';
 try {
-	var f = function() {
-		console.log(a);
+	var t = function() {
+		console.log(e);
 	};
 } finally {}
-f();
-a++;
+t();
+e++;

```

## `uglify/reduce_vars/issue_5915_1`


```js
f = void 0;
if (console) {
	console.log(typeof f);
	function f() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-f = void 0;
+e = void 0;
 if (console) {
-	console.log(typeof f);
-	function f() {}
+	console.log(typeof e);
+	function e() {}
 }

```

## `uglify/reduce_vars/issue_5915_2`


```js
f = void 0;
if (console) {
	function f() {}
	console.log(typeof f);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-f = void 0;
+e = void 0;
 if (console) {
-	function f() {}
-	console.log(typeof f);
+	function e() {}
+	console.log(typeof e);
 }

```

## `uglify/reduce_vars/multi_def_2`


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

## `uglify/reduce_vars/obj_for_2`


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

## `uglify/reduce_vars/perf_1`


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

## `uglify/reduce_vars/recursive_inlining_3`


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

## `uglify/reduce_vars/unsafe_evaluate_array_2`


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

## `uglify/regexp/var_exec_global`


```js
var r = /a/g;
while (r.exec('aaa')) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var r = /a/g;
-for (; r.exec('aaa');) console.log('PASS');
+var e = /a/g;
+for (; e.exec('aaa');) console.log('PASS');

```

## `uglify/rename/mangle_catch_redef_1`


```js
var a = 'PASS';
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 'PASS';
 try {
 	throw 'FAIL1';
-} catch (a) {
-	var a = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
 console.log(a);

```

## `uglify/rename/mangle_catch_redef_1_ie8`


```js
var a = 'PASS';
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 'PASS';
 try {
 	throw 'FAIL1';
-} catch (a) {
-	var a = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
 console.log(a);

```

## `uglify/rename/mangle_catch_redef_1_ie8_toplevel`


```js
var a = 'PASS';
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var o = 'PASS';
+var e = 'PASS';
 try {
 	throw 'FAIL1';
-} catch (o) {
-	var o = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
-console.log(o);
+console.log(e);

```

## `uglify/rename/mangle_catch_redef_1_toplevel`


```js
var a = 'PASS';
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var o = 'PASS';
+var e = 'PASS';
 try {
 	throw 'FAIL1';
-} catch (o) {
-	var o = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
-console.log(o);
+console.log(e);

```

## `uglify/rename/mangle_catch_redef_2_ie8_toplevel`


```js
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	throw 'FAIL1';
-} catch (o) {
-	var o = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
-console.log(o);
+console.log(e);

```

## `uglify/rename/mangle_catch_redef_2_toplevel`


```js
try {
	throw 'FAIL1';
} catch (a) {
	var a = 'FAIL2';
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	throw 'FAIL1';
-} catch (o) {
-	var o = 'FAIL2';
+} catch (e) {
+	var e = 'FAIL2';
 }
-console.log(o);
+console.log(e);

```

## `uglify/rests/drop_unused_call_args_2`


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

## `uglify/rests/issue_4560_1`


```js
var a = 0;
(function(...{ [a++]: {} }) {})(2);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = 0;
-(function(...{ [a++]: {} }) {})(2);
-console.log(a);
+var e = 0;
+(function(...{ [e++]: {} }) {})(2);
+console.log(e);

```

## `uglify/rests/issue_4560_2`


```js
var a = 0;
(function(...{ [a++]: {} }) {})(2);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = 0;
-(function(...{ [a++]: {} }) {})(2);
-console.log(a);
+var e = 0;
+(function(...{ [e++]: {} }) {})(2);
+console.log(e);

```

## `uglify/rests/issue_4560_3`


```js
var a = 0, b;
[...{[a++]: b}] = ['PASS'];
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var a = 0, b;
-[...{[a++]: b}] = ['PASS'];
-console.log(b);
+var e = 0, t;
+[...{[e++]: t}] = ['PASS'];
+console.log(t);

```

## `uglify/rests/issue_5246_2`


```js
A = [
	,
	'PASS',
	'FAIL'
];
var [, ...a] = [...A];
console.log(a[0]);

```

```diff
--- reference
+++ oxc
@@ -3,5 +3,5 @@
 	'PASS',
 	'FAIL'
 ];
-var [, ...a] = [...A];
-console.log(a[0]);
+var [, ...e] = [...A];
+console.log(e[0]);

```

## `uglify/rests/merge_funarg`


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

## `uglify/rests/reduce_destructured_object`


```js
var { ...a } = ['PASS'];
console.log(a[0]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var { ...a } = ['PASS'];
-console.log(a[0]);
+var { ...e } = ['PASS'];
+console.log(e[0]);

```

## `uglify/rests/retain_destructured_object_1`


```js
var { 0: a, ...b } = [
	'FAIL',
	'PASS',
	42
];
for (var k in b) console.log(k, b[k]);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var { 0: a, ...b } = [
+var { 0: e, ...t } = [
 	'FAIL',
 	'PASS',
 	42
 ];
-for (var k in b) console.log(k, b[k]);
+for (var n in t) console.log(n, t[n]);

```

## `uglify/sequences/hoist_defun`


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

## `uglify/side_effects/unsafe_builtin_3`


```js
var o = {};
if (42 < Math.random()) o.p = 'FAIL';
else o.p = 'PASS';
for (var k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var o = {};
-o.p = 42 < Math.random() ? 'FAIL' : 'PASS';
-for (var k in o) console.log(k, o[k]);
+var e = {};
+e.p = 42 < Math.random() ? 'FAIL' : 'PASS';
+for (var t in e) console.log(t, e[t]);

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
+		return x == y || (x && w(), y && z(), !0);
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

## `uglify/varify/forin_const_1`


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
+const e = {
 	foo: 42,
 	bar: 'PASS'
 };
-for (const k in o) console.log(k, o[k]);
+for (let t in e) console.log(t, e[t]);

```

## `uglify/varify/issue_4290_1_const`


```js
const a = 0;
var a;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-const a = 0;
-var a;
+const e = 0;
+var e;

```

## `uglify/varify/issue_4290_1_let`


```js
'use strict';
let a = 0;
var a;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 'use strict';
-let a = 0;
-var a;
+let e = 0;
+var e;

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

## `uglify/webkit/issue_5032_await`


```js
function log(value) {
	console.log(value);
	return value;
}
async function f(a) {
	var b = log(a), c = b;
	log(b);
	log(c);
}
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -3,8 +3,8 @@
 	return value;
 }
 async function f(a) {
-	var a = log(a), c = a;
-	log(a);
+	var b = log(a), c = b;
+	log(b);
 	log(c);
 }
 f('PASS');

```

## `uglify/webkit/issue_5032_yield`


```js
function log(value) {
	console.log(value);
	return value;
}
function* f(a) {
	var b = log(a), c = b;
	log(b);
	log(c);
}
f('PASS').next();

```

```diff
--- reference
+++ oxc
@@ -3,8 +3,8 @@
 	return value;
 }
 function* f(a) {
-	var a = log(a), c = a;
-	log(a);
+	var b = log(a), c = b;
+	log(b);
 	log(c);
 }
 f('PASS').next();

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

## `uglify/yields/evaluate`


```js
var a = function* () {}();
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = function* () {}();
-console.log(typeof a);
+var e = function* () {}();
+console.log(typeof e);

```

## `uglify/yields/issue_5019_2`


```js
var a = [];
for (var b in 'foo') a.push(function(c) {
	return function* () {
		console.log(c);
	}();
}(b));
a.map(function(d) {
	return d.next();
});

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
-var a = [];
-for (var b in 'foo') a.push(function(c) {
+var e = [];
+for (var t in 'foo') e.push(function(e) {
 	return function* () {
-		console.log(c);
+		console.log(e);
 	}();
-}(b));
-a.map(function(d) {
-	return d.next();
+}(t));
+e.map(function(e) {
+	return e.next();
 });

```

## `uglify/yields/issue_5663`


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
+var [, e] = function* () {
 	console.log('foo');
 	yield console.log('bar');
 	console.log('baz');

```

## `uglify/yields/reduce_iife_2`


```js
var a = 'PASS';
(function* () {
	a = 'FAIL';
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var a = 'PASS';
+var e = 'PASS';
 (function* () {
-	a = 'FAIL';
+	e = 'FAIL';
 })();
-console.log(a);
+console.log(e);

```

