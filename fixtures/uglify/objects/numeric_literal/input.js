var obj = {
    0: 0,
    "-0": 1,
    42: 2,
    "42": 3,
    0x25: 4,
    "0x25": 5,
    1E42: 6,
    "1E42": 7,
    "1e+42": 8,
};
console.log(obj[-0], obj[-""], obj["-0"]);
console.log(obj[42], obj["42"]);
console.log(obj[0x25], obj["0x25"], obj[37], obj["37"]);
console.log(obj[1E42], obj["1E42"], obj["1e+42"]);
