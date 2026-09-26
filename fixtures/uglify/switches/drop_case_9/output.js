function log(msg) {
    console.log(msg);
    return msg;
}
switch (log("foo")) {
  default:
    log("bar");
    log("moo");
}
