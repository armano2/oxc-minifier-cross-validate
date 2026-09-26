A = console;
if ("undefined" == typeof A)
    console.log("FAIL 1");
else {
    A &&= void 0;
    while (console.log(void 0 === A ? "PASS" : "FAIL 2"));
}
