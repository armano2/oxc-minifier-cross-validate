var a, b, l = ["PASS", 42];
if (l.length === 1) {
    a = l[0].a;
    b = l[0].b;
} else {
    a = l[0];
    b = l[1];
}
function echo(a, b) {
    console.log(a, b);
}
echo(a, b);
