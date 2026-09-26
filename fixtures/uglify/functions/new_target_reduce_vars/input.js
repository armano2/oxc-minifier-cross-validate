new function(a) {
    if (a)
        console.log("PASS");
    else
        new new.target(new.target.length);
}(0);
