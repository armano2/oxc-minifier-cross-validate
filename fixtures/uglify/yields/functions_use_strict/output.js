"use strict";
!function*() {
    function* a() {
        return a && "a";
    }
    function* b() {
        return !!b;
    }
    function* c(c) {
        return c;
    }
    if (yield* c(yield* b(yield* a()))) {
        var d = function*() {};
        var e = function* y() {
            return typeof y;
        };
        var f = function*(f) {
            return f;
        };
        console.log(yield* a(yield* d()), yield* b(yield* e()), yield* c(yield* f(42)), typeof d, yield* e(), typeof f);
    }
}().next();
