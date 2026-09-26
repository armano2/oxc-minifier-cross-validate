function f(a) {
    while (1) {
        var b = a[0], c = a[1];
        d = b;
        e = c;
        if (c[0] - e[0] > c[1] - d[1]) break;
        return "PASS";
    }
    var d, e;
    return "FAIL";
}
console.log(f([
    [ 1, 2 ],
    [ 3, 4 ],
]));
