var a = 1;
(function() {
    a-- && a-- && (a = "FAIL");
})();
console.log(a);
