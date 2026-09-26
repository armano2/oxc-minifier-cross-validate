var f = () => {
    return console.log((a = Math.random(), Math.ceil(a)));
    var a;
};
f();
