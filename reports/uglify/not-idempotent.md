# uglify / not-idempotent — Not idempotent (re-compressing changes the output)

Fixtures: 4

[← uglify](README.md) · [← all families](../README.md)

## `uglify/drop-unused/drop_duplicated_var_catch`

- tags: `remove unused`

```js
function f() {
	try {
		x();
	} catch (a) {
		var a, a;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 function f() {
 	try {
 		x();
-	} catch (a) {
-		var a;
-	}
+	} catch (a) {}
 }

```

```js
// oxc, second pass
function f() {
	try {
		x();
	} catch {}
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

