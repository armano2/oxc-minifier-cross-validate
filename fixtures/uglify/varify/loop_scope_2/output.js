"use strict";
var a = [ "foo", "bar" ];
for (var i = 0; i < a.length; i++) {
    var x = a[i];
    console.log(x);
    let y = a[i];
    setTimeout(() => console.log(y), 0);
    const z = a[i];
    setTimeout(function() {
        console.log(z);
    }, 0);
}
