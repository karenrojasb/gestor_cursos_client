import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { IngresoService } from './ingreso.service';

@Controller('ingreso')
export class IngresoController {
  constructor(private readonly ingresoService: IngresoService) {}

  // Endpoint: /ingreso/generar?tipo=C
  @Get('generar')
  @HttpCode(HttpStatus.OK)
  async generarIngreso(@Query('tipo') tipo: string) {
    const resultado = await this.ingresoService.generarIngreso(tipo);
    return {
      statusCode: HttpStatus.OK,
      message: 'Proceso completado correctamente',
      data: resultado,
    };
  }
}