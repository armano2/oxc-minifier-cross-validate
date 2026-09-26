export default function f() {
    if (!(this instanceof f))
        throw new Error("must instantiate");
}
