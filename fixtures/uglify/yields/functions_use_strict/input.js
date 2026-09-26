"use strict";
!function*() {
    var a = function* a() {
        return a && "a";
    };
    var b = function* x() {
        return !!x;
    };
    var c = function*(c) {
        return c;
    };
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
