({
    p: null,
    q: (console.log("foo"), 42),
    p: function() {}
})[console.log("bar"), "p"] && console.log("PASS");
