// BDD Ya existe -> synchronize: false
// BDD No existe -> synchronize: true

import {Column} from "typeorm";

export class NoticiaEntity {
    @Column()
    titulo: string;
    @Column()
    descripcion: string;
}




