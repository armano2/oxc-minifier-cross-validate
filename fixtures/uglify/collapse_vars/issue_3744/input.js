(function f(a) {
    ({
        get p() {
            switch (1) {
              case 0:
                f((a = 2, 3));
              case 1:
                console.log(function g(b) {
                    return b || "PASS";
                }());
            }
        }
    }).p;
})();
