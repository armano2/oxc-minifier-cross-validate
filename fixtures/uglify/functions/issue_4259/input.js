var a = function b() {
    var c = b;
    for (b in c);
};
a();
console.log(typeof a);
