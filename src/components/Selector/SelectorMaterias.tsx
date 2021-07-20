import axios from "axios"
import { useContext, useState } from "react"
import { DataContext } from "../../context/dataContext"
import { GeneracionContext } from "../../context/generacionContext"

const base_url = process.env.REACT_APP_BASE_URL

const SelectorMaterias = () => {
  const {setHorario, horario} = useContext(DataContext)
  const [materias, setMaterias] = useState<String[]>([])
  const {setSelected, setOpciones} = useContext(GeneracionContext)

  const [currentAdd, setCurrentAdd] = useState<string>("")

  const updateHorarioData = () => {

    if(typeof horario.centro === "undefined" || typeof horario.ciclo === "undefined" || materias.length === 0)
      return



    setCurrentAdd("")
    setSelected(undefined)
    setOpciones([])

    axios.post(base_url + '/getData', 
      {
        info: {
          materias: materias,
          centro: horario.centro.id,
          ciclo: horario.ciclo.id,
        }
      }
    ).then(data => {
      setHorario({...horario, materias: data.data})
    }).catch(error => {
      console.log(error)
    })
  }

  return <div id="selector-materias">

    <label><b>Nueva materia</b></label><br/>

    <input 
      className="materia-input"
      type="text" 
      placeholder="Clave de la materia"
      maxLength={10}
      value={currentAdd}
      onChange={(e)=>{setCurrentAdd(e.target.value)}}
    /> 

    <br/>
    <button 
      children="Añadir"
      onClick={()=>{
        setMaterias([...materias, currentAdd])
        setCurrentAdd("")
      }}
    />
    <br/>

    <div
      id="materias-container"
    >
    {
      materias.map((materia, k) => {
        return <div 
          key={k}
          className="materia-search"
        >
          <button children={materia} disabled/>
          <button children="x"
            onClick={()=>{
              setMaterias(materias.filter(e => e !== materia))
            }}
          />
        </div>
      })
    }
    </div>

    <div 
      id="query-materias"
    >
      <button
        onClick={()=>{
          updateHorarioData()
        }}
        children="Buscar"
      />
    </div>
  </div>

}

export default SelectorMaterias