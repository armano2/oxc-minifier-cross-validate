var a = "foo";
console.log(
    12 + (34 + a),
    null + (34 + a),
    12 + (null + a),
    false + (34 + a),
    12 + (false + a),
    "bar" + (34 + a),
    12 + ("bar" + a)
);
