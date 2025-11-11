import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { generarIngresoDto } from "./dto/generaringreso.dto";

@Injectable()
export class generarIngresoService {
//constructor

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

import { Controller, Post, Body, HttpCode, HttpStatus, Query, Get } from '@nestjs/common';
import { generarIngresoService } from './generaringreso.service';
import { generarIngresoDto } from './dto/generaringreso.dto';


@Controller()
export class generarIngresoController{ 
    constructor(private readonly generarIngresoService: generarIngresoService) {}

    @Post('GenerarIngreso')
  @HttpCode(HttpStatus.OK)
  async generarIngreso(@Body() body: generarIngresoDto) {
    const { tipo } = body;

    const resultado = await this.generarIngresoService.generarIngreso(tipo);

   

  }

}
