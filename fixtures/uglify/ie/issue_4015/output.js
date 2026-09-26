var n, o = 0, c;
function t() {
    try {
        throw 0;
    } catch (c) {
        (function n() {
            (function c() {
                o++;
            })();
        })();
    }
}
t();
console.log(o);
