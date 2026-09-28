# swc / larger — Output longer than expected (possible missing optimization)

Fixtures: 273

[← swc](README.md) · [← all families](../README.md)

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
+(function(e, i) {
 	// "_" rename to another name also reproduce
 	var _ = ((i = {})[n.NONE] = { platform: a.NONE }, i);
 	e.getPlatform = function() {
 		// "_" should not be removed
 		console.log(_[t.toString()]);
 	};
-}();
+})();

```

## `swc/issues/6141`

- size: oxc 160 vs reference 159 (+1 bytes)

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
@@ -1,4 +1,4 @@
-!function foo(obj) {
+(function foo(obj) {
 	if (obj) {
 		for (let key in obj) {
 			let element = obj[key];
@@ -7,4 +7,4 @@
 		return !0;
 	}
 	return !1;
-}();
+})();

```

## `swc/issues/7412`

- size: oxc 212 vs reference 211 (+1 bytes)

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
@@ -1,7 +1,7 @@
 export function throttleTime(interval) {
 	let currentValue, timeout;
 	return (done) => (value) => {
-		currentValue = value, timeout || (timeout = setTimeout(() => {
+		currentValue = value, !timeout && (timeout = setTimeout(() => {
 			done(currentValue);
 		}, interval));
 	};

```

## `swc/issues/7784/3`

- size: oxc 124 vs reference 123 (+1 bytes)

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
@@ -2,5 +2,5 @@
 	function g() {
 		return i++, e || 0;
 	}
-	return e = g(), cmp(i, e) && console.log(e), g;
+	return e = g(e), cmp(i, e) && console.log(e), g;
 }

```

## `swc/issues/8826`

- size: oxc 263 vs reference 262 (+1 bytes)

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
 export function createTypeChecker(host) {
-	return { getFlowTypeOfReference: function(reference, declaredType, initialType = declaredType, flowContainer, flowNode = ((_a2) => null == (_a2 = tryCast(reference, canHaveFlowNode)) ? void 0 : _a2.flowNode)()) {} };
+	return { getFlowTypeOfReference };
+	function getFlowTypeOfReference(reference, declaredType, initialType = declaredType, flowContainer, flowNode = ((_a2) => (_a2 = tryCast(reference, canHaveFlowNode))?.flowNode)()) {}
 }

```

## `swc/issues/vercel/003`

- size: oxc 748 vs reference 747 (+1 bytes)

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
@@ -1,10 +1,24 @@
 import { a, b } from './utils';
-'u' > typeof window && require('intersection-observer');
-let manager = function() {
+typeof window < 'u' && require('intersection-observer');
+const manager = (function() {
 	let c = new Map();
+	function d(e) {
+		return f(e) || new IntersectionObserver(g, e);
+	}
+	function f(g = {}) {
+		let h = b(g);
+		for (let i of c.keys()) if (a(i, h)) return i;
+		return null;
+	}
 	function j(k) {
 		return c.has(k) ? c.get(k) : c.set(k, new Map()).get(k);
 	}
+	function l(m, n, o) {
+		j(m).set(n, o), m.observe(n);
+	}
+	function q(r, s) {
+		j(r).delete(s), r.unobserve(s);
+	}
 	function g(u, v) {
 		for (let w of u) {
 			let y = j(v).get(w.target);
@@ -12,21 +26,11 @@
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
+		d,
+		l,
+		q
 	};
-}();
+})();
 export default manager;
 export const { d } = manager;
 export const { l } = manager;

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

## `swc/projects/next/archive-1/916.2317bfea2c41354132bd`

- size: oxc 525 vs reference 524 (+1 bytes)

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
@@ -6,4 +6,5 @@
 	/* harmony default export */ __webpack_exports__.default = function() {
 		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 1' });
 	};
-	/***/} }]);
+	/***/
+} }]);

```

## `swc/projects/next/archive-1/974.b9fed4786fc6d4a5745d`

- size: oxc 525 vs reference 524 (+1 bytes)

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
@@ -6,4 +6,5 @@
 	/* harmony default export */ __webpack_exports__.default = function() {
 		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 1' });
 	};
-	/***/} }]);
+	/***/
+} }]);

```

## `swc/projects/next/archive-1/hello-world.1af1130392dd1b8d7964`

- size: oxc 527 vs reference 526 (+1 bytes)

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
@@ -6,4 +6,5 @@
 	/* harmony default export */ __webpack_exports__.default = function() {
 		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', { children: 'test chunkfilename' });
 	};
-	/***/} }]);
+	/***/
+} }]);

```

## `swc/projects/next/archive-1/hello1.4066327636ea41cc1002`

- size: oxc 520 vs reference 519 (+1 bytes)

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
@@ -6,4 +6,5 @@
 	/* harmony default export */ __webpack_exports__.default = function() {
 		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 1' });
 	};
-	/***/} }]);
+	/***/
+} }]);

```

## `swc/projects/next/archive-1/hello2.339fbf9b6616133531f3`

- size: oxc 520 vs reference 519 (+1 bytes)

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
@@ -6,4 +6,5 @@
 	/* harmony default export */ __webpack_exports__.default = function() {
 		return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', { children: 'Hello World 2' });
 	};
-	/***/} }]);
+	/***/
+} }]);

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

## `swc/issues/10824`

- size: oxc 199 vs reference 197 (+2 bytes)

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
@@ -7,6 +7,6 @@
 		this.b += i;
 	};
 }
-let a1 = new A(1), a2 = new A(2);
-a1.c(), console.assert(2 === a1.b), console.assert(2 === a2.b);
+const a1 = new A(1), a2 = new A(2);
+a1.c(), console.assert(a1.b === 2), console.assert(a2.b === 2);
 export {};

```

## `swc/issues/11512-exhaustive/iife-anon-first-default-unused`

- size: oxc 116 vs reference 114 (+2 bytes)

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
 export function iifeAnonFirstDefaultUnused(value) {
-	return function(a = 1, b) {
+	return (function(a = 1, b) {
 		return b;
-	}(void 0, value);
+	})(void 0, value);
 }

```

## `swc/issues/11512-exhaustive/iife-default-ref-prev`

- size: oxc 100 vs reference 98 (+2 bytes)

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
 export function iifeDefaultRefPrev(value) {
-	return function(a, b = a) {
+	return (function(a, b = a) {
 		return a;
-	}(value);
+	})(value);
 }

```

## `swc/issues/11512-exhaustive/iife-default-used`

- size: oxc 97 vs reference 95 (+2 bytes)

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
 export function iifeDefaultUsed(value) {
-	return function(a, b = 1) {
+	return (function(a, b = 1) {
 		return b;
-	}(value);
+	})(value);
 }

```

## `swc/issues/11512-exhaustive/iife-named-default-length`

- size: oxc 133 vs reference 131 (+2 bytes)

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
 export function iifeNamedDefaultLength(value) {
-	return function named(a = 1, b) {
+	return (function named(a = 1, b) {
 		return named.length + b;
-	}(void 0, value);
+	})(void 0, value);
 }

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
 let f = (a) => a;
-f &&= (a, b) => b;
-console.log(f(1, 2));
+f &&= ((a, b) => b), console.log(f(1, 2));

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
+console.log((function(a) {
 	for (var a of [1]) break;
 	return a;
-}(2));
+})(2));

```

## `swc/issues/7783/1`

- size: oxc 168 vs reference 166 (+2 bytes)

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
 export default function Home() {
 	return React.createElement('div', null, foo.a);
 }
