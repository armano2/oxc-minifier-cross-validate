for (console.log("foo") || function() {
    while (console.log("bar"));
}(); console.log("baz") ;);
