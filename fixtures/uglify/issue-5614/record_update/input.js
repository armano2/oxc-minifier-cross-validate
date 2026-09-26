var value = { a: 42, b: "PASS" };
var unused = _Utils_update(value, { b: "FAIL" });
function _Utils_update(oldRecord, updatedFields) {
    var newRecord = {};
    for (var key in oldRecord)
        newRecord[key] = oldRecord[key];
    for (var key in updatedFields)
        newRecord[key] = updatedFields[key];
    return newRecord;
}
