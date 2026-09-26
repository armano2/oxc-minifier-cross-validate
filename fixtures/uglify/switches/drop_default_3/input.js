function f() {
    console.log("PASS");
    return 42;
}
switch (42) {
  case f():
    break;
  case void console.log("FAIL"):
  default:
}
