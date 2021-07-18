type HorarioContext = {
  setHorario: (newData: Horario) => void,
  horario: Horario
} 

interface Horario {
  centros: Array<Centro>;
  ciclos: Array<Ciclo>;

  centro?: Centro;
  ciclo?: Ciclo;
  materias: Array<Materia>;
}

type Ciclo = Centro;

type Centro = {
  id: string;
  nombre: string;
}

type Materia = {
  activo: boolean;
  clave: string;
  nombre: string;
  secciones: Array<Seccion>;
}

type Seccion = {
  activo: boolean;
  clave: string,
  creditos: number,
  cupos: number,
  disponibles: number,
  horas: Array<Horas>,
  nombre: string, 
  nrc: string,
  profesor: string,
  seccion: string
}

type Horas = {
  aula: string,
  dias: Array<diaSemana>
  edificio: string,
  periodo: string,
  sesion: string,
  entrada: number,
  salida: number,
  final: string;
}

type configType = {
  maxHorarios : number,
  conCupo : boolean,
  maxIterations: number,
  maxDist: number
}


type diaSemana = 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado';