function f(a) {
    try {
        throw a.log;
    } catch (e) {
        a = e;
    } finally {
        a = a("PASS");
    }
}
f(console);
