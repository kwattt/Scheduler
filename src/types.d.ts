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
  activo: Boolean;
  clave: string;
  nombre: string;
  secciones: Array<Seccion>;
}

type Seccion = {
  activo: Boolean;
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
  entrada: string,
  salida: string,
  periodo: string,
  sesion: string,
  inicio: Date;
  final: Date;
}

type diaSemana = 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado';