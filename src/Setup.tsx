import { useNavigate } from "react-router";

interface SetupProps {
    totalGameCount: number;
};

export const Setup: React.FC<SetupProps> = ({
    totalGameCount: gamesPlayed
}) => {

    const foobarcat = useNavigate();

    return (
        <>
            <h3
                className='text-2xl font-bold'
            >
                Setup ({gamesPlayed} games played)
            </h3>
            <button
                className="btn btn-active btn-secondary btn-lg mt-4"
                onClick={
                    () => foobarcat('/play')
                }
            >
                Start Playing
            </button>
        </>
    );
};