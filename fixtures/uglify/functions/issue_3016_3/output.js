var b = 1;
do {
    console.log((a = void 0, a ? "FAIL" : "PASS"));
} while (b--);
var a;
