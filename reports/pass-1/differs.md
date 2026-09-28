# pass-1 / differs — Output differs at equal length

Fixtures: 2

[← pass-1](README.md) · [← all families](../README.md)

## `pass-1/4`


```js
export function Nj(a) {
	a: for (;;) {
		for (; null === a.sibling;) {
			if (null === a.return || Mj(a.return)) return null;
			a = a.return;
		}
		for (a.sibling.return = a.return, a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
			if (2 & a.flags) continue a;
			if (null === a.child || 4 === a.tag) continue a;
			a.child.return = a, a = a.child;
		}
		if (!(2 & a.flags)) return a.stateNode;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 export function Nj(a) {
 	a: for (;;) {
-		for (; null === a.sibling;) {
-			if (null === a.return || Mj(a.return)) return null;
+		for (; a.sibling === null;) {
+			if (a.return === null || Mj(a.return)) return null;
 			a = a.return;
 		}
-		for (a.sibling.return = a.return, a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
-			if (2 & a.flags || null === a.child || 4 === a.tag) continue a;
+		for (a.sibling.return = a.return, a = a.sibling; a.tag !== 5 && a.tag !== 6 && a.tag !== 18;) {
+			if (2 & a.flags || a.child === null || a.tag === 4) continue a;
 			a.child.return = a, a = a.child;
 		}
 		if (!(2 & a.flags)) return a.stateNode;

```

## `pass-1/5`


```js
export function Nj(a) {
	a: for (;;) {
		for (; null === a.sibling;) {
			if (null === a.return || Mj(a.return)) return null;
			a = a.return;
		}
		for (a.sibling.return = a.return, a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
			if (2 & a.flags || null === a.child || 4 === a.tag) continue a;
			a.child.return = a, a = a.child;
		}
		if (!(2 & a.flags)) return a.stateNode;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 export function Nj(a) {
 	a: for (;;) {
-		for (; null === a.sibling;) {
-			if (null === a.return || Mj(a.return)) return null;
+		for (; a.sibling === null;) {
+			if (a.return === null || Mj(a.return)) return null;
 			a = a.return;
 		}
-		for (a.sibling.return = a.return, a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
-			if (2 & a.flags || null === a.child || 4 === a.tag) continue a;
+		for (a.sibling.return = a.return, a = a.sibling; a.tag !== 5 && a.tag !== 6 && a.tag !== 18;) {
+			if (2 & a.flags || a.child === null || a.tag === 4) continue a;
 			a.child.return = a, a = a.child;
 		}
 		if (!(2 & a.flags)) return a.stateNode;

```

