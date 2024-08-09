import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  it('01 - Deve Cadastrar Usuario', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'rootroot@root.com',
        senha: 'rootroot',
        foto: 'urlDaFoto'
      })
      .expect(201)

    usuarioId = resposta.body.id;
  });


  it('02 - Não Deve Duplicar o Usuário', async () => {
    return await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'rootroot@root.com',
        senha: 'rootroot',
        foto: 'urlDaFoto'
      })
      .expect(400)
  });

  it('03 - Deve Autenticar Usuario (Login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'rootroot@root.com',
        senha: 'rootroot',
      })
      .expect(200)

    token = resposta.body.token;

  });

  it('04 - Deve Listar todos os Usuários', async () => {
    return await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200)
  });

  it('05 - Deve Atualizar um Usuário', async () => {
    return await request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: 'Root Atualizado',
        usuario: 'rootroot@root.com',
        senha: 'rootroot',
        foto: 'urlDaFoto'
      })
      .expect(200)
      .then(resposta => {
        expect("Root Atualizado").toEqual(resposta.body.nome);
      });
  });

  it('06 - Deve Listar Todos Produtos', async () => {
    const resposta = await request(app.getHttpServer())
      .get('/produto')
      .send({})
      .expect(200)
  });

  it('07 - Deve Procurar Produto Específico, Não Criado', async () => {
    const resposta = await request(app.getHttpServer())
      .get('/produto/1')
      .send({})
      .expect(404)
  });

  it('08 - Deve Criar Categoria', async () => {
    await request(app.getHttpServer())
      .post('/categoria')
      .set('Authorization', `${token}`)
      .send({
        "id": 1,
        "nome": "Medicamentos",
        "descricao": "Produtos farmacêuticos prescritos ou de venda livre para tratamento de doenças."
      })
      .expect(201)
  });

  it('09 - Deve Criar Produto', async () => {
    await request(app.getHttpServer())
      .post('/produto')
      .set('Authorization', `${token}`)
      .send({
        "nome": "Sabonete Antibacteriano",
        "preco": 4.75,
        "quantidade": 200,
        "fabricante": "Higiene Max",
        "categoria": {
          "id": 1
        }
      })
      .expect(201)
  });
});
