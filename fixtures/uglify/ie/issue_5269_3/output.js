e = "foo";
for (var i = 0; i < 2; i++) {
    console.log(e);
    try {
        console;
    } catch (e) {
        e = "FAIL";
    }
    e = "bar";
    console;
}
