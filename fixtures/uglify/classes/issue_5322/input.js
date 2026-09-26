var a = 41;
class A {
    static p() {
        console.log(++a);
    }
    static q = this.p();
}
