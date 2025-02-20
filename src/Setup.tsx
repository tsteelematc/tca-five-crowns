import { useNavigate } from "react-router";

export const Setup = () => {

    const foobarcat = useNavigate();

    return (
        <>
            <h3
                className='text-2xl font-bold'
            >
                Setup
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