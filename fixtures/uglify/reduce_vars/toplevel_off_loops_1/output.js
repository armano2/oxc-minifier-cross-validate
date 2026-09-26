function bar() {
    console.log("bar:", --x);
}
var x = 3;
for (;bar(), x;);
