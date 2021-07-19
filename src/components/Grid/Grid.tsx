import { useContext } from "react"
import { GeneracionContext } from "../../context/generacionContext"
import MatSelector from './MatSelector'

import './Grid.css'
import { DataContext } from "../../context/dataContext"

const Grid = () => {
  const {selected} = useContext(GeneracionContext)
  const {nrcInfo} = useContext(DataContext)

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
          grid[key][i] = "_"
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

  return <>
  <MatSelector/>

  <div
    id="grid"
  >

    {Object.keys(grid).map(v => {
      return <div className="grid-day">
        {v}

        <div
          className="grid-day-content"  
        >
          
          {v !== "Horas" ? Object.keys(grid[v]).map(v2 => {
            if(grid[v][v2] === "_")
              return <div>-</div>
            return <div
              style={{
                backgroundColor: nrcInfo[grid[v][v2]]['color']
              }}
            >
              {grid[v][v2]}
            </div>
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
  </>
}

export default Grid