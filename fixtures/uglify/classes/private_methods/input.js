new class A {
    static *#f() {
        yield A.#p * 3;
    }
    async #g() {
        for (var a of A.#f())
            return a * await 2;
    }
    static get #p() {
        return 7;
    }
    get q() {
        return this.#g();
    }
}().q.then(console.log);
