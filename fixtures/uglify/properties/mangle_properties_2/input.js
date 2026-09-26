var o = {
    prop1: 1,
};
Object.defineProperty(o, "prop2", {
    value: 2,
});
Object.defineProperties(o, {
    prop3: {
        value: 3,
    },
});
console.log("prop1", o.prop1, "prop1" in o);
console.log("prop2", o.prop2, o.hasOwnProperty("prop2"));
console.log("prop3", o.prop3, Object.getOwnPropertyDescriptor(o, "prop3").value);
