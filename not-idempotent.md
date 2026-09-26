# not-idempotent — Not idempotent (re-compressing changes the output)

Fixtures: 16

## `swc/projects/jquery/4`


```js
export const obj = { parseXML: function(data) {
	var xml, tmp;
	if (!data || typeof data !== 'string') {
		return null;
	}
	try {
		if (window.DOMParser) {
			// Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString(data, 'text/xml');
		} else {
			// IE
			xml = new ActiveXObject('Microsoft.XMLDOM');
			xml.async = 'false';
			xml.loadXML(data);
		}
	} catch (e) {
		xml = undefined;
	}
	if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
		jQuery.error('Invalid XML: ' + data);
	}
	return xml;
} };

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,12 @@
 export const obj = { parseXML: function(data) {
-	var xml;
-	if (!data || 'string' != typeof data) return null;
+	var xml, tmp;
+	if (!data || typeof data != 'string') return null;
 	try {
-		window.DOMParser ? xml = new DOMParser().parseFromString(data, 'text/xml') : // IE
-		((xml = new ActiveXObject('Microsoft.XMLDOM')).async = 'false', xml.loadXML(data));
-	} catch (e) {
+		window.DOMParser ? (tmp = new DOMParser(), xml = tmp.parseFromString(data, 'text/xml')) : 
+		// IE
+		(xml = new ActiveXObject('Microsoft.XMLDOM'), xml.async = 'false', xml.loadXML(data));
+	} catch {
 		xml = void 0;
 	}
-	return xml && xml.documentElement && !xml.getElementsByTagName('parsererror').length || jQuery.error('Invalid XML: ' + data), xml;
+	return (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) && jQuery.error('Invalid XML: ' + data), xml;
 } };

```

```js
// oxc, second pass
export const obj = { parseXML: function(data) {
	var xml, tmp;
	if (!data || typeof data != 'string') return null;
	try {
		window.DOMParser ? (tmp = new DOMParser(), xml = tmp.parseFromString(data, 'text/xml')) : (xml = new ActiveXObject('Microsoft.XMLDOM'), xml.async = 'false', xml.loadXML(data));
	} catch {
		xml = void 0;
	}
	return (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) && jQuery.error('Invalid XML: ' + data), xml;
} };

```

