(async function*() {
    (function() {
        try {
            FAIL;
        } finally {
            try {
                return console;
            } finally {
                console.log("foo");
            }
        }
    })();
})().next();
console.log("bar");
