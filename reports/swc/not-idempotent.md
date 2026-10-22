# swc / not-idempotent — Not idempotent (re-compressing changes the output)

Fixtures: 4

[← swc](README.md) · [← all families](../README.md)

## `swc/issues/12214`

- tags: `type:cjs`

```js
const __proto__ = 0;
console.log(Object.keys({
	__proto__: null,
	a: 1
}));
console.log(Object.keys({
	'__proto__': null,
	b: 2
}));
console.log(Object.keys({ __proto__ }));
console.log(Object.keys({ ['__proto__']: 1 }));
console.log(Object.keys({ __proto__() {} }));
console.log(Object.keys({
	a: 1,
	b: 2
}));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,16 @@
 const __proto__ = 0;
-console.log(['a']);
-console.log(['b']);
-console.log(['__proto__']);
+console.log(Object.keys({
+	__proto__: null,
+	a: 1
+}));
+console.log(Object.keys({
+	'__proto__': null,
+	b: 2
+}));
+console.log(Object.keys({ 0 }));
 console.log(Object.keys({ ['__proto__']: 1 }));
 console.log(Object.keys({ __proto__() {} }));
-console.log(['a', 'b']);
+console.log(Object.keys({
+	a: 1,
+	b: 2
+}));

```

```js
// oxc, second pass
<reparse failed: Expected `:` but found `}`>
```

## `swc/projects/jquery/13`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`

```js
var jQuery = window.jQuery || {};
function internalRemoveData(elem, name, pvt) {
	if (!jQuery.acceptData(elem)) {
		return;
	}
	var i, l, thisCache, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if (!cache[id]) {
		return;
	}
	if (name) {
		thisCache = pvt ? cache[id] : cache[id].data;
		if (thisCache) {
			// Support array or space separated string names for data keys
			if (!jQuery.isArray(name)) {
				// try the string as a key before any manipulation
				if (name in thisCache) {
					name = [name];
				} else {
					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase(name);
					if (name in thisCache) {
						name = [name];
					} else {
						name = name.split(' ');
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat(jQuery.map(name, jQuery.camelCase));
			}
			for (i = 0, l = name.length; i < l; i++) {
				delete thisCache[name[i]];
			}
			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
				return;
			}
		}
	}
	// See jQuery.data for more information
	if (!pvt) {
		delete cache[id].data;
		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if (!isEmptyDataObject(cache[id])) {
			return;
		}
	}
	// Destroy the cache
	if (isNode) {
		jQuery.cleanData([elem], true);
	} else if (jQuery.support.deleteExpando || cache != cache.window) {
		delete cache[id];
	} else {
		cache[id] = null;
	}
}

```

```diff
--- reference
+++ oxc
@@ -5,16 +5,18 @@
 		// If there is already no cache entry for this object, there is no
 		// purpose in continuing
 		if (cache[id]) {
-			if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
-				for (i = 0, l = (name = jQuery.isArray(name) ? name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache || (name = jQuery.camelCase(name)) in thisCache ? [name] : name.split(' ')).length; i < l; i++) delete thisCache[name[i]];
+			if (name && (thisCache = pvt ? cache[id] : cache[id].data, thisCache)) {
+				for (jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : 
+				// try the string as a key before any manipulation
+				(name in thisCache) ? name = [name] : 
+				// split the camel cased version by spaces unless a key with the spaces exists
+				(name = jQuery.camelCase(name), name = (name in thisCache) ? [name] : name.split(' ')), i = 0, l = name.length; i < l; i++) delete thisCache[name[i]];
 				// If there is no data left in the cache, we want to continue
 				// and let the cache object itself get destroyed
 				if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) return;
 			}
 			// See jQuery.data for more information
-			if (!pvt && (delete cache[id].data, !isEmptyDataObject(cache[id]))) return;
-			// Destroy the cache
-			isNode ? jQuery.cleanData([elem], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null;
+			!pvt && (delete cache[id].data, !isEmptyDataObject(cache[id])) || (isNode ? jQuery.cleanData([elem], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null);
 		}
 	}
 }

```

```js
// oxc, second pass
var jQuery = window.jQuery || {};
function internalRemoveData(elem, name, pvt) {
	if (jQuery.acceptData(elem)) {
		var i, l, thisCache, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if (cache[id]) {
			if (name && (thisCache = pvt ? cache[id] : cache[id].data, thisCache)) {
				for (jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : 
				// try the string as a key before any manipulation
				(name in thisCache) ? name = [name] : (name = jQuery.camelCase(name), name = (name in thisCache) ? [name] : name.split(' ')), i = 0, l = name.length; i < l; i++) delete thisCache[name[i]];
				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) return;
			}
			// See jQuery.data for more information
			!pvt && (delete cache[id].data, !isEmptyDataObject(cache[id])) || (isNode ? jQuery.cleanData([elem], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null);
		}
	}
}

```

## `swc/projects/jquery/15`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`

```js
export const obj = { position: function() {
	if (!this[0]) {
		return;
	}
	var offsetParent, offset, parentOffset = {
		top: 0,
		left: 0
	}, elem = this[0];
	// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
	if (jQuery.css(elem, 'position') === 'fixed') {
		// we assume that getBoundingClientRect is available when computed position is fixed
		offset = elem.getBoundingClientRect();
	} else {
		// Get *real* offsetParent
		offsetParent = this.offsetParent();
		// Get correct offsets
		offset = this.offset();
		if (!jQuery.nodeName(offsetParent[0], 'html')) {
			parentOffset = offsetParent.offset();
		}
		// Add offsetParent borders
		parentOffset.top += jQuery.css(offsetParent[0], 'borderTopWidth', true);
		parentOffset.left += jQuery.css(offsetParent[0], 'borderLeftWidth', true);
	}
	// Subtract parent offsets and element margins
	// note: when an element has margin: auto the offsetLeft and marginLeft
	// are the same in Safari causing offset.left to incorrectly be 0
	return {
		top: offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', true),
		left: offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', true)
	};
} };

```

