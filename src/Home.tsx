import { useNavigate } from "react-router";
import { LeaderboardEntry } from "./GameResults";

interface HomeProps {
    totalGameCount: number;
    leaderboardData: LeaderboardEntry[];
};

export const Home: React.FC<HomeProps> = ({
    totalGameCount
    , leaderboardData
}) => {

    // Use a react hook for button navigation...
    const nav = useNavigate();

    return (
        <>
            <h3
                className='text-2xl font-bold'
            >
                Home ({totalGameCount} games played)
            </h3>
            <button
                className="btn btn-active btn-secondary btn-lg mt-4"
                onClick={
                    () => nav("/setup")
                }
            >
                Play Five Crowns
            </button>

            <div
                className="card w-full bg-base-100 card-md shadow-xl"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                    {
                        leaderboardData.length === 0
                            ? (
                                <h3
                                    className="text-md font-light"
                                >
                                    Play a game to see the leaderboard ! ! !
                                </h3>
                            )
                            : (
                                <table
                                    className="table"
                                >
                                    <thead>
                                        <tr>
                                            <th>W</th>
                                            <th>L</th>
                                            <th>AVG</th>
                                            <th>PLAYER</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            leaderboardData.map(
                                                x => (
                                                    <tr>
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

                            )
                    }
                </div>
            </div>
        </>
    );
};