"use strict";
console.log(function() {
    return !function() {
        return this;
    }();
}());
