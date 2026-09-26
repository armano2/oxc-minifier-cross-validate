console.log({
    get 0() {
        return "FAIL 1";
    },
    [0]: ("FAIL 2", "PASS"),
}[0]);
