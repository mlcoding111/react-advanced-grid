import './App.css'
import Grid from './components/Grid/Grid';
import { GridProvider } from './context/GridContext';
function App() {

  return (
    <>
      <main className='flex flex-col space-y-4 items-center justify-center'>
        <h1 className='text-5xl text-slate-700 font-bold'>React Grid</h1>
        <div className="flex justify-center items-center w-full">
          <GridProvider>
            <Grid />
          </GridProvider>
        </div>
      </main>
    </>
  )
}

export default App
