class A {
    p = "foo";
    #q = "bar";
    f() {
        console.log(this.p, this.#q);
    }
}
class B {
    #r = "moo";
    #g() {
        return "baz";
    }
    h() {
        console.log(this.#r, this.#g());
    }
}
new A().f();
new B().h();
