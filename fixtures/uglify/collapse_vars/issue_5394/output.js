try {
    throw !(A.p = (console.log("FAIL"), []));
} catch (e) {
    console.log(typeof e);
}
