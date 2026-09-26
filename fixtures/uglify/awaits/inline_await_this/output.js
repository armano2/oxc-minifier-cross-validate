var p = "FAIL";
({
    p: "PASS",
    async f() {
        return await this.p;
    },
}).f().then(console.log);
