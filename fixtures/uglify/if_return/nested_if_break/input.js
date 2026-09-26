for (var i = 0; i < 3; i++)
    L1: if ("number" == typeof i) {
        if (0 === i) break L1;
        console.log(i);
    }
