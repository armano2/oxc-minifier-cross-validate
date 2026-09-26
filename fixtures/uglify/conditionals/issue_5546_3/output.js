var a;
if (a)
    try {
        FAIL;
    } catch (e) {
        console.log("FAIL");
    }
else
    try {
        FAIL;
    } catch (e) {
        console.log("PASS");
    }
