console.log(function() {
    if (function() {
        while (console.log("foo"));
        return "bar";
    }()) {
        while (console.log("baz"));
        return void "moo";
        return;
    } else
        return void 0;
}());
