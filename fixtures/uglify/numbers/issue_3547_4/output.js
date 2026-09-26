var a = "2";
[
    "3" + a + 1,
    "3" + a - 1,
    4 - a,
    2 - a,
].forEach(function(n) {
    console.log(typeof n, n);
});
