console.log(function() {
    return Object(1) || false;
}() ? "PASS" : "FAIL");
console.log(function() {
    return [].length || true;
}() ? "PASS" : "FAIL");
