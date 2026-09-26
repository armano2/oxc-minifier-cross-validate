(function(a) {
    console.log(function(index) {
        return a[index];
    }(function(term) {
        return a.indexOf(term);
    }("PASS")));
})([ "PASS" ]);
