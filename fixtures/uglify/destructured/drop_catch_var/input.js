try {
    throw new Error("PASS");
} catch ({ name, message }) {
    console.log(message);
}
