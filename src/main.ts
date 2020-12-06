import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: errors => {
        const fields: { [key: string]: string } = {};
        errors.forEach(({ property, constraints }) => {
          fields[property] = Object.values(constraints)[0];
        });

        return new BadRequestException({ fields });
      },
    }),
  );

  app.use(cookieParser());

  const swaggerOptions = new DocumentBuilder()
    .setTitle("Web'n'surF NestJS API")
    .setDescription("Web'n'surF NestJS API endpoints")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

  console.log({
    RUNTIME_ENV: process.env.RUNTIME_ENV,
  });
}
bootstrap();
