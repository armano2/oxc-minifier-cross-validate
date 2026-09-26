console.log(function*() {
    (function({} = yield => {}) {})();
}().next().done);
