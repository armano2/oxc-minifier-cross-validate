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
    await void f();
    while (console.log(a));
})();
