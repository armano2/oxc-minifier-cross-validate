(function(a, b) {
    if (b = a.shift())
        console.log(b);
    else {
        if (b = a.shift())
            while (console.log("foo"));
        console.log(b);
    }
})([ false, "bar" ]);
