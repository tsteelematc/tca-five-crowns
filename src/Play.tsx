import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { GameResult } from "./GameResults";

const whildCardHands = [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
];

// -1 indicates never edited, show dash, can -1 back to dash too...
const defaultScores = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

interface PlayProps {
    addNewGameResult: (r: GameResult) => void;
    setTitle: (t: string) => void;
    currentPlayers: string[]
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
    , currentPlayers
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

    const [orderedPlayers, setOrderedPlayers] = useState(currentPlayers);
    const changePlayerOrderDialogRef = useRef<HTMLDialogElement | null>(null);
    const [changePlayerSelectedPlayerIndex, setChangePlayerSelectedPlayerIndex] = useState(0);

    // Use a Map for local state, but spread into array of arrays for
    // GameResult, i-o-g...
    const [scores, setScores] = useState(
        orderedPlayers.reduce(
            (acc, x) => acc.set(
                x
                , defaultScores
            )
            , new Map<string, number[]>()
        )
    );

    // i-o-g... Fixed array of players that go out each turn... Maybe handles
    // scoring turns out of order easier/possible since I don't have rules for turn
    // scoring order...
    const [goOuts, setGoOuts] = useState(["", "", "", "", "", "", "", "", "", "", ""]);

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
        const playersWithTheirTotals: [string, number][] = orderedPlayers.map(
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
            <div className="card bg-base-100 shadow-xl mb-4 border-t-4 border-primary">
                <div className="card-body p-4">
                    <h2 className="card-title text-primary flex items-center mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                        Scorecard
                    </h2>
                    <p className="text-base-content/70 text-sm flex items-center mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 inline mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        Click edit buttons to update scores for each hand
                    </p>
                    
                    <div className="overflow-x-auto mt-2">
                        <table className="table table-zebra table-lg table-pin-rows table-pin-cols">
                            <thead className="text-base-content/80 bg-base-200">
                                <tr>
                                    <th className="font-medium">Wild</th>
                                    {orderedPlayers.map(x => (
                                        <td key={x} className="font-semibold" onClick={() => x === "Beril" ? setBerilEasterEgg(!berilEasterEgg) : null}>
                                            {x}
                                        </td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        <div className="flex items-center justify-between">
                                            <button
                                                className="btn btn-xs btn-outline btn-primary"
                                                onClick={() => changePlayerOrderDialogRef.current?.showModal()}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mr-1">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                                </svg>
                                                Order
                                            </button>
                                        </div>
                                    </th>
                                    <td className="text-nowrap text-xs font-light opacity-50" colSpan={orderedPlayers.length}>
                                        Change player order
                                    </td>
                                </tr>
                                {whildCardHands.map(x => (
                                    <tr key={x} className="text-left hover:bg-base-200/50">
                                        <th className="font-medium">
                                            <div className="flex items-center justify-between">
                                                <span className="badge badge-neutral">{getDisplayWildcard(x)}</span>
                                                <button
                                                    className="btn btn-xs btn-outline"
                                                    onClick={() => editRow(x)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="size-4 mr-1">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                    Edit
                                                </button>
                                            </div>
                                        </th>
                                        {orderedPlayers.map(y => (
                                            <td
                                                key={y}
                                                className={`text-nowrap ${goOuts[x - 3] === y ? "text-success font-medium" : ""}`}
                                            >
                                                <span className="text-lg">{getDisplayScore(y, x)}</span>
                                                <span className="text-xs text-base-content/50 ml-2">
                                                    ({getRunningTotal(y, x)})
                                                </span>
                                                {goOuts[x - 3] === y && 
                                                    <span className="badge badge-xs badge-success ml-1">out</span>
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {possibleWinners.length > 0 && (
                <div className="card bg-base-100 shadow-xl mb-4 border-t-4 border-secondary">
                    <div className="card-body">
                        <h2 className="card-title text-secondary flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                            </svg>
                            Game Results
                        </h2>
                        
                        {possibleWinners.length > 1 ? (
                            <div className="alert alert-warning mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>Players are tied! Choose a winner or use a tiebreaker.</span>
                            </div>
                        ) : (
                            <div className="alert alert-success mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span><strong>{possibleWinners[0]}</strong> has the lowest score!</span>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            {possibleWinners.map(x => (
                                <button
                                    key={x}
                                    className="btn btn-secondary btn-lg gap-2"
                                    onClick={() => {
                                        addNewGameResult({
                                            winner: x,
                                            players: orderedPlayers,
                                            start: startTimestamp,
                                            end: new Date().toISOString(),
                                            scores: [...scores],
                                            goOuts: goOuts
                                        });
                                        nav(-2);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                                    </svg>
                                    {x} Won
                                </button>
                            ))}
                            <button
                                className="btn btn-outline btn-error btn-lg gap-2 md:col-span-2"
                                onClick={() => nav(-2)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                Quit Game
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <dialog
                ref={editRowDialogRef}
                className="modal"
            >
                <div className="modal-backdrop bg-base-300"></div>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="text-lg font-bold mb-4">
                        Editing scores for <span className="text-secondary">{getDisplayWildcard(editingRow)}'s</span> wild
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                        {/* Player selector with improved styling */}
                        <div className="flex items-center justify-between bg-base-200 p-3 rounded-lg">
                            <button
                                className="btn btn-circle btn-sm"
                                onClick={() => setEditingPlayer(
                                    editingPlayerIndex > 0
                                        ? editingPlayerIndex - 1
                                        : orderedPlayers.length - 1
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            
                            <div className="text-center">
                                <div className="text-xl font-bold">{orderedPlayers[editingPlayerIndex]}</div>
                                <div className="text-sm opacity-70">
                                    Current score: <span className="font-semibold text-lg">
                                        {getDisplayScore(orderedPlayers[editingPlayerIndex], editingRow)}
                                    </span>
                                </div>
                            </div>
                            
                            <button
                                className="btn btn-circle btn-sm"
                                onClick={() => setEditingPlayer(
                                    editingPlayerIndex < orderedPlayers.length - 1
                                        ? editingPlayerIndex + 1
                                        : 0
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* "Out" button moved above score controls */}
                        <div className="flex justify-center">
                            <button
                                className={`btn ${orderedPlayers[editingPlayerIndex] === goOuts[editingRow - 3] ? 'btn-success' : 'btn-outline btn-success'} w-full`}
                                onClick={() => {
                                    updateScoreInScoresState(orderedPlayers[editingPlayerIndex], editingRow, 0);
                                    setGoOuts(
                                        goOuts.map(
                                            (x, i) => i === (editingRow - 3)
                                                ? orderedPlayers[editingPlayerIndex]
                                                : x
                                        )
                                    );
                                }}
                            >
                                {orderedPlayers[editingPlayerIndex] === goOuts[editingRow - 3] 
                                    ? <><span className="mr-2">✓</span> Player went out</>
                                    : "Mark as going out (0 points)"}
                            </button>
                        </div>
                        
                        {/* Score adjustment with 3 sections */}
                        <div className="grid grid-cols-3 gap-2">
                            {/* Decrease score section */}
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold opacity-70 text-center">Decrease</span>
                                <button
                                    className="btn btn-outline btn-error"
                                    onClick={() => updateScoreInScoresState(orderedPlayers[editingPlayerIndex], editingRow, -5)}
                                >
                                    -5
                                </button>
                                <button
                                    className="btn btn-outline btn-error"
                                    onClick={() => updateScoreInScoresState(orderedPlayers[editingPlayerIndex], editingRow, -1)}
                                >
                                    -1
                                </button>
                            </div>
                            
                            {/* Reset/zero section */}
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold opacity-70 text-center">Reset</span>
                                <button
                                    className="btn btn-outline btn-neutral"
                                    onClick={() => updateScoreInScoresState(orderedPlayers[editingPlayerIndex], editingRow, -999)}
                                >
                                    Clear (-)
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={() => updateScoreInScoresState(orderedPlayers[editingPlayerIndex], editingRow, 0)}
                                >
                                    Zero (0)
                                </button>
                            </div>
                            
                            {/* Increase score section */}
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold opacity-70 text-center">Increase</span>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        className="btn btn-outline btn-error"
                                        onClick={() => updateScoreInScoresState(orderedPlayers[editingPlayerIndex], editingRow, +1)}
                                    >
                                        +1
                                    </button>
                                    <button
                                        className="btn btn-outline btn-error"
                                        onClick={() => updateScoreInScoresState(orderedPlayers[editingPlayerIndex], editingRow, +5)}
                                    >
                                        +5
                                    </button>
                                </div>
                                <button
                                    className="btn btn-outline btn-error"
                                    onClick={() => updateScoreInScoresState(orderedPlayers[editingPlayerIndex], editingRow, +10)}
                                >
                                    +10
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
            
            <dialog
                ref={changePlayerOrderDialogRef}
                className="modal"
            >
                <div className="modal-backdrop bg-base-300"></div>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="text-lg font-bold mb-4 text-primary flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                        </svg>
                        Change Player Order
                    </h3>
                    
                    <div className="divider my-1"></div>
                    
                    <div className="bg-base-200 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {orderedPlayers.map((x, index) => (
                                <label
                                    key={x}
                                    className={`flex items-center p-2 rounded cursor-pointer ${index === changePlayerSelectedPlayerIndex ? 'bg-primary/10 border border-primary/30' : 'hover:bg-base-300'}`}
                                >
                                    <input 
                                        type="radio" 
                                        name="order-players" 
                                        className="radio radio-primary mr-2"
                                        checked={index === changePlayerSelectedPlayerIndex}
                                        onChange={() => setChangePlayerSelectedPlayerIndex(index)}
                                    />
                                    <span className={index === changePlayerSelectedPlayerIndex ? 'font-medium' : ''}>{x}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex justify-center w-full">
                        <div className="join">
                            <button
                                className="btn btn-outline btn-primary join-item"
                                onClick={() => {
                                    if (changePlayerSelectedPlayerIndex > 0) {
                                        const newOrderedPlayers = [...orderedPlayers];
                                        // Swap with left neighbor
                                        [
                                            newOrderedPlayers[changePlayerSelectedPlayerIndex],
                                            newOrderedPlayers[changePlayerSelectedPlayerIndex - 1]
                                        ] = [
                                            newOrderedPlayers[changePlayerSelectedPlayerIndex - 1],
                                            newOrderedPlayers[changePlayerSelectedPlayerIndex]
                                        ];
                                        setOrderedPlayers(newOrderedPlayers);
                                        setChangePlayerSelectedPlayerIndex(changePlayerSelectedPlayerIndex - 1);
                                    }
                                }}
                                disabled={changePlayerSelectedPlayerIndex === 0}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                                Move Left
                            </button>
                            <button
                                className="btn btn-outline btn-primary join-item"
                                onClick={() => {
                                    if (changePlayerSelectedPlayerIndex < orderedPlayers.length - 1) {
                                        const newOrderedPlayers = [...orderedPlayers];
                                        // Swap with right neighbor
                                        [
                                            newOrderedPlayers[changePlayerSelectedPlayerIndex],
                                            newOrderedPlayers[changePlayerSelectedPlayerIndex + 1]
                                        ] = [
                                            newOrderedPlayers[changePlayerSelectedPlayerIndex + 1],
                                            newOrderedPlayers[changePlayerSelectedPlayerIndex]
                                        ];
                                        setOrderedPlayers(newOrderedPlayers);
                                        setChangePlayerSelectedPlayerIndex(changePlayerSelectedPlayerIndex + 1);
                                    }
                                }}
                                disabled={changePlayerSelectedPlayerIndex === orderedPlayers.length - 1}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                                Move Right
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};