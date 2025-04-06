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
            <div className="hero bg-base-200 rounded-lg p-4 mb-8">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold text-primary">Five Crowns</h1>
                        <p className="py-2 text-base-content/70">Track scores, view stats, and enjoy the game!</p>
                        <button
                            className="btn btn-primary btn-lg mt-4 w-full lg:w-64 text-nowrap overflow-x-hidden shadow-lg"
                            onClick={() => nav("/setup")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                            Play Five Crowns
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-xl border-t-4 border-secondary">
                    <div className="card-body">
                        <h2 className="card-title text-secondary flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Game Stats
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <tbody>
                                    <tr>
                                        <td className="font-medium">Last Played</td>
                                        <td className="text-right">{generalFacts.lastPlayed}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Total Games</td>
                                        <td className="text-right text-secondary font-bold">{generalFacts.totalGames}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Shortest Game</td>
                                        <td className="text-right">{generalFacts.shortestGame}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Longest Game</td>
                                        <td className="text-right">{generalFacts.longestGame}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl border-t-4 border-primary">
                    <div className="card-body">
                        <h2 className="card-title text-primary flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                            </svg>
                            Leaderboard
                        </h2>
                        {leaderboardData.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead className="text-base-content/70 text-xs">
                                        <tr>
                                            <th className="text-center bg-base-200 rounded-tl-lg">W</th>
                                            <th className="text-center bg-base-200">L</th>
                                            <th className="text-center bg-base-200">AVG</th>
                                            <th className="bg-base-200 rounded-tr-lg">PLAYER</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaderboardData.map((x, index) => (
                                            <tr key={x.player} className={index === 0 ? "font-bold text-primary" : ""}>
                                                <td className="text-center">{x.wins}</td>
                                                <td className="text-center">{x.losses}</td>
                                                <td className="text-center">{x.average}</td>
                                                <td>{x.player}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="alert alert-info">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>Play a game to see the leaderboard!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl mt-6 border-t-4 border-accent">
                <div className="card-body">
                    <h2 className="card-title text-accent flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                        "Go Outs" Leaderboard
                    </h2>
                    {goOutsLeaderboardData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead className="text-base-content/70 text-xs">
                                    <tr>
                                        <th className="bg-base-200 rounded-tl-lg">PLAYER</th>
                                        <th className="bg-base-200 rounded-tr-lg">AVG 'GO OUTS' PER GAME</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {goOutsLeaderboardData.map((x, index) => (
                                        <tr key={x.player} className={index === 0 ? "font-bold text-accent" : ""}>
                                            <td>{x.player}</td>
                                            <td>
                                                <div className="flex items-center">
                                                    <span className="font-semibold">{x.goOutsPerGame}</span>
                                                    <div className="mx-2 h-4 w-px bg-base-300"></div>
                                                    <span className="text-xs text-base-content/70">
                                                        {x.totalGoOuts} in {x.gamesPlayed} {`game${x.gamesPlayed === 1 ? "" : "s"}`}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Play a game to see the "Go Outs" leaderboard!</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};