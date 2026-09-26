console.log(typeof function(a) {
    return class {
        static P = { ...a };
    };
}([ 42..p ] = []));
