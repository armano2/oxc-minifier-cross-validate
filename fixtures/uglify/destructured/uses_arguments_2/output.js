console.log(typeof function({ a }) {
    a[1] = 2;
    return arguments;
}({ a: 42 }));
