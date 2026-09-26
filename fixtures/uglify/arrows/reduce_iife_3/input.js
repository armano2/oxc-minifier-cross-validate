var a = "foo";
(() => {
    console.log(a);
    console.log(a);
})();
a = "bar";
