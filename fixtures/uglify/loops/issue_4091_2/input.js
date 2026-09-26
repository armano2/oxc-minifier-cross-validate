try {
    throw "FAIL";
} catch (e) {
    for (e in 42);
    var e;
}
console.log(e && e);
