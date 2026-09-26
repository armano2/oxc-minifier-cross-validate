"undefined" == typeof A && "undefined" == typeof B && (A, B);
"undefined" == typeof A && "undefined" != typeof B && A;
"undefined" != typeof A && "undefined" == typeof B && B;
// dropped
"undefined" == typeof A && "undefined" == typeof B || (A, B);
"undefined" == typeof A && "undefined" != typeof B || (A, B);
"undefined" != typeof A && "undefined" == typeof B || (A, B);
"undefined" != typeof A && "undefined" != typeof B || (A, B);
"undefined" != typeof A && "undefined" == typeof B && B;
// dropped
"undefined" == typeof A && "undefined" == typeof B && (A, B);
"undefined" == typeof A && "undefined" != typeof B && A;
// dropped
"undefined" != typeof A && "undefined" == typeof B && B;
"undefined" == typeof A && "undefined" != typeof B && A;
"undefined" == typeof A && "undefined" == typeof B && (A, B);
