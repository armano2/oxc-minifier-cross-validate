var a = "3";
[
    a + "21",
    a + "2" - 1,
    a - 1,
    a - 3,
].forEach(function(n) {
    console.log(typeof n, n);
});
