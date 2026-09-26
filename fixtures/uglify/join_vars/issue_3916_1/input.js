var o = {};
o.p = "PASS";
o.__proto__ = 42;
o.q = "FAIL";
o.__proto__ = {
    p: "FAIL",
    q: "PASS",
};
o.__proto__ = "foo";
console.log(typeof o.__proto__, o.p, delete o.q, o.q);
