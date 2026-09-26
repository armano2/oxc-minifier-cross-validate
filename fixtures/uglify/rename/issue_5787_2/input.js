console.log(function() {
    let a = 42;
    switch (a) {
      case 42:
        // Node.js v4 (vm): SyntaxError: Identifier 'a' has already been declared
        let a = "PASS";
        return a;
    }
}());
