function f() {
    console.log("PASS");
    return 42;
}
switch (42) {
  case f():
  case void console.log("FAIL"):
}
