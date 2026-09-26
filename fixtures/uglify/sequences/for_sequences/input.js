// 1
foo();
bar();
for (; false;);
// 2
foo();
bar();
for (x = 5; false;);
// 3
x = (foo in bar);
for (; false;);
// 4
x = (foo in bar);
for (y = 5; false;);
// 5
x = function() {
    foo in bar;
};
for (y = 5; false;);
