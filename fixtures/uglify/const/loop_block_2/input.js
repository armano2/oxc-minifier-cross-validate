do {
    const o = {};
    (function() {
        console.log(typeof this, o.p++);
    })();
} while (!console);
