var o = {
    get f() {
        console.log("PASS");
    },
} || 42;
for (var k in o)
    o[k];
