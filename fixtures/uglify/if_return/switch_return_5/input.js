function f(a) {
    switch (console.log("foo")) {
      case console.log("bar"):
        if (a)
            return;
        return;
        break;
      case null:
        FAIL;
    }
}
f();
f(42);
