var o = {
    __proto__: { p: 42 },
    ... {
        set __proto__(v) {},
    },
};
console.log(o.__proto__ === Object.getPrototypeOf(o) ? "FAIL" : "PASS");
console.log(o.p);
