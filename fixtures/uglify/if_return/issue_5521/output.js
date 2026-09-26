console.log(function() {
    if (console)
        try {
            return "FAIL";
        } finally {
            return;
        }
}());
