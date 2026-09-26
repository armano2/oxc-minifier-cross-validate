# swc / larger — Output longer than expected (possible missing optimization)

Fixtures: 185

[← swc](README.md) · [← all families](../README.md)

## `swc/issues/10041`

- size: oxc 237 vs reference 192 (+45 bytes)

```js
(function() {
	function entry() {
		var struct = {
			a: [],
			b: 0
		};
		setName(struct, 'Alice');
	}
	function setName(struct, str) {
		writeString(struct.a, struct.b, str);
	}
	function writeString(buffer, offset, c) {
		for (var i = 0, v = c.length; i < v; i = i + 1 | 0) {
			buffer[offset + i | 0] = c.charCodeAt(i);
		}
	}
	entry();
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,15 @@
-var struct;
-!function(buffer, offset, c) {
-	for (var i = 0, v = c.length; i < v; i = i + 1 | 0) buffer[offset + i | 0] = c.charCodeAt(i);
-}((struct = {
-	a: [],
-	b: 0
-}).a, struct.b, 'Alice');
+(function() {
+	function e() {
+		t({
+			a: [],
+			b: 0
+		}, 'Alice');
+	}
+	function t(e, t) {
+		n(e.a, e.b, t);
+	}
+	function n(e, t, n) {
+		for (var r = 0, i = n.length; r < i; r = r + 1 | 0) e[t + r | 0] = n.charCodeAt(r);
+	}
+	e();
+})();

```

## `swc/issues/10054/for`

- size: oxc 122 vs reference 92 (+30 bytes)

```js
// Input:
function test() {
	for (var l = 0; i < 10; l++) {}
	console.log('test');
}
window.a = [function() {
	return test();
}];

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
 // Input:
-window.a = [function() {
-	for (var l = 0; i < 10; l++);
+function e() {
+	for (var e = 0; i < 10; e++);
 	console.log('test');
+}
+window.a = [function() {
+	return e();
 }];

```

## `swc/issues/10054/if`

- size: oxc 125 vs reference 95 (+30 bytes)

```js
// Input:
function test() {
	if (navigator.userAgentData !== undefined) {
		throw new Error();
	}
}
window.a = [function() {
	return test();
}];

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 // Input:
+function e() {
+	if (navigator.userAgentData !== void 0) throw Error();
+}
 window.a = [function() {
-	if (void 0 !== navigator.userAgentData) throw Error();
+	return e();
 }];

```

## `swc/issues/10178`

- size: oxc 60 vs reference 27 (+33 bytes)

```js
//// [indexerWithTuple.ts]
var strNumTuple = ['foo', 10], numTupleTuple = [10, ['bar', 20]], unionTuple1 = [10, 'foo'], unionTuple2 = [!0, 'foo'];
strNumTuple[0], strNumTuple['0'];

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
 //// [indexerWithTuple.ts]
+var e = ['foo', 10];
+e[0], e[0];

```

## `swc/issues/10328`

- size: oxc 158 vs reference 145 (+13 bytes)

```js
function f() {
	const h = i({ onCancel: () => h() });
}
function g(x, v) {
	if (x === 'a') {
		f(v);
	} else {
		class A {}
		console.log(A, A);
	}
}
g('a');
g('b');

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
-function g(x, v) {
-	if ('a' === x) {
-		let h;
-		h = i({ onCancel: () => h() });
-	} else {
-		class A {}
-		console.log(A, A);
+function e() {
+	let e = i({ onCancel: () => e() });
+}
+function t(t, n) {
+	if (t === 'a') e(n);
+	else {
+		class e {}
+		console.log(e, e);
 	}
 }
-g('a'), g('b');
+t('a'), t('b');

```

## `swc/issues/10412`

- size: oxc 222 vs reference 221 (+1 bytes)

```js
(function(e, i) {
	// "_" rename to another name also reproduce
	var _ = ((i = {})[n.NONE] = { platform: a.NONE }, i);
	e.getPlatform = function() {
		// "_" should not be removed
		console.log(_[t.toString()]);
	};
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-!function(e, i) {
+(function(e, r) {
 	// "_" rename to another name also reproduce
-	var _ = ((i = {})[n.NONE] = { platform: a.NONE }, i);
+	var i = ((r = {})[n.NONE] = { platform: a.NONE }, r);
 	e.getPlatform = function() {
 		// "_" should not be removed
-		console.log(_[t.toString()]);
+		console.log(i[t.toString()]);
 	};
-}();
+})();

```

## `swc/issues/10425`

- size: oxc 77 vs reference 22 (+55 bytes)

```js
export const foo = 6;
function baz() {
	return 5;
}
class Bar {
	static x = baz();
}
class Ban {
	static x = 5;
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-export const foo = 6;
+export const e = 6;
+function t() {
+	return 5;
+}
+class n {
+	static x = t();
+}

```

## `swc/issues/10532`

- size: oxc 210 vs reference 162 (+48 bytes)

```js
(function() {
	function WL(t) {
		var n = (console.log(), t);
		Object.keys(n).forEach(function(t) {
			console.log(n);
			console.log(t);
			console.log(n[t]);
		});
	}
	try {
		t = { a: 1 };
		WL(t);
	} catch {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,11 @@
-try {
-	var t1;
-	t1 = t = { a: 1 }, console.log(), Object.keys(t1).forEach(function(t2) {
-		console.log(t1), console.log(t2), console.log(t1[t2]);
-	});
-} catch {}
+(function() {
+	function e(e) {
+		var n = (console.log(), e);
+		Object.keys(n).forEach(function(e) {
+			console.log(n), console.log(e), console.log(n[e]);
+		});
+	}
+	try {
+		t = { a: 1 }, e(t);
+	} catch {}
+})();

```

## `swc/issues/10630`

- size: oxc 111 vs reference 62 (+49 bytes)

```js
var constants = {
	first: 1,
	second: 2
};
export function isConstant(x) {
	return x === constants.first || x === constants.second;
}
var y = constants.second;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,8 @@
-export function isConstant(x) {
-	return 1 === x || 2 === x;
+var e = {
+	first: 1,
+	second: 2
+};
+export function t(t) {
+	return t === e.first || t === e.second;
 }
+e.second;

```

## `swc/issues/10721`

- size: oxc 106 vs reference 98 (+8 bytes)

```js
var _ref1 = { b1: { b11: 'world' } }, tmp = _ref1.b1, b11 = (tmp === void 0 ? { b11: 'string' } : tmp).b11;
var temp = {
	t1: true,
	t2: 'false'
};
export { b11 };

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var tmp = { b11: 'world' }, b11 = (void 0 === tmp ? { b11: 'string' } : tmp).b11;
-export { b11 };
+var e = { b1: { b11: 'world' } }.b1, t = (e === void 0 ? { b11: 'string' } : e).b11;
+export { t as b11 };

```

## `swc/issues/10746`

- size: oxc 109 vs reference 91 (+18 bytes)

```js
const ErrorResponse = (statusCode, message) => {
	return Response.json({ message }, { status: statusCode });
};
export const unknownError = ErrorResponse(520, 'Unknown error.');

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-export const unknownError = Response.json({ message: 'Unknown error.' }, { status: 520 });
+const e = (e, t) => Response.json({ message: t }, { status: e });
+export const t = e(520, 'Unknown error.');

```

## `swc/issues/10849`

- size: oxc 55 vs reference 17 (+38 bytes)

```js
(function() {
	const obj = { value: 42 };
	console.log(obj === null || obj === void 0 ? void 0 : obj.value);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(42);
+(function() {
+	console.log({ value: 42 }.value);
+})();

```

## `swc/issues/10876/2`

- size: oxc 135 vs reference 130 (+5 bytes)

```js
const createCounter1 = () => {
	let count = 0;
	return (numToAdd) => {
		count += numToAdd;
		return count;
	};
};
new class Foo {
	[createCounter1()]() {
		console.log('Hello, world!');
	}
}();
export {};

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,9 @@
-let count;
-new class Foo {
-	[(count = 0, (numToAdd) => count += numToAdd)]() {
+const e = () => {
+	let e = 0;
+	return (t) => (e += t, e);
+};
+new class {
+	[e()]() {
 		console.log('Hello, world!');
 	}
 }();

```

## `swc/issues/10885`

