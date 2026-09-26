a = "PASS";
console.log({
    a: "FAIL",
    b: function() {
        return function(c) {
            return (Object, function() {
                return this;
            }()).a;
        }(String);
    }
}.b());
