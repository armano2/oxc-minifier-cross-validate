var a = 1;
console.log(new class A {
    p = a-- && new A();
}().p.p);
