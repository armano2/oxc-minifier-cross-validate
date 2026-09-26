var a, b;
function f(c) {
    switch (c) {
      case 0:
        a = { p: 42 };

      case 1:
        b = a.p;
        console.log(b);
    }
}
f(0);
f(1);
