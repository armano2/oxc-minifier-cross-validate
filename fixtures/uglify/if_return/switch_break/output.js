function f(a) {
    switch (a) {
      default:
        if (console.log("foo"))
            break;
        while (console.log("bar"));
      case 42:
        if (!console.log("baz"))
            while (console.log("moo"));
        break;
      case null:
        console.log("moz");
    }
}
f();
f(42);
f(null);
