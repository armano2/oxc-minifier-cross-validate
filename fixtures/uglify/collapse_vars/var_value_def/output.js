function f(a) {
    while (1) {
        var b = a[0], c = a[1];
        if (c[0] - c[0] > c[1] - b[1]) break;
        return "PASS";
    }
    return "FAIL";
}
console.log(f([
    [ 1, 2 ],
    [ 3, 4 ],
]));
