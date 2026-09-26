log = function(fn) {
    console.log(typeof fn());
};
function a() {}
function f() {
    return a;
}
while (log(f));
