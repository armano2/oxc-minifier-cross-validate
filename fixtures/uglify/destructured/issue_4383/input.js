console.log(function(a) {
    [ a[0] ] = [];
    return a.length;
}([]));
