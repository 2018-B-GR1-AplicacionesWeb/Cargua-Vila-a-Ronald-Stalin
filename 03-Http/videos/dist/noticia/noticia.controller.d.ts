import { NoticiaService } from "./noticia.service";
export declare class NoticiaController {
    private readonly _noticiaService;
    constructor(_noticiaService: NoticiaService);
    inicio(response: any, consulta: any, accion: string, titulo: string): Promise<void>;
    eliminar(response: any, idNoticia: string): Promise<void>;
    crearNoticiaRuta(response: any): void;
    crearNoticiaFuncion(response: any, noticia: Noticia): Promise<void>;
    actualizarNoticiaVista(response: any, idNoticia: string): Promise<void>;
    actualizarNoticiaMetodo(response: any, idNoticia: string, noticia: Noticia): Promise<void>;
}
export interface Usuario {
    nombre: string;
}
export interface Noticia {
    id?: number;
    titulo: string;
    descripcion: string;
}
