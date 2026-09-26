console.log(typeof async function(con){(await con).log("foo")}(console).then);console.log("bar");
