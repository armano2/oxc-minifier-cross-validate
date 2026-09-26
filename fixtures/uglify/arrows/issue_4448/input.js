var A;
try {
    (arguments => {
        arguments[0];
    })(A);
} catch (e) {
    console.log("PASS");
}
