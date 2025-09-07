import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SeccionesService } from './secciones.service';
import { Seccion } from '../../entities/seccion.entity';

@Controller('secciones')
export class SeccionesController {
  constructor(private readonly seccionesService: SeccionesService) {}

  @Post()
  create(@Body() createSeccionDto: Partial<Seccion>) {
    return this.seccionesService.create(createSeccionDto);
  }

  @Get()
  findAll(@Query('bodega') bodegaId?: string) {
    if (bodegaId) {
      return this.seccionesService.findByBodega(+bodegaId);
    }
    return this.seccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seccionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeccionDto: Partial<Seccion>) {
    return this.seccionesService.update(+id, updateSeccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seccionesService.remove(+id);
  }
}
