var o = {
    async [42]() {
        return this.p;
    },
    p: "PASS",
};
o[42]().then(console.log);
