var a = "PASS";
function f() {
    return {
        then: function(r) {
            a = "FAIL";
            r();
        },
    };
}
(async function() {
    f(), await 42;
    while (console.log(a));
})();
