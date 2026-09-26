(function() {
    var abc = function f() {
        (function() {
            switch (f) {
              default:
                var abc = 0;
              case 0:
                abc.p;
            }
            console.log(typeof f);
        })();
    };
    typeof abc && abc();
})();
