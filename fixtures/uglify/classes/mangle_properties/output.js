class A {
    static #t = "PASS";
    static get t() {
        return this.#t;
    }
    #s(t) {
        return (this["q"] = t) * this.s;
    }
    set q(t) {
        this.s = t + 1;
    }
    s = this.#s(6);
}
console.log(A.t, new A().s);
