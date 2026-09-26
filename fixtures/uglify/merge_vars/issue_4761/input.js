var a = "FAIL", b;
try {
    !a && --a && (b = 0)[console] || console.log(b);
} catch (e) {}
