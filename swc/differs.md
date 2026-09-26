# swc / differs — Output differs at equal length

Fixtures: 26

[← swc](README.md) · [← all families](../README.md)

## `swc/issues/10816`


```js
class A {
	fromArrow() {
		console.log('hello');
	}
	foobar() {
		const callMe = () => this.fromArrow();
		function B() {
			callMe();
		}
		return B;
	}
}
const instance = new A();
const fn = instance.foobar();
fn();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
-new class {
+class e {
 	fromArrow() {
 		console.log('hello');
 	}
 	foobar() {
-		let callMe = () => this.fromArrow();
-		return function() {
-			callMe();
-		};
+		let e = () => this.fromArrow();
+		function t() {
+			e();
+		}
+		return t;
 	}
-}().foobar()();
+}
+new e().foobar()();

```

## `swc/issues/10938`


```js
let Number;
console.log(Number.NaN);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log((void 0).NaN);
+let e;
+console.log(e.NaN);

```

## `swc/issues/11645/eval-parent-scope-nested-function`


```js
function outer() {
	let f = (a) => a;
	eval('f = (_, b) => b');
	function inner() {
		return f(1, 2);
	}
	return inner();
}
console.log(outer());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function outer() {
-	let f = (a) => a;
+	let f = (e) => e;
 	eval('f = (_, b) => b');
 	function inner() {
 		return f(1, 2);

```

## `swc/issues/11645/for-of-rebind-arity`


```js
let f = (a) => a;
for (f of [(_, b) => b]) {
	break;
}
console.log(f(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-let f = (a) => a;
-for (f of [(_, b) => b]) break;
+let f = (e) => e;
+for (f of [(e, t) => t]) break;
 console.log(f(1, 2));

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
+f = (e) => e, globalThis.f = (e, t) => t, console.log(f(1, 2));

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
-	var a = {};
-	a.b = 1;
-	a = null;
-}();
+(function() {
+	var e = {};
+	e.b = 1, e = null;
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

## `swc/issues/3256/1`


```js
var n = 0;
n = 2e3;
console.log(n++);
export default n;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var n = 0;
-n = 2e3, console.log(n++);
-export default n;
+var e = 0;
+e = 2e3, console.log(e++);
+export default e;

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

## `swc/issues/5865`


```js
v = ((a) => (b) => {
	const n = a.map((t) => {
		if (t) return ((e) => e.foo)(t);
	});
	return n;
})(r);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-v = ((a) => (b) => a.map((t) => {
-	if (t) return ((e) => e.foo)(t);
+v = ((e) => (t) => e.map((e) => {
+	if (e) return ((e) => e.foo)(e);
 }))(r);

```

## `swc/issues/6146`


```js
let o = { f() {
	assert.ok(this !== o);
} };
(1, o.f)``;

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
-(0, o.f)``;
+(0, e.f)``;

```

## `swc/issues/8228`


```js
export const a = `You\'ll`;
export const b = 'You\'ll';

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export const a = 'You\'ll';
-export const b = 'You\'ll';
+export const e = 'You\'ll';
+export const t = 'You\'ll';

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

## `swc/issues/8718/1`


```js
let a = '';
console.log((a += 1, a += 2));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-let a = '';
-console.log((a += 1, a += 2));
+let e = '';
+console.log((e += 1, e += 2));

```

## `swc/issues/9741_disabled`


```js
// When option is disabled (default), no aliasing should happen
const a = {};
Object.assign(a, {});
const b = {};
Object.assign(b, {});
Object.assign(b, a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 // When option is disabled (default), no aliasing should happen
-const a = {};
-Object.assign(a, {});
-const b = {};
-Object.assign(b, {}), Object.assign(b, a);
+const e = {};
+Object.assign(e, {});
+const t = {};
+Object.assign(t, {}), Object.assign(t, e);

```

## `swc/pr/7856/2`


```js
export const a = 4;
export const b = 16;
export const c = 5;
export const d = () => a;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-export const a = 4;
-export const b = 16;
-export const c = 5;
-export const d = () => 4;
+export const e = 4;
+export const t = 16;
+export const n = 5;
+export const r = () => 4;

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

