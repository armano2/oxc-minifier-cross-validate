function f() {
    var a = [0x5e, 0xad, 0xbe, 0xef];
    var b = 0;
    b |= a[0];
    b <<= 8;
    b |= a[1];
    b <<= 8;
    b |= a[2];
    b <<= 8;
    b |= a[3];
    return b;
}
console.log(f().toString(16));
