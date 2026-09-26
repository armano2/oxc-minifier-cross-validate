function function1() {
    return {
        function2: function n() {
            alert(1234);
            function t() {
                n();
            }
            t();
        }
    };
}
