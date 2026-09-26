var c = 0;
(function(b) {
    while (--b) {
        b = NaN;
        switch (0 / this < 0) {
          case c++, false:
          case c++, NaN:
        }
    }
})(3);
console.log(c);
