var a = function() {
    return console.log(arguments[0]), 42;
}("PASS") ? null : "foo";
for (var b in a)
    FAIL;
