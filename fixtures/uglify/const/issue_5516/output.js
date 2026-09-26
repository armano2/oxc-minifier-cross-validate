console.log(typeof function() {
    try {} catch (a) {
        void a;
    }
    {
        const a = function() {};
        return a;
    }
}());
