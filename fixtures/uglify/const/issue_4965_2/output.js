"use strict";
try {
    throw 1;
} catch (o) {
    try {
        {
            const t = 2;
        }
    } finally {
        const o = 3;
        console.log(typeof t);
    }
}
