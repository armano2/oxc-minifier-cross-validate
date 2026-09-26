var a, b;
b = a = {
    p: 42,
};
delete a.p;
console.log((b, 0, "PASS"));
