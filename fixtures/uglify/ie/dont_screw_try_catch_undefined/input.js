function a(b) {
    try {
        throw "Stuff";
    } catch (undefined) {
        console.log("caught: " + undefined);
    }
    // IE8: undefined is Stuff
    console.log("undefined is " + undefined);
    return b === undefined;
}
console.log(a(42), a(void 0));
