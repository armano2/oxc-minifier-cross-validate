var a = "FAIL";
try {
    a = "PASS";
    [ ...42, "PASS" ].slice();
} catch (e) {
    console.log(a);
}
