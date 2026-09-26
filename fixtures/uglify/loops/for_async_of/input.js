var async = [ "PASS", 42 ];
async.p = "FAIL";
for (async of (null, async))
    console.log(async);
