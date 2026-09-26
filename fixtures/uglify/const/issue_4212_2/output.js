console.log({
    get b() {
        const a = 0;
        return a /= 0;
    }
}.b);
