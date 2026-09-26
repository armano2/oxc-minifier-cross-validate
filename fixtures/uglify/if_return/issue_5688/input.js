L: do {
    switch (console) {
      default:
        if (console)
            break;
        if (FAIL_1)
            ;
        else
            break L;
        break;
      case 42:
        FAIL_2;
    }
} while (console.log("PASS"));
