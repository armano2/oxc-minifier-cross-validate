console.log({
    ...{
        get 42() {
            return "FAIL";
        },
        ...{},
        42: "PASS",
    },
}[42]);
