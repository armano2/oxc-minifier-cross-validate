var a = 42;
({ p: a.q } = a = "PASS");
console.log(a);
