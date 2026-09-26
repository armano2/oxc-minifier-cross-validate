var a = 0;
a = (a = this).A;
A = 1;
a ? console.log("FAIL") : console.log("PASS");
