# swc / panic — Panicked

Fixtures: 1

[← swc](README.md) · [← all families](../README.md)

## `swc/issues/string-index-utf16`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
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

