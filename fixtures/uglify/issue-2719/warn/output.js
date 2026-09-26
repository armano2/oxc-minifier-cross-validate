// TypeError: Cannot read property 'arguments' of null
console.log(function g() {
    return g.caller.arguments;
}().length);
