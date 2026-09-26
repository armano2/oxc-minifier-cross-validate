var b = 0;
L: for (;++b < 2;)
    for (;1;)
        if (!b)
            continue L;
        else
            break L;
console.log(b);
