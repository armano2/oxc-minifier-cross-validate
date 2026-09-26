var a = [];
for (var b in "foo")
    a.push(function(c) {
        return function*() {
            console.log(c);
        }();
    }(b));
a.map(function(d) {
    return d.next();
});