- size: oxc 360 vs reference 354 (+6 bytes)

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
@@ -1,13 +1,17 @@
-import { useState } from 'react';
-import { getCondition, doSomething } from './utils';
-export default function useMeow() {
-	let [state, setState] = useState('init');
+import { useState as e } from 'react';
+import { getCondition as t, doSomething as n } from './utils';
+export default function r() {
+	let [r, i] = e('init');
 	return { onMeow: async () => {
-		if ('init' === state) switch (getCondition()) {
-			case 'a':
-			case 'b': break;
-			default: await doSomething();
+		switch (r) {
+			case 'init':
+				switch (t()) {
+					case 'a': break;
+					case 'b': break;
+					default: await n();
+				}
+				break;
+			default: await n();
 		}
-		else await doSomething();
 	} };
 }

```

## `swc/issues/10936`

- size: oxc 986 vs reference 963 (+23 bytes)

```js
const variable = {};
const params = [
	'OrderNumber=',
	variable.data?.orderNumber,
	'|AuditNo=',
	variable.data?.auditNo,
	'|JournalType=',
	transactionTypeCode[variable.data.transactionType],
	'|IsPreview=0'
].join('');
console.log(params);
// Additional test cases
export const test1 = [
	1,
	null,
	2
].join('');
export const test2 = [
	1,
	undefined,
	2
].join('');
export const test3 = [
	1,
	variable?.notExist,
	2
].join('');
export const test4 = [
	1,
	variable.data?.value,
	2
].join('');
export const test5 = [
	1,
	obj?.a?.b?.c,
	2
].join('');
// Function calls can return null/undefined
export const test6 = [
	1,
	someFunction(),
	2
].join('');
export const test7 = [
	1,
	obj.method(),
	2
].join('');
// Identifiers can be null/undefined  
export const test8 = [
	1,
	unknownVar,
	2
].join('');
// Other expressions that can be null/undefined
export const test9 = [
	1,
	condition ? null : 'x',
	2
].join('');
export const test10 = [
	1,
	await promise,
	2
].join('');
export const test11 = [
	1,
	new Constructor(),
	2
].join('');

```

```diff
--- reference
+++ oxc
@@ -1,24 +1,32 @@
-let variable = {};
-console.log([
+const e = {}, t = [
 	'OrderNumber=',
-	variable.data?.orderNumber,
+	e.data?.orderNumber,
 	'|AuditNo=',
-	variable.data?.auditNo,
+	e.data?.auditNo,
 	'|JournalType=',
-	transactionTypeCode[variable.data.transactionType],
+	transactionTypeCode[e.data.transactionType],
 	'|IsPreview=0'
-].join(''));
+].join('');
+console.log(t);
 // Additional test cases
-export const test1 = '12';
-export const test2 = '12';
+export const test1 = [
+	1,
+	null,
+	2
+].join('');
+export const test2 = [
+	1,
+	void 0,
+	2
+].join('');
 export const test3 = [
 	1,
-	variable?.notExist,
+	e?.notExist,
 	2
 ].join('');
 export const test4 = [
 	1,
-	variable.data?.value,
+	e.data?.value,
 	2
 ].join('');
 export const test5 = [
@@ -54,4 +62,8 @@
 	await promise,
 	2
 ].join('');
-export const test11 = '1' + new Constructor() + '2';
+export const test11 = [
+	1,
+	new Constructor(),
+	2
+].join('');

```

## `swc/issues/10981`

- size: oxc 144 vs reference 91 (+53 bytes)

```js
class C {
	static foo = bar;
}
(class C {
	static foo = bar;
});
class D {
	static #_ = this.FOO = {};
}
(class D {
	static #_ = this.FOO = {};
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,12 @@
-bar, bar;
-class D {
-	static #_ = this.FOO = {};
+class e {
+	static foo = bar;
 }
 (class {
-	static #_ = this.FOO = {};
+	static foo = bar;
+});
+class t {
+	static #e = this.FOO = {};
+}
+(class {
+	static #e = this.FOO = {};
 });

```

## `swc/issues/10986`

- size: oxc 88 vs reference 68 (+20 bytes)

```js
test = function test() {
	if (cond) {
		console.log('a');
		return;
	}
	console.log('b');
};

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 test = function() {
-	cond ? console.log('a') : console.log('b');
+	if (cond) {
+		console.log('a');
+		return;
+	}
+	console.log('b');
 };

```

## `swc/issues/11007`

- size: oxc 156 vs reference 84 (+72 bytes)

```js
const profile = (_s, fn) => {
	return fn();
};
profile('trace1', () => {
	someFunction({
		args1: profile('trace2', () => JSON.stringify(someObj)),
		args2: JSON.stringify(someObj)
	});
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-someFunction({
-	args1: JSON.stringify(someObj),
-	args2: JSON.stringify(someObj)
+const e = (e, t) => t();
+e('trace1', () => {
+	someFunction({
+		args1: e('trace2', () => JSON.stringify(someObj)),
+		args2: JSON.stringify(someObj)
+	});
 });

```

## `swc/issues/11079`

- size: oxc 23 vs reference 20 (+3 bytes)

```js
let { a } = undefined;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-let { a } = void 0;
+let { a: e } = void 0;

```

## `swc/issues/11083`

- size: oxc 240 vs reference 202 (+38 bytes)

```js
(function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
	let _liteContractCode = null;
	async function showPopup({ mallId }) {
		try {
			console.log({ mallId });
		} catch (e) {
			console.log(e);
		}
	}
	const liteContractHelper = {
		showPopup,
		get liteContractCode() {
			return _liteContractCode;
		}
	};
	liteContractHelper.showPopup({ mallId: 1 });
})();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,15 @@
-({
-	showPopup: async function({ mallId: o }) {
+(function(e, t, n) {
+	async function r({ mallId: e }) {
 		try {
-			console.log({ mallId: o });
-		} catch (o) {
-			console.log(o);
+			console.log({ mallId: e });
+		} catch (e) {
+			console.log(e);
 		}
-	},
-	get liteContractCode() {
-		return null;
 	}
-}).showPopup({ mallId: 1 });
+	({
+		showPopup: r,
+		get liteContractCode() {
+			return null;
+		}
+	}).showPopup({ mallId: 1 });
+})();

```

## `swc/issues/11089`

- size: oxc 63 vs reference 58 (+5 bytes)

```js
let k = 0;
const fn = () => console.log(k++);
fn('Hi');
fn('Hi');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-let k = 0;
-const fn = () => console.log(k++);
-fn(), fn();
+let e = 0;
+const t = () => console.log(e++);
+t('Hi'), t('Hi');

```

## `swc/issues/11102`

- size: oxc 113 vs reference 24 (+89 bytes)

```js
const decideZoomByAccuracy = (range) => {
	const isUnder = (accuracy) => {
		return range <= accuracy;
	};
	if (isUnder(0)) {
		return 15;
	}
	if (isUnder(50)) {
		return 15;
	}
	if (isUnder(100)) {
		return 15;
	}
	return 11;
};
export const zoom = decideZoomByAccuracy(75);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-export const zoom = 15;
+const e = (e) => {
+	let t = (t) => e <= t;
+	return t(0) || t(50) || t(100) ? 15 : 11;
+};
+export const t = e(75);

```

## `swc/issues/11103`

- size: oxc 252 vs reference 219 (+33 bytes)

```js
import assert from 'node:assert';
const miniDynamics = () => {
	if (true) {
		let url = 'api';
		url += '/';
		return new URL(url, 'https://example.com').toString();
	}
};
let url = miniDynamics();
assert(url === 'https://example.com/api/');
export default function Home() {
	return React.createElement('p', null, url);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,11 @@
-import assert from 'node:assert';
-let url = new URL('api/', 'https://example.com').toString();
-assert('https://example.com/api/' === url);
-export default function Home() {
-	return React.createElement('p', null, url);
+import e from 'node:assert';
+let t = (() => {
+	{
+		let e = 'api';
+		return e += '/', new URL(e, 'https://example.com').toString();
+	}
+})();
+e(t === 'https://example.com/api/');
+export default function n() {
+	return React.createElement('p', null, t);
 }

```

## `swc/issues/11108`

- size: oxc 68 vs reference 62 (+6 bytes)

```js
this.test = function(a) {
	return (0 | !(a < 0)) ^ (a < 0) << 8;
};

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-this.test = function(a) {
-	return !(a < 0) ^ (a < 0) << 8;
+this.test = function(e) {
+	return (0 | !(e < 0)) ^ (e < 0) << 8;
 };

```

## `swc/issues/11133`

- size: oxc 1427 vs reference 1316 (+111 bytes)

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
@@ -1,22 +1,31 @@
 // Test case 1: Basic duplicate named imports
-import { add, subtract, multiply } from 'math';
+import { add as e } from 'math';
+import { subtract as t } from 'math';
+import { multiply as n } from 'math';
 // Test case 2: Same export imported with different local names (should preserve both)
-import { add as a, add as b } from 'calculator';
+import { add as r } from 'calculator';
+import { add as i } from 'calculator';
 // Test case 3: Mix of default and named imports
-import defaultExport, { namedExport } from 'module1';
+import a from 'module1';
+import { namedExport as o } from 'module1';
 // Test case 4: Namespace import with named imports (CANNOT be merged - incompatible)
-import * as utils from 'utils';
-import { helper } from 'utils';
+import * as s from 'utils';
+import { helper as c } from 'utils';
 // Test case 4b: Default with namespace (CAN be merged)
-import defUtils, * as utils2 from 'utils2';
+import l from 'utils2';
+import * as u from 'utils2';
 // Test case 5: Side-effect import (should not be merged)
 import 'polyfill';
+import 'polyfill';
 // Test case 6: Different sources (should not be merged)
-import { foo } from 'lib1';
-import { foo } from 'lib2';
+import { foo as d } from 'lib1';
+import { foo as d } from 'lib2';
 // Test case 7: Duplicate named imports (exact same specifier)
-import { duplicate, duplicate, duplicate } from 'dups';
+import { duplicate as f } from 'dups';
+import { duplicate as f } from 'dups';
+import { duplicate as f } from 'dups';
 // Test case 8: Mix of named imports with and without al
... [truncated]
```

## `swc/issues/11158`

- size: oxc 271 vs reference 86 (+185 bytes)

```js
(() => {
	const gen = () => foo(12);
	function foo(length) {
		return length;
	}
	const a = `tmp-${gen()}-a`, b = `tmp-${gen()}-b`;
	console.log(a, b);
})();
(() => {
	const gen = () => g(foo(12));
	function foo(length) {
		return length;
	}
	const a = `tmp-${gen()}-a`, b = `tmp-${gen()}-b`;
	console.log(a, b);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,15 @@
-console.log('tmp-12-a', 'tmp-12-b'), console.log(`tmp-${g(12)}-a`, `tmp-${g(12)}-b`);
+(() => {
+	let e = () => t(12);
+	function t(e) {
+		return e;
+	}
+	let n = `tmp-${e()}-a`, r = `tmp-${e()}-b`;
+	console.log(n, r);
+})(), (() => {
+	let e = () => g(t(12));
+	function t(e) {
+		return e;
+	}
+	let n = `tmp-${e()}-a`, r = `tmp-${e()}-b`;
+	console.log(n, r);
+})();

```

## `swc/issues/11257`

- size: oxc 141 vs reference 105 (+36 bytes)

```js
import { v1 } from 'a';
import { v2 } from 'b';
import { v3 } from 'b';
import { v4 } from 'c';
console.log(v1, v2, v3, v4);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-import { v1 } from 'a';
-import { v2, v3 } from 'b';
-import { v4 } from 'c';
-console.log(v1, v2, v3, v4);
+import { v1 as e } from 'a';
+import { v2 as t } from 'b';
+import { v3 as n } from 'b';
+import { v4 as r } from 'c';
+console.log(e, t, n, r);

```

## `swc/issues/11303`

- size: oxc 123 vs reference 37 (+86 bytes)

```js
class X {
	constructor() {}
}
class Y extends X {}
const t = (a) => ((b) => {
	if (a.foo()) throw Error();
	return a;
}), y = t(new Y());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,8 @@
-class X {}
-new class extends X {}();
+class e {
+	constructor() {}
+}
+class t extends e {}
+((e) => ((t) => {
+	if (e.foo()) throw Error();
+	return e;
+}))(new t());

```

## `swc/issues/11320`

- size: oxc 306 vs reference 274 (+32 bytes)

```js
// Empty class expression should be removed
new class {}();
// Class with only a method should also be removed (no side effects)
new class {
	foo() {}
}();
// Stored result should be removed if unused
let x = new class {}();
// Class with side effects in computed key should NOT be removed
new class {
	[console.log('side effect')]() {}
}();
// Class with property initializer with side effects should NOT be removed
new class {
	prop = console.log('side effect');
}();
// Class with static block should NOT be removed if static block has side effects
new class {
	static {
		console.log('side effect');
	}
}();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-// Empty class expression should be removed
-// Class with side effects in computed key should NOT be removed
-new class {
+// Class with static block should NOT be removed if static block has side effects
+new class {}(), new class {
+	foo() {}
+}(), new class {}(), new class {
 	[console.log('side effect')]() {}
 }(), new class {
 	prop = console.log('side effect');

```

## `swc/issues/11321`

- size: oxc 782 vs reference 693 (+89 bytes)

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
@@ -1,13 +1,19 @@
 // Test case 1: Multiple default imports with different local names (the reported bug)
-import A, { default as B } from 'm.js';
+import e from 'm.js';
+import t from 'm.js';
 // Test case 2: Multiple namespace imports with different local names
-import * as X from 'p.js';
-import * as Y from 'p.js';
+import * as n from 'p.js';
+import * as r from 'p.js';
 // Test case 3: Mix of multiple defaults and named imports
-import C, { default as D, foo, bar } from 'r.js';
+import i from 'r.js';
+import a from 'r.js';
+import { foo as o } from 'r.js';
+import { bar as s } from 'r.js';
 // Test case 4: Mix of all kinds of imports
-import E, * as ns1 from 'q.js';
-import F, { default as G, a, b, c } from 'q.js';
-import H, * as ns2 from 'q.js';
-// Use all imports to prevent dead code elimination
-console.log(A, B, C, D, E, F, G, H), console.log(X, Y), console.log(foo, bar), console.log(ns1, ns2), console.log(a, b, c);
+import * as c from 'q.js';
+import { default as l, 'default' as u } from 'q.js';
+import d from 'q.js';
+import { a as f, b as p, c as m } from 'q.js';
+import * as h from 'q.js';
+import g from 'q.js';
+console.log(e, t, i, a, l, u, d, g), console.log(n, r), console.log(o, s), console.log(c, h), console.log(f, p, m);

```

## `swc/issues/11512`

- size: oxc 258 vs reference 92 (+166 bytes)

```js
const defaultMessage = 'hello';
function x(x) {
	return x;
}
function y(x, y, z) {
	return x;
}
function abc(a) {
	return x(a);
}
function abc2(a, x, z = defaultMessage) {
	return y(a);
}
export function example() {
	// output should be
	// return `2 2 3 3`;
	return `${x(2)} ${y('2')} ${abc(3)} ${abc2('3')}`;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,17 @@
-export function example() {
+function e(e) {
+	return e;
+}
+function t(e, t, n) {
+	return e;
+}
+function n(t) {
+	return e(t);
+}
+function r(e, n, r = 'hello') {
+	return t(e);
+}
+export function i() {
 	// output should be
 	// return `2 2 3 3`;
-	return '2 2 3 3';
+	return `${e(2)} ${t('2')} ${n(3)} ${r('3')}`;
 }

```

## `swc/issues/11512-exhaustive/iife-anon-arg-unused`

- size: oxc 78 vs reference 60 (+18 bytes)

```js
export function iifeAnonArgUnused(value) {
	return (function(a, b = 1) {
		return a;
	})(value, 7);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-export function iifeAnonArgUnused(value) {
-	return value;
+export function e(e) {
+	return (function(e, t = 1) {
+		return e;
+	})(e, 7);
 }

```

## `swc/issues/11512-exhaustive/iife-anon-default-unused`

- size: oxc 75 vs reference 64 (+11 bytes)

```js
export function iifeAnonDefaultUnused(value) {
	return (function(a, b = 1) {
		return a;
	})(value);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-export function iifeAnonDefaultUnused(value) {
-	return value;
+export function e(e) {
+	return (function(e, t = 1) {
+		return e;
+	})(e);
 }

```

## `swc/issues/11512-simple`

- size: oxc 246 vs reference 195 (+51 bytes)

```js
// Test that functions with side-effect-free default parameters can be inlined.
function identity(x, y = 42) {
	return x;
}
// Use the function multiple times so it goes through simple_functions path.
export function test() {
	return identity(1) + identity(2) + identity(3);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
 // Test that functions with side-effect-free default parameters can be inlined.
+function e(e, t = 42) {
+	return e;
+}
 // Use the function multiple times so it goes through simple_functions path.
-export function test() {
-	return 6;
+export function t() {
+	return e(1) + e(2) + e(3);
 }

```

## `swc/issues/11645/control-known-arity-drop`

- size: oxc 51 vs reference 48 (+3 bytes)

```js
function f(a) {
	return a;
}
console.log(f(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function f(a) {
-	return a;
+function f(e) {
+	return e;
 }
-console.log(f(1));
+console.log(f(1, 2));

```

## `swc/issues/11645/logical-and-assign-stale-arity`

- size: oxc 61 vs reference 59 (+2 bytes)

```js
let f = (a) => a;
f &&= ((a, b) => b);
console.log(f(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-let f = (a) => a;
-f &&= (a, b) => b;
-console.log(f(1, 2));
+let f = (e) => e;
+f &&= ((e, t) => t), console.log(f(1, 2));

```

## `swc/issues/11684`

- size: oxc 86 vs reference 71 (+15 bytes)

```js
n = new (function() {
	throw 1;
})('test');
class A {}
g.foo = A;
n = new A(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-n = new function() {
+n = new (function() {
 	throw 1;
-}();
-class A {}
-g.foo = A, n = new A();
+})('test');
+class e {}
+g.foo = e, n = new e(1, 2, 3);

```

## `swc/issues/11684/class-decl`

- size: oxc 197 vs reference 150 (+47 bytes)

```js
class A {
	constructor() {}
}
console.log(new A(1, 2, 3), new A(4, 5, 6));
class B {}
console.log(new B(1, 2, 3), new B(4, 5, 6));
class C extends G {}
console.log(new C(1, 2, 3), new C(4, 5, 6));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
-class A {}
-console.log(new A(), new A());
-class B {}
-console.log(new B(), new B());
-class C extends G {}
-console.log(new C(1, 2, 3), new C(4, 5, 6));
+class e {
+	constructor() {}
+}
+console.log(new e(1, 2, 3), new e(4, 5, 6));
+class t {}
+console.log(new t(1, 2, 3), new t(4, 5, 6));
+class n extends G {}
+console.log(new n(1, 2, 3), new n(4, 5, 6));

```

## `swc/issues/11684/class-expression`

- size: oxc 335 vs reference 330 (+5 bytes)

```js
out.zero = new class {
	constructor() {
		this.kind = 'zero';
	}
}(1, 2);
out.one = new class {
	constructor(value) {
		this.value = value;
	}
}(1, 2, 3);
out.destructured = new class {
	constructor({ value }) {
		this.value = value;
	}
}({ value: 1 }, 2, 3);
out.derived = new class extends Base {
	constructor(value) {
		super(value);
	}
}(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -2,16 +2,16 @@
 	constructor() {
 		this.kind = 'zero';
 	}
-}(), out.one = new class {
-	constructor(value) {
-		this.value = value;
+}(1, 2), out.one = new class {
+	constructor(e) {
+		this.value = e;
 	}
-}(1), out.destructured = new class {
-	constructor({ value }) {
-		this.value = value;
+}(1, 2, 3), out.destructured = new class {
+	constructor({ value: e }) {
+		this.value = e;
 	}
-}({ value: 1 }), out.derived = new class extends Base {
-	constructor(value) {
-		super(value);
+}({ value: 1 }, 2, 3), out.derived = new class extends Base {
+	constructor(e) {
+		super(e);
 	}
-}(1);
+}(1, 2, 3);

```

## `swc/issues/11684/disabled`

- size: oxc 144 vs reference 142 (+2 bytes)

```js
out.fn = new (function() {
	this.kind = 'function';
})(1, 2, 3);
out.class = new class {
	constructor() {
		this.kind = 'class';
	}
}(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-out.fn = new function() {
+out.fn = new (function() {
 	this.kind = 'function';
-}(1, 2, 3), out.class = new class {
+})(1, 2, 3), out.class = new class {
 	constructor() {
 		this.kind = 'class';
 	}

```

## `swc/issues/11684/function-expression`

- size: oxc 209 vs reference 196 (+13 bytes)

```js
out.zero = new (function() {
	this.kind = 'zero';
})(1, 2);
out.one = new (function(value) {
	this.value = value;
})(1, 2, 3);
out.destructured = new (function({ value }) {
	this.value = value;
})({ value: 1 }, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-out.zero = new function() {
+out.zero = new (function() {
 	this.kind = 'zero';
-}(), out.one = new function(value) {
-	this.value = value;
-}(1), out.destructured = new function({ value }) {
-	this.value = value;
-}({ value: 1 });
+})(1, 2), out.one = new (function(e) {
+	this.value = e;
+})(1, 2, 3), out.destructured = new (function({ value: e }) {
+	this.value = e;
+})({ value: 1 }, 2, 3);

```

## `swc/issues/11684/reduce-vars-only`

- size: oxc 144 vs reference 128 (+16 bytes)

```js
out.fn = new (function() {
	this.kind = 'function';
})(1, 2, 3);
out.class = new class {
	constructor() {
		this.kind = 'class';
	}
}(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
-out.fn = new function() {
+out.fn = new (function() {
 	this.kind = 'function';
-}();
-out.class = new class {
+})(1, 2, 3), out.class = new class {
 	constructor() {
 		this.kind = 'class';
 	}
-}();
+}(1, 2, 3);

```

## `swc/issues/11684/side-effects`

- size: oxc 436 vs reference 421 (+15 bytes)

```js
out.fn = new (function(value) {
	this.value = value;
})(effect('used'), 1, effect('fn-a'), 2, effect('fn-b'));
out.class = new class {
	constructor(value) {
		this.value = value;
	}
}(effect('used'), 1, effect('class-a'), 2, effect('class-b'));
out.sequence = new (function() {
	this.kind = 'sequence';
})(1, (2, effect('sequence')), 3);
out.conditional = new class {
	constructor() {
		this.kind = 'conditional';
	}
}(1, condition ? effect('yes') : 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
-out.fn = new function(value) {
-	this.value = value;
-}(effect('used'), effect('fn-a'), effect('fn-b')), out.class = new class {
-	constructor(value) {
-		this.value = value;
+out.fn = new (function(e) {
+	this.value = e;
+})(effect('used'), 1, effect('fn-a'), 2, effect('fn-b')), out.class = new class {
+	constructor(e) {
+		this.value = e;
 	}
-}(effect('used'), effect('class-a'), effect('class-b')), out.sequence = new function() {
+}(effect('used'), 1, effect('class-a'), 2, effect('class-b')), out.sequence = new (function() {
 	this.kind = 'sequence';
-}(effect('sequence')), out.conditional = new class {
+})(1, effect('sequence'), 3), out.conditional = new class {
 	constructor() {
 		this.kind = 'conditional';
 	}
-}(condition && effect('yes'));
+}(1, condition ? effect('yes') : 2, 3);

```

## `swc/issues/11684/unused-only`

- size: oxc 144 vs reference 128 (+16 bytes)

```js
out.fn = new (function() {
	this.kind = 'function';
})(1, 2, 3);
out.class = new class {
	constructor() {
		this.kind = 'class';
	}
}(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
-out.fn = new function() {
+out.fn = new (function() {
 	this.kind = 'function';
-}();
-out.class = new class {
+})(1, 2, 3), out.class = new class {
 	constructor() {
 		this.kind = 'class';
 	}
-}();
+}(1, 2, 3);

```

## `swc/issues/11730`

- size: oxc 91 vs reference 50 (+41 bytes)

```js
someFunction(function f() {
	class Dead extends Unknown {
		m() {
			Dead.x;
		}
	}
	return 0;
});

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,8 @@
 someFunction(function() {
-	return Unknown, 0;
+	class e extends Unknown {
+		m() {
+			e.x;
+		}
+	}
+	return 0;
 });

```

## `swc/issues/11755`

- size: oxc 234 vs reference 207 (+27 bytes)

```js
function f() {
	const getConfigId = ({ id, configIndex }) => `${id}-${configIndex}`;
	const createSelector = (id, configIndex) => (data) => data[getConfigId({
		id,
		configIndex
	})];
	const selector = createSelector('item-1', 0);
	const result = selector({ 'item-1-0': 100 });
	if (result === 100) {
		console.log('Test PASSED!');
	} else {
		console.log('Test FAILED!');
	}
}
f();
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
-function f() {
-	100 === { 'item-1-0': 100 }[(({ id, configIndex }) => `${id}-${configIndex}`)({
-		id: 'item-1',
-		configIndex: 0
-	})] ? console.log('Test PASSED!') : console.log('Test FAILED!');
+function e() {
+	let e = ({ id: e, configIndex: t }) => `${e}-${t}`, t = ((t, n) => (r) => r[e({
+		id: t,
+		configIndex: n
+	})])('item-1', 0)({ 'item-1-0': 100 });
+	console.log(t === 100 ? 'Test PASSED!' : 'Test FAILED!');
 }
-f(), f();
+e(), e();

```

## `swc/issues/11970`

- size: oxc 122 vs reference 118 (+4 bytes)

```js
export async function classify(code) {
	switch (code) {
		case '66': return 1;
		case '0': break;
		default: return 1;
	}
	return 2;
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-export async function classify(code) {
-	switch (code) {
-		case '66':
+export async function e(e) {
+	switch (e) {
+		case '66': return 1;
+		case '0': break;
 		default: return 1;
-		case '0':
 	}
 	return 2;
 }

```

## `swc/issues/11977`

- size: oxc 367 vs reference 317 (+50 bytes)

```js
var Subscription = (function() {
	function Subscription1(listeners, listener) {}
	Subscription1.prototype.add = function(subscription) {
		if (this.unsubscribed) {}
	};
})();
try {
	serverOnlyRequire = eval('require');
} catch (err) {}
var __require = ((x) => ('TURBOPACK compile-time truthy', 1) ? __turbopack_context__.z : 'TURBOPACK unreachable')(function(x) {})(ErrorType || {});
var isRequestError = (error) => {
	let u = i.getKey ?? ((p, s) => `x`), f = async () => {
		try {} catch (s) {}
	};
};
var x = class extends d {};

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,12 @@
-var Subscription = void ((function(listeners, listener) {}).prototype.add = function(subscription) {
-	this.unsubscribed;
-});
+var Subscription = (function() {
+	function e(e, t) {}
+	e.prototype.add = function(e) {
+		this.unsubscribed;
+	};
+})();
 try {
 	serverOnlyRequire = eval('require');
-} catch (err) {}
-var __require = (0, __turbopack_context__.z)(ErrorType || {}), isRequestError = (error) => {
-	i.getKey;
+} catch {}
+var __require = ((e) => __turbopack_context__.z)(function(e) {})(ErrorType || {}), isRequestError = (e) => {
+	let t = i.getKey ?? ((e, t) => 'x'), n = async () => {};
 }, x = class extends d {};

```

## `swc/issues/11983`

- size: oxc 96 vs reference 67 (+29 bytes)

```js
const N = 260;
const A = 40 + N;
function f(w) {
	return A / w;
}
const S = f(621);
export function dyn(w) {
	return f(w) + S;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-let S = 300 / 621;
-export function dyn(w) {
-	return 300 / w + S;
+function e(e) {
+	return 300 / e;
+}
+const t = e(621);
+export function n(n) {
+	return e(n) + t;
 }

```

## `swc/issues/12118`

- size: oxc 42 vs reference 35 (+7 bytes)

```js
for (let a of [0]) a = 1, console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-for (let a of [0]) console.log(1);
+for (let e of [0]) e = 1, console.log(e);

```

## `swc/issues/12118/export`

- size: oxc 56 vs reference 53 (+3 bytes)

```js
export var a;
for (var a of [0]) a = 1, console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export var a;
-for (var a of [0]) console.log(a = 1);
+export var e;
+for (var e of [0]) e = 1, console.log(e);

```

## `swc/issues/12126`

- size: oxc 73 vs reference 71 (+2 bytes)

```js
console.log((function(a) {
	for (var a of [1]) break;
	return a;
})(2));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log(function(a) {
-	for (var a of [1]) break;
-	return a;
-}(2));
+console.log((function(e) {
+	for (var e of [1]) break;
+	return e;
+})(2));

```

## `swc/issues/2028`

- size: oxc 109 vs reference 86 (+23 bytes)

```js
function isSymbol(s) {
	return s != null;
}
function isKey(value, object) {
	if (value == null || isSymbol(value)) {
		return true;
	}
	return false;
}
module.exports = isKey;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-module.exports = function(value, object) {
-	return null == value || null != value;
-};
+function e(e) {
+	return e != null;
+}
+function t(t, n) {
+	return !!(t == null || e(t));
+}
+module.exports = t;

```

## `swc/issues/2807/1`

- size: oxc 107 vs reference 31 (+76 bytes)

```js
export default function A() {
	console.log(123);
	console.log.apply(console, arguments);
	console.a.b.c(console, arguments);
	console.any();
	console.warn();
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-export default function A() {}
+export default function e() {
+	console.log.apply(console, arguments), console.a.b.c(console, arguments);
+}

```

## `swc/issues/4234`

- size: oxc 80 vs reference 72 (+8 bytes)

```js
bar(new RegExp(''));
bar(new RegExp('', 'u'));
bar(new RegExp('a'));
bar(new RegExp('a', 'u'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-bar(RegExp(''));
-bar(RegExp('', 'u'));
-bar(/a/);
-bar(RegExp('a', 'u'));
+bar(RegExp('')), bar(RegExp('', 'u')), bar(RegExp('a')), bar(RegExp('a', 'u'));

```

## `swc/issues/4412`

- size: oxc 113 vs reference 95 (+18 bytes)

```js
export function foo(arg) {
	switch (arg) {
		case ENUM_VALUE: {
			const { data } = arg;
			call(data);
			break;
		}
		default: break;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,9 @@
-export function foo(arg) {
-	if (arg === ENUM_VALUE) {
-		let { data } = arg;
-		call(data);
+export function e(e) {
+	switch (e) {
+		case ENUM_VALUE: {
+			let { data: t } = e;
+			call(t);
+			break;
+		}
 	}
 }

```

## `swc/issues/5280`

- size: oxc 82 vs reference 52 (+30 bytes)

```js
export function source() {
	let c = 0;
	let a = 1;
	c += a;
	a += 5;
	let b = c;
	console.log(a, b, c);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-export function source() {
-	console.log(6, 1, 1);
+export function e() {
+	let e = 0, t = 1;
+	e += t, t += 5, console.log(t, e, e);
 }

```

## `swc/issues/5343`

- size: oxc 71 vs reference 58 (+13 bytes)

```js
({ x: 0 }).x = _iter[_i];
for ({ x: 0 }.x of iter()) {
	console.log(123);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-for ({ x: 0 }.x of (_iter[_i], iter())) console.log(123);
+({ x: 0 }).x = _iter[_i];
+for ({ x: 0 }.x of iter()) console.log(123);

```

## `swc/issues/5680`

- size: oxc 41 vs reference 30 (+11 bytes)

```js
const totalCount = (a ? a.length : 0) + (b ? b.length : 0);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-a && a.length, b && b.length;
+(a ? a.length : 0) + (b ? b.length : 0);

```

## `swc/issues/5693`

- size: oxc 155 vs reference 146 (+9 bytes)

```js
API.prototype._getIngestEndpoint = function(target) {
	var base = this.getBaseApiEndpoint();
	var dsn = this._dsnObject;
	return '' + base + dsn.projectId + '/' + target + '/';
};

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-API.prototype._getIngestEndpoint = function(target) {
-	return '' + this.getBaseApiEndpoint() + this._dsnObject.projectId + '/' + target + '/';
+API.prototype._getIngestEndpoint = function(e) {
+	var t = this.getBaseApiEndpoint(), n = this._dsnObject;
+	return '' + t + n.projectId + '/' + e + '/';
 };

```

## `swc/issues/5864`

- size: oxc 27 vs reference 18 (+9 bytes)

```js
foo = { v: 0 .toFixed() };

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-foo = { v: '0' };
+foo = { v: 0 .toFixed() };

```

## `swc/issues/6049/1`

- size: oxc 19 vs reference 8 (+11 bytes)

```js
var a = z();
g(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-g(z());
+var e = z();
+g(e);

```

## `swc/issues/6279/1`

- size: oxc 87 vs reference 64 (+23 bytes)

```js
function run(str, r) {
	let m;
	while (m = r.exec(str)) {
		console.log(m);
	}
}
run('abcda', /a/g);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-let m;
-for (var r = /a/g; m = r.exec('abcda');) console.log(m);
+function e(e, t) {
+	let n;
+	for (; n = t.exec(e);) console.log(n);
+}
+e('abcda', /a/g);

```

## `swc/issues/6279/2`

- size: oxc 112 vs reference 64 (+48 bytes)

```js
const r = new RegExp('a', 'g');
function run(str, r) {
	let m;
	while (m = r.exec(str)) {
		console.log(m);
	}
}
run('abcda', r);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
-let m;
-for (var r = /a/g; m = r.exec('abcda');) console.log(m);
+const e = RegExp('a', 'g');
+function t(e, t) {
+	let n;
+	for (; n = t.exec(e);) console.log(n);
+}
+t('abcda', e);

```

## `swc/issues/6492/1`

- size: oxc 50 vs reference 24 (+26 bytes)

```js
const obj = { key: 42 };
const val = obj?.[null || 'key'];
console.log('val', val);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('val', 42);
+const e = { key: 42 }.key;
+console.log('val', e);

```

## `swc/issues/6492/2`

- size: oxc 61 vs reference 36 (+25 bytes)

```js
const obj = { key: 42 };
const val = obj?.key.toString();
console.log('val', val);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('val', 42 .toString());
+const e = { key: 42 }.key.toString();
+console.log('val', e);

```

## `swc/issues/6492/3`

- size: oxc 62 vs reference 36 (+26 bytes)

```js
const obj = { key: 42 };
const val = obj?.key?.toString();
console.log('val', val);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('val', 42 .toString());
+const e = { key: 42 }.key?.toString();
+console.log('val', e);

```

## `swc/issues/6492/4`

- size: oxc 62 vs reference 36 (+26 bytes)

```js
const obj = { key: 42 };
const val = obj.key?.toString();
console.log('val', val);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('val', 42 .toString());
+const e = { key: 42 }.key?.toString();
+console.log('val', e);

```

## `swc/issues/6957/1`

- size: oxc 442 vs reference 368 (+74 bytes)

```js
// prettier-ignore
export function foo() {
	//    actual | expected
	alert(1 .toFixed(1));
	alert(0 .toFixed(0));
	alert(0 .toFixed(1));
	alert(0 .toFixed(2));
	alert(0 .toFixed(3));
	alert(10 .toFixed(1));
	alert(20 .toFixed(2));
	alert(30 .toFixed(3));
	alert(100 .toFixed(1));
	alert(100 .toFixed(2));
	alert(100 .toFixed(3));
	alert(110 .toFixed(1));
	alert(110 .toFixed(2));
	alert(110 .toFixed(3));
	alert(110 .toFixed(4));
	alert(1110 .toFixed(4));
	alert(11110 .toFixed(4));
}

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,4 @@
 // prettier-ignore
-export function foo() {
-	//    actual | expected
-	alert('1.0');
-	alert('0');
-	alert('0.0');
-	alert('0.00');
-	alert('0.000');
-	alert('10.0');
-	alert('20.00');
-	alert('30.000');
-	alert('100.0');
-	alert('100.00');
-	alert('100.000');
-	alert('110.0');
-	alert('110.00');
-	alert('110.000');
-	alert('110.0000');
-	alert('1110.0000');
-	alert('11110.0000');
+export function e() {
+	alert(1 .toFixed(1)), alert(0 .toFixed(0)), alert(0 .toFixed(1)), alert(0 .toFixed(2)), alert(0 .toFixed(3)), alert(10 .toFixed(1)), alert(20 .toFixed(2)), alert(30 .toFixed(3)), alert(100 .toFixed(1)), alert(100 .toFixed(2)), alert(100 .toFixed(3)), alert(110 .toFixed(1)), alert(110 .toFixed(2)), alert(110 .toFixed(3)), alert(110 .toFixed(4)), alert(1110 .toFixed(4)), alert(11110 .toFixed(4));
 }

```

## `swc/issues/6957/2`

- size: oxc 111 vs reference 89 (+22 bytes)

```js
assertEquals('1', .5.toFixed(0), '0.5.toFixed(0)');
assertEquals('-1', (-.5).toFixed(0), '(-0.5).toFixed(0)');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-assertEquals('1', '1', '0.5.toFixed(0)');
-assertEquals('-1', '-1', '(-0.5).toFixed(0)');
+assertEquals('1', .5.toFixed(0), '0.5.toFixed(0)'), assertEquals('-1', (-.5).toFixed(0), '(-0.5).toFixed(0)');

```

## `swc/issues/7004`

- size: oxc 176 vs reference 117 (+59 bytes)

```js
function getDescription(option, parentGroup) {
	return [parentGroup && parentGroup.label, option.__labelPrefix].concat(option.tags);
}
function printDescription() {
	const option = {
		__labelPrefix: 'test',
		tags: []
	};
	const parent = null;
	const desc = getDescription(option, parent);
	console.log(desc);
}
printDescription();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,11 @@
-var option;
-console.log([null, (option = {
-	__labelPrefix: 'test',
-	tags: []
-}).__labelPrefix].concat(option.tags));
+function e(e, t) {
+	return [t && t.label, e.__labelPrefix].concat(e.tags);
+}
+function t() {
+	let t = e({
+		__labelPrefix: 'test',
+		tags: []
+	}, null);
+	console.log(t);
+}
+t();

```

## `swc/issues/7241`

- size: oxc 117 vs reference 26 (+91 bytes)

```js
(function() {
	function forwardRef() {
		return something();
	}
	function Test() {
		return 'Test';
	}
	const _Test = (0, forwardRef)(Test);
	function Other() {
		return 'Other';
	}
	const _Other = (0, forwardRef)(Other);
	console.log((0, _Test));
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(something());
+(function() {
+	function e() {
+		return something();
+	}
+	function t() {
+		return 'Test';
+	}
+	console.log(e(t));
+})();

```

## `swc/issues/7287/1`

- size: oxc 106 vs reference 42 (+64 bytes)

```js
(function() {
	const r = f();
	console.log(r);
	function f() {
		console.log('REQUIRE');
		return 1;
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-console.log((console.log('REQUIRE'), 1));
+(function() {
+	let e = t();
+	console.log(e);
+	function t() {
+		return console.log('REQUIRE'), 1;
+	}
+})();

```

## `swc/issues/7331/1`

- size: oxc 91 vs reference 77 (+14 bytes)

```js
export default function() {
	function foo(arg) {
		var arg = arg.slice();
		return arg;
	}
	foo([]);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 export default function() {
-	var arg;
-	var arg;
-	arg = (arg = []).slice();
+	function e(e) {
+		var e = e.slice();
+		return e;
+	}
+	e([]);
 }

```

## `swc/issues/7331/2`

- size: oxc 91 vs reference 29 (+62 bytes)

```js
export default function() {
	function foo(arg) {
		var arg = arg.slice();
		return arg;
	}
	foo([]);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-export default function() {}
+export default function() {
+	function e(e) {
+		var e = e.slice();
+		return e;
+	}
+	e([]);
+}

```

## `swc/issues/7575/1`

- size: oxc 77 vs reference 71 (+6 bytes)

```js
export const envKey = 'staging' || 'production';
const environmentResolver = () => {
	if (envKey === 'production') {
		return 'production';
	}
	if (envKey === 'staging') {
		return 'staging';
	}
	if (envKey === 'test') {
		return 'test';
	}
	if (envKey === 'development') {
		return 'development';
	}
	throw new Error(`Unknown environment: ${envKey}`);
};
export const environment = environmentResolver();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-export const envKey = 'staging';
-export const environment = 'staging';
+export const e = 'staging';
+const t = () => 'staging';
+export const n = t();

```

## `swc/issues/7754/1`

- size: oxc 59 vs reference 55 (+4 bytes)

```js
const foo = 1;
console.log(foo);
eval(`console.log(foo)`);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-const o = 1;
-console.log(o), eval('console.log(foo)');
+const foo = 1;
+console.log(foo), eval('console.log(foo)');

```

## `swc/issues/7770/2`

- size: oxc 220 vs reference 148 (+72 bytes)

```js
const sWidth = 'asdasd';
function absolute() {
	return `
    `;
}
function flex() {
	return `
    `;
}
exports.MainCSS = `
.ThisshouldOnlyBeonTop {
    ${absolute()}
}
.abcBlablaOne .asdsad {
    ${flex()}
}
.aasdasdasd .asdsada {
    we: ${sWidth} !important;
}
`;

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,15 @@
+function e() {
+	return '\n    ';
+}
+function t() {
+	return '\n    ';
+}
 exports.MainCSS = `
 .ThisshouldOnlyBeonTop {
-    
-    
+    ${e()}
 }
 .abcBlablaOne .asdsad {
-    
-    
+    ${t()}
 }
 .aasdasdasd .asdsada {
     we: asdasd !important;

```

## `swc/issues/7784/1`

- size: oxc 109 vs reference 16 (+93 bytes)

```js
let a = 1;
function foo(g) {
	var t = g();
	a += t;
}
function g() {
	a = 2;
	return 1;
}
foo(g);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(3);
+let e = 1;
+function t(t) {
+	var n = t();
+	e += n;
+}
+function n() {
+	return e = 2, 1;
+}
+t(n), console.log(e);

```

## `swc/issues/7784/2`

- size: oxc 109 vs reference 16 (+93 bytes)

```js
let a = 1;
function foo(g) {
	var t = g();
	a = a + t;
}
function g() {
	a = 2;
	return 1;
}
foo(g);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(3);
+let e = 1;
+function t(t) {
+	var n = t();
+	e += n;
+}
+function n() {
+	return e = 2, 1;
+}
+t(n), console.log(e);

```

## `swc/issues/7984`

- size: oxc 174 vs reference 172 (+2 bytes)

```js
getInitialProps = (code) => {
	let statusCode, message;
	if (code) {
		statusCode = code;
	}
	switch (statusCode) {
		case 404:
			message = '404';
			break;
		default: message = '500';
	}
	return {
		statusCode,
		message
	};
};

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,13 @@
-getInitialProps = (code) => {
-	let statusCode, message;
-	return code && (statusCode = code), message = 404 === statusCode ? '404' : '500', {
-		statusCode,
-		message
+getInitialProps = (e) => {
+	let t, n;
+	switch (e && (t = e), t) {
+		case 404:
+			n = '404';
+			break;
+		default: n = '500';
+	}
+	return {
+		statusCode: t,
+		message: n
 	};
 };

```

## `swc/issues/8465`

- size: oxc 56 vs reference 53 (+3 bytes)

```js
function Infinity() {
	console.log('xxx');
}
export default Infinity;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-export default function() {
+function e() {
 	console.log('xxx');
 }
-;
+export default e;

```

## `swc/issues/8670`

- size: oxc 64 vs reference 61 (+3 bytes)

```js
const [a, b, c, d, e] = [
	1,
	2,
	3,
	4,
	5
];
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-const [, , c, , ,] = [
+const [e, t, n, r, i] = [
 	1,
 	2,
 	3,
 	4,
 	5
 ];
-console.log(c);
+console.log(n);

```

## `swc/issues/8704`

- size: oxc 53 vs reference 45 (+8 bytes)

```js
console.log({ toString() {
	return 'swc';
} } + '');

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log({ toString: () => 'swc' } + '');
+console.log({ toString() {
+	return 'swc';
+} } + '');

```

## `swc/issues/8718/2`

- size: oxc 50 vs reference 19 (+31 bytes)

```js
let a = 0;
a = '';
console.log((a += 1, a += 2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('12');
+let e = 0;
+e = '', console.log((e += 1, e += 2));

```

## `swc/issues/8718/3`

- size: oxc 88 vs reference 62 (+26 bytes)

```js
let a;
function f() {
	a = '123';
	console.log(a);
}
f();
console.log((a += 1, a += 2));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-let a;
-console.log(a = '123'), console.log((a += 1, a += 2));
+let e;
+function t() {
+	e = '123', console.log(e);
+}
+t(), console.log((e += 1, e += 2));

```

## `swc/issues/8718/4`

- size: oxc 142 vs reference 92 (+50 bytes)

```js
let a;
function g() {
	a = '123';
	console.log(a);
}
function f() {
	// a = "123";
	console.log(a);
}
f(), g();
console.log((a += 1, a += 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
-let a;
-// a = "123";
-console.log(a), console.log(a = '123'), console.log((a += 1, a += 2));
+let e;
+function t() {
+	e = '123', console.log(e);
+}
+function n() {
+	// a = "123";
+	console.log(e);
+}
+n(), t(), console.log((e += 1, e += 2));

```

## `swc/issues/8718/5`

- size: oxc 42 vs reference 16 (+26 bytes)

```js
let a = 0;
function f() {
	a = '123';
	console.log(a);
}
console.log((a += 1, a += 2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(3);
+let e = 0;
+console.log((e += 1, e += 2));

```

## `swc/issues/8718/6`

- size: oxc 42 vs reference 16 (+26 bytes)

```js
let a = 0;
function g() {
	a = '123';
	console.log(a);
}
function f() {
	// a = "123";
	console.log(a);
}
console.log((a += 1, a += 2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(3);
+let e = 0;
+console.log((e += 1, e += 2));

```

## `swc/issues/8718/7`

- size: oxc 52 vs reference 51 (+1 bytes)

```js
export function foo(a) {
	a += 1;
	a += 2;
	return a;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-export function foo(a) {
-	return a += 1, a += 2;
+export function e(e) {
+	return e += 1, e += 2, e;
 }

```

## `swc/issues/8737`

- size: oxc 86 vs reference 66 (+20 bytes)

```js
d(() => {
	var obj = { key: 'some string' };
	var b = () => {
		switch (a) {
			default: break;
		}
		return obj.key;
	};
	return () => b;
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 d(() => {
-	var b = () => (a, 'some string');
-	return () => b;
+	var e = { key: 'some string' }, t = () => (a, e.key);
+	return () => t;
 });

```

## `swc/issues/8737/2`

- size: oxc 129 vs reference 109 (+20 bytes)

```js
d(function() {
	var obj = { key: 'some string' }, b = function() {
		return a, obj.key;
	};
	return function() {
		return b;
	};
});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 d(function() {
-	var b = function() {
-		return a, 'some string';
+	var e = { key: 'some string' }, t = function() {
+		return a, e.key;
 	};
 	return function() {
-		return b;
+		return t;
 	};
 });

```

## `swc/issues/8806`

- size: oxc 65 vs reference 57 (+8 bytes)

```js
function logTheNine() {
	((theThree, theNine) => {
		console.log(theNine);
	})(...[3, 9]);
}
logTheNine();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-function logTheNine() {
-	console.log(9);
+function e() {
+	((e, t) => {
+		console.log(t);
+	})(3, 9);
 }
-logTheNine();
+e();

```

## `swc/issues/8813`

- size: oxc 710 vs reference 369 (+341 bytes)

```js
const k1 = (() => {
	const x = 'asdf';
	let y = 'PASS 1';
	switch (x) {
		case x:
		default:
		case y = 'FAIL':
	}
	console.log(y);
})();
const k2 = (() => {
	const x = 'asdf';
	let y = 'PASS 2';
	switch (x) {
		case x:
		case y = 'FAIL':
		default:
	}
	console.log(y);
})();
const k3 = (() => {
	const x = 'asdf';
	let y = 'FAIL';
	switch (x) {
		case y = 'PASS 3', x:
		default:
	}
	console.log(y);
})();
const k4 = (() => {
	const x = 'asdf';
	let y = 'FAIL';
	switch (x) {
		case y = 'PASS 4':
		case x:
		default:
	}
	console.log(y);
})();
const k5 = (() => {
	const x = 'asdf';
	let y = 'FAIL';
	let z = 'FAIL';
	switch (x) {
		case y = 'PASS 5':
		case z = 'PASS 5':
		case x:
		default:
	}
	console.log(y, z);
})();
var c = 'FAIL';
(function() {
	function f(a, NaN) {
		function g() {
			switch (a) {
				case a: break;
				case c = 'PASS', NaN:
					c = 'FAIL';
					break;
			}
		}
		g();
	}
	f(0 / 0);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,19 +1,47 @@
-let x = 'asdf', y = 'PASS 1';
-switch (x) {
-	case x:
-	default:
-	case y = 'FAIL':
-}
-console.log(y);
-let x1 = 'asdf', y1 = 'PASS 2';
-switch (x1) {
-	case x1:
-	case y1 = 'FAIL':
-}
-console.log(y1), console.log('PASS 3'), console.log('PASS 4');
-let y2 = 'FAIL', z = 'FAIL';
-switch ('asdf') {
-	case y2 = 'PASS 5':
-	case z = 'PASS 5':
-}
-console.log(y2, z), console.log('PASS');
+(() => {
+	let e = 'asdf';
+	switch (e) {
+		case e:
+	}
+	console.log('PASS 1');
+})(), (() => {
+	let e = 'asdf';
+	switch (e) {
+		case e:
+	}
+	console.log('PASS 2');
+})(), (() => {
+	let e = 'asdf', t = 'FAIL';
+	switch (e) {
+		case t = 'PASS 3', e:
+	}
+	console.log(t);
+})(), (() => {
+	let e = 'asdf', t = 'FAIL';
+	switch (e) {
+		case t = 'PASS 4':
+		case e:
+	}
+	console.log(t);
+})(), (() => {
+	let e = 'asdf', t = 'FAIL', n = 'FAIL';
+	switch (e) {
+		case t = 'PASS 5':
+		case n = 'PASS 5':
+		case e:
+	}
+	console.log(t, n);
+})();
+var e = 'FAIL';
+(function() {
+	function t(t, n) {
+		function r() {
+			switch (t) {
+				case t: break;
+				case e = 'PASS', n: e = 'FAIL';
+			}
+		}
+		r();
+	}
+	t(NaN);
+})(), console.log(e);

```

## `swc/issues/8841`

- size: oxc 55 vs reference 27 (+28 bytes)

```js
export const k = (() => {
	var x = x;
	return x;
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-var x;
-export const k = x;
+export const e = (() => {
+	var e = e;
+	return e;
+})();

```

## `swc/issues/8886`

- size: oxc 70 vs reference 46 (+24 bytes)

```js
const bar = ((v) => v)(1);
const foo = ((v) => v)(2);
eval(bar);
eval(foo);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-const bar = 1, foo = 2;
+const bar = ((e) => e)(1), foo = ((e) => e)(2);
 eval(bar), eval(foo);

```

## `swc/issues/8919`

- size: oxc 61 vs reference 35 (+26 bytes)

```js
'use strict';
const k = (() => {
	switch ('') {
		default: var x;
		case '': x;
	}
	return x;
})();
console.log(k);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
 'use strict';
-console.log(void 0);
+console.log((() => {
+	var e;
+	return e;
+})());

```

## `swc/issues/9148`

- size: oxc 221 vs reference 199 (+22 bytes)

```js
function foo() {
	const obj = {
		clear: function() {
			console.log('clear');
		},
		start: function() {
			const _this = this;
			setTimeout(function() {
				_this.clear();
			});
		}
	};
	return () => obj.start();
}
;
export default foo();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,15 @@
-let obj;
-export default (obj = {
-	clear: function() {
-		console.log('clear');
-	},
-	start: function() {
-		let _this = this;
-		setTimeout(function() {
-			_this.clear();
-		});
-	}
-}, () => obj.start());
+function e() {
+	let e = {
+		clear: function() {
+			console.log('clear');
+		},
+		start: function() {
+			let e = this;
+			setTimeout(function() {
+				e.clear();
+			});
+		}
+	};
+	return () => e.start();
+}
+export default e();

```

## `swc/issues/9176`

- size: oxc 54 vs reference 33 (+21 bytes)

```js
'use strict';
const k = (function() {
	switch (-0) {
		case 0:
			console.log('hi');
			break;
		default: throw 0;
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
 'use strict';
-console.log('hi');
+(function() {
+	console.log('hi');
+})();

```

## `swc/issues/9186/1`

- size: oxc 160 vs reference 154 (+6 bytes)

```js
o = {
	foo() {
		return val;
	},
	s: 'test'
};
console.log(o.foo().length);
o = {
	foo(val = this.s) {
		return val;
	},
	s: 'test'
};
console.log(o.foo().length);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
-console.log((o = {
-	foo: () => val,
+o = {
+	foo() {
+		return val;
+	},
 	s: 'test'
-}).foo().length), console.log((o = {
-	foo(val1 = this.s) {
-		return val1;
+}, console.log(o.foo().length), o = {
+	foo(e = this.s) {
+		return e;
 	},
 	s: 'test'
-}).foo().length);
+}, console.log(o.foo().length);

```

## `swc/issues/9263`

- size: oxc 117 vs reference 108 (+9 bytes)

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
@@ -1,7 +1,7 @@
 'use strict';
-let k = function() {
-	var x = 42;
-	for (var x in [4242]) break;
-	return x;
-}();
-export { k };
+const e = (function() {
+	var e = 42;
+	for (var e in [4242]) break;
+	return e;
+})();
+export { e as k };

```

## `swc/issues/9453`

- size: oxc 146 vs reference 114 (+32 bytes)

```js
'use strict';
class x {}
const y = x;
const z = class {};
console.log(typeof x);
console.log(typeof y);
console.log(typeof z);
console.log(typeof class {});

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
 'use strict';
-console.log('function'), console.log('function'), console.log('function'), console.log('function');
+class e {}
+const t = e, n = class {};
+console.log(typeof e), console.log(typeof t), console.log(typeof n), console.log('function');

```

## `swc/issues/9459`

- size: oxc 89 vs reference 39 (+50 bytes)

```js
export default function Component() {
	const [state, setState] = useState();
	const { a, b = 'b' } = call();
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-export default function Component() {}
+export default function e() {
+	let [e, t] = useState(), { a: n, b: r = 'b' } = call();
+}

```

## `swc/issues/9610`

- size: oxc 215 vs reference 209 (+6 bytes)

```js
const defaultMessage = 'hello';
function x(x) {
	return x;
}
function y(x, y, z) {
	return x;
}
;
function abc(a) {
	return x(a);
}
function abc2(a, x, z = defaultMessage) {
	return y(a);
}
export function example() {
	return `${x(2)} ${y('2')} ${abc(3)} ${abc2('3')}`;
}

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,15 @@
-function x(x) {
-	return x;
+function e(e) {
+	return e;
 }
-function y(x) {
-	return x;
+function t(e, t, n) {
+	return e;
 }
-function abc(a) {
-	return x(a);
+function n(t) {
+	return e(t);
 }
-function abc2(a) {
-	return y(a);
+function r(e, n, r = 'hello') {
+	return t(e);
 }
-export function example() {
-	return `${x(2)} ${y('2')} ${abc(3)} ${abc2('3')}`;
+export function i() {
+	return `${e(2)} ${t('2')} ${n(3)} ${r('3')}`;
 }

```

## `swc/issues/9610-arrow-functions`

- size: oxc 222 vs reference 170 (+52 bytes)

```js
// Test: Arrow functions with unused default parameters
const defaultValue = 100;
// Unused default param at end should be removed
const foo = (a, b = defaultValue) => a;
// Unused default param in middle - params after should also be removed
const bar = (a, b = 10, c = 20) => a;
// Used default param should be kept
const baz = (a, b = 5) => a + b;
// Multiple default params, only last unused
const qux = (a, b = 1, c = 2) => a + b;
export const example = () => foo(1) + bar(2) + baz(3) + qux(4);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
 // Test: Arrow functions with unused default parameters
-export const example = () => ((a) => a)(1) + ((a) => a)(2) + ((a, b = 5) => a + b)(3) + ((a, b = 1) => a + b)(4);
+const e = (e, t = 100) => e, t = (e, t = 10, n = 20) => e, n = (e, t = 5) => e + t, r = (e, t = 1, n = 2) => e + t;
+export const i = () => e(1) + t(2) + n(3) + r(4);

```

## `swc/issues/9610-methods`

- size: oxc 615 vs reference 492 (+123 bytes)

```js
// Test: Object and class methods with unused default parameters
const obj = {
	// Method with unused default param
	method1(a, b = 10) {
		return a;
	},
	// Method with used default param
	method2(a, b = 20) {
		return a + b;
	}
};
class MyClass {
	// Method with unused default param
	method1(a, b = 30) {
		return a;
	}
	// Method with used default param
	method2(a, b = 40) {
		return a + b;
	}
	// Static method with unused default param
	static staticMethod(a, b = 50) {
		return a;
	}
}
export function example() {
	const instance = new MyClass();
	return obj.method1(1) + obj.method2(2) + instance.method1(3) + instance.method2(4) + MyClass.staticMethod(5);
}

```

```diff
--- reference
+++ oxc
@@ -1,19 +1,29 @@
 // Test: Object and class methods with unused default parameters
-class MyClass {
+const e = {
 	// Method with unused default param
-	method1(a) {
-		return a;
+	method1(e, t = 10) {
+		return e;
+	},
+	// Method with used default param
+	method2(e, t = 20) {
+		return e + t;
+	}
+};
+class t {
+	// Method with unused default param
+	method1(e, t = 30) {
+		return e;
 	}
 	// Method with used default param
-	method2(a, b = 40) {
-		return a + b;
+	method2(e, t = 40) {
+		return e + t;
 	}
 	// Static method with unused default param
-	static staticMethod(a) {
-		return a;
+	static staticMethod(e, t = 50) {
+		return e;
 	}
 }
-export function example() {
-	let instance = new MyClass();
-	return ((a) => a)(1) + ((a, b = 20) => a + b)(2) + instance.method1(3) + instance.method2(4) + MyClass.staticMethod(5);
+export function n() {
+	let n = new t();
+	return e.method1(1) + e.method2(2) + n.method1(3) + n.method2(4) + t.staticMethod(5);
 }

```

## `swc/issues/9757`

- size: oxc 165 vs reference 31 (+134 bytes)

```js
export default function A() {
	console?.log?.(123);
	console?.log?.apply(console, arguments);
	console?.a.b?.c(console, arguments);
	console?.any();
	console?.warn();
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-export default function A() {}
+export default function e() {
+	console?.log?.(123), console?.log?.apply(console, arguments), console?.a.b?.c(console, arguments), console?.any(), console?.warn();
+}

```

## `swc/issues/9785`

- size: oxc 168 vs reference 134 (+34 bytes)

```js
function dist_index_es_P(e) {
	try {
		t = JSON.stringify(e);
	} catch (r) {
		t = String(e);
	}
	for (var r = 0, o = 0; o < t.length; o++) {
		r += 1;
	}
	console.log(r);
	return r;
}
dist_index_es_P('aa');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
-try {
-	t = JSON.stringify('aa');
-} catch (r) {
-	t = String('aa');
+function e(e) {
+	try {
+		t = JSON.stringify(e);
+	} catch {
+		t = String(e);
+	}
+	for (var n = 0, r = 0; r < t.length; r++) n += 1;
+	return console.log(n), n;
 }
-for (var r = 0, o = 0; o < t.length; o++) r += 1;
-console.log(r);
+e('aa');

```

## `swc/issues/9823/3`

- size: oxc 42 vs reference 21 (+21 bytes)

```js
(function() {
	function foo() {}
	console.log('Done');
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('Done');
+(function() {
+	console.log('Done');
+})();

```

## `swc/issues/9922/1`

- size: oxc 55 vs reference 0 (+55 bytes)

```js
switch (0) {
	default:
		x: break;
		console.log(1);
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+switch (0) {
+	default:
+		x: break;
+		console.log(1);
+}

```

## `swc/issues/9922/2`

- size: oxc 96 vs reference 5 (+91 bytes)

```js
switch (g()) {
	case 1:
		y: break;
		console.log(2);
	default:
		x: break;
		console.log(1);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,8 @@
-g();
+switch (g()) {
+	case 1:
+		y: break;
+		console.log(2);
+	default:
+		x: break;
+		console.log(1);
+}

```

## `swc/issues/arguments-canonical-index`

- size: oxc 184 vs reference 170 (+14 bytes)

```js
(function(zero, one) {
	console.log([
		arguments['01'],
		arguments[-1],
		arguments[1.5],
		arguments[1e21],
		arguments[-0],
		arguments[1]
	].map(String).join(','));
})('zero', 'one');

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-!function(zero, one) {
+(function(e, t) {
 	console.log([
 		arguments['01'],
 		arguments[-1],
 		arguments[1.5],
 		arguments[1e21],
-		zero,
-		one
+		arguments[-0],
+		arguments[1]
 	].map(String).join(','));
-}('zero', 'one');
+})('zero', 'one');

```

## `swc/issues/cycle-1`

- size: oxc 140 vs reference 114 (+26 bytes)

```js
(() => {
	class A {
		cycle() {
			return B;
		}
	}
	class B {
		cycle() {
			return A;
		}
	}
	class ExtendsA1 extends sideEffectWith(A) {}
	class Unused1 {
		constructor() {
			ExtendsA1;
		}
	}
	class ExtendsA2 extends sideEffectWith(A) {}
	class Unused2 {
		async put() {
			ExtendsA2;
		}
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
-class A {
-	cycle() {
-		return B;
+(() => {
+	class e {
+		cycle() {
+			return t;
+		}
 	}
-}
-class B {
-	cycle() {
-		return A;
+	class t {
+		cycle() {
+			return e;
+		}
 	}
-}
-sideEffectWith(A), sideEffectWith(A);
+	sideEffectWith(e), sideEffectWith(e);
+})();

```

## `swc/issues/cycle-2`

- size: oxc 121 vs reference 95 (+26 bytes)

```js
(() => {
	class C {
		cycle() {
			return D;
		}
	}
	class D {
		cycle() {
			return C;
		}
	}
	class ExtendsC extends sideEffectWith(C) {}
	class Unused {
		constructor() {
			ExtendsC;
		}
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
-class C {
-	cycle() {
-		return D;
+(() => {
+	class e {
+		cycle() {
+			return t;
+		}
 	}
-}
-class D {
-	cycle() {
-		return C;
+	class t {
+		cycle() {
+			return e;
+		}
 	}
-}
-sideEffectWith(C);
+	sideEffectWith(e);
+})();

```

## `swc/issues/drop-console-computed`

- size: oxc 221 vs reference 147 (+74 bytes)

```js
const cb = console.error['bind'](console);
cb('boom');
process.stdout.write(typeof cb + '\n');
console.error['call'](console, 'via call');
const r = console.error['capture']('custom property');
process.stdout.write(typeof r + '\n');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-const cb = (function() {})['bind']();
-cb('boom');
-process.stdout.write(typeof cb + '\n');
-const r = void 0;
-process.stdout.write(typeof r + '\n');
+const e = console.error.bind(console);
+e('boom'), process.stdout.write(typeof e + '\n'), console.error.call(console, 'via call');
+const t = console.error.capture('custom property');
+process.stdout.write(typeof t + '\n');

```

## `swc/issues/drop-console-value-refs`

- size: oxc 958 vs reference 794 (+164 bytes)

```js
const err = console.error.bind(console);
err('boom');
const s = console.warn.toString();
process.stdout.write(typeof s + '\n');
console.error('statement');
console.error.call(console, 'via call');
console.error.apply(console, ['via apply']);
console.error.bind(console);
console.error.capture('custom property, dropped like before');
const cap = console.error.capture('custom property, value position');
process.stdout.write(typeof cap + '\n');
const cap2 = console.error.capture?.('custom property, optional call');
process.stdout.write(typeof cap2 + '\n');
const r = console.error('value position');
process.stdout.write(typeof r + '\n');
process.stdout.write(typeof err + '\n');
const ob = console?.error?.bind(console);
ob('boom optional');
process.stdout.write(typeof ob + '\n');
const pb = console?.error.bind(console);
pb('early optional');
process.stdout.write(typeof pb + '\n');
const dbg = console.debug?.bind(console) || null;
process.stdout.write((dbg !== null) + '\n');
const st = console.state.valueOf();
process.stdout.write(typeof st + '\n');

```

```diff
--- reference
+++ oxc
@@ -1,22 +1,16 @@
-const err = (function() {}).bind();
-err('boom');
-const s = (function() {}).toString();
+const e = console.error.bind(console);
+e('boom');
+const t = console.warn.toString();
+process.stdout.write(typeof t + '\n'), console.error.call(console, 'via call'), console.error.apply(console, ['via apply']), console.error.bind(console), console.error.capture('custom property, dropped like before');
+const n = console.error.capture('custom property, value position');
+process.stdout.write(typeof n + '\n');
+const r = console.error.capture?.('custom property, optional call');
+process.stdout.write(typeof r + '\n'), process.stdout.write('undefined\n'), process.stdout.write(typeof e + '\n');
+const i = console?.error?.bind(console);
+i('boom optional'), process.stdout.write(typeof i + '\n');
+const a = console?.error.bind(console);
+a('early optional'), process.stdout.write(typeof a + '\n');
+const o = console.debug?.bind(console) || null;
+process.stdout.write((o !== null) + '\n');
+const s = console.state.valueOf();
 process.stdout.write(typeof s + '\n');
-(function() {}).bind();
-const cap = void 0;
-process.stdout.write(typeof cap + '\n');
-const cap2 = void 0;
-process.stdout.write(typeof cap2 + '\n');
-const r = void 0;
-process.stdout.write(typeof r + '\n');
-process.stdout.write(typeof err + '\n');
-const ob = (console?.error && function() {})?.bind();
-ob('boom optional');
-process.stdout.write(typeof ob + '\n');
-const pb = null == console ? void 0 : (console.error && function() {}).bind();
-pb('early optional');
-process.stdout.write
... [truncated]
```

## `swc/issues/non-finite-number-method-call`

- size: oxc 496 vs reference 375 (+121 bytes)

```js
console.log(1.23.toFixed(-1));
console.log(1.23.toFixed(-Infinity));
console.log(Infinity.toFixed(-1));
console.log(NaN.toFixed(-1));
console.log(1.23.toFixed(-.9));
console.log(1.23.toFixed(NaN));
console.log(1.23.toExponential(-1));
console.log(Infinity.toExponential(-1));
console.log(NaN.toExponential(-1));
console.log(1.23.toExponential(-.9));
console.log(1.23.toExponential(NaN));
console.log(1.23.toPrecision(-1));
console.log(Infinity.toPrecision(-1));
console.log(NaN.toPrecision(-1));

```

```diff
--- reference
+++ oxc
@@ -1,14 +1 @@
-console.log(1.23.toFixed(-1));
-console.log(1.23.toFixed(-1 / 0));
-console.log(Infinity.toFixed(-1));
-console.log((0 / 0).toFixed(-1));
-console.log('1');
-console.log('1');
-console.log(1.23.toExponential(-1));
-console.log('Infinity');
-console.log('NaN');
-console.log('1e+0');
-console.log('1e+0');
-console.log(1.23.toPrecision(-1));
-console.log('Infinity');
-console.log('NaN');
+console.log(1.23.toFixed(-1)), console.log(1.23.toFixed(-Infinity)), console.log(Infinity.toFixed(-1)), console.log(NaN.toFixed(-1)), console.log(1.23.toFixed(-.9)), console.log(1.23.toFixed(NaN)), console.log(1.23.toExponential(-1)), console.log(Infinity.toExponential(-1)), console.log(NaN.toExponential(-1)), console.log(1.23.toExponential(-.9)), console.log(1.23.toExponential(NaN)), console.log(1.23.toPrecision(-1)), console.log(Infinity.toPrecision(-1)), console.log(NaN.toPrecision(-1));

```

## `swc/issues/numeric-property-key`

- size: oxc 668 vs reference 207 (+461 bytes)

```js
console.log([
	{
		Infinity: 'correct',
		inf: 'wrong'
	}[Infinity],
	{
		'-Infinity': 'correct',
		'-inf': 'wrong'
	}[-Infinity],
	{
		0: 'correct',
		'-0': 'wrong'
	}[-0],
	{ 1e21: 'correct' }['1e+21'],
	{
		Infinity: 'wrong',
		inf: 'correct'
	}['inf'],
	{
		'-Infinity': 'wrong',
		'-inf': 'correct'
	}['-inf'],
	{
		0: 'wrong',
		'-0': 'correct'
	}['-0'],
	{
		1: 'wrong',
		'01': 'correct'
	}['01'],
	{
		1: 'wrong',
		'+1': 'correct'
	}['+1'],
	{
		1: 'wrong',
		'1.0': 'correct'
	}['1.0'],
	{
		1e21: 'wrong',
		'1000000000000000000000': 'correct'
	}['1000000000000000000000'],
	['correct']['0'],
	['zero', 'wrong']['01'],
	'correct'['0'],
	'wrong'['01']
].map(String).join(','));

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,47 @@
 console.log([
+	{
+		Infinity: 'correct',
+		inf: 'wrong'
+	}[Infinity],
+	{
+		'-Infinity': 'correct',
+		'-inf': 'wrong'
+	}[-Infinity],
+	{
+		0: 'correct',
+		'-0': 'wrong'
+	}[-0],
+	{ 1e21: 'correct' }['1e+21'],
+	{
+		Infinity: 'wrong',
+		inf: 'correct'
+	}.inf,
+	{
+		'-Infinity': 'wrong',
+		'-inf': 'correct'
+	}['-inf'],
+	{
+		0: 'wrong',
+		'-0': 'correct'
+	}['-0'],
+	{
+		1: 'wrong',
+		'01': 'correct'
+	}['01'],
+	{
+		1: 'wrong',
+		'+1': 'correct'
+	}['+1'],
+	{
+		1: 'wrong',
+		'1.0': 'correct'
+	}['1.0'],
+	{
+		1e21: 'wrong',
+		'1000000000000000000000': 'correct'
+	}['1000000000000000000000'],
 	'correct',
-	'correct',
-	'correct',
-	'correct',
-	'correct',
-	'correct',
-	'correct',
-	'correct',
-	'correct',
-	'correct',
-	'correct',
-	'correct',
-	void 0,
+	['zero', 'wrong']['01'],
 	'c',
-	void 0
+	'wrong'['01']
 ].map(String).join(','));

```

## `swc/issues/react-countup/2`

- size: oxc 642 vs reference 631 (+11 bytes)

```js
export function formatNumber(t) {
	var i, a, n, e, r = t < 0 ? '-' : '';
	i = Math.abs(t).toFixed(s.options.decimalPlaces);
	var o = (i += '').split('.');
	if (a = o[0], n = o.length > 1 ? s.options.decimal + o[1] : '', s.options.useGrouping) {
		e = '';
		for (var l = 0, h = a.length; l < h; ++l) 0 !== l && l % 3 == 0 && (e = s.options.separator + e), e = a[h - l - 1] + e;
		a = e;
	}
	return s.options.numerals && s.options.numerals.length && (a = a.replace(/[0-9]/g, function(t) {
		return s.options.numerals[+t];
	}), n = n.replace(/[0-9]/g, function(t) {
		return s.options.numerals[+t];
	})), r + s.options.prefix + a + n + s.options.suffix;
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,15 @@
-export function formatNumber(t) {
-	var a, n, e, o = (Math.abs(t).toFixed(s.options.decimalPlaces) + '').split('.');
-	if (a = o[0], n = o.length > 1 ? s.options.decimal + o[1] : '', s.options.useGrouping) {
-		e = '';
-		for (var l = 0, h = a.length; l < h; ++l) 0 !== l && l % 3 == 0 && (e = s.options.separator + e), e = a[h - l - 1] + e;
-		a = e;
+export function e(e) {
+	var t, n, r, i, a = e < 0 ? '-' : '';
+	t = Math.abs(e).toFixed(s.options.decimalPlaces);
+	var o = (t += '').split('.');
+	if (n = o[0], r = o.length > 1 ? s.options.decimal + o[1] : '', s.options.useGrouping) {
+		i = '';
+		for (var c = 0, l = n.length; c < l; ++c) c !== 0 && c % 3 == 0 && (i = s.options.separator + i), i = n[l - c - 1] + i;
+		n = i;
 	}
-	return s.options.numerals && s.options.numerals.length && (a = a.replace(/[0-9]/g, function(t) {
-		return s.options.numerals[+t];
-	}), n = n.replace(/[0-9]/g, function(t) {
-		return s.options.numerals[+t];
-	})), (t < 0 ? '-' : '') + s.options.prefix + a + n + s.options.suffix;
+	return s.options.numerals && s.options.numerals.length && (n = n.replace(/[0-9]/g, function(e) {
+		return s.options.numerals[+e];
+	}), r = r.replace(/[0-9]/g, function(e) {
+		return s.options.numerals[+e];
+	})), a + s.options.prefix + n + r + s.options.suffix;
 }

```

## `swc/issues/spread-primitives`

- size: oxc 462 vs reference 453 (+9 bytes)

```js
// Object spread of a primitive with no own enumerable properties contributes
// nothing and should be dropped entirely.
console.log({
	a: 1,
	...void 0
});
console.log({
	a: 1,
	...void 0
});
console.log({
	a: 1,
	...null
});
console.log({
	a: 1,
	...undefined
});
console.log({
	a: 1,
	...true
});
console.log({
	a: 1,
	...false
});
console.log({
	a: 1,
	...42
});
console.log({
	a: 1,
	...1 + 1
});
console.log({
	...void 0,
	a: 1
});
console.log({
	a: 1,
	...void 0,
	b: 2
});
// Strings expose indexed own enumerable properties, so they must NOT be dropped.
console.log({
	a: 1,
	...'ab'
});
// A real object literal still flattens (existing behavior, must not regress).
console.log({
	a: 1,
	...{ b: 2 }
});
// Array spread requires an iterable; spreading these primitives throws at
// runtime, so array spread must never be folded away.
console.log([1, ...[2, 3]]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-// Object spread of a primitive with no own enumerable properties contributes
-// nothing and should be dropped entirely.
+// Array spread requires an iterable; spreading these primitives throws at
+// runtime, so array spread must never be folded away.
 console.log({ a: 1 }), console.log({ a: 1 }), console.log({ a: 1 }), console.log({ a: 1 }), console.log({ a: 1 }), console.log({ a: 1 }), console.log({ a: 1 }), console.log({ a: 1 }), console.log({ a: 1 }), console.log({
 	a: 1,
 	b: 2

```

## `swc/issues/spread-primitives-void-call`

- size: oxc 211 vs reference 168 (+43 bytes)

```js
// The motivating case: a pure call inside `void` is reduced to `void 0` by
// earlier passes, and the resulting trivial spread is then dropped.
function foo() {
	return 1 + 1;
}
console.log({
	a: 1,
	...void foo()
});

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
 // The motivating case: a pure call inside `void` is reduced to `void 0` by
 // earlier passes, and the resulting trivial spread is then dropped.
-console.log({ a: 1 });
+function e() {
+	return 2;
+}
+console.log({
+	a: 1,
+	...void e()
+});

```

## `swc/member_expr/array_side_effects`

- size: oxc 328 vs reference 227 (+101 bytes)

```js
// Out of bounds
f([][-1]);
f([][1]);
f([][[]]);
f([][0 + []]);
f([
	x(),
	2,
	'a',
	1 + 1,
	y()
][-1]);
f([
	x(),
	2,
	'a',
	1 + 1,
	y()
][10]);
// Invalid property
f([].invalid);
f([]['invalid']);
f([
	x(),
	2,
	'a',
	1 + 1,
	y()
].invalid);
f([
	x(),
	2,
	'a',
	1 + 1,
	y()
]['invalid']);
// Valid property
f([].push);
f([]['push']);
f([
	x(),
	2,
	'a',
	1 + 1,
	y()
].push);
f([
	x(),
	2,
	'a',
	1 + 1,
	y()
]['push']);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,37 @@
-// Out of bounds
-f(void 0), f(void 0), f(void 0), f(void 0), f((x(), void y())), f((x(), void y())), f(void 0), f(void 0), f((x(), void y())), f((x(), void y())), f([].push), f([].push), f([x(), y()].push), f([x(), y()].push);
+f([][-1]), f([][1]), f([][[]]), f([][0]), f([
+	x(),
+	2,
+	'a',
+	2,
+	y()
+][-1]), f([
+	x(),
+	2,
+	'a',
+	2,
+	y()
+][10]), f([].invalid), f([].invalid), f([
+	x(),
+	2,
+	'a',
+	2,
+	y()
+].invalid), f([
+	x(),
+	2,
+	'a',
+	2,
+	y()
+].invalid), f([].push), f([].push), f([
+	x(),
+	2,
+	'a',
+	2,
+	y()
+].push), f([
+	x(),
+	2,
+	'a',
+	2,
+	y()
+].push);

```

## `swc/member_expr/object`

- size: oxc 268 vs reference 240 (+28 bytes)

```js
// Invalid
({})[0];
({}).invalid;
({})['invalid'];
({})[[]];
({})[0 + []];
// Object symbols
({}).constructor;
({}).__proto__;
({}).__defineGetter__;
({}).__defineSetter__;
({}).__lookupGetter__;
({}).__lookupSetter__;
({}).hasOwnProperty;
({}).isPrototypeOf;
({}).propertyIsEnumerable;
({}).toLocaleString;
({}).toString;
({}).valueOf;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-// Object symbols
-({}).constructor, {}.__proto__, {}.__defineGetter__, {}.__defineSetter__, {}.__lookupGetter__, {}.__lookupSetter__, {}.hasOwnProperty, {}.isPrototypeOf, {}.propertyIsEnumerable, {}.toLocaleString, {}.toString, {}.valueOf;
+({})[0], {}.invalid, {}.invalid, {}[[]], {}[0], {}.constructor, {}.__proto__, {}.__defineGetter__, {}.__defineSetter__, {}.__lookupGetter__, {}.__lookupSetter__, {}.hasOwnProperty, {}.isPrototypeOf, {}.propertyIsEnumerable, {}.toLocaleString, {}.toString, {}.valueOf;

```

## `swc/member_expr/object_side_effects`

- size: oxc 195 vs reference 113 (+82 bytes)

```js
// foo(), {}.__proto__
f({
	a: foo(),
	b: 5
}.__proto__);
// foo(), bar(), undefined
f({
	a: foo(),
	b: bar()
}.invalid);
// foo1(), bar(), baz(), foo2(), undefined
f({
	a: foo1(),
	b: {
		a: bar(),
		b: { a: baz() },
		c: foo2()
	}
}.invalid);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,15 @@
-// foo(), {}.__proto__
-f((foo(), {}.__proto__)), f((foo(), void bar())), f((foo1(), bar(), baz(), void foo2()));
+// foo1(), bar(), baz(), foo2(), undefined
+f({
+	a: foo(),
+	b: 5
+}.__proto__), f({
+	a: foo(),
+	b: bar()
+}.invalid), f({
+	a: foo1(),
+	b: {
+		a: bar(),
+		b: { a: baz() },
+		c: foo2()
+	}
+}.invalid);

```

## `swc/member_expr/seq`

- size: oxc 63 vs reference 46 (+17 bytes)

```js
console.log((f(), [2, 4])[5]);
console.log((f(), { b: 2 }).a);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(void f()), console.log(void f());
+console.log((f(), [2, 4])[5]), console.log((f(), { b: 2 }).a);

```

## `swc/member_expr/string`

- size: oxc 861 vs reference 829 (+32 bytes)

```js
// Invalid
''[0];
''[1];
''[-1];
''.invalid;
''['invalid'];
''[[]];
''[0 + []];
// Object symbols
''.constructor;
''.__proto__;
''.__defineGetter__;
''.__defineSetter__;
''.__lookupGetter__;
''.__lookupSetter__;
''.hasOwnProperty;
''.isPrototypeOf;
''.propertyIsEnumerable;
''.toLocaleString;
''.toString;
''.valueOf;
// String symbols
''.length;
''.anchor;
''.at;
''.big;
''.blink;
''.bold;
''.charAt;
''.charCodeAt;
''.codePointAt;
''.concat;
''.endsWith;
''.fixed;
''.fontcolor;
''.fontsize;
''.includes;
''.indexOf;
''.isWellFormed;
''.italics;
''.lastIndexOf;
''.link;
''.localeCompare;
''.match;
''.matchAll;
''.normalize;
''.padEnd;
''.padStart;
''.repeat;
''.replace;
''.replaceAll;
''.search;
''.slice;
''.small;
''.split;
''.startsWith;
''.strike;
''.sub;
''.substr;
''.substring;
''.sup;
''.toLocaleLowerCase;
''.toLocaleUpperCase;
''.toLowerCase;
''.toUpperCase;
''.toWellFormed;
''.trim;
''.trimEnd;
''.trimStart;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-// Invalid
-// Object symbols
-''.constructor, ''.__proto__, ''.__defineGetter__, ''.__defineSetter__, ''.__lookupGetter__, ''.__lookupSetter__, ''.hasOwnProperty, ''.isPrototypeOf, ''.propertyIsEnumerable, ''.toLocaleString, ''.toString, ''.valueOf, ''.anchor, ''.at, ''.big, ''.blink, ''.bold, ''.charAt, ''.charCodeAt, ''.codePointAt, ''.concat, ''.endsWith, ''.fixed, ''.fontcolor, ''.fontsize, ''.includes, ''.indexOf, ''.isWellFormed, ''.italics, ''.lastIndexOf, ''.link, ''.localeCompare, ''.match, ''.matchAll, ''.normalize, ''.padEnd, ''.padStart, ''.repeat, ''.replace, ''.replaceAll, ''.search, ''.slice, ''.small, ''.split, ''.startsWith, ''.strike, ''.sub, ''.substr, ''.substring, ''.sup, ''.toLocaleLowerCase, ''.toLocaleUpperCase, ''.toLowerCase, ''.toUpperCase, ''.toWellFormed, ''.trim, ''.trimEnd, ''.trimStart;
+''[0], ''[1], ''[-1], ''.invalid, ''.invalid, ''[[]], ''[0], ''.constructor, ''.__proto__, ''.__defineGetter__, ''.__defineSetter__, ''.__lookupGetter__, ''.__lookupSetter__, ''.hasOwnProperty, ''.isPrototypeOf, ''.propertyIsEnumerable, ''.toLocaleString, ''.toString, ''.valueOf, ''.anchor, ''.at, ''.big, ''.blink, ''.bold, ''.charAt, ''.charCodeAt, ''.codePointAt, ''.concat, ''.endsWith, ''.fixed, ''.fontcolor, ''.fontsize, ''.includes, ''.indexOf, ''.isWellFormed, ''.italics, ''.lastIndexOf, ''.link, ''.localeCompare, ''.match, ''.matchAll, ''.normalize, ''.padEnd, ''.padStart, ''.repeat, ''.replace, ''.replaceAll, ''.search, ''.slice, ''.small, ''.split, ''.startsWith, ''.strike, ''.sub, ''.substr, ''.substring, ''.sup
... [truncated]
```

## `swc/member_expr/undetermined_prop`

- size: oxc 28 vs reference 16 (+12 bytes)

```js
({ a: 1 })[undetermined()];

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-undetermined();
+({ a: 1 })[undetermined()];

```

## `swc/no-side-effect`

- size: oxc 126 vs reference 0 (+126 bytes)

```js
function fnA(args) {
	// ...
	const a = console.log('AAA');
	console.log(a);
}
const fnB = (args) => {
	// ...
	const b = console.log('BBB');
	console.log(b);
};
const fnC = (args) => {
	// ...
	const c = console.log('CCC');
	console.log(c);
};
/**
* Some jsdocs
*
* @__NO_SIDE_EFFECTS__
*/
const fnD = (args) => {
	// ...
	const d = console.log('DDD');
	console.log(d);
};
fnA();
fnA();
fnA();
fnA();
fnA();
fnA();
fnA();
fnA();
fnA();
fnA();
fnB();
fnB();
fnB();
fnB();
fnB();
fnB();
fnB();
fnB();
fnB();
fnB();
fnC();
fnC();
fnC();
fnC();
fnC();
fnC();
fnC();
fnC();
fnC();
fnC();
fnD();
fnD();
fnD();
fnD();
fnD();
fnD();
fnD();
fnD();
fnD();
fnD();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+const e = (e) => {
+	// ...
+	let t = console.log('DDD');
+	console.log(t);
+};
+e(), e(), e(), e(), e(), e(), e(), e(), e(), e();

```

## `swc/non-finite-number-literals`

- size: oxc 365 vs reference 318 (+47 bytes)

```js
globalThis.values = [
	NaN,
	Infinity,
	Number.NaN,
	Number.POSITIVE_INFINITY,
	Number.NEGATIVE_INFINITY,
	0 / 0,
	1 / 0,
	-1 / 0,
	1 / -0,
	Infinity / Infinity,
	1 % 0
];
globalThis.notNaN = !NaN;
if (NaN) {
	globalThis.directNaN = 'truthy';
} else {
	globalThis.directNaN = 'falsy';
}
globalThis.nanSubtraction = NaN - 1 ? 'truthy' : 'falsy';
globalThis.nanDivision = Infinity / Infinity ? 'truthy' : 'falsy';
globalThis.joined = [Infinity, '' + globalThis.value].join('');
switch (1 / 0) {
	case 1 / 0:
		globalThis.matched = true;
		break;
	default: globalThis.matched = false;
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,15 @@
-globalThis.values = [
-	0 / 0,
-	1 / 0,
-	0 / 0,
+switch (globalThis.values = [
+	NaN,
+	Infinity,
+	NaN,
+	Infinity,
+	-Infinity,
+	NaN,
 	1 / 0,
 	-1 / 0,
-	0 / 0,
-	1 / 0,
-	-1 / 0,
-	-1 / 0,
-	0 / 0,
-	0 / 0
-], globalThis.notNaN = !0, globalThis.directNaN = 'falsy', globalThis.nanSubtraction = 'falsy', globalThis.nanDivision = 'falsy', globalThis.joined = 'Infinity' + globalThis.value, globalThis.matched = !0;
+	-Infinity,
+	NaN,
+	NaN
+], globalThis.notNaN = !0, globalThis.directNaN = 'falsy', globalThis.nanSubtraction = 'falsy', globalThis.nanDivision = 'falsy', globalThis.joined = [Infinity, '' + globalThis.value].join(''), 1 / 0) {
+	case 1 / 0: globalThis.matched = !0;
+}

```

## `swc/pr/11446`

- size: oxc 65 vs reference 57 (+8 bytes)

```js
function f(a, b = a, c = b) {
	return c;
}
expect(f(3)).toBe(3);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-expect(function(b = 3, c = b) {
-	return c;
-}()).toBe(3);
+function e(e, t = e, n = t) {
+	return n;
+}
+expect(e(3)).toBe(3);

```

## `swc/pr/11814_class_effect_guards`

- size: oxc 375 vs reference 370 (+5 bytes)

```js
class KeepThis {
	static field = this.make();
}
class KeepSuper extends Base {
	static field = super.make();
}
class KeepSelfValue {
	static field = KeepSelfValue.make();
}
class KeepSelfBlock {
	static {
		KeepSelfBlock.make();
	}
}
class KeepPrivateInBlock {
	static #value;
	static {
		#value in getObject();
	}
}
class KeepPrivateAccessInBlock {
	static #value;
	static {
		getObject().#value;
	}
}
class KeepMultiStatementBlock {
	static {
		first();
		second();
	}
}
class KeepNonExpressionBlock {
	static {
		if (flag) effect();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,22 +1,36 @@
-class KeepThis {
+class e {
 	static field = this.make();
 }
-class KeepSuper extends Base {
+class t extends Base {
 	static field = super.make();
 }
-class KeepSelfValue {
-	static field = KeepSelfValue.make();
+class n {
+	static field = n.make();
+}
+class r {
+	static {
+		r.make();
+	}
+}
+class i {
+	static #e;
+	static {
+		#e in getObject();
+	}
+}
+class a {
+	static #e;
+	static {
+		getObject().#e;
+	}
 }
-class KeepSelfBlock {
+class o {
 	static {
-		KeepSelfBlock.make();
+		first(), second();
 	}
 }
-getObject();
-class KeepPrivateAccessInBlock {
-	static #value;
+class s {
 	static {
-		getObject().#value;
+		flag && effect();
 	}
 }
-first(), second(), flag && effect();

```

## `swc/pr/11814_class_effect_order`

- size: oxc 569 vs reference 368 (+201 bytes)

```js
class DeclarationOrder extends effect('decl:extends') {
	[effect('decl:method')]() {}
	static [effect('decl:static-key')] = effect('decl:static-value');
	[effect('decl:instance-key')] = effect('decl:instance-value');
	static #privateField = effect('decl:private-value');
	static {
		effect('decl:block');
	}
}
(class ExpressionOrder extends effect('expr:extends') {
	[effect('expr:method')]() {}
	static [effect('expr:static-key')] = effect('expr:static-value');
	[effect('expr:instance-key')] = effect('expr:instance-value');
	static #privateField = effect('expr:private-value');
	static {
		effect('expr:block');
	}
});

```

```diff
--- reference
+++ oxc
@@ -1 +1,18 @@
-effect('decl:extends'), effect('decl:method'), effect('decl:static-key'), effect('decl:instance-key'), effect('decl:static-value'), effect('decl:private-value'), effect('decl:block'), effect('expr:extends'), effect('expr:method'), effect('expr:static-key'), effect('expr:instance-key'), effect('expr:static-value'), effect('expr:private-value'), effect('expr:block');
+class e extends effect('decl:extends') {
+	[effect('decl:method')]() {}
+	static [effect('decl:static-key')] = effect('decl:static-value');
+	[effect('decl:instance-key')] = effect('decl:instance-value');
+	static #e = effect('decl:private-value');
+	static {
+		effect('decl:block');
+	}
+}
+(class extends effect('expr:extends') {
+	[effect('expr:method')]() {}
+	static [effect('expr:static-key')] = effect('expr:static-value');
+	[effect('expr:instance-key')] = effect('expr:instance-value');
+	static #e = effect('expr:private-value');
+	static {
+		effect('expr:block');
+	}
+});

```

## `swc/pr/6169/1`

- size: oxc 43 vs reference 24 (+19 bytes)

```js
var ref = ['foo'], key = ref[0], value = ref[1];
value.toUpperCase();

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-(void 0).toUpperCase();
+var e = ['foo'];
+e[0], e[1].toUpperCase();

```

## `swc/pr/7690`

- size: oxc 85 vs reference 44 (+41 bytes)

```js
export function foo() {
	const x = () => null;
	const y = () => x;
	console.log(y() === y());
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-export function foo() {
-	console.log(!0);
+export function e() {
+	let e = () => null, t = () => e;
+	console.log(t() === t());
 }

```

## `swc/pr/7856/1`

- size: oxc 40 vs reference 27 (+13 bytes)

```js
const a = () => '';
const b = {};
export const c = a;
b.c = c;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-export const c = () => '';
+const e = () => '';
+export const t = e;

```

## `swc/projects/backbone/11`

- size: oxc 169 vs reference 166 (+3 bytes)

```js
export const obj = { navigate: function(fragment, options) {
	if (!History.started) return false;
	if (!options || options === true) options = { trigger: !!options };
} };

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 export const obj = { navigate: function(fragment, options) {
 	if (!History.started) return !1;
-	options && !0 !== options || (options = { trigger: !!options });
+	(!options || options === !0) && (options = { trigger: !!options });
 } };

```

## `swc/projects/backbone/18`

- size: oxc 294 vs reference 289 (+5 bytes)

```js
export const obj = { _routeToRegExp: function(route) {
	route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function(match, optional) {
		return optional ? match : '([^/]+)';
	}).replace(splatParam, '(.*?)');
	return new RegExp('^' + route + '$');
} };

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 export const obj = { _routeToRegExp: function(route) {
-	return RegExp('^' + (route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function(match, optional) {
+	return route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function(match, optional) {
 		return optional ? match : '([^/]+)';
-	}).replace(splatParam, '(.*?)')) + '$');
+	}).replace(splatParam, '(.*?)'), RegExp('^' + route + '$');
 } };

```

## `swc/projects/backbone/3`

- size: oxc 54 vs reference 51 (+3 bytes)

```js
if (!name && !callback && !context) {
	console.log('foo');
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-name || callback || context || console.log('foo');
+!name && !callback && !context && console.log('foo');

```

## `swc/projects/backbone/9`

- size: oxc 589 vs reference 235 (+354 bytes)

```js
(function() {
	// Initial Setup
	// -------------
	// Save a reference to the global object (`window` in the browser, `exports`
	// on the server).
	var root = this;
	// Save the previous value of the `Backbone` variable, so that it can be
	// restored later on, if `noConflict` is used.
	var previousBackbone = root.Backbone;
	// Create local references to array methods we'll want to use later.
	var array = [];
	var push = array.push;
	var slice = array.slice;
	var splice = array.splice;
	// The top-level namespace. All public Backbone classes and modules will
	// be attached to this. Exported for both the browser and the server.
	var Backbone;
	if (typeof exports !== 'undefined') {
		Backbone = exports;
	} else {
		Backbone = root.Backbone = {};
	}
	// Current version of the library. Keep in sync with `package.json`.
	Backbone.VERSION = '1.1.0';
	// Require Underscore, if we're on the server, and it's not already present.
	var _ = root._;
	console.log(Backbone);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,15 @@
-!function() {
+(function() {
+	// Initial Setup
+	// -------------
+	// Save a reference to the global object (`window` in the browser, `exports`
+	// on the server).
+	var root = this;
+	root.Backbone;
 	// Create local references to array methods we'll want to use later.
-	var Backbone;
-	this.Backbone, (Backbone = 'u' > typeof exports ? exports : this.Backbone = {}).VERSION = '1.1.0', this._, console.log(Backbone);
-}();
+	var array = [];
+	array.push, array.slice, array.splice;
+	// The top-level namespace. All public Backbone classes and modules will
+	// be attached to this. Exported for both the browser and the server.
+	var Backbone = typeof exports < 'u' ? exports : root.Backbone = {};
+	Backbone.VERSION = '1.1.0', root._, console.log(Backbone);
+})();

```

## `swc/projects/jquery/.19`

- size: oxc 542 vs reference 484 (+58 bytes)

```js
// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch (e) {}
}
function createActiveXHR() {
	try {
		return new window.ActiveXObject('Microsoft.XMLHTTP');
	} catch (e) {}
}
// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
	return !this.isLocal && createStandardXHR() || createActiveXHR();
} : // For all other browsers, use the standard XMLHttpRequest object
createStandardXHR;

```

```diff
--- reference
+++ oxc
@@ -2,15 +2,16 @@
 function createStandardXHR() {
 	try {
 		return new window.XMLHttpRequest();
-	} catch (e) {}
+	} catch {}
 }
 function createActiveXHR() {
 	try {
 		return new window.ActiveXObject('Microsoft.XMLHTTP');
-	} catch (e) {}
+	} catch {}
 }
 // Create the request object
 // (This is still attached to ajaxSettings for backward compatibility)
 jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
 	return !this.isLocal && createStandardXHR() || createActiveXHR();
-} : createStandardXHR;
+} : // For all other browsers, use the standard XMLHttpRequest object
+createStandardXHR;

```

## `swc/projects/jquery/27`

- size: oxc 185 vs reference 184 (+1 bytes)

```js
if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), !jQuery.support.tbody) {
	console.log('Foo');
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), jQuery.support.tbody || console.log('Foo');
+!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), !jQuery.support.tbody && console.log('Foo');

```

## `swc/projects/jquery/3`

- size: oxc 572 vs reference 537 (+35 bytes)

```js
export const obj = { ready: function(wait) {
	// Abort if there are pending holds or we're already ready
	if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
		return;
	}
	// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
	if (!document.body) {
		return setTimeout(jQuery.ready);
	}
	// Remember that the DOM is ready
	jQuery.isReady = true;
	// If a normal DOM Ready event fired, decrement, and wait if need be
	if (wait !== true && --jQuery.readyWait > 0) {
		return;
	}
	// If there are functions bound, to execute
	readyList.resolveWith(document, [jQuery]);
	// Trigger any bound ready events
	if (jQuery.fn.trigger) {
		jQuery(document).trigger('ready').off('ready');
	}
} };

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 export const obj = { ready: function(wait) {
 	// Abort if there are pending holds or we're already ready
-	if (!(!0 === wait ? --jQuery.readyWait : jQuery.isReady)) {
+	if (!(wait === !0 ? --jQuery.readyWait : jQuery.isReady)) {
 		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
 		if (!document.body) return setTimeout(jQuery.ready);
-		// Remember that the DOM is ready
-		jQuery.isReady = !0, !(!0 !== wait && --jQuery.readyWait > 0) && (readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document).trigger('ready').off('ready'));
+		// If a normal DOM Ready event fired, decrement, and wait if need be
+		jQuery.isReady = !0, !(wait !== !0 && --jQuery.readyWait > 0) && (readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document).trigger('ready').off('ready'));
 	}
 } };

```

## `swc/projects/jquery/5`

- size: oxc 533 vs reference 462 (+71 bytes)

```js
export const obj = { each: function(obj, callback, args) {
	var value, i = 0, length = obj.length, isArray = isArraylike(obj);
	if (args) {
		if (isArray) {
			for (; i < length; i++) {
				value = callback.apply(obj[i], args);
				if (value === false) {
					break;
				}
			}
		} else {
			for (i in obj) {
				value = callback.apply(obj[i], args);
				if (value === false) {
					break;
				}
			}
		}
	} else {
		if (isArray) {
			for (; i < length; i++) {
				value = callback.call(obj[i], i, obj[i]);
				if (value === false) {
					break;
				}
			}
		} else {
			for (i in obj) {
				value = callback.call(obj[i], i, obj[i]);
				if (value === false) {
					break;
				}
			}
		}
	}
	return obj;
} };

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 export const obj = { each: function(obj, callback, args) {
-	var i = 0, length = obj.length, isArray = isArraylike(obj);
+	var value, i = 0, length = obj.length, isArray = isArraylike(obj);
 	if (args) {
-		if (isArray) for (; i < length && !1 !== callback.apply(obj[i], args); i++);
-		else for (i in obj) if (!1 === callback.apply(obj[i], args)) break;
-	} else if (isArray) for (; i < length && !1 !== callback.call(obj[i], i, obj[i]); i++);
-	else for (i in obj) if (!1 === callback.call(obj[i], i, obj[i])) break;
+		if (isArray) for (; i < length && (value = callback.apply(obj[i], args), value !== !1); i++);
+		else for (i in obj) if (value = callback.apply(obj[i], args), value === !1) break;
+	} else if (isArray) for (; i < length && (value = callback.call(obj[i], i, obj[i]), value !== !1); i++);
+	else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), value === !1) break;
 	return obj;
 } };

```

## `swc/projects/jquery/6`

- size: oxc 323 vs reference 285 (+38 bytes)

```js
export const obj = { inArray: function(elem, arr, i) {
	var len;
	if (arr) {
		if (core_indexOf) {
			return core_indexOf.call(arr, elem, i);
		}
		len = arr.length;
		i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
		for (; i < len; i++) {
			// Skip accessing in sparse arrays
			if (i in arr && arr[i] === elem) {
				return i;
			}
		}
	}
	return -1;
} };

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,9 @@
 	var len;
 	if (arr) {
 		if (core_indexOf) return core_indexOf.call(arr, elem, i);
-		for (len = arr.length, i = i ? i < 0 ? Math.max(0, len + i) : i : 0; i < len; i++) if (i in arr && arr[i] === elem) return i;
+		for (len = arr.length, i = i ? i < 0 ? Math.max(0, len + i) : i : 0; i < len; i++)
+ // Skip accessing in sparse arrays
+		if (i in arr && arr[i] === elem) return i;
 	}
 	return -1;
 } };

```

## `swc/projects/jquery/7`

- size: oxc 514 vs reference 509 (+5 bytes)

```js
export const obj = { proxy: function(fn, context) {
	var args, proxy, tmp;
	if (typeof context === 'string') {
		tmp = fn[context];
		context = fn;
		fn = tmp;
	}
	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if (!jQuery.isFunction(fn)) {
		return undefined;
	}
	// Simulated bind
	args = core_slice.call(arguments, 2);
	proxy = function() {
		return fn.apply(context || this, args.concat(core_slice.call(arguments)));
	};
	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	return proxy;
} };

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	var args, proxy, tmp;
 	// Quick check to determine if target is callable, in the spec
 	// this throws a TypeError, but we will just return undefined.
-	if ('string' == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn)) return args = core_slice.call(arguments, 2), (proxy = function() {
+	if (typeof context == 'string' && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn)) return args = core_slice.call(arguments, 2), proxy = function() {
 		return fn.apply(context || this, args.concat(core_slice.call(arguments)));
-	}).guid = fn.guid = fn.guid || jQuery.guid++, proxy;
+	}, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy;
 } };

```

## `swc/projects/mootools/10`

- size: oxc 287 vs reference 281 (+6 bytes)

```js
export const exported = { fireEvent: function(type, args, delay) {
	type = removeOn(type);
	var events = this.$events[type];
	if (!events) return this;
	args = Array.from(args);
	events.each(function(fn) {
		if (delay) fn.delay(delay, this, args);
		else fn.apply(this, args);
	}, this);
	return this;
} };

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 export const exported = { fireEvent: function(type, args, delay) {
 	type = removeOn(type);
 	var events = this.$events[type];
-	return events && (args = Array.from(args), events.each(function(fn) {
+	return events ? (args = Array.from(args), events.each(function(fn) {
 		delay ? fn.delay(delay, this, args) : fn.apply(this, args);
-	}, this)), this;
+	}, this), this) : this;
 } };

```

## `swc/projects/mootools/6`

- size: oxc 502 vs reference 497 (+5 bytes)

```js
export const obj = { removeEvents: function(events) {
	var type;
	if (typeOf(events) == 'object') {
		for (type in events) this.removeEvent(type, events[type]);
		return this;
	}
	var attached = this.retrieve('events');
	if (!attached) return this;
	if (!events) {
		for (type in attached) this.removeEvents(type);
		this.eliminate('events');
	} else if (attached[events]) {
		attached[events].keys.each(function(fn) {
			this.removeEvent(events, fn);
		}, this);
		delete attached[events];
	}
	return this;
} };

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 export const obj = { removeEvents: function(events) {
-	if ('object' == typeOf(events)) {
+	var type;
+	if (typeOf(events) == 'object') {
 		for (type in events) this.removeEvent(type, events[type]);
 		return this;
 	}
-	var type, attached = this.retrieve('events');
+	var attached = this.retrieve('events');
 	if (!attached) return this;
 	if (events) attached[events] && (attached[events].keys.each(function(fn) {
 		this.removeEvent(events, fn);

```

## `swc/projects/mootools/7`

- size: oxc 586 vs reference 578 (+8 bytes)

```js
export const exported = { toQueryString: function(object, base) {
	var queryString = [];
	Object.each(object, function(value, key) {
		if (base) key = base + '[' + key + ']';
		var result;
		switch (typeOf(value)) {
			case 'object':
				result = Object.toQueryString(value, key);
				break;
			case 'array':
				var qs = {};
				value.each(function(val, i) {
					qs[i] = val;
				});
				result = Object.toQueryString(qs, key);
				break;
			default: result = key + '=' + encodeURIComponent(value);
		}
		if (value != null) queryString.push(result);
	});
	return queryString.join('&');
} };

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,20 @@
 export const exported = { toQueryString: function(object, base) {
 	var queryString = [];
 	return Object.each(object, function(value, key) {
-		switch (base && (key = base + '[' + key + ']'), typeOf(value)) {
+		base && (key = base + '[' + key + ']');
+		var result;
+		switch (typeOf(value)) {
 			case 'object':
 				result = Object.toQueryString(value, key);
 				break;
 			case 'array':
-				var result, qs = {};
+				var qs = {};
 				value.each(function(val, i) {
 					qs[i] = val;
 				}), result = Object.toQueryString(qs, key);
 				break;
 			default: result = key + '=' + encodeURIComponent(value);
 		}
-		null != value && queryString.push(result);
+		value != null && queryString.push(result);
 	}), queryString.join('&');
 } };

```

## `swc/projects/mootools/8`

- size: oxc 1096 vs reference 1034 (+62 bytes)

```js
var Browser = window.Browser || {};
var setEngine = function(name, version) {
	Browser.Engine.name = name;
	Browser.Engine[name + version] = true;
	Browser.Engine.version = version;
};
if (Browser.ie) {
	Browser.Engine.trident = true;
	switch (Browser.version) {
		case 6:
			setEngine('trident', 4);
			break;
		case 7:
			setEngine('trident', 5);
			break;
		case 8: setEngine('trident', 6);
	}
}
if (Browser.firefox) {
	Browser.Engine.gecko = true;
	if (Browser.version >= 3) setEngine('gecko', 19);
	else setEngine('gecko', 18);
}
if (Browser.safari || Browser.chrome) {
	Browser.Engine.webkit = true;
	switch (Browser.version) {
		case 2:
			setEngine('webkit', 419);
			break;
		case 3:
			setEngine('webkit', 420);
			break;
		case 4: setEngine('webkit', 525);
	}
}
if (Browser.opera) {
	Browser.Engine.presto = true;
	if (Browser.version >= 9.6) setEngine('presto', 960);
	else if (Browser.version >= 9.5) setEngine('presto', 950);
	else setEngine('presto', 925);
}
if (Browser.name == 'unknown') {
	switch ((ua.match(/(?:webkit|khtml|gecko)/) || [])[0]) {
		case 'webkit':
		case 'khtml':
			Browser.Engine.webkit = true;
			break;
		case 'gecko': Browser.Engine.gecko = true;
	}
}

```

```diff
--- reference
+++ oxc
@@ -10,7 +10,7 @@
 		break;
 	case 8: setEngine('trident', 6);
 }
-if (Browser.firefox && (Browser.Engine.gecko = !0, setEngine('gecko', Browser.version >= 3 ? 19 : 18)), Browser.safari || Browser.chrome) switch (Browser.Engine.webkit = !0, Browser.version) {
+if (Browser.firefox && (Browser.Engine.gecko = !0, Browser.version >= 3 ? setEngine('gecko', 19) : setEngine('gecko', 18)), Browser.safari || Browser.chrome) switch (Browser.Engine.webkit = !0, Browser.version) {
 	case 2:
 		setEngine('webkit', 419);
 		break;
@@ -19,7 +19,7 @@
 		break;
 	case 4: setEngine('webkit', 525);
 }
-if (Browser.opera && (Browser.Engine.presto = !0, setEngine('presto', Browser.version >= 9.6 ? 960 : Browser.version >= 9.5 ? 950 : 925)), 'unknown' == Browser.name) switch ((ua.match(/(?:webkit|khtml|gecko)/) || [])[0]) {
+if (Browser.opera && (Browser.Engine.presto = !0, Browser.version >= 9.6 ? setEngine('presto', 960) : Browser.version >= 9.5 ? setEngine('presto', 950) : setEngine('presto', 925)), Browser.name == 'unknown') switch ((ua.match(/(?:webkit|khtml|gecko)/) || [])[0]) {
 	case 'webkit':
 	case 'khtml':
 		Browser.Engine.webkit = !0;

```

## `swc/projects/next/extra/if_return/1`

- size: oxc 390 vs reference 381 (+9 bytes)

```js
export function foo() {
	if (state.loading || state.error) return _react.default.createElement(opts.loading, {
		isLoading: state.loading,
		pastDelay: state.pastDelay,
		timedOut: state.timedOut,
		error: state.error,
		retry: subscription.retry
	});
	if (!state.loaded) return null;
	var obj;
	return _react.default.createElement((obj = state.loaded) && obj.__esModule ? obj.default : obj, props);
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,12 @@
-export function foo() {
-	var obj;
-	return state.loading || state.error ? _react.default.createElement(opts.loading, {
+export function e() {
+	if (state.loading || state.error) return _react.default.createElement(opts.loading, {
 		isLoading: state.loading,
 		pastDelay: state.pastDelay,
 		timedOut: state.timedOut,
 		error: state.error,
 		retry: subscription.retry
-	}) : state.loaded ? _react.default.createElement((obj = state.loaded) && obj.__esModule ? obj.default : obj, props) : null;
+	});
+	if (!state.loaded) return null;
+	var e;
+	return _react.default.createElement((e = state.loaded) && e.__esModule ? e.default : e, props);
 }

```

## `swc/projects/react/1`

- size: oxc 1144 vs reference 1143 (+1 bytes)

```js
(function() {
	if (typeof Symbol === 'function' && Symbol.for) {
		var symbolFor = Symbol.for;
		REACT_ELEMENT_TYPE = symbolFor('react.element');
		REACT_PORTAL_TYPE = symbolFor('react.portal');
		exports.Fragment = symbolFor('react.fragment');
		exports.StrictMode = symbolFor('react.strict_mode');
		exports.Profiler = symbolFor('react.profiler');
		REACT_PROVIDER_TYPE = symbolFor('react.provider');
		REACT_CONTEXT_TYPE = symbolFor('react.context');
		REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
		exports.Suspense = symbolFor('react.suspense');
		REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
		REACT_MEMO_TYPE = symbolFor('react.memo');
		REACT_LAZY_TYPE = symbolFor('react.lazy');
		REACT_BLOCK_TYPE = symbolFor('react.block');
		REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
		REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
		REACT_SCOPE_TYPE = symbolFor('react.scope');
		REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
		REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
		REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
		REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-!function() {
-	if ('function' == typeof Symbol && Symbol.for) {
+(function() {
+	if (typeof Symbol == 'function' && Symbol.for) {
 		var symbolFor = Symbol.for;
 		REACT_ELEMENT_TYPE = symbolFor('react.element'), REACT_PORTAL_TYPE = symbolFor('react.portal'), exports.Fragment = symbolFor('react.fragment'), exports.StrictMode = symbolFor('react.strict_mode'), exports.Profiler = symbolFor('react.profiler'), REACT_PROVIDER_TYPE = symbolFor('react.provider'), REACT_CONTEXT_TYPE = symbolFor('react.context'), REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref'), exports.Suspense = symbolFor('react.suspense'), REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list'), REACT_MEMO_TYPE = symbolFor('react.memo'), REACT_LAZY_TYPE = symbolFor('react.lazy'), REACT_BLOCK_TYPE = symbolFor('react.block'), REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block'), REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental'), REACT_SCOPE_TYPE = symbolFor('react.scope'), REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id'), REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode'), REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen'), REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
 	}
-}();
+})();

```

## `swc/projects/react/2`

- size: oxc 410 vs reference 382 (+28 bytes)

```js
(function() {
	{
		ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
			{
				currentExtraStackFrame = stack;
			}
		};
		ReactDebugCurrentFrame.getCurrentStack = null;
		ReactDebugCurrentFrame.getStackAddendum = function() {
			var stack = '';
			if (currentExtraStackFrame) {
				stack += currentExtraStackFrame;
			}
			var impl = ReactDebugCurrentFrame.getCurrentStack;
			if (impl) {
				stack += impl() || '';
			}
			return stack;
		};
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
-ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
-	currentExtraStackFrame = stack;
-}, ReactDebugCurrentFrame.getCurrentStack = null, ReactDebugCurrentFrame.getStackAddendum = function() {
-	var stack = '';
-	currentExtraStackFrame && (stack += currentExtraStackFrame);
-	var impl = ReactDebugCurrentFrame.getCurrentStack;
-	return impl && (stack += impl() || ''), stack;
-};
+(function() {
+	ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
+		currentExtraStackFrame = stack;
+	}, ReactDebugCurrentFrame.getCurrentStack = null, ReactDebugCurrentFrame.getStackAddendum = function() {
+		var stack = '';
+		currentExtraStackFrame && (stack += currentExtraStackFrame);
+		var impl = ReactDebugCurrentFrame.getCurrentStack;
+		return impl && (stack += impl() || ''), stack;
+	};
+})();

```

## `swc/projects/react/5`

- size: oxc 340 vs reference 326 (+14 bytes)

```js
var emptyObject = {};
{
	Object.freeze(emptyObject);
}
/**
* Base class helpers for the updating state of a component.
*/
function Component(props, context, updater) {
	this.props = props;
	this.context = context;
	this.refs = emptyObject;
	// renderer.
	this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
 var emptyObject = {};
+Object.freeze(emptyObject);
 /**
 * Base class helpers for the updating state of a component.
-*/ function Component(props, context, updater) {
+*/
+function Component(props, context, updater) {
+	// renderer.
 	this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
 }
-Object.freeze(emptyObject), Component.prototype.isReactComponent = {};
+Component.prototype.isReactComponent = {};

```

## `swc/projects/underscore/1`

- size: oxc 215 vs reference 213 (+2 bytes)

```js
_.contains = _.include = function(obj, target) {
	if (obj == null) return false;
	if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
	return any(obj, function(value) {
		return value === target;
	});
};

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 _.contains = _.include = function(obj, target) {
-	return null != obj && (nativeIndexOf && obj.indexOf === nativeIndexOf ? -1 != obj.indexOf(target) : any(obj, function(value) {
+	return obj == null ? !1 : nativeIndexOf && obj.indexOf === nativeIndexOf ? obj.indexOf(target) != -1 : any(obj, function(value) {
 		return value === target;
-	}));
+	});
 };

```

## `swc/projects/underscore/17`

- size: oxc 655 vs reference 577 (+78 bytes)

```js
export function foo() {
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
@@ -1,8 +1,10 @@
 export function foo() {
 	var size = 0, result = !0;
 	// Recursively compare objects and arrays.
-	if ('[object Array]' == className) {
-		if (result = (size = a.length) == b.length) for (; size-- && (result = eq(a[size], b[size], aStack, bStack)););
+	if (className == '[object Array]') {
+		if (size = a.length, result = size == b.length, result)
+ // Deep compare the contents, ignoring non-numeric properties.
+		for (; size-- && (result = eq(a[size], b[size], aStack, bStack)););
 	} else {
 		// Deep compare objects.
 		for (var key in a) if (_.has(a, key) && (size++, !(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack)))) break;

```

## `swc/projects/underscore/18`

- size: oxc 344 vs reference 335 (+9 bytes)

```js
_.sortedIndex = function(array, obj, iterator, context) {
	iterator = iterator == null ? _.identity : lookupIterator(iterator);
	var value = iterator.call(context, obj);
	var low = 0, high = array.length;
	while (low < high) {
		var mid = low + high >>> 1;
		iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
	}
	return low;
};

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 _.sortedIndex = function(array, obj, iterator, context) {
-	for (var value = (iterator = null == iterator ? _.identity : lookupIterator(iterator)).call(context, obj), low = 0, high = array.length; low < high;) {
+	iterator = iterator == null ? _.identity : lookupIterator(iterator);
+	for (var value = iterator.call(context, obj), low = 0, high = array.length; low < high;) {
 		var mid = low + high >>> 1;
 		iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
 	}

```

## `swc/projects/underscore/22`

- size: oxc 469 vs reference 461 (+8 bytes)

```js
_.indexOf = function(array, item, isSorted) {
	if (array == null) return -1;
	var i = 0, length = array.length;
	if (isSorted) {
		if (typeof isSorted == 'number') {
			i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
		} else {
			i = _.sortedIndex(array, item);
			return array[i] === item ? i : -1;
		}
	}
	if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
	for (; i < length; i++) if (array[i] === item) return i;
	return -1;
};

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 _.indexOf = function(array, item, isSorted) {
-	if (null == array) return -1;
+	if (array == null) return -1;
 	var i = 0, length = array.length;
-	if (isSorted) if ('number' != typeof isSorted) return i = _.sortedIndex(array, item), array[i] === item ? i : -1;
-	else i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
+	if (isSorted) {
+		if (typeof isSorted == 'number') i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
+		else return i = _.sortedIndex(array, item), array[i] === item ? i : -1;
+	}
 	if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
 	for (; i < length; i++) if (array[i] === item) return i;
 	return -1;

```

## `swc/projects/underscore/23`

- size: oxc 164 vs reference 158 (+6 bytes)

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
@@ -1,6 +1,6 @@
 _.once = function(func) {
-	var memo, ran = !1;
+	var ran = !1, memo;
 	return function() {
-		return ran || (ran = !0, memo = func.apply(this, arguments), func = null), memo;
+		return ran ? memo : (ran = !0, memo = func.apply(this, arguments), func = null, memo);
 	};
 };

```

## `swc/projects/underscore/24`

- size: oxc 142 vs reference 141 (+1 bytes)

```js
(function() {
	var idCounter = 0;
	_.uniqueId = function(prefix) {
		var id = ++idCounter + '';
		return prefix ? prefix + id : id;
	};
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-!function() {
+(function() {
 	var idCounter = 0;
 	_.uniqueId = function(prefix) {
 		var id = ++idCounter + '';
 		return prefix ? prefix + id : id;
 	};
-}();
+})();

```

## `swc/projects/underscore/3`

- size: oxc 492 vs reference 483 (+9 bytes)

```js
_.max = function(obj, iterator, context) {
	if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
		return Math.max.apply(Math, obj);
	}
	if (!iterator && _.isEmpty(obj)) return -Infinity;
	var result = {
		computed: -Infinity,
		value: -Infinity
	};
	each(obj, function(value, index, list) {
		var computed = iterator ? iterator.call(context, value, index, list) : value;
		computed > result.computed && (result = {
			value,
			computed
		});
	});
	return result.value;
};

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 _.max = function(obj, iterator, context) {
 	if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) return Math.max.apply(Math, obj);
-	if (!iterator && _.isEmpty(obj)) return -1 / 0;
+	if (!iterator && _.isEmpty(obj)) return -Infinity;
 	var result = {
-		computed: -1 / 0,
-		value: -1 / 0
+		computed: -Infinity,
+		value: -Infinity
 	};
 	return each(obj, function(value, index, list) {
 		var computed = iterator ? iterator.call(context, value, index, list) : value;

```

## `swc/projects/underscore/5`

- size: oxc 443 vs reference 441 (+2 bytes)

```js
_.uniq = _.unique = function(array, isSorted, iterator, context) {
	if (_.isFunction(isSorted)) {
		context = iterator;
		iterator = isSorted;
		isSorted = false;
	}
	var initial = iterator ? _.map(array, iterator, context) : array;
	var results = [];
	var seen = [];
	each(initial, function(value, index) {
		if (isSorted ? !index || seen[seen.length - 1] !== value : !_.contains(seen, value)) {
			seen.push(value);
			results.push(array[index]);
		}
	});
	return results;
};

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 	_.isFunction(isSorted) && (context = iterator, iterator = isSorted, isSorted = !1);
 	var initial = iterator ? _.map(array, iterator, context) : array, results = [], seen = [];
 	return each(initial, function(value, index) {
-		(isSorted ? index && seen[seen.length - 1] === value : _.contains(seen, value)) || (seen.push(value), results.push(array[index]));
+		(isSorted ? !index || seen[seen.length - 1] !== value : !_.contains(seen, value)) && (seen.push(value), results.push(array[index]));
 	}), results;
 };

```

## `swc/projects/underscore/6`

- size: oxc 469 vs reference 461 (+8 bytes)

```js
_.indexOf = function(array, item, isSorted) {
	if (array == null) return -1;
	var i = 0, length = array.length;
	if (isSorted) {
		if (typeof isSorted == 'number') {
			i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
		} else {
			i = _.sortedIndex(array, item);
			return array[i] === item ? i : -1;
		}
	}
	if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
	for (; i < length; i++) if (array[i] === item) return i;
	return -1;
};

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 _.indexOf = function(array, item, isSorted) {
-	if (null == array) return -1;
+	if (array == null) return -1;
 	var i = 0, length = array.length;
-	if (isSorted) if ('number' != typeof isSorted) return i = _.sortedIndex(array, item), array[i] === item ? i : -1;
-	else i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
+	if (isSorted) {
+		if (typeof isSorted == 'number') i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
+		else return i = _.sortedIndex(array, item), array[i] === item ? i : -1;
+	}
 	if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
 	for (; i < length; i++) if (array[i] === item) return i;
 	return -1;

```

## `swc/projects/underscore/9`

- size: oxc 164 vs reference 158 (+6 bytes)

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
@@ -1,6 +1,6 @@
 _.once = function(func) {
-	var memo, ran = !1;
+	var ran = !1, memo;
 	return function() {
-		return ran || (ran = !0, memo = func.apply(this, arguments), func = null), memo;
+		return ran ? memo : (ran = !0, memo = func.apply(this, arguments), func = null, memo);
 	};
 };

```

## `swc/projects/wmr/archive-1/chunks/alias-outside.6e8773c7`

- size: oxc 180 vs reference 155 (+25 bytes)

```js
import { m } from '../index.f66dda46.js';
const value$1 = 'it works';
const value = 'it works';
function AliasOutside() {
	return m`<div><p>Inside: ${value}</p><p>Outside: ${value$1}</p></div>`;
}
export default AliasOutside;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 import { m } from '../index.f66dda46.js';
-export default function() {
+function AliasOutside() {
 	return m`<div><p>Inside: ${'it works'}</p><p>Outside: ${'it works'}</p></div>`;
 }
-;
+export default AliasOutside;

```

## `swc/projects/wmr/archive-1/chunks/class-fields.43d5f69c`

- size: oxc 343 vs reference 320 (+23 bytes)

```js
import { _, m } from '../index.f66dda46.js';
class ClassFields extends _ {
	state = { value: 1 };
	onClick = () => {
		this.setState((prev) => ({ value: prev.value + 1 }));
	};
	render() {
		return m`<div><p> State: <span>${this.state.value}</span></p><button onClick=${this.onClick}>click me</button></div>`;
	}
}
export default ClassFields;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 import { _, m } from '../index.f66dda46.js';
-export default class extends _ {
+class ClassFields extends _ {
 	state = { value: 1 };
 	onClick = () => {
 		this.setState((prev) => ({ value: prev.value + 1 }));
@@ -8,4 +8,4 @@
 		return m`<div><p> State: <span>${this.state.value}</span></p><button onClick=${this.onClick}>click me</button></div>`;
 	}
 }
-;
+export default ClassFields;

```

## `swc/projects/wmr/archive-1/chunks/index.5a544c41`

- size: oxc 247 vs reference 234 (+13 bytes)

```js
import { m } from '../index.f66dda46.js';
const jpg = '/assets/img.2dae108d.jpg';
function Files() {
	return m`<div style="padding: 2rem;"><h1>Files</h1><p> jpg: ${jpg}<br/><img src=${jpg} alt="" height="320"/></p></div>`;
}
export default Files;

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 import { m } from '../index.f66dda46.js';
-let jpg = '/assets/img.2dae108d.jpg';
-export default function() {
+const jpg = '/assets/img.2dae108d.jpg';
+function Files() {
 	return m`<div style="padding: 2rem;"><h1>Files</h1><p> jpg: ${jpg}<br/><img src=${jpg} alt="" height="320"/></p></div>`;
 }
-;
+export default Files;

```

## `swc/projects/wmr/archive-1/chunks/index.bf24abaa`

- size: oxc 452 vs reference 424 (+28 bytes)

```js
import { s as style, m } from '../index.f66dda46.js';
const process = {
	browser: true,
	env: {
		FOO: 'bar',
		OVERRIDE: '11',
		EMPTY: '',
		FOO_LOCAL: 'bar',
		NODE_ENV: 'production'
	}
};
null;
const foo = 42;
function Environment() {
	return m`<table><thead><tr><th>Name ${foo}</th><th>Value</th></tr></thead><tbody>${Object.keys(process.env).sort().map((key) => {
		return m`<tr key=${key}><td>${key}</td><td>${String(process.env[key])}</td></tr>`;
	})}</tbody></table>`;
}
export { Environment };

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,15 @@
 import { m } from '../index.f66dda46.js';
-let process_env = {
-	FOO: 'bar',
-	OVERRIDE: '11',
-	EMPTY: '',
-	FOO_LOCAL: 'bar',
-	NODE_ENV: 'production'
+const process = {
+	browser: !0,
+	env: {
+		FOO: 'bar',
+		OVERRIDE: '11',
+		EMPTY: '',
+		FOO_LOCAL: 'bar',
+		NODE_ENV: 'production'
+	}
 };
 function Environment() {
-	return m`<table><thead><tr><th>Name ${42}</th><th>Value</th></tr></thead><tbody>${Object.keys(process_env).sort().map((key) => m`<tr key=${key}><td>${key}</td><td>${String(process_env[key])}</td></tr>`)}</tbody></table>`;
+	return m`<table><thead><tr><th>Name ${42}</th><th>Value</th></tr></thead><tbody>${Object.keys(process.env).sort().map((key) => m`<tr key=${key}><td>${key}</td><td>${String(process.env[key])}</td></tr>`)}</tbody></table>`;
 }
 export { Environment };

```

## `swc/projects/wmr/archive-1/chunks/index.ddc4110d`

- size: oxc 397 vs reference 346 (+51 bytes)

```js
import { s as style, y, m } from '../index.f66dda46.js';
null;
const styles = { about: 'about_migxty' };
function About({ query, title }) {
	y(() => {
		console.log('Mounted About: ', title);
		return () => {
			console.log('Unmounting About: ', title);
		};
	}, []);
	return m`<section class=${styles.about}><h1>${title || 'About'}</h1><p>My name is Jason.</p><pre>${JSON.stringify(query)}</pre></section>`;
}
export default About;

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 import { y, m } from '../index.f66dda46.js';
-export default function({ query, title }) {
+const styles = { about: 'about_migxty' };
+function About({ query, title }) {
 	return y(() => (console.log('Mounted About: ', title), () => {
 		console.log('Unmounting About: ', title);
-	}), []), m`<section class=${'about_migxty'}><h1>${title || 'About'}</h1><p>My name is Jason.</p><pre>${JSON.stringify(query)}</pre></section>`;
+	}), []), m`<section class=${styles.about}><h1>${title || 'About'}</h1><p>My name is Jason.</p><pre>${JSON.stringify(query)}</pre></section>`;
 }
-;
+export default About;

```

## `swc/projects/wmr/archive-1/chunks/json.5609c5fa`

- size: oxc 375 vs reference 373 (+2 bytes)

```js
import { a as l, y, m } from '../index.f66dda46.js';
const json = {
	foo: 42,
	bar: 'bar'
};
function JSONView() {
	const [fetched, setFetched] = l(null);
	y(() => {
		fetch('./pages/foo.json').then((r) => r.json()).then((r) => setFetched(r));
	}, []);
	return m`<div><p>import: ${JSON.stringify(json)}</p><p>fetch: ${JSON.stringify(fetched)}</p></div>`;
}
export { JSONView };

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 import { a as l, y, m } from '../index.f66dda46.js';
-let json = {
+const json = {
 	foo: 42,
 	bar: 'bar'
 };

```

## `swc/projects/wmr/archive-1/chunks/prerender.93c6f601`

- size: oxc 685 vs reference 615 (+70 bytes)

```js
import '../index.f66dda46.js';
import { t as toStatic } from './hoofd.module.6c5395cb.js';
function prerender$1(vnode, options) {
	return import('../prerender.daa73035/input.js').then((m) => m.default(vnode, options));
}
async function prerender(vnode) {
	const res = await prerender$1(vnode);
	const head = toStatic();
	const elements = new Set([
		...head.links.map((props) => ({
			type: 'link',
			props
		})),
		...head.metas.map((props) => ({
			type: 'meta',
			props
		})),
		...head.scripts.map((props) => ({
			type: 'script',
			props
		}))
	]);
	return {
		...res,
		data: { hello: 'world' },
		head: {
			title: head.title,
			lang: head.lang,
			elements
		}
	};
}
export { prerender };

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
 import '../index.f66dda46.js';
 import { t as toStatic } from './hoofd.module.6c5395cb.js';
+function prerender$1(vnode, options) {
+	return import('../prerender.daa73035/input.js').then((m) => m.default(vnode, options));
+}
 async function prerender(vnode) {
-	let res = await import('../prerender.daa73035/input.js').then((m) => m.default(vnode, void 0)), head = toStatic(), elements = new Set([
+	let res = await prerender$1(vnode), head = toStatic(), elements = new Set([
 		...head.links.map((props) => ({
 			type: 'link',
 			props

```

## `swc/projects/yui/10`

- size: oxc 157 vs reference 151 (+6 bytes)

```js
export var _path = function(dir, file, type, nomin) {
	var path = dir + '/' + file;
	if (!nomin) {
		path += '-min';
	}
	path += '.' + (type || CSS);
	return path;
};

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 export var _path = function(dir, file, type, nomin) {
 	var path = dir + '/' + file;
-	return nomin || (path += '-min'), path += '.' + (type || CSS);
+	return nomin || (path += '-min'), path += '.' + (type || CSS), path;
 };

```

## `swc/projects/yui/11`

- size: oxc 67 vs reference 64 (+3 bytes)

```js
export function foo() {
	return src = src || '', void 0 !== src;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 export function foo() {
-	return void 0 !== (src = src || '');
+	return src = src || '', src !== void 0;
 }

```

## `swc/projects/yui/14`

- size: oxc 450 vs reference 436 (+14 bytes)

```js
YArray.indexOf = Lang._isNative(Native.indexOf) ? function(array, value, from) {
	return Native.indexOf.call(array, value, from);
} : function(array, value, from) {
	// http://es5.github.com/#x15.4.4.14
	var len = array.length;
	from = +from || 0;
	from = (from > 0 || -1) * Math.floor(Math.abs(from));
	if (from < 0) {
		from += len;
		if (from < 0) {
			from = 0;
		}
	}
	for (; from < len; ++from) {
		if (from in array && array[from] === value) {
			return from;
		}
	}
	return -1;
};

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 } : function(array, value, from) {
 	// http://es5.github.com/#x15.4.4.14
 	var len = array.length;
-	for ((from = ((from = +from || 0) > 0 || -1) * Math.floor(Math.abs(from))) < 0 && (from += len) < 0 && (from = 0); from < len; ++from) if (from in array && array[from] === value) return from;
+	for (from = +from || 0, from = (from > 0 || -1) * Math.floor(Math.abs(from)), from < 0 && (from += len, from < 0 && (from = 0)); from < len; ++from) if (from in array && array[from] === value) return from;
 	return -1;
 };

```

## `swc/projects/yui/8`

- size: oxc 322 vs reference 309 (+13 bytes)

```js
export const E = { _onProgress: function(e) {
	var self = this, i;
	//set the internal cache to what just came in.
	if (e.data && e.data.length) {
		for (i = 0; i < e.data.length; i++) {
			e.data[i] = self.getModule(e.data[i].name);
		}
	}
	if (self.onProgress) {
		self.onProgress.call(self.context, {
			name: e.url,
			data: e.data
		});
	}
} };

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 export const E = { _onProgress: function(e) {
-	var i;
+	var self = this, i;
 	//set the internal cache to what just came in.
-	if (e.data && e.data.length) for (i = 0; i < e.data.length; i++) e.data[i] = this.getModule(e.data[i].name);
-	this.onProgress && this.onProgress.call(this.context, {
+	if (e.data && e.data.length) for (i = 0; i < e.data.length; i++) e.data[i] = self.getModule(e.data[i].name);
+	self.onProgress && self.onProgress.call(self.context, {
 		name: e.url,
 		data: e.data
 	});

```

## `swc/projects/yui/9`

- size: oxc 582 vs reference 552 (+30 bytes)

```js
export const E = { _addLangPack: function(lang, m, packName) {
	var name = m.name, packPath, conf, existing = this.moduleInfo[packName];
	if (!existing) {
		packPath = _path(m.pkg || name, packName, JS, true);
		conf = {
			path: packPath,
			intl: true,
			langPack: true,
			ext: m.ext,
			group: m.group,
			supersedes: []
		};
		if (m.root) {
			conf.root = m.root;
		}
		if (m.base) {
			conf.base = m.base;
		}
		if (m.configFn) {
			conf.configFn = m.configFn;
		}
		this.addModule(conf, packName);
		if (lang) {
			Y.Env.lang = Y.Env.lang || {};
			Y.Env.lang[lang] = Y.Env.lang[lang] || {};
			Y.Env.lang[lang][name] = true;
		}
	}
	return this.moduleInfo[packName];
} };

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 export const E = { _addLangPack: function(lang, m, packName) {
-	var conf, name = m.name;
-	return !this.moduleInfo[packName] && (conf = {
-		path: _path(m.pkg || name, packName, JS, !0),
+	var name = m.name, packPath, conf;
+	return this.moduleInfo[packName] || (packPath = _path(m.pkg || name, packName, JS, !0), conf = {
+		path: packPath,
 		intl: !0,
 		langPack: !0,
 		ext: m.ext,

```

## `swc/simple/block/.0001`

- size: oxc 116 vs reference 113 (+3 bytes)

```js
do {
	if (g--, h--, 0 > h || e[g] !== f[h]) return '\n' + e[g].replace(' at new ', ' at ');
} while (1 <= g && 0 <= h);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 do
-	if (g--, 0 > --h || e[g] !== f[h]) return '\n' + e[g].replace(' at new ', ' at ');
+	if (g--, h--, 0 > h || e[g] !== f[h]) return '\n' + e[g].replace(' at new ', ' at ');
 while (1 <= g && 0 <= h);

```

## `swc/simple/if/var`

- size: oxc 70 vs reference 42 (+28 bytes)

```js
if (false) {
	var a = 123;
} else {
	console.log(a);
}
if (true) {
	console.log(b);
} else {
	var b = 123;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-var a, b;
-console.log(a), console.log(b);
+if (0) var a;
+else console.log(a);
+if (1) console.log(b);
+else var b;

```

## `swc/simple/inline/1`

- size: oxc 70 vs reference 17 (+53 bytes)

```js
const A = 10, B = 5;
function mod(dividend, divisor) {
	return (dividend % divisor + divisor) % divisor;
}
console.log(mod(A, A + B));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(10);
+function e(e, t) {
+	return (e % t + t) % t;
+}
+console.log(e(10, 15));

```

## `swc/simple/inline/2`

- size: oxc 71 vs reference 45 (+26 bytes)

```js
var a = 1;
h();
function h() {
	(function g() {
		a-- && g();
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-var a = 1;
-!function g() {
-	a-- && g();
-}();
+var e = 1;
+t();
+function t() {
+	(function t() {
+		e-- && t();
+	})();
+}

```

## `swc/simple/inline/3`

- size: oxc 90 vs reference 73 (+17 bytes)

```js
function foo(x) {
	bar(x);
}
function bar(x) {
	if (x === 1) {
		throw new Error();
	}
}
foo(3);
foo(2);
foo(1);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-function bar(x) {
-	if (1 === x) throw Error();
+function e(e) {
+	t(e);
 }
-bar(3), bar(2), bar(1);
+function t(e) {
+	if (e === 1) throw Error();
+}
+e(3), e(2), e(1);

```

## `swc/simple/inline/4`

- size: oxc 221 vs reference 171 (+50 bytes)

```js
function $parcel$export(a, b, c) {
	a[b] = c;
}
$parcel$export(module.exports, 'A', function() {
	return A;
});
$parcel$export(module.exports, 'B', function() {
	return B;
});
$parcel$export(module.exports, 'C', function() {
	return C;
});
const A = 'A', B = 'B', C = 'C';

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,11 @@
-module.exports.A = function() {
-	return A;
-}, module.exports.B = function() {
-	return B;
-}, module.exports.C = function() {
-	return C;
-};
-const A = 'A', B = 'B', C = 'C';
+function e(e, t, n) {
+	e[t] = n;
+}
+e(module.exports, 'A', function() {
+	return t;
+}), e(module.exports, 'B', function() {
+	return n;
+}), e(module.exports, 'C', function() {
+	return r;
+});
+const t = 'A', n = 'B', r = 'C';

```

## `swc/simple/sequences/.0001`

- size: oxc 8 vs reference 5 (+3 bytes)

```js
h--, 0 > h;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
---h;
+h--, h;

```

## `swc/simple/switch/const/call`

- size: oxc 46 vs reference 33 (+13 bytes)

```js
switch (a()) {
	case a(): console.log(123);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-a() === a() && console.log(123);
+switch (a()) {
+	case a(): console.log(123);
+}

```

## `swc/simple/switch/const/order`

- size: oxc 120 vs reference 49 (+71 bytes)

```js
switch (1) {
	case a():
		console.log(111);
		break;
	case 1:
		console.log(222);
		break;
	case 2: console.log(333);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-1 === a() ? console.log(111) : console.log(222);
+switch (1) {
+	case a():
+		console.log(111);
+		break;
+	case 1:
+		console.log(222);
+		break;
+	case 2: console.log(333);
+}

```

## `swc/simple/switch/merge/simple`

- size: oxc 113 vs reference 86 (+27 bytes)

```js
switch (a) {
	case 1:
		console.log(1);
		break;
	case 2:
		console.log(2);
		break;
	default: console.log(1);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 switch (a) {
 	case 1:
-	default:
 		console.log(1);
 		break;
-	case 2: console.log(2);
+	case 2:
+		console.log(2);
+		break;
+	default: console.log(1);
 }

```

