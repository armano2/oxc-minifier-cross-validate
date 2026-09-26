function f1() {
    sideeffect();
    switch ("Bar" + (g1 + g2) / 4) { case 0: return g9 }
}
function f2() {
    var x = g1 + g2;
    sideeffect();
    switch ("Bar" + x / 4) { case 0: return g9 }
}
function f3(x) {
    // verify no extraneous semicolon in case block before return
    // when the var definition was eliminated
    switch(x) { case 1: return 3 - x; }
}
