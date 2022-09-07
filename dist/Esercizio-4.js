"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
app.use((req, res, next) => {
    res.header({ Headers: "Qui la mia header" });
    next();
});
app.get('/', (req, res) => {
    res.status(200).send({ json: "Un bel json" });
});
app.listen(process.env.PORT, () => { console.log("[SERVER]: Server is running on http://localhost:3000"); });
exports.default = app;
//# sourceMappingURL=Esercizio-4.js.map