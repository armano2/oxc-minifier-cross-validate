var c = 0;
(function(a, b) {
    function f2() {
        if (a) c++;
    }
    b = f2(),
    a = 1,
    f2();
})(),
console.log(c);
