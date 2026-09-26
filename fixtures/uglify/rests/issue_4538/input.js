console.log(typeof function f(...a) {
    return a.p, f;
}()());
