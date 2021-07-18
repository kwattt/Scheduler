import { useContext } from "react"
import { DataContext } from "../../context/dataContext"
import SelectorMaterias from "./SelectorMaterias"

import "./Selector.css"

const Selector = () => {
  const {setHorario, horario} = useContext(DataContext)

  const setCentro = (value: Centro | undefined) => {
    setHorario({...horario, 
      centro: value
    })
  }

  const setCiclo = (value: Centro | undefined) => {
    setHorario({...horario, 
      ciclo: value
    })
  }

  return <div id="Selector">
    <div>
      Centros
      <select>
        <option 
          value="" 
          onClick={()=>{setCentro(undefined)}}>
            Seleccionar
          </option>
        
        {
          horario.centros.map(centro => {
            return <option 
              key={centro.id}
              onClick={()=>{setCentro(centro)}}
              >
                {centro.nombre}
              </option>
          })
        }
      </select>
    </div>  
    <div>
      Ciclo
      <select>
        <option 
          value=""
          onClick={()=>{setCiclo(undefined)}}
        >
          Seleccionar
        </option>
        {
          horario.ciclos.map(ciclo => {
            return <option 
              key={ciclo.id}
              onClick={()=>{setCiclo(ciclo)}}
              >
                {ciclo.nombre}
              </option>
          })
        }
      </select>
    </div>  
    <div id="selector-materias">
      <SelectorMaterias/>
    </div>


  </div>

}

export default Selector