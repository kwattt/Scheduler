import { useEffect, useRef } from "react"
import { useContext, useState } from "react"
import { GeneracionContext } from "../../context/generacionContext"

import './MatSelector.css'

const MatSelector = () => {
  const {opciones, setSelected, selected} = useContext(GeneracionContext)
  const [cvalue, setCvalue] = useState(0)
  const selectedR = useRef<HTMLInputElement>(null)
  const selectorR = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    if(opciones.length>0 && selected !== opciones[cvalue]){
      setSelected(opciones[cvalue])
    }
  }, [cvalue, opciones, setSelected, selected])

  useEffect(() => {
    if (selectedR.current !== null && selectorR.current !== null){
      let screenoffset = (selectedR.current.offsetWidth*25)/selectorR.current.offsetWidth
      let offset = selectedR.current.offsetLeft-(selectorR.current.offsetWidth*screenoffset)
      selectorR.current.scrollTo(offset, 0)
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

  return <div 
  id="selector-outer"
  style={{
    visibility: opciones.length>0 ? 'visible' : 'hidden'
  }}
  >
    <label><b>Generados</b></label><br/>
    <div
      id="selector"
    >
      <button
        className="btn-move"
        onClick={()=>{btnMove(-1)}}
      >
        {"<"}
      </button>
      
      <div 
        id="selector-in"
        ref={selectorR}
      >
        <ul>
          {opciones.map((v:any, k:number) => {
            return <li
              key={"stid"+k}
            >
              <input
                type="radio" 
                key={'sopt'+k} 
                value={k}
                name="select"
                id={"sel_"+k}
                checked={cvalue===k}
                ref={cvalue===k?selectedR:null}
                onChange={(v) => {setCurrent(parseInt(v.target.value))}}
              />
              <label
                htmlFor={"sel_"+k}
              >{k+1}</label>
            </li>
          })}
        </ul>

      </div>
      <button
        className="btn-move"
        onClick={()=>{btnMove(+1)}}
      >
        {">"}
      </button>

    </div>
  </div>
}

export default MatSelector