-let foo = {
+const foo = {
 	get a() {
 		return `a ${this.b}`;
 	},

```

## `swc/issues/8907`

- size: oxc 68 vs reference 66 (+2 bytes)

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
@@ -1,4 +1,4 @@
-let used = forwardRef(
+const used = forwardRef(
 	/* harden */
 	Foo
 );

```

## `swc/issues/8974`

- size: oxc 102 vs reference 100 (+2 bytes)

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
@@ -1,4 +1,4 @@
-let one = {
+const one = {
 	kind: 'Document',
 	definitions: [],
 	loc: {}

```

## `swc/issues/vercel/002`

- size: oxc 125 vs reference 123 (+2 bytes)

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
+const globalStyles = new String(':root {--a-b:4px}');
 globalStyles.__hash = '34c3f159e306f9e9';
 export default globalStyles;

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
 function f(a) {
 	return a;
 }
-console.log(f(1));
+console.log(f(1, 2));

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
 export var a;
-for (var a of [0]) console.log(a = 1);
+for (var a of [0]) a = 1, console.log(a);

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
@@ -1,4 +1,4 @@
-const [, , c, , ,] = [
+const [a, b, c, d, e] = [
 	1,
 	2,
 	3,

```

## `swc/issues/8718/7`

- size: oxc 54 vs reference 51 (+3 bytes)

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
 export function foo(a) {
-	return a += 1, a += 2;
+	return a += 1, a += 2, a;
 }

```

## `swc/issues/arguments-parameter-injection-size`

- size: oxc 134 vs reference 131 (+3 bytes)

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
+(function(zero, one) {
+	console.log(arguments[20], arguments[20], arguments[4294967295], arguments['4294967295']);
+})('zero', 'one');

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

## `swc/issues/8626`

- size: oxc 54 vs reference 50 (+4 bytes)

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
 export function foo(cb) {
 	cb();
 }
-foo(() => !0);
+foo((a, b) => !0);

```

## `swc/issues/9263`

- size: oxc 112 vs reference 108 (+4 bytes)

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
+const k = (function() {
 	var x = 42;
 	for (var x in [4242]) break;
 	return x;
-}();
+})();
 export { k };

```

## `swc/issues/5955`

- size: oxc 198 vs reference 193 (+5 bytes)

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
@@ -1,8 +1,9 @@
 export var foo;
 export function init() {
-	return function bar() {
+	function bar() {
 		foo = bar, console.log(111);
-	};
+	}
+	return bar;
 }
 function bar() {
 	foo = bar, console.log(111);

```

## `swc/issues/7749`

- size: oxc 102 vs reference 97 (+5 bytes)

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
 let depth = 0;
-blackbox(function(n) {
+function foo(n) {
 	depth += 1;
 	let k = visit(n);
-	return depth -= 1, k;
-});
+	return --depth, k;
+}
+blackbox(foo);

```

## `swc/issues/8622`

- size: oxc 173 vs reference 168 (+5 bytes)

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
 export function foo(e) {
 	let reserved = 1;
-	return e && (reserved = 2), [reserved, function(e) {
-		let reserved = 1;
-		return e && (reserved = 2), reserved;
-	}(e)];
+	return e && (reserved = 2), [reserved, bar(e)];
+}
+function bar(e) {
+	let reserved = 1;
+	return e && (reserved = 2), reserved;
 }

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
 this.test = function(a) {
-	return !(a < 0) ^ (a < 0) << 8;
+	return (0 | !(a < 0)) ^ (a < 0) << 8;
 };

```

## `swc/issues/11512-exhaustive/fn-multi-use-default-unused`

- size: oxc 123 vs reference 117 (+6 bytes)

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
@@ -2,5 +2,5 @@
 	return a;
 }
 export function fnMultiUseDefaultUnused(value) {
-	return value + (value + 1);
+	return id(value) + id(value + 1);
 }

```

## `swc/issues/11684/scopes-and-mutations`

- size: oxc 1399 vs reference 1393 (+6 bytes)

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
@@ -3,21 +3,24 @@
 		this.value = value;
 	}
 }
+out.Global = Global, out.global = new Global(1, 2, 3);
 function constructUnknown(Global) {
 	return new Global(1, 2, 3);
 }
+out.constructUnknown = constructUnknown;
 function constructLocal() {
 	class Global {
 		constructor(first, second) {
 			this.first = first, this.second = second;
 		}
 	}
-	return out.Local = Global, new Global(1, 2);
+	return out.Local = Global, new Global(1, 2, 3, 4);
 }
-out.Global = Global, out.global = new Global(1, 2, 3), out.constructUnknown = constructUnknown, out.constructLocal = constructLocal;
+out.constructLocal = constructLocal;
 class MutableClass {}
+condition && (MutableClass = ExternalClass), out.MutableClass = MutableClass, out.mutableClass = new MutableClass(1, 2, 3);
 function MutableFunction() {}
-condition && (MutableClass = ExternalClass), out.MutableClass = MutableClass, out.mutableClass = new MutableClass(1, 2, 3), condition && (MutableFunction = ExternalFunction), out.MutableFunction = MutableFunction, out.mutableFunction = new MutableFunction(1, 2, 3);
+condition && (MutableFunction = ExternalFunction), out.MutableFunction = MutableFunction, out.mutableFunction = new MutableFunction(1, 2, 3);
 var DifferentArity = function(value) {
 	this.value = value;
 };
@@ -27,12 +30,13 @@
 var SameArity = function(value) {
 	this.value = value;
 };
+condition && (SameArity = class {
+	constructor(value) {
+		this.value = value;
+	}
+}), out.SameArity = SameArity, out.sameArity = new SameArity(1, 2, 3);
 function constructAfterEval() {
 	class EvalMutable {}
 	ret
... [truncated]
```

## `swc/issues/6407/1`

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

## `swc/issues/firebase/2`

- size: oxc 432 vs reference 426 (+6 bytes)

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
 export function treeSubTree(tree, pathObj) {
 	// TODO: Require pathObj to be Path?
 	let path = pathObj instanceof Path ? pathObj : new Path(pathObj), child = tree, next = pathGetFront(path);
-	for (; null !== next;) {
+	for (; next !== null;) {
 		let childNode = safeGet(child.node.children, next) || {
 			children: {},
 			childCount: 0
 		};
-		child = new Tree(next, child, childNode), next = pathGetFront(path = pathPopFront(path));
+		child = new Tree(next, child, childNode), path = pathPopFront(path), next = pathGetFront(path);
 	}
 	return child;
 }

```

## `swc/issues/non-finite-conditional-arithmetic`

- size: oxc 371 vs reference 365 (+6 bytes)

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
@@ -3,8 +3,8 @@
 }
 function test(flag) {
 	console.log([
-		flag ? 1 / 0 : 0,
-		flag ? 0 : 1 / 0,
+		flag ? Infinity : 0,
+		flag ? 0 : Infinity,
 		flag ? 1 : -0,
 		flag ? -0 : 1
 	].map(classify).join(','));

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
+for (let a of [0]) a = 1, console.log(a);

```

## `swc/issues/11089`

- size: oxc 66 vs reference 58 (+8 bytes)

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
 let k = 0;
 const fn = () => console.log(k++);
-fn(), fn();
+fn('Hi'), fn('Hi');

```

## `swc/issues/11684/preserved`

- size: oxc 1298 vs reference 1290 (+8 bytes)

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
+})(1, 2, 3), out.fnDefaultArguments = new (function(value = arguments[1]) {
 	this.value = value;
-}(void 0, 'fallback', 'extra'), out.fnEval = new function() {
+})(void 0, 'fallback', 'extra'), out.fnEval = new (function() {
 	eval('this.count = arguments.length');
-}(1, 2, 3), out.fnRest = new function(...values1) {
-	this.count = values1.length;
-}(1, 2, 3), out.fnSpread = new function() {
+})(1, 2, 3), out.fnRest = new (function(...values) {
+	this.count = values.length;
+})(1, 2, 3), out.fnSpread = new (function() {
 	this.kind = 'spread';
-}(...values, 1), out.classArguments = new class {
+})(...values, 1), out.classArguments = new class {
 	constructor() {
 		this.count = arguments.length;
 	}
@@ -27,8 +27,8 @@
 		eval('this.count = arguments.length');
 	}
 }(1, 2, 3), out.classRest = new class {
-	constructor(...values1) {
-		this.count = values1.length;
+	constructor(...values) {
+		this.count = values.length;
 	}
 }(1, 2, 3), out.classSpread = new class {
 	constructor() {

```

## `swc/issues/11829`

- size: oxc 200 vs reference 192 (+8 bytes)

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
+function run(options) {
 	let { cb } = options;
-	cb || (cb = () => !0), cb('value');
-}({ cb(value) {
-	if (void 0 === value) throw Error('missing argument');
+	return cb ||= () => !0, cb('value');
+}
+run({ cb(value) {
+	if (value === void 0) throw Error('missing argument');
 	return console.log('PASS'), !0;
 } });

```

## `swc/issues/2319/1`

- size: oxc 204 vs reference 196 (+8 bytes)

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
+function foo(l, r) {
 	var lightGreeting;
 	if (l > 0) var greeting = 'hello';
 	else var greeting = 'howdy';
 	return r > 0 && (lightGreeting = greeting.substr(0, 2)), lightGreeting;
-};
+}
+module.exports = foo;

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

## `swc/issues/6463`

- size: oxc 75 vs reference 67 (+8 bytes)

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
+var foo_1 = foo;
+function foo() {
 	console.log('foo');
-};
+}
 foo_1(), foo_1();

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
+function f(a, b = a, c = b) {
 	return c;
-}()).toBe(3);
+}
+expect(f(3)).toBe(3);

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

## `swc/issues/10816`

- size: oxc 174 vs reference 164 (+10 bytes)

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
+class A {
 	fromArrow() {
 		console.log('hello');
 	}
 	foobar() {
 		let callMe = () => this.fromArrow();
-		return function() {
+		function B() {
 			callMe();
-		};
+		}
+		return B;
 	}
-}().foobar()();
+}
+new A().foobar()();

```

## `swc/issues/10938`

- size: oxc 37 vs reference 27 (+10 bytes)

```js
let Number;
console.log(Number.NaN);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log((void 0).NaN);
+let Number;
+console.log(Number.NaN);

```

## `swc/issues/11684/bindings`

- size: oxc 715 vs reference 705 (+10 bytes)

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
 const FunctionBinding = function(value) {
 	this.value = value;
 };
-out.FunctionBinding = FunctionBinding, out.functionBinding = new FunctionBinding(1);
+out.FunctionBinding = FunctionBinding, out.functionBinding = new FunctionBinding(1, 2, 3);
 let ClassBinding = class {
 	constructor(value) {
 		this.value = value;
 	}
 };
-out.ClassBinding = ClassBinding, out.classBinding = new ClassBinding(1), AssignedFunction = function(first, second) {
+out.ClassBinding = ClassBinding, out.classBinding = new ClassBinding(1, 2, 3);
+let AssignedFunction = function(first, second) {
 	this.first = first, this.second = second;
-}, out.AssignedFunction = AssignedFunction, out.assignedFunction = new AssignedFunction(1, 2), AssignedClass = class {
+};
+out.AssignedFunction = AssignedFunction, out.assignedFunction = new AssignedFunction(1, 2, 3, 4);
+let AssignedClass;
+AssignedClass = class {
 	constructor(first, second) {
 		this.first = first, this.second = second;
 	}
-}, out.AssignedClass = AssignedClass, out.assignedClass = new AssignedClass(1, 2);
+}, out.AssignedClass = AssignedClass, out.assignedClass = new AssignedClass(1, 2, 3, 4);

```

## `swc/issues/9186/1`

- size: oxc 164 vs reference 154 (+10 bytes)

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
+	foo(val = this.s) {
+		return val;
 	},
 	s: 'test'
-}).foo().length);
+}, console.log(o.foo().length);

```

## `swc/issues/9610-nested-defaults`

- size: oxc 556 vs reference 546 (+10 bytes)

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
@@ -12,7 +12,7 @@
 	return a.b;
 }
 // Array inside object with default
-function qux({ arr: [first, ,] }) {
+function qux({ arr: [first, second = 40] }) {
 	return first;
 }
 export function example() {

```

## `swc/issues/10721`

- size: oxc 109 vs reference 98 (+11 bytes)

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
+var tmp = { b1: { b11: 'world' } }.b1, b11 = (tmp === void 0 ? { b11: 'string' } : tmp).b11;
 export { b11 };

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
+var a = z();
+g(a);

```

## `swc/issues/drop-console-es2015`

- size: oxc 216 vs reference 205 (+11 bytes)

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
+const err = console.error.bind(console);
+err('boom'), process.stdout.write(typeof err + '\n');
+let threw = !1;
 try {
-	new ((() => {}).bind())();
-} catch (e) {
-	threw = true;
+	new (console.error.bind(console))();
+} catch {
+	threw = !0;
 }
 process.stdout.write(threw + '\n');

```

## `swc/issues/11684/identifier-reduce-vars-only`

- size: oxc 267 vs reference 255 (+12 bytes)

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
 function FunctionCtor(value) {
 	this.value = value;
 }
-out.FunctionCtor = FunctionCtor;
-out.functionCtor = new FunctionCtor(1);
+out.FunctionCtor = FunctionCtor, out.functionCtor = new FunctionCtor(1, 2, 3);
 class ClassCtor {
 	constructor(value) {
 		this.value = value;
 	}
 }
-out.ClassCtor = ClassCtor;
-out.classCtor = new ClassCtor(1);
+out.ClassCtor = ClassCtor, out.classCtor = new ClassCtor(1, 2, 3);

```

## `swc/issues/11684/identifier-unused-only`

- size: oxc 267 vs reference 255 (+12 bytes)

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
 function FunctionCtor(value) {
 	this.value = value;
 }
-out.FunctionCtor = FunctionCtor;
-out.functionCtor = new FunctionCtor(1);
+out.FunctionCtor = FunctionCtor, out.functionCtor = new FunctionCtor(1, 2, 3);
 class ClassCtor {
 	constructor(value) {
 		this.value = value;
 	}
 }
-out.ClassCtor = ClassCtor;
-out.classCtor = new ClassCtor(1);
+out.ClassCtor = ClassCtor, out.classCtor = new ClassCtor(1, 2, 3);

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

## `swc/next/36127/2/1`

- size: oxc 436 vs reference 424 (+12 bytes)

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
+export function regexCheck(regex) {
+	return check;
+	/**
 	* Check whether a code matches the bound regex.
 	*
 	* @param {Code} code Character code
 	* @returns {code is number} Whether the character code matches the bound regex
-	*/ function(code) {
-		return null !== code && regex.test(String.fromCharCode(code));
-	});
+	*/
+	function check(code) {
+		return code !== null && regex.test(String.fromCharCode(code));
+	}
 }

```

## `swc/next/36127/2/2`

- size: oxc 749 vs reference 737 (+12 bytes)

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
+function regexCheck(regex) {
+	return check;
+	/**
 	* Check whether a code matches the bound regex.
 	*
 	* @param {Code} code Character code
 	* @returns {code is number} Whether the character code matches the bound regex
-	*/ function(code) {
-		return null !== code && regex.test(String.fromCharCode(code));
-	});
+	*/
+	function check(code) {
+		return code !== null && regex.test(String.fromCharCode(code));
+	}
 }
 console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo')), console.log(regexCheck('Foo'));

```

## `swc/issues/10281`

- size: oxc 177 vs reference 164 (+13 bytes)

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
 export function bitwise1(a, b) {
-	return a & b;
+	return a & b | 0;
 }
 export function bitwise2(a) {
-	return ~a;
+	return ~a | 0;
 }
 export function bitwise3(a, b) {
-	console.log((a ^= b) | b, a & b);
+	a ^= b | 0, console.log(a | b, a & b);
 }

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
@@ -1,8 +1,9 @@
+function f() {
+	let h = i({ onCancel: () => h() });
+}
 function g(x, v) {
-	if ('a' === x) {
-		let h;
-		h = i({ onCancel: () => h() });
-	} else {
+	if (x === 'a') f(v);
+	else {
 		class A {}
 		console.log(A, A);
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

## `swc/issues/9610-destructuring`

- size: oxc 643 vs reference 630 (+13 bytes)

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
@@ -8,7 +8,7 @@
 	return a + b;
 }
 // Array destructuring with default - unused
-function baz([a, ,]) {
+function baz([a, b = 30]) {
 	return a;
 }
 // Array destructuring with default - used
@@ -16,7 +16,7 @@
 	return a + b;
 }
 // Combined: regular param and destructuring with defaults
-function combined(x, { a, b = 50 }) {
+function combined(x, { a, b = 50 }, c = 60) {
 	return x + a;
 }
 export function example() {

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
+const a = () => '';
+export const c = a;

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

## `swc/issues/11545`

- size: oxc 225 vs reference 211 (+14 bytes)

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
 function joinArrayWithUndefined(bool) {
 	return ['abc', bool ? void 0 : 'def'].join('');
 }
-console.log(joinArrayWithUndefined(true));
-console.log(joinArrayWithUndefined(false));
-const x = 'abc';
+console.log(joinArrayWithUndefined(!0));
+console.log(joinArrayWithUndefined(!1));
+const x = ['abc', void 0].join('');
 console.log(x);

```

## `swc/issues/6422/1`

- size: oxc 323 vs reference 309 (+14 bytes)

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
+let getter_effect = 'FAIL', setter_effect = 'FAIL', proto = {
 	get foo() {
 		getter_effect = 'PASS';
 	},
 	set bar(value) {
 		setter_effect = 'PASS';
 	}
-};
-({ __proto__: proto }).foo;
-({ __proto__: proto }).bar = 0;
-assert.strictEqual(getter_effect, 'PASS');
-assert.strictEqual(setter_effect, 'PASS');
+}, obj1 = { __proto__: proto }, obj2 = { __proto__: proto };
+obj1.foo, obj2.bar = 0, assert.strictEqual(getter_effect, 'PASS'), assert.strictEqual(setter_effect, 'PASS');

```

## `swc/next/feedback-1/reduced/1`

- size: oxc 332 vs reference 318 (+14 bytes)

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
 export function getInsertStringLength(a, e, t, i) {
 	var r = a.mask, o = a.maskChar, n = t.split(''), s = i;
 	return n.every(function(e) {
-		for (var t; isPermanentCharacter(a, t = i) && e !== r[t];) if (++i >= r.length) return !1;
+		for (; n = e, isPermanentCharacter(a, t = i) && n !== r[t];) if (++i >= r.length) return !1;
+		var t, n;
 		return (isAllowedCharacter(a, i, e) || e === o) && i++, i < r.length;
 	}), i - s;
 }

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
+})('test');
 class A {}
-g.foo = A, n = new A();
+g.foo = A, n = new A(1, 2, 3);

```

## `swc/issues/12128`

- size: oxc 184 vs reference 169 (+15 bytes)

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
+for (var callback, _loop = function() {
 	var value = callback;
 	return value ? 'break' : callback = function() {
 		return value;
 	};
-}(););
+}; _loop() !== 'break';);
 console.log(callback());

```

## `swc/issues/9610-side-effects`

- size: oxc 681 vs reference 666 (+15 bytes)

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
@@ -9,7 +9,7 @@
 	return a;
 }
 // This SHOULD have the default param removed because literal has no side effects
-function bar(a) {
+function bar(a, b = 'literal') {
 	return a;
 }
 // This should NOT have the default param removed because new Date() has side effects

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

## `swc/issues/2926/1`

- size: oxc 201 vs reference 185 (+16 bytes)

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
 export var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
-	/******/ var runtime = data[2];
+	/******/
+	var runtime = data[2];
 	//......
-	runtime && runtime(__webpack_require__);
+	if (runtime) var result = runtime(__webpack_require__);
 	// return result
 };

```

## `swc/issues/9030`

- size: oxc 294 vs reference 278 (+16 bytes)

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
+var FRUITS = { MANGO: 'mango' }, getMangoLabel = (label) => label[FRUITS.MANGO];
+export default (name) => {
 	// Breaks with switch case
-	if (name === FRUITS_MANGO) return getMangoLabel;
+	switch (name) {
+		case FRUITS.MANGO: return getMangoLabel;
+	}
 	// Works with if else
 	// if (name === FRUITS.MANGO) {
 	//     return getMangoLabel;
 	// }
-});
+};

```

## `swc/issues/11368`

- size: oxc 728 vs reference 711 (+17 bytes)

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
+*/
+const wrap = (cb) => () => cb();
+class Base {
 	constructor(props) {
 		this.props = props;
 	}
 }
 class C extends Base {
-	fn = ((cb) => () => cb())(this.props.cb);
+	fn = wrap(this.props.cb);
 }
 // Test
 const a = new C({ cb: () => 'A' });
 new C({ cb: () => 'B' });
 const result = a.fn();
-console.log('A' === result ? 'OK: got A' : 'BUG: expected A, got ' + result);
+console.log(result === 'A' ? 'OK: got A' : 'BUG: expected A, got ' + result);

```

## `swc/issues/11970`

- size: oxc 135 vs reference 118 (+17 bytes)

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
 export async function classify(code) {
 	switch (code) {
-		case '66':
+		case '66': return 1;
+		case '0': break;
 		default: return 1;
-		case '0':
 	}
 	return 2;
 }

```

## `swc/issues/8465`

- size: oxc 70 vs reference 53 (+17 bytes)

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
+function Infinity() {
 	console.log('xxx');
 }
-;
+export default Infinity;

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

## `swc/issues/5846`

- size: oxc 686 vs reference 668 (+18 bytes)

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
@@ -1,17 +1,17 @@
-!function processNode(node, index, parent, pathNodes) {
+function processNode(node, index, parent, pathNodes) {
 	let children = node ? node[mergeChildrenPropName] : dataNodes, pos = node ? getPosition(parent.pos, index) : '0', connectNodes = node ? [...pathNodes, node] : [];
 	// Process node if is not root
 	if (node) {
-		let key = syntheticGetKey(node, pos);
-		callback({
+		let data = {
 			node,
 			index,
 			pos,
-			key,
+			key: syntheticGetKey(node, pos),
 			parentPos: parent.node ? parent.pos : null,
 			level: parent.level + 1,
 			nodes: connectNodes
-		});
+		};
+		callback(data);
 	}
 	// Process children node
 	children && children.forEach((subNode, subIndex) => {
@@ -21,4 +21,5 @@
 			level: parent ? parent.level + 1 : -1
 		}, connectNodes);
 	});
-}(null);
+}
+processNode(null);

```

## `swc/issues/6864`

- size: oxc 536 vs reference 518 (+18 bytes)

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
@@ -3,11 +3,11 @@
 		if (_.includes(entry, id)) return indexOfIdToRemove = index, entry;
 	});
 	if (!row) return matrix;
-	if (1 === row.length) {
-		if (2 === (newMatrix = _.without(matrix, row))[0].length) {
+	if (row.length === 1) {
+		if (newMatrix = _.without(matrix, row), newMatrix[0].length === 2) {
 			let remainingEntry = newMatrix[0];
 			newMatrix = [[remainingEntry[0]], [remainingEntry[1]]];
 		}
-	} else (newMatrix = [...matrix])[indexOfIdToRemove] = _.without(row, id);
+	} else newMatrix = [...matrix], newMatrix[indexOfIdToRemove] = _.without(row, id);
 	return newMatrix || matrix;
 }

```

## `swc/issues/arguments-canonical-index`

- size: oxc 189 vs reference 170 (+19 bytes)

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
+(function(zero, one) {
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

## `swc/issues/11257`

- size: oxc 125 vs reference 105 (+20 bytes)

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
 import { v1 } from 'a';
-import { v2, v3 } from 'b';
+import { v2 } from 'b';
+import { v3 } from 'b';
 import { v4 } from 'c';
 console.log(v1, v2, v3, v4);

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

## `swc/projects/next/extra/if_return/1`

- size: oxc 402 vs reference 381 (+21 bytes)

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
 export function foo() {
-	var obj;
-	return state.loading || state.error ? _react.default.createElement(opts.loading, {
+	if (state.loading || state.error) return _react.default.createElement(opts.loading, {
 		isLoading: state.loading,
 		pastDelay: state.pastDelay,
 		timedOut: state.timedOut,
 		error: state.error,
 		retry: subscription.retry
-	}) : state.loaded ? _react.default.createElement((obj = state.loaded) && obj.__esModule ? obj.default : obj, props) : null;
+	});
+	if (!state.loaded) return null;
+	var obj;
+	return _react.default.createElement((obj = state.loaded) && obj.__esModule ? obj.default : obj, props);
 }

```

## `swc/reduced/3`

- size: oxc 218 vs reference 197 (+21 bytes)

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
 var element = jqLite(element);
-if (element.injector()) throw ngMinErr('btstrpd', 'App Already Bootstrapped with this Element \'{0}\'', element[0] === document ? 'document' : startingTag(element));
+if (element.injector()) {
+	var tag = element[0] === document ? 'document' : startingTag(element);
+	throw ngMinErr('btstrpd', 'App Already Bootstrapped with this Element \'{0}\'', tag);
+}

```

## `swc/issues/11684/class-expression`

- size: oxc 352 vs reference 330 (+22 bytes)

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
+}(1, 2), out.one = new class {
 	constructor(value) {
 		this.value = value;
 	}
-}(1), out.destructured = new class {
+}(1, 2, 3), out.destructured = new class {
 	constructor({ value }) {
 		this.value = value;
 	}
-}({ value: 1 }), out.derived = new class extends Base {
+}({ value: 1 }, 2, 3), out.derived = new class extends Base {
 	constructor(value) {
 		super(value);
 	}
-}(1);
+}(1, 2, 3);

```

## `swc/issues/11684/function-expression`

- size: oxc 218 vs reference 196 (+22 bytes)

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
+})(1, 2), out.one = new (function(value) {
 	this.value = value;
-}(1), out.destructured = new function({ value }) {
+})(1, 2, 3), out.destructured = new (function({ value }) {
 	this.value = value;
-}({ value: 1 });
+})({ value: 1 }, 2, 3);

```

## `swc/issues/4386/2`

- size: oxc 374 vs reference 352 (+22 bytes)

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
+	var __webpack_require__ = {};
+	__webpack_require__.d = (exports, definition) => {}, __webpack_require__.o = (obj, prop) => {}, __webpack_require__.r = (exports) => {};
+	var __webpack_exports__ = {};
+	__webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, { bootstrap: () => bootstrap });
+	function bootstrap() {
+		alert();
+	}
+})();

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

## `swc/issues/9610`

- size: oxc 231 vs reference 209 (+22 bytes)

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
@@ -1,13 +1,13 @@
 function x(x) {
 	return x;
 }
-function y(x) {
+function y(x, y, z) {
 	return x;
 }
 function abc(a) {
 	return x(a);
 }
-function abc2(a) {
+function abc2(a, x, z = 'hello') {
 	return y(a);
 }
 export function example() {

```

## `swc/issues/next-97517`

- size: oxc 243 vs reference 221 (+22 bytes)

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
+module.exports = [50708, (context) => {
 	'use strict';
-	r.s([
+	var join = (left, right) => left + right;
+	context.s([
 		'run',
 		0,
-		(r) => (r.map((r) => {
-			let e;
-			return e = r.g, e + r.r;
-		}), r.map((r) => (e) => {
-			let t;
-			return t = r.g, t + e.l;
-		}))
+		(rows) => (rows.map((row) => join(row.g, row.r)), rows.map((row) => (item) => join(row.g, item.l)))
 	], 42519);
 }];

```

## `swc/issues/react-countup/2`

- size: oxc 653 vs reference 631 (+22 bytes)

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
 export function formatNumber(t) {
-	var a, n, e, o = (Math.abs(t).toFixed(s.options.decimalPlaces) + '').split('.');
+	var i, a, n, e, r = t < 0 ? '-' : '';
+	i = Math.abs(t).toFixed(s.options.decimalPlaces);
+	var o = (i += '').split('.');
 	if (a = o[0], n = o.length > 1 ? s.options.decimal + o[1] : '', s.options.useGrouping) {
 		e = '';
-		for (var l = 0, h = a.length; l < h; ++l) 0 !== l && l % 3 == 0 && (e = s.options.separator + e), e = a[h - l - 1] + e;
+		for (var l = 0, h = a.length; l < h; ++l) l !== 0 && l % 3 == 0 && (e = s.options.separator + e), e = a[h - l - 1] + e;
 		a = e;
 	}
 	return s.options.numerals && s.options.numerals.length && (a = a.replace(/[0-9]/g, function(t) {
 		return s.options.numerals[+t];
 	}), n = n.replace(/[0-9]/g, function(t) {
 		return s.options.numerals[+t];
-	})), (t < 0 ? '-' : '') + s.options.prefix + a + n + s.options.suffix;
+	})), r + s.options.prefix + a + n + s.options.suffix;
 }

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

## `swc/issues/8737`

- size: oxc 90 vs reference 66 (+24 bytes)

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
+	var obj = { key: 'some string' }, b = () => (a, obj.key);
 	return () => b;
 });

