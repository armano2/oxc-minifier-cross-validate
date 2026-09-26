var a = 0, b;
if (++a)
    new class {
        p = b = null;
        constructor(c) {
            console.log(c ? "FAIL" : "PASS");
        }
    }(b, 1);
