console.log(function() {
    return () => {
        var arguments = [ "PASS" ];
        return arguments;
    };
}("FAIL 1")("FAIL 2")[0]);
