function log(msg) {
    console.log(msg);
    return msg;
}
switch (log("foo")) {
  case "bar":
    log("moo");
    break;
  case log("baz"):
    log("moo");
    break;
  default:
    log("moo");
}
