import {Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Marca {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   denominacion: string;
}
