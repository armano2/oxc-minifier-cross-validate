(function(a, b) {
    (a => {
        console.log(arguments[0], a);
    })(b);
})("foo", "bar");
