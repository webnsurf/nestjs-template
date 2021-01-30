import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { PORT } from './environment';

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
  app.setGlobalPrefix('api');

  const swaggerOptions = new DocumentBuilder()
    .setTitle("Web'n'surF NestJS API")
    .setDescription("Web'n'surF NestJS API endpoints")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  console.log({ PORT });

  await app.listen(PORT, () => {
    console.log(`Server started on ${new Date().toUTCString()}`);
    console.log(`  Port: ${PORT}`);
    console.log(`  Runtime: ${process.env.RUNTIME_ENV}`);
  });
}
bootstrap();
