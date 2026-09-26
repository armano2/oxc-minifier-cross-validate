var log = console.log;
(function(a) {
    return a.length ? log(...a) : log("FAIL");
})([ "PASS" ]);
