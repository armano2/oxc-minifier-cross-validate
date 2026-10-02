# pass-1 / whitespace — Output longer after whitespace removal

Fixtures: 1

[← pass-1](README.md) · [← all families](../README.md)

## `pass-1/10`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `1 iteration`

```js
export function fe(e, r, t, n) {
	var i;
	var s, f = J.getViewPointer(r, !1), u = f.view;
	if (!(s = f.address)) throw new Error('Unknown ArrayBuffer address');
	if ('number' == typeof n && -1 !== n && 4294967295 !== n || (n = u.byteLength - t), 0 === (n >>>= 0)) return u;
	i = new Uint8Array(u.buffer, u.byteOffset + t, n);
	o = new Uint8Array(a.buffer);
	return e ? o.set(i, s) : i.set(o.subarray(s, s + n)), u;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 export function fe(e, r, t, n) {
 	var i, s, f = J.getViewPointer(r, !1), u = f.view;
 	if (!(s = f.address)) throw Error('Unknown ArrayBuffer address');
-	return 'number' == typeof n && -1 !== n && 4294967295 !== n || (n = u.byteLength - t), 0 == (n >>>= 0) || (i = new Uint8Array(u.buffer, u.byteOffset + t, n), o = new Uint8Array(a.buffer), e ? o.set(i, s) : i.set(o.subarray(s, s + n))), u;
+	return typeof n == 'number' && n !== -1 && n !== 4294967295 || (n = u.byteLength - t), (n >>>= 0) == 0 || (i = new Uint8Array(u.buffer, u.byteOffset + t, n), o = new Uint8Array(a.buffer), e ? o.set(i, s) : i.set(o.subarray(s, s + n))), u;
 }

```

