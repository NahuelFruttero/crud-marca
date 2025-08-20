import {Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Marca {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   denominacion: string;

   @Column()
   observacion?: string;

   @Column()
   sistema?: number;

   @Column()
   createdAt?: Date;

   @Column()
   deletedAt?: Date;

   @Column()
   updatedAt?: Date;
}
