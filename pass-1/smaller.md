# pass-1 / smaller — Output shorter than expected (possible over-optimization / bug)

Fixtures: 11

[← pass-1](README.md) · [← all families](../README.md)

## `pass-1/4`

- size: oxc 398 vs reference 399 (-1 bytes)

```js
export function Nj(a) {
	a: for (;;) {
		for (; null === a.sibling;) {
			if (null === a.return || Mj(a.return)) return null;
			a = a.return;
		}
		for (a.sibling.return = a.return, a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
			if (2 & a.flags) continue a;
			if (null === a.child || 4 === a.tag) continue a;
			a.child.return = a, a = a.child;
		}
		if (!(2 & a.flags)) return a.stateNode;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
-export function Nj(a) {
+export function e(e) {
 	a: for (;;) {
-		for (; null === a.sibling;) {
-			if (null === a.return || Mj(a.return)) return null;
-			a = a.return;
+		for (; e.sibling === null;) {
+			if (e.return === null || Mj(e.return)) return null;
+			e = e.return;
 		}
-		for (a.sibling.return = a.return, a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
-			if (2 & a.flags || null === a.child || 4 === a.tag) continue a;
-			a.child.return = a, a = a.child;
+		for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
+			if (2 & e.flags || e.child === null || e.tag === 4) continue a;
+			e.child.return = e, e = e.child;
 		}
-		if (!(2 & a.flags)) return a.stateNode;
+		if (!(2 & e.flags)) return e.stateNode;
 	}
 }

```

## `pass-1/5`

- size: oxc 398 vs reference 399 (-1 bytes)

```js
export function Nj(a) {
	a: for (;;) {
		for (; null === a.sibling;) {
			if (null === a.return || Mj(a.return)) return null;
			a = a.return;
		}
		for (a.sibling.return = a.return, a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
			if (2 & a.flags || null === a.child || 4 === a.tag) continue a;
			a.child.return = a, a = a.child;
		}
		if (!(2 & a.flags)) return a.stateNode;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
-export function Nj(a) {
+export function e(e) {
 	a: for (;;) {
-		for (; null === a.sibling;) {
-			if (null === a.return || Mj(a.return)) return null;
-			a = a.return;
+		for (; e.sibling === null;) {
+			if (e.return === null || Mj(e.return)) return null;
+			e = e.return;
 		}
-		for (a.sibling.return = a.return, a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
-			if (2 & a.flags || null === a.child || 4 === a.tag) continue a;
-			a.child.return = a, a = a.child;
+		for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
+			if (2 & e.flags || e.child === null || e.tag === 4) continue a;
+			e.child.return = e, e = e.child;
 		}
-		if (!(2 & a.flags)) return a.stateNode;
+		if (!(2 & e.flags)) return e.stateNode;
 	}
 }

```

## `pass-1/6`

- size: oxc 449 vs reference 601 (-152 bytes)

```js
export const loadScript = (options) => {
	const { id, onLoad = () => null, ...rest } = options;
	return new Promise((resolve) => {
		let scriptEl = document.getElementById(id);
		const isMounted = !!scriptEl;
		if (!scriptEl) {
			scriptEl = document.createElement('script');
			Object.keys(rest).forEach((key) => scriptEl[key] = rest[key]);
			scriptEl.id = id;
			scriptEl.async = true;
			scriptEl.type = 'text/javascript';
		}
		if (rest.src) {
			scriptEl.addEventListener('load', () => {
				onLoad();
				return resolve();
			});
		}
		if (!isMounted) {
			// when enabling swcMinify, this section won't be executed
			document.getElementsByTagName('head')[0].appendChild(scriptEl);
		}
		if (!rest.src) {
			onLoad();
			return resolve();
		}
	});
};

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-export const loadScript = (options) => {
-	let { id, onLoad = () => null, ...rest } = options;
-	return new Promise((resolve) => {
-		let scriptEl = document.getElementById(id), isMounted = !!scriptEl;
-		if (scriptEl || (scriptEl = document.createElement('script'), Object.keys(rest).forEach((key) => scriptEl[key] = rest[key]), scriptEl.id = id, scriptEl.async = !0, scriptEl.type = 'text/javascript'), rest.src && scriptEl.addEventListener('load', () => (onLoad(), resolve())), isMounted || document.getElementsByTagName('head')[0].appendChild(scriptEl), !rest.src) return onLoad(), resolve();
+export const e = (e) => {
+	let { id: t, onLoad: n = () => null, ...r } = e;
+	return new Promise((e) => {
+		let i = document.getElementById(t), a = !!i;
+		if (i || (i = document.createElement('script'), Object.keys(r).forEach((e) => i[e] = r[e]), i.id = t, i.async = !0, i.type = 'text/javascript'), r.src && i.addEventListener('load', () => (n(), e())), a || document.getElementsByTagName('head')[0].appendChild(i), !r.src) return n(), e();
 	});
 };

```

