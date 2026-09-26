"use strict";
console.log({
    get b() {
        let a = 0;
        return a / 0;
    }
}.b);
