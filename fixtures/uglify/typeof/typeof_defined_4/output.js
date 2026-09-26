// dropped
"object" == typeof A && "object" != typeof B && B;
"object" != typeof A && "object" == typeof B && A;
"object" != typeof A && "object" != typeof B && (A, B);
"object" == typeof A && "object" == typeof B || (A, B);
"object" == typeof A && "object" != typeof B || (A, B);
"object" != typeof A && "object" == typeof B || (A, B);
"object" != typeof A && "object" != typeof B || (A, B);
"object" != typeof A && "object" == typeof B && A;
"object" != typeof A && "object" != typeof B && (A, B);
// dropped
"object" == typeof A && "object" != typeof B && B;
"object" != typeof A && "object" != typeof B && (A, B);
"object" != typeof A && "object" == typeof B && A;
"object" == typeof A && "object" != typeof B && B;
// dropped
