import { useState } from 'react';
import './App.css'

function App() {

  const [countdownNumber, setCountdownNumber] = useState(59);

  return (
    <div
      className=''
    >
      <h1
        className='text-2xl font-bold text-secondary bg-base-300 p-4'
      >
        TCA Five Crowns
      </h1>
      <div
        className='p-4'
      >
        <button
          className='btn btn-secondary btn-soft btn-xl w-full sm:w-auto text-nowrap'
        >
          Play Five Crowns
        </button>
        <h2
          className='text-xl font-semi-bold mt-4'
        >
          Leaderboard
        </h2>
        <div
          className="card w-full bg-base-100 card-lg shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title">Leaderboard</h2>
            <p>
              Leadeboard goes here...
            </p>
          </div>
        </div>

        <div
          className="card w-full bg-base-100 card-lg shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title">Leaderboard</h2>
            <p>
              Leadeboard goes here...
            </p>
          </div>
        </div>


        <div
          className="card w-full bg-base-100 card-lg shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title">Leaderboard</h2>
            <p>
              Leadeboard goes here...
            </p>
          </div>
        </div>


        <div
          className="card w-full bg-base-100 card-lg shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title">Leaderboard</h2>
            <p>
              Leadeboard goes here...
            </p>
          </div>
        </div>


        <div
          className="card w-full bg-base-100 card-lg shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title">Leaderboard</h2>
            <p>
              Leadeboard goes here...
            </p>
          </div>
        </div>


        <div
          className="card w-full bg-base-100 card-lg shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title">Leaderboard</h2>
            <p>
              Leadeboard goes here...
            </p>
          </div>
        </div>


        <div
          className="card w-full bg-base-100 card-lg shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title">Leaderboard</h2>
            <p>
              Leadeboard goes here...
            </p>
          </div>
        </div>


        <div
          className="card w-full bg-base-100 card-lg shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title">Leaderboard</h2>
            {/* For TSX uncomment the commented types below */}
            <span 
              className="countdown font-mono text-6xl"
              onClick={() => setCountdownNumber(countdownNumber - 1)}
            >
              <span style={{ "--value": countdownNumber } as React.CSSProperties}>{countdownNumber}</span>
            </span>
          </div>
        </div>


        <div
          className="card w-full bg-base-100 card-lg shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title">Leaderboard</h2>
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-primary">What kind of nonsense is this</div>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-secondary">Put me on the Council and not make me a Master!??</div>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-accent">That's never been done in the history of the Jedi.</div>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-neutral">It's insulting!</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-success">You have been given a great honor.</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-warning">To be on the Council at your age.</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-error">It's never happened before.</div>
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

export default App
