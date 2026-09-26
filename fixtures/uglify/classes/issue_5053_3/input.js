try {
    console.log(new class A {
        p = A = 42;
    }().p);
} catch (e) {
    console.log("PASS");
}
