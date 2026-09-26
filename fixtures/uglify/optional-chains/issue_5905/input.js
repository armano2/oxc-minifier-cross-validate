var a;
do {
    var b = a++;
    var c = c ?? b?.[42];
} while (console.log("PASS"));
