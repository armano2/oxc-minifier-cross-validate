bad = function(t){
    return function(n){
        try {
            t()
        } catch (t) {
            n(t)
        }
    }
};
