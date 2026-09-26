var c = 0;
(function() {
    if ([ ][c++]); else return;
    return void function() {
        var b = --b, a = c = 42;
        return c;
    }();
})();
console.log(c);
