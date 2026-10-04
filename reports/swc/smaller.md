# swc / smaller — Output shorter than expected (possible over-optimization / bug)

Fixtures: 123

[← swc](README.md) · [← all families](../README.md)

## `swc/pr/11381`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 151 vs reference 152 (no whitespaces: -1, formatted: -4)

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

## `swc/projects/jquery/.17`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 545 vs reference 546 (no whitespaces: -1, formatted: -2)

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
- size: oxc 178 vs reference 179 (no whitespaces: -1, formatted: -2)

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

## `swc/issues/11684/with-scope`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 292 vs reference 294 (no whitespaces: -2, formatted: -2)

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
- size: oxc 38 vs reference 40 (no whitespaces: -2, formatted: -2)

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

## `swc/issues/6791/1`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 85 vs reference 87 (no whitespaces: -2, formatted: -4)

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

## `swc/issues/6837/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 288 vs reference 290 (no whitespaces: -2, formatted: -9)

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

## `swc/issues/6837/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 179 vs reference 181 (no whitespaces: -2, formatted: -7)

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

## `swc/issues/9460/strict-mode`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `pure getters`
- size: oxc 251 vs reference 253 (no whitespaces: -2, formatted: -2)

```js
const events = [];
function record(value) {
	events.push(value);
}
const { value = class {
	static field = (function() {
		record(this === undefined);
	})();
} } = {};
try {
	const { value = class {
		static field = missing = 1;
	} } = {};
} catch {
	record('strict-assignment-throws');
}
console.log(events.join(','));

```

```diff
--- reference
+++ oxc
@@ -4,11 +4,11 @@
 }
 const { value = class {
 	static field = (function() {
-		record(void 0 === this);
+		record(this === void 0);
 	})();
 } } = {};
 try {
-	const { value = class {
+	let { value = class {
 		static field = missing = 1;
 	} } = {};
 } catch {

```

## `swc/issues/do-while-false-terminal-jump/completion/typed-string-number`

- tags: `mangle`, `keep function names`, `keep class names`, `1 iteration`
- size: oxc 32 vs reference 34 (no whitespaces: -2, formatted: -8)

```js
var value;
do {
	value = '2';
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a;
-do {
-	a = '2';
-	break;
-} while (false);
+var value;
+do
+	value = '2';
+while (0);

```

## `swc/next/feeback-plotly/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 178 vs reference 180 (no whitespaces: -2, formatted: -2)

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

## `swc/projects/mootools/9`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 235 vs reference 237 (no whitespaces: -2, formatted: -2)

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

## `swc/issues/12223/catch-return-assignment`

- size: oxc 91 vs reference 94 (no whitespaces: -3, formatted: -4)

```js
function f() {
	var a = 1;
	try {
		throw 0;
	} catch (e) {
		return a = 2;
	} finally {
		console.log(a);
	}
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	var a = 1;
 	try {
 		throw 0;
-	} catch (e) {
+	} catch {
 		return a = 2;
 	} finally {
 		console.log(a);

```

## `swc/issues/12223/catch-throw-assignment`

- size: oxc 105 vs reference 108 (no whitespaces: -3, formatted: -4)

```js
function f() {
	var a = 1;
	try {
		throw 0;
	} catch (e) {
		throw a = 2;
	} finally {
		console.log(a);
	}
}
try {
	f();
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	var a = 1;
 	try {
 		throw 0;
-	} catch (e) {
+	} catch {
 		throw a = 2;
 	} finally {
 		console.log(a);

```

## `swc/issues/12304`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 202 vs reference 205 (no whitespaces: -3, formatted: +1)

```js
function codeUnits(value) {
	return value.split('').map((char) => char.charCodeAt(0).toString(16)).join(',');
}
console.log([
	'\ud800\n',
	'\udc00\n',
	'😀\n',
	'\\uD800\n',
	'\\${value}`\r\n\n'
].map(codeUnits).join('|'));

```

```diff
--- reference
+++ oxc
@@ -2,15 +2,9 @@
 	return value.split('').map((char) => char.charCodeAt(0).toString(16)).join(',');
 }
 console.log([
-	`\uD800
-`,
-	`\uDC00
-`,
-	`😀
-`,
-	`\\uD800
-`,
-	`\\\${value}\`\x01\r
-
-`
+	'\ud800\n',
+	'\udc00\n',
+	'😀\n',
+	'\\uD800\n',
+	'\\${value}`\r\n\n'
 ].map(codeUnits).join('|'));

```

## `swc/issues/7591`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 82 vs reference 85 (no whitespaces: -3, formatted: +0)

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
+var x = someFunction;
 function someFunction() {
 	return 2;
 }
-console.log(someFunction), console.log(someFunction);
+console.log(x), console.log(x);

```

## `swc/issues/8705`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 39 vs reference 42 (no whitespaces: -3, formatted: +0)

```js
console.log(Math.pow({ valueOf() {
	return 42;
} }, 1));

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(Math.pow({ valueOf: () => 42 }, 1));
+console.log({ valueOf() {
+	return 42;
+} } ** 1);

```

## `swc/member_expr/callee`

- tags: `drop debugger`, `join vars`, `sequences`
- size: oxc 47 vs reference 50 (no whitespaces: -3, formatted: -4)

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
-	(void 0).baz?.();
-} catch (e) {
+	({}).bar.baz?.();
+} catch {
 	console.log('PASS');
 }

```

## `swc/pr/6272`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 6 vs reference 9 (no whitespaces: -3, formatted: -5)

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

## `swc/projects/yui/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 206 vs reference 209 (no whitespaces: -3, formatted: -2)

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

## `swc/issues/12282`

- tags: `join vars`, `keep function names`
- size: oxc 172 vs reference 176 (no whitespaces: -4, formatted: -4)

```js
function foo(data) {
	const mutable = [];
	function f(x) {
		mutable.push(x);
		return x + 1;
	}
	const processed = data.map((x) => f(x));
	return {
		mutable: [...mutable],
		processed
	};
}
console.log(foo([
	1,
	2,
	3
]));

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 function foo(data) {
-	const mutable = [];
+	let mutable = [];
 	function f(x) {
 		mutable.push(x);
 		return x + 1;
 	}
-	const processed = data.map((x) => f(x));
+	let processed = data.map((x) => f(x));
 	return {
 		mutable: [...mutable],
 		processed

```

## `swc/issues/12282/array`

- tags: `join vars`, `keep function names`
- size: oxc 162 vs reference 166 (no whitespaces: -4, formatted: -4)

```js
function foo(data) {
	const mutable = [];
	function f(x) {
		mutable.push(x);
		return x + 1;
	}
	const processed = data.map((x) => f(x));
	return [...mutable, processed];
}
console.log(foo([
	1,
	2,
	3
]));

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 function foo(data) {
-	const mutable = [];
+	let mutable = [];
 	function f(x) {
 		mutable.push(x);
 		return x + 1;
 	}
-	const processed = data.map((x) => f(x));
+	let processed = data.map((x) => f(x));
 	return [...mutable, processed];
 }
 console.log(foo([

```

## `swc/issues/5588`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 165 vs reference 169 (no whitespaces: -4, formatted: -4)

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

## `swc/issues/11645/child-scope-reassign-merge`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 92 vs reference 97 (no whitespaces: -5, formatted: -6)

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

## `swc/issues/12194`

- size: oxc 340 vs reference 345 (no whitespaces: -5, formatted: -6)

```js
const events = [];
const value = {
	get current() {
		events.push('get');
		return 0;
	},
	set current(value) {
		events.push('set');
	}
};
console.log(value.current === void (value.current = 1));
console.log(value.current === !(value.current = 1));
console.log(value.current === 0);
console.log(value.current === void 0);
console.log(value.current === !0);
console.log(events.join(','));

```

