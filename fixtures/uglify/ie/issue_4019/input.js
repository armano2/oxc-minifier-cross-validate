var a = function() {
    try {
        console.log("FAIL");
    } catch (b) {}
}, a = (console.log(a.length), ++a);
