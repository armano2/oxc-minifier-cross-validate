var f = function f() {
    f = 42;
    console.log(typeof f);
};
f();
f();
console.log(typeof f);
