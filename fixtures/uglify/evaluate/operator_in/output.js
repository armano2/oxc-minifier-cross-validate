Object.prototype.PASS = 0;
console.log(true);
console.log(0 in [ , ]);
console.log(true);
console.log("PASS" in { });
console.log("FAIL" in { });
console.log("toString" in { });
console.log("toString" in { toString: 3 });
