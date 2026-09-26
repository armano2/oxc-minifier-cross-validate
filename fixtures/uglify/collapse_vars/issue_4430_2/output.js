function f(a) {
    switch (arguments[a = 0]) {
      case 0:
        return "PASS";
      case 1:
        return "FAIL";
    }
}
console.log(f(1));
