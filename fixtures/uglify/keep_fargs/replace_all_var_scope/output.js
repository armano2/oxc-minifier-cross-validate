var a = 100, b = 10;
(function(c) {
    switch (~a) {
      case (b += a):
      case c++:
    }
})((--b, a));
console.log(a, b);
