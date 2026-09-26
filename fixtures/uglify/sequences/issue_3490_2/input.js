var b = 42, c = "FAIL";
if ({
    3: function() {
        var a;
        return (a && a.p) < this;
    }(),
}) c = "PASS";
if (b) for (; "" == typeof d;);
console.log(c, b);
