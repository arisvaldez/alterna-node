import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Personaje {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column()
    alte!: string;

    @Column()
    rol!: string;
} 
