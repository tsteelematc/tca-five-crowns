import './App.css'
import {
  HashRouter
  , Routes 
  , Route
} from 'react-router';
import { AppTitle, Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { useState } from 'react';
import { GameResult, getLeaderboard } from './GameResults';

const dummyGameResults: GameResult[] = [
  {
      winner: "Hermione"
      , players: [
          "Hermione"
          , "Harry"
          , "Ron"
      ]      
  }
  , {
      winner: "Ron"
      , players: [
          "Hermione"
          , "Ron"
      ]
  }
  , {
      winner: "Larry"
      , players: [
          "Larry"
          , "Curly"
          , "Moe"
      ]
  }
  , {
      winner: "Harry"
      , players: [
          "Curly"
          , "Harry"
      ]
  }
  , {
      winner: "Ron"
      , players: [
          "Ron"
          , "Voldemort"
      ]
  }
  , {
      winner: "Voldemort"
      , players: [
          "Ron"
          , "Voldemort"
      ]
  }
];

const App = () => {

  console.log(
    "App Component Func Called ! ! !"
  );

  //
  // Hooks...
  //
  const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const [title, setTitle] = useState(AppTitle);

  //
  // Other code (not hooks)...
  //
  const addNewGameResult = (newGameResult: GameResult) => setGameResults(
    [
      ...gameResults
      , newGameResult
    ]
  );

  return (
    <div
      className='p-0'
    >
      <nav className="navbar bg-base-200 shadow-lg">
        <h1
          className='text-xl font-bold'
        >
          {title}
        </h1>
      </nav>
      <div 
        className="p-4"
      >
        <HashRouter>
          <Routes>
            <Route
              path='/'
              element={
                <Home
                  leaderboardData={
                    getLeaderboard(gameResults)
                  }
                  setTitle={setTitle}
                />
              } 
            />
            <Route
              path='/setup'
              element={
                <Setup 
                  setTitle={setTitle}
                />
              } 
            />
            <Route
              path='/play'
              element={
                <Play 
                  addNewGameResult={addNewGameResult}
                  setTitle={setTitle}
                />
              } 
            />
          </Routes>
        </HashRouter>
      </div>
    </div>
  )
}

export default App
