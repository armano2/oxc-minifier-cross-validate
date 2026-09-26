(function(a, b) {
    if (!(b = a.shift()) && (b = a.shift()))
        while (console.log("foo"));
    console.log(b);
})([ false, "bar" ]);
