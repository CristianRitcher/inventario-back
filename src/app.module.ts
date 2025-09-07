import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';
import { getCloudinaryConfig } from './config/cloudinary.config';

// Importar módulos
import { BodegasModule } from './modules/bodegas/bodegas.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { SeccionesModule } from './modules/secciones/secciones.module';
import { ProductosModule } from './modules/productos/productos.module';
import { ItemsModule } from './modules/items/items.module';
import { MovimientosModule } from './modules/movimientos/movimientos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    BodegasModule,
    UsuariosModule,
    SeccionesModule,
    ProductosModule,
    ItemsModule,
    MovimientosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'CLOUDINARY',
      useFactory: getCloudinaryConfig,
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
