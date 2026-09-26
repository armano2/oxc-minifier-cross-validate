console.log(typeof async function(log){(await log)("foo")}(console.log).then);console.log("bar");
