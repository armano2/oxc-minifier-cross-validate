var a = "3";
[
    a + "2" + 1,
    a + "2" - 1,
    a - "2" + 1,
    a - "2" - 1,
].forEach(function(n) {
    console.log(typeof n, n);
});
