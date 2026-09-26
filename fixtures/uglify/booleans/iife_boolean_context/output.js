console.log(function() {
    return Object(1);
}() ? "PASS" : "FAIL");
console.log(function() {
    return [].length, 1;
}() ? "PASS" : "FAIL");
