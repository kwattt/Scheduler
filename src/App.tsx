import DataProvider from "./context/dataContext";
import Main from './components/Main'
import GeneracionProvider from "./context/generacionContext";


const App = () => {

  return <>
    <DataProvider>

      <GeneracionProvider>
        <Main/>
      </GeneracionProvider>

    </DataProvider>
  </>
}

export default App;