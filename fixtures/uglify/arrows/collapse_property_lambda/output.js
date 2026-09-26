console.log(function f() {
    return (f.g = () => 42)();
}());
