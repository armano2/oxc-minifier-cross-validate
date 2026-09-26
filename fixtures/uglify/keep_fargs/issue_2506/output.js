var c = 0;
function f0(bar) {
    (function() {
        (function() {
            if (false <= 0/0 & this >> 1 >= 0)
                c++;
        })(c++);
    })();
}
f0(false);
console.log(c);
