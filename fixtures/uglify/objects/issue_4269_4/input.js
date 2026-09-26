console.log({
    get 42() {
        return "FAIL";
    },
    ["foo"]: "bar",
    42: "PASS",
}[42]);
