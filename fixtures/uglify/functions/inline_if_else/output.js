while (console.log("foo"));
if (function() {
    while (console.log("bar"));
}()) {
    while (console.log("baz"));
} else {
    while (console.log("moo"));
}
