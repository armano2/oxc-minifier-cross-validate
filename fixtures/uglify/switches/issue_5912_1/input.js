var a = {};
a = a.p;
switch (console) {
  case 42:
    a.q;
}
try {
    a.r;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
