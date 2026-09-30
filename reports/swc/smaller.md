# swc / smaller — Output shorter than expected (possible over-optimization / bug)

Fixtures: 112

[← swc](README.md) · [← all families](../README.md)

## `swc/issues/11034`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 118 vs reference 119 (-1 bytes)

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
 export function f() {
 	const foo = window.e ? 'bar' : 'baz';
-	foo = 'it\'s not allowed';
-	console.log(`foo=${foo}`);
+	foo = 'it\'s not allowed', console.log(`foo=${foo}`);
 }

```

## `swc/issues/11645/eval-parent-scope-nested-block`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
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
 	let f = (a) => a;
-	eval('f = (_, b) => b');
-	return f(1, 2);
+	return eval('f = (_, b) => b'), f(1, 2);
 }
 console.log(outer());

```

## `swc/issues/11645/eval-rebind-scope`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
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
 	let f = (a) => a;
-	eval('f = (_, b) => b');
-	return f(1, 2);
+	return eval('f = (_, b) => b'), f(1, 2);
 }
 console.log(outer());

```

## `swc/issues/9186/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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
+})()), console.log((function(a = this.a) {
+	for (;;) console.log(123);
 })());
-console.log(function(a = this.a) {
-	while (true) console.log(123);
-}());

```

## `swc/issues/9741_collision_function`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 138 vs reference 139 (-1 bytes)

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
+function _Object_assign(a, b) {
+	console.log(this, Math.exp(a, b));
+}
+_Object_assign(4, 2), Object.assign({}, {}), Object.assign({}, {});

```

## `swc/issues/11684/with-scope`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 332 vs reference 334 (-2 bytes)

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
 function TopLevelCtor(value) {
 	this.value = value;
 }
-with(out.TopLevelCtor = TopLevelCtor, constructors) out.topLevel = new TopLevelCtor(1, 2, 3);
-function constructLocal(constructors1) {
+out.TopLevelCtor = TopLevelCtor;
+with(constructors) out.topLevel = new TopLevelCtor(1, 2, 3);
+function constructLocal(constructors) {
 	function LocalCtor(value) {
 		this.value = value;
 	}
-	with(constructors1) return new LocalCtor(1, 2, 3);
+	with(constructors) return new LocalCtor(1, 2, 3);
 }
 out.constructLocal = constructLocal;

```

## `swc/issues/5684`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 44 vs reference 46 (-2 bytes)

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
+var obj = unknown();
+obj && obj.__esModule;

```

## `swc/issues/9500`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 74 vs reference 76 (-2 bytes)

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
 let foo = 1;
 ({ get 1() {
 	return foo = 2, 40;
-} })['1'], console.log(foo);
+} })[1], console.log(foo);

```

## `swc/next/feeback-plotly/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 239 vs reference 241 (-2 bytes)

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
 export function log2(v) {
-	var r, shift;
-	return r = (v > 65535) << 4, v >>>= r, shift = (v > 255) << 3, v >>>= shift, r |= shift, shift = (v > 15) << 2, v >>>= shift, r |= shift, shift = (v > 3) << 1, v >>>= shift, (r |= shift) | v >> 1;
+	var r = (v > 65535) << 4, shift;
+	return v >>>= r, shift = (v > 255) << 3, v >>>= shift, r |= shift, shift = (v > 15) << 2, v >>>= shift, r |= shift, shift = (v > 3) << 1, v >>>= shift, r |= shift, r | v >> 1;
 }

```

## `swc/pr/6169/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 87 vs reference 89 (-2 bytes)

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
 var ref = [, { toUpperCase() {
 	console.log(this);
 } }];
-(ref[0], ref[1]).toUpperCase();
+ref[0], ref[1].toUpperCase();

```

## `swc/projects/jquery/.17`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/5588`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 198 vs reference 202 (-4 bytes)

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
@@ -1,6 +1,5 @@
 'use strict';
-let getFoo;
-let getFoo2;
+let getFoo, getFoo2;
 class Foo {
 	static #foo = 42;
 	static #_ = getFoo2 = this.#foo;
@@ -8,5 +7,4 @@
 		getFoo = () => this.#foo;
 	}
 }
