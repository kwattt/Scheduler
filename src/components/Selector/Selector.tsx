import { useContext } from "react"
import { DataContext } from "../../context/dataContext"
import SelectorMaterias from "./SelectorMaterias"
import "./Selector.css"

const Selector = () => {
  const {setHorario, horario} = useContext(DataContext)

  const setCentro = (value: number | undefined) => {
    let target : Centro | undefined = undefined
    
    if(value !== -1 && typeof value !== 'undefined'){
      target = horario.centros[value]
    }


    setHorario({...horario, 
      centro: target
    })
  }

  const setCiclo = (value: number | undefined) => {
    let target : Ciclo | undefined = undefined
    
    if(value !== -1 && typeof value !== 'undefined'){
      target = horario.ciclos[value]
    }

    setHorario({...horario, 
      ciclo: target
    })
  }

  return <div id="selector-mat">
    <div id="selector-centros">
      <label><b>Centros</b></label><br/>
      <select
        onChange={(v) => {setCentro(parseInt(v.target.value))}}
      >
        <option 
          value={-1}
        >
          Seleccionar
        </option>
        {
          horario.centros.map((centro, id) => {
            return <option 
              key={centro.id}
              value={id}
              >
                {centro.nombre}
              </option>
          })
        }
      </select>
    </div>  
    <div id="selector-ciclos">
      <label><b>Ciclos</b></label><br/>
      <select
        onChange={(v) => {setCiclo(parseInt(v.target.value))}}
      >
        <option 
          value={-1}
        >
          Seleccionar
        </option>
        {
          horario.ciclos.map((ciclo, id) => {
            return <option 
              key={ciclo.id}
              value={id}
              >
                {ciclo.nombre}
              </option>
          })
        }
      </select>
    </div>  
    <SelectorMaterias/>

  </div>

}

export default Selector