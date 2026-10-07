# terser / larger — Output longer than expected (possible missing optimization)

Fixtures: 979

[← terser](README.md) · [← all families](../README.md)

## `terser/arguments/arguments_and_destructuring_2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 70 vs reference 69 (no whitespaces: +1, formatted: +1)

```js
(function(a, { d }) {
	console.log(a = 'foo', arguments[0]);
})('baz', { d: 'Bar' });

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function(a, { d }) {
+(function(a, { d }) {
 	console.log(a = 'foo', arguments[0]);
-}('baz', { d: 'Bar' });
+})('baz', { d: 'Bar' });

```

## `terser/arguments/arguments_and_destructuring_3`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 72 vs reference 71 (no whitespaces: +1, formatted: +1)

```js
(function({ d }, a) {
	console.log(a = 'foo', arguments[0].d);
})({ d: 'Bar' }, 'baz');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function({ d }, a) {
+(function({ d }, a) {
 	console.log(a = 'foo', arguments[0].d);
-}({ d: 'Bar' }, 'baz');
+})({ d: 'Bar' }, 'baz');

```

## `terser/collapse_vars/issue_1858`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 61 vs reference 60 (no whitespaces: +1, formatted: +1)

```js
console.log((function(x) {
	var a = {}, b = a.b = x;
	return a.b + b;
})(1));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log((function(x) {
-	var a = {}, b = a.b = 1;
+	var a = {}, b = a.b = x;
 	return a.b + b;
-})());
+})(1));

```

## `terser/collapse_vars/issue_2187_1`

- tags: `join vars`, `remove unused`
- size: oxc 74 vs reference 73 (no whitespaces: +1, formatted: +1)

```js
var a = 1;
!(function(foo) {
	foo();
	var a = 2;
	console.log(a);
})(function() {
	console.log(a);
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var a = 1;
-!function(foo) {
+(function(foo) {
 	foo();
 	console.log(2);
-}(function() {
+})(function() {
 	console.log(a);
 });

```

## `terser/collapse_vars/issue_2187_2`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 54 (no whitespaces: +1, formatted: +1)

```js
var b = 1;
console.log((function(a) {
	return a && ++b;
})(b--));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var b = 1;
 console.log((function(a) {
-	return b-- && ++b;
-})());
+	return a && ++b;
+})(b--));

```

## `terser/concat_strings/concat_1`

- size: oxc 154 vs reference 153 (no whitespaces: +1, formatted: +3)

```js
var a = 'foo' + 'bar' + x() + 'moo' + 'foo' + y() + 'x' + 'y' + 'z' + q();
var b = 'foo' + 1 + x() + 2 + 'boo';
var c = 1 + x() + 2 + 'boo';
var d = 1 + x() + 2 + 3 + 'boo';
var e = 1 + x() + 2 + 'X' + 3 + 'boo';
var f = '\0' + 360 + '\0' + 8 + '\0';

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 'foobar' + x() + 'moofoo' + y() + 'xyz' + q();
-var b = 'foo1' + x() + '2boo';
+var b = 'foo1' + x() + 2 + 'boo';
 var c = 1 + x() + 2 + 'boo';
 var d = 1 + x() + 2 + 3 + 'boo';
 var e = 1 + x() + 2 + 'X3boo';

```

## `terser/dead_code/dead_code_2_should_warn`

- size: oxc 47 vs reference 46 (no whitespaces: +1, formatted: +3)

```js
function f() {
	g();
	x = 10;
	throw new Error('foo');
	if (x) {
		y();
		var x;
		function g() {}
		(function() {
			var q;
			function y() {}
		})();
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f() {
-	var g;
-	g();
+	x = 10;
 	throw Error('foo');
+	var x;
 }
 f();

```

## `terser/dead_code/dead_code_const_declaration`

- tags: `join vars`, `sequences`
- size: oxc 43 vs reference 42 (no whitespaces: +1, formatted: +2)

```js
var unused;
const CONST_FOO = false;
if (CONST_FOO) {
	console.log('unreachable');
	var moo;
	function bar() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var unused;
 const CONST_FOO = !1;
-var moo, bar;
+if (0) var moo;

```

## `terser/destructuring/issue_3205_1`

- tags: `join vars`, `remove unused`
- size: oxc 72 vs reference 71 (no whitespaces: +1, formatted: +3)

```js
function f(a) {
	function g() {
		var { b, c } = a;
		console.log(b, c);
	}
	g();
}
f({
	b: 2,
	c: 3
});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f(a) {
-	(function() {
+	function g() {
 		var { b, c } = a;
 		console.log(b, c);
-	})();
+	}
+	g();
 }
 f({
 	b: 2,

```

## `terser/drop_unused/drop_fargs`

- tags: `remove unused`
- size: oxc 15 vs reference 14 (no whitespaces: +1, formatted: +1)

```js
function f(a) {
	var b = a;
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-function f() {}
+function f(a) {}

```

## `terser/drop_unused/issue_1583`

- tags: `join vars`, `remove unused`
- size: oxc 93 vs reference 92 (no whitespaces: +1, formatted: -1)

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
@@ -1,9 +1,9 @@
 function m(t) {
 	(function(e) {
-		(function() {
-			return (function(a) {
-				return a;
-			})(function(a) {});
-		})();
-	})();
+		t = e();
+	})(function() {
+		return (function(a) {
+			return a;
+		})(function(a) {});
+	});
 }

```

## `terser/drop_unused/issue_1830_2`

- tags: `remove unused`
- size: oxc 63 vs reference 62 (no whitespaces: +1, formatted: +2)

```js
!(function() {
	L: for (var a = 1, b = console.log(a); --a;) continue L;
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
-!(function() {
-	var a = 1;
-	L: for (console.log(a); --a;) continue L;
+(function() {
+	L: for (var a = 1, b = console.log(a); --a;) continue L;
 })();

```

## `terser/drop_unused/issue_1838`

- tags: `join vars`, `remove unused`
- size: oxc 25 vs reference 24 (no whitespaces: +1, formatted: +3)

```js
function f() {
	var b = a;
	while (c);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f() {
-	for (a; c;);
+	a;
+	for (; c;);
 }

```

## `terser/export/async_func`

- tags: `remove unused`
- size: oxc 30 vs reference 29 (no whitespaces: +1, formatted: +1)

```js
export async function Foo(x) {}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-export async function Foo() {}
+export async function Foo(x) {}

```

## `terser/export/issue_2131`

- tags: `remove unused`
- size: oxc 59 vs reference 58 (no whitespaces: +1, formatted: +1)

```js
function no() {
	console.log(42);
}
function go() {
	console.log(42);
}
var X = 1, Y = 2;
export function main() {
	go(X);
}

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 	console.log(42);
 }
 export function main() {
-	go();
+	go(1);
 }

```

## `terser/export/issue_2134_1`

- tags: `join vars`, `remove unused`
- size: oxc 41 vs reference 40 (no whitespaces: +1, formatted: +1)

```js
export function Foo(x) {}
Foo.prototype = {};

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export function Foo() {}
+export function Foo(x) {}
 Foo.prototype = {};

```

## `terser/export/issue_2134_2`

- tags: `join vars`, `remove unused`
- size: oxc 47 vs reference 46 (no whitespaces: +1, formatted: +1)

```js
export async function Foo(x) {}
Foo.prototype = {};

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-export async function Foo() {}
+export async function Foo(x) {}
 Foo.prototype = {};

```

## `terser/hoist_props/hoist_function_with_call`

- tags: `join vars`, `remove unused`, `keep function names`, `2 iterations`
- size: oxc 105 vs reference 104 (no whitespaces: +1, formatted: +1)

```js
var o = {
	p: function Foo(value) {
		return 10 * value;
	},
	x: 1,
	y: 2
};
console.log(o.p.name, o.p === o.p, o.p(o.x), o.p(o.y));

```

```diff
--- reference
+++ oxc
@@ -5,4 +5,4 @@
 	x: 1,
 	y: 2
 };
-console.log(o.p.name, o.p == o.p, o.p(o.x), o.p(o.y));
+console.log(o.p.name, o.p === o.p, o.p(o.x), o.p(o.y));

```

## `terser/hoist_props/issue_2473_1`

- tags: `join vars`, `remove unused`
- size: oxc 19 vs reference 18 (no whitespaces: +1, formatted: +4)

```js
var x = {};
var y = [];
var z = {};

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var x = {};
-var y = [];
+var x = {}, y = [], z = {};

```

## `terser/hoist_props/issue_2473_2`

- tags: `join vars`, `remove unused`
- size: oxc 19 vs reference 18 (no whitespaces: +1, formatted: +4)

```js
var x = {};
var y = [];
var z = {};

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var x = {};
-var y = [];
+var x = {}, y = [], z = {};

```

## `terser/if_return/if_return_6`

- tags: `sequences`, `remove unused`
- size: oxc 33 vs reference 32 (no whitespaces: +1, formatted: +2)

```js
function f(x) {
	return x ? true : void 0;
	return y;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f(x) {
-	return !!x || void 0;
+	return x ? !0 : void 0;
 }

```

## `terser/issue_1673/side_effects_else`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 58 (no whitespaces: +1, formatted: +3)

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
@@ -1,6 +1,7 @@
 function f(x) {
-	(function() {
+	function g() {
 		x || console.log('PASS');
-	})();
+	}
+	g();
 }
 f(0);

```

## `terser/issue_1673/side_effects_label`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 67 (no whitespaces: +1, formatted: +3)

```js
function f(x) {
	function g() {
		L: {
			console.log('PASS');
			break L;
		}
	}
	g();
}
f(0);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 function f(x) {
-	(function() {
+	function g() {
 		L: {
 			console.log('PASS');
 			break L;
 		}
-	})();
+	}
+	g();
 }
 f(0);

```

## `terser/issue_1673/side_effects_switch`

- tags: `join vars`, `remove unused`
- size: oxc 79 vs reference 78 (no whitespaces: +1, formatted: +3)

```js
function f() {
	function g() {
		switch (0) {
			default:
			case console.log('PASS'):
		}
	}
	g();
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 function f() {
-	(function() {
+	function g() {
 		switch (0) {
 			default:
 			case console.log('PASS'):
 		}
-	})();
+	}
+	g();
 }
 f();

```

## `terser/issue_281/drop_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 59 (no whitespaces: +1, formatted: +2)

```js
var a = 1;
!(function(a_1) {
	a++;
})(a++ + (a && a.var));
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 1;
-!function(a_1) {
+(function(a_1) {
 	a++;
-}((a++, a && a.var));
+})(a++ + (a && a.var));
 console.log(a);

```

## `terser/issue_281/keep_fargs`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 59 (no whitespaces: +1, formatted: +2)

```js
var a = 1;
!(function(a_1) {
	a++;
})(a++ + (a && a.var));
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 1;
-!function(a_1) {
+(function(a_1) {
 	a++;
-}((a++, a && a.var));
+})(a++ + (a && a.var));
 console.log(a);

```

## `terser/issue_640/negate_iife_1`

- size: oxc 24 vs reference 23 (no whitespaces: +1, formatted: +1)

```js
(function() {
	stuff();
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function() {
+(function() {
 	stuff();
-}();
+})();

```

## `terser/loops/keep_collapse_const_in_own_block_scope_2`

- tags: `join vars`
- size: oxc 58 vs reference 57 (no whitespaces: +1, formatted: +2)

```js
const c = 5;
var i = 2;
while (i--) console.log(i);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 const c = 5;
-for (var i = 2; i--;) console.log(i);
-console.log(c);
+var i = 2;
+for (; i--;) console.log(i);
+console.log(5);

```

## `terser/object/prop_arrow_with_nested_this`

- size: oxc 283 vs reference 282 (no whitespaces: +1, formatted: -15)

```js
function run(arg) {
	console.log(arg === this ? 'global' : arg === foo ? 'foo' : arg);
}
var foo = {
	func_func_this: function() {
		(function() {
			run(this);
		})();
	},
	func_arrow_this: function() {
		(() => {
			run(this);
		})();
	},
	arrow_func_this: () => {
		(function() {
			run(this);
		})();
	},
	arrow_arrow_this: () => {
		(() => {
			run(this);
		})();
	}
};
for (var key in foo) foo[key]();

```

```diff
--- reference
+++ oxc
@@ -2,25 +2,21 @@
 	console.log(arg === this ? 'global' : arg === foo ? 'foo' : arg);
 }
 var foo = {
-	func_func_this() {
+	func_func_this: function() {
 		(function() {
 			run(this);
 		})();
 	},
-	func_arrow_this() {
-		(() => {
-			run(this);
-		})();
+	func_arrow_this: function() {
+		run(this);
 	},
-	arrow_func_this() {
+	arrow_func_this: () => {
 		(function() {
 			run(this);
 		})();
 	},
 	arrow_arrow_this: () => {
-		(() => {
-			run(this);
-		})();
+		run(this);
 	}
 };
 for (var key in foo) foo[key]();

```

## `terser/properties/join_object_assignments_undefined_2`

- tags: `join vars`
- size: oxc 44 vs reference 43 (no whitespaces: +1, formatted: +1)

```js
var o = {};
o[undefined] = 1;
console.log(o[undefined]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var o = { undefined: 1 };
+var o = {};
+o[void 0] = 1;
 console.log(o[void 0]);

```

## `terser/properties/join_object_assignments_void_0`

- tags: `join vars`
- size: oxc 44 vs reference 43 (no whitespaces: +1, formatted: +1)

```js
var o = {};
o[void 0] = 1;
console.log(o[void 0]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var o = { undefined: 1 };
+var o = {};
+o[void 0] = 1;
 console.log(o[void 0]);

```

## `terser/reduce_vars/boolean_binary_assign`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 36 (no whitespaces: +1, formatted: +1)

```js
!(function() {
	var a;
	void 0 && (a = 1);
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function() {
+(function() {
 	var a;
 	console.log(a);
-}();
+})();

```

## `terser/reduce_vars/cond_assign`

- tags: `join vars`, `remove unused`
- size: oxc 37 vs reference 36 (no whitespaces: +1, formatted: +1)

```js
!(function() {
	var a;
	void 0 ? a = 1 : 0;
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function() {
+(function() {
 	var a;
 	console.log(a);
-}();
+})();

```

## `terser/reduce_vars/defun_label`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 74 vs reference 73 (no whitespaces: +1, formatted: +3)

```js
!(function() {
	function f(a) {
		L: {
			if (a) break L;
			return 1;
		}
	}
	console.log(f(2));
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-!(function() {
-	console.log((function(a) {
+(function() {
+	function f(a) {
 		L: {
-			if (2) break L;
+			if (a) break L;
 			return 1;
 		}
-	})());
+	}
+	console.log(f(2));
 })();

```

## `terser/reduce_vars/issue_1850_2`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 43 (no whitespaces: +1, formatted: +2)

```js
function f() {
	console.log(a, a, a);
}
var a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-var a = 1;
-(function() {
+function f() {
 	console.log(a, a, a);
-})();
+}
+var a = 1;
+f();

```

## `terser/reduce_vars/issue_2450_4`

- tags: `join vars`, `remove unused`
- size: oxc 82 vs reference 81 (no whitespaces: +1, formatted: +2)

```js
var a;
function f(b) {
	console.log(a === b);
	a = b;
}
function g() {}
for (var i = 3; --i >= 0;) f(g);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var a;
-function g() {}
-for (var i = 3; --i >= 0;) (function(b) {
+function f(b) {
 	console.log(a === b);
 	a = b;
-})(g);
+}
+function g() {}
+for (var i = 3; --i >= 0;) f(g);

```

## `terser/reduce_vars/issue_2450_5`

- tags: `join vars`, `remove unused`
- size: oxc 91 vs reference 90 (no whitespaces: +1, formatted: -1)

```js
var a;
function f(b) {
	console.log(a === b);
	a = b;
}
function g() {}
[
	1,
	2,
	3
].forEach(function() {
	f(g);
});

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,13 @@
 var a;
+function f(b) {
+	console.log(a === b);
+	a = b;
+}
 function g() {}
 [
 	1,
 	2,
 	3
 ].forEach(function() {
-	(function(b) {
-		console.log(a === b);
-		a = b;
-	})(g);
+	f(g);
 });

```

## `terser/reduce_vars/issue_2669`

- tags: `join vars`, `remove unused`
- size: oxc 43 vs reference 42 (no whitespaces: +1, formatted: +2)

```js
let foo;
console.log(([foo] = ['PASS']) && foo);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 let foo;
-console.log(([foo] = ['PASS'], foo));
+console.log(([foo] = ['PASS']) && foo);

```

## `terser/reduce_vars/issue_2774`

- tags: `join vars`, `remove unused`
- size: oxc 53 vs reference 52 (no whitespaces: +1, formatted: +2)

```js
console.log({ get a() {
	var b;
	(b = true) && b.c;
	b = void 0;
} }.a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log({ get a() {
 	var b;
-	b = true, b.c;
+	(b = !0) && b.c;
 	b = void 0;
 } }.a);

```

## `terser/reduce_vars/unsafe_evaluate_modified`

- tags: `join vars`, `remove unused`
- size: oxc 630 vs reference 629 (no whitespaces: +1, formatted: +6)

```js
console.log((function() {
	var o = { p: 1 };
	o.p++;
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 2 };
	--o.p;
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 3 };
	o.p += '';
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 4 };
	o = {};
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 5 };
	o.p = -9;
	console.log(o.p);
	return o.p;
})());
function inc() {
	this.p++;
}
console.log((function() {
	var o = { p: 6 };
	inc.call(o);
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 7 };
	console.log([o][0].p++);
	return o.p;
})());
console.log((function() {
	var o = { p: 8 };
	console.log({ q: o }.q.p++);
	return o.p;
})());

```

```diff
--- reference
+++ oxc
@@ -17,7 +17,7 @@
 	return o.p;
 })());
 console.log((function() {
-	var o;
+	var o = { p: 4 };
 	o = {};
 	console.log(o.p);
 	return o.p;
@@ -39,7 +39,7 @@
 })());
 console.log((function() {
 	var o = { p: 7 };
-	console.log([o][0].p++);
+	console.log(o.p++);
 	return o.p;
 })());
 console.log((function() {

```

## `terser/switch/issue_1698`

- size: oxc 43 vs reference 42 (no whitespaces: +1, formatted: +1)

```js
var a = 1;
!(function() {
	switch (a++) {}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var a = 1;
-!function() {
+(function() {
 	a++;
-}();
+})();
 console.log(a);

```

## `terser/assignment/op_equals_right_local_var`

- size: oxc 177 vs reference 175 (no whitespaces: +2, formatted: +9)

```js
var x;
x = (x -= 2) ^ x;
x = 3 + x;
x = 3 - x;
x = 3 / x;
x = 3 * x;
x = 3 >> x;
x = 3 << x;
x = 3 >>> x;
x = 3 | x;
x = 3 ^ x;
x = 3 % x;
x = 3 & x;
x = g() + x;
x = g() - x;
x = g() / x;
x = g() * x;
x = g() >> x;
x = g() << x;
x = g() >>> x;
x = g() | x;
x = g() ^ x;
x = g() % x;
x = g() & x;

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,15 @@
-var x;
-x = (x -= 2) ^ x;
+var x = (x -= 2) ^ x;
 x = 3 + x;
 x = 3 - x;
 x = 3 / x;
-x *= 3;
+x = 3 * x;
 x = 3 >> x;
 x = 3 << x;
 x = 3 >>> x;
-x |= 3;
-x ^= 3;
+x = 3 | x;
+x = 3 ^ x;
 x = 3 % x;
-x &= 3;
+x = 3 & x;
 x = g() + x;
 x = g() - x;
 x = g() / x;

```

## `terser/async/async_function_expression`

- tags: `remove unused`
- size: oxc 85 vs reference 83 (no whitespaces: +2, formatted: +5)

```js
var named = async function foo() {
	await bar(1 + 0) + (2 + 0);
};
var anon = async function() {
	await (1 + 0) + bar(2 + 0);
};

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var named = async function() {
-	await bar(1);
+	await bar(1) + 2;
 };
 var anon = async function() {
-	await 1, bar(2);
+	await 1 + bar(2);
 };

```

## `terser/classes/class_duplication`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 50 vs reference 48 (no whitespaces: +2, formatted: +2)

```js
class Foo {
	foo() {
		leak(new Foo());
	}
}
export default Foo;

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-export default (class Foo {
+class Foo {
 	foo() {
 		leak(new Foo());
 	}
-});
+}
+export default Foo;

```

## `terser/collapse_vars/cascade_conditional`

- tags: `join vars`
- size: oxc 42 vs reference 40 (no whitespaces: +2, formatted: +4)

```js
function f(a, b) {
	(a = x(), a) ? a++ : (b = y(a), b(a));
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f(a, b) {
-	(a = x()) ? a++ : (b = y(a))(a);
+	a = x(), a ? a++ : (b = y(a), b(a));
 }

```

## `terser/collapse_vars/cascade_forin`

- tags: `join vars`
- size: oxc 77 vs reference 75 (no whitespaces: +2, formatted: +3)

```js
var a;
function f(b) {
	return [
		b,
		b,
		b
	];
}
for (var c in a = console, f(a)) console.log(c);

```

```diff
--- reference
+++ oxc
@@ -6,4 +6,4 @@
 		b
 	];
 }
-for (var c in f(a = console)) console.log(c);
+for (var c in a = console, f(a)) console.log(c);

```

## `terser/collapse_vars/collapse_vars_properties`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 86 vs reference 84 (no whitespaces: +2, formatted: +2)

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
@@ -1,6 +1,6 @@
 function f1(obj) {
-	return !!-obj.LiteralProperty;
+	return !!-+obj.LiteralProperty;
 }
 function f2(obj) {
-	return ~!!-obj.OneTwo;
+	return ~!!-+obj.OneTwo;
 }

```

## `terser/collapse_vars/issue_1631_2`

- tags: `join vars`, `sequences`
- size: oxc 93 vs reference 91 (no whitespaces: +2, formatted: +3)

```js
var a = 0, b = 1;
function f() {
	a = 2;
	return 4;
}
function g() {
	var t = f();
	b = a + t;
	return b;
}
console.log(g());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
+var a = 0, b = 1;
 function f() {
 	return a = 2, 4;
 }
 function g() {
 	var t = f();
-	return b = a + t;
+	return b = a + t, b;
 }
-var a = 0, b = 1;
 console.log(g());

```

## `terser/collapse_vars/issue_2187_3`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 53 (no whitespaces: +2, formatted: +2)

```js
var b = 1;
console.log((function(a) {
	return a && ++b;
})(b--));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var b = 1;
-console.log(function(a) {
+console.log((function(a) {
 	return a && ++b;
-}(b--));
+})(b--));

```

## `terser/collapse_vars/issue_2319_1`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 65 (no whitespaces: +2, formatted: -1)

```js
console.log((function(a) {
	return a;
})(!(function() {
	return this;
})()));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log((function(a) {
-	return !(function() {
-		return this;
-	})();
-})());
+	return a;
+})(!(function() {
+	return this;
+})()));

```

## `terser/collapse_vars/issue_2319_3`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 78 (no whitespaces: +2, formatted: -1)

```js
'use strict';
console.log((function(a) {
	return a;
})(!(function() {
	return this;
})()));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 'use strict';
 console.log((function(a) {
-	return !(function() {
-		return this;
-	})();
-})());
+	return a;
+})(!(function() {
+	return this;
+})()));

```

## `terser/collapse_vars/may_throw_1`

- tags: `join vars`
- size: oxc 43 vs reference 41 (no whitespaces: +2, formatted: +2)

```js
function f() {
	var a_2 = (function() {
		var a;
	})();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f() {
-	var a_2 = function() {
+	var a_2 = (function() {
 		var a;
-	}();
+	})();
 }

```

## `terser/collapse_vars/ref_scope`

- tags: `join vars`, `remove unused`
- size: oxc 91 vs reference 89 (no whitespaces: +2, formatted: +2)

```js
console.log((function() {
	var a = 1, b = 2, c = 3;
	var a = c++, b = b /= a;
	return (function() {
		return a;
	})() + b;
})());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,5 @@
 console.log((function() {
-	var a = 1, b = 2, c = 3;
-	b = b /= a = c++;
+	var a = 1, b = 2, c = 3, a = c++, b = b /= a;
 	return (function() {
 		return a;
 	})() + b;

```

## `terser/collapse_vars/unused_orig`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 99 vs reference 97 (no whitespaces: +2, formatted: +3)

```js
var a = 1;
console.log((function(b) {
	var a;
	var c = b;
	for (var d in c) {
		var a;
		return --b + c[0];
	}
	try {} catch (e) {
		--b + a;
	}
	a && a.NaN;
})([2]), a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var a = 1;
 console.log((function(b) {
-	var c = b;
+	var a, c = b;
 	for (var d in c) {
 		var a;
 		return --b + c[0];

```

## `terser/conditionals/cond_7`

- tags: `sequences`
- size: oxc 129 vs reference 127 (no whitespaces: +2, formatted: +1)

```js
var x, y, z, a, b;
if (y) {
	x = 1 + 1;
} else {
	x = 2;
}
if (y) {
	x = 1 + 1;
} else if (z) {
	x = 2;
} else {
	x = 3 - 1;
}
x = y ? 'foo' : 'fo' + 'o';
x = y ? 'foo' : y ? 'foo' : 'fo' + 'o';
if (condition()) {
	x = 10 + 10;
} else {
	x = 20;
}
if (z) {
	x = 'fuji';
} else if (condition()) {
	x = 'fu' + 'ji';
} else {
	x = 'fuji';
}
x = condition() ? 'foobar' : 'foo' + 'bar';
x = y ? a : b;
x = y ? 'foo' : 'fo';

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,2 @@
-var x, y, z, a, b;
-x = 2;
-x = 2;
-x = 'foo';
-x = 'foo';
-condition(), x = 20;
-z || condition(), x = 'fuji';
-x = (condition(), 'foobar');
-x = y ? a : b;
-x = y ? 'foo' : 'fo';
+var x = 2, y, z, a, b;
+x = 2, x = 'foo', x = 'foo', x = (condition(), 20), x = (z || condition(), 'fuji'), x = (condition(), 'foobar'), x = y ? a : b, x = y ? 'foo' : 'fo';

```

## `terser/conditionals/issue_1645_1`

- tags: `sequences`
- size: oxc 61 vs reference 59 (no whitespaces: +2, formatted: +3)

```js
var a = 100, b = 10;
(b = a) ? a++ + (b += a) ? b += a : b += a : b ^= a;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
 var a = 100, b = 10;
-(b = a) ? (a++, b += a, b += a) : b ^= a;
-console.log(a, b);
+(b = a) ? (a++ + (b += a), b += a) : b ^= a, console.log(a, b);

```

## `terser/conditionals/ternary_boolean_alternative`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 224 vs reference 222 (no whitespaces: +2, formatted: +5)

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
@@ -5,7 +5,7 @@
 	return a == b && x;
 }
 function f3() {
-	return !(a < b) || x;
+	return a < b ? x : !0;
 }
 function f4() {
 	return a < b && x;
@@ -14,10 +14,10 @@
 	return !c || x;
 }
 function f6() {
-	return !!c && x;
+	return c ? x : !1;
 }
 function f7() {
-	return !!c || x;
+	return c ? !0 : x;
 }
 function f8() {
 	return !c && x;

```

## `terser/conditionals/ternary_boolean_consequent`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 224 vs reference 222 (no whitespaces: +2, formatted: +5)

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
@@ -8,10 +8,10 @@
 	return a < b || x;
 }
 function f4() {
-	return !(a < b) && x;
+	return a < b ? !1 : x;
 }
 function f5() {
-	return !!c || x;
+	return c ? !0 : x;
 }
 function f6() {
 	return !c && x;
@@ -20,5 +20,5 @@
 	return !c || x;
 }
 function f8() {
-	return !!c && x;
+	return c ? x : !1;
 }

```

## `terser/destructuring/mangle_destructuring_assign_toplevel_false`

- tags: `mangle`, `keep function names`, `keep class names`, `remove unused`
- size: oxc 154 vs reference 152 (no whitespaces: +2, formatted: +3)

```js
function test(opts) {
	let s, o, r;
	let a = opts.a || {
		e: 7,
		n: 8
	};
	({t, e, n, s = 9, o, r} = a);
	console.log(t, e, n, s, o, r);
}
let t, e, n;
test({ a: {
	t: 1,
	e: 2,
	n: 3,
	s: 4,
	o: 5,
	r: 6
} });
test({});

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
-function test(o) {
-	let s, l, a;
-	let c = o.a || {
+function test(r) {
+	let i, a, o;
+	let s = r.a || {
 		e: 7,
 		n: 8
 	};
-	({t, e, n, s = 9, o: l, r: a} = c);
-	console.log(t, e, n, s, l, a);
+	({t, e, n, s: i = 9, o: a, r: o} = s);
+	console.log(t, e, n, i, a, o);
 }
 let t, e, n;
 test({ a: {

```

## `terser/drop_unused/double_assign_2`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 53 (no whitespaces: +2, formatted: +4)

```js
for (var i = 0; i < 2; i++) a = void 0, a = {}, console.log(a);
var a;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-for (var i = 0; i < 2; i++) void 0, a = {}, console.log(a);
+for (var i = 0; i < 2; i++) a = void 0, a = {}, console.log(a);
 var a;

```

## `terser/drop_unused/issue_3192`

- tags: `remove unused`
- size: oxc 125 vs reference 123 (no whitespaces: +2, formatted: +4)

```js
(function(a) {
	console.log(a = 'foo', arguments[0]);
})('bar');
(function(a) {
	'use strict';
	console.log(a = 'foo', arguments[0]);
})('bar');

```

```diff
--- reference
+++ oxc
@@ -3,5 +3,5 @@
 })('bar');
 (function(a) {
 	'use strict';
-	console.log('foo', arguments[0]);
+	console.log(a = 'foo', arguments[0]);
 })('bar');

```

## `terser/drop_unused/vardef_value`

- tags: `join vars`, `remove unused`
- size: oxc 52 vs reference 50 (no whitespaces: +2, formatted: +3)

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
@@ -1,5 +1,6 @@
 function f() {
-	return (function() {
+	function g() {
 		return x();
-	})()(42);
+	}
+	return g()(42);
 }

```

## `terser/evaluate/in_boolean_context`

- tags: `sequences`
- size: oxc 86 vs reference 84 (no whitespaces: +2, formatted: +8)

```js
console.log(!42, !'foo', ![1, 2], !/foo/, !b(42), !b('foo'), !b([1, 2]), !b(/foo/), ![1, foo()], ![
	1,
	foo(),
	2
]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(!1, !1, !1, !1, !b(42), !b('foo'), !b([1, 2]), !b(/foo/), (foo(), !1), (foo(), !1));
+console.log(!1, !1, !1, !1, !b(42), !b('foo'), !b([1, 2]), !b(/foo/), ![1, foo()], ![
+	1,
+	foo(),
+	2
+]);

```

## `terser/evaluate/positive_zero`

- size: oxc 28 vs reference 26 (no whitespaces: +2, formatted: +2)

```js
console.log(+'', +-'', 1 / +0, 1 / +'');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(0, -0, 1 / 0, 1 / 0);
+console.log(0, +-'', 1 / 0, 1 / 0);

```

## `terser/harmony/classes`

- size: oxc 164 vs reference 162 (no whitespaces: +2, formatted: +5)

```js
class SomeClass {
	constructor() {}
	foo() {}
}
class NoSemi {
	constructor(...args) {}
	foo() {}
}
class ChildClass extends SomeClass {}
var asExpression = class AsExpression {};
var nameless = class {};

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 class SomeClass {
+	constructor() {}
 	foo() {}
 }
 class NoSemi {
@@ -6,5 +7,5 @@
 	foo() {}
 }
 class ChildClass extends SomeClass {}
-var asExpression = class AsExpression {};
+var asExpression = class {};
 var nameless = class {};

```

## `terser/harmony/issue_2349`

- size: oxc 110 vs reference 108 (no whitespaces: +2, formatted: -2)

```js
function foo(boo, key) {
	const value = boo.get();
	return value.map(({ [key]: bar }) => bar);
}
console.log(foo({ get: () => [{ blah: 42 }] }, 'blah'));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-function foo(o, n) {
-	const t = o.get();
-	return t.map(({ [n]: o }) => o);
+function foo(boo, key) {
+	return boo.get().map(({ [key]: bar }) => bar);
 }
 console.log(foo({ get: () => [{ blah: 42 }] }, 'blah'));

```

## `terser/harmony/shorthand_keywords`

- size: oxc 231 vs reference 229 (no whitespaces: +2, formatted: +8)

```js
var foo = 0, async = 1, await = 2, implements = 3, package = 4, private = 5, protected = 6, static = 7, yield = 8;
console.log({
	foo,
	0: 0,
	NaN,
	async,
	await,
	false: false,
	implements,
	null: null,
	package,
	private,
	protected,
	static,
	this: this,
	true: true,
	undefined,
	yield
});

```

```diff
--- reference
+++ oxc
@@ -2,10 +2,10 @@
 console.log({
 	foo,
 	0: 0,
-	NaN,
+	NaN: NaN,
 	async,
 	await,
-	false: false,
+	false: !1,
 	implements,
 	null: null,
 	package,
@@ -13,7 +13,7 @@
 	protected,
 	static,
 	this: this,
-	true: true,
-	undefined,
+	true: !0,
+	undefined: void 0,
 	yield
 });

```

## `terser/hoist_props/issue_2508_5`

- tags: `join vars`, `remove unused`
- size: oxc 47 vs reference 45 (no whitespaces: +2, formatted: +5)

```js
var o = { f: function(x) {
	console.log(x);
} };
o.f(o.f);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var o_f = function(x) {
+var o = { f: function(x) {
 	console.log(x);
-};
-o_f(o_f);
+} };
+o.f(o.f);

```

## `terser/hoist_props/issue_2508_6`

- tags: `join vars`, `remove unused`
- size: oxc 39 vs reference 37 (no whitespaces: +2, formatted: +5)

```js
var o = { f: (x) => {
	console.log(x);
} };
o.f(o.f);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var o_f = (x) => {
+var o = { f: (x) => {
 	console.log(x);
-};
-o_f(o_f);
+} };
+o.f(o.f);

```

## `terser/if_return/issue_1437`

- tags: `sequences`
- size: oxc 57 vs reference 55 (no whitespaces: +2, formatted: +1)

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
@@ -1,3 +1,5 @@
 function x() {
-	return a() ? b() : (0, c()) ? d() : (e(), void f());
+	if (a()) return b();
+	if (c()) return d();
+	e(), f();
 }

```

## `terser/if_return/issue_1437_conditionals`

- tags: `sequences`
- size: oxc 57 vs reference 55 (no whitespaces: +2, formatted: +1)

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
@@ -1,3 +1,5 @@
 function x() {
-	return a() ? b() : (0, c()) ? d() : (e(), void f());
+	if (a()) return b();
+	if (c()) return d();
+	e(), f();
 }

```

## `terser/issue_1639/issue_1639_3`

- tags: `join vars`, `sequences`
- size: oxc 36 vs reference 34 (no whitespaces: +2, formatted: +3)

```js
var a = 100, b = 10;
a++ && false && a ? 0 : 0;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 100, b = 10;
-console.log(++a, b);
+a++, console.log(a, b);

```

## `terser/issue_44/issue_44_valid_ast_1`

- tags: `remove unused`
- size: oxc 43 vs reference 41 (no whitespaces: +2, formatted: +3)

```js
function a(b) {
	for (var i = 0, e = b.qoo();; i++) {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,3 @@
 function a(b) {
-	var i = 0;
-	for (b.qoo();; i++);
+	for (var i = 0, e = b.qoo();; i++);
 }

```

## `terser/issue_747/dont_reuse_prop`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 70 vs reference 68 (no whitespaces: +2, formatted: +2)

```js
'aaaaaaaaaabbbbb';
var obj = {};
obj.a = 123;
obj.asd = 256;
console.log(obj.a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'aaaaaaaaaabbbbb';
 var obj = {};
 obj.a = 123;
-obj.o = 256;
+obj.asd = 256;
 console.log(obj.a);

```

## `terser/issue_747/unmangleable_props_should_always_be_reserved`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 70 vs reference 68 (no whitespaces: +2, formatted: +2)

```js
'aaaaaaaaaabbbbb';
var obj = {};
obj.asd = 256;
obj.a = 123;
console.log(obj.a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 'aaaaaaaaaabbbbb';
 var obj = {};
-obj.o = 256;
+obj.asd = 256;
 obj.a = 123;
 console.log(obj.a);

```

## `terser/issue_913/keep_var_for_in`

- tags: `remove unused`
- size: oxc 57 vs reference 55 (no whitespaces: +2, formatted: +1)

```js
(function(obj) {
	var foo = 5;
	for (var i in obj) return foo;
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 (function(obj) {
-	var i, foo = 5;
-	for (i in obj) return foo;
+	var foo = 5;
+	for (var i in obj) return foo;
 })();

```

## `terser/issue_979/issue979_reported`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 66 vs reference 64 (no whitespaces: +2, formatted: +2)

```js
function f1() {
	if (a == 1 || b == 2) {
		foo();
	}
}
function f2() {
	if (!(a == 1 || b == 2)) {} else {
		foo();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f1() {
-	1 != a && 2 != b || foo();
+	(a == 1 || b == 2) && foo();
 }
 function f2() {
-	1 != a && 2 != b || foo();
+	a != 1 && b != 2 || foo();
 }

```

## `terser/keep_names/keep_some_classnames`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 45 vs reference 43 (no whitespaces: +2, formatted: +2)

```js
function foo() {
	class Bar {}
	class BarElement {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function foo() {
-	class s {}
+	class Bar {}
 	class BarElement {}
 }

```

## `terser/keep_names/keep_some_fnames`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 55 vs reference 53 (no whitespaces: +2, formatted: +2)

```js
function foo() {
	function bar() {}
	function barElement() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function foo() {
-	function n() {}
+	function bar() {}
 	function barElement() {}
 }

```

## `terser/numbers/comparisons`

- size: oxc 30 vs reference 28 (no whitespaces: +2, formatted: +2)

```js
console.log(~x === 42, x % n === 42);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(42 == ~x, x % n == 42);
+console.log(~x === 42, x % n === 42);

```

## `terser/object/convert_computed_props_to_regular_ones`

- size: oxc 140 vs reference 138 (no whitespaces: +2, formatted: +2)

```js
var o = {
	['hi']: 0,
	['A' + 1]: 1,
	[/B/]: 2,
	[100 + 23]: 3,
	[1 + .5]: 4,
	[Math.PI]: 5,
	[undefined]: 6,
	[true]: 7,
	[false]: 8,
	[null]: 9,
	[Infinity]: 10,
	[NaN]: 11
};
for (var k in o) {
	console.log(k, o[k]);
}

```

```diff
--- reference
+++ oxc
@@ -9,7 +9,7 @@
 	[!0]: 7,
 	[!1]: 8,
 	[null]: 9,
-	Infinity: 10,
+	[Infinity]: 10,
 	NaN: 11
 };
 for (var k in o) console.log(k, o[k]);

```

## `terser/properties/issue_2816`

- tags: `join vars`
- size: oxc 68 vs reference 66 (no whitespaces: +2, formatted: +1)

```js
'use strict';
var o = { a: 1 };
o.b = 2;
o.a = 3;
o.c = 4;
console.log(o.a, o.b, o.c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,6 @@
 'use strict';
-var o = {
-	a: 1,
-	b: 2
-};
+var o = { a: 1 };
+o.b = 2;
 o.a = 3;
 o.c = 4;
 console.log(o.a, o.b, o.c);

```

## `terser/properties/join_object_assignments_for`

- tags: `join vars`
- size: oxc 85 vs reference 83 (no whitespaces: +2, formatted: -1)

```js
console.log((function() {
	var o = { p: 3 };
	for (o.q = 'foo'; console.log(o.q););
	return o.p;
})());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,5 @@
 console.log((function() {
-	for (var o = {
-		p: 3,
-		q: 'foo'
-	}; console.log(o.q););
+	var o = { p: 3 };
+	for (o.q = 'foo'; console.log(o.q););
 	return o.p;
 })());

```

## `terser/properties/join_object_assignments_regex`

- tags: `join vars`
- size: oxc 40 vs reference 38 (no whitespaces: +2, formatted: +2)

```js
var o = {};
o[/rx/] = 1;
console.log(o[/rx/]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var o = { '/rx/': 1 };
+var o = {};
+o[/rx/] = 1;
 console.log(o[/rx/]);

```

## `terser/properties/join_object_assignments_return_3`

- tags: `join vars`
- size: oxc 87 vs reference 85 (no whitespaces: +2, formatted: -2)

```js
console.log((function() {
	var o = { p: 3 };
	return o.q = 'foo', o.p += '', console.log(o.q), o.p;
})());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,4 @@
 console.log((function() {
-	var o = {
-		p: 3,
-		q: 'foo'
-	};
-	return o.p += '', console.log(o.q), o.p;
+	var o = { p: 3 };
+	return o.q = 'foo', o.p += '', console.log(o.q), o.p;
 })());

```

## `terser/pure_funcs/assign`

- tags: `pure functions`
- size: oxc 51 vs reference 49 (no whitespaces: +2, formatted: +4)

```js
var a;
function f(b) {
	a = foo();
	b *= 4 + foo();
	c >>= 0 | foo();
}

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,5 @@
 function f(b) {
 	a = foo();
 	b *= 4 + foo();
-	c >>= foo();
+	c >>= 0 | foo();
 }

```

## `terser/pure_getters/issue_2313_3`

- tags: `join vars`, `sequences`
- size: oxc 117 vs reference 115 (no whitespaces: +2, formatted: -3)

```js
function x() {
	console.log(1);
	return { y: function() {
		console.log(2);
		return { z: 0 };
	} };
}
x().y().z++;
if (x().y().z) {
	console.log(3);
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,6 @@
 function x() {
-	console.log(1);
-	return { y: function() {
-		console.log(2);
-		return { z: 0 };
+	return console.log(1), { y: function() {
+		return console.log(2), { z: 0 };
 	} };
 }
-x().y().z++;
-x().y().z && console.log(3);
+x().y().z++, x().y().z && console.log(3);

```

## `terser/pure_getters/issue_2313_4`

- tags: `join vars`, `sequences`, `pure getters`
- size: oxc 117 vs reference 115 (no whitespaces: +2, formatted: -3)

```js
function x() {
	console.log(1);
	return { y: function() {
		console.log(2);
		return { z: 0 };
	} };
}
x().y().z++;
if (x().y().z) {
	console.log(3);
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,6 @@
 function x() {
-	console.log(1);
-	return { y: function() {
-		console.log(2);
-		return { z: 0 };
+	return console.log(1), { y: function() {
+		return console.log(2), { z: 0 };
 	} };
 }
-x().y().z++;
-x().y().z && console.log(3);
+x().y().z++, x().y().z && console.log(3);

```

## `terser/pure_getters/issue_2313_6`

- tags: `pure getters`
- size: oxc 14 vs reference 12 (no whitespaces: +2, formatted: +2)

```js
x().y++;
x().y;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 x().y++;
-x();
+x().y;

```

## `terser/reduce_vars/issue_2423_3`

- tags: `join vars`, `remove unused`
- size: oxc 56 vs reference 54 (no whitespaces: +2, formatted: +2)

```js
function c() {
	return 1;
}
function p() {
	console.log(c());
}
p();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-(function() {
-	console.log((function() {
-		return 1;
-	})());
-})();
+function c() {
+	return 1;
+}
+function p() {
+	console.log(c());
+}
+p();

```

## `terser/reduce_vars/pure_getters_2`

- tags: `join vars`, `remove unused`
- size: oxc 15 vs reference 13 (no whitespaces: +2, formatted: +3)

```js
var a;
var a = a && a.b;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var a = a && a.b;
+var a, a = a && a.b;

```

## `terser/reduce_vars/side_effects_assign`

- tags: `join vars`, `sequences`
- size: oxc 44 vs reference 42 (no whitespaces: +2, formatted: +3)

```js
var a = typeof void (a && a.in == 1, 0);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var a = typeof void (a && a.in);
+var a = typeof void (a && a.in, 0);
 console.log(a);

```

## `terser/reduce_vars/unused_modified`

- tags: `join vars`, `remove unused`
- size: oxc 75 vs reference 73 (no whitespaces: +2, formatted: +2)

```js
console.log((function() {
	var b = 1, c = 'FAIL';
	if (0 || b--) c = 'PASS';
	b = 1;
	return c;
})());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(function() {
+console.log((function() {
 	var b = 1, c = 'FAIL';
-	if (b--) c = 'PASS';
+	b-- && (c = 'PASS');
 	b = 1;
 	return c;
-}());
+})());

```

## `terser/sequences/lift_sequences_5`

- tags: `sequences`
- size: oxc 36 vs reference 34 (no whitespaces: +2, formatted: +3)

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
-console.log(a *= (a = 4, 3));
+a *= (a = 4, 3), console.log(a);

```

## `terser/sequences/lift_sequences_6`

- tags: `sequences`
- size: oxc 42 vs reference 40 (no whitespaces: +2, formatted: +3)

```js
var a = 2;
a &&= (leak(), a = 4, 3);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a = 2;
-console.log(a &&= (leak(), a = 4, 3));
+a &&= (leak(), a = 4, 3), console.log(a);

```

## `terser/transform/booleans_global_defs`

- size: oxc 18 vs reference 16 (no whitespaces: +2, formatted: +4)

```js
console.log(A == 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(!0);
+console.log(A == 1);

```

## `terser/classes/class_duplication_2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 41 vs reference 38 (no whitespaces: +3, formatted: +4)

```js
class Foo {
	foo() {
		leak(new Foo());
	}
}
leak(Foo);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-leak(class Foo {
+class Foo {
 	foo() {
 		leak(new Foo());
 	}
-});
+}
+leak(Foo);

```

## `terser/collapse_vars/issue_1631_1`

- tags: `join vars`, `sequences`
- size: oxc 97 vs reference 94 (no whitespaces: +3, formatted: +4)

```js
var pc = 0;
function f(x) {
	pc = 200;
	return 100;
}
function x() {
	var t = f();
	pc += t;
	return pc;
}
console.log(x());

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
+var pc = 0;
 function f(x) {
 	return pc = 200, 100;
 }
 function x() {
 	var t = f();
-	return pc += t;
+	return pc += t, pc;
 }
-var pc = 0;
 console.log(x());

```

## `terser/collapse_vars/reduce_vars_assign`

- tags: `join vars`
- size: oxc 43 vs reference 40 (no whitespaces: +3, formatted: +4)

```js
!(function() {
	var a = 1;
	a = [].length, console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function() {
+(function() {
 	var a = 1;
-	console.log(a = 0);
-}();
+	a = 0, console.log(a);
+})();

```

## `terser/collapse_vars/return_1`

- tags: `join vars`, `remove unused`
- size: oxc 81 vs reference 78 (no whitespaces: +3, formatted: +7)

```js
var log = console.log;
function f(b, c) {
	var a = c;
	if (b) return b;
	log(a);
}
f(false, 1);
f(true, 2);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 var log = console.log;
 function f(b, c) {
+	var a = c;
 	if (b) return b;
-	log(c);
+	log(a);
 }
-f(false, 1);
-f(true, 2);
+f(!1, 1);
+f(!0, 2);

```

## `terser/dead_code/collapse_vars_lvalues_drop_assign`

- tags: `join vars`, `remove unused`
- size: oxc 116 vs reference 113 (no whitespaces: +3, formatted: +3)

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
@@ -1,12 +1,12 @@
 function f0(x) {
 	var i = ++x;
-	return x + i;
+	return x += i;
 }
 function f1(x) {
 	var a = x -= 3;
-	return x + a;
+	return x += a;
 }
 function f2(x) {
 	var z = x, a = ++z;
-	return z + a;
+	return z += a;
 }

```

## `terser/destructuring/unused_destructuring_declaration_complex_1`

- tags: `remove unused`, `pure getters`
- size: oxc 52 vs reference 49 (no whitespaces: +3, formatted: +4)

```js
const [, w, , x, { y, z }] = [
	1,
	2,
	3,
	4,
	{ z: 5 }
];
console.log(x, z);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-const [, , , x, { z }] = [
+const [, w, , x, { y, z }] = [
 	1,
 	2,
 	3,

```

## `terser/drop_unused/drop_assign`

- tags: `remove unused`
- size: oxc 106 vs reference 103 (no whitespaces: +3, formatted: +9)

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
@@ -1,6 +1,8 @@
 function f1() {}
 function f2() {}
-function f3(a) {}
+function f3(a) {
+	a = 1;
+}
 function f4() {
 	return 1;
 }

```

## `terser/drop_unused/issue_2136_1`

- tags: `remove unused`
- size: oxc 37 vs reference 34 (no whitespaces: +3, formatted: +4)

```js
!(function(a, ...b) {
	console.log(b);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!function(...b) {
+(function(a, ...b) {
 	console.log(b);
-}();
+})();

```

## `terser/drop_unused/issue_t161_top_retain_1`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 62 (no whitespaces: +3, formatted: +4)

```js
function f() {
	return 2;
}
function g() {
	return 3;
}
console.log(f(), g());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 function f() {
 	return 2;
 }
-console.log(f(), function() {
+function g() {
 	return 3;
-}());
+}
+console.log(f(), g());

```

## `terser/functions/unsafe_apply_expansion_1`

- size: oxc 37 vs reference 34 (no whitespaces: +3, formatted: +9)

```js
console.log.apply(console, [
	1,
	...[2, 3],
	4
]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log.call(console, 1, 2, 3, 4);
+console.log.apply(console, [
+	1,
+	2,
+	3,
+	4
+]);

```

## `terser/functions/unsafe_apply_expansion_2`

- size: oxc 60 vs reference 57 (no whitespaces: +3, formatted: +8)

```js
var values = [2, 3];
console.log.apply(console, [
	1,
	...values,
	4
]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
 var values = [2, 3];
-console.log.call(console, 1, ...values, 4);
+console.log.apply(console, [
+	1,
+	...values,
+	4
+]);

```

## `terser/global_defs/conditional_chains`

- size: oxc 20 vs reference 17 (no whitespaces: +3, formatted: +3)

```js
console.log(a?.b.c);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('d');
+console.log(a?.b.c);

```

## `terser/harmony/regression_cannot_use_of`

- size: oxc 79 vs reference 76 (no whitespaces: +3, formatted: +4)

```js
function of() {}
var of = 'is a valid variable name';
of = { of: 'is ok' };
x.of;
of: foo();

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 var of = 'is a valid variable name';
 of = { of: 'is ok' };
 x.of;
-foo();
+of: foo();

```

## `terser/issue_1466/different_variable_in_multiple_forIn`

- tags: `join vars`, `sequences`
- size: oxc 115 vs reference 112 (no whitespaces: +3, formatted: +1)

```js
var test = [
	'a',
	'b',
	'c'
];
for (let tmp in test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (let t in test) {
		console.log(t);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,13 +3,12 @@
 	'b',
 	'c'
 ];
-for (let e in test) {
-	console.log(e);
-	let t;
-	t = [
+for (let tmp in test) {
+	console.log(tmp);
+	let dd = [
 		'e',
 		'f',
 		'g'
 	];
-	for (let e in test) console.log(e);
+	for (let t in test) console.log(t);
 }

```

## `terser/issue_1466/same_variable_in_multiple_forIn_sequences_const`

- tags: `join vars`, `sequences`
- size: oxc 119 vs reference 116 (no whitespaces: +3, formatted: +2)

```js
var test = [
	'a',
	'b',
	'c'
];
for (const tmp in test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (const tmp in test) {
		console.log(tmp);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,12 +3,12 @@
 	'b',
 	'c'
 ];
-for (const o in test) {
-	let t;
-	console.log(o), t = [
+for (let tmp in test) {
+	console.log(tmp);
+	let dd = [
 		'e',
 		'f',
 		'g'
 	];
-	for (const o in test) console.log(o);
+	for (let tmp in test) console.log(tmp);
 }

```

## `terser/issue_751/negate_booleans_1`

- size: oxc 29 vs reference 26 (no whitespaces: +3, formatted: +3)

```js
var a = !a || !b || !c || !d || !e || !f;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var a = !(a && b && c && d && e && f);
+var a = !a || !b || !c || !d || !e || !f;

```

## `terser/loops/issue_2740_3`

- size: oxc 72 vs reference 69 (no whitespaces: +3, formatted: +4)

```js
L1: for (var x = 0; x < 3; x++) {
	L2: for (var y = 0; y < 2; y++) {
		break L1;
	}
}
console.log(x, y);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-L1: for (var x = 0; x < 3; x++) for (var y = 0; y < 2; y++) break L1;
+L1: for (var x = 0; x < 3; x++) L2: for (var y = 0; y < 2; y++) break L1;
 console.log(x, y);

```

## `terser/object/concise_methods_and_mangle_props`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 36 vs reference 33 (no whitespaces: +3, formatted: +3)

```js
function x() {
	obj = { _foo() {
		return 1;
	} };
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function x() {
-	obj = { o() {
+	obj = { _foo() {
 		return 1;
 	} };
 }

```

## `terser/object/prop_arrow_to_concise_method`

- size: oxc 40 vs reference 37 (no whitespaces: +3, formatted: +5)

```js
({ run: () => {
	console.log('PASS');
} }).run();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-({ run() {
+({ run: () => {
 	console.log('PASS');
 } }).run();

```

## `terser/properties/join_object_assignments_forin`

- tags: `join vars`
- size: oxc 76 vs reference 73 (no whitespaces: +3, formatted: +3)

```js
console.log((function() {
	var o = {};
	for (var a in o.a = 'PASS', o) return o[a];
})());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 console.log((function() {
-	var o = { a: 'PASS' };
-	for (var a in o) return o[a];
+	var o = {};
+	for (var a in o.a = 'PASS', o) return o[a];
 })());

```

## `terser/pure_getters/issue_2110_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 95 vs reference 92 (no whitespaces: +3, formatted: +5)

```js
function f() {
	function f() {}
	function g() {
		return this;
	}
	f.g = g;
	return f.g();
}
console.log(typeof f());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 function f() {
 	function f() {}
-	return f.g = function() {
+	function g() {
 		return this;
-	}, f.g();
+	}
+	return f.g = g, f.g();
 }
 console.log(typeof f());

```

## `terser/pure_getters/issue_2110_2`

- tags: `join vars`, `remove unused`
- size: oxc 95 vs reference 92 (no whitespaces: +3, formatted: +5)

```js
function f() {
	function f() {}
	function g() {
		return this;
	}
	f.g = g;
	return f.g();
}
console.log(typeof f());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f() {
 	function f() {}
-	f.g = function() {
+	function g() {
 		return this;
-	};
+	}
+	f.g = g;
 	return f.g();
 }
 console.log(typeof f());

```

## `terser/pure_getters/set_mutable_2`

- tags: `join vars`, `sequences`
- size: oxc 74 vs reference 71 (no whitespaces: +3, formatted: +4)

```js
!(function a() {
	a.foo += '';
	if (a.foo) console.log('PASS');
	else console.log('FAIL');
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-!(function a() {
-	(a.foo += '') ? console.log('PASS') : console.log('FAIL');
+(function a() {
+	a.foo += '', a.foo ? console.log('PASS') : console.log('FAIL');
 })();

```

## `terser/reduce_vars/duplicate_lambda_defun_name_1`

- tags: `join vars`
- size: oxc 60 vs reference 57 (no whitespaces: +3, formatted: +4)

```js
console.log((function f(a) {
	function f() {}
	return f.length;
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log(function f() {
-	return (function() {}).length;
-}());
+console.log((function(a) {
+	function f() {}
+	return f.length;
+})());

```

## `terser/reduce_vars/iife_func_side_effects`

- tags: `join vars`, `remove unused`
- size: oxc 187 vs reference 184 (no whitespaces: +3, formatted: +5)

```js
function x() {
	console.log('x');
}
function y() {
	console.log('y');
}
function z() {
	console.log('z');
}
(function(a, b, c) {
	function y() {
		console.log('FAIL');
	}
	return y + b();
})(x(), function() {
	return y();
}, z());

```

```diff
--- reference
+++ oxc
@@ -8,9 +8,10 @@
 	console.log('z');
 }
 (function(a, b, c) {
-	return function() {
+	function y() {
 		console.log('FAIL');
-	} + b();
+	}
+	return y + b();
 })(x(), function() {
 	return y();
 }, z());

```

## `terser/reduce_vars/inner_var_for_2`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 61 (no whitespaces: +3, formatted: +3)

```js
!(function() {
	var a = 1;
	for (var b = 1; --b;) var a = 2;
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!(function() {
+(function() {
 	var a = 1;
-	for (var b = 1; --b;) a = 2;
+	for (var b = 1; --b;) var a = 2;
 	console.log(a);
 })();

```

## `terser/reduce_vars/issue_2450_2`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 56 (no whitespaces: +3, formatted: +5)

```js
function g() {
	function f() {}
	return f;
}
console.log(g() === g());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function g() {
-	return function() {};
+	function f() {}
+	return f;
 }
 console.log(g() === g());

```

## `terser/reduce_vars/issue_3113_1`

- tags: `join vars`
- size: oxc 104 vs reference 101 (no whitespaces: +3, formatted: +6)

```js
var c = 0;
(function() {
	function f() {
		while (g());
	}
	var a = f();
	function g() {
		a && a[c++];
	}
	g(a = 1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 var c = 0;
 (function() {
-	var a = function() {
-		while (g());
-	}();
+	function f() {
+		for (; g(););
+	}
+	var a = f();
 	function g() {
 		a && a[c++];
 	}

```

## `terser/reduce_vars/issue_3113_2`

- tags: `join vars`
- size: oxc 105 vs reference 102 (no whitespaces: +3, formatted: +6)

```js
var c = 0;
(function() {
	function f() {
		while (g());
	}
	var a = f();
	function g() {
		a && a[c++];
	}
	a = 1;
	g();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 var c = 0;
 (function() {
-	var a = function() {
-		while (g());
-	}();
+	function f() {
+		for (; g(););
+	}
+	var a = f();
 	function g() {
 		a && a[c++];
 	}

```

## `terser/reduce_vars/issue_3113_5`

- tags: `join vars`
- size: oxc 68 vs reference 65 (no whitespaces: +3, formatted: +5)

```js
function f() {
	console.log(a);
}
function g() {
	f();
}
while (g());
var a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f() {
 	console.log(a);
 }
-while (function() {
+function g() {
 	f();
-}());
+}
+for (; g(););
 var a = 1;
 f();

```

## `terser/reduce_vars/issue_3140_5`

- tags: `join vars`
- size: oxc 102 vs reference 99 (no whitespaces: +3, formatted: +3)

```js
var n = 1, c = 0;
(function(a) {
	var b = (function() {
		this;
		n-- && h();
	})();
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
@@ -1,8 +1,8 @@
 var n = 1, c = 0;
-(function() {
-	var b = function() {
+(function(a) {
+	var b = (function() {
 		n-- && h();
-	}();
+	})();
 	function h() {
 		b && c++;
 	}

```

## `terser/reduce_vars/perf_3`

- tags: `join vars`, `remove unused`
- size: oxc 170 vs reference 167 (no whitespaces: +3, formatted: +3)

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
@@ -1,8 +1,7 @@
-var indirect_foo = function(x, y, z) {
-	return (function(x, y, z) {
-		return x < y ? x * y + z : x * z - y;
-	})(x, y, z);
-};
-var sum = 0;
+var foo = function(x, y, z) {
+	return x < y ? x * y + z : x * z - y;
+}, indirect_foo = function(x, y, z) {
+	return foo(x, y, z);
+}, sum = 0;
 for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `terser/reduce_vars/redefine_farg_1`

- tags: `join vars`, `remove unused`
- size: oxc 128 vs reference 125 (no whitespaces: +3, formatted: +1)

```js
function f(a) {
	var a;
	return typeof a;
}
function g(a) {
	var a = 42;
	return typeof a;
}
function h(a, b) {
	var a = b;
	return typeof a;
}
console.log(f([]), g([]), h([]));

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
 function f(a) {
+	var a;
 	return typeof a;
 }
-function g() {
+function g(a) {
 	return 'number';
 }
 function h(a, b) {
-	a = b;
-	return typeof a;
+	return typeof b;
 }
 console.log(f([]), g([]), h([]));

```

## `terser/assignment/op_equals_right_global_var`

- size: oxc 173 vs reference 169 (no whitespaces: +4, formatted: +12)

```js
x = (x -= 2) ^ x;
x = 3 + x;
x = 3 - x;
x = 3 / x;
x = 3 * x;
x = 3 >> x;
x = 3 << x;
x = 3 >>> x;
x = 3 | x;
x = 3 ^ x;
x = 3 % x;
x = 3 & x;
x = g() + x;
x = g() - x;
x = g() / x;
x = g() * x;
x = g() >> x;
x = g() << x;
x = g() >>> x;
x = g() | x;
x = g() ^ x;
x = g() % x;
x = g() & x;

```

```diff
--- reference
+++ oxc
@@ -2,14 +2,14 @@
 x = 3 + x;
 x = 3 - x;
 x = 3 / x;
-x *= 3;
+x = 3 * x;
 x = 3 >> x;
 x = 3 << x;
 x = 3 >>> x;
-x |= 3;
-x ^= 3;
+x = 3 | x;
+x = 3 ^ x;
 x = 3 % x;
-x &= 3;
+x = 3 & x;
 x = g() + x;
 x = g() - x;
 x = g() / x;

```

## `terser/block_scope/do_not_hoist_let`

- size: oxc 58 vs reference 54 (no whitespaces: +4, formatted: +6)

```js
function x() {
	if (FOO) {
		let let1;
		let let2;
		var var1;
		var var2;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
 function x() {
 	if (FOO) {
-		var var1, var2;
 		let let1;
 		let let2;
+		var var1;
+		var var2;
 	}
 }

```

## `terser/collapse_vars/conditional_1`

- tags: `join vars`, `remove unused`
- size: oxc 102 vs reference 98 (no whitespaces: +4, formatted: +7)

```js
function f(a, b) {
	var c = '';
	var d = b ? '>' : '<';
	if (a) c += '=';
	return c += d;
}
console.log(f(0, 0), f(0, 1), f(1, 0), f(1, 1));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function f(a, b) {
-	var c = '';
-	if (a) c += '=';
-	return c += b ? '>' : '<';
+	var c = '', d = b ? '>' : '<';
+	a && (c += '=');
+	return c += d;
 }
 console.log(f(0, 0), f(0, 1), f(1, 0), f(1, 1));

```

## `terser/collapse_vars/issue_1537_destructuring_1`

- tags: `join vars`
- size: oxc 20 vs reference 16 (no whitespaces: +4, formatted: +7)

```js
var x = 1, y = 2;
[x] = [y];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var x = 1;
-[x] = [2];
+var x = 1, y = 2;
+[x] = [y];

```

## `terser/collapse_vars/issue_2436_14`

- tags: `join vars`, `remove unused`
- size: oxc 84 vs reference 80 (no whitespaces: +4, formatted: +8)

```js
var a = 'PASS';
var b = {};
(function() {
	var c = a;
	c && (function(c, d) {
		console.log(c, d);
	})(b, c);
})();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
-var a = 'PASS';
-var b = {};
+var a = 'PASS', b = {};
 (function() {
-	a && (function(c, d) {
+	var c = a;
+	c && (function(c, d) {
 		console.log(c, d);
-	})(b, a);
+	})(b, c);
 })();

```

## `terser/destructuring/export_function_containing_destructuring_decl`

- tags: `type:module`, `remove unused`, `pure getters`
- size: oxc 54 vs reference 50 (no whitespaces: +4, formatted: +6)

```js
export function f() {
	let [{ x, y, z }] = [{
		x: 1,
		y: 2
	}];
	return x;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 export function f() {
-	let [{ x }] = [{
+	let [{ x, y, z }] = [{
 		x: 1,
 		y: 2
 	}];

```

## `terser/destructuring/issue_t111_2a`

- tags: `remove unused`
- size: oxc 57 vs reference 53 (no whitespaces: +4, formatted: +10)

```js
var p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), d = p(4);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-var p = (x) => (console.log(x), x), {} = (p(1), p(2));
-p(3), p(4);
+var p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), d = p(4);

```

## `terser/destructuring/issue_t111_2b`

- tags: `remove unused`
- size: oxc 57 vs reference 53 (no whitespaces: +4, formatted: +10)

```js
let p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), d = p(4);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-let p = (x) => (console.log(x), x), {} = (p(1), p(2));
-p(3), p(4);
+let p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), d = p(4);

```

## `terser/destructuring/issue_t111_2c`

- tags: `remove unused`
- size: oxc 59 vs reference 55 (no whitespaces: +4, formatted: +10)

```js
const p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), d = p(4);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-const p = (x) => (console.log(x), x), {} = (p(1), p(2));
-p(3), p(4);
+const p = (x) => (console.log(x), x), a = p(1), {} = p(2), c = p(3), d = p(4);

```

## `terser/destructuring/unused_destructuring_arrow_param`

- tags: `remove unused`, `pure getters`
- size: oxc 84 vs reference 80 (no whitespaces: +4, formatted: +6)

```js
let bar = ({ w = console.log('side effect'), x, y: z }) => {
	console.log(x);
};
bar({
	x: 4,
	y: 5,
	z: 6
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-let bar = ({ w = console.log('side effect'), x }) => {
+let bar = ({ w = console.log('side effect'), x, y: z }) => {
 	console.log(x);
 };
 bar({

```

## `terser/destructuring/unused_destructuring_class_method_param`

- tags: `remove unused`, `pure getters`
- size: oxc 90 vs reference 86 (no whitespaces: +4, formatted: +6)

```js
new class {
	baz({ w = console.log('side effect'), x, y: z }) {
		console.log(x);
	}
}().baz({
	x: 7,
	y: 8,
	z: 9
});

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 new class {
-	baz({ w = console.log('side effect'), x }) {
+	baz({ w = console.log('side effect'), x, y: z }) {
 		console.log(x);
 	}
 }().baz({

```

## `terser/destructuring/unused_destructuring_function_param`

- tags: `remove unused`, `pure getters`
- size: oxc 85 vs reference 81 (no whitespaces: +4, formatted: +6)

```js
function foo({ w = console.log('side effect'), x, y: z }) {
	console.log(x);
}
foo({
	x: 1,
	y: 2,
	z: 3
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function foo({ w = console.log('side effect'), x }) {
+function foo({ w = console.log('side effect'), x, y: z }) {
 	console.log(x);
 }
 foo({

```

## `terser/destructuring/unused_destructuring_multipass`

- tags: `sequences`, `remove unused`, `pure getters`, `2 iterations`
- size: oxc 42 vs reference 38 (no whitespaces: +4, formatted: +6)

```js
let { w, x: y, z } = {
	x: 1,
	y: 2,
	z: 3
};
console.log(y);
if (0) {
	console.log(z);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-let { x: y } = {
+let { w, x: y, z } = {
 	x: 1,
 	y: 2,
 	z: 3

```

## `terser/destructuring/unused_destructuring_object_method_param`

- tags: `remove unused`, `pure getters`
- size: oxc 81 vs reference 77 (no whitespaces: +4, formatted: +6)

```js
({ baz({ w = console.log('side effect'), x, y: z }) {
	console.log(x);
} }).baz({
	x: 7,
	y: 8,
	z: 9
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-({ baz({ w = console.log('side effect'), x }) {
+({ baz({ w = console.log('side effect'), x, y: z }) {
 	console.log(x);
 } }).baz({
 	x: 7,

```

## `terser/drop_unused/assign_binding`

- tags: `join vars`, `remove unused`
- size: oxc 27 vs reference 23 (no whitespaces: +4, formatted: +7)

```js
function f() {
	var a;
	a = f.g, a();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f() {
-	(0, f.g)();
+	var a = f.g;
+	a();
 }

```

## `terser/drop_unused/chained_3`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 56 (no whitespaces: +4, formatted: +7)

```js
console.log((function(a, b) {
	var c = a, c = b;
	b++;
	return c;
})(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log((function(a, b) {
-	var c = b;
+	var c = a, c = b;
 	b++;
 	return c;
-})(0, 2));
+})(1, 2));

```

## `terser/drop_unused/global_var`

- tags: `remove unused`
- size: oxc 49 vs reference 45 (no whitespaces: +4, formatted: +8)

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
@@ -1,7 +1,7 @@
 var a;
 function foo(b) {
 	c;
-	c;
+	c + b + a;
 	b && b.ar();
 	return b;
 }

```

## `terser/drop_unused/issue_2226_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 49 vs reference 45 (no whitespaces: +4, formatted: +6)

```js
console.log((function(a, b) {
	a += b;
	return a;
})(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 console.log((function(a, b) {
-	return a += 2;
-})(1));
+	return a += b, a;
+})(1, 2));

```

## `terser/drop_unused/issue_2226_3`

- tags: `join vars`, `remove unused`
- size: oxc 49 vs reference 45 (no whitespaces: +4, formatted: +7)

```js
console.log((function(a, b) {
	a += b;
	return a;
})(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 console.log((function(a, b) {
-	return a += 2;
-})(1));
+	a += b;
+	return a;
+})(1, 2));

```

## `terser/drop_unused/unused_funarg_2`

- tags: `remove unused`
- size: oxc 33 vs reference 29 (no whitespaces: +4, formatted: +6)

```js
function f(a, b, c, d, e) {
	return a + c;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-function f(a, b, c) {
+function f(a, b, c, d, e) {
 	return a + c;
 }

```

## `terser/evaluate/issue_2916_1`

- tags: `join vars`
- size: oxc 94 vs reference 90 (no whitespaces: +4, formatted: +6)

```js
var c = 'PASS';
(function(a, b) {
	(function(d) {
		d[0] = 1;
	})(b);
	a == b && (c = 'FAIL');
})('', []);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 var c = 'PASS';
-(function(b) {
+(function(a, b) {
 	(function(d) {
 		d[0] = 1;
 	})(b);
-	'' == b && (c = 'FAIL');
-})([]);
+	a == b && (c = 'FAIL');
+})('', []);
 console.log(c);

```

## `terser/harmony/array_literal_with_spread_3b`

- size: oxc 386 vs reference 382 (no whitespaces: +4, formatted: +5)

```js
var nothing = [];
console.log([10, 20][0]);
console.log([10, 20][1]);
console.log([10, 20][2]);
console.log([
	...nothing,
	10,
	20
][0]);
console.log([
	...nothing,
	10,
	20
][1]);
console.log([
	...nothing,
	10,
	20
][2]);
console.log([
	10,
	...nothing,
	20
][0]);
console.log([
	10,
	...nothing,
	20
][1]);
console.log([
	10,
	...nothing,
	20
][2]);
console.log([
	10,
	20,
	...nothing
][0]);
console.log([
	10,
	20,
	...nothing
][1]);
console.log([
	10,
	20,
	...nothing
][2]);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 var nothing = [];
 console.log(10);
 console.log(20);
-console.log(void 0);
+console.log([10, 20][2]);
 console.log([
 	...nothing,
 	10,

```

## `terser/harmony/array_literal_with_spread_4a`

- size: oxc 385 vs reference 381 (no whitespaces: +4, formatted: +4)

```js
function t(x) {
	console.log('(' + x + ')');
	return 10 * x;
}
console.log([t(1), t(2)][0]);
console.log([t(1), t(2)][1]);
console.log([t(1), t(2)][2]);
console.log([
	...[],
	t(1),
	t(2)
][0]);
console.log([
	...[],
	t(1),
	t(2)
][1]);
console.log([
	...[],
	t(1),
	t(2)
][2]);
console.log([
	t(1),
	...[],
	t(2)
][0]);
console.log([
	t(1),
	...[],
	t(2)
][1]);
console.log([
	t(1),
	...[],
	t(2)
][2]);
console.log([
	t(1),
	t(2),
	...[]
][0]);
console.log([
	t(1),
	t(2),
	...[]
][1]);
console.log([
	t(1),
	t(2),
	...[]
][2]);

```

```diff
--- reference
+++ oxc
@@ -3,14 +3,14 @@
 	return 10 * x;
 }
 console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
-console.log((t(1), void t(2)));
+console.log([t(1), t(2)][1]);
+console.log([t(1), t(2)][2]);
 console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
-console.log((t(1), void t(2)));
+console.log([t(1), t(2)][1]);
+console.log([t(1), t(2)][2]);
 console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
-console.log((t(1), void t(2)));
+console.log([t(1), t(2)][1]);
+console.log([t(1), t(2)][2]);
 console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
-console.log((t(1), void t(2)));
+console.log([t(1), t(2)][1]);
+console.log([t(1), t(2)][2]);

```

## `terser/harmony/default_assign`

- tags: `remove unused`
- size: oxc 127 vs reference 123 (no whitespaces: +4, formatted: +7)

```js
function f(a, b = 3) {
	console.log(a);
}
g = ([[] = 123]) => {};
h = ([[x, y, z] = [
	4,
	5,
	6
]] = []) => {};
function i([[x, y, z] = [
	4,
	5,
	6
]] = []) {
	console.log(b);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function f(a) {
+function f(a, b = 3) {
 	console.log(a);
 }
 g = ([[] = 123]) => {};

```

## `terser/hoist_vars/issue_2295`

- tags: `join vars`
- size: oxc 48 vs reference 44 (no whitespaces: +4, formatted: +4)

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
@@ -1,5 +1,5 @@
 function foo(o) {
 	var a = o.a;
 	if (a) return a;
-	a = 1;
+	var a = 1;
 }

```

## `terser/hoist_vars/regression_toplevel_args`

- size: oxc 16 vs reference 12 (no whitespaces: +4, formatted: +4)

```js
var Foo;
var Bar;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-var Foo, Bar;
+var Foo;
+var Bar;

```

## `terser/if_return/if_return_4`

- tags: `sequences`, `remove unused`
- size: oxc 54 vs reference 50 (no whitespaces: +4, formatted: +2)

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
@@ -1,3 +1,4 @@
 function f(x, y) {
-	return a(), x ? 3 : (b(), y ? c() : void 0);
+	if (a(), x) return 3;
+	if (b(), y) return c();
 }

```

## `terser/if_return/issue_512`

- tags: `sequences`
- size: oxc 37 vs reference 33 (no whitespaces: +4, formatted: +4)

```js
function a() {
	if (b()) {
		c();
		return;
	}
	throw e;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function a() {
-	if (!b()) throw e;
-	c();
+	if (b()) c();
+	else throw e;
 }

```

## `terser/issue_1105/assorted_Infinity_NaN_undefined_in_with_scope`

- tags: `join vars`, `remove unused`
- size: oxc 221 vs reference 217 (no whitespaces: +4, formatted: -10)

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
@@ -6,14 +6,14 @@
 if (o) {
 	f(void 0, void 0);
 	f(NaN, NaN);
-	f(1 / 0, 1 / 0);
-	f(-1 / 0, -1 / 0);
+	f(Infinity, 1 / 0);
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

## `terser/join_vars/issue_1079_with_vars`

- tags: `join vars`
- size: oxc 70 vs reference 66 (no whitespaces: +4, formatted: +4)

```js
var netmaskBinary = '';
for (var i = 0; i < netmaskBits; ++i) {
	netmaskBinary += '1';
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-for (var netmaskBinary = '', i = 0; i < netmaskBits; ++i) netmaskBinary += '1';
+var netmaskBinary = '';
+for (var i = 0; i < netmaskBits; ++i) netmaskBinary += '1';

```

## `terser/properties/new_this`

- size: oxc 35 vs reference 31 (no whitespaces: +4, formatted: +7)

```js
new { f: function(a) {
	this.a = a;
} }.f(42);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-new (function(a) {
+new { f: function(a) {
 	this.a = a;
-})(42);
+} }.f(42);

```

## `terser/properties/sub_properties`

- size: oxc 89 vs reference 85 (no whitespaces: +4, formatted: +4)

```js
a[0] = 0;
a['0'] = 1;
a[3.14] = 2;
a['3' + '.14'] = 3;
a['i' + 'f'] = 4;
a['foo' + ' bar'] = 5;
a[0 / 0] = 6;
a[null] = 7;
a[undefined] = 8;

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 a[0] = 0;
 a[0] = 1;
 a[3.14] = 2;
-a[3.14] = 3;
+a['3.14'] = 3;
 a.if = 4;
 a['foo bar'] = 5;
-a.NaN = 6;
-a.null = 7;
+a[NaN] = 6;
+a[null] = 7;
 a[void 0] = 8;

```

## `terser/pure_getters/collapse_vars_2_true`

- tags: `join vars`, `pure getters`
- size: oxc 61 vs reference 57 (no whitespaces: +4, formatted: +6)

```js
function f() {
	function g() {}
	g.a = function() {};
	g.b = g.a;
	return g;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f() {
 	function g() {}
-	g.b = g.a = function() {};
+	g.a = function() {};
+	g.b = g.a;
 	return g;
 }

```

## `terser/reduce_vars/var_assign_6`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 46 (no whitespaces: +4, formatted: +4)

```js
!(function() {
	var a = (function() {})(a = 1);
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!function() {
-	var a = void (a = 1);
+(function() {
+	var a = (a = 1, void 0);
 	console.log(a);
-}();
+})();

```

## `terser/sequences/cascade_assignment_in_return`

- tags: `join vars`, `remove unused`
- size: oxc 34 vs reference 30 (no whitespaces: +4, formatted: +7)

```js
function f(a, b) {
	return a = x(), b(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f(a, b) {
-	return b(x());
+	return a = x(), b(a);
 }

```

## `terser/arguments/replace_index_keep_fargs`

- size: oxc 377 vs reference 372 (no whitespaces: +5, formatted: +4)

```js
var arguments = [];
console.log(arguments[0]);
(function() {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(a, b) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(arguments) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function() {
	var arguments;
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 var arguments = [];
 console.log(arguments[0]);
-(function(argument_0, argument_1) {
-	console.log(argument_1, argument_1, arguments.foo);
+(function() {
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(a, b) {
-	console.log(b, b, arguments.foo);
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(arguments) {
 	console.log(arguments[1], arguments[1], arguments.foo);

```

## `terser/arguments/replace_index_keep_fargs_strict`

- tags: `join vars`
- size: oxc 170 vs reference 165 (no whitespaces: +5, formatted: +4)

```js
'use strict';
(function() {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(a, b) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,7 @@
 'use strict';
-(function(argument_0, argument_1) {
-	console.log(argument_1, argument_1, arguments.foo);
+(function() {
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(a, b) {
-	console.log(b, b, arguments.foo);
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);

```

## `terser/arrow/async_function_expression`

- size: oxc 85 vs reference 80 (no whitespaces: +5, formatted: +6)

```js
var named = async function foo() {
	await bar(1 + 0) + (2 + 0);
};
var anon = async function() {
	await (1 + 0) + bar(2 + 0);
};

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var named = async function foo() {
-	await bar(1);
+var named = async function() {
+	await bar(1) + 2;
 };
-var anon = async () => {
-	await 1, bar(2);
+var anon = async function() {
+	await 1 + bar(2);
 };

```

## `terser/class_properties/class_expression_constant`

- tags: `join vars`, `remove unused`
- size: oxc 106 vs reference 101 (no whitespaces: +5, formatted: +5)

```js
const obj = {};
obj.Class1 = class {
	static foo = 'constant';
};
obj.Class2 = class extends Obj.Class1 {};
new obj.Class2();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-const obj = { Class1: class {
+const obj = {};
+obj.Class1 = class {
 	static foo = 'constant';
-} };
+};
 obj.Class2 = class extends Obj.Class1 {};
 new obj.Class2();

```

## `terser/collapse_vars/iife_2`

- tags: `join vars`
- size: oxc 49 vs reference 44 (no whitespaces: +5, formatted: +7)

```js
var foo = bar();
!(function(x) {
	console.log(x);
})(foo);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-var foo;
-!function(x) {
+var foo = bar();
+(function(x) {
 	console.log(x);
-}(bar());
+})(foo);

```

## `terser/comparing/self_comparison_2`

- tags: `join vars`
- size: oxc 47 vs reference 42 (no whitespaces: +5, formatted: +9)

```js
function f() {}
var o = {};
console.log(f != f, o === o);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f() {}
 var o = {};
-console.log(!1, !0);
+console.log(f != f, o === o);

```

## `terser/dead_code/dead_code_block_decls_die`

- tags: `sequences`
- size: oxc 38 vs reference 33 (no whitespaces: +5, formatted: +7)

```js
if (0) {
	let foo = 6;
	const bar = 12;
	class Baz {}
	var qux;
}
console.log(foo, bar, Baz);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var qux;
+if (0) var qux;
 console.log(foo, bar, Baz);

```

## `terser/dead_code/issue_2383_1`

- tags: `sequences`
- size: oxc 13 vs reference 8 (no whitespaces: +5, formatted: +7)

```js
if (0) {
	var { x, y } = foo();
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var x, y;
+if (0) var x, y;

```

## `terser/dead_code/issue_2383_2`

- tags: `sequences`
- size: oxc 38 vs reference 33 (no whitespaces: +5, formatted: +7)

```js
if (0) {
	var { x = 0, y: [w, , { z, p: q = 7 }] = [
		1,
		2,
		{ z: 3 }
	] } = {};
}
console.log(x, q, w, z);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var x, w, z, q;
+if (0) var x, w, z, q;
 console.log(x, q, w, z);

```

## `terser/dead_code/issue_2383_3`

- tags: `sequences`
- size: oxc 54 vs reference 49 (no whitespaces: +5, formatted: +7)

```js
var b = 7, y = 8;
if (0) {
	var a = 1, [x, y, z] = [
		2,
		3,
		4
	], b = 5;
}
console.log(a, x, y, z, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var b = 7, y = 8;
-var a, x, y, z, b;
+if (0) var a, x, y, z, b;
 console.log(a, x, y, z, b);

```

## `terser/destructuring/issue_t111_1`

- tags: `remove unused`
- size: oxc 48 vs reference 43 (no whitespaces: +5, formatted: +7)

```js
var p = (x) => (console.log(x), x), unused = p(1), {} = p(2);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-var p = (x) => (console.log(x), x), {} = (p(1), p(2));
+var p = (x) => (console.log(x), x), unused = p(1), {} = p(2);

```

## `terser/drop_unused/issue_2846`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 63 (no whitespaces: +5, formatted: +6)

```js
function f(a, b) {
	var a = 0;
	b && b(a);
	return a++;
}
var c = f();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-var c = (function(a, b) {
-	a = 0;
+function f(a, b) {
+	var a = 0;
 	b && b(a);
 	return a++;
-})();
+}
+var c = f();
 console.log(c);

```

## `terser/evaluate/unsafe_object`

- tags: `join vars`
- size: oxc 49 vs reference 44 (no whitespaces: +5, formatted: +7)

```js
var o = { a: 1 };
console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var o = { a: 1 };
-console.log(o + 1, 2, o.b + 1, 1 .b + 1);
+console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

## `terser/evaluate/unsafe_object_repeated`

- tags: `join vars`
- size: oxc 57 vs reference 52 (no whitespaces: +5, formatted: +7)

```js
var o = {
	a: { b: 1 },
	a: 1
};
console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 	a: { b: 1 },
 	a: 1
 };
-console.log(o + 1, 2, o.b + 1, 1 .b + 1);
+console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

## `terser/expression/pow_with_number_constants`

- size: oxc 59 vs reference 54 (no whitespaces: +5, formatted: -1)

```js
var a = 5 ** NaN;
var b = 42 ** +0;
var c = 42 ** -0;
var d = NaN ** 1;
var e = 2 ** Infinity;
var f = 2 ** -Infinity;

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var a = 0 / 0;
+var a = NaN;
 var b = 1;
 var c = 1;
-var d = 0 / 0;
-var e = 1 / 0;
+var d = NaN;
+var e = Infinity;
 var f = 0;

```

## `terser/functions/unsafe_call_3`

- size: oxc 78 vs reference 73 (no whitespaces: +5, formatted: +6)

```js
console.log(function() {
	return arguments[0] + eval('arguments')[1];
}.call(0, 1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log((function() {
+console.log(function() {
 	return arguments[0] + eval('arguments')[1];
-})(1, 2));
+}.call(0, 1, 2));

```

## `terser/functions/unsafe_call_expansion_1`

- size: oxc 58 vs reference 53 (no whitespaces: +5, formatted: +5)

```js
(function(...a) {
	console.log(...a);
}).call(console, 1, ...[2, 3], 4);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console, (function(...a) {
+(function(...a) {
 	console.log(...a);
-})(1, 2, 3, 4);
+}).call(console, 1, 2, 3, 4);

```

## `terser/functions/unsafe_call_expansion_2`

- size: oxc 81 vs reference 76 (no whitespaces: +5, formatted: +5)

```js
var values = [2, 3];
(function(...a) {
	console.log(...a);
}).call(console, 1, ...values, 4);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var values = [2, 3];
-console, (function(...a) {
+(function(...a) {
 	console.log(...a);
-})(1, ...values, 4);
+}).call(console, 1, ...values, 4);

```

## `terser/harmony/expansion`

- tags: `remove unused`
- size: oxc 34 vs reference 29 (no whitespaces: +5, formatted: +6)

```js
function f(a, ...b) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-function f(a) {
+function f(a, ...b) {
 	console.log(a);
 }

```

## `terser/issue_1105/Infinity_not_in_with_scope`

- tags: `remove unused`
- size: oxc 73 vs reference 68 (no whitespaces: +5, formatted: +3)

```js
var o = { Infinity: 'oInfinity' };
var vInfinity = 'Infinity';
vInfinity = Infinity;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var o = { Infinity: 'oInfinity' };
 var vInfinity = 'Infinity';
-vInfinity = 1 / 0;
+vInfinity = Infinity;

```

## `terser/issue_203/compress_new_function`

- size: oxc 32 vs reference 27 (no whitespaces: +5, formatted: +5)

```js
new Function('aa, bb', 'return aa;');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-Function('n,r', 'return n');
+Function('aa, bb', 'return aa;');

```

## `terser/issue_979/issue979_test_negated_is_best`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 178 vs reference 173 (no whitespaces: +5, formatted: +5)

```js
function f3() {
	if (a == 1 | b == 2) {
		foo();
	}
}
function f4() {
	if (!(a == 1 | b == 2)) {} else {
		foo();
	}
}
function f5() {
	if (a == 1 && b == 2) {
		foo();
	}
}
function f6() {
	if (!(a == 1 && b == 2)) {} else {
		foo();
	}
}
function f7() {
	if (a == 1 || b == 2) {
		foo();
	} else {
		return bar();
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,16 @@
 function f3() {
-	1 == a | 2 == b && foo();
+	a == 1 | b == 2 && foo();
 }
 function f4() {
-	1 == a | 2 == b && foo();
+	a == 1 | b == 2 && foo();
 }
 function f5() {
-	1 == a && 2 == b && foo();
+	a == 1 && b == 2 && foo();
 }
 function f6() {
-	1 != a || 2 != b || foo();
+	a != 1 || b != 2 || foo();
 }
 function f7() {
-	if (1 != a && 2 != b) return bar();
-	foo();
+	if (a == 1 || b == 2) foo();
+	else return bar();
 }

```

## `terser/numbers/evaluate_4`

- size: oxc 60 vs reference 55 (no whitespaces: +5, formatted: +4)

```js
console.log(1 + +a, +a + 1, 1 + -a, -a + 1, +a + +b, +a + -b, -a + +b, -a + -b);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(+a + 1, +a + 1, 1 - a, 1 - a, +a + +b, +a - b, -a + +b, -a - b);
+console.log(1 + +a, +a + 1, 1 + -a, -a + 1, +a + +b, +a + -b, -a + +b, -a + -b);

```

## `terser/properties/issue_t64`

- tags: `join vars`, `remove unused`
- size: oxc 153 vs reference 148 (no whitespaces: +5, formatted: +5)

```js
var obj = {};
obj.Base = class {
	constructor() {
		this.id = 'PASS';
	}
};
obj.Derived = class extends obj.Base {
	constructor() {
		super();
		console.log(this.id);
	}
};
new obj.Derived();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-var obj = { Base: class {
+var obj = {};
+obj.Base = class {
 	constructor() {
 		this.id = 'PASS';
 	}
-} };
+};
 obj.Derived = class extends obj.Base {
 	constructor() {
 		super();

```

## `terser/properties/join_object_assignments_null_1`

- tags: `join vars`
- size: oxc 40 vs reference 35 (no whitespaces: +5, formatted: +5)

```js
var o = {};
o[null] = 1;
console.log(o[null]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-var o = { null: 1 };
-console.log(o.null);
+var o = {};
+o[null] = 1;
+console.log(o[null]);

```

## `terser/reduce_vars/duplicate_lambda_defun_name_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 60 vs reference 55 (no whitespaces: +5, formatted: +6)

```js
console.log((function f(a) {
	function f() {}
	return f.length;
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log(function() {
-	return (function() {}).length;
-}());
+console.log((function(a) {
+	function f() {}
+	return f.length;
+})());

```

## `terser/reduce_vars/escape_expansion`

- tags: `join vars`, `remove unused`
- size: oxc 179 vs reference 174 (no whitespaces: +5, formatted: +4)

```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('FAIL');
	else console.log('PASS');
}
function foo() {}
function bar(...x) {
	return x[0];
}
function baz() {
	return bar(...[foo]);
}
main();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,12 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('PASS') : console.log('FAIL');
+}
 function foo() {}
+function bar(...x) {
+	return x[0];
+}
 function baz() {
-	return (function(...x) {
-		return x[0];
-	})(foo);
+	return bar(foo);
 }
-(function() {
-	var thing = baz();
-	if (thing !== (thing = baz())) console.log('FAIL');
-	else console.log('PASS');
-})();
+main();

```

## `terser/reduce_vars/iife`

- tags: `join vars`
- size: oxc 55 vs reference 50 (no whitespaces: +5, formatted: +11)

```js
!(function(a, b, c) {
	b++;
	console.log(a - 1, b * 1, c + 2);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-!(function(a, b, c) {
+(function(a, b, c) {
 	b++;
-	console.log(0, 3, 5);
+	console.log(a - 1, b * 1, c + 2);
 })(1, 2, 3);

```

## `terser/reduce_vars/issue_2485`

- tags: `join vars`, `remove unused`
- size: oxc 258 vs reference 253 (no whitespaces: +5, formatted: +4)

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
 var foo = function(bar) {
 	var n = function(a, b) {
 		return a + b;
+	}, sumAll = function(arg) {
+		return arg.reduce(n, 0);
+	}, runSumAll = function(arg) {
+		return sumAll(arg);
 	};
-	var runSumAll = function(arg) {
-		return (function(arg) {
-			return arg.reduce(n, 0);
-		})(arg);
-	};
 	bar.baz = function(arg) {
 		var n = runSumAll(arg);
 		return n.get = 1, n;
 	};
 	return bar;
-};
-var bar = foo({});
+}, bar = foo({});
 console.log(bar.baz([
 	1,
 	2,

```

## `terser/reduce_vars/regex_loop`

- tags: `join vars`, `remove unused`
- size: oxc 111 vs reference 106 (no whitespaces: +5, formatted: +9)

```js
function f(x) {
	for (var r, s = 'acdabcdeabbb'; r = x().exec(s);) console.log(r[0]);
}
var a = /ab*/g;
f(function() {
	return a;
});

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
+function f(x) {
+	for (var r, s = 'acdabcdeabbb'; r = x().exec(s);) console.log(r[0]);
+}
 var a = /ab*/g;
-(function(x) {
-	for (var r; r = x().exec('acdabcdeabbb');) console.log(r[0]);
-})(function() {
+f(function() {
 	return a;
 });

```

## `terser/arrow/export_default_object_expression`

- size: oxc 65 vs reference 59 (no whitespaces: +6, formatted: +10)

```js
export default {
	foo: 1 + 2,
	bar() {
		return 4;
	},
	get baz() {
		return this.foo;
	}
};

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 export default {
 	foo: 3,
-	bar: () => 4,
+	bar() {
+		return 4;
+	},
 	get baz() {
 		return this.foo;
 	}

```

## `terser/arrow/issue_27`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 53 (no whitespaces: +6, formatted: +3)

```js
(function(jQuery) {
	var $;
	$ = jQuery;
	$('body').addClass('foo');
})(jQuery);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-((jQuery1) => {
-	jQuery1('body').addClass('foo');
+(function(jQuery) {
+	jQuery('body').addClass('foo');
 })(jQuery);

```

## `terser/arrow/issue_3092b`

- size: oxc 123 vs reference 117 (no whitespaces: +6, formatted: +8)

```js
var obj = {
	async bar(x) {
		return await x, 2;
	},
	*gen(x) {
		return yield x.toUpperCase(), 2;
	}
};
console.log(obj.gen('pass').next().value);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var obj = {
-	bar: async (x) => (await x, 2),
+	async bar(x) {
+		return await x, 2;
+	},
 	*gen(x) {
 		return yield x.toUpperCase(), 2;
 	}

```

## `terser/collapse_vars/collapse_vars_arguments`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 64 vs reference 58 (no whitespaces: +6, formatted: +9)

```js
var outer = function() {
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
@@ -1,5 +1,6 @@
-(function() {
+var outer = function() {
 	(function() {
-		console.log(arguments);
+		console.log(5);
 	})(7, 1);
-})();
+};
+outer();

```

## `terser/collapse_vars/collapse_vars_regexp`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 292 vs reference 286 (no whitespaces: +6, formatted: +10)

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
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = /ab*/g;
	while (result = rx.exec(s)) {
		console.log(result[0]);
	}
})();
(function() {
	var result;
	var s = 'acdabcdeabbb';
	var rx = f2();
	while (result = rx(s)) {
		console.log(result[0]);
	}
})();

```

```diff
--- reference
+++ oxc
@@ -8,10 +8,7 @@
 	};
 }
 (function() {
-	var result, rx = /ab*/g;
-	while (result = rx.exec('acdabcdeabbb')) console.log(result[0]);
-})();
-(function() {
-	var result, rx = f2();
-	while (result = rx('acdabcdeabbb')) console.log(result[0]);
+	for (var result, s = 'acdabcdeabbb', rx = /ab*/g; result = rx.exec(s);) console.log(result[0]);
+})(), (function() {
+	for (var result, s = 'acdabcdeabbb', rx = f2(); result = rx(s);) console.log(result[0]);
 })();

```

## `terser/collapse_vars/toplevel_single_reference`

- tags: `join vars`, `remove unused`
- size: oxc 35 vs reference 29 (no whitespaces: +6, formatted: +7)

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
@@ -1,4 +1,5 @@
+var a;
 for (var b in x) {
-	var a;
-	b(a = b);
+	var a = b;
+	b(a);
 }

```

## `terser/collapse_vars/var_defs`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 69 vs reference 63 (no whitespaces: +6, formatted: +10)

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
@@ -1,5 +1,5 @@
 var f1 = function(x, y) {
-	var r = x + y;
-	console.log(r * r - r + 7);
+	var a, r = x + y, a = r * r - r;
+	console.log(a + 7);
 };
 f1('1', 0);

```

## `terser/dead_code/issue_2860_1`

- tags: `join vars`
- size: oxc 42 vs reference 36 (no whitespaces: +6, formatted: +8)

```js
console.log((function(a) {
	return a ^= 1;
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function() {
-	return 1;
-}());
+console.log((function(a) {
+	return a ^= 1;
+})());

```

## `terser/dead_code/return_assignment`

- tags: `remove unused`
- size: oxc 562 vs reference 556 (no whitespaces: +6, formatted: +13)

```js
function f1(a, b, c) {
	return a = x(), b = y(), b = a && (c >>= 5);
}
function f2() {
	return e = x();
}
function f3(e) {
	return e = x();
}
function f4() {
	var e;
	return e = x();
}
function f5(a) {
	try {
		return a = x();
	} catch (b) {
		console.log(a);
	}
}
function f6(a) {
	try {
		return a = x();
	} finally {
		console.log(a);
	}
}
function y() {
	console.log('y');
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
		f6
	].forEach(function(f, i) {
		e = null;
		try {
			i += 1;
			console.log('result ' + f(10 * i, 100 * i, 1e3 * i));
		} catch (x) {
			console.log('caught ' + x);
		}
		if (null !== e) console.log('e: ' + e);
	});
}
var x, e;
test(1);
test(-1);

```

```diff
--- reference
+++ oxc
@@ -1,19 +1,19 @@
 function f1(a, b, c) {
-	return a = x(), y(), a && c >> 5;
+	return a = x(), b = y(), b = a && (c >>= 5);
 }
 function f2() {
 	return e = x();
 }
 function f3(e) {
-	return x();
+	return e = x();
 }
 function f4() {
 	return x();
 }
 function f5(a) {
 	try {
-		return x();
-	} catch (b) {
+		return a = x();
+	} catch {
 		console.log(a);
 	}
 }
@@ -49,7 +49,7 @@
 		} catch (x) {
 			console.log('caught ' + x);
 		}
-		if (null !== e) console.log('e: ' + e);
+		e !== null && console.log('e: ' + e);
 	});
 }
 var x, e;

```

## `terser/drop_unused/issue_1715_2`

- tags: `remove unused`
- size: oxc 70 vs reference 64 (no whitespaces: +6, formatted: +10)

```js
var a = 1;
function f() {
	a++;
	try {
		x();
	} catch (a) {
		var a = 2;
	}
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 var a = 1;
 function f() {
+	a++;
 	try {
 		x();
 	} catch (a) {
-		var a;
+		var a = 2;
 	}
 }
 f();

```

## `terser/drop_unused/issue_2063`

- tags: `remove unused`
- size: oxc 12 vs reference 6 (no whitespaces: +6, formatted: +7)

```js
var a;
var a;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
 var a;
+var a;

```

## `terser/drop_unused/issue_2288`

- tags: `remove unused`
- size: oxc 65 vs reference 59 (no whitespaces: +6, formatted: +7)

```js
function foo(o) {
	for (var j = o.a, i = 0; i < 0; i++);
	for (var i = 0; i < 0; i++);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 function foo(o) {
-	o.a;
+	for (var j = o.a, i = 0; i < 0; i++);
 	for (var i = 0; i < 0; i++);
-	for (i = 0; i < 0; i++);
 }

```

## `terser/drop_unused/unused_funarg_1`

- tags: `remove unused`
- size: oxc 33 vs reference 27 (no whitespaces: +6, formatted: +9)

```js
function f(a, b, c, d, e) {
	return a + b;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-function f(a, b) {
+function f(a, b, c, d, e) {
 	return a + b;
 }

```

## `terser/evaluate/unsafe_charAt_noop`

- size: oxc 64 vs reference 58 (no whitespaces: +6, formatted: +6)

```js
console.log(s.charAt(0), 'string'.charAt(x), (typeof x).charAt());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(s.charAt(0), 'string'.charAt(x), (typeof x)[0]);
+console.log(s.charAt(0), 'string'.charAt(x), (typeof x).charAt());

```

## `terser/evaluate/unsafe_object_nested`

- tags: `join vars`
- size: oxc 53 vs reference 47 (no whitespaces: +6, formatted: +8)

```js
var o = { a: { b: 1 } };
console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var o = { a: { b: 1 } };
-console.log(o + 1, o.a + 1, o.b + 1, 2);
+console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

## `terser/if_return/if_return_2`

- tags: `sequences`, `remove unused`
- size: oxc 46 vs reference 40 (no whitespaces: +6, formatted: +4)

```js
function f(x, y) {
	if (x) return 3;
	if (y) return c();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f(x, y) {
-	return x ? 3 : y ? c() : void 0;
+	if (x) return 3;
+	if (y) return c();
 }

```

## `terser/issue_1052/not_hoisted_when_already_nested`

- size: oxc 56 vs reference 50 (no whitespaces: +6, formatted: +3)

```js
(function() {
	if (!window) {
		return;
	}
	if (foo) function f() {}
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
 (function() {
-	if (window) {
-		if (foo) function f() {}
-	}
+	if (!window) return;
+	if (foo) function f() {}
 })();

```

## `terser/issue_976/eval_mangle`

- size: oxc 132 vs reference 126 (no whitespaces: +6, formatted: +6)

```js
function f1(a, eval, c, d, e) {
	return a('c') + eval;
}
function f2(a, b, c, d, e) {
	return a + eval('c');
}
function f3(a, eval, c, d, e) {
	return a + eval('c');
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-function f1(n, c, e, a, f) {
-	return n('c') + c;
+function f1(a, eval, c, d, e) {
+	return a('c') + eval;
 }
 function f2(a, b, c, d, e) {
 	return a + eval('c');

```

## `terser/issue_976/eval_unused`

- tags: `remove unused`
- size: oxc 132 vs reference 126 (no whitespaces: +6, formatted: +9)

```js
function f1(a, eval, c, d, e) {
	return a('c') + eval;
}
function f2(a, b, c, d, e) {
	return a + eval('c');
}
function f3(a, eval, c, d, e) {
	return a + eval('c');
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-function f1(a, eval) {
+function f1(a, eval, c, d, e) {
 	return a('c') + eval;
 }
 function f2(a, b, c, d, e) {

```

## `terser/nullish/nullish_coalescing_boolean_context`

- tags: `join vars`, `sequences`
- size: oxc 45 vs reference 39 (no whitespaces: +6, formatted: +8)

```js
if (null ?? unknown) {
	pass();
}
if (unknown ?? false) {
	pass();
}
if (4 + 4 ?? unknown) {
	pass();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1 @@
-unknown && pass();
-unknown && pass();
-pass();
+unknown && pass(), (unknown ?? !1) && pass(), pass();

```

## `terser/numbers/evaluate_1`

- size: oxc 118 vs reference 112 (no whitespaces: +6, formatted: +6)

```js
console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, 1 | x | 2 | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), 1 + (2 + ~x + 3), -y + (2 + ~x + 3), 1 & (2 & x & 3), 1 + (2 + (x |= 0) + 3));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(x + 1 + 2, 1 * x * 2, +x + 1 + 2, 1 + x + 2 + 3, 3 | x, 1 + x-- + 2 + 3, x * y + 2 + 1 + 3, 1 + (2 + x + 3), 2 + ~x + 3 + 1, -y + (2 + ~x + 3), 0 & x, 2 + (x |= 0) + 3 + 1);
+console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, x | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), 1 + (2 + ~x + 3), -y + (2 + ~x + 3), x & 0, 1 + (2 + (x |= 0) + 3));

```

## `terser/object/concise_method_to_prop_arrow`

- size: oxc 129 vs reference 123 (no whitespaces: +6, formatted: +8)

```js
console.log({ a: () => 1 }.a());
console.log({ a: () => 2 }.a());
console.log({ a() {
	return 3;
} }.a());
console.log({
	a() {
		return this.b;
	},
	b: 4
}.a());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 console.log({ a: () => 1 }.a());
 console.log({ a: () => 2 }.a());
-console.log({ a: () => 3 }.a());
+console.log({ a() {
+	return 3;
+} }.a());
 console.log({
 	a() {
 		return this.b;

```

## `terser/object/dont_join_repeat_object_keys`

- tags: `join vars`
- size: oxc 28 vs reference 22 (no whitespaces: +6, formatted: +8)

```js
const obj = { foo: 1 };
obj.foo = 2;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-const obj = { foo: (1, 2) };
+const obj = { foo: 1 };
+obj.foo = 2;

```

## `terser/properties/issue_2208_4`

- size: oxc 67 vs reference 61 (no whitespaces: +6, formatted: +14)

```js
function foo() {}
console.log({
	a: foo(),
	p: function() {
		return 42;
	}
}.p());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 function foo() {}
-console.log((foo(), function() {
-	return 42;
-})());
+console.log({
+	a: foo(),
+	p: function() {
+		return 42;
+	}
+}.p());

```

## `terser/properties/issue_2513`

- size: oxc 147 vs reference 141 (no whitespaces: +6, formatted: +6)

```js
!(function(Infinity, NaN, undefined) {
	console.log('a'[1 / 0], 'b'['Infinity']);
	console.log('c'[0 / 0], 'd'['NaN']);
	console.log('e'[void 0], 'f'['undefined']);
})(0, 0, 0);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-!(function(Infinity, NaN, undefined) {
-	console.log('a'[1 / 0], 'b'[1 / 0]);
-	console.log('c'.NaN, 'd'.NaN);
-	console.log('e'[void 0], 'f'[void 0]);
+(function(Infinity, NaN, undefined) {
+	console.log('a'[1 / 0], 'b'.Infinity);
+	console.log('c'[0 / 0], 'd'.NaN);
+	console.log('e'[void 0], 'f'.undefined);
 })(0, 0, 0);

```

## `terser/properties/issue_2816_ecma6`

- tags: `join vars`
- size: oxc 68 vs reference 62 (no whitespaces: +6, formatted: +7)

```js
'use strict';
var o = { a: 1 };
o.b = 2;
o.a = 3;
o.c = 4;
console.log(o.a, o.b, o.c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 'use strict';
-var o = {
-	a: (1, 3),
-	b: 2,
-	c: 4
-};
+var o = { a: 1 };
+o.b = 2;
+o.a = 3;
+o.c = 4;
 console.log(o.a, o.b, o.c);

```

## `terser/pure_funcs/array`

- tags: `pure functions`
- size: oxc 28 vs reference 22 (no whitespaces: +6, formatted: +12)

```js
var a;
function f(b) {
	Math.floor(a / b);
	Math.floor(c / b);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 var a;
 function f(b) {
-	c;
+	a / b;
+	c / b;
 }

```

## `terser/pure_getters/set_immutable_2`

- tags: `join vars`, `sequences`
- size: oxc 64 vs reference 58 (no whitespaces: +6, formatted: +9)

```js
var a = 1;
a.foo += '';
if (a.foo) console.log('FAIL');
else console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-1 .foo += '', 1 .foo ? console.log('FAIL') : console.log('PASS');
+var a = 1;
+a.foo += '', a.foo ? console.log('FAIL') : console.log('PASS');

```

## `terser/pure_getters/set_immutable_4`

- tags: `join vars`, `sequences`
- size: oxc 77 vs reference 71 (no whitespaces: +6, formatted: +9)

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
@@ -1,2 +1,3 @@
 'use strict';
-1 .foo += '', 1 .foo ? console.log('FAIL') : console.log('PASS');
+var a = 1;
+a.foo += '', a.foo ? console.log('FAIL') : console.log('PASS');

```

## `terser/pure_getters/set_immutable_5`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 77 vs reference 71 (no whitespaces: +6, formatted: +9)

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
@@ -1,3 +1,3 @@
 'use strict';
-1 .foo += '';
-1 .foo ? console.log('FAIL') : console.log('PASS');
+var a = 1;
+a.foo += '', a.foo ? console.log('FAIL') : console.log('PASS');

```

## `terser/reduce_vars/defun_inline_2`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 70 (no whitespaces: +6, formatted: +10)

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
@@ -1,7 +1,9 @@
 function f() {
-	return function() {
-		return 2;
-	}() + function h() {
+	function g(b) {
+		return b;
+	}
+	function h() {
 		return h();
-	}();
+	}
+	return g(2) + h();
 }

```

## `terser/reduce_vars/delay_def`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 71 (no whitespaces: +6, formatted: +6)

```js
function f() {
	return a;
	var a;
}
function g() {
	return a;
	var a = 1;
}
console.log(f(), g());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
 function f() {
-	return;
+	return a;
+	var a;
 }
 function g() {
 	return a;
-	var a = 1;
+	var a;
 }
 console.log(f(), g());

```

## `terser/reduce_vars/escape_local_sequence`

- tags: `join vars`, `remove unused`
- size: oxc 143 vs reference 137 (no whitespaces: +6, formatted: +9)

```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('PASS');
	else console.log('FAIL');
}
function baz() {
	function foo() {}
	function bar() {}
	return foo, bar;
}
main();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('FAIL') : console.log('PASS');
+}
 function baz() {
-	return function() {};
+	function bar() {}
+	return bar;
 }
-(function() {
-	var thing = baz();
-	if (thing !== (thing = baz())) console.log('PASS');
-	else console.log('FAIL');
-})();
+main();

```

## `terser/reduce_vars/escape_local_throw`

- tags: `join vars`, `remove unused`
- size: oxc 169 vs reference 163 (no whitespaces: +6, formatted: +9)

```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('PASS');
	else console.log('FAIL');
}
function baz() {
	function foo() {}
	try {
		throw foo;
	} catch (bar) {
		return bar;
	}
}
main();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,13 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('FAIL') : console.log('PASS');
+}
 function baz() {
+	function foo() {}
 	try {
-		throw function() {};
+		throw foo;
 	} catch (bar) {
 		return bar;
 	}
 }
-(function() {
-	var thing = baz();
-	if (thing !== (thing = baz())) console.log('PASS');
-	else console.log('FAIL');
-})();
+main();

```

## `terser/reduce_vars/escape_yield`

- tags: `join vars`, `remove unused`
- size: oxc 186 vs reference 180 (no whitespaces: +6, formatted: +8)

```js
function main() {
	var thing = gen.next().value;
	if (thing !== (thing = gen.next().value)) console.log('FAIL');
	else console.log('PASS');
}
function foo() {}
function* baz(s) {
	for (;;) yield foo;
}
var gen = baz();
main();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
+function main() {
+	var thing = gen.next().value;
+	thing === (thing = gen.next().value) ? console.log('PASS') : console.log('FAIL');
+}
 function foo() {}
-var gen = function* () {
+function* baz(s) {
 	for (;;) yield foo;
-}();
-(function() {
-	var thing = gen.next().value;
-	if (thing !== (thing = gen.next().value)) console.log('FAIL');
-	else console.log('PASS');
-})();
+}
+var gen = baz();
+main();

```

## `terser/reduce_vars/iife_new`

- tags: `join vars`
- size: oxc 64 vs reference 58 (no whitespaces: +6, formatted: +12)

```js
var A = new (function(a, b, c) {
	b++;
	console.log(a - 1, b * 1, c + 2);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var A = new (function(a, b, c) {
 	b++;
-	console.log(0, 3, 5);
+	console.log(a - 1, b * 1, c + 2);
 })(1, 2, 3);

```

## `terser/reduce_vars/issue_2420_1`

- tags: `join vars`, `remove unused`
- size: oxc 174 vs reference 168 (no whitespaces: +6, formatted: +10)

```js
function run() {
	var self = this;
	if (self.count++) self.foo();
	else self.bar();
}
var o = {
	count: 0,
	foo: function() {
		console.log('foo');
	},
	bar: function() {
		console.log('bar');
	}
};
run.call(o);
run.call(o);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 function run() {
-	if (this.count++) this.foo();
-	else this.bar();
+	var self = this;
+	self.count++ ? self.foo() : self.bar();
 }
 var o = {
 	count: 0,

```

## `terser/reduce_vars/issue_2420_2`

- tags: `join vars`, `remove unused`
- size: oxc 201 vs reference 195 (no whitespaces: +6, formatted: +9)

```js
function f() {
	var that = this;
	if (that.bar) that.foo();
	else !(function(that, self) {
		console.log(this === that, self === this, that === self);
	})(that, this);
}
f.call({
	bar: 1,
	foo: function() {
		console.log('foo', this.bar);
	}
});
f.call({});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f() {
-	if (this.bar) this.foo();
-	else !(function(that, self) {
+	var that = this;
+	that.bar ? that.foo() : (function(that, self) {
 		console.log(this === that, self === this, that === self);
-	})(this, this);
+	})(that, this);
 }
 f.call({
 	bar: 1,

```

## `terser/reduce_vars/issue_2860_1`

- tags: `join vars`
- size: oxc 42 vs reference 36 (no whitespaces: +6, formatted: +8)

```js
console.log((function(a) {
	return a ^= 1;
	a ^= 2;
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function() {
-	return 1;
-}());
+console.log((function(a) {
+	return a ^= 1;
+})());

```

## `terser/reduce_vars/recursive_inlining_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 170 vs reference 164 (no whitespaces: +6, formatted: +3)

```js
!(function() {
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
})();

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,15 @@
-!function() {
-	(function qux(x) {
+(function() {
+	function foo(x) {
+		console.log('foo', x);
+		x && bar(x - 1);
+	}
+	function bar(x) {
+		console.log('bar', x);
+		x && qux(x - 1);
+	}
+	function qux(x) {
 		console.log('qux', x);
-		if (x) (function(x) {
-			console.log('foo', x);
-			if (x) (function(x) {
-				console.log('bar', x);
-				if (x) qux(x - 1);
-			})(x - 1);
-		})(x - 1);
-	})(4);
-}();
+		x && foo(x - 1);
+	}
+	qux(4);
+})();

```

## `terser/reduce_vars/unsafe_evaluate_array_1`

- tags: `join vars`
- size: oxc 160 vs reference 154 (no whitespaces: +6, formatted: +11)

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
@@ -1,7 +1,7 @@
 function f0() {
-	var a = 1;
-	[][1] = 2;
-	console.log(4);
+	var a = 1, b = [];
+	b[a] = 2;
+	console.log(a + 3);
 }
 function f1() {
 	var a = [1];

```

## `terser/reduce_vars/unsafe_evaluate_escaped`

- tags: `join vars`, `remove unused`
- size: oxc 222 vs reference 216 (no whitespaces: +6, formatted: +6)

```js
console.log((function() {
	var o = { p: 1 };
	console.log(o, o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 2 };
	console.log(o.p, o);
	return o.p;
})());
console.log((function() {
	var o = { p: 3 }, a = [o];
	console.log(a[0].p++);
	return o.p;
})());

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,15 @@
-console.log(function() {
+console.log((function() {
 	var o = { p: 1 };
 	console.log(o, o.p);
 	return o.p;
-}());
-console.log(function() {
+})());
+console.log((function() {
 	var o = { p: 2 };
 	console.log(o.p, o);
 	return o.p;
-}());
-console.log(function() {
+})());
+console.log((function() {
 	var o = { p: 3 }, a = [o];
 	console.log(a[0].p++);
 	return o.p;
-}());
+})());

```

## `terser/regexp/unsafe_slashes`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 33 vs reference 27 (no whitespaces: +6, formatted: +6)

```js
console.log(new RegExp('^https://'));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(/^https:\/\//);
+console.log(RegExp('^https://'));

```

## `terser/sequences/issue_2062`

- tags: `join vars`, `sequences`
- size: oxc 51 vs reference 45 (no whitespaces: +6, formatted: +12)

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
@@ -1,3 +1,2 @@
 var a = 1;
-a++, a--, a++, a--, a.var;
-console.log(a);
+a || a++ + a--, a++ + a--, a && a.var, console.log(a);

```

## `terser/sequences/lift_sequences_2`

- tags: `sequences`
- size: oxc 69 vs reference 63 (no whitespaces: +6, formatted: +7)

```js
var foo = 1, bar;
foo.x = (foo = {}, 10);
bar = (bar = {}, 10);
console.log(foo, bar);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var foo = 1, bar;
-foo.x = (foo = {}, 10), bar = {}, console.log(foo, bar = 10);
+foo.x = (foo = {}, 10), bar = (bar = {}, 10), console.log(foo, bar);

```

## `terser/sequences/side_effects_cascade_3`

- tags: `join vars`, `sequences`
- size: oxc 56 vs reference 50 (no whitespaces: +6, formatted: +8)

```js
function f(a, b) {
	'foo' ^ (b += a), b ? false : (b = a) ? -1 : (b -= a) - (b ^= a), a-- || !a, a;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f(a, b) {
-	!(b += a) && ((b = a) || (b -= a, b ^= a)), a--;
+	'foo' ^ (b += a), (b ||= a) || (b -= a) - (b ^= a), a--;
 }

```

## `terser/switch/drop_case_2`

- size: oxc 54 vs reference 48 (no whitespaces: +6, formatted: +11)

```js
switch (foo) {
	case 'bar':
		bar();
		break;
	case 'moo':
	case moo:
	case 'baz': break;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 switch (foo) {
-	case 'bar': bar();
+	case 'bar':
+		bar();
+		break;
 	case 'moo':
 	case moo:
 }

```

## `terser/switch/issue_2535`

- size: oxc 18 vs reference 12 (no whitespaces: +6, formatted: +13)

```js
switch (w(), 42) {
	case 13: x();
	case 42: y();
	default: z();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-w();
-y();
-z();
+if (w(), 1) {
+	y();
+	z();
+}

```

## `terser/switch/keep_case`

- size: oxc 44 vs reference 38 (no whitespaces: +6, formatted: +11)

```js
switch (foo) {
	case 'bar':
		baz();
		break;
	case moo: break;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 switch (foo) {
-	case 'bar': baz();
+	case 'bar':
+		baz();
+		break;
 	case moo:
 }

```

## `terser/typeof/duplicate_defun_arg_name`

- tags: `join vars`
- size: oxc 96 vs reference 90 (no whitespaces: +6, formatted: +6)

```js
function long_name(long_name) {
	return typeof long_name;
}
console.log(typeof long_name, long_name());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 function long_name(long_name) {
 	return typeof long_name;
 }
-console.log('function', long_name());
+console.log(typeof long_name, long_name());

```

## `terser/collapse_vars/issue_1631_3`

- tags: `join vars`, `sequences`
- size: oxc 93 vs reference 86 (no whitespaces: +7, formatted: +11)

```js
function g() {
	var a = 0, b = 1;
	function f() {
		a = 2;
		return 4;
	}
	var t = f();
	b = a + t;
	return b;
}
console.log(g());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
 function g() {
-	var a = 0, b = 1, t = function f() {
+	var a = 0, b = 1;
+	function f() {
 		return a = 2, 4;
-	}();
-	return b = a + t;
+	}
+	var t = f();
+	return b = a + t, b;
 }
 console.log(g());

```

## `terser/collapse_vars/issue_2506`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 136 vs reference 129 (no whitespaces: +7, formatted: +11)

```js
var c = 0;
function f0(bar) {
	function f1(Infinity_2) {
		function f13(NaN) {
			if (false <= NaN & this >> 1 >= 0) {
				c++;
			}
		}
		var b_2 = f13(NaN, c++);
	}
	var bar = f1(-3, -1);
}
f0(false);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,12 @@
 var c = 0;
 function f0(bar) {
-	(function(Infinity_2) {
-		(function(NaN) {
-			if (false <= 0 / 0 & this >> 1 >= 0) c++;
-		})(0, c++);
-	})();
+	function f1(Infinity_2) {
+		function f13(NaN) {
+			!1 <= NaN & this >> 1 >= 0 && c++;
+		}
+		f13(NaN, c++);
+	}
+	f1(-3, -1);
 }
-f0(false);
+f0(!1);
 console.log(c);

```

## `terser/destructuring/destructure_empty_array_1`

- tags: `remove unused`
- size: oxc 53 vs reference 46 (no whitespaces: +7, formatted: +9)

```js
let {} = Object, [] = {}, unused = console.log('not reached');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-let {} = Object, [] = {};
-console.log('not reached');
+let {} = Object, [] = {}, unused = console.log('not reached');

```

## `terser/destructuring/destructure_empty_array_2`

- tags: `remove unused`
- size: oxc 53 vs reference 46 (no whitespaces: +7, formatted: +9)

```js
let {} = Object, [] = {}, unused = console.log('not reached');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-let {} = Object, [] = {};
-console.log('not reached');
+let {} = Object, [] = {}, unused = console.log('not reached');

```

## `terser/destructuring/mangle_destructuring_assign_toplevel_true`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `remove unused`
- size: oxc 158 vs reference 151 (no whitespaces: +7, formatted: +6)

```js
function test(opts) {
	let s, o, r;
	let a = opts.a || {
		e: 7,
		n: 8
	};
	({t, e, n, s = 5 + 4, o, r} = a);
	console.log(t, e, n, s, o, r);
}
let t, e, n;
test({ a: {
	t: 1,
	e: 2,
	n: 3,
	s: 4,
	o: 5,
	r: 6
} });
test({});

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,14 @@
-function e(e) {
-	let l, s, a;
-	let c = e.a || {
+function test(r) {
+	let i, a, o;
+	let s = r.a || {
 		e: 7,
 		n: 8
 	};
-	({t: n, e: o, n: t, s: l = 9, o: s, r: a} = c);
-	console.log(n, o, t, l, s, a);
+	({t: e, e: t, n, s: i = 9, o: a, r: o} = s);
+	console.log(e, t, n, i, a, o);
 }
-let n, o, t;
-e({ a: {
+let e, t, n;
+test({ a: {
 	t: 1,
 	e: 2,
 	n: 3,
@@ -16,4 +16,4 @@
 	o: 5,
 	r: 6
 } });
-e({});
+test({});

```

## `terser/drop_unused/issue_1656`

- tags: `remove unused`
- size: oxc 15 vs reference 8 (no whitespaces: +7, formatted: +9)

```js
for (var a = 0;;);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-for (;;);
+for (var a = 0;;);

```

## `terser/evaluate/pow_sequence_with_constants_and_parens`

- size: oxc 25 vs reference 18 (no whitespaces: +7, formatted: +11)

```js
console.log((4 ** 1) ** 2, (4 ** 1) ** (1 / 2));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(16, 2);
+console.log(16, 4 ** (1 / 2));

```

## `terser/evaluate/pow_sequence_with_parens_exact`

- size: oxc 109 vs reference 102 (no whitespaces: +7, formatted: +11)

```js
console.log((4 ** 1) ** 2, (4 ** 1) ** (1 / 2));
var one = 1;
var two = 2;
var four = 4;
console.log((four ** one) ** two, (four ** one) ** (one / two));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-console.log(16, 2);
+console.log(16, 4 ** (1 / 2));
 var one = 1;
 var two = 2;
 var four = 4;

```

## `terser/issue_1447/conditional_false_stray_else_in_loop`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 47 (no whitespaces: +7, formatted: +13)

```js
for (var i = 1; i <= 4; ++i) {
	if (i <= 2) continue;
	console.log(i);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (var i = 1; i <= 4; ++i) if (!(i <= 2)) console.log(i);
+for (var i = 1; i <= 4; ++i) {
+	if (i <= 2) continue;
+	console.log(i);
+}

```

## `terser/issue_1466/same_variable_in_multiple_forIn`

- tags: `join vars`, `sequences`
- size: oxc 119 vs reference 112 (no whitespaces: +7, formatted: +5)

```js
var test = [
	'a',
	'b',
	'c'
];
for (let tmp in test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (let tmp in test) {
		console.log(tmp);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,13 +3,12 @@
 	'b',
 	'c'
 ];
-for (let e in test) {
-	console.log(e);
-	let t;
-	t = [
+for (let tmp in test) {
+	console.log(tmp);
+	let dd = [
 		'e',
 		'f',
 		'g'
 	];
-	for (let e in test) console.log(e);
+	for (let tmp in test) console.log(tmp);
 }

```

## `terser/issue_1466/same_variable_in_multiple_forIn_sequences_let`

- tags: `join vars`, `sequences`
- size: oxc 119 vs reference 112 (no whitespaces: +7, formatted: +6)

```js
var test = [
	'a',
	'b',
	'c'
];
for (let tmp in test) {
	console.log(tmp);
	let dd;
	dd = [
		'e',
		'f',
		'g'
	];
	for (let tmp in test) {
		console.log(tmp);
	}
}

```

```diff
--- reference
+++ oxc
@@ -3,12 +3,12 @@
 	'b',
 	'c'
 ];
-for (let e in test) {
-	let t;
-	console.log(e), t = [
+for (let tmp in test) {
+	console.log(tmp);
+	let dd = [
 		'e',
 		'f',
 		'g'
 	];
-	for (let e in test) console.log(e);
+	for (let tmp in test) console.log(tmp);
 }

```

## `terser/issue_2001/export_mangle_4`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`
- size: oxc 53 vs reference 46 (no whitespaces: +7, formatted: +11)

```js
export default class C {
	go(one, two) {
		var z = one;
		return one - two + z;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-export default class e {
-	go(e, r) {
-		return e - r + e;
+export default class C {
+	go(e, t) {
+		var n = e;
+		return e - t + n;
 	}
 }
-;

```

## `terser/properties/join_object_assignments_1`

- tags: `join vars`
- size: oxc 131 vs reference 124 (no whitespaces: +7, formatted: +6)

```js
console.log((function() {
	var x = {
		a: 1,
		c: (console.log('c'), 'C')
	};
	x.b = 2;
	x[3] = function() {
		console.log(x);
	}, x['a'] = /foo/, x.bar = x;
	return x;
})());

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,11 @@
 console.log((function() {
 	var x = {
-		a: (1, /foo/),
-		c: (console.log('c'), 'C'),
-		b: 2,
-		3: function() {
-			console.log(x);
-		}
+		a: 1,
+		c: (console.log('c'), 'C')
 	};
-	x.bar = x;
+	x.b = 2;
+	x[3] = function() {
+		console.log(x);
+	}, x.a = /foo/, x.bar = x;
 	return x;
 })());

```

## `terser/pure_getters/issue_2265_1`

- size: oxc 18 vs reference 11 (no whitespaces: +7, formatted: +8)

```js
({ ...{} }).p;
({ ...g }).p;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
+({}).p;
 ({ ...g }).p;

```

## `terser/pure_getters/strict_reduce_vars`

- tags: `join vars`
- size: oxc 84 vs reference 77 (no whitespaces: +7, formatted: +8)

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
@@ -1,6 +1,7 @@
 var a, b = null, c = {};
 a.prop;
 b.prop;
+c.prop;
 d.prop;
 null.prop;
 (void 0).prop;

```

## `terser/reduce_vars/defun_inline_1`

- tags: `join vars`, `remove unused`
- size: oxc 77 vs reference 70 (no whitespaces: +7, formatted: +10)

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
@@ -1,7 +1,9 @@
 function f() {
-	return function() {
-		return 2;
-	}() + function h() {
+	return g(2) + h();
+	function g(b) {
+		return b;
+	}
+	function h() {
 		return h();
-	}();
+	}
 }

```

## `terser/reduce_vars/issue_2420_3`

- tags: `join vars`, `remove unused`
- size: oxc 195 vs reference 188 (no whitespaces: +7, formatted: +10)

```js
function f() {
	var that = this;
	if (that.bar) that.foo();
	else ((that, self) => {
		console.log(this === that, self === this, that === self);
	})(that, this);
}
f.call({
	bar: 1,
	foo: function() {
		console.log('foo', this.bar);
	}
});
f.call({});

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f() {
-	if (this.bar) this.foo();
-	else ((that, self) => {
+	var that = this;
+	that.bar ? that.foo() : ((that, self) => {
 		console.log(this === that, self === this, that === self);
-	})(this, this);
+	})(that, this);
 }
 f.call({
 	bar: 1,

```

## `terser/return_undefined/return_undefined`

- tags: `drop debugger`, `join vars`, `remove unused`
- size: oxc 391 vs reference 384 (no whitespaces: +7, formatted: +17)

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
@@ -17,9 +17,12 @@
 }
 function f7(a, b) {
 	console.log(a, b);
-	if (!a) return a + b;
-	foo(b);
-	baz(a);
+	if (a) {
+		foo(b);
+		baz(a);
+		return;
+	}
+	return a + b;
 }
 function f8(a, b) {
 	foo(a);

```

## `terser/typeof/duplicate_lambda_arg_name`

- tags: `join vars`
- size: oxc 62 vs reference 55 (no whitespaces: +7, formatted: +6)

```js
console.log((function long_name(long_name) {
	return typeof long_name;
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-console.log(function long_name() {
-	return 'undefined';
-}());
+console.log((function(long_name) {
+	return typeof long_name;
+})());

```

## `terser/arrow/concise_methods_with_computed_property2`

- size: oxc 59 vs reference 51 (no whitespaces: +8, formatted: +8)

```js
var foo = { [[1]](v) {
	return v;
} };
console.log(foo[[1]]('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-var foo = { [[1]]: (v) => v };
+var foo = { [[1]](v) {
+	return v;
+} };
 console.log(foo[[1]]('PASS'));

```

## `terser/ascii/ascii_only_false`

- size: oxc 118 vs reference 110 (no whitespaces: +8, formatted: +8)

```js
function f() {
	return '\x000\x001\x007\x008\0' + '\0\x07\b	\n\v\f\r' + '\x1B' + ' !"# ... }~ ... þÿ࿿￿';
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f() {
-	return '\0\x07\x008\0\0\x07\b	\n\v\f\r\x1B !"# ... }~ ... þÿ࿿￿';
+	return '\x000\x001\x007\x008\0\0\x07\b	\n\v\f\r\x1B !"# ... }~ ... þÿ࿿￿';
 }

```

## `terser/ascii/ascii_only_true`

- size: oxc 118 vs reference 110 (no whitespaces: +8, formatted: +8)

```js
function f() {
	return '\x000\x001\x007\x008\0' + '\0\x07\b	\n\v\f\r' + '\x1B' + ' !"# ... }~ ... þÿ࿿￿';
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function f() {
-	return '\0\x07\x008\0\0\x07\b	\n\v\f\r\x1B !"# ... }~ ... þÿ࿿￿';
+	return '\x000\x001\x007\x008\0\0\x07\b	\n\v\f\r\x1B !"# ... }~ ... þÿ࿿￿';
 }

```

## `terser/collapse_vars/cascade_statement`

- tags: `join vars`
- size: oxc 184 vs reference 176 (no whitespaces: +8, formatted: +9)

```js
function f1(a, b) {
	var c;
	if (a) return c = b, c || a;
	else c = a, c(b);
}
function f2(a, b) {
	var c;
	while (a) c = b, a = c + b;
	do {
		throw c = a + b, c;
	} while (c);
}
function f3(a, b) {
	for (; a < b; a++) if (c = a, c && b) var c = (c = b(a), c);
}

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,15 @@
 function f1(a, b) {
 	var c;
-	if (a) return (c = b) || a;
-	else (c = a)(b);
+	if (a) return c = b, c || a;
+	else c = a, c(b);
 }
 function f2(a, b) {
 	var c;
-	while (a) a = (c = b) + b;
-	do {
-		throw c = a + b;
-	} while (c);
+	for (; a;) c = b, a = c + b;
+	do
+		throw c = a + b, c;
+	while (c);
 }
 function f3(a, b) {
-	for (; a < b; a++) if ((c = a) && b) var c = c = b(a);
+	for (; a < b; a++) if (c = a, c && b) var c = (c = b(a), c);
 }

```

## `terser/collapse_vars/collapse_vars_array`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 130 vs reference 122 (no whitespaces: +8, formatted: +12)

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
@@ -2,10 +2,11 @@
 	return [x + y];
 }
 function f2(x, y) {
+	var z = x + y;
 	return [
 		x,
 		side_effect(),
-		x + y
+		z
 	];
 }
 function f3(x, y) {

```

## `terser/collapse_vars/issue_2436_13`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 105 vs reference 97 (no whitespaces: +8, formatted: +12)

```js
var a = 'PASS';
(function() {
	function f(b) {
		(function g(b) {
			var b = b && (b.null = 'FAIL');
		})(a);
	}
	f();
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
 var a = 'PASS';
 (function() {
-	(function(b) {
+	function f(b) {
 		(function(b) {
-			a && (a.null = 'FAIL');
-		})();
-	})();
+			var b = b && (b.null = 'FAIL');
+		})(a);
+	}
+	f();
 })();
 console.log(a);

```

## `terser/collapse_vars/undeclared`

- tags: `join vars`, `remove unused`
- size: oxc 39 vs reference 31 (no whitespaces: +8, formatted: +12)

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
@@ -1,4 +1,5 @@
 function f(x, y) {
+	var a = x;
 	b = y;
-	return b + x;
+	return b + a;
 }

```

## `terser/debugger/drop_debugger`

- tags: `drop debugger`
- size: oxc 16 vs reference 8 (no whitespaces: +8, formatted: +9)

```js
debugger;
if (foo) debugger;

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-if (foo);
+if (foo) debugger;

```

## `terser/destructuring/issue_t111_4`

- tags: `remove unused`
- size: oxc 79 vs reference 71 (no whitespaces: +8, formatted: +14)

```js
let p = (x) => (console.log(x), x), a = 1, { length } = [0], c = 3, { x } = { x: 2 };
p(`${length} ${x}`);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-let p = (x) => (console.log(x), x), { length } = [0], { x } = { x: 2 };
+let p = (x) => (console.log(x), x), a = 1, { length } = [0], c = 3, { x } = { x: 2 };
 p(`${length} ${x}`);

```

## `terser/export/issue_2126`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`
- size: oxc 88 vs reference 80 (no whitespaces: +8, formatted: +11)

```js
import { foo as bar, cat as dog } from 'stuff';
console.log(bar, dog);
export { bar as qux };
export { dog };

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-import { foo as o, cat as a } from 'stuff';
-console.log(o, a);
-export { o as qux, a as dog };
+import { foo as e, cat as t } from 'stuff';
+console.log(e, t);
+export { e as qux };
+export { t as dog };

```

## `terser/export/redirection`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`
- size: oxc 87 vs reference 79 (no whitespaces: +8, formatted: +11)

```js
let foo = 1, bar = 2;
export { foo as delete };
export { bar as default };
export { foo as var } from 'module.js';

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-let e = 1, o = 2;
+let e = 1, t = 2;
+export { e as delete };
+export { t as default };
 export { foo as var } from 'module.js';
-export { e as delete, o as default };

```

## `terser/inline/noinline_annotation_2`

- tags: `join vars`
- size: oxc 29 vs reference 21 (no whitespaces: +8, formatted: +2)

```js
/*#__NOINLINE__*/
(() => {
	external();
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,2 @@
-(() => {
-	external();
-})();
+/*#__NOINLINE__*/
+external();

```

## `terser/issue_2001/export_mangle_3`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`
- size: oxc 45 vs reference 37 (no whitespaces: +8, formatted: +13)

```js
export class C {
	go(one, two) {
		var z = one;
		return one - two + z;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 export class C {
-	go(r, e) {
-		return r - e + r;
+	go(e, t) {
+		var n = e;
+		return e - t + n;
 	}
 }

```

## `terser/issue_208/do_update_rhs`

- size: oxc 31 vs reference 23 (no whitespaces: +8, formatted: +8)

```js
MY_DEBUG = DEBUG;
MY_DEBUG += DEBUG;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-MY_DEBUG = 0;
-MY_DEBUG += 0;
+MY_DEBUG = DEBUG;
+MY_DEBUG += DEBUG;

```

## `terser/issue_208/mixed`

- size: oxc 76 vs reference 68 (no whitespaces: +8, formatted: +8)

```js
const ENV = 3;
var FOO = 4;
f(ENV * 10);
--FOO;
DEBUG = 1;
DEBUG++;
DEBUG += 1;
f(DEBUG);
x = DEBUG;

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,9 @@
 const ENV = 3;
 var FOO = 4;
-f(10);
+f(30);
 --FOO;
 DEBUG = 1;
 DEBUG++;
 DEBUG += 1;
-f(0);
-x = 0;
+f(DEBUG);
+x = DEBUG;

```

## `terser/issue_t120/issue_t120_4`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 65 vs reference 57 (no whitespaces: +8, formatted: +16)

```js
for (var x = 1, t = (o) => {
	var i = +o;
	return console.log(i + i) && 0;
}; x--; t(2));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-for (var x = 1; x--; i = void 0, i = +2, console.log(i + i) && 0);
-var i;
+for (var x = 1, t = (o) => {
+	var i = +o;
+	return console.log(i + i) && 0;
+}; x--; t(2));

```

## `terser/labels/labels_10`

- tags: `sequences`
- size: oxc 33 vs reference 25 (no whitespaces: +8, formatted: +9)

```js
out: while (foo) {
	x();
	y();
	break out;
	z();
	k();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-while (foo) {
-	x();
-	y();
-	break;
+out: for (; foo;) {
+	x(), y();
+	break out;
 }

```

## `terser/numbers/evaluate_3`

- size: oxc 27 vs reference 19 (no whitespaces: +8, formatted: +11)

```js
console.log(1 + Number(x) + 2);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(3 + +x);
+console.log(1 + Number(x) + 2);

```

## `terser/pure_funcs/issue_2629_4`

- size: oxc 20 vs reference 12 (no whitespaces: +8, formatted: +10)

```js
x(), y();
w(), x(), y();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-y();
-w(), y();
+x(), y();
+w(), x(), y();

```

## `terser/pure_getters/issue_2265_2`

- tags: `join vars`
- size: oxc 36 vs reference 28 (no whitespaces: +8, formatted: +11)

```js
var a = { get b() {
	throw 0;
} };
({ ...a }).b;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-({ ...{ get b() {
+var a = { get b() {
 	throw 0;
-} } }).b;
+} };
+({ ...a }).b;

```

## `terser/reduce_vars/issue_2799_1`

- tags: `join vars`, `remove unused`
- size: oxc 127 vs reference 119 (no whitespaces: +8, formatted: +13)

```js
console.log((function() {
	return f;
	function f(n) {
		function g(i) {
			return i && i + g(i - 1);
		}
		function h(j) {
			return g(j);
		}
		return h(n);
	}
})()(5));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,12 @@
 console.log((function() {
-	return function(n) {
-		return function(j) {
-			return function g(i) {
-				return i && i + g(i - 1);
-			}(j);
-		}(n);
-	};
+	return f;
+	function f(n) {
+		function g(i) {
+			return i && i + g(i - 1);
+		}
+		function h(j) {
+			return g(j);
+		}
+		return h(n);
+	}
 })()(5));

```

## `terser/reduce_vars/obj_for_1`

- tags: `join vars`, `remove unused`
- size: oxc 49 vs reference 41 (no whitespaces: +8, formatted: +11)

```js
var o = { a: 1 };
for (var i = o.a--; i; i--) console.log(i);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-for (var i = { a: 1 }.a--; i; i--) console.log(i);
+var o = { a: 1 };
+for (var i = o.a--; i; i--) console.log(i);

```

## `terser/reduce_vars/toplevel_on`

- tags: `join vars`, `remove unused`
- size: oxc 23 vs reference 15 (no whitespaces: +8, formatted: +11)

```js
var x = 3;
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(3);
+var x = 3;
+console.log(x);

```

## `terser/sequences/for_init_var`

- tags: `join vars`
- size: oxc 89 vs reference 81 (no whitespaces: +8, formatted: +10)

```js
var a = 'PASS';
(function() {
	var b = 42;
	for (var c = 5; c > 0;) c--;
	a = 'FAIL';
	var a;
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var a = 'PASS';
 (function() {
-	for (var b = 42, c = 5, a; c > 0;) c--;
+	var b = 42;
+	for (var c = 5; c > 0;) c--;
 	a = 'FAIL';
+	var a;
 })();
 console.log(a);

```

## `terser/switch/turn_into_if`

- size: oxc 65 vs reference 57 (no whitespaces: +8, formatted: +11)

```js
switch (id(1)) {
	case id(2): console.log('FAIL');
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if (id(1) === id(2)) console.log('FAIL');
+switch (id(1)) {
+	case id(2): console.log('FAIL');
+}
 console.log('PASS');

```

## `terser/template_string/side_effects`

- size: oxc 99 vs reference 91 (no whitespaces: +8, formatted: +12)

```js
`t1`;
tag`t2`;
`t${3}`;
tag`t${4}`;
console.log(`\nt${5}`);
function f(a) {
	`t6${a}`;
	a = `t7${a}` & a;
	a = `t8${b}` | a;
	a = f`t9${a}` ^ a;
}

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,8 @@
 tag`t${4}`;
 console.log('\nt5');
 function f(a) {
-	a &= `t7${a}`;
+	`${a}`;
+	a = `t7${a}` & a;
 	a = `t8${b}` | a;
 	a = f`t9${a}` ^ a;
 }

```

## `terser/template_string/simple_string`

- size: oxc 36 vs reference 28 (no whitespaces: +8, formatted: +11)

```js
console.log(`world`, { [`foo`]: 1 }[`foo`], `hi` == 'hi');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('world', 1, true);
+console.log('world', { foo: 1 }.foo, !0);

```

## `terser/template_string/tagged_template_function_inline_5`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 28 vs reference 20 (no whitespaces: +8, formatted: +11)

```js
const t = { pl() {} };
t.pl`test`;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-({ pl() {} }).pl`test`;
+const t = { pl() {} };
+t.pl`test`;

```

## `terser/collapse_vars/collapse_vars_while`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 158 vs reference 149 (no whitespaces: +9, formatted: +13)

```js
function f1(y) {
	var x = y, c = 3 - y;
	while (c) {
		return x;
	}
	var z = y * y;
	return z;
}
function f2(y) {
	var x = 7;
	while (y) {
		return x;
	}
	var z = y * y;
	return z;
}
function f3(y) {
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
@@ -1,14 +1,12 @@
 function f1(y) {
-	var c = 3 - y;
-	while (c) return y;
+	for (var x = y, c = 3 - y; c;) return x;
 	return y * y;
 }
 function f2(y) {
-	while (y) return 7;
+	for (var x = 7; y;) return x;
 	return y * y;
 }
 function f3(y) {
-	var n = 5 - y;
-	while (y) return n;
+	for (var n = 5 - y; y;) return n;
 	return y * y;
 }

```

## `terser/conditionals/ifs_6`

- tags: `sequences`
- size: oxc 83 vs reference 74 (no whitespaces: +9, formatted: +10)

```js
var x, y;
if (!foo && !bar && !baz && !boo) {
	x = 10;
} else {
	x = 20;
}
if (y) {
	x[foo] = 10;
} else {
	x[foo] = 20;
}
if (foo) {
	x[bar] = 10;
} else {
	x[bar] = 20;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,2 @@
-var x, y;
-x = foo || bar || baz || boo ? 20 : 10;
-x[foo] = y ? 10 : 20;
-foo ? x[bar] = 10 : x[bar] = 20;
+var x = !foo && !bar && !baz && !boo ? 10 : 20, y;
+y ? x[foo] = 10 : x[foo] = 20, foo ? x[bar] = 10 : x[bar] = 20;

```

## `terser/drop_unused/issue_1715_1`

- tags: `remove unused`
- size: oxc 68 vs reference 59 (no whitespaces: +9, formatted: +17)

```js
var a = 1;
function f() {
	a++;
	try {
		x();
	} catch (a) {
		var a;
	}
}
f();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,11 @@
 var a = 1;
 function f() {
+	a++;
 	try {
 		x();
-	} catch (a) {}
+	} catch (a) {
+		var a;
+	}
 }
 f();
 console.log(a);

```

## `terser/functions/empty_body`

- tags: `join vars`
- size: oxc 42 vs reference 33 (no whitespaces: +9, formatted: +11)

```js
function f() {
	function noop() {}
	noop();
	return noop;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f() {
-	return function() {};
+	function noop() {}
+	return noop;
 }

```

## `terser/issue_203/compress_new_function_with_destruct`

- size: oxc 108 vs reference 99 (no whitespaces: +9, formatted: +9)

```js
new Function('aa, [bb]', 'return aa;');
new Function('aa, {bb}', 'return aa;');
new Function('[[aa]], [{bb}]', 'return aa;');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-Function('n,[r]', 'return n');
-Function('n,{bb:b}', 'return n');
-Function('[[n]],[{bb:b}]', 'return n');
+Function('aa, [bb]', 'return aa;');
+Function('aa, {bb}', 'return aa;');
+Function('[[aa]], [{bb}]', 'return aa;');

```

## `terser/issue_203/compress_new_function_with_destruct_arrows`

- size: oxc 108 vs reference 99 (no whitespaces: +9, formatted: +9)

```js
new Function('aa, [bb]', 'return aa;');
new Function('aa, {bb}', 'return aa;');
new Function('[[aa]], [{bb}]', 'return aa;');

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-Function('n,[a]', 'return n');
-Function('b,{bb:n}', 'return b');
-Function('[[b]],[{bb:n}]', 'return b');
+Function('aa, [bb]', 'return aa;');
+Function('aa, {bb}', 'return aa;');
+Function('[[aa]], [{bb}]', 'return aa;');

```

## `terser/issue_269/issue_269_1`

- size: oxc 35 vs reference 26 (no whitespaces: +9, formatted: +7)

```js
f(String(x), Number(x), Boolean(x), String(), Number(), Boolean());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-f(x + '', +x, !!x, '', 0, false);
+f(String(x), Number(x), !!x, '', 0, !1);

```

## `terser/object/prop_func_to_async_concise_method`

- size: oxc 52 vs reference 43 (no whitespaces: +9, formatted: +10)

```js
({ run: async function() {
	console.log('PASS');
} }).run();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-({ async run() {
+({ run: async function() {
 	console.log('PASS');
 } }).run();

```

## `terser/properties/join_object_assignments_negative`

- tags: `join vars`
- size: oxc 62 vs reference 53 (no whitespaces: +9, formatted: +10)

```js
var o = {};
o[0] = 0;
o[-0] = 1;
o[-1] = 2;
console.log(o[0], o[-0], o[-1]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-var o = {
-	0: (0, 1),
-	'-1': 2
-};
+var o = {};
+o[0] = 0;
+o[-0] = 1;
+o[-1] = 2;
 console.log(o[0], o[-0], o[-1]);

```

## `terser/reduce_vars/array_forin_1`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 35 (no whitespaces: +9, formatted: +11)

```js
var a = [
	1,
	2,
	3
];
for (var b in a) console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-for (var b in [
+var a = [
 	1,
 	2,
 	3
-]) console.log(b);
+];
+for (var b in a) console.log(b);

```

## `terser/reduce_vars/array_forof_1`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 35 (no whitespaces: +9, formatted: +11)

```js
var a = [
	1,
	2,
	3
];
for (var b of a) console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-for (var b of [
+var a = [
 	1,
 	2,
 	3
-]) console.log(b);
+];
+for (var b of a) console.log(b);

```

## `terser/reduce_vars/issue_1814_1`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 56 (no whitespaces: +9, formatted: +11)

```js
const a = 42;
!(function() {
	var b = a;
	!(function(a) {
		console.log(a++, b);
	})(0);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 const a = 42;
-!function() {
-	var a;
-	a = 0, console.log(a++, 42);
-}();
+(function() {
+	(function(a) {
+		console.log(a++, 42);
+	})(0);
+})();

```

## `terser/reduce_vars/issue_1814_2`

- tags: `join vars`, `remove unused`
- size: oxc 70 vs reference 61 (no whitespaces: +9, formatted: +11)

```js
const a = '32';
!(function() {
	var b = a + 1;
	!(function(a) {
		console.log(b, a++);
	})(0);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 const a = '32';
-!function() {
-	var a;
-	a = 0, console.log('321', a++);
-}();
+(function() {
+	(function(a) {
+		console.log('321', a++);
+	})(0);
+})();

```

## `terser/reduce_vars/issue_1850_4`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 35 (no whitespaces: +9, formatted: +13)

```js
function f() {
	console.log(a, a, a);
}
var a = 1;
f();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-(function() {
-	console.log(1, 1, 1);
-})();
+function f() {
+	console.log(a, a, a);
+}
+var a = 1;
+f();

```

## `terser/reduce_vars/issue_2799_2`

- tags: `join vars`, `remove unused`
- size: oxc 94 vs reference 85 (no whitespaces: +9, formatted: +10)

```js
(function() {
	function foo() {
		Function.prototype.call.apply(console.log, [null, 'PASS']);
	}
	foo();
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 (function() {
-	(function() {
-		(function() {}).call.apply(console.log, [null, 'PASS']);
-	})();
+	function foo() {
+		Function.prototype.call.apply(console.log, [null, 'PASS']);
+	}
+	foo();
 })();

```

## `terser/reduce_vars/issue_3140_2`

- tags: `join vars`, `remove unused`
- size: oxc 159 vs reference 150 (no whitespaces: +9, formatted: +14)

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
		self();
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
@@ -2,12 +2,13 @@
 	var a;
 	function f() {}
 	f.g = function g() {
+		var self = this;
 		function h() {
 			console.log(a ? 'PASS' : 'FAIL');
 		}
-		a = true;
-		this();
-		a = false;
+		a = !0;
+		self();
+		a = !1;
 		h.g = g;
 		return h;
 	};

```

## `terser/reduce_vars/toplevel_on_loops_3`

- tags: `join vars`, `remove unused`
- size: oxc 22 vs reference 13 (no whitespaces: +9, formatted: +13)

```js
var x = 3;
while (x) bar();

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-for (;;) bar();
+var x = 3;
+for (; x;) bar();

```

## `terser/sequences/delete_seq_6`

- size: oxc 31 vs reference 22 (no whitespaces: +9, formatted: +11)

```js
var a;
console.log(delete (1, a));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var a;
-console.log(!0);
+console.log(delete (0, a));

```

## `terser/collapse_vars/double_def_2`

- tags: `join vars`, `remove unused`
- size: oxc 19 vs reference 9 (no whitespaces: +10, formatted: +16)

```js
var a = x, a = a && y;
a();

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-(x && y)();
+var a = x, a = a && y;
+a();

```

## `terser/collapse_vars/issue_2436_11`

- tags: `join vars`, `remove unused`
- size: oxc 337 vs reference 327 (no whitespaces: +10, formatted: +14)

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
@@ -5,8 +5,9 @@
 function f(arg1, arg2) {
 	if (isCollection(arg1)) {
 		var size = arg1, max = arg2, min = 0, res = _randomDataForMatrix(size.valueOf(), min, max, _randomInt);
-		return size && true === size.isMatrix ? matrix(res) : res;
+		return size && !0 === size.isMatrix ? matrix(res) : res;
 	} else {
-		return _randomInt(min = arg1, max = arg2);
+		var min = arg1, max = arg2;
+		return _randomInt(min, max);
 	}
 }

```

## `terser/collapse_vars/issue_2436_12`

- tags: `join vars`, `remove unused`
- size: oxc 129 vs reference 119 (no whitespaces: +10, formatted: +10)

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
@@ -1,5 +1,5 @@
 function isUndefined() {}
 function f() {
 	var modelValue = this.$$lastCommittedViewValue;
-	return isUndefined() ? modelValue : null;
+	return isUndefined(modelValue) ? modelValue : null;
 }

```

## `terser/dead_code/collapse_vars_assignment`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 36 vs reference 26 (no whitespaces: +10, formatted: +16)

```js
function f0(c) {
	var a = 3 / c;
	return a = a;
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f0(c) {
-	return 3 / c;
+	var a = 3 / c;
+	return a = a;
 }

```

## `terser/drop_unused/drop_var`

- tags: `remove unused`
- size: oxc 77 vs reference 67 (no whitespaces: +10, formatted: +11)

```js
var a;
console.log(a, b);
var a = 1, b = 2;
console.log(a, b);
var a = 3;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
+var a;
 console.log(a, b);
 var a = 1, b = 2;
 console.log(a, b);
-a = 3;
+var a = 3;
 console.log(a, b);

```

## `terser/drop_unused/issue_t161_top_retain_7`

- tags: `join vars`, `remove unused`
- size: oxc 47 vs reference 37 (no whitespaces: +10, formatted: +18)

```js
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-var y = 3;
-console.log(2, y, 4, 2 * y, 8, 4 * y);
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z);

```

## `terser/evaluate/unsafe_object_complex`

- tags: `join vars`
- size: oxc 57 vs reference 47 (no whitespaces: +10, formatted: +14)

```js
var o = {
	a: { b: 1 },
	b: 1
};
console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

```diff
--- reference
+++ oxc
@@ -2,4 +2,4 @@
 	a: { b: 1 },
 	b: 1
 };
-console.log(o + 1, o.a + 1, 2, 2);
+console.log(o + 1, o.a + 1, o.b + 1, o.a.b + 1);

```

## `terser/harmony/inline_arrow_using_arguments`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 83 vs reference 73 (no whitespaces: +10, formatted: +20)

```js
(function() {
	((x) => {
		console.log.apply(console, arguments), console.log(x);
	})(4);
})(3, 2, 1);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 (function() {
-	console.log.apply(console, arguments), console.log(4);
+	((x) => {
+		console.log.apply(console, arguments), console.log(x);
+	})(4);
 })(3, 2, 1);

```

## `terser/harmony/issue_2345`

- tags: `remove unused`
- size: oxc 75 vs reference 65 (no whitespaces: +10, formatted: +17)

```js
console.log([...[
	3,
	2,
	1
]].join('-'));
var a = [
	3,
	2,
	1
];
console.log([...a].join('-'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-console.log('3-2-1');
+console.log([
+	3,
+	2,
+	1
+].join('-'));
 var a = [
 	3,
 	2,

```

## `terser/hoist/hoist_no_destructurings`

- size: oxc 45 vs reference 35 (no whitespaces: +10, formatted: +12)

```js
function a([anArg]) {
	bar();
	var var1;
	var anArg;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function a([anArg]) {
+	bar();
 	var var1;
-	bar();
+	var anArg;
 }

```

## `terser/inline/inline_within_extends_2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 315 vs reference 305 (no whitespaces: +10, formatted: +12)

```js
class Baz extends foo(bar(Array)) {
	constructor() {
		super(...arguments);
	}
}
function foo(foo_base) {
	return class extends foo_base {
		constructor() {
			super(...arguments);
		}
		second() {
			return this[1];
		}
	};
}
function bar(bar_base) {
	return class extends bar_base {
		constructor(...args) {
			super(...args);
		}
	};
}
console.log(new Baz(1, 'PASS', 3).second());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,9 @@
-class Baz extends (function(foo_base) {
+class Baz extends foo(bar(Array)) {
+	constructor() {
+		super(...arguments);
+	}
+}
+function foo(foo_base) {
 	return class extends foo_base {
 		constructor() {
 			super(...arguments);
@@ -7,15 +12,12 @@
 			return this[1];
 		}
 	};
-})((function(bar_base) {
+}
+function bar(bar_base) {
 	return class extends bar_base {
 		constructor(...args) {
 			super(...args);
 		}
 	};
-})(Array)) {
-	constructor() {
-		super(...arguments);
-	}
 }
 console.log(new Baz(1, 'PASS', 3).second());

```

## `terser/issue_1588/safe_undefined`

- tags: `sequences`
- size: oxc 96 vs reference 86 (no whitespaces: +10, formatted: +8)

```js
var a, c;
console.log((function(undefined) {
	return function() {
		if (a) return b;
		if (c) return d;
	};
})(1)());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var a, c;
-console.log((function(n) {
+console.log((function(undefined) {
 	return function() {
-		return a ? b : (0, c) ? d : void 0;
+		if (a) return b;
+		if (c) return d;
 	};
 })(1)());

```

## `terser/properties/issue_3188_1`

- tags: `join vars`
- size: oxc 84 vs reference 74 (no whitespaces: +10, formatted: +18)

```js
(function() {
	function f() {
		console.log(this.p);
	}
	(function() {
		var o = {
			p: 'PASS',
			f
		};
		o.f();
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -2,9 +2,10 @@
 	function f() {
 		console.log(this.p);
 	}
-	({
-		p: 'PASS',
-		f
-	}).f();
-	var o;
+	(function() {
+		({
+			p: 'PASS',
+			f
+		}).f();
+	})();
 })();

```

## `terser/properties/issue_3188_3`

- tags: `join vars`
- size: oxc 82 vs reference 72 (no whitespaces: +10, formatted: +15)

```js
(function() {
	function f() {
		console.log(this[0]);
	}
	(function() {
		var o = ['PASS', f];
		o[1]();
	})();
})();

```

```diff
--- reference
+++ oxc
@@ -2,6 +2,7 @@
 	function f() {
 		console.log(this[0]);
 	}
-	['PASS', f][1]();
-	var o;
+	(function() {
+		['PASS', f][1]();
+	})();
 })();

```

## `terser/properties/prop_side_effects_1`

- tags: `join vars`, `remove unused`
- size: oxc 83 vs reference 73 (no whitespaces: +10, formatted: +15)

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
@@ -1,5 +1,6 @@
-console.log(1);
+var C = 1;
+console.log(C);
 var obj = { bar: function() {
-	return 2;
+	return C + C;
 } };
 console.log(obj.bar());

```

## `terser/reduce_vars/accessor_2`

- tags: `join vars`, `remove unused`
- size: oxc 40 vs reference 30 (no whitespaces: +10, formatted: +16)

```js
var A = 1;
var B = { get c() {
	console.log(A);
} };
B.c;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-({ get c() {
-	console.log(1);
-} }).c;
+var A = 1, B = { get c() {
+	console.log(A);
+} };
+B.c;

```

## `terser/reduce_vars/multi_def_3`

- tags: `join vars`
- size: oxc 61 vs reference 51 (no whitespaces: +10, formatted: +16)

```js
function f(a) {
	var b = 2;
	if (a) var b;
	else var b;
	console.log(b + 1);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f(a) {
+	var b = 2;
 	if (a) var b;
 	else var b;
-	console.log(3);
+	console.log(b + 1);
 }

```

## `terser/reduce_vars/unsafe_evaluate_array_2`

- tags: `join vars`
- size: oxc 108 vs reference 98 (no whitespaces: +10, formatted: +10)

```js
var arr = [
	1,
	2,
	function(x) {
		return x * x;
	},
	function(x) {
		return x * x * x;
	}
];
console.log(arr[0], arr[1], arr[2](2), arr[3]);

```

```diff
--- reference
+++ oxc
@@ -8,4 +8,4 @@
 		return x * x * x;
 	}
 ];
-console.log(1, 2, arr[2](2), arr[3]);
+console.log(arr[0], arr[1], arr[2](2), arr[3]);

```

## `terser/template_string/evaluate_nested_templates`

- size: oxc 104 vs reference 94 (no whitespaces: +10, formatted: +10)

```js
var foo = `${`${`${`foo`}`}`}`;
var bar = `before ${`innerBefore ${any} innerAfter`} after`;
var baz = `1 ${2 + `3 ${any} 4` + 5} 6`;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var foo = 'foo';
-var bar = `before innerBefore ${any} innerAfter after`;
-var baz = `1 23 ${any} 45 6`;
+var bar = `before ${`innerBefore ${any} innerAfter`} after`;
+var baz = `1 ${`23 ${any} 45`} 6`;

```

## `terser/template_string/tagged_template_function_inline_1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 25 vs reference 15 (no whitespaces: +10, formatted: +13)

```js
var tpl = () => {};
tpl`test`;

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-(() => {})`test`;
+var tpl = () => {};
+tpl`test`;

```

## `terser/dead_code/dead_code_2_should_warn_strict`

- size: oxc 64 vs reference 53 (no whitespaces: +11, formatted: +17)

```js
'use strict';
function f() {
	g();
	x = 10;
	throw new Error('foo');
	if (x) {
		y();
		var x;
		function g() {}
		(function() {
			var q;
			function y() {}
		})();
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 'use strict';
 function f() {
 	g();
+	x = 10;
 	throw Error('foo');
+	var x;
 }
 f();

```

## `terser/evaluate/issue_2919`

- size: oxc 39 vs reference 28 (no whitespaces: +11, formatted: +12)

```js
console.log([function() {}].toString());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('function(){}');
+console.log([function() {}].toString());

```

## `terser/evaluate/negative_zero`

- size: oxc 39 vs reference 28 (no whitespaces: +11, formatted: +9)

```js
console.log(-'', - -'', 1 / -0, 1 / -'');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(-0, 0, -1 / 0, -1 / 0);
+console.log(-'', - -'', -Infinity, 1 / -'');

```

## `terser/functions/unsafe_call_2`

- tags: `join vars`
- size: oxc 138 vs reference 127 (no whitespaces: +11, formatted: +12)

```js
function foo() {
	console.log(a, b);
}
var bar = (function(a, b) {
	console.log(this, a, b);
})(function() {
	foo.call('foo', 'bar');
	bar.call('foo', 'bar');
})();

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 var bar = (function(a, b) {
 	console.log(this, a, b);
 })(function() {
-	foo('bar');
+	foo.call('foo', 'bar');
 	bar.call('foo', 'bar');
 })();

```

## `terser/issue_1443/keep_fnames`

- tags: `mangle`, `keep function names`, `keep class names`, `sequences`
- size: oxc 86 vs reference 75 (no whitespaces: +11, formatted: +10)

```js
function f(undefined) {
	return function() {
		function n(a) {
			return a * a;
		}
		if (a) return b;
		if (c) return d;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-function f(r) {
+function f(e) {
 	return function() {
-		function n(r) {
-			return r * r;
+		function n(e) {
+			return e * e;
 		}
-		return a ? b : c ? d : r;
+		if (a) return b;
+		if (c) return d;
 	};
 }

```

## `terser/issue_t120/issue_t120_5`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 65 vs reference 54 (no whitespaces: +11, formatted: +21)

```js
for (var x = 1, t = (o) => {
	var i = +o;
	return console.log(i + i) && 0;
}; x--;) t(3);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-for (var x = 1; x--;) i = void 0, i = +3, console.log(i + i);
-var i;
+for (var x = 1, t = (o) => {
+	var i = +o;
+	return console.log(i + i) && 0;
+}; x--;) t(3);

```

## `terser/properties/issue_2208_8`

- size: oxc 83 vs reference 72 (no whitespaces: +11, formatted: +15)

```js
console.log({ *p() {
	return x();
} }.p());
console.log({ async p() {
	return await x();
} }.p());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 console.log({ *p() {
 	return x();
 } }.p());
-console.log((async () => await x())());
+console.log({ async p() {
+	return await x();
+} }.p());

```

## `terser/properties/join_object_assignments_NaN_2`

- tags: `join vars`
- size: oxc 54 vs reference 43 (no whitespaces: +11, formatted: +13)

```js
var o = {};
o[NaN] = 1;
o[0 / 0] = 2;
console.log(o[NaN], o[NaN]);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-var o = { NaN: (1, 2) };
-console.log(o.NaN, o.NaN);
+var o = {};
+o[NaN] = 1;
+o[NaN] = 2;
+console.log(o[NaN], o[NaN]);

```

## `terser/reduce_vars/var_assign_5`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 61 vs reference 50 (no whitespaces: +11, formatted: +14)

```js
!(function() {
	var a;
	!(function(b) {
		a = 2;
		console.log(a, b);
	})(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-!function() {
+(function() {
 	var a;
-	var b;
-	b = a, console.log(a = 2, b);
-}();
+	(function(b) {
+		a = 2, console.log(a, b);
+	})(a);
+})();

```

## `terser/regexp/regexp_2`

- size: oxc 81 vs reference 70 (no whitespaces: +11, formatted: +12)

```js
console.log(JSON.stringify('COMPASS? Overpass.'.match(new RegExp('([Sap]+)', 'ig'))));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(JSON.stringify('COMPASS? Overpass.'.match(/([Sap]+)/gi)));
+console.log(JSON.stringify('COMPASS? Overpass.'.match(RegExp('([Sap]+)', 'ig'))));

```

## `terser/collapse_vars/cascade_call`

- tags: `join vars`, `remove unused`
- size: oxc 41 vs reference 29 (no whitespaces: +12, formatted: +17)

```js
function f(a) {
	var b;
	return x((b = a, y(b)));
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f(a) {
-	return x(y(a));
+	var b;
+	return x((b = a, y(b)));
 }

```

## `terser/collapse_vars/collapse_vars_lvalues_drop_assign`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 398 vs reference 386 (no whitespaces: +12, formatted: +20)

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
@@ -33,5 +33,7 @@
 	return e1(), x - (e2() - x);
 }
 function f9(x) {
-	return e1(), e2() - x - x;
+	e1();
+	var v = e2(), b = x;
+	return v - x - b;
 }

```

## `terser/collapse_vars/collapse_vars_seq`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 80 vs reference 68 (no whitespaces: +12, formatted: +20)

```js
var f1 = function(x, y) {
	var a, b, r = x + y, q = r * r, z = q - r;
	a = z, b = 7;
	return a + b;
};
console.log(f1(1, 2));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var f1 = function(x, y) {
-	var r = x + y;
-	return r * r - r + 7;
+	var a, b, r = x + y;
+	return a = r * r - r, b = 7, a + b;
 };
 console.log(f1(1, 2));

```

## `terser/collapse_vars/collapse_vars_throw`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 94 vs reference 82 (no whitespaces: +12, formatted: +20)

```js
var f1 = function(x, y) {
	var a, b, r = x + y, q = r * r, z = q - r;
	a = z, b = 7;
	throw a + b;
};
try {
	f1(1, 2);
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 var f1 = function(x, y) {
-	var r = x + y;
-	throw r * r - r + 7;
+	var a, b, r = x + y;
+	throw a = r * r - r, b = 7, a + b;
 };
 try {
 	f1(1, 2);

```

## `terser/collapse_vars/collapse_vars_unary`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 211 vs reference 199 (no whitespaces: +12, formatted: +15)

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
	var k = 7;
	return k--;
}
function f3(n) {
	var k = 7;
	return ++k;
}
function f4(n) {
	var k = 8 - n;
	return k--;
}
function f5(n) {
	var k = 9 - n;
	return ++k;
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f0(o, p) {
-	return o[p], !1;
+	var x = o[p];
+	return delete x;
 }
 function f1(n) {
 	return n > +!!n;

```

## `terser/collapse_vars/cond_branch_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 211 vs reference 199 (no whitespaces: +12, formatted: +17)

```js
function f1(b, c) {
	var log = console.log;
	var a = ++c;
	if (b) b += a;
	log(a, b);
}
function f2(b, c) {
	var log = console.log;
	var a = ++c;
	b && (b += a);
	log(a, b);
}
function f3(b, c) {
	var log = console.log;
	var a = ++c;
	b ? b += a : b--;
	log(a, b);
}
f1(1, 2);
f2(3, 4);
f3(5, 6);

```

```diff
--- reference
+++ oxc
@@ -1,14 +1,13 @@
 function f1(b, c) {
-	var a = ++c;
-	if (b) b += a;
-	(0, console.log)(a, b);
+	var log = console.log, a = ++c;
+	b && (b += a), log(a, b);
 }
 function f2(b, c) {
-	var a = ++c;
-	b && (b += a), (0, console.log)(a, b);
+	var log = console.log, a = ++c;
+	b && (b += a), log(a, b);
 }
 function f3(b, c) {
-	var a = ++c;
-	b ? b += a : b--, (0, console.log)(a, b);
+	var log = console.log, a = ++c;
+	b ? b += a : b--, log(a, b);
 }
 f1(1, 2), f2(3, 4), f3(5, 6);

```

## `terser/collapse_vars/conditional_2`

- tags: `join vars`, `remove unused`
- size: oxc 72 vs reference 60 (no whitespaces: +12, formatted: +19)

```js
function f(a, b) {
	var c = a + 1, d = a + 2;
	return b ? c : d;
}
console.log(f(3, 0), f(4, 1));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function f(a, b) {
-	return b ? a + 1 : a + 2;
+	var c = a + 1, d = a + 2;
+	return b ? c : d;
 }
 console.log(f(3, 0), f(4, 1));

```

## `terser/collapse_vars/issue_2436_10`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 111 vs reference 99 (no whitespaces: +12, formatted: +18)

```js
var o = {
	a: 1,
	b: 2
};
function f(n) {
	o = { b: 3 };
	return n;
}
console.log((function(c) {
	return [
		c.a,
		f(c.b),
		c.b
	];
})(o).join(' '));

```

```diff
--- reference
+++ oxc
@@ -6,9 +6,10 @@
 	o = { b: 3 };
 	return n;
 }
-console.log((c = o, [
-	c.a,
-	f(c.b),
-	c.b
-]).join(' '));
-var c;
+console.log((function(c) {
+	return [
+		c.a,
+		f(c.b),
+		c.b
+	];
+})(o).join(' '));

```

## `terser/conditionals/cond_2`

- tags: `sequences`
- size: oxc 83 vs reference 71 (no whitespaces: +12, formatted: +12)

```js
function foo(x, FooBar, some_condition) {
	if (some_condition) {
		x = new FooBar(1);
	} else {
		x = new FooBar(2);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 function foo(x, FooBar, some_condition) {
-	x = new FooBar(some_condition ? 1 : 2);
+	x = some_condition ? new FooBar(1) : new FooBar(2);
 }

```

## `terser/conditionals/issue_2535_2`

- tags: `sequences`
- size: oxc 411 vs reference 399 (no whitespaces: +12, formatted: +20)

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
@@ -2,19 +2,4 @@
 function y() {
 	return 'foo';
 }
-console.log(x() || !0);
-console.log(y() || !0);
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
-console.log(y() && !1);
+console.log(x() || !0), console.log(y() || !0), console.log((x(), y())), console.log((y(), x())), console.log(x() && !0 || y()), console.log(y() && !0 || x()), console.log(x() && y()), console.log(y() && x()), console.log(x() || y()), console.log(y() || x()), console.log((x() || !1) && y()), console.log((y() || !1) && x()), console.log((x(), y())), console.log((y(), x())), console.log(x() && !1), console.log(y() && !1);

```

## `terser/destructuring/export_unreferenced_declarations_2`

- tags: `type:module`, `remove unused`, `pure getters`
- size: oxc 95 vs reference 83 (no whitespaces: +12, formatted: +17)

```js
var { unused } = obj;
export const [{ a, b = 1 }] = obj;
export let [[{ c, d = 2 }]] = obj;
export var [, [{ e, f = 3 }]] = obj;

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-obj;
+var { unused } = obj;
 export const [{ a, b = 1 }] = obj;
 export let [[{ c, d = 2 }]] = obj;
 export var [, [{ e, f = 3 }]] = obj;

```

## `terser/destructuring/unused_destructuring_decl_2`

- tags: `remove unused`, `pure getters`
- size: oxc 130 vs reference 118 (no whitespaces: +12, formatted: +12)

```js
const { a, b: c, d = new Object(1) } = { b: 7 };
let { e, f: g, h = new Object(2) } = { e: 8 };
var { w, x: y, z = new Object(3) } = {
	w: 4,
	x: 5,
	y: 6
};
console.log(c, e, z + 0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-const { a, b: c, d = Object(1) } = { b: 7 };
-let { e, f: g, h = Object(2) } = { e: 8 };
-var { w, x: y, z = Object(3) } = {
+const { a, b: c, d = new Object(1) } = { b: 7 };
+let { e, f: g, h = new Object(2) } = { e: 8 };
+var { w, x: y, z = new Object(3) } = {
 	w: 4,
 	x: 5,
 	y: 6

```

## `terser/destructuring/unused_destructuring_decl_3`

- tags: `remove unused`
- size: oxc 130 vs reference 118 (no whitespaces: +12, formatted: +12)

```js
const { a, b: c, d = new Object(1) } = { b: 7 };
let { e, f: g, h = new Object(2) } = { e: 8 };
var { w, x: y, z = new Object(3) } = {
	w: 4,
	x: 5,
	y: 6
};
console.log(c, e, z + 0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-const { a, b: c, d = Object(1) } = { b: 7 };
-let { e, f: g, h = Object(2) } = { e: 8 };
-var { w, x: y, z = Object(3) } = {
+const { a, b: c, d = new Object(1) } = { b: 7 };
+let { e, f: g, h = new Object(2) } = { e: 8 };
+var { w, x: y, z = new Object(3) } = {
 	w: 4,
 	x: 5,
 	y: 6

```

## `terser/destructuring/unused_destructuring_decl_4`

- tags: `pure getters`
- size: oxc 130 vs reference 118 (no whitespaces: +12, formatted: +12)

```js
const { a, b: c, d = new Object(1) } = { b: 7 };
let { e, f: g, h = new Object(2) } = { e: 8 };
var { w, x: y, z = new Object(3) } = {
	w: 4,
	x: 5,
	y: 6
};
console.log(c, e, z + 0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-const { a, b: c, d = Object(1) } = { b: 7 };
-let { e, f: g, h = Object(2) } = { e: 8 };
-var { w, x: y, z = Object(3) } = {
+const { a, b: c, d = new Object(1) } = { b: 7 };
+let { e, f: g, h = new Object(2) } = { e: 8 };
+var { w, x: y, z = new Object(3) } = {
 	w: 4,
 	x: 5,
 	y: 6

```

## `terser/drop_unused/cascade_drop_assign`

- tags: `join vars`, `remove unused`
- size: oxc 32 vs reference 20 (no whitespaces: +12, formatted: +18)

```js
var a, b = a = 'PASS';
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('PASS');
+var a, b = a = 'PASS';
+console.log(b);

```

## `terser/drop_unused/drop_toplevel_vars_retain`

- tags: `remove unused`
- size: oxc 100 vs reference 88 (no whitespaces: +12, formatted: +22)

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
@@ -1,10 +1,10 @@
-var a;
+var a, b = 1, c = g;
 function f(d) {
 	return function() {
-		2;
+		c = 2;
 	};
 }
 a = 2;
 function g() {}
 function h() {}
-console.log(3);
+console.log(b = 3);

```

## `terser/functions/issue_2620_3`

- tags: `join vars`, `remove unused`
- size: oxc 129 vs reference 117 (no whitespaces: +12, formatted: +27)

```js
var c = 'FAIL';
(function() {
	function f(a, NaN) {
		function g() {
			switch (a) {
				case a: break;
				case c = 'PASS', NaN: break;
			}
		}
		g();
	}
	f(0 / 0);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,14 @@
 var c = 'FAIL';
-!(function(a, NaN) {
-	(function() {
-		switch (a) {
-			case a: break;
-			case c = 'PASS', NaN: break;
+(function() {
+	function f(a, NaN) {
+		function g() {
+			switch (a) {
+				case a: break;
+				case c = 'PASS', NaN:
+			}
 		}
-	})();
-})(NaN);
+		g();
+	}
+	f(NaN);
+})();
 console.log(c);

```

## `terser/functions/issue_3016_3`

- size: oxc 82 vs reference 70 (no whitespaces: +12, formatted: +14)

```js
var b = 1;
do {
	console.log((function() {
		return a ? 'FAIL' : a = 'PASS';
		try {
			a = 2;
		} catch (a) {
			var a;
		}
	})());
} while (b--);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var b = 1;
-do {
-	console.log((a = void 0, a ? 'FAIL' : a = 'PASS'));
-} while (b--);
-var a;
+do
+	console.log((function() {
+		return a ? 'FAIL' : a = 'PASS';
+		var a;
+	})());
+while (b--);

```

## `terser/functions/issue_3076`

- tags: `sequences`, `remove unused`
- size: oxc 132 vs reference 120 (no whitespaces: +12, formatted: +15)

```js
var c = 'PASS';
(function(b) {
	var n = 2;
	while (--b + (function() {
		e && (c = 'FAIL');
		e = 5;
		return 1;
		try {
			var a = 5;
		} catch (e) {
			var e;
		}
	})().toString() && --n > 0);
})(2);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var c = 'PASS';
 (function(b) {
-	var n = 2;
-	while (--b + (e = void 0, e && (c = 'FAIL'), e = 5, 1).toString() && --n > 0);
-	var e;
+	for (var n = 2; --b + (function() {
+		return e && (c = 'FAIL'), e = 5, 1;
+		var e;
+	})().toString() && --n > 0;);
 })(2), console.log(c);

```

## `terser/functions/issue_3166`

- size: oxc 49 vs reference 37 (no whitespaces: +12, formatted: +15)

```js
'foo';
'use strict';
function f() {
	'use strict';
	'bar';
	'use asm';
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
+'foo';
 'use strict';
 function f() {
+	'bar';
 	'use asm';
 }

```

## `terser/global_defs/issue_1801`

- size: oxc 28 vs reference 16 (no whitespaces: +12, formatted: +12)

```js
console.log(CONFIG.FOO.BAR);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(!0);
+console.log(CONFIG.FOO.BAR);

```

## `terser/global_defs/mixed`

- size: oxc 201 vs reference 189 (no whitespaces: +12, formatted: +12)

```js
const FOO = { BAR: 0 };
console.log(FOO.BAR);
console.log(++CONFIG.DEBUG);
console.log(++CONFIG.VALUE);
console.log(++CONFIG['VAL' + 'UE']);
console.log(++DEBUG[CONFIG.VALUE]);
CONFIG.VALUE.FOO = 'bar';
console.log(CONFIG);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 const FOO = { BAR: 0 };
-console.log('moo');
+console.log(FOO.BAR);
 console.log(++CONFIG.DEBUG);
 console.log(++CONFIG.VALUE);
 console.log(++CONFIG.VALUE);
-console.log(++DEBUG[42]);
+console.log(++DEBUG[CONFIG.VALUE]);
 CONFIG.VALUE.FOO = 'bar';
 console.log(CONFIG);

```

## `terser/harmony/class_name_can_be_mangled`

- size: oxc 58 vs reference 46 (no whitespaces: +12, formatted: +12)

```js
function x() {
	class Foo {}
	var class1 = Foo;
	var class2 = class Bar {};
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function x() {
-	class a {}
-	var s = a;
-	var c = class a {};
+	class Foo {}
+	var class1 = Foo;
+	var class2 = class {};
 }

```

## `terser/hoist_props/single_use`

- tags: `join vars`, `remove unused`
- size: oxc 59 vs reference 47 (no whitespaces: +12, formatted: +15)

```js
var obj = { bar: function() {
	return 42;
} };
console.log(obj.bar());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log({ bar: function() {
+var obj = { bar: function() {
 	return 42;
-} }.bar());
+} };
+console.log(obj.bar());

```

## `terser/identity/inline_identity_dont_lose_this_when_arg`

- tags: `join vars`
- size: oxc 67 vs reference 55 (no whitespaces: +12, formatted: +19)

```js
'use strict';
const id = (x) => x;
const func_bag = { leak };
leak(id(func_bag.leak));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 'use strict';
-const func_bag = { leak };
-leak(func_bag.leak);
+const id = (x) => x, func_bag = { leak };
+leak(id(func_bag.leak));

```

## `terser/issue_1052/defun_else_if_return`

- size: oxc 78 vs reference 66 (no whitespaces: +12, formatted: +14)

```js
function e() {
	function f() {}
	if (window) function g() {}
	else return;
	function h() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function e() {
 	function f() {}
 	if (window) function g() {}
+	else return;
 	function h() {}
 }

```

## `terser/issue_1052/defun_hoist_funs`

- size: oxc 78 vs reference 66 (no whitespaces: +12, formatted: +14)

```js
function e() {
	function f() {}
	if (!window) return;
	else function g() {}
	function h() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function e() {
 	function f() {}
-	function h() {}
 	if (window) function g() {}
+	else return;
+	function h() {}
 }

```

## `terser/issue_1052/defun_if_return`

- size: oxc 78 vs reference 66 (no whitespaces: +12, formatted: +14)

```js
function e() {
	function f() {}
	if (!window) return;
	else function g() {}
	function h() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function e() {
 	function f() {}
 	if (window) function g() {}
+	else return;
 	function h() {}
 }

```

## `terser/issue_t120/issue_t120_3`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 58 vs reference 46 (no whitespaces: +12, formatted: +20)

```js
for (var t = (o) => {
	var i = +o;
	return console.log(i + i) && 0;
}; t(1););

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-for (; i = void 0, i = +1, console.log(i + i), 0;);
-var i;
+for (var t = (o) => {
+	var i = +o;
+	return console.log(i + i) && 0;
+}; t(1););

```

## `terser/logical_assignment/assign_in_conditional_part`

- tags: `join vars`, `remove unused`
- size: oxc 144 vs reference 132 (no whitespaces: +12, formatted: +15)

```js
var status = 'PASS';
var nil = null;
var nil_prop = { prop: null };
nil &&= console.log(status = 'FAIL');
nil_prop.prop &&= console.log(status = 'FAIL');
console.log(status);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,4 @@
-var status = 'PASS';
-var nil = null;
+var status = 'PASS', nil = null, nil_prop = { prop: null };
 nil &&= console.log(status = 'FAIL');
-({ prop: null }).prop &&= console.log(status = 'FAIL');
+nil_prop.prop &&= console.log(status = 'FAIL');
 console.log(status);

```

## `terser/loops/issue_2740_6`

- size: oxc 54 vs reference 42 (no whitespaces: +12, formatted: +15)

```js
const a = 9, b = 0;
for (const a = 1; a < 3; ++b) break;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 const a = 9, b = 0;
-const a1 = 1;
-console.log(a, b);
+for (let a = 1;; ++b) break;
+console.log(9, b);

```

## `terser/loops/issue_2740_7`

- size: oxc 52 vs reference 40 (no whitespaces: +12, formatted: +15)

```js
let a = 9, b = 0;
for (const a = 1; a < 3; ++b) break;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 let a = 9, b = 0;
-const a1 = 1;
-console.log(a, b);
+for (let a = 1;; ++b) break;
+console.log(9, b);

```

## `terser/loops/issue_2740_8`

- size: oxc 52 vs reference 40 (no whitespaces: +12, formatted: +15)

```js
var a = 9, b = 0;
for (const a = 1; a < 3; ++b) break;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var a = 9, b = 0;
-const a1 = 1;
+for (let a = 1;; ++b) break;
 console.log(a, b);

```

## `terser/properties/issue_2208_6`

- size: oxc 28 vs reference 16 (no whitespaces: +12, formatted: +17)

```js
console.log({ p: () => 42 }.p());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(42);
+console.log({ p: () => 42 }.p());

```

## `terser/properties/issue_2208_9`

- size: oxc 60 vs reference 48 (no whitespaces: +12, formatted: +17)

```js
a = 42;
console.log({ p: () => (function() {
	return this.a;
})() }.p());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 a = 42;
-console.log((function() {
+console.log({ p: () => (function() {
 	return this.a;
-})());
+})() }.p());

```

## `terser/pure_funcs/issue_2629_5`

- size: oxc 24 vs reference 12 (no whitespaces: +12, formatted: +15)

```js
[x()];
[x(), y()];
[
	w(),
	x(),
	y()
];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-y();
-w(), y();
+x();
+x(), y();
+w(), x(), y();

```

## `terser/pure_funcs/issue_2705_4`

- size: oxc 24 vs reference 12 (no whitespaces: +12, formatted: +18)

```js
new x(), y();
w(), new x(), y();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-y();
-w(), y();
+new x(), y();
+w(), new x(), y();

```

## `terser/reduce_vars/method_2`

- tags: `join vars`, `remove unused`
- size: oxc 49 vs reference 37 (no whitespaces: +12, formatted: +18)

```js
var A = 1;
var B = class {
	c() {
		console.log(A);
	}
};
new B().c();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-new class {
+var A = 1, B = class {
 	c() {
-		console.log(1);
+		console.log(A);
 	}
-}().c();
+};
+new B().c();

```

## `terser/reduce_vars/unsafe_evaluate_object_2`

- tags: `join vars`
- size: oxc 136 vs reference 124 (no whitespaces: +12, formatted: +12)

```js
var obj = {
	foo: 1,
	bar: 2,
	square: function(x) {
		return x * x;
	},
	cube: function(x) {
		return x * x * x;
	}
};
console.log(obj.foo, obj.bar, obj.square(2), obj.cube);

```

```diff
--- reference
+++ oxc
@@ -8,4 +8,4 @@
 		return x * x * x;
 	}
 };
-console.log(1, 2, obj.square(2), obj.cube);
+console.log(obj.foo, obj.bar, obj.square(2), obj.cube);

```

## `terser/switch/issue_1680_2`

- size: oxc 99 vs reference 87 (no whitespaces: +12, formatted: +18)

```js
var a = 100, b = 10;
switch (b) {
	case a--: break;
	case b:
		var c;
		break;
	case a: break;
	case a--: break;
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 var a = 100, b = 10;
 switch (b) {
 	case a--: break;
-	case b: var c;
-	case a:
+	case b:
+		var c;
+		break;
+	case a: break;
 	case a--:
 }
 console.log(a, b);

```

## `terser/template_string/regex_2`

- size: oxc 42 vs reference 30 (no whitespaces: +12, formatted: +12)

```js
console.log(`${/a/} ${6 / 2} ${/b/.test('b')} ${1 ? /c/ : /d/}`);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('/a/ 3 true /c/');
+console.log(`/a/ 3 ${/b/.test('b')} /c/`);

```

## `terser/conditionals/hoist_decl`

- tags: `join vars`, `sequences`
- size: oxc 33 vs reference 20 (no whitespaces: +13, formatted: +23)

```js
if (x()) {
	var a;
	y();
} else {
	z();
	var b;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,7 @@
-var a, b;
-x() ? y() : z();
+if (x()) {
+	var a;
+	y();
+} else {
+	z();
+	var b;
+}

```

## `terser/drop_unused/issue_2163`

- tags: `pure functions`
- size: oxc 23 vs reference 10 (no whitespaces: +13, formatted: +14)

```js
var c;
f(...a);
pure(b, ...c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var c;
-a;
-b;
+f(...a);
+b, [...c];

```

## `terser/functions/drop_lone_use_strict`

- size: oxc 71 vs reference 58 (no whitespaces: +13, formatted: +16)

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
@@ -1,4 +1,6 @@
-function f1() {}
+function f1() {
+	'use strict';
+}
 function f2() {
 	'use strict';
 	function f3() {}

```

## `terser/functions/issue_2476`

- tags: `join vars`, `remove unused`
- size: oxc 107 vs reference 94 (no whitespaces: +13, formatted: +6)

```js
function foo(x, y, z) {
	return x < y ? x * y + z : x * z - y;
}
for (var sum = 0, i = 0; i < 10; i++) sum += foo(i, i + 1, 3 * i);
console.log(sum);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
-for (var sum = 0, i = 0; i < 10; i++) {
-	var x, y, z;
-	sum += (x = i, y = i + 1, z = 3 * i, x < y ? x * y + z : x * z - y);
+function foo(x, y, z) {
+	return x < y ? x * y + z : x * z - y;
 }
+for (var sum = 0, i = 0; i < 10; i++) sum += foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `terser/harmony/array_literal_with_spread_2a`

- size: oxc 128 vs reference 115 (no whitespaces: +13, formatted: +24)

```js
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
]['length']);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][0]);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][1]);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][2]);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][3]);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][4]);
console.log([
	10,
	...[],
	20,
	...[30, 40],
	50
][5]);

```

```diff
--- reference
+++ oxc
@@ -4,4 +4,10 @@
 console.log(30);
 console.log(40);
 console.log(50);
-console.log(void 0);
+console.log([
+	10,
+	20,
+	30,
+	40,
+	50
+][5]);

```

## `terser/reduce_vars/escape_local_conditional`

- tags: `join vars`, `remove unused`
- size: oxc 166 vs reference 153 (no whitespaces: +13, formatted: +18)

```js
function main() {
	var thing = baz();
	if (thing !== (thing = baz())) console.log('PASS');
	else console.log('FAIL');
}
function baz(s) {
	function foo() {}
	function bar() {}
	return s ? foo : bar;
}
main();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
+function main() {
+	var thing = baz();
+	thing === (thing = baz()) ? console.log('FAIL') : console.log('PASS');
+}
 function baz(s) {
-	return s ? function() {} : function() {};
+	function foo() {}
+	function bar() {}
+	return s ? foo : bar;
 }
-(function() {
-	var thing = baz();
-	if (thing !== (thing = baz())) console.log('PASS');
-	else console.log('FAIL');
-})();
+main();

```

## `terser/reduce_vars/issue_2449`

- tags: `join vars`, `remove unused`, `10 iterations`
- size: oxc 111 vs reference 98 (no whitespaces: +13, formatted: +11)

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
@@ -1,8 +1,11 @@
+var a = 'PASS';
+function f() {
+	return a;
+}
+function g() {
+	return f();
+}
 (function() {
 	var a = 'FAIL';
-	if (a == a) console.log(function() {
-		return function() {
-			return 'PASS';
-		}();
-	}());
+	a == a && console.log(g());
 })();

```

## `terser/reduce_vars/issue_2496`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 195 vs reference 182 (no whitespaces: +13, formatted: +10)

```js
function execute(callback) {
	callback();
}
class Foo {
	constructor(message) {
		this.message = message;
	}
	go() {
		this.message = 'PASS';
		console.log(this.message);
	}
	run() {
		execute(() => {
			this.go();
		});
	}
}
new Foo('FAIL').run();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
+function execute(callback) {
+	callback();
+}
 class Foo {
 	constructor(message) {
 		this.message = message;
@@ -7,9 +10,7 @@
 		console.log(this.message);
 	}
 	run() {
-		(function(callback) {
-			callback();
-		})(() => {
+		execute(() => {
 			this.go();
 		});
 	}

```

## `terser/sequences/issue_1758`

- tags: `sequences`
- size: oxc 90 vs reference 77 (no whitespaces: +13, formatted: +15)

```js
console.log((function(c) {
	var undefined = 42;
	return (function() {
		c--;
		c--, c.toString();
		return;
	})();
})());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(function(c) {
-	return function() {
+console.log((function(c) {
+	var undefined = 42;
+	return (function() {
 		c--, c--, c.toString();
-		return;
-	}();
-}());
+	})();
+})());

```

## `terser/transform/label_if_break`

- tags: `sequences`
- size: oxc 13 vs reference 0 (no whitespaces: +13, formatted: +21)

```js
L: if (true) {
	a;
	break L;
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+L: {
+	a;
+	break L;
+}

```

## `terser/arrays/for_loop`

- tags: `join vars`, `remove unused`
- size: oxc 262 vs reference 248 (no whitespaces: +14, formatted: +15)

```js
function f0() {
	var a = [
		1,
		2,
		3
	];
	var b = 0;
	for (var i = 0; i < a.length; i++) b += a[i];
	return b;
}
function f1() {
	var a = [
		1,
		2,
		3
	];
	var b = 0;
	for (var i = 0, len = a.length; i < len; i++) b += a[i];
	return b;
}
function f2() {
	var a = [
		1,
		2,
		3
	];
	for (var i = 0; i < a.length; i++) a[i]++;
	return a[2];
}
console.log(f0(), f1(), f2());

```

```diff
--- reference
+++ oxc
@@ -3,9 +3,8 @@
 		1,
 		2,
 		3
-	];
-	var b = 0;
-	for (var i = 0; i < 3; i++) b += a[i];
+	], b = 0;
+	for (var i = 0; i < a.length; i++) b += a[i];
 	return b;
 }
 function f1() {
@@ -13,9 +12,8 @@
 		1,
 		2,
 		3
-	];
-	var b = 0;
-	for (var i = 0; i < 3; i++) b += a[i];
+	], b = 0;
+	for (var i = 0, len = a.length; i < len; i++) b += a[i];
 	return b;
 }
 function f2() {

```

## `terser/collapse_vars/issue_2436_8`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 37 (no whitespaces: +14, formatted: +20)

```js
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-var c;
-console.log({
-	x: (c = o).a,
-	y: c.b
-});
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(o));

```

## `terser/conditionals/cond_9`

- tags: `sequences`
- size: oxc 199 vs reference 185 (no whitespaces: +14, formatted: +8)

```js
function f(x, y) {
	g() ? x(1) : x(2);
	x ? (y || x)() : (y || x)();
	x ? y(a, b) : y(d, b, c);
	x ? y(a, b, c) : y(a, b, c);
	x ? y(a, b, c) : y(a, b, f);
	x ? y(a, b, c) : y(a, e, c);
	x ? y(a, b, c) : y(a, e, f);
	x ? y(a, b, c) : y(d, b, c);
	x ? y(a, b, c) : y(d, b, f);
	x ? y(a, b, c) : y(d, e, c);
	x ? y(a, b, c) : y(d, e, f);
}

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,3 @@
 function f(x, y) {
-	g() ? x(1) : x(2);
-	(y || x)();
-	x ? y(a, b) : y(d, b, c);
-	y(a, b, c);
-	y(a, b, x ? c : f);
-	y(a, x ? b : e, c);
-	x ? y(a, b, c) : y(a, e, f);
-	y(x ? a : d, b, c);
-	x ? y(a, b, c) : y(d, b, f);
-	x ? y(a, b, c) : y(d, e, c);
-	x ? y(a, b, c) : y(d, e, f);
+	g() ? x(1) : x(2), (y || x)(), x ? y(a, b) : y(d, b, c), y(a, b, c), x ? y(a, b, c) : y(a, b, f), x ? y(a, b, c) : y(a, e, c), x ? y(a, b, c) : y(a, e, f), y(x ? a : d, b, c), x ? y(a, b, c) : y(d, b, f), x ? y(a, b, c) : y(d, e, c), x ? y(a, b, c) : y(d, e, f);
 }

```

## `terser/dead_code/global_fns`

- size: oxc 150 vs reference 136 (no whitespaces: +14, formatted: +16)

```js
Boolean(1, 2);
decodeURI(1, 2);
decodeURIComponent(1, 2);
Date(1, 2);
encodeURI(1, 2);
encodeURIComponent(1, 2);
Error(1, 2);
escape(1, 2);
EvalError(1, 2);
isFinite(1, 2);
isNaN(1, 2);
Number(1, 2);
Object(1, 2);
parseFloat(1, 2);
parseInt(1, 2);
RangeError(1, 2);
ReferenceError(1, 2);
String(1, 2);
SyntaxError(1, 2);
TypeError(1, 2);
unescape(1, 2);
URIError(1, 2);
try {
	Function(1, 2);
} catch (e) {
	console.log(e.name);
}
try {
	RegExp(1, 2);
} catch (e) {
	console.log(e.name);
}
try {
	Array(NaN);
} catch (e) {
	console.log(e.name);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
+unescape(1, 2);
 try {
 	Function(1, 2);
 } catch (e) {

```

## `terser/dead_code/issue_2749`

- tags: `remove unused`
- size: oxc 86 vs reference 72 (no whitespaces: +14, formatted: +18)

```js
var a = 2, c = 'PASS';
while (a--) (function() {
	return b ? c = 'FAIL' : b = 1;
	try {} catch (b) {
		var b;
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 var a = 2, c = 'PASS';
-while (a--) b = void 0, b ? c = 'FAIL' : b = 1;
-var b;
+for (; a--;) (function() {
+	return b ? c = 'FAIL' : b = 1;
+	var b;
+})();
 console.log(c);

```

## `terser/destructuring/destructuring_with_undefined_as_default_assignment`

- size: oxc 34 vs reference 20 (no whitespaces: +14, formatted: +18)

```js
[foo = undefined] = bar;
[foo = void 0] = bar;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-[foo] = bar;
-[foo] = bar;
+[foo = void 0] = bar;
+[foo = void 0] = bar;

```

## `terser/drop_unused/drop_toplevel_funcs_retain`

- tags: `remove unused`
- size: oxc 100 vs reference 86 (no whitespaces: +14, formatted: +16)

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
@@ -6,4 +6,5 @@
 }
 a = 2;
 function g() {}
+function h() {}
 console.log(b = 3);

```

## `terser/drop_unused/unused_circular_references_2`

- tags: `remove unused`
- size: oxc 47 vs reference 33 (no whitespaces: +14, formatted: +20)

```js
function f(x, y) {
	var foo = 1, bar = baz, baz = foo + bar, qwe = moo();
	return x + y;
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 function f(x, y) {
+	var baz = 1 + baz;
 	moo();
 	return x + y;
 }

```

## `terser/evaluate/Infinity_NaN_undefined_LHS`

- size: oxc 116 vs reference 102 (no whitespaces: +14, formatted: +12)

```js
function f() {
	Infinity = Infinity;
	++Infinity;
	Infinity--;
	NaN *= NaN;
	++NaN;
	NaN--;
	undefined |= undefined;
	++undefined;
	undefined--;
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function f() {
-	1 / 0;
+	Infinity = Infinity;
 	++Infinity;
 	Infinity--;
-	NaN *= 0 / 0;
+	NaN *= NaN;
 	++NaN;
 	NaN--;
 	undefined |= void 0;

```

## `terser/global_defs/keyword`

- size: oxc 33 vs reference 19 (no whitespaces: +14, formatted: +14)

```js
console.log(undefined, NaN, Infinity);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(0, 1, 2);
+console.log(void 0, NaN, Infinity);

```

## `terser/hoist/hoist_vars`

- size: oxc 80 vs reference 66 (no whitespaces: +14, formatted: +17)

```js
function a() {
	bar();
	var var1;
	var var2;
}
function b(anArg) {
	bar();
	var var1;
	var anArg;
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 function a() {
-	var var1, var2;
 	bar();
+	var var1;
+	var var2;
 }
 function b(anArg) {
+	bar();
 	var var1;
-	bar();
+	var anArg;
 }

```

## `terser/issue_281/issue_1288_side_effects`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 28 vs reference 14 (no whitespaces: +14, formatted: +19)

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
@@ -1,3 +1,3 @@
-w;
-x || (x = {});
-y;
+w, x || (function() {
+	x = {};
+})(), y;

```

## `terser/issue_640/conditional`

- tags: `pure functions`
- size: oxc 62 vs reference 48 (no whitespaces: +14, formatted: +28)

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
@@ -1,6 +1,6 @@
-1 | a() ? b() : c();
-1 | a() && b();
-1 | a() || c();
-a();
-b();
-b();
+1 | a() ? 2 & b() : 7 ^ c();
+1 | a() && 2 & b();
+1 | a() || 7 ^ c();
+1 | a();
+2 & b();
+2 & b();

```

## `terser/reduce_vars/defun_catch_1`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 37 (no whitespaces: +14, formatted: +16)

```js
function a() {}
try {
	throw 42;
} catch (a) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
+function a() {}
 try {
 	throw 42;
 } catch (a) {

```

## `terser/reduce_vars/defun_catch_2`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 37 (no whitespaces: +14, formatted: +17)

```js
try {
	function a() {}
	throw 42;
} catch (a) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 try {
+	function a() {}
 	throw 42;
 } catch (a) {
 	console.log(a);

```

## `terser/reduce_vars/defun_catch_6`

- tags: `join vars`, `remove unused`
- size: oxc 51 vs reference 37 (no whitespaces: +14, formatted: +16)

```js
try {
	throw 42;
} catch (a) {
	console.log(a);
}
function a() {}

```

```diff
--- reference
+++ oxc
@@ -3,3 +3,4 @@
 } catch (a) {
 	console.log(a);
 }
+function a() {}

```

## `terser/reduce_vars/defun_var_3`

- tags: `join vars`, `remove unused`
- size: oxc 70 vs reference 56 (no whitespaces: +14, formatted: +17)

```js
function a() {}
function b() {}
console.log(typeof a, typeof b);
var a = 42, b;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function a() {}
-console.log(typeof a, 'function');
-var a = 42;
+function b() {}
+console.log(typeof a, typeof b);
+var a = 42, b;

```

## `terser/reduce_vars/issue_2455`

- tags: `join vars`, `remove unused`
- size: oxc 47 vs reference 33 (no whitespaces: +14, formatted: +18)

```js
function foo() {
	var that = this;
	for (;;) that.bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function foo() {
-	for (;;) this.bar();
+	var that = this;
+	for (;;) that.bar();
 }

```

## `terser/reduce_vars/unsafe_evaluate_object_1`

- tags: `join vars`
- size: oxc 102 vs reference 88 (no whitespaces: +14, formatted: +23)

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
@@ -1,6 +1,7 @@
 function f0() {
-	var a = 1;
-	console.log(4);
+	var a = 1, b = {};
+	b[a] = 2;
+	console.log(a + 3);
 }
 function f1() {
 	var a = { b: 1 };

```

## `terser/sequences/unsafe_undefined`

- tags: `sequences`
- size: oxc 104 vs reference 90 (no whitespaces: +14, formatted: +12)

```js
function f(undefined) {
	if (a) return b;
	if (c) return d;
}
function g(undefined) {
	if (a) return b;
	if (c) return d;
	e();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,9 @@
 function f(undefined) {
-	return a ? b : c ? d : void 0;
+	if (a) return b;
+	if (c) return d;
 }
 function g(undefined) {
-	return a ? b : c ? d : void e();
+	if (a) return b;
+	if (c) return d;
+	e();
 }

```

## `terser/evaluate/optional_expect_when_expect_stdout_present`

- size: oxc 15 vs reference 0 (no whitespaces: +15, formatted: +16)

```js
console.log(5 % 3);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+console.log(2);

```

## `terser/properties/literal_duplicate_key_side_effects`

- size: oxc 54 vs reference 39 (no whitespaces: +15, formatted: +22)

```js
console.log({
	a: 'FAIL',
	a: console.log ? 'PASS' : 'FAIL'
}.a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(console.log ? 'PASS' : 'FAIL');
+console.log({
+	a: 'FAIL',
+	a: console.log ? 'PASS' : 'FAIL'
+}.a);

```

## `terser/pure_getters/issue_2938_4`

- tags: `remove unused`, `pure getters`
- size: oxc 169 vs reference 154 (no whitespaces: +15, formatted: +18)

```js
var Parser = function Parser() {};
var p = Parser.prototype;
var unused = p.x;
p.initialContext = function initialContext() {
	p.y;
	console.log('PASS');
};
p.braceIsBlock = function() {};
new Parser().initialContext();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var Parser = function() {};
 var p = Parser.prototype;
+var unused = p.x;
 p.initialContext = function() {
 	console.log('PASS');
 };

```

## `terser/reduce_vars/defun_catch_3`

- tags: `join vars`, `remove unused`
- size: oxc 52 vs reference 37 (no whitespaces: +15, formatted: +17)

```js
try {
	throw 42;
	function a() {}
} catch (a) {
	console.log(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 try {
 	throw 42;
+	function a() {}
 } catch (a) {
 	console.log(a);
 }

```

## `terser/reduce_vars/pure_getters_3`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 15 vs reference 0 (no whitespaces: +15, formatted: +21)

```js
var a;
var a = a && a.b;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+var a, a = a && a.b;

```

## `terser/reduce_vars/unsafe_evaluate_array_4`

- tags: `join vars`
- size: oxc 83 vs reference 68 (no whitespaces: +15, formatted: +15)

```js
var arr = [
	1,
	2,
	function() {
		return ++this[0];
	}
];
console.log(arr[0], arr[1], arr[2], arr[0]);

```

```diff
--- reference
+++ oxc
@@ -5,4 +5,4 @@
 		return ++this[0];
 	}
 ];
-console.log(1, 2, arr[2], 1);
+console.log(arr[0], arr[1], arr[2], arr[0]);

```

## `terser/switch/if_else2`

- size: oxc 44 vs reference 29 (no whitespaces: +15, formatted: +21)

```js
switch (foo) {
	case 'bar': bar();
	default: other();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if ('bar' === foo) bar();
-other();
+switch (foo) {
+	case 'bar': bar();
+	default: other();
+}

```

## `terser/switch/if_else4`

- size: oxc 44 vs reference 29 (no whitespaces: +15, formatted: +21)

```js
switch (foo) {
	default: other();
	case 'bar': bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if ('bar' !== foo) other();
-bar();
+switch (foo) {
+	default: other();
+	case 'bar': bar();
+}

```

## `terser/switch/if_else6`

- size: oxc 40 vs reference 25 (no whitespaces: +15, formatted: +20)

```js
switch (1) {
	case bar: bar();
	case 1: other();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if (1 === bar) bar();
-other();
+switch (1) {
+	case bar: bar();
+	case 1: other();
+}

```

## `terser/switch/keep_default`

- size: oxc 48 vs reference 33 (no whitespaces: +15, formatted: +21)

```js
switch (foo) {
	case 'bar': baz();
	default:
		something();
		break;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if ('bar' === foo) baz();
-something();
+switch (foo) {
+	case 'bar': baz();
+	default: something();
+}

```

## `terser/arguments/arguments_in_arrow_func_2`

- size: oxc 219 vs reference 203 (no whitespaces: +16, formatted: +16)

```js
(function(a, b) {
	console.log(arguments[0], a, arguments[1], arguments[3], b, arguments[2]);
})('bar', 42, false);
(function(a, b) {
	(() => {
		console.log(arguments[0], a, arguments[1], arguments[3], b, arguments[2]);
	})(10, 20, 30, 40);
})('bar', 42, false);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 (function(a, b) {
-	console.log(a, a, b, arguments[3], b, arguments[2]);
-})('bar', 42, false);
+	console.log(arguments[0], a, arguments[1], arguments[3], b, arguments[2]);
+})('bar', 42, !1);
 (function(a, b) {
 	(() => {
 		console.log(arguments[0], a, arguments[1], arguments[3], b, arguments[2]);
 	})(10, 20, 30, 40);
-})('bar', 42, false);
+})('bar', 42, !1);

```

## `terser/collapse_vars/collapse_vars_closures`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 190 vs reference 174 (no whitespaces: +16, formatted: +20)

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
@@ -4,7 +4,8 @@
 	};
 }
 function non_constant_vars_can_only_be_replace_in_same_scope(x) {
+	var outer = x;
 	return function() {
-		return x;
+		return outer;
 	};
 }

```

## `terser/collapse_vars/collapse_vars_constants`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 290 vs reference 274 (no whitespaces: +16, formatted: +28)

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
@@ -1,19 +1,20 @@
 function f1(x) {
-	var b = x.prop, d = sideeffect1(), e = sideeffect2();
+	var b = x.prop, c = 5, d = sideeffect1(), e = sideeffect2();
 	return b + (function() {
-		return d - 4 * e - 5;
+		return d - 4 * e - c;
 	})();
 }
 function f2(x) {
-	var b = x.prop, e = (sideeffect1(), sideeffect2());
+	var b = x.prop, c = 5;
+	sideeffect1();
+	var e = sideeffect2();
 	return b + (function() {
-		return -4 * e - 5;
+		return -4 * e - c;
 	})();
 }
 function f3(x) {
-	var b = x.prop;
-	sideeffect1();
-	return b + (function() {
-		return -9;
+	var b = x.prop, c = 5;
+	return sideeffect1(), b + (function() {
+		return -4 - c;
 	})();
 }

```

## `terser/collapse_vars/issue_2436_3`

- tags: `join vars`, `remove unused`
- size: oxc 79 vs reference 63 (no whitespaces: +16, formatted: +25)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	o = {
		a: 3,
		b: 4
	};
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,14 @@
-var c, o = {
+var o = {
 	a: 1,
 	b: 2
 };
-console.log((c = o, o = {
-	a: 3,
-	b: 4
-}, {
-	x: c.a,
-	y: c.b
-}));
+console.log((function(c) {
+	o = {
+		a: 3,
+		b: 4
+	};
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(o));

```

## `terser/collapse_vars/switch_case_1`

- tags: `join vars`, `remove unused`
- size: oxc 83 vs reference 67 (no whitespaces: +16, formatted: +26)

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
@@ -1,7 +1,8 @@
 function f(x, y, z) {
-	switch (x()) {
+	var a = x(), b = y(), c = z;
+	switch (a) {
 		default: d();
-		case y(): e();
-		case z: f();
+		case b: e();
+		case c: f();
 	}
 }

```

## `terser/collapse_vars/var_side_effects_1`

- tags: `join vars`, `remove unused`
- size: oxc 94 vs reference 78 (no whitespaces: +16, formatted: +20)

```js
var print = console.log.bind(console);
function foo(x) {
	var twice = x * 2;
	print('Foo:', twice);
}
foo(10);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 var print = console.log.bind(console);
 function foo(x) {
-	print('Foo:', 2 * x);
+	var twice = x * 2;
+	print('Foo:', twice);
 }
 foo(10);

```

## `terser/collapse_vars/var_side_effects_2`

- tags: `join vars`, `remove unused`
- size: oxc 100 vs reference 84 (no whitespaces: +16, formatted: +20)

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
@@ -1,5 +1,6 @@
 var print = console.log.bind(console);
 function foo(x) {
-	print('Foo:', 2 * x.y);
+	var twice = x.y * 2;
+	print('Foo:', twice);
 }
 foo({ y: 10 });

```

## `terser/collapse_vars/var_side_effects_3`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 100 vs reference 84 (no whitespaces: +16, formatted: +20)

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
@@ -1,5 +1,6 @@
 var print = console.log.bind(console);
 function foo(x) {
-	print('Foo:', 2 * x.y);
+	var twice = x.y * 2;
+	print('Foo:', twice);
 }
 foo({ y: 10 });

```

## `terser/dead_code/collapse_vars_misc1`

- tags: `join vars`, `remove unused`
- size: oxc 78 vs reference 62 (no whitespaces: +16, formatted: +25)

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
@@ -1,7 +1,8 @@
 function f10(x) {
-	return 8;
+	var a = 5;
+	return a += 3;
 }
 function f11(x) {
-	var b = 3;
-	return 5 + --b;
+	var a = 5, b = 3;
+	return a += --b;
 }

```

## `terser/drop_unused/issue_2226_1`

- tags: `remove unused`
- size: oxc 124 vs reference 108 (no whitespaces: +16, formatted: +26)

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
@@ -1,11 +1,13 @@
 function f1() {
-	b;
-	c;
+	var a = b;
+	a += c;
 }
 function f2(a) {
-	b;
+	a <<= b;
 }
-function f3(a) {}
+function f3(a) {
+	--a;
+}
 function f4() {
 	var a = b;
 	return a *= c;

```

## `terser/harmony/array_literal_with_spread_3a`

- size: oxc 224 vs reference 208 (no whitespaces: +16, formatted: +20)

```js
console.log([10, 20][0]);
console.log([10, 20][1]);
console.log([10, 20][2]);
console.log([
	...[],
	10,
	20
][0]);
console.log([
	...[],
	10,
	20
][1]);
console.log([
	...[],
	10,
	20
][2]);
console.log([
	10,
	...[],
	20
][0]);
console.log([
	10,
	...[],
	20
][1]);
console.log([
	10,
	...[],
	20
][2]);
console.log([
	10,
	20,
	...[]
][0]);
console.log([
	10,
	20,
	...[]
][1]);
console.log([
	10,
	20,
	...[]
][2]);

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
 console.log(10);
 console.log(20);
-console.log(void 0);
+console.log([10, 20][2]);
 console.log(10);
 console.log(20);
-console.log(void 0);
+console.log([10, 20][2]);
 console.log(10);
 console.log(20);
-console.log(void 0);
+console.log([10, 20][2]);
 console.log(10);
 console.log(20);
-console.log(void 0);
+console.log([10, 20][2]);

```

## `terser/identity/inline_identity_undefined`

- tags: `join vars`, `remove unused`
- size: oxc 43 vs reference 27 (no whitespaces: +16, formatted: +23)

```js
const id = (x) => x;
console.log(id(), id(undefined));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(void 0, void 0);
+const id = (x) => x;
+console.log(id(), id(void 0));

```

## `terser/issue_269/strings_concat`

- size: oxc 35 vs reference 19 (no whitespaces: +16, formatted: +16)

```js
f(String(x + 'str'), String('str' + x));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-f(x + 'str', 'str' + x);
+f(String(x + 'str'), String('str' + x));

```

## `terser/issue_973/this_binding_collapse_vars`

- tags: `join vars`, `remove unused`
- size: oxc 41 vs reference 25 (no whitespaces: +16, formatted: +23)

```js
var c = a;
c();
var d = a.b;
d();
var e = eval;
e();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
-a();
-(0, a.b)();
-(0, eval)();
+var c = a;
+c();
+var d = a.b;
+d();
+var e = eval;
+e();

```

## `terser/pure_funcs/func`

- size: oxc 48 vs reference 32 (no whitespaces: +16, formatted: +20)

```js
function f(a, b) {
	Math.floor(a / b);
	Math.floor(c / b);
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 function f(a, b) {
+	Math.floor(a / b);
 	Math.floor(c / b);
 }

```

## `terser/reduce_vars/issue_1670_6`

- tags: `join vars`, `remove unused`
- size: oxc 82 vs reference 66 (no whitespaces: +16, formatted: +29)

```js
(function(a) {
	switch (1) {
		case a = 1:
			console.log(a);
			break;
		default:
			console.log(2);
			break;
	}
})(1);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 (function(a) {
-	if (1 === (a = 1)) console.log(a);
-	else console.log(2);
+	switch (1) {
+		case a = 1:
+			console.log(a);
+			break;
+		default: console.log(2);
+	}
 })(1);

```

## `terser/reduce_vars/issue_2757_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 46 vs reference 30 (no whitespaces: +16, formatted: +21)

```js
(function() {
	let bar;
	const unused = function() {
		bar = true;
	};
	if (!bar) {
		console.log(1);
	}
	console.log(2);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(1), console.log(2);
+(function() {
+	console.log(1), console.log(2);
+})();

```

## `terser/reduce_vars/unsafe_evaluate_side_effect_free_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 69 vs reference 53 (no whitespaces: +16, formatted: +23)

```js
console.log((function() {
	var o = { p: 1 }, a = [o];
	console.log(a[0].p);
	return o.p;
})());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
 console.log((function() {
-	console.log(1);
-	return 1;
+	var o = { p: 1 };
+	console.log(o.p);
+	return o.p;
 })());

```

## `terser/reduce_vars/var_assign_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 31 vs reference 15 (no whitespaces: +16, formatted: +21)

```js
!(function() {
	var a;
	a = 2;
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(2);
+(function() {
+	console.log(2);
+})();

```

## `terser/switch/constant_switch_8`

- size: oxc 46 vs reference 30 (no whitespaces: +16, formatted: +23)

```js
OUT: switch (1) {
	case 1:
		x();
		for (;;) break OUT;
		y();
		break;
	case 1 + 1: bar();
	default: def();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-OUT: {
-	x();
-	for (;;) break OUT;
-	y();
+OUT: switch (1) {
+	case 1:
+		x();
+		for (;;) break OUT;
+		y();
 }

```

## `terser/switch/constant_switch_9`

- size: oxc 65 vs reference 49 (no whitespaces: +16, formatted: +25)

```js
OUT: switch (1) {
	case 1:
		x();
		for (;;) if (foo) break OUT;
		y();
	case 1 + 1: bar();
	default: def();
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,8 @@
-OUT: {
-	x();
-	for (;;) if (foo) break OUT;
-	y();
-	bar();
-	def();
+OUT: switch (1) {
+	case 1:
+		x();
+		for (;;) if (foo) break OUT;
+		y();
+		bar();
+		def();
 }

```

## `terser/switch/if_else`

- size: oxc 50 vs reference 34 (no whitespaces: +16, formatted: +27)

```js
switch (foo) {
	case 'bar':
		bar();
		break;
	default: other();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
-if ('bar' === foo) bar();
-else other();
+switch (foo) {
+	case 'bar':
+		bar();
+		break;
+	default: other();
+}

```

## `terser/switch/if_else3`

- size: oxc 50 vs reference 34 (no whitespaces: +16, formatted: +27)

```js
switch (foo) {
	default:
		other();
		break;
	case 'bar': bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
-if ('bar' === foo) bar();
-else other();
+switch (foo) {
+	default:
+		other();
+		break;
+	case 'bar': bar();
+}

```

## `terser/switch/if_else5`

- size: oxc 46 vs reference 30 (no whitespaces: +16, formatted: +26)

```js
switch (1) {
	case bar:
		bar();
		break;
	case 1: other();
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
-if (1 === bar) bar();
-else other();
+switch (1) {
+	case bar:
+		bar();
+		break;
+	case 1: other();
+}

```

## `terser/switch/turn_into_if_2`

- size: oxc 73 vs reference 57 (no whitespaces: +16, formatted: +21)

```js
switch (id(1)) {
	case id(2): console.log('FAIL');
	default: console.log('PASS');
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-if (id(1) === id(2)) console.log('FAIL');
-console.log('PASS');
+switch (id(1)) {
+	case id(2): console.log('FAIL');
+	default: console.log('PASS');
+}

```

## `terser/destructuring/destructure_empty_array_3`

- tags: `remove unused`, `pure getters`
- size: oxc 53 vs reference 36 (no whitespaces: +17, formatted: +22)

```js
let {} = Object, [] = {}, unused = console.log('not reached');

```

```diff
--- reference
+++ oxc
@@ -1,2 +1 @@
-let [] = {};
-console.log('not reached');
+let {} = Object, [] = {}, unused = console.log('not reached');

```

## `terser/destructuring/issue_3205_2`

- tags: `remove unused`
- size: oxc 68 vs reference 51 (no whitespaces: +17, formatted: +27)

```js
(function() {
	function f() {
		var o = { a: 'PASS' }, { a: x } = o;
		console.log(x);
	}
	f();
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 (function() {
-	var { a: x } = { a: 'PASS' };
-	console.log(x);
+	function f() {
+		var { a: x } = { a: 'PASS' };
+		console.log(x);
+	}
+	f();
 })();

```

## `terser/destructuring/issue_3205_3`

- tags: `remove unused`
- size: oxc 67 vs reference 50 (no whitespaces: +17, formatted: +26)

```js
(function() {
	function f(o, { a: x } = o) {
		console.log(x);
	}
	f({ a: 'PASS' });
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
-(function(o, { a: x } = o) {
-	console.log(x);
-})({ a: 'PASS' });
+(function() {
+	function f(o, { a: x } = o) {
+		console.log(x);
+	}
+	f({ a: 'PASS' });
+})();

```

## `terser/destructuring/issue_3205_4`

- tags: `remove unused`
- size: oxc 70 vs reference 53 (no whitespaces: +17, formatted: +27)

```js
(function() {
	function f(o) {
		var { a: x } = o;
		console.log(x);
	}
	f({ a: 'PASS' });
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-(function(o) {
-	var { a: x } = o;
-	console.log(x);
-})({ a: 'PASS' });
+(function() {
+	function f(o) {
+		var { a: x } = o;
+		console.log(x);
+	}
+	f({ a: 'PASS' });
+})();

```

## `terser/destructuring/issue_3205_5`

- tags: `join vars`, `remove unused`, `4 iterations`
- size: oxc 70 vs reference 53 (no whitespaces: +17, formatted: +27)

```js
(function() {
	function f(g) {
		var o = g, { a: x } = o;
		console.log(x);
	}
	f({ a: 'PASS' });
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-!(function(g) {
-	var { a: x } = { a: 'PASS' };
-	console.log(x);
+(function() {
+	function f(g) {
+		var { a: x } = g;
+		console.log(x);
+	}
+	f({ a: 'PASS' });
 })();

```

## `terser/functions/issue_2663_1`

- tags: `join vars`, `remove unused`
- size: oxc 139 vs reference 122 (no whitespaces: +17, formatted: +19)

```js
(function() {
	var i, o = {};
	function createFn(j) {
		return function() {
			console.log(j);
		};
	}
	for (i in {
		a: 1,
		b: 2,
		c: 3
	}) o[i] = createFn(i);
	for (i in o) o[i]();
})();

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,14 @@
 (function() {
 	var i, o = {};
+	function createFn(j) {
+		return function() {
+			console.log(j);
+		};
+	}
 	for (i in {
 		a: 1,
 		b: 2,
 		c: 3
-	}) o[i] = function(j) {
-		return function() {
-			console.log(j);
-		};
-	}(i);
+	}) o[i] = createFn(i);
 	for (i in o) o[i]();
 })();

```

## `terser/functions/issue_3018`

- size: oxc 99 vs reference 82 (no whitespaces: +17, formatted: +26)

```js
var b = 1, c = 'PASS';
do {
	(function() {
		(function(a) {
			a = 0 != (a && (c = 'FAIL'));
		})();
	})();
} while (b--);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,9 @@
 var b = 1, c = 'PASS';
-do {
-	a = void 0, a = 0 != (a && (c = 'FAIL'));
-} while (b--);
-var a;
+do
+	(function() {
+		(function(a) {
+			a = (a && (c = 'FAIL')) != 0;
+		})();
+	})();
+while (b--);
 console.log(c);

```

## `terser/functions/unsafe_apply_2`

- tags: `join vars`
- size: oxc 144 vs reference 127 (no whitespaces: +17, formatted: +18)

```js
function foo() {
	console.log(a, b);
}
var bar = (function(a, b) {
	console.log(this, a, b);
})(function() {
	foo.apply('foo', ['bar']);
	bar.apply('foo', ['bar']);
})();

```

```diff
--- reference
+++ oxc
@@ -4,6 +4,6 @@
 var bar = (function(a, b) {
 	console.log(this, a, b);
 })(function() {
-	foo('bar');
-	bar.call('foo', 'bar');
+	foo.apply('foo', ['bar']);
+	bar.apply('foo', ['bar']);
 })();

```

## `terser/harmony/object_spread_unsafe`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`, `3 iterations`
- size: oxc 68 vs reference 51 (no whitespaces: +17, formatted: +29)

```js
var o1 = {
	x: 1,
	y: 2
};
var o2 = {
	x: 3,
	z: 4
};
var cloned = { ...o1 };
var merged = {
	...o1,
	...o2
};
console.log(cloned, merged);

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,11 @@
-var o = {
+var e = {
 	x: 1,
 	y: 2
-};
-console.log({ ...o }, {
-	...o,
+}, t = {
 	x: 3,
 	z: 4
-});
+}, n = { ...e }, r = {
+	...e,
+	...t
+};
+console.log(n, r);

```

## `terser/keep_names/keep_some_fnames_reduce`

- tags: `mangle`, `keep function names`, `keep class names`, `join vars`, `remove unused`
- size: oxc 202 vs reference 185 (no whitespaces: +17, formatted: +21)

```js
function foo() {
	var array = [];
	function bar() {}
	array.map(bar);
	function barElement() {}
	array.map(barElement);
	var aElement = () => {};
	array.map(aElement);
	array.map(aElement);
	var bElement = function() {};
	array.map(bElement);
	array.map(bElement);
}

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
 function foo() {
-	var a = [];
-	a.map(function() {});
-	a.map(function barElement() {});
+	var e = [];
+	function bar() {}
+	e.map(bar);
+	function barElement() {}
+	e.map(barElement);
 	var aElement = () => {};
-	a.map(aElement);
-	a.map(aElement);
+	e.map(aElement);
+	e.map(aElement);
 	var bElement = function() {};
-	a.map(bElement);
-	a.map(bElement);
+	e.map(bElement);
+	e.map(bElement);
 }

```

## `terser/labels/labels_1`

- tags: `sequences`
- size: oxc 41 vs reference 24 (no whitespaces: +17, formatted: +24)

```js
out: {
	if (foo) break out;
	console.log('bar');
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-foo || console.log('bar');
+out: {
+	if (foo) break out;
+	console.log('bar');
+}

```

## `terser/labels/labels_9`

- tags: `sequences`
- size: oxc 36 vs reference 19 (no whitespaces: +17, formatted: +20)

```js
out: while (foo) {
	x();
	y();
	continue out;
	z();
	k();
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
-while (foo) {
-	x();
-	y();
+out: for (; foo;) {
+	x(), y();
+	continue out;
 }

```

## `terser/loops/evaluate`

- tags: `2 iterations`
- size: oxc 43 vs reference 26 (no whitespaces: +17, formatted: +21)

```js
while (true) {
	a();
}
while (false) {
	b();
}
do {
	c();
} while (true);
do {
	d();
} while (false);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 for (;;) a();
-for (;;) c();
-d();
+do
+	c();
+while (1);
+do
+	d();
+while (0);

```

## `terser/object/computed_property_names_side_effects`

- tags: `remove unused`
- size: oxc 37 vs reference 20 (no whitespaces: +17, formatted: +22)

```js
const foo = { [console.log('PASS')]: 42 };

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('PASS');
+const foo = { [console.log('PASS')]: 42 };

```

## `terser/pure_getters/set_immutable_6`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 64 vs reference 47 (no whitespaces: +17, formatted: +23)

```js
var a = 1;
a.foo += '';
if (a.foo) console.log('FAIL');
else console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-1 .foo ? console.log('FAIL') : console.log('PASS');
+var a = 1;
+a.foo += '', a.foo ? console.log('FAIL') : console.log('PASS');

```

## `terser/reduce_vars/issue_2757_1`

- tags: `join vars`, `remove unused`
- size: oxc 45 vs reference 28 (no whitespaces: +17, formatted: +24)

```js
let u;
(function() {
	let v;
	console.log(u, v);
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
 let u;
-console.log(u, void 0);
+(function() {
+	let v;
+	console.log(u, v);
+})();

```

## `terser/switch/issue_1705_1`

- size: oxc 54 vs reference 37 (no whitespaces: +17, formatted: +21)

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
@@ -1,2 +1,5 @@
 var a = 0;
-if (0 !== a) console.log('FAIL');
+switch (a) {
+	default: console.log('FAIL');
+	case 0:
+}

```

## `terser/unicode/issue_2242_3`

- size: oxc 53 vs reference 36 (no whitespaces: +17, formatted: +23)

```js
console.log('\ud83d' + '\ude00', '\ud83d' + '@' + '\ude00');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('😀', '\ud83d@\ude00');
+console.log('\ud83d' + '\ude00', '\ud83d' + '@' + '\ude00');

```

## `terser/unicode/issue_2242_4`

- size: oxc 53 vs reference 36 (no whitespaces: +17, formatted: +23)

```js
console.log('\ud83d' + '\ude00', '\ud83d' + '@' + '\ude00');

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('😀', '\ud83d@\ude00');
+console.log('\ud83d' + '\ude00', '\ud83d' + '@' + '\ude00');

```

## `terser/arrays/index`

- tags: `join vars`, `remove unused`
- size: oxc 35 vs reference 17 (no whitespaces: +18, formatted: +22)

```js
var a = [1, 2];
console.log(a[0], a[1]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(1, 2);
+var a = [1, 2];
+console.log(a[0], a[1]);

```

## `terser/collapse_vars/iife_1`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 37 (no whitespaces: +18, formatted: +24)

```js
var log = function(x) {
	console.log(x);
}, foo = bar();
log(foo);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-(function(x) {
+var log = function(x) {
 	console.log(x);
-})(bar());
+}, foo = bar();
+log(foo);

```

## `terser/drop_unused/var_catch_toplevel`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 63 vs reference 45 (no whitespaces: +18, formatted: +24)

```js
function f() {
	a--;
	try {
		a++;
		x();
	} catch (a) {
		if (a) var a;
		var a = 10;
	}
}
f();

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,10 @@
-!(function() {
-	0;
+function f() {
+	a--;
 	try {
-		0;
-		x();
+		a++, x();
 	} catch (a) {
-		var a;
+		if (a) var a;
+		var a = 10;
 	}
-})();
+}
+f();

```

## `terser/evaluate/array_slice_index`

- size: oxc 33 vs reference 15 (no whitespaces: +18, formatted: +25)

```js
console.log([
	1,
	2,
	3
].slice(1)[1]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(3);
+console.log([
+	1,
+	2,
+	3
+].slice(1)[1]);

```

## `terser/evaluate/issue_2916_2`

- tags: `join vars`, `remove unused`
- size: oxc 87 vs reference 69 (no whitespaces: +18, formatted: +25)

```js
var c = 'FAIL';
(function(b) {
	(function(d) {
		d[0] = 1;
	})(b);
	+b && (c = 'PASS');
})([]);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var c = 'FAIL';
 (function(b) {
-	b[0] = 1;
+	(function(d) {
+		d[0] = 1;
+	})(b);
 	+b && (c = 'PASS');
 })([]);
 console.log(c);

```

## `terser/export/module_mangle_export_default_class`

- tags: `type:module`, `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 103 vs reference 85 (no whitespaces: +18, formatted: +20)

```js
export default class foo {}
export class bar {}
class baz {
	meth() {}
}
class qux {}
console.log(foo, bar, baz, qux);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-export default class s {}
+export default class foo {}
 export class bar {}
-console.log(s, bar, class {
+class baz {
 	meth() {}
-}, class {});
+}
+class qux {}
+console.log(foo, bar, baz, qux);

```

## `terser/hoist_props/issue_2508_1`

- tags: `join vars`, `remove unused`
- size: oxc 53 vs reference 35 (no whitespaces: +18, formatted: +30)

```js
var o = {
	a: [1],
	f: function(x) {
		console.log(x);
	}
};
o.f(o.a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-(function(x) {
-	console.log(x);
-})([1]);
+var o = {
+	a: [1],
+	f: function(x) {
+		console.log(x);
+	}
+};
+o.f(o.a);

```

## `terser/hoist_props/issue_2508_2`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 37 (no whitespaces: +18, formatted: +30)

```js
var o = {
	a: { b: 2 },
	f: function(x) {
		console.log(x);
	}
};
o.f(o.a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-(function(x) {
-	console.log(x);
-})({ b: 2 });
+var o = {
+	a: { b: 2 },
+	f: function(x) {
+		console.log(x);
+	}
+};
+o.f(o.a);

```

## `terser/identity/inline_identity_async`

- tags: `join vars`, `remove unused`
- size: oxc 73 vs reference 55 (no whitespaces: +18, formatted: +26)

```js
const id = (x) => x;
id(async () => await 1)();
id(async (x) => await console.log(2))();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-(async () => await 1)();
-(async () => await console.log(2))();
+const id = (x) => x;
+id(async () => await 1)();
+id(async (x) => await console.log(2))();

```

## `terser/issue_1750/case_1`

- size: oxc 71 vs reference 53 (no whitespaces: +18, formatted: +25)

```js
var a = 0, b = 1;
switch (true) {
	case a || true:
	default: b = 2;
	case true:
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 var a = 0, b = 1;
-if (true === (a || true)) b = 2;
+switch (!0) {
+	case a || !0:
+	default: b = 2;
+	case !0:
+}
 console.log(a, b);

```

## `terser/issue_281/negate_iife_3`

- tags: `sequences`
- size: oxc 57 vs reference 39 (no whitespaces: +18, formatted: +23)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-t ? console.log(true) : console.log(false);
+(function() {
+	return t;
+})() ? console.log(!0) : console.log(!1);

```

## `terser/issue_281/negate_iife_3_off`

- tags: `sequences`
- size: oxc 57 vs reference 39 (no whitespaces: +18, formatted: +23)

```js
(function() {
	return t;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-t ? console.log(true) : console.log(false);
+(function() {
+	return t;
+})() ? console.log(!0) : console.log(!1);

```

## `terser/loops/issue_2740_2`

- tags: `2 iterations`
- size: oxc 22 vs reference 4 (no whitespaces: +18, formatted: +22)

```js
L1: while (x()) {
	break L1;
}

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-x();
+L1: for (; x();) break L1;

```

## `terser/properties/issue_2208_7`

- size: oxc 34 vs reference 16 (no whitespaces: +18, formatted: +25)

```js
console.log({ p() {
	return 42;
} }.p());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(42);
+console.log({ p() {
+	return 42;
+} }.p());

```

## `terser/pure_funcs/issue_2705_5`

- size: oxc 30 vs reference 12 (no whitespaces: +18, formatted: +27)

```js
[new x()];
[new x(), y()];
[
	w(),
	new x(),
	y()
];

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,3 @@
-y();
-w(), y();
+new x();
+new x(), y();
+w(), new x(), y();

```

## `terser/reduce_vars/issue_2916`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 87 vs reference 69 (no whitespaces: +18, formatted: +25)

```js
var c = 'FAIL';
(function(b) {
	(function(d) {
		d[0] = 1;
	})(b);
	+b && (c = 'PASS');
})([]);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var c = 'FAIL';
 (function(b) {
-	b[0] = 1;
+	(function(d) {
+		d[0] = 1;
+	})(b);
 	+b && (c = 'PASS');
 })([]);
 console.log(c);

```

## `terser/reduce_vars/obj_var_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 64 vs reference 46 (no whitespaces: +18, formatted: +26)

```js
var C = 1;
var obj = { bar: function() {
	return C + C;
} };
console.log(obj.bar());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log({ bar: function() {
-	return 2;
-} }.bar());
+var C = 1, obj = { bar: function() {
+	return C + C;
+} };
+console.log(obj.bar());

```

## `terser/switch/issue_1750`

- size: oxc 51 vs reference 33 (no whitespaces: +18, formatted: +26)

```js
var a = 0, b = 1;
switch (true) {
	case a, true:
	default: b = 2;
	case true:
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 var a = 0, b = 1;
-b = 2;
+switch (!0) {
+	case !0: b = 2;
+}
 console.log(a, b);

```

## `terser/template_string/tagged_call_with_invalid_escape_2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 104 vs reference 86 (no whitespaces: +18, formatted: +25)

```js
var x = { y: () => String.raw };
console.log(x.y()`\4321\u\x`);
let z = () => String.raw;
console.log(z()`\4321\u\x`);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log({ y: () => String.raw }.y()`\4321\u\x`), console.log((0, String.raw)`\4321\u\x`);
+var x = { y: () => String.raw };
+console.log(x.y()`\4321\u\x`);
+let z = () => String.raw;
+console.log(z()`\4321\u\x`);

```

## `terser/arrays/length`

- tags: `join vars`, `remove unused`
- size: oxc 34 vs reference 15 (no whitespaces: +19, formatted: +23)

```js
var a = [1, 2];
console.log(a.length);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(2);
+var a = [1, 2];
+console.log(a.length);

```

## `terser/evaluate/issue_2926_1`

- tags: `join vars`
- size: oxc 90 vs reference 71 (no whitespaces: +19, formatted: +20)

```js
(function f(a, not_counted = true, ...also_not_counted) {
	console.log(f.name.length, f.length);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
-(function f(not_counted = true, ...also_not_counted) {
-	console.log(1, 1);
+(function f(a, not_counted = !0, ...also_not_counted) {
+	console.log(f.name.length, f.length);
 })();

```

## `terser/evaluate/issue_2926_2`

- size: oxc 43 vs reference 24 (no whitespaces: +19, formatted: +20)

```js
console.log(typeof function() {}.valueOf());

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('function');
+console.log(typeof function() {}.valueOf());

```

## `terser/evaluate/unsafe_string`

- size: oxc 65 vs reference 46 (no whitespaces: +19, formatted: +30)

```js
console.log('1234' + 1, '1234'[0] + 1, '1234'[6 - 5] + 1, ('12' + '34')[0] + 1, ('12' + '34')[6 - 5] + 1, [
	1,
	2,
	3,
	4
].join('')[0] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log('12341', '11', '21', '11', '21', '11');
+console.log('12341', '11', '21', '11', '21', [
+	1,
+	2,
+	3,
+	4
+].join('')[0] + 1);

```

## `terser/functions/issue_1841_1`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 69 (no whitespaces: +19, formatted: +24)

```js
var b = 10;
!(function(arg) {
	for (var key in 'hi') var n = arg.baz, n = [b = 42];
})(--b);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var b = 10;
-!function(arg) {
-	for (var key in 'hi') b = 42;
-}(--b);
+(function(arg) {
+	for (var key in 'hi') var n = arg.baz, n = [b = 42];
+})(--b);
 console.log(b);

```

## `terser/functions/issue_1841_2`

- tags: `join vars`, `remove unused`
- size: oxc 88 vs reference 69 (no whitespaces: +19, formatted: +24)

```js
var b = 10;
!(function(arg) {
	for (var key in 'hi') var n = arg.baz, n = [b = 42];
})(--b);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var b = 10;
-!function(arg) {
-	for (var key in 'hi') b = 42;
-}(--b);
+(function(arg) {
+	for (var key in 'hi') var n = arg.baz, n = [b = 42];
+})(--b);
 console.log(b);

```

## `terser/functions/issue_2737_1`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 45 (no whitespaces: +19, formatted: +24)

```js
(function(a) {
	while (a());
})(function f() {
	console.log(typeof f);
});

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-while (function f() {
+(function(a) {
+	for (; a(););
+})(function f() {
 	console.log(typeof f);
-}());
+});

```

## `terser/hoist_props/hoist_class`

- tags: `join vars`, `remove unused`, `keep function names`, `keep class names`, `2 iterations`
- size: oxc 167 vs reference 148 (no whitespaces: +19, formatted: +35)

```js
function run(c, v) {
	return new c(v).value;
}
var o = {
	p: class Foo {
		constructor(value) {
			this.value = value * 10;
		}
	},
	x: 1,
	y: 2
};
console.log(o.p.name, o.p === o.p, run(o.p, o.x), run(o.p, o.y));

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,13 @@
 function run(c, v) {
 	return new c(v).value;
 }
-var o_p = class Foo {
-	constructor(value) {
-		this.value = 10 * value;
-	}
+var o = {
+	p: class Foo {
+		constructor(value) {
+			this.value = value * 10;
+		}
+	},
+	x: 1,
+	y: 2
 };
-console.log(o_p.name, true, run(o_p, 1), run(o_p, 2));
+console.log(o.p.name, o.p === o.p, run(o.p, o.x), run(o.p, o.y));

```

## `terser/hoist_props/hoist_class_with_new`

- tags: `join vars`, `remove unused`, `keep function names`, `keep class names`, `2 iterations`
- size: oxc 139 vs reference 120 (no whitespaces: +19, formatted: +35)

```js
var o = {
	p: class Foo {
		constructor(value) {
			this.value = value * 10;
		}
	},
	x: 1,
	y: 2
};
console.log(o.p.name, o.p === o.p, new o.p(o.x).value, new o.p(o.y).value);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,10 @@
-var o_p = class Foo {
-	constructor(value) {
-		this.value = 10 * value;
-	}
+var o = {
+	p: class Foo {
+		constructor(value) {
+			this.value = value * 10;
+		}
+	},
+	x: 1,
+	y: 2
 };
-console.log(o_p.name, true, new o_p(1).value, new o_p(2).value);
+console.log(o.p.name, o.p === o.p, new o.p(o.x).value, new o.p(o.y).value);

```

## `terser/issue_1443/unsafe_undefined`

- tags: `sequences`
- size: oxc 69 vs reference 50 (no whitespaces: +19, formatted: +18)

```js
function f(undefined) {
	return function() {
		if (a) return b;
		if (c) return d;
	};
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-function f(n) {
+function f(undefined) {
 	return function() {
-		return a ? b : c ? d : n;
+		if (a) return b;
+		if (c) return d;
 	};
 }

```

## `terser/issue_1588/unsafe_undefined`

- tags: `sequences`
- size: oxc 95 vs reference 76 (no whitespaces: +19, formatted: +18)

```js
var a, c;
console.log((function(undefined) {
	return function() {
		if (a) return b;
		if (c) return d;
	};
})()());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
 var a, c;
-console.log((function(n) {
+console.log((function(undefined) {
 	return function() {
-		return a ? b : c ? d : n;
+		if (a) return b;
+		if (c) return d;
 	};
 })()());

```

## `terser/labels/labels_2`

- tags: `sequences`
- size: oxc 62 vs reference 43 (no whitespaces: +19, formatted: +22)

```js
out: {
	if (foo) print('stuff');
	else break out;
	console.log('here');
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-if (foo) {
-	print('stuff');
+out: {
+	if (foo) print('stuff');
+	else break out;
 	console.log('here');
 }

```

## `terser/numbers/evaluate_2`

- size: oxc 95 vs reference 76 (no whitespaces: +19, formatted: +36)

```js
console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, 1 | x | 2 | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), 1 & (2 & x & 3), 1 + (2 + (x |= 0) + 3));

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(x + 1 + 2, 2 * x, 3 + +x, 1 + x + 2 + 3, 3 | x, 6 + x--, 6 + x * y, 1 + (2 + x + 3), 0 & x, 6 + (x |= 0));
+console.log(x + 1 + 2, x * 1 * 2, +x + 1 + 2, 1 + x + 2 + 3, x | 3, 1 + x-- + 2 + 3, 1 + (x * y + 2) + 3, 1 + (2 + x + 3), x & 0, 1 + (2 + (x |= 0) + 3));

```

## `terser/pure_funcs/issue_526_1`

- size: oxc 54 vs reference 35 (no whitespaces: +19, formatted: +22)

```js
new ((g()) || (h()))(x(), y());
new ((a()) || (b()))(c(), d());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-x(), y();
+new ((g()) || (h()))(x(), y());
 new ((a()) || (b()))(c(), d());

```

## `terser/reduce_vars/defun_reference`

- tags: `join vars`
- size: oxc 91 vs reference 72 (no whitespaces: +19, formatted: +28)

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
@@ -3,7 +3,10 @@
 		x();
 		return a;
 	}
-	var a = (y(), 2);
-	var b = 2;
-	return a + 2;
+	var a = h(), b = 2;
+	return a + b;
+	function h() {
+		y();
+		return b;
+	}
 }

```

## `terser/reduce_vars/unsafe_evaluate`

- tags: `join vars`, `remove unused`
- size: oxc 112 vs reference 93 (no whitespaces: +19, formatted: +28)

```js
function f0() {
	var a = { b: 1 };
	console.log(a.b + 3);
}
function f1() {
	var a = {
		b: { c: 1 },
		d: 2
	};
	console.log(a.b + 3, a.d + 4, a.b.c + 5, a.d.c + 6);
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,10 @@
 function f0() {
-	console.log(4);
+	console.log({ b: 1 }.b + 3);
 }
 function f1() {
 	var a = {
 		b: { c: 1 },
 		d: 2
 	};
-	console.log(a.b + 3, 6, 6, 2 .c + 6);
+	console.log(a.b + 3, a.d + 4, a.b.c + 5, a.d.c + 6);
 }

```

## `terser/destructuring/empty_object_destructuring_1`

- tags: `remove unused`
- size: oxc 102 vs reference 82 (no whitespaces: +20, formatted: +25)

```js
var {} = Object;
let { L } = Object, L2 = 'foo';
const bar = 'bar', { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var {} = Object;
-let { L } = Object;
-const { prop: C1, C2 = console.log('side effect'), C3 } = Object;
+let { L } = Object, L2 = 'foo';
+const bar = 'bar', { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

## `terser/destructuring/empty_object_destructuring_2`

- tags: `remove unused`
- size: oxc 102 vs reference 82 (no whitespaces: +20, formatted: +25)

```js
var {} = Object;
let { L } = Object, L2 = 'foo';
const bar = 'bar', { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,3 @@
 var {} = Object;
-let { L } = Object;
-const { prop: C1, C2 = console.log('side effect'), C3 } = Object;
+let { L } = Object, L2 = 'foo';
+const bar = 'bar', { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

## `terser/destructuring/unused_destructuring_decl_5`

- tags: `remove unused`, `pure getters`
- size: oxc 130 vs reference 110 (no whitespaces: +20, formatted: +24)

```js
const { a, b: c, d = new Object(1) } = { b: 7 };
let { e, f: g, h = new Object(2) } = { e: 8 };
var { w, x: y, z = new Object(3) } = {
	w: 4,
	x: 5,
	y: 6
};
console.log(c, e, z + 0);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-const { a, b: c, d = Object(1) } = { b: 7 };
-let { e, h = Object(2) } = { e: 8 };
-var { w, z = Object(3) } = {
+const { a, b: c, d = new Object(1) } = { b: 7 };
+let { e, f: g, h = new Object(2) } = { e: 8 };
+var { w, x: y, z = new Object(3) } = {
 	w: 4,
 	x: 5,
 	y: 6

```

## `terser/drop_unused/drop_toplevel_vars`

- tags: `remove unused`
- size: oxc 100 vs reference 80 (no whitespaces: +20, formatted: +33)

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
@@ -1,9 +1,10 @@
+var a, b = 1, c = g;
 function f(d) {
 	return function() {
-		2;
+		c = 2;
 	};
 }
-2;
+a = 2;
 function g() {}
 function h() {}
-console.log(3);
+console.log(b = 3);

```

## `terser/evaluate/issue_2207_3`

- size: oxc 122 vs reference 102 (no whitespaces: +20, formatted: +14)

```js
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);
console.log(Number.NaN);
console.log(Number.NEGATIVE_INFINITY);
console.log(Number.POSITIVE_INFINITY);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log(Number.MAX_VALUE);
-console.log(5e-324);
-console.log(0 / 0);
-console.log(-1 / 0);
-console.log(1 / 0);
+console.log(Number.MIN_VALUE);
+console.log(NaN);
+console.log(-Infinity);
+console.log(Infinity);

```

## `terser/export/name_cache_mangle_export_default_function`

- tags: `type:module`, `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 125 vs reference 105 (no whitespaces: +20, formatted: +26)

```js
export default function foo() {
	return 1;
}
export function bar() {
	return 2;
}
function qux() {
	return 3;
}
console.log(foo(), bar(), qux());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
-export default function _$FOO$_() {
+export default function foo() {
 	return 1;
 }
 export function bar() {
 	return 2;
 }
-console.log(_$FOO$_(), bar(), 3);
+function qux() {
+	return 3;
+}
+console.log(foo(), bar(), qux());

```

## `terser/functions/issue_3016_1`

- size: oxc 70 vs reference 50 (no whitespaces: +20, formatted: +23)

```js
var b = 1;
do {
	(function(a) {
		return a[b];
		var a;
	})(3);
} while (0);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var b = 1;
-do {
-	a = 3, a[b];
-} while (0);
-var a;
+do
+	(function(a) {
+		return a[b];
+		var a;
+	})(3);
+while (0);
 console.log(b);

```

## `terser/functions/issue_3016_2`

- size: oxc 70 vs reference 50 (no whitespaces: +20, formatted: +23)

```js
var b = 1;
do {
	(function(a) {
		return a[b];
		try {
			a = 2;
		} catch (a) {
			var a;
		}
	})(3);
} while (0);
console.log(b);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,8 @@
 var b = 1;
-do {
-	a = 3, a[b];
-} while (0);
-var a;
+do
+	(function(a) {
+		return a[b];
+		var a;
+	})(3);
+while (0);
 console.log(b);

```

## `terser/functions/use_before_init_in_loop`

- size: oxc 108 vs reference 88 (no whitespaces: +20, formatted: +26)

```js
var a = 'PASS';
for (var b = 2; --b >= 0;) (function() {
	var c = (function() {
		return 1;
	})(c && (a = 'FAIL'));
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 var a = 'PASS';
 for (var b = 2; --b >= 0;) (function() {
-	var c = (c && (a = 'FAIL'), 1);
+	var c = (function() {
+		return 1;
+	})(c && (a = 'FAIL'));
 })();
 console.log(a);

```

## `terser/hoist_props/issue_2473_4`

- tags: `join vars`, `remove unused`
- size: oxc 53 vs reference 33 (no whitespaces: +20, formatted: +34)

```js
(function() {
	var o = {
		a: 1,
		b: 2
	};
	console.log(o.a, o.b);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 (function() {
-	console.log(1, 2);
+	var o = {
+		a: 1,
+		b: 2
+	};
+	console.log(o.a, o.b);
 })();

```

## `terser/issue_281/ref_scope`

- tags: `join vars`, `remove unused`
- size: oxc 91 vs reference 71 (no whitespaces: +20, formatted: +27)

```js
console.log((function() {
	var a = 1, b = 2, c = 3;
	var a = c++, b = b /= a;
	return (function() {
		return a;
	})() + b;
})());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-console.log(function() {
-	var a = 1, b = 2, c = 3;
-	var a = c++, b = b /= a;
-	return a + b;
-}());
+console.log((function() {
+	var a = 1, b = 2, c = 3, a = c++, b = b /= a;
+	return (function() {
+		return a;
+	})() + b;
+})());

```

## `terser/labels/labels_4`

- tags: `sequences`
- size: oxc 60 vs reference 40 (no whitespaces: +20, formatted: +27)

```js
out: for (var i = 0; i < 5; ++i) {
	if (i < 3) continue out;
	console.log(i);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (var i = 0; i < 5; ++i) i < 3 || console.log(i);
+out: for (var i = 0; i < 5; ++i) {
+	if (i < 3) continue out;
+	console.log(i);
+}

```

## `terser/negate_iife/negate_iife_2`

- size: oxc 30 vs reference 10 (no whitespaces: +20, formatted: +26)

```js
(function() {
	return {};
})().x = 10;

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-({}).x = 10;
+(function() {
+	return {};
+})().x = 10;

```

## `terser/properties/evaluate_array_length`

- size: oxc 70 vs reference 50 (no whitespaces: +20, formatted: +27)

```js
a = [
	1,
	2,
	3
].length;
a = [
	1,
	2,
	3
].join()['len' + 'gth'];
a = [
	1,
	2,
	b
].length;
a = [
	1,
	2,
	3
].join(b).length;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,12 @@
 a = 3;
-a = 5;
 a = [
 	1,
 	2,
+	3
+].join().length;
+a = [
+	1,
+	2,
 	b
 ].length;
 a = [

```

## `terser/switch/issue_1680_1`

- size: oxc 107 vs reference 87 (no whitespaces: +20, formatted: +24)

```js
function f(x) {
	console.log(x);
	return x + 1;
}
switch (2) {
	case f(0):
	case f(1): f(2);
	case 2:
	case f(3):
	case f(4): f(5);
}

```

```diff
--- reference
+++ oxc
@@ -5,5 +5,7 @@
 switch (2) {
 	case f(0):
 	case f(1): f(2);
-	case 2: f(5);
+	case 2:
+	case f(3):
+	case f(4): f(5);
 }

```

## `terser/drop_unused/drop_toplevel_vars_fargs`

- tags: `remove unused`
- size: oxc 100 vs reference 79 (no whitespaces: +21, formatted: +34)

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
@@ -1,9 +1,10 @@
-function f() {
+var a, b = 1, c = g;
+function f(d) {
 	return function() {
-		2;
+		c = 2;
 	};
 }
-2;
+a = 2;
 function g() {}
 function h() {}
-console.log(3);
+console.log(b = 3);

```

## `terser/issue_t120/issue_t120_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 202 vs reference 181 (no whitespaces: +21, formatted: +23)

```js
function foo(node) {
	var traverse = function(obj) {
		var i = obj.data;
		return i && i.a != i.b;
	};
	while (traverse(node)) {
		node = node.data;
	}
	return node;
}
var x = {
	a: 1,
	b: 2,
	data: { a: 'hello' }
};
console.log(foo(x).a, foo({ a: 'world' }).a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function foo(node) {
-	for (; function(obj) {
+	for (var traverse = function(obj) {
 		var i = obj.data;
 		return i && i.a != i.b;
-	}(node);) node = node.data;
+	}; traverse(node);) node = node.data;
 	return node;
 }
 var x = {

```

## `terser/issue_t120/issue_t120_2`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 202 vs reference 181 (no whitespaces: +21, formatted: +23)

```js
function foo(node) {
	var traverse = function(obj) {
		var i = obj.data;
		return i && i.a != i.b;
	};
	while (traverse(node)) {
		node = node.data;
	}
	return node;
}
var x = {
	a: 1,
	b: 2,
	data: { a: 'hello' }
};
console.log(foo(x).a, foo({ a: 'world' }).a);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
 function foo(node) {
-	for (; function(obj) {
+	for (var traverse = function(obj) {
 		var i = obj.data;
 		return i && i.a != i.b;
-	}(node);) node = node.data;
+	}; traverse(node);) node = node.data;
 	return node;
 }
 var x = {

```

## `terser/loops/issue_2740_5`

- tags: `2 iterations`
- size: oxc 56 vs reference 35 (no whitespaces: +21, formatted: +30)

```js
L1: for (var x = 0; x < 3; x++) {
	break L1;
	L2: for (var y = 0; y < 2; y++) {
		break L2;
	}
}
console.log(x, y);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-var x = 0;
-x < 3;
-var y;
+L1: for (var x = 0; x < 3; x++) {
+	break L1;
+	var y;
+}
 console.log(x, y);

```

## `terser/object/prop_arrow_with_this`

- size: oxc 237 vs reference 216 (no whitespaces: +21, formatted: +25)

```js
function run(arg) {
	console.log(arg === this ? 'global' : arg === foo ? 'foo' : arg);
}
var foo = {
	func_no_this: function() {
		run();
	},
	func_with_this: function() {
		run(this);
	},
	arrow_no_this: () => {
		run();
	},
	arrow_with_this: () => {
		run(this);
	}
};
for (var key in foo) foo[key]();

```

```diff
--- reference
+++ oxc
@@ -2,13 +2,13 @@
 	console.log(arg === this ? 'global' : arg === foo ? 'foo' : arg);
 }
 var foo = {
-	func_no_this() {
+	func_no_this: function() {
 		run();
 	},
-	func_with_this() {
+	func_with_this: function() {
 		run(this);
 	},
-	arrow_no_this() {
+	arrow_no_this: () => {
 		run();
 	},
 	arrow_with_this: () => {

```

## `terser/reduce_vars/func_inline`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 59 (no whitespaces: +21, formatted: +28)

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
@@ -1,5 +1,7 @@
 function f() {
-	console.log(1 + h());
+	console.log(function() {
+		return 1;
+	}() + h());
 	var h = function() {
 		return 2;
 	};

```

## `terser/reduce_vars/issue_2442`

- tags: `join vars`, `remove unused`
- size: oxc 21 vs reference 0 (no whitespaces: +21, formatted: +27)

```js
function foo() {
	foo();
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+function foo() {
+	foo();
+}

```

## `terser/reduce_vars/toplevel_on_loops_1`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 44 (no whitespaces: +21, formatted: +27)

```js
function bar() {
	console.log('bar:', --x);
}
var x = 3;
do {
	bar();
} while (x);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
+function bar() {
+	console.log('bar:', --x);
+}
 var x = 3;
 do
-	console.log('bar:', --x);
+	bar();
 while (x);

```

## `terser/arguments/replace_index`

- size: oxc 377 vs reference 355 (no whitespaces: +22, formatted: +22)

```js
var arguments = [];
console.log(arguments[0]);
(function() {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(a, b) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(arguments) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function() {
	var arguments;
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(a, b) {
-	console.log(b, b, arguments.foo);
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(arguments) {
 	console.log(arguments[1], arguments[1], arguments.foo);

```

## `terser/arguments/replace_index_strict`

- tags: `join vars`
- size: oxc 170 vs reference 148 (no whitespaces: +22, formatted: +22)

```js
'use strict';
(function() {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);
(function(a, b) {
	console.log(arguments[1], arguments['1'], arguments['foo']);
})('bar', 42);

```

```diff
--- reference
+++ oxc
@@ -3,5 +3,5 @@
 	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);
 (function(a, b) {
-	console.log(b, b, arguments.foo);
+	console.log(arguments[1], arguments[1], arguments.foo);
 })('bar', 42);

```

## `terser/arrays/index_length`

- tags: `join vars`, `remove unused`
- size: oxc 39 vs reference 17 (no whitespaces: +22, formatted: +26)

```js
var a = [1, 2];
console.log(a[0], a.length);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(1, 2);
+var a = [1, 2];
+console.log(a[0], a.length);

```

## `terser/collapse_vars/issue_2436_2`

- tags: `join vars`, `remove unused`
- size: oxc 73 vs reference 51 (no whitespaces: +22, formatted: +32)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	o.a = 3;
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,10 @@
 	a: 1,
 	b: 2
 };
-console.log((o.a = 3, {
-	x: o.a,
-	y: o.b
-}));
+console.log((function(c) {
+	o.a = 3;
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(o));

```

## `terser/collapse_vars/issue_2436_4`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 45 (no whitespaces: +22, formatted: +28)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
	var o;
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
-var c;
-console.log({
-	x: (c = {
-		a: 1,
-		b: 2
-	}).a,
-	y: c.b
-});
+var o = {
+	a: 1,
+	b: 2
+};
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(o));

```

## `terser/collapse_vars/issue_2436_5`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 45 (no whitespaces: +22, formatted: +28)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(o) {
	return {
		x: o.a,
		y: o.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
-var o;
-console.log({
-	x: (o = {
-		a: 1,
-		b: 2
-	}).a,
-	y: o.b
-});
+var o = {
+	a: 1,
+	b: 2
+};
+console.log((function(o) {
+	return {
+		x: o.a,
+		y: o.b
+	};
+})(o));

```

## `terser/collapse_vars/issue_2436_9`

- tags: `join vars`, `remove unused`
- size: oxc 65 vs reference 43 (no whitespaces: +22, formatted: +31)

```js
var o = console;
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
-var c;
-console.log({
-	x: (c = console).a,
-	y: c.b
-});
+var o = console;
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(o));

```

## `terser/comparing/issue_2857_6`

- tags: `join vars`
- size: oxc 134 vs reference 112 (no whitespaces: +22, formatted: +28)

```js
function f(a) {
	if ({}.b === undefined || {}.b === null) return a.b !== undefined && a.b !== null;
}
console.log(f({
	a: [null],
	get b() {
		return this.a.shift();
	}
}));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function f(a) {
-	if (true) return void 0 !== a.b && null !== a.b;
+	if ({}.b === void 0 || {}.b === null) return a.b !== void 0 && a.b !== null;
 }
 console.log(f({
 	a: [null],

```

## `terser/evaluate/issue_2231_3`

- size: oxc 41 vs reference 19 (no whitespaces: +22, formatted: +25)

```js
console.log(Object.keys({ foo: 'bar' })[0]);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log('foo');
+console.log(Object.keys({ foo: 'bar' })[0]);

```

## `terser/functions/issue_2737_2`

- tags: `join vars`, `remove unused`
- size: oxc 83 vs reference 61 (no whitespaces: +22, formatted: +27)

```js
(function(bar) {
	for (; bar();) break;
})(function qux() {
	return console.log('PASS'), qux;
});

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-for (; function qux() {
+(function(bar) {
+	for (; bar();) break;
+})(function qux() {
 	return console.log('PASS'), qux;
-}();) break;
+});

```

## `terser/identity/inline_identity`

- tags: `join vars`, `remove unused`
- size: oxc 39 vs reference 17 (no whitespaces: +22, formatted: +29)

```js
const id = (x) => x;
console.log(id(1), id(2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(1, 2);
+const id = (x) => x;
+console.log(id(1), id(2));

```

## `terser/identity/inline_identity_extra_params`

- tags: `join vars`, `remove unused`
- size: oxc 56 vs reference 34 (no whitespaces: +22, formatted: +30)

```js
const id = (x) => x;
console.log(id(1, console.log(2)), id(3, 4));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log((console.log(2), 1), 3);
+const id = (x) => x;
+console.log(id(1, console.log(2)), id(3, 4));

```

## `terser/issue_976/eval_collapse_vars`

- tags: `join vars`, `remove unused`
- size: oxc 328 vs reference 306 (no whitespaces: +22, formatted: +32)

```js
function f1() {
	var e = 7;
	var s = 'abcdef';
	var i = 2;
	var eval = console.log.bind(console);
	var x = s.charAt(i++);
	var y = s.charAt(i++);
	var z = s.charAt(i++);
	eval(x, y, z, e);
}
function p1() {
	var a = foo(), b = bar(), eval = baz();
	return a + b + eval;
}
function p2() {
	var a = foo(), b = bar(), eval = baz;
	return a + b + eval();
}
(function f2(eval) {
	var a = 2;
	console.log(a - 5);
	eval('console.log(a);');
})(eval);

```

```diff
--- reference
+++ oxc
@@ -3,7 +3,8 @@
 	eval(x, y, z, e);
 }
 function p1() {
-	return foo() + bar() + baz();
+	var a = foo(), b = bar(), eval = baz();
+	return a + b + eval;
 }
 function p2() {
 	var a = foo(), b = bar(), eval = baz;

```

## `terser/negate_iife/negate_iife_3_evaluate`

- tags: `sequences`
- size: oxc 40 vs reference 18 (no whitespaces: +22, formatted: +28)

```js
(function() {
	return true;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(true);
+console.log(!!(function() {
+	return !0;
+})());

```

## `terser/negate_iife/negate_iife_3_off_evaluate`

- tags: `sequences`
- size: oxc 40 vs reference 18 (no whitespaces: +22, formatted: +28)

```js
(function() {
	return true;
})() ? console.log(true) : console.log(false);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(true);
+console.log(!!(function() {
+	return !0;
+})());

```

## `terser/reduce_vars/inner_var_for_in_1`

- tags: `join vars`
- size: oxc 100 vs reference 78 (no whitespaces: +22, formatted: +30)

```js
function f() {
	var a = 1, b = 2;
	for (b in (function() {
		return x(a, b, c);
	})()) {
		var c = 3, d = 4;
		x(a, b, c, d);
	}
	x(a, b, c, d);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 function f() {
 	var a = 1, b = 2;
-	for (b in x(1, b, c)) {
+	for (b in (function() {
+		return x(a, b, c);
+	})()) {
 		var c = 3, d = 4;
-		x(1, b, c, d);
+		x(a, b, c, d);
 	}
-	x(1, b, c, d);
+	x(a, b, c, d);
 }

```

## `terser/reduce_vars/shorthand_obj_var_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 68 vs reference 46 (no whitespaces: +22, formatted: +32)

```js
var C = 1;
var bar = function() {
	return C + C;
};
var obj = { bar };
console.log(obj.bar());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log({ bar: function() {
-	return 2;
-} }.bar());
+var C = 1, bar = function() {
+	return C + C;
+}, obj = { bar };
+console.log(obj.bar());

```

## `terser/reduce_vars/shorthand_obj_var_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 68 vs reference 46 (no whitespaces: +22, formatted: +32)

```js
var C = 1;
var bar = function() {
	return C + C;
};
var obj = { bar };
console.log(obj.bar());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log({ bar: function() {
-	return 2;
-} }.bar());
+var C = 1, bar = function() {
+	return C + C;
+}, obj = { bar };
+console.log(obj.bar());

```

## `terser/arrow/async_object_literal`

- size: oxc 84 vs reference 61 (no whitespaces: +23, formatted: +30)

```js
var obj = {
	async a() {
		return await foo(1 + 0);
	},
	anon: async function() {
		return await foo(2 + 0);
	}
};

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 var obj = {
-	a: async () => await foo(1),
-	anon: async () => await foo(2)
+	async a() {
+		return await foo(1);
+	},
+	anon: async function() {
+		return await foo(2);
+	}
 };

```

## `terser/collapse_vars/recursive_function_replacement`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 76 vs reference 53 (no whitespaces: +23, formatted: +29)

```js
function f(a) {
	return x(g(a));
}
function g(a) {
	return y(f(a));
}
console.log(f(c));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-function g(n) {
-	return y(x(g(n)));
+function f(a) {
+	return x(g(a));
 }
-console.log(x(g(c)));
+function g(a) {
+	return y(f(a));
+}
+console.log(f(c));

```

## `terser/dead_code/issue_2233_2`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 82 (no whitespaces: +23, formatted: +26)

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
@@ -1,6 +1,8 @@
 var RegExp;
+Array.isArray;
 UndeclaredGlobal;
 function foo() {
+	var Number;
 	AnotherUndeclaredGlobal;
-	(void 0).isNaN;
+	Number.isNaN;
 }

```

## `terser/issue_1609/chained_evaluation_2`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 53 (no whitespaces: +23, formatted: +43)

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
@@ -1 +1,6 @@
-f('long piece of string').bar = 'long piece of string';
+(function() {
+	(function() {
+		var b = 'long piece of string', c = f(b);
+		c.bar = b;
+	})();
+})();

```

## `terser/issue_281/modified`

- tags: `join vars`, `remove unused`
- size: oxc 78 vs reference 55 (no whitespaces: +23, formatted: +30)

```js
function f5(b) {
	var a = (function() {
		return b;
	})();
	return b++ + a;
}
console.log(f5(1));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,7 @@
 function f5(b) {
-	var a = b;
+	var a = (function() {
+		return b;
+	})();
 	return b++ + a;
 }
 console.log(f5(1));

```

## `terser/issue_281/wrap_iife_in_expression`

- size: oxc 33 vs reference 10 (no whitespaces: +23, formatted: +28)

```js
foo = (function() {
	return bar();
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-foo = bar();
+foo = (function() {
+	return bar();
+})();

```

## `terser/pure_getters/issue_2265_4`

- tags: `join vars`, `remove unused`
- size: oxc 23 vs reference 0 (no whitespaces: +23, formatted: +32)

```js
var a = { b: 1 };
({ ...a }).b;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+var a = { b: 1 };
+({ ...a }).b;

```

## `terser/reduce_vars/var_assign_3`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 47 vs reference 24 (no whitespaces: +23, formatted: +32)

```js
!(function() {
	var a;
	while (a = 2);
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
-while (2);
-console.log(2);
+(function() {
+	for (var a; a = 2;);
+	console.log(a);
+})();

```

## `terser/switch/if_else7`

- size: oxc 44 vs reference 21 (no whitespaces: +23, formatted: +30)

```js
switch (foo) {
	case 'bar':
		break;
		bar();
	default: other();
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-'bar' === foo || other();
+switch (foo) {
+	case 'bar': break;
+	default: other();
+}

```

## `terser/collapse_vars/issue_2436_1`

- tags: `join vars`, `remove unused`
- size: oxc 67 vs reference 43 (no whitespaces: +24, formatted: +33)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -2,7 +2,9 @@
 	a: 1,
 	b: 2
 };
-console.log({
-	x: o.a,
-	y: o.b
-});
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(o));

```

## `terser/drop_unused/issue_t161_top_retain_3`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 65 vs reference 41 (no whitespaces: +24, formatted: +30)

```js
function f() {
	return 2;
}
function g() {
	return 3;
}
console.log(f(), g());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 function f() {
 	return 2;
 }
-console.log(f(), 3);
+function g() {
+	return 3;
+}
+console.log(f(), g());

```

## `terser/functions/inline_loop_1`

- tags: `join vars`, `remove unused`
- size: oxc 35 vs reference 11 (no whitespaces: +24, formatted: +30)

```js
function f() {
	return x();
}
for (;;) f();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (;;) x();
+function f() {
+	return x();
+}
+for (;;) f();

```

## `terser/functions/inline_loop_2`

- tags: `join vars`, `remove unused`
- size: oxc 35 vs reference 11 (no whitespaces: +24, formatted: +30)

```js
for (;;) f();
function f() {
	return x();
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (;;) x();
+for (;;) f();
+function f() {
+	return x();
+}

```

## `terser/reduce_vars/issue_2423_2`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 36 (no whitespaces: +24, formatted: +30)

```js
function c() {
	return 1;
}
function p() {
	console.log(c());
}
p();
p();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
+function c() {
+	return 1;
+}
 function p() {
-	console.log(1);
+	console.log(c());
 }
 p();
 p();

```

## `terser/return_undefined/return_void`

- tags: `join vars`, `remove unused`
- size: oxc 41 vs reference 17 (no whitespaces: +24, formatted: +33)

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
@@ -1,3 +1,6 @@
 function f() {
-	h();
+	function g() {
+		h();
+	}
+	return g();
 }

```

## `terser/evaluate/unsafe_string_bad_index`

- size: oxc 50 vs reference 25 (no whitespaces: +25, formatted: +25)

```js
console.log('1234'.a + 1, '1234'['a'] + 1, '1234'[3.14] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log(0 / 0, 0 / 0, 0 / 0);
+console.log('1234'.a + 1, '1234'.a + 1, '1234'[3.14] + 1);

```

## `terser/functions/issue_2630_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 90 vs reference 65 (no whitespaces: +25, formatted: +43)

```js
var c = 0;
!(function() {
	while (f()) {}
	function f() {
		var not_used = (function() {
			c = 1 + c;
		})(c = c + 1);
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,9 @@
 var c = 0;
-!(function() {
-	while (void (c = 1 + (c += 1)));
+(function() {
+	for (; f(););
+	function f() {
+		(function() {
+			c = 1 + c;
+		})(c += 1);
+	}
 })(), console.log(c);

```

## `terser/functions/issue_3125`

- size: oxc 45 vs reference 20 (no whitespaces: +25, formatted: +31)

```js
console.log(function() {
	return 'PASS';
}.call());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log('PASS');
+console.log(function() {
+	return 'PASS';
+}.call());

```

## `terser/issue_1212/issue_1212_debug_false`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 78 vs reference 53 (no whitespaces: +25, formatted: +29)

```js
class foo {
	bar() {
		if (DEBUG) console.log('DEV');
		else console.log('PROD');
	}
}
new foo().bar();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 class foo {
 	bar() {
-		console.log('PROD');
+		DEBUG ? console.log('DEV') : console.log('PROD');
 	}
 }
 new foo().bar();

```

## `terser/switch/if_else8`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 101 vs reference 76 (no whitespaces: +25, formatted: +33)

```js
function test(foo) {
	switch (foo) {
		case 'bar': return 'PASS';
		default: return 'FAIL';
	}
}
console.log(test('bar'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 function test(foo) {
-	return 'bar' === foo ? 'PASS' : 'FAIL';
+	switch (foo) {
+		case 'bar': return 'PASS';
+		default: return 'FAIL';
+	}
 }
 console.log(test('bar'));

```

## `terser/collapse_vars/issue_2250_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 44 vs reference 18 (no whitespaces: +26, formatted: +30)

```js
{
	const foo = function() {};
	foo(bar());
}
{
	let foo = function() {};
	foo(bar());
}
{
	var foo = function() {};
	foo(bar());
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 bar();
 bar();
-bar();
+var foo = function() {};
+foo(bar());

```

## `terser/drop_unused/issue_t161_top_retain_4`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 73 vs reference 47 (no whitespaces: +26, formatted: +32)

```js
function f() {
	return 2;
}
function g() {
	return 3;
}
console.log(f(), f(), g(), g());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
 function f() {
 	return 2;
 }
-console.log(f(), f(), 3, 3);
+function g() {
+	return 3;
+}
+console.log(f(), f(), g(), g());

```

## `terser/evaluate/unsafe_charAt`

- size: oxc 72 vs reference 46 (no whitespaces: +26, formatted: +37)

```js
console.log('1234' + 1, '1234'.charAt(0) + 1, '1234'.charAt(6 - 5) + 1, ('12' + '34').charAt(0) + 1, ('12' + '34').charAt(6 - 5) + 1, [
	1,
	2,
	3,
	4
].join('').charAt(0) + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log('12341', '11', '21', '11', '21', '11');
+console.log('12341', '11', '21', '11', '21', [
+	1,
+	2,
+	3,
+	4
+].join('').charAt(0) + 1);

```

## `terser/functions/drop_lone_use_strict_arrows_2`

- tags: `remove unused`, `2 iterations`
- size: oxc 67 vs reference 41 (no whitespaces: +26, formatted: +32)

```js
let f0 = () => 0;
let f1 = () => {
	'use strict';
};
let f2 = () => {
	'use strict';
	let f3 = () => {
		'use strict';
	};
};
(() => {
	'use strict';
	return undefined;
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 let f0 = () => 0;
-let f1 = () => {};
-let f2 = () => {};
+let f1 = () => {
+	'use strict';
+};
+let f2 = () => {
+	'use strict';
+};

```

## `terser/functions/unsafe_call_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 109 vs reference 83 (no whitespaces: +26, formatted: +33)

```js
(function(a, b) {
	console.log(a, b);
}).call('foo', 'bar');
(function(a, b) {
	console.log(this, a, b);
}).call('foo', 'bar');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-console.log('bar', void 0);
 (function(a, b) {
+	console.log(a, b);
+}).call('foo', 'bar');
+(function(a, b) {
 	console.log(this, a, b);
 }).call('foo', 'bar');

```

## `terser/harmony/class_expression_statement_unused_toplevel`

- tags: `remove unused`
- size: oxc 26 vs reference 0 (no whitespaces: +26, formatted: +32)

```js
(class {});
(class NamedClassExpr {});
let expr = class AnotherClassExpr {};
class C {}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+let expr = class {};
+class C {}

```

## `terser/inline/inline_within_extends_1`

- tags: `join vars`, `remove unused`, `1 iteration`
- size: oxc 197 vs reference 171 (no whitespaces: +26, formatted: +39)

```js
(function() {
	function foo(foo_base) {
		return class extends foo_base {};
	}
	function bar(bar_base) {
		return class extends bar_base {};
	}
	console.log(new class extends foo(bar(Array)) {}().concat(['PASS'])[0]);
})();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,9 @@
-console.log(new class extends (function(foo_base) {
-	return class extends foo_base {};
-})((function(bar_base) {
-	return class extends bar_base {};
-})(Array)) {}().concat(['PASS'])[0]);
+(function() {
+	function foo(foo_base) {
+		return class extends foo_base {};
+	}
+	function bar(bar_base) {
+		return class extends bar_base {};
+	}
+	console.log(new class extends foo(bar(Array)) {}().concat(['PASS'])[0]);
+})();

```

## `terser/issue_1212/issue_1212_debug_true`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 78 vs reference 52 (no whitespaces: +26, formatted: +30)

```js
class foo {
	bar() {
		if (DEBUG) console.log('DEV');
		else console.log('PROD');
	}
}
new foo().bar();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
 class foo {
 	bar() {
-		console.log('DEV');
+		DEBUG ? console.log('DEV') : console.log('PROD');
 	}
 }
 new foo().bar();

```

## `terser/issue_281/inner_var_for_in_1`

- tags: `join vars`
- size: oxc 100 vs reference 74 (no whitespaces: +26, formatted: +37)

```js
function f() {
	var a = 1, b = 2;
	for (b in (function() {
		return x(a, b, c);
	})()) {
		var c = 3, d = 4;
		x(a, b, c, d);
	}
	x(a, b, c, d);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
 function f() {
-	var b = 2;
-	for (b in x(1, b, c)) {
+	var a = 1, b = 2;
+	for (b in (function() {
+		return x(a, b, c);
+	})()) {
 		var c = 3, d = 4;
-		x(1, b, c, d);
+		x(a, b, c, d);
 	}
-	x(1, b, c, d);
+	x(a, b, c, d);
 }

```

## `terser/issue_281/negate_iife_issue_1073`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 69 vs reference 43 (no whitespaces: +26, formatted: +34)

```js
new ((function(a) {
	return function Foo() {
		this.x = a;
		console.log(this);
	};
})(7))();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-new function() {
-	this.x = 7, console.log(this);
-}();
+new ((function(a) {
+	return function() {
+		this.x = a, console.log(this);
+	};
+})(7))();

```

## `terser/issue_597/beautify_off_1`

- size: oxc 94 vs reference 68 (no whitespaces: +26, formatted: +22)

```js
var NaN;
console.log(null, undefined, Infinity, NaN, Infinity * undefined, Infinity.toString(), NaN.toString(), (Infinity * undefined).toString());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var NaN;
-console.log(null, void 0, 1 / 0, 0 / 0, 0 / 0, 'Infinity', 'NaN', 'NaN');
+console.log(null, void 0, Infinity, NaN, Infinity * void 0, 'Infinity', NaN.toString(), 'NaN');

```

## `terser/issue_597/beautify_on_1`

- size: oxc 94 vs reference 68 (no whitespaces: +26, formatted: +22)

```js
var NaN;
console.log(null, undefined, Infinity, NaN, Infinity * undefined, Infinity.toString(), NaN.toString(), (Infinity * undefined).toString());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
 var NaN;
-console.log(null, void 0, 1 / 0, 0 / 0, 0 / 0, 'Infinity', 'NaN', 'NaN');
+console.log(null, void 0, Infinity, NaN, Infinity * void 0, 'Infinity', NaN.toString(), 'NaN');

```

## `terser/properties/issue_2208_3`

- size: oxc 74 vs reference 48 (no whitespaces: +26, formatted: +37)

```js
a = 42;
console.log({ p: function() {
	return (function() {
		return this.a;
	})();
} }.p());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 a = 42;
-console.log((function() {
-	return this.a;
-})());
+console.log({ p: function() {
+	return (function() {
+		return this.a;
+	})();
+} }.p());

```

## `terser/properties/join_object_assignments_Infinity`

- tags: `join vars`
- size: oxc 110 vs reference 84 (no whitespaces: +26, formatted: +29)

```js
var o = {};
o[Infinity] = 1;
o[1 / 0] = 2;
o[-Infinity] = 3;
o[-1 / 0] = 4;
console.log(o[Infinity], o[1 / 0], o[-Infinity], o[-1 / 0]);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
-var o = {
-	Infinity: (1, 2),
-	'-Infinity': (3, 4)
-};
-console.log(o[1 / 0], o[1 / 0], o[-1 / 0], o[-1 / 0]);
+var o = {};
+o[Infinity] = 1;
+o[1 / 0] = 2;
+o[-Infinity] = 3;
+o[-1 / 0] = 4;
+console.log(o[Infinity], o[1 / 0], o[-Infinity], o[-1 / 0]);

```

## `terser/reduce_vars/issue_2406_2`

- tags: `join vars`, `remove unused`
- size: oxc 141 vs reference 115 (no whitespaces: +26, formatted: +35)

```js
const c = { fn: function() {
	return this;
} };
let l = { fn: function() {
	return this;
} };
var v = { fn: function() {
	return this;
} };
console.log(c.fn(), l.fn(), v.fn());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
-console.log({ fn: function() {
+const c = { fn: function() {
 	return this;
-} }.fn(), { fn: function() {
+} };
+let l = { fn: function() {
 	return this;
-} }.fn(), { fn: function() {
+} };
+var v = { fn: function() {
 	return this;
-} }.fn());
+} };
+console.log(c.fn(), l.fn(), v.fn());

```

## `terser/reduce_vars/issue_2919`

- tags: `join vars`, `remove unused`
- size: oxc 50 vs reference 24 (no whitespaces: +26, formatted: +30)

```js
var arr = [function() {}];
console.log(typeof arr[0]);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('function');
+var arr = [function() {}];
+console.log(typeof arr[0]);

```

## `terser/reduce_vars/issue_308`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 208 vs reference 182 (no whitespaces: +26, formatted: +34)

```js
exports.withStyles = withStyles;
function _inherits(superClass) {
	if (typeof superClass !== 'function') {
		throw new TypeError();
	}
	Object.create(superClass);
}
function withStyles() {
	var a = EXTERNAL();
	return (function(_a) {
		_inherits(_a);
		function d() {}
	})(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,10 @@
+exports.withStyles = withStyles;
 function _inherits(superClass) {
-	if ('function' != typeof superClass) throw TypeError();
+	if (typeof superClass != 'function') throw TypeError();
 	Object.create(superClass);
 }
 function withStyles() {
-	_inherits(EXTERNAL());
+	return (function(_a) {
+		_inherits(_a);
+	})(EXTERNAL());
 }
-exports.withStyles = withStyles;

```

## `terser/switch/issue_1679`

- tags: `sequences`
- size: oxc 136 vs reference 110 (no whitespaces: +26, formatted: +50)

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
@@ -2,10 +2,14 @@
 function f() {
 	switch (--b) {
 		default:
-		case false: break;
-		case b--: a--;
+		case !1: break;
+		case b--:
+			switch (0) {
+				default:
+				case a--:
+			}
+			break;
 		case a++:
 	}
 }
-f();
-console.log(a, b);
+f(), console.log(a, b);

```

## `terser/template_string/tagged_template_function_inline_3`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 26 vs reference 0 (no whitespaces: +26, formatted: +29)

```js
function tpl() {}
tpl`test`;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+function tpl() {}
+tpl`test`;

```

## `terser/dead_code/issue_2860_2`

- tags: `join vars`, `2 iterations`
- size: oxc 42 vs reference 15 (no whitespaces: +27, formatted: +34)

```js
console.log((function(a) {
	return a ^= 1;
})());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(1);
+console.log((function(a) {
+	return a ^= 1;
+})());

```

## `terser/destructuring/unused_destructuring_decl_1`

- tags: `remove unused`, `pure getters`
- size: oxc 72 vs reference 45 (no whitespaces: +27, formatted: +44)

```js
let { x: L, y } = { x: 2 };
var { U: u, V } = { V: 3 };
const { C, D } = {
	C: 1,
	D: 4
};
console.log(L, V);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-let { x: L } = { x: 2 };
-var { V } = { V: 3 };
+let { x: L, y } = { x: 2 };
+var { U: u, V } = { V: 3 };
+const { C, D } = {
+	C: 1,
+	D: 4
+};
 console.log(L, V);

```

## `terser/drop_unused/issue_2768`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 90 vs reference 63 (no whitespaces: +27, formatted: +42)

```js
var a = 'FAIL', c = 1;
var c = (function(b) {
	var d = b = a;
	var e = --b + (d && (a = 'PASS'));
})();
console.log(a, typeof c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
-var a = 'FAIL';
-var c = void (a && (a = 'PASS'));
+var a = 'FAIL', c = 1, c = (function(b) {
+	var d = b = a;
+	--b + (d && (a = 'PASS'));
+})();
 console.log(a, typeof c);

```

## `terser/harmony/issue_2874_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 172 vs reference 145 (no whitespaces: +27, formatted: +43)

```js
(function() {
	function foo() {
		let letters = [
			'A',
			'B',
			'C'
		];
		let result = [
			2,
			1,
			0
		].map((key) => bar(letters[key] + key));
		return result;
	}
	function bar(value) {
		return () => console.log(value);
	}
	foo().map((fn) => fn());
})();

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,18 @@
 (function() {
-	let letters = [
-		'A',
-		'B',
-		'C'
-	];
-	return [
-		2,
-		1,
-		0
-	].map((key) => {
-		return value = letters[key] + key, () => console.log(value);
-		var value;
-	});
-})().map((fn) => fn());
+	function foo() {
+		let letters = [
+			'A',
+			'B',
+			'C'
+		];
+		return [
+			2,
+			1,
+			0
+		].map((key) => bar(letters[key] + key));
+	}
+	function bar(value) {
+		return () => console.log(value);
+	}
+	foo().map((fn) => fn());
+})();

```

## `terser/issue_281/issue_1595_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 32 vs reference 5 (no whitespaces: +27, formatted: +34)

```js
(function f(a) {
	return g(a + 1);
})(2);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-g(3);
+(function(a) {
+	return g(a + 1);
+})(2);

```

## `terser/loops/issue_2740_4`

- tags: `2 iterations`
- size: oxc 72 vs reference 45 (no whitespaces: +27, formatted: +35)

```js
L1: for (var x = 0; x < 3; x++) {
	L2: for (var y = 0; y < 2; y++) {
		break L2;
	}
}
console.log(x, y);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-for (var x = 0; x < 3; x++) var y = 0;
+L1: for (var x = 0; x < 3; x++) L2: for (var y = 0; y < 2; y++) break L2;
 console.log(x, y);

```

## `terser/properties/issue_2208_1`

- size: oxc 43 vs reference 16 (no whitespaces: +27, formatted: +35)

```js
console.log({ p: function() {
	return 42;
} }.p());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(42);
+console.log({ p: function() {
+	return 42;
+} }.p());

```

## `terser/properties/unsafe_methods_regex`

- size: oxc 328 vs reference 301 (no whitespaces: +27, formatted: +30)

```js
var f = {
	123: function() {
		console.log('123');
	},
	foo: function() {
		console.log('foo');
	},
	bar() {
		console.log('bar');
	},
	Baz: function() {
		console.log('baz');
	},
	BOO: function() {
		console.log('boo');
	},
	null: function() {
		console.log('null');
	},
	undefined: function() {
		console.log('undefined');
	}
};
f[123]();
new f.foo();
f.bar();
f.Baz();
f.BOO();
new f.null();
new f.undefined();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 var f = {
-	123() {
+	123: function() {
 		console.log('123');
 	},
 	foo: function() {
@@ -8,10 +8,10 @@
 	bar() {
 		console.log('bar');
 	},
-	Baz() {
+	Baz: function() {
 		console.log('baz');
 	},
-	BOO() {
+	BOO: function() {
 		console.log('boo');
 	},
 	null: function() {

```

## `terser/reduce_vars/defun_inline_3`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 49 vs reference 22 (no whitespaces: +27, formatted: +35)

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
@@ -1,3 +1,6 @@
 function f() {
-	return 2;
+	return g(2);
+	function g(b) {
+		return b;
+	}
 }

```

## `terser/reduce_vars/issue_1595_2`

- tags: `join vars`, `remove unused`
- size: oxc 32 vs reference 5 (no whitespaces: +27, formatted: +34)

```js
(function f(a) {
	return g(a + 1);
})(2);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-g(3);
+(function(a) {
+	return g(a + 1);
+})(2);

```

## `terser/reduce_vars/issue_1595_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 32 vs reference 5 (no whitespaces: +27, formatted: +34)

```js
(function f(a) {
	return g(a + 1);
})(2);

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-g(3);
+(function(a) {
+	return g(a + 1);
+})(2);

```

## `terser/reduce_vars/issue_2836`

- tags: `join vars`, `remove unused`
- size: oxc 69 vs reference 42 (no whitespaces: +27, formatted: +35)

```js
function f() {
	return 'FAIL';
}
console.log(f());
function f() {
	return 'PASS';
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-console.log((function() {
+function f() {
+	return 'FAIL';
+}
+console.log(f());
+function f() {
 	return 'PASS';
-})());
+}

```

## `terser/reduce_vars/issue_2860_2`

- tags: `join vars`, `2 iterations`
- size: oxc 42 vs reference 15 (no whitespaces: +27, formatted: +34)

```js
console.log((function(a) {
	return a ^= 1;
	a ^= 2;
})());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(1);
+console.log((function(a) {
+	return a ^= 1;
+})());

```

## `terser/reduce_vars/issue_3042_2`

- tags: `join vars`, `remove unused`
- size: oxc 428 vs reference 401 (no whitespaces: +27, formatted: +28)

```js
function Foo() {
	this.isFoo = function(o) {
		return o instanceof Foo;
	};
}
function FooCollection() {
	this.foos = [1, 1].map(function() {
		return new Foo();
	});
}
var fooCollection = new FooCollection();
console.log(fooCollection.foos[0].isFoo(fooCollection.foos[0]));
console.log(fooCollection.foos[0].isFoo(fooCollection.foos[1]));
console.log(fooCollection.foos[1].isFoo(fooCollection.foos[0]));
console.log(fooCollection.foos[1].isFoo(fooCollection.foos[1]));

```

```diff
--- reference
+++ oxc
@@ -3,11 +3,12 @@
 		return o instanceof Foo;
 	};
 }
-var fooCollection = new function() {
+function FooCollection() {
 	this.foos = [1, 1].map(function() {
 		return new Foo();
 	});
-}();
+}
+var fooCollection = new FooCollection();
 console.log(fooCollection.foos[0].isFoo(fooCollection.foos[0]));
 console.log(fooCollection.foos[0].isFoo(fooCollection.foos[1]));
 console.log(fooCollection.foos[1].isFoo(fooCollection.foos[0]));

```

## `terser/arrow/call_args`

- tags: `join vars`
- size: oxc 53 vs reference 25 (no whitespaces: +28, formatted: +34)

```js
const a = 1;
console.log(a);
+(function(a) {
	return a;
})(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
 const a = 1;
 console.log(1);
++(function(a) {
+	return a;
+})(1);

```

## `terser/arrow/call_args_drop_param`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 27 (no whitespaces: +28, formatted: +34)

```js
const a = 1;
console.log(a);
+(function(a) {
	return a;
})(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 const a = 1;
 console.log(1);
-b;
++(function(a) {
+	return a;
+})(1, b);

```

## `terser/comments/preserve_comments_by_default`

- size: oxc 86 vs reference 58 (no whitespaces: +28, formatted: +28)

```js
var foo = {};
/* @license */
// @lic
/**! foo */
/*! foo */
/* @copyright …info… */

```

```diff
--- reference
+++ oxc
@@ -3,3 +3,4 @@
 // @lic
 /**! foo */
 /*! foo */
+/* @copyright …info… */

```

## `terser/conditionals/issue_2560`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 146 vs reference 118 (no whitespaces: +28, formatted: +34)

```js
function log(x) {
	console.log(x);
}
function foo() {
	return log;
}
function bar() {
	if (x !== (x = foo())) {
		x(1);
	} else {
		x(2);
	}
}
var x = function() {
	console.log('init');
};
bar();
bar();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
 function log(x) {
 	console.log(x);
 }
+function foo() {
+	return log;
+}
 function bar() {
-	x !== (x = log) ? x(1) : x(2);
+	x === (x = foo()) ? x(2) : x(1);
 }
 var x = function() {
 	console.log('init');
 };
-bar();
-bar();
+bar(), bar();

```

## `terser/dead_code/dead_code_const_annotation_complex_scope`

- tags: `join vars`, `sequences`
- size: oxc 160 vs reference 132 (no whitespaces: +28, formatted: +35)

```js
var unused_var;
/** @const */ var test = 'test';
// @const
var CONST_FOO_ANN = false;
var unused_var_2;
if (CONST_FOO_ANN) {
	console.log('unreachable');
	var moo;
	function bar() {}
}
if (test === 'test') {
	var beef = 'good';
	/** @const */ var meat = 'beef';
	var pork = 'bad';
	if (meat === 'pork') {
		console.log('also unreachable');
	} else if (pork === 'good') {
		console.log('reached, not const');
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,9 +1,7 @@
-var unused_var;
-var test = 'test';
-var CONST_FOO_ANN = !1;
-var unused_var_2;
-var moo;
-var bar;
-var beef = 'good';
-var meat = 'beef';
-var pork = 'bad';
+var unused_var, test = 'test', CONST_FOO_ANN = !1, unused_var_2;
+if (CONST_FOO_ANN) {
+	console.log('unreachable');
+	var moo;
+	function bar() {}
+}
+if (test === 'test') var beef = 'good';

```

## `terser/evaluate/call_args`

- tags: `join vars`
- size: oxc 53 vs reference 25 (no whitespaces: +28, formatted: +34)

```js
const a = 1;
console.log(a);
+(function(a) {
	return a;
})(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
 const a = 1;
 console.log(1);
++(function(a) {
+	return a;
+})(1);

```

## `terser/evaluate/call_args_drop_param`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 27 (no whitespaces: +28, formatted: +34)

```js
const a = 1;
console.log(a);
+(function(a) {
	return a;
})(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,5 @@
 const a = 1;
 console.log(1);
-b;
++(function(a) {
+	return a;
+})(1, b);

```

## `terser/hoist_props/direct_access_2`

- tags: `join vars`, `remove unused`
- size: oxc 68 vs reference 40 (no whitespaces: +28, formatted: +39)

```js
var o = { a: 1 };
var f = function(k) {
	if (o[k]) return 'PASS';
};
console.log(f('a'));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-console.log(function() {
-	return 'PASS';
-}());
+var o = { a: 1 }, f = function(k) {
+	if (o[k]) return 'PASS';
+};
+console.log(f('a'));

```

## `terser/switch/issue_1083_3`

- size: oxc 176 vs reference 148 (no whitespaces: +28, formatted: +44)

```js
function test(definitely_true, maybe_true) {
	switch (true) {
		case maybe_true:
			console.log('maybe');
			break;
		default:
		case definitely_true:
			console.log('definitely');
			break;
	}
}
test(true, false);
test(true, true);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,11 @@
 function test(definitely_true, maybe_true) {
-	if (true === maybe_true) console.log('maybe');
-	else console.log('definitely');
+	switch (!0) {
+		case maybe_true:
+			console.log('maybe');
+			break;
+		default:
+		case definitely_true: console.log('definitely');
+	}
 }
-test(true, false);
-test(true, true);
+test(!0, !1);
+test(!0, !0);

```

## `terser/switch/issue_1083_4`

- size: oxc 176 vs reference 148 (no whitespaces: +28, formatted: +44)

```js
function test(definitely_true, maybe_true) {
	switch (true) {
		case maybe_true:
			console.log('maybe');
			break;
		case definitely_true:
		default:
			console.log('definitely');
			break;
	}
}
test(true, false);
test(true, true);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,11 @@
 function test(definitely_true, maybe_true) {
-	if (true === maybe_true) console.log('maybe');
-	else console.log('definitely');
+	switch (!0) {
+		case maybe_true:
+			console.log('maybe');
+			break;
+		case definitely_true:
+		default: console.log('definitely');
+	}
 }
-test(true, false);
-test(true, true);
+test(!0, !1);
+test(!0, !0);

```

## `terser/typeof/issue_2728_3`

- tags: `join vars`
- size: oxc 68 vs reference 40 (no whitespaces: +28, formatted: +31)

```js
(function() {
	function arguments() {}
	console.log(typeof arguments);
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
 (function() {
-	console.log('function');
+	function arguments() {}
+	console.log(typeof arguments);
 })();

```

## `terser/typeof/issue_2728_4`

- tags: `join vars`
- size: oxc 52 vs reference 24 (no whitespaces: +28, formatted: +30)

```js
function arguments() {}
console.log(typeof arguments);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('function');
+function arguments() {}
+console.log(typeof arguments);

```

## `terser/class_properties/class_expression_properties_side_effects`

- tags: `remove unused`
- size: oxc 88 vs reference 59 (no whitespaces: +29, formatted: +41)

```js
global.side = () => {
	console.log('PASS');
};
(class {
	static foo = side();
	[side()]() {}
	[side()] = 4;
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 global.side = () => {
 	console.log('PASS');
 };
-side(), side(), side();
+(class {
+	static foo = side();
+	[side()]() {}
+	[side()] = 4;
+});

```

## `terser/evaluate/pow_with_number_constants`

- size: oxc 174 vs reference 145 (no whitespaces: +29, formatted: +31)

```js
var a = 5 ** NaN;
var b = 42 ** +0;
var c = 42 ** -0;
var d = NaN ** 1;
var e = 2 ** Infinity;
var f = 2 ** -Infinity;
var g = (-7) ** .5;
var h = 2324334 ** 34343443;
var i = (-2324334) ** 34343443;
var j = 2 ** -3;
var k = 2 ** -3;
var l = 2 ** (5 - 7);
var m = 3 ** -10;

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,13 @@
-var a = 0 / 0;
+var a = NaN;
 var b = 1;
 var c = 1;
-var d = 0 / 0;
-var e = 1 / 0;
+var d = NaN;
+var e = Infinity;
 var f = 0;
-var g = 0 / 0;
-var h = 1 / 0;
-var i = -1 / 0;
-var j = .125;
-var k = .125;
-var l = .25;
-var m = 16935087808430286e-21;
+var g = (-7) ** .5;
+var h = 2324334 ** 34343443;
+var i = (-2324334) ** 34343443;
+var j = 2 ** -3;
+var k = 2 ** -3;
+var l = 2 ** -2;
+var m = 3 ** -10;

```

## `terser/functions/inline_loop_3`

- tags: `join vars`, `remove unused`
- size: oxc 40 vs reference 11 (no whitespaces: +29, formatted: +37)

```js
var f = function() {
	return x();
};
for (;;) f();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-for (;;) x();
+var f = function() {
+	return x();
+};
+for (;;) f();

```

## `terser/global_defs/issue_2167`

- tags: `sequences`, `2 iterations`
- size: oxc 38 vs reference 9 (no whitespaces: +29, formatted: +32)

```js
if (isDevMode()) {
	greetOverlord();
}
doWork();

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-doWork();
+isDevMode() && greetOverlord(), doWork();

```

## `terser/harmony/array_literal_with_spread_2b`

- size: oxc 242 vs reference 213 (no whitespaces: +29, formatted: +47)

```js
var x = [30, 40];
console.log([
	10,
	...[],
	20,
	...x,
	50
]['length']);
console.log([
	10,
	...[],
	20,
	...x,
	50
][0]);
console.log([
	10,
	...[],
	20,
	...x,
	50
][1]);
console.log([
	10,
	...[],
	20,
	...x,
	50
][2]);
console.log([
	10,
	...[],
	20,
	...x,
	50
][3]);
console.log([
	10,
	...[],
	20,
	...x,
	50
][4]);
console.log([
	10,
	...[],
	20,
	...x,
	50
][5]);

```

```diff
--- reference
+++ oxc
@@ -4,9 +4,19 @@
 	20,
 	...x,
 	50
-]['length']);
-console.log(10);
-console.log(20);
+].length);
+console.log([
+	10,
+	20,
+	...x,
+	50
+][0]);
+console.log([
+	10,
+	20,
+	...x,
+	50
+][1]);
 console.log([
 	10,
 	20,

```

## `terser/issue_281/issue_1758`

- tags: `sequences`
- size: oxc 90 vs reference 61 (no whitespaces: +29, formatted: +41)

```js
console.log((function(c) {
	var undefined = 42;
	return (function() {
		c--;
		c--, c.toString();
		return;
	})();
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
-console.log(function(c) {
-	return c--, c--, void c.toString();
-}());
+console.log((function(c) {
+	var undefined = 42;
+	return (function() {
+		c--, c--, c.toString();
+	})();
+})());

```

## `terser/reduce_vars/var_assign_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 44 vs reference 15 (no whitespaces: +29, formatted: +40)

```js
!(function() {
	var a;
	if (a = 2) console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(2);
+(function() {
+	var a;
+	(a = 2) && console.log(a);
+})();

```

## `terser/arrow/issue_2136_2`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 34 (no whitespaces: +30, formatted: +38)

```js
function f(x) {
	console.log(x);
}
!(function(a, ...b) {
	f(b[0]);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 function f(x) {
 	console.log(x);
 }
-f(2);
+(function(a, ...b) {
+	f(b[0]);
+})(1, 2, 3);

```

## `terser/drop_unused/issue_2136_2`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 34 (no whitespaces: +30, formatted: +38)

```js
function f(x) {
	console.log(x);
}
!(function(a, ...b) {
	f(b[0]);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 function f(x) {
 	console.log(x);
 }
-f(2);
+(function(a, ...b) {
+	f(b[0]);
+})(1, 2, 3);

```

## `terser/drop_unused/issue_t161_top_retain_13`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 80 vs reference 50 (no whitespaces: +30, formatted: +46)

```js
const f = () => x;
const g = () => y;
const h = () => z;
const x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-const g = () => y, y = 3;
-console.log(2, 3, 4, 6, 8, 12, 2, 3, 4);
+const f = () => x, g = () => y, h = () => z, x = 2, y = 3, z = 4;
+console.log(2, 3, 4, 6, 8, 12, f(), g(), h());

```

## `terser/evaluate/unsafe_integer_key`

- size: oxc 82 vs reference 52 (no whitespaces: +30, formatted: +46)

```js
console.log({ 0: 1 } + 1, { 0: 1 }[0] + 1, { 0: 1 }['0'] + 1, { 0: 1 }[1] + 1, { 0: 1 }[0][1] + 1, { 0: 1 }[0]['1'] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log({ 0: 1 } + 1, 2, 2, { 0: 1 }[1] + 1, 1[1] + 1, 1['1'] + 1);
+console.log({ 0: 1 } + 1, { 0: 1 }[0] + 1, { 0: 1 }[0] + 1, { 0: 1 }[1] + 1, { 0: 1 }[0][1] + 1, { 0: 1 }[0][1] + 1);

```

## `terser/issue_2719/warn`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 92 vs reference 62 (no whitespaces: +30, formatted: +39)

```js
function f() {
	return g();
}
function g() {
	return g['call' + 'er'].arguments;
}
console.log(f(1, 2, 3).length);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-console.log(function g() {
+function f() {
+	return g();
+}
+function g() {
 	return g.caller.arguments;
-}().length);
+}
+console.log(f(1, 2, 3).length);

```

## `terser/issue_281/issue_1254_negate_iife_nested`

- size: oxc 63 vs reference 33 (no whitespaces: +30, formatted: +42)

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
@@ -1 +1,5 @@
-(void console.log('test'))()()();
+(function() {
+	return function() {
+		console.log('test');
+	};
+})()()()()();

```

## `terser/negate_iife/negate_iife_2_side_effects`

- size: oxc 30 vs reference 0 (no whitespaces: +30, formatted: +39)

```js
(function() {
	return {};
})().x = 10;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+(function() {
+	return {};
+})().x = 10;

```

## `terser/pure_funcs/relational`

- tags: `pure functions`
- size: oxc 66 vs reference 36 (no whitespaces: +30, formatted: +33)

```js
foo() in foo();
foo() instanceof bar();
foo() < 'bar';
bar() > foo();
bar() != bar();
bar() !== 'bar';
'bar' == foo();
'bar' === bar();
'bar' >= 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-bar();
+foo() in foo();
+foo() instanceof bar();
 bar();
 bar(), bar();
 bar();

```

## `terser/drop_unused/issue_2516_1`

- tags: `join vars`, `remove unused`
- size: oxc 188 vs reference 157 (no whitespaces: +31, formatted: +39)

```js
function foo() {
	function qux(x) {
		bar.call(null, x);
	}
	function bar(x) {
		var FOUR = 4;
		var trouble = x || never_called();
		var value = (FOUR - 1) * trouble;
		console.log(value == 6 ? 'PASS' : value);
	}
	Baz = qux;
}
var Baz;
foo();
Baz(2);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,12 @@
 function foo() {
+	function qux(x) {
+		bar.call(null, x);
+	}
 	function bar(x) {
-		var value = (4 - 1) * (x || never_called());
-		console.log(6 == value ? 'PASS' : value);
+		var FOUR = 4, trouble = x || never_called(), value = (FOUR - 1) * trouble;
+		console.log(value == 6 ? 'PASS' : value);
 	}
-	Baz = function(x) {
-		bar.call(null, x);
-	};
+	Baz = qux;
 }
 var Baz;
 foo();

```

## `terser/drop_unused/issue_2516_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 188 vs reference 157 (no whitespaces: +31, formatted: +39)

```js
function foo() {
	function qux(x) {
		bar.call(null, x);
	}
	function bar(x) {
		var FOUR = 4;
		var trouble = x || never_called();
		var value = (FOUR - 1) * trouble;
		console.log(value == 6 ? 'PASS' : value);
	}
	Baz = qux;
}
var Baz;
foo();
Baz(2);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,12 @@
 function foo() {
+	function qux(x) {
+		bar.call(null, x);
+	}
 	function bar(x) {
-		var value = (4 - 1) * (x || never_called());
-		console.log(6 == value ? 'PASS' : value);
+		var FOUR = 4, trouble = x || never_called(), value = (FOUR - 1) * trouble;
+		console.log(value == 6 ? 'PASS' : value);
 	}
-	Baz = function(x) {
-		bar.call(null, x);
-	};
+	Baz = qux;
 }
 var Baz;
 foo();

```

## `terser/functions/issue_203`

- tags: `remove unused`
- size: oxc 122 vs reference 91 (no whitespaces: +31, formatted: +33)

```js
var m = {};
var fn = Function('require', 'module', 'exports', 'module.exports = 42;');
fn(null, m, m.exports);
console.log(m.exports);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,4 @@
 var m = {};
-var fn = Function('n,o', 'o.exports=42');
+var fn = Function('require', 'module', 'exports', 'module.exports = 42;');
 fn(null, m, m.exports);
 console.log(m.exports);

```

## `terser/harmony/issue_2794_2`

- tags: `mangle`, `keep function names`, `keep class names`, `join vars`, `remove unused`, `1 iteration`
- size: oxc 158 vs reference 127 (no whitespaces: +31, formatted: +39)

```js
function foo() {
	for (const a of func(value)) {
		console.log(a);
	}
	function func(va) {
		return doSomething(va);
	}
}
function doSomething(x) {
	return [
		x,
		2 * x,
		3 * x
	];
}
const value = 10;
foo();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,14 @@
 function foo() {
-	for (const o of doSomething(value)) console.log(o);
+	for (let e of func(value)) console.log(e);
+	function func(e) {
+		return doSomething(e);
+	}
 }
-function doSomething(o) {
+function doSomething(e) {
 	return [
-		o,
-		2 * o,
-		3 * o
+		e,
+		2 * e,
+		3 * e
 	];
 }
 const value = 10;

```

## `terser/hoist_props/undefined_key`

- tags: `join vars`, `remove unused`, `4 iterations`
- size: oxc 46 vs reference 15 (no whitespaces: +31, formatted: +43)

```js
var a, o = {};
o[a] = 1;
o.b = 2;
console.log(o[a] + o.b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(3);
+var a, o = {};
+o[a] = 1;
+o.b = 2;
+console.log(o[a] + o.b);

```

## `terser/issue_281/wrap_iife_in_return_call`

- size: oxc 60 vs reference 29 (no whitespaces: +31, formatted: +44)

```js
(function() {
	return (function() {
		console.log('test');
	})();
})()();

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-(void console.log('test'))();
+(function() {
+	return (function() {
+		console.log('test');
+	})();
+})()();

```

## `terser/template_string/tagged_template_function_inline_2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 31 vs reference 0 (no whitespaces: +31, formatted: +36)

```js
var tpl = function() {};
tpl`test`;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+var tpl = function() {};
+tpl`test`;

```

## `terser/evaluate/self_comparison_1`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 44 (no whitespaces: +32, formatted: +46)

```js
var o = { n: NaN };
console.log(typeof o.n, o.n == o.n, o.n === o.n, o.n != o.n, o.n !== o.n);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('number', false, false, true, true);
+var o = { n: NaN };
+console.log(typeof o.n, o.n == o.n, o.n === o.n, o.n != o.n, o.n !== o.n);

```

## `terser/evaluate/self_comparison_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 76 vs reference 44 (no whitespaces: +32, formatted: +46)

```js
var o = { n: NaN };
console.log(typeof o.n, o.n == o.n, o.n === o.n, o.n != o.n, o.n !== o.n);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log('number', false, false, true, true);
+var o = { n: NaN };
+console.log(typeof o.n, o.n == o.n, o.n === o.n, o.n != o.n, o.n !== o.n);

```

## `terser/export/module_mangle_export_default_function`

- tags: `type:module`, `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 125 vs reference 93 (no whitespaces: +32, formatted: +38)

```js
export default function foo() {
	return 1;
}
export function bar() {
	return 2;
}
function qux() {
	return 3;
}
console.log(foo(), bar(), qux());

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
-export default function r() {
+export default function foo() {
 	return 1;
 }
 export function bar() {
 	return 2;
 }
-console.log(r(), bar(), 3);
+function qux() {
+	return 3;
+}
+console.log(foo(), bar(), qux());

```

## `terser/functions/unsafe_apply_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 176 vs reference 144 (no whitespaces: +32, formatted: +39)

```js
(function(a, b) {
	console.log(a, b);
}).apply('foo', ['bar']);
(function(a, b) {
	console.log(this, a, b);
}).apply('foo', ['bar']);
(function(a, b) {
	console.log(a, b);
}).apply('foo', ['bar'], 'baz');

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
-console.log('bar', void 0);
 (function(a, b) {
+	console.log(a, b);
+}).apply('foo', ['bar']);
+(function(a, b) {
 	console.log(this, a, b);
-}).call('foo', 'bar');
+}).apply('foo', ['bar']);
 (function(a, b) {
 	console.log(a, b);
 }).apply('foo', ['bar'], 'baz');

```

## `terser/identity/inline_identity_function`

- tags: `join vars`, `remove unused`
- size: oxc 49 vs reference 17 (no whitespaces: +32, formatted: +38)

```js
function id(x) {
	return x;
}
console.log(id(1), id(2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(1, 2);
+function id(x) {
+	return x;
+}
+console.log(id(1), id(2));

```

## `terser/inline/inline_annotation`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 22 (no whitespaces: +32, formatted: +38)

```js
function inline() {
	return external();
}
inline();
inline();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,5 @@
-external();
-external();
+function inline() {
+	return external();
+}
+inline();
+inline();

```

## `terser/issue_281/wrap_iife`

- size: oxc 57 vs reference 25 (no whitespaces: +32, formatted: +44)

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
@@ -1 +1,5 @@
-void console.log('test');
+(function() {
+	return function() {
+		console.log('test');
+	};
+})()();

```

## `terser/issue_t120/pr_152_regression`

- tags: `join vars`, `sequences`, `remove unused`, `1 iteration`
- size: oxc 244 vs reference 212 (no whitespaces: +32, formatted: +38)

```js
(function(root, factory) {
	root.CryptoJS = factory();
})(this, function() {
	var CryptoJS = CryptoJS || (function(Math) {
		var C = {};
		C.demo = function(n) {
			return Math.ceil(n);
		};
		return C;
	})(Math);
	return CryptoJS;
});
var result = this.CryptoJS.demo(1.3);
console.log(result);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
 (function(root, factory) {
-	var CryptoJS;
-	root.CryptoJS = CryptoJS = CryptoJS || (function(Math) {
-		var C = { demo: function(n) {
+	root.CryptoJS = factory();
+})(this, function() {
+	var CryptoJS = CryptoJS || (function(Math) {
+		var C = {};
+		return C.demo = function(n) {
 			return Math.ceil(n);
-		} };
-		return C;
+		}, C;
 	})(Math);
-})(this);
+	return CryptoJS;
+});
 var result = this.CryptoJS.demo(1.3);
 console.log(result);

```

## `terser/reduce_vars/perf_1`

- tags: `join vars`, `remove unused`
- size: oxc 168 vs reference 136 (no whitespaces: +32, formatted: +32)

```js
function foo(x, y, z) {
	return x < y ? x * y + z : x * z - y;
}
function indirect_foo(x, y, z) {
	return foo(x, y, z);
}
var sum = 0;
for (var i = 0; i < 100; ++i) {
	sum += indirect_foo(i, i + 1, 3 * i);
}
console.log(sum);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
+function foo(x, y, z) {
+	return x < y ? x * y + z : x * z - y;
+}
+function indirect_foo(x, y, z) {
+	return foo(x, y, z);
+}
 var sum = 0;
-for (var i = 0; i < 100; ++i) sum += function(x, y, z) {
-	return function(x, y, z) {
-		return x < y ? x * y + z : x * z - y;
-	}(x, y, z);
-}(i, i + 1, 3 * i);
+for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `terser/reduce_vars/perf_5`

- tags: `join vars`, `remove unused`, `10 iterations`
- size: oxc 168 vs reference 136 (no whitespaces: +32, formatted: +35)

```js
function indirect_foo(x, y, z) {
	function foo(x, y, z) {
		return x < y ? x * y + z : x * z - y;
	}
	return foo(x, y, z);
}
var sum = 0;
for (var i = 0; i < 100; ++i) {
	sum += indirect_foo(i, i + 1, 3 * i);
}
console.log(sum);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
+function indirect_foo(x, y, z) {
+	function foo(x, y, z) {
+		return x < y ? x * y + z : x * z - y;
+	}
+	return foo(x, y, z);
+}
 var sum = 0;
-for (var i = 0; i < 100; ++i) sum += function(x, y, z) {
-	return function(x, y, z) {
-		return x < y ? x * y + z : x * z - y;
-	}(x, y, z);
-}(i, i + 1, 3 * i);
+for (var i = 0; i < 100; ++i) sum += indirect_foo(i, i + 1, 3 * i);
 console.log(sum);

```

## `terser/typeof/typeof_in_boolean_context`

- tags: `sequences`
- size: oxc 143 vs reference 111 (no whitespaces: +32, formatted: +39)

```js
function f1(x) {
	return typeof x ? 'yes' : 'no';
}
function f2() {
	return typeof g() ? 'Yes' : 'No';
}
typeof 0 ? foo() : bar();
!typeof console.log(1);
var a = !typeof console.log(2);
if (typeof (1 + foo()));

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
 function f1(x) {
-	return 'yes';
+	return typeof x ? 'yes' : 'no';
 }
 function f2() {
-	return g(), 'Yes';
+	return typeof g() ? 'Yes' : 'No';
 }
-foo();
-console.log(1);
-var a = (console.log(2), !1);
-foo();
+foo(), console.log(1);
+var a = !typeof console.log(2);
+1 + foo();

```

## `terser/drop_unused/issue_t161_top_retain_12`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 125 vs reference 92 (no whitespaces: +33, formatted: +48)

```js
function f() {
	return x;
}
function g() {
	return y;
}
function h() {
	return z;
}
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,11 @@
+function f() {
+	return x;
+}
 function g() {
 	return y;
 }
 function h() {
 	return z;
 }
-var y = 3, z = 4;
-console.log(2, 3, 4, 6, 8, 12, 2, g(), h());
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

## `terser/harmony/issue_2794_1`

- tags: `join vars`, `remove unused`, `1 iteration`
- size: oxc 160 vs reference 127 (no whitespaces: +33, formatted: +41)

```js
function foo() {
	for (const a of func(value)) {
		console.log(a);
	}
	function func(va) {
		return doSomething(va);
	}
}
function doSomething(x) {
	return [
		x,
		2 * x,
		3 * x
	];
}
const value = 10;
foo();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
 function foo() {
-	for (const a of doSomething(value)) console.log(a);
+	for (let a of func(value)) console.log(a);
+	function func(va) {
+		return doSomething(va);
+	}
 }
 function doSomething(x) {
 	return [

```

## `terser/arrow/issue_485_crashing_1530`

- tags: `sequences`
- size: oxc 34 vs reference 0 (no whitespaces: +34, formatted: +42)

```js
(function(a) {
	if (true) return;
	var b = 42;
})(this);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function(a) {
+	return;
+	var b;
+})(this);

```

## `terser/class_properties/static_means_execution`

- tags: `join vars`, `remove unused`
- size: oxc 178 vs reference 144 (no whitespaces: +34, formatted: +36)

```js
let x = 0;
class NoProps {}
class WithProps {
	prop = x = x === 1 ? 'PASS' : 'FAIL';
}
class WithStaticProps {
	static prop = x = x === 0 ? 1 : 'FAIL';
}
new NoProps();
new WithProps();
new WithStaticProps();
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,12 @@
 let x = 0;
+class NoProps {}
+class WithProps {
+	prop = x = x === 1 ? 'PASS' : 'FAIL';
+}
 class WithStaticProps {
-	static prop = x = 0 === x ? 1 : 'FAIL';
+	static prop = x = x === 0 ? 1 : 'FAIL';
 }
-new class {}();
-new class {
-	prop = x = 1 === x ? 'PASS' : 'FAIL';
-}();
+new NoProps();
+new WithProps();
 new WithStaticProps();
 console.log(x);

```

## `terser/collapse_vars/cond_branch_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 204 vs reference 170 (no whitespaces: +34, formatted: +51)

```js
function f1(b, c) {
	var log = console.log;
	var a = ++c;
	if (b) b++;
	log(a, b);
}
function f2(b, c) {
	var log = console.log;
	var a = ++c;
	b && b++;
	log(a, b);
}
function f3(b, c) {
	var log = console.log;
	var a = ++c;
	b ? b++ : b--;
	log(a, b);
}
f1(1, 2);
f2(3, 4);
f3(5, 6);

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,13 @@
 function f1(b, c) {
-	if (b) b++;
-	(0, console.log)(++c, b);
+	var log = console.log, a = ++c;
+	b && b++, log(a, b);
 }
 function f2(b, c) {
-	b && b++, (0, console.log)(++c, b);
+	var log = console.log, a = ++c;
+	b && b++, log(a, b);
 }
 function f3(b, c) {
-	b ? b++ : b--, (0, console.log)(++c, b);
+	var log = console.log, a = ++c;
+	b ? b++ : b--, log(a, b);
 }
 f1(1, 2), f2(3, 4), f3(5, 6);

```

## `terser/collapse_vars/issue_2453`

- tags: `join vars`, `sequences`, `2 iterations`
- size: oxc 50 vs reference 16 (no whitespaces: +34, formatted: +43)

```js
function log(n) {
	console.log(n);
}
const a = 42;
log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(42);
+function log(n) {
+	console.log(n);
+}
+const a = 42;
+log(42);

```

## `terser/drop_unused/defun_lambda_same_name`

- tags: `remove unused`
- size: oxc 87 vs reference 53 (no whitespaces: +34, formatted: +48)

```js
function f(n) {
	return n ? n * f(n - 1) : 1;
}
console.log((function f(n) {
	return n ? n * f(n - 1) : 1;
})(5));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,6 @@
+function f(n) {
+	return n ? n * f(n - 1) : 1;
+}
 console.log((function f(n) {
 	return n ? n * f(n - 1) : 1;
 })(5));

```

## `terser/evaluate/issue_2207_1`

- size: oxc 163 vs reference 129 (no whitespaces: +34, formatted: +40)

```js
console.log(String.fromCharCode(65));
console.log(Math.max(3, 6, 2, 7, 3, 4));
console.log(Math.cos(1.2345));
console.log(Math.cos(1.2345) - Math.sin(4.321));
console.log(Math.pow(Math.PI, Math.E - Math.LN10).toFixed(15));

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 console.log('A');
 console.log(7);
-console.log(.32999315767856785);
-console.log(1.2543732512566947);
-console.log('1.609398451447204');
+console.log(Math.cos(1.2345));
+console.log(Math.cos(1.2345) - Math.sin(4.321));
+console.log((Math.PI ** (Math.E - Math.LN10)).toFixed(15));

```

## `terser/evaluate/unsafe_array_bad_index`

- size: oxc 59 vs reference 25 (no whitespaces: +34, formatted: +61)

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
@@ -1 +1,16 @@
-console.log(0 / 0, 0 / 0, 0 / 0);
+console.log([
+	1,
+	2,
+	3,
+	4
+].a + 1, [
+	1,
+	2,
+	3,
+	4
+].a + 1, [
+	1,
+	2,
+	3,
+	4
+][3.14] + 1);

```

## `terser/functions/duplicate_arg_var`

- size: oxc 57 vs reference 23 (no whitespaces: +34, formatted: +43)

```js
console.log((function(b) {
	return b + 'ING';
	var b;
})('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASSING');
+console.log((function(b) {
+	return b + 'ING';
+	var b;
+})('PASS'));

```

## `terser/functions/issue_2107`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 106 vs reference 72 (no whitespaces: +34, formatted: +47)

```js
var c = 0;
!(function() {
	c++;
})(c++ + new (function() {
	this.a = 0;
	var a = (c = c + 1) + (c = 1 + c);
	return c++ + a;
})());
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 var c = 0;
-c++, new (function() {
-	this.a = 0, c = 1 + (c += 1), c++;
-})(), c++, console.log(c);
+(function() {
+	c++;
+})(c++ + new (function() {
+	this.a = 0;
+	var a = (c += 1) + (c = 1 + c);
+	return c++ + a;
+})()), console.log(c);

```

## `terser/functions/issue_485_crashing_1530`

- tags: `sequences`
- size: oxc 34 vs reference 0 (no whitespaces: +34, formatted: +42)

```js
(function(a) {
	if (true) return;
	var b = 42;
})(this);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function(a) {
+	return;
+	var b;
+})(this);

```

## `terser/issue_1787/unary_prefix`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 20 (no whitespaces: +34, formatted: +38)

```js
console.log((function() {
	var x = -(2 / 3);
	return x;
})());

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-console.log(-(2 / 3));
+console.log((function() {
+	return -.6666666666666666;
+})());

```

## `terser/issue_281/negate_iife_4`

- tags: `sequences`
- size: oxc 98 vs reference 64 (no whitespaces: +34, formatted: +44)

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
@@ -1 +1,5 @@
-t ? console.log(true) : console.log(false), console.log('something');
+(function() {
+	return t;
+})() ? console.log(!0) : console.log(!1), (function() {
+	console.log('something');
+})();

```

## `terser/issue_281/negate_iife_5`

- tags: `sequences`
- size: oxc 82 vs reference 48 (no whitespaces: +34, formatted: +44)

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
@@ -1 +1,5 @@
-t ? foo(true) : bar(false), console.log('something');
+(function() {
+	return t;
+})() ? foo(!0) : bar(!1), (function() {
+	console.log('something');
+})();

```

## `terser/issue_281/negate_iife_5_off`

- tags: `sequences`
- size: oxc 82 vs reference 48 (no whitespaces: +34, formatted: +44)

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
@@ -1 +1,5 @@
-t ? foo(true) : bar(false), console.log('something');
+(function() {
+	return t;
+})() ? foo(!0) : bar(!1), (function() {
+	console.log('something');
+})();

```

## `terser/reduce_vars/issue_2423_5`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 70 vs reference 36 (no whitespaces: +34, formatted: +46)

```js
function x() {
	y();
}
function y() {
	console.log(1);
}
function z() {
	function y() {
		console.log(2);
	}
	x();
}
z();
z();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,11 @@
+function x() {
+	y();
+}
+function y() {
+	console.log(1);
+}
 function z() {
-	console.log(1);
+	x();
 }
 z();
 z();

```

## `terser/reduce_vars/passes`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 109 vs reference 75 (no whitespaces: +34, formatted: +58)

```js
function f() {
	var a = 1, b = 2, c = 3;
	if (a) {
		b = c;
	} else {
		c = b;
	}
	console.log(a + b);
	console.log(b + c);
	console.log(a + c);
	console.log(a + b + c);
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,4 @@
 function f() {
-	3;
-	console.log(4);
-	console.log(6);
-	console.log(4);
-	console.log(7);
+	var a = 1, b = 2, c = 3;
+	a ? b = c : c = b, console.log(a + b), console.log(b + c), console.log(a + c), console.log(a + b + c);
 }

```

## `terser/reduce_vars/toplevel_on_loops_2`

- tags: `join vars`, `remove unused`
- size: oxc 61 vs reference 27 (no whitespaces: +34, formatted: +44)

```js
function bar() {
	console.log('bar:');
}
var x = 3;
do {
	bar();
} while (x);

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-for (;;) console.log('bar:');
+function bar() {
+	console.log('bar:');
+}
+var x = 3;
+do
+	bar();
+while (x);

```

## `terser/reduce_vars/unsafe_evaluate_side_effect_free_1`

- tags: `join vars`, `remove unused`
- size: oxc 205 vs reference 171 (no whitespaces: +34, formatted: +48)

```js
console.log((function() {
	var o = { p: 1 };
	console.log(o.p);
	return o.p;
})());
console.log((function() {
	var o = { p: 2 };
	console.log(o.p);
	return o;
})());
console.log((function() {
	var o = { p: 3 };
	console.log([o][0].p);
	return o.p;
})());

```

```diff
--- reference
+++ oxc
@@ -1,13 +1,15 @@
 console.log((function() {
-	console.log(1);
-	return 1;
+	var o = { p: 1 };
+	console.log(o.p);
+	return o.p;
 })());
 console.log((function() {
 	var o = { p: 2 };
-	console.log(2);
+	console.log(o.p);
 	return o;
 })());
 console.log((function() {
-	console.log(3);
-	return 3;
+	var o = { p: 3 };
+	console.log(o.p);
+	return o.p;
 })());

```

## `terser/switch/issue_376`

- size: oxc 73 vs reference 39 (no whitespaces: +34, formatted: +46)

```js
switch (true) {
	case boolCondition:
		console.log(1);
		break;
	case false:
		console.log(2);
		break;
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-if (true === boolCondition) console.log(1);
+switch (!0) {
+	case boolCondition:
+		console.log(1);
+		break;
+	case !1: console.log(2);
+}

```

## `terser/destructuring/empty_object_destructuring_misc`

- tags: `remove unused`, `pure getters`
- size: oxc 188 vs reference 153 (no whitespaces: +35, formatted: +57)

```js
let out = [], foo = (out.push(0), 1), {} = { k: 9 }, bar = out.push(2), { unused } = (out.push(3), { unused: 7 }), { a: b, prop, w, x: y, z } = { prop: 8 }, baz = (out.push(4), 5);
console.log(`${foo} ${prop} ${baz} ${JSON.stringify(out)}`);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,2 @@
-let out = [], foo = (out.push(0), 1), { prop } = (out.push(2), out.push(3), { prop: 8 }), baz = (out.push(4), 5);
-console.log(`${foo} ${prop} ${baz} ${JSON.stringify(out)}`);
+let out = [], foo = (out.push(0), 1), {} = { k: 9 }, bar = out.push(2), { unused } = (out.push(3), { unused: 7 }), { a: b, prop, w, x: y, z } = { prop: 8 }, baz = (out.push(4), 5);
+console.log(`1 ${prop} 5 ${JSON.stringify(out)}`);

```

## `terser/drop_unused/issue_t183`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 98 vs reference 63 (no whitespaces: +35, formatted: +46)

```js
function foo(val) {
	function bar(x) {
		if (x) return x;
		bar(x - 1);
	}
	return bar(val);
}
console.log(foo('PASS'));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-console.log((function bar(x) {
-	if (x) return x;
-	bar(x - 1);
-})('PASS'));
+function foo(val) {
+	function bar(x) {
+		if (x) return x;
+		bar(x - 1);
+	}
+	return bar(val);
+}
+console.log(foo('PASS'));

```

## `terser/functions/issue_2630_3`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 70 (no whitespaces: +35, formatted: +53)

```js
var x = 2, a = 1;
(function() {
	function f1(a) {
		f2();
		--x >= 0 && f1({});
	}
	f1(a++);
	function f2() {
		a++;
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,12 @@
 var x = 2, a = 1;
-(function f1(a1) {
-	a++;
-	--x >= 0 && f1({});
-})(a++);
+(function() {
+	function f1(a) {
+		f2();
+		--x >= 0 && f1({});
+	}
+	f1(a++);
+	function f2() {
+		a++;
+	}
+})();
 console.log(a);

```

## `terser/harmony/issue_2874_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 212 vs reference 177 (no whitespaces: +35, formatted: +51)

```js
(function() {
	let keys = [];
	function foo() {
		var result = [
			2,
			1,
			0
		].map((value) => {
			keys.push(value);
			return bar();
		});
		return result;
	}
	function bar() {
		var letters = [
			'A',
			'B',
			'C'
		], key = keys.shift();
		return () => console.log(letters[key] + key);
	}
	foo().map((fn) => fn());
})();

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,19 @@
 (function() {
 	let keys = [];
-	[
-		2,
-		1,
-		0
-	].map((value) => {
-		return keys.push(value), letters = [
+	function foo() {
+		return [
+			2,
+			1,
+			0
+		].map((value) => (keys.push(value), bar()));
+	}
+	function bar() {
+		var letters = [
 			'A',
 			'B',
 			'C'
-		], key = keys.shift(), () => console.log(letters[key] + key);
-		var letters, key;
-	}).map((fn) => fn());
+		], key = keys.shift();
+		return () => console.log(letters[key] + key);
+	}
+	foo().map((fn) => fn());
 })();

```

## `terser/hoist_props/name_collision_3`

- tags: `join vars`
- size: oxc 125 vs reference 90 (no whitespaces: +35, formatted: +53)

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
console.log(o.p === o.p, o['+'](4), o['-'](5));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,10 @@
-var o_p = 1, o__$0 = 2, o__$1 = 3;
-console.log(true, function() {
-	return 4;
-}(), function() {
-	return 6;
-}());
+var o = {
+	p: 1,
+	'+': function(x) {
+		return x;
+	},
+	'-': function(x) {
+		return x + 1;
+	}
+}, o__$0 = 2, o__$1 = 3;
+console.log(o.p === o.p, o['+'](4), o['-'](5));

```

## `terser/loops/dead_code_condition`

- tags: `sequences`
- size: oxc 71 vs reference 36 (no whitespaces: +35, formatted: +46)

```js
for (var a = 0, b = 5; (a += 1, 3) - 3 && b > 0; b--) {
	var c = (function() {
		b--;
	})(a++);
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,4 @@
-var a = 0, b = 5;
-var c;
-console.log(a += 1);
+for (var a = 0, b = 5; a += 1, 0; b--) var c = (function() {
+	b--;
+})(a++);
+console.log(a);

```

## `terser/arrow/async_identifiers`

- size: oxc 130 vs reference 94 (no whitespaces: +36, formatted: +29)

```js
var async = function(x) {
	console.log('async', x);
};
var await = function(x) {
	console.log('await', x);
};
async(1);
// prettier-ignore
await(2);

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,9 @@
-var async = (x) => {
+var async = function(x) {
 	console.log('async', x);
 };
-var await = (x) => {
+var await = function(x) {
 	console.log('await', x);
 };
 async(1);
+// prettier-ignore
 await(2);

```

## `terser/async/async_shorthand_property`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`
- size: oxc 243 vs reference 207 (no whitespaces: +36, formatted: +36)

```js
function print(o) {
	console.log(o.async + ' ' + o.await);
}
var async = 'Async', await = 'Await';
print({ async });
print({ await });
print({
	async,
	await
});
print({
	await,
	async
});
print({ async });
print({ await });
print({
	async,
	await
});
print({
	await,
	async
});

```

```diff
--- reference
+++ oxc
@@ -1,24 +1,24 @@
-function a(a) {
-	console.log(a.async + ' ' + a.await);
+function print(e) {
+	console.log(e.async + ' ' + e.await);
 }
-var n = 'Async', c = 'Await';
-a({ async: n });
-a({ await: c });
-a({
-	async: n,
-	await: c
+var e = 'Async', t = 'Await';
+print({ async: e });
+print({ await: t });
+print({
+	async: e,
+	await: t
 });
-a({
-	await: c,
-	async: n
+print({
+	await: t,
+	async: e
 });
-a({ async: n });
-a({ await: c });
-a({
-	async: n,
-	await: c
+print({ async: e });
+print({ await: t });
+print({
+	async: e,
+	await: t
 });
-a({
-	await: c,
-	async: n
+print({
+	await: t,
+	async: e
 });

```

## `terser/comparing/dont_change_in_or_instanceof_expressions`

- size: oxc 56 vs reference 20 (no whitespaces: +36, formatted: +38)

```js
1 in 1;
null in null;
1 instanceof 1;
null instanceof null;

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,4 @@
 1 in 1;
 null in null;
+1 instanceof 1;
+null instanceof null;

```

## `terser/drop_unused/delete_assign_2`

- tags: `remove unused`
- size: oxc 179 vs reference 143 (no whitespaces: +36, formatted: +47)

```js
var a;
console.log(delete (a = undefined));
console.log(delete (a = void 0));
console.log(delete (a = Infinity));
console.log(delete (a = 1 / 0));
console.log(delete (a = NaN));
console.log(delete (a = 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-console.log((void 0, !0));
-console.log((void 0, !0));
-console.log((Infinity, !0));
-console.log((1 / 0, !0));
-console.log((NaN, !0));
-console.log((0 / 0, !0));
+var a;
+console.log(delete (a = void 0));
+console.log(delete (a = void 0));
+console.log(delete (a = Infinity));
+console.log(delete (a = 1 / 0));
+console.log(delete (a = NaN));
+console.log(delete (a = NaN));

```

## `terser/harmony/issue_2874_3`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 76 vs reference 40 (no whitespaces: +36, formatted: +50)

```js
function f() {
	return x + y;
}
let x, y;
let a = (z) => {
	x = 'A';
	y = z;
	console.log(f());
};
a(1);
a(2);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-let a = (z) => {
-	console.log('A' + z);
+function f() {
+	return x + y;
+}
+let x, y, a = (z) => {
+	x = 'A', y = z, console.log(f());
 };
 a(1), a(2);

```

## `terser/hoist_props/does_not_hoist_objects_with_computed_props`

- tags: `join vars`
- size: oxc 36 vs reference 0 (no whitespaces: +36, formatted: +42)

```js
const x = { [console.log('PASS')]: 123 };

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+const x = { [console.log('PASS')]: 123 };

```

## `terser/inline/noinline_annotation`

- tags: `join vars`
- size: oxc 92 vs reference 56 (no whitespaces: +36, formatted: +36)

```js
function no_inline() {
	return 123;
}
/*#__NOINLINE__*/ no_inline();
/*#__NOINLINE__*/ no_inline();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,5 @@
 function no_inline() {
 	return 123;
 }
-no_inline();
-no_inline();
+/*#__NOINLINE__*/ no_inline();
+/*#__NOINLINE__*/ no_inline();

```

## `terser/issue_t50/issue_t50_const`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 56 vs reference 20 (no whitespaces: +36, formatted: +61)

```js
(function() {
	const v1 = [4, [{
		a: -1,
		b: 5
	}]];
	const v2 = [4, [{
		a: -2,
		b: 5
	}]];
	const v3 = [4, [{
		a: -3,
		b: 5
	}]];
	const v4 = [4, [{
		a: -4,
		b: 5
	}]];
	const v5 = [4, [{
		a: -5,
		b: 5
	}]];
	const v6 = [4, [{
		a: -6,
		b: 5
	}]];
	const v7 = [4, [{
		a: -7,
		b: 5
	}]];
	const v8 = [4, [{
		a: -8,
		b: 5
	}]];
	const v9 = [4, [{
		a: -9,
		b: 5
	}]];
	const v10 = [4, [{
		a: -10,
		b: 5
	}]];
	const v11 = [4, [{
		a: -11,
		b: 5
	}]];
	const v12 = [4, [{
		a: -12,
		b: 5
	}]];
	const v13 = [4, [{
		a: -13,
		b: 5
	}]];
	const v14 = [4, [{
		a: -14,
		b: 5
	}]];
	const v15 = [4, [{
		a: -15,
		b: 5
	}]];
	const v16 = [4, [{
		a: -16,
		b: 5
	}]];
	const v17 = [4, [{
		a: -17,
		b: 5
	}]];
	const v18 = [4, [{
		a: -18,
		b: 5
	}]];
	const v19 = [4, [{
		a: -19,
		b: 5
	}]];
	const v20 = [4, [{
		a: -20,
		b: 5
	}]];
	const unused = {
		p1: v1,
		p2: v2,
		p3: v3,
		p4: v4,
		p5: v5,
		p6: v6,
		p7: v7,
		p8: v8,
		p9: v9,
		p10: v10,
		p11: v11,
		p12: v12,
		p13: v13,
		p14: v14,
		p15: v15,
		p16: v16,
		p17: v17,
		p18: v18,
		p19: v19,
		p20: v20
	};
	console.log(v1[1][0].a, v10[1][0].a);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(-1, -10);
+(function() {
+	console.log({
+		a: -1,
+		b: 5
+	}.a, {
+		a: -10,
+		b: 5
+	}.a);
+})();

```

## `terser/issue_t50/issue_t50_let`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 56 vs reference 20 (no whitespaces: +36, formatted: +61)

```js
(function() {
	let v1 = [4, [{
		a: -1,
		b: 5
	}]];
	let v2 = [4, [{
		a: -2,
		b: 5
	}]];
	let v3 = [4, [{
		a: -3,
		b: 5
	}]];
	let v4 = [4, [{
		a: -4,
		b: 5
	}]];
	let v5 = [4, [{
		a: -5,
		b: 5
	}]];
	let v6 = [4, [{
		a: -6,
		b: 5
	}]];
	let v7 = [4, [{
		a: -7,
		b: 5
	}]];
	let v8 = [4, [{
		a: -8,
		b: 5
	}]];
	let v9 = [4, [{
		a: -9,
		b: 5
	}]];
	let v10 = [4, [{
		a: -10,
		b: 5
	}]];
	let v11 = [4, [{
		a: -11,
		b: 5
	}]];
	let v12 = [4, [{
		a: -12,
		b: 5
	}]];
	let v13 = [4, [{
		a: -13,
		b: 5
	}]];
	let v14 = [4, [{
		a: -14,
		b: 5
	}]];
	let v15 = [4, [{
		a: -15,
		b: 5
	}]];
	let v16 = [4, [{
		a: -16,
		b: 5
	}]];
	let v17 = [4, [{
		a: -17,
		b: 5
	}]];
	let v18 = [4, [{
		a: -18,
		b: 5
	}]];
	let v19 = [4, [{
		a: -19,
		b: 5
	}]];
	let v20 = [4, [{
		a: -20,
		b: 5
	}]];
	let unused = {
		p1: v1,
		p2: v2,
		p3: v3,
		p4: v4,
		p5: v5,
		p6: v6,
		p7: v7,
		p8: v8,
		p9: v9,
		p10: v10,
		p11: v11,
		p12: v12,
		p13: v13,
		p14: v14,
		p15: v15,
		p16: v16,
		p17: v17,
		p18: v18,
		p19: v19,
		p20: v20
	};
	console.log(v1[1][0].a, v10[1][0].a);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(-1, -10);
+(function() {
+	console.log({
+		a: -1,
+		b: 5
+	}.a, {
+		a: -10,
+		b: 5
+	}.a);
+})();

```

## `terser/properties/issue_2208_5`

- size: oxc 52 vs reference 16 (no whitespaces: +36, formatted: +50)

```js
console.log({
	p: 'FAIL',
	p: function() {
		return 42;
	}
}.p());

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(42);
+console.log({
+	p: 'FAIL',
+	p: function() {
+		return 42;
+	}
+}.p());

```

## `terser/reduce_vars/escaped_prop_1`

- tags: `join vars`, `remove unused`
- size: oxc 85 vs reference 49 (no whitespaces: +36, formatted: +46)

```js
var obj = { o: { a: 1 } };
(function(o) {
	o.a++;
})(obj.o);
(function(o) {
	console.log(o.a);
})(obj.o);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 var obj = { o: { a: 1 } };
-obj.o.a++;
-console.log(obj.o.a);
+(function(o) {
+	o.a++;
+})(obj.o);
+(function(o) {
+	console.log(o.a);
+})(obj.o);

```

## `terser/reduce_vars/escaped_prop_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 85 vs reference 49 (no whitespaces: +36, formatted: +46)

```js
var obj = { o: { a: 1 } };
(function(o) {
	o.a++;
})(obj.o);
(function(o) {
	console.log(o.a);
})(obj.o);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 var obj = { o: { a: 1 } };
-obj.o.a++;
-console.log(obj.o.a);
+(function(o) {
+	o.a++;
+})(obj.o);
+(function(o) {
+	console.log(o.a);
+})(obj.o);

```

## `terser/dead_code/try_catch_finally`

- tags: `sequences`, `2 iterations`
- size: oxc 105 vs reference 68 (no whitespaces: +37, formatted: +58)

```js
var a = 1;
!(function() {
	try {
		if (false) throw x;
	} catch (a) {
		var a = 2;
		console.log('FAIL');
	} finally {
		a = 3;
		console.log('PASS');
	}
})();
try {
	console.log(a);
} finally {}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,11 @@
 var a = 1;
-!function() {
-	var a;
-	a = 3;
-	console.log('PASS');
-}();
-console.log(a);
+(function() {
+	try {} catch (a) {
+		var a;
+	} finally {
+		a = 3, console.log('PASS');
+	}
+})();
+try {
+	console.log(a);
+} finally {}

```

## `terser/drop_console/drop_console_2`

- tags: `drop console`
- size: oxc 37 vs reference 0 (no whitespaces: +37, formatted: +39)

```js
console.log('foo');
console.log.apply(console, arguments);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+console.log.apply(console, arguments);

```

## `terser/functions/issue_2084`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 124 vs reference 87 (no whitespaces: +37, formatted: +62)

```js
var c = 0;
!(function() {
	!(function(c) {
		c = 1 + c;
		var c = 0;
		function f14(a_1) {
			if (c = 1 + c, 0 !== 23 .toString()) c = 1 + c, a_1 && (a_1[0] = 0);
		}
		f14();
	})(-1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,11 @@
 var c = 0;
-!(function(c) {
-	c = 1 + c, c = 1 + (c = 0), 0 !== 23 .toString() && (c = 1 + c);
-})(-1), console.log(c);
+(function() {
+	(function(c) {
+		c = 1 + c;
+		var c = 0;
+		function f14(a_1) {
+			c = 1 + c, c = 1 + c, a_1 && (a_1[0] = 0);
+		}
+		f14();
+	})(-1);
+})(), console.log(c);

```

## `terser/identity/inline_identity_duplicate_arg_var`

- tags: `join vars`, `remove unused`
- size: oxc 54 vs reference 17 (no whitespaces: +37, formatted: +50)

```js
const id = (x) => {
	return x;
	var x;
};
console.log(id(1), id(2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(1, 2);
+const id = (x) => {
+	return x;
+	var x;
+};
+console.log(id(1), id(2));

```

## `terser/issue_1750/case_2`

- size: oxc 70 vs reference 33 (no whitespaces: +37, formatted: +50)

```js
var a = 0, b = 1;
switch (0) {
	default: b = 2;
	case a: a = 3;
	case 0:
}
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
 var a = 0, b = 1;
-a = 3;
+switch (0) {
+	default: b = 2;
+	case a: a = 3;
+	case 0:
+}
 console.log(a, b);

```

## `terser/issue_281/issue_1254_negate_iife_true`

- size: oxc 57 vs reference 20 (no whitespaces: +37, formatted: +49)

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
@@ -1 +1,5 @@
-console.log('test');
+(function() {
+	return function() {
+		console.log('test');
+	};
+})()();

```

## `terser/issue_640/drop_console_2`

- tags: `drop console`
- size: oxc 37 vs reference 0 (no whitespaces: +37, formatted: +39)

```js
console.log('foo');
console.log.apply(console, arguments);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+console.log.apply(console, arguments);

```

## `terser/loops/issue_2904`

- tags: `join vars`
- size: oxc 37 vs reference 0 (no whitespaces: +37, formatted: +44)

```js
var a = 1;
do {
	console.log(a);
} while (--a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+var a = 1;
+do
+	console.log(a);
+while (--a);

```

## `terser/reduce_vars/defun_var_1`

- tags: `join vars`, `remove unused`
- size: oxc 70 vs reference 33 (no whitespaces: +37, formatted: +45)

```js
var a = 42, b;
function a() {}
function b() {}
console.log(typeof a, typeof b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('number', 'function');
+var a = 42, b;
+function a() {}
+function b() {}
+console.log(typeof a, typeof b);

```

## `terser/reduce_vars/defun_var_2`

- tags: `join vars`, `remove unused`
- size: oxc 70 vs reference 33 (no whitespaces: +37, formatted: +45)

```js
function a() {}
function b() {}
var a = 42, b;
console.log(typeof a, typeof b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('number', 'function');
+function a() {}
+function b() {}
+var a = 42, b;
+console.log(typeof a, typeof b);

```

## `terser/template_string/tagged_template_function_inline_4`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 37 vs reference 0 (no whitespaces: +37, formatted: +45)

```js
const t = { pl: function() {} };
t.pl`test`;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+const t = { pl: function() {} };
+t.pl`test`;

```

## `terser/evaluate/prototype_function`

- size: oxc 195 vs reference 157 (no whitespaces: +38, formatted: +44)

```js
var a = { valueOf: 0 } < 1;
var b = { toString: 0 } < 1;
var c = { valueOf: 0 } + '';
var d = { toString: 0 } + '';
var e = ({ valueOf: 0 } + '')[2];
var f = ({ toString: 0 } + '')[2];
var g = { valueOf: 0 }.valueOf();
var h = { toString: 0 }.toString();

```

```diff
--- reference
+++ oxc
@@ -4,5 +4,5 @@
 var d = { toString: 0 } + '';
 var e = ({ valueOf: 0 } + '')[2];
 var f = ({ toString: 0 } + '')[2];
-var g = 0();
-var h = 0();
+var g = { valueOf: 0 }.valueOf();
+var h = { toString: 0 }.toString();

```

## `terser/export/issue_333_toplevel`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 138 vs reference 100 (no whitespaces: +38, formatted: +44)

```js
function shortOut() {
	return function() {};
}
var setToString = shortOut();
var _setToString = setToString;
export function baseRest() {
	return _setToString();
}
export { _setToString };

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,7 @@
-var _setToString = function() {};
+function shortOut() {
+	return function() {};
+}
+var _setToString = shortOut();
 export function baseRest() {
 	return _setToString();
 }

```

## `terser/collapse_vars/collapse_vars_misc1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 553 vs reference 514 (no whitespaces: +39, formatted: +52)

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
	const z = foo(), y = z / (5 - x);
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
	const z = foo(), y = (5 - window.x) / z;
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
@@ -1,6 +1,6 @@
 function f0(o, a, h) {
-	var b = 3 - a;
-	return o.run(b)[7] = h;
+	var b = 3 - a, obj = o, seven = 7, prop = 'run';
+	return obj[prop](b)[seven] = h;
 }
 function f1(x) {
 	return 5 - x;
@@ -9,14 +9,15 @@
 	return foo() / (5 - x);
 }
 function f3(x) {
-	return (5 - x) / foo();
+	var z = foo();
+	return (5 - x) / z;
 }
 function f4(x) {
 	var z = foo();
 	return (5 - u) / z;
 }
 function f5(x) {
-	const z = foo();
+	let z = foo();
 	return (5 - window.x) / z;
 }
 function f6() {

```

## `terser/collapse_vars/collapse_vars_side_effects_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 465 vs reference 426 (no whitespaces: +39, formatted: +63)

```js
function f1() {
	var e = 7;
	var s = 'abcdef';
	var i = 2;
	var log = console.log.bind(console);
	var x = s.charAt(i++);
	var y = s.charAt(i++);
	var z = s.charAt(i++);
	log(x, y, z, e);
}
function f2() {
	var e = 7;
	var log = console.log.bind(console);
	var s = 'abcdef';
	var i = 2;
	var x = s.charAt(i++);
	var y = s.charAt(i++);
	var z = s.charAt(i++);
	log(x, i, y, z, e);
}
function f3() {
	var e = 7;
	var s = 'abcdef';
	var i = 2;
	var log = console.log.bind(console);
	var x = s.charAt(i++);
	var y = s.charAt(i++);
	var z = s.charAt(i++);
	log(x, z, y, e);
}
function f4() {
	var log = console.log.bind(console), i = 10, x = i += 2, y = i += 3, z = i += 4;
	log(x, z, y, i);
}
f1(), f2(), f3(), f4();

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,17 @@
 function f1() {
-	var s = 'abcdef', i = 2;
-	console.log.bind(console)(s.charAt(i++), s.charAt(i++), s.charAt(i++), 7);
+	var e = 7, s = 'abcdef', i = 2;
+	console.log.bind(console)(s.charAt(i++), s.charAt(i++), s.charAt(i++), e);
 }
 function f2() {
-	var s = 'abcdef', i = 2;
-	console.log.bind(console)(s.charAt(i++), 5, s.charAt(i++), s.charAt(i++), 7);
+	var e = 7, log = console.log.bind(console), s = 'abcdef', i = 2, x = s.charAt(i++), y = s.charAt(i++), z = s.charAt(i++);
+	log(x, i, y, z, e);
 }
 function f3() {
-	var s = 'abcdef', i = 2, log = console.log.bind(console), x = s.charAt(i++), y = s.charAt(i++);
-	log(x, s.charAt(i++), y, 7);
+	var e = 7, s = 'abcdef', i = 2, log = console.log.bind(console), x = s.charAt(i++), y = s.charAt(i++);
+	log(x, s.charAt(i++), y, e);
 }
 function f4() {
-	var i = 10, x = i += 2, y = i += 3;
-	console.log.bind(console)(x, i += 4, y, 19);
+	var log = console.log.bind(console), i = 10, x = i += 2, y = i += 3;
+	log(x, i += 4, y, i);
 }
 f1(), f2(), f3(), f4();

```

## `terser/expression/pow_with_parentheses`

- size: oxc 102 vs reference 63 (no whitespaces: +39, formatted: +45)

```js
var g = (-7) ** .5;
var h = 2324334 ** 34343443;
var i = (-2324334) ** 34343443;
var j = 2 ** -3;
var k = 2 ** -3;
var l = 2 ** (5 - 7);

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-var g = 0 / 0;
-var h = 1 / 0;
-var i = -1 / 0;
-var j = .125;
-var k = .125;
-var l = .25;
+var g = (-7) ** .5;
+var h = 2324334 ** 34343443;
+var i = (-2324334) ** 34343443;
+var j = 2 ** -3;
+var k = 2 ** -3;
+var l = 2 ** -2;

```

## `terser/functions/drop_lone_use_strict_arrows_1`

- size: oxc 80 vs reference 41 (no whitespaces: +39, formatted: +52)

```js
var f0 = () => 0;
var f1 = () => {
	'use strict';
};
var f2 = () => {
	'use strict';
	var f3 = () => {
		'use strict';
	};
};
(() => {
	'use strict';
})();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,8 @@
 var f0 = () => 0;
-var f1 = () => {};
-var f2 = () => {};
+var f1 = () => {
+	'use strict';
+};
+var f2 = () => {
+	'use strict';
+	var f3 = () => {};
+};

```

## `terser/harmony/array_literal_with_spread_4b`

- size: oxc 499 vs reference 460 (no whitespaces: +39, formatted: +57)

```js
var nothing = [];
function t(x) {
	console.log('(' + x + ')');
	return 10 * x;
}
console.log([t(1), t(2)][0]);
console.log([t(1), t(2)][1]);
console.log([t(1), t(2)][2]);
console.log([
	...nothing,
	t(1),
	t(2)
][0]);
console.log([
	...nothing,
	t(1),
	t(2)
][1]);
console.log([
	...nothing,
	t(1),
	t(2)
][2]);
console.log([
	t(1),
	...nothing,
	t(2)
][0]);
console.log([
	t(1),
	...nothing,
	t(2)
][1]);
console.log([
	t(1),
	...nothing,
	t(2)
][2]);
console.log([
	t(1),
	t(2),
	...nothing
][0]);
console.log([
	t(1),
	t(2),
	...nothing
][1]);
console.log([
	t(1),
	t(2),
	...nothing
][2]);

```

```diff
--- reference
+++ oxc
@@ -4,7 +4,7 @@
 	return 10 * x;
 }
 console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
+console.log([t(1), t(2)][1]);
 console.log([t(1), t(2)][2]);
 console.log([
 	...nothing,
@@ -21,21 +21,33 @@
 	t(1),
 	t(2)
 ][2]);
-console.log([t(1), t(2)][0]);
 console.log([
 	t(1),
 	...nothing,
 	t(2)
+][0]);
+console.log([
+	t(1),
+	...nothing,
+	t(2)
 ][1]);
 console.log([
 	t(1),
 	...nothing,
 	t(2)
 ][2]);
-console.log([t(1), t(2)][0]);
-console.log((t(1), t(2)));
 console.log([
 	t(1),
 	t(2),
 	...nothing
+][0]);
+console.log([
+	t(1),
+	t(2),
+	...nothing
+][1]);
+console.log([
+	t(1),
+	t(2),
+	...nothing
 ][2]);

```

## `terser/drop_unused/double_assign_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 250 vs reference 210 (no whitespaces: +40, formatted: +61)

```js
function f1() {
	var a = {};
	var a = [];
	return a;
}
function f2() {
	var a = {};
	a = [];
	return a;
}
function f3() {
	a = {};
	var a = [];
	return a;
}
function f4(a) {
	a = {};
	a = [];
	return a;
}
function f5(a) {
	var a = {};
	a = [];
	return a;
}
function f6(a) {
	a = {};
	var a = [];
	return a;
}
console.log(f1(), f2(), f3(), f4(), f5(), f6());

```

```diff
--- reference
+++ oxc
@@ -2,23 +2,28 @@
 	return [];
 }
 function f2() {
-	var a;
+	var a = {};
 	a = [];
 	return a;
 }
 function f3() {
-	return [];
+	a = {};
+	var a = [];
+	return a;
 }
 function f4(a) {
+	a = {};
 	a = [];
 	return a;
 }
 function f5(a) {
+	var a = {};
 	a = [];
 	return a;
 }
 function f6(a) {
-	a = [];
+	a = {};
+	var a = [];
 	return a;
 }
 console.log(f1(), f2(), f3(), f4(), f5(), f6());

```

## `terser/drop_unused/drop_toplevel_retain_regex`

- tags: `remove unused`
- size: oxc 100 vs reference 60 (no whitespaces: +40, formatted: +54)

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
@@ -1,8 +1,10 @@
-var a;
+var a, b = 1, c = g;
 function f(d) {
 	return function() {
-		2;
+		c = 2;
 	};
 }
 a = 2;
-console.log(3);
+function g() {}
+function h() {}
+console.log(b = 3);

```

## `terser/identity/inline_identity_inline_function`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 57 vs reference 17 (no whitespaces: +40, formatted: +59)

```js
const id = (x) => x;
console.log(id((x) => x + 1)(1), id(((x) => x + 1)(2)));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(2, 3);
+const id = (x) => x;
+console.log(id((x) => x + 1)(1), id(((x) => x + 1)(2)));

```

## `terser/reduce_vars/issue_1670_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 60 vs reference 20 (no whitespaces: +40, formatted: +53)

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
@@ -1 +1,4 @@
-console.log('PASS');
+(function() {
+	console.log(a === void 0 ? 'PASS' : 'FAIL');
+	var a;
+})();

```

## `terser/reduce_vars/issue_1670_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 60 vs reference 20 (no whitespaces: +40, formatted: +53)

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
@@ -1 +1,4 @@
-console.log('PASS');
+(function() {
+	console.log(a === void 0 ? 'PASS' : 'FAIL');
+	var a;
+})();

```

## `terser/reduce_vars/issue_1670_3`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 60 vs reference 20 (no whitespaces: +40, formatted: +53)

```js
(function f() {
	switch (1) {
		case 0:
			var a = true;
			break;
		case 1: if (typeof a === 'undefined') console.log('PASS');
		else console.log('FAIL');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS');
+(function() {
+	console.log(a === void 0 ? 'PASS' : 'FAIL');
+	var a;
+})();

```

## `terser/reduce_vars/issue_1670_4`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 60 vs reference 20 (no whitespaces: +40, formatted: +53)

```js
(function f() {
	switch (1) {
		case 0:
			var a = true;
			break;
		case 1: if (typeof a === 'undefined') console.log('PASS');
		else console.log('FAIL');
	}
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log('PASS');
+(function() {
+	console.log(a === void 0 ? 'PASS' : 'FAIL');
+	var a;
+})();

```

## `terser/reduce_vars/obj_arg_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 86 vs reference 46 (no whitespaces: +40, formatted: +51)

```js
var C = 1;
function f(obj) {
	return obj.bar();
}
console.log(f({ bar: function() {
	return C + C;
} }));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-console.log({ bar: function() {
-	return 2;
-} }.bar());
+var C = 1;
+function f(obj) {
+	return obj.bar();
+}
+console.log(f({ bar: function() {
+	return C + C;
+} }));

```

## `terser/collapse_vars/issue_2364_5`

- tags: `join vars`, `remove unused`, `pure getters`
- size: oxc 83 vs reference 42 (no whitespaces: +41, formatted: +54)

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
@@ -1,3 +1,4 @@
 function f0(o, a, h) {
-	return o.run(3 - a)[7] = h;
+	var b = 3 - a, obj = o, seven = 7, prop = 'run';
+	return obj[prop](b)[seven] = h;
 }

```

## `terser/drop_unused/drop_toplevel_all_retain`

- tags: `remove unused`
- size: oxc 100 vs reference 59 (no whitespaces: +41, formatted: +61)

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
@@ -1,6 +1,10 @@
-var a;
+var a, b = 1, c = g;
 function f(d) {
-	return function() {};
+	return function() {
+		c = 2;
+	};
 }
 a = 2;
-console.log(3);
+function g() {}
+function h() {}
+console.log(b = 3);

```

## `terser/drop_unused/drop_toplevel_retain`

- tags: `remove unused`
- size: oxc 100 vs reference 59 (no whitespaces: +41, formatted: +61)

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
@@ -1,6 +1,10 @@
-var a;
+var a, b = 1, c = g;
 function f(d) {
-	return function() {};
+	return function() {
+		c = 2;
+	};
 }
 a = 2;
-console.log(3);
+function g() {}
+function h() {}
+console.log(b = 3);

```

## `terser/drop_unused/drop_toplevel_retain_array`

- tags: `remove unused`
- size: oxc 100 vs reference 59 (no whitespaces: +41, formatted: +61)

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
@@ -1,6 +1,10 @@
-var a;
+var a, b = 1, c = g;
 function f(d) {
-	return function() {};
+	return function() {
+		c = 2;
+	};
 }
 a = 2;
-console.log(3);
+function g() {}
+function h() {}
+console.log(b = 3);

```

## `terser/functions/issue_2604_1`

- tags: `remove unused`
- size: oxc 104 vs reference 63 (no whitespaces: +41, formatted: +63)

```js
var a = 'FAIL';
(function() {
	try {
		throw 1;
	} catch (b) {
		(function f(b) {
			b && b();
		})();
		b && (a = 'PASS');
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,12 @@
 var a = 'FAIL';
-try {
-	throw 1;
-} catch (b) {
-	b && (a = 'PASS');
-}
+(function() {
+	try {
+		throw 1;
+	} catch (b) {
+		(function(b) {
+			b && b();
+		})();
+		b && (a = 'PASS');
+	}
+})();
 console.log(a);

```

## `terser/functions/issue_2604_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 104 vs reference 63 (no whitespaces: +41, formatted: +63)

```js
var a = 'FAIL';
(function() {
	try {
		throw 1;
	} catch (b) {
		(function f(b) {
			b && b();
		})();
		b && (a = 'PASS');
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,12 @@
 var a = 'FAIL';
-try {
-	throw 1;
-} catch (o) {
-	o && (a = 'PASS');
-}
+(function() {
+	try {
+		throw 1;
+	} catch (b) {
+		(function(b) {
+			b && b();
+		})();
+		b && (a = 'PASS');
+	}
+})();
 console.log(a);

```

## `terser/reduce_vars/issue_2423_4`

- tags: `join vars`, `remove unused`
- size: oxc 56 vs reference 15 (no whitespaces: +41, formatted: +53)

```js
function c() {
	return 1;
}
function p() {
	console.log(c());
}
p();

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-console.log(1);
+function c() {
+	return 1;
+}
+function p() {
+	console.log(c());
+}
+p();

```

## `terser/dead_code/unsafe_builtin`

- size: oxc 50 vs reference 8 (no whitespaces: +42, formatted: +48)

```js
(!w).constructor(x);
Math.abs(y);
[
	1,
	2,
	z
].valueOf();

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-w, x;
-y;
-z;
+(!w).constructor(x);
+Math.abs(y);
+[
+	1,
+	2,
+	z
+].valueOf();

```

## `terser/reduce_vars/issue_741_reference_cycle`

- size: oxc 42 vs reference 0 (no whitespaces: +42, formatted: +59)

```js
for (var a = console.log, s = 1; s <= 3;) {
	var c = s;
	a(c);
	s++;
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+for (var a = console.log, s = 1; s <= 3;) {
+	a(s);
+	s++;
+}

```

## `terser/async/async_inline`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 310 vs reference 267 (no whitespaces: +43, formatted: +50)

```js
(async function() {
	return await 3;
})();
(async function(x) {
	await console.log(x);
})(4);
function invoke(x, y) {
	return x(y);
}
invoke(async function() {
	return await 1;
});
invoke(async function(x) {
	await console.log(x);
}, 2);
function top() {
	console.log('top');
}
top();
async function async_top() {
	console.log('async_top');
}
async_top();

```

```diff
--- reference
+++ oxc
@@ -1,19 +1,21 @@
-!(async function() {
-	await 3;
-})();
-!(async function(x) {
-	await console.log(4);
-})();
+(async function() {
+	return await 3;
+})(), (async function(x) {
+	await console.log(x);
+})(4);
 function invoke(x, y) {
 	return x(y);
 }
 invoke(async function() {
 	return await 1;
-});
-invoke(async function(x) {
+}), invoke(async function(x) {
 	await console.log(x);
 }, 2);
-console.log('top');
-!(async function() {
+function top() {
+	console.log('top');
+}
+top();
+async function async_top() {
 	console.log('async_top');
-})();
+}
+async_top();

```

## `terser/collapse_vars/issue_2437`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 397 vs reference 354 (no whitespaces: +43, formatted: +54)

```js
function foo() {
	bar();
}
function bar() {
	if (xhrDesc) {
		var req = new XMLHttpRequest();
		var result = !!req.onreadystatechange;
		Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {});
		return result;
	} else {
		var req = new XMLHttpRequest();
		var detectFunc = function() {};
		req.onreadystatechange = detectFunc;
		var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
		req.onreadystatechange = null;
		return result;
	}
}
foo();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,14 @@
-!(function() {
+function foo() {
+	bar();
+}
+function bar() {
 	if (xhrDesc) {
-		var result = !!(req = new XMLHttpRequest()).onreadystatechange;
+		var req = new XMLHttpRequest(), result = !!req.onreadystatechange;
 		return Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {}), result;
 	}
-	var req, detectFunc = function() {};
-	(req = new XMLHttpRequest()).onreadystatechange = detectFunc, result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc, req.onreadystatechange = null;
-})();
+	var req = new XMLHttpRequest(), detectFunc = function() {};
+	req.onreadystatechange = detectFunc;
+	var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
+	return req.onreadystatechange = null, result;
+}
+foo();

```

## `terser/functions/issue_2663_2`

- tags: `join vars`, `remove unused`
- size: oxc 102 vs reference 59 (no whitespaces: +43, formatted: +62)

```js
(function() {
	var i;
	function fn(j) {
		return (function() {
			console.log(j);
		})();
	}
	for (i in {
		a: 1,
		b: 2,
		c: 3
	}) fn(i);
})();

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,13 @@
 (function() {
 	var i;
+	function fn(j) {
+		return (function() {
+			console.log(j);
+		})();
+	}
 	for (i in {
 		a: 1,
 		b: 2,
 		c: 3
-	}) console.log(i);
+	}) fn(i);
 })();

```

## `terser/hoist_props/issue_851_hoist_to_conflicting_name`

- tags: `join vars`
- size: oxc 75 vs reference 32 (no whitespaces: +43, formatted: +57)

```js
const BBB = { CCC: 'PASS' };
if (id(true)) {
	const BBB_CCC = BBB.CCC;
	console.log(BBB_CCC);
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-if (id(true)) console.log('PASS');
+const BBB = { CCC: 'PASS' };
+if (id(!0)) {
+	let BBB_CCC = BBB.CCC;
+	console.log(BBB_CCC);
+}

```

## `terser/identity/inline_identity_higher_order`

- tags: `join vars`, `remove unused`
- size: oxc 60 vs reference 17 (no whitespaces: +43, formatted: +59)

```js
const id = (x) => x;
const inc = (x) => x + 1;
console.log(id(inc(1)), id(inc)(2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(2, 3);
+const id = (x) => x, inc = (x) => x + 1;
+console.log(id(inc(1)), id(inc)(2));

```

## `terser/issue_1275/string_plus_optimization`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 272 vs reference 229 (no whitespaces: +43, formatted: +57)

```js
function foo(anything) {
	function throwing_function() {
		throw 'nope';
	}
	try {
		console.log('0' + throwing_function() ? 'yes' : 'no');
	} catch (ex) {
		console.log(ex);
	}
	console.log('0' + anything ? 'yes' : 'no');
	console.log(anything + '0' ? 'Yes' : 'No');
	console.log('' + anything);
	console.log(anything + '');
}
foo();

```

```diff
--- reference
+++ oxc
@@ -3,13 +3,10 @@
 		throw 'nope';
 	}
 	try {
-		console.log((throwing_function(), 'yes'));
+		console.log('0' + throwing_function() ? 'yes' : 'no');
 	} catch (ex) {
 		console.log(ex);
 	}
-	console.log('yes');
-	console.log('Yes');
-	console.log('' + anything);
-	console.log(anything + '');
+	console.log('0' + anything ? 'yes' : 'no'), console.log(anything + '0' ? 'Yes' : 'No'), console.log('' + anything), console.log(anything + '');
 }
 foo();

```

## `terser/parameters/accept_destructuring_async_word_with_default`

- size: oxc 43 vs reference 0 (no whitespaces: +43, formatted: +50)

```js
console.log((({ async = 'PASS' }) => async)({}));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1 @@
+console.log((({ async = 'PASS' }) => async)({}));

```

## `terser/block_scope/switch_block_scope_mangler`

- size: oxc 214 vs reference 170 (no whitespaces: +44, formatted: +44)

```js
var fn = function(code) {
	switch (code) {
		case 1:
			let apple = code + 1;
			let dog = code + 4;
			console.log(apple, dog);
			break;
		case 2:
			let banana = code + 2;
			console.log(banana);
			break;
		default:
			let cat = code + 3;
			console.log(cat);
	}
};
fn(1);
fn(2);
fn(3);

```

```diff
--- reference
+++ oxc
@@ -1,17 +1,17 @@
-var fn = function(e) {
-	switch (e) {
+var fn = function(code) {
+	switch (code) {
 		case 1:
-			let l = e + 1;
-			let o = e + 4;
-			console.log(l, o);
+			let apple = code + 1;
+			let dog = code + 4;
+			console.log(apple, dog);
 			break;
 		case 2:
-			let n = e + 2;
-			console.log(n);
+			let banana = code + 2;
+			console.log(banana);
 			break;
 		default:
-			let c = e + 3;
-			console.log(c);
+			let cat = code + 3;
+			console.log(cat);
 	}
 };
 fn(1);

```

## `terser/collapse_vars/issue_2436_6`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 67 vs reference 23 (no whitespaces: +44, formatted: +63)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-console.log({
-	x: 1,
-	y: 2
-});
+var o = {
+	a: 1,
+	b: 2
+};
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(o));

```

## `terser/collapse_vars/issue_2436_7`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 67 vs reference 23 (no whitespaces: +44, formatted: +63)

```js
var o = {
	a: 1,
	b: 2
};
console.log((function(c) {
	return {
		x: c.a,
		y: c.b
	};
})(o));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-console.log({
-	x: 1,
-	y: 2
-});
+var o = {
+	a: 1,
+	b: 2
+};
+console.log((function(c) {
+	return {
+		x: c.a,
+		y: c.b
+	};
+})(o));

```

## `terser/functions/avoid_generating_duplicate_functions_compared_together_3`

- tags: `join vars`, `remove unused`
- size: oxc 44 vs reference 0 (no whitespaces: +44, formatted: +52)

```js
const x = () => null;
console.log(id(x) === id(x));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+const x = () => null;
+console.log(id(x) === id(x));

```

## `terser/functions/issue_2630_5`

- tags: `join vars`, `remove unused`
- size: oxc 117 vs reference 73 (no whitespaces: +44, formatted: +59)

```js
var c = 1;
!(function() {
	do {
		c *= 10;
	} while (f());
	function f() {
		return (function() {
			return (c = 2 + c) < 100;
		})(c = c + 3);
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,12 @@
 var c = 1;
-!(function() {
-	do {
+(function() {
+	do
 		c *= 10;
-	} while ((c = 2 + (c += 3)) < 100);
+	while (f());
+	function f() {
+		return (function() {
+			return (c = 2 + c) < 100;
+		})(c += 3);
+	}
 })();
 console.log(c);

```

## `terser/issue_1609/chained_evaluation_1`

- tags: `join vars`, `remove unused`
- size: oxc 55 vs reference 11 (no whitespaces: +44, formatted: +64)

```js
(function() {
	var a = 1;
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
@@ -1 +1,6 @@
-f(1).bar = 1;
+(function() {
+	(function() {
+		var b = 1, c = f(b);
+		c.bar = b;
+	})();
+})();

```

## `terser/reduce_vars/func_arg_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 64 vs reference 20 (no whitespaces: +44, formatted: +57)

```js
var a = 42;
!(function(a) {
	console.log(a());
})(function(a) {
	return a;
});

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(void 0);
+var a = 42;
+(function(a) {
+	console.log(a());
+})(function(a) {
+	return a;
+});

```

## `terser/reduce_vars/shorthand_obj_arg_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 90 vs reference 46 (no whitespaces: +44, formatted: +57)

```js
var C = 1;
var bar = function() {
	return C + C;
};
function f(obj) {
	return obj.bar();
}
console.log(f({ bar }));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-console.log({ bar: function() {
-	return 2;
-} }.bar());
+var C = 1, bar = function() {
+	return C + C;
+};
+function f(obj) {
+	return obj.bar();
+}
+console.log(f({ bar }));

```

## `terser/reduce_vars/shorthand_obj_arg_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 90 vs reference 46 (no whitespaces: +44, formatted: +57)

```js
var C = 1;
var bar = function() {
	return C + C;
};
function f(obj) {
	return obj.bar();
}
console.log(f({ bar }));

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
-console.log({ bar: function() {
-	return 2;
-} }.bar());
+var C = 1, bar = function() {
+	return C + C;
+};
+function f(obj) {
+	return obj.bar();
+}
+console.log(f({ bar }));

```

## `terser/functions/issue_2101`

- size: oxc 97 vs reference 52 (no whitespaces: +45, formatted: +58)

```js
a = {};
console.log((function() {
	return (function() {
		return this.a;
	})();
})() === (function() {
	return a;
})());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 a = {};
 console.log((function() {
-	return this.a;
-})() === a);
+	return (function() {
+		return this.a;
+	})();
+})() === (function() {
+	return a;
+})());

```

## `terser/functions/issue_2630_1`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 90 vs reference 45 (no whitespaces: +45, formatted: +69)

```js
var c = 0;
(function() {
	while (f());
	function f() {
		var a = (function() {
			var b = c++, d = c = 1 + c;
		})();
	}
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
 var c = 0;
-while (void (c = 1 + ++c));
-console.log(c);
+(function() {
+	for (; f(););
+	function f() {
+		(function() {
+			c++, c = 1 + c;
+		})();
+	}
+})(), console.log(c);

```

## `terser/arrow/issue_2084`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 124 vs reference 78 (no whitespaces: +46, formatted: +68)

```js
var c = 0;
!(function() {
	!(function(c) {
		c = 1 + c;
		var c = 0;
		function f14(a_1) {
			if (c = 1 + c, 0 !== 23 .toString()) c = 1 + c, a_1 && (a_1[0] = 0);
		}
		f14();
	})(-1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,11 @@
 var c = 0;
-((c) => {
-	c = 1 + c, c = 1 + (c = 0), 0 !== 23 .toString() && (c = 1 + c);
-})(-1), console.log(c);
+(function() {
+	(function(c) {
+		c = 1 + c;
+		var c = 0;
+		function f14(a_1) {
+			c = 1 + c, c = 1 + c, a_1 && (a_1[0] = 0);
+		}
+		f14();
+	})(-1);
+})(), console.log(c);

```

## `terser/collapse_vars/issue_1562`

- tags: `join vars`, `remove unused`
- size: oxc 128 vs reference 82 (no whitespaces: +46, formatted: +74)

```js
var v = 1, B = 2;
for (v in objs) f(B);
var x = 3, C = 10;
while (x + 2) bar(C);
var y = 4, D = 20;
do {
	bar(D);
} while (y + 2);
var z = 5, E = 30;
for (; f(z + 2);) bar(E);

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,10 @@
-var v = 1;
-for (v in objs) f(2);
-while (5) bar(10);
+var v = 1, B = 2;
+for (v in objs) f(B);
+var x = 3, C = 10;
+for (; x + 2;) bar(C);
+var y = 4, D = 20;
 do
-	bar(20);
-while (6);
-for (; f(7);) bar(30);
+	bar(D);
+while (y + 2);
+var z = 5, E = 30;
+for (; f(z + 2);) bar(E);

```

## `terser/functions/issue_2647_2`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 34 (no whitespaces: +46, formatted: +60)

```js
(function() {
	function foo(x) {
		return x.toUpperCase();
	}
	console.log((() => foo('pass'))());
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log('pass'.toUpperCase());
+(function() {
+	function foo(x) {
+		return x.toUpperCase();
+	}
+	console.log(foo('pass'));
+})();

```

## `terser/functions/issue_2647_3`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 34 (no whitespaces: +46, formatted: +60)

```js
(function() {
	function foo(x) {
		return x.toUpperCase();
	}
	console.log((() => foo('pass'))());
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log('pass'.toUpperCase());
+(function() {
+	function foo(x) {
+		return x.toUpperCase();
+	}
+	console.log(foo('pass'));
+})();

```

## `terser/functions/issue_2114_1`

- tags: `join vars`, `remove unused`
- size: oxc 128 vs reference 81 (no whitespaces: +47, formatted: +62)

```js
var c = 0;
!(function(a) {
	a = 0;
})([{
	0: c = c + 1,
	length: c = 1 + c
}, typeof void (function a() {
	var b = (function f1(a) {})(b && (b.b += (c = c + 1, 0)));
})()]);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
 var c = 0;
-c = 1 + (c += 1), (function() {
-	var b = void (b && (b.b += (c += 1, 0)));
-})();
+(function(a) {
+	a = 0;
+})([{
+	0: c += 1,
+	length: c = 1 + c
+}, typeof void (function() {
+	var b = (b && (b.b += (c += 1, 0)), void 0);
+})()]);
 console.log(c);

```

## `terser/functions/issue_2114_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 128 vs reference 81 (no whitespaces: +47, formatted: +62)

```js
var c = 0;
!(function(a) {
	a = 0;
})([{
	0: c = c + 1,
	length: c = 1 + c
}, typeof void (function a() {
	var b = (function f1(a) {})(b && (b.b += (c = c + 1, 0)));
})()]);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
 var c = 0;
-c = 1 + (c += 1), (function() {
-	var b = void (b && (b.b += (c += 1, 0)));
-})();
+(function(a) {
+	a = 0;
+})([{
+	0: c += 1,
+	length: c = 1 + c
+}, typeof void (function() {
+	var b = (b && (b.b += (c += 1, 0)), void 0);
+})()]);
 console.log(c);

```

## `terser/reduce_vars/func_arg_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 63 vs reference 16 (no whitespaces: +47, formatted: +60)

```js
var a = 42;
!(function(a) {
	console.log(a());
})(function() {
	return a;
});

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(42);
+var a = 42;
+(function(a) {
+	console.log(a());
+})(function() {
+	return a;
+});

```

## `terser/reduce_vars/variables_collision_in_immediately_invoked_func`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 165 vs reference 118 (no whitespaces: +47, formatted: +52)

```js
(function(callback) {
	callback();
})(function() {
	window.used = function() {
		var A = window.foo, B = window.bar, C = window.foobar;
		return (function(A, c) {
			if (-1 === c) return A;
			return $(A, c);
		})(B, C);
	}.call(this);
});

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,9 @@
-!function() {
-	window.used = (function() {
-		window.foo;
-		var B = window.bar, C = window.foobar;
-		return -1 === C ? B : $(B, C);
-	}).call(this);
-}();
+(function(callback) {
+	callback();
+})(function() {
+	window.used = function() {
+		return window.foo, (function(A, c) {
+			return c === -1 ? A : $(A, c);
+		})(window.bar, window.foobar);
+	}.call(this);
+});

```

## `terser/try_catch/issue_452`

- tags: `remove unused`
- size: oxc 47 vs reference 0 (no whitespaces: +47, formatted: +58)

```js
try {
	const arr = ['PASS'];
	for (const x of arr) {
		console.log(x);
	}
} catch (e) {}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+try {
+	for (let x of ['PASS']) console.log(x);
+} catch {}

```

## `terser/collapse_vars/collapse_vars_assignment`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 331 vs reference 283 (no whitespaces: +48, formatted: +75)

```js
function log(x) {
	return console.log(x), x;
}
function f0(c) {
	var a = 3 / c;
	return a = a;
}
function f1(c) {
	const a = 3 / c;
	const b = 1 - a;
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
@@ -2,25 +2,29 @@
 	return console.log(x), x;
 }
 function f0(c) {
-	return 3 / c;
+	var a = 3 / c;
+	return a = a;
 }
 function f1(c) {
 	return 1 - 3 / c;
 }
 function f2(c) {
-	return log(c = 3 / c - 7);
+	var b = 3 / c - 7;
+	return log(c = b);
 }
 function f3(c) {
-	var a = 3 / c;
-	return log(c |= a - 7);
+	var b = 3 / c - 7;
+	return log(c |= b);
 }
 function f4(c) {
-	return log(2 + 3 / c);
+	var a = 3 / c, b = 2;
+	return log(b += a);
 }
 function f5(c) {
-	return log(2 + 3 / c);
+	var b = 2, a = 3 / c;
+	return log(b += a);
 }
 function f6(c) {
-	var b = g();
-	return log(b += 3 / c);
+	var b = g(), a = 3 / c;
+	return log(b += a);
 }

```

## `terser/functions/avoid_generating_duplicate_functions_compared_together`

- tags: `join vars`, `remove unused`
- size: oxc 48 vs reference 0 (no whitespaces: +48, formatted: +61)

```js
const x = () => null;
const y = () => x;
console.log(y() === y());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+const x = () => null, y = () => x;
+console.log(y() === y());

```

## `terser/pure_getters/issue_2838`

- tags: `pure getters`
- size: oxc 116 vs reference 68 (no whitespaces: +48, formatted: +60)

```js
function f(a, b) {
	(a || b).c = 'PASS';
	(function() {
		return f(a, b);
	}).prototype.foo = 'bar';
}
var o = {};
f(null, o);
console.log(o.c);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
 function f(a, b) {
 	(a || b).c = 'PASS';
+	(function() {
+		return f(a, b);
+	}).prototype.foo = 'bar';
 }
 var o = {};
 f(null, o);

```

## `terser/reduce_vars/defun_redefine`

- tags: `join vars`, `remove unused`
- size: oxc 95 vs reference 47 (no whitespaces: +48, formatted: +68)

```js
function f() {
	function g() {
		return 1;
	}
	function h() {
		return 2;
	}
	g = function() {
		return 3;
	};
	return g() + h();
}

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,12 @@
 function f() {
-	(function() {
+	function g() {
+		return 1;
+	}
+	function h() {
+		return 2;
+	}
+	g = function() {
 		return 3;
-	});
-	return 3 + 2;
+	};
+	return g() + h();
 }

```

## `terser/reduce_vars/iife_assign`

- tags: `join vars`, `remove unused`
- size: oxc 63 vs reference 15 (no whitespaces: +48, formatted: +69)

```js
!(function() {
	var a = 1, b = 0;
	!(function() {
		b++;
		return;
		a = 2;
	})();
	console.log(a);
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-console.log(1);
+(function() {
+	var a = 1, b = 0;
+	(function() {
+		b++;
+	})();
+	console.log(a);
+})();

```

## `terser/arrow/issue_2136_3`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 64 vs reference 15 (no whitespaces: +49, formatted: +63)

```js
function f(x) {
	console.log(x);
}
!(function(a, ...b) {
	f(b[0]);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(2);
+function f(x) {
+	console.log(x);
+}
+(function(a, ...b) {
+	f(b[0]);
+})(1, 2, 3);

```

## `terser/drop_unused/issue_2136_3`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 64 vs reference 15 (no whitespaces: +49, formatted: +63)

```js
function f(x) {
	console.log(x);
}
!(function(a, ...b) {
	f(b[0]);
})(1, 2, 3);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log(2);
+function f(x) {
+	console.log(x);
+}
+(function(a, ...b) {
+	f(b[0]);
+})(1, 2, 3);

```

## `terser/if_return/if_var_return`

- tags: `join vars`, `sequences`
- size: oxc 147 vs reference 98 (no whitespaces: +49, formatted: +76)

```js
function f() {
	var a;
	return;
	var b;
}
function g() {
	var a;
	if (u()) {
		var b;
		return v();
		var c;
	}
	var d;
	if (w()) {
		var e;
		return x();
		var f;
	} else {
		var g;
		y();
		var h;
	}
	var i;
	z();
	var j;
}

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,24 @@
 function f() {
-	var a, b;
+	var a;
+	return;
+	var b;
 }
 function g() {
-	var a, b, c, d, e, f, g, h, i, j;
-	return u() ? v() : w() ? x() : (y(), z(), void 0);
+	var a;
+	if (u()) {
+		var b;
+		return v();
+		var c;
+	}
+	var d;
+	if (w()) {
+		var e;
+		return x();
+		var f;
+	}
+	var g;
+	y();
+	var h, i;
+	z();
+	var j;
 }

```

## `terser/reduce_vars/obj_var_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 64 vs reference 15 (no whitespaces: +49, formatted: +65)

```js
var C = 1;
var obj = { bar: function() {
	return C + C;
} };
console.log(obj.bar());

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(2);
+var C = 1, obj = { bar: function() {
+	return C + C;
+} };
+console.log(obj.bar());

```

## `terser/dead_code/dead_code_const_annotation`

- tags: `join vars`, `sequences`
- size: oxc 98 vs reference 48 (no whitespaces: +50, formatted: +59)

```js
var unused;
/** @const */ var CONST_FOO_ANN = false;
if (CONST_FOO_ANN) {
	console.log('unreachable');
	var moo;
	function bar() {}
}

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
-var unused;
-var CONST_FOO_ANN = !1;
-var moo;
-var bar;
+var unused, CONST_FOO_ANN = !1;
+if (CONST_FOO_ANN) {
+	console.log('unreachable');
+	var moo;
+	function bar() {}
+}

```

## `terser/pure_funcs/issue_3065_3`

- tags: `join vars`, `remove unused`, `pure functions`
- size: oxc 86 vs reference 36 (no whitespaces: +50, formatted: +59)

```js
function debug(msg) {
	console.log(msg);
}
debug((function() {
	console.log('PASS');
	return 'FAIL';
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
+function debug(msg) {
+	console.log(msg);
+}
 (function() {
 	console.log('PASS');
+	return 'FAIL';
 })();

```

## `terser/reduce_vars/func_modified`

- tags: `join vars`, `remove unused`
- size: oxc 134 vs reference 84 (no whitespaces: +50, formatted: +70)

```js
function f(a) {
	function a() {
		return 1;
	}
	function b() {
		return 2;
	}
	function c() {
		return 3;
	}
	b.inject = [];
	c = function() {
		return 4;
	};
	return a() + b() + c();
}

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,16 @@
 function f(a) {
+	function a() {
+		return 1;
+	}
 	function b() {
 		return 2;
 	}
+	function c() {
+		return 3;
+	}
 	b.inject = [];
-	(function() {
+	c = function() {
 		return 4;
-	});
-	return 1 + 2 + 4;
+	};
+	return a() + b() + c();
 }

```

## `terser/switch/issue_441_1`

- size: oxc 68 vs reference 18 (no whitespaces: +50, formatted: +70)

```js
switch (foo) {
	case bar:
		qux();
		break;
	case baz:
		qux();
		break;
	default:
		qux();
		break;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,9 @@
-foo, bar, baz;
-qux();
+switch (foo) {
+	case bar:
+		qux();
+		break;
+	case baz:
+		qux();
+		break;
+	default: qux();
+}

```

## `terser/drop_unused/drop_toplevel_funcs`

- tags: `remove unused`
- size: oxc 100 vs reference 49 (no whitespaces: +51, formatted: +68)

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
@@ -1,4 +1,10 @@
 var a, b = 1, c = g;
+function f(d) {
+	return function() {
+		c = 2;
+	};
+}
 a = 2;
 function g() {}
+function h() {}
 console.log(b = 3);

```

## `terser/functions/issue_2783`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 112 vs reference 61 (no whitespaces: +51, formatted: +69)

```js
(function() {
	return g;
	function f(a) {
		var b = a.b;
		if (b) return b;
		return a;
	}
	function g(o, i) {
		while (i--) {
			console.log(f(o));
		}
	}
})()({ b: 'PASS' }, 1);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
-(function(o, i) {
-	while (i--) console.log(o.b || o);
-})({ b: 'PASS' }, 1);
+(function() {
+	return g;
+	function f(a) {
+		return a.b || a;
+	}
+	function g(o, i) {
+		for (; i--;) console.log(f(o));
+	}
+})()({ b: 'PASS' }, 1);

```

## `terser/reduce_vars/issue_2423_6`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 102 vs reference 51 (no whitespaces: +51, formatted: +72)

```js
function x() {
	y();
}
function y() {
	console.log(1);
}
function z() {
	function y() {
		console.log(2);
	}
	x();
	y();
}
z();
z();

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,15 @@
-function z() {
+function x() {
+	y();
+}
+function y() {
 	console.log(1);
-	console.log(2);
 }
+function z() {
+	function y() {
+		console.log(2);
+	}
+	x();
+	y();
+}
 z();
 z();

```

## `terser/drop_unused/issue_t161_top_retain_11`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 125 vs reference 73 (no whitespaces: +52, formatted: +67)

```js
function f() {
	return x;
}
function g() {
	return y;
}
function h() {
	return z;
}
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,11 @@
+function f() {
+	return x;
+}
 function g() {
 	return y;
 }
-var x = 2, y = 3;
-console.log(x, y, 4, x * y, 4 * x, 4 * y, x, g(), 4);
+function h() {
+	return z;
+}
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

## `terser/expansions/avoid_spread_hole`

- size: oxc 52 vs reference 0 (no whitespaces: +52, formatted: +60)

```js
let x = [...[,]];
let y = [,];
console.log(0 in x, 0 in y);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+let x = [void 0];
+let y = [,];
+console.log(0 in x, 0 in y);

```

## `terser/functions/inline_1`

- size: oxc 97 vs reference 45 (no whitespaces: +52, formatted: +67)

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
@@ -1,3 +1,9 @@
-console.log(1);
-console.log(2);
-console.log(3);
+(function() {
+	console.log(1);
+})();
+(function(a) {
+	console.log(a);
+})(2);
+(function(b) {
+	console.log(b);
+})(3);

```

## `terser/functions/inline_2`

- size: oxc 97 vs reference 45 (no whitespaces: +52, formatted: +67)

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
@@ -1,3 +1,9 @@
-console.log(1);
-console.log(2);
-console.log(3);
+(function() {
+	console.log(1);
+})();
+(function(a) {
+	console.log(a);
+})(2);
+(function(b) {
+	console.log(b);
+})(3);

```

## `terser/functions/inline_3`

- size: oxc 97 vs reference 45 (no whitespaces: +52, formatted: +67)

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
@@ -1,3 +1,9 @@
-console.log(1);
-console.log(2);
-console.log(3);
+(function() {
+	console.log(1);
+})();
+(function(a) {
+	console.log(a);
+})(2);
+(function(b) {
+	console.log(b);
+})(3);

```

## `terser/functions/inline_true`

- size: oxc 97 vs reference 45 (no whitespaces: +52, formatted: +67)

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
@@ -1,3 +1,9 @@
-console.log(1);
-console.log(2);
-console.log(3);
+(function() {
+	console.log(1);
+})();
+(function(a) {
+	console.log(a);
+})(2);
+(function(b) {
+	console.log(b);
+})(3);

```

## `terser/properties/prop_side_effects_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 82 vs reference 30 (no whitespaces: +52, formatted: +68)

```js
var C = 1;
console.log(C);
var obj = { '': function() {
	return C + C;
} };
console.log(obj['']());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,6 @@
-console.log(1);
-console.log(2);
+var C = 1;
+console.log(C);
+var obj = { '': function() {
+	return C + C;
+} };
+console.log(obj['']());

```

## `terser/pure_getters/collapse_rhs_call`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 52 vs reference 0 (no whitespaces: +52, formatted: +65)

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
@@ -0,0 +1,6 @@
+var o = {};
+function f() {
+	console.log('PASS');
+}
+o.f = f;
+f();

```

## `terser/functions/duplicate_argnames`

- tags: `join vars`, `remove unused`
- size: oxc 73 vs reference 20 (no whitespaces: +53, formatted: +70)

```js
var a = 'PASS';
function f(b, b, b) {
	b && (a = 'FAIL');
}
f(0, console);
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1 +1,6 @@
-console.log('PASS');
+var a = 'PASS';
+function f(b, b, b) {
+	b && (a = 'FAIL');
+}
+f(0, console);
+console.log(a);

```

## `terser/functions/issue_2428`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 104 vs reference 51 (no whitespaces: +53, formatted: +65)

```js
function bar(k) {
	console.log(k);
}
function foo(x) {
	return bar(x);
}
function baz(a) {
	foo(a);
}
baz(42);
baz('PASS');

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,11 @@
+function bar(k) {
+	console.log(k);
+}
+function foo(x) {
+	return bar(x);
+}
 function baz(a) {
-	console.log(a);
+	foo(a);
 }
 baz(42);
 baz('PASS');

```

## `terser/drop_unused/issue_t161_top_retain_10`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 125 vs reference 71 (no whitespaces: +54, formatted: +71)

```js
function f() {
	return x;
}
function g() {
	return y;
}
function h() {
	return z;
}
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,11 @@
 function f() {
 	return x;
 }
-var x = 2, y = 3;
-console.log(2, y, 4, 2 * y, 8, 4 * y, f(), y, 4);
+function g() {
+	return y;
+}
+function h() {
+	return z;
+}
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

## `terser/drop_unused/unused_class_with_static_props_side_effects`

- size: oxc 54 vs reference 0 (no whitespaces: +54, formatted: +68)

```js
let x = 'FAIL';
class X {
	static _ = x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+let x = 'FAIL';
+class X {
+	static _ = x = 'PASS';
+}
+console.log(x);

```

## `terser/functions/issue_2616`

- tags: `join vars`, `remove unused`
- size: oxc 109 vs reference 55 (no whitespaces: +54, formatted: +80)

```js
var c = 'FAIL';
(function() {
	function f() {
		function g(NaN) {
			(true << NaN) - 0 / 0 || (c = 'PASS');
		}
		g([]);
	}
	f();
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,11 @@
 var c = 'FAIL';
-(true << []) - 0 / 0 || (c = 'PASS');
+(function() {
+	function f() {
+		function g(NaN) {
+			(!0 << NaN) - 0 / 0 || (c = 'PASS');
+		}
+		g([]);
+	}
+	f();
+})();
 console.log(c);

```

## `terser/properties/lhs_prop_2`

- tags: `join vars`, `remove unused`
- size: oxc 103 vs reference 49 (no whitespaces: +54, formatted: +69)

```js
[1][0] = 42;
(function(a) {
	a.b = 'g';
})('abc');
(function(a) {
	a[2] = 'g';
})('def');
(function(a) {
	a[''] = 'g';
})('ghi');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
 [1][0] = 42;
-'abc'.b = 'g';
-'def'[2] = 'g';
-'ghi'[''] = 'g';
+(function(a) {
+	a.b = 'g';
+})('abc');
+(function(a) {
+	a[2] = 'g';
+})('def');
+(function(a) {
+	a[''] = 'g';
+})('ghi');

```

## `terser/switch/issue_1705_2`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 54 vs reference 0 (no whitespaces: +54, formatted: +66)

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
@@ -0,0 +1,5 @@
+var a = 0;
+switch (a) {
+	default: console.log('FAIL');
+	case 0:
+}

```

## `terser/expansions/avoid_spread_holes_call`

- size: oxc 55 vs reference 0 (no whitespaces: +55, formatted: +67)

```js
let x = (a, b) => [a, b];
let y = x(...[,], 1);
console.log(...y);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+let x = (a, b) => [a, b];
+let y = x(void 0, 1);
+console.log(...y);

```

## `terser/functions/issue_2630_4`

- tags: `join vars`, `remove unused`
- size: oxc 110 vs reference 55 (no whitespaces: +55, formatted: +79)

```js
var x = 3, a = 1, b = 2;
(function() {
	(function f1() {
		while (--x >= 0 && f2());
	})();
	function f2() {
		a++ + (b += a);
	}
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,10 @@
 var x = 3, a = 1, b = 2;
-while (--x >= 0 && void a++);
+(function() {
+	(function() {
+		for (; --x >= 0 && f2(););
+	})();
+	function f2() {
+		a++ + (b += a);
+	}
+})();
 console.log(a);

```

## `terser/pure_funcs/issue_3065_4`

- tags: `join vars`, `remove unused`, `pure functions`
- size: oxc 91 vs reference 36 (no whitespaces: +55, formatted: +66)

```js
var debug = function(msg) {
	console.log(msg);
};
debug((function() {
	console.log('PASS');
	return 'FAIL';
})());

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,7 @@
+var debug = function(msg) {
+	console.log(msg);
+};
 (function() {
 	console.log('PASS');
+	return 'FAIL';
 })();

```

## `terser/switch/issue_441_2`

- size: oxc 78 vs reference 23 (no whitespaces: +55, formatted: +76)

```js
switch (foo) {
	case bar:
		qux();
		break;
	case fall:
	case baz:
		qux();
		break;
	default:
		qux();
		break;
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,10 @@
-foo, bar, fall, baz;
-qux();
+switch (foo) {
+	case bar:
+		qux();
+		break;
+	case fall:
+	case baz:
+		qux();
+		break;
+	default: qux();
+}

```

## `terser/conditionals/ifs_3_should_warn`

- tags: `sequences`
- size: oxc 90 vs reference 34 (no whitespaces: +56, formatted: +85)

```js
var x, y;
if (x && !(x + '1') && y) {
	var qq;
	foo();
} else {
	bar();
}
if (x || !!(x + '1') || y) {
	foo();
} else {
	var jj;
	bar();
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
 var x, y;
-var qq;
-bar();
-var jj;
-foo();
+if (x && !(x + '1') && y) {
+	var qq;
+	foo();
+} else bar();
+if (x || x + '1' || y) foo();
+else {
+	var jj;
+	bar();
+}

```

## `terser/evaluate/issue_1964_2`

- tags: `join vars`, `remove unused`
- size: oxc 140 vs reference 84 (no whitespaces: +56, formatted: +60)

```js
function f() {
	var long_variable_name = /\s/;
	console.log(long_variable_name.source);
	return 'a b c'.split(long_variable_name)[1];
}
console.log(f());

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,6 @@
 function f() {
-	console.log(/\s/.source);
-	return 'a b c'.split(/\s/)[1];
+	var long_variable_name = /\s/;
+	console.log(long_variable_name.source);
+	return 'a b c'.split(long_variable_name)[1];
 }
 console.log(f());

```

## `terser/evaluate/prop_function`

- size: oxc 121 vs reference 65 (no whitespaces: +56, formatted: +74)

```js
console.log({
	a: { b: 1 },
	b: function() {}
} + 1, {
	a: { b: 1 },
	b: function() {}
}.a + 1, {
	a: { b: 1 },
	b: function() {}
}.b + 1, {
	a: { b: 1 },
	b: function() {}
}.a.b + 1);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-console.log({
+console.log('[object Object]1', {
+	a: { b: 1 },
+	b: function() {}
+}.a + 1, {
+	a: { b: 1 },
+	b: function() {}
+}.b + 1, {
 	a: { b: 1 },
 	b: function() {}
-} + 1, { b: 1 } + 1, function() {} + 1, 2);
+}.a.b + 1);

```

## `terser/issue_281/safe_undefined`

- tags: `sequences`, `remove unused`
- size: oxc 96 vs reference 40 (no whitespaces: +56, formatted: +66)

```js
var a, c;
console.log((function(undefined) {
	return function() {
		if (a) return b;
		if (c) return d;
	};
})(1)());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,7 @@
 var a, c;
-console.log(a ? b : (0, c) ? d : void 0);
+console.log((function(undefined) {
+	return function() {
+		if (a) return b;
+		if (c) return d;
+	};
+})(1)());

```

## `terser/sequences/delete_seq_4`

- tags: `sequences`
- size: oxc 202 vs reference 146 (no whitespaces: +56, formatted: +64)

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
-console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !1)), console.log((f(), !1)), console.log((f(), !0)), console.log((f(), !0));
+console.log(delete (f(), undefined)), console.log(delete (f(), void 0)), console.log(delete (f(), Infinity)), console.log(delete (f(), 1 / 0)), console.log(delete (f(), NaN)), console.log(delete (f(), NaN));

```

## `terser/sequences/delete_seq_5`

- tags: `sequences`
- size: oxc 202 vs reference 146 (no whitespaces: +56, formatted: +64)

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
-console.log((f(), !0)), console.log((f(), !0)), console.log((f(), !1)), console.log((f(), !1)), console.log((f(), !0)), console.log((f(), !0));
+console.log(delete (f(), undefined)), console.log(delete (f(), void 0)), console.log(delete (f(), Infinity)), console.log(delete (f(), 1 / 0)), console.log(delete (f(), NaN)), console.log(delete (f(), NaN));

```

## `terser/template_string/array_join`

- size: oxc 162 vs reference 106 (no whitespaces: +56, formatted: +65)

```js
var foo = [`1 ${any} 2`].join('');
var bar = ['before', `1 ${any} 2`].join('');
var baz = [`1 ${any} 2`, 'after'].join('');
var qux = [
	'before',
	`1 ${any} 2`,
	'after'
].join('');

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
-var foo = `1 ${any} 2`;
-var bar = `before1 ${any} 2`;
-var baz = `1 ${any} 2after`;
-var qux = `before1 ${any} 2after`;
+var foo = [`1 ${any} 2`].join('');
+var bar = ['before', `1 ${any} 2`].join('');
+var baz = [`1 ${any} 2`, 'after'].join('');
+var qux = [
+	'before',
+	`1 ${any} 2`,
+	'after'
+].join('');

```

## `terser/evaluate/unsafe_integer_key_complex`

- size: oxc 130 vs reference 73 (no whitespaces: +57, formatted: +117)

```js
console.log({
	0: { 1: 1 },
	1: 1
} + 1, {
	0: { 1: 1 },
	1: 1
}[0] + 1, {
	0: { 1: 1 },
	1: 1
}['0'] + 1, {
	0: { 1: 1 },
	1: 1
}[1] + 1, {
	0: { 1: 1 },
	1: 1
}[0][1] + 1, {
	0: { 1: 1 },
	1: 1
}[0]['1'] + 1);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,19 @@
 console.log({
 	0: { 1: 1 },
 	1: 1
-} + 1, '[object Object]1', '[object Object]1', 2, 2, 2);
+} + 1, {
+	0: { 1: 1 },
+	1: 1
+}[0] + 1, {
+	0: { 1: 1 },
+	1: 1
+}[0] + 1, {
+	0: { 1: 1 },
+	1: 1
+}[1] + 1, {
+	0: { 1: 1 },
+	1: 1
+}[0][1] + 1, {
+	0: { 1: 1 },
+	1: 1
+}[0][1] + 1);

```

## `terser/issue_281/collapse_vars_constants`

- tags: `join vars`, `remove unused`
- size: oxc 208 vs reference 151 (no whitespaces: +57, formatted: +82)

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
@@ -1,9 +1,14 @@
 function f1(x) {
-	var b = x.prop, d = sideeffect1(), e = sideeffect2();
-	return b + (d - 4 * e - 5);
+	var b = x.prop, c = 5, d = sideeffect1(), e = sideeffect2();
+	return b + (function() {
+		return d - 4 * e - c;
+	})();
 }
 function f2(x) {
-	var b = x.prop;
+	var b = x.prop, c = 5;
 	sideeffect1();
-	return b + (-4 * sideeffect2() - 5);
+	var e = sideeffect2();
+	return b + (function() {
+		return -4 * e - c;
+	})();
 }

```

## `terser/destructuring/empty_object_destructuring_3`

- tags: `remove unused`, `pure getters`
- size: oxc 102 vs reference 44 (no whitespaces: +58, formatted: +76)

```js
var {} = Object;
let { L } = Object, L2 = 'foo';
const bar = 'bar', { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-const { C2 = console.log('side effect') } = Object;
+var {} = Object;
+let { L } = Object, L2 = 'foo';
+const bar = 'bar', { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

## `terser/destructuring/empty_object_destructuring_4`

- tags: `remove unused`, `pure getters`
- size: oxc 102 vs reference 44 (no whitespaces: +58, formatted: +76)

```js
var {} = Object;
let { L } = Object, L2 = 'foo';
const bar = 'bar', { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

```diff
--- reference
+++ oxc
@@ -1 +1,3 @@
-const { C2 = console.log('side effect') } = Object;
+var {} = Object;
+let { L } = Object, L2 = 'foo';
+const bar = 'bar', { prop: C1, C2 = console.log('side effect'), C3 } = Object;

```

## `terser/drop_unused/unused_circular_references_3`

- tags: `remove unused`
- size: oxc 85 vs reference 27 (no whitespaces: +58, formatted: +80)

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
@@ -1,3 +1,9 @@
 function f(x, y) {
+	var g = function() {
+		return h();
+	};
+	var h = function() {
+		return g();
+	};
 	return x + y;
 }

```

## `terser/evaluate/pow_sequence_with_parens_evaluated`

- tags: `join vars`, `remove unused`
- size: oxc 76 vs reference 18 (no whitespaces: +58, formatted: +77)

```js
var one = 1;
var two = 2;
var four = 4;
console.log((four ** one) ** two, (four ** one) ** (one / two));

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(16, 2);
+var one = 1, two = 2, four = 4;
+console.log((four ** one) ** two, (four ** one) ** (one / two));

```

## `terser/evaluate/unsafe_float_key`

- size: oxc 125 vs reference 67 (no whitespaces: +58, formatted: +74)

```js
console.log({ 2.72: 1 } + 1, { 2.72: 1 }[2.72] + 1, { 2.72: 1 }['2.72'] + 1, { 2.72: 1 }[3.14] + 1, { 2.72: 1 }[2.72][3.14] + 1, { 2.72: 1 }[2.72]['3.14'] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1 @@
-console.log({ 2.72: 1 } + 1, 2, 2, { 2.72: 1 }[3.14] + 1, 1[3.14] + 1, 1['3.14'] + 1);
+console.log({ 2.72: 1 } + 1, { 2.72: 1 }[2.72] + 1, { 2.72: 1 }['2.72'] + 1, { 2.72: 1 }[3.14] + 1, { 2.72: 1 }[2.72][3.14] + 1, { 2.72: 1 }[2.72]['3.14'] + 1);

```

## `terser/logical_assignment/logical_assignment_not_always_happens`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 58 vs reference 0 (no whitespaces: +58, formatted: +68)

```js
let result = 'PASS';
let x;
x &&= result = 'FAIL';
console.log(result);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+let result = 'PASS', x;
+x &&= result = 'FAIL', console.log(result);

```

## `terser/hoist_props/name_collision_2`

- tags: `join vars`
- size: oxc 137 vs reference 78 (no whitespaces: +59, formatted: +83)

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
-var o_p = 1;
-console.log(true, function() {
-	return 4;
-}(), function() {
-	return 6;
-}(), 2, 3);
+var o = {
+	p: 1,
+	'+': function(x) {
+		return x;
+	},
+	'-': function(x) {
+		return x + 1;
+	}
+}, o__$0 = 2, o__$1 = 3;
+console.log(o.p === o.p, o['+'](4), o['-'](5), o__$0, o__$1);

```

## `terser/functions/recursive_inline_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 60 vs reference 0 (no whitespaces: +60, formatted: +81)

```js
function f() {
	h();
}
function g(a) {
	a();
}
function h(b) {
	g();
	if (b) x();
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+function f() {
+	h();
+}
+function g(a) {
+	a();
+}
+function h(b) {
+	g(), b && x();
+}

```

## `terser/properties/join_object_assignments_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 79 vs reference 19 (no whitespaces: +60, formatted: +78)

```js
var o = { foo: 1 };
o.bar = 2;
o.baz = 3;
console.log(o.foo, o.bar + o.bar, o.foo * o.bar * o.baz);

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(1, 4, 6);
+var o = { foo: 1 };
+o.bar = 2;
+o.baz = 3;
+console.log(o.foo, o.bar + o.bar, o.foo * o.bar * o.baz);

```

## `terser/collapse_vars/collapse_vars_self_reference`

- tags: `join vars`, `sequences`
- size: oxc 91 vs reference 30 (no whitespaces: +61, formatted: +86)

```js
function f1() {
	var self = { inner: function() {
		return self;
	} };
}
function f2() {
	var self = { inner: self };
}

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,8 @@
-function f1() {}
-function f2() {}
+function f1() {
+	var self = { inner: function() {
+		return self;
+	} };
+}
+function f2() {
+	var self = { inner: self };
+}

```

## `terser/drop_unused/issue_2665`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 110 vs reference 49 (no whitespaces: +61, formatted: +75)

```js
var a = 1;
function g() {
	a-- && g();
}
typeof h == 'function' && h();
function h() {
	typeof g == 'function' && g();
}
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -2,5 +2,8 @@
 function g() {
 	a-- && g();
 }
-g();
+typeof h == 'function' && h();
+function h() {
+	typeof g == 'function' && g();
+}
 console.log(a);

```

## `terser/functions/issue_2657`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 112 vs reference 50 (no whitespaces: +62, formatted: +82)

```js
'use strict';
console.log((function f() {
	return h;
	function g(b) {
		return b || b();
	}
	function h(a) {
		g(a);
		return a;
	}
})()(42));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
 'use strict';
-console.log(function() {
-	return 42;
-}());
+console.log((function() {
+	return h;
+	function g(b) {
+		return b || b();
+	}
+	function h(a) {
+		return g(a), a;
+	}
+})()(42));

```

## `terser/pure_funcs/arithmetic`

- tags: `pure functions`
- size: oxc 98 vs reference 36 (no whitespaces: +62, formatted: +80)

```js
foo() + foo();
foo() - bar();
foo() * 'bar';
bar() / foo();
bar() & bar();
bar() | 'bar';
'bar' >> foo();
'bar' << bar();
'bar' >>> 'bar';

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,8 @@
-bar();
-bar();
-bar(), bar();
-bar();
-bar();
+foo() + foo();
+foo() - bar();
+foo() * 'bar';
+bar() / foo();
+bar() & bar();
+bar() | 'bar';
+'bar' >> foo();
+'bar' << bar();

```

## `terser/typeof/typeof_defun_2`

- tags: `join vars`
- size: oxc 136 vs reference 74 (no whitespaces: +62, formatted: +74)

```js
var f = function() {
	console.log(x);
};
var x = 0;
x++ < 2 && typeof f == 'function' && f();
x++ < 2 && typeof f == 'function' && f();
x++ < 2 && typeof f == 'function' && f();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,6 @@
 var f = function() {
 	console.log(x);
-};
-var x = 0;
-x++ < 2 && f();
-x++ < 2 && f();
-x++ < 2 && f();
+}, x = 0;
+x++ < 2 && typeof f == 'function' && f();
+x++ < 2 && typeof f == 'function' && f();
+x++ < 2 && typeof f == 'function' && f();

```

## `terser/arguments/issue_687`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 63 vs reference 0 (no whitespaces: +63, formatted: +70)

```js
function shouldBePure() {
	return arguments.length;
}
shouldBePure();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+function shouldBePure() {
+	return arguments.length;
+}
+shouldBePure();

```

## `terser/conditionals/delete_conditional_1`

- tags: `sequences`
- size: oxc 159 vs reference 96 (no whitespaces: +63, formatted: +68)

```js
console.log(delete (1 ? undefined : x));
console.log(delete (1 ? void 0 : x));
console.log(delete (1 ? Infinity : x));
console.log(delete (1 ? 1 / 0 : x));
console.log(delete (1 ? NaN : x));
console.log(delete (1 ? 0 / 0 : x));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete void 0), console.log(delete void 0), console.log(delete (0, Infinity)), console.log(delete (1 / 0)), console.log(delete NaN), console.log(delete NaN);

```

## `terser/conditionals/delete_conditional_2`

- tags: `sequences`
- size: oxc 159 vs reference 96 (no whitespaces: +63, formatted: +68)

```js
console.log(delete (0 ? x : undefined));
console.log(delete (0 ? x : void 0));
console.log(delete (0 ? x : Infinity));
console.log(delete (0 ? x : 1 / 0));
console.log(delete (0 ? x : NaN));
console.log(delete (0 ? x : 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete void 0), console.log(delete void 0), console.log(delete (0, Infinity)), console.log(delete (1 / 0)), console.log(delete NaN), console.log(delete NaN);

```

## `terser/evaluate/delete_binary_1`

- size: oxc 159 vs reference 96 (no whitespaces: +63, formatted: +68)

```js
console.log(delete (true && undefined));
console.log(delete (true && void 0));
console.log(delete (true && Infinity));
console.log(delete (true && 1 / 0));
console.log(delete (true && NaN));
console.log(delete (true && 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete void 0);
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/evaluate/delete_binary_2`

- size: oxc 159 vs reference 96 (no whitespaces: +63, formatted: +68)

```js
console.log(delete (false || undefined));
console.log(delete (false || void 0));
console.log(delete (false || Infinity));
console.log(delete (false || 1 / 0));
console.log(delete (false || NaN));
console.log(delete (false || 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete void 0);
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/evaluate/delete_expr_1`

- size: oxc 159 vs reference 96 (no whitespaces: +63, formatted: +66)

```js
console.log(delete undefined);
console.log(delete void 0);
console.log(delete Infinity);
console.log(delete (1 / 0));
console.log(delete NaN);
console.log(delete (0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!1);
-console.log(!0);
-console.log(!1);
-console.log(!0);
-console.log(!1);
-console.log(!0);
+console.log(delete undefined);
+console.log(delete void 0);
+console.log(delete Infinity);
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/evaluate/delete_expr_2`

- size: oxc 159 vs reference 96 (no whitespaces: +63, formatted: +66)

```js
console.log(delete undefined);
console.log(delete void 0);
console.log(delete Infinity);
console.log(delete (1 / 0));
console.log(delete NaN);
console.log(delete (0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!1);
-console.log(!0);
-console.log(!1);
-console.log(!0);
-console.log(!1);
-console.log(!0);
+console.log(delete undefined);
+console.log(delete void 0);
+console.log(delete Infinity);
+console.log(delete (1 / 0));
+console.log(delete NaN);
+console.log(delete NaN);

```

## `terser/drop_unused/issue_t161_top_retain_5`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 81 vs reference 17 (no whitespaces: +64, formatted: +87)

```js
(function() {
	function f() {
		return 2;
	}
	function g() {
		return 3;
	}
	console.log(f(), g());
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(2, 3);
+(function() {
+	function f() {
+		return 2;
+	}
+	function g() {
+		return 3;
+	}
+	console.log(f(), g());
+})();

```

## `terser/logical_assignment/.assignment_in_left_part`

- tags: `join vars`, `remove unused`
- size: oxc 64 vs reference 0 (no whitespaces: +64, formatted: +76)

```js
var status = 'FAIL';
var x = {};
x[status = 'PASS'] ||= 1;
console.log(status);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+var status = 'FAIL', x = {};
+x[status = 'PASS'] ||= 1;
+console.log(status);

```

## `terser/reduce_vars/defun_call`

- tags: `join vars`, `remove unused`
- size: oxc 86 vs reference 22 (no whitespaces: +64, formatted: +87)

```js
function f() {
	return g() + h(1) - h(g(), 2, 3);
	function g() {
		return 4;
	}
	function h(a) {
		return a;
	}
}

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
 function f() {
-	return 1;
+	return g() + h(1) - h(g(), 2, 3);
+	function g() {
+		return 4;
+	}
+	function h(a) {
+		return a;
+	}
 }

```

## `terser/reduce_vars/issue_1670_5`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 15 (no whitespaces: +65, formatted: +89)

```js
(function(a) {
	switch (1) {
		case a:
			console.log(a);
			break;
		default:
			console.log(2);
			break;
	}
})(1);

```

```diff
--- reference
+++ oxc
@@ -1 +1,8 @@
-console.log(1);
+(function(a) {
+	switch (1) {
+		case a:
+			console.log(a);
+			break;
+		default: console.log(2);
+	}
+})(1);

```

## `terser/arguments/modified`

- size: oxc 163 vs reference 97 (no whitespaces: +66, formatted: +66)

```js
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
@@ -1,9 +1,9 @@
 (function(a, b) {
-	var c = a;
-	var d = b;
+	var c = arguments[0];
+	var d = arguments[1];
 	var a = 'foo';
 	b++;
-	a = 'moo';
-	b *= 2;
-	console.log(a, b, c, d, a, b);
+	arguments[0] = 'moo';
+	arguments[1] *= 2;
+	console.log(a, b, c, d, arguments[0], arguments[1]);
 })('bar', 42);

```

## `terser/functions/issue_2620_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 101 vs reference 35 (no whitespaces: +66, formatted: +95)

```js
var c = 'FAIL';
(function() {
	function f(a) {
		var b = (function g(a) {
			a && a();
		})();
		if (a) {
			var d = c = 'PASS';
		}
	}
	f(1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,9 @@
 var c = 'FAIL';
-console.log(c = 'PASS');
+(function() {
+	function f(a) {
+		(function(a) {
+			a && a();
+		})(), a && (c = 'PASS');
+	}
+	f(1);
+})(), console.log(c);

```

## `terser/functions/issue_2620_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 101 vs reference 35 (no whitespaces: +66, formatted: +95)

```js
var c = 'FAIL';
(function() {
	function f(a) {
		var b = (function g(a) {
			a && a();
		})();
		if (a) {
			var d = c = 'PASS';
		}
	}
	f(1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,9 @@
 var c = 'FAIL';
-console.log(c = 'PASS');
+(function() {
+	function f(a) {
+		(function(a) {
+			a && a();
+		})(), a && (c = 'PASS');
+	}
+	f(1);
+})(), console.log(c);

```

## `terser/identity/inline_identity_inner_ref`

- tags: `join vars`, `remove unused`
- size: oxc 98 vs reference 31 (no whitespaces: +67, formatted: +90)

```js
const id = (a) => (function() {
	return a;
})();
const undef = (a) => ((a) => a)();
console.log(id(1), id(2), undef(3), undef(4));

```

```diff
--- reference
+++ oxc
@@ -1 +1,4 @@
-console.log(1, 2, void 0, void 0);
+const id = (a) => (function() {
+	return a;
+})(), undef = (a) => ((a) => a)();
+console.log(id(1), id(2), undef(3), undef(4));

```

## `terser/inline/inline_annotation_2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 87 vs reference 20 (no whitespaces: +67, formatted: +78)

```js
const shouldInline = (n) => +n;
const a = shouldInline('42.0');
const b = shouldInline('abc');
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,2 @@
-console.log(42, 0 / 0);
+const shouldInline = (n) => +n, a = shouldInline('42.0'), b = shouldInline('abc');
+console.log(a, b);

```

## `terser/arrow/issue_2105_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 122 vs reference 54 (no whitespaces: +68, formatted: +107)

```js
((factory) => {
	factory();
})(() => ((fn) => {
	fn()().prop();
})(() => {
	let bar = () => {
		var quux = () => {
			console.log('PASS');
		}, foo = () => {
			console.log;
			quux();
		};
		return { prop: foo };
	};
	return bar;
}));

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,12 @@
-({ prop: () => {
-	console.log;
-	console.log('PASS');
-} }).prop();
+((factory) => {
+	factory();
+})(() => ((fn) => {
+	fn()().prop();
+})(() => () => {
+	var quux = () => {
+		console.log('PASS');
+	};
+	return { prop: () => {
+		quux();
+	} };
+}));

```

## `terser/drop_unused/issue_t161_top_retain_6`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 89 vs reference 21 (no whitespaces: +68, formatted: +91)

```js
(function() {
	function f() {
		return 2;
	}
	function g() {
		return 3;
	}
	console.log(f(), f(), g(), g());
})();

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(2, 2, 3, 3);
+(function() {
+	function f() {
+		return 2;
+	}
+	function g() {
+		return 3;
+	}
+	console.log(f(), f(), g(), g());
+})();

```

## `terser/hoist_props/issue_3071_1`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 68 vs reference 0 (no whitespaces: +68, formatted: +84)

```js
(function() {
	var obj = {};
	obj.one = 1;
	obj.two = 2;
	console.log(obj.one);
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function() {
+	var obj = {};
+	obj.one = 1, obj.two = 2, console.log(obj.one);
+})();

```

## `terser/collapse_vars/collapse_vars_repeated`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 160 vs reference 91 (no whitespaces: +69, formatted: +98)

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
@@ -4,4 +4,10 @@
 function f2(x) {
 	return x;
 }
-console.log('GOOD!!'), console.log('GOOD!!');
+(function(x) {
+	var a = 'GOOD' + x;
+	console.log(a + '!');
+})('!'), (function(x) {
+	var a = 'GOOD' + x;
+	'' + x, console.log(a + '!');
+})('!');

```

## `terser/drop_unused/drop_toplevel_keep_assign`

- tags: `remove unused`
- size: oxc 100 vs reference 31 (no whitespaces: +69, formatted: +91)

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
@@ -1,3 +1,10 @@
-var a, b = 1;
+var a, b = 1, c = g;
+function f(d) {
+	return function() {
+		c = 2;
+	};
+}
 a = 2;
+function g() {}
+function h() {}
 console.log(b = 3);

```

## `terser/nullish/simplify_nullish_coalescing`

- tags: `drop debugger`, `join vars`, `remove unused`
- size: oxc 143 vs reference 74 (no whitespaces: +69, formatted: +84)

```js
const y = id('one');
const is_null = null;
const not_null = 'two';
const folded_true = false ? 0 : true;
const folded_false = false ? 1 : false;
console.log(is_null ?? y);
console.log(not_null ?? y);
console.log(folded_true ?? y);
console.log(folded_false ?? y);

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,5 @@
-console.log(id('one'));
+const y = id('one'), is_null = null, not_null = 'two', folded_true = !0, folded_false = !1;
+console.log(y);
 console.log('two');
 console.log(!0);
 console.log(!1);

```

## `terser/drop_unused/delete_assign_1`

- tags: `remove unused`
- size: oxc 179 vs reference 109 (no whitespaces: +70, formatted: +91)

```js
var a;
console.log(delete (a = undefined));
console.log(delete (a = void 0));
console.log(delete (a = Infinity));
console.log(delete (a = 1 / 0));
console.log(delete (a = NaN));
console.log(delete (a = 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,7 @@
-console.log(!0);
-console.log(!0);
-console.log(delete Infinity);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+var a;
+console.log(delete (a = void 0));
+console.log(delete (a = void 0));
+console.log(delete (a = Infinity));
+console.log(delete (a = 1 / 0));
+console.log(delete (a = NaN));
+console.log(delete (a = NaN));

```

## `terser/drop_unused/unused_seq_elements`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 70 vs reference 0 (no whitespaces: +70, formatted: +80)

```js
var a = 0, b = 0;
console.log('just-make-sure-it-is-compilable') && (a++, b++);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+var a = 0, b = 0;
+console.log('just-make-sure-it-is-compilable') && (a++, b++);

```

## `terser/hoist_props/issue_2519`

- tags: `join vars`, `remove unused`
- size: oxc 125 vs reference 55 (no whitespaces: +70, formatted: +94)

```js
function testFunc() {
	var dimensions = {
		minX: 5,
		maxX: 6
	};
	var scale = 1;
	var d = { x: (dimensions.maxX + dimensions.minX) / 2 };
	return d.x * scale;
}
console.log(testFunc());

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,8 @@
 function testFunc() {
-	return 5.5;
+	var dimensions = {
+		minX: 5,
+		maxX: 6
+	};
+	return { x: (dimensions.maxX + dimensions.minX) / 2 }.x * 1;
 }
 console.log(testFunc());

```

## `terser/properties/native_prototype`

- size: oxc 267 vs reference 197 (no whitespaces: +70, formatted: +69)

```js
Array.prototype.splice.apply(a, [
	1,
	2,
	b,
	c
]);
Function.prototype.call.apply(console.log, console, ['foo']);
Number.prototype.toFixed.call(Math.PI, 2);
Object.prototype.hasOwnProperty.call(d, 'foo');
RegExp.prototype.test.call(/foo/, 'bar');
String.prototype.indexOf.call(e, 'bar');

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,11 @@
-[].splice.apply(a, [
+Array.prototype.splice.apply(a, [
 	1,
 	2,
 	b,
 	c
 ]);
-(function() {}).call.apply(console.log, console, ['foo']);
-0 .toFixed.call(Math.PI, 2);
-({}).hasOwnProperty.call(d, 'foo');
-/t/.test.call(/foo/, 'bar');
-''.indexOf.call(e, 'bar');
+Function.prototype.call.apply(console.log, console, ['foo']);
+Number.prototype.toFixed.call(Math.PI, 2);
+Object.prototype.hasOwnProperty.call(d, 'foo');
+RegExp.prototype.test.call(/foo/, 'bar');
+String.prototype.indexOf.call(e, 'bar');

```

## `terser/class_properties/static_class_properties_side_effects`

- size: oxc 71 vs reference 0 (no whitespaces: +71, formatted: +86)

```js
class A {
	foo = console.log('PASS2');
	static bar = console.log('PASS1');
}
new A();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+class A {
+	foo = console.log('PASS2');
+	static bar = console.log('PASS1');
+}
+new A();

```

## `terser/collapse_vars/collapse_rhs_vardef`

- tags: `join vars`
- size: oxc 71 vs reference 0 (no whitespaces: +71, formatted: +94)

```js
var a, b = 1;
a = --b + (function c() {
	var b;
	c[--b] = 1;
})();
b |= a;
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+var a, b = 1;
+a = --b + (function c() {
+	var b;
+	c[--b] = 1;
+})();
+b |= a;
+console.log(a, b);

```

## `terser/drop_unused/issue_t161_top_retain_15`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 236 vs reference 165 (no whitespaces: +71, formatted: +86)

```js
class Alpha {
	num() {
		return x;
	}
}
class Beta {
	num() {
		return y;
	}
}
class Carrot {
	num() {
		return z;
	}
}
function f() {
	return x;
}
const g = () => y;
const h = () => z;
let x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h(), new Alpha().num(), new Beta().num(), new Carrot().num());

```

```diff
--- reference
+++ oxc
@@ -1,15 +1,21 @@
 class Alpha {
 	num() {
-		return n;
+		return e;
 	}
 }
-let n = 2, u = 4;
-console.log(n, 3, u, 3 * n, n * u, 3 * u, n, 3, u, new Alpha().num(), new class {
+class Beta {
 	num() {
-		return 3;
+		return t;
 	}
-}().num(), new class {
+}
+class Carrot {
 	num() {
-		return u;
+		return n;
 	}
-}().num());
+}
+function f() {
+	return e;
+}
+const g = () => t, h = () => n;
+let e = 2, t = 3, n = 4;
+console.log(2, 3, 4, 6, 8, 12, f(), g(), h(), new Alpha().num(), new Beta().num(), new Carrot().num());

```

## `terser/harmony/classes_extending_classes_out_of_pure_iifes`

- tags: `remove unused`
- size: oxc 71 vs reference 0 (no whitespaces: +71, formatted: +89)

```js
let Base = (() => {
	class A {}
	A.sub = Sub;
	return A;
})();
class Sub extends Base {}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+let Base = (() => {
+	class A {}
+	A.sub = Sub;
+	return A;
+})();
+class Sub extends Base {}

```

## `terser/reduce_vars/modified`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 562 vs reference 491 (no whitespaces: +71, formatted: +114)

```js
function f0() {
	var a = 1, b = 2;
	b++;
	console.log(a + 1);
	console.log(b + 1);
}
function f1() {
	var a = 1, b = 2;
	--b;
	console.log(a + 1);
	console.log(b + 1);
}
function f2() {
	var a = 1, b = 2, c = 3;
	b = c;
	console.log(a + b);
	console.log(b + c);
	console.log(a + c);
	console.log(a + b + c);
}
function f3() {
	var a = 1, b = 2, c = 3;
	b *= c;
	console.log(a + b);
	console.log(b + c);
	console.log(a + c);
	console.log(a + b + c);
}
function f4() {
	var a = 1, b = 2, c = 3;
	if (a) {
		b = c;
	} else {
		c = b;
	}
	console.log(a + b);
	console.log(b + c);
	console.log(a + c);
	console.log(a + b + c);
}
function f5(a) {
	B = a;
	console.log(typeof A ? 'yes' : 'no');
	console.log(typeof B ? 'yes' : 'no');
}
f0(), f1(), f2(), f3(), f4(), f5();

```

```diff
--- reference
+++ oxc
@@ -1,41 +1,24 @@
 function f0() {
-	var b = 2;
-	b++;
-	console.log(2);
-	console.log(4);
+	var a = 1, b = 2;
+	b++, console.log(a + 1), console.log(b + 1);
 }
 function f1() {
-	var b = 2;
-	--b;
-	console.log(2);
-	console.log(2);
+	var a = 1, b = 2;
+	--b, console.log(a + 1), console.log(b + 1);
 }
 function f2() {
-	3;
-	console.log(4);
-	console.log(6);
-	console.log(4);
-	console.log(7);
+	var a = 1, b = 2, c = 3;
+	b = c, console.log(a + b), console.log(b + c), console.log(a + c), console.log(a + b + c);
 }
 function f3() {
-	var b = 2;
-	b *= 3;
-	console.log(7);
-	console.log(9);
-	console.log(4);
-	console.log(10);
+	var a = 1, b = 2, c = 3;
+	b *= c, console.log(a + b), console.log(b + c), console.log(a + c), console.log(a + b + c);
 }
 function f4() {
-	var b = 2, c = 3;
-	b = c;
-	console.log(1 + b);
-	console.log(b + c);
-	console.log(1 + c);
-	console.log(1 + b + c);
+	var a = 1, b = 2, c = 3;
+	a ? b = c : c = b, console.log(a + b), console.log(b + c), console.log(a + c), console.log(a + b + c);
 }
 function f5(a) {
-	B = a;
-	console.log(typeof A ? 'yes' : 'no');
-	console.log(typeof B ? 'yes' : 'no');
+	B = a, console.log(typeof A ? 'yes' : 'no'), console.log(typeof B ? 'yes' : 'no');
 }
 f0(), f1(), f2(), f3(), f4(), f5();

```

## `terser/reduce_vars/obj_arg_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 86 vs reference 15 (no whitespaces: +71, formatted: +90)

```js
var C = 1;
function f(obj) {
	return obj.bar();
}
console.log(f({ bar: function() {
	return C + C;
} }));

```

```diff
--- reference
+++ oxc
@@ -1 +1,7 @@
-console.log(2);
+var C = 1;
+function f(obj) {
+	return obj.bar();
+}
+console.log(f({ bar: function() {
+	return C + C;
+} }));

```

## `terser/classes/pure_prop_assignment_for_classes`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 72 vs reference 0 (no whitespaces: +72, formatted: +86)

```js
class A {}
A.staticProp = 'A';
class B {
	static get danger() {}
}
B.staticProp = '';

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+class A {}
+A.staticProp = 'A';
+class B {
+	static get danger() {}
+}
+B.staticProp = '';

```

## `terser/hoist_props/issue_3071_2`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 72 vs reference 0 (no whitespaces: +72, formatted: +89)

```js
(function() {
	obj = {};
	obj.one = 1;
	obj.two = 2;
	console.log(obj.one);
	var obj;
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function() {
+	obj = {}, obj.one = 1, obj.two = 2, console.log(obj.one);
+	var obj;
+})();

```

## `terser/hoist_props/issue_3071_2_toplevel`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 72 vs reference 0 (no whitespaces: +72, formatted: +89)

```js
(function() {
	obj = {};
	obj.one = 1;
	obj.two = 2;
	console.log(obj.one);
	var obj;
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+(function() {
+	obj = {}, obj.one = 1, obj.two = 2, console.log(obj.one);
+	var obj;
+})();

```

## `terser/if_return/if_return_8`

- tags: `sequences`
- size: oxc 340 vs reference 268 (no whitespaces: +72, formatted: +72)

```js
function f(e) {
	if (2 == e) return foo();
	if (3 == e) return bar();
	if (4 == e) return baz();
	fail(e);
}
function g(e) {
	if (a(e)) return foo();
	if (b(e)) return bar();
	if (c(e)) return baz();
	fail(e);
}
function h(e) {
	if (a(e)) return foo();
	else if (b(e)) return bar();
	else if (c(e)) return baz();
	else fail(e);
}
function i(e) {
	if (a(e)) return foo();
	else if (b(e)) return bar();
	else if (c(e)) return baz();
	fail(e);
}

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,24 @@
 function f(e) {
-	return 2 == e ? foo() : 3 == e ? bar() : 4 == e ? baz() : void fail(e);
+	if (e == 2) return foo();
+	if (e == 3) return bar();
+	if (e == 4) return baz();
+	fail(e);
 }
 function g(e) {
-	return a(e) ? foo() : b(e) ? bar() : c(e) ? baz() : void fail(e);
+	if (a(e)) return foo();
+	if (b(e)) return bar();
+	if (c(e)) return baz();
+	fail(e);
 }
 function h(e) {
-	return a(e) ? foo() : b(e) ? bar() : c(e) ? baz() : void fail(e);
+	if (a(e)) return foo();
+	if (b(e)) return bar();
+	if (c(e)) return baz();
+	fail(e);
 }
 function i(e) {
-	return a(e) ? foo() : b(e) ? bar() : c(e) ? baz() : void fail(e);
+	if (a(e)) return foo();
+	if (b(e)) return bar();
+	if (c(e)) return baz();
+	fail(e);
 }

```

## `terser/sequences/delete_seq_1`

- size: oxc 168 vs reference 96 (no whitespaces: +72, formatted: +81)

```js
console.log(delete (1, undefined));
console.log(delete (1, void 0));
console.log(delete (1, Infinity));
console.log(delete (1, 1 / 0));
console.log(delete (1, NaN));
console.log(delete (1, 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete (0, undefined));
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete (0, NaN));
+console.log(delete NaN);

```

## `terser/sequences/delete_seq_2`

- size: oxc 168 vs reference 96 (no whitespaces: +72, formatted: +81)

```js
console.log(delete (1, 2, undefined));
console.log(delete (1, 2, void 0));
console.log(delete (1, 2, Infinity));
console.log(delete (1, 2, 1 / 0));
console.log(delete (1, 2, NaN));
console.log(delete (1, 2, 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete (0, undefined));
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete (0, NaN));
+console.log(delete NaN);

```

## `terser/sequences/delete_seq_3`

- size: oxc 168 vs reference 96 (no whitespaces: +72, formatted: +81)

```js
console.log(delete (1, 2, undefined));
console.log(delete (1, 2, void 0));
console.log(delete (1, 2, Infinity));
console.log(delete (1, 2, 1 / 0));
console.log(delete (1, 2, NaN));
console.log(delete (1, 2, 0 / 0));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,6 @@
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
-console.log(!0);
+console.log(delete (0, undefined));
+console.log(delete void 0);
+console.log(delete (0, Infinity));
+console.log(delete (1 / 0));
+console.log(delete (0, NaN));
+console.log(delete NaN);

```

## `terser/drop_unused/issue_t161_top_retain_14`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 236 vs reference 163 (no whitespaces: +73, formatted: +90)

```js
class Alpha {
	num() {
		return x;
	}
}
class Beta {
	num() {
		return y;
	}
}
class Carrot {
	num() {
		return z;
	}
}
function f() {
	return x;
}
const g = () => y;
const h = () => z;
let x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h(), new Alpha().num(), new Beta().num(), new Carrot().num());

```

```diff
--- reference
+++ oxc
@@ -3,13 +3,19 @@
 		return x;
 	}
 }
-let x = 2, z = 4;
-console.log(2, 3, z, 6, 2 * z, 3 * z, 2, 3, z, new Alpha().num(), new class {
+class Beta {
 	num() {
-		return 3;
+		return y;
 	}
-}().num(), new class {
+}
+class Carrot {
 	num() {
 		return z;
 	}
-}().num());
+}
+function f() {
+	return x;
+}
+const g = () => y, h = () => z;
+let x = 2, y = 3, z = 4;
+console.log(2, 3, 4, 6, 8, 12, f(), g(), h(), new Alpha().num(), new Beta().num(), new Carrot().num());

```

## `terser/functions/issue_2842`

- tags: `join vars`, `remove unused`
- size: oxc 164 vs reference 91 (no whitespaces: +73, formatted: +92)

```js
(function() {
	function inlinedFunction(data) {
		return data[data[0]];
	}
	function testMinify() {
		if (true) {
			const data = inlinedFunction([
				1,
				2,
				3
			]);
			console.log(data);
		}
	}
	return testMinify();
})();

```

```diff
--- reference
+++ oxc
@@ -1,11 +1,16 @@
 (function() {
-	(function() {
-		console.log(function(data) {
-			return data[data[0]];
-		}([
-			1,
-			2,
-			3
-		]));
-	})();
+	function inlinedFunction(data) {
+		return data[data[0]];
+	}
+	function testMinify() {
+		{
+			let data = inlinedFunction([
+				1,
+				2,
+				3
+			]);
+			console.log(data);
+		}
+	}
+	return testMinify();
 })();

```

## `terser/identity/inline_identity_regression`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 73 vs reference 0 (no whitespaces: +73, formatted: +91)

```js
global.id = (x) => x;
const foo = ({ bar }) => id(bar);
console.log(foo({ bar: 'PASS' }));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,3 @@
+global.id = (x) => x;
+const foo = ({ bar }) => id(bar);
+console.log(foo({ bar: 'PASS' }));

```

## `terser/async/issue_87`

- size: oxc 75 vs reference 0 (no whitespaces: +75, formatted: +90)

```js
function async(async) {
	console.log(async[0], async.prop);
}
async({
	0: 1,
	prop: 2
});

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+function async(async) {
+	console.log(async[0], async.prop);
+}
+async({
+	0: 1,
+	prop: 2
+});

```

## `terser/functions/function_returning_constant_literal`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 102 vs reference 27 (no whitespaces: +75, formatted: +88)

```js
function greeter() {
	return { message: 'Hello there' };
}
var greeting = greeter();
console.log(greeting.message);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log('Hello there');
+function greeter() {
+	return { message: 'Hello there' };
+}
+var greeting = greeter();
+console.log(greeting.message);

```

## `terser/functions/issue_2620_4`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 129 vs reference 54 (no whitespaces: +75, formatted: +112)

```js
var c = 'FAIL';
(function() {
	function f(a, NaN) {
		function g() {
			switch (a) {
				case a: break;
				case c = 'PASS', NaN: break;
			}
		}
		g();
	}
	f(0 / 0);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,14 @@
 var c = 'FAIL';
-if (0 / 0 === void (c = 'PASS')) {}
+(function() {
+	function f(a, NaN) {
+		function g() {
+			switch (a) {
+				case a: break;
+				case c = 'PASS', NaN:
+			}
+		}
+		g();
+	}
+	f(NaN);
+})();
 console.log(c);

```

## `terser/reduce_vars/issue_3113_3`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 75 vs reference 0 (no whitespaces: +75, formatted: +100)

```js
var c = 0;
(function() {
	function f() {
		while (g());
	}
	var a;
	function g() {
		a && a[c++];
	}
	g(a = 1);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+var c = 0;
+(function() {
+	var a;
+	function g() {
+		a && a[c++];
+	}
+	g(a = 1);
+})();
+console.log(c);

```

## `terser/classes/class_recursive_refs`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 78 vs reference 0 (no whitespaces: +78, formatted: +119)

```js
class a {
	set() {
		class b {
			set [b](c) {}
		}
	}
}
class b {
	constructor() {
		b();
	}
}
class c {
	[c] = 42;
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,15 @@
+class a {
+	set() {
+		class b {
+			set [b](c) {}
+		}
+	}
+}
+class b {
+	constructor() {
+		b();
+	}
+}
+class c {
+	[c] = 42;
+}

```

## `terser/collapse_vars/collapse_rhs_var`

- tags: `join vars`
- size: oxc 79 vs reference 0 (no whitespaces: +79, formatted: +107)

```js
var a, b;
function f() {
	a = f;
	b = f;
	return f;
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var a, b;
+function f() {
+	a = f;
+	b = f;
+	return f;
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/dead_code/issue_2233_1`

- size: oxc 79 vs reference 0 (no whitespaces: +79, formatted: +85)

```js
Array.isArray;
Boolean;
console.log;
Date;
decodeURI;
decodeURIComponent;
encodeURI;
encodeURIComponent;
Error.name;
escape;
eval;
EvalError;
Function.length;
isFinite;
isNaN;
JSON;
Math.random;
Number.isNaN;
parseFloat;
parseInt;
RegExp;
Object.defineProperty;
String.fromCharCode;
RangeError;
ReferenceError;
SyntaxError;
TypeError;
unescape;
URIError;

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+Array.isArray;
+Error.name;
+eval;
+Function.length;
+Number.isNaN;
+String.fromCharCode;

```

## `terser/drop_unused/unused_class_which_might_throw_2`

- size: oxc 79 vs reference 0 (no whitespaces: +79, formatted: +105)

```js
let x = 'FAIL';
try {
	class X {
		[ima_throw_lol()] = null;
	}
} catch (e) {
	x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+let x = 'FAIL';
+try {
+	class X {
+		[ima_throw_lol()] = null;
+	}
+} catch {
+	x = 'PASS';
+}
+console.log(x);

```

## `terser/functions/issue_2531_1`

- tags: `join vars`, `remove unused`
- size: oxc 164 vs reference 85 (no whitespaces: +79, formatted: +101)

```js
function outer() {
	function inner(value) {
		function closure() {
			return value;
		}
		return function() {
			return closure();
		};
	}
	return inner('Hello');
}
console.log('Greeting:', outer()());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,12 @@
 function outer() {
-	return function() {
-		return 'Hello';
-	};
+	function inner(value) {
+		function closure() {
+			return value;
+		}
+		return function() {
+			return closure();
+		};
+	}
+	return inner('Hello');
 }
 console.log('Greeting:', outer()());

```

## `terser/functions/issue_2531_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 164 vs reference 85 (no whitespaces: +79, formatted: +101)

```js
function outer() {
	function inner(value) {
		function closure() {
			return value;
		}
		return function() {
			return closure();
		};
	}
	return inner('Hello');
}
console.log('Greeting:', outer()());

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,12 @@
 function outer() {
-	return function() {
-		return 'Hello';
-	};
+	function inner(value) {
+		function closure() {
+			return value;
+		}
+		return function() {
+			return closure();
+		};
+	}
+	return inner('Hello');
 }
 console.log('Greeting:', outer()());

```

## `terser/harmony/issue_2349b`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`, `3 iterations`
- size: oxc 127 vs reference 48 (no whitespaces: +79, formatted: +101)

```js
function foo(boo, key) {
	const value = boo.get();
	return value.map(function({ [key]: bar }) {
		return bar;
	});
}
console.log(foo({ get: function() {
	return [{ blah: 42 }];
} }, 'blah'));

```

```diff
--- reference
+++ oxc
@@ -1 +1,8 @@
-console.log([{ blah: 42 }].map(({ ['blah']: l }) => l));
+function foo(e, t) {
+	return e.get().map(function({ [t]: e }) {
+		return e;
+	});
+}
+console.log(foo({ get: function() {
+	return [{ blah: 42 }];
+} }, 'blah'));

```

## `terser/properties/const_prop_assign_pure`

- tags: `pure getters`
- size: oxc 122 vs reference 43 (no whitespaces: +79, formatted: +90)

```js
function Simulator() {
	/abc/.index = 1;
	this._aircraft = [];
}
(function() {}).prototype.destroy = x();
(class {}).prototype.destroy = y();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 function Simulator() {
+	/abc/.index = 1;
 	this._aircraft = [];
 }
-x();
+(function() {}).prototype.destroy = x();
+(class {}).prototype.destroy = y();

```

## `terser/properties/const_prop_assign_strict`

- size: oxc 122 vs reference 43 (no whitespaces: +79, formatted: +90)

```js
function Simulator() {
	/abc/.index = 1;
	this._aircraft = [];
}
(function() {}).prototype.destroy = x();
(class {}).prototype.destroy = y();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,6 @@
 function Simulator() {
+	/abc/.index = 1;
 	this._aircraft = [];
 }
-x();
+(function() {}).prototype.destroy = x();
+(class {}).prototype.destroy = y();

```

## `terser/collapse_vars/collapse_rhs_undefined`

- tags: `join vars`
- size: oxc 80 vs reference 0 (no whitespaces: +80, formatted: +106)

```js
var a, b;
function f() {
	a = void 0;
	b = void 0;
	return void 0;
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+var a, b;
+function f() {
+	a = void 0;
+	b = void 0;
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/functions/avoid_generating_duplicate_functions_compared_together_2`

- tags: `join vars`, `remove unused`
- size: oxc 80 vs reference 0 (no whitespaces: +80, formatted: +97)

```js
const defaultArg = (input) => input;
const fn = (arg = defaultArg) => arg;
console.log(fn() === fn());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+const defaultArg = (input) => input, fn = (arg = defaultArg) => arg;
+console.log(fn() === fn());

```

## `terser/nullish/nullish_coalescing_parens`

- size: oxc 80 vs reference 0 (no whitespaces: +80, formatted: +84)

```js
console.log((false || null) ?? 'PASS');
console.log(null ?? (true && 'PASS'));
console.log((null ?? 0) || 'PASS');
console.log(null || (null ?? 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,4 @@
+console.log('PASS');
+console.log('PASS');
+console.log('PASS');
+console.log('PASS');

```

## `terser/properties/join_object_assignments_4`

- tags: `join vars`, `sequences`
- size: oxc 80 vs reference 0 (no whitespaces: +80, formatted: +93)

```js
var o;
console.log(o);
o = {};
o.a = 'foo';
console.log(o.b);
o.b = 'bar';
console.log(o.a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,2 @@
+var o;
+console.log(o), o = {}, o.a = 'foo', console.log(o.b), o.b = 'bar', console.log(o.a);

```

## `terser/collapse_vars/collapse_rhs_boolean_1`

- tags: `join vars`
- size: oxc 81 vs reference 0 (no whitespaces: +81, formatted: +110)

```js
var a, b;
function f() {
	a = !0;
	b = !0;
	return !0;
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var a, b;
+function f() {
+	a = !0;
+	b = !0;
+	return !0;
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/drop_unused/unused_class_which_might_throw`

- size: oxc 81 vs reference 0 (no whitespaces: +81, formatted: +107)

```js
let x = 'FAIL';
try {
	class X {
		static _ = ima_throw_lol();
	}
} catch (e) {
	x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+let x = 'FAIL';
+try {
+	class X {
+		static _ = ima_throw_lol();
+	}
+} catch {
+	x = 'PASS';
+}
+console.log(x);

```

## `terser/arrays/constant_join_2`

- size: oxc 409 vs reference 327 (no whitespaces: +82, formatted: +148)

```js
var a = [
	'foo',
	'bar',
	boo(),
	'baz',
	'x',
	'y'
].join('');
var b = [
	'foo',
	'bar',
	boo(),
	'baz',
	'x',
	'y'
].join('-');
var c = [
	'foo',
	'bar',
	boo(),
	'baz',
	'x',
	'y'
].join('really-long-separator');
var d = [
	'foo',
	'bar',
	boo(),
	[
		'foo',
		1,
		2,
		3,
		'bar'
	].join('+'),
	'baz',
	'x',
	'y'
].join('-');
var e = [
	'foo',
	'bar',
	boo(),
	[
		'foo',
		1,
		2,
		3,
		'bar'
	].join('+'),
	'baz',
	'x',
	'y'
].join('really-long-separator');
var f = [
	'str',
	'str' + variable,
	'foo',
	'bar',
	'moo' + foo
].join('');

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,18 @@
-var a = 'foobar' + boo() + 'bazxy';
+var a = [
+	'foo',
+	'bar',
+	boo(),
+	'baz',
+	'x',
+	'y'
+].join('');
 var b = [
-	'foo-bar',
+	'foo',
+	'bar',
 	boo(),
-	'baz-x-y'
+	'baz',
+	'x',
+	'y'
 ].join('-');
 var c = [
 	'foo',
@@ -13,17 +23,39 @@
 	'y'
 ].join('really-long-separator');
 var d = [
-	'foo-bar',
+	'foo',
+	'bar',
 	boo(),
-	'foo+1+2+3+bar-baz-x-y'
+	[
+		'foo',
+		1,
+		2,
+		3,
+		'bar'
+	].join('+'),
+	'baz',
+	'x',
+	'y'
 ].join('-');
 var e = [
 	'foo',
 	'bar',
 	boo(),
-	'foo+1+2+3+bar',
+	[
+		'foo',
+		1,
+		2,
+		3,
+		'bar'
+	].join('+'),
 	'baz',
 	'x',
 	'y'
 ].join('really-long-separator');
-var f = 'strstr' + variable + 'foobarmoo' + foo;
+var f = [
+	'str',
+	'str' + variable,
+	'foo',
+	'bar',
+	'moo' + foo
+].join('');

```

## `terser/collapse_vars/collapse_rhs_number`

- tags: `join vars`
- size: oxc 82 vs reference 0 (no whitespaces: +82, formatted: +110)

```js
var a, b;
function f() {
	a = 42;
	b = 42;
	return 42;
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var a, b;
+function f() {
+	a = 42;
+	b = 42;
+	return 42;
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/drop_unused/issue_t161_top_retain_8`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 125 vs reference 43 (no whitespaces: +82, formatted: +108)

```js
function f() {
	return x;
}
function g() {
	return y;
}
function h() {
	return z;
}
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,11 @@
-var y = 3;
-console.log(2, y, 4, 2 * y, 8, 4 * y, 2, y, 4);
+function f() {
+	return x;
+}
+function g() {
+	return y;
+}
+function h() {
+	return z;
+}
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

## `terser/drop_unused/issue_t161_top_retain_9`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 125 vs reference 43 (no whitespaces: +82, formatted: +108)

```js
function f() {
	return x;
}
function g() {
	return y;
}
function h() {
	return z;
}
var x = 2, y = 3, z = 4;
console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,11 @@
-var y = 3;
-console.log(2, y, 4, 2 * y, 8, 4 * y, 2, y, 4);
+function f() {
+	return x;
+}
+function g() {
+	return y;
+}
+function h() {
+	return z;
+}
+var x = 2, y = 3, z = 4;
+console.log(x, y, z, x * y, x * z, y * z, f(), g(), h());

```

## `terser/drop_unused/drop_toplevel_all`

- tags: `remove unused`
- size: oxc 100 vs reference 15 (no whitespaces: +85, formatted: +116)

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
@@ -1 +1,10 @@
-console.log(3);
+var a, b = 1, c = g;
+function f(d) {
+	return function() {
+		c = 2;
+	};
+}
+a = 2;
+function g() {}
+function h() {}
+console.log(b = 3);

```

## `terser/functions/issue_2601_2`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 122 vs reference 37 (no whitespaces: +85, formatted: +125)

```js
var a = 'FAIL';
(function() {
	function f(b) {
		function g(b) {
			b && b();
		}
		g();
		(function() {
			b && (a = 'PASS');
		})();
	}
	f('foo');
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,12 @@
 var a = 'FAIL';
-a = 'PASS', console.log(a);
+(function() {
+	function f(b) {
+		function g(b) {
+			b && b();
+		}
+		g(), (function() {
+			b && (a = 'PASS');
+		})();
+	}
+	f('foo');
+})(), console.log(a);

```

## `terser/reduce_vars/redefine_farg_2`

- tags: `join vars`, `remove unused`
- size: oxc 128 vs reference 43 (no whitespaces: +85, formatted: +107)

```js
function f(a) {
	var a;
	return typeof a;
}
function g(a) {
	var a = 42;
	return typeof a;
}
function h(a, b) {
	var a = b;
	return typeof a;
}
console.log(f([]), g([]), h([]));

```

```diff
--- reference
+++ oxc
@@ -1 +1,11 @@
-console.log('object', 'number', 'undefined');
+function f(a) {
+	var a;
+	return typeof a;
+}
+function g(a) {
+	return 'number';
+}
+function h(a, b) {
+	return typeof b;
+}
+console.log(f([]), g([]), h([]));

```

## `terser/reduce_vars/redefine_farg_3`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 128 vs reference 43 (no whitespaces: +85, formatted: +107)

```js
function f(a) {
	var a;
	return typeof a;
}
function g(a) {
	var a = 42;
	return typeof a;
}
function h(a, b) {
	var a = b;
	return typeof a;
}
console.log(f([]), g([]), h([]));

```

```diff
--- reference
+++ oxc
@@ -1 +1,11 @@
-console.log('object', 'number', 'undefined');
+function f(a) {
+	var a;
+	return typeof a;
+}
+function g(a) {
+	return 'number';
+}
+function h(a, b) {
+	return typeof b;
+}
+console.log(f([]), g([]), h([]));

```

## `terser/drop_unused/unused_class_with_static_props_side_effects_2`

- size: oxc 86 vs reference 0 (no whitespaces: +86, formatted: +106)

```js
let x = 'FAIL';
function impure() {
	x = 'PASS';
}
class Unused {
	static _ = impure();
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+let x = 'FAIL';
+function impure() {
+	x = 'PASS';
+}
+class Unused {
+	static _ = impure();
+}
+console.log(x);

```

## `terser/functions/issue_2601_1`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 122 vs reference 35 (no whitespaces: +87, formatted: +128)

```js
var a = 'FAIL';
(function() {
	function f(b) {
		function g(b) {
			b && b();
		}
		g();
		(function() {
			b && (a = 'PASS');
		})();
	}
	f('foo');
})();
console.log(a);

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,12 @@
 var a = 'FAIL';
-console.log(a = 'PASS');
+(function() {
+	function f(b) {
+		function g(b) {
+			b && b();
+		}
+		g(), (function() {
+			b && (a = 'PASS');
+		})();
+	}
+	f('foo');
+})(), console.log(a);

```

## `terser/collapse_vars/collapse_rhs_this`

- tags: `join vars`
- size: oxc 88 vs reference 0 (no whitespaces: +88, formatted: +116)

```js
var a, b;
function f() {
	a = this;
	b = this;
	return this;
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var a, b;
+function f() {
+	a = this;
+	b = this;
+	return this;
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/dead_code/issue_2233_3`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 17 (no whitespaces: +88, formatted: +100)

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
@@ -1 +1,8 @@
+var RegExp;
+Array.isArray;
 UndeclaredGlobal;
+function foo() {
+	var Number;
+	AnotherUndeclaredGlobal;
+	Number.isNaN;
+}

```

## `terser/drop_unused/unused_class_which_might_throw_3`

- size: oxc 89 vs reference 0 (no whitespaces: +89, formatted: +121)

```js
let x = 'FAIL';
try {
	class X {
		[ima_throw_lol()]() {
			return null;
		}
	}
} catch (e) {
	x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,11 @@
+let x = 'FAIL';
+try {
+	class X {
+		[ima_throw_lol()]() {
+			return null;
+		}
+	}
+} catch {
+	x = 'PASS';
+}
+console.log(x);

```

## `terser/collapse_vars/collapse_rhs_string`

- tags: `join vars`
- size: oxc 90 vs reference 0 (no whitespaces: +90, formatted: +119)

```js
var a, b;
function f() {
	a = 'foo';
	b = 'foo';
	return 'foo';
}
var c = f();
console.log(a === b, b === c, c === a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var a, b;
+function f() {
+	a = 'foo';
+	b = 'foo';
+	return 'foo';
+}
+var c = f();
+console.log(a === b, b === c, c === a);

```

## `terser/properties/issue_3188_2`

- tags: `join vars`, `remove unused`
- size: oxc 90 vs reference 0 (no whitespaces: +90, formatted: +128)

```js
(function() {
	var f = function() {
		console.log(this.p);
	};
	function g() {
		var o = {
			p: 'PASS',
			f
		};
		o.f();
	}
	g();
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+(function() {
+	var f = function() {
+		console.log(this.p);
+	};
+	function g() {
+		({
+			p: 'PASS',
+			f
+		}).f();
+	}
+	g();
+})();

```

## `terser/block_scope/issue_508`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `pure getters`
- size: oxc 91 vs reference 0 (no whitespaces: +91, formatted: +122)

```js
const foo = () => {
	let a;
	{
		let b = [];
		{
			console.log();
		}
		a = b;
		{
			let c = a;
			let b = 123456;
			console.log(b);
			c.push(b);
		}
	}
};
foo();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+const foo = () => {
+	let a;
+	console.log(), a = [];
+	{
+		let c = a, b = 123456;
+		console.log(b), c.push(b);
+	}
+};
+foo();

```

## `terser/dead_code/dead_code_constant_boolean_should_warn_more_strict`

- tags: `sequences`
- size: oxc 137 vs reference 46 (no whitespaces: +91, formatted: +120)

```js
'use strict';
while (!(foo || x + '0')) {
	console.log('unreachable');
	var foo;
}
for (var x = 10, y; x && (y || x) && !typeof x; ++x) {
	asdf();
	foo();
	var moo;
}
bar();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
 'use strict';
-var foo;
-var x = 10, y;
-var moo;
+for (; !(foo || x + '0');) {
+	console.log('unreachable');
+	var foo;
+}
+for (var x = 10, y; x && (y || x) && !typeof x; ++x) {
+	asdf(), foo();
+	var moo;
+}
 bar();

```

## `terser/reduce_vars/issue_443`

- tags: `join vars`, `remove unused`
- size: oxc 91 vs reference 0 (no whitespaces: +91, formatted: +108)

```js
const one_name = 'PASS';
var get_one = () => {
	if (one_name) return one_name;
};
{
	let one_name = get_one();
	console.log(one_name);
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+const one_name = 'PASS';
+var get_one = () => 'PASS';
+{
+	let one_name = get_one();
+	console.log(one_name);
+}

```

## `terser/drop_unused/unused_class_which_might_throw_4`

- size: oxc 92 vs reference 0 (no whitespaces: +92, formatted: +125)

```js
let x = 'FAIL';
try {
	class X {
		get [ima_throw_lol()]() {
			return null;
		}
	}
} catch (e) {
	x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,11 @@
+let x = 'FAIL';
+try {
+	class X {
+		get [ima_throw_lol()]() {
+			return null;
+		}
+	}
+} catch {
+	x = 'PASS';
+}
+console.log(x);

```

## `terser/pure_getters/collapse_rhs_setter`

- tags: `join vars`
- size: oxc 93 vs reference 0 (no whitespaces: +93, formatted: +119)

```js
try {
	console.log(({ set length(v) {
		throw 'PASS';
	} }.length = 'FAIL', 'FAIL'));
} catch (e) {
	console.log(e);
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+try {
+	console.log(({ set length(v) {
+		throw 'PASS';
+	} }.length = 'FAIL', 'FAIL'));
+} catch (e) {
+	console.log(e);
+}

```

## `terser/class_properties/computed_class_properties`

- size: oxc 94 vs reference 0 (no whitespaces: +94, formatted: +114)

```js
const x = 'FOO';
const y = 'BAR';
class X {
	[x] = 'PASS';
	static [y];
}
if ('BAR' in X) {
	console.log(new X()[x]);
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+const x = 'FOO';
+const y = 'BAR';
+class X {
+	FOO = 'PASS';
+	static BAR;
+}
+'BAR' in X && console.log(new X().FOO);

```

## `terser/class_properties/static_property_side_effects`

- tags: `remove unused`
- size: oxc 94 vs reference 0 (no whitespaces: +94, formatted: +114)

```js
let x = 'FAIL';
class cls {
	static [x = 'PASS'];
}
console.log(x);
class cls2 {
	static [console.log('PASS')];
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+let x = 'FAIL';
+class cls {
+	static [x = 'PASS'];
+}
+console.log(x);
+class cls2 {
+	static [console.log('PASS')];
+}

```

## `terser/issue_1704/mangle_catch_redef_3_ie8_toplevel`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`
- size: oxc 95 vs reference 0 (no whitespaces: +95, formatted: +134)

```js
var o = 'PASS';
try {
	throw 0;
} catch (o) {
	(function() {
		function f() {
			o = 'FAIL';
		}
		f(), f();
	})();
}
console.log(o);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+var e = 'PASS';
+try {
+	throw 0;
+} catch (e) {
+	(function() {
+		function f() {
+			e = 'FAIL';
+		}
+		f(), f();
+	})();
+}
+console.log(e);

```

## `terser/issue_1704/mangle_catch_redef_3_toplevel`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`
- size: oxc 95 vs reference 0 (no whitespaces: +95, formatted: +134)

```js
var o = 'PASS';
try {
	throw 0;
} catch (o) {
	(function() {
		function f() {
			o = 'FAIL';
		}
		f(), f();
	})();
}
console.log(o);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+var e = 'PASS';
+try {
+	throw 0;
+} catch (e) {
+	(function() {
+		function f() {
+			e = 'FAIL';
+		}
+		f(), f();
+	})();
+}
+console.log(e);

```

## `terser/block_scope/issue_334`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 124 vs reference 28 (no whitespaces: +96, formatted: +124)

```js
(function(A) {
	(function() {
		doPrint();
	})();
	function doPrint() {
		print(A);
	}
})('Hello World!');
function print(A) {
	if (!A.x) {
		console.log(A);
	}
}

```

```diff
--- reference
+++ oxc
@@ -1 +1,11 @@
-console.log('Hello World!');
+(function(A) {
+	(function() {
+		doPrint();
+	})();
+	function doPrint() {
+		print(A);
+	}
+})('Hello World!');
+function print(A) {
+	A.x || console.log(A);
+}

```

## `terser/drop_unused/function_argument_modified_by_function_statement`

- tags: `join vars`, `remove unused`
- size: oxc 97 vs reference 0 (no whitespaces: +97, formatted: +115)

```js
var printTest = (function(ret) {
	function ret() {
		console.log('PASS');
	}
	return ret;
})('FAIL');
printTest();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+var printTest = (function(ret) {
+	function ret() {
+		console.log('PASS');
+	}
+	return ret;
+})('FAIL');
+printTest();

```

## `terser/drop_unused/unused_class_which_extends_might_throw`

- size: oxc 98 vs reference 0 (no whitespaces: +98, formatted: +122)

```js
let x = 'FAIL';
try {
	class X extends might_throw_lol() {
		constructor() {}
	}
} catch (e) {
	x = 'PASS';
}
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+let x = 'FAIL';
+try {
+	class X extends might_throw_lol() {
+		constructor() {}
+	}
+} catch {
+	x = 'PASS';
+}
+console.log(x);

```

## `terser/functions/issue_3054`

- tags: `join vars`
- size: oxc 98 vs reference 0 (no whitespaces: +98, formatted: +120)

```js
'use strict';
function f() {
	return { a: true };
}
console.log((function(b) {
	b = false;
	return f();
})().a, f.call().a);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+'use strict';
+function f() {
+	return { a: !0 };
+}
+console.log((function(b) {
+	b = !1;
+	return f();
+})().a, f.call().a);

```

## `terser/hoist_props/issue_2377_1`

- tags: `join vars`, `remove unused`
- size: oxc 117 vs reference 18 (no whitespaces: +99, formatted: +135)

```js
var obj = {
	foo: 1,
	bar: 2,
	square: function(x) {
		return x * x;
	},
	cube: function(x) {
		return x * x * x;
	}
};
console.log(obj.foo, obj.cube(3));

```

```diff
--- reference
+++ oxc
@@ -1 +1,11 @@
-console.log(1, 27);
+var obj = {
+	foo: 1,
+	bar: 2,
+	square: function(x) {
+		return x * x;
+	},
+	cube: function(x) {
+		return x * x * x;
+	}
+};
+console.log(obj.foo, obj.cube(3));

```

## `terser/hoist_props/issue_2377_2`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 117 vs reference 18 (no whitespaces: +99, formatted: +135)

```js
var obj = {
	foo: 1,
	bar: 2,
	square: function(x) {
		return x * x;
	},
	cube: function(x) {
		return x * x * x;
	}
};
console.log(obj.foo, obj.cube(3));

```

```diff
--- reference
+++ oxc
@@ -1 +1,11 @@
-console.log(1, 27);
+var obj = {
+	foo: 1,
+	bar: 2,
+	square: function(x) {
+		return x * x;
+	},
+	cube: function(x) {
+		return x * x * x;
+	}
+};
+console.log(obj.foo, obj.cube(3));

```

## `terser/hoist_props/issue_2377_3`

- tags: `join vars`, `remove unused`, `4 iterations`
- size: oxc 117 vs reference 18 (no whitespaces: +99, formatted: +135)

```js
var obj = {
	foo: 1,
	bar: 2,
	square: function(x) {
		return x * x;
	},
	cube: function(x) {
		return x * x * x;
	}
};
console.log(obj.foo, obj.cube(3));

```

```diff
--- reference
+++ oxc
@@ -1 +1,11 @@
-console.log(1, 27);
+var obj = {
+	foo: 1,
+	bar: 2,
+	square: function(x) {
+		return x * x;
+	},
+	cube: function(x) {
+		return x * x * x;
+	}
+};
+console.log(obj.foo, obj.cube(3));

```

## `terser/reduce_vars/issue_294`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 188 vs reference 89 (no whitespaces: +99, formatted: +120)

```js
module.exports = (function(constructor) {
	return constructor();
})(function() {
	return function(input) {
		var keyToMap = input.key;
		return { mappedKey: (function(value) {
			return value || 'CONDITIONAL_DEFAULT_VALUE';
		})(keyToMap) };
	};
});

```

```diff
--- reference
+++ oxc
@@ -1,3 +1,9 @@
-module.exports = function(input) {
-	return { mappedKey: input.key || 'CONDITIONAL_DEFAULT_VALUE' };
-};
+module.exports = (function(constructor) {
+	return constructor();
+})(function() {
+	return function(input) {
+		return { mappedKey: (function(value) {
+			return value || 'CONDITIONAL_DEFAULT_VALUE';
+		})(input.key) };
+	};
+});

```

## `terser/collapse_vars/issue_2974`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 101 vs reference 0 (no whitespaces: +101, formatted: +132)

```js
var c = 0;
(function f(b) {
	var a = 2;
	do {
		b && b[b];
		b && (b.null = -4);
		c++;
	} while (b.null && --a > 0);
})(true);
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+var c = 0;
+(function(b) {
+	var a = 2;
+	do
+		b && b[b], b && (b.null = -4), c++;
+	while (b.null && --a > 0);
+})(!0), console.log(c);

```

## `terser/collapse_vars/collapse_rhs_boolean_2`

- tags: `join vars`
- size: oxc 102 vs reference 0 (no whitespaces: +102, formatted: +125)

```js
var a;
(function f1() {
	a = function() {};
	if (/foo/) console.log(typeof a);
})();
console.log((function f2() {
	a = [];
	return !1;
})());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+var a;
+(function() {
+	a = function() {};
+	console.log(typeof a);
+})();
+console.log((function() {
+	a = [];
+	return !1;
+})());

```

## `terser/hoist_props/name_collision_1`

- tags: `join vars`
- size: oxc 157 vs reference 55 (no whitespaces: +102, formatted: +132)

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
@@ -1,4 +1,12 @@
-var obj_bar = 2;
-(function() {
-	console.log(1, 3, 4, 5, 6, 7);
-})();
+var obj_foo = 1, obj_bar = 2;
+function f() {
+	var obj = {
+		foo: 3,
+		bar: 4,
+		'b-r': 5,
+		'b+r': 6,
+		'b!r': 7
+	};
+	console.log(obj_foo, obj.foo, obj.bar, obj['b-r'], obj['b+r'], obj['b!r']);
+}
+f();

```

## `terser/functions/inner_ref`

- tags: `remove unused`
- size: oxc 123 vs reference 20 (no whitespaces: +103, formatted: +133)

```js
console.log((function(a) {
	return (function() {
		return a + 1;
	})();
})(1), (function(a) {
	return (function(a) {
		return a === undefined;
	})();
})(2));

```

```diff
--- reference
+++ oxc
@@ -1 +1,9 @@
-console.log(2, true);
+console.log((function(a) {
+	return (function() {
+		return a + 1;
+	})();
+})(1), (function(a) {
+	return (function(a) {
+		return a === void 0;
+	})();
+})(2));

```

## `terser/issue_1656/f7`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 124 vs reference 21 (no whitespaces: +103, formatted: +133)

```js
var a = 100, b = 10;
function f22464() {
	var brake146670 = 5;
	while (((b = a) ? !a : ~a ? null : b += a) && --brake146670 > 0) {}
}
f22464();
console.log(a, b);

```

```diff
--- reference
+++ oxc
@@ -1 +1,5 @@
-console.log(100, 100);
+var a = 100, b = 10;
+function f22464() {
+	for (var brake146670 = 5; ((b = a) ? !a : !~a && (b += a)) && --brake146670 > 0;);
+}
+f22464(), console.log(a, b);

```

## `terser/collapse_vars/issue_348`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 0 (no whitespaces: +105, formatted: +136)

```js
console.log((function x(EEE) {
	return (function(tee) {
		if (tee) {
			const EEE = tee;
			if (EEE) return EEE;
		}
	})(EEE);
})('PASS'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+console.log((function(EEE) {
+	return (function(tee) {
+		if (tee) {
+			let EEE = tee;
+			if (EEE) return EEE;
+		}
+	})(EEE);
+})('PASS'));

```

## `terser/evaluate/issue_2968`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 105 vs reference 0 (no whitespaces: +105, formatted: +140)

```js
var c = 'FAIL';
(function() {
	(function(a, b) {
		a <<= 0;
		a && (a[c = 'PASS', 0 >>> (b += 1)] = 0);
	})(42, -42);
})();
console.log(c);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+var c = 'FAIL';
+(function() {
+	(function(a, b) {
+		a <<= 0;
+		a && (a[c = 'PASS', 0 >>> (b += 1)] = 0);
+	})(42, -42);
+})();
+console.log(c);

```

## `terser/evaluate/issue_399`

- size: oxc 363 vs reference 258 (no whitespaces: +105, formatted: +113)

```js
console.log(RegExp('\\\nfo\n[\n]o\\bbb'));
console.log(RegExp('\n'));
console.log(RegExp('\\n'));
console.log(RegExp('\\\n'));
console.log(RegExp('\\\\n'));
console.log(RegExp('\\\\\n'));
console.log(RegExp('\\\\\\n'));
console.log(RegExp('\\\\\\\n'));
console.log(RegExp('\r'));
console.log(RegExp('\u2028'));
console.log(RegExp('\u2029'));
console.log(RegExp('\n\r\u2028\u2029'));

```

```diff
--- reference
+++ oxc
@@ -1,12 +1,12 @@
-console.log(/\nfo\n[\n]o\bbb/);
-console.log(/\n/);
-console.log(/\n/);
-console.log(/\n/);
-console.log(/\\n/);
-console.log(/\\\n/);
-console.log(/\\\n/);
-console.log(/\\\n/);
-console.log(/\r/);
-console.log(/\u2028/);
-console.log(/\u2029/);
-console.log(/\n\r\u2028\u2029/);
+console.log(RegExp('\\\nfo\n[\n]o\\bbb'));
+console.log(RegExp('\n'));
+console.log(RegExp('\\n'));
+console.log(RegExp('\\\n'));
+console.log(RegExp('\\\\n'));
+console.log(RegExp('\\\\\n'));
+console.log(RegExp('\\\\\\n'));
+console.log(RegExp('\\\\\\\n'));
+console.log(RegExp('\r'));
+console.log(RegExp('\u2028'));
+console.log(RegExp('\u2029'));
+console.log(RegExp('\n\r\u2028\u2029'));

```

## `terser/reduce_vars/chained_assignments`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 129 vs reference 24 (no whitespaces: +105, formatted: +153)

```js
function f() {
	var a = [
		94,
		173,
		190,
		239
	];
	var b = 0;
	b |= a[0];
	b <<= 8;
	b |= a[1];
	b <<= 8;
	b |= a[2];
	b <<= 8;
	b |= a[3];
	return b;
}
console.log(f().toString(16));

```

```diff
--- reference
+++ oxc
@@ -1 +1,10 @@
-console.log('5eadbeef');
+function f() {
+	var a = [
+		94,
+		173,
+		190,
+		239
+	], b = 0;
+	return b |= a[0], b <<= 8, b |= a[1], b <<= 8, b |= a[2], b <<= 8, b |= a[3], b;
+}
+console.log(f().toString(16));

```

## `terser/reduce_vars/reduce_class_with_side_effects_in_properties`

- tags: `join vars`, `remove unused`
- size: oxc 105 vs reference 0 (no whitespaces: +105, formatted: +137)

```js
let x = '';
class Y {
	static _ = x += 'PA';
}
class X {
	static _ = x += 'SS';
}
global.something = [new X(), new Y()];
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+let x = '';
+class Y {
+	static _ = x += 'PA';
+}
+class X {
+	static _ = x += 'SS';
+}
+global.something = [new X(), new Y()];
+console.log(x);

```

## `terser/collapse_vars/issue_805`

- tags: `join vars`
- size: oxc 106 vs reference 0 (no whitespaces: +106, formatted: +125)

```js
function f() {
	function Foo() {}
	Foo.prototype = {};
	Foo.prototype.bar = 42;
	return Foo;
}
console.log(new (f())().bar);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+function f() {
+	function Foo() {}
+	Foo.prototype = {};
+	Foo.prototype.bar = 42;
+	return Foo;
+}
+console.log(new (f())().bar);

```

## `terser/inline/issue_308`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `4 iterations`
- size: oxc 269 vs reference 163 (no whitespaces: +106, formatted: +117)

```js
exports.withStyles = withStyles;
function _inherits(superClass) {
	if (typeof superClass !== 'function') {
		throw new TypeError('Super expression must be a function, not ' + typeof superClass);
	}
	Object.create(superClass);
}
function withStyles() {
	var a = EXTERNAL();
	return (function(_a) {
		_inherits(_a);
		function d() {}
	})(a);
}

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,10 @@
-exports.withStyles = function() {
-	var _a = EXTERNAL();
-	if ('function' != typeof _a) throw TypeError('Super expression must be a function, not ' + typeof _a);
-	Object.create(_a);
-};
+exports.withStyles = withStyles;
+function _inherits(superClass) {
+	if (typeof superClass != 'function') throw TypeError('Super expression must be a function, not ' + typeof superClass);
+	Object.create(superClass);
+}
+function withStyles() {
+	return (function(_a) {
+		_inherits(_a);
+	})(EXTERNAL());
+}

```

## `terser/reduce_vars/issue_432_1`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 106 vs reference 0 (no whitespaces: +106, formatted: +121)

```js
const selectServer = () => {
	selectServers();
};
function selectServers() {
	const retrySelection = () => {
		var descriptionChangedHandler = () => {
			selectServers();
		};
	};
	retrySelection();
}
leak(() => Topology);
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+const selectServer = () => {
+	selectServers();
+};
+function selectServers() {}
+leak(() => Topology), console.log('PASS');

```

## `terser/inline/inline_into_scope_conflict`

- tags: `join vars`, `remove unused`
- size: oxc 108 vs reference 0 (no whitespaces: +108, formatted: +147)

```js
var mod = pass;
const c = function c() {
	mod();
};
const b = function b() {
	for (;;) {
		c();
		break;
	}
};
(function() {
	var mod = id(mod);
	b();
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+var mod = pass;
+const c = function() {
+	mod();
+}, b = function() {
+	for (;;) {
+		c();
+		break;
+	}
+};
+(function() {
+	var mod = id(mod);
+	b();
+})();

```

## `terser/loops/issue_2740_1`

- size: oxc 140 vs reference 32 (no whitespaces: +108, formatted: +132)

```js
for (;;) break;
for (a();;) break;
for (; b();) break;
for (c(); d();) break;
for (;; e()) break;
for (f();; g()) break;
for (; h(); i()) break;
for (j(); k(); l()) break;

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,8 @@
-a();
-b();
-c();
-d();
-f();
-h();
-j();
-k();
+for (;;) break;
+for (a();;) break;
+for (; b();) break;
+for (c(); d();) break;
+for (;; e()) break;
+for (f();; g()) break;
+for (; h(); i()) break;
+for (j(); k(); l()) break;

```

## `terser/dead_code/dead_code_constant_boolean_should_warn_more`

- tags: `sequences`
- size: oxc 146 vs reference 37 (no whitespaces: +109, formatted: +141)

```js
while (!(foo && bar || x + '0')) {
	console.log('unreachable');
	var foo;
	function bar() {}
}
for (var x = 10, y; x && (y || x) && !typeof x; ++x) {
	asdf();
	foo();
	var moo;
}
bar();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,10 @@
-var foo, bar;
-var x = 10, y;
-var moo;
+for (; !(foo && bar || x + '0');) {
+	console.log('unreachable');
+	var foo;
+	function bar() {}
+}
+for (var x = 10, y; x && (y || x) && !typeof x; ++x) {
+	asdf(), foo();
+	var moo;
+}
 bar();

```

## `terser/expansions/avoid_spread_getset_object`

- size: oxc 110 vs reference 0 (no whitespaces: +110, formatted: +144)

```js
let x = { ...{ get x() {
	return 1;
} } };
let y = { ...{ set y(_) {
	console.log(_);
} } };
console.log(x.x, y.y, x.x = 2, y.y = 3, x.x, y.y);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+let x = { ...{ get x() {
+	return 1;
+} } };
+let y = { ...{ set y(_) {
+	console.log(_);
+} } };
+console.log(x.x, y.y, x.x = 2, y.y = 3, x.x, y.y);

```

## `terser/harmony/issue_2794_3`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`, `3 iterations`
- size: oxc 150 vs reference 40 (no whitespaces: +110, formatted: +141)

```js
function foo() {
	for (const a of func(value)) {
		console.log(a);
	}
	function func(va) {
		return doSomething(va);
	}
}
function doSomething(x) {
	return [
		x,
		2 * x,
		3 * x
	];
}
const value = 10;
foo();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,15 @@
-for (const o of [
-	10,
-	20,
-	30
-]) console.log(o);
+function foo() {
+	for (let t of func(e)) console.log(t);
+	function func(e) {
+		return doSomething(e);
+	}
+}
+function doSomething(e) {
+	return [
+		e,
+		2 * e,
+		3 * e
+	];
+}
+const e = 10;
+foo();

```

## `terser/try_catch/parent_scope_of_catch_block_is_not_the_try_block`

- size: oxc 111 vs reference 0 (no whitespaces: +111, formatted: +145)

```js
function test(foo, bar) {
	try {
		const bar = {};
		throw 'PASS';
	} catch (error) {
		return bar(error);
	}
}
console.log(test(null, (x) => x));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+function test(foo, bar) {
+	try {
+		let bar = {};
+		throw 'PASS';
+	} catch (error) {
+		return bar(error);
+	}
+}
+console.log(test(null, (x) => x));

```

## `terser/reduce_vars/issue_3110_2`

- tags: `join vars`, `sequences`, `remove unused`, `4 iterations`
- size: oxc 113 vs reference 0 (no whitespaces: +113, formatted: +139)

```js
(function() {
	function foo() {
		return isDev ? 'foo' : 'bar';
	}
	var isDev = true;
	console.log(foo());
	var obj = { foo };
	console.log(obj.foo());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+(function() {
+	function foo() {
+		return isDev ? 'foo' : 'bar';
+	}
+	var isDev = !0;
+	console.log(foo()), console.log({ foo }.foo());
+})();

```

## `terser/reduce_vars/issue_3110_shorthand_2`

- tags: `join vars`, `sequences`, `remove unused`, `4 iterations`
- size: oxc 113 vs reference 0 (no whitespaces: +113, formatted: +139)

```js
(function() {
	function foo() {
		return isDev ? 'foo' : 'bar';
	}
	var isDev = true;
	console.log(foo());
	var obj = { foo };
	console.log(obj.foo());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+(function() {
+	function foo() {
+		return isDev ? 'foo' : 'bar';
+	}
+	var isDev = !0;
+	console.log(foo()), console.log({ foo }.foo());
+})();

```

## `terser/expansions/object_spread`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 115 vs reference 0 (no whitespaces: +115, formatted: +130)

```js
let obj = { ...{} };
console.log(Object.keys(obj));
let objWithKeys = {
	a: 1,
	...{ b: 2 }
};
console.log(Object.keys(objWithKeys).join(','));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+let obj = {};
+console.log(Object.keys(obj));
+let objWithKeys = {
+	a: 1,
+	b: 2
+};
+console.log(Object.keys(objWithKeys).join(','));

```

## `terser/collapse_vars/collapse_vars_unary_2`

- tags: `join vars`
- size: oxc 116 vs reference 0 (no whitespaces: +116, formatted: +151)

```js
global.leak = (n) => console.log(n);
global.num = 4;
let counter = -1;
for (const i in [
	0,
	1,
	2,
	3,
	4,
	5
]) {
	counter++, i == num && leak(counter);
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,11 @@
+global.leak = (n) => console.log(n);
+global.num = 4;
+let counter = -1;
+for (let i in [
+	0,
+	1,
+	2,
+	3,
+	4,
+	5
+]) counter++, i == num && leak(counter);

```

## `terser/keep_names/keep_fnames_and_avoid_collisions`

- tags: `mangle`, `keep function names`, `keep class names`
- size: oxc 116 vs reference 0 (no whitespaces: +116, formatted: +142)

```js
global.t = 'ttttttttttttttttttttt';
(function testBug() {
	var param1 = 'PASS';
	return () => {
		console.log(param1);
		var t = function() {};
		return t;
	};
})()();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+global.t = 'ttttttttttttttttttttt';
+(function() {
+	var e = 'PASS';
+	return () => {
+		console.log('PASS');
+		return function() {};
+	};
+})()();

```

## `terser/collapse_vars/collapse_vars_issue_721`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 450 vs reference 333 (no whitespaces: +117, formatted: +152)

```js
define([
	'require',
	'exports',
	'handlebars'
], function(require, exports, hb) {
	var win = window;
	var _hb = win.Handlebars = hb;
	return _hb;
});
def(function(hb) {
	var win = window;
	var prop = 'Handlebars';
	var _hb = win[prop] = hb;
	return _hb;
});
def(function(hb) {
	var prop = 'Handlebars';
	var win = window;
	var _hb = win[prop] = hb;
	return _hb;
});
def(function(hb) {
	var prop = 'Handlebars';
	var win = g();
	var _hb = win[prop] = hb;
	return _hb;
});
def(function(hb) {
	var prop = g1();
	var win = g2();
	var _hb = win[prop] = hb;
	return _hb;
});
def(function(hb) {
	var win = g2();
	var prop = g1();
	var _hb = win[prop] = hb;
	return _hb;
});

```

```diff
--- reference
+++ oxc
@@ -3,16 +3,21 @@
 	'exports',
 	'handlebars'
 ], function(require, exports, hb) {
-	return window.Handlebars = hb;
+	var win = window;
+	return win.Handlebars = hb;
 }), def(function(hb) {
-	return window.Handlebars = hb;
+	var win = window, prop = 'Handlebars';
+	return win[prop] = hb;
 }), def(function(hb) {
-	return window.Handlebars = hb;
+	var prop = 'Handlebars', win = window;
+	return win[prop] = hb;
 }), def(function(hb) {
-	return g().Handlebars = hb;
+	var prop = 'Handlebars', win = g();
+	return win[prop] = hb;
 }), def(function(hb) {
-	var prop = g1();
-	return g2()[prop] = hb;
+	var prop = g1(), win = g2();
+	return win[prop] = hb;
 }), def(function(hb) {
-	return g2()[g1()] = hb;
+	var win = g2(), prop = g1();
+	return win[prop] = hb;
 });

```

## `terser/inline/dont_inline_funcs_into_default_param`

- tags: `remove unused`
- size: oxc 118 vs reference 0 (no whitespaces: +118, formatted: +139)

```js
'use strict';
const getData = (val) => ({ val });
const print = function(data = getData(id('PASS'))) {
	console.log(data.val);
};
print();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,6 @@
+'use strict';
+const getData = (val) => ({ val });
+const print = function(data = getData(id('PASS'))) {
+	console.log(data.val);
+};
+print();

```

## `terser/functions/issue_t131a`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 182 vs reference 61 (no whitespaces: +121, formatted: +162)

```js
(function() {
	function thing() {
		return { a: 1 };
	}
	function one() {
		return thing();
	}
	function two() {
		var x = thing();
		x.a = 2;
		x.b = 3;
		return x;
	}
	console.log(JSON.stringify(one()), JSON.stringify(two()));
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,15 @@
-console.log(JSON.stringify({ a: 1 }), JSON.stringify({
-	a: 2,
-	b: 3
-}));
+(function() {
+	function thing() {
+		return { a: 1 };
+	}
+	function one() {
+		return thing();
+	}
+	function two() {
+		var x = thing();
+		x.a = 2;
+		x.b = 3;
+		return x;
+	}
+	console.log(JSON.stringify(one()), JSON.stringify(two()));
+})();

```

## `terser/functions/issue_t131b`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 182 vs reference 61 (no whitespaces: +121, formatted: +158)

```js
(function() {
	function thing() {
		return { a: 1 };
	}
	function one() {
		return thing();
	}
	function two() {
		var x = thing();
		x.a = 2;
		x.b = 3;
		return x;
	}
	console.log(JSON.stringify(one()), JSON.stringify(two()));
})();

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,13 @@
-console.log(JSON.stringify({ a: 1 }), JSON.stringify({
-	a: 2,
-	b: 3
-}));
+(function() {
+	function thing() {
+		return { a: 1 };
+	}
+	function one() {
+		return thing();
+	}
+	function two() {
+		var x = thing();
+		return x.a = 2, x.b = 3, x;
+	}
+	console.log(JSON.stringify(one()), JSON.stringify(two()));
+})();

```

## `terser/reduce_vars/issue_3110_1`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 121 vs reference 0 (no whitespaces: +121, formatted: +150)

```js
(function() {
	function foo() {
		return isDev ? 'foo' : 'bar';
	}
	var isDev = true;
	var obj = { foo };
	console.log(foo());
	console.log(obj.foo());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+(function() {
+	function foo() {
+		return isDev ? 'foo' : 'bar';
+	}
+	var isDev = !0, obj = { foo };
+	console.log(foo()), console.log(obj.foo());
+})();

```

## `terser/reduce_vars/issue_3110_shorthand_1`

- tags: `join vars`, `sequences`, `remove unused`, `3 iterations`
- size: oxc 121 vs reference 0 (no whitespaces: +121, formatted: +150)

```js
(function() {
	function foo() {
		return isDev ? 'foo' : 'bar';
	}
	var isDev = true;
	var obj = { foo };
	console.log(foo());
	console.log(obj.foo());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+(function() {
+	function foo() {
+		return isDev ? 'foo' : 'bar';
+	}
+	var isDev = !0, obj = { foo };
+	console.log(foo()), console.log(obj.foo());
+})();

```

## `terser/reduce_vars/reduce_class_with_side_effects_in_extends`

- tags: `join vars`, `remove unused`
- size: oxc 121 vs reference 0 (no whitespaces: +121, formatted: +143)

```js
let x = '';
class Y extends (x += 'PA', Array) {}
class X extends (x += 'SS', Array) {}
global.something = [new X(), new Y()];
console.log(x);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,5 @@
+let x = '';
+class Y extends (x += 'PA', Array) {}
+class X extends (x += 'SS', Array) {}
+global.something = [new X(), new Y()];
+console.log(x);

```

## `terser/arrays/constant_join_3`

- size: oxc 362 vs reference 238 (no whitespaces: +124, formatted: +147)

```js
var a = [null].join();
var b = [,].join();
var c = [
	,
	1,
	,
	3
].join();
var d = [foo].join();
var e = [
	foo,
	null,
	undefined,
	bar
].join('-');
var f = [foo, bar].join('');
var g = [
	null,
	'foo',
	null,
	bar + 'baz'
].join('');
var h = [
	null,
	'foo',
	null,
	bar + 'baz'
].join('-');
var i = [
	'foo' + bar,
	null,
	baz + 'moo'
].join('');
var j = [foo + 'bar', baz].join('');
var k = [foo, 'bar' + baz].join('');
var l = [foo, bar + 'baz'].join('');

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,36 @@
-var a = '';
-var b = '';
-var c = ',1,,3';
-var d = '' + foo;
+var a = [null].join();
+var b = [,].join();
+var c = [
+	,
+	1,
+	,
+	3
+].join();
+var d = [foo].join();
 var e = [
 	foo,
-	'-',
+	null,
+	void 0,
 	bar
 ].join('-');
-var f = '' + foo + bar;
-var g = 'foo' + bar + 'baz';
-var h = ['-foo-', bar + 'baz'].join('-');
-var i = 'foo' + bar + baz + 'moo';
-var j = foo + 'bar' + baz;
-var k = foo + 'bar' + baz;
-var l = foo + (bar + 'baz');
+var f = [foo, bar].join('');
+var g = [
+	null,
+	'foo',
+	null,
+	bar + 'baz'
+].join('');
+var h = [
+	null,
+	'foo',
+	null,
+	bar + 'baz'
+].join('-');
+var i = [
+	'foo' + bar,
+	null,
+	baz + 'moo'
+].join('');
+var j = [foo + 'bar', baz].join('');
+var k = [foo, 'bar' + baz].join('');
+var l = [foo, bar + 'baz'].join('');

```

## `terser/inline/dont_inline_funcs_into_default_param_2`

- size: oxc 124 vs reference 0 (no whitespaces: +124, formatted: +155)

```js
'use strict';
const foo = () => 42;
const getData = (val) => ({ val });
const print = (data = getData(foo())) => {
	data.val === 42 && pass();
};
print();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+'use strict';
+const foo = () => 42;
+const getData = (val) => ({ val });
+const print = (data = getData(foo())) => {
+	data.val === 42 && pass();
+};
+print();

```

## `terser/reduce_vars/issue_369`

- tags: `join vars`
- size: oxc 130 vs reference 0 (no whitespaces: +130, formatted: +148)

```js
var printTest = (function(ret) {
	function ret() {
		console.log('Value after override');
	}
	return ret;
})('Value before override');
printTest();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+var printTest = (function(ret) {
+	function ret() {
+		console.log('Value after override');
+	}
+	return ret;
+})('Value before override');
+printTest();

```

## `terser/typeof/typeof_defun_1`

- tags: `join vars`, `remove unused`, `2 iterations`
- size: oxc 185 vs reference 55 (no whitespaces: +130, formatted: +162)

```js
function f() {
	console.log('YES');
}
function g() {
	h = 42;
	console.log('NOPE');
}
function h() {
	console.log('YUP');
}
g = 42;
'function' == typeof f && f();
'function' == typeof g && g();
'function' == typeof h && h();

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,14 @@
+function f() {
+	console.log('YES');
+}
+function g() {
+	h = 42;
+	console.log('NOPE');
+}
 function h() {
 	console.log('YUP');
 }
-console.log('YES');
-h();
+g = 42;
+typeof f == 'function' && f();
+typeof g == 'function' && g();
+typeof h == 'function' && h();

```

## `terser/functions/avoid_generating_duplicate_functions_compared_together_4`

- tags: `join vars`, `remove unused`
- size: oxc 131 vs reference 0 (no whitespaces: +131, formatted: +161)

```js
const x = () => null;
const y = () => x;
const fns = [y(), y()];
console.log(fns[0] === fns[1]);
const fns_obj = {
	a: y(),
	b: y()
};
console.log(fns_obj.a === fns_obj.b);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+const x = () => null, y = () => x, fns = [y(), y()];
+console.log(fns[0] === fns[1]);
+const fns_obj = {
+	a: y(),
+	b: y()
+};
+console.log(fns_obj.a === fns_obj.b);

```

## `terser/functions/issue_2531_3`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 164 vs reference 33 (no whitespaces: +131, formatted: +167)

```js
function outer() {
	function inner(value) {
		function closure() {
			return value;
		}
		return function() {
			return closure();
		};
	}
	return inner('Hello');
}
console.log('Greeting:', outer()());

```

```diff
--- reference
+++ oxc
@@ -1 +1,12 @@
-console.log('Greeting:', 'Hello');
+function outer() {
+	function inner(value) {
+		function closure() {
+			return value;
+		}
+		return function() {
+			return closure();
+		};
+	}
+	return inner('Hello');
+}
+console.log('Greeting:', outer()());

```

## `terser/drop_unused/issue_2105_1`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 192 vs reference 60 (no whitespaces: +132, formatted: +191)

```js
!(function(factory) {
	factory();
})(function() {
	return (function(fn) {
		fn()().prop();
	})(function() {
		function bar() {
			var quux = function() {
				console.log('PASS');
			}, foo = function() {
				console.log;
				quux();
			};
			return { prop: foo };
		}
		return bar;
	});
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,17 @@
-({ prop: function() {
-	console.log;
-	console.log('PASS');
-} }).prop();
+(function(factory) {
+	factory();
+})(function() {
+	return (function(fn) {
+		fn()().prop();
+	})(function() {
+		function bar() {
+			var quux = function() {
+				console.log('PASS');
+			};
+			return { prop: function() {
+				quux();
+			} };
+		}
+		return bar;
+	});
+});

```

## `terser/reduce_vars/reduce_funcs_in_array_1`

- tags: `join vars`, `remove unused`
- size: oxc 132 vs reference 0 (no whitespaces: +132, formatted: +166)

```js
(function() {
	function Foo() {
		return 123;
	}
	function bar() {
		return [Foo].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], a[0][0]());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+(function() {
+	function Foo() {
+		return 123;
+	}
+	function bar() {
+		return [Foo, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], a[0][0]());
+})();

```

## `terser/evaluate/unsafe_float_key_complex`

- size: oxc 209 vs reference 76 (no whitespaces: +133, formatted: +205)

```js
console.log({
	2.72: { 3.14: 1 },
	3.14: 1
} + 1, {
	2.72: { 3.14: 1 },
	3.14: 1
}[2.72] + 1, {
	2.72: { 3.14: 1 },
	3.14: 1
}['2.72'] + 1, {
	2.72: { 3.14: 1 },
	3.14: 1
}[3.14] + 1, {
	2.72: { 3.14: 1 },
	3.14: 1
}[2.72][3.14] + 1, {
	2.72: { 3.14: 1 },
	3.14: 1
}[2.72]['3.14'] + 1);

```

```diff
--- reference
+++ oxc
@@ -1 +1,19 @@
-console.log('[object Object]1', '[object Object]1', '[object Object]1', 2, 2, 2);
+console.log({
+	2.72: { 3.14: 1 },
+	3.14: 1
+} + 1, {
+	2.72: { 3.14: 1 },
+	3.14: 1
+}[2.72] + 1, {
+	2.72: { 3.14: 1 },
+	3.14: 1
+}['2.72'] + 1, {
+	2.72: { 3.14: 1 },
+	3.14: 1
+}[3.14] + 1, {
+	2.72: { 3.14: 1 },
+	3.14: 1
+}[2.72][3.14] + 1, {
+	2.72: { 3.14: 1 },
+	3.14: 1
+}[2.72]['3.14'] + 1);

```

## `terser/issue_1261/pure_function_calls`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 238 vs reference 103 (no whitespaces: +135, formatted: +163)

```js
(function() {
	console.log('iife0');
})();
var iife1 = (function() {
	console.log('iife1');
	function iife1() {}
	return iife1;
})();
(function() {
	var iife2 = (function() {
		console.log('iife2');
		function iife2() {}
		return iife2;
	})();
})();
bar(), baz(), quux();
a.b(), c.d.e(), f.g();

```

```diff
--- reference
+++ oxc
@@ -1,7 +1,15 @@
+(function() {
+	console.log('iife0');
+})();
 var iife1 = (function() {
 	console.log('iife1');
 	function iife1() {}
 	return iife1;
 })();
-baz(), quux();
-a.b(), f.g();
+(function() {
+	(function() {
+		console.log('iife2');
+		function iife2() {}
+		return iife2;
+	})();
+})(), bar(), baz(), quux(), a.b(), c.d.e(), f.g();

```

## `terser/reduce_vars/reduce_funcs_in_array_2`

- tags: `join vars`, `remove unused`
- size: oxc 140 vs reference 0 (no whitespaces: +140, formatted: +176)

```js
(function() {
	function Foo() {
		return 123;
	}
	function bar(val) {
		return [val || Foo].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], a[0][0]());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+(function() {
+	function Foo() {
+		return 123;
+	}
+	function bar(val) {
+		return [val || Foo, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], a[0][0]());
+})();

```

## `terser/reduce_vars/reduce_funcs_in_object_literal_2`

- tags: `join vars`, `remove unused`
- size: oxc 140 vs reference 0 (no whitespaces: +140, formatted: +176)

```js
(function() {
	function Foo() {
		return 123;
	}
	function bar(val) {
		return [val || Foo].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], a[0][0]());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+(function() {
+	function Foo() {
+		return 123;
+	}
+	function bar(val) {
+		return [val || Foo, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], a[0][0]());
+})();

```

## `terser/arrow/issue_2105_1`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 192 vs reference 51 (no whitespaces: +141, formatted: +201)

```js
!(function(factory) {
	factory();
})(function() {
	return (function(fn) {
		fn()().prop();
	})(function() {
		function bar() {
			var quux = function() {
				console.log('PASS');
			}, foo = function() {
				console.log;
				quux();
			};
			return { prop: foo };
		}
		return bar;
	});
});

```

```diff
--- reference
+++ oxc
@@ -1,4 +1,17 @@
-({ prop() {
-	console.log;
-	console.log('PASS');
-} }).prop();
+(function(factory) {
+	factory();
+})(function() {
+	return (function(fn) {
+		fn()().prop();
+	})(function() {
+		function bar() {
+			var quux = function() {
+				console.log('PASS');
+			};
+			return { prop: function() {
+				quux();
+			} };
+		}
+		return bar;
+	});
+});

```

## `terser/functions/issue_2663_3`

- tags: `join vars`, `remove unused`
- size: oxc 591 vs reference 447 (no whitespaces: +144, formatted: +184)

```js
(function() {
	var outputs = [
		{
			type: 0,
			target: null,
			eventName: 'ngSubmit',
			propName: null
		},
		{
			type: 0,
			target: null,
			eventName: 'submit',
			propName: null
		},
		{
			type: 0,
			target: null,
			eventName: 'reset',
			propName: null
		}
	];
	function listenToElementOutputs(outputs) {
		var handlers = [];
		for (var i = 0; i < outputs.length; i++) {
			var output = outputs[i];
			var handleEventClosure = renderEventHandlerClosure(output.eventName);
			handlers.push(handleEventClosure);
		}
		var target, name;
		return handlers;
	}
	function renderEventHandlerClosure(eventName) {
		return function() {
			return console.log(eventName);
		};
	}
	listenToElementOutputs(outputs).forEach(function(handler) {
		return handler();
	});
})();

```

```diff
--- reference
+++ oxc
@@ -1,33 +1,38 @@
-(function(outputs) {
-	var handlers = [];
-	for (var i = 0; i < outputs.length; i++) {
-		var handleEventClosure = function(eventName) {
-			return function() {
-				return console.log(eventName);
-			};
-		}(outputs[i].eventName);
-		handlers.push(handleEventClosure);
+(function() {
+	var outputs = [
+		{
+			type: 0,
+			target: null,
+			eventName: 'ngSubmit',
+			propName: null
+		},
+		{
+			type: 0,
+			target: null,
+			eventName: 'submit',
+			propName: null
+		},
+		{
+			type: 0,
+			target: null,
+			eventName: 'reset',
+			propName: null
+		}
+	];
+	function listenToElementOutputs(outputs) {
+		var handlers = [];
+		for (var i = 0; i < outputs.length; i++) {
+			var output = outputs[i], handleEventClosure = renderEventHandlerClosure(output.eventName);
+			handlers.push(handleEventClosure);
+		}
+		return handlers;
 	}
-	return handlers;
-})([
-	{
-		type: 0,
-		target: null,
-		eventName: 'ngSubmit',
-		propName: null
-	},
-	{
-		type: 0,
-		target: null,
-		eventName: 'submit',
-		propName: null
-	},
-	{
-		type: 0,
-		target: null,
-		eventName: 'reset',
-		propName: null
+	function renderEventHandlerClosure(eventName) {
+		return function() {
+			return console.log(eventName);
+		};
 	}
-]).forEach(function(handler) {
-	return handler();
-});
+	listenToElementOutputs(outputs).forEach(function(handler) {
+		return handler();
+	});
+})();

```

## `terser/reduce_vars/reduce_funcs_in_object_literal_1`

- tags: `join vars`, `remove unused`
- size: oxc 144 vs reference 0 (no whitespaces: +144, formatted: +181)

```js
(function() {
	function Foo() {
		return 123;
	}
	function bar() {
		return [{ prop: Foo }.prop].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], a[0][0]());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+(function() {
+	function Foo() {
+		return 123;
+	}
+	function bar() {
+		return [{ prop: Foo }.prop, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], a[0][0]());
+})();

```

## `terser/reduce_vars/reduce_funcs_in_shorthand_object_literal_1`

- tags: `join vars`, `remove unused`
- size: oxc 144 vs reference 0 (no whitespaces: +144, formatted: +181)

```js
(function() {
	function Foo() {
		return 123;
	}
	function bar() {
		var prop = Foo;
		return [{ prop }.prop].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], a[0][0]());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+(function() {
+	function Foo() {
+		return 123;
+	}
+	function bar() {
+		return [{ prop: Foo }.prop, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], a[0][0]());
+})();

```

## `terser/reduce_vars/single_use_class_referenced_in_array`

- tags: `join vars`, `remove unused`
- size: oxc 154 vs reference 0 (no whitespaces: +154, formatted: +198)

```js
(function() {
	class Foo {
		data() {
			return 123;
		}
	}
	function bar(val) {
		return [val || Foo].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], new a[0][0]().data());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+(function() {
+	class Foo {
+		data() {
+			return 123;
+		}
+	}
+	function bar(val) {
+		return [val || Foo, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], new a[0][0]().data());
+})();

```

## `terser/issue_t292/no_flatten_with_arg_colliding_with_arg_value_inner_scope`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 224 vs reference 69 (no whitespaces: +155, formatted: +181)

```js
var g = ['a'];
function problem(arg) {
	return g.indexOf(arg);
}
function unused(arg) {
	return problem(arg);
}
function a(arg) {
	return problem(arg);
}
function b(problem) {
	return g[problem];
}
function c(arg) {
	return b(a(arg));
}
console.log(c('a'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,17 @@
-var problem, g = ['a'];
-console.log((problem = g.indexOf('a'), g[problem]));
+var g = ['a'];
+function problem(arg) {
+	return g.indexOf(arg);
+}
+function unused(arg) {
+	return problem(arg);
+}
+function a(arg) {
+	return problem(arg);
+}
+function b(problem) {
+	return g[problem];
+}
+function c(arg) {
+	return b(a(arg));
+}
+console.log(c('a'));

```

## `terser/reduce_vars/issue_741_2`

- size: oxc 156 vs reference 0 (no whitespaces: +156, formatted: +184)

```js
var a = console.log;
var might_change = 0;
global.problem = () => {
	var c = might_change;
	a(c);
};
global.increment = () => {
	might_change++;
};
increment();
problem();
increment();
problem();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+var a = console.log;
+var might_change = 0;
+global.problem = () => {
+	a(might_change);
+};
+global.increment = () => {
+	might_change++;
+};
+increment();
+problem();
+increment();
+problem();

```

## `terser/pure_funcs/issue_3065_2`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`, `pure functions`
- size: oxc 161 vs reference 0 (no whitespaces: +161, formatted: +200)

```js
function modifyWrapper(a, f, wrapper) {
	wrapper.a = a;
	wrapper.f = f;
	return wrapper;
}
function pureFunc(fun) {
	return modifyWrapper(1, fun, function(a) {
		return fun(a);
	});
}
var unused = pureFunc(function(x) {
	return x;
});

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+function modifyWrapper(e, t, n) {
+	n.a = e;
+	n.f = t;
+	return n;
+}
+function pureFunc(e) {
+	return modifyWrapper(1, e, function(t) {
+		return e(t);
+	});
+}
+var e = pureFunc(function(e) {
+	return e;
+});

```

## `terser/issue_417/test_unexpected_crash`

- size: oxc 163 vs reference 0 (no whitespaces: +163, formatted: +195)

```js
function x() {
	var getsInlined = function() {
		var leakedVariable1 = 3;
		var leakedVariable2 = 1 + 2 * leakedVariable1;
		console.log(leakedVariable1);
		console.log(leakedVariable2);
	};
	var getsDropped = getsInlined();
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+function x() {
+	var getsDropped = function() {
+		var leakedVariable1 = 3;
+		var leakedVariable2 = 1 + 2 * leakedVariable1;
+		console.log(leakedVariable1);
+		console.log(leakedVariable2);
+	}();
+}

```

## `terser/switch/issue_445`

- size: oxc 163 vs reference 0 (no whitespaces: +163, formatted: +208)

```js
const leak = () => {};
function scan() {
	let len = leak();
	let ch = 0;
	switch (ch = 123) {
		case 'never-reached':
			const ch = leak();
			leak(ch);
	}
	return len === 123 ? 'FAIL' : 'PASS';
}
console.log(scan());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,11 @@
+const leak = () => {};
+function scan() {
+	let len = leak();
+	let ch = 0;
+	if ((ch = 123) === 'never-reached') {
+		let ch = leak();
+		leak(ch);
+	}
+	return len === 123 ? 'FAIL' : 'PASS';
+}
+console.log(scan());

```

## `terser/issue_417/test_unexpected_crash_2`

- size: oxc 164 vs reference 0 (no whitespaces: +164, formatted: +194)

```js
function x() {
	var getsInlined = function() {
		var leakedVariable1 = 3;
		var leakedVariable2 = 1 + leakedVariable1[0];
		console.log(leakedVariable1);
		console.log(leakedVariable2);
	};
	var getsDropped = getsInlined();
}

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+function x() {
+	var getsDropped = function() {
+		var leakedVariable1 = 3;
+		var leakedVariable2 = 1 + leakedVariable1[0];
+		console.log(leakedVariable1);
+		console.log(leakedVariable2);
+	}();
+}

```

## `terser/reduce_vars/single_use_class_referenced_in_object_literal`

- tags: `join vars`, `remove unused`
- size: oxc 166 vs reference 0 (no whitespaces: +166, formatted: +213)

```js
(function() {
	class Foo {
		data() {
			return 123;
		}
	}
	function bar(val) {
		return [{ prop: val || Foo }.prop].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], new a[0][0]().data());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+(function() {
+	class Foo {
+		data() {
+			return 123;
+		}
+	}
+	function bar(val) {
+		return [{ prop: val || Foo }.prop, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], new a[0][0]().data());
+})();

```

## `terser/reduce_vars/single_use_class_referenced_in_shorthand_object_literal`

- tags: `join vars`, `remove unused`
- size: oxc 166 vs reference 0 (no whitespaces: +166, formatted: +213)

```js
(function() {
	class Foo {
		data() {
			return 123;
		}
	}
	function bar(val) {
		var prop = val || Foo;
		return [{ prop }.prop].concat([2]);
	}
	var a = [bar(), bar()];
	console.log(a[0][0] === a[1][0], new a[0][0]().data());
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+(function() {
+	class Foo {
+		data() {
+			return 123;
+		}
+	}
+	function bar(val) {
+		return [{ prop: val || Foo }.prop, 2];
+	}
+	var a = [bar(), bar()];
+	console.log(a[0][0] === a[1][0], new a[0][0]().data());
+})();

```

## `terser/reduce_vars/inverted_var`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 265 vs reference 97 (no whitespaces: +168, formatted: +218)

```js
console.log((function() {
	var a = 1;
	return a;
})(), (function() {
	var b;
	b = 2;
	return b;
})(), (function() {
	c = 3;
	return c;
	var c;
})(), (function(c) {
	c = 4;
	return c;
})(), (function(c) {
	c = 5;
	return c;
	var c;
})(), (function c() {
	c = 6;
	return c;
})(), (function c() {
	c = 7;
	return c;
	var c;
})(), (function() {
	c = 8;
	return c;
	var c = 'foo';
})());

```

```diff
--- reference
+++ oxc
@@ -1,8 +1,27 @@
-console.log(1, 2, 3, 4, 5, (function c() {
+console.log((function() {
+	return 1;
+})(), (function() {
+	return 2;
+})(), (function() {
+	c = 3;
+	return c;
+	var c;
+})(), (function(c) {
+	c = 4;
+	return c;
+})(), (function(c) {
+	c = 5;
+	return c;
+	var c;
+})(), (function c() {
 	c = 6;
 	return c;
-})(), 7, (function() {
+})(), (function() {
+	c = 7;
+	return c;
+	var c;
+})(), (function() {
 	c = 8;
 	return c;
-	var c = 'foo';
+	var c;
 })());

```

## `terser/comments/comment_moved_between_return_and_value`

- size: oxc 169 vs reference 0 (no whitespaces: +169, formatted: +188)

```js
console.log((function(same_name) {
	/* @license Foo bar */
	function licensed(same_name) {
		return same_name.toUpperCase();
	}
	console.log('PASS');
	return licensed('PA') + 'SS';
})());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+console.log((function(same_name) {
+	/* @license Foo bar */
+	function licensed(same_name) {
+		return same_name.toUpperCase();
+	}
+	console.log('PASS');
+	return licensed('PA') + 'SS';
+})());

```

## `terser/functions/iifes_returning_constants_keep_fargs_false`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 282 vs reference 112 (no whitespaces: +170, formatted: +221)

```js
(function() {
	return -1.23;
})();
console.log((function foo() {
	return 'okay';
})());
console.log((function foo(x, y, z) {
	return 123;
})());
console.log((function(x, y, z) {
	return z;
})());
console.log((function(x, y, z) {
	if (x) return y;
	return z;
})(1, 2, 3));
console.log((function(x, y) {
	return x * y;
})(2, 3));
console.log((function(x, y) {
	return x * y;
})(2, 3, a(), b()));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,13 @@
-console.log('okay');
-console.log(123);
-console.log(void 0);
-console.log(2);
-console.log(6);
-console.log((a(), b(), 6));
+console.log((function() {
+	return 'okay';
+})()), console.log((function(x, y, z) {
+	return 123;
+})()), console.log((function(x, y, z) {
+	return z;
+})()), console.log((function(x, y, z) {
+	return x ? y : z;
+})(1, 2, 3)), console.log((function(x, y) {
+	return x * y;
+})(2, 3)), console.log((function(x, y) {
+	return x * y;
+})(2, 3, a(), b()));

```

## `terser/functions/iifes_returning_constants_keep_fargs_true`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 282 vs reference 112 (no whitespaces: +170, formatted: +221)

```js
(function() {
	return -1.23;
})();
console.log((function foo() {
	return 'okay';
})());
console.log((function foo(x, y, z) {
	return 123;
})());
console.log((function(x, y, z) {
	return z;
})());
console.log((function(x, y, z) {
	if (x) return y;
	return z;
})(1, 2, 3));
console.log((function(x, y) {
	return x * y;
})(2, 3));
console.log((function(x, y) {
	return x * y;
})(2, 3, a(), b()));

```

```diff
--- reference
+++ oxc
@@ -1,6 +1,13 @@
-console.log('okay');
-console.log(123);
-console.log(void 0);
-console.log(2);
-console.log(6);
-console.log((a(), b(), 6));
+console.log((function() {
+	return 'okay';
+})()), console.log((function(x, y, z) {
+	return 123;
+})()), console.log((function(x, y, z) {
+	return z;
+})()), console.log((function(x, y, z) {
+	return x ? y : z;
+})(1, 2, 3)), console.log((function(x, y) {
+	return x * y;
+})(2, 3)), console.log((function(x, y) {
+	return x * y;
+})(2, 3, a(), b()));

```

## `terser/drop_unused/issue_2105_2`

- tags: `join vars`, `remove unused`, `3 iterations`
- size: oxc 192 vs reference 20 (no whitespaces: +172, formatted: +241)

```js
!(function(factory) {
	factory();
})(function() {
	return (function(fn) {
		fn()().prop();
	})(function() {
		function bar() {
			var quux = function() {
				console.log('PASS');
			}, foo = function() {
				console.log;
				quux();
			};
			return { prop: foo };
		}
		return bar;
	});
});

```

```diff
--- reference
+++ oxc
@@ -1 +1,17 @@
-console.log('PASS');
+(function(factory) {
+	factory();
+})(function() {
+	return (function(fn) {
+		fn()().prop();
+	})(function() {
+		function bar() {
+			var quux = function() {
+				console.log('PASS');
+			};
+			return { prop: function() {
+				quux();
+			} };
+		}
+		return bar;
+	});
+});

```

## `terser/pure_funcs/issue_3065_2b`

- tags: `mangle`, `mangle top level`, `keep function names`, `keep class names`, `join vars`, `remove unused`, `pure functions`
- size: oxc 212 vs reference 39 (no whitespaces: +173, formatted: +212)

```js
function modifyWrapper(a, f, wrapper) {
	wrapper.a = a;
	wrapper.f = f;
	return wrapper;
}
function pureFunc(fun) {
	return modifyWrapper(1, fun, function(a) {
		return fun(a);
	});
}
var unused = pureFunc(function(x) {
	return x;
});
function print(message) {
	console.log(message);
}
print(2);
print(3);

```

```diff
--- reference
+++ oxc
@@ -1,5 +1,18 @@
-function o(o) {
-	console.log(o);
+function modifyWrapper(e, t, n) {
+	n.a = e;
+	n.f = t;
+	return n;
 }
-o(2);
-o(3);
+function pureFunc(e) {
+	return modifyWrapper(1, e, function(t) {
+		return e(t);
+	});
+}
+var e = pureFunc(function(e) {
+	return e;
+});
+function print(e) {
+	console.log(e);
+}
+print(2);
+print(3);

```

## `terser/drop_unused/issue_805_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 174 vs reference 0 (no whitespaces: +174, formatted: +202)

```js
(function(a) {
	function unused() {}
	unused.prototype[a()] = 42;
	(unused.prototype.bar = function() {
		console.log('bar');
	})();
	return unused;
})(function() {
	console.log('foo');
	return 'foo';
});

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+(function(a) {
+	function unused() {}
+	return unused.prototype[a()] = 42, (unused.prototype.bar = function() {
+		console.log('bar');
+	})(), unused;
+})(function() {
+	return console.log('foo'), 'foo';
+});

```

## `terser/reduce_vars/issue_432_2`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 176 vs reference 0 (no whitespaces: +176, formatted: +214)

```js
const selectServer = () => {
	selectServers();
};
function selectServers() {
	function retrySelection() {
		var descriptionChangedHandler = () => {
			selectServers();
		};
		leak(descriptionChangedHandler);
	}
	retrySelection();
}
leak(() => Topology);
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+const selectServer = () => {
+	selectServers();
+};
+function selectServers() {
+	function retrySelection() {
+		leak(() => {
+			selectServers();
+		});
+	}
+	retrySelection();
+}
+leak(() => Topology), console.log('PASS');

```

## `terser/issue_t292/no_flatten_with_var_colliding_with_arg_value_inner_scope`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 261 vs reference 84 (no whitespaces: +177, formatted: +208)

```js
var g = ['a'];
function problem(arg) {
	return g.indexOf(arg);
}
function unused(arg) {
	return problem(arg);
}
function a(arg) {
	return problem(arg);
}
function b(test) {
	var problem = test * 2;
	console.log(problem);
	return g[problem];
}
function c(arg) {
	return b(a(arg));
}
console.log(c('a'));

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,18 @@
-var problem, g = ['a'];
-console.log((console.log(problem = 2 * g.indexOf('a')), g[problem]));
+var g = ['a'];
+function problem(arg) {
+	return g.indexOf(arg);
+}
+function unused(arg) {
+	return problem(arg);
+}
+function a(arg) {
+	return problem(arg);
+}
+function b(test) {
+	var problem = test * 2;
+	return console.log(problem), g[problem];
+}
+function c(arg) {
+	return b(a(arg));
+}
+console.log(c('a'));

```

## `terser/drop_unused/issue_805_1`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 179 vs reference 0 (no whitespaces: +179, formatted: +209)

```js
(function(a) {
	var unused = function() {};
	unused.prototype[a()] = 42;
	(unused.prototype.bar = function() {
		console.log('bar');
	})();
	return unused;
})(function() {
	console.log('foo');
	return 'foo';
});

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,8 @@
+(function(a) {
+	var unused = function() {};
+	return unused.prototype[a()] = 42, (unused.prototype.bar = function() {
+		console.log('bar');
+	})(), unused;
+})(function() {
+	return console.log('foo'), 'foo';
+});

```

## `terser/inline/inline_into_scope_conflict_enclosed`

- tags: `join vars`, `remove unused`
- size: oxc 181 vs reference 0 (no whitespaces: +181, formatted: +205)

```js
global.same_name = 'PASS';
function $(same_name) {
	if (same_name) indirection_1(same_name);
}
function indirection_2() {
	console.log(same_name);
}
function indirection_1() {
	indirection_2();
}
$('FAIL');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,11 @@
+global.same_name = 'PASS';
+function $(same_name) {
+	same_name && indirection_1(same_name);
+}
+function indirection_2() {
+	console.log(same_name);
+}
+function indirection_1() {
+	indirection_2();
+}
+$('FAIL');

```

## `terser/functions/issue_2647_1`

- tags: `join vars`, `remove unused`
- size: oxc 185 vs reference 0 (no whitespaces: +185, formatted: +223)

```js
(function(n, o = 'FAIL') {
	console.log(n);
})('PASS');
(function(n, o = 'PASS') {
	console.log(o);
})('FAIL');
(function(o = 'PASS') {
	console.log(o);
})();
(function(n, { o = 'FAIL' }) {
	console.log(n);
})('PASS', {});

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+(function(n, o = 'FAIL') {
+	console.log(n);
+})('PASS');
+(function(n, o = 'PASS') {
+	console.log(o);
+})('FAIL');
+(function(o = 'PASS') {
+	console.log(o);
+})();
+(function(n, { o = 'FAIL' }) {
+	console.log(n);
+})('PASS', {});

```

## `terser/reduce_vars/issue_581`

- tags: `join vars`, `remove unused`
- size: oxc 193 vs reference 0 (no whitespaces: +193, formatted: +226)

```js
class Yellow {
	method() {
		const errorMessage = 'FAIL';
		return applyCb(errorMessage, () => console.log(this.message()));
	}
	message() {
		return 'PASS';
	}
}
function applyCb(errorMessage, callback) {
	return callback(errorMessage);
}
new Yellow().method();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,12 @@
+class Yellow {
+	method() {
+		return applyCb('FAIL', () => console.log(this.message()));
+	}
+	message() {
+		return 'PASS';
+	}
+}
+function applyCb(errorMessage, callback) {
+	return callback(errorMessage);
+}
+new Yellow().method();

```

## `terser/string_literal/issue_10595`

- size: oxc 260 vs reference 67 (no whitespaces: +193, formatted: +195)

```js
// Issue #10595: hex escape followed by digit in string with newline
var a = '\x000\n';
// Other control characters with newline
var b = '\n';
var c = '\n';
// Null followed by non-digit should use \0
var d = '\0a\n';
// Tab and newline can be safely included
var e = '	\n';

```

```diff
--- reference
+++ oxc
@@ -1,10 +1,9 @@
-var a = `\x000
-`;
-var b = `\x01
-`;
-var c = `\x1f
-`;
-var d = `\0a
-`;
-var e = `	
-`;
+// Issue #10595: hex escape followed by digit in string with newline
+var a = '\x000\n';
+// Other control characters with newline
+var b = '\n';
+var c = '\n';
+// Null followed by non-digit should use \0
+var d = '\0a\n';
+// Tab and newline can be safely included
+var e = '	\n';

```

## `terser/pure_funcs/issue_3065_1`

- tags: `join vars`, `remove unused`, `pure functions`
- size: oxc 196 vs reference 0 (no whitespaces: +196, formatted: +235)

```js
function modifyWrapper(a, f, wrapper) {
	wrapper.a = a;
	wrapper.f = f;
	return wrapper;
}
function pureFunc(fun) {
	return modifyWrapper(1, fun, function(a) {
		return fun(a);
	});
}
var unused = pureFunc(function(x) {
	return x;
});

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+function modifyWrapper(a, f, wrapper) {
+	wrapper.a = a;
+	wrapper.f = f;
+	return wrapper;
+}
+function pureFunc(fun) {
+	return modifyWrapper(1, fun, function(a) {
+		return fun(a);
+	});
+}
+var unused = pureFunc(function(x) {
+	return x;
+});

```

## `terser/class_properties/basic_class_properties`

- size: oxc 197 vs reference 0 (no whitespaces: +197, formatted: +244)

```js
class A {
	static foo;
	bar;
	static fil = 'P';
	another = 'A';
	get;
	set = 'S';
	#private;
	#private2 = 'S';
	toString() {
		if ('bar' in this && 'foo' in A) {
			return A.fil + this.another + this.set + this.#private2;
		}
	}
}
console.log(new A().toString());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+class A {
+	static foo;
+	bar;
+	static fil = 'P';
+	another = 'A';
+	get;
+	set = 'S';
+	#private2 = 'S';
+	toString() {
+		if ('bar' in this && 'foo' in A) return A.fil + this.another + this.set + this.#private2;
+	}
+}
+console.log(new A().toString());

```

## `terser/collapse_vars/ignore_class`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 202 vs reference 0 (no whitespaces: +202, formatted: +239)

```js
global.leak = (x) => class dummy {
	get pass() {
		return x;
	}
};
global.module = {};
(function() {
	const SuperClass = leak('PASS');
	class TheClass extends SuperClass {}
	module.exports = TheClass;
})();
console.log(new module.exports().pass);

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,9 @@
+global.leak = (x) => class {
+	get pass() {
+		return x;
+	}
+}, global.module = {}, (function() {
+	let SuperClass = leak('PASS');
+	class TheClass extends SuperClass {}
+	module.exports = TheClass;
+})(), console.log(new module.exports().pass);

```

## `terser/drop_unused/variable_refs_outside_unused_class`

- tags: `remove unused`
- size: oxc 211 vs reference 0 (no whitespaces: +211, formatted: +247)

```js
var symbols = id({ prop: 'method' });
var input = id({ prop: class {} });
var staticProp = id({ prop: 'foo' });
class unused extends input.prop {
	static prop = staticProp.prop;
	[symbols.prop]() {
		console.log('PASS');
	}
}
console.log('PASS');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,10 @@
+var symbols = id({ prop: 'method' });
+var input = id({ prop: class {} });
+var staticProp = id({ prop: 'foo' });
+class unused extends input.prop {
+	static prop = staticProp.prop;
+	[symbols.prop]() {
+		console.log('PASS');
+	}
+}
+console.log('PASS');

```

## `terser/inline/inline_func_with_name_existing_in_block_scope`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 212 vs reference 0 (no whitespaces: +212, formatted: +253)

```js
let something = 'PASS';
function getSomething() {
	return something;
}
function setSomething() {
	something = { value: 42 };
}
function main() {
	if (typeof somethingElse == 'undefined') {
		const something = getSomething();
		console.log(something);
	}
}
main();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,14 @@
+let something = 'PASS';
+function getSomething() {
+	return something;
+}
+function setSomething() {
+	something = { value: 42 };
+}
+function main() {
+	if (typeof somethingElse > 'u') {
+		let something = getSomething();
+		console.log(something);
+	}
+}
+main();

```

## `terser/unicode/issue_3271`

- size: oxc 216 vs reference 0 (no whitespaces: +216, formatted: +295)

```js
function string2buf(str) {
	var i = 0, buf = new Array(2), c = str.charCodeAt(0);
	if (c < 2048) {
		buf[i++] = 192 | c >>> 6;
		buf[i++] = 128 | c & 63;
	} else {
		buf[i++] = 224 | c >>> 12;
		buf[i++] = 128 | c >>> 6 & 63;
		buf[i++] = 128 | c & 63;
	}
	return buf;
}
console.log(string2buf('é'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+function string2buf(str) {
+	var i = 0, buf = [, ,], c = str.charCodeAt(0);
+	if (c < 2048) {
+		buf[i++] = 192 | c >>> 6;
+		buf[i++] = 128 | c & 63;
+	} else {
+		buf[i++] = 224 | c >>> 12;
+		buf[i++] = 128 | c >>> 6 & 63;
+		buf[i++] = 128 | c & 63;
+	}
+	return buf;
+}
+console.log(string2buf('é'));

```

## `terser/sequences/call`

- tags: `sequences`
- size: oxc 218 vs reference 0 (no whitespaces: +218, formatted: +273)

```js
var a = (function() {
	return this;
})();
function b() {
	console.log('foo');
}
b.c = function() {
	console.log(this === b ? 'bar' : 'baz');
};
(a, b)();
(a, b.c)();
(a, function() {
	console.log(this === a);
})();
new (a, b)();
new (a, b.c)();
new (a, function() {
	console.log(this === a);
})();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,13 @@
+var a = (function() {
+	return this;
+})();
+function b() {
+	console.log('foo');
+}
+b.c = function() {
+	console.log(this === b ? 'bar' : 'baz');
+}, b(), (0, b.c)(), function() {
+	console.log(this === a);
+}(), new b(), new b.c(), new function() {
+	console.log(this === a);
+}();

```

## `terser/pure_getters/collapse_rhs_false`

- tags: `join vars`
- size: oxc 237 vs reference 0 (no whitespaces: +237, formatted: +266)

```js
console.log((42 .length = 'PASS', 'PASS'));
console.log(('foo'.length = 'PASS', 'PASS'));
console.log((false.length = 'PASS', 'PASS'));
console.log((function() {}.length = 'PASS', 'PASS'));
console.log(({ get length() {
	return 'FAIL';
} }.length = 'PASS', 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+console.log((42 .length = 'PASS', 'PASS'));
+console.log(('foo'.length = 'PASS', 'PASS'));
+console.log(((!1).length = 'PASS', 'PASS'));
+console.log((function() {}.length = 'PASS', 'PASS'));
+console.log(({ get length() {
+	return 'FAIL';
+} }.length = 'PASS', 'PASS'));

```

## `terser/pure_getters/collapse_rhs_strict`

- tags: `join vars`
- size: oxc 237 vs reference 0 (no whitespaces: +237, formatted: +266)

```js
console.log((42 .length = 'PASS', 'PASS'));
console.log(('foo'.length = 'PASS', 'PASS'));
console.log((false.length = 'PASS', 'PASS'));
console.log((function() {}.length = 'PASS', 'PASS'));
console.log(({ get length() {
	return 'FAIL';
} }.length = 'PASS', 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+console.log((42 .length = 'PASS', 'PASS'));
+console.log(('foo'.length = 'PASS', 'PASS'));
+console.log(((!1).length = 'PASS', 'PASS'));
+console.log((function() {}.length = 'PASS', 'PASS'));
+console.log(({ get length() {
+	return 'FAIL';
+} }.length = 'PASS', 'PASS'));

```

## `terser/pure_getters/collapse_rhs_true`

- tags: `join vars`, `pure getters`
- size: oxc 237 vs reference 0 (no whitespaces: +237, formatted: +266)

```js
console.log((42 .length = 'PASS', 'PASS'));
console.log(('foo'.length = 'PASS', 'PASS'));
console.log((false.length = 'PASS', 'PASS'));
console.log((function() {}.length = 'PASS', 'PASS'));
console.log(({ get length() {
	return 'FAIL';
} }.length = 'PASS', 'PASS'));

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,7 @@
+console.log((42 .length = 'PASS', 'PASS'));
+console.log(('foo'.length = 'PASS', 'PASS'));
+console.log(((!1).length = 'PASS', 'PASS'));
+console.log((function() {}.length = 'PASS', 'PASS'));
+console.log(({ get length() {
+	return 'FAIL';
+} }.length = 'PASS', 'PASS'));

```

## `terser/inline/inline_into_scope_conflict_enclosed_2`

- tags: `join vars`, `remove unused`
- size: oxc 239 vs reference 0 (no whitespaces: +239, formatted: +282)

```js
global.same_name = () => console.log('PASS');
function $(same_name) {
	console.log(same_name === undefined ? 'PASS' : 'FAIL');
	indirection_1();
}
function indirection_1() {
	return indirection_2();
}
function indirection_2() {
	for (const x of [1]) {
		same_name();
		return;
	}
}
$();

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,15 @@
+global.same_name = () => console.log('PASS');
+function $(same_name) {
+	console.log(same_name === void 0 ? 'PASS' : 'FAIL');
+	indirection_1();
+}
+function indirection_1() {
+	return indirection_2();
+}
+function indirection_2() {
+	for (let x of [1]) {
+		same_name();
+		return;
+	}
+}
+$();

```

## `terser/issue_973/this_binding_sequences`

- tags: `sequences`
- size: oxc 252 vs reference 0 (no whitespaces: +252, formatted: +288)

```js
console.log(typeof (function() {
	return eval('this');
})());
console.log(typeof (function() {
	'use strict';
	return eval('this');
})());
console.log(typeof (function() {
	return (0, eval)('this');
})());
console.log(typeof (function() {
	'use strict';
	return (0, eval)('this');
})());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,11 @@
+console.log(typeof (function() {
+	return eval('this');
+})()), console.log(typeof (function() {
+	'use strict';
+	return eval('this');
+})()), console.log(typeof (function() {
+	return (0, eval)('this');
+})()), console.log(typeof (function() {
+	'use strict';
+	return (0, eval)('this');
+})());

```

## `terser/arrays/constant_join`

- size: oxc 739 vs reference 478 (no whitespaces: +261, formatted: +395)

```js
var a = [
	'foo',
	'bar',
	'baz'
].join('');
var a1 = [
	'foo',
	'bar',
	'baz'
].join();
var a2 = [
	'foo',
	'bar',
	'baz'
].join(null);
var a3 = [
	'foo',
	'bar',
	'baz'
].join(void 0);
var a4 = [
	'foo',
	,
	'baz'
].join();
var a5 = [
	'foo',
	null,
	'baz'
].join();
var a6 = [
	'foo',
	void 0,
	'baz'
].join();
var b = [
	'foo',
	1,
	2,
	3,
	'bar'
].join('');
var c = [
	boo(),
	'foo',
	1,
	2,
	3,
	'bar',
	bar()
].join('');
var c1 = [
	boo(),
	bar(),
	'foo',
	1,
	2,
	3,
	'bar',
	bar()
].join('');
var c2 = [
	1,
	2,
	'foo',
	'bar',
	baz()
].join('');
var c3 = [
	boo() + bar() + 'foo',
	1,
	2,
	3,
	'bar',
	bar() + 'foo'
].join('');
var c4 = [
	1,
	2,
	null,
	undefined,
	'foo',
	'bar',
	baz()
].join('');
var c5 = [
	boo() + bar() + 'foo',
	1,
	2,
	3,
	'bar',
	bar() + 'foo'
].join();
var c6 = [
	1,
	2,
	null,
	undefined,
	'foo',
	'bar',
	baz()
].join();
var d = [
	'foo',
	1 + 2 + 'bar',
	'baz'
].join('-');
var e = [].join(foo + bar);
var f = [].join('');
var g = [].join('foo');

```

```diff
--- reference
+++ oxc
@@ -1,16 +1,88 @@
-var a = 'foobarbaz';
-var a1 = 'foo,bar,baz';
-var a2 = 'foonullbarnullbaz';
-var a3 = 'foo,bar,baz';
-var a4 = 'foo,,baz';
-var a5 = 'foo,,baz';
-var a6 = 'foo,,baz';
-var b = 'foo123bar';
-var c = boo() + 'foo123bar' + bar();
-var c1 = '' + boo() + bar() + 'foo123bar' + bar();
-var c2 = '12foobar' + baz();
-var c3 = boo() + bar() + 'foo123bar' + bar() + 'foo';
-var c4 = '12foobar' + baz();
+var a = [
+	'foo',
+	'bar',
+	'baz'
+].join('');
+var a1 = [
+	'foo',
+	'bar',
+	'baz'
+].join();
+var a2 = [
+	'foo',
+	'bar',
+	'baz'
+].join(null);
+var a3 = [
+	'foo',
+	'bar',
+	'baz'
+].join(void 0);
+var a4 = [
+	'foo',
+	,
+	'baz'
+].join();
+var a5 = [
+	'foo',
+	null,
+	'baz'
+].join();
+var a6 = [
+	'foo',
+	void 0,
+	'baz'
+].join();
+var b = [
+	'foo',
+	1,
+	2,
+	3,
+	'bar'
+].join('');
+var c = [
+	boo(),
+	'foo',
+	1,
+	2,
+	3,
+	'bar',
+	bar()
+].join('');
+var c1 = [
+	boo(),
+	bar(),
+	'foo',
+	1,
+	2,
+	3,
+	'bar',
+	bar()
+].join('');
+var c2 = [
+	1,
+	2,
+	'foo',
+	'bar',
+	baz()
+].join('');
+var c3 = [
+	boo() + bar() + 'foo',
+	1,
+	2,
+	3,
+	'bar',
+	bar() + 'foo'
+].join('');
+var c4 = [
+	1,
+	2,
+	null,
+	void 0,
+	'foo',
+	'bar',
+	baz()
+].join('');
 var c5 = [
 	boo() + bar() + 'foo',
 	1,
@@ -19,8 +91,20 @@
 	'bar',
 	bar() + 'foo'
 ].join();
-var c6 = ['1,2,,,foo,bar', baz()].join();
-var d = 'foo-3bar-baz';
+var c6 = [
+	1,
+	2,
+	null,
+	void 0,
+	'foo',
+	'bar',
+	baz()
+].join();
+var d = [
+	'foo',
+	'3bar',
+	'baz'
+].join('-');
 var e = [].join(foo + bar);
-var f = '';
-var g = '';
+var f = [].join('');

... [truncated]
```

## `terser/evaluate/number_method_call`

- size: oxc 630 vs reference 369 (no whitespaces: +261, formatted: +261)

```js
console.log(1.23.toExponential());
console.log(1.23.toExponential(undefined));
console.log(1.23.toExponential(void 0));
console.log(1.23.toExponential(...[]));
console.log(1.23.toExponential(...[undefined]));
console.log(1.23.toExponential(...[...[undefined]]));
console.log(1.23.toPrecision());
console.log(1.23.toPrecision(undefined));
console.log(1.23.toPrecision(void 0));
console.log(1.23.toPrecision(...[]));
console.log(1.23.toPrecision(...[undefined]));
console.log(1.23.toPrecision(...[...[undefined]]));
console.log(1.23.toFixed());
console.log(1.23.toFixed(undefined));
console.log(1.23.toFixed(void 0));
console.log(1.23.toString());
console.log(1.23.toString(undefined));
console.log(1.23.toString(void 0));

```

```diff
--- reference
+++ oxc
@@ -1,18 +1,18 @@
-console.log('1.23e+0');
-console.log('1.23e+0');
-console.log('1.23e+0');
-console.log('1.23e+0');
-console.log('1.23e+0');
-console.log('1.23e+0');
-console.log('1.23');
-console.log('1.23');
-console.log('1.23');
-console.log('1.23');
-console.log('1.23');
+console.log(1.23.toExponential());
+console.log(1.23.toExponential(void 0));
+console.log(1.23.toExponential(void 0));
+console.log(1.23.toExponential());
+console.log(1.23.toExponential(void 0));
+console.log(1.23.toExponential(void 0));
+console.log(1.23.toPrecision());
+console.log(1.23.toPrecision(void 0));
+console.log(1.23.toPrecision(void 0));
+console.log(1.23.toPrecision());
+console.log(1.23.toPrecision(void 0));
+console.log(1.23.toPrecision(void 0));
+console.log(1.23.toFixed());
+console.log(1.23.toFixed(void 0));
+console.log(1.23.toFixed(void 0));
 console.log('1.23');
-console.log('1');
-console.log('1');
-console.log('1');
-console.log('1.23');
-console.log('1.23');
-console.log('1.23');
+console.log(1.23.toString(void 0));
+console.log(1.23.toString(void 0));

```

## `terser/reduce_vars/issue_639`

- size: oxc 267 vs reference 0 (no whitespaces: +267, formatted: +317)

```js
const path = id({ extname: (name) => {
	console.log('PASS:' + name);
} });
global.getExtFn = function getExtFn() {
	return function(path) {
		return getExt(path);
	};
};
function getExt(name) {
	let ext;
	if (!ext) {
		ext = getExtInner(name);
	}
	return ext;
}
function getExtInner(name) {
	return path.extname(name);
}
getExtFn()('name');

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,17 @@
+const path = id({ extname: (name) => {
+	console.log('PASS:' + name);
+} });
+global.getExtFn = function() {
+	return function(path) {
+		return getExt(path);
+	};
+};
+function getExt(name) {
+	let ext;
+	ext ||= getExtInner(name);
+	return ext;
+}
+function getExtInner(name) {
+	return path.extname(name);
+}
+getExtFn()('name');

```

## `terser/block_scope/issue_241`

- tags: `drop debugger`, `join vars`, `sequences`, `remove unused`
- size: oxc 276 vs reference 0 (no whitespaces: +276, formatted: +361)

```js
var a = {};
(function(global) {
	function fail(o) {
		var result = {};
		function inner() {
			return outer({
				one: o.one,
				two: o.two
			});
		}
		result.inner = function() {
			return inner();
		};
		return result;
	}
	function outer(o) {
		var ret;
		if (o) {
			ret = o.one;
		} else {
			ret = o.two;
		}
		return ret;
	}
	global.fail = fail;
})(a);
var b = a.fail({ one: 'PASS' });
console.log(b.inner());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,21 @@
+var a = {};
+(function(global) {
+	function fail(o) {
+		var result = {};
+		function inner() {
+			return outer({
+				one: o.one,
+				two: o.two
+			});
+		}
+		return result.inner = function() {
+			return inner();
+		}, result;
+	}
+	function outer(o) {
+		return o ? o.one : o.two;
+	}
+	global.fail = fail;
+})(a);
+var b = a.fail({ one: 'PASS' });
+console.log(b.inner());

```

## `terser/collapse_vars/issue_2437_1`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 296 vs reference 0 (no whitespaces: +296, formatted: +337)

```js
function XMLHttpRequest() {
	this.onreadystatechange = 'PASS';
}
global.xhrDesc = {};
function foo() {
	return bar();
}
function bar() {
	if (xhrDesc) {
		var req = new XMLHttpRequest();
		var result = req.onreadystatechange;
		Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {});
		return result;
	}
}
console.log(foo());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,14 @@
+function XMLHttpRequest() {
+	this.onreadystatechange = 'PASS';
+}
+global.xhrDesc = {};
+function foo() {
+	return bar();
+}
+function bar() {
+	if (xhrDesc) {
+		var result = new XMLHttpRequest().onreadystatechange;
+		return Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', xhrDesc || {}), result;
+	}
+}
+console.log(foo());

```

## `terser/issue_1261/pure_function_calls_toplevel`

- tags: `join vars`, `sequences`, `remove unused`
- size: oxc 339 vs reference 25 (no whitespaces: +314, formatted: +370)

```js
(function() {
	console.log('iife0');
})();
var iife1 = (function() {
	console.log('iife1');
	function iife1() {}
	return iife1;
})();
(function() {
	var iife2 = (function() {
		console.log('iife2');
		function iife2() {}
		return iife2;
	})();
})();
var MyClass = (function() {
	function MyClass() {}
	MyClass.prototype.method = function() {};
	return MyClass;
})();
bar(), baz(), quux();
a.b(), c.d.e(), f.g();

```

```diff
--- reference
+++ oxc
@@ -1,2 +1,20 @@
-baz(), quux();
-a.b(), f.g();
+(function() {
+	console.log('iife0');
+})();
+var iife1 = (function() {
+	console.log('iife1');
+	function iife1() {}
+	return iife1;
+})();
+(function() {
+	(function() {
+		console.log('iife2');
+		function iife2() {}
+		return iife2;
+	})();
+})();
+var MyClass = (function() {
+	function MyClass() {}
+	return MyClass.prototype.method = function() {}, MyClass;
+})();
+bar(), baz(), quux(), a.b(), c.d.e(), f.g();

```

## `terser/collapse_vars/issue_2437_2`

- tags: `join vars`, `sequences`, `remove unused`, `2 iterations`
- size: oxc 391 vs reference 0 (no whitespaces: +391, formatted: +451)

```js
function XMLHttpRequest() {
	this.onreadystatechange = 'PASS';
}
global.SYMBOL_FAKE_ONREADYSTATECHANGE_1 = Symbol();
global.xhrDesc = null;
function foo() {
	return bar();
}
function bar() {
	if (!xhrDesc) {
		var req = new XMLHttpRequest();
		var detectFunc = function() {};
		req.onreadystatechange = detectFunc;
		var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
		req.onreadystatechange = null;
		return result;
	}
}
console.log(foo());

```

```diff
--- reference
+++ oxc
@@ -0,0 +1,16 @@
+function XMLHttpRequest() {
+	this.onreadystatechange = 'PASS';
+}
+global.SYMBOL_FAKE_ONREADYSTATECHANGE_1 = Symbol(), global.xhrDesc = null;
+function foo() {
+	return bar();
+}
+function bar() {
+	if (!xhrDesc) {
+		var req = new XMLHttpRequest(), detectFunc = function() {};
+		req.onreadystatechange = detectFunc;
+		var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
+		return req.onreadystatechange = null, result;
+	}
+}
+console.log(foo());

```

