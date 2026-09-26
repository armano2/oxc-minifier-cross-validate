L: try {
    if (!console.log("foo"))
        throw "bar";
} catch (e) {
    console.log(e);
} finally {
    if (console.log("baz"))
        break L;
}
