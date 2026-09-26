var a = 1;
console.log(function() {
    return a-- ? a-- ? "FAIL 1" : "PASS" : "FAIL 2";
}());
