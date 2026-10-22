# pass-1 / larger — Output longer than expected (possible missing optimization)

Fixtures: 11

[← pass-1](README.md) · [← all families](../README.md)

## `pass-1/3`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 45 vs reference 40 (no whitespaces: +5, formatted: +7)

```js
(() => {
	let x;
	console.log('undefined' + ('?ts=' + Date.now()));
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('undefined?ts=' + Date.now());
+console.log('undefined' + ('?ts=' + Date.now()));

```

## `pass-1/issues/6407/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 293 vs reference 282 (no whitespaces: +11, formatted: +6)

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
@@ -2,10 +2,8 @@
 	static encode(value) {
 		let ranges = [], range = [], retrString = A.encode(value), bitField = '';
 		return value.forEach((curValue, i) => {
-			bitField += B.encode(curValue);
-			range.push(i);
-			ranges.push(range);
-		}), retrString += '.', retrString += C.encode(ranges);
+			bitField += B.encode(curValue), range.push(i), ranges.push(range);
+		}), retrString += '.', retrString += C.encode(ranges), retrString;
 	}
 }
 console.log(Deno.encode());

```

## `pass-1/joda/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 334 vs reference 322 (no whitespaces: +12, formatted: +18)

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
@@ -1,10 +1,13 @@
 'use strict';
 (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[715], { 
-/***/ 3266: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
+/***/ 3266: (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
 	/* harmony export */ __webpack_require__.d(__webpack_exports__, { 
 	/* harmony export */ h: function() {
 		return LocalDate;
 	} });
 	var isInit = !1;
-	isInit || (isInit = !0);
-} }]);
+	function init() {
+		isInit ||= !0;
+	}
+	init();
+}) }]);

