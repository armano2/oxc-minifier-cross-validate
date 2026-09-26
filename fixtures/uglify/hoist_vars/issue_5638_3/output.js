var log, o, k, v;
log = console.log;
for (k in o = { foo: 42 }) {
    v = o[k];
    log(k || v, v++);
}
