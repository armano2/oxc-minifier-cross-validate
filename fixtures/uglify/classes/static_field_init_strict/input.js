"use strict";
(class {
    static [console.log("foo")] = console.log("bar");
    static {
        console.log("baz");
    }
    static [console.log("moo")] = console.log("moz");
});
