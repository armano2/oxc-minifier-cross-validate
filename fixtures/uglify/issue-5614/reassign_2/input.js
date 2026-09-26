var a = "PASS";
if (false) {
    a = null + 0;
    a();
}
console.log(a);
