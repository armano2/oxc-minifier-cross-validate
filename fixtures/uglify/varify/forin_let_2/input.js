let o = {
    p: 42,
    q: "PASS",
};
for (let [ k ] in o)
    console.log(k, o[k]);
