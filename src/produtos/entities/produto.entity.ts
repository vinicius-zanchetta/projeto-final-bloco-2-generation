import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categorias/entities/categoria.entity";

@Entity({ name: "tb_produtos" })
export class Produto {
    @PrimaryGeneratedColumn()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Column({ type: "decimal", precision: 6, scale: 2 })
    preco: number;

    @IsNumber({ maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @Column({ type: "int"})
    quantidade: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    fabricante: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria
}