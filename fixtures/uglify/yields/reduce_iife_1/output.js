console.log(function*(a) {
    yield 42;
}().next().value);
