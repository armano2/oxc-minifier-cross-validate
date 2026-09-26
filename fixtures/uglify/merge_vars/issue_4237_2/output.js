console.log(function(a) {
    do {
        switch (0) {
          default:
            var b = a++;
            if (b)
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
