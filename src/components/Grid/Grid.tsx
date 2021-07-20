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
      return <div 
        key={'gridv'+v} 
        className="grid-day"
      >
        {v}
        <div
          className="grid-day-content"  
        >
          
          {v !== "Horas" ? Object.keys(grid[v]).map((v2, k) => {
            if(grid[v][v2] === "_")
              return <div
              key={"hour"+k}
            >
              -
            </div>
            return <div
              key={"hour"+k}
              style={{
                backgroundColor: nrcInfo[grid[v][v2]]['color'] + 'A0'
              }}
            >
              {grid[v][v2]}
            </div>
            })
            :
            Object.keys(grid[v]).map(v2 => {
              return <div
                key={"time"+v2}
              >{v2}:00</div>
              })
          }

        </div>

      </div>
    })}
  </div>
  </>
}

export default Grid