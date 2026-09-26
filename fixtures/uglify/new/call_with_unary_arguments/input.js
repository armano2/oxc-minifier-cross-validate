x();
x(-1);
x(-1, -2);
x(void 1, +2, -3, ~4, !5, --a, ++b, c--, d++, typeof e, delete f);
(-1)();   // should parse despite being invalid at runtime.
(-1)(-2); // should parse despite being invalid at runtime.
