console.log(function f(a) {
    return delete (f = a);
}());
