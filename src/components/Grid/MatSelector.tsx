import { useContext } from "react"
import { GeneracionContext } from "../../context/generacionContext"

import './MatSelector.css'

const MatSelector = () => {
  const {opciones, setSelected} = useContext(GeneracionContext)

  const setCurrent = (index : number) => {
    setSelected(opciones[index])
  } 

  return <>
    <div
      id="selector"
    >
      <select 
        size={2}
        onChange={(v)=>{setCurrent(parseInt(v.target.value)-1)}}
      >
        {opciones.map((v:any, k:number) => {
          return <option key={'sopt'+k} value={k+1}>{k+1}</option>
        })}
      </select>
    </div>
  </>
}

export default MatSelector