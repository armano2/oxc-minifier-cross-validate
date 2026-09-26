var c = 0;
L: do {
    for (;;) continue L;
    var b = 1;
} while (b && c++);
console.log(c);
