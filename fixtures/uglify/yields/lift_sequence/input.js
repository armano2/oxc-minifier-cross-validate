console.log(function*() {
    yield (console, "PASS");
}().next().value);
