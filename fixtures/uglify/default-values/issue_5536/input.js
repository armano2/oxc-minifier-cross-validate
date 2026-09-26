(function*() {
    (([], a = 42) => {})([]);
    console.log(typeof a);
})().next();
