console.log({
    ...{
        get 0() {
            return "FAIL";
        },
        [0]: "PASS",
    },
}[0]);