## `pass-1/7`

- size: oxc 62 vs reference 66 (-4 bytes)

```js
export function foo(i) {
	var a, b;
	return a = i(), b = a, b.x() + b.y();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-export function foo(i) {
-	var a;
-	return (a = i()).x() + a.y();
+export function e(e) {
+	var t = e();
+	return t.x() + t.y();
 }

```

## `pass-1/8`

- size: oxc 91 vs reference 98 (-7 bytes)

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
-export function MultiPoint(point) {
-	for (var i = 0; i < 10; i++) return 0 === distance(point);
+export function e(e) {
+	for (var t, n = 0; n < 10; n++) return t = e, distance(t) === 0;
 }

```

## `pass-1/issue-6123/1`

- size: oxc 108 vs reference 122 (-14 bytes)

```js
const arrow = (param) => {
	return Boolean(param);
};
const obj = {
	method1() {
		return 'hello';
	},
	method2() {
		return 'goodbye';
	}
};

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-const arrow = (param) => !!param;
-const obj = {
+const e = (e) => !!e;
+const t = {
 	method1() {
 		return 'hello';
 	},

```

## `pass-1/issue-6405/1`

- size: oxc 27 vs reference 114 (-87 bytes)

```js
export const fn = () => {
	let val;
	if (!val) {
		return undefined;
		// works as expected if comment out below line
		throw new Error('first');
	}
	if (val.a?.b !== true) {
		throw new Error('second');
	}
	return val;
};

```

```diff
--- reference
+++ oxc
@@ -1,7 +1 @@
-export const fn = () => {
-	let val;
-	if (val) {
-		if (val.a?.b !== !0) throw Error('second');
-		return val;
-	}
-};
+export const e = () => {};

```

## `pass-1/issues/6407/1`

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

## `pass-1/joda/1`

- size: oxc 272 vs reference 364 (-92 bytes)

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
-	/* harmony export */ __webpack_require__.d(__webpack_exports__, { 
+/***/ 3266: (function(e, t, n) {
+	/* harmony export */ n.d(t, { 
 	/* harmony export */ h: function() {
 		return LocalDate;
 	} });
-	var isInit = !1;
-	isInit || (isInit = !0);
-} }]);
+	var r = !1;
+	function i() {
+		r ||= !0;
+	}
+	i();
+}) }]);

```

## `pass-1/joda/2`

- size: oxc 216 vs reference 263 (-47 bytes)

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
@@ -1,6 +1,10 @@
 'use strict';
-(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[715], { 3266: function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
-	__webpack_require__.d(__webpack_exports__, { h: function() {
+(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[715], { 3266: function(e, t, n) {
+	n.d(t, { h: function() {
 		return LocalDate;
 	} });
+	var r = !1;
+	(function() {
+		r ||= !0;
+	})();
 } }]);

```

## `pass-1/regexp/1`

- size: oxc 29 vs reference 31 (-2 bytes)

```js
export const foo = new RegExp('');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export const foo = RegExp('');
+export const e = RegExp('');

```

