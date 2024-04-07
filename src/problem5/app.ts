import express from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';
import { carsRouter } from './routes';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/api', carsRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
