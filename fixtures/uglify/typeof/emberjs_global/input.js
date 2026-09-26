var a;
if (typeof A === "object") {
    a = A;
} else if (typeof B === "object") {
    a = B;
} else {
    throw new Error("PASS");
}
