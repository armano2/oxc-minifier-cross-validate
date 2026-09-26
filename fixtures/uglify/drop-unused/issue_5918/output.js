var a;
(function(b) {
    b.p = 42;
})(a = function() {
    arguments;
});
for (var i in a)
    console.log("PASS");
