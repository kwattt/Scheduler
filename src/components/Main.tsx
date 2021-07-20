import Generador from './Generador/Generador';
import Info from './Info/Info';
import Selector from './Selector/Selector';
import Grid from './Grid/Grid';

import './Main.css'
import './Nav.css'

const Main = () => {
  return <div id="main">

    <div id="nav">
      <h1>Scheluder</h1>
    </div>
    <div id="content">
      <Selector/>
      <Info/>
      <Generador/>
      <Grid/>
    </div>

  </div>
}

export default Main
