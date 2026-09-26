var a = 0;
(function({
    [a++]: b
}) {})(0);
console.log(a);
