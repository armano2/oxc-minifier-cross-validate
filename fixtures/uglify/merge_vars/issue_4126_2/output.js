try {
    var a = (b = 0, void THROW(b));
} catch (e) {
    console.log(a);
}
function f() {}
var b;
