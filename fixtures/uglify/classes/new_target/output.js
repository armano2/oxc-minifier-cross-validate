console.log(typeof new class {
    constructor() {
        this.f = () => new.target;
    }
}().f());
