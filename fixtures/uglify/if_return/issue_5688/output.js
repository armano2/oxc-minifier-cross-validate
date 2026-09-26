L: do {
    switch (console) {
      default:
        if (console)
            break;
        if (FAIL_1)
            break;
        break L;
      case 42:
        FAIL_2;
    }
} while (console.log("PASS"));
