const t = 42;
export let b, { foo: c } = t;
export function f(t, { [b]: o }) {
    t(o, f);
}
export default t;
export default async function e(t, ...{ [c]: o}) {
    (await t)(e, o);
}
