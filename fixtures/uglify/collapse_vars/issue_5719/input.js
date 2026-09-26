var a = 42, b;
switch (b = a) {
  case a:
  case b:
  case a++:
}
console.log(a === b++ ? "PASS" : "FAIL");
