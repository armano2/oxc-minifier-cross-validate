# uglify / smaller — Output shorter than expected (possible over-optimization / bug)

Fixtures: 1291

[← uglify](README.md) · [← all families](../README.md)

## `uglify/awaits/await_then`

- size: oxc 119 vs reference 120 (-1 bytes, no whitespaces)

```js
var a = 'PASS';
function f() {
	return { then: function(r) {
		a = 'FAIL';
		r();
	} };
}
(async function() {
	f(), await 42;
	while (console.log(a));
})();

```

```diff
--- reference
+++ oxc
@@ -6,6 +6,6 @@
 	} };
 }
 (async function() {
-	await !f();
-	while (console.log(a));
+	await 42;
+	for (; console.log(a););
 })();

```

## `uglify/awaits/collapse_vars_3`

- tags: `join vars`
- size: oxc 81 vs reference 82 (-1 bytes, no whitespaces)

```js
var a = 'FAIL';
(async function() {
	await (a = 'PASS', 42);
	return 'PASS';
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a = 'FAIL';
 (async function() {
-	await (a = 'PASS', 42);
+	a = 'PASS', await 42;
 	return 'PASS';
 })();
 console.log(a);

```

## `uglify/awaits/issue_4337`

- tags: `join vars`, `remove unused`
- size: oxc 58 vs reference 59 (-1 bytes, no whitespaces)

```js
(function(a) {
	a();
})(async function() {
	console.log('PASS');
});

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function(a) {
-	(async function() {
-		console.log('PASS');
-	})();
-})();
+	a();
+})(async function() {
+	console.log('PASS');
+});

```

## `uglify/classes/issue_4681`

- tags: `remove unused`
- size: oxc 68 vs reference 69 (-1 bytes, no whitespaces)

```js
console.log(function(a) {
	class A {
		static p = a = this;
	}
	return typeof a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log(function(a) {
-	(class {
+	class A {
 		static p = a = this;
-	});
+	}
 	return typeof a;
 }());

```

## `uglify/classes/issue_4821_1`

- tags: `join vars`, `remove unused`
- size: oxc 58 vs reference 59 (-1 bytes, no whitespaces)

```js
var a;
class A {
	static p = void (a = this);
}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a;
-(class {
+class A {
 	static p = void (a = this);
-});
+}
 console.log(typeof a);

```

## `uglify/classes/issue_4821_2`

- tags: `remove unused`
- size: oxc 58 vs reference 59 (-1 bytes, no whitespaces)

```js
var a;
class A {
	static p = void (a = this);
}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a;
-(class {
+class A {
 	static p = void (a = this);
-});
+}
 console.log(typeof a);

```

## `uglify/classes/issue_5322`

- tags: `remove unused`
- size: oxc 63 vs reference 64 (-1 bytes, no whitespaces)

```js
var a = 41;
class A {
	static p() {
		console.log(++a);
	}
	static q = this.p();
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 41;
-(class {
+class A {
 	static p() {
 		console.log(++a);
 	}
 	static q = this.p();
-});
+}

```

## `uglify/classes/static_init_side_effects_1_strict`

- tags: `join vars`
- size: oxc 67 vs reference 68 (-1 bytes, no whitespaces)

```js
'use strict';
var a = 'FAIL';
(class {
	static {
		a = 'PASS';
	}
});
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 'use strict';
 var a = 'FAIL';
-(() => (() => {
-	a = 'PASS';
-})())();
+(class {
+	static {
+		a = 'PASS';
+	}
+});
 console.log(a);

```

## `uglify/classes/static_init_side_effects_2_strict`

- tags: `join vars`
- size: oxc 67 vs reference 68 (-1 bytes, no whitespaces)

```js
'use strict';
var a = 'FAIL';
(class {
	static {
		a = 'PASS';
	}
});
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 'use strict';
 var a = 'FAIL';
-(() => (() => {
-	a = 'PASS';
-})())();
+(class {
+	static {
+		a = 'PASS';
+	}
+});
 console.log(a);

```

## `uglify/collapse_vars/cascade_switch`

- tags: `join vars`
- size: oxc 50 vs reference 51 (-1 bytes, no whitespaces)

```js
function f(a, b) {
	switch (a = x(), a) {
		case a = x(), b(a): break;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a, b) {
-	switch (a = x()) {
-		case b(a = x()): break;
+	switch (a = x(), a) {
+		case a = x(), b(a):
 	}
 }

```

## `uglify/collapse_vars/collapse_and_assign`

- tags: `join vars`
- size: oxc 57 vs reference 58 (-1 bytes, no whitespaces)

```js
var log = console.log;
var a = { p: 'PASS' };
console && (a = a.p);
log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var log = console.log;
-var a = { p: 'PASS' };
-log(a = console ? a.p : a);
+var log = console.log, a = { p: 'PASS' };
+console && (a = a.p);
+log(a);

```

## `uglify/collapse_vars/collapse_or_assign`

- tags: `join vars`
- size: oxc 53 vs reference 54 (-1 bytes, no whitespaces)

```js
var log = console.log;
var a = { p: 'PASS' };
a.q || (a = a.p);
log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var log = console.log;
-var a = { p: 'PASS' };
-log(a = a.q ? a : a.p);
+var log = console.log, a = { p: 'PASS' };
+a.q || (a = a.p);
+log(a);

```

## `uglify/collapse_vars/issue_5779`

- tags: `join vars`
- size: oxc 50 vs reference 51 (-1 bytes, no whitespaces)

```js
var a = A = 'foo';
a.p = 42;
if (a && !a.p) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = A = 'foo';
 a.p = 42;
-if (a, !a.p) console.log('PASS');
+a && !a.p && console.log('PASS');

```

## `uglify/collapse_vars/substitution_conditional`

- tags: `join vars`
- size: oxc 213 vs reference 214 (-1 bytes, no whitespaces)

```js
function f1(a, b) {
	console.log((b = a) ? a : b, a, b);
}
function f2(a, b) {
	console.log(a ? b = a : b, a, b);
}
function f3(a, b) {
	console.log(a ? a : b = a, a, b);
}
f1('foo', 'bar');
f1(null, true);
f2('foo', 'bar');
f2(null, true);
f3('foo', 'bar');
f3(null, true);

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,15 @@
 function f1(a, b) {
-	console.log(a ? a : a, a, a);
+	console.log((b = a) ? a : b, a, b);
 }
 function f2(a, b) {
 	console.log(a ? b = a : b, a, b);
 }
 function f3(a, b) {
-	console.log(a ? a : b = a, a, b);
+	console.log(a || (b = a), a, b);
 }
 f1('foo', 'bar');
-f1(null, true);
+f1(null, !0);
 f2('foo', 'bar');
-f2(null, true);
+f2(null, !0);
 f3('foo', 'bar');
-f3(null, true);
+f3(null, !0);

```

## `uglify/conditionals/angularjs_chain`

- tags: `2 iterations`
- size: oxc 217 vs reference 218 (-1 bytes, no whitespaces)

```js
function nonComputedMember(left, right, context, create) {
	var lhs = left();
	if (create && create !== 1) {
		if (lhs && lhs[right] == null) {
			lhs[right] = {};
		}
	}
	var value = lhs != null ? lhs[right] : undefined;
	if (context) {
		return {
			context: lhs,
			name: right,
			value
		};
	} else {
		return value;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 function nonComputedMember(left, right, context, create) {
 	var lhs = left();
-	create && 1 !== create && lhs && null == lhs[right] && (lhs[right] = {});
-	var value = null != lhs ? lhs[right] : void 0;
-	return context ? {
+	create && create !== 1 && lhs && lhs[right] == null && (lhs[right] = {});
+	var value = lhs?.[right];
+	if (context) return {
 		context: lhs,
 		name: right,
 		value
-	} : value;
+	};
+	else return value;
 }

```

## `uglify/conditionals/cond_6`

- size: oxc 102 vs reference 103 (-1 bytes, no whitespaces)

```js
x ? a : b;
x ? a : a;
x ? y ? a : b : c;
x ? y ? a : a : b;
x ? y ? a : b : b;
x ? y ? a : b : a;
x ? y ? a : a : a;
x ? a : y ? b : c;
x ? a : y ? a : b;
x ? a : y ? b : b;
x ? a : y ? b : a;
x ? a : y ? a : a;

```

```diff
--- reference
+++ oxc
@@ -3,10 +3,10 @@
 x ? y ? a : b : c;
 x ? (y, a) : b;
 x && y ? a : b;
-!x || y ? a : b;
+x ? y ? a : b : a;
 x && y, a;
 x ? a : y ? b : c;
 x || y ? a : b;
 x ? a : (y, b);
-!x && y ? b : a;
-!x && y, a;
+x ? a : y ? b : a;
+x || y, a;

```

## `uglify/conditionals/issue_5232_2`

- size: oxc 61 vs reference 62 (-1 bytes, no whitespaces)

```js
console.log(function() {
	if (!Math);
	else {
		var b = null;
		return 'PASS';
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 console.log(function() {
-	var b;
-	if (Math) return b = null, 'PASS';
+	if (Math) {
+		var b = null;
+		return 'PASS';
+	}
 }());

```

## `uglify/conditionals/no_evaluate`

- size: oxc 33 vs reference 34 (-1 bytes, no whitespaces)

```js
function f(b) {
	a = b ? !0 : !0;
	a = b ? ~1 : ~1;
	a = b ? -2 : -2;
	a = b ? +3 : +3;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f(b) {
 	a = !0;
-	a = ~1;
 	a = -2;
-	a = +3;
+	a = -2;
+	a = 3;
 }

```

## `uglify/default-values/declaration_let`

- size: oxc 38 vs reference 39 (-1 bytes, no whitespaces)

```js
let [a = 'PASS'] = [void 42];
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-let [a = 'PASS'] = [void 42];
+let [a = 'PASS'] = [void 0];
 console.log(a);

```

## `uglify/default-values/issue_5336`

- tags: `remove unused`
- size: oxc 64 vs reference 65 (-1 bytes, no whitespaces)

```js
var a;
do {
	(function f(b = console.log('PASS')) {
		a = f;
	})(42);
} while (a());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a;
-do {
+do
 	(function f(b = console.log('PASS')) {
 		a = f;
 	})(42);
-} while (a());
+while (a());

```

## `uglify/default-values/issue_5340_1`

- tags: `remove unused`
- size: oxc 54 vs reference 55 (-1 bytes, no whitespaces)

```js
var a;
(function(b = 42) {})(({p: a} = true).q);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a;
-(function(b = 0) {})(({p: a} = true).q);
+(function(b = 42) {})(({p: a} = !0).q);
 console.log(a);

```

## `uglify/destructured/drop_hole`

- tags: `remove unused`
- size: oxc 26 vs reference 27 (-1 bytes, no whitespaces)

```js
var [a] = [,];
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = [][0];
+var [a] = [,];
 console.log(a);

```

## `uglify/destructured/hoist_vars`

- tags: `join vars`, `remove unused`
- size: oxc 39 vs reference 40 (-1 bytes, no whitespaces)

```js
var a = 'PASS';
var [b] = [42];
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = 'PASS', b = [42][0];
+var a = 'PASS', [b] = [42];
 console.log(a, b);

```

## `uglify/destructured/issue_5866_3`

- tags: `remove unused`
- size: oxc 50 vs reference 51 (-1 bytes, no whitespaces)

```js
var a = {};
var [{ p: b }] = [a, a.p = 'PASS'];
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = {};
-var { p: b } = [a, a.p = 'PASS'][0];
+var [{ p: b }] = [a, a.p = 'PASS'];
 console.log(b);

```

## `uglify/destructured/issue_5866_5`

- tags: `remove unused`
- size: oxc 49 vs reference 50 (-1 bytes, no whitespaces)

```js
var a = [];
var [[b]] = [a, a[0] = 'PASS'];
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = [];
-var [b] = [a, a[0] = 'PASS'][0];
+var [[b]] = [a, a[0] = 'PASS'];
 console.log(b);

```

## `uglify/destructured/issue_5866_6`

- tags: `remove unused`
- size: oxc 48 vs reference 49 (-1 bytes, no whitespaces)

```js
var a = [], b;
[[b]] = [a, a[0] = 'PASS'];
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var b, a = [];
-[b] = [a, a[0] = 'PASS'][0];
+var a = [], b;
+[[b]] = [a, a[0] = 'PASS'];
 console.log(b);

```

## `uglify/destructured/singleton_1`

- tags: `remove unused`, `pure getters`
- size: oxc 97 vs reference 98 (-1 bytes, no whitespaces)

```js
var [a] = 'P', b, o = {};
[{1: o.p}] = ['FAIL'];
({foo: [o.q]} = { foo: 'S' });
[b = 'S'] = [];
console.log(a + o.p + o.q + b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var b, a = 'P'[0], o = {};
-o.p = ['FAIL'['1']][0];
-o.q = { foo: 'S'[0] }.foo;
+var [a] = 'P', b, o = {};
+[{1: o.p}] = ['FAIL'];
+({foo: [o.q]} = { foo: 'S' });
 [b = 'S'] = [];
 console.log(a + o.p + o.q + b);

```

## `uglify/drop-unused/issue_2660_1`

- tags: `join vars`, `remove unused`
- size: oxc 61 vs reference 62 (-1 bytes, no whitespaces)

```js
var a = 2;
function f(b) {
	return b && f() || a--;
}
f(1);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var a = 2;
-(function f(b) {
+function f(b) {
 	return b && f() || a--;
-})(1);
+}
+f(1);
 console.log(a);

```

## `uglify/drop-unused/issue_2660_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 65 vs reference 66 (-1 bytes, no whitespaces)

```js
var a = 1;
function f(b) {
	b && f();
	--a, a.toString();
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = 1;
-(function f(b) {
-	b && f(), (--a).toString();
-})(), console.log(a);
+function f(b) {
+	b && f(), --a, a.toString();
+}
+f(), console.log(a);

```

## `uglify/drop-unused/issue_3427_2`

- tags: `remove unused`
- size: oxc 53 vs reference 54 (-1 bytes, no whitespaces)

```js
(function() {
	var s = 'PASS';
	console.log(s = s || 'FAIL');
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function() {
 	var s = 'PASS';
-	console.log(s = s || 'FAIL');
+	console.log(s ||= 'FAIL');
 })();

```

## `uglify/drop-unused/issue_4558_1`

- tags: `join vars`, `sequences`, `remove unused`, `pure getters`
- size: oxc 50 vs reference 51 (-1 bytes, no whitespaces)

```js
var a = 0;
var b = 1, b = c >>>= a;
var c = 0;
b && 0[a++], console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-var a = 0;
-var b = c >>>= a;
-var c = 0;
-b && a++, console.log(a);
+var a = 0, b = 1, b = c >>>= a, c = 0;
+b && 0[a++], console.log(a);

```

## `uglify/evaluate/issue_3887`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 56 (-1 bytes, no whitespaces)

```js
(function(b) {
	try {
		b-- && console.log('PASS');
	} catch (a_2) {}
})(1);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function(b) {
 	try {
-		1, console.log('PASS');
-	} catch (a_2) {}
-})();
+		b-- && console.log('PASS');
+	} catch {}
+})(1);

```

## `uglify/evaluate/issue_5362_1`

- tags: `join vars`
- size: oxc 37 vs reference 38 (-1 bytes, no whitespaces)

```js
var a = -console;
console.log(delete +a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = -console;
-console.log((+a, true));
+console.log(delete +a);

```

## `uglify/evaluate/no_returns`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 56 (-1 bytes, no whitespaces)

```js
var a = function() {
	console.log('PASS');
}();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-(function() {
+var a = function() {
 	console.log('PASS');
-})();
-console.log(void 0);
+}();
+console.log(a);

```

## `uglify/evaluate/try_increment`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 52 (-1 bytes, no whitespaces)

```js
console.log(function(a) {
	try {
		return ++a;
	} catch (e) {}
}(0));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(function(a) {
 	try {
-		return 1;
-	} catch (e) {}
-}());
+		return ++a;
+	} catch {}
+}(0));

```

## `uglify/functions/duplicate_argnames_4`

- size: oxc 72 vs reference 73 (-1 bytes, no whitespaces)

```js
(function() {
	(function(a, a) {
		while (console.log(a || 'PASS'));
	})('FAIL');
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function() {
-	var a = 'FAIL';
-	var a = void 0;
-	while (console.log(a || 'PASS'));
+	(function(a, a) {
+		for (; console.log(a || 'PASS'););
+	})('FAIL');
 })();

```

## `uglify/functions/inline_return_conditional`

- size: oxc 100 vs reference 101 (-1 bytes, no whitespaces)

```js
console.log(function() {
	return console ? 'foo' : function() {
		while (console.log('bar'));
		return 'baz';
	}();
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,6 @@
 console.log(function() {
-	if (console) return 'foo';
-	else {
-		while (console.log('bar'));
+	return console ? 'foo' : function() {
+		for (; console.log('bar'););
 		return 'baz';
-		return;
-	}
+	}();
 }());

```

## `uglify/functions/issue_2097`

- tags: `join vars`, `remove unused`
- size: oxc 63 vs reference 64 (-1 bytes, no whitespaces)

```js
function f() {
	try {
		throw 0;
	} catch (e) {
		console.log(arguments[0]);
	}
}
f(1);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
-!function() {
+function f() {
 	try {
 		throw 0;
-	} catch (e) {
+	} catch {
 		console.log(arguments[0]);
 	}
-}(1);
+}
+f(1);

```

## `uglify/functions/issue_4186`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 127 vs reference 128 (-1 bytes, no whitespaces)

```js
console.log(typeof function() {
	return function() {
		function f() {
			if (1) g();
			else (function() {
				return f;
			});
		}
		return f;
		function g() {
			if (1) {
				if (0) h;
				else h();
				var key = 0;
			}
		}
		function h() {
			return factory;
		}
	};
}()());

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,14 @@
 console.log(typeof function() {
-	return function f() {
-		1 ? void (1 && (0 ? h : h(), 0)) : function() {
-			return f;
-		};
+	return function() {
+		function f() {
+			g();
+		}
+		return f;
+		function g() {
+			h();
+		}
+		function h() {
+			return factory;
+		}
 	};
-	function h() {
-		return factory;
-	}
-}());
+}()());

```

## `uglify/functions/issue_4788`

- tags: `join vars`, `remove unused`, `keep function names`
- size: oxc 76 vs reference 77 (-1 bytes, no whitespaces)

```js
function f() {
	var a = function g() {
		if (0) {
			var g = 42;
			f();
		}
		g || console.log('PASS');
	};
	a(a);
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,8 @@
-(function f() {
-	function a() {
-		if (0) {
-			var g = 42;
-			f();
-		}
+function f() {
+	var a = function g() {
+		if (0) var g;
 		g || console.log('PASS');
-	}
-	a();
-})();
+	};
+	a(a);
+}
+f();

```

## `uglify/functions/issue_5332_2`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 68 (-1 bytes, no whitespaces)

```js
do {
	var a = 42 in [];
	for (A in a) a;
} while (function() {
	console.log(++b);
	var b = b;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-do {
-	var a = 42 in [];
-	for (A in a);
-} while (a = void 0, void console.log(++a));
+do
+	for (A in 42 in []);
+while (function() {
+	console.log(++b);
+	var b = b;
+}());

```

## `uglify/hoist_vars/issue_5884_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 78 vs reference 79 (-1 bytes, no whitespaces)

```js
try {
	var f = function() {
		var a = ['PASS'];
		for (b in a) console.log(a[b]);
	};
	f();
} finally {
	var b;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
-var b;
 try {
 	(function() {
 		var a = ['PASS'];
 		for (b in a) console.log(a[b]);
 	})();
-} finally {}
+} finally {
+	var b;
+}

```

## `uglify/ie/issue_3355_3`

- size: oxc 112 vs reference 113 (-1 bytes, no whitespaces)

```js
!function(a) {
	'aaaaaaaaaa';
	a();
	var b = function c() {
		var c = 42;
		console.log('FAIL');
	};
}(function() {
	console.log('PASS');
});

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-!function(a) {
+(function(a) {
 	'aaaaaaaaaa';
 	a();
-	var o = function a() {
-		var a = 42;
+	var b = function() {
+		var c = 42;
 		console.log('FAIL');
 	};
-}(function() {
+})(function() {
 	console.log('PASS');
 });

```

## `uglify/ie/issue_3355_4`

- size: oxc 112 vs reference 113 (-1 bytes, no whitespaces)

```js
!function(a) {
	'aaaaaaaaaa';
	a();
	var b = function c() {
		var c = 42;
		console.log('FAIL');
	};
}(function() {
	console.log('PASS');
});

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-!function(a) {
+(function(a) {
 	'aaaaaaaaaa';
 	a();
-	var o = function n() {
-		var n = 42;
+	var b = function() {
+		var c = 42;
 		console.log('FAIL');
 	};
-}(function() {
+})(function() {
 	console.log('PASS');
 });

```

## `uglify/if_return/drop_catch`

- size: oxc 109 vs reference 110 (-1 bytes, no whitespaces)

```js
function f() {
	try {
		throw 42;
	} catch (e) {
		return console.log('foo'), 'bar';
	} finally {
		console.log('baz');
	}
	return 'bar';
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
 function f() {
 	try {
 		throw 42;
-	} catch (e) {
-		console.log('foo');
+	} catch {
+		return console.log('foo'), 'bar';
 	} finally {
 		console.log('baz');
 	}
-	return 'bar';
 }
 console.log(f());

```

## `uglify/if_return/identical_returns_3`

- size: oxc 83 vs reference 84 (-1 bytes, no whitespaces)

```js
function f(a) {
	if (a) return 42;
	if (a) return;
	return 42;
}
if (f(console)) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f(a) {
 	if (a) return 42;
-	if (a);
-	else return 42;
+	if (a) return;
+	return 42;
 }
-if (f(console)) console.log('PASS');
+f(console) && console.log('PASS');

```

## `uglify/if_return/if_body_return_3`

- size: oxc 205 vs reference 206 (-1 bytes, no whitespaces)

```js
var c = 'PASS';
function f(a, b) {
	if (1 == a) {
		if (b) throw new Error(c);
		return 42;
	}
	return true;
}
console.log(f(0, 0));
console.log(f(0, 1));
console.log(f(1, 0));
try {
	f(1, 1);
	console.log('FAIL');
} catch (e) {
	console.log(e.message);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 var c = 'PASS';
 function f(a, b) {
-	if (1 != a) return true;
-	if (b) throw new Error(c);
-	return 42;
+	if (a == 1) {
+		if (b) throw Error('PASS');
+		return 42;
+	}
+	return !0;
 }
 console.log(f(0, 0));
 console.log(f(0, 1));

```

## `uglify/if_return/issue_5586`

- size: oxc 107 vs reference 108 (-1 bytes, no whitespaces)

```js
L: do {
	switch (console.log('foo')) {
		case console.log('bar'):
			if (console) break;
			break L;
	}
} while (console.log('baz'));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-L: do {
+L: do
 	switch (console.log('foo')) {
 		case console.log('bar'):
 			if (console) break;
 			break L;
 	}
-} while (console.log('baz'));
+while (console.log('baz'));

```

## `uglify/if_return/issue_5589_3`

- size: oxc 149 vs reference 150 (-1 bytes, no whitespaces)

```js
function f(a) {
	do {
		switch (console.log('foo')) {
			case console.log('bar'):
				if (a) return void console.log('baz');
				continue;
		}
	} while (console.log('moo'));
}
f();
f(42);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 function f(a) {
-	do {
+	do
 		switch (console.log('foo')) {
 			case console.log('bar'):
 				if (a) return void console.log('baz');
 				continue;
 		}
-	} while (console.log('moo'));
+	while (console.log('moo'));
 }
 f();
 f(42);

```

## `uglify/if_return/sequence_void_1`

- size: oxc 60 vs reference 61 (-1 bytes, no whitespaces)

```js
function f() {
	{
		if (console) return console, void console.log('PASS');
		return;
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f() {
-	if (console) console, void console.log('PASS');
+	if (console) return void console.log('PASS');
 }
 f();

```

## `uglify/join_vars/join_object_assignments_if`

- tags: `join vars`
- size: oxc 61 vs reference 62 (-1 bytes, no whitespaces)

```js
console.log(function() {
	var o = {};
	if (o.a = 'PASS') return o.a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log(function() {
-	var o = { a: 'PASS' };
-	if (o.a) return o.a;
+	var o = {};
+	if (o.a = 'PASS') return o.a;
 }());

```

## `uglify/let/if_return_1`

- size: oxc 106 vs reference 107 (-1 bytes, no whitespaces)

```js
'use strict';
function f(a) {
	function g() {
		return b = 'PASS';
	}
	if (a) return g();
	let b;
	return g();
}
;
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -7,5 +7,4 @@
 	let b;
 	return g();
 }
-;
 console.log(f());

```

## `uglify/let/issue_4225`

- size: oxc 51 vs reference 52 (-1 bytes, no whitespaces)

```js
'use strict';
let a = void typeof b;
let b = 42;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use strict';
-let a = void b;
+let a;
 let b = 42;
-console.log(a, b);
+console.log(void 0, 42);

```

## `uglify/let/issue_5240`

- size: oxc 135 vs reference 136 (-1 bytes, no whitespaces)

```js
'use strict';
function f() {
	if (console) {
		let g = function() {
			e;
		}, e;
		(function() {
			if (console) {
				console.log(e);
				var e = 'FAIL';
			}
		})(console.log(e));
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
 'use strict';
 function f() {
 	if (console) {
-		let g = function() {
-			e;
-		}, e;
+		let g = function() {}, e;
 		(function() {
 			if (console) {
 				console.log(e);

```

## `uglify/loops/issue_186_beautify_braces`

- size: oxc 63 vs reference 64 (-1 bytes, no whitespaces)

```js
var x = 3;
if (foo()) do
	do
		alert(x);
	while (--x);
while (x);
else bar();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do {
-			alert(x);
-		} while (--x);
-	} while (x);
-} else {
-	bar();
-}
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `uglify/loops/issue_186_beautify_braces_ie8`

- size: oxc 63 vs reference 64 (-1 bytes, no whitespaces)

```js
var x = 3;
if (foo()) do
	do
		alert(x);
	while (--x);
while (x);
else bar();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do {
-			alert(x);
-		} while (--x);
-	} while (x);
-} else {
-	bar();
-}
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `uglify/loops/issue_186_beautify_ie8`

- size: oxc 63 vs reference 64 (-1 bytes, no whitespaces)

```js
var x = 3;
if (foo()) do
	do
		alert(x);
	while (--x);
while (x);
else bar();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do {
-			alert(x);
-		} while (--x);
-	} while (x);
-} else bar();
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `uglify/loops/issue_186_braces`

- size: oxc 63 vs reference 64 (-1 bytes, no whitespaces)

```js
var x = 3;
if (foo()) do
	do
		alert(x);
	while (--x);
while (x);
else bar();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do {
-			alert(x);
-		} while (--x);
-	} while (x);
-} else {
-	bar();
-}
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `uglify/loops/issue_186_braces_ie8`

- size: oxc 63 vs reference 64 (-1 bytes, no whitespaces)

```js
var x = 3;
if (foo()) do
	do
		alert(x);
	while (--x);
while (x);
else bar();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do {
-			alert(x);
-		} while (--x);
-	} while (x);
-} else {
-	bar();
-}
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `uglify/loops/issue_186_ie8`

- size: oxc 63 vs reference 64 (-1 bytes, no whitespaces)

```js
var x = 3;
if (foo()) do
	do
		alert(x);
	while (--x);
while (x);
else bar();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 var x = 3;
-if (foo()) {
-	do {
-		do {
-			alert(x);
-		} while (--x);
-	} while (x);
-} else bar();
+if (foo()) do
+	do
+		alert(x);
+	while (--x);
+while (x);
+else bar();

```

## `uglify/loops/issue_3634_1`

- size: oxc 57 vs reference 58 (-1 bytes, no whitespaces)

```js
var b = 0;
L: while (++b < 2) while (1) if (b) break L;
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var b = 0;
-L: for (; ++b < 2;) for (; 1;) if (b) break L;
+L: for (; ++b < 2;) for (;;) if (b) break L;
 console.log(b);

```

## `uglify/merge_vars/issue_5772_2`

- tags: `join vars`
- size: oxc 89 vs reference 90 (-1 bytes, no whitespaces)

```js
(function(a) {
	while (--a) return;
	var b;
	var c = console.log('foo') && (b = 1) ? 2 : 3;
	console.log(b, c);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 (function(a) {
-	if (--a) return;
-	var b;
-	var a = console.log('foo') && (b = 1) ? 2 : 3;
-	console.log(b, a);
+	for (; --a;) return;
+	var b, c = console.log('foo') && (b = 1) ? 2 : 3;
+	console.log(b, c);
 })();

```

## `uglify/new/call_with_unary_arguments`

- size: oxc 90 vs reference 91 (-1 bytes, no whitespaces)

```js
x();
x(-1);
x(-1, -2);
x(void 1, +2, -3, ~4, !5, --a, ++b, c--, d++, typeof e, delete f);
(-1)();
(-1)(-2);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 x();
 x(-1);
 x(-1, -2);
-x(void 1, +2, -3, ~4, !5, --a, ++b, c--, d++, typeof e, delete f);
+x(void 0, 2, -3, -5, !1, --a, ++b, c--, d++, typeof e, delete f);
 (-1)();
 (-1)(-2);

```

## `uglify/new/new_constructor_with_unary_arguments`

- size: oxc 116 vs reference 117 (-1 bytes, no whitespaces)

```js
new x();
new x(-1);
new x(-1, -2);
new x(void 1, +2, -3, ~4, !5, --a, ++b, c--, d++, typeof e, delete f);
new (-1)();
new (-1)();
new (-1)(-2);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 new x();
 new x(-1);
 new x(-1, -2);
-new x(void 1, +2, -3, ~4, !5, --a, ++b, c--, d++, typeof e, delete f);
+new x(void 0, 2, -3, -5, !1, --a, ++b, c--, d++, typeof e, delete f);
 new (-1)();
 new (-1)();
 new (-1)(-2);

```

## `uglify/new/new_statements_2`

- size: oxc 137 vs reference 138 (-1 bytes, no whitespaces)

```js
new x();
new new x()();
new new new x()()();
new true();
new 0();
new (!0)();
new (bar = function(foo) {
	this.foo = foo;
})(123);
new (bar = function(foo) {
	this.foo = foo;
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 new x();
 new new x()();
 new new new x()()();
-new true();
+new (!0)();
 new 0();
 new (!0)();
 new (bar = function(foo) {

```

## `uglify/objects/issue_4269_2`

- size: oxc 49 vs reference 50 (-1 bytes, no whitespaces)

```js
console.log({
	get [0]() {
		return 'FAIL';
	},
	0: 'PASS'
}[0]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log({
-	get [0]() {
+	get 0() {
 		return 'FAIL';
 	},
 	0: 'PASS'

```

## `uglify/objects/issue_4269_3`

- size: oxc 62 vs reference 63 (-1 bytes, no whitespaces)

```js
console.log({
	['foo']: 'bar',
	get 42() {
		return 'FAIL';
	},
	42: 'PASS'
}[42]);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log({
 	foo: 'bar',
-	get [42]() {
+	get 42() {
 		return 'FAIL';
 	},
 	42: 'PASS'

```

## `uglify/pure_funcs/unary`

- tags: `pure functions`
- size: oxc 131 vs reference 132 (-1 bytes, no whitespaces)

```js
typeof foo();
typeof bar();
typeof 'bar';
void foo();
void bar();
void 'bar';
delete a[foo()];
delete a[bar()];
delete a['bar'];
a[foo()]++;
a[bar()]++;
a['bar']++;
--a[foo()];
--a[bar()];
--a['bar'];
~foo();
~bar();
~'bar';

```

```diff
--- reference
+++ oxc
@@ -2,11 +2,12 @@
 bar();
 delete a[foo()];
 delete a[bar()];
-delete a['bar'];
+delete a.bar;
 a[foo()]++;
 a[bar()]++;
-a['bar']++;
+a.bar++;
 --a[foo()];
 --a[bar()];
---a['bar'];
-bar();
+--a.bar;
+~foo();
+~bar();

```

## `uglify/pure_getters/lvalues_def`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 51 vs reference 52 (-1 bytes, no whitespaces)

```js
var a = 0, b = 1;
var a = b++, b = +function() {}();
a && a[a++];
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a = 0, b = 1;
-a = b++, b = +void 0;
-a && a++;
+var a = 0, b = 1, a = b++, b = NaN;
+a && a[a++];
 console.log(a, b);

```

## `uglify/pure_getters/set_mutable_1`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 75 (-1 bytes, no whitespaces)

```js
!function a() {
	a.foo += '';
	if (a.foo) console.log('PASS');
	else console.log('FAIL');
}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function a() {
-	if (a.foo += '') console.log('PASS');
-	else console.log('FAIL');
-}();
+(function a() {
+	a.foo += '';
+	a.foo ? console.log('PASS') : console.log('FAIL');
+})();

```

## `uglify/reduce_vars/defun_single_use_loop`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 69 (-1 bytes, no whitespaces)

```js
for (var x, i = 2; --i >= 0;) {
	var y = x;
	x = f;
	console.log(x === y);
}
function f() {}
;

```

```diff
--- reference
+++ oxc
@@ -4,4 +4,3 @@
 	console.log(x === y);
 }
 function f() {}
-;

```

## `uglify/reduce_vars/do_while`

- tags: `join vars`
- size: oxc 90 vs reference 91 (-1 bytes, no whitespaces)

```js
function f(a) {
	do {
		(function() {
			a && (c = 'PASS');
		})();
	} while (a = 0);
}
var c = 'FAIL';
f(1);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 function f(a) {
-	do {
+	do
 		(function() {
 			a && (c = 'PASS');
 		})();
-	} while (a = 0);
+	while (a = 0);
 }
 var c = 'FAIL';
 f(1);

```

## `uglify/reduce_vars/escaped_prop_3`

- tags: `join vars`, `remove unused`
- size: oxc 94 vs reference 95 (-1 bytes, no whitespaces)

```js
var a;
function f(b) {
	if (a) console.log(a === b.c);
	a = b.c;
}
function g() {}
function h() {
	f({ c: g });
}
h();
h();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 var a;
+function f(b) {
+	a && console.log(a === b.c);
+	a = b.c;
+}
 function g() {}
 function h() {
-	(function(b) {
-		if (a) console.log(a === b.c);
-		a = b.c;
-	})({ c: g });
+	f({ c: g });
 }
 h();
 h();

```

## `uglify/reduce_vars/issue_2869`

- tags: `join vars`
- size: oxc 77 vs reference 78 (-1 bytes, no whitespaces)

```js
var c = 'FAIL';
(function f(a) {
	var a;
	if (!f) a = 0;
	if (a) c = 'PASS';
})(1);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var c = 'FAIL';
 (function f(a) {
 	var a;
-	if (!f) a = 0;
-	if (a) c = 'PASS';
+	f || (a = 0);
+	a && (c = 'PASS');
 })(1);
 console.log(c);

```

## `uglify/reduce_vars/issue_3297`

- tags: `join vars`, `remove unused`
- size: oxc 81 vs reference 82 (-1 bytes, no whitespaces)

```js
(function() {
	function f() {
		var a;
		var b = function a() {
			console.log(a === b) && f();
		};
		b();
	}
	f();
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 (function() {
-	(function f() {
+	function f() {
 		var b = function a() {
 			console.log(a === b) && f();
 		};
 		b();
-	})();
+	}
+	f();
 })();

```

## `uglify/rests/issue_5246_3`

- tags: `remove unused`
- size: oxc 47 vs reference 48 (-1 bytes, no whitespaces)

```js
(function f(...[[a]]) {
	console.log(a);
})(['PASS']);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function(...[a]) {
+(function(...[[a]]) {
 	console.log(a);
-})(['PASS'][0]);
+})(['PASS']);

```

## `uglify/templates/tag_parentheses_sequence`

- size: oxc 59 vs reference 60 (-1 bytes, no whitespaces)

```js
var o = { f() {
	console.log(this === o ? 'FAIL' : 'PASS');
} };
(42, o.f)``;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var o = { f() {
 	console.log(this === o ? 'FAIL' : 'PASS');
 } };
-(42, o.f)``;
+(0, o.f)``;

```

## `uglify/yields/collapse_vars_3`

- tags: `join vars`
- size: oxc 83 vs reference 84 (-1 bytes, no whitespaces)

```js
var a = 'FAIL';
(function* () {
	yield (a = 'PASS', 42);
	return 'PASS';
})().next();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a = 'FAIL';
 (function* () {
-	yield (a = 'PASS', 42);
+	a = 'PASS', yield 42;
 	return 'PASS';
 })().next();
 console.log(a);

```

## `uglify/yields/collapse_vars_5`

- tags: `join vars`
- size: oxc 81 vs reference 82 (-1 bytes, no whitespaces)

```js
var a = function* f(b, c) {
	b = yield c = b;
	console.log(c);
}('PASS');
a.next();
a.next('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = function* f(b, c) {
+var a = function* (b, c) {
 	b = yield c = b;
 	console.log(c);
 }('PASS');

```

## `uglify/arguments/issue_4410_2`

- tags: `join vars`
- size: oxc 66 vs reference 68 (-2 bytes, no whitespaces)

```js
(function f(a) {
	console.log(arguments[0] === (a = 0) ? 'FAIL' : 'PASS');
})(1);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function f(a) {
+(function(a) {
 	console.log(arguments[0] === (a = 0) ? 'FAIL' : 'PASS');
 })(1);

```

## `uglify/arrays/unsafe_evaluate_modified_binary`

- tags: `join vars`
- size: oxc 70 vs reference 72 (-2 bytes, no whitespaces)

```js
(function(a) {
	(console && a).push(1);
	if (a.length) console.log('PASS');
})([]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function(a) {
 	(console && a).push(1);
-	if (a.length) console.log('PASS');
+	a.length && console.log('PASS');
 })([]);

```

## `uglify/arrays/unsafe_evaluate_modified_conditional`

- tags: `join vars`
- size: oxc 72 vs reference 74 (-2 bytes, no whitespaces)

```js
(function(a) {
	(console ? a : []).push(1);
	if (a.length) console.log('PASS');
})([]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function(a) {
 	(console ? a : []).push(1);
-	if (a.length) console.log('PASS');
+	a.length && console.log('PASS');
 })([]);

```

## `uglify/arrows/issue_4685_1`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 61 (-2 bytes, no whitespaces)

```js
new function(f) {
	if (f() !== this) console.log('PASS');
}(() => this);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 new function(f) {
-	if (f() !== this) console.log('PASS');
+	f() !== this && console.log('PASS');
 }(() => this);

```

## `uglify/arrows/issue_4685_2`

- tags: `join vars`, `remove unused`
- size: oxc 79 vs reference 81 (-2 bytes, no whitespaces)

```js
new function(f) {
	if (f() !== this) console.log('PASS');
}(() => {
	if (console) return this;
});

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 new function(f) {
-	if (f() !== this) console.log('PASS');
+	f() !== this && console.log('PASS');
 }(() => {
 	if (console) return this;
 });

```

## `uglify/arrows/issue_4772`

- size: oxc 32 vs reference 34 (-2 bytes, no whitespaces)

```js
var f = (a) => a;
/**/ console.log(f('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var f = (a) => a;
-console.log(f('PASS'));
+/**/ console.log(((a) => a)('PASS'));

```

## `uglify/awaits/issue_4340`

- tags: `join vars`
- size: oxc 46 vs reference 48 (-2 bytes, no whitespaces)

```js
(async function a(a) {
	console.log(a || 'PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(async function a(a) {
+(async function(a) {
 	console.log(a || 'PASS');
 })();

```

## `uglify/awaits/issue_4406`

- tags: `join vars`
- size: oxc 108 vs reference 110 (-2 bytes, no whitespaces)

```js
A = 'PASS';
B = 'FAIL';
(function() {
	var a, b;
	a = A;
	(async function({ [console.log(a)]: {} }) {})((b = B) && { undefined: b });
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 A = 'PASS';
 B = 'FAIL';
 (function() {
-	var a, b;
-	a = A;
+	var a = A, b;
 	(async function({ [console.log(a)]: {} }) {})((b = B) && { undefined: b });
 })();

```

## `uglify/classes/issue_4685_1`

- tags: `join vars`, `remove unused`
- size: oxc 92 vs reference 94 (-2 bytes, no whitespaces)

```js
'use strict';
new class {
	f() {
		(function(g) {
			if (g() !== this) console.log('PASS');
		})(() => this);
	}
}().f();

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 new class {
 	f() {
 		(function(g) {
-			if (g() !== this) console.log('PASS');
+			g() !== this && console.log('PASS');
 		})(() => this);
 	}
 }().f();

```

## `uglify/classes/issue_4685_2`

- tags: `join vars`, `remove unused`
- size: oxc 112 vs reference 114 (-2 bytes, no whitespaces)

```js
'use strict';
new class {
	f() {
		(function(g) {
			if (g() !== this) console.log('PASS');
		})(() => {
			if (console) return this;
		});
	}
}().f();

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 new class {
 	f() {
 		(function(g) {
-			if (g() !== this) console.log('PASS');
+			g() !== this && console.log('PASS');
 		})(() => {
 			if (console) return this;
 		});

```

## `uglify/classes/issue_5142`

- tags: `join vars`
- size: oxc 85 vs reference 87 (-2 bytes, no whitespaces)

```js
var a = 0, b;
if (++a) new class {
	p = b = null;
	constructor(c) {
		console.log(c ? 'FAIL' : 'PASS');
	}
}(b, a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 0, b;
-if (++a) new class {
+++a && new class {
 	p = b = null;
 	constructor(c) {
 		console.log(c ? 'FAIL' : 'PASS');
 	}
-}(b, 1);
+}(b, a);

```

## `uglify/classes/issue_5531_2`

- size: oxc 98 vs reference 100 (-2 bytes, no whitespaces)

```js
class A {
	static p = function() {
		var a = function f() {
			if (!a) console.log('foo');
			return 42;
		}(a++);
	}();
}
new A();
new A();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 class A {
-	static p = (a = function f() {
-		if (!a) console.log('foo');
-		return 42;
-	}(a++), void 0);
+	static p = function() {
+		var a = function() {
+			a || console.log('foo');
+			return 42;
+		}(a++);
+	}();
 }
-var a;
 new A();
 new A();

```

## `uglify/classes/issue_5876_1`

- tags: `join vars`, `remove unused`
- size: oxc 53 vs reference 55 (-2 bytes, no whitespaces)

```js
class A {
	static p = this.q;
	f() {}
}
if (A) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 	static p = this.q;
 	f() {}
 }
-if (A) console.log('PASS');
+A && console.log('PASS');

```

## `uglify/classes/issue_5876_2`

- tags: `join vars`, `remove unused`
- size: oxc 58 vs reference 60 (-2 bytes, no whitespaces)

```js
class A {
	static p = console.log('foo');
}
if (A) console.log('bar');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 class A {
 	static p = console.log('foo');
 }
-if (A) console.log('bar');
+A && console.log('bar');

```

## `uglify/collapse_vars/collapse_rhs_conditional_2`

- tags: `join vars`
- size: oxc 63 vs reference 65 (-2 bytes, no whitespaces)

```js
var a = 'FAIL', b;
while ((a = 'PASS', --b) && 'PASS' == b);
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 'FAIL', b;
-while ((a = 'PASS', --b) && 'PASS' == b);
+for (; a = 'PASS', --b && b == 'PASS';);
 console.log(a, b);

```

## `uglify/collapse_vars/collapse_rhs_loop`

- tags: `join vars`
- size: oxc 107 vs reference 109 (-2 bytes, no whitespaces)

```js
var s;
s = '<tpl>PASS</tpl>';
for (var m, r = /<tpl>(.*)<\/tpl>/; m = s.match(r);) s = s.replace(m[0], m[1]);
console.log(s);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var s;
-s = '<tpl>PASS</tpl>';
+var s = '<tpl>PASS</tpl>';
 for (var m, r = /<tpl>(.*)<\/tpl>/; m = s.match(r);) s = s.replace(m[0], m[1]);
 console.log(s);

```

## `uglify/collapse_vars/compound_assignment_1`

- tags: `join vars`
- size: oxc 30 vs reference 32 (-2 bytes, no whitespaces)

```js
var a;
a = 1;
a += a + 2;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a;
-a = 1;
+var a = 1;
 a += a + 2;
 console.log(a);

```

## `uglify/collapse_vars/compound_assignment_2`

- tags: `join vars`
- size: oxc 36 vs reference 38 (-2 bytes, no whitespaces)

```js
var a;
a = 1;
for (a += a + 2; console.log(a););

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var a;
-a = 1;
+var a = 1;
 for (a += a + 2; console.log(a););

```

## `uglify/collapse_vars/issue_2878`

- tags: `join vars`, `sequences`
- size: oxc 86 vs reference 88 (-2 bytes, no whitespaces)

```js
var c = 0;
(function(a, b) {
	function f2() {
		if (a) c++;
	}
	b = f2();
	a = 1;
	b && b.b;
	f2();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var c = 0;
 (function(a, b) {
 	function f2() {
-		if (a) c++;
+		a && c++;
 	}
 	b = f2(), a = 1, b && b.b, f2();
 })(), console.log(c);

```

## `uglify/collapse_vars/issue_3314`

- tags: `join vars`
- size: oxc 70 vs reference 72 (-2 bytes, no whitespaces)

```js
function test(a, b) {
	console.log(a, b);
}
var a = 'FAIL', b;
b = a = 'PASS';
test(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function test(a, b) {
 	console.log(a, b);
 }
-var a = 'FAIL', b;
-b = a = 'PASS';
+var a = 'FAIL', b = a = 'PASS';
 test(a, b);

```

## `uglify/collapse_vars/issue_3562`

- tags: `join vars`, `sequences`
- size: oxc 123 vs reference 125 (-2 bytes, no whitespaces)

```js
function f(a) {
	console.log('PASS', a);
}
function g(b) {
	console.log('FAIL', b);
}
var h;
var c;
if (console) {
	h = f;
	c = 'PASS';
} else {
	h = g;
	c = 'FAIL';
}
h(c);

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,5 @@
 function g(b) {
 	console.log('FAIL', b);
 }
-var h;
-var c;
-c = console ? (h = f, 'PASS') : (h = g, 'FAIL'), h(c);
+var h, c;
+console ? (h = f, c = 'PASS') : (h = g, c = 'FAIL'), h(c);

```

## `uglify/collapse_vars/issue_4895`

- tags: `join vars`
- size: oxc 56 vs reference 58 (-2 bytes, no whitespaces)

```js
var a, b;
(function f() {
	a = 42;
})();
console.log((b = a) || b, b += 0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a, b;
-(function f() {
+(function() {
 	a = 42;
 })();
 console.log((b = a) || b, b += 0);

```

## `uglify/collapse_vars/may_throw_2`

- tags: `join vars`, `remove unused`
- size: oxc 71 vs reference 73 (-2 bytes, no whitespaces)

```js
function f(b) {
	try {
		var a = x();
		++b;
		return b(a);
	} catch (e) {}
	console.log(b);
}
f(0);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f(b) {
 	try {
 		var a = x();
-		return (++b)(a);
-	} catch (e) {}
+		++b;
+		return b(a);
+	} catch {}
 	console.log(b);
 }
 f(0);

```

## `uglify/collapse_vars/var_defs`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 61 vs reference 63 (-2 bytes, no whitespaces)

```js
var f1 = function(x, y) {
	var a, b, r = x + y, q = r * r, z = q - r, a = z, b = 7;
	console.log(a + b);
};
f1('1', 0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var f1 = function(x, y) {
-	var r = x + y;
-	console.log(r * r - r + 7);
-};
-f1('1', 0);
+(function(x, y) {
+	var a, r = x + y, a = r * r - r;
+	console.log(a + 7);
+})('1', 0);

```

## `uglify/conditionals/cond_12`

- size: oxc 36 vs reference 38 (-2 bytes, no whitespaces)

```js
x ? y && a : a;
x ? y || a : a;
x ? a : y && a;
x ? a : y || a;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-(!x || y) && a;
+x ? y && a : a;
 x && y || a;
 (x || y) && a;
-!x && y || a;
+x ? a : y || a;

```

## `uglify/conditionals/cond_7_1`

- size: oxc 12 vs reference 14 (-2 bytes, no whitespaces)

```js
var x;
// access to global should be assumed to have side effects
if (y) {
	x = 1 + 1;
} else {
	x = 2;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var x;
-x = (y, 2);
+var x = (y, 2);

```

## `uglify/conditionals/condition_matches_alternative`

- size: oxc 150 vs reference 152 (-2 bytes, no whitespaces)

```js
function foo(x, y) {
	return x.p ? y[0] : x.p;
}
function bar() {
	return g ? h : g;
}
var g = 4;
var h = 5;
console.log(foo({ p: 3 }, [null]), foo({ p: 0 }, [7]), foo({ p: true }, [false]), bar());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 function foo(x, y) {
-	return x.p && y[0];
+	return x.p ? y[0] : x.p;
 }
 function bar() {
 	return g && h;
 }
 var g = 4;
 var h = 5;
-console.log(foo({ p: 3 }, [null]), foo({ p: 0 }, [7]), foo({ p: true }, [false]), bar());
+console.log(foo({ p: 3 }, [null]), foo({ p: 0 }, [7]), foo({ p: !0 }, [!1]), bar());

```

## `uglify/conditionals/extendscript_1`

- size: oxc 125 vs reference 127 (-2 bytes, no whitespaces)

```js
var alert = console.log;
function f(a, b) {
	return a ? b ? 'foo' : 'bar' : 'baz';
}
alert(f());
alert(f(42));
alert(f(null, true));
alert(f([], {}));

```

```diff
--- reference
+++ oxc
@@ -4,5 +4,5 @@
 }
 alert(f());
 alert(f(42));
-alert(f(null, true));
+alert(f(null, !0));
 alert(f([], {}));

```

## `uglify/conditionals/extendscript_2`

- size: oxc 125 vs reference 127 (-2 bytes, no whitespaces)

```js
var alert = console.log;
function f(a, b) {
	return a ? 'foo' : b ? 'bar' : 'baz';
}
alert(f());
alert(f(42));
alert(f(null, true));
alert(f([], {}));

```

```diff
--- reference
+++ oxc
@@ -4,5 +4,5 @@
 }
 alert(f());
 alert(f(42));
-alert(f(null, true));
+alert(f(null, !0));
 alert(f([], {}));

```

## `uglify/const/issue_4198`

- tags: `join vars`
- size: oxc 97 vs reference 99 (-2 bytes, no whitespaces)

```js
console.log(function() {
	try {
		throw 'PASS';
	} catch (e) {
		{
			const e = 'FAIL';
		}
		return function() {
			return e;
		}();
	}
}());

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 		throw 'PASS';
 	} catch (e) {
 		{
-			const e = 'FAIL';
+			let e = 'FAIL';
 		}
 		return function() {
 			return e;

```

## `uglify/const/issue_4205`

- tags: `join vars`
- size: oxc 111 vs reference 113 (-2 bytes, no whitespaces)

```js
var a = function(b) {
	var c = function() {
		switch (0) {
			case a: return 0;
			case b:
			case console.log('PASS'):
		}
	}();
	{
		const b = c;
	}
}();

```

```diff
--- reference
+++ oxc
@@ -7,6 +7,6 @@
 		}
 	}();
 	{
-		const b = c;
+		let b = c;
 	}
 }();

```

## `uglify/const/issue_4848`

- size: oxc 106 vs reference 108 (-2 bytes, no whitespaces)

```js
function f(a) {
	a(function() {
		console.log(b);
	});
	if (!console) return;
	const b = 'PASS';
}
var g;
f(function(h) {
	g = h;
});
g();

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 		console.log(b);
 	});
 	if (!console) return;
-	const b = 'PASS';
+	let b = 'PASS';
 }
 var g;
 f(function(h) {

```

## `uglify/const/issue_5476`

- size: oxc 37 vs reference 39 (-2 bytes, no whitespaces)

```js
console.log(function(n) {
	const a = 42;
}());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function(n) {
-	const o = 42;
+	let a = 42;
 }());

```

## `uglify/const/issue_5591`

- size: oxc 148 vs reference 150 (-2 bytes, no whitespaces)

```js
'use strict';
function f(a) {
	switch (console.log('foo')) {
		case console.log('bar'):
			if (console.log('baz')) return;
			else {
				const a = 42;
				return;
			}
			break;
		case null: FAIL;
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 	switch (console.log('foo')) {
 		case console.log('bar'): if (console.log('baz')) return;
 		else {
-			const a = 42;
+			let a = 42;
 			return;
 		}
 		case null: FAIL;

```

## `uglify/const/issue_5930_1`

- tags: `join vars`
- size: oxc 61 vs reference 63 (-2 bytes, no whitespaces)

```js
console.log(function() {
	var a;
	(f = a) && f();
	{
		const a = 42;
		var f;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	var a;
 	(f = a) && f();
 	{
-		const a = 42;
+		let a = 42;
 		var f;
 	}
 }());

```

## `uglify/const/loop_block_2`

- size: oxc 75 vs reference 77 (-2 bytes, no whitespaces)

```js
do {
	const o = {};
	(function() {
		console.log(typeof this, o.p++);
	})();
} while (!console);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 do {
-	const o = {};
+	let o = {};
 	(function() {
 		console.log(typeof this, o.p++);
 	})();

```

## `uglify/const/mangle_block`

- size: oxc 42 vs reference 44 (-2 bytes, no whitespaces)

```js
var o = 'PASS';
{
	const a = 'FAIL';
}
console.log(o);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var o = 'PASS';
 {
-	const a = 'FAIL';
+	let a = 'FAIL';
 }
 console.log(o);

```

## `uglify/const/mangle_block_toplevel`

- size: oxc 42 vs reference 44 (-2 bytes, no whitespaces)

```js
var o = 'PASS';
{
	const a = 'FAIL';
}
console.log(o);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var o = 'PASS';
 {
-	const c = 'FAIL';
+	let a = 'FAIL';
 }
 console.log(o);

```

## `uglify/default-values/inline_side_effects_1`

- size: oxc 53 vs reference 55 (-2 bytes, no whitespaces)

```js
var a = 42;
(function(b = --a) {})(console);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 var a = 42;
-[b = --a] = [console], void 0;
-var b;
+(function(b = --a) {})(console);
 console.log(a);

```

## `uglify/default-values/issue_4916`

- tags: `join vars`
- size: oxc 71 vs reference 73 (-2 bytes, no whitespaces)

```js
var log = console.log;
(function(b = 'foo') {
	b.value = 'FAIL';
	b;
	log(b.value);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 var log = console.log;
 (function(b = 'foo') {
 	b.value = 'FAIL';
-	b;
 	log(b.value);
 })();

```

## `uglify/default-values/issue_5057_2`

- tags: `remove unused`
- size: oxc 80 vs reference 82 (-2 bytes, no whitespaces)

```js
(function f(a) {
	(function(b = console.log('FAIL')) {})(a);
})(42);
console.log(typeof b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 (function(a) {
-	[b = console.log('FAIL')] = [a], void 0;
-	var b;
+	(function(b = console.log('FAIL')) {})(a);
 })(42);
 console.log(typeof b);

```

## `uglify/default-values/issue_5485`

- size: oxc 58 vs reference 60 (-2 bytes, no whitespaces)

```js
(function f(f, a = console.log(void 0 === f ? 'PASS' : 'FAIL')) {})();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(function f(f, a = console.log(void 0 === f ? 'PASS' : 'FAIL')) {})();
+(function(f, a = console.log(f === void 0 ? 'PASS' : 'FAIL')) {})();

```

## `uglify/destructured/drop_unused_1`

- tags: `remove unused`
- size: oxc 65 vs reference 67 (-2 bytes, no whitespaces)

```js
switch (0) {
	case console.log(a, a): try {
		throw 42;
	} catch (a) {
		var [a] = [];
	}
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 	case console.log(a, a): try {
 		throw 42;
 	} catch (a) {
-		var a = [][0];
+		var [a] = [];
 	}
 }

```

## `uglify/destructured/issue_4280`

- tags: `join vars`, `remove unused`
- size: oxc 26 vs reference 28 (-2 bytes, no whitespaces)

```js
var { 1: a } = 2;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var {} = 2;
-console.log(void 0);
+var { 1: a } = 2;
+console.log(a);

```

## `uglify/destructured/issue_5485`

- size: oxc 66 vs reference 68 (-2 bytes, no whitespaces)

```js
(function f({ p: f, [console.log(void 0 === f ? 'PASS' : 'FAIL')]: a }) {})(42);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(function f({ p: f, [console.log(void 0 === f ? 'PASS' : 'FAIL')]: a }) {})(42);
+(function({ p: f, [console.log(f === void 0 ? 'PASS' : 'FAIL')]: a }) {})(42);

```

## `uglify/destructured/issue_5899_1`

- tags: `join vars`
- size: oxc 57 vs reference 59 (-2 bytes, no whitespaces)

```js
var log = console.log, a, b;
a = 'foo';
log(a && a);
b = {p: a} = a;
log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var log = console.log, a, b;
-log((a = 'foo') && a);
+var log = console.log, a = 'foo', b;
+log(a && a);
 b = {p: a} = a;
 log(a);

```

## `uglify/destructured/issue_5899_2`

- tags: `join vars`
- size: oxc 55 vs reference 57 (-2 bytes, no whitespaces)

```js
var log = console.log, a, b;
a = 'foo';
log(a && a);
b = [a] = a;
log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var log = console.log, a, b;
-log((a = 'foo') && a);
+var log = console.log, a = 'foo', b;
+log(a && a);
 b = [a] = a;
 log(a);

```

## `uglify/destructured/join_vars`

- tags: `join vars`
- size: oxc 33 vs reference 35 (-2 bytes, no whitespaces)

```js
const [a] = ['PASS'];
a, console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 const [a] = ['PASS'];
-a, console.log(a);
+console.log(a);

```

## `uglify/drop-unused/drop_toplevel_all`

- tags: `remove unused`
- size: oxc 15 vs reference 17 (-2 bytes, no whitespaces)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-2;
 console.log(3);

```

## `uglify/drop-unused/issue_3375`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 78 (-2 bytes, no whitespaces)

```js
var b = 1;
var a = c = [], c = --b + ('function' == typeof f && f());
var a = c && c[a];
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-var b = 1;
-var a = [], c = --b + ('function' == typeof f && f());
-a = c && c[a];
+var b = 1, a = c = [], c = --b + (typeof f == 'function' && f()), a = c && c[a];
 console.log(a, b);

```

## `uglify/drop-unused/issue_4912_2`

- tags: `remove unused`
- size: oxc 98 vs reference 100 (-2 bytes, no whitespaces)

```js
console.log(function() {
	var g, f = function() {};
	f.p = {};
	(g = f.p.q = function() {}).r = 'PASS';
	return f;
}().p.q.r);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(function() {
-	var g, f = function() {};
+	var f = function() {};
 	f.p = {};
 	(f.p.q = function() {}).r = 'PASS';
 	return f;

```

## `uglify/evaluate/issue_3878_2`

- tags: `join vars`
- size: oxc 33 vs reference 35 (-2 bytes, no whitespaces)

```js
var a = 'foo';
a++ + a;
a && a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 var a = 'foo';
 a++ + a;
-a;
 console.log(a);

```

## `uglify/evaluate/issue_3937`

- tags: `join vars`
- size: oxc 44 vs reference 46 (-2 bytes, no whitespaces)

```js
var a = 123;
(a++ + (b = a))[b] ? 0 ? a : b : 0 ? a : b;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 123;
-(a++ + (b = a))[b], 0, b;
+(a++ + (b = a))[b], b;
 console.log(a, b);

```

## `uglify/evaluate/issue_3997`

- tags: `join vars`
- size: oxc 64 vs reference 66 (-2 bytes, no whitespaces)

```js
var a = function f(b) {
	return b[b += this] = b;
}(0);
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = function f(b) {
+var a = function(b) {
 	return b[b += this] = b;
 }(0);
 console.log(typeof a);

```

## `uglify/evaluate/issue_4119_1`

- tags: `join vars`
- size: oxc 66 vs reference 68 (-2 bytes, no whitespaces)

```js
var a, b;
b = a = [];
a[0] += 0;
if (+b + 1) {
	console.log('FAIL');
} else {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a, b;
-b = a = [];
+var a, b = a = [];
 a[0] += 0;
 +b + 1 ? console.log('FAIL') : console.log('PASS');

```

## `uglify/evaluate/issue_4119_3`

- tags: `join vars`
- size: oxc 59 vs reference 61 (-2 bytes, no whitespaces)

```js
var a, b;
b = a = { p: 42 };
delete a.p;
console.log(b.p ? 'FAIL' : 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a, b;
-b = a = { p: 42 };
+var a, b = a = { p: 42 };
 delete a.p;
 console.log(b.p ? 'FAIL' : 'PASS');

```

## `uglify/evaluate/issue_4393`

- tags: `join vars`
- size: oxc 58 vs reference 60 (-2 bytes, no whitespaces)

```js
(function f(a) {
	a = 'PASS';
	console.log(arguments[0]);
})('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-(function f(a) {
+(function(a) {
 	a = 'PASS';
 	console.log(arguments[0]);
 })('FAIL');

```

## `uglify/evaluate/issue_4886_2`

- size: oxc 44 vs reference 46 (-2 bytes, no whitespaces)

```js
console.log('foo' in {
	'foo': null,
	__proto__: 42
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log('foo' in {
-	'foo': null,
+	foo: null,
 	__proto__: 42
 });

```

## `uglify/evaluate/truthy_loops`

- size: oxc 30 vs reference 32 (-2 bytes, no whitespaces)

```js
while ([]) x();
do {
	y();
} while (a = {});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,4 @@
-for (;;) {
-	[];
-	x();
-}
-for (;;) {
+for (;;) x();
+do
 	y();
-	a = {};
-}
+while (a = {});

```

## `uglify/exports/defaults_parentheses_4`

- size: oxc 29 vs reference 31 (-2 bytes, no whitespaces)

```js
export default (function f() {});

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export default (function f() {});
+export default (function() {});

```

## `uglify/exports/issue_4742_join_vars_2`

- tags: `join vars`
- size: oxc 31 vs reference 33 (-2 bytes, no whitespaces)

```js
export var a = 'foo';
var b;
b = 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 export var a = 'foo';
-var b, b = 'bar';
+var b = 'bar';

```

## `uglify/functions/issue_5173_2`

- tags: `join vars`, `remove unused`
- size: oxc 45 vs reference 47 (-2 bytes, no whitespaces)

```js
function f(a, b) {
	console.log(b);
}
f([A = 42, [] + '' || (A = f)]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a, b) {
 	console.log(b);
 }
-f(A = [] + '' ? 42 : f);
+f([A = 42, A = f]);

```

## `uglify/functions/issue_5239`

- tags: `join vars`, `remove unused`
- size: oxc 87 vs reference 89 (-2 bytes, no whitespaces)

```js
(function() {
	(function(f) {
		var a = 42, f = function() {};
		while (console.log(f.p || a++));
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 (function() {
-	var f = void 0;
-	var a = 42, f = function() {};
-	while (console.log(f.p || a++));
-	return;
+	(function(f) {
+		var a = 42, f = function() {};
+		for (; console.log(f.p || a++););
+	})();
 })();

```

## `uglify/functions/issue_5249_1`

- size: oxc 132 vs reference 134 (-2 bytes, no whitespaces)

```js
console.log(function() {
	if (!console) var a = 'FAIL 1';
	else return void (a && function() {
		while (console.log('FAIL 2'));
	}());
	throw 'FAIL 3';
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 console.log(function() {
-	if (!console) var a = 'FAIL 1';
-	else if (a) {
-		while (console.log('FAIL 2'));
-		return;
-	} else return void 0;
+	if (console) return void (a && function() {
+		for (; console.log('FAIL 2'););
+	}());
+	else var a = 'FAIL 1';
 	throw 'FAIL 3';
 }());

```

## `uglify/functions/issue_5254_1`

- tags: `remove unused`
- size: oxc 81 vs reference 83 (-2 bytes, no whitespaces)

```js
(function(a) {
	while (a--) (function f() {
		var f = new function() {
			console.log(f);
		}();
	})();
})(2);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 (function(a) {
-	while (a--) f = void 0, f = new function() {
-		console.log(f);
-	}(), void 0;
-	var f;
+	for (; a--;) (function() {
+		var f = new function() {
+			console.log(f);
+		}();
+	})();
 })(2);

```

## `uglify/functions/issue_5332_1`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 61 (-2 bytes, no whitespaces)

```js
do {
	var a = {};
	for (A in a) a;
} while (function() {
	console.log(b);
	var b = b;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-do {
-	var a = {};
-	for (A in a);
-} while (a = void 0, void console.log(a));
+do
+	for (A in {});
+while (function() {
+	console.log(b);
+	var b = b;
+}());

```

## `uglify/functions/issue_5851_1`

- tags: `join vars`
- size: oxc 49 vs reference 51 (-2 bytes, no whitespaces)

```js
console.log('PASS') && f();
function f() {
	return f();
}
f;

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,3 @@
 function f() {
 	return f();
 }
-f;

```

## `uglify/hoist_props/issue_3071_3`

- tags: `join vars`
- size: oxc 98 vs reference 100 (-2 bytes, no whitespaces)

```js
var c = 0;
(function(a, b) {
	(function f(o) {
		var n = 2;
		while (--b + (o = { p: c++ }) && --n > 0);
	})();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 var c = 0;
 (function(a, b) {
-	(function f(o) {
+	(function(o) {
 		var n = 2;
-		while (--b + (o = { p: c++ }) && --n > 0);
+		for (; --b + (o = { p: c++ }) && --n > 0;);
 	})();
 })();
 console.log(c);

```

## `uglify/hoist_vars/issue_5638_1`

- tags: `join vars`
- size: oxc 54 vs reference 56 (-2 bytes, no whitespaces)

```js
var a = 'FAIL';
var a = [42];
console || FAIL(a);
console.log(a++);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-var a;
-a = 'FAIL';
-a = [42];
+var a = 'FAIL', a = [42];
 console || FAIL(a);
 console.log(a++);

```

## `uglify/hoist_vars/issue_5638_2`

- tags: `join vars`
- size: oxc 54 vs reference 56 (-2 bytes, no whitespaces)

```js
var a = 'FAIL';
var a = [6];
console || FAIL(a);
console.log(a *= 7);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-var a;
-a = 'FAIL';
-a = [6];
+var a = 'FAIL', a = [6];
 console || FAIL(a);
 console.log(a *= 7);

```

## `uglify/ie/issue_3478_1`

- size: oxc 75 vs reference 77 (-2 bytes, no whitespaces)

```js
'aaaaaaaaaa';
(function f() {
	(function f() {
		var a;
		console.log(typeof f);
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'aaaaaaaaaa';
-(function a() {
-	(function a() {
-		var o;
-		console.log(typeof a);
+(function() {
+	(function f() {
+		var a;
+		console.log(typeof f);
 	})();
 })();

```

## `uglify/ie/issue_3478_1_ie8`

- size: oxc 75 vs reference 77 (-2 bytes, no whitespaces)

```js
'aaaaaaaaaa';
(function f() {
	(function f() {
		var a;
		console.log(typeof f);
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'aaaaaaaaaa';
-(function f() {
+(function() {
 	(function f() {
 		var a;
 		console.log(typeof f);

```

## `uglify/ie/issue_3478_1_ie8_toplevel`

- size: oxc 75 vs reference 77 (-2 bytes, no whitespaces)

```js
'aaaaaaaaaa';
(function f() {
	(function f() {
		var a;
		console.log(typeof f);
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'aaaaaaaaaa';
-(function o() {
-	(function o() {
+(function() {
+	(function f() {
 		var a;
-		console.log(typeof o);
+		console.log(typeof f);
 	})();
 })();

```

## `uglify/ie/issue_3478_1_toplevel`

- size: oxc 75 vs reference 77 (-2 bytes, no whitespaces)

```js
'aaaaaaaaaa';
(function f() {
	(function f() {
		var a;
		console.log(typeof f);
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'aaaaaaaaaa';
-(function a() {
-	(function a() {
-		var o;
-		console.log(typeof a);
+(function() {
+	(function f() {
+		var a;
+		console.log(typeof f);
 	})();
 })();

```

## `uglify/if_return/if_body_return_1`

- size: oxc 202 vs reference 204 (-2 bytes, no whitespaces)

```js
var c = 'PASS';
function f(a, b) {
	if (a) {
		if (b) throw new Error(c);
		return 42;
	}
	return true;
}
console.log(f(0, 0));
console.log(f(0, 1));
console.log(f(1, 0));
try {
	f(1, 1);
	console.log('FAIL');
} catch (e) {
	console.log(e.message);
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 var c = 'PASS';
 function f(a, b) {
 	if (a) {
-		if (b) throw new Error(c);
+		if (b) throw Error('PASS');
 		return 42;
 	}
-	return true;
+	return !0;
 }
 console.log(f(0, 0));
 console.log(f(0, 1));

```

## `uglify/if_return/if_body_return_2`

- size: oxc 204 vs reference 206 (-2 bytes, no whitespaces)

```js
var c = 'PASS';
function f(a, b) {
	if (0 + a) {
		if (b) throw new Error(c);
		return 42;
	}
	return true;
}
console.log(f(0, 0));
console.log(f(0, 1));
console.log(f(1, 0));
try {
	f(1, 1);
	console.log('FAIL');
} catch (e) {
	console.log(e.message);
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 var c = 'PASS';
 function f(a, b) {
 	if (0 + a) {
-		if (b) throw new Error(c);
+		if (b) throw Error('PASS');
 		return 42;
 	}
-	return true;
+	return !0;
 }
 console.log(f(0, 0));
 console.log(f(0, 1));

```

## `uglify/issue-1447/else_with_empty_block`

- size: oxc 9 vs reference 11 (-2 bytes, no whitespaces)

```js
if (x) yes();
else {}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if (x) yes();
+x && yes();

```

## `uglify/issue-1447/else_with_empty_statement`

- size: oxc 9 vs reference 11 (-2 bytes, no whitespaces)

```js
if (x) yes();
else;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if (x) yes();
+x && yes();

```

## `uglify/issue-1639/issue_1639_2`

- tags: `join vars`, `sequences`
- size: oxc 57 vs reference 59 (-2 bytes, no whitespaces)

```js
var a = 100, b = 10;
function f19() {
	if (++a, false) {
		if (a) {
			if (++a);
		}
	}
}
f19();
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 100, b = 10;
 function f19() {
-	++a, 1;
+	++a;
 }
 f19(), console.log(a, b);

```

## `uglify/issue-1673/side_effects_catch`

- tags: `join vars`, `remove unused`
- size: oxc 73 vs reference 75 (-2 bytes, no whitespaces)

```js
function f() {
	function g() {
		try {
			throw 0;
		} catch (e) {
			console.log('PASS');
		}
	}
	g();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 function f() {
-	(function() {
+	function g() {
 		try {
 			throw 0;
-		} catch (e) {
+		} catch {
 			console.log('PASS');
 		}
-	})();
+	}
+	g();
 }
 f();

```

## `uglify/issue-1673/side_effects_finally`

- tags: `join vars`, `remove unused`
- size: oxc 78 vs reference 80 (-2 bytes, no whitespaces)

```js
function f() {
	function g() {
		try {
			x();
		} catch (e) {} finally {
			console.log('PASS');
		}
	}
	g();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,11 @@
 function f() {
-	(function() {
+	function g() {
 		try {
 			x();
-		} catch (e) {} finally {
+		} catch {} finally {
 			console.log('PASS');
 		}
-	})();
+	}
+	g();
 }
 f();

```

## `uglify/issue-5614/reassign_3`

- tags: `join vars`
- size: oxc 47 vs reference 49 (-2 bytes, no whitespaces)

```js
var a = 0;
(a = a || 'PASS').toString();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 0;
-(a = (0, 'PASS')).toString();
+(a ||= 'PASS').toString();
 console.log(a);

```

## `uglify/issue-59/keep_continue`

- size: oxc 52 vs reference 54 (-2 bytes, no whitespaces)

```js
while (a) {
	if (b) {
		switch (true) {
			case c(): d();
		}
		continue;
	}
	f();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-while (a) {
+for (; a;) {
 	if (b) {
-		switch (true) {
+		switch (!0) {
 			case c(): d();
 		}
 		continue;

```

## `uglify/issue-637/wrongly_optimized`

- size: oxc 35 vs reference 37 (-2 bytes, no whitespaces)

```js
function func() {
	foo();
}
if (func() || true) {
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function func() {
 	foo();
 }
-func(), 1, bar();
+func(), bar();

```

## `uglify/issue-640/cond_5`

- size: oxc 125 vs reference 127 (-2 bytes, no whitespaces)

```js
if (some_condition()) {
	if (some_other_condition()) {
		do_something();
	} else {
		alternate();
	}
} else {
	alternate();
}
if (some_condition()) {
	if (some_other_condition()) {
		do_something();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-(some_condition() && some_other_condition() ? do_something : alternate)();
-if (some_condition() && some_other_condition()) do_something();
+some_condition() && some_other_condition() ? do_something() : alternate();
+some_condition() && some_other_condition() && do_something();

```

## `uglify/issue-640/negate_iife_4`

- tags: `sequences`
- size: oxc 98 vs reference 100 (-2 bytes, no whitespaces)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);
(function() {
	console.log('something');
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!function() {
+(function() {
 	return t;
-}() ? console.log(false) : console.log(true), function() {
+})() ? console.log(!0) : console.log(!1), (function() {
 	console.log('something');
-}();
+})();

```

## `uglify/issue-640/negate_iife_5`

- tags: `sequences`
- size: oxc 82 vs reference 84 (-2 bytes, no whitespaces)

```js
if ((function() {
	return t;
})()) {
	foo(true);
} else {
	bar(false);
}
(function() {
	console.log('something');
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!function() {
+(function() {
 	return t;
-}() ? bar(false) : foo(true), function() {
+})() ? foo(!0) : bar(!1), (function() {
 	console.log('something');
-}();
+})();

```

## `uglify/issue-640/negate_iife_5_off`

- tags: `sequences`
- size: oxc 82 vs reference 84 (-2 bytes, no whitespaces)

```js
if ((function() {
	return t;
})()) {
	foo(true);
} else {
	bar(false);
}
(function() {
	console.log('something');
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!function() {
+(function() {
 	return t;
-}() ? bar(false) : foo(true), function() {
+})() ? foo(!0) : bar(!1), (function() {
 	console.log('something');
-}();
+})();

```

## `uglify/issue-640/wrongly_optimized`

- size: oxc 35 vs reference 37 (-2 bytes, no whitespaces)

```js
function func() {
	foo();
}
if (func() || true) {
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function func() {
 	foo();
 }
-func(), 1;
-bar();
+func(), bar();

```

## `uglify/issue-976/eval_mangle`

- size: oxc 234 vs reference 236 (-2 bytes, no whitespaces)

```js
function o(k) {
	return { cc: 14 }[k + 'c'];
}
console.log(function f1(a, eval, c, d, e) {
	return a('c') + eval;
}(o, 28, true));
console.log(function f2(a, b, c, d, e) {
	return a + eval('c');
}(14, true, 28));
console.log(function f3(a, eval, c, d, e) {
	return a + eval('c');
}(28, o, true));

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-function o(o) {
-	return { cc: 14 }[o + 'c'];
+function o(k) {
+	return { cc: 14 }[k + 'c'];
 }
-console.log(function o(c, e, n, r, t) {
-	return c('c') + e;
-}(o, 28, true));
+console.log(function(a, eval, c, d, e) {
+	return a('c') + eval;
+}(o, 28, !0));
 console.log(function f2(a, b, c, d, e) {
 	return a + eval('c');
-}(14, true, 28));
+}(14, !0, 28));
 console.log(function f3(a, eval, c, d, e) {
 	return a + eval('c');
-}(28, o, true));
+}(28, o, !0));

```

## `uglify/join_vars/join_object_assignments_return_1`

- tags: `join vars`
- size: oxc 56 vs reference 58 (-2 bytes, no whitespaces)

```js
console.log(function() {
	var o = { p: 3 };
	return o.q = 'foo';
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,4 @@
 console.log(function() {
-	var o = {
-		p: 3,
-		q: 'foo'
-	};
-	return o.q;
+	var o = { p: 3 };
+	return o.q = 'foo';
 }());

```

## `uglify/keep_fargs/duplicate_lambda_defun_name_1`

- tags: `join vars`
- size: oxc 58 vs reference 60 (-2 bytes, no whitespaces)

```js
console.log(function f(a) {
	function f() {}
	return f.length;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log(function f(a) {
+console.log(function(a) {
 	function f() {}
 	return f.length;
 }());

```

## `uglify/keep_fargs/issue_1595_4`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 69 (-2 bytes, no whitespaces)

```js
(function iife(a, b, c) {
	console.log(a, b, c);
	if (a) iife(a - 1, b, c);
})(3, 4, 5);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function iife(a, b, c) {
 	console.log(a, b, c);
-	if (a) iife(a - 1, b, c);
+	a && iife(a - 1, b, c);
 })(3, 4, 5);

```

## `uglify/let/issue_4531_1`

- size: oxc 58 vs reference 60 (-2 bytes, no whitespaces)

```js
'use strict';
var a;
console.log(function a() {
	let a;
	var b;
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
-var o;
-console.log(function o() {
-	let o;
-	var t;
+var a;
+console.log(function() {
+	let a;
+	var b;
 }());

```

## `uglify/let/issue_5745_1`

- tags: `join vars`
- size: oxc 74 vs reference 76 (-2 bytes, no whitespaces)

```js
'use strict';
{
	let f = function() {
		return f && 'PASS';
	};
	var a = f();
}
a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -5,5 +5,4 @@
 	};
 	var a = f();
 }
-a;
 console.log(a);

```

## `uglify/loops/issue_3634_2`

- size: oxc 73 vs reference 75 (-2 bytes, no whitespaces)

```js
var b = 0;
L: while (++b < 2) while (1) if (!b) continue L;
else break L;
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var b = 0;
-L: for (; ++b < 2;) for (; 1;) if (!b) continue L;
-else break L;
+L: for (; ++b < 2;) for (;;) if (b) break L;
+else continue L;
 console.log(b);

```

## `uglify/loops/issue_4240`

- tags: `join vars`, `remove unused`
- size: oxc 85 vs reference 87 (-2 bytes, no whitespaces)

```js
(function(a) {
	function f() {
		var o = { PASS: 42 };
		for (a in o);
	}
	(function() {
		if (f());
	})();
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 (function(a) {
+	function f() {
+		for (a in { PASS: 42 });
+	}
 	(function() {
-		if (function() {
-			for (a in { PASS: 42 });
-		}());
+		f();
 	})();
 	console.log(a);
 })();

```

## `uglify/merge_vars/cross_branch_1_5`

- tags: `join vars`
- size: oxc 93 vs reference 95 (-2 bytes, no whitespaces)

```js
var a;
function f() {
	var x, y;
	x = 'foo';
	if (a) {
		console.log(x);
		y = 'bar';
	}
	console.log(y);
}
a = 0;
f();
a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 var a;
 function f() {
-	var x, y;
-	x = 'foo';
+	var x = 'foo', y;
 	if (a) {
 		console.log(x);
 		y = 'bar';

```

## `uglify/merge_vars/cross_branch_1_6`

- tags: `join vars`
- size: oxc 94 vs reference 96 (-2 bytes, no whitespaces)

```js
var a;
function f() {
	var x, y;
	x = 'foo';
	if (a) {
		console.log(x);
		y = 'bar';
		console.log(y);
	}
}
a = 0;
f();
a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
 var a;
 function f() {
-	var x, x;
-	x = 'foo';
+	var x = 'foo', y;
 	if (a) {
 		console.log(x);
-		x = 'bar';
-		console.log(x);
+		y = 'bar';
+		console.log(y);
 	}
 }
 a = 0;

```

## `uglify/merge_vars/cross_branch_1_7`

- tags: `join vars`
- size: oxc 92 vs reference 94 (-2 bytes, no whitespaces)

```js
var a;
function f() {
	var x, y;
	x = 'foo';
	console.log(x);
	if (a) y = 'bar';
	console.log(y);
}
a = 0;
f();
a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 var a;
 function f() {
-	var x, y;
-	x = 'foo';
+	var x = 'foo', y;
 	console.log(x);
-	if (a) y = 'bar';
+	a && (y = 'bar');
 	console.log(y);
 }
 a = 0;

```

## `uglify/merge_vars/cross_branch_1_8`

- tags: `join vars`
- size: oxc 94 vs reference 96 (-2 bytes, no whitespaces)

```js
var a;
function f() {
	var x, y;
	x = 'foo';
	console.log(x);
	if (a) {
		y = 'bar';
		console.log(y);
	}
}
a = 0;
f();
a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
 var a;
 function f() {
-	var x, x;
-	x = 'foo';
+	var x = 'foo', y;
 	console.log(x);
 	if (a) {
-		x = 'bar';
-		console.log(x);
+		y = 'bar';
+		console.log(y);
 	}
 }
 a = 0;

```

## `uglify/merge_vars/cross_branch_2a_11`

- tags: `join vars`
- size: oxc 134 vs reference 136 (-2 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	if (a) {
		if (b) {
			console.log(x);
			y = 'bar';
		}
		console.log(y);
	}
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 var a, b;
 function f() {
-	var x, y;
-	x = 'foo';
+	var x = 'foo', y;
 	if (a) {
 		if (b) {
 			console.log(x);

```

## `uglify/merge_vars/cross_branch_2a_12`

- tags: `join vars`
- size: oxc 133 vs reference 135 (-2 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	if (a) {
		console.log(x);
		if (b) y = 'bar';
		console.log(y);
	}
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 var a, b;
 function f() {
-	var x, y;
-	x = 'foo';
+	var x = 'foo', y;
 	if (a) {
 		console.log(x);
-		if (b) y = 'bar';
+		b && (y = 'bar');
 		console.log(y);
 	}
 }

```

## `uglify/merge_vars/cross_branch_2a_13`

- tags: `join vars`
- size: oxc 135 vs reference 137 (-2 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	if (a) {
		console.log(x);
		if (b) {
			y = 'bar';
			console.log(y);
		}
	}
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,11 @@
 var a, b;
 function f() {
-	var x, x;
-	x = 'foo';
+	var x = 'foo', y;
 	if (a) {
 		console.log(x);
 		if (b) {
-			x = 'bar';
-			console.log(x);
+			y = 'bar';
+			console.log(y);
 		}
 	}
 }

```

## `uglify/merge_vars/cross_branch_2a_15`

- tags: `join vars`
- size: oxc 133 vs reference 135 (-2 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	console.log(x);
	if (a) {
		if (b) y = 'bar';
		console.log(y);
	}
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 var a, b;
 function f() {
-	var x, y;
-	x = 'foo';
+	var x = 'foo', y;
 	console.log(x);
 	if (a) {
-		if (b) y = 'bar';
+		b && (y = 'bar');
 		console.log(y);
 	}
 }

```

## `uglify/merge_vars/cross_branch_2a_2`

- tags: `join vars`
- size: oxc 132 vs reference 134 (-2 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	if (a) {
		x = 'foo';
		if (b) console.log(x);
	}
	y = 'bar';
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var a, b;
 function f() {
-	var x, x;
+	var x, y;
 	if (a) {
 		x = 'foo';
-		if (b) console.log(x);
+		b && console.log(x);
 	}
-	x = 'bar';
-	console.log(x);
+	y = 'bar';
+	console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/cross_branch_2a_5`

- tags: `join vars`
- size: oxc 132 vs reference 134 (-2 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	if (a) {
		x = 'foo';
		if (b) console.log(x);
		y = 'bar';
	}
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var a, b;
 function f() {
-	var x, x;
+	var x, y;
 	if (a) {
 		x = 'foo';
-		if (b) console.log(x);
-		x = 'bar';
+		b && console.log(x);
+		y = 'bar';
 	}
-	console.log(x);
+	console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/cross_branch_2a_9`

- tags: `join vars`
- size: oxc 132 vs reference 134 (-2 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	if (a) {
		console.log(x);
		if (b) y = 'bar';
	}
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 var a, b;
 function f() {
-	var x, y;
-	x = 'foo';
+	var x = 'foo', y;
 	if (a) {
 		console.log(x);
-		if (b) y = 'bar';
+		b && (y = 'bar');
 	}
 	console.log(y);
 }

```

## `uglify/merge_vars/cross_branch_2b_1`

- tags: `join vars`
- size: oxc 131 vs reference 133 (-2 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	if (a) x = 'foo';
	if (b) console.log(x);
	y = 'bar';
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 var a, b;
 function f() {
-	var x, x;
-	if (a) x = 'foo';
-	if (b) console.log(x);
-	x = 'bar';
-	console.log(x);
+	var x, y;
+	a && (x = 'foo');
+	b && console.log(x);
+	y = 'bar';
+	console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/cross_branch_2b_10`

- tags: `join vars`
- size: oxc 132 vs reference 134 (-2 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	if (a) {
		x = 'foo';
		console.log(x);
		y = 'bar';
	}
	if (b) console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var a, b;
 function f() {
-	var x, x;
+	var x, y;
 	if (a) {
 		x = 'foo';
 		console.log(x);
-		x = 'bar';
+		y = 'bar';
 	}
-	if (b) console.log(x);
+	b && console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/cross_branch_2b_8`

- tags: `join vars`
- size: oxc 131 vs reference 133 (-2 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	if (a) x = 'foo';
	console.log(x);
	y = 'bar';
	if (b) console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 var a, b;
 function f() {
-	var x, x;
-	if (a) x = 'foo';
+	var x, y;
+	a && (x = 'foo');
 	console.log(x);
-	x = 'bar';
-	if (b) console.log(x);
+	y = 'bar';
+	b && console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/cross_branch_2b_9`

- tags: `join vars`
- size: oxc 132 vs reference 134 (-2 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	if (a) {
		x = 'foo';
		console.log(x);
	}
	y = 'bar';
	if (b) console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var a, b;
 function f() {
-	var x, x;
+	var x, y;
 	if (a) {
 		x = 'foo';
 		console.log(x);
 	}
-	x = 'bar';
-	if (b) console.log(x);
+	y = 'bar';
+	b && console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/lambda_reuse`

- tags: `join vars`
- size: oxc 101 vs reference 103 (-2 bytes, no whitespaces)

```js
var a, b, f = function() {
	console.log(a);
};
f();
a = 'PASS';
b = 'FAIL';
f();
if (console.log(typeof b)) console.log(b);

```

```diff
--- reference
+++ oxc
@@ -5,4 +5,4 @@
 a = 'PASS';
 b = 'FAIL';
 f();
-if (console.log(typeof b)) console.log(b);
+console.log(typeof b) && console.log(b);

```

## `uglify/negate-iife/negate_iife_4_drop_side_effect_free`

- tags: `sequences`
- size: oxc 98 vs reference 100 (-2 bytes, no whitespaces)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);
(function() {
	console.log('something');
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!function() {
+(function() {
 	return t;
-}() ? console.log(false) : console.log(true), function() {
+})() ? console.log(!0) : console.log(!1), (function() {
 	console.log('something');
-}();
+})();

```

## `uglify/negate-iife/negate_iife_5_drop_side_effect_free`

- tags: `sequences`
- size: oxc 82 vs reference 84 (-2 bytes, no whitespaces)

```js
if (function() {
	return t;
}()) {
	foo(true);
} else {
	bar(false);
}
(function() {
	console.log('something');
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!function() {
+(function() {
 	return t;
-}() ? bar(false) : foo(true), function() {
+})() ? foo(!0) : bar(!1), (function() {
 	console.log('something');
-}();
+})();

```

## `uglify/negate-iife/negate_iife_5_off`

- tags: `sequences`
- size: oxc 82 vs reference 84 (-2 bytes, no whitespaces)

```js
if ((function() {
	return t;
})()) {
	foo(true);
} else {
	bar(false);
}
(function() {
	console.log('something');
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!function() {
+(function() {
 	return t;
-}() ? bar(false) : foo(true), function() {
+})() ? foo(!0) : bar(!1), (function() {
 	console.log('something');
-}();
+})();

```

## `uglify/nullish/issue_5829_2`

- tags: `join vars`
- size: oxc 64 vs reference 66 (-2 bytes, no whitespaces)

```js
(function f(a) {
	var b;
	(a ?? (b = 0)) && console.log(b || 'PASS');
})('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-(function f(a) {
+(function(a) {
 	var b;
 	(a ?? (b = 0)) && console.log(b || 'PASS');
 })('FAIL');

```

## `uglify/objects/issue_4269_1`

- size: oxc 49 vs reference 51 (-2 bytes, no whitespaces)

```js
console.log({
	get 0() {
		return 'FAIL';
	},
	[0]: 'PASS'
}[0]);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 	get 0() {
 		return 'FAIL';
 	},
-	[0]: 'PASS'
+	0: 'PASS'
 }[0]);

```

## `uglify/objects/issue_4269_4`

- size: oxc 62 vs reference 64 (-2 bytes, no whitespaces)

```js
console.log({
	get 42() {
		return 'FAIL';
	},
	['foo']: 'bar',
	42: 'PASS'
}[42]);

```

```diff
--- reference
+++ oxc
@@ -3,5 +3,5 @@
 		return 'FAIL';
 	},
 	foo: 'bar',
-	[42]: 'PASS'
+	42: 'PASS'
 }[42]);

```

## `uglify/objects/issue_4380`

- size: oxc 62 vs reference 64 (-2 bytes, no whitespaces)

```js
console.log({
	get 0() {
		return 'FAIL 1';
	},
	0: 'FAIL 2',
	[0]: 'PASS'
}[0]);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,6 @@
 	get 0() {
 		return 'FAIL 1';
 	},
-	[0]: ('FAIL 2', 'PASS')
+	0: 'FAIL 2',
+	0: 'PASS'
 }[0]);

```

## `uglify/optional-chains/call_parentheses`

- size: oxc 151 vs reference 153 (-2 bytes, no whitespaces)

```js
(function(o) {
	console.log(o.f('FAIL'), o.f('FAIL'), (0, o.f)(42));
	console.log(o?.f('FAIL'), (o?.f)('FAIL'), (0, o?.f)(42));
})({
	a: 'PASS',
	f(b) {
		return this.a || b;
	}
});

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 (function(o) {
 	console.log(o.f('FAIL'), o.f('FAIL'), (0, o.f)(42));
-	console.log(o?.f('FAIL'), (o?.f)('FAIL'), (0, o?.f)(42));
+	console.log(o?.f('FAIL'), (o?.f)('FAIL'), (o?.f)(42));
 })({
 	a: 'PASS',
 	f(b) {

```

## `uglify/optional-chains/unary_parentheses`

- size: oxc 59 vs reference 61 (-2 bytes, no whitespaces)

```js
var o = { p: 41 };
(function() {
	return o;
}?.()).p++;
console.log(o.p);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var o = { p: 41 };
 (function() {
 	return o;
-}?.()).p++;
+})().p++;
 console.log(o.p);

```

## `uglify/properties/array_hole`

- size: oxc 76 vs reference 78 (-2 bytes, no whitespaces)

```js
Array.prototype[2] = 'PASS';
console.log([
	1,
	2,
	,
	3
][1]);
console.log([
	1,
	2,
	,
	3
][2]);
console.log([
	1,
	2,
	,
	3
][3]);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,4 @@
 Array.prototype[2] = 'PASS';
 console.log(2);
-console.log([
-	,
-	,
-	,
-][2]);
+console.log(void 0);
 console.log(3);

```

## `uglify/properties/prop_side_effects_1`

- tags: `join vars`, `remove unused`
- size: oxc 71 vs reference 73 (-2 bytes, no whitespaces)

```js
var C = 1;
console.log(C);
var obj = { bar: function() {
	return C + C;
} };
console.log(obj.bar());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-console.log(1);
-var obj = { bar: function() {
-	return 2;
-} };
-console.log(obj.bar());
+var C = 1;
+console.log(C);
+console.log({ bar: function() {
+	return C + C;
+} }.bar());

```

## `uglify/pure_funcs/conditional`

- tags: `pure functions`
- size: oxc 62 vs reference 64 (-2 bytes, no whitespaces)

```js
pure(1 | a() ? 2 & b() : 7 ^ c());
pure(1 | a() ? 2 & b() : 5);
pure(1 | a() ? 4 : 7 ^ c());
pure(1 | a() ? 4 : 5);
pure(3 ? 2 & b() : 7 ^ c());
pure(3 ? 2 & b() : 5);
pure(3 ? 4 : 7 ^ c());
pure(3 ? 4 : 5);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
-1 | a() ? b() : c();
-1 | a() && b();
-1 | a() || c();
-a();
-3 ? b() : c();
-3 && b();
-3 || c();
+1 | a() ? 2 & b() : 7 ^ c();
+1 | a() && 2 & b();
+1 | a() || 7 ^ c();
+1 | a();
+2 & b();
+2 & b();

```

## `uglify/pure_getters/issue_2062`

- tags: `join vars`, `pure getters`
- size: oxc 42 vs reference 44 (-2 bytes, no whitespaces)

```js
var a = 1;
if ([
	a || a++ + a--,
	a++ + a--,
	a && a.var
]);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 1;
-a || (a++, a--), a++, a--;
+a || a++ + a--, a++ + a--;
 console.log(a);

```

## `uglify/pure_getters/issue_2878`

- tags: `join vars`, `sequences`, `pure getters`
- size: oxc 79 vs reference 81 (-2 bytes, no whitespaces)

```js
var c = 0;
(function(a, b) {
	function f2() {
		if (a) c++;
	}
	b = f2();
	a = 1;
	b && b.b;
	f2();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var c = 0;
 (function(a, b) {
 	function f2() {
-		if (a) c++;
+		a && c++;
 	}
 	b = f2(), a = 1, f2();
 })(), console.log(c);

```

## `uglify/pure_getters/issue_4803`

- tags: `join vars`, `remove unused`
- size: oxc 57 vs reference 59 (-2 bytes, no whitespaces)

```js
var o = { get f() {
	console.log('PASS');
} } || 42;
for (var k in o) o[k];

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var k, o = { get f() {
+var o = { get f() {
 	console.log('PASS');
-} } || 42;
-for (k in o) o[k];
+} };
+for (var k in o) o[k];

```

## `uglify/pure_getters/set_immutable_1`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 66 (-2 bytes, no whitespaces)

```js
var a = 1;
a.foo += '';
if (a.foo) console.log('FAIL');
else console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-1 .foo += '';
-if (1 .foo) console.log('FAIL');
-else console.log('PASS');
+var a = 1;
+a.foo += '';
+a.foo ? console.log('FAIL') : console.log('PASS');

```

## `uglify/pure_getters/set_immutable_3`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 79 (-2 bytes, no whitespaces)

```js
'use strict';
var a = 1;
a.foo += '';
if (a.foo) console.log('FAIL');
else console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 'use strict';
-1 .foo += '';
-if (1 .foo) console.log('FAIL');
-else console.log('PASS');
+var a = 1;
+a.foo += '';
+a.foo ? console.log('FAIL') : console.log('PASS');

```

## `uglify/reduce_vars/duplicate_lambda_defun_name_1`

- tags: `join vars`
- size: oxc 58 vs reference 60 (-2 bytes, no whitespaces)

```js
console.log(function f(a) {
	function f() {}
	return f.length;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log(function f(a) {
+console.log(function(a) {
 	function f() {}
 	return f.length;
 }());

```

## `uglify/reduce_vars/issue_1595_4`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 69 (-2 bytes, no whitespaces)

```js
(function iife(a, b, c) {
	console.log(a, b, c);
	if (a) iife(a - 1, b, c);
})(3, 4, 5);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function iife(a, b, c) {
 	console.log(a, b, c);
-	if (a) iife(a - 1, b, c);
+	a && iife(a - 1, b, c);
 })(3, 4, 5);

```

## `uglify/reduce_vars/issue_2485_1`

- tags: `join vars`, `remove unused`
- size: oxc 250 vs reference 252 (-2 bytes, no whitespaces)

```js
var foo = function(bar) {
	var n = function(a, b) {
		return a + b;
	};
	var sumAll = function(arg) {
		return arg.reduce(n, 0);
	};
	var runSumAll = function(arg) {
		return sumAll(arg);
	};
	bar.baz = function(arg) {
		var n = runSumAll(arg);
		return n.get = 1, n;
	};
	return bar;
};
var bar = foo({});
console.log(bar.baz([
	1,
	2,
	3
]));

```

```diff
--- reference
+++ oxc
@@ -1,19 +1,17 @@
-var foo = function(bar) {
+var bar = function(bar) {
 	var n = function(a, b) {
 		return a + b;
+	}, sumAll = function(arg) {
+		return arg.reduce(n, 0);
+	}, runSumAll = function(arg) {
+		return sumAll(arg);
 	};
-	var runSumAll = function(arg) {
-		return function(arg) {
-			return arg.reduce(n, 0);
-		}(arg);
-	};
 	bar.baz = function(arg) {
 		var n = runSumAll(arg);
 		return n.get = 1, n;
 	};
 	return bar;
-};
-var bar = foo({});
+}({});
 console.log(bar.baz([
 	1,
 	2,

```

## `uglify/reduce_vars/issue_3949_1`

- tags: `join vars`
- size: oxc 74 vs reference 76 (-2 bytes, no whitespaces)

```js
(function f(a) {
	var a = void (a = 0, g);
	function g() {
		console.log(typeof a);
	}
	g();
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-(function f(a) {
+(function(a) {
 	var a = void (a = 0, g);
 	function g() {
 		console.log(typeof a);

```

## `uglify/reduce_vars/unary_delete`

- tags: `join vars`, `remove unused`
- size: oxc 61 vs reference 63 (-2 bytes, no whitespaces)

```js
var b = 10;
function f() {
	var a;
	if (delete a) b--;
}
f();
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var b = 10;
 function f() {
 	var a;
-	if (delete a) b--;
+	delete a && b--;
 }
 f();
 console.log(b);

```

## `uglify/reduce_vars/unsafe_evaluate_array_1`

- tags: `join vars`
- size: oxc 160 vs reference 162 (-2 bytes, no whitespaces)

```js
function f0() {
	var a = 1;
	var b = [];
	b[a] = 2;
	console.log(a + 3);
}
function f1() {
	var a = [1];
	a[2] = 3;
	console.log(a.length);
}
function f2() {
	var a = [1];
	a.push(2);
	console.log(a.length);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 function f0() {
-	var a = 1;
-	var b = [];
-	b[1] = 2;
-	console.log(4);
+	var a = 1, b = [];
+	b[a] = 2;
+	console.log(a + 3);
 }
 function f1() {
 	var a = [1];

```

## `uglify/reduce_vars/unsafe_evaluate_object_1`

- tags: `join vars`
- size: oxc 102 vs reference 104 (-2 bytes, no whitespaces)

```js
function f0() {
	var a = 1;
	var b = {};
	b[a] = 2;
	console.log(a + 3);
}
function f1() {
	var a = { b: 1 };
	a.b = 2;
	console.log(a.b + 3);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 function f0() {
-	var a = 1;
-	var b = {};
-	b[1] = 2;
-	console.log(4);
+	var a = 1, b = {};
+	b[a] = 2;
+	console.log(a + 3);
 }
 function f1() {
 	var a = { b: 1 };

```

## `uglify/reduce_vars/var_assign_6`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 52 (-2 bytes, no whitespaces)

```js
!function() {
	var a = function() {}(a = 1);
	console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function() {
-	(function() {})();
-	console.log(void 0);
-}();
+(function() {
+	var a = (a = 1, void 0);
+	console.log(a);
+})();

```

## `uglify/rests/arrow_destructured_object_1`

- size: oxc 66 vs reference 68 (-2 bytes, no whitespaces)

```js
var f = ({ ...a }) => a, o = f({ PASS: 42 });
for (var k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var f = ({ ...a }) => a, o = f({ PASS: 42 });
+var o = (({ ...a }) => a)({ PASS: 42 });
 for (var k in o) console.log(k, o[k]);

```

## `uglify/rests/arrow_destructured_object_2`

- size: oxc 83 vs reference 85 (-2 bytes, no whitespaces)

```js
var f = ({ FAIL: a, ...b }) => b, o = f({
	PASS: 42,
	FAIL: null
});
for (var k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var f = ({ FAIL: a, ...b }) => b, o = f({
+var o = (({ FAIL: a, ...b }) => b)({
 	PASS: 42,
 	FAIL: null
 });

```

## `uglify/rests/issue_4621`

- size: oxc 48 vs reference 50 (-2 bytes, no whitespaces)

```js
(function f(a, ...{ [console.log(a)]: b }) {})('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(function f(a, ...{ [console.log(a)]: b }) {})('PASS');
+(function(a, ...{ [console.log(a)]: b }) {})('PASS');

```

## `uglify/rests/issue_4644_1`

- size: oxc 72 vs reference 74 (-2 bytes, no whitespaces)

```js
var a = 'FAIL';
(function f(b, ...{ [a = 'PASS']: c }) {
	return b;
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 'FAIL';
-(function f(b, ...{ [a = 'PASS']: c }) {
+(function(b, ...{ [a = 'PASS']: c }) {
 	return b;
 })();
 console.log(a);

```

## `uglify/sequences/lift_sequences_1`

- tags: `sequences`
- size: oxc 33 vs reference 35 (-2 bytes, no whitespaces)

```js
var foo, x, y, bar;
foo = !(x(), y(), bar());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var foo, x, y, bar;
-x(), y(), foo = !bar();
+var foo = (x(), y(), !bar()), x, y, bar;

```

## `uglify/sequences/lift_sequences_4`

- size: oxc 22 vs reference 24 (-2 bytes, no whitespaces)

```js
var x, foo, bar, baz;
x = (foo, bar, baz);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var x, foo, bar, baz;
-x = baz;
+var x = baz, foo, bar, baz;

```

## `uglify/sequences/lift_sequences_5`

- tags: `sequences`
- size: oxc 36 vs reference 38 (-2 bytes, no whitespaces)

```js
var a = 2, b;
a *= (b, a = 4, 3);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 2, b;
-b, a *= (a = 4, 3), console.log(a);
+a *= (a = 4, 3), console.log(a);

```

## `uglify/sequences/make_sequences_3`

- tags: `sequences`
- size: oxc 77 vs reference 79 (-2 bytes, no whitespaces)

```js
function f() {
	foo();
	bar();
	return baz();
}
function g() {
	foo();
	bar();
	throw new Error();
}

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 	return foo(), bar(), baz();
 }
 function g() {
-	throw foo(), bar(), new Error();
+	throw foo(), bar(), Error();
 }

```

## `uglify/side_effects/retain_instanceof`

- size: oxc 49 vs reference 51 (-2 bytes, no whitespaces)

```js
try {
	42 instanceof 'foo';
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
-	0 instanceof 'foo';
-} catch (e) {
+	42 instanceof 'foo';
+} catch {
 	console.log('PASS');
 }

```

## `uglify/spreads/issue_4329`

- size: oxc 54 vs reference 56 (-2 bytes, no whitespaces)

```js
console.log({ ...{
	get 0() {
		return 'FAIL';
	},
	...{ 0: 'PASS' }
} }[0]);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 	get 0() {
 		return 'FAIL';
 	},
-	[0]: 'PASS'
+	0: 'PASS'
 } }[0]);

```

## `uglify/spreads/issue_4345`

- size: oxc 57 vs reference 59 (-2 bytes, no whitespaces)

```js
console.log({ ...{
	get 42() {
		return 'FAIL';
	},
	...{},
	42: 'PASS'
} }[42]);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 	get 42() {
 		return 'FAIL';
 	},
-	[42]: 'PASS'
+	42: 'PASS'
 } }[42]);

```

## `uglify/varify/loop_scope_1`

- size: oxc 167 vs reference 169 (-2 bytes, no whitespaces)

```js
'use strict';
var o = {
	foo: 1,
	bar: 2
};
for (let i in o) {
	console.log(i);
}
for (const j in o) setTimeout(() => console.log(j), 0);
for (let k in o) setTimeout(function() {
	console.log(k);
}, 0);

```

```diff
--- reference
+++ oxc
@@ -3,8 +3,8 @@
 	foo: 1,
 	bar: 2
 };
-for (var i in o) console.log(i);
-for (const j in o) setTimeout(() => console.log(j), 0);
+for (let i in o) console.log(i);
+for (let j in o) setTimeout(() => console.log(j), 0);
 for (let k in o) setTimeout(function() {
 	console.log(k);
 }, 0);

```

## `uglify/varify/loop_scope_2`

- tags: `join vars`
- size: oxc 183 vs reference 185 (-2 bytes, no whitespaces)

```js
'use strict';
var a = ['foo', 'bar'];
for (var i = 0; i < a.length; i++) {
	const x = a[i];
	console.log(x);
	let y = a[i];
	setTimeout(() => console.log(y), 0);
	const z = a[i];
	setTimeout(function() {
		console.log(z);
	}, 0);
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 'use strict';
 var a = ['foo', 'bar'];
 for (var i = 0; i < a.length; i++) {
-	var x = a[i];
+	let x = a[i];
 	console.log(x);
 	let y = a[i];
 	setTimeout(() => console.log(y), 0);
-	const z = a[i];
+	let z = a[i];
 	setTimeout(function() {
 		console.log(z);
 	}, 0);

```

## `uglify/varify/reduce_merge_const`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 62 (-2 bytes, no whitespaces)

```js
const a = console;
console.log(typeof a);
var b = typeof a;
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a = console;
+const a = console;
+console.log(typeof a);
 console.log(typeof a);
-a = typeof a;
-console.log(a);

```

## `uglify/arrows/issue_4448`

- size: oxc 67 vs reference 70 (-3 bytes, no whitespaces)

```js
var A;
try {
	((arguments) => {
		arguments[0];
	})(A);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 	((arguments) => {
 		arguments[0];
 	})(A);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/arrows/issue_5416_2`

- tags: `remove unused`
- size: oxc 79 vs reference 82 (-3 bytes, no whitespaces)

```js
var f = () => {
	while ((() => {
		console;
		var a = function g(arguments) {
			while (console.log(arguments));
		}();
	})());
};
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-var f = () => {
-	console;
-	var arguments = void 0;
-	for (; console.log(arguments););
-	return;
-};
-f();
+(() => {
+	for (; function(arguments) {
+		for (; console.log(arguments););
+	}(), void 0;);
+})();

```

## `uglify/assignments/issue_3429_1`

- tags: `remove unused`
- size: oxc 58 vs reference 61 (-3 bytes, no whitespaces)

```js
var a = 'PASS';
(function(b) {
	b && (b = a = 'FAIL');
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 'PASS';
 (function(b) {
-	b = b && (a = 'FAIL');
+	b &&= a = 'FAIL';
 })();
 console.log(a);

```

## `uglify/assignments/issue_3429_2`

- tags: `remove unused`
- size: oxc 53 vs reference 56 (-3 bytes, no whitespaces)

```js
var a;
(function(b) {
	b || (b = a = 'FAIL');
})(42);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a;
 (function(b) {
-	b = b || (a = 'FAIL');
+	b ||= a = 'FAIL';
 })(42);
 console.log(a);

```

## `uglify/assignments/logical_collapse_vars_1`

- tags: `join vars`
- size: oxc 48 vs reference 51 (-3 bytes, no whitespaces)

```js
var a = 'FAIL', b = false;
a = 'PASS';
b ??= a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var a = 'FAIL', b = false;
+var a = 'FAIL', b = !1;
 a = 'PASS';
 b ??= a;
 console.log(a);

```

## `uglify/awaits/issue_4359`

- tags: `join vars`, `remove unused`
- size: oxc 63 vs reference 66 (-3 bytes, no whitespaces)

```js
try {
	(async function(a) {
		return a;
	})(A);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 	(async function(a) {
 		return a;
 	})(A);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/awaits/issue_5070`

- size: oxc 75 vs reference 78 (-3 bytes, no whitespaces)

```js
(async function() {
	try {
		for await (var a of console.log('PASS'));
	} catch (e) {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (async function() {
 	try {
 		for await (var a of console.log('PASS'));
-	} catch (e) {}
+	} catch {}
 })();

```

## `uglify/awaits/issue_5157_async_function`

- size: oxc 112 vs reference 115 (-3 bytes, no whitespaces)

```js
async function f() {
	throw 'FAIL';
}
(async function() {
	try {
		return await f();
	} catch (e) {
		return 'PASS';
	}
})().then(console.log);

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 (async function() {
 	try {
 		return await f();
-	} catch (e) {
+	} catch {
 		return 'PASS';
 	}
 })().then(console.log);

```

## `uglify/awaits/issue_5157_async_iife`

- size: oxc 109 vs reference 112 (-3 bytes, no whitespaces)

```js
(async function() {
	try {
		return await async function() {
			throw 'FAIL';
		}();
	} catch (e) {
		return 'PASS';
	}
})().then(console.log);

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 		return await async function() {
 			throw 'FAIL';
 		}();
-	} catch (e) {
+	} catch {
 		return 'PASS';
 	}
 })().then(console.log);

```

## `uglify/awaits/issue_5157_promise`

- size: oxc 139 vs reference 142 (-3 bytes, no whitespaces)

```js
var p = new Promise(function(resolve, reject) {
	reject('FAIL');
});
(async function() {
	try {
		return await p;
	} catch (e) {
		return 'PASS';
	}
})().then(console.log);

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 (async function() {
 	try {
 		return await p;
-	} catch (e) {
+	} catch {
 		return 'PASS';
 	}
 })().then(console.log);

```

## `uglify/awaits/issue_5159_1`

- size: oxc 145 vs reference 148 (-3 bytes, no whitespaces)

```js
(async function() {
	try {
		throw 'foo';
	} catch (e) {
		return await 'bar';
	} finally {
		console.log('baz');
	}
})().catch(console.log).then(console.log);
console.log('moo');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 (async function() {
 	try {
 		throw 'foo';
-	} catch (e) {
+	} catch {
 		return await 'bar';
 	} finally {
 		console.log('baz');

```

## `uglify/awaits/issue_5493`

- tags: `join vars`
- size: oxc 58 vs reference 61 (-3 bytes, no whitespaces)

```js
(async function(a) {
	var b = await [42 || b, a = b];
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (async function(a) {
-	var b = await [42 || b, a = b];
+	var b = await [42, a = b];
 	console.log(a);
 })();

```

## `uglify/awaits/issue_5528_3`

- size: oxc 130 vs reference 133 (-3 bytes, no whitespaces)

```js
(async function() {
	await function() {
		try {
			FAIL;
		} catch (e) {
			return console.log('foo');
		} finally {
			console.log('bar');
		}
	}();
})();
console.log('baz');

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	await function() {
 		try {
 			FAIL;
-		} catch (e) {
+		} catch {
 			return console.log('foo');
 		} finally {
 			console.log('bar');

```

## `uglify/awaits/issue_5842`

- size: oxc 123 vs reference 126 (-3 bytes, no whitespaces)

```js
var a = 'FAIL';
(async function() {
	await function() {
		try {
			try {
				return console;
			} finally {
				a = 'PASS';
			}
		} catch (e) {}
		FAIL;
	}();
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -7,7 +7,7 @@
 			} finally {
 				a = 'PASS';
 			}
-		} catch (e) {}
+		} catch {}
 		FAIL;
 	}();
 })();

```

## `uglify/blocks/issue_1666`

- size: oxc 45 vs reference 48 (-3 bytes, no whitespaces)

```js
var a = 42;
{
	function a() {}
	a();
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 var a = 42;
 {
 	function a() {}
-	a();
 }
 console.log('PASS');

```

## `uglify/blocks/issue_1666_strict`

- size: oxc 58 vs reference 61 (-3 bytes, no whitespaces)

```js
'use strict';
var a = 42;
{
	function a() {}
	a();
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,5 @@
 var a = 42;
 {
 	function a() {}
-	a();
 }
 console.log('PASS');

```

## `uglify/booleans/de_morgan_1c`

- size: oxc 24 vs reference 27 (-3 bytes, no whitespaces)

```js
console.log(delete (NaN && NaN));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(delete (0, NaN));
+console.log(delete NaN);

```

## `uglify/booleans/issue_3465_2`

- size: oxc 82 vs reference 85 (-3 bytes, no whitespaces)

```js
console.log(function f(a) {
	if (!a) console.log(f(42));
	return typeof a;
}() ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log(function f(a) {
-	if (!a) console.log(f(42));
+	a || console.log(f(42));
 	return typeof a;
 }() ? 'PASS' : 'FAIL');

```

## `uglify/classes/drop_name`

- tags: `remove unused`
- size: oxc 75 vs reference 78 (-3 bytes, no whitespaces)

```js
'use strict';
try {
	console.log(class A extends 42 {});
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
 try {
 	console.log(class extends 42 {});
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/classes/fields`

- size: oxc 141 vs reference 144 (-3 bytes, no whitespaces)

```js
var o = new class A {
	'#p';
	static #p = 'PASS';
	async;
	get q() {
		return A.#p;
	}
	[6 * 7] = console ? 'foo' : 'bar';
}();
for (var k in o) console.log(k, o[k]);
console.log(o.q);

```

```diff
--- reference
+++ oxc
@@ -5,7 +5,7 @@
 	get q() {
 		return A.#p;
 	}
-	[6 * 7] = console ? 'foo' : 'bar';
+	42 = console ? 'foo' : 'bar';
 }();
 for (var k in o) console.log(k, o[k]);
 console.log(o.q);

```

## `uglify/classes/issue_4756`

- tags: `remove unused`
- size: oxc 95 vs reference 98 (-3 bytes, no whitespaces)

```js
try {
	class A extends 42 {
		static [console.log('foo')] = console.log('bar');
	}
} catch (e) {
	console.log('baz');
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 try {
-	(class extends 42 {
+	class A extends 42 {
 		static [console.log('foo')] = console.log('bar');
-	});
-} catch (e) {
+	}
+} catch {
 	console.log('baz');
 }

```

## `uglify/classes/issue_4756_strict`

- tags: `remove unused`
- size: oxc 108 vs reference 111 (-3 bytes, no whitespaces)

```js
'use strict';
try {
	class A extends 42 {
		static [console.log('foo')] = console.log('bar');
	}
} catch (e) {
	console.log('baz');
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 'use strict';
 try {
-	(class extends 42 {
+	class A extends 42 {
 		static [console.log('foo')] = console.log('bar');
-	});
-} catch (e) {
+	}
+} catch {
 	console.log('baz');
 }

```

## `uglify/classes/issue_4829_2`

- size: oxc 87 vs reference 90 (-3 bytes, no whitespaces)

```js
'use strict';
try {
	class A extends { f() {
		return arguments;
	} }.f {}
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 	class A extends { f() {
 		return arguments;
 	} }.f {}
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/classes/issue_5053_1`

- tags: `join vars`
- size: oxc 89 vs reference 92 (-3 bytes, no whitespaces)

```js
'use strict';
try {
	console.log(new class A {
		constructor() {
			A = 42;
		}
	}());
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,6 @@
 			A = 42;
 		}
 	}());
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/classes/issue_5053_2`

- tags: `join vars`
- size: oxc 85 vs reference 88 (-3 bytes, no whitespaces)

```js
'use strict';
try {
	console.log(new class A {
		f() {
			A = 42;
		}
	}().f());
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,6 @@
 			A = 42;
 		}
 	}().f());
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/classes/issue_5053_3`

- tags: `join vars`
- size: oxc 67 vs reference 70 (-3 bytes, no whitespaces)

```js
try {
	console.log(new class A {
		p = A = 42;
	}().p);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 	console.log(new class A {
 		p = A = 42;
 	}().p);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/classes/issue_5053_4`

- tags: `join vars`, `remove unused`
- size: oxc 90 vs reference 93 (-3 bytes, no whitespaces)

```js
'use strict';
class A {
	constructor() {
		A = 42;
	}
}
try {
	console.log(new A());
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -6,6 +6,6 @@
 }
 try {
 	console.log(new A());
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/classes/issue_5387`

- size: oxc 101 vs reference 104 (-3 bytes, no whitespaces)

```js
'use strict';
(function(a) {
	try {
		class A extends a {}
	} catch (e) {
		console.log('PASS');
	}
})({ f() {
	return this;
} }.f);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 (function(a) {
 	try {
 		class A extends a {}
-	} catch (e) {
+	} catch {
 		console.log('PASS');
 	}
 })({ f() {

```

## `uglify/classes/mangle_properties`

- size: oxc 144 vs reference 147 (-3 bytes, no whitespaces)

```js
class A {
	static #P = 'PASS';
	static get Q() {
		return this.#P;
	}
	#p(n) {
		return (this['q'] = n) * this.r;
	}
	set q(v) {
		this.r = v + 1;
	}
	r = this.#p(6);
}
console.log(A.Q, new A().r);

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
 class A {
-	static #t = 'PASS';
-	static get t() {
-		return this.#t;
+	static #P = 'PASS';
+	static get Q() {
+		return this.#P;
 	}
-	#s(t) {
-		return (this['q'] = t) * this.s;
+	#p(n) {
+		return (this.q = n) * this.r;
 	}
-	set q(t) {
-		this.s = t + 1;
+	set q(v) {
+		this.r = v + 1;
 	}
-	s = this.#s(6);
+	r = this.#p(6);
 }
-console.log(A.t, new A().s);
+console.log(A.Q, new A().r);

```

## `uglify/collapse_vars/boolean_binary_2`

- tags: `join vars`
- size: oxc 59 vs reference 62 (-3 bytes, no whitespaces)

```js
var c = 0;
c += 1;
(function() {
	c = 1 + c;
} || 9).toString();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 c += 1;
 (function() {
 	c = 1 + c;
-} || 9).toString();
+}).toString();
 console.log(c);

```

## `uglify/collapse_vars/compound_assignment_6`

- tags: `join vars`
- size: oxc 33 vs reference 36 (-3 bytes, no whitespaces)

```js
var a;
a ^= 6;
a *= a + 1;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var a;
-a = (a ^= 6) * (a + 1);
+a ^= 6;
+a *= a + 1;
 console.log(a);

```

## `uglify/collapse_vars/dot_in_try`

- tags: `join vars`
- size: oxc 54 vs reference 57 (-3 bytes, no whitespaces)

```js
var o, a = 6, b = 7, c;
try {
	c = a * b;
	o.p(c);
} catch (e) {
	console.log(c);
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 try {
 	c = a * b;
 	o.p(c);
-} catch (e) {
+} catch {
 	console.log(c);
 }

```

## `uglify/collapse_vars/dot_throw_assign_sequence`

- tags: `join vars`
- size: oxc 69 vs reference 72 (-3 bytes, no whitespaces)

```js
var a = 'FAIL';
try {
	var b;
	b[0] = (a = 'PASS', 0);
	a = 1 + a;
} catch (c) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -3,5 +3,5 @@
 	var b;
 	b[0] = (a = 'PASS', 0);
 	a = 1 + a;
-} catch (c) {}
+} catch {}
 console.log(a);

```

## `uglify/collapse_vars/issue_2571_2`

- tags: `join vars`
- size: oxc 45 vs reference 48 (-3 bytes, no whitespaces)

```js
try {
	var a = A, b = 1;
	throw a;
} catch (e) {
	console.log(b);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	var a = A, b = 1;
 	throw a;
-} catch (e) {
+} catch {
 	console.log(b);
 }

```

## `uglify/collapse_vars/issue_2891_1`

- tags: `join vars`
- size: oxc 62 vs reference 65 (-3 bytes, no whitespaces)

```js
var a = 'PASS', b;
try {
	b = c.p = 0;
	a = 'FAIL';
	b();
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -3,5 +3,5 @@
 	b = c.p = 0;
 	a = 'FAIL';
 	b();
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `uglify/collapse_vars/issue_2891_2`

- tags: `join vars`
- size: oxc 73 vs reference 76 (-3 bytes, no whitespaces)

```js
'use strict';
var a = 'PASS', b;
try {
	b = c = 0;
	a = 'FAIL';
	b();
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -4,5 +4,5 @@
 	b = c = 0;
 	a = 'FAIL';
 	b();
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `uglify/collapse_vars/issue_2954_1`

- tags: `join vars`
- size: oxc 93 vs reference 96 (-3 bytes, no whitespaces)

```js
var a = 'PASS', b;
try {
	do {
		b = function() {
			throw 0;
		}();
		a = 'FAIL';
		b && b.c;
	} while (0);
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -7,5 +7,5 @@
 		a = 'FAIL';
 		b && b.c;
 	} while (0);
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `uglify/collapse_vars/issue_3573`

- tags: `join vars`
- size: oxc 103 vs reference 106 (-3 bytes, no whitespaces)

```js
var c = 0;
(function(b) {
	while (--b) {
		b = NaN;
		switch (0 / this < 0) {
			case c++, false:
			case c++, NaN:
		}
	}
})(3);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var c = 0;
 (function(b) {
-	while (--b) {
+	for (; --b;) {
 		b = NaN;
 		switch (0 / this < 0) {
-			case c++, false:
+			case c++, !1:
 			case c++, NaN:
 		}
 	}

```

## `uglify/collapse_vars/issue_3581_1`

- tags: `join vars`
- size: oxc 87 vs reference 90 (-3 bytes, no whitespaces)

```js
var a = 'PASS', b = 'FAIL';
try {
	b = 'PASS';
	if (a) throw 0;
	b = 1 + b;
	a = 'FAIL';
} catch (e) {}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -4,5 +4,5 @@
 	if (a) throw 0;
 	b = 1 + b;
 	a = 'FAIL';
-} catch (e) {}
+} catch {}
 console.log(a, b);

```

## `uglify/collapse_vars/issue_3626_1`

- tags: `join vars`
- size: oxc 45 vs reference 48 (-3 bytes, no whitespaces)

```js
var a = 'foo', b = 42;
a.p && (b = a) && a;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 'foo', b = 42;
-a.p && (b = a) && a;
+a.p && (b = a);
 console.log(a, b);

```

## `uglify/collapse_vars/issue_3641`

- tags: `join vars`
- size: oxc 67 vs reference 70 (-3 bytes, no whitespaces)

```js
var a, b;
try {
	a = 'foo';
	b = (a += (A.p = 0, 'bar')) % 0;
} catch (e) {}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 try {
 	a = 'foo';
 	b = (a += (A.p = 0, 'bar')) % 0;
-} catch (e) {}
+} catch {}
 console.log(a, b);

```

## `uglify/collapse_vars/issue_3671`

- tags: `join vars`
- size: oxc 48 vs reference 51 (-3 bytes, no whitespaces)

```js
var a = 0;
try {
	a++;
	A += 0;
	a = 1 + a;
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 	a++;
 	A += 0;
 	a = 1 + a;
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/collapse_vars/issue_3700`

- tags: `join vars`
- size: oxc 78 vs reference 81 (-3 bytes, no whitespaces)

```js
var a = 'FAIL';
try {
	a = 'PASS';
	(function() {
		throw 0;
	})();
	a = 1 + a;
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -5,5 +5,5 @@
 		throw 0;
 	})();
 	a = 1 + a;
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `uglify/collapse_vars/issue_4051`

- tags: `join vars`
- size: oxc 51 vs reference 54 (-3 bytes, no whitespaces)

```js
try {
	var a = (b = b.p, 'FAIL'), b = b;
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 try {
 	var a = (b = b.p, 'FAIL'), b = b;
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `uglify/collapse_vars/issue_4248`

- tags: `join vars`
- size: oxc 42 vs reference 45 (-3 bytes, no whitespaces)

```js
var a = 0;
try {
	a = 1;
	b[1];
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 try {
 	a = 1;
 	b[1];
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/collapse_vars/issue_4586_2`

- tags: `join vars`
- size: oxc 76 vs reference 79 (-3 bytes, no whitespaces)

```js
var a = 42;
(function f(b) {
	b = a;
	if (b === arguments[0]) console.log('PASS');
})(console);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = 42;
-(function f(b) {
-	if ((b = a) === arguments[0]) console.log('PASS');
+(function(b) {
+	b = 42;
+	b === arguments[0] && console.log('PASS');
 })(console);

```

## `uglify/collapse_vars/issue_5112_1`

- tags: `join vars`
- size: oxc 114 vs reference 117 (-3 bytes, no whitespaces)

```js
console.log(function(a) {
	try {
		try {
			if (console + (a = 'PASS', '')) return 'FAIL 1';
			a.p;
		} catch (e) {}
	} finally {
		return a;
	}
}('FAIL 2'));

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 		try {
 			if (console + (a = 'PASS', '')) return 'FAIL 1';
 			a.p;
-		} catch (e) {}
+		} catch {}
 	} finally {
 		return a;
 	}

```

## `uglify/collapse_vars/issue_5112_2`

- tags: `join vars`
- size: oxc 135 vs reference 138 (-3 bytes, no whitespaces)

```js
console.log(function(a) {
	try {
		return function() {
			try {
				if (console + (a = 'PASS', '')) return 'FAIL 1';
				a.p;
			} catch (e) {}
		}();
	} finally {
		return a;
	}
}('FAIL 2'));

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 			try {
 				if (console + (a = 'PASS', '')) return 'FAIL 1';
 				a.p;
-			} catch (e) {}
+			} catch {}
 		}();
 	} finally {
 		return a;

```

## `uglify/collapse_vars/operator_in`

- tags: `join vars`
- size: oxc 99 vs reference 102 (-3 bytes, no whitespaces)

```js
function log(msg) {
	console.log(msg);
}
var a = 'FAIL';
try {
	a = 'PASS';
	0 in null;
	log('FAIL', a);
} catch (e) {}
log(a);

```

```diff
--- reference
+++ oxc
@@ -6,5 +6,5 @@
 	a = 'PASS';
 	0 in null;
 	log('FAIL', a);
-} catch (e) {}
+} catch {}
 log(a);

```

## `uglify/conditionals/cond_8b`

- size: oxc 276 vs reference 279 (-3 bytes, no whitespaces)

```js
var a;
// compress these
a = condition ? true : false;
a = !condition ? true : false;
a = condition() ? true : false;
a = condition ? !0 : !1;
a = !condition ? !null : !2;
a = condition() ? !0 : !-3.5;
if (condition) {
	a = true;
} else {
	a = false;
}
if (condition) {
	a = !0;
} else {
	a = !1;
}
a = condition ? false : true;
a = !condition ? false : true;
a = condition() ? false : true;
a = condition ? !3 : !0;
a = !condition ? !2 : !0;
a = condition() ? !1 : !0;
if (condition) {
	a = false;
} else {
	a = true;
}
if (condition) {
	a = !1;
} else {
	a = !0;
}
a = condition ? 1 : false;
a = !condition ? true : 0;
a = condition ? 1 : 0;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a;
-a = !!condition;
+var a = !!condition;
 a = !condition;
 a = !!condition();
 a = !!condition;
@@ -15,6 +14,6 @@
 a = !condition();
 a = !condition;
 a = !condition;
-a = !!condition && 1;
+a = condition ? 1 : !1;
 a = !condition || 0;
-a = condition ? 1 : 0;
+a = +!!condition;

```

## `uglify/conditionals/issue_3668_2`

- size: oxc 107 vs reference 110 (-3 bytes, no whitespaces)

```js
function f() {
	try {
		var undefined = typeof f;
		if (!f) return undefined;
		return;
	} catch (e) {
		return 'FAIL';
	}
	FAIL;
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 function f() {
 	try {
 		var undefined = typeof f;
-		return f ? void 0 : undefined;
-	} catch (e) {
+		if (!f) return undefined;
+		return;
+	} catch {
 		return 'FAIL';
 	}
-	FAIL;
 }
 console.log(f());

```

## `uglify/conditionals/issue_5334_1`

- tags: `join vars`, `remove unused`
- size: oxc 78 vs reference 81 (-3 bytes, no whitespaces)

```js
function f() {
	if (console.log('PASS')) var o = true, o = { p: o += console.log('FAIL') };
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-(function() {
-	var o;
-	console.log('PASS') && (o = true, o = { p: o += console.log('FAIL') });
-})();
+function f() {
+	if (console.log('PASS')) var o = !0, o = { p: o += console.log('FAIL') };
+}
+f();

```

## `uglify/conditionals/issue_5544_1`

- size: oxc 116 vs reference 119 (-3 bytes, no whitespaces)

```js
var a;
if (a) switch (42) {
	case console.log('FAIL'):
	case console:
}
else switch (false) {
	case console.log('PASS'):
	case console:
}

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 	case console.log('FAIL'):
 	case console:
 }
-else switch (false) {
+else switch (!1) {
 	case console.log('PASS'):
 	case console:
 }

```

## `uglify/conditionals/issue_5666_1`

- tags: `join vars`, `remove unused`
- size: oxc 56 vs reference 59 (-3 bytes, no whitespaces)

```js
var a;
(function() {
	var b = a;
	a ? a = b : (b++, a = b);
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a;
 (function() {
 	var b = a;
-	a = (a ? 0 : b++, b);
+	a || b++, a = b;
 })();
 console.log(a);

```

## `uglify/conditionals/issue_5666_2`

- tags: `join vars`, `remove unused`
- size: oxc 62 vs reference 65 (-3 bytes, no whitespaces)

```js
var a = 'foo';
(function() {
	var b = a;
	a ? (b++, a = b) : a = b;
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a = 'foo';
 (function() {
 	var b = a;
-	a = (a ? b++ : 0, b);
+	a && b++, a = b;
 })();
 console.log(a);

```

## `uglify/const/issue_4245`

- size: oxc 26 vs reference 29 (-3 bytes, no whitespaces)

```js
const a = f();
function f() {
	typeof a;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
 const a = f();
-function f() {
-	a, 1;
-}
+function f() {}

```

## `uglify/const/use_before_init_2`

- tags: `remove unused`
- size: oxc 52 vs reference 55 (-3 bytes, no whitespaces)

```js
try {
	a = 'foo';
} catch (e) {
	console.log('PASS');
}
const a = 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	a = 'foo';
-} catch (e) {
+} catch {
 	console.log('PASS');
 }
 const a = 'bar';

```

## `uglify/const/use_before_init_4`

- tags: `join vars`
- size: oxc 60 vs reference 63 (-3 bytes, no whitespaces)

```js
try {
	console.log(a);
} catch (e) {
	console.log('PASS');
}
const a = 'FAIL';

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	console.log(a);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }
 const a = 'FAIL';

```

## `uglify/dead-code/issue_2929`

- size: oxc 80 vs reference 83 (-3 bytes, no whitespaces)

```js
console.log(function(a) {
	try {
		return null.p = a = 1;
	} catch (e) {
		return a ? 'PASS' : 'FAIL';
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 console.log(function(a) {
 	try {
 		return null.p = a = 1;
-	} catch (e) {
+	} catch {
 		return a ? 'PASS' : 'FAIL';
 	}
 }());

```

## `uglify/dead-code/issue_3578`

- size: oxc 72 vs reference 75 (-3 bytes, no whitespaces)

```js
var a = 'FAIL', b, c;
try {
	b = c.p = b = 0;
} catch (e) {
	b += 42;
	b && (a = 'PASS');
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 'FAIL', b, c;
 try {
 	b = c.p = b = 0;
-} catch (e) {
+} catch {
 	b += 42;
 	b && (a = 'PASS');
 }

```

## `uglify/dead-code/issue_3967`

- size: oxc 56 vs reference 59 (-3 bytes, no whitespaces)

```js
var a = 'FAIL';
try {
	a = 0 in (a = 'PASS');
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 'FAIL';
 try {
 	a = 0 in (a = 'PASS');
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `uglify/dead-code/issue_4051`

- size: oxc 42 vs reference 45 (-3 bytes, no whitespaces)

```js
try {
	delete (A = A);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	delete (A = A);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/default-values/flatten_if`

- size: oxc 59 vs reference 62 (-3 bytes, no whitespaces)

```js
if (console.log('PASS')) {
	var [a = function b() {
		for (c in b);
	}] = 0;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a;
-console.log('PASS') && ([a = function b() {
+if (console.log('PASS')) var [a = function b() {
 	for (c in b);
-}] = 0);
+}] = 0;

```

## `uglify/default-values/issue_4460`

- tags: `join vars`
- size: oxc 58 vs reference 61 (-3 bytes, no whitespaces)

```js
var log = console.log, a = 'FAIL';
var [b = a] = (a = 'PASS', []);
log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var log = console.log, a = 'FAIL';
-var [b = a] = (a = 'PASS', []);
+var log = console.log, a = 'FAIL', [b = a] = (a = 'PASS', []);
 log(a, b);

```

## `uglify/default-values/issue_4483`

- tags: `join vars`
- size: oxc 54 vs reference 57 (-3 bytes, no whitespaces)

```js
if (console) var [a = 'FAIL'] = [], b = a = 'PASS';
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var a, b;
-console && ([a = 'FAIL'] = [], b = 'PASS');
+if (console) var [a = 'FAIL'] = [], b = a = 'PASS';
 console.log(b);

```

## `uglify/default-values/issue_4485_1`

- size: oxc 84 vs reference 87 (-3 bytes, no whitespaces)

```js
(function(a = null) {
	var arguments;
	try {
		arguments.length;
	} catch (e) {
		console.log('PASS');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	var arguments;
 	try {
 		arguments.length;
-	} catch (e) {
+	} catch {
 		console.log('PASS');
 	}
 })();

```

## `uglify/default-values/issue_4485_2`

- size: oxc 89 vs reference 92 (-3 bytes, no whitespaces)

```js
(function(a = null) {
	var arguments = null;
	try {
		arguments.length;
	} catch (e) {
		console.log('PASS');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	var arguments = null;
 	try {
 		arguments.length;
-	} catch (e) {
+	} catch {
 		console.log('PASS');
 	}
 })();

```

## `uglify/default-values/issue_4485_3`

- tags: `remove unused`
- size: oxc 84 vs reference 87 (-3 bytes, no whitespaces)

```js
(function(a = null) {
	var arguments;
	try {
		arguments.length;
	} catch (e) {
		console.log('PASS');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	var arguments;
 	try {
 		arguments.length;
-	} catch (e) {
+	} catch {
 		console.log('PASS');
 	}
 })();

```

## `uglify/default-values/issue_4523`

- tags: `join vars`
- size: oxc 70 vs reference 73 (-3 bytes, no whitespaces)

```js
console.log(function() {
	var a, b;
	[a = b = false] = ['FAIL'];
	return b || 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(function() {
 	var a, b;
-	[a = b = false] = ['FAIL'];
+	[a = b = !1] = ['FAIL'];
 	return b || 'PASS';
 }());

```

## `uglify/default-values/issue_4548_2`

- tags: `join vars`
- size: oxc 74 vs reference 77 (-3 bytes, no whitespaces)

```js
A = 'foo';
var a = A;
var [b = c = 'bar'] = [console, console.log(a)];
console.log(c);
var c;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 A = 'foo';
-var a = A;
-var [b = c = 'bar'] = [console, console.log(a)];
+var a = A, [b = c = 'bar'] = [console, console.log(a)];
 console.log(c);
 var c;

```

## `uglify/default-values/issue_5536`

- tags: `remove unused`
- size: oxc 66 vs reference 69 (-3 bytes, no whitespaces)

```js
(function* () {
	(([], a = 42) => {})([]);
	console.log(typeof a);
})().next();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function* () {
-	[, [][0] = 0] = [[]], void 0;
+	(([], a = 42) => {})([]);
 	console.log(typeof a);
 })().next();

```

## `uglify/default-values/retain_empty_iife`

- size: oxc 56 vs reference 59 (-3 bytes, no whitespaces)

```js
var a;
try {
	(function(a = a) {})();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a;
 try {
 	(function(a = a) {})();
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/destructured/collapse_vars_1`

- tags: `join vars`
- size: oxc 39 vs reference 42 (-3 bytes, no whitespaces)

```js
var a = 'PASS';
var { [a.p]: a } = !console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = 'PASS';
-var { [a.p]: a } = !console.log(a);
+var a = 'PASS', { [a.p]: a } = !console.log(a);

```

## `uglify/destructured/collapse_vars_4`

- tags: `join vars`
- size: oxc 49 vs reference 52 (-3 bytes, no whitespaces)

```js
var a;
try {
	a = 42;
	[42 .p] = null;
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 try {
 	a = 42;
 	[42 .p] = null;
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/destructured/collapse_vars_5`

- tags: `join vars`
- size: oxc 51 vs reference 54 (-3 bytes, no whitespaces)

```js
var a;
try {
	[] = (a = 42, null);
	a = 42;
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 try {
 	[] = (a = 42, null);
 	a = 42;
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/destructured/collapse_vars_6`

- tags: `join vars`
- size: oxc 54 vs reference 57 (-3 bytes, no whitespaces)

```js
var a;
try {
	var [] = (a = 42, null);
	a = 42;
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 try {
 	var [] = (a = 42, null);
 	a = 42;
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/destructured/collapse_vars_7`

- tags: `join vars`
- size: oxc 86 vs reference 89 (-3 bytes, no whitespaces)

```js
var a = 'FAIL';
try {
	(function() {
		[] = (a = 'PASS', null);
		return 'PASS';
	})();
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 		[] = (a = 'PASS', null);
 		return 'PASS';
 	})();
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/destructured/collapse_vars_8`

- tags: `join vars`
- size: oxc 89 vs reference 92 (-3 bytes, no whitespaces)

```js
var a = 'FAIL';
try {
	(function() {
		var {} = (a = 'PASS', null);
		return 'PASS';
	})();
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 		var {} = (a = 'PASS', null);
 		return 'PASS';
 	})();
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/destructured/collapse_vars_9`

- tags: `join vars`
- size: oxc 117 vs reference 120 (-3 bytes, no whitespaces)

```js
console.log(function(a) {
	try {
		var b = function([c]) {
			if (c) return 'FAIL 1';
		}();
		a = 'FAIL 2';
		return b;
	} catch (e) {
		return a;
	}
}('PASS'));

```

```diff
--- reference
+++ oxc
@@ -5,7 +5,7 @@
 		}();
 		a = 'FAIL 2';
 		return b;
-	} catch (e) {
+	} catch {
 		return a;
 	}
 }('PASS'));

```

## `uglify/destructured/funarg_collapse_vars_1`

- tags: `join vars`, `remove unused`
- size: oxc 57 vs reference 60 (-3 bytes, no whitespaces)

```js
console.log(function(a, {}) {
	return typeof a;
	var b;
}(console, {}));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function(a, {}) {
-	return typeof (0, console);
-}(0, {}));
+	return typeof a;
+}(console, {}));

```

## `uglify/destructured/funarg_collapse_vars_3`

- tags: `join vars`
- size: oxc 78 vs reference 81 (-3 bytes, no whitespaces)

```js
var a = 'FAIL';
try {
	a = 'PASS';
	(function({}) {})();
	throw 'PASS';
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 	a = 'PASS';
 	(function({}) {})();
 	throw 'PASS';
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/destructured/funarg_collapse_vars_5`

- tags: `join vars`, `remove unused`
- size: oxc 92 vs reference 95 (-3 bytes, no whitespaces)

```js
A = 'FAIL';
B = 'PASS';
try {
	console.log(function({}, a) {
		return a;
	}(null, A = B));
} catch (e) {}
console.log(A);

```

```diff
--- reference
+++ oxc
@@ -4,5 +4,5 @@
 	console.log(function({}, a) {
 		return a;
 	}(null, A = B));
-} catch (e) {}
+} catch {}
 console.log(A);

```

## `uglify/destructured/funarg_collapse_vars_6`

- tags: `join vars`, `remove unused`
- size: oxc 108 vs reference 111 (-3 bytes, no whitespaces)

```js
A = 'FAIL';
B = 'PASS';
function f() {
	console.log(function({}, a) {
		return a;
	}(null, A = B));
}
try {
	f();
} catch (e) {
	console.log(A);
}

```

```diff
--- reference
+++ oxc
@@ -7,6 +7,6 @@
 }
 try {
 	f();
-} catch (e) {
+} catch {
 	console.log(A);
 }

```

## `uglify/destructured/funarg_reduce_vars_1`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 80 (-3 bytes, no whitespaces)

```js
try {
	(function({ [a]: b }, a) {
		console.log('FAIL');
	})({});
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 	(function({ [a]: b }, a) {
 		console.log('FAIL');
 	})({});
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/destructured/funarg_unused_5`

- tags: `remove unused`
- size: oxc 57 vs reference 60 (-3 bytes, no whitespaces)

```js
try {
	(function({ [c = 0]: c }) {})(1);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	(function({ [c = 0]: c }) {})(1);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/destructured/issue_4301`

- tags: `join vars`
- size: oxc 96 vs reference 99 (-3 bytes, no whitespaces)

```js
try {
	console.log(function() {
		var a, b = console;
		return {[a = b]: a.p} = 'foo';
	}());
} catch (e) {
	console.log('bar');
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 		var a, b = console;
 		return {[a = b]: a.p} = 'foo';
 	}());
-} catch (e) {
+} catch {
 	console.log('bar');
 }

```

## `uglify/destructured/issue_4425`

- size: oxc 99 vs reference 102 (-3 bytes, no whitespaces)

```js
var a;
console.log(function() {
	try {
		try {
			throw 42;
		} catch ({ [a]: a }) {}
		return 'FAIL';
	} catch (e) {
		return 'PASS';
	}
}());

```

```diff
--- reference
+++ oxc
@@ -3,9 +3,9 @@
 	try {
 		try {
 			throw 42;
-		} catch ({ [b]: b }) {}
+		} catch ({ [a]: a }) {}
 		return 'FAIL';
-	} catch (c) {
+	} catch {
 		return 'PASS';
 	}
 }());

```

## `uglify/destructured/issue_4485_1`

- size: oxc 82 vs reference 85 (-3 bytes, no whitespaces)

```js
(function([]) {
	var arguments;
	try {
		arguments.length;
	} catch (e) {
		console.log('PASS');
	}
})([]);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	var arguments;
 	try {
 		arguments.length;
-	} catch (e) {
+	} catch {
 		console.log('PASS');
 	}
 })([]);

```

## `uglify/destructured/issue_4485_2`

- size: oxc 87 vs reference 90 (-3 bytes, no whitespaces)

```js
(function([]) {
	var arguments = null;
	try {
		arguments.length;
	} catch (e) {
		console.log('PASS');
	}
})([]);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	var arguments = null;
 	try {
 		arguments.length;
-	} catch (e) {
+	} catch {
 		console.log('PASS');
 	}
 })([]);

```

## `uglify/destructured/issue_4485_3`

- tags: `remove unused`
- size: oxc 82 vs reference 85 (-3 bytes, no whitespaces)

```js
(function([]) {
	var arguments;
	try {
		arguments.length;
	} catch (e) {
		console.log('PASS');
	}
})([]);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	var arguments;
 	try {
 		arguments.length;
-	} catch (e) {
+	} catch {
 		console.log('PASS');
 	}
 })([]);

```

## `uglify/destructured/issue_4519_1`

- size: oxc 77 vs reference 80 (-3 bytes, no whitespaces)

```js
try {
	(function() {
		var [arguments] = [];
		arguments[0];
	})();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 		var [arguments] = [];
 		arguments[0];
 	})();
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/destructured/issue_4519_2`

- size: oxc 77 vs reference 80 (-3 bytes, no whitespaces)

```js
try {
	(function() {
		var [arguments] = [];
		arguments[0];
	})();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 		var [arguments] = [];
 		arguments[0];
 	})();
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/destructured/issue_4554`

- tags: `join vars`, `remove unused`
- size: oxc 86 vs reference 89 (-3 bytes, no whitespaces)

```js
A = 'PASS';
var a = 'FAIL';
try {
	(function({}, b) {
		return b;
	})(void 0, a = A);
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 	(function({}, b) {
 		return b;
 	})(void 0, a = A);
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/destructured/issue_5844`

- size: oxc 56 vs reference 59 (-3 bytes, no whitespaces)

```js
try {
	(function(a) {
		[a.p] = 42;
	})(console.log('PASS'));
} catch (e) {}

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 	(function(a) {
 		[a.p] = 42;
 	})(console.log('PASS'));
-} catch (e) {}
+} catch {}

```

## `uglify/destructured/issue_5866_4`

- tags: `remove unused`
- size: oxc 49 vs reference 52 (-3 bytes, no whitespaces)

```js
var a = {}, b;
[{p: b}] = [a, a.p = 'PASS'];
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var b, a = {};
-({p: b} = [a, a.p = 'PASS'][0]);
+var a = {}, b;
+[{p: b}] = [a, a.p = 'PASS'];
 console.log(b);

```

## `uglify/destructured/keep_reference`

- tags: `join vars`, `remove unused`
- size: oxc 58 vs reference 61 (-3 bytes, no whitespaces)

```js
var a = [{}, 42];
var [b, c] = a;
console.log(a[0] === b ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var a = [{}, 42];
-var b = a[0];
+var a = [{}, 42], [b, c] = a;
 console.log(a[0] === b ? 'PASS' : 'FAIL');

```

## `uglify/destructured/side_effects_array`

- tags: `remove unused`
- size: oxc 40 vs reference 43 (-3 bytes, no whitespaces)

```js
try {
	var [a] = 42;
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	var [a] = 42;
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/drop-unused/issue_4806_1`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 67 (-3 bytes, no whitespaces)

```js
O = { f: function() {
	console.log(this === O ? 'FAIL' : 'PASS');
} };
var a;
(a = 42, O.f)();
a;

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,3 @@
 	console.log(this === O ? 'FAIL' : 'PASS');
 } };
 (0, O.f)();
-42;

```

## `uglify/evaluate/issue_4552`

- tags: `join vars`, `remove unused`, `keep function names`
- size: oxc 84 vs reference 87 (-3 bytes, no whitespaces)

```js
var a = function f(b) {
	return function() {
		b++;
		try {
			return b;
		} catch (e) {}
	}();
}();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 		b++;
 		try {
 			return b;
-		} catch (e) {}
+		} catch {}
 	}();
 }();
 console.log(a);

```

## `uglify/evaluate/unsafe_array_bad_index`

- size: oxc 59 vs reference 62 (-3 bytes, no whitespaces)

```js
console.log([
	1,
	2,
	3,
	4
].a + 1, [
	1,
	2,
	3,
	4
]['a'] + 1, [
	1,
	2,
	3,
	4
][3.14] + 1);

```

```diff
--- reference
+++ oxc
@@ -8,7 +8,7 @@
 	2,
 	3,
 	4
-]['a'] + 1, [
+].a + 1, [
 	1,
 	2,
 	3,

```

## `uglify/functions/issue_5240_1`

- size: oxc 106 vs reference 109 (-3 bytes, no whitespaces)

```js
function f() {
	try {
		throw 'FAIL 1';
	} catch (e) {
		return function() {
			if (console) {
				console.log(e);
				var e = 'FAIL 2';
			}
		}();
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f() {
 	try {
 		throw 'FAIL 1';
-	} catch (e) {
+	} catch {
 		return function() {
 			if (console) {
 				console.log(e);

```

## `uglify/functions/issue_5240_2`

- size: oxc 106 vs reference 109 (-3 bytes, no whitespaces)

```js
function f() {
	try {
		throw 'FAIL 1';
	} catch (e) {
		{
			return function() {
				if (console) {
					console.log(e);
					var e = 'FAIL 2';
				}
			}();
		}
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f() {
 	try {
 		throw 'FAIL 1';
-	} catch (e) {
+	} catch {
 		return function() {
 			if (console) {
 				console.log(e);

```

## `uglify/hoist_props/issue_3021`

- tags: `join vars`
- size: oxc 82 vs reference 85 (-3 bytes, no whitespaces)

```js
var a = 1, b = 2;
(function() {
	b = a;
	if (a++ + b--) return 1;
	return;
	var b = {};
})();
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 	b = a;
 	if (a++ + b--) return 1;
 	return;
-	var b = {};
+	var b;
 })();
 console.log(a, b);

```

## `uglify/ie/issue_2120_1`

- size: oxc 97 vs reference 100 (-3 bytes, no whitespaces)

```js
'aaaaaaaa';
var a = 1, b = 'FAIL';
try {
	throw 1;
} catch (c) {
	try {
		throw 0;
	} catch (a) {
		if (c) b = 'PASS';
	}
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -2,11 +2,11 @@
 var a = 1, b = 'FAIL';
 try {
 	throw 1;
-} catch (t) {
+} catch (c) {
 	try {
 		throw 0;
-	} catch (a) {
-		if (t) b = 'PASS';
+	} catch {
+		c && (b = 'PASS');
 	}
 }
 console.log(b);

```

## `uglify/ie/issue_2120_2`

- size: oxc 97 vs reference 100 (-3 bytes, no whitespaces)

```js
'aaaaaaaa';
var a = 1, b = 'FAIL';
try {
	throw 1;
} catch (c) {
	try {
		throw 0;
	} catch (a) {
		if (c) b = 'PASS';
	}
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -5,8 +5,8 @@
 } catch (c) {
 	try {
 		throw 0;
-	} catch (a) {
-		if (c) b = 'PASS';
+	} catch {
+		c && (b = 'PASS');
 	}
 }
 console.log(b);

```

## `uglify/ie/issue_3035`

- size: oxc 100 vs reference 103 (-3 bytes, no whitespaces)

```js
var c = 'FAIL';
(function(a) {
	try {
		throw 1;
	} catch (b) {
		try {
			throw 0;
		} catch (a) {
			b && (c = 'PASS');
		}
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var c = 'FAIL';
-(function(o) {
+(function(a) {
 	try {
 		throw 1;
-	} catch (t) {
+	} catch (b) {
 		try {
 			throw 0;
-		} catch (o) {
-			t && (c = 'PASS');
+		} catch {
+			b && (c = 'PASS');
 		}
 	}
 })();

```

## `uglify/ie/issue_3035_ie8`

- size: oxc 100 vs reference 103 (-3 bytes, no whitespaces)

```js
var c = 'FAIL';
(function(a) {
	try {
		throw 1;
	} catch (b) {
		try {
			throw 0;
		} catch (a) {
			b && (c = 'PASS');
		}
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var c = 'FAIL';
-(function(t) {
+(function(a) {
 	try {
 		throw 1;
-	} catch (o) {
+	} catch (b) {
 		try {
 			throw 0;
-		} catch (t) {
-			o && (c = 'PASS');
+		} catch {
+			b && (c = 'PASS');
 		}
 	}
 })();

```

## `uglify/ie/issue_4028`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 63 (-3 bytes, no whitespaces)

```js
function a() {
	try {
		A;
	} catch (e) {}
}
var b = a += a;
console.log(typeof b);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function a() {
 	try {
 		A;
-	} catch (a) {}
+	} catch {}
 }
 var b = a += a;
 console.log(typeof b);

```

## `uglify/if_return/issue_5619_1`

- size: oxc 84 vs reference 87 (-3 bytes, no whitespaces)

```js
console.log(function() {
	if (console) {
		if (console) return 'PASS';
	}
	var a = FAIL;
	return 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 console.log(function() {
-	if (console) {
-		if (console) return 'PASS';
-	}
+	if (console && console) return 'PASS';
 	var a = FAIL;
 	return 'PASS';
 }());

```

## `uglify/issue-1733/function_catch_catch`

- size: oxc 103 vs reference 106 (-3 bytes, no whitespaces)

```js
var o = 0;
function f() {
	try {
		throw 1;
	} catch (c) {
		try {
			throw 2;
		} catch (o) {
			var o = 3;
			console.log(o);
		}
	}
	console.log(o);
}
f();

```

```diff
--- reference
+++ oxc
@@ -2,14 +2,14 @@
 function f() {
 	try {
 		throw 1;
-	} catch (o) {
+	} catch {
 		try {
 			throw 2;
-		} catch (c) {
-			var c = 3;
-			console.log(c);
+		} catch (o) {
+			var o = 3;
+			console.log(o);
 		}
 	}
-	console.log(c);
+	console.log(o);
 }
 f();

```

## `uglify/issue-1733/function_catch_catch_ie8`

- size: oxc 103 vs reference 106 (-3 bytes, no whitespaces)

```js
var o = 0;
function f() {
	try {
		throw 1;
	} catch (c) {
		try {
			throw 2;
		} catch (o) {
			var o = 3;
			console.log(o);
		}
	}
	console.log(o);
}
f();

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 function f() {
 	try {
 		throw 1;
-	} catch (c) {
+	} catch {
 		try {
 			throw 2;
 		} catch (o) {

```

## `uglify/issue-1833/label_while`

- size: oxc 14 vs reference 17 (-3 bytes, no whitespaces)

```js
function f() {
	L: while (0) continue L;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-function f() {
-	L: 0;
-}
+function f() {}

```

## `uglify/issue-3768/call_arg_1`

- size: oxc 94 vs reference 97 (-3 bytes, no whitespaces)

```js
var z = 'foo';
(function() {
	var z = false;
	(function(e) {
		var z = 42;
		e('console.log(typeof z)');
	})(eval);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 var z = 'foo';
 (function() {
-	var o = false;
-	(function(o) {
-		var a = 42;
-		o('console.log(typeof z)');
+	var z = !1;
+	(function(e) {
+		var z = 42;
+		e('console.log(typeof z)');
 	})(eval);
 })();

```

## `uglify/join_vars/issue_3786`

- tags: `join vars`
- size: oxc 62 vs reference 65 (-3 bytes, no whitespaces)

```js
try {
	var a = b;
	b = 0;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 	var a = b;
 	b = 0;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/join_vars/join_expr`

- tags: `join vars`
- size: oxc 86 vs reference 89 (-3 bytes, no whitespaces)

```js
var c = 'FAIL';
(function() {
	var a = 0;
	switch ((a = {}) && (a.b = 0)) {
		case 0: c = 'PASS';
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,6 @@
 var c = 'FAIL';
 (function() {
-	var a = 0, a = { b: 0 };
-	switch (a.b) {
-		case 0: c = 'PASS';
-	}
+	var a = 0;
+	((a = {}) && (a.b = 0)) === 0 && (c = 'PASS');
 })();
 console.log(c);

```

## `uglify/keep_fargs/trailing_argument_side_effects`

- tags: `remove unused`
- size: oxc 76 vs reference 79 (-3 bytes, no whitespaces)

```js
function f() {
	return 'FAIL';
}
console.log(function(a, b) {
	return b || 'PASS';
}(f()));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f() {
 	return 'FAIL';
 }
-console.log(function(b) {
+console.log(function(a, b) {
 	return b || 'PASS';
-}(void f()));
+}(f()));

```

## `uglify/labels/issue_5878_1`

- size: oxc 20 vs reference 23 (-3 bytes, no whitespaces)

```js
console.log('PASS');
L:;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
 console.log('PASS');
-L:;

```

## `uglify/labels/issue_5878_2`

- size: oxc 22 vs reference 25 (-3 bytes, no whitespaces)

```js
L:;
L: console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-L:;
 L: console.log('PASS');

```

## `uglify/let/do_break`

- size: oxc 79 vs reference 82 (-3 bytes, no whitespaces)

```js
'use strict';
try {
	do {
		if (a) break;
		let a;
	} while (!console);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 		if (a) break;
 		let a;
 	} while (!console);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/let/issue_4197`

- tags: `join vars`
- size: oxc 75 vs reference 78 (-3 bytes, no whitespaces)

```js
'use strict';
var a = 0;
try {
	let b = function() {
		a = 1;
		b[1];
	}();
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,6 @@
 		a = 1;
 		b[1];
 	}();
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/let/issue_4245`

- size: oxc 37 vs reference 40 (-3 bytes, no whitespaces)

```js
'use strict';
let a = f();
function f() {
	typeof a;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
 'use strict';
 let a = f();
-function f() {
-	a, 1;
-}
+function f() {}

```

## `uglify/let/issue_4248`

- tags: `join vars`
- size: oxc 87 vs reference 90 (-3 bytes, no whitespaces)

```js
var a = 'FAIL';
try {
	(function() {
		'use strict';
		a = 'PASS';
		b[a];
		let b;
	})();
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -6,6 +6,6 @@
 		b[a];
 		let b;
 	})();
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/let/issue_4290_2`

- tags: `join vars`
- size: oxc 90 vs reference 93 (-3 bytes, no whitespaces)

```js
'use strict';
try {
	console.log(function(a) {
		a = c;
		let c;
		return a;
	}());
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,6 @@
 		let c;
 		return a;
 	}());
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/let/use_before_init_2`

- tags: `remove unused`
- size: oxc 63 vs reference 66 (-3 bytes, no whitespaces)

```js
'use strict';
try {
	a = 'foo';
} catch (e) {
	console.log('PASS');
}
let a = 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'use strict';
 try {
 	a = 'foo';
-} catch (e) {
+} catch {
 	console.log('PASS');
 }
 let a = 'bar';

```

## `uglify/let/use_before_init_4`

- tags: `join vars`
- size: oxc 71 vs reference 74 (-3 bytes, no whitespaces)

```js
'use strict';
try {
	console.log(a);
} catch (e) {
	console.log('PASS');
}
let a = 'FAIL';

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'use strict';
 try {
 	console.log(a);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }
 let a = 'FAIL';

```

## `uglify/merge_vars/issue_4112`

- tags: `join vars`, `remove unused`
- size: oxc 119 vs reference 122 (-3 bytes, no whitespaces)

```js
console.log(typeof function() {
	try {
		throw 42;
	} catch (e) {
		var o = e;
		for (e in o);
		var a = function() {};
		console.log(typeof a);
		return a;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,8 @@
 	try {
 		throw 42;
 	} catch (e) {
-		var o = e;
-		for (e in o);
-		function a() {}
+		for (e in e);
+		var a = function() {};
 		console.log(typeof a);
 		return a;
 	}

```

## `uglify/merge_vars/issue_4126_1`

- tags: `join vars`
- size: oxc 93 vs reference 96 (-3 bytes, no whitespaces)

```js
function f(a) {
	try {
		console.log('PASS');
	} catch (e) {
		var b = a;
	} finally {
		var c = b;
	}
	console.log(c);
}
f('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 function f(a) {
 	try {
 		console.log('PASS');
-	} catch (e) {
+	} catch {
 		var b = a;
 	} finally {
-		var a = b;
+		var c = b;
 	}
-	console.log(a);
+	console.log(c);
 }
 f('FAIL');

```

## `uglify/merge_vars/issue_4759`

- tags: `join vars`
- size: oxc 98 vs reference 101 (-3 bytes, no whitespaces)

```js
var i = 2, a = 1, b, c, d;
while (i--) {
	try {
		if (1 != b) {
			d = [];
			null.p;
			c = d;
		} else {
			b = 0;
			a = c;
		}
	} catch (e) {}
	b = a;
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var i = 2, a = 1, b, c, d;
-while (i--) {
+for (; i--;) {
 	try {
-		if (1 != b) {
+		if (b != 1) {
 			d = [];
 			null.p;
 			c = d;
@@ -9,7 +9,7 @@
 			b = 0;
 			a = c;
 		}
-	} catch (e) {}
+	} catch {}
 	b = a;
 }
 console.log(a);

```

## `uglify/merge_vars/issue_4761`

- tags: `join vars`
- size: oxc 66 vs reference 69 (-3 bytes, no whitespaces)

```js
var a = 'FAIL', b;
try {
	!a && --a && (b = 0)[console] || console.log(b);
} catch (e) {}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var a = 'FAIL', b;
 try {
 	!a && --a && (b = 0)[console] || console.log(b);
-} catch (e) {}
+} catch {}

```

## `uglify/merge_vars/issue_5420`

- tags: `join vars`
- size: oxc 101 vs reference 104 (-3 bytes, no whitespaces)

```js
do {
	var a = 'FAIL 1';
	a && a.p;
	a = 'FAIL 2';
	try {
		continue;
	} catch (e) {}
	var b = 'FAIL 3';
} while (console.log(b || 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 	a = 'FAIL 2';
 	try {
 		continue;
-	} catch (e) {}
+	} catch {}
 	var b = 'FAIL 3';
 } while (console.log(b || 'PASS'));

```

## `uglify/merge_vars/try_branch`

- tags: `join vars`
- size: oxc 81 vs reference 84 (-3 bytes, no whitespaces)

```js
console.log(function(a) {
	var b = 'FAIL', c;
	try {
		a && F();
	} catch (e) {
		c = b;
	}
	return c || 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	var b = 'FAIL', c;
 	try {
 		a && F();
-	} catch (e) {
+	} catch {
 		c = b;
 	}
 	return c || 'PASS';

```

## `uglify/negate-iife/negate_iife_4`

- tags: `sequences`
- size: oxc 98 vs reference 101 (-3 bytes, no whitespaces)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);
(function() {
	console.log('something');
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!function() {
+(function() {
 	return t;
-}() ? console.log(false) : console.log(true), !function() {
+})() ? console.log(!0) : console.log(!1), (function() {
 	console.log('something');
-}();
+})();

```

## `uglify/negate-iife/negate_iife_5`

- tags: `sequences`
- size: oxc 82 vs reference 85 (-3 bytes, no whitespaces)

```js
if (function() {
	return t;
}()) {
	foo(true);
} else {
	bar(false);
}
(function() {
	console.log('something');
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!function() {
+(function() {
 	return t;
-}() ? bar(false) : foo(true), !function() {
+})() ? foo(!0) : bar(!1), (function() {
 	console.log('something');
-}();
+})();

```

## `uglify/numbers/comparisons`

- size: oxc 45 vs reference 48 (-3 bytes, no whitespaces)

```js
var x = '42', y = '0x30';
console.log(~x === 42, x % y === 42);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var x = '42', y = '0x30';
-console.log(42 == ~x, x % y == 42);
+var x = '42';
+console.log(~x === 42, x % '0x30' == 42);

```

## `uglify/numbers/issue_3676_1`

- size: oxc 39 vs reference 42 (-3 bytes, no whitespaces)

```js
var a = [];
console.log(false - (a - (a[1] = 42)));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = [];
-console.log(false - (a - (a[1] = 42)));
+console.log(!1 - (a - (a[1] = 42)));

```

## `uglify/numbers/issue_3676_2`

- size: oxc 41 vs reference 44 (-3 bytes, no whitespaces)

```js
var a;
console.log(false - ((a = []) - (a[1] = 42)));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-console.log(false - ((a = []) - (a[1] = 42)));
+console.log(!1 - ((a = []) - (a[1] = 42)));

```

## `uglify/numbers/unsafe_math_rounding`

- size: oxc 16 vs reference 19 (-3 bytes, no whitespaces)

```js
console.log(4 / -3 + 1 === 1 / -3);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(false);
+console.log(!1);

```

## `uglify/optional-chains/issue_5856`

- tags: `join vars`
- size: oxc 65 vs reference 68 (-3 bytes, no whitespaces)

```js
try {
	var a;
	a?.p;
	a.q;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 	a?.p;
 	a.q;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/optional-chains/issue_5912`

- tags: `join vars`
- size: oxc 80 vs reference 83 (-3 bytes, no whitespaces)

```js
var a, b = {};
b = b.p;
a?.[b.q];
try {
	b.r;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 try {
 	b.r;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/optional-chains/trim_dot_call_2`

- size: oxc 41 vs reference 44 (-3 bytes, no whitespaces)

```js
try {
	(null?.p)();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	(void 0)();
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/properties/dot_properties_es5`

- size: oxc 75 vs reference 78 (-3 bytes, no whitespaces)

```js
a['foo'] = 'bar';
a['if'] = 'if';
a['*'] = 'asterisk';
a['ຳ'] = 'unicode';
a[''] = 'whitespace';

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 a.foo = 'bar';
 a.if = 'if';
 a['*'] = 'asterisk';
-a['ຳ'] = 'unicode';
+a.ຳ = 'unicode';
 a[''] = 'whitespace';

```

## `uglify/properties/issue_5682_sub_1`

- size: oxc 78 vs reference 81 (-3 bytes, no whitespaces)

```js
function f(a) {
	return a['foo'];
}
var o = {};
var p = 'foo';
o[p] = 'PASS';
console.log(f(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f(o) {
-	return o['foo'];
+function f(a) {
+	return a.foo;
 }
 var o = {};
 var p = 'foo';

```

## `uglify/properties/issue_5949_1`

- tags: `join vars`
- size: oxc 73 vs reference 76 (-3 bytes, no whitespaces)

```js
var a = 42;
a[a = null];
try {
	a.p;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 try {
 	a.p;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/properties/issue_5949_2`

- tags: `join vars`
- size: oxc 56 vs reference 59 (-3 bytes, no whitespaces)

```js
try {
	a[42];
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	a[42];
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/properties/issue_5963_dot`

- tags: `join vars`
- size: oxc 91 vs reference 94 (-3 bytes, no whitespaces)

```js
var a = 'PASS', b;
try {
	b.p = (b.q = null, a = 'FAIL 1', !0);
	console.log('FAIL 2');
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 try {
 	b.p = (b.q = null, a = 'FAIL 1', !0);
 	console.log('FAIL 2');
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/properties/issue_5963_sub`

- tags: `join vars`
- size: oxc 93 vs reference 96 (-3 bytes, no whitespaces)

```js
var a = 'PASS', b;
try {
	b[42] = (b.q = null, a = 'FAIL 1', !0);
	console.log('FAIL 2');
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 try {
 	b[42] = (b.q = null, a = 'FAIL 1', !0);
 	console.log('FAIL 2');
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/properties/keep_properties`

- size: oxc 12 vs reference 15 (-3 bytes, no whitespaces)

```js
a['foo'] = 'bar';

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-a['foo'] = 'bar';
+a.foo = 'bar';

```

## `uglify/pure_getters/issue_4440`

- tags: `remove unused`
- size: oxc 93 vs reference 96 (-3 bytes, no whitespaces)

```js
try {
	(function() {
		arguments = null;
		console.log(arguments.p = 'FAIL');
	})();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 		arguments = null;
 		console.log(arguments.p = 'FAIL');
 	})();
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/pure_getters/issue_5917_1`

- tags: `join vars`
- size: oxc 106 vs reference 109 (-3 bytes, no whitespaces)

```js
var a;
console || (a = function() {})(f);
function f() {
	a.p;
}
try {
	f();
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -6,6 +6,6 @@
 try {
 	f();
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/pure_getters/issue_5917_2`

- tags: `join vars`, `2 iterations`
- size: oxc 113 vs reference 116 (-3 bytes, no whitespaces)

```js
var b;
if (!console) {
	b = function() {};
	FAIL(f);
}
function f() {
	b.p;
}
try {
	f();
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -9,6 +9,6 @@
 try {
 	f();
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/reduce_vars/inner_var_catch`

- tags: `join vars`
- size: oxc 50 vs reference 53 (-3 bytes, no whitespaces)

```js
function f() {
	try {
		a();
	} catch (e) {
		var b = 1;
	}
	console.log(b);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f() {
 	try {
 		a();
-	} catch (e) {
+	} catch {
 		var b = 1;
 	}
 	console.log(b);

```

## `uglify/reduce_vars/inner_var_if`

- tags: `join vars`
- size: oxc 45 vs reference 48 (-3 bytes, no whitespaces)

```js
function f(a) {
	if (a) var t = 1;
	if (!t) console.log(t);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
 	if (a) var t = 1;
-	if (!t) console.log(t);
+	t || console.log(t);
 }

```

## `uglify/reduce_vars/issue_2598`

- tags: `join vars`, `remove unused`
- size: oxc 69 vs reference 72 (-3 bytes, no whitespaces)

```js
function f() {}
function g(a) {
	return a || f;
}
console.log(g(false) === g(null));

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 function g(a) {
 	return a || f;
 }
-console.log(g(false) === g(null));
+console.log(g(!1) === g(null));

```

## `uglify/reduce_vars/issue_5055_1`

- tags: `join vars`
- size: oxc 51 vs reference 54 (-3 bytes, no whitespaces)

```js
var a = 'PASS';
function f() {
	console.log(a || 'FAIL');
}
f(0 && (a = 0)(f(this)));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 'PASS';
 function f() {
-	console.log(a || 'FAIL');
+	console.log('PASS');
 }
 f(0);

```

## `uglify/reduce_vars/issue_5623`

- tags: `join vars`, `2 iterations`
- size: oxc 66 vs reference 69 (-3 bytes, no whitespaces)

```js
var a = 0;
function f() {
	var b = a;
	a = b;
}
f && f((a++ && a).toString());
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 var a = 0;
 function f() {
-	var b;
 	a = a;
 }
-f((a++ && a).toString());
+f && f((a++ && a).toString());
 console.log(a);

```

## `uglify/reduce_vars/issue_5872_2`

- tags: `join vars`
- size: oxc 103 vs reference 106 (-3 bytes, no whitespaces)

```js
function f() {
	a.p;
	a = null;
}
var a = 42;
try {
	while (!f(a.q)) {
		a.r;
		console.log('FAIL');
	}
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -4,10 +4,10 @@
 }
 var a = 42;
 try {
-	while (!f(a.q)) {
+	for (; !f(a.q);) {
 		a.r;
 		console.log('FAIL');
 	}
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/reduce_vars/issue_5872_3`

- tags: `join vars`
- size: oxc 103 vs reference 106 (-3 bytes, no whitespaces)

```js
var a = 42;
try {
	while (new function() {
		a.p;
		a = null;
	}(a.q)) {
		a.r;
		console.log('FAIL');
	}
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var a = 42;
 try {
-	while (new function() {
+	for (; new function() {
 		a.p;
 		a = null;
-	}(a.q)) {
+	}(a.q);) {
 		a.r;
 		console.log('FAIL');
 	}
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/reduce_vars/issue_5892`

- tags: `join vars`
- size: oxc 85 vs reference 88 (-3 bytes, no whitespaces)

```js
try {
	var a = 42;
	a.p;
	if (console) a = null;
	a.q;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 try {
 	var a = 42;
 	a.p;
-	if (console) a = null;
+	console && (a = null);
 	a.q;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/reduce_vars/lvalues_def_1`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 40 (-3 bytes, no whitespaces)

```js
var b = 1;
var a = b++, b = NaN;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var b = 1;
-var a = +b, b = NaN;
+var b = 1, a = b++, b = NaN;
 console.log(a, b);

```

## `uglify/reduce_vars/pure_getters_1`

- tags: `join vars`
- size: oxc 40 vs reference 43 (-3 bytes, no whitespaces)

```js
try {
	var a = (a.b, 2);
} catch (e) {}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 try {
 	var a = (a.b, 2);
-} catch (e) {}
+} catch {}
 console.log(a);

```

## `uglify/reduce_vars/unused_modified`

- tags: `join vars`, `remove unused`
- size: oxc 73 vs reference 76 (-3 bytes, no whitespaces)

```js
console.log(function() {
	var b = 1, c = 'FAIL';
	if (0 || b--) c = 'PASS';
	b = 1;
	return c;
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log(function() {
 	var b = 1, c = 'FAIL';
-	if (0 || b--) c = 'PASS';
+	b-- && (c = 'PASS');
 	b = 1;
 	return c;
 }());

```

## `uglify/rename/function_catch_catch`

- size: oxc 103 vs reference 106 (-3 bytes, no whitespaces)

```js
var o = 0;
function f() {
	try {
		throw 1;
	} catch (c) {
		try {
			throw 2;
		} catch (o) {
			var o = 3;
			console.log(o);
		}
	}
	console.log(o);
}
f();

```

```diff
--- reference
+++ oxc
@@ -2,14 +2,14 @@
 function f() {
 	try {
 		throw 1;
-	} catch (o) {
+	} catch {
 		try {
 			throw 2;
-		} catch (c) {
-			var c = 3;
-			console.log(c);
+		} catch (o) {
+			var o = 3;
+			console.log(o);
 		}
 	}
-	console.log(c);
+	console.log(o);
 }
 f();

```

## `uglify/rename/function_catch_catch_ie8`

- size: oxc 103 vs reference 106 (-3 bytes, no whitespaces)

```js
var o = 0;
function f() {
	try {
		throw 1;
	} catch (c) {
		try {
			throw 2;
		} catch (o) {
			var o = 3;
			console.log(o);
		}
	}
	console.log(o);
}
f();

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 function f() {
 	try {
 		throw 1;
-	} catch (c) {
+	} catch {
 		try {
 			throw 2;
 		} catch (o) {

```

## `uglify/rename/issue_2120_1`

- size: oxc 97 vs reference 100 (-3 bytes, no whitespaces)

```js
'aaaaaaaa';
var a = 1, b = 'FAIL';
try {
	throw 1;
} catch (c) {
	try {
		throw 0;
	} catch (a) {
		if (c) b = 'PASS';
	}
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -2,11 +2,11 @@
 var a = 1, b = 'FAIL';
 try {
 	throw 1;
-} catch (t) {
+} catch (c) {
 	try {
 		throw 0;
-	} catch (a) {
-		if (t) b = 'PASS';
+	} catch {
+		c && (b = 'PASS');
 	}
 }
 console.log(b);

```

## `uglify/rename/issue_2120_2`

- size: oxc 97 vs reference 100 (-3 bytes, no whitespaces)

```js
'aaaaaaaa';
var a = 1, b = 'FAIL';
try {
	throw 1;
} catch (c) {
	try {
		throw 0;
	} catch (a) {
		if (c) b = 'PASS';
	}
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -5,8 +5,8 @@
 } catch (c) {
 	try {
 		throw 0;
-	} catch (a) {
-		if (c) b = 'PASS';
+	} catch {
+		c && (b = 'PASS');
 	}
 }
 console.log(b);

```

## `uglify/rests/issue_5100_1`

- tags: `remove unused`, `2 iterations`
- size: oxc 61 vs reference 64 (-3 bytes, no whitespaces)

```js
var a;
[{p: {}, ...a}] = [{
	p: {q: a} = 42,
	r: 'PASS'
}];
console.log(a.r);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a;
-({p: {}, ...a} = [{
+[{p: {}, ...a}] = [{
 	p: {q: a} = 42,
 	r: 'PASS'
-}][0]);
+}];
 console.log(a.r);

```

## `uglify/rests/issue_5100_2`

- tags: `remove unused`, `2 iterations`
- size: oxc 57 vs reference 60 (-3 bytes, no whitespaces)

```js
var a;
[{p: {}, ...a}] = [{ p: (console.log('PASS'), {q: a} = 42) }];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-({p: {}, ...a} = [{ p: (console.log('PASS'), {q: a} = 42) }][0]);
+[{p: {}, ...a}] = [{ p: (console.log('PASS'), {q: a} = 42) }];

```

## `uglify/sequences/issue_4079`

- tags: `sequences`
- size: oxc 32 vs reference 35 (-3 bytes, no whitespaces)

```js
try {
	typeof (0, A);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	A;
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/side_effects/issue_5912_1`

- tags: `join vars`
- size: oxc 82 vs reference 85 (-3 bytes, no whitespaces)

```js
var a = {};
a = a.p;
console || a.q;
try {
	a.r;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 try {
 	a.r;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/side_effects/keep_access`

- tags: `join vars`
- size: oxc 90 vs reference 93 (-3 bytes, no whitespaces)

```js
var o = {};
o.p;
o = null;
try {
	(function() {
		o.q;
	})();
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -6,6 +6,6 @@
 		o.q;
 	})();
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/side_effects/operator_in`

- size: oxc 60 vs reference 63 (-3 bytes, no whitespaces)

```js
try {
	'foo' in true;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
-	0 in true;
+	'foo' in !0;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/spreads/collapse_vars_2`

- tags: `join vars`
- size: oxc 70 vs reference 73 (-3 bytes, no whitespaces)

```js
var a = 'FAIL';
try {
	a = 'PASS';
	[...42, 'PASS'].slice();
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 try {
 	a = 'PASS';
 	[...42, 'PASS'].slice();
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/spreads/collapse_vars_3`

- tags: `join vars`
- size: oxc 72 vs reference 75 (-3 bytes, no whitespaces)

```js
var a = 'FAIL';
try {
	[...(a = 'PASS', 42), 'PASS'].slice();
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a = 'FAIL';
 try {
 	[...(a = 'PASS', 42), 'PASS'].slice();
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/spreads/drop_empty_call_1`

- size: oxc 40 vs reference 43 (-3 bytes, no whitespaces)

```js
try {
	(function() {})(...null);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	[...null];
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/spreads/issue_4614`

- size: oxc 78 vs reference 81 (-3 bytes, no whitespaces)

```js
try {
	(function(...[]) {
		var arguments;
		arguments[0];
	})();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 		var arguments;
 		arguments[0];
 	})();
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/spreads/unsafe_join_3`

- size: oxc 50 vs reference 53 (-3 bytes, no whitespaces)

```js
try {
	[].join(...console);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
 	[].join(...console);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/switches/drop_case_7`

- size: oxc 61 vs reference 64 (-3 bytes, no whitespaces)

```js
switch (2) {
	case 0: console.log('FAIL 1');
	case console.log('PASS 1'), 1: console.log('FAIL 2');
	case 2: console.log('PASS 2');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
 switch (2) {
-	default:
-		console.log('PASS 1'), 1;
-		console.log('PASS 2');
+	case console.log('PASS 1'), 2: console.log('PASS 2');
 }

```

## `uglify/switches/issue_5543_1`

- size: oxc 129 vs reference 132 (-3 bytes, no whitespaces)

```js
var a;
switch (a) {
	default:
		switch (42) {
			case a:
			case console.log('PASS'):
		}
		break;
	case null: switch (false) {
		case a:
		case console.log('FAIL'):
	}
}

```

```diff
--- reference
+++ oxc
@@ -6,7 +6,7 @@
 			case console.log('PASS'):
 		}
 		break;
-	case null: switch (false) {
+	case null: switch (!1) {
 		case a:
 		case console.log('FAIL'):
 	}

```

## `uglify/switches/issue_5912_2`

- tags: `join vars`
- size: oxc 103 vs reference 106 (-3 bytes, no whitespaces)

```js
var a, b = {};
b = b.p;
switch (a) {
	case void 0:
	case b.q:
}
try {
	b.r;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -7,6 +7,6 @@
 try {
 	b.r;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/templates/tag_parentheses_unary`

- size: oxc 51 vs reference 54 (-3 bytes, no whitespaces)

```js
var a;
try {
	(~a)``;
	(a++)``;
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 try {
 	(~a)``;
 	(a++)``;
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/templates/unicode`

- size: oxc 49 vs reference 52 (-3 bytes, no whitespaces)

```js
console.log(`\ud801\udc37\ud801𐐷${42}\u{10437}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`\ud801\udc37\ud801𐐷${42}\u{10437}`);
+console.log(`\ud801\udc37\ud801𐐷42\u{10437}`);

```

## `uglify/templates/unicode_ecma`

- size: oxc 49 vs reference 52 (-3 bytes, no whitespaces)

```js
console.log(`\ud801\udc37\ud801𐐷${42}\u{10437}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`\ud801\udc37\ud801𐐷${42}\u{10437}`);
+console.log(`\ud801\udc37\ud801𐐷42\u{10437}`);

```

## `uglify/typeof/reassign_do`

- tags: `join vars`, `2 iterations`
- size: oxc 119 vs reference 122 (-3 bytes, no whitespaces)

```js
A = console;
(function() {
	if ('undefined' == typeof A) return;
	var a = A, i = 2;
	do {
		console.log(void 0 === A, void 0 === a);
		A = void 0;
	} while (--i);
})();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 A = console;
 (function() {
-	if ('undefined' != typeof A) {
-		var a = A, i = 2;
-		do {
-			console.log(void 0 === A, (a, false));
-			A = void 0;
-		} while (--i);
-	}
+	if (typeof A > 'u') return;
+	var a = A, i = 2;
+	do {
+		console.log(A === void 0, a === void 0);
+		A = void 0;
+	} while (--i);
 })();

```

## `uglify/webkit/lambda_dot_assign`

- size: oxc 30 vs reference 33 (-3 bytes, no whitespaces)

```js
console.log(function() {
	1 + 1;
}.a = 1);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-console.log(function() {
-	1 + 1;
-}.a = 1);
+console.log(function() {}.a = 1);

```

## `uglify/yields/binary`

- size: oxc 112 vs reference 115 (-3 bytes, no whitespaces)

```js
var a = function* () {
	console.log(6 * (yield 'PA' + 'SS'));
}();
console.log(a.next('FAIL').value);
console.log(a.next(7).done);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = function* () {
-	console.log(6 * (yield 'PA' + 'SS'));
+	console.log(6 * (yield 'PASS'));
 }();
 console.log(a.next('FAIL').value);
 console.log(a.next(7).done);

```

## `uglify/yields/issue_5506`

- size: oxc 104 vs reference 107 (-3 bytes, no whitespaces)

```js
console.log(function(a) {
	var b = function* () {
		a = null in (a = 'PASS');
	}();
	try {
		b.next();
	} catch (e) {
		return a;
	}
}('FAIL'));

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 	}();
 	try {
 		b.next();
-	} catch (e) {
+	} catch {
 		return a;
 	}
 }('FAIL'));

```

## `uglify/yields/issue_5842`

- size: oxc 127 vs reference 130 (-3 bytes, no whitespaces)

```js
var a = 'FAIL';
(async function* () {
	(function() {
		try {
			try {
				return console;
			} finally {
				a = 'PASS';
			}
		} catch (e) {}
		FAIL;
	})();
})().next();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -7,7 +7,7 @@
 			} finally {
 				a = 'PASS';
 			}
-		} catch (e) {}
+		} catch {}
 		FAIL;
 	})();
 })().next();

```

## `uglify/arrows/issue_4401`

- tags: `join vars`
- size: oxc 77 vs reference 81 (-4 bytes, no whitespaces)

```js
(function() {
	var a = ((b) => b(a))(console.log || a);
	var c = console.log;
	c && c(typeof b);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 (function() {
-	var a = ((b) => b(a))(console.log || a);
-	var c = console.log;
+	var a = ((b) => b(a))(console.log || a), c = console.log;
 	c && c(typeof b);
 })();

```

## `uglify/bigint/issue_4590`

- tags: `join vars`
- size: oxc 24 vs reference 28 (-4 bytes, no whitespaces)

```js
A = 1;
0n || console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 A = 1;
-0n || console.log('PASS');
+console.log('PASS');

```

## `uglify/classes/keep_field_reference_4`

- tags: `join vars`, `remove unused`
- size: oxc 89 vs reference 93 (-4 bytes, no whitespaces)

```js
'use strict';
var A = class {};
var B = class {
	p = A;
};
console.log(new B().p === new B().p ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 'use strict';
-var A = class {};
-var B = class {
+var A = class {}, B = class {
 	p = A;
 };
 console.log(new B().p === new B().p ? 'PASS' : 'FAIL');

```

## `uglify/classes/keep_fnames`

- tags: `keep function names`
- size: oxc 59 vs reference 63 (-4 bytes, no whitespaces)

```js
'use strict';
class Foo {}
console.log(Foo.name, class Bar {}.name);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 'use strict';
 class Foo {}
-console.log(Foo.name, class Bar {}.name);
+console.log(Foo.name, class {}.name);

```

## `uglify/collapse_vars/call_1_symbol`

- tags: `join vars`
- size: oxc 57 vs reference 61 (-4 bytes, no whitespaces)

```js
(function(a) {
	function f() {}
	a = console;
	f();
	a.log(typeof f);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function(a) {
 	function f() {}
-	f();
-	(a = console).log(typeof f);
+	a = console;
+	a.log(typeof f);
 })();

```

## `uglify/collapse_vars/chained_4`

- tags: `join vars`
- size: oxc 46 vs reference 50 (-4 bytes, no whitespaces)

```js
var a = 'foo', b = 42;
var b = void (b = a);
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var a = 'foo', b = 42;
-var b = void (b = a);
+var a = 'foo', b = 42, b = void (b = a);
 console.log(a, b);

```

## `uglify/collapse_vars/dot_non_local`

- tags: `join vars`
- size: oxc 70 vs reference 74 (-4 bytes, no whitespaces)

```js
var o, a = 6, b = 7, c;
function f() {
	c = a * b;
	o.p(c);
}
try {
	f();
} catch (e) {
	console.log(c);
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 var o, a = 6, b = 7, c;
 function f() {
-	c = a * b;
+	c = 42;
 	o.p(c);
 }
 try {
 	f();
-} catch (e) {
+} catch {
 	console.log(c);
 }

```

## `uglify/collapse_vars/inner_lvalues`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 69 (-4 bytes, no whitespaces)

```js
var a, b = 10;
var a = (--b || a || 3).toString(), c = --b + -a;
console.log(null, a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var b = 10;
-var a = (--b || a || 3).toString(), c = --b + -a;
+var a, b = 10, a = (--b || a || 3).toString();
+--b + -a;
 console.log(null, a, b);

```

## `uglify/collapse_vars/issue_2364_2`

- tags: `join vars`, `pure getters`
- size: oxc 146 vs reference 150 (-4 bytes, no whitespaces)

```js
function callValidate() {
	var validate = compilation.validate;
	var result = validate.apply(null, arguments);
	return callValidate.errors = validate.errors, result;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function callValidate() {
-	var validate = compilation.validate;
-	var result = validate.apply(null, arguments);
+	var validate = compilation.validate, result = validate.apply(null, arguments);
 	return callValidate.errors = validate.errors, result;
 }

```

## `uglify/collapse_vars/issue_2364_4`

- tags: `join vars`, `pure getters`
- size: oxc 186 vs reference 190 (-4 bytes, no whitespaces)

```js
function inc(obj) {
	return obj.count++;
}
function foo(bar, baz) {
	var result = inc(bar);
	return foo.amount = baz.count, result;
}
var data = { count: 0 };
var answer = foo(data, data);
console.log(foo.amount, answer);

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,5 @@
 	var result = inc(bar);
 	return foo.amount = baz.count, result;
 }
-var data = { count: 0 };
-var answer = foo(data, data);
+var data = { count: 0 }, answer = foo(data, data);
 console.log(foo.amount, answer);

```

## `uglify/collapse_vars/issue_2858`

- tags: `join vars`, `remove unused`
- size: oxc 86 vs reference 90 (-4 bytes, no whitespaces)

```js
var b;
(function() {
	function f() {
		a++;
	}
	f();
	var c = f();
	var a = void 0;
	c || (b = a);
})();
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -4,8 +4,7 @@
 		a++;
 	}
 	f();
-	var c = f();
-	var a = void 0;
+	var c = f(), a = void 0;
 	c || (b = a);
 })();
 console.log(b);

```

## `uglify/collapse_vars/issue_3096`

- tags: `join vars`
- size: oxc 78 vs reference 82 (-4 bytes, no whitespaces)

```js
console.log(function() {
	var ar = ['a', 'b'];
	var first = ar.pop();
	return ar + '' + first;
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 console.log(function() {
-	var ar = ['a', 'b'];
-	var first = ar.pop();
+	var ar = ['a', 'b'], first = ar.pop();
 	return ar + '' + first;
 }());

```

## `uglify/collapse_vars/issue_3520`

- tags: `join vars`, `remove unused`
- size: oxc 116 vs reference 120 (-4 bytes, no whitespaces)

```js
var a = 0;
var b = function(c) {
	for (var i = 2; --i >= 0;) {
		(function f() {
			c = 0;
			var i = void 0;
			var f = f && f[i];
		})();
		a += b;
		c && b++;
	}
}(b = 1);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a = 0;
-var b = function(c) {
+var a = 0, b = function(c) {
 	for (var i = 2; --i >= 0;) {
 		(function() {
 			c = 0;

```

## `uglify/collapse_vars/issue_3698_1`

- tags: `join vars`
- size: oxc 74 vs reference 78 (-4 bytes, no whitespaces)

```js
var log = console.log;
var a, b = 0, c = 0;
(function() {
	a = b;
})(b++, (b++, c++));
log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var log = console.log;
-var a, b = 0, c = 0;
+var log = console.log, a, b = 0, c = 0;
 (function() {
 	a = b;
 })(b++, (b++, c++));

```

## `uglify/collapse_vars/issue_3698_2`

- tags: `join vars`
- size: oxc 91 vs reference 95 (-4 bytes, no whitespaces)

```js
var log = console.log;
var a, b = 0, c = 0, d = 1;
(function f() {
	a = b;
	d-- && f();
})(b++, (b++, c++));
log(a, b, c, d);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var log = console.log;
-var a, b = 0, c = 0, d = 1;
+var log = console.log, a, b = 0, c = 0, d = 1;
 (function f() {
 	a = b;
 	d-- && f();

```

## `uglify/collapse_vars/issue_4865`

- tags: `join vars`
- size: oxc 40 vs reference 44 (-4 bytes, no whitespaces)

```js
var NaN;
var a = NaN = 'PASS';
console.log(a, NaN);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var NaN;
-var a = NaN = 'PASS';
+var NaN, a = NaN = 'PASS';
 console.log(a, NaN);

```

## `uglify/collapse_vars/issue_4920_2`

- tags: `join vars`
- size: oxc 62 vs reference 66 (-4 bytes, no whitespaces)

```js
var o = { get PASS() {
	a = 'FAIL';
} };
var a = 'PASS', b;
o[b = a];
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-var o;
-var a = 'PASS', b;
-({ get PASS() {
+var o = { get PASS() {
 	a = 'FAIL';
-} })[b = a];
+} }, a = 'PASS', b;
+o[b = a];
 console.log(b);

```

## `uglify/collapse_vars/issue_4977_1`

- tags: `join vars`
- size: oxc 63 vs reference 67 (-4 bytes, no whitespaces)

```js
var a = 'FAIL';
var o = { get p() {
	return a;
} };
a = 'PASS';
console.log(o.p, a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a = 'FAIL';
-var o = { get p() {
+var a = 'FAIL', o = { get p() {
 	return a;
 } };
 a = 'PASS';

```

## `uglify/collapse_vars/issue_5638_3`

- tags: `join vars`
- size: oxc 70 vs reference 74 (-4 bytes, no whitespaces)

```js
var log = console.log;
var a = { foo: 42 }, b;
for (var k in a) {
	b = a[k];
	log(k || b, b++);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var log = console.log;
-var a = { foo: 42 }, b;
+var log = console.log, a = { foo: 42 }, b;
 for (var k in a) {
 	b = a[k];
 	log(k || b, b++);

```

## `uglify/collapse_vars/issue_5638_4`

- tags: `join vars`
- size: oxc 70 vs reference 74 (-4 bytes, no whitespaces)

```js
var log = console.log;
var a = { foo: 6 }, b;
for (var k in a) {
	b = a[k];
	log(k || b, b *= 7);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var log = console.log;
-var a = { foo: 6 }, b;
+var log = console.log, a = { foo: 6 }, b;
 for (var k in a) {
 	b = a[k];
 	log(k || b, b *= 7);

```

## `uglify/collapse_vars/lvalues_def`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 55 (-4 bytes, no whitespaces)

```js
var a = 0, b = 1;
var a = b++, b = +function() {}();
a && a[a++];
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a = 0, b = 1;
-a = b++, b = +void 0;
+var a = 0, b = 1, a = b++, b = NaN;
 a && a[a++];
 console.log(a, b);

```

## `uglify/collapse_vars/side_effects_property`

- tags: `join vars`
- size: oxc 72 vs reference 76 (-4 bytes, no whitespaces)

```js
var a = [];
var b = 0;
a[b++] = function() {
	return 42;
};
var c = a[b++]();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a = [];
-var b = 0;
+var a = [], b = 0;
 a[b++] = function() {
 	return 42;
 };

```

## `uglify/collapse_vars/unused_orig`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 91 vs reference 95 (-4 bytes, no whitespaces)

```js
var a = 1;
console.log(function(b) {
	var a;
	var c = b;
	for (var d in c) {
		var a = c[0];
		return --b + a;
	}
	try {} catch (e) {
		--b + a;
	}
	a && a.NaN;
}([2]), a);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
-var a = 1;
 console.log(function(b) {
-	var c = b;
+	var a, c = b;
 	for (var d in c) {
-		var a;
-		return --b + c[0];
+		var a = c[0];
+		return --b + a;
 	}
 	a && a.NaN;
-}([2]), a);
+}([2]), 1);

```

## `uglify/comparisons/is_boolean_var`

- tags: `join vars`
- size: oxc 94 vs reference 98 (-4 bytes, no whitespaces)

```js
console.log(function(a, b) {
	for (var i = 0, c = !b; i < a.length; i++) if (!a[i] === c) return i;
}([false, true], 42));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function(a, b) {
-	for (var i = 0, c = !b; i < a.length; i++) if (!a[i] == c) return i;
-}([false, true], 42));
+	for (var i = 0, c = !b; i < a.length; i++) if (!a[i] === c) return i;
+}([!1, !0], 42));

```

## `uglify/comparisons/unsafe_indexOf_assignment`

- size: oxc 134 vs reference 138 (-4 bytes, no whitespaces)

```js
var a;
if ((a = Object.keys({ foo: 42 }).indexOf('bar')) < 0) console.log('PASS');
if (0 > (a = Object.keys({ foo: 42 }).indexOf('bar'))) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a;
-if (!~(a = Object.keys({ foo: 42 }).indexOf('bar'))) console.log('PASS');
-if (!~(a = Object.keys({ foo: 42 }).indexOf('bar'))) console.log('PASS');
+(a = Object.keys({ foo: 42 }).indexOf('bar')) < 0 && console.log('PASS');
+0 > (a = Object.keys({ foo: 42 }).indexOf('bar')) && console.log('PASS');

```

## `uglify/const/issue_4216`

- tags: `join vars`
- size: oxc 38 vs reference 42 (-4 bytes, no whitespaces)

```js
if (a = 0) {
	const a = 0;
}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-a = 0;
-{
-	const a = void 0;
+if (a = 0) {
+	let a = 0;
 }
 console.log(typeof a);

```

## `uglify/const/issue_4954_2`

- size: oxc 103 vs reference 107 (-4 bytes, no whitespaces)

```js
'use strict';
const a = null;
(function(b) {
	for (const a in null);
	for (const a in b) console.log('PASS');
})([null]);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
 const a = null;
-(function(o) {
-	for (const n in null);
-	for (const n in o) console.log('PASS');
+(function(b) {
+	for (let a in null);
+	for (let a in b) console.log('PASS');
 })([null]);

```

## `uglify/const/issue_5580_1`

- size: oxc 138 vs reference 142 (-4 bytes, no whitespaces)

```js
'use strict';
console.log(function(a, b, c) {
	try {
		FAIL;
	} catch (e) {
		return function() {
			var d = e, i, j;
			{
				const e = j;
			}
			return a;
		}();
	} finally {
		const e = 42;
	}
}('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,16 @@
 'use strict';
-console.log(function(r, n, t) {
+console.log(function(a, b, c) {
 	try {
 		FAIL;
-	} catch (o) {
+	} catch (e) {
 		return function() {
-			var n = o, t, c;
+			var d = e, i, j;
 			{
-				const o = c;
+				let e = j;
 			}
-			return r;
+			return a;
 		}();
 	} finally {
-		const c = 42;
+		let e = 42;
 	}
 }('PASS'));

```

## `uglify/default-values/issue_5444_1`

- tags: `join vars`
- size: oxc 104 vs reference 108 (-4 bytes, no whitespaces)

```js
var a = 42;
var b = function({} = setImmediate(function() {
	console.log(a++);
})) {
	return this;
}();
console.log(typeof b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a = 42;
-var b = function({} = setImmediate(function() {
+var a = 42, b = function({} = setImmediate(function() {
 	console.log(a++);
 })) {
 	return this;

```

## `uglify/destructured/issue_4284_2`

- tags: `join vars`
- size: oxc 44 vs reference 48 (-4 bytes, no whitespaces)

```js
var a, { [console.log(a)]: b } = (a = 'PASS', 0);
var c = a;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a, { [console.log(a)]: b } = (a = 'PASS', 0);
-var c = a;
+var a, { [console.log(a)]: b } = (a = 'PASS', 0), c = a;

```

## `uglify/destructured/issue_4294`

- tags: `join vars`
- size: oxc 80 vs reference 84 (-4 bytes, no whitespaces)

```js
A = 'PASS';
(function() {
	var a = function({ [a]: {} }) {}({ [a]: 0 });
	var b = A;
	console.log(b);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 A = 'PASS';
 (function() {
-	var a = function({ [a]: {} }) {}({ [a]: 0 });
-	var b = A;
+	var a = function({ [a]: {} }) {}({ [a]: 0 }), b = A;
 	console.log(b);
 })();

```

## `uglify/destructured/issue_4504`

- tags: `join vars`
- size: oxc 76 vs reference 80 (-4 bytes, no whitespaces)

```js
A = 'FAIL';
(function f(a) {
	({[console.log(a)]: 0[((b) => console + b)(A)]} = 0);
})('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 A = 'FAIL';
-(function f(a) {
-	({[console.log(a)]: 0[b = A, console + b]} = 0);
-	var b;
+(function(a) {
+	({[console.log(a)]: 0[((b) => console + b)(A)]} = 0);
 })('PASS');

```

## `uglify/destructured/issue_5573`

- tags: `join vars`
- size: oxc 88 vs reference 92 (-4 bytes, no whitespaces)

```js
var log = console.log;
var a = 'FAIL';
(function([{ [log(a)]: b }]) {
	A = 42;
})((a = 'PASS', [{}]));
log(a, A);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var log = console.log;
-var a = 'FAIL';
+var log = console.log, a = 'FAIL';
 (function([{ [log(a)]: b }]) {
 	A = 42;
 })((a = 'PASS', [{}]));

```

## `uglify/drop-unused/issue_3146_1`

- tags: `join vars`, `remove unused`
- size: oxc 87 vs reference 91 (-4 bytes, no whitespaces)

```js
(function(f) {
	f('g()');
})(function(a) {
	eval(a);
	function g(b) {
		if (!b) b = 'PASS';
		console.log(b);
	}
});

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 })(function(a) {
 	eval(a);
 	function g(b) {
-		if (!b) b = 'PASS';
+		b ||= 'PASS';
 		console.log(b);
 	}
 });

```

## `uglify/drop-unused/issue_3146_2`

- tags: `join vars`, `remove unused`
- size: oxc 87 vs reference 91 (-4 bytes, no whitespaces)

```js
(function(f) {
	f('g()');
})(function(a) {
	eval(a);
	function g(b) {
		if (!b) b = 'PASS';
		console.log(b);
	}
});

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,7 @@
 })(function(a) {
 	eval(a);
 	function g(b) {
-		if (!b) b = 'PASS';
+		b ||= 'PASS';
 		console.log(b);
 	}
 });

```

## `uglify/drop-unused/issue_3986`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 80 (-4 bytes, no whitespaces)

```js
var a = 0, b = 0;
(function() {
	try {
		throw 42;
	} catch (e) {
		a++;
	}
	b = b && 0;
})(b *= a);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,9 @@
 (function() {
 	try {
 		throw 42;
-	} catch (e) {
+	} catch {
 		a++;
 	}
-	b = b && 0;
+	b &&= 0;
 })(b *= a);
 console.log(b);

```

## `uglify/drop-unused/issue_4464_1`

- tags: `join vars`, `remove unused`
- size: oxc 72 vs reference 76 (-4 bytes, no whitespaces)

```js
function f(a) {
	var a = function() {};
	return [arguments, a];
}
console.log(typeof f()[1]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a) {
-	a = function() {};
-	return [arguments, a];
+	return [arguments, function() {}];
 }
 console.log(typeof f()[1]);

```

## `uglify/drop-unused/issue_4464_2`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 81 (-4 bytes, no whitespaces)

```js
function f(a) {
	var a = function() {};
	return [arguments, a];
}
console.log(typeof f(42)[0][0]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a) {
-	a = function() {};
-	return [arguments, a];
+	return [arguments, function() {}];
 }
 console.log(typeof f(42)[0][0]);

```

## `uglify/drop-unused/issue_4464_3`

- tags: `join vars`, `remove unused`
- size: oxc 97 vs reference 101 (-4 bytes, no whitespaces)

```js
(function a(a) {
	var a = function() {};
	return [arguments[0], a];
})(42).forEach(function(b) {
	console.log(typeof b);
});

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 (function(a) {
-	a = function() {};
-	return [arguments[0], a];
+	return [arguments[0], function() {}];
 })(42).forEach(function(b) {
 	console.log(typeof b);
 });

```

## `uglify/evaluate/void_returns`

- tags: `join vars`, `remove unused`
- size: oxc 145 vs reference 149 (-4 bytes, no whitespaces)

```js
var a = function f() {
	function g(b) {
		if (b) console.log('FAIL');
	}
	while (1) {
		console.log('PASS');
		try {
			if (console) return;
		} catch (e) {
			return g(e);
		}
	}
}();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-(function() {
+var a = function() {
 	function g(b) {
-		if (b) console.log('FAIL');
+		b && console.log('FAIL');
 	}
-	while (1) {
+	for (;;) {
 		console.log('PASS');
 		try {
 			if (console) return;
@@ -10,5 +10,5 @@
 			return g(e);
 		}
 	}
-})();
-console.log(void 0);
+}();
+console.log(a);

```

## `uglify/exports/instanceof_default_function`

- tags: `remove unused`
- size: oxc 84 vs reference 88 (-4 bytes, no whitespaces)

```js
export default function f() {
	if (!(this instanceof f)) throw new Error('must instantiate');
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 export default function f() {
-	if (!(this instanceof f)) throw new Error('must instantiate');
+	if (!(this instanceof f)) throw Error('must instantiate');
 }

```

## `uglify/hoist_props/direct_access_1`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 68 (-4 bytes, no whitespaces)

```js
var a = 0;
var obj = {
	a: 1,
	b: 2
};
for (var k in obj) a++;
console.log(a, obj.a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a = 0;
-var obj = {
+var a = 0, obj = {
 	a: 1,
 	b: 2
 };

```

## `uglify/ie/issue_3478_2`

- size: oxc 106 vs reference 110 (-4 bytes, no whitespaces)

```js
'bbbbbbb';
var c = 'FAIL';
(function f() {
	(function f() {
		var b = function g() {
			f && (c = 'PASS');
		}();
	})();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 'bbbbbbb';
 var c = 'FAIL';
-(function b() {
-	(function n() {
-		var b = function b() {
-			n && (c = 'PASS');
+(function() {
+	(function f() {
+		var b = function() {
+			f && (c = 'PASS');
 		}();
 	})();
 })();

```

## `uglify/ie/issue_3478_2_ie8`

- size: oxc 106 vs reference 110 (-4 bytes, no whitespaces)

```js
'bbbbbbb';
var c = 'FAIL';
(function f() {
	(function f() {
		var b = function g() {
			f && (c = 'PASS');
		}();
	})();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 'bbbbbbb';
 var c = 'FAIL';
-(function f() {
+(function() {
 	(function f() {
-		var b = function n() {
+		var b = function() {
 			f && (c = 'PASS');
 		}();
 	})();

```

## `uglify/ie/issue_3478_2_ie8_toplevel`

- size: oxc 106 vs reference 110 (-4 bytes, no whitespaces)

```js
'bbbbbbb';
var c = 'FAIL';
(function f() {
	(function f() {
		var b = function g() {
			f && (c = 'PASS');
		}();
	})();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 'bbbbbbb';
-var o = 'FAIL';
-(function c() {
-	(function c() {
-		var b = function n() {
-			c && (o = 'PASS');
+var c = 'FAIL';
+(function() {
+	(function f() {
+		var b = function() {
+			f && (c = 'PASS');
 		}();
 	})();
 })();
-console.log(o);
+console.log(c);

```

## `uglify/ie/issue_3478_2_toplevel`

- size: oxc 106 vs reference 110 (-4 bytes, no whitespaces)

```js
'bbbbbbb';
var c = 'FAIL';
(function f() {
	(function f() {
		var b = function g() {
			f && (c = 'PASS');
		}();
	})();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 'bbbbbbb';
-var o = 'FAIL';
-(function b() {
-	(function n() {
-		var b = function b() {
-			n && (o = 'PASS');
+var c = 'FAIL';
+(function() {
+	(function f() {
+		var b = function() {
+			f && (c = 'PASS');
 		}();
 	})();
 })();
-console.log(o);
+console.log(c);

```

## `uglify/issue-1639/issue_1639_3`

- tags: `join vars`, `sequences`
- size: oxc 32 vs reference 36 (-4 bytes, no whitespaces)

```js
var a = 100, b = 10;
a++ && false && a ? 0 : 0;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = 100, b = 10;
-a++, console.log(a, b);
+var a = 100;
+a++, console.log(a, 10);

```

## `uglify/issue-1770/mangle_props`

- size: oxc 234 vs reference 238 (-4 bytes, no whitespaces)

```js
var obj = {
	undefined: 1,
	NaN: 2,
	Infinity: 3,
	'-Infinity': 4,
	null: 5
};
console.log(obj[void 0], obj[undefined], obj['undefined'], obj[0 / 0], obj[NaN], obj['NaN'], obj[1 / 0], obj[Infinity], obj['Infinity'], obj[-1 / 0], obj[-Infinity], obj['-Infinity'], obj[null], obj['null']);

```

```diff
--- reference
+++ oxc
@@ -5,4 +5,4 @@
 	'-Infinity': 4,
 	null: 5
 };
-console.log(obj[void 0], obj[void 0], obj['undefined'], obj[0 / 0], obj[NaN], obj['NaN'], obj[1 / 0], obj[1 / 0], obj['Infinity'], obj[-1 / 0], obj[-(1 / 0)], obj['-Infinity'], obj[null], obj['null']);
+console.log(obj[void 0], obj[void 0], obj.undefined, obj[NaN], obj[NaN], obj.NaN, obj[1 / 0], obj[Infinity], obj.Infinity, obj[-1 / 0], obj[-Infinity], obj['-Infinity'], obj[null], obj.null);

```

## `uglify/issue-5614/retain_instance_write`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 106 vs reference 110 (-4 bytes, no whitespaces)

```js
function f(a) {
	return a;
}
function g() {
	var o = {};
	var b = new f(o);
	if (console) b.p = 'PASS';
	return o;
}
console.log(g().p);

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,8 @@
 	return a;
 }
 function g() {
-	var o = {};
-	var b = new f(o);
-	if (console) b.p = 'PASS';
+	var o = {}, b = new f(o);
+	console && (b.p = 'PASS');
 	return o;
 }
 console.log(g().p);

```

## `uglify/let/if_return_2`

- size: oxc 138 vs reference 142 (-4 bytes, no whitespaces)

```js
'use strict';
function f(a) {
	function g() {
		return b = 'FAIL';
	}
	if (a) return g();
	let b;
	return g();
}
;
try {
	console.log(f(42));
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -7,9 +7,8 @@
 	let b;
 	return g();
 }
-;
 try {
 	console.log(f(42));
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/let/issue_5319`

- tags: `join vars`
- size: oxc 91 vs reference 95 (-4 bytes, no whitespaces)

```js
'use strict';
(function(a, c) {
	var b = a, c = b;
	{
		let a = c;
		console.log(c());
	}
})(function() {
	return 'PASS';
});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 'use strict';
 (function(a, c) {
-	var b = a, c;
+	var c = a;
 	{
-		let a = c = b;
+		let a = c;
 		console.log(c());
 	}
 })(function() {

```

## `uglify/loops/parse_do_while_with_semicolon`

- size: oxc 20 vs reference 24 (-4 bytes, no whitespaces)

```js
do {
	x();
} while (false);
y();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 do
 	x();
-while (false);
+while (0);
 y();

```

## `uglify/loops/parse_do_while_without_semicolon`

- size: oxc 20 vs reference 24 (-4 bytes, no whitespaces)

```js
do {
	x();
} while (false);
y();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 do
 	x();
-while (false);
+while (0);
 y();

```

## `uglify/merge_vars/conditional_branch`

- tags: `join vars`
- size: oxc 69 vs reference 73 (-4 bytes, no whitespaces)

```js
console.log(function(a) {
	var b = 'FAIL', c;
	a ? c = b : void 0;
	return c || 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(function(a) {
 	var b = 'FAIL', c;
-	a ? c = b : void 0;
+	a && (c = b);
 	return c || 'PASS';
 }());

```

## `uglify/merge_vars/cross_branch_1_4`

- tags: `join vars`
- size: oxc 90 vs reference 94 (-4 bytes, no whitespaces)

```js
var a;
function f() {
	var x, y;
	x = 'foo';
	if (a) console.log(x);
	y = 'bar';
	console.log(y);
}
a = 0;
f();
a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 var a;
 function f() {
-	var x, x;
-	x = 'foo';
-	if (a) console.log(x);
-	x = 'bar';
-	console.log(x);
+	var x = 'foo', y;
+	a && console.log(x);
+	y = 'bar';
+	console.log(y);
 }
 a = 0;
 f();

```

## `uglify/merge_vars/cross_branch_1_9`

- tags: `join vars`
- size: oxc 90 vs reference 94 (-4 bytes, no whitespaces)

```js
var a;
function f() {
	var x, y;
	x = 'foo';
	console.log(x);
	y = 'bar';
	if (a) console.log(y);
}
a = 0;
f();
a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 var a;
 function f() {
-	var x, x;
-	x = 'foo';
+	var x = 'foo', y;
 	console.log(x);
-	x = 'bar';
-	if (a) console.log(x);
+	y = 'bar';
+	a && console.log(y);
 }
 a = 0;
 f();

```

## `uglify/merge_vars/cross_branch_2a_10`

- tags: `join vars`
- size: oxc 131 vs reference 135 (-4 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	if (a) {
		if (b) console.log(x);
		y = 'bar';
		console.log(y);
	}
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
 var a, b;
 function f() {
-	var x, x;
-	x = 'foo';
+	var x = 'foo', y;
 	if (a) {
-		if (b) console.log(x);
-		x = 'bar';
-		console.log(x);
+		b && console.log(x);
+		y = 'bar';
+		console.log(y);
 	}
 }
 a = 0, b = 0;

```

## `uglify/merge_vars/cross_branch_2a_14`

- tags: `join vars`
- size: oxc 131 vs reference 135 (-4 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	if (a) {
		console.log(x);
		y = 'bar';
		if (b) console.log(y);
	}
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
 var a, b;
 function f() {
-	var x, x;
-	x = 'foo';
+	var x = 'foo', y;
 	if (a) {
 		console.log(x);
-		x = 'bar';
-		if (b) console.log(x);
+		y = 'bar';
+		b && console.log(y);
 	}
 }
 a = 0, b = 0;

```

## `uglify/merge_vars/cross_branch_2a_16`

- tags: `join vars`
- size: oxc 131 vs reference 135 (-4 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	console.log(x);
	if (a) {
		y = 'bar';
		if (b) console.log(y);
	}
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
 var a, b;
 function f() {
-	var x, x;
-	x = 'foo';
+	var x = 'foo', y;
 	console.log(x);
 	if (a) {
-		x = 'bar';
-		if (b) console.log(x);
+		y = 'bar';
+		b && console.log(y);
 	}
 }
 a = 0, b = 0;

```

## `uglify/merge_vars/cross_branch_2a_8`

- tags: `join vars`
- size: oxc 130 vs reference 134 (-4 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	if (a) {
		if (b) console.log(x);
		y = 'bar';
	}
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 var a, b;
 function f() {
-	var x, y;
-	x = 'foo';
+	var x = 'foo', y;
 	if (a) {
-		if (b) console.log(x);
+		b && console.log(x);
 		y = 'bar';
 	}
 	console.log(y);

```

## `uglify/merge_vars/cross_branch_2b_11`

- tags: `join vars`
- size: oxc 129 vs reference 133 (-4 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	if (a) console.log(x);
	if (b) y = 'bar';
	console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 var a, b;
 function f() {
-	var x, y;
-	x = 'foo';
-	if (a) console.log(x);
-	if (b) y = 'bar';
+	var x = 'foo', y;
+	a && console.log(x);
+	b && (y = 'bar');
 	console.log(y);
 }
 a = 0, b = 0;

```

## `uglify/merge_vars/cross_branch_2b_12`

- tags: `join vars`
- size: oxc 131 vs reference 135 (-4 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	if (a) console.log(x);
	if (b) {
		y = 'bar';
		console.log(y);
	}
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
 var a, b;
 function f() {
-	var x, x;
-	x = 'foo';
-	if (a) console.log(x);
+	var x = 'foo', y;
+	a && console.log(x);
 	if (b) {
-		x = 'bar';
-		console.log(x);
+		y = 'bar';
+		console.log(y);
 	}
 }
 a = 0, b = 0;

```

## `uglify/merge_vars/cross_branch_2b_14`

- tags: `join vars`
- size: oxc 130 vs reference 134 (-4 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	if (a) {
		console.log(x);
		y = 'bar';
	}
	if (b) console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,11 @@
 var a, b;
 function f() {
-	var x, y;
-	x = 'foo';
+	var x = 'foo', y;
 	if (a) {
 		console.log(x);
 		y = 'bar';
 	}
-	if (b) console.log(y);
+	b && console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/cross_branch_2b_15`

- tags: `join vars`
- size: oxc 129 vs reference 133 (-4 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	console.log(x);
	if (a) y = 'bar';
	if (b) console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 var a, b;
 function f() {
-	var x, y;
-	x = 'foo';
+	var x = 'foo', y;
 	console.log(x);
-	if (a) y = 'bar';
-	if (b) console.log(y);
+	a && (y = 'bar');
+	b && console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/issue_4103`

- tags: `join vars`
- size: oxc 71 vs reference 75 (-4 bytes, no whitespaces)

```js
function f(a) {
	console.log(a);
}
var b = 0;
var c = f(b++ + (c %= 1 >> console.log(c = 0)));
b;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(a) {
 	console.log(a);
 }
-var b = 0;
-var c = f(b++ + (c %= 1 >> console.log(c = 0)));
+var b = 0, c = f(b++ + (c %= 1 >> console.log(c = 0)));

```

## `uglify/merge_vars/issue_4253`

- tags: `join vars`
- size: oxc 78 vs reference 82 (-4 bytes, no whitespaces)

```js
switch (0) {
	default:
		var a = 'FAIL';
		a = a && a;
		try {
			break;
		} catch (e) {}
		var b = 42;
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 switch (0) {
 	default:
 		var a = 'FAIL';
-		a = a && a;
+		a &&= a;
 		try {
 			break;
-		} catch (e) {}
+		} catch {}
 		var b = 42;
 }
 console.log(b);

```

## `uglify/negate-iife/negate_iife_3`

- size: oxc 57 vs reference 61 (-4 bytes, no whitespaces)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
+(function() {
 	return t;
-}() ? console.log(false) : console.log(true);
+})() ? console.log(!0) : console.log(!1);

```

## `uglify/negate-iife/negate_iife_3_off`

- size: oxc 57 vs reference 61 (-4 bytes, no whitespaces)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
+(function() {
 	return t;
-}() ? console.log(false) : console.log(true);
+})() ? console.log(!0) : console.log(!1);

```

## `uglify/negate-iife/negate_iife_3_side_effects`

- size: oxc 57 vs reference 61 (-4 bytes, no whitespaces)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
+(function() {
 	return t;
-}() ? console.log(false) : console.log(true);
+})() ? console.log(!0) : console.log(!1);

```

## `uglify/negate-iife/negate_iife_issue_1073`

- tags: `sequences`
- size: oxc 67 vs reference 71 (-4 bytes, no whitespaces)

```js
new (function(a) {
	return function Foo() {
		this.x = a;
		console.log(this);
	};
}(7))();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 new (function(a) {
-	return function Foo() {
+	return function() {
 		this.x = a, console.log(this);
 	};
 }(7))();

```

## `uglify/optional-chains/issue_5091`

- tags: `join vars`
- size: oxc 87 vs reference 91 (-4 bytes, no whitespaces)

```js
function f(a) {
	var b = a.p;
	var c;
	b?.[c = 'FAIL 2'];
	return b || c;
}
console.log(f('FAIL 1') || 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 function f(a) {
-	var a = a.p;
-	var c;
-	a?.[c = 'FAIL 2'];
-	return a || c;
+	var b = a.p, c;
+	b?.[c = 'FAIL 2'];
+	return b || c;
 }
 console.log(f('FAIL 1') || 'PASS');

```

## `uglify/optional-chains/issue_5292_sub_pure_getters`

- tags: `pure getters`
- size: oxc 56 vs reference 60 (-4 bytes, no whitespaces)

```js
var o = { get p() {
	console.log('foo');
} };
o?.[console.log('bar'), 'p'];

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var o = { get p() {
+({ get p() {
 	console.log('foo');
-} };
-o?.[console.log('bar')];
+} })[console.log('bar'), 'p'];

```

## `uglify/preserve_line/return_7`

- size: oxc 84 vs reference 88 (-4 bytes, no whitespaces)

```js
_is_selected = function(tags, slug) {
	var ref;
	return (ref = _.find(tags, { slug })) != null ? ref.selected : void 0;
};

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-_is_selected = function(e, l) {
-	var n;
-	return null != (n = _.find(e, { slug: l })) ? n.selected : void 0;
+_is_selected = function(tags, slug) {
+	var ref;
+	return (ref = _.find(tags, { slug }))?.selected;
 };

```

## `uglify/preserve_line/return_8`

- size: oxc 84 vs reference 88 (-4 bytes, no whitespaces)

```js
_is_selected = function(tags, slug) {
	var ref;
	return (ref = _.find(tags, { slug })) != null ? ref.selected : void 0;
};

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-_is_selected = function(e, l) {
-	var n;
-	return null != (n = _.find(e, { slug: l })) ? n.selected : void 0;
+_is_selected = function(tags, slug) {
+	var ref;
+	return (ref = _.find(tags, { slug }))?.selected;
 };

```

## `uglify/properties/issue_5682_dot_2`

- size: oxc 56 vs reference 60 (-4 bytes, no whitespaces)

```js
function f(a) {
	return a.foo;
}
var o = { foo: 'PASS' };
console.log(f(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-function f(o) {
-	return o.o;
+function f(a) {
+	return a.foo;
 }
-var o = { o: 'PASS' };
-console.log(f(o));
+console.log(f({ foo: 'PASS' }));

```

## `uglify/properties/issue_5682_in_2`

- size: oxc 69 vs reference 73 (-4 bytes, no whitespaces)

```js
function f(a) {
	return 'foo' in a;
}
var o = { foo: 42 };
console.log(f(o) ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-function f(o) {
-	return 'o' in o;
+function f(a) {
+	return 'foo' in a;
 }
-var o = { o: 42 };
-console.log(f(o) ? 'PASS' : 'FAIL');
+console.log(f({ foo: 42 }) ? 'PASS' : 'FAIL');

```

## `uglify/pure_getters/collapse_rhs_call`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 37 vs reference 41 (-4 bytes, no whitespaces)

```js
var o = {};
function f() {
	console.log('PASS');
}
o.f = f;
f();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-({}.f = function() {
+function f() {
 	console.log('PASS');
-})();
+}
+f();

```

## `uglify/reduce_vars/defun_reference`

- tags: `join vars`
- size: oxc 91 vs reference 95 (-4 bytes, no whitespaces)

```js
function f() {
	function g() {
		x();
		return a;
	}
	var a = h();
	var b = 2;
	return a + b;
	function h() {
		y();
		return b;
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,8 +3,7 @@
 		x();
 		return a;
 	}
-	var a = h();
-	var b = 2;
+	var a = h(), b = 2;
 	return a + b;
 	function h() {
 		y();

```

## `uglify/reduce_vars/issue_3240_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 75 vs reference 79 (-4 bytes, no whitespaces)

```js
(function() {
	f(1);
	function f(a) {
		console.log(a);
		var g = function() {
			f(a - 1);
		};
		if (a) g();
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 (function() {
-	(function f(a) {
+	f(1);
+	function f(a) {
 		console.log(a);
-		if (a) (function() {
+		a && function() {
 			f(a - 1);
-		})();
-	})(1);
+		}();
+	}
 })();

```

## `uglify/reduce_vars/lvalues_def_2`

- tags: `join vars`, `remove unused`
- size: oxc 38 vs reference 42 (-4 bytes, no whitespaces)

```js
var b = 1;
var a = b += 1, b = NaN;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var b = 1;
-var a = b += 1, b = NaN;
+var b = 1, a = b += 1, b = NaN;
 console.log(a, b);

```

## `uglify/reduce_vars/perf_8`

- tags: `join vars`, `remove unused`
- size: oxc 162 vs reference 166 (-4 bytes, no whitespaces)

```js
var indirect_foo = function(x, y, z) {
	var foo = function(x, y, z) {
		return x < y ? x * y + z : x * z - y;
	};
	return foo(x, y, z);
};
var sum = 0;
for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
console.log(sum);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,6 @@
 	return function(x, y, z) {
 		return x < y ? x * y + z : x * z - y;
 	}(x, y, z);
-};
-var sum = 0;
+}, sum = 0;
 for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `uglify/reduce_vars/try_abort`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 70 (-4 bytes, no whitespaces)

```js
!function() {
	try {
		var a = 1;
		throw '';
		var b = 2;
	} catch (e) {}
	console.log(a, b);
}();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-!function() {
+(function() {
 	try {
 		var a = 1;
 		throw '';
-		var b = 2;
-	} catch (e) {}
+		var b;
+	} catch {}
 	console.log(a, b);
-}();
+})();

```

## `uglify/sequences/make_sequences_2`

- tags: `sequences`
- size: oxc 38 vs reference 42 (-4 bytes, no whitespaces)

```js
if (boo) {
	foo();
	bar();
	baz();
} else {
	x();
	y();
	z();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-if (boo) foo(), bar(), baz();
-else x(), y(), z();
+boo ? (foo(), bar(), baz()) : (x(), y(), z());

```

## `uglify/unicode/issue_2569`

- size: oxc 65 vs reference 69 (-4 bytes, no whitespaces)

```js
new RegExp('[\udc42-\udcaa\udd74-\udd96\ude45-\ude4f\udea3-\udecc]');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-new RegExp('[\udc42-\udcaa\udd74-\udd96\ude45-\ude4f\udea3-\udecc]');
+RegExp('[\udc42-\udcaa\udd74-\udd96\ude45-\ude4f\udea3-\udecc]');

```

## `uglify/varify/reduce_merge_let`

- tags: `join vars`, `remove unused`
- size: oxc 71 vs reference 75 (-4 bytes, no whitespaces)

```js
'use strict';
let a = console;
console.log(typeof a);
var b = typeof a;
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 'use strict';
-var a = console;
+let a = console;
+console.log(typeof a);
 console.log(typeof a);
-a = typeof a;
-console.log(a);

```

## `uglify/varify/scope_adjustment_const`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 41 (-4 bytes, no whitespaces)

```js
for (var k in [42]) console.log(function f() {
	if (k) {
		const a = 0;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-for (var k in [42]) console.log(void (k && 0));
+for (var k in [42]) console.log(void 0);

```

## `uglify/varify/scope_adjustment_let`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 54 (-4 bytes, no whitespaces)

```js
'use strict';
for (var k in [42]) console.log(function f() {
	if (k) {
		let a = 0;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 'use strict';
-for (var k in [42]) console.log(void (k && 0));
+for (var k in [42]) console.log(void 0);

```

## `uglify/yields/collapse_vars_4`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 81 (-4 bytes, no whitespaces)

```js
var a = 'FAIL';
var b = function* (c) {
	return c;
}(a = 'PASS');
console.log(a, b.next().done);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a = 'FAIL';
-var b = function* (c) {
+var a = 'FAIL', b = function* (c) {
 	return c;
 }(a = 'PASS');
 console.log(a, b.next().done);

```

## `uglify/yields/issue_4641_3`

- size: oxc 100 vs reference 104 (-4 bytes, no whitespaces)

```js
console.log(typeof async function* () {
	try {
		return void 'FAIL';
	} finally {
		console.log('PASS');
	}
}().next().then);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log(typeof async function* () {
 	try {
-		return void 'FAIL';
+		return void 0;
 	} finally {
 		console.log('PASS');
 	}

```

## `uglify/awaits/issue_4975`

- size: oxc 66 vs reference 71 (-5 bytes, no whitespaces)

```js
(async function f(a) {
	try {
		if (a) console.log(typeof f());
	} catch (e) {}
})(42);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (async function f(a) {
 	try {
-		if (a) console.log(typeof f());
-	} catch (e) {}
+		a && console.log(typeof f());
+	} catch {}
 })(42);

```

## `uglify/bigint/arithmetic`

- size: oxc 33 vs reference 38 (-5 bytes, no whitespaces)

```js
console.log((1n + 2n) * (3n - -4n) >> 5n - 6n);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((1n + 2n) * (3n - -4n) >> 5n - 6n);
+console.log(3n * (3n - -4n) >> 5n - 6n);

```

## `uglify/booleans/iife_boolean_context`

- size: oxc 112 vs reference 117 (-5 bytes, no whitespaces)

```js
console.log(function() {
	return Object(1) || false;
}() ? 'PASS' : 'FAIL');
console.log(function() {
	return [].length || true;
}() ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log(function() {
-	return Object(1);
+	return Object(1) || !1;
 }() ? 'PASS' : 'FAIL');
 console.log(function() {
-	return [].length, 1;
+	return !0;
 }() ? 'PASS' : 'FAIL');

```

## `uglify/classes/issue_4829_1`

- size: oxc 71 vs reference 76 (-5 bytes, no whitespaces)

```js
'use strict';
try {
	class A extends { f() {} }.f {}
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
 try {
-	class A extends [() => {}][0] {}
-} catch (e) {
+	class A extends { f() {} }.f {}
+} catch {
 	console.log('PASS');
 }

```

## `uglify/classes/issue_5531_1`

- size: oxc 91 vs reference 96 (-5 bytes, no whitespaces)

```js
class A {
	p = function() {
		var a = function f() {
			if (!a) console.log('foo');
			return 42;
		}(a++);
	}();
}
new A();
new A();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 class A {
 	p = function() {
-		var a = function f() {
-			if (!a) console.log('foo');
+		var a = function() {
+			a || console.log('foo');
 			return 42;
 		}(a++);
 	}();

```

## `uglify/collapse_vars/cascade_if_1`

- tags: `join vars`
- size: oxc 25 vs reference 30 (-5 bytes, no whitespaces)

```js
var a;
if (a = x(), a) {
	if (a == y()) z();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-var a;
-if (a = x()) {
-	if (a == y()) z();
-}
+var a = x();
+a && a == y() && z();

```

## `uglify/collapse_vars/issue_3927`

- tags: `join vars`
- size: oxc 100 vs reference 105 (-5 bytes, no whitespaces)

```js
var a = 0;
console.log(function(b) {
	try {
		try {
			if (a + (b = 'PASS', true)) return;
			b.p;
		} finally {
			return b;
		}
	} catch (e) {}
}());

```

```diff
--- reference
+++ oxc
@@ -2,10 +2,10 @@
 console.log(function(b) {
 	try {
 		try {
-			if (a + (b = 'PASS', true)) return;
+			if (0 + (b = 'PASS', !0)) return;
 			b.p;
 		} finally {
 			return b;
 		}
-	} catch (e) {}
+	} catch {}
 }());

```

## `uglify/collapse_vars/return_2`

- tags: `join vars`, `remove unused`
- size: oxc 121 vs reference 126 (-5 bytes, no whitespaces)

```js
var log = console.log;
function f(b, c) {
	var a = c();
	if (b) return b;
	log(a);
}
f(false, function() {
	return 1;
});
f(true, function() {
	return 2;
});

```

```diff
--- reference
+++ oxc
@@ -4,9 +4,9 @@
 	if (b) return b;
 	log(a);
 }
-f(false, function() {
+f(!1, function() {
 	return 1;
 });
-f(true, function() {
+f(!0, function() {
 	return 2;
 });

```

## `uglify/collapse_vars/return_3`

- tags: `join vars`, `remove unused`
- size: oxc 85 vs reference 90 (-5 bytes, no whitespaces)

```js
var log = console.log;
function f(b, c) {
	var a = b <<= c;
	if (b) return b;
	log(a);
}
f(false, 1);
f(true, 2);

```

```diff
--- reference
+++ oxc
@@ -4,5 +4,5 @@
 	if (b) return b;
 	log(a);
 }
-f(false, 1);
-f(true, 2);
+f(!1, 1);
+f(!0, 2);

```

## `uglify/collapse_vars/switch_case_3`

- tags: `join vars`
- size: oxc 64 vs reference 69 (-5 bytes, no whitespaces)

```js
var a = 1, b = 2;
switch (a) {
	case a:
		var b;
		break;
	case b: break;
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,6 @@
 	case a:
 		var b;
 		break;
-	case b: break;
+	case b:
 }
 console.log(b);

```

## `uglify/conditionals/cond_seq_assign_3`

- size: oxc 34 vs reference 39 (-5 bytes, no whitespaces)

```js
var c = 0;
if (this) c = 1 + c, c = c + 1;
else c = 1 + c, c = c + 1;
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var c = 0;
-this, c = 1 + c, c += 1;
+c = 1 + c, c += 1;
 console.log(c);

```

## `uglify/conditionals/condition_matches_consequent`

- size: oxc 124 vs reference 129 (-5 bytes, no whitespaces)

```js
function foo(x, y) {
	return x ? x : y;
}
function bar() {
	return g ? g : h;
}
var g = 4;
var h = 5;
console.log(foo(3, null), foo(0, 7), foo(true, false), bar());

```

```diff
--- reference
+++ oxc
@@ -6,4 +6,4 @@
 }
 var g = 4;
 var h = 5;
-console.log(foo(3, null), foo(0, 7), foo(true, false), bar());
+console.log(foo(3, null), foo(0, 7), foo(!0, !1), bar());

```

## `uglify/conditionals/to_and_or`

- size: oxc 152 vs reference 157 (-5 bytes, no whitespaces)

```js
var values = [
	0,
	null,
	true,
	'foo',
	false,
	-1 / 0,
	void 0
];
values.forEach(function(x) {
	values.forEach(function(y) {
		values.forEach(function(z) {
			console.log(x ? y || z : z);
		});
	});
});

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var values = [
 	0,
 	null,
-	true,
+	!0,
 	'foo',
-	false,
+	!1,
 	-1 / 0,
 	void 0
 ];

```

## `uglify/const/issue_4197`

- tags: `join vars`
- size: oxc 62 vs reference 67 (-5 bytes, no whitespaces)

```js
var a = 0;
try {
	const b = function() {
		a = 1;
		b[1];
	}();
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var a = 0;
 try {
-	const b = function() {
+	let b = function() {
 		a = 1;
 		b[1];
 	}();
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/const/issue_4248`

- tags: `join vars`
- size: oxc 76 vs reference 81 (-5 bytes, no whitespaces)

```js
var a = 'FAIL';
try {
	(function() {
		a = 'PASS';
		b[a];
		const b = 0;
	})();
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -3,8 +3,8 @@
 	(function() {
 		a = 'PASS';
 		b[a];
-		const b = 0;
+		let b = 0;
 	})();
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/const/issue_4527`

- size: oxc 97 vs reference 102 (-5 bytes, no whitespaces)

```js
(function() {
	try {
		throw 1;
	} catch (a) {
		try {
			const a = FAIL;
		} finally {
			if (!b) return console.log('aaaa');
		}
	}
	var b;
})();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 (function() {
 	try {
 		throw 1;
-	} catch (a) {
+	} catch {
 		try {
-			const a = FAIL;
+			let a = FAIL;
 		} finally {
-			if (!t) return console.log('aaaa');
+			if (!b) return console.log('aaaa');
 		}
 	}
-	var t;
+	var b;
 })();

```

## `uglify/const/issue_5660`

- tags: `join vars`
- size: oxc 89 vs reference 94 (-5 bytes, no whitespaces)

```js
function f() {
	try {
		a;
		var b;
		return b;
	} catch (e) {
		var a = 'FAIL';
		const b = null;
		return a;
	}
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,9 @@
 	try {
 		var b;
 		return b;
-	} catch (e) {
+	} catch {
 		var a = 'FAIL';
-		const b = null;
+		let b = null;
 		return a;
 	}
 }

```

## `uglify/const/mangle_catch_1`

- size: oxc 69 vs reference 74 (-5 bytes, no whitespaces)

```js
try {
	throw 'eeeee';
} catch (c) {
	const e = typeof d;
}
console.log(typeof a, typeof b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 try {
 	throw 'eeeee';
-} catch (o) {
-	const e = typeof d;
+} catch {
+	let e = typeof d;
 }
 console.log(typeof a, typeof b);

```

## `uglify/dead-code/issue_2597`

- size: oxc 107 vs reference 112 (-5 bytes, no whitespaces)

```js
function f(b) {
	try {
		try {
			throw 'foo';
		} catch (e) {
			return b = true;
		}
	} finally {
		b && (a = 'PASS');
	}
}
var a = 'FAIL';
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,8 @@
 	try {
 		try {
 			throw 'foo';
-		} catch (e) {
-			return b = true;
+		} catch {
+			return b = !0;
 		}
 	} finally {
 		b && (a = 'PASS');

```

## `uglify/destructured/funarg_reduce_vars_4`

- tags: `join vars`
- size: oxc 57 vs reference 62 (-5 bytes, no whitespaces)

```js
try {
	(function f({ [a = 1]: a }) {})(2);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
-	(function f({ [a = 1]: a }) {})(2);
-} catch (e) {
+	(function({ [a = 1]: a }) {})(2);
+} catch {
 	console.log('PASS');
 }

```

## `uglify/destructured/issue_4286_1`

- tags: `join vars`
- size: oxc 41 vs reference 46 (-5 bytes, no whitespaces)

```js
var a = 'PASS', b;
(0 && a)[{a} = b = a];
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 'PASS', b;
-(0 && a)[{a} = b = a];
+0[{a} = b = a];
 console.log(b);

```

## `uglify/destructured/issue_4584`

- tags: `join vars`
- size: oxc 75 vs reference 80 (-5 bytes, no whitespaces)

```js
try {
	(function f({ [console.log(a = 'FAIL')]: a }) {})(0);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
-	(function f({ [console.log(a = 'FAIL')]: a }) {})(0);
-} catch (e) {
+	(function({ [console.log(a = 'FAIL')]: a }) {})(0);
+} catch {
 	console.log('PASS');
 }

```

## `uglify/exports/defaults_parentheses_3`

- size: oxc 21 vs reference 26 (-5 bytes, no whitespaces)

```js
export default (42, 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export default (42, 'PASS');
+export default 'PASS';

```

## `uglify/functions/issue_3364`

- tags: `join vars`, `remove unused`
- size: oxc 254 vs reference 259 (-5 bytes, no whitespaces)

```js
var s = 2, a = 100, b = 10, c = 0;
function f(p, e, r) {
	try {
		for (var i = 1; i-- > 0;) var a = function(x) {
			function g(y) {
				y && y[a++];
			}
			var x = g(--s >= 0 && f(c++));
			for (var j = 1; --j > 0;);
		}();
	} catch (e) {
		try {
			return;
		} catch (z) {
			for (var k = 1; --k > 0;) {
				for (var l = 1; l > 0; --l) {
					var n = function() {};
					for (var k in n) var o = (n, k);
				}
			}
		}
	}
}
var r = f();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,20 @@
 var s = 2, c = 0;
-(function n(r, o, a) {
+function f(p, e, r) {
 	try {
-		for (var f = 1; f-- > 0;) var t = function(r) {
-			(function(r) {
-				r && r[t++];
-			})(--s >= 0 && n(c++));
-			for (var o = 1; --o > 0;);
+		for (var i = 1; i-- > 0;) var a = function(x) {
+			function g(y) {
+				y && y[a++];
+			}
+			g(--s >= 0 && f(c++));
+			for (var j = 1; --j > 0;);
 		}();
-	} catch (o) {
+	} catch {
 		try {
 			return;
-		} catch (r) {
-			for (var v = 1; --v > 0;) for (var i = 1; i > 0; --i) {
-				function u() {}
-				for (var v in u);
-			}
+		} catch {
+			for (var k = 1; --k > 0;) for (var l = 1; l > 0; --l) for (var k in function() {}) var o = k;
 		}
 	}
-})();
+}
+f();
 console.log(c);

```

## `uglify/ie/issue_3473`

- size: oxc 75 vs reference 80 (-5 bytes, no whitespaces)

```js
var d = 42, a = 100, b = 10, c = 0;
(function b() {
	try {
		c++;
	} catch (b) {}
})();
console.log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var d = 42, a = 100, b = 10, c = 0;
-(function a() {
+(function() {
 	try {
 		c++;
-	} catch (a) {}
+	} catch {}
 })();
 console.log(a, b, c);

```

## `uglify/ie/issue_3473_ie8`

- size: oxc 75 vs reference 80 (-5 bytes, no whitespaces)

```js
var d = 42, a = 100, b = 10, c = 0;
(function b() {
	try {
		c++;
	} catch (b) {}
})();
console.log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var d = 42, a = 100, b = 10, c = 0;
-(function b() {
+(function() {
 	try {
 		c++;
-	} catch (b) {}
+	} catch {}
 })();
 console.log(a, b, c);

```

## `uglify/ie/issue_3473_ie8_toplevel`

- size: oxc 75 vs reference 80 (-5 bytes, no whitespaces)

```js
var d = 42, a = 100, b = 10, c = 0;
(function b() {
	try {
		c++;
	} catch (b) {}
})();
console.log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var c = 42, o = 100, n = 10, t = 0;
-(function n() {
+var d = 42, a = 100, b = 10, c = 0;
+(function() {
 	try {
-		t++;
-	} catch (n) {}
+		c++;
+	} catch {}
 })();
-console.log(o, n, t);
+console.log(a, b, c);

```

## `uglify/ie/issue_3473_toplevel`

- size: oxc 75 vs reference 80 (-5 bytes, no whitespaces)

```js
var d = 42, a = 100, b = 10, c = 0;
(function b() {
	try {
		c++;
	} catch (b) {}
})();
console.log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var c = 42, o = 100, n = 10, t = 0;
-(function c() {
+var d = 42, a = 100, b = 10, c = 0;
+(function() {
 	try {
-		t++;
-	} catch (c) {}
+		c++;
+	} catch {}
 })();
-console.log(o, n, t);
+console.log(a, b, c);

```

## `uglify/ie/issue_3475`

- size: oxc 86 vs reference 91 (-5 bytes, no whitespaces)

```js
'ooooo ddddd';
var a = 'FAIL';
try {
	throw 42;
} catch (b) {
	(function f() {
		a = 'PASS';
	})();
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,8 @@
 var a = 'FAIL';
 try {
 	throw 42;
-} catch (o) {
-	(function o() {
+} catch {
+	(function() {
 		a = 'PASS';
 	})();
 }

```

## `uglify/ie/issue_3475_ie8`

- size: oxc 86 vs reference 91 (-5 bytes, no whitespaces)

```js
'ooooo ddddd';
var a = 'FAIL';
try {
	throw 42;
} catch (b) {
	(function f() {
		a = 'PASS';
	})();
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,8 @@
 var a = 'FAIL';
 try {
 	throw 42;
-} catch (b) {
-	(function f() {
+} catch {
+	(function() {
 		a = 'PASS';
 	})();
 }

```

## `uglify/ie/issue_3475_ie8_toplevel`

- size: oxc 86 vs reference 91 (-5 bytes, no whitespaces)

```js
'ooooo ddddd';
var a = 'FAIL';
try {
	throw 42;
} catch (b) {
	(function f() {
		a = 'PASS';
	})();
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 'ooooo ddddd';
-var o = 'FAIL';
+var a = 'FAIL';
 try {
 	throw 42;
-} catch (d) {
-	(function c() {
-		o = 'PASS';
+} catch {
+	(function() {
+		a = 'PASS';
 	})();
 }
-console.log(o);
+console.log(a);

```

## `uglify/ie/issue_3475_toplevel`

- size: oxc 86 vs reference 91 (-5 bytes, no whitespaces)

```js
'ooooo ddddd';
var a = 'FAIL';
try {
	throw 42;
} catch (b) {
	(function f() {
		a = 'PASS';
	})();
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 'ooooo ddddd';
-var d = 'FAIL';
+var a = 'FAIL';
 try {
 	throw 42;
-} catch (o) {
-	(function o() {
-		d = 'PASS';
+} catch {
+	(function() {
+		a = 'PASS';
 	})();
 }
-console.log(d);
+console.log(a);

```

## `uglify/if_return/if_return_9`

- tags: `sequences`
- size: oxc 73 vs reference 78 (-5 bytes, no whitespaces)

```js
!function() {
	if (console.log('foo')) return 42;
	var a = console.log('bar');
}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function() {
-	var a;
-	return console.log('foo') || (a = console.log('bar'), void 0);
-}();
+(function() {
+	if (console.log('foo')) return 42;
+	var a = console.log('bar');
+})();

```

## `uglify/if_return/issue_1437`

- tags: `sequences`
- size: oxc 57 vs reference 62 (-5 bytes, no whitespaces)

```js
function x() {
	if (a()) return b();
	if (c()) return d();
	else e();
	f();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function x() {
 	if (a()) return b();
 	if (c()) return d();
-	else e();
-	f();
+	e(), f();
 }

```

## `uglify/if_return/issue_5592_2`

- size: oxc 103 vs reference 108 (-5 bytes, no whitespaces)

```js
L: {
	do {
		switch (console.log('foo')) {
			case console.log('bar'):
				if (!console) break L;
				break;
		}
	} while (console.log('baz'));
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-L: do {
-	switch (console.log('foo')) {
-		case console.log('bar'):
-			if (console) break;
-			break L;
-	}
-} while (console.log('baz'));
+L: {
+	do
+		switch (console.log('foo')) {
+			case console.log('bar'): if (!console) break L;
+		}
+	while (console.log('baz'));
+}

```

## `uglify/issue-640/negate_iife_3`

- size: oxc 57 vs reference 62 (-5 bytes, no whitespaces)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function() {
 	return t;
-})() ? console.log(true) : console.log(false);
+})() ? console.log(!0) : console.log(!1);

```

## `uglify/issue-640/negate_iife_3_off`

- size: oxc 57 vs reference 62 (-5 bytes, no whitespaces)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function() {
 	return t;
-})() ? console.log(true) : console.log(false);
+})() ? console.log(!0) : console.log(!1);

```

## `uglify/let/issue_5741`

- tags: `join vars`
- size: oxc 89 vs reference 94 (-5 bytes, no whitespaces)

```js
'use strict';
(function(a) {
	let b = function() {
		var c = a;
		console.log(c);
	}();
	function g() {
		a++;
		b;
	}
})('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 'use strict';
 (function(a) {
-	let b = (c = a, void console.log(c));
-	var c;
+	let b = function() {
+		console.log(a);
+	}();
 	function g() {
 		a++;
-		b;
 	}
 })('PASS');

```

## `uglify/loops/do_switch`

- size: oxc 38 vs reference 43 (-5 bytes, no whitespaces)

```js
do {
	switch (a) {
		case b: continue;
	}
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-do {
+do
 	switch (a) {
 		case b: continue;
 	}
-} while (false);
+while (0);

```

## `uglify/loops/issue_1532_2`

- size: oxc 98 vs reference 103 (-5 bytes, no whitespaces)

```js
function f(x, y) {
	do {
		if (x) {
			console.log(x);
			break;
		}
		console.log(y);
	} while (false);
}
f(null, 'PASS');
f(42, 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,8 @@
 			console.log(x);
 			break;
 		}
-	} while (console.log(y), false);
+		console.log(y);
+	} while (0);
 }
 f(null, 'PASS');
 f(42, 'FAIL');

```

## `uglify/merge_vars/issue_5772_1`

- tags: `join vars`
- size: oxc 84 vs reference 89 (-5 bytes, no whitespaces)

```js
(function(a) {
	while (--a) return;
	var b = console.log('foo') && (c = 42) ? 0 : console.log(c);
	var c = b;
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 (function(a) {
-	if (--a) return;
-	var a = console.log('foo') && (c = 42) ? 0 : console.log(c);
-	var c = a;
+	for (; --a;) return;
+	var c = console.log('foo') && (c = 42) ? 0 : console.log(c);
 })();

```

## `uglify/negate-iife/sequence_off`

- tags: `sequences`, `2 iterations`
- size: oxc 222 vs reference 227 (-5 bytes, no whitespaces)

```js
function f() {
	(function() {
		return t;
	})() ? console.log(true) : console.log(false);
	(function() {
		console.log('something');
	})();
}
function g() {
	(function() {
		console.log('something');
	})();
	(function() {
		return t;
	})() ? console.log(true) : console.log(false);
}

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
 function f() {
-	!function() {
+	(function() {
 		return t;
-	}() ? console.log(false) : console.log(true), function() {
+	})() ? console.log(!0) : console.log(!1), (function() {
 		console.log('something');
-	}();
+	})();
 }
 function g() {
 	(function() {
 		console.log('something');
-	})(), function() {
+	})(), (function() {
 		return t;
-	}() ? console.log(true) : console.log(false);
+	})() ? console.log(!0) : console.log(!1);
 }

```

## `uglify/optional-chains/dot`

- size: oxc 21 vs reference 26 (-5 bytes, no whitespaces)

```js
console?.log((void 0)?.p);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console?.log((void 0)?.p);
+console?.log(void 0);

```

## `uglify/reduce_vars/issue_1865`

- tags: `join vars`
- size: oxc 104 vs reference 109 (-5 bytes, no whitespaces)

```js
function f(some) {
	some.thing = false;
}
console.log(function() {
	var some = { thing: true };
	f(some);
	return some.thing;
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f(some) {
-	some.thing = false;
+	some.thing = !1;
 }
 console.log(function() {
-	var some = { thing: true };
+	var some = { thing: !0 };
 	f(some);
 	return some.thing;
 }());

```

## `uglify/reduce_vars/issue_3140_1`

- tags: `join vars`, `remove unused`
- size: oxc 145 vs reference 150 (-5 bytes, no whitespaces)

```js
(function() {
	var a;
	function f() {}
	f.g = function g() {
		function h() {
			console.log(a ? 'PASS' : 'FAIL');
		}
		a = true;
		this();
		a = false;
		h.g = g;
		return h;
	};
	return f;
})().g().g();

```

```diff
--- reference
+++ oxc
@@ -5,9 +5,9 @@
 		function h() {
 			console.log(a ? 'PASS' : 'FAIL');
 		}
-		a = true;
+		a = !0;
 		this();
-		a = false;
+		a = !1;
 		h.g = g;
 		return h;
 	};

```

## `uglify/reduce_vars/issue_3140_3`

- tags: `join vars`, `remove unused`
- size: oxc 182 vs reference 187 (-5 bytes, no whitespaces)

```js
(function() {
	var a;
	function f() {}
	f.g = function g() {
		var self = this;
		function h() {
			console.log(a ? 'PASS' : 'FAIL');
		}
		a = true;
		(function() {
			return self;
		})()();
		a = false;
		h.g = g;
		return h;
	};
	return f;
})().g().g();

```

```diff
--- reference
+++ oxc
@@ -6,11 +6,11 @@
 		function h() {
 			console.log(a ? 'PASS' : 'FAIL');
 		}
-		a = true;
+		a = !0;
 		(function() {
 			return self;
 		})()();
-		a = false;
+		a = !1;
 		h.g = g;
 		return h;
 	};

```

## `uglify/reduce_vars/issue_3140_4`

- tags: `join vars`, `remove unused`
- size: oxc 159 vs reference 164 (-5 bytes, no whitespaces)

```js
(function() {
	var a;
	function f() {}
	f.g = function g() {
		var o = { p: this };
		function h() {
			console.log(a ? 'PASS' : 'FAIL');
		}
		a = true;
		o.p();
		a = false;
		h.g = g;
		return h;
	};
	return f;
})().g().g();

```

```diff
--- reference
+++ oxc
@@ -6,9 +6,9 @@
 		function h() {
 			console.log(a ? 'PASS' : 'FAIL');
 		}
-		a = true;
+		a = !0;
 		o.p();
-		a = false;
+		a = !1;
 		h.g = g;
 		return h;
 	};

```

## `uglify/reduce_vars/issue_3140_5`

- tags: `join vars`
- size: oxc 100 vs reference 105 (-5 bytes, no whitespaces)

```js
var n = 1, c = 0;
(function(a) {
	var b = function() {
		this;
		n-- && h();
	}();
	function h() {
		b && c++;
	}
	h(b = 1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 var n = 1, c = 0;
 (function(a) {
 	var b = function() {
-		this;
 		n-- && h();
 	}();
 	function h() {

```

## `uglify/reduce_vars/issue_5050`

- tags: `join vars`
- size: oxc 62 vs reference 67 (-5 bytes, no whitespaces)

```js
function f() {
	console.log(a);
}
this;
var a = 1;
f(console.log(2), f(), a = 3);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function f() {
 	console.log(a);
 }
-this;
 var a = 1;
 f(console.log(2), f(), a = 3);

```

## `uglify/reduce_vars/issue_5872_1`

- tags: `join vars`
- size: oxc 100 vs reference 105 (-5 bytes, no whitespaces)

```js
var a = 42;
try {
	while (!function f() {
		a.p;
		a = null;
	}(a.q)) {
		a.r;
		console.log('FAIL');
	}
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 var a = 42;
 try {
-	while (!function f() {
+	for (; !function() {
 		a.p;
 		a = null;
-	}(a.q)) {
+	}(a.q);) {
 		a.r;
 		console.log('FAIL');
 	}
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/reduce_vars/recursive_inlining_5`

- tags: `join vars`, `remove unused`
- size: oxc 184 vs reference 189 (-5 bytes, no whitespaces)

```js
!function() {
	function foo(x) {
		console.log('foo', x);
		if (x) bar(x - 1);
	}
	function bar(x) {
		console.log('bar', x);
		if (x) qux(x - 1);
	}
	function qux(x) {
		console.log('qux', x);
		if (x) foo(x - 1);
	}
	qux(4);
	bar(5);
	foo(3);
}();

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,17 @@
-!function() {
+(function() {
 	function foo(x) {
 		console.log('foo', x);
-		if (x) bar(x - 1);
+		x && bar(x - 1);
 	}
 	function bar(x) {
 		console.log('bar', x);
-		if (x) qux(x - 1);
+		x && qux(x - 1);
 	}
 	function qux(x) {
 		console.log('qux', x);
-		if (x) foo(x - 1);
+		x && foo(x - 1);
 	}
 	qux(4);
 	bar(5);
 	foo(3);
-}();
+})();

```

## `uglify/rename/issue_3480`

- size: oxc 87 vs reference 92 (-5 bytes, no whitespaces)

```js
var d, a, b, c = 'FAIL';
(function b() {
	(function() {
		try {
			c = 'PASS';
		} catch (b) {}
	})();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var d, a, b, c = 'FAIL';
-(function n() {
+(function() {
 	(function() {
 		try {
 			c = 'PASS';
-		} catch (c) {}
+		} catch {}
 	})();
 })();
 console.log(c);

```

## `uglify/rename/issue_3480_ie8`

- size: oxc 87 vs reference 92 (-5 bytes, no whitespaces)

```js
var d, a, b, c = 'FAIL';
(function b() {
	(function() {
		try {
			c = 'PASS';
		} catch (b) {}
	})();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var d, a, b, c = 'FAIL';
-(function b() {
+(function() {
 	(function() {
 		try {
 			c = 'PASS';
-		} catch (b) {}
+		} catch {}
 	})();
 })();
 console.log(c);

```

## `uglify/rename/issue_3480_ie8_toplevel`

- size: oxc 87 vs reference 92 (-5 bytes, no whitespaces)

```js
var d, a, b, c = 'FAIL';
(function b() {
	(function() {
		try {
			c = 'PASS';
		} catch (b) {}
	})();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
-var c, n, o, t = 'FAIL';
-(function o() {
+var d, a, b, c = 'FAIL';
+(function() {
 	(function() {
 		try {
-			t = 'PASS';
-		} catch (o) {}
+			c = 'PASS';
+		} catch {}
 	})();
 })();
-console.log(t);
+console.log(c);

```

## `uglify/rename/issue_3480_toplevel`

- size: oxc 87 vs reference 92 (-5 bytes, no whitespaces)

```js
var d, a, b, c = 'FAIL';
(function b() {
	(function() {
		try {
			c = 'PASS';
		} catch (b) {}
	})();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
-var c, n, o, t = 'FAIL';
-(function c() {
+var d, a, b, c = 'FAIL';
+(function() {
 	(function() {
 		try {
-			t = 'PASS';
-		} catch (c) {}
+			c = 'PASS';
+		} catch {}
 	})();
 })();
-console.log(t);
+console.log(c);

```

## `uglify/rests/issue_4666`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 69 (-5 bytes, no whitespaces)

```js
var a = 0, b = 0;
var o = ((...c) => a++ + c)(b);
for (var k in o) b++;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 var a = 0, b = 0;
-var o = ((c) => +a + c)([b]);
-for (var k in o) b++;
-console.log(1, b);
+for (var k in ((...c) => a++ + c)(b)) b++;
+console.log(a, b);

```

## `uglify/sequences/hoist_decl`

- tags: `join vars`, `sequences`
- size: oxc 32 vs reference 37 (-5 bytes, no whitespaces)

```js
var a;
w();
var b = x();
y();
for (var c; 0;) z();
var d;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-var a, b = (w(), x()), c, d;
-for (y(); 0;) z();
+var a;
+w();
+var b = x();
+y();
+var c, d;

```

## `uglify/spreads/collapse_vars_4`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 55 (-5 bytes, no whitespaces)

```js
console.log(function(a) {
	return a;
}(...['PASS', 'FAIL']));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function(a) {
 	return a;
-}(...['PASS', 'FAIL']));
+}('PASS', 'FAIL'));

```

## `uglify/spreads/dont_inline`

- size: oxc 50 vs reference 55 (-5 bytes, no whitespaces)

```js
console.log(function(a) {
	return a;
}(...['PASS', 'FAIL']));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function(a) {
 	return a;
-}(...['PASS', 'FAIL']));
+}('PASS', 'FAIL'));

```

## `uglify/spreads/reduce_vars_3`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 85 (-5 bytes, no whitespaces)

```js
function f() {}
function g() {
	return ((a) => a)(...[f]);
}
console.log(g() === g() ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f() {}
 function g() {
-	return ((a) => a)(...[f]);
+	return ((a) => a)(f);
 }
 console.log(g() === g() ? 'PASS' : 'FAIL');

```

## `uglify/switches/drop_case_5`

- size: oxc 63 vs reference 68 (-5 bytes, no whitespaces)

```js
switch (42) {
	case void console.log('PASS 1'): console.log('FAIL 1');
	case 42:
	case console.log('FAIL 2'): console.log('PASS 2');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
 switch (42) {
-	default:
-		void console.log('PASS 1');
-		console.log('PASS 2');
+	case console.log('PASS 1'), 42: console.log('PASS 2');
 }

```

## `uglify/templates/ascii_only_templates_ecma`

- size: oxc 49 vs reference 54 (-5 bytes, no whitespaces)

```js
console.log(`\ud801\udc37\ud801𐐷${42}\u{10437}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`\u{10437}\ud801\u{10437}${42}\u{10437}`);
+console.log(`\ud801\udc37\ud801𐐷42\u{10437}`);

```

## `uglify/templates/issue_5878`

- size: oxc 20 vs reference 25 (-5 bytes, no whitespaces)

```js
console.log('PASS');
`42`;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
 console.log('PASS');
-`42`;

```

## `uglify/transform/if_else_empty`

- size: oxc 2 vs reference 7 (-5 bytes, no whitespaces)

```js
if ({} ? a : b);
else {}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-({}), a;
+a;

```

## `uglify/unicode/surrogate_pair`

- size: oxc 85 vs reference 90 (-5 bytes, no whitespaces)

```js
var 丽 = { 丸: '􀀀' };
丽.乁 = '􀀁';
console.log(typeof 丽, 丽.丸, 丽['乁']);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var 丽 = { '丸': '􀀀' };
+var 丽 = { 丸: '􀀀' };
 丽.乁 = '􀀁';
-console.log(typeof 丽, 丽.丸, 丽['乁']);
+console.log(typeof 丽, 丽.丸, 丽.乁);

```

## `uglify/unicode/surrogate_pair_ascii`

- size: oxc 85 vs reference 90 (-5 bytes, no whitespaces)

```js
var 丽 = { 丸: '􀀀' };
丽.乁 = '􀀁';
console.log(typeof 丽, 丽.丸, 丽['乁']);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var 丽 = { '丸': '􀀀' };
+var 丽 = { 丸: '􀀀' };
 丽.乁 = '􀀁';
-console.log(typeof 丽, 丽.丸, 丽['乁']);
+console.log(typeof 丽, 丽.丸, 丽.乁);

```

## `uglify/unicode/surrogate_pair_ascii_ecma`

- size: oxc 85 vs reference 90 (-5 bytes, no whitespaces)

```js
var 丽 = { 丸: '􀀀' };
丽.乁 = '􀀁';
console.log(typeof 丽, 丽.丸, 丽['乁']);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var 丽 = { '丸': '􀀀' };
+var 丽 = { 丸: '􀀀' };
 丽.乁 = '􀀁';
-console.log(typeof 丽, 丽.丸, 丽['乁']);
+console.log(typeof 丽, 丽.丸, 丽.乁);

```

## `uglify/unicode/surrogate_pair_ecma`

- size: oxc 85 vs reference 90 (-5 bytes, no whitespaces)

```js
var 丽 = { 丸: '􀀀' };
丽.乁 = '􀀁';
console.log(typeof 丽, 丽.丸, 丽['乁']);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-var 丽 = { '丸': '􀀀' };
+var 丽 = { 丸: '􀀀' };
 丽.乁 = '􀀁';
-console.log(typeof 丽, 丽.丸, 丽['乁']);
+console.log(typeof 丽, 丽.丸, 丽.乁);

```

## `uglify/webkit/lambda_dot_assign_webkit`

- size: oxc 30 vs reference 35 (-5 bytes, no whitespaces)

```js
console.log(function() {
	1 + 1;
}.a = 1);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-console.log((function() {
-	1 + 1;
-}).a = 1);
+console.log(function() {}.a = 1);

```

## `uglify/arguments/issue_3273_drop_fargs_1`

- tags: `join vars`
- size: oxc 71 vs reference 77 (-6 bytes, no whitespaces)

```js
(function() {
	'use strict';
	arguments[0]++;
	console.log(arguments[0]);
})(0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-(function(argument_0) {
+(function() {
 	'use strict';
-	argument_0++;
-	console.log(argument_0);
+	arguments[0]++;
+	console.log(arguments[0]);
 })(0);

```

## `uglify/arguments/issue_3273_drop_fargs_2`

- tags: `join vars`
- size: oxc 71 vs reference 77 (-6 bytes, no whitespaces)

```js
(function() {
	'use strict';
	arguments[0]++;
	console.log(arguments[0]);
})(0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-(function(argument_0) {
+(function() {
 	'use strict';
-	argument_0++;
-	console.log(argument_0);
+	arguments[0]++;
+	console.log(arguments[0]);
 })(0);

```

## `uglify/arrays/unsafe_evaluate_modified_sequence`

- tags: `join vars`
- size: oxc 59 vs reference 65 (-6 bytes, no whitespaces)

```js
(function(a) {
	(0, a).push(1);
	if (a.length) console.log('PASS');
})([]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function(a) {
-	(0, a).push(1);
-	if (a.length) console.log('PASS');
+	a.push(1);
+	a.length && console.log('PASS');
 })([]);

```

## `uglify/arrows/assign_arrow`

- size: oxc 24 vs reference 30 (-6 bytes, no whitespaces)

```js
var f = (a) => a;
console.log(f(42));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var f = (a) => a;
-console.log(f(42));
+console.log(((a) => a)(42));

```

## `uglify/arrows/single_use_recursive`

- tags: `join vars`, `remove unused`
- size: oxc 46 vs reference 52 (-6 bytes, no whitespaces)

```js
function f() {
	return (() => f)();
}
console.log(typeof f());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log(typeof function f() {
-	return (() => f)();
-}());
+function f() {
+	return f;
+}
+console.log(typeof f());

```

## `uglify/classes/unused_await_strict`

- tags: `remove unused`
- size: oxc 73 vs reference 79 (-6 bytes, no whitespaces)

```js
'use strict';
var await = 'PASS';
(async function() {
	class A {
		static p = console.log(await);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 'use strict';
-var await = 'PASS';
 (async function() {
-	(() => console.log(await))();
+	class A {
+		static p = console.log('PASS');
+	}
 })();

```

## `uglify/collapse_vars/boolean_binary_1`

- tags: `join vars`
- size: oxc 53 vs reference 59 (-6 bytes, no whitespaces)

```js
var a = 1;
a++;
(function() {} || a || 3).toString();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var a = 1;
 a++;
-(function() {} || a || 3).toString();
+(function() {}).toString();
 console.log(a);

```

## `uglify/collapse_vars/issue_3247`

- tags: `join vars`
- size: oxc 71 vs reference 77 (-6 bytes, no whitespaces)

```js
function f(o) {
	console.log(o.p);
}
var a;
a = Object({ p: 'PASS' });
a.q = true;
f(a, true);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f(o) {
 	console.log(o.p);
 }
-var a;
-(a = Object({ p: 'PASS' })).q = true;
-f(a, true);
+var a = Object({ p: 'PASS' });
+a.q = !0;
+f(a, !0);

```

## `uglify/collapse_vars/issue_3651`

- tags: `join vars`
- size: oxc 120 vs reference 126 (-6 bytes, no whitespaces)

```js
var a, b = 'PASS';
try {
	a = function() {
		try {
			var c = 1;
			while (0 < --c);
		} catch (e) {} finally {
			throw 42;
		}
	}();
	b = 'FAIL';
	a.p;
} catch (e) {
	console.log(b);
}

```

```diff
--- reference
+++ oxc
@@ -3,13 +3,13 @@
 	a = function() {
 		try {
 			var c = 1;
-			while (0 < --c);
-		} catch (e) {} finally {
+			for (; 0 < --c;);
+		} catch {} finally {
 			throw 42;
 		}
 	}();
 	b = 'FAIL';
 	a.p;
-} catch (e) {
+} catch {
 	console.log(b);
 }

```

## `uglify/comparisons/issue_2857_3`

- size: oxc 160 vs reference 166 (-6 bytes, no whitespaces)

```js
a === undefined || a === null || p;
a === undefined || a !== null || p;
a !== undefined || a === null || p;
a !== undefined || a !== null || p;
a === undefined && a === null || p;
a === undefined && a !== null || p;
a !== undefined && a === null || p;
a !== undefined && a !== null || p;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-null == a || p;
-void 0 === a || null !== a || p;
-void 0 !== a || null === a || p;
-void 0 !== a || null !== a || p;
-void 0 === a && null === a || p;
-void 0 === a && null !== a || p;
-void 0 !== a && null === a || p;
-null != a || p;
+a == null || p;
+a === void 0 || a !== null || p;
+a !== void 0 || a === null || p;
+a !== void 0 || a !== null || p;
+a === void 0 && a === null || p;
+a === void 0 && a !== null || p;
+a !== void 0 && a === null || p;
+a ?? p;

```

## `uglify/comparisons/self_comparison_1`

- size: oxc 24 vs reference 30 (-6 bytes, no whitespaces)

```js
a === a;
a !== b;
b.c === a.c;
b.c !== b.c;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-a == a;
-a !== b;
-b.c === a.c;
-b.c != b.c;
+a, a;
+a, b;
+b.c, a.c;
+b.c, b.c;

```

## `uglify/conditionals/issue_5546_3`

- size: oxc 86 vs reference 92 (-6 bytes, no whitespaces)

```js
var a;
if (a) try {
	FAIL;
} catch (e) {
	console.log('FAIL');
}
else try {
	FAIL;
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 var a;
 if (a) try {
 	FAIL;
-} catch (e) {
+} catch {
 	console.log('FAIL');
 }
 else try {
 	FAIL;
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/const/issue_5319`

- tags: `join vars`
- size: oxc 78 vs reference 84 (-6 bytes, no whitespaces)

```js
(function(a, c) {
	var b = a, c = b;
	{
		const a = c;
		console.log(c());
	}
})(function() {
	return 'PASS';
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 (function(a, c) {
-	var b = a, c;
+	var c = a;
 	{
-		const a = c = b;
+		let a = c;
 		console.log(c());
 	}
 })(function() {

```

## `uglify/dead-code/issue_5506`

- size: oxc 111 vs reference 117 (-6 bytes, no whitespaces)

```js
try {
	(function(a) {
		var b = 1;
		(function f() {
			try {
				b-- && f();
			} catch (c) {}
			console.log(a);
			a = 42 in (a = 'bar');
		})();
	})('foo');
} catch (e) {}

```

```diff
--- reference
+++ oxc
@@ -4,9 +4,9 @@
 		(function f() {
 			try {
 				b-- && f();
-			} catch (c) {}
+			} catch {}
 			console.log(a);
 			a = 42 in (a = 'bar');
 		})();
 	})('foo');
-} catch (e) {}
+} catch {}

```

## `uglify/destructured/fn_name_unused`

- tags: `remove unused`
- size: oxc 86 vs reference 92 (-6 bytes, no whitespaces)

```js
console.log(function f({ [typeof f]: a }) {
	var f;
	return a;
}({
	function: 'PASS',
	undefined: 'FAIL'
}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 console.log(function f({ [typeof f]: a }) {
-	var f;
 	return a;
 }({
 	function: 'PASS',

```

## `uglify/destructured/funarg_unused_6_keep_fargs`

- tags: `remove unused`
- size: oxc 49 vs reference 55 (-6 bytes, no whitespaces)

```js
(function(a) {
	var {} = (a = console, 42);
})();
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-(function() {
-	console;
-	var {} = 42;
+(function(a) {
+	a = console;
 })();
 console.log(typeof a);

```

## `uglify/drop-unused/issue_3664`

- tags: `remove unused`
- size: oxc 79 vs reference 85 (-6 bytes, no whitespaces)

```js
console.log(function() {
	var a, b = (a = (a = [b && console.log('FAIL')]).p = 0, 0);
	return 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 console.log(function() {
-	a = (a = [b && console.log('FAIL')]).p = 0;
-	var a, b = 0;
+	var b = ([b && console.log('FAIL')].p = 0, 0);
 	return 'PASS';
 }());

```

## `uglify/evaluate/unsafe_object_accessor`

- tags: `join vars`
- size: oxc 46 vs reference 52 (-6 bytes, no whitespaces)

```js
function f() {
	var a = {
		get b() {},
		set b(v) {}
	};
	return { a };
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 function f() {
-	var a = {
+	return { a: {
 		get b() {},
 		set b(v) {}
-	};
-	return { a };
+	} };
 }

```

## `uglify/functions/issue_5316_2`

- tags: `join vars`
- size: oxc 87 vs reference 93 (-6 bytes, no whitespaces)

```js
do {
	(function() {
		var a, b = 42 && (console[a = b] = a++);
		while (console.log('PASS'));
	})();
} while (!console);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-do {
-	a = void 0;
-	var a, b = (42, console[a = b = void 0] = a++);
-	while (console.log('PASS'));
-} while (!console);
+do
+	(function() {
+		var a, b = console[a = b] = a++;
+		for (; console.log('PASS'););
+	})();
+while (!console);

```

## `uglify/functions/recursive_collapse`

- tags: `join vars`
- size: oxc 58 vs reference 64 (-6 bytes, no whitespaces)

```js
console.log(function f(a) {
	var b = a && f();
	return b;
}('FAIL') || 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 console.log(function f(a) {
-	var b;
 	return a && f();
 }('FAIL') || 'PASS');

```

## `uglify/global_defs/issue_1986`

- size: oxc 10 vs reference 16 (-6 bytes, no whitespaces)

```js
alert(42);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(42);
+alert(42);

```

## `uglify/hoist_props/issue_5441`

- tags: `join vars`, `2 iterations`
- size: oxc 71 vs reference 77 (-6 bytes, no whitespaces)

```js
console.log(function(a) {
	(function() {
		a = { p: this };
	})();
	return typeof a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 console.log(function(a) {
 	(function() {
-		a_p = this;
+		a = { p: this };
 	})();
-	var a_p;
-	return typeof {};
+	return typeof a;
 }());

```

## `uglify/hoist_props/name_collision_4`

- tags: `join vars`
- size: oxc 94 vs reference 100 (-6 bytes, no whitespaces)

```js
console.log(function() {
	var o = {
		p: 0,
		q: 'PASS'
	};
	return function(o_p) {
		if (!o.p) return o_p;
	}(o.q);
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,9 @@
 console.log(function() {
-	var o, o_p$0 = 0, o_q = 'PASS';
+	var o = {
+		p: 0,
+		q: 'PASS'
+	};
 	return function(o_p) {
-		if (!o_p$0) return o_p;
-	}(o_q);
+		if (!o.p) return o_p;
+	}(o.q);
 }());

```

## `uglify/hoist_props/object_super`

- tags: `join vars`
- size: oxc 63 vs reference 69 (-6 bytes, no whitespaces)

```js
var o = { f(a) {
	return a ? console.log('PASS') : super.log('PASS');
} };
o.f(42);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var o = { f(a) {
+({ f(a) {
 	return a ? console.log('PASS') : super.log('PASS');
-} };
-o.f(42);
+} }).f(42);

```

## `uglify/hoist_vars/issue_4487_1`

- tags: `join vars`, `remove unused`, `keep function names`
- size: oxc 46 vs reference 52 (-6 bytes, no whitespaces)

```js
var a = function f() {
	var f = console.log(typeof f);
};
var b = a();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a = function f() {
+(function f() {
 	var f = console.log(typeof f);
-};
-a();
+})();

```

## `uglify/ie/issue_2254_1`

- size: oxc 89 vs reference 95 (-6 bytes, no whitespaces)

```js
'eeeeee';
try {
	console.log(f('PASS'));
} catch (e) {}
function f(s) {
	try {
		throw 'FAIL';
	} catch (e) {
		return s;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 'eeeeee';
 try {
 	console.log(f('PASS'));
-} catch (e) {}
-function f(t) {
+} catch {}
+function f(s) {
 	try {
 		throw 'FAIL';
-	} catch (e) {
-		return t;
+	} catch {
+		return s;
 	}
 }

```

## `uglify/ie/issue_2254_2`

- size: oxc 89 vs reference 95 (-6 bytes, no whitespaces)

```js
'eeeeee';
try {
	console.log(f('PASS'));
} catch (e) {}
function f(s) {
	try {
		throw 'FAIL';
	} catch (e) {
		return s;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 'eeeeee';
 try {
 	console.log(f('PASS'));
-} catch (e) {}
-function f(t) {
+} catch {}
+function f(s) {
 	try {
 		throw 'FAIL';
-	} catch (e) {
-		return t;
+	} catch {
+		return s;
 	}
 }

```

## `uglify/if_return/if_var_return_2`

- tags: `sequences`
- size: oxc 48 vs reference 54 (-6 bytes, no whitespaces)

```js
(function() {
	var a = w();
	if (x()) return y();
	z();
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 (function() {
 	var a = w();
-	return x() ? y() : (z(), void 0);
+	if (x()) return y();
+	z();
 })();

```

## `uglify/if_return/issue_5584_4`

- size: oxc 100 vs reference 106 (-6 bytes, no whitespaces)

```js
function f(a) {
	switch (console.log('foo')) {
		case console.log('bar'):
			if (a) return;
			break;
	}
	console.log('baz');
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,6 @@
 function f(a) {
 	switch (console.log('foo')) {
-		case console.log('bar'):
-			if (a) return;
-			break;
+		case console.log('bar'): if (a) return;
 	}
 	console.log('baz');
 }

```

## `uglify/issue-1105/assorted_Infinity_NaN_undefined_in_with_scope_keep_infinity`

- tags: `join vars`, `remove unused`
- size: oxc 221 vs reference 227 (-6 bytes, no whitespaces)

```js
var f = console.log;
var o = {
	undefined: 3,
	NaN: 4,
	Infinity: 5
};
if (o) {
	f(undefined, void 0);
	f(NaN, 0 / 0);
	f(Infinity, 1 / 0);
	f(-Infinity, -(1 / 0));
	f(2 + 7 + undefined, 2 + 7 + void 0);
}
with(o) {
	f(undefined, void 0);
	f(NaN, 0 / 0);
	f(Infinity, 1 / 0);
	f(-Infinity, -(1 / 0));
	f(2 + 7 + undefined, 2 + 7 + void 0);
}

```

```diff
--- reference
+++ oxc
@@ -7,13 +7,13 @@
 	f(void 0, void 0);
 	f(NaN, NaN);
 	f(Infinity, 1 / 0);
-	f(-Infinity, -1 / 0);
+	f(-Infinity, -Infinity);
 	f(NaN, NaN);
 }
 with(o) {
-	f(undefined, void 0);
-	f(NaN, 0 / 0);
+	f(void 0, void 0);
+	f(NaN, NaN);
 	f(Infinity, 1 / 0);
-	f(-Infinity, -1 / 0);
-	f(9 + undefined, 9 + void 0);
+	f(-Infinity, -Infinity);
+	f(NaN, NaN);
 }

```

## `uglify/join_vars/assign_sequence_var`

- tags: `join vars`
- size: oxc 54 vs reference 60 (-6 bytes, no whitespaces)

```js
var a = 0, b = 1;
console.log(a), a++, b = 2;
var c = 3;
console.log(a, b, c);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var a = 0, b = 1, c = (console.log(a), a++, b = 2, 3);
-console.log(a, b, c);
+var a = 0, b = 1;
+console.log(a), a++, b = 2;
+console.log(a, b, 3);

```

## `uglify/let/issue_4305_2`

- tags: `join vars`, `remove unused`
- size: oxc 75 vs reference 81 (-6 bytes, no whitespaces)

```js
'use strict';
(function(a) {
	let a = function() {
		while (console.log('aaaaa'));
	};
	a();
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 'use strict';
 (function(a) {
-	let a = function() {
-		while (console.log('aaaaa'));
-	};
-	a();
+	(function() {
+		for (; console.log('aaaaa'););
+	})();
 })();

```

## `uglify/let/issue_5756_3`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 83 (-6 bytes, no whitespaces)

```js
'use strict';
console.log(f()());
function f() {
	const a = 'PASS';
	return function() {
		return a;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'use strict';
-console.log(function() {
-	let a = 'PASS';
+console.log(f()());
+function f() {
 	return function() {
-		return a;
+		return 'PASS';
 	};
-}()());
+}

```

## `uglify/loops/for_of`

- size: oxc 55 vs reference 61 (-6 bytes, no whitespaces)

```js
var a = ['PASS', 42];
a.p = 'FAIL';
for (a of (null, a)) console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = ['PASS', 42];
 a.p = 'FAIL';
-for (a of (null, a)) console.log(a);
+for (a of a) console.log(a);

```

## `uglify/merge_vars/cross_branch_2b_13`

- tags: `join vars`
- size: oxc 127 vs reference 133 (-6 bytes, no whitespaces)

```js
var a, b;
function f() {
	var x, y;
	x = 'foo';
	if (a) console.log(x);
	y = 'bar';
	if (b) console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 var a, b;
 function f() {
-	var x, x;
-	x = 'foo';
-	if (a) console.log(x);
-	x = 'bar';
-	if (b) console.log(x);
+	var x = 'foo', y;
+	a && console.log(x);
+	y = 'bar';
+	b && console.log(y);
 }
 a = 0, b = 0;
 f();

```

## `uglify/merge_vars/not_redefined`

- tags: `join vars`, `remove unused`
- size: oxc 85 vs reference 91 (-6 bytes, no whitespaces)

```js
var log = console.log;
(function() {
	return f('PASS');
	function f(a) {
		const b = a;
		const c = log(b);
		const d = log;
		c && log(d);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var log = console.log;
 (function() {
-	return a = 'PASS', a = log(a), d = log, void (a && log(d));
-	var a, d;
+	return f('PASS');
+	function f(a) {
+		log(a) && log(log);
+	}
 })();

```

## `uglify/new/new_statements_3`

- size: oxc 138 vs reference 144 (-6 bytes, no whitespaces)

```js
new (function(foo) {
	this.foo = foo;
})(1);
new (function(foo) {
	this.foo = foo;
})();
new (function test(foo) {
	this.foo = foo;
})(1);
new (function test(foo) {
	this.foo = foo;
})();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-new function(foo) {
+new (function(foo) {
 	this.foo = foo;
-}(1);
-new function(foo) {
+})(1);
+new (function(foo) {
 	this.foo = foo;
-}();
-new function test(foo) {
+})();
+new (function(foo) {
 	this.foo = foo;
-}(1);
-new function test(foo) {
+})(1);
+new (function(foo) {
 	this.foo = foo;
-}();
+})();

```

## `uglify/properties/dot_properties`

- size: oxc 90 vs reference 96 (-6 bytes, no whitespaces)

```js
a['foo'] = 'bar';
a['if'] = 'if';
a['*'] = 'asterisk';
a['ຳ'] = 'unicode';
a[''] = 'whitespace';
a['1_1'] = 'foo';

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 a.foo = 'bar';
-a['if'] = 'if';
+a.if = 'if';
 a['*'] = 'asterisk';
-a['ຳ'] = 'unicode';
+a.ຳ = 'unicode';
 a[''] = 'whitespace';
 a['1_1'] = 'foo';

```

## `uglify/pure_getters/nested_property_assignments_3`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 95 vs reference 101 (-6 bytes, no whitespaces)

```js
var o = { p: {} };
(function(a) {
	console && a;
	if (console) {
		a = a.p;
		a.q = a;
	}
})(o);
console.log(o.p.q === o.p ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var o = { p: {} };
 (function(a) {
-	console;
-	if (console) (a = a.p).q = a;
+	if (console) {
+		a = a.p;
+		a.q = a;
+	}
 })(o);
 console.log(o.p.q === o.p ? 'PASS' : 'FAIL');

```

## `uglify/reduce_vars/boolean_binary_assign`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 43 (-6 bytes, no whitespaces)

```js
!function() {
	var a;
	void 0 && (a = 1);
	console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-!function() {
+(function() {
 	var a;
-	void 0;
 	console.log(a);
-}();
+})();

```

## `uglify/reduce_vars/escape_sequence`

- tags: `join vars`, `remove unused`
- size: oxc 143 vs reference 149 (-6 bytes, no whitespaces)

```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('FAIL');
	else console.log('PASS');
}
function baz() {
	return foo, bar;
}
function foo() {}
function bar() {}
main();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('PASS') : console.log('FAIL');
+}
 function baz() {
-	return function() {}, bar;
+	return bar;
 }
 function bar() {}
-(function() {
-	var thing = baz();
-	if (thing !== baz()) console.log('FAIL');
-	else console.log('PASS');
-})();
+main();

```

## `uglify/reduce_vars/issue_3240_3`

- tags: `join vars`, `remove unused`
- size: oxc 129 vs reference 135 (-6 bytes, no whitespaces)

```js
(function() {
	f();
	function f(b) {
		if (!f.a) f.a = 0;
		console.log(f.a.toString());
		var g = function() {
			(b ? function() {} : function() {
				f.a++;
				f(1);
			})();
		};
		g();
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 (function() {
 	f();
 	function f(b) {
-		if (!f.a) f.a = 0;
+		f.a ||= 0;
 		console.log(f.a.toString());
 		(function() {
 			(b ? function() {} : function() {

```

## `uglify/reduce_vars/issue_3240_4`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 129 vs reference 135 (-6 bytes, no whitespaces)

```js
(function() {
	f();
	function f(b) {
		if (!f.a) f.a = 0;
		console.log(f.a.toString());
		var g = function() {
			(b ? function() {} : function() {
				f.a++;
				f(1);
			})();
		};
		g();
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 (function() {
 	f();
 	function f(b) {
-		if (!f.a) f.a = 0;
+		f.a ||= 0;
 		console.log(f.a.toString());
 		(function() {
 			(b ? function() {} : function() {

```

## `uglify/rests/arrow_destructured_object_3`

- size: oxc 76 vs reference 82 (-6 bytes, no whitespaces)

```js
var f = ([{ ...a } = ['FAIL']]) => a;
var o = f(['PASS']);
for (var k in o) console.log(k, o[k]);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var f = ([{ ...a } = ['FAIL']]) => a;
-var o = f(['PASS']);
+var o = (([{ ...a } = ['FAIL']]) => a)(['PASS']);
 for (var k in o) console.log(k, o[k]);

```

## `uglify/sequences/missing_link`

- tags: `sequences`
- size: oxc 31 vs reference 37 (-6 bytes, no whitespaces)

```js
var a = 100;
a;
a++ + (0 ? 2 : 1);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 100;
-a, a++ + (0, 1), console.log(a);
+a++ + 1, console.log(a);

```

## `uglify/side_effects/issue_5912_2`

- tags: `join vars`
- size: oxc 82 vs reference 88 (-6 bytes, no whitespaces)

```js
var a = {};
a = a.p;
if (!console) a.q;
try {
	a.r;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 var a = {};
 a = a.p;
-if (!console) a.q;
+console || a.q;
 try {
 	a.r;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/spreads/decimal`

- size: oxc 16 vs reference 22 (-6 bytes, no whitespaces)

```js
console.log({ ....42 });

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log({ ....42 });
+console.log({});

```

## `uglify/spreads/issue_5006`

- size: oxc 77 vs reference 83 (-6 bytes, no whitespaces)

```js
console.log(function(b, c) {
	c = 'FAIL 2';
	return arguments[1];
}(...[], 'FAIL 1') || 'PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log(function(b, c) {
 	c = 'FAIL 2';
 	return arguments[1];
-}(...[], 'FAIL 1') || 'PASS');
+}('FAIL 1') || 'PASS');

```

## `uglify/typeof/issue_1668`

- size: oxc 0 vs reference 6 (-6 bytes, no whitespaces)

```js
if (typeof bar);

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-if (1);

```

## `uglify/typeof/reassign_iife`

- tags: `2 iterations`
- size: oxc 109 vs reference 115 (-6 bytes, no whitespaces)

```js
A = console;
if ('undefined' == typeof A) console.log('FAIL 1');
else (function() {
	A = void 0;
})(console.log(void 0 === A ? 'FAIL 2' : 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 A = console;
-'undefined' == typeof A ? console.log('FAIL 1') : function() {
+typeof A > 'u' ? console.log('FAIL 1') : (function() {
 	A = void 0;
-}(console.log((A, false) ? 'FAIL 2' : 'PASS'));
+})(console.log(A === void 0 ? 'FAIL 2' : 'PASS'));

```

## `uglify/yields/empty_yield_conditional`

- size: oxc 189 vs reference 195 (-6 bytes, no whitespaces)

```js
var a = function* () {
	console.log((yield) ? yield : yield);
}();
console.log(a.next('FAIL 1').value);
console.log(a.next('FAIL 2').value);
console.log(a.next('PASS').value);
console.log(a.next('FAIL 3').done);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = function* () {
-	console.log((yield) ? yield : yield);
+	console.log((yield, yield));
 }();
 console.log(a.next('FAIL 1').value);
 console.log(a.next('FAIL 2').value);

```

## `uglify/arguments/issue_3282_2_passes`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 145 vs reference 152 (-7 bytes, no whitespaces)

```js
(function(f) {
	f();
})(function() {
	return (function(t) {
		return function() {
			t();
		};
	})(function() {
		'use strict';
		function e() {
			return arguments[0];
		}
		e();
		e();
	})();
});

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,16 @@
-(function() {
-	(function() {
-		return function(t) {
-			return function() {
-				t();
-			};
-		}(function() {
-			'use strict';
-			function e(argument_0) {
-				return argument_0;
-			}
-			e();
-			e();
-		})();
+(function(f) {
+	f();
+})(function() {
+	return (function(t) {
+		return function() {
+			t();
+		};
+	})(function() {
+		'use strict';
+		function e() {
+			return arguments[0];
+		}
+		e();
+		e();
 	})();
-})();
+});

```

## `uglify/arguments/issue_3420_4`

- tags: `join vars`
- size: oxc 90 vs reference 97 (-7 bytes, no whitespaces)

```js
!function() {
	console.log(arguments[0]);
	delete arguments[0];
	console.log(arguments[0]);
}(42);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!function(argument_0) {
-	console.log(argument_0);
+(function() {
+	console.log(arguments[0]);
 	delete arguments[0];
 	console.log(arguments[0]);
-}(42);
+})(42);

```

## `uglify/arguments/issue_3420_5`

- tags: `join vars`
- size: oxc 103 vs reference 110 (-7 bytes, no whitespaces)

```js
'use strict';
!function() {
	console.log(arguments[0]);
	delete arguments[0];
	console.log(arguments[0]);
}(42);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
-!function(argument_0) {
-	console.log(argument_0);
+(function() {
+	console.log(arguments[0]);
 	delete arguments[0];
 	console.log(arguments[0]);
-}(42);
+})(42);

```

## `uglify/awaits/async_computed`

- size: oxc 63 vs reference 70 (-7 bytes, no whitespaces)

```js
var o = {
	async [42]() {
		return this.p;
	},
	p: 'PASS'
};
o[42]().then(console.log);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
-var o = {
-	async [42]() {
+({
+	async 42() {
 		return this.p;
 	},
 	p: 'PASS'
-};
-o[42]().then(console.log);
+})[42]().then(console.log);

```

## `uglify/collapse_vars/collapse_for_init`

- tags: `join vars`
- size: oxc 34 vs reference 41 (-7 bytes, no whitespaces)

```js
for (var a = (Math, console), b = a.log('PASS'); b;);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-Math;
-for (var a, b = console.log('PASS'); b;);
+for (var b = console.log('PASS'); b;);

```

## `uglify/collapse_vars/iife_2`

- tags: `join vars`
- size: oxc 37 vs reference 44 (-7 bytes, no whitespaces)

```js
var foo = bar();
!function(x) {
	console.log(x);
}(foo);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var foo;
-!function(x) {
+(function(x) {
 	console.log(x);
-}(bar());
+})(bar());

```

## `uglify/collapse_vars/issue_2187_1`

- tags: `join vars`, `remove unused`
- size: oxc 66 vs reference 73 (-7 bytes, no whitespaces)

```js
var a = 1;
!function(foo) {
	foo();
	var a = 2;
	console.log(a);
}(function() {
	console.log(a);
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
-var a = 1;
-!function(foo) {
+(function(foo) {
 	foo();
 	console.log(2);
-}(function() {
-	console.log(a);
+})(function() {
+	console.log(1);
 });

```

## `uglify/collapse_vars/issue_2954_2`

- tags: `join vars`
- size: oxc 116 vs reference 123 (-7 bytes, no whitespaces)

```js
var a = 'FAIL_1', b;
try {
	throw 0;
} catch (e) {
	do {
		b = function() {
			throw new Error('PASS');
		}();
		a = 'FAIL_2';
		b && b.c;
	} while (0);
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,13 @@
 var a = 'FAIL_1', b;
 try {
 	throw 0;
-} catch (e) {
+} catch {
 	do {
+		b = function() {
+			throw Error('PASS');
+		}();
 		a = 'FAIL_2';
-		(b = function() {
-			throw new Error('PASS');
-		}()) && b.c;
+		b && b.c;
 	} while (0);
 }
 console.log(a);

```

## `uglify/collapse_vars/issue_4012`

- tags: `join vars`
- size: oxc 85 vs reference 92 (-7 bytes, no whitespaces)

```js
(function(a) {
	try {
		throw 2;
	} catch (b) {
		a = 'PASS';
		if (--b) return;
		if (3);
	} finally {
		console.log(a);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,6 @@
 	} catch (b) {
 		a = 'PASS';
 		if (--b) return;
-		if (3);
 	} finally {
 		console.log(a);
 	}

```

## `uglify/collapse_vars/issue_5396`

- tags: `join vars`, `remove unused`
- size: oxc 82 vs reference 89 (-7 bytes, no whitespaces)

```js
var a, b;
function f() {}
b = 0;
new function g(c) {
	var d = a && g(e), e = ++d, i = [42];
	for (var j in i) console.log('PASS'), i;
}();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-var a, b;
-function f() {}
-b = 0;
-(function g(c) {
-	a && g();
+var a;
+new function g(c) {
+	var d = a && g(e), e = ++d;
 	for (var j in [42]) console.log('PASS');
-})();
+}();

```

## `uglify/collapse_vars/reduce_vars_assign`

- tags: `join vars`
- size: oxc 43 vs reference 50 (-7 bytes, no whitespaces)

```js
!function() {
	var a = 1;
	a = [].length, console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function() {
+(function() {
 	var a = 1;
-	a = [].length, console.log(a);
-}();
+	a = 0, console.log(a);
+})();

```

## `uglify/const/issue_4965_1`

- size: oxc 64 vs reference 71 (-7 bytes, no whitespaces)

```js
'use strict';
try {
	c;
} catch (a) {
	{
		const a = 1;
	}
	{
		const a = console.log(typeof c);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 'use strict';
 try {
 	c;
-} catch (t) {
+} catch {
 	{
-		const c = 1;
+		let a = 1;
 	}
 	{
-		const t = console.log(typeof c);
+		let a = console.log(typeof c);
 	}
 }

```

## `uglify/const/issue_4965_2`

- size: oxc 84 vs reference 91 (-7 bytes, no whitespaces)

```js
'use strict';
try {
	throw 1;
} catch (e) {
	try {
		{
			const e = 2;
		}
	} finally {
		const e = 3;
		console.log(typeof t);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
 'use strict';
 try {
 	throw 1;
-} catch (o) {
+} catch {
 	try {
 		{
-			const t = 2;
+			let e = 2;
 		}
 	} finally {
-		const o = 3;
+		let e = 3;
 		console.log(typeof t);
 	}
 }

```

## `uglify/dead-code/dead_code_1`

- size: oxc 26 vs reference 33 (-7 bytes, no whitespaces)

```js
function f() {
	a();
	b();
	x = 10;
	return;
	if (x) {
		y();
	}
}

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,4 @@
 	a();
 	b();
 	x = 10;
-	return;
 }

```

## `uglify/evaluate/conditional_function`

- tags: `join vars`
- size: oxc 65 vs reference 72 (-7 bytes, no whitespaces)

```js
function f(a) {
	return a && 'undefined' != typeof A ? A : 42;
}
console.log(f(0), f(1));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	return a && 'undefined' != typeof A ? A : 42;
+	return a && typeof A < 'u' ? A : 42;
 }
-console.log(42, f(1));
+console.log(f(0), f(1));

```

## `uglify/functions/issue_4659_2`

- tags: `join vars`
- size: oxc 102 vs reference 109 (-7 bytes, no whitespaces)

```js
var a = 0;
(function() {
	function f() {
		return a++;
	}
	(function() {
		(function() {
			f && f();
		})();
		(function() {
			var a = console && a;
		})();
	})();
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -3,9 +3,10 @@
 	function f() {
 		return a++;
 	}
-	void (f && a++);
 	(function() {
-		var a = console && a;
+		(function() {
+			f && f();
+		})();
 	})();
 })();
 console.log(a);

```

## `uglify/ie/issue_4015`

- size: oxc 99 vs reference 106 (-7 bytes, no whitespaces)

```js
var n, a = 0, b;
function f() {
	try {
		throw 0;
	} catch (b) {
		(function g() {
			(function b() {
				a++;
			})();
		})();
	}
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
-var n, o = 0, c;
-function t() {
+var n, a = 0, b;
+function f() {
 	try {
 		throw 0;
-	} catch (c) {
-		(function n() {
-			(function c() {
-				o++;
+	} catch {
+		(function() {
+			(function() {
+				a++;
 			})();
 		})();
 	}
 }
-t();
-console.log(o);
+f();
+console.log(a);

```

## `uglify/issue-1569/inner_reference`

- size: oxc 40 vs reference 47 (-7 bytes, no whitespaces)

```js
!function f(a) {
	return a && f(a - 1) + a;
}(42);
!function g(a) {
	return a;
}(42);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-!function f(a) {
+(function f(a) {
 	return a && f(a - 1) + a;
-}(42);
-!void 0;
+})(42);

```

## `uglify/issue-1673/side_effects_else`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 66 (-7 bytes, no whitespaces)

```js
function f(x) {
	function g() {
		if (x);
		else console.log('PASS');
	}
	g();
}
f(0);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(x) {
-	(function() {
-		if (x);
-		else console.log('PASS');
-	})();
+	function g() {
+		x || console.log('PASS');
+	}
+	g();
 }
 f(0);

```

## `uglify/issue-1733/function_iife_catch`

- size: oxc 73 vs reference 80 (-7 bytes, no whitespaces)

```js
function f(n) {
	!function() {
		try {
			throw 0;
		} catch (n) {
			var a = 1;
			console.log(n, a);
		}
	}();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
-function f(o) {
-	!function() {
+function f(n) {
+	(function() {
 		try {
 			throw 0;
-		} catch (o) {
-			var c = 1;
-			console.log(o, c);
+		} catch (n) {
+			console.log(n, 1);
 		}
-	}();
+	})();
 }
 f();

```

## `uglify/issue-1733/function_iife_catch_ie8`

- size: oxc 73 vs reference 80 (-7 bytes, no whitespaces)

```js
function f(n) {
	!function() {
		try {
			throw 0;
		} catch (n) {
			var a = 1;
			console.log(n, a);
		}
	}();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
-function f(c) {
-	!function() {
+function f(n) {
+	(function() {
 		try {
 			throw 0;
-		} catch (c) {
-			var o = 1;
-			console.log(c, o);
+		} catch (n) {
+			console.log(n, 1);
 		}
-	}();
+	})();
 }
 f();

```

## `uglify/let/issue_4218`

- tags: `join vars`, `remove unused`
- size: oxc 56 vs reference 63 (-7 bytes, no whitespaces)

```js
'use strict';
var a;
{
	let a = function() {};
	var b = 0 * a;
}
console.log(typeof a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 'use strict';
-var b = 0 * function() {};
-console.log(typeof void 0, b);
+var a;
+console.log(typeof a, 0 * function() {});

```

## `uglify/let/issue_5756_1`

- tags: `join vars`
- size: oxc 88 vs reference 95 (-7 bytes, no whitespaces)

```js
'use strict';
do {
	function f() {
		return b;
	}
	var a = 'PASS'.toString();
	let b;
	console.log(a);
} while (!console);

```

```diff
--- reference
+++ oxc
@@ -3,6 +3,7 @@
 	function f() {
 		return b;
 	}
-	let a = 'PASS'.toString(), b;
+	var a = 'PASS';
+	let b;
 	console.log(a);
 } while (!console);

```

## `uglify/merge_vars/issue_4257`

- tags: `join vars`
- size: oxc 103 vs reference 110 (-7 bytes, no whitespaces)

```js
var a = 0;
for (var i = 0; i < 2; i++) switch (--a) {
	case 0:
		var b = 0;
		break;
	case 0:
	default:
		var c = 1 + (0 | (b && A));
		console.log(c);
}

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,6 @@
 	case 0:
 		var b = 0;
 		break;
-	case 0:
 	default:
 		var c = 1 + (0 | (b && A));
 		console.log(c);

```

## `uglify/numbers/evaluate_8_unsafe_math`

- size: oxc 24 vs reference 31 (-7 bytes, no whitespaces)

```js
var a = ['42'];
console.log(a * (1 / 7));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = ['42'];
-console.log(+a / 7);
+console.log(1 / 7 * ['42']);

```

## `uglify/optional-chains/issue_5292_dot`

- size: oxc 35 vs reference 42 (-7 bytes, no whitespaces)

```js
var o = { get p() {
	console.log('PASS');
} };
o?.p;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var o = { get p() {
+({ get p() {
 	console.log('PASS');
-} };
-o?.p;
+} }).p;

```

## `uglify/optional-chains/issue_5292_dot_pure_getters_strict`

- size: oxc 35 vs reference 42 (-7 bytes, no whitespaces)

```js
var o = { get p() {
	console.log('PASS');
} };
o?.p;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var o = { get p() {
+({ get p() {
 	console.log('PASS');
-} };
-o?.p;
+} }).p;

```

## `uglify/properties/issue_5093`

- size: oxc 42 vs reference 49 (-7 bytes, no whitespaces)

```js
console.log({
	a: true,
	'42': 'PASS',
	'null': []
}[6 * 7]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log({
-	a: true,
-	'42': 'PASS',
-	'null': []
-}[6 * 7]);
+	a: !0,
+	42: 'PASS',
+	null: []
+}[42]);

```

## `uglify/properties/issue_5093_quote_style`

- size: oxc 42 vs reference 49 (-7 bytes, no whitespaces)

```js
console.log({
	a: true,
	'42': 'PASS',
	'null': []
}[6 * 7]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log({
-	a: true,
-	'42': 'PASS',
-	'null': []
-}[6 * 7]);
+	a: !0,
+	42: 'PASS',
+	null: []
+}[42]);

```

## `uglify/properties/issue_5682_sub_2`

- size: oxc 56 vs reference 63 (-7 bytes, no whitespaces)

```js
function f(a) {
	return a['foo'];
}
var o = { foo: 'PASS' };
console.log(f(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-function f(o) {
-	return o['o'];
+function f(a) {
+	return a.foo;
 }
-var o = { o: 'PASS' };
-console.log(f(o));
+console.log(f({ foo: 'PASS' }));

```

## `uglify/pure_funcs/boolean_and`

- tags: `pure functions`
- size: oxc 44 vs reference 51 (-7 bytes, no whitespaces)

```js
foo() && foo();
foo() && bar();
foo() && 'bar';
bar() && foo();
bar() && bar();
bar() && 'bar';
'bar' && foo();
'bar' && bar();
'bar' && 'bar';

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 bar();
 bar() && bar();
 bar();
-'bar' && bar();
+bar();

```

## `uglify/reduce_vars/booleans`

- tags: `join vars`
- size: oxc 81 vs reference 88 (-7 bytes, no whitespaces)

```js
console.log(function(a) {
	if (a != 0);
	switch (a) {
		case 0: return 'FAIL';
		case false: return 'PASS';
	}
}(false));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 console.log(function(a) {
-	if (0);
-	switch (!1) {
+	switch (a) {
 		case 0: return 'FAIL';
 		case !1: return 'PASS';
 	}

```

## `uglify/reduce_vars/issue_1606`

- tags: `join vars`
- size: oxc 38 vs reference 45 (-7 bytes, no whitespaces)

```js
function f() {
	var a;
	function g() {}
	;
	var b = 2;
	x(b);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 function f() {
-	var a, b;
+	var a;
 	function g() {}
-	;
-	b = 2;
 	x(2);
 }

```

## `uglify/regexp/regexp_simple`

- size: oxc 0 vs reference 7 (-7 bytes, no whitespaces)

```js
/rx/gi;

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-/rx/gi;

```

## `uglify/rename/function_iife_catch`

- size: oxc 73 vs reference 80 (-7 bytes, no whitespaces)

```js
function f(n) {
	!function() {
		try {
			throw 0;
		} catch (n) {
			var a = 1;
			console.log(n, a);
		}
	}();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
-function f(o) {
-	!function() {
+function f(n) {
+	(function() {
 		try {
 			throw 0;
-		} catch (o) {
-			var c = 1;
-			console.log(o, c);
+		} catch (n) {
+			console.log(n, 1);
 		}
-	}();
+	})();
 }
 f();

```

## `uglify/rename/function_iife_catch_ie8`

- size: oxc 73 vs reference 80 (-7 bytes, no whitespaces)

```js
function f(n) {
	!function() {
		try {
			throw 0;
		} catch (n) {
			var a = 1;
			console.log(n, a);
		}
	}();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
-function f(c) {
-	!function() {
+function f(n) {
+	(function() {
 		try {
 			throw 0;
-		} catch (c) {
-			var o = 1;
-			console.log(c, o);
+		} catch (n) {
+			console.log(n, 1);
 		}
-	}();
+	})();
 }
 f();

```

## `uglify/sandbox/timers`

- tags: `join vars`, `remove unused`
- size: oxc 142 vs reference 149 (-7 bytes, no whitespaces)

```js
var count = 0, interval = 1e3, duration = 3210;
var timer = setInterval(function() {
	if (!count++) setTimeout(function() {
		clearInterval(timer);
		console.log(count <= 4 ? 'PASS' : 'FAIL');
	}, duration);
}, interval);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-var count = 0;
-var timer = setInterval(function() {
-	if (!count++) setTimeout(function() {
+var count = 0, timer = setInterval(function() {
+	count++ || setTimeout(function() {
 		clearInterval(timer);
 		console.log(count <= 4 ? 'PASS' : 'FAIL');
 	}, 3210);

```

## `uglify/yields/comment_newline`

- size: oxc 53 vs reference 60 (-7 bytes, no whitespaces)

```js
console.log(function* () {
	yield 'PASS';
}().next().value);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 console.log(function* () {
-	/* */
 	yield 'PASS';
 }().next().value);

```

## `uglify/annotations/inline_pure_call_4`

- tags: `join vars`, `remove unused`
- size: oxc 57 vs reference 65 (-8 bytes, no whitespaces)

```js
var a = function() {
	return console.log('PASS'), 42;
}();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a = function() {
+console.log(function() {
 	return console.log('PASS'), 42;
-}();
-console.log(a);
+}());

```

## `uglify/arguments/issue_3282_1_passes`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 107 vs reference 115 (-8 bytes, no whitespaces)

```js
(function(t) {
	return function() {
		t();
	};
})(function() {
	'use strict';
	function e() {
		return arguments[0];
	}
	e();
	e();
})();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-(function() {
+(function(t) {
 	return function() {
-		(function() {
-			'use strict';
-			function e(argument_0) {
-				return argument_0;
-			}
-			e();
-			e();
-		})();
+		t();
 	};
-})()();
+})(function() {
+	'use strict';
+	function e() {
+		return arguments[0];
+	}
+	e();
+	e();
+})();

```

## `uglify/arguments/issue_4200`

- size: oxc 46 vs reference 54 (-8 bytes, no whitespaces)

```js
var o = { get p() {
	return arguments[0];
} };
console.log(o.p);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var o = { get p() {
+console.log({ get p() {
 	return arguments[0];
-} };
-console.log(o.p);
+} }.p);

```

## `uglify/arguments/modified_strict`

- tags: `join vars`
- size: oxc 168 vs reference 176 (-8 bytes, no whitespaces)

```js
'use strict';
(function(a, b) {
	var c = arguments[0];
	var d = arguments[1];
	var a = 'foo';
	b++;
	arguments[0] = 'moo';
	arguments[1] *= 2;
	console.log(a, b, c, d, arguments[0], arguments[1]);
})('bar', 42);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,6 @@
 'use strict';
 (function(a, b) {
-	var c = arguments[0];
-	var d = arguments[1];
-	var a = 'foo';
+	var c = arguments[0], d = arguments[1], a = 'foo';
 	b++;
 	arguments[0] = 'moo';
 	arguments[1] *= 2;

```

## `uglify/arrows/collapse_value`

- tags: `join vars`, `remove unused`
- size: oxc 36 vs reference 44 (-8 bytes, no whitespaces)

```js
var a = 42;
console.log(((b) => Math.floor(b))(a));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = 42;
-console.log((() => Math.floor(a))());
+console.log(((b) => Math.floor(b))(42));

```

## `uglify/arrows/drop_arguments`

- tags: `join vars`
- size: oxc 64 vs reference 72 (-8 bytes, no whitespaces)

```js
console.log(function() {
	return () => arguments[0];
}('PASS')('FAIL'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function(argument_0) {
-	return () => argument_0;
+console.log(function() {
+	return () => arguments[0];
 }('PASS')('FAIL'));

```

## `uglify/arrows/no_funarg`

- size: oxc 16 vs reference 24 (-8 bytes, no whitespaces)

```js
(() => console.log(42))();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(() => console.log(42))();
+console.log(42);

```

## `uglify/arrows/reduce_iife_2`

- tags: `join vars`, `remove unused`
- size: oxc 16 vs reference 24 (-8 bytes, no whitespaces)

```js
var a = 21;
(() => console.log(a + a))();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(() => console.log(42))();
+console.log(42);

```

## `uglify/arrows/trim_body`

- size: oxc 48 vs reference 56 (-8 bytes, no whitespaces)

```js
var f = (a) => {
	return a;
};
var g = (b) => void b;
console.log(f('PASS'), g('FAIL'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-var f = (a) => a;
-var g = (b) => {};
-console.log(f('PASS'), g('FAIL'));
+console.log(((a) => a)('PASS'), ((b) => void 0)('FAIL'));

```

## `uglify/awaits/collapse_funarg_1`

- tags: `join vars`, `remove unused`
- size: oxc 72 vs reference 80 (-8 bytes, no whitespaces)

```js
A = 'FAIL';
var a = 'PASS';
(async function({}, b) {
	return b;
})(null, A = a);
console.log(A);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 A = 'FAIL';
-var a = 'PASS';
 (async function({}, b) {
 	return b;
-})(null, A = a);
+})(null, A = 'PASS');
 console.log(A);

```

## `uglify/collapse_vars/collapse_vars_arguments_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 50 vs reference 58 (-8 bytes, no whitespaces)

```js
var outer = function() {
	// Do not replace `arguments` but do replace the constant `k` before it.
	var k = 7, arguments = 5, inner = function() {
		console.log(arguments);
	};
	inner(k, 1);
};
outer();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 (function() {
 	(function() {
-		console.log(arguments);
+		console.log(5);
 	})(7, 1);
 })();

```

## `uglify/collapse_vars/issue_4920_3`

- tags: `join vars`
- size: oxc 70 vs reference 78 (-8 bytes, no whitespaces)

```js
var log = console.log;
var o = { get PASS() {
	a = 'FAIL';
} };
var a = 'PASS', b;
o[b = a];
log(b);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-var log = console.log;
-var o;
-var a = 'PASS', b;
-({ get PASS() {
+var log = console.log, o = { get PASS() {
 	a = 'FAIL';
-} })[b = a];
+} }, a = 'PASS', b;
+o[b = a];
 log(b);

```

## `uglify/collapse_vars/issue_4920_4`

- tags: `join vars`
- size: oxc 88 vs reference 96 (-8 bytes, no whitespaces)

```js
var log = console.log;
var o = { get [(a = 'FAIL 1', 'PASS')]() {
	a = 'FAIL 2';
} };
var a = 'PASS', b;
o[b = a];
log(b);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-var log = console.log;
-var o = { get [(a = 'FAIL 1', 'PASS')]() {
+var log = console.log, o = { get [(a = 'FAIL 1', 'PASS')]() {
 	a = 'FAIL 2';
-} };
-var a = 'PASS', b;
+} }, a = 'PASS', b;
 o[b = a];
 log(b);

```

## `uglify/collapse_vars/issue_4935`

- tags: `join vars`
- size: oxc 53 vs reference 61 (-8 bytes, no whitespaces)

```js
var a = 1;
var b;
var c = b = a;
console || c(a++);
--b;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
-var a = 1;
-var b;
-var c = b = a;
-console || a(a++);
+var a = 1, b, c = b = a;
+console || c(a++);
 --b;
 console.log(a, b);

```

## `uglify/collapse_vars/issue_5277`

- tags: `join vars`, `remove unused`
- size: oxc 20 vs reference 28 (-8 bytes, no whitespaces)

```js
console.log(function() {
	var a = function() {
		a += null;
		a -= 42;
	};
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(function() {}());
+console.log(void 0);

```

## `uglify/concat-strings/concat_7`

- size: oxc 50 vs reference 58 (-8 bytes, no whitespaces)

```js
console.log('' + 1, '' + '1', '' + 1 + 2, '' + 1 + '2', '' + '1' + 2, '' + '1' + '2', '' + (x += 'foo'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('' + 1, '1', '' + 1 + 2, 1 + '2', '1' + 2, '1' + '2', x += 'foo');
+console.log('1', '1', '12', '12', '12', '12', x += 'foo');

```

## `uglify/const/issue_4305_2`

- tags: `join vars`, `remove unused`
- size: oxc 62 vs reference 70 (-8 bytes, no whitespaces)

```js
(function(a) {
	const a = function() {
		while (console.log('aaaaa'));
	};
	a();
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 (function(a) {
-	const a = function() {
-		while (console.log('aaaaa'));
-	};
-	a();
+	(function() {
+		for (; console.log('aaaaa'););
+	})();
 })();

```

## `uglify/const/merge_vars_1`

- tags: `join vars`
- size: oxc 60 vs reference 68 (-8 bytes, no whitespaces)

```js
const a = console;
console.log(typeof a);
var b = typeof a;
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 const a = console;
 console.log(typeof a);
-var b = typeof a;
-console.log(b);
+console.log(typeof a);

```

## `uglify/destructured/funarg_collapse_vars_4`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 52 (-8 bytes, no whitespaces)

```js
var a = 'PASS';
(function(b, { log: c }) {
	c(b);
})(a, console);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a = 'PASS';
 (function(b, { log: c }) {
-	c(a);
-})(0, console);
+	c(b);
+})('PASS', console);

```

## `uglify/destructured/issue_4298`

- tags: `join vars`
- size: oxc 100 vs reference 108 (-8 bytes, no whitespaces)

```js
(function() {
	var a = { object: 'PASS' };
	function f({ [typeof a]: b }) {
		var a = b;
		return a;
	}
	var c = f(a);
	console.log(c);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 (function() {
 	var a = { object: 'PASS' };
 	function f({ [typeof a]: b }) {
-		var a = b;
-		return a;
+		return b;
 	}
 	var c = f(a);
 	console.log(c);

```

## `uglify/destructured/issue_5017`

- tags: `join vars`
- size: oxc 71 vs reference 79 (-8 bytes, no whitespaces)

```js
var a = function() {};
var b = c = a;
var c = [c] = [c];
console.log(c[0] === a ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-var a = function() {};
-var b = a;
-var c = [c] = [c = a];
+var a = function() {}, b = c = a, c = [c] = [c];
 console.log(c[0] === a ? 'PASS' : 'FAIL');

```

## `uglify/drop-unused/cascade_drop_assign`

- tags: `join vars`, `remove unused`
- size: oxc 20 vs reference 28 (-8 bytes, no whitespaces)

```js
var a, b = a = 'PASS';
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var b = 'PASS';
-console.log(b);
+console.log('PASS');

```

## `uglify/drop-unused/issue_1709`

- tags: `remove unused`
- size: oxc 73 vs reference 81 (-8 bytes, no whitespaces)

```js
console.log(function x() {
	var x = 1;
	return x;
}(), function z() {
	function z() {}
	return z;
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 console.log(function() {
-	var x = 1;
-	return x;
+	return 1;
 }(), function() {
 	function z() {}
 	return z;

```

## `uglify/drop-unused/single_use_catch_redefined`

- tags: `join vars`, `remove unused`
- size: oxc 61 vs reference 69 (-8 bytes, no whitespaces)

```js
var a = 1;
try {
	throw 2;
} catch (a) {
	function g() {
		return a;
	}
}
console.log(g());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a = 1;
 try {
 	throw 2;
 } catch (a) {

```

## `uglify/evaluate/chained_side_effects`

- size: oxc 39 vs reference 47 (-8 bytes, no whitespaces)

```js
console.log('foo') || (console.log('bar'), 'baz') || console.log('moo');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('foo') || (console.log('bar'), 'baz');
+console.log('foo') || console.log('bar');

```

## `uglify/exports/issue_5444`

- tags: `remove unused`
- size: oxc 21 vs reference 29 (-8 bytes, no whitespaces)

```js
export var a = (console, console);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-console;
 export var a = console;

```

## `uglify/functions/inline_0`

- size: oxc 97 vs reference 105 (-8 bytes, no whitespaces)

```js
(function() {
	console.log(1);
})();
(function(a) {
	console.log(a);
})(2);
(function(b) {
	var c = b;
	console.log(c);
})(3);

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,5 @@
 	console.log(a);
 })(2);
 (function(b) {
-	var c = b;
-	console.log(c);
+	console.log(b);
 })(3);

```

## `uglify/functions/inline_false`

- size: oxc 97 vs reference 105 (-8 bytes, no whitespaces)

```js
(function() {
	console.log(1);
})();
(function(a) {
	console.log(a);
})(2);
(function(b) {
	var c = b;
	console.log(c);
})(3);

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,5 @@
 	console.log(a);
 })(2);
 (function(b) {
-	var c = b;
-	console.log(c);
+	console.log(b);
 })(3);

```

## `uglify/functions/issue_3512`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 76 vs reference 84 (-8 bytes, no whitespaces)

```js
var a = 'PASS';
(function(b) {
	(function() {
		b <<= this || 1;
		b.a = 'FAIL';
	})();
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-var a = 'PASS';
 (function(b) {
 	(function() {
-		(b <<= this || 1).a = 'FAIL';
+		b <<= this || 1, b.a = 'FAIL';
 	})();
-})(), console.log(a);
+})(), console.log('PASS');

```

## `uglify/functions/new_target_collapse_vars`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 84 (-8 bytes, no whitespaces)

```js
new function(a) {
	if (a) console.log('PASS');
	else new new.target(new.target.length);
}(0);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 new function(a) {
-	if (a) console.log('PASS');
-	else new new.target(new.target.length);
+	a ? console.log('PASS') : new new.target(new.target.length);
 }(0);

```

## `uglify/functions/new_target_reduce_vars`

- tags: `join vars`
- size: oxc 76 vs reference 84 (-8 bytes, no whitespaces)

```js
new function(a) {
	if (a) console.log('PASS');
	else new new.target(new.target.length);
}(0);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 new function(a) {
-	if (a) console.log('PASS');
-	else new new.target(new.target.length);
+	a ? console.log('PASS') : new new.target(new.target.length);
 }(0);

```

## `uglify/global_defs/must_replace`

- size: oxc 15 vs reference 23 (-8 bytes, no whitespaces)

```js
console.log(D);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('foo bar');
+console.log(D);

```

## `uglify/ie/issue_3197_2`

- size: oxc 69 vs reference 77 (-8 bytes, no whitespaces)

```js
(function(a) {
	var f = function f() {
		console.log(this instanceof f);
	};
	new f(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-(function(n) {
-	var o = function n() {
-		console.log(this instanceof n);
-	};
-	new o(n);
+(function(a) {
+	new function f() {
+		console.log(this instanceof f);
+	}(a);
 })();

```

## `uglify/ie/issue_3197_2_ie8`

- size: oxc 69 vs reference 77 (-8 bytes, no whitespaces)

```js
(function(a) {
	var f = function f() {
		console.log(this instanceof f);
	};
	new f(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-(function(n) {
-	var o = function o() {
-		console.log(this instanceof o);
-	};
-	new o(n);
+(function(a) {
+	new function f() {
+		console.log(this instanceof f);
+	}(a);
 })();

```

## `uglify/imports/forbid_merge`

- tags: `join vars`
- size: oxc 68 vs reference 76 (-8 bytes, no whitespaces)

```js
import A from 'foo';
export default class extends A {}
var f = () => () => {};
f();
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
 import A from 'foo';
 export default class extends A {}
 var f = () => () => {};
-f();
-f();

```

## `uglify/imports/pr_5550_1`

- size: oxc 66 vs reference 74 (-8 bytes, no whitespaces)

```js
if (console) import('foo');
else import.meta.url.replace(/bar/g, console.log);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-if (console) import('foo');
-else import.meta.url.replace(/bar/g, console.log);
+console ? import('foo') : import.meta.url.replace(/bar/g, console.log);

```

## `uglify/issue-640/drop_value`

- size: oxc 12 vs reference 20 (-8 bytes, no whitespaces)

```js
1, [2, foo()], 3, {
	a: 1,
	b: bar()
};

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-foo(), {
-	a: 1,
-	b: bar()
-};
+foo(), bar();

```

## `uglify/let/issue_4210`

- tags: `join vars`
- size: oxc 125 vs reference 133 (-8 bytes, no whitespaces)

```js
'use strict';
var a;
(function() {
	try {
		throw 42;
	} catch (e) {
		let a = typeof e;
		console.log(a);
	} finally {
		return a = 'foo';
	}
})();
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -4,8 +4,7 @@
 	try {
 		throw 42;
 	} catch (e) {
-		let a = typeof e;
-		console.log(a);
+		console.log(typeof e);
 	} finally {
 		return a = 'foo';
 	}

```

## `uglify/let/issue_4689`

- tags: `sequences`
- size: oxc 50 vs reference 58 (-8 bytes, no whitespaces)

```js
'use strict';
var a = 'PASS';
console.log(a);
for (let a in 42);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 'use strict';
-var a = 'PASS';
-console.log(a);
+console.log('PASS');
 for (let a in 42);

```

## `uglify/let/loop_block_1`

- size: oxc 64 vs reference 72 (-8 bytes, no whitespaces)

```js
'use strict';
do {
	let o = console;
	console.log(typeof o.log);
} while (!console);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 'use strict';
-do {
-	let o = console;
-	console.log(typeof o.log);
-} while (!console);
+do
+	console.log(typeof console.log);
+while (!console);

```

## `uglify/let/merge_vars_1`

- tags: `join vars`
- size: oxc 71 vs reference 79 (-8 bytes, no whitespaces)

```js
'use strict';
let a = console;
console.log(typeof a);
var b = typeof a;
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 'use strict';
 let a = console;
 console.log(typeof a);
-var b = typeof a;
-console.log(b);
+console.log(typeof a);

```

## `uglify/let/retain_block_1`

- size: oxc 47 vs reference 55 (-8 bytes, no whitespaces)

```js
'use strict';
{
	let a = 'FAIL';
}
var a = 'PASS';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,4 @@
 {
 	let a = 'FAIL';
 }
-var a = 'PASS';
-console.log(a);
+console.log('PASS');

```

## `uglify/merge_vars/issue_4115`

- tags: `join vars`
- size: oxc 69 vs reference 77 (-8 bytes, no whitespaces)

```js
L: {
	var o = typeof console;
	for (var k in o) break L;
	var a = 0;
}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 L: {
-	var o = typeof console;
-	for (var k in o) break L;
+	for (var k in typeof console) break L;
 	var a = 0;
 }
 console.log(typeof a);

```

## `uglify/optional-chains/issue_5292_sub`

- size: oxc 56 vs reference 64 (-8 bytes, no whitespaces)

```js
var o = { get p() {
	console.log('foo');
} };
o?.[console.log('bar'), 'p'];

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var o = { get p() {
+({ get p() {
 	console.log('foo');
-} };
-o?.[console.log('bar'), 'p'];
+} })[console.log('bar'), 'p'];

```

## `uglify/optional-chains/issue_5292_sub_pure_getters_strict`

- size: oxc 56 vs reference 64 (-8 bytes, no whitespaces)

```js
var o = { get p() {
	console.log('foo');
} };
o?.[console.log('bar'), 'p'];

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var o = { get p() {
+({ get p() {
 	console.log('foo');
-} };
-o?.[console.log('bar'), 'p'];
+} })[console.log('bar'), 'p'];

```

## `uglify/properties/issue_4831_1`

- size: oxc 50 vs reference 58 (-8 bytes, no whitespaces)

```js
console.log({ f() {
	return arguments;
} }.f('PASS')[0]);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log([function() {
+console.log({ f() {
 	return arguments;
-}][0]('PASS')[0]);
+} }.f('PASS')[0]);

```

## `uglify/properties/issue_5682_dot_2_computed`

- size: oxc 56 vs reference 64 (-8 bytes, no whitespaces)

```js
function f(a) {
	return a.foo;
}
var o = { ['foo']: 'PASS' };
console.log(f(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-function f(o) {
-	return o.o;
+function f(a) {
+	return a.foo;
 }
-var o = { ['o']: 'PASS' };
-console.log(f(o));
+console.log(f({ foo: 'PASS' }));

```

## `uglify/properties/mangle_debug`

- size: oxc 26 vs reference 34 (-8 bytes, no whitespaces)

```js
a.foo = 'bar';
x = { baz: 'ban' };

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-a._$foo$_ = 'bar';
-x = { _$baz$_: 'ban' };
+a.foo = 'bar';
+x = { baz: 'ban' };

```

## `uglify/properties/mangle_debug_true`

- size: oxc 26 vs reference 34 (-8 bytes, no whitespaces)

```js
a.foo = 'bar';
x = { baz: 'ban' };

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-a._$foo$_ = 'bar';
-x = { _$baz$_: 'ban' };
+a.foo = 'bar';
+x = { baz: 'ban' };

```

## `uglify/pure_getters/side_effects_assign`

- tags: `join vars`, `sequences`, `pure getters`
- size: oxc 25 vs reference 33 (-8 bytes, no whitespaces)

```js
var a = typeof void (a && a.in == 1, 0);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = 'undefined';
-console.log(a);
+console.log('undefined');

```

## `uglify/reduce_vars/iife_arguments_2`

- tags: `join vars`, `remove unused`
- size: oxc 69 vs reference 77 (-8 bytes, no whitespaces)

```js
(function() {
	var x = function f() {
		return f;
	};
	console.log(x() === arguments[0]);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 (function() {
-	var x = function f() {
+	console.log(function f() {
 		return f;
-	};
-	console.log(x() === arguments[0]);
+	}() === arguments[0]);
 })();

```

## `uglify/reduce_vars/issue_2449`

- tags: `join vars`, `remove unused`, `10 iterations`
- size: oxc 102 vs reference 110 (-8 bytes, no whitespaces)

```js
var a = 'PASS';
function f() {
	return a;
}
function g() {
	return f();
}
(function() {
	var a = 'FAIL';
	if (a == a) console.log(g());
})();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
-var a = 'PASS';
+function f() {
+	return 'PASS';
+}
 function g() {
-	return function() {
-		return a;
-	}();
+	return f();
 }
 (function() {
 	var a = 'FAIL';
-	if (a == a) console.log(g());
+	a == a && console.log(g());
 })();

```

## `uglify/reduce_vars/issue_5048`

- tags: `join vars`, `remove unused`
- size: oxc 20 vs reference 28 (-8 bytes, no whitespaces)

```js
console.log(function() {
	var a = function() {
		return a + 42;
	};
}());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(function() {}());
+console.log(void 0);

```

## `uglify/reduce_vars/perf_4`

- tags: `join vars`, `remove unused`
- size: oxc 170 vs reference 178 (-8 bytes, no whitespaces)

```js
var foo = function(x, y, z) {
	return x < y ? x * y + z : x * z - y;
};
var indirect_foo = function(x, y, z) {
	return foo(x, y, z);
};
var sum = 0;
for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
console.log(sum);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
 var foo = function(x, y, z) {
 	return x < y ? x * y + z : x * z - y;
-};
-var indirect_foo = function(x, y, z) {
+}, indirect_foo = function(x, y, z) {
 	return foo(x, y, z);
-};
-var sum = 0;
+}, sum = 0;
 for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `uglify/reduce_vars/toplevel_off`

- tags: `join vars`, `remove unused`
- size: oxc 15 vs reference 23 (-8 bytes, no whitespaces)

```js
var x = 3;
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var x = 3;
-console.log(x);
+console.log(3);

```

## `uglify/side_effects/issue_3983_1`

- tags: `join vars`, `remove unused`
- size: oxc 20 vs reference 28 (-8 bytes, no whitespaces)

```js
var a = 'PASS';
function f() {
	g && g();
}
f();
function g() {
	0 ? a : 0;
}
var b = a;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = 'PASS';
-console.log(a);
+console.log('PASS');

```

## `uglify/spreads/issue_4331`

- tags: `join vars`
- size: oxc 56 vs reference 64 (-8 bytes, no whitespaces)

```js
var a = 'PASS', b;
console, b = a;
(function() {
	a++;
})(...a);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-var a = 'PASS', b;
-console;
+var a = 'PASS', b = a;
 (function() {
 	a++;
-})(...b = a);
+})(...a);
 console.log(b);

```

## `uglify/spreads/keep_getter_4`

- tags: `join vars`
- size: oxc 38 vs reference 46 (-8 bytes, no whitespaces)

```js
var o = { get p() {
	console.log('PASS');
} };
({
	q: o,
	...o
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var o = { get p() {
+({ ...{ get p() {
 	console.log('PASS');
-} };
-({ ...o });
+} } });

```

## `uglify/templates/ascii_only_ecma`

- size: oxc 49 vs reference 57 (-8 bytes, no whitespaces)

```js
console.log(`\ud801\udc37\ud801𐐷${42}\u{10437}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`\ud801\udc37\ud801\u{10437}${42}\u{10437}`);
+console.log(`\ud801\udc37\ud801𐐷42\u{10437}`);

```

## `uglify/typeof/reassign_for`

- tags: `join vars`, `2 iterations`
- size: oxc 94 vs reference 102 (-8 bytes, no whitespaces)

```js
if (A = console, 'undefined' != typeof A) for (var a = A, i = 0; i < 2; i++) console.log(void 0 === A, void 0 === a), A = void 0;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if (A = console, 'undefined' != typeof A) for (var a = A, i = 0; i < 2; i++) console.log(void 0 === A, (a, false)), A = void 0;
+if (A = console, typeof A < 'u') for (var a = A, i = 0; i < 2; i++) console.log(A === void 0, a === void 0), A = void 0;

```

## `uglify/typeof/reassign_for_in`

- tags: `join vars`, `2 iterations`
- size: oxc 109 vs reference 117 (-8 bytes, no whitespaces)

```js
(A = console) && 'undefined' != typeof A && function(a) {
	for (var k in [a = A, 42]) {
		console.log(void 0 === A, void 0 === a);
		A = void 0;
	}
}();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-(A = console) && 'undefined' != typeof A && function(a) {
+(A = console) && typeof A < 'u' && function(a) {
 	for (var k in [a = A, 42]) {
-		console.log(void 0 === A, (a, false));
+		console.log(A === void 0, a === void 0);
 		A = void 0;
 	}
 }();

```

## `uglify/typeof/reassign_property`

- tags: `2 iterations`
- size: oxc 104 vs reference 112 (-8 bytes, no whitespaces)

```js
A = console;
if ('undefined' == typeof A) console.log('FAIL 1');
else {
	A.p = void 0;
	console.log(void 0 === A ? 'FAIL 2' : 'PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 A = console;
-if ('undefined' == typeof A) console.log('FAIL 1');
+if (typeof A > 'u') console.log('FAIL 1');
 else {
 	A.p = void 0;
-	console.log((A, false) ? 'FAIL 2' : 'PASS');
+	console.log(A === void 0 ? 'FAIL 2' : 'PASS');
 }

```

## `uglify/unicode/unicode_escaped_identifier_1`

- size: oxc 20 vs reference 28 (-8 bytes, no whitespaces)

```js
var a = '𐀀';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = '𐀀';
-console.log(a);
+console.log('𐀀');

```

## `uglify/unicode/unicode_string_literals`

- size: oxc 48 vs reference 56 (-8 bytes, no whitespaces)

```js
var a = '6 length unicode character: 􁄑';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = '6 length unicode character: 􁄑';
-console.log(a);
+console.log('6 length unicode character: 􁄑');

```

## `uglify/varify/hoist_props_const`

- tags: `join vars`, `2 iterations`
- size: oxc 26 vs reference 34 (-8 bytes, no whitespaces)

```js
{
	const o = { p: 'PASS' };
	console.log(o.p);
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var o, o_p = 'PASS';
-console.log(o_p);
+console.log({ p: 'PASS' }.p);

```

## `uglify/varify/hoist_props_let`

- tags: `join vars`, `2 iterations`
- size: oxc 39 vs reference 47 (-8 bytes, no whitespaces)

```js
'use strict';
{
	let o = { p: 'PASS' };
	console.log(o.p);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 'use strict';
-var o, o_p = 'PASS';
-console.log(o_p);
+console.log({ p: 'PASS' }.p);

```

## `uglify/varify/issue_4954`

- tags: `join vars`, `remove unused`
- size: oxc 103 vs reference 111 (-8 bytes, no whitespaces)

```js
'use strict';
(function() {
	{
		let a = console;
		console.log(typeof a);
	}
	{
		let a = function() {};
		a && console.log(typeof a);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 'use strict';
 (function() {
-	var a = console;
-	console.log(typeof a);
+	console.log(typeof console);
 	{
 		let a = function() {};
 		a && console.log(typeof a);

```

## `uglify/varify/reduce_block_const`

- tags: `join vars`
- size: oxc 28 vs reference 36 (-8 bytes, no whitespaces)

```js
{
	const a = typeof console;
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = typeof console;
-console.log(a);
+console.log(typeof console);

```

## `uglify/varify/reduce_block_let`

- tags: `join vars`
- size: oxc 41 vs reference 49 (-8 bytes, no whitespaces)

```js
'use strict';
{
	let a = typeof console;
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 'use strict';
-var a = typeof console;
-console.log(a);
+console.log(typeof console);

```

## `uglify/yields/lift_sequence`

- tags: `sequences`
- size: oxc 53 vs reference 61 (-8 bytes, no whitespaces)

```js
console.log(function* () {
	yield (console, 'PASS');
}().next().value);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log(function* () {
-	console, yield 'PASS';
+	yield 'PASS';
 }().next().value);

```

## `uglify/arrows/binary_arrow`

- size: oxc 15 vs reference 24 (-9 bytes, no whitespaces)

```js
console.log(4 || (() => 2));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(4 || (() => 2));
+console.log(4);

```

## `uglify/arrows/for_parentheses_condition`

- size: oxc 28 vs reference 37 (-9 bytes, no whitespaces)

```js
for (console.log(42); (a) => a in a;) break;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-for (console.log(42); (a) => a in a;) break;
+for (console.log(42);;) break;

```

## `uglify/arrows/for_parentheses_step`

- size: oxc 23 vs reference 32 (-9 bytes, no whitespaces)

```js
for (; console.log(42); (a) => a in a);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-for (; console.log(42); (a) => a in a);
+for (; console.log(42););

```

## `uglify/assignments/issue_4876`

- tags: `join vars`
- size: oxc 52 vs reference 61 (-9 bytes, no whitespaces)

```js
try {
	var a = null;
	var b = a &&= 42;
	b.p;
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 try {
 	var a = null;
-	var b = a &&= 42;
-	b.p;
-} catch (e) {
+	(a &&= 42).p;
+} catch {
 	console.log('PASS');
 }

```

## `uglify/awaits/issue_4347_2`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 68 (-9 bytes, no whitespaces)

```js
var a = 'PASS';
(async function() {
	throw 42;
	a = 'FAIL';
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 var a = 'PASS';
 (async function() {
 	throw 42;
-	a = 'FAIL';
 })();
 console.log(a);

```

## `uglify/collapse_vars/cascade_return`

- tags: `join vars`
- size: oxc 27 vs reference 36 (-9 bytes, no whitespaces)

```js
function f(a) {
	return a = x();
	return a;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function f(a) {
 	return a = x();
-	return a;
 }

```

## `uglify/collapse_vars/collapse_rhs_boolean_2`

- tags: `join vars`
- size: oxc 100 vs reference 109 (-9 bytes, no whitespaces)

```js
var a;
(function f1() {
	a = function() {};
	if (/foo/) console.log(typeof a);
})();
console.log(function f2() {
	a = [];
	return !1;
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 var a;
-(function f1() {
-	if (a = function() {}) console.log(typeof a);
+(function() {
+	a = function() {};
+	console.log(typeof a);
 })();
-console.log(function f2() {
-	return !(a = []);
+console.log(function() {
+	a = [];
+	return !1;
 }());

```

## `uglify/collapse_vars/issue_2914_2`

- tags: `join vars`
- size: oxc 131 vs reference 140 (-9 bytes, no whitespaces)

```js
function read(input) {
	var i = 0;
	var e = 0;
	var t = 0;
	while (e < 32) {
		var n = input[i++];
		t = (127 & n) << e;
		if (0 === (128 & n)) return t;
		e += 7;
	}
}
console.log(read([129]));

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 function read(input) {
-	var i = 0;
-	var e = 0;
-	var t = 0;
-	while (e < 32) {
+	var i = 0, e = 0, t = 0;
+	for (; e < 32;) {
 		var n = input[i++];
-		if (0 === (128 & n)) return t = (127 & n) << e;
+		t = (127 & n) << e;
+		if (!(128 & n)) return t;
 		e += 7;
 	}
 }

```

## `uglify/collapse_vars/issue_315`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 182 vs reference 191 (-9 bytes, no whitespaces)

```js
console.log(function(s) {
	var w, _i, _len, _ref, _results;
	_ref = s.trim().split(' ');
	_results = [];
	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		w = _ref[_i];
		_results.push(w.toLowerCase());
	}
	return _results;
}('test'));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-console.log(function() {
-	var w, _i, _len, _ref, _results;
-	for (_results = [], _i = 0, _len = (_ref = 'test'.trim().split(' ')).length; _i < _len; _i++) w = _ref[_i], _results.push(w.toLowerCase());
+console.log(function(s) {
+	var w, _i, _len, _ref = s.trim().split(' '), _results = [];
+	for (_i = 0, _len = _ref.length; _i < _len; _i++) w = _ref[_i], _results.push(w.toLowerCase());
 	return _results;
-}());
+}('test'));

```

## `uglify/collapse_vars/issue_3971`

- tags: `join vars`
- size: oxc 47 vs reference 56 (-9 bytes, no whitespaces)

```js
var a = 0 == typeof f, b = 0;
{
	var a = void (a++ + (b |= a));
}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-var a = 0 == typeof f, b = 0;
-var a = void (b |= ++a);
+var a = !1, b = 0, a = void (a++ + (b |= a));
 console.log(b);

```

## `uglify/collapse_vars/issue_4874`

- tags: `join vars`, `remove unused`
- size: oxc 61 vs reference 70 (-9 bytes, no whitespaces)

```js
var a;
a = null;
(function(b) {
	for (var c in b = b && b[console.log('PASS')]) console;
})(a = 42);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-null;
 (function(b) {
-	for (var c in 42, 42[console.log('PASS')]) console;
-})();
+	for (var c in b &&= b[console.log('PASS')]);
+})(42);

```

## `uglify/collapse_vars/issue_4910`

- tags: `join vars`
- size: oxc 46 vs reference 55 (-9 bytes, no whitespaces)

```js
var a = 'foo', b;
var c = b = a;
1 && c[a = 'bar'];
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 var a = 'foo', b;
-var c = b = a;
-1 && b[a = 'bar'];
+(b = a)[a = 'bar'];
 console.log(a, b);

```

## `uglify/collapse_vars/toplevel_single_reference`

- tags: `join vars`, `remove unused`
- size: oxc 20 vs reference 29 (-9 bytes, no whitespaces)

```js
var a;
for (var b in x) {
	var a = b;
	b(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-for (var b in x) {
-	var a = b;
-	b(b);
-}
+for (var b in x) b(b);

```

## `uglify/collapse_vars/unsafe_builtin_1`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 69 (-9 bytes, no whitespaces)

```js
function f(a) {
	var b = Math.abs(a);
	return Math.pow(b, 2);
}
console.log(f(-1), f(2));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a) {
-	return Math.pow(Math.abs(a), 2);
+	return Math.abs(a) ** 2;
 }
 console.log(f(-1), f(2));

```

## `uglify/concat-strings/concat_8`

- size: oxc 49 vs reference 58 (-9 bytes, no whitespaces)

```js
console.log(1 + '', '1' + '', 1 + 2 + '', 1 + '2' + '', '1' + 2 + '', '1' + '2' + '', (x += 'foo') + '');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(1 + '', '1', 1 + 2 + '', 1 + '2', '1' + 2, '1' + '2', x += 'foo');
+console.log('1', '1', '3', '12', '12', '12', x += 'foo');

```

## `uglify/const/issue_5930_2`

- tags: `join vars`, `remove unused`
- size: oxc 63 vs reference 72 (-9 bytes, no whitespaces)

```js
'use strict';
(function() {
	f = function g(a) {
		a.p;
	}();
	f && f();
	{
		const a = 42;
		var b = false;
		var f;
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 'use strict';
 (function() {
-	var a;
-	(f = void a.p) && f();
-	{
-		const a = 42;
-		var f;
-	}
+	f = function(a) {
+		a.p;
+	}();
+	f && f();
+	var f;
 })();

```

## `uglify/dead-code/throw_assignment`

- tags: `remove unused`
- size: oxc 673 vs reference 682 (-9 bytes, no whitespaces)

```js
function f1() {
	throw a = x();
}
function f2(a) {
	throw a = x();
}
function f3() {
	var a;
	throw a = x();
}
function f4() {
	try {
		throw a = x();
	} catch (b) {
		console.log(a);
	}
}
function f5(a) {
	try {
		throw a = x();
	} catch (b) {
		console.log(a);
	}
}
function f6() {
	var a;
	try {
		throw a = x();
	} catch (b) {
		console.log(a);
	}
}
function f7() {
	try {
		throw a = x();
	} finally {
		console.log(a);
	}
}
function f8(a) {
	try {
		throw a = x();
	} finally {
		console.log(a);
	}
}
function f9() {
	var a;
	try {
		throw a = x();
	} finally {
		console.log(a);
	}
}
function test(inc) {
	var counter = 0;
	x = function() {
		counter += inc;
		if (inc < 0) throw counter;
		return counter;
	};
	[
		f1,
		f2,
		f3,
		f4,
		f5,
		f6,
		f7,
		f8,
		f9
	].forEach(function(f, i) {
		a = null;
		try {
			f(10 * (1 + i));
		} catch (x) {
			console.log('caught ' + x);
		}
		if (null !== a) console.log('a: ' + a);
	});
}
var x, a;
test(1);
test(-1);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 	throw a = x();
 }
 function f2(a) {
-	throw x();
+	throw a = x();
 }
 function f3() {
 	throw x();
@@ -10,14 +10,14 @@
 function f4() {
 	try {
 		throw a = x();
-	} catch (b) {
+	} catch {
 		console.log(a);
 	}
 }
 function f5(a) {
 	try {
 		throw a = x();
-	} catch (b) {
+	} catch {
 		console.log(a);
 	}
 }
@@ -25,7 +25,7 @@
 	var a;
 	try {
 		throw a = x();
-	} catch (b) {
+	} catch {
 		console.log(a);
 	}
 }
@@ -75,7 +75,7 @@
 		} catch (x) {
 			console.log('caught ' + x);
 		}
-		if (null !== a) console.log('a: ' + a);
+		a !== null && console.log('a: ' + a);
 	});
 }
 var x, a;

```

## `uglify/destructured/funarg_side_effects_2`

- size: oxc 53 vs reference 62 (-9 bytes, no whitespaces)

```js
try {
	(function({ [(a, 0)]: a }) {})(1);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
-	(function({ [(a, 0)]: a }) {})(1);
-} catch (e) {
+	(function({ 0: a }) {})(1);
+} catch {
 	console.log('PASS');
 }

```

## `uglify/destructured/funarg_side_effects_3`

- size: oxc 61 vs reference 70 (-9 bytes, no whitespaces)

```js
try {
	(function({ p: { [(a, 0)]: a } }) {})({ p: 1 });
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 try {
-	(function({ p: { [(a, 0)]: a } }) {})({ p: 1 });
-} catch (e) {
+	(function({ p: { 0: a } }) {})({ p: 1 });
+} catch {
 	console.log('PASS');
 }

```

## `uglify/functions/issue_4725_1`

- size: oxc 62 vs reference 71 (-9 bytes, no whitespaces)

```js
var o = { f() {
	return function g() {
		return g;
	}();
} };
console.log(typeof o.f());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-var o = { f() {
+console.log(typeof { f() {
 	return function g() {
 		return g;
 	}();
-} };
-console.log(typeof o.f());
+} }.f());

```

## `uglify/functions/issue_5173_1`

- tags: `join vars`
- size: oxc 45 vs reference 54 (-9 bytes, no whitespaces)

```js
function f(a, b) {
	console.log(b);
}
f([A = 42, [] + '' || (A = f)]);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a, b) {
 	console.log(b);
 }
-f([A = 42, [] + '' || (A = f)]);
+f([A = 42, A = f]);

```

## `uglify/global_defs/issue_3217`

- tags: `join vars`, `remove unused`
- size: oxc 7 vs reference 16 (-9 bytes, no whitespaces)

```js
o.fn();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(42);
+o.fn();

```

## `uglify/hoist_props/issue_3411`

- tags: `join vars`
- size: oxc 60 vs reference 69 (-9 bytes, no whitespaces)

```js
var c = 1;
!function f() {
	var o = { p: --c && f() };
	+o || console.log('PASS');
}();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 var c = 1;
-!function f() {
-	var o, o_p = --c && f();
-	+{} || console.log('PASS');
-}();
+(function f() {
+	+{ p: --c && f() }, console.log('PASS');
+})();

```

## `uglify/issue-1446/undefined_redefined_mangle`

- size: oxc 31 vs reference 40 (-9 bytes, no whitespaces)

```js
function f(undefined) {
	var n = 1;
	return typeof n == 'undefined';
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-function f(n) {
-	var r = 1;
-	return void 0 === r;
+function f(undefined) {
+	return !1;
 }

```

## `uglify/issue-1609/chained_evaluation_3`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 85 (-9 bytes, no whitespaces)

```js
(function() {
	var a = 'long piece of string';
	(function() {
		var b = a, c;
		c = f(b);
		c.bar = b;
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 (function() {
 	(function() {
-		f('long piece of string').bar = 'long piece of string';
+		var b = 'long piece of string', c = f(b);
+		c.bar = b;
 	})();
 })();

```

## `uglify/join_vars/assign_for_var`

- tags: `join vars`
- size: oxc 76 vs reference 85 (-9 bytes, no whitespaces)

```js
i = 'foo', a = new Array(i, 'bar');
for (var i = 2; --i >= 0;) {
	console.log(a[i]);
	for (var a in i);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-for (var i = 'foo', a = new Array(i, 'bar'), i = 2; --i >= 0;) {
+i = 'foo', a = [i, 'bar'];
+for (var i = 2; --i >= 0;) {
 	console.log(a[i]);
 	for (var a in i);
 }

```

## `uglify/let/collapse_block`

- tags: `join vars`
- size: oxc 41 vs reference 50 (-9 bytes, no whitespaces)

```js
'use strict';
{
	let a = typeof console;
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
 'use strict';
-{
-	let a = typeof console;
-	console.log(a);
-}
+console.log(typeof console);

```

## `uglify/let/hoist_props`

- tags: `join vars`
- size: oxc 39 vs reference 48 (-9 bytes, no whitespaces)

```js
'use strict';
{
	let o = { p: 'PASS' };
	console.log(o.p);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
 'use strict';
-{
-	let o = { p: 'PASS' };
-	console.log(o.p);
-}
+console.log({ p: 'PASS' }.p);

```

## `uglify/let/if_dead_branch`

- size: oxc 56 vs reference 65 (-9 bytes, no whitespaces)

```js
'use strict';
console.log(function() {
	if (0) {
		let a = 0;
	}
	return typeof a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,4 @@
 'use strict';
 console.log(function() {
-	0;
-	{
-		let a;
-	}
 	return typeof a;
 }());

```

## `uglify/let/issue_4207`

- tags: `join vars`, `remove unused`
- size: oxc 46 vs reference 55 (-9 bytes, no whitespaces)

```js
'use strict';
{
	let a = function() {};
	console.log(a.length);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
 'use strict';
-{
-	let a = function() {};
-	console.log(a.length);
-}
+console.log(function() {}.length);

```

## `uglify/let/issue_4985`

- tags: `join vars`
- size: oxc 46 vs reference 55 (-9 bytes, no whitespaces)

```js
'use strict';
let a = { p: 42 };
console.log(function() {
	a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
 'use strict';
 let a = { p: 42 };
-console.log(function() {
-	a;
-}());
+console.log(void 0);

```

## `uglify/let/reduce_block_1`

- tags: `join vars`
- size: oxc 41 vs reference 50 (-9 bytes, no whitespaces)

```js
'use strict';
{
	let a = typeof console;
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
 'use strict';
-{
-	let a = typeof console;
-	console.log(a);
-}
+console.log(typeof console);

```

## `uglify/let/reduce_block_2`

- tags: `join vars`
- size: oxc 63 vs reference 72 (-9 bytes, no whitespaces)

```js
'use strict';
{
	let a = typeof console;
	console.log(a);
}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
 'use strict';
-{
-	let a = typeof console;
-	console.log(a);
-}
+console.log(typeof console);
 console.log(typeof a);

```

## `uglify/let/reduce_block_2_toplevel`

- tags: `join vars`
- size: oxc 63 vs reference 72 (-9 bytes, no whitespaces)

```js
'use strict';
{
	let a = typeof console;
	console.log(a);
}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
 'use strict';
-{
-	let a = typeof console;
-	console.log(a);
-}
+console.log(typeof console);
 console.log(typeof a);

```

## `uglify/let/retain_assignment`

- tags: `join vars`
- size: oxc 71 vs reference 80 (-9 bytes, no whitespaces)

```js
'use strict';
function f() {
	return a = 0;
	let a;
}
try {
	f();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 'use strict';
 function f() {
 	return a = 0;
-	let a;
 }
 try {
 	f();
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/optional-chains/ternary_decimal`

- size: oxc 20 vs reference 29 (-9 bytes, no whitespaces)

```js
null ? .42 : console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-null ? .42 : console.log('PASS');
+console.log('PASS');

```

## `uglify/properties/issue_5093_quote_keys`

- size: oxc 42 vs reference 51 (-9 bytes, no whitespaces)

```js
console.log({
	a: true,
	'42': 'PASS',
	'null': []
}[6 * 7]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log({
-	'a': true,
-	'42': 'PASS',
-	'null': []
-}[6 * 7]);
+	a: !0,
+	42: 'PASS',
+	null: []
+}[42]);

```

## `uglify/reduce_vars/iife_assign`

- tags: `join vars`, `remove unused`
- size: oxc 63 vs reference 72 (-9 bytes, no whitespaces)

```js
!function() {
	var a = 1, b = 0;
	!function() {
		b++;
		return;
		a = 2;
	}();
	console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
-!function() {
+(function() {
 	var a = 1, b = 0;
-	!function() {
+	(function() {
 		b++;
-		return;
-		a = 2;
-	}();
+	})();
 	console.log(a);
-}();
+})();

```

## `uglify/switches/drop_case_1`

- size: oxc 19 vs reference 28 (-9 bytes, no whitespaces)

```js
switch (foo) {
	case 'bar':
		baz();
		break;
	case 'moo': break;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-switch (foo) {
-	case 'bar': baz();
-}
+foo === 'bar' && baz();

```

## `uglify/switches/drop_default_1`

- size: oxc 19 vs reference 28 (-9 bytes, no whitespaces)

```js
switch (foo) {
	case 'bar': baz();
	default:
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-switch (foo) {
-	case 'bar': baz();
-}
+foo === 'bar' && baz();

```

## `uglify/switches/drop_default_2`

- size: oxc 19 vs reference 28 (-9 bytes, no whitespaces)

```js
switch (foo) {
	case 'bar':
		baz();
		break;
	default: break;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-switch (foo) {
-	case 'bar': baz();
-}
+foo === 'bar' && baz();

```

## `uglify/switches/issue_1690_2`

- size: oxc 20 vs reference 29 (-9 bytes, no whitespaces)

```js
switch (console.log('PASS')) {}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-switch (console.log('PASS')) {}
+console.log('PASS');

```

## `uglify/switches/issue_1698`

- size: oxc 43 vs reference 52 (-9 bytes, no whitespaces)

```js
var a = 1;
!function() {
	switch (a++) {}
}();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 1;
-!function() {
-	switch (a++) {}
-}();
+(function() {
+	a++;
+})();
 console.log(a);

```

## `uglify/templates/simple`

- size: oxc 27 vs reference 36 (-9 bytes, no whitespaces)

```js
console.log(`foo
bar\nbaz`);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-console.log(`foo
-        bar\nbaz`);
+console.log('foo\nbar\nbaz');

```

## `uglify/templates/tag_parentheses_binary`

- tags: `join vars`, `remove unused`
- size: oxc 36 vs reference 45 (-9 bytes, no whitespaces)

```js
var f = function() {
	console.log('PASS');
} || console;
f``;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function() {
 	console.log('PASS');
-} || console)``;
+})``;

```

## `uglify/typeof/reassign`

- tags: `2 iterations`
- size: oxc 110 vs reference 119 (-9 bytes, no whitespaces)

```js
A = console;
if ('undefined' == typeof A) console.log('FAIL 1');
else {
	A = void 0;
	while (console.log(void 0 === A ? 'PASS' : 'FAIL 2'));
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 A = console;
-if ('undefined' == typeof A) console.log('FAIL 1');
+if (typeof A > 'u') console.log('FAIL 1');
 else {
 	A = void 0;
-	while (console.log(void 0 === A ? 'PASS' : 'FAIL 2'));
+	for (; console.log(A === void 0 ? 'PASS' : 'FAIL 2'););
 }

```

## `uglify/typeof/reassign_call`

- tags: `2 iterations`
- size: oxc 127 vs reference 136 (-9 bytes, no whitespaces)

```js
A = console;
function f() {
	A = void 0;
}
if ('undefined' == typeof A) console.log('FAIL 1');
else {
	f();
	while (console.log(void 0 === A ? 'PASS' : 'FAIL 2'));
}

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,8 @@
 function f() {
 	A = void 0;
 }
-if ('undefined' == typeof A) console.log('FAIL 1');
+if (typeof A > 'u') console.log('FAIL 1');
 else {
 	f();
-	while (console.log(void 0 === A ? 'PASS' : 'FAIL 2'));
+	for (; console.log(A === void 0 ? 'PASS' : 'FAIL 2'););
 }

```

## `uglify/typeof/reassign_conditional`

- tags: `2 iterations`
- size: oxc 112 vs reference 121 (-9 bytes, no whitespaces)

```js
A = console;
if ('undefined' == typeof A) console.log('FAIL 1');
else {
	A &&= void 0;
	while (console.log(void 0 === A ? 'PASS' : 'FAIL 2'));
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 A = console;
-if ('undefined' == typeof A) console.log('FAIL 1');
+if (typeof A > 'u') console.log('FAIL 1');
 else {
 	A &&= void 0;
-	while (console.log(void 0 === A ? 'PASS' : 'FAIL 2'));
+	for (; console.log(A === void 0 ? 'PASS' : 'FAIL 2'););
 }

```

## `uglify/yields/empty_yield`

- size: oxc 193 vs reference 202 (-9 bytes, no whitespaces)

```js
var a = function* () {
	yield;
	console.log(yield);
	yield;
	'FAIL 1';
}();
console.log(a.next('FAIL 2').value);
console.log(a.next('FAIL 3').value);
console.log(a.next('PASS').value);
console.log(a.next('FAIL 4').done);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,6 @@
 	yield;
 	console.log(yield);
 	yield;
-	'FAIL 1';
 }();
 console.log(a.next('FAIL 2').value);
 console.log(a.next('FAIL 3').value);

```

## `uglify/arguments/issue_3420_2`

- tags: `join vars`
- size: oxc 36 vs reference 46 (-10 bytes, no whitespaces)

```js
var foo = function() {
	delete arguments[0];
};
foo();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var foo = function() {
+(function() {
 	delete arguments[0];
-};
-foo();
+})();

```

## `uglify/arguments/issue_3420_3`

- tags: `join vars`
- size: oxc 49 vs reference 59 (-10 bytes, no whitespaces)

```js
'use strict';
var foo = function() {
	delete arguments[0];
};
foo();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 'use strict';
-var foo = function() {
+(function() {
 	delete arguments[0];
-};
-foo();
+})();

```

## `uglify/arrows/negate`

- size: oxc 29 vs reference 39 (-10 bytes, no whitespaces)

```js
if (!console ? 0 : () => 1) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(console ? () => 1 : 0) && console.log('PASS');
+console && console.log('PASS');

```

## `uglify/arrows/object_value`

- size: oxc 22 vs reference 32 (-10 bytes, no whitespaces)

```js
console.log((() => ({ 4: 2 }))()[4]);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((() => ({ 4: 2 }))()[4]);
+console.log({ 4: 2 }[4]);

```

## `uglify/asm/asm_function_expression`

- size: oxc 72 vs reference 82 (-10 bytes, no whitespaces)

```js
0;
var a = function() {
	'use asm';
	0;
};
function f() {
	0;
	return function() {
		'use asm';
		0;
	};
	0;
}
0;

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,8 @@
-0;
 var a = function() {
 	'use asm';
-	0;
 };
 function f() {
-	0;
 	return function() {
 		'use asm';
-		0;
 	};
-	0;
 }
-0;

```

## `uglify/classes/issue_5389_2`

- tags: `join vars`
- size: oxc 92 vs reference 102 (-10 bytes, no whitespaces)

```js
function log(m, n) {
	console.log(m, n);
}
var a = log;
var A = class {
	[a = 'FAIL'] = a = 'PASS';
};
var b = new A();
log(a, b.FAIL);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
 function log(m, n) {
 	console.log(m, n);
 }
-var a = log;
-var A;
-var b = new class {
+var a = log, b = new class {
 	[a = 'FAIL'] = a = 'PASS';
 }();
 log(a, b.FAIL);

```

## `uglify/classes/static_init`

- size: oxc 102 vs reference 112 (-10 bytes, no whitespaces)

```js
var a = 'foo';
var b = null;
class A {
	static {
		var a = 'bar';
		b = true;
		var c = 42;
		console.log(a, b, c);
	}
}
console.log(a, b, typeof c);

```

```diff
--- reference
+++ oxc
@@ -3,9 +3,8 @@
 class A {
 	static {
 		var a = 'bar';
-		b = true;
-		var c = 42;
-		console.log(a, b, c);
+		b = !0;
+		console.log(a, b, 42);
 	}
 }
 console.log(a, b, typeof c);

```

## `uglify/collapse_vars/issue_2313_1`

- tags: `join vars`
- size: oxc 105 vs reference 115 (-10 bytes, no whitespaces)

```js
var a = 0, b = 0;
var foo = {
	get c() {
		a++;
		return 42;
	},
	set c(c) {
		b++;
	},
	d: function() {
		this.c++;
		if (this.c) console.log(a, b);
	}
};
foo.d();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 0, b = 0;
-var foo = {
+({
 	get c() {
 		a++;
 		return 42;
@@ -11,5 +11,4 @@
 		this.c++;
 		this.c && console.log(a, b);
 	}
-};
-foo.d();
+}).d();

```

## `uglify/collapse_vars/issue_2313_2`

- tags: `join vars`
- size: oxc 54 vs reference 64 (-10 bytes, no whitespaces)

```js
var c = 0;
!function a() {
	a && c++;
	var a = 0;
	a && c++;
}();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 var c = 0;
-!function a() {
+(function() {
 	a && c++;
-	var a;
-	(a = 0) && c++;
-}();
+	var a = 0;
+})();
 console.log(c);

```

## `uglify/collapse_vars/issue_2571_1`

- tags: `join vars`
- size: oxc 72 vs reference 82 (-10 bytes, no whitespaces)

```js
var b = 1;
try {
	var a = function f0(c) {
		throw c;
	}(2);
	var d = --b + a;
} catch (e) {}
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 var b = 1;
 try {
-	var a = function f0(c) {
+	var a = function(c) {
 		throw c;
-	}(2);
-	var d = --b + a;
-} catch (e) {}
+	}(2), d = --b + a;
+} catch {}
 console.log(b);

```

## `uglify/collapse_vars/issue_4047_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 76 vs reference 86 (-10 bytes, no whitespaces)

```js
var b = 1;
console.log(+function(a) {
	b = a;
	(a >>= 0) && console.log('PASS');
}(--b + (0 !== typeof A)));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 var b = 1;
-var a;
-console.log((a = --b + (0 !== typeof A), +void ((a >>= 0) && console.log('PASS'))));
+console.log(+function(a) {
+	b = a, (a >>= 0) && console.log('PASS');
+}(--b + !0));

```

## `uglify/collapse_vars/issue_4868`

- tags: `join vars`, `remove unused`
- size: oxc 52 vs reference 62 (-10 bytes, no whitespaces)

```js
var a;
(function(b) {
	console.log(b[0]);
})(a = ['PASS'], a = ['FAIL']);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a;
 (function(b) {
 	console.log(b[0]);
-})(a = ['PASS'], a = ['FAIL']);
+})(['PASS'], ['FAIL']);

```

## `uglify/collapse_vars/issue_5638_1`

- tags: `join vars`
- size: oxc 45 vs reference 55 (-10 bytes, no whitespaces)

```js
var a;
console;
a = [42];
console || FAIL(a);
console.log(a++);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-var a;
-console;
-a = [42];
+var a = [42];
 console || FAIL(a);
 console.log(a++);

```

## `uglify/collapse_vars/issue_5638_2`

- tags: `join vars`
- size: oxc 45 vs reference 55 (-10 bytes, no whitespaces)

```js
var a;
console;
a = [6];
console || FAIL(a);
console.log(a *= 7);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-var a;
-console;
-a = [6];
+var a = [6];
 console || FAIL(a);
 console.log(a *= 7);

```

## `uglify/collapse_vars/switch_case_2`

- tags: `join vars`
- size: oxc 56 vs reference 66 (-10 bytes, no whitespaces)

```js
var a = 1, b = 2;
switch (b++) {
	case b:
		var c = a;
		var a;
		break;
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,5 @@
 var a = 1, b = 2;
 switch (b++) {
-	case b:
-		var c = a;
-		var a;
-		break;
+	case b: var c = a, a;
 }
 console.log(a);

```

## `uglify/conditionals/cond_8c`

- size: oxc 276 vs reference 286 (-10 bytes, no whitespaces)

```js
var a;
// compress these
a = condition ? true : false;
a = !condition ? true : false;
a = condition() ? true : false;
a = condition ? !0 : !1;
a = !condition ? !null : !2;
a = condition() ? !0 : !-3.5;
if (condition) {
	a = true;
} else {
	a = false;
}
if (condition) {
	a = !0;
} else {
	a = !1;
}
a = condition ? false : true;
a = !condition ? false : true;
a = condition() ? false : true;
a = condition ? !3 : !0;
a = !condition ? !2 : !0;
a = condition() ? !1 : !0;
if (condition) {
	a = false;
} else {
	a = true;
}
if (condition) {
	a = !1;
} else {
	a = !0;
}
a = condition ? 1 : false;
a = !condition ? true : 0;
a = condition ? 1 : 0;

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
-var a;
-a = !!condition;
+var a = !!condition;
 a = !condition;
 a = !!condition();
 a = !!condition;
 a = !condition;
-a = !!condition() || !-3.5;
+a = !!condition();
 a = !!condition;
 a = !!condition;
 a = !condition;
@@ -15,6 +14,6 @@
 a = !condition();
 a = !condition;
 a = !condition;
-a = !!condition && 1;
+a = condition ? 1 : !1;
 a = !condition || 0;
-a = condition ? 1 : 0;
+a = +!!condition;

```

## `uglify/const/issue_4210`

- tags: `join vars`
- size: oxc 106 vs reference 116 (-10 bytes, no whitespaces)

```js
(function() {
	try {
		throw 42;
	} catch (e) {
		const a = typeof e;
		console.log(a);
	} finally {
		return a = 'foo';
	}
})();
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,7 @@
 	try {
 		throw 42;
 	} catch (e) {
-		const a = typeof e;
-		console.log(a);
+		console.log(typeof e);
 	} finally {
 		return a = 'foo';
 	}

```

## `uglify/const/issue_4220`

- tags: `join vars`, `sequences`
- size: oxc 68 vs reference 78 (-10 bytes, no whitespaces)

```js
if (console) {
	var o = console;
	for (var k in o);
} else {
	const a = 0;
}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-if (console) {
-	var o;
-	for (var k in console);
-} else {
-	const a = 0;
+if (console) for (var k in console);
+else {
+	let a = 0;
 }
 console.log(typeof a);

```

## `uglify/const/issue_4689`

- tags: `sequences`
- size: oxc 50 vs reference 60 (-10 bytes, no whitespaces)

```js
'use strict';
var a = 'PASS';
console.log(a);
for (const a in 42);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 'use strict';
-var a = 'PASS';
-console.log(a);
-for (const a in 42);
+console.log('PASS');
+for (let a in 42);

```

## `uglify/const/loop_block_1`

- size: oxc 51 vs reference 61 (-10 bytes, no whitespaces)

```js
do {
	const o = console;
	console.log(typeof o.log);
} while (!console);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-do {
-	const o = console;
-	console.log(typeof o.log);
-} while (!console);
+do
+	console.log(typeof console.log);
+while (!console);

```

## `uglify/const/retain_block`

- size: oxc 34 vs reference 44 (-10 bytes, no whitespaces)

```js
{
	const a = 'FAIL';
}
var a = 'PASS';
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 {
-	const a = 'FAIL';
+	let a = 'FAIL';
 }
-var a = 'PASS';
-console.log(a);
+console.log('PASS');

```

## `uglify/destructured/funarg_computed_key_scope_1`

- size: oxc 56 vs reference 66 (-10 bytes, no whitespaces)

```js
var b = 0;
function f({ [b]: a }) {
	var b = 42;
	console.log(a, b);
}
f(['PASS']);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 var b = 0;
-function f({ [b]: a }) {
-	var c = 42;
-	console.log(a, c);
+function f({ 0: a }) {
+	console.log(a, 42);
 }
 f(['PASS']);

```

## `uglify/destructured/issue_4508`

- tags: `remove unused`
- size: oxc 78 vs reference 88 (-10 bytes, no whitespaces)

```js
for (var i = 0; i < 2; i++) (function f([a]) {
	var a = console.log(a) && b, b = null;
})(['PASS']);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-for (var i = 0; i < 2; i++) [[a]] = [['PASS']], b = void 0, a = console.log(a) && b, b = null, void 0;
-var a, b;
+for (var i = 0; i < 2; i++) (function([a]) {
+	var a = console.log(a) && b, b = null;
+})(['PASS']);

```

## `uglify/evaluate/issue_5940`

- tags: `sequences`, `remove unused`
- size: oxc 58 vs reference 68 (-10 bytes, no whitespaces)

```js
(function f(a) {
	f && (console, 42) && f && (a = []) && console.log('PASS');
	f = 42;
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 (function f(a) {
-	f && (console, 42) && f && [] && console.log('PASS'), f = 42;
+	f && f && (a = []) && console.log('PASS'), f = 42;
 })();

```

## `uglify/functions/issue_4261`

- tags: `join vars`, `remove unused`
- size: oxc 121 vs reference 131 (-10 bytes, no whitespaces)

```js
try {
	throw 42;
} catch (e) {
	(function() {
		function f() {
			e.p;
		}
		function g() {
			while (f());
		}
		(function() {
			while (console.log(g()));
		})();
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,15 @@
 try {
 	throw 42;
 } catch (e) {
-	function g() {
-		// `ReferenceError: e is not defined` on Node.js v4-
-		while (void e.p);
-	}
-	while (console.log(g()));
+	(function() {
+		function f() {
+			e.p;
+		}
+		function g() {
+			for (; f(););
+		}
+		(function() {
+			for (; console.log(g()););
+		})();
+	})();
 }

```

## `uglify/global_defs/repeated_nodes`

- size: oxc 17 vs reference 27 (-10 bytes, no whitespaces)

```js
console.log(N, N);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(rand(), rand());
+console.log(N, N);

```

## `uglify/hoist_vars/catch_var`

- tags: `remove unused`
- size: oxc 20 vs reference 30 (-10 bytes, no whitespaces)

```js
var a = 'PASS';
try {
	a;
} catch (a) {
	var a = 0;
	a;
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-a = 'PASS';
-var a;
-console.log(a);
+console.log('PASS');

```

## `uglify/if_return/empty_try`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 75 (-10 bytes, no whitespaces)

```js
console.log(function() {
	return f;
	function f() {
		try {} finally {}
		return 'PASS';
	}
}()());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log(function() {
-	return function() {
-		try {} finally {}
+	return f;
+	function f() {
 		return 'PASS';
-	};
+	}
 }()());

```

## `uglify/join_vars/issue_3789_1`

- tags: `join vars`
- size: oxc 69 vs reference 79 (-10 bytes, no whitespaces)

```js
try {
	c;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}
try {} catch (c) {
	var a;
	c = 0;
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 try {
 	c;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }
-try {} catch (c) {
+try {} catch {
 	var a;
-	c = 0;
 }

```

## `uglify/keep_fargs/collapse_vars_repeated`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 113 vs reference 123 (-10 bytes, no whitespaces)

```js
function f1() {
	var dummy = 3, a = 5, unused = 2, a = 1, a = 3;
	return -a;
}
function f2(x) {
	var a = 3, a = x;
	return a;
}
(function(x) {
	var a = 'GOOD' + x, e = 'BAD', k = '!', e = a;
	console.log(e + k);
})('!'), (function(x) {
	var a = 'GOOD' + x, e = 'BAD' + x, k = '!', e = a;
	console.log(e + k);
})('!');

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,7 @@
-function f1() {
-	return -3;
-}
-function f2(x) {
-	return x;
-}
-(function() {
-	console.log('GOOD!!');
-})(), (function() {
-	console.log('GOOD!!');
-})();
+(function(x) {
+	var a = 'GOOD' + x;
+	console.log(a + '!');
+})('!'), (function(x) {
+	var a = 'GOOD' + x;
+	'' + x, console.log(a + '!');
+})('!');

```

## `uglify/merge_vars/collapse_vars_1`

- tags: `join vars`
- size: oxc 42 vs reference 52 (-10 bytes, no whitespaces)

```js
var a = a && a.p;
var b = 'PASS';
var b = b && console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-var a = a && a.p;
-var a;
-var a = (a = 'PASS') && console.log(a);
+var a = a && a.p, b = 'PASS', b = b && console.log(b);

```

## `uglify/merge_vars/collapse_vars_2`

- tags: `join vars`
- size: oxc 100 vs reference 110 (-10 bytes, no whitespaces)

```js
'use strict';
var log = console.log;
(function g(a) {
	var b = a;
	var c = Math.random();
	var c = b;
	log(c);
	return c;
})('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
 'use strict';
 var log = console.log;
-(function g(a) {
-	var a = a;
-	var c = Math.random();
-	var c;
-	log(c = a);
+(function(a) {
+	var b = a, c = Math.random(), c = b;
+	log(c);
 	return c;
 })('PASS');

```

## `uglify/merge_vars/conditional_chain_4`

- tags: `join vars`
- size: oxc 109 vs reference 119 (-10 bytes, no whitespaces)

```js
function f(a, b) {
	var c, d;
	if (a && b ? c = a : d = b) console.log(c);
	else console.log(d);
}
f('', null);
f('', true);
f(42, null);
f(42, true);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 function f(a, b) {
 	var c, d;
-	if (a && b ? c = a : d = b) console.log(c);
-	else console.log(d);
+	(a && b ? c = a : d = b) ? console.log(c) : console.log(d);
 }
 f('', null);
-f('', true);
+f('', !0);
 f(42, null);
-f(42, true);
+f(42, !0);

```

## `uglify/properties/mangle_properties_3`

- size: oxc 30 vs reference 40 (-10 bytes, no whitespaces)

```js
console.log({ [(console, 'foo')]: 'PASS' }.foo);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log({ [(console, 'o')]: 'PASS' }.o);
+console.log({ foo: 'PASS' }.foo);

```

## `uglify/reduce_vars/issue_3068_1`

- tags: `join vars`
- size: oxc 48 vs reference 58 (-10 bytes, no whitespaces)

```js
(function() {
	do {
		continue;
		var b = 'defined';
	} while (b && b.c);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 (function() {
 	do {
 		continue;
-		var b = 'defined';
+		var b;
 	} while (b && b.c);
 })();

```

## `uglify/reduce_vars/issue_3240_1`

- tags: `join vars`, `remove unused`
- size: oxc 75 vs reference 85 (-10 bytes, no whitespaces)

```js
(function() {
	f(1);
	function f(a) {
		console.log(a);
		var g = function() {
			f(a - 1);
		};
		if (a) g();
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 (function() {
-	(function f(a) {
+	f(1);
+	function f(a) {
 		console.log(a);
-		var g = function() {
+		a && function() {
 			f(a - 1);
-		};
-		if (a) g();
-	})(1);
+		}();
+	}
 })();

```

## `uglify/sequences/make_sequences_4`

- tags: `sequences`
- size: oxc 98 vs reference 108 (-10 bytes, no whitespaces)

```js
x = 5;
if (y) z();
x = 5;
for (i = 0; i < 5; i++) console.log(i);
x = 5;
for (; i < 5; i++) console.log(i);
x = 5;
switch (y) {}
x = 5;
with(obj) {}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-if (x = 5, y) z();
-for (x = 5, i = 0; i < 5; i++) console.log(i);
+for (x = 5, y && z(), x = 5, i = 0; i < 5; i++) console.log(i);
 for (x = 5; i < 5; i++) console.log(i);
-switch (x = 5, y) {}
-with(x = 5, obj);
+x = 5, y, x = 5;
+with(obj) {}

```

## `uglify/templates/nested`

- size: oxc 20 vs reference 30 (-10 bytes, no whitespaces)

```js
console.log(`P${`A${'S'}`}S`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`P${`A${'S'}`}S`);
+console.log('PASS');

```

## `uglify/typeof/issue_2728_5`

- tags: `join vars`
- size: oxc 55 vs reference 65 (-10 bytes, no whitespaces)

```js
(function arguments(arguments) {
	console.log(typeof arguments);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function arguments(arguments) {
+(function(arguments) {
 	console.log(typeof arguments);
 })();

```

## `uglify/varify/issue_4191_const`

- tags: `join vars`, `remove unused`
- size: oxc 31 vs reference 41 (-10 bytes, no whitespaces)

```js
const a = function() {};
console.log(typeof a, a());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-function a() {}
-;
-console.log(typeof a, a());
+console.log('function', void 0);

```

## `uglify/varify/issue_4191_let`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 54 (-10 bytes, no whitespaces)

```js
'use strict';
let a = function() {};
console.log(typeof a, a());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
 'use strict';
-function a() {}
-;
-console.log(typeof a, a());
+console.log('function', void 0);

```

## `uglify/arrows/for_parentheses_init`

- size: oxc 23 vs reference 34 (-11 bytes, no whitespaces)

```js
for ((a) => (a in a); console.log(42););

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-for (((a) => a in a); console.log(42););
+for (; console.log(42););

```

## `uglify/arrows/for_statement_parentheses_init`

- size: oxc 23 vs reference 34 (-11 bytes, no whitespaces)

```js
for ((a) => {
	a in a;
}; console.log(42););

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-for ((a) => {
-	a in a;
-}; console.log(42););
+for (; console.log(42););

```

## `uglify/classes/conditional_parentheses`

- size: oxc 33 vs reference 44 (-11 bytes, no whitespaces)

```js
'use strict';
if (class {}) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 'use strict';
-(class {}) && console.log('PASS');
+console.log('PASS');

```

## `uglify/classes/issue_4982_1`

- size: oxc 33 vs reference 44 (-11 bytes, no whitespaces)

```js
'use strict';
try {} catch (e) {
	class A extends 42 {}
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
 'use strict';
-{
-	class A {}
-}
 console.log('PASS');

```

## `uglify/classes/issue_5015_2`

- tags: `join vars`
- size: oxc 61 vs reference 72 (-11 bytes, no whitespaces)

```js
'use strict';
try {
	new class A {
		[(A, 42)]() {}
	}();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 'use strict';
 try {
-	new class A {
-		[(A, 42)]() {}
+	new class {
+		42() {}
 	}();
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/collapse_vars/issue_2914_1`

- tags: `join vars`
- size: oxc 132 vs reference 143 (-11 bytes, no whitespaces)

```js
function read(input) {
	var i = 0;
	var e = 0;
	var t = 0;
	while (e < 32) {
		var n = input[i++];
		t |= (127 & n) << e;
		if (0 === (128 & n)) return t;
		e += 7;
	}
}
console.log(read([129]));

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,9 @@
 function read(input) {
-	var i = 0;
-	var e = 0;
-	var t = 0;
-	while (e < 32) {
+	var i = 0, e = 0, t = 0;
+	for (; e < 32;) {
 		var n = input[i++];
 		t |= (127 & n) << e;
-		if (0 === (128 & n)) return t;
+		if (!(128 & n)) return t;
 		e += 7;
 	}
 }

```

## `uglify/collapse_vars/issue_3908`

- tags: `join vars`, `remove unused`
- size: oxc 20 vs reference 31 (-11 bytes, no whitespaces)

```js
if (console) {
	var o = { p: !1 }, a = o;
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-console && 0;
 console.log('PASS');

```

## `uglify/collapse_vars/issue_4586_1`

- tags: `join vars`
- size: oxc 72 vs reference 83 (-11 bytes, no whitespaces)

```js
var a = 42;
(function f(b) {
	var b = a;
	if (b === arguments[0]) console.log('PASS');
})(console);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 var a = 42;
-(function f(b) {
-	var b = a;
-	if (b === arguments[0]) console.log('PASS');
+(function(b) {
+	arguments[0] === 42 && console.log('PASS');
 })(console);

```

## `uglify/const/collapse_block`

- tags: `join vars`
- size: oxc 28 vs reference 39 (-11 bytes, no whitespaces)

```js
{
	const a = typeof console;
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-{
-	const a = typeof console;
-	console.log(a);
-}
+console.log(typeof console);

```

## `uglify/const/hoist_props`

- tags: `join vars`
- size: oxc 26 vs reference 37 (-11 bytes, no whitespaces)

```js
{
	const o = { p: 'PASS' };
	console.log(o.p);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-{
-	const o = { p: 'PASS' };
-	console.log(o.p);
-}
+console.log({ p: 'PASS' }.p);

```

## `uglify/const/issue_4207`

- tags: `join vars`, `remove unused`
- size: oxc 33 vs reference 44 (-11 bytes, no whitespaces)

```js
{
	const a = function() {};
	console.log(a.length);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-{
-	const a = function() {};
-	console.log(a.length);
-}
+console.log(function() {}.length);

```

## `uglify/const/reduce_block_1`

- tags: `join vars`
- size: oxc 28 vs reference 39 (-11 bytes, no whitespaces)

```js
{
	const a = typeof console;
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-{
-	const a = typeof console;
-	console.log(a);
-}
+console.log(typeof console);

```

## `uglify/const/reduce_block_2`

- tags: `join vars`
- size: oxc 50 vs reference 61 (-11 bytes, no whitespaces)

```js
{
	const a = typeof console;
	console.log(a);
}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
-{
-	const a = typeof console;
-	console.log(a);
-}
+console.log(typeof console);
 console.log(typeof a);

```

## `uglify/const/reduce_block_2_toplevel`

- tags: `join vars`
- size: oxc 50 vs reference 61 (-11 bytes, no whitespaces)

```js
{
	const a = typeof console;
	console.log(a);
}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
-{
-	const a = typeof console;
-	console.log(a);
-}
+console.log(typeof console);
 console.log(typeof a);

```

## `uglify/directives/issue_5368_3`

- size: oxc 6 vs reference 17 (-11 bytes, no whitespaces)

```js
'foo';
(function() {
	'bar';
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(function() {})();
+'foo';

```

## `uglify/drop-unused/issue_1715_3`

- tags: `remove unused`
- size: oxc 65 vs reference 76 (-11 bytes, no whitespaces)

```js
var a = 1;
function f() {
	a++;
	try {
		console;
	} catch (a) {
		var a = 2 + x();
	}
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,8 @@
 var a = 1;
 function f() {
 	a++;
-	try {
-		console;
-	} catch (a) {
+	try {} catch (a) {
 		var a;
-		x();
 	}
 }
 f();

```

## `uglify/evaluate/issue_3738`

- size: oxc 17 vs reference 28 (-11 bytes, no whitespaces)

```js
console.log(1 / (0 + ([] - 1) % 1));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(1 / (0 + ([] - 1) % 1));
+console.log(1 / 0);

```

## `uglify/functions/issue_5316_1`

- tags: `join vars`
- size: oxc 69 vs reference 80 (-11 bytes, no whitespaces)

```js
do {
	console.log('PASS');
} while (function() {
	var a, b = 42 && (console[a = b] = a++);
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-do {
+do
 	console.log('PASS');
-} while (b = a = void 0, b = (42, console[a = a] = a++), void 0);
-var a, b;
+while (function() {
+	var a, b = console[a = b] = a++;
+}());

```

## `uglify/merge_vars/issue_4956_2`

- tags: `join vars`
- size: oxc 76 vs reference 87 (-11 bytes, no whitespaces)

```js
var a, b;
function f(c) {
	if (0 == c) {
		console;
		a = { p: 42 };
	}
	b = a.p;
	if (1 == c) console.log(b);
}
f(0);
f(1);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,8 @@
 var a, b;
 function f(c) {
-	if (0 == c) {
-		console;
-		a = { p: 42 };
-	}
+	c == 0 && (a = { p: 42 });
 	b = a.p;
-	if (1 == c) console.log(b);
+	c == 1 && console.log(b);
 }
 f(0);
 f(1);

```

## `uglify/nullish/issue_5829_1`

- tags: `join vars`
- size: oxc 56 vs reference 67 (-11 bytes, no whitespaces)

```js
(function f(a) {
	var b;
	(!a ?? (b = 0)) || console.log(b || 'PASS');
})('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-(function f(a) {
+(function(a) {
 	var b;
-	(!a ?? (b = 0)) || console.log(b || 'PASS');
+	!a || console.log(b || 'PASS');
 })('FAIL');

```

## `uglify/rests/issue_5552_1`

- tags: `join vars`
- size: oxc 77 vs reference 88 (-11 bytes, no whitespaces)

```js
var log = console.log;
var a = f, b = log();
function f(...[c = a = 'PASS']) {}
f((a = 'FAIL', b));
log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var log = console.log;
-var a = f, b = log();
+var log = console.log, a = f, b = log();
 function f(...[c = a = 'PASS']) {}
-f((a = 'FAIL', b));
+a = 'FAIL';
 log(a);

```

## `uglify/templates/ascii_only`

- size: oxc 49 vs reference 60 (-11 bytes, no whitespaces)

```js
console.log(`\ud801\udc37\ud801𐐷${42}\u{10437}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`\ud801\udc37\ud801\ud801\udc37${42}\u{10437}`);
+console.log(`\ud801\udc37\ud801𐐷42\u{10437}`);

```

## `uglify/arrows/inline_iife_within_arrow`

- size: oxc 61 vs reference 73 (-12 bytes, no whitespaces)

```js
var f = () => console.log(function(a) {
	return Math.ceil(a);
}(Math.random()));
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-var f = () => {
-	return console.log((a = Math.random(), Math.ceil(a)));
-	var a;
-};
-f();
+console.log(function(a) {
+	return Math.ceil(a);
+}(Math.random()));

```

## `uglify/classes/issue_5015_3`

- tags: `join vars`
- size: oxc 33 vs reference 45 (-12 bytes, no whitespaces)

```js
'use strict';
(class A {
	static f() {
		return A;
	}
});
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 'use strict';
-(class A {});
 console.log('PASS');

```

## `uglify/collapse_vars/collapse_vars_repeated`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 113 vs reference 125 (-12 bytes, no whitespaces)

```js
function f1() {
	var dummy = 3, a = 5, unused = 2, a = 1, a = 3;
	return -a;
}
function f2(x) {
	var a = 3, a = x;
	return a;
}
(function(x) {
	var a = 'GOOD' + x, e = 'BAD', k = '!', e = a;
	console.log(e + k);
})('!'), (function(x) {
	var a = 'GOOD' + x, e = 'BAD' + x, k = '!', e = a;
	console.log(e + k);
})('!');

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,7 @@
-function f1() {
-	return -3;
-}
-function f2(x) {
-	return x;
-}
 (function(x) {
-	console.log('GOOD!!');
-})(), (function(x) {
-	console.log('GOOD!!');
-})();
+	var a = 'GOOD' + x;
+	console.log(a + '!');
+})('!'), (function(x) {
+	var a = 'GOOD' + x;
+	'' + x, console.log(a + '!');
+})('!');

```

## `uglify/collapse_vars/issue_3238_6`

- tags: `join vars`
- size: oxc 74 vs reference 86 (-12 bytes, no whitespaces)

```js
function f(a) {
	var b, c;
	if (a) {
		b = a && 0 || [];
		c = a && 0 || [];
	}
	return b === c;
}
console.log(f(0), f(1));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f(a) {
 	var b, c;
 	if (a) {
-		b = a && 0 || [];
-		c = a && 0 || [];
+		b = [];
+		c = [];
 	}
 	return b === c;
 }

```

## `uglify/collapse_vars/issue_3526_1`

- tags: `join vars`
- size: oxc 64 vs reference 76 (-12 bytes, no whitespaces)

```js
var b = function() {
	this.a = 'FAIL';
}();
var a = 'PASS';
var b;
var c = b;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,4 @@
 var b = function() {
 	this.a = 'FAIL';
-}();
-var a = 'PASS';
-var b;
-var c = b;
+}(), a = 'PASS', b, c = b;
 console.log(a);

```

## `uglify/collapse_vars/issue_3526_2`

- tags: `join vars`
- size: oxc 67 vs reference 79 (-12 bytes, no whitespaces)

```js
function f() {
	this.a = 'FAIL';
}
var b = f();
var a = 'PASS';
var b;
var c = b;
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,5 @@
 function f() {
 	this.a = 'FAIL';
 }
-var b = f();
-var a = 'PASS';
-var b;
-var c = b;
+var b = f(), a = 'PASS', b, c = b;
 console.log(a);

```

## `uglify/collapse_vars/return_4`

- tags: `join vars`
- size: oxc 54 vs reference 66 (-12 bytes, no whitespaces)

```js
var a = 'FAIL';
(function(b) {
	a = 'PASS';
	return;
	b(a);
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 var a = 'FAIL';
 (function(b) {
 	a = 'PASS';
-	return;
-	b(a);
 })();
 console.log(a);

```

## `uglify/const/hoist_vars`

- size: oxc 45 vs reference 57 (-12 bytes, no whitespaces)

```js
{
	const a = 'FAIL';
	var b = 42;
}
var a = 'PASS';
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-var b;
 {
-	const a = 'FAIL';
-	b = 42;
+	let a = 'FAIL';
+	var b = 42;
 }
-var a = 'PASS';
-console.log(a, b);
+console.log('PASS', b);

```

## `uglify/destructured/funarg_merge_vars_2`

- tags: `join vars`
- size: oxc 55 vs reference 67 (-12 bytes, no whitespaces)

```js
var a = 0;
(function f({ [a]: b }) {
	var a = typeof b;
	console.log(a);
})([42]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 var a = 0;
-(function f({ [a]: b }) {
-	var a = typeof b;
-	console.log(a);
+(function({ 0: b }) {
+	console.log(typeof b);
 })([42]);

```

## `uglify/drop-unused/issue_1830_1`

- tags: `remove unused`
- size: oxc 39 vs reference 51 (-12 bytes, no whitespaces)

```js
!function() {
	L: for (var b = console.log(1); !1;) continue L;
}();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
-	L: for (console.log(1); !1;) continue L;
-}();
+(function() {
+	L: var b = console.log(1);
+})();

```

## `uglify/exports/issue_4761`

- size: oxc 17 vs reference 29 (-12 bytes, no whitespaces)

```js
export default 'function' == 42;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export default 'function' == 42;
+export default !1;

```

## `uglify/hoist_props/issue_4985`

- tags: `join vars`
- size: oxc 33 vs reference 45 (-12 bytes, no whitespaces)

```js
var a = { p: 42 };
console.log(function() {
	a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-var a, a_p = 42;
-console.log(function() {
-	({});
-}());
+var a = { p: 42 };
+console.log(void 0);

```

## `uglify/ie/issue_24_1`

- size: oxc 65 vs reference 77 (-12 bytes, no whitespaces)

```js
(function(a) {
	console.log(typeof function f() {} === typeof a ? 'FAIL' : 'PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function(o) {
-	console.log(typeof function o() {} === typeof o ? 'FAIL' : 'PASS');
+(function(a) {
+	console.log(typeof a == 'function' ? 'FAIL' : 'PASS');
 })();

```

## `uglify/ie/issue_24_2`

- size: oxc 65 vs reference 77 (-12 bytes, no whitespaces)

```js
(function(a) {
	console.log(typeof function f() {} === typeof a ? 'FAIL' : 'PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function(o) {
-	console.log(typeof function n() {} === typeof o ? 'FAIL' : 'PASS');
+(function(a) {
+	console.log(typeof a == 'function' ? 'FAIL' : 'PASS');
 })();

```

## `uglify/issue-143/transformation_sort_order_equal`

- size: oxc 24 vs reference 36 (-12 bytes, no whitespaces)

```js
console.log((a = parseInt('100')) == a);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((a = parseInt('100')) == a);
+console.log((a = 100) == a);

```

## `uglify/issue-143/transformation_sort_order_greater_or_equal`

- size: oxc 24 vs reference 36 (-12 bytes, no whitespaces)

```js
console.log((a = parseInt('100')) >= a);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((a = parseInt('100')) >= a);
+console.log((a = 100) >= a);

```

## `uglify/issue-143/transformation_sort_order_lesser_or_equal`

- size: oxc 24 vs reference 36 (-12 bytes, no whitespaces)

```js
console.log((a = parseInt('100')) <= a);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((a = parseInt('100')) <= a);
+console.log((a = 100) <= a);

```

## `uglify/issue-143/transformation_sort_order_unequal`

- size: oxc 24 vs reference 36 (-12 bytes, no whitespaces)

```js
console.log((a = parseInt('100')) != a);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log((a = parseInt('100')) != a);
+console.log((a = 100) != a);

```

## `uglify/keep_fargs/issue_2203_2`

- tags: `join vars`, `remove unused`
- size: oxc 109 vs reference 121 (-12 bytes, no whitespaces)

```js
a = 'PASS';
console.log({
	a: 'FAIL',
	b: function() {
		return function(c) {
			return c.a;
		}((String, Object, function() {
			return this;
		}()));
	}
}.b());

```

```diff
--- reference
+++ oxc
@@ -2,10 +2,10 @@
 console.log({
 	a: 'FAIL',
 	b: function() {
-		return function() {
-			return (Object, function() {
-				return this;
-			}()).a;
-		}(String);
+		return function(c) {
+			return c.a;
+		}(function() {
+			return this;
+		}());
 	}
 }.b());

```

## `uglify/let/do_continue`

- size: oxc 65 vs reference 77 (-12 bytes, no whitespaces)

```js
'use strict';
try {
	do {
		{
			let a = 0;
			continue;
		}
	} while ([A]);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,7 @@
 try {
 	do {
 		let a = 0;
-		continue;
 	} while ([A]);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/let/issue_4290_1`

- tags: `remove unused`
- size: oxc 13 vs reference 25 (-12 bytes, no whitespaces)

```js
'use strict';
let a;
var a;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
 'use strict';
-let a;
-var a;

```

## `uglify/loops/do_continue`

- size: oxc 44 vs reference 56 (-12 bytes, no whitespaces)

```js
try {
	do {
		continue;
	} while ([A]);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 try {
-	do {
-		continue;
-	} while ([A]);
-} catch (e) {
+	do	;
+while ([A]);
+} catch {
 	console.log('PASS');
 }

```

## `uglify/merge_vars/conditional_chain_1`

- tags: `join vars`
- size: oxc 131 vs reference 143 (-12 bytes, no whitespaces)

```js
function f(a, b) {
	var c, d;
	if (a && (c = a)) console.log(c);
	else b || (d = b) ? console.log('foo') : console.log(d);
}
f('', null);
f('', true);
f(42, null);
f(42, true);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 function f(a, b) {
-	var a, a;
-	if (a && (a = a)) console.log(a);
-	else b || (a = b) ? console.log('foo') : console.log(a);
+	var c, d;
+	a && (c = a) ? console.log(c) : b || (d = b) ? console.log('foo') : console.log(d);
 }
 f('', null);
-f('', true);
+f('', !0);
 f(42, null);
-f(42, true);
+f(42, !0);

```

## `uglify/merge_vars/conditional_chain_3`

- tags: `join vars`
- size: oxc 113 vs reference 125 (-12 bytes, no whitespaces)

```js
function f(a, b) {
	var c, d;
	if (a && (c = a) || b || (d = b)) console.log(c);
	else console.log(d);
}
f('', null);
f('', true);
f(42, null);
f(42, true);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 function f(a, b) {
-	var c, a;
-	if (a && (c = a) || b || (a = b)) console.log(c);
-	else console.log(a);
+	var c, d;
+	a && (c = a) || b || (d = b) ? console.log(c) : console.log(d);
 }
 f('', null);
-f('', true);
+f('', !0);
 f(42, null);
-f(42, true);
+f(42, !0);

```

## `uglify/optional-chains/assign_parentheses_call`

- size: oxc 37 vs reference 49 (-12 bytes, no whitespaces)

```js
var o = {};
((() => o)?.()).p = 'PASS';
console.log(o.p);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var o = {};
-((() => o)?.()).p = 'PASS';
+o.p = 'PASS';
 console.log(o.p);

```

## `uglify/reduce_vars/cond_assign`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 49 (-12 bytes, no whitespaces)

```js
!function() {
	var a;
	void 0 ? a = 1 : 0;
	console.log(a);
}();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-!function() {
+(function() {
 	var a;
-	void 0 ? a = 1 : 0;
 	console.log(a);
-}();
+})();

```

## `uglify/rests/issue_5552_2`

- tags: `join vars`
- size: oxc 71 vs reference 83 (-12 bytes, no whitespaces)

```js
var log = console.log;
var a = f;
function f(...{ [a = 'PASS']: b }) {}
f((a = 'FAIL', 42));
log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var log = console.log;
-var a = f;
+var log = console.log, a = f;
 function f(...{ [a = 'PASS']: b }) {}
-f((a = 'FAIL', 42));
+a = 'FAIL';
 log(a);

```

## `uglify/sequences/delete_seq_4`

- tags: `sequences`
- size: oxc 182 vs reference 194 (-12 bytes, no whitespaces)

```js
function f() {}
console.log(delete (f(), undefined));
console.log(delete (f(), void 0));
console.log(delete (f(), Infinity));
console.log(delete (f(), 1 / 0));
console.log(delete (f(), NaN));
console.log(delete (f(), 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 function f() {}
-console.log(delete void f()), console.log(delete void f()), console.log((f(), delete (1 / 0))), console.log((f(), delete (1 / 0))), console.log(delete (f(), NaN)), console.log((f(), delete (0 / 0)));
+console.log(delete (0, undefined)), console.log(delete void 0), console.log(delete (0, Infinity)), console.log(delete (1 / 0)), console.log(delete (0, NaN)), console.log(delete NaN);

```

## `uglify/sequences/issue_1758`

- tags: `sequences`
- size: oxc 87 vs reference 99 (-12 bytes, no whitespaces)

```js
console.log(function(c) {
	var undefined = 42;
	return function() {
		c--;
		c--, c.toString();
		return;
	}();
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 console.log(function(c) {
 	var undefined = 42;
 	return function() {
-		return c--, c--, void c.toString();
+		c--, c--, c.toString();
 	}();
 }());

```

## `uglify/sequences/issue_2313`

- tags: `join vars`, `sequences`
- size: oxc 105 vs reference 117 (-12 bytes, no whitespaces)

```js
var a = 0, b = 0;
var foo = {
	get c() {
		a++;
		return 42;
	},
	set c(c) {
		b++;
	},
	d: function() {
		this.c++;
		if (this.c) console.log(a, b);
	}
};
foo.d();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 0, b = 0;
-var foo = {
+({
 	get c() {
 		return a++, 42;
 	},
@@ -7,7 +7,6 @@
 		b++;
 	},
 	d: function() {
-		if (this.c++, this.c) console.log(a, b);
+		this.c++, this.c && console.log(a, b);
 	}
-};
-foo.d();
+}).d();

```

## `uglify/varify/issue_5516`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 79 (-12 bytes, no whitespaces)

```js
'use strict';
console.log(typeof function() {
	{
		let a;
	}
	{
		const a = function() {};
		return a;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,4 @@
 'use strict';
 console.log(typeof function() {
-	{
-		const a = function() {};
-		return a;
-	}
+	return function() {};
 }());

```

## `uglify/webkit/lambda_name_mangle`

- size: oxc 24 vs reference 36 (-12 bytes, no whitespaces)

```js
console.log(typeof function foo(bar) {});

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(typeof function o(n) {});
+console.log('function');

```

## `uglify/webkit/lambda_name_mangle_ie8`

- size: oxc 24 vs reference 36 (-12 bytes, no whitespaces)

```js
console.log(typeof function foo(bar) {});

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(typeof function n(o) {});
+console.log('function');

```

## `uglify/annotations/compress_and_output_annotations_disabled`

- tags: `sequences`
- size: oxc 24 vs reference 37 (-13 bytes, no whitespaces)

```js
a(1 + 2);
b(2 + 3);
c(side_effect);
d(effect());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-a(3), b(5), c(side_effect), d(effect());
+c(side_effect), effect();

```

## `uglify/annotations/compress_annotations_disabled_output_annotations_enabled`

- tags: `sequences`
- size: oxc 24 vs reference 37 (-13 bytes, no whitespaces)

```js
a(1 + 2);
b(2 + 3);
c(side_effect);
d(effect());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-a(3), b(5), c(side_effect), d(effect());
+c(side_effect), effect();

```

## `uglify/classes/block_scoped`

- size: oxc 66 vs reference 79 (-13 bytes, no whitespaces)

```js
'use strict';
while (0) {
	class A {}
}
if (console) {
	class B {}
}
console.log(typeof A, typeof B);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,4 @@
 'use strict';
-0;
-{
-	class A {}
-}
 if (console) {
 	class B {}
 }

```

## `uglify/collapse_vars/global_read`

- tags: `join vars`
- size: oxc 50 vs reference 63 (-13 bytes, no whitespaces)

```js
var a = 0;
a = this.A;
A = 1;
a ? console.log('FAIL') : console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var a = 0;
 a = this.A;
 A = 1;
-a ? console.log('FAIL') : console.log('PASS');
+console.log(a ? 'FAIL' : 'PASS');

```

## `uglify/collapse_vars/issue_2203_2`

- tags: `join vars`, `remove unused`
- size: oxc 109 vs reference 122 (-13 bytes, no whitespaces)

```js
a = 'PASS';
console.log({
	a: 'FAIL',
	b: function() {
		return function(c) {
			return c.a;
		}((String, Object, function() {
			return this;
		}()));
	}
}.b());

```

```diff
--- reference
+++ oxc
@@ -3,9 +3,9 @@
 	a: 'FAIL',
 	b: function() {
 		return function(c) {
-			return (Object, function() {
-				return this;
-			}()).a;
-		}(String);
+			return c.a;
+		}(function() {
+			return this;
+		}());
 	}
 }.b());

```

## `uglify/collapse_vars/issue_4038`

- tags: `join vars`
- size: oxc 54 vs reference 67 (-13 bytes, no whitespaces)

```js
var a = 0;
a = this;
a = a.A;
A = 1;
a ? console.log('FAIL') : console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a = 0;
-a = (a = this).A;
+a = this;
+a = a.A;
 A = 1;
-a ? console.log('FAIL') : console.log('PASS');
+console.log(a ? 'FAIL' : 'PASS');

```

## `uglify/default-values/issue_4510_2`

- tags: `remove unused`
- size: oxc 47 vs reference 60 (-13 bytes, no whitespaces)

```js
var o = { p: void 0 };
var { p: a = console.log('PASS') } = {
	p: null,
	...o
};

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var o = { p: void 0 };
 var { p: a = console.log('PASS') } = {
 	p: null,
-	...o
+	p: void 0
 };

```

## `uglify/imports/issue_4708_1`

- tags: `remove unused`
- size: oxc 12 vs reference 25 (-13 bytes, no whitespaces)

```js
var a;
import a from 'foo';

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a;
-import a from 'foo';
+import 'foo';

```

## `uglify/let/issue_4276_1`

- tags: `remove unused`
- size: oxc 63 vs reference 76 (-13 bytes, no whitespaces)

```js
'use strict';
try {
	let a = b, b;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 'use strict';
 try {
-	let a = b, b;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/let/retain_block_2`

- tags: `remove unused`
- size: oxc 13 vs reference 26 (-13 bytes, no whitespaces)

```js
'use strict';
{
	var a;
	let a;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
 'use strict';
-{
-	var a;
-	let a;
-}

```

## `uglify/let/retain_block_3`

- tags: `remove unused`
- size: oxc 13 vs reference 26 (-13 bytes, no whitespaces)

```js
'use strict';
{
	let a;
	var a;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
 'use strict';
-{
-	let a;
-	var a;
-}

```

## `uglify/new/dot_parentheses_2`

- size: oxc 49 vs reference 62 (-13 bytes, no whitespaces)

```js
console.log(typeof new function() {
	Math.random();
}.constructor());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-console.log(typeof new function() {
-	Math.random();
-}.constructor());
+console.log(typeof new function() {}.constructor());

```

## `uglify/properties/keep_substituted_property_quotes`

- tags: `join vars`
- size: oxc 52 vs reference 65 (-13 bytes, no whitespaces)

```js
function f(o) {
	var a = 'p';
	return o[a];
}
console.log(f({ p: 'PASS' }));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function f(o) {
-	var a = 'p';
-	return o['p'];
+	return o.p;
 }
 console.log(f({ p: 'PASS' }));

```

## `uglify/pure_funcs/boolean_or`

- tags: `pure functions`
- size: oxc 38 vs reference 51 (-13 bytes, no whitespaces)

```js
foo() || foo();
foo() || bar();
foo() || 'bar';
bar() || foo();
bar() || bar();
bar() || 'bar';
'bar' || foo();
'bar' || bar();
'bar' || 'bar';

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,3 @@
 bar();
 bar() || bar();
 bar();
-'bar' || bar();

```

## `uglify/reduce_vars/issue_1670_1`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 73 (-13 bytes, no whitespaces)

```js
(function f() {
	switch (1) {
		case 0:
			var a = true;
			break;
		default: if (typeof a === 'undefined') console.log('PASS');
		else console.log('FAIL');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function() {
+	console.log(a === void 0 ? 'PASS' : 'FAIL');
 	var a;
-	void 0 === a ? console.log('PASS') : console.log('FAIL');
 })();

```

## `uglify/spreads/keep_fargs`

- tags: `remove unused`
- size: oxc 48 vs reference 61 (-13 bytes, no whitespaces)

```js
var a = ['PASS'];
(function(b, c) {
	console.log(c);
})(console, ...a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a = ['PASS'];
 (function(b, c) {
 	console.log(c);
-})(console, ...a);
+})(console, 'PASS');

```

## `uglify/switches/issue_1679`

- size: oxc 136 vs reference 149 (-13 bytes, no whitespaces)

```js
var a = 100, b = 10;
function f() {
	switch (--b) {
		default:
		case !function x() {}: break;
		case b--:
			switch (0) {
				default:
				case a--:
			}
			break;
		case a++: break;
	}
}
f();
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,7 @@
 function f() {
 	switch (--b) {
 		default:
-		case !function x() {}: break;
+		case !1: break;
 		case b--:
 			switch (0) {
 				default:

```

## `uglify/switches/issue_5912_1`

- tags: `join vars`
- size: oxc 87 vs reference 100 (-13 bytes, no whitespaces)

```js
var a = {};
a = a.p;
switch (console) {
	case 42: a.q;
}
try {
	a.r;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,9 @@
 var a = {};
 a = a.p;
-switch (console) {
-	case 42: a.q;
-}
+console === 42 && a.q;
 try {
 	a.r;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/arrows/issue_5416_1`

- tags: `remove unused`
- size: oxc 71 vs reference 85 (-14 bytes, no whitespaces)

```js
var f = () => {
	while ((() => {
		console;
		var a = function g(arguments) {
			console.log(arguments);
		}();
	})());
};
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-var f = () => {
-	console;
-	arguments = void 0, console.log(arguments);
-	var arguments;
-	return;
-};
-f();
+(() => {
+	for (; function(arguments) {
+		console.log(arguments);
+	}(), void 0;);
+})();

```

## `uglify/asm/asm_nested_functions`

- size: oxc 76 vs reference 90 (-14 bytes, no whitespaces)

```js
0;
function a() {
	'use asm';
	0;
}
0;
function b() {
	0;
	function c() {
		'use asm';
		0;
	}
	0;
	function d() {
		0;
	}
	0;
}
0;

```

```diff
--- reference
+++ oxc
@@ -1,19 +1,9 @@
-0;
 function a() {
 	'use asm';
-	0;
 }
-0;
 function b() {
-	0;
 	function c() {
 		'use asm';
-		0;
 	}
-	0;
-	function d() {
-		0;
-	}
-	0;
+	function d() {}
 }
-0;

```

## `uglify/blocks/keep_some_blocks`

- size: oxc 87 vs reference 101 (-14 bytes, no whitespaces)

```js
// 1.
if (foo) {
	{
		{
			{}
		}
	}
	if (bar) {
		baz();
	}
	{
		{}
	}
} else {
	stuff();
}
// 2.
if (foo) {
	for (var i = 0; i < 5; ++i) if (bar) baz();
} else {
	stuff();
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,5 @@
 // 1.
-if (foo) {
-	if (bar) baz();
-} else stuff();
+foo ? bar && baz() : stuff();
 // 2.
-if (foo) {
-	for (var i = 0; i < 5; ++i) if (bar) baz();
-} else stuff();
+if (foo) for (var i = 0; i < 5; ++i) bar && baz();
+else stuff();

```

## `uglify/collapse_vars/chained_5`

- tags: `join vars`
- size: oxc 37 vs reference 51 (-14 bytes, no whitespaces)

```js
var a = 'PASS';
var a = (console, console.log(a));
a && ++a;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-var a = 'PASS';
-console;
-var a;
-(a = console.log(a)) && ++a;
+var a = 'PASS', a = console.log(a);
+a && ++a;

```

## `uglify/collapse_vars/issue_2364_3`

- tags: `join vars`, `pure getters`
- size: oxc 167 vs reference 181 (-14 bytes, no whitespaces)

```js
function inc(obj) {
	return obj.count++;
}
function foo(bar) {
	var result = inc(bar);
	return foo.amount = bar.count, result;
}
var data = { count: 0 };
var answer = foo(data);
console.log(foo.amount, answer);

```

```diff
--- reference
+++ oxc
@@ -5,6 +5,5 @@
 	var result = inc(bar);
 	return foo.amount = bar.count, result;
 }
-var data = { count: 0 };
-var answer = foo(data);
+var answer = foo({ count: 0 });
 console.log(foo.amount, answer);

```

## `uglify/collapse_vars/issue_3744`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 91 (-14 bytes, no whitespaces)

```js
(function f(a) {
	({ get p() {
		switch (1) {
			case 0: f((a = 2, 3));
			case 1: console.log(function g(b) {
				return b || 'PASS';
			}());
		}
	} }).p;
})();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
-(function f(a) {
+(function(a) {
 	({ get p() {
-		switch (1) {
-			case 0: f();
-			case 1: console.log(b || 'PASS');
-		}
-		var b;
+		console.log(function(b) {
+			return b || 'PASS';
+		}());
 	} }).p;
 })();

```

## `uglify/const/do_continue`

- size: oxc 52 vs reference 66 (-14 bytes, no whitespaces)

```js
try {
	do {
		{
			const a = 0;
			continue;
		}
	} while ([A]);
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 try {
 	do {
-		const a = 0;
-		continue;
+		let a = 0;
 	} while ([A]);
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/default-values/issue_4510_1`

- tags: `remove unused`
- size: oxc 35 vs reference 49 (-14 bytes, no whitespaces)

```js
var a = [];
var [, b = console.log('PASS')] = [...a, null];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = [];
-var [, b = console.log('PASS')] = [...a, null];
+var [, b = console.log('PASS')] = [null];

```

## `uglify/destructured/side_effects_object`

- tags: `remove unused`
- size: oxc 55 vs reference 69 (-14 bytes, no whitespaces)

```js
var a = null, b = console, { c } = 42;
try {
	c[a = 'PASS'];
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var a = null, c = (console, 42 .c);
+var a = null, { c } = 42;
 try {
 	c[a = 'PASS'];
-} catch (e) {
+} catch {
 	console.log(a);
 }

```

## `uglify/functions/issue_5230`

- tags: `join vars`
- size: oxc 82 vs reference 96 (-14 bytes, no whitespaces)

```js
while (function() {
	function f(a) {
		var b = 42, c = (console, [a]);
		for (var k in c) c, console.log(b++);
	}
	f(f);
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-while (void (f = function(a) {
-	var b = 42;
-	console;
-	var a;
-	for (var k in a = [a]) console.log(b++);
-})(f));
-var f;
+for (; function() {
+	function f(a) {
+		var b = 42;
+		for (var k in [a]) console.log(b++);
+	}
+	f(f);
+}(););

```

## `uglify/issue-269/regexp`

- size: oxc 53 vs reference 67 (-14 bytes, no whitespaces)

```js
RegExp('foo');
RegExp('bar', 'ig');
RegExp(foo);
RegExp('bar', ig);
RegExp('should', 'fail');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-/foo/;
-/bar/gi;
 RegExp(foo);
 RegExp('bar', ig);
 RegExp('should', 'fail');

```

## `uglify/issue-640/conditional`

- tags: `pure functions`
- size: oxc 62 vs reference 76 (-14 bytes, no whitespaces)

```js
pure(1 | a() ? 2 & b() : 7 ^ c());
pure(1 | a() ? 2 & b() : 5);
pure(1 | a() ? 4 : 7 ^ c());
pure(1 | a() ? 4 : 5);
pure(3 ? 2 & b() : 7 ^ c());
pure(3 ? 2 & b() : 5);
pure(3 ? 4 : 7 ^ c());
pure(3 ? 4 : 5);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,6 @@
-1 | a() ? b() : c();
-1 | a() && b();
-1 | a() || c();
-a();
-3 ? b() : c();
-3 && b();
-3 || c();
-pure(3 ? 4 : 5);
+1 | a() ? 2 & b() : 7 ^ c();
+1 | a() && 2 & b();
+1 | a() || 7 ^ c();
+1 | a();
+2 & b();
+2 & b();

```

## `uglify/issue-640/iife_drop_side_effect_free`

- tags: `sequences`
- size: oxc 5 vs reference 19 (-14 bytes, no whitespaces)

```js
x = 42;
(function a() {})();
!function b() {}();
~function c() {}();
+function d() {}();
-function e() {}();
void function f() {}();
typeof function g() {}();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-x = 42, typeof void 0;
+x = 42;

```

## `uglify/labels/issue_4466_1`

- size: oxc 22 vs reference 36 (-14 bytes, no whitespaces)

```js
A: if (console.log('PASS')) B:;
else C:;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-e: if (console.log('PASS')) l:;
-else l:;
+A: console.log('PASS');

```

## `uglify/labels/issue_4466_1_v8`

- size: oxc 22 vs reference 36 (-14 bytes, no whitespaces)

```js
A: if (console.log('PASS')) B:;
else C:;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-e: if (console.log('PASS')) l:;
-else o:;
+A: console.log('PASS');

```

## `uglify/labels/issue_4466_2`

- size: oxc 20 vs reference 34 (-14 bytes, no whitespaces)

```js
if (console.log('PASS')) A:;
else B:;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-if (console.log('PASS')) e:;
-else e:;
+console.log('PASS');

```

## `uglify/labels/issue_4466_2_toplevel`

- size: oxc 20 vs reference 34 (-14 bytes, no whitespaces)

```js
if (console.log('PASS')) A:;
else B:;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-if (console.log('PASS')) e:;
-else e:;
+console.log('PASS');

```

## `uglify/labels/issue_4466_2_toplevel_v8`

- size: oxc 20 vs reference 34 (-14 bytes, no whitespaces)

```js
if (console.log('PASS')) A:;
else B:;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-if (console.log('PASS')) e:;
-else e:;
+console.log('PASS');

```

## `uglify/labels/issue_4466_2_v8`

- size: oxc 20 vs reference 34 (-14 bytes, no whitespaces)

```js
if (console.log('PASS')) A:;
else B:;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-if (console.log('PASS')) e:;
-else l:;
+console.log('PASS');

```

## `uglify/labels/issue_5878_3`

- size: oxc 20 vs reference 34 (-14 bytes, no whitespaces)

```js
if (console.log('PASS')) A:;
else B:;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-if (console.log('PASS')) A:;
-else B:;
+console.log('PASS');

```

## `uglify/merge_vars/switch_branch`

- tags: `join vars`
- size: oxc 73 vs reference 87 (-14 bytes, no whitespaces)

```js
console.log(function(a) {
	var b = 'FAIL', c;
	switch (a) {
		case 1:
			c = b;
			break;
	}
	return c || 'PASS';
}());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,5 @@
 console.log(function(a) {
 	var b = 'FAIL', c;
-	switch (a) {
-		case 1:
-			c = b;
-			break;
-	}
+	a === 1 && (c = b);
 	return c || 'PASS';
 }());

```

## `uglify/numbers/issue_3531_3`

- size: oxc 17 vs reference 31 (-14 bytes, no whitespaces)

```js
var a = '3';
console.log(1 - (2 + a));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = '3';
-console.log(1 - (2 + a));
+console.log(-22);

```

## `uglify/properties/mangle_debug_suffix`

- size: oxc 26 vs reference 40 (-14 bytes, no whitespaces)

```js
a.foo = 'bar';
x = { baz: 'ban' };

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-a._$foo$XYZ_ = 'bar';
-x = { _$baz$XYZ_: 'ban' };
+a.foo = 'bar';
+x = { baz: 'ban' };

```

## `uglify/reduce_vars/issue_3110_3`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 113 vs reference 127 (-14 bytes, no whitespaces)

```js
(function() {
	function foo() {
		return isDev ? 'foo' : 'bar';
	}
	console.log(foo());
	var isDev = true;
	var obj = { foo };
	console.log(obj.foo());
})();

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,6 @@
 		return isDev ? 'foo' : 'bar';
 	}
 	console.log(foo());
-	var isDev = true;
-	var obj = { foo };
-	console.log(obj.foo());
+	var isDev = !0;
+	console.log({ foo }.foo());
 })();

```

## `uglify/reduce_vars/issue_3974`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 51 (-14 bytes, no whitespaces)

```js
try {
	var a = 0 in 0;
	0 && a;
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 try {
-	var a = 0 in 0;
-	0 && a;
-} catch (e) {
+	0 in 0;
+} catch {
 	console.log('PASS');
 }

```

## `uglify/templates/ascii_only_templates`

- size: oxc 49 vs reference 63 (-14 bytes, no whitespaces)

```js
console.log(`\ud801\udc37\ud801𐐷${42}\u{10437}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(`\ud801\udc37\ud801\ud801\udc37${42}\ud801\udc37`);
+console.log(`\ud801\udc37\ud801𐐷42\u{10437}`);

```

## `uglify/unicode/escape_non_escaped_identifier`

- size: oxc 20 vs reference 34 (-14 bytes, no whitespaces)

```js
var µþ = 'µþ';
console.log(µþ);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var µþ = 'µþ';
-console.log(µþ);
+console.log('µþ');

```

## `uglify/unicode/non_escape_2_non_escape`

- size: oxc 20 vs reference 34 (-14 bytes, no whitespaces)

```js
var µþ = 'µþ';
console.log(µþ);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var µþ = 'µþ';
-console.log(µþ);
+console.log('µþ');

```

## `uglify/arrows/body_conditional`

- size: oxc 20 vs reference 35 (-15 bytes, no whitespaces)

```js
console.log(((a) => {}) ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(((a) => {}) ? 'PASS' : 'FAIL');
+console.log('PASS');

```

## `uglify/booleans/issue_5041_1`

- size: oxc 51 vs reference 66 (-15 bytes, no whitespaces)

```js
var a = 42;
if (a) {
	if ([a = null]) if (a) console.log('FAIL');
	else console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 42;
-a && [a = null] && (a ? console.log('FAIL') : console.log('PASS'));
+a && [a = null] && console.log(a ? 'FAIL' : 'PASS');

```

## `uglify/booleans/issue_5041_2`

- size: oxc 46 vs reference 61 (-15 bytes, no whitespaces)

```js
var a;
if (!a) {
	if (a = 42) if (a) console.log('PASS');
	else console.log('FAIL');
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-a || (a = 42) && (a ? console.log('PASS') : console.log('FAIL'));
+a || (a = 42) && console.log(a ? 'PASS' : 'FAIL');

```

## `uglify/classes/issue_4705`

- tags: `join vars`, `remove unused`
- size: oxc 20 vs reference 35 (-15 bytes, no whitespaces)

```js
var a = 'PASS';
class A {
	p = a = 'FAIL';
	[console.log(a)];
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-(class {
-	[console.log('PASS')]() {}
-});
+console.log('PASS');

```

## `uglify/comparisons/is_number_unsafe`

- size: oxc 33 vs reference 48 (-15 bytes, no whitespaces)

```js
console.log(Math.acos(42) !== 'foo'.charCodeAt(4));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(Math.acos(42) != 'foo'.charCodeAt(4));
+console.log(Math.acos(42) !== NaN);

```

## `uglify/conditionals/issue_3808_2`

- size: oxc 35 vs reference 50 (-15 bytes, no whitespaces)

```js
var a;
console.log((a = 'PASS', [] + '' && (a = 'FAIL')), a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-console.log((a = 'PASS', [] + '' && (a = 'FAIL')), a);
+console.log((a = 'PASS', ''), a);

```

## `uglify/drop-unused/iife`

- tags: `remove unused`
- size: oxc 0 vs reference 15 (-15 bytes, no whitespaces)

```js
function f() {
	var a;
	~function() {}(b);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	b;
-}

```

## `uglify/evaluate/threshold_evaluate_30`

- tags: `join vars`, `remove unused`
- size: oxc 75 vs reference 90 (-15 bytes, no whitespaces)

```js
function b(x) {
	return x + x + x;
}
console.log(b('1'), b(2), b(b(b('ABCDEFGHIJK'))));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function b(x) {
 	return x + x + x;
 }
-console.log('111', 6, b(b('ABCDEFGHIJKABCDEFGHIJKABCDEFGHIJK')));
+console.log(b('1'), b(2), b(b(b('ABCDEFGHIJK'))));

```

## `uglify/let/dead_block_after_return`

- size: oxc 51 vs reference 66 (-15 bytes, no whitespaces)

```js
'use strict';
(function(a) {
	console.log(a);
	return;
	{
		let a = 'FAIL';
	}
})('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,4 @@
 'use strict';
 (function(a) {
 	console.log(a);
-	return;
-	{
-		let a;
-	}
 })('PASS');

```

## `uglify/numbers/issue_3682_1`

- size: oxc 17 vs reference 32 (-15 bytes, no whitespaces)

```js
var a = -0;
console.log(1 / (a - 1 + 1));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = -0;
-console.log(1 / (a - 1 + 1));
+console.log(1 / 0);

```

## `uglify/properties/object_methods`

- size: oxc 134 vs reference 149 (-15 bytes, no whitespaces)

```js
({
	p() {
		console.log('FAIL 1');
	},
	*q() {
		console.log('FAIL 2');
	},
	async r() {
		console.log('FAIL 3');
	},
	async *s() {
		console.log('PASS');
	}
}).s().next();

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
-[
-	() => {
+({
+	p() {
 		console.log('FAIL 1');
 	},
-	function* () {
+	*q() {
 		console.log('FAIL 2');
 	},
-	async () => {
+	async r() {
 		console.log('FAIL 3');
 	},
-	async function* () {
+	async *s() {
 		console.log('PASS');
 	}
-][3]().next();
+}).s().next();

```

## `uglify/regexp/regexp_slashes`

- size: oxc 0 vs reference 15 (-15 bytes, no whitespaces)

```js
/\\\/rx\/\\/gi;

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-/\\\/rx\/\\/gi;

```

## `uglify/sequences/angularjs_chain`

- tags: `sequences`
- size: oxc 203 vs reference 218 (-15 bytes, no whitespaces)

```js
function nonComputedMember(left, right, context, create) {
	var lhs = left();
	if (create && create !== 1) {
		if (lhs && lhs[right] == null) {
			lhs[right] = {};
		}
	}
	var value = lhs != null ? lhs[right] : undefined;
	if (context) {
		return {
			context: lhs,
			name: right,
			value
		};
	} else {
		return value;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function nonComputedMember(left, right, context, create) {
 	var lhs = left();
-	create && 1 !== create && lhs && null == lhs[right] && (lhs[right] = {});
-	var value = null != lhs ? lhs[right] : void 0;
+	create && create !== 1 && lhs && lhs[right] == null && (lhs[right] = {});
+	var value = lhs?.[right];
 	return context ? {
 		context: lhs,
 		name: right,

```

## `uglify/sequences/call_drop_side_effect_free`

- tags: `sequences`
- size: oxc 310 vs reference 325 (-15 bytes, no whitespaces)

```js
var a = function() {
	return this;
}();
function b() {
	console.log('foo');
}
b.c = function() {
	console.log(this === b ? 'bar' : 'baz');
};
(a, b)();
(a, b).c();
(a, b.c)();
(a, b)['c']();
(a, b['c'])();
(a, function() {
	console.log(this === a);
})();
new (a, b)();
new (a, b).c();
new (a, b.c)();
new (a, b)['c']();
new (a, b['c'])();
new (a, function() {
	console.log(this === a);
})();
console.log(typeof (a, b).c);
console.log(typeof (a, b)['c']);

```

```diff
--- reference
+++ oxc
@@ -6,8 +6,8 @@
 }
 b.c = function() {
 	console.log(this === b ? 'bar' : 'baz');
-}, b(), b.c(), (0, b.c)(), b['c'](), (0, b['c'])(), function() {
+}, b(), b.c(), (0, b.c)(), b.c(), (0, b.c)(), function() {
 	console.log(this === a);
-}(), new b(), new b.c(), new b.c(), new b['c'](), new b['c'](), new function() {
+}(), new b(), new b.c(), new b.c(), new b.c(), new b.c(), new function() {
 	console.log(this === a);
-}(), console.log(typeof b.c), console.log(typeof b['c']);
+}(), console.log(typeof b.c), console.log(typeof b.c);

```

## `uglify/sequences/delete_seq_5`

- tags: `sequences`
- size: oxc 182 vs reference 197 (-15 bytes, no whitespaces)

```js
function f() {}
console.log(delete (f(), undefined));
console.log(delete (f(), void 0));
console.log(delete (f(), Infinity));
console.log(delete (f(), 1 / 0));
console.log(delete (f(), NaN));
console.log(delete (f(), 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 function f() {}
-console.log(delete void f()), console.log(delete void f()), console.log(delete (f(), Infinity)), console.log((f(), delete (1 / 0))), console.log(delete (f(), NaN)), console.log((f(), delete (0 / 0)));
+console.log(delete (0, undefined)), console.log(delete void 0), console.log(delete (0, Infinity)), console.log(delete (1 / 0)), console.log(delete (0, NaN)), console.log(delete NaN);

```

## `uglify/templates/issue_5199`

- tags: `join vars`, `remove unused`
- size: oxc 38 vs reference 53 (-15 bytes, no whitespaces)

```js
var a = function() {
	console.log(typeof b);
}``;
{
	const b = a;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
-var a = function() {
+(function() {
 	console.log(typeof b);
-}``;
-{
-	const b = a;
-}
+})``;

```

## `uglify/arrays/constructor_bad`

- size: oxc 212 vs reference 228 (-16 bytes, no whitespaces)

```js
try {
	Array(NaN);
	console.log('FAIL1');
} catch (ex) {
	try {
		new Array(NaN);
		console.log('FAIL2');
	} catch (ex) {
		console.log('PASS');
	}
}
try {
	Array(3.14);
	console.log('FAIL1');
} catch (ex) {
	try {
		new Array(3.14);
		console.log('FAIL2');
	} catch (ex) {
		console.log('PASS');
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,22 +1,22 @@
 try {
 	Array(NaN);
 	console.log('FAIL1');
-} catch (ex) {
+} catch {
 	try {
 		Array(NaN);
 		console.log('FAIL2');
-	} catch (ex) {
+	} catch {
 		console.log('PASS');
 	}
 }
 try {
 	Array(3.14);
 	console.log('FAIL1');
-} catch (ex) {
+} catch {
 	try {
 		Array(3.14);
 		console.log('FAIL2');
-	} catch (ex) {
+	} catch {
 		console.log('PASS');
 	}
 }

```

## `uglify/classes/issue_4683`

- size: oxc 45 vs reference 61 (-16 bytes, no whitespaces)

```js
'use strict';
for (class extends null {}; void console.log('PASS'););

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 'use strict';
-(class extends null {});
-void console.log('PASS');
+for (; void console.log('PASS'););

```

## `uglify/classes/unused_await`

- tags: `remove unused`
- size: oxc 60 vs reference 76 (-16 bytes, no whitespaces)

```js
var await = 'PASS';
(async function() {
	class A {
		static p = console.log(await);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
-var await = 'PASS';
 (async function() {
-	(class {
-		static c = console.log(await);
-	});
+	class A {
+		static p = console.log('PASS');
+	}
 })();

```

## `uglify/collapse_vars/issue_2203_1`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 104 (-16 bytes, no whitespaces)

```js
a = 'FAIL';
console.log({
	a: 'PASS',
	b: function() {
		return function(c) {
			return c.a;
		}((String, Object, this));
	}
}.b());

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 	b: function() {
 		return function(c) {
 			return c.a;
-		}((String, Object, this));
+		}(this);
 	}
 }.b());

```

## `uglify/collapse_vars/var_side_effects_2`

- tags: `join vars`, `remove unused`
- size: oxc 84 vs reference 100 (-16 bytes, no whitespaces)

```js
var print = console.log.bind(console);
function foo(x) {
	var twice = x.y * 2;
	print('Foo:', twice);
}
foo({ y: 10 });

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 var print = console.log.bind(console);
 function foo(x) {
-	var twice = 2 * x.y;
-	print('Foo:', twice);
+	print('Foo:', x.y * 2);
 }
 foo({ y: 10 });

```

## `uglify/const/issue_4290_1`

- tags: `remove unused`
- size: oxc 0 vs reference 16 (-16 bytes, no whitespaces)

```js
const a = 0;
var a;

```

```diff
--- reference
+++ oxc
@@ -1,2 +0,0 @@
-const a = 0;
-var a;

```

## `uglify/dead-code/issue_5030`

- size: oxc 103 vs reference 119 (-16 bytes, no whitespaces)

```js
(function(a, b) {
	a = function f() {
		if (a) if (b--) setImmediate(f);
		else console.log('FAIL');
		else console.log('PASS');
	}();
})(42, 1);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 (function(a, b) {
 	a = function f() {
-		if (a) if (b--) setImmediate(f);
-		else console.log('FAIL');
-		else console.log('PASS');
+		a ? b-- ? setImmediate(f) : console.log('FAIL') : console.log('PASS');
 	}();
 })(42, 1);

```

## `uglify/destructured/redefine_arguments_1`

- tags: `remove unused`
- size: oxc 0 vs reference 16 (-16 bytes, no whitespaces)

```js
function f([arguments]) {}

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-function f([]) {}

```

## `uglify/drop-unused/drop_toplevel_keep_assign`

- tags: `remove unused`
- size: oxc 15 vs reference 31 (-16 bytes, no whitespaces)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-var a, b = 1;
-a = 2;
-console.log(b = 3);
+console.log(3);

```

## `uglify/functions/inline_binary_and`

- size: oxc 136 vs reference 152 (-16 bytes, no whitespaces)

```js
console.log(function() {
	(function() {
		while (console.log('foo'));
		return 'bar';
	})() && (function() {
		while (console.log('baz'));
		return 'moo';
	})();
}());

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 console.log(function() {
-	if (function() {
-		while (console.log('foo'));
+	(function() {
+		for (; console.log('foo'););
 		return 'bar';
-	}()) {
-		while (console.log('baz'));
-		return void 'moo';
-		return;
-	} else return void 0;
+	})() && (function() {
+		for (; console.log('baz'););
+		return 'moo';
+	})();
 }());

```

## `uglify/issue-126/concatenate_rhs_strings`

- size: oxc 210 vs reference 226 (-16 bytes, no whitespaces)

```js
foo(bar() + 123 + 'Hello' + 'World');
foo(bar() + (123 + 'Hello') + 'World');
foo(bar() + 123 + 'Hello' + 'World');
foo(bar() + 123 + 'Hello' + 'World' + ('Foo' + 'Bar'));
foo('Foo' + 'Bar' + bar() + 123 + 'Hello' + 'World' + ('Foo' + 'Bar'));
foo('Hello' + bar() + 123 + 'World');
foo(bar() + 'Foo' + (10 + parseInt('10')));

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,6 @@
 foo(bar() + '123HelloWorld');
 foo(bar() + 123 + 'HelloWorld');
 foo(bar() + 123 + 'HelloWorldFooBar');
-foo('FooBar' + bar() + '123HelloWorldFooBar');
-foo('Hello' + bar() + '123World');
-foo(bar() + 'Foo' + (10 + parseInt('10')));
+foo('FooBar' + bar() + 123 + 'HelloWorldFooBar');
+foo('Hello' + bar() + 123 + 'World');
+foo(bar() + 'Foo20');

```

## `uglify/let/merge_vars_3`

- tags: `join vars`
- size: oxc 72 vs reference 88 (-16 bytes, no whitespaces)

```js
'use strict';
{
	let a = 0;
	var b = console;
	console.log(typeof b);
}
var a = 1;
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,6 @@
 'use strict';
 {
 	let a = 0;
-	var b = console;
-	console.log(typeof b);
+	console.log(typeof console);
 }
-var b = 1;
-console.log(typeof b);
+console.log('number');

```

## `uglify/let/merge_vars_4`

- tags: `join vars`
- size: oxc 72 vs reference 88 (-16 bytes, no whitespaces)

```js
'use strict';
var a = 1;
console.log(typeof a);
{
	var b = console;
	console.log(typeof b);
	let a = 0;
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,6 @@
 'use strict';
-var a = 1;
-console.log(typeof a);
+console.log('number');
 {
-	var b = console;
-	console.log(typeof b);
+	console.log(typeof console);
 	let a = 0;
 }

```

## `uglify/merge_vars/issue_4139`

- tags: `join vars`
- size: oxc 69 vs reference 85 (-16 bytes, no whitespaces)

```js
try {
	console.log;
} catch (e) {
	var a, arguments = 0;
} finally {
	a = typeof arguments;
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-try {
-	console.log;
-} catch (e) {
-	var a, arguments = 0;
+try {} catch {
+	var a, arguments;
 } finally {
 	a = typeof arguments;
 	console.log(a);

```

## `uglify/merge_vars/merge`

- tags: `join vars`
- size: oxc 105 vs reference 121 (-16 bytes, no whitespaces)

```js
var a = 'foo';
console.log(a);
function f(b) {
	var c;
	console.log(b);
	c = 'bar';
	console.log(c);
}
f('baz');
var d = 'moo';
console.log(d);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,9 @@
-var a = 'foo';
-console.log(a);
+console.log('foo');
 function f(b) {
-	var b;
-	console.log(b);
-	b = 'bar';
+	var c;
 	console.log(b);
+	c = 'bar';
+	console.log(c);
 }
 f('baz');
-var d = 'moo';
-console.log(d);
+console.log('moo');

```

## `uglify/merge_vars/merge_toplevel`

- tags: `join vars`
- size: oxc 105 vs reference 121 (-16 bytes, no whitespaces)

```js
var a = 'foo';
console.log(a);
function f(b) {
	var c;
	console.log(b);
	c = 'bar';
	console.log(c);
}
f('baz');
var d = 'moo';
console.log(d);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,9 @@
-var a = 'foo';
-console.log(a);
+console.log('foo');
 function f(b) {
-	var b;
-	console.log(b);
-	b = 'bar';
+	var c;
 	console.log(b);
+	c = 'bar';
+	console.log(c);
 }
 f('baz');
-var a = 'moo';
-console.log(a);
+console.log('moo');

```

## `uglify/nullish/issue_5266`

- size: oxc 89 vs reference 105 (-16 bytes, no whitespaces)

```js
[
	42,
	null,
	false,
	void 0,
	'FAIL'
].forEach(function(a) {
	a ?? function() {
		while (console.log(a));
	}();
});

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,11 @@
 [
 	42,
 	null,
-	false,
+	!1,
 	void 0,
 	'FAIL'
 ].forEach(function(a) {
-	if (null == a) {
-		while (console.log(a));
-		return;
-	} else return;
+	a ?? function() {
+		for (; console.log(a););
+	}();
 });

```

## `uglify/numbers/issue_3531_1`

- size: oxc 22 vs reference 38 (-16 bytes, no whitespaces)

```js
var a = '1';
console.log(typeof (a + 1 - .1 - .1 - .1));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = '1';
-console.log(typeof (a + 1 - .3));
+console.log('number');

```

## `uglify/spreads/issue_4361`

- tags: `join vars`, `remove unused`
- size: oxc 53 vs reference 69 (-16 bytes, no whitespaces)

```js
console.log(function() {
	var a = console.log('foo');
	console;
	var b = { ...a };
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
 console.log(function() {
-	var a = console.log('foo');
-	console;
-	({ ...a });
+	({ ...console.log('foo') });
 }());

```

## `uglify/transform/condition_evaluate`

- size: oxc 8 vs reference 24 (-16 bytes, no whitespaces)

```js
while (1 === 2);
for (; 1 == true;);
if (void 0 == null);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-while (0);
-for (; 1;);
-if (1);
+for (;;);

```

## `uglify/collapse_vars/call_1`

- tags: `join vars`
- size: oxc 41 vs reference 58 (-17 bytes, no whitespaces)

```js
(function(a) {
	a = console;
	(function() {})();
	a.log('PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function(a) {
-	(function() {})();
-	(a = console).log('PASS');
+	a = console;
+	a.log('PASS');
 })();

```

## `uglify/collapse_vars/issue_2954_3`

- tags: `join vars`
- size: oxc 98 vs reference 115 (-17 bytes, no whitespaces)

```js
var a = 'FAIL_1', b;
try {} finally {
	do {
		b = function() {
			throw new Error('PASS');
		}();
		a = 'FAIL_2';
		b && b.c;
	} while (0);
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 var a = 'FAIL_1', b;
-try {} finally {
-	do {
-		a = 'FAIL_2';
-		(b = function() {
-			throw new Error('PASS');
-		}()) && b.c;
-	} while (0);
-}
+do {
+	b = function() {
+		throw Error('PASS');
+	}();
+	a = 'FAIL_2';
+	b && b.c;
+} while (0);
 console.log(a);

```

## `uglify/const/issue_4222`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 77 (-17 bytes, no whitespaces)

```js
{
	const a = function() {
		return function() {};
	};
	var b = a();
}
b();
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,4 @@
-{
-	const a = function() {
-		return function() {};
-	};
-	var b = a();
-}
-b();
+(function() {
+	return function() {};
+})()();
 console.log(typeof a);

```

## `uglify/functions/issue_4659_1`

- tags: `join vars`
- size: oxc 86 vs reference 103 (-17 bytes, no whitespaces)

```js
var a = 0;
(function() {
	function f() {
		return a++;
	}
	(function() {
		f && f();
		(function() {
			var a = console && a;
		})();
	})();
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -3,9 +3,8 @@
 	function f() {
 		return a++;
 	}
-	f && a++;
 	(function() {
-		var a = console && a;
+		f && f();
 	})();
 })();
 console.log(a);

```

## `uglify/functions/new_target_2`

- size: oxc 104 vs reference 121 (-17 bytes, no whitespaces)

```js
new function(a) {
	if (!new.target) console.log('FAIL');
	else if (a) console.log('PASS');
	else new new.target(new.target.length);
}();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
 new function(a) {
-	if (!new.target) console.log('FAIL');
-	else if (a) console.log('PASS');
-	else new new.target(new.target.length);
+	new.target ? a ? console.log('PASS') : new new.target(new.target.length) : console.log('FAIL');
 }();

```

## `uglify/issue-1446/undefined_redefined`

- size: oxc 31 vs reference 48 (-17 bytes, no whitespaces)

```js
function f(undefined) {
	var n = 1;
	return typeof n == 'undefined';
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function f(undefined) {
-	var n = 1;
-	return void 0 === n;
+	return !1;
 }

```

## `uglify/preserve_line/return_5`

- size: oxc 84 vs reference 101 (-17 bytes, no whitespaces)

```js
_is_selected = function(tags, slug) {
	var ref;
	return (ref = _.find(tags, { slug })) != null ? ref.selected : void 0;
};

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 _is_selected = function(tags, slug) {
 	var ref;
-	return null != (ref = _.find(tags, { slug })) ? ref.selected : void 0;
+	return (ref = _.find(tags, { slug }))?.selected;
 };

```

## `uglify/preserve_line/return_6`

- size: oxc 84 vs reference 101 (-17 bytes, no whitespaces)

```js
_is_selected = function(tags, slug) {
	var ref;
	return (ref = _.find(tags, { slug })) != null ? ref.selected : void 0;
};

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 _is_selected = function(tags, slug) {
 	var ref;
-	return null != (ref = _.find(tags, { slug })) ? ref.selected : void 0;
+	return (ref = _.find(tags, { slug }))?.selected;
 };

```

## `uglify/reduce_vars/immutable`

- tags: `join vars`, `remove unused`
- size: oxc 31 vs reference 48 (-17 bytes, no whitespaces)

```js
!function() {
	var a = 'test';
	console.log(a.indexOf('e'));
}();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
-	console.log('test'.indexOf('e'));
-}();
+(function() {
+	console.log(1);
+})();

```

## `uglify/rename/issue_5787_1`

- size: oxc 64 vs reference 81 (-17 bytes, no whitespaces)

```js
console.log(function() {
	const a = 42;
	switch (a) {
		case 42:
			const a = 'PASS';
			return a;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 console.log(function() {
-	const a = 42;
-	switch (a) {
-		case 42:
-			const a = 'PASS';
-			return a;
+	let a = 42;
+	{
+		let a = 'PASS';
+		return 'PASS';
 	}
 }());

```

## `uglify/return_undefined/return_void`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 17 (-17 bytes, no whitespaces)

```js
function f() {
	function g() {
		h();
	}
	return g();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	h();
-}

```

## `uglify/sandbox/typeof_arguments_assigned`

- tags: `join vars`, `remove unused`
- size: oxc 15 vs reference 32 (-17 bytes, no whitespaces)

```js
var arguments = void 0;
console.log((typeof arguments).length);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('undefined'.length);
+console.log(9);

```

## `uglify/arrows/issue_5416_4`

- tags: `remove unused`
- size: oxc 56 vs reference 74 (-18 bytes, no whitespaces)

```js
var f = () => {
	(() => {
		var a = function g(arguments) {
			while (console.log(arguments));
		}();
	})();
};
f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
-var f = () => {
-	var arguments = void 0;
-	while (console.log(arguments));
-	return;
-};
-f();
+(function(arguments) {
+	for (; console.log(arguments););
+})();

```

## `uglify/awaits/issue_4454_2`

- tags: `join vars`
- size: oxc 81 vs reference 99 (-18 bytes, no whitespaces)

```js
function f(a) {
	(async function(b = console.log(a)) {})();
	var await = 42 .toString();
	console.log(await);
}
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function f(a) {
-	(async function(c = console.log(a)) {})();
-	var b = 42 .toString();
-	console.log(b);
+	(async function(b = console.log(a)) {})();
+	console.log('42');
 }
 f('PASS');

```

## `uglify/collapse_vars/issue_2364_1`

- tags: `join vars`, `pure getters`
- size: oxc 187 vs reference 205 (-18 bytes, no whitespaces)

```js
function inc(obj) {
	return obj.count++;
}
function foo() {
	var first = arguments[0];
	var result = inc(first);
	return foo.amount = first.count, result;
}
var data = { count: 0 };
var answer = foo(data);
console.log(foo.amount, answer);

```

```diff
--- reference
+++ oxc
@@ -2,10 +2,8 @@
 	return obj.count++;
 }
 function foo() {
-	var first = arguments[0];
-	var result = inc(first);
+	var first = arguments[0], result = inc(first);
 	return foo.amount = first.count, result;
 }
-var data = { count: 0 };
-var answer = foo(data);
+var answer = foo({ count: 0 });
 console.log(foo.amount, answer);

```

## `uglify/collapse_vars/issue_4852`

- tags: `join vars`
- size: oxc 83 vs reference 101 (-18 bytes, no whitespaces)

```js
var a = 'PASS';
(function(b) {
	switch (b = a) {
		case 42: try {
			console;
		} catch (b) {
			b.p;
		}
		case console.log(b):
	}
})('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,7 @@
 var a = 'PASS';
 (function(b) {
-	switch (a) {
-		case 42: try {
-			console;
-		} catch (b) {
-			b.p;
-		}
-		case console.log(a):
+	switch (b = 'PASS') {
+		case 42:
+		case console.log(b):
 	}
 })('FAIL');

```

## `uglify/conditionals/equality_conditionals_true`

- tags: `sequences`
- size: oxc 159 vs reference 177 (-18 bytes, no whitespaces)

```js
function f(a, b, c) {
	console.log(a == (b ? a : a), a == (b ? a : c), a != (b ? a : a), a != (b ? a : c), a === (b ? a : a), a === (b ? a : c), a !== (b ? a : a), a !== (b ? a : c));
}
f(0, 0, 0);
f(0, true, 0);
f(1, 2, 3);
f(1, null, 3);
f(NaN);
f(NaN, 'foo');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a, b, c) {
-	console.log((b, a == a), a == (b ? a : c), (b, a != a), a != (b ? a : c), (b, a === a), a === (b ? a : c), (b, a !== a), a !== (b ? a : c));
+	console.log(a == a, a == (b ? a : c), a != a, a != (b ? a : c), a === a, a === (b ? a : c), a !== a, a !== (b ? a : c));
 }
-f(0, 0, 0), f(0, true, 0), f(1, 2, 3), f(1, null, 3), f(NaN), f(NaN, 'foo');
+f(0, 0, 0), f(0, !0, 0), f(1, 2, 3), f(1, null, 3), f(NaN), f(NaN, 'foo');

```

## `uglify/conditionals/issue_1154`

- size: oxc 305 vs reference 323 (-18 bytes, no whitespaces)

```js
function f1(x) {
	return x ? -1 : -1;
}
function f2(x) {
	return x ? +2 : +2;
}
function f3(x) {
	return x ? ~3 : ~3;
}
function f4(x) {
	return x ? !4 : !4;
}
function f5(x) {
	return x ? void 5 : void 5;
}
function f6(x) {
	return x ? typeof 6 : typeof 6;
}
function g1() {
	return g() ? -1 : -1;
}
function g2() {
	return g() ? +2 : +2;
}
function g3() {
	return g() ? ~3 : ~3;
}
function g4() {
	return g() ? !4 : !4;
}
function g5() {
	return g() ? void 5 : void 5;
}
function g6() {
	return g() ? typeof 6 : typeof 6;
}

```

```diff
--- reference
+++ oxc
@@ -10,9 +10,7 @@
 function f4(x) {
 	return !1;
 }
-function f5(x) {
-	return;
-}
+function f5(x) {}
 function f6(x) {
 	return 'number';
 }
@@ -29,7 +27,7 @@
 	return g(), !1;
 }
 function g5() {
-	return void g();
+	g();
 }
 function g6() {
 	return g(), 'number';

```

## `uglify/const/if_dead_branch`

- size: oxc 43 vs reference 61 (-18 bytes, no whitespaces)

```js
console.log(function() {
	if (0) {
		const a = 0;
	}
	return typeof a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,3 @@
 console.log(function() {
-	0;
-	{
-		const a = void 0;
-	}
 	return typeof a;
 }());

```

## `uglify/const/legacy_scope`

- tags: `remove unused`
- size: oxc 0 vs reference 18 (-18 bytes, no whitespaces)

```js
{
	const a = 42;
}
var a;

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-{
-	const a = 42;
-}
-var a;

```

## `uglify/const/merge_vars_3`

- tags: `join vars`
- size: oxc 59 vs reference 77 (-18 bytes, no whitespaces)

```js
{
	const a = 0;
	var b = console;
	console.log(typeof b);
}
var a = 1;
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 {
-	const a = 0;
-	var b = console;
-	console.log(typeof b);
+	let a = 0;
+	console.log(typeof console);
 }
-var a = 1;
-console.log(typeof a);
+console.log('number');

```

## `uglify/const/merge_vars_4`

- tags: `join vars`
- size: oxc 59 vs reference 77 (-18 bytes, no whitespaces)

```js
var a = 1;
console.log(typeof a);
{
	var b = console;
	console.log(typeof b);
	const a = 0;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-var a = 1;
-console.log(typeof a);
+console.log('number');
 {
-	var b = console;
-	console.log(typeof b);
-	const a = 0;
+	console.log(typeof console);
+	let a = 0;
 }

```

## `uglify/hoist_props/issue_2473_1`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 18 (-18 bytes, no whitespaces)

```js
var x = {};
var y = [];
var z = {};

```

```diff
--- reference
+++ oxc
@@ -1,2 +0,0 @@
-var x = {};
-var y = [];

```

## `uglify/hoist_props/issue_2473_2`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 18 (-18 bytes, no whitespaces)

```js
var x = {};
var y = [];
var z = {};

```

```diff
--- reference
+++ oxc
@@ -1,2 +0,0 @@
-var x = {};
-var y = [];

```

## `uglify/issue-1105/with_in_global_scope`

- tags: `remove unused`
- size: oxc 33 vs reference 51 (-18 bytes, no whitespaces)

```js
var o = 42;
with(o) {
	var foo = 'something';
}
doSomething(o);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var o = 42;
-with(o) var foo = 'something';
+with(o) {}
 doSomething(o);

```

## `uglify/merge_vars/issue_4168`

- tags: `join vars`
- size: oxc 154 vs reference 172 (-18 bytes, no whitespaces)

```js
var o = {
	f: function(a, b, c) {
		var d = a.d;
		var e = b.e;
		var f = c.f;
		this.g(arguments);
		if (d) console.log(e, f);
	},
	g: function(args) {
		console.log(args[0], args[1], args[2]);
	}
};
o.f('PASS', true, 42);

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,10 @@
-var o = {
+({
 	f: function(a, b, c) {
-		var d = a.d;
-		var e = b.e;
-		var f = c.f;
+		var d = a.d, e = b.e, f = c.f;
 		this.g(arguments);
-		if (d) console.log(e, f);
+		d && console.log(e, f);
 	},
 	g: function(args) {
 		console.log(args[0], args[1], args[2]);
 	}
-};
-o.f('PASS', true, 42);
+}).f('PASS', !0, 42);

```

## `uglify/merge_vars/issue_4168_use_strict`

- tags: `join vars`
- size: oxc 167 vs reference 185 (-18 bytes, no whitespaces)

```js
'use strict';
var o = {
	f: function(a, b, c) {
		var d = a.d;
		var e = b.e;
		var f = c.f;
		this.g(arguments);
		if (d) console.log(e, f);
	},
	g: function(args) {
		console.log(args[0], args[1], args[2]);
	}
};
o.f('PASS', true, 42);

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,11 @@
 'use strict';
-var o = {
+({
 	f: function(a, b, c) {
-		var a = a.d;
-		var b = b.e;
-		var c = c.f;
+		var d = a.d, e = b.e, f = c.f;
 		this.g(arguments);
-		if (a) console.log(b, c);
+		d && console.log(e, f);
 	},
 	g: function(args) {
 		console.log(args[0], args[1], args[2]);
 	}
-};
-o.f('PASS', true, 42);
+}).f('PASS', !0, 42);

```

## `uglify/typeof/typeof_defined_1`

- size: oxc 32 vs reference 50 (-18 bytes, no whitespaces)

```js
'undefined' == typeof A && A;
'undefined' != typeof A && A;
'undefined' == typeof A || A;
'undefined' != typeof A || A;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-'undefined' == typeof A && A;
-'undefined' == typeof A && A;
+typeof A > 'u' && A;
+typeof A < 'u' || A;

```

## `uglify/varify/issue_4933_1`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 68 (-18 bytes, no whitespaces)

```js
console.log(f());
function f() {
	var a;
	for (console in a = [f]) {
		const b = a;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
-console.log(function f() {
-	var a;
-	for (console in a = [f]) {
-		const b = a;
-	}
-}());
+console.log(f());
+function f() {
+	for (console in [f]);
+}

```

## `uglify/yields/issue_4454_2`

- tags: `join vars`
- size: oxc 76 vs reference 94 (-18 bytes, no whitespaces)

```js
function f(a) {
	(function* (b = console.log(a)) {})();
	var yield = 42 .toString();
	console.log(yield);
}
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function f(a) {
-	(function* (c = console.log(a)) {})();
-	var b = 42 .toString();
-	console.log(b);
+	(function* (b = console.log(a)) {})();
+	console.log('42');
 }
 f('PASS');

```

## `uglify/yields/issue_4623`

- size: oxc 29 vs reference 47 (-18 bytes, no whitespaces)

```js
if (console ? function* () {} : 0) console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(console ? function* () {} : 0) && console.log('PASS');
+console && console.log('PASS');

```

## `uglify/yields/issue_5385_1`

- size: oxc 130 vs reference 148 (-18 bytes, no whitespaces)

```js
(async function* () {
	(function() {
		try {
			return console.log('foo');
		} finally {
			return console.log('bar');
		}
		console.log('baz');
	})();
})().next();
console.log('moo');

```

```diff
--- reference
+++ oxc
@@ -5,7 +5,6 @@
 		} finally {
 			return console.log('bar');
 		}
-		console.log('baz');
 	})();
 })().next();
 console.log('moo');

```

## `uglify/classes/issue_4982_2`

- size: oxc 20 vs reference 39 (-19 bytes, no whitespaces)

```js
var a = 'PASS';
try {} catch (e) {
	class A {
		static p = a = 'FAIL';
	}
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
-var a = 'PASS';
-{
-	class A {}
-}
-console.log(a);
+console.log('PASS');

```

## `uglify/conditionals/alternative_sequence_2`

- size: oxc 151 vs reference 170 (-19 bytes, no whitespaces)

```js
function f(x, y, a) {
	return x ? a : (console.log('seq'), y || a);
}
console.log(f(false, false, 1));
console.log(f(false, true, 2));
console.log(f(true, false, 3));
console.log(f(true, true, 4));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(x, y, a) {
-	return !x && (console.log('seq'), y) || a;
+	return x ? a : (console.log('seq'), y || a);
 }
-console.log(f(false, false, 1));
-console.log(f(false, true, 2));
-console.log(f(true, false, 3));
-console.log(f(true, true, 4));
+console.log(f(!1, !1, 1));
+console.log(f(!1, !0, 2));
+console.log(f(!0, !1, 3));
+console.log(f(!0, !0, 4));

```

## `uglify/conditionals/alternative_sequence_3`

- size: oxc 166 vs reference 185 (-19 bytes, no whitespaces)

```js
function f(x, y, a, b) {
	return x ? a : (console.log('seq'), y ? a : b);
}
console.log(f(false, false, 1, -1));
console.log(f(false, true, 2, -2));
console.log(f(true, false, 3, -3));
console.log(f(true, true, 4, -4));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(x, y, a, b) {
-	return x || (console.log('seq'), y) ? a : b;
+	return x ? a : (console.log('seq'), y ? a : b);
 }
-console.log(f(false, false, 1, -1));
-console.log(f(false, true, 2, -2));
-console.log(f(true, false, 3, -3));
-console.log(f(true, true, 4, -4));
+console.log(f(!1, !1, 1, -1));
+console.log(f(!1, !0, 2, -2));
+console.log(f(!0, !1, 3, -3));
+console.log(f(!0, !0, 4, -4));

```

## `uglify/conditionals/alternative_sequence_4`

- size: oxc 166 vs reference 185 (-19 bytes, no whitespaces)

```js
function f(x, y, a, b) {
	return x ? b : (console.log('seq'), y ? a : b);
}
console.log(f(false, false, 1, -1));
console.log(f(false, true, 2, -2));
console.log(f(true, false, 3, -3));
console.log(f(true, true, 4, -4));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(x, y, a, b) {
-	return !x && (console.log('seq'), y) ? a : b;
+	return x ? b : (console.log('seq'), y ? a : b);
 }
-console.log(f(false, false, 1, -1));
-console.log(f(false, true, 2, -2));
-console.log(f(true, false, 3, -3));
-console.log(f(true, true, 4, -4));
+console.log(f(!1, !1, 1, -1));
+console.log(f(!1, !0, 2, -2));
+console.log(f(!0, !1, 3, -3));
+console.log(f(!0, !0, 4, -4));

```

## `uglify/conditionals/consequent_sequence_2`

- size: oxc 151 vs reference 170 (-19 bytes, no whitespaces)

```js
function f(x, y, a) {
	return x ? (console.log('seq'), y || a) : a;
}
console.log(f(false, false, 1));
console.log(f(false, true, 2));
console.log(f(true, false, 3));
console.log(f(true, true, 4));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(x, y, a) {
-	return x && (console.log('seq'), y) || a;
+	return x ? (console.log('seq'), y || a) : a;
 }
-console.log(f(false, false, 1));
-console.log(f(false, true, 2));
-console.log(f(true, false, 3));
-console.log(f(true, true, 4));
+console.log(f(!1, !1, 1));
+console.log(f(!1, !0, 2));
+console.log(f(!0, !1, 3));
+console.log(f(!0, !0, 4));

```

## `uglify/conditionals/consequent_sequence_3`

- size: oxc 166 vs reference 185 (-19 bytes, no whitespaces)

```js
function f(x, y, a, b) {
	return x ? (console.log('seq'), y ? a : b) : b;
}
console.log(f(false, false, 1, -1));
console.log(f(false, true, 2, -2));
console.log(f(true, false, 3, -3));
console.log(f(true, true, 4, -4));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(x, y, a, b) {
-	return x && (console.log('seq'), y) ? a : b;
+	return x ? (console.log('seq'), y ? a : b) : b;
 }
-console.log(f(false, false, 1, -1));
-console.log(f(false, true, 2, -2));
-console.log(f(true, false, 3, -3));
-console.log(f(true, true, 4, -4));
+console.log(f(!1, !1, 1, -1));
+console.log(f(!1, !0, 2, -2));
+console.log(f(!0, !1, 3, -3));
+console.log(f(!0, !0, 4, -4));

```

## `uglify/conditionals/consequent_sequence_4`

- size: oxc 166 vs reference 185 (-19 bytes, no whitespaces)

```js
function f(x, y, a, b) {
	return x ? (console.log('seq'), y ? a : b) : a;
}
console.log(f(false, false, 1, -1));
console.log(f(false, true, 2, -2));
console.log(f(true, false, 3, -3));
console.log(f(true, true, 4, -4));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(x, y, a, b) {
-	return !x || (console.log('seq'), y) ? a : b;
+	return x ? (console.log('seq'), y ? a : b) : a;
 }
-console.log(f(false, false, 1, -1));
-console.log(f(false, true, 2, -2));
-console.log(f(true, false, 3, -3));
-console.log(f(true, true, 4, -4));
+console.log(f(!1, !1, 1, -1));
+console.log(f(!1, !0, 2, -2));
+console.log(f(!0, !1, 3, -3));
+console.log(f(!0, !0, 4, -4));

```

## `uglify/const/issue_4218`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 56 (-19 bytes, no whitespaces)

```js
{
	const a = function() {};
	var b = 0 * a;
}
console.log(typeof a, b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
-{
-	const a = function() {};
-	var b = 0 * a;
-}
-console.log(typeof a, b);
+console.log(typeof a, 0 * function() {});

```

## `uglify/const/issue_4365_1`

- tags: `remove unused`
- size: oxc 0 vs reference 19 (-19 bytes, no whitespaces)

```js
const arguments = 42;

```

```diff
--- reference
+++ oxc
@@ -1 +0,0 @@
-const arguments = 42;

```

## `uglify/functions/issue_2898`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 76 vs reference 95 (-19 bytes, no whitespaces)

```js
var c = 0;
(function() {
	while (f());
	function f() {
		var b = (c = 1 + c, void (c = 1 + c));
		b && b[0];
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var c = 0;
 (function() {
-	while (b = void 0, void ((b = void (c = 1 + (c = 1 + c))) && b[0]));
-	var b;
+	for (; f(););
+	function f() {
+		c = 1 + c, c = 1 + c;
+	}
 })(), console.log(c);

```

## `uglify/if_return/sequence_void_2`

- size: oxc 60 vs reference 79 (-19 bytes, no whitespaces)

```js
function f() {
	{
		if (console) return console, void console.log('PASS');
		return;
	}
	FAIL;
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,4 @@
 function f() {
-	if (console) console, void console.log('PASS');
-	else {
-		return;
-		FAIL;
-	}
+	if (console) return void console.log('PASS');
 }
 f();

```

## `uglify/issue-1105/Infinity_not_in_with_scope`

- tags: `remove unused`
- size: oxc 67 vs reference 86 (-19 bytes, no whitespaces)

```js
var o = { Infinity: 'FAIL' };
var vInfinity = 'Infinity';
vInfinity = Infinity;
console.log(vInfinity);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var o = { Infinity: 'FAIL' };
 var vInfinity = 'Infinity';
-vInfinity = 1 / 0;
+vInfinity = Infinity;
 console.log(vInfinity);

```

## `uglify/issue-2719/warn`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 98 vs reference 117 (-19 bytes, no whitespaces)

```js
function f() {
	return g();
}
function g() {
	return g['call' + 'er'].arguments;
}
// 3
console.log(f(1, 2, 3).length);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-// TypeError: Cannot read property 'arguments' of null
-console.log(function g() {
+function f() {
+	return g();
+}
+function g() {
 	return g.caller.arguments;
-}().length);
+}
+// 3
+console.log(f(1, 2, 3).length);

```

## `uglify/let/issue_5756_2`

- tags: `join vars`, `remove unused`
- size: oxc 73 vs reference 92 (-19 bytes, no whitespaces)

```js
'use strict';
function f() {
	let a = console.log('PASS');
	{
		var b;
		for (var c in b) {
			b;
			var c = function() {
				a;
			};
		}
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,7 @@
 'use strict';
-(function() {
-	let a = console.log('PASS'), b;
-	for (c in b) {
-		b;
-		var c = function() {
-			a;
-		};
-	}
-})();
+function f() {
+	console.log('PASS');
+	var b;
+	for (var c in b);
+}
+f();

```

## `uglify/reduce_vars/issue_3509`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 56 (-19 bytes, no whitespaces)

```js
function a() {
	console.log('PASS');
}
try {} catch (a) {
	var a;
}
a();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
-try {} catch (a) {
-	var a;
+function a() {
+	console.log('PASS');
 }
-(function() {
-	console.log('PASS');
-})();
+a();

```

## `uglify/awaits/negate`

- size: oxc 29 vs reference 49 (-20 bytes, no whitespaces)

```js
console && async function() {} && console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console && async function() {} && console.log('PASS');
+console && console.log('PASS');

```

## `uglify/collapse_vars/cond_branch_switch`

- tags: `join vars`
- size: oxc 29 vs reference 49 (-20 bytes, no whitespaces)

```js
var c = 0;
if (c = 1 + c, 0) switch (c = 1 + c) {}
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var c = 0;
-if (c = 1 + c, 0) switch (c = 1 + c) {}
+c = 1 + c;
 console.log(c);

```

## `uglify/conditionals/alternative_sequence_1`

- size: oxc 151 vs reference 171 (-20 bytes, no whitespaces)

```js
function f(x, y, a) {
	return x ? a : (console.log('seq'), y && a);
}
console.log(f(false, false, 1));
console.log(f(false, true, 2));
console.log(f(true, false, 3));
console.log(f(true, true, 4));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(x, y, a) {
-	return (x || (console.log('seq'), y)) && a;
+	return x ? a : (console.log('seq'), y && a);
 }
-console.log(f(false, false, 1));
-console.log(f(false, true, 2));
-console.log(f(true, false, 3));
-console.log(f(true, true, 4));
+console.log(f(!1, !1, 1));
+console.log(f(!1, !0, 2));
+console.log(f(!0, !1, 3));
+console.log(f(!0, !0, 4));

```

## `uglify/conditionals/issue_5673_1`

- tags: `join vars`, `remove unused`
- size: oxc 52 vs reference 72 (-20 bytes, no whitespaces)

```js
var a = 'PASS', b = null;
console.log(function(c) {
	return c || (b ? c : (c = a) && c);
}());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-var a = 'PASS', b = null;
 console.log(function(c) {
-	return c || (b || (c = a)) && c;
+	return c || (c = 'PASS') && c;
 }());

```

## `uglify/drop-unused/assign_chain`

- tags: `remove unused`
- size: oxc 0 vs reference 20 (-20 bytes, no whitespaces)

```js
function f() {
	var a, b;
	x = a = y = b = 42;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	x = y = 42;
-}

```

## `uglify/let/issue_4191`

- tags: `join vars`, `remove unused`
- size: oxc 35 vs reference 55 (-20 bytes, no whitespaces)

```js
'use strict';
{
	let a = function() {};
}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
 'use strict';
-{
-	let a = function() {};
-}
 console.log(typeof a);

```

## `uglify/loops/issue_4182_1`

- size: oxc 76 vs reference 96 (-20 bytes, no whitespaces)

```js
(function() {
	do {
		try {
			return;
		} finally {
			continue;
		}
		console.log('FAIL');
	} while (0);
	console.log('PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
 (function() {
-	do {
+	do
 		try {
 			return;
 		} finally {
 			continue;
 		}
-		console.log('FAIL');
-	} while (0);
+	while (0);
 	console.log('PASS');
 })();

```

## `uglify/merge_vars/issue_4628`

- tags: `join vars`
- size: oxc 58 vs reference 78 (-20 bytes, no whitespaces)

```js
(function() {
	try {
		console;
	} finally {
		var b = a;
	}
	for (var a in 'foo');
	console.log(b);
})();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,5 @@
 (function() {
-	try {
-		console;
-	} finally {
-		var b = a;
-	}
+	var b = a;
 	for (var a in 'foo');
 	console.log(b);
 })();

```

## `uglify/unicode/unicode_identifier_ascii_only`

- size: oxc 36 vs reference 56 (-20 bytes, no whitespaces)

```js
var a = 'testing 􁄑';
var bar = 'hello';
console.log(a, bar);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-var a = 'testing 􁄑';
-var bar = 'hello';
-console.log(a, bar);
+console.log('testing 􁄑', 'hello');

```

## `uglify/asm/asm_toplevel`

- size: oxc 24 vs reference 45 (-21 bytes, no whitespaces)

```js
'use asm';
0;
function f() {
	0;
	(function() {
		0;
	});
}
0;

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,2 @@
 'use asm';
-0;
-function f() {
-	0;
-	(function() {
-		0;
-	});
-}
-0;
+function f() {}

```

## `uglify/collapse_vars/collapse_vars_regexp`

- tags: `join vars`, `remove unused`
- size: oxc 419 vs reference 440 (-21 bytes, no whitespaces)

```js
function f1() {
	var k = 9;
	var rx = /[A-Z]+/;
	return [rx, k];
}
function f2() {
	var rx = /ab*/g;
	return function(s) {
		return rx.exec(s);
	};
}
function f3() {
	var rx = /ab*/g;
	return function() {
		return rx;
	};
}
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = /ab*/g;
	while (result = rx.exec(s)) console.log(result[0]);
})();
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = f2();
	while (result = rx(s)) console.log(result[0]);
})();
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = f3();
	while (result = rx().exec(s)) console.log(result[0]);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
-function f1() {
-	return [/[A-Z]+/, 9];
-}
 function f2() {
 	var rx = /ab*/g;
 	return function(s) {
@@ -14,14 +11,14 @@
 	};
 }
 (function() {
-	var result, rx = /ab*/g;
-	while (result = rx.exec('acdabcdeabbb')) console.log(result[0]);
+	var result, s = 'acdabcdeabbb', rx = /ab*/g;
+	for (; result = rx.exec(s);) console.log(result[0]);
 })();
 (function() {
-	var result, rx = f2();
-	while (result = rx('acdabcdeabbb')) console.log(result[0]);
+	var result, s = 'acdabcdeabbb', rx = f2();
+	for (; result = rx(s);) console.log(result[0]);
 })();
 (function() {
-	var result, rx = f3();
-	while (result = rx().exec('acdabcdeabbb')) console.log(result[0]);
+	var result, s = 'acdabcdeabbb', rx = f3();
+	for (; result = rx().exec(s);) console.log(result[0]);
 })();

```

## `uglify/conditionals/consequent_sequence_1`

- size: oxc 151 vs reference 172 (-21 bytes, no whitespaces)

```js
function f(x, y, a) {
	return x ? (console.log('seq'), y && a) : a;
}
console.log(f(false, false, 1));
console.log(f(false, true, 2));
console.log(f(true, false, 3));
console.log(f(true, true, 4));

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 function f(x, y, a) {
-	return (!x || (console.log('seq'), y)) && a;
+	return x ? (console.log('seq'), y && a) : a;
 }
-console.log(f(false, false, 1));
-console.log(f(false, true, 2));
-console.log(f(true, false, 3));
-console.log(f(true, true, 4));
+console.log(f(!1, !1, 1));
+console.log(f(!1, !0, 2));
+console.log(f(!0, !1, 3));
+console.log(f(!0, !0, 4));

```

## `uglify/evaluate/collapse_vars_regexp`

- tags: `join vars`, `remove unused`
- size: oxc 419 vs reference 440 (-21 bytes, no whitespaces)

```js
function f1() {
	var k = 9;
	var rx = /[A-Z]+/;
	return [rx, k];
}
function f2() {
	var rx = /ab*/g;
	return function(s) {
		return rx.exec(s);
	};
}
function f3() {
	var rx = /ab*/g;
	return function() {
		return rx;
	};
}
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = /ab*/g;
	while (result = rx.exec(s)) console.log(result[0]);
})();
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = f2();
	while (result = rx(s)) console.log(result[0]);
})();
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = f3();
	while (result = rx().exec(s)) console.log(result[0]);
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
-function f1() {
-	return [/[A-Z]+/, 9];
-}
 function f2() {
 	var rx = /ab*/g;
 	return function(s) {
@@ -14,14 +11,14 @@
 	};
 }
 (function() {
-	var result, rx = /ab*/g;
-	while (result = rx.exec('acdabcdeabbb')) console.log(result[0]);
+	var result, s = 'acdabcdeabbb', rx = /ab*/g;
+	for (; result = rx.exec(s);) console.log(result[0]);
 })();
 (function() {
-	var result, rx = f2();
-	while (result = rx('acdabcdeabbb')) console.log(result[0]);
+	var result, s = 'acdabcdeabbb', rx = f2();
+	for (; result = rx(s);) console.log(result[0]);
 })();
 (function() {
-	var result, rx = f3();
-	while (result = rx().exec('acdabcdeabbb')) console.log(result[0]);
+	var result, s = 'acdabcdeabbb', rx = f3();
+	for (; result = rx().exec(s);) console.log(result[0]);
 })();

```

## `uglify/exponentiation/issue_4715`

- size: oxc 188 vs reference 209 (-21 bytes, no whitespaces)

```js
A = 1;
console.log((-0) ** A + 0);
console.log((-0) ** A - 0);
console.log((-0) ** A * 1);
console.log((-0) ** A / 1);
console.log(Math.pow(-0, A) + 0);
console.log(Math.pow(-0, A) - 0);
console.log(Math.pow(-0, A) * 1);
console.log(Math.pow(-0, A) / 1);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 A = 1;
 console.log((-0) ** A + 0);
-console.log((-0) ** A);
+console.log((-0) ** A - 0);
+console.log((-0) ** A * 1);
+console.log((-0) ** A / 1);
+console.log((-0) ** A + 0);
+console.log((-0) ** A - 0);
 console.log((-0) ** A * 1);
-console.log((-0) ** A);
-console.log(Math.pow(-0, A) + 0);
-console.log(+Math.pow(-0, A));
-console.log(+Math.pow(-0, A));
-console.log(+Math.pow(-0, A));
+console.log((-0) ** A / 1);

```

## `uglify/issue-5614/conditional_property_write`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 95 (-21 bytes, no whitespaces)

```js
function f(a) {
	var o = {};
	if (a) o.p = console.log('foo');
	else o.q = console.log('bar');
	o.r = console.log('baz');
}
f(42);
f(null);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function f(a) {
-	if (a) console.log('foo');
-	else console.log('bar');
+	console.log(a ? 'foo' : 'bar');
 	console.log('baz');
 }
 f(42);

```

## `uglify/let/drop_unused`

- tags: `remove unused`
- size: oxc 33 vs reference 54 (-21 bytes, no whitespaces)

```js
'use strict';
function f(a) {
	let b = a, c = b;
	0 && c.p++;
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,2 @@
 'use strict';
-function f(a) {
-	let b = a;
-	b;
-}
-console.log(f());
+console.log(void 0);

```

## `uglify/loops/issue_4182_2`

- size: oxc 112 vs reference 133 (-21 bytes, no whitespaces)

```js
(function() {
	L: do {
		do {
			try {
				return;
			} finally {
				continue L;
			}
			console.log('FAIL');
		} while (0);
		console.log('FAIL');
	} while (0);
	console.log('PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 (function() {
 	L: do {
-		do {
+		do
 			try {
 				return;
 			} finally {
 				continue L;
 			}
-		} while (console.log('FAIL'), 0);
+		while (0);
 		console.log('FAIL');
 	} while (0);
 	console.log('PASS');

```

## `uglify/nullish/conditional_assignment_4`

- size: oxc 43 vs reference 64 (-21 bytes, no whitespaces)

```js
console.log(function(a) {
	!console ?? (a = 'FAIL');
	return a;
}('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 console.log(function(a) {
-	!console ?? (a = 'FAIL');
 	return a;
 }('PASS'));

```

## `uglify/arrows/issue_5416_3`

- tags: `remove unused`
- size: oxc 48 vs reference 70 (-22 bytes, no whitespaces)

```js
var f = () => {
	(() => {
		var a = function g(arguments) {
			console.log(arguments);
		}();
	})();
};
f();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,3 @@
-var f = () => {
-	arguments = void 0, console.log(arguments);
-	var arguments;
-};
-f();
+(function(arguments) {
+	console.log(arguments);
+})();

```

## `uglify/collapse_vars/assignment`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 22 (-22 bytes, no whitespaces)

```js
function f() {
	var a;
	a = x;
	return a;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	return x;
-}

```

## `uglify/const/issue_4191`

- tags: `join vars`, `remove unused`
- size: oxc 22 vs reference 44 (-22 bytes, no whitespaces)

```js
{
	const a = function() {};
}
console.log(typeof a);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-{
-	const a = function() {};
-}
 console.log(typeof a);

```

## `uglify/evaluate/issue_2535_1`

- tags: `sequences`
- size: oxc 98 vs reference 120 (-22 bytes, no whitespaces)

```js
if (x() || true || y()) z();
if ((x() || true) && y()) z();
if (x() && true || y()) z();
if (x() && true && y()) z();
if (x() || false || y()) z();
if ((x() || false) && y()) z();
if (x() && false || y()) z();
if (x() && false && y()) z();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1 @@
-if (x(), 1) z();
-if (x(), y()) z();
-if (x() || y()) z();
-if (x() && y()) z();
-if (x() || y()) z();
-if (x() && y()) z();
-if (x(), y()) z();
-if (x(), 0) z();
+x(), z(), x(), y() && z(), (x() || y()) && z(), x() && y() && z(), (x() || y()) && z(), x() && y() && z(), x(), y() && z(), x();

```

## `uglify/functions/issue_4233`

- tags: `join vars`, `remove unused`
- size: oxc 95 vs reference 117 (-22 bytes, no whitespaces)

```js
(function() {
	try {
		var a = function() {};
		try {
			throw 42;
		} catch (a) {
			(function() {
				console.log(typeof a);
			})();
			var a;
		}
	} catch (e) {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 (function() {
 	try {
-		var a = function() {};
 		try {
 			throw 42;
 		} catch (a) {
@@ -9,5 +8,5 @@
 			})();
 			var a;
 		}
-	} catch (e) {}
+	} catch {}
 })();

```

## `uglify/hoist_props/name_collision_2`

- tags: `join vars`
- size: oxc 113 vs reference 135 (-22 bytes, no whitespaces)

```js
var o = {
	p: 1,
	'+': function(x) {
		return x;
	},
	'-': function(x) {
		return x + 1;
	}
}, o__$0 = 2, o__$1 = 3;
console.log(o.p === o.p, o['+'](4), o['-'](5), o__$0, o__$1);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,10 @@
-var o, o_p = 1, o__ = function(x) {
-	return x;
-}, o__$2 = function(x) {
-	return x + 1;
-}, o__$0 = 2, o__$1 = 3;
-console.log(o_p === o_p, o__(4), o__$2(5), o__$0, o__$1);
+var o = {
+	p: 1,
+	'+': function(x) {
+		return x;
+	},
+	'-': function(x) {
+		return x + 1;
+	}
+};
+console.log(o.p === o.p, o['+'](4), o['-'](5), 2, 3);

```

## `uglify/let/issue_4305_1`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 82 (-22 bytes, no whitespaces)

```js
(function() {
	let arguments = function() {
		while (console.log('PASS'));
	};
	arguments();
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 (function() {
-	let arguments = function() {
-		while (console.log('PASS'));
-	};
-	arguments();
+	(function() {
+		for (; console.log('PASS'););
+	})();
 })();

```

## `uglify/let/issue_5950`

- tags: `join vars`, `remove unused`
- size: oxc 33 vs reference 55 (-22 bytes, no whitespaces)

```js
'use strict';
{
	let a;
	if (console.log('PASS')) {
		var b = function() {
			a;
		}, c = b;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,2 @@
 'use strict';
-{
-	let a;
-	console.log('PASS') && function() {
-		a;
-	};
-}
+console.log('PASS');

```

## `uglify/merge_vars/issue_4237_1`

- tags: `join vars`
- size: oxc 98 vs reference 120 (-22 bytes, no whitespaces)

```js
console.log(function(a) {
	do {
		var b = a++;
		if (b) return 'FAIL';
		continue;
		var c = 42;
	} while ('undefined' != typeof c);
	return 'PASS';
}(0));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 console.log(function(a) {
 	do {
-		var b = a++;
-		if (b) return 'FAIL';
+		if (a++) return 'FAIL';
 		continue;
-		var c = 42;
-	} while ('undefined' != typeof c);
+		var c;
+	} while (c !== void 0);
 	return 'PASS';
 }(0));

```

## `uglify/reduce_vars/defun_inline_3`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 0 vs reference 22 (-22 bytes, no whitespaces)

```js
function f() {
	return g(2);
	function g(b) {
		return b;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	return 2;
-}

```

## `uglify/unicode/unicode_escaped_identifier_2`

- size: oxc 25 vs reference 47 (-22 bytes, no whitespaces)

```js
var a = 'foo';
var 𐀀 = 'bar';
console.log(a, 𐀀);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-var a = 'foo';
-var 𐀀 = 'bar';
-console.log(a, 𐀀);
+console.log('foo', 'bar');

```

## `uglify/classes/issue_5878_4`

- size: oxc 37 vs reference 60 (-23 bytes, no whitespaces)

```js
'use strict';
console.log(typeof class {
	f() {}
	instanceof() {}
});

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
 'use strict';
-console.log(typeof class {
-	f() {}
-	instanceof() {}
-});
+console.log('function');

```

## `uglify/conditionals/issue_3808_1`

- size: oxc 20 vs reference 43 (-23 bytes, no whitespaces)

```js
var a;
a = 'PASS', [] + '' && (a = 'FAIL');
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-var a;
-a = [] + '' ? 'FAIL' : 'PASS';
-console.log(a);
+console.log('PASS');

```

## `uglify/const/drop_unused`

- tags: `remove unused`
- size: oxc 20 vs reference 43 (-23 bytes, no whitespaces)

```js
function f(a) {
	const b = a, c = b;
	0 && c.p++;
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
-function f(a) {
-	const b = a;
-	b;
-}
-console.log(f());
+console.log(void 0);

```

## `uglify/drop-unused/assign_binding`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 23 (-23 bytes, no whitespaces)

```js
function f() {
	var a;
	a = f.g, a();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	(0, f.g)();
-}

```

## `uglify/drop-unused/issue_1539`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 23 (-23 bytes, no whitespaces)

```js
function f() {
	var a, b;
	a = b = 42;
	return a;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	return 42;
-}

```

## `uglify/functions/issue_4171_2`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 111 (-23 bytes, no whitespaces)

```js
console.log(function(a) {
	try {
		while (a);
	} catch (e) {
		return function() {
			return e;
		};
	} finally {
		var e = function() {};
	}
}(!console));

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,9 @@
 console.log(function(a) {
 	try {
-		while (a);
+		for (; a;);
 	} catch (e) {
 		return function() {
 			return e;
 		};
-	} finally {
-		function e() {}
 	}
 }(!console));

```

## `uglify/numbers/issue_3682_3`

- size: oxc 23 vs reference 46 (-23 bytes, no whitespaces)

```js
var a = -0, b = 1, c = -1;
console.log(1 / (a - (+b + +c)));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a = -0, b = 1, c = -1;
-console.log(1 / (a - (+b + +c)));
+console.log(-Infinity);

```

## `uglify/classes/issue_5481`

- tags: `join vars`
- size: oxc 86 vs reference 110 (-24 bytes, no whitespaces)

```js
'use strict';
var a = 'FAIL 1', log = console.log;
try {
	a = 'PASS';
	(class extends 42 {});
	log('FAIL 2', a);
} catch (e) {
	log(a);
}

```

```diff
--- reference
+++ oxc
@@ -2,8 +2,7 @@
 var a = 'FAIL 1', log = console.log;
 try {
 	a = 'PASS';
-	(class extends 42 {});
 	log('FAIL 2', a);
-} catch (e) {
+} catch {
 	log(a);
 }

```

## `uglify/collapse_vars/call_2_symbol`

- tags: `join vars`
- size: oxc 66 vs reference 90 (-24 bytes, no whitespaces)

```js
(function(a) {
	function f() {
		return 42;
		console.log('FAIL');
	}
	a = console;
	f();
	a.log(typeof f);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 (function(a) {
 	function f() {
 		return 42;
-		console.log('FAIL');
 	}
-	f();
-	(a = console).log(typeof f);
+	a = console;
+	a.log(typeof f);
 })();

```

## `uglify/const/dead_block_after_return`

- size: oxc 32 vs reference 56 (-24 bytes, no whitespaces)

```js
(function(a) {
	console.log(a);
	return;
	{
		const a = 0;
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,3 @@
 (function(a) {
 	console.log(a);
-	return;
-	{
-		const a = void 0;
-	}
 })();

```

## `uglify/const/issue_4305_1`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 84 (-24 bytes, no whitespaces)

```js
(function() {
	const arguments = function() {
		while (console.log('PASS'));
	};
	arguments();
})();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 (function() {
-	const arguments = function() {
-		while (console.log('PASS'));
-	};
-	arguments();
+	(function() {
+		for (; console.log('PASS'););
+	})();
 })();

```

## `uglify/drop-unused/issue_1838`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 24 (-24 bytes, no whitespaces)

```js
function f() {
	var b = a;
	while (c);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	for (a; c;);
-}

```

## `uglify/functions/non_ascii_function_identifier_name`

- size: oxc 41 vs reference 65 (-24 bytes, no whitespaces)

```js
function fooλ(δλ) {}
function λ(δλ) {}
(function λ(δλ) {})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 function fooλ(δλ) {}
 function λ(δλ) {}
-(function λ(δλ) {})();

```

## `uglify/issue-611/issue_611`

- tags: `sequences`
- size: oxc 36 vs reference 60 (-24 bytes, no whitespaces)

```js
define(function() {
	function fn() {}
	if (fn()) {
		fn();
		return void 0;
	}
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 define(function() {
 	function fn() {}
-	if (fn()) return void fn();
 });

```

## `uglify/merge_vars/segment`

- tags: `join vars`
- size: oxc 103 vs reference 127 (-24 bytes, no whitespaces)

```js
var a = 'foo';
console.log(a);
for (var c, i = 0; i < 1; i++) {
	var b = 'bar';
	console.log(b);
	c = 'baz';
	console.log(c);
}
var d = 'moo';
console.log(d);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,7 @@
-var a = 'foo';
-console.log(a);
-for (var b, i = 0; i < 1; i++) {
-	var b = 'bar';
-	console.log(b);
-	b = 'baz';
-	console.log(b);
+console.log('foo');
+for (var c, i = 0; i < 1; i++) {
+	console.log('bar');
+	c = 'baz';
+	console.log(c);
 }
-var a = 'moo';
-console.log(a);
+console.log('moo');

```

## `uglify/reduce_vars/redefine_arguments_1`

- tags: `join vars`, `remove unused`
- size: oxc 134 vs reference 158 (-24 bytes, no whitespaces)

```js
function f() {
	var arguments;
	return typeof arguments;
}
function g() {
	var arguments = 42;
	return typeof arguments;
}
function h(x) {
	var arguments = x;
	return typeof arguments;
}
console.log(f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -6,7 +6,6 @@
 	return 'number';
 }
 function h(x) {
-	var arguments = x;
-	return typeof arguments;
+	return typeof x;
 }
 console.log(f(), g(), h());

```

## `uglify/regexp/instanceof_2`

- size: oxc 16 vs reference 40 (-24 bytes, no whitespaces)

```js
console.log(42 + /foo/ instanceof Object);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(42 + /foo/ instanceof Object);
+console.log(!1);

```

## `uglify/unicode/check_escape_style`

- size: oxc 86 vs reference 110 (-24 bytes, no whitespaces)

```js
var a = '';
var ꀈ1 = '';
var Ā = 'Ā';
var က = 'က';
var က = '𐀀';
var 㾀 = '􀀀';
console.log(a, ꀈ1, Ā, က, 㾀);

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,4 @@
 var ꀈ1 = '';
 var Ā = 'Ā';
 var က = 'က';
-var က = '𐀀';
-var 㾀 = '􀀀';
-console.log(a, ꀈ1, Ā, က, 㾀);
+console.log(a, ꀈ1, Ā, '𐀀', '􀀀');

```

## `uglify/hoist_props/name_collision_1`

- tags: `join vars`
- size: oxc 151 vs reference 176 (-25 bytes, no whitespaces)

```js
var obj_foo = 1;
var obj_bar = 2;
function f() {
	var obj = {
		foo: 3,
		bar: 4,
		'b-r': 5,
		'b+r': 6,
		'b!r': 7
	};
	console.log(obj_foo, obj.foo, obj.bar, obj['b-r'], obj['b+r'], obj['b!r']);
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,12 @@
-var obj_foo = 1;
-var obj_bar = 2;
+var obj_foo = 1, obj_bar = 2;
 function f() {
-	var obj, obj_foo$0 = 3, obj_bar = 4, obj_b_r = 5, obj_b_r$0 = 6, obj_b_r$1 = 7;
-	console.log(obj_foo, obj_foo$0, obj_bar, obj_b_r, obj_b_r$0, obj_b_r$1);
+	var obj = {
+		foo: 3,
+		bar: 4,
+		'b-r': 5,
+		'b+r': 6,
+		'b!r': 7
+	};
+	console.log(1, obj.foo, obj.bar, obj['b-r'], obj['b+r'], obj['b!r']);
 }
 f();

```

## `uglify/join_vars/issue_3789_2`

- tags: `join vars`
- size: oxc 69 vs reference 94 (-25 bytes, no whitespaces)

```js
try {
	c;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}
try {} catch (c) {
	try {} catch (c) {
		var a;
		c = 0;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,9 @@
 try {
 	c;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }
-try {} catch (c) {
-	try {} catch (c) {
-		var a;
-		c = 0;
-	}
+try {} catch {
+	var a;
 }

```

## `uglify/let/retain_catch`

- size: oxc 13 vs reference 38 (-25 bytes, no whitespaces)

```js
'use strict';
try {} catch (a) {
	let a = 'aa';
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
 'use strict';
-try {} catch (a) {
-	let a = 'aa';
-}

```

## `uglify/optional-chains/call`

- size: oxc 22 vs reference 47 (-25 bytes, no whitespaces)

```js
console.log?.(undefined?.(console.log('FAIL')));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log?.((void 0)?.(console.log('FAIL')));
+console.log?.(void 0);

```

## `uglify/optional-chains/sub`

- size: oxc 21 vs reference 46 (-25 bytes, no whitespaces)

```js
console?.['log'](null?.[console.log('FAIL')]);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console?.['log'](null?.[console.log('FAIL')]);
+console?.log(void 0);

```

## `uglify/reduce_vars/issue_5716_5`

- tags: `join vars`
- size: oxc 47 vs reference 72 (-25 bytes, no whitespaces)

```js
console.log(function() {
	return 0 || (a = 42 | a);
	var a = function() {
		return a;
	};
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
 console.log(function() {
-	return 0 || (a |= 42);
-	var a = function() {
-		return a;
-	};
+	return a = 42 | a;
+	var a;
 }());

```

## `uglify/awaits/issue_4454_1`

- tags: `join vars`
- size: oxc 81 vs reference 107 (-26 bytes, no whitespaces)

```js
function f(a) {
	(async function(b = console.log(a)) {})();
	var await = 42 .toString();
	console.log(await);
}
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function f(a) {
 	(async function(b = console.log(a)) {})();
-	var await = 42 .toString();
-	console.log(await);
+	console.log('42');
 }
 f('PASS');

```

## `uglify/conditionals/equality_conditionals_false`

- tags: `sequences`
- size: oxc 159 vs reference 185 (-26 bytes, no whitespaces)

```js
function f(a, b, c) {
	console.log(a == (b ? a : a), a == (b ? a : c), a != (b ? a : a), a != (b ? a : c), a === (b ? a : a), a === (b ? a : c), a !== (b ? a : a), a !== (b ? a : c));
}
f(0, 0, 0);
f(0, true, 0);
f(1, 2, 3);
f(1, null, 3);
f(NaN);
f(NaN, 'foo');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function f(a, b, c) {
-	console.log(a == (b ? a : a), a == (b ? a : c), a != (b ? a : a), a != (b ? a : c), a === (b ? a : a), a === (b ? a : c), a !== (b ? a : a), a !== (b ? a : c));
+	console.log(a == a, a == (b ? a : c), a != a, a != (b ? a : c), a === a, a === (b ? a : c), a !== a, a !== (b ? a : c));
 }
-f(0, 0, 0), f(0, true, 0), f(1, 2, 3), f(1, null, 3), f(NaN), f(NaN, 'foo');
+f(0, 0, 0), f(0, !0, 0), f(1, 2, 3), f(1, null, 3), f(NaN), f(NaN, 'foo');

```

## `uglify/dead-code/collapse_vars_assignment`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 0 vs reference 26 (-26 bytes, no whitespaces)

```js
function f0(c) {
	var a = 3 / c;
	return a = a;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f0(c) {
-	return 3 / c;
-}

```

## `uglify/dead-code/dead_code_2_should_warn`

- size: oxc 47 vs reference 73 (-26 bytes, no whitespaces)

```js
function f() {
	g();
	x = 10;
	throw new Error('foo');
	// completely discarding the `if` would introduce some
	// bugs.  UglifyJS v1 doesn't deal with this issue; in v2
	// we copy any declarations to the upper scope.
	if (x) {
		y();
		var x;
		function g() {}
		;
		// but nested declarations should not be kept.
		(function() {
			var q;
			function y() {}
			;
		})();
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,6 @@
 function f() {
-	g();
 	x = 10;
-	throw new Error('foo');
-	{
-		var x;
-		function g() {}
-		;
-	}
+	throw Error('foo');
+	var x;
 }
 f();

```

## `uglify/issue-5614/reassign_2`

- tags: `join vars`
- size: oxc 20 vs reference 46 (-26 bytes, no whitespaces)

```js
var a = 'PASS';
if (false) {
	a = null + 0;
	a();
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1 @@
-var a = 'PASS';
-if (false) {
-	a = 0;
-	a();
-}
-console.log(a);
+console.log('PASS');

```

## `uglify/loops/issue_1648`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 0 vs reference 26 (-26 bytes, no whitespaces)

```js
function f() {
	x();
	var b = 1;
	while (1);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	for (x(); 1;);
-}

```

## `uglify/merge_vars/conditional_chain_2`

- tags: `join vars`
- size: oxc 113 vs reference 139 (-26 bytes, no whitespaces)

```js
function f(a, b) {
	var c, d;
	if (a && (c = a)) console.log(c);
	else b || (d = b) ? console.log(c) : console.log(d);
}
f('', null);
f('', true);
f(42, null);
f(42, true);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,8 @@
 function f(a, b) {
-	var c, a;
-	if (a && (c = a)) console.log(c);
-	else b || (a = b) ? console.log(c) : console.log(a);
+	var c, d;
+	a && (c = a) || b || (d = b) ? console.log(c) : console.log(d);
 }
 f('', null);
-f('', true);
+f('', !0);
 f(42, null);
-f(42, true);
+f(42, !0);

```

## `uglify/typeof/issue_3817`

- tags: `2 iterations`
- size: oxc 73 vs reference 99 (-26 bytes, no whitespaces)

```js
if ('A' == typeof A || !console.log('PASS')) switch (false) {
	case 'undefined' == typeof A: console.log('FAIL');
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-if ('A' == typeof A || !console.log('PASS')) switch (false) {
-	case 'undefined' == typeof A: console.log('FAIL');
+if (!console.log('PASS')) switch (!1) {
+	case typeof A > 'u': console.log('FAIL');
 }

```

## `uglify/yields/issue_4454_1`

- tags: `join vars`
- size: oxc 76 vs reference 102 (-26 bytes, no whitespaces)

```js
function f(a) {
	(function* (b = console.log(a)) {})();
	var yield = 42 .toString();
	console.log(yield);
}
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 function f(a) {
 	(function* (b = console.log(a)) {})();
-	var yield = 42 .toString();
-	console.log(yield);
+	console.log('42');
 }
 f('PASS');

```

## `uglify/yields/issue_5710`

- size: oxc 86 vs reference 112 (-26 bytes, no whitespaces)

```js
(async function* () {
	try {
		switch (42) {
			case 42:
				{
					if (console.log('PASS')) return;
					return null;
				}
				break;
		}
	} finally {}
})().next();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,6 @@
 (async function* () {
 	try {
-		switch (42) {
-			case 42:
-				if (console.log('PASS')) return;
-				return null;
-				break;
-		}
+		if (console.log('PASS')) return;
+		return null;
 	} finally {}
 })().next();

```

## `uglify/classes/keep_extends_2`

- size: oxc 33 vs reference 60 (-27 bytes, no whitespaces)

```js
'use strict';
(class extends Function {});
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 'use strict';
-(class extends Function {});
 console.log('PASS');

```

## `uglify/classes/keep_extends_3`

- tags: `remove unused`
- size: oxc 33 vs reference 60 (-27 bytes, no whitespaces)

```js
'use strict';
class A extends Function {}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 'use strict';
-(class extends Function {});
 console.log('PASS');

```

## `uglify/const/retain_catch`

- size: oxc 0 vs reference 27 (-27 bytes, no whitespaces)

```js
try {} catch (a) {
	const a = 'aa';
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-try {} catch (a) {
-	const a = 'aa';
-}

```

## `uglify/drop-unused/unused_circular_references_1`

- tags: `remove unused`
- size: oxc 0 vs reference 27 (-27 bytes, no whitespaces)

```js
function f(x, y) {
	// circular reference
	function g() {
		return h();
	}
	function h() {
		return g();
	}
	return x + y;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(x, y) {
-	return x + y;
-}

```

## `uglify/drop-unused/unused_circular_references_3`

- tags: `remove unused`
- size: oxc 0 vs reference 27 (-27 bytes, no whitespaces)

```js
function f(x, y) {
	var g = function() {
		return h();
	};
	var h = function() {
		return g();
	};
	return x + y;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(x, y) {
-	return x + y;
-}

```

## `uglify/drop-unused/unused_nested_function`

- tags: `remove unused`
- size: oxc 0 vs reference 27 (-27 bytes, no whitespaces)

```js
function f(x, y) {
	function g() {
		something();
	}
	return x + y;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(x, y) {
-	return x + y;
-}

```

## `uglify/switches/drop_switch_3`

- size: oxc 40 vs reference 67 (-27 bytes, no whitespaces)

```js
console.log(function() {
	switch (0) {
		default: return 'PASS';
		case 1:
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,3 @@
 console.log(function() {
-	switch (0) {
-		default: return 'PASS';
-		case 1:
-	}
+	return 'PASS';
 }());

```

## `uglify/awaits/issue_4618`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 102 (-28 bytes, no whitespaces)

```js
console.log(typeof function() {
	var await = async function f() {
		console || f();
	};
	console.log;
	return await;
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 console.log(typeof function() {
-	var await = async function f() {
+	return async function f() {
 		console || f();
 	};
-	console.log;
-	return await;
 }());

```

## `uglify/bigint/minus_dot`

- size: oxc 31 vs reference 59 (-28 bytes, no whitespaces)

```js
console.log(typeof -42n.toString(), typeof (-42n).toString());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(typeof -42n.toString(), typeof (-42n).toString());
+console.log('number', 'string');

```

## `uglify/conditionals/issue_2535_2`

- size: oxc 371 vs reference 399 (-28 bytes, no whitespaces)

```js
function x() {}
function y() {
	return 'foo';
}
console.log(x() || true || y());
console.log(y() || true || x());
console.log((x() || true) && y());
console.log((y() || true) && x());
console.log(x() && true || y());
console.log(y() && true || x());
console.log(x() && true && y());
console.log(y() && true && x());
console.log(x() || false || y());
console.log(y() || false || x());
console.log((x() || false) && y());
console.log((y() || false) && x());
console.log(x() && false || y());
console.log(y() && false || x());
console.log(x() && false && y());
console.log(y() && false && x());

```

```diff
--- reference
+++ oxc
@@ -2,19 +2,19 @@
 function y() {
 	return 'foo';
 }
-console.log(x() || !0);
+console.log(!0);
 console.log(y() || !0);
-console.log((x(), y()));
-console.log((y(), x()));
-console.log(!!x() || y());
-console.log(!!y() || x());
-console.log(x() && y());
-console.log(y() && x());
-console.log(x() || y());
-console.log(y() || x());
-console.log(!!x() && y());
-console.log(!!y() && x());
-console.log((x(), y()));
-console.log((y(), x()));
-console.log(x() && !1);
+console.log(y());
+console.log(void 0);
+console.log(y());
+console.log(y() && !0 || void 0);
+console.log(void 0);
+console.log(y() && void 0);
+console.log(y());
+console.log(y() || void 0);
+console.log(!1);
+console.log((y() || !1) && void 0);
+console.log(y());
+console.log(void 0);
+console.log(void 0);
 console.log(y() && !1);

```

## `uglify/if_return/if_return_1`

- tags: `sequences`, `remove unused`
- size: oxc 0 vs reference 28 (-28 bytes, no whitespaces)

```js
function f(x) {
	if (x) {
		return true;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(x) {
-	if (x) return !0;
-}

```

## `uglify/if_return/if_return_5`

- tags: `sequences`, `remove unused`
- size: oxc 0 vs reference 28 (-28 bytes, no whitespaces)

```js
function f() {
	if (x) return;
	return 7;
	if (y) return j;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	if (!x) return 7;
-}

```

## `uglify/if_return/retain_catch`

- size: oxc 90 vs reference 118 (-28 bytes, no whitespaces)

```js
function f() {
	try {
		throw 42;
	} catch (e) {
		return console.log('foo');
	} finally {
		console.log('bar');
	}
	return console.log('foo');
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
 function f() {
 	try {
 		throw 42;
-	} catch (e) {
+	} catch {
 		return console.log('foo');
 	} finally {
 		console.log('bar');
 	}
-	return console.log('foo');
 }
 f();

```

## `uglify/if_return/retain_finally`

- size: oxc 158 vs reference 186 (-28 bytes, no whitespaces)

```js
function f() {
	try {
		return console.log('foo'), FAIL;
	} catch (e) {
		return console.log('bar'), 'FAIL';
	} finally {
		return console.log('baz'), console.log('moo');
	}
	return console.log('moo');
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,10 @@
 function f() {
 	try {
 		return console.log('foo'), FAIL;
-	} catch (e) {
+	} catch {
 		return console.log('bar'), 'FAIL';
 	} finally {
 		return console.log('baz'), console.log('moo');
 	}
-	return console.log('moo');
 }
 console.log(f());

```

## `uglify/merge_vars/issue_4237_2`

- tags: `join vars`
- size: oxc 129 vs reference 157 (-28 bytes, no whitespaces)

```js
console.log(function(a) {
	do {
		switch (0) {
			case 0: var b = a++;
			default: while (b) return 'FAIL';
		}
		try {
			var c = 0;
		} finally {
			continue;
		}
		var d = 0;
	} while ('undefined' != typeof d);
	return 'PASS';
}(0));

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,13 @@
 console.log(function(a) {
 	do {
-		switch (0) {
-			default:
-				var b = a++;
-				if (b) return 'FAIL';
-		}
+		var b = a++;
+		for (; b;) return 'FAIL';
 		try {
 			var c = 0;
 		} finally {
 			continue;
 		}
-		var d = 0;
-	} while ('undefined' != typeof d);
+		var d;
+	} while (d !== void 0);
 	return 'PASS';
 }(0));

```

## `uglify/reduce_vars/issue_5055_2`

- tags: `join vars`, `remove unused`
- size: oxc 38 vs reference 66 (-28 bytes, no whitespaces)

```js
var a = 'PASS';
function f() {
	console.log(a || 'FAIL');
}
f(0 && (a = 0)(f(this)));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var a = 'PASS';
 function f() {
-	console.log(a || 'FAIL');
+	console.log('PASS');
 }
-f(0 && (a = 0)(f()));
+f(0);

```

## `uglify/side_effects/issue_5912_3`

- tags: `join vars`
- size: oxc 69 vs reference 97 (-28 bytes, no whitespaces)

```js
var a = {};
a = a.p;
try {
	console;
} catch (e) {
	a.q;
}
try {
	a.r;
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,8 @@
 var a = {};
 a = a.p;
 try {
-	console;
-} catch (e) {
-	a.q;
-}
-try {
 	a.r;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/yields/issue_4618`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 96 (-28 bytes, no whitespaces)

```js
console.log(typeof function() {
	var yield = function* f() {
		console || f();
	};
	console.log;
	return yield;
}());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 console.log(typeof function() {
-	var yield = function* f() {
+	return function* f() {
 		console || f();
 	};
-	console.log;
-	return yield;
 }());

```

## `uglify/classes/issue_4721`

- size: oxc 58 vs reference 87 (-29 bytes, no whitespaces)

```js
'use strict';
var a = 'foo';
try {
	(class extends 42 {
		[a = 'bar']() {}
	});
} catch (e) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
 'use strict';
 var a = 'foo';
 try {
-	(class extends 42 {
-		[a = 'bar']() {}
-	});
-} catch (e) {
+	a = 'bar';
+} catch {
 	console.log(a);
 }

```

## `uglify/collapse_vars/cascade_call`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 29 (-29 bytes, no whitespaces)

```js
function f(a) {
	var b;
	return x((b = a, y(b)));
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(a) {
-	return x(y(a));
-}

```

## `uglify/optional-chains/reduce_vars_1`

- tags: `join vars`
- size: oxc 20 vs reference 49 (-29 bytes, no whitespaces)

```js
var a = 1;
null?.[a = 0];
console.log(a ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-var a = 1;
-null?.[a = 0];
-console.log(a ? 'PASS' : 'FAIL');
+console.log('PASS');

```

## `uglify/optional-chains/reduce_vars_2`

- tags: `join vars`
- size: oxc 20 vs reference 49 (-29 bytes, no whitespaces)

```js
var a = 1;
null?.(a = 0);
console.log(a ? 'PASS' : 'FAIL');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-var a = 1;
-null?.(a = 0);
-console.log(a ? 'PASS' : 'FAIL');
+console.log('PASS');

```

## `uglify/reduce_vars/issue_2992`

- tags: `join vars`
- size: oxc 59 vs reference 88 (-29 bytes, no whitespaces)

```js
var c = 'PASS';
(function f(b) {
	switch (0) {
		case 0:
		case b = 1: b && (c = 'FAIL');
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,5 @@
 var c = 'PASS';
-(function f(b) {
-	switch (0) {
-		case 0:
-		case b = 1: b && (c = 'FAIL');
-	}
+(function(b) {
+	b && (c = 'FAIL');
 })();
 console.log(c);

```

## `uglify/yields/issue_5684`

- size: oxc 72 vs reference 101 (-29 bytes, no whitespaces)

```js
(async function* () {
	switch (42) {
		default:
			if (console.log('PASS')) return;
			return null;
		case false:
	}
})().next();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
 (async function* () {
-	switch (42) {
-		default: return console.log('PASS') ? void 0 : null;
-		case false:
-	}
+	if (console.log('PASS')) return;
+	return null;
 })().next();

```

## `uglify/collapse_vars/undeclared_1`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 30 (-30 bytes, no whitespaces)

```js
function f(x, y) {
	var a;
	a = x;
	b = y;
	return b + a;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(x, y) {
-	return (b = y) + x;
-}

```

## `uglify/if_return/issue_5649`

- size: oxc 71 vs reference 101 (-30 bytes, no whitespaces)

```js
console.log(function() {
	try {
		throw new Error('FAIL');
	} catch (e) {
		return 'PASS';
	}
	throw new Error('FAIL');
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,7 @@
 console.log(function() {
 	try {
-		throw new Error('FAIL');
-	} catch (e) {
+		throw Error('FAIL');
+	} catch {
 		return 'PASS';
 	}
-	throw new Error('FAIL');
 }());

```

## `uglify/loops/in_parentheses_2`

- size: oxc 0 vs reference 30 (-30 bytes, no whitespaces)

```js
for ((function() {
	'foo' in {};
}); 0;);

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-for (function() {
-	'foo' in {};
-}; 0;);

```

## `uglify/sequences/cascade_assignment_in_return`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 30 (-30 bytes, no whitespaces)

```js
function f(a, b) {
	return a = x(), b(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(a, b) {
-	return b(x());
-}

```

## `uglify/collapse_vars/Infinity_assignment`

- tags: `join vars`
- size: oxc 16 vs reference 47 (-31 bytes, no whitespaces)

```js
var Infinity;
Infinity = 42;
console.log(Infinity);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-var Infinity;
-Infinity = 42;
-console.log(Infinity);
+console.log(42);

```

## `uglify/collapse_vars/undeclared_2`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 31 (-31 bytes, no whitespaces)

```js
function f(x, y) {
	var a;
	a = x;
	b = y;
	return a + b;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(x, y) {
-	return x + (b = y);
-}

```

## `uglify/sequences/negate_iife_for`

- tags: `sequences`
- size: oxc 60 vs reference 91 (-31 bytes, no whitespaces)

```js
(function() {})();
for (i = 0; i < 5; i++) console.log(i);
(function() {})();
for (; i < 10; i++) console.log(i);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-for (!function() {}(), i = 0; i < 5; i++) console.log(i);
-for (!function() {}(); i < 10; i++) console.log(i);
+for (i = 0; i < 5; i++) console.log(i);
+for (; i < 10; i++) console.log(i);

```

## `uglify/collapse_vars/undeclared_3`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 32 (-32 bytes, no whitespaces)

```js
function f(x, y) {
	var a;
	a = x;
	b = y;
	return b + a();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(x, y) {
-	return (b = y) + x();
-}

```

## `uglify/issue-597/NaN_and_Infinity_must_have_parens`

- size: oxc 0 vs reference 32 (-32 bytes, no whitespaces)

```js
Infinity.toString();
NaN.toString();

```

```diff
--- reference
+++ oxc
@@ -1,2 +0,0 @@
-(1 / 0).toString();
-NaN.toString();

```

## `uglify/issue-597/NaN_and_Infinity_must_have_parens_evaluate`

- size: oxc 0 vs reference 32 (-32 bytes, no whitespaces)

```js
(123456789 / 0).toString();
(+'foo').toString();

```

```diff
--- reference
+++ oxc
@@ -1,2 +0,0 @@
-(1 / 0).toString();
-NaN.toString();

```

## `uglify/nullish/conditional_assignment_2`

- size: oxc 20 vs reference 52 (-32 bytes, no whitespaces)

```js
var a, b = false;
a = 'PASS', b ?? (a = 'FAIL'), console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a, b = false;
-a = 'PASS', b ?? (a = 'FAIL'), console.log(a);
+console.log('PASS');

```

## `uglify/nullish/conditional_assignment_3`

- tags: `join vars`
- size: oxc 20 vs reference 52 (-32 bytes, no whitespaces)

```js
var a, b = false;
a = 'PASS', b ?? (a = 'FAIL'), console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var a, b = false, a = 'PASS';
-b ?? (a = 'FAIL'), console.log(a);
+console.log('PASS');

```

## `uglify/collapse_vars/undeclared_4`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 33 (-33 bytes, no whitespaces)

```js
function f(x, y) {
	var a;
	a = x;
	b = y;
	return a() + b;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function f(x, y) {
-	b = y;
-	return x() + b;
-}

```

## `uglify/const/issue_5516`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 87 (-33 bytes, no whitespaces)

```js
console.log(typeof function() {
	try {} catch (a) {
		(function f() {
			a;
		})();
	}
	{
		const a = function() {};
		return a;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,3 @@
 console.log(typeof function() {
-	try {} catch (a) {
-		void a;
-	}
-	{
-		const a = function() {};
-		return a;
-	}
+	return function() {};
 }());

```

## `uglify/drop-unused/drop_fnames`

- tags: `remove unused`
- size: oxc 0 vs reference 33 (-33 bytes, no whitespaces)

```js
function f() {
	return function g() {
		var a = g;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	return function() {};
-}

```

## `uglify/drop-unused/unused_circular_references_2`

- tags: `remove unused`
- size: oxc 0 vs reference 33 (-33 bytes, no whitespaces)

```js
function f(x, y) {
	var foo = 1, bar = baz, baz = foo + bar, qwe = moo();
	return x + y;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function f(x, y) {
-	moo();
-	return x + y;
-}

```

## `uglify/pure_getters/unsafe`

- tags: `pure getters`
- size: oxc 25 vs reference 58 (-33 bytes, no whitespaces)

```js
var a, b = null, c = {};
a.prop;
b.prop;
c.prop;
d.prop;
null.prop;
(void 0).prop;
undefined.prop;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
 var a, b = null, c = {};
-d;
-null.prop;
-(void 0).prop;
-(void 0).prop;
+d.prop;

```

## `uglify/pure_getters/unsafe_reduce_vars`

- tags: `join vars`, `pure getters`
- size: oxc 25 vs reference 58 (-33 bytes, no whitespaces)

```js
var a, b = null, c = {};
a.prop;
b.prop;
c.prop;
d.prop;
null.prop;
(void 0).prop;
undefined.prop;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
 var a, b = null, c = {};
-d;
-null.prop;
-(void 0).prop;
-(void 0).prop;
+d.prop;

```

## `uglify/reduce_vars/issue_2455`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 33 (-33 bytes, no whitespaces)

```js
function foo() {
	var that = this;
	for (;;) that.bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function foo() {
-	for (;;) this.bar();
-}

```

## `uglify/spreads/conditionals_farg_1`

- size: oxc 47 vs reference 80 (-33 bytes, no whitespaces)

```js
function log(msg) {
	console.log(msg);
}
var a = 42, b = ['PASS'], c = ['FAIL'];
a ? log(...b) : log(...c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function log(msg) {
 	console.log(msg);
 }
-var a = 42, b = ['PASS'], c = ['FAIL'];
-log(...a ? b : c);
+log('PASS');

```

## `uglify/switches/issue_5890`

- tags: `join vars`
- size: oxc 74 vs reference 107 (-33 bytes, no whitespaces)

```js
var a = {};
a.p;
try {
	switch (42) {
		default: a = null;
		case false: a.q;
	}
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,9 @@
 var a = {};
 a.p;
 try {
-	switch (42) {
-		default: a = null;
-		case false: a.q;
-	}
+	a = null;
+	a.q;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/const/mangle_catch_2`

- size: oxc 20 vs reference 54 (-34 bytes, no whitespaces)

```js
console.log(function f() {
	try {} catch (e) {
		const f = 0;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
-console.log(function o() {
-	try {} catch (c) {
-		const o = 0;
-	}
-}());
+console.log(void 0);

```

## `uglify/drop-unused/drop_toplevel_funcs`

- tags: `remove unused`
- size: oxc 15 vs reference 49 (-34 bytes, no whitespaces)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-var a, b = 1, c = g;
-a = 2;
-function g() {}
-console.log(b = 3);
+console.log(3);

```

## `uglify/functions/inlined_single_use`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 78 (-34 bytes, no whitespaces)

```js
console.log(function(f) {
	f();
}(function() {
	var a = function() {
		A;
	};
	var b = function() {
		a(B);
	};
	(function() {
		b;
	});
	var c = 42;
}));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,3 @@
 console.log(function(f) {
-	a = function() {
-		A;
-	}, b = function() {
-		a(B);
-	}, void 0;
-	var a, b;
-}());
+	f();
+}(function() {}));

```

## `uglify/issue-597/NaN_and_Infinity_should_not_be_replaced_when_they_are_redefined_evaluate`

- size: oxc 17 vs reference 51 (-34 bytes, no whitespaces)

```js
var Infinity, NaN;
(123456789 / 0).toString();
(+'foo').toString();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
 var Infinity, NaN;
-(1 / 0).toString();
-(0 / 0).toString();

```

## `uglify/collapse_vars/for_init`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 35 (-35 bytes, no whitespaces)

```js
function f(x, y) {
	var a = x;
	var b = y;
	for (a; b;);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function f(x, y) {
-	var b = y;
-	for (x; b;);
-}

```

## `uglify/collapse_vars/issue_2931`

- tags: `join vars`, `remove unused`
- size: oxc 20 vs reference 55 (-35 bytes, no whitespaces)

```js
console.log(function() {
	var a = function() {
		return;
	}();
	return a;
}());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
-console.log(function() {
-	return function() {
-		return;
-	}();
-}());
+console.log(void 0);

```

## `uglify/concat-strings/concat_2`

- size: oxc 56 vs reference 91 (-35 bytes, no whitespaces)

```js
console.log(1 + (2 + 3), 1 + (2 + '3'), 1 + ('2' + 3), 1 + ('2' + '3'), '1' + (2 + 3), '1' + (2 + '3'), '1' + ('2' + 3), '1' + ('2' + '3'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(1 + (2 + 3), 1 + (2 + '3'), 1 + '2' + 3, 1 + '2' + '3', '1' + (2 + 3), '1' + 2 + '3', '1' + '2' + 3, '1' + '2' + '3');
+console.log(6, '123', '123', '123', '15', '123', '123', '123');

```

## `uglify/const/use_before_init_3`

- size: oxc 11 vs reference 46 (-35 bytes, no whitespaces)

```js
try {
	a;
} catch (e) {
	console.log('PASS');
}
const a = 42;

```

```diff
--- reference
+++ oxc
@@ -1,6 +1 @@
-try {
-	a;
-} catch (e) {
-	console.log('PASS');
-}
 const a = 42;

```

## `uglify/let/use_before_init_3`

- size: oxc 22 vs reference 57 (-35 bytes, no whitespaces)

```js
'use strict';
try {
	a;
} catch (e) {
	console.log('PASS');
}
let a = 42;

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,2 @@
 'use strict';
-try {
-	a;
-} catch (e) {
-	console.log('PASS');
-}
 let a = 42;

```

## `uglify/merge_vars/issue_4130`

- tags: `join vars`
- size: oxc 75 vs reference 110 (-35 bytes, no whitespaces)

```js
var a = 2;
while (a) try {
	console.log(a);
} catch (e) {
	var b = 0;
} finally {
	b && console.log('FAIL');
	var c = --a;
	for (var k in c) c;
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,8 @@
 var a = 2;
-while (a) try {
+for (; a;) try {
 	console.log(a);
-} catch (e) {
+} catch {
 	var b = 0;
 } finally {
-	b && console.log('FAIL');
-	var c = --a;
-	for (var k in c);
+	for (var k in --a);
 }

```

## `uglify/reduce_vars/double_reference_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 0 vs reference 35 (-35 bytes, no whitespaces)

```js
function f() {
	var g = function g() {
		g();
	};
	g();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function f() {
-	(function g() {
-		g();
-	})();
-}

```

## `uglify/default-values/issue_5256`

- size: oxc 68 vs reference 105 (-37 bytes, no whitespaces)

```js
(function(arguments = console.log) {
	console;
})();
console.log(typeof arguments);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,2 @@
-// Syntax error on Node.js v6
-(function(arguments = console.log) {
-	console;
-})();
+(function(arguments = console.log) {})();
 console.log(typeof arguments);

```

## `uglify/drop-unused/drop_duplicated_var_catch`

- tags: `remove unused`
- size: oxc 0 vs reference 37 (-37 bytes, no whitespaces)

```js
function f() {
	try {
		x();
	} catch (a) {
		var a, a;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-function f() {
-	try {
-		x();
-	} catch (a) {
-		var a;
-	}
-}

```

## `uglify/drop-unused/unused_var_in_catch`

- tags: `remove unused`
- size: oxc 0 vs reference 37 (-37 bytes, no whitespaces)

```js
function foo() {
	try {
		foo();
	} catch (ex) {
		var x = 10;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function foo() {
-	try {
-		foo();
-	} catch (ex) {}
-}

```

## `uglify/if_return/if_return_3`

- tags: `sequences`, `remove unused`
- size: oxc 0 vs reference 37 (-37 bytes, no whitespaces)

```js
function f(x) {
	a();
	if (x) {
		b();
		return false;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(x) {
-	if (a(), x) return b(), !1;
-}

```

## `uglify/let/issue_5787`

- tags: `remove unused`
- size: oxc 40 vs reference 77 (-37 bytes, no whitespaces)

```js
console.log(function() {
	let a = 42;
	switch (a) {
		case 42:
			// Node.js v4 (vm): SyntaxError: Identifier 'a' has already been declared
			let a = 'PASS';
			return a;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,3 @@
 console.log(function() {
-	let a = 42;
-	switch (a) {
-		case 42:
-			let a = 'PASS';
-			return a;
-	}
+	return 'PASS';
 }());

```

## `uglify/let/issue_4276_2`

- tags: `remove unused`
- size: oxc 63 vs reference 101 (-38 bytes, no whitespaces)

```js
'use strict';
try {
	let a = f(), b;
	console.log('FAIL');
	function f() {
		return b;
	}
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,6 @@
 'use strict';
 try {
-	let a = f(), b;
 	console.log('FAIL');
-	function f() {
-		return b;
-	}
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/switches/issue_5892_1`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 98 (-38 bytes, no whitespaces)

```js
try {
	switch (42) {
		case null: var a = 'foo';
		default: a.p;
	}
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
 try {
-	switch (42) {
-		case null: var a = 'foo';
-		default: a.p;
-	}
+	a.p;
+	var a;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/switches/issue_5892_2`

- tags: `join vars`
- size: oxc 60 vs reference 98 (-38 bytes, no whitespaces)

```js
try {
	switch (42) {
		case null: var a = 'foo';
		default: a.p;
	}
	console.log('FAIL');
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
 try {
-	switch (42) {
-		case null: var a = 'foo';
-		default: a.p;
-	}
+	a.p;
+	var a;
 	console.log('FAIL');
-} catch (e) {
+} catch {
 	console.log('PASS');
 }

```

## `uglify/drop-unused/var_catch_redefined`

- tags: `remove unused`
- size: oxc 40 vs reference 79 (-39 bytes, no whitespaces)

```js
var a = 'FAIL';
try {
	throw 'PASS';
} catch (a) {
	function f() {
		return a;
	}
	console.log(a);
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,5 @@
-var a = 'FAIL';
 try {
 	throw 'PASS';
 } catch (a) {
-	function f() {
-		return a;
-	}
 	console.log(a);
 }
-f();

```

## `uglify/reduce_vars/func_inline`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 39 (-39 bytes, no whitespaces)

```js
function f() {
	var g = function() {
		return 1;
	};
	console.log(g() + h());
	var h = function() {
		return 2;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f() {
-	console.log(1 + (void 0)());
-}

```

## `uglify/collapse_vars/issue_3976`

- tags: `join vars`, `remove unused`
- size: oxc 20 vs reference 60 (-40 bytes, no whitespaces)

```js
function f() {
	console.log('FAIL');
}
(function(a) {
	function g() {
		if ((a = 0) || f(0)) {
			f();
		} else {
			f();
		}
		if (h(a = 0));
	}
	function h() {
		g();
	}
})();
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
-function f() {
-	console.log('FAIL');
-}
-void 0;
 console.log('PASS');

```

## `uglify/drop-console/drop_console_2`

- tags: `drop console`
- size: oxc 37 vs reference 77 (-40 bytes, no whitespaces)

```js
console.log('foo');
console.log.apply(console, arguments);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-// with regular compression these will be stripped out as well
-void 0;
-void 0;
+console.log.apply(console, arguments);

```

## `uglify/if_return/if_return_2`

- tags: `sequences`, `remove unused`
- size: oxc 0 vs reference 40 (-40 bytes, no whitespaces)

```js
function f(x, y) {
	if (x) return 3;
	if (y) return c();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(x, y) {
-	return x ? 3 : y ? c() : void 0;
-}

```

## `uglify/if_return/if_return_7`

- tags: `sequences`, `remove unused`
- size: oxc 0 vs reference 40 (-40 bytes, no whitespaces)

```js
function f(x) {
	if (x) {
		return true;
	}
	foo();
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function f(x) {
-	if (x) return !0;
-	foo(), bar();
-}

```

## `uglify/issue-640/drop_console_2`

- tags: `drop console`
- size: oxc 37 vs reference 77 (-40 bytes, no whitespaces)

```js
console.log('foo');
console.log.apply(console, arguments);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-// with regular compression these will be stripped out as well
-void 0;
-void 0;
+console.log.apply(console, arguments);

```

## `uglify/const/issue_5787`

- tags: `remove unused`
- size: oxc 40 vs reference 81 (-41 bytes, no whitespaces)

```js
console.log(function() {
	const a = 42;
	switch (a) {
		case 42:
			const a = 'PASS';
			return a;
	}
}());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,3 @@
 console.log(function() {
-	const a = 42;
-	switch (a) {
-		case 42:
-			const a = 'PASS';
-			return a;
-	}
+	return 'PASS';
 }());

```

## `uglify/indentation/mixed`

- size: oxc 20 vs reference 61 (-41 bytes, no whitespaces)

```js
switch (42) {
	case null: console.log('FAIL');
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-switch (42) {
-	case null: console.log('FAIL');
-}
 console.log('PASS');

```

## `uglify/indentation/numeric`

- size: oxc 20 vs reference 61 (-41 bytes, no whitespaces)

```js
switch (42) {
	case null: console.log('FAIL');
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-switch (42) {
-	case null: console.log('FAIL');
-}
 console.log('PASS');

```

## `uglify/indentation/spaces`

- size: oxc 20 vs reference 61 (-41 bytes, no whitespaces)

```js
switch (42) {
	case null: console.log('FAIL');
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-switch (42) {
-	case null: console.log('FAIL');
-}
 console.log('PASS');

```

## `uglify/indentation/tabs`

- size: oxc 20 vs reference 61 (-41 bytes, no whitespaces)

```js
switch (42) {
	case null: console.log('FAIL');
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1 @@
-switch (42) {
-	case null: console.log('FAIL');
-}
 console.log('PASS');

```

## `uglify/issue-1261/pure_function_calls`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 101 (-41 bytes, no whitespaces)

```js
// pure top-level IIFE will be dropped
(function() {
	console.log('iife0');
})();
// pure top-level IIFE assigned to unreferenced var will not be dropped
var iife1 = (function() {
	console.log('iife1');
	function iife1() {}
	return iife1;
})();
(function() {
	// pure IIFE in function scope assigned to unreferenced var will be dropped
	var iife2 = (function() {
		console.log('iife2');
		function iife2() {}
		return iife2;
	})();
})();
// comment #__PURE__ comment
bar(), baz(), quux();
a.b(), c.d.e(), f.g();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,3 @@
-var iife1 = function() {
-	console.log('iife1');
-	function iife1() {}
-	return iife1;
-}();
-baz(), quux();
+// comment #__PURE__ comment
+bar(), baz(), quux();
 a.b(), f.g();

```

## `uglify/issue-44/issue_44_valid_ast_1`

- tags: `remove unused`
- size: oxc 0 vs reference 41 (-41 bytes, no whitespaces)

```js
function a(b) {
	for (var i = 0, e = b.qoo();; i++) {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function a(b) {
-	var i = 0;
-	for (b.qoo();; i++);
-}

```

## `uglify/reduce_vars/double_reference_1`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 41 (-41 bytes, no whitespaces)

```js
function f() {
	var g = function g() {
		g();
	};
	g();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function f() {
-	var g = function g() {
-		g();
-	};
-	g();
-}

```

## `uglify/collapse_vars/issue_1605_2`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 42 (-42 bytes, no whitespaces)

```js
function foo(x) {
	var y = x;
	return y;
}
var o = new Object();
o.p = 1;

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function foo(x) {
-	return x;
-}
-new Object().p = 1;

```

## `uglify/collapse_vars/issue_2364_5`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 0 vs reference 42 (-42 bytes, no whitespaces)

```js
function f0(o, a, h) {
	var b = 3 - a;
	var obj = o;
	var seven = 7;
	var prop = 'run';
	var t = obj[prop](b)[seven] = h;
	return t;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f0(o, a, h) {
-	return o.run(3 - a)[7] = h;
-}

```

## `uglify/const/issue_4195`

- size: oxc 29 vs reference 71 (-42 bytes, no whitespaces)

```js
console.log(function f(a) {
	(function a() {
		{
			const b = f, a = 0;
			b;
		}
	})();
	a && f;
}());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1 @@
-console.log(function f(o) {
-	(function o() {
-		{
-			const n = f, o = 0;
-			n;
-		}
-	})();
-	o && f;
-}());
+console.log(function(a) {}());

```

## `uglify/drop-unused/keep_fnames`

- tags: `remove unused`, `keep function names`
- size: oxc 0 vs reference 42 (-42 bytes, no whitespaces)

```js
function foo() {
	return function bar(baz) {};
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function foo() {
-	return function bar(baz) {};
-}

```

## `uglify/issue-597/issue_1725`

- size: oxc 20 vs reference 62 (-42 bytes, no whitespaces)

```js
([].length === 0) % Infinity ? console.log('PASS') : console.log('FAIL');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-(0 === [].length) % (1 / 0) ? console.log('PASS') : console.log('FAIL');
+console.log('PASS');

```

## `uglify/issue-1052/single_function`

- size: oxc 0 vs reference 43 (-43 bytes, no whitespaces)

```js
(function() {
	if (!window) return;
	function f() {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-(function() {
-	if (!window);
-	function f() {}
-})();

```

## `uglify/pure_getters/collapse_vars_1_true`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 0 vs reference 43 (-43 bytes, no whitespaces)

```js
function f(a, b) {
	for (;;) {
		var c = a.g();
		var d = b.p;
		if (c || d) break;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(a, b) {
-	for (;;) if (a.g() || b.p) break;
-}

```

## `uglify/reduce_vars/issue_3068_2`

- tags: `join vars`
- size: oxc 48 vs reference 91 (-43 bytes, no whitespaces)

```js
(function() {
	do {
		try {
			while ('' == typeof a);
		} finally {
			continue;
		}
		var b = 'defined';
	} while (b && b.c);
})();

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,6 @@
 (function() {
 	do {
-		try {
-			while ('' == typeof a);
-		} finally {
-			continue;
-		}
-		var b = 'defined';
+		continue;
+		var b;
 	} while (b && b.c);
 })();

```

## `uglify/sequences/call`

- tags: `sequences`
- size: oxc 310 vs reference 353 (-43 bytes, no whitespaces)

```js
var a = function() {
	return this;
}();
function b() {
	console.log('foo');
}
b.c = function() {
	console.log(this === b ? 'bar' : 'baz');
};
(a, b)();
(a, b).c();
(a, b.c)();
(a, b)['c']();
(a, b['c'])();
(a, function() {
	console.log(this === a);
})();
new (a, b)();
new (a, b).c();
new (a, b.c)();
new (a, b)['c']();
new (a, b['c'])();
new (a, function() {
	console.log(this === a);
})();
console.log(typeof (a, b).c);
console.log(typeof (a, b)['c']);

```

```diff
--- reference
+++ oxc
@@ -6,8 +6,8 @@
 }
 b.c = function() {
 	console.log(this === b ? 'bar' : 'baz');
-}, a, b(), a, b.c(), (a, b.c)(), a, b['c'](), (a, b['c'])(), a, function() {
+}, b(), b.c(), (0, b.c)(), b.c(), (0, b.c)(), function() {
 	console.log(this === a);
-}(), a, new b(), a, new b.c(), a, new b.c(), a, new b['c'](), a, new b['c'](), a, new function() {
+}(), new b(), new b.c(), new b.c(), new b.c(), new b.c(), new function() {
 	console.log(this === a);
-}(), console.log((a, typeof b.c)), console.log((a, typeof b['c']));
+}(), console.log(typeof b.c), console.log(typeof b.c);

```

## `uglify/const/issue_4960`

- size: oxc 63 vs reference 107 (-44 bytes, no whitespaces)

```js
'use strict';
var a;
(function() {
	{
		const a = console.log('PASS');
	}
	try {} catch (e) {
		const a = console.log('FAIL');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,6 @@
 var a;
 (function() {
 	{
-		const o = console.log('PASS');
-	}
-	try {} catch (o) {
-		const c = console.log('FAIL');
+		let a = console.log('PASS');
 	}
 })();

```

## `uglify/hoist_vars/issue_2295`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 44 (-44 bytes, no whitespaces)

```js
function foo(o) {
	var a = o.a;
	if (a) return a;
	var a = 1;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function foo(o) {
-	var a = o.a;
-	if (a) return a;
-	a = 1;
-}

```

## `uglify/ie/issue_3355_1`

- size: oxc 32 vs reference 76 (-44 bytes, no whitespaces)

```js
(function f() {
	var f;
})();
(function g() {})();
console.log(typeof f === typeof g);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
-(function o() {
-	var o;
-})();
-(function o() {})();
-console.log(typeof f === typeof g);
+console.log(typeof f == typeof g);

```

## `uglify/ie/issue_3355_2`

- size: oxc 32 vs reference 76 (-44 bytes, no whitespaces)

```js
(function f() {
	var f;
})();
(function g() {})();
console.log(typeof f === typeof g);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1 @@
-(function f() {
-	var f;
-})();
-(function g() {})();
-console.log(typeof f === typeof g);
+console.log(typeof f == typeof g);

```

## `uglify/drop-unused/drop_toplevel_all_retain`

- tags: `remove unused`
- size: oxc 15 vs reference 60 (-45 bytes, no whitespaces)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1 @@
-var a;
-function f(d) {
-	return function() {
-		2;
-	};
-}
-a = 2;
 console.log(3);

```

## `uglify/drop-unused/drop_toplevel_retain`

- tags: `remove unused`
- size: oxc 15 vs reference 60 (-45 bytes, no whitespaces)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1 @@
-var a;
-function f(d) {
-	return function() {
-		2;
-	};
-}
-a = 2;
 console.log(3);

```

## `uglify/drop-unused/drop_toplevel_retain_array`

- tags: `remove unused`
- size: oxc 15 vs reference 60 (-45 bytes, no whitespaces)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1 @@
-var a;
-function f(d) {
-	return function() {
-		2;
-	};
-}
-a = 2;
 console.log(3);

```

## `uglify/drop-unused/drop_toplevel_retain_regex`

- tags: `remove unused`
- size: oxc 15 vs reference 60 (-45 bytes, no whitespaces)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1 @@
-var a;
-function f(d) {
-	return function() {
-		2;
-	};
-}
-a = 2;
 console.log(3);

```

## `uglify/drop-unused/global_var`

- tags: `remove unused`
- size: oxc 0 vs reference 45 (-45 bytes, no whitespaces)

```js
var a;
function foo(b) {
	a;
	b;
	c;
	typeof c === 'undefined';
	c + b + a;
	b && b.ar();
	return b;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-var a;
-function foo(b) {
-	c;
-	c;
-	b && b.ar();
-	return b;
-}

```

## `uglify/pure_funcs/unused`

- tags: `remove unused`, `pure functions`
- size: oxc 0 vs reference 45 (-45 bytes, no whitespaces)

```js
function foo() {
	var u = pure(1);
	var x = pure(2);
	var y = pure(x);
	var z = pure(pure(side_effects()));
	return pure(3);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function foo() {
-	side_effects();
-	return pure(3);
-}

```

## `uglify/collapse_vars/call_2`

- tags: `join vars`
- size: oxc 41 vs reference 87 (-46 bytes, no whitespaces)

```js
(function(a) {
	a = console;
	(function() {
		return 42;
		console.log('FAIL');
	})();
	a.log('PASS');
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,4 @@
 (function(a) {
-	(function() {
-		return 42;
-		console.log('FAIL');
-	})();
-	(a = console).log('PASS');
+	a = console;
+	a.log('PASS');
 })();

```

## `uglify/if_return/if_return_6`

- tags: `sequences`, `remove unused`
- size: oxc 0 vs reference 46 (-46 bytes, no whitespaces)

```js
function f(x) {
	return x ? true : void 0;
	return y;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-// suboptimal
-function f(x) {
-	return !!x || void 0;
-}

```

## `uglify/rests/issue_4544_1`

- tags: `keep function names`
- size: oxc 0 vs reference 46 (-46 bytes, no whitespaces)

```js
try {
	(function f(...[{}]) {})();
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-try {
-	[...[{}]] = [];
-} catch (e) {
-	console.log('PASS');
-}

```

## `uglify/directives/drop_lone_use_strict`

- tags: `remove unused`
- size: oxc 0 vs reference 47 (-47 bytes, no whitespaces)

```js
function f1() {
	'use strict';
}
function f2() {
	'use strict';
	function f3() {
		'use strict';
	}
}
(function f4() {
	'use strict';
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f1() {}
-function f2() {}
-(function() {})();

```

## `uglify/collapse_vars/issue_1605_1`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 48 (-48 bytes, no whitespaces)

```js
function foo(x) {
	var y = x;
	return y;
}
var o = new Object();
o.p = 1;

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function foo(x) {
-	return x;
-}
-var o = new Object();
-o.p = 1;

```

## `uglify/evaluate/unsafe_array`

- size: oxc 259 vs reference 307 (-48 bytes, no whitespaces)

```js
var a = 'PASS';
Array.prototype[1] = a;
console.log([,].length);
console.log('' + [, ,]);
console.log([
	1,
	,
	3
][1]);
console.log([
	1,
	2,
	3,
	a
] + 1);
console.log([
	1,
	2,
	3,
	4
] + 1);
console.log([
	1,
	2,
	3,
	a
][0] + 1);
console.log([
	1,
	2,
	3,
	4
][0] + 1);
console.log([
	1,
	2,
	3,
	4
][6 - 5] + 1);
console.log([
	1,
	,
	3,
	4
][6 - 5] + 1);
console.log([[1, 2], [3, 4]][0] + 1);
console.log([[1, 2], [3, 4]][6 - 5][1] + 1);
console.log([
	[1, 2],
	,
	[3, 4]
][6 - 5][1] + 1);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,8 @@
 var a = 'PASS';
 Array.prototype[1] = a;
-console.log([,].length);
-console.log('' + [, ,]);
-console.log([
-	1,
-	,
-	3
-][1]);
+console.log(1);
+console.log(',');
+console.log(void 0);
 console.log([
 	1,
 	2,
@@ -14,24 +10,10 @@
 	a
 ] + 1);
 console.log('1,2,3,41');
-console.log([
-	1,
-	2,
-	3,
-	a
-][0] + 1);
 console.log(2);
+console.log(2);
 console.log(3);
-console.log([
-	1,
-	,
-	3,
-	4
-][1] + 1);
+console.log(NaN);
 console.log('1,21');
 console.log(5);
-console.log([
-	[1, 2],
-	,
-	[3, 4]
-][1][1] + 1);
+console.log((void 0)[1] + 1);

```

## `uglify/conditionals/issue_5546_2`

- size: oxc 29 vs reference 78 (-49 bytes, no whitespaces)

```js
var a;
if (a) try {
	console;
} catch (e) {}
else try {
	console;
} finally {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,2 @@
 var a;
-if (a) try {
-	console;
-} catch (e) {}
-else try {
-	console;
-} finally {
-	console.log('PASS');
-}
+a || console.log('PASS');

```

## `uglify/html_comments/html_comment_in_string_literal`

- size: oxc 16 vs reference 65 (-49 bytes, no whitespaces)

```js
console.log('<!--HTML-->comment in<!--string literal-->'.length);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('<!--HTML-->comment in<!--string literal-->'.length);
+console.log(42);

```

## `uglify/if_return/if_return_4`

- tags: `sequences`, `remove unused`
- size: oxc 0 vs reference 50 (-50 bytes, no whitespaces)

```js
function f(x, y) {
	a();
	if (x) return 3;
	b();
	if (y) return c();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +0,0 @@
-function f(x, y) {
-	return a(), x ? 3 : (b(), y ? c() : void 0);
-}

```

## `uglify/issue-44/issue_44_valid_ast_2`

- tags: `remove unused`
- size: oxc 0 vs reference 50 (-50 bytes, no whitespaces)

```js
function a(b) {
	if (foo) for (var i = 0, e = b.qoo();; i++) {}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function a(b) {
-	if (foo) {
-		var i = 0;
-		for (b.qoo();; i++);
-	}
-}

```

## `uglify/reduce_vars/var_if`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 50 (-50 bytes, no whitespaces)

```js
function f() {
	if (x()) {
		var a;
		if (!g) a = true;
		if (a) g();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-function f() {
-	if (x()) {
-		var a;
-		if (!g) a = true;
-		if (a) g();
-	}
-}

```

## `uglify/issue-973/this_binding_collapse_vars`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 51 (-51 bytes, no whitespaces)

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

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function f() {
-	'use strict';
-	a();
-	(0, a.b)();
-	(0, eval)();
-}

```

## `uglify/side_effects/issue_2233_2`

- tags: `join vars`, `remove unused`
- size: oxc 31 vs reference 82 (-51 bytes, no whitespaces)

```js
var RegExp;
Array.isArray;
RegExp;
UndeclaredGlobal;
function foo() {
	var Number;
	AnotherUndeclaredGlobal;
	Math.sin;
	Number.isNaN;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,2 @@
-var RegExp;
+Array.isArray;
 UndeclaredGlobal;
-function foo() {
-	AnotherUndeclaredGlobal;
-	(void 0).isNaN;
-}

```

## `uglify/classes/issue_5015_1`

- size: oxc 19 vs reference 71 (-52 bytes, no whitespaces)

```js
'use strict';
var a;
try {
	(class a {
		[a]() {}
	});
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,2 @@
 'use strict';
 var a;
-try {
-	(class a {
-		[a]() {}
-	});
-} catch (e) {
-	console.log('PASS');
-}

```

## `uglify/issue-1833/iife_do`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 52 (-52 bytes, no whitespaces)

```js
function f() {
	function g() {
		L: do {
			break L;
		} while (1);
	}
	g();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-!function() {
-	!function() {
-		L: do {
-			break L;
-		} while (1);
-	}();
-}();

```

## `uglify/drop-unused/used_var_in_catch`

- tags: `remove unused`
- size: oxc 0 vs reference 53 (-53 bytes, no whitespaces)

```js
function foo() {
	try {
		foo();
	} catch (ex) {
		var x = 10;
	}
	return x;
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +0,0 @@
-function foo() {
-	try {
-		foo();
-	} catch (ex) {
-		var x = 10;
-	}
-	return x;
-}

```

## `uglify/classes/keep_extends_1`

- tags: `remove unused`
- size: oxc 13 vs reference 67 (-54 bytes, no whitespaces)

```js
'use strict';
try {
	class A extends 42 {}
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1 @@
 'use strict';
-try {
-	(class extends 42 {});
-} catch (e) {
-	console.log('PASS');
-}

```

## `uglify/comparisons/issue_2857_1`

- size: oxc 88 vs reference 142 (-54 bytes, no whitespaces)

```js
a === undefined || a === null;
a === undefined || a !== null;
a !== undefined || a === null;
a !== undefined || a !== null;
a === undefined && a === null;
a === undefined && a !== null;
a !== undefined && a === null;
a !== undefined && a !== null;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-null == a;
-void 0 === a || null !== a;
-void 0 !== a || null === a;
-void 0 !== a || null !== a;
-void 0 === a && null === a;
-void 0 === a && null !== a;
-void 0 !== a && null === a;
-null != a;
+a;
+a === void 0 || a;
+a !== void 0 || a;
+a !== void 0 || a;
+a === void 0 && a;
+a === void 0 && a;
+a !== void 0 && a;
+a;

```

## `uglify/comparisons/issue_2857_5`

- size: oxc 112 vs reference 166 (-54 bytes, no whitespaces)

```js
p || a === undefined || a === null;
p || a === undefined || a !== null;
p || a !== undefined || a === null;
p || a !== undefined || a !== null;
p || a === undefined && a === null;
p || a === undefined && a !== null;
p || a !== undefined && a === null;
p || a !== undefined && a !== null;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-p || null == a;
-p || void 0 === a || null !== a;
-p || void 0 !== a || null === a;
-p || void 0 !== a || null !== a;
-p || void 0 === a && null === a;
-p || void 0 === a && null !== a;
-p || void 0 !== a && null === a;
-p || null != a;
+p || a;
+p || a === void 0 || a;
+p || a !== void 0 || a;
+p || a !== void 0 || a;
+p || a === void 0 && a;
+p || a === void 0 && a;
+p || a !== void 0 && a;
+p || a;

```

## `uglify/switches/issue_1705_1`

- size: oxc 0 vs reference 54 (-54 bytes, no whitespaces)

```js
var a = 0;
switch (a) {
	default: console.log('FAIL');
	case 0: break;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-var a = 0;
-switch (a) {
-	default: console.log('FAIL');
-	case 0:
-}

```

## `uglify/comparisons/issue_2857_6`

- size: oxc 124 vs reference 179 (-55 bytes, no whitespaces)

```js
p && a === undefined || a === null;
p && a === undefined || a !== null;
p && a !== undefined || a === null;
p && a !== undefined || a !== null;
p && a === undefined && a === null;
p && a === undefined && a !== null;
p && a !== undefined && a === null;
p && a !== undefined && a !== null;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-p && void 0 === a || null === a;
-p && void 0 === a || null !== a;
-p && void 0 !== a || null === a;
-p && void 0 !== a || null !== a;
-p && void 0 === a && null === a;
-p && void 0 === a && null !== a;
-p && void 0 !== a && null === a;
-p && null != a;
+p && a === void 0 || a;
+p && a === void 0 || a;
+p && a !== void 0 || a;
+p && a !== void 0 || a;
+p && a === void 0 && a;
+p && a === void 0 && a;
+p && a !== void 0 && a;
+p && a;

```

## `uglify/drop-unused/vardef_value`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 57 (-57 bytes, no whitespaces)

```js
function f() {
	function g() {
		return x();
	}
	var a = g();
	return a(42);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function f() {
-	var a = function() {
-		return x();
-	}();
-	return a(42);
-}

```

## `uglify/properties/mangle_debug_suffix_keep_quoted`

- size: oxc 162 vs reference 219 (-57 bytes, no whitespaces)

```js
a.top = 1;
function f1() {
	a['foo'] = 'bar';
	a.color = 'red';
	a.stuff = 2;
	x = {
		'bar': 10,
		size: 7
	};
	a.size = 9;
}
function f2() {
	a.foo = 'bar';
	a['color'] = 'red';
	x = {
		bar: 10,
		size: 7
	};
	a.size = 9;
	a.stuff = 3;
}

```

```diff
--- reference
+++ oxc
@@ -1,21 +1,21 @@
-a._$top$XYZ_ = 1;
+a.top = 1;
 function f1() {
-	a['foo'] = 'bar';
+	a.foo = 'bar';
 	a.color = 'red';
-	a._$stuff$XYZ_ = 2;
+	a.stuff = 2;
 	x = {
-		'bar': 10,
-		_$size$XYZ_: 7
+		bar: 10,
+		size: 7
 	};
-	a._$size$XYZ_ = 9;
+	a.size = 9;
 }
 function f2() {
 	a.foo = 'bar';
-	a['color'] = 'red';
+	a.color = 'red';
 	x = {
 		bar: 10,
-		_$size$XYZ_: 7
+		size: 7
 	};
-	a._$size$XYZ_ = 9;
-	a._$stuff$XYZ_ = 3;
+	a.size = 9;
+	a.stuff = 3;
 }

```

## `uglify/ie/issue_3215_1`

- size: oxc 65 vs reference 123 (-58 bytes, no whitespaces)

```js
console.log(function foo() {
	var bar = function bar(name) {
		return 'PASS';
	};
	try {
		'moo';
	} catch (e) {
		bar = function bar(name) {
			return 'FAIL';
		};
	}
	return bar;
}()());

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,5 @@
-console.log(function n() {
-	var o = function n(o) {
+console.log(function() {
+	return function(name) {
 		return 'PASS';
 	};
-	try {
-		'moo';
-	} catch (n) {
-		o = function n(o) {
-			return 'FAIL';
-		};
-	}
-	return o;
 }()());

```

## `uglify/drop-unused/issue_2288`

- tags: `remove unused`
- size: oxc 0 vs reference 59 (-59 bytes, no whitespaces)

```js
function foo(o) {
	for (var j = o.a, i = 0; i < 0; i++);
	for (var i = 0; i < 0; i++);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function foo(o) {
-	o.a;
-	for (var i = 0; i < 0; i++);
-	for (i = 0; i < 0; i++);
-}

```

## `uglify/hoist_vars/sequences_funs`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 59 (-59 bytes, no whitespaces)

```js
function f() {
	var a = 1, b = 2;
	function g() {}
	var c = 3;
	return g(a, b, c);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function f() {
-	function g() {}
-	var a = 1, b = 2, c = 3;
-	return g(a, b, c);
-}

```

## `uglify/hoist_vars/statements`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 59 (-59 bytes, no whitespaces)

```js
function f() {
	var a = 1;
	var b = 2;
	var c = 3;
	function g() {}
	return g(a, b, c);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function f() {
-	var a = 1, b = 2, c = 3;
-	function g() {}
-	return g(a, b, c);
-}

```

## `uglify/hoist_vars/statements_funs`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 59 (-59 bytes, no whitespaces)

```js
function f() {
	var a = 1;
	var b = 2;
	var c = 3;
	function g() {}
	return g(a, b, c);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function f() {
-	function g() {}
-	var a = 1, b = 2, c = 3;
-	return g(a, b, c);
-}

```

## `uglify/ie/issue_3215_2`

- size: oxc 65 vs reference 125 (-60 bytes, no whitespaces)

```js
console.log(function foo() {
	var bar = function bar(name) {
		return 'PASS';
	};
	try {
		'moo';
	} catch (e) {
		bar = function bar(name) {
			return 'FAIL';
		};
	}
	return bar;
}()());

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,5 @@
-console.log(function foo() {
-	var o = function o(n) {
+console.log(function() {
+	return function(name) {
 		return 'PASS';
 	};
-	try {
-		'moo';
-	} catch (n) {
-		o = function o(n) {
-			return 'FAIL';
-		};
-	}
-	return o;
 }()());

```

## `uglify/negate-iife/issue_1288`

- size: oxc 28 vs reference 88 (-60 bytes, no whitespaces)

```js
if (w);
else {
	(function f() {})();
}
if (!x) {
	(function() {
		x = {};
	})();
}
if (y) (function() {})();
else (function(z) {
	return z;
})(0);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
-w || !function f() {}();
-x || !function() {
+w;
+x || (function() {
 	x = {};
-}();
-y ? !function() {}() : !function(z) {
-	return z;
-}(0);
+})();
+y;

```

## `uglify/concat-strings/concat_3`

- size: oxc 64 vs reference 125 (-61 bytes, no whitespaces)

```js
console.log(1 + 2 + (3 + 4 + 5), 1 + 2 + (3 + 4 + '5'), 1 + 2 + (3 + '4' + 5), 1 + 2 + (3 + '4' + '5'), 1 + 2 + ('3' + 4 + 5), 1 + 2 + ('3' + 4 + '5'), 1 + 2 + ('3' + '4' + 5), 1 + 2 + ('3' + '4' + '5'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(1 + 2 + (3 + 4 + 5), 1 + 2 + (3 + 4 + '5'), 1 + 2 + (3 + '4') + 5, 1 + 2 + (3 + '4') + '5', 1 + 2 + '3' + 4 + 5, 1 + 2 + '3' + 4 + '5', 1 + 2 + '3' + '4' + 5, 1 + 2 + '3' + '4' + '5');
+console.log(15, '375', '3345', '3345', '3345', '3345', '3345', '3345');

```

## `uglify/conditionals/issue_5546_1`

- size: oxc 35 vs reference 96 (-61 bytes, no whitespaces)

```js
var a;
if (a) try {
	console;
} finally {
	console.log('FAIL');
}
else try {
	console;
} finally {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,2 @@
 var a;
-if (a) try {
-	console;
-} finally {
-	console.log('FAIL');
-}
-else try {
-	console;
-} finally {
-	console.log('PASS');
-}
+console.log(a ? 'FAIL' : 'PASS');

```

## `uglify/drop-unused/unused_keep_setter_arg`

- tags: `remove unused`
- size: oxc 0 vs reference 61 (-61 bytes, no whitespaces)

```js
var x = {
	_foo: null,
	set foo(val) {},
	get foo() {
		return this._foo;
	}
};

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-var x = {
-	_foo: null,
-	set foo(val) {},
-	get foo() {
-		return this._foo;
-	}
-};

```

## `uglify/hoist_vars/sequences`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 61 (-61 bytes, no whitespaces)

```js
function f() {
	var a = 1, b = 2;
	function g() {}
	var c = 3;
	return g(a, b, c);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function f() {
-	var c, a = 1, b = 2;
-	function g() {}
-	c = 3;
-	return g(a, b, c);
-}

```

## `uglify/pure_getters/collapse_vars_1_false`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 61 (-61 bytes, no whitespaces)

```js
function f(a, b) {
	for (;;) {
		var c = a.g();
		var d = b.p;
		if (c || d) break;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-function f(a, b) {
-	for (;;) {
-		var c = a.g();
-		var d = b.p;
-		if (c || d) break;
-	}
-}

```

## `uglify/pure_getters/collapse_vars_1_strict`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 61 (-61 bytes, no whitespaces)

```js
function f(a, b) {
	for (;;) {
		var c = a.g();
		var d = b.p;
		if (c || d) break;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-function f(a, b) {
-	for (;;) {
-		var c = a.g();
-		var d = b.p;
-		if (c || d) break;
-	}
-}

```

## `uglify/concat-strings/concat_4`

- size: oxc 75 vs reference 137 (-62 bytes, no whitespaces)

```js
console.log(1 + '2' + (3 + 4 + 5), 1 + '2' + (3 + 4 + '5'), 1 + '2' + (3 + '4' + 5), 1 + '2' + (3 + '4' + '5'), 1 + '2' + ('3' + 4 + 5), 1 + '2' + ('3' + 4 + '5'), 1 + '2' + ('3' + '4' + 5), 1 + '2' + ('3' + '4' + '5'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(1 + '2' + (3 + 4 + 5), 1 + '2' + (3 + 4) + '5', 1 + '2' + 3 + '4' + 5, 1 + '2' + 3 + '4' + '5', 1 + '2' + '3' + 4 + 5, 1 + '2' + '3' + 4 + '5', 1 + '2' + '3' + '4' + 5, 1 + '2' + '3' + '4' + '5');
+console.log('1212', '1275', '12345', '12345', '12345', '12345', '12345', '12345');

```

## `uglify/concat-strings/concat_5`

- size: oxc 75 vs reference 137 (-62 bytes, no whitespaces)

```js
console.log('1' + 2 + (3 + 4 + 5), '1' + 2 + (3 + 4 + '5'), '1' + 2 + (3 + '4' + 5), '1' + 2 + (3 + '4' + '5'), '1' + 2 + ('3' + 4 + 5), '1' + 2 + ('3' + 4 + '5'), '1' + 2 + ('3' + '4' + 5), '1' + 2 + ('3' + '4' + '5'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('1' + 2 + (3 + 4 + 5), '1' + 2 + (3 + 4) + '5', '1' + 2 + 3 + '4' + 5, '1' + 2 + 3 + '4' + '5', '1' + 2 + '3' + 4 + 5, '1' + 2 + '3' + 4 + '5', '1' + 2 + '3' + '4' + 5, '1' + 2 + '3' + '4' + '5');
+console.log('1212', '1275', '12345', '12345', '12345', '12345', '12345', '12345');

```

## `uglify/issue-1034/non_hoisted_function_after_return_2a`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 0 vs reference 62 (-62 bytes, no whitespaces)

```js
function foo(x) {
	if (x) {
		return bar(1);
		var a = not_called(1);
	} else {
		return bar(2);
		var b = not_called(2);
	}
	var c = bar(3);
	function bar(x) {
		return 7 - x;
	}
	function nope() {}
	return b || c;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function foo(x) {
-	return bar(x ? 1 : 2);
-	function bar(x) {
-		return 7 - x;
-	}
-}

```

## `uglify/issue-1034/non_hoisted_function_after_return_2b`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 62 (-62 bytes, no whitespaces)

```js
function foo(x) {
	if (x) {
		return bar(1);
	} else {
		return bar(2);
		var b;
	}
	var c = bar(3);
	function bar(x) {
		return 7 - x;
	}
	return b || c;
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function foo(x) {
-	return bar(x ? 1 : 2);
-	function bar(x) {
-		return 7 - x;
-	}
-}

```

## `uglify/sequences/for_sequences`

- tags: `sequences`
- size: oxc 115 vs reference 177 (-62 bytes, no whitespaces)

```js
// 1
foo();
bar();
for (; false;);
// 2
foo();
bar();
for (x = 5; false;);
// 3
x = foo in bar;
for (; false;);
// 4
x = foo in bar;
for (y = 5; false;);
// 5
x = function() {
	foo in bar;
};
for (y = 5; false;);

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,5 @@
-// 1
-for (foo(), bar(); false;);
-// 2
-for (foo(), bar(), x = 5; false;);
-// 3
-x = foo in bar;
-for (; false;);
-// 4
-x = foo in bar;
-for (y = 5; false;);
-// 5
+for (foo(), bar(), foo(), bar(), x = 5; 0;);
+for (x = (foo in bar), x = (foo in bar), y = 5; 0;);
 for (x = function() {
 	foo in bar;
-}, y = 5; false;);
+}, y = 5; 0;);

```

## `uglify/dead-code/collapse_vars_misc`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 64 (-64 bytes, no whitespaces)

```js
function f10(x) {
	var a = 5, b = 3;
	return a += b;
}
function f11(x) {
	var a = 5, b = 3;
	return a += --b;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-function f10(x) {
-	return 5 + 3;
-}
-function f11(x) {
-	var b = 3;
-	return 5 + --b;
-}

```

## `uglify/issue-979/reported`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 64 (-64 bytes, no whitespaces)

```js
function f1() {
	if (a == 1 || b == 2) foo();
}
function f2() {
	if (!(a == 1 || b == 2));
	else foo();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function f1() {
-	1 != a && 2 != b || foo();
-}
-function f2() {
-	1 != a && 2 != b || foo();
-}

```

## `uglify/annotations/issue_3858`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 65 (-65 bytes, no whitespaces)

```js
var f = function(a) {
	return function(b) {
		console.log(b);
	}(a);
};
f('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-var f = function(a) {
-	return function() {
-		console.log(a);
-	}();
-};
-f('PASS');

```

## `uglify/classes/issue_4722_1`

- size: oxc 13 vs reference 78 (-65 bytes, no whitespaces)

```js
'use strict';
try {
	(class extends function* () {} {});
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1 @@
 'use strict';
-try {
-	(class extends function* () {} {});
-} catch (e) {
-	console.log('PASS');
-}

```

## `uglify/drop-unused/drop_toplevel_vars`

- tags: `remove unused`
- size: oxc 15 vs reference 80 (-65 bytes, no whitespaces)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1 @@
-function f(d) {
-	return function() {
-		2;
-	};
-}
-2;
-function g() {}
-function h() {}
 console.log(3);

```

## `uglify/switches/beautify`

- size: oxc 24 vs reference 89 (-65 bytes, no whitespaces)

```js
switch (a) {
	case 0:
	case 1: break;
	case 2:
	default:
}
switch (b) {
	case 3:
		foo();
		bar();
	default: break;
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,5 @@
-switch (a) {
-	case 0:
-	case 1: break;
-	case 2:
-	default:
-}
-switch (b) {
-	case 3:
-		foo();
-		bar();
-	default: break;
+a;
+if (b === 3) {
+	foo();
+	bar();
 }

```

## `uglify/comparisons/issue_2857_2`

- size: oxc 76 vs reference 142 (-66 bytes, no whitespaces)

```js
a === null || a === undefined;
a === null || a !== undefined;
a !== null || a === undefined;
a !== null || a !== undefined;
a === null && a === undefined;
a === null && a !== undefined;
a !== null && a === undefined;
a !== null && a !== undefined;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-null == a;
-null === a || void 0 !== a;
-null !== a || void 0 === a;
-null !== a || void 0 !== a;
-null === a && void 0 === a;
-null === a && void 0 !== a;
-null !== a && void 0 === a;
-null != a;
+a;
+a === null || a;
+a !== null || a;
+a !== null || a;
+a === null && a;
+a === null && a;
+a !== null && a;
+a;

```

## `uglify/issue-1105/with_in_function_scope`

- tags: `remove unused`
- size: oxc 0 vs reference 66 (-66 bytes, no whitespaces)

```js
function foo() {
	var o = 42;
	with(o) {
		var foo = 'something';
	}
	doSomething(o);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function foo() {
-	var o = 42;
-	with(o) var foo = 'something';
-	doSomething(o);
-}

```

## `uglify/collapse_vars/switch_case_1`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 67 (-67 bytes, no whitespaces)

```js
function f(x, y, z) {
	var a = x();
	var b = y();
	var c = z;
	switch (a) {
		default: d();
		case b: e();
		case c: f();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-function f(x, y, z) {
-	switch (x()) {
-		default: d();
-		case y(): e();
-		case z: f();
-	}
-}

```

## `uglify/classes/issue_4722_2`

- size: oxc 13 vs reference 83 (-70 bytes, no whitespaces)

```js
'use strict';
try {
	(class extends async function() {} {});
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1 @@
 'use strict';
-try {
-	(class extends async function() {} {});
-} catch (e) {
-	console.log('PASS');
-}

```

## `uglify/drop-unused/self_assign`

- tags: `remove unused`, `2 iterations`
- size: oxc 0 vs reference 70 (-70 bytes, no whitespaces)

```js
function d(a) {
	a = a;
}
function e(a, b) {
	a = b;
	b = a;
}
function f(a, b, c) {
	a = b;
	b = c;
	c = a;
}
function g(a, b, c) {
	a = a * b + c;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function d(a) {}
-function e(a, b) {}
-function f(a, b, c) {}
-function g(a, b, c) {}

```

## `uglify/classes/issue_4722_3`

- size: oxc 13 vs reference 84 (-71 bytes, no whitespaces)

```js
'use strict';
try {
	(class extends async function* () {} {});
} catch (e) {
	console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1 @@
 'use strict';
-try {
-	(class extends async function* () {} {});
-} catch (e) {
-	console.log('PASS');
-}

```

## `uglify/drop-unused/drop_toplevel_funcs_retain`

- tags: `remove unused`
- size: oxc 15 vs reference 86 (-71 bytes, no whitespaces)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1 @@
-var a, b = 1, c = g;
-function f(d) {
-	return function() {
-		c = 2;
-	};
-}
-a = 2;
-function g() {}
-console.log(b = 3);
+console.log(3);

```

## `uglify/issue-1446/typeof_eq_undefined`

- size: oxc 48 vs reference 120 (-72 bytes, no whitespaces)

```js
var a = typeof b != 'undefined';
b = typeof a != 'undefined';
var c = typeof d.e !== 'undefined';
var f = 'undefined' === typeof g;
g = 'undefined' === typeof f;
var h = 'undefined' == typeof i.j;

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,4 @@
-var a = 'undefined' != typeof b;
-b = void 0 !== a;
-var c = void 0 !== d.e;
-var f = 'undefined' == typeof g;
-g = void 0 === f;
-var h = void 0 === i.j;
+b = !0;
+var c = d.e !== void 0;
+g = !1;
+var h = i.j === void 0;

```

## `uglify/reduce_vars/defun_inline_1`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 72 (-72 bytes, no whitespaces)

```js
function f() {
	return g(2) + h();
	function g(b) {
		return b;
	}
	function h() {
		return h();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-function f() {
-	return function(b) {
-		return b;
-	}(2) + function h() {
-		return h();
-	}();
-}

```

## `uglify/reduce_vars/defun_inline_2`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 72 (-72 bytes, no whitespaces)

```js
function f() {
	function g(b) {
		return b;
	}
	function h() {
		return h();
	}
	return g(2) + h();
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-function f() {
-	return function(b) {
-		return b;
-	}(2) + function h() {
-		return h();
-	}();
-}

```

## `uglify/drop-unused/drop_toplevel_vars_retain`

- tags: `remove unused`
- size: oxc 15 vs reference 88 (-73 bytes, no whitespaces)

```js
var a, b = 1, c = g;
function f(d) {
	return function() {
		c = 2;
	};
}
a = 2;
function g() {}
function h() {}
console.log(b = 3);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1 @@
-var a;
-function f(d) {
-	return function() {
-		2;
-	};
-}
-a = 2;
-function g() {}
-function h() {}
 console.log(3);

```

## `uglify/concat-strings/concat_6`

- size: oxc 75 vs reference 153 (-78 bytes, no whitespaces)

```js
console.log('1' + '2' + (3 + 4 + 5), '1' + '2' + (3 + 4 + '5'), '1' + '2' + (3 + '4' + 5), '1' + '2' + (3 + '4' + '5'), '1' + '2' + ('3' + 4 + 5), '1' + '2' + ('3' + 4 + '5'), '1' + '2' + ('3' + '4' + 5), '1' + '2' + ('3' + '4' + '5'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('1' + '2' + (3 + 4 + 5), '1' + '2' + (3 + 4) + '5', '1' + '2' + 3 + '4' + 5, '1' + '2' + 3 + '4' + '5', '1' + '2' + '3' + 4 + 5, '1' + '2' + '3' + 4 + '5', '1' + '2' + '3' + '4' + 5, '1' + '2' + '3' + '4' + '5');
+console.log('1212', '1275', '12345', '12345', '12345', '12345', '12345', '12345');

```

## `uglify/evaluate/threshold_evaluate_100`

- tags: `join vars`, `remove unused`
- size: oxc 75 vs reference 153 (-78 bytes, no whitespaces)

```js
function b(x) {
	return x + x + x;
}
console.log(b('1'), b(2), b(b(b('ABCDEFGHIJK'))));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function b(x) {
 	return x + x + x;
 }
-console.log('111', 6, b('ABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJK'));
+console.log(b('1'), b(2), b(b(b('ABCDEFGHIJK'))));

```

## `uglify/issue-640/limit_1`

- tags: `sequences`
- size: oxc 22 vs reference 106 (-84 bytes, no whitespaces)

```js
a;
b;
c;
d;
e;
f;
g;
h;
i;
j;
k;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-// Turned into a single return statement
-// so it can no longer be split into lines
 a, b, c, d, e, f, g, h, i, j, k;

```

## `uglify/issue-1034/non_hoisted_function_after_return`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 85 (-85 bytes, no whitespaces)

```js
function foo(x) {
	if (x) {
		return bar();
		not_called1();
	} else {
		return baz();
		not_called2();
	}
	function bar() {
		return 7;
	}
	return not_reached;
	function UnusedFunction() {}
	function baz() {
		return 8;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +0,0 @@
-function foo(x) {
-	return (x ? bar : baz)();
-	function bar() {
-		return 7;
-	}
-	function baz() {
-		return 8;
-	}
-}

```

## `uglify/collapse_vars/collapse_vars_properties`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 86 (-86 bytes, no whitespaces)

```js
function f1(obj) {
	var prop = 'LiteralProperty';
	return !!-+obj[prop];
}
function f2(obj) {
	var prop1 = 'One';
	var prop2 = 'Two';
	return ~!!-+obj[prop1 + prop2];
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +0,0 @@
-function f1(obj) {
-	return !!-+obj.LiteralProperty;
-}
-function f2(obj) {
-	return ~!!-+obj.OneTwo;
-}

```

## `uglify/functions/issue_3297_1`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 86 (-86 bytes, no whitespaces)

```js
function function1() {
	var r = { function2 };
	function function2() {
		alert(1234);
		function function3() {
			function2();
		}
		;
		function3();
	}
	return r;
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +0,0 @@
-function function1() {
-	return { function2: function n() {
-		alert(1234);
-		function t() {
-			n();
-		}
-		t();
-	} };
-}

```

## `uglify/ie/issue_3523`

- size: oxc 93 vs reference 180 (-87 bytes, no whitespaces)

```js
var a = 0, b, c = 'FAIL';
(function() {
	var f, g, h, i, j, k, l, m, n, o, p, q, r, s;
})();
try {
	throw 0;
} catch (t) {
	(function() {
		(function t() {
			c = 'PASS';
		})();
	})();
	(function e() {
		try {} catch (t) {}
	})();
}
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,11 @@
 var a = 0, b, c = 'FAIL';
-(function() {
-	var c, n, t, o, a, r, f, i, u, h, l, v, y, A;
-})();
 try {
 	throw 0;
-} catch (n) {
+} catch {
 	(function() {
-		(function n() {
+		(function() {
 			c = 'PASS';
 		})();
-	})();
-	(function c() {
-		try {} catch (c) {}
 	})();
 }
 console.log(c);

```

## `uglify/ie/issue_3523_ie8`

- size: oxc 93 vs reference 180 (-87 bytes, no whitespaces)

```js
var a = 0, b, c = 'FAIL';
(function() {
	var f, g, h, i, j, k, l, m, n, o, p, q, r, s;
})();
try {
	throw 0;
} catch (t) {
	(function() {
		(function t() {
			c = 'PASS';
		})();
	})();
	(function e() {
		try {} catch (t) {}
	})();
}
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,11 @@
 var a = 0, b, c = 'FAIL';
-(function() {
-	var c, t, n, o, a, r, f, i, u, h, e, l, v, y;
-})();
 try {
 	throw 0;
-} catch (t) {
+} catch {
 	(function() {
-		(function t() {
+		(function() {
 			c = 'PASS';
 		})();
-	})();
-	(function e() {
-		try {} catch (t) {}
 	})();
 }
 console.log(c);

```

## `uglify/ie/issue_3523_ie8_toplevel`

- size: oxc 93 vs reference 180 (-87 bytes, no whitespaces)

```js
var a = 0, b, c = 'FAIL';
(function() {
	var f, g, h, i, j, k, l, m, n, o, p, q, r, s;
})();
try {
	throw 0;
} catch (t) {
	(function() {
		(function t() {
			c = 'PASS';
		})();
	})();
	(function e() {
		try {} catch (t) {}
	})();
}
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,11 @@
-var c = 0, n, t = 'FAIL';
-(function() {
-	var c, n, t, o, r, a, f, i, u, h, l, v, y, A;
-})();
+var a = 0, b, c = 'FAIL';
 try {
 	throw 0;
-} catch (o) {
+} catch {
 	(function() {
-		(function o() {
-			t = 'PASS';
+		(function() {
+			c = 'PASS';
 		})();
-	})();
-	(function r() {
-		try {} catch (o) {}
 	})();
 }
-console.log(t);
+console.log(c);

```

## `uglify/ie/issue_3523_rename`

- size: oxc 93 vs reference 180 (-87 bytes, no whitespaces)

```js
var a = 0, b, c = 'FAIL';
(function() {
	var d, e, f, g, h, i, j, k, l, m, o, p, q, r;
})();
try {
	throw 0;
} catch (e) {
	(function() {
		(function e() {
			c = 'PASS';
		})();
	})();
	(function d() {
		try {} catch (e) {}
	})();
}
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,11 @@
 var a = 0, b, c = 'FAIL';
-(function() {
-	var c, n, t, o, a, r, f, i, u, h, l, v, y, A;
-})();
 try {
 	throw 0;
-} catch (n) {
+} catch {
 	(function() {
-		(function n() {
+		(function() {
 			c = 'PASS';
 		})();
-	})();
-	(function c() {
-		try {} catch (c) {}
 	})();
 }
 console.log(c);

```

## `uglify/ie/issue_3523_rename_ie8`

- size: oxc 93 vs reference 180 (-87 bytes, no whitespaces)

```js
var a = 0, b, c = 'FAIL';
(function() {
	var d, e, f, g, h, i, j, k, l, m, o, p, q, r;
})();
try {
	throw 0;
} catch (e) {
	(function() {
		(function e() {
			c = 'PASS';
		})();
	})();
	(function d() {
		try {} catch (e) {}
	})();
}
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,11 @@
 var a = 0, b, c = 'FAIL';
-(function() {
-	var c, n, t, o, a, r, e, f, i, u, h, l, v, y;
-})();
 try {
 	throw 0;
-} catch (e) {
+} catch {
 	(function() {
-		(function e() {
+		(function() {
 			c = 'PASS';
 		})();
-	})();
-	(function d() {
-		try {} catch (e) {}
 	})();
 }
 console.log(c);

```

## `uglify/ie/issue_3523_rename_ie8_toplevel`

- size: oxc 93 vs reference 180 (-87 bytes, no whitespaces)

```js
var a = 0, b, c = 'FAIL';
(function() {
	var d, e, f, g, h, i, j, k, l, m, o, p, q, r;
})();
try {
	throw 0;
} catch (e) {
	(function() {
		(function e() {
			c = 'PASS';
		})();
	})();
	(function d() {
		try {} catch (e) {}
	})();
}
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,11 @@
-var c = 0, n, t = 'FAIL';
-(function() {
-	var c, n, t, o, r, a, f, i, u, h, l, v, y, A;
-})();
+var a = 0, b, c = 'FAIL';
 try {
 	throw 0;
-} catch (o) {
+} catch {
 	(function() {
-		(function o() {
-			t = 'PASS';
+		(function() {
+			c = 'PASS';
 		})();
-	})();
-	(function r() {
-		try {} catch (o) {}
 	})();
 }
-console.log(t);
+console.log(c);

```

## `uglify/ie/issue_3523_rename_toplevel`

- size: oxc 93 vs reference 180 (-87 bytes, no whitespaces)

```js
var a = 0, b, c = 'FAIL';
(function() {
	var d, e, f, g, h, i, j, k, l, m, o, p, q, r;
})();
try {
	throw 0;
} catch (e) {
	(function() {
		(function e() {
			c = 'PASS';
		})();
	})();
	(function d() {
		try {} catch (e) {}
	})();
}
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,11 @@
-var c = 0, n, t = 'FAIL';
-(function() {
-	var c, n, t, o, r, a, f, i, u, h, l, v, y, A;
-})();
+var a = 0, b, c = 'FAIL';
 try {
 	throw 0;
-} catch (c) {
+} catch {
 	(function() {
-		(function c() {
-			t = 'PASS';
+		(function() {
+			c = 'PASS';
 		})();
-	})();
-	(function c() {
-		try {} catch (c) {}
 	})();
 }
-console.log(t);
+console.log(c);

```

## `uglify/ie/issue_3523_toplevel`

- size: oxc 93 vs reference 180 (-87 bytes, no whitespaces)

```js
var a = 0, b, c = 'FAIL';
(function() {
	var f, g, h, i, j, k, l, m, n, o, p, q, r, s;
})();
try {
	throw 0;
} catch (t) {
	(function() {
		(function t() {
			c = 'PASS';
		})();
	})();
	(function e() {
		try {} catch (t) {}
	})();
}
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,11 @@
-var c = 0, n, t = 'FAIL';
-(function() {
-	var c, n, t, o, r, a, f, i, u, h, l, v, y, A;
-})();
+var a = 0, b, c = 'FAIL';
 try {
 	throw 0;
-} catch (c) {
+} catch {
 	(function() {
-		(function c() {
-			t = 'PASS';
+		(function() {
+			c = 'PASS';
 		})();
-	})();
-	(function c() {
-		try {} catch (c) {}
 	})();
 }
-console.log(t);
+console.log(c);

```

## `uglify/keep_fargs/issue_1583`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 0 vs reference 89 (-89 bytes, no whitespaces)

```js
function m(t) {
	(function(e) {
		t = e();
	})(function() {
		return (function(a) {
			return a;
		})(function(a) {});
	});
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +0,0 @@
-function m(t) {
-	(function() {
-		(function() {
-			return (function() {
-				return function(a) {};
-			})();
-		})();
-	})();
-}

```

## `uglify/issue-2871/comparison_with_undefined`

- size: oxc 24 vs reference 114 (-90 bytes, no whitespaces)

```js
a == undefined;
a != undefined;
a === undefined;
a !== undefined;
undefined == a;
undefined != a;
undefined === a;
undefined !== a;
void 0 == a;
void 0 != a;
void 0 === a;
void 0 !== a;

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-null == a;
-null != a;
-void 0 === a;
-void 0 !== a;
-null == a;
-null != a;
-void 0 === a;
-void 0 !== a;
-null == a;
-null != a;
-void 0 === a;
-void 0 !== a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;
+a;

```

## `uglify/drop-unused/issue_1583`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 0 vs reference 91 (-91 bytes, no whitespaces)

```js
function m(t) {
	(function(e) {
		t = e();
	})(function() {
		return (function(a) {
			return a;
		})(function(a) {});
	});
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +0,0 @@
-function m(t) {
-	(function(e) {
-		(function() {
-			return (function(a) {
-				return function(a) {};
-			})();
-		})();
-	})();
-}

```

## `uglify/issue-1105/with_using_existing_variable_outside_scope`

- tags: `remove unused`
- size: oxc 0 vs reference 99 (-99 bytes, no whitespaces)

```js
function f() {
	var o = {};
	var unused = {};
	function foo() {
		with(o) {
			var foo = 'something';
		}
		doSomething(o);
	}
	foo();
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +0,0 @@
-function f() {
-	var o = {};
-	var unused = {};
-	function foo() {
-		with(o) var foo = 'something';
-		doSomething(o);
-	}
-	foo();
-}

```

## `uglify/issue-1105/compress_with_with_in_other_scope`

- tags: `remove unused`
- size: oxc 0 vs reference 100 (-100 bytes, no whitespaces)

```js
function foo() {
	var o = 42;
	with(o) {
		var foo = 'something';
	}
	doSomething(o);
}
function bar() {
	var unused = 42;
	return something();
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +0,0 @@
-function foo() {
-	var o = 42;
-	with(o) var foo = 'something';
-	doSomething(o);
-}
-function bar() {
-	return something();
-}

```

## `uglify/regexp/issue_3434_3`

- size: oxc 0 vs reference 102 (-102 bytes, no whitespaces)

```js
RegExp('\n');
RegExp('\r');
RegExp('\\n');
RegExp('\\\n');
RegExp('\\\\n');
RegExp('\\\\\n');
RegExp('\\\\\\n');
RegExp('\\\\\\\n');
RegExp('\u2028');
RegExp('\u2029');
RegExp('\n\r\u2028\u2029');
RegExp('\\\nfo\n[\n]o\\bbb');

```

```diff
--- reference
+++ oxc
@@ -1,12 +0,0 @@
-/\n/;
-/\r/;
-/\n/;
-/\n/;
-/\\n/;
-/\\\n/;
-/\\\n/;
-/\\\n/;
-/\u2028/;
-/\u2029/;
-/\n\r\u2028\u2029/;
-/\nfo\n[\n]o\bbb/;

```

## `uglify/drop-unused/drop_assign`

- tags: `remove unused`
- size: oxc 0 vs reference 107 (-107 bytes, no whitespaces)

```js
function f1() {
	var a;
	a = 1;
}
function f2() {
	var a = 1;
	a = 2;
}
function f3(a) {
	a = 1;
}
function f4() {
	var a;
	return a = 1;
}
function f5() {
	var a;
	return function() {
		a = 1;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,17 +0,0 @@
-function f1() {
-	1;
-}
-function f2() {
-	2;
-}
-function f3(a) {
-	1;
-}
-function f4() {
-	return 1;
-}
-function f5() {
-	return function() {
-		1;
-	};
-}

```

## `uglify/drop-unused/issue_2226_1`

- tags: `remove unused`
- size: oxc 0 vs reference 109 (-109 bytes, no whitespaces)

```js
function f1() {
	var a = b;
	a += c;
}
function f2(a) {
	a <<= b;
}
function f3(a) {
	--a;
}
function f4() {
	var a = b;
	return a *= c;
}
function f5(a) {
	x(a /= b);
}

```

```diff
--- reference
+++ oxc
@@ -1,17 +0,0 @@
-function f1() {
-	b;
-	c;
-}
-function f2(a) {
-	b;
-}
-function f3(a) {
-	0;
-}
-function f4() {
-	var a = b;
-	return a *= c;
-}
-function f5(a) {
-	x(a /= b);
-}

```

## `uglify/keep_fargs/issue_2226_1`

- tags: `remove unused`
- size: oxc 0 vs reference 109 (-109 bytes, no whitespaces)

```js
function f1() {
	var a = b;
	a += c;
}
function f2(a) {
	a <<= b;
}
function f3(a) {
	--a;
}
function f4() {
	var a = b;
	return a *= c;
}
function f5(a) {
	x(a /= b);
}

```

```diff
--- reference
+++ oxc
@@ -1,17 +0,0 @@
-function f1() {
-	b;
-	c;
-}
-function f2(a) {
-	b;
-}
-function f3(a) {
-	0;
-}
-function f4() {
-	var a = b;
-	return a *= c;
-}
-function f5(a) {
-	x(a /= b);
-}

```

## `uglify/if_return/issue_1089`

- tags: `sequences`, `remove unused`
- size: oxc 0 vs reference 112 (-112 bytes, no whitespaces)

```js
function x() {
	var f = document.getElementById('fname');
	if (f.files[0].size > 12345) {
		alert('alert');
		f.focus();
		return false;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function x() {
-	var f = document.getElementById('fname');
-	if (12345 < f.files[0].size) return alert('alert'), f.focus(), !1;
-}

```

## `uglify/dead-code/collapse_vars_lvalues_drop_assign`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 113 (-113 bytes, no whitespaces)

```js
function f0(x) {
	var i = ++x;
	return x += i;
}
function f1(x) {
	var a = x -= 3;
	return x += a;
}
function f2(x) {
	var z = x, a = ++z;
	return z += a;
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +0,0 @@
-function f0(x) {
-	var i = ++x;
-	return x + i;
-}
-function f1(x) {
-	var a = x -= 3;
-	return x + a;
-}
-function f2(x) {
-	var z = x, a = ++z;
-	return z + a;
-}

```

## `uglify/numbers/issue_3655`

- size: oxc 137 vs reference 260 (-123 bytes, no whitespaces)

```js
console.log(0 + 0 * -[].length);
console.log(0 + (0 + 0 * -[].length));
console.log(0 - (0 + 0 * -[].length));
console.log(1 * (0 + 0 * -[].length));
console.log(1 / (0 + 0 * -[].length));
console.log(0 + 0 * -[].length + 0);
console.log(0 + 0 * -[].length - 0);
console.log((0 + 0 * -[].length) * 1);
console.log((0 + 0 * -[].length) / 1);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
-console.log(0 + 0 * -[].length);
-console.log(0 + 0 * -[].length);
-console.log(0 - (0 + 0 * -[].length));
-console.log(0 + 0 * -[].length);
-console.log(1 / (0 + 0 * -[].length));
-console.log(0 + 0 * -[].length);
-console.log(0 + 0 * -[].length);
-console.log(0 + 0 * -[].length);
-console.log(0 + 0 * -[].length);
+console.log(0);
+console.log(0);
+console.log(0);
+console.log(0);
+console.log(1 / 0);
+console.log(0);
+console.log(0);
+console.log(0);
+console.log(0);

```

## `uglify/collapse_vars/issue_2436_12`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 129 (-129 bytes, no whitespaces)

```js
function isUndefined() {}
function f() {
	var viewValue = this.$$lastCommittedViewValue;
	var modelValue = viewValue;
	return isUndefined(modelValue) ? modelValue : null;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +0,0 @@
-function isUndefined() {}
-function f() {
-	var modelValue = this.$$lastCommittedViewValue;
-	return isUndefined(modelValue) ? modelValue : null;
-}

```

## `uglify/collapse_vars/collapse_vars_array_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 130 (-130 bytes, no whitespaces)

```js
function f1(x, y) {
	var z = x + y;
	return [z];
}
function f2(x, y) {
	var z = x + y;
	return [
		x,
		side_effect(),
		z
	];
}
function f3(x, y) {
	var z = f(x + y);
	return [
		[3],
		[
			z,
			x,
			y
		],
		[g()]
	];
}

```

```diff
--- reference
+++ oxc
@@ -1,22 +0,0 @@
-function f1(x, y) {
-	return [x + y];
-}
-function f2(x, y) {
-	var z = x + y;
-	return [
-		x,
-		side_effect(),
-		z
-	];
-}
-function f3(x, y) {
-	return [
-		[3],
-		[
-			f(x + y),
-			x,
-			y
-		],
-		[g()]
-	];
-}

```

## `uglify/issue-1052/multiple_functions`

- size: oxc 0 vs reference 134 (-134 bytes, no whitespaces)

```js
(function() {
	if (!window) return;
	function f() {}
	function g() {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +0,0 @@
-(function() {
-	// NOTE: other compression steps will reduce this
-	// down to just `window`.
-	if (!window);
-	function f() {}
-	function g() {}
-})();

```

## `uglify/issue-640/iife`

- tags: `sequences`
- size: oxc 5 vs reference 140 (-135 bytes, no whitespaces)

```js
x = 42;
(function a() {})();
!function b() {}();
~function c() {}();
+function d() {}();
-function e() {}();
void function f() {}();
typeof function g() {}();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-x = 42, function a() {}(), !function b() {}(), ~function c() {}(), +function d() {}(), -function e() {}(), void function f() {}(), typeof function g() {}();
+x = 42;

```

## `uglify/sequences/iife`

- tags: `sequences`
- size: oxc 5 vs reference 140 (-135 bytes, no whitespaces)

```js
x = 42;
(function a() {})();
!function b() {}();
~function c() {}();
+function d() {}();
-function e() {}();
void function f() {}();
typeof function g() {}();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-x = 42, function a() {}(), !function b() {}(), ~function c() {}(), +function d() {}(), -function e() {}(), void function f() {}(), typeof function g() {}();
+x = 42;

```

## `uglify/collapse_vars/issue_2497`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 141 (-141 bytes, no whitespaces)

```js
function sample() {
	if (true) {
		for (var i = 0; i < 1; ++i) {
			for (var k = 0; k < 1; ++k) {
				var value = 1;
				var x = value;
				value = x ? x + 1 : 0;
			}
		}
	} else {
		for (var i = 0; i < 1; ++i) {
			for (var k = 0; k < 1; ++k) {
				var value = 1;
			}
		}
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function sample() {
-	if (true) for (var i = 0; i < 1; ++i) for (var k = 0; k < 1; ++k) value = (value = 1) ? value + 1 : 0;
-	else for (i = 0; i < 1; ++i) for (k = 0; k < 1; ++k) var value = 1;
-}

```

## `uglify/drop-unused/keep_assign`

- tags: `remove unused`
- size: oxc 0 vs reference 143 (-143 bytes, no whitespaces)

```js
function f1() {
	var a;
	a = 1;
}
function f2() {
	var a = 1;
	a = 2;
}
function f3(a) {
	a = 1;
}
function f4() {
	var a;
	return a = 1;
}
function f5() {
	var a;
	return function() {
		a = 1;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,21 +0,0 @@
-function f1() {
-	var a;
-	a = 1;
-}
-function f2() {
-	var a = 1;
-	a = 2;
-}
-function f3(a) {
-	a = 1;
-}
-function f4() {
-	var a;
-	return a = 1;
-}
-function f5() {
-	var a;
-	return function() {
-		a = 1;
-	};
-}

```

## `uglify/typeof/typeof_defined_3`

- size: oxc 544 vs reference 688 (-144 bytes, no whitespaces)

```js
'undefined' == typeof A && 'undefined' == typeof B && (A, B);
'undefined' == typeof A && 'undefined' != typeof B && (A, B);
'undefined' != typeof A && 'undefined' == typeof B && (A, B);
'undefined' != typeof A && 'undefined' != typeof B && (A, B);
'undefined' == typeof A && 'undefined' == typeof B || (A, B);
'undefined' == typeof A && 'undefined' != typeof B || (A, B);
'undefined' != typeof A && 'undefined' == typeof B || (A, B);
'undefined' != typeof A && 'undefined' != typeof B || (A, B);
'undefined' == typeof A || 'undefined' == typeof B && (A, B);
'undefined' == typeof A || 'undefined' != typeof B && (A, B);
'undefined' != typeof A || 'undefined' == typeof B && (A, B);
'undefined' != typeof A || 'undefined' != typeof B && (A, B);
'undefined' == typeof A || 'undefined' == typeof B || (A, B);
'undefined' == typeof A || 'undefined' != typeof B || (A, B);
'undefined' != typeof A || 'undefined' == typeof B || (A, B);
'undefined' != typeof A || 'undefined' != typeof B || (A, B);

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,16 @@
-'undefined' == typeof A && 'undefined' == typeof B && (A, B);
-'undefined' == typeof A && 'undefined' != typeof B && A;
-'undefined' != typeof A && 'undefined' == typeof B && B;
-// dropped
-'undefined' == typeof A && 'undefined' == typeof B || (A, B);
-'undefined' == typeof A && 'undefined' != typeof B || (A, B);
-'undefined' != typeof A && 'undefined' == typeof B || (A, B);
-'undefined' != typeof A && 'undefined' != typeof B || (A, B);
-'undefined' != typeof A && 'undefined' == typeof B && B;
-// dropped
-'undefined' == typeof A && 'undefined' == typeof B && (A, B);
-'undefined' == typeof A && 'undefined' != typeof B && A;
-// dropped
-'undefined' != typeof A && 'undefined' == typeof B && B;
-'undefined' == typeof A && 'undefined' != typeof B && A;
-'undefined' == typeof A && 'undefined' == typeof B && (A, B);
+typeof A > 'u' && typeof B > 'u' && (A, B);
+typeof A > 'u' && typeof B < 'u' && (A, B);
+typeof A < 'u' && typeof B > 'u' && (A, B);
+typeof A < 'u' && typeof B < 'u' && (A, B);
+typeof A > 'u' && typeof B > 'u' || (A, B);
+typeof A > 'u' && typeof B < 'u' || (A, B);
+typeof A < 'u' && typeof B > 'u' || (A, B);
+typeof A < 'u' && typeof B < 'u' || (A, B);
+typeof A > 'u' || typeof B > 'u' && (A, B);
+typeof A > 'u' || typeof B < 'u' && (A, B);
+typeof A < 'u' || typeof B > 'u' && (A, B);
+typeof A < 'u' || typeof B < 'u' && (A, B);
+typeof A > 'u' || typeof B > 'u' || (A, B);
+typeof A > 'u' || typeof B < 'u' || (A, B);
+typeof A < 'u' || typeof B > 'u' || (A, B);
+typeof A < 'u' || typeof B < 'u' || (A, B);

```

## `uglify/collapse_vars/collapse_vars_try`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 145 (-145 bytes, no whitespaces)

```js
function f1() {
	try {
		var a = 1;
		return a;
	} catch (ex) {
		var b = 2;
		return b;
	} finally {
		var c = 3;
		return c;
	}
}
function f2() {
	var t = could_throw();
	try {
		return t + might_throw();
	} catch (ex) {
		return 3;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,17 +0,0 @@
-function f1() {
-	try {
-		return 1;
-	} catch (ex) {
-		return 2;
-	} finally {
-		return 3;
-	}
-}
-function f2() {
-	var t = could_throw();
-	try {
-		return t + might_throw();
-	} catch (ex) {
-		return 3;
-	}
-}

```

## `uglify/issue-281/collapse_vars_constants`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 151 (-151 bytes, no whitespaces)

```js
function f1(x) {
	var a = 4, b = x.prop, c = 5, d = sideeffect1(), e = sideeffect2();
	return b + (function() {
		return d - a * e - c;
	})();
}
function f2(x) {
	var a = 4, b = x.prop, c = 5, not_used = sideeffect1(), e = sideeffect2();
	return b + (function() {
		return -a * e - c;
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +0,0 @@
-function f1(x) {
-	var b = x.prop, d = sideeffect1(), e = sideeffect2();
-	return b + (d - 4 * e - 5);
-}
-function f2(x) {
-	var b = x.prop;
-	sideeffect1();
-	return b + (-4 * sideeffect2() - 5);
-}

```

## `uglify/collapse_vars/collapse_vars_while`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 153 (-153 bytes, no whitespaces)

```js
function f1(y) {
	// Neither the non-constant while condition `c` will be
	// replaced, nor the non-constant `x` in the body.
	var x = y, c = 3 - y;
	while (c) {
		return x;
	}
	var z = y * y;
	return z;
}
function f2(y) {
	// The constant `x` will be replaced in the while body.
	var x = 7;
	while (y) {
		return x;
	}
	var z = y * y;
	return z;
}
function f3(y) {
	// The non-constant `n` will not be replaced in the while body.
	var n = 5 - y;
	while (y) {
		return n;
	}
	var z = y * y;
	return z;
}

```

```diff
--- reference
+++ oxc
@@ -1,14 +0,0 @@
-function f1(y) {
-	var x = y, c = 3 - y;
-	while (c) return x;
-	return y * y;
-}
-function f2(y) {
-	while (y) return 7;
-	return y * y;
-}
-function f3(y) {
-	var n = 5 - y;
-	while (y) return n;
-	return y * y;
-}

```

## `uglify/collapse_vars/collapse_vars_if`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 154 (-154 bytes, no whitespaces)

```js
function f1() {
	var not_used = sideeffect(), x = g1 + g2;
	var y = x / 4, z = 'Bar' + y;
	if ('x' != z) {
		return g9;
	} else return g5;
}
function f2() {
	var x = g1 + g2, not_used = sideeffect();
	var y = x / 4;
	var z = 'Bar' + y;
	if ('x' != z) {
		return g9;
	} else return g5;
}
function f3(x) {
	if (x) {
		var a = 1;
		return a;
	} else {
		var b = 2;
		return b;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +0,0 @@
-function f1() {
-	sideeffect();
-	return 'x' != 'Bar' + (g1 + g2) / 4 ? g9 : g5;
-}
-function f2() {
-	var x = g1 + g2;
-	sideeffect();
-	return 'x' != 'Bar' + x / 4 ? g9 : g5;
-}
-function f3(x) {
-	return x ? 1 : 2;
-}

```

## `uglify/pure_funcs/babel`

- tags: `remove unused`, `pure functions`
- size: oxc 0 vs reference 163 (-163 bytes, no whitespaces)

```js
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError('Cannot call a class as a function');
}
var Foo = function Foo() {
	_classCallCheck(this, Foo);
};

```

```diff
--- reference
+++ oxc
@@ -1,4 +0,0 @@
-function _classCallCheck(instance, Constructor) {
-	if (!(instance instanceof Constructor)) throw new TypeError('Cannot call a class as a function');
-}
-var Foo = function() {};

```

## `uglify/issue-1052/deeply_nested`

- size: oxc 0 vs reference 167 (-167 bytes, no whitespaces)

```js
(function() {
	if (!window) return;
	function f() {}
	function g() {}
	if (!document) return;
	function h() {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,9 +0,0 @@
-(function() {
-	// NOTE: other compression steps will reduce this
-	// down to just `window`.
-	if (!window);
-	else if (!document);
-	function f() {}
-	function g() {}
-	function h() {}
-})();

```

## `uglify/issue-979/test_negated_is_best`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 173 (-173 bytes, no whitespaces)

```js
function f3() {
	if (a == 1 | b == 2) foo();
}
function f4() {
	if (!(a == 1 | b == 2));
	else foo();
}
function f5() {
	if (a == 1 && b == 2) foo();
}
function f6() {
	if (!(a == 1 && b == 2));
	else foo();
}
function f7() {
	if (a == 1 || b == 2) foo();
	else return bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,16 +0,0 @@
-function f3() {
-	1 == a | 2 == b && foo();
-}
-function f4() {
-	1 == a | 2 == b && foo();
-}
-function f5() {
-	1 == a && 2 == b && foo();
-}
-function f6() {
-	1 == a && 2 == b && foo();
-}
-function f7() {
-	if (1 != a && 2 != b) return bar();
-	foo();
-}

```

## `uglify/issue-1105/check_drop_unused_in_peer_function`

- tags: `remove unused`
- size: oxc 0 vs reference 188 (-188 bytes, no whitespaces)

```js
function outer() {
	var o = {};
	var unused = {};
	function foo() {
		function not_in_use() {
			var nested_unused = 'foo';
			return 24;
		}
		var unused = {};
		with(o) {
			var foo = 'something';
		}
		doSomething(o);
	}
	function bar() {
		var unused = {};
		doSomethingElse();
	}
	foo();
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,17 +0,0 @@
-function outer() {
-	var o = {};
-	var unused = {};
-	function foo() {
-		function not_in_use() {
-			return 24;
-		}
-		var unused = {};
-		with(o) var foo = 'something';
-		doSomething(o);
-	}
-	function bar() {
-		doSomethingElse();
-	}
-	foo();
-	bar();
-}

```

## `uglify/collapse_vars/collapse_vars_closures`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 190 (-190 bytes, no whitespaces)

```js
function constant_vars_can_be_replaced_in_any_scope() {
	var outer = 3;
	return function() {
		return outer;
	};
}
function non_constant_vars_can_only_be_replace_in_same_scope(x) {
	var outer = x;
	return function() {
		return outer;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +0,0 @@
-function constant_vars_can_be_replaced_in_any_scope() {
-	return function() {
-		return 3;
-	};
-}
-function non_constant_vars_can_only_be_replace_in_same_scope(x) {
-	var outer = x;
-	return function() {
-		return outer;
-	};
-}

```

## `uglify/switches/constant_switch_5`

- size: oxc 38 vs reference 229 (-191 bytes, no whitespaces)

```js
switch (1) {
	case 1:
		x();
		if (foo) break;
		y();
		break;
	case 1 + 1: bar();
	default: def();
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,6 @@
-// the break inside the if ruins our job
-// we can still get rid of irrelevant cases.
 switch (1) {
-	default:
+	case 1:
 		x();
 		if (foo) break;
 		y();
 }
-// XXX: we could optimize this better by inventing an outer
-// labeled block, but that's kinda tricky.

```

## `uglify/collapse_vars/collapse_vars_object_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 204 (-204 bytes, no whitespaces)

```js
function f0(x, y) {
	var z = x + y;
	return {
		get b() {
			return 7;
		},
		r: z
	};
}
function f1(x, y) {
	var z = x + y;
	return {
		r: z,
		get b() {
			return 7;
		}
	};
}
function f2(x, y) {
	var z = x + y;
	var k = x - y;
	return {
		q: k,
		r: g(x),
		s: z
	};
}
function f3(x, y) {
	var z = f(x + y);
	return [{
		a: {
			q: x,
			r: y,
			s: z
		},
		b: g()
	}];
}

```

```diff
--- reference
+++ oxc
@@ -1,34 +0,0 @@
-function f0(x, y) {
-	return {
-		get b() {
-			return 7;
-		},
-		r: x + y
-	};
-}
-function f1(x, y) {
-	return {
-		r: x + y,
-		get b() {
-			return 7;
-		}
-	};
-}
-function f2(x, y) {
-	var z = x + y;
-	return {
-		q: x - y,
-		r: g(x),
-		s: z
-	};
-}
-function f3(x, y) {
-	return [{
-		a: {
-			q: x,
-			r: y,
-			s: f(x + y)
-		},
-		b: g()
-	}];
-}

```

## `uglify/collapse_vars/collapse_vars_unary`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 210 (-210 bytes, no whitespaces)

```js
function f0(o, p) {
	var x = o[p];
	return delete x;
}
function f1(n) {
	var k = !!n;
	return n > +k;
}
function f2(n) {
	// test unary with constant
	var k = 7;
	return k--;
}
function f3(n) {
	// test unary with constant
	var k = 7;
	return ++k;
}
function f4(n) {
	// test unary with non-constant
	var k = 8 - n;
	return k--;
}
function f5(n) {
	// test unary with non-constant
	var k = 9 - n;
	return ++k;
}

```

```diff
--- reference
+++ oxc
@@ -1,23 +0,0 @@
-function f0(o, p) {
-	var x = o[p];
-	return delete x;
-}
-function f1(n) {
-	return +!!n < n;
-}
-function f2(n) {
-	var k = 7;
-	return k--;
-}
-function f3(n) {
-	var k = 7;
-	return ++k;
-}
-function f4(n) {
-	var k = 8 - n;
-	return k--;
-}
-function f5(n) {
-	var k = 9 - n;
-	return ++k;
-}

```

## `uglify/conditionals/ternary_boolean_alternative`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 222 (-222 bytes, no whitespaces)

```js
function f1() {
	return a == b ? x : true;
}
function f2() {
	return a == b ? x : false;
}
function f3() {
	return a < b ? x : !0;
}
function f4() {
	return a < b ? x : !1;
}
function f5() {
	return c ? x : true;
}
function f6() {
	return c ? x : !1;
}
function f7() {
	return !c ? x : !0;
}
function f8() {
	return !c ? x : false;
}

```

```diff
--- reference
+++ oxc
@@ -1,24 +0,0 @@
-function f1() {
-	return a != b || x;
-}
-function f2() {
-	return a == b && x;
-}
-function f3() {
-	return !(a < b) || x;
-}
-function f4() {
-	return a < b && x;
-}
-function f5() {
-	return !c || x;
-}
-function f6() {
-	return !!c && x;
-}
-function f7() {
-	return !!c || x;
-}
-function f8() {
-	return !c && x;
-}

```

## `uglify/conditionals/ternary_boolean_consequent`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 222 (-222 bytes, no whitespaces)

```js
function f1() {
	return a == b ? true : x;
}
function f2() {
	return a == b ? false : x;
}
function f3() {
	return a < b ? !0 : x;
}
function f4() {
	return a < b ? !1 : x;
}
function f5() {
	return c ? !0 : x;
}
function f6() {
	return c ? false : x;
}
function f7() {
	return !c ? true : x;
}
function f8() {
	return !c ? !1 : x;
}

```

```diff
--- reference
+++ oxc
@@ -1,24 +0,0 @@
-function f1() {
-	return a == b || x;
-}
-function f2() {
-	return a != b && x;
-}
-function f3() {
-	return a < b || x;
-}
-function f4() {
-	return !(a < b) && x;
-}
-function f5() {
-	return !!c || x;
-}
-function f6() {
-	return !c && x;
-}
-function f7() {
-	return !c || x;
-}
-function f8() {
-	return !!c && x;
-}

```

## `uglify/evaluate/threshold_evaluate_999`

- tags: `join vars`, `remove unused`
- size: oxc 75 vs reference 321 (-246 bytes, no whitespaces)

```js
function b(x) {
	return x + x + x;
}
console.log(b('1'), b(2), b(b(b('ABCDEFGHIJK'))));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('111', 6, 'ABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJKABCDEFGHIJK');
+function b(x) {
+	return x + x + x;
+}
+console.log(b('1'), b(2), b(b(b('ABCDEFGHIJK'))));

```

## `uglify/issue-368/collapse`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 250 (-250 bytes, no whitespaces)

```js
function f1() {
	var a;
	a = typeof b === 'function' ? b() : b;
	return a !== undefined && c();
}
function f2(b) {
	var a;
	b = c();
	a = typeof b === 'function' ? b() : b;
	return 'string' == typeof a && d();
}
function f3(c) {
	var a;
	a = b(a / 2);
	if (a < 0) {
		a++;
		++c;
		return c / 2;
	}
}
function f4(c) {
	var a;
	a = b(a / 2);
	if (a < 0) {
		a++;
		c++;
		return c / 2;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,14 +0,0 @@
-function f1() {
-	return void 0 !== ('function' === typeof b ? b() : b) && c();
-}
-function f2(b) {
-	return 'string' == typeof ('function' === typeof (b = c()) ? b() : b) && d();
-}
-function f3(c) {
-	var a;
-	if ((a = b(a / 2)) < 0) return a++, ++c / 2;
-}
-function f4(c) {
-	var a;
-	if ((a = b(a / 2)) < 0) return a++, ++c / 2;
-}

```

## `uglify/collapse_vars/collapse_vars_constants`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 252 (-252 bytes, no whitespaces)

```js
function f1(x) {
	var a = 4, b = x.prop, c = 5, d = sideeffect1(), e = sideeffect2();
	return b + (function() {
		return d - a * e - c;
	})();
}
function f2(x) {
	var a = 4, b = x.prop, c = 5, not_used = sideeffect1(), e = sideeffect2();
	return b + (function() {
		return -a * e - c;
	})();
}
function f3(x) {
	var a = 4, b = x.prop, c = 5, not_used = sideeffect1();
	return b + (function() {
		return -a - c;
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,17 +0,0 @@
-function f1(x) {
-	var b = x.prop, d = sideeffect1(), e = sideeffect2();
-	return b + (function() {
-		return d - 4 * e - 5;
-	})();
-}
-function f2(x) {
-	var b = x.prop, e = (sideeffect1(), sideeffect2());
-	return b + (function() {
-		return -4 * e - 5;
-	})();
-}
-function f3(x) {
-	var b = x.prop;
-	sideeffect1();
-	return b + -9;
-}

```

## `uglify/collapse_vars/collapse_vars_do_while_drop_assign`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 265 (-265 bytes, no whitespaces)

```js
function f1(y) {
	// The constant do-while condition `c` will be not replaced.
	var c = 9;
	do {} while (c === 77);
}
function f2(y) {
	// The non-constant do-while condition `c` will not be replaced.
	var c = 5 - y;
	do {} while (c);
}
function f3(y) {
	// The constant `x` will be replaced in the do loop body.
	function fn(n) {
		console.log(n);
	}
	var a = 2, x = 7;
	do {
		fn(a = x);
		break;
	} while (y);
}
function f4(y) {
	// The non-constant `a` will not be replaced in the do loop body.
	var a = y / 4;
	do {
		return a;
	} while (y);
}
function f5(y) {
	function p(x) {
		console.log(x);
	}
	do {
		// The non-constant `a` will be replaced in p(a)
		// because it is declared in same block.
		var a = y - 3;
		p(a);
	} while (--y);
}

```

```diff
--- reference
+++ oxc
@@ -1,34 +0,0 @@
-function f1(y) {
-	var c = 9;
-	do	;
-while (77 === c);
-}
-function f2(y) {
-	var c = 5 - y;
-	do	;
-while (c);
-}
-function f3(y) {
-	function fn(n) {
-		console.log(n);
-	}
-	var x = 7;
-	do {
-		fn(x);
-		break;
-	} while (y);
-}
-function f4(y) {
-	var a = y / 4;
-	do
-		return a;
-	while (y);
-}
-function f5(y) {
-	function p(x) {
-		console.log(x);
-	}
-	do {
-		p(y - 3);
-	} while (--y);
-}

```

## `uglify/collapse_vars/collapse_vars_do_while`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 271 (-271 bytes, no whitespaces)

```js
function f1(y) {
	// The constant do-while condition `c` will not be replaced.
	var c = 9;
	do {} while (c === 77);
}
function f2(y) {
	// The non-constant do-while condition `c` will not be replaced.
	var c = 5 - y;
	do {} while (c);
}
function f3(y) {
	// The constant `x` will be replaced in the do loop body.
	function fn(n) {
		console.log(n);
	}
	var a = 2, x = 7;
	do {
		fn(a = x);
		break;
	} while (y);
}
function f4(y) {
	// The non-constant `a` will not be replaced in the do loop body.
	var a = y / 4;
	do {
		return a;
	} while (y);
}
function f5(y) {
	function p(x) {
		console.log(x);
	}
	do {
		// The non-constant `a` will be replaced in p(a)
		// because it is declared in same block.
		var a = y - 3;
		p(a);
	} while (--y);
}

```

```diff
--- reference
+++ oxc
@@ -1,34 +0,0 @@
-function f1(y) {
-	var c = 9;
-	do	;
-while (77 === c);
-}
-function f2(y) {
-	var c = 5 - y;
-	do	;
-while (c);
-}
-function f3(y) {
-	function fn(n) {
-		console.log(n);
-	}
-	var a = 2, x = 7;
-	do {
-		fn(a = x);
-		break;
-	} while (y);
-}
-function f4(y) {
-	var a = y / 4;
-	do
-		return a;
-	while (y);
-}
-function f5(y) {
-	function p(x) {
-		console.log(x);
-	}
-	do {
-		p(y - 3);
-	} while (--y);
-}

```

## `uglify/collapse_vars/collapse_vars_assignment`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 293 (-293 bytes, no whitespaces)

```js
function log(x) {
	return console.log(x), x;
}
function f0(c) {
	var a = 3 / c;
	return a = a;
}
function f1(c) {
	var a = 3 / c;
	var b = 1 - a;
	return b;
}
function f2(c) {
	var a = 3 / c;
	var b = a - 7;
	return log(c = b);
}
function f3(c) {
	var a = 3 / c;
	var b = a - 7;
	return log(c |= b);
}
function f4(c) {
	var a = 3 / c;
	var b = 2;
	return log(b += a);
}
function f5(c) {
	var b = 2;
	var a = 3 / c;
	return log(b += a);
}
function f6(c) {
	var b = g();
	var a = 3 / c;
	return log(b += a);
}

```

```diff
--- reference
+++ oxc
@@ -1,27 +0,0 @@
-function log(x) {
-	return console.log(x), x;
-}
-function f0(c) {
-	return 3 / c;
-}
-function f1(c) {
-	return 1 - 3 / c;
-}
-function f2(c) {
-	return log(c = 3 / c - 7);
-}
-function f3(c) {
-	return log(c |= 3 / c - 7);
-}
-function f4(c) {
-	var b = 2;
-	return log(b += 3 / c);
-}
-function f5(c) {
-	var b = 2;
-	return log(b += 3 / c);
-}
-function f6(c) {
-	var b = g();
-	return log(b += 3 / c);
-}

```

## `uglify/collapse_vars/collapse_vars_switch_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 293 (-293 bytes, no whitespaces)

```js
function f1() {
	var not_used = sideeffect(), x = g1 + g2;
	var y = x / 4, z = 'Bar' + y;
	switch (z) {
		case 0: return g9;
	}
}
function f2() {
	var x = g1 + g2, not_used = sideeffect();
	var y = x / 4;
	var z = 'Bar' + y;
	switch (z) {
		case 0: return g9;
	}
}
function f3(x) {
	switch (x) {
		case 1:
			var a = 3 - x;
			return a;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,20 +0,0 @@
-function f1() {
-	sideeffect();
-	switch ('Bar' + (g1 + g2) / 4) {
-		case 0: return g9;
-	}
-}
-function f2() {
-	var x = g1 + g2;
-	sideeffect();
-	switch ('Bar' + x / 4) {
-		case 0: return g9;
-	}
-}
-function f3(x) {
-	// verify no extraneous semicolon in case block before return
-	// when the var definition was eliminated
-	switch (x) {
-		case 1: return 3 - x;
-	}
-}

```

## `uglify/collapse_vars/issue_2436_11`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 326 (-326 bytes, no whitespaces)

```js
function matrix() {}
function isCollection() {}
function _randomDataForMatrix() {}
function _randomInt() {}
function f(arg1, arg2) {
	if (isCollection(arg1)) {
		var size = arg1;
		var max = arg2;
		var min = 0;
		var res = _randomDataForMatrix(size.valueOf(), min, max, _randomInt);
		return size && true === size.isMatrix ? matrix(res) : res;
	} else {
		var min = arg1;
		var max = arg2;
		return _randomInt(min, max);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +0,0 @@
-function matrix() {}
-function isCollection() {}
-function _randomDataForMatrix() {}
-function _randomInt() {}
-function f(arg1, arg2) {
-	if (isCollection(arg1)) {
-		var size = arg1, max = arg2, min = 0, res = _randomDataForMatrix(size.valueOf(), min, max, _randomInt);
-		return size && true === size.isMatrix ? matrix(res) : res;
-	} else return _randomInt(min = arg1, max = arg2);
-}

```

## `uglify/return_undefined/return_undefined`

- tags: `drop debugger`, `join vars`, `remove unused`
- size: oxc 0 vs reference 384 (-384 bytes, no whitespaces)

```js
function f0() {}
function f1() {
	return undefined;
}
function f2() {
	return void 0;
}
function f3() {
	return void 123;
}
function f4() {
	return;
}
function f5(a, b) {
	console.log(a, b);
	baz(a);
	return;
}
function f6(a, b) {
	console.log(a, b);
	if (a) {
		foo(b);
		baz(a);
		return a + b;
	}
	return undefined;
}
function f7(a, b) {
	console.log(a, b);
	if (a) {
		foo(b);
		baz(a);
		return void 0;
	}
	return a + b;
}
function f8(a, b) {
	foo(a);
	bar(b);
	return void 0;
}
function f9(a, b) {
	foo(a);
	bar(b);
	return undefined;
}
function f10() {
	return false;
}
function f11() {
	return null;
}
function f12() {
	return 0;
}

```

```diff
--- reference
+++ oxc
@@ -1,40 +0,0 @@
-function f0() {}
-function f1() {}
-function f2() {}
-function f3() {}
-function f4() {}
-function f5(a, b) {
-	console.log(a, b);
-	baz(a);
-}
-function f6(a, b) {
-	console.log(a, b);
-	if (a) {
-		foo(b);
-		baz(a);
-		return a + b;
-	}
-}
-function f7(a, b) {
-	console.log(a, b);
-	if (!a) return a + b;
-	foo(b);
-	baz(a);
-}
-function f8(a, b) {
-	foo(a);
-	bar(b);
-}
-function f9(a, b) {
-	foo(a);
-	bar(b);
-}
-function f10() {
-	return !1;
-}
-function f11() {
-	return null;
-}
-function f12() {
-	return 0;
-}

```

## `uglify/collapse_vars/collapse_vars_lvalues_drop_assign`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 0 vs reference 386 (-386 bytes, no whitespaces)

```js
function f0(x) {
	var i = ++x;
	return x += i;
}
function f1(x) {
	var a = x -= 3;
	return x += a;
}
function f2(x) {
	var z = x, a = ++z;
	return z += a;
}
function f3(x) {
	var a = x -= 3, b = x + a;
	return b;
}
function f4(x) {
	var a = x -= 3;
	return x + a;
}
function f5(x) {
	var w = e1(), v = e2(), c = v = --x, b = w = x;
	return b - c;
}
function f6(x) {
	var w = e1(), v = e2(), c = v = --x, b = w = x;
	return c - b;
}
function f7(x) {
	var w = e1(), v = e2(), c = v - x, b = w = x;
	return b - c;
}
function f8(x) {
	var w = e1(), v = e2(), b = w = x, c = v - x;
	return b - c;
}
function f9(x) {
	var w = e1(), v = e2(), b = w = x, c = v - x;
	return c - b;
}

```

```diff
--- reference
+++ oxc
@@ -1,37 +0,0 @@
-function f0(x) {
-	var i = ++x;
-	return x += i;
-}
-function f1(x) {
-	var a = x -= 3;
-	return x += a;
-}
-function f2(x) {
-	var z = x, a = ++z;
-	return z += a;
-}
-function f3(x) {
-	var a = x -= 3;
-	return x + a;
-}
-function f4(x) {
-	var a = x -= 3;
-	return x + a;
-}
-function f5(x) {
-	e1(), e2();
-	var c = --x;
-	return x - c;
-}
-function f6(x) {
-	return e1(), e2(), --x - x;
-}
-function f7(x) {
-	return e1(), x - (e2() - x);
-}
-function f8(x) {
-	return e1(), x - (e2() - x);
-}
-function f9(x) {
-	return e1(), e2() - x - x;
-}

```

## `uglify/collapse_vars/collapse_vars_lvalues`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 438 (-438 bytes, no whitespaces)

```js
function f0(x) {
	var i = ++x;
	return x += i;
}
function f1(x) {
	var a = x -= 3;
	return x += a;
}
function f2(x) {
	var z = x, a = ++z;
	return z += a;
}
function f3(x) {
	var a = x -= 3, b = x + a;
	return b;
}
function f4(x) {
	var a = x -= 3;
	return x + a;
}
function f5(x) {
	var w = e1(), v = e2(), c = v = --x, b = w = x;
	return b - c;
}
function f6(x) {
	var w = e1(), v = e2(), c = v = --x, b = w = x;
	return c - b;
}
function f7(x) {
	var w = e1(), v = e2(), c = v - x, b = w = x;
	return b - c;
}
function f8(x) {
	var w = e1(), v = e2(), b = w = x, c = v - x;
	return b - c;
}
function f9(x) {
	var w = e1(), v = e2(), b = w = x, c = v - x;
	return c - b;
}

```

```diff
--- reference
+++ oxc
@@ -1,40 +0,0 @@
-function f0(x) {
-	var i = ++x;
-	return x += i;
-}
-function f1(x) {
-	var a = x -= 3;
-	return x += a;
-}
-function f2(x) {
-	var z = x, a = ++z;
-	return z += a;
-}
-function f3(x) {
-	var a = x -= 3;
-	return x + a;
-}
-function f4(x) {
-	var a = x -= 3;
-	return x + a;
-}
-function f5(x) {
-	var w = e1(), v = e2(), c = v = --x;
-	return (w = x) - c;
-}
-function f6(x) {
-	var w = e1(), v = e2();
-	return (v = --x) - (w = x);
-}
-function f7(x) {
-	var w = e1();
-	return (w = x) - (e2() - x);
-}
-function f8(x) {
-	var w = e1();
-	return (w = x) - (e2() - x);
-}
-function f9(x) {
-	var w = e1();
-	return e2() - x - (w = x);
-}

```

## `uglify/collapse_vars/collapse_vars_misc`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 476 (-476 bytes, no whitespaces)

```js
function f0(o, a, h) {
	var b = 3 - a;
	var obj = o;
	var seven = 7;
	var prop = 'run';
	var t = obj[prop](b)[seven] = h;
	return t;
}
function f1(x) {
	var y = 5 - x;
	return y;
}
function f2(x) {
	var z = foo(), y = z / (5 - x);
	return y;
}
function f3(x) {
	var z = foo(), y = (5 - x) / z;
	return y;
}
function f4(x) {
	var z = foo(), y = (5 - u) / z;
	return y;
}
function f5(x) {
	var z = foo(), y = (5 - window.x) / z;
	return y;
}
function f6() {
	var b = window.a * window.z;
	return b && zap();
}
function f7() {
	var b = window.a * window.z;
	return b + b;
}
function f8() {
	var b = window.a * window.z;
	var c = b + 5;
	return b + c;
}
function f9() {
	var b = window.a * window.z;
	return bar() || b;
}
function f10(x) {
	var a = 5, b = 3;
	return a += b;
}
function f11(x) {
	var a = 5, b = 3;
	return a += --b;
}

```

```diff
--- reference
+++ oxc
@@ -1,41 +0,0 @@
-function f0(o, a, h) {
-	return o.run(3 - a)[7] = h;
-}
-function f1(x) {
-	return 5 - x;
-}
-function f2(x) {
-	return foo() / (5 - x);
-}
-function f3(x) {
-	return (5 - x) / foo();
-}
-function f4(x) {
-	var z = foo();
-	return (5 - u) / z;
-}
-function f5(x) {
-	var z = foo();
-	return (5 - window.x) / z;
-}
-function f6() {
-	return window.a * window.z && zap();
-}
-function f7() {
-	var b = window.a * window.z;
-	return b + b;
-}
-function f8() {
-	var b = window.a * window.z;
-	return b + (5 + b);
-}
-function f9() {
-	var b = window.a * window.z;
-	return bar() || b;
-}
-function f10(x) {
-	return 8;
-}
-function f11(x) {
-	return 7;
-}

```

## `uglify/collapse_vars/collapse_vars_short_circuit`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 732 (-732 bytes, no whitespaces)

```js
function f0(x) {
	var a = foo(), b = bar();
	return b || x;
}
function f1(x) {
	var a = foo(), b = bar();
	return b && x;
}
function f2(x) {
	var a = foo(), b = bar();
	return x && a && b;
}
function f3(x) {
	var a = foo(), b = bar();
	return a && x;
}
function f4(x) {
	var a = foo(), b = bar();
	return a && x && b;
}
function f5(x) {
	var a = foo(), b = bar();
	return x || a || b;
}
function f6(x) {
	var a = foo(), b = bar();
	return a || x || b;
}
function f7(x) {
	var a = foo(), b = bar();
	return a && b && x;
}
function f8(x, y) {
	var a = foo(), b = bar();
	return (x || a) && (y || b);
}
function f9(x, y) {
	var a = foo(), b = bar();
	return x && a || y && b;
}
function f10(x, y) {
	var a = foo(), b = bar();
	return x - a || y - b;
}
function f11(x, y) {
	var a = foo(), b = bar();
	return x - b || y - a;
}
function f12(x, y) {
	var a = foo(), b = bar();
	return x - y || b - a;
}
function f13(x, y) {
	var a = foo(), b = bar();
	return a - b || x - y;
}
function f14(x, y) {
	var a = foo(), b = bar();
	return b - a || x - y;
}

```

```diff
--- reference
+++ oxc
@@ -1,60 +0,0 @@
-function f0(x) {
-	foo();
-	return bar() || x;
-}
-function f1(x) {
-	foo();
-	return bar() && x;
-}
-function f2(x) {
-	var a = foo(), b = bar();
-	return x && a && b;
-}
-function f3(x) {
-	var a = foo();
-	bar();
-	return a && x;
-}
-function f4(x) {
-	var a = foo(), b = bar();
-	return a && x && b;
-}
-function f5(x) {
-	var a = foo(), b = bar();
-	return x || a || b;
-}
-function f6(x) {
-	var a = foo(), b = bar();
-	return a || x || b;
-}
-function f7(x) {
-	var a = foo(), b = bar();
-	return a && b && x;
-}
-function f8(x, y) {
-	var a = foo(), b = bar();
-	return (x || a) && (y || b);
-}
-function f9(x, y) {
-	var a = foo(), b = bar();
-	return x && a || y && b;
-}
-function f10(x, y) {
-	var a = foo(), b = bar();
-	return x - a || y - b;
-}
-function f11(x, y) {
-	var a = foo();
-	return x - bar() || y - a;
-}
-function f12(x, y) {
-	var a = foo(), b = bar();
-	return x - y || b - a;
-}
-function f13(x, y) {
-	return foo() - bar() || x - y;
-}
-function f14(x, y) {
-	var a = foo();
-	return bar() - a || x - y;
-}

```

## `uglify/collapse_vars/collapse_vars_short_circuited_conditions`

- tags: `join vars`, `remove unused`
- size: oxc 0 vs reference 746 (-746 bytes, no whitespaces)

```js
function c1(x) {
	var a = foo(), b = bar(), c = baz();
	return a ? b : c;
}
function c2(x) {
	var a = foo(), b = bar(), c = baz();
	return a ? c : b;
}
function c3(x) {
	var a = foo(), b = bar(), c = baz();
	return b ? a : c;
}
function c4(x) {
	var a = foo(), b = bar(), c = baz();
	return b ? c : a;
}
function c5(x) {
	var a = foo(), b = bar(), c = baz();
	return c ? a : b;
}
function c6(x) {
	var a = foo(), b = bar(), c = baz();
	return c ? b : a;
}
function i1(x) {
	var a = foo(), b = bar(), c = baz();
	if (a) return b;
	else return c;
}
function i2(x) {
	var a = foo(), b = bar(), c = baz();
	if (a) return c;
	else return b;
}
function i3(x) {
	var a = foo(), b = bar(), c = baz();
	if (b) return a;
	else return c;
}
function i4(x) {
	var a = foo(), b = bar(), c = baz();
	if (b) return c;
	else return a;
}
function i5(x) {
	var a = foo(), b = bar(), c = baz();
	if (c) return a;
	else return b;
}
function i6(x) {
	var a = foo(), b = bar(), c = baz();
	if (c) return b;
	else return a;
}

```

```diff
--- reference
+++ oxc
@@ -1,54 +0,0 @@
-function c1(x) {
-	var a = foo(), b = bar(), c = baz();
-	return a ? b : c;
-}
-function c2(x) {
-	var a = foo(), b = bar(), c = baz();
-	return a ? c : b;
-}
-function c3(x) {
-	var a = foo(), b = bar(), c = baz();
-	return b ? a : c;
-}
-function c4(x) {
-	var a = foo(), b = bar(), c = baz();
-	return b ? c : a;
-}
-function c5(x) {
-	var a = foo(), b = bar();
-	return baz() ? a : b;
-}
-function c6(x) {
-	var a = foo(), b = bar();
-	return baz() ? b : a;
-}
-function i1(x) {
-	var a = foo(), b = bar(), c = baz();
-	if (a) return b;
-	else return c;
-}
-function i2(x) {
-	var a = foo(), b = bar(), c = baz();
-	if (a) return c;
-	else return b;
-}
-function i3(x) {
-	var a = foo(), b = bar(), c = baz();
-	if (b) return a;
-	else return c;
-}
-function i4(x) {
-	var a = foo(), b = bar(), c = baz();
-	if (b) return c;
-	else return a;
-}
-function i5(x) {
-	var a = foo(), b = bar();
-	if (baz()) return a;
-	else return b;
-}
-function i6(x) {
-	var a = foo(), b = bar();
-	if (baz()) return b;
-	else return a;
-}

```

## `uglify/asm/asm_mixed`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 0 vs reference 823 (-823 bytes, no whitespaces)

```js
// adapted from http://asmjs.org/spec/latest/
function asm_GeometricMean(stdlib, foreign, buffer) {
	'use asm';
	var exp = stdlib.Math.exp;
	var log = stdlib.Math.log;
	var values = new stdlib.Float64Array(buffer);
	function logSum(start, end) {
		start = start | 0;
		end = end | 0;
		var sum = 0, p = 0, q = 0;
		// asm.js forces byte addressing of the heap by requiring shifting by 3
		for (p = start << 3, q = end << 3; (p | 0) < (q | 0); p = p + 8 | 0) {
			sum = sum + +log(values[p >> 3]);
		}
		return +sum;
	}
	function geometricMean(start, end) {
		start = start | 0;
		end = end | 0;
		return +exp(+logSum(start, end) / +(end - start | 0));
	}
	return { geometricMean };
}
function no_asm_GeometricMean(stdlib, foreign, buffer) {
	var exp = stdlib.Math.exp;
	var log = stdlib.Math.log;
	var values = new stdlib.Float64Array(buffer);
	function logSum(start, end) {
		start = start | 0;
		end = end | 0;
		var sum = 0, p = 0, q = 0;
		// asm.js forces byte addressing of the heap by requiring shifting by 3
		for (p = start << 3, q = end << 3; (p | 0) < (q | 0); p = p + 8 | 0) {
			sum = sum + +log(values[p >> 3]);
		}
		return +sum;
	}
	function geometricMean(start, end) {
		start = start | 0;
		end = end | 0;
		return +exp(+logSum(start, end) / +(end - start | 0));
	}
	return { geometricMean };
}

```

```diff
--- reference
+++ oxc
@@ -1,31 +0,0 @@
-function asm_GeometricMean(stdlib, foreign, buffer) {
-	'use asm';
-	var exp = stdlib.Math.exp;
-	var log = stdlib.Math.log;
-	var values = new stdlib.Float64Array(buffer);
-	function logSum(start, end) {
-		start = start | 0;
-		end = end | 0;
-		var sum = 0, p = 0, q = 0;
-		for (p = start << 3, q = end << 3; (p | 0) < (q | 0); p = p + 8 | 0) sum = sum + +log(values[p >> 3]);
-		return +sum;
-	}
-	function geometricMean(start, end) {
-		start = start | 0;
-		end = end | 0;
-		return +exp(+logSum(start, end) / +(end - start | 0));
-	}
-	return { geometricMean };
-}
-function no_asm_GeometricMean(stdlib, foreign, buffer) {
-	function logSum(start, end) {
-		start |= 0, end |= 0;
-		for (var sum = 0, p = 0, q = 0, p = start << 3, q = end << 3; (0 | p) < (0 | q); p = p + 8 | 0) sum += +log(values[p >> 3]);
-		return +sum;
-	}
-	function geometricMean(start, end) {
-		return start |= 0, end |= 0, +exp(+logSum(start, end) / (end - start | 0));
-	}
-	var exp = stdlib.Math.exp, log = stdlib.Math.log, values = new stdlib.Float64Array(buffer);
-	return { geometricMean };
-}

```

