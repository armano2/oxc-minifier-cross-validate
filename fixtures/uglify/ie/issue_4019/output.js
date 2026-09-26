var o = function() {
    try {
        console.log("FAIL");
    } catch (o) {}
};
console.log(o.length),
++o;
