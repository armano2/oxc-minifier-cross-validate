function f(a) {
    switch (a) {
      case 42:
        if (!console.log("PASS"))
            return;
        return FAIL;
    }
}
f(42);
