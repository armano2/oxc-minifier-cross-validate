# pass-1 / smaller — Output shorter than expected (possible over-optimization / bug)

Fixtures: 2

[← pass-1](README.md) · [← all families](../README.md)

## `pass-1/7`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 64 vs reference 66 (-2 bytes)

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
 export function foo(i) {
-	var a;
-	return (a = i()).x() + a.y();
+	var b = i();
+	return b.x() + b.y();
 }

```

## `pass-1/issue-6405/1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 28 vs reference 114 (-86 bytes)

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
+export const fn = () => {};

```

