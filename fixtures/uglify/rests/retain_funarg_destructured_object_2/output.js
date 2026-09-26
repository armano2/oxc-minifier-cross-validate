console.log(function({ p: a, ... b }) {
    return b;
}({}).p || "PASS");
