(function(bar) {
    for (;bar();) break;
})(function() {
    return console.log("PASS"), 1;
});
