var o = {
    p: 1,
    q: 2,
};
for ((console.log("exp"), o)[console.log("prop"), "k"] in console.log("obj"), o)
    console.log(o.k, o[o.k]);
