function f(a) {
    try {
        throw a.log;
    } catch (e) {
        a = e;
    } finally {
        a("PASS");
    }
}
f(console);
