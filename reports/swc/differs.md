# swc / differs — Output differs at equal length

Fixtures: 32

[← swc](README.md) · [← all families](../README.md)

## `swc/issues/10250`


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
 export function example(value) {
-	if (void 0 !== value) return someConditional() ? value : doSomething(value);
+	if (value !== void 0) return someConditional() ? value : doSomething(value);
 }

```

## `swc/issues/10466`


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
 const G = { setPackageName({ packageName }) {
-	return 'string' == typeof packageName && (this.packageName = packageName), this;
+	return typeof packageName == 'string' && (this.packageName = packageName), this;
 } };
 G.setPackageName({ packageName: '@clerk/clerk-react' }), console.log(G.packageName);

```

## `swc/issues/10720`


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
@@ -2,7 +2,7 @@
 	switch (someVal) {
 		case 'one':
 			// if there is a certain condition, we exit
-			if ('break' === shouldBreak) break;
+			if (shouldBreak === 'break') break;
 			return 1;
 		default: return 0;
 	}

```

## `swc/issues/11084`


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
@@ -3,20 +3,16 @@
 	hasMore: !1,
 	hasDisorder: !1
 };
-[bin.hasMore, bin.hasDisorder] = [!0, !0];
-console.log(bin.hasMore, bin.hasDisorder);
+[bin.hasMore, bin.hasDisorder] = [!0, !0], console.log(bin.hasMore, bin.hasDisorder);
 // Test case 2: Array element destructuring assignment
 const arr = [1, 2];
-[arr[0], arr[1]] = [arr[1], arr[0]];
-console.log(arr);
+[arr[0], arr[1]] = [arr[1], arr[0]], console.log(arr);
 // Test case 3: Nested object destructuring
 const obj = {
 	a: { x: 0 },
 	b: { y: 0 }
 };
-[obj.a.x, obj.b.y] = [10, 20];
-console.log(obj.a.x, obj.b.y);
+[obj.a.x, obj.b.y] = [10, 20], console.log(obj.a.x, obj.b.y);
 // Test case 4: Mixed literals and expressions
 const state = { flag: !1 };
-[state.flag] = [!0];
-console.log(state.flag);
+[state.flag] = [!0], console.log(state.flag);

```

## `swc/issues/11512-exhaustive/iife-default-reassigned`


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
 export function iifeDefaultReassigned(value) {
-	return function(a, b = 1) {
-		b = 2;
-		return a;
-	}(value);
+	return (function(a, b = 1) {
+		return b = 2, a;
+	})(value);
 }

