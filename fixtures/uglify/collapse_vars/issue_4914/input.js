console.log(typeof function f() {
    f.__proto__ = 42;
    return f.__proto__;
}());
