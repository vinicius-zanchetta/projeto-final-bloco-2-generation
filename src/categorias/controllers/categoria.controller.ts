import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Tema')
@UseGuards(JwtAuthGuard)
@Controller("/categoria")
@ApiBearerAuth()
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) { }

    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Categoria[]> {
        return this.categoriaService.findByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.create(categoria)
    }

    @Put()
    @HttpCode(HttpStatus.CREATED)
    update(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.update(categoria)
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.categoriaService.delete(id);
    }


}