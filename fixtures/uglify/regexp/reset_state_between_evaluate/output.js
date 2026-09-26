console.log(function() {
    for (var a in /[abc4]/g.exec("a"))
        return "PASS";
    return "FAIL";
}());
