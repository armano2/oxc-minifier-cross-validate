(function(a) {
    (console ? a : []).push(1);
    if (a.length)
        console.log("PASS");
})([]);
