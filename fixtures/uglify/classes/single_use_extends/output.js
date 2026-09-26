"use strict";
console.log(new class extends class {
    f() {
        return "PASS";
    }
} {}().f());
