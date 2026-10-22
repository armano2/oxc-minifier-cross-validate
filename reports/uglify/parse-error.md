# uglify / parse-error — failed to parse

Fixtures: 25

[← uglify](README.md) · [← all families](../README.md)

## `uglify/const/skip_braces`

- note: Lexical declaration cannot appear in a single-statement context

```js
if (console)
    const a = 42;
else
    const b = null;
console.log(typeof a, typeof b);

```

## `uglify/directives/issue_5368_2`

- note: Expected function name

```js
(function() {
	'foo';
})();

```

## `uglify/exponentiation/await`

- note: A unary expression with the 'await' operator cannot be used as the left operand of an exponentiation expression

```js
(async a => a * await a ** ++a % a)(2).then(console.log);

```

## `uglify/exponentiation/precedence_1`

- note: A unary expression with the '-' operator cannot be used as the left operand of an exponentiation expression

```js
console.log(-4 ** 3 ** 2);

```

## `uglify/exponentiation/precedence_2`

- note: A unary expression with the '-' operator cannot be used as the left operand of an exponentiation expression

```js
console.log(-4 ** (3 ** 2));

```

## `uglify/exponentiation/precedence_3`

- note: A unary expression with the '-' operator cannot be used as the left operand of an exponentiation expression

```js
console.log(-(4 ** 3) ** 2);

```

## `uglify/exponentiation/precedence_4`

- note: A unary expression with the '-' operator cannot be used as the left operand of an exponentiation expression

```js
console.log((-4 ** 3) ** 2);

```

## `uglify/exports/defaults`

- note: A module cannot have multiple default exports.

```js
export default 42;
export default async;
export default (x, y) => x * x;
export default class {};
export default function*(a, b) {};
export default async function f({ c }, ...[ d ]) {};

```

## `uglify/exports/drop_unused`

- tags: `remove unused`
- note: A module cannot have multiple default exports.

```js
export default 42;
export default (x, y) => x * x;
export default class A extends B { get p() { h() } }
export default function*(a, b) {}
export default async function f({ c }, ...[ d ]) {}
export var e;
export function g(x, [ y ], ...z) {}
function h() {}

```

## `uglify/exports/hoist_exports_2`

- tags: `join vars`, `remove unused`
- note: A module cannot have multiple default exports.

```js
const a = 42;
export let bbb, { foo: ccc } = a;
export function fff(d, { [bbb]: e }) {
    d(e, fff);
}
export default a;
export default async function g(x, ...{ [ccc]: y }) {
    (await x)(g, y);
}

```

## `uglify/exports/keep_return_values`

- tags: `join vars`
- note: A module cannot have multiple default exports.

```js
export default function() {
    return [];
}
export default function f() {
    return null;
}

```

## `uglify/exports/mangle`

- note: A module cannot have multiple default exports.

```js
const a = 42;
export let b, { foo: c } = a;
export function f(d, { [b]: e }) {
    d(e, f);
}
export default a;
export default async function g(x, ...{ [c]: y }) {
    (await x)(g, y);
}

```

## `uglify/exports/mangle_rename`

- note: A module cannot have multiple default exports.

```js
const a = 42;
export let b, { foo: c } = a;
export function f(d, { [b]: e }) {
    d(e, f);
}
export default a;
export default async function g(x, ...{ [c]: y }) {
    (await x)(g, y);
}

```

## `uglify/exports/non_identifiers`

- note: Duplicated export '42'

```js
export * as "42" from 'foo';
export { '42', "delete" as 'foo' } from "bar";

```

## `uglify/issue-640/issue_1254_negate_iife_nested`

- note: Expected function name

```js
(function() {
	return function() {
		console.log('test');
	};
})()()()()();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+(function() {
+	return function() {
+		console.log('test');
+	};
+})()()()()();

```

## `uglify/issue-640/issue_1254_negate_iife_true`

- note: Expected function name

```js
(function() {
	return function() {
		console.log('test');
	};
})()();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+(function() {
+	return function() {
+		console.log('test');
+	};
+})()();

```

## `uglify/let/skip_braces`

- note: Expected a semicolon or an implicit semicolon after a statement, but found none

```js
"use strict";
if (console)
    let a = console.log(typeof a);

```

## `uglify/loops/for_async_of`

- note: The left-hand side of a `for...of` statement may not be `async`

