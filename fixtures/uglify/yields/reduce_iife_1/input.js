console.log(function*(a) {
    yield a;
}(42).next().value);
