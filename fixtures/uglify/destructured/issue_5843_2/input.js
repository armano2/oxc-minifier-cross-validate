var a;
({ p: a } = {
    __proto__: {
        p: "PASS",
    },
});
console.log(a);
