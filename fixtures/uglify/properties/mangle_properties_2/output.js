var o = {
    o: 1,
};
Object.defineProperty(o, "p", {
    value: 2,
});
Object.defineProperties(o, {
    r: {
        value: 3,
    },
});
console.log("prop1", o.o, "o" in o);
console.log("prop2", o.p, o.hasOwnProperty("p"));
console.log("prop3", o.r, Object.getOwnPropertyDescriptor(o, "r").value);
