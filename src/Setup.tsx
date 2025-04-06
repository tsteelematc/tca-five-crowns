import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface SetupProps {
    setTitle: (t: string) => void;
    previousPlayers: string[];
    setCurrentPlayers: (players: string[]) => void;
};

export const Setup: React.FC<SetupProps> = ({
    setTitle
    , previousPlayers
    , setCurrentPlayers
}) => {

    useEffect(
        () => setTitle("Setup")
        , []
    );

    const nav = useNavigate();

    const [availablePlayers, setAvailablePlayers] = useState(
        previousPlayers.map(
            x => ({
                name: x 
                , checked: false
            })
        )
    );

    const [newPlayerName, setNewPlayerName] = useState("");

    const numberOfChosenPlayers = availablePlayers.filter(x => x.checked).length;
    const twoToSevenPlayersChosen = numberOfChosenPlayers >= 2 && numberOfChosenPlayers <= 7;

    const duplicatePlayerName = availablePlayers.some(
        x => x.name.toUpperCase() === newPlayerName.toUpperCase()
    );

    const validateAndAddNewPlayer = () => {
        // Bail if invalid...
        if (
            newPlayerName.length === 0
                || duplicatePlayerName
        ) {
            return;
        }

        setAvailablePlayers(
            [
                ...availablePlayers
                , {
                    name: newPlayerName
                    , checked: true
                }
            ].sort(
                (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())
            )
        );

        setNewPlayerName("");
    };
    
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            validateAndAddNewPlayer();
        }
    };

    return (
        <>
            <div className="hero bg-base-200 rounded-lg p-4 mb-8">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-3xl font-bold text-secondary">Game Setup</h1>
                        <p className="py-2 text-base-content/70">Select 2-7 players for your game</p>
                        
                        <div className="mt-4 flex flex-col md:flex-row gap-2">
                            <input 
                                type="text" 
                                placeholder="Enter new player name..." 
                                className={`input input-bordered w-full ${duplicatePlayerName ? "input-error" : ""}`} 
                                value={newPlayerName}
                                onChange={(e) => setNewPlayerName(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                            <button 
                                className="btn btn-secondary"
                                onClick={validateAndAddNewPlayer}
                                disabled={newPlayerName.length === 0 || duplicatePlayerName}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>
                                Add Player
                            </button>
                        </div>
                        
                        {duplicatePlayerName && (
                            <div className="alert alert-error mt-2 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Player name already exists!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl border-t-4 border-primary">
                <div className="card-body">
                    <h2 className="card-title text-primary flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                        Select Players ({numberOfChosenPlayers} selected)
                    </h2>
                    
                    <div className="divider my-1"></div>
                    
                    {availablePlayers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                            {availablePlayers.map(x => (
                                <div 
                                    key={x.name} 
                                    className={`flex items-center p-3 rounded-lg transition-colors ${x.checked ? 'bg-primary/10 border border-primary/30' : 'bg-base-200 hover:bg-base-300'}`}
                                >
                                    <input 
                                        type="checkbox"
                                        className="checkbox checkbox-primary mr-3"
                                        checked={x.checked} 
                                        onChange={() => setAvailablePlayers(
                                            availablePlayers.map(
                                                y => ({
                                                    name: y.name,
                                                    checked: y.name === x.name 
                                                        ? !y.checked
                                                        : y.checked
                                                })
                                            )
                                        )}
                                    />
                                    <span className={`${x.checked ? 'font-medium' : ''}`}>{x.name}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Add some players to get started!</span>
                        </div>
                    )}
                    
                    <div className="card-actions justify-center mt-4">
                        <button
                            className="btn btn-primary btn-lg gap-2 w-full md:w-auto"
                            onClick={() => {
                                setCurrentPlayers(
                                    availablePlayers
                                        .filter(x => x.checked)
                                        .map(x => x.name)
                                );
                                nav('/play');
                            }}
                            disabled={!twoToSevenPlayersChosen}
                        >
                            {twoToSevenPlayersChosen ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                    </svg>
                                    Start Game with {numberOfChosenPlayers} Players
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                    </svg>
                                    Select 2-7 Players
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 text-center">
                <button
                    className="btn btn-outline btn-sm"
                    onClick={() => nav('/')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Back to Home
                </button>
            </div>
        </>
    );
};