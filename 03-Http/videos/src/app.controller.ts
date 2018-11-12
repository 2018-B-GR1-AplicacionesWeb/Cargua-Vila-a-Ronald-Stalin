import {Get, Controller, HttpCode, InternalServerErrorException, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";

@Controller()//decoradores
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()//htttp://ip:puerto/url
  @HttpCode(204) //status
  raiz(): string {
    return 'Hola mundo'
  }
  @Get('adiosMundo')//url
  adiosMundo():string{
      return 'Adios Mundo'
  }
    @Post('adiosMundoPost')//url
    adiosMundoPOST():string{
        return 'Adios Mundo Post'
    }
  @Get('adiosMundoPromesa')//url
  adiosMundoPromesa():Promise<string>{
      const promesaAdios =(): Promise<string>=>{
          return new Promise((resolve)=>{
              resolve('Adios Mundo')
          })
      }
      return promesaAdios();
  }
  @Get('adiosMundoAsync') // url
  @HttpCode(201)
  async adiosMundoAsync() {
       const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve, reject) => {
                    reject('Adios Mundo');
                }
            )
        };
       try {
            const respuesta: string = await promesaAdios();
            return respuesta;
       } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje: 'Error servidor'})
       }
  }
  @Get('adiosMundoObservable')
  adiosMundoObservable():Observable<string>{
      const respuesta$ = of ('Adios Mundo');
      return respuesta$
  }
}
