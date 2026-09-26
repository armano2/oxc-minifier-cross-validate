(async function() {
    console.log(function() {
        return await => 0;
    }().prototype);
})();
