console.log(function() {
    var a = 1;
    try {
        throw [ "FAIL", "PASS" ];
    } catch ({
        [a]: b,
    }) {
        let a = 0;
        return b;
    }
}());