```

## `swc/issues/8737/2`

- size: oxc 133 vs reference 109 (+24 bytes)

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
@@ -1,6 +1,6 @@
 d(function() {
-	var b = function() {
-		return a, 'some string';
+	var obj = { key: 'some string' }, b = function() {
+		return a, obj.key;
 	};
 	return function() {
 		return b;

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

## `swc/issues/react-instancesearch/001`

- size: oxc 646 vs reference 622 (+24 bytes)

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
@@ -9,10 +9,14 @@
 		}));
 	}
 	return {
-		registerWidget: (widget) => (widgets.push(widget), scheduleUpdate(), function() {
-			widgets.splice(widgets.indexOf(widget), 1), scheduleUpdate();
-		}),
+		registerWidget(widget) {
+			return widgets.push(widget), scheduleUpdate(), function() {
+				widgets.splice(widgets.indexOf(widget), 1), scheduleUpdate();
+			};
+		},
 		update: scheduleUpdate,
-		getWidgets: () => widgets
+		getWidgets() {
+			return widgets;
+		}
 	};
 }

```

## `swc/issues/11684/function-decl`

- size: oxc 501 vs reference 476 (+25 bytes)

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
 function Zero() {
 	this.kind = 'zero';
 }
+out.Zero = Zero, out.zero = new Zero(1, 2, 3);
 function One(value) {
 	this.value = value;
 }
