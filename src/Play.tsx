import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { GameResult } from "./GameResults";

const whildCardHands = [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
];

const dummyPlayers = [
    "Eric", "Beril", "Munch", "Tom", "Stephanie"
];

// -1 indicates never edited, show dash, can -1 back to dash too...
const defaultScores = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

interface PlayProps {
    addNewGameResult: (r: GameResult) => void;
    setTitle: (t: string) => void;
};

const getDisplayWildcard = (x: number): string => (
    x < 11
        ? x.toString()
        : x === 11
            ? "J"
            : x === 12
                ? "Q"
                : "K"
);

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
    const [editingPlayerIndex, setEditingPlayer] = useState(0);

    // Use a Map for local state, but spread into array of arrays for
    // GameResult, i-o-g...
    const [scores, setScores] = useState(
        dummyPlayers.reduce(
            (acc, x) => acc.set(
                x
                , defaultScores
            )
            , new Map<string, number[]>()
        )
    );

    const editRow = (wildCard: number) => {
        setEditingRow(wildCard);
        setEditingPlayer(0);
        editRowDialogRef.current?.showModal();
    };

    const getDisplayScore = (player: string, wildCard: number) => {

        const playerScores = scores.get(player) ?? defaultScores;

        return playerScores[wildCard - 3] === -1
            ? "-"
            : playerScores[wildCard - 3] > 0
                ? playerScores[wildCard - 3]
                : berilEasterEgg
                    ? "❤️"
                    : "0"
    };

    const updateScoreInScoresState = (
        player: string
        , wildCard: number
        , delta: number
    ) => {

        const currentScore = (scores.get(player) ?? defaultScores)[wildCard - 3];

        // Handle -1 stuffy-stuff...
        const newScore = delta === 0
            ? 0
            : currentScore === -1 && delta > 0
                ? currentScore + 1 + delta
                : currentScore === -1 && delta < 0
                    ? -1
                    : currentScore + delta

        setScores(
            new Map(
                scores.set(
                    player
                    , (scores.get(player) ?? defaultScores).map(
                        (x, i) => wildCard - 3 === i
                            ? newScore < 0
                                ? Math.max(newScore, -1)
                                : newScore
                            : x
                    )
                )
            )
        );
    };

    const getRunningTotal = (player: string, wildCard: number) => {

        const scoresForPlayer = scores.get(player) ?? defaultScores;

        const runningTotal = scoresForPlayer
            // Ooh, replace -1's with zeros before calc RT, i-o-g...
            .map(
                x => x === -1
                    ? 0
                    : x
            )
            .reduce(
                (acc, x, i) => i <= (wildCard - 3)
                    ? acc + x
                    : acc
                , 0
            );

        return runningTotal;
    };

    const getPlayersWithLowestScore = (): string[] => {

        // Tuple [string, number] incoming...
        const playersWithTheirTotals: [string, number][] = dummyPlayers.map(
            x => [
                x
                , getRunningTotal(
                    x
                    , 13 // Last hand, hardcoded, but meh, should work forever : - O
                )
            ]
        );

        const lowestScore = Math.min(
            ...playersWithTheirTotals.map(
                x => x[1]
            )
        );

        return playersWithTheirTotals
            .filter(
                x => x[1] === lowestScore
            )
            .map(
                x => x[0]
            )
            ;
    };

    const possibleWinners = getPlayersWithLowestScore();

    return (
        <>
            <p>
                Press
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 inline mx-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                buttons (below) to enter scores for each hand...
            </p>
            <div className="overflow-x-auto mt-4">
                <table className="table table-zebra table-lg table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <td
                                className="font-light"
                            >
                                Wild Card
                            </td>
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
                                        key={x}
                                        className="text-left"
                                    >
                                        <th
                                            className="font-normal text-sm"
                                        >
                                            <div className="grid grid-cols-2 gap-4 mr-6">
                                                <span>
                                                    {
                                                        getDisplayWildcard(x)
                                                    }
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
                                        {
                                            dummyPlayers.map(
                                                y => (
                                                    <td
                                                        key={y}
                                                        className="text-nowrap"
                                                    >
                                                        {
                                                            getDisplayScore(y, x)
                                                        }
                                                        <span
                                                            className="text-xs text-base-content/50 ml-1"
                                                        >
                                                            / {getRunningTotal(y, x)}
                                                        </span>
                                                    </td>
                                                )
                                            )
                                        }
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                possibleWinners.length > 1 && (
                    <p
                        className="mt-4"
                    >
                        Some players are tied, cut cards, rock-paper-scissors, somehow choose a single winner ! ! !
                    </p>
                )
            }
            <div
                className="grid grid-cols-2 gap-2 mt-4"
            >
                {
                    possibleWinners.map(
                        x => (
                            <button
                                key={x}
                                className="btn btn-active btn-secondary btn-lg truncate"
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
                                            , scores: [
                                                ...scores
                                            ]
                                        });
                                        nav(-2);
                                    }
                                }
                            >
                                {
                                    `${x} Won`
                                }
                            </button>
                        )
                    )
                }
                <button
                    className="btn btn-outline btn-secondary btn-lg"
                    onClick={
                        () => nav(-2)
                    }
                >
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
                        className="text-lg"
                    >
                        Editing scores for <span className="text-secondary font-bold">{getDisplayWildcard(editingRow)}'s</span> wild
                    </h3>
                    <div className="flex flex-col bg-info123 text-left">
                        <div className="join my-4 flex items-center">
                            <button
                                className="flex-none btn btn-sm btn-outline join-item"
                                onClick={
                                    () => setEditingPlayer(
                                        editingPlayerIndex > 0
                                            ? editingPlayerIndex - 1
                                            : dummyPlayers.length - 1
                                    )
                                }
                            >
                                &lt;
                            </button>
                            <label
                                className="flex-1 ml-4 mr-4 text-xl join-item text-left"
                            >
                                {dummyPlayers[editingPlayerIndex]}
                                &nbsp;
                                (
                                {
                                    getDisplayScore(
                                        dummyPlayers[editingPlayerIndex]
                                        , editingRow
                                    )
                                }
                                )
                            </label>
                            <button
                                className="flex-none btn btn-sm btn-outline join-item"
                                onClick={
                                    () => setEditingPlayer(
                                        editingPlayerIndex < dummyPlayers.length - 1
                                            ? editingPlayerIndex + 1
                                            : 0
                                    )
                                }
                            >
                                &gt;
                            </button>
                        </div>
                        <div className="flex">
                            <div className="join">
                                <button
                                    className="btn btn-sm btn-outline join-item"
                                    onClick={
                                        () => updateScoreInScoresState(dummyPlayers[editingPlayerIndex], editingRow, -5)
                                    }
                                >
                                    -5
                                </button>
                                <button
                                    className="btn btn-sm btn-outline join-item"
                                    onClick={
                                        () => updateScoreInScoresState(dummyPlayers[editingPlayerIndex], editingRow, -1)
                                    }
                                >
                                    -1
                                </button>
                            </div>
                            <button
                                className="btn btn-sm btn-outline btn-success join-item ml-4"
                                onClick={
                                    () => updateScoreInScoresState(dummyPlayers[editingPlayerIndex], editingRow, 0)
                                }
                            >
                                0
                            </button>
                            <div className="join ml-4">
                                <button
                                    className="btn btn-sm btn-outline btn-error join-item flex-none"
                                    onClick={
                                        () => updateScoreInScoresState(dummyPlayers[editingPlayerIndex], editingRow, +1)
                                    }
                                >
                                    +1
                                </button>
                                <button
                                    className="btn btn-sm btn-outline btn-error join-item flex-none"
                                    onClick={
                                        () => updateScoreInScoresState(dummyPlayers[editingPlayerIndex], editingRow, +5)
                                    }
                                >
                                    +5
                                </button>
                                <button
                                    className="btn btn-sm btn-outline btn-error join-item flex-none"
                                    onClick={
                                        () => updateScoreInScoresState(dummyPlayers[editingPlayerIndex], editingRow, +10)
                                    }
                                >
                                    +10
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>

        </>
    );
};