try {
    throw "FAIL";
} catch (e) {
    for (var e in 42);
}
console.log(e && e);