+out.One = One, out.one = new One(1, 2, 3);
 function Destructured({ value }, other) {
 	this.value = value, this.other = other;
 }
+out.Destructured = Destructured, out.destructured = new Destructured({ value: 1 }, 2, 3, 4);
 function Default(value = 1, other) {
 	this.value = value, this.other = other;
 }
-out.Zero = Zero, out.zero = new Zero(), out.One = One, out.one = new One(1), out.Destructured = Destructured, out.destructured = new Destructured({ value: 1 }, 2), out.Default = Default, out.default = new Default(void 0, 2);
+out.Default = Default, out.default = new Default(void 0, 2, 3, 4);

```

## `swc/issues/7847`

- size: oxc 336 vs reference 311 (+25 bytes)

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
@@ -5,5 +5,8 @@
 }
 if (g()) {
 	var state, hasRequiredState;
-	console.log(requireState().getHighWaterMark()), console.log(requireState().getHighWaterMark());
+	let a = requireState();
+	console.log(a.getHighWaterMark());
+	let b = requireState();
+	console.log(b.getHighWaterMark());
 }

```

## `swc/pr/6169/1`

- size: oxc 49 vs reference 24 (+25 bytes)

```js
var ref = ['foo'], key = ref[0], value = ref[1];
value.toUpperCase();

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-(void 0).toUpperCase();
+var ref = ['foo'];
+ref[0], ref[1].toUpperCase();

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

## `swc/issues/4412`

- size: oxc 121 vs reference 95 (+26 bytes)

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
 export function foo(arg) {
-	if (arg === ENUM_VALUE) {
-		let { data } = arg;
-		call(data);
+	switch (arg) {
+		case ENUM_VALUE: {
+			let { data } = arg;
+			call(data);
+			break;
+		}
 	}
 }

```

## `swc/issues/7331/1`

- size: oxc 103 vs reference 77 (+26 bytes)

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
+	function foo(arg) {
+		var arg = arg.slice();
+		return arg;
+	}
+	foo([]);
 }

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
 let a;
-console.log(a = '123'), console.log((a += 1, a += 2));
+function f() {
+	a = '123', console.log(a);
+}
+f(), console.log((a += 1, a += 2));

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
+let a = 0;
+console.log((a += 1, a += 2));

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
+let a = 0;
+console.log((a += 1, a += 2));

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
+	var x;
+	return x;
+})());

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
+	class A {
+		cycle() {
+			return B;
+		}
 	}
-}
-class B {
-	cycle() {
-		return A;
+	class B {
+		cycle() {
+			return A;
+		}
 	}
-}
-sideEffectWith(A), sideEffectWith(A);
+	sideEffectWith(A), sideEffectWith(A);
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
+	class C {
+		cycle() {
+			return D;
+		}
 	}
-}
-class D {
-	cycle() {
-		return C;
+	class D {
+		cycle() {
+			return C;
+		}
 	}
-}
-sideEffectWith(C);
+	sideEffectWith(C);
+})();

```

## `swc/issues/react/hooks/1`

- size: oxc 444 vs reference 418 (+26 bytes)

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
@@ -3,6 +3,8 @@
 import { useProject } from '@swr/use-project';
 import useTeam from '@swr/use-team';
 export default function MyComp() {
-	var projectInfo = useProject(useRouter().query.project).data;
-	return useTeam().teamSlug, useProjectBranches(null == projectInfo ? void 0 : projectInfo.id).data, _jsx(_Fragment, {});
+	var projectName = useRouter().query.project, projectInfo = useProject(projectName).data;
+	useTeam().teamSlug;
+	var projectId = projectInfo?.id;
+	return useProjectBranches(projectId).data, _jsx(_Fragment, {});
 }

```

## `swc/issues/react/hooks/5`

- size: oxc 466 vs reference 440 (+26 bytes)

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
+function useHook1() {
+	let [v1, v1_set] = useState(void 0);
+	return useEffect(() => {
+		GLOBALS.get('const1') && GLOBALS.get('const2') ? v1_set(!0) : v1_set(!1);
+	}, []), v1;
+}
+function useHook2() {
+	let [a1, a1_set] = useState({});
+	return useEffect(() => {
+		a1_set(JSON.parse(GLOBALS.get(CONST1) || '{}'));
+	}, []), a1;
+}
 export function HeaderCTA() {
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
+	let varB = useHook2(), varA = useHook1();
+	return varA === void 0 ? null : varA ? use(varB.field) : pure();
 }

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
 var a = 1;
-!function g() {
-	a-- && g();
-}();
+h();
+function h() {
+	(function g() {
+		a-- && g();
+	})();
+}

```

## `swc/issues/11684/identifier-side-effects`

- size: oxc 588 vs reference 561 (+27 bytes)

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
 function FunctionCtor(value) {
 	this.value = value;
 }
-out.FunctionCtor = FunctionCtor, out.functionCtor = new FunctionCtor(effect('function-used'), effect('function-extra-a'), effect('function-extra-b'));
+out.FunctionCtor = FunctionCtor, out.functionCtor = new FunctionCtor(effect('function-used'), 1, effect('function-extra-a'), 2, effect('function-extra-b'));
 class ClassCtor {
 	constructor(value) {
 		this.value = value;
 	}
 }
+out.ClassCtor = ClassCtor, out.classCtor = new ClassCtor(effect('class-used'), 1, effect('class-extra-a'), 2, effect('class-extra-b'));
 function Zero() {
 	this.kind = 'zero';
 }
-out.ClassCtor = ClassCtor, out.classCtor = new ClassCtor(effect('class-used'), effect('class-extra-a'), effect('class-extra-b')), out.Zero = Zero, out.sequence = new Zero(effect('sequence')), out.conditional = new Zero(condition && effect('yes'));
+out.Zero = Zero, out.sequence = new Zero(1, effect('sequence'), 3), out.conditional = new Zero(1, condition ? effect('yes') : 2, 3);

```

## `swc/issues/7500`

- size: oxc 169 vs reference 142 (+27 bytes)

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
@@ -4,5 +4,6 @@
 	1
 ];
 module.exports = function() {
-	return globalArray[0] = globalArray[1] = globalArray[2] = 0, globalArray;
+	var localArray = globalArray;
+	return localArray[0] = localArray[1] = localArray[2] = 0, localArray;
 };

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
+export const k = (() => {
+	var x = x;
+	return x;
+})();

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

## `swc/issues/5693`

- size: oxc 175 vs reference 146 (+29 bytes)

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
 API.prototype._getIngestEndpoint = function(target) {
-	return '' + this.getBaseApiEndpoint() + this._dsnObject.projectId + '/' + target + '/';
+	var base = this.getBaseApiEndpoint(), dsn = this._dsnObject;
+	return '' + base + dsn.projectId + '/' + target + '/';
 };

```

## `swc/issues/6492/2`

- size: oxc 65 vs reference 36 (+29 bytes)

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
+const val = { key: 42 }.key.toString();
+console.log('val', val);

```

## `swc/issues/7739/1`

- size: oxc 230 vs reference 201 (+29 bytes)

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
@@ -2,4 +2,6 @@
 	minimumFractionDigits: 0,
 	maximumFractionDigits: 0
 };
-withCurrency && (formatterOpt.style = 'currency'), console.log(new Intl.NumberFormat('en', formatterOpt).format(amount));
+withCurrency && (formatterOpt.style = 'currency');
+const formatter = new Intl.NumberFormat('en', formatterOpt);
+console.log(formatter.format(amount));

```

## `swc/simple/inline/3`

- size: oxc 102 vs reference 73 (+29 bytes)

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
+function foo(x) {
+	bar(x);
+}
 function bar(x) {
-	if (1 === x) throw Error();
+	if (x === 1) throw Error();
 }
-bar(3), bar(2), bar(1);
+foo(3), foo(2), foo(1);

```

## `swc/issues/10876/3`

