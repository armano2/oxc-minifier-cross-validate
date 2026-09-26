console.log(null == Object.getPrototypeOf({
    ... {
        __proto__: (console.log(42), null),
    },
}) ? "FAIL" : "PASS");
