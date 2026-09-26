function f(a) {
    switch (a = 1, arguments[0]) {
      case 1:
        return "PASS";
      case 2:
        return "FAIL";
    }
}
console.log(f(2));
