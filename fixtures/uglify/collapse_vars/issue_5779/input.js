var a = A = "foo";
a.p = 42;
if (a && !a.p)
    console.log("PASS");
