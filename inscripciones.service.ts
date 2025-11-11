import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IngresoService {
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
import { IngresoService } from './ingreso.service';

class GenerarIngresoDto {
  tipo: string; // El tipo de ingreso que viene del Paso 2
}

@Controller('ingreso')
export class IngresoController {
  constructor(private readonly ingresoService: IngresoService) {}

  @Post('generar')
  @HttpCode(HttpStatus.OK)
  async generarIngreso(@Body() body: GenerarIngresoDto) {
    const { tipo } = body;

    const resultado = await this.ingresoService.generarIngreso(tipo);

    return {
      statusCode: HttpStatus.OK,
      message: 'Proceso completado correctamente',
      data: resultado,
    };
  }
}