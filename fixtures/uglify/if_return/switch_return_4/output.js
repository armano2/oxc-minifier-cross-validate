function f(a) {
    switch (a) {
      case console.log("foo"):
        console && console.log("bar");
        break;
      case 42:
        FAIL;
    }
}
f();
