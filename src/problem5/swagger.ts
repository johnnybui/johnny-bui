import swaggerJsdoc from 'swagger-jsdoc';

const specs = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Code Challange API',
      version: '1.0.0',
      description: 'API for Problem 5 Code Challange',
    },
  },
  apis: ['./src/problem5/routes/*.ts'],
});

export default specs;