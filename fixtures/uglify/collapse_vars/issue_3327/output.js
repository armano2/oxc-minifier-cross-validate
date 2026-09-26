var a, b, l = ["PASS", 42];
function echo(a, b) {
    console.log(a, b);
}
b = 1 === l.length ? (a = l[0].a, l[0].b) : (a = l[0], l[1]),
echo(a,b);
