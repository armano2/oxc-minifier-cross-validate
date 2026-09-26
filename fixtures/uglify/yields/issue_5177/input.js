console.log(typeof function*() {
    return {
        p(yield) {},
    }.p;
}().next().value);
