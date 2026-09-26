var k, o = {
    get f() {
        console.log("PASS");
    },
} || 42;
for (k in o)
    o[k];
