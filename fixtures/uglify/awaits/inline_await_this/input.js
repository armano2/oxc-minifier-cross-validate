var p = "FAIL";
({
    p: "PASS",
    async f() {
        return await (async () => this.p)();
    },
}).f().then(console.log);
