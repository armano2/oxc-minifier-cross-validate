console.log(typeof class {
    static P = this;
    get p() {}
}.P);
