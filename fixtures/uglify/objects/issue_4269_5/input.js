console.log({
    get 42() {
        return "FAIL";
    },
    [console]: "bar",
    42: "PASS",
}[42]);
