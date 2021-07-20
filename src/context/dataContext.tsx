import axios from "axios";
import {createContext, useState, useEffect, FC, useContext} from "react";
import { GeneracionContext } from "./generacionContext";

const base_url = process.env.REACT_APP_BASE_URL

const defaultContext : HorarioContext = {
  setHorario: (newData : Horario) => {},
  horario: {
    centros: [],
    materias: [],
    ciclos: []
  },
  nrcInfo: {}
}
const randColor = () => {return Math.floor(Math.random()*16777215).toString(16)}

export const DataContext = createContext(defaultContext)

const DataProvider : FC = ({children}) => {
  const [horario, setData] = useState<Horario>(defaultContext.horario)
  const [nrcInfo, setNrcInfo] = useState<any>({})
  const {setSelected} = useContext(GeneracionContext)

  useEffect(() => {
    let _mounted = true 

    const fetchData = async() => {
      axios.get(base_url + "/getInfo").then((data) => {

        setData(oldState => ({...oldState,
          centros: data.data.planteles,
          ciclos: data.data.ciclos
        }))

      }).catch((err) => {
        console.log(err)
      })
      .catch((err) => {
        if(_mounted){
          console.log(err)
        }
      })
    }
    fetchData()

    return () => {
      _mounted = false
    }
  }, [])

  const setHorario = (newData : Horario) => {
    setData(newData)

    let temp:any = {}
    if(newData.materias.length > 0){
      for(let materia of newData.materias){
        let matColor = randColor()
        for(let seccion of materia.secciones){
          temp[seccion.nrc] = {
            "clave": seccion.clave,
            "nombre": seccion.nombre,
            "profesor": seccion.profesor,
            "color": '#' +matColor,
          }
        }
      }
      setSelected(undefined)

      setNrcInfo(temp)
    }

  }

  return <DataContext.Provider  
    value={{
      setHorario,
      horario,
      nrcInfo
    }}
  >
    {children}
  </DataContext.Provider>
}

export default DataProvider