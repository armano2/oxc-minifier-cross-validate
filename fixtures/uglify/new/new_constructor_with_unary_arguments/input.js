new x();
new x(-1);
new x(-1, -2);
new x(void 1, +2, -3, ~4, !5, --a, ++b, c--, d++, typeof e, delete f);
new (-1);     // should parse despite being invalid at runtime.
new (-1)();   // should parse despite being invalid at runtime.
new (-1)(-2); // should parse despite being invalid at runtime.
