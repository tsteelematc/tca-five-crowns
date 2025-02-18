import './App.css'

// const App = (
//   // props: any
//   {
//     timestamp 
//     , magicNumber
//   }
// ) => {

interface AppProps {
  timestamp: string;
  magicNumber: number;
}

const App: React.FC<AppProps> = (
  // props: any
  {
    timestamp 
    , magicNumber
  }
) => {

  // console.log(
  //   typeof(props)
  //   , props
  // );

  return (
    <div>
      <h1
        className='text-2xl font-bold'
      >
        TCA Five Crowns
      </h1>     
      <p>
        {timestamp} - {magicNumber}
      </p> 
      <button
        className='btn btn-secondary btn-soft btn-xl'
      >
        Play Five Crowns
      </button>
    </div>
  )
}

export default App
