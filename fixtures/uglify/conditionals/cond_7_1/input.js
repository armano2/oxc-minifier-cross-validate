var x;
// access to global should be assumed to have side effects
if (y) {
    x = 1+1;
} else {
    x = 2;
}
