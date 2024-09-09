import {useNavigate} from 'react-router-dom';
import { Button } from '../components/Button';
export const Landing = () =>{

    const navigate = useNavigate();
    return <div className="flex justify-center pt-20">
        <div className="grid grid-cols-1 gap-4 md: grid-cols-2 pt-2">
            <div>
                <img src="/chessboard.jpeg" className="max-w-lg"/>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-white text-4xl">Play Chess Online</h1>
                <Button onClick={()=>{
                    navigate("/game")
                }}> Play Online</Button>
                
            </div>

        </div>
    </div>
}