## `swc/projects/next/extra/if_return/.3`


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
-__webpack_require__.O = function(result, chunkIds, fn, priority) {
-	/******/ if (chunkIds) {
-		/******/ priority = priority || 0;
-		/******/ for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
+__webpack_require__.O = function(e, t, n, r) {
+	/******/ if (t) {
+		/******/ r ||= 0;
+		/******/ for (var i = deferred.length; i > 0 && deferred[i - 1][2] > r; i--) deferred[i] = deferred[i - 1];
 		/******/ deferred[i] = [
-			chunkIds,
-			fn,
-			priority
+			t,
+			n,
+			r
 		];
 		/******/ return;
 	}
-	/******/ for (var notFulfilled = 1 / 0, i = 0; i < deferred.length; i++) {
-		/******/ for (var chunkIds = deferred[i][0], fn = deferred[i][1], priority = deferred[i][2], fulfilled = !0, j = 0; j < chunkIds.length; j++) /******/ (!1 & priority || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) {
-			return __webpack_require__.O[key](chunkIds[j]);
-		}) ? chunkIds.splice(j--, 1) : /******/ (fulfilled = !1, priority < notFulfilled && (notFulfilled = priority));
-		/******/ if (fulfilled) {
+	/******/ for (var a = Infinity, i = 0; i < deferred.length; i++) {
+		/******/ for (var t = deferred[i][0], n = deferred[i][1], r = deferred[i][2], o = !0, s = 0; s < t.length; s++)
+ /******/ (r & !1 || a >= r) && Object.keys(__webpack_require__.O).every(function(e) {
+			return __webpack_require__.O[e](t[s]);
+		}) ? t.splice(s--, 1) : 
+		/******/ (o = !1, r < a && (a = r));
+		/******/ if (o) {
 			/******/ deferred.splice(i--, 1);
-			/******/ var r = fn
... [truncated]
```

```js
// oxc, second pass
__webpack_require__.O = function(e, t, n, r) {
	/******/ if (t) {
		/******/ r ||= 0;
		/******/ for (var i = deferred.length; i > 0 && deferred[i - 1][2] > r; i--) deferred[i] = deferred[i - 1];
		/******/ deferred[i] = [
			t,
			n,
			r
		];
		/******/ return;
	}
	/******/ for (var a = Infinity, i = 0; i < deferred.length; i++) {
		/******/ for (var t = deferred[i][0], n = deferred[i][1], r = deferred[i][2], o = !0, s = 0; s < t.length; s++)
 /******/ (r & !1 || a >= r) && Object.keys(__webpack_require__.O).every(function(e) {
			return __webpack_require__.O[e](t[s]);
		}) ? t.splice(s--, 1) : (o = !1, r < a && (a = r));
		/******/ if (o) {
			/******/ deferred.splice(i--, 1);
			/******/ var c = n();
			/******/ c !== void 0 && (e = c);
		}
	}
	/******/ return e;
	/******/
};

```

## `terser/drop_unused/issue_1715_4`


```js
var a = 1;
!(function a() {
	a++;
	try {
		x();
	} catch (a) {
		var a;
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 var a = 1;
-!function() {
+(function a() {
+	a++;
 	try {
 		x();
 	} catch (a) {}
-}();
+})();
 console.log(a);

```

```js
// oxc, second pass
var a = 1;
(function a() {
	a++;
	try {
		x();
	} catch {}
})();
console.log(a);

```

## `terser/evaluate/issue_1760_1`


```js
!(function(a) {
	try {
		throw 0;
	} catch (NaN) {
		a = +'foo';
	}
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-!function(a) {
+(function(a) {
 	try {
 		throw 0;
-	} catch (NaN) {
+	} catch {
 		a = 0 / 0;
 	}
 	console.log(a);
-}();
+})();

```

```js
// oxc, second pass
(function(a) {
	try {
		throw 0;
	} catch {
		a = NaN;
	}
	console.log(a);
})();

```

## `terser/evaluate/issue_1760_2`


```js
!(function(a) {
	try {
		throw 0;
	} catch (Infinity) {
		a = 123456789 / 0;
	}
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-!function(a) {
+(function(a) {
 	try {
 		throw 0;
-	} catch (Infinity) {
-		a = 1 / 0;
+	} catch {
+		a = 123456789 / 0;
 	}
 	console.log(a);
-}();
+})();

```

```js
// oxc, second pass
(function(a) {
	try {
		throw 0;
	} catch {
		a = Infinity;
	}
	console.log(a);
})();

```

## `uglify/classes/retain_declaration`


```js
'use strict';
var a = 'FAIL';
try {
	console.log(function() {
		return a;
		class a {}
	}());
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -3,8 +3,7 @@
 try {
 	console.log(function() {
 		return a;
-		class a {}
 	}());
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

```js
// oxc, second pass
'use strict';
var a = 'FAIL';
try {
	console.log(function() {
		return 'FAIL';
	}());
} catch {
	console.log('PASS');
}

```

## `uglify/drop-unused/issue_1715_4`


```js
var a = 1;
!function a() {
	a++;
	try {
		x();
	} catch (a) {
		var a;
	}
}();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,8 @@
 var a = 1;
-!function() {
+(function a() {
 	a++;
 	try {
 		x();
-	} catch (a) {
-		var a;
-	}
-}();
+	} catch (a) {}
+})();
 console.log(a);

```

```js
// oxc, second pass
var a = 1;
(function a() {
	a++;
	try {
		x();
	} catch {}
})();
console.log(a);

```

## `uglify/drop-unused/issue_3746`


```js
try {
	A;
} catch (e) {
	var e;
}
(function f(a) {
	e = a;
})();
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,4 @@
 try {
 	A;
-} catch (e) {
-	var e;
-}
-(function(a) {
-	e = a;
-})();
+} catch (e) {}
 console.log('PASS');

```

```js
// oxc, second pass
try {
	A;
} catch {}
console.log('PASS');

```

## `uglify/evaluate/issue_1760_1`


```js
!function(a) {
	try {
		throw 0;
	} catch (NaN) {
		a = +'foo';
	}
	console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-!function(a) {
+(function(a) {
 	try {
 		throw 0;
-	} catch (NaN) {
+	} catch {
 		a = 0 / 0;
 	}
 	console.log(a);
-}();
+})();

```

```js
// oxc, second pass
(function(a) {
	try {
		throw 0;
	} catch {
		a = NaN;
	}
	console.log(a);
})();

```

## `uglify/evaluate/issue_1760_2`


```js
!function(a) {
	try {
		throw 0;
	} catch (Infinity) {
		a = 123456789 / 0;
	}
	console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-!function(a) {
+(function(a) {
 	try {
 		throw 0;
-	} catch (Infinity) {
-		a = 1 / 0;
+	} catch {
+		a = 123456789 / 0;
 	}
 	console.log(a);
-}();
+})();

```

```js
// oxc, second pass
(function(a) {
	try {
		throw 0;
	} catch {
		a = Infinity;
	}
	console.log(a);
})();

```

## `uglify/ie/issue_3482_1`


```js
try {
	throw 42;
} catch (NaN) {
	var a = +'a';
}
console.log(a, NaN, 0 / 0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	throw 42;
-} catch (NaN) {
+} catch {
 	var a = 0 / 0;
 }
 console.log(a, NaN, NaN);

```

```js
// oxc, second pass
try {
	throw 42;
} catch {
	var a = NaN;
}
console.log(a, NaN, NaN);

```

## `uglify/ie/issue_3482_1_ie8`


```js
try {
	throw 42;
} catch (NaN) {
	var a = +'a';
}
// IE8: NaN 42 NaN
console.log(a, NaN, 0 / 0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 try {
 	throw 42;
-} catch (NaN) {
+} catch {
 	var a = 0 / 0;
 }
-console.log(a, NaN, 0 / 0);
+// IE8: NaN 42 NaN
+console.log(a, NaN, NaN);

```

```js
// oxc, second pass
try {
	throw 42;
} catch {
	var a = NaN;
}
// IE8: NaN 42 NaN
console.log(a, NaN, NaN);

```

## `uglify/ie/issue_3482_2`


```js
(function() {
	try {
		throw 42;
	} catch (NaN) {
		a = +'a';
	}
})();
console.log(a, NaN, 0 / 0);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 (function() {
 	try {
 		throw 42;
-	} catch (NaN) {
+	} catch {
 		a = 0 / 0;
 	}
 })();

```

```js
// oxc, second pass
(function() {
	try {
		throw 42;
	} catch {
		a = NaN;
	}
})();
console.log(a, NaN, NaN);

```

## `uglify/ie/issue_3482_2_ie8`


```js
(function() {
	try {
		throw 42;
	} catch (NaN) {
		a = +'a';
	}
})();
console.log(a, NaN, 0 / 0);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 (function() {
 	try {
 		throw 42;
-	} catch (NaN) {
+	} catch {
 		a = 0 / 0;
 	}
 })();
-console.log(a, NaN, 0 / 0);
+console.log(a, NaN, NaN);

```

```js
// oxc, second pass
(function() {
	try {
		throw 42;
	} catch {
		a = NaN;
	}
})();
console.log(a, NaN, NaN);

```

## `uglify/ie/issue_4186`


```js
function f() {
	(function NaN() {
		var a = 1;
		while (a--) try {} finally {
			console.log(0 / 0);
			var b;
		}
	})(f);
}
f();
NaN;

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-(function() {
-	(function NaN() {
-		var n = 1;
-		while (n--) console.log(0 / 0);
-	})();
-})();
-NaN;
+function e() {
+	(function() {
+		var e = 1;
+		for (; e--;) console.log(0 / 0);
+	})(e);
+}
+e();

```

```js
// oxc, second pass
function e() {
	(function() {
		var e = 1;
		for (; e--;) console.log(NaN);
	})(e);
}
e();

```

## `uglify/side_effects/issue_3983_2`


```js
var a = 'PASS';
function f() {
	g && g();
}
f();
function g() {
	0 ? a : 0;
}
var b = a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS');
+var e = 'PASS';
+function t() {}
+function n() {}
+console.log(e);

```

```js
// oxc, second pass
console.log('PASS');

```

