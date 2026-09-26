var x = 3;
for (;function() {
    console.log("bar:", --x);
}(), x;);
