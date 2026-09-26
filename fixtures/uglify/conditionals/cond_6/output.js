x ? a : b;
x, a;

x ? y ? a : b : c;
x ? (y, a) : b;
x && y ? a : b;
!x || y ? a : b;
x && y, a;

x ? a : y ? b : c;
x || y ? a : b;
x ? a : (y, b);
!x && y ? b : a;
!x && y, a;
