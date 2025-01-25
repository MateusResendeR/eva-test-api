import express from 'express';
import swaggerUi from 'swagger-ui-express';

import publicRoutes from './routes/public';
import swaggerDocsJson from './swagger.json';
import routerAuth from './routes/private';
import authMiddleware from './shared/isAdmAuthenticated';
import { env } from 'process';

// Create a new Express.js app
const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocsJson));

app.use('/', publicRoutes);
app.use('/private/', authMiddleware, routerAuth);

// Define your routes and controllers here
// Start the Express.js app
app.listen({
  host: '0.0.0.0',
  port: env.PORT ? Number(env.PORT) : 3000,
}, () => {
  console.log('Server started on http://localhost:3000');
});