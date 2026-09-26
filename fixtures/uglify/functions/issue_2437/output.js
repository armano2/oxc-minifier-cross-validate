var req, detectFunc, result;
console.log((
    xhrDesc ? (
        result = !!(req = new XMLHttpRequest).onreadystatechange,
        Object.defineProperty(XMLHttpRequest.prototype, "onreadystatechange", xhrDesc || {})
    ) : (
        (req = new XMLHttpRequest).onreadystatechange = detectFunc = function(){},
        result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc,req.onreadystatechange = null
    ),
    result
));
