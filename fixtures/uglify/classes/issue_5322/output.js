var a = 41;
(class {
    static p() {
        console.log(++a);
    }
    static q = this.p();
});
