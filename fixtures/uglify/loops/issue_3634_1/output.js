var b = 0;
L: for (;++b < 2;)
    for (;1;)
        if (b) break L;
console.log(b);
