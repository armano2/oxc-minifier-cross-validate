var a = "PASS";
try {
    var f = function() {
        console.log(a);
    };
} finally {}
f();
a++;
