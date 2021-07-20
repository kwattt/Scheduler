import { useEffect } from "react"
import { useContext, useState } from "react"
import { GeneracionContext } from "../../context/generacionContext"

import './MatSelector.css'

const MatSelector = () => {
  const {opciones, setSelected} = useContext(GeneracionContext)
  const [cvalue, setCvalue] = useState(0)

  useEffect(()=>{
    if(opciones.length>0){
      setSelected(opciones[cvalue])
    }
  }, [cvalue])

  const btnMove = (val : number) => {
    if(cvalue+val<0)
      setCvalue(opciones.length-1)
    else if(cvalue+val === opciones.length)
      setCvalue(0)
    else 
      setCvalue(cvalue+val)
  }

  const setCurrent = (index : number) => {
    setCvalue(index)
  } 

  return <>
    <div
      id="selector"
      style={{
        visibility: opciones.length>0 ? 'visible' : 'hidden'
      }}
    >
      <button
        className="btn-move"
        onClick={()=>{btnMove(-1)}}
      >
        {"<"}
      </button>
      
      <ul>
        {opciones.map((v:any, k:number) => {
          return <li>
            <input
              type="radio" 
              key={'sopt'+k} 
              value={k}
              name="select"
              id={"sel_"+k}
              checked={cvalue===k}
              onChange={(v) => {setCurrent(parseInt(v.target.value))}}
            />
            <label
              htmlFor={"sel_"+k}
            >{k+1}</label>
          </li>
        })}
      </ul>

      <button
        className="btn-move"
        onClick={()=>{btnMove(+1)}}
      >
        {">"}
      </button>

    </div>
  </>
}

export default MatSelector