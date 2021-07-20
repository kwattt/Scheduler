import { useContext } from "react"
import { DataContext } from "../../context/dataContext"
import Materia from "./Materia"

import './Info.css'

const Info = () => {
  const {horario} = useContext(DataContext)

  return <div
      id="materias-contenedor"
    >
      {horario.materias.map((materia, k) => {
        return <div 
          key={"mat" + k.toString()}>
          <Materia materia={materia} index={k}/>
        </div>
      })}

  </div>

} 

export default Info