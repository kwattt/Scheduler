import { useContext } from "react"
import { DataContext } from "../../context/dataContext"
import SelectorMaterias from "./SelectorMaterias"

import "./Selector.css"

const Selector = () => {
  const {setHorario, horario} = useContext(DataContext)

  const setCentro = (value: Centro) => {
    setHorario({...horario, 
      centro: value
    })
  }

  const setCiclo = (value: Ciclo) => {
    setHorario({...horario, 
      ciclo: value
    })
  }

  return <div id="Selector">
    <div>
      Centros
      <select>
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

    <div>
        {horario.materias.map(materia => {
          return <div>{materia.nombre}</div>
        })}

    </div>
  </div>

}

export default Selector