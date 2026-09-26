var a = 1;
(function() {
    if (a--)
        if (a--)
            a = "FAIL";
        else
            return;
})();
console.log(a);
