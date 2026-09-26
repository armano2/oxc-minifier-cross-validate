console.log(function* f() {
    f.g = () => 42;
    return f.g();
}().next().value);
