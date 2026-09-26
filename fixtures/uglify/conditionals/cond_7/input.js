var x, y, z, a, b;
// compress these
if (y) {
    x = 1+1;
} else {
    x = 2;
}

if (y) {
    x = 1+1;
} else if (z) {
    x = 2;
} else {
    x = 3-1;
}

x = y ? 'foo' : 'fo'+'o';

x = y ? 'foo' : y ? 'foo' : 'fo'+'o';

// Compress conditions that have side effects
if (condition()) {
    x = 10+10;
} else {
    x = 20;
}

if (z) {
    x = 'fuji';
} else if (condition()) {
    x = 'fu'+'ji';
} else {
    x = 'fuji';
}

x = condition() ? 'foobar' : 'foo'+'bar';

// don't compress these
x = y ? a : b;

x = y ? 'foo' : 'fo';
