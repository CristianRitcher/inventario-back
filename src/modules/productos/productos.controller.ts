import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  UseInterceptors, 
  UploadedFile,
  BadRequestException 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductosService } from './productos.service';
import { Producto } from '../../entities/producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: Partial<Producto>) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 30,
    @Query('search') search?: string,
  ) {
    return this.productosService.findAll(+page, +limit, search);
  }

  @Get('search/combined')
  searchCombined(
    @Query('page') page = 1,
    @Query('limit') limit = 30,
    @Query('search') search?: string,
  ) {
    return this.productosService.searchCombined(+page, +limit, search);
  }

  @Get('sku/:sku')
  findBySku(@Param('sku') sku: string) {
    return this.productosService.findBySku(sku);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: Partial<Producto>) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
  }

  @Post(':id/imagen')
  @UseInterceptors(FileInterceptor('imagen'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se proporcionó ninguna imagen');
    }

    const imageUrl = await this.productosService.uploadImage(file);
    const producto = await this.productosService.update(+id, { 
      ruta_imagen: imageUrl 
    });

    return { producto, imageUrl };
  }
}
