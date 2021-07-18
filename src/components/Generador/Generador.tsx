import { useState, useContext } from "react"
import { DataContext } from "../../context/dataContext"
import { GeneracionContext } from "../../context/generacionContext"
import Opciones from "./Opciones"

import {cartesian} from './cartesian'

const Generador = () => {
  const {horario} = useContext(DataContext)
  const {setOpciones, opciones} = useContext(GeneracionContext)

  const [config, setConfig] = useState<configType>({
    maxHorarios: 100,
    entreHoras: 5,
    conCupo: true,
    maxIterations: 500000
  })


  const generador = () => {

    let posibles : any = []
    let mActivas = horario.materias.filter(m => m.activo === true)
    let mActivasClave = mActivas.map(m => {return m.clave})

    let secciones = []    
    for(let materia of mActivas) {
      if(!opciones.conCupo)
        secciones.push(materia.secciones.filter(m => (m.activo === true)))
      else 
        secciones.push(materia.secciones.filter(m => (m.activo === true && m.disponibles > 0)))
    }

    let allCombinations : Array<Seccion[]> = [] 
    for (let c of cartesian(...secciones)) {
      allCombinations.push(c)
    }

    for(let combination of allCombinations) {      
      let temp : any = {}
      let materias_inc : string[] = []

      for(let sec of combination){
        for(let dia of sec.horas){
          for(let weekday of dia.dias){
            if(!temp.hasOwnProperty(weekday)){
              temp[weekday] = {}
            }
            for(let i = dia.entrada; i < dia.salida; i++){
              if(!temp[weekday].hasOwnProperty(i)){
                temp[weekday][i] = sec.nrc
                if(!materias_inc.includes(sec.clave))
                  materias_inc.push(sec.clave)
              }
              else 
                break
            }
          }
        }
      }

      let allMaterias = true 
      for(let activa of mActivasClave){
        if(!materias_inc.includes(activa)){
          allMaterias = false
          break
        }
      }

      if(allMaterias)
        posibles.push(temp)
    }

    console.log(posibles)
  }

  return <div
    id="generador"
  >

    <Opciones config={config}/>

    <button 
      children="Generar"
      onClick={()=> {generador()}}
    />

  </div>
}


export default Generador  