var b = 0;
L: while (++b < 2)
    while (1)
        if (!b)
            continue L;
        else
            break L;
console.log(b);
