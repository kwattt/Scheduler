import DataProvider from "./context/dataContext";
import Main from './components/Main'


const App = () => {

  return <>
    <DataProvider>

      <Main/>

    </DataProvider>
  </>
}

export default App;