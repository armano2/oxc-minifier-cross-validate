var count = 0, interval = 1000, duration = 3210;
var timer = setInterval(function() {
    if (!count++) setTimeout(function() {
        clearInterval(timer);
        console.log(count <= 4 ? "PASS" : "FAIL");
    }, duration);
}, interval);
