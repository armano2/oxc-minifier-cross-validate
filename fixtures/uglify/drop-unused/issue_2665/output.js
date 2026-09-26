var a = 1;
(function g() {
    a-- && g();
})();
console.log(a);
