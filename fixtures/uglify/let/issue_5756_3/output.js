"use strict";
console.log(function() {
    let a = "PASS";
    return function() {
        return a;
    };
}()());
