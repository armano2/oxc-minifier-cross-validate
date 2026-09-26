var c = "FAIL";
(function() {
    var a = 0;
    switch ((a = {}) && (a.b = 0)) {
      case 0:
        c = "PASS";
    }
})();
console.log(c);
