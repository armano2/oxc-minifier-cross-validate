"use strict";
class A {
    static get p() {
        return "Foo";
    }
    static get q() {
        return super.p || 42;
    }
    constructor() {
        console.log("a.p", super.p, this.p);
        console.log("a.q", super.q, this.q);
    }
    get p() {
        return "foo";
    }
    get q() {
        return super.p || null;
    }
}
class B extends A {
    static get p() {
        return "Bar";
    }
    static get q() {
        return super.p;
    }
    constructor() {
        super();
        console.log("b.p", super.p, this.p);
        console.log("b.q", super.q, this.q);
    }
    get p() {
        return "bar";
    }
    get q() {
        return super.p;
    }
}
console.log("A", A.p, A.q);
console.log("B", B.p, B.q);
new B();
