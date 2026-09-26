"use strict";
!async function() {
    async function a() {
        return a && "a";
    }
    async function b() {
        return !!b;
    }
    async function c(c) {
        return c;
    }
    if (await c(await b(await a()))) {
        var d = async function() {};
        var e = async function y() {
            return typeof y;
        };
        var f = async function(f) {
            return f;
        };
        console.log(await a(await d()), await b(await e()), await c(await f(42)), typeof d, await e(), typeof f);
    }
}();
