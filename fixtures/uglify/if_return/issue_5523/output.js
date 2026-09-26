console.log(function() {
    if (console)
        try {
            FAIL;
        } finally {
            return;
        }
}());
