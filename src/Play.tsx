import { useState } from "react";
import { useNavigate } from "react-router";

interface PlayProps {
    totalGameCount: number;
    setTotalGameCount: (newTotalGameCount: number) => void;
};

export const Play: React.FC<PlayProps> = ({
    totalGameCount
    , setTotalGameCount
}) => {

    const nav = useNavigate();

    const [turnNumber, setTurnNumber] = useState(1);

    return (
        <>
            <h3
                className='text-2xl font-bold'
            >
                Play ({totalGameCount} games played)
            </h3>
            <h4 className="text-lg font-semibold">
                Turn # {turnNumber}
                <button 
                    className="btn btn-xs btn-outline btn-light ml-4"
                    onClick={
                        // () => turnNumber = turnNumber + 1
                        // () => {
                        //     turnNumber = turnNumber + 1;
                        //     console.log(turnNumber);
                        // }
                        () => setTurnNumber(turnNumber + 1)
                    }
                >
                    +
                </button>
            </h4>
            <button
                className="btn btn-active btn-secondary btn-lg mt-4"
                onClick={
                    () => {
                        setTotalGameCount(totalGameCount + 1);
                        nav(-2);
                    }
                }
            >
                Done
            </button>
        </>
    );
};