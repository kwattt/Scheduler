import { useState, useContext } from "react"
import { DataContext } from "../../context/dataContext"
import { GeneracionContext } from "../../context/generacionContext"
import Opciones from "./Opciones"

import {cartesian} from './cartesian'

import './Generador.css'

const Generador = () => {
  const {horario} = useContext(DataContext)
  const {setOpciones, setSelected} = useContext(GeneracionContext)

  const [config, setConfig] = useState<configType>({
    maxHorarios: 100,
    conCupo: false,
    maxIterations: 1000000,
    maxDist: 2
  })

  const generador = () => {
    setOpciones([])
    setSelected(undefined)

    let posibles : any = []
    let iterations = 0;
    let mActivas = horario.materias.filter(m => m.activo === true)
    let mActivasClave = mActivas.map(m => {return m.clave})

    let secciones = []    
    for(let materia of mActivas) {
      if(!config.conCupo)
        secciones.push(materia.secciones.filter(m => (m.activo === true)))
      else 
        secciones.push(materia.secciones.filter(m => (m.activo === true && m.disponibles > 0)))
    }

    if(horario.materias.length === 0)
    {
      setOpciones([])
      setSelected(undefined)
      return
    }

    let allCombinations : Array<Seccion[]> = [] 
    for (let c of cartesian(...secciones)) {
      iterations++;
      allCombinations.push(c)
      if(iterations === config.maxIterations)
        break
    }

    let horario_count = 0
    for(let combination of allCombinations) {      
      let temp : any = {}
      let materias_inc : string[] = []

      for(let sec of combination){
        if(materias_inc.includes(sec.clave))
          continue

        for(let dia of sec.horas){ 
          let all_free = true
          for(let weekday of dia.dias){
            if(!temp.hasOwnProperty(weekday)){
              temp[weekday] = {}
            }
            for(let i = dia.entrada; i < dia.salida; i++){
              if(temp[weekday].hasOwnProperty(i))
                all_free = false 
            }
          }

          if(all_free){
            for(let weekday of dia.dias){
              for(let i = dia.entrada; i < dia.salida; i++){
                if(!temp[weekday].hasOwnProperty(i)){
                  temp[weekday][i] = sec.nrc
                  if(!materias_inc.includes(sec.clave))
                    materias_inc.push(sec.clave)
                }
              }
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

      let allowedDist = true

      if(allMaterias && config.maxDist > 0 ){
        for(const key in temp){
          if(!allowedDist)
            break 

          let first = true
          let firstHour = 0

          for(const val in temp[key]){
            if(first){
              firstHour = parseInt(val)
              first = false
              continue
            }
            
            if(parseInt(val)-firstHour > config.maxDist){
              allowedDist = false
              break
            }

            firstHour = parseInt(val)
          }
        }
      }

      if(allowedDist && allMaterias){
        posibles.push(temp)
        horario_count++
        if(horario_count >= config.maxHorarios)
          break
      }
    }

    setOpciones(posibles)
    if(posibles.length > 0)
      setSelected(posibles[0])
  }

  return <div
    id="generador"
  >

    <Opciones config={config} setConfig={setConfig}/>

    <button 
      children="Generar"
      onClick={()=> {generador()}}
    />

  </div>
}


export default Generador  