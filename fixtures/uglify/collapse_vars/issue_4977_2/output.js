var a, o = {
    get p() {
        return a = "PASS";
    },
};
if (console) {
    var a = "FAIL";
    console.log(o.p, a);
}
