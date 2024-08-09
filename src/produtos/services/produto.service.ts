import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true
            }
        })
    }

    async findById(id: number): Promise<Produto> {
        let buscaProduto = await this.produtoRepository.findOne({
            where: { id },
            relations: {
                categoria: true
            }
        })

        if (!buscaProduto)
            throw new HttpException("Produto não foi encontrada!", HttpStatus.NOT_FOUND);
        return buscaProduto
    }

    async findByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: { nome: ILike(`%${nome}%`) },
            relations: {
                categoria: true
            }
        })
    }

    async findByFabricante(fabricante: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: { fabricante: ILike(`%${fabricante}%`) },
            relations: {
                categoria: true
            }
        })
    }

    async create(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto)
    }

    async update(produto: Produto): Promise<Produto> {
        await this.findById(produto.id)

        if (!produto.id)
            throw new HttpException("É necessário passar o ID do produto.", HttpStatus.NOT_FOUND)

        return await this.produtoRepository.save(produto)
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)

        return await this.produtoRepository.delete(id);
    }
}