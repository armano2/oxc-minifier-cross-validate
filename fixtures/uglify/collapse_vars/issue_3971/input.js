var a = 0 == typeof f, b = 0;
{
    var a = void (a++ + (b |= a));
}
console.log(b);
