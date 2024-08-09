import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) { }

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find()
    }

    async findById(id: number): Promise<Categoria> {
        let buscaCategoria = await this.categoriaRepository.findOne({
            where: { id }
        })

        if (!buscaCategoria)
            throw new HttpException("Categoria não foi encontrada!", HttpStatus.NOT_FOUND);
        return buscaCategoria
    }

    async findByNome(nome: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: { nome: ILike(`%${nome}%`)}
        })
    }

    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria)
    }

    async update(categoria: Categoria): Promise<Categoria> {
        await this.findById(categoria.id)

        if (!categoria.id)
            throw new HttpException("É necessário passar o ID da categoria.", HttpStatus.NOT_FOUND)

        return await this.categoriaRepository.save(categoria)
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)

        return await this.categoriaRepository.delete(id);
    }
}