A = console;
"undefined" == typeof A ? console.log("FAIL 1") : function() {
    A = void 0;
}(console.log((A, false) ? "FAIL 2" : "PASS"));
