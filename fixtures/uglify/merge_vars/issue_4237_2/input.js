console.log(function(a) {
    do {
        switch (0) {
          case 0:
            var b = a++;
          default:
            while (b)
                return "FAIL";
        }
        try {
            var c = 0;
        } finally {
            continue;
        }
        var d = 0;
    } while ("undefined" != typeof d);
    return "PASS";
}(0));
