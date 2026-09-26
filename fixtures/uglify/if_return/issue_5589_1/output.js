function f(a) {
    switch (a) {
      case 42:
        if (console.log("PASS"))
            return 0;
        break;
      case null:
        FAIL;
    }
}
f(42);
