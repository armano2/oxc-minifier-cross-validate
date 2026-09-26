A = console;
if ("undefined" == typeof A)
    console.log("FAIL 1");
else (function() {
    A = void 0;
})(console.log(void 0 === A ? "FAIL 2" : "PASS"));
