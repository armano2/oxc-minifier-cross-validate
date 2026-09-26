var [ , a ] = function*() {
    console.log("foo");
    yield console.log("bar");
    console.log("baz");
    yield console.log("moo");
    console.log("moz");
    yield FAIL;
}();
