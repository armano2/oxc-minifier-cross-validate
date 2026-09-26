var f = () => {
    (() => {
        var a = function g(arguments) {
            console.log(arguments);
        }();
    })();
};
f();
