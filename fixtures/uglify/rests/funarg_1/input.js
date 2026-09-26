console.log.apply(console, function(...a) {
    return a;
}("PASS", 42));
