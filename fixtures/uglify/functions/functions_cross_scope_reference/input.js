log = function(fn) {
    console.log(typeof fn());
};
var a = function() {};
function f() {
    return a;
}
while (log(f));
