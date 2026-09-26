"use strict";
!function() {
    var a = function a() {
        return a && "a";
    };
    var b = function x() {
        return !!x;
    };
    var c = function(c) {
        return c;
    };
    if (c(b(a()))) {
        var d = function() {};
        var e = function y() {
            return typeof y;
        };
        var f = function(f) {
            return f;
        };
        console.log(a(d()), b(e()), c(f(42)), typeof d, e(), typeof f);
    }
}();
