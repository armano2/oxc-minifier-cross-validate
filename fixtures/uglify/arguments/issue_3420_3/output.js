"use strict";
var foo = function() {
    delete arguments[0];
};
foo();
