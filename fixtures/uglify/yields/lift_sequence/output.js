console.log(function*() {
    console, yield "PASS";
}().next().value);
