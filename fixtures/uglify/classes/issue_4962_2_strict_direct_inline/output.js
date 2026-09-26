console.log(function f() {}(function g() {
    (class {
        static c = f;
    });
}));
