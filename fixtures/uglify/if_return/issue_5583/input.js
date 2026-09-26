do {
    switch (console) {
      default:
        if (!console.log("foo"))
            continue;
        break;
      case console.log("bar"):
        FAIL;
    }
} while (console.log("baz"));
