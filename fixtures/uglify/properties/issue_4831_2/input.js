var f = {
    f() {
        return arguments;
    },
}.f;
console.log(f("PASS")[0]);
