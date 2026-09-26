var a;
if (a)
    try {
        console;
    } finally {
        console.log("FAIL");
    }
else
    try {
        console;
    } finally {
        console.log("PASS");
    }
