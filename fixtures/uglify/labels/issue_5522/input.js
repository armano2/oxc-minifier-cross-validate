console.log(function() {
    L: try {
        return "FAIL";
    } finally {
        break L;
    }
    return "PASS";
}());
