do (function() {
    while (console.log("foo"));
})();
while (function() {
    while (console.log("bar"));
}());
