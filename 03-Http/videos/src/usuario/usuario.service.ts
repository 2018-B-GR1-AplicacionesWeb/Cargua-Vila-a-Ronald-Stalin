//usuario.service.ts

import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {FindOneOptions, Repository} from "typeorm";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository:
            Repository<UsuarioEntity>
    ){
    }
    async autenticar(username: string, password : string){
        //Password encriptado
        //Encriptar el password que les llega
        const consulta : FindOneOptions<UsuarioEntity>={
            where:{
                username : username,
                password : password // passeword encriptado
            }
        };
        const respuesta = await this._usuarioRepository.findOne(consulta);
        if (respuesta){
            return true;
        }else{
            return false;
        }
    }
}