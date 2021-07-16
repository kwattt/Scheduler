import axios from 'axios'
import { useEffect, useState } from 'react';
import Selector from './Selector/Selector';

const Fechas = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

const Main = () => {
  return <>

    <h2>Maker</h2>

    <Selector/>

  </>

}

export default Main