```

## `swc/issues/11645/unresolved-global-rebind`


```js
f = (a) => a;
globalThis.f = (_, b) => b;
console.log(f(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-f = (a) => a;
-globalThis.f = (_, b) => b;
-console.log(f(1, 2));
+f = (a) => a, globalThis.f = (_, b) => b, console.log(f(1, 2));

```

## `swc/issues/11684/identifier-aliases`


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
@@ -2,16 +2,13 @@
 	this.value = value;
 }
 var FunctionAlias = FunctionTarget;
-out.FunctionAlias = FunctionAlias;
-out.functionAlias = new FunctionAlias(1, 2, 3);
+out.FunctionAlias = FunctionAlias, out.functionAlias = new FunctionAlias(1, 2, 3);
 class ClassTarget {
 	constructor(value) {
 		this.value = value;
 	}
 }
 var ClassAlias = ClassTarget;
-out.ClassAlias = ClassAlias;
-out.classAlias = new ClassAlias(1, 2, 3);
+out.ClassAlias = ClassAlias, out.classAlias = new ClassAlias(1, 2, 3);
 var { DestructuredCtor } = constructors;
-out.DestructuredCtor = DestructuredCtor;
-out.destructured = new DestructuredCtor(1, 2, 3);
+out.DestructuredCtor = DestructuredCtor, out.destructured = new DestructuredCtor(1, 2, 3);

```

## `swc/issues/11684/nested-eval`


```js
class OuterEvalMutableClass {}
out.OuterEvalMutableClass = OuterEvalMutableClass;
function constructOuterClassAfterEval() {
	eval('OuterEvalMutableClass = ExternalClass');
	return new OuterEvalMutableClass(1, 2, 3);
}
out.constructOuterClassAfterEval = constructOuterClassAfterEval;
function OuterEvalMutableFunction() {}
out.OuterEvalMutableFunction = OuterEvalMutableFunction;
function constructOuterFunctionAfterEval() {
	eval('OuterEvalMutableFunction = ExternalFunction');
	return new OuterEvalMutableFunction(1, 2, 3);
}
out.constructOuterFunctionAfterEval = constructOuterFunctionAfterEval;

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,12 @@
 class OuterEvalMutableClass {}
+out.OuterEvalMutableClass = OuterEvalMutableClass;
 function constructOuterClassAfterEval() {
 	return eval('OuterEvalMutableClass = ExternalClass'), new OuterEvalMutableClass(1, 2, 3);
 }
+out.constructOuterClassAfterEval = constructOuterClassAfterEval;
 function OuterEvalMutableFunction() {}
+out.OuterEvalMutableFunction = OuterEvalMutableFunction;
 function constructOuterFunctionAfterEval() {
 	return eval('OuterEvalMutableFunction = ExternalFunction'), new OuterEvalMutableFunction(1, 2, 3);
 }
-out.OuterEvalMutableClass = OuterEvalMutableClass, out.constructOuterClassAfterEval = constructOuterClassAfterEval, out.OuterEvalMutableFunction = OuterEvalMutableFunction, out.constructOuterFunctionAfterEval = constructOuterFunctionAfterEval;
+out.constructOuterFunctionAfterEval = constructOuterFunctionAfterEval;

```

## `swc/issues/2078/1`


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
+let rerenderQueue = [1], queue;
 for (; rerenderQueue.length > 0;) queue = rerenderQueue.sort(), rerenderQueue = [], queue.forEach((c) => console.log(c));

```

## `swc/issues/2679`


```js
(function() {
	var a = {};
	a.b = 1;
	a = null;
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-!function() {
+(function() {
 	var a = {};
-	a.b = 1;
-	a = null;
-}();
+	a.b = 1, a = null;
+})();

```

## `swc/issues/2779/1`


```js
const e = Math.random();
console.log(e === -1 / 0);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(-1 / 0 === Math.random());
+console.log(Math.random() === -1 / 0);

```

## `swc/issues/3173/1`


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
+export const IndexPage = (value) => value === 'loading' ? 1 : value === 'error' ? 2 : 3;

```

## `swc/issues/4845`


```js
console.log(a + ((b ? 'c' : 'd') + 1));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(a + (b ? 'c' : 'd') + '1');
+console.log(a + ((b ? 'c' : 'd') + 1));

```

## `swc/issues/6422/2`


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
@@ -2,5 +2,4 @@
 let result = 'FAIL';
 ({ ...{ get prop() {
 	result = 'PASS';
-} } });
-assert.strictEqual(result, 'PASS');
+} } }), assert.strictEqual(result, 'PASS');

```

## `swc/issues/7591`


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

## `swc/issues/7969`


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
@@ -8,10 +8,8 @@
 function g(arr) {
 	return f(arr);
 }
-globalThis.g = g;
-g([
+globalThis.g = g, g([
 	1,
 	2,
 	3
-]);
-console.log(a);
+]), console.log(a);

```

## `swc/issues/8161`


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
 function run(flag, output = 'a output') {
-	'b' === flag && (output = 'b output'), console.log(output);
+	flag === 'b' && (output = 'b output'), console.log(output);
 }
 run('a'), run('b');

```

## `swc/issues/8705`


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

## `swc/issues/9650`


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
+export function logVariables(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L, R, z, B, V, H, U, W, G, K, q, J, Y, X, Z, Q, ee, te, ne, re, ie, ae, oe) {
+	console.log(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k);
 }

```

