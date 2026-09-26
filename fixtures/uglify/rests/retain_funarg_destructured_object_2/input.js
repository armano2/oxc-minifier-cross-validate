console.log(function({ p: a, ... b }) {
    return b;
}({ p: "FAIL" }).p || "PASS");
