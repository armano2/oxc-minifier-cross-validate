function log(msg) {
    console.log(msg);
    return msg;
}
switch (log("foo")) {
  case log("bar"):
    log("moo");
    break;
  case "baz":
    log("moo");
    break;
  default:
    log("moo");
}
