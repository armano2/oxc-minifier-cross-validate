async function*f(){if(yield"PASS")yield"FAIL 1";yield{then:function(r){r(42)}};return"FAIL 2"}(async function(a){for await(a of f())console.log(a)})();
