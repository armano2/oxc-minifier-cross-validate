# pass-1 / larger — Output longer than expected (possible missing optimization)

Fixtures: 5

[← pass-1](README.md) · [← all families](../README.md)

## `pass-1/3`

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

## `pass-1/2`

- size: oxc 88 vs reference 33 (+55 bytes)

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
+	var e = 4, t = 12 * e, n = 60 * e, r = t / 3;
+	n - t, (t - r) / 2;
+})();

```

## `pass-1/9/2`

- size: oxc 93 vs reference 35 (+58 bytes)

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
+console.log('Greeting:', (function(e) {
+	return function() {
+		return e;
+	};
+})('Hello')());

```

## `pass-1/compute/1`

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
+function e() {
+	var e = [
+		94,
+		173,
+		190,
+		239
+	], t = 0;
+	return t |= e[0], t <<= 8, t |= e[1], t <<= 8, t |= e[2], t <<= 8, t |= e[3], t;
+}
+console.log(e().toString(16));

```

## `pass-1/9/1`

- size: oxc 166 vs reference 35 (+131 bytes)

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
+function e() {
+	function e(e) {
+		function t() {
+			return e;
+		}
+		return function() {
+			return t();
+		};
+	}
+	return e('Hello');
+}
+console.log('Greeting:', e()());

```

