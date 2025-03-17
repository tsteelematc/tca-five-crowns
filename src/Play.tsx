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

    const [startTimestamp] = useState(
        new Date().toISOString()
    );

    return (
        <>
            <div className="overflow-x-auto mt-4">
                <table className="table table-lg table-pin-rows table-pin-cols">
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
                                    <tr
                                        className="text-center"
                                    >
                                        <th
                                            className="font-normal text-sm"
                                        >
                                            {x}
                                        </th>
                                        <td
                                            className="text-nowrap"
                                        >
                                            100
                                            <span 
                                                className="text-xs text-base-content/50 ml-1"
                                            >
                                                / 200
                                            </span> 
                                        </td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                )
                            )
                        }

                    </tbody>
                </table>
            </div>

            <div
                className="flex flex-row"
            >
                <button
                    className="btn btn-active btn-secondary btn-lg my-4"
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
                    Tom Won
                </button>
                <button className="btn btn-outline btn-secondary btn-lg my-4 ml-2">
                    Quit
                </button>
            </div>
        </>
    );
};