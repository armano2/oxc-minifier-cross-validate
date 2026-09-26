try {
    var con = console;
} catch (x) {}
global.log = con.log,
console.log((console.log("BAR:", 3), -1), global.log("PASS"));
