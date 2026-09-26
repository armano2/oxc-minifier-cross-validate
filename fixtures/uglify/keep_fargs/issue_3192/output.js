(function(a) {
    console.log(a = "foo", arguments[0]);
})("bar");
(function() {
    "use strict";
    console.log("foo", arguments[0]);
})("bar");
