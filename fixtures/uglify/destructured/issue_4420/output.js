console.log(function() {
    var a = 1;
    try {
        throw [ "FAIL", "PASS" ];
    } catch ({
        [a]: b,
    }) {
        return b;
    }
}());
