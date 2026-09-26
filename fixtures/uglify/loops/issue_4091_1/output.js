try {
    throw "FAIL";
} catch (e) {
    var e;
}
console.log(e && e);
