console.log(typeof async function() {
    await /abc/;
}().then);
