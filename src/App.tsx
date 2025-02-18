import './App.css';
import {
  HashRouter
  , Routes
  , Route
  , useNavigate
} from 'react-router';

const Home = () => {

  const nav = useNavigate();

  return (
    <div>
      <h3
        className='text-2xl font-bold'
      >
        Home
      </h3>
      <button 
        className="btn btn-outline btn-secondary mt-4"
        onClick={
          () => nav('/setup')
        }
      >
        Start a game of Five Crowns
      </button>
    </div>
  );
};

const Setup = () => {

  const nav = useNavigate();

  return (
    <div>
      <h3
        className='text-2xl font-bold'
      >
        Setup
      </h3>
      <button 
        className="btn btn-outline btn-secondary mt-4"
        onClick={
          () => nav('/play')
        }
      >
        Begin Your Game
      </button>
    </div>
  );
};

const Play = () => {

  const nav = useNavigate();

  return (
    <div>
      <h3
        className='text-2xl font-bold'
      >
        Play
      </h3>
      <button 
        className="btn btn-outline btn-secondary mt-4"
        onClick={
          () => nav(-2)
        }
      >
        Done Playing
      </button>
    </div>
  );
};


const App = () => {

  return (
    <div
      className='p-4'
    >
      <HashRouter>
        <Routes>
          <Route 
            path='/'
            element={
              <Home />
            }
          />
          <Route 
            path='/setup'
            element={
              <Setup />
            }
          />
                    <Route 
            path='/play'
            element={
              <Play />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
