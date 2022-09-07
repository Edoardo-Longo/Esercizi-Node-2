"use strict";
function luckyDraw(player) {
    return new Promise((resolve, reject) => {
        const win = Boolean(Math.round(Math.random()));
        process.nextTick(() => {
            if (!win) {
                resolve(`${player} won a prize in the draw!`);
            }
            else {
                reject(new Error(`${player} lost the draw.`));
            }
        });
    });
}
luckyDraw("Edoardo").then(data => console.log(data)).catch(err => console.error(err.message))
    .then(() => luckyDraw("Marco").then(data => console.log(data)).catch(err => console.error(err.message))
    .then(() => luckyDraw("Giovanni").then(data => console.log(data)).catch(err => console.error(err.message))));
//# sourceMappingURL=Esercizio-2.js.map