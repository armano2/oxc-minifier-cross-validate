!function() {
    console.log(function() {
        L: {
            if (2) break L;
            return 1;
        }
    }());
}();
