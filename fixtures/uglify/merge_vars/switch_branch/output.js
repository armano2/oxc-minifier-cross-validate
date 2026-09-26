console.log(function(a) {
    var b = "FAIL", c;
    switch (a) {
      case 1:
        c = b;
        break;
    }
    return c || "PASS";
}());
