class A {
    s = "foo";
    #s = "bar";
    o() {
        console.log(this.s, this.#s);
    }
}
class B {
    #s = "moo";
    #o() {
        return "baz";
    }
    e() {
        console.log(this.#s, this.#o());
    }
}
new A().o();
new B().e();
