# swc / smaller — Output shorter than expected (possible over-optimization / bug)

Fixtures: 245

[← swc](README.md) · [← all families](../README.md)

## `swc/issues/11645/eval-parent-scope-nested-block`

- size: oxc 104 vs reference 105 (-1 bytes)

```js
function outer() {
	let f = (a) => a;
	eval('f = (_, b) => b');
	{
		return f(1, 2);
	}
}
console.log(outer());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function outer() {
-	let f = (a) => a;
-	eval('f = (_, b) => b');
-	return f(1, 2);
+	let f = (e) => e;
+	return eval('f = (_, b) => b'), f(1, 2);
 }
 console.log(outer());

```

## `swc/issues/11645/eval-rebind-scope`

- size: oxc 104 vs reference 105 (-1 bytes)

```js
function outer() {
	let f = (a) => a;
	eval('f = (_, b) => b');
	return f(1, 2);
}
console.log(outer());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function outer() {
-	let f = (a) => a;
-	eval('f = (_, b) => b');
-	return f(1, 2);
+	let f = (e) => e;
+	return eval('f = (_, b) => b'), f(1, 2);
 }
 console.log(outer());

```

## `swc/issues/6751/1`

- size: oxc 173 vs reference 174 (-1 bytes)

```js
let current_component;
function set_current_component(component) {
	current_component = component;
}
function f(component) {
	const parent = current_component;
	set_current_component(component);
	parent.m();
}
const obj = { m() {
	console.log('call m()');
} };
try {
	f(obj);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,16 @@
-let current_component;
+let e;
+function t(t) {
+	e = t;
+}
+function n(n) {
+	let r = e;
+	t(n), r.m();
+}
+const r = { m() {
+	console.log('call m()');
+} };
 try {
-	let parent = current_component;
-	current_component = { m() {
-		console.log('call m()');
-	} }, parent.m();
-} catch (e) {
+	n(r);
+} catch {
 	console.log('PASS');
 }

```

## `swc/issues/9186/2`

- size: oxc 132 vs reference 133 (-1 bytes)

```js
console.log((function() {
	while (true) {
		console.log(123);
	}
})());
console.log((function(a = this.a) {
	while (true) {
		console.log(123);
	}
})());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-console.log((() => {
-	while (true) console.log(123);
+console.log((function() {
+	for (;;) console.log(123);
+})()), console.log((function(e = this.a) {
+	for (;;) console.log(123);
 })());
-console.log(function(a = this.a) {
-	while (true) console.log(123);
-}());

```

## `swc/issues/vercel/003`

- size: oxc 746 vs reference 747 (-1 bytes)

```js
import { a, b } from './utils';
if (typeof window !== 'undefined') {
	require('intersection-observer');
}
const manager = (function makeManager() {
	const c = new Map();
	function d(e) {
		return f(e) || new IntersectionObserver(g, e);
	}
	function f(g = {}) {
		const h = b(g);
		for (const i of c.keys()) {
			if (a(i, h)) {
				return i;
			}
		}
		return null;
	}
	function j(k) {
		return !c.has(k) ? c.set(k, new Map()).get(k) : c.get(k);
	}
	function l(m, n, o) {
		const p = j(m);
		p.set(n, o);
		m.observe(n);
	}
	function q(r, s) {
		const t = j(r);
		t.delete(s);
		r.unobserve(s);
	}
	function g(u, v) {
		for (let w of u) {
			const x = j(v);
			const y = x.get(w.target);
			if (y) {
				y(w);
			}
		}
	}
	return {
		d,
		l,
		q
	};
})();
export default manager;
export const { d } = manager;
export const { l } = manager;
export const { q } = manager;

```

```diff
--- reference
+++ oxc
@@ -1,33 +1,37 @@
-import { a, b } from './utils';
-'u' > typeof window && require('intersection-observer');
-let manager = function() {
-	let c = new Map();
-	function j(k) {
-		return c.has(k) ? c.get(k) : c.set(k, new Map()).get(k);
+import { a as e, b as t } from './utils';
+typeof window < 'u' && require('intersection-observer');
+const n = (function() {
+	let n = new Map();
+	function r(e) {
+		return i(e) || new IntersectionObserver(c, e);
+	}
+	function i(r = {}) {
+		let i = t(r);
+		for (let t of n.keys()) if (e(t, i)) return t;
+		return null;
+	}
+	function a(e) {
+		return n.has(e) ? n.get(e) : n.set(e, new Map()).get(e);
+	}
+	function o(e, t, n) {
+		a(e).set(t, n), e.observe(t);
 	}
-	function g(u, v) {
-		for (let w of u) {
-			let y = j(v).get(w.target);
-			y && y(w);
+	function s(e, t) {
+		a(e).delete(t), e.unobserve(t);
+	}
+	function c(e, t) {
+		for (let n of e) {
+			let e = a(t).get(n.target);
+			e && e(n);
 		}
 	}
 	return {
-		d: function(e) {
-			return function(g = {}) {
-				let h = b(g);
-				for (let i of c.keys()) if (a(i, h)) return i;
-				return null;
-			}(e) || new IntersectionObserver(g, e);
-		},
-		l: function(m, n, o) {
-			j(m).set(n, o), m.observe(n);
-		},
-		q: function(r, s) {
-			j(r).delete(s), r.unobserve(s);
-		}
+		d: r,
+		l: o,
+		q: s
 	};
-}();
-export default manager;
-export const { d } = manager;
-export const { l } = manager;
-export const { q } = manager;
+})();
+export default n;
+export const { d: r } = n;
+export const { l: i } = n;
+export const { q: a } = n;

```

## `swc/issues/10633`

- size: oxc 170 vs reference 172 (-2 bytes)

```js
class A {
	test() {
		return 1;
	}
}
export class B extends A {
	constructor() {
		super();
		const fn = () => super.test();
		setTimeout(function() {
			fn();
		}, 0);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
-class A {
+class e {
 	test() {
 		return 1;
 	}
 }
-export class B extends A {
+export class t extends e {
 	constructor() {
 		super();
-		let fn = () => super.test();
+		let e = () => super.test();
 		setTimeout(function() {
-			fn();
+			e();
 		}, 0);
 	}
 }

```

## `swc/issues/3710`

- size: oxc 41 vs reference 43 (-2 bytes)

```js
export const foo = (a) => `${a + 1}-${a}`;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export const foo = (a) => `${a + 1}-${a}`;
+export const e = (e) => `${e + 1}-${e}`;

```

## `swc/issues/6508/2`

- size: oxc 43 vs reference 45 (-2 bytes)

```js
'use client';
export class Foo {
	foo() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use client';
-export class Foo {
+export class e {
 	foo() {}
 }

```

## `swc/issues/6508/3`

- size: oxc 43 vs reference 45 (-2 bytes)

```js
'use client';
export var Foo = { foo() {} };

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 'use client';
-export var Foo = { foo() {} };
+export var e = { foo() {} };

```

## `swc/issues/6508/3/output`

- size: oxc 53 vs reference 55 (-2 bytes)

```js
'use client';
export var Foo = { foo: function foo() {} };

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 'use client';
-export var Foo = { foo: function() {} };
+export var e = { foo: function() {} };

```

## `swc/issues/7634/1`

- size: oxc 100 vs reference 102 (-2 bytes)

```js
import Foo from './foo.js';
export const Bar = Foo;
function someRecursiveFunction(value) {
	return value.map(someRecursiveFunction);
}
export default someRecursiveFunction;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-import o from './foo.js';
-export const Bar = o;
-export default (function o(r) {
-	return r.map(o);
-});
+import e from './foo.js';
+export const t = e;
+function n(e) {
+	return e.map(n);
+}
+export default n;

```

## `swc/issues/8136`

- size: oxc 29 vs reference 31 (-2 bytes)

```js
export class Foo {
	static {}
	foo = 2;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-export class Foo {
+export class e {
 	foo = 2;
 }

```

## `swc/issues/8626`

- size: oxc 48 vs reference 50 (-2 bytes)

```js
export function foo(cb) {
	cb();
}
foo((a, b) => true);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-export function foo(cb) {
-	cb();
+export function e(e) {
+	e();
 }
-foo(() => !0);
+e((e, t) => !0);

```

## `swc/issues/arguments-parameter-injection-size`

- size: oxc 129 vs reference 131 (-2 bytes)

```js
(function(zero, one) {
	console.log(arguments[20], arguments['20'], arguments[4294967295], arguments['4294967295']);
})('zero', 'one');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function(zero, one) {
-	console.log(arguments[20], arguments[20], arguments[4294967295], arguments[4294967295]);
-}('zero', 'one');
+(function(e, t) {
+	console.log(arguments[20], arguments[20], arguments[4294967295], arguments['4294967295']);
+})('zero', 'one');

```

## `swc/projects/jquery/.17`

- size: oxc 642 vs reference 644 (-2 bytes)

```js
jQuery.fn.offset = function(options) {
	const core_strundefined = 'undefined';
	if (arguments.length) {
		return options === undefined ? this : this.each(function(i) {
			jQuery.offset.setOffset(this, options, i);
		});
	}
	var docElem, win, box = {
		top: 0,
		left: 0
	}, elem = this[0], doc = elem && elem.ownerDocument;
	if (!doc) {
		return;
	}
	docElem = doc.documentElement;
	// Make sure it's not a disconnected DOM node
	if (!jQuery.contains(docElem, elem)) {
		return box;
	}
	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if (typeof elem.getBoundingClientRect !== core_strundefined) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow(doc);
	return {
		top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
		left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
	};
};

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 jQuery.fn.offset = function(options) {
-	if (arguments.length) return void 0 === options ? this : this.each(function(i) {
+	if (arguments.length) return options === void 0 ? this : this.each(function(i) {
 		jQuery.offset.setOffset(this, options, i);
 	});
 	var docElem, win, box = {
 		top: 0,
 		left: 0
 	}, elem = this[0], doc = elem && elem.ownerDocument;
-	if (doc) return (docElem = doc.documentElement, jQuery.contains(docElem, elem)) ? (void 0 !== elem.getBoundingClientRect && (box = elem.getBoundingClientRect()), win = getWindow(doc), {
+	if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (elem.getBoundingClientRect !== void 0 && (box = elem.getBoundingClientRect()), win = getWindow(doc), {
 		top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
 		left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
 	}) : box;

```

## `swc/projects/jquery/9`

- size: oxc 212 vs reference 214 (-2 bytes)

```js
export const obj = { fireWith: function(context, args) {
	args = args || [];
	args = [context, args.slice ? args.slice() : args];
	if (list && (!fired || stack)) {
		if (firing) {
			stack.push(args);
		} else {
			fire(args);
		}
	}
	return this;
} };

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 export const obj = { fireWith: function(context, args) {
-	return args = [context, (args = args || []).slice ? args.slice() : args], list && (!fired || stack) && (firing ? stack.push(args) : fire(args)), this;
+	return args ||= [], args = [context, args.slice ? args.slice() : args], list && (!fired || stack) && (firing ? stack.push(args) : fire(args)), this;
 } };

```

## `swc/projects/mootools/9`

- size: oxc 266 vs reference 268 (-2 bytes)

```js
var newClass = function() {
	reset(this);
	if (newClass.$prototyping) return this;
	this.$caller = null;
	var value = this.initialize ? this.initialize.apply(this, arguments) : this;
	this.$caller = this.caller = null;
	return value;
}.extend(this).implement(params);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var newClass = (function() {
+var newClass = function() {
 	if (reset(this), newClass.$prototyping) return this;
 	this.$caller = null;
 	var value = this.initialize ? this.initialize.apply(this, arguments) : this;
 	return this.$caller = this.caller = null, value;
-}).extend(this).implement(params);
+}.extend(this).implement(params);

```

## `swc/projects/yui/2`

- size: oxc 241 vs reference 243 (-2 bytes)

```js
export const E = { test: function(Y) {
	var doc = Y.config.doc, node = doc ? doc.documentElement : null;
	if (node && node.style) {
		return 'MozTransition' in node.style || 'WebkitTransition' in node.style || 'transition' in node.style;
	}
	return false;
} };

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 export const E = { test: function(Y) {
 	var doc = Y.config.doc, node = doc ? doc.documentElement : null;
-	return !!node && !!node.style && ('MozTransition' in node.style || 'WebkitTransition' in node.style || 'transition' in node.style);
+	return node && node.style ? 'MozTransition' in node.style || 'WebkitTransition' in node.style || 'transition' in node.style : !1;
 } };

```

## `swc/issues/10824`

- size: oxc 194 vs reference 197 (-3 bytes)

```js
class A {
	b;
	constructor(b) {
		this.b = b;
	}
	c = (i = 1) => {
		this.b += i;
	};
}
const a1 = new A(1);
const a2 = new A(2);
a1.c();
console.assert(a1.b === 2);
console.assert(a2.b === 2);
export {};

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-class A {
+class e {
 	b;
-	constructor(b) {
-		this.b = b;
+	constructor(e) {
+		this.b = e;
 	}
-	c = (i = 1) => {
-		this.b += i;
+	c = (e = 1) => {
+		this.b += e;
 	};
 }
-let a1 = new A(1), a2 = new A(2);
-a1.c(), console.assert(2 === a1.b), console.assert(2 === a2.b);
+const t = new e(1), n = new e(2);
+t.c(), console.assert(t.b === 2), console.assert(n.b === 2);
 export {};

```

## `swc/issues/7784/3`

- size: oxc 120 vs reference 123 (-3 bytes)

```js
export function f(i, e, cmp) {
	function g() {
		i++;
		return e || 0;
	}
	if (e = g(e), cmp(i, e)) {
		console.log(e);
	}
	return g;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-export function f(i, e, cmp) {
-	function g() {
-		return i++, e || 0;
+export function e(e, t, n) {
+	function r() {
+		return e++, t || 0;
 	}
-	return e = g(), cmp(i, e) && console.log(e), g;
+	return t = r(t), n(e, t) && console.log(t), r;
 }

```

## `swc/issues/10935`

- size: oxc 21 vs reference 25 (-4 bytes)

```js
export let foo;
foo = 1;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export let foo;
-foo = 1;
+export let e;
+e = 1;

```

## `swc/issues/11645/with-parent-scope-nested-block`

- size: oxc 108 vs reference 112 (-4 bytes)

```js
function outer(obj) {
	let f = (a) => a;
	with(obj) {
		f = (_, b) => b;
	}
	{
		return f(1, 2);
	}
}
console.log(outer({}));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-function outer(obj) {
-	let f = (a) => a;
-	with(obj) f = (_, b) => b;
-	return f(1, 2);
+function outer(e) {
+	let t = (e) => e;
+	with(e) t = (e, t) => t;
+	return t(1, 2);
 }
 console.log(outer({}));

```

## `swc/issues/6791/1`

- size: oxc 103 vs reference 107 (-4 bytes)

```js
import { test } from 'test';
var Test;
(function(Test) {
	Test['Hello'] = 'World!';
})(Test || (Test = {}));
test(Test['Hello']);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-var o;
-import { test as l } from 'test';
-!function(o) {
-	o.Hello = 'World!';
-}(o || (o = {}));
-l(o.Hello);
+import { test as e } from 'test';
+var t;
+(function(e) {
+	e.Hello = 'World!';
+})(t ||= {}), e(t.Hello);

```

## `swc/issues/7457/1`

- size: oxc 77 vs reference 81 (-4 bytes)

```js
function bar() {
	return function* () {
		yield foo();
	};
}
console.log(bar());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-function bar() {
+function e() {
 	return function* () {
 		yield foo();
 	};
 }
-console.log(bar());
+console.log(e());

```

## `swc/issues/7678`

- size: oxc 121 vs reference 125 (-4 bytes)

```js
export let str = '\\uD83D\\uDC68\\u200D\\uD83D\\uDE80';
export let obj = { '\\uD83D\\uDC68\\u200D\\uD83D\\uDE80': 'wrong' };

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export let str = '\\uD83D\\uDC68\\u200D\\uD83D\\uDE80';
-export let obj = { '\\uD83D\\uDC68\\u200D\\uD83D\\uDE80': 'wrong' };
+export let e = '\\uD83D\\uDC68\\u200D\\uD83D\\uDE80';
+export let t = { '\\uD83D\\uDC68\\u200D\\uD83D\\uDE80': 'wrong' };

```

## `swc/issues/8907`

- size: oxc 62 vs reference 66 (-4 bytes)

```js
const used = (0, forwardRef)(
	/* harden */
	Foo
);
export default used;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-let used = forwardRef(
+const e = forwardRef(
 	/* harden */
 	Foo
 );
-export default used;
+export default e;

```

## `swc/issues/8974`

- size: oxc 96 vs reference 100 (-4 bytes)

```js
const one = {
	kind: 'Document',
	definitions: [],
	loc: {}
};
const two = {
	kind: 'Document',
	definitions: one.definitions
};
const three = a`${one}`;
export {};

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-let one = {
+const e = {
 	kind: 'Document',
 	definitions: [],
 	loc: {}
 };
-one.definitions, a`${one}`;
+e.definitions, a`${e}`;
 export {};

```

## `swc/issues/9504`

- size: oxc 789 vs reference 793 (-4 bytes)

```js
export function panUpdate(e) {
	if (!moveDirectionExpected) {
		panStart = false;
		return;
	}
	caf(rafIndex);
	if (panStart) {
		rafIndex = raf(function() {
			panUpdate(e);
		});
	}
	if (moveDirectionExpected === '?') {
		moveDirectionExpected = getMoveDirectionExpected();
	}
	if (moveDirectionExpected) {
		if (!preventScroll && isTouchEvent(e)) {
			preventScroll = true;
		}
		try {
			if (e.type) {
				events.emit(isTouchEvent(e) ? 'touchMove' : 'dragMove', info(e));
			}
		} catch (err) {}
		var x = translateInit, dist = getDist(lastPosition, initPosition);
		if (!horizontal || fixedWidth || autoWidth) {
			// Relevant lines below
			x += dist;
			x += 'px';
		} else {
			var percentageX = TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew) : dist * 100 / (viewport + gutter);
			x += percentageX;
			x += '%';
		}
		container.style[transformAttr] = transformPrefix + x + transformPostfix;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,21 @@
-export function panUpdate(e) {
+export function e(t) {
 	if (!moveDirectionExpected) {
 		panStart = !1;
 		return;
 	}
 	if (caf(rafIndex), panStart && (rafIndex = raf(function() {
-		panUpdate(e);
-	})), '?' === moveDirectionExpected && (moveDirectionExpected = getMoveDirectionExpected()), moveDirectionExpected) {
-		!preventScroll && isTouchEvent(e) && (preventScroll = !0);
+		e(t);
+	})), moveDirectionExpected === '?' && (moveDirectionExpected = getMoveDirectionExpected()), moveDirectionExpected) {
+		!preventScroll && isTouchEvent(t) && (preventScroll = !0);
 		try {
-			e.type && events.emit(isTouchEvent(e) ? 'touchMove' : 'dragMove', info(e));
-		} catch (err) {}
-		var x = translateInit, dist = getDist(lastPosition, initPosition);
-		!horizontal || fixedWidth || autoWidth ? (x += dist, x += 'px') : (x += TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew) : 100 * dist / (viewport + gutter), x += '%'), container.style[transformAttr] = transformPrefix + x + transformPostfix;
+			t.type && events.emit(isTouchEvent(t) ? 'touchMove' : 'dragMove', info(t));
+		} catch {}
+		var n = translateInit, r = getDist(lastPosition, initPosition);
+		if (!horizontal || fixedWidth || autoWidth) n += r, n += 'px';
+		else {
+			var i = TRANSFORM ? r * items * 100 / ((viewport + gutter) * slideCountNew) : r * 100 / (viewport + gutter);
+			n += i, n += '%';
+		}
+		container.style[transformAttr] = transformPrefix + n + transformPostfix;
 	}
 }

```

## `swc/member_expr/callee`

- size: oxc 59 vs reference 63 (-4 bytes)

