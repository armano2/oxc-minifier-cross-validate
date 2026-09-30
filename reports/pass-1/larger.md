# pass-1 / larger — Output longer than expected (possible missing optimization)

Fixtures: 9

[← pass-1](README.md) · [← all families](../README.md)

## `pass-1/issues/6407/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 342 vs reference 336 (+6 bytes)

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

## `pass-1/3`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 50 vs reference 43 (+7 bytes)

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

## `pass-1/joda/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 382 vs reference 364 (+18 bytes)

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
- size: oxc 123 vs reference 98 (+25 bytes)

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

## `pass-1/joda/2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 320 vs reference 263 (+57 bytes)

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
- size: oxc 101 vs reference 35 (+66 bytes)

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
- size: oxc 178 vs reference 51 (+127 bytes)

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
- size: oxc 189 vs reference 33 (+156 bytes)

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
- size: oxc 202 vs reference 35 (+167 bytes)

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

