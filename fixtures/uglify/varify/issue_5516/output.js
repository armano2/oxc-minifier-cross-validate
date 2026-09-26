"use strict";
console.log(typeof function() {
    {
        const a = function() {};
        return a;
    }
}());
