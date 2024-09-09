import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({chess,setBoard,board, socket}: {
    chess:any;
    setBoard:any;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket
}) => {

    const [from, setFrom]= useState<Square | null>(null);
    const [to, setTo]= useState<Square | null>(null);
    return <div className="">
        {board.map((row,i) =>{
            return <div key={i} className="flex">
                {row.map((square,j) =>{
                    return <div onClick={()=>{
                        // const chr = String.fromCharCode(97 + (j)); 
                        // const num = 8-i;
                        const pos = (String.fromCharCode(97 + (j))+(8-i)) as Square;
                        if(!from){
                            console.log("from = ",pos);
                            setFrom(pos);
                        }else{
                            console.log("to = ",pos);
                            // setTo(pos);
                            var move = {from, to:pos};
                            socket.send(JSON.stringify({
                                type:MOVE,
                                move:move
                            }))
                            setFrom(null);
                            chess.move(move)
                            setBoard(chess.board());
                        }
                    }} key={j} className={`flex justify-center items-center w-16 h-16 ${(i+j)%2 ===0 ? 'bg-[#779557]':
                        'bg-[#ececd0]'}`}>
                            {square? <div>
                            <img src={`/${square.type as string + square.color as string}.png`} alt="" /> </div>  : ""}
                    </div>
                })}
            </div>
        })

        }
    </div>
}