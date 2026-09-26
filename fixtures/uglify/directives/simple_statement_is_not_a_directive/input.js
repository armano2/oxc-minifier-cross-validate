"use strict"
    .split(" ")
    .forEach(function(s) {
        console.log(s);
    });
console.log(!this); // is strict mode?
(function() {
    "directive"
    ""
    "use strict"
    "hello world"
        .split(" ")
        .forEach(function(s) {
            console.log(s);
        });
    console.log(!this); // is strict mode?
})();
