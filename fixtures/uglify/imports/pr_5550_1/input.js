if (console)
    import("foo");
else
    import.meta.url.replace(/bar/g, console.log);
