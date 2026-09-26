var a = "PASS";
try {} catch (e) {
    class A {
        static p = a = "FAIL";
    }
}
console.log(a);
