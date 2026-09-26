try {
    throw new Error("PASS");
} catch ({ message }) {
    console.log(message);
}