- size: oxc 211 vs reference 181 (+30 bytes)

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
+const createCounter = () => {
+	let count = 0;
+	return (numToAdd) => (count += numToAdd, count);
+};
+new class {
+	x = new class {
+		[createCounter()]() {
 			console.log('Hello, world!');
 		}
 	}();

```

## `swc/issues/6492/1`

- size: oxc 54 vs reference 24 (+30 bytes)

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
+const val = { key: 42 }.key;
+console.log('val', val);

```

## `swc/issues/6492/3`

- size: oxc 66 vs reference 36 (+30 bytes)

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
+const val = { key: 42 }.key?.toString();
+console.log('val', val);

```

## `swc/issues/6492/4`

- size: oxc 66 vs reference 36 (+30 bytes)

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
+const val = { key: 42 }.key?.toString();
+console.log('val', val);

```

## `swc/issues/9468`

- size: oxc 213 vs reference 183 (+30 bytes)

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
+function func1(arg1, arg2) {
+	return getX(arg1) + arg2;
+}
+function getX(x) {
+	return document.getElementById('eid').getAttribute(x);
 }
-console.log((t = getX('data-x'), getX(7) + t)), console.log((e = getX('data-y'), getX(7) + e));
+console.log(func1(7, getX('data-x'))), console.log(func1(7, getX('data-y')));

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

## `swc/issues/11684/side-effects`

- size: oxc 452 vs reference 421 (+31 bytes)

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
+out.fn = new (function(value) {
 	this.value = value;
-}(effect('used'), effect('fn-a'), effect('fn-b')), out.class = new class {
+})(effect('used'), 1, effect('fn-a'), 2, effect('fn-b')), out.class = new class {
 	constructor(value) {
 		this.value = value;
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

## `swc/issues/11983`

- size: oxc 98 vs reference 67 (+31 bytes)

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
+function f(w) {
+	return 300 / w;
+}
+const S = f(621);
 export function dyn(w) {
-	return 300 / w + S;
+	return f(w) + S;
 }

```

## `swc/issues/6279/1`

- size: oxc 95 vs reference 64 (+31 bytes)

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
+function run(str, r) {
+	let m;
+	for (; m = r.exec(str);) console.log(m);
+}
+run('abcda', /a/g);

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
+let a = 0;
+a = '', console.log((a += 1, a += 2));

```

## `swc/check/1`

- size: oxc 305 vs reference 273 (+32 bytes)

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
 let foobar = 'foo';
 export const foo = foobar;
-let foobarCopy = foobar += 'bar';
-foobar += 'foo', console.log(foobarCopy);
+foobar += 'bar';
+let foobarCopy = foobar;
+foobar += 'foo', console.log(foobarCopy), foobarCopy += 'Unused';
 // export function external1() {
 //     return internal() + foobar;
 // }

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
+class x {}
+const y = x, z = class {};
+console.log(typeof x), console.log(typeof y), console.log(typeof z), console.log('function');

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

## `swc/issues/11512-exhaustive/fn-multi-use-default-side-effect`

- size: oxc 201 vs reference 167 (+34 bytes)

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
@@ -1,5 +1,8 @@
 let sideCalls = 0;
-function keep(a, b = (sideCalls++, 1)) {
+function side() {
+	return sideCalls++, 1;
+}
+function keep(a, b = side()) {
 	return a;
 }
 export function fnMultiUseDefaultSideEffect(value) {

```

## `swc/issues/object-accessor-function-boundary`

- size: oxc 207 vs reference 173 (+34 bytes)

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
+function make(key) {
+	return {
+		get [key]() {
+			return key;
+		},
+		set [key](value = key) {
+			console.log(value);
+		}
+	};
+}
+const object = make('value');
 console.log(object.value), object.value = void 0;

```

## `swc/issues/5280`

- size: oxc 87 vs reference 52 (+35 bytes)

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
 export function source() {
-	console.log(6, 1, 1);
+	let c = 0, a = 1;
+	c += a, a += 5, console.log(a, c, c);
 }

```

## `swc/issues/vercel/004`

- size: oxc 607 vs reference 572 (+35 bytes)

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
+	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
+	return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ItemsList.__proto__ || Object.getPrototypeOf(ItemsList)).call.apply(_ref, [this].concat(args))), _this), _this.storeHighlightedItemReference = function(highlightedItem) {
+		_this.props.onHighlightedItemChange(highlightedItem === null ? null : highlightedItem.item);
+	}, _temp), _possibleConstructorReturn(_this, _ret);
 }

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

## `swc/issues/10054/for`

- size: oxc 128 vs reference 92 (+36 bytes)

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
+function test() {
 	for (var l = 0; i < 10; l++);
 	console.log('test');
+}
+window.a = [function() {
+	return test();
 }];

```

## `swc/issues/10054/if`

- size: oxc 131 vs reference 95 (+36 bytes)

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
+function test() {
+	if (navigator.userAgentData !== void 0) throw Error();
+}
 window.a = [function() {
-	if (void 0 !== navigator.userAgentData) throw Error();
+	return test();
 }];

```

## `swc/issues/11512-exhaustive/iife-default-side-effect`

- size: oxc 163 vs reference 127 (+36 bytes)

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
 let calls = 0;
+function side() {
+	return calls++, 1;
+}
 export function iifeDefaultSideEffect(value) {
-	return function(a, b = (calls++, 1)) {
+	return (function(a, b = side()) {
 		return a;
-	}(value);
+	})(value);
 }

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

## `swc/issues/11684/constructor-scopes`

- size: oxc 905 vs reference 867 (+38 bytes)

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
@@ -3,15 +3,16 @@
 		super(value);
 	}
 }
-out.ExplicitDerived = ExplicitDerived, out.explicitDerived = new ExplicitDerived(1);
+out.ExplicitDerived = ExplicitDerived, out.explicitDerived = new ExplicitDerived(1, 2, 3);
 class NestedFunctionArguments {
 	constructor(value) {
-		this.value = value, this.count = function() {
+		function count() {
 			return arguments.length;
-		}(1, 2, 3);
+		}
+		this.value = value, this.count = count(1, 2, 3);
 	}
 }
-out.NestedFunctionArguments = NestedFunctionArguments, out.nestedFunctionArguments = new NestedFunctionArguments(1);
+out.NestedFunctionArguments = NestedFunctionArguments, out.nestedFunctionArguments = new NestedFunctionArguments(1, 2, 3);
 class MethodArguments {
 	constructor(value) {
 		this.value = value;
@@ -20,10 +21,10 @@
 		return arguments.length;
 	}
 }
-out.MethodArguments = MethodArguments, out.methodArguments = new MethodArguments(1);
+out.MethodArguments = MethodArguments, out.methodArguments = new MethodArguments(1, 2, 3);
 class StructuredParameters {
 	constructor({ value }, other = 2) {
 		this.value = value, this.other = other;
 	}
 }
-out.StructuredParameters = StructuredParameters, out.structuredParameters = new StructuredParameters({ value: 1 }, void 0);
+out.StructuredParameters = StructuredParameters, out.structuredParameters = new StructuredParameters({ value: 1 }, void 0, 3, 4);

```

## `swc/issues/9148`

- size: oxc 237 vs reference 199 (+38 bytes)

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
+function foo() {
+	let obj = {
+		clear: function() {
+			console.log('clear');
+		},
+		start: function() {
+			let _this = this;
+			setTimeout(function() {
+				_this.clear();
+			});
+		}
+	};
+	return () => obj.start();
+}
+export default foo();

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

## `swc/issues/11512-exhaustive/iife-anon-default-unused`

- size: oxc 103 vs reference 64 (+39 bytes)

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
 export function iifeAnonDefaultUnused(value) {
-	return value;
+	return (function(a, b = 1) {
+		return a;
+	})(value);
 }

```

## `swc/issues/11512-exhaustive/iife-anon-arg-unused`

- size: oxc 102 vs reference 60 (+42 bytes)

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
 export function iifeAnonArgUnused(value) {
-	return value;
+	return (function(a, b = 1) {
+		return a;
+	})(value, 7);
 }

```

## `swc/issues/9610-mixed-params`

- size: oxc 878 vs reference 835 (+43 bytes)

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
@@ -4,11 +4,11 @@
 	return a + b + c;
 }
 // Only first param used, rest with defaults unused
-function firstUsed(a) {
+function firstUsed(a, b = 10, c = 20, d = 30) {
 	return a;
 }
 // Middle param unused
-function middleUnused(a, c = 20) {
+function middleUnused(a, b = 10, c = 20) {
 	return a + c;
 }
 // First param unused (but not with default)
@@ -17,11 +17,11 @@
 }
 // Param with default used, regular param at end unused
 // Note: trailing regular params after used default should be removable
-function trailingUnused(a, b = 10) {
+function trailingUnused(a, b = 10, c) {
 	return a + b;
 }
 // Rest parameter with default params before it
-function withRest(a, ...rest) {
+function withRest(a, b = 10, ...rest) {
 	return a + rest.length;
 }
 export function example() {

```

## `swc/pr/7690`

- size: oxc 87 vs reference 44 (+43 bytes)

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
 export function foo() {
-	console.log(!0);
+	let x = () => null, y = () => x;
+	console.log(y() === y());
 }

```

## `swc/issues/9504`

- size: oxc 837 vs reference 793 (+44 bytes)

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
@@ -5,12 +5,17 @@
 	}
 	if (caf(rafIndex), panStart && (rafIndex = raf(function() {
 		panUpdate(e);
-	})), '?' === moveDirectionExpected && (moveDirectionExpected = getMoveDirectionExpected()), moveDirectionExpected) {
+	})), moveDirectionExpected === '?' && (moveDirectionExpected = getMoveDirectionExpected()), moveDirectionExpected) {
 		!preventScroll && isTouchEvent(e) && (preventScroll = !0);
 		try {
 			e.type && events.emit(isTouchEvent(e) ? 'touchMove' : 'dragMove', info(e));
-		} catch (err) {}
+		} catch {}
 		var x = translateInit, dist = getDist(lastPosition, initPosition);
-		!horizontal || fixedWidth || autoWidth ? (x += dist, x += 'px') : (x += TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew) : 100 * dist / (viewport + gutter), x += '%'), container.style[transformAttr] = transformPrefix + x + transformPostfix;
+		if (!horizontal || fixedWidth || autoWidth) x += dist, x += 'px';
+		else {
+			var percentageX = TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew) : dist * 100 / (viewport + gutter);
+			x += percentageX, x += '%';
+		}
+		container.style[transformAttr] = transformPrefix + x + transformPostfix;
 	}
 }

```

## `swc/issues/8806`

- size: oxc 102 vs reference 57 (+45 bytes)

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
 function logTheNine() {
-	console.log(9);
+	((theThree, theNine) => {
+		console.log(theNine);
+	})(3, 9);
 }
 logTheNine();

```

## `swc/next/swc-4559`

- size: oxc 456 vs reference 411 (+45 bytes)

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
 /***/ 4816: /***/ function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
-	return Error(`MUI: \`<DataGrid pageSize={${props.pageSize}} />\` is not a valid prop.\nOnly page size below ${MAX_PAGE_SIZE} is available in the MIT version.\n\nYou need to upgrade to the DataGridPro component to unlock this feature.`);
+	'use strict';
+	return Error([
+		`MUI: \`<DataGrid pageSize={${props.pageSize}} />\` is not a valid prop.`,
+		`Only page size below ${MAX_PAGE_SIZE} is available in the MIT version.`,
+		'',
+		'You need to upgrade to the DataGridPro component to unlock this feature.'
+	].join('\n'));
 } }]);

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
+class A {
+	constructor() {}
+}
+console.log(new A(1, 2, 3), new A(4, 5, 6));
 class B {}
-console.log(new B(), new B());
+console.log(new B(1, 2, 3), new B(4, 5, 6));
 class C extends G {}
 console.log(new C(1, 2, 3), new C(4, 5, 6));

```

## `swc/issues/11730`

- size: oxc 97 vs reference 50 (+47 bytes)

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
+	class Dead extends Unknown {
+		m() {
+			Dead.x;
+		}
+	}
+	return 0;
 });

```

