while (console.log("foo"));
for (; function() {
    while (console.log("bar"));
}(); function() {
    while (console.log("baz"));
}()) {
    while (console.log("moo"));
}
