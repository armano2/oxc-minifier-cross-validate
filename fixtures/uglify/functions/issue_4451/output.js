var a = function f() {
    for (f in "foo")
        return f;
};
while (console.log(typeof a()));
