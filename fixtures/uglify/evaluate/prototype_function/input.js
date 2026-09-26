function v() {
    return this.valueOf === v ? "PASS" : "FAIL";
}
console.log(({ valueOf: v }) < 1);
console.log(({ valueOf: v }) + "");
console.log((( {valueOf: v }) + "")[2]);
console.log(({ valueOf: v }).valueOf());
function t() {
    return this.toString === t ? "PASS" : "FAIL";
}
console.log(({ toString: t }) < 1);
console.log(({ toString: t }) + "");
console.log((( {toString: t }) + "")[2]);
console.log(({ toString: t }).toString());
