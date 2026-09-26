var c = "FAIL";
(function() {
    var a = 0, a = { b: 0 };
    switch (a.b) {
      case 0:
        c = "PASS";
    }
})();
console.log(c);
