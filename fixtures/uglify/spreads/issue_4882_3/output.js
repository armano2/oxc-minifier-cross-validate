var o = {
    __proto__: { p: 42 },
    ["__proto__"]: void 0,
};
console.log(o.__proto__ === Object.getPrototypeOf(o) ? "FAIL" : "PASS");
console.log(o.p);
