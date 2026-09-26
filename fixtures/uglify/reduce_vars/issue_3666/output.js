try {
    var a = "FAIL";
} finally {
    for (;!a;)
        a++;
    a = "PASS";
}
console.log(a, "PASS");
