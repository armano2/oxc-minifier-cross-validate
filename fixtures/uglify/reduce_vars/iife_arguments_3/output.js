(function() {
    console.log(function x() {
        return x;
    }() === arguments[0]);
})();
