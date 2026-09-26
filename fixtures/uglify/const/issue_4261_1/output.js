{
    const a = 42;
    (function() {
        function g() {
            while (void console.log(a));
        }
        (function() {
            while (g());
        })();
    })();
}