## `swc/issues/spread-primitives-void-call`

- size: oxc 215 vs reference 168 (+47 bytes)

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
+function foo() {
+	return 2;
+}
+console.log({
+	a: 1,
+	...void foo()
+});

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

## `swc/issues/5910/1`

- size: oxc 170 vs reference 122 (+48 bytes)

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
 export function fn1() {
 	let walkingIndex = 0;
-	return function() {
-		console.log(walkingIndex, walkingIndex += 1);
-	};
+	function fn2() {
+		let myIndex = walkingIndex;
+		walkingIndex += 1, console.log(myIndex, walkingIndex);
+	}
+	return fn2;
 }

```

## `swc/issues/pure-callee-call`

- size: oxc 258 vs reference 210 (+48 bytes)

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
+function identity(value) {
+	return value;
+}
 let count = 0;
 function invoke() {
 	count += 1;
 }
-invoke(), ((function(value) {
-	return value;
-})?.(invoke))(), new function() {
+identity(invoke)(), (identity?.(invoke))();
+function Factory() {
 	return invoke;
-}()(), (function() {
+}
+new Factory()();
+function tag() {
 	return invoke;
-})``(), console.log(count);
+}
+tag``(), console.log(count);

```

## `swc/issues/10532`

- size: oxc 212 vs reference 162 (+50 bytes)

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
+	function WL(t) {
+		var n = (console.log(), t);
+		Object.keys(n).forEach(function(t) {
+			console.log(n), console.log(t), console.log(n[t]);
+		});
+	}
+	try {
+		t = { a: 1 }, WL(t);
+	} catch {}
+})();

```

## `swc/issues/10885`

- size: oxc 404 vs reference 354 (+50 bytes)

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
@@ -3,11 +3,15 @@
 export default function useMeow() {
 	let [state, setState] = useState('init');
 	return { onMeow: async () => {
-		if ('init' === state) switch (getCondition()) {
-			case 'a':
-			case 'b': break;
+		switch (state) {
+			case 'init':
+				switch (getCondition()) {
+					case 'a': break;
+					case 'b': break;
+					default: await doSomething();
+				}
+				break;
 			default: await doSomething();
 		}
-		else await doSomething();
 	} };
 }

```

## `swc/issues/7984`

- size: oxc 222 vs reference 172 (+50 bytes)

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
@@ -1,6 +1,12 @@
 getInitialProps = (code) => {
 	let statusCode, message;
-	return code && (statusCode = code), message = 404 === statusCode ? '404' : '500', {
+	switch (code && (statusCode = code), statusCode) {
+		case 404:
+			message = '404';
+			break;
+		default: message = '500';
+	}
+	return {
 		statusCode,
 		message
 	};

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
 let a;
-// a = "123";
-console.log(a), console.log(a = '123'), console.log((a += 1, a += 2));
+function g() {
+	a = '123', console.log(a);
+}
+function f() {
+	// a = "123";
+	console.log(a);
+}
+f(), g(), console.log((a += 1, a += 2));

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
@@ -1,4 +1,9 @@
-bar, bar;
+class C {
+	static foo = bar;
+}
+(class {
+	static foo = bar;
+});
 class D {
 	static #_ = this.FOO = {};
 }

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

## `swc/issues/6279/2`

- size: oxc 120 vs reference 64 (+56 bytes)

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
+const r = RegExp('a', 'g');
+function run(str, r) {
+	let m;
+	for (; m = r.exec(str);) console.log(m);
+}
+run('abcda', r);

```

## `swc/issues/10876/2`

- size: oxc 187 vs reference 130 (+57 bytes)

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
+const createCounter1 = () => {
+	let count = 0;
+	return (numToAdd) => (count += numToAdd, count);
+};
+new class {
+	[createCounter1()]() {
 		console.log('Hello, world!');
 	}
 }();

```

## `swc/issues/7575/1`

- size: oxc 128 vs reference 71 (+57 bytes)

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
 export const envKey = 'staging';
-export const environment = 'staging';
+const environmentResolver = () => 'staging';
+export const environment = environmentResolver();

```

## `swc/issues/11103`

- size: oxc 277 vs reference 219 (+58 bytes)

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
 import assert from 'node:assert';
-let url = new URL('api/', 'https://example.com').toString();
-assert('https://example.com/api/' === url);
+let url = (() => {
+	{
+		let url = 'api';
+		return url += '/', new URL(url, 'https://example.com').toString();
+	}
+})();
+assert(url === 'https://example.com/api/');
 export default function Home() {
 	return React.createElement('p', null, url);
 }

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

## `swc/issues/7402`

- size: oxc 335 vs reference 274 (+61 bytes)

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
@@ -1,14 +1,17 @@
-let temp;
 export function mutate(out) {
 	return out[0] = 1, out[1] = 2, out[2] = 3, out;
 }
-export const myFunc = (temp = [
-	0,
-	0,
-	0
-], function(out) {
-	return mutate(temp), out[0] = 1 / temp[0], out[1] = 1 / temp[1], out[2] = 1 / temp[2], out;
-});
+export const myFunc = (function() {
+	let temp = [
+		0,
+		0,
+		0
+	];
+	return function(out) {
+		let scaling = temp;
+		return mutate(scaling), out[0] = 1 / scaling[0], out[1] = 1 / scaling[1], out[2] = 1 / scaling[2], out;
+	};
+})();
 myFunc([
 	1,
 	2,

```

## `swc/issues/2028`

- size: oxc 148 vs reference 86 (+62 bytes)

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
+function isSymbol(s) {
+	return s != null;
+}
+function isKey(value, object) {
+	return !!(value == null || isSymbol(value));
+}
+module.exports = isKey;

```

## `swc/issues/9785`

- size: oxc 196 vs reference 134 (+62 bytes)

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
+function dist_index_es_P(e) {
+	try {
+		t = JSON.stringify(e);
+	} catch {
+		t = String(e);
+	}
+	for (var r = 0, o = 0; o < t.length; o++) r += 1;
+	return console.log(r), r;
 }
-for (var r = 0, o = 0; o < t.length; o++) r += 1;
-console.log(r);
+dist_index_es_P('aa');

```

## `swc/next/joda`

- size: oxc 382 vs reference 320 (+62 bytes)

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
+/***/ 3266: (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
 	/* harmony export */ __webpack_require__.d(__webpack_exports__, { 
 	/* harmony export */ h: function() {
 		return LocalDate;
 	} });
-} }]);
+	var isInit = !1;
+	function init() {
+		isInit ||= !0;
+	}
+	init();
+}) }]);

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

## `swc/issues/10178`

- size: oxc 90 vs reference 27 (+63 bytes)

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
+var strNumTuple = ['foo', 10];
+strNumTuple[0], strNumTuple[0];

```

## `swc/issues/10425`

- size: oxc 85 vs reference 22 (+63 bytes)

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
 export const foo = 6;
+function baz() {
+	return 5;
+}
+class Bar {
+	static x = baz();
+}

```

## `swc/issues/9459`

- size: oxc 102 vs reference 39 (+63 bytes)

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
+export default function Component() {
+	let [state, setState] = useState(), { a, b = 'b' } = call();
+}

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
+	let r = f();
+	console.log(r);
+	function f() {
+		return console.log('REQUIRE'), 1;
+	}
+})();

```

## `swc/simple/inline/6`

- size: oxc 415 vs reference 348 (+67 bytes)

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
@@ -1,11 +1,11 @@
 export function endOf(units) {
-	var time;
+	var time, dividend, dividend1;
 	switch (this._isUTC, units) {
 		case 'hour':
-			time = v(), time += 36e5 - ((time + 36e5) % 36e5 + 36e5) % 36e5 - 1;
+			time = v(), time += 36e5 - (dividend = time + 36e5, (dividend % 36e5 + 36e5) % 36e5) - 1;
 			break;
 		case 'minute':
-			time = v(), time += 6e4 - (time % 6e4 + 6e4) % 6e4 - 1;
+			time = v(), time += 6e4 - (dividend1 = time, (dividend1 % 6e4 + 6e4) % 6e4) - 1;
 			break;
 		case 'second': time = v(), time += 1e3 - (time % 1e3 + 1e3) % 1e3 - 1;
 	}

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

## `swc/issues/8173`

- size: oxc 1236 vs reference 1165 (+71 bytes)

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
@@ -1,5 +1,4 @@
 'use strict';
-var _ref, _ref1;
 function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
 	try {
 		var info = gen[key](arg), value = info.value;
@@ -28,13 +27,20 @@
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
-	return _ref1.apply(this, arguments);
-});
+], goodFunction = function() {
+	var _ref = _async_to_generator(function* () {
+		let rb = yield getArray(), rc = yield getArray();
+		console.log(someFn(1, rb, rc));
+	});
+	return function() {
+		return _ref.apply(this, arguments);
+	};
+}(), badFunction = function() {
+	var _ref = _async_to_generator(function* () {
+		console.log(someFn(1, yield getArray(), yield getArray()));
+	});
+	return function() {
+		return _ref.apply(this, arguments);
+	};
+}();
 goodFunction(), badFunction();

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

## `swc/issues/11755`

- size: oxc 280 vs reference 207 (+73 bytes)

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
 function f() {
-	100 === { 'item-1-0': 100 }[(({ id, configIndex }) => `${id}-${configIndex}`)({
-		id: 'item-1',
-		configIndex: 0
-	})] ? console.log('Test PASSED!') : console.log('Test FAILED!');
+	let getConfigId = ({ id, configIndex }) => `${id}-${configIndex}`, result = ((id, configIndex) => (data) => data[getConfigId({
+		id,
+		configIndex
+	})])('item-1', 0)({ 'item-1-0': 100 });
+	console.log(result === 100 ? 'Test PASSED!' : 'Test FAILED!');
 }
 f(), f();

```

## `swc/issues/10746`

- size: oxc 165 vs reference 91 (+74 bytes)

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
+const ErrorResponse = (statusCode, message) => Response.json({ message }, { status: statusCode });
+export const unknownError = ErrorResponse(520, 'Unknown error.');

```

## `swc/issues/7331/2`

- size: oxc 103 vs reference 29 (+74 bytes)

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
+	function foo(arg) {
+		var arg = arg.slice();
+		return arg;
+	}
+	foo([]);
+}

```

## `swc/issues/9610-arrow-functions`

- size: oxc 244 vs reference 170 (+74 bytes)

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
+const foo = (a, b = 100) => a, bar = (a, b = 10, c = 20) => a, baz = (a, b = 5) => a + b, qux = (a, b = 1, c = 2) => a + b;
+export const example = () => foo(1) + bar(2) + baz(3) + qux(4);

```

## `swc/issues/10936`

- size: oxc 1038 vs reference 963 (+75 bytes)

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
@@ -1,5 +1,4 @@
-let variable = {};
-console.log([
+const variable = {}, params = [
 	'OrderNumber=',
 	variable.data?.orderNumber,
 	'|AuditNo=',
@@ -7,10 +6,19 @@
 	'|JournalType=',
 	transactionTypeCode[variable.data.transactionType],
 	'|IsPreview=0'
-].join(''));
+].join('');
+console.log(params);
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
 	variable?.notExist,
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

## `swc/issues/8271`

- size: oxc 396 vs reference 321 (+75 bytes)

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
+let $eb2fd35624c84372$var$A = (() => {
+	$eb2fd35624c84372$var$CustomElement('component-a');
+	let _classThis, _classSuper = HTMLElement;
+	return class extends _classSuper {
+		static {
+			_classThis = this;
+		}
+		static {
+			console.log(123);
+		}
+		constructor() {
+			super(), this.innerHTML = 'Component A is working';
+		}
+	}, _classThis;
+})();
+console.log(new $eb2fd35624c84372$var$A().tagName);

```

