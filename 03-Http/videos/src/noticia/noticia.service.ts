import {Injectable} from "@nestjs/common";
import {Noticia} from "../app.controller";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {NoticiaEntity} from "./noticia-entity";
import {FindManyOptions} from "typeorm";

@Injectable()
export class NoticiaService {
    arreglo: Noticia[] = [
        {
            id: 1,
            titulo: 'A',
            descripcion: 'Descripcion de a'
        },
        {
            id: 2,
            titulo: 'B',
            descripcion: 'Descripcion de b '
        },
        {
            id: 3,
            titulo: 'C',
            descripcion: 'Descripcion de c '
        },
        {
            id: 4,
            titulo: 'D',
            descripcion: 'Descripcion de d'
        }
    ];
    numeroRegistro = 5;
    constructor(
        @InjectRepository(NoticiaEntity)
        private readonly _noticiaRepository: Repository<NoticiaEntity>
    ){}
    buscar(parametrosBusqueda?: FindManyOptions<NoticiaEntity>): Promise<NoticiaEntity[]>{
        return this._noticiaRepository.find()
    }
    crear(noticia: Noticia): Promise<NoticiaEntity> {
        //Metodo Create es como un Constructor de la Entidad
        const noticiaEntity : NoticiaEntity = this._noticiaRepository.create(noticia);
        //Metodo Save Guarda en la BDD
       return this._noticiaRepository.save(noticiaEntity);
    }
    eliminar(idNoticia: number): Promise<NoticiaEntity> {
        const noticiaAEliminar: NoticiaEntity = this._noticiaRepository
            .create({
                id: idNoticia
            });
        return this._noticiaRepository.remove(noticiaAEliminar);
    }
    actualizar(nuevaNoticia: Noticia): Promise<NoticiaEntity> {
        const noticiaEntity : NoticiaEntity = this._noticiaRepository.create(nuevaNoticia);
        return this._noticiaRepository.save(noticiaEntity)
    }
    buscarPorId(idNoticia: number): Promise<NoticiaEntity>{
        return this._noticiaRepository.findOne(idNoticia)
    }
}