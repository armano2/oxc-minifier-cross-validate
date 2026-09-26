"use strict";
try {
    throw 1;
} catch (e) {
    try {
        {
            const e = 2;
        }
    } finally {
        const e = 3;
        console.log(typeof t);
    }
}
