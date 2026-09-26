var o = { p: 42 };
for (var i = 0; i < 10; i++)
    o = {
        p: o,
        q: function() {},
    };
console.log(o);
