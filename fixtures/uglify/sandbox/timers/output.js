var count = 0;
var timer = setInterval(function() {
    if (!count++) setTimeout(function() {
        clearInterval(timer);
        console.log(count <= 4 ? "PASS" : "FAIL");
    }, 3210);
}, 1000);
