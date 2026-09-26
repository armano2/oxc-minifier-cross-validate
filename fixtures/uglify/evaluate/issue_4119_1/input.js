var a, b;
b = a = [];
a[0] += 0;
if (+b + 1) {
    console.log("FAIL");
} else {
    console.log("PASS");
}
