import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () =>{
    const socket = useSocket();
    const [chess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);
    const [selected, setSelected] = useState(false);


    useEffect(()=>{
        if(!socket){
            return ;
        }
        socket.onmessage = (event) =>{
            const message = JSON.parse(event.data);
            console.log(message);
            switch(message.type){
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true);
                    console.log("game initialized");
                    break;
                case MOVE:
                    console.log(message);
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log(chess.ascii());
                    console.log("Move made");
                    break;
                case GAME_OVER:
                    console.log("Game over");
                    break;
            }
        }
    }, [socket]);

    if(!socket){
        return <div>
            Connnecting ....
        </div>
    }

    return <div className="flex justify-center pt-10">
        <div className="grid grid-cols-6 gap-4 ">
            <div className="col-span-4 bg-yellow-300">
                <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board ={board} />
            </div>
            <div className="col-span-2 bg-green-200 px-4">
                {!selected && <Button onClick={()=>{
                    setSelected(true);
                    socket.send(JSON.stringify({
                        type:INIT_GAME

                    }))
                }}> Play </Button>}
                {selected && !started && <Button onClick={()=>{
                    // setStarted(true);
                    // socket.send(JSON.stringify({
                    //     type:INIT_GAME

                    // }))
                }}> Searching... </Button>}
            </div>
        </div>
    </div>
}