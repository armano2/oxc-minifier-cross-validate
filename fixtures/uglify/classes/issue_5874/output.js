var a = "PASS";
console.log(Object.keys(function() {
    class A {
        [a];
    }
    a = "FAIL";
    return new A();
}())[0]);
