var a = 100, b = 1;
{
    a++ + a || a;
    b <<= a;
}
console.log(a, b);
