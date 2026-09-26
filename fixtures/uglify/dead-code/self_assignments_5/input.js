var i = 0, l = [ "FAIL", "PASS" ];
l[0] = l[0];
l[i] = l[i];
l[i++] = l[i++];
console.log(l[0], i);
