new function f() {
    console.log(new.target === f);
}();
console.log(function() {
    return new.target;
}());
