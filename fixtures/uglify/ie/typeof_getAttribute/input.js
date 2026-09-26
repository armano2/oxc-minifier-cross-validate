document = {
    createElement: function() {
        return {
            getAttribute: function() {},
        };
    },
    write: console.log,
};
document.write(function(element) {
    if (element)
        return "undefined" === typeof element.getAttribute;
}(document.createElement("foo")) ? "FAIL" : "PASS");
