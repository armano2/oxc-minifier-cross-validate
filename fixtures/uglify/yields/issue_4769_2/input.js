console.log(function*() {
    return function({} = yield => {}) {
        return "PASS";
    }();
}().next().value);
