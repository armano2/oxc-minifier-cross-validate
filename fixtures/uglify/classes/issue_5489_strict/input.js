"use strict";
(class {
    [console.log("foo")];
    static {
        console.log("bar");
    }
    static [console.log("baz")]() {}
});
