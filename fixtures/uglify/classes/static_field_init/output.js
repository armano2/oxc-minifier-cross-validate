(class {
    static [(console.log("foo"), console.log("moo"))] = (
        console.log("bar"),
        (() => {
            console.log("baz");
        })(),
        console.log("moz")
    );
});
