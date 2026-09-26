var f = function(a) {
    return function() {
        console.log(a);
    }();
};
f("PASS");
