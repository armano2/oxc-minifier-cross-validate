# terser / not-idempotent — Not idempotent (re-compressing changes the output)

Fixtures: 27

[← terser](README.md) · [← all families](../README.md)

## `terser/class_properties/mangle_class_properties`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
class Foo {
	bar = 'bar';
	static zzz = 'zzz';
	toString() {
		return this.bar + Foo.zzz;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 class Foo {
-	z = 'bar';
-	static r = 'zzz';
-	toString() {
-		return this.z + Foo.r;
+	e = 'bar';
+	static t = 'zzz';
+	n() {
+		return this.e + Foo.t;
 	}
 }

```

```js
// oxc, second pass
class Foo {
	r = 'bar';
	static i = 'zzz';
	a() {
		return this.r + Foo.i;
	}
}

```

## `terser/class_properties/mangle_class_properties_keep_quoted`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
class Foo {
	bar = 'bar';
	static zzz = 'zzz';
	toString() {
		return this.bar + Foo.zzz;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 class Foo {
-	bar = 'bar';
-	static zzz = 'zzz';
-	toString() {
-		return this.bar + Foo.zzz;
+	e = 'bar';
+	static t = 'zzz';
+	n() {
+		return this.e + Foo.t;
 	}
 }

```

```js
// oxc, second pass
class Foo {
	r = 'bar';
	static i = 'zzz';
	a() {
		return this.r + Foo.i;
	}
}

```

## `terser/drop_unused/issue_1715_4`

- tags: `remove unused`

```js
var a = 1;
!(function a() {
	a++;
	try {
		x();
	} catch (a) {
		var a;
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 var a = 1;
-!function() {
+(function a() {
+	a++;
 	try {
 		x();
 	} catch (a) {}
-}();
+})();
 console.log(a);

```

```js
// oxc, second pass
var a = 1;
(function a() {
	a++;
	try {
		x();
	} catch {}
})();
console.log(a);

```

## `terser/evaluate/issue_1760_1`


```js
!(function(a) {
	try {
		throw 0;
	} catch (NaN) {
		a = +'foo';
	}
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-!function(a) {
+(function(a) {
 	try {
 		throw 0;
-	} catch (NaN) {
+	} catch {
 		a = 0 / 0;
 	}
 	console.log(a);
-}();
+})();

```

```js
// oxc, second pass
(function(a) {
	try {
		throw 0;
	} catch {
		a = NaN;
	}
	console.log(a);
})();

```

## `terser/evaluate/issue_1760_2`


```js
!(function(a) {
	try {
		throw 0;
	} catch (Infinity) {
		a = 123456789 / 0;
	}
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-!function(a) {
+(function(a) {
 	try {
 		throw 0;
-	} catch (Infinity) {
-		a = 1 / 0;
+	} catch {
+		a = 123456789 / 0;
 	}
 	console.log(a);
-}();
+})();

```

```js
// oxc, second pass
(function(a) {
	try {
		throw 0;
	} catch {
		a = Infinity;
	}
	console.log(a);
})();

```

## `terser/issue_1321/issue_1321_debug`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

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
+x.e = 1;
+x._$foo$_ = 2 * x.e;
+console.t(x.e, x._$foo$_);

```

```js
// oxc, second pass
var x = {};
x.n = 1;
x.r = 2 * x.n;
console.i(x.n, x.r);

```

## `terser/issue_1321/issue_1321_no_debug`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

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
+x.e = 1;
+x.a = 2 * x.e;
+console.t(x.e, x.a);

```

```js
// oxc, second pass
var x = {};
x.n = 1;
x.r = 2 * x.n;
console.i(x.n, x.r);

```

## `terser/issue_1321/issue_1321_with_quoted`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

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
+x.e = 1;
+x.t = 2 * x.e;
+console.n(x.e, x.t);

```

```js
// oxc, second pass
var x = {};
x.r = 1;
x.i = 2 * x.r;
console.a(x.r, x.i);

```

## `terser/issue_1770/mangle_props`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
var obj = {
	undefined: 1,
	NaN: 2,
	Infinity: 3,
	'-Infinity': 4,
	null: 5
};
console.log(obj[void 0], obj[undefined], obj['undefined'], obj[0 / 0], obj[NaN], obj['NaN'], obj[1 / 0], obj[Infinity], obj['Infinity'], obj[-1 / 0], obj[-Infinity], obj['-Infinity'], obj[null], obj['null']);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 var obj = {
-	undefined: 1,
+	n: 1,
 	NaN: 2,
 	Infinity: 3,
 	'-Infinity': 4,
-	null: 5
+	t: 5
 };
-console.log(obj[void 0], obj[void 0], obj['undefined'], obj[0 / 0], obj[NaN], obj['NaN'], obj[1 / 0], obj[1 / 0], obj['Infinity'], obj[-1 / 0], obj[-1 / 0], obj['-Infinity'], obj[null], obj['null']);
+console.e(obj[void 0], obj[void 0], obj.undefined, obj[NaN], obj[NaN], obj.NaN, obj[1 / 0], obj[Infinity], obj.Infinity, obj[-1 / 0], obj[-Infinity], obj['-Infinity'], obj[null], obj.null);

```

```js
// oxc, second pass
var obj = {
	i: 1,
	NaN: 2,
	Infinity: 3,
	'-Infinity': 4,
	o: 5
};
console.r(obj[void 0], obj[void 0], obj.s, obj[NaN], obj[NaN], obj.NaN, obj[1 / 0], obj[Infinity], obj.Infinity, obj[-1 / 0], obj[-Infinity], obj['-Infinity'], obj[null], obj.a);

```

## `terser/issue_1770/numeric_literal`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
var obj = {
	0: 0,
	'-0': 1,
	42: 2,
	42: 3,
	37: 4,
	o: 5,
	1e42: 6,
	j: 7,
	1e42: 8
};
console.log(obj[-0], obj[-''], obj['-0']);
console.log(obj[42], obj['42']);
console.log(obj[37], obj['o'], obj[37], obj['37']);
console.log(obj[1e42], obj['j'], obj['1e+42']);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,15 @@
+var obj = {
+	0: 0,
+	'-0': 1,
+	42: 2,
+	42: 3,
+	37: 4,
+	n: 5,
+	1e42: 6,
+	t: 7,
+	1e42: 8
+};
+console.e(obj[-0], obj[-''], obj['-0']);
+console.e(obj[42], obj[42]);
+console.e(obj[37], obj.o, obj[37], obj[37]);
+console.e(obj[1e42], obj.j, obj['1e+42']);

```

```js
// oxc, second pass
var obj = {
	0: 0,
	'-0': 1,
	42: 2,
	42: 3,
	37: 4,
	a: 5,
	1e42: 6,
	c: 7,
	1e42: 8
};
console.r(obj[-0], obj[-''], obj['-0']);
console.r(obj[42], obj[42]);
console.r(obj[37], obj.s, obj[37], obj[37]);
console.r(obj[1e42], obj.i, obj['1e+42']);

```

## `terser/keep_quoted_strict/keep_quoted_strict`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
var a = {
	propa: 1,
	get propb() {
		return 2;
	},
	propc: 3,
	get propd() {
		return 4;
	}
};
var b = {
	propa: 5,
	get propb() {
		return 6;
	},
	propc: 7,
	get propd() {
		return 8;
	}
};
var c = {};
Object.defineProperty(c, 'propa', { value: 9 });
Object.defineProperty(c, 'propc', { value: 10 });
console.log(a.propa, a.propb, a.propc, a['propc'], a.propd, a['propd']);
console.log(b['propa'], b['propb'], b.propc, b['propc'], b.propd, b['propd']);
console.log(c.propa, c['propc']);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
-var propa = 1;
 var a = {
-	p: propa,
-	get o() {
+	e: 1,
+	get n() {
 		return 2;
 	},
 	propc: 3,
@@ -10,8 +9,8 @@
 	}
 };
 var b = {
-	propa: 5,
-	get propb() {
+	e: 5,
+	get n() {
 		return 6;
 	},
 	propc: 7,
@@ -20,8 +19,8 @@
 	}
 };
 var c = {};
-Object.defineProperty(c, 'p', { value: 9 });
-Object.defineProperty(c, 'propc', { value: 10 });
-console.log(a.p, a.o, a.propc, a.propc, a.propd, a.propd);
-console.log(b.propa, b.propb, b.propc, b.propc, b.propd, b.propd);
-console.log(c.p, c.propc);
+Object.r(c, 'propa', { i: 9 });
+Object.r(c, 'propc', { i: 10 });
+console.t(a.e, a.n, a.propc, a.propc, a.propd, a.propd);
+console.t(b.propa, b.propb, b.propc, b.propc, b.propd, b.propd);
+console.t(c.e, c.propc);

```

```js
// oxc, second pass
var a = {
	a: 1,
	get o() {
		return 2;
	},
	propc: 3,
	get propd() {
		return 4;
	}
};
var b = {
	a: 5,
	get o() {
		return 6;
	},
	propc: 7,
	get propd() {
		return 8;
	}
};
var c = {};
Object.l(c, 'propa', { c: 9 });
Object.l(c, 'propc', { c: 10 });
console.s(a.a, a.o, a.propc, a.propc, a.propd, a.propd);
console.s(b.u, b.d, b.propc, b.propc, b.propd, b.propd);
console.s(c.a, c.propc);

```

## `terser/properties/dont_mangle_computed_property_1`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB';
'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC';
const prop = Symbol('foo');
const obj = {
	[prop]: 'bar',
	baz: 1,
	qux: 2,
	[3 + 4]: 'seven',
	0: 'zero',
	1: 'one',
	null: 'Null',
	undefined: 'Undefined',
	Infinity: 'infinity',
	NaN: 'nan',
	void: 'Void'
};
console.log(obj[prop], obj['baz'], obj.qux, obj[7], obj[0], obj[1 + 0], obj[null], obj[undefined], obj[1 / 0], obj[NaN], obj.void);
console.log(obj.null, obj.undefined, obj.Infinity, obj.NaN);

```

```diff
--- reference
+++ oxc
@@ -4,16 +4,16 @@
 const prop = Symbol('foo');
 const obj = {
 	[prop]: 'bar',
-	A: 1,
-	B: 2,
-	[3 + 4]: 'seven',
+	a: 1,
+	n: 2,
+	7: 'seven',
 	0: 'zero',
 	1: 'one',
-	null: 'Null',
-	undefined: 'Undefined',
+	t: 'Null',
+	r: 'Undefined',
 	Infinity: 'infinity',
 	NaN: 'nan',
-	C: 'Void'
+	i: 'Void'
 };
-console.log(obj[prop], obj['A'], obj.B, obj[7], obj[0], obj[1 + 0], obj[null], obj[void 0], obj[1 / 0], obj[NaN], obj.C);
-console.log(obj.null, obj.undefined, obj.Infinity, obj.NaN);
+console.e(obj[prop], obj.baz, obj.n, obj[7], obj[0], obj[1], obj[null], obj[void 0], obj[1 / 0], obj[NaN], obj.i);
+console.e(obj.t, obj.r, obj.Infinity, obj.NaN);

```

```js
// oxc, second pass
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB';
'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC';
const prop = Symbol('foo');
const obj = {
	[prop]: 'bar',
	d: 1,
	c: 2,
	7: 'seven',
	0: 'zero',
	1: 'one',
	u: 'Null',
	l: 'Undefined',
	Infinity: 'infinity',
	NaN: 'nan',
	s: 'Void'
};
console.o(obj[prop], obj.f, obj.c, obj[7], obj[0], obj[1], obj[null], obj[void 0], obj[1 / 0], obj[NaN], obj.s);
console.o(obj.u, obj.l, obj.Infinity, obj.NaN);

```

## `terser/properties/dont_mangle_computed_property_2`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `mangle properties`, `drop debugger`, `join vars`, `sequences`, `remove unused`

```js
const prop = Symbol('foo');
const obj = {
	[prop]: 'bar',
	baz: 1,
	qux: 2,
	[3 + 4]: 'seven',
	0: 'zero',
	1: 'one',
	null: 'Null',
	undefined: 'Undefined',
	Infinity: 'infinity',
	NaN: 'nan',
	void: 'Void'
};
console.log(obj[prop], obj['baz'], obj.qux, obj[7], obj[0], obj[1 + 0], obj[null], obj[undefined], obj[1 / 0], obj[NaN], obj.void);
console.log(obj.null, obj.undefined, obj.Infinity, obj.NaN);

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
-const n = Symbol('foo'), o = {
-	[n]: 'bar',
-	o: 1,
-	i: 2,
+const e = Symbol('foo'), t = {
+	[e]: 'bar',
+	a: 1,
+	n: 2,
 	7: 'seven',
 	0: 'zero',
 	1: 'one',
-	null: 'Null',
-	undefined: 'Undefined',
+	t: 'Null',
+	r: 'Undefined',
 	Infinity: 'infinity',
 	NaN: 'nan',
-	l: 'Void'
+	i: 'Void'
 };
-console.log(o[n], o.o, o.i, o[7], o[0], o[1], o.null, o[void 0], o[1 / 0], o.NaN, o.l), console.log(o.null, o.undefined, o.Infinity, o.NaN);
+console.e(t[e], t.baz, t.n, t[7], t[0], t[1], t[null], t[void 0], t[1 / 0], t[NaN], t.i), console.e(t.t, t.r, t.Infinity, t.NaN);

```

```js
// oxc, second pass
const e = Symbol('foo'), t = {
	[e]: 'bar',
	d: 1,
	c: 2,
	7: 'seven',
	0: 'zero',
	1: 'one',
	u: 'Null',
	l: 'Undefined',
	Infinity: 'infinity',
	NaN: 'nan',
	s: 'Void'
};
console.o(t[e], t.f, t.c, t[7], t[0], t[1], t[null], t[void 0], t[1 / 0], t[NaN], t.s), console.o(t.u, t.l, t.Infinity, t.NaN);

```

## `terser/properties/issue_2256`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
var g = {};
({ keep: 1 });
g.keep = g.change;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var g = {};
-g.keep = g.g;
+g.e = g.t;

```

```js
// oxc, second pass
var g = {};
g.n = g.r;

```

## `terser/properties/issue_869_1`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

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
+var o = { e: 'FAIL' };
+Object.t(o, 'p', { get: function() {
 	return 'PASS';
 } });
-console.log(o.o);
+console.n(o.e);

```

```js
// oxc, second pass
var o = { r: 'FAIL' };
Object.a(o, 'p', { get: function() {
	return 'PASS';
} });
console.i(o.r);

```

## `terser/properties/issue_869_2`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

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
+var o = { e: 'FAIL' };
+Object.t(o, { e: { get: function() {
 	return 'PASS';
 } } });
-console.log(o.o);
+console.n(o.e);

```

```js
// oxc, second pass
var o = { r: 'FAIL' };
Object.a(o, { r: { get: function() {
	return 'PASS';
} } });
console.i(o.r);

```

## `terser/properties/mangle_debug`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
var a = {};
a.foo = 'bar';
x = { baz: 'ban' };

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = {};
-a._$foo$_ = 'bar';
-x = { _$baz$_: 'ban' };
+a.t = 'bar';
+x = { e: 'ban' };

```

```js
// oxc, second pass
var a = {};
a.r = 'bar';
x = { n: 'ban' };

```

## `terser/properties/mangle_debug_suffix`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
var a = {};
a.foo = 'bar';
x = { baz: 'ban' };

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = {};
-a._$foo$XYZ_ = 'bar';
-x = { _$baz$XYZ_: 'ban' };
+a.t = 'bar';
+x = { e: 'ban' };

```

```js
// oxc, second pass
var a = {};
a.r = 'bar';
x = { n: 'ban' };

```

## `terser/properties/mangle_debug_suffix_keep_quoted`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
var a = {};
a.top = 1;
function f1() {
	a['foo'] = 'bar';
	a.color = 'red';
	a.stuff = 2;
	x = {
		bar: 10,
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
@@ -1,22 +1,22 @@
 var a = {};
-a._$top$XYZ_ = 1;
+a.a = 1;
 function f1() {
-	a['foo'] = 'bar';
-	a.color = 'red';
-	a._$stuff$XYZ_ = 2;
+	a.foo = 'bar';
+	a.r = 'red';
+	a.n = 2;
 	x = {
-		bar: 10,
-		_$size$XYZ_: 7
+		t: 10,
+		e: 7
 	};
-	a._$size$XYZ_ = 9;
+	a.e = 9;
 }
 function f2() {
-	a.foo = 'bar';
-	a['color'] = 'red';
+	a.i = 'bar';
+	a.color = 'red';
 	x = {
-		bar: 10,
-		_$size$XYZ_: 7
+		t: 10,
+		e: 7
 	};
-	a._$size$XYZ_ = 9;
-	a._$stuff$XYZ_ = 3;
+	a.e = 9;
+	a.n = 3;
 }

```

```js
// oxc, second pass
var a = {};
a.l = 1;
function f1() {
	a.d = 'bar';
	a.p = 'red';
	a.s = 2;
	x = {
		c: 10,
		o: 7
	};
	a.o = 9;
}
function f2() {
	a.f = 'bar';
	a.u = 'red';
	x = {
		c: 10,
		o: 7
	};
	a.o = 9;
	a.s = 3;
}

```

## `terser/properties/mangle_define_property_arg`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
var some_prop = 'propname';
const object = { some_prop };
const non_global_console = console;
// .log gets preserved because of jsprops
non_global_console.log(object);
Object.defineProperty(object, 'some_prop', { value: 3 });
Object.defineProperty(non_global_console, 'lag', { value: 3 });
Object.defineProperty(console, 'lag', { value: 3 });

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 var some_prop = 'propname';
-const object = { o: some_prop };
+const object = { r: some_prop };
 const non_global_console = console;
-non_global_console.log(object);
-Object.defineProperty(object, 'o', { value: 3 });
-Object.defineProperty(non_global_console, 'e', { value: 3 });
-Object.defineProperty(console, 'e', { value: 3 });
+// .log gets preserved because of jsprops
+non_global_console.n(object);
+Object.e(object, 'some_prop', { t: 3 });
+Object.e(non_global_console, 'lag', { t: 3 });
+Object.e(console, 'lag', { t: 3 });

```

```js
// oxc, second pass
var some_prop = 'propname';
const object = { s: some_prop };
const non_global_console = console;
// .log gets preserved because of jsprops
non_global_console.o(object);
Object.i(object, 'some_prop', { a: 3 });
Object.i(non_global_console, 'lag', { a: 3 });
Object.i(console, 'lag', { a: 3 });

```

## `terser/properties/mangle_properties`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
a['foo'] = 'bar';
a.color = 'red';
x = { bar: 10 };
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
-a['foo'] = 'bar';
-a.color = 'red';
-x = { l: 10 };
-a.run(x.l, a.o);
-a['run']({
-	color: 'blue',
-	o: 'baz'
+a.e = 'bar';
+a.n = 'red';
+x = { t: 10 };
+a.r(x.t, a.e);
+a.r({
+	n: 'blue',
+	e: 'baz'
 });

```

```js
// oxc, second pass
a.i = 'bar';
a.a = 'red';
x = { s: 10 };
a.o(x.s, a.i);
a.o({
	a: 'blue',
	i: 'baz'
});

```

## `terser/properties/mangle_undeclared_properties`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `mangle properties`

```js
var Foo = { foo: function() {
	return Bar.bar();
} };

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var r = { o: function() {
-	return a.t();
+var e = { t: function() {
+	return Bar.e();
 } };

```

```js
// oxc, second pass
var e = { r: function() {
	return Bar.n();
} };

```

## `terser/properties/mangle_unquoted_properties`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
var a = {};
a.top = 1;
function f1() {
	a['foo'] = 'bar';
	a.color = 'red';
	a.stuff = 2;
	x = {
		bar: 10,
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
@@ -1,22 +1,22 @@
 var a = {};
 a.a = 1;
 function f1() {
-	a['foo'] = 'bar';
-	a.color = 'red';
-	a.r = 2;
+	a.foo = 'bar';
+	a.r = 'red';
+	a.n = 2;
 	x = {
-		bar: 10,
-		b: 7
+		t: 10,
+		e: 7
 	};
-	a.b = 9;
+	a.e = 9;
 }
 function f2() {
-	a.foo = 'bar';
-	a['color'] = 'red';
+	a.i = 'bar';
+	a.color = 'red';
 	x = {
-		bar: 10,
-		b: 7
+		t: 10,
+		e: 7
 	};
-	a.b = 9;
-	a.r = 3;
+	a.e = 9;
+	a.n = 3;
 }

```

```js
// oxc, second pass
var a = {};
a.l = 1;
function f1() {
	a.d = 'bar';
	a.p = 'red';
	a.s = 2;
	x = {
		c: 10,
		o: 7
	};
	a.o = 9;
}
function f2() {
	a.f = 'bar';
	a.u = 'red';
	x = {
		c: 10,
		o: 7
	};
	a.o = 9;
	a.s = 3;
}

```

## `terser/properties/methods_keep_quoted_false`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
class C {
	Quoted() {}
	Unquoted() {}
}
f1({
	Quoted() {},
	Unquoted() {},
	Prop: 3
});
f2({ Quoted: function() {} });
f3({ Quoted: () => {} });

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 class C {
-	o() {}
+	e() {}
 	t() {}
 }
 f1({
-	o() {},
+	e() {},
 	t() {},
-	u: 3
+	n: 3
 });
-f2({ o() {} });
-f3({ o() {} });
+f2({ e: function() {} });
+f3({ e: () => {} });

```

```js
// oxc, second pass
class C {
	r() {}
	i() {}
}
f1({
	r() {},
	i() {},
	a: 3
});
f2({ r: function() {} });
f3({ r: () => {} });

```

## `terser/properties/methods_keep_quoted_from_dead_code`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`, `join vars`

```js
class C {
	Quoted() {}
	Unquoted() {}
}
f1({
	Quoted() {},
	Unquoted() {},
	Prop: 3
});
f2({ Quoted: function() {} });
f3({ Quoted: () => {} });
0 && obj['Quoted'];

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 class C {
-	Quoted() {}
-	o() {}
+	e() {}
+	t() {}
 }
 f1({
-	Quoted() {},
-	o() {},
-	Prop: 3
+	e() {},
+	t() {},
+	n: 3
 });
-f2({ Quoted() {} });
-f3({ Quoted() {} });
+f2({ e: function() {} });
+f3({ e: () => {} });

```

```js
// oxc, second pass
class C {
	r() {}
	i() {}
}
f1({
	r() {},
	i() {},
	a: 3
});
f2({ r: function() {} });
f3({ r: () => {} });

```

## `terser/properties/methods_keep_quoted_true`

- tags: `mangle`, `keep function names`, `keep class names`, `mangle properties`

```js
class C {
	Quoted() {}
	Unquoted() {}
}
f1({
	Quoted() {},
	Unquoted() {},
	Prop: 3
});
f2({ Quoted: function() {} });
f3({ Quoted: () => {} });

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 class C {
-	Quoted() {}
-	o() {}
+	e() {}
+	t() {}
 }
 f1({
-	Quoted() {},
-	o() {},
-	Prop: 3
+	e() {},
+	t() {},
+	n: 3
 });
-f2({ Quoted() {} });
-f3({ Quoted() {} });
+f2({ e: function() {} });
+f3({ e: () => {} });

```

```js
// oxc, second pass
class C {
	r() {}
	i() {}
}
f1({
	r() {},
	i() {},
	a: 3
});
f2({ r: function() {} });
f3({ r: () => {} });

```

## `terser/properties/skip_undeclared_properties_by_default`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `mangle properties`

```js
var Foo = { foo: function() {
	return Bar.bar();
} };

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var r = { o: function() {
-	return a.bar();
+var e = { t: function() {
+	return Bar.e();
 } };

```

```js
// oxc, second pass
var e = { r: function() {
	return Bar.n();
} };

```

