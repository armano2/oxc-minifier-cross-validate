var {
    [console.log("bar")]: a,
    [console.log("baz")]: { b },
    [console.log("moo")]: [
        c,
        {
            [console.log("moz")]: d,
            e,
        },
    ],
} = {
    [console.log("foo")]: [ null, 42 ],
};
