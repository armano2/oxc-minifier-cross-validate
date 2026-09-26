# panic — Panicked

Fixtures: 2

## `swc/issues/string-index-utf16`

- note: range end index 7 out of range for slice of length 3

```js
console.log([
	'é'['0'] === 'é',
	'é'['1'] === undefined,
	'😀'['0'] === '\ud83d',
	'😀'['1'] === '\ude00',
	'😀'['2'] === undefined,
	'\ud800'['0'] === '\ud800',
	'\ud800'['1'] === undefined
].join(','));

```

## `terser/issue_973/this_binding_collapse_vars`

- note: stale direct-eval flags: scope ScopeId(0) is missing `ScopeFlags::DirectEval` for a live direct `eval(...)` call — a pass formed a new direct eval call without dropping one — see `PassChanges::direct_eval_dropped`

```js
var c = a;
c();
var d = a.b;
d();
var e = eval;
e();

```

