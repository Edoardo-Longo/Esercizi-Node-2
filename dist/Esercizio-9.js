"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
const cors = require('cors');
const express = require('express');
const app = express();
const corsOption = {
    origin: 'http://localhost:8080'
};
app.use(express.json());
app.use(cors(corsOption));
app.use((req, res, next) => {
    res.header({ Headers: "Qui la mia header" });
    next();
});
app.get('/', async (req, res) => {
    const data = await client_1.default.exercise5.findMany();
    res.send(data);
});
app.post('/post', async (req, res) => {
    const info = req.body;
    const data = await client_1.default.exercise5.create({ data: { name: info.name } });
    res.status(201).json(data);
});
app.put('/put/:id(\\d+)', async (req, res, next) => {
    const info = Number(req.params.id);
    const update = req.body;
    try {
        const data = await client_1.default.exercise5.update({
            where: { id: info },
            data: {
                name: update.name
            }
        });
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404);
        next(`Cannot PUT /put/${info}`);
    }
});
app.delete("/delete/:id(\\d+)", async (req, res, next) => {
    const info = Number(req.params.id);
    try {
        await client_1.default.exercise5.delete({
            where: { id: info }
        });
        res.status(204).end();
    }
    catch (err) {
        res.status(404);
        next(`Cannot DELETE /planets/${info}`);
    }
});
app.listen(process.env.PORT, () => { console.log("[SERVER]: Server is running on http://localhost:3000"); });
exports.default = app;
//# sourceMappingURL=Esercizio-9.js.map