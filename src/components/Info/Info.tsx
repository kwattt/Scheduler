import { useContext } from "react"
import { DataContext } from "../../context/dataContext"
import Materia from "./Materia"

import './Info.css'

const Info = () => {
  const {setHorario, horario} = useContext(DataContext)

  return <>
    <div
      className="materias-contenedor"
    >
        {horario.materias.map((materia, k) => {
          return <div
            className="materia-title"
            key={"mat" + k.toString()}
          >
            <Materia materia={materia} index={k}/>
          </div>
        })}

    </div>
  </>

}

export default Info