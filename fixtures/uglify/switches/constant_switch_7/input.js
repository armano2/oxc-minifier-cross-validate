OUT: {
    foo();
    switch (1) {
      case 1:
        x();
        if (foo) break OUT;
        for (var x = 0; x < 10; x++) {
            if (x > 5) break; // this break refers to the for, not to the switch; thus it
                              // shouldn't ruin our optimization
            console.log(x);
        }
        y();
      case 1+1:
        bar();
        break;
      default:
        def();
    }
}
