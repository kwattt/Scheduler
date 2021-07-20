import Generador from './Generador/Generador';
import Info from './Info/Info';
import Selector from './Selector/Selector';
import Grid from './Grid/Grid';

import './Main.css'
import './Nav.css'

import githubLogo from './../static/github-icon.svg'

const Main = () => {
  return <div id="main">

    <div id="nav">
      <h1>Scheduler</h1>
    </div>

    <div id="content">
      <Selector/>
      <Info/>
      <Generador/>
      <Grid/>
    </div>

    <div id="footer">
      <p>Source code <a href="https://github.com/kwattt/Scheduler"><img alt="github mark" src={githubLogo} height="20px"/>Github</a></p>
    </div>

  </div>
}

export default Main
