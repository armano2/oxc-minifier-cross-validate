try {
    class A extends 42 {
        static [console.log("foo")] = console.log("bar");
    }
} catch (e) {
    console.log("baz");
}
