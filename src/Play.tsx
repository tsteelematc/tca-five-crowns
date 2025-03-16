import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GameResult } from "./GameResults";

const whildCardHands = [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
];

const dummyPlayers = [
    "Eric", "Beril", "Munch", "Tom", "Stephanie", "Harry", "Martha", "Liam", "Olivia", "Emma"
    , "Ava", "Sophia", "Isabella", "Mia", "Charlotte", "Amelia", "Evelyn", "Abigail", "Ella", "Scarlett"
];

interface PlayProps {
    addNewGameResult: (r: GameResult) => void;
    setTitle: (t: string) => void;
};

export const Play: React.FC<PlayProps> = ({
    addNewGameResult
    , setTitle
}) => {

    useEffect(
        () => setTitle("Play")
        , []
    );

    const nav = useNavigate();

    const [turnNumber, setTurnNumber] = useState(0);

    const [startTimestamp] = useState(
        new Date().toISOString()
    );

    return (
        <>
            <h4
                className="text-lg font-semibold"
            >
                Turn #{turnNumber}
                <button
                    className="btn btn-xs btn-outline btn-light ml-4"
                    onClick={
                        () => {
                            setTurnNumber(turnNumber + 1);
                            console.log(
                                turnNumber
                            );
                        }
                    }
                >
                    +
                </button>
            </h4>
            <button
                className="btn btn-active btn-secondary btn-lg mt-4"
                onClick={
                    () => {
                        addNewGameResult({
                            winner: "Barbie"
                            , players: [
                                "Barbie"
                                , "Ken"
                            ]
                            , start: startTimestamp
                            , end: new Date().toISOString()
                        });
                        nav(-2);
                    }
                }
            >
                Done
            </button>

            <div className="overflow-x-auto mt-4">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <th></th>
                            {
                                dummyPlayers.map(
                                    x => (
                                        <td
                                            key={x}
                                        >
                                            {x}
                                        </td>
                                    )
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            whildCardHands.map(
                                x => (
                                    <tr>
                                        <th>
                                            {x}
                                        </th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )
                            )
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
};