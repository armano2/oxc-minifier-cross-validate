var a = 0, b = 0;
--b;
a++;
if (!a)
    var c = function() {
        var d = 0;
        function f() {
            d && d.p;
        }
        f();
        this;
    }(a++);
console.log(a, b, c);
