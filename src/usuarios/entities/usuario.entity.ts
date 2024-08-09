import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Produto } from "../../produtos/entities/produto.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsEmail()
    @Column({ length: 255, nullable: false })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty({example: "email@email.com.br"})
    usuario: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty()
    nome: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty()
    senha: string;

    @IsNotEmpty()
    @Column({ length: 500, nullable: true })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty()
    foto: string;
}
