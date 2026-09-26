function function1(session) {
    var public = {
        processBulk: processBulk,
    };
    return public;
    function processBulk(bulk) {
        var subparam1 = session();
        function processOne(param1) {
            var param2 = {
                subparam1: subparam1,
            };
            doProcessOne({
                param1: param1,
                param2: param2,
            }, function() {
                processBulk(bulk);
            });
        };
        if (bulk && bulk.length > 0)
            processOne(bulk.shift());
    }
    function doProcessOne(config, callback) {
        console.log(JSON.stringify(config));
        callback();
    }
}
function1(function session() {
    return 42;
}).processBulk([1, 2, 3]);
