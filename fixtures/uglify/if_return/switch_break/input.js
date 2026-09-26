function f(a) {
    switch (a) {
      default:
        if (console.log("foo"))
            break;
        while (console.log("bar"));
      case 42:
        if (console.log("baz"))
            break;
        while (console.log("moo"));
        break;
      case null:
        if (console.log("moz"))
            break;
    }
}
f();
f(42);
f(null);
