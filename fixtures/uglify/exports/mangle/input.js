const a = 42;
export let b, { foo: c } = a;
export function f(d, { [b]: e }) {
    d(e, f);
}
export default a;
export default async function g(x, ...{ [c]: y }) {
    (await x)(g, y);
}
