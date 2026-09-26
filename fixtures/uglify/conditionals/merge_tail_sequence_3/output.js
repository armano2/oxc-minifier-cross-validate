(function(a, b) {
    if (b = a.shift())
        console.log("foo");
    else if (b = a.shift())
        while (console.log("bar"));
    console.log(b);
})([ false, "baz" ]);
