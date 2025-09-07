import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '../../entities/item.entity';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: Partial<Item>) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll(
    @Query('producto') productoId?: string,
    @Query('seccion') seccionId?: string,
    @Query('search') search?: string,
  ) {
    if (productoId) {
      return this.itemsService.findByProducto(+productoId);
    }
    if (seccionId) {
      return this.itemsService.findBySeccion(+seccionId);
    }
    if (search) {
      return this.itemsService.searchItems(search);
    }
    return this.itemsService.findAll();
  }

  @Get('serial/:serial')
  findBySerial(@Param('serial') serial: string) {
    return this.itemsService.findBySerial(serial);
  }

  @Get('validate/:codigo')
  validateCode(@Param('codigo') codigo: string) {
    return this.itemsService.validateCode(codigo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: Partial<Item>) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
