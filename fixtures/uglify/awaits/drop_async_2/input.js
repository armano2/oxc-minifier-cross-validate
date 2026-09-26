console.log(function(a) {
    (async b => await (a *= b))(7);
    return a;
}(6));
