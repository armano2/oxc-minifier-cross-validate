var o = {
    "\n": RegExp("\\\n"),
    "\r": RegExp("\\\r"),
    "\t": RegExp("\\\t"),
    "\b": RegExp("\\\b"),
    "\f": RegExp("\\\f"),
    "\0": RegExp("\\\0"),
    "\x0B": RegExp("\\\x0B"),
    "\u2028": RegExp("\\\u2028"),
    "\u2029": RegExp("\\\u2029"),
};
for (var c in o)
    console.log(o[c].test("\\"), o[c].test(c));
