[
    "1" + 1/0 + 0,
    "1" + 1/0 - 0,
    "1" - 1/0 + 0,
    "1" - 1/0 - 0,
].forEach(function(n) {
    console.log(typeof n, n);
});