```diff
--- reference
+++ oxc
@@ -9,8 +9,8 @@
 	}
 };
 console.log(value.current === void (value.current = 1));
-console.log(value.current === (value.current = 1, false));
-console.log(0 === value.current);
-console.log(void 0 === value.current);
-console.log(!0 === value.current);
+console.log(value.current === !(value.current = 1));
+console.log(value.current === 0);
+console.log(value.current === void 0);
+console.log(value.current === !0);
 console.log(events.join(','));

```

## `swc/issues/12229`

- size: oxc 145 vs reference 150 (no whitespaces: -5, formatted: +0)

```js
function f(a, b, c, d) {
	if (a) return;
	if (b) return;
	if (c) {
		while (log()) {}
	}
	if (d) {
		while (log()) {}
	}
}
var n = 0;
function log() {
	console.log(++n);
	return false;
}
f(false, false, true, true);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,12 @@
 function f(a, b, c, d) {
-	if (a || b) return;
-	if (c) while (log());
-	if (d) while (log());
+	if (a) return;
+	if (b) return;
+	if (c) for (; log(););
+	if (d) for (; log(););
 }
 var n = 0;
 function log() {
 	console.log(++n);
-	return false;
+	return !1;
 }
-f(false, false, true, true);
+f(!1, !1, !0, !0);

```

## `swc/projects/backbone/16`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 499 vs reference 504 (no whitespaces: -5, formatted: -7)

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

## `swc/issues/7194/1`

- tags: `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 162 vs reference 168 (no whitespaces: -6, formatted: -10)

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
@@ -1,8 +1,6 @@
 function example() {
 	var MyEnum = function(MyEnumInner) {
-		MyEnumInner['First'] = 'first';
-		MyEnumInner['Second'] = 'second';
-		return MyEnumInner;
+		return MyEnumInner.First = 'first', MyEnumInner.Second = 'second', MyEnumInner;
 	}(MyEnum || {});
 	return MyEnum;
 }

```

## `swc/issues/8324`

- tags: `3 iterations`
- size: oxc 400 vs reference 406 (no whitespaces: -6, formatted: -19)

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

## `swc/member_expr/array`

- tags: `drop debugger`, `join vars`, `sequences`
- size: oxc 655 vs reference 661 (no whitespaces: -6, formatted: -6)

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

## `swc/projects/next/extra/if_return/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 757 vs reference 763 (no whitespaces: -6, formatted: -8)

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
- size: oxc 98 vs reference 104 (no whitespaces: -6, formatted: -8)

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

## `swc/issues/12199/partial`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 317 vs reference 324 (no whitespaces: -7, formatted: +42)

```js
function partialLeading(x) {
	return [
		,
		1,
		2,
		x
	].join('-');
}
function partialInterior(x) {
	return [
		1,
		,
		2,
		x
	].join('-');
}
function partialTrailing(x) {
	return [
		x,
		1,
		2,
		,
	].join('-');
}
function partialControl(x) {
	return [
		1,
		2,
		x
	].join('-');
}
console.log([
	partialLeading('x'),
	partialInterior('x'),
	partialTrailing('x'),
	partialControl('x')
].join('|'));

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,33 @@
 function partialLeading(x) {
-	return ['-1-2', x].join('-');
+	return [
+		,
+		1,
+		2,
+		x
+	].join('-');
 }
 function partialInterior(x) {
-	return ['1--2', x].join('-');
+	return [
+		1,
+		,
+		2,
+		x
+	].join('-');
 }
 function partialTrailing(x) {
-	return [x, '1-2-'].join('-');
+	return [
+		x,
+		1,
+		2,
+		,
+	].join('-');
 }
 function partialControl(x) {
-	return ['1-2', x].join('-');
+	return [
+		1,
+		2,
+		x
+	].join('-');
 }
 console.log([
 	partialLeading('x'),

```

## `swc/issues/4249`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 232 vs reference 239 (no whitespaces: -7, formatted: -9)

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

## `swc/projects/backbone/7`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 224 vs reference 231 (no whitespaces: -7, formatted: -7)

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
@@ -1,6 +1,6 @@
 function foo() {
 	var collection = this, success = options.success;
-	return options.success = function(model1, resp, options1) {
-		options1.wait && collection.add(model1, options1), success && success(model1, resp, options1);
+	return options.success = function(model, resp, options) {
+		options.wait && collection.add(model, options), success && success(model, resp, options);
 	}, model.save(null, options), model;
 }

```

## `swc/projects/underscore/8`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 535 vs reference 542 (no whitespaces: -7, formatted: -9)

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

## `swc/issues/12208/independent-optional-operands`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 229 vs reference 237 (no whitespaces: -8, formatted: -13)

```js
const obj = {};
const func = () => {};
const get = (value) => value;
console.log(obj?.[null?.veryLongProperty]);
console.log(func?.(null?.veryLongProperty));
console.log(get(null?.veryLongProperty)?.x);
console.log(get(null?.veryLongProperty)?.x.y);
console.log({ value: null?.veryLongProperty }?.value);
console.log([null?.veryLongProperty]?.[0]);
console.log((null?.veryLongProperty, obj)?.x);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 const obj = {}, func = () => {}, get = (value) => value;
-console.log(obj?.[void 0]), console.log(func?.(void 0)), console.log(((value) => value)(void 0)?.x), console.log(((value) => value)(void 0)?.x.y), console.log(void 0), console.log(void 0), console.log(obj?.x);
+console.log(obj?.[void 0]), console.log(func?.(void 0)), console.log(get(void 0)?.x), console.log(get(void 0)?.x.y), console.log({ value: void 0 }.value), console.log(void 0), console.log(obj?.x);

```

## `swc/issues/12229/no-return`

- size: oxc 111 vs reference 119 (no whitespaces: -8, formatted: -5)

```js
function f(c, d) {
	if (c) {
		while (log()) {}
	}
	if (d) {
		while (log()) {}
	}
}
var n = 0;
function log() {
	console.log(++n);
	return false;
}
f(true, true);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 function f(c, d) {
-	if (c) while (log());
-	if (d) while (log());
+	if (c) for (; log(););
+	if (d) for (; log(););
 }
 var n = 0;
 function log() {
 	console.log(++n);
-	return false;
+	return !1;
 }
-f(true, true);
+f(!0, !0);

```

## `swc/issues/12299`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 297 vs reference 305 (no whitespaces: -8, formatted: -11)

```js
function f(x) {
	try {
		if (x) throw 1;
	} finally {
		return 2;
	}
	return 2;
}
function finalizerOverridesReturn() {
	try {
		return 1;
	} finally {
		return 2;
	}
	return 2;
}
function duplicateReturn(x) {
	if (x) return 2;
	return 2;
}
console.log(f(false));
console.log(f(true));
console.log(finalizerOverridesReturn());
console.log(duplicateReturn(false));
console.log(duplicateReturn(true));

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,6 @@
 	} finally {
 		return 2;
 	}
