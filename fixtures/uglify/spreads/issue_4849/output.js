while (function() {
    while (!console);
}(function(a) {
    console.log(typeof { ...function() {} });
}()));
