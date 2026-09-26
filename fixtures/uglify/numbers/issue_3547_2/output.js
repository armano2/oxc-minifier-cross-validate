[
    "1" + 1/0 + 0,
    NaN,
    -1/0,
    -1/0,
].forEach(function(n) {
    console.log(typeof n, n);
});
