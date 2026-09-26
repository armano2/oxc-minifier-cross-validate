var a = 0;
(function(...{
    [a++]: {},
}) {})(2);
console.log(a);
