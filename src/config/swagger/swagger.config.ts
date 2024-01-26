import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app) => {
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('NEST-AUTH API documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/documentation', app, document);
};