-	return 2;
 }
 function finalizerOverridesReturn() {
 	try {

```

## `swc/issues/12306`

- tags: `remove unused`, `keep function names`
- size: oxc 47 vs reference 55 (no whitespaces: -8, formatted: -11)

```js
var f = function g() {
	return 1;
};
console.log(f.name === 'g');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var f = function g() {
+console.log(function g() {
 	return 1;
-};
-console.log('g' === f.name);
+}.name === 'g');

```

## `swc/issues/12306/keep-fnames-false`

- tags: `remove unused`
- size: oxc 45 vs reference 53 (no whitespaces: -8, formatted: -11)

```js
var f = function g() {
	return 1;
};
console.log(f.name === 'f');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var f = function() {
+console.log(function() {
 	return 1;
-};
-console.log('f' === f.name);
+}.name === 'f');

```

## `swc/issues/3709`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 26 vs reference 34 (no whitespaces: -8, formatted: -10)

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

## `swc/issues/6344/2`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`
- size: oxc 210 vs reference 218 (no whitespaces: -8, formatted: -8)

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
@@ -1,18 +1,18 @@
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
+	var n = function() {
+		a();
 	};
-	var t = null;
-	return { init: function n(n) {
-		return t;
+	var e = null;
+	return { init: function(t) {
+		return e;
 	} };
 }();

```

## `swc/issues/9619`

- tags: `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 32 vs reference 40 (no whitespaces: -8, formatted: -10)

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
@@ -1,2 +1,2 @@
-var a = (() => 'expected')();
+var a = 'expected';
 console.log(a);

```

## `swc/issues/do-while-false-terminal-jump/labels-preserved`

- tags: `1 iteration`
- size: oxc 259 vs reference 267 (no whitespaces: -8, formatted: -8)

```js
function preservedLabels() {
	var events = [];
	first: do {
		events.push('break');
		break first;
	} while (false);
	events.push('first tail');
	second: do {
		events.push('continue');
		continue second;
	} while (false);
	events.push('second tail');
	return events.join('|');
}
console.log(preservedLabels());

```

```diff
--- reference
+++ oxc
@@ -3,12 +3,12 @@
 	first: do {
 		events.push('break');
 		break first;
-	} while (false);
+	} while (0);
 	events.push('first tail');
 	second: do {
 		events.push('continue');
 		continue second;
-	} while (false);
+	} while (0);
 	events.push('second tail');
 	return events.join('|');
 }

```

## `swc/pr/11987`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 24 vs reference 32 (no whitespaces: -8, formatted: -10)

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

## `swc/projects/backbone/15`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 291 vs reference 299 (no whitespaces: -8, formatted: -9)

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

## `swc/issues/9263`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 77 vs reference 86 (no whitespaces: -9, formatted: -10)

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

## `swc/issues/do-while-false-terminal-jump/completion/call-continue`

- tags: `1 iteration`
- size: oxc 68 vs reference 77 (no whitespaces: -9, formatted: -15)

```js
function record(value) {
	return value;
}
record(1);
do {
	record(7);
	continue;
} while (0);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,6 @@
 	return value;
 }
 record(1);
-do {
+do
 	record(7);
-	continue;
-} while (0);
+while (0);

```

## `swc/issues/9741_multiple_methods`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 208 vs reference 218 (no whitespaces: -10, formatted: +8)

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
+const a = Object.assign({}, {}), b = Object.assign({}, {}), c = Object.keys({ a: 1 }), d = Object.keys({ b: 2 }), e = Array.isArray([]), f = Array.isArray({});
+console.log(a, b, c, d, e, f);

```

## `swc/issues/do-while-false-terminal-jump/completion/typed-bigint`

- tags: `1 iteration`
- size: oxc 31 vs reference 41 (no whitespaces: -10, formatted: -16)

```js
var value;
do {
	value = 2n;
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 var value;
-do {
+do
 	value = 2n;
-	break;
-} while (false);
+while (0);

```

## `swc/issues/do-while-false-terminal-jump/completion/typed-nan`

- tags: `1 iteration`
- size: oxc 32 vs reference 42 (no whitespaces: -10, formatted: -18)

```js
var value;
do {
	value = NaN;
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 var value;
-do {
-	value = 0 / 0;
-	break;
-} while (false);
+do
+	value = NaN;
+while (0);

```

## `swc/issues/do-while-false-terminal-jump/completion/typed-negative-zero`

- tags: `1 iteration`
- size: oxc 31 vs reference 41 (no whitespaces: -10, formatted: -16)

```js
var value;
do {
	value = -0;
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 var value;
-do {
+do
 	value = -0;
-	break;
-} while (false);
+while (0);

```

## `swc/issues/do-while-false-terminal-jump/completion/typed-null`

- tags: `1 iteration`
- size: oxc 33 vs reference 43 (no whitespaces: -10, formatted: -16)

```js
var value;
do {
	value = null;
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 var value;
-do {
+do
 	value = null;
-	break;
-} while (false);
+while (0);

```

## `swc/issues/do-while-false-terminal-jump/completion/typed-positive-zero`

- tags: `1 iteration`
- size: oxc 30 vs reference 40 (no whitespaces: -10, formatted: -16)

```js
var value;
do {
	value = 0;
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 var value;
-do {
+do
 	value = 0;
-	break;
-} while (false);
+while (0);

```

## `swc/issues/do-while-false-terminal-jump/completion/typed-string-undefined`

- tags: `1 iteration`
- size: oxc 40 vs reference 50 (no whitespaces: -10, formatted: -16)

```js
var value;
do {
	value = 'undefined';
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 var value;
-do {
+do
 	value = 'undefined';
-	break;
-} while (false);
+while (0);

```

## `swc/next/41992/1`

- size: oxc 190 vs reference 200 (no whitespaces: -10, formatted: -10)

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

## `swc/next/46887-2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 853 vs reference 863 (no whitespaces: -10, formatted: -14)

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

## `swc/projects/backbone/12`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 88 vs reference 98 (no whitespaces: -10, formatted: -13)

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

## `swc/simple/inline/5`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 180 vs reference 191 (no whitespaces: -11, formatted: -8)

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

## `swc/issues/12226`

- tags: `sequences`
- size: oxc 357 vs reference 369 (no whitespaces: -12, formatted: -11)

```js
try {
	console.log((console.log('sequence'), ((a) => 1)(missing)));
} catch (error) {
	console.log(error.name);
}
try {
	console.log(((a) => 1)(missing));
} catch (error) {
	console.log(error.name);
}
const object = { get value() {
	console.log('getter');
	return 1;
} };
console.log((console.log('member'), ((a) => 1)(object.value)));
console.log((console.log('no-argument'), (() => 2)()));
console.log((console.log('primitive'), ((a) => a)(3)));

```

```diff
--- reference
+++ oxc
@@ -8,7 +8,6 @@
 } catch (error) {
 	console.log(error.name);
 }
-const object = { get value() {
+console.log((console.log('member'), ((a) => 1)({ get value() {
 	return console.log('getter'), 1;
-} };
-console.log((console.log('member'), ((a) => 1)(object.value))), console.log((console.log('no-argument'), 2)), console.log((console.log('primitive'), 3));
+} }.value))), console.log((console.log('no-argument'), 2)), console.log((console.log('primitive'), ((a) => a)(3)));

```

## `swc/issues/6628`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 293 vs reference 305 (no whitespaces: -12, formatted: -14)

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

## `swc/issues/do-while-false-hoisted-bindings`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 423 vs reference 435 (no whitespaces: -12, formatted: -12)

```js
var shared = 'outer';
function directReadAfterBreak() {
	do {
		break;
		var local = 'unreachable';
	} while (false);
	return local;
}
function shadowAfterContinue() {
	do {
		continue;
		var shared = 'unreachable';
	} while (false);
	return shared;
}
function capturedBinding() {
	var read = function() {
		return shared;
	};
	do {
		break;
		var shared = 'unreachable';
	} while (false);
	return read;
}
console.log(directReadAfterBreak() === undefined);
console.log(shadowAfterContinue() === undefined);
console.log(capturedBinding()() === undefined);
console.log(shared);

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,16 @@
 var shared = 'outer';
 function directReadAfterBreak() {
 	do {
-		var local;
 		break;
-	} while (false);
+		var local;
+	} while (0);
 	return local;
 }
 function shadowAfterContinue() {
 	do {
-		var shared;
 		continue;
-	} while (false);
+		var shared;
+	} while (0);
 	return shared;
 }
 function capturedBinding() {
@@ -18,12 +18,9 @@
 		return shared;
 	};
 	do {
-		var shared;
 		break;
-	} while (false);
+		var shared;
+	} while (0);
 	return read;
 }
-console.log(void 0 === directReadAfterBreak());
-console.log(void 0 === shadowAfterContinue());
-console.log(void 0 === capturedBinding()());
-console.log(shared);
+console.log(directReadAfterBreak() === void 0), console.log(shadowAfterContinue() === void 0), console.log(capturedBinding()() === void 0), console.log(shared);

```

