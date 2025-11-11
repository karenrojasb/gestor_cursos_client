import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GenerarIngresoService {
  constructor(private readonly prisma: PrismaService) {}

  async generarIngreso(tipo: string) {
    try {
      const tipoDocumento = '008'; // INGRESO ALMACÉN

      const resultado: any[] = await this.prisma.$queryRawUnsafe(
        `SELECT cod_sub 
         FROM gen_subtipodoc 
         WHERE cod_tip = '${tipoDocumento}' 
         AND cod_sub LIKE '${tipo}%'`
      );

      if (resultado.length === 0) {
        throw new BadRequestException(
          `No se encontró subtipo en Novasoft para el tipo '${tipo}'.`
        );
      }

      console.log('Resultado del query:', resultado); // LOG para debug

      return {
        mensaje: 'Subtipo encontrado correctamente',
        tipoIngreso: tipo,
        subtipo: resultado[0].cod_sub,
      };
    } catch (error) {
      console.error('Error al generar ingreso:', error);
      throw new BadRequestException(
        'Error al consultar el subtipo en Novasoft'
      );
    }
  }
}



import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GenerarIngresoService } from './generaringreso.service';

class GenerarIngresoDto {
  tipo: string;
}

@Controller('ingreso') // Prefijo para la ruta
export class GenerarIngresoController { 
  constructor(private readonly generarIngresoService: GenerarIngresoService) {}

  @Post('GenerarIngreso')
  @HttpCode(HttpStatus.OK)
  async generarIngreso(@Body() body: GenerarIngresoDto) {
    console.log('Body recibido en controller:', body); // LOG

    const { tipo } = body;

    const resultado = await this.generarIngresoService.generarIngreso(tipo);

    return {
      statusCode: HttpStatus.OK,
      message: 'Proceso completado correctamente',
      data: resultado,
    };
  }
}