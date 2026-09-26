console.log(typeof function() {
    return this && [ function(){} ];
}()[0]);
