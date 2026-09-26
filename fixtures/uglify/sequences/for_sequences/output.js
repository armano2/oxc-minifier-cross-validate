// 1
for (foo(), bar(); false;);
// 2
for (foo(), bar(), x = 5; false;);
// 3
x = (foo in bar);
for (; false;);
// 4
x = (foo in bar);
for (y = 5; false;);
// 5
for (x = function() {
    foo in bar;
}, y = 5; false;);
