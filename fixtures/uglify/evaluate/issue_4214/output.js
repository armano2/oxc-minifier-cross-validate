var c = function(a) {
    return function() {
        try {
            return a;
        } finally {}
    }(a++ && this());
}();
console.log(c);
