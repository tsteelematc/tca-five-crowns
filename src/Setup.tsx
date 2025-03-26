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

    //
    // Hooks, state, effects, blah, blah, blah...
    //

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

    //
    // Other calcs, funcs, derived state, blah, blah, blah...
    //
    const numberOfChosenPlayers = availablePlayers.filter(x => x.checked).length;
    const twoToSevenPlayersChosen = numberOfChosenPlayers >= 2
        && numberOfChosenPlayers <= 7
    ;

    const validateAndAddNewPlayer = () => {

        if (
            newPlayerName.length === 0
                || availablePlayers.some(
                    x => x.name.toUpperCase() === newPlayerName.toUpperCase()
                )
        ) {
            // Do nothing for now, could add some visual validation, blah, blah, blah...
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

    return (
        <>
            <button
                className="btn btn-active btn-secondary btn-lg mt-4 w-full lg:w-64"
                onClick={
                    () => {
                        setCurrentPlayers(
                            availablePlayers
                                .filter(
                                    x => x.checked
                                )
                                .map(
                                    x => (
                                        x.name
                                    )
                                )
                        );
                        nav('/play');
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
            <div
                className="mt-4 flex w-full"
            >
                <input
                    type="text"
                    placeholder="Enter new player name..."
                    className="input"
                    value={newPlayerName}
                    onChange={
                        (e) => setNewPlayerName(
                            e.target.value
                        )
                    }
                />
                <button
                    className="btn btn-outline btn-neutral ml-2"
                    onClick={
                        validateAndAddNewPlayer
                    }
                >
                    Add
                </button>
            </div>
            <div
                className="mt-4"
            >
                {
                    availablePlayers.map(
                        x => (
                            <label
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
                                                    , checked: y.name === x.name
                                                        ? !y.checked
                                                        : y.checked
                                                })
                                            )
                                        )
                                    }
                                />
                                {x.name}
                            </label>
                        )
                    )
                }
            </div>
        </>
    );
};