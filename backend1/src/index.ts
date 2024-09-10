import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;



const server = app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

const wss = new WebSocketServer({ server });

const gameManager = new GameManager();

wss.on('connection', (ws)=> {
    gameManager.addUser(ws);
    ws.on('close', () =>{
        gameManager.removeUser(ws);
    })
    // ws.on("disconnect",() => gameManager.removeUser(ws));
});