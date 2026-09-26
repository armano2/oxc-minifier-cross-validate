var f = () => {
    console.log("foo", b);
};
var b = 42;
f();
b = "bar";
f();
