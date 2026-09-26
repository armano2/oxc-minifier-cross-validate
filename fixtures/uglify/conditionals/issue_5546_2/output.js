var a;
if (a)
    try {
        console;
    } catch (e) {}
else
    try {
        console;
    } finally {
        console.log("PASS");
    }
