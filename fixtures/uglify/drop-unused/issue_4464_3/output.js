(function(a) {
    a = function() {};
    return [ arguments[0], a ];
})(42).forEach(function(b) {
    console.log(typeof b);
});
