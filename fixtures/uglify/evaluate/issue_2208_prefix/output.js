a = 43;
--a;
console.log({
    p: function() {
        return function() {
            return this.a;
        }();
    }
}.p());