## `swc/issues/do-while-false-terminal-jump/completion/unused-prefix-break`

- tags: `remove unused`, `1 iteration`
- size: oxc 20 vs reference 32 (no whitespaces: -12, formatted: -14)

```js
var x;
x = 1;
do {
	void function() {};
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-var x;
-x = 1;
-do
-	break;
-while (false);
+var x = 1;
+do;
+while (0);

```

## `swc/projects/yui/6`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 64 vs reference 76 (no whitespaces: -12, formatted: -12)

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

## `swc/issues/do-while-false-terminal-jump/completion/typed-boolean`

- tags: `1 iteration`
- size: oxc 31 vs reference 44 (no whitespaces: -13, formatted: -19)

```js
var value;
do {
	value = false;
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 var value;
-do {
-	value = false;
-	break;
-} while (false);
+do
+	value = !1;
+while (0);

```

## `swc/projects/backbone/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 193 vs reference 206 (no whitespaces: -13, formatted: -14)

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
@@ -1,5 +1,5 @@
 function foo() {
-	return eventsApi(this, 'on', name, [callback, context]) && callback && (this._events || (this._events = {}), (this._events[name] || (this._events[name] = [])).push({
+	return !eventsApi(this, 'on', name, [callback, context]) || !callback || (this._events ||= {}, (this._events[name] || (this._events[name] = [])).push({
 		callback,
 		context,
 		ctx: context || this

```

## `swc/projects/backbone/5`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 341 vs reference 354 (no whitespaces: -13, formatted: -14)

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

## `swc/issues/7228/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 52 vs reference 66 (no whitespaces: -14, formatted: -18)

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

## `swc/issues/do-while-false-terminal-jump/completion/unused-prefix-continue`

- tags: `remove unused`, `1 iteration`
- size: oxc 20 vs reference 35 (no whitespaces: -15, formatted: -17)

```js
var x;
x = 1;
do {
	void function() {};
	continue;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-var x;
-x = 1;
-do
-	continue;
-while (false);
+var x = 1;
+do;
+while (0);

```

## `swc/issues/do-while-false-terminal-jump/guarded-rejected`

- tags: `1 iteration`
- size: oxc 283 vs reference 298 (no whitespaces: -15, formatted: -19)

```js
function alternateBranch(stop) {
	var events = [];
	try {
		do {
			if (stop) throw 'stop';
			else events.push('alternate');
			events.push('body');
			break;
		} while (false);
		events.push('tail');
	} catch (error) {
		events.push('caught:' + error);
	}
	return events.join('|');
}
console.log(alternateBranch(false));
console.log(alternateBranch(true));

```

```diff
--- reference
+++ oxc
@@ -5,13 +5,12 @@
 			if (stop) throw 'stop';
 			else events.push('alternate');
 			events.push('body');
-			break;
-		} while (false);
+		} while (0);
 		events.push('tail');
 	} catch (error) {
 		events.push('caught:' + error);
 	}
 	return events.join('|');
 }
-console.log(alternateBranch(false));
-console.log(alternateBranch(true));
+console.log(alternateBranch(!1));
+console.log(alternateBranch(!0));

```

## `swc/reduced/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 222 vs reference 237 (no whitespaces: -15, formatted: -20)

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

## `swc/issues/do-while-false-terminal-jump/completion/assignment-break`

- tags: `1 iteration`
- size: oxc 32 vs reference 48 (no whitespaces: -16, formatted: -23)

```js
var value;
value = 1;
do {
	value = 2;
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
-var value;
-value = 1;
-do {
+var value = 1;
+do
 	value = 2;
-	break;
-} while (false);
+while (0);

```

## `swc/issues/do-while-false-terminal-jump/completion/empty-break`

- tags: `1 iteration`
- size: oxc 24 vs reference 40 (no whitespaces: -16, formatted: -22)

```js
var value;
value = 1;
do {
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-var value;
-value = 1;
-do {
-	break;
-} while (false);
+var value = 1;
+do;
+while (0);

```

## `swc/issues/do-while-false-terminal-jump/completion/guard-before-expression`

- tags: `1 iteration`
- size: oxc 77 vs reference 93 (no whitespaces: -16, formatted: -19)

```js
var value, checked;
value = 1;
do {
	if ((checked = 2) < 0) throw 'stop';
	value = checked + 1;
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-var value, checked;
-value = 1;
+var value = 1, checked;
 do {
 	if ((checked = 2) < 0) throw 'stop';
 	value = checked + 1;
-	break;
-} while (false);
+} while (0);

```

## `swc/issues/do-while-false-terminal-jump/completion/undefined-break`

- tags: `1 iteration`
- size: oxc 37 vs reference 53 (no whitespaces: -16, formatted: -23)

```js
var value;
value = 1;
do {
	value = undefined;
	break;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
-var value;
-value = 1;
-do {
+var value = 1;
+do
 	value = void 0;
-	break;
-} while (false);
+while (0);

```

## `swc/issues/12282/call`

- tags: `join vars`, `keep function names`
- size: oxc 394 vs reference 411 (no whitespaces: -17, formatted: -16)

```js
function foo(data) {
	const mutable = [];
	function f(x) {
		mutable.push(x);
		return x + 1;
	}
	const processed = data.map((x) => f(x));
	return Array.of(...mutable, processed);
}
class Pair {
	constructor(...values) {
		this.values = values;
	}
}
function bar(data) {
	const mutable = [];
	function f(x) {
		mutable.push(x);
		return x + 1;
	}
	const processed = data.map((x) => f(x));
	return new Pair(...mutable, processed).values;
}
console.log(foo([
	1,
	2,
	3
]));
console.log(bar([
	1,
	2,
	3
]));

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 function foo(data) {
-	const mutable = [];
+	let mutable = [];
 	function f(x) {
 		mutable.push(x);
 		return x + 1;
 	}
-	const processed = data.map((x) => f(x));
-	return Array.of(...mutable, processed);
+	let processed = data.map((x) => f(x));
+	return [...mutable, processed];
 }
 class Pair {
 	constructor(...values) {
@@ -13,12 +13,12 @@
 	}
 }
 function bar(data) {
-	const mutable = [];
+	let mutable = [];
 	function f(x) {
 		mutable.push(x);
 		return x + 1;
 	}
-	const processed = data.map((x) => f(x));
+	let processed = data.map((x) => f(x));
 	return new Pair(...mutable, processed).values;
 }
 console.log(foo([

```

## `swc/issues/9741_collision`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 99 vs reference 117 (no whitespaces: -18, formatted: -18)

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
+const _Object_assign = [], a = {};
+Object.assign(a, {});
 const b = {};
-_Object_assign(b, {}), _Object_assign(b, a);
+Object.assign(b, {}), Object.assign(b, a);

```

## `swc/issues/string-from-char-code-uint16`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 103 vs reference 121 (no whitespaces: -18, formatted: -18)

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

## `swc/issues/6422/3`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 194 vs reference 213 (no whitespaces: -19, formatted: -29)

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

## `swc/issues/do-while-false-terminal-jump/completion/conditional-parent`

- tags: `1 iteration`
- size: oxc 52 vs reference 71 (no whitespaces: -19, formatted: -26)

```js
var flag = false;
var value;
value = 1;
if (flag) {
	do {
		value = 2;
		break;
	} while (false);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-var flag = false;
-var value;
-value = 1;
-if (flag) do {
+var flag = !1;
+var value = 1;
+if (flag) do
 	value = 2;
-	break;
-} while (false);
+while (0);

```

## `swc/issues/do-while-false-terminal-jump/completion/debugger-continue`

- tags: `1 iteration`
- size: oxc 41 vs reference 60 (no whitespaces: -19, formatted: -22)

```js
var value;
value = 1;
do {
	value = 2;
	debugger;
	continue;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-var value;
-value = 1;
+var value = 1;
 do {
 	value = 2;
 	debugger;
-	continue;
-} while (false);
+} while (0);

```

## `swc/issues/do-while-false-terminal-jump/completion/empty-continue`

- tags: `1 iteration`
- size: oxc 24 vs reference 43 (no whitespaces: -19, formatted: -25)

```js
var value;
value = 1;
do {
	continue;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-var value;
-value = 1;
-do {
-	continue;
-} while (false);
+var value = 1;
+do;
+while (0);

```

## `swc/issues/do-while-false-terminal-jump/completion/guard-after-expression`

- tags: `1 iteration`
- size: oxc 59 vs reference 78 (no whitespaces: -19, formatted: -22)

```js
var value;
value = 1;
do {
	value = 2;
	if ((value = 3) < 0) throw 'stop';
	continue;
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-var value;
-value = 1;
+var value = 1;
 do {
 	value = 2;
 	if ((value = 3) < 0) throw 'stop';
-	continue;
-} while (false);
+} while (0);

```

## `swc/collapse-vars/cascade-statement/bailouts`

- tags: `join vars`
- size: oxc 594 vs reference 617 (no whitespaces: -23, formatted: -33)

```js
function barrier() {
	var c = 0;
	function read() {
		console.log('before', c);
		return 1;
	}
	return c = 2, read() + c;
}
console.log('barrier', barrier());
function shortCircuit(flag) {
	var c;
	c = 3, flag && c;
	console.log('short', c);
}
shortCircuit(false);
function protectedBinding() {
	const c = 0;
	try {
		return c = 1, c || 2;
	} catch (error) {
		console.log('const', error instanceof TypeError, c);
	}
}
protectedBinding();
function directEval() {
	var c = 0;
	c = 4, eval('console.log(\'eval\', c)');
}
directEval();
function protectedCall(fn) {
	var c;
	c = fn, c();
}
protectedCall(function() {
	console.log('protected call');
});
function argumentsValue() {
	var c;
	return c = arguments, c[0];
}
console.log('arguments', argumentsValue(5));

```

```diff
--- reference
+++ oxc
@@ -10,7 +10,7 @@
 function shortCircuit(flag) {
 	console.log('short', 3);
 }
-shortCircuit(false);
+shortCircuit(!1);
 function protectedBinding() {
 	const c = 0;
 	try {
@@ -26,14 +26,12 @@
 }
 directEval();
 function protectedCall(fn) {
-	var c;
-	c = fn, c();
+	fn();
 }
 protectedCall(function() {
 	console.log('protected call');
 });
 function argumentsValue() {
-	var c;
-	return c = arguments, c[0];
+	return arguments[0];
 }
 console.log('arguments', argumentsValue(5));

```

## `swc/issues/do-while-false-terminal-jump/loops-disabled`

- tags: `1 iteration`
- size: oxc 214 vs reference 237 (no whitespaces: -23, formatted: -37)

```js
function disabledLoops() {
	var events = [];
	do {
		events.push('break');
		break;
	} while (false);
	events.push('first tail');
	do {
		events.push('continue');
		continue;
	} while (false);
	events.push('second tail');
	return events.join('|');
}
console.log(disabledLoops());

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,12 @@
 function disabledLoops() {
 	var events = [];
-	do {
+	do
 		events.push('break');
-		break;
-	} while (false);
+	while (0);
 	events.push('first tail');
-	do {
+	do
 		events.push('continue');
-		continue;
-	} while (false);
+	while (0);
 	events.push('second tail');
 	return events.join('|');
 }

```

## `swc/next/43052`

- tags: `2 iterations`
- size: oxc 785 vs reference 808 (no whitespaces: -23, formatted: -31)

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

## `swc/issues/12218/dynamic-spread`

- tags: `remove unused`
- size: oxc 319 vs reference 343 (no whitespaces: -24, formatted: -26)

```js
function run(values) {
	return (function(a, b, c) {
		return [a, c];
	})(...values, 3);
}
const events = [];
const values = { [Symbol.iterator]() {
	events.push('iterator');
	let index = 0;
	return { next() {
		events.push(`next:${index}`);
		if (index < 2) {
			return {
				value: ++index,
				done: false
			};
		}
		return { done: true };
	} };
} };
const result = run(values);
console.log(events.join(','), JSON.stringify(result));

```

```diff
--- reference
+++ oxc
@@ -1,20 +1,19 @@
 function run(values) {
-	return function(a, b, c) {
+	return (function(a, b, c) {
 		return [a, c];
-	}(...values, 3);
+	})(...values, 3);
 }
 const events = [];
-const values = { [Symbol.iterator]() {
+const result = run({ [Symbol.iterator]() {
 	events.push('iterator');
 	let index = 0;
 	return { next() {
 		events.push(`next:${index}`);
 		if (index < 2) return {
 			value: ++index,
-			done: false
+			done: !1
 		};
-		return { done: true };
+		return { done: !0 };
 	} };
-} };
-const result = run(values);
+} });
 console.log(events.join(','), JSON.stringify(result));

```

## `swc/issues/do-while-false-control-flow`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 915 vs reference 942 (no whitespaces: -27, formatted: -45)

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

## `swc/issues/12182/callee-safety/nested-values`

- size: oxc 270 vs reference 298 (no whitespaces: -28, formatted: -21)

```js
function work() {
	console.log('run');
}
const tag = 'metadata';
const candidate = {
	run: () => work(),
	objectMeta: { value: tag },
	arrayMeta: [tag],
	negatedMeta: !tag
};
candidate.run();
console.log(candidate.objectMeta.value);
console.log(candidate.arrayMeta[0]);
console.log(candidate.negatedMeta);

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,13 @@
 	console.log('run');
 }
 const tag = 'metadata';
-const candidate_run = () => work(), candidate_objectMeta_value = tag, candidate_arrayMeta = [tag], candidate_negatedMeta = !tag;
-candidate_run();
-console.log(candidate_objectMeta_value);
-console.log(candidate_arrayMeta[0]);
-console.log(candidate_negatedMeta);
+const candidate = {
+	run: () => work(),
+	objectMeta: { value: tag },
+	arrayMeta: [tag],
+	negatedMeta: !1
+};
+candidate.run();
+console.log(candidate.objectMeta.value);
+console.log(candidate.arrayMeta[0]);
+console.log(candidate.negatedMeta);

```

## `swc/issues/10539`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 193 vs reference 223 (no whitespaces: -30, formatted: -24)

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
@@ -1,8 +1,7 @@
 // class def completely disappears
-// class def disappears, leaving only `new DoesntWorkClass()` as output
-(class DoesntWorkClass {
+var DisappearsCompletely = class {}, DoesntWork = class DoesntWorkClass {
 	static prop = new DoesntWorkClass();
-});
+};
 // works fine
 class WorksClass {
 	static prop = new WorksClass();

```

## `swc/issues/12218/leading-argument`

- tags: `remove unused`
- size: oxc 58 vs reference 89 (no whitespaces: -31, formatted: -34)

```js
const value = 1;
const values = [2, 3];
(function(unused, used) {
	console.log(used);
})({ large: value }, ...values);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-const value = 1;
-const values = [2, 3];
 (function(unused, used) {
 	console.log(used);
-})(0, ...values);
+})({ large: 1 }, 2, 3);

```

## `swc/issues/12313`

- size: oxc 619 vs reference 651 (no whitespaces: -32, formatted: -32)

```js
var key = 'flag';
var obj = { flag: 1 };
obj['flag']++;
console.log(obj[key]);
obj['flag']++;
console.log(obj[key]);
console.log(++obj['flag']);
console.log(obj['flag']--);
console.log(--obj['flag']);
obj.flag++;
console.log(obj[key]);
function updateLocal(obj) {
	obj['flag']++;
	obj.flag--;
	return obj['flag'];
}
console.log(updateLocal({ flag: 1 }));
console.log(obj['flag']);
obj[KEY]++;
console.log(obj[key]);
this.flag = 1;
this[KEY]++;
console.log(this.flag);
function getObject() {
	return obj;
}
getObject()[KEY]++;
console.log(obj[key]);
(getObject?.())[KEY]++;
console.log(obj[key]);
({ flag: 1 })[KEY]++;
var nested = { flag: { value: 1 } };
nested[KEY].value++;
console.log(nested.flag.value);

```

```diff
--- reference
+++ oxc
@@ -1,34 +1,34 @@
 var key = 'flag';
 var obj = { flag: 1 };
-obj['flag']++;
+obj.flag++;
 console.log(obj[key]);
-obj['flag']++;
+obj.flag++;
 console.log(obj[key]);
-console.log(++obj['flag']);
-console.log(obj['flag']--);
-console.log(--obj['flag']);
+console.log(++obj.flag);
+console.log(obj.flag--);
+console.log(--obj.flag);
 obj.flag++;
 console.log(obj[key]);
 function updateLocal(obj) {
-	obj['flag']++;
+	obj.flag++;
 	obj.flag--;
-	return obj['flag'];
+	return obj.flag;
 }
 console.log(updateLocal({ flag: 1 }));
-console.log(1);
-obj['flag']++;
+console.log(obj.flag);
+obj[KEY]++;
 console.log(obj[key]);
 this.flag = 1;
-this['flag']++;
+this[KEY]++;
 console.log(this.flag);
 function getObject() {
 	return obj;
 }
-getObject()['flag']++;
+getObject()[KEY]++;
 console.log(obj[key]);
-(getObject?.())['flag']++;
+(getObject?.())[KEY]++;
 console.log(obj[key]);
-({ flag: 1 })['flag']++;
+({ flag: 1 })[KEY]++;
 var nested = { flag: { value: 1 } };
-nested['flag'].value++;
+nested[KEY].value++;
 console.log(nested.flag.value);

```

## `swc/issues/do-while-false-terminal-jump/guarded-jump`

- tags: `1 iteration`
- size: oxc 934 vs reference 967 (no whitespaces: -33, formatted: -45)

```js
function guardedBreak(value) {
	var events = [];
	try {
		do {
			if (events.push('guard'), value == null) throw events.push('throw value'), 'null';
			events.push('work:' + value);
			break;
		} while (false);
		events.push('tail');
	} catch (error) {
		events.push('caught:' + error);
	}
	return events.join('|');
}
function guardedContinue(value) {
	var events = [];
	try {
		do {
			if (events.push('guard'), value == null) throw events.push('throw value'), 'null';
			events.push('work:' + value);
			continue;
		} while (false);
		events.push('tail');
	} catch (error) {
		events.push('caught:' + error);
	}
	return events.join('|');
}
function throwingCondition() {
	var events = [];
	function check() {
		events.push('check');
		throw 'condition';
	}
	try {
		do {
			if (check()) throw 'wrong throw value';
			events.push('wrong body');
			break;
		} while (false);
		events.push('wrong tail');
	} catch (error) {
		events.push('caught:' + error);
	}
	return events.join('|');
}
console.log(guardedBreak('ok'));
console.log(guardedBreak(null));
console.log(guardedContinue('ok'));
console.log(guardedContinue(null));
console.log(throwingCondition());

```

```diff
--- reference
+++ oxc
@@ -2,10 +2,9 @@
 	var events = [];
 	try {
 		do {
-			if (events.push('guard'), null == value) throw events.push('throw value'), 'null';
+			if (events.push('guard'), value == null) throw events.push('throw value'), 'null';
 			events.push('work:' + value);
-			break;
-		} while (false);
+		} while (0);
 		events.push('tail');
 	} catch (error) {
 		events.push('caught:' + error);
@@ -16,10 +15,9 @@
 	var events = [];
 	try {
 		do {
-			if (events.push('guard'), null == value) throw events.push('throw value'), 'null';
+			if (events.push('guard'), value == null) throw events.push('throw value'), 'null';
 			events.push('work:' + value);
-			continue;
-		} while (false);
+		} while (0);
 		events.push('tail');
 	} catch (error) {
 		events.push('caught:' + error);
@@ -36,8 +34,7 @@
 		do {
 			if (check()) throw 'wrong throw value';
 			events.push('wrong body');
-			break;
-		} while (false);
+		} while (0);
 		events.push('wrong tail');
 	} catch (error) {
 		events.push('caught:' + error);

```

## `swc/issues/8337`

- tags: `3 iterations`
- size: oxc 225 vs reference 259 (no whitespaces: -34, formatted: -38)

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

## `swc/issues/10918`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 310 vs reference 346 (no whitespaces: -36, formatted: -28)

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

## `swc/issues/9741`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 81 vs reference 117 (no whitespaces: -36, formatted: -39)

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

## `swc/issues/12182/callee-safety/lexical-this`

- size: oxc 132 vs reference 169 (no whitespaces: -37, formatted: -37)

```js
function readLexicalReceiver() {
	const lexicalReceiver = { read: () => this.value };
	return lexicalReceiver.read();
}
console.log(readLexicalReceiver.call({ value: 'lexical receiver' }));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function readLexicalReceiver() {
-	const lexicalReceiver_read = () => this.value;
-	return lexicalReceiver_read();
+	return { read: () => this.value }.read();
 }
 console.log(readLexicalReceiver.call({ value: 'lexical receiver' }));

```

## `swc/issues/do-while-false-terminal-jump/skipped-scopes`

- tags: `1 iteration`
- size: oxc 384 vs reference 421 (no whitespaces: -37, formatted: -68)

```js
var events = [];
do {
	events.push('outside');
	break;
} while (false);
function withScope() {
	var count = 0;
	try {
		with({ undefined: true }) {
			do {
				count++;
				if (count > 1) throw 'stopped';
				continue;
			} while (undefined);
		}
	} catch (error) {
		events.push(error + ':' + count);
	}
}
function asmScope() {
	'use asm';
	function once(value) {
		value = value | 0;
		do {
			value = value + 1 | 0;
			break;
		} while (0);
		return value | 0;
	}
	return once;
}
withScope();
console.log(events.join('|'));
console.log(asmScope()(2));

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,14 @@
 var events = [];
-do {
+do
 	events.push('outside');
-	break;
-} while (false);
+while (0);
 function withScope() {
 	var count = 0;
 	try {
-		with({ undefined: true }) {
-			do {
-				count++;
-				if (count > 1) throw 'stopped';
-				continue;
-			} while (undefined);
-		}
+		with({ undefined: !0 }) do {
+			count++;
+			if (count > 1) throw 'stopped';
+		} while (void 0);
 	} catch (error) {
 		events.push(error + ':' + count);
 	}
@@ -20,11 +16,10 @@
 function asmScope() {
 	'use asm';
 	function once(value) {
-		value = value | 0;
-		do {
+		value |= 0;
+		do
 			value = value + 1 | 0;
-			break;
-		} while (0);
+		while (0);
 		return value | 0;
 	}
 	return once;

```

## `swc/issues/drop-console-nullish-console`

- tags: `drop console`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 173 vs reference 211 (no whitespaces: -38, formatted: -50)

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

## `swc/issues/11321`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 599 vs reference 641 (no whitespaces: -42, formatted: -39)

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

## `swc/issues/do-while-false-terminal-jump/repeated-directive`

- tags: `1 iteration`
- size: oxc 80 vs reference 122 (no whitespaces: -42, formatted: -61)

```js
function f() {
	({ a: class {
		static {
			do {
				(function() {});
				break;
			} while (false);
		}
	} });
	'use strict';
	return this === undefined;
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,10 @@
 function f() {
-	({ a: class {
+	(class {
 		static {
-			do {
-				(function() {});
-				break;
-			} while (false);
+			do			;
+while (0);
 		}
-	} });
-	'use strict';
-	return void 0 === this;
+	});
+	return this === void 0;
 }
 console.log(f());

```

## `swc/issues/vercel/004`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 469 vs reference 514 (no whitespaces: -45, formatted: -53)

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

## `swc/issues/do-while-false-terminal-jump/side-effects`

- tags: `1 iteration`
- size: oxc 717 vs reference 767 (no whitespaces: -50, formatted: -81)

```js
function conditionEffects() {
	var events = [];
	do {
		events.push('break body');
		break;
	} while (events.push('wrong condition'), false);
	do {
		events.push('continue body');
		continue;
	} while (events.push('continue condition'), false);
	events.push('tail');
	return events.join('|');
}
function prefixThrows() {
	var events = [];
	function fail() {
		events.push('call');
		throw 'failure';
	}
	try {
		do {
			fail();
			break;
		} while (false);
		events.push('wrong break tail');
	} catch (error) {
		events.push(error);
	}
	try {
		do {
			fail();
			continue;
		} while (false);
		events.push('wrong continue tail');
	} catch (error) {
		events.push(error);
	}
	return events.join('|');
}
function explicitThrow() {
	try {
		do {
			throw 'explicit';
			break;
		} while (false);
	} catch (error) {
		return error;
	}
	return 'wrong tail';
}
console.log(conditionEffects());
console.log(prefixThrows());
console.log(explicitThrow());

```

```diff
--- reference
+++ oxc
@@ -3,11 +3,10 @@
 	do {
 		events.push('break body');
 		break;
-	} while (events.push('wrong condition'), false);
-	do {
+	} while (events.push('wrong condition'), 0);
+	do
 		events.push('continue body');
-		continue;
-	} while (events.push('continue condition'), false);
+	while (events.push('continue condition'), 0);
 	events.push('tail');
 	return events.join('|');
 }
@@ -18,19 +17,17 @@
 		throw 'failure';
 	}
 	try {
-		do {
+		do
 			fail();
-			break;
-		} while (false);
+		while (0);
 		events.push('wrong break tail');
 	} catch (error) {
 		events.push(error);
 	}
 	try {
-		do {
+		do
 			fail();
-			continue;
-		} while (false);
+		while (0);
 		events.push('wrong continue tail');
 	} catch (error) {
 		events.push(error);
@@ -39,10 +36,9 @@
 }
 function explicitThrow() {
 	try {
-		do {
+		do
 			throw 'explicit';
-			break;
-		} while (false);
+		while (0);
 	} catch (error) {
 		return error;
 	}

```

## `swc/issues/11133`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 1193 vs reference 1244 (no whitespaces: -51, formatted: -50)

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

## `swc/issues/12193`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 576 vs reference 627 (no whitespaces: -51, formatted: -51)

```js
function returnBeforeFinally() {
	var value = 1;
	try {
		throw 0;
	} catch (error) {
		return value;
	} finally {
		value = 2;
	}
	return value;
}
function sideEffectBeforeFinally() {
	var effects = [];
	try {
		throw 0;
	} catch (error) {
		return effects.push('catch');
	} finally {
		effects.push('finally');
	}
	return effects.push('tail');
}
function sideEffect() {
	console.log('side effect');
	return 1;
}
function sideEffectWithoutFinally() {
	try {
		throw 0;
	} catch (error) {
		return sideEffect();
	}
	return sideEffect();
}
function safeWithoutFinally() {
	var value = 1;
	try {
		throw 0;
	} catch (error) {
		return value;
	}
	return value;
}
console.log(returnBeforeFinally());
console.log(sideEffectBeforeFinally());
console.log(sideEffectWithoutFinally());
console.log(safeWithoutFinally());

```

```diff
--- reference
+++ oxc
@@ -2,23 +2,21 @@
 	var value = 1;
 	try {
 		throw 0;
-	} catch (error) {
+	} catch {
 		return value;
 	} finally {
 		value = 2;
 	}
-	return value;
 }
 function sideEffectBeforeFinally() {
 	var effects = [];
 	try {
 		throw 0;
-	} catch (error) {
+	} catch {
 		return effects.push('catch');
 	} finally {
 		effects.push('finally');
 	}
-	return effects.push('tail');
 }
 function sideEffect() {
 	return console.log('side effect'), 1;
@@ -26,13 +24,16 @@
 function sideEffectWithoutFinally() {
 	try {
 		throw 0;
-	} catch (error) {}
-	return sideEffect();
+	} catch {
+		return sideEffect();
+	}
 }
 function safeWithoutFinally() {
+	var value = 1;
 	try {
 		throw 0;
-	} catch (error) {}
-	return 1;
+	} catch {
+		return value;
+	}
 }
 console.log(returnBeforeFinally()), console.log(sideEffectBeforeFinally()), console.log(sideEffectWithoutFinally()), console.log(safeWithoutFinally());

```

## `swc/issues/arguments-parameter-injection-limit`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 87 vs reference 139 (no whitespaces: -52, formatted: -56)

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
@@ -1,5 +1,5 @@
-function withinLimit(argument_0, argument_1, argument_2, argument_3, argument_4) {
-	return argument_4;
+function withinLimit() {
+	return arguments[4];
 }
 function exceedsLimit() {
 	return arguments[5];

```

## `swc/issues/do-while-false-terminal-jump/scope-directives`

- tags: `1 iteration`
- size: oxc 593 vs reference 645 (no whitespaces: -52, formatted: -64)

```js
function directiveProbe() {
	do {
		'use strict';
		break;
	} while (false);
	return this === undefined;
}
function mixedDirectiveProbe() {
	do {
		'use strict';
		console.log('body');
		continue;
	} while (false);
	return this === undefined;
}
function lexicalClosure() {
	var value = 'outer';
	var read;
	do {
		let value = 'inner';
		read = function() {
			return value;
		};
		break;
	} while (false);
	return read() + '|' + value;
}
function nestedFunction() {
	var events = [];
	do {
		events.push((function() {
			for (var i = 0; i < 2; i++) {
				if (i === 0) continue;
				break;
			}
			return 'function';
		})());
		continue;
	} while (false);
	events.push('tail');
	return events.join('|');
}
console.log(directiveProbe());
console.log(mixedDirectiveProbe());
console.log(lexicalClosure());
console.log(nestedFunction());

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,13 @@
 function directiveProbe() {
-	do {
-		'use strict';
-		break;
-	} while (false);
-	return void 0 === this;
+	do	;
+while (0);
+	return this === void 0;
 }
 function mixedDirectiveProbe() {
-	do {
-		'use strict';
+	do
 		console.log('body');
-		continue;
-	} while (false);
-	return void 0 === this;
+	while (0);
+	return this === void 0;
 }
 function lexicalClosure() {
 	var value = 'outer';
@@ -19,21 +15,22 @@
 	do {
 		let value = 'inner';
 		read = function() {
-			return value;
+			return 'inner';
 		};
-		break;
-	} while (false);
+	} while (0);
 	return read() + '|' + value;
 }
 function nestedFunction() {
 	var events = [];
-	do {
-		events.push(function() {
-			for (var i = 0; i < 2 && 0 === i; i++);
+	do
+		events.push((function() {
+			for (var i = 0; i < 2; i++) {
+				if (i === 0) continue;
+				break;
+			}
 			return 'function';
-		}());
-		continue;
-	} while (false);
+		})());
+	while (0);
 	events.push('tail');
 	return events.join('|');
 }

```

## `swc/issues/number-radix-conversion`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 280 vs reference 333 (no whitespaces: -53, formatted: -45)

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

## `swc/issues/react/hooks/4`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 555 vs reference 610 (no whitespaces: -55, formatted: -66)

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

## `swc/issues/12201`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 249 vs reference 311 (no whitespaces: -62, formatted: -61)

```js
function printArray(array) {
	console.log(array.length, 0 in array, array.join(','));
}
function fromSpreads(first, second) {
	return Array(...first, ...second);
}
// Unknown spreads may produce exactly one numeric argument.
printArray(fromSpreads([3], []));
// Unknown spreads producing multiple elements must keep their element-list semantics.
printArray(fromSpreads([3], [4]));
// Literal spreads have known arity and may still use the existing folds.
printArray(Array(...[3], ...[]));
printArray(Array(...[3], ...[4]));

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,6 @@
 function fromSpreads(first, second) {
 	return Array(...first, ...second);
 }
-// Unknown spreads may produce exactly one numeric argument.
 printArray(fromSpreads([3], [])), printArray(fromSpreads([3], [4])), printArray([
 	,
 	,

```

## `swc/projects/jquery/26`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 208 vs reference 278 (no whitespaces: -70, formatted: -80)

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

## `swc/issues/do-while-false-terminal-jump/directive-barrier`

- tags: `remove unused`, `1 iteration`
- size: oxc 283 vs reference 355 (no whitespaces: -72, formatted: -84)

```js
function directBreak() {
	do {
		(function() {});
		break;
	} while (false);
	'use strict';
	return this === undefined;
}
function nestedStringContinue() {
	do {
		(function() {});
		continue;
	} while (false);
	{
		{
			;
			'use strict';
		}
	}
	return this === undefined;
}
function enclosingBlockBreak() {
	{
		do {
			(function() {});
			break;
		} while (false);
	}
	'use strict';
	return this === undefined;
}
console.log(directBreak());
console.log(nestedStringContinue());
console.log(enclosingBlockBreak());

```

```diff
--- reference
+++ oxc
@@ -1,23 +1,17 @@
 function directBreak() {
-	do
-		break;
-	while (false);
-	'use strict';
-	return void 0 === this;
+	do	;
+while (0);
+	return this === void 0;
 }
 function nestedStringContinue() {
-	do
-		continue;
-	while (false);
-	'use strict';
-	return void 0 === this;
+	do	;
+while (0);
+	return this === void 0;
 }
 function enclosingBlockBreak() {
-	do
-		break;
-	while (false);
-	'use strict';
-	return void 0 === this;
+	do	;
+while (0);
+	return this === void 0;
 }
 console.log(directBreak());
 console.log(nestedStringContinue());

```

## `swc/issues/drop-console-shadowed`

- tags: `drop console`, `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 26 vs reference 100 (no whitespaces: -74, formatted: -92)

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
@@ -1,5 +1,2 @@
-function local() {
-	const console = { log: (msg) => process.stdout.write(msg + '\n') };
-	console.log('kept');
-}
+function local() {}
 local();

```

## `swc/issues/11082`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 184 vs reference 262 (no whitespaces: -78, formatted: -99)

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

## `swc/issues/3256/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 323 vs reference 426 (no whitespaces: -103, formatted: -105)

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

## `swc/projects/react/7`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 299 vs reference 405 (no whitespaces: -106, formatted: -107)

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
@@ -1,14 +1,12 @@
 function getElementKey(element, index) {
-	// Do some typechecking here since we call this blindly. We want to ensure
-	// that we don't block potential future ES APIs.
-	if ('object' == typeof element && null !== element && null != element.key) {
-		var key, escaperLookup;
-		return key = '' + element.key, escaperLookup = {
+	function escape(key) {
+		var escapeRegex = /[=:]/g, escaperLookup = {
 			'=': '=0',
 			':': '=2'
-		}, '$' + key.replace(/[=:]/g, function(match) {
+		};
+		return '$' + key.replace(escapeRegex, function(match) {
 			return escaperLookup[match];
 		});
 	}
-	return index.toString(36);
+	return typeof element == 'object' && element && element.key != null ? escape('' + element.key) : index.toString(36);
 }

```

## `swc/issues/8119`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 270 vs reference 397 (no whitespaces: -127, formatted: -126)

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

## `swc/issues/9610-keep-fargs`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 118 vs reference 249 (no whitespaces: -131, formatted: -131)

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

## `swc/issues/do-while-false-terminal-jump/parent-rewrites`

- tags: `1 iteration`
- size: oxc 250 vs reference 384 (no whitespaces: -134, formatted: -191)

```js
function objectParent() {
	({ value: class {
		static {
			do {
				(function() {});
				break;
			} while (false);
		}
	} });
	'use strict';
	return this === undefined;
}
function switchParent(flag) {
	switch (flag) {
		case 1: do {
			(function() {});
			break;
		} while (false);
		case 2: do {
			(function() {});
			break;
		} while (false);
		case 3: do {
			(function() {});
			break;
		} while (false);
	}
	'use strict';
	return this === undefined;
}
console.log(objectParent());
console.log(switchParent(1));

```

```diff
--- reference
+++ oxc
@@ -1,32 +1,22 @@
 function objectParent() {
-	({ value: class {
+	(class {
 		static {
-			do {
-				(function() {});
-				break;
-			} while (false);
+			do			;
+while (0);
 		}
-	} });
-	'use strict';
-	return void 0 === this;
+	});
+	return this === void 0;
 }
 function switchParent(flag) {
 	switch (flag) {
-		case 1: do {
-			(function() {});
-			break;
-		} while (false);
-		case 2: do {
-			(function() {});
-			break;
-		} while (false);
-		case 3: do {
-			(function() {});
-			break;
-		} while (false);
+		case 1: do		;
+while (0);
+		case 2: do		;
+while (0);
+		case 3: do		;
+while (0);
 	}
-	'use strict';
-	return void 0 === this;
+	return this === void 0;
 }
 console.log(objectParent());
 console.log(switchParent(1));

```

## `swc/issues/7683/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 129 vs reference 268 (no whitespaces: -139, formatted: -192)

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

## `swc/issues/do-while-false-terminal-jump/condition-exceptions`

- tags: `1 iteration`
- size: oxc 289 vs reference 447 (no whitespaces: -158, formatted: -250)

```js
try {
	do {
		console.log('body');
		continue;
	} while (void class extends 0 {
		static {
			do {
				(function() {});
				break;
			} while (false);
		}
	});
	console.log('unexpected');
} catch (e) {
	console.log(e.name);
}
try {
	do {
		console.log('reference');
		continue;
	} while (void class {
		static {
			do {
				({ missing });
				break;
			} while (false);
		}
	});
	console.log('unexpected');
} catch (e) {
	console.log(e.name);
}
do {
	console.log('break');
	break;
} while (void class extends 0 {
	static {
		do {
			(function() {});
			break;
		} while (false);
	}
});
console.log('after');

```

```diff
--- reference
+++ oxc
@@ -1,44 +1,26 @@
 try {
-	do {
+	do
 		console.log('body');
-		continue;
-	} while (void class extends 0 {
-		static {
-			do {
-				(function() {});
-				break;
-			} while (false);
-		}
-	});
+	while (void 0);
 	console.log('unexpected');
 } catch (e) {
 	console.log(e.name);
 }
 try {
-	do {
+	do
 		console.log('reference');
-		continue;
-	} while (void class {
+	while (void class {
 		static {
-			do {
-				({ missing });
-				break;
-			} while (false);
+			do
+				missing;
+			while (0);
 		}
 	});
 	console.log('unexpected');
 } catch (e) {
 	console.log(e.name);
 }
-do {
+do
 	console.log('break');
-	break;
-} while (void class extends 0 {
-	static {
-		do {
-			(function() {});
-			break;
-		} while (false);
-	}
-});
+while (void 0);
 console.log('after');

```

## `swc/next/feedback-regex`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 148 vs reference 368 (no whitespaces: -220, formatted: -252)

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

