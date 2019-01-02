import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from "./noticia/noticia.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia/noticia-entity";

@Module({
    imports: [
        TypeOrmModule.forRoot(
            {
                type: 'mysql',
                host: 'localhost',
                port: 32783,
                username: 'web',
                password: '12345678',
                database: 'bddweb',
                synchronize: true,
                entities: [
                    NoticiaEntity
                ]
            }
        )
    ],  // MODULOS
    controllers: [AppController],  // Controllers
    providers: [
        AppService,
        NoticiaService
    ], // Servicios
})
export class AppModule {
}
