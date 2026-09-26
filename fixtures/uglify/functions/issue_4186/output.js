console.log(typeof function() {
    return function f() {
        1 ? void (1 && (0 ? h : h(), 0)) : function() {
            return f;
        };
    };
    function h() {
        return factory;
    }
}());
