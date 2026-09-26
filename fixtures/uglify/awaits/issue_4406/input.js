A = "PASS";
B = "FAIL";
(function() {
    var a, b;
    a = A;
    (async function({
        [console.log(a)]: {},
    }) {})((b = B) && { undefined: b });
})();
