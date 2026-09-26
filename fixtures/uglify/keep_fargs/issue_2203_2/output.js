a = "PASS";
console.log({
    a: "FAIL",
    b: function() {
        return function() {
            return (Object, function() {
                return this;
            }()).a;
        }(String);
    }
}.b());
