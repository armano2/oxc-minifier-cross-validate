const o = {
    p: 42,
    q: "PASS",
};
for (const [ k ] in o)
    console.log(k, o[k]);
