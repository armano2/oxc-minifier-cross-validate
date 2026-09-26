var b = function() {
    this.a = "FAIL";
}();
var a = "PASS";
var b;
var c = b;
console.log(a);
