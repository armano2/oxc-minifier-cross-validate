console.log(function() {
    return () => arguments[0];
}("PASS")("FAIL"));
