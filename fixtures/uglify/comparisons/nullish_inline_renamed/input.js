function isNull(a) {
    return null === a;
}
function isUndefined(b) {
    return void 0 === b;
}
null === c || void 0 === c;
isNull(c) || void 0 === c;
null === c || isUndefined(c);
isNull(c) || isUndefined(c);
