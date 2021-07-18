import { useContext } from "react"
import { GeneracionContext } from "../../context/generacionContext"

import './Grid.css'

const Grid = () => {
  const {selected, setSelected, opciones} = useContext(GeneracionContext)

  var grid : any = {
    "Horas": {},
    "Lunes" : {},
    "Martes": {},
    "Miercoles": {},
    "Jueves": {},
    "Viernes": {},
    "Sabado": {}
  }

  const selectedToGrid = () => {
    for(let key in grid){
      for(let i = 5; i <= 23; i++)
          grid[key][i] = "-"
    }
    if(typeof selected !== "undefined"){
      for(let key in selected){
        for(let val in selected[key]){
          grid[key][val] = selected[key][val]
        }
      }
    }
  }
  selectedToGrid()

  return <div
    id="grid"
  >
    {Object.keys(grid).map(v => {
      return <div className="grid-day">
        {v}

        <div
          className="grid-day-content"  
        >
          
          {v !== "Horas" ? Object.keys(grid[v]).map(v2 => {
            return <div>{grid[v][v2]}</div>
            })
            :
            Object.keys(grid[v]).map(v2 => {
              return <div>{v2}:00</div>
              })
          }

        </div>

      </div>
    })}
  </div>
}

export default Grid