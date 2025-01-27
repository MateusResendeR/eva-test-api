import express from 'express';
import swaggerUi from 'swagger-ui-express';

import publicRoutes from './routes/public';
import swaggerDocsJson from './swagger.json';
import routerAuth from './routes/private';
import authMiddleware from './shared/isAdmAuthenticated';
import { env } from 'process';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocsJson));

app.use('/', publicRoutes);
app.use('/private/', authMiddleware, routerAuth);
app.listen({
  port: env.PORT ? Number(env.PORT) : 5000
}, () => {
  console.log('Server started on http://localhost:5000');
});