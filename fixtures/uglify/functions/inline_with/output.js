while (console.log("foo"));
with (-function() {
    while (console.log("bar"));
}()) {
    while (console.log("baz"));
}
