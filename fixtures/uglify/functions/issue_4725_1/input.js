var o = {
    f() {
        return function g() {
            return g;
        }();
    }
};
console.log(typeof o.f());
