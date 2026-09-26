try {
    console.log(function({}) {
        return function() {
            while (!console);
        }();
    }());
} catch (e) {
    console.log("PASS");
}
