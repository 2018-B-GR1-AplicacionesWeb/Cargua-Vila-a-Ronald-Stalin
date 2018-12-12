import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from "./noticia.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,NoticiaService],
})
export class AppModule {}
