var a = "1";
[
    2 - a + 3,
    2 - a - 3,
    -a - 2 + 3,
    -a - 2 - 3,
    2 - a + 3,
    2 - a - 3,
    2 - -a + 3,
    2 - -a - 3,
    5 - a,
    5 - -a,
    -1 - a,
    -1 - -a,
].forEach(function(n) {
    console.log(typeof n, n);
});
