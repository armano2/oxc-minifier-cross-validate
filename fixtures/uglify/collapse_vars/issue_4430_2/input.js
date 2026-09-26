function f(a) {
    switch (a = 0, arguments[0]) {
      case 0:
        return "PASS";
      case 1:
        return "FAIL";
    }
}
console.log(f(1));
