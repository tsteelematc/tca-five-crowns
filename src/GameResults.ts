import { durationFormatter } from "human-readable";

const formatGameDuration = durationFormatter<string>();

const formatLastPlayed = durationFormatter<string>({
    allowMultiples: ["y", "mo", "d"]
});


//
// Exported interfaces...
//
export interface GameResult {
    winner: string;
    players: string[];
    start: string;
    end: string;
    scores: [string, number[]][];
    goOuts: string[];
};

export interface LeaderboardEntry {
    wins: number;
    losses: number;
    average: string;
    player: string;
};

export interface GeneralFacts {
    lastPlayed: string;
    totalGames: number;
    shortestGame: string;
    longestGame: string;
};

export interface GoOutsLeaderboardEntry {
    player: string;
    totalGoOuts: number;
    gamesPlayed: number;
    goOutsPerGame: string;
};

//
// Exported functions...
//
export const getLeaderboard = (
    results: GameResult[]
): LeaderboardEntry[] => 
    getPreviousPlayers(results)
        .map(
            x => getLeaderboardEntry(
                    results
                    , x
                )
        )
        .sort(
            (a, b) => {
                
                // Some wins with same average, more games makes you higher on the leaderboard...
                if (Number(a.average) === Number(b.average) && a.wins > 0) {
                    return (b.wins + b.losses) - (a.wins + a.losses);
                }

                // No wins, more games makes you lower on the leaderboard...
                if (0 === a.wins && 0 === b.wins) {
                    return (a.wins + a.losses) - (b.wins + b.losses);
                }

                // Non special case, higher average means higher on leaderboard...
                return Number(b.average) - Number(a.average);
            }
        )
;

export const getGeneralFacts = (results: GameResult[]): GeneralFacts => {

    if (results.length === 0) {
        return {
            lastPlayed: "n/a"
            , totalGames: 0
            , shortestGame: "n/a"
            , longestGame: "n/a"
        };
    }

    // Calcs for lastPlayed...
    const now = Date.now();

    const gameEndTimesInMilliseconds = results.map(
        x => now - Date.parse(x.end)
    );

    const lastPlayedInMilliseconds = Math.min(...gameEndTimesInMilliseconds);

    // console.log(
    //     gameEndTimesInMilliseconds
    // );

    // Calcs for shortest/longest...
    const gameDurationsInMilliseconds = results.map(
        x => Date.parse(x.end) - Date.parse(x.start)
    );

    return {
        lastPlayed: `${formatLastPlayed(lastPlayedInMilliseconds)} ago`
        , totalGames: results.length
        , shortestGame: formatGameDuration(Math.min(...gameDurationsInMilliseconds))
        , longestGame: formatGameDuration(Math.max(...gameDurationsInMilliseconds))
    };
};

export const getPreviousPlayers = (
    results: GameResult[]
) => {
    const allPlayersForAllGamesWithDupes = results.flatMap(
        x => x.players
    );

    return [
        ...new Set(allPlayersForAllGamesWithDupes)
    ].sort(
        (a, b) => a.localeCompare(b)
    );
};

export const getGoOutsPerGameLeaderboard = (
    results: GameResult[]
): GoOutsLeaderboardEntry[] => {
    const players = getPreviousPlayers(results);
    
    return players.map(player => {
        // Find games this player participated in
        const playerGames = results.filter(game => 
            game.players.includes(player)
        );
        
        // Count total go outs for this player
        const totalGoOuts = playerGames.reduce((count, game) => 
            count + game.goOuts.filter(name => name === player).length, 0
        );
        
        // Calculate go outs per game ratio
        const gamesPlayed = playerGames.length;
        const goOutsPerGame = gamesPlayed > 0 
            ? (totalGoOuts / gamesPlayed).toFixed(2) 
            : "0.00";
            
        return {
            player,
            totalGoOuts,
            gamesPlayed,
            goOutsPerGame
        };
    }).sort((a, b) => {
        // Sort by go outs per game (descending)
        const diff = Number(b.goOutsPerGame) - Number(a.goOutsPerGame);
        
        // If tied on ratio, sort by total go outs (descending)
        if (diff === 0) {
            return b.totalGoOuts - a.totalGoOuts;
        }
        
        return diff;
    });
};

//
// Helper functions...
//
const getLeaderboardEntry = (
    results: GameResult[]
    , player: string
): LeaderboardEntry => {

    const totalGamesForPlayer = results.filter(
        x => x.players.some(
            y => player === y
        )
    ).length;

    const wins = results.filter(
        x => x.winner === player 
    ).length;

    const avg = totalGamesForPlayer > 0
        ? wins / totalGamesForPlayer
        : 0
    ;

    return {
        wins: wins
        , losses: totalGamesForPlayer - wins
        , average: avg.toFixed(3)
        , player: player
    };
};
