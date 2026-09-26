var a = "FAIL";
({
    get 42() {
        console.log(a);
    }
}[a = "PASS", 42] += "PASS");
