function f1() {
    try {
        var a = 1;
        return a;
    }
    catch (ex) {
        var b = 2;
        return b;
    }
    finally {
        var c = 3;
        return c;
    }
}
function f2() {
    var t = could_throw(); // shouldn't be replaced in try block
    try {
        return t + might_throw();
    }
    catch (ex) {
        return 3;
    }
}
