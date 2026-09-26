function p(o) {
    console.log(typeof o, o);
}
p(function(b) {
    var a = --b;
    --b;
    return a;
}("object"));
