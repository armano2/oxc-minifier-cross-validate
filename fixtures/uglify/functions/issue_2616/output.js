var c = "FAIL";
(true << []) - NaN || (c = "PASS");
console.log(c);
