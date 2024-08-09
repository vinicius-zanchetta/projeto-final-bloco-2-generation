import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Projeto Final - Bloco 2 - Farmácia')
    .setDescription('Projeto Final do Bloco 2 do Bootcamp FullStack em Javascript da organização Generation Brazil. Aplicação dos conhecimentos no framework de backend Nest.js')
    .setContact("Vinicius Zanchetta", "https://github.com/vinicius-zanchetta/projeto-final-bloco-2-generation", "viniciuszanchettadev@gmail.com")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe);
  app.enableCors();

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
