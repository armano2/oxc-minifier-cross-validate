# swc / not-idempotent — Not idempotent (re-compressing changes the output)

Fixtures: 2

[← swc](README.md) · [← all families](../README.md)

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

