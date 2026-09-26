try {} catch (a) {
    const b = 0;
}
try {} catch (b) {}
console.log(function() {
    return this;
}().b);
