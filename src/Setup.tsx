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

    const foobarcat = useNavigate();

    const [availablePlayers, setAvailablePlayers] = useState(
        previousPlayers.map(
            x => ({
                name: x 
                , checked: false
            })
        )
    );

    const checkedPlayerCount = availablePlayers.filter(x => x.checked).length;
    
    const twoToSevenPlayersChosen = 
            // Note, there is a solo mode, but the app doesn't support any fun
            // facts for the solo mode...
            checkedPlayerCount >= 2 
                && checkedPlayerCount <= 7
    ;

    return (
        <>
            <button
                className="btn btn-active btn-secondary btn-lg mt-4 w-full lg:w-64 text-nowrap truncate"
                onClick={
                    () => {
                        setCurrentPlayers(
                            availablePlayers
                                .filter(
                                    x => x.checked
                                )
                                .map(
                                    x => x.name
                                )
                        );
                        foobarcat('/play');
                    }
                }
                disabled={!twoToSevenPlayersChosen}
            >
                { 
                    twoToSevenPlayersChosen
                        ? "Start Playing"
                        : "Choose 2-7 Players"
                }
            </button>
            <div className="mt-4">
                {
                    availablePlayers.map(
                        x => (
                            <label
                                key={x.name}
                                className="block mt-2"
                            >
                                <input 
                                    type="checkbox" 
                                    className="checkbox mr-2"
                                    checked={x.checked}
                                    onChange={
                                        () => setAvailablePlayers(
                                            availablePlayers.map(
                                                y => ({
                                                    name: y.name 
                                                    , checked: x.name === y.name
                                                        ? !y.checked 
                                                        : y.checked
                                                })
                                            )
                                        )
                                    }
                                />
                                { x.name }
                          </label>
                        )
                    )
                }
            </div>
      </>
    );
};