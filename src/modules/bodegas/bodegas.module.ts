import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bodega } from '../../entities/bodega.entity';
import { BodegasController } from './bodegas.controller';
import { BodegasService } from './bodegas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bodega])],
  controllers: [BodegasController],
  providers: [BodegasService],
  exports: [BodegasService],
})
export class BodegasModule {}
