[
    [ "", RegExp("") ],
    [ "/", RegExp("/") ],
    [ "//", RegExp("//") ],
    [ "\/", RegExp("\\/") ],
    [ "///", RegExp("///") ],
    [ "/\/", RegExp("/\\/") ],
    [ "\//", RegExp("\\//") ],
    [ "\\/", RegExp("\\\\/") ],
    [ "////", RegExp("////") ],
    [ "//\/", RegExp("//\\/") ],
    [ "/\//", RegExp("/\\//") ],
    [ "/\\/", RegExp("/\\\\/") ],
    [ "\///", RegExp("\\///") ],
    [ "\/\/", RegExp("\\/\\/") ],
    [ "\\//", RegExp("\\\\//") ],
    [ "\\\/", RegExp("\\\\\\/") ],
].forEach(function(test) {
    console.log(test[1].test("\\"), test[1].test(test[0]));
});
