console.log(typeof function(a) {
    return class {
        p = a;
    };
}(console.log("PASS")));