```js
var async = [ "PASS", 42 ];
async.p = "FAIL";
for (async of (null, async))
    console.log(async);

```

## `uglify/loops/for_await_of_regexp`

- note: `for await` loops are only allowed within async functions and at the top levels of modules

```js
for await (var a of /foo/);

```

## `uglify/nullish/parentheses`

- note: Logical expressions and coalesce expressions cannot be mixed

```js
(console.log("foo") || console.log("bar") ?? console.log("baz")) && console.log("moo");

```

## `uglify/properties/first_256_chars_as_properties`

- note: Unterminated string

```js
        // Note: some of these unicode character keys are not visible on github.com
        var o = {
            "\0":0,"":1,"":2,"":3,"":4,"":5,"":6,"":7,"\b":8,
            "\t":9,"\n":10,"\v":11,"\f":12,"\r":13,"":14,"":15,"":16,"":17,
            "":18,"":19,"":20,"":21,"":22,"":23,"":24,"":25,"":26,
            "":27,"
":28,"
":29,"
":30,"":31," ":32,"!":33,'"':34,"#":35,
            $:36,"%":37,"&":38,"'":39,"(":40,")":41,"*":42,"+":43,",":44,
            "-":45,".":46,"/":47,"0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,
            "8":56,"9":57,":":58,";":59,"<":60,"=":61,">":62,"?":63,"@":64,A:65,
            B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,
            O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,"[":91,
            "\\":92,"]":93,"^":94,_:95,"`":96,a:97,b:98,c:99,d:100,e:101,
            f:102,g:103,h:104,i:105,j:106,k:107,l:108,m:109,n:110,o:111,p:112,
            q:113,r:114,s:115,t:116,u:117,v:118,w:119,x:120,y:121,z:122,"{":123,
            "|":124,"}":125,"~":126,"":127,"":128,"":129,"":130,"":131,
            "":132,"
":133,"":134,"":135,"":136,"":137,"":138,"":139,
            "":140,"":141,"":142,"":143,"":144,"":145,"":146,"":147,
            "":148,"":149,"":150,"":151,"":152,"":153,"":154,"":155,
            "":156,"":157,"":158,"":159," ":160,"¡":161,"¢":162,"£":163,
            "¤":164,"¥":165,"¦":166,"§":167,"¨":168,"©":169,"ª":170,"«":171,
            "¬":172,"­":173,"®":174,"¯":175,"°":176,"±":177,"²":178,"³":179,
            "´":180,"µ":181,"¶":182,"·":183,"¸":184,"¹":185,"º":186,"»":187,
            "¼":188,"½":189,"¾":190,"¿":191,"À":192,"Á":193,"Â":194,"Ã":195,
            "Ä":196,"Å":197,"Æ":198,"Ç":199,"È":200,"É":201,"Ê":202,"Ë":203,
            "Ì":204,"Í":205,"Î":206,"Ï":207,"Ð":208,"Ñ":209,"Ò":210,"Ó":211,
            "Ô":212,"Õ":213,"Ö":214,"×":215,"Ø":216,"Ù":217,"Ú":218,"Û":219,
            "Ü":220,"Ý":221,"Þ":222,"ß":223,"à":224,"á":225,"â":226,"ã":227,
            "ä":228,"å":229,"æ":230,"ç":231,"è":232,"é":233,"ê":234,"ë":235,
            "ì":236,"í":237,"î":238,"ï":239,"ð":240,"ñ":241,"ò":242,"ó":243,
            "ô":244,"õ":245,"ö":246,"÷":247,"ø":248,"ù":249,"ú":250,"û":251,
            "ü":252,"ý":253,"þ":254,"ÿ":255
        };

```

## `uglify/templates/malformed_evaluate_1`

- note: Bad escape sequence in untagged template literal

```js
console.log(`\67 ${6 * 7}`);

```

## `uglify/templates/malformed_evaluate_2`

- note: Bad escape sequence in untagged template literal

```js
console.log(`\u0${0}b${5}`);

```

## `uglify/templates/malformed_evaluate_3`

- note: Bad escape sequence in untagged template literal

```js
console.log(`\u${0}b${5}`);

```

## `uglify/yields/arrow_yield_2`

- note: Cannot use `yield` as an identifier in a generator context

```js
console.log(typeof function *() {
    // Syntax error on Node.js v6+
    return (yield) => {};
}().next().value);

```

