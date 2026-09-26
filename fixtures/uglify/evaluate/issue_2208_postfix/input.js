a = 41;
a++;
console.log({
    p: function() {
        return function() {
            return this.a;
        }();
    }
}.p());
