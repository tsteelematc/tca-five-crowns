import { useNavigate } from "react-router";
import { GeneralFacts, GoOutsLeaderboardEntry, LeaderboardEntry } from "./GameResults";
import { useEffect } from "react";

export const AppTitle = "Five Crowns Companion";

interface HomeProps {
    leaderboardData: LeaderboardEntry[];
    setTitle: (t: string) => void;
    generalFacts: GeneralFacts;
    goOutsLeaderboardData: GoOutsLeaderboardEntry[];
    gameDurationData: any; // : - (
    gamesByMonthData: Array<[string, number]>
};

export const Home: React.FC<HomeProps> = ({
    leaderboardData
    , setTitle
    , generalFacts
    , goOutsLeaderboardData
    , gameDurationData
    , gamesByMonthData
}) => {

    useEffect(
        () => setTitle(AppTitle)
        , []
    );

    // Use a react hook for button navigation...
    const nav = useNavigate();

    return (
        <>
            <button
                className="btn btn-active btn-secondary btn-lg mt-4 w-full lg:w-64 text-nowrap overflow-x-hidden"
                onClick={
                    () => nav("/setup")
                }
            >
                Play Five Crowns
            </button>
            <div
                className="card w-full bg-base-100 card-md shadow-lg mt-4 border-t-4 border-secondary"
            >
                <div
                    className="card-body p-0"
                >
                    <h2
                        className="card-title ml-3 mt-3"
                    >
                        General
                    </h2>
                    <div
                        className="overflow-x-auto"
                    >
                        <table
                            className="table"
                        >
                            <tbody>
                                <tr>
                                    <td>
                                        Last Played
                                    </td>
                                    <th>
                                        {generalFacts.lastPlayed}
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        Total Games
                                    </td>
                                    <th>
                                        {generalFacts.totalGames}
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        Shortest Game
                                    </td>
                                    <th>
                                        {generalFacts.shortestGame}
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        Longest Game
                                    </td>
                                    <th>
                                        {generalFacts.longestGame}
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div
                className="card w-full bg-base-100 card-md shadow-lg mt-4 border-t-4 border-secondary"
            >
                <div
                    className="card-body p-0"
                >
                    <h2
                        className="card-title ml-3 mt-3"
                    >
                        Leaderboard
                    </h2>
                    {
                        leaderboardData.length > 0 
                            ? (
                                <div 
                                    className="overflow-x-auto"
                                >
                                    <table 
                                        className="table"
                                    >
                                        <thead>
                                            <tr>
                                                <th>
                                                    W
                                                </th>
                                                <th>
                                                    L
                                                </th>
                                                <th>
                                                    AVG
                                                </th>
                                                <th>
                                                    PLAYER
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                leaderboardData.map(
                                                    x => (
                                                        <tr
                                                            key={x.player}
                                                        >
                                                            <td>
                                                                {x.wins}
                                                            </td>
                                                            <td>
                                                                {x.losses}
                                                            </td>
                                                            <td>
                                                                {x.average}
                                                            </td>
                                                            <td>
                                                                {x.player}
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                            : (
                                <p
                                    className="mx-3 mb-3"
                                >
                                    Play a game of Five Crowns to see the leaderboard ! ! !
                                </p>
                            )
                    }
                </div>
            </div>
            <div
                className="card w-full bg-base-100 card-md shadow-lg mt-4 border-t-4 border-secondary"
            >
                <div
                    className="card-body p-0"
                >
                    <h2
                        className="card-title ml-3 mt-3"
                    >
                        "Go Outs" Leaderboard
                    </h2>
                    {
                        goOutsLeaderboardData.length > 0 
                            ? (
                                <div 
                                    className="overflow-x-auto"
                                >
                                    <table 
                                        className="table"
                                    >
                                        <thead>
                                            <tr>
                                                <th>
                                                    PLAYER
                                                </th>
                                                <th>
                                                    AVG 'GO OUTS' PER GAME
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                goOutsLeaderboardData.map(
                                                    x => (
                                                        <tr
                                                            key={x.player}
                                                        >
                                                            <td>
                                                                {x.player}
                                                            </td>
                                                            <td>
                                                                {x.goOutsPerGame}
                                                                <span className="text-xs font-light ml-4">
                                                                    {x.totalGoOuts} in {x.gamesPlayed} {`game${x.gamesPlayed === 1 ? "" : "s"}`}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                            : (
                                <p
                                    className="mx-3 mb-3"
                                >
                                    Play a game of Five Crowns to see the leaderboard ! ! !
                                </p>
                            )
                    }
                </div>
            </div>
            <div
                className="card w-full bg-base-100 card-md shadow-lg mt-4 border-t-4 border-secondary"
            >
                <div
                    className="card-body p-0"
                >
                    <h2
                        className="card-title ml-3 mt-3"
                    >
                        Game Durations
                    </h2>
                    {
                        gameDurationData.length > 0 
                            ? (
                                <div 
                                    className="overflow-x-auto"
                                >
                                    <table 
                                        className="table"
                                    >
                                        <thead>
                                            <tr>
                                                <th>
                                                    PLAYERS
                                                </th>
                                                <th>
                                                    AVG DURATION
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                gameDurationData.map(
                                                    (x: any) => (
                                                        <tr
                                                            key={x.numberOfPlayers}
                                                        >
                                                            <td>
                                                                {x.numberOfPlayers}
                                                            </td>
                                                            <td>
                                                                {x.avgGameDuration}
                                                                <span className="text-xs font-light ml-4">
                                                                    {x.gameCount} {`game${x.gameCount === 1 ? "" : "s"}`}
                                                                </span>                                                                
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                            : (
                                <p
                                    className="mx-3 mb-3"
                                >
                                    Play some Five Crowns to see : - O
                                </p>
                            )
                    }
                </div>
            </div>
            <div
                className="card w-full bg-base-100 card-md shadow-lg mt-4 border-t-4 border-secondary"
            >
                <div
                    className="card-body p-0"
                >
                    <h2
                        className="card-title ml-3 mt-3"
                    >
                        Games by Month
                    </h2>
                    {
                        leaderboardData.length > 0 
                            ? (
                                <div 
                                    className="overflow-x-auto"
                                >
                                    <table 
                                        className="table"
                                    >
                                        <thead>
                                            <tr>
                                                <th>
                                                    MONTH
                                                </th>
                                                <th>
                                                    # OF GAMES
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                gamesByMonthData.map(
                                                    x => (
                                                        <tr
                                                            key={x[0]}
                                                        >
                                                            <td>
                                                                {x[0]}
                                                            </td>
                                                            <td>
                                                                {x[1]}
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                            : (
                                <p
                                    className="mx-3 mb-3"
                                >
                                    Yeah right, play a game to see : - O
                                </p>
                            )
                    }
                </div>
            </div>
        </>
    );
};