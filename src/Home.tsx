import { useNavigate } from "react-router";
import { GeneralFacts, GoOutsLeaderboardEntry, LeaderboardEntry } from "./GameResults";
import { useEffect } from "react";

export const AppTitle = "Five Crowns Companion";

interface HomeProps {
    leaderboardData: LeaderboardEntry[];
    setTitle: (t: string) => void;
    generalFacts: GeneralFacts;
    goOutsLeaderboardData: GoOutsLeaderboardEntry[];
};

export const Home: React.FC<HomeProps> = ({
    leaderboardData
    , setTitle
    , generalFacts
    , goOutsLeaderboardData
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
                                <p>
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
                                <p>
                                    Play a game of Five Crowns to see the leaderboard ! ! !
                                </p>
                            )
                    }
                </div>
            </div>
        </>
    );
};