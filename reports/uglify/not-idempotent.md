# uglify / not-idempotent — Not idempotent (re-compressing changes the output)

Fixtures: 6

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

- tags: `remove unused`

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

- tags: `remove unused`

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

## `uglify/side_effects/issue_3983_2`

- tags: `join vars`, `remove unused`, `2 iterations`

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
+var a = 'PASS';
+function f() {}
+function g() {}
+console.log(a);

```

```js
// oxc, second pass
console.log('PASS');

```

