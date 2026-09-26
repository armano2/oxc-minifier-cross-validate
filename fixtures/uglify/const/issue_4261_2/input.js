{
    const a = 42;
    (function() {
        function f() {
            console.log(a);
        }
        function g() {
            while (f());
        }
        (function() {
            while (g());
        })();
    })();
}