```diff
--- reference
+++ oxc
@@ -7,7 +7,8 @@
 		// Subtract parent offsets and element margins
 		// note: when an element has margin: auto the offsetLeft and marginLeft
 		// are the same in Safari causing offset.left to incorrectly be 0
-		return 'fixed' === jQuery.css(elem, 'position') ? offset = elem.getBoundingClientRect() : // Get *real* offsetParent
+		return jQuery.css(elem, 'position') === 'fixed' ? offset = elem.getBoundingClientRect() : 
+		// Add offsetParent borders
 		(offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], 'html') || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], 'borderTopWidth', !0), parentOffset.left += jQuery.css(offsetParent[0], 'borderLeftWidth', !0)), {
 			top: offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', !0),
 			left: offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', !0)

```

```js
// oxc, second pass
export const obj = { position: function() {
	if (this[0]) {
		var offsetParent, offset, parentOffset = {
			top: 0,
			left: 0
		}, elem = this[0];
		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return jQuery.css(elem, 'position') === 'fixed' ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], 'html') || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], 'borderTopWidth', !0), parentOffset.left += jQuery.css(offsetParent[0], 'borderLeftWidth', !0)), {
			top: offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', !0),
			left: offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', !0)
		};
	}
} };

```

## `swc/projects/next/extra/if_return/.3`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`

```js
__webpack_require__.O = function(result, chunkIds, fn, priority) {
	/******/ if (chunkIds) {
		/******/ priority = priority || 0;
		/******/ for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
		/******/ deferred[i] = [
			chunkIds,
			fn,
			priority
		];
		/******/ return;
	}
	/******/ var notFulfilled = Infinity;
	/******/ for (var i = 0; i < deferred.length; i++) {
		/******/ var chunkIds = deferred[i][0];
		/******/ var fn = deferred[i][1];
		/******/ var priority = deferred[i][2];
		/******/ var fulfilled = true;
		/******/ for (var j = 0; j < chunkIds.length; j++) {
			/******/ if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) {
				return __webpack_require__.O[key](chunkIds[j]);
			})) {
				/******/ chunkIds.splice(j--, 1);
			} else {
				/******/ fulfilled = false;
				/******/ if (priority < notFulfilled) notFulfilled = priority;
			}
		}
		/******/ if (fulfilled) {
			/******/ deferred.splice(i--, 1);
			/******/ var r = fn();
			/******/ if (r !== undefined) result = r;
		}
	}
	/******/ return result;
	/******/
};

```

```diff
--- reference
+++ oxc
@@ -1,23 +1,26 @@
 __webpack_require__.O = function(result, chunkIds, fn, priority) {
 	/******/ if (chunkIds) {
-		/******/ priority = priority || 0;
+		/******/ priority ||= 0;
 		/******/ for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
 		/******/ deferred[i] = [
 			chunkIds,
 			fn,
 			priority
 		];
-		/******/ return;
-	}
-	/******/ for (var notFulfilled = 1 / 0, i = 0; i < deferred.length; i++) {
-		/******/ for (var chunkIds = deferred[i][0], fn = deferred[i][1], priority = deferred[i][2], fulfilled = !0, j = 0; j < chunkIds.length; j++) /******/ (!1 & priority || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) {
-			return __webpack_require__.O[key](chunkIds[j]);
-		}) ? chunkIds.splice(j--, 1) : /******/ (fulfilled = !1, priority < notFulfilled && (notFulfilled = priority));
-		/******/ if (fulfilled) {
-			/******/ deferred.splice(i--, 1);
-			/******/ var r = fn();
-			/******/ void 0 !== r && (result = r);
+	} else {
+		/******/ for (var notFulfilled = Infinity, i = 0; i < deferred.length; i++) {
+			/******/ for (var chunkIds = deferred[i][0], fn = deferred[i][1], priority = deferred[i][2], fulfilled = !0, j = 0; j < chunkIds.length; j++)
+ /******/ (priority & !1 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) {
+				return __webpack_require__.O[key](chunkIds[j]);
+			}) ? chunkIds.splice(j--, 1) : 
+			/******/ (fulfilled = !1, priority < notFulfilled && (notFulfilled = priority));
+			/******/ if (fulfilled) {
+				/******/ deferred.splice(i--, 1);
+				/******/ var r = fn();
+				/******/ r !== void 0 && (result = r);
+			}
 		}
+		/******/ return result;
 	}
-	/******/ return result;
-	/******/};
+	/******/
+};

```

```js
// oxc, second pass
__webpack_require__.O = function(result, chunkIds, fn, priority) {
	/******/ if (chunkIds) {
		/******/ priority ||= 0;
		/******/ for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
		/******/ deferred[i] = [
			chunkIds,
			fn,
			priority
		];
	} else {
		/******/ for (var notFulfilled = Infinity, i = 0; i < deferred.length; i++) {
			/******/ for (var chunkIds = deferred[i][0], fn = deferred[i][1], priority = deferred[i][2], fulfilled = !0, j = 0; j < chunkIds.length; j++)
 /******/ (priority & !1 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) {
				return __webpack_require__.O[key](chunkIds[j]);
			}) ? chunkIds.splice(j--, 1) : (fulfilled = !1, priority < notFulfilled && (notFulfilled = priority));
			/******/ if (fulfilled) {
				/******/ deferred.splice(i--, 1);
				/******/ var r = fn();
				/******/ r !== void 0 && (result = r);
			}
		}
		/******/ return result;
	}
	/******/
};

```

