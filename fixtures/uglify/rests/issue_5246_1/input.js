console.log(typeof function([ , ...a ]) {
    return this && a;
}([ , function(){} ])[0]);