```

## `pass-1/8`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 103 vs reference 82 (no whitespaces: +21, formatted: +25)

```js
export function MultiPoint(point) {
	for (var point1, i = 0; i < 10; i++) {
		return point1 = point, 0 === distance(point1);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 export function MultiPoint(point) {
-	for (var i = 0; i < 10; i++) return 0 === distance(point);
+	for (var point1, i = 0; i < 10; i++) return point1 = point, distance(point1) === 0;
 }

```

## `pass-1/issue-6788/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 41 vs reference 19 (no whitespaces: +22, formatted: +28)

```js
const foo = { ...null && {} };
const bar = { ...null };
console.log(foo, bar);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log({}, {});
+const foo = {}, bar = {};
+console.log(foo, bar);

```

## `pass-1/joda/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 277 vs reference 235 (no whitespaces: +42, formatted: +57)

```js
'use strict';
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[715], { 3266: function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
	__webpack_require__.d(__webpack_exports__, { h: function() {
		return LocalDate;
	} });
	var isInit = !1;
	!function() {
		if (!isInit) isInit = !0;
	}();
} }]);

```

```diff
--- reference
+++ oxc
@@ -3,4 +3,8 @@
 	__webpack_require__.d(__webpack_exports__, { h: function() {
 		return LocalDate;
 	} });
+	var isInit = !1;
+	(function() {
+		isInit ||= !0;
+	})();
 } }]);

```

## `pass-1/9/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 87 vs reference 33 (no whitespaces: +54, formatted: +66)

```js
console.log('Greeting:', (function(value) {
	return function() {
		return value;
	};
})('Hello')());

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log('Greeting:', 'Hello');
+console.log('Greeting:', (function(value) {
+	return function() {
+		return value;
+	};
+})('Hello')());

```

## `pass-1/compute/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 129 vs reference 47 (no whitespaces: +82, formatted: +127)

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
@@ -1,2 +1,10 @@
-var b;
-console.log((b = 1588444911).toString(16));
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

## `pass-1/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 157 vs reference 32 (no whitespaces: +125, formatted: +156)

```js
(function() {
	var G = Object.prototype.hasOwnProperty, baselinePx = 4, faderWidth = 12 * baselinePx, faderHeight = 60 * baselinePx, trackWidth = faderWidth / 3, trackHeight = faderHeight - faderWidth, trackMargin = (faderWidth - trackWidth) / 2;
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-Object.prototype.hasOwnProperty;
+(function() {
+	var baselinePx = 4, faderWidth = 12 * baselinePx, faderHeight = 60 * baselinePx, trackWidth = faderWidth / 3;
+	faderHeight - faderWidth, (faderWidth - trackWidth) / 2;
+})();

```

## `pass-1/9/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
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

## `pass-1/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 1155 vs reference 132 (no whitespaces: +1023, formatted: +1155)

```js
var condString;
var exprAny1;
var exprBoolean1;
var exprNumber1;
var exprString1;
var exprIsObject1;
var exprAny2;
var exprBoolean2;
var exprNumber2;
var exprString2;
var exprIsObject2;
condString ? exprAny1 : exprAny2;
condString ? exprBoolean1 : exprBoolean2;
condString ? exprNumber1 : exprNumber2;
condString ? exprString1 : exprString2;
condString ? exprIsObject1 : exprIsObject2;
condString ? exprString1 : exprBoolean1;
'' ? exprAny1 : exprAny2;
'string' ? exprBoolean1 : exprBoolean2;
'c' ? exprNumber1 : exprNumber2;
'string' ? exprString1 : exprString2;
'  ' ? exprIsObject1 : exprIsObject2;
'hello ' ? exprString1 : exprBoolean1;
function foo() {
	return 'string';
}
var array = [
	'1',
	'2',
	'3'
];
typeof condString ? exprAny1 : exprAny2;
condString.toUpperCase ? exprBoolean1 : exprBoolean2;
condString + 'string' ? exprNumber1 : exprNumber2;
foo() ? exprString1 : exprString2;
array[1] ? exprIsObject1 : exprIsObject2;
foo() ? exprString1 : exprBoolean1;
var resultIsAny1 = condString ? exprAny1 : exprAny2;
var resultIsBoolean1 = condString ? exprBoolean1 : exprBoolean2;
var resultIsNumber1 = condString ? exprNumber1 : exprNumber2;
var resultIsString1 = condString ? exprString1 : exprString2;
var resultIsObject1 = condString ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean1 = condString ? exprString1 : exprBoolean1;
var resultIsAny2 = '' ? exprAny1 : exprAny2;
var resultIsBoolean2 = 'string' ? exprBoolean1 : exprBoolean2;
var resultIsNumber2 = 'c' ? exprNumber1 : exprNumber2;
var resultIsString2 = 'string' ? exprString1 : exprString2;
var resultIsObject2 = '  ' ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean2 = 'hello' ? exprString1 : exprBoolean1;
var resultIsAny3 = typeof condString ? exprAny1 : exprAny2;
var resultIsBoolean3 = condString.toUpperCase ? exprBoolean1 : exprBoolean2;
var resultIsNumber3 = condString + 'string' ? exprNumber1 : exprNumber2;
var resultIsString3 = foo() ? exprString1 : exprString2;
var resultIsObject3 = array[1] ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean3 = typeof condString ? exprString1 : exprBoolean1;
var resultIsStringOrBoolean4 = condString.toUpperCase ? exprString1 : exprBoolean1;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,11 @@
-var condString;
+var condString, exprAny1, exprBoolean1, exprNumber1, exprString1, exprIsObject1, exprAny2, exprBoolean2, exprNumber2, exprString2, exprIsObject2;
 function foo() {
 	return 'string';
 }
-condString.toUpperCase, foo(), foo(), condString.toUpperCase, foo(), condString.toUpperCase;
+var array = [
+	'1',
+	'2',
+	'3'
+];
+condString.toUpperCase, condString + '', foo(), array[1], foo();
+var resultIsAny1 = condString ? exprAny1 : exprAny2, resultIsBoolean1 = condString ? exprBoolean1 : exprBoolean2, resultIsNumber1 = condString ? exprNumber1 : exprNumber2, resultIsString1 = condString ? exprString1 : exprString2, resultIsObject1 = condString ? exprIsObject1 : exprIsObject2, resultIsStringOrBoolean1 = condString ? exprString1 : exprBoolean1, resultIsAny2 = exprAny2, resultIsBoolean2 = exprBoolean1, resultIsNumber2 = exprNumber1, resultIsString2 = exprString1, resultIsObject2 = exprIsObject1, resultIsStringOrBoolean2 = exprString1, resultIsAny3 = typeof condString ? exprAny1 : exprAny2, resultIsBoolean3 = condString.toUpperCase ? exprBoolean1 : exprBoolean2, resultIsNumber3 = condString + 'string' ? exprNumber1 : exprNumber2, resultIsString3 = foo() ? exprString1 : exprString2, resultIsObject3 = array[1] ? exprIsObject1 : exprIsObject2, resultIsStringOrBoolean3 = typeof condString ? exprString1 : exprBoolean1, resultIsStringOrBoolean4 = condString.toUpperCase ? exprString1 : exprBoolean1;

```

