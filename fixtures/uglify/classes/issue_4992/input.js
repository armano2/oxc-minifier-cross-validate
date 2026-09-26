class A {
    static P = this;
    get p() {}
}
console.log(typeof A.P);
