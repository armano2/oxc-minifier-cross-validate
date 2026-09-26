(function f(a) {
    ({
        get p() {
            switch (1) {
              case 0:
                f();
              case 1:
                console.log(b || "PASS");
            }
            var b;
        }
    }).p;
})();
