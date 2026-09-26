(async function*() {
    switch (42) {
      default:
        if (console.log("PASS"))
            return;
        return null;
      case false:
    }
})().next();
