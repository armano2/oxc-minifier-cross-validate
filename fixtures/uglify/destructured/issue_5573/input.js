var log = console.log;
var a = "FAIL";
(function([ { [log(a)]: b } ]) {
    A = 42;
})((a = "PASS", [ {} ]));
log(a, A);
