L: try {
    if (console.log("foo"))
        break L;
    throw "bar";
} catch (e) {
    console.log(e);
    break L;
} finally {
    if (console.log("baz"))
        break L;
}
