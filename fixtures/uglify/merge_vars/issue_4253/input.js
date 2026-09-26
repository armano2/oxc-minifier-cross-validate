switch (0) {
  default:
    var a = "FAIL";
    a = a && a;
    try {
        break;
    } catch (e) {}
    var b = 42;
}
console.log(b);
