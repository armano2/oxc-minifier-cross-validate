var o={*f(){yield super.p},p:"FAIL"};Object.setPrototypeOf(o,{p:"PASS"});console.log(o.f().next().value);
