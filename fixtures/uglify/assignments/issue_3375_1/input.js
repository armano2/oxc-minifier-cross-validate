function p(o) {
    console.log(typeof o, o);
}
p(function(b) {
    var a = b += 1;
    --b;
    return a;
}("object"));
