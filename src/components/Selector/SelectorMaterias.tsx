import axios from "axios"
import { useContext, useState } from "react"
import { DataContext } from "../../context/dataContext"

const base_url = process.env.REACT_APP_BASE_URL

const SelectorMaterias = () => {
  const {setHorario, horario} = useContext(DataContext)
  const [materias, setMaterias] = useState<String[]>([])

  const [currentAdd, setCurrentAdd] = useState<string>("")


  const updateHorarioData = () => {

    if(typeof horario.centro == "undefined" || typeof horario.ciclo == "undefined")
      return

    setMaterias([])
    setCurrentAdd("")

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

  return <>

    {
      materias.map((materia, k) => {
        return <div 
          key={k}
          className="materia-search"
        >
          <button children={materia}/>
          <button children="x"
            onClick={()=>{
              setMaterias(materias.filter(e => e !== materia))
            }}
          />
        </div>
      })
    }

    Nueva materia: <input 
      className="materia-input"
      type="text" 
      placeholder="materia"
      maxLength={10}
      value={currentAdd}
      onChange={(e)=>{setCurrentAdd(e.target.value)}}
    /> 

    <button 
      children="Añadir"
      onClick={()=>{
        setMaterias([...materias, currentAdd])
        setCurrentAdd("")
      }}
    />

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
  </>

}

export default SelectorMaterias