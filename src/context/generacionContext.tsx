import {createContext, useState, FC} from "react";

// faltan types

type generacionType = {
  setOpciones : any,
  setSelected: any,
  opciones: any,
  selected: any
}

const defaultContext : generacionType = {
  setOpciones: (newData : any) => {},
  opciones: [],
  setSelected: (sel : any) => {},
  selected: {}
}

export const GeneracionContext = createContext(defaultContext)

const OpcionesProvider : FC = ({children}) => {
  const [data, setData] = useState<any>({
    opciones: defaultContext.opciones,
    selected: defaultContext.selected 
  })

  const setOpciones = (newData : any) => {
    setData((oldData : any) => ({...oldData, opciones: newData}))
  }

  const setSelected = (newData : any) => {
    setData((oldData : any) => ({...oldData, selected: newData}))
  }
  
  const opciones = data.opciones
  const selected = data.selected

  return <GeneracionContext.Provider  
    value={{
      setOpciones,
      setSelected,
      opciones,
      selected
    }}
  >
    {children}
  </GeneracionContext.Provider>
}

export default OpcionesProvider