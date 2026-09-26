var o = {
    p: 1,
    q: 2,
};
var k = "k";
for ((console.log("exp"), o)[function() {
    console.log("prop");
    return k;
}()] in function() {
    console.log("obj");
    return o;
}())
    console.log(o.k, o[o.k]);
