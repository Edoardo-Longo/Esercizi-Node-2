"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
const express = require('express');
const app = express();
app.use((req, res, next) => {
    res.header({ Headers: "Qui la mia header" });
    next();
});
app.get('/', async (req, res) => {
    const data = await client_1.default.exercise5.findMany();
    res.send(data);
});
app.listen(process.env.PORT, () => { console.log("[SERVER]: Server is running on http://localhost:3000"); });
exports.default = app;
//# sourceMappingURL=Esercizio-7.js.map