console.log(42..length = "PASS");
console.log("foo".length = "PASS");
console.log(false.length = "PASS");
console.log(function() {}.length = "PASS");
console.log({
    get length() {
        return "FAIL";
    }
}.length = "PASS");
