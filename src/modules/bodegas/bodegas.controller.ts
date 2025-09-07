import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BodegasService } from './bodegas.service';
import { Bodega } from '../../entities/bodega.entity';

@Controller('bodegas')
export class BodegasController {
  constructor(private readonly bodegasService: BodegasService) {}

  @Post()
  create(@Body() createBodegaDto: Partial<Bodega>) {
    return this.bodegasService.create(createBodegaDto);
  }

  @Get()
  findAll() {
    return this.bodegasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bodegasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBodegaDto: Partial<Bodega>) {
    return this.bodegasService.update(+id, updateBodegaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bodegasService.remove(+id);
  }
}
