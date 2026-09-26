(new class A{static*#f(){yield 3*A.#p}async#g(){for(var a of A.#f())return a*await 2}static get#p(){return 7}get q(){return this.#g()}}).q.then(console.log);
