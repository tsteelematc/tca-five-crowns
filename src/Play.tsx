import { useEffect, useRef, useState } from "react";
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

    const [berilEasterEgg, setBerilEasterEgg] = useState(false);

    const editRowDialogRef = useRef<HTMLDialogElement | null>(null);
    const [editingRow, setEditingRow] = useState(0);

    const editRow = (wildCard: number) => {
        setEditingRow(wildCard);
        editRowDialogRef.current?.showModal();
    };

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
                                            onClick={
                                                () => x === "Beril"
                                                    ? setBerilEasterEgg(!berilEasterEgg)
                                                    : console.log("You're not Beril : - O")
                                            }
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
                                            <div className="grid grid-cols-2 gap-4 mr-6">
                                                <span>
                                                    {x}
                                                </span>
                                                <button 
                                                    className="btn btn-xs btn-dash ml-4 w-8"
                                                    onClick={
                                                        () => editRow(x)
                                                    }
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="size-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </button>

                                            </div>
                                        </th>
                                        <td
                                            className="text-nowrap"
                                        >
                                            {
                                                Math.random() > 0.5
                                                    ? "100"
                                                    : berilEasterEgg
                                                        ? "❤️"
                                                        : "0"
                                            }
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

            <dialog
                ref={editRowDialogRef}
                className="modal"
            >
                <div
                    className="modal-box"
                >
                    <form
                        method="dialog"
                    >
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3
                        className="text-primary text-lg"
                    >
                        Editing scores for {editingRow}'s wild
                    </h3>
                    <div className="grid grid-cols-1">
                        <div className="join">
                            <button className="btn btn-xs btn-outline join-item">
                                &lt;
                            </button>
                            <label
                                className="ml-2 mr-2 w-24 join-item"
                            >
                                Tom
                            </label>
                            <button className="btn btn-xs btn-outline join-item">
                                &gt;
                            </button>
                        </div>
                        <div className="join ml-4">
                            <button className="btn btn-xs btn-outline join-item">
                                -1
                            </button>
                            <label 
                                className="join-item ml-4 mr-4 text-center"
                            >
                                0
                            </label>
                            <button className="btn btn-xs btn-outline join-item">
                                +1
                            </button>
                            <button className="btn btn-xs btn-outline join-item">
                                +5
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>

        </>
    );
};