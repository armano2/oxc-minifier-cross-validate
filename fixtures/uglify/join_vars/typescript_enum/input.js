var Enum;
(function (Enum) {
    Enum[Enum.PASS = 42] = "PASS";
})(Enum || (Enum = {}));
console.log(Enum[42], Enum.PASS);
