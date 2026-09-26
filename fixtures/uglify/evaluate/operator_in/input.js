Object.prototype.PASS = 0;
console.log(0 in [ 1 ]);
console.log(0 in [ , ]);
console.log(0 / 0 in { NaN: 2 });
console.log("PASS" in { });
console.log("FAIL" in { });
console.log("toString" in { });
console.log("toString" in { toString: 3 });
