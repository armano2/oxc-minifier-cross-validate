var a = "2";
[
    "3" + a + 1,
    "3" + a - 1,
    "3" - a + 1,
    "3" - a - 1,
].forEach(function(n) {
    console.log(typeof n, n);
});
