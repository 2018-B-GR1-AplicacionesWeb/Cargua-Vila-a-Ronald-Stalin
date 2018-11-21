import {
    Get,
    Controller,
    HttpCode,
    InternalServerErrorException,
    Post,
    Body,
    Headers,
    UnauthorizedException, Req, Res
} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";
import {Request} from "express";
import {Response} from "express";

@Controller()//decoradores
export class AppController {
  constructor(private readonly _appService:AppService){}
    //constructor(private readonly appService: AppService) {}
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
  @Post('crearUsuario')
  crearUsuario(
      @Body() usuario: Usuario,
      @Headers()cabeceras,
      @Headers('seguridad')codigo,
      @Res()res : Response,
      @Req()req : Request | any
  ) {
      console.log('Cookies',req.cookies);
      console.log('Cookies',req.secret);
      console.log('Cookie Segura', req.signedCookies);
      console.log(usuario);
      console.log(cabeceras);

      if (codigo==='1234'){
          const bdd = this._appService.crearUsuario(usuario);
          res.append('token','5678');
          res.cookie("app","web");
          res.cookie("segura","secreto",{
              signed:true
          });
          res.json(bdd)
      } else{
          throw new UnauthorizedException({
              mesaje:'Error de autorización',
              error:401
          })
      }


  }

}
export interface Usuario {
    nombre:string;
}