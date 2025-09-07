import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { MovimientosService, CreateMovimientoDto } from './movimientos.service';
import { TipoMovimientoEnum } from '../../entities/movimiento.entity';

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Post()
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    return this.movimientosService.create(createMovimientoDto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 30,
    @Query('tipo') tipo?: TipoMovimientoEnum,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
    @Query('usuario') usuarioId?: string,
    @Query('seccion') seccionId?: string,
  ) {
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : undefined;
    const fechaFinDate = fechaFin ? new Date(fechaFin) : undefined;

    return this.movimientosService.findAll(
      +page,
      +limit,
      tipo,
      fechaInicioDate,
      fechaFinDate,
      usuarioId ? +usuarioId : undefined,
      seccionId ? +seccionId : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientosService.remove(+id);
  }
}
