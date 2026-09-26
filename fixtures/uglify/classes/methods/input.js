"use strict";
class A {
    static f() {
        return "foo";
    }
    *g() {
        yield A.f();
        yield "bar";
    }
}
for (var a of new A().g())
    console.log(a);
