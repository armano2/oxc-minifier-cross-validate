const a = 42;
export let bbb, { foo: ccc } = a;
export function fff(d, { [bbb]: e }) {
    d(e, fff);
}
export default a;
export default async function g(x, ...{ [ccc]: y }) {
    (await x)(g, y);
}
