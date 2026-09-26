"use strict";
(function() {
    var a = console;
    console.log(typeof a);
    {
        let a = function() {};
        a && console.log(typeof a);
    }
})();