## `swc/issues/11321`

- size: oxc 769 vs reference 693 (+76 bytes)

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
+import A from 'm.js';
+import B from 'm.js';
 // Test case 2: Multiple namespace imports with different local names
 import * as X from 'p.js';
 import * as Y from 'p.js';
 // Test case 3: Mix of multiple defaults and named imports
-import C, { default as D, foo, bar } from 'r.js';
+import C from 'r.js';
+import D from 'r.js';
+import { foo } from 'r.js';
+import { bar } from 'r.js';
 // Test case 4: Mix of all kinds of imports
-import E, * as ns1 from 'q.js';
-import F, { default as G, a, b, c } from 'q.js';
-import H, * as ns2 from 'q.js';
-// Use all imports to prevent dead code elimination
+import * as ns1 from 'q.js';
+import { default as E, 'default' as F } from 'q.js';
+import G from 'q.js';
+import { a, b, c } from 'q.js';
+import * as ns2 from 'q.js';
+import H from 'q.js';
 console.log(A, B, C, D, E, F, G, H), console.log(X, Y), console.log(foo, bar), console.log(ns1, ns2), console.log(a, b, c);

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
+export default function A() {
+	console.log.apply(console, arguments), console.a.b.c(console, arguments);
+}

```

## `swc/issues/6957/1`

- size: oxc 444 vs reference 368 (+76 bytes)

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
 export function foo() {
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
+	alert(1 .toFixed(1)), alert(0 .toFixed(0)), alert(0 .toFixed(1)), alert(0 .toFixed(2)), alert(0 .toFixed(3)), alert(10 .toFixed(1)), alert(20 .toFixed(2)), alert(30 .toFixed(3)), alert(100 .toFixed(1)), alert(100 .toFixed(2)), alert(100 .toFixed(3)), alert(110 .toFixed(1)), alert(110 .toFixed(2)), alert(110 .toFixed(3)), alert(110 .toFixed(4)), alert(1110 .toFixed(4)), alert(11110 .toFixed(4));
 }

```

## `swc/issues/drop-console-computed`

- size: oxc 224 vs reference 147 (+77 bytes)

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
+const cb = console.error.bind(console);
+cb('boom'), process.stdout.write(typeof cb + '\n'), console.error.call(console, 'via call');
+const r = console.error.capture('custom property');
 process.stdout.write(typeof r + '\n');

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

## `swc/issues/11512-simple`

- size: oxc 277 vs reference 195 (+82 bytes)

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
+function identity(x, y = 42) {
+	return x;
+}
 // Use the function multiple times so it goes through simple_functions path.
 export function test() {
-	return 6;
+	return identity(1) + identity(2) + identity(3);
 }

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
+class X {
+	constructor() {}
+}
+class Y extends X {}
+((a) => ((b) => {
+	if (a.foo()) throw Error();
+	return a;
+}))(new Y());

```

## `swc/issues/10630`

- size: oxc 152 vs reference 62 (+90 bytes)

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
+var constants = {
+	first: 1,
+	second: 2
+};
 export function isConstant(x) {
-	return 1 === x || 2 === x;
+	return x === constants.first || x === constants.second;
 }
+constants.second;

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

## `swc/issues/7770/2`

- size: oxc 240 vs reference 148 (+92 bytes)

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
+function absolute() {
+	return '\n    ';
+}
+function flex() {
+	return '\n    ';
+}
 exports.MainCSS = `
 .ThisshouldOnlyBeonTop {
-    
-    
+    ${absolute()}
 }
 .abcBlablaOne .asdsad {
-    
-    
+    ${flex()}
 }
 .aasdasdasd .asdsada {
     we: asdasd !important;

```

## `swc/issues/11007`

- size: oxc 177 vs reference 84 (+93 bytes)

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
+const profile = (_s, fn) => fn();
+profile('trace1', () => {
+	someFunction({
+		args1: profile('trace2', () => JSON.stringify(someObj)),
+		args2: JSON.stringify(someObj)
+	});
 });

```

## `swc/issues/11083`

- size: oxc 297 vs reference 202 (+95 bytes)

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
+(function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
+	async function showPopup({ mallId }) {
 		try {
-			console.log({ mallId: o });
-		} catch (o) {
-			console.log(o);
+			console.log({ mallId });
+		} catch (e) {
+			console.log(e);
 		}
-	},
-	get liteContractCode() {
-		return null;
 	}
-}).showPopup({ mallId: 1 });
+	({
+		showPopup,
+		get liteContractCode() {
+			return null;
+		}
+	}).showPopup({ mallId: 1 });
+})();

```

## `swc/simple/inline/1`

- size: oxc 112 vs reference 17 (+95 bytes)

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
+function mod(dividend, divisor) {
+	return (dividend % divisor + divisor) % divisor;
+}
+console.log(mod(10, 15));

```

## `swc/issues/7784/1`

- size: oxc 113 vs reference 16 (+97 bytes)

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
+let a = 1;
+function foo(g) {
+	var t = g();
+	a += t;
+}
+function g() {
+	return a = 2, 1;
+}
+foo(g), console.log(a);

```

## `swc/issues/7784/2`

- size: oxc 113 vs reference 16 (+97 bytes)

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
+let a = 1;
+function foo(g) {
+	var t = g();
+	a += t;
+}
+function g() {
+	return a = 2, 1;
+}
+foo(g), console.log(a);

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

## `swc/simple/inline/4`

- size: oxc 273 vs reference 171 (+102 bytes)

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
+function $parcel$export(a, b, c) {
+	a[b] = c;
+}
+$parcel$export(module.exports, 'A', function() {
 	return A;
-}, module.exports.B = function() {
+}), $parcel$export(module.exports, 'B', function() {
 	return B;
-}, module.exports.C = function() {
+}), $parcel$export(module.exports, 'C', function() {
 	return C;
-};
+});
 const A = 'A', B = 'B', C = 'C';

```

## `swc/issues/11977`

- size: oxc 421 vs reference 317 (+104 bytes)

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
+	function Subscription1(listeners, listener) {}
+	Subscription1.prototype.add = function(subscription) {
+		this.unsubscribed;
+	};
+})();
 try {
 	serverOnlyRequire = eval('require');
-} catch (err) {}
-var __require = (0, __turbopack_context__.z)(ErrorType || {}), isRequestError = (error) => {
-	i.getKey;
+} catch {}
+var __require = ((x) => __turbopack_context__.z)(function(x) {})(ErrorType || {}), isRequestError = (error) => {
+	let u = i.getKey ?? ((p, s) => 'x'), f = async () => {};
 }, x = class extends d {};

```

## `swc/issues/6730`

- size: oxc 806 vs reference 700 (+106 bytes)

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
+function asyncGeneratorStep(e, t, n, r, i, a, o) {
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
+function _asyncToGenerator(e) {
 	return function() {
-		var r = this, t = arguments;
-		return new Promise(function(o, i) {
-			var u = e.apply(r, t);
-			function a(e) {
-				n(u, o, i, a, c, 'next', e);
+		var t = this, n = arguments;
+		return new Promise(function(r, i) {
+			var a = e.apply(t, n);
+			function _next(e) {
+				asyncGeneratorStep(a, r, i, _next, _throw, 'next', e);
 			}
-			function c(e) {
-				n(u, o, i, a, c, 'throw', e);
+			function _throw(e) {
+				asyncGeneratorStep(a, r, i, _next, _throw, 'throw', e);
 			}
-			a(void 0);
+			_next(void 0);
 		});
 	};
 }
 export const styleLoader = () => ({
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
+			var e = _asyncToGenerator(function* (e) {});
+			return function(t) {
+				return e.apply(this, arguments);
 			};
 		}());
 	}

```

## `swc/issues/7241`

- size: oxc 141 vs reference 26 (+115 bytes)

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
+	function forwardRef() {
+		return something();
+	}
+	function Test() {
+		return 'Test';
+	}
+	console.log(forwardRef(Test));
+})();

```

## `swc/issues/11871`

- size: oxc 740 vs reference 620 (+120 bytes)

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
@@ -1,4 +1,4 @@
-var window = {}, moment_utc = (input) => ({ diff: () => 0 });
+var window = {}, foo = { min: (items) => items[0] }, bar = {}, bucketFactory = () => ({ utc: (input) => ({ diff: () => 0 }) }), min = foo, moment = bucketFactory(bar);
 const defaultSpec = {
 	granularities: [{
 		maxDays: 1,
@@ -7,6 +7,6 @@
 	other: 1
 };
 window.x = { f: (start, end) => ((inputStartDate, inputEndDate, spec = defaultSpec) => {
-	let startDate = moment_utc(inputStartDate), dayCount = moment_utc(inputEndDate).diff(startDate, 'days') + 1, granularity = spec.granularities.sort((left, right) => left.maxDays - right.maxDays).find((item) => dayCount <= item.maxDays);
-	return null == granularity ? '' : granularity.displayFormatString;
-})(start, end) + String(1) }, console.log(window.x.f(0, 0));
+	let startDate = moment.utc(inputStartDate), dayCount = moment.utc(inputEndDate).diff(startDate, 'days') + 1, granularity = spec.granularities.sort((left, right) => left.maxDays - right.maxDays).find((item) => dayCount <= item.maxDays);
+	return granularity == null ? '' : granularity.displayFormatString;
+})(start, end) + String(min.min([1, 2])) }, console.log(window.x.f(0, 0));

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

## `swc/issues/10041`

- size: oxc 316 vs reference 192 (+124 bytes)

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
+	function entry() {
+		setName({
+			a: [],
+			b: 0
+		}, 'Alice');
+	}
+	function setName(struct, str) {
+		writeString(struct.a, struct.b, str);
+	}
+	function writeString(buffer, offset, c) {
+		for (var i = 0, v = c.length; i < v; i = i + 1 | 0) buffer[offset + i | 0] = c.charCodeAt(i);
+	}
+	entry();
+})();

```

## `swc/issues/12177`

- size: oxc 584 vs reference 458 (+126 bytes)

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
 const effects = [];
