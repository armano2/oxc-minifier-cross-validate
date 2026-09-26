"use strict";
console.log(typeof function() {
    {
        let a;
    }
    {
        const a = function() {};
        return a;
    }
}());
