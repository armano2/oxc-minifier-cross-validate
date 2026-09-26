var obj = {
    0: 0,
    "-0": 1,
    42: 3,
    37: 4,
    o: 5,
    1e42: 8,
    b: 7
};

console.log(obj[-0], obj[-""], obj["-0"]);

console.log(obj[42], obj["42"]);

console.log(obj[37], obj["o"], obj[37], obj["37"]);

console.log(obj[1e42], obj["b"], obj["1e+42"]);
