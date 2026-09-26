class A {
    static #P = "PASS";
    static get Q() {
        return this.#P;
    }
    #p(n) {
        return (this["q"] = n) * this.r;
    }
    set q(v) {
        this.r = v + 1;
    }
    r = this.#p(6);
}
console.log(A.Q, new A().r);
