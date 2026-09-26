var req;
xhrDesc ? (
    (req = new XMLHttpRequest).onreadystatechange,
    Object.defineProperty(XMLHttpRequest.prototype, "onreadystatechange", xhrDesc || {})
) : (
    (req = new XMLHttpRequest).onreadystatechange = function(){},
    req[SYMBOL_FAKE_ONREADYSTATECHANGE_1],
    req.onreadystatechange = null
);
