var c = 0;
!function a() {
    a && c++;
    var a;
    (a = 0) && c++;
}();
console.log(c);
