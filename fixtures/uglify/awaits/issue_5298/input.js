var a = "PASS";
(async function() {
    for (a in [ 42 in null ]);
})();
console.log(a);