-function sideEffect(e) {
-	effects.push(e);
+function sideEffect(name) {
+	effects.push(name);
+}
+function identity(value) {
+	return value;
 }
-function returned(e) {
+(function() {
+	sideEffect('function-expression');
+})(), identity(function() {
+	sideEffect('helper-call');
+})(), sideEffect('sequence');
+function returned(name) {
 	return function() {
-		sideEffect(e);
+		sideEffect(name);
 	};
 }
-sideEffect('function-expression'), sideEffect('helper-call'), sideEffect('sequence'), returned('direct-call')(), ((function(e) {
-	return e;
-})?.(returned('optional-call')))(), new function(e) {
-	return e;
-}(returned('constructor'))(), (function() {
+identity(returned('direct-call'))(), (identity?.(returned('optional-call')))();
+function Factory(value) {
+	return value;
+}
+new Factory(returned('constructor'))();
+function tag() {
 	return returned('tagged-template');
-})``(), console.log(effects.join(','));
+}
+tag``(), console.log(effects.join(','));

```

## `swc/issues/6751/1`

- size: oxc 307 vs reference 174 (+133 bytes)

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
 let current_component;
-try {
+function set_current_component(component) {
+	current_component = component;
+}
+function f(component) {
 	let parent = current_component;
-	current_component = { m() {
-		console.log('call m()');
-	} }, parent.m();
-} catch (e) {
+	set_current_component(component), parent.m();
+}
+const obj = { m() {
+	console.log('call m()');
+} };
+try {
+	f(obj);
+} catch {
 	console.log('PASS');
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
+export default function A() {
+	console?.log?.(123), console?.log?.apply(console, arguments), console?.a.b?.c(console, arguments), console?.any(), console?.warn();
+}

```

## `swc/issues/10876/1`

- size: oxc 624 vs reference 477 (+147 bytes)

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
+const createCounter1 = () => {
+	let count = 0;
+	return (numToAdd) => (count += numToAdd, count);
+}, createCounter2 = () => {
+	let count = 0;
+	return (numToAdd) => (count += numToAdd, count);
+};
+function createCounter3() {
+	let count = 0;
+	return (numToAdd) => (count += numToAdd, count);
+}
 class Counter {
-	add = (() => {
-		let count = 0;
-		return (numToAdd) => count += numToAdd;
-	})();
+	add = createCounter1();
 	static {
-		let count;
-		this.helper = (count = 0, (numToAdd) => count += numToAdd);
+		this.helper = createCounter2();
 	}
 	static method() {
-		let count;
-		return count = 0, (numToAdd) => count += numToAdd;
+		return createCounter3();
 	}
 }
-const counter1 = new Counter();
-const counter2 = new Counter();
+const counter1 = new Counter(), counter2 = new Counter();
 console.log(counter1.add(1)), console.log(counter2.add(1)), console.log(Counter.helper(1)), console.log(Counter.method()(1));
 export {};

```

## `swc/no-side-effect`

- size: oxc 151 vs reference 0 (+151 bytes)

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
+const fnD = (args) => {
+	// ...
+	let d = console.log('DDD');
+	console.log(d);
+};
+fnD(), fnD(), fnD(), fnD(), fnD(), fnD(), fnD(), fnD(), fnD(), fnD();

```

## `swc/issues/7004`

- size: oxc 283 vs reference 117 (+166 bytes)

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
+function getDescription(option, parentGroup) {
+	return [parentGroup && parentGroup.label, option.__labelPrefix].concat(option.tags);
+}
+function printDescription() {
+	let desc = getDescription({
+		__labelPrefix: 'test',
+		tags: []
+	}, null);
+	console.log(desc);
+}
+printDescription();

```

## `swc/pr/11814_class_effect_guards`

- size: oxc 537 vs reference 370 (+167 bytes)

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
@@ -12,11 +12,25 @@
 		KeepSelfBlock.make();
 	}
 }
-getObject();
+class KeepPrivateInBlock {
+	static #value;
+	static {
+		#value in getObject();
+	}
+}
 class KeepPrivateAccessInBlock {
 	static #value;
 	static {
 		getObject().#value;
 	}
 }
-first(), second(), flag && effect();
+class KeepMultiStatementBlock {
+	static {
+		first(), second();
+	}
+}
+class KeepNonExpressionBlock {
+	static {
+		flag && effect();
+	}
+}

```

## `swc/issues/8284`

- size: oxc 828 vs reference 657 (+171 bytes)

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
+(function(global, factory) {
+	typeof exports == 'object' && typeof module < 'u' ? factory(exports) : typeof define == 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis < 'u' ? globalThis : global || self, factory(global.Sentry = {}));
+})(this, function(exports) {
+	'use strict';
 	function isGlobalObj(obj) {
 		return obj && obj.Math == Math ? obj : void 0;
 	}
-	'use strict';
-	console.log('fetch' in ('object' == typeof globalThis && isGlobalObj(globalThis) || isGlobalObj(globalThis) || 'object' == typeof self && isGlobalObj(self) || 'object' == typeof global && isGlobalObj(global) || function() {
+	let GLOBAL_OBJ = typeof globalThis == 'object' && isGlobalObj(globalThis) || isGlobalObj(globalThis) || typeof self == 'object' && isGlobalObj(self) || typeof global == 'object' && isGlobalObj(global) || (function() {
 		return this;
-	}() || {}));
-}, 'object' == typeof exports && 'u' > typeof module ? factory(exports) : 'function' == typeof define && define.amd ? define(['exports'], factory) : factory((global1 = 'u' > typeof globalThis ? globalThis : global1 || self).Sentry = {});
+	})() || {};
+	function getGlobalObject() {
+		return GLOBAL_OBJ;
+	}
+	let WINDOW$6 = getGlobalObject();
+	function supportsFetch() {
+		return 'fetch' in WINDOW$6;
+	}
+	console.log(supportsFetch());
+});

```

## `swc/issues/9610-methods`

- size: oxc 666 vs reference 492 (+174 bytes)

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
@@ -1,7 +1,17 @@
 // Test: Object and class methods with unused default parameters
+const obj = {
+	// Method with unused default param
+	method1(a, b = 10) {
+		return a;
+	},
+	// Method with used default param
+	method2(a, b = 20) {
+		return a + b;
+	}
+};
 class MyClass {
 	// Method with unused default param
-	method1(a) {
+	method1(a, b = 30) {
 		return a;
 	}
 	// Method with used default param
@@ -9,11 +19,11 @@
 		return a + b;
 	}
 	// Static method with unused default param
-	static staticMethod(a) {
+	static staticMethod(a, b = 50) {
 		return a;
 	}
 }
 export function example() {
 	let instance = new MyClass();
-	return ((a) => a)(1) + ((a, b = 20) => a + b)(2) + instance.method1(3) + instance.method2(4) + MyClass.staticMethod(5);
+	return obj.method1(1) + obj.method2(2) + instance.method1(3) + instance.method2(4) + MyClass.staticMethod(5);
 }

```

## `swc/issues/11102`

- size: oxc 200 vs reference 24 (+176 bytes)

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
+const decideZoomByAccuracy = (range) => {
+	let isUnder = (accuracy) => range <= accuracy;
+	return isUnder(0) || isUnder(50) || isUnder(100) ? 15 : 11;
+};
+export const zoom = decideZoomByAccuracy(75);

```

## `swc/issues/11512`

- size: oxc 274 vs reference 92 (+182 bytes)

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
+function x(x) {
+	return x;
+}
+function y(x, y, z) {
+	return x;
+}
+function abc(a) {
+	return x(a);
+}
+function abc2(a, x, z = 'hello') {
+	return y(a);
+}
 export function example() {
 	// output should be
 	// return `2 2 3 3`;
-	return '2 2 3 3';
+	return `${x(2)} ${y('2')} ${abc(3)} ${abc2('3')}`;
 }

```

## `swc/issues/11133`

- size: oxc 1499 vs reference 1316 (+183 bytes)

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
+import { add } from 'math';
+import { subtract } from 'math';
+import { multiply } from 'math';
 // Test case 2: Same export imported with different local names (should preserve both)
-import { add as a, add as b } from 'calculator';
+import { add as a } from 'calculator';
+import { add as b } from 'calculator';
 // Test case 3: Mix of default and named imports
-import defaultExport, { namedExport } from 'module1';
+import defaultExport from 'module1';
+import { namedExport } from 'module1';
 // Test case 4: Namespace import with named imports (CANNOT be merged - incompatible)
 import * as utils from 'utils';
 import { helper } from 'utils';
 // Test case 4b: Default with namespace (CAN be merged)
-import defUtils, * as utils2 from 'utils2';
+import defUtils from 'utils2';
+import * as utils2 from 'utils2';
 // Test case 5: Side-effect import (should not be merged)
 import 'polyfill';
+import 'polyfill';
 // Test case 6: Different sources (should not be merged)
 import { foo } from 'lib1';
 import { foo } from 'lib2';
 // Test case 7: Duplicate named imports (exact same specifier)
-import { duplicate, duplicate, duplicate } from 'dups';
+import { duplicate } from 'dups';
+import { duplicate } from 'dups';
+import { duplicate } from 'dups';
 // Test case 8: Mix of named imports with and without aliases
-import { thing, thing as renamedThing, otherThing } from 'things';
-// Use all imports to avoid dead code elimination
+import { thing } fro
... [truncated]
```

## `swc/issues/drop-console-value-refs`

- size: oxc 986 vs reference 794 (+192 bytes)

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
+const err = console.error.bind(console);
 err('boom');
-const s = (function() {}).toString();
-process.stdout.write(typeof s + '\n');
-(function() {}).bind();
-const cap = void 0;
+const s = console.warn.toString();
+process.stdout.write(typeof s + '\n'), console.error.call(console, 'via call'), console.error.apply(console, ['via apply']), console.error.bind(console), console.error.capture('custom property, dropped like before');
+const cap = console.error.capture('custom property, value position');
 process.stdout.write(typeof cap + '\n');
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
-process.stdout.write(typeof pb + '\n');
-const dbg = (console.debug && function() {})?.bind() || null;
-process.stdout.write((null !== dbg) + '\n');
-const st = void 0;
+const cap2 = console.error.capture?.('custom property, optional call');
+process.stdout.write(typeof cap2 + '\n'), process.stdout.write('undefined\n'), process.stdout.write(typeof err + '\n');
+const ob = console?.error?.bind(console);
+ob('boom optional'), process.stdout.write(typeof ob + '\n');
+const pb = console?.error.bind(console);
+pb('early optional'), process.stdout.write(typeof pb + '\n');
+const dbg = c
... [truncated]
```

## `swc/issues/11158`

- size: oxc 311 vs reference 86 (+225 bytes)

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
+	let gen = () => foo(12);
+	function foo(length) {
+		return length;
+	}
+	let a = `tmp-${gen()}-a`, b = `tmp-${gen()}-b`;
+	console.log(a, b);
+})(), (() => {
+	let gen = () => g(foo(12));
+	function foo(length) {
+		return length;
+	}
+	let a = `tmp-${gen()}-a`, b = `tmp-${gen()}-b`;
+	console.log(a, b);
+})();

```

## `swc/pr/11814_class_effect_order`

- size: oxc 606 vs reference 368 (+238 bytes)

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
+class DeclarationOrder extends effect('decl:extends') {
+	[effect('decl:method')]() {}
+	static [effect('decl:static-key')] = effect('decl:static-value');
+	[effect('decl:instance-key')] = effect('decl:instance-value');
+	static #privateField = effect('decl:private-value');
+	static {
+		effect('decl:block');
+	}
+}
+(class extends effect('expr:extends') {
+	[effect('expr:method')]() {}
+	static [effect('expr:static-key')] = effect('expr:static-value');
+	[effect('expr:instance-key')] = effect('expr:instance-value');
+	static #privateField = effect('expr:private-value');
+	static {
+		effect('expr:block');
+	}
+});

```

## `swc/issues/8813`

- size: oxc 714 vs reference 369 (+345 bytes)

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
+	let x = 'asdf';
+	switch (x) {
+		case x:
+	}
+	console.log('PASS 1');
+})(), (() => {
+	let x = 'asdf';
+	switch (x) {
+		case x:
+	}
+	console.log('PASS 2');
+})(), (() => {
+	let x = 'asdf', y = 'FAIL';
+	switch (x) {
+		case y = 'PASS 3', x:
+	}
+	console.log(y);
+})(), (() => {
+	let x = 'asdf', y = 'FAIL';
+	switch (x) {
+		case y = 'PASS 4':
+		case x:
+	}
+	console.log(y);
+})(), (() => {
+	let x = 'asdf', y = 'FAIL', z = 'FAIL';
+	switch (x) {
+		case y = 'PASS 5':
+		case z = 'PASS 5':
+		case x:
+	}
+	console.log(y, z);
+})();
+var c = 'FAIL';
+(function() {
+	function f(a, NaN) {
+		function g() {
+			switch (a) {
+				case a: break;
+				case c = 'PASS', NaN: c = 'FAIL';
+			}
+		}
+		g();
+	}
+	f(NaN);
+})(), console.log(c);

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

