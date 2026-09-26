var o = {
    set p(v) {
        console.log(v);
    },
};
[ function() {
    try {
        return o;
    } catch ({}) {}
}().p ] = [ "PASS" ];
