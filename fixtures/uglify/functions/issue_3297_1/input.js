function function1() {
    var r = {
        function2: function2
    };
    function function2() {
        alert(1234);
        function function3() {
            function2();
        };
        function3();
    }
    return r;
}
