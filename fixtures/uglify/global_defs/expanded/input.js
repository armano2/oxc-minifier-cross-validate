function f(CONFIG) {
    // CONFIG not global - do not replace
    return CONFIG.VALUE;
}
function g() {
    var CONFIG = { VALUE: 1 };
    // CONFIG not global - do not replace
    return CONFIG.VALUE;
}
function h() {
    return CONFIG.VALUE;
}
if (CONFIG.DEBUG[0])
    console.debug("foo");
