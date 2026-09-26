function x() {
    var f = document.getElementById("fname");
    if (12345 < f.files[0].size)
        return alert("alert"), f.focus(), !1;
}
