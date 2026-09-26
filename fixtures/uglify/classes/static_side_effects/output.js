var a = "FAIL 1";
(class {
    static c = a = "PASS";
});
console.log(a);
