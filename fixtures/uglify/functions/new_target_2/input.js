new function(a) {
    if (!new.target)
        console.log("FAIL");
    else if (a)
        console.log("PASS");
    else
        new new.target(new.target.length);
}();
