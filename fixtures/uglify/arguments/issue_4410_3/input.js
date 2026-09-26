var a = 1;
(function f(b) {
    a-- && f();
    for (var c = 2; c--;)
        switch (arguments[0]) {
          case b = 42:
          case 42:
            console.log("PASS");
        }
})(null);
