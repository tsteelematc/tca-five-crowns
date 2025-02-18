import './App.css';
import {
  HashRouter
  , Routes
  , Route
} from 'react-router';

const Home = () => {
  return (
    <div>
      <h3
        className='text-2xl font-bold'
      >
        Home
      </h3>
    </div>
  );
};

const Setup = () => {
  return (
    <div>
      <h3
        className='text-2xl font-bold'
      >
        Setup
      </h3>
    </div>
  );
};

const Play = () => {
  return (
    <div>
      <h3
        className='text-2xl font-bold'
      >
        Play
      </h3>
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
