try {
    var a = "FAIL";
} finally {
    for (;!a;)
        var c = a++;
    var a = "PASS", b = c = "PASS";
}
console.log(a, b);