```js
try {
	const foo = {};
	foo?.bar.baz?.();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	({}).bar.baz?.();
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `swc/issues/6175/1`

- size: oxc 88 vs reference 93 (-5 bytes)

```js
let o = { f() {
	assert.ok(this !== o);
} };
(1, o.f)``;
(true ? o.f : false)``;
(true && o.f)``;
let a;
(a = o.f)``;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-let o = { f() {
-	assert.ok(this !== o);
+let e = { f() {
+	assert.ok(this !== e);
 } };
-(0, o.f)``, (0, o.f)``, (0, o.f)``, (0, o.f)``;
+(0, e.f)``, (0, e.f)``, (0, e.f)``, e.f``;

```

## `swc/issues/7783/1`

- size: oxc 161 vs reference 166 (-5 bytes)

```js
export default function Home() {
	return React.createElement('div', null, foo.a);
}
const foo = {
	get a() {
		return `a ${this.b}`;
	},
	get b() {
		return `b`;
	}
};

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-export default function Home() {
-	return React.createElement('div', null, foo.a);
+export default function e() {
+	return React.createElement('div', null, t.a);
 }
-let foo = {
+const t = {
 	get a() {
 		return `a ${this.b}`;
 	},

```

## `swc/issues/9610-destructuring`

- size: oxc 625 vs reference 630 (-5 bytes)

```js
// Test: Destructuring patterns with default values
// Object destructuring with default - unused
function foo({ a, b = 10 }) {
	return a;
}
// Object destructuring with default - used
function bar({ a, b = 20 }) {
	return a + b;
}
// Array destructuring with default - unused
function baz([a, b = 30]) {
	return a;
}
// Array destructuring with default - used
function qux([a, b = 40]) {
	return a + b;
}
// Combined: regular param and destructuring with defaults
function combined(x, { a, b = 50 }, c = 60) {
	return x + a;
}
export function example() {
	return foo({ a: 1 }) + bar({ a: 2 }) + baz([3]) + qux([4]) + combined(5, { a: 6 });
}

```

```diff
--- reference
+++ oxc
@@ -1,24 +1,24 @@
 // Test: Destructuring patterns with default values
 // Object destructuring with default - unused
-function foo({ a, b = 10 }) {
-	return a;
+function e({ a: e, b: t = 10 }) {
+	return e;
 }
 // Object destructuring with default - used
-function bar({ a, b = 20 }) {
-	return a + b;
+function t({ a: e, b: t = 20 }) {
+	return e + t;
 }
 // Array destructuring with default - unused
-function baz([a, ,]) {
-	return a;
+function n([e, t = 30]) {
+	return e;
 }
 // Array destructuring with default - used
-function qux([a, b = 40]) {
-	return a + b;
+function r([e, t = 40]) {
+	return e + t;
 }
 // Combined: regular param and destructuring with defaults
-function combined(x, { a, b = 50 }) {
-	return x + a;
+function i(e, { a: t, b: n = 50 }, r = 60) {
+	return e + t;
 }
-export function example() {
-	return foo({ a: 1 }) + bar({ a: 2 }) + baz([3]) + qux([4]) + combined(5, { a: 6 });
+export function a() {
+	return e({ a: 1 }) + t({ a: 2 }) + n([3]) + r([4]) + i(5, { a: 6 });
 }

```

## `swc/issues/object-accessor-function-boundary`

- size: oxc 168 vs reference 173 (-5 bytes)

```js
function make(key) {
	return {
		get [key]() {
			return key;
		},
		set [key](value = key) {
			console.log(value);
		}
	};
}
const object = make('value');
console.log(object.value);
object.value = undefined;

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,12 @@
-var key;
-const object = {
-	get [key = 'value']() {
-		return key;
-	},
-	set [key](value = key) {
-		console.log(value);
-	}
-};
-console.log(object.value), object.value = void 0;
+function e(e) {
+	return {
+		get [e]() {
+			return e;
+		},
+		set [e](t = e) {
+			console.log(t);
+		}
+	};
+}
+const t = e('value');
+console.log(t.value), t.value = void 0;

```

## `swc/pr/6272`

- size: oxc 9 vs reference 14 (-5 bytes)

```js
a ?? (a = b);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-a ?? (a = b);
+a ??= b;

```

## `swc/issues/11512-exhaustive/iife-default-side-effect`

- size: oxc 121 vs reference 127 (-6 bytes)

```js
let calls = 0;
function side() {
	calls++;
	return 1;
}
export function iifeDefaultSideEffect(value) {
	return (function(a, b = side()) {
		return a;
	})(value);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,9 @@
-let calls = 0;
-export function iifeDefaultSideEffect(value) {
-	return function(a, b = (calls++, 1)) {
-		return a;
-	}(value);
+let e = 0;
+function t() {
+	return e++, 1;
+}
+export function n(e) {
+	return (function(e, n = t()) {
+		return e;
+	})(e);
 }

```

## `swc/issues/6344/1`

- size: oxc 243 vs reference 249 (-6 bytes)

```js
function a() {}
var te = function() {
	function n(e) {}
	var t = null;
	return { init: function(e) {
		return t = new n(e);
	} };
}();
var he = function() {
	function n() {
		a();
	}
	;
	var t = null;
	return { init: function(e) {
		return t;
	} };
}();

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,15 @@
-function n() {}
+function e() {}
 var t = function() {
-	function n(n) {}
+	function e(e) {}
 	var t = null;
-	return { init: function(u) {
-		return t = new n(u);
+	return { init: function(n) {
+		return t = new e(n);
 	} };
 }();
-var u = function() {
-	function t() {
-		n();
-	}
-	var u = null;
-	return { init: function(n) {
-		return u;
+var n = function() {
+	function e() {}
+	var t = null;
+	return { init: function(e) {
+		return null;
 	} };
 }();

```

## `swc/issues/8714`

- size: oxc 56 vs reference 62 (-6 bytes)

```js
const foo = {
	x: 1,
	y: () => foo
};
console.log(foo.y().x);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-const foo = {
+const e = {
 	x: 1,
-	y: () => foo
+	y: () => e
 };
-console.log(foo.y().x);
+console.log(e.y().x);

```

## `swc/issues/9466`

- size: oxc 99 vs reference 105 (-6 bytes)

```js
'use strict';
let k = function() {
	function x() {}
	class y {}
	for (x of ['']);
	for (y in ['']);
}();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'use strict';
-let k = function() {
-	function x() {}
-	class y {}
-	for (x of ['']);
-	for (y in ['']);
-}();
+(function() {
+	function e() {}
+	class t {}
+	for (e of ['']);
+	for (t in ['']);
+})();

```

## `swc/issues/9468`

- size: oxc 177 vs reference 183 (-6 bytes)

```js
function func1(arg1, arg2) {
	return getX(arg1) + arg2;
}
function getX(x) {
	const v = document.getElementById('eid').getAttribute(x);
	return v;
}
console.log(func1(7, getX('data-x')));
console.log(func1(7, getX('data-y')));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-var t, e;
-function getX(t) {
-	return document.getElementById('eid').getAttribute(t);
+function e(e, n) {
+	return t(e) + n;
+}
+function t(e) {
+	return document.getElementById('eid').getAttribute(e);
 }
-console.log((t = getX('data-x'), getX(7) + t)), console.log((e = getX('data-y'), getX(7) + e));
+console.log(e(7, t('data-x'))), console.log(e(7, t('data-y')));

```

## `swc/issues/buble/1`

- size: oxc 118 vs reference 124 (-6 bytes)

```js
export default function thrower() {
	throw new Error(`Failed to recognize value \`${value}\` for property ` + `\`${property}\`.`);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-export default function thrower() {
+export default function e() {
 	throw Error(`Failed to recognize value \`${value}\` for property \`${property}\`.`);
 }

```

## `swc/member_expr/array`

- size: oxc 710 vs reference 716 (-6 bytes)

```js
// Invalid
f([][0]);
f([][1]);
f([][-1]);
f([].invalid);
f([]['invalid']);
f([][[]]);
f([][0 + []]);
// Object symbols
[].constructor;
[].__proto__;
[].__defineGetter__;
[].__defineSetter__;
[].__lookupGetter__;
[].__lookupSetter__;
[].hasOwnProperty;
[].isPrototypeOf;
[].propertyIsEnumerable;
[].toLocaleString;
[].toString;
[].valueOf;
// Array symbols
[].length;
[].at;
[].concat;
[].copyWithin;
[].entries;
[].every;
[].fill;
[].filter;
[].find;
[].findIndex;
[].findLast;
[].findLastIndex;
[].flat;
[].flatMap;
[].forEach;
[].includes;
[].indexOf;
[].join;
[].keys;
[].lastIndexOf;
[].map;
[].pop;
[].push;
[].reduce;
[].reduceRight;
[].reverse;
[].shift;
[].slice;
[].some;
[].sort;
[].splice;
[].toReversed;
[].toSorted;
[].toSpliced;
[].unshift;
[].values;
[].with;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-// Invalid
-f(void 0), f(void 0), f(void 0), f(void 0), f(void 0), f(void 0), f(void 0), [].constructor, [].__proto__, [].__defineGetter__, [].__defineSetter__, [].__lookupGetter__, [].__lookupSetter__, [].hasOwnProperty, [].isPrototypeOf, [].propertyIsEnumerable, [].toLocaleString, [].toString, [].valueOf, [].at, [].concat, [].copyWithin, [].entries, [].every, [].fill, [].filter, [].find, [].findIndex, [].findLast, [].findLastIndex, [].flat, [].flatMap, [].forEach, [].includes, [].indexOf, [].join, [].keys, [].lastIndexOf, [].map, [].pop, [].push, [].reduce, [].reduceRight, [].reverse, [].shift, [].slice, [].some, [].sort, [].splice, [].toReversed, [].toSorted, [].toSpliced, [].unshift, [].values, [].with;
+f([][0]), f([][1]), f([][-1]), f([].invalid), f([].invalid), f([][[]]), f([][0]), [].constructor, [].__proto__, [].__defineGetter__, [].__defineSetter__, [].__lookupGetter__, [].__lookupSetter__, [].hasOwnProperty, [].isPrototypeOf, [].propertyIsEnumerable, [].toLocaleString, [].toString, [].valueOf, [].at, [].concat, [].copyWithin, [].entries, [].every, [].fill, [].filter, [].find, [].findIndex, [].findLast, [].findLastIndex, [].flat, [].flatMap, [].forEach, [].includes, [].indexOf, [].join, [].keys, [].lastIndexOf, [].map, [].pop, [].push, [].reduce, [].reduceRight, [].reverse, [].shift, [].slice, [].some, [].sort, [].splice, [].toReversed, [].toSorted, [].toSpliced, [].unshift, [].values, [].with;

```

## `swc/next/feedback-1/reduced/1`

- size: oxc 312 vs reference 318 (-6 bytes)

```js
export function getInsertStringLength(a, e, t, i) {
	var r = a.mask, o = a.maskChar, n = t.split(''), s = i;
	return n.every(function(e) {
		for (; n = e, isPermanentCharacter(a, t = i) && n !== r[t];) if (++i >= r.length) return !1;
		var t, n;
		return (isAllowedCharacter(a, i, e) || e === o) && i++, i < r.length;
	}), i - s;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
-export function getInsertStringLength(a, e, t, i) {
-	var r = a.mask, o = a.maskChar, n = t.split(''), s = i;
-	return n.every(function(e) {
-		for (var t; isPermanentCharacter(a, t = i) && e !== r[t];) if (++i >= r.length) return !1;
-		return (isAllowedCharacter(a, i, e) || e === o) && i++, i < r.length;
-	}), i - s;
+export function e(e, t, n, r) {
+	var i = e.mask, a = e.maskChar, o = n.split(''), s = r;
+	return o.every(function(t) {
+		for (; o = t, isPermanentCharacter(e, n = r) && o !== i[n];) if (++r >= i.length) return !1;
+		var n, o;
+		return (isAllowedCharacter(e, r, t) || t === a) && r++, r < i.length;
+	}), r - s;
 }

```

## `swc/pr/7145`

- size: oxc 77 vs reference 83 (-6 bytes)

```js
export function foo(arr) {
	var a = () => x;
	for (const b in arr) {
		console.log(a);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-export function foo(arr) {
-	var a = () => x;
-	for (let b in arr) console.log(a);
+export function e(e) {
+	var t = () => x;
+	for (let n in e) console.log(t);
 }

```

## `swc/issues/11034`

- size: oxc 112 vs reference 119 (-7 bytes)

```js
export function f() {
	const foo = window.e ? 'bar' : 'baz';
	foo = `it's not allowed`;
	console.log(`foo=${foo}`);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-export function f() {
-	const foo = window.e ? 'bar' : 'baz';
-	foo = 'it\'s not allowed';
-	console.log(`foo=${foo}`);
+export function e() {
+	const e = window.e ? 'bar' : 'baz';
+	e = 'it\'s not allowed', console.log(`foo=${e}`);
 }

```

## `swc/issues/7697/1`

- size: oxc 64 vs reference 71 (-7 bytes)

```js
let id = 0;
export function getId() {
	id = id % 9999;
	return `${id++}`;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-let id = 0;
-export function getId() {
-	return id %= 9999, `${id++}`;
+let e = 0;
+export function t() {
+	return e %= 9999, `${e++}`;
 }

```

## `swc/issues/8924`

- size: oxc 66 vs reference 73 (-7 bytes)

```js
'use strict';
const k = (() => {
	let x = 1;
	x **= undefined;
	return x;
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'use strict';
-const k = (() => {
-	let x = 1;
-	return x **= void 0;
+(() => {
+	let e = 1;
+	return e **= void 0, e;
 })();

```

## `swc/issues/drop-console-es2015`

- size: oxc 198 vs reference 205 (-7 bytes)

```js
const err = console.error.bind(console);
err('boom');
process.stdout.write(typeof err + '\n');
let threw = false;
try {
	new (console.error.bind(console))();
} catch (e) {
	threw = true;
}
process.stdout.write(threw + '\n');

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
-const err = (() => {}).bind();
-err('boom');
-process.stdout.write(typeof err + '\n');
-let threw = false;
+const e = console.error.bind(console);
+e('boom'), process.stdout.write(typeof e + '\n');
+let t = !1;
 try {
-	new ((() => {}).bind())();
-} catch (e) {
-	threw = true;
+	new (console.error.bind(console))();
+} catch {
+	t = !0;
 }
-process.stdout.write(threw + '\n');
+process.stdout.write(t + '\n');

```

## `swc/projects/backbone/16`

- size: oxc 569 vs reference 576 (-7 bytes)

```js
export const obj = { remove: function(models, options) {
	var singular = !_.isArray(models);
	models = singular ? [models] : _.clone(models);
	options || (options = {});
	var i, l, index, model;
	for (i = 0, l = models.length; i < l; i++) {
		model = models[i] = this.get(models[i]);
		if (!model) continue;
		delete this._byId[model.id];
		delete this._byId[model.cid];
		index = this.indexOf(model);
		this.models.splice(index, 1);
		this.length--;
		if (!options.silent) {
			options.index = index;
			model.trigger('remove', model, this, options);
		}
		this._removeReference(model);
	}
	return singular ? models[0] : models;
} };

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 export const obj = { remove: function(models, options) {
-	var i, l, index, model, singular = !_.isArray(models);
-	for (models = singular ? [models] : _.clone(models), options || (options = {}), i = 0, l = models.length; i < l; i++) (model = models[i] = this.get(models[i])) && (delete this._byId[model.id], delete this._byId[model.cid], index = this.indexOf(model), this.models.splice(index, 1), this.length--, options.silent || (options.index = index, model.trigger('remove', model, this, options)), this._removeReference(model));
+	var singular = !_.isArray(models);
+	models = singular ? [models] : _.clone(models), options ||= {};
+	for (var i = 0, l = models.length, index, model; i < l; i++) model = models[i] = this.get(models[i]), model && (delete this._byId[model.id], delete this._byId[model.cid], index = this.indexOf(model), this.models.splice(index, 1), this.length--, options.silent || (options.index = index, model.trigger('remove', model, this, options)), this._removeReference(model));
 	return singular ? models[0] : models;
 } };

```

## `swc/issues/10281`

- size: oxc 156 vs reference 164 (-8 bytes)

```js
export function bitwise1(a, b) {
	return a & b | 0;
}
export function bitwise2(a) {
	return ~a | 0;
}
export function bitwise3(a, b) {
	a ^= b | 0;
	console.log(a | b, a & b);
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
-export function bitwise1(a, b) {
-	return a & b;
+export function e(e, t) {
+	return e & t | 0;
 }
-export function bitwise2(a) {
-	return ~a;
+export function t(e) {
+	return ~e | 0;
 }
-export function bitwise3(a, b) {
-	console.log((a ^= b) | b, a & b);
+export function n(e, t) {
+	e ^= t | 0, console.log(e | t, e & t);
 }

```

## `swc/issues/5684`

- size: oxc 38 vs reference 46 (-8 bytes)

```js
var obj;
obj = unknown(), obj && obj.__esModule;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var obj;
-(obj = unknown()) && obj.__esModule;
+var e = unknown();
+e && e.__esModule;

```

## `swc/issues/6463`

- size: oxc 59 vs reference 67 (-8 bytes)

```js
var foo_1 = foo;
function foo() {
	console.log('foo');
}
foo_1();
foo_1();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-var foo_1 = function() {
+var e = t;
+function t() {
 	console.log('foo');
-};
-foo_1(), foo_1();
+}
+e(), e();

```

## `swc/issues/8923`

- size: oxc 67 vs reference 75 (-8 bytes)

```js
'use strict';
const k = (() => {
	let x = '';
	x *= x-- / x;
	return x;
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'use strict';
-const k = (() => {
-	let x = '';
-	return x * (x-- / x);
+(() => {
+	let e = '';
+	return e *= e-- / e, e;
 })();

```

## `swc/issues/9500`

- size: oxc 68 vs reference 76 (-8 bytes)

```js
let foo = 1;
const obj = { get 1() {
	// same with get "1"()
	foo = 2;
	return 40;
} };
obj['1'];
console.log(foo);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-let foo = 1;
+let e = 1;
 ({ get 1() {
-	return foo = 2, 40;
-} })['1'], console.log(foo);
+	return e = 2, 40;
+} })[1], console.log(e);

```

## `swc/pr/6169/2`

- size: oxc 81 vs reference 89 (-8 bytes)

```js
var ref = [, { toUpperCase() {
	console.log(this);
} }], key = ref[0], value = ref[1];
value.toUpperCase();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var ref = [, { toUpperCase() {
+var e = [, { toUpperCase() {
 	console.log(this);
 } }];
-(ref[0], ref[1]).toUpperCase();
+e[0], e[1].toUpperCase();

```

## `swc/projects/angular/2`

- size: oxc 159 vs reference 167 (-8 bytes)

```js
var h = destination.$$hashKey;
forEach(destination, function(value, key) {
	delete destination[key];
});
for (var key in source) destination[key] = copy(source[key]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var h = destination.$$hashKey;
-for (var key in forEach(destination, function(value, key) {
+for (var key in destination.$$hashKey, forEach(destination, function(value, key) {
 	delete destination[key];
 }), source) destination[key] = copy(source[key]);

```

## `swc/projects/backbone/5`

- size: oxc 391 vs reference 399 (-8 bytes)

```js
export var Events = { 
// Bind an event to a `callback` function. Passing `"all"` will bind
// the callback to all events fired.
on: function(name, callback, context) {
	if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
	this._events || (this._events = {});
	var events = this._events[name] || (this._events[name] = []);
	events.push({
		callback,
		context,
		ctx: context || this
	});
	return this;
} };

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,9 @@
 // Bind an event to a `callback` function. Passing `"all"` will bind
 // the callback to all events fired.
 on: function(name, callback, context) {
-	return eventsApi(this, 'on', name, [callback, context]) && callback && (this._events || (this._events = {}), (this._events[name] || (this._events[name] = [])).push({
+	return !eventsApi(this, 'on', name, [callback, context]) || !callback ? this : (this._events ||= {}, (this._events[name] || (this._events[name] = [])).push({
 		callback,
 		context,
 		ctx: context || this
-	})), this;
+	}), this);
 } };

```

## `swc/projects/underscore/12`

- size: oxc 123 vs reference 131 (-8 bytes)

```js
_.random = function(min, max) {
	if (max == null) {
		max = min;
		min = 0;
	}
	return min + Math.floor(Math.random() * (max - min + 1));
};

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 _.random = function(min, max) {
-	return null == max && (max = min, min = 0), min + Math.floor(Math.random() * (max - min + 1));
+	return max ?? (max = min, min = 0), min + Math.floor(Math.random() * (max - min + 1));
 };

```

## `swc/projects/backbone/15`

- size: oxc 335 vs reference 344 (-9 bytes)

```js
export const obj = { changedAttributes: function(diff) {
	if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
	var val, changed = false;
	var old = this._changing ? this._previousAttributes : this.attributes;
	for (var attr in diff) {
		if (_.isEqual(old[attr], val = diff[attr])) continue;
		(changed || (changed = {}))[attr] = val;
	}
	return changed;
} };

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 export const obj = { changedAttributes: function(diff) {
-	if (!diff) return !!this.hasChanged() && _.clone(this.changed);
+	if (!diff) return this.hasChanged() ? _.clone(this.changed) : !1;
 	var val, changed = !1, old = this._changing ? this._previousAttributes : this.attributes;
-	for (var attr in diff) _.isEqual(old[attr], val = diff[attr]) || ((changed || (changed = {}))[attr] = val);
+	for (var attr in diff) _.isEqual(old[attr], val = diff[attr]) || ((changed ||= {})[attr] = val);
 	return changed;
 } };

```

## `swc/projects/underscore/8`

- size: oxc 653 vs reference 662 (-9 bytes)

```js
_.throttle = function(func, wait, options) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	options || (options = {});
	var later = function() {
		previous = options.leading === false ? 0 : new Date();
		timeout = null;
		result = func.apply(context, args);
	};
	return function() {
		var now = new Date();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0) {
			clearTimeout(timeout);
			timeout = null;
			previous = now;
			result = func.apply(context, args);
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
 _.throttle = function(func, wait, options) {
 	var context, args, result, timeout = null, previous = 0;
-	options || (options = {});
+	options ||= {};
 	var later = function() {
-		previous = !1 === options.leading ? 0 : new Date(), timeout = null, result = func.apply(context, args);
+		previous = options.leading === !1 ? 0 : new Date(), timeout = null, result = func.apply(context, args);
 	};
 	return function() {
 		var now = new Date();
-		previous || !1 !== options.leading || (previous = now);
+		!previous && options.leading === !1 && (previous = now);
 		var remaining = wait - (now - previous);
-		return context = this, args = arguments, remaining <= 0 ? (clearTimeout(timeout), timeout = null, previous = now, result = func.apply(context, args)) : timeout || !1 === options.trailing || (timeout = setTimeout(later, remaining)), result;
+		return context = this, args = arguments, remaining <= 0 ? (clearTimeout(timeout), timeout = null, previous = now, result = func.apply(context, args)) : !timeout && options.trailing !== !1 && (timeout = setTimeout(later, remaining)), result;
 	};
 };

```

## `swc/issues/3709`

- size: oxc 28 vs reference 38 (-10 bytes)

```js
export var a;
export var b;
var c;
var d;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var c, d;
-export var a;
-export var b;
+export var e;
+export var t;

```

## `swc/next/41992/1`

- size: oxc 224 vs reference 234 (-10 bytes)

```js
export const N = (0, p.default)(e = (0, ft.default)((0, p.default)(r).call(r, ((e, t) => {
	const r = t.get('in');
	return e[r] ?? (e[r] = []), e[r].push(t), e;
}), {}))).call(e, ((e, t) => (0, h.default)(e).call(e, t)), []);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-export const N = (0, p.default)(e = (0, ft.default)((0, p.default)(r).call(r, (e1, t) => {
-	const r1 = t.get('in');
-	return e1[r1] ?? (e1[r1] = []), e1[r1].push(t), e1;
-}, {}))).call(e, (e1, t) => (0, h.default)(e1).call(e1, t), []);
+export const t = (0, p.default)(e = (0, ft.default)((0, p.default)(r).call(r, ((t, n) => {
+	let i = n.get('in');
+	return t[i] ?? (t[i] = []), t[i].push(n), t;
+}), {}))).call(e, ((t, n) => (0, h.default)(t).call(t, n)), []);

```

## `swc/pr/11987`

- size: oxc 27 vs reference 37 (-10 bytes)

```js
export const a = (() => eval(''))();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export const a = (() => eval(''))();
+export const a = eval('');

```

## `swc/issues/7749`

- size: oxc 86 vs reference 97 (-11 bytes)

```js
let depth = 0;
function foo(n) {
	depth += 1;
	let k = visit(n);
	depth -= 1;
	return k;
}
blackbox(foo);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-let depth = 0;
-blackbox(function(n) {
-	depth += 1;
-	let k = visit(n);
-	return depth -= 1, k;
-});
+let e = 0;
+function t(t) {
+	e += 1;
+	let n = visit(t);
+	return --e, n;
+}
+blackbox(t);

```

## `swc/projects/mootools/2`

- size: oxc 188 vs reference 199 (-11 bytes)

```js
var Hash = this.Hash = new Type('Hash', function(object) {
	if (typeOf(object) == 'hash') object = Object.clone(object.getClean());
	for (var key in object) this[key] = object[key];
	return this;
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var Hash = this.Hash = new Type('Hash', function(object) {
-	for (var key in 'hash' == typeOf(object) && (object = Object.clone(object.getClean())), object) this[key] = object[key];
+this.Hash = new Type('Hash', function(object) {
+	for (var key in typeOf(object) == 'hash' && (object = Object.clone(object.getClean())), object) this[key] = object[key];
 	return this;
 });

```

## `swc/issues/11645/child-scope-reassign-merge`

- size: oxc 111 vs reference 123 (-12 bytes)

```js
function run(cond) {
	let f = (a) => a;
	if (cond) {
		f = (a, b) => b;
	}
	return f(1, 2);
}
console.log(run(true), run(false));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-function run(cond) {
-	let f = (a) => a;
-	if (cond) f = (a, b) => b;
-	return f(1, 2);
+function run(e) {
+	let t = (e) => e;
+	return e && (t = (e, t) => t), t(1, 2);
 }
-console.log(run(true), run(false));
+console.log(run(!0), run(!1));

```

## `swc/issues/2923/1`

- size: oxc 55 vs reference 67 (-12 bytes)

```js
export default function example(html) {
	const test = () => {
		return 'test';
	};
	return html`${test()}`;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-export default function example(html) {
-	return html`${'test'}`;
+export default function e(e) {
+	return e`${'test'}`;
 }

```

## `swc/issues/7969`

- size: oxc 176 vs reference 188 (-12 bytes)

```js
let a = 0;
function f(arr) {
	let b = a;
	return `${arr.map((child) => {
		a = b + 'str';
	})}`;
}
function g(arr) {
	return f(arr);
}
globalThis.g = g;
g([
	1,
	2,
	3
]);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,15 @@
-let a = 0;
-function f(arr) {
-	let b = a;
-	return `${arr.map((child) => {
-		a = b + 'str';
+let e = 0;
+function t(t) {
+	let n = e;
+	return `${t.map((t) => {
+		e = n + 'str';
 	})}`;
 }
-function g(arr) {
-	return f(arr);
+function n(e) {
+	return t(e);
 }
-globalThis.g = g;
-g([
+globalThis.g = n, n([
 	1,
 	2,
 	3
-]);
-console.log(a);
+]), console.log(e);

```

## `swc/issues/8692`

- size: oxc 163 vs reference 175 (-12 bytes)

```js
const props = {
	neededProp: 1,
	nestedProp: {
		getProps: () => props,
		getProp() {
			return this.getProps().neededProp;
		}
	}
};
console.log(props.nestedProp.getProp());

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-const props = {
+const e = {
 	neededProp: 1,
 	nestedProp: {
-		getProps: () => props,
+		getProps: () => e,
 		getProp() {
 			return this.getProps().neededProp;
 		}
 	}
 };
-console.log(props.nestedProp.getProp());
+console.log(e.nestedProp.getProp());

```

## `swc/issues/9650`

- size: oxc 312 vs reference 324 (-12 bytes)

```js
export function logVariables(var1, var2, var3, var4, var5, var6, var7, var8, var9, var10, var11, var12, var13, var14, var15, var16, var17, var18, var19, var20, var21, var22, var23, var24, var25, var26, var27, var28, var29, var30, var101, var201, var301, var401, var501, var601, var701, var801, var901, var1001, var1101, var1201, var1301, var1401, var1501, var1601, var1701, var1801, var1901, var2001, var2101, var2201, var2301, var2401, var2501, var2601, var2701, var2801, var2901, var3001) {
	console.log(var1, var2, var3, var4, var5, var6, var7, var8, var9, var10, var11, var12, var13, var14, var15, var16, var17, var18, var19, var20, var21, var22, var23, var24, var25, var26, var27, var28, var29, var30);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-export function logVariables(o, l, e, n, a, c, g, i, r, s, t, b, f, p, u, x, V, d, h, j, k, m, q, v, w, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, W, X, Y, Z, _, oo, ol, oe, on, oa, oc, og) {
-	console.log(o, l, e, n, a, c, g, i, r, s, t, b, f, p, u, x, V, d, h, j, k, m, q, v, w, y, z, A, B, C);
+export function e(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L, R, z, B, V, H, U, W, G, K, q, J, Y, X, Z, Q, $, ee, te, ne, re, ie, ae) {
+	console.log(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k);
 }

```

## `swc/projects/angular/3`

- size: oxc 38 vs reference 50 (-12 bytes)

```js
if (foo) {
	if (bar) {
		var baz = console.log('Foo bar');
	}
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if (foo && bar) var baz = console.log('Foo bar');
+foo && bar && console.log('Foo bar');

```

## `swc/projects/yui/6`

- size: oxc 76 vs reference 88 (-12 bytes)

```js
export function foo() {
	return actions = -1, complete({ fn: self._onSuccess }), void 0;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 export function foo() {
-	return actions = -1, void complete({ fn: self._onSuccess });
+	actions = -1, complete({ fn: self._onSuccess });
 }

```

## `swc/simple/inline/5`

- size: oxc 227 vs reference 239 (-12 bytes)

```js
export function foo() {
	b = 1;
	console.log(2);
	console.log(b);
	for (var b, c = 0; c < 10; c++) {
		console.log(c);
	}
}
export function bar() {
	function x() {
		b = 1;
	}
	for (var b = 10, c = 0; c < 10; c++) {
		/*#__NOINLINE__*/ x();
		console.log(b, c);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-export function foo() {
-	console.log(2), console.log(1);
-	for (var c = 0; c < 10; c++) console.log(c);
+export function e() {
+	e = 1, console.log(2), console.log(e);
+	for (var e, t = 0; t < 10; t++) console.log(t);
 }
-export function bar() {
-	function x() {
-		b = 1;
+export function t() {
+	function e() {
+		t = 1;
 	}
-	for (var b = 10, c = 0; c < 10; c++) /*#__NOINLINE__*/ x(), console.log(b, c);
+	for (var t = 10, n = 0; n < 10; n++) e(), console.log(t, n);
 }

```

## `swc/next/swc-4559`

- size: oxc 398 vs reference 411 (-13 bytes)

```js
(self['webpackChunk_N_E'] = self['webpackChunk_N_E'] || []).push([[657], { 
/***/ 4816: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
	'use strict';
	return new Error([
		`MUI: \`<DataGrid pageSize={${props.pageSize}} />\` is not a valid prop.`,
		`Only page size below ${MAX_PAGE_SIZE} is available in the MIT version.`,
		'',
		'You need to upgrade to the DataGridPro component to unlock this feature.'
	].join('\n'));
} }]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
 (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[657], { 
-/***/ 4816: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
-	return Error(`MUI: \`<DataGrid pageSize={${props.pageSize}} />\` is not a valid prop.\nOnly page size below ${MAX_PAGE_SIZE} is available in the MIT version.\n\nYou need to upgrade to the DataGridPro component to unlock this feature.`);
+/***/ 4816: /***/ function(e, t, n) {
+	'use strict';
+	return Error([
+		`MUI: \`<DataGrid pageSize={${props.pageSize}} />\` is not a valid prop.`,
+		`Only page size below ${MAX_PAGE_SIZE} is available in the MIT version.`,
+		'',
+		'You need to upgrade to the DataGridPro component to unlock this feature.'
+	].join('\n'));
 } }]);

```

## `swc/projects/backbone/12`

- size: oxc 109 vs reference 122 (-13 bytes)

```js
var names, i, l;
names = name ? [name] : _.keys(this._events);
for (i = 0, l = names.length; i < l; i++) {
	name = names[i];
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var names, i, l;
-for (names = name ? [name] : _.keys(this._events), i = 0, l = names.length; i < l; i++) name = names[i];
+for (var names = name ? [name] : _.keys(this._events), i = 0, l = names.length; i < l; i++) name = names[i];

```

## `swc/reduced/3`

- size: oxc 184 vs reference 197 (-13 bytes)

```js
var element = jqLite(element);
if (element.injector()) {
	var tag = element[0] === document ? 'document' : startingTag(element);
	throw ngMinErr('btstrpd', 'App Already Bootstrapped with this Element \'{0}\'', tag);
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-var element = jqLite(element);
-if (element.injector()) throw ngMinErr('btstrpd', 'App Already Bootstrapped with this Element \'{0}\'', element[0] === document ? 'document' : startingTag(element));
+var e = jqLite(e);
+if (e.injector()) {
+	var t = e[0] === document ? 'document' : startingTag(e);
+	throw ngMinErr('btstrpd', 'App Already Bootstrapped with this Element \'{0}\'', t);
+}

```

## `swc/issues/5910/1`

- size: oxc 108 vs reference 122 (-14 bytes)

```js
export function fn1() {
	let walkingIndex = 0;
	function fn2() {
		const myIndex = walkingIndex;
		walkingIndex += 1;
		console.log(myIndex, walkingIndex);
	}
	return fn2;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
-export function fn1() {
-	let walkingIndex = 0;
-	return function() {
-		console.log(walkingIndex, walkingIndex += 1);
-	};
+export function e() {
+	let e = 0;
+	function t() {
+		let t = e;
+		e += 1, console.log(t, e);
+	}
+	return t;
 }

```

## `swc/issues/6628`

- size: oxc 361 vs reference 375 (-14 bytes)

```js
(function() {
	var Collector = function() {
		var e = function e(e) {};
		return e.usePlugin = function(t, i, n) {}, e.plugins = [], e;
	}();
	var CallbackType;
	!function(e) {
		e[e.Var = 0] = 'Var', e[e.All = 1] = 'All';
	}(CallbackType || (CallbackType = {}));
	var CepRule = function() {
		eval();
	}();
	Collector.usePlugin(CepRule, 'cep');
	exports.Collector = Collector;
})();

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
-!function() {
-	var CallbackType, Collector = function() {
-		var n = function(n) {};
-		return n.usePlugin = function(n, u, l) {}, n.plugins = [], n;
-	}();
-	!function(n) {
-		n[n.Var = 0] = 'Var', n[n.All = 1] = 'All';
-	}(CallbackType || (CallbackType = {}));
+(function() {
+	var Collector = function() {
+		var e = function(e) {};
+		return e.usePlugin = function(e, t, n) {}, e.plugins = [], e;
+	}(), CallbackType;
+	(function(e) {
+		e[e.Var = 0] = 'Var', e[e.All = 1] = 'All';
+	})(CallbackType ||= {});
 	var CepRule = function() {
 		eval();
 	}();
 	Collector.usePlugin(CepRule, 'cep'), exports.Collector = Collector;
-}();
+})();

```

## `swc/issues/10720`

- size: oxc 242 vs reference 257 (-15 bytes)

```js
export function someFn({ someVal, shouldBreak }) {
	switch (someVal) {
		case 'one':
			// if there is a certain condition, we exit
			if (shouldBreak === 'break') {
				break;
			}
			return 1;
		default: return 0;
	}
	// this code gets hit if we break
	return 11;
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-export function someFn({ someVal, shouldBreak }) {
-	switch (someVal) {
+export function e({ someVal: e, shouldBreak: t }) {
+	switch (e) {
 		case 'one':
 			// if there is a certain condition, we exit
-			if ('break' === shouldBreak) break;
+			if (t === 'break') break;
 			return 1;
 		default: return 0;
 	}

```

## `swc/issues/11829`

- size: oxc 177 vs reference 192 (-15 bytes)

```js
function run(options) {
	let { cb } = options;
	if (!cb) {
		cb = () => true;
	}
	return cb('value');
}
run({ cb(value) {
	if (value === undefined) {
		throw new Error('missing argument');
	}
	console.log('PASS');
	return true;
} });

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
-!function(options) {
-	let { cb } = options;
-	cb || (cb = () => !0), cb('value');
-}({ cb(value) {
-	if (void 0 === value) throw Error('missing argument');
+function e(e) {
+	let { cb: t } = e;
+	return t ||= () => !0, t('value');
+}
+e({ cb(e) {
+	if (e === void 0) throw Error('missing argument');
 	return console.log('PASS'), !0;
 } });

```

## `swc/issues/7402`

- size: oxc 259 vs reference 274 (-15 bytes)

```js
export function mutate(out) {
	out[0] = 1;
	out[1] = 2;
	out[2] = 3;
	return out;
}
export const myFunc = (function() {
	const temp = [
		0,
		0,
		0
	];
	return function(out) {
		const scaling = temp;
		mutate(scaling);
		out[0] = 1 / scaling[0];
		out[1] = 1 / scaling[1];
		out[2] = 1 / scaling[2];
		return out;
	};
})();
const out = [
	1,
	2,
	3
];
myFunc(out);

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,18 @@
-let temp;
-export function mutate(out) {
-	return out[0] = 1, out[1] = 2, out[2] = 3, out;
+export function e(e) {
+	return e[0] = 1, e[1] = 2, e[2] = 3, e;
 }
-export const myFunc = (temp = [
-	0,
-	0,
-	0
-], function(out) {
-	return mutate(temp), out[0] = 1 / temp[0], out[1] = 1 / temp[1], out[2] = 1 / temp[2], out;
-});
-myFunc([
+export const t = (function() {
+	let t = [
+		0,
+		0,
+		0
+	];
+	return function(n) {
+		let r = t;
+		return e(r), n[0] = 1 / r[0], n[1] = 1 / r[1], n[2] = 1 / r[2], n;
+	};
+})();
+t([
 	1,
 	2,
 	3

```

## `swc/simple/issues/2007/1`

- size: oxc 92 vs reference 107 (-15 bytes)

```js
const obj = {};
for (let key in obj) {
	obj[key] = obj[key].trim();
}
let arr = ['foo'];
arr.forEach(() => {});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 const obj = {};
 for (let key in obj) obj[key] = obj[key].trim();
-let arr = ['foo'];
-arr.forEach(() => {});
+['foo'].forEach(() => {});

```

## `swc/issues/10539/1`

- size: oxc 59 vs reference 75 (-16 bytes)

```js
(class ClassExpr {
	static prop = new ClassExpr();
});
console.log('foo');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(class ClassExpr {
-	static prop = new ClassExpr();
+(class e {
+	static prop = new e();
 }), console.log('foo');

```

## `swc/issues/8271`

- size: oxc 305 vs reference 321 (-16 bytes)

```js
let $eb2fd35624c84372$var$A = (() => {
	let _classDecorators = [$eb2fd35624c84372$var$CustomElement('component-a')];
	let _classDescriptor;
	let _classExtraInitializers = [];
	let _classThis;
	let _classSuper = HTMLElement;
	var A = class extends _classSuper {
		static {
			_classThis = this;
		}
		static {
			console.log(123);
		}
		constructor() {
			super();
			this.innerHTML = 'Component A is working';
		}
	};
	return A = _classThis;
})();
console.log(new $eb2fd35624c84372$var$A().tagName);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,16 @@
-let _classThis, _classSuper;
-console.log(new ($eb2fd35624c84372$var$CustomElement('component-a'), _classSuper = HTMLElement, class extends _classSuper {
-	static {
-		_classThis = this;
-	}
-	static {
-		console.log(123);
-	}
-	constructor() {
-		super(), this.innerHTML = 'Component A is working';
-	}
-}, _classThis)().tagName);
+let e = (() => {
+	$eb2fd35624c84372$var$CustomElement('component-a');
+	let e, t = HTMLElement;
+	return class extends t {
+		static {
+			e = this;
+		}
+		static {
+			console.log(123);
+		}
+		constructor() {
+			super(), this.innerHTML = 'Component A is working';
+		}
+	}, e;
+})();
+console.log(new e().tagName);

```

## `swc/issues/10466`

- size: oxc 201 vs reference 218 (-17 bytes)

```js
const G = { setPackageName({ packageName }) {
	if ('string' == typeof packageName) this.packageName = packageName;
	return this;
} };
var packageName;
packageName = '@clerk/clerk-react', G.setPackageName({ packageName }), console.log(G.packageName);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-const G = { setPackageName({ packageName }) {
-	return 'string' == typeof packageName && (this.packageName = packageName), this;
+const e = { setPackageName({ packageName: e }) {
+	return typeof e == 'string' && (this.packageName = e), this;
 } };
-G.setPackageName({ packageName: '@clerk/clerk-react' }), console.log(G.packageName);
+e.setPackageName({ packageName: '@clerk/clerk-react' }), console.log(e.packageName);

```

## `swc/issues/6344/2`

- size: oxc 268 vs reference 285 (-17 bytes)

```js
'use strict';
function a() {}
var te = function() {
	var n = function n(e) {};
	var t = null;
	return { init: function init(e) {
		return t = new n(e);
	} };
}();
var he = function() {
	var n = function n() {
		a();
	};
	;
	var t = null;
	return { init: function init(e) {
		return t;
	} };
}();

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,16 @@
 'use strict';
-function n() {}
-var r = function() {
-	var n = function n(n) {};
-	var r = null;
-	return { init: function t(t) {
-		return r = new n(t);
+function e() {}
+var t = function() {
+	var e = function(e) {};
+	var t = null;
+	return { init: function(n) {
+		return t = new e(n);
 	} };
 }();
-var t = function() {
-	var r = function r() {
-		n();
-	};
+var n = function() {
+	var e = function() {};
 	var t = null;
-	return { init: function n(n) {
+	return { init: function(e) {
 		return t;
 	} };
 }();

```

## `swc/issues/8844`

- size: oxc 0 vs reference 17 (-17 bytes)

```js
const k = (() => {
	let x;
	switch (x) {
		case x?.x?.():
		default:
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +0,0 @@
-let x;
-x?.x?.();

```

## `swc/simple/disable-char-freq/1`

- size: oxc 0 vs reference 17 (-17 bytes)

```js
var foo;
var bar = 2;
var baz;

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-var a, b, c = 2;

```

## `swc/issues/6730`

- size: oxc 682 vs reference 700 (-18 bytes)

```js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	try {
		var info = gen[key](arg);
		var value = info.value;
	} catch (error) {
		reject(error);
		return;
	}
	if (info.done) {
		resolve(value);
	} else {
		Promise.resolve(value).then(_next, _throw);
	}
}
function _asyncToGenerator(fn) {
	return function() {
		var self = this, args = arguments;
		return new Promise(function(resolve, reject) {
			var gen = fn.apply(self, args);
			function _next(value) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
			}
			function _throw(err) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
			}
			_next(undefined);
		});
	};
}
export const styleLoader = () => {
	return {
		name: 'style-loader',
		setup(build) {
			build.onLoad({
				filter: /.*/,
				namespace: 'less'
			}, function() {
				var _ref = _asyncToGenerator(function* (args) {});
				return function(args) {
					return _ref.apply(this, arguments);
				};
			}());
		}
	};
};

```

```diff
--- reference
+++ oxc
@@ -1,39 +1,38 @@
-function n(n, e, r, t, o, i, u) {
+function e(e, t, n, r, i, a, o) {
 	try {
-		var a = n[i](u);
-		var c = a.value;
-	} catch (n) {
-		r(n);
+		var s = e[a](o);
+		var c = s.value;
+	} catch (e) {
+		n(e);
 		return;
 	}
-	if (a.done) e(c);
-	else Promise.resolve(c).then(t, o);
+	s.done ? t(c) : Promise.resolve(c).then(r, i);
 }
-function e(e) {
+function t(t) {
 	return function() {
-		var r = this, t = arguments;
-		return new Promise(function(o, i) {
-			var u = e.apply(r, t);
-			function a(e) {
-				n(u, o, i, a, c, 'next', e);
+		var n = this, r = arguments;
+		return new Promise(function(i, a) {
+			var o = t.apply(n, r);
+			function s(t) {
+				e(o, i, a, s, c, 'next', t);
 			}
-			function c(e) {
-				n(u, o, i, a, c, 'throw', e);
+			function c(t) {
+				e(o, i, a, s, c, 'throw', t);
 			}
-			a(void 0);
+			s(void 0);
 		});
 	};
 }
-export const styleLoader = () => ({
+export const n = () => ({
 	name: 'style-loader',
-	setup(n) {
-		n.onLoad({
+	setup(e) {
+		e.onLoad({
 			filter: /.*/,
 			namespace: 'less'
 		}, function() {
-			var n = e(function* (n) {});
-			return function(e) {
-				return n.apply(this, arguments);
+			var e = t(function* (e) {});
+			return function(t) {
+				return e.apply(this, arguments);
 			};
 		}());
 	}

```

## `swc/issues/7228/1`

- size: oxc 58 vs reference 76 (-18 bytes)

```js
export function f() {
	const foos = something.getFoos();
	return foos?.[0];
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-export function f() {
-	let foos = something.getFoos();
-	return foos?.[0];
+export function e() {
+	return something.getFoos()?.[0];
 }

```

## `swc/issues/9739`

- size: oxc 51 vs reference 69 (-18 bytes)

```js
const arr = ['a', 'b'];
[arr[0], arr[1]] = [arr[1], arr[0]];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-const arr = ['a', 'b'];
-[['a', 'b'][0], ['a', 'b'][1]] = ['b', 'a'];
+const e = ['a', 'b'];
+[e[0], e[1]] = [e[1], e[0]];

```

## `swc/issues/10876/3`

- size: oxc 161 vs reference 181 (-20 bytes)

```js
const createCounter = () => {
	let count = 0;
	return (numToAdd) => {
		count += numToAdd;
		return count;
	};
};
new class Bar {
	x = new class Foo {
		[createCounter()]() {
			console.log('Hello, world!');
		}
	}();
}();
export {};

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
-new class Bar {
-	x = new class Foo {
-		[(() => {
-			let count = 0;
-			return (numToAdd) => count += numToAdd;
-		})()]() {
+const e = () => {
+	let e = 0;
+	return (t) => (e += t, e);
+};
+new class {
+	x = new class {
+		[e()]() {
 			console.log('Hello, world!');
 		}
 	}();

```

## `swc/issues/11368`

- size: oxc 691 vs reference 711 (-20 bytes)

```js
/**
* SWC Compress Bug - Playground Reproduction
* ==========================================
*
*
* Steps:
* 1. Run the output → logs "BUG: expected A, got B"
* 2. Disable compress and run again → logs "OK: got A"
*
* Bug: When SWC's compress is enabled, a class property that calls
* a function which returns a closure will have that closure capture
* values from the LAST instance instead of its own.
*/
const wrap = (cb) => () => cb();
class Base {
	constructor(props) {
		this.props = props;
	}
}
class C extends Base {
	fn = wrap(this.props.cb);
}
// Test
const a = new C({ cb: () => 'A' });
const b = new C({ cb: () => 'B' });
const result = a.fn();
console.log(result === 'A' ? 'OK: got A' : 'BUG: expected A, got ' + result);

```

```diff
--- reference
+++ oxc
@@ -10,16 +10,18 @@
 * Bug: When SWC's compress is enabled, a class property that calls
 * a function which returns a closure will have that closure capture
 * values from the LAST instance instead of its own.
-*/ class Base {
-	constructor(props) {
-		this.props = props;
+*/
+const e = (e) => () => e();
+class t {
+	constructor(e) {
+		this.props = e;
 	}
 }
-class C extends Base {
-	fn = ((cb) => () => cb())(this.props.cb);
+class n extends t {
+	fn = e(this.props.cb);
 }
 // Test
-const a = new C({ cb: () => 'A' });
-new C({ cb: () => 'B' });
-const result = a.fn();
-console.log('A' === result ? 'OK: got A' : 'BUG: expected A, got ' + result);
+const r = new n({ cb: () => 'A' });
+new n({ cb: () => 'B' });
+const i = r.fn();
+console.log(i === 'A' ? 'OK: got A' : 'BUG: expected A, got ' + i);

```

## `swc/issues/11512-exhaustive/iife-default-used`

- size: oxc 75 vs reference 95 (-20 bytes)

```js
export function iifeDefaultUsed(value) {
	return (function(a, b = 1) {
		return b;
	})(value);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-export function iifeDefaultUsed(value) {
-	return function(a, b = 1) {
-		return b;
-	}(value);
+export function e(e) {
+	return (function(e, t = 1) {
+		return t;
+	})(e);
 }

```

## `swc/issues/2011/reduced`

- size: oxc 94 vs reference 114 (-20 bytes)

```js
class ClassA {}
module.exports = class ClassB {
	static MyA = ClassA;
	it() {
		this.bb = new ClassB.MyA();
	}
};

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-class ClassA {}
-module.exports = class ClassB {
-	static MyA = ClassA;
+class e {}
+module.exports = class t {
+	static MyA = e;
 	it() {
-		this.bb = new ClassB.MyA();
+		this.bb = new t.MyA();
 	}
 };

```

## `swc/issues/3173/1`

- size: oxc 69 vs reference 89 (-20 bytes)

```js
export const IndexPage = (value) => {
	if (value === 'loading') {
		return 1;
	} else if (value === 'error') {
		return 2;
	} else {
		return 3;
	}
	return 4;
};

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export const IndexPage = (value) => 'loading' === value ? 1 : 'error' === value ? 2 : 3;
+export const e = (e) => e === 'loading' ? 1 : e === 'error' ? 2 : 3;

```

## `swc/issues/5955`

- size: oxc 173 vs reference 193 (-20 bytes)

```js
export var foo;
export function init() {
	function bar() {
		foo = bar;
		console.log(111);
	}
	return bar;
}
function bar() {
	foo = bar;
	console.log(111);
}
export function init1() {
	return bar;
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,13 @@
-export var foo;
-export function init() {
-	return function bar() {
-		foo = bar, console.log(111);
-	};
+export var e;
+export function t() {
+	function t() {
+		e = t, console.log(111);
+	}
+	return t;
 }
-function bar() {
-	foo = bar, console.log(111);
+function n() {
+	e = n, console.log(111);
 }
-export function init1() {
-	return bar;
+export function r() {
+	return n;
 }

```

## `swc/issues/7739/1`

- size: oxc 181 vs reference 201 (-20 bytes)

```js
const formatterOpt = {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
};
if (withCurrency) {
	formatterOpt.style = 'currency';
}
const formatter = new Intl.NumberFormat('en', formatterOpt);
console.log(formatter.format(amount));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-const formatterOpt = {
+const e = {
 	minimumFractionDigits: 0,
 	maximumFractionDigits: 0
 };
-withCurrency && (formatterOpt.style = 'currency'), console.log(new Intl.NumberFormat('en', formatterOpt).format(amount));
+withCurrency && (e.style = 'currency');
+const t = new Intl.NumberFormat('en', e);
+console.log(t.format(amount));

```

## `swc/issues/9741_multiple_methods`

- size: oxc 212 vs reference 232 (-20 bytes)

```js
// Test multiple different methods being hoisted
const a = Object.assign({}, {});
const b = Object.assign({}, {});
const c = Object.keys({ a: 1 });
const d = Object.keys({ b: 2 });
const e = Array.isArray([]);
const f = Array.isArray({});
console.log(a, b, c, d, e, f);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 // Test multiple different methods being hoisted
-var _Array_isArray = Array.isArray, _Object_assign = Object.assign;
-console.log(_Object_assign({}, {}), _Object_assign({}, {}), ['a'], ['b'], _Array_isArray([]), _Array_isArray({}));
+const e = Object.assign({}, {}), t = Object.assign({}, {});
+console.log(e, t, Object.keys({ a: 1 }), Object.keys({ b: 2 }), Array.isArray([]), Array.isArray({}));

```

## `swc/issues/8284`

- size: oxc 636 vs reference 657 (-21 bytes)

```js
(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Sentry = {}));
})(this, function(exports) {
	'use strict';
	function isGlobalObj(obj) {
		return obj && obj.Math == Math ? obj : undefined;
	}
	const GLOBAL_OBJ = typeof globalThis == 'object' && isGlobalObj(globalThis) || isGlobalObj(globalThis) || typeof self == 'object' && isGlobalObj(self) || typeof global == 'object' && isGlobalObj(global) || (function() {
		return this;
	})() || {};
	function getGlobalObject() {
		return GLOBAL_OBJ;
	}
	const WINDOW$6 = getGlobalObject();
	function supportsFetch() {
		if (!('fetch' in WINDOW$6)) {
			return false;
		}
		return true;
	}
	console.log(supportsFetch());
});

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,19 @@
-var global1, factory;
-global1 = this, factory = function(exports1) {
-	function isGlobalObj(obj) {
-		return obj && obj.Math == Math ? obj : void 0;
-	}
+(function(e, t) {
+	typeof exports == 'object' && typeof module < 'u' ? t(exports) : typeof define == 'function' && define.amd ? define(['exports'], t) : (e = typeof globalThis < 'u' ? globalThis : e || self, t(e.Sentry = {}));
+})(this, function(e) {
 	'use strict';
-	console.log('fetch' in ('object' == typeof globalThis && isGlobalObj(globalThis) || isGlobalObj(globalThis) || 'object' == typeof self && isGlobalObj(self) || 'object' == typeof global && isGlobalObj(global) || function() {
+	function t(e) {
+		return e && e.Math == Math ? e : void 0;
+	}
+	let n = typeof globalThis == 'object' && t(globalThis) || t(globalThis) || typeof self == 'object' && t(self) || typeof global == 'object' && t(global) || (function() {
 		return this;
-	}() || {}));
-}, 'object' == typeof exports && 'u' > typeof module ? factory(exports) : 'function' == typeof define && define.amd ? define(['exports'], factory) : factory((global1 = 'u' > typeof globalThis ? globalThis : global1 || self).Sentry = {});
+	})() || {};
+	function r() {
+		return n;
+	}
+	let i = r();
+	function a() {
+		return 'fetch' in i;
+	}
+	console.log(a());
+});

```

## `swc/issues/9619`

- size: oxc 25 vs reference 46 (-21 bytes)

```js
var a = (() => {
	switch ('production') {
		case 'production': return 'expected';
		default: return 'unexpected1';
	}
	switch ('production') {
		case 'production': return 'unexpected2';
		default: return 'unexpected3';
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = (() => 'expected')();
-console.log(a);
+console.log('expected');

```

## `swc/next/46887-2`

- size: oxc 1074 vs reference 1095 (-21 bytes)

```js
var Za = {
	set: Qi,
	get: Qg,
	enforce: function(e1) {
		return Ri(e1) ? Qg(e1) : Qi(e1, {});
	},
	getterFor: function(e1) {
		return function(t) {
			var n;
			if (!ha(t) || (n = Qg(t)).type !== e1) throw TypeError('Incompatible receiver, ' + e1 + ' required');
			return n;
		};
	}
};
export function exposed() {
	try {
		var a = eval('quire'.replace(/^/, 're'))(c);
		if (a && (a.length || Object.keys(a).length)) return a;
	} catch (e1) {}
	return null;
}
export default (function(e) {
	var t = Za.get, n = Za.enforce, r = String(String).split('String');
	(e.exports = function(e, t, i, o) {
		var a = !!o && !!o.unsafe, s = !!o && !!o.enumerable;
		if (o = !!o && !!o.noTargetGet, 'function' == typeof i) {
			'string' != typeof t || Q(i, 'name') || Na(i, 'name', t);
			var u = n(i);
			u.source || (u.source = r.join('string' == typeof t ? t : ''));
		}
		e === y ? s ? e[t] = i : Oi(t, i) : (a ? !o && e[t] && (s = !0) : delete e[t], s ? e[t] = i : Na(e, t, i));
	})(Function.prototype, 'toString', (function() {
		return 'function' == typeof this && t(this).source || Pi(this);
	}));
});

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
 var Za = {
 	set: Qi,
 	get: Qg,
-	enforce: function(e1) {
-		return Ri(e1) ? Qg(e1) : Qi(e1, {});
+	enforce: function(e) {
+		return Ri(e) ? Qg(e) : Qi(e, {});
 	},
-	getterFor: function(e1) {
+	getterFor: function(e) {
 		return function(t) {
 			var n;
-			if (!ha(t) || (n = Qg(t)).type !== e1) throw TypeError('Incompatible receiver, ' + e1 + ' required');
+			if (!ha(t) || (n = Qg(t)).type !== e) throw TypeError('Incompatible receiver, ' + e + ' required');
 			return n;
 		};
 	}
@@ -16,21 +16,20 @@
 	try {
 		var a = eval('quire'.replace(/^/, 're'))(c);
 		if (a && (a.length || Object.keys(a).length)) return a;
-	} catch (e1) {}
+	} catch {}
 	return null;
 }
-export default function(e) {
+export default (function(e) {
 	var t = Za.get, n = Za.enforce, r = String(String).split('String');
 	(e.exports = function(e, t, i, o) {
-		var a = !!o && !!o.unsafe, s = !!o && !!o.enumerable;
-		if (o = !!o && !!o.noTargetGet, 'function' == typeof i) {
-			'string' != typeof t || Q(i, 'name') || Na(i, 'name', t);
+		var s = !!o && !!o.unsafe, l = !!o && !!o.enumerable;
+		if (o = !!o && !!o.noTargetGet, typeof i == 'function') {
+			typeof t != 'string' || Q(i, 'name') || Na(i, 'name', t);
 			var u = n(i);
-			u.source || (u.source = r.join('string' == typeof t ? t : ''));
+			u.source ||= r.join(typeof t == 'string' ? t : '');
 		}
-		e === y ? s ? e[t] = i : Oi(t, i) : (a ? !o && e[t] && (s = !0) : delete e[t], s ? e[t] = i : Na(e, t, i));
-	})(Function.prototype, 'toString', function() {
-		return 'function' == typeof this && t(this).s
... [truncated]
```

## `swc/check/1`

- size: oxc 251 vs reference 273 (-22 bytes)

```js
import { upper } from 'module';
let foobar = 'foo';
export const foo = foobar;
const bar = 'bar';
foobar += bar;
let foobarCopy = foobar;
foobar += 'foo';
console.log(foobarCopy);
foobarCopy += 'Unused';
function internal() {
	return upper(foobar);
}
// export function external1() {
//     return internal() + foobar;
// }
// export function external2() {
//     foobar += ".";
// }

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 import 'module';
-let foobar = 'foo';
-export const foo = foobar;
-let foobarCopy = foobar += 'bar';
-foobar += 'foo', console.log(foobarCopy);
+let e = 'foo';
+export const t = e;
+e += 'bar';
+let n = e;
+e += 'foo', console.log(n), n += 'Unused';
 // export function external1() {
 //     return internal() + foobar;
 // }

```

## `swc/issues/10250`

- size: oxc 91 vs reference 113 (-22 bytes)

```js
export function example(value) {
	if (value === undefined) {
		return undefined;
	}
	if (someConditional()) {
		return value;
	}
	return doSomething(value);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-export function example(value) {
-	if (void 0 !== value) return someConditional() ? value : doSomething(value);
+export function e(e) {
+	if (e !== void 0) return someConditional() ? e : doSomething(e);
 }

```

## `swc/issues/5306/1`

- size: oxc 68 vs reference 90 (-22 bytes)

```js
const array = [
	1,
	2,
	3
];
const values = [...array];
array.length = 0;
console.log(values);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-const array = [
+const e = [
 	1,
 	2,
 	3
-], values = [...array];
-array.length = 0, console.log(values);
+], t = [...e];
+e.length = 0, console.log(t);

```

## `swc/issues/7591`

- size: oxc 71 vs reference 93 (-22 bytes)

```js
var x = someFunction;
function someFunction() {
	return 2;
}
console.log(x);
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-function someFunction() {
+var e = t;
+function t() {
 	return 2;
 }
-console.log(someFunction), console.log(someFunction);
+console.log(e), console.log(e);

```

## `swc/next/36127/2/1`

- size: oxc 402 vs reference 424 (-22 bytes)

```js
/**
* Create a code check from a regex.
*
* @param {RegExp} regex
* @returns {(code: Code) => code is number}
*/
export function regexCheck(regex) {
	return check;
	/**
	* Check whether a code matches the bound regex.
	*
	* @param {Code} code Character code
	* @returns {code is number} Whether the character code matches the bound regex
	*/
	function check(code) {
		return code !== null && regex.test(String.fromCharCode(code));
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,13 +3,16 @@
 *
 * @param {RegExp} regex
 * @returns {(code: Code) => code is number}
-*/ export function regexCheck(regex) {
-	return (/**
+*/
+export function e(e) {
+	return t;
+	/**
 	* Check whether a code matches the bound regex.
 	*
 	* @param {Code} code Character code
 	* @returns {code is number} Whether the character code matches the bound regex
-	*/ function(code) {
-		return null !== code && regex.test(String.fromCharCode(code));
-	});
+	*/
+	function t(t) {
+		return t !== null && e.test(String.fromCharCode(t));
+	}
 }

```

## `swc/pr/11381`

- size: oxc 181 vs reference 203 (-22 bytes)

```js
class A {
	constructor(options) {
		console.log(options);
	}
}
export class B extends A {
	constructor(options) {
		let { a } = options;
		a = a || 'test';
		let b = [a];
		super({
			a,
			b
		});
	}
}
new B({});

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,15 @@
-class A {
-	constructor(options) {
-		console.log(options);
+class e {
+	constructor(e) {
+		console.log(e);
 	}
 }
-export class B extends A {
-	constructor(options) {
-		let { a } = options, b = [a = a || 'test'];
-		super({
-			a,
-			b
+export class t extends e {
+	constructor(e) {
+		let { a: t } = e;
+		t ||= 'test', super({
+			a: t,
+			b: [t]
 		});
 	}
 }
-new B({});
+new t({});

```

## `swc/issues/11512-exhaustive/iife-default-ref-prev`

- size: oxc 75 vs reference 98 (-23 bytes)

```js
export function iifeDefaultRefPrev(value) {
	return (function(a, b = a) {
		return a;
	})(value);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-export function iifeDefaultRefPrev(value) {
-	return function(a, b = a) {
-		return a;
-	}(value);
+export function e(e) {
+	return (function(e, t = e) {
+		return e;
+	})(e);
 }

```

## `swc/projects/mootools/1`

- size: oxc 8 vs reference 31 (-23 bytes)

```js
var isType = object != Object;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var isType = object != Object;
+object;

```

## `swc/simple/inline/6`

- size: oxc 325 vs reference 348 (-23 bytes)

```js
export function endOf(units) {
	var time, dividend, dividend1;
	switch (this._isUTC, units) {
		case 'hour':
			time = v(), time += 36e5 - (dividend = time + 36e5, (dividend % 36e5 + 36e5) % 36e5) - 1;
			break;
		case 'minute':
			time = v(), time += 6e4 - (dividend1 = time, (dividend1 % 6e4 + 6e4) % 6e4) - 1;
			break;
		case 'second': time = v(), time += 1e3 - (time % 1e3 + 1e3) % 1e3 - 1;
	}
	return time;
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
-export function endOf(units) {
-	var time;
-	switch (this._isUTC, units) {
+export function e(e) {
+	var t, n, r;
+	switch (this._isUTC, e) {
 		case 'hour':
-			time = v(), time += 36e5 - ((time + 36e5) % 36e5 + 36e5) % 36e5 - 1;
+			t = v(), t += 36e5 - (n = t + 36e5, (n % 36e5 + 36e5) % 36e5) - 1;
 			break;
 		case 'minute':
-			time = v(), time += 6e4 - (time % 6e4 + 6e4) % 6e4 - 1;
+			t = v(), t += 6e4 - (r = t, (r % 6e4 + 6e4) % 6e4) - 1;
 			break;
-		case 'second': time = v(), time += 1e3 - (time % 1e3 + 1e3) % 1e3 - 1;
+		case 'second': t = v(), t += 1e3 - (t % 1e3 + 1e3) % 1e3 - 1;
 	}
-	return time;
+	return t;
 }

```

## `swc/issues/9610-nested-defaults`

- size: oxc 522 vs reference 546 (-24 bytes)

```js
// Test: Nested default patterns
// Nested object destructuring with default
function foo({ outer: { inner = 10 } }) {
	return inner;
}
// Nested object with default for entire nested part
function bar({ outer = { inner: 20 } }) {
	return outer.inner;
}
// Default with another default inside object
function baz({ a = { b: 30 } }) {
	return a.b;
}
// Array inside object with default
function qux({ arr: [first, second = 40] }) {
	return first;
}
export function example() {
	return foo({ outer: { inner: 1 } }) + bar({}) + baz({}) + qux({ arr: [5] });
}

```

```diff
--- reference
+++ oxc
@@ -1,20 +1,20 @@
 // Test: Nested default patterns
 // Nested object destructuring with default
-function foo({ outer: { inner = 10 } }) {
-	return inner;
+function e({ outer: { inner: e = 10 } }) {
+	return e;
 }
 // Nested object with default for entire nested part
-function bar({ outer = { inner: 20 } }) {
-	return outer.inner;
+function t({ outer: e = { inner: 20 } }) {
+	return e.inner;
 }
 // Default with another default inside object
-function baz({ a = { b: 30 } }) {
-	return a.b;
+function n({ a: e = { b: 30 } }) {
+	return e.b;
 }
 // Array inside object with default
-function qux({ arr: [first, ,] }) {
-	return first;
+function r({ arr: [e, t = 40] }) {
+	return e;
 }
-export function example() {
-	return foo({ outer: { inner: 1 } }) + bar({}) + baz({}) + qux({ arr: [5] });
+export function i() {
+	return e({ outer: { inner: 1 } }) + t({}) + n({}) + r({ arr: [5] });
 }

```

## `swc/issues/6422/2`

- size: oxc 108 vs reference 133 (-25 bytes)

```js
import assert from 'assert';
let result = 'FAIL';
const unused = { ...{ get prop() {
	result = 'PASS';
} } };
assert.strictEqual(result, 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-import assert from 'assert';
-let result = 'FAIL';
+import e from 'assert';
+let t = 'FAIL';
 ({ ...{ get prop() {
-	result = 'PASS';
-} } });
-assert.strictEqual(result, 'PASS');
+	t = 'PASS';
+} } }), e.strictEqual(t, 'PASS');

```

## `swc/simple/if/block/1`

- size: oxc 52 vs reference 77 (-25 bytes)

```js
if (a) {
	var _ = console.log('foo');
	if (b) {
		var _2 = console.log('bar');
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-if (a) {
-	var _ = console.log('foo');
-	if (b) var _2 = console.log('bar');
-}
+a && (console.log('foo'), b && console.log('bar'));

```

## `swc/issues/2614/1`

- size: oxc 51 vs reference 77 (-26 bytes)

```js
expose(() => export_default);
var foo = require('70jDX');
var Value;
Value = foo.default;
var export_default = Value;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-expose(() => export_default);
-var export_default = require('70jDX').default;
+expose(() => e);
+var e = require('70jDX').default;

```

## `swc/issues/6837/2`

- size: oxc 208 vs reference 234 (-26 bytes)

```js
export class Class2 extends Class1 {
	constructor() {
		this.method1 = async () => {
			let var1;
			const function1 = () => {};
			var1 = await Class2.method2();
			await function1().then(() => {
				console.log(var1);
			});
		};
	}
	static async method2() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
-export class Class2 extends Class1 {
+export class e extends Class1 {
 	constructor() {
 		this.method1 = async () => {
-			let var1;
-			var1 = await Class2.method2();
-			await (() => {})().then(() => {
-				console.log(var1);
+			let t;
+			t = await e.method2(), await (void 0).then(() => {
+				console.log(t);
 			});
 		};
 	}

```

## `swc/issues/string-from-char-code-uint16`

- size: oxc 121 vs reference 147 (-26 bytes)

```js
console.log([
	String.fromCharCode(65.9),
	String.fromCharCode(-1),
	String.fromCharCode(-65535.9),
	String.fromCharCode(65536),
	String.fromCharCode(65537),
	String.fromCharCode(NaN),
	String.fromCharCode(Infinity),
	String.fromCharCode(-Infinity),
	String.fromCharCode(4294967361),
	String.fromCharCode(-4294967231)
].map((value) => value.charCodeAt(0)).join(','));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log([
 	'A',
-	String.fromCharCode(-1),
+	'￿',
 	'',
 	'\0',
 	'',
@@ -9,4 +9,4 @@
 	'\0',
 	'A',
 	'A'
-].map((value) => value.charCodeAt(0)).join(','));
+].map((e) => e.charCodeAt(0)).join(','));

```

## `swc/issues/vercel/001`

- size: oxc 0 vs reference 26 (-26 bytes)

```js
const re = new RegExp('^/(?!_next).*$');

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-RegExp('^/(?!_next).*$');

```

## `swc/issues/8161`

- size: oxc 98 vs reference 125 (-27 bytes)

```js
function run(flag, output = 'a output') {
	if (flag === 'b') {
		output = 'b output';
	}
	console.log(output);
}
run('a');
run('b');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function run(flag, output = 'a output') {
-	'b' === flag && (output = 'b output'), console.log(output);
+function e(e, t = 'a output') {
+	e === 'b' && (t = 'b output'), console.log(t);
 }
-run('a'), run('b');
+e('a'), e('b');

```

## `swc/issues/9741_collision_function`

- size: oxc 112 vs reference 139 (-27 bytes)

```js
function _Object_assign(a, b) {
	console.log(this, Math.exp(a, b));
}
;
_Object_assign(4, 2);
const a = {};
Object.assign(a, {});
const b = {};
Object.assign(b, {});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var _Object_assign = Object.assign;
-!function() {
-	console.log(this, Math.exp(4, 2));
-}(), _Object_assign({}, {}), _Object_assign({}, {});
+function e(e, t) {
+	console.log(this, Math.exp(e, t));
+}
+e(4, 2), Object.assign({}, {}), Object.assign({}, {});

```

## `swc/issues/11512-exhaustive/iife-default-reassigned`

- size: oxc 82 vs reference 110 (-28 bytes)

```js
export function iifeDefaultReassigned(value) {
	return (function(a, b = 1) {
		b = 2;
		return a;
	})(value);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-export function iifeDefaultReassigned(value) {
-	return function(a, b = 1) {
-		b = 2;
-		return a;
-	}(value);
+export function e(e) {
+	return (function(e, t = 1) {
+		return t = 2, e;
+	})(e);
 }

```

## `swc/issues/11684/preserved`

- size: oxc 1262 vs reference 1290 (-28 bytes)

```js
out.fnArguments = new (function() {
	this.count = arguments.length;
})(1, 2, 3);
out.fnLexicalArguments = new (function() {
	this.count = (() => arguments.length)();
})(1, 2, 3);
out.fnDefaultArguments = new (function(value = arguments[1]) {
	this.value = value;
})(undefined, 'fallback', 'extra');
out.fnEval = new (function() {
	eval('this.count = arguments.length');
})(1, 2, 3);
out.fnRest = new (function(...values) {
	this.count = values.length;
})(1, 2, 3);
out.fnSpread = new (function() {
	this.kind = 'spread';
})(...values, 1);
out.classArguments = new class {
	constructor() {
		this.count = arguments.length;
	}
}(1, 2, 3);
out.classLexicalArguments = new class {
	constructor() {
		this.count = (() => arguments.length)();
	}
}(1, 2, 3);
out.classDefaultArguments = new class {
	constructor(value = arguments[1]) {
		this.value = value;
	}
}(undefined, 'fallback', 'extra');
out.classEval = new class {
	constructor() {
		eval('this.count = arguments.length');
	}
}(1, 2, 3);
out.classRest = new class {
	constructor(...values) {
		this.count = values.length;
	}
}(1, 2, 3);
out.classSpread = new class {
	constructor() {
		this.kind = 'spread';
	}
}(...values, 1);
out.defaultClass = new class {}(1, 2, 3);
out.defaultDerivedClass = new class extends Base {}(1, 2, 3);
out.unknown = new Constructor(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,16 @@
-out.fnArguments = new function() {
+out.fnArguments = new (function() {
 	this.count = arguments.length;
-}(1, 2, 3), out.fnLexicalArguments = new function() {
+})(1, 2, 3), out.fnLexicalArguments = new (function() {
 	this.count = arguments.length;
-}(1, 2, 3), out.fnDefaultArguments = new function(value = arguments[1]) {
-	this.value = value;
-}(void 0, 'fallback', 'extra'), out.fnEval = new function() {
+})(1, 2, 3), out.fnDefaultArguments = new (function(e = arguments[1]) {
+	this.value = e;
+})(void 0, 'fallback', 'extra'), out.fnEval = new (function() {
 	eval('this.count = arguments.length');
-}(1, 2, 3), out.fnRest = new function(...values1) {
-	this.count = values1.length;
-}(1, 2, 3), out.fnSpread = new function() {
+})(1, 2, 3), out.fnRest = new (function(...e) {
+	this.count = e.length;
+})(1, 2, 3), out.fnSpread = new (function() {
 	this.kind = 'spread';
-}(...values, 1), out.classArguments = new class {
+})(...values, 1), out.classArguments = new class {
 	constructor() {
 		this.count = arguments.length;
 	}
@@ -19,16 +19,16 @@
 		this.count = arguments.length;
 	}
 }(1, 2, 3), out.classDefaultArguments = new class {
-	constructor(value = arguments[1]) {
-		this.value = value;
+	constructor(e = arguments[1]) {
+		this.value = e;
 	}
 }(void 0, 'fallback', 'extra'), out.classEval = new class {
 	constructor() {
 		eval('this.count = arguments.length');
 	}
 }(1, 2, 3), out.classRest = new class {
-	constructor(...values1) {
-		this.count = values1.length;
+	constructor(...e) {
+		this.count = e.length;
 	}
 }(1, 2, 3),
... [truncated]
```

## `swc/issues/lit_comparisons`

- size: oxc 39 vs reference 68 (-29 bytes)

```js
const a = 3;
const b = 4;
const c = '3';
const d = '4';
const e = {};
const f = {};
const g = true;
const h = false;
const j = null;
console.log(a === b, c === d, e === f, g === h, h === j);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-const h = false;
-console.log(false, false, {} == {}, false, false);
+console.log(!1, !1, {} == {}, !1, !1);

```

## `swc/issues/11512-exhaustive/fn-multi-use-default-unused`

- size: oxc 86 vs reference 117 (-31 bytes)

```js
function id(a, b = 1) {
	return a;
}
export function fnMultiUseDefaultUnused(value) {
	return id(value) + id(value + 1);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-function id(a, b = 1) {
-	return a;
+function e(e, t = 1) {
+	return e;
 }
-export function fnMultiUseDefaultUnused(value) {
-	return value + (value + 1);
+export function t(t) {
+	return e(t) + e(t + 1);
 }

```

## `swc/issues/11512-exhaustive/iife-anon-first-default-unused`

- size: oxc 83 vs reference 114 (-31 bytes)

```js
export function iifeAnonFirstDefaultUnused(value) {
	return (function(a = 1, b) {
		return b;
	})(undefined, value);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-export function iifeAnonFirstDefaultUnused(value) {
-	return function(a = 1, b) {
-		return b;
-	}(void 0, value);
+export function e(e) {
+	return (function(e = 1, t) {
+		return t;
+	})(void 0, e);
 }

```

## `swc/issues/2262/1`

- size: oxc 19 vs reference 50 (-31 bytes)

```js
(() => {
	'use strict';
	var commonjsGlobal = globalThis;
	function createEventEmitter(value) {}
	var index = somethingGlobal;
	const esm = index;
	esm();
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-(() => {
-	'use strict';
-	somethingGlobal();
-})();
+somethingGlobal();

```

## `swc/issues/4515`

- size: oxc 80 vs reference 111 (-31 bytes)

```js
B.c = { get foo() {
	for (var a = 1; a < 10; a++) {}
} };
var getChildNodes$1;
export function setGetChildNodes(getChildNodesImpl) {
	getChildNodes$1 = getChildNodesImpl;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 B.c = { get foo() {
-	for (var a = 1; a < 10; a++);
+	for (var e = 1; e < 10; e++);
 } };
-export function setGetChildNodes(getChildNodesImpl) {}
+export function e(e) {}

```

## `swc/issues/6636`

- size: oxc 92 vs reference 123 (-31 bytes)

```js
export function memo(fn, opts) {
	let result;
	return () => {
		result = fn(...newDeps);
		opts?.onChange?.(result);
		return result;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-export function memo(fn, opts) {
-	let result;
-	return () => (result = fn(...newDeps), opts?.onChange?.(result), result);
+export function e(e, t) {
+	let n;
+	return () => (n = e(...newDeps), t?.onChange?.(n), n);
 }

```

## `swc/issues/9823/1-class`

- size: oxc 23 vs reference 54 (-31 bytes)

```js
(() => {
	'use strict';
	class Element {}
	class PointElement extends Element {
		static id = 'point';
		constructor(cfg) {
			super();
		}
	}
	// var chart_elements = /*#__PURE__*/ Object.freeze({
	// PointElement: PointElement
	// });
	var chart_elements = null && Object.freeze({ PointElement });
	const registerables = null && [chart_elements, chart_plugins];
	console.log('Done 1');
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-(() => {
-	'use strict';
-	console.log('Done 1');
-})();
+console.log('Done 1');

```

## `swc/issues/9823/2-class-extends`

- size: oxc 23 vs reference 54 (-31 bytes)

```js
(() => {
	'use strict';
	class Element {}
	// var chart_elements = /*#__PURE__*/ Object.freeze({
	// PointElement: PointElement
	// });
	var chart_elements = null && Object.freeze({ Element });
	const registerables = null && [chart_elements, chart_plugins];
	console.log('Done 2');
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-(() => {
-	'use strict';
-	console.log('Done 2');
-})();
+console.log('Done 2');

```

## `swc/issues/vercel/002`

- size: oxc 92 vs reference 123 (-31 bytes)

```js
const globalStyles = new String(':root {--a-b:4px}');
globalStyles.__hash = '34c3f159e306f9e9';
export default globalStyles;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-let globalStyles = new String(':root {--a-b:4px}');
-globalStyles.__hash = '34c3f159e306f9e9';
-export default globalStyles;
+const e = new String(':root {--a-b:4px}');
+e.__hash = '34c3f159e306f9e9';
+export default e;

```

## `swc/next/43052`

- size: oxc 930 vs reference 961 (-31 bytes)

```js
use((function(__unused_webpack_module, exports, __webpack_require__) {
	!function(e, t) {
		true ? t(exports, __webpack_require__(7294), __webpack_require__(1321)) : 0;
	}(this, (function(exports, React) {
		'use strict';
		var index_production = { exports: {} };
		(function(module, exports) {
			var t;
			t = function(exports) {
				function inquire(moduleName) {
					try {
						var mod = eval('quire'.replace(/^/, 're'))(moduleName);
						if (mod && (mod.length || Object.keys(mod).length)) return mod;
					} catch (e) {}
					return null;
				}
				Object.defineProperty(exports, '__esModule', { value: !0 });
			}, t(exports);
		})(index_production, index_production.exports);
		exports.chunkBlocks = index_production.exports.chunkBlocks, exports.encodeDirectory = index_production.exports.encodeDirectory, exports.encodeFile = index_production.exports.encodeFile, Object.defineProperty(exports, '__esModule', { value: !0 });
	}));
}));
(function checkMangler() {
	const longName = 1;
	use(longName);
});

```

```diff
--- reference
+++ oxc
@@ -1,25 +1,22 @@
-use(function(__unused_webpack_module, exports, __webpack_require__) {
-	!function(e, t) {
-		t(exports, __webpack_require__(7294), __webpack_require__(1321));
-	}(this, function(exports, React) {
+use((function(__unused_webpack_module, exports, __webpack_require__) {
+	(function(e, n) {
+		n(exports, __webpack_require__(7294), __webpack_require__(1321));
+	})(this, (function(exports, React) {
 		'use strict';
 		var index_production = { exports: {} };
 		(function(module, exports) {
-			var t;
-			t = function(exports) {
+			var t = function(exports) {
 				function inquire(moduleName) {
 					try {
 						var mod = eval('quire'.replace(/^/, 're'))(moduleName);
 						if (mod && (mod.length || Object.keys(mod).length)) return mod;
-					} catch (e) {}
+					} catch {}
 					return null;
 				}
 				Object.defineProperty(exports, '__esModule', { value: !0 });
-			}, t(exports);
+			};
+			t(exports);
 		})(index_production, index_production.exports);
 		exports.chunkBlocks = index_production.exports.chunkBlocks, exports.encodeDirectory = index_production.exports.encodeDirectory, exports.encodeFile = index_production.exports.encodeFile, Object.defineProperty(exports, '__esModule', { value: !0 });
-	});
-});
-(function e() {
-	use(1);
-});
+	}));
+}));

```

## `swc/issues/11645/spread-argument-preserved`

- size: oxc 8 vs reference 41 (-33 bytes)

```js
function f(a) {
	return a;
}
f(1, ...0);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-function f(a) {
-	return a;
-}
-f(1, ...0);
+[...0];

```

## `swc/issues/12128`

- size: oxc 136 vs reference 169 (-33 bytes)

```js
var callback;
var _loop = function() {
	var value = callback;
	return value ? 'break' : callback = function() {
		return value;
	};
};
for (; _loop() !== 'break';);
console.log(callback());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-for (var callback; 'break' !== function() {
-	var value = callback;
-	return value ? 'break' : callback = function() {
-		return value;
+for (var e, t = function() {
+	var t = e;
+	return t ? 'break' : e = function() {
+		return t;
 	};
-}(););
-console.log(callback());
+}; t() !== 'break';);
+console.log(e());

```

## `swc/issues/6141`

- size: oxc 126 vs reference 159 (-33 bytes)

```js
(function foo(obj) {
	if (obj) {
		for (const key in obj) {
			const element = obj[key];
			if (element && foo(element.children)) {}
		}
		return true;
	}
	return false;
})();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-!function foo(obj) {
-	if (obj) {
-		for (let key in obj) {
-			let element = obj[key];
-			element && foo(element.children);
+(function e(t) {
+	if (t) {
+		for (let n in t) {
+			let r = t[n];
+			r && e(r.children);
 		}
 		return !0;
 	}
 	return !1;
-}();
+})();

```

## `swc/issues/pure-callee-call`

- size: oxc 176 vs reference 210 (-34 bytes)

```js
function identity(value) {
	return value;
}
let count = 0;
function invoke() {
	count += 1;
}
identity(invoke)();
(identity?.(invoke))();
function Factory() {
	return invoke;
}
new Factory()();
function tag() {
	return invoke;
}
tag``();
console.log(count);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,16 @@
-let count = 0;
-function invoke() {
-	count += 1;
+function e(e) {
+	return e;
 }
-invoke(), ((function(value) {
-	return value;
-})?.(invoke))(), new function() {
-	return invoke;
-}()(), (function() {
-	return invoke;
-})``(), console.log(count);
+let t = 0;
+function n() {
+	t += 1;
+}
+e(n)(), (e?.(n))();
+function r() {
+	return n;
+}
+new r()();
+function i() {
+	return n;
+}
+i``(), console.log(t);

```

## `swc/issues/11512-exhaustive/fn-multi-use-default-side-effect`

- size: oxc 132 vs reference 167 (-35 bytes)

```js
let sideCalls = 0;
function side() {
	sideCalls++;
	return 1;
}
function keep(a, b = side()) {
	return a;
}
export function fnMultiUseDefaultSideEffect(value) {
	return keep(value) + keep(value + 1);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
-let sideCalls = 0;
-function keep(a, b = (sideCalls++, 1)) {
-	return a;
+let e = 0;
+function t() {
+	return e++, 1;
+}
+function n(e, n = t()) {
+	return e;
 }
-export function fnMultiUseDefaultSideEffect(value) {
-	return keep(value) + keep(value + 1);
+export function r(e) {
+	return n(e) + n(e + 1);
 }

```

## `swc/issues/11512-exhaustive/iife-named-default-length`

- size: oxc 96 vs reference 131 (-35 bytes)

```js
export function iifeNamedDefaultLength(value) {
	return (function named(a = 1, b) {
		return named.length + b;
	})(undefined, value);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-export function iifeNamedDefaultLength(value) {
-	return function named(a = 1, b) {
-		return named.length + b;
-	}(void 0, value);
+export function e(e) {
+	return (function e(t = 1, n) {
+		return e.length + n;
+	})(void 0, e);
 }

```

## `swc/issues/7839/1`

- size: oxc 92 vs reference 128 (-36 bytes)

```js
export function createCaseFirst(g, methodName) {
	var chr = g.get(0);
	console.log(123);
	return chr[methodName]() + trailing;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-export function createCaseFirst(g, methodName) {
-	var chr = g.get(0);
-	return console.log(123), chr[methodName]() + trailing;
+export function e(e, t) {
+	var n = e.get(0);
+	return console.log(123), n[t]() + trailing;
 }

```

## `swc/simple/order/fn/1`

- size: oxc 20 vs reference 56 (-36 bytes)

```js
function foo() {}
console.log('foo');
function bar() {}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-function foo() {}
-function bar() {}
 console.log('foo');

```

## `swc/issues/9030`

- size: oxc 241 vs reference 278 (-37 bytes)

```js
var FRUITS = { MANGO: 'mango' };
var getMangoLabel = (label) => label[FRUITS.MANGO];
export default (name) => {
	// Breaks with switch case
	switch (name) {
		case FRUITS.MANGO: {
			return getMangoLabel;
		}
	}
	// Works with if else
	// if (name === FRUITS.MANGO) {
	//     return getMangoLabel;
	// }
};

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
-var FRUITS_MANGO = 'mango', getMangoLabel = (label) => label[FRUITS_MANGO];
-export default ((name) => {
+var e = { MANGO: 'mango' }, t = (t) => t[e.MANGO];
+export default (n) => {
 	// Breaks with switch case
-	if (name === FRUITS_MANGO) return getMangoLabel;
+	switch (n) {
+		case e.MANGO: return t;
+	}
 	// Works with if else
 	// if (name === FRUITS.MANGO) {
 	//     return getMangoLabel;
 	// }
-});
+};

```

## `swc/issues/11512-exhaustive/fn-multi-use-default-used`

- size: oxc 90 vs reference 128 (-38 bytes)

```js
function add(a, b = 1) {
	return a + b;
}
export function fnMultiUseDefaultUsed(value) {
	return add(value) + add(value + 1);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-function add(a, b = 1) {
-	return a + b;
+function e(e, t = 1) {
+	return e + t;
 }
-export function fnMultiUseDefaultUsed(value) {
-	return add(value) + add(value + 1);
+export function t(t) {
+	return e(t) + e(t + 1);
 }

```

## `swc/issues/7500`

- size: oxc 104 vs reference 142 (-38 bytes)

```js
var globalArray = [
	1,
	1,
	1
];
module.exports = function() {
	var localArray = globalArray;
	localArray[0] = localArray[1] = localArray[2] = 0;
	return localArray;
};

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-var globalArray = [
+var e = [
 	1,
 	1,
 	1
 ];
 module.exports = function() {
-	return globalArray[0] = globalArray[1] = globalArray[2] = 0, globalArray;
+	var t = e;
+	return t[0] = t[1] = t[2] = 0, t;
 };

```

## `swc/issues/next-97517`

- size: oxc 183 vs reference 221 (-38 bytes)

```js
module.exports = [50708, (context) => {
	'use strict';
	var join, run;
	join = (left, right) => left + right, run = (rows) => {
		rows.map((row) => join(row.g, row.r));
		return rows.map((row) => (item) => join(row.g, item.l));
	};
	context.s([
		'run',
		0,
		run
	], 42519);
}];

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,9 @@
-module.exports = [50708, (r) => {
+module.exports = [50708, (e) => {
 	'use strict';
-	r.s([
+	var t = (e, t) => e + t;
+	e.s([
 		'run',
 		0,
-		(r) => (r.map((r) => {
-			let e;
-			return e = r.g, e + r.r;
-		}), r.map((r) => (e) => {
-			let t;
-			return t = r.g, t + e.l;
-		}))
+		(e) => (e.map((e) => t(e.g, e.r)), e.map((e) => (n) => t(e.g, n.l)))
 	], 42519);
 }];

```

## `swc/issues/9741`

- size: oxc 93 vs reference 132 (-39 bytes)

```js
const a = {};
Object.assign(a, {});
const b = {};
Object.assign(b, {});
Object.assign(b, a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var _Object_assign = Object.assign;
-const a = {};
-_Object_assign(a, {});
-const b = {};
-_Object_assign(b, {}), _Object_assign(b, a);
+const e = {};
+Object.assign(e, {});
+const t = {};
+Object.assign(t, {}), Object.assign(t, e);

```

## `swc/issues/9741_collision`

- size: oxc 93 vs reference 132 (-39 bytes)

```js
const _Object_assign = [];
const a = {};
Object.assign(a, {});
const b = {};
Object.assign(b, {});
Object.assign(b, a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var _Object_assign = Object.assign;
-const a = {};
-_Object_assign(a, {});
-const b = {};
-_Object_assign(b, {}), _Object_assign(b, a);
+const e = {};
+Object.assign(e, {});
+const t = {};
+Object.assign(t, {}), Object.assign(t, e);

```

## `swc/issues/11512-exhaustive/fn-multi-use-rest`

- size: oxc 109 vs reference 149 (-40 bytes)

```js
function keep(a, b = 1, ...rest) {
	return a + rest.length;
}
export function fnMultiUseRest(value) {
	return keep(value) + keep(value + 1, 2, 3);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-function keep(a, b = 1, ...rest) {
-	return a + rest.length;
+function e(e, t = 1, ...n) {
+	return e + n.length;
 }
-export function fnMultiUseRest(value) {
-	return keep(value) + keep(value + 1, 2, 3);
+export function t(t) {
+	return e(t) + e(t + 1, 2, 3);
 }

```

## `swc/reduced/1`

- size: oxc 297 vs reference 337 (-40 bytes)

```js
var A, B, A1;
!(function(A2) {
	var Point;
	(A2.Point || (A2.Point = {})).Origin = {
		x: 0,
		y: 0
	};
})(A || (A = {})), (A1 = A || (A = {})).Point = function() {
	return {
		x: 0,
		y: 0
	};
}, (function(B1) {
	var Point;
	function Point1() {
		return {
			x: 0,
			y: 0
		};
	}
	(Point1 = B1.Point || (B1.Point = {})).Origin = {
		x: 0,
		y: 0
	}, B1.Point = Point1;
})(B || (B = {}));

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,23 @@
-var A, B, A2;
-((A2 = A || (A = {})).Point || (A2.Point = {})).Origin = {
-	x: 0,
-	y: 0
-}, (A || (A = {})).Point = function() {
+var e, t;
+(function(e) {
+	(e.Point ||= {}).Origin = {
+		x: 0,
+		y: 0
+	};
+})(e ||= {}), (e ||= {}).Point = function() {
 	return {
 		x: 0,
 		y: 0
 	};
-}, function(B1) {
-	function Point1() {
+}, (function(e) {
+	function t() {
 		return {
 			x: 0,
 			y: 0
 		};
 	}
-	(Point1 = B1.Point || (B1.Point = {})).Origin = {
+	(t = e.Point ||= {}).Origin = {
 		x: 0,
 		y: 0
-	}, B1.Point = Point1;
-}(B || (B = {}));
+	}, e.Point = t;
+})(t ||= {});

```

## `swc/issues/8622`

- size: oxc 125 vs reference 168 (-43 bytes)

```js
export function foo(cond) {
	let reserved = 1;
	if (cond) {
		reserved = 2;
	}
	return [reserved, bar(cond)];
}
function bar(cond) {
	let reserved = 1;
	if (cond) {
		reserved = 2;
	}
	return reserved;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
-export function foo(e) {
-	let reserved = 1;
-	return e && (reserved = 2), [reserved, function(e) {
-		let reserved = 1;
-		return e && (reserved = 2), reserved;
-	}(e)];
+export function e(e) {
+	let n = 1;
+	return e && (n = 2), [n, t(e)];
+}
+function t(e) {
+	let t = 1;
+	return e && (t = 2), t;
 }

```

## `swc/issues/11084`

- size: oxc 548 vs reference 592 (-44 bytes)

```js
// Test case 1: Object property destructuring assignment
const bin = {
	hasMore: false,
	hasDisorder: false
};
[bin.hasMore, bin.hasDisorder] = [true, true];
console.log(bin.hasMore, bin.hasDisorder);
// Test case 2: Array element destructuring assignment
const arr = [1, 2];
[arr[0], arr[1]] = [arr[1], arr[0]];
console.log(arr);
// Test case 3: Nested object destructuring
const obj = {
	a: { x: 0 },
	b: { y: 0 }
};
[obj.a.x, obj.b.y] = [10, 20];
console.log(obj.a.x, obj.b.y);
// Test case 4: Mixed literals and expressions
const state = { flag: false };
[state.flag] = [true];
console.log(state.flag);

```

```diff
--- reference
+++ oxc
@@ -1,22 +1,18 @@
 // Test case 1: Object property destructuring assignment
-const bin = {
+const e = {
 	hasMore: !1,
 	hasDisorder: !1
 };
-[bin.hasMore, bin.hasDisorder] = [!0, !0];
-console.log(bin.hasMore, bin.hasDisorder);
+[e.hasMore, e.hasDisorder] = [!0, !0], console.log(e.hasMore, e.hasDisorder);
 // Test case 2: Array element destructuring assignment
-const arr = [1, 2];
-[arr[0], arr[1]] = [arr[1], arr[0]];
-console.log(arr);
+const t = [1, 2];
+[t[0], t[1]] = [t[1], t[0]], console.log(t);
 // Test case 3: Nested object destructuring
-const obj = {
+const n = {
 	a: { x: 0 },
 	b: { y: 0 }
 };
-[obj.a.x, obj.b.y] = [10, 20];
-console.log(obj.a.x, obj.b.y);
+[n.a.x, n.b.y] = [10, 20], console.log(n.a.x, n.b.y);
 // Test case 4: Mixed literals and expressions
-const state = { flag: !1 };
-[state.flag] = [!0];
-console.log(state.flag);
+const r = { flag: !1 };
+[r.flag] = [!0], console.log(r.flag);

```

## `swc/issues/11512-exhaustive/fn-multi-use-default-ref-prev`

- size: oxc 86 vs reference 130 (-44 bytes)

```js
function keep(a, b = a) {
	return a;
}
export function fnMultiUseDefaultRefPrev(value) {
	return keep(value) + keep(value + 1);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-function keep(a, b = a) {
-	return a;
+function e(e, t = e) {
+	return e;
 }
-export function fnMultiUseDefaultRefPrev(value) {
-	return keep(value) + keep(value + 1);
+export function t(t) {
+	return e(t) + e(t + 1);
 }

```

## `swc/issues/12177`

- size: oxc 414 vs reference 458 (-44 bytes)

```js
const effects = [];
function sideEffect(name) {
	effects.push(name);
}
function identity(value) {
	return value;
}
(function() {
	sideEffect('function-expression');
})();
identity(function() {
	sideEffect('helper-call');
})();
(function() {
	sideEffect('whole-call');
})();
(0, identity)(sideEffect('sequence'));
function returned(name) {
	return function() {
		sideEffect(name);
	};
}
identity(returned('direct-call'))();
(identity?.(returned('optional-call')))();
function Factory(value) {
	return value;
}
new Factory(returned('constructor'))();
function tag() {
	return returned('tagged-template');
}
tag``();
console.log(effects.join(','));

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,26 @@
-const effects = [];
-function sideEffect(e) {
-	effects.push(e);
+const e = [];
+function t(t) {
+	e.push(t);
+}
+function n(e) {
+	return e;
 }
-function returned(e) {
+(function() {
+	t('function-expression');
+})(), n(function() {
+	t('helper-call');
+})(), t('sequence');
+function r(e) {
 	return function() {
-		sideEffect(e);
+		t(e);
 	};
 }
-sideEffect('function-expression'), sideEffect('helper-call'), sideEffect('sequence'), returned('direct-call')(), ((function(e) {
+n(r('direct-call'))(), (n?.(r('optional-call')))();
+function i(e) {
 	return e;
-})?.(returned('optional-call')))(), new function(e) {
-	return e;
-}(returned('constructor'))(), (function() {
-	return returned('tagged-template');
-})``(), console.log(effects.join(','));
+}
+new i(r('constructor'))();
+function a() {
+	return r('tagged-template');
+}
+a``(), console.log(e.join(','));

```

## `swc/issues/11835`

- size: oxc 169 vs reference 214 (-45 bytes)

```js
var pos, lst;
function other() {
	pos = 100;
	return [
		1,
		2,
		3
	];
}
function test() {
	var result = 0;
	lst = other();
	for (pos = 1; pos <= lst.length; pos++) {
		result++;
	}
	return result;
}
console.log(test());

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
-var pos, lst;
-function other() {
-	return pos = 100, [
+var e, t;
+function n() {
+	return e = 100, [
 		1,
 		2,
 		3
 	];
 }
-function test() {
-	var result = 0;
-	for (lst = other(), pos = 1; pos <= lst.length; pos++) result++;
-	return result;
+function r() {
+	var r = 0;
+	for (t = n(), e = 1; e <= t.length; e++) r++;
+	return r;
 }
-console.log(test());
+console.log(r());

```

## `swc/issues/5588`

- size: oxc 157 vs reference 202 (-45 bytes)

```js
'use strict';
let getFoo;
let getFoo2;
class Foo {
	static #foo = 42;
	static #_ = getFoo2 = this.#foo;
	static {
		getFoo = () => this.#foo;
	}
}
expect(getFoo()).toBe(42);
expect(getFoo2()).toBe(42);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,10 @@
 'use strict';
-let getFoo;
-let getFoo2;
-class Foo {
-	static #foo = 42;
-	static #_ = getFoo2 = this.#foo;
+let e, t;
+class n {
+	static #e = 42;
+	static #t = t = this.#e;
 	static {
-		getFoo = () => this.#foo;
+		e = () => this.#e;
 	}
 }
-expect(getFoo()).toBe(42);
-expect(getFoo2()).toBe(42);
+expect(e()).toBe(42), expect(t()).toBe(42);

```

## `swc/issues/number-radix-conversion`

- size: oxc 308 vs reference 353 (-45 bytes)

```js
console.log([
	9007199254740991 .toString(3),
	9007199254740994 .toString(3),
	(-9007199254740994).toString(3),
	0x56bc75e2d63100000.toString(36),
	(-0x56bc75e2d63100000).toString(36),
	(2 ** 127).toString(16),
	(-(2 ** 127)).toString(16),
	(2 ** 128).toString(16),
	(-(2 ** 128)).toString(16)
].join(','));

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 console.log([
-	'1121202011211211122211100012101111',
+	9007199254740991 .toString(3),
 	9007199254740994 .toString(3),
 	(-9007199254740994).toString(3),
 	0x56bc75e2d63100000.toString(36),
 	(-0x56bc75e2d63100000).toString(36),
-	'80000000000000000000000000000000',
-	'-80000000000000000000000000000000',
-	3402823669209385e23.toString(16),
-	(-3402823669209385e23).toString(16)
+	(2 ** 127).toString(16),
+	(-(2 ** 127)).toString(16),
+	(2 ** 128).toString(16),
+	(-(2 ** 128)).toString(16)
 ].join(','));

```

## `swc/next/feeback-plotly/1`

- size: oxc 196 vs reference 241 (-45 bytes)

```js
export function log2(v) {
	var r, shift;
	r = (v > 65535) << 4;
	v >>>= r;
	shift = (v > 255) << 3;
	v >>>= shift;
	r |= shift;
	shift = (v > 15) << 2;
	v >>>= shift;
	r |= shift;
	shift = (v > 3) << 1;
	v >>>= shift;
	r |= shift;
	return r | v >> 1;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-export function log2(v) {
-	var r, shift;
-	return r = (v > 65535) << 4, v >>>= r, shift = (v > 255) << 3, v >>>= shift, r |= shift, shift = (v > 15) << 2, v >>>= shift, r |= shift, shift = (v > 3) << 1, v >>>= shift, (r |= shift) | v >> 1;
+export function e(e) {
+	var t = (e > 65535) << 4, n;
+	return e >>>= t, n = (e > 255) << 3, e >>>= n, t |= n, n = (e > 15) << 2, e >>>= n, t |= n, n = (e > 3) << 1, e >>>= n, t |= n, t | e >> 1;
 }

```

## `swc/issues/non-finite-conditional-arithmetic`

- size: oxc 317 vs reference 365 (-48 bytes)

```js
function classify(value) {
	if (Number.isNaN(value)) {
		return 'NaN';
	}
	if (Object.is(value, -0)) {
		return '-0';
	}
	return String(value);
}
function test(flag) {
	console.log([
		flag ? Infinity : 0,
		flag ? 0 : Infinity,
		flag ? 1 : -0,
		flag ? -0 : 1
	].map(classify).join(','));
}
globalThis.trueValue = true;
globalThis.falseValue = false;
test(globalThis.trueValue);
test(globalThis.falseValue);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-function classify(value) {
-	return Number.isNaN(value) ? 'NaN' : Object.is(value, -0) ? '-0' : String(value);
+function e(e) {
+	return Number.isNaN(e) ? 'NaN' : Object.is(e, -0) ? '-0' : String(e);
 }
-function test(flag) {
+function t(t) {
 	console.log([
-		flag ? 1 / 0 : 0,
-		flag ? 0 : 1 / 0,
-		flag ? 1 : -0,
-		flag ? -0 : 1
-	].map(classify).join(','));
+		t ? Infinity : 0,
+		t ? 0 : Infinity,
+		t ? 1 : -0,
+		t ? -0 : 1
+	].map(e).join(','));
 }
-globalThis.trueValue = !0, globalThis.falseValue = !1, test(globalThis.trueValue), test(globalThis.falseValue);
+globalThis.trueValue = !0, globalThis.falseValue = !1, t(globalThis.trueValue), t(globalThis.falseValue);

```

## `swc/next/joda`

- size: oxc 272 vs reference 320 (-48 bytes)

```js
'use strict';
(self['webpackChunk_N_E'] = self['webpackChunk_N_E'] || []).push([[715], { 
/***/ 3266: 
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
	/* harmony export */ __webpack_require__.d(__webpack_exports__, { 
	/* harmony export */ 'h': function() {
		return LocalDate;
	} });
	var isInit = false;
	function init() {
		if (isInit) {
			return;
		}
		isInit = true;
	}
	init();
}) }]);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,13 @@
 'use strict';
 (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[715], { 
-/***/ 3266: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
-	/* harmony export */ __webpack_require__.d(__webpack_exports__, { 
+/***/ 3266: (function(e, t, n) {
+	/* harmony export */ n.d(t, { 
 	/* harmony export */ h: function() {
 		return LocalDate;
 	} });
-} }]);
+	var r = !1;
+	function i() {
+		r ||= !0;
+	}
+	i();
+}) }]);

```

## `swc/issues/array-constructor-length`

- size: oxc 215 vs reference 265 (-50 bytes)

```js
function result(factory) {
	try {
		return factory().length;
	} catch (error) {
		return error.name;
	}
}
console.log([
	result(() => Array(.5)),
	result(() => new Array(1.5)),
	result(() => Array(0)),
	result(() => Array(5)),
	result(() => Array(-0))
].join(','));

```

```diff
--- reference
+++ oxc
@@ -1,20 +1,20 @@
-function result(factory) {
+function e(e) {
 	try {
-		return factory().length;
-	} catch (error) {
-		return error.name;
+		return e().length;
+	} catch (e) {
+		return e.name;
 	}
 }
 console.log([
-	result(() => Array(.5)),
-	result(() => Array(1.5)),
-	result(() => []),
-	result(() => [
+	e(() => Array(.5)),
+	e(() => Array(1.5)),
+	e(() => []),
+	e(() => [
 		,
 		,
 		,
 		,
 		,
 	]),
-	result(() => [])
+	e(() => [])
 ].join(','));

```

## `swc/issues/9741_global_objects`

- size: oxc 0 vs reference 51 (-51 bytes)

```js
// Map needs 5+ usages due to short name (3 chars)
const a = new Map();
const b = new Map();
const c = new Map();
const d = new Map();
const e = new Map();
// Set also needs 5+ usages
const f = new Set();
const g = new Set();
const h = new Set();
const i = new Set();
const j = new Set();

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-// Map needs 5+ usages due to short name (3 chars)

```

## `swc/issues/2319/1`

- size: oxc 143 vs reference 196 (-53 bytes)

```js
function foo(l, r) {
	var lightGreeting;
	if (l > 0) {
		var greeting = 'hello';
	} else {
		var greeting = 'howdy';
	}
	if (r > 0) {
		lightGreeting = greeting.substr(0, 2);
	}
	return lightGreeting;
}
module.exports = foo;

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-module.exports = function(l, r) {
-	var lightGreeting;
-	if (l > 0) var greeting = 'hello';
-	else var greeting = 'howdy';
-	return r > 0 && (lightGreeting = greeting.substr(0, 2)), lightGreeting;
-};
+function e(e, t) {
+	var n;
+	if (e > 0) var r = 'hello';
+	else var r = 'howdy';
+	return t > 0 && (n = r.substr(0, 2)), n;
+}
+module.exports = e;

```

## `swc/issues/drop-console-nullish-console`

- size: oxc 186 vs reference 240 (-54 bytes)

```js
globalThis.console = null;
const pb = console?.error.bind(console);
process.stdout.write(typeof pb + '\n');
const ob = console?.error?.bind(console);
process.stdout.write(typeof ob + '\n');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 globalThis.console = null;
-const pb = null == console ? void 0 : (console.error && function() {}).bind();
-process.stdout.write(typeof pb + '\n');
-const ob = (console?.error && function() {})?.bind();
-process.stdout.write(typeof ob + '\n');
+const e = console?.error.bind(console);
+process.stdout.write(typeof e + '\n');
+const t = console?.error?.bind(console);
+process.stdout.write(typeof t + '\n');

```

## `swc/issues/react/hooks/5`

- size: oxc 386 vs reference 440 (-54 bytes)

```js
const CONST_1 = 'const1';
const CONST_2 = 'const2';
function useHook1() {
	const [v1, v1_set] = useState(undefined);
	useEffect(() => {
		if (GLOBALS.get(CONST_1) && GLOBALS.get(CONST_2)) {
			v1_set(true);
		} else {
			v1_set(false);
		}
	}, []);
	return v1;
}
function useHook2() {
	const [a1, a1_set] = useState({});
	useEffect(() => {
		a1_set(JSON.parse(GLOBALS.get(CONST1) || '{}'));
	}, []);
	return a1;
}
export function HeaderCTA() {
	const varB = useHook2();
	const varA = useHook1();
	// Loading...
	if (varA === undefined) {
		return null;
	}
	if (varA) {
		return use(varB.field);
	}
	return pure();
}

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,16 @@
-export function HeaderCTA() {
-	let varB = function() {
-		let [a1, a1_set] = useState({});
-		return useEffect(() => {
-			a1_set(JSON.parse(GLOBALS.get(CONST1) || '{}'));
-		}, []), a1;
-	}(), varA = function() {
-		let [v1, v1_set] = useState(void 0);
-		return useEffect(() => {
-			GLOBALS.get('const1') && GLOBALS.get('const2') ? v1_set(!0) : v1_set(!1);
-		}, []), v1;
-	}();
-	return void 0 === varA ? null : varA ? use(varB.field) : pure();
+function e() {
+	let [e, t] = useState(void 0);
+	return useEffect(() => {
+		GLOBALS.get('const1') && GLOBALS.get('const2') ? t(!0) : t(!1);
+	}, []), e;
+}
+function t() {
+	let [e, t] = useState({});
+	return useEffect(() => {
+		t(JSON.parse(GLOBALS.get(CONST1) || '{}'));
+	}, []), e;
+}
+export function n() {
+	let n = t(), r = e();
+	return r === void 0 ? null : r ? use(n.field) : pure();
 }

```

## `swc/issues/11545`

- size: oxc 156 vs reference 211 (-55 bytes)

```js
function joinArrayWithUndefined(bool) {
	return ['abc', bool ? undefined : 'def'].join('');
}
console.log(joinArrayWithUndefined(true));
console.log(joinArrayWithUndefined(false));
const x = ['abc', undefined].join('');
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-function joinArrayWithUndefined(bool) {
-	return ['abc', bool ? void 0 : 'def'].join('');
+function e(e) {
+	return ['abc', e ? void 0 : 'def'].join('');
 }
-console.log(joinArrayWithUndefined(true));
-console.log(joinArrayWithUndefined(false));
-const x = 'abc';
-console.log(x);
+console.log(e(!0));
+console.log(e(!1));
+const t = ['abc', void 0].join('');
+console.log(t);

```

## `swc/issues/11684/with-scope`

- size: oxc 278 vs reference 334 (-56 bytes)

```js
function TopLevelCtor(value) {
	this.value = value;
}
out.TopLevelCtor = TopLevelCtor;
with(constructors) {
	out.topLevel = new TopLevelCtor(1, 2, 3);
}
function constructLocal(constructors) {
	function LocalCtor(value) {
		this.value = value;
	}
	with(constructors) {
		return new LocalCtor(1, 2, 3);
	}
}
out.constructLocal = constructLocal;

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,12 @@
-function TopLevelCtor(value) {
-	this.value = value;
+function TopLevelCtor(e) {
+	this.value = e;
 }
-with(out.TopLevelCtor = TopLevelCtor, constructors) out.topLevel = new TopLevelCtor(1, 2, 3);
-function constructLocal(constructors1) {
-	function LocalCtor(value) {
-		this.value = value;
+out.TopLevelCtor = TopLevelCtor;
+with(constructors) out.topLevel = new TopLevelCtor(1, 2, 3);
+function constructLocal(e) {
+	function t(e) {
+		this.value = e;
 	}
-	with(constructors1) return new LocalCtor(1, 2, 3);
+	with(e) return new t(1, 2, 3);
 }
 out.constructLocal = constructLocal;

```

## `swc/issues/2926/1`

- size: oxc 128 vs reference 185 (-57 bytes)

```js
export var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
	/******/
	var runtime = data[2];
	//......
	if (runtime) var result = runtime(__webpack_require__);
	// return result
};

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-export var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
-	/******/ var runtime = data[2];
+export var e = function(e, t) {
+	/******/
+	var n = t[2];
 	//......
-	runtime && runtime(__webpack_require__);
+	if (n) var r = n(__webpack_require__);
 	// return result
 };

```

## `swc/issues/11684/identifier-side-effects`

- size: oxc 503 vs reference 561 (-58 bytes)

```js
function FunctionCtor(value) {
	this.value = value;
}
out.FunctionCtor = FunctionCtor;
out.functionCtor = new FunctionCtor(effect('function-used'), 1, effect('function-extra-a'), 2, effect('function-extra-b'));
class ClassCtor {
	constructor(value) {
		this.value = value;
	}
}
out.ClassCtor = ClassCtor;
out.classCtor = new ClassCtor(effect('class-used'), 1, effect('class-extra-a'), 2, effect('class-extra-b'));
function Zero() {
	this.kind = 'zero';
}
out.Zero = Zero;
out.sequence = new Zero(1, (2, effect('sequence')), 3);
out.conditional = new Zero(1, condition ? effect('yes') : 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,14 @@
-function FunctionCtor(value) {
-	this.value = value;
+function e(e) {
+	this.value = e;
 }
-out.FunctionCtor = FunctionCtor, out.functionCtor = new FunctionCtor(effect('function-used'), effect('function-extra-a'), effect('function-extra-b'));
-class ClassCtor {
-	constructor(value) {
-		this.value = value;
+out.FunctionCtor = e, out.functionCtor = new e(effect('function-used'), 1, effect('function-extra-a'), 2, effect('function-extra-b'));
+class t {
+	constructor(e) {
+		this.value = e;
 	}
 }
-function Zero() {
+out.ClassCtor = t, out.classCtor = new t(effect('class-used'), 1, effect('class-extra-a'), 2, effect('class-extra-b'));
+function n() {
 	this.kind = 'zero';
 }
-out.ClassCtor = ClassCtor, out.classCtor = new ClassCtor(effect('class-used'), effect('class-extra-a'), effect('class-extra-b')), out.Zero = Zero, out.sequence = new Zero(effect('sequence')), out.conditional = new Zero(condition && effect('yes'));
+out.Zero = n, out.sequence = new n(1, effect('sequence'), 3), out.conditional = new n(1, condition ? effect('yes') : 2, 3);

```

## `swc/issues/9610-side-effects`

- size: oxc 607 vs reference 666 (-59 bytes)

```js
// Test: Default values with side effects should NOT be removed
// The function call in default value has side effects
let sideEffectCounter = 0;
function getSideEffect() {
	sideEffectCounter++;
	return 'value';
}
// This should NOT have the default param removed because getSideEffect() has side effects
function foo(a, b = getSideEffect()) {
	return a;
}
// This SHOULD have the default param removed because literal has no side effects
function bar(a, b = 'literal') {
	return a;
}
// This should NOT have the default param removed because new Date() has side effects
function baz(a, b = new Date()) {
	return a;
}
export function example() {
	return foo(1) + bar(2) + baz(3);
}

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,21 @@
 // Test: Default values with side effects should NOT be removed
 // The function call in default value has side effects
-let sideEffectCounter = 0;
-function getSideEffect() {
-	return sideEffectCounter++, 'value';
+let e = 0;
+function t() {
+	return e++, 'value';
 }
 // This should NOT have the default param removed because getSideEffect() has side effects
-function foo(a, b = getSideEffect()) {
-	return a;
+function n(e, n = t()) {
+	return e;
 }
 // This SHOULD have the default param removed because literal has no side effects
-function bar(a) {
-	return a;
+function r(e, t = 'literal') {
+	return e;
 }
 // This should NOT have the default param removed because new Date() has side effects
-function baz(a, b = new Date()) {
-	return a;
+function i(e, t = new Date()) {
+	return e;
 }
-export function example() {
-	return foo(1) + bar(2) + baz(3);
+export function a() {
+	return n(1) + r(2) + i(3);
 }

```

## `swc/simple/super/computed`

- size: oxc 3 vs reference 62 (-59 bytes)

```js
class A extends B {
	foo() {
		console.log(super['dsaas']);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
-class A extends B {
-	foo() {
-		console.log(super.dsaas);
-	}
-}
+B;

```

## `swc/issues/2078/1`

- size: oxc 94 vs reference 154 (-60 bytes)

```js
let rerenderQueue = [1];
let queue;
while (rerenderQueue.length > 0) {
	queue = rerenderQueue.sort();
	rerenderQueue = [];
	queue.forEach((c) => console.log(c));
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-let queue, rerenderQueue = [1];
-for (; rerenderQueue.length > 0;) queue = rerenderQueue.sort(), rerenderQueue = [], queue.forEach((c) => console.log(c));
+let e = [1], t;
+for (; e.length > 0;) t = e.sort(), e = [], t.forEach((e) => console.log(e));

```

## `swc/issues/11684/identifier-reduce-vars-only`

- size: oxc 194 vs reference 255 (-61 bytes)

```js
function FunctionCtor(value) {
	this.value = value;
}
out.FunctionCtor = FunctionCtor;
out.functionCtor = new FunctionCtor(1, 2, 3);
class ClassCtor {
	constructor(value) {
		this.value = value;
	}
}
out.ClassCtor = ClassCtor;
out.classCtor = new ClassCtor(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,10 @@
-function FunctionCtor(value) {
-	this.value = value;
+function e(e) {
+	this.value = e;
 }
-out.FunctionCtor = FunctionCtor;
-out.functionCtor = new FunctionCtor(1);
-class ClassCtor {
-	constructor(value) {
-		this.value = value;
+out.FunctionCtor = e, out.functionCtor = new e(1, 2, 3);
+class t {
+	constructor(e) {
+		this.value = e;
 	}
 }
-out.ClassCtor = ClassCtor;
-out.classCtor = new ClassCtor(1);
+out.ClassCtor = t, out.classCtor = new t(1, 2, 3);

```

## `swc/issues/11684/identifier-unused-only`

- size: oxc 194 vs reference 255 (-61 bytes)

```js
function FunctionCtor(value) {
	this.value = value;
}
out.FunctionCtor = FunctionCtor;
out.functionCtor = new FunctionCtor(1, 2, 3);
class ClassCtor {
	constructor(value) {
		this.value = value;
	}
}
out.ClassCtor = ClassCtor;
out.classCtor = new ClassCtor(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,10 @@
-function FunctionCtor(value) {
-	this.value = value;
+function e(e) {
+	this.value = e;
 }
-out.FunctionCtor = FunctionCtor;
-out.functionCtor = new FunctionCtor(1);
-class ClassCtor {
-	constructor(value) {
-		this.value = value;
+out.FunctionCtor = e, out.functionCtor = new e(1, 2, 3);
+class t {
+	constructor(e) {
+		this.value = e;
 	}
 }
-out.ClassCtor = ClassCtor;
-out.classCtor = new ClassCtor(1);
+out.ClassCtor = t, out.classCtor = new t(1, 2, 3);

```

## `swc/issues/4249`

- size: oxc 225 vs reference 287 (-62 bytes)

```js
foo({ bar: function bar(data, baz) {
	if (!(baz ? data.quxA : data.quxB) && !(baz ? data.corgeA : data.corgeB) && (baz ? data.get('waldo') : data.waldo)) {
		pass();
	} else if (!(baz ? data.quxA : data.quxB) && !(baz ? data.get('waldo') : data.waldo) && (baz ? data.corgeA : data.corgeB)) {
		pass();
	}
} });

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-foo({ bar: function(data, baz) {
-	!(!(baz ? data.quxA : data.quxB) && !(baz ? data.corgeA : data.corgeB) && (baz ? data.get('waldo') : data.waldo)) ? (baz ? data.quxA : data.quxB) || (baz ? data.get('waldo') : data.waldo) || (baz ? !data.corgeA : !data.corgeB) || pass() : pass();
+foo({ bar: function(e, t) {
+	(!(t ? e.quxA : e.quxB) && !(t ? e.corgeA : e.corgeB) && (t ? e.get('waldo') : e.waldo) || !(t ? e.quxA : e.quxB) && !(t ? e.get('waldo') : e.waldo) && (t ? e.corgeA : e.corgeB)) && pass();
 } });

```

## `swc/issues/7821`

- size: oxc 393 vs reference 457 (-64 bytes)

```js
var Blocks = {
	Block1: function() {
		return React.createElement(React.Fragment, null, '\'Block1xx\'');
	},
	Block2: function() {
		return React.createElement(React.Fragment, null, '\'Block2xx\'');
	},
	Layout1: function() {
		return RenderLayout(Blocks, ['Block1']);
	}
};
function RenderLayout(Comps, items) {
	return items.map(function(item) {
		return Comps[item];
	});
}
export function render() {
	return React.createElement(Blocks.Layout1, null);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var Blocks = {
+var e = {
 	Block1: function() {
 		return React.createElement(React.Fragment, null, '\'Block1xx\'');
 	},
@@ -6,14 +6,14 @@
 		return React.createElement(React.Fragment, null, '\'Block2xx\'');
 	},
 	Layout1: function() {
-		return RenderLayout(Blocks, ['Block1']);
+		return t(e, ['Block1']);
 	}
 };
-function RenderLayout(Comps, items) {
-	return items.map(function(item) {
-		return Comps[item];
+function t(e, t) {
+	return t.map(function(t) {
+		return e[t];
 	});
 }
-export function render() {
-	return React.createElement(Blocks.Layout1, null);
+export function n() {
+	return React.createElement(e.Layout1, null);
 }

```

## `swc/issues/7847`

- size: oxc 246 vs reference 311 (-65 bytes)

```js
function requireState() {
	if (hasRequiredState) return state;
	hasRequiredState = 1;
	return state = { getHighWaterMark: function(o) {
		return o.objectMode ? 16 : 16384;
	} };
}
if (g()) {
	var state, hasRequiredState;
	const a = requireState();
	console.log(a.getHighWaterMark());
	const b = requireState();
	console.log(b.getHighWaterMark());
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,12 @@
-function requireState() {
-	return hasRequiredState ? state : (hasRequiredState = 1, state = { getHighWaterMark: function(o) {
-		return o.objectMode ? 16 : 16384;
+function e() {
+	return n ? t : (n = 1, t = { getHighWaterMark: function(e) {
+		return e.objectMode ? 16 : 16384;
 	} });
 }
 if (g()) {
-	var state, hasRequiredState;
-	console.log(requireState().getHighWaterMark()), console.log(requireState().getHighWaterMark());
+	var t, n;
+	let r = e();
+	console.log(r.getHighWaterMark());
+	let i = e();
+	console.log(i.getHighWaterMark());
 }

```

## `swc/issues/10876/1`

- size: oxc 410 vs reference 477 (-67 bytes)

```js
const createCounter1 = () => {
	let count = 0;
	return (numToAdd) => {
		count += numToAdd;
		return count;
	};
};
const createCounter2 = () => {
	let count = 0;
	return (numToAdd) => {
		count += numToAdd;
		return count;
	};
};
function createCounter3() {
	let count = 0;
	return (numToAdd) => {
		count += numToAdd;
		return count;
	};
}
class Counter {
	add = createCounter1();
	static {
		this.helper = createCounter2();
	}
	static method() {
		return createCounter3();
	}
}
const counter1 = new Counter();
const counter2 = new Counter();
console.log(counter1.add(1));
console.log(counter2.add(1));
console.log(Counter.helper(1));
console.log(Counter.method()(1));
export {};

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,23 @@
-class Counter {
-	add = (() => {
-		let count = 0;
-		return (numToAdd) => count += numToAdd;
-	})();
+const e = () => {
+	let e = 0;
+	return (t) => (e += t, e);
+}, t = () => {
+	let e = 0;
+	return (t) => (e += t, e);
+};
+function n() {
+	let e = 0;
+	return (t) => (e += t, e);
+}
+class r {
+	add = e();
 	static {
-		let count;
-		this.helper = (count = 0, (numToAdd) => count += numToAdd);
+		this.helper = t();
 	}
 	static method() {
-		let count;
-		return count = 0, (numToAdd) => count += numToAdd;
+		return n();
 	}
 }
-const counter1 = new Counter();
-const counter2 = new Counter();
-console.log(counter1.add(1)), console.log(counter2.add(1)), console.log(Counter.helper(1)), console.log(Counter.method()(1));
+const i = new r(), a = new r();
+console.log(i.add(1)), console.log(a.add(1)), console.log(r.helper(1)), console.log(r.method()(1));
 export {};

```

## `swc/issues/6837/1`

- size: oxc 289 vs reference 357 (-68 bytes)

```js
class Class1 {}
function isClass2(node) {
	return node instanceof Class2;
}
Class1.isClass2 = isClass2;
export class Class2 extends Class1 {
	constructor() {
		super();
		this.method1 = async () => {
			let var1;
			const function1 = () => {};
			var1 = await Class2.method2();
			await function1().then(() => {
				console.log(var1);
			}).catch();
		};
	}
	static async method2() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,14 @@
-class Class1 {}
-function isClass2(node) {
-	return node instanceof Class2;
+class e {}
+function t(e) {
+	return e instanceof n;
 }
-Class1.isClass2 = isClass2;
-export class Class2 extends Class1 {
+e.isClass2 = t;
+export class n extends e {
 	constructor() {
-		super();
-		this.method1 = async () => {
-			let var1;
-			var1 = await Class2.method2();
-			await (() => {})().then(() => {
-				console.log(var1);
+		super(), this.method1 = async () => {
+			let e;
+			e = await n.method2(), await (void 0).then(() => {
+				console.log(e);
 			}).catch();
 		};
 	}

```

## `swc/issues/10918`

- size: oxc 360 vs reference 432 (-72 bytes)

```js
import { useState } from 'react';
import { getCondition, doSomething } from './utils';
export default function useMeow() {
	const [state, setState] = useState('init');
	const onMeow = async () => {
		switch (state) {
			case 'init': {
				const innerCondition = getCondition();
				switch (innerCondition) {
					case 'a': break;
					case 'b': break;
					default: await doSomething();
				}
				break;
			}
			default: {
				await doSomething();
				break;
			}
		}
	};
	return { onMeow };
}

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,17 @@
-import { useState } from 'react';
-import { getCondition, doSomething } from './utils';
-export default function useMeow() {
-	const [state, setState] = useState('init');
-	const onMeow = async () => {
-		if ('init' === state) {
-			const innerCondition = getCondition();
-			switch (innerCondition) {
-				case 'a': break;
-				case 'b': break;
-				default: await doSomething();
-			}
-		} else await doSomething();
-	};
-	return { onMeow };
+import { useState as e } from 'react';
+import { getCondition as t, doSomething as n } from './utils';
+export default function r() {
+	let [r, i] = e('init');
+	return { onMeow: async () => {
+		switch (r) {
+			case 'init':
+				switch (t()) {
+					case 'a': break;
+					case 'b': break;
+					default: await n();
+				}
+				break;
+			default: await n();
+		}
+	} };
 }

```

## `swc/issues/11684/identifier-disabled`

- size: oxc 194 vs reference 267 (-73 bytes)

```js
function FunctionCtor(value) {
	this.value = value;
}
out.FunctionCtor = FunctionCtor;
out.functionCtor = new FunctionCtor(1, 2, 3);
class ClassCtor {
	constructor(value) {
		this.value = value;
	}
}
out.ClassCtor = ClassCtor;
out.classCtor = new ClassCtor(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-function FunctionCtor(value) {
-	this.value = value;
+function e(e) {
+	this.value = e;
 }
-out.FunctionCtor = FunctionCtor, out.functionCtor = new FunctionCtor(1, 2, 3);
-class ClassCtor {
-	constructor(value) {
-		this.value = value;
+out.FunctionCtor = e, out.functionCtor = new e(1, 2, 3);
+class t {
+	constructor(e) {
+		this.value = e;
 	}
 }
-out.ClassCtor = ClassCtor, out.classCtor = new ClassCtor(1, 2, 3);
+out.ClassCtor = t, out.classCtor = new t(1, 2, 3);

```

## `swc/issues/11684/function-decl`

- size: oxc 402 vs reference 476 (-74 bytes)

```js
function Zero() {
	this.kind = 'zero';
}
out.Zero = Zero;
out.zero = new Zero(1, 2, 3);
function One(value) {
	this.value = value;
}
out.One = One;
out.one = new One(1, 2, 3);
function Destructured({ value }, other) {
	this.value = value;
	this.other = other;
}
out.Destructured = Destructured;
out.destructured = new Destructured({ value: 1 }, 2, 3, 4);
function Default(value = 1, other) {
	this.value = value;
	this.other = other;
}
out.Default = Default;
out.default = new Default(undefined, 2, 3, 4);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,16 @@
-function Zero() {
+function e() {
 	this.kind = 'zero';
 }
-function One(value) {
-	this.value = value;
+out.Zero = e, out.zero = new e(1, 2, 3);
+function t(e) {
+	this.value = e;
 }
-function Destructured({ value }, other) {
-	this.value = value, this.other = other;
+out.One = t, out.one = new t(1, 2, 3);
+function n({ value: e }, t) {
+	this.value = e, this.other = t;
 }
-function Default(value = 1, other) {
-	this.value = value, this.other = other;
+out.Destructured = n, out.destructured = new n({ value: 1 }, 2, 3, 4);
+function r(e = 1, t) {
+	this.value = e, this.other = t;
 }
-out.Zero = Zero, out.zero = new Zero(), out.One = One, out.one = new One(1), out.Destructured = Destructured, out.destructured = new Destructured({ value: 1 }, 2), out.Default = Default, out.default = new Default(void 0, 2);
+out.Default = r, out.default = new r(void 0, 2, 3, 4);

```

## `swc/issues/react/hooks/1`

- size: oxc 342 vs reference 418 (-76 bytes)

```js
import { jsx as _jsx, Fragment as _Fragment } from 'react/jsx-runtime';
import { useRouter } from 'next/router';
import { useProject } from '@swr/use-project';
import useTeam from '@swr/use-team';
export default function MyComp() {
	var _query = useRouter().query, projectName = _query.project;
	var ref = useProject(projectName), projectInfo = ref.data;
	var ref1 = useTeam(), teamSlug = ref1.teamSlug;
	var projectId = projectInfo === null || projectInfo === void 0 ? void 0 : projectInfo.id;
	var ref2 = useProjectBranches(projectId), branches = ref2.data;
	return _jsx(_Fragment, {});
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
-import { jsx as _jsx, Fragment as _Fragment } from 'react/jsx-runtime';
-import { useRouter } from 'next/router';
-import { useProject } from '@swr/use-project';
-import useTeam from '@swr/use-team';
-export default function MyComp() {
-	var projectInfo = useProject(useRouter().query.project).data;
-	return useTeam().teamSlug, useProjectBranches(null == projectInfo ? void 0 : projectInfo.id).data, _jsx(_Fragment, {});
+import { jsx as e, Fragment as t } from 'react/jsx-runtime';
+import { useRouter as n } from 'next/router';
+import { useProject as r } from '@swr/use-project';
+import i from '@swr/use-team';
+export default function a() {
+	var a = n().query.project, o = r(a).data;
+	i().teamSlug;
+	var s = o?.id;
+	return useProjectBranches(s).data, e(t, {});
 }

```

## `swc/issues/8337`

- size: oxc 228 vs reference 308 (-80 bytes)

```js
export function allowInAnd(callback) {
	var flags = this.prodParam.currentFlags();
	var prodParamToSet = ParamKind.PARAM_IN & ~flags;
	if (prodParamToSet) {
		this.prodParam.enter(flags | ParamKind.PARAM_IN);
		try {
			return callback();
		} finally {
			this.prodParam.exit();
		}
	}
	return callback();
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,12 @@
-export function allowInAnd(callback) {
-	var flags = this.prodParam.currentFlags();
-	var prodParamToSet = ParamKind.PARAM_IN & ~flags;
-	if (prodParamToSet) {
-		this.prodParam.enter(flags | ParamKind.PARAM_IN);
+export function e(e) {
+	var t = this.prodParam.currentFlags();
+	if (ParamKind.PARAM_IN & ~t) {
+		this.prodParam.enter(t | ParamKind.PARAM_IN);
 		try {
-			return callback();
+			return e();
 		} finally {
 			this.prodParam.exit();
 		}
 	}
-	return callback();
+	return e();
 }

```

## `swc/projects/jquery/26`

- size: oxc 235 vs reference 315 (-80 bytes)

```js
export const obj = { clone: function(dataAndEvents, deepDataAndEvents) {
	dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
	deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	return this.map(function() {
		return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
	});
} };

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 export const obj = { clone: function(dataAndEvents, deepDataAndEvents) {
-	return dataAndEvents = null != dataAndEvents && dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
+	return dataAndEvents ??= !1, deepDataAndEvents ??= dataAndEvents, this.map(function() {
 		return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
 	});
 } };

```

## `swc/projects/mootools/3`

- size: oxc 0 vs reference 83 (-83 bytes)

```js
function foo() {
	this.$chk = function(obj) {
		return !!(obj || obj === 0);
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function foo() {
-	this.$chk = function(obj) {
-		return !!(obj || 0 === obj);
-	};
-}

```

## `swc/issues/6422/3`

- size: oxc 177 vs reference 261 (-84 bytes)

```js
import assert from 'assert';
let result = 0;
const unused = {
	...{ get prop() {
		result = 1;
	} },
	[assert.strictEqual(result, 1)]: null,
	[result = 2]: null,
	[assert.strictEqual(result, 2)]: null,
	...{ get prop() {
		result = 3;
	} }
};
assert.strictEqual(result, 3);

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,7 @@
-import assert from 'assert';
-let result = 0;
-({
-	...{ get prop() {
-		result = 1;
-	} },
-	[assert.strictEqual(result, 1)]: null,
-	[result = 2]: null,
-	[assert.strictEqual(result, 2)]: null,
-	...{ get prop() {
-		result = 3;
-	} }
-});
-assert.strictEqual(result, 3);
+import e from 'assert';
+let t = 0;
+({ ...{ get prop() {
+	t = 1;
+} } }), e.strictEqual(t, 1), t = 2, e.strictEqual(t, 2), { ...{ get prop() {
+	t = 3;
+} } }, e.strictEqual(t, 3);

```

## `swc/issues/8324`

- size: oxc 415 vs reference 500 (-85 bytes)

```js
function Deferred() {
	const deferred = this;
	deferred.promise = new Promise(function(resolve, reject) {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});
}
export async function bug() {
	const s = `next`;
	if (!window[s]) {
		for (window[s] = new Deferred();;) if (window.current) await window.current.promise;
		else {
			window.current = window[s];
			try {
				return await window[s].promise;
			} finally {
				delete window.current;
			}
		}
	}
	return await window[s].promise;
}

```

```diff
--- reference
+++ oxc
@@ -1,22 +1,20 @@
-function Deferred() {
-	const deferred = this;
-	deferred.promise = new Promise(function(resolve, reject) {
-		deferred.resolve = resolve;
-		deferred.reject = reject;
+function e() {
+	let e = this;
+	e.promise = new Promise(function(t, n) {
+		e.resolve = t;
+		e.reject = n;
 	});
 }
-export async function bug() {
-	const s = 'next';
-	if (!window[s]) {
-		for (window[s] = new Deferred();;) if (window.current) await window.current.promise;
-		else {
-			window.current = window[s];
-			try {
-				return await window[s].promise;
-			} finally {
-				delete window.current;
-			}
+export async function t() {
+	let t = 'next';
+	if (!window[t]) for (window[t] = new e();;) if (window.current) await window.current.promise;
+	else {
+		window.current = window[t];
+		try {
+			return await window[t].promise;
+		} finally {
+			delete window.current;
 		}
 	}
-	return await window[s].promise;
+	return await window[t].promise;
 }

```

## `swc/issues/6422/1`

- size: oxc 223 vs reference 309 (-86 bytes)

```js
let getter_effect = 'FAIL';
let setter_effect = 'FAIL';
let proto = {
	get foo() {
		getter_effect = 'PASS';
	},
	set bar(value) {
		setter_effect = 'PASS';
	}
};
let obj1 = { __proto__: proto };
let obj2 = { __proto__: proto };
let unused = obj1.foo;
obj2.bar = 0;
assert.strictEqual(getter_effect, 'PASS');
assert.strictEqual(setter_effect, 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,9 @@
-let getter_effect = 'FAIL';
-let setter_effect = 'FAIL';
-let proto = {
+let e = 'FAIL', t = 'FAIL', n = {
 	get foo() {
-		getter_effect = 'PASS';
+		e = 'PASS';
 	},
-	set bar(value) {
-		setter_effect = 'PASS';
+	set bar(e) {
+		t = 'PASS';
 	}
-};
-({ __proto__: proto }).foo;
-({ __proto__: proto }).bar = 0;
-assert.strictEqual(getter_effect, 'PASS');
-assert.strictEqual(setter_effect, 'PASS');
+}, r = { __proto__: n }, i = { __proto__: n };
+r.foo, i.bar = 0, assert.strictEqual(e, 'PASS'), assert.strictEqual(t, 'PASS');

```

## `swc/issues/11684/scopes-and-mutations`

- size: oxc 1306 vs reference 1393 (-87 bytes)

```js
class Global {
	constructor(value) {
		this.value = value;
	}
}
out.Global = Global;
out.global = new Global(1, 2, 3);
function constructUnknown(Global) {
	return new Global(1, 2, 3);
}
out.constructUnknown = constructUnknown;
function constructLocal() {
	class Global {
		constructor(first, second) {
			this.first = first;
			this.second = second;
		}
	}
	out.Local = Global;
	return new Global(1, 2, 3, 4);
}
out.constructLocal = constructLocal;
class MutableClass {}
if (condition) {
	MutableClass = ExternalClass;
}
out.MutableClass = MutableClass;
out.mutableClass = new MutableClass(1, 2, 3);
function MutableFunction() {}
if (condition) {
	MutableFunction = ExternalFunction;
}
out.MutableFunction = MutableFunction;
out.mutableFunction = new MutableFunction(1, 2, 3);
var DifferentArity = function(value) {
	this.value = value;
};
if (condition) {
	DifferentArity = function(first, second) {
		this.first = first;
		this.second = second;
	};
}
out.DifferentArity = DifferentArity;
out.differentArity = new DifferentArity(1, 2, 3);
var SameArity = function(value) {
	this.value = value;
};
if (condition) {
	SameArity = class {
		constructor(value) {
			this.value = value;
		}
	};
}
out.SameArity = SameArity;
out.sameArity = new SameArity(1, 2, 3);
function constructAfterEval() {
	class EvalMutable {}
	eval('EvalMutable = ExternalClass');
	return new EvalMutable(1, 2, 3);
}
out.constructAfterEval = constructAfterEval;

```

```diff
--- reference
+++ oxc
@@ -1,38 +1,42 @@
 class Global {
-	constructor(value) {
-		this.value = value;
+	constructor(e) {
+		this.value = e;
 	}
 }
-function constructUnknown(Global) {
-	return new Global(1, 2, 3);
+out.Global = Global, out.global = new Global(1, 2, 3);
+function constructUnknown(e) {
+	return new e(1, 2, 3);
 }
+out.constructUnknown = constructUnknown;
 function constructLocal() {
-	class Global {
-		constructor(first, second) {
-			this.first = first, this.second = second;
+	class e {
+		constructor(e, t) {
+			this.first = e, this.second = t;
 		}
 	}
-	return out.Local = Global, new Global(1, 2);
+	return out.Local = e, new e(1, 2, 3, 4);
 }
-out.Global = Global, out.global = new Global(1, 2, 3), out.constructUnknown = constructUnknown, out.constructLocal = constructLocal;
+out.constructLocal = constructLocal;
 class MutableClass {}
+condition && (MutableClass = ExternalClass), out.MutableClass = MutableClass, out.mutableClass = new MutableClass(1, 2, 3);
 function MutableFunction() {}
-condition && (MutableClass = ExternalClass), out.MutableClass = MutableClass, out.mutableClass = new MutableClass(1, 2, 3), condition && (MutableFunction = ExternalFunction), out.MutableFunction = MutableFunction, out.mutableFunction = new MutableFunction(1, 2, 3);
-var DifferentArity = function(value) {
-	this.value = value;
+condition && (MutableFunction = ExternalFunction), out.MutableFunction = MutableFunction, out.mutableFunction = new MutableFunction(1, 2, 3);
+var DifferentArity = function(e) {
+	this.value = e;
 };
-condition && (DifferentArity = function(first, s
... [truncated]
```

## `swc/issues/7412`

- size: oxc 122 vs reference 211 (-89 bytes)

```js
export function throttleTime(interval) {
	let currentValue;
	let timeout;
	return (done) => (value) => {
		currentValue = value;
		if (timeout) {
			return;
		}
		timeout = setTimeout(() => {
			done(currentValue);
		}, interval);
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-export function throttleTime(interval) {
-	let currentValue, timeout;
-	return (done) => (value) => {
-		currentValue = value, timeout || (timeout = setTimeout(() => {
-			done(currentValue);
-		}, interval));
+export function e(e) {
+	let t, n;
+	return (r) => (i) => {
+		t = i, !n && (n = setTimeout(() => {
+			r(t);
+		}, e));
 	};
 }

```

## `swc/issues/9610-mixed-params`

- size: oxc 746 vs reference 835 (-89 bytes)

```js
// Test: Mixed used and unused parameters with defaults
// All params used
function allUsed(a, b = 10, c = 20) {
	return a + b + c;
}
// Only first param used, rest with defaults unused
function firstUsed(a, b = 10, c = 20, d = 30) {
	return a;
}
// Middle param unused
function middleUnused(a, b = 10, c = 20) {
	return a + c;
}
// First param unused (but not with default)
function firstParamUnused(a, b = 10, c = 20) {
	return b + c;
}
// Param with default used, regular param at end unused
// Note: trailing regular params after used default should be removable
function trailingUnused(a, b = 10, c) {
	return a + b;
}
// Rest parameter with default params before it
function withRest(a, b = 10, ...rest) {
	return a + rest.length;
}
export function example() {
	return allUsed(1) + firstUsed(2) + middleUnused(3) + firstParamUnused(4) + trailingUnused(5) + withRest(6);
}

```

```diff
--- reference
+++ oxc
@@ -1,29 +1,29 @@
 // Test: Mixed used and unused parameters with defaults
 // All params used
-function allUsed(a, b = 10, c = 20) {
-	return a + b + c;
+function e(e, t = 10, n = 20) {
+	return e + t + n;
 }
 // Only first param used, rest with defaults unused
-function firstUsed(a) {
-	return a;
+function t(e, t = 10, n = 20, r = 30) {
+	return e;
 }
 // Middle param unused
-function middleUnused(a, c = 20) {
-	return a + c;
+function n(e, t = 10, n = 20) {
+	return e + n;
 }
 // First param unused (but not with default)
-function firstParamUnused(a, b = 10, c = 20) {
-	return b + c;
+function r(e, t = 10, n = 20) {
+	return t + n;
 }
 // Param with default used, regular param at end unused
 // Note: trailing regular params after used default should be removable
-function trailingUnused(a, b = 10) {
-	return a + b;
+function i(e, t = 10, n) {
+	return e + t;
 }
 // Rest parameter with default params before it
-function withRest(a, ...rest) {
-	return a + rest.length;
+function a(e, t = 10, ...n) {
+	return e + n.length;
 }
-export function example() {
-	return allUsed(1) + firstUsed(2) + middleUnused(3) + firstParamUnused(4) + trailingUnused(5) + withRest(6);
+export function o() {
+	return e(1) + t(2) + n(3) + r(4) + i(5) + a(6);
 }

```

## `swc/issues/7009`

- size: oxc 336 vs reference 433 (-97 bytes)

```js
export const example1 = (param) => (param) => param['There is something wrong!'];
export const example2 = (param) => (param) => param['123 is fine'];
export const example3 = (param) => (param) => param['! That is fine !'];
export const example4 = (param) => (param) => param[' space in start works fine'];
export const example5 = (param) => (param) => param[123];
export class Foo extends Bar {
	foo() {
		super['a space b']();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
-export const example1 = (param) => (param) => param['There is something wrong!'];
-export const example2 = (param) => (param) => param['123 is fine'];
-export const example3 = (param) => (param) => param['! That is fine !'];
-export const example4 = (param) => (param) => param[' space in start works fine'];
-export const example5 = (param) => (param) => param[123];
-export class Foo extends Bar {
+export const e = (e) => (e) => e['There is something wrong!'];
+export const t = (e) => (e) => e['123 is fine'];
+export const n = (e) => (e) => e['! That is fine !'];
+export const r = (e) => (e) => e[' space in start works fine'];
+export const i = (e) => (e) => e[123];
+export class a extends Bar {
 	foo() {
 		super['a space b']();
 	}

```

## `swc/issues/6407/1`

- size: oxc 236 vs reference 336 (-100 bytes)

```js
export default class Demo {
	static encode(value) {
		const ranges = [];
		let range = [];
		let retrString = A.encode(value);
		let bitField = '';
		value.forEach((curValue, i) => {
			bitField += B.encode(curValue);
			range.push(i);
			ranges.push(range);
		});
		retrString += '.';
		retrString += C.encode(ranges);
		return retrString;
	}
}
console.log(Deno.encode());

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,9 @@
-export default class Demo {
-	static encode(value) {
-		let ranges = [], range = [], retrString = A.encode(value), bitField = '';
-		return value.forEach((curValue, i) => {
-			bitField += B.encode(curValue);
-			range.push(i);
-			ranges.push(range);
-		}), retrString += '.', retrString += C.encode(ranges);
+export default class e {
+	static encode(e) {
+		let t = [], n = [], r = A.encode(e), i = '';
+		return e.forEach((e, r) => {
+			i += B.encode(e), n.push(r), t.push(n);
+		}), r += '.', r += C.encode(t), r;
 	}
 }
 console.log(Deno.encode());

```

## `swc/issues/9741_threshold`

- size: oxc 59 vs reference 159 (-100 bytes)

```js
// This should NOT be hoisted since Object.assign is only used once
const a = {};
Object.assign(a, {});
// JSON.parse is used twice, so it should be hoisted
const x = JSON.parse('{}');
const y = JSON.parse('{}');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-// This should NOT be hoisted since Object.assign is only used once
-var _JSON_parse = JSON.parse;
-Object.assign({}, {}), _JSON_parse('{}'), _JSON_parse('{}');
+Object.assign({}, {}), JSON.parse('{}'), JSON.parse('{}');

```

## `swc/issues/firebase/2`

- size: oxc 326 vs reference 426 (-100 bytes)

```js
export function treeSubTree(tree, pathObj) {
	// TODO: Require pathObj to be Path?
	let path = pathObj instanceof Path ? pathObj : new Path(pathObj);
	let child = tree, next = pathGetFront(path);
	while (next !== null) {
		const childNode = safeGet(child.node.children, next) || {
			children: {},
			childCount: 0
		};
		child = new Tree(next, child, childNode);
		path = pathPopFront(path);
		next = pathGetFront(path);
	}
	return child;
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-export function treeSubTree(tree, pathObj) {
+export function e(e, t) {
 	// TODO: Require pathObj to be Path?
-	let path = pathObj instanceof Path ? pathObj : new Path(pathObj), child = tree, next = pathGetFront(path);
-	for (; null !== next;) {
-		let childNode = safeGet(child.node.children, next) || {
+	let n = t instanceof Path ? t : new Path(t), r = e, i = pathGetFront(n);
+	for (; i !== null;) {
+		let e = safeGet(r.node.children, i) || {
 			children: {},
 			childCount: 0
 		};
-		child = new Tree(next, child, childNode), next = pathGetFront(path = pathPopFront(path));
+		r = new Tree(i, r, e), n = pathPopFront(n), i = pathGetFront(n);
 	}
-	return child;
+	return r;
 }

```

## `swc/issues/11082`

- size: oxc 222 vs reference 324 (-102 bytes)

```js
import { aa, useRef } from './utils';
export function A() {
	const { o1 } = aa;
	const ref = (0, useRef)();
	const fn2 = async (value2 = (() => {
		var _ref_current;
		return (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.getValue();
	})()) => {
		console.log(o1);
	};
	return (0, _jsxruntime.jsx)(B, { fn2 });
}
export default A;

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,8 @@
-import { aa, useRef } from './utils';
-export function A() {
-	let { o1 } = aa, ref = useRef(), fn2 = async (value2 = (() => {
-		var _ref_current;
-		return null == (_ref_current = ref.current) ? void 0 : _ref_current.getValue();
-	})()) => {
-		console.log(o1);
-	};
-	return (0, _jsxruntime.jsx)(B, { fn2 });
+import { aa as e, useRef as t } from './utils';
+export function n() {
+	let { o1: n } = e, r = t();
+	return (0, _jsxruntime.jsx)(B, { fn2: async (e = r.current?.getValue()) => {
+		console.log(n);
+	} });
 }
-export default A;
+export default n;

```

## `swc/projects/next/extra/if_return/2`

- size: oxc 752 vs reference 857 (-105 bytes)

```js
export function insertRule(rule, index) {
	invariant(isString(rule), '`insertRule` accepts only strings');
	if (!this._isBrowser) {
		if (typeof index !== 'number') {
			index = this._serverSheet.cssRules.length;
		}
		this._serverSheet.insertRule(rule, index);
		return this._rulesCount++;
	}
	if (this._optimizeForSpeed) {
		var sheet = this.getSheet();
		if (typeof index !== 'number') {
			index = sheet.cssRules.length;
		}
		// https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
		try {
			sheet.insertRule(rule, index);
		} catch (error) {
			if (!isProd) {
				console.warn('StyleSheet: illegal rule: \n\n' + rule + '\n\nSee https://stackoverflow.com/q/20007992 for more info');
			}
			return -1;
		}
	} else {
		var insertionPoint = this._tags[index];
		this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
	}
	return this._rulesCount++;
}

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,17 @@
-export function insertRule(rule, index) {
-	if (invariant(isString(rule), '`insertRule` accepts only strings'), !this._isBrowser) return 'number' != typeof index && (index = this._serverSheet.cssRules.length), this._serverSheet.insertRule(rule, index), this._rulesCount++;
+export function e(e, t) {
+	if (invariant(isString(e), '`insertRule` accepts only strings'), !this._isBrowser) return typeof t != 'number' && (t = this._serverSheet.cssRules.length), this._serverSheet.insertRule(e, t), this._rulesCount++;
 	if (this._optimizeForSpeed) {
-		var sheet = this.getSheet();
-		'number' != typeof index && (index = sheet.cssRules.length);
+		var n = this.getSheet();
+		typeof t != 'number' && (t = n.cssRules.length);
 		// https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
 		try {
-			sheet.insertRule(rule, index);
-		} catch (error) {
-			return isProd || console.warn('StyleSheet: illegal rule: \n\n' + rule + '\n\nSee https://stackoverflow.com/q/20007992 for more info'), -1;
+			n.insertRule(e, t);
+		} catch {
+			return isProd || console.warn('StyleSheet: illegal rule: \n\n' + e + '\n\nSee https://stackoverflow.com/q/20007992 for more info'), -1;
 		}
 	} else {
-		var insertionPoint = this._tags[index];
-		this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
+		var r = this._tags[t];
+		this._tags.push(this.makeStyleTag(this._name, e, r));
 	}
 	return this._rulesCount++;
 }

```

## `swc/issues/8826`

- size: oxc 155 vs reference 262 (-107 bytes)

```js
export function createTypeChecker(host) {
	return { getFlowTypeOfReference };
	function getFlowTypeOfReference(reference, declaredType, initialType = declaredType, flowContainer, flowNode = ((_a2) => (_a2 = tryCast(reference, canHaveFlowNode)) == null ? void 0 : _a2.flowNode)()) {}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-export function createTypeChecker(host) {
-	return { getFlowTypeOfReference: function(reference, declaredType, initialType = declaredType, flowContainer, flowNode = ((_a2) => null == (_a2 = tryCast(reference, canHaveFlowNode)) ? void 0 : _a2.flowNode)()) {} };
+export function e(e) {
+	return { getFlowTypeOfReference: t };
+	function t(e, t, n = t, r, i = ((t) => (t = tryCast(e, canHaveFlowNode))?.flowNode)()) {}
 }

```

## `swc/next/36127/2/2`

- size: oxc 625 vs reference 737 (-112 bytes)

```js
/**
* Create a code check from a regex.
*
* @param {RegExp} regex
* @returns {(code: Code) => code is number}
*/
function regexCheck(regex) {
	return check;
	/**
	* Check whether a code matches the bound regex.
	*
	* @param {Code} code Character code
	* @returns {code is number} Whether the character code matches the bound regex
	*/
	function check(code) {
		return code !== null && regex.test(String.fromCharCode(code));
	}
}
console.log(regexCheck('Foo'));
console.log(regexCheck('Foo'));
console.log(regexCheck('Foo'));
console.log(regexCheck('Foo'));
console.log(regexCheck('Foo'));
console.log(regexCheck('Foo'));
console.log(regexCheck('Foo'));
console.log(regexCheck('Foo'));
console.log(regexCheck('Foo'));
console.log(regexCheck('Foo'));

```

```diff
--- reference
+++ oxc
@@ -3,14 +3,17 @@
 *
 * @param {RegExp} regex
 * @returns {(code: Code) => code is number}
-*/ function regexCheck(regex) {
-	return (/**
+*/
+function e(e) {
+	return t;
+	/**
 	* Check whether a code matches the bound regex.
 	*
 	* @param {Code} code Character code
 	* @returns {code is number} Whether the character code matches the bound regex
-	*/ function(code) {
-		return null !== code && regex.test(String.fromCharCode(code));
-	});
+	*/
+	function t(t) {
+		return t !== null && e.test(String.fromCharCode(t));
+	}
 }
-console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo'));
+console.log(e('Foo')), console.log(e('Foo')), console.log(e('Foo')), console.log(e('Foo')), console.log(e('Foo')), console.log(e('Foo')), console.log(e('Foo')), console.log(e('Foo')), console.log(e('Foo')), console.log(e('Foo'));

```

## `swc/projects/angular/1`

- size: oxc 0 vs reference 114 (-114 bytes)

```js
function isUndefined(value) {
	return 'undefined' == typeof value;
}
function isDefined(value) {
	return 'undefined' != typeof value;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function isUndefined(value) {
-	return void 0 === value;
-}
-function isDefined(value) {
-	return void 0 !== value;
-}

```

## `swc/issues/drop-console-shadowed`

- size: oxc 0 vs reference 121 (-121 bytes)

```js
function local() {
	const console = { log: (msg) => process.stdout.write(msg + '\n') };
	console.log('kept');
}
local();

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function local() {
-	const console = { log: (msg) => process.stdout.write(msg + '\n') };
-	console.log('kept');
-}
-local();

```

## `swc/issues/11871`

- size: oxc 496 vs reference 620 (-124 bytes)

```js
var window = {};
var foo = { min: (items) => items[0] };
var bar = {};
var bucketFactory = () => ({ utc: (input) => ({ diff: () => 0 }) });
var min = foo;
var moment = bucketFactory(bar);
const defaultSpec = {
	granularities: [{
		maxDays: 1,
		displayFormatString: '[Q]Q'
	}],
	other: 1
};
window.x = { f: (start, end) => ((inputStartDate, inputEndDate, spec = defaultSpec) => {
	let startDate = moment.utc(inputStartDate);
	let dayCount = moment.utc(inputEndDate).diff(startDate, 'days') + 1;
	let granularity = spec.granularities.sort((left, right) => left.maxDays - right.maxDays).find((item) => dayCount <= item.maxDays);
	return granularity == null ? '' : granularity.displayFormatString;
})(start, end) + String(min.min([1, 2])) };
console.log(window.x.f(0, 0));

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-var window = {}, moment_utc = (input) => ({ diff: () => 0 });
-const defaultSpec = {
+var e = {}, t = { min: (e) => e[0] }, n = {}, r = () => ({ utc: (e) => ({ diff: () => 0 }) }), i = t, a = r(n);
+const o = {
 	granularities: [{
 		maxDays: 1,
 		displayFormatString: '[Q]Q'
 	}],
 	other: 1
 };
-window.x = { f: (start, end) => ((inputStartDate, inputEndDate, spec = defaultSpec) => {
-	let startDate = moment_utc(inputStartDate), dayCount = moment_utc(inputEndDate).diff(startDate, 'days') + 1, granularity = spec.granularities.sort((left, right) => left.maxDays - right.maxDays).find((item) => dayCount <= item.maxDays);
-	return null == granularity ? '' : granularity.displayFormatString;
-})(start, end) + String(1) }, console.log(window.x.f(0, 0));
+e.x = { f: (e, t) => ((e, t, n = o) => {
+	let r = a.utc(e), i = a.utc(t).diff(r, 'days') + 1, s = n.granularities.sort((e, t) => e.maxDays - t.maxDays).find((e) => i <= e.maxDays);
+	return s == null ? '' : s.displayFormatString;
+})(e, t) + String(i.min([1, 2])) }, console.log(e.x.f(0, 0));

```

## `swc/issues/vercel/004`

- size: oxc 446 vs reference 572 (-126 bytes)

```js
export function ItemsList() {
	var _ref;
	var _temp, _this, _ret;
	_classCallCheck(this, ItemsList);
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}
	return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ItemsList.__proto__ || Object.getPrototypeOf(ItemsList)).call.apply(_ref, [this].concat(args))), _this), _this.storeHighlightedItemReference = function(highlightedItem) {
		_this.props.onHighlightedItemChange(highlightedItem === null ? null : highlightedItem.item);
	}, _temp), _possibleConstructorReturn(_this, _ret);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
-export function ItemsList() {
-	_classCallCheck(this, ItemsList);
-	for (var _ref, _temp, _this, _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
-	return _temp = _this = _possibleConstructorReturn(this, (_ref = ItemsList.__proto__ || Object.getPrototypeOf(ItemsList)).call.apply(_ref, [this].concat(args))), _this.storeHighlightedItemReference = function(highlightedItem) {
-		_this.props.onHighlightedItemChange(null === highlightedItem ? null : highlightedItem.item);
-	}, _possibleConstructorReturn(_this, _temp);
+export function e() {
+	var t, n, r, i;
+	_classCallCheck(this, e);
+	for (var a = arguments.length, o = Array(a), s = 0; s < a; s++) o[s] = arguments[s];
+	return i = (n = (r = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [this].concat(o))), r), r.storeHighlightedItemReference = function(e) {
+		r.props.onHighlightedItemChange(e === null ? null : e.item);
+	}, n), _possibleConstructorReturn(r, i);
 }

```

## `swc/projects/backbone/6`

- size: oxc 0 vs reference 128 (-128 bytes)

```js
function foo() {
	return !error ? !0 : (this.trigger('invalid', this, error, _.extend(options, { validationError: error })), !1);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function foo() {
-	return !error || (this.trigger('invalid', this, error, _.extend(options, { validationError: error })), !1);
-}

```

## `swc/projects/backbone/8`

- size: oxc 0 vs reference 128 (-128 bytes)

```js
function foo() {
	return !model.validationError ? model : (this.trigger('invalid', this, model.validationError, options), !1);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function foo() {
-	return model.validationError ? (this.trigger('invalid', this, model.validationError, options), !1) : model;
-}

```

## `swc/issues/9610-keep-fargs`

- size: oxc 134 vs reference 279 (-145 bytes)

```js
// Test: keep_fargs: true should preserve function argument count
// The unused parameter with default value should NOT be removed
const defaultMessage = 'hello';
function foo(a, b = defaultMessage) {
	return a;
}
function bar(x, y, z = 42) {
	return x + y;
}
export function example() {
	return foo(1) + bar(2, 3);
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,9 @@
-// Test: keep_fargs: true should preserve function argument count
-// The unused parameter with default value should NOT be removed
-function foo(a, b = 'hello') {
-	return a;
+function e(e, t = 'hello') {
+	return e;
 }
-function bar(x, y, z = 42) {
-	return x + y;
+function t(e, t, n = 42) {
+	return e + t;
 }
-export function example() {
-	return foo(1) + bar(2, 3);
+export function n() {
+	return e(1) + t(2, 3);
 }

```

## `swc/issues/3256/2`

- size: oxc 370 vs reference 516 (-146 bytes)

```js
// real life example taken from https://github.com/nodeca/pako/blob/master/lib/zlib/adler32.js#L26
const adler32 = (adler, buf, len, pos) => {
	let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
	while (len !== 0) {
		// Set limit ~ twice less than 5552, to keep
		// s2 in 31-bits, because we force signed ints.
		// in other case %= will fail.
		n = len > 2e3 ? 2e3 : len;
		len -= n;
		do {
			s1 = s1 + buf[pos++] | 0;
			s2 = s2 + s1 | 0;
		} while (--n);
		s1 %= 65521;
		s2 %= 65521;
	}
	return s1 | s2 << 16 | 0;
};
export default adler32;

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,13 @@
 // real life example taken from https://github.com/nodeca/pako/blob/master/lib/zlib/adler32.js#L26
-export default ((adler, buf, len, pos) => {
-	let s1 = 65535 & adler, s2 = adler >>> 16 & 65535, n = 0;
-	for (; 0 !== len;) {
-		// Set limit ~ twice less than 5552, to keep
-		// s2 in 31-bits, because we force signed ints.
-		// in other case %= will fail.
-		n = len > 2e3 ? 2e3 : len, len -= n;
+const e = (e, t, n, r) => {
+	let i = e & 65535 | 0, a = e >>> 16 & 65535 | 0, o = 0;
+	for (; n !== 0;) {
+		o = n > 2e3 ? 2e3 : n, n -= o;
 		do
-			s2 = s2 + (s1 = s1 + buf[pos++] | 0) | 0;
-		while (--n);
-		s1 %= 65521, s2 %= 65521;
+			i = i + t[r++] | 0, a = a + i | 0;
+		while (--o);
+		i %= 65521, a %= 65521;
 	}
-	return s1 | s2 << 16;
-});
+	return i | a << 16 | 0;
+};
+export default e;

```

## `swc/issues/8119`

- size: oxc 274 vs reference 420 (-146 bytes)

```js
const myArr = [];
// function with side effect
function foo(arr) {
	arr.push('foo');
	return 'foo';
}
let a;
if (Math.random() > .5) {
	a = true;
}
// the function call below should always run
// regardless of whether `a` is `undefined`
let b = foo(myArr);
// const seems to keep this line here instead of
// moving it behind the logitcal nullish assignment
// const b = foo(myArr);
a ??= b;
console.log(a);
console.log(myArr);

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,11 @@
-let a;
-const myArr = [];
+const e = [];
 // function with side effect
-function foo(arr) {
-	return arr.push('foo'), 'foo';
+function t(e) {
+	return e.push('foo'), 'foo';
 }
-Math.random() > .5 && (a = !0);
+let n;
+Math.random() > .5 && (n = !0);
 // the function call below should always run
 // regardless of whether `a` is `undefined`
-let b = foo(myArr);
-// const seems to keep this line here instead of
-// moving it behind the logitcal nullish assignment
-// const b = foo(myArr);
-a ??= b;
-console.log(a);
-console.log(myArr);
+let r = t(e);
+n ??= r, console.log(n), console.log(e);

```

## `swc/issues/react-instancesearch/001`

- size: oxc 471 vs reference 622 (-151 bytes)

```js
import { defer } from './utils';
export default function createWidgetsManager(onWidgetsUpdate) {
	const widgets = [];
	// Is an update scheduled?
	let scheduled = false;
	// The state manager's updates need to be batched since more than one
	// component can register or unregister widgets during the same tick.
	function scheduleUpdate() {
		if (scheduled) {
			return;
		}
		scheduled = true;
		defer(() => {
			scheduled = false;
			onWidgetsUpdate();
		});
	}
	return {
		registerWidget(widget) {
			widgets.push(widget);
			scheduleUpdate();
			return function unregisterWidget() {
				widgets.splice(widgets.indexOf(widget), 1);
				scheduleUpdate();
			};
		},
		update: scheduleUpdate,
		getWidgets() {
			return widgets;
		}
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,22 @@
-import { defer } from './utils';
-export default function createWidgetsManager(onWidgetsUpdate) {
-	let widgets = [], scheduled = !1;
+import { defer as e } from './utils';
+export default function t(t) {
+	let n = [], r = !1;
 	// The state manager's updates need to be batched since more than one
 	// component can register or unregister widgets during the same tick.
-	function scheduleUpdate() {
-		scheduled || (scheduled = !0, defer(() => {
-			scheduled = !1, onWidgetsUpdate();
+	function i() {
+		r || (r = !0, e(() => {
+			r = !1, t();
 		}));
 	}
 	return {
-		registerWidget: (widget) => (widgets.push(widget), scheduleUpdate(), function() {
-			widgets.splice(widgets.indexOf(widget), 1), scheduleUpdate();
-		}),
-		update: scheduleUpdate,
-		getWidgets: () => widgets
+		registerWidget(e) {
+			return n.push(e), i(), function() {
+				n.splice(n.indexOf(e), 1), i();
+			};
+		},
+		update: i,
+		getWidgets() {
+			return n;
+		}
 	};
 }

```

## `swc/issues/11684/identifier-aliases`

- size: oxc 325 vs reference 477 (-152 bytes)

```js
function FunctionTarget(value) {
	this.value = value;
}
var FunctionAlias = FunctionTarget;
out.FunctionAlias = FunctionAlias;
out.functionAlias = new FunctionAlias(1, 2, 3);
class ClassTarget {
	constructor(value) {
		this.value = value;
	}
}
var ClassAlias = ClassTarget;
out.ClassAlias = ClassAlias;
out.classAlias = new ClassAlias(1, 2, 3);
var { DestructuredCtor } = constructors;
out.DestructuredCtor = DestructuredCtor;
out.destructured = new DestructuredCtor(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,14 @@
-function FunctionTarget(value) {
-	this.value = value;
+function e(e) {
+	this.value = e;
 }
-var FunctionAlias = FunctionTarget;
-out.FunctionAlias = FunctionAlias;
-out.functionAlias = new FunctionAlias(1, 2, 3);
-class ClassTarget {
-	constructor(value) {
-		this.value = value;
+var t = e;
+out.FunctionAlias = t, out.functionAlias = new t(1, 2, 3);
+class n {
+	constructor(e) {
+		this.value = e;
 	}
 }
-var ClassAlias = ClassTarget;
-out.ClassAlias = ClassAlias;
-out.classAlias = new ClassAlias(1, 2, 3);
-var { DestructuredCtor } = constructors;
-out.DestructuredCtor = DestructuredCtor;
-out.destructured = new DestructuredCtor(1, 2, 3);
+var r = n;
+out.ClassAlias = r, out.classAlias = new r(1, 2, 3);
+var { DestructuredCtor: i } = constructors;
+out.DestructuredCtor = i, out.destructured = new i(1, 2, 3);

```

## `swc/issues/10539`

- size: oxc 89 vs reference 242 (-153 bytes)

```js
// class def completely disappears
var DisappearsCompletely = class DisappearsCompletelyClass {};
// class def disappears, leaving only `new DoesntWorkClass()` as output
var DoesntWork = class DoesntWorkClass {
	static prop = new DoesntWorkClass();
};
// works fine
class WorksClass {
	static prop = new WorksClass();
}
;

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
-// class def completely disappears
-// class def disappears, leaving only `new DoesntWorkClass()` as output
-(class DoesntWorkClass {
-	static prop = new DoesntWorkClass();
+(class e {
+	static prop = new e();
 });
 // works fine
-class WorksClass {
-	static prop = new WorksClass();
+class e {
+	static prop = new e();
 }

```

## `swc/issues/arguments-parameter-injection-limit`

- size: oxc 0 vs reference 155 (-155 bytes)

```js
function withinLimit() {
	return arguments[4];
}
function exceedsLimit() {
	return arguments[5];
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function withinLimit(argument_0, argument_1, argument_2, argument_3, argument_4) {
-	return argument_4;
-}
-function exceedsLimit() {
-	return arguments[5];
-}

```

## `swc/next/30498/1`

- size: oxc 416 vs reference 573 (-157 bytes)

```js
export function string_create() {
	return new StringSchema();
}
export class StringSchema extends BaseSchema {
	matches(regex, options) {
		let excludeEmptyString = false;
		let message;
		let name;
		if (options) {
			if (typeof options === 'object') {
				({excludeEmptyString = false, message, name} = options);
			} else {
				message = options;
			}
		}
		return this.test({
			name: name || 'matches',
			message: message || string.matches,
			params: { regex },
			test: (value) => isAbsent(value) || value === '' && excludeEmptyString || value.search(regex) !== -1
		});
	}
}
string_create.prototype = StringSchema.prototype;

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,15 @@
-export function string_create() {
-	return new StringSchema();
+export function e() {
+	return new t();
 }
-export class StringSchema extends BaseSchema {
-	matches(regex, options) {
-		let message, name, excludeEmptyString = !1;
-		return options && ('object' == typeof options ? {excludeEmptyString = !1, message, name} = options : message = options), this.test({
-			name: name || 'matches',
-			message: message || string.matches,
-			params: { regex },
-			test: (value) => isAbsent(value) || '' === value && excludeEmptyString || -1 !== value.search(regex)
+export class t extends BaseSchema {
+	matches(e, t) {
+		let n = !1, r, i;
+		return t && (typeof t == 'object' ? {excludeEmptyString: n = !1, message: r, name: i} = t : r = t), this.test({
+			name: i || 'matches',
+			message: r || string.matches,
+			params: { regex: e },
+			test: (t) => isAbsent(t) || t === '' && n || t.search(e) !== -1
 		});
 	}
 }
-string_create.prototype = StringSchema.prototype;
+e.prototype = t.prototype;

```

## `swc/issues/5846`

- size: oxc 498 vs reference 668 (-170 bytes)

```js
function processNode(node, index, parent, pathNodes) {
	const children = node ? node[mergeChildrenPropName] : dataNodes;
	const pos = node ? getPosition(parent.pos, index) : '0';
	const connectNodes = node ? [...pathNodes, node] : [];
	// Process node if is not root
	if (node) {
		const key = syntheticGetKey(node, pos);
		const data = {
			node,
			index,
			pos,
			key,
			parentPos: parent.node ? parent.pos : null,
			level: parent.level + 1,
			nodes: connectNodes
		};
		callback(data);
	}
	// Process children node
	if (children) {
		children.forEach((subNode, subIndex) => {
			processNode(subNode, subIndex, {
				node,
				pos,
				level: parent ? parent.level + 1 : -1
			}, connectNodes);
		});
	}
}
processNode(null);

```

```diff
--- reference
+++ oxc
@@ -1,24 +1,25 @@
-!function processNode(node, index, parent, pathNodes) {
-	let children = node ? node[mergeChildrenPropName] : dataNodes, pos = node ? getPosition(parent.pos, index) : '0', connectNodes = node ? [...pathNodes, node] : [];
+function e(t, n, r, i) {
+	let a = t ? t[mergeChildrenPropName] : dataNodes, o = t ? getPosition(r.pos, n) : '0', s = t ? [...i, t] : [];
 	// Process node if is not root
-	if (node) {
-		let key = syntheticGetKey(node, pos);
-		callback({
-			node,
-			index,
-			pos,
-			key,
-			parentPos: parent.node ? parent.pos : null,
-			level: parent.level + 1,
-			nodes: connectNodes
-		});
+	if (t) {
+		let e = {
+			node: t,
+			index: n,
+			pos: o,
+			key: syntheticGetKey(t, o),
+			parentPos: r.node ? r.pos : null,
+			level: r.level + 1,
+			nodes: s
+		};
+		callback(e);
 	}
 	// Process children node
-	children && children.forEach((subNode, subIndex) => {
-		processNode(subNode, subIndex, {
-			node,
-			pos,
-			level: parent ? parent.level + 1 : -1
-		}, connectNodes);
+	a && a.forEach((n, i) => {
+		e(n, i, {
+			node: t,
+			pos: o,
+			level: r ? r.level + 1 : -1
+		}, s);
 	});
-}(null);
+}
+e(null);

```

## `swc/issues/7568/1`

- size: oxc 274 vs reference 447 (-173 bytes)

```js
var specific_microfront;
(function() {
	'use strict';
	var __webpack_modules__ = {};
	function __webpack_require__(moduleId) {
		var module = __webpack_module_cache__[moduleId] = {
			id: moduleId,
			loaded: false,
			exports: {}
		};
		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		module.loaded = true;
		return module.exports;
	}
	var __webpack_exports__ = __webpack_require__('webpack/container/entry/specific_page');
	specific_microfront = __webpack_exports__;
})();

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
-var specific_microfront;
-!function() {
+(function() {
 	'use strict';
-	var __webpack_modules__ = {};
-	specific_microfront = function __webpack_require__(moduleId) {
-		var module = __webpack_module_cache__[moduleId] = {
-			id: moduleId,
+	var e = {};
+	function t(n) {
+		var r = __webpack_module_cache__[n] = {
+			id: n,
 			loaded: !1,
 			exports: {}
 		};
-		return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.loaded = !0, module.exports;
-	}('webpack/container/entry/specific_page');
-}();
+		return e[n].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports;
+	}
+	t('webpack/container/entry/specific_page');
+})();

```

## `swc/issues/4386/2`

- size: oxc 170 vs reference 352 (-182 bytes)

```js
var application;
(() => {
	var __webpack_require__ = {};
	(() => {
		__webpack_require__.d = (exports, definition) => {};
	})();
	(() => {
		__webpack_require__.o = (obj, prop) => {};
	})();
	(() => {
		__webpack_require__.r = (exports) => {};
	})();
	var __webpack_exports__ = {};
	__webpack_require__.r(__webpack_exports__);
	__webpack_require__.d(__webpack_exports__, { 'bootstrap': () => bootstrap });
	function bootstrap() {
		alert();
	}
	application = __webpack_exports__;
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
-var __webpack_require__ = {};
-__webpack_require__.d = (exports, definition) => {}, __webpack_require__.o = (obj, prop) => {}, __webpack_require__.r = (exports) => {};
-var __webpack_exports__ = {};
-function bootstrap() {
-	alert();
-}
-__webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, { bootstrap: () => bootstrap });
+(() => {
+	var e = {};
+	e.d = (e, t) => {}, e.o = (e, t) => {}, e.r = (e) => {};
+	var t = {};
+	e.r(t), e.d(t, { bootstrap: () => n });
+	function n() {
+		alert();
+	}
+})();

```

## `swc/issues/10859`

- size: oxc 325 vs reference 511 (-186 bytes)

```js
// Test cases for arrow function IIFE in sequence expressions (Issue #10859)
// Case 1: Simple arrow IIFE in sequence expression
console.log('start'), (() => {
	console.log('middle');
})(), console.log('end');
// Case 2: Arrow IIFE returning value in sequence
var x = (console.log('before'), (() => 42)(), console.log('after'));
// Case 3: Multiple arrow IIFEs in sequence
(() => {
	console.log('first');
})(), (() => {
	console.log('second');
})();
// Case 4: Arrow IIFE with parameters in sequence
var y = (console.log('setup'), ((param) => param + 1)(5), console.log('done'));
// Case 5: Arrow IIFE expression (not block) in sequence
var a = (console.log('expr'), (() => 42 + 8)(), console.log('result'));
// Case 6: Arrow IIFE with simple expression body
var b = (1, (() => 2 + 3)(), 4);
// Case 7: Arrow IIFE with single parameter
var c = (0, ((x) => x * 2)(10), 1);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,2 @@
-// Test cases for arrow function IIFE in sequence expressions (Issue #10859)
-// Case 1: Simple arrow IIFE in sequence expression
-console.log('start'), console.log('middle'), console.log('end');
-// Case 2: Arrow IIFE returning value in sequence
-var x = (console.log('before'), console.log('after'));
-console.log('first'), console.log('second');
-// Case 4: Arrow IIFE with parameters in sequence
-var y = (console.log('setup'), console.log('done')), a = (console.log('expr'), console.log('result')), b = 4, c = 1;
+// Case 3: Multiple arrow IIFEs in sequence
+console.log('start'), console.log('middle'), console.log('end'), console.log('before'), console.log('after'), console.log('first'), console.log('second'), console.log('setup'), ((e) => e + 1)(5), console.log('done'), console.log('expr'), console.log('result'), ((e) => e * 2)(10);

```

## `swc/issues/7683/1`

- size: oxc 136 vs reference 328 (-192 bytes)

```js
{
	let Infinity = 3;
	console.log(Infinity);
	if (Infinity > 4) console.log('Infinity');
}
{
	let NaN = 3;
	console.log(NaN);
	if (NaN < 4) console.log('NaN');
}
{
	let undefined = 3;
	console.log(undefined);
	if (undefined < 4) console.log('undefined');
}
{
	let x = 3;
	console.log(x);
	if (x < 4) console.log('undefined');
}

```

```diff
--- reference
+++ oxc
@@ -1,20 +1 @@
-{
-	let Infinity = 3;
-	console.log(Infinity);
-	if (Infinity > 4) console.log('Infinity');
-}
-{
-	let NaN = 3;
-	console.log(NaN);
-	if (NaN < 4) console.log('NaN');
-}
-{
-	let undefined = 3;
-	console.log(undefined);
-	if (undefined < 4) console.log('undefined');
-}
-{
-	let x = 3;
-	console.log(x);
-	if (x < 4) console.log('undefined');
-}
+console.log(3), console.log(3), console.log('NaN'), console.log(3), console.log('undefined'), console.log(3), console.log('undefined');

```

## `swc/issues/7194/1`

- size: oxc 0 vs reference 198 (-198 bytes)

```js
function example() {
	var MyEnum = function(MyEnumInner) {
		MyEnumInner['First'] = 'first';
		MyEnumInner['Second'] = 'second';
		return MyEnumInner;
	}(MyEnum || {});
	return MyEnum;
}
example();

```

```diff
--- reference
+++ oxc
@@ -1,9 +0,0 @@
-function example() {
-	var MyEnum = function(MyEnumInner) {
-		MyEnumInner['First'] = 'first';
-		MyEnumInner['Second'] = 'second';
-		return MyEnumInner;
-	}(MyEnum || {});
-	return MyEnum;
-}
-example();

```

## `swc/projects/react/3`

- size: oxc 0 vs reference 202 (-202 bytes)

```js
function warn(format) {
	{
		for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}
		printWarning('warn', format, args);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function warn(format) {
-	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
-	printWarning('warn', format, args);
-}

```

## `swc/issues/react/hooks/4`

- size: oxc 481 vs reference 687 (-206 bytes)

```js
'use strict';
var router = __webpack_require__(86677);
var index_esm = __webpack_require__(45205);
var use_team = __webpack_require__(502);
var fetch_api = __webpack_require__(78869);
var authenticate = __webpack_require__(16966);
var api_endpoints = __webpack_require__(96236);
var qs = __webpack_require__(70326);
export function useProjectBranches(projectId, opts) {
	var token = (0, authenticate.LP)();
	var ref = (0, use_team.ZP)(), team = ref.team;
	var teamId = team === null || team === void 0 ? void 0 : team.id;
	return (0, index_esm.ZP)(projectId ? ''.concat(api_endpoints.Ms, '/git-branches').concat((0, qs.c)({
		projectId,
		teamId
	})) : '', function(endpoint) {
		return (0, fetch_api.Z)(endpoint, token, { throwOnHTTPError: true });
	}, opts);
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 'use strict';
 __webpack_require__(86677);
-var index_esm = __webpack_require__(45205), use_team = __webpack_require__(502), fetch_api = __webpack_require__(78869), authenticate = __webpack_require__(16966), api_endpoints = __webpack_require__(96236), qs = __webpack_require__(70326);
-export function useProjectBranches(projectId, opts) {
-	var token = (0, authenticate.LP)(), team = (0, use_team.ZP)().team, teamId = null == team ? void 0 : team.id;
-	return (0, index_esm.ZP)(projectId ? ''.concat(api_endpoints.Ms, '/git-branches').concat((0, qs.c)({
-		projectId,
-		teamId
-	})) : '', function(endpoint) {
-		return (0, fetch_api.Z)(endpoint, token, { throwOnHTTPError: !0 });
-	}, opts);
+var e = __webpack_require__(45205), t = __webpack_require__(502), n = __webpack_require__(78869), r = __webpack_require__(16966), i = __webpack_require__(96236), a = __webpack_require__(70326);
+export function o(o, s) {
+	var c = (0, r.LP)(), l = (0, t.ZP)().team?.id;
+	return (0, e.ZP)(o ? `${i.Ms}/git-branches${(0, a.c)({
+		projectId: o,
+		teamId: l
+	})}` : '', function(e) {
+		return (0, n.Z)(e, c, { throwOnHTTPError: !0 });
+	}, s);
 }

```

## `swc/projects/underscore/15`

- size: oxc 0 vs reference 208 (-208 bytes)

```js
function foo(a, b) {
	var aCtor = a.constructor, bCtor = b.constructor;
	if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor)) {
		return false;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function foo(a, b) {
-	var aCtor = a.constructor, bCtor = b.constructor;
-	if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor)) return !1;
-}

```

## `swc/issues/11684/bindings`

- size: oxc 495 vs reference 705 (-210 bytes)

```js
const FunctionBinding = function(value) {
	this.value = value;
};
out.FunctionBinding = FunctionBinding;
out.functionBinding = new FunctionBinding(1, 2, 3);
let ClassBinding = class {
	constructor(value) {
		this.value = value;
	}
};
out.ClassBinding = ClassBinding;
out.classBinding = new ClassBinding(1, 2, 3);
let AssignedFunction;
AssignedFunction = function(first, second) {
	this.first = first;
	this.second = second;
};
out.AssignedFunction = AssignedFunction;
out.assignedFunction = new AssignedFunction(1, 2, 3, 4);
let AssignedClass;
AssignedClass = class {
	constructor(first, second) {
		this.first = first;
		this.second = second;
	}
};
out.AssignedClass = AssignedClass;
out.assignedClass = new AssignedClass(1, 2, 3, 4);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,20 @@
-let AssignedFunction, AssignedClass;
-const FunctionBinding = function(value) {
-	this.value = value;
+const e = function(e) {
+	this.value = e;
 };
-out.FunctionBinding = FunctionBinding, out.functionBinding = new FunctionBinding(1);
-let ClassBinding = class {
-	constructor(value) {
-		this.value = value;
+out.FunctionBinding = e, out.functionBinding = new e(1, 2, 3);
+let t = class {
+	constructor(e) {
+		this.value = e;
 	}
 };
-out.ClassBinding = ClassBinding, out.classBinding = new ClassBinding(1), AssignedFunction = function(first, second) {
-	this.first = first, this.second = second;
-}, out.AssignedFunction = AssignedFunction, out.assignedFunction = new AssignedFunction(1, 2), AssignedClass = class {
-	constructor(first, second) {
-		this.first = first, this.second = second;
+out.ClassBinding = t, out.classBinding = new t(1, 2, 3);
+let n = function(e, t) {
+	this.first = e, this.second = t;
+};
+out.AssignedFunction = n, out.assignedFunction = new n(1, 2, 3, 4);
+let r;
+r = class {
+	constructor(e, t) {
+		this.first = e, this.second = t;
 	}
-}, out.AssignedClass = AssignedClass, out.assignedClass = new AssignedClass(1, 2);
+}, out.AssignedClass = r, out.assignedClass = new r(1, 2, 3, 4);

```

## `swc/issues/11684/constructor-scopes`

- size: oxc 657 vs reference 867 (-210 bytes)

```js
class ExplicitDerived extends Base {
	constructor(value) {
		super(value);
	}
}
out.ExplicitDerived = ExplicitDerived;
out.explicitDerived = new ExplicitDerived(1, 2, 3);
class NestedFunctionArguments {
	constructor(value) {
		function count() {
			return arguments.length;
		}
		this.value = value;
		this.count = count(1, 2, 3);
	}
}
out.NestedFunctionArguments = NestedFunctionArguments;
out.nestedFunctionArguments = new NestedFunctionArguments(1, 2, 3);
class MethodArguments {
	constructor(value) {
		this.value = value;
	}
	count() {
		return arguments.length;
	}
}
out.MethodArguments = MethodArguments;
out.methodArguments = new MethodArguments(1, 2, 3);
class StructuredParameters {
	constructor({ value }, other = 2) {
		this.value = value;
		this.other = other;
	}
}
out.StructuredParameters = StructuredParameters;
out.structuredParameters = new StructuredParameters({ value: 1 }, undefined, 3, 4);

```

```diff
--- reference
+++ oxc
@@ -1,29 +1,30 @@
-class ExplicitDerived extends Base {
-	constructor(value) {
-		super(value);
+class e extends Base {
+	constructor(e) {
+		super(e);
 	}
 }
-out.ExplicitDerived = ExplicitDerived, out.explicitDerived = new ExplicitDerived(1);
-class NestedFunctionArguments {
-	constructor(value) {
-		this.value = value, this.count = function() {
+out.ExplicitDerived = e, out.explicitDerived = new e(1, 2, 3);
+class t {
+	constructor(e) {
+		function t() {
 			return arguments.length;
-		}(1, 2, 3);
+		}
+		this.value = e, this.count = t(1, 2, 3);
 	}
 }
-out.NestedFunctionArguments = NestedFunctionArguments, out.nestedFunctionArguments = new NestedFunctionArguments(1);
-class MethodArguments {
-	constructor(value) {
-		this.value = value;
+out.NestedFunctionArguments = t, out.nestedFunctionArguments = new t(1, 2, 3);
+class n {
+	constructor(e) {
+		this.value = e;
 	}
 	count() {
 		return arguments.length;
 	}
 }
-out.MethodArguments = MethodArguments, out.methodArguments = new MethodArguments(1);
-class StructuredParameters {
-	constructor({ value }, other = 2) {
-		this.value = value, this.other = other;
+out.MethodArguments = n, out.methodArguments = new n(1, 2, 3);
+class r {
+	constructor({ value: e }, t = 2) {
+		this.value = e, this.other = t;
 	}
 }
-out.StructuredParameters = StructuredParameters, out.structuredParameters = new StructuredParameters({ value: 1 }, void 0);
+out.StructuredParameters = r, out.structuredParameters = new r({ value: 1 }, void 0, 3, 4);

```

## `swc/issues/6864`

- size: oxc 307 vs reference 518 (-211 bytes)

```js
export function removeFromMatrix(matrix, id) {
	var newMatrix;
	var indexOfIdToRemove;
	var row = _.find(matrix, (entry, index) => {
		if (_.includes(entry, id)) {
			indexOfIdToRemove = index;
			return entry;
		}
	});
	if (!row) {
		return matrix;
	}
	if (row.length === 1) {
		newMatrix = _.without(matrix, row);
		if (newMatrix[0].length === 2) {
			const remainingEntry = newMatrix[0];
			newMatrix = [[remainingEntry[0]], [remainingEntry[1]]];
		}
	} else {
		newMatrix = [...matrix];
		newMatrix[indexOfIdToRemove] = _.without(row, id);
	}
	return newMatrix || matrix;
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
-export function removeFromMatrix(matrix, id) {
-	var newMatrix, indexOfIdToRemove, row = _.find(matrix, (entry, index) => {
-		if (_.includes(entry, id)) return indexOfIdToRemove = index, entry;
+export function e(e, t) {
+	var n, r, i = _.find(e, (e, n) => {
+		if (_.includes(e, t)) return r = n, e;
 	});
-	if (!row) return matrix;
-	if (1 === row.length) {
-		if (2 === (newMatrix = _.without(matrix, row))[0].length) {
-			let remainingEntry = newMatrix[0];
-			newMatrix = [[remainingEntry[0]], [remainingEntry[1]]];
+	if (!i) return e;
+	if (i.length === 1) {
+		if (n = _.without(e, i), n[0].length === 2) {
+			let e = n[0];
+			n = [[e[0]], [e[1]]];
 		}
-	} else (newMatrix = [...matrix])[indexOfIdToRemove] = _.without(row, id);
-	return newMatrix || matrix;
+	} else n = [...e], n[r] = _.without(i, t);
+	return n || e;
 }

```

## `swc/projects/next/archive-1/916.2317bfea2c41354132bd`

- size: oxc 305 vs reference 524 (-219 bytes)

```js
'use strict';
(self['webpackChunk_N_E'] = self['webpackChunk_N_E'] || []).push([[916, 974], { 
/***/ 6974: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
	__webpack_require__.r(__webpack_exports__);
	/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4512);
	/* harmony default export */ __webpack_exports__['default'] = function() {
		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 1' });
	};
	/***/
} }]);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 'use strict';
 (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[916, 974], { 
-/***/ 6974: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
-	__webpack_require__.r(__webpack_exports__);
-	/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4512);
-	/* harmony default export */ __webpack_exports__.default = function() {
-		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 1' });
+/***/ 6974: /***/ function(e, t, n) {
+	n.r(t);
+	/* harmony import */ var r = n(4512);
+	/* harmony default export */ t.default = function() {
+		return (0, r.jsx)('p', { children: 'Hello World 1' });
 	};
-	/***/} }]);
+	/***/
+} }]);

```

## `swc/projects/next/archive-1/974.b9fed4786fc6d4a5745d`

- size: oxc 305 vs reference 524 (-219 bytes)

```js
'use strict';
(self['webpackChunk_N_E'] = self['webpackChunk_N_E'] || []).push([[974, 916], { 
/***/ 6974: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
	__webpack_require__.r(__webpack_exports__);
	/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4512);
	/* harmony default export */ __webpack_exports__['default'] = function() {
		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 1' });
	};
	/***/
} }]);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 'use strict';
 (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[974, 916], { 
-/***/ 6974: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
-	__webpack_require__.r(__webpack_exports__);
-	/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4512);
-	/* harmony default export */ __webpack_exports__.default = function() {
-		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 1' });
+/***/ 6974: /***/ function(e, t, n) {
+	n.r(t);
+	/* harmony import */ var r = n(4512);
+	/* harmony default export */ t.default = function() {
+		return (0, r.jsx)('p', { children: 'Hello World 1' });
 	};
-	/***/} }]);
+	/***/
+} }]);

```

## `swc/projects/next/archive-1/hello-world.1af1130392dd1b8d7964`

- size: oxc 307 vs reference 526 (-219 bytes)

```js
'use strict';
(self['webpackChunk_N_E'] = self['webpackChunk_N_E'] || []).push([[689], { 
/***/ 4090: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
	__webpack_require__.r(__webpack_exports__);
	/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4512);
	/* harmony default export */ __webpack_exports__['default'] = function() {
		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', { children: 'test chunkfilename' });
	};
	/***/
} }]);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 'use strict';
 (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[689], { 
-/***/ 4090: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
-	__webpack_require__.r(__webpack_exports__);
-	/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4512);
-	/* harmony default export */ __webpack_exports__.default = function() {
-		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', { children: 'test chunkfilename' });
+/***/ 4090: /***/ function(e, t, n) {
+	n.r(t);
+	/* harmony import */ var r = n(4512);
+	/* harmony default export */ t.default = function() {
+		return (0, r.jsx)('div', { children: 'test chunkfilename' });
 	};
-	/***/} }]);
+	/***/
+} }]);

```

## `swc/projects/next/archive-1/hello1.4066327636ea41cc1002`

- size: oxc 300 vs reference 519 (-219 bytes)

```js
'use strict';
(self['webpackChunk_N_E'] = self['webpackChunk_N_E'] || []).push([[358], { 
/***/ 1901: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
	__webpack_require__.r(__webpack_exports__);
	/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4512);
	/* harmony default export */ __webpack_exports__['default'] = function() {
		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 1' });
	};
	/***/
} }]);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 'use strict';
 (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[358], { 
-/***/ 1901: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
-	__webpack_require__.r(__webpack_exports__);
-	/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4512);
-	/* harmony default export */ __webpack_exports__.default = function() {
-		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 1' });
+/***/ 1901: /***/ function(e, t, n) {
+	n.r(t);
+	/* harmony import */ var r = n(4512);
+	/* harmony default export */ t.default = function() {
+		return (0, r.jsx)('p', { children: 'Hello World 1' });
 	};
-	/***/} }]);
+	/***/
+} }]);

```

## `swc/projects/next/archive-1/hello2.339fbf9b6616133531f3`

- size: oxc 300 vs reference 519 (-219 bytes)

```js
'use strict';
(self['webpackChunk_N_E'] = self['webpackChunk_N_E'] || []).push([[367], { 
/***/ 4416: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
	__webpack_require__.r(__webpack_exports__);
	/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4512);
	/* harmony default export */ __webpack_exports__['default'] = function() {
		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 2' });
	};
	/***/
} }]);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 'use strict';
 (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[367], { 
-/***/ 4416: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
-	__webpack_require__.r(__webpack_exports__);
-	/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4512);
-	/* harmony default export */ __webpack_exports__.default = function() {
-		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 2' });
+/***/ 4416: /***/ function(e, t, n) {
+	n.r(t);
+	/* harmony import */ var r = n(4512);
+	/* harmony default export */ t.default = function() {
+		return (0, r.jsx)('p', { children: 'Hello World 2' });
 	};
-	/***/} }]);
+	/***/
+} }]);

```

## `swc/projects/backbone/2`

- size: oxc 0 vs reference 244 (-244 bytes)

```js
function foo() {
	if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
	return this._events || (this._events = {}), (this._events[name] || (this._events[name] = [])).push({
		callback,
		context,
		ctx: context || this
	}), this;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-function foo() {
-	return eventsApi(this, 'on', name, [callback, context]) && callback && (this._events || (this._events = {}), (this._events[name] || (this._events[name] = [])).push({
-		callback,
-		context,
-		ctx: context || this
-	})), this;
-}

```

## `swc/projects/react/11`

- size: oxc 0 vs reference 252 (-252 bytes)

```js
function setCurrentlyValidatingElement$1(element) {
	{
		if (element) {
			var owner = element._owner;
			var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
			setExtraStackFrame(stack);
		} else {
			setExtraStackFrame(null);
		}
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function setCurrentlyValidatingElement$1(element) {
-	if (element) {
-		var owner = element._owner;
-		setExtraStackFrame(describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null));
-	} else setExtraStackFrame(null);
-}

```

## `swc/issues/framer-motion/1`

- size: oxc 530 vs reference 784 (-254 bytes)

```js
// `resolveVariantFromProps` in framer-motion
// https://github.com/motiondivision/motion/blob/ecd97f7dce8954be300aa73ab6a96208437941c5/packages/framer-motion/src/render/utils/resolve-variants.ts#L31-L72
export function resolveVariantFromProps(props, definition, custom, visualElement) {
	if (typeof definition === 'function') {
		const [current, velocity] = getValueState(visualElement);
		definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
	}
	if (typeof definition === 'string') {
		definition = props.variants && props.variants[definition];
	}
	if (typeof definition === 'function') {
		const [current, velocity] = getValueState(visualElement);
		definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
	}
	return definition;
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
 // `resolveVariantFromProps` in framer-motion
 // https://github.com/motiondivision/motion/blob/ecd97f7dce8954be300aa73ab6a96208437941c5/packages/framer-motion/src/render/utils/resolve-variants.ts#L31-L72
-export function resolveVariantFromProps(props, definition, custom, visualElement) {
-	if ('function' == typeof definition) {
-		let [current, velocity] = getValueState(visualElement);
-		definition = definition(void 0 !== custom ? custom : props.custom, current, velocity);
+export function e(e, t, n, r) {
+	if (typeof t == 'function') {
+		let [i, a] = getValueState(r);
+		t = t(n === void 0 ? e.custom : n, i, a);
 	}
-	if ('string' == typeof definition && (definition = props.variants && props.variants[definition]), 'function' == typeof definition) {
-		let [current, velocity] = getValueState(visualElement);
-		definition = definition(void 0 !== custom ? custom : props.custom, current, velocity);
+	if (typeof t == 'string' && (t = e.variants && e.variants[t]), typeof t == 'function') {
+		let [i, a] = getValueState(r);
+		t = t(n === void 0 ? e.custom : n, i, a);
 	}
-	return definition;
+	return t;
 }

```

## `swc/issues/4386/1`

- size: oxc 170 vs reference 426 (-256 bytes)

```js
var application;
(() => {
	var __webpack_require__ = {};
	(() => {
		__webpack_require__.d = (exports, definition) => {};
	})();
	(() => {
		__webpack_require__.o = (obj, prop) => {};
	})();
	(() => {
		__webpack_require__.r = (exports) => {};
	})();
	var __webpack_exports__ = {};
	__webpack_require__.r(__webpack_exports__);
	__webpack_require__.d(__webpack_exports__, { 'bootstrap': () => bootstrap });
	function bootstrap() {
		alert();
	}
	application = __webpack_exports__;
})();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
-var application;
 (() => {
-	var __webpack_require__ = {};
-	__webpack_require__.d = (exports, definition) => {}, __webpack_require__.o = (obj, prop) => {}, __webpack_require__.r = (exports) => {};
-	var __webpack_exports__ = {};
-	function bootstrap() {
+	var e = {};
+	e.d = (e, t) => {}, e.o = (e, t) => {}, e.r = (e) => {};
+	var t = {};
+	e.r(t), e.d(t, { bootstrap: () => n });
+	function n() {
 		alert();
 	}
-	__webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, { bootstrap: () => bootstrap }), application = __webpack_exports__;
 })();

```

## `swc/next/feedback-regex`

- size: oxc 147 vs reference 406 (-259 bytes)

```js
export const rtlRegEx = new RegExp(
	/* eslint-disable prettier/prettier */
	'[' + String.fromCharCode(1425) + '-' + String.fromCharCode(2303) + String.fromCharCode(64285) + '-' + String.fromCharCode(65023) + String.fromCharCode(65136) + '-' + String.fromCharCode(65276) + String.fromCharCode(67584) + '-' + String.fromCharCode(69631) + String.fromCharCode(124928) + '-' + String.fromCharCode(126975) + ']'
	/* eslint-enable prettier/prettier */
);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-export const rtlRegEx = RegExp(
+export const e = RegExp(
 	/* eslint-disable prettier/prettier */
-	'[' + String.fromCharCode(1425) + '-' + String.fromCharCode(2303) + String.fromCharCode(64285) + '-' + String.fromCharCode(65023) + String.fromCharCode(65136) + '-' + String.fromCharCode(65276) + String.fromCharCode(67584) + '-' + String.fromCharCode(69631) + String.fromCharCode(124928) + '-' + String.fromCharCode(126975) + ']'
+	'[֑-ࣿיִ-﷿ﹰ-ﻼࠀ-࿿-]'
+	/* eslint-enable prettier/prettier */
 );

```

## `swc/projects/backbone/7`

- size: oxc 0 vs reference 266 (-266 bytes)

```js
function foo() {
	var collection = this, success = options.success;
	return options.success = function(model, resp, options) {
		options.wait && collection.add(model, options), success && success(model, resp, options);
	}, model.save(null, options), model;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function foo() {
-	var collection = this, success = options.success;
-	return options.success = function(model1, resp, options1) {
-		options1.wait && collection.add(model1, options1), success && success(model1, resp, options1);
-	}, model.save(null, options), model;
-}

```

## `swc/issues/do-while-false-control-flow`

- size: oxc 891 vs reference 1164 (-273 bytes)

```js
function unlabeledBreak() {
	var result = [];
	for (var i = 0; i < 2; i++) {
		do {
			result.push('body' + i);
			break;
		} while (false);
		result.push('tail' + i);
	}
	return result.join(',');
}
function labeledBreak() {
	var result = [];
	for (var i = 0; i < 2; i++) {
		inner: do {
			result.push('body' + i);
			break inner;
		} while (false);
		result.push('tail' + i);
	}
	return result.join(',');
}
function unlabeledContinue() {
	var result = [];
	for (var i = 0; i < 2; i++) {
		do {
			result.push('body' + i);
			continue;
		} while (false);
		result.push('tail' + i);
	}
	return result.join(',');
}
function labeledContinue() {
	var result = [];
	for (var i = 0; i < 2; i++) {
		inner: do {
			result.push('body' + i);
			continue inner;
		} while (false);
		result.push('tail' + i);
	}
	return result.join(',');
}
function hoistAfterBreak() {
	do {
		break;
		var hoisted = 1;
	} while (false);
	return typeof hoisted;
}
console.log('unlabeled break', unlabeledBreak());
console.log('labeled break', labeledBreak());
console.log('unlabeled continue', unlabeledContinue());
console.log('labeled continue', labeledContinue());
console.log('hoist after break', hoistAfterBreak());

```

```diff
--- reference
+++ oxc
@@ -1,56 +1,46 @@
-function unlabeledBreak() {
-	var result = [];
-	for (var i = 0; i < 2; i++) {
-		do {
-			result.push('body' + i);
-			break;
-		} while (false);
-		result.push('tail' + i);
+function e() {
+	for (var e = [], t = 0; t < 2; t++) {
+		do
+			e.push('body' + t);
+		while (0);
+		e.push('tail' + t);
 	}
-	return result.join(',');
+	return e.join(',');
 }
-function labeledBreak() {
-	var result = [];
-	for (var i = 0; i < 2; i++) {
-		do {
-			result.push('body' + i);
-			break;
-		} while (false);
-		result.push('tail' + i);
+function t() {
+	for (var e = [], t = 0; t < 2; t++) {
+		inner: do {
+			e.push('body' + t);
+			break inner;
+		} while (0);
+		e.push('tail' + t);
 	}
-	return result.join(',');
+	return e.join(',');
 }
-function unlabeledContinue() {
-	var result = [];
-	for (var i = 0; i < 2; i++) {
-		do {
-			result.push('body' + i);
-			continue;
-		} while (false);
-		result.push('tail' + i);
+function n() {
+	for (var e = [], t = 0; t < 2; t++) {
+		do
+			e.push('body' + t);
+		while (0);
+		e.push('tail' + t);
 	}
-	return result.join(',');
+	return e.join(',');
 }
-function labeledContinue() {
-	var result = [];
-	for (var i = 0; i < 2; i++) {
-		do {
-			result.push('body' + i);
-			continue;
-		} while (false);
-		result.push('tail' + i);
+function r() {
+	for (var e = [], t = 0; t < 2; t++) {
+		inner: do {
+			e.push('body' + t);
+			continue inner;
+		} while (0);
+		e.push('tail' + t);
 	}
-	return result.join(',');
+	return e.join(',');
 }
-function hoistAfterBreak() {
+function i() {
 	do {
-		var hoisted;
 		b
... [truncated]
```

## `swc/projects/react/12`

- size: oxc 0 vs reference 282 (-282 bytes)

```js
function getSourceInfoErrorAddendumForProps(elementProps) {
	function getSourceInfoErrorAddendum(source) {
		if (source !== undefined) {
			var fileName = source.fileName.replace(/^.*[\\\/]/, '');
			var lineNumber = source.lineNumber;
			return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
		}
		return '';
	}
	if (elementProps !== null && elementProps !== undefined) {
		return getSourceInfoErrorAddendum(elementProps.__source);
	}
	return '';
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-function getSourceInfoErrorAddendumForProps(elementProps) {
-	if (null != elementProps) {
-		var source;
-		return void 0 !== (source = elementProps.__source) ? '\n\nCheck your code at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + '.' : '';
-	}
-	return '';
-}

```

## `swc/projects/backbone/4`

- size: oxc 0 vs reference 317 (-317 bytes)

```js
function foo(attrs, options) {
	if (!options.validate || !this.validate) return !0;
	attrs = _.extend({}, this.attributes, attrs);
	var error = this.validationError = this.validate(attrs, options) || null;
	if (!error) return !0;
	return this.trigger('invalid', this, error, _.extend(options, { validationError: error })), !1;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function foo(attrs, options) {
-	if (!options.validate || !this.validate) return !0;
-	attrs = _.extend({}, this.attributes, attrs);
-	var error = this.validationError = this.validate(attrs, options) || null;
-	return !error || (this.trigger('invalid', this, error, _.extend(options, { validationError: error })), !1);
-}

```

## `swc/issues/8173`

- size: oxc 845 vs reference 1165 (-320 bytes)

```js
'use strict';
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	try {
		var info = gen[key](arg);
		var value = info.value;
	} catch (error) {
		reject(error);
		return;
	}
	if (info.done) {
		resolve(value);
	} else {
		Promise.resolve(value).then(_next, _throw);
	}
}
function _async_to_generator(fn) {
	return function() {
		var self = this, args = arguments;
		return new Promise(function(resolve, reject) {
			var gen = fn.apply(self, args);
			function _next(value) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
			}
			function _throw(err) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
			}
			_next(undefined);
		});
	};
}
const someFn = (xx, x, y) => [x, y];
const getArray = () => [
	1,
	2,
	3
];
const goodFunction = function() {
	var _ref = _async_to_generator(function* () {
		const rb = yield getArray();
		const rc = yield getArray();
		console.log(someFn(1, rb, rc));
	});
	return function goodFunction() {
		return _ref.apply(this, arguments);
	};
}();
const badFunction = function() {
	var _ref = _async_to_generator(function* () {
		console.log(someFn(1, yield getArray(), yield getArray()));
	});
	return function badFunction() {
		return _ref.apply(this, arguments);
	};
}();
goodFunction();
badFunction();

```

```diff
--- reference
+++ oxc
@@ -1,40 +1,46 @@
 'use strict';
-var _ref, _ref1;
-function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
+function e(e, t, n, r, i, a, o) {
 	try {
-		var info = gen[key](arg), value = info.value;
-	} catch (error) {
-		reject(error);
+		var s = e[a](o), c = s.value;
+	} catch (e) {
+		n(e);
 		return;
 	}
-	info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
+	s.done ? t(c) : Promise.resolve(c).then(r, i);
 }
-function _async_to_generator(fn) {
+function t(t) {
 	return function() {
-		var self = this, args = arguments;
-		return new Promise(function(resolve, reject) {
-			var gen = fn.apply(self, args);
-			function _next(value) {
-				asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
+		var n = this, r = arguments;
+		return new Promise(function(i, a) {
+			var o = t.apply(n, r);
+			function s(t) {
+				e(o, i, a, s, c, 'next', t);
 			}
-			function _throw(err) {
-				asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
+			function c(t) {
+				e(o, i, a, s, c, 'throw', t);
 			}
-			_next(void 0);
+			s(void 0);
 		});
 	};
 }
-const someFn = (xx, x, y) => [x, y], getArray = () => [
+const n = (e, t, n) => [t, n], r = () => [
 	1,
 	2,
 	3
-], goodFunction = (_ref = _async_to_generator(function* () {
-	console.log(someFn(1, yield getArray(), yield getArray()));
-}), function() {
-	return _ref.apply(this, arguments);
-}), badFunction = (_ref1 = _async_to_generator(function* () {
-	console.log(someFn(1, yield getArray(), yield getArray()));
-}), function() {
-	retu
... [truncated]
```

## `swc/projects/react/16`

- size: oxc 0 vs reference 368 (-368 bytes)

```js
function advanceTimers(currentTime) {
	// Check for tasks that are no longer delayed and add them to the queue.
	var timer = peek(timerQueue);
	while (timer !== null) {
		if (timer.callback === null) {
			// Timer was cancelled.
			pop(timerQueue);
		} else if (timer.startTime <= currentTime) {
			// Timer fired. Transfer to the task queue.
			pop(timerQueue);
			timer.sortIndex = timer.expirationTime;
			push(taskQueue, timer);
		} else {
			// Remaining timers are pending.
			return;
		}
		timer = peek(timerQueue);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +0,0 @@
-function advanceTimers(currentTime) {
-	for (var timer = peek(timerQueue); null !== timer;) {
-		if (null === timer.callback) pop(timerQueue);
-		else {
-			if (!(timer.startTime <= currentTime)) return;
-			// Timer fired. Transfer to the task queue.
-			pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
-		}
-		timer = peek(timerQueue);
-	}
-}

```

## `swc/projects/react/4`

- size: oxc 0 vs reference 380 (-380 bytes)

```js
function printWarning(level, format, args) {
	// When changing this logic, you might want to also
	// update consoleWithStackDev.www.js as well.
	{
		var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
		var stack = ReactDebugCurrentFrame.getStackAddendum();
		if (stack !== '') {
			format += '%s';
			args = args.concat([stack]);
		}
		var argsWithFormat = args.map(function(item) {
			return '' + item;
		});
		argsWithFormat.unshift('Warning: ' + format);
		// breaks IE9: https://github.com/facebook/react/issues/13610
		// eslint-disable-next-line react-internal/no-production-logging
		Function.prototype.apply.call(console[level], console, argsWithFormat);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +0,0 @@
-function printWarning(level, format, args) {
-	var stack = ReactSharedInternals.ReactDebugCurrentFrame.getStackAddendum();
-	'' !== stack && (format += '%s', args = args.concat([stack]));
-	var argsWithFormat = args.map(function(item) {
-		return '' + item;
-	});
-	argsWithFormat.unshift('Warning: ' + format), Function.prototype.apply.call(console[level], console, argsWithFormat);
-}

```

## `swc/projects/react/7`

- size: oxc 0 vs reference 470 (-470 bytes)

```js
function getElementKey(element, index) {
	function escape(key) {
		var escapeRegex = /[=:]/g;
		var escaperLookup = {
			'=': '=0',
			':': '=2'
		};
		var escapedString = key.replace(escapeRegex, function(match) {
			return escaperLookup[match];
		});
		return '$' + escapedString;
	}
	// Do some typechecking here since we call this blindly. We want to ensure
	// that we don't block potential future ES APIs.
	if (typeof element === 'object' && element !== null && element.key != null) {
		// Explicit key
		return escape('' + element.key);
	}
	return index.toString(36);
}

```

```diff
--- reference
+++ oxc
@@ -1,14 +0,0 @@
-function getElementKey(element, index) {
-	// Do some typechecking here since we call this blindly. We want to ensure
-	// that we don't block potential future ES APIs.
-	if ('object' == typeof element && null !== element && null != element.key) {
-		var key, escaperLookup;
-		return key = '' + element.key, escaperLookup = {
-			'=': '=0',
-			':': '=2'
-		}, '$' + key.replace(/[=:]/g, function(match) {
-			return escaperLookup[match];
-		});
-	}
-	return index.toString(36);
-}

```

## `swc/projects/angular/5`

- size: oxc 0 vs reference 517 (-517 bytes)

```js
function forEach(obj, iterator, context) {
	var key;
	if (obj) {
		if (isFunction(obj)) {
			for (key in obj) {
				if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
					iterator.call(context, obj[key], key);
				}
			}
		} else if (obj.forEach && obj.forEach !== forEach) {
			obj.forEach(iterator, context);
		} else if (isArrayLike(obj)) {
			for (key = 0; key < obj.length; key++) iterator.call(context, obj[key], key);
		} else {
			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					iterator.call(context, obj[key], key);
				}
			}
		}
	}
	return obj;
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +0,0 @@
-function forEach(obj, iterator, context) {
-	var key;
-	if (obj) if (isFunction(obj)) for (key in obj) 'prototype' != key && 'length' != key && 'name' != key && obj.hasOwnProperty(key) && iterator.call(context, obj[key], key);
-	else if (obj.forEach && obj.forEach !== forEach) obj.forEach(iterator, context);
-	else if (isArrayLike(obj)) for (key = 0; key < obj.length; key++) iterator.call(context, obj[key], key);
-	else for (key in obj) obj.hasOwnProperty(key) && iterator.call(context, obj[key], key);
-	return obj;
-}

```

## `swc/projects/react/15`

- size: oxc 0 vs reference 584 (-584 bytes)

```js
function validateFragmentProps(fragment) {
	{
		var keys = Object.keys(fragment.props);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (key !== 'children' && key !== 'key') {
				setCurrentlyValidatingElement$1(fragment);
				error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
				setCurrentlyValidatingElement$1(null);
				break;
			}
		}
		if (fragment.ref !== null) {
			setCurrentlyValidatingElement$1(fragment);
			error('Invalid attribute `ref` supplied to `React.Fragment`.');
			setCurrentlyValidatingElement$1(null);
		}
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +0,0 @@
-function validateFragmentProps(fragment) {
-	for (var keys = Object.keys(fragment.props), i = 0; i < keys.length; i++) {
-		var key = keys[i];
-		if ('children' !== key && 'key' !== key) {
-			setCurrentlyValidatingElement$1(fragment), error('Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.', key), setCurrentlyValidatingElement$1(null);
-			break;
-		}
-	}
-	null !== fragment.ref && (setCurrentlyValidatingElement$1(fragment), error('Invalid attribute `ref` supplied to `React.Fragment`.'), setCurrentlyValidatingElement$1(null));
-}

```

## `swc/projects/react/13`

- size: oxc 0 vs reference 617 (-617 bytes)

```js
function validateChildKeys(node, parentType) {
	if (typeof node !== 'object') {
		return;
	}
	if (Array.isArray(node)) {
		for (var i = 0; i < node.length; i++) {
			var child = node[i];
			if (isValidElement(child)) {
				validateExplicitKey(child, parentType);
			}
		}
	} else if (isValidElement(node)) {
		// This element was passed in a valid location.
		if (node._store) {
			node._store.validated = true;
		}
	} else if (node) {
		var iteratorFn = getIteratorFn(node);
		if (typeof iteratorFn === 'function') {
			// Entry iterators used to provide implicit keys,
			// but now we print a separate warning for them later.
			if (iteratorFn !== node.entries) {
				var iterator = iteratorFn.call(node);
				var step;
				while (!(step = iterator.next()).done) {
					if (isValidElement(step.value)) {
						validateExplicitKey(step.value, parentType);
					}
				}
			}
		}
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +0,0 @@
-function validateChildKeys(node, parentType) {
-	if ('object' == typeof node) {
-		if (Array.isArray(node)) for (var i = 0; i < node.length; i++) {
-			var child = node[i];
-			isValidElement(child) && validateExplicitKey(child, parentType);
-		}
-		else if (isValidElement(node)) node._store && (node._store.validated = !0);
-		else if (node) {
-			var iteratorFn = getIteratorFn(node);
-			if ('function' == typeof iteratorFn && iteratorFn !== node.entries) for (var step, iterator = iteratorFn.call(node); !(step = iterator.next()).done;) isValidElement(step.value) && validateExplicitKey(step.value, parentType);
-		}
-	}
-}

```

## `swc/projects/underscore/16`

- size: oxc 0 vs reference 663 (-663 bytes)

```js
function foo() {
	// Add the first object to the stack of traversed objects.
	aStack.push(a);
	bStack.push(b);
	var size = 0, result = true;
	// Recursively compare objects and arrays.
	if (className == '[object Array]') {
		// Compare array lengths to determine if a deep comparison is necessary.
		size = a.length;
		result = size == b.length;
		if (result) {
			// Deep compare the contents, ignoring non-numeric properties.
			while (size--) {
				if (!(result = eq(a[size], b[size], aStack, bStack))) break;
			}
		}
	} else {
		// Deep compare objects.
		for (var key in a) {
			if (_.has(a, key)) {
				// Count the expected number of properties.
				size++;
				// Deep compare each member.
				if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
			}
		}
		// Ensure that both objects contain the same number of properties.
		if (result) {
			for (key in b) {
				if (_.has(b, key) && !size--) break;
			}
			result = !size;
		}
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,17 +0,0 @@
-function foo() {
-	// Add the first object to the stack of traversed objects.
-	aStack.push(a), bStack.push(b);
-	var size = 0, result = !0;
-	// Recursively compare objects and arrays.
-	if ('[object Array]' == className) {
-		if (result = (size = a.length) == b.length) for (; size-- && (result = eq(a[size], b[size], aStack, bStack)););
-	} else {
-		// Deep compare objects.
-		for (var key in a) if (_.has(a, key) && (size++, !(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack)))) break;
-		// Ensure that both objects contain the same number of properties.
-		if (result) {
-			for (key in b) if (_.has(b, key) && !size--) break;
-			result = !size;
-		}
-	}
-}

```

