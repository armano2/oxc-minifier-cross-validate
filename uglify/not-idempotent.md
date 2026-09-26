# uglify / not-idempotent — Not idempotent (re-compressing changes the output)

Fixtures: 11

[← uglify](README.md) · [← all families](../README.md)

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

