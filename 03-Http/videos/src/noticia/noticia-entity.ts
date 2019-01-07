// BDD Ya existe -> synchronize: false
// BDD No existe -> synchronize: true

import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('noticia')
export class NoticiaEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Index()
    @Column({
        name:'titulo_noticia',
        type: 'varchar',
        length: 50
    })
    titulo: string;
    @Column({
        name:'descripcion_noticia',
        type: 'text',
        nullable: true
    })
    descripcion: string;
}




