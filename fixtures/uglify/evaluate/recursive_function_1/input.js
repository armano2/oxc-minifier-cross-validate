function factorial(a) {
    return a > 0 ? a * factorial(a - 1) : 1;
}
console.log(factorial(5));
