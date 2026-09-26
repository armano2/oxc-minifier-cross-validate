var log = console.log;
(function(b = "foo") {
    b.value = "FAIL";
    b;
    log(b.value);
})();
