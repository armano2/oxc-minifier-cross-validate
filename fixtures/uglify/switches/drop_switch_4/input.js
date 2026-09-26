var a = "FAIL";
switch (0) {
  default:
  case a:
    var b = a = "PASS";
    break;
}
console.log(a);
