try {
    throw A.p = (console.log("FAIL"), []), !1;
} catch (e) {
    console.log(typeof e);
}
