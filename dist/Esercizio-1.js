"use strict";
const fs = require('node:fs');
fs.writeFile('./txt/message.txt', 'Hello world!', 'utf8', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("File scritto con successo!");
});
//# sourceMappingURL=Esercizio-1.js.map