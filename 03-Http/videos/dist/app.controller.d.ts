import { AppService } from './app.service';
import { Observable } from "rxjs";
import { Request } from "express";
import { Response } from "express";
export declare class AppController {
    private readonly _appService;
    constructor(_appService: AppService);
    raiz(): string;
    adiosMundo(): string;
    adiosMundoPOST(): string;
    adiosMundoPromesa(): Promise<string>;
    adiosMundoAsync(): Promise<string>;
    adiosMundoObservable(): Observable<string>;
    crearUsuario(usuario: Usuario, cabeceras: any, codigo: any, res: Response, req: Request | any): void;
    inicio(response: any): void;
}
export interface Usuario {
    nombre: string;
}
