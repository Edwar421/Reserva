import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './Modelos/cliente/cliente.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import config from './config';
import { DatabaseModule } from './dataBase/database.module';
import { EstampadoModule } from './Modelos/estampado/estampado.module';
import { ArtistaModule } from './Modelos/artista/artista.module';
import { PedidoModule } from './Modelos/pedido/material.module';
import { camisaModule } from './Modelos/camisa/camisa.module';
import { UploadModule } from './Modelos/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdministradorModule } from './Modelos/administrador/administrador.module';
import { CamisetasModule } from './Modelos/camisetas/camisetas.module';
import { UsuarioModule } from './Modelos/usuario/usuario.module';
import { EspacioModule } from './Modelos/espacio/espacio.module';
import { Reserva } from './database/Entidades/reserva.entity';
import { ReservaModule } from './Modelos/reserva/reserva.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.dev.env',
      load: [config],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'Uploads'), // path to the static files
      serveRoot: '/uploads', // route to serve the static files
    }),
    DatabaseModule,
    ClienteModule,
    CamisetasModule,
    EstampadoModule,
    ArtistaModule,
    PedidoModule,
    camisaModule,
    UploadModule,
    AdministradorModule,
    UsuarioModule,
    EspacioModule,
    ReservaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}