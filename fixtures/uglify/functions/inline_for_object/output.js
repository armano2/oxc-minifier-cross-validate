while (console.log("foo"));
for (var a in function() {
    while (console.log("bar"));
}()) {
    while (console.log("baz"));
}
