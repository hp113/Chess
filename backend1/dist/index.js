"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const wss = new ws_1.WebSocketServer({ server });
const gameManager = new GameManager_1.GameManager();
wss.on('connection', (ws) => {
    gameManager.addUser(ws);
    ws.on('close', () => {
        gameManager.removeUser(ws);
    });
    // ws.on("disconnect",() => gameManager.removeUser(ws));
});
