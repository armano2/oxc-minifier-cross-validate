for (function() {
    while (console.log("foo"));
}(); function() {
    while (console.log("bar"));
}(); function() {
    while (console.log("baz"));
}()) (function() {
    while (console.log("moo"));
})();
