import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seccion } from '../../entities/seccion.entity';
import { SeccionesController } from './secciones.controller';
import { SeccionesService } from './secciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seccion])],
  controllers: [SeccionesController],
  providers: [SeccionesService],
  exports: [SeccionesService],
})
export class SeccionesModule {}
