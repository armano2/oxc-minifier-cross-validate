function log(msg) {
    console.log(msg);
    return msg;
}
switch (log("foo")) {
  case "bar":
  case log("baz"):
  default:
    log("moo");
}
