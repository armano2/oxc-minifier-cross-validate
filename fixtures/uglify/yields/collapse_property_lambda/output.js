console.log(function* f() {
    return (f.g = () => 42)();
}().next().value);
