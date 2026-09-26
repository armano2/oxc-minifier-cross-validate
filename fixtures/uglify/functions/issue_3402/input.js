var f = function f() {
    f = 42;
    console.log(typeof f);
};
"function" == typeof f && f();
"function" == typeof f && f();
console.log(typeof f);
