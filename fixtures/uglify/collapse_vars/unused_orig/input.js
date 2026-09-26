var a = 1;
console.log(function(b) {
    var a;
    var c = b;
    for (var d in c) {
        var a = c[0];
        return --b + a;
    }
    try {
    } catch (e) {
        --b + a;
    }
    a && a.NaN;
}([2]), a);
