
type opcionesType = {
  config: configType
  setConfig: (v : any) => void
}
 
const Opciones = ({config, setConfig} : opcionesType) => {
  return <div id="opciones">
      <h4>Opciones</h4>

      <div
        className="opciones-config"
      >
        <label>Max Horarios</label><br/>
        <input 
          onChange={(v) => {setConfig({...config, maxHorarios: parseInt(v.target.value)})}}
          type="number"
          value={config.maxHorarios}
        />
      </div>

      <div
        className="opciones-config"
      >
        <label>Max Iteraciones</label><br/>
        <input 
          onChange={(v) => {setConfig({...config, maxIterations: parseInt(v.target.value)})}}
          type="number"
          value={config.maxIterations}
        />
      </div>

      <div
        className="opciones-config"
      >
        <label>Horas muertas</label><br/>
        <input 
          onChange={(v) => {setConfig({...config, maxDist: parseInt(v.target.value)})}}
          type="number"
          value={config.maxDist}
        />
      </div>

      <div
        className={"opciones-config"}
      >
        <label>Con cupo</label><br/>
        <button
                children={config.conCupo ? "SI" : "NO"}
                value={+config.conCupo} 
                onClick={() => {setConfig({...config, conCupo: !config.conCupo})}}
              />
      </div>


  </div>
}

export default Opciones