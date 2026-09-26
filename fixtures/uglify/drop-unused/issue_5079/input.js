var a;
do {
    (a = 123456).p = a;
    a.q = null;
} while (console.log("PASS"));
