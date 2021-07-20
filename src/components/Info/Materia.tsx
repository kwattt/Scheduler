import { useContext, useState } from "react"
import { DataContext } from "../../context/dataContext"

type MateriaType = { 
  materia: Materia
  index: number
}

const Materia = ({materia, index} : MateriaType) => {
  const [visible, setVisible] = useState(true)

  const {horario, setHorario} = useContext(DataContext)
  const toggleNrc = (nrcIndex : number) => {
    var tempMaterias = horario.materias
    tempMaterias[index].secciones[nrcIndex].activo = !tempMaterias[index].secciones[nrcIndex].activo
    setHorario({...horario, 
      materias: tempMaterias
    })
  }

  return <div className="materia-info">
      <h3
        onClick={()=>{setVisible(!visible)}}
      >
        {materia.nombre}
      </h3>

    {materia.activo === true && visible &&
    <div className="materia-table-container">
    <table className="NRCS">
        <thead>
          <tr>
            <td>NRC</td>
            <td>Seccion</td>
            <td>Maestr@</td>
            <td>Horario</td>
            <td>Cupos</td>
            <td>Cupo disp.</td>
            <td>Creditos</td>
            <td>Buscar</td>
          </tr>
        </thead>
        
        <tbody>
        {materia.secciones.map((seccion, k) => {
          return <tr
            key={"sect"+seccion.nrc}
          >
            <td>{seccion.nrc}</td>
            <td>{seccion.seccion}</td>
            <td>{seccion.profesor}</td>
            
            <td
                className="seccion-horario"
              >
              <table
              >
                <tbody>
                {seccion.horas.map((hora, k) => {
                  return <tr
                    key={"nrch-"+k}
                  >
                    <td>{hora.dias.join(', ')}</td>
                    <td>{hora.entrada}</td>
                    <td>{hora.salida}</td>
                  </tr>
                })}
                </tbody>
              </table>

            </td>

            <td>{seccion.cupos}</td>
            <td>{seccion.disponibles}</td>
            <td>{seccion.creditos}</td>
            <td
                className={seccion.activo ? "btn-active" : "btn-inactive"}
              >
              <input
                className="sect-activo"
                type="checkbox"
                defaultChecked={seccion.activo}
                value={+seccion.activo} 
                onChange={() => {toggleNrc(k)}}
              />
            </td>
          </tr>
        })}
        </tbody>
      </table>
      </div>
    }

  </div>
}

export default Materia