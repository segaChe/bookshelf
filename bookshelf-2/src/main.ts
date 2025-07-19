import { NestFactory }    from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { env }            from './config/env';
import { AppModule }      from './app.module';

async function bootstrap () {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.listen(env.PORT ?? 3000);
    console.log('App running on port ', env.PORT);
}

bootstrap();
