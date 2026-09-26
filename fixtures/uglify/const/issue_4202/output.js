{
    const o = {};
    function f() {
        o.p = 42;
    }
    f(f);
    console.log(o.p++);
}