## `swc/issues/framer-motion/1`


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
 export function resolveVariantFromProps(props, definition, custom, visualElement) {
-	if ('function' == typeof definition) {
+	if (typeof definition == 'function') {
 		let [current, velocity] = getValueState(visualElement);
-		definition = definition(void 0 !== custom ? custom : props.custom, current, velocity);
+		definition = definition(custom === void 0 ? props.custom : custom, current, velocity);
 	}
-	if ('string' == typeof definition && (definition = props.variants && props.variants[definition]), 'function' == typeof definition) {
+	if (typeof definition == 'string' && (definition = props.variants && props.variants[definition]), typeof definition == 'function') {
 		let [current, velocity] = getValueState(visualElement);
-		definition = definition(void 0 !== custom ? custom : props.custom, current, velocity);
+		definition = definition(custom === void 0 ? props.custom : custom, current, velocity);
 	}
 	return definition;
 }

```

## `swc/next/30498/1`


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
@@ -3,12 +3,12 @@
 }
 export class StringSchema extends BaseSchema {
 	matches(regex, options) {
-		let message, name, excludeEmptyString = !1;
-		return options && ('object' == typeof options ? {excludeEmptyString = !1, message, name} = options : message = options), this.test({
+		let excludeEmptyString = !1, message, name;
+		return options && (typeof options == 'object' ? {excludeEmptyString = !1, message, name} = options : message = options), this.test({
 			name: name || 'matches',
 			message: message || string.matches,
 			params: { regex },
-			test: (value) => isAbsent(value) || '' === value && excludeEmptyString || -1 !== value.search(regex)
+			test: (value) => isAbsent(value) || value === '' && excludeEmptyString || value.search(regex) !== -1
 		});
 	}
 }

```

## `swc/projects/backbone/1`


```js
var _ = root._;
if (!_ && typeof require !== 'undefined') _ = require('underscore');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var _ = root._;
-!_ && 'u' > typeof require && (_ = require('underscore'));
+!_ && typeof require < 'u' && (_ = require('underscore'));

```

## `swc/projects/jquery/22`


```js
export const obj = { set: function(elem, value, extra) {
	var styles = extra && getStyles(elem);
	return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box', styles) : 0);
} };

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 export const obj = { set: function(elem, value, extra) {
 	var styles = extra && getStyles(elem);
-	return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && 'border-box' === jQuery.css(elem, 'boxSizing', !1, styles), styles) : 0);
+	return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing', !1, styles) === 'border-box', styles) : 0);
 } };

```

## `swc/projects/jquery/8`


```js
for (; list && firingIndex < firingLength; firingIndex++) {
	if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
		memory = false;
		break;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-for (; list && firingIndex < firingLength; firingIndex++) if (!1 === list[firingIndex].apply(data[0], data[1]) && options.stopOnFalse) {
+for (; list && firingIndex < firingLength; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
 	memory = !1;
 	break;
 }

```

## `swc/projects/mootools/4`


```js
export const obj = { flatten: function() {
	var array = [];
	for (var i = 0, l = this.length; i < l; i++) {
		var type = typeOf(this[i]);
		if (type == 'null') continue;
		array = array.concat(type == 'array' || type == 'collection' || type == 'arguments' || instanceOf(this[i], Array) ? Array.flatten(this[i]) : this[i]);
	}
	return array;
} };

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 export const obj = { flatten: function() {
 	for (var array = [], i = 0, l = this.length; i < l; i++) {
 		var type = typeOf(this[i]);
-		'null' != type && (array = array.concat('array' == type || 'collection' == type || 'arguments' == type || instanceOf(this[i], Array) ? Array.flatten(this[i]) : this[i]));
+		type != 'null' && (array = array.concat(type == 'array' || type == 'collection' || type == 'arguments' || instanceOf(this[i], Array) ? Array.flatten(this[i]) : this[i]));
 	}
 	return array;
 } };

```

## `swc/projects/underscore/11`


```js
if (typeof /./ !== 'function') {
	_.isFunction = function(obj) {
		return typeof obj === 'function';
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-'function' != typeof /./ && (_.isFunction = function(obj) {
-	return 'function' == typeof obj;
+typeof /./ != 'function' && (_.isFunction = function(obj) {
+	return typeof obj == 'function';
 });

```

## `swc/projects/underscore/13`


```js
_.result = function(object, property) {
	if (object == null) return void 0;
	var value = object[property];
	return _.isFunction(value) ? value.call(object) : value;
};

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 _.result = function(object, property) {
-	if (null != object) {
+	if (object != null) {
 		var value = object[property];
 		return _.isFunction(value) ? value.call(object) : value;
 	}

```

## `swc/projects/underscore/20`


```js
if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-('shift' == name || 'splice' == name) && 0 === obj.length && delete obj[0];
+(name == 'shift' || name == 'splice') && obj.length === 0 && delete obj[0];

```

## `swc/projects/underscore/23`


```js
_.once = function(func) {
	var ran = false, memo;
	return function() {
		if (ran) return memo;
		ran = true;
		memo = func.apply(this, arguments);
		func = null;
		return memo;
	};
};

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 _.once = function(func) {
-	var memo, ran = !1;
+	var ran = !1, memo;
 	return function() {
 		return ran || (ran = !0, memo = func.apply(this, arguments), func = null), memo;
 	};

```

## `swc/projects/underscore/9`


```js
_.once = function(func) {
	var ran = false, memo;
	return function() {
		if (ran) return memo;
		ran = true;
		memo = func.apply(this, arguments);
		func = null;
		return memo;
	};
};

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 _.once = function(func) {
-	var memo, ran = !1;
+	var ran = !1, memo;
 	return function() {
 		return ran || (ran = !0, memo = func.apply(this, arguments), func = null), memo;
 	};

```

## `swc/projects/yui/1`


```js
export const E = { test: function(Y) {
	var DOCUMENT = Y.config.doc, useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != 'canvas', canvas = DOCUMENT && DOCUMENT.createElement('canvas'), svg = DOCUMENT && DOCUMENT.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
	return svg && (useSVG || !canvas);
} };

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 export const E = { test: function(Y) {
-	var DOCUMENT = Y.config.doc, useSVG = !Y.config.defaultGraphicEngine || 'canvas' != Y.config.defaultGraphicEngine, canvas = DOCUMENT && DOCUMENT.createElement('canvas');
+	var DOCUMENT = Y.config.doc, useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != 'canvas', canvas = DOCUMENT && DOCUMENT.createElement('canvas');
 	return DOCUMENT && DOCUMENT.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1') && (useSVG || !canvas);
 } };

```

## `swc/projects/yui/12`


```js
export const E = { test: function(cat, name, args) {
	args = args || [];
	var result, ua, test, cat_o = feature_tests[cat], feature = cat_o && cat_o[name];
	if (!feature) {} else {
		result = feature.result;
		if (Y.Lang.isUndefined(result)) {
			ua = feature.ua;
			if (ua) {
				result = Y.UA[ua];
			}
			test = feature.test;
			if (test && (!ua || result)) {
				result = test.apply(Y, args);
			}
			feature.result = result;
		}
	}
	return result;
} };

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 export const E = { test: function(cat, name, args) {
-	args = args || [];
+	args ||= [];
 	var result, ua, test, cat_o = feature_tests[cat], feature = cat_o && cat_o[name];
-	return feature && (result = feature.result, Y.Lang.isUndefined(result) && ((ua = feature.ua) && (result = Y.UA[ua]), (test = feature.test) && (!ua || result) && (result = test.apply(Y, args)), feature.result = result)), result;
+	return feature && (result = feature.result, Y.Lang.isUndefined(result) && (ua = feature.ua, ua && (result = Y.UA[ua]), test = feature.test, test && (!ua || result) && (result = test.apply(Y, args)), feature.result = result)), result;
 } };

```

