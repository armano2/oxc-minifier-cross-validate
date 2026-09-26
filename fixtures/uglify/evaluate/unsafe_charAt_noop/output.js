s = "foo";
x = 42;
console.log(
    s[0] || "",
    "string"[0 | x] || "",
    (typeof x)[0] || ""
);
