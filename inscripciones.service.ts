import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripciones.dto';
import { UpdateInscripcionDto } from './dto/update-inscripciones.dto';

@Injectable()
export class InscripcionesService {
  constructor(private readonly prisma: PrismaService) {}

  // CREAR INSCRITO
  async createRegistration(data: CreateInscripcionDto) {
    const inscripcionExistente = await this.prisma.inscripciones.findFirst({
      where: {
        idCur: data.idCur,
        docInscr: data.docInscr,
      },
    });

    if (inscripcionExistente) {
      return this.prisma.inscripciones.update({
        where: { id: inscripcionExistente.id },
        data: { est: true },
      });
    }

    const curso = await this.prisma.cursos.findUnique({
      where: { id: data.idCur },
      select: { CupoMax: true },
    });

    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }

    if (curso.CupoMax === null) {
      return this.prisma.inscripciones.create({
        data: {
          idCur: data.idCur,
          docInscr: data.docInscr,
          est: true,
          fecreg: new Date(),
        },
      });
    }

    const inscripcionesContadas = await this.prisma.inscripciones.count({
      where: { idCur: data.idCur },
    });

    if (inscripcionesContadas >= curso.CupoMax) {
      throw new Error('El cupo máximo del curso ha sido alcanzado');
    }

    return this.prisma.inscripciones.create({
      data: {
        idCur: data.idCur,
        docInscr: data.docInscr,
        est: true,
        fecreg: new Date(),
      },
    });
  }

  // OBTENER DATOS DE TODOS LOS INSCRITOS
  async getRegistration() {
    return this.prisma.$queryRawUnsafe<
      Array<{
        id: number;
        idCur: number;
        NombreCurso: string;
        docInscr: string;
        nombre: string | null;
        est: boolean;
        fecreg: Date;
        Profesor: number;
        SegundoPro: number;
        CupoMax: number | null;
        Proexterno: string;
      }>
    >(
      `SELECT 
        i.id, 
        i.idCur, 
        c.NombreCurso, 
        i.docInscr, 
        e.nombre, 
        i.est, 
        i.fecreg,
        c.Profesor,
        c.SegundoPro,
        c.CupoMax,
        c.Proexterno
      FROM gescur.Inscripciones i
      LEFT JOIN gescur.Cursos c ON i.idCur = c.id
      LEFT JOIN gescur.emp_nomina e ON i.docInscr = e.id_emp
      WHERE i.est = 1`
    );
  }


 


  async getCoursesTeacher(idProfesor: number) {
    return this.prisma.$queryRawUnsafe<
      Array<{
        id: number;
        idCur: number;
        NombreCurso: string;
        Publico: number;
        Profesor: number;
        SegundoPro: number;
        Valor: number; 
        Horas: number;
        Lugar: string;
        Inicio: Date;
        Fin: Date;
        LunesIni: string;
        LunesFin: string;
        MartesIni: string;                       
        MartesFin: string;                        
        MiercolesIni: string;
        MiercolesFin: string;              
        JuevesIni: string;                       
        JuevesFin: string;                  
        ViernesIni: string;                 
        ViernesFin: string;                     
        SabadoIni: string;                      
        SabadoFin: string;                       
        DomingoIni: string;                     
        DomingoFin: string;
        Periodo: number;
        Linea: number;
        Proexterno, 
        Estado: string;
        Modalidad: number;
        Unidad: number;
        docInscr: string;
        nombre: string | null;
        fecreg: Date;
        rol: string;
        CupoMax: number | null;
        Nota: number | null;
        Especificacion: string | null;
        InscritoNumerico: number | null;
      }>
    >(
      `SELECT 
        i.id,
        i.idCur,
        c.NombreCurso,
        lp.Especificacion AS Publico,
        c.Profesor,
        c.SegundoPro,
        c.Valor,
        c.Horas,
        c.Lugar,
        c.Inicio,
        c.Fin,
        c.LunesIni,                          
        c.LunesFin,                         
        c.MartesIni,                       
        c.MartesFin,                        
        c.MiercolesIni,                      
        c.MiercolesFin,                      
        c.JuevesIni,                         
        c.JuevesFin,                         
        c.ViernesIni,                        
        c.ViernesFin,                        
        c.SabadoIni,                         
        c.SabadoFin,                         
        c.DomingoIni,                        
        c.DomingoFin,
        c.Periodo,
        ll.Especificacion AS Linea,
        c.Proexterno, 
        c.Estado,
        est.Especificacion AS Est, 
        m.Especificacion AS Modalidad,
        u.nombre AS Unidad,
        i.docInscr,
        e.nombre,
        i.fecreg,
        c.CupoMax,
        sp.nombre AS SegundoProfe, 
        e.nombre AS NombreProfesor,
       

        TRY_CAST(i.docInscr AS INT) AS InscritoNumerico,
        n.Nota,
        l.Especificacion,
        CASE 
          WHEN c.Profesor = ${idProfesor} THEN 'Titular'
          WHEN c.SegundoPro = ${idProfesor} THEN 'Segundo'
          ELSE 'Otro'
        END AS rol
      FROM gescur.Cursos c
      LEFT JOIN gescur.Inscripciones i ON i.idCur = c.id
      LEFT JOIN gescur.emp_nomina e ON i.docInscr = e.id_emp
  
      OUTER APPLY (
        SELECT TOP 1 n.Nota 
        FROM gescur.Notas n 
        WHERE n.idInscrito = TRY_CAST(i.docInscr AS INT)
        ORDER BY n.id ASC
      ) n
      LEFT JOIN gescur.Listas l ON l.id = n.Nota
      LEFT JOIN gescur.listas lp ON lp.id = c.Publico AND lp.Tipo = 1
      LEFT JOIN gescur.listas ll ON ll.id = c.Linea AND ll.Tipo = 2
      LEFT JOIN gescur.listas m ON m.id = c.Modalidad AND m.Tipo = 3
      LEFT JOIN gescur.listas est ON est.id = c.Estado AND est.Tipo = 4
      LEFT JOIN gescur.unidad u ON c.Unidad = u.codigo
      LEFT JOIN gescur.emp_nomina sp ON CAST(c.SegundoPro AS VARCHAR) = sp.id_emp
    
    
    


      WHERE (c.Profesor = ${idProfesor} OR c.SegundoPro = ${idProfesor})
        AND i.est = 1`
    );
  }
  
  

  // OBTENER INSCRIPCIONES POR ID
  async getRegistrationId(id: number) {
    const inscripcion = await this.prisma.inscripciones.findUnique({ where: { id } });
    if (!inscripcion) throw new NotFoundException('Inscripción no encontrada');
    return inscripcion;
  }

  //  ACTUALIZAR EL ESTADO DEL INSCRITO
  async getState(id: number, dto: UpdateInscripcionDto) {
    return this.prisma.inscripciones.update({
      where: { id },
      data: { est: Boolean(dto.est) },
    });
  }

  // ELIMINAR LA INSCRIPCIÓN
  async deleteRegistration(id: number) {
    return this.prisma.inscripciones.delete({ where: { id } });
  }
}