-expect(getFoo()).toBe(42);
-expect(getFoo2()).toBe(42);
+expect(getFoo()).toBe(42), expect(getFoo2()).toBe(42);

```

## `swc/issues/6791/1`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/member_expr/callee`

- tags: `drop debugger`, `join vars`, `sequences`
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

## `swc/pr/11381`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 199 vs reference 203 (-4 bytes)

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
@@ -5,10 +5,10 @@
 }
 export class B extends A {
 	constructor(options) {
-		let { a } = options, b = [a = a || 'test'];
-		super({
+		let { a } = options;
+		a ||= 'test', super({
 			a,
-			b
+			b: [a]
 		});
 	}
 }

```

## `swc/issues/6175/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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
 let o = { f() {
 	assert.ok(this !== o);
 } };
-(0, o.f)``, (0, o.f)``, (0, o.f)``, (0, o.f)``;
+(0, o.f)``, (0, o.f)``, (0, o.f)``, o.f``;

```

## `swc/pr/6272`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/11645/child-scope-reassign-merge`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 117 vs reference 123 (-6 bytes)

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
 function run(cond) {
 	let f = (a) => a;
-	if (cond) f = (a, b) => b;
-	return f(1, 2);
+	return cond && (f = (a, b) => b), f(1, 2);
 }
-console.log(run(true), run(false));
+console.log(run(!0), run(!1));

```

## `swc/issues/6344/1`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`
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
-var t = function() {
-	function n(n) {}
-	var t = null;
-	return { init: function(u) {
-		return t = new n(u);
+function a() {}
+var e = function() {
+	function n(e) {}
+	var e = null;
+	return { init: function(t) {
+		return e = new n(t);
 	} };
 }();
-var u = function() {
-	function t() {
-		n();
-	}
-	var u = null;
-	return { init: function(n) {
-		return u;
+var t = function() {
+	function n() {}
+	var e = null;
+	return { init: function(e) {
+		return null;
 	} };
 }();

```

## `swc/issues/9466`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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
+(function() {
 	function x() {}
 	class y {}
 	for (x of ['']);
 	for (y in ['']);
-}();
+})();

```

## `swc/member_expr/array`

- tags: `drop debugger`, `join vars`, `sequences`
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

## `swc/issues/6837/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 227 vs reference 234 (-7 bytes)

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
@@ -2,8 +2,7 @@
 	constructor() {
 		this.method1 = async () => {
 			let var1;
-			var1 = await Class2.method2();
-			await (() => {})().then(() => {
+			var1 = await Class2.method2(), await (void 0).then(() => {
 				console.log(var1);
 			});
 		};

```

## `swc/issues/8924`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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
+(() => {
 	let x = 1;
-	return x **= void 0;
+	return x **= void 0, x;
 })();

```

## `swc/projects/backbone/16`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/8923`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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
+(() => {
 	let x = '';
-	return x * (x-- / x);
+	return x *= x-- / x, x;
 })();

```

## `swc/issues/9739`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 61 vs reference 69 (-8 bytes)

```js
const arr = ['a', 'b'];
[arr[0], arr[1]] = [arr[1], arr[0]];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 const arr = ['a', 'b'];
-[['a', 'b'][0], ['a', 'b'][1]] = ['b', 'a'];
+[arr[0], arr[1]] = [arr[1], arr[0]];

```

## `swc/projects/angular/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/projects/next/extra/if_return/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 849 vs reference 857 (-8 bytes)

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
@@ -1,12 +1,12 @@
 export function insertRule(rule, index) {
-	if (invariant(isString(rule), '`insertRule` accepts only strings'), !this._isBrowser) return 'number' != typeof index && (index = this._serverSheet.cssRules.length), this._serverSheet.insertRule(rule, index), this._rulesCount++;
+	if (invariant(isString(rule), '`insertRule` accepts only strings'), !this._isBrowser) return typeof index != 'number' && (index = this._serverSheet.cssRules.length), this._serverSheet.insertRule(rule, index), this._rulesCount++;
 	if (this._optimizeForSpeed) {
 		var sheet = this.getSheet();
-		'number' != typeof index && (index = sheet.cssRules.length);
+		typeof index != 'number' && (index = sheet.cssRules.length);
 		// https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
 		try {
 			sheet.insertRule(rule, index);
-		} catch (error) {
+		} catch {
 			return isProd || console.warn('StyleSheet: illegal rule: \n\n' + rule + '\n\nSee https://stackoverflow.com/q/20007992 for more info'), -1;
 		}
 	} else {

```

## `swc/projects/underscore/12`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/simple/inline/5`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 231 vs reference 239 (-8 bytes)

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
 export function foo() {
-	console.log(2), console.log(1);
-	for (var c = 0; c < 10; c++) console.log(c);
+	b = 1, console.log(2), console.log(b);
+	for (var b, c = 0; c < 10; c++) console.log(c);
 }
 export function bar() {
 	function x() {
 		b = 1;
 	}
-	for (var b = 10, c = 0; c < 10; c++) /*#__NOINLINE__*/ x(), console.log(b, c);
+	for (var b = 10, c = 0; c < 10; c++) x(), console.log(b, c);
 }

```

## `swc/issues/4249`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 278 vs reference 287 (-9 bytes)

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
 foo({ bar: function(data, baz) {
-	!(!(baz ? data.quxA : data.quxB) && !(baz ? data.corgeA : data.corgeB) && (baz ? data.get('waldo') : data.waldo)) ? (baz ? data.quxA : data.quxB) || (baz ? data.get('waldo') : data.waldo) || (baz ? !data.corgeA : !data.corgeB) || pass() : pass();
+	(!(baz ? data.quxA : data.quxB) && !(baz ? data.corgeA : data.corgeB) && (baz ? data.get('waldo') : data.waldo) || !(baz ? data.quxA : data.quxB) && !(baz ? data.get('waldo') : data.waldo) && (baz ? data.corgeA : data.corgeB)) && pass();
 } });

```

## `swc/issues/6837/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 348 vs reference 357 (-9 bytes)

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
@@ -5,11 +5,9 @@
 Class1.isClass2 = isClass2;
 export class Class2 extends Class1 {
 	constructor() {
-		super();
-		this.method1 = async () => {
+		super(), this.method1 = async () => {
 			let var1;
-			var1 = await Class2.method2();
-			await (() => {})().then(() => {
+			var1 = await Class2.method2(), await (void 0).then(() => {
 				console.log(var1);
 			}).catch();
 		};

```

## `swc/projects/backbone/15`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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
 export var a;
 export var b;

```

## `swc/issues/9263`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 98 vs reference 108 (-10 bytes)

```js
'use strict';
const k = (function() {
	var x = 42;
	for (var x in [4242]) break;
	return x;
})();
export { k };

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
-'use strict';
-let k = function() {
+const k = (function() {
 	var x = 42;
 	for (var x in [4242]) break;
 	return x;
-}();
+})();
 export { k };

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
+export const N = (0, p.default)(e = (0, ft.default)((0, p.default)(r).call(r, ((e, t) => {
+	let r = t.get('in');
+	return e[r] ?? (e[r] = []), e[r].push(t), e;
+}), {}))).call(e, ((e, t) => (0, h.default)(e).call(e, t)), []);

```

## `swc/pr/11987`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/projects/mootools/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/projects/angular/3`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/projects/backbone/12`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/6628`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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
+		return e.usePlugin = function(t, i, n) {}, e.plugins = [], e;
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

## `swc/next/46887-2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 1081 vs reference 1095 (-14 bytes)

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
 		var a = !!o && !!o.unsafe, s = !!o && !!o.enumerable;
-		if (o = !!o && !!o.noTargetGet, 'function' == typeof i) {
-			'string' != typeof t || Q(i, 'name') || Na(i, 'name', t);
+		if (o = !!o && !!o.noTargetGet, typeof i == 'function') {
+			typeof t != 'string' || Q(i, 'name') || Na(i, 'name', t);
 			var u = n(i);
-			u.source || (u.source = r.join('string' == typeof t ? t : ''));
+			u.source ||= r.join(typeof t == 'string' ? t : '');
 		}
 		e === y ? s ? e[t] = i : Oi(t, i) : (a ? !o && e[t] && (s = !0) : delete e[t], s ? e[t] = i : Na(e, t, i));
-	})(Function.prototype, 'toString', function() {
-		return 'function' == typeof this && t(this).source || Pi(this);
-	});
-}
-;
+	})(Function.prototype, 'toString', (function() {
+		return typeof this == 'function' && t(this).source || Pi(this);
+	}));
+});

```

## `swc/projects/backbone/5`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 385 vs reference 399 (-14 bytes)

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
@@ -2,7 +2,7 @@
 // Bind an event to a `callback` function. Passing `"all"` will bind
 // the callback to all events fired.
 on: function(name, callback, context) {
-	return eventsApi(this, 'on', name, [callback, context]) && callback && (this._events || (this._events = {}), (this._events[name] || (this._events[name] = [])).push({
+	return !eventsApi(this, 'on', name, [callback, context]) || !callback || (this._events ||= {}, (this._events[name] || (this._events[name] = [])).push({
 		callback,
 		context,
 		ctx: context || this

```

## `swc/simple/issues/2007/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/6344/2`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`
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
+function a() {}
+var e = function() {
+	var n = function(e) {};
+	var e = null;
+	return { init: function(t) {
+		return e = new n(t);
 	} };
 }();
 var t = function() {
-	var r = function r() {
-		n();
-	};
-	var t = null;
-	return { init: function n(n) {
-		return t;
+	var n = function() {};
+	var e = null;
+	return { init: function(t) {
+		return e;
 	} };
 }();

```

## `swc/issues/8844`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/7228/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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
 export function f() {
-	let foos = something.getFoos();
-	return foos?.[0];
+	return something.getFoos()?.[0];
 }

```

## `swc/issues/string-from-char-code-uint16`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 129 vs reference 147 (-18 bytes)

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

```

## `swc/issues/8324`

- tags: `3 iterations`
- size: oxc 481 vs reference 500 (-19 bytes)

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
@@ -1,21 +1,19 @@
 function Deferred() {
-	const deferred = this;
+	let deferred = this;
 	deferred.promise = new Promise(function(resolve, reject) {
 		deferred.resolve = resolve;
 		deferred.reject = reject;
 	});
 }
 export async function bug() {
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
+	let s = 'next';
+	if (!window[s]) for (window[s] = new Deferred();;) if (window.current) await window.current.promise;
+	else {
+		window.current = window[s];
+		try {
+			return await window[s].promise;
+		} finally {
+			delete window.current;
 		}
 	}
 	return await window[s].promise;

```

## `swc/issues/9741_multiple_methods`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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
+const a = Object.assign({}, {}), b = Object.assign({}, {});
+console.log(a, b, Object.keys({ a: 1 }), Object.keys({ b: 2 }), Array.isArray([]), Array.isArray({}));

```

## `swc/reduced/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 317 vs reference 337 (-20 bytes)

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
+var A, B;
+(function(A2) {
+	(A2.Point ||= {}).Origin = {
+		x: 0,
+		y: 0
+	};
+})(A ||= {}), (A ||= {}).Point = function() {
 	return {
 		x: 0,
 		y: 0
 	};
-}, function(B1) {
+}, (function(B1) {
 	function Point1() {
 		return {
 			x: 0,
 			y: 0
 		};
 	}
-	(Point1 = B1.Point || (B1.Point = {})).Origin = {
+	(Point1 = B1.Point ||= {}).Origin = {
 		x: 0,
 		y: 0
 	}, B1.Point = Point1;
-}(B || (B = {}));
+})(B ||= {});

```

## `swc/issues/9619`

- tags: `join vars`, `sequences`, `remove unused`, `1 iteration`
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

## `swc/projects/mootools/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/7568/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 422 vs reference 447 (-25 bytes)

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
 	var __webpack_modules__ = {};
-	specific_microfront = function __webpack_require__(moduleId) {
+	function __webpack_require__(moduleId) {
 		var module = __webpack_module_cache__[moduleId] = {
 			id: moduleId,
 			loaded: !1,
 			exports: {}
 		};
 		return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.loaded = !0, module.exports;
-	}('webpack/container/entry/specific_page');
-}();
+	}
+	__webpack_require__('webpack/container/entry/specific_page');
+})();

```

## `swc/simple/if/block/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/vercel/001`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/10918`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 404 vs reference 432 (-28 bytes)

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
 import { useState } from 'react';
 import { getCondition, doSomething } from './utils';
 export default function useMeow() {
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
+	let [state, setState] = useState('init');
+	return { onMeow: async () => {
+		switch (state) {
+			case 'init':
+				switch (getCondition()) {
+					case 'a': break;
+					case 'b': break;
+					default: await doSomething();
+				}
+				break;
+			default: await doSomething();
+		}
+	} };
 }

```

## `swc/issues/6422/3`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 232 vs reference 261 (-29 bytes)

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
 import assert from 'assert';
 let result = 0;
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
+({ ...{ get prop() {
+	result = 1;
+} } }), assert.strictEqual(result, 1), result = 2, assert.strictEqual(result, 2), { ...{ get prop() {
+	result = 3;
+} } }, assert.strictEqual(result, 3);

```

## `swc/issues/lit_comparisons`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/next/43052`

- tags: `2 iterations`
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
+use((function(__unused_webpack_module, exports, __webpack_require__) {
+	(function(e, t) {
 		t(exports, __webpack_require__(7294), __webpack_require__(1321));
-	}(this, function(exports, React) {
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
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

## `swc/simple/order/fn/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/8337`

- tags: `3 iterations`
- size: oxc 270 vs reference 308 (-38 bytes)

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
@@ -1,7 +1,6 @@
 export function allowInAnd(callback) {
 	var flags = this.prodParam.currentFlags();
-	var prodParamToSet = ParamKind.PARAM_IN & ~flags;
-	if (prodParamToSet) {
+	if (ParamKind.PARAM_IN & ~flags) {
 		this.prodParam.enter(flags | ParamKind.PARAM_IN);
 		try {
 			return callback();

```

## `swc/issues/11321`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 654 vs reference 693 (-39 bytes)

```js
// Test case 1: Multiple default imports with different local names (the reported bug)
import A from 'm.js';
import B from 'm.js';
// Test case 2: Multiple namespace imports with different local names
import * as X from 'p.js';
import * as Y from 'p.js';
// Test case 3: Mix of multiple defaults and named imports
import C from 'r.js';
import D from 'r.js';
import { foo } from 'r.js';
import { bar } from 'r.js';
// Test case 4: Mix of all kinds of imports
import * as ns1 from 'q.js';
import { default as E, 'default' as F } from 'q.js';
import G from 'q.js';
import { a, b, c } from 'q.js';
import * as ns2 from 'q.js';
import H from 'q.js';
// Use all imports to prevent dead code elimination
console.log(A, B, C, D, E, F, G, H);
console.log(X, Y);
console.log(foo, bar);
console.log(ns1, ns2);
console.log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -6,8 +6,7 @@
 // Test case 3: Mix of multiple defaults and named imports
 import C, { default as D, foo, bar } from 'r.js';
 // Test case 4: Mix of all kinds of imports
-import E, * as ns1 from 'q.js';
-import F, { default as G, a, b, c } from 'q.js';
-import H, * as ns2 from 'q.js';
-// Use all imports to prevent dead code elimination
+import G, * as ns1 from 'q.js';
+import H, { default as E, 'default' as F, a, b, c } from 'q.js';
+import * as ns2 from 'q.js';
 console.log(A, B, C, D, E, F, G, H), console.log(X, Y), console.log(foo, bar), console.log(ns1, ns2), console.log(a, b, c);

```

## `swc/issues/9741`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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
 const a = {};
-_Object_assign(a, {});
+Object.assign(a, {});
 const b = {};
-_Object_assign(b, {}), _Object_assign(b, a);
+Object.assign(b, {}), Object.assign(b, a);

```

## `swc/issues/9741_collision`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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
 const a = {};
-_Object_assign(a, {});
+Object.assign(a, {});
 const b = {};
-_Object_assign(b, {}), _Object_assign(b, a);
+Object.assign(b, {}), Object.assign(b, a);

```

## `swc/issues/do-while-false-control-flow`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 1119 vs reference 1164 (-45 bytes)

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
 function unlabeledBreak() {
-	var result = [];
-	for (var i = 0; i < 2; i++) {
-		do {
+	for (var result = [], i = 0; i < 2; i++) {
+		do
 			result.push('body' + i);
-			break;
-		} while (false);
+		while (0);
 		result.push('tail' + i);
 	}
 	return result.join(',');
 }
 function labeledBreak() {
-	var result = [];
-	for (var i = 0; i < 2; i++) {
-		do {
+	for (var result = [], i = 0; i < 2; i++) {
+		inner: do {
 			result.push('body' + i);
-			break;
-		} while (false);
+			break inner;
+		} while (0);
 		result.push('tail' + i);
 	}
 	return result.join(',');
 }
 function unlabeledContinue() {
-	var result = [];
-	for (var i = 0; i < 2; i++) {
-		do {
+	for (var result = [], i = 0; i < 2; i++) {
+		do
 			result.push('body' + i);
-			continue;
-		} while (false);
+		while (0);
 		result.push('tail' + i);
 	}
 	return result.join(',');
 }
 function labeledContinue() {
-	var result = [];
-	for (var i = 0; i < 2; i++) {
-		do {
+	for (var result = [], i = 0; i < 2; i++) {
+		inner: do {
 			result.push('body' + i);
-			continue;
-		} while (false);
+			continue inner;
+		} while (0);
 		result.push('tail' + i);
 	}
 	return result.join(',');
 }
 function hoistAfterBreak() {
 	do {
+		break;
 		var hoisted;
-		break;
-	} while (false);
+	} while (0);
 	return typeof hoisted;
 }
-console.log('unlabeled break', unlabeledBreak());
-console.log('labeled break', labeledBreak());
-console.log('unlabeled continue', unlabeledContinue());
-console.log('labeled continue', labeledContinue());
-console.log('hoist after break', hoistAfterBreak(
... [truncated]
```

## `swc/issues/number-radix-conversion`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
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

## `swc/issues/11133`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 1266 vs reference 1316 (-50 bytes)

```js
// Test case 1: Basic duplicate named imports
import { add } from 'math';
import { subtract } from 'math';
import { multiply } from 'math';
// Test case 2: Same export imported with different local names (should preserve both)
import { add as a } from 'calculator';
import { add as b } from 'calculator';
// Test case 3: Mix of default and named imports
import defaultExport from 'module1';
import { namedExport } from 'module1';
// Test case 4: Namespace import with named imports (CANNOT be merged - incompatible)
import * as utils from 'utils';
import { helper } from 'utils';
// Test case 4b: Default with namespace (CAN be merged)
import defUtils from 'utils2';
import * as utils2 from 'utils2';
// Test case 5: Side-effect import (should not be merged)
import 'polyfill';
import 'polyfill';
// Test case 6: Different sources (should not be merged)
import { foo } from 'lib1';
import { foo } from 'lib2';
// Test case 7: Duplicate named imports (exact same specifier)
import { duplicate } from 'dups';
import { duplicate } from 'dups';
import { duplicate } from 'dups';
// Test case 8: Mix of named imports with and without aliases
import { thing } from 'things';
import { thing as renamedThing } from 'things';
import { otherThing } from 'things';
// Use all imports to avoid dead code elimination
console.log(add, subtract, multiply);
console.log(a, b);
console.log(defaultExport, namedExport);
console.log(utils, helper);
console.log(defUtils, utils2);
console.log(foo);
console.log(duplicate);
console.log(thing, renamedThing, otherThing);

```

```diff
--- reference
+++ oxc
@@ -18,5 +18,4 @@
 import { duplicate, duplicate, duplicate } from 'dups';
 // Test case 8: Mix of named imports with and without aliases
 import { thing, thing as renamedThing, otherThing } from 'things';
-// Use all imports to avoid dead code elimination
 console.log(add, subtract, multiply), console.log(a, b), console.log(defaultExport, namedExport), console.log(utils, helper), console.log(defUtils, utils2), console.log(foo), console.log(duplicate), console.log(thing, renamedThing, otherThing);

```

## `swc/issues/drop-console-nullish-console`

- tags: `drop console`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 190 vs reference 240 (-50 bytes)

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
+const pb = console?.error.bind(console);
 process.stdout.write(typeof pb + '\n');
-const ob = (console?.error && function() {})?.bind();
+const ob = console?.error?.bind(console);
 process.stdout.write(typeof ob + '\n');

```

## `swc/issues/9741_global_objects`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/4386/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 374 vs reference 426 (-52 bytes)

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
 	var __webpack_require__ = {};
 	__webpack_require__.d = (exports, definition) => {}, __webpack_require__.o = (obj, prop) => {}, __webpack_require__.r = (exports) => {};
 	var __webpack_exports__ = {};
+	__webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, { bootstrap: () => bootstrap });
 	function bootstrap() {
 		alert();
 	}
-	__webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, { bootstrap: () => bootstrap }), application = __webpack_exports__;
 })();

```

## `swc/issues/vercel/004`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 519 vs reference 572 (-53 bytes)

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
 export function ItemsList() {
+	var _ref, _temp, _this, _ret;
 	_classCallCheck(this, ItemsList);
-	for (var _ref, _temp, _this, _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
-	return _temp = _this = _possibleConstructorReturn(this, (_ref = ItemsList.__proto__ || Object.getPrototypeOf(ItemsList)).call.apply(_ref, [this].concat(args))), _this.storeHighlightedItemReference = function(highlightedItem) {
-		_this.props.onHighlightedItemChange(null === highlightedItem ? null : highlightedItem.item);
-	}, _possibleConstructorReturn(_this, _temp);
+	var args = [...arguments];
+	return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ItemsList.__proto__ || Object.getPrototypeOf(ItemsList)).call.apply(_ref, [this].concat(args))), _this), _this.storeHighlightedItemReference = function(highlightedItem) {
+		_this.props.onHighlightedItemChange(highlightedItem === null ? null : highlightedItem.item);
+	}, _temp), _possibleConstructorReturn(_this, _ret);
 }

```

## `swc/simple/super/computed`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/react/hooks/4`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 621 vs reference 687 (-66 bytes)

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
@@ -1,12 +1,11 @@
-'use strict';
 __webpack_require__(86677);
 var index_esm = __webpack_require__(45205), use_team = __webpack_require__(502), fetch_api = __webpack_require__(78869), authenticate = __webpack_require__(16966), api_endpoints = __webpack_require__(96236), qs = __webpack_require__(70326);
 export function useProjectBranches(projectId, opts) {
-	var token = (0, authenticate.LP)(), team = (0, use_team.ZP)().team, teamId = null == team ? void 0 : team.id;
-	return (0, index_esm.ZP)(projectId ? ''.concat(api_endpoints.Ms, '/git-branches').concat((0, qs.c)({
+	var token = (0, authenticate.LP)(), teamId = (0, use_team.ZP)().team?.id;
+	return (0, index_esm.ZP)(projectId ? `${api_endpoints.Ms}/git-branches${(0, qs.c)({
 		projectId,
 		teamId
-	})) : '', function(endpoint) {
+	})}` : '', function(endpoint) {
 		return (0, fetch_api.Z)(endpoint, token, { throwOnHTTPError: !0 });
 	}, opts);
 }

```

## `swc/projects/jquery/26`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/11082`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 225 vs reference 324 (-99 bytes)

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
 import { aa, useRef } from './utils';
 export function A() {
-	let { o1 } = aa, ref = useRef(), fn2 = async (value2 = (() => {
-		var _ref_current;
-		return null == (_ref_current = ref.current) ? void 0 : _ref_current.getValue();
-	})()) => {
+	let { o1 } = aa, ref = useRef();
+	return (0, _jsxruntime.jsx)(B, { fn2: async (value2 = ref.current?.getValue()) => {
 		console.log(o1);
-	};
-	return (0, _jsxruntime.jsx)(B, { fn2 });
+	} });
 }
 export default A;

```

## `swc/issues/9741_threshold`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/3256/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 411 vs reference 516 (-105 bytes)

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
+const adler32 = (adler, buf, len, pos) => {
+	let s1 = adler & 65535, s2 = adler >>> 16 & 65535, n = 0;
+	for (; len !== 0;) {
 		n = len > 2e3 ? 2e3 : len, len -= n;
 		do
-			s2 = s2 + (s1 = s1 + buf[pos++] | 0) | 0;
+			s1 = s1 + buf[pos++] | 0, s2 = s2 + s1 | 0;
 		while (--n);
 		s1 %= 65521, s2 %= 65521;
 	}
 	return s1 | s2 << 16;
-});
+};
+export default adler32;

```

## `swc/issues/10539`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 135 vs reference 242 (-107 bytes)

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
@@ -1,5 +1,3 @@
-// class def completely disappears
-// class def disappears, leaving only `new DoesntWorkClass()` as output
 (class DoesntWorkClass {
 	static prop = new DoesntWorkClass();
 });

```

## `swc/projects/angular/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop console`, `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/issues/8119`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 294 vs reference 420 (-126 bytes)

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
 const myArr = [];
 // function with side effect
 function foo(arr) {
 	return arr.push('foo'), 'foo';
 }
+let a;
 Math.random() > .5 && (a = !0);
 // the function call below should always run
 // regardless of whether `a` is `undefined`
 let b = foo(myArr);
-// const seems to keep this line here instead of
-// moving it behind the logitcal nullish assignment
-// const b = foo(myArr);
-a ??= b;
-console.log(a);
-console.log(myArr);
+a ??= b, console.log(a), console.log(myArr);

```

## `swc/projects/backbone/6`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 148 vs reference 279 (-131 bytes)

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
@@ -1,5 +1,3 @@
-// Test: keep_fargs: true should preserve function argument count
-// The unused parameter with default value should NOT be removed
 function foo(a, b = 'hello') {
 	return a;
 }

```

## `swc/issues/arguments-parameter-injection-limit`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
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

## `swc/issues/10859`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 333 vs reference 511 (-178 bytes)

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
+console.log('start'), console.log('middle'), console.log('end'), console.log('before'), console.log('after'), console.log('first'), console.log('second'), console.log('setup'), ((param) => param + 1)(5), console.log('done'), console.log('expr'), console.log('result'), ((x) => x * 2)(10);

```

## `swc/issues/7683/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `join vars`, `sequences`, `remove unused`, `1 iteration`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/projects/underscore/15`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/projects/backbone/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/next/feedback-regex`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 154 vs reference 406 (-252 bytes)

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
 export const rtlRegEx = RegExp(
 	/* eslint-disable prettier/prettier */
-	'[' + String.fromCharCode(1425) + '-' + String.fromCharCode(2303) + String.fromCharCode(64285) + '-' + String.fromCharCode(65023) + String.fromCharCode(65136) + '-' + String.fromCharCode(65276) + String.fromCharCode(67584) + '-' + String.fromCharCode(69631) + String.fromCharCode(124928) + '-' + String.fromCharCode(126975) + ']'
+	'[֑-ࣿיִ-﷿ﹰ-ﻼࠀ-࿿-]'
+	/* eslint-enable prettier/prettier */
 );

```

## `swc/projects/react/11`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/projects/backbone/7`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/projects/react/12`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

## `swc/projects/react/16`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
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

