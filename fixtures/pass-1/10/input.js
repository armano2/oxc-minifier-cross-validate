export function fe(e, r, t, n) {
    var i;
    var s, f = J.getViewPointer(r, !1), u = f.view;
    if (!(s = f.address)) throw new Error("Unknown ArrayBuffer address");
    if ("number" == typeof n && -1 !== n && 4294967295 !== n || (n = u.byteLength - t), 0 === (n >>>= 0)) return u;
    i = new Uint8Array(u.buffer, u.byteOffset + t, n);
    o = new Uint8Array(a.buffer);
    return e ? o.set(i, s) : i.set(o.subarray(s, s + n)), u;
}
