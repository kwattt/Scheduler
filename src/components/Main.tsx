import Generador from './Generador/Generador';
import Info from './Info/Info';
import Selector from './Selector/Selector';
import Grid from './Grid/Grid';

const Fechas = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

const Main = () => {
  return <>
    <h2>Maker</h2>
    <Selector/>
    <Info/>
    <Generador/>
    <Grid/>
  </>

}

export default Main
