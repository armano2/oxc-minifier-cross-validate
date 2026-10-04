# uglify / panic — Panicked

Fixtures: 1

[← uglify](README.md) · [← all families](../README.md)

## `uglify/issue-973/this_binding_collapse_vars`

- tags: `join vars`, `remove unused`
- note: stale direct-eval flags: scope ScopeId(1) is missing `ScopeFlags::DirectEval` for a live direct `eval(...)` call — a pass formed a new direct eval call without dropping one — see `PassChanges::direct_eval_dropped`

```js
function f() {
	'use strict';
	var c = a;
	c();
	var d = a.b;
	d();
	var e = eval;
	e();
}

```

