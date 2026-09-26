while (function() {
    while (!console);
}(new function(a) {
    console.log(typeof { ...a });
}(function() {